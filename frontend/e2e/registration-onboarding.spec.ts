import { test, expect, type Page } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

/**
 * E2E (GERÇEK TARAYICI) — kayıt → onboarding zinciri (B→D).
 *
 * ⚠️ EK1 (PO): login-PENDING kopukluğu KANITLI (register/page → login() PENDING 403 →
 * catch → /login; /onboarding'e DEĞİL). Bu test büyük ihtimalle KIRMIZI düşecek —
 * BU DOĞRU SONUÇTUR (aracın FE↔BE kopukluğunu yakaladığının kanıtı).
 * ⛔ Testi geçirmek için beklenti ZAYIFLATILMAZ, ürün kodu DEĞİŞTİRİLMEZ, skip EDİLMEZ.
 * Kopukluk düzeltmesi AYRI tur (PO kararı).
 *
 * Adım 3-6 (onboarding/DISC/arketip/üç soru) yalnızca kopukluk DÜZELDİKTEN sonra
 * çalışır; şimdi Adım 2'deki assertion'da durur.
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
  // Davet çözülünce form belirir.
  await expect(page.getByLabel('E-posta Adresi')).toBeVisible({ timeout: 15_000 });

  await page.getByLabel('E-posta Adresi').fill(invite.email);
  await page.getByLabel('Güçlü Bir Şifre').fill(invite.password);
  await page.getByLabel('Şifre Tekrar').fill(invite.password);
  await page.getByRole('checkbox').check(); // KVKK + 18 beyanı
  await page.getByRole('button', { name: 'Hesabımı Oluştur' }).click();
}

test.describe('Kayıt → onboarding (gerçek tarayıcı, B→D)', () => {
  test('SENARYO 1 — mevcut kuruma MENTİ kaydı → onboarding açılmalı', async ({ page }) => {
    const { menti } = loadRuntime();

    // 1-2. Kayıt + ⭐ GERÇEK DAVRANIŞ (EK1): register sayfasının SÖZLEŞMESİ "/onboarding".
    await fillRegister(page, menti);

    // Gönderim sonrası nereye gidildiğini yakala (tanı için) — sonra beklentiyi assert et.
    await page.waitForLoadState('networkidle');
    const landedUrl = page.url();

    // ⭐ BEKLENTİ = register sayfasının iddia ettiği davranış (page.tsx:5 "kayıt → /onboarding").
    // Gerçek PENDING kullanıcı /login'e düşerse bu assertion KIRMIZI olur = kopukluk kanıtı.
    expect(
      landedUrl,
      `Kayıt sonrası /onboarding beklendi. GERÇEK URL: ${landedUrl}. ` +
        `/login veya /pending-approval ise login-PENDING kopukluğu (F.11 #12) doğrulanmış demektir.`,
    ).toContain('/onboarding');

    // ── Adım 3-6 (yalnız kopukluk düzeldikten SONRA ulaşılır) ──────────────────
    // 3. Profil adımı → DISC → arketip (dirençli, metin-tabanlı).
    await expect(page.getByRole('button')).toBeVisible();
    // 4. Üç soru ekranı — S1 en fazla 2 (opsiyonel), S2/S3 zorunlu.
    await expect(page.getByText('En fazla 2 seçebilirsin', { exact: false })).toBeVisible();
    const submit = page.getByRole('button', { name: /Tamamla ve Eşleşmeye Geç/ });
    // S2/S3 boşken buton engelli olmalı.
    await expect(submit).toBeDisabled();
    // 5-6 sonraki turlarda genişletilecek (arketip metni, S1 mentiden farkı vb.).
  });

  test('SENARYO 2 — mevcut kuruma MENTÖR kaydı → onboarding + "Mentorluk Tarzı" YOK', async ({ page }) => {
    const { mentor } = loadRuntime();

    await fillRegister(page, mentor);
    await page.waitForLoadState('networkidle');
    const landedUrl = page.url();

    expect(
      landedUrl,
      `Mentör kaydı sonrası /onboarding beklendi. GERÇEK URL: ${landedUrl}. ` +
        `/login ise login-PENDING kopukluğu mentör tarafında da geçerli.`,
    ).toContain('/onboarding');

    // Kopukluk düzeldikten sonra: mentöre ESKİ "Mentorluk Tarzı" (interactionStyle) sorusu SORULMAZ.
    await expect(page.getByText('Mentorluk Tarzı', { exact: false })).toHaveCount(0);
  });
});
