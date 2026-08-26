# İçerik Dökümü — Öğrenme Yolculuğu + Kurum-Özel Soru Altyapısı (2026-08-26)
**🟢 BYPASS (yalnız-belge) · 📸 DONDURULMUŞ (2026-08-26)** — kaynak: `seed-learning-journey.ts` + `schema.prisma` + `questionController.ts`. PII yoktur.

---

## GÖREV A — ÖĞRENME YOLCULUĞU (13 aşama: 7 Mentör + 6 Menti)

Kaynak: `backend/prisma/seed-learning-journey.ts` (satır 39-499).
Global çekirdek aşamalar: `tenantId=null` (KİLİTLİ). Model: `LearningStage` (`schema.prisma:737`).
Mekanik: durum → seçenekler → seçim → outcome (`correct`/`warn`/`wrong`) + feedback. **PUAN YOK.** "Sınav" değil "keşif".

> Tüm aşamalarda ortak `authoringGuide` (STK editörüne rehber, `seed-learning-journey.ts:33-37`):
> "İyi bir aşama: gerçek, somut bir durum kurar (kişi + an + gerilim); 3-4 seçenek sunar; her seçeneğe bir outcome (correct / warn / wrong) ve onu neden öyle kıldığını açıklayan sıcak, öğretici bir feedback yazar. Puan YOK — amaç yargılamak değil, keşfettirmek. Yanlış seçim de bir öğrenme anıdır."

---

### MENTÖR YOLCULUĞU (audience=MENTOR)

#### M1 — Tanışma
- **id:** `seed-ls-mentor-1` · **audience:** MENTOR · **order:** 1 · **isStkSpecific:** false · (satır 40-73)
- **learningGoal:** Güven kurma, yargılamadan dinleme.
- **situationText:** "İlk mentin Zeynep'le tanışıyorsun. Kameranın karşısında biraz gergin, ellerini kavuşturmuş. 'Merhaba' diyor, sesi titrek. İlk sözün ne olur?"
- **Seçimler:**
  - **a** · outcome=**correct** — label: "Merhaba Zeynep, tanıştığımıza sevindim — hiç acele yok, önce biraz sohbet edelim mi?"
    - feedback: "Zeynep'in omuzları gevşiyor, gülümsüyor. Güven en başta kurulur. Menti kendini güvende hissetmeden açılamaz — ilk dakikalar ilişkinin tonunu belirler."
  - **b** · outcome=**warn** — label: "Merhaba. Hedeflerini konuşalım, ne başarmak istiyorsun?"
    - feedback: "Zeynep biraz irkiliyor, 'şey... emin değilim' diyor. Fena değil ama erken; menti daha ısınmadan hedef sormak baskı yaratabilir. Önce insan, sonra iş."
  - **c** · outcome=**wrong** — label: "Merhaba, ben şunları yaptım, bunları başardım, sana çok faydam olur."
    - feedback: "Zeynep dinliyor ama sessizleşiyor. Mentorluk seni anlatmak değil; ilk andan itibaren odak mentide olmalı."

#### M2 — Rolün sınırı
- **id:** `seed-ls-mentor-2` · **audience:** MENTOR · **order:** 2 · **isStkSpecific:** false · (satır 74-106)
- **learningGoal:** Koçluk vs söyleme, bağımsızlık.
- **situationText:** "Zeynep bir sorunla geliyor: 'Staj başvurum reddedildi, ne yapmalıyım?' Sen benzer durumu yaşadın, çözümü biliyorsun. Ne yaparsın?"
- **Seçimler:**
  - **a** · outcome=**correct** — label: "Sence neden reddedilmiş olabilir? Elinde hangi seçenekler var?"
    - feedback: "Zeynep düşünüyor, 'aslında CV'mi hiç güncellememiştim' diyor — kendi fark ediyor. En güçlü öğrenme, mentinin kendi çözümüne ulaşmasıdır. Sen yol açarsın, o yürür."
  - **b** · outcome=**warn** — label: "Ben olsam şunu yapardım — sen ne düşünüyorsun?"
    - feedback: "Zeynep senin fikrini 'doğru cevap' sanıp kendi düşünmeyi bırakıyor. Fena değil ama sıralamayı ters çevirmek daha güçlü olurdu: önce o düşünsün."
  - **c** · outcome=**wrong** — label: "Şunu şunu yap, olur biter. Deneyimim var."
    - feedback: "Zeynep not alıyor ama bir dahaki sefere yine sana koşacak. Hazır cevap kısa vadede hızlı, uzun vadede bağımlılık yaratır."

#### M3 — Zor an (geri bildirim)
- **id:** `seed-ls-mentor-3` · **audience:** MENTOR · **order:** 3 · **isStkSpecific:** false · (satır 107-147)
- **learningGoal:** Yapıcı geri bildirim, şefkatli dürüstlük.
- **situationText:** "Zeynep heyecanla bir proje fikri sunuyor. Gözleri parlıyor. Ama fikirde ciddi bir kusur var ve onun özgüveninin kırılgan olduğunu biliyorsun. Ne yaparsın?"
- **Seçimler:**
  - **a** · outcome=**correct** — label: "Önce gerçek bir güçlü yanını söyler, sonra kusuru soru olarak açarsın: \"Şu kısmı çok yaratıcı. Peki şu durumda ne olur sence?\""
    - feedback: "Zeynep bir an duruyor, 'hmm, orası sorun olabilir' diyor — kendi görüyor, hevesi kırılmıyor. Dürüstlük ve şefkat birlikte: güçlü yan güveni korur, soru fark ettirir."
  - **b** · outcome=**warn** — label: "Güzel ama şurada sıkıntı var, merak etme herkes yapar."
    - feedback: "Zeynep kabul ediyor ama 'herkes yapar' biraz geçiştirici; kusuru kendisinin görmesini sağlamak daha öğretici olurdu."
  - **c** · outcome=**wrong** — label: "Harika fikir, aynen devam et!"
    - feedback: "Zeynep mutlu ayrılıyor ama yanlış yolda. Sahte övgü iyi niyetli ama zararlı — gelişmesini engeller ve güveni uzun vadede zedeler."
  - **d** · outcome=**wrong** — label: "Bu çalışmaz, baştan yanlış kurmuşsun."
    - feedback: "Zeynep'in yüzü düşüyor, savunmaya geçiyor. Doğru olsan bile nasıl söylediğin önemli; kırılgan birini böyle geri çevirmek ilişkiyi koparabilir."

#### M4 — Mesafe & sınır
- **id:** `seed-ls-mentor-4` · **audience:** MENTOR · **order:** 4 · **isStkSpecific:** false · (satır 148-181)
- **learningGoal:** Sağlıklı sınır, rol netliği.
- **situationText:** "Zeynep sana güveniyor — o kadar ki artık günün her saati mesaj atıyor, gece yarısı bile. Bu seni yormaya başladı. Ne yaparsın?"
- **Seçimler:**
  - **a** · outcome=**correct** — label: "Sana değer veriyorum Zeynep. En iyi desteği şu saatlerde verebilirim, böylece her konuşmamız daha kaliteli olur."
    - feedback: "Zeynep anlıyor, 'tabii, kusura bakma' diyor. Sağlıklı sınır ilişkiyi korur — hem seni tüketmez hem Zeynep'in kendi ayakları üstünde durmasını destekler."
  - **b** · outcome=**warn** — label: "İdare edersin, bir şey demezsin; yorulsan da cevap vermeye devam edersin."
    - feedback: "Bir süre sonra tükeniyorsun, mesajlara geç dönmeye başlıyorsun. Sınırı ertelemek onu daha zor koyulur hale getirir; söylenmeyen sınır ikinizi de yıpratır."
  - **c** · outcome=**wrong** — label: "Aniden uzaklaşırsın; rahatsız olunca mesajları görmezden gelirsin."
    - feedback: "Zeynep ne olduğunu anlamıyor, kendini terk edilmiş hissediyor. Sınır konuşarak konur; sessiz çekilme incitir."

#### M5 — Kriz anı (rolün ötesi)
- **id:** `seed-ls-mentor-5` · **audience:** MENTOR · **order:** 5 · **isStkSpecific:** false · (satır 182-222)
- **learningGoal:** Kriz yönetimi, rolün sınırı (red-line).
- **situationText:** "Bir görüşmede Zeynep aniden sessizleşiyor, gözleri doluyor. 'Son zamanlarda hiçbir şey anlamlı gelmiyor, çok yoruldum' diyor. Ne yaparsın?"
- **Seçimler:**
  - **a** · outcome=**correct** — label: "Yargılamadan dinlersin, yanında olduğunu belli edersin ve nazikçe profesyonel bir desteğe (okul psikoloğu/uzman) yönlendirirsin."
    - feedback: "Zeynep duyulduğunu hissediyor. Bir mentör önemseyebilir ama terapist değildir — dinlemek ve doğru yere yönlendirmek en değerli ve en sorumlu davranıştır."
  - **b** · outcome=**warn** — label: "Sadece dinlersin; içtenlikle dinlersin ama orada bırakırsın."
    - feedback: "Destek iyi, ama yeterli değil. Ciddi bir durumda yönlendirme yapmamak, mentinin ihtiyaç duyduğu gerçek yardımı almasını geciktirebilir."
  - **c** · outcome=**wrong** — label: "Boş ver, herkesin kötü günü olur, geçer!"
    - feedback: "Zeynep'in hissi hafife alınmış oluyor, daha da kapanıyor. İyi niyetli ama ciddi bir sıkıntıyı geçiştirmek kişiyi yalnızlaştırır."
  - **d** · outcome=**wrong** — label: "'Bu benim alanım değil' deyip başka şeye geçersin."
    - feedback: "Zeynep en kırılgan anında yalnız kalıyor. En azından dinlemek ve yönlendirmek insani bir sorumluluktur."

#### M6 — Gönüllülük ruhu (STK-özel)
- **id:** `seed-ls-mentor-6` · **audience:** MENTOR · **order:** 6 · **isStkSpecific:** true · (satır 223-263)
- **learningGoal:** Gönüllü motivasyonu, anlam.
- **situationText:** "Zeynep derneğinizdeki gönüllü projede mentin. Bir gün yorgun görünüyor: 'Karşılığında bir şey almıyorum ki, neden uğraşıyorum bilmiyorum' diyor. Ne yaparsın?"
- **Seçimler:**
  - **a** · outcome=**correct** — label: "Geçen ay senin hazırladığın etkinlik 40 kişiye ulaştı — onların hayatına dokundun. Seni buraya getiren o his neydi, birlikte hatırlayalım mı?"
    - feedback: "Zeynep düşünüyor, 'aslında birine faydam dokunsun istemiştim' diyor, gözleri canlanıyor. Gönüllülük maddi değil anlamla beslenir; etkiyi somut göstermek tükenmişliğin panzehiridir."
  - **b** · outcome=**warn** — label: "Biraz dinlen, sonra devam edersin."
    - feedback: "Dinlenme iyi ama altta yatan 'anlam kaybını' konuşmazsan Zeynep moladan sonra aynı yere döner."
  - **c** · outcome=**wrong** — label: "Herkes bazen böyle hisseder, geçer."
    - feedback: "Zeynep'in gerçek sorusu ('neden uğraşıyorum') cevapsız kalıyor. Hissini küçümsemek onu uzaklaştırır."
  - **d** · outcome=**wrong** — label: "Gönüllülük bu, istemiyorsan bırakabilirsin."
    - feedback: "Zeynep'in emeği bir anda değersizleşiyor. Bu, gönüllüde kopmanın en hızlı yolu."

#### M7 — Denge (okul/gönüllülük) (STK-özel)
- **id:** `seed-ls-mentor-7` · **audience:** MENTOR · **order:** 7 · **isStkSpecific:** true · (satır 264-297)
- **learningGoal:** Gerçek hayatla gönüllülük dengesi.
- **situationText:** "Zeynep sınav dönemine girdi ve projedeki görevlerini aksatmaya başladı. Proje de aksıyor. Ne yaparsın?"
- **Seçimler:**
  - **a** · outcome=**correct** — label: "Şu an okulun önceliğin, çok doğru. Görevleri sınavdan sonrasına birlikte yeniden planlayalım mı?"
    - feedback: "Zeynep rahatlıyor, sadık kalıyor. Mentinin uzun vadeli iyiliği projeden önce gelir; esneklik hem onu korur hem bağlılığını artırır."
  - **b** · outcome=**warn** — label: "Sınav bitene kadar hiç karışmazsın: \"Tamam, sonra konuşuruz.\""
    - feedback: "Esnek ama görevleri birlikte yeniden planlamadığın için proje boşlukta kalıyor; küçük bir plan ikisini de korurdu."
  - **c** · outcome=**wrong** — label: "Yine de görevleri beklersin: \"Söz vermiştin, yine de yapman lazım.\""
    - feedback: "Zeynep sınav stresine bir de bu baskıyı ekleyince kopma noktasına geliyor. Gerçek hayatı yok saymak aidiyeti kırar."

---

### MENTİ YOLCULUĞU (audience=MENTI)

#### T1 — Tanışma
- **id:** `seed-ls-menti-1` · **audience:** MENTI · **order:** 1 · **isStkSpecific:** false · (satır 301-333)
- **learningGoal:** Mentörden ne beklenir/beklenmez.
- **situationText:** "İlk mentörün Deniz'le tanışıyorsun. Güler yüzlü, 'Nasıl yardımcı olabilirim?' diyor. İçinden ne bekliyorsun?"
- **Seçimler:**
  - **a** · outcome=**correct** — label: "Bana yol göstersin, ama adımları ben atacağım."
    - feedback: "Doğru başlangıç. Mentör bir pusuladır, taşıyıcı değil. En çok fayda görenler, rehberliği kendi çabalarıyla birleştirenlerdir."
  - **b** · outcome=**warn** — label: "Umarım benim için her şeyi halleder, bana iş bulur."
    - feedback: "Bu beklentiyle başlarsan hayal kırıklığı kaçınılmaz. Deniz sana kapıları gösterebilir ama içinden senin geçmen gerekir."
  - **c** · outcome=**wrong** — label: "Herhalde çok bir şey değişmez, öylesine bakayım."
    - feedback: "Bu tavır, en büyük fırsatı kaçırmanın yolu. Mentorluğa ne kadar açık gelirsen, o kadar çok alırsın — düşük beklentiyle başlarsan, alacağın da az olur."

#### T2 — Sorumluluk
- **id:** `seed-ls-menti-2` · **audience:** MENTI · **order:** 2 · **isStkSpecific:** false · (satır 334-366)
- **learningGoal:** Menti kendi gelişiminin öznesi.
- **situationText:** "Deniz sana bir öneride bulunuyor: 'Şu beceriyi geliştirmek için şunu deneyebilirsin.' Görüşme bitti. Ne yaparsın?"
- **Seçimler:**
  - **a** · outcome=**correct** — label: "Öneriyi denersin, sonucu not alır, bir sonraki görüşmeye getirirsin."
    - feedback: "Deniz'in gözünde değerin artıyor — çünkü rehberliği işe dönüştürüyorsun. Menti kendi gelişiminin öznesidir; sahiplenen menti en hızlı büyür."
  - **b** · outcome=**warn** — label: "'Bir dahaki görüşmede detaylandırır herhalde' deyip bir şey yapmazsın."
    - feedback: "Bir sonraki görüşmede ilerleme olmuyor. Rehberlik ancak sen harekete geçince değer üretir."
  - **c** · outcome=**wrong** — label: "Görüşme bitince öneriyi bir kenara bırakırsın."
    - feedback: "İlişki yavaşça sönüyor. Emek vermeyen taraf, ilişkinin de emeğini almaz."

#### T3 — Açık iletişim
- **id:** `seed-ls-menti-3` · **audience:** MENTI · **order:** 3 · **isStkSpecific:** false · (satır 367-399)
- **learningGoal:** Sağlıklı iletişim, savunmasız açıklık.
- **situationText:** "Deniz bir şey anlattı ama sen tam anlamadın. Aptalca görünmekten çekiniyorsun. Ne yaparsın?"
- **Seçimler:**
  - **a** · outcome=**correct** — label: "Şu kısmı tam yakalayamadım, biraz daha açar mısın?"
    - feedback: "Deniz memnun, çünkü gerçekten öğrenmek istediğini görüyor. Soru sormak zayıflık değil, en hızlı öğrenme yoludur — ve mentörünü de rahatlatır."
  - **b** · outcome=**warn** — label: "Anlamış gibi yaparsın; başını sallar, geçiştirirsin."
    - feedback: "Sonra o konuda zorlanıyorsun ama artık sormak daha zor. Anlamadan geçmek, boşluğu büyütür."
  - **c** · outcome=**warn** — label: "Kendi kendine çözmeye çalışırsın; sormadan, tek başına anlamaya uğraşırsın."
    - feedback: "Bağımsızlık iyi ama mentorluğun amacı tam da bu boşlukları birlikte kapatmak; sormak zaman kazandırır."

  > NOT: Bu aşamada "wrong" outcome YOK — 3 seçenekten biri `correct`, ikisi `warn`. (Diğer aşamalardan farklı; tasarım gereği.)

#### T4 — Sınır & saygı
- **id:** `seed-ls-menti-4` · **audience:** MENTI · **order:** 4 · **isStkSpecific:** false · (satır 400-432)
- **learningGoal:** Sağlıklı sınır, karşılıklılık.
- **situationText:** "Deniz'le aran iyi. Ama son zamanlarda ondan çok şey ister oldun — sık sık acil mesajlar, küçük iyilikler. Bir gün cevabı gecikiyor. Ne düşünürsün?"
- **Seçimler:**
  - **a** · outcome=**correct** — label: "Deniz'in de kendi hayatı var, gerçekçi olmam lazım."
    - feedback: "Sağlıklı düşünce. Mentorluk karşılıklı saygıya dayanır; mentörünün zamanına saygı, ilişkiyi uzun ömürlü kılar."
  - **b** · outcome=**wrong** — label: "Demek bana değer vermiyor."
    - feedback: "Bu düşünce ilişkiyi zehirler. Gecikmeyi kişisel almak, gerçekçi olmayan beklentiden gelir."
  - **c** · outcome=**warn** — label: "Belki yeterince net olmadım, daha çok yazayım."
    - feedback: "Sınır zorlamak ilişkiyi yıpratır. Mentör sınırsız erişilebilir bir kaynak değil, bir rehberdir."

  > NOT: Seçim sırası a=correct, b=wrong, c=warn (diğerlerinde tipik sıra correct→warn→wrong).

#### T5 — Süreklilik
- **id:** `seed-ls-menti-5` · **audience:** MENTI · **order:** 5 · **isStkSpecific:** false · (satır 433-465)
- **learningGoal:** Bağlılık, erken kopmayı önleme.
- **situationText:** "İşlerin yoğunlaştı, Deniz'le görüşmeleri ertelemeye başladın. Bir buluşmayı da habersiz kaçırdın. Ne yaparsın?"
- **Seçimler:**
  - **a** · outcome=**correct** — label: "Deniz'e yazıp durumunu açıklar, yeni bir zaman ayarlarsın."
    - feedback: "Deniz anlıyor, ilişki güçlenerek devam ediyor. Dürüst iletişim, aksaklıkları ilişkiyi bitiren değil, güçlendiren anlara çevirir."
  - **b** · outcome=**wrong** — label: "Habersiz kaybolursun; utandığın için hiç yazmazsın."
    - feedback: "Deniz ne olduğunu bilmiyor, ilişki sessizce kopuyor. Kaçınmak sorunu çözmez, ilişkiyi bitirir."
  - **c** · outcome=**warn** — label: "Bahane üretirsin; gerçeği söylemek yerine kaçamak cevaplar verirsin."
    - feedback: "Güven zedeleniyor. Dürüstlük, kısa vadede zor olsa da ilişkiyi korur."

#### T6 — Aidiyet (STK-özel)
- **id:** `seed-ls-menti-6` · **audience:** MENTI · **order:** 6 · **isStkSpecific:** true · (satır 466-498)
- **learningGoal:** Topluluğa aidiyet.
- **situationText:** "Deniz'le mentorluğun bir dernek içinde. Ama sen kendini hep 'dışarıdan biri' gibi hissediyorsun, etkinliklere katılmıyorsun. Ne yaparsın?"
- **Seçimler:**
  - **a** · outcome=**correct** — label: "Küçük de olsa bir etkinliğe katılır, topluluğa bir şeyler katmayı denersin."
    - feedback: "Zamanla kendini ait hissediyorsun, mentorluğun da zenginleşiyor. Mentorluk sadece iki kişilik değil; bir topluluğun parçası olmak deneyimi büyütür."
  - **b** · outcome=**warn** — label: "Uzak durursun: 'Ben sadece Deniz'le çalışayım yeter.'"
    - feedback: "Rehberlik alıyorsun ama topluluğun sunduğu bağları, fırsatları kaçırıyorsun. Aidiyet, katılımla kurulur."
  - **c** · outcome=**wrong** — label: "Beklersin: 'Beni çağırırlarsa giderim.'"
    - feedback: "Pasif kalmak yalnızlaştırır. Topluluğa ait olmak, çağrılmayı beklemek değil, adım atmaktır."

---

### Tamamlanma nasıl hesaplanıyor? (KANIT — PUAN YOK)

Öğrenme yolculuğunun tamamlanması **DISC testinin `completionPercent` mekaniğinden tamamen AYRIDIR** — kod-kanıtı:

1. **Seçim çözümlemesi puan üretmez.** `resolveChoice()` (`learningJourney.service.ts:170-198`) yalnızca seçilen `choice`'un `{ key, outcome, feedback }`'ini döner. **Hiçbir yere kaydedilmez** — ne skor, ne "doğru sayısı", ne `UserResponse`. Outcome (`correct`/`warn`/`wrong`) sadece o an oyuncuya gösterilecek **öğrenme sinyali/geri bildirim** için; kalıcılaştırılmıyor.

2. **Tamamlanma = tek bir timestamp.** `markJourneyCompleted()` (`learningJourney.service.ts:206-225`) yolculuğu bitmiş saymak için `TenantMembership.learningJourneyCompletedAt` alanına zaman damgası yazar (idempotent). "Kaç doğru", "yüzde kaç" gibi bir eşik/geçme-kalma YOK. Endpoint: `POST /api/learning-journey/complete` → `completeJourney` (`learningJourneyController.ts:80-90`), yanıt: `{ completed: true, completedAt }`.

3. **`completionPercent` başka bir bağlama ait.** `questionService.ts`'teki `completionPercent` (satır 175-177: `Math.round((totalAnswered / totalInPool) * 100)`) **DISC/adaptif soru testine** aittir (CORE+DEEPENING havuzu), öğrenme yolculuğuna DEĞİL. İki sistem karışmaz — seed dosyası başlığı da bunu açıkça belirtir (satır 9-10: "'Sınav' DEĞİL 'keşif': puanlama/geçme-kalma YOK. … Sertifikasyon motorundan tamamen AYRIDIR.").

**Özet:** outcome = anlık öğrenme sinyali (kaydedilmez); tamamlanma = kullanıcının aşamaları gezip "complete" demesiyle konan tek timestamp. Puan/eşik yoktur.

---

## GÖREV B — KURUM-ÖZEL SORU ALTYAPISI

### Kurum sorusu hangi modele/alana yazılıyor?

Model: **`Question`** (`schema.prisma:695-716`). Kurum-özel soru için kritik alanlar:
- **`tenantId String?`** (satır 697): `null` = global çekirdek soru (KİLİTLİ). Dolu = o kuruma özel. Kurum sorusu `tenantScoped=true` gönderilince `tenantId = req.tenant.tenantId` olarak yazılır (`questionController.ts:135`).
- **`category QuestionCategory`** (satır 701): `DISC_ASSESSMENT` (kilitli, DISC vektörüne katkı) veya **`STK_CUSTOM`** (STK'nın kendi soruları, DISC'e KATILMAZ). Enum: `schema.prisma:121-124`.
- **`type`** (`CORE`/`DEEPENING`), **`discDimension`** (`D/I/S/C/GENERAL`), `order`, `isActive`, `isRequired`.

### Endpoint + validasyon

**`POST /api/questions`** → `createQuestion` (`questionController.ts:113-140`).
- Validasyon şeması `CreateQuestionSchema` (satır 36-46):
  - `text`: string, min 10 / max 500
  - `type`: enum `CORE|DEEPENING`, default `CORE`
  - `discDimension`: enum `D|I|S|C|GENERAL`, default `GENERAL`
  - `category`: enum `DISC_ASSESSMENT|STK_CUSTOM`, **default `STK_CUSTOM`**
  - `order`: int ≥ 0, default 0
  - `tenantScoped`: boolean, default `false` (true → yalnız bu tenant görür)
- **DISC kilidi (satır 124-129):** `category === 'DISC_ASSESSMENT'` gelirse **403 `DISC_KATEGORI_KILITLI`** — kurum DISC sorusu ekleyemez; yalnız `STK_CUSTOM`. DISC soruları yalnız platform seed script'iyle eklenir.
- Yaratma (satır 134-136): `tenantId: tenantScoped ? req.tenant.tenantId : null`.

Ek endpoint'ler (hepsi ADMIN):
- `PATCH /api/questions/:questionId` → `updateQuestion` (satır 152-188): sadece **tenant'a ait** soru güncellenir; global (`tenantId===null`) → 403 `GLOBAL_SORU_KILITLI`; başka tenant → 403 `YETKI_YETERSIZ`.
- `DELETE /api/questions/:questionId` → `deleteQuestion` (satır 193-216): tenant sorusu silinir; global silinemez (403).
- `POST /api/questions/:questionId/hide` → `hideGlobalQuestion` (satır 221-253): global soruyu kurumdan gizler (silmez); `DISC_ASSESSMENT` gizlenemez (403, eşleştirme vektörü için zorunlu). `QuestionHide` modeliyle (`schema.prisma:719-730`).
- `DELETE /api/questions/:questionId/hide` → `unhideGlobalQuestion` (satır 258-267).

### Hangi soru tipleri destekleniyor? — #13 CEVAP-TİPİ (VERDİKT)

**#13 verdikti: Şemada cevap-tipi (answer-type) alanı YOK. `UserResponse` YALNIZCA Likert (`value:Int`, 1-5). Yeni tip (şıklı/açık-uçlu) eklemek MIGRATION İSTER.**

Kanıt:
- `Question` modelinde (`schema.prisma:695-716`) cevap **formatı/tipi** için hiçbir alan yok. `type` alanı `CORE|DEEPENING`'dir (soru havuzu fazı, cevap formatı DEĞİL). Kurum yalnızca **soru metni** ekliyor; kullanıcı bunu **1-5 Likert** ölçeğiyle yanıtlıyor.
- **`UserResponse`** (`schema.prisma:859-873`): tek cevap alanı **`value Int`**, yorumu satır 863: "1=Hiç katılmıyorum … 5=Tamamen katılıyorum". Şıklı seçenek, metin, çoklu-seçim için alan/tablo YOK.
- Validasyon da bunu kilitliyor: `SingleResponseSchema` (`questionController.ts:48-50`) `value: z.number().int().min(1).max(5)`; `BatchResponseSchema` (satır 52-62) aynı 1-5 kısıtı.
- Dolayısıyla yeni bir cevap tipi (örn. çoktan-seçmeli şık, açık-uçlu metin) eklemek için:
  - `Question`'a bir "answerFormat" alanı + (şıklar için) bir seçenek tablosu/JSON alanı,
  - `UserResponse`'a metin/seçilen-şık alanı,
  eklemek gerekir → bunlar **Prisma şema değişikliği = migration** demektir. Mevcut kod bunu desteklemiyor.

> Kıyas notu (bilgi): Ayrı bir sistem olan **`SjtQuestion`** (`schema.prisma:889+`) `answerFormat` (`SINGLE|MOST_LEAST`) ve `SjtOption` şıklarını destekliyor — ama bu OCEAN kalibrasyonu için AYRI bir bankadır; kurum-özel `Question`/`UserResponse` akışıyla ilişkisi yoktur. Yani "şıklı soru" altyapısı sistemde SJT tarafında var, fakat kurum-özel `STK_CUSTOM` soruları bu yapıyı KULLANMIYOR.

### DISC ile ilişki

- **Kurum-özel (`STK_CUSTOM`) sorular DISC'ten BAĞIMSIZDIR.** Enum yorumu (`schema.prisma:123`): "STK'nın kendi amaçları için eklediği sorular (DISC'e katılmaz)". Controller yorumu da aynı (satır 41).
- DISC vektörü yalnız `DISC_ASSESSMENT` sorularından hesaplanır; kurum bu kategoriye soru EKLEYEMEZ (403). Kurum yalnız kendi izleme/öğrenme amaçlı `STK_CUSTOM` sorularını ekler ve bunlar eşleştirme algoritmasına girmez.
- Öğrenme Yolculuğu (GÖREV A) ise hem DISC hem `STK_CUSTOM` sorularından TAMAMEN AYRI üçüncü bir sistemdir (`LearningStage`, puan yok, `UserResponse` kullanmaz).

---

## Kaynak dosyalar
- `backend/prisma/seed-learning-journey.ts` (13 aşama, satır 39-499; upsert satır 503-532)
- `backend/prisma/schema.prisma` — `Question` (695-716), `QuestionHide` (719-730), `LearningStage` (737-762), `QuestionCategory` enum (121-124), `UserResponse` (859-873)
- `backend/src/controllers/questionController.ts` — createQuestion/validasyon/DISC kilidi
- `backend/src/services/questionService.ts` — `completionPercent` (DISC testi, satır 175-177)
- `backend/src/services/learningJourney.service.ts` — `resolveChoice` (170), `markJourneyCompleted` (206)
- `backend/src/controllers/learningJourneyController.ts` — `completeJourney` (80)
