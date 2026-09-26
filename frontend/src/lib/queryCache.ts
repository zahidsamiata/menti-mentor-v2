/**
 * F-32 — sekme geçişi için bellek içi sorgu önbelleği (stale-while-revalidate).
 *
 * Neden: panel sekmeleri arasında her geçişte aynı GET'ler sıfırdan çekiliyor ve kullanıcı
 * her seferinde boş ekran + yükleniyor görüyordu. `useQuery` bir `cacheKey` alırsa son
 * yanıt burada tutulur; sekmeye dönüldüğünde hemen gösterilir, arka planda tazelenir.
 *
 * Veri sızıntısı önlemleri (KVKK — mesaj/profil gibi kişisel veri de burada durabilir):
 *  - YALNIZ modül belleğinde (Map). localStorage/sessionStorage/IndexedDB YOK → sekme
 *    kapanınca/sayfa yenilenince tamamen gider.
 *  - Kapsam (scope) = oturumdaki kullanıcı + kurum. AuthProvider kapsamı bildirir; kapsam
 *    değişince (çıkış, başka kullanıcıyla giriş, kurum değişimi) önbellek TAMAMEN silinir.
 *  - Kapsam yokken (misafir / AuthProvider dışı) hiçbir şey okunmaz ve yazılmaz.
 *  - Nesil (generation) sayacı: eski kapsamda başlamış bir istek, kapsam değiştikten sonra
 *    dönerse sonucu önbelleğe YAZILMAZ (geç gelen yanıt yeni kullanıcıya sızmaz).
 *  - Başarılı her yazma isteği (POST/PATCH/PUT/DELETE) önbelleği geçersiz kılar (apiClient).
 */

/** Önbellekteki kayıt bu süreden eskiyse gösterilmez (yeniden yükleme yapılır). */
export const QUERY_CACHE_TTL_MS = 5 * 60 * 1000;

interface CacheEntry {
  data: unknown;
  storedAt: number;
}

const entries = new Map<string, CacheEntry>();
let currentScope: string | null = null;
let generation = 0;

/** Oturum kapsamını bildirir; değiştiyse önbelleği temizler. Aynı değerle tekrar çağrı zararsızdır. */
export function setQueryCacheScope(scope: string | null): void {
  if (scope === currentScope) return;
  currentScope = scope;
  clearQueryCache();
}

/** Tüm kayıtları siler ve süren isteklerin sonuç yazmasını engeller. */
export function clearQueryCache(): void {
  entries.clear();
  generation += 1;
}

/** Yazma işlemi sonrası: tüm kayıtları (ya da verilen önekle başlayanları) geçersiz kılar. */
export function invalidateQueries(prefix?: string): void {
  if (prefix === undefined) {
    clearQueryCache();
    return;
  }
  for (const key of entries.keys()) {
    if (key.startsWith(`${currentScope}|${prefix}`)) entries.delete(key);
  }
}

function fullKey(cacheKey: string): string | null {
  return currentScope ? `${currentScope}|${cacheKey}` : null;
}

export function readQueryCache<T>(cacheKey: string, now: number = Date.now()): T | undefined {
  const key = fullKey(cacheKey);
  if (!key) return undefined;
  const entry = entries.get(key);
  if (!entry) return undefined;
  if (now - entry.storedAt > QUERY_CACHE_TTL_MS) {
    entries.delete(key);
    return undefined;
  }
  return entry.data as T;
}

/** İstek başlamadan alınan bilet; yanıt geldiğinde kapsam hâlâ aynıysa yazma yapılır. */
export function queryCacheTicket(): number {
  return generation;
}

export function writeQueryCache(cacheKey: string, data: unknown, ticket: number): void {
  if (ticket !== generation) return;
  const key = fullKey(cacheKey);
  if (!key) return;
  entries.set(key, { data, storedAt: Date.now() });
}
