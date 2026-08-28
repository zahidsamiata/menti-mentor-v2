# BİLANÇO KARAR DOSYASI — G7: UX / Tasarım / Erişilebilirlik (SEO, tema, WCAG, landing)

**📸 DONDURULMUŞ** · 2026-08-27 (Tur-5b) · Kaynak: `docs/raporlar/bilanco/kararlar/00-SAYIM-2026-08-27.md` (c/G7) + `docs/raporlar/bilanco/karar-defteri-2026-08-26.md`

> **Ne bu:** G7 grubundaki her kalem için PO'nun tek tek karar verebileceği sade kartlar. Kod, karttan önce geniş grep + `ls` ile teyit edildi (yalnız okundu; kod değişmedi). Karar defterindeki iddialardan çürüyenler "⚠️ bilanço yanılmış" notuyla düzeltildi.

---

## MUTABAKAT (dosya başı)

- **Tur-5a beyanı (G7):** 15 kalem.
- **Bu dosyada:** 14 karar kartı + 1 ✅ (kart yok, "zaten yapılmışlar" bölümünde) = **15**. ✅ Beyan TUTUYOR.
- **Durum dağılımı (14 kart):** ⬜ 12 · ❓ 1 · 🔵 1 · (🗑️ 0). Ayrıca ✅ 1 (kart yok).
  - Not: 00-SAYIM'daki G7 satır dökümünde "⏸️ A12 (GTM en son)" satırı sayımda `🔵` kovasına yazılmıştı; burada A12 için kart açıldı (durum 🔵 ertelendi).
- **Kod-teyidi yapılan iddia:** 8 (aşağıda kartlarda ⚠️/teyit olarak işaretli). **Çürüyen (yanlış-pozitif): 3** (SEO paketi kısmen VAR: favicon+OG+robots+lang mevcut; sayımda "hepsi yok" gibi duruyordu). **❓ (arandı, sonuç net değil): 0.**
- **PO okuma süresi:** ~14 kart × ~1.25 dk ≈ **~17,5 dk**.

---

## KARARLAR

---
**[G7-01] Ekran-okuyucu erişilebilirlik: noktasal düzeltmeler**
Ne: Bazı ekranlarda görme engelli/klavye kullanıcısı için etiket eksik. "Kullanıcı bildir" penceresi, soru formu alanları ve günlük soru bileşeni ekran okuyucuya doğru tanıtılmıyor.
Neden başlanmıştı: NİYET BELGELENMEMİŞ (denetimde tespit edildi, erişilebilirlik borcu).
Nerede durdu: DURUŞ SEBEBİ YOK (hiç ele alınmadı).
Bugünkü durum: ⬜
Etkisi: Görme engelli/klavye kullanıcısı bazı akışları tamamlayamayabilir; erişilebilirlik uyumu düşer.
İş boyu: S
Kaynak: karar-defteri (md.50) · Numara: md.50
(teyit) `DailyQuestionWidget.tsx`'te seçenek grubu için `radiogroup`/`aria` yok; `ReportUserButton.tsx` penceresi etiketsiz — bilanço iddiası DOĞRULANDI.

[x] işleme al   [ ] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---
**[G7-02] DISC renklerinin açık temada okunabilirliği (WCAG kontrast)**
Ne: DISC harflerini/rozetlerini gösteren renkler açık temada yeterince koyu değil; metin-arka plan kontrastı erişilebilirlik eşiğini geçmiyor (yaklaşık 5 dosyada ~7 renk tonu + platform rozetinin açık varyantı).
Neden başlanmıştı: NİYET BELGELENMEMİŞ (denetim bulgusu; erişilebilirlik borcu).
Nerede durdu: DURUŞ SEBEBİ YOK.
Bugünkü durum: ⬜
Etkisi: Az gören kullanıcı DISC etiketini okuyamayabilir; kurumsal erişilebilirlik iddiası zayıflar.
İş boyu: S
Kaynak: karar-defteri (md.64/D22/D23) · Numara: md.64 / D22 / D23

[x] işleme al   [ ] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---
**[G7-03] Arama motoru teknik paketi (favicon / paylaşım kartı / site haritası / robots / dil)**
Ne: Sitenin Google ve sosyal medyada düzgün görünmesi için gereken teknik parçalar. Bilanço bunların topluca eksik olduğunu varsayıyordu; kod teyidinde bir kısmı ZATEN VAR.
Neden başlanmıştı: NİYET BELGELENMEMİŞ (SEO denetimi).
Nerede durdu: Kısmen yapılmış; kalan parçalar başlanmamış.
Bugünkü durum: ⬜
Etkisi: Eksik parçalar (site haritası/robots dosyası/mutlak-URL tabanı) SEO ve doğru indekslenmeyi kısıtlar.
İş boyu: S
Kaynak: karar-defteri (md.51-55) · Numara: md.51-55
⚠️ bilanço yanılmış: {favicon/OG/robots/lang topluca YOK} → {gerçek: `favicon.ico` VAR · ana sayfada `openGraph`+`twitter`+`robots` meta VAR · `<html lang="tr">` VAR}. **Gerçekten eksik olanlar:** `metadataBase` (mutlak URL tabanı) YOK · `sitemap.ts`/`sitemap.xml` YOK · `robots.ts`/`robots.txt` dosyası YOK (yalnız sayfa-içi robots meta var) · `opengraph-image` görseli YOK · dil `tr` (istenen `tr-TR` değil).

[x] işleme al   [ ] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---
**[G7-04] `www` adresini çıplak alan adına yönlendirme (301) — KRİTİK**
Ne: `www.site` ile `site` iki ayrı adres gibi davranıyor; arama motoru için tek kanonik adrese kalıcı (301) yönlendirme yok. Yönlendirmeyi yapacak dosya (frontend `middleware.ts`) hiç yok.
Neden başlanmıştı: NİYET BELGELENMEMİŞ (SEO-kanonik denetim bulgusu; "KRİTİK" işaretli).
Nerede durdu: DURUŞ SEBEBİ YOK — dosya hiç oluşturulmamış.
Bugünkü durum: ⬜
Etkisi: SEO otoritesi iki adrese bölünür; aynı dosya eksikliği admin sunucu-taraflı guard boşluğuyla (G1/K6) ortak — tek dosya iki işi çözer.
İş boyu: S
Kaynak: karar-defteri (md.66) · Numara: md.66
(teyit) `frontend/src/middleware.ts` ve `frontend/middleware.ts` YOK (`ls` sonucu) — bilanço iddiası DOĞRULANDI.

[x] işleme al   [ ] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---
**[G7-05] Ziyaretçi ölçümü (GTM + GA4 + Clarity + Search Console) — kısmi**
Ne: Site trafiğini ölçmek için etiket yöneticisi ve analitik araçları. Bilanço "kod var, sadece merge/deploy yok" diyordu; kod teyidinde analitik kodu frontend kaynağında BULUNAMADI.
Neden başlanmıştı: NİYET BELGELENMEMİŞ (canlı sonrası ölçüm ihtiyacı).
Nerede durdu: İlişkili çatı PR (#110) "MERGE ETME" ile kilitli; koda henüz girmemiş.
Bugünkü durum: ⬜
Etkisi: Ölçüm olmadan canlıda kullanıcı davranışı görünmez; çerez izni (G7-11) ön-koşulu.
İş boyu: S
Kaynak: karar-defteri (md.56) · Numara: md.56
⚠️ bilanço yanılmış: {kod var, merge/deploy yok} → {gerçek: GTM/GA4/gtag/Clarity/dataLayer izi frontend kaynağında YOK — grep boş; kod henüz eklenmemiş, yalnız #110'da bekliyor}.

[ ] işleme al   [x] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[x] PO notu: Çıkışta analytics OLMAYACAK (PO kararı). #110 kilitli kalır, çerez bandı onunla gelir.
---
**[G7-06] Çıkışta Google Analytics kullanılsın mı? (PO kararı)**
Ne: Google Analytics'in canlıya alınıp alınmayacağı iş kararı. "Evet" derse çerez bandı (G7-11) ve analitik paketi (G7-05) öncelik olarak yükselir; #110 buna bağlı.
Neden başlanmıştı: NİYET BELGELENMEMİŞ (açık PO kararı).
Nerede durdu: Karar bekliyor.
Bugünkü durum: ❓
Etkisi: Karar diğer iki kalemin (çerez bandı + analitik) önceliğini belirler.
İş boyu: PO-manuel (iş kararı)
Kaynak: karar-defteri (A19) · Numara: A19

[ ] işleme al   [x] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[x] PO notu: Çıkışta analytics OLMAYACAK (PO kararı). #110 kilitli kalır, çerez bandı onunla gelir.
---
**[G7-07] GTM + GA4 en son kontrol (canlı deploy sonrasına ertelendi)**
Ne: Etiket yöneticisi ve GA4'ün gerçekten çalıştığının canlı deploy'dan sonra doğrulanması. PO tarafından bilinçli olarak en sona ertelendi.
Neden başlanmıştı: Canlıda ölçümün doğru aktığını teyit için.
Nerede durdu: PO ertelemesi — canlı deploy sonrası yapılacak.
Bugünkü durum: 🔵
Etkisi: Erteleme sürerse, canlıda ölçümün doğruluğu deploy anına kadar teyit edilmemiş kalır.
İş boyu: PO-manuel (canlı sonrası kontrol)
Kaynak: karar-defteri (A12) · Numara: A12

[ ] işleme al   [x] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---
**[G7-08] Kurumsal sayfalar + footer/nav/yukarı-çık/WhatsApp/yapısal-veri**
Ne: Hakkımızda/iletişim gibi kurumsal sayfalar, alt-menü ve üst-menü düzeni, "yukarı çık" düğmesi, WhatsApp bağlantısı ve arama motoru için yapısal veri (JSON-LD) + semantik HTML iyileştirmeleri.
Neden başlanmıştı: NİYET BELGELENMEMİŞ (SEO + kurumsal görünüm denetimi).
Nerede durdu: DURUŞ SEBEBİ YOK.
Bugünkü durum: ⬜
Etkisi: Kurumsal güven ve SEO zenginliği eksik kalır.
İş boyu: M
Kaynak: karar-defteri (md.57-63) · Numara: md.57-63

[ ] işleme al   [x] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---
**[G7-09] WCAG 2.1 AA erişilebilirlik denetimi (bütünsel)**
Ne: Tüm arayüzün erişilebilirlik standardına (WCAG 2.1 AA) göre uçtan uca denetlenmesi. G7-01/G7-02 noktasal düzeltmelerden farklı olarak sistematik tarama.
Neden başlanmıştı: NİYET BELGELENMEMİŞ (erişilebilirlik hedefi).
Nerede durdu: DURUŞ SEBEBİ YOK.
Bugünkü durum: ⬜
Etkisi: Bütünsel denetim yapılmazsa dağınık erişilebilirlik açıkları görünmez kalır.
İş boyu: M
Kaynak: karar-defteri (md.64) · Numara: md.64

[x] işleme al   [ ] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---
**[G7-10] Açılış sayfası UX paketi (ipuçları, tıklanabilirlik, tutarsızlıklar, mobil)**
Ne: Açılış sayfasında çeşitli kullanılabilirlik pürüzleri: bilgi baloncukları/açıklama ("i") ikonları, üzerine-gelince çıkan köprüler, tıklanamayan bağlantılar, "sıfır etikette skor gösterme" çelişkisi, mobil uyum ve algoritma görselinde (AlgorithmBento) bir mantık hatası.
Neden başlanmıştı: PO "öncelikli" demişti (landing UX cilası).
Nerede durdu: İz zayıf; başlanmamış görünüyor.
Bugünkü durum: ⬜
Etkisi: İlk izlenim ve dönüşüm (kayıt) oranı olumsuz etkilenir.
İş boyu: M
Kaynak: karar-defteri (md.22 v2) · Numara: md.22(v2)
(teyit) `AlgorithmBento.tsx` mevcut — mantık-hatası iddiasının bağlamı doğrulandı (bileşen var).

[ ] işleme al   [x] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---
**[G7-11] Açılış sayfası koyu/açık tema seçimi (canlı sonrasına ertelendi)**
Ne: Açılış sayfasının koyu/açık tema arasında değiştirilebilmesi. Sayfada renkler sabit kodlanmış (~256 nokta / ~1,5 gün iş); PO canlı sonrasına ertelemiş.
Neden başlanmıştı: Ziyaretçiye tema seçimi sunmak.
Nerede durdu: PO ertelemesi — canlı sonrası.
Bugünkü durum: ⬜
Etkisi: Ertelenirse açılış sayfası tek temada kalır (uygulama-içi tema toggle zaten çalışıyor — G7 "zaten yapılmışlar").
İş boyu: M
Kaynak: karar-defteri (md.22 v2) · Numara: md.22(v2)

[ ] işleme al   [x] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---
**[G7-12] Açılış sayfası ana başlık (slogan) değişikliği**
Ne: Ana sayfadaki büyük başlığın yeni metinle ("Mentörlük programınızı… zahmetsizce" + yeni alt-metin) değiştirilmesi. Karar verilmiş ama koda yansımamış.
Neden başlanmıştı: Yeni konumlandırma/mesaj için PO kararı.
Nerede durdu: Karar var, kod yok.
Bugünkü durum: ⬜
Etkisi: Sayfa hâlâ eski sloganı gösteriyor; istenen mesaj yansımıyor.
İş boyu: S
Kaynak: karar-defteri (F4 / md.22) · Numara: F4 / md.22
(teyit) `HeroSection.tsx` H1 hâlâ eski: "Ağınızı Sadece Takvimle Değil, İnsan Kimyasıyla Yönetin." — yeni slogan YOK; bilanço "karar var kod yok" DOĞRULANDI.

[x] işleme al   [ ] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---
**[G7-13] Yumuşak lacivert açılış teması yönelişi (UNUTULMUŞ)**
Ne: Açılış sayfası için "yumuşak lacivert" renk yönelimi kararı. Karar alınmış ama uygulanmamış ve yol haritasında net değil (unutulmuş).
Neden başlanmıştı: Marka/estetik yönelimi (PO kararı).
Nerede durdu: Unutulmuş; yol haritasında net iz yok.
Bugünkü durum: ⬜
Etkisi: Görsel yön kararsız; G7-11 (tema) ve G7-10 (UX) ile birlikte ele alınabilir.
İş boyu: S
Kaynak: karar-defteri (E4 / md.65) · Numara: E4 / md.65

[x] işleme al   [ ] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---
**[G7-14] Mesaj/konuşma listesinde sanallaştırma yok (kozmetik, düşük)**
Ne: Uzun konuşma listelerinde performans için "sanallaştırma" (görünen kısmı çizme) tekniği kullanılmıyor. Düşük öncelikli, kozmetik.
Neden başlanmıştı: NİYET BELGELENMEMİŞ (kapasite denetimi notu).
Nerede durdu: DURUŞ SEBEBİ YOK.
Bugünkü durum: ⬜
Etkisi: Çok uzun listelerde hafif yavaşlık; düşük etki.
İş boyu: S
Kaynak: karar-defteri (NUMARASIZ, kapasite :37) · Numara: NUMARASIZ

[ ] işleme al   [x] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---

## Bu grupta zaten yapılmışlar (✅ — kart yok)

- ✅ **Tema toggle altyapısı** (koyu/açık tema anahtarı): ThemeProvider + localStorage kalıcılığı + `.dark` sınıfı + ilk-render titremesi (FOUC) önleme çalışıyor. (karar-defteri: md.5, PR#32) — kod teyidi: `frontend/src/providers/ThemeProvider.tsx` + `components/molecules/ThemeToggle.tsx` + `layout.tsx` FOUC guard mevcut.
