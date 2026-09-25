/**
 * KR-15 — e2e (Playwright) veritabanı kilidi, fail-closed.
 *
 * NEDEN: tarayıcı testleri gerçek kullanıcı/kurum kaydı yazar. Eskiden yalnız bilinen canlı
 * sağlayıcı desenleri (Neon/RDS/…) reddediliyordu; DATABASE_URL BOŞ olunca yalnız uyarı yazılıp
 * devam ediliyordu — lokalde bu değişken frontend sürecinde tanımlı olmadığı için koruma fiilen
 * devre dışıydı. Artık yalnız açıkça verilmiş YEREL bir veritabanı adresiyle çalışır.
 */
const LOCAL_DB_HOSTS = new Set(['localhost', '127.0.0.1', '::1', '[::1]']);

/** Güvenliyse host'u döndürür; değilse Türkçe gerekçeyle hata fırlatır. Saf fonksiyon. */
export function assertLocalE2eDatabase(databaseUrl: string | undefined): string {
  const url = databaseUrl?.trim();
  if (!url) {
    throw new Error(
      'GÜVENLİK KİLİDİ (e2e): DATABASE_URL tanımlı değil. Tarayıcı testleri gerçek kayıt yazar; ' +
        'backend\'in kullandığı YEREL test veritabanı adresini DATABASE_URL olarak verin (CI job gibi).',
    );
  }
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    throw new Error('GÜVENLİK KİLİDİ (e2e): DATABASE_URL çözümlenemedi; suite başlatılmadı.');
  }
  const host = parsed.hostname.toLowerCase();
  if (!LOCAL_DB_HOSTS.has(host) || parsed.searchParams.has('host')) {
    throw new Error(
      `GÜVENLİK KİLİDİ (e2e): DATABASE_URL yerel değil ("${host}"). Tarayıcı testi yalnız yerel/izole ` +
        'veritabanıyla koşar; suite başlatılmadı.',
    );
  }
  return host;
}
