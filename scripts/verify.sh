#!/usr/bin/env bash
# CI ile birebir aynı doğrulama — push öncesi zorunlu.
# Yeşil değilse push yapma.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"

echo ""
echo "══════════════════════════════════════════════════"
echo "  verify — CI ile birebir aynı (çatı repo + backend)"
echo "══════════════════════════════════════════════════"

# ── 1. Backend: TypeScript (src) ─────────────────────────────────────────────
echo ""
echo "▶ [1/5] Backend TypeScript (src)..."
cd "$ROOT/backend"
npx prisma generate --generator client 2>/dev/null || npx prisma generate
npx tsc --noEmit
echo "  ✓ tsc src"

# ── 2. Backend: TypeScript (tests) ────────────────────────────────────────────
echo "▶ [2/5] Backend TypeScript (tests)..."
npx tsc --noEmit -p tsconfig.test.json
echo "  ✓ tsc tests"

# ── 3. Backend: ESLint ────────────────────────────────────────────────────────
echo "▶ [3/5] Backend ESLint..."
npm run lint
echo "  ✓ eslint"

# ── 4. Frontend: TypeScript + Vitest + Build ──────────────────────────────────
echo "▶ [4/5] Frontend TypeScript + Vitest + Build..."
cd "$ROOT/frontend"
npx tsc --noEmit
npm test
NEXT_PUBLIC_API_URL=http://localhost:3000 npm run build
echo "  ✓ frontend"

# ── 5. Backend: Entegrasyon Testleri (CI integration-tests job ile aynı) ──────
echo "▶ [5/5] Backend entegrasyon testleri..."
cd "$ROOT/backend"
# NODE_ENV=test: CI'da job-level env olarak set ediliyor.
# DATABASE_URL / JWT_SECRET / PLATFORM_ADMIN_KEY backend/.env'den okunur.
NODE_ENV=test npm run test:coverage
echo "  ✓ entegrasyon testleri"

echo ""
echo "══════════════════════════════════════════════════"
echo "  ✅  verify TAMAM — push güvenli"
echo "══════════════════════════════════════════════════"
echo ""
