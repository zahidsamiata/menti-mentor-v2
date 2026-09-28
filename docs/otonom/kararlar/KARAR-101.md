### KARAR-101 · Onay bekleyen kullanıcı giriş yapıp "Bekleme Odası"nı görebilsin mi? (1 iş açar: Y1-B8) [ÜRÜN KARARI · GÜVENLİK]
**Şu an ne var:** Onay bekleyen bir kullanıcı **şifreyle** girmeye çalışınca oturum açamıyor ("Onay Bekleniyor" ekranına düşüyor — `authController.ts` ~:380). Ama **Google/LinkedIn ile** girince oturum açabiliyor ve menti panelindeki **"Bekleme Odasındasınız"** bölümünü görüyor: DISC testi, programdaki mentör sayısı, haftalık görüşme sıklığı, umut mesajı (F-15, I-05 ile canlıya çıktı — `frontend/src/app/(dashboard)/menti/page.tsx`). Aynı oturumla onay beklerken sohbet/randevu/anlaşma uçlarına da istek atabiliyor (onay kapısı yalnız eşleşme ve kullanıcı uçlarında). Kanıt: `docs/raporlar/kesif/kod-inceleme-teyit-dogrulamasi-2026-09-26.md` B8.
**Sorun ne:** İki giriş yolu farklı davranıyor ve biri güvenlik açığı: onaylanmamış biri, yöneticinin onayından önce kurumun iç özelliklerine erişebiliyor. Ajanın hazırladığı düzeltme (PR backend #164 + çatı #343) OAuth yolunu da şifreli giriş gibi kapatıyor — ama o zaman **Bekleme Odası kimseye görünmüyor** (bağımsız inceleme bunu yakaladı, SONUÇ: SORUN VAR).
**Neden sana soruyorum:** Bir özelliğin (Bekleme Odası) açık kalıp kalmayacağı ve onay bekleyenin neyi yapabileceği ürün kararı.
**Seçenekler:**
- **A) Kapat** — onay bekleyen kimse oturum açamaz (PR olduğu gibi). · Kullanıcı ne görür: yalnız "Onay Bekleniyor" sayfası; Bekleme Odası (DISC testi, mentör sayısı, umut mesajı) görünmez · Ne kazanırsın: açık hemen kapanır, en basit · **Ne kaybedersin:** bekleme süresi boş geçer, F-15/I-05 emeği görünmez olur · Süre S (hazır) · geri alınır ✅ · migration yok.
- **B) Bekleme odası açık, iç özellikler kapalı** — onay bekleyen oturum açar ama yalnız bekleme odası uçlarını kullanır (profil, DISC testi, mentör sayısı, haftalık sıklık); sohbet/randevu/anlaşma/talep uçları onay kapısıyla kapanır. Hem şifreli hem OAuth girişi böyle olur. · Kullanıcı ne görür: onay beklerken DISC testini çözer, bekleme odasını görür; mesaj/randevu yapamaz · Ne kazanırsın: açık kapanır + bekleme süresi değerli kalır + iki giriş yolu eşitlenir · **Ne kaybedersin:** daha çok iş (her uç için kapı listesi, test) ve "hangi uç bekleme odasına ait" listesinin bakımı · Süre M · geri alınır ✅ · migration yok.
- **C) Bugünkü hâl sürsün** (yalnız OAuth ile bekleme odası). · Ne kazanırsın: iş yok · **Ne kaybedersin:** güvenlik açığı açık kalır; şifreyle giren hiçbir zaman bekleme odasını görmez.
**Karşılaştırma:** Hız öncelikse A (açık bugün kapanır, bekleme odası sonra B ile geri gelebilir). Onay süreleri uzunsa ve bekleme odası değerliyse B doğrudur. C güvenlik açığını bıraktığı için önerilmez.
**Benim önerim:** B — güvenlik açığını kapatırken zaten canlıda olan ve bekleme süresini anlamlı kılan özelliği korur; iki giriş yolunu da eşitler. (A'yı ara adım olarak hemen, B'yi ardından da seçebilirsin — cevabında belirt.)
**Cevap vermezsen:** Y1-B8 PR'ları (#164/#343) açık kalır; güvenlik açığı sürer.
**CEVAP:**

---

