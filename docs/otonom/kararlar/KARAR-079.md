### KARAR-79 · Zamanlanmış bakım işlerini elle tetikleme yetkisi kimde olsun? (1 iş açar: KR-05) [YETKİ KARARI · GÜVENLİK]
> ⏸️ PO 2026-09-25: karar aşamasına bırakıldı, önce bağlam konuşması.
> ⭐ Kaynak: `docs/raporlar/kesif/kod-inceleme-2026-09-24.md` B5 [D]. ⛔ Public repo: güvenlik ayrıntısı bu kartta yazılmaz; ayrıntı iş kapanınca rapora eklenir.
**Şu an ne var:** Eşleştirme ağırlık ayarı ve KVKK veri temizliği her hafta otomatik çalışıyor. Bunları elle tetikleyen iki uç da var: kurum yöneticisi rolüyle çağrılıyor (`backend/src/routes/adminRoutes.ts:40-41,83-84`) ve AJ-17 (BITTI 2026-09-27) ile yalnız çağıranın kendi kurumunda çalışıyor (`backend/src/controllers/adminController.ts:599-620`); otomatik haftalık çalışma platform genelinde sürüyor. Yani bugün kodda **B seçeneği** var. Kod incelemesi B5 bulgusunun bundan fazlasını içerip içermediği teyit gerek (`docs/raporlar/kesif/kod-inceleme-2026-09-24.md:106`, ayrıntı yazılmamış).
**Sorun ne:** Hangi rolün bu işleri, hangi kapsamda (tüm platform mı, yalnız kendi kurumu mu) tetikleyebileceği belirlenmeden düzeltme yapılamıyor. Bugünkü kural (B) AJ-17 düzeltmesiyle oluştu, senin kararınla değil; KR-05 kapanmak için bu kuralın onaylanmasını ya da daraltılmasını bekliyor.
**Neden sana soruyorum:** "Yetki kimde" CLAUDE.md'ye göre ürün kararıdır. Ayrıca KARAR-13 (yöneticiye manuel "işlet" düğmesi) ile doğrudan bağlı: bu kartın cevabı KARAR-13'ün ağırlık ayarı ve temizlik düğmeleri için anlamlı seçenekleri belirler. İkisinin birlikte cevaplanması önerilir.
**Seçenekler:**
- **A) Yalnız platform yöneticisi** · Kullanıcı ne görür: kurum yöneticisi bu işlemleri tetikleyemez; gerektiğinde platform yöneticisi çalıştırır · Ne kazanırsın: en dar yetki, küçük iş · **Ne kaybedersin:** kurum yöneticisi "eşleştirmeyi şimdi yenile" diyemez, sana başvurur; KARAR-13'ün bu iki düğmesi kurum panelinde anlamsızlaşır · Süre S · Geri alınır: evet · Migration: yok
- **B) Kurum yöneticisi, yalnız kendi kurumu kapsamında** · Kullanıcı ne görür: kurum yöneticisi kendi kurumu için ağırlık ayarını ve temizliği tetikleyebilir · Ne kazanırsın: yönetici bağımsız; KARAR-13 düğmeleri anlamlı kalır · **Ne kaybedersin:** veri silen temizlik işi kurum yöneticisinin elinde kalır (yalnız süresi dolmuş veriyi siler ama silinen geri gelmez); sistem günlüğü temizliği bu yolda atlanır · Süre 0 (AJ-17 ile kodda) · Geri alınır: evet · Migration: yok
- **C) Karma: ağırlık ayarı kurum yöneticisinde (kendi kurumu), veri temizliği yalnız platform yöneticisinde** · Kullanıcı ne görür: kurum yöneticisi yalnız eşleştirmeyi yenileyebilir · Ne kazanırsın: sık ve güvenli iş yöneticide, veri silen iş platformda (KARAR-13'teki "güvenli olan düğme, yıkıcı olan elden uzak" önerisiyle uyumlu) · **Ne kaybedersin:** iki farklı yetki modeli, daha çok test; temizlik ucunun kurum yöneticisinden alınması gerekir · Süre M · Geri alınır: evet · Migration: yok
**Karşılaştırma:** A yetkiyi en dara indirir ama yöneticiye esneklik vermez. B bugün kodda olan hâldir (iş yok); yöneticiye tam kontrol verir, veri silen işi de ona bırakır. C, KARAR-13 önerisiyle tutarlı orta yol.
**Benim önerim:** A — yetki en dara iner (veri silen iş kurum yöneticisinden alınır); kurum yöneticisine ihtiyaç çıkarsa sonradan C'ye genişletmek geri alınabilir bir adımdır.
**Cevap vermezsen:** KR-05 kilitli kalır ve kod B hâlinde (her kurum yöneticisi kendi kurumu için) kalır; aynı dosyaya dokunan KR-20 sırası da etkilenir.
**İlgili kartlar:** KARAR-13 (aynı uçlara ekranda düğme verilip verilmeyeceği) — birlikte cevaplanması önerilir: KARAR-79 + KARAR-13
**CEVAP:**

---

