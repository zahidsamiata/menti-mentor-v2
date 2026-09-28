### KARAR-79 · Zamanlanmış bakım işlerini elle tetikleme yetkisi kimde olsun? (1 iş açar: KR-05) [YETKİ KARARI · GÜVENLİK]
> ⏸️ PO 2026-09-25: karar aşamasına bırakıldı, önce bağlam konuşması.
> ⭐ Kaynak: `docs/raporlar/kesif/kod-inceleme-2026-09-24.md` B5 [D]. ⛔ Public repo: güvenlik ayrıntısı bu kartta yazılmaz; ayrıntı iş kapanınca rapora eklenir.
**Şu an ne var:** Eşleştirme ağırlık ayarı ve KVKK veri temizliği her hafta otomatik çalışıyor. Bunları elle tetikleyen uçlar da var, ancak bu uçların **yetki kapsamı hatalı**. Dosyalar: `backend/src/routes/adminRoutes.ts` · `backend/src/controllers/adminController.ts`.
**Sorun ne:** Hangi rolün bu işleri, hangi kapsamda (tüm platform mı, yalnız kendi kurumu mu) tetikleyebileceği belirlenmeden düzeltme yapılamıyor. O sürece kadar yetki kapsamı hatası açık kalıyor.
**Neden sana soruyorum:** "Yetki kimde" CLAUDE.md'ye göre ürün kararıdır. Ayrıca KARAR-13 (yöneticiye manuel "işlet" düğmesi) ile doğrudan bağlı: bu kartın cevabı KARAR-13'ün ağırlık ayarı ve temizlik düğmeleri için anlamlı seçenekleri belirler. İkisinin birlikte cevaplanması önerilir.
**Seçenekler:**
- **A) Yalnız platform yöneticisi** · Kullanıcı ne görür: kurum yöneticisi bu işlemleri tetikleyemez; gerektiğinde platform yöneticisi çalıştırır · Ne kazanırsın: en dar yetki, açık en hızlı kapanır, küçük iş · **Ne kaybedersin:** kurum yöneticisi "eşleştirmeyi şimdi yenile" diyemez, sana başvurur; KARAR-13'ün bu iki düğmesi kurum panelinde anlamsızlaşır · Süre S · Geri alınır: evet · Migration: yok
- **B) Kurum yöneticisi, yalnız kendi kurumu kapsamında** · Kullanıcı ne görür: kurum yöneticisi kendi kurumu için ağırlık ayarını ve temizliği tetikleyebilir · Ne kazanırsın: yönetici bağımsız; KARAR-13 düğmeleri anlamlı kalır · **Ne kaybedersin:** iki işin de kurum kapsamında çalışacak şekilde yeniden düzenlenmesi gerekir; daha çok iş ve test; kapsam hatalı kurulursa veri kaybı riski (temizlik işi veri siler) · Süre M · Geri alınır: evet · Migration: yok
- **C) Karma: ağırlık ayarı kurum yöneticisinde (kendi kurumu), veri temizliği yalnız platform yöneticisinde** · Kullanıcı ne görür: kurum yöneticisi yalnız eşleştirmeyi yenileyebilir · Ne kazanırsın: sık ve güvenli iş yöneticide, veri silen iş platformda (KARAR-13'teki "güvenli olan düğme, yıkıcı olan elden uzak" önerisiyle uyumlu) · **Ne kaybedersin:** iki farklı yetki modeli, daha çok test; ağırlık ayarının kurum kapsamına indirilmesi yine gerekir · Süre M · Geri alınır: evet · Migration: yok
**Karşılaştırma:** A açığı en hızlı ve en güvenli kapatır ama yöneticiye esneklik vermez. B yöneticiye tam kontrol verir, en çok işi ve en yüksek yanlış kurulum riskini taşır. C, KARAR-13 önerisiyle tutarlı orta yol.
**Benim önerim:** A — açık en dar yetkiyle hemen kapanır; kurum yöneticisine ihtiyaç çıkarsa sonradan C'ye genişletmek geri alınabilir bir adımdır.
**Cevap vermezsen:** KR-05 kilitli kalır ve yetki kapsamı hatası açık kalır; aynı dosyaya dokunan KR-20 sırası da etkilenir.
**CEVAP:**

---

