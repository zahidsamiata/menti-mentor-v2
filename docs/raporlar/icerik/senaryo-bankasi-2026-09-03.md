> 📁 Kayda geçirildi: 2026-09-04 · tur: docs/senaryo-bankasi-kaydi-2026-09-04

# Senaryo Bankası — 39 Senaryo · 117 Şık

**Tarih:** 2026-09-03
**Tür:** 📸 DONDURULMUŞ — içerik oturumu çıktısı, PO onaylı
**Kapsam:** 5 çekirdek + 34 havuz senaryo · Big Five ölçümü · dokuz yazım kuralı

---

## 0. BU BELGE NE İÇİN

MentiMentor karakter ölçümünün **soru bankasıdır.** Kullanıcı ilk oturumda
5 sabit + 10 adaptif = 15 senaryo çözer; kalanlar katman-2'de haftalara yayılır.

**Kardeş belgeler:**
- `arketip-ve-yaklasim-icerigi-2026-09-03.md` — 8 arketip kartı + #31 yaklaşım metinleri
- `faz6-ogrenme-ve-sertifika-2026-09-03.md` — 8 mentör aşaması + 20 sertifika senaryosu
- `menti-yolculugu-ve-eslesme-metinleri-2026-09-03.md` — 5 menti aşaması + eşleşme metinleri
- `olcme-mimarisi-2026-09-03.md` — ⬜ HENÜZ KAYDEDİLMEDİ
- `senaryo-denetim-protokolu.md` — ⬜ HENÜZ KAYDEDİLMEDİ
- `olcme-arastirmasi-2026-09-03.md` — ⬜ HENÜZ KAYDEDİLMEDİ

⚠️ Çelişki olursa daha yeni tarihli kazanır; kod ile çelişirse **kod kazanır** (KURAL 10).

⚠️ **SAYIM UYARISI:** Aşağıdaki 39/117 sayısı strateji katmanının sayımıdır ve
üretim oturumunda **dört kez** yanlış sayıldı (33/34 · 99/102 · 38/39 · 114/117).
Kayıt turunda ajan **tek tek, iki kez** saymalıdır (KURAL 16).

⚠️ **BU BELGE KODA GEÇMEDİ.** Canlı onboarding testi hâlâ 8 hardcoded DISC sorusu
(`onboardingController.ts:109-190`). Bu senaryoların koda geçmesi ayrı turdur.

---

## Belgeye girecek ÖN BÖLÜM

**Format kararı (kesin):**
- **ÖLÇEK YOK.** Hiçbir yerde 1-5, "ne kadar", "az/orta/çok" tipi soru YOK.
- Senaryo + **3 şık**. 4 değil (dördüncü ölü kalıyor), 2 değil (orta seviye
  kaybolur, insanların çoğu ortada).
- **"En çok ben / en az ben"** → tam sıralama verir.
- **Şık sırası her gösterimde karıştırılır.**

**Akış:**
- İlk oturum: **5 sabit + 10 adaptif = 15 senaryo, ~5 dk**
- Sonra üç soru (~40 sn), sonra arketip kartı
- Katman-2: her girişte 1-2 senaryo, **en bulanık boyuttan**
- Kişilik ağırlığı **%12 → %25** (her boyutta ≥4 sinyal birikince)

**YAZIM KURALLARI (9 + ek) — hepsi gerçek bir hatadan doğdu:**
1. Rol giydirme yasak — kişi kendi personasını yaşar
2. Doğru cevap kokusu yasak
3. Sahne 2-3 cümle, gündelik
4. Ne ölçtüğü belli olmasın
5. Şıklar birbirini tekrarlamasın
6. Senaryolar aynı ekseni ölçmesin
7. Gerekçe eşitliği senaryo İÇİNDE (ya üçü de ya hiçbiri)
8. Şık deseni tutarlı olsun (üçü de fiil ya da üçü de değil)
9. **Her şıkkın kendi mantığı olsun** — "erteler" değil "plan beni yavaşlatıyor";
   "kapalıyım" değil "sonuç önemli, bozmam".
   *Gerekçe: simülasyonda "kendini iyi gösteren" profil 5 senaryodan 5'ini doğru
   bilebiliyordu.*
   **⭐ EK (2026-09-03):** *Duygu bildiren şık da gerekçe taşımalı* — "içime dert
   olur" değil, "içimde kalır; hakkımı istemek bana zor geliyor".
   *Gerekçe: bu ek üç ayrı vakadan doğdu — çekirdek `[4]`, `U6`, `S3`. Kural 9
   sistematik olarak duygu-şıklarında kaçıyordu.*

---

## ÇEKİRDEK — 5 SENARYO (herkeste aynı, sabit)

### [1]
Bir arkadaşın seni tanımadığın bir kalabalığa davet etti. Kapıdan girdin, kimseyi
tanımıyorsun.
- Yanımdakine bir şey sorar, oradan sohbet açarım → **uyumluluk yüksek**
- Etraftaki gruplara bakıp en rahat görüneni seçerim → **dışadönüklük yüksek**
- Sohbet kendiliğinden başlar, acelem yok → **duygusal denge yüksek**

> ⚠️ Düzeltme notu: ilk şıkkın taslak hali *"Beni davet edeni bulur, onun üzerinden
> tanışırım"* idi ve **uyumluluk yüksek** etiketliydi. Yanlıştı — bu davranış
> tanıdığa sığınma, yani dışadönüklük-düşük/temkin. Etiketi düzeltmek senaryoyu
> çökertirdi (iki dışadönüklük şıkkı olurdu), bu yüzden **şık değişti**: sıcaklık
> yüzü (kendiliğinden yaklaşma), sığınma değil.

### [2]
Bir işi bitirmene iki gün var. Bugün başlarsan rahat yetişir, ama canın hiç
istemiyor.
- Nasıl yapacağıma bakarım; farklı bir yolunu bulursam elim gider → **açıklık yüksek**
- Küçük bir parçasını bugün bitiririm, gerisi kolaylaşır → **sorumluluk yüksek**
- Yarına bırakırım, sıkışınca odağım daha iyi → **sorumluluk düşük**

> ⚠️ Düzeltme notu: taslakta üç şık da sorumluluk (yüksek/orta/düşük) idi. Bu bir
> **derecelendirme**ydi ve ölçek kaldırma kararına aykırıydı — kişi tek hamlede
> boyutu oynayabiliyordu. Ayrıca havuzdaki `S2` ile aynı işi yapıyordu. Orta şık
> açıklığa çevrildi.

### [3]
Bir konuda emin olduğun bir şey söyledin. Karşındaki kibarca "ben öyle düşünmüyorum"
dedi.
- Kendi gerekçemi daha net anlatırım, kolay vazgeçmem → **uyumluluk düşük**
- Konuyu kapatırım, tartışmaya değmez → **uyumluluk yüksek**
- Nereden geldiğini sorarım, bazen fikrimi değiştiriyor → **açıklık yüksek**

### [4]
Planladığın bir gün, sabah gelen bir haberle tamamen değişti. Ne yaparsın?
- Önce bir soluklanırım; hazır olmadan yeni plana geçmek bende işe yaramıyor
  → **duygusal denge düşük**
- Hemen yeni bir plan yaparım, boşlukta kalmak istemem → **sorumluluk yüksek**
- Birini arar, birlikte yeni bir şey ayarlarım → **dışadönüklük yüksek**

> ⚠️ Düzeltme notu: ilk şıkkın taslak hali *"Bozulan plan canımı sıkar, toparlanmam
> zaman alır"* idi — üç kuralı birden çiğniyordu (7 gerekçe eşitliği · 8 desen ·
> 9 kendi mantığı) ve sahne "ne yaparsın" diye sorarken "ne hissettiğini"
> cevaplıyordu.

### [5]
Yakın bir arkadaşın, senin de katıldığın bir işte bariz bir hata yaptı. Kimse fark
etmedi.
- Fark edilmeden düzeltirim, iş aksamasın → **sorumluluk yüksek**
- Baş başayken söylerim, benden duyması daha iyi → **uyumluluk yüksek**
- Ortak işse ortak konuşulmalı, grupta açarım → **uyumluluk düşük**

**ÇEKİRDEK DAĞILIMI (15 şık):** uyumluluk 5 · sorumluluk 4 · denge 2 ·
dışadönüklük 2 · açıklık 2
> ⚠️ Taslak beyanı (*uyumluluk 4 · sorumluluk 4 · denge 3 · dışadönüklük 2 ·
> açıklık 1 = 14*) **YANLIŞTI** — 15 şıkka karşılık 14 sayıyordu. Yukarıdaki
> düzeltilmiş dağılımdır. **Ajan yine de kendisi saysın.**

---

## HAVUZ — 34 SENARYO (adaptif seçim, en bulanık boyuttan)

### ═══ UYUMLULUK (8) ═══

**[U1]** Yüzeysel tanıdığın biri, epey vaktini alacak bir konuda senden yardım
istedi. Reddetsen kimse yadırgamaz.
- Vaktim olmasa da ayarlamaya çalışırım → **uyumluluk yüksek**
- Önce ne kadar süreceğini netleştiririm → **uyumluluk orta**
- Yapamayacağımı söylerim, boşuna umutlandırmam → **uyumluluk düşük**

**[U2]** Bir arkadaşın haftalardır aynı derdi anlatıyor. Bugün yine aynı konuyla
geldi.
- Konuyu değiştiririm, tekrarlamak ona da iyi gelmiyor → **uyumluluk düşük**
- Yine dinlerim, anlatması ona iyi geliyor → **uyumluluk yüksek**
- Bir çözüm önerisi getiririm, dönüp durmayalım → **sorumluluk yüksek** *(yan sinyal)*

**[U3]** Biri sana emek verdiği bir şeyi gösterdi. Beğenmedin ama heyecanlı.
- Sorduğu şeyi dürüstçe söylerim, işine yarar → **uyumluluk düşük**
- Ne yapmak istediğini sorar, oradan konuşuruz → **uyumluluk orta**
- İyi taraflarını söyler, eksiği açmam → **uyumluluk yüksek**

**[U4]** Bir grupta yeni gelen biri var, kimseyle konuşamıyor.
- Yanına gider, sohbete dahil ederim → **uyumluluk yüksek**
- Zorlamam, herkesin alışma hızı farklı → **uyumluluk düşük**
- Kendi sohbetime devam ederim, tanışmak isteyen zaten yaklaşır
  → **dışadönüklük düşük** *(yan sinyal)*

> ⚠️ Düzeltme notu: üçüncü şıkkın taslak hali *"Ben de yeniyim, kendi yerimi bulmaya
> çalışıyorum"* idi — sahne kişinin yeni olduğunu söylemiyor, şık kullanıcıya
> olmayan bir durum atfediyordu (**kural 1: rol giydirme yasak**).

> ⬛ **[U5] — BOŞ (bilinçli).** Taslakta borç verme sahnesiydi; **iki nedenle
> çıkarıldı:** (a) `U1` ile aynı ekseni ölçüyordu ("biri senden maliyetli bir şey
> istedi, reddedebilirsin"), (b) Türkiye bağlamında para ilişkileri kişilik yerine
> **ekonomik durum** sızdırıyordu. **Numara yeniden KULLANILMAYACAK** — eski
> turlarda "U5" geçen yerleri sessizce yanlış hedefe bağlardı. Boşluk kendi
> hikâyesini anlatır.

**[U6]** Bir işi birlikte yaptınız ama asıl emek sende. Teşekkür herkese gidiyor.
- Bir vesileyle payımı belirtirim → **uyumluluk düşük**
- İçimde kalır; hakkımı istemek bana zor geliyor → **duygusal denge düşük** *(yan sinyal)*
- Ses çıkarmam, iş bitti sonuçta → **uyumluluk yüksek**

> ⚠️ Düzeltme notu: ikinci şıkkın taslak hali *"İçime dert olur"* idi — çıplak duygu,
> kendi mantığı yok (**kural 9 eki**).

**[U7]** Bir tanıdığın senin hakkında yanlış bir şey söylemiş, kulağına geldi.
- Üstünde durmam, herkes bir şey söyler → **uyumluluk yüksek**
- Doğrudan sorarım, aramızda kalsın → **uyumluluk düşük**
- Bir süre mesafe koyarım → **uyumluluk orta**

**[U8]** Kalabalık bir sofrada biri sürekli konuşuyor, kimse söz alamıyor.
- Bırakırım, konuşmak isteyen bir yolunu bulur → **uyumluluk yüksek**
- Uygun bir yerde araya girer, konuyu açarım → **uyumluluk düşük**
- Yanımdakiyle kendi aramızda konuşmaya başlarım → **dışadönüklük düşük** *(yan sinyal)*

**[U9]** Birlikte iş yaptığın biri bugün sessiz, keyifsiz görünüyor. Sana bir şey
söylemedi.
- Bir şey mi var diye sorarım; sormazsam aklımda kalıyor → **uyumluluk yüksek**
- Sormam ama işini hafifletirim; söylemek isterse söyler → **uyumluluk orta**
- Karışmam; herkesin kendine göre kötü bir günü olur → **uyumluluk düşük**

> ⭐ **YENİ (2026-09-03) — neden eklendi:** `U1`, `U2`, `U4` üçü de **bir talebe ya da
> duruma tepki** ölçüyordu. **Talebe yanıt vermek yardımseverlik; talep yokken
> yaklaşmak sıcaklık.** Sıcaklık yüzü havuzda hiç ölçülmüyordu. Uyumluluk %8 ile en
> ağır boyut olduğu için sekizinci senaryoyu hak ediyor.
> ⚠️ İlk `U9` önerisi (*"hiç uzman olmadığın bir konuda akıl danışıldı"*) **kabul
> EDİLMEDİ** — o da bir talebe yanıttı ve fiilen **alçakgönüllülük/dürüstlük**
> ölçüyordu, sıcaklık değil (`A7`'deki eksen kaymasının aynısı).

### ═══ DUYGUSAL DENGE (7) ═══
> **BÖLÜM NOTU:** yan sinyallerde **sorumluluk KULLANILMAZ** — ruminasyonla
> karışıyordu.

**[D1]** Emek verdiğin bir iş beklediğin gibi gitmedi. Akşam olmuş, evdesin.
- Kısa sürede kabullenir, sonrasına bakarım → **denge yüksek**
- Ertesi güne de sarkar → **denge düşük**
- Birine anlatırım, konuşunca hafifler → **dışadönüklük yüksek** *(yan sinyal)*

**[D2]** Yarın önemli bir görüşmen var. Bu gece uyumadan önce...
- Normal uyurum, sabah düşünürüm → **denge yüksek**
- Aklımdan senaryolar geçer, uyumam zorlaşır → **denge düşük**
- Nasıl geçeceğini merak ederim; bilmediğim bir şeye gitmek hoşuma gidiyor
  → **açıklık yüksek** *(yan sinyal)*

> ⚠️ Düzeltme notu: üçüncü şıkkın taslak hali *"Erken yatarım, yorgun olmayayım"*
> → **sorumluluk yüksek** idi ve **bölümün kendi notunu çiğniyordu.** Ara öneri
> (*"Bir kez gözden geçirir, sonra kapatırım"* → açıklık orta) de reddedildi:
> o davranış fiilen kontrol/hazırlık, yani sorumluluk — etiketi değiştirmek eksen
> kaymasını gizlemekten öteye gitmiyordu.
> ⚠️ Dışadönüklük yan sinyali burada KULLANILAMAZ — `D1`'de zaten var, tekrar olurdu.

**[D3]** Biri sana beklemediğin bir anda sert bir eleştiri yaptı.
- Sertliğini üstümde bırakmam → **denge yüksek**
- O an sarsılırım, sonra toparlarım → **denge orta**
- Günün geri kalanı bende kalır → **denge düşük**

**[D4]** Bir yere geç kaldın ve trafikte sıkışmışsın. Yapabileceğin bir şey yok.
- Sürekli saate bakar, gerilirim → **denge düşük**
- Haber verir, sonra kendimi başka şeye veririm → **denge yüksek**
- Sinirlenirim ama belli etmem → **uyumluluk yüksek** *(yan sinyal)*

**[D5]** Uzun süredir uğraştığın bir şeyde ilk kez gerçek bir ilerleme gördün.
- Keyfini çıkarırım, hak ettim → **denge yüksek**
- Bozulur diye endişelenirim → **denge düşük**
- Kimlerle kutlarım diye düşünürüm → **dışadönüklük yüksek** *(yan sinyal)*

**[D6]** Bir grup içinde senin hakkında konuşulduğunu hissettin ama emin değilsin.
- Duymadığım şey beni ilgilendirmez → **denge yüksek**
- İçime dert olur, ne olduğunu öğrenmek isterim → **denge düşük**
- Doğrudan sorarım, kim demiş öğrenirim → **uyumluluk düşük** *(yan sinyal)*

**[D7]** Aynı hafta içinde üst üste birkaç şey ters gitti.
- Böyle dönemler olur, geçer → **denge yüksek**
- Bir süre kendimi kötü hissederim, sonra geçer → **denge orta**
- Her şey üst üste gelmiş gibi hissederim, ağırlaşır → **denge düşük**

### ═══ SORUMLULUK (7) ═══

**[S1]** Söz verdiğin küçük bir işi kimse takip etmiyor. Yapmasan fark edilmez.
- Sözünü verdiğim şeyi yaparım, takip edilmesi önemli değil → **sorumluluk yüksek**
- Aklıma gelirse yaparım → **sorumluluk orta**
- Küçük işleri kafamda tutmam, önemli olan hatırlanır → **sorumluluk düşük**

**[S2]** Bir işe başlamadan önce...
- Ne yapacağımı yazar, sıraya koyarım → **sorumluluk yüksek**
- Kabaca planlar, ayrıntıyı yolda çözerim → **sorumluluk orta**
- Başlarım — plan yapmak beni yavaşlatıyor → **sorumluluk düşük**

**[S3]** Uzun bir listede birkaç madde sürekli sona kalıyor.
- Onları en başa alır, kurtulurum → **sorumluluk yüksek**
- Listeye her bakışımda canımı sıkar; o yüzden listeye az bakarım
  → **duygusal denge düşük** *(yan sinyal)*
- Sona kalıyorsa gerçekten gerekli değildir → **sorumluluk düşük**

> ⚠️ Düzeltme notu: ikinci şıkkın taslak hali *"Rahatsız olurum ama yine de
> ertelerim"* idi (kural 9 eki ihlali). Ara öneri (*"Sıkışmadan elim gitmiyor;
> baskı olmayınca sona kalıyor"*) de reddedildi: o hal **sorumluluk düşük**
> okunuyordu ve üçüncü şıkla **aynı sinyali** veriyordu (**kural 5 ihlali**).

**[S4]** Bir şeyi yarım bıraktın, aradan zaman geçti.
- Baştan bakmam gerekir, öyle devam ederim → **sorumluluk yüksek**
- Kaldığım yerden devam ederim → **sorumluluk orta**
- Araya zaman girmişse baştan kurmak daha iyi geliyor → **sorumluluk düşük**

**[S5]** Birine "hallederim" dedin ama sonra işin sandığından büyük olduğunu gördün.
- Yine de bitiririm, söz sözdür → **sorumluluk yüksek**
- Baştan haber verir, birlikte küçültürüz → **uyumluluk orta** *(yan sinyal)*
- Yapabildiğim kadarını yapar, açıkça söylerim → **sorumluluk düşük**

**[S6]** Bir şeyi tam yapmakla hızlı yapmak arasında seçim yapman gerekiyor.
- Tam yaparım, geç kalsa da → **sorumluluk yüksek**
- Önemli kısmını tam, gerisini hızlı yaparım → **sorumluluk orta**
- Hızlı çıkarır, geri bildirime göre düzeltirim → **sorumluluk düşük**

**[S7]** Ay sonunda yapılacaklar listende kalanları...
- Takip ederim, ne kaldı bellidir → **sorumluluk yüksek**
- Aşağı yukarı bilirim → **sorumluluk orta**
- Listeyi takip etmem, önemli olan zaten aklımda kalır → **sorumluluk düşük**

### ═══ AÇIKLIK (6) ═══

**[A1]** Hiç bilmediğin bir müzik türü çalıyor.
- Ne olduğunu sorar, sonra karar veririm → **açıklık yüksek**
- Bir süre dinlerim, belki tutar → **açıklık orta**
- Sevdiğimi açarım, keyif almak için dinliyorum → **açıklık düşük**

> ⚠️ Düzeltme notu: taslakta ilk iki etiket **TERSTİ** (sorar=orta, dinlerim=yüksek).
> Sormak merak göstergesidir ve pasif dinlemekten daha açık okunur.

**[A2]** Bir konuda uzun süredir savunduğun bir görüş var. Karşı tarafta ikna edici
bir yazı okudun.
- Görüşümü gözden geçiririm → **açıklık yüksek**
- İlginç bulurum ama kendi fikrimde kalırım → **açıklık orta**
- Kaynağına bakarım, her ikna edici yazı doğru olmuyor → **açıklık düşük**

**[A3]** Sana hiç ilgi alanın olmayan bir konuda etkinlik önerildi.
- Merak eder, giderim → **açıklık yüksek**
- Vaktimi ilgi duyduğum şeylere ayırmayı tercih ederim → **açıklık düşük**
- Kimlerin geleceğine bakarım → **dışadönüklük yüksek** *(yan sinyal)*

**[A4]** Bir işi yapmanın alışık olduğun bir yolu var. Biri farklı bir yol öneriyor.
- Denerim, işe yaramazsa eskiye dönerim → **açıklık yüksek**
- Neden daha iyi olduğunu sorarım → **açıklık orta**
- Bende işleyen yöntemi bozmam, sonuç önemli → **açıklık düşük**

**[A5]** Tatilde bir gün boş kaldın.
- Daha önce gitmediğim bir yere giderim → **açıklık yüksek**
- Planlamadan çıkar, nereye giderse → **açıklık orta**
- Sevdiğim yere giderim, tatilde deneme yanılma istemem → **açıklık düşük**

**[A6]** Biri sana çok farklı bir hayat yaşadığını anlatıyor.
- Nasıl olduğunu merak eder, sorular sorarım → **açıklık yüksek**
- Kendi hayatımla kıyaslarım → **açıklık orta**
- Dinlerim, herkesin yolu kendine → **açıklık düşük**

> ⬛ **[A7] — ÇIKARILDI (2026-09-03).** Taslak sahne: *"Bir konuda yanıldığını fark
> ettin, üstelik başkalarına da öyle söylemiştin."* **Neden çıkarıldı:** düşük şıkkı
> (*"herkesin önünde geri adım atmak işi karıştırır, sessizce düzeltirim"*) **yüz
> kurtarma** ölçüyordu — deneyime açıklık değil. **Eksen kayması.** Ayrıca açıklık
> %3 ağırlıkla zaten 7 senaryoyla boldu; 6'ya inince dışadönüklükle eşitlendi.

### ═══ DIŞADÖNÜKLÜK (6) ═══
> **BÖLÜM NOTU:** dışadönüklük kişiliğin **%1'i.** Havuz bilinçli olarak 6'da
> bırakıldı — yedinci senaryo eklemek en az önemli boyuta emek harcamak olurdu.
> ⚠️ Bilinen sınır: 20+ senaryo çözen kişi bu bölümde tekrar görmeye başlayabilir.
> Kabul edilmiş bir maliyettir.

**[E1]** Uzun bir haftanın sonunda cuma akşamı.
- Kalabalık bir yere giderim, enerjim yerine gelir → **dışadönüklük yüksek**
- Bir iki kişiyle görüşürüm, o kadarı yeter → **dışadönüklük orta**
- Evde kalırım, hafta boyu yeterince insan gördüm → **dışadönüklük düşük**

**[E2]** Bir grupta tanımadığın insanlar var, sohbet başladı.
- İlk konuşanlardan biri olurum → **dışadönüklük yüksek**
- Bir süre dinler, sonra katılırım → **dışadönüklük orta**
- Soru sorulmazsa pek konuşmam → **dışadönüklük düşük**

**[E3]** Bir haber aldın, paylaşmak istiyorsun.
- Aklıma gelen ilk kişiyi ararım → **dışadönüklük yüksek**
- Bir yere yazarım, görenler görür → **dışadönüklük orta**
- Kendime saklarım, zamanı gelince söylerim → **dışadönüklük düşük**

**[E4]** Bir işi bitirmen gerekiyor, kimse seni beklemiyor. Nasıl ilerlersin?
- Birlikte, konuşarak daha iyi ilerliyorum → **dışadönüklük yüksek**
- Başlarken yalnız, tıkanınca birine sorarım → **dışadönüklük orta**
- Kendi başıma, sonra fikir alırım → **dışadönüklük düşük**

> ⚠️ Düzeltme notu: taslak "sahne" aslında sahne değildi — *"Bir işi tek başına mı
> yoksa birlikte mi yapmak istersin?"* doğrudan bir tercih sorusuydu ve ne ölçtüğü
> şeffaftı (**kural 3 + kural 4 ihlali**).

**[E5]** Bir işin peşinde koşarken gün boyu kimseyle konuşmadın.
- Akşam birine uğrarım, gün öyle tamamlanıyor → **dışadönüklük yüksek**
- Bir mesajlaşma yeter → **dışadönüklük orta**
- Fark etmedim bile, verimli geçti → **dışadönüklük düşük**

> ⚠️ Düzeltme notu: taslak sahne (*"Bir davete gittin, tanıdığın kimse gelmemiş"*)
> **çekirdek `[1]` ile aynı sahneydi** ve içinde **aynı şık** vardı ("tanıdık birini
> bulmaya çalışırım"). Çekirdek herkeste koştuğu için kişi aynı sinyali iki kez
> verirdi (**kural 6 ihlali**). Çekirdek dokunulmaz olduğu için havuz senaryosu
> değişti.

**[E6]** Sessiz geçen bir gün.
- Bir süre sonra sıkılır, birilerini ararım → **dışadönüklük yüksek**
- Akşama doğru birileriyle konuşmak isterim → **dışadönüklük orta**
- Bana iyi gelir, kendi kafamda gezerim → **dışadönüklük düşük**

---

## Belgeye girecek SON BÖLÜM — sayım + açık kararlar

**SAYIM** (ajanın KENDİ sayımı yazılır, PO beyanı değil; sayılan birim tanımlanır).

**⭐ AÇIK KARARLAR (bu belgeye ⬜ olarak girer):**

1. **P3 SORUNU — çözülmedi.** Her boyutta ortada olan kişide baskın arketip
   çıkmıyor. **Normal dağılımda bu KİTLE, istisna değil.** Arketip kartları
   yazılırken çözülecek: ya "dengeli" diye beşinci arketip, ya en yüksek farkı
   zorlayan bir kural.
2. **⭐ ARKETİP KARTI NEREYE DÜŞÜYOR?** Yeni akışta üç soru senaryolardan hemen
   sonra geliyor; kartın üç sorudan ÖNCE mi SONRA mı geldiği **belirsiz.**
   ⚠️ Bu, S2 metninin gerekçesini etkiler (aşağıya bakınız).
3. **Tutarlılık kontrolü (kod kalemi):** tüm boyutlarda uç-yüksek seçen profil
   şüpheli → kişilik ağırlığı %12'de kalır, derinleşme öne çıkar. **Engelleme YOK.**
4. **Senaryoların koda geçmesi** — ayrı tur; şu an kodda 8 hardcoded DISC sorusu var
   (`onboardingController.ts:109-190`), MOST_LEAST mekanizması onboarding'e bağlı değil.

**⭐ DÜŞÜRÜLEN KALEM (kayda geçsin, silinmesin):**
*"Kalibrasyonda arketip ↔ S2 bağını ölç"* kalemi **DÜŞTÜ.** Gerekçesi kartın üç
sorudan ÖNCE gelmesiydi; yeni akışta kart sonraya alındı, dolayısıyla **ölçülecek
bir yankı yok.**
⚠️ **S2 metni yine de NÖTR kalır** — gerekçesi değişti: kişi 15 senaryo çözmüş,
kendi hakkında düşünme modunda; "nasıl bir destek istersin" sorusu o modu bozmasın.

---

