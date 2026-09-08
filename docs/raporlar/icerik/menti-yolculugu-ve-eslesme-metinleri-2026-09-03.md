> 📁 Kayda geçirildi: 2026-09-03 · tur: docs/icerik-kaydi-2026-09-03

# Menti Yolculuğu, Eşleşme Detayı ve Ret/Bekleme Metinleri

**Tarih:** 2026-09-03
**Tür:** 📸 DONDURULMUŞ — bu oturumun tam çıktısı
**Kapsam:** 5 menti aşaması · geri bildirim gösterim kuralı · eşleşme detay sayfası · ret ve bekleme metinleri · 2 yeni kalem

---

## 0. BU BELGE NE İÇİN

Önceki belgeler mentör tarafını kapsıyordu. Bu belge **menti tarafını** ve **eşleşme anını** tamamlıyor.

**Kardeş belgeler:**
- `senaryo-bankasi-2026-09-03.md` — 39 karakter senaryosu
- `olcme-mimarisi-2026-09-03.md` — ölçme mimarisi
- `arketip-ve-yaklasim-icerigi-2026-09-03.md` — 8 arketip kartı + #31 yaklaşım metinleri
- `faz6-ogrenme-ve-sertifika-2026-09-03.md` — 8 mentör aşaması + 20 sertifika senaryosu

⚠️ Çelişki olursa daha yeni tarihli kazanır; kod ile çelişirse **kod kazanır** (KURAL 10).

---

## 1. ⭐ MENTİ NEDEN SERTİFİKA ALMIYOR — ve boşluk nasıl kapandı

### Fark edilen boşluk

Sertifika yalnız mentör için. Menti hiçbir hazırlık yapmıyordu, hiçbir rol eğitimi almıyordu.

Ama menti tarafında da öğrenilecek şeyler var: mentörden nasıl yararlanılır, görüşmeye nasıl hazırlanılır, geri bildirim nasıl alınır, ne zaman "anlamadım" denir.

### ✅ KARAR: Menti de yolculuk çözer — 5 aşama, sınavsız

**İlk tasarım (reddedildi):** 4 ekranlık okuma rehberi.
**Gerekçe:** PO kararı — *"oyunlaştırarak olsun, yazı okuma tarzında olmasın, kişi okumadan geçebilir."*

**Kabul edilen:** Mentör yolculuğuyla aynı format — sahne + 3 şık + anında geri bildirim. Puan yok, geçme yok.

### Neden mentör 8, menti 5

| Sebep | Açıklama |
|---|---|
| **Sorumluluk asimetrik** | Mentör başkasının süreci hakkında karar veriyor (sınır, kriz, gizlilik). Yanlış yaptığında bedelini karşı taraf ödüyor. Menti kendi süreci hakkında karar veriyor. |
| **Sertifikaya hazırlık** | Mentörün yolculuğu sınavın öğretim ayağı. Menti sınav vermiyor. |
| ⭐ **Sürtünme (asıl sebep)** | Menti henüz sisteme yatırım yapmamış. 15 senaryo çözdü, 3 soru cevapladı, şimdi mentör arıyor. Araya 8 aşama daha girerse **kaybederiz.** Mentör ise gönüllü olmaya karar vermiş, daha yüksek eşikli kullanıcı. |

⚠️ **Dürüstlük notu:** 5 sayısı kesin değil. Beş temel durumu kapsıyor (ilk görüşme · anlamama · eleştiri · yapmama · uymayan öneri) ve altıncısına ihtiyaç görülmedi. Ama 4 de olabilirdi, 6 da. Kalibrasyonda tamamlama oranına bakılmalı.

### ⭐ Ek kazanç: menti dört mentör tipini yaşayarak tanıyor

Her aşamada farklı bir mentör arketipi var. Bu, #31'in tersten hali — menti eşleştiğinde "Pusula tipi bir mentörle" metnini okuduğunda tanıdık gelecek.

---

## 2. İSİM DEĞİŞKENLERİ (mentör tarafı)

| Değişken | Varsayılan | Arketip |
|---|---|---|
| `{mentor_mimar}` | **Selim** | Mimar |
| `{mentor_ayna}` | **Hatice** | Ayna |
| `{mentor_liman}` | **Yakup** | Liman |
| `{mentor_pusula}` | **Ayşe** | Pusula |

Türk-İslam kültürüne uygun, cinsiyet dağılımı dengeli (2 erkek / 2 kadın).

⚠️ Menti yolculuğunda **menti sensin** — okuyan kişi. Ona isim verilmiyor.

---

## 3. ⭐ MENTİ YOLCULUĞU — 5 AŞAMA

**Format:** sahne + 3 şık + anında geri bildirim. Puan yok, geçme yok.
**Bakış açısı:** okuyan kişi mentidir ("sen").

---

### Aşama 1 — İlk görüşme
*Mentör: Mimar · `{mentor_mimar}`*

> `{mentor_mimar}` ile ilk görüşmen. "Nereden başlayalım?" diye sordu. Aslında aklında birkaç şey var ama hiçbiri net değil — nereden anlatacağını bilmiyorsun.

**Ne yaparsın?**

**A —** "Bilmiyorum, siz nereden başlamak isterseniz" derim.
**B —** Aklıma ilk geleni anlatırım, dağınık da olsa.
**C —** "Üç şey var ama hiçbiri net değil" der, üçünü sıralarım.

> **A →** En kolay yol ama görüşmeyi ona bırakıyorsun. `{mentor_mimar}` yapı kurmayı seven biri — sana bir plan verir ama o plan senin ihtiyacına değil, tahminine göre olur.
>
> **B →** İyi. Dağınık anlatmak sessiz kalmaktan iyidir; mentörün işi zaten dağınığı toparlamak. Ama tek konuda kalırsan diğer ikisi hiç konuşulmaz.
>
> **C →** En işe yarayan. "Net değil" demek zayıflık değil, bilgi. Üçünü sıraladığın anda `{mentor_mimar}` hangisinin acil olduğunu birlikte seçebilir.

---

### Aşama 2 — Anlamadığın an
*Mentör: Ayna · `{mentor_ayna}`*

> `{mentor_ayna}` sana bir soru sordu ve cevabını bekliyor. Soruyu tam anlamadın ama sessizlik uzuyor.

**Ne yaparsın?**

**A —** Anladığım kadarıyla bir şey söylerim, yanlışsa düzeltir.
**B —** "Soruyu tam anlamadım, açar mısın?" derim.
**C —** Düşünüyormuş gibi yaparım, belki toparlarım.

> **A →** Riskli ama kötü değil. Yanlış anladığın ortaya çıkar ve konuşma oradan devam eder. Ama bazen yanlış anlaşılma fark edilmez ve ikiniz farklı şeyleri konuşursunuz.
>
> **B →** Doğrusu. `{mentor_ayna}` soru sormayı seven biri; sorusunun anlaşılmadığını bilmek onun da işine yarar. Bu ilişkiyi kurtaran en basit cümle.
>
> **C →** En yorucu seçenek. Sessizlik büyür, sen gerilirsin, `{mentor_ayna}` ne olduğunu anlamaz. Ve bir sonraki soruda aynı yere düşersin.

---

### Aşama 3 — Eleştiri geldi
*Mentör: Pusula · `{mentor_pusula}`*

> `{mentor_pusula}` yaptığın işe baktı ve "bu haliyle yürümez" dedi. Süslemedi. Sen haftalardır uğraşıyordun.

**İçinden ne geçer, ne yaparsın?**

**A —** Neden yürümeyeceğini sorarım.
**B —** Savunurum, emeğimi anlatırım.
**C —** Kabul ederim, tartışmaya girmem.

> **A →** En işe yarayan. `{mentor_pusula}` doğrudan konuşan biri ve gerekçesi vardır — sorduğunda anlatır. O gerekçeyi öğrenmek, işi düzeltmenin tek yolu.
>
> **B →** Doğal bir tepki ve tamamen anlaşılır. Emek verdiğin bir şey eleştirildiğinde savunmak insani. Ama savunmadan sonra da soruyu sorman gerekecek — sıra değişirse zaman kazanırsın.
>
> **C →** Hızlı görünüyor ama sonra ne yapacağını bilmiyorsun. Kabul etmek anlamak değil. `{mentor_pusula}` netlik seviyor; itiraz etsen de sorun olmaz.

---

### Aşama 4 — Yapmadığın iş
*Mentör: Liman · `{mentor_liman}`*

> Geçen görüşmede `{mentor_liman}`'a bir şey yapacağını söylemiştin. Yapmadın. Görüşme başlıyor.

**Ne yaparsın?**

**A —** Sormazsa açmam.
**B —** Baştan söylerim, yapamadığımı ve nedenini.
**C —** Kısmen yaptığımı söylerim, tamamen yalan değil.

> **A →** `{mentor_liman}` nazik biri, sormayabilir de. Ama sormadığı şey konuşulmaz ve iki görüşme sonra aynı yerdesiniz.
>
> **B →** Doğrusu ve göründüğünden kolay. "Yapamadım" demek başarısızlık değil — engeli konuşmanın tek yolu. Belki iş baştan çok büyüktü, belki zamanı yanlıştı.
>
> **C →** En pahalı seçenek. Küçük bir kaçamak ilişkiyi zehirler; sonraki görüşmelerde de gerçeği söyleyemezsin. Ve `{mentor_liman}` genelde fark eder, sadece söylemez.

---

### Aşama 5 — Uymayan öneri
*Mentör: Mimar · `{mentor_mimar}`*

> `{mentor_mimar}` sana bir yol önerdi. Mantıklı ama sana uymuyor — senin çalışma tarzın değil.

**Ne yaparsın?**

**A —** Denerim, belki yanılıyorumdur.
**B —** "Bu bana uymuyor, başka bir yol var mı?" derim.
**C —** Denemem, kendi yolumdan giderim, söylemem.

> **A →** Kötü değil — bazen kendi tarzın hakkında yanılırsın. Ama denedikten sonra sonucu paylaşman şart, yoksa `{mentor_mimar}` neyin işe yaramadığını öğrenemez.
>
> **B →** En işe yarayan. Mentörlük itaat değil. "Uymuyor" demek, ikinizin birlikte daha iyi bir yol bulmasını sağlar — ve `{mentor_mimar}` seni daha iyi tanır.
>
> **C →** En kötüsü. `{mentor_mimar}` önerisinin denendiğini sanır, sonuçları ona göre yorumlar ve bir sonraki öneri de yanlış zemine oturur.

---

## 4. ⭐ GERİ BİLDİRİM GÖSTERİM KURALI

Hem mentör (8 aşama) hem menti (5 aşama) yolculuğu için geçerli.

### ✅ KARAR: Yalnız seçilen şık gösterilir. Renk yok. Doğru/yanlış işareti yok.

```
[Kişi B'yi seçti]

  → B'nin geri bildirimi görünür

  → [ Diğer seçenekler ne anlama geliyordu? ]  ← kapalı, tıklanabilir
      açtığında üçü de görünür, hiçbiri "doğru/yanlış" işaretli değil
```

### Gerekçe

**Bu bölüm öğretiyor ama aynı zamanda bir örüntü de kaydediyor.** Kişi ilk aşamada "A doğruydu, B yanlıştı" görürse, kalan aşamalarda **doğru cevabı arar** — kendi tepkisini değil, beklenen tepkiyi seçer. Karakter testinde kaçındığımız faking sorununun aynısı.

**Renk daha da beter:** yeşil/kırmızı bir sınav sinyali. "Puan yok, geçme yok" dediğimiz sistemde kişi puanlandığını hisseder.

**Diğer şıklar isteğe bağlı açılır:** merak eden öğrenir, örüntü arayan bulamaz.

### Metinlerdeki yumuşak sıralama korunuyor

Geri bildirimlerde *"En işe yarayan"*, *"Doğrusu"* gibi ifadeler var — yani metin zaten bir yön veriyor.

**Bu bilinçli.** Tamamen kaldırılırsa geri bildirim "üçü de bir bakıma doğru" gibi okunur ve hiçbir şey öğretmez. Yumuşak sıralama öğretimin kendisidir.

Gösterim kuralı bunu güvenli kılıyor: kişi yalnız kendi seçtiğini görüyor, sıralamayı ancak kendi isteğiyle ve seçiminden sonra açıyor.

### Sertifikada tam tersi

| | Öğrenme yolculuğu | Sertifika |
|---|---|---|
| Ne zaman | Anında | Sınav **sonunda** |
| Neyi gösterir | Seçtiğini + isteğe bağlı diğerleri | Doğru cevabı |
| Doğru/yanlış işareti | **Yok** | **Var** |
| Renk | Yok | Yeşil/kırmızı |
| Ek | — | Konu bazlı zayıflık + ilgili yolculuk aşamasına yönlendirme |

⚠️ Sertifikada da geri bildirim **sınav sırasında değil sonunda** — yoksa kişi ilk sorudan kalıbı öğrenir.

---

## 5. ⭐ İKİ YENİ KALEM (gösterim kuralından doğdu)

### Kalem A — Öğrenme yolculuğu cevapları kişilik profilini BESLEMEZ

**Gerekçe:** Geri bildirim yön veriyor. Yön verilen bir seçim saf kişilik sinyali değildir.

Karakter ölçümü 39 senaryodan gelir. Yolculuk **öğretir, ölçmez.**

### Kalem B — `outcome` alanı teyidi (kod kontrolü)

İçerik keşfinde `outcome = öğrenme sinyali` diye bir alan görülmüştü. Bugün nereye gidiyor?

- Sadece tamamlama takibi mi?
- Yoksa kişilik profiline mi işleniyor?

⚠️ Profile işleniyorsa **kesilmeli** (Kalem A gereği).

---

## 6. ⭐ EŞLEŞME DETAY SAYFASI

### Yapı kararı

**Havuz kartında:** isim · fotoğraf · alan · eşleşme yüzdesi. Sade.

**Detaya tıklayınca:** üç bölümlük sayfa.

PO kararı: *"Bu kısım herkesin bir arada olduğu ana kartlarda değil, kişinin üzerine tıkladığında çıksın."*

---

### Bölüm 1 — Neden bu eşleşme

Üç sorunun (S1/S2/S3) verisinden üretilen şablon cümleler.

**Örnek:**

> **Ortak noktalarınız**
> - İkiniz de birlikte düşünmeyi tercih ediyorsunuz
> - İkiniz için de bu süreçte en önemli şey **öğrenmek**
> - Aradığın destek ile verebildiği destek örtüşüyor: **ağ kurma**

**Örtüşmeyen bir şey varsa dürüstçe:**

> **Farklı olduğunuz yer**
> Sen daha planlı ilerlemeyi seviyorsun, o daha esnek çalışıyor. Bu bir sorun değil — ama ilk görüşmede tempo konusunda anlaşmak iyi olur.

⚠️ **GÖRÜNÜRLÜK KURALI:** İhtiyaç beyanı (S1) burada **görünmez.** Yalnız **örtüşme** gösterilir, kimin ne aradığı değil. (PO teyidi: *"Bu kısmı menti görmezse daha sağlıklı olur."*)

⭐ **Araştırma dayanağı:** İlişki kalitesini besleyen şey gerçek benzerlikten çok **algılanan benzerlik.** Bu bölüm arayüz süsü değil, ilişkiyi besleyen bir müdahale.

---

### Bölüm 2 — Birlikte nasıl çalışırsınız

Arketip eşleşmesine göre değişen metin. **4 mentör × 4 menti = 16 kombinasyon.**

**Örnek (Rotacı menti × Ayna mentör):**

> **Sen planlı ilerliyorsun, o soru sormayı seviyor.**
>
> Bu ikili iyi çalışır ama başlangıçta sürtünme olabilir: sen net cevap beklerken o sana soru sorabilir.
>
> **İşe yarayacak:** Planını göster ve "burada takıldım" de. Somut bir noktada soru sorulması, genel soruya göre çok daha verimli.
>
> **Dikkat:** Cevabı hemen alamamak seni yavaşlatıyor gibi hissettirebilir. Genelde tersi olur — kendi bulduğun cevap daha kalıcı çıkar.

⬜ **YAZILMADI:** 16 kombinasyondan yalnız 1'i örnek olarak yazıldı. Kalan 15 ayrı bir oturumluk iş (her biri 60-80 kelime).

Bu, **#31'in en gelişmiş hali** — tek kişiyi tanıtmak yerine **ilişkiyi** tarif ediyor.

---

### Bölüm 3 — İlk görüşmede ne konuşulur

> - Neden bu programa girdiniz, ikiniz de
> - Ne sıklıkta görüşeceksiniz
> - Hangi kanaldan iletişim (ve hangi saatlerde değil)
> - Üç ay sonra ne olmuş olsun

---

## 7. ⭐ GÖRÜŞME SIKLIĞI — kurumsal kısıt

**PO'nun aktardığı mevcut kod davranışı:**

- Menti **istediği kadar** mentöre başvurabilir, mesaj atabilir
- Kısıt yok, dama yok
- Ama fiilen görüşme olması için **iki şart:**
  1. Mentörün onayı
  2. Dernek yöneticisinin belirlediği **haftalık görüşme sıklığı** (ör. haftada 1 veya 2)

Yani menti birden fazla mentöre yazar, kim dönerse onunla başlar; sıklık dolduysa diğeri sonraki haftaya kalır.

**Sonuç:** Bekleme metinlerinde bu bilgi verilmeli — kişi *"neden görüşemiyorum"* diye takılmasın ve *"ikisi de kabul etti, birini kırmam mı gerekiyor"* kaygısına düşmesin.

---

## 8. ⭐ BEKLEME METİNLERİ

Ürünün en kırılgan noktası. Gönüllü tam burada kaybolur.

### Başvurudan hemen sonra

> **Başvurun iletildi.**
>
> Mentörler genelde birkaç gün içinde dönüyor. Bu sürede başka mentörlere de yazabilirsin — birden fazla başvuru normaldir.
>
> Kaç görüşme yapabileceğin kurumunun belirlediği sıklığa bağlı; birden fazla mentör dönerse sırayla ilerleyebilirsin.

*Son cümle kritik: kişi tek cevaba kilitlenmesin ve "birini kırmam mı gerekiyor" kaygısına düşmesin.*

### Üç gün sonra (otomatik)

> **Henüz dönüş olmadı.**
>
> Mentörler gönüllü ve bazen yoğun oluyorlar. İstersen beklemeye devam edebilir, istersen başka bir mentöre de başvurabilirsin.
>
> *[Havuza dön]*

### Yedi gün sonra (otomatik kapanış)

> **Bu başvuru büyük ihtimalle sonuçsuz kalacak.**
>
> Otomatik olarak kapatıyoruz — açık kalması seni bekletmesin.
>
> Havuzda sana uygun **{n} mentör** daha var.
>
> *[Onlara bak]*

⚠️ **İlke:** Bekleme belirsiz kalmasın. Kapanma otomatik olsun ve **kapanışta yeni seçenek gösterilsin.**

---

## 9. ⭐ RET METNİ

Bu metnin tek işi var: **kişisel almasını engellemek.**

> **Bu eşleşme gerçekleşmedi.**
>
> Mentörler genelde kapasite ya da uygunluk nedeniyle dönüş yapamıyor — çoğu zaman aynı anda birkaç mentiyle çalışıyorlar.
>
> Bu senin profilinle ilgili değil.
>
> Sana uygun **{n} mentör** daha var.
>
> *[Havuza dön]*

### Üç tasarım kuralı

1. **Ret sebebi GÖSTERİLMEZ.** Mentör "uygun bulmadım" yazsa bile menti görmemeli — o cümle kişide kalır.
2. **"Üzgünüz" YOK.** Özür, olayı büyütür.
3. **Alternatif hemen gösterilir.** Kapı kapanırken başka kapı açılmalı, aynı ekranda.

### Mentöre — reddederken gösterilecek

> Reddetmek normaldir. Kapasiten yoksa ya da uygun hissetmiyorsan, kabul edip yarım bırakmaktan iyidir.
>
> Sebebini yazman gerekmez.

*Gerekçe: suçlu hisseden mentör kabul eder, sonra yarım bırakır. O daha kötü.*

---

## 10. SAYIM

| | Sayı |
|---|---|
| Menti yolculuğu aşaması | 5 |
| Menti yolculuğu şıkkı | 15 (5 × 3) |
| Menti yolculuğu geri bildirimi | 15 |
| Mentör isim değişkeni | 4 |
| Eşleşme detay bölümü | 3 |
| Eşleşme kombinasyon metni | 16 (**1 yazıldı, 15 eksik**) |
| Bekleme metni | 3 |
| Ret metni | 2 (menti + mentör) |

⚠️ Bu sayım strateji beyanıdır. Kayıt turunda ajan **tek tek doğrulasın** (KURAL 16).

---

## 11. KOD KALEMLERİ (bu belgeden doğan)

1. **Menti yolculuğu** — 5 aşama, mentör yolculuğuyla aynı altyapı
2. **Mentör isim değişkenleri** — `{mentor_mimar}` vb., tenant bazında özelleştirilebilir
3. **Geri bildirim gösterimi** — yalnız seçilen şık; diğerleri kapalı/açılabilir; renk yok
4. ⭐ **Öğrenme cevapları profile İŞLENMESİN** — Kalem A
5. ⭐ **`outcome` alanı teyidi** — bugün nereye gidiyor, kodda kontrol — Kalem B
6. **Eşleşme detay sayfası** — 3 bölüm, arketip kombinasyonuna göre metin seçimi
7. **Örtüşme cümlesi üretimi** — S1/S2/S3 verisinden şablon; ⚠️ S1 içeriği gösterilmez, yalnız örtüşme
8. **Bekleme zamanlayıcısı** — 3. gün hatırlatma, 7. gün otomatik kapanış + alternatif gösterimi
9. **Ret akışı** — sebep gizli, alternatif aynı ekranda
10. **Görüşme sıklığı bilgisi** — profilde ve bekleme metninde görünsün

⚠️ Numaralar PO tarafından `00-KARAR-TAKIP`'te verilecek.

---

## 12. AÇIK KALEMLER

| # | Kalem | Not |
|---|---|---|
| 1 | **16 kombinasyon metni** | 1 yazıldı, 15 eksik. Ayrı oturum |
| 2 | Menti yolculuğu 5 aşama yeterli mi | Tamamlama oranıyla kalibre edilecek |
| 3 | Öğrenme yolculuğu sertifika için zorunlu mu | Karar verilmedi (Faz 6 belgesinden devreden) |
| 4 | `{n} mentör daha var` sayısı | Sıfırsa metin ne olacak? Havuz boşsa farklı mesaj gerekir |
| 5 | Menti yolculuğu ne zaman gösterilir | Eşleşme öncesi mi, ilk eşleşmeden hemen sonra mı? |

---

## 13. DÜRÜSTLÜK SINIRLARI

- **Hiçbir metin gerçek kullanıcıya test edilmedi.** İki kişi yazdı, iki kişi eleştirdi.
- **5 aşama sayısı muhakemedir.** 4 de olabilirdi, 6 da. Tamamlama oranıyla sınanacak.
- **Ret metninin işe yarayıp yaramadığı ölçülmeli.** Ret alan kişi havuza dönüyor mu, yoksa sistemi terk mi ediyor? Bu, kalibrasyonun en önemli metriklerinden biri.
- **Görüşme sıklığı davranışı PO beyanıdır**, kodda teyit edilmedi.
