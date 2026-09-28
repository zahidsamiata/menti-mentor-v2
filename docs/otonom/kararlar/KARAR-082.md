### KARAR-82 · Davet bağlantısı modeli (1 iş açar: U-12) [ÜRÜN + GÜVENLİK KARARI]
**Şu an ne var:** Kurum yöneticisinin ürettiği davet bağlantısı 30 gün geçerli, belirli bir e-postaya bağlı değil, birden çok kez kullanılabiliyor ve iptal edilemiyor (`backend/src/controllers/selfServeController.ts:571` — `expiresIn: '30d'`, veritabanı kaydı yok).
**Sorun ne:** Bağlantı yanlış kişinin eline geçerse (yanlış gruba iletilirse) 30 gün boyunca herkes kurumun üyesi olarak kayıt olabilir; yönetici bunu durduramaz. Davetli kişi artık doğrudan onaylı açıldığı için (form ve OAuth) etkisi büyüdü.
**Neden sana soruyorum:** Kurumların davet deneyimini (toplu link mi, kişiye özel mi) ve güvenlik/kolaylık dengesini belirler.
**Seçenekler:**
- **A) Süreyi kısalt (7 gün), gerisi aynı** · Kullanıcı: yönetici haftalık yeni link üretir · Kazanç: en ucuz, migration yok · **Ne kaybedersin:** sızan link yine 7 gün kullanılabilir, iptal yok · Süre S · Geri alınır: evet · Migration: yok
- **B) İptal edilebilir toplu link (veritabanı kaydı + "linki iptal et" düğmesi)** · Kullanıcı: yönetici sızan linki tek tıkla kapatır · Kazanç: kontrol yöneticide · **Ne kaybedersin:** yeni tablo + ekran işi · Süre M · Geri alınır: evet · Migration: VAR
- **C) Kişiye özel, e-postaya bağlı, tek kullanımlık davet** · Kullanıcı: her davetli kendi linkini e-postayla alır · Kazanç: en güvenli · **Ne kaybedersin:** toplu WhatsApp paylaşımı biter, SMTP'ye bağımlı, en çok iş · Süre L · Geri alınır: zor · Migration: VAR
**Karşılaştırma:** A hızlı ama sınırlı; B toplu paylaşımı koruyup kontrol verir; C en güvenli ama derneklerin toplu davet alışkanlığını bozar.
**Benim önerim:** B — derneklerin toplu paylaşım alışkanlığını korurken sızıntıda yöneticiye kapatma imkânı verir.
**Cevap vermezsen:** U-12 (çıkış blokeri) kilitli kalır.
**CEVAP:**

