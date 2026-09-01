import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright E2E — GERÇEK tarayıcı testi (ön yüz ↔ arka yüz tel bağlantısı).
 *
 * ⚠️ YALNIZ CI: Bu test gerçek kayıt/kurum yazar. CI'da ephemeral Postgres kullanılır
 * (çatı ci.yml `e2e-browser` job'ı). Lokalde çalıştırmayın — `.env` canlı Neon'a bağlıdır
 * ve guard yalnız backend vitest'inde çalışır. Emniyet için global-setup hedef DB'nin
 * Neon OLMADIĞINI doğrular (aksi halde suite başlamadan durur).
 *
 * Portlar (proje konvansiyonu): backend = 3000 · frontend(next) = 3001.
 * Servisleri CI job'ı başlatır (backend + next arka planda); bu config webServer YÖNETMEZ.
 */
export default defineConfig({
  testDir: './e2e',
  globalSetup: './e2e/global-setup.ts',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 1,
  reporter: [['list'], ['html', { open: 'never', outputFolder: 'playwright-report' }]],
  use: {
    baseURL: process.env.E2E_BASE_URL ?? 'http://localhost:3001',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'off',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
});
