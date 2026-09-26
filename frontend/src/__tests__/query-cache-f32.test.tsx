/**
 * F-32 — sekme geçişi önbelleği (stale-while-revalidate).
 *
 * - Aynı anahtar ikinci girişte ağ isteği BEKLEMEDEN veriyi gösterir, arka planda tazeler.
 * - Negatif: çıkış / kullanıcı-kurum değişiminden sonra önceki kullanıcının verisi görünmez;
 *   eski oturumda başlamış geç yanıt yeni oturumun önbelleğine yazılmaz.
 * - Yazma isteği (POST/PATCH/DELETE) başarılı olunca önbellek geçersiz kılınır.
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, render, renderHook, screen, waitFor } from '@testing-library/react';
import { useQuery } from '@/hooks/useQuery';
import {
  QUERY_CACHE_TTL_MS,
  clearQueryCache,
  queryCacheTicket,
  readQueryCache,
  setQueryCacheScope,
  writeQueryCache,
} from '@/lib/queryCache';
import { apiClient } from '@/lib/api/client';
import { AuthProvider, useAuth } from '@/providers/AuthProvider';
import type { ApiResult } from '@/types/api';

function deferred<T>() {
  let resolve!: (v: T) => void;
  const promise = new Promise<T>((r) => { resolve = r; });
  return { promise, resolve };
}

beforeEach(() => {
  setQueryCacheScope(null);
  setQueryCacheScope('user-a:tenant-1');
});

afterEach(() => {
  setQueryCacheScope(null);
  vi.unstubAllGlobals();
});

describe('F-32 useQuery önbelleği', () => {
  it('aynı anahtar ikinci girişte beklemeden veri gösterir ve arka planda tazeler', async () => {
    const first = vi.fn(() => Promise.resolve<ApiResult<string>>({ ok: true, data: 'ilk' }));
    const view1 = renderHook(() => useQuery(first, [], { cacheKey: 'test:list' }));
    expect(view1.result.current.isLoading).toBe(true);
    await waitFor(() => expect(view1.result.current.data).toBe('ilk'));
    view1.unmount();

    // Sekmeye geri dönüş: ağ yanıtı henüz gelmedi ama veri ekranda.
    const pending = deferred<ApiResult<string>>();
    const second = vi.fn(() => pending.promise);
    const view2 = renderHook(() => useQuery(second, [], { cacheKey: 'test:list' }));
    expect(view2.result.current.data).toBe('ilk');
    expect(view2.result.current.isLoading).toBe(false);
    expect(second).toHaveBeenCalledTimes(1); // arka plan tazeleme başladı

    await act(async () => { pending.resolve({ ok: true, data: 'taze' }); });
    expect(view2.result.current.data).toBe('taze');
    expect(readQueryCache('test:list')).toBe('taze');
  });

  it('cacheKey verilmeyen sorgu eski davranışı korur (önbelleğe yazmaz, her girişte yükler)', async () => {
    const fetcher = vi.fn(() => Promise.resolve<ApiResult<string>>({ ok: true, data: 'x' }));
    const v1 = renderHook(() => useQuery(fetcher, []));
    await waitFor(() => expect(v1.result.current.data).toBe('x'));
    v1.unmount();
    const v2 = renderHook(() => useQuery(fetcher, []));
    expect(v2.result.current.data).toBeNull();
    expect(v2.result.current.isLoading).toBe(true);
    await waitFor(() => expect(v2.result.current.data).toBe('x'));
  });

  it('negatif: kullanıcı/kurum değişince önceki kullanıcının verisi gösterilmez', async () => {
    writeQueryCache('test:profile', 'A kişisinin verisi', queryCacheTicket());
    expect(readQueryCache('test:profile')).toBe('A kişisinin verisi');

    setQueryCacheScope('user-b:tenant-1');
    const pending = deferred<ApiResult<string>>();
    const view = renderHook(() => useQuery(() => pending.promise, [], { cacheKey: 'test:profile' }));
    expect(view.result.current.data).toBeNull();
    expect(view.result.current.isLoading).toBe(true);

    // Aynı kullanıcı başka kuruma geçse de önbellek boşalır.
    writeQueryCache('test:profile', 'B/kurum-1', queryCacheTicket());
    setQueryCacheScope('user-b:tenant-2');
    expect(readQueryCache('test:profile')).toBeUndefined();
  });

  it('negatif: eski oturumda başlayan geç yanıt yeni oturumun önbelleğine yazılmaz', async () => {
    const pending = deferred<ApiResult<string>>();
    const view = renderHook(() => useQuery(() => pending.promise, [], { cacheKey: 'test:late' }));
    setQueryCacheScope('user-b:tenant-1'); // istek sürerken oturum değişti
    await act(async () => { pending.resolve({ ok: true, data: 'A verisi (geç)' }); });
    view.unmount();
    expect(readQueryCache('test:late')).toBeUndefined();
  });

  it('negatif: oturum yokken (misafir) hiçbir şey önbelleğe alınmaz', () => {
    setQueryCacheScope(null);
    writeQueryCache('test:guest', 'veri', queryCacheTicket());
    expect(readQueryCache('test:guest')).toBeUndefined();
  });

  it('TTL dolan kayıt gösterilmez', () => {
    writeQueryCache('test:ttl', 'eski', queryCacheTicket());
    expect(readQueryCache('test:ttl', Date.now() + QUERY_CACHE_TTL_MS + 1)).toBeUndefined();
  });
});

describe('F-32 yazma sonrası geçersiz kılma (apiClient)', () => {
  function stubFetch(status = 200) {
    vi.stubGlobal('fetch', vi.fn(() => Promise.resolve(new Response(JSON.stringify({ ok: 1 }), { status }))));
  }

  it('başarılı POST/PATCH/DELETE sonrası önbellek boşalır', async () => {
    stubFetch();
    for (const method of ['POST', 'PATCH', 'DELETE'] as const) {
      writeQueryCache('meetings:list:all', ['görüşme'], queryCacheTicket());
      await apiClient('/api/meetings/1', { method });
      expect(readQueryCache('meetings:list:all')).toBeUndefined();
    }
  });

  it('GET, başarısız yazma ve oturum yenileme önbelleği silmez', async () => {
    writeQueryCache('meetings:list:all', ['görüşme'], queryCacheTicket());
    stubFetch();
    await apiClient('/api/meetings');
    await apiClient('/api/auth/refresh', { method: 'POST', withRefresh: false });
    stubFetch(400);
    await apiClient('/api/meetings', { method: 'POST', withRefresh: false });
    expect(readQueryCache('meetings:list:all')).toEqual(['görüşme']);
  });
});

describe('F-32 AuthProvider bağlantısı', () => {
  function LogoutProbe() {
    const { user, logout } = useAuth();
    return (
      <div>
        <span data-testid="who">{user?.id ?? 'yok'}</span>
        <button onClick={() => void logout()}>çık</button>
      </div>
    );
  }

  it('negatif: çıkış yapılınca önbellek temizlenir', async () => {
    clearQueryCache();
    vi.stubGlobal('fetch', vi.fn((url: string) => {
      if (String(url).endsWith('/api/auth/refresh')) {
        return Promise.resolve(new Response(JSON.stringify({
          accessToken: 'tok', expiresIn: 3600, user: { id: 'user-a', tenantId: 'tenant-1' },
        }), { status: 200 }));
      }
      return Promise.resolve(new Response(null, { status: 204 }));
    }));

    render(<AuthProvider><LogoutProbe /></AuthProvider>);
    await waitFor(() => expect(screen.getByTestId('who').textContent).toBe('user-a'));

    writeQueryCache('conversations:list', ['mesaj önizlemesi'], queryCacheTicket());
    expect(readQueryCache('conversations:list')).toEqual(['mesaj önizlemesi']);

    await act(async () => { screen.getByText('çık').click(); });
    await waitFor(() => expect(screen.getByTestId('who').textContent).toBe('yok'));
    expect(readQueryCache('conversations:list')).toBeUndefined();
  });
});
