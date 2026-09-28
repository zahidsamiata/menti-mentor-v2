### KARAR-13 · Yöneticiye manuel "işlet" butonları verilsin mi?  [ÜRÜN KARARI]
> ⏸️ PO 2026-09-25: karar aşamasına bırakıldı, önce bağlam konuşması.
**Şu an ne var:** Sistemde arka planda otomatik çalışan bakım işleri var: eşleştirme ayarını yeniden hesaplama, eski/çöp veriyi temizleme, görüşme sonrası geri bildirim hatırlatması gönderme, ve bir mentinin "oryantasyon kilidini" kaldırma. Bunların hepsi backend'de uç olarak da yazılı ama hiçbir ekranda butonu yok. Kanıt: `backend/src/routes/adminRoutes.ts:83-84` (tuning/purge), `backend/src/routes/meetingRoutes.ts:148` (hatırlatıcı), `meetingRoutes.ts:153` (kilit kaldır). Frontend'de 0 çağrı.
· ⚠️ **Güncel durum (2026-09-28, kod teyitli):** Ekranda buton yok ama uçlar kurum yöneticisine açık: `POST /api/admin/cron/run-purge` ve `/run-tuning` doğrudan çağrılabiliyor (`backend/src/routes/adminRoutes.ts:83-84`); AJ-17 (BITTI 2026-09-27) ile yalnız çağıranın kendi kurumunda çalışıyor (`backend/src/controllers/adminController.ts:599-620`). Bu kartın sorusu ("buton verilsin mi") aynen geçerli; bu işleri kimin tetikleyeceği KARAR-79'da.
**Sorun ne:** Bu işler otomatiğe bağlı (zamanlanmış). Ama bir yönetici "şimdi çalıştır" demek isteyebilir — ör. yeni mentörler eklendi, eşleştirmeyi hemen yenilemek istiyor; ya da bir menti yanlışlıkla kilitlendi, elle açmak istiyor. Şu an bunu yapamıyor, otomatik işin sırasını beklemek zorunda.
**Neden sana soruyorum:** "Yöneticiye ne kadar kontrol verelim" bir ürün tercihi — fazla buton paneli karmaşıklaştırır, az buton yöneticiyi çaresiz bırakır.
**Kapsadığı kalemler:** `admin/cron/run-tuning`, `admin/cron/run-purge`, `meetings/reminders/send`, `meetings/orientation-lock/:userId` (DELETE).
**Seçenekler:**
**A) Hepsine yönetici butonu ver** · Kullanıcı (yönetici): "eşleştirmeyi yenile", "hatırlatıcı gönder", "kilidi kaldır" butonları görür · Kazanç: yönetici tam kontrol, otomatiği beklemez · Kaybedersin: yanlış tıklama riski (purge veri siler!), panel karmaşıklaşır, her butona onay/uyarı gerekir · Süre: M · Geri alınır: evet · Migration: yok
**B) Yalnız güvenli/sık olanlara buton ver** (kilit kaldır + eşleştirme yenile), tehlikelileri (purge) otomatikte bırak · Kullanıcı: iki güvenli buton · Kazanç: en sık ihtiyaç karşılanır, tehlikeli işlem elden uzak · Kaybedersin: purge/hatırlatıcı hâlâ elle tetiklenemez · Süre: S · Geri alınır: evet · Migration: yok
**C) Hiç buton verme, hepsi otomatik kalsın** · Kullanıcı: değişiklik yok · Kazanç: sıfır yanlış-tıklama riski, panel sade · Kaybedersin: yönetici çaresiz kaldığı durumlarda (yanlış kilit vb.) sana başvurmak zorunda · Süre: yok · Migration: yok
**Karşılaştırma:** Yönetici deneyimini güçlendirmek istiyorsan B en dengeli — sık ve güvenli işleri açar, veri silen purge'ü elden uzak tutar. Tam kontrol felsefen varsa A ama purge butonu ciddi risk. Kurumlar henüz azsa ve sen destek verebiliyorsan C yeterli.
**Benim önerim:** B — "kilidi kaldır" gerçek bir kullanıcı-kurtarma ihtiyacı; purge gibi yıkıcı işi butona koymak orantısız risk.
**Cevap vermezsen:** Bu uçlar bağlanmaz, otomatik çalışmaya devam eder (kırık değil). Başka iş etkilenmez.
**İlgili kartlar:** KARAR-79 (aynı uçların tetikleme yetkisi) · KARAR-16 (aynı tür soru: backend'de yazılı eşleştirme düğmeleri ekrana gelsin mi) · KARAR-92 ("kilidi kaldır" düğmesi ancak kilit tetiklenirse anlamlı) — birlikte cevaplanması önerilir: KARAR-13 + KARAR-79
**CEVAP:**

---

