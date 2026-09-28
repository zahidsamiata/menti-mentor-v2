### KARAR-126 · Az yanıtlı ilk ayda "NPS düşüşü" önerisi hiç çıkmasın mı? (0 iş kilitliyor; cevap 1 küçük iş açar) [ÜRÜN KARARI · KVKK]
**Şu an ne var:** Algoritma ayar ekranı ve öneri e-postası artık 1-2 yanıtlı NPS ortalamasını göstermiyor ("gizli (<3 yanıt)") — AJ-69, backend #220. Ama öneri motoru kararı ham sayıyla veriyor: "1. aydan 3. aya NPS düşüşü" gerekçesi yalnız 1. ay ortalaması 7 ve üstüyse çıkıyor. Kanıt: `backend/src/services/algorithmTuner.ts:303-345` `decideSectorWeight` (düşüş dalı `:331`, 1. ay ≥ 7 şartı; eşikler `:52-59`; yalnız 3. ay ≥ 10 yanıt şartı `:311`) · maske `backend/src/services/mask.ts:106` `maskNpsSample`. Pratikte bu dal bugün hiç çalışmıyor: NPS `FeedbackLog`'dan okunuyor (`algorithmTuner.ts:174-192`) ve bu tabloya ekrandan yazan yok (KARAR-44).
**Sorun ne:** 1. ayda yalnız 1-2 kişi puan verdiyse ve bu gerekçe ekrana geldiyse, kurum yöneticisi "o 1-2 kişinin ortalaması en az 7'ydi" sonucunu çıkarabilir. Sayı görünmüyor ama bir bitlik bilgi sızıyor. Pencere dar, yalnız kurum yöneticisi görüyor (7b incelemesi: engelleyici değil, kalan risk).
**Neden sana soruyorum:** Kapatmak öneri motorunun davranışını değiştirir — bazı kurumlara hiç "düşüş" önerisi gitmez. Bu, ürünün ne önereceği kararı; gizlilik ile öneri kalitesi arasında seçim.
**Seçenekler:**
- **A) Bugünkü gibi kalsın (sayı gizli, gerekçe çıkabilir).** · Kullanıcı ne görür: az yanıtta da düşüş önerisi gelebilir, sayı "gizli" · Kazanç: öneri kalitesi değişmez · Kaybedersin: küçük örnekte "≥7" çıkarımı mümkün kalır · Süre: — · Geri alınır: evet · Migration: yok
- **B) 1. ay yanıtı eşiğin (3) altındaysa düşüş kuralı hiç çalışmasın.** · Kullanıcı ne görür: az yanıtlı kurumda "düşüş" önerisi yok; öneri yalnız 3. ay verisine dayanır · Kazanç: çıkarım kapanır, küçük örnekten karar verilmez (istatistiksel olarak da daha sağlam) · Kaybedersin: gerçekten düşüş olan küçük kurumda erken uyarı gecikir · Süre: S · Geri alınır: evet · Migration: yok
- **C) Gerekçe metni hiç gösterilmesin, yalnız önerilen ağırlık görünsün.** · Kullanıcı ne görür: "Sektör ağırlığı 0,55 önerildi" — nedeni yazmaz · Kazanç: hiçbir çıkarım yok, motor aynı · Kaybedersin: yönetici önerinin nedenini bilmeden onaylar; güven azalır · Süre: S · Geri alınır: evet · Migration: yok
**Karşılaştırma:** Küçük kurumlarda gizlilik öndeyse B; öneri nedeninin şeffaflığı öndeyse A; motoru hiç değiştirmeden gizliliği sağlamak istiyorsan C (ama yönetici kör onaylar).
**Benim önerim:** B — 1-2 yanıttan "düşüş" sonucu çıkarmak zaten zayıf bir karar; aynı değişiklik çıkarımı da kapatıyor.
**Cevap vermezsen:** Bugünkü davranış (A) sürer; başka iş kilitlenmez. İlgili: AJ-69 (BITTI olunca), AJ-99 (mentör paneli NPS).
**İlgili kartlar:** KARAR-44 (aynı ayarlayıcının NPS kaynağı; veri gelince bu kural canlanır)
**CEVAP:**

