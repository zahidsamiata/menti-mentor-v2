/**
 * Kimlik doğrulama tipleri — backend authController.ts yanıtlarıyla eşleşir.
 */

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
  needsOrientation: boolean;
}

/** POST /api/auth/login yanıtı — refreshToken artık HttpOnly cookie'de */
export interface LoginResponse {
  accessToken: string;
  expiresIn: number;
  user: Pick<AuthUser, 'id' | 'tenantId' | 'role' | 'fullName' | 'email' | 'approvalStatus' | 'discType' | 'needsOrientation'>;
  tenant: {
    id: string;
    name: string;
    slug: string;
    logoUrl: string | null;
    primaryColor: string;
  } | null;
}

/** POST /api/auth/refresh yanıtı — refreshToken artık HttpOnly cookie'de */
export interface RefreshResponse {
  accessToken: string;
  expiresIn: number;
}

/** AuthProvider'ın React context'e sağladığı değerler. */
export interface AuthContextValue {
  user: AuthUser | null;
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
