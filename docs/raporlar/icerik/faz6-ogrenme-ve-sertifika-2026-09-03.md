> 📁 Kayda geçirildi: 2026-09-03 · tur: docs/icerik-kaydi-2026-09-03

# Faz 6 — Öğrenme Yolculuğu ve Sertifika İçeriği

**Tarih:** 2026-09-03
**Tür:** 📸 DONDURULMUŞ — bu oturumun tam çıktısı
**Kapsam:** 8 öğrenme aşaması · 20 sertifika senaryosu · havuz mantığı · isim değişkenleri · yapısal kararlar

---

## 0. BU BELGE NE İÇİN

Faz 6, değerlendirme sisteminin **öğretim ve yetkinlik** ayağıdır. Karakter testi kişiyi ölçer; bu iki sistem mentörlüğü öğretir ve sınar.

**Kardeş belgeler:**
- `senaryo-bankasi-2026-09-03.md` — 39 karakter senaryosu · ⬜ HENÜZ YAZILMADI — ⚠️ Bu belge henüz kaydedilmedi (2026-09-03)
- `olcme-mimarisi-2026-09-03.md` — ölçme mimarisi · ⬜ HENÜZ YAZILMADI — ⚠️ Bu belge henüz kaydedilmedi (2026-09-03)
- `arketip-ve-yaklasim-icerigi-2026-09-03.md` — 8 arketip kartı + #31 yaklaşım metinleri · ✅ bu klasörde
- `senaryo-denetim-protokolu.md` — denetim protokolü v2 · ⬜ HENÜZ YAZILMADI — ⚠️ Bu belge henüz kaydedilmedi (2026-09-03)

⚠️ Çelişki olursa daha yeni tarihli kazanır; kod ile çelişirse **kod kazanır** (KURAL 10).

---

## 1. İKİ SİSTEMİN AYRIMI

| | Öğrenme yolculuğu | Sertifika |
|---|---|---|
| **Amaç** | Öğretmek | Sınamak |
| **Puan** | Yok | Var, eşikli |
| **Geri bildirim** | Anında, her şıkta | Sınav sonunda, konu bazlı |
| **Hata** | Ucuz, öğretici | Sonuç doğurur |
| **Havuz** | Yok, 8 aşama sabit | Var, 20'den 8 çekilir |
| **Şık sayısı** | 3 | 4 |
| **Geçme/kalma** | Yok | Var |

---

## 2. ⭐ KOPYA SORUNUNUN ÇÖZÜMÜ

### Sorun

Eski yapıda 7 mentör aşamasının 6'sı sertifika senaryolarıyla neredeyse aynı durumu anlatıyordu (kriz, gece mesajları, kırılgan menti, tükenmişlik, sınav dönemi, cevabı buldurma). Yolculuğu bitiren sınavı ezberden geçiyordu.

### PO'nun felsefesiyle çelişki — ve çözümü

PO kararı: *"Ezber sorun değil, iyi bir şey — kişi ne yapması gerektiğini öğrenmiş olur."*

Bu çelişki değil, ayrım gerektiriyor:

- **Prensibin ezberlenmesi iyi.** "Gizlilik mutlaktır" ezberlenmeli.
- **Sahnenin ezberlenmesi kötü.** Kişi "gece mesajı senaryosunda C şıkkı doğru" diye hatırlıyorsa prensibi değil şıkkı öğrenmiştir.

### ✅ KARAR: Aynı prensip, farklı yüzey

Öğrenme yolculuğu bir prensibi **bir sahneyle** öğretir; sertifika **aynı prensibi başka sahneyle** sınar.

**Eşleme tablosu:**

| Prensip | Öğrenme sahnesi | Sertifika sahnesi |
|---|---|---|
| Sınır | Gece mesajları | Arkadaşlık talebi / kişisel yardım |
| Geri bildirim | Kırılgan mentiye kusur | Kendinden emin mentiye kusur |
| Gizlilik | (öğrenmede yok) | Kurum yöneticisi / meslektaş |
| Kriz | Menti ağlıyor | Menti kayboldu / endişe veren ifade |
| Cevabı buldurmak | Karar aşamasındaki menti | Doğrudan cevap isteği |

Sıfırdan yazım gerekmedi — sertifikada zaten ikinci varyantlar vardı, yeniden dağıtıldı.

---

## 3. ⭐ MENTİ PERSONASI ÇEŞİTLENDİRME

### Sorun

Eski yapıda 13 aşamanın hepsinde menti aynıydı: kırılgan, gergin, ağlamaklı, tükenmiş — ve hep aynı isim.

İki sonucu vardı:
- **Gerçekçi değil.** Menti bazen fazla iddialıdır, bazen mesafelidir, bazen mentörden çok şey bilir.
- **Tek tip mentör yetiştiriyor.** Mentör sadece "kırılganı taşımayı" öğreniyor. Oysa en zor anlar başka türden: dinlemeyen menti, dağılan menti, başlayamayan menti.

### ✅ KARAR: Dört menti tipi, arketiplerle hizalı

| Tip | Zorluğu | Aşamalar |
|---|---|---|
| **Denge Arayan** | Başlayamıyor, hazır hissetmiyor | 1, 7 |
| **Rotacı** | Plana aşırı bağlı, esneyemiyor | 2, 8 |
| **İz Açan** | Dinlemiyor, kendi bildiğini okuyor | 3, 6 |
| **Kâşif** | Dağılıyor, bitirmiyor | 4, 5 |

Her tip iki kez, farklı zorlukla.

**Üç şeyi birden çözüyor:**
1. Persona çeşitleniyor
2. Mentör farklı zorluklara hazırlanıyor
3. ⭐ **Öğrenme yolculuğu #31 içeriğinin canlı hali oluyor** — kişi "İz Açan bir mentiyle nasıl çalışılır" metnini okuyor, sonra yolculukta o mentiyle karşılaşıyor

---

## 4. ⭐ İSİM DEĞİŞKENLERİ

### Karar

İsimler metne **gömülü yazılmaz, değişken olarak yazılır.** Bugün varsayılan konur, yarın kurum değiştirebilir.

**Öğrenme yolculuğu:**

| Değişken | Varsayılan | Menti tipi |
|---|---|---|
| `{menti_denge}` | **Nur** | Denge Arayan |
| `{menti_rotaci}` | **Emin** | Rotacı |
| `{menti_izacan}` | **Kerem** | İz Açan |
| `{menti_kasif}` | **Sena** | Kâşif |

**Sertifika:**

| Değişken | Varsayılan |
|---|---|
| `{sert_1}` | **İhsan** |
| `{sert_2}` | **Elif** |
| `{sert_3}` | **Yusuf** |
| `{sert_4}` | **Zehra** |
| `{sert_5}` | **Salih** |
| `{sert_6}` | **Rabia** |

18 farklı isim yerine 6 isim döngüsel kullanılır — çok isim kişiyi yorar, hiçbiri akılda kalmaz.

### Gerekçe: unisex ısrarından vazgeçildi

Eski karar "isimler unisex olsun" idi. Sebebi: *"Zeynep hep kırılgan kadın menti"* sorunu.

Ama o sorunu çözen şey unisex isim değil, **persona çeşitliliği** (§3). Dört farklı menti tipi zaten çözüyor.

Ayrıca tam unisex + Türk-İslam kültürü kesişimi dar (Nur, İhsan, Ümit dışında çoğu net cinsiyetli).

**Yeni ilke:** Türk-İslam kültürüne uygun isimler, **cinsiyet dağılımı dengeli** (3 erkek / 3 kadın sertifikada, 2/2 öğrenmede). Temsil sorunu böyle çözülüyor, isim nötrlüğüyle değil.

### Geçmiş kayıtlara etkisi: yok

PO teyidi: *"Sonradan ismini değiştirmek istediğimizde testi geçenler için ekstra bir şey yapmaya gerek yok."*

Kişinin cevabı hangi tipe/konuya verildiyse o kayıtlı; isim yalnız gösterim katmanında. Kurum ismi değiştirdiğinde eski cevaplar aynen geçerli.

---

## 5. ⭐ HAVUZ MANTIĞI

### Öğrenme yolculuğunda havuz YOK

Geçme/kalma yok, ölçüm yok. 8 aşama sabit, herkes aynısını görür. Aynı sahneyi tekrar görmek zararsız, hatta faydalı.

### Sertifikada havuz VAR

**Yapı:** 10 konu × 2 varyant = 20 senaryo

**Her sınavda 8 senaryo çekilir:**
- 4 **kritik konudan** birer tane **garantili**: geri bildirim · sınır · gizlilik · kriz
- Kalan 4'ü diğer 6 konudan rastgele

**Neden kritik konular garantili:** Bunlar mentörlüğün zarar verebileceği alanlar. Şansa bırakılamaz.

### Tekrar denemede ne değişir

**Soru aynı, şık farklı DEĞİL. Sahne değişir.**

Kişi "sınır" konusunda takıldıysa, ikinci denemede **aynı konunun diğer varyantı** gelir — farklı sahne, aynı prensip. Gece mesajı yerine arkadaşlık talebi.

Şık sırası zaten her gösterimde rastgele (global kural). Şıkların *içeriğini* değiştirmek yeni senaryo yazmak demektir ve prensip aynıysa gereksizdir.

### ⭐ Hatalı-konu hedefleme (bugün YOK, eklenecek)

Yanlış yapılan konu ikinci denemede **mutlaka gelir**; doğru yapılan konu gelmeyebilir.

### Deneme hakkı

Günde 2 deneme, üçüncüsü için bekleme süresi. Bekleme süresince kişi öğrenme yolculuğuna yönlendirilir.

⚠️ **SINIR:** 2 varyant, üçüncü denemede tükenir — kişi aynı sahneyi ikinci kez görür. Varyantların 3-4'e çıkması gerekiyor. Sonraki iş; şimdi 2 ile başlanıyor.

---

## 6. ⭐ ŞIK SAYISI: neden öğrenmede 3, sertifikada 4

Karakter testinde 4'ten 3'e inilmişti. Burada ayrım farklı:

**Karakter testi ve öğrenme yolculuğu — 3 şık**
Doğru cevap yok (öğrenmede "daha iyi" var ama eleme yok). Üç farklı yaklaşım yeter; dördüncü şık ölü kalıyor, kimse seçmiyor.

**Sertifika — 4 şık**
1. **Rastgele tutturma:** 3 şıkta kişi hiçbir şey bilmeden %33, 4 şıkta %25 ihtimalle doğruyu bulur. 8 soruluk sınavda bu fark tesadüfen geçme olasılığını ciddi düşürür.
2. **Dördüncü şık ölü değil:** genelde "en yaygın hata"yı temsil eder ve öğretici değeri vardır. Örnek: gizlilik senaryosundaki *"hiçbir şey söylemem, gizlilik mutlaktır"* — yanlış ama makul görünen bir aşırılık.

**Kural:** ölçüm testinde 3, sınavda 4.

---

## 7. ÖĞRENME YOLCULUĞU — 8 AŞAMA

**Format:** sahne + 3 şık + anında geri bildirim (her şık için ayrı).
**Puan yok, geçme yok.** Mentör isimsiz ("sen").

---

### Aşama 1 — İlk görüşme
*Menti tipi: Denge Arayan · `{menti_denge}`*

> `{menti_denge}` ile ilk görüşmeniz. On dakikadır konuşuyorsunuz ama `{menti_denge}` kısa cevaplar veriyor, gözü ekranda değil. "Ne konuşmak istersin?" diye sordun, "bilmiyorum, siz nasıl isterseniz" dedi.

**Ne yaparsın?**

**A —** Kendi hikâyemi anlatırım, önce ben açılırım.
**B —** Konuyu somutlaştırırım: "Bu ay seni en çok ne zorladı?"
**C —** İlk görüşme böyle olur derim, gelecek sefere bırakırım.

> **A →** İyi bir refleks. Karşındaki açılmıyorsa önce sen açılmak güven kurar. Ama dikkat: hikâyen uzun olursa `{menti_denge}` dinleyici konumunda kalır ve bu ilk görüşmede alışkanlık olur.
>
> **B →** En işe yarayan yol. "Ne konuşmak istersin" soyut bir soru ve hazır olmayan biri cevaplayamaz. Somut ve küçük bir soru kapı açar.
>
> **C →** Anlaşılır ama fırsat kaçıyor. Denge Arayan biri kendiliğinden açılmaz; ikinci görüşmede de aynı yerde olursunuz. Sessizlik geçmesini beklemek yerine yön vermek gerekir.

---

### Aşama 2 — Cevabı buldurmak
*Menti tipi: Rotacı · `{menti_rotaci}`*

> `{menti_rotaci}` bir karar aşamasında ve sana soruyor: "Sizce hangisini seçmeliyim?" Sen cevabı biliyorsun — birinci seçenek açıkça daha mantıklı. `{menti_rotaci}` da zaten ikisini de listelemiş, artılarını yazmış.

**Ne yaparsın?**

**A —** Birincisi derim, gerekçesini de anlatırım.
**B —** "Sen hangisine daha yakınsın?" diye sorarım.
**C —** İkisinin de risklerini sorarım, listesini birlikte gözden geçiririz.

> **A →** Hızlı ve net. Ama `{menti_rotaci}` zaten listeyi yapmış — yani düşünmüş. Cevabı vermek bu emeği boşa çıkarır ve bir dahaki kararda yine sana sorar.
>
> **B →** İyi soru ama Rotacı biri için erken. O zaten tarafını seçemediği için sana geldi; aynı soruyu geri vermek çıkmaz olabilir.
>
> **C →** En güçlüsü. `{menti_rotaci}`'in kendi çalışmasını merkeze alıyor, eksik olan tarafı (riskler) tamamlıyorsun. Karar yine ona ait oluyor ama artık daha iyi bir zeminde.

---

### Aşama 3 — Zor geri bildirim
*Menti tipi: İz Açan · `{menti_izacan}`*

> `{menti_izacan}` bir fikrini büyük bir heyecanla anlattı. İyi yanları var ama temel bir sorun görüyorsun — bu haliyle yürümez. `{menti_izacan}` zaten başlamış, ilk adımları atmış.

**Ne yaparsın?**

**A —** İyi taraflarını söyler, sorunu şimdilik açmam.
**B —** Sorunu doğrudan söylerim, erken bilmesi daha iyi.
**C —** "Şu noktada ne olacağını düşündün mü?" diye sorarım.

> **A →** `{menti_izacan}` iyi hisseder ama iki hafta sonra duvara toslar. O zaman sana "neden söylemedin" diye sorma hakkı doğar. Nazik olmak, koruyor olmak değil.
>
> **B →** Doğru içerik, riskli zamanlama. İz Açan biri kendi yolunu çizmeyi sever; doğrudan itiraz savunmaya geçirebilir. Söylemek şart ama nasıl söylediğin belirleyici.
>
> **C →** En işe yarayan. Sorunu sen söylemek yerine `{menti_izacan}`'in görmesini sağlıyorsun. Kendi bulduğu kusuru savunmaz, düzeltir.

---

### Aşama 4 — Sınır koyma
*Menti tipi: Kâşif · `{menti_kasif}`*

> `{menti_kasif}` gece yarısı mesaj attı, üçüncü kez bu hafta. Konular acil değil — aklına gelen fikirler. Sen o saatte müsait değilsin ama mesajlar birikiyor.

**Ne yaparsın?**

**A —** Sabah cevaplarım, bir şey söylemem.
**B —** "Gece mesajlarına sabah dönerim" derim, sebebini de söylerim.
**C —** O an kısa bir cevap veririm, sonra konuşuruz.

> **A →** Sürdürülebilir değil. Sınır konuşulmadığında `{menti_kasif}` onu bilmez ve sen yorulursun. Yorulan mentör ilişkiyi bitirir.
>
> **B →** Doğru olan. Sınır koymak reddetmek değil — `{menti_kasif}` ne bekleyeceğini bilir ve bu ikinizi de rahatlatır. Sebebini söylemek "sana kızgın değilim" mesajı taşır.
>
> **C →** İyi niyetli ama sınırı bulanıklaştırır. "Bazen cevap veriyor" mesajı, gece mesajlarının devam etmesine yol açar.

---

### Aşama 5 — Odak dağılması
*Menti tipi: Kâşif · `{menti_kasif}`*

> `{menti_kasif}` üç görüşmedir farklı bir konu getiriyor. Her biri ilginç, her birinde heyecanlı — ama hiçbiri ilerlemiyor. Geçen ay konuştuğunuz iş yarım kalmış.

**Ne yaparsın?**

**A —** Yeni konuyu da konuşurum, merakını kesmek istemem.
**B —** "Şu ana kadar hangisini sonuna kadar götürdün?" diye sorarım.
**C —** Bir konu seçmesini isterim, o bitene kadar başkasına geçmeyelim.

> **A →** `{menti_kasif}` iyi hisseder ama üç ay sonra elinde bir şey olmaz. Merak değerli, ama sadece merak bir yere varmaz.
>
> **B →** En güçlüsü. Soru suçlamıyor ama örüntüyü görünür kılıyor. `{menti_kasif}` kendi cevabını duyduğunda fark eder.
>
> **C →** Doğru yön ama sert. Kâşif biri için "başkasına geçme" yasağı bunaltıcı gelir ve ilişkiden kaçmasına yol açabilir. Sınır koymak yerine bağlamak daha iyi işler.

---

### Aşama 6 — Dinlenmeyen mentör
*Menti tipi: İz Açan · `{menti_izacan}`*

> Üç görüşmedir önerdiğin şeyleri `{menti_izacan}` denemiyor. Kendi yolunda ilerliyor ve bazı şeyler yürüyor da. Ama tekrarlanan bir hata var ve sen üç kez söyledin.

**Ne yaparsın?**

**A —** Bırakırım, kendi yolunu bulsun.
**B —** "Önerilerimi denemiyorsun, bunu konuşalım mı?" derim.
**C —** Önerdiğim şeyi bir kez de somut örnekle gösteririm.

> **A →** Özerkliğe saygı gibi görünüyor ama fiilen vazgeçmek. `{menti_izacan}` aynı hatayı tekrarlamaya devam eder ve mentörlük bir işlev görmez.
>
> **B →** Zor ama doğru. Konuşulmayan şey birikir. Bunu suçlama olarak değil merak olarak sorarsan ("neden işe yaramıyor sence?") kapı açılır.
>
> **C →** İyi bir ara adım. Belki öneri soyut kaldığı için denenmedi. Ama bu üçüncü kez de işe yaramazsa, asıl konuşma B'dekidir.

---

### Aşama 7 — Kriz anı
*Menti tipi: Denge Arayan · `{menti_denge}`*

> Görüşme sırasında `{menti_denge}` sustu. Sonra "aslında son zamanlarda hiçbir şeye enerjim yok, sabah kalkmakta zorlanıyorum" dedi. Sesi titriyor.

**Ne yaparsın?**

**A —** Dinlerim, ne olduğunu anlatmasını isterim.
**B —** Bunun mentörlük konusu olmadığını, destek alması gerektiğini söylerim.
**C —** Dinlerim, sonra profesyonel destekten bahsederim.

> **A →** Doğru başlangıç ama yetersiz. Dinlemek şart — ama sen terapist değilsin ve bu tabloyu tek başına taşıyamazsın.
>
> **B →** Doğru bilgi, yanlış zaman. `{menti_denge}` az önce zor bir şey paylaştı; hemen yönlendirilmek reddedilmek gibi gelir ve bir daha açılmaz.
>
> **C →** Doğrusu. Önce insanı karşıla, sonra sınırı söyle. "Bunu paylaştığın için teşekkür ederim, ciddi görünüyor — bu konuda destek alman iyi olur" cümlesi hem sıcak hem dürüst.

⚠️ **Not (metinde gösterilecek):** Kendine zarar verme ifadesi geçerse mentörlük durur, kurum yöneticisine bildirilir. Bu bir gizlilik ihlali değil, sorumluluktur.

---

### Aşama 8 — Tıkanma ve yeniden başlama
*Menti tipi: Rotacı · `{menti_rotaci}`*

> `{menti_rotaci}` iki görüşmedir aynı yerde. Planı yapmış ama uygulamamış. "Bu hafta da olmadı" diyor, mahcup görünüyor.

**Ne yaparsın?**

**A —** Planı küçültürüz, tek bir adıma indiririz.
**B —** Neden olmadığını sorarım, engeli birlikte bulmaya çalışırım.
**C —** Bir süre ara vermeyi öneririm, belki zamanı değil.

> **A →** Pratik ve etkili. Rotacı biri planı yapar ama plan büyükse başlayamaz. Tek adım, ivme yaratır.
>
> **B →** En güçlüsü — ama A'dan sonra gelmeli. Engeli bilmeden küçültmek yanlış yeri küçültebilir. `{menti_rotaci}` "vakit bulamadım" diyorsa sorun plan değil öncelik olabilir.
>
> **C →** Bazen doğru ama erken. İki görüşme tıkanma için az; ara vermek `{menti_rotaci}`'e "başaramadım" mesajı verir. Önce engeli anlamak gerekir.

---

## 8. SERTİFİKA — 20 SENARYO

**Format:** sahne + 4 şık. Doğru cevap var. Geri bildirim sınav sonunda, konu bazlı.

---

### 🔴 KRİTİK KONU 1 — Geri bildirim

#### 1A · Kendinden emin mentiye kusur

> `{sert_1}` bir çalışmasını gösterdi ve açıkça gurur duyuyor. "Bence bu iş tamam" dedi. Sen ciddi bir eksik görüyorsun.

- Tamam derim, kendi fark etsin
- "Şurası bana eksik göründü, sen ne dersin?" derim
- Doğrudan eksiği söylerim, süslemem
- Başka birinden görüş almasını öneririm

✅ **İkinci.** Eksiği kapı aralayarak söylemek hem dürüst hem savunmaya geçirmiyor. Birincisi kaçış, üçüncüsü gurur duyan biri için sert, dördüncüsü sorumluluğu devretmek.

#### 1B · Emeğe rağmen yürümeyen iş

> `{sert_2}` haftalardır bir işin üzerinde çalışıyor. Emeği açık ama yaklaşım baştan yanlış — devam ederse boşa gidecek.

- Emeğini takdir eder, devam etmesini söylerim
- Yaklaşımın sorunlu olduğunu söyler, nedenini açıklarım
- Küçük düzeltmeler öneririm, temel soruna girmem
- Ne kadar daha devam etmeyi düşündüğünü sorarım

✅ **İkinci.** Emek ne kadar büyükse gerçeği söylemek o kadar zorlaşır — ve o kadar gereklidir. Geciktirmek zararı büyütür.

---

### 🔴 KRİTİK KONU 2 — Sınır

#### 2A · Arkadaşlık talebi

> `{sert_3}` sosyal medyadan arkadaşlık isteği gönderdi ve mesaj attı: "Buradan da konuşabiliriz, daha rahat olur."

- Kabul ederim, samimiyet ilişkiye iyi gelir
- Kabul etmem, görüşmelerimizin kanalı belli
- Kabul ederim ama mentörlük konularını orada konuşmam
- Kurum yöneticisine sorarım

✅ **İkinci.** Mentörlük ilişkisinin sınırı korunmalı. Bu reddetmek değil — kanalın belirli olması iki tarafı da korur. Üçüncüsü kulağa makul gelir ama sınır bulanıklaşır.

#### 2B · Kişisel yardım talebi

> `{sert_4}` mentörlükle ilgisi olmayan bir konuda yardım istedi — taşınmasında araç lazımmış.

- Yardım ederim, insani bir şey
- Yapamayacağımı söylerim, ilişkimizin çerçevesi farklı
- Bir kere yaparım ama tekrarlanmasın derim
- Kurum yöneticisine yönlendiririm

✅ **İkinci.** Reddetmek soğukluk değil netlik. Mentörlük ilişkisi kişisel yardımlaşmaya dönüşürse rolü kaybolur ve geri dönmek zorlaşır.

---

### 🔴 KRİTİK KONU 3 — Gizlilik

#### 3A · Kurum yöneticisi soruyor

> Kurum yöneticisi seni aradı: "`{sert_5}` nasıl gidiyor? Aile durumuyla ilgili bir şey anlattı mı?"

- Anlatırım, kurum yöneticisi bilmeli
- Genel olarak "iyi gidiyor" derim, ayrıntı vermem
- Hiçbir şey söylemem, gizlilik mutlaktır
- Menti'ye sorup izin alırım, sonra karar veririm

✅ **İkinci.** Sürecin gidişatı paylaşılabilir, içeriği paylaşılamaz. Üçüncüsü fazla katı — kurumun programın işleyip işlemediğini bilme hakkı var. Dördüncüsü iyi niyetli ama mentiyi zor durumda bırakır.

#### 3B · Başka mentörle konuşma

> Bir mentör arkadaşın kendi mentisiyle ilgili zorlandığını anlattı ve sordu: "Seninki nasıl, benzer bir şey yaşıyor musun?"

- Benzer durumu anlatırım, meslektaşız
- İsim vermeden genel olarak konuşurum
- Kendi mentimden hiç bahsetmem
- Kurum yöneticisi üzerinden görüşürüz

✅ **Üçüncü.** İkincisi tuzak: küçük bir grupta "isim vermemek" kimseyi gizlemez. Mentörler arası destek meşrudur ama kendi vakan üzerinden değil — kurumun sağladığı süpervizyon kanalıyla.

---

### 🔴 KRİTİK KONU 4 — Kriz

#### 4A · Menti kayboldu

> `{sert_6}` üç görüşmedir gelmiyor, mesajlara da dönmüyor. Son görüşmede zorlandığını söylemişti.

- Beklerim, hazır olunca döner
- Bir kez daha yazarım, sonra kurum yöneticisine bildiririm
- Sürekli yazarım, bırakmam
- Doğrudan kurum yöneticisine bildiririm

✅ **İkinci.** Zorlandığını söylemiş biri kaybolduğunda beklemek risklidir. Ama önce kapıyı bir kez daha çalmak, sonra bildirmek — hem saygılı hem sorumlu.

#### 4B · Endişe veren ifade

> `{sert_1}` görüşme sırasında "artık hiçbir şeyin anlamı yok, bazen yok olsam daha iyi diye düşünüyorum" dedi.

- Dinlerim, konuşmak iyi gelir
- Dinlerim, sonra profesyonel destek öneririm ve kurum yöneticisine bildiririm
- Konuyu değiştiririm, üzerine gitmem
- Ailesine haber veririm

✅ **İkinci.** Bu ifade mentörlüğün sınırının aşıldığı andır. Dinlemek şart ama tek başına yetmez. Bildirim gizlilik ihlali değil, sorumluluktur.

⚠️ Bu, mentörün **hiçbir koşulda tek başına taşımaması gereken** tek durumdur.

---

### KONU 5 — Cevabı buldurmak

#### 5A · Doğrudan cevap isteği

> `{sert_2}` "Siz olsanız ne yapardınız?" diye sordu. Sen ne yapacağını biliyorsun.

- Ne yapacağımı söylerim, tecrübem bu
- "Sen ne yapmayı düşünüyorsun?" diye sorarım
- İki seçenek sunarım, seçmesini isterim
- Cevap vermem, kendi bulması gerekir

✅ **Üçüncü.** İkincisi iyi ama kişi zaten tıkandığı için sormuş olabilir. Dördüncüsü kaçış. Seçenek sunmak hem yön veriyor hem kararı ona bırakıyor.

#### 5B · Yanlış yolda ısrar

> `{sert_3}` bir yaklaşımı savunuyor, sen yürümeyeceğini biliyorsun. Ama denemesine izin verirsen zaman kaybedecek.

- Denemesine izin veririm, deneyerek öğrenir
- Yürümeyeceğini söylerim, gerekçesini anlatırım
- "Yürümezse ne yaparsın?" diye sorarım
- Küçük ölçekte denemesini öneririm

✅ **Dördüncü.** Deneyerek öğrenmek değerli ama maliyet küçük olmalı. Küçük ölçekli deneme hem özerkliği hem zamanı korur.

---

### KONU 6 — Beklenti yönetimi

#### 6A · Gerçekçi olmayan hedef

> `{sert_4}` üç ayda ulaşması imkânsız bir hedef koydu ve çok heyecanlı.

- Heyecanını kırmam, yolda anlar
- Hedefin büyük olduğunu söyler, küçültmeyi öneririm
- Üç ayda nereye varılabileceğini birlikte hesaplarız
- Denemesini söylerim, başarısızlık da öğretir

✅ **Üçüncü.** Hedefi sen küçültürsen sahiplenmez. Birlikte hesaplamak gerçeği kendi görmesini sağlar.

#### 6B · Mentörden fazla beklenti

> `{sert_5}` senden iş bulmanı, tanıdıklarına ulaştırmanı bekliyor. Mentörlüğü bir kapı gibi görüyor.

- Elimden geleni yaparım, yardım etmek isterim
- Mentörlüğün ne olduğunu yeniden konuşuruz
- Tanıştırırım ama ötesine karışmam
- Kurum yöneticisine bildiririm

✅ **İkinci.** Beklenti uyuşmazlığı erken konuşulmazsa ilişki hayal kırıklığıyla biter. Ağ kurmak mentörlüğün parçası olabilir ama "iş bulma" vaadi değildir.

---

### KONU 7 — Kültürel ve kişisel farklılık

#### 7A · Farklı dünya görüşü

> `{sert_6}` senin katılmadığın bir görüşü savunuyor. Konu mentörlük hedefiyle doğrudan ilgili değil ama sohbette çıkıyor.

- Kendi görüşümü açıkça söylerim
- Konuyu mentörlük hedefine çeviririm
- Görüşünü sorarım, anlamaya çalışırım
- Hiç girmem, sessiz kalırım

✅ **İkinci.** Üçüncüsü de iyi ama zaman mentörlük için ayrılmış. Mentör görüş değiştirmeye çalışan biri değildir; ne katılır ne karşı çıkar, işe döner.

#### 7B · Yaş ve tecrübe farkı

> `{sert_1}` senden yaşça büyük ve bazı alanlarda daha tecrübeli. Mentörlük rolünü kurmakta zorlanıyorsun.

- Rolü netleştiririm, mentör benim
- Karşılıklı öğrenme olduğunu söyler, çerçeveyi belirlerim
- Tecrübesine saygı gösterir, sadece dinlerim
- Kurum yöneticisinden eşleşmeyi değiştirmesini isterim

✅ **İkinci.** Mentörlük üstünlük değil, belirli bir konuda destek. Bunu açıkça söylemek hem rolü kurar hem karşındakini küçültmez.

---

### KONU 8 — Sürekliliği koruma

#### 8A · Görüşmeler seyrekleşiyor

> `{sert_2}` ile görüşmeler ayda bire düştü. Her seferinde meşguliyet gerekçesi var.

- Bir şey söylemem, kendi temposu
- Sıklığı yeniden konuşur, gerçekçi bir plan yaparız
- Daha sık görüşmemiz gerektiğini söylerim
- Devam etmek isteyip istemediğini sorarım

✅ **İkinci.** Dördüncüsü sert ve kaçışı kolaylaştırır. Sıklığı yeniden pazarlık etmek, ilişkiyi bitirmeden gerçeğe uydurur.

#### 8B · Motivasyon düşüşü

> `{sert_3}` başta çok istekliydi, şimdi "ne fark edecek ki" diyor.

- Motive edici şeyler söylerim
- Ne değiştiğini sorarım
- Ara vermeyi öneririm
- Küçük ve hızlı bir kazanım hedefi koyarız

✅ **İkinci.** Motivasyon düşüşünün altında bir şey vardır — anlamadan çözüm üretmek işe yaramaz. Dördüncüsü iyi bir ikinci adım.

---

### KONU 9 — Kendi sınırını bilmek

#### 9A · Bilmediğin konu

> `{sert_4}` senin hiç bilmediğin bir alanda yol soruyor.

- Genel prensiplerden yola çıkarak yönlendiririm
- Bilmediğimi söyler, birlikte kaynak ararız
- Bilen birini bulmaya çalışırım
- Konuyu değiştiririm, benim alanıma çekerim

✅ **İkinci.** Bilmemek zayıflık değil. "Bilmiyorum ama birlikte bakalım" hem dürüst hem öğretici — mentinin de bilmediğiyle nasıl baş edeceğini gösterir.

#### 9B · Kendi tükenmişliğin

> Son zamanlarda mentörlük sana yük gelmeye başladı. Görüşmeleri erteliyorsun.

- Devam ederim, söz verdim
- Kurum yöneticisiyle konuşur, destek isterim
- Menti'ye durumu açıklarım
- Ara veririm, kimseye söylemem

✅ **İkinci.** Tükenmiş mentör kimseye fayda sağlamaz. Kurumun bunu bilme ve destekleme sorumluluğu var. Sessizce çekilmek en kötüsü — menti sebebini bilmez, kendini suçlar.

---

### KONU 10 — Bitirme

#### 10A · Program sonu

> Mentörlük süresi doldu. `{sert_5}` devam etmek istiyor.

- Devam ederim, ilişki kurulmuş
- Programın bittiğini söyler, veda görüşmesi yaparım
- Kurum yöneticisine sorarım, uzatma mümkün mü
- Ara sıra görüşmeye devam ederiz, resmi olmadan

✅ **İkinci.** Bitişin de bir ritüeli olmalı. Belirsiz devam, ilişkiyi yavaş yavaş söndürür ve iki taraf da ne olduğunu anlamaz. Uzatma kurumun kararıysa üçüncüsü de doğru olabilir.

#### 10B · Erken bitirme

> `{sert_6}` ile üç aydır ilerleme yok. İkiniz de zorlanıyorsunuz.

- Devam ederim, süre dolana kadar
- Durumu konuşur, birlikte karar veririz
- Kurum yöneticisine bildirir, eşleşmenin değişmesini isterim
- Menti'nin karar vermesini beklerim

✅ **İkinci.** Yürümeyen eşleşmeyi sürdürmek ikisine de zarar. Ama karar tek taraflı olmamalı — önce konuşmak, sonra gerekirse kurumu dahil etmek.

---

## 9. SAYIM

| | Sayı |
|---|---|
| Öğrenme aşaması | 8 |
| Öğrenme şıkkı | 24 (8 × 3) |
| Öğrenme geri bildirimi | 24 |
| Sertifika konusu | 10 |
| Sertifika senaryosu | 20 (10 × 2) |
| Sertifika şıkkı | 80 (20 × 4) |
| Kritik konu | 4 (her sınavda garantili) |
| İsim değişkeni | 10 (4 öğrenme + 6 sertifika) |

⚠️ Bu sayım PO/strateji beyanıdır. Kayıt turunda ajan **tek tek doğrulasın** (KURAL 16). Önceki oturumlarda dört kez sayım hatası yapıldı.

---

## 10. KOD KALEMLERİ (bu belgeden doğan)

1. **İsim değişkeni altyapısı** — metinler `{menti_denge}` biçiminde tutulsun, gösterimde çözülsün. Tenant bazında özelleştirilebilir.
2. **Hatalı-konu hedefleme** — yanlış yapılan konu tekrar denemede mutlaka gelsin, diğer varyantıyla
3. **Kritik konu garantisi** — her sınavda 4 kritik konudan birer soru
4. **Deneme sınırı** — günde 2, üçüncüsü için bekleme; bekleme süresince öğrenme yolculuğuna yönlendirme
5. **Şık sırası karıştırma** — sertifikada ve öğrenmede, her gösterimde
6. **Konu bazlı geri bildirim** — sınav sonunda hangi konuda zayıf kalındığı + ilgili öğrenme aşamasına yönlendirme
7. **Kriz bildirimi** — kendine zarar ifadesi geçtiğinde kurum yöneticisine otomatik bildirim akışı (4B senaryosunun canlı karşılığı)

⚠️ Numaralar PO tarafından `00-KARAR-TAKIP`'te verilecek.

---

## 11. AÇIK KALEMLER

| # | Kalem | Not |
|---|---|---|
| 1 | **Güvenli seed runner yok** (madde 73) | 20 sertifika senaryosu canlıya taşınamıyor (madde 30 bloke) |
| 2 | Varyant sayısı 2 | Üçüncü denemede tükeniyor; 3-4'e çıkarılmalı |
| 3 | Sertifika eşiği | Aktif konuların %80'i + red-line konularda tam puan — mevcut kodda var, gözden geçirilmeli |
| 4 | Öğrenme yolculuğu tamamlama şartı | Sertifikaya girmeden önce zorunlu mu? Karar verilmedi |
| 5 | Kriz bildirimi akışı | 4B'nin canlı karşılığı — teknik akış tasarlanmadı |

---

## 12. DÜRÜSTLÜK SINIRLARI

- **İçerik hiç gerçek mentöre test edilmedi.** İki kişi yazdı, iki kişi eleştirdi. Beş kişilik bir okuma bile göremediğimizi gösterir.
- **"Doğru cevap" işaretlemeleri mesleki muhakemedir.** Mentörlük literatürüne dayanıyor ama her senaryo için ayrı kaynak gösterilmedi.
- **Kriz senaryoları (4A, 4B) hukuki gözden geçirme istiyor.** Bildirim yükümlülüğü ve gizlilik sınırı KVKK ve mesleki etik açısından avukat teyidine tabi olmalı.
- **Sertifika geçme eşiği kalibre edilmedi.** Kaç kişi ilk denemede geçiyor, bilinmiyor. Gerçek veri gelince ayarlanacak.
