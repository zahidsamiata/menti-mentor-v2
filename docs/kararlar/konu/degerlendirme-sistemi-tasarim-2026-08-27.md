# Değerlendirme + Eşleştirme Sistemi — Tasarım Belgesi

> 🔄 **YAŞAYAN BELGE**
>
> **Bu belge iki turda yazıldı: Bölüm 1-8 (Tur A) + Bölüm 9-16 (Tur B).**
>
> Bu belge, strateji oturumunda verilen ve akademik araştırmayla
> doğrulanan değerlendirme + eşleştirme sistemi kararlarını tek yerde
> toplar. Kaynak keşif raporları:
> - `docs/raporlar/kesif/eslestirme-motoru-kesfi-2026-08-27.md`
> - `docs/raporlar/icerik/tam-soru-dokumu-2026-08-26.md`
>
> İlgili karar kartları (bilanço, DEĞİŞTİRİLMEDİ — yalnız referans):
> - `docs/raporlar/bilanco/kararlar/G2-eslestirme-psikometri.md` (eşleştirme/psikometri)
> - `docs/raporlar/bilanco/kararlar/G3-icerik.md` (içerik/derinleşme; G3-03 sınırsız yeniden-derinleşme)
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
- ~~[ESKİ · 2026-08-27] Kalite çarpanı iki kez uygulanıyor (olası hata).~~ ⚠️ GÜNCELLEME (2026-08-29): ÇÜRÜTÜLDÜ — çift-çarpım YOK (her bileşen bir kez: `scoring.ts:109` + `matching.ts:307`). Detay: §9.5. Kaynak: Faz 3c, PR #138.

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

## Bölüm 9 — Eşleştirme Algoritması ⭐ ANA BÖLÜM

### 9.1 Katman Ağırlıkları (araştırma sonrası revize)

| Katman | Ağırlık | İçerik |
|---|---|---|
| Hedef & değer uyumu | %45 | menti ne arıyor ↔ mentör ne verebiliyor · ortak öncelik · yaklaşım hizası |
| Alan/uzmanlık | %30 | sektör · beceri · çatılı etiket |
| Kişilik | %25 | 9.2'deki beş kural |
| Zorunlu kısıtlar | filtre | dil · uygunluk · kapasite — skor DEĞİL, ELEME |
| Kalite çarpanı | ×0.8-1.2 | sertifika + geçmiş, BİR KEZ uygulanır |

> ⚠️ **ÖNCEKİ TASARIM YANLIŞTI:** karakter %50 idi → %25. Gerekçe:
> Dyrenforth, Kashy, Donnellan & Lucas (2010, *Journal of Personality and
> Social Psychology* 99(4):690-702; üç ülke, N>20.000) kişilik
> BENZERLİĞİNİN, actor ve partner etkileri kontrol edildiğinde ilişki
> tatminini yordamada tutarlı katkısı olmadığını buldu.

> ⚠️ ESKİ %60/40 oranın gerekçesi hiçbir belgede YOKTU (madde 103,
> dört-belge çapraz teyit).

### 9.2 Kişilik İçi Dağılım (%25'in içi)

| Boyut | Pay | Kural | Dayanak |
|---|---|---|---|
| Uyumluluk | %8 | Mentörde 45-75 bandı ideal | partner ana etkisi + aşırı uyumluluk sınır koymayı zorlaştırıyor (Cavell ve ark. 2020; Younginer & Elledge 2021) |
| Duygusal denge | %7 | İKİ TARAFTA DA YÜKSEK | totality modeli (2024): çiftteki nörotisizm toplamı düştükçe tatmin artıyor |
| Sorumluluk | %6 | İki tarafta yüksek + benzerlik küçük bonus | ana etki güçlü, benzerlik zayıf |
| Açıklık | %3 | MENTÖRDE YÜKSEK + aşırı fark cezası | mentörlüğe özgü en tutarlı bulgu (Bozionelos 2004) |
| Dışadönüklük | %1 | Hafif fark iyi | en zayıf boyut (Malouff ve ark. 2010, r≈.06) |

> ⚠️ **İKİ KURAL ARAŞTIRMA TARAFINDAN ÇÜRÜTÜLDÜ:**
> 1. "Duygusal dengede TAMAMLAYICILIK" YANLIŞTI → iki tarafta da yüksek
>    olmalı. Complementarity lehine ampirik destek bulunamadı.
> 2. "Sorumlulukta BENZERLİK" kısmen yanlış → asıl kanıt ana etkide.

### 9.3 Vetolar (2 — yalnız ZARAR riski)

- **V1:** Mentör uyumluluk <30 VE menti duygusal denge <35 → kırıcı mentör
  + kırılgan menti.
- **V2:** Mentör duygusal denge <30 VE menti <30 → iki fırtına, mentör
  taşıyamaz.

**GEVŞEME:** havuzda başka aday yoksa UYARIYLA gösterilir, tamamen
gizlenmez (kodda kademeli fallback zaten var).

> ⚠️ Eski "D mentör + S menti" vetosu KALDIRILDI — dayanaksızdı.

### 9.4 Sektör Asimetri Düzeltmesi

**BUGÜN:** payda = MENTİNİN etiket sayısı → profilini iyi dolduran menti
CEZALANDIRILIYOR (2 etiketli kolayca %100, 10 etiketli aynı mentörle %20).

**DÜZELTME:** payda = İKİ TARAFIN ETİKET BİRLEŞİMİ.

**EK:** çatılı eşleşme — aynı etiket tam puan, aynı çatı altında
(yazılım↔teknoloji) kısmi puan. IndustryNode/LCA mantığı kodda YAZILI ama
bağlı DEĞİL.

### 9.5 Kalite Çarpanı

~~[ESKİ · 2026-08-27] Bugün İKİ KEZ uygulanıyor (bonus kısmında tekrar) — olası hata, düzeltilecek.~~
⚠️ GÜNCELLEME (2026-08-29): **ÇÜRÜTÜLDÜ.** Kod teyidi: `scoring.ts:109` `base × qm` (bir kez) +
`matching.ts:307` `bonus × qm` (AYRI bileşen, bir kez) = `(base + bonus) × qm`. Skorda `qm²` YOK;
her bileşen tam bir kez çarpılır → çift-çarpım HATASI yok. Kaynak: Faz 3c kod-teyidi, PR #138.
**Terim değil ÇARPAN kalacak** (bu karar geçerli).
⭐ **Faz 5'e kalan GERÇEK soru (hata değil, karar verilecek nüans):** bonus'un çarpana tabi olması
(`(base+bonus)×qm`) bilinçli TASARIM tercihi mi, yoksa istenmeyen yan etki mi? Faz 5 algoritma turunda karara bağlanacak.

### 9.6 Tek Satır Formül (yeni)

```
skor = [ hedef×0.45 + alan×0.30 + kişilik×0.25 ] × kaliteÇarpanı
```

(veto varsa skor ezilir; zorunlu kısıtlar önce filtreler)

---

## Bölüm 10 — Veri Boşluğu ve Üç Soru ⭐

### 10.1 Bulgu

Eşleştirmede en güçlü sinyal "deep-level similarity" — tutum, değer,
inanç, hedef benzerliği.
Kaynak: Eby ve ark. (2013, *Psychological Bulletin* 139(2):441-476; 173
örneklem, N=40.737): ρ=.38-.59. Demografik benzerlik ANLAMSIZ (ρ=.00-.09).

Olumsuz mentörlük deneyimlerinin merkezinde de aynı şey: Eby ve ark.
(2000) — protégélerin en kötü deneyimlerinde ortak tema "dyad içi
uyumsuzluk" (değer/tutum farkı).

> ~~[ESKİ · 2026-08-27] **BİZİM SORUNUMUZ:** Bu veriyi TOPLAMIYORUZ. Sistemde sektör etiketi var; "menti ne arıyor", "mentör ne verebiliyor", "öncelikleri örtüşüyor mu" YOK. En güçlü sinyali ölçmüyoruz.~~
>
> ⚠️ GÜNCELLEME (2026-08-29, S21 envanter): "Hiç toplamıyoruz" **KISMEN BAYAT.** Menti ihtiyacı **KONU düzeyinde toplanıyor** (`expectationCategories`, 6 kategori — `frontend/.../ProfileStep.tsx:215`, canlı gate `matching.ts:278`). TOPLANMAYAN: ihtiyaç-TİPİ (S1) + mentör fayda beyanı + öncelik/değer (S3). Doğrusu: "kısmen var, ekseni farklı". Kanıt: `raporlar/kesif/profil-envanteri-2026-08-29.md`.
>
> ⚠️ **CÜMLE SİLİNMEDİ (bilerek):** bu tespit üç sorunun GEREKÇESİYDİ; silinirse "neden bu soruları ekledik" izi kaybolur ve ileride biri "zaten expectationCategories var" deyip işi iptal edebilir. Üstü çizili bırakıldı.

### 10.2 Üç Soru (PO kararı — tasarlandı)

Tasarım ilkesi: testi 30 dk'dan 6 dk'ya indirdik; araya 10 dk'lık form
koyarsak kazandığımızı geri veririz. Yeni veri toplanacak ama YÜK
EKLENMEYECEK. ~40 saniye. Hepsi SEÇMELİ — serbest metin DEĞİL (algoritma
okuyamaz + KVKK'da özel nitelikli veri riski).

**MENTİ'YE:**

- **S1.** "Şu an en çok neye ihtiyacın var?" (en fazla 2 seç)
  - Ne yapacağıma karar veremiyorum
  - Belirli bir beceride takıldım
  - Kendime güvenmiyorum
  - Doğru insanları tanımıyorum
  - Sadece konuşacak biri lazım
- **S2.** "Nasıl bir destek istersin?" (1 seç)
  - Bana yol göstersin
  - Birlikte düşünelim
  - Sadece dinlesin, ben çözerim

**MENTÖR'E:**

- **S1.** "En çok neyde faydalı olabilirsin?" (en fazla 2 seç)
  - Yön bulmada · Belirli becerilerde · Özgüven kazanmada · Ağ kurmada · Dinlemede
- **S2.** "Nasıl bir mentörsün?" (1 seç)
  - Yol gösteririm · Birlikte düşünürüz · Dinlerim, çözümü o bulur

**İKİSİNE ORTAK:**

- **S3.** "Bu süreçte senin için en önemlisi ne?" (1 seç)
  - Somut sonuç almak · Öğrenmek · Anlaşılmak · Yeni bakış açısı

**NEDEN BU ÜÇÜ:**

- **S1** → ihtiyaç-yeterlilik eşleşmesi ("ağ kurmak istiyorum" ↔ "ağ
  kurmada faydalı olurum"). Bugün hiç bilinmiyor.
- **S2** → yaklaşım hizası. Yönlendirilmek isteyen menti + "kendi bulsun"
  diyen mentör KÖTÜ çift, bugün görünmüyor.
- **S3** → değer yakınlığı.

#### ✅ İKİ ÇAKIŞMA — KARARA BAĞLANDI (PO, 2026-08-29)

S21 envanteri (`raporlar/kesif/profil-envanteri-2026-08-29.md`) mevcut alanlarla iki kısmi çakışma buldu. PO ikisini de karara bağladı:

**KARAR 1 · `expectationCategories` ↔ S1-menti → YAN YANA DURUR.**
- Farklı eksenler: `expectationCategories` KONU (Kariyer/Teknik/İş-Staj/Girişimcilik/Kişisel/Sektör), S1 İHTİYAÇ TİPİ (karar veremiyorum / beceride takıldım / güvenmiyorum / tanımıyorum / konuşacak biri). Bir menti "Kariyer konusunda karar veremiyorum" der — ikisi birden.
- `expectationCategories` DEĞİŞMEZ (canlı gate, `matching.ts:278`). `mentiNeeds` YENİ alan olarak eklenir.
- ⚠️ **KAYDA (düzeltildi 2026-08-29):** ~~çift-ağırlık riski — ikisi de "menti ne istiyor" sinyali, TEK KEZ ağırlıklandırılmalı.~~ Doğrulama turu (`matching.ts:278-280`) gösterdi ki `expectationCategories` bir **GATE**'tir (ortak beklenti yoksa aday `continue` ile ELENİR, skora ağırlık KATMAZ); `mentiNeeds` ise skor bileşeni olacak. → **İkisi FARKLI MEKANİZMA (gate vs ağırlık), üst üste ağırlık binmiyor** — "çift-ağırlık" çerçevesi yanlıştı. KARAR 1 aynen geçerli.
  - ⚠️ Faz 5 için kalan GERÇEK soru (açık kalem, PO numaralandıracak): gate (eleme) ile skor aynı sinyali iki kez cezalandırıyor mu — yani ortak-beklentisi-olmayan aday hem eleniyor hem düşük skor alıyor mu?

**KARAR 2 · `interactionStyle` ↔ S2 → YENİ ALAN, ESKİSİ DONDURULUR.** *(REVİZE — PO, 2026-08-29)*
- Yeni alan: `supportApproach`, 3 değer (yol gösterme / birlikte düşünme / dinleme).
- ⭐ **HER İKİ ROLDE sorulur:** menti "nasıl destek isterim", mentör "nasıl mentörüm". Gerekçe (PO): eşleştirmenin değeri İKİ TARAFIN KARŞILAŞTIRILMASINDA; mevcut `interactionStyle` yalnız mentörde olduğu için hizalama ölçülemiyor.

> ~~[ESKİ · 2026-08-29] Mentöre ARTIK ESKİ SORU SORULMAZ; eski sütun `interactionStyle` ŞEMADA KALIR ve yeni alandan TÜRETİLİR (yol gösterme→Görev · birlikte düşünme→Sohbet · dinleme→Sohbet). Eşleme kayıplı (3→2). ⚠️ GEÇİCİ KÖPRÜ: tek amacı canlı +10 bonus (`matching.ts:288`) kırılmasın.~~
>
> ⚠️ GÜNCELLEME (2026-08-29, doğrulama turu — PR #141): **KÖPRÜ İPTAL.** Türetme YAPILMAYACAK. Neden:

- **KANIT — bonus zaten FİİLEN ÖLÜ:** `matching.ts:288-292` bonusu iki tarafı karşılaştırıyor (`c.interactionStyle === opts.mentorInteractionStyle`) AMA menti tarafı hiç toplanmıyor (`ProfileStep.tsx:104` → `role === 'MENTOR'` koşulu) → `c.interactionStyle` **hep null** → bonus **HİÇ TETİKLENMİYOR.** Köprü "canlı bonus kırılmasın" diye kurulmuştu; bonus zaten kırık.
- **Köprü canlıyı KORUMAZ, DEĞİŞTİRİR:** türetme yapılsaydı menti tarafı dolar, bonus **CANLANIRDI** → canlı sıralama davranışı değişirdi. **Bir veri turunda canlı skor davranışı değiştirilmez.**
- **YENİ KARAR:** `interactionStyle` **DONDURULUR** — mentöre eski soru SORULMAZ, sütun şemada KALIR, **TÜRETME YOK**, hiçbir yere yazılmaz. Faz 5'te motor `supportApproach` okumaya başlayınca sütun emekliye ayrılır.
- ⭐ **KAZANÇ:** köprü borcu **hiç doğmadı** (kaldırma borcu bir eksik). Donmuş sütun borcu, köprü borcundan daha kolay kaldırılır.
- **İŞ 0 bulgusu (dondurma güvenli mi):** `interactionStyle` `matching.ts` DIŞINDA **fonksiyonel olarak okunmuyor** — yalnız 2 pasif SELECT (`userController.ts:175` getUser DTO · `onboardingController.ts:330` onboarding yanıtı) + FE DTO tipi (`lib/api/profile.ts:33`; profil sayfası **render etmiyor**). Dondurulunca SELECT'ler null döner, hiçbir mantık/gösterim tüketmediği için **fonksiyonel etki YOK.** *(Pasif SELECT'lerin sonradan temizlenmesi açık kalem — PO numaralandıracak.)*

#### ✅ EKRAN KARARI — üç soru nereye konur (PO, 2026-08-29)

- Üç soru **KAYIT AKIŞININ SONUNA, arketip kartından HEMEN SONRA** konur.
- **Gerekçe (PO):** kişi "sen bir Limansın" görmüş, ilgisi taze, 40 saniye daha verir; formun ortasına konursa sürtünme olur.
- **Süre etkisi:** ilk oturum ~6 dk → ~7 dk.
- ⚠️ **ŞART (PO): S2 metni NÖTR yazılacak.** Sebep: kişiye az önce arketip etiketi verildi; "nasıl destek isterim" sorusu kişiliğe en yakın soru olduğu için kişi etikete uygun cevap verme eğilimine girebilir (Liman denen kişi "dinlesin" der, çünkü Liman öyle olmalı gibi gelir) → ölçüm bozulur. Metin arketipten bağımsız, davranışsal yazılacak. → İçerik oturumunun işi, ajan yazmaz.
- ⚠️ **AÇIK KALEM (PO numaralandıracak):** kayıt akışının sonunda sekmeyi kapatan kişi üç soruya CEVAPSIZ kalır. Migration additive olduğu için sistem çalışır (nötr) ama o kişiye SONRADAN SORMA YOLU YOK. Profil sayfasından tamamlama akışı gerekiyor mu — karar verilmedi.

> ⚠️ **FORM TURU KALEMİ (PO, 2026-08-30):** enum SABİTLERİ kesinleşti (`RESULT`/`LEARNING`/`UNDERSTOOD`/`PERSPECTIVE`, `MentiNeed`/`MentorStrength`/`SupportApproach` değerleri) ama KULLANICI METNİ form turunda keskinleştirilecek. Özellikle S3'te "öğrenmek" (`LEARNING`) ile "yeni bakış açısı" (`PERSPECTIVE`) aynı eksende bulanıklaşıyor — metin ayrımı form turunun işi.
> - ⭐ **Metin değişikliği MIGRATION GEREKTİRMEZ** (enum sabiti ≠ görünen metin) — bu ayrım kayda geçsin ki form turunda "migration lazım mı" tartışması çıkmasın.
> - **S2 metni NÖTR yazılacak** şartı (yukarıdaki ⚠️ ŞART) form turu kalemidir.
> - **`MentorStrength.DINLEME` ↔ `SupportApproach.DINLEME`** aynı sabit adını taşır (Postgres tip-kapsamlı, çakışma YOK) ama form metinleri AYRIŞMALI: mentör S1'de "dinlemede faydalı olurum" (bir güç), S2'de "dinlerim, çözümü o bulur" (bir yaklaşım) — ikisi farklı soru, kullanıcıya farklı okunmalı.

### 10.3 Görünürlük Kuralları (PO kararı)

| Kim | Ne görür |
|---|---|
| Karşı taraf, SEÇİM ekranında | Karşılıklı tercihler (S2 yaklaşım hizası, S3 ortak öncelik). İhtiyaç beyanı (S1) GÖRÜNMEZ |
| Mentör, EŞLEŞME KURULDUKTAN SONRA | Mentinin S1 cevabını görür — ilk görüşme boşa gitmesin |
| Dernek yöneticisi | YALNIZ TOPLU ("üyelerin %40'ı ağ kurmada destek arıyor"). Kişiye İNMEZ |
| Platform yöneticisi | Aynı kural — toplu |

**GEREKÇE:** kişi "kurum yöneticim bunu okuyacak" kaygısı taşımadan dürüst
cevap verir; ölçüm temiz kalır. Seçim ekranında kapalı olması oyunlanmayı
engeller — menti mentörün cevabını görürse kendini ona göre ayarlar.

> ⚠️ **K-ANONİMLİK:** toplu görünüm, kişi sayısı azken kişiyi ELE VERİR.
> Üç üyeli dernekte "%33 özgüven desteği arıyor" bir kişiyi işaret eder.
> Eşik gerekir (ör. 5 kişiden az olduğunda dağılım gösterilmez). Açık
> kalem: G1-22.

### 10.4 Serbest Özet Alanı

Kalıyor ama İŞİ FARKLI: algoritma için değil, İNSAN KARARI için. Araştırma
bulgusu: ilişki kalitesini besleyen şey GERÇEK benzerlikten çok ALGILANAN
benzerlik. Yani: seçmeli sorular SKORU üretir, özet alanı SEÇİMİ
kolaylaştırır.

> ⚠️ **AÇIK:** özet alanı yönergesi (ne yazılmalı) kesinleşmedi.

### 10.5 Bedava Kazanç — Eşleşme Kartı Metni

Üç soru cevaplandığında kartta şu yazılabilir:

> "İkiniz de birlikte düşünmeyi tercih ediyorsunuz. Sen ağ kurmada destek
> arıyorsun, o bu konuda deneyimli."

Bugünkü kart sadece yüzde gösteriyor. Bu cümle hem seçimi kolaylaştırır
hem ALGILANAN BENZERLİĞİ besler. Yeni veri gerektirmiyor — aynı üç sorudan
çıkıyor.

> ⚠️ **AYRIM:** karşılıklı tercihler kartta GÖRÜNÜR, ihtiyaç beyanı
> GÖRÜNMEZ (10.3 kuralı).

### 10.6 Ön Koşul

> ⚠️ Profilde bugün ne olduğu BİLİNMİYOR → önce envanter keşfi (S21). Ajan
> birkaç kez "yok" sanılan şeyin var olduğunu buldu; tasarımı keşiften önce
> kesinleştirme.

---

## Bölüm 11 — Süreç Tasarımı

**KARAR (PO):** Manuel eşleştirme YOK. Algoritma SEÇENEK SUNAR, mentör ve
menti KENDİ TERCİHLERİYLE görüşme kurar. (T8/76 çelişkisi bu kararla
kapandı.)

> ⭐ **ARAŞTIRMA BU KARARI DESTEKLİYOR:** eşleştirme sürecine katılım ve
> gönüllülük algısı ilişki kalitesini artırıyor (Allen/Ragins çizgisi;
> Allen, Eby, Lentz 2006). Saf otomatik atama dezavantajlı.

**COLD START:** havuz azken algoritma zorlanmaz, eşik altı öneri
gösterilmez.

**AKIŞ:**

- **Mentör:** kayıt → çekirdek (12 senaryo) → arketip kartı → öğrenme
  yolculuğu → sertifika → eşleşme
- **Menti:** kayıt → çekirdek → arketip kartı → eşleşme

**SÜRE BÜTÇESİ:** ilk oturum ~5-6 dk · üç soru ~40 sn · sonraki paketler
2-3 dk · mentör toplam ~13-15 dk (bugün ~30-38 dk)

---

## Bölüm 12 — Göç Planı

> ⚠️ **AÇIK — karar verilmedi.** Seçenekler:

- **(a)** Sıfırdan yeniden test — en temiz, kullanıcıya yük.
- **(b)** Mevcut DISC'ten Big Five türet — adaptör kodda VAR
  (`disc-to-ocean.adapter.ts`), yük yok, doğruluk düşük.
- **(c)** Karma.

Kullanıcı ~sıfır olduğu için ŞU AN UCUZ; canlıya çıktıktan sonra pahalı.

---

## Bölüm 13 — Kalibrasyon

> ⚠️ **DÜRÜST SINIR:** 50-100 eşleşmeyle ağırlıklar ÖĞRENİLEMEZ (5 boyutlu
> vektör için yüzlerce gözlem gerekir). Ağırlıklar literatürden SABİTLENİR,
> sadece YÖN KONTROLÜ yapılır: yüksek skorlu eşleşmeler daha uzun mu
> sürüyor?

**ANA METRİK:** ilişki süresi (match length). Youth mentörlük
literatüründe erken kopuş yaygın ve zararlı (Grossman & Rhodes 2002,
*American Journal of Community Psychology* 30(2):199-219).

**DİĞER:** görüşme sıklığı · memnuniyet · erken terk oranı · hedef
gerçekleşme.

**KALİBRASYON EŞİĞİ:** kişilik boyutlarının hiçbiri match length veya
ilişki kalitesiyle r>.10 göstermiyorsa, kişilik ağırlığı düşürülüp
hedef/değer ağırlığı artırılır.

---

## Bölüm 14 — Açık Kararlar

Belge boyunca `⚠️ AÇIK` işaretli her nokta burada NUMARALI toplanır, her
birinde `[ ] PO notu:`. **Kalan açık karar: 7** (madde 8 → 2026-08-29'da kapandı).

1. "İz Açan" arketip adı kesinleşmedi — `[ ] PO notu:`
2. Karma ölçüm formatı (ipsatif sorunu) tasarlanmadı — `[ ] PO notu:`
3. 12 senaryonun psikometrik inceliği — kabul edilen takas — `[ ] PO notu:`
4. Sınırsız yeniden-derinleşme sınırı (G3-03) — `[ ] PO notu:`
5. Özet alanı yönergesi — `[ ] PO notu:`
6. Göç planı (a/b/c) — `[ ] PO notu:`
7. K-anonimlik eşiği (kaç kişiden az olunca gizlensin) — `[ ] PO notu:` (S21 teyit: kodda YOK, `platformTenantController.ts:269`)
8. ✅ **KARARA BAĞLANDI (2026-08-29):** Profil envanteri (S21) yapıldı → `raporlar/kesif/profil-envanteri-2026-08-29.md`; iki çakışma karara bağlandı (§10.2 KARAR 1 expectationCategories yan yana · KARAR 2 supportApproach yeni + her iki rol, interactionStyle türetilir).

---

## Bölüm 15 — Dürüstlük Sınırları

- Eşikler (45-75 bandı, 20 puanlık farklar, %45/30/25 ağırlıkları) MESLEKİ
  MUHAKEMEDİR, ampirik değil. Eskisinden farkı: gerekçesi YAZILI ve yanlış
  çıkarsa neyin düzeltileceği belli.
- Dyadic literatürün çoğu romantik çift/arkadaşlıktan; mentörlüğe
  genellemede dikkat. Ama mentörlüğe özgü meta-analiz (Eby 2013) aynı
  yönde.
- "Aşırı uyumluluk → geri bildirim zorluğu" doğrudan mentörlük kanıtı
  ZAYIF, yakınsak kanıtla sınırlı.
- Türkçe uyarlama geçerliği kendi örneklemimizde ayrıca doğrulanmalı.
- "Bilimsel olarak doğrulanmış test" DENMEZ.

---

## Bölüm 16 — Kalem Listesi (KURAL 9)

Bu belgeden çıkan her kalem: **kalem · durum · numara-adayı-mı**

| # | Kalem | Önerilen durum | Numara adayı mı |
|---|---|---|---|
| 1 | Katman ağırlıkları revizyonu (%45/30/25) — canlı formüle bağla | ⬜ AÇIK | evet |
| 2 | Kişilik içi dağılım kuralları (9.2) uygulanacak | ⬜ AÇIK | evet |
| 3 | Duygusal denge "tamamlayıcılık" kuralı çürütüldü → iki tarafta yüksek | ⬜ AÇIK | evet |
| 4 | İki veto (V1/V2) + kademeli gevşeme uygula | ⬜ AÇIK | evet |
| 5 | Eski "D mentör + S menti" vetosu kaldır | ⬜ AÇIK | evet |
| 6 | Sektör asimetri düzeltmesi (payda = etiket birleşimi) | ⬜ AÇIK | evet |
| 7 | Çatılı eşleşme — IndustryNode/LCA mantığını bağla | ⬜ AÇIK | evet |
| 8 | Kalite çarpanı çift-uygulama hatasını düzelt | ⬜ AÇIK | evet |
| 9 | Üç soru (S1/S2/S3 menti+mentör) veri toplama ekle | ⬜ AÇIK | evet |
| 10 | Görünürlük kuralları (10.3) uygula | ⬜ AÇIK | evet |
| 11 | K-anonimlik eşiği (G1-22) belirle | ❓ TEYİT GEREK | evet |
| 12 | Eşleşme kartı metni (10.5) — algılanan benzerlik cümlesi | ⬜ AÇIK | evet |
| 13 | Profil/hedef verisi envanter keşfi (S21) — üç soru ön koşulu | ⬜ AÇIK | evet |
| 14 | Manuel eşleştirme yok kararı (T8/76 kapandı) | ✅ YAPILDI (KOD DIŞI — karar) | hayır |
| 15 | Göç planı (a/b/c) seç | ❓ TEYİT GEREK | evet |
| 16 | Kalibrasyon yön-kontrolü metrikleri kur (match length ana) | ⬜ AÇIK | evet |
| 17 | "İz Açan" arketip adı onayı | ❓ TEYİT GEREK | evet |
| 18 | Karma ölçüm formatı (ipsatif) tasarımı | ⬜ AÇIK | evet |
| 19 | Sınırsız yeniden-derinleşme sınırı (G3-03) | ❓ TEYİT GEREK | evet |
| 20 | Özet alanı yönergesi | ❓ TEYİT GEREK | evet |
| 21 | Derinleşme EN BELİRSİZ boyuttan sorsun + profili aşağı çekebilsin | ⬜ AÇIK | evet |
| 22 | Sertifika hatalı-konu hedefleme ekle | ⬜ AÇIK | evet |
| 23 | Öğrenme ↔ sertifika varyant yeniden dağıtımı | ⬜ AÇIK | evet |
| 24 | Menti personası çeşitlendirme (tek tip → çok tip) | ⬜ AÇIK | evet |

> Durum kodları KURAL 10 gereği 6 tanedir: ✅ YAPILDI · 🟡 YARIM · 🔀 PR'DA
> · ⬜ AÇIK · ❓ TEYİT GEREK · 🗑️ GEÇERSİZ ADAYI. Bu belge tasarım kaydıdır;
> kalemler `00-KARAR-TAKIP`'e girişlerinde numara alır (KURAL 8 adım 2).

---

*Belge sonu — Tur B tamamlandı (Bölüm 9-16).*

