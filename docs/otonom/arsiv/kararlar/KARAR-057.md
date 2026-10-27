### KARAR-57 · Kullanıcının mizaç sonucunu hangi test belirlesin?  (4 işi açar)  [ÜRÜN KARARI · TEKNİK]
**Şu an ne var:** Aynı mizaç sonucuna üç ayrı yol yazıyor: (1) kayıt sırasındaki 8 soruluk test (`onboardingController.ts:111-192` sorular, `:219-260` hesap — seçilen şıkların payı), (2) `/disc-test` sayfasındaki 32 soruluk test (`questionService` + `discVectorService.ts:107-159` — 1-5 puan ortalaması, boş boyut 0.25), (3) panodaki "günün sorusu" kutusu (`mentor/page.tsx:188` → `adaptiveTestEngine.ts:78-80,237-243` — boş boyut 0.5). Üçü farklı formülle hesaplıyor, derinleşme soruları farklı açılıyor, üçü de aynı `discVector` alanına yazıyor ve en son hangisi çalıştıysa sonuç o oluyor. Güven hesabı kayıt testi ile 32 soruluk testte artık aynı mantıkta (cevaplanan/havuz — PS-02 ✅, `onboardingController.ts:206`); günün sorusu yolu ayrı hesaplıyor (`adaptiveTestEngine.ts:231`). Kanıt: `icerik-tam-okuma-2026-09-23.md` §0-2.
**Sorun ne:** Kullanıcı panodaki bir soruyu cevaplayınca mizaç tipi (ve eşleşme puanı) başka formülle yeniden hesaplanıp değişebilir. Kullanıcı bunun nedenini göremez.
**Neden sana soruyorum:** Hangi ölçümün "gerçek" sayıldığı, kullanıcının gördüğü kartı ve eşleşmelerini belirler; yeni senaryo motoru (TAS) gelene kadar hangisinin yaşayacağı ürün kararıdır.
**Seçenekler:**
· **A — Tek yol: 32 soruluk test esas, diğer ikisi yalnız ona veri besler (ortak hesap).** Kullanıcı ne görür: mizaç sonucu tek hesapla kurulur; panodaki bir cevap sonucu başka formülle değiştirmez. Ne kazanırsın: tek formül, tutarlı sonuç. **Ne kaybedersin:** kayıttaki 8 soru ayrı ağırlıkla sayılmaz. Süre M · geri alınır ✅ · migration yok
· **B — Kayıttaki 8 soru esas, 32 soruluk test ve pano yalnız "güveni artırır".** Kullanıcı ne görür: kayıtta çıkan mizaç tipi kalır; sonraki testler yalnız profil güvenilirliği göstergesini yükseltir. Ne kazanırsın: herkes aynı başlangıç noktasına sahip. **Ne kaybedersin:** 32 soruluk test anlamını yitirir. Süre M · geri alınır ✅ · migration yok
· **C — Bugünkü hal sürer, yeni senaryo motoruna kadar dokunulmaz.** Kullanıcı ne görür: bugünkü gibi — panodaki bir cevaptan sonra mizaç tipi habersiz değişebilir. Ne kazanırsın: iş yok. **Ne kaybedersin:** sonuç sessizce değişmeye devam eder. Süre — · geri alınır ✅ · migration yok
**Karşılaştırma:** Senaryo motoru yakında gelecekse C geçici olarak kabul edilebilir; uzun sürecekse A.
**Benim önerim:** A — md.162'nin "ortak buildDiscVector" önerisiyle aynı yön.
**Cevap vermezsen:** kuyrukta bekleyen F-09, PS-03, I-12 bağlanamaz (`00-KUYRUK.md:129`; kaynak maddeler md.162, md.168, md.169). Eski listedeki PS-02 ✅ kapandı.
**İlgili kartlar:** KARAR-42 (tekrar test aynı `discVector`'ı yeniden yazar) · KARAR-45 (sonuç kartının adı bu sonuçtan doğar) · KARAR-58 (Big Five geçişi hangi testin yaşayacağını belirler) · KARAR-62 (yeni senaryo ölçümünün akışı) · KARAR-108 (yollar arasında eşitlik sırası farkı) · KARAR-121 (testin cevap biçimi)
**CEVAP:** A (tek havuz, tek formül). PO tasarımı:
(1) İlk girişte yalnız 8 soruluk bölüm etkin; diğer bölümler görünür ama bulanık ve tıklanamaz; 8 soru bitince açılır.
(2) Sonra kişi her sayfaya girdiğinde ekranın ortasında günlük soru çıkar. Kapatma düğmesi var; kapatırsa o gün tekrar sorulmaz.
(3) Soru sınırı yok: her cevaptan sonra sıradaki soru gelir; kişi isterse tek oturumda tüm havuzu bitirir, isterse zamana yayar.
(4) Kayıt 8 sorusu, günlük sorular ve 32 soruluk havuz aynı hesaba girer; tek formül.
(5) /disc-test ayrı bir akış olmaktan çıkar; ona giden düğmeler (mentor/page.tsx, profile/page.tsx, menti/page.tsx) bu akışa bağlanır. Sayfa SİLİNMEZ (silme kuralı).
(6) Profilde ve panelde ilerleme oranı görünür: "Kişilik profilin %X tamamlandı" (cevaplanan / toplam soru). Amaç teşvik. ⚠️ Bu, KARAR-60 (kişinin kendi kişilik puan yüzdesini görmesi) DEĞİLDİR; KARAR-60 avukatı bekliyor ve bu cevapla açılmaz.
(7) Tip değişince bildirim/mesaj yok. Soru ekranında önceden bilgi notu: "Çözdüğünüz sorular eşleşmenizi daha sağlıklı hale getirir; cevaplarınıza göre ana kişilik tipiniz ya da yakın tipleriniz değişebilir." (anlam korunur, ifade düzeltilebilir)
(8) "8 soruyu bitir" kilidi ile "yönetici onayı bekleniyor" kilidi ekranda ayrı nedenlerle yazılır.
*kaynak: PO NOTU 2026-10-21 (strateji katmanı üzerinden) — `docs/otonom/01-KARARLAR.md` § ✍️ PO NOTU · ajan yalnız aktardı (metin aynen).*

---


> ✅ İŞLENDİ (2026-10-27): CEVAP kuyruğa alındı → `00-KUYRUK.md` § ⭐ AŞAMA PN (PO NOTU 2026-10-27 md.4 "öne al"). Kart arşive taşındı (5c-c).
