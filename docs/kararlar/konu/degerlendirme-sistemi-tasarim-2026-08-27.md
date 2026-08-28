# Değerlendirme + Eşleştirme Sistemi — Tasarım Belgesi

> 🔄 **YAŞAYAN BELGE**
>
> **Bu belge iki turda yazıldı. Bölüm 9-16 Tur B'de eklenecek.**
>
> Bu belge, strateji oturumunda verilen ve akademik araştırmayla
> doğrulanan değerlendirme + eşleştirme sistemi kararlarını tek yerde
> toplar. Kaynak keşif raporları:
> - `docs/kararlar/konu/kesif/eslestirme-motoru-kesfi-2026-08-27.md`
> - `docs/kararlar/konu/icerik/tam-soru-dokumu-2026-08-26.md`
>
> **Kapsam notu:** Bu belge kararları KAYDEDER. Tasarımı yorumlamaz,
> öneri getirmez. Eksik/karara bağlanmamış noktalar `⚠️ AÇIK` ile
> işaretlidir — bu turda doldurulmamıştır.

---

## Bölüm 1 — Neden Yeniden Tasarım

Keşif bulguları (kaynak: `kesif/eslestirme-motoru-kesfi-2026-08-27.md` +
`icerik/tam-soru-dokumu-2026-08-26.md`):

- Canlı formül basit etiket kesişimi + DISC matris.
- Psikometrik sabitlerin hiçbirinin gerekçesi belgelenmemiş.
- SJT hesaplanıyor ama canlı eşleştirmede okunmuyor (madde 101).
- DEEPENING baskın boyuttan geliyor → profil pekişiyor, netleşmiyor
  (PO fikrinin TERSİ).
- Sektör skoru asimetrik: payda mentinin etiket sayısı → profilini iyi
  dolduran menti cezalandırılıyor.
- Kalite çarpanı iki kez uygulanıyor (olası hata).

---

## Bölüm 2 — Model Kararı

**KARAR:** DISC bırakıldı. **B modeli** benimsendi.

- **GÖRÜNEN YÜZ:** kendi arketiplerimiz.
- **MOTOR:** Big Five (OCEAN) — kullanıcı boyut yüzdesi GÖRMEZ.
- Havuzda **EŞLEŞME yüzdesi GÖRÜNÜR** (%87 gibi) — PO isteği.

**GEREKÇE (araştırma turu):**

- DISC, Marston'ın 1928 kitabına dayanır; bağımsız akademik
  değerlendirmeler yordayıcı geçerliğin gösterilmediğini belirtir.
  "Tip uyumu" iddiasının ampirik dayanağı yok.
- Big Five, psikolojinin en iyi doğrulanmış modeli.

> ⚠️ **DÜRÜSTLÜK SINIRI:** "bilimsel olarak doğrulanmış test" DENMEZ.
> Denebilecek: "Big Five modeline dayanır, kendi verimizle kalibre
> edilecektir."

**LİSANS:**

- **IPIP** kamu malı, ticari kullanım dahil ücretsiz → madde kaynağımız.
- **BFI-10** ticari kullanıma KAPALI.
- **TIPI** serbest ama iç tutarlılığı düşük.

> ⚠️ Türkçe uyarlamanın geçerliği kendi örneklemimizde ayrıca
> doğrulanmalı.

---

## Bölüm 3 — Arketipler

**Seçilen set: METAFOR** (PO kararı)

- **Mentör:** Mimar · Ayna · Liman · Pusula
- **Menti:** Rotacı · Kâşif · Denge Arayan · İz Açan

**Gösterim: BASKIN + İKİNCİL**

> "Sen bir Limansın — Ayna tarafın da güçlü."

Kodda M1-M4 / m1-m4 arketip iskeleti zaten VAR (keşif §6).

### Mentör Arketipleri (SJT şıklarından türedi)

- **Mimar** — hatayı net gösterir, adım adım düzeltme planı sunar
  (yüksek sorumluluk + açıklık).
- **Ayna** — önce dinler, soruyla kendi bulmasını sağlar
  (açıklık + sıcaklık).
- **Liman** — emeği takdir eder, endişeyi nazikçe söyler
  (çok yüksek uyumluluk).
- **Pusula** — doğrudan söyler, yön verir
  (düşük uyumluluk + yüksek sorumluluk).

### Menti Arketipleri

- **Rotacı** — belirsizlikte hemen sistematik plan yapar
  (çok yüksek sorumluluk).
- **Kâşif** — heyecanlanır, dallanır, kurcalar
  (çok yüksek açıklık).
- **Denge Arayan** — netlik ister, zemini sağlamlaştırır
  (yüksek hassasiyet).
- **İz Açan** — fırsat görür, kendi yorumunu katar
  (açıklık + dışadönüklük, düşük uyumluluk).

> ⚠️ **İSİMLENDİRME KURALI:** hiçbir arketip aşağılayıcı olmayacak.
> "Denge Arayan" ve "İz Açan" onurlu dille anlatılacak — "kaygılı" veya
> "ukala" gibi okunmamalı.

> ⚠️ **ETİKETLEME RİSKİ (araştırma):** Barnum etkisi (Forer 1949) ve
> etiketleme riski gerçek. Kullanıcıya "sen busun" değil "bu bir eğilim"
> dili kullanılacak.

> ⚠️ **AÇIK:** "İz Açan" adı PO tarafından kesinleşmedi.

---

## Bölüm 4 — Ölçme Yöntemi

**KARAR:** Likert 1-5 KALKTI → senaryo + şık.

### Senaryo Anatomisi

- Sahne 2-3 cümle, ikinci tekil şahıs, şimdiki zaman.
- Gündelik an (çekirdekte mentörlük senaryosu KULLANILMAZ).
- 4 şık, her biri bir arketibin doğal davranışı.
- Seçim: "en çok ben" + "en az ben".
- Bazı senaryolarda "ikinci yakının hangisi?".

### Yazım Kuralları (5, hepsi sert)

1. **Rol giydirme YASAK** — kişi kendi personasını yaşar.
   - ❌ "Bir yönetici olduğunu düşün"
   - ✅ "İlk kez katıldığın bir toplantıdasın"
2. **Doğru cevap kokusu YASAK** — 4 şık da makul, savunulabilir.
3. **Sahne gündelik** — aşırı duygusal sahne persona tetikler.
4. **Kısa** — uzun hikâye hikâyeye tepki verdirir.
5. **Ne ölçtüğü belli olmasın.**

**NEDEN MENTÖRLÜK SENARYOSU DEĞİL:** "mentin sana bir sorunla geldi"
diye sorulursa kişi "iyi bir mentör ne yapardı" diye düşünür, kendini
değil. Mentörlük senaryoları sertifikada ve öğrenme yolculuğunda zaten
var.

**PUANLAMA:** en çok = tam ağırlık · en az = yarım ters ağırlık.
Kodda MOST_LEAST mekanizması çalışıyor (+1.0 / −0.5).

> ⚠️ **İPSATİF UYARISI (araştırma bulgusu, ÇÖZÜLMEDİ):** Zorunlu seçim
> kişiler-arası karşılaştırmayı zorlaştırır; eşleştirme tam da onu yapar.
> Literatürdeki çözüm (Thurstonian IRT) bizim ölçeğimiz için ağır.

> ⚠️ **AÇIK:** karma format (bazı senaryolar normatif, bazıları
> en-çok/en-az) tasarlanacak.

**ACQUIESCENCE:** dengeli ölçek (düz + ters kodlu madde) + dikkat kontrol
maddesi. Ters madde oranı abartılmayacak (yapay faktör riski — literatür
uyarısı).

---

## Bölüm 5 — Çekirdek: 12 Senaryo ⭐

İlk oturum: 12 senaryo, ~5-6 dk, sonunda arketip kartı.
Herkes AYNI 12 soruyu görür (karşılaştırma için ŞART).
Aynı senaryolar hem mentöre hem mentiye sorulur.

> ⚠️ Parantez içindeki boyut notu **İÇ NOTTUR, kullanıcıya GÖSTERİLMEZ.**
> Belgede kalır.

### [1]

Bir arkadaşın seni tanımadığın bir kalabalığa davet etti. Kapıdan girdin,
kimseyi tanımıyorsun.
**İçinden ne geçer?**

- **A —** Etraftaki gruplara bakıp en rahat görüneni seçer, yanına giderim.
- **B —** Bir köşede durup ortamı çözerim, sonra karar veririm.
- **C —** Beni davet edeni bulur, onun üzerinden tanışırım.
- **D —** Kimseyi tanımıyor olmak hoşuma gider, sıfırdan başlarım.

*(A dışadönüklük · B temkin · C uyumluluk · D açıklık)*

### [2]

Bir işi bitirmene iki gün var. Bugün başlarsan rahat yetişir, ama canın
hiç istemiyor.
**Ne yaparsın?**

- **A —** Az da olsa başlarım, ivme önemli.
- **B —** Yarın toparlarım, baskı altında daha iyi çalışıyorum.
- **C —** Küçük parçalara bölüp ilkini bugün bitiririm.
- **D —** Önce ortamı hazırlarım, sonra oturur bakarım.

*(A+C sorumluluk · B düşük sorumluluk · D erteleme eğilimi)*

### [3]

Bir konuda emin olduğun bir şey söyledin. Karşındaki kibarca "ben öyle
düşünmüyorum" dedi.
**İlk tepkin ne olur?**

- **A —** Neden öyle düşündüğünü sorarım, merak ederim.
- **B —** Kendi gerekçemi daha net anlatırım.
- **C —** Belki haklıdır diye bir an duraklarım.
- **D —** Konuyu uzatmam, herkes farklı düşünebilir.

*(A açıklık · B düşük uyumluluk · C hassasiyet · D çatışmadan kaçınma)*

### [4]

Planladığın bir gün, sabah gelen bir haberle tamamen değişti.
**Ne hissedersin?**

- **A —** Sinirlenirim, günü yeniden kurmak zorunda kalmak yorar.
- **B —** Umursamam, plan zaten değişebilir.
- **C —** Hemen yeni bir plan yaparım, boşlukta kalmak istemem.
- **D —** Belki daha iyi bir gün olur diye merak ederim.

*(A hassasiyet · B düşük sorumluluk · C sorumluluk · D açıklık)*

### [5]

Yakın bir arkadaşın, senin de katıldığın bir işte bariz bir hata yaptı.
Kimse fark etmedi.
**Ne yaparsın?**

- **A —** Baş başayken söylerim, bilmesi onun hakkı.
- **B —** Sessizce düzeltirim, konuyu açmam.
- **C —** Moralini bozmam, kendi fark etsin.
- **D —** Grup içinde konuşurum, herkesi ilgilendiriyor.

*(A dürüstlük+sıcaklık · B uyumluluk · C çatışmadan kaçınma · D düşük uyumluluk)*

### [6]

Uzun süredir merak ettiğin bir konuda ücretsiz bir etkinlik var ama
tanıdığın kimse gitmiyor.
**Ne yaparsın?**

- **A —** Tek başıma giderim, konu yeterli sebep.
- **B —** Birini ikna etmeye çalışırım.
- **C —** Kaydolurum ama gün gelince kararsız kalırım.
- **D —** Vazgeçerim, yalnız gitmek keyif vermiyor.

*(A açıklık · B dışadönüklük · C kararsızlık · D düşük açıklık)*

### [7]

Bir grup işinde birinin üzerine düşeni yapmadığını fark ettin. İş sana
kalıyor.
**Ne yaparsın?**

- **A —** Doğrudan konuşurum, böyle sürmesin.
- **B —** Ben yaparım, tartışmaya değmez.
- **C —** Herkesin önünde durumu ortaya koyarım.
- **D —** Bir süre bekler, kendi toparlar mı diye bakarım.

*(A açıklık+kararlılık · B uyumluluk · C düşük uyumluluk · D temkin)*

### [8]

Yeni bir şey öğrenmeye başladın ve ilk denemede hiç iyi gitmedi.
**Ne düşünürsün?**

- **A —** Normal, ilk deneme böyledir.
- **B —** Yönteme bakarım, yanlış yerden başlamış olabilirim.
- **C —** Bu benim işim değil galiba diye geçer içimden.
- **D —** Daha çok çalışırım, olana kadar bırakmam.

*(A duygusal denge · B analitiklik · C hassasiyet · D sorumluluk)*

### [9]

Bir şeyi anlatırken karşındakinin dikkatinin dağıldığını fark ettin.
**Ne yaparsın?**

- **A —** Kısa keserim, ilgisini zorlamam.
- **B —** Daha ilgi çekici anlatmaya çalışırım.
- **C —** Sorarım: "sıkıcı mı geldi?"
- **D —** Devam ederim, bitirmem gerekiyor.

*(A uyumluluk · B dışadönüklük · C açıklık+sıcaklık · D sorumluluk)*

### [10]

Uzun süredir hayalini kurduğun bir fırsat çıktı ama hazır hissetmiyorsun.
**Ne yaparsın?**

- **A —** Atlarım, hazır hissetmeyi beklersem hiç olmaz.
- **B —** Eksiklerimi listeler, hızlıca kapatmaya çalışırım.
- **C —** Bu seferi pas geçerim, bir dahakine daha hazır olurum.
- **D —** Güvendiğim birine sorarım, ne diyeceğini merak ederim.

*(A açıklık+cesaret · B sorumluluk · C hassasiyet · D uyumluluk)*

### [11]

Bir yerde beklemek zorundasın, ne kadar süreceği belli değil.
**Ne yaparsın?**

- **A —** Telefonu açar, vakti değerlendiririm.
- **B —** Ne kadar süreceğini öğrenmeye çalışırım.
- **C —** Rahatsız olurum, belirsiz bekleme yorar.
- **D —** Etrafı izlerim, beklemek beni germez.

*(A pratiklik · B kontrol ihtiyacı · C hassasiyet · D duygusal denge)*

### [12]

Bir konuda seni öven bir geri bildirim aldın ama bir de "şurası eksikti"
dendi.
**Aklında hangisi kalır?**

- **A —** Eksik olan kısım, orayı düşünürüm.
- **B —** Övgü, iyi hissettirir.
- **C —** İkisi de, dengeli bir geri bildirimdi.
- **D —** Eksiği kimin söylediği, ona göre değerlendiririm.

*(A hassasiyet · B duygusal denge · C dengeli algı · D temkin)*

### Denge Tablosu

| Boyut | Senaryo sayısı |
|---|---|
| sorumluluk | 5 |
| açıklık | 5 |
| uyumluluk | 5 |
| hassasiyet/denge | 6 |
| dışadönüklük | 3 |

Dışadönüklük bilinçli olarak zayıf — en kolay ölçülen ve en çok "kendini
iyi gösterme" davetiye çıkaran boyut. Derinleşme havuzunda tamamlanır.

> ⚠️ **AÇIK / DÜRÜST SINIR:** 12 senaryo × 2 sinyal = 24 sinyal, boyut
> başına ~5. Psikometrik olarak İNCE. Bilinçli takas: çok soru = doğru
> ölçüm ama kişi yarıda bırakır → hiç ölçüm olmaz. Az soru = kaba ölçüm
> ama kişi bitirir. Telafi: ikinci katman (Bölüm 6).

---

## Bölüm 6 — Derinleşme Katmanı

Her girişte isteğe bağlı 1-2 senaryo, oyun gibi.
Havuz 30-40'tan başlar, 100+'e büyür.

**BÜYÜME MANTIĞI:** "çok soru" değil "**BOYUT KAPATMA**".
5 boyut × 2 rol (mentör/menti) × 3-4 senaryo = 30-40 başlangıç.

**SEÇİM KURALI:** profil TİPİNE göre değil, profil BELİRSİZLİĞİNE göre.
Sistem kimin hangi boyutunun bulanık olduğunu bilir, o boyuta ait senaryo
gelir. Netleşince başka boyuta geçer. Rastgele soru GELMEZ.

Kaç senaryo sonra profil oturur: kabaca 20-25 sinyal daha, yani 10-12
derinleşme senaryosu. Haftalara yayılır.

> ⚠️ **MEVCUT PEKİŞTİRME SORUNU (kod gerçeği, keşif §6):** DEEPENING bugün
> BASKIN boyuttan geliyor → ilk 5 cevap kilitleniyor, karakter netleşmiyor
> PEKİŞİYOR. Bu, PO'nun "kullandıkça netleşsin" fikrinin TERSİ. Yeni
> tasarım: EN BELİRSİZ boyuttan sorulacak VE profili AŞAĞI çekebilecek.

> ⚠️ `triggersOn` alanı kodda VAR ama okuyan kod YOK (madde 125) —
> canlandırılacak.

> ⚠️ **AÇIK:** sınırsız yeniden-derinleşme davranışı — her tur profili
> değiştiriyor, sınır yok (G3-03). Karara bağlanmadı.

---

## Bölüm 7 — Sertifika

**FELSEFE (PO kararı):** Sertifika bir ELEME SINAVI DEĞİL, öğretimin SON
TEKRARIDIR. EZBER SORUN DEĞİL — kişi doğru davranışı öğrenmişse ürün işini
yapmıştır.

### Kurallar

- Havuzdan 8 senaryo çekilir.
- 4 kritik konudan (geri bildirim · sınır · gizlilik · kriz) BİRER TANE
  GARANTİLİ — kritik konu şansa bırakılmaz.
- Kalan 4'ü diğer 6 konudan rastgele.
- Günde 2 deneme, 3.'ye bekleme süresi (PO kararı).
- ⭐ **HATALI-KONU HEDEFLEME:** yanlış yapılan konu, tekrar denemede DİĞER
  VARYANTIYLA gelir — bugün YOK, eklenecek.
- Cevaplar gösterilir (ezber felsefesi gereği).

### Mevcut Kod Durumu

- 10 konu × 2 varyant = 20 senaryo VAR.
- Cooldown VAR.
- Hatalı-konu hedefleme YOK ← eklenecek.
- Hedef: varyantlar 3-4'e çıkacak.

> ⚠️ Güvenli seed runner YOK (madde 73) → madde 30 bloke.

---

## Bölüm 8 — Öğrenme Yolculuğu ↔ Sertifika Ayrımı

- **Öğrenme = ANTRENMAN SAHASI** (puansız, anında geri bildirim, hata ucuz).
- **Sertifika = EHLİYET SINAVI** (puanlı, eşikli, geri bildirim sonda).

> ⚠️ **MEVCUT SORUN:** 7 mentör aşamasının 6'sı sertifika senaryolarıyla
> neredeyse AYNI durumu anlatıyor: kriz · gece mesajları · kırılgan menti ·
> gönüllü tükenmişliği · sınav dönemi · cevabı buldurma. Yolculuğu bitiren
> sertifikayı EZBERDEN geçiyor.

**ÇÖZÜM:** sıfırdan yazım DEĞİL — AYNI PRENSİP, FARKLI YÜZEY.
Örnek: öğrenme sınır koymayı "gece mesajları"yla öğretsin; sertifika aynı
prensibi "arkadaşlık talebi"yle sınasın (bu varyant zaten VAR). Varyant
yeniden dağıtımı yeter.

**İSİMLER:** unisex (Deniz gibi). Anlatılan kişi hep aynı ad, karşı taraf
isimsiz ("mentörün" / "mentin").

> ⚠️ STK'nın ismi özelleştirmesi: altyapı YOK — isimler metin içine gömülü
> sabit string, şablon değişkeni yok. İleri madde adayı.

> ⚠️ Mevcut menti personası TEK TİP (hep kırılgan, gergin, tükenmiş).
> Gerçekte menti bazen fazla iddialıdır, bazen mesafelidir. Tek tip menti,
> tek tip mentör yetiştirir. Çeşitlendirilecek.

---

## Bölüm 9-16 — Tur B'de eklenecek

> Bu belge iki turda yazıldı. Aşağıdaki bölümler bir sonraki turda
> (Tur B) bu branch'e eklenecek: algoritma, veri boşluğu, süreç, göç,
> kalibrasyon, açık kararlar, senkron.

