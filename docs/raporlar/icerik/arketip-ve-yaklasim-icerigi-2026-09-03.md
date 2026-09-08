> 📁 Kayda geçirildi: 2026-09-03 · tur: docs/icerik-kaydi-2026-09-03

# Arketip Kartları, Yaklaşım İçeriği ve Ölçme Kararları

**Tarih:** 2026-09-03
**Tür:** 📸 DONDURULMUŞ — bu oturumun tam çıktısı
**Kapsam:** 8 arketip kartı · 4 "şimdilik" varyantı · 8 yaklaşım metni (#31) · P3 kararı · eşik kararları

---

## 0. BU BELGE NE İÇİN

Bu belge, MentiMentor değerlendirme sisteminin **kullanıcıya görünen içeriğini** ve o içeriğin arkasındaki kararları kaydeder.

Kardeş belgeler (ayrı kayıt turunda işlendi):
- `senaryo-bankasi-2026-09-03.md` — 39 senaryo, 117 şık · ⬜ HENÜZ YAZILMADI — ⚠️ Bu belge henüz kaydedilmedi (2026-09-03)
- `olcme-mimarisi-2026-09-03.md` — 11 maddelik ölçme mimarisi · ⬜ HENÜZ YAZILMADI — ⚠️ Bu belge henüz kaydedilmedi (2026-09-03)
- `senaryo-denetim-protokolu.md` — denetim protokolü v2 · ⬜ HENÜZ YAZILMADI — ⚠️ Bu belge henüz kaydedilmedi (2026-09-03)
- `olcme-arastirmasi-2026-09-03.md` — akademik araştırma özeti · ⬜ HENÜZ YAZILMADI — ⚠️ Bu belge henüz kaydedilmedi (2026-09-03)

⚠️ Bu belge onların üstüne inşa edilir. Çelişki olursa **daha yeni tarihli** olan kazanır; kod ile çelişirse **kod kazanır** (KURAL 10).

---

## 1. ÇALIŞMA TARZI — sonraki oturumun bilmesi gerekenler

**Rol dağılımı:**
- PO (Zahid) kararları verir, kod yazmaz
- Strateji katmanı (bu sohbet) içerik üretir, prompt yazar, dürüst pushback yapar
- Claude Code yalnız uygular ve kaydeder — tasarlamaz

**İçerik burada üretilir.** Sorular, senaryolar, kartlar, metinler strateji oturumunda yazılır. Ajanın yaratıcı kararı yoktur.

**PO'nun verdiği yetki (2026-09-03):**
> "Metinleri yazarken birden fazla rolü ve bakış açısını bağlayarak oluştur. Çok detay vermene gerek yok, ne istediğimi biliyorsun."

Yani: her metin ölçme, kullanıcı deneyimi, kültür ve ürün gözüyle birlikte yazılır; PO onay verir, tek tek talimat vermez.

---

## 2. MODEL ZEMİNİ (kesinleşmiş, tartışılmaz)

**B modeli:**
- **Görünen yüz:** kendi arketiplerimiz
- **Motor:** Big Five (OCEAN)
- Kullanıcı arketibini görür; boyut ağırlıklarını **isterse** görebilir (PO kararı, önceki "görmez" kararını revize eder)

**Arketipler:**

| Rol | Arketipler |
|---|---|
| Mentör | Mimar · Ayna · Liman · Pusula |
| Menti | Rotacı · Kâşif · Denge Arayan · İz Açan |

**Gösterim:** baskın + ikincil ("Sen bir Limansın — Ayna tarafın da güçlü")

**Eşleştirme ağırlıkları:**
- Hedef/değer uyumu **%45**
- Alan/uzmanlık **%30**
- Kişilik **%25**

**Kişilik içi dağılım:**
uyumluluk %8 · duygusal denge %7 · sorumluluk %6 · açıklık %3 · dışadönüklük %1

---

## 3. ⭐ P3 KARARI — ortada olan kişi sorunu

### Sorun

Simülasyonda çıktı: her boyutta ortada olan kişide **baskın arketip çıkmıyor.** "Sen bir Limansın" diyemiyoruz çünkü hiçbiri baskın değil.

Ve bu kişiler azınlık değil — normal dağılımda **kitlenin kendisi.**

### Değerlendirilen seçenekler

| Seçenek | Artı | Eksi |
|---|---|---|
| A — beşinci "dengeli" arketip | Dürüst | Çok kişi oraya düşer, arketip anlamını yitirir; #31 içeriği yazılamaz |
| B — eşik kuralı, herkese arketip | Basit, #31 çalışır | Zorlama olabilir |
| C — güven yeterli olana kadar arketip verme | Dürüst, derinleşmeye teşvik | Kişi 15 senaryo çözüp ödülsüz kalır, terk riski |

### ✅ KARAR: B + dürüstlük kademesi

Herkes arketip alır, **ama kartın dili güven düzeyine göre değişir.**

- Fark net → net dil ("Sen bir Limansın")
- Fark az → "şimdilik" dili ("Şimdilik Liman tarafın öne çıkıyor")

Kişi ödülsüz kalmıyor, ama yalan da söylenmiyor. İkinci hal derinleşmeye doğal davet.

Bu, zaten kurulmuş güven skoru mekanizmasının kullanıcıya yansıyan yüzü — yeni sistem gerekmiyor.

### Eşik: 10 puan (başlangıç)

**Mantık:** Beş boyut 0-100 aralığında. Tamamen rastgele olsalardı en yüksek ile ikinci arasındaki fark ortalama 10-12 puan olurdu. Bundan küçük farklar gürültüden ayırt edilemez.

⚠️ **DÜRÜSTLÜK SINIRI:** Bu ampirik bir eşik değil, muhakemedir.

Katı psikometrik ölçütle bakılırsa durum daha kötü: ölçümümüz ince (boyut başına ~9 sinyal), güvenilirlik muhtemelen 0.6-0.7 olacak. Bu düzeyde iki boyutun "gerçekten farklı" sayılması için gereken fark 15-20 çıkar — ve o zaman çoğu kişi "şimdilik" alır, yani reddettiğimiz C seçeneğine döneriz.

**Pratik çözüm:** Eşiği **anlatım eşiği** olarak kullan, istatistiksel eşik olarak değil. "Net" dediğimizde bilimsel iddia değil, vurgu yapıyoruz.

⬜ **AÇIK KALEM:** Bu konuda akademik dayanak araştırması yapılacak (skor farkı güvenilirliği, standard error of difference, kısa ölçeklerde profil yorumlama eşikleri). Kartlar yazıldıktan sonra ayrı tur.

**Kalibrasyon ölçütü:** Kaç kişi "şimdilik" alıyor? %60'ı geçiyorsa eşik yüksek, %10'un altındaysa gereksiz.

### İki veya üç boyut yüksekse

Sorun değil, **zenginlik.** Kart buna göre değişir (metinler §5'te).

---

## 4. AKIŞ VE ÖDÜL ANI

### Sıra: 15 senaryo → 3 soru → arketip kartı

**Neden kart sonda:**
- Karşılığını görmeden emek vermek zor; ama üç soru araya girerse "ödülden önceki engel" gibi hissedilir
- Kart önce gelirse S2'nin bias riski geri gelir (kişi arketibini görüp ona uygun cevap verebilir)

**Çözüm:** sorular kartın önünde kalır, ama araya tek cümle konur:

> *"Son üç soru. Sonra karakter kartın hazır."*

Kişi ne kadar kaldığını bilir, bekleme dayanılır olur, bias riski kapalı kalır.

### Kart iki katmanlı

**İlk ekran — arketip.** Metafor, kısa açıklama, sıcak ton. Bu ödül.

**"Detayları gör" — beş boyut.** Kişi isterse açar. Zorunlu değil; herkes o detayı istemez, isteyen bulur.

### Kart 15 senaryonun sonunda gelir, 35'in değil

Havuz haftalara yayılır, kişi hepsini bir oturumda görmez. Kart ilk oturumun sonunda gelir, sonra derinleştikçe **güncellenir.** İki katmanlı tasarımın tamamı buna dayanır.

⬜ **AÇIK KALEM:** Arketip değiştiğinde kullanıcıya bildirilecek mi? (PO kararı: "ürünü gerçek kullanıcıya çıkarmadan bu detaya vakit harcamayalım" — ertelendi.)

---

## 5. ⭐ ARKETİP KARTLARI — 8 metin

### Yazım ilkeleri (dördü de her kartta gözetildi)

1. **Hiçbir arketip aşağılayıcı değil.** "Denge Arayan" kaygılı değil temkinli; "İz Açan" ukala değil cesur.
2. **"Dikkat" bölümü suçlama değil.** Her güçlü yanın gölgesi var; bunu söylemek dürüstlük.
3. **Menti kartlarında "Dikkat" yerine "Aramaya değer".** Menti gelişmeye gelmiş; ona eksik değil, yön göstermek doğru.
4. **"Sen busun" değil "bu bir eğilim."** Cümleler davranış anlatır, kimlik dayatmaz. (Barnum/etiketleme riski — araştırma uyarısı.)

---

### 🏛 MİMAR (mentör)

**Yol açık olduğunda insanlar daha hızlı yürür.**

Bir sorunu duyduğunda kafanda parçalara ayırıyorsun. Nereden başlanacağı, hangi adımın hangisini açtığı sende netleşiyor — sonra karşındakine o haritayı veriyorsun.

Mentiler seninle çalışırken "ne yapacağımı biliyorum" hissini erken kazanır.

**Güçlü yanın:** Belirsizliği yapıya çevirmek. Dağınık bir kafayı toparlamakta iyisin.

**Dikkat:** Haritayı sen çizdiğinde menti kendi yolunu bulmayı öğrenemeyebilir. Bazen planı vermek yerine "sen nasıl bölerdin" diye sormak daha çok işe yarar.

---

### 🪞 AYNA (mentör)

**Doğru soru, hazır cevaptan uzun süre yaşar.**

Anlatılanı dinliyorsun ama hemen çözüm üretmiyorsun. Bir soru soruyorsun, sonra bir tane daha — ve karşındaki kendi cevabını buluyor.

Seninle konuşan kişi çoğu zaman "aslında biliyormuşum" diyerek ayrılıyor.

**Güçlü yanın:** İnsanların kendi düşüncelerini duymasını sağlamak. Bu, dışarıdan verilen hiçbir cevabın yapamadığı şey.

**Dikkat:** Bazen menti gerçekten bilmiyordur ve soru sormak yormaya başlar. Karşındakinin ne zaman düz bir cevaba ihtiyacı olduğunu okumak, sabrın kadar önemli.

---

### ⚓ LİMAN (mentör)

**Bazen en çok işe yarayan şey, yanında duran biridir.**

Karşındaki anlatırken acele etmiyorsun. Emeği görüyorsun, önce onu söylüyorsun. Zor bir şey söylemen gerektiğinde de yumuşak söylüyorsun — ama söylüyorsun.

İnsanlar sana zorlandıklarını itiraf etmekten çekinmez. Bu nadir bir şey.

**Güçlü yanın:** Güvenli alan kurmak. Kendini kötü hisseden biri sana geldiğinde daha kötü hissetmeden çıkar.

**Dikkat:** Nazik olmak bazen net olmamaya dönüşebilir. Menti duymak istemediği şeyi senden hiç duymuyorsa, koruduğun şey onun gelişimi olmayabilir.

---

### 🧭 PUSULA (mentör)

**Net söylenen bir şey, zamanla anlaşılan bir şeyden hızlıdır.**

Bir şey yürümeyecekse söylüyorsun. Dolandırmıyorsun, süslemiyorsun. Karşındaki bazen ilk anda irkiliyor ama sonra "iyi ki söylemiş" diyor.

Yön belli olduğunda ilerlemek kolaylaşır — sen o yönü gösteriyorsun.

**Güçlü yanın:** Zaman kazandırmak. Menti yanlış yolda aylarca yürümüyor.

**Dikkat:** Herkes doğrudan konuşmaya aynı hazır değil. Kırılgan bir anda söylenen doğru söz, doğruluğunu kaybedebilir. Ne söylediğin kadar ne zaman söylediğin de önemli.

---

### 🗺 ROTACI (menti)

**Belirsizlik seni durdurmuyor, plana çeviriyorsun.**

Önünde net olmayan bir şey olduğunda ilk işin onu adımlara bölmek. Ne zaman ne yapacağını yazıyorsun, sonra takip ediyorsun.

Söz verdiğin şeyi genelde yapıyorsun — bu, çevrende düşündüğünden daha çok fark ediliyor.

**Güçlü yanın:** İşi bitirmek. Başladığın şeyle aran iyi.

**Aramaya değer:** Planın dışına çıkmanın da bir yolu var. Bazen en iyi fırsat, listede olmayan şeyden çıkar.

---

### 🔭 KÂŞİF (menti)

**Bir konu seni yakaladığında peşini bırakmıyorsun.**

Yeni bir şey duyduğunda ilk tepkin merak. Dallanıyorsun, bağlantı kuruyorsun, başkalarının görmediği yerlerden bakıyorsun.

Aynı anda birkaç şeye ilgi duyman dağınıklık değil — genişlik.

**Güçlü yanın:** Kimsenin sormadığı soruyu sormak. Yeni yollar böyle açılıyor.

**Aramaya değer:** Merak başlatır ama bitirmez. Bir şeyi sonuna kadar götürdüğünde ne olduğunu görmek, yeni bir şeye başlamak kadar değerli olabilir.

---

### ⚖️ DENGE ARAYAN (menti)

**Zemini sağlamlaştırmadan yürümüyorsun — bu temkin, korku değil.**

Bir işe girişmeden önce nereye bastığını bilmek istiyorsun. Neyi bilmediğini fark ediyorsun ve bu, çoğu insanın yapamadığı bir şey.

Acele etmediğin için daha az geri dönüyorsun.

**Güçlü yanın:** Gerçekçilik. Bir işin ne kadar süreceğini ve neyin ters gidebileceğini önceden görüyorsun.

**Aramaya değer:** Bazı şeyler ancak içine girince anlaşılır. Hazır hissetmeyi beklemek, bazen hiç başlamamak anlamına gelebilir.

---

### 🌱 İZ AÇAN (menti)

**Kendi yolunu çizmeyi hazır yolu yürümeye tercih ediyorsun.**

Bir fırsat gördüğünde uzun uzun düşünmüyorsun, giriyorsun. Kimse denememişse bu seni caydırmıyor — tam tersi.

Kendi yorumunu katıyorsun; söylenenin aynısını yapmak sana dar geliyor.

**Güçlü yanın:** Harekete geçmek. Çoğu insan düşünürken sen başlamış oluyorsun.

**Aramaya değer:** Herkesin hızı senin hızın değil. Bazen yavaşlamak, birlikte gitmeni sağlar — ve birlikte gidilen yol daha uzağa varır.

⚠️ **NOT:** "İz Açan" adı PO tarafından kesin onaylanmadı ("biraz kahramanlık kokuyor" notu vardı). Şimdilik kullanılıyor, değiştirilebilir.

---

## 6. ⭐ "ŞİMDİLİK" VARYANTLARI — 4 metin

Kişi 15 senaryoyu bitirdi ama profili henüz oturmadı. Aynı sıcaklık, farklı kesinlik. Örnekler mentör tarafından; menti tarafında aynı yapı, arketip adları değişerek.

### Bir taraf hafif önde (fark < 10 puan)

> **Şimdilik Liman tarafın öne çıkıyor.**
>
> İnsanlar sana rahat açılıyor, dinlerken acele etmiyorsun.
>
> Ama Mimar ve Ayna tarafların da yakın — profilin henüz bir tarafa yerleşmedi. Birkaç senaryo daha çözersen netleşir.

### İki taraf birlikte güçlü

> **Sen hem Liman hem Mimarsın.**
>
> İnsanları rahatlatırken bir yandan yolu netleştiriyorsun. Bu ikisi genelde ayrı insanlarda bulunur — sende birlikte.
>
> Hangisinin öne çıktığı duruma göre değişiyor olabilir.

### Üç taraf yakın

> **Üç tarafın birden güçlü: Liman, Mimar, Ayna.**
>
> Karşındakine göre farklı yüzünü kullanıyorsun. Kimine yapı veriyorsun, kimini dinliyorsun, kimine soru soruyorsun.
>
> Bu esneklik — ama bazen kendi tarzını bulmak da işe yarar.

### Hiçbiri sivrilmemiş (dördü de 10 puan içinde)

> **Şimdilik Liman tarafın önde, ama farklar küçük.**
>
> Dört taraf da birbirine yakın. Bu, sende hepsinden bir parça olduğu anlamına geliyor.
>
> Birkaç senaryo daha çözersen hangisinin gerçekten baskın olduğu ortaya çıkar.

⚠️ **KURAL:** Hiçbir varyantta "yeterli değilsin" denmez. En zayıf durumda bile ifade bir **davet**, ret değil.

---

## 7. ⭐ #31 — YAKLAŞIM İÇERİĞİ — 8 metin

PO'nun özgün fikri: *"Kişiyi tespit ettik, karşındakini de tespit ettik, bildirdik — ama nasıl aksiyon alması gerektiğini de söylemek lazım."*

Ürünün rakiplerden ayrıştığı yer. Eşleşme kurulduktan sonra her iki tarafa gösterilir.

### Yazım ilkeleri

- Kişiyi kutuya sokmuyor
- "Şöyle yap" demiyor, "şu işe yarar" diyor
- Karşı tarafı nesneleştirmiyor
- Kısa — ilk görüşmeden önce okunacak

---

### MENTÖRE — menti tipine göre

**Rotacı bir mentiyle**

Planlı biri. Görüşmeye hazırlıklı gelir, not tutar, verdiğin işi yapar.

*İşe yarar:* Somut adımlar ve net tarihler. "Şunu deneyelim" yerine "önümüzdeki iki hafta şunu yap" daha iyi karşılık bulur.

*Dikkat:* Planın dışına çıkmakta zorlanabilir. Bir fırsat listede yoksa görmeyebilir. Ara ara "peki ya bu?" diye sormak açar.

---

**Kâşif bir mentiyle**

Meraklı ve dallanan biri. Bir konudan başlar, üç konu sonra devam eder.

*İşe yarar:* Merakını kesmemek. Dallandığı yerde bir süre kalmasına izin ver, sonra bağla.

*Dikkat:* Başlamak kolay, bitirmek zor gelir. "Şu ana kadar hangisini sonuna kadar götürdün?" iyi bir soru.

---

**Denge Arayan bir mentiyle**

Zemini sağlamlaştırmadan yürümeyen biri. Ne bilmediğini fark eder ve bu değerlidir.

*İşe yarar:* Belirsizliği azaltmak. Ne olacağını, ne kadar süreceğini önceden söylemek rahatlatır.

*Dikkat:* Hazır hissetmeyi beklerken fırsat kaçabilir. Küçük ve düşük riskli bir adım öner — başlamak, hazır olmaktan daha çok güven verir.

---

**İz Açan bir mentiyle**

Kendi yolunu çizmeyi seven biri. Hazır çözüm dar gelir.

*İşe yarar:* Yön göstermek, yol tarif etmemek. "Şunu şöyle yap" yerine "nereye varmak istiyorsun" daha iyi işler.

*Dikkat:* Hızlı gider, bazen gereğinden hızlı. Frenlemek yerine "bu hızda ne gözden kaçabilir" diye sormak daha etkili.

---

### MENTİYE — mentör tipine göre

**Mimar bir mentörle**

Yapı kuran biri. Sorununu parçalara ayırır, sıraya koyar.

*İşe yarar:* Sorununu olabildiğince somut anlatmak. Ne kadar net anlatırsan o kadar net bir harita alırsın.

*Bil ki:* Sana plan verecek. Ama planı uygulamak sende — sorulmadan "burada takıldım" demek işini kolaylaştırır.

---

**Ayna bir mentörle**

Soru soran biri. Cevabı hemen vermez, seni kendi cevabına götürür.

*İşe yarar:* Sorulara gerçekten düşünerek cevap vermek. Acele edip "bilmiyorum" demek süreci kısaltmaz.

*Bil ki:* Bazen düz cevap istersin ve o soru sormaya devam eder. "Şu an gerçekten bilmiyorum, ne dersin?" demek serbest.

---

**Liman bir mentörle**

Yanında duran biri. Emeğini görür, zorlandığında yanında olur.

*İşe yarar:* Açık olmak. Neyi başaramadığını söylemek burada risksiz.

*Bil ki:* Nazik olduğu için eleştirisini yumuşak söyleyebilir. "Açıkça söyler misin" demek, duyman gerekeni duymanı sağlar.

---

**Pusula bir mentörle**

Doğrudan konuşan biri. Bir şey yürümeyecekse söyler.

*İşe yarar:* Netliği kişisel almamak. Sana değil, işe bakıyor.

*Bil ki:* İlk anda sert gelebilir. Ama sana zaman kazandırır — aylarca yanlış yolda yürümezsin.

---

## 8. DOKUZ YAZIM KURALI (senaryolar için, kartlara da uyarlanır)

Her biri **gerçek bir hatadan** doğdu.

1. **Rol giydirme yasak** — kişi kendi personasını yaşar, "X olsan ne yapardın" denmez
2. **Doğru cevap kokusu yasak** — şıkların hepsi meşru
3. **Sahne 2-3 cümle, gündelik** — zenginleşirse kişi hikâyeye tepki verir
4. **Ne ölçtüğü belli olmasın**
5. **Şıklar birbirini tekrarlamasın** — aynı boyutun aynı yönü iki kez olmaz
6. **Senaryolar aynı ekseni ölçmesin** — tek tek bakınca görünmez, yan yana koyunca çıkar
7. **Gerekçe eşitliği senaryo içinde** — ya üçü de gerekçe taşır ya hiçbiri
8. **Şık deseni tutarlı olsun** — üçü de fiil ya da üçü de değil
9. ⭐ **Her şıkkın kendi mantığı olsun** — "erteler" değil "plan beni yavaşlatıyor"

**Kural 9'a ek (2026-09-03):** Duygu bildiren şık da gerekçe taşımalı. "İçime dert olur" değil, "İçimde kalır; hakkımı istemek bana zor geliyor". Üç vakadan doğdu.

**Kural 9'un doğuş hikâyesi:** Simülasyonda "kendini iyi göstermeye çalışan" profil (P5) beş senaryodan beşini de doğru bilebiliyordu. Zorunlu seçim faking'i ancak şıklar eşit çekiciyse engeller — bizimkiler değildi. 24 şık bu ilkeyle dengelendi.

---

## 9. AÇIK KALEMLER

| # | Kalem | Not |
|---|---|---|
| 1 | Eşik (10 puan) akademik dayanağı | Araştırma turu gerekiyor — skor farkı güvenilirliği, SEM, profil yorumlama eşikleri |
| 2 | "İz Açan" adı kesinleşmedi | PO: "kahramanlık kokuyor" |
| 3 | Arketip değişimi bildirilecek mi | Ertelendi — gerçek kullanıcı çıkmadan konuşulmayacak |
| 4 | Kalibrasyon: kaç kişi "şimdilik" alıyor | %60 üstü → eşik yüksek, %10 altı → gereksiz |
| 5 | Detay ekranı tasarımı | Beş boyut nasıl gösterilecek (grafik? çubuk? metin?) |

---

## 10. KOD KALEMLERİ (bu belgeden doğan)

1. Arketip hesabı: en yüksek boyut + ikinci; fark < 10 ise "şimdilik" dili
2. İki/üç boyut yakınsa çoklu arketip metni seçilsin
3. Kart iki katmanlı: arketip ekranı + "detayları gör" (beş boyut)
4. Üç sorunun önüne tek cümle: "Son üç soru. Sonra karakter kartın hazır."
5. Yaklaşım metni (#31) eşleşme kurulduktan sonra iki tarafa gösterilsin
6. Kart derinleştikçe güncellensin (arketip değişebilir)

⚠️ Numaralar PO tarafından `00-KARAR-TAKIP`'te verilecek.

---

## 11. SIRADAKİ İŞ

**Faz 6 — içerik revizyonu:**

**Sertifika (20 senaryo)**
- 4 şık kalır (doğru cevap var; rastgele tutturma %25 vs %33)
- Öğrenme yolculuğuyla yüzey ayrımı: 7 aşamanın 6'sı sertifikayla neredeyse aynı, yolculuğu bitiren sınavı ezberden geçiyor
- Hatalı-konu hedefleme eklenecek
- ⚠️ Güvenli seed runner yok (madde 73) → canlıya taşıma bloke

**Öğrenme yolculuğu (13 aşama)**
- Sayı yeterli, revizyon gerekiyor
- Menti personası tek tip (hep kırılgan, gergin, tükenmiş) — çeşitlendirilecek
- İsimler unisex, karşı taraf isimsiz

---

## 12. DÜRÜSTLÜK SINIRLARI

- **Eşik (10 puan) muhakemedir, ampirik değil.** Katı psikometrik ölçütle 15-20 çıkardı ve o zaman çoğu kişi "şimdilik" alırdı.
- **Kartlar hiç gerçek insana test edilmedi.** İki kişi yazdı, iki kişi eleştirdi. Beş kişilik bir okuma bile göremediğimizi gösterir.
- **"Bilimsel olarak doğrulanmış test" DENMEZ.** Denebilecek: "Big Five modeline dayanır, kendi verimizle kalibre edilecektir."
- **Arketip adları ve metaforlar tamamen bize ait** — hiçbir ticari modelden alınmadı, telif riski yok.
