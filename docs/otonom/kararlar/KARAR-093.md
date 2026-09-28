### KARAR-93 · Üyeyi kurumdan çıkarma: KARAR-33 (B)'deki "30 gün sonra kişilik verisi silinir" adımı için onay (1 iş açar: Y-14) [CANLI VERİ SİLME · EVET/HAYIR]
> ⭐ Kaynak: Y-14 uygulanırken (2026-09-25) koddan çıktı. KARAR-33'ü (B) cevapladın; bu kart yalnız o cevabın **veri silen** adımının onayı — yeni kural gereği (OTONOM-PROMPT §7b) veri silen iş sen "evet" demeden canlıya çıkmaz.
**Şu an ne var:** Yöneticinin elinde onaylı bir üyeyi kurumdan çıkaracak düğme yok. Arka taraftaki tek uç (`backend/src/controllers/adminController.ts:735-781`) kişiyi kurumdan değil **bütün platformdan** kapatıyor (hesap pasif, başka kurumlarına da giremez), ona "tekrar başvurabilirsiniz" e-postası atıyor ve kişi tek tıkla geri başvurabiliyor (`authController.ts:445-460`). Bu, KARAR-33 (B) cevabına aykırı; o yüzden düğme bağlanmadı.
**KARAR-33 (B)'nin istediği:** üyelik o kurum için **dondurulur** · yönetici **sebep seçer** · mesajın tonu sebebe göre değişir · mentörün görüşme sayısı düşmez · **30 gün sonra kişinin kişilik (DISC/psikometri) verisi silinir.**
**Neden sana soruyorum:** İlk dört adım geri alınabilir, ben yaparım. 30 gün sonra silme ise **canlı veriyi kalıcı olarak silen zamanlanmış iş**: sen "evet" demeden yazılsa bile canlıya çıkmaz.
**Seçenekler:**
- **A) Evet — 30 gün sonra silme dahil hepsini yap** · Kullanıcı ne görür: çıkarılan üye 30 gün içinde geri alınabilir, sonra kişilik verisi silinir · Kazanç: KARAR-33 tam uygulanır, veri minimizasyonu · **Ne kaybedersin:** 30 gün sonra geri alma kişilik testini yeniden çözdürmeyi gerektirir · Süre M · Geri alınır: 30 güne kadar · Migration: dondurma için alan gerekebilir (gerekiyorsa ayrıca yedek + onay)
- **B) Evet ama silme olmadan (şimdilik yalnız dondurma + sebep + mesaj)** · Kazanç: düğme hemen gelir, hiçbir veri silinmez · **Ne kaybedersin:** çıkarılan üyenin kişilik verisi süresiz kalır (KVKK saklama açığı) · Süre S-M · Geri alınır: evet · Migration: sebep/dondurma bilgisi için alan gerekebilir (üyelikte bugün yalnız aktif/pasif var — `schema.prisma:1122`)
- **C) Hayır — şimdilik düğme yok** · **Ne kaybedersin:** yönetici onaylı üyeyi çıkaramaz (yalnız platform ekibi) · Süre — · Geri alınır: — · Migration: yok
**Karşılaştırma:** A kararının tamamı; B hızlı ve güvenli ama saklama açığı bırakır; C bekletir.
**Benim önerim:** B şimdi, silme adımı A olarak ayrı PR'da (sen "evet" dersen). *(Canlı veri silme senin kararın.)*
**Cevap vermezsen:** Y-14 bekler.
**İlgili kartlar:** KARAR-14 (yöneticinin kişisel veriyi silme yetkisi) · KARAR-33 (cevaplı; bu kart onun silme adımı) · KARAR-72 (aynı red ucu, tekrar başvuru/kalıcı red)
**CEVAP:**

---

