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
echo '~~[ESKİ · 2026-09-25] eski kural~~' >>"$TMP/root/docs/otonom/OTONOM-PROMPT.txt"
expect 1 "OTONOM-PROMPT'ta kod dışı ~~[ESKİ katmanı → kırmızı"

setup_clean
head -c 40000 /dev/zero | tr '\0' 'a' >>"$TMP/root/CLAUDE.md"
expect 0 "CLAUDE.md > 35 KB → yalnız UYARI (yeşil kalır)"
grep -q "UYARI  CLAUDE.md" "$TMP/out" || { echo "  ✗ boyut uyarısı çıktıda yok"; FAIL=1; }

exit $FAIL
