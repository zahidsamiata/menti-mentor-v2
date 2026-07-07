'use client';

/**
 * _RegisterContent — Davet token'lı sürtünmesiz kayıt formu.
 *
 * Akış:
 *  1. ?token okunur → GET /api/invitations/:token/join → tenant branding + rol
 *  2. Tenant CSS değişkenleri container'a enjekte edilir (TenantProvider'a ihtiyaç duymaz)
 *  3. 3 alanlı form: e-posta, şifre, şifre tekrar
 *  4. Kayıt → otomatik giriş → /onboarding
 *
 * fullName: Minimum sürtünme için e-posta öneki kullanılır; kullanıcı onboarding'de günceller.
 */

import { useEffect, useId, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Eye, EyeOff, CheckCircle2, AlertCircle, CreditCard } from 'lucide-react';
import { Button }     from '@/components/ui/button';
import { Input }      from '@/components/ui/input';
import { Label }      from '@/components/ui/label';
import { OAuthButtons } from '@/components/molecules/OAuthButtons';
import { TenantLogo }   from '@/components/atoms/TenantLogo';
import { fetchInvitation } from '@/lib/api/invitation';
import { authApi }    from '@/lib/api/auth';
import { buildTenantThemeVars } from '@/lib/branding';
import { useAuth }    from '@/providers/AuthProvider';
import { cn }         from '@/lib/utils';
import type { InvitationData } from '@/types/invitation';

// ─── İlerleme Göstergesi ──────────────────────────────────────────────────────

const STEPS = ['Davet', 'Kayıt', 'Profil', 'Test'] as const;
const CURRENT_STEP = 2; // 1-indexed

function ProgressBar() {
  return (
    <div className="w-full space-y-2">
      {/* Adım sayacı */}
      <div className="flex items-center justify-between text-xs">
        <span className="font-semibold text-foreground">
          {CURRENT_STEP} / {STEPS.length} — Hesabını Oluşturuyorsun
        </span>
        <span className="text-muted-foreground">
          {Math.round((CURRENT_STEP / STEPS.length) * 100)}%
        </span>
      </div>

      {/* Noktalı adım göstergesi */}
      <div className="flex items-center gap-0">
        {STEPS.map((label, i) => {
          const stepNum  = i + 1;
          const done     = stepNum < CURRENT_STEP;
          const active   = stepNum === CURRENT_STEP;
          return (
            <div key={label} className="flex items-center flex-1">
              <div className={cn(
                'h-1.5 rounded-full transition-all duration-500',
                done   && 'bg-primary',
                active && 'bg-primary',
                !done && !active && 'bg-muted-foreground/25',
                'w-full',
              )} />
            </div>
          );
        })}
      </div>

      {/* Mikro metin */}
      <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <CreditCard className="h-3 w-3 shrink-0" aria-hidden />
        Kredi kartı yok. Kurulum sadece 3 dakika.
      </p>
    </div>
  );
}

// ─── Şifre Input'u (göster/gizle toggle'lı) ──────────────────────────────────

interface PasswordFieldProps {
  id:          string;
  label:       string;
  value:       string;
  onChange:    (v: string) => void;
  error?:      string;
  autoComplete?: string;
}

function PasswordField({ id, label, value, onChange, error, autoComplete }: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Input
          id={id}
          type={visible ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete={autoComplete}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-err` : undefined}
          className={cn('pr-10', error && 'border-destructive focus-visible:ring-destructive')}
          placeholder="••••••••"
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          aria-label={visible ? 'Şifreyi gizle' : 'Şifreyi göster'}
        >
          {visible
            ? <EyeOff className="h-4 w-4" aria-hidden />
            : <Eye    className="h-4 w-4" aria-hidden />
          }
        </button>
      </div>
      {error && (
        <p id={`${id}-err`} role="alert" className="flex items-center gap-1 text-xs text-destructive">
          <AlertCircle className="h-3 w-3 shrink-0" aria-hidden />
          {error}
        </p>
      )}
    </div>
  );
}

// ─── RegisterContent ──────────────────────────────────────────────────────────

export default function RegisterContent() {
  const router       = useRouter();
  const searchParams = useSearchParams();
  const { login }    = useAuth();
  const emailId      = useId();

  const token = searchParams.get('token');

  // ── Davet verisi ─────────────────────────────────────────────────────────────
  const [invitation,       setInvitation]       = useState<InvitationData | null>(null);
  const [inviteLoading,    setInviteLoading]    = useState(!!token);
  const [inviteError,      setInviteError]      = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    setInviteLoading(true);
    (async () => {
      const result = await fetchInvitation(token);
      if (result.valid) {
        setInvitation(result);
      } else {
        setInviteError(result.message);
      }
      setInviteLoading(false);
    })();
  }, [token]);

  // ── Form state ───────────────────────────────────────────────────────────────
  const [email,     setEmail]     = useState('');
  const [password,  setPassword]  = useState('');
  const [confirm,   setConfirm]   = useState('');
  const [errors,    setErrors]    = useState<{ email?: string; password?: string; confirm?: string; kvkk?: string }>({});
  const [kvkkConsent, setKvkkConsent] = useState(false);
  const [submitErr, setSubmitErr] = useState<string | null>(null);
  const [loading,   setLoading]   = useState(false);

  // ── Şifre gücü göstergesi (uzunluk tabanlı) ──────────────────────────────────
  const pwStrength = password.length === 0 ? 0
    : password.length < 8  ? 1
    : password.length < 12 ? 2
    : password.length < 16 ? 3
    : 4;

  const PW_BARS = [
    'bg-destructive',
    'bg-orange-400',
    'bg-yellow-400',
    'bg-emerald-500',
  ] as const;

  const PW_LABELS = ['', 'Zayıf', 'Orta', 'İyi', 'Güçlü'] as const;

  // ── Validasyon ───────────────────────────────────────────────────────────────
  function validate(): boolean {
    const e: typeof errors = {};
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      e.email = 'Geçerli bir e-posta adresi girin.';
    }
    if (!password || password.length < 8) {
      e.password = 'Şifre en az 8 karakter olmalıdır.';
    }
    if (password !== confirm) {
      e.confirm = 'Şifreler eşleşmiyor.';
    }
    if (!kvkkConsent) {
      e.kvkk = 'KVKK kapsamında veri işleme onayı zorunludur.';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  // ── Form submit ───────────────────────────────────────────────────────────────
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitErr(null);
    if (!validate()) return;

    const tenantSlug = invitation?.slug;
    const role       = invitation?.role ?? 'MENTI';

    if (!tenantSlug) {
      setSubmitErr('Davet bilgisi eksik. Lütfen davet linkinizi kullanarak kayıt olun.');
      return;
    }

    setLoading(true);

    // fullName: minimum sürtünme — email öneki, onboarding'de güncellenir
    const fullName = email.split('@')[0]?.replace(/[^a-zA-ZğüşıöçĞÜŞİÖÇ\s]/g, '') || 'Kullanıcı';

    const regResult = await authApi.register({ email, password, fullName, role, tenantSlug, kvkkConsent: true });

    if (!regResult.ok) {
      setLoading(false);
      setSubmitErr(regResult.error.message ?? 'Kayıt başarısız. Lütfen tekrar deneyin.');
      return;
    }

    // Kayıt başarılı → otomatik giriş
    try {
      await login({ email, password });
      router.push('/onboarding');
    } catch {
      setLoading(false);
      setSubmitErr('Hesap oluşturuldu ancak otomatik giriş başarısız. Lütfen giriş yapın.');
      router.push('/login');
    }
  }

  // ── CSS değişkenlerini tenant rengiyle besle ──────────────────────────────────
  const themeVars = invitation ? buildTenantThemeVars(invitation.primaryColor) : undefined;

  // ── Yükleniyor ────────────────────────────────────────────────────────────────
  if (inviteLoading) {
    return (
      <div className="w-full max-w-sm space-y-4">
        <div className="h-12 rounded-xl bg-muted animate-pulse" />
        <div className="h-96 rounded-2xl bg-muted animate-pulse" />
      </div>
    );
  }

  return (
    <div
      className="w-full max-w-sm space-y-5"
      style={themeVars as React.CSSProperties}
    >
      {/* ── İlerleme barı ────────────────────────────────────────────── */}
      <ProgressBar />

      {/* ── Tenant logosu (token varsa) ──────────────────────────────── */}
      {invitation && (
        <div className="flex flex-col items-center gap-1.5 pb-1">
          <TenantLogo
            tenant={{ displayName: invitation.tenantName, logoUrl: invitation.logoUrl }}
            size={48}
            className="rounded-xl"
          />
          <p className="text-xs text-muted-foreground text-center">
            <strong className="text-foreground">{invitation.tenantName}</strong> mentörlük ağına katılıyorsun
          </p>
        </div>
      )}

      {/* ── Davet hatası (geçersiz token) ───────────────────────────── */}
      {inviteError && (
        <div className="flex items-start gap-2.5 rounded-xl border border-destructive/30 bg-destructive/5 p-3.5">
          <AlertCircle className="h-4 w-4 text-destructive shrink-0 mt-0.5" aria-hidden />
          <p className="text-xs text-destructive leading-relaxed">
            {inviteError}
            <br />
            <span className="text-muted-foreground">Yöneticinizden yeni bir davet linki isteyin.</span>
          </p>
        </div>
      )}

      {/* ── Ana kart ─────────────────────────────────────────────────── */}
      <div className={cn(
        'rounded-2xl border border-border bg-card shadow-sm overflow-hidden',
        invitation && 'border-t-2 border-t-primary',
      )}>
        <div className="px-6 pt-5 pb-1">
          <h1 className="text-lg font-bold text-foreground">Hesabını Oluştur</h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            {invitation
              ? `${invitation.role === 'MENTOR' ? 'Mentör' : 'Menti'} olarak katılıyorsun`
              : 'MentiMentor platformuna katıl'
            }
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="p-6 pt-4 space-y-4">

          {/* ── Google OAuth ─────────────────────────────────────────── */}
          {invitation && (
            <>
              <OAuthButtons
                tenantSlug={invitation.slug}
                role={invitation.role}
                disabled={loading}
              />

              {/* Ayraç */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-border" />
                <span className="text-xs text-muted-foreground font-medium">veya</span>
                <div className="flex-1 h-px bg-border" />
              </div>
            </>
          )}

          {/* ── E-posta ──────────────────────────────────────────────── */}
          <div className="space-y-1.5">
            <Label htmlFor={emailId}>E-posta Adresi</Label>
            <Input
              id={emailId}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              placeholder="ad@ornek.com"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? `${emailId}-err` : undefined}
              className={cn(errors.email && 'border-destructive focus-visible:ring-destructive')}
              disabled={loading}
            />
            {errors.email && (
              <p id={`${emailId}-err`} role="alert" className="flex items-center gap-1 text-xs text-destructive">
                <AlertCircle className="h-3 w-3 shrink-0" aria-hidden />
                {errors.email}
              </p>
            )}
          </div>

          {/* ── Şifre ────────────────────────────────────────────────── */}
          <PasswordField
            id="reg-password"
            label="Güçlü Bir Şifre"
            value={password}
            onChange={setPassword}
            error={errors.password}
            autoComplete="new-password"
          />

          {/* Şifre gücü göstergesi */}
          {password.length > 0 && (
            <div className="space-y-1 -mt-2">
              <div className="flex gap-1">
                {[1, 2, 3, 4].map((bar) => (
                  <div
                    key={bar}
                    className={cn(
                      'h-1 flex-1 rounded-full transition-all duration-300',
                      bar <= pwStrength
                        ? PW_BARS[pwStrength - 1]
                        : 'bg-muted',
                    )}
                  />
                ))}
              </div>
              <p className="text-[10px] text-muted-foreground">
                Güç: <strong>{PW_LABELS[pwStrength]}</strong>
                {pwStrength < 2 && ' — en az 8 karakter kullanın'}
              </p>
            </div>
          )}

          {/* ── Şifre Tekrar ──────────────────────────────────────────── */}
          <PasswordField
            id="reg-confirm"
            label="Şifre Tekrar"
            value={confirm}
            onChange={setConfirm}
            error={errors.confirm}
            autoComplete="new-password"
          />

          {/* Eşleşme onayı */}
          {confirm.length > 0 && password === confirm && (
            <p className="flex items-center gap-1 text-xs text-emerald-600 -mt-2">
              <CheckCircle2 className="h-3.5 w-3.5 shrink-0" aria-hidden />
              Şifreler eşleşiyor
            </p>
          )}

          {/* ── KVKK onayı ───────────────────────────────────────────── */}
          <div className="space-y-1">
            <label className="flex items-start gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={kvkkConsent}
                onChange={(e) => {
                  setKvkkConsent(e.target.checked);
                  if (e.target.checked) setErrors((p) => ({ ...p, kvkk: undefined }));
                }}
                className="mt-0.5 h-4 w-4 shrink-0 accent-primary"
                aria-invalid={!!errors.kvkk}
                disabled={loading}
              />
              <span className="text-xs text-muted-foreground leading-relaxed">
                <a href="/kvkk" target="_blank" rel="noopener noreferrer" className="underline text-primary hover:text-primary/80">
                  Kişisel Verilerin Korunması Kanunu (KVKK)
                </a>
                {' '}kapsamında verilerimin işlenmesine açık rıza veriyorum. (Zorunlu)
              </span>
            </label>
            {errors.kvkk && (
              <p role="alert" className="text-xs text-destructive pl-6">{errors.kvkk}</p>
            )}
          </div>

          {/* ── Genel hata ───────────────────────────────────────────── */}
          {submitErr && (
            <div className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2.5">
              <AlertCircle className="h-4 w-4 text-destructive shrink-0 mt-0.5" aria-hidden />
              <p className="text-xs text-destructive">{submitErr}</p>
            </div>
          )}

          {/* ── CTA butonu ───────────────────────────────────────────── */}
          <Button
            type="submit"
            size="lg"
            disabled={loading || !!inviteError}
            className="w-full h-12 text-base rounded-xl"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground animate-spin" />
                Hesap oluşturuluyor…
              </span>
            ) : (
              'Hesabımı Oluştur'
            )}
          </Button>

          {/* ── Gizlilik notu ────────────────────────────────────────── */}
          <p className="text-center text-[11px] text-muted-foreground leading-relaxed">
            Kayıt olarak{' '}
            <a
              href="/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-foreground transition-colors"
            >
              Kullanım Koşullarını
            </a>{' '}
            ve{' '}
            <a
              href="/gizlilik"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-foreground transition-colors"
            >
              Gizlilik Politikasını
            </a>{' '}
            kabul etmiş olursunuz.
          </p>
        </form>
      </div>

      {/* ── Zaten hesabın var mı? ─────────────────────────────────────── */}
      <p className="text-center text-xs text-muted-foreground">
        Zaten bir hesabın var mı?{' '}
        <a href="/login" className="font-semibold text-primary hover:underline underline-offset-2">
          Giriş Yap
        </a>
      </p>
    </div>
  );
}
