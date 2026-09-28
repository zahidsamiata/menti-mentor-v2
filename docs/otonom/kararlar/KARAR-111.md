### KARAR-111 · 🔵 EVET/HAYIR — mentör müsaitliğine görüşme türü + süre eklensin mi? (1 işi açar: K-15) [🔵 ⛔ MIGRATION]
**Kullanıcı ne görür:** Mentör müsaitlik eklerken her zaman aralığı için görüşme türünü (çevrim içi / yüz yüze / telefon) ve süresini (15-240 dk) seçer. Menti randevu alırken artık türü ve süreyi kendisi seçmez; mentörün o saat için tanımladığı "Görüşme Türü" seçeneklerinden birini seçer. Uymayan istek anlaşılır bir mesajla reddedilir. Bu, KARAR-1 (A) cevabının uygulaması. Bugün (main): müsaitlik kaydında tür/süre alanı yok (`backend/prisma/schema.prisma:1074` `AvailabilityBlock`), menti türü seçer (`backend/src/controllers/meetingController.ts:451`) ve süreyi 30/45/60/90 arasından seçer (`frontend/src/app/(dashboard)/book-meeting/page.tsx:30`).
**Ne değişir (DİKKAT — bilmen gereken üç şey):**
1. **Mevcut tüm müsaitlikler "Çevrim içi · 60 dk" olur.** Mentör formu yeniden kaydedene kadar mentileri yalnız bu türde randevu alabilir (bugün 3 tür ve 30/45/60/90 dk arasında seçebiliyorlar). KARAR-1'deki önerim "varsayılanlarla mevcut kayıtlar bozulmaz" demişti ama bu daralmayı açıkça yazmamıştı — şimdi yazıyorum.
2. **60 dakikadan kısa mevcut müsaitlikler hiç randevu saati göstermez** (60 dk sığmaz). Onayından önce canlıda kaç tane olduğu salt-okuma sorguyla sayılmalı; sayı bilinmiyor, sıfıra yakın olabilir.
3. Raporlardaki görüşme süreleri değişir: kayıtlar artık gerçek süreyi tutar (önceden hep 60 yazılıyordu).
**Geri alınır mı:** Evet — iki sütun kaldırılarak ya da yedekten geri yüklenerek (SQL'ler backend #189 açıklamasında).
**Yedeği alınacak tablo:** `AvailabilityBlock` → `availability_block_yedek_<tarih>` — **MERGE'DEN ÖNCE** alınmalı: sunucu açılışta migration'ı kendiliğinden uygular (`backend/Dockerfile:58` `prisma migrate deploy`). Bu oturumda veritabanı erişimi yok → EVET gelince "tek seferlik DB erişimi" gerekir.
**Kapsam notu:** KARAR-80 M10 "tek migration paketi" diyordu; AN-25 (esnek mod koşul alanları) tasarlanmadığı için bu pakete ALINMADI → ileride ikinci bir migration + ikinci yedek gerekecek. EVET, bu ayrımı da onaylamak demektir.
**Durum:** backend #189 (7b ONAY https://github.com/zahidsamiata/menti-mentor/pull/189#issuecomment-5855586568, CI yeşil, 8 yeni test) + çatı #374 (7b ONAY https://github.com/zahidsamiata/menti-mentor-v2/pull/374#issuecomment-5855586681). İkisi AYNI turda çıkmalı: #189 → pointer → #374 (yoksa eski ekranlar yeni sunucuyla çakışır).
**EVET** → (1) 60 dk'dan kısa blok sayımı (2) yedek tablo + satır sayısı `02-ILERLEME`'ye (3) #189 merge (4) pointer + #374 merge (5) canlı kontrol.
**HAYIR** → PR'lar kapatılır; randevu bugünkü gibi (menti türü/süreyi serbest seçer) kalır.
**Ne kaybedersin:** EVET → mevcut tüm müsaitlikler "Çevrim içi · 60 dk" olur, mentör yeniden kaydedene kadar menti seçenekleri daralır; 60 dk'dan kısa bloklar randevu göstermez; merge öncesi sayım + yedek için tek seferlik DB erişimi gerekir (KARAR-35); AN-25 için ikinci migration ileride gelir · HAYIR → KARAR-1 (A) cevabın uygulanmaz, menti türü/süreyi mentörün isteğinden bağımsız seçmeye devam eder; hazır iki PR kapanır.
**Benim önerim:** yok — ürün davranışı KARAR-1 (A) cevabınla seçildi; burada sorulan canlı veri daralmasını (madde 1-2) kabul edip etmediğin, bu yalnız senin (PR durumu 2026-09-28 gh: #189 ve #374 main ile temiz).
**Cevap vermezsen:** K-15 PR-ACIK bekler; bugünkü davranış sürer.
**İlgili kartlar:** KARAR-1 (bu kart onun A cevabının uygulaması) · KARAR-2 (profil bağlantı alanı migration'ı; aynı yedek/deploy turuna alınabilir) · KARAR-21 (anket cevap tipi migration'ı; aynı tura alınabilir) · KARAR-35 (60 dk altı blok sayımı salt-okuma izne bağlı) · KARAR-53 (müsaitlik hâlleri ①/②; bu kart blok yapısını değiştirir)
**CEVAP:**


