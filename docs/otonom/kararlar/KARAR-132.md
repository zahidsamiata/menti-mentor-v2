### KARAR-132 · Küçük grup gizliliği (k-anonimlik) eşiği 3 mü 5 mi, "herkes aynısını seçti" durumu da gizlensin mi? (0 iş kilitliyor; cevap 1 küçük iş açar) [ÜRÜN KARARI · KVKK]
**Şu an ne var:** Kurum yöneticisine gösterilen toplu sayılar (NPS, KPI oranları, mentilerin ihtiyaç dağılımı, algoritma ekranı) 3'ten az kişilik grupta gizleniyor — tek sabit `K_ANONYMITY_THRESHOLD = 3` (`backend/src/services/mask.ts:52`), NPS maskesi `kpiReport.service.ts:91-96`, ihtiyaç dağılımı `mentiNeedsDistribution.service.ts` (AJ-89). Tasarım belgesi "ör. 5" diyor ve G1-22'yi açık kalem sayıyor (`docs/kararlar/konu/degerlendirme-sistemi-tasarim-2026-08-27.md:614-617`). Hiçbir ekranda "tamamlayıcı" kuralı yok: 3 kişiden 3'ü aynı seçeneği işaretlediyse %100 görünür, yani yönetici her kişinin ne seçtiğini öğrenir; ya da 5 kişiden 4'ü görünürse kalan 1'in seçmediği çıkarılır.
**Sorun ne:** Küçük kurumda yönetici, toplu görünümden tek tek kişilerin cevabını çıkarabilir; bu, dürüst cevap vermeyi caydırır (KVKK veri minimizasyonu).
**Neden sana soruyorum:** Eşik yükseldikçe küçük kurumlar hiçbir şey göremez; gizlilik ile raporun işe yararlığı arasında seçim ürün + KVKK kararı.
**Seçenekler:**
- **A) Bugünkü gibi: eşik 3, tamamlayıcı kuralı yok** · Kullanıcı ne görür: 3+ kişilik gruplarda sayılar · Kazanç: küçük kurumlar da veri görür · Kaybedersin: homojen küçük grupta kişi bazlı çıkarım mümkün · Süre: — · Geri alınır: evet · Migration: yok
- **B) Eşik 5 (tasarım belgesindeki örnek)** · Kullanıcı ne görür: 5'ten küçük gruplar gizli · Kazanç: çıkarım riski belirgin azalır · Kaybedersin: gerçek kullanıcı az iken çoğu kurum çoğu kartı "gizli" görür · Süre: S (tek sabit) · Geri alınır: evet · Migration: yok
- **C) Eşik 3 + tamamlayıcı kuralı** (bir hücre ya da "payda − hücre" eşik altındaysa hücre gizli; %100/%0 gösterilmez) · Kullanıcı ne görür: bazı oranlar "gizli" olur · Kazanç: homojenlik çıkarımı kapanır, küçük kurumlar yine veri görür · Kaybedersin: dağılım kartlarında daha çok gizli hücre; kural anlatması biraz daha zor · Süre: S · Geri alınır: evet · Migration: yok
**Karşılaştırma:** Rapor işe yararlığı öndeyse A; gizlilik öndeyse ve kurumlar büyükse B; ikisinin dengesi C.
**Benim önerim:** C — küçük kurumları kör bırakmadan asıl çıkarım yolunu (homojen grup) kapatır.
**İlgili kartlar:** KARAR-126 (algoritma ekranında 1 bitlik çıkarım) · KARAR-105 (kurumlar arası anonim karşılaştırma).
**Cevap vermezsen:** Eşik 3 ve bugünkü kural sürer; başka iş kilitlenmez.
**CEVAP:**
