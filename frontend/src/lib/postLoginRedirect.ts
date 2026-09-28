/**
 * Giriş sonrası yönlendirme — e-posta/şifre girişi (LoginForm) ve sosyal giriş dönüşü
 * (OAuth callback) TEK kaynaktan karar verir.
 *
 * AJ-59: kurum durum ekranı kuralı yalnız LoginForm'da yazılıydı; Google/LinkedIn ile giren kurum
 * yöneticisi, kurumu inceleme bekliyor ya da reddedilmiş olsa da panele gidiyordu. Kural buraya
 * taşındı ki iki giriş yolu aynı sonucu versin. Saf fonksiyonlardır (ağ/React yok) — birim testlenir.
 *
 * AJ-72: platformun dondurduğu (onaylı ama askıdaki, `isActive=false`) kurumun yöneticisi artık
 * askı ekranına (`/kurum-askida`) gider — eskiden panele gidip her istekte 403 alıyordu. Askı
 * `verificationStatus` değil `tenant.isSuspended` ile gelir. Durum ekranına (`pending-review`)
 * GÖNDERİLMEZ: o ekran APPROVED kurum için "Onaylandı → Giriş Yap" gösterir → giriş döngüsü.
 * Reddedilen (REJECTED) kurum da askıdadır ama kendi ret ekranı olduğundan durum ekranı önceliklidir.
 */
import type { TenantVerificationStatus } from '@/lib/api/selfServe';
import { TENANT_SUSPENDED_PATH } from '@/lib/tenantSuspension';

/** Hesabı onay bekleyen kullanıcının bekleme ekranı. */
export const PENDING_APPROVAL_PATH = '/pending-approval';

/** Kurum başvuru durum ekranı (kayıt sonrası da buraya gidilir — Step4Account). */
export const TENANT_REVIEW_PATH = '/onboarding/stk/pending-review';

/**
 * Yöneticiyi panel yerine durum ekranına götüren kurum durumları. Düzeltme istenen kurum
 * (CORRECTION_REQUESTED) panele gider — düzeltme formu panel bandında (TenantCorrectionBanner).
 */
export const TENANT_REVIEW_SCREEN_STATUSES: readonly TenantVerificationStatus[] = ['PENDING_REVIEW', 'REJECTED'];

/** Sosyal giriş dönüşünde rol yönlendirmesini yapan giriş noktası (rolüne göre panele atar). */
export const OAUTH_DEFAULT_PATH = '/dashboard';
/** Sosyal girişle ilk kez kayıt olan kullanıcının hoş geldin girişi. */
export const OAUTH_WELCOME_PATH = '/dashboard?welcome=1';

export interface PostLoginUser {
  role: string;
  approvalStatus: string;
  discType: string | null;
  /** Yalnız kurum yöneticisi için okunur; okunamadıysa null/undefined (yönlendirme değişmez). */
  tenantVerificationStatus?: TenantVerificationStatus | null;
  /** AJ-72: kurum askıda mı (dondurma/ret). Yalnız kurum yöneticisi için okunur; yoksa askı sayılmaz. */
  tenantIsSuspended?: boolean | null;
}

/**
 * Kurum yöneticisinin durum ekranına ya da askı ekranına gitmesi gerekiyorsa o adresi,
 * gerekmiyorsa null döner. İki giriş yolunun ORTAK kuralı budur.
 * Sıra: inceleniyor/reddedildi → durum ekranı (ret ekranı orada) · değilse askıda → askı ekranı.
 */
export function getTenantReviewRedirect(
  user: Pick<PostLoginUser, 'role' | 'tenantVerificationStatus' | 'tenantIsSuspended'>,
): string | null {
  if (user.role !== 'ADMIN') return null;
  const status = user.tenantVerificationStatus;
  if (status && TENANT_REVIEW_SCREEN_STATUSES.includes(status)) return TENANT_REVIEW_PATH;
  if (user.tenantIsSuspended === true) return TENANT_SUSPENDED_PATH;
  return null;
}

// E-posta girişi sonrası akıllı yönlendirme (dokümandaki durum tablosuna birebir uyar):
//   status PENDING  → /pending-approval  (backend 403 → LoginForm catch bloğu da yakalar)
//   status APPROVED → rol bazlı:
//     ADMIN   → kurum başvurusu inceleniyor/reddedildi ise /onboarding/stk/pending-review (AJ-35),
//               kurum askıdaysa /kurum-askida (AJ-72), değilse /admin/waiting-room
//     MENTOR  → discType yoksa /onboarding (8-soru DISC), varsa /mentor
//     MENTI   → discType yoksa /onboarding (8-soru DISC), varsa /menti
// Not: Platform admin (/platform) ayrı endpoint'ten giriş yapar; buradan yönlendirilmez.
export function getSmartRedirect(user: PostLoginUser): string {
  if (user.approvalStatus === 'PENDING') return PENDING_APPROVAL_PATH;
  if (user.role === 'ADMIN') return getTenantReviewRedirect(user) ?? '/admin/waiting-room';
  // /disc-test = adaptif Likert (mevcut kullanıcı). Yeni kullanıcı (discType=null) → /onboarding.
  if (!user.discType) return '/onboarding';
  if (user.role === 'MENTOR') return '/mentor';
  if (user.role === 'MENTI') return '/menti';
  return '/dashboard';
}

/**
 * Sosyal giriş dönüşü (OAuth callback) sonrası hedef. Kurum durum kuralı e-posta girişiyle
 * AYNIDIR; geri kalanında callback'in önceki davranışı korunur (panel girişi ya da yeni kullanıcı
 * için hoş geldin).
 */
export function getOAuthRedirect(
  user: Pick<PostLoginUser, 'role' | 'tenantVerificationStatus' | 'tenantIsSuspended'>,
  options: { isNewUser: boolean },
): string {
  return getTenantReviewRedirect(user) ?? (options.isNewUser ? OAUTH_WELCOME_PATH : OAUTH_DEFAULT_PATH);
}
