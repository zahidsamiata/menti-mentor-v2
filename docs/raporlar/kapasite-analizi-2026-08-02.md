# Kapasite / Ölçeklenme Analizi
**Tarih:** 2026-08-02 · **Mod:** salt-okuma (kod okundu, çalıştırılmadı) · **Soru:** kullanıcı artınca hangi kod patlar?
**Önemli:** Hiçbir kod değişmedi. Bu bir ÖNLEM raporu (gerçek kullanıcı ~sıfır). Uygulama kararı Zahid'de.

> Güven etiketi: **DOĞRULANDI** (dosya birebir okundu) · **teyit önerilir** (keşif ajanı bulgusu, satır/ifade gevşek olabilir).

---

## En kritik 3 darboğaz

### 🔴 1. `listUsers` — sayfalama YOK (CANLI-ÖNCESİ) — **DOĞRULANDI**
- **KATMAN:** API + DB
- **KANIT:** `backend/src/controllers/userController.ts:58` — `prisma.user.findMany({ where: { tenantId, role?, isActive? }, select: {...PII...} })` — **`take`/`skip` yok**, `orderBy` var, sonra `total: users.length`. Tenant'ın TÜM kullanıcılarını döndürüyor; select PII içeriyor (`email`, `fullName`, `bioSummary`, `expertiseDetails`, `targetAudience`).
- **NE ZAMAN PATLAR:** ~800–1000+ kullanıcı/tenant → tek response'ta yüzlerce PII kayıt → admin havuz sayfası (mentör/menti havuzu bu endpoint'i çağırıyor) yavaşlar, ~birkaç bin kayıtta timeout/bellek baskısı.
- **ÇÖZÜM:** `page`/`pageSize` ekle — `adminController` zaten `Math.min(pageSize, 100)` + `skip/take` deseni kullanıyor; aynısını uygula. Ek olarak select'i havuz listesi için daralt (over-fetch PII azalt).
- **EFOR:** Küçük (~15–30 dk). **ÖNCELİK:** canlı-öncesi.

### 🟡 2. Neon connection pool + senkron mail cron (CANLI-SONRASI) — **teyit önerilir**
- **KATMAN:** DB bağlantısı + altyapı
- **KANIT:** `backend/src/db.ts` PrismaClient bağlantı havuzu/`connection_limit` ayarı olmadan kuruluyor (Neon pooler default ~sınırlı); `backend/src/services/cronScheduler.ts` feedback/hatırlatma maillerini döngüde `await` ile **seri** gönderiyor (fire-and-forget değil).
- **NE ZAMAN PATLAR:** ~30–40 eşzamanlı istek + aynı anda mail cron → "too many connections" / kuyruk + gecikme; 500+ bekleyen görüşmede cron uzun süre bloklar, diğer cron'lar (tuning/purge) gecikir.
- **ÇÖZÜM:** Prisma `connection_limit` / Neon pooler boyutu ayarla; mail'i `void ...catch()` fire-and-forget + `Promise.allSettled` ile kümeleyerek gönder.
- **EFOR:** Orta (~30–60 dk). **ÖNCELİK:** canlı-sonrası (büyümeyle kritikleşir; staging load-test ile).

### 🟡 3. Eşleştirme cache yok + `take: 500` (CANLI-SONRASI) — **teyit önerilir**
- **KATMAN:** Eşleştirme servisi
- **KANIT:** `backend/src/services/matching.ts` her istekte aday havuzunu çekip O(n) skorluyor (snapshot/cache yok); `take: 500` sabit aday sınırı. `rankMentisForMentor` per-mentör on-demand çalışıyor.
- **NE ZAMAN PATLAR:** Çok sayıda mentör aynı anda liste açınca (ör. 50 mentör × 500 aday skorlama) CPU + tekrarlı DB fetch; 500+ uygun adayda `take:500` sayıyı da kırpar (admin "N menti" yanlış görebilir).
- **ÇÖZÜM:** Günlük ranking snapshot / in-memory cache; `take` sınırını sayfalamaya bağla.
- **EFOR:** Orta+ (cache altyapısı). **ÖNCELİK:** canlı-sonrası (düşük).

---

## Diğer gözlemler (ikincil)
- **Rate limit var ama kaba:** `middleware/rateLimiter.ts` tenant başına genel bir bucket (per-endpoint/per-user ayrımı zayıf) — kötüye kullanımda meşru kullanıcı 429 alabilir. *(teyit önerilir)*
- **Frontend büyük liste:** admin havuz sayfalarında sayfalama var (prev/next) ama sanallaştırma yok — sayfa başına 100+ satırda DOM/re-render yavaşlar. Kozmetik/UX. *(teyit önerilir)*
- **Altyapı olumlu:** JWT stateless (yatay ölçeklenmeye uygun), dosya yükleme URL-tabanlı (sunucu diski yok). Ancak in-process `node-cron` (`startCronScheduler`) çok-instance deploy'da **cron duplication** riski taşır → staging'de tek-instance/lock ile ele alınmalı. *(teyit önerilir)*

---

## Kaba kapasite tahmini (varsayımlı — uydurma değil, aralık)
**Varsayımlar:** Neon pooler default, Prisma pool config yok, mail senkron cron, matching cache yok, tek instance.

| Metrik | Rahat | Sarı (izle) | İlk kırılma |
|---|---|---|---|
| Kullanıcı/tenant | ~100–500 | 500–1500 | **`listUsers` ~800–1000** |
| Eşzamanlı HTTP | ~30–50 | 50–100 | Neon pool ~30–40 |
| Günlük mail | ~100–500 | 500–2000 | senkron cron 500+ bekleyen görüşme |
| Aktif tenant | ~5–10 | 10–30 | admin listeleme O(n) |

**İlk kırılacak yer:** `listUsers` (sayfalamasız) — bu yüzden tek "canlı-öncesi" madde.

---

## Sonuç
- **Canlı-öncesi mutlaka:** #1 `listUsers` sayfalama (küçük, yüksek etki).
- **Canlı-sonrası yeter:** #2 Neon pool + mail cron, #3 matching cache, rate limit inceliği, frontend sanallaştırma, cron-lock.
- Mimari temel sağlıklı (stateless, dış depo). Darboğazlar noktasal ve çözülebilir. **Hiçbir kod değişmedi.**
