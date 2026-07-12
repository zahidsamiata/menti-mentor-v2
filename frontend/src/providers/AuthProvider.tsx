'use client';

/**
 * Kimlik doğrulama state yönetimi.
 *
 * Token depolama stratejisi:
 *  - accessToken: memory'de (React state) — XSS saldırısına karşı en güvenli yer.
 *  - refreshToken: HttpOnly + Secure + SameSite=Strict cookie — JS erişemez.
 *
 * Otomatik token yenileme:
 *  - accessToken süresi 1 saat. 55. dakikada (expire'dan 5 dk önce) refresh tetiklenir.
 *  - Sekme kapatılıp yeniden açıldığında cookie otomatik gönderilir → sessiz giriş.
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

/** accessToken expire'dan kaç ms önce yenileme tetiklenir (5 dakika) */
const REFRESH_BEFORE_EXPIRY_MS = 5 * 60 * 1000;

// ─── Context ─────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextValue | null>(null);

// ─── Provider ────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Token yenileme ──────────────────────────────────────────────────────

  const scheduleTokenRefresh = useCallback((expiresInSeconds: number) => {
    if (refreshTimerRef.current) clearTimeout(refreshTimerRef.current);

    const delay = expiresInSeconds * 1000 - REFRESH_BEFORE_EXPIRY_MS;
    if (delay <= 0) return;

    refreshTimerRef.current = setTimeout(async () => {
      // refreshToken HttpOnly cookie'de — body'e eklemeye gerek yok
      const result = await apiClient<RefreshResponse>('/api/auth/refresh', {
        method: 'POST',
      });

      if (result.ok) {
        setAccessToken(result.data.accessToken);
        scheduleTokenRefresh(result.data.expiresIn);
      } else {
        clearSession();
      }
    }, delay);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const clearSession = useCallback(() => {
    setUser(null);
    setAccessToken(null);
    if (refreshTimerRef.current) clearTimeout(refreshTimerRef.current);
    refreshCallbackRef.current = null;
  }, []);

  // ── Token yenileme fonksiyonu (interceptor tarafından çağrılır) ─────────
  const refreshAccessToken = useCallback(async (): Promise<string | null> => {
    const result = await apiClient<RefreshResponse>('/api/auth/refresh', {
      method: 'POST',
      withRefresh: false,
    });

    if (!result.ok) { clearSession(); return null; }

    setAccessToken(result.data.accessToken);
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
    (async () => {
      // Cookie varsa backend otomatik okur — body'de token göndermiyoruz
      const result = await apiClient<RefreshResponse>('/api/auth/refresh', {
        method: 'POST',
      });

      if (result.ok) {
        setAccessToken(result.data.accessToken);
        scheduleTokenRefresh(result.data.expiresIn);
      }
      // Cookie yoksa veya süresi dolmuşsa → misafir oturumu (isLoading=false)
      setIsLoading(false);
    })();

    return () => {
      if (refreshTimerRef.current) clearTimeout(refreshTimerRef.current);
    };
  }, [scheduleTokenRefresh]);

  // ── Giriş ───────────────────────────────────────────────────────────────

  const login = useCallback(async (credentials: LoginCredentials): Promise<LoginResponse['user']> => {
    const result = await apiClient<LoginResponse>('/api/auth/login', {
      method: 'POST',
      body: credentials,
    });

    if (!result.ok) {
      const err = new Error(result.error.message ?? 'Giriş başarısız.');
      Object.assign(err, { code: result.error.error });
      throw err;
    }

    const { accessToken: newToken, expiresIn, user: userData } = result.data;
    // refreshToken artık HttpOnly cookie'de — localStorage'a yazmıyoruz

    setAccessToken(newToken);
    setUser(userData as AuthUser);
    scheduleTokenRefresh(expiresIn);
    return userData;
  }, [scheduleTokenRefresh]);

  // ── OAuth token ile giriş (Google / LinkedIn callback) ──────────────────

  const loginWithTokens = useCallback(
    async (newAccessToken: string, expiresIn: number) => {
      // refreshToken HttpOnly cookie'de (backend redirect'te set etti)
      setAccessToken(newAccessToken);
      scheduleTokenRefresh(expiresIn);

      const meResult = await apiClient<AuthUser>('/api/auth/me', {
        token: newAccessToken,
      });
      if (meResult.ok) {
        setUser(meResult.data);
      }
    },
    [scheduleTokenRefresh],
  );

  // ── Çıkış ───────────────────────────────────────────────────────────────

  const logout = useCallback(async () => {
    // refreshToken cookie'den okunur — body'de göndermiyoruz
    void apiClient('/api/auth/logout', {
      method: 'POST',
      token: accessToken ?? undefined,
    });
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
