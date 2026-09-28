### KARAR-108 · DISC eşitlik sırası iki yerde farklı — tek kaynak hangisi olsun? (0 iş kilitler; bugün kullanıcı etkisi yok)  [ÜRÜN KARARI · PSİKOMETRİ]
> ⭐ Kaynak: AN-12 incelemesi B kısmı (2026-09-27, salt-okuma); `backend/src/controllers/onboardingController.ts:214-215`'teki kod yorumu da bu çelişkiyi not ediyor.

**Şu an ne var:** Kullanıcının DISC harfini belirleyen dört yerden üçü eşit puanda **D > I > S > C** sırasını kullanıyor: canlı onboarding testi (`onboardingController.ts:213-217`), çok harfli gösterim (`discLetters.ts:44-45`), yeni uyarlanabilir test (`adaptiveTestEngine.ts:100-101`). Dördüncüsü, eski 7 soruluk mizaç testi ucu (`temperamentAnalysis.ts:15-16`), **D > I > C > S** kullanıyor. Bu uç hiçbir ekrandan çağrılmıyor (ön yüzde 0 referans) ama sunucuda açık (`userRoutes.ts:63`).
**Sorun ne:** Fark yalnız S ve C puanı eşit ve en yüksek olduğunda çıkıyor: biri "S", diğeri "C" der. Eski uç bir gün yeniden bağlanırsa ya da doğrudan çağrılırsa aynı kişi farklı mizaç kartı (ve vektörü yoksa farklı eşleştirme puanı) görebilir.
**Neden sana soruyorum:** Eşitlikte hangi mizacın öne çıkacağı psikometrik bir tercih; kullanıcının kendisi hakkında okuduğu sonucu değiştirir.
**Seçenekler:**
- **A) Her yerde D > I > S > C** (bugünkü 3 canlı yolun sırası) — Kullanıcı: hiçbir değişiklik görmez · Kazanç: tek kaynak, canlı davranış aynı · Kayıp: eski testin (muhtemelen bilinçli) D > I > C > S tercihi terk edilir · Süre S · Geri alınır · Migration yok.
- **B) Her yerde D > I > C > S** — Kullanıcı: eşit S/C puanlı kişilerde canlı testin sonucu değişir (S yerine C) · Kazanç: tek kaynak · Kayıp: canlı 3 yolun davranışı değişir, bazı kullanıcıların harfi değişebilir · Süre S · Geri alınır · Migration yok.
- **C) Şimdilik dokunma; eski mizaç testi ucunu ayrıca karantinaya al** (zaten çağrılmıyor) — Kullanıcı: değişiklik yok · Kazanç: en az iş · Kayıp: çelişki kodda kalır · Süre S · Geri alınır (karantina 🔵 ayrı EVET ister) · Migration yok.
**Karşılaştırma:** Bugün gerçek etkisi yok; soru "gelecekte hangisine sabitleyelim". A canlı davranışı hiç değiştirmez; B değiştirir; C kararı erteler.
**Benim önerim:** A — canlı üç yol zaten bu sırada, kimsenin sonucu değişmez. *(Bu senin ürün kararın; önerime güvenme.)*
**Cevap vermezsen:** Çelişki kodda işaretli kalır; hiçbir iş kilitlenmez.
**CEVAP:**

