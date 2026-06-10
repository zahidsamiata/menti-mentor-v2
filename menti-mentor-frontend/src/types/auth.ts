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

/** POST /api/auth/login yanıtı */
export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: Pick<AuthUser, 'id' | 'tenantId' | 'role' | 'fullName' | 'email' | 'approvalStatus'>;
  tenant: {
    id: string;
    name: string;
    slug: string;
    logoUrl: string | null;
    primaryColor: string;
  } | null;
}

/** POST /api/auth/refresh yanıtı */
export interface RefreshResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

/** AuthProvider'ın React context'e sağladığı değerler. */
export interface AuthContextValue {
  user: AuthUser | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  /** 401 interceptor tarafından çağrılır; yeni token veya null döner */
  refreshAccessToken: () => Promise<string | null>;
  /**
   * OAuth callback sayfası tarafından çağrılır.
   * URL parametrelerinden gelen token çiftini AuthProvider state'ine bağlar.
   * /me endpoint'ini çağırarak user profilini yükler.
   */
  loginWithTokens: (accessToken: string, refreshToken: string, expiresIn: number) => Promise<void>;
}

export interface LoginCredentials {
  email: string;
  password: string;
}
