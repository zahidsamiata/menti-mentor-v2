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

# ── kural (i) KR-22: CI job'u verify.sh başlığında anılmalı → yalnız UYARI ──
setup_i() {  # setup_i <verify.sh başlığındaki metin>
  setup_clean
  mkdir -p "$TMP/root/scripts" "$TMP/root/backend/.github/workflows"
  printf '#!/usr/bin/env bash\n# eşleme: backend-check\n# %s\nset -euo pipefail\n# docker-prisma (başlık dışı)\n' "$1" >"$TMP/root/scripts/verify.sh"
  printf 'name: CI\non:\n  push:\njobs:\n  backend-check:\n    runs-on: x\n' >"$TMP/root/.github-ci.tmp"
  mkdir -p "$TMP/root/.github/workflows" && mv "$TMP/root/.github-ci.tmp" "$TMP/root/.github/workflows/ci.yml"
  printf 'name: CI\njobs:\n  docker-prisma:\n    runs-on: x\n' >"$TMP/root/backend/.github/workflows/ci.yml"
}

setup_i 'bilinçli fark: `docker-prisma` yerelde koşmaz'
expect 0 "kural (i) pozitif: backend job'u başlıkta anılıyor → uyarı yok"
grep -q "KR-22" "$TMP/out" && { echo "  ✗ kural (i): anılan job için uyarı çıktı"; FAIL=1; }

setup_i 'başka bir not'
expect 0 "kural (i) negatif: backend job'u başlıkta yok (yalnız gövdede) → yeşil + uyarı"
grep -q 'job "docker-prisma" scripts/verify.sh başlığında anılmıyor' "$TMP/out" || { echo "  ✗ kural (i) uyarısı çıktıda yok"; FAIL=1; }
grep -q 'job "push"' "$TMP/out" && { echo "  ✗ kural (i): on: altındaki push job sanıldı"; FAIL=1; }

# ── kural (j) YN-11: raporlarda TÜR etiketi → yalnız UYARI ──
setup_clean
mkdir -p "$TMP/root/docs/raporlar/kesif"
printf '> 📸 DONDURULMUŞ (2026-09-27)\n# Rapor\n' >"$TMP/root/docs/raporlar/kesif/etiketli.md"
expect 0 "kural (j) pozitif: etiketli rapor → uyarı yok"
grep -q "YN-11" "$TMP/out" && { echo "  ✗ kural (j): etiketli raporda uyarı çıktı"; FAIL=1; }

printf '# Rapor\n\n\n\n\n> 📸 altıncı satırda — sayılmaz\n' >"$TMP/root/docs/raporlar/kesif/etiketsiz.md"
expect 0 "kural (j) negatif: etiketsiz rapor → yeşil + uyarı"
grep -q "kesif/etiketsiz.md ilk 5 satırda TÜR etiketi" "$TMP/out" || { echo "  ✗ kural (j) uyarısı çıktıda yok"; FAIL=1; }

# ── kural (k) YN-12: indekssiz klasör → yalnız UYARI ──
setup_clean
mkdir -p "$TMP/root/docs/kararlar/konu"
printf '# x\n' >"$TMP/root/docs/kararlar/konu/a.md"
printf '# idx\n' >"$TMP/root/docs/kararlar/konu/00-KART-INDEKSI.md"
expect 0 "kural (k) pozitif: klasörde (Türkçe adlı) indeks var → uyarı yok"
grep -q "docs/kararlar/konu/ giriş noktası" "$TMP/out" && { echo "  ✗ kural (k): indeksli klasörde uyarı çıktı"; FAIL=1; }

rm "$TMP/root/docs/kararlar/konu/00-KART-INDEKSI.md"
expect 0 "kural (k) negatif: indekssiz klasör → yeşil + uyarı"
grep -q "docs/kararlar/konu/ giriş noktası (00-INDEX.md) yok" "$TMP/out" || { echo "  ✗ kural (k) uyarısı çıktıda yok"; FAIL=1; }

# ── kural (l) YN-10: CLAUDE.md içinde kendine satır atfı → yalnız UYARI ──
setup_clean
printf -- '- bkz. § Çalışma Sözleşmesi · başka dosya: `backend/CLAUDE.md:12` · `00-KUYRUK.md:5`\n' >>"$TMP/root/CLAUDE.md"
expect 0 "kural (l) pozitif: bölüm adı + başka dosya satır atfı → uyarı yok"
grep -q "YN-10" "$TMP/out" && { echo "  ✗ kural (l): bölüm adlı atıfta uyarı çıktı"; FAIL=1; }

printf -- '- `CLAUDE.md:4-5`teki kural\n' >>"$TMP/root/CLAUDE.md"
expect 0 "kural (l) negatif: CLAUDE.md:4-5 kendine atıf → yeşil + uyarı"
grep -q 'kendi içine satır atfı "CLAUDE.md:4-5"' "$TMP/out" || { echo "  ✗ kural (l) uyarısı çıktıda yok"; FAIL=1; }

# ── kural (m) YN-09: 1.000 karakteri aşan kuyruk satırı → yalnız UYARI ──
setup_clean
expect 0 "kural (m) pozitif: kısa satırlar → uyarı yok"
grep -q "YN-09" "$TMP/out" && { echo "  ✗ kural (m): kısa satırlarda uyarı çıktı"; FAIL=1; }

printf '| X-05 | Ş0 | uzun iş | 🟢 | görünür | BEKLIYOR | %s |\n' "$(head -c 1100 /dev/zero | tr '\0' 'n')" >>"$TMP/root/docs/otonom/00-KUYRUK.md"
expect 0 "kural (m) negatif: 1.000+ karakterlik kuyruk satırı → yeşil + uyarı"
grep -q "00-KUYRUK.md 1 satır > 1000 karakter" "$TMP/out" || { echo "  ✗ kural (m) uyarısı çıktıda yok"; FAIL=1; }

exit $FAIL
