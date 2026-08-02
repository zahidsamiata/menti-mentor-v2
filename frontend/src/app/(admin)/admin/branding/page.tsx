'use client';

/**
 * Kurum marka (branding) düzenleme sayfası — /admin/branding.
 *
 * Kurum yöneticisi logosunu ve ana rengini buradan günceller.
 * Onboarding wizard'ındaki Step3Branding ile aynı deseni kullanır
 * (preset renkler + custom picker + canlı önizleme), ancak mevcut tenant
 * değerleriyle dolar ve updateOnboarding ile kalıcılaştırır.
 *
 * ── Güvenlik (Katman 5 — logoUrl XSS) ─────────────────────────────────────
 * Kullanıcının girdiği logoUrl doğrudan render edilir; bu bir XSS yüzeyidir.
 * Korumalar:
 *  - Sadece `https://` ile başlayan URL kabul edilir; http:/data:/javascript:
 *    şemaları reddedilir (data:/SVG içine gömülü script backend'in url()
 *    kontrolünü geçebilir → burada erken kesilir).
 *  - Önizleme <img src> ile yapılır; asla CSS background url() ile DEĞİL
 *    (CSS injection yüzeyini kapatır).
 *  - Geçersiz URL varken kaydetme engellenir ve uyarı gösterilir.
 * primaryColor için hex `#RRGGBB` regex doğrulaması yapılır.
 */

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AlertMessage } from '@/components/molecules/AlertMessage';
import { useAuth } from '@/providers/AuthProvider';
import { useTenant } from '@/providers/TenantProvider';
import { updateOnboarding } from '@/lib/api/selfServe';

// ─── Sabitler ────────────────────────────────────────────────────────────────

const PRESET_COLORS = [
  { label: 'İndigo',     value: '#6366f1' },
  { label: 'Violet',     value: '#8b5cf6' },
  { label: 'Gök Mavisi', value: '#0ea5e9' },
  { label: 'Zümrüt',     value: '#10b981' },
  { label: 'Amber',      value: '#f59e0b' },
  { label: 'Gül',        value: '#f43f5e' },
] as const;

const HEX_COLOR = /^#[0-9a-fA-F]{6}$/;
const DEFAULT_COLOR = '#6366f1';

/**
 * logoUrl güvenli mi? Boş kabul edilir (logo istemeyebilir).
 * Sadece https:// şemasına izin verilir — parse edilebilir olması da şart.
 */
function isSafeLogoUrl(url: string): boolean {
  if (url.trim() === '') return true;
  try {
    return new URL(url).protocol === 'https:';
  } catch {
    return false;
  }
}

// ─── Sayfa ───────────────────────────────────────────────────────────────────

export default function BrandingPage() {
  const { user, accessToken } = useAuth();
  const { tenant } = useTenant();

  const [logoUrl, setLogoUrl] = useState(tenant?.logoUrl ?? '');
  const [primaryColor, setPrimaryColor] = useState(tenant?.primaryColor ?? DEFAULT_COLOR);
  const [saving, setSaving] = useState(false);
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const logoUrlValid = isSafeLogoUrl(logoUrl);
  const colorValid = HEX_COLOR.test(primaryColor);
  const canSave = logoUrlValid && colorValid && !saving;

  async function handleSave() {
    setAlert(null);

    if (!logoUrlValid) {
      setAlert({ type: 'error', message: 'Geçerli bir https:// resim URL’si girin.' });
      return;
    }
    if (!colorValid) {
      setAlert({ type: 'error', message: 'Renk kodu #RRGGBB biçiminde olmalı (örn. #6366f1).' });
      return;
    }
    if (!user?.tenantId || !accessToken) {
      setAlert({ type: 'error', message: 'Oturum bulunamadı. Lütfen yeniden giriş yapın.' });
      return;
    }

    setSaving(true);
    const result = await updateOnboarding(user.tenantId, accessToken, {
      logoUrl: logoUrl.trim(),
      primaryColor,
    });
    setSaving(false);

    if (result.ok) {
      setAlert({ type: 'success', message: 'Marka ayarları kaydedildi.' });
    } else {
      setAlert({ type: 'error', message: result.error.message ?? 'Kaydetme başarısız. Lütfen tekrar deneyin.' });
    }
  }

  // Önizlemede yalnızca güvenli ve dolu URL gösterilir.
  const showLogo = logoUrl.trim() !== '' && logoUrlValid;
  const previewName = tenant?.displayName ?? tenant?.name ?? 'Kurumunuz';

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-foreground">Marka Ayarları</h1>
        <p className="text-sm text-muted-foreground">
          Kurumunuzun logo ve rengini düzenleyin. Değişiklikler tüm kullanıcılarınıza yansır.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Görünüm</CardTitle>
          <CardDescription>Logo bir URL olarak, ana renk hazır seçenekler veya özel bir kodla belirlenir.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">

          {/* Logo URL */}
          <div className="space-y-1.5">
            <label htmlFor="logoUrl" className="text-sm font-medium text-foreground">
              Logo URL
            </label>
            <Input
              id="logoUrl"
              type="url"
              inputMode="url"
              placeholder="https://..."
              value={logoUrl}
              onChange={(e) => setLogoUrl(e.target.value)}
              aria-invalid={!logoUrlValid}
            />
            {!logoUrlValid && (
              <p className="text-xs text-destructive">Geçerli bir https:// resim URL&rsquo;si girin.</p>
            )}
            <p className="text-xs text-muted-foreground">
              Yalnızca https:// ile başlayan doğrudan resim bağlantıları kabul edilir. Boş bırakırsanız baş harfler gösterilir.
            </p>
          </div>

          {/* Ana renk */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">Ana Renk</p>
            <div className="flex gap-2 flex-wrap">
              {PRESET_COLORS.map(({ label, value }) => (
                <button
                  key={value}
                  type="button"
                  aria-label={label}
                  title={label}
                  onClick={() => setPrimaryColor(value)}
                  className="h-8 w-8 rounded-full border-2 transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  style={{
                    backgroundColor: value,
                    borderColor: primaryColor.toLowerCase() === value ? 'white' : 'transparent',
                    boxShadow: primaryColor.toLowerCase() === value ? `0 0 0 3px ${value}` : 'none',
                  }}
                />
              ))}
            </div>

            {/* Özel renk girişi */}
            <div className="flex items-center gap-2 mt-1">
              <input
                type="color"
                value={colorValid ? primaryColor : DEFAULT_COLOR}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="h-8 w-8 rounded-full border border-input cursor-pointer bg-transparent"
                aria-label="Özel renk seç"
              />
              <span className="text-xs text-muted-foreground font-mono">{primaryColor}</span>
            </div>
            {!colorValid && (
              <p className="text-xs text-destructive">Renk kodu #RRGGBB biçiminde olmalı (örn. #6366f1).</p>
            )}
          </div>

          {/* Canlı önizleme */}
          <div className="rounded-xl border border-border p-4 bg-background space-y-3">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Canlı Önizleme</p>
            <div className="flex items-center gap-3">
              {showLogo ? (
                // Güvenlik: <img src> (background url() DEĞİL) + https-only doğrulama.
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={logoUrl}
                  alt="Kurum logosu"
                  className="h-10 w-10 rounded-lg object-cover border border-border"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              ) : (
                <div
                  className="h-10 w-10 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0"
                  style={{ backgroundColor: colorValid ? primaryColor : DEFAULT_COLOR }}
                >
                  {previewName.slice(0, 2).toUpperCase()}
                </div>
              )}
              <div>
                <p className="text-sm font-semibold text-foreground">{previewName}</p>
                <p className="text-xs" style={{ color: colorValid ? primaryColor : undefined }}>
                  {tenant?.slug ? `mentimentor.app/${tenant.slug}` : 'Kurum bağlantınız'}
                </p>
              </div>
            </div>
          </div>

          {alert && <AlertMessage type={alert.type} message={alert.message} />}

          <div className="flex justify-end">
            <Button type="button" onClick={handleSave} disabled={!canSave}>
              {saving ? 'Kaydediliyor…' : 'Kaydet'}
            </Button>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}
