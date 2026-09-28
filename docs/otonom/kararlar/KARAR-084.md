### KARAR-84 · E-posta çalışmazsa şifresini unutan nasıl girer? (1 iş açar: U-15) [YETKİ + ÜRÜN KARARI]
**Şu an ne var:** Şifre sıfırlama yalnız e-postayla (`backend/src/controllers/authController.ts:581-616`). E-posta gönderimi başarısız olsa da kullanıcı "gönderildi" benzeri genel mesaj görüyor (hesap var mı bilgisini sızdırmamak için bilinçli); gönderim hatası yalnız sistem günlüğüne yazılıyor (`backend/src/services/emailService.ts:92-95`) ve SMTP durumu platform tarafında gösteriliyor (`emailService.ts:23-26`), kullanıcı ve kurum yöneticisi bunu görmüyor. Yöneticinin sıfırlama yolu yok (`backend/src/routes/adminRoutes.ts` ve `platformRoutes.ts`'te sıfırlama ucu yok).
**Sorun ne:** E-posta sunucusu çalışmadığında şifresini unutan kişi hesabına hiç giremez; ekranda "gönderildi" benzeri mesaj gördüğü için beklemeye devam eder, kurum yöneticisi de sorunu görmediği için yardım edemez.
**Neden sana soruyorum:** Başkasının şifresini sıfırlama yetkisi kimde olacak — yetki kararı.
**Seçenekler:**
- **A) Kurum yöneticisi, üyesi için tek kullanımlık sıfırlama bağlantısı üretir (e-postasız, elden iletir)** · Kazanç: e-posta kapalıyken de çözüm · **Ne kaybedersin:** yönetici başkasının hesabına geçici erişim üretebilir (kötüye kullanım riski, iz kaydı şart) · Süre M · Migration: yok · Kullanıcı ne görür: şifresini unutan üye kurum yöneticisine başvurur, yönetici panelden tek kullanımlık bağlantı üretip elden iletir · Geri alınır: evet
- **B) Yalnız platform yöneticisi üretir** · Kazanç: yetki dar · **Ne kaybedersin:** her talep sana gelir · Süre M · Migration: yok · Kullanıcı ne görür: üye kurum yöneticisine, yönetici platform ekibine başvurur; bağlantıyı yalnız platform yöneticisi üretir · Geri alınır: evet
- **C) Şimdilik yalnız e-posta; gönderim hatası yöneticiye/izlemeye düşsün** · Kazanç: yetki değişmez · **Ne kaybedersin:** e-posta kapalıyken kullanıcı yine giremez · Süre S · Migration: yok · Kullanıcı ne görür: üye için değişiklik yok; gönderim hatası yönetici/izleme tarafında görünür (günlüğe yazma bugün zaten var, eksik olan yöneticinin görmesi) · Geri alınır: evet
**Karşılaştırma:** A kurum içinde hızlı çözüm; B daha güvenli ama merkezi yük; C en az risk, en az çözüm. E-postanın canlıda çalıştığı teyit edilirse (03-PO SMTP maddesi) C yeterli olabilir.
**Benim önerim:** B — başkasının hesabına erişim üretmek hassas; ilk kurumlarda talep sayısı düşük. *(Yetki kararı senin.)*
**Cevap vermezsen:** U-15 (çıkış blokeri) kilitli kalır.
**İlgili kartlar:** KARAR-82 (davetin C seçeneği de SMTP'ye bağlı) · KARAR-101 (giriş kapısı: kim, hangi yoldan hesaba girer) · KARAR-102 (SMTP: e-posta doğrulaması da aynı e-posta güvenilirliğine bağlı)
**CEVAP:**

