import { request, type FullConfig } from '@playwright/test';
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Playwright global-setup:
 *  (1) ⚠️ EMNİYET (EK2): Hedef DB Neon/RDS/Supabase İSE suite'i BAŞLATMADAN durdur.
 *      Guard yalnız backend vitest globalSetup'ında çalışır; tarayıcı süreçleri onu BYPASS eder.
 *      Bu, o deliği kapatan tek kontroldür.
 *  (2) Seed edilmiş test kurumuna (admin@test.local) admin login → MENTI + MENTOR davet
 *      token'ı üret (token = imzalı JWT, DB kaydı gerektirmez).
 *  (3) ⚠️ AYIRT EDİCİ İŞARET (EK3, 150-öksüz dersi): Playwright'ın yaratacağı kayıtlar
 *      `e2e-*` / `@e2e.test.local` desenli — canlıya sızarsa tek grep'le bulunur.
 *
 * Çıktı: e2e/.runtime.json (spec bunu okur). Gitignore'da.
 */

// Backend assertTestDatabase.ts ile AYNI desen — canlı/yönetilen DB host'ları.
const LIVE_DB_HOST_PATTERN = /neon\.tech|\.rds\.amazonaws\.com|supabase\.co|\.render\.com/i;

const API_URL = process.env.E2E_API_URL ?? 'http://localhost:3000';
const ADMIN_EMAIL = 'admin@test.local';
const ADMIN_PASSWORD = 'TestPanel!2026'; // seed-test-tenant.mjs sabiti
const TENANT_ID = 'test-tenant-panel';   // seed-test-tenant.mjs sabiti

export default async function globalSetup(_config: FullConfig): Promise<void> {
  // ── (1) Neon emniyeti ────────────────────────────────────────────────────────
  const dbUrl = process.env.DATABASE_URL ?? '';
  if (LIVE_DB_HOST_PATTERN.test(dbUrl)) {
    throw new Error(
      'GÜVENLİK KİLİDİ (e2e global-setup): DATABASE_URL canlı bir DB\'ye (Neon/RDS/Supabase) ' +
        'işaret ediyor. Tarayıcı testi GERÇEK kayıt/kurum yazar → suite BAŞLATILMADI. ' +
        'Yalnız izole/ephemeral DB ile koşun (CI job).',
    );
  }
  if (!dbUrl) {
    console.warn('[e2e] UYARI: DATABASE_URL boş — Neon kontrolü host görmedi; CI job env\'ini doğrulayın.');
  }

  // ── run-id (EK3: ayırt edici işaret) ─────────────────────────────────────────
  // Date.now yerine env'den run kimliği; yoksa sabit-artan bir damga.
  const runId = (process.env.GITHUB_RUN_ID ?? process.env.E2E_RUN_ID ?? 'local').toString().slice(-8);

  // ── (2) Admin login → davet token'ları ──────────────────────────────────────
  const ctx = await request.newContext({ baseURL: API_URL });

  const loginRes = await ctx.post('/api/auth/login', {
    data: { email: ADMIN_EMAIL, password: ADMIN_PASSWORD },
  });
  if (!loginRes.ok()) {
    throw new Error(
      `[e2e] Admin login başarısız (${loginRes.status()}). ` +
        `Seed çalıştı mı? (node scripts/seed-test-tenant.mjs --apply). Gövde: ${await loginRes.text()}`,
    );
  }
  const { accessToken } = (await loginRes.json()) as { accessToken: string };

  async function createInvite(role: 'MENTI' | 'MENTOR'): Promise<string> {
    const res = await ctx.post(`/api/tenants/${TENANT_ID}/invitations`, {
      headers: { Authorization: `Bearer ${accessToken}`, 'X-Tenant-Id': TENANT_ID },
      data: { role },
    });
    if (!res.ok()) {
      throw new Error(`[e2e] ${role} davet oluşturma başarısız (${res.status()}): ${await res.text()}`);
    }
    const body = (await res.json()) as { token: string };
    return body.token;
  }

  const mentiToken = await createInvite('MENTI');
  const mentorToken = await createInvite('MENTOR');
  await ctx.dispose();

  // ── (3) Çıktı ────────────────────────────────────────────────────────────────
  const runtime = {
    runId,
    menti:  { token: mentiToken,  email: `e2e-menti-${runId}@e2e.test.local`,  password: 'E2ePass!2026' },
    mentor: { token: mentorToken, email: `e2e-mentor-${runId}@e2e.test.local`, password: 'E2ePass!2026' },
  };
  writeFileSync(join(__dirname, '.runtime.json'), JSON.stringify(runtime, null, 2), 'utf8');
  console.log(`[e2e] global-setup tamam — runId=${runId}, MENTI+MENTOR davet token'ları hazır.`);
}
