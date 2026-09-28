### KARAR-57 · Kullanıcının mizaç sonucunu hangi test belirlesin?  (4 işi açar)  [ÜRÜN KARARI · TEKNİK]
**Şu an ne var:** Aynı mizaç sonucuna üç ayrı yol yazıyor: (1) kayıt sırasındaki 8 soruluk test (`onboardingController.ts:109-190`), (2) `/disc-test` sayfasındaki 32 soruluk test (`questionService` + `discVectorService`), (3) panodaki "günün sorusu" kutusu (`adaptiveTestEngine`). Üçü farklı formülle hesaplıyor (boş boyut 0.25 ↔ 0.5, güven hesabı farklı, derinleşme soruları farklı açılıyor) ve en son hangisi çalıştıysa sonuç o oluyor. Kanıt: `icerik-tam-okuma-2026-09-23.md` §0-2.
**Sorun ne:** Kullanıcı panodaki bir soruyu cevaplayınca mizaç tipi (ve eşleşme puanı) başka formülle yeniden hesaplanıp değişebilir. Kullanıcı bunun nedenini göremez.
**Neden sana soruyorum:** Hangi ölçümün "gerçek" sayıldığı, kullanıcının gördüğü kartı ve eşleşmelerini belirler; yeni senaryo motoru (TAS) gelene kadar hangisinin yaşayacağı ürün kararıdır.
**Seçenekler:**
· **A — Tek yol: 32 soruluk test esas, diğer ikisi yalnız ona veri besler (ortak hesap).** Ne kazanırsın: tek formül, tutarlı sonuç. **Ne kaybedersin:** kayıttaki 8 soru ayrı ağırlıkla sayılmaz. Süre M · geri alınır ✅ · migration yok
· **B — Kayıttaki 8 soru esas, 32 soruluk test ve pano yalnız "güveni artırır".** Ne kazanırsın: herkes aynı başlangıç noktasına sahip. **Ne kaybedersin:** 32 soruluk test anlamını yitirir. Süre M · geri alınır ✅ · migration yok
· **C — Bugünkü hal sürer, yeni senaryo motoruna kadar dokunulmaz.** Ne kazanırsın: iş yok. **Ne kaybedersin:** sonuç sessizce değişmeye devam eder. Süre — · geri alınır ✅ · migration yok
**Karşılaştırma:** Senaryo motoru yakında gelecekse C geçici olarak kabul edilebilir; uzun sürecekse A.
**Benim önerim:** A — md.162'nin "ortak buildDiscVector" önerisiyle aynı yön.
**Cevap vermezsen:** md.162, md.168, md.169, PS-02 bağlanamaz.
**CEVAP:**

---

