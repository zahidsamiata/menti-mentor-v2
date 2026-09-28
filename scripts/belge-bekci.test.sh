#!/usr/bin/env bash
# belge-bekci.sh için negatif + pozitif testler (geçici kökte sahte belgelerle).
# Kullanım: bash scripts/belge-bekci.test.sh   — çıkış 0 = tüm vakalar beklendiği gibi.
set -uo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT
FAIL=0

setup_clean() {
  rm -rf "$TMP/root" && mkdir -p "$TMP/root/docs/otonom"
  cat >"$TMP/root/docs/otonom/00-KUYRUK.md" <<'EOF'
| # | Şerit | İş | Kapı | Bitti demek | Durum | Not |
|---|---|---|---|---|---|---|
| X-01 | Ş0 | açık iş | 🟢 | görünür | BEKLIYOR | not `a|b` |
| X-02 | Ş0 | yarım iş | 🟡 | görünür | ✅ BITTI (kısmen, PO elle işi kaldı) | not |
EOF
  printf '### KARAR-1 · soru\n**CEVAP:**\n' >"$TMP/root/docs/otonom/01-KARARLAR.md"
  printf '# kural\n- desen örneği: `~~[ESKİ · tarih] cümle~~`\n' >"$TMP/root/CLAUDE.md"
  printf 'kural metni\n' >"$TMP/root/docs/otonom/OTONOM-PROMPT.txt"
}

expect() {  # expect <beklenen-kod> <vaka adı>
  local want="$1" name="$2" got=0
  bash "$HERE/belge-bekci.sh" "$TMP/root" >"$TMP/out" 2>&1 || got=$?
  if [[ "$got" == "$want" ]]; then
    echo "  ✓ $name (çıkış $got)"
  else
    echo "  ✗ $name — beklenen $want, gelen $got"; sed 's/^/      /' "$TMP/out"; FAIL=1
  fi
}

echo "── belge-bekci testleri ──"
setup_clean
expect 0 "temiz belgeler → yeşil (belirsiz BITTI ve kod içi ~~[ESKİ yalnız uyarı/serbest)"

setup_clean
echo '| X-03 | Ş0 | bitmiş iş | 🟢 | görünür | BITTI | kanıt |' >>"$TMP/root/docs/otonom/00-KUYRUK.md"
expect 1 "kuyrukta Durum=BITTI satırı → kırmızı"

setup_clean
echo '| X-04 | Ş0 | katlanmış iş | 🟢 | görünür | → X-01 | not |' >>"$TMP/root/docs/otonom/00-KUYRUK.md"
expect 1 "kuyrukta → katlanmış satır → kırmızı"

setup_clean
printf '### KARAR-2 · soru\n> ✅ **İŞLENDİ (2026-09-26):** kuyruğa işlendi\n**CEVAP:** A\n' >>"$TMP/root/docs/otonom/01-KARARLAR.md"
expect 1 "01-KARARLAR'da İŞLENDİ notlu kart → kırmızı"

setup_clean
printf '### KARAR-3 · soru\n> ✅ **ISLENDI (2026-09-26):** ascii yazım\n**CEVAP:** B\n' >>"$TMP/root/docs/otonom/01-KARARLAR.md"
expect 1 "01-KARARLAR'da ASCII ISLENDI notlu kart → kırmızı"

setup_clean
mkdir -p "$TMP/root/docs/otonom/kararlar"
printf '### KARAR-4 · soru\n> ✅ **İŞLENDİ (2026-09-28):** kuyruğa işlendi\n**CEVAP:** A\n' >"$TMP/root/docs/otonom/kararlar/KARAR-004.md"
expect 1 "kararlar/KARAR-004.md kart dosyasında İŞLENDİ → kırmızı (GÖREV 2.4)"

setup_clean
mkdir -p "$TMP/root/docs/otonom/kararlar"
printf '### KARAR-5 · soru\n**CEVAP:** B\n' >"$TMP/root/docs/otonom/kararlar/KARAR-005.md"
printf '# indeks\n- İŞLENDİ olan kart arşive taşınır\n' >"$TMP/root/docs/otonom/kararlar/00-INDEX.md"
expect 0 "kararlar/ cevaplı ama İŞLENDİ notsuz kart + indeks dosyasında İŞLENDİ sözcüğü → yeşil"

setup_clean
echo '| X-05 | Ş0 | karar bekleyen iş | 🔴 KARAR-9 | görünür | BEKLIYOR | not |' >>"$TMP/root/docs/otonom/00-KUYRUK.md"
expect 0 "kuyrukta 🔴 kapılı satır → yeşil + uyarı (5c-n)"
grep -q "X-05 kapısı 🔴" "$TMP/out" || { echo "  ✗ (n) uyarısı çıktıda yok"; FAIL=1; }

setup_clean
echo '| X-06 | Ş0 | karar bekleyen iş | 🟢 | görünür | ATLANDI(karar) | KARAR-9 bekliyor |' >>"$TMP/root/docs/otonom/00-KUYRUK.md"
expect 0 "kuyrukta ATLANDI(karar) satırı → yeşil + uyarı (5c-n)"
grep -q "X-06 Durum ATLANDI" "$TMP/out" || { echo "  ✗ (n) ATLANDI uyarısı çıktıda yok"; FAIL=1; }

setup_clean
echo '~~[ESKİ · 2026-09-25] eski kural~~' >>"$TMP/root/docs/otonom/OTONOM-PROMPT.txt"
expect 1 "OTONOM-PROMPT'ta kod dışı ~~[ESKİ katmanı → kırmızı"

setup_clean
head -c 40000 /dev/zero | tr '\0' 'a' >>"$TMP/root/CLAUDE.md"
expect 0 "CLAUDE.md > 35 KB → yalnız UYARI (yeşil kalır)"
grep -q "UYARI  CLAUDE.md" "$TMP/out" || { echo "  ✗ boyut uyarısı çıktıda yok"; FAIL=1; }

# ── kural (h): BITTI işin kaynağı açık → yalnız UYARI ──
setup_h() {  # setup_h <madde-satırındaki durum>
  setup_clean
  mkdir -p "$TMP/root/docs/otonom/arsiv" "$TMP/root/docs/kararlar" "$TMP/root/docs/raporlar/kod-denetimi"
  cat >"$TMP/root/docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md" <<'EOF2'
| # | Şerit | İş | Kapı | Bitti demek | Durum | Not |
|---|---|---|---|---|---|---|
| X-09 | Ş1 | **madde 777 — örnek iş** | 🟢 | görünür | BITTI | kanıt |
EOF2
  printf '| No | İş | Durum |\n|---|---|---|\n| 777 | örnek madde | %s |\n' "$1" >"$TMP/root/docs/kararlar/00-KARAR-TAKIP.md"
}

setup_h '⬜ AÇIK'
expect 0 "kural (h) negatif: BITTI işin maddesi açık → yeşil kalır"
grep -q "BITTI işin kaynağı açık: X-09 → madde 777" "$TMP/out" || { echo "  ✗ kural (h) uyarısı çıktıda yok"; FAIL=1; }

setup_h '✅ yapıldı — X-09 · PR #1'
expect 0 "kural (h) pozitif: madde ✅ işaretli → uyarı yok"
grep -q "kaynağı açık" "$TMP/out" && { echo "  ✗ kural (h): işaretli maddede uyarı çıktı"; FAIL=1; }

setup_h '🟨 kısmen — X-09; kalan: y → AJ-1'
expect 0 "kural (h) pozitif: madde 🟨 işaretli → uyarı yok"
grep -q "kaynağı açık" "$TMP/out" && { echo "  ✗ kural (h): 🟨 maddede uyarı çıktı"; FAIL=1; }

setup_h '⬜ AÇIK'
echo 'X-09 madde 777 # madde işten geniş, teyit' >"$TMP/root/docs/raporlar/kod-denetimi/bekci-istisna.txt"
expect 0 "kural (h) istisna: gerekçeli istisna → uyarı yok"
grep -q "kaynağı açık" "$TMP/out" && { echo "  ✗ kural (h): istisnadaki madde uyarı verdi"; FAIL=1; }

setup_h '⬜ AÇIK'
echo 'X-09 madde 777' >"$TMP/root/docs/raporlar/kod-denetimi/bekci-istisna.txt"
expect 0 "kural (h) istisna gerekçesiz → istisna sayılmaz, iki uyarı"
grep -q "kaynağı açık: X-09" "$TMP/out" && grep -q "gerekçe eksik" "$TMP/out" || { echo "  ✗ kural (h): gerekçesiz istisna yanlış işlendi"; FAIL=1; }

# ── KR-22 (eski etiket (i)): CI job'u verify.sh başlığında anılmalı → yalnız UYARI ──
setup_i() {  # setup_i <verify.sh başlığındaki metin>
  setup_clean
  mkdir -p "$TMP/root/scripts" "$TMP/root/backend/.github/workflows"
  printf '#!/usr/bin/env bash\n# eşleme: backend-check\n# %s\nset -euo pipefail\n# docker-prisma (başlık dışı)\n' "$1" >"$TMP/root/scripts/verify.sh"
  printf 'name: CI\non:\n  push:\njobs:\n  backend-check:\n    runs-on: x\n' >"$TMP/root/.github-ci.tmp"
  mkdir -p "$TMP/root/.github/workflows" && mv "$TMP/root/.github-ci.tmp" "$TMP/root/.github/workflows/ci.yml"
  printf 'name: CI\njobs:\n  docker-prisma:\n    runs-on: x\n' >"$TMP/root/backend/.github/workflows/ci.yml"
}

setup_i 'bilinçli fark: `docker-prisma` yerelde koşmaz'
expect 0 "KR-22 pozitif: backend job'u başlıkta anılıyor → uyarı yok"
grep -q "KR-22" "$TMP/out" && { echo "  ✗ KR-22: anılan job için uyarı çıktı"; FAIL=1; }

setup_i 'başka bir not'
expect 0 "KR-22 negatif: backend job'u başlıkta yok (yalnız gövdede) → yeşil + uyarı"
grep -q 'job "docker-prisma" scripts/verify.sh başlığında anılmıyor' "$TMP/out" || { echo "  ✗ KR-22 uyarısı çıktıda yok"; FAIL=1; }
grep -q 'job "push"' "$TMP/out" && { echo "  ✗ KR-22: on: altındaki push job sanıldı"; FAIL=1; }

# ── YN-11 (eski etiket (j)): raporlarda TÜR etiketi → yalnız UYARI ──
setup_clean
mkdir -p "$TMP/root/docs/raporlar/kesif"
printf '> 📸 DONDURULMUŞ (2026-09-27)\n# Rapor\n' >"$TMP/root/docs/raporlar/kesif/etiketli.md"
expect 0 "YN-11 pozitif: etiketli rapor → uyarı yok"
grep -q "YN-11" "$TMP/out" && { echo "  ✗ YN-11: etiketli raporda uyarı çıktı"; FAIL=1; }

printf '# Rapor\n\n\n\n\n> 📸 altıncı satırda — sayılmaz\n' >"$TMP/root/docs/raporlar/kesif/etiketsiz.md"
expect 0 "YN-11 negatif: etiketsiz rapor → yeşil + uyarı"
grep -q "kesif/etiketsiz.md ilk 5 satırda TÜR etiketi" "$TMP/out" || { echo "  ✗ YN-11 uyarısı çıktıda yok"; FAIL=1; }

# ── YN-12 (eski etiket (k)): indekssiz klasör → yalnız UYARI ──
setup_clean
mkdir -p "$TMP/root/docs/kararlar/konu"
printf '# x\n' >"$TMP/root/docs/kararlar/konu/a.md"
printf '# idx\n' >"$TMP/root/docs/kararlar/konu/00-KART-INDEKSI.md"
expect 0 "YN-12 pozitif: klasörde (Türkçe adlı) indeks var → uyarı yok"
grep -q "docs/kararlar/konu/ giriş noktası" "$TMP/out" && { echo "  ✗ YN-12: indeksli klasörde uyarı çıktı"; FAIL=1; }

rm "$TMP/root/docs/kararlar/konu/00-KART-INDEKSI.md"
expect 0 "YN-12 negatif: indekssiz klasör → yeşil + uyarı"
grep -q "docs/kararlar/konu/ giriş noktası (00-INDEX.md) yok" "$TMP/out" || { echo "  ✗ YN-12 uyarısı çıktıda yok"; FAIL=1; }

# ── YN-10 (eski etiket (l)): CLAUDE.md içinde kendine satır atfı → yalnız UYARI ──
setup_clean
printf -- '- bkz. § Çalışma Sözleşmesi · başka dosya: `backend/CLAUDE.md:12` · `00-KUYRUK.md:5`\n' >>"$TMP/root/CLAUDE.md"
expect 0 "YN-10 pozitif: bölüm adı + başka dosya satır atfı → uyarı yok"
grep -q "YN-10" "$TMP/out" && { echo "  ✗ YN-10: bölüm adlı atıfta uyarı çıktı"; FAIL=1; }

printf -- '- `CLAUDE.md:4-5`teki kural\n' >>"$TMP/root/CLAUDE.md"
expect 0 "YN-10 negatif: CLAUDE.md:4-5 kendine atıf → yeşil + uyarı"
grep -q 'kendi içine satır atfı "CLAUDE.md:4-5"' "$TMP/out" || { echo "  ✗ YN-10 uyarısı çıktıda yok"; FAIL=1; }

# ── YN-09 (eski etiket (m)): 1.000 karakteri aşan kuyruk satırı → yalnız UYARI ──
setup_clean
expect 0 "YN-09 pozitif: kısa satırlar → uyarı yok"
grep -q "YN-09" "$TMP/out" && { echo "  ✗ YN-09: kısa satırlarda uyarı çıktı"; FAIL=1; }

printf '| X-05 | Ş0 | uzun iş | 🟢 | görünür | BEKLIYOR | %s |\n' "$(head -c 1100 /dev/zero | tr '\0' 'n')" >>"$TMP/root/docs/otonom/00-KUYRUK.md"
expect 0 "YN-09 negatif: 1.000+ karakterlik kuyruk satırı → yeşil + uyarı"
grep -q "00-KUYRUK.md 1 satır > 1000 karakter" "$TMP/out" || { echo "  ✗ YN-09 uyarısı çıktıda yok"; FAIL=1; }

# ── kural (i) GÖREV 2.5: BAĞLAM SÖZLEŞMESİ — (i1)-(i5) + boyut eşikleri, hepsi yalnız UYARI ──
# (i1) doğrulanmamış BITTI arşivde işaretsiz
setup_i1() {  # setup_i1 <arşiv satırının Durum hücresi>
  setup_clean
  mkdir -p "$TMP/root/docs/otonom/arsiv" "$TMP/root/docs/raporlar/kod-denetimi"
  cat >"$TMP/root/docs/raporlar/kod-denetimi/bitti-dogrulama-2026-09-27.md" <<'EOF2'
> 📸 DONDURULMUŞ
## ⚠️ KISMEN
| İş | Risk | Ölçüt |
|---|---|---|
| X-21 | R1 | ölçüt |
## ✅ DOĞRULANDI
| İş | Risk | Ölçüt |
|---|---|---|
| X-22 | R1 | ölçüt |
EOF2
  printf '| # | Şerit | İş | Kapı | Bitti demek | Durum | Not |\n|---|---|---|---|---|---|---|\n| X-21 | Ş0 | iş (madde 1) | 🟢 | görünür | %s | not |\n| X-22 | Ş0 | iş (madde 2) | 🟢 | görünür | BITTI | not |\n' "$1" >"$TMP/root/docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md"
}
setup_i1 'BITTI 2026-09-26 — PR #1'
expect 0 "kural (i1) negatif: doğrulamada ⚠️ olan iş arşivde ön eksiz → yeşil + uyarı"
grep -q "X-21 doğrulamada ⚠️" "$TMP/out" || { echo "  ✗ (i1) uyarısı çıktıda yok"; FAIL=1; }
grep -q "X-22 doğrulamada" "$TMP/out" && { echo "  ✗ (i1): ✅ DOĞRULANDI bölümündeki iş uyarı verdi"; FAIL=1; }

setup_i1 '🟨 KISMEN — BITTI 2026-09-26; kalan: test → AJ-1'
expect 0 "kural (i1) pozitif: ön ekli (🟨 KISMEN) arşiv satırı → uyarı yok"
grep -q "5c-i1" "$TMP/out" && { echo "  ✗ (i1): ön ekli satırda uyarı çıktı"; FAIL=1; }

# (i2) kırık bağlam işaretçisi + (i5) cevaplı kararın işi KARAR-BEKLEYEN'de
setup_i2() {  # setup_i2 <işaretçi satırı> <01-KARARLAR KARAR-9 durum hücresi>
  setup_clean
  printf '\n## 🔴 KİLİT HARİTASI\n%s\n\n## AŞAMA Z\n' "$1" >>"$TMP/root/docs/otonom/00-KUYRUK.md"
  cat >"$TMP/root/docs/otonom/00-KUYRUK-KARAR-BEKLEYEN.md" <<'EOF2'
# KARAR BEKLEYEN
## KARAR-9
| # | Şerit | İş | Kapı | Bitti demek | Durum | Not |
|---|---|---|---|---|---|---|
| X-31 | Ş0 | iş (madde 3) | 🔴 KARAR-9 | görünür | BEKLIYOR | |
## KARAR-10
→ bkz. X-31 (KARAR-9 grubunda)
EOF2
  printf '| # | Konu | Kilitlediği işler | Durum | Öneri | Kart |\n|---|---|---|---|---|---|\n| KARAR-9 | soru | X-31 | %s | A | k |\n' "$2" >"$TMP/root/docs/otonom/01-KARARLAR.md"
}
IYI_HARITA=$'- KARAR-9 (soru) → 1 iş bekliyor: X-31 · ayrıntı: 00-KUYRUK-KARAR-BEKLEYEN.md § KARAR-9\n- KARAR-10 (soru) → 1 iş bekliyor: X-31 · ayrıntı: 00-KUYRUK-KARAR-BEKLEYEN.md § KARAR-10'
setup_i2 "$IYI_HARITA" '⬜ boş'
expect 0 "kural (i2)+(i5) pozitif: işaretçi ↔ bölüm tutarlı (bkz. atfı dahil), karar ⬜ → uyarı yok"
grep -q "5c-i2\|5c-i5" "$TMP/out" && { echo "  ✗ (i2)/(i5): tutarlı haritada uyarı çıktı"; FAIL=1; }

setup_i2 $'- KARAR-9 (soru) → 2 iş bekliyor: X-31, X-99 · ayrıntı: 00-KUYRUK-KARAR-BEKLEYEN.md § KARAR-9\n- KARAR-11 (soru) → 1 iş bekliyor: X-31 · ayrıntı: 00-KUYRUK-KARAR-BEKLEYEN.md § KARAR-11' '⬜ boş'
expect 0 "kural (i2) negatif: sayılan iş bölümde yok · § yok · bölümün işaretçisi yok → yeşil + uyarı"
grep -q "X-99 sayıyor ama KARAR-BEKLEYEN § KARAR-9'de yok" "$TMP/out" || { echo "  ✗ (i2) eksik iş uyarısı yok"; FAIL=1; }
grep -q "KARAR-BEKLEYEN § KARAR-11 yok" "$TMP/out" || { echo "  ✗ (i2) olmayan § uyarısı yok"; FAIL=1; }
grep -q "§ KARAR-10 için 00-KUYRUK § KİLİT HARİTASI'nda işaretçi yok" "$TMP/out" || { echo "  ✗ (i2) ters yön uyarısı yok"; FAIL=1; }

setup_i2 "$IYI_HARITA" '✅ CEVAPLANDI: A'
expect 0 "kural (i5) negatif: KARAR-9 ✅ ama X-31 hâlâ KARAR-BEKLEYEN'de → yeşil + uyarı"
grep -q "§ KARAR-9 X-31 bağlı KARAR (KARAR-9) ✍️/✅" "$TMP/out" || { echo "  ✗ (i5) uyarısı çıktıda yok"; FAIL=1; }

# (i3) kaynaksız aktif iş
setup_clean
echo '| X-41 | Ş0 | kaynaksız iş (izsiz) | 🟢 | görünür | BEKLIYOR | not |' >>"$TMP/root/docs/otonom/00-KUYRUK.md"
expect 0 "kural (i3) negatif: kaynak izi olmayan aktif satır → yeşil + uyarı"
grep -q "X-41 kaynak izi yok" "$TMP/out" || { echo "  ✗ (i3) uyarısı çıktıda yok"; FAIL=1; }

setup_clean
echo '| X-42 | Ş0 | iş | 🟢 | görünür | BEKLIYOR | ajan-ekledi 2026-09-28 · kaynak: rapor:3 |' >>"$TMP/root/docs/otonom/00-KUYRUK.md"
echo '| X-43 | Ş0 | iş (G3-08) | 🟢 | görünür | BEKLIYOR | not |' >>"$TMP/root/docs/otonom/00-KUYRUK.md"
expect 0 "kural (i3) pozitif: ajan-ekledi / G-kart izi olan satırlar → uyarı yok"
grep -q "X-4[23] kaynak izi yok" "$TMP/out" && { echo "  ✗ (i3): kaynaklı satırda uyarı çıktı"; FAIL=1; }

# (i4) indeks ↔ kart CEVAP çelişkisi
setup_i4() {  # setup_i4 <indeks durum> <kart CEVAP metni>
  setup_clean
  mkdir -p "$TMP/root/docs/otonom/kararlar"
  printf '| # | Konu | Kilitlediği işler | Durum | Öneri | Kart |\n|---|---|---|---|---|---|\n| KARAR-7 | soru | 0 | %s | A | k |\n' "$1" >"$TMP/root/docs/otonom/01-KARARLAR.md"
  printf '### KARAR-7 · soru\n**Seçenekler:** A/B\n**CEVAP:** %s\n' "$2" >"$TMP/root/docs/otonom/kararlar/KARAR-007.md"
}
setup_i4 '⬜ boş' 'A'
expect 0 "kural (i4) negatif: kartta CEVAP dolu ama indeks ⬜ → yeşil + uyarı"
grep -q "KARAR-7 ⬜ ama docs/otonom/kararlar/KARAR-007.md CEVAP dolu" "$TMP/out" || { echo "  ✗ (i4) ⬜ uyarısı yok"; FAIL=1; }
setup_i4 '✍️ CEVAP yazıldı' ''
expect 0 "kural (i4) negatif: indeks ✍️ ama kartta CEVAP boş → yeşil + uyarı"
grep -q "KARAR-7 ✍️ ama docs/otonom/kararlar/KARAR-007.md CEVAP boş" "$TMP/out" || { echo "  ✗ (i4) ✍️ uyarısı yok"; FAIL=1; }
setup_i4 '✍️ CEVAP yazıldı' 'B — not'
expect 0 "kural (i4) pozitif: indeks ✍️ + kart CEVAP dolu → uyarı yok"
grep -q "5c-i4" "$TMP/out" && { echo "  ✗ (i4): tutarlı kartta uyarı çıktı"; FAIL=1; }
setup_i4 '⬜ boş' ''
expect 0 "kural (i4) pozitif: indeks ⬜ + kart CEVAP boş → uyarı yok"
grep -q "5c-i4" "$TMP/out" && { echo "  ✗ (i4): boş kartta uyarı çıktı"; FAIL=1; }

# boyut eşikleri (GÖREV 2.5): 00-KUYRUK 90 KB · 01-KARARLAR 40 KB · 02-ILERLEME 80 KB
setup_clean
head -c 85000 /dev/zero | tr '\0' 'a' >>"$TMP/root/docs/otonom/00-KUYRUK.md"
head -c 38000 /dev/zero | tr '\0' 'a' >>"$TMP/root/docs/otonom/01-KARARLAR.md"
head -c 75000 /dev/zero | tr '\0' 'a' >"$TMP/root/docs/otonom/02-ILERLEME.md"
expect 0 "boyut pozitif: eşiklerin altında (85/38/75 KB) → boyut uyarısı yok"
grep -q "KB eşiği" "$TMP/out" && { echo "  ✗ boyut: eşik altında uyarı çıktı"; FAIL=1; }
head -c 10000 /dev/zero | tr '\0' 'a' >>"$TMP/root/docs/otonom/00-KUYRUK.md"
head -c 5000 /dev/zero | tr '\0' 'a' >>"$TMP/root/docs/otonom/01-KARARLAR.md"
head -c 10000 /dev/zero | tr '\0' 'a' >>"$TMP/root/docs/otonom/02-ILERLEME.md"
expect 0 "boyut negatif: 00-KUYRUK > 90 · 01-KARARLAR > 40 · 02-ILERLEME > 80 KB → yeşil + üç uyarı"
for e in "00-KUYRUK.md 93 KB > 90 KB" "01-KARARLAR.md 42 KB > 40 KB" "02-ILERLEME.md 83 KB > 80 KB"; do
  grep -q "$e" "$TMP/out" || { echo "  ✗ boyut uyarısı yok: $e"; FAIL=1; }
done

# ── kural (t) TEK KAYNAK (İŞ 2, 2026-09-28): durum yalnız kuyrukta; bitmiş iş aktif belgede açık görünmez ──
setup_t() {  # X-10 bitti arşivinde (tam BITTI) · X-01 aktif kuyrukta BEKLIYOR · X-11 arşivde yalnız kısmen
  setup_clean
  mkdir -p "$TMP/root/docs/otonom/arsiv" "$TMP/root/docs/kararlar"
  cat >"$TMP/root/docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md" <<'EOF2'
| # | Şerit | İş | Kapı | Bitti demek | Durum | Not |
|---|---|---|---|---|---|---|
| X-10 | Ş0 | bitmiş iş | 🟢 | görünür | BITTI | kaynak: test |
| X-11 | Ş0 | yarım iş | 🟢 | görünür | 🟨 KISMEN (doğrulama) — kalan var | kaynak: test |
EOF2
  printf '| kart | konu | durum |\n|---|---|---|\n' >"$TMP/root/docs/kararlar/00-KART-INDEKSI.md"
}
kart() { echo "$1" >>"$TMP/root/docs/kararlar/00-KART-INDEKSI.md"; }

setup_t; kart '| G1-20 | RLS | ⬜ → X-10 (BEKLIYOR) |'
expect 1 "t1: bitmiş iş kart indeksinde \"⬜ → X (BEKLIYOR)\" → kırmızı"
grep -q "5c-t1" "$TMP/out" || { echo "  ✗ t1 etiketi yok"; FAIL=1; }

setup_t; kart '| G7-10 | tema | ⬜ → X-10 |'
expect 1 "t1: bitmiş işe parantezsiz işaretçi ama kartın kendi durumu ⬜ → kırmızı"

setup_t; printf 'Not: X-10 (açık) kalmıştı\n' >>"$TMP/root/docs/otonom/00-SIMDI.md"
expect 1 "t1: 00-SIMDI'de bitmiş iş \"(açık)\" → kırmızı"

setup_t; kart '| G6-01 | x | 🟨 kısmen — Y-1 · PR #9; kalan → X-10 |'
expect 1 "t1: \"kalan → X\" ama X bitmiş → kırmızı"

setup_t; kart '| G11-02 | x | ⬜ → X-01 · X-10 |'
expect 1 "t1: oktan sonraki listede ikinci kimlik bitmiş → kırmızı"

setup_t; kart '| 22 | x | 🟨 kısmen — Y-1; kalan: kod → X-10 · ✅ X-10 kalanı yapıldı — PR #5 |'
expect 0 "t1 pozitif: aynı satırda \"✅ … X\" kapanış işareti → yeşil"

setup_t; kart '| G1-20 | x | ✅ X-10 (açıklama: tamam) |'
expect 0 "t1 pozitif: \"(açıklama\" \"açık\" sayılmaz → yeşil"

setup_t; kart '| G1-06 | x | ⬜ → X-01 (BEKLIYOR) |'
expect 1 "t2: aktif işin durumu parantezle kopyalanmış → kırmızı"
grep -q "5c-t2" "$TMP/out" || { echo "  ✗ t2 etiketi yok"; FAIL=1; }

setup_t; mkdir -p "$TMP/root/docs/otonom/kararlar"; printf '### KARAR-7 · soru\nbağlı: X-01 (PR-ACIK)\n**CEVAP:**\n' >"$TMP/root/docs/otonom/kararlar/KARAR-007.md"
expect 1 "t2: kart dosyasında durum kopyası → kırmızı"

setup_t; kart '| G1-20 | RLS | ✅ X-10 · PR #1 |'; kart '| G1-06 | x | ⬜ → X-01 |'; kart '| G1-07 | y | 🟨 kısmen — X-11; kalan → KARAR-1 |'
expect 0 "t pozitif: bitmiş iş ✅ · aktif işe işaretçi · kısmen hücresi → yeşil"

setup_t; kart '| G1-21 | z | ⬜ → X-11 (⬜ yarım) |'
expect 0 "t pozitif: arşivde yalnız KISMEN olan iş bitmiş sayılmaz (t1 yok) → yeşil"

setup_t; printf 'ref: X-10 (BITTI 2026-09-27) · X-01 (BITTI olunca)\n' >>"$TMP/root/docs/otonom/00-SIMDI.md"
expect 0 "t pozitif: BITTI kopyası değişmez olgu → yeşil"

setup_t; printf -- '- 2026-09-26 · X-10 (BEKLIYOR) · X-01 (PR-ACIK)\n' >"$TMP/root/docs/otonom/02-ILERLEME.md"
mkdir -p "$TMP/root/docs/raporlar/kesif" "$TMP/root/docs/arsiv"
printf '> 📸\nX-10 (BEKLIYOR)\n' >"$TMP/root/docs/raporlar/kesif/r.md"
printf 'X-10 (BEKLIYOR)\n' >"$TMP/root/docs/arsiv/eski.md"
expect 0 "t kapsam: 02-ILERLEME günlüğü · docs/raporlar · docs/arsiv tarihli fotoğraf → yeşil"

setup_t; kart '| G1-20 | RLS | ~~⬜ → X-10 (BEKLIYOR)~~ ✅ X-10 |'
printf '## GEÇMİŞ\n| G1-06 | x | ⬜ → X-01 (BEKLIYOR) |\n' >>"$TMP/root/docs/kararlar/00-KART-INDEKSI.md"
mkdir -p "$TMP/root/docs/otonom/kararlar"; printf '### KARAR-8 · soru\n**CEVAP:** X-10 (BEKLIYOR) iken A\n' >"$TMP/root/docs/otonom/kararlar/KARAR-008.md"
printf 'örnek: `⬜ → X-10 (BEKLIYOR)`\n' >>"$TMP/root/docs/otonom/OTONOM-PROMPT.txt"
expect 0 "t kapsam: üstü çizili · ## GEÇMİŞ bölümü · CEVAP satırı · kod içi örnek → yeşil"

setup_t; printf '| X-10 | Ş0 | yeniden açılan iş | 🟢 | görünür | BEKLIYOR | kaynak: test |\n' >>"$TMP/root/docs/otonom/00-KUYRUK.md"; kart '| G1-20 | RLS | ⬜ → X-10 |'
expect 0 "t pozitif: arşivde BITTI ama aktif kuyrukta yeniden açılmış iş → yeşil"

setup_t; printf '| X-12 | Ş0 | kısmen iş | 🟢 | görünür | BITTI (kısmen — KARAR-9) | kaynak: test |\n' >>"$TMP/root/docs/otonom/00-KUYRUK.md"; kart '| G2-09 | eşik | ⬜ → X-12 |'
expect 0 "t3: \"⬜ → X\" ama X kuyrukta BITTI (kısmen) → yeşil + uyarı"
grep -q "5c-t3" "$TMP/out" || { echo "  ✗ t3 uyarısı yok"; FAIL=1; }

exit $FAIL
