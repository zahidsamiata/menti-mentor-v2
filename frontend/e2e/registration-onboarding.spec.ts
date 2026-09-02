import { test, expect, type Page } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

/**
 * E2E (GERÇEK TARAYICI) — kayıt → onboarding zinciri (B→D).
 *
 * TARİHÇE: Bu spec ilk koşuşunda (PR #148) login-PENDING kopukluğunu KIRMIZI ile yakaladı
 * (register → PENDING → login 403 → /login, /onboarding'e DEĞİL). Kök çözüm: davet token'ı
 * geçerliyse davetli APPROVED olur (backend fix + FE token iletimi, PO 2026-09-01 Seçenek A).
 *
 * ⭐ BEKLENEN: Düzeltme submodule pointer'ında olduğunda bu spec YEŞİL döner (register→onboarding).
 * ⚠️ Düzeltme pointer'a girene kadar (S29 pointer bump) e2e KIRMIZI kalır — beklenti ZAYIFLATILMAZ;
 *    düzeltme doğruysa kendiliğinden yeşile döner. Kırmızıysa GERÇEK URL mesajdan okunur.
 *
 * Bu spec register→onboarding TEL BAĞLANTISINI doğrular (kopukluğun kendisi buydu). Onboarding'in
 * sonraki adımları (DISC · arketip · üç soru) AYRI kademeli akışlarda doğrulanır (yol haritası).
 */

interface RuntimeInvite { token: string; email: string; password: string }
interface Runtime { runId: string; menti: RuntimeInvite; mentor: RuntimeInvite }

function loadRuntime(): Runtime {
  const raw = readFileSync(join(__dirname, '.runtime.json'), 'utf8');
  return JSON.parse(raw) as Runtime;
}

/** Davet token'lı kayıt formunu doldurur ve gönderir (ortak). */
async function fillRegister(page: Page, invite: RuntimeInvite): Promise<void> {
  await page.goto(`/register?token=${invite.token}`);
  await expect(page.getByLabel('E-posta Adresi')).toBeVisible({ timeout: 15_000 });

  await page.getByLabel('E-posta Adresi').fill(invite.email);
  await page.getByLabel('Güçlü Bir Şifre').fill(invite.password);
  await page.getByLabel('Şifre Tekrar').fill(invite.password);
  await page.getByRole('checkbox').check(); // KVKK + 18 beyanı
  await page.getByRole('button', { name: 'Hesabımı Oluştur' }).click();
}

test.describe('Kayıt → onboarding (gerçek tarayıcı, B→D)', () => {
  test('SENARYO 1 — mevcut kuruma MENTİ kaydı → onboarding açılır', async ({ page }) => {
    const { menti } = loadRuntime();

    await fillRegister(page, menti);
    await page.waitForLoadState('networkidle');
    const landedUrl = page.url();

    // ⭐ KOPUKLUĞUN DÜZELDİĞİNİN KANITI: davetli APPROVED → otomatik login → /onboarding.
    expect(
      landedUrl,
      `Kayıt sonrası /onboarding beklendi. GERÇEK URL: ${landedUrl}. ` +
        `/login ise davet-APPROVED düzeltmesi ETKİN DEĞİL (pointer eski ya da FE token iletmiyor).`,
    ).toContain('/onboarding');

    // Onboarding gerçekten yüklendi mi — ilk adım (ProfileStep) göründü.
    await expect(page.getByText('Sektörün / Alanın', { exact: false })).toBeVisible({ timeout: 15_000 });
  });

  test('SENARYO 2 — mevcut kuruma MENTÖR kaydı → onboarding + "Mentorluk Tarzı" YOK', async ({ page }) => {
    const { mentor } = loadRuntime();

    await fillRegister(page, mentor);
    await page.waitForLoadState('networkidle');
    const landedUrl = page.url();

    expect(
      landedUrl,
      `Mentör kaydı sonrası /onboarding beklendi. GERÇEK URL: ${landedUrl}.`,
    ).toContain('/onboarding');

    // Onboarding ilk adımı (ProfileStep) yüklendi.
    await expect(page.getByText('Sektörün / Alanın', { exact: false })).toBeVisible({ timeout: 15_000 });
    // Mentöre ESKİ "Mentorluk Tarzı" (interactionStyle) sorusu SORULMAZ (KALDIRILDI, §10.2).
    await expect(page.getByText('Mentorluk Tarzı', { exact: false })).toHaveCount(0);
  });
});
