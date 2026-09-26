/**
 * Kimlik doğrulama tipleri — backend authController.ts yanıtlarıyla eşleşir.
 */

import type { TenantBranding } from './tenant';

export type UserRole = 'ADMIN' | 'MENTOR' | 'MENTI';
export type ApprovalStatus = 'PENDING' | 'APPROVED' | 'REJECTED';
export type AuthProvider = 'LOCAL' | 'GOOGLE' | 'LINKEDIN';

export interface AuthUser {
  id: string;
  tenantId: string;
  role: UserRole;
  fullName: string;
  email: string;
  approvalStatus: ApprovalStatus;
  authProvider: AuthProvider;
  discType: 'D' | 'I' | 'S' | 'C' | null;
  // #12: normalize DISC vektöründen türetilmiş 1–3 harflik gösterim (ör. "DI", "Di"). Backend üretir.
  discLetters?: string | null;
  needsOrientation: boolean;
  // GV-18: rıza metni sürümü güncellenip aktif rıza eskide kalırsa true (bugün hep false —
  // CONSENT_VERSION yer tutucu, avukat metni gelene kadar hiçbir aktif kullanıcı tetiklemez).
  needsReconsent: boolean;
}

/** POST /api/auth/login yanıtı — refreshToken artık HttpOnly cookie'de */
export interface LoginResponse {
  accessToken: string;
  expiresIn: number;
  user: Pick<AuthUser, 'id' | 'tenantId' | 'role' | 'fullName' | 'email' | 'approvalStatus' | 'discType' | 'discLetters' | 'needsOrientation' | 'needsReconsent'>;
  tenant: {
    id: string;
    name: string;
    slug: string;
    logoUrl: string | null;
    primaryColor: string;
  } | null;
}

/** login / refresh yanıtındaki kurum markası (oturumdaki kullanıcının KENDİ kurumu). */
export type SessionTenant = NonNullable<LoginResponse['tenant']>;

/**
 * POST /api/auth/refresh yanıtı — refreshToken artık HttpOnly cookie'de.
 * KR-02/KR-03: backend kullanıcıyı ve kendi kurum markasını da döndürür (sayfa yenilemede
 * oturum ve marka geri gelsin diye). Eski backend ile uyum için alanlar isteğe bağlı.
 */
export interface RefreshResponse {
  accessToken: string;
  expiresIn: number;
  user?: LoginResponse['user'];
  tenant?: SessionTenant | null;
}

/** AuthProvider'ın React context'e sağladığı değerler. */
export interface AuthContextValue {
  user: AuthUser | null;
  /** Oturumdaki kullanıcının kendi kurum markası (login / refresh / me yanıtından). */
  tenant: TenantBranding | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  /** Başarılı girişte login response'undaki user verisini döner (smart redirect için). */
  login: (credentials: LoginCredentials) => Promise<LoginResponse['user']>;
  logout: () => Promise<void>;
  /** 401 interceptor tarafından çağrılır; yeni token veya null döner */
  refreshAccessToken: () => Promise<string | null>;
  /**
   * OAuth callback sayfası tarafından çağrılır.
   * refreshToken artık HttpOnly cookie'de — sadece accessToken + expiresIn alır.
   */
  loginWithTokens: (accessToken: string, expiresIn: number) => Promise<void>;
}

export interface LoginCredentials {
  email: string;
  password: string;
}
