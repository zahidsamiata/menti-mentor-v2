### KARAR-83 · Kullanıcının rolünü kim, nasıl değiştirir? (1 iş açar: U-13) [YETKİ KARARI]
**Şu an ne var:** MENTOR↔MENTI rol değiştiren bir yol yok; yanlış rolle kayıt olan düzeltilemiyor. Yöneticilikten düşürme her zaman "MENTOR" yazıyor (`backend/src/controllers/adminController.ts:972`) — kişi aslında mentiyse rolü bozuluyor.
**Neden sana soruyorum:** "Yetki kimde" kararı ve rol değişince kişinin eşleşme/görüşme geçmişinin ne olacağı ürün sorusu.
**Seçenekler:**
- **A) Kurum yöneticisi rolü değiştirebilir; düşürmede hedef rolü seçer** · Kullanıcı: yönetici panelinde "rolü değiştir" · Kazanç: yanlış kayıt düzelir, düşürme bozulmaz · **Ne kaybedersin:** yöneticinin elinde güçlü bir araç; eski eşleşmeler yeni role uymayabilir · Süre M · Geri alınır: evet · Migration: yok
- **B) Yalnız düşürme hatası düzeltilsin (hedef rolü yönetici seçer); rol değiştirme yok** · Kazanç: en küçük iş, bozulma biter · **Ne kaybedersin:** yanlış rolle kayıt yine düzeltilemez (kişi yeniden kayıt olur) · Süre S · Geri alınır: evet · Migration: yok
- **C) Rol değişikliği yalnız platform yöneticisinde** · Kazanç: kontrol merkezde · **Ne kaybedersin:** her talep sana gelir · Süre M · Migration: yok
**Karşılaştırma:** A kurumlara özerklik verir; B yalnız hatayı giderir; C denetimi artırır ama iş yükünü sana taşır.
**Benim önerim:** B şimdi, A ihtiyaç doğunca — düşürmedeki sessiz bozulma bugünkü tek gerçek hata.
**Cevap vermezsen:** U-13 (çıkış blokeri) kilitli kalır.
**CEVAP:**

