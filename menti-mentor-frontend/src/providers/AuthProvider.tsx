'use client';

/**
 * Kimlik doğrulama state yönetimi.
 *
 * Token depolama stratejisi:
 *  - accessToken: memory'de (React state) — XSS saldırısına karşı en güvenli yer.
 *  - refreshToken: httpOnly cookie ideal olur; burada localStorage kullanılıyor
 *    (backend httpOnly cookie desteği eklenene kadar geçici).
 *
 * Otomatik token yenileme:
 *  - accessToken süresi 1 saat. 55. dakikada (expire'dan 5 dk önce) refresh tetiklenir.
 *  - Sekme kapatılıp yeniden açıldığında localStorage'daki refreshToken ile
 *    yeni accessToken alınır (sessiz giriş).
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { apiClient, refreshCallbackRef } from '@/lib/api/client';
import type {
  AuthContextValue,
  AuthUser,
  LoginCredentials,
  LoginResponse,
  RefreshResponse,
} from '@/types/auth';


// ─── Sabitler ────────────────────────────────────────────────────────────────

const REFRESH_TOKEN_KEY = 'mm_refresh_token';
/** accessToken expire'dan kaç ms önce yenileme tetiklenir (5 dakika) */
const REFRESH_BEFORE_EXPIRY_MS = 5 * 60 * 1000;

// ─── Context ─────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextValue | null>(null);

// ─── Provider ────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Refresh timer ref'i — component unmount'ta temizlenir
  const refreshTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Token yenileme ──────────────────────────────────────────────────────

  const scheduleTokenRefresh = useCallback((expiresInSeconds: number) => {
    if (refreshTimerRef.current) clearTimeout(refreshTimerRef.current);

    const delay = expiresInSeconds * 1000 - REFRESH_BEFORE_EXPIRY_MS;
    if (delay <= 0) return;

    refreshTimerRef.current = setTimeout(async () => {
      const storedRefreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
      if (!storedRefreshToken) return;

      const result = await apiClient<RefreshResponse>('/api/auth/refresh', {
        method: 'POST',
        body: { refreshToken: storedRefreshToken },
      });

      if (result.ok) {
        setAccessToken(result.data.accessToken);
        localStorage.setItem(REFRESH_TOKEN_KEY, result.data.refreshToken);
        scheduleTokenRefresh(result.data.expiresIn);
      } else {
        // Refresh başarısız → oturumu temizle
        clearSession();
      }
    }, delay);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const clearSession = useCallback(() => {
    setUser(null);
    setAccessToken(null);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    if (refreshTimerRef.current) clearTimeout(refreshTimerRef.current);
    refreshCallbackRef.current = null;
  }, []);

  // ── Token yenileme fonksiyonu (interceptor tarafından çağrılır) ─────────
  const refreshAccessToken = useCallback(async (): Promise<string | null> => {
    const storedRefreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
    if (!storedRefreshToken) return null;

    const result = await apiClient<RefreshResponse>('/api/auth/refresh', {
      method: 'POST',
      body: { refreshToken: storedRefreshToken },
      withRefresh: false, // sonsuz döngüyü önle
    });

    if (!result.ok) { clearSession(); return null; }

    setAccessToken(result.data.accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, result.data.refreshToken);
    scheduleTokenRefresh(result.data.expiresIn);
    return result.data.accessToken;
  }, [clearSession, scheduleTokenRefresh]);

  // ── Interceptor için global ref'i güncelle ──────────────────────────────
  useEffect(() => {
    refreshCallbackRef.current = refreshAccessToken;
    return () => { refreshCallbackRef.current = null; };
  }, [refreshAccessToken]);

  // ── Sessiz giriş (sayfa yenileme) ──────────────────────────────────────

  useEffect(() => {
    const storedRefreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);

    if (!storedRefreshToken) {
      setIsLoading(false);
      return;
    }

    (async () => {
      const result = await apiClient<RefreshResponse>('/api/auth/refresh', {
        method: 'POST',
        body: { refreshToken: storedRefreshToken },
      });

      if (result.ok) {
        setAccessToken(result.data.accessToken);
        localStorage.setItem(REFRESH_TOKEN_KEY, result.data.refreshToken);
        scheduleTokenRefresh(result.data.expiresIn);
        // /api/auth/me ile kullanıcı profilini çek (tenant middleware gerektirmez için header yok)
        // Not: bu istek accessToken yenilendikten sonra yapılır
      } else {
        clearSession();
      }
      setIsLoading(false);
    })();

    return () => {
      if (refreshTimerRef.current) clearTimeout(refreshTimerRef.current);
    };
  }, [scheduleTokenRefresh, clearSession]);

  // ── Giriş ───────────────────────────────────────────────────────────────

  const login = useCallback(async (credentials: LoginCredentials): Promise<LoginResponse['user']> => {
    const result = await apiClient<LoginResponse>('/api/auth/login', {
      method: 'POST',
      body: credentials,
    });

    if (!result.ok) {
      throw new Error(result.error.message ?? 'Giriş başarısız.');
    }

    const { accessToken: newToken, refreshToken, expiresIn, user: userData } = result.data;

    setAccessToken(newToken);
    setUser(userData as AuthUser);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    scheduleTokenRefresh(expiresIn);
    return userData;
  }, [scheduleTokenRefresh]);

  // ── OAuth token ile giriş (Google / LinkedIn callback) ──────────────────

  /**
   * OAuth callback URL'inden gelen token çiftini alır; /me endpoint'ini
   * çağırarak kullanıcı profilini yükler ve state'i günceller.
   *
   * Bu metot OAuthCallbackPage tarafından çağrılır; şifre/email formuyla
   * giriş yerine token injeksiyonu ile oturum açar.
   */
  const loginWithTokens = useCallback(
    async (newAccessToken: string, refreshToken: string, expiresIn: number) => {
      setAccessToken(newAccessToken);
      localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
      scheduleTokenRefresh(expiresIn);

      // /me endpoint'inden kullanıcı profilini yükle
      // tenantId henüz bilinmiyor (token içinden decode edilemez client'ta)
      // Bu nedenle /me'ye X-Tenant-Id olmadan istek atılır; backend JWT'den alır
      const meResult = await apiClient<AuthUser>('/api/auth/me', {
        token: newAccessToken,
      });
      if (meResult.ok) {
        setUser(meResult.data);
      }
      // Profil yüklenemese bile session açık kalır; AuthTenantBridge tenant'ı sonra çeker
    },
    [scheduleTokenRefresh],
  );

  // ── Çıkış ───────────────────────────────────────────────────────────────

  const logout = useCallback(async () => {
    const storedRefreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
    if (storedRefreshToken) {
      // Sunucu tarafında refresh token'ı iptal et (hata olsa bile oturumu temizle)
      void apiClient('/api/auth/logout', {
        method: 'POST',
        body: { refreshToken: storedRefreshToken },
        token: accessToken ?? undefined,
      });
    }
    clearSession();
  }, [accessToken, clearSession]);

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        isAuthenticated: !!user && !!accessToken,
        isLoading,
        login,
        logout,
        refreshAccessToken,
        loginWithTokens,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth, AuthProvider içinde kullanılmalıdır.');
  }
  return ctx;
}
