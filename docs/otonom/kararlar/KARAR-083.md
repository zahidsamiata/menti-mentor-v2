### KARAR-83 · Kullanıcının rolünü kim, nasıl değiştirir? (1 iş açar: U-13) [YETKİ KARARI]
**Şu an ne var:** MENTOR↔MENTI rol değiştiren bir yol yok; yanlış rolle kayıt olan düzeltilemiyor. Yöneticilikten düşürme her zaman "MENTOR" yazıyor (`backend/src/controllers/adminController.ts:988`; kurum üyeliği rolü de `:990`'da MENTOR yapılıyor) — kişi aslında mentiyse rolü bozuluyor.
**Sorun ne:** Yanlış rolle (mentör yerine menti ya da tersi) kayıt olan kişi yanlış panele düşer ve bunu kimse düzeltemez; tek yol yeniden kayıt olmak. Yöneticilikten alınan bir menti ise sessizce mentöre dönüşür; ne kişi ne yönetici bunu fark eder.
**Neden sana soruyorum:** "Yetki kimde" kararı ve rol değişince kişinin eşleşme/görüşme geçmişinin ne olacağı ürün sorusu.
**Seçenekler:**
- **A) Kurum yöneticisi rolü değiştirebilir; düşürmede hedef rolü seçer** · Kullanıcı: yönetici panelinde "rolü değiştir" · Kazanç: yanlış kayıt düzelir, düşürme bozulmaz · **Ne kaybedersin:** yöneticinin elinde güçlü bir araç; eski eşleşmeler yeni role uymayabilir · Süre M · Geri alınır: evet · Migration: yok
- **B) Yalnız düşürme hatası düzeltilsin (hedef rolü yönetici seçer); rol değiştirme yok** · Kazanç: en küçük iş, bozulma biter · **Ne kaybedersin:** yanlış rolle kayıt yine düzeltilemez (kişi yeniden kayıt olur) · Süre S · Geri alınır: evet · Migration: yok · Kullanıcı: yönetici bir yöneticiyi görevden alırken kişinin mentör mü menti mi olacağını seçer; başka rol değişikliği yok
- **C) Rol değişikliği yalnız platform yöneticisinde** · Kazanç: kontrol merkezde · **Ne kaybedersin:** her talep sana gelir · Süre M · Migration: yok · Kullanıcı: kurum yöneticisi rol değiştiremez, platform ekibine başvurur; rolü platform yöneticisi değiştirir · Geri alınır: evet
**Karşılaştırma:** A kurumlara özerklik verir; B yalnız hatayı giderir; C denetimi artırır ama iş yükünü sana taşır.
**Benim önerim:** B şimdi, A ihtiyaç doğunca — düşürmedeki sessiz bozulma bugünkü tek gerçek hata.
**Cevap vermezsen:** U-13 (çıkış blokeri) kilitli kalır.
**İlgili kartlar:** KARAR-124 (rol değişince kullanıcı rolü ve kurum üyeliği rolü birlikte değişir; 124 hangisinin sayıldığını soruyor)
**CEVAP:** A + C. Kurum yöneticisi kullanıcının rolünü değiştirebilir (MENTOR↔MENTI; yöneticilikten düşürmede hedef rol seçilir — bugünkü "her zaman MENTOR yazma" hatası biter). Rol değişince aktif eşleşmeler OLDUĞU GİBİ sürer. Sistemde önceki rol ve yeni rol görünür (rol tarihçesi). Bir kişi aynı kurumda hem yönetici hem mentör olmak isterse AYRI HESAP açar (hesap değiştirme özelliği yapılmaz; e-posta global benzersiz olduğu için ikinci e-posta gerekir). Rol tarihçesi migration isterse → yedek + PO onayı.
*kaynak: PO NOTU EK 2026-10-21 (strateji katmanı üzerinden) — `docs/otonom/01-KARARLAR.md` § ✍️ PO NOTU › PO NOTU EK · ajan yalnız aktardı (metin aynen).*

