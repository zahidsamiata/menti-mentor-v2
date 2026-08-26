# İçerik Dökümü — Sertifika Senaryoları (2026-08-26)
**🟢 BYPASS (yalnız-belge) · 📸 DONDURULMUŞ (2026-08-26)** — kaynak: `backend/prisma/seed-certification.ts` + `certification.service.ts`. PII yoktur.

---

## 0. Sayım & Kanıt (kod-doğrulanmış)

**Kaynak:** `backend/prisma/seed-certification.ts:37-257` (`CERT_QUESTIONS` dizisi).

- **Toplam senaryo: 20** → 10 konu × 2 varyant (A/B). Kod başlık yorumu (`seed-certification.ts:7`): "10 konu × 2 varyant = 20 senaryo". SAYIM ile doğrulandı: `CERT_T01_A/B` … `CERT_T10_A/B` = 20 kayıt.
- **Red-line konu: 4** (konu bazında; bir konunun herhangi bir varyantı red-line ise konu red-line'dır):
  - KONU 2 — Yapıcı geri bildirim (`isRedLine: true`, satır 62/72)
  - KONU 5 — Sınır koyma & rol netliği (`isRedLine: true`, satır 128/138)
  - KONU 9 — Gizlilik & güven (`isRedLine: true`, satır 216/226)
  - KONU 10 — Kriz & hassas durum yönetimi (`isRedLine: true`, satır 238/248)
- **Red-line senaryo: 8** (4 konu × 2 varyant, her ikisi de `isRedLine: true`).
- **Normal (red-line olmayan) konu: 6** → KONU 1, 3, 4, 6, 7, 8.

Her seçenek 0-3 arası `competencyScore` taşır: **3=en doğru (correct), 2=kabul edilebilir (acceptable), 1=zayıf (wrong), 0=zararlı (wrong)**. `outcomeFor()` (satır 31-35): 3→correct, 2→acceptable, 1 ve 0→wrong.

> ⚠️ Canlı DB senaryo sayısı: **kod 20 senaryo içerir. Canlı sayısı ⏳ TEYİT GEREK (canlı DB).** Madde 30'daki "~5" iddiası burada DB'ye SORULMADI (salt-okuma görev). Not: `evaluateCertification` payda olarak sabit 10 değil, kurumda AÇIK konu sayısını kullanır (`certification.service.ts:166`); STK admin konu kapatabilir → canlıda daha az AKTİF konu görünebilir (ama seed yine 20 senaryo yazar; `updateMany` ile eski `CERT_01..04` gibi kodlar pasifleştirilir — satır 304-310).

### Güvenli seed runner var mı? (madde 30 / 73)
- `seedCertification()` **YALNIZCA `prisma/seed.ts:507`'den çağrılıyor** (Grep kanıtı). `prisma/seed.ts` = **TEHLİKELİ** dosya (CLAUDE.md: satır 300-307'de toplu `deleteMany()` → veri siler). `npm run seed` = `tsx prisma/seed.ts` (package.json:16).
- **Standalone güvenli runner YOK** — `seedCertification()`'ı tek başına, `deleteMany` çalıştırmadan koşturan ayrı bir script (ör. `scripts/seed-certification-only.mjs`) bulunamadı.
- Fonksiyonun kendisi güvenlidir (yalnız `upsert` + `updateMany isActive:false`, `deleteMany` YOK). Ama **erişim yolu güvenli değil**: onu çağırmak için tehlikeli `seed.ts`'in tamamını çalıştırmak gerekiyor.
- **🔴 Açık iş (madde 30/73):** `seedCertification()` için güvenli, izole bir runner script'i eklenmeli; şu an sertifika bankasını canlıya güvenle basmanın yolu yok.

---

## 1. Baraj / Geçme Mantığı ⭐ (kanıt: `certification.service.ts`)

**Yapılandırma (`CERT_CONFIG`, satır 24-38):**
- `passRateThreshold: 0.8` → aktif konuların en az **%80'i** ilk-denemede geçilmeli (yukarı yuvarlanır).
- `minActiveTopics: 5` → kurum toplam aktif konu sayısını 5'in altına düşüremez.
- `attemptsBeforeCooldown: 2` → 2 başarısız sınav denemesinden sonra bekleme başlar.
- `cooldownHours: 24` → bekleme süresi 24 saat.
- `adminNotifyAfterDays: 3` → geride kalan mentör için 3 gün sonra STK yöneticisine uygulama-içi bildirim (mentöre otomatik mail yok).

**"0 puan barajı" / geçme kuralı — HER soruda mı, yalnız red-line'da mı?**

Kanıt `isFirstAttemptPass()` (satır 65-68):
```
export function isFirstAttemptPass(competencyScore: number, isRedLine: boolean): boolean {
  return isRedLine ? competencyScore === 3 : competencyScore >= 2;
}
```
Ve yorum (satır 9-12):
- **Normal konu:** ilk seçim **3 veya 2** → geçer (yani 0 ve 1 kalır).
- **Red-line konu:** ilk seçim **SADECE 3** → geçer (2 bile yeterli DEĞİL; 0/1/2 hepsi kalır).

→ Yani baraj **konuya göre değişir**, "her soruda tek tip 0 barajı" DEĞİL. Red-line konuda çıta daha yüksek (sadece 3). Normal konuda 2-3 geçer.

**İki katmanlı geçme (satır 200-214):**
1. **Oransal eşik** (`passRateOk`, satır 200-202): geçen konu sayısı ≥ `requiredToPass(totalTopics)` = `Math.ceil(totalTopics × 0.8)` (satır 50-52). Örn. 10 konu → ceil(8)=8; 4 konu → ceil(3.2)=4; 7 konu → ceil(5.6)=6. Payda = kurumda **AÇIK** konu sayısı (sabit 10 DEĞİL).
2. **Red-line MUTLAK kapı** (`redLineOk`, satır 204-206): **her AÇIK red-line konu** ilk-denemede geçilmiş (yani 3 alınmış) olmalı — oran değil, mutlak. Bir red-line konu bile 3 ile geçilemezse sertifika verilmez.

**Geçti (satır 208):** `passed = passRateOk && redLineOk` (ikisi de gerekli).
**Fail nedeni önceliği (satır 210-214):** önce red-line ihlali (`RED_LINE_FAILED`), sonra oransal (`BELOW_THRESHOLD`). Ayrıca `NO_ACTIVE_TOPICS` (açık konu yoksa, satır 169-176) ve `COOLDOWN_ACTIVE` (bekleme dolmadan, satır 140-147).

**İlk-deneme (`isFirstAttemptPass` çağrısı) mantığı (satır 178-193):** her konunun mentörün **İLK** seçimi değerlendirilir; aynı konudan sonraki cevaplar (öğrenme amaçlı varyant tekrarı) skora katılmaz (`if (firstByTopic.has(q.topic)) continue;`). Konu-içi yanlışta CEZA YOK — UI aynı konunun diğer varyantını öğretici olarak sunar (satır 14-18 yorum).

**Sınav-seviyesi döngü (satır 218-224):** her 2 başarısız denemede 24 saat bekleme; başarısız denemede geçilemeyen konular `certWrongTopics`'e yazılır, sonraki denemede başa alınır (ağırlıklı tekrar, `getCertificationQuestions` satır 304-309).

**minimum konu sayısı:** `minActiveTopics: 5` — kurum aktif konu sayısını 5 altına indiremez (`setCertificationTopic`, satır 408-413). Red-line konular zaten kapatılamaz (`RED_LINE_LOCKED`, satır 401-402).

Tüm sertifika durumu `TenantMembership`'te tutulur (per-tenant; `certScore`, `isCertified`, `certificationStatus`, `certifiedAt`, `certAttempts`, `cooldownUntil`, `certWrongTopics`, `qualityMultiplier` — satır 230-242).

---

## 2. Senaryolar (tam metin — 20 senaryo, kısaltma yok)

Her senaryoda seçenekler kaynak dosyadaki sırayla verilmiştir (dizi sırası; puan sırası karışık). `key + competencyScore + tam label + tam explanation`.

---

### KONU 1 — Cevabı verme, buldur (red-line: HAYIR)

#### CERT_T01_A (varyant A · `seed-certification.ts:39-48`)
**Senaryo:** Mentin bir sorunla geliyor ve "Ne yapmalıyım?" diye soruyor. Sen bu sorunu nasıl çözeceğini çok iyi biliyorsun. Ne yaparsın?

- **A · score 3** — label: `"'Sen olsan nasıl yaklaşırdın, hangi seçenekleri görüyorsun?' diye sorup kendi çözümünü bulmasına rehberlik ederim."`
  explanation: `Doğru. İyi mentörlük "söylemek" değil "buldurmaktır"; menti kendi çözümüne ulaşınca hem öğrenir hem bağımsızlaşır. (Kaynak: CIMER "fostering independence".)`
- **C · score 2** — label: `"Önce kendi fikrimi söyler, sonra 'sen ne düşünüyorsun?' diye eklerim."`
  explanation: `Kabul edilebilir ama ideal değil: kendi fikrini önce söylersen menti onu 'doğru cevap' sanıp düşünmeyi bırakabilir. Sırayı ters çevirmek daha güçlü.`
- **B · score 1** — label: `"Doğru cevabı net söylerim; deneyimim var, vakit kaybetmesin."`
  explanation: `Zayıf: kısa vadede hızlı ama menti sana bağımlı kalır, kendi problem çözme becerisini geliştiremez.`
- **D · score 0** — label: `"'Bu kadar basit şeyi kendin çöz' deyip geçiştiririm."`
  explanation: `Zararlı: küçümser ve yardımı reddeder; menti bir daha sormaya çekinir, güven kırılır.`

#### CERT_T01_B (varyant B · `seed-certification.ts:49-58`)
**Senaryo:** Mentin bir kariyer kararında ("bu işi kabul etsem mi?") senin görüşünü soruyor. Senin net bir tercihin var. Ne yaparsın?

- **A · score 3** — label: `"Kendi kriterlerini netleştirmesine yardım ederim: 'Senin için en önemli 3 şey ne? Hangisi bunları karşılıyor?'"`
  explanation: `Doğru: karar onun hayatı; senin işin karar vermek değil, karar verme çerçevesi kazandırmak.`
- **C · score 2** — label: `"Deneyimimi paylaşırım ama 'bu benim yolumdu, seninki farklı olabilir' derim."`
  explanation: `Kabul edilebilir: deneyim paylaşmak değerli, ama yine de kendi ölçütünü kurmasına yardım daha kalıcı.`
- **B · score 1** — label: `"Bence şunu seç, derim; sonuçta tecrübeliyim."`
  explanation: `Zayıf: kendi tercihini dayatmak mentinin sahiplenmediği bir karara yol açar.`
- **D · score 0** — label: `"'Bu senin kararın, bana ne' deyip konuyu kapatırım."`
  explanation: `Zararlı: rehberliği tamamen reddetmek de bir uçtur; menti yalnız bırakılmış hisseder.`

---

### KONU 2 — Yapıcı geri bildirim (red-line: EVET)

#### CERT_T02_A (varyant A · `seed-certification.ts:61-70`)
**Senaryo:** Mentin heyecanla bir fikir sunuyor ama fikirde ciddi bir kusur var. Mentinin kırılgan ve özgüveninin düşük olduğunu biliyorsun. Geri bildirimini nasıl verirsin?

- **B · score 3** — label: `"Önce güçlü yanını içtenlikle belirtir, sonra kusuru soru olarak açarım: 'Şu durumda ne olur sence?'"`
  explanation: `Doğru: gerçek bir güçlü yan güveni korur, kusuru soruyla açmak mentinin kendi görmesini sağlar. Dürüstlük + şefkat birlikte. (Kaynak: yapıcı geri bildirim — Core Mentoring Skills, NCSU; güven — Leck & Orser 2013.)`
- **D · score 2** — label: `"Kusuru söylerim ama 'merak etme, herkes hata yapar' diye yumuşatırım."`
  explanation: `Kabul edilebilir: dürüst, ama 'herkes hata yapar' geçiştirici; asıl öğretici olan kusuru kendisinin görmesini sağlamak.`
- **C · score 1** — label: `"Kırılmasın diye kusuru hiç söylemem, 'güzel fikir' derim."`
  explanation: `Zayıf: iyi niyetli ama zararlı — menti yanlıştan dönemez, sahte övgü uzun vadede güveni zedeler.`
- **A · score 0** — label: `"'Bu çalışmaz, baştan yanlış düşünmüşsün' derim."`
  explanation: `Zararlı: dürüst ama şefkatsiz; kırılgan mentinin özgüvenini yıkar, ilişkiyi kopma riskine sokar. Doğruyu söylemek yetmez, nasıl söylediğin de önemlidir.`

#### CERT_T02_B (varyant B · `seed-certification.ts:71-80`)
**Senaryo:** Derneğinizde gönüllü olan mentin, hazırladığı etkinlik planını gururla sunuyor. Ama plan bütçeyi çok aşıyor ve uygulanamaz. Menti bu işe haftalarca emek vermiş. Ne yaparsın?

- **B · score 3** — label: `"Emeğini ve güçlü fikirlerini takdir eder, sonra 'bütçeyle nasıl uyarlarız?' diye birlikte çözmeye çalışırım."`
  explanation: `Doğru: emeği tanımak motivasyonu korur; kısıtı birlikte çözmek hem gerçekçi hem güçlendirici.`
- **D · score 2** — label: `"Güzel olmuş derim ama bütçeyi aştığını da açıkça söylerim."`
  explanation: `Kabul edilebilir: dürüst, ama 'birlikte çözme' adımı olmadan menti yılabilir.`
- **C · score 1** — label: `"Moralini bozmam, plan güzel deyip bütçe sorununu sonra ben hallederim."`
  explanation: `Zayıf: menti gerçek kısıtı öğrenemez; ayrıca yükü tek başına üstlenmek sürdürülebilir değil.`
- **A · score 0** — label: `"'Bu bütçeyle olmaz, baştan düşünmemişsin' derim."`
  explanation: `Zararlı: gönüllü emeğini değersizleştirmek, gönüllüde tükenmişlik ve kopmanın en hızlı yoludur.`

---

### KONU 3 — Beklentileri hizalama (red-line: HAYIR)

#### CERT_T03_A (varyant A · `seed-certification.ts:83-92`)
**Senaryo:** Yeni bir mentiyle ilk görüşmeniz. Menti hevesli ama ne sıklıkta görüşeceğiniz, neyi bekleyebileceği konusunda hiçbir şey konuşulmadı. Ne yaparsın?

- **A · score 3** — label: `"İlk görüşmede birlikte net bir çerçeve kurarız: ne sıklıkta, hangi konularda, karşılıklı ne bekliyoruz."`
  explanation: `Doğru: net beklenti mentorluğun temelidir; belirsizlik en sık hayal kırıklığı ve kopma nedenidir. (Kaynak: CIMER "aligning expectations"; kopma nedenleri — Eby & McManus 2004.)`
- **C · score 2** — label: `"İlk birkaç görüşmeyi doğal bırakır, sonra gerekirse çerçeve koyarım."`
  explanation: `Kabul edilebilir ama riskli: beklenti boşluğu erken dönemde yanlış anlaşılma yaratabilir.`
- **B · score 1** — label: `"Menti ne isterse ona göre giderim, kural koymam."`
  explanation: `Zayıf: yapısızlık çoğu zaman ilişkinin sönmesiyle sonuçlanır.`
- **D · score 0** — label: `"Kendi kurallarımı koyar, uymasını beklerim."`
  explanation: `Zararlı: tek taraflı dayatma karşılıklılığı yok eder; menti sürece sahip çıkmaz.`

#### CERT_T03_B (varyant B · `seed-certification.ts:93-102`)
**Senaryo:** Mentin senden, verebileceğinin çok üstünde bir şey bekliyormuş gibi konuşuyor — tüm kariyer sorunlarını çözmeni, ona iş bulmanı umuyor. Ne yaparsın?

- **A · score 3** — label: `"Nazikçe rolümü netleştiririm: 'Sana yol göstermede yanındayım, ama kararları ve adımları sen atacaksın' derim."`
  explanation: `Doğru: gerçekçi beklenti, ileride 'bana yardım etmedi' hissini önler.`
- **C · score 2** — label: `"Elimden geleni yaparım der, sınırı zamanla netleştiririm."`
  explanation: `Kabul edilebilir ama beklentiyi baştan netleştirmemek sonradan daha büyük hayal kırıklığı doğurur.`
- **B · score 1** — label: `"Söz vermeden elimden geleni yaparım, umarım yeter."`
  explanation: `Zayıf: belirsiz söz, gerçekçi olmayan beklentiyi besler.`
- **D · score 0** — label: `"Ben her şeyi hallederim, merak etme derim."`
  explanation: `Zararlı: taşıyamayacağın sözü vermek; yerine getirilemeyince güven çöker.`

---

### KONU 4 — Aktif dinleme & yargılamama (red-line: HAYIR)

#### CERT_T04_A (varyant A · `seed-certification.ts:105-114`)
**Senaryo:** Mentin üç haftadır görüşmelere geç geliyor ve son buluşmayı habersiz kaçırdı. Ne yaparsın?

- **A · score 3** — label: `"Yargılamadan neler olduğunu, bir engel mi var, hedefler hâlâ uygun mu diye açık uçlu sorarım."`
  explanation: `Doğru: geç kalma çoğu zaman ilgisizlik değil, dış engel ya da yanlış hedef işareti. Kopmalar 'ceza' ile değil 'anlama' ile önlenir. (Kaynak: Grossman & Rhodes 2002; Eby & McManus 2004.)`
- **B · score 2** — label: `"Nazikçe devamlılığın önemini hatırlatır, sonra dinlerim."`
  explanation: `Kabul edilebilir: sınır koymak iyi, ama önce anlamak daha güçlüdür; hatırlatmayı anlamanın ardına koymak daha etkili.`
- **C · score 1** — label: `"Bir şey demeden devam ederim, belki yoğundur."`
  explanation: `Zayıf: örüntüyü görmezden gelmek sorunu büyütür; menti umursanmadığını sanabilir.`
- **D · score 0** — label: `"Ciddiyetsizse programdan çıkarırım."`
  explanation: `Zararlı: erken ve cezalandırıcı; menti savunmaya geçer, gerçek sebebi öğrenemezsin, ilişkiyi gereksiz bitirirsin.`

#### CERT_T04_B (varyant B · `seed-certification.ts:115-124`)
**Senaryo:** Görüşme sırasında mentin sana bir şey anlatırken, sen sıradaki tavsiyeni düşünmeye başladığını fark ediyorsun; onu tam dinlemiyorsun. Ne yaparsın?

- **A · score 3** — label: `"Kendimi durdurur, dikkatimi ona geri veririm; gerekirse 'bir daha söyler misin, tam anlamak istiyorum' derim."`
  explanation: `Doğru: aktif dinleme çaba ister; anlaşıldığını hissetmek mentinin açılmasını sağlar.`
- **C · score 2** — label: `"Konuşmasını beklerim, sonra genel bir cevap veririm."`
  explanation: `Kabul edilebilir ama tam dinlememek çoğu zaman cevabın da yüzeysel olmasına yol açar.`
- **B · score 1** — label: `"Tavsiyemi vermeye odaklanırım, önemli olan çözüm."`
  explanation: `Zayıf: çözüm odaklılık iyi ama önce doğru anlamadan verilen çözüm çoğu zaman yanlış hedefe gider.`
- **D · score 0** — label: `"Zaten ne diyeceğini tahmin ediyorum, sözünü keserim."`
  explanation: `Zararlı: sözünü kesmek ve varsaymak, mentinin duyulmadığını hissetmesine ve kapanmasına yol açar.`

---

### KONU 5 — Sınır koyma & rol netliği (red-line: EVET)

#### CERT_T05_A (varyant A · `seed-certification.ts:127-136`)
**Senaryo:** Mentin sana günün her saati mesaj atıyor, kişisel sorunlarında sürekli senden anlık destek bekliyor. Bu seni yıpratmaya başladı. Ne yaparsın?

- **B · score 3** — label: `"Şefkatle ama net bir sınır koyarım: 'Sana değer veriyorum; en iyi desteği şu saatlerde/şu şekilde verebilirim' derim."`
  explanation: `Doğru: sağlıklı sınır ilişkiyi korur; sınırsız erişim hem seni tüketir hem mentinin bağımsızlığını engeller.`
- **D · score 2** — label: `"Şimdilik idare ederim, çok yorulunca konuşurum."`
  explanation: `Kabul edilebilir değil-e yakın: ertelemek sınırı daha zor koyulur hale getirir; tükenince koyulan sınır sert olur.`
- **C · score 1** — label: `"Elimden geldiğince hep cevap veririm, menti bu."`
  explanation: `Zayıf: fedakârlık gibi görünür ama sürdürülemez; tükenmişlik ve ani kopma riski.`
- **A · score 0** — label: `"Rahatsız edici, mesajları görmezden gelirim."`
  explanation: `Zararlı: sessiz çekilme mentiyi terk edilmiş hissettirir; sınır konuşularak konur, yok sayarak değil.`

#### CERT_T05_B (varyant B · `seed-certification.ts:137-146`)
**Senaryo:** Mentin, mentorluk ilişkinizi arkadaşlığa dönüştürmeye çalışıyor; seni kişisel etkinliklerine çağırıyor, senden özel iyilikler istiyor. Bu, mentorluk rolünü bulanıklaştırıyor. Ne yaparsın?

- **B · score 3** — label: `"Sıcaklığı korurum ama rolümüzü nazikçe netleştiririm: 'Sana mentörün olarak en çok şu şekilde faydalı olabilirim' derim."`
  explanation: `Doğru: sıcak ama net rol, ilişkinin amacını korur; bulanık roller sonradan hayal kırıklığı ve karmaşa yaratır.`
- **D · score 2** — label: `"Bazı davetleri kabul eder, işi de sürdürürüm; dengeyi tutmaya çalışırım."`
  explanation: `Kabul edilebilir ama risklidir: net konuşulmayan sınır zamanla iyice bulanır.`
- **C · score 1** — label: `"Kırmamak için çoğu isteğini kabul ederim."`
  explanation: `Zayıf: rol bulanıklaşınca mentorluğun hedefi kaybolur, sen de yıpranırsın.`
- **A · score 0** — label: `"Mesafeyi korumak için soğur, uzaklaşırım."`
  explanation: `Zararlı: ani soğukluk mentiyi reddedilmiş hissettirir; sınır sıcaklıkla birlikte konur.`

---

### KONU 6 — Gönüllü tükenmişliği & motivasyon (STK-özel, red-line: HAYIR)

#### CERT_T06_A (varyant A · `seed-certification.ts:149-158`)
**Senaryo:** Menti-gönüllü, başta çok hevesliydi ama birkaç aydır enerjisi düşük; "ne için uğraşıyorum ki, kimse fark etmiyor" dedi. Ne yaparsın?

- **A · score 3** — label: `"Emeğinin somut etkisini hatırlatır, onu neyin motive ettiğini yeniden keşfetmesine yardım ederim."`
  explanation: `Doğru: gönüllü motivasyonu 'anlam' ve 'görülme' ile beslenir; etkiyi somut göstermek tükenmişliğin panzehiridir.`
- **C · score 2** — label: `"Biraz mola vermesini öneririm."`
  explanation: `Kabul edilebilir: dinlenme iyi, ama altta yatan 'anlam kaybını' ele almazsan mola sonrası aynı yere döner.`
- **B · score 1** — label: `"Herkes yorulur, geçer derim."`
  explanation: `Zayıf: hissini küçümser; tükenmişlik 'geçer' denerek geçmez.`
- **D · score 0** — label: `"Gönüllülük bu, istemiyorsan bırakabilirsin derim."`
  explanation: `Zararlı: kapıyı gösterir; aidiyeti ve emeği bir anda değersizleştirir.`

#### CERT_T06_B (varyant B · `seed-certification.ts:159-168`)
**Senaryo:** Menti-gönüllün çok yetenekli ama derneğin işleri hep aynı birkaç kişiye yükleniyor ve o da "sürekli ben mi yapıyorum" diye yakınmaya başladı. Ne yaparsın?

- **A · score 3** — label: `"Haklı olduğunu kabul eder, yükün adil dağılması için birlikte somut bir yol ararım."`
  explanation: `Doğru: gönüllüde adalet hissi motivasyonun temelidir; şikâyeti ciddiye almak tükenmeyi önler.`
- **C · score 2** — label: `"Ne kadar değerli olduğunu vurgular, biraz daha dayanmasını rica ederim."`
  explanation: `Kabul edilebilir ama takdir tek başına adaletsiz yükü çözmez; yapısal sorun sürer.`
- **B · score 1** — label: `"Herkes elinden geleni yapıyor derim."`
  explanation: `Zayıf: gerçek dengesizliği görmezden gelmek yakınmayı büyütür.`
- **D · score 0** — label: `"En iyisi sen yapıyorsun, sana güveniyoruz derim."`
  explanation: `Zararlı: iltifat gibi görünür ama yükü daha da o kişiye yıkar; tükenmişliği hızlandırır.`

---

### KONU 7 — Okul/iş ile gönüllülük dengesi (STK-özel, red-line: HAYIR)

#### CERT_T07_A (varyant A · `seed-certification.ts:171-180`)
**Senaryo:** Üniversite öğrencisi mentin sınav dönemine girdi ve gönüllü projedeki görevlerini aksatıyor. Proje de aksıyor. Ne yaparsın?

- **A · score 3** — label: `"Önceliğinin okulu olduğunu açıkça onaylar, görevleri geçici olarak birlikte hafifletir/yeniden planlarız."`
  explanation: `Doğru: mentinin uzun vadeli iyiliği projeden önce gelir; esneklik hem onu korur hem bağlılığı artırır.`
- **C · score 2** — label: `"Sınav bitene kadar araya girmem, sonra devam ederiz."`
  explanation: `Kabul edilebilir: esnek, ama görevleri birlikte yeniden planlamak projeyi de korur; tamamen bırakmak boşluk yaratır.`
- **B · score 1** — label: `"Söz verdiği görevleri yine de yapmasını beklerim."`
  explanation: `Zayıf: baskı, sınav stresine eklenince kopmaya yol açar.`
- **D · score 0** — label: `"Sorumluluk alan bırakmamalı, güvenilmez derim."`
  explanation: `Zararlı: öğrencinin gerçekliğini yok sayar; suçlamak aidiyeti kırar.`

#### CERT_T07_B (varyant B · `seed-certification.ts:181-190`)
**Senaryo:** Genç mentin, hem çalışıyor hem de gönüllü projede yer alıyor. Yorgunluktan projeye eskisi kadar katkı veremediği için kendini suçlu hissettiğini söyledi. Ne yaparsın?

- **A · score 3** — label: `"Suçluluk hissini hafifletir, katkısının azını bile değerli bulduğumu belirtir, gerçekçi bir tempo birlikte belirleriz."`
  explanation: `Doğru: gönüllülük yük değil, anlam olmalı; gerçekçi tempo hem sürdürülebilir hem sağlıklıdır.`
- **C · score 2** — label: `"Elinden geleni yapması yeterli derim."`
  explanation: `Kabul edilebilir ama somut bir gerçekçi plan olmadan suçluluk sürebilir.`
- **B · score 1** — label: `"Herkes zorlanıyor, sen de idare et derim."`
  explanation: `Zayıf: hissini normalleştirmek gibi görünse de aslında geçiştirir.`
- **D · score 0** — label: `"Söz verdiysen yapmalısın derim."`
  explanation: `Zararlı: zaten suçlu hisseden birine baskı; tükenme ve kopmayı hızlandırır.`

---

### KONU 8 — Kültürel/bireysel farklılıklara saygı (red-line: HAYIR)

#### CERT_T08_A (varyant A · `seed-certification.ts:193-202`)
**Senaryo:** Mentin, senin alışkın olduğundan çok farklı bir çalışma tarzına ve değerlere sahip. Senin yönteminle çalışmıyor ama işini de yapıyor. Ne yaparsın?

- **A · score 3** — label: `"Farklı tarzına saygı gösterir, sonuca odaklanırım; kendi yöntemimi dayatmam."`
  explanation: `Doğru: mentorluk kendini kopyalamak değil; farklılık çoğu zaman güçtür. (Kaynak: CIMER "equity & inclusion".)`
- **C · score 2** — label: `"Kendi yöntemimi öneririm ama seçimi ona bırakırım."`
  explanation: `Kabul edilebilir: paylaşmak iyi, ama 'benimki daha doğru' iması olmadan.`
- **B · score 1** — label: `"Zamanla benim tarzıma alışmasını beklerim."`
  explanation: `Zayıf: örtük dayatma; mentinin kendi gücünü köreltir.`
- **D · score 0** — label: `"Böyle olmaz, benim gibi çalışmalı derim."`
  explanation: `Zararlı: kendini standart saymak; farklılığı hata gibi görmek dışlayıcıdır.`

#### CERT_T08_B (varyant B · `seed-certification.ts:203-212`)
**Senaryo:** Mentinin senden çok farklı bir dünya görüşü ve yaşam tarzı var. Bir konuda görüşü seninkine tamamen ters. Ne yaparsın?

- **A · score 3** — label: `"Görüşüne saygı gösterir, merakla anlamaya çalışırım; amacım onu değiştirmek değil, gelişimine destek olmak."`
  explanation: `Doğru: mentörlük ideolojik hizalama değil; farklı görüşe saygı güveni ve alanı korur.`
- **C · score 2** — label: `"Kendi görüşümü belirtirim ama tartışmaya girmem."`
  explanation: `Kabul edilebilir: paylaşmak sorun değil, ama 'benimki doğru' tonundan kaçınmak şart.`
- **B · score 1** — label: `"Konuyu değiştirir, hiç girmem."`
  explanation: `Zayıf: kaçınmak güvenli görünür ama gerçek bir bağ kurma fırsatını da kaçırır.`
- **D · score 0** — label: `"Yanlış düşünüyorsun, ikna etmeye çalışırım."`
  explanation: `Zararlı: mentiyi kendine benzetmeye çalışmak; güveni ve alanı yok eder.`

---

### KONU 9 — Gizlilik & güven (red-line: EVET)

#### CERT_T09_A (varyant A · `seed-certification.ts:215-224`)
**Senaryo:** Mentin sana özel bir zorluğunu (ailevi bir sorun) güvenerek anlattı. Ertesi gün başka bir gönüllü "menti nasıl, bir sorunu mu var?" diye sordu. Ne yaparsın?

- **B · score 3** — label: `"'Bunu onunla konuşman en iyisi' der, paylaşılanı korurum."`
  explanation: `Doğru: güven mentorluğun temelidir; bir kez kırılırsa onarılması çok zordur.`
- **C · score 2** — label: `"'İyi, sadece biraz yoğun' gibi geçiştiririm."`
  explanation: `Kabul edilebilir: sır vermiyor ama en temizi hiç kapı aralamamak; 'onunla konuş' demek daha nettir.`
- **D · score 1** — label: `"Genel bir şey söylerim, detay vermem."`
  explanation: `Zayıf: 'genel' bile olsa mentinin özeline dair ima güveni riske atar.`
- **A · score 0** — label: `"Sorunu olduğunu, ne yaşadığını anlatırım; yardım etsin diye."`
  explanation: `Zararlı: iyi niyetli olsa bile güveni kırar; menti bir daha hiçbir şey paylaşmaz.`

#### CERT_T09_B (varyant B · `seed-certification.ts:225-234`)
**Senaryo:** Mentin sana bir hatasını utanarak itiraf etti ("aslında o işi ben batırdım"). Birkaç gün sonra kurumda o hatayla ilgili bir tartışma çıktı ve senin bildiğin ortaya çıkabilir. Ne yaparsın?

- **B · score 3** — label: `"Mentinin bana güvenerek anlattığını korur, onu ifşa etmem; istersem onu kendisi konuşmaya cesaretlendiririm."`
  explanation: `Doğru: güven mentorluğun temeli; menti hatasını sahiplenecekse bunu kendi yapmalı, sen ifşa ederek değil.`
- **C · score 2** — label: `"Sessiz kalırım ama mentiyi durumu kendisinin açıklaması için teşvik ederim."`
  explanation: `Kabul edilebilir ve 3'e yakın; tek fark, güveni koruduğunu ona açıkça hissettirmek daha güçlü olurdu.`
- **D · score 1** — label: `"Sorulmadıkça bir şey söylemem ama sorulursa doğruyu söylerim."`
  explanation: `Zayıf: mentinin güvenini koşullu hale getirir; 'sorulursa söylerim' güveni riske atar.`
- **A · score 0** — label: `"Doğrusu bu, bildiğimi paylaşırım."`
  explanation: `Zararlı: güvenle paylaşılanı ifşa etmek; menti bir daha sana hiçbir şey açmaz, mentorluk biter.`

---

### KONU 10 — Kriz & hassas durum yönetimi (red-line: EVET)

#### CERT_T10_A (varyant A · `seed-certification.ts:237-246`)
**Senaryo:** Mentin görüşmede ciddi bir duygusal kriz belirtisi gösteriyor (umutsuzluk, "artık dayanamıyorum" gibi ifadeler). Ne yaparsın?

- **B · score 3** — label: `"Yargılamadan dinler, ciddiye alır ve onu bir uzmana/profesyonel desteğe nazikçe yönlendiririm."`
  explanation: `Doğru: mentör dinleyebilir ve önemseyebilir ama terapist değildir; doğru yönlendirme hayati olabilir. Rolünün sınırını bilmek sorumluluktur.`
- **D · score 2** — label: `"Dinlerim ve yanında olduğumu söylerim."`
  explanation: `Kabul edilebilir ama eksik: destek iyi, fakat profesyonel yönlendirme yapılmazsa mentör kapasitesinin ötesine geçmiş olur.`
- **C · score 1** — label: `"Konuyu olumluya çevirmeye, moralini yükseltmeye çalışırım."`
  explanation: `Zayıf: iyi niyetli ama ciddi krizi hafifletmek kişinin duygusunu geçersiz kılabilir.`
- **A · score 0** — label: `"Bu benim işim değil, konuyu değiştiririm."`
  explanation: `Zararlı: krizdeki birini görmezden gelmek; en azından dinlemek ve yönlendirmek gerekir.`

#### CERT_T10_B (varyant B · `seed-certification.ts:247-256`)
**Senaryo:** Mentin, sana ailesinde ciddi bir sağlık/şiddet durumu yaşadığını, çok zorlandığını anlatıyor. Sen bu konuda uzman değilsin ama menti senden yardım bekliyor. Ne yaparsın?

- **B · score 3** — label: `"İçtenlikle dinler, yanında olduğumu belli eder ve onu doğru profesyonel desteğe (uzman/kurum) yönlendiririm."`
  explanation: `Doğru: mentör önemseyebilir ama uzman değildir; şefkatli dinleme + doğru yönlendirme, kapasitenin ötesine geçmeden en faydalı olandır.`
- **D · score 2** — label: `"Elimden geldiğince ona akıl vermeye, çözüm bulmaya çalışırım."`
  explanation: `Kabul edilebilir değil-e yakın: iyi niyetli ama uzmanlık gerektiren bir konuda amatör tavsiye zarar verebilir; asıl doğru olan yönlendirmek.`
- **C · score 1** — label: `"Çok üzülür, ben de kendi benzer deneyimimi anlatırım."`
  explanation: `Zayıf: empati iyi ama odağı kendine çekmek ve profesyonel yönlendirme yapmamak eksik kalır.`
- **A · score 0** — label: `"Bu çok ağır, bu konulara giremem deyip uzaklaşırım."`
  explanation: `Zararlı: zor anında terk etmek; en azından dinlemek ve doğru yere yönlendirmek insani ve gereklidir.`

---

## 3. Özet

- **20 senaryo** (10 konu × 2 varyant A/B), her senaryoda **4 şık** (score 3/2/1/0). Toplam 80 seçenek.
- **4 red-line konu** (8 red-line senaryo): KONU 2, 5, 9, 10.
- **Baraj (2 katmanlı):** (1) oransal eşik = geçen konu ≥ ceil(açık konu × 0.8); normal konuda 3/2 geçer, red-line konuda SADECE 3 geçer. (2) red-line mutlak kapı = her açık red-line konu 3 ile geçilmeli. İkisi de sağlanmalı. Payda sabit değil = kurumdaki AKTİF konu sayısı (min 5). 2 başarısız denemede 24s cooldown.
- **Canlı senaryo sayısı: ⏳ TEYİT GEREK (canlı DB).** Kod 20 içerir; DB'ye sorulmadı.
- **Güvenli seed runner: YOK.** `seedCertification()` yalnız tehlikeli `prisma/seed.ts`'ten çağrılıyor (deleteMany'li); standalone güvenli runner eklenmesi gerekiyor (🔴 madde 30/73).
