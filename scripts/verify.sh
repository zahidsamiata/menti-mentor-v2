#!/usr/bin/env bash
# Push öncesi zorunlu doğrulama — CI ile hizalı (CI KAYNAK DOĞRUDUR).
#
# Kaynak: .github/workflows/ci.yml (çatı). Adım eşlemesi:
#   [1] backend-check     → npx prisma generate · npx tsc --noEmit
#   [2] backend-check     → npx tsc --noEmit -p tsconfig.test.json
#   [3] backend-check     → npm run lint
#   [4] frontend-check    → npx tsc --noEmit
#   [5] frontend-check    → npm test
#   [6] frontend-check    → npm run build (NEXT_PUBLIC_API_URL=http://localhost:3000)
#   [7] integration-tests → npm run test:coverage (NODE_ENV=test, TEST_DATABASE_URL zorunlu)
#   [8] e2e-browser       → YEREL KOŞULMAZ (servis Postgres + seed-test-tenant + Playwright chromium)
#   [9] docs-guard        → bash scripts/belge-bekci.test.sh · bash scripts/belge-bekci.sh (OTONOM-PROMPT 5c)
#
# Bilinçli farklar (yerelde güvenli/koşulabilir olmadığı için):
#   - `npm ci` koşulmaz (yerel node_modules kullanılır). CI ile birebir bağımlılık için: --ci-install
#   - `npx prisma migrate deploy` ayrı adım olarak koşulmaz; tests/globalSetup.ts zaten
#     migrate deploy çalıştırır ve bunu YALNIZ TEST_DATABASE_URL'e (guard'dan geçerek) yapar.
#   - e2e-browser job'u hiç koşulmaz → çıktıda "ATLANDI" yazar; kanıt CI'dır.
#   - Backend reposunun kendi CI'ı (backend/.github/workflows/ci.yml) yalnız npm ci · prisma generate ·
#     tsc --noEmit · vitest run koşar; tsc (tests) ve ESLint ADIMI YOK. Bu iki adımın CI kanıtı
#     çatı CI'ıdır (her dalda koşar, backend'i submodule pointer'ı üzerinden doğrular).
#
# KURAL 14 (CI YEŞİL ≠ TEST KOŞTU): atlanan adım ASLA ✓ gösterilmez.
#   Çıkış kodları: 0 = koşulabilen tüm adımlar yeşil (yalnız e2e atlandı, kanıt CI)
#                  1 = bir adım kırmızı (asıl çıkış kodu çıktıda yazılır)
#                  2 = KISMİ — entegrasyon testleri atlandı (TEST_DATABASE_URL yok / --no-integration)
#                      → yeşil SAYILMAZ; asıl kanıt CI.
#
# Kullanım: bash scripts/verify.sh [--no-integration] [--ci-install] [--help]
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
CI_NODE_MAJOR="22"   # .github/workflows/ci.yml → env.NODE_VERSION

RUN_INTEGRATION=1
CI_INSTALL=0
for arg in "$@"; do
  case "$arg" in
    --no-integration) RUN_INTEGRATION=0 ;;
    --ci-install)     CI_INSTALL=1 ;;
    -h|--help)
      sed -n '2,29p' "$0" | sed 's/^# \{0,1\}//'
      exit 0 ;;
    *) echo "Bilinmeyen argüman: $arg (bkz. --help)" >&2; exit 64 ;;
  esac
done

TOTAL=9
STEP=0
RESULTS=()          # "DURUM|adım|not"
INTEGRATION_SKIPPED=0

record() { RESULTS+=("$1|$2|${3:-}"); }

print_summary() {
  echo ""
  echo "── Özet ──────────────────────────────────────────"
  local row status name note
  for row in "${RESULTS[@]}"; do
    IFS='|' read -r status name note <<<"$row"
    case "$status" in
      OK)      printf '  ✓ YEŞİL    %s\n' "$name" ;;
      SKIPPED) printf '  ⊘ ATLANDI  %s — %s\n' "$name" "$note" ;;
      FAILED)  printf '  ✗ KIRMIZI  %s\n' "$name" ;;
    esac
  done
}

fail_and_exit() {
  local code="$1" name="$2"
  record FAILED "$name"
  print_summary
  echo ""
  echo "══════════════════════════════════════════════════"
  echo "  ❌  verify KIRMIZI — push YOK (adım çıkış kodu: $code)"
  echo "══════════════════════════════════════════════════"
  exit 1
}

# run_step "<ad>" "<dizin>" komut...  — CI adımı ile aynı komutu aynı dizinde koşar.
run_step() {
  local name="$1" dir="$2"; shift 2
  STEP=$((STEP + 1))
  echo ""
  echo "▶ [$STEP/$TOTAL] $name"
  local code=0
  (cd "$dir" && "$@") || code=$?
  if [[ "$code" != 0 ]]; then fail_and_exit "$code" "$name"; fi
  record OK "$name"
  echo "  ✓ $name"
}

skip_step() {
  local name="$1" reason="$2"
  STEP=$((STEP + 1))
  echo ""
  echo "▶ [$STEP/$TOTAL] $name"
  echo "  ⊘ ATLANDI — $reason"
  record SKIPPED "$name" "$reason"
}

# TEST_DATABASE_URL: ortamda ya da backend/.env.test'te (tests/setup.ts oradan yükler).
# Değer OKUNMAZ/BASILMAZ — yalnız tanımlı mı diye bakılır.
has_test_db() {
  [[ -n "${TEST_DATABASE_URL:-}" ]] && return 0
  [[ -f "$ROOT/backend/.env.test" ]] &&
    grep -qE '^[[:space:]]*(export[[:space:]]+)?TEST_DATABASE_URL=["'\'']?[^"'\''[:space:]]' "$ROOT/backend/.env.test"
}

echo ""
echo "══════════════════════════════════════════════════"
echo "  verify — CI ile hizalı (çatı .github/workflows/ci.yml)"
echo "══════════════════════════════════════════════════"

NODE_MAJOR="$(node -p 'process.versions.node.split(".")[0]')"
if [[ "$NODE_MAJOR" != "$CI_NODE_MAJOR" ]]; then
  echo "  ⚠️  Node $NODE_MAJOR kullanılıyor; CI Node $CI_NODE_MAJOR. Sonuç CI'dan farklı olabilir."
fi

if [[ "$CI_INSTALL" == 1 ]]; then
  echo ""
  echo "▶ [0] npm ci (backend + frontend) — CI ile birebir bağımlılık"
  code=0
  { (cd "$ROOT/backend" && npm ci) && (cd "$ROOT/frontend" && npm ci); } || code=$?
  if [[ "$code" != 0 ]]; then fail_and_exit "$code" "npm ci (backend + frontend)"; fi
else
  echo "  ℹ️  npm ci koşulmadı (yerel node_modules). CI ile birebir için: --ci-install"
fi

# ── docs-guard (belge bekçisi — ucuz, önce koşar) ─────────────────────────────
run_step "Belge bekçisi (aktif/arşiv ayrımı, 5c)" "$ROOT" \
  bash -c 'bash scripts/belge-bekci.test.sh && bash scripts/belge-bekci.sh'

# ── backend-check ─────────────────────────────────────────────────────────────
run_step "Backend prisma generate + tsc (src)" "$ROOT/backend" \
  bash -c 'npx prisma generate && npx tsc --noEmit'
run_step "Backend tsc (tests)" "$ROOT/backend" npx tsc --noEmit -p tsconfig.test.json
run_step "Backend ESLint"      "$ROOT/backend" npm run lint

# ── frontend-check ────────────────────────────────────────────────────────────
run_step "Frontend tsc"    "$ROOT/frontend" npx tsc --noEmit
run_step "Frontend Vitest" "$ROOT/frontend" npm test
run_step "Frontend build"  "$ROOT/frontend" env NEXT_PUBLIC_API_URL=http://localhost:3000 npm run build

# ── integration-tests ─────────────────────────────────────────────────────────
INTEGRATION_NAME="Backend entegrasyon testleri (test:coverage)"
if [[ "$RUN_INTEGRATION" == 0 ]]; then
  skip_step "$INTEGRATION_NAME" "--no-integration verildi; yeşil DEĞİL, kanıt CI"
  INTEGRATION_SKIPPED=1
elif ! has_test_db; then
  skip_step "$INTEGRATION_NAME" \
    "TEST_DATABASE_URL yok (ortamda ya da backend/.env.test'te); guard canlı DB'ye TRUNCATE atmasın diye koşulmadı — yeşil DEĞİL, kanıt CI"
  INTEGRATION_SKIPPED=1
else
  # CI job env'i ile aynı: NODE_ENV=test. JWT_SECRET / PLATFORM_ADMIN_KEY / DATABASE_URL
  # tests/setup.ts'te test değerlerine çekilir (DATABASE_URL ← TEST_DATABASE_URL).
  run_step "$INTEGRATION_NAME" "$ROOT/backend" env NODE_ENV=test npm run test:coverage
fi

# ── e2e-browser ───────────────────────────────────────────────────────────────
skip_step "E2E tarayıcı (Playwright)" \
  "yalnız CI'da: ephemeral servis Postgres + seed-test-tenant + Playwright chromium gerekir; kanıt CI"

print_summary
echo ""
echo "══════════════════════════════════════════════════"
if [[ "$INTEGRATION_SKIPPED" == 1 ]]; then
  echo "  🟡  verify KISMİ — entegrasyon testleri ATLANDI, bu YEŞİL DEĞİL."
  echo "      Push öncesi asıl kanıt CI'dır (gh run list --limit 3, iki repo)."
  echo "══════════════════════════════════════════════════"
  exit 2
fi
echo "  ✅  verify TAMAM — koşulabilen tüm adımlar yeşil."
echo "      E2E ATLANDI (yalnız CI) → CI'ı yine kontrol et."
echo "══════════════════════════════════════════════════"
echo ""
