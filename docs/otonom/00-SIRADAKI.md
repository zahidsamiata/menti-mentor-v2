# 00-SIRADAKI — yalnız 🟢 BEKLIYOR işler

> ⚙️ **TÜRETİLMİŞ** — kaynak: `docs/otonom/00-KUYRUK.md` · üretim: 2026-09-23 18:54 UTC · üretici: `scripts/otonom-turet.mjs`
> ⛔ **BURAYA ELLE YAZMA.** Kaynak olarak kullanma, atıf verme. Çelişki halinde **00-KUYRUK.md KAZANIR.**
> Üretim tarihi 1 günden eskiyse bu dosyaya güvenme → kaynaktan hedefli oku (`OTONOM-PROMPT.txt` § 0.4).
> 🔥 SICAK — her otonom turda okunur. Hedefli okuma: OTONOM-PROMPT.txt · Okuma

**Sayım:** kuyrukta 206 iş satırı tarandı · **🟢 BEKLIYOR: 81** · ⛔ çıkış blokeri olan 🟢: 0
**Kapısı belirsiz (buraya ALINMADI — kaynakta bak):** E-3 · AN-13 · AN-46

---

⚠️ **Not kolonu bu dosyada YOK** (kanıt zinciri uzun; 40.000 tavanı). Bir işe BAŞLARKEN tam satırı kaynaktan oku:
`grep -n '^| <iş-no> |' docs/otonom/00-KUYRUK.md`

<!-- ↓ 00-KUYRUK.md baş kısmı (tanımlar), aynen -->
# 00-KUYRUK — Otonom İş Kuyruğu (v2)
Güncelleme: 2026-09-10 · Sahip: PO (Zahid)

**🔄 YAŞAYAN** (canonical: **TEK aktif iş kaynağı** — otonom motorun okuduğu tek iş listesi)
> ⭐ **Bu belge projenin TEK iş kuyruğudur (2026-09-21).** `10-yol-haritasi.md` ve `00-CIKIS-PLANI.md` 📸 donduruldu; `00-ONCELIK-SIRASI-2026-08-28.md`'nin açık kalemleri **AŞAMA F**, PO'nun "EN ÖN SIRA" içerik bloğu **AŞAMA I**, yol-haritası/karar-takibi devri **AŞAMA Y** olarak buraya alındı.
> ⛔ **Yeni iş başka hiçbir belgeye açılmaz.** Tek istisna kod-dışı işler: `docs/otonom/03-PO-ELLE-ISLER.md`.
Ajan bu dosyayı OKUR, yalnız `Durum` ve `Not` kolonlarını günceller. İş EKLEMEZ.

## Kapılar
🟢 **YAP+MERGE** — yap, doğrulama listesi tam ✅ ise merge et, canlıya al
🟡 **YAP+PR** — yap, PR aç, merge etme (riskli/geniş)
🔴 **KARAR BEKLER** — ilgili KARAR cevapsızsa DOKUNMA, atla, sonrakine geç

> ⚠️ GÜNCELLEME (2026-09-19, kapı politikası gevşetildi — PO): **Varsayılan kapı artık 🟢'dır.**
> Bir iş yalnız ŞU ÜÇ İSTİSNADAN birine giriyorsa 🟡 kalır (yoksa 🟢 yapılır):
>  1. **MIGRATION / SEED** gerektiriyorsa
>  2. **HASSAS DOSYA'ya dokunuyorsa:** auth/yetkilendirme (guard·middleware·token·session) · KVKK/rıza/aydınlatma/veri silme-dışa aktarma · matching/eşleştirme motoru/skorlama
>  3. **Canlı veriye GERİ DÖNÜLMEZ dokunuyorsa**
> Belirsizse 🟡 kalır. 🔴 (KARAR bekleyen) işler bu gevşetmeden **ETKİLENMEZ.**
> Gerekçe (PO): gerçek kullanıcı ~sıfır · her iş ayrı PR (tek tek revert edilebilir) · `npm run verify` + CI kapısı var.

## ⛔ ÇIKIŞ BLOKERİ işareti (2026-09-21)

> ✅ **ÇIKIŞ TANIMLANDI (KARAR-69 CEVAPLANDI 2026-09-23: A+B):** ÇIKIŞ = **sistem uçtan uca çalışır VE ilk gerçek dernek mentileriyle kullanır** (B). **ÇIKIŞ BLOKERİ = "ilk kurum + KVKK tabanı için gereken".** Üç kova: **(a) ölçeğe bağlı hukuk** (VERBİS · kurumsal sözleşme · envanter · her metnin avukat onayı) → **ERTELENİR, "ilk kurum" kutusuna kayar, blokeri DEĞİL** · **(b) ilk kullanıcıyla devreye giren** (aydınlatma · açık rıza · silme hakkı · yurtdışı saklama bilgilendirmesi) → **blokeri KALIR** · **(c) kriz kanalı** → hukuk değil GÜVENLİK, ayrı karar (bu kararla kapanmaz). Güvenlik/ana-akış/sessiz-yanlış (T1/T2/T3) blokerleri "ilk kurum" için gerekli olduğundan KALIR. Bu turda gözden geçirme: mevcut ajan blokerlerinin tümü KALDI (hiçbiri saf (a)-kovası değil); yalnız 3 "aday" etiketi bu tanımla KESİNLEŞTİ (AN-03 · AN-30 · PS-02).

Not sütununda **`⛔ ÇIKIŞ BLOKERİ (T…)`** gören iş, **canlıya çıkışı tek başına engeller** — kapı renginden (🟢/🟡/🔴) **bağımsızdır** ve `OTONOM-PROMPT.txt` §4 sırasında **0. öncelikte**, hepsinden önce işlenir.

**Test** (kaynak: `00-CIKIS-PLANI.md` katı testi — o belge 📸 donduruldu ama **ölçüt yerinde kalır**):
- **T1** — yasa/sızıntı/geri alınamaz veri kaybı
- **T2** — ana akış kırılır (başvuru → onay → davet → giriş → eşleşme → randevu)
- **T3** — sessiz yanlış: kimse fark etmez, sistem "çalışıyor" görünür

⚠️ **Varsayılan = ERTELE.** Bir işin bloker olduğu **KANITLANIR**; şüpheyle işaretlenmez.
**Sayı (2026-09-21):** 24 çıkış blokeri — **14'ü ajanda** (bu dosyada işaretli), **10'u PO'da** (`docs/otonom/03-PO-ELLE-ISLER.md` en üstteki tablo). Kaynak: `docs/raporlar/kesif/devir-analizi-2026-09-21.md` §11.

## "Bitti" tanımı
1. **Kullanıcı görüyor** — ekranda bir şey değişti ya da bir hata kayboldu. "Backend hazır" sayılmaz.
2. **Testler yeşil** — mevcutlar + yeni davranış için en az bir test
3. **02-ILERLEME.md'ye yazıldı** — ne yapıldı, dosyalar, PR, "kullanıcı artık şunu görüyor"

## ⛔ K-20 ZAMANLAMASI — belge senkronu gerçekten EN SON
K-20 PR'ı, diğer TÜM PR'lar merge edildikten SONRA hazırlanır.
Bir iş merge edilmeden belgeye "CANLIDA" YAZILMAZ; "PR'DA" da yazılmaz —
o iş belge senkronuna kadar beklenir.
Gerekçe (Tur 1'de yaşandı): K-20 PR'ı K-02 merge olmadan hazırlandı, sonra
K-02 merge edildi ama 09-DURUM'a dönülmedi → aynı commit içinde iki belge çelişti.
Kontrol: K-20'yi açmadan önce `gh pr list --state open --author @me` boş olmalı.

## ⏱️ CI BEKLERKEN BOŞ DURMA
CI koşarken poller döngüsüne girme (`sleep`, tekrarlı `gh pr checks`).
CI beklerken SIRADAKİ işin kök sebep analizine başla; merge'leri topluca yap.
Gerekçe (Tur 1'de yaşandı): 32 dakikanın kayda değer kısmı CI beklemekle geçti.
İstisna: turun SON PR'ı (K-20) — orada beklemek doğru, yapılacak başka iş yok.

## Durum kodları
~~[ESKİ · 2026-09-21] BEKLIYOR · CALISILIYOR · BITTI · ATLANDI(karar) · BASARISIZ · IPTAL(PO)~~
⚠️ **GÜNCELLEME (2026-09-21, BE turu): `PR-ACIK` EKLENDİ — 7 kod.**
**BEKLIYOR · CALISILIYOR · PR-ACIK · BITTI · ATLANDI(karar) · BASARISIZ · IPTAL(PO)**
⭐ **`PR-ACIK`** = iş YAPILDI, PR AÇILDI, ama **MERGE EDİLMEDİ**.
Kanıt: `docs/otonom/OTONOM-PROMPT.txt:81-82` (canonical, en yeni) — motorun her tur okuduğu dosya zaten
7 kod sayıyordu; kuyruk 6 sayıyor ama gövdesinde `PR-ACIK`'ı **kullanıyordu** (F-19, GV-01/02).
Bu, **YN-07**'nin tam vakasıydı; hizalama o satırın bir ayağını kapatır. ⚠️ `belge-duzeni-rehberi.md` § KURAL 10'daki
`✅·🟡·🔀·⬜·❓·🗑️` **AYRI bir alfabedir** (karar-takip **kart kodları**) — bu liste **kuyruk satırı durumları** içindir;
ikisi karıştırılmaz (YN-07'nin ikinci ayağı).

---

## ŞERİT DAĞILIMI (paralel yazma — dosya sahipliği)

| Şerit | Sahip olduğu alan | İşler |
|---|---|---|
| **Ş1 · Menti akışı** | `app/(dashboard)/disc-test/**` · `app/(dashboard)/learning-journey/**` · `app/(dashboard)/menti/**` · DISC/test bileşenleri | K-02, K-06, K-07, K-09 |
| **Ş2 · Randevu** | `app/(dashboard)/book-meeting/**` · `app/(dashboard)/mentor/availability/**` · `components/organisms/MeetingScheduler.tsx` · `backend/src/controllers/meetingController.ts` · `backend/src/routes/meetingRoutes.ts` | K-03, K-05, K-15 |
| **Ş3 · Profil & KVKK** | `app/(dashboard)/profile/**` · `lib/api/profile.ts` · `backend/src/controllers/onboardingController.ts` · KVKK/veri sayfaları · fotoğraf yükleme | K-04, K-08, K-12, K-17 |
| **Ş4 · Admin & altyapı** | `app/(dashboard)/admin/**` · `backend/src/routes/adminRoutes.ts` · `backend/src/server.ts` · güvenlik ara katmanları · tema/global CSS | K-11, K-14, K-10 |
| **Ş0 · Sıralı** | Birden fazla şeridi ilgilendiren, ortak dosyaya dokunan işler. TEK BAŞINA çalışır, diğerleri beklemez ama onun dosyasına dokunmaz. | K-01, K-13, K-16, K-18, K-19, E-1..E-4, K-20 |

⚠️ Bir iş kendi şeridinin dışına çıkmak zorundaysa → Ş0'a taşı, Not'a yaz.

---

## 🟡 AİLE HARİTASI (2026-09-23, PO onaylı kapı çözümü)
> Kalan 🟡 işler ailelere ayrıldı; aynı aile TEK dalda TEK PR'da işlenir (Y-G hariç). Detay: her satırın Not'unda "aile: Y-x".
- **Y-A** Yetki ve sahiplik · 16 iş · tek PR'da işlenecek
- **Y-B** KVKK metin ve akışları · 21 iş · tek PR'da işlenecek
- **Y-C** Yönlendirme (matching) motoru · 22 iş · tek PR'da işlenecek
- **Y-D** Bildirim ve e-posta · 3 iş · tek PR'da işlenecek
- **Y-E** Oturum · cookie · token · 7 iş · tek PR'da işlenecek
- **Y-F** Geri-dönülmez işlemler · 5 iş · tek PR'da işlenecek
- **Y-G** MIGRATION/SEED · 20 iş · ⛔ GRUPLANMAZ, her biri ayrı PR + yedek + PO onayı
- **Y-?** Aileye oturmayan (belirsiz) · 8 iş · tek tek PO değerlendirmesi (K-14 · F-04 · GV-03 · P-15 · U-01 · AN-06 · AN-18 · AN-19)

---

<!-- ↑ baş kısım sonu -->


## AŞAMA I — İÇERİK (PO "EN ÖN SIRA", 2026-09-03)

| # | Şerit | İş | Kapı | Bitti demek |
|---|---|---|---|---|
| I-01 | Ş2 | **madde 31+151 — eşleşen taraflar birbirine nasıl yaklaşacağını hiçbir yerde okumuyor.** 8 hazır metin (4 mentöre + 4 mentiye) YAZILI ama ekranda gösterilmiyor. | 🟢 | Eşleşme kurulunca iki taraf da karşısındakine nasıl yaklaşacağını okuyor |
| I-04 | Ş1 | **madde 149 — sınavda 4 kritik konu garantisi TASARLANMIŞ mekanizmayla değil, tesadüfen sağlanıyor.** Çekim/örnekleme algoritması yok; tüm aktif sorular dönüyor. | 🟢 | 4 garantili + 4 rastgele çekim açıkça uygulanıyor; soru havuzu büyüyünce de garanti bozulmuyor |
| I-05 | Ş1 | **madde 156 — görüşme sıklığı yalnız anlaşma sayfasında.** Profilde ve bekleme metninde görünmüyor. | 🟢 | Menti görüşme sıklığını profilinde ve beklerken görüyor |
| I-07 | Ş1 | **madde 157 — yanlış yapılan konu tekrar sınavda MUTLAKA gelmiyor.** Ağırlıklı öne alma var, zorunluluk ve "diğer varyantıyla sor" yok. | 🟢 | Yanlış yapılan konu bir sonraki denemede mutlaka ve farklı varyantıyla çıkıyor |

## AŞAMA A — Migration'sız, kullanıcının hemen göreceği işler

| # | Şerit | İş | Kapı | Bitti demek |
|---|---|---|---|---|
| K-06 | Ş1 | **Öğrenme yolculuğu — diğer şıkların açıklaması.** Şu an yalnız seçilenin açıklaması görünüyor. | 🟢 | 4 şıkın da açıklaması görünüyor |
| K-08 | Ş3 | **Sosyal alan doğrulaması.** LinkedIn alanına YouTube linki kaydedilebiliyor. FE+BE platform doğrulaması (`/api/users/me/profile`). Yeni alan EKLEME. | 🟢 | Yanlış platform linki reddediliyor |
| K-10 | Ş4 | **Dark mode kontrast.** Test 3.4'teki okunmayan alanlar. Palet tutarlılığı TEKNİK karar, sorma. | 🟢 | Belirtilen ekranlarda metin okunuyor |

## AŞAMA C — Ürün kararı / migration bekleyenler

| # | Şerit | İş | Kapı | Bitti demek |
|---|---|---|---|---|
| K-19 | Ş0 | **Kalan ürün kararları uygulaması:** menti mentör listesi · toplantı linki kimde. Her biri ayrı PR. | 🟢 | Her karar için ekranda değişiklik |

## AŞAMA F — BİLANÇO DEVRİ (2026-08-28 öncelik sırası → koda karşı doğrulandı 2026-09-19)

| # | Şerit | İş | Kapı | Bitti demek |
|---|---|---|---|---|
| F-01 | Ş0 | **Belge reorg — taşıyıcı-ad + büyük reorg.** G9 grubu Faz 1a'da çoğu ✅; kalan: 5 canonical taşıyıcı belge (09-DURUM/10-yol/00-INDEX/00-KARAR-TAKIP) taşınması + ~38 referans + ~68 belge isim/klasör standardizasyonu. | 🟢 | Taşıyıcı adlar taşındı, referanslar kırılmadı |
| F-14 | Ş1 | **Menti personası çeşitlendirme (B8).** Sertifika/içerik senaryolarında menti persona çeşitliliği — içerik işi. | 🟢 | Senaryolarda çeşitli menti personaları var |
| F-21 | Ş0 | **Erişilebilirlik paketi (G7-01+02+09).** aria/role/klavye (Likert radiogroup, modal role=dialog yok) + DISC kontrast + WCAG denetimi. | 🟢 | Ekran okuyucu/klavye ile temel akışlar erişilebilir |
| F-28 | Ş0 | **Sayfa metni merkezileştirme (G6-05).** `registerMessages.ts`+`threeQuestionsText.ts` özel modüller var; genel sayfa-metni sözlüğü yok. | 🟢 | Dağınık inline metinler merkezî sözlükte |
| F-32 | Ş4 | **Sekme geçiş yavaşlığı (G8-13).** İstemci önbelleği/prefetch katmanı yok; her sekmede yeniden fetch. | 🟢 | Sekme geçişleri hızlı (önbellek) |
| F-33 | Ş4 | **Dashboard sol-alt kullanıcı kartı (G8-14).** Admin panelde var; menti/mentör dashboard'unda sağ-üst bar, sol-alt kart yok. | 🟢 | Dashboard'da sol-alt kullanıcı kartı/menü |

## AŞAMA P — PANEL DENETİMİ BULGULARI (2026-09-19)

| # | Şerit | İş | Kapı | Bitti demek |
|---|---|---|---|---|
| P-16 | Ş4 | **mentor-count sayımı `User.role` üzerinden.** Kural "kurum-içi sayım kaynağı `TenantMembership.role`" diyor. Çok kurumlu kullanıcıda sayı şişer. | 🟢 | Sayım TenantMembership.role üzerinden, çok kurumluda doğru |

## AŞAMA Y — YOL HARİTASI + KARAR TAKİBİ DEVRİ (2026-09-21)

| # | Şerit | İş | Kapı | Bitti demek |
|---|---|---|---|---|
| Y-03 | Ş4 | **madde 47 — Zod doğrulama bloğu 30 controller'da kopyalanmış.** Her uç kendi hata biçimini elle yazıyor; biçim kayarsa kullanıcı tutarsız hata görür, güvenlik yaması 30 dosyaya ayrı uygulanır. | 🟢 | Girdi hataları tüm uçlarda aynı biçimde ve aynı Türkçe mesajla |
| Y-04 | Ş4 | **madde 48 kalanı — üç liste ucu sayfalamasız.** `requestController` · `feedbackLogController` · `clubController` tüm satırları tek yanıtta döndürüyor. | 🟢 | Listeler sayfalı geliyor, kayıt artınca ekran donmuyor |
| Y-07 | Ş4 | **madde 57 — Hakkımızda ve İletişim sayfaları yok.** | 🟢 | Ziyaretçi /hakkimizda ve /iletisim'i açıp iletişim yolunu görüyor |
| Y-08 | Ş4 | **madde 53 — dashboard/admin/platform arama motoruna kapalı sayılmıyor.** `robots.txt` tarama önerisidir, indekslemeyi yasaklamaz. | 🟢 | Özel alan sayfaları arama sonuçlarında görünmüyor |
| Y-09 | Ş4 | **madde 51+52 — site simgesi Next.js varsayılanı; paylaşım GÖRSELİ yok ve OG yalnız ana sayfada.** | 🟢 | Sekmede ve link paylaşımında kurum logosu görünüyor |
| Y-10 | Ş4 | **madde 62 — JSON-LD yapısal veri yok.** | 🟢 | Arama sonucunda kurum zengin sonuç olarak görünüyor |
| Y-11 | Ş4 | **madde 60+61 — "yukarı çık" ve yüzen WhatsApp düğmesi yok.** | 🟢 | Kullanıcı sağ-altta iki düğmeyi görüp kullanıyor |
| Y-13 | Ş4 | **madde 54 — sitemap elle yazılmış.** Yeni public sayfa eklenince sitemap'te çıkmaz. | 🟢 | Yeni public sayfa eklenince sitemap'te kendiliğinden görünüyor |
| Y-15 | Ş3 | **madde 75 — mentör görünürlük tercihi ekranda YOK.** Backend tam ve IDOR korumalı; kullanıcı arayüzü hiç yok. | 🟢 | Mentör kendini menti havuzuna açıp kapatabiliyor |
| Y-16 | Ş4 | **madde 127 — etiket önerme ekranda YOK.** Backend ucu çalışıyor, çağıran yok. | 🟢 | Kullanıcı yeni etiket önerebiliyor, yönetici onaylıyor |
| Y-17 | Ş0 | **madde 166 — iki farklı `rankMentorsForMenti` fonksiyonu.** Aynı ad, iki dosya, farklı imza (biri senkron biri async); yanlışını import etmek kolay. | 🟢 | Tek isim tek davranış; yanlış import imkânsız |
| Y-18 | Ş0 | **madde 126 — `answeredFollowup` olmayan tabloyu sorguluyor; profil tamamlanma yüzdesi sistematik DÜŞÜK.** | 🟢 | Profil tamamlanma yüzdesi gerçek veriye dayanıyor |

## AŞAMA GV — GÜVENLİK VE KVKK KONSEYİ (2026-09-21)

| # | Şerit | İş | Kapı | Bitti demek |
|---|---|---|---|---|
| GV-20 | Ş0 | **Yüklenen görselin çözünürlük sınırı yok.** Tek bir yükleme ön yüz sunucusunun belleğini tüketebiliyor. | 🟢 | Aşırı çözünürlüklü görsel yüklenemiyor, kullanıcı anlaşılır hata görüyor |
| GV-21 | Ş0 | **`/api/auth` altına eklenecek yeni adres sessizce OAuth'a düşüyor.** Bugün sorun yok ama bir sonraki geliştirici fark etmeden açık uç yaratabilir. | 🟢 | Yeni bir adres eklendiğinde yanlış yere düşmüyor; test bunu yakalıyor |
| GV-22 | Ş0 | **Yükleme boyutu ayarı yanlış yazılırsa sınır sessizce kalkıyor.** Operatörün tek yazım hatası sınırsız yüklemeye dönüşüyor. | 🟢 | Ayar hatalı yazılırsa uygulama açılışta uyarıyor, sınır sessizce kalkmıyor |
| GV-23 | Ş3 | **Hesap kapatmada oturum çerezi diğer beş çağrıyla tutarsız temizleniyor.** Bugün çalışıyor, ancak çerez ayarları değişirse sessizce kırılır. | 🟢 | Hesabını kapatan kullanıcının oturumu her tarayıcıda kesin kapanıyor |

## AŞAMA PS — PSİKOMETRİ KONSEYİ (2026-09-21)

| # | Şerit | İş | Kapı | Bitti demek |
|---|---|---|---|---|
| PS-05 | Ş4 | **Yöneticinin "Başarı oranı" KPI kartı daima boş ve bunu söylemiyor** — `—` gösteriyor, "veri yok" demiyor. | 🟢 | Yönetici, başarı oranının **neden** boş olduğunu ekranda okuyor (sessiz `—` yerine) |
| PS-07 | Ş0 | **Eşleştirmenin ANLAMINI test eden test yok** — iki aday arasında beklenen sıralamayı assert eden tek test bile yok. | 🟢 | (iç kalite — kullanıcı etkisi: formül bozulursa CI yakalar, yanlış sıralama canlıya çıkmaz) |
| PS-08 | Ş0 | **İki "anlamlılık" testi de KOŞULLU — boş listede sessizce yeşil geçiyor** (vacuous). | 🟢 | (iç kalite — yeşil CI gerçekten bir şey kanıtlıyor) |
| PS-11 | Ş1 | **`/onboarding` adım 2 boş soru listesinde SONSUZ SPINNER** + ilerleme yüzdesi `NaN`. | 🟢 | (savunma — bugün tetiklenmiyor; backend boş liste dönerse kullanıcı sonsuza kadar dönen ikonda takılmıyor, anlamlı metin görüyor) |

## AŞAMA IC — İÇERİK KONSEYİ (2026-09-21)

| # | Şerit | İş | Kapı | Bitti demek |
|---|---|---|---|---|
| IC-01 | Ş0 | **Mentör panelindeki 4 İngilizce DISC etiketi Türkçeleşsin — ve 5 ayrı DISC sözlüğü tek kaynağa insin.** 2026-09-09 kullanıcı testi bulgusunun doğrudan kaynağı. | 🟢 | Mentör, "Engellenecek DISC Profilleri" filtresinde İngilizce yerine Türkçe DISC adı görüyor |
| IC-03 | Ş0 | **12 ham-enum render noktası mevcut sözlüklerden geçsin** (rol · etiket durumu · görüşme formatı · sertifika durumu · log seviyesi · "Journey" başlığı) **+ 2 e-posta şablonundaki ham rol enum'u.** | 🟢 | Yönetici/platform ekranlarında ve e-postada `MENTOR`, `IN_PERSON`, `COOLDOWN` gibi ham değer yerine Türkçe karşılık |
| IC-05 | Ş0 | **Backend'e global Türkçe Zod `errorMap`.** ~75 mesajsız kısıt bugün İngilizce varsayılan basıyor. | 🟢 | Form hatalarında *"String must contain at most 1000 character(s)"* yerine Türkçe mesaj |
| IC-07 | Ş0 | **20 jenerik hata mesajının 5'inde backend'in gerçek hatası tamamen yutuluyor.** | 🟢 | Kullanıcı "İşlem başarısız" yerine gerçek sebebi görüyor |
| IC-09 | Ş0 | **Kuruma gönderilen düzeltme şablonlarının tonu suçlayıcı.** 5 metin emir kipinde, e-postayla kullanıcıya gidiyor. | 🟢 | Kullanıcı azarlanmadan ne yapacağını okuyor |
| IC-10 | Ş1 | **madde 139'un eksik yarısı: 4 menti "şimdilik" varyantı YAZILSIN.** Bugün yalnız mentör tarafı yazılı (4/8). | 🟢 | (ön koşul işi — kullanıcı etkisi `I-15` ile birlikte görünür: çoklu-arketip çıkan **menti** de "şimdilik" metnini okur) |
| IC-11 | Ş0 | **Terim birleştirme: randevu ↔ toplantı ↔ görüşme.** Aynı `Meeting` kaydı dört farklı adla anılıyor. | 🟢 | Menti "randevu" gönderip mentörün "toplantı" alması bitiyor; tek terim |
| IC-12 | Ş0 | **İçerik belgeleri hijyeni** — `bolumler/` 5 belge indekse · 3 zayıf durum etiketi · bayat `backend/` yolları · faz6'nın aşıldığı notu · `CLAUDE.md`'deki yanlış `registerMessages` beyanı. | 🟢 | (belge işi — kullanıcı etkisi yok; sonraki turlar doğru belgeyi okur, bayat sürümü canlıya taşımaz) |

## AŞAMA YN — YÖNETİŞİM KONSEYİ (2026-09-21)

| # | Şerit | İş | Kapı | Bitti demek |
|---|---|---|---|---|
| YN-01 | Ş0 | ⭐ **CLAUDE.md bölme KADEME 1 diskte uygulanmış ama COMMIT EDİLMEMİŞ + pay yalnız 258 karakter.** `git status` → ` M CLAUDE.md` · ` M belge-duzeni-rehberi.md` · `?? rtk-komut-rehberi.md`. Bulut oturumu yalnız **commit edilmiş** dosyaları görür → bir sonraki tur eski CLAUDE.md'yi okur. | 🟢 | Ajan oturum başında boyut uyarısı almıyor ve bir sonraki tur da almıyor |
| YN-02 | Ş0 | ⭐ **Taşıma iki YENİ tutarsızlık doğurdu (bu turda oluştu).** (a) `belge-duzeni-rehberi.md`'de **KURAL 8 artık İKİ KEZ** var: `:99-109` (kendi gövdesi) + `:143-152` (CLAUDE.md'den taşınan kopya). (b) `rehber:6` hâlâ *"bu **6** kurala uyar"* diyor — dosyada artık **18 kural bloğu** var; `rehber:3` künyesi *"Son güncelleme: **2026-08-23**"*. | 🟢 | Rehberi okuyan her kuralı bir kez ve tam görüyor; künye dosyanın gerçek hâlini söylüyor |
| YN-03 | Ş4 | **`rtk-komut-rehberi.md` hiçbir indekse kaydedilmedi (KURAL 5 borcu) + `docs/otonom/` hâlâ hiçbir klasör tanımı belgesinde yok.** `grep -n "rtk" docs/kararlar/00-INDEX.md` → **0**. `grep -ci otonom docs/kararlar/00-INDEX.md` → **0**. | 🟢 | INDEX'e bakan yeni RTK rehberini ve `docs/otonom/` klasörünü görüyor |
| YN-04 | Ş0 | ⭐ **Güvenlik kuralı yanlış kanıta dayanıyor — 24 gündür.** `CLAUDE.md:442` aynen: *"`registerMessages.ts` örnek addır, dosya HENÜZ kodda YOK: grep boş"*. **Dosya VAR:** `frontend/src/lib/registerMessages.ts` (bu turda `ls` ile doğrulandı). | 🟢 | Güvenlik kuralının gerekçesi kod gerçeğiyle uyuşuyor |
| YN-05 | Ş0 | ⭐ **Canonical rehber, DONDURULMUŞ belgeyi canonical gösteriyor.** `belge-duzeni-rehberi.md:13` *"Canonical'lar: … iş kuyruğu → `10-yol-haritasi.md`"*; o belge `:4`'te **📸 DONDURULMUŞ (2026-09-21)**. Rehberi okuyan ajan ölü belgeye yönlendiriliyor. | 🟢 | Rehberi okuyan canlı kuyruğa (`00-KUYRUK.md`) yönleniyor |
| YN-06 | Ş4 | **2 belge künyesinde 🔄 YAŞAYAN diyor ama ölü** — `kararlar/konu/08-acik-sorular.md:5` *"canonical açık-karar takibi artık `00-KARAR-TAKIP.md`"* · `raporlar/icerik/kod-kalemleri-2026-09-03.md:8` *"✅ NUMARALANDI — madde 138-160'a işlendi"*. İkisi de devir kanıtını kendi içinde taşıyor. | 🟢 | Okuyan bayat belgeyi güncel sanmıyor |
| YN-07 | Ş0 | **Otonom sözlük çelişkisi — motorun her tur okuduğu üç dosya üç farklı set sayıyor, ikisi "başkası YASAK" diyor.** `OTONOM-PROMPT.txt:80-81` 7 kod (`PR-ACIK` dahil) · `00-KUYRUK.md:53-54` 6 kod (`PR-ACIK` **yok** ama gövdede F-19'da kullanılıyor) · `CLAUDE.md § KURAL 10` 6 tamamen farklı kod. Ayrıca prompt `:148-150` **"AŞAMA K"** sayıyor, kuyrukta `grep -c "AŞAMA K"` = **0**; kuyruktaki `A·B·C·D` promptta yok. | 🟢 | Motor her turda tanımlı kod setiyle çalışıyor; aşama listesi 11 = 11 |
| YN-08 | Ş0 | **Mod etiketi 2 mi 3 mü + şerit sistemi promptta hiç yok.** `CLAUDE.md § MOD ETİKETİ` tablosu **2 mod** (🟥/🟩) ↔ `§ Çalışma Sözleşmesi` **3 mod** (PLAN/BYPASS/**MANUEL-ONAY**, renk yok). `00-KUYRUK.md:58-66` 5 şerit (Ş1-Ş4 + **Ş0**) ↔ `CLAUDE.md` "en fazla 4 şerit" ↔ `OTONOM-PROMPT.txt`'te şerit **hiç geçmiyor**. | 🟢 | Üç dosya aynı mod ve şerit tanımını veriyor |
| YN-09 | Ş0 | **1.000+ karakterlik satırlar AZALMADI, ARTTI** — `00-KARAR-TAKIP.md` 30→**33**, `00-KUYRUK.md` 2→**5**; en uzunu `00-KARAR-TAKIP.md:858` = **4.994 karakter**. Kural (`CLAUDE.md § tarihsel iz satırın İÇİNDE tutulmaz`) ve `## GEÇMİŞ` altyapısı **zaten var**, 3 kalemde uygulanmış, 38'ine uygulanmamış. | 🟢 | Kuyruk ve karar-takip satırları ekranda tek bakışta okunabiliyor |
| YN-10 | Ş0 | **`CLAUDE.md:<satır>` atıfları satır numarasına dayanıyor — bölme bugün numaraları kaydırdı.** Yaşayan belgelerde 15 atıf var; **1'i taşınan bloğa bakıyordu ve zaten yanlıştı** (`00-KUYRUK.md:302` → `:453`). Kalan 14'ü bugün doğru ama her düzenlemede kırılır. 📸 belgelerdeki ~190 atıf **zaten kırık**. | 🟢 | Atıflar taşıma/bölmeden sonra da doğru yere gidiyor |
| YN-11 | Ş4 | **`raporlar/` 91 dosyadan 5'i hiç etiketsiz, 3'ü zayıf etiketli (KURAL 3 ihlali).** En yanıltıcısı `bilanco/bilanco-po-ozet-2026-08-26.md` — **PO'ya hitap eden özet**, 25 gün eski, hiç etiketi yok; ayrıca `:22` "196" diyor, doğrusu 259. `panel/00-INDEX.md` ve `persona/00-INDEX.md` de etiketsiz. | 🟢 | Her rapor "güncel mi dondurulmuş mu" sorusunu kendi başlığında cevaplıyor |
| YN-12 | Ş4 | **İndeks adı 4 ayrı kalıpta yaşıyor** (`00-INDEX.md` · `00-INDEKS.md` · `00-icerik-index.md` · `00-KART-INDEKSI.md`) — kuralın kendi koruma komutu `ls <klasör>/00-IND*` (`rehber:46`) **üçüncüyü yakalamıyor** (önek `00-ic…`). **13 klasörde hiç indeks yok.** | 🟢 | Tek desenle her klasörün giriş noktası bulunuyor |
| YN-14 | Ş0 | **Kalan kural birleştirmeleri ≈4.494 karakter — yeni kural YOK, hiçbir kural kaldırılmadan.** Bölme B.4-1/2/8'i zaten yuttu; kalan B.4-3/4/5/6/7/9/10. En büyüğü **DB/ortam dörtlüsü** — içinde **birebir aynı ~530 karakterlik ÇELİŞKİ paragrafı İKİ KEZ** var. | 🟢 | Aynı kural iki yerde yazmıyor; okuyan tek yerden okuyor |
| YN-15 | Ş0 | **🟡 kapısının üç istisnası `CLAUDE.md`'de yok.** `OTONOM-PROMPT.txt` ve `00-KUYRUK.md:14-19` üç istisnayı (migration/seed · hassas dosya · geri dönülmez canlı dokunuş) sayıyor; `CLAUDE.md:44` yalnız *"riskli/geniş"* diyor. CLAUDE.md'yi tek başına okuyan 🟡'nin sınırını bilemez. | 🟢 | CLAUDE.md tek başına okunduğunda kapı kuralı eksiksiz |

## AŞAMA AN — ANALİZ TURU BULGULARI (2026-09-23)

| # | Şerit | İş | Kapı | Bitti demek |
|---|---|---|---|---|
| AN-01 | Ş1 | **Sertifika "Ceza veya bekleme yok" metnini gerçek kurala uydur** (2 başarısızda 24s bekleme var). | 🟢 | Kullanıcı sertifika ekranında doğru bekleme bilgisini görüyor |
| AN-05 | Ş1 | **Menti "şimdilik" 4 varyantı + eşleşme detay 15/16 kombinasyon metnini yaz.** | 🟢 | Menti belirsiz eşleşmede doğru "şimdilik" metnini görüyor |
| AN-08 | Ş3 | **`Tenant.verifiedBy` yazımı** (doğrulama controller'ında `verifiedBy: adminId`). | 🟢 | Kurum doğrulamasında kim onayladı audit izinde |
| AN-10 | Ş1 | **Terim tutarsızlığı: §5'teki 31 nokta** (mizaç/karakter/kişilik · mentor/mentör · görüşme/toplantı/randevu). | 🟢 | Kullanıcı aynı şeyi her ekranda aynı adla görüyor |
| AN-11 | Ş0 | **Backend bayat yorumlar:** `certification.service.ts:69` ("88 şık"),`:92` ("3 ile") · `onboardingController.ts:206,365` · `isRedLine` ölü parametre. | 🟢 | Yorum/imza kod gerçeğini söylüyor |
| AN-14 | Ş4 | **Belge durum senkronu (K-20 sonu):** KT md.143-165 bayat işaretler + TAS/PSI/bolumler baş-notu bayatlıkları. | 🟢 | Belgeler "güncel mi bayat mı" doğru söylüyor |
| AN-15 | Ş2 | **Menti randevu kartında mentörünün adını görebilsin** (`meetings/page.tsx:31`). | 🟢 | Menti hangi mentörle randevusu olduğunu görüyor |
| AN-16 | Ş3 | **Mentör filtresindeki 4 İngilizce DISC etiketi Türkçeleştirilsin** (`mentor/page.tsx:27-30`). | 🟢 | Menti filtre etiketlerini Türkçe görüyor |
| AN-17 | Ş3 | **DISC arketip kartı (superPower/strengths) panelde/profilde de render edilsin** (BY-4). | 🟢 | Kullanıcı arketip kartını panelde de görüyor |
| AN-23 | Ş4 | **Envanter belgelerinin bayat "yok" iddialarını düzelt** (lastLoginAt/nudge/drill-down artık var). | 🟢 | Belgeler var olan özelliği "yok" demiyor |
| AN-32 | Ş1 | ⭐ **GERÇEK KULLANICI GÖRÜŞME KILAVUZU hazırla:** persona-panel raporundaki 10 sınanmamış varsayımdan geçmiş-davranış soru seti türet; çıktı = PO'nun götürebileceği TEK SAYFA (kaç kişi · hangi roller · soru seti). | 🟢 | PO elinde saha görüşmesine götürülebilir tek-sayfa kılavuz var |
| AN-35 | Ş4 | **STK admin paneli 8 kararını tek tek statüle** (✅/⬜) ve açık olanları kuyruğa bağla. | 🟢 | (iç düzen — açık admin kararları görünür olur) |
| AN-38 | Ş4 | **`reviewedBy` gerçek kimlik** — `platformController.ts:525` sabit `'platform-admin'` düzelt (G4-15). | 🟢 | Rapor incelendi kaydında gerçek yönetici adı görünür |
| AN-39 | Ş4 | **user-reports sayfalama** (`take:200` → limit/offset) (G4-16). | 🟢 | 200'den fazla rapor olan kurumda liste tümüyle gezilir |
| AN-42 | Ş4 | **Bayat belge satırlarını `~~[ESKİ]~~` + ⚠️ GÜNCELLEME ile düzelt** (Ç-01..06,10,18,19). | 🟢 | (iç düzen — belge kod gerçeğiyle örtüşür) |
| AN-43 | Ş4 | **Dondurma notları uygula:** bilanco-po-ozet etiketsiz + ONCELIK damga + 📸 G-kart durum-notu (CS §5). | 🟢 | (iç düzen — kartlar "durum" sanılmaz) |
| AN-44 | Ş4 | **`tasarim-kararlari-admin` ad tarihsizleştir** (Ç-07 KURAL 4) **+ `08-acik-sorular` çift-kaynak çöz** (Ç-09 tek-kaynak). | 🟢 | (iç düzen) |
| AN-47 | Ş0 | ⭐ **Geri bildirim/kalite modelleri ENVANTERİ (keşif).** Dört kopuk model tek tabloya: her biri hangi alanları taşıyor · kim doldurur · ne zaman sorulur · FE karşılığı var mı · veri gerçekten birikiyor mu · hangisi ölü. | 🟢 | (harita çıkar — hangi model canlı, hangisi ölü netleşir) |
| AN-48 | Ş1 | ⭐ **Görüşme sonrası SORU İÇERİĞİNİ gözden geçir** (öneri üret, uygulama değil). "Beğendin mi" tarzı memnuniyet sorusu ZAYIF sinyaldir → DAVRANIŞ ve SONUÇ sorulmalı (hedefe yaklaştın mı · ne değişti · sonraki adımın ne). | 🟢 | (mevcut alanlar davranış/sonuç ölçütüne göre değerlendirilir, öneri çıkar) |
| AN-50 | Ş3 | ⭐ **"eşleştirme" → "yönlendirme" (kullanıcıya GÖRÜNEN metin).** Ekran metinleri · kartlar · e-posta şablonları · sertifika metinleri · landing'de "eşleştirme" gözden geçir; doğrusu "öneri"/"yönlendirme". | 🟢 | Kullanıcı "sistem eşleştirir" değil "yönlendirir/önerir" dilini görüyor |
| AN-51 | Ş4 | **BELGELERDE "eşleştirme" iddiası gözden geçir** (düşük öncelik). "Eşleştirme" iddiası geçen yerlere `~~üstü çizili~~` + "⚠️ DÜZELTME (2026-09-23, PO): sistem eşleştirmez, YÖNLENDİRİR." | 🟢 | (belgeler "eşleştirme" değil "yönlendirme" der) |
| AN-52 | Ş1 | ⭐ **Ürün-içi OTOMATİK geri bildirim soruları** — köşede, ZORUNLU DEĞİL, kapatılabilir; her soru HANGİ varsayımı sınadığını belirtir. Çıktı: soru seti + nereye gömüleceği + veri nasıl birikeceği. | 🟢 | Kullanıcı köşede isteğe bağlı soru görüyor; cevaplarsa veri otomatik birikiyor |
| AN-53 | Ş0 | ⭐ **G1..G11 kartlarındaki TÜM açık kalemleri KODDA doğrula** (önce SAY, ~134 bekleniyor). Her kalem için üç sonuçtan biri: ✅ CANLIDA (kartta işaret düzelt) · ⬜ HÂLÂ AÇIK (dokunma) · ❓ DOĞRULANAMADI (kartta "❓ kod-teyidi yapılamadı" notu). | 🟢 | Kartlar "yapılmamış" sanılan yapılmış işi tekrar açtırmıyor |
| AN-54 | Ş0 | ⭐ **Silme protokolü — gerekçesi bulunamayan alan/kalem TARAMASI.** Şemada ve kodda GEREKÇESİ BULUNAMAYAN başka kalem var mı? Hayalet envanter turu yalnız bir tanesini (`Tenant.verifiedBy`) buldu; tarama o turun kapsamıyla sınırlıydı. | 🟢 | Gerekçesiz kalemler görünür olur (silme değil, liste) |
