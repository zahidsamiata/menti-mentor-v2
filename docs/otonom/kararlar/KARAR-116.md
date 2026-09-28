### KARAR-116 · 🔵 EVET/HAYIR — Eski kişilik kartlarındaki ham test puanlarını veritabanından temizleyelim mi? (1 işi açar: AJ-50) [🔵 CANLI VERİYE YAZMA]
**Şu an ne var:** Kişilik testini (DISC) 27 Eylül 2026'dan önce tamamlayan kullanıcıların "kişilik kartı" kaydında, kartta görünmeyen iki ham alan da saklı duruyor: ham test vektörü ve ham puanlar. Bu alanlar başkasının profiline bakan kişiye artık GÖNDERİLMİYOR (AJ-21, backend #194); yeni kayıtlar zaten temiz. Kanıt: `backend/src/services/discVisibility.ts:31-46` · `backend/src/controllers/onboardingController.ts:482-489`.
**Ne değişir:** Veritabanındaki eski kartlardan yalnız bu iki ham alan silinir. Kartın görünen kısmı (arketip, ikon, güçlü yönler, baskın tip, tarih) AYNEN kalır. Kişinin kendi DISC sonucu ve eşleştirme puanı etkilenmez (kaynakları ayrı "discVector" alanı, ona dokunulmaz).
**Kullanıcı ne görür:** Hiçbir şey — ekranda değişiklik yok. Kazanç KVKK tarafında: hassas psikometrik veri gereksiz ikinci bir yerde saklanmıyor (veri minimizasyonu).
**Nasıl yapılır:** backend PR #212'deki betik (7b ONAY 2. tur). Önce KURU ÇALIŞMA (yalnız sayar, yazmaz) → sayıyı görürsün → sonra `--uygula --onay="TEMIZLE <host>"` (host'u birebir yazmadan hiçbir veritabanında yazmaz). Tek işlemde: önce yedek, sonra temizlik; sayılar tutmazsa hiçbir şey değişmez. DB erişimi gerekir (VPS'te yok) — tek seferlik erişimle yapılır.
**Yedeği alınacak tablo/sütun:** "User" tablosundan yalnız etkilenecek satırların `id` + `discResultCard` sütunu → yeni tablo `User_discResultCard_yedek_YYYYMMDD` (çalıştırma günü). Yedek adı + satır sayısı 02-ILERLEME'ye yazılır.
**Yedeğin kendisi hassas:** Yedek tablo ham psikometrik veriyi içerir ve hesap silme akışı onu TEMİZLEMEZ → yedek, temizlikten sonra EN GEÇ 30 GÜN içinde (tarih 02-ILERLEME'ye yazılır) senin onayınla silinir.
**Etkilenecek kayıt tahmini:** DISC testini AJ-21 öncesi tamamlamış herkes; gerçek kullanıcı ~sıfır olduğundan büyük ihtimalle test/demo hesapları. Kesin sayıyı kuru çalışma verir.
**Geri alınır mı:** Evet, ama YALNIZ temizlikten hemen sonra ve yedek silinmeden önce — yedekten tek SQL ile geri yazılır (betik başlığında). Arada testi yeniden çözen kullanıcı olursa geri alma onun yeni kartını eskisiyle ezer.
**Migration:** Yok (şema değişmez).
**Seçenekler:**
- **EVET** · Kullanıcı ne görür: hiçbir şey · Kazanç: KVKK veri minimizasyonu · Kaybedersin: eski kartlardaki ham puanlar 30 gün yalnız yedekte kalır, sonra tamamen gider; canlı DB'ye bir kez yazma riski (yedek + sayı kontrolü + host onayıyla sınırlı); 30 günlük yedeği silmeyi hatırlama yükü · Süre: S · Geri alınır: evet (kısa süre) · Migration: yok
- **HAYIR** · Kullanıcı ne görür: hiçbir şey · Kazanç: canlı veriye dokunulmaz · Kaybedersin: hassas veri gereksiz bir kopyada durmaya devam eder; ileride süzgeci atlayan yeni bir okuma yolu açılırsa yeniden sızabilir · Süre: — · Geri alınır: — · Migration: yok
**Benim önerim:** EVET — geri alınabilir, kullanıcıya görünmez ve KVKK veri minimizasyonunu kapatır; acil değil.
**Cevap vermezsen:** Yalnız AJ-50 bekler; başka iş etkilenmez.
**İlgili kartlar:** KARAR-86 (aynı DISC verisinin kime görüneceği)
**CEVAP:**


