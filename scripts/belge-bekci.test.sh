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

exit $FAIL
