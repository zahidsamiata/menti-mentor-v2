### KARAR-84 · E-posta çalışmazsa şifresini unutan nasıl girer? (1 iş açar: U-15) [YETKİ + ÜRÜN KARARI]
**Şu an ne var:** Şifre sıfırlama yalnız e-postayla (`backend/src/controllers/authController.ts:548-575`). E-posta gönderimi başarısız olsa da kullanıcı "gönderildi" benzeri genel mesaj görüyor (hesap var mı bilgisini sızdırmamak için bilinçli); yöneticinin sıfırlama yolu yok.
**Neden sana soruyorum:** Başkasının şifresini sıfırlama yetkisi kimde olacak — yetki kararı.
**Seçenekler:**
- **A) Kurum yöneticisi, üyesi için tek kullanımlık sıfırlama bağlantısı üretir (e-postasız, elden iletir)** · Kazanç: e-posta kapalıyken de çözüm · **Ne kaybedersin:** yönetici başkasının hesabına geçici erişim üretebilir (kötüye kullanım riski, iz kaydı şart) · Süre M · Migration: yok
- **B) Yalnız platform yöneticisi üretir** · Kazanç: yetki dar · **Ne kaybedersin:** her talep sana gelir · Süre M · Migration: yok
- **C) Şimdilik yalnız e-posta; gönderim hatası yöneticiye/izlemeye düşsün** · Kazanç: yetki değişmez · **Ne kaybedersin:** e-posta kapalıyken kullanıcı yine giremez · Süre S · Migration: yok
**Karşılaştırma:** A kurum içinde hızlı çözüm; B daha güvenli ama merkezi yük; C en az risk, en az çözüm. E-postanın canlıda çalıştığı teyit edilirse (03-PO SMTP maddesi) C yeterli olabilir.
**Benim önerim:** B — başkasının hesabına erişim üretmek hassas; ilk kurumlarda talep sayısı düşük. *(Yetki kararı senin.)*
**Cevap vermezsen:** U-15 (çıkış blokeri) kilitli kalır.
**CEVAP:**

