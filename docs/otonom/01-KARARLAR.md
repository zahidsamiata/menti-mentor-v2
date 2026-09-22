# 01-KARARLAR — Ürün Karar Kuyruğu (v2)

**Nasıl cevaplarsın:** Her kartın en altındaki `**CEVAP:**` satırına harf yaz. Örnek: `**CEVAP:** A`
İstersen yanına not ekle: `**CEVAP:** A — ama metni ben yazacağım`
Cevapsız bıraktığın karar, ilgili işi kilitler. Kilitlediği iş her kartta yazıyor.

**Ajan bu dosyaya yalnız SORU ekler, cevap yazmaz.** Yeni sorular dosyanın sonuna, numara devam ederek.
**Teknik kararlar burada YOKTUR** — onları ajan kendi verir (kütüphane, dosya yapısı, isimlendirme,
renk paleti, hata mesajı metni, hangi mükerrer ucun kalacağı, çeviri).

---

## 📑 İÇİNDEKİLER — kararlar etkiye göre sıralı (2026-09-19)
> "Kaç işi açar" = o karara 🔴 ile bağlı `00-KUYRUK.md` K-/F-/E- satırı sayısı (kanıt: satır kimliği).
> En çok iş açan üstte. Cevap verirsen o satır(lar) çalışılabilir hale gelir.
> ⚠️ K-19'un kapı etiketi literalde "KARAR-8, KARAR-10" yazıyor ama İÇERİĞİ (menti mentör listesi + toplantı linki)
> KARAR-6 + KARAR-7'ye karşılık geliyor — kapı etiketi olası yazım hatası; aşağıda içeriğe göre eşlendi (kart gövdeleri değişmedi).

| # | Konu (5-6 kelime) | Kaç işi açar | Cevap durumu |
|---|---|:---:|---|
| KARAR-11 | Kullanılmayan/mükerrer kod ne olsun | **2** (K-13, E-5) | ✅ **CEVAPLANDI (2026-09-21): A** |
| KARAR-22 | Mentör reddederken ne olsun (ret deneyimi) | 1 (P-05) | ✅ **CEVAPLANDI (2026-09-21): B** · ⚠️ e-posta ayağı SMTP bekler |
| KARAR-1 | Randevu format/süre kim belirler | 1 (K-15) | ✅ **CEVAPLANDI (2026-09-21): A** · ⛔ migration + yedek + PO onayı |
| KARAR-2 | Profile serbest bağlantı alanı | 1 (K-17) | ⬜ boş |
| KARAR-3 | Sertifika "bildirim yükümlülüğü" hukuki metni | 1 (K-16) | ⬜ boş |
| KARAR-4 | Kriz destek kaynağı metni | 1 (K-16) | ⬜ boş |
| KARAR-5 | Öğrenme yolculuğu seed canlıya | 1 (K-18) | ⬜ boş |
| KARAR-6 | Menti tüm mentörleri görsün mü | 1 (K-19 içerik) | ✅ **CEVAPLANDI (2026-09-21): A** · + alt uyum eşiği |
| KARAR-7 | Online toplantı linkini kim girer | 1 (K-19 içerik) | ✅ **CEVAPLANDI (2026-09-21): A** |
| KARAR-10 | OCEAN/SJT psikometri motoru | 1 (F-11) | ✅ **CEVAPLANDI (2026-09-21): C** · ⭐ AŞAMALI (3 aşama, feature flag) |
| KARAR-19 | KVKK geri-dönülmez yetkiler kümesi | 1 (F-07) | ⬜ boş · ⚠️ ağustos G1-15/16/29 ✅ işleme-al |
| KARAR-20 | Mentör menti talebini reddedebilsin mi | 1 (F-17) | ✅ **CEVAPLANDI (2026-09-21): A** |
| KARAR-21 | STK anket cevap tipi (answerType) | 1 (F-12) | ⬜ boş · ⚠️ ağustos G3-13 ✅ → C seçeneği dışlanmış |
| KARAR-8 | Repoları private yap | 0 (PO aksiyonu) | ⬜ boş |
| KARAR-9 | Kulüp modülü + İş İlanları | 0 (eklenmezse B) | ⬜ boş · ⚠️ ağustos G1-13 kulüp kurumu aktif / G10-12 modül ⏸️ |
| KARAR-12 | Görüşme geri bildirim kayıt sistemi | 0 | ⬜ boş |
| KARAR-13 | Yöneticiye manuel "işlet" butonları | 0 | ⬜ boş |
| KARAR-14 | Yönetici bir kullanıcının verisini silsin mi | 0 | ⬜ boş |
| KARAR-15 | Çok-kuruma üye kurumlar arası geçiş | 0 | ⬜ boş |
| KARAR-16 | Yöneticiye eşleştirme kontrolleri | 0 | ⬜ boş |
| KARAR-17 | Kurum yöneticisi davetsiz önizleme | 0 | ⬜ boş |
| KARAR-23 | Kurum bildirimleri açılsın mı (onay/ret/düzeltme maili) | 1 (U-04) | ⬜ boş · W §4.1 · HUKUKİ |
| KARAR-24 | Hata iz kaydı (stack) panele açılsın mı | 0 (V-02 kısmı) | ⬜ boş · W §4.2 · KVKK |
| KARAR-25 | Gerçek yedek nereye yazılsın | 0 (G1-28 🔴) | ⬜ boş · W §4.3 · KVKK |
| KARAR-26 | İki yedek tablo (S26/S37) düşürülsün mü | 0 (DB) | ⬜ boş · W §4.4 · GERİ DÖNÜLMEZ |
| KARAR-27 | Dış hata izleme servisi kurulsun mu | 0 | ⬜ boş · W §2.A · KVKK |
| KARAR-28 | Ölü LLM/OpenAI env silinsin mi | 0 | ⬜ boş · Bölüm 4 · SİLME PROTOKOLÜ |
| KARAR-29 | Öğrenme yolculuğu diğer şık açıklamaları gösterilsin mi | 1 (K-06) | ✅ **CEVAPLANDI (2026-09-21): A** |
| KARAR-0 | Merge politikası | — | ✅ CEVAPLANDI |
| KARAR-18 | PO-manuel işler listesi (onay değil) | — | — (hatırlatma) |
| **KARAR-35** | **Canlı DB'ye salt-okuma izni** | **5+** (md.30·33·118, S10, Y6) | ⬜ boş · ⭐ BB turu · en çok iş açan yeni kart |
| **KARAR-36** | **Yarım 3 teknik kalem** (`answeredFollowup` · ikiz alan · 2 yedek tablo) | **4** (Y-18, D3, S26, S37) | ⬜ boş · ⭐ BB turu · ⚠️ `migrate dev` yedek tabloyu silebilir |
| **KARAR-34** | **Kulüp tipi kurum + kurumlar arası görünürlük** | **3** (md.91·115·116) | ⬜ boş · ⭐ BB turu · avukat notu var |
| **KARAR-30** | **Senaryo isimleri: seed'den önce mi sonra mı** | **2** (I-09, K-16/K-18 sırası) | ⬜ boş · ⭐ BB turu · ⚠️ yanlış sıra = içerik iki kez canlıya yazılır |
| **KARAR-31** | **Kriz bildirimi (kendine zarar) + yaş sınırı** | **2** (I-18, G1-01) | ⬜ boş · ⭐ BB turu · ⛔ AVUKAT ön koşulu, öneri YOK |
| **KARAR-32** | **Mentör kendini havuzdan çekebilsin mi** | **2** (Y-15, `mentorVisibilityEnabled`) | ✅ **CEVAPLANDI (2026-09-21): A** |
| **KARAR-33** | **Kurumdan üye çıkarma + red tipi** | **2** (Y-14/md.36, md.35) | ⬜ boş · ⭐ BB turu · backend hazır, düğme yok |
| **KARAR-37** | **madde 103 — kart mı özet mi kazanır** | 1 (md.103) | ⬜ boş · ⭐ BB turu · G1-23 vakasının tekrarı riski |

> ⭐ **DÖRT KONSEY KARARLARI (2026-09-21) — KARAR-38…52.** Etkiye göre sıralı; "kaç işi açar" = 🔴 ile bağlı kuyruk satırı sayısı.

| # | Konu (5-6 kelime) | Kaç işi açar | Cevap durumu |
|---|---|:---:|---|
| **KARAR-45** | **Arketip adları: hangi metin hangi koda bağlanacak** | **4** (IC-14, I-01, I-15, IC-03'ün `M1`/`m1` ayağı) | ⬜ boş · ⭐ içerik konseyi · ⚠️ "Kâşif" üç ayrı anlamda · KARAR-10'dan AYRI |
| **KARAR-47** | **Hukuki metin paketi — avukata tek seferde ne sorulacak** | **5 kalem** (KARAR-38·3·4 + F-02 + F-03/GV-18) | ⬜ boş · ⭐ içerik konseyi · ⛔ AVUKAT · tek görüşme |
| **KARAR-44** | **Algoritma kendi sonuçlarından öğrensin mi + hangi memnuniyet "gerçek"** | **2-3** (PS-05, F-08, KARAR-12) | ⬜ boş · ⭐ psikometri konseyi |
| **KARAR-42** | **DISC testi tekrar edilebilsin mi** (3 düğme vaat ediyor, hiçbiri çalışmıyor) | **2** (PS-10 döngüsü, PS-03'ün faydası) + yeni satır | ⬜ boş · ⭐ psikometri konseyi · VERİ |
| **KARAR-46** | **Sertifika içeriğinin hangi sürümü canlıya gidecek** | **2** (P-99 → K-16) | ⬜ boş · ⭐ içerik konseyi · SEED · ⚠️ 88 şıkın TAMAMI + 15 senaryo eler |
| **KARAR-48** | **Test sonucu ve eşleşme skoru kullanıcıya nasıl anlatılsın** | **1** (3 ekran · C1-1…C1-6) | ⬜ boş · ⭐ içerik konseyi |
| **KARAR-38** | **Sunucu ülkesi + KVKK aydınlatma metni** | **1** (GV-09) | ⬜ boş · ⭐ güvenlik konseyi · ⛔ AVUKAT ön koşulu (03-PO #19/#20) · KARAR-47 paketinde |
| **KARAR-39** | **Anonimleştirme kapsamı: arketip kopyası + başkasının yorumu** | **1** (GV-08 yorum ayağı) | ⬜ boş · ⭐ güvenlik konseyi · arketip ayağı karardan BAĞIMSIZ |
| **KARAR-40** | **Eski `POST /api/meetings` ucu: düzelt mi karantina mı** | **1** (GV-06 kalıcı çözümü) | ⬜ boş · ⭐ güvenlik konseyi · ⚠️ acil yama karardan BAĞIMSIZ · K-13/E-4 kümesi |
| **KARAR-41** | **Mentörün bir kontenjanı olsun mu** | **1** (P-15) | ⬜ boş · ⭐ psikometri konseyi · B seçeneği MIGRATION |
| **KARAR-43** | **Menti, mentörün eleyeceği eşleşmeyi görmeye devam etmeli mi** | **1** (cevap sonrası yeni satır) | ⬜ boş · ⭐ psikometri konseyi |
| **KARAR-49** | **`devir/01` ve `devir/06`: dondurulmuş mu, kalıcı referans mı** | **2** (6 bayat "merge etme" satırı) | ⬜ boş · ⭐ yönetişim konseyi · BELGE POLİTİKASI |
| **KARAR-51** | **4 "yaşayan ama ölü" belge dondurulsun mu** | **2** (YN-06 + 🔄 sayımı) | ⬜ boş · ⭐ yönetişim konseyi |
| **KARAR-50** | **Kuralların "geçersizleşme koşulu" zorunlu olsun mu** | **4** (YN-04, YN-05 + 2 takip) | ⬜ boş · ⭐ yönetişim konseyi · ⚠️ "KURAL 17" diye bir kural HİÇ YAZILMADI |
| **KARAR-52** | **Taşınan KURAL 8 mükerreri: hangi gövde kalsın** | **1** (YN-02) | ⬜ boş · ⭐ yönetişim konseyi · ⚠️ BU TURDA DOĞDU (CLAUDE.md bölmesi) |

---

### KARAR-0 · Merge politikası ✅ CEVAPLANDI
**CEVAP (PO, 2026-09-10): OTOMATİK.** Ajan kendi doğrulama listesini geçen 🟢 işleri merge eder ve canlıya alır.
Değişmeyen iki istisna: migration ve seed hâlâ PO onayı ister. 🟡 işler PR'da bekler.

---

### KARAR-1 · Randevuda format ve süreyi kim belirlesin?  [ÜRÜN KARARI · MIGRATION]
**Şu an ne var:** Menti randevu isterken altı şeyi kendisi seçiyor: mentör, format (online/yüz yüze/telefon), tarih, saat, süre, konu. Mentörün müsaitliği ekranda bilgi olarak duruyor. Kanıt: `frontend/src/app/(dashboard)/book-meeting/page.tsx`
**Not — bir yanlış anlama düzeltildi:** Mentörün SAAT müsaitliği aslında bağlayıcı. Menti müsait olmayan saati seçerse sistem reddediyor (`backend/src/controllers/meetingController.ts:469-483`, "Seçilen saat mentörün müsaitlik aralığına uymuyor"). Yani sorun "menti istediğini yapıyor" değil; **formu doldurduktan SONRA hata yiyor.** Ayrıca format ve süre üzerinde mentörün hiç sözü yok.
**Sorun ne:** Bir mentör "ben yalnız online, yalnız 30 dakika görüşürüm" diyemiyor. Menti 90 dakika yüz yüze talep edebiliyor; mentör ya kabul ediyor ya reddetmek zorunda kalıyor.
**Neden sana soruyorum:** Bu "yetki kimde" sorusu — ürünün karakterini belirliyor. Ayrıca veritabanında alan eklemek gerekiyor (`AvailabilityBlock` bugün yalnız gün+saat tutuyor, `schema.prisma:1074-1092`), yani geri dönüşü zor.
**Seçenekler:**

**A) Mentör slot açar, format ve süre slota yazılır** *(tam mimari)*
· Kullanıcı ne görür: Mentör "Salı 14:00-16:00, online, 45 dakika" diye slot açar. Menti hazır slotlardan birini tıklar, sadece görüşme konusunu yazar.
· Ne kazanırsın: Mentör kendi sınırını koyar, hayır demek zorunda kalmaz. Menti altı alan yerine bir tık + bir metin. Randevu reddi neredeyse sıfıra iner.
· Ne kaybedersin: En büyük iş. Migration gerekir. Mentör slot açmazsa menti hiç randevu isteyemez — yani mentörler tembel davranırsa akış tıkanır.
· Süre: L · Geri alınır mı: zor (veri modeli değişiyor) · Migration: VAR

**B) Format ve süre mentide kalsın, yalnız seçim kolaylaşsın** *(yarım çözüm, K-05)*
· Kullanıcı ne görür: Menti serbest tarih/saat yazmak yerine mentörün açık aralıklarından seçiyor. Format ve süreyi yine kendisi seçiyor.
· Ne kazanırsın: Migration yok, bugün çıkar, "form doldurdum sonra hata yedim" sorunu biter.
· Ne kaybedersin: Mentör hâlâ "sadece online" diyemiyor. Asıl şikayet yarı çözülmüş kalır.
· Süre: M · Geri alınır mı: evet · Migration: yok

**C) Önce B, canlıda gör, sonra A'ya karar ver**
· Kullanıcı ne görür: Kısa vadede B ile aynı.
· Ne kazanırsın: Gerçek kullanım verisiyle karar verirsin. Yanlış mimariye emek gömmezsin.
· Ne kaybedersin: Gerçek kullanıcı ~sıfır, yani bekleyerek öğreneceğin veri gelmeyebilir. İki kez iş yapmış olursun.
· Süre: M şimdi + L sonra · Geri alınır mı: evet · Migration: sonra

**Karşılaştırma:** Mentörlerin zamanını koruyacağına ve platformun mentör tarafına güven vereceğine inanıyorsan A doğru — ama mentörleri slot açmaya alıştırmak gerekir. Menti tarafının akışkanlığı önceliğinse ve mentör şikayeti henüz gelmediyse B yeterli. C, karar vermeyi erteler ve bu projede erteleme zaten pahalıya mal olmuş.
**Benim önerim:** A — testte "en öncelikli mimari hata" diye işaretlenen şey bu, default değerlerle (ONLINE / 60dk) mevcut kayıtlar bozulmaz, yedek tablo alınacak.
**Cevap vermezsen:** K-15 atlanır. K-05 (B'nin kendisi) yine de yapılır, yani boşa geçmez.
**CEVAP:** A  *(PO, 2026-09-21, strateji katmanı karar oturumu)*
> ⛔ **Migration gerektirir** (`AvailabilityBlock`'a `format` + `durationMin`): uygulanırken **ÖNCE tarihli yedek tablo, SONRA PO'nun AÇIK onayı.** Ajan tek başına migration **ÇALIŞTIRMAZ**.

---

### KARAR-2 · Profile serbest bağlantı alanı  [ÜRÜN KARARI · MIGRATION]
**Şu an ne var:** Profilde yalnız LinkedIn ve Instagram alanı var. Kanıt: `frontend/src/lib/api/profile.ts`
**Sorun ne:** Kişisel site, YouTube kanalı, portfolyo linki konulacak yer yok. Kullanıcı LinkedIn alanına YouTube linki yazıyor (testte oldu).
**Neden sana soruyorum:** Yeni alan = veritabanı değişikliği; ayrıca "profil ne kadar zengin olsun" bir ürün tercihi.
**Seçenekler:**
**A) Tek `websiteUrl` alanı ekle** · Kullanıcı: bir adet serbest link koyabilir · Kazanç: en sık ihtiyaç karşılanır, küçük iş · Kayıp: iki link isteyen yine sığdıramaz · Süre: S · Geri alınır: evet · Migration: VAR
**B) Çoklu link listesi** (ad + adres, istediği kadar) · Kullanıcı: sınırsız link ekler · Kazanç: hiç kısıt yok · Kayıp: yeni tablo, yönetim ekranı, spam riski, profil dağınıklaşır · Süre: L · Geri alınır: zor · Migration: VAR
**C) Şimdilik ekleme** · Kullanıcı: iki alanla yetinir · Kazanç: migration bütçesi K-15'e kalır · Kayıp: test bulgusu açık kalır · Süre: yok · Migration: yok
**Karşılaştırma:** Mentör profilinin bir "vitrin" olmasını istiyorsan B; profil sade kalsın ve eşleştirme öne çıksın diyorsan A yeter. C, bu turda başka migration yapılacaksa mantıklı — iki migration yerine bir tane.
**Benim önerim:** A — B'nin karmaşıklığı bu aşamada karşılığını vermez. KARAR-1'e A dersen ikisini aynı migration turunda yapabilir.
**Cevap vermezsen:** K-17 atlanır. Başka iş etkilenmez.
**CEVAP:**

---

### KARAR-3 · Sertifika senaryosunda "bildirim yükümlülüğü" metni  [ÜRÜN KARARI · HUKUKİ]
**Şu an ne var:** Sertifika soru bankasında 22 senaryo / 88 şık yazılı ama canlıya hiç aktarılmadı. Ekranda "Senaryo Q_T1 / Seçenek A" gibi kod isimleri görünüyor (testte görüldü).
> ⚠️ SAYI DÜZELTMESİ (2026-09-19, kod-teyitli — İKİ SAYI DA GERÇEK, biri diğerini geçersiz kılmaz):
> **"22 senaryo / 88 şık" = YAZILI İÇERİK** — `docs/raporlar/icerik/sertifika-oturum1/2/3-...-2026-09-08.md` üç belgesinde (11 konu × 2 varyant). Bu doğru, kaynak-kanıtlı.
> **AMA seed kodu `backend/prisma/seed-certification.ts` şu an 20 senaryo / 80 şık** (eski sürüm; kanıt: 20× `CERT_T`, 80 `options`, 10 tekil `topic`). **Finalize 22/88 içeriği henüz seed'e taşınMADI.**
> ⚠️ **SAYI DÜZELTMESİ-2 (2026-09-21, içerik konseyi ① — kaynak-teyitli):** ~~[ESKİ · 2026-09-21] fark yalnız **2 senaryo + 8 şık** (20/80 → 22/88)~~ — **BU YANLIŞTI.** Doğrusu: `tam.md` (= seed'in birebir kaynağı, `seed-certification.ts:7`) 20 sahne sundu, finalize içerik bunların **yalnız 5'ini** aldı (%25) — yani seed'deki **20 senaryonun 15'i gerekçeli olarak ELENDİ** ("ELENEN SAHNELER" tabloları: yüzey ayrımı/çelişki). Kalan **5'inin 5'i de yeniden yazıldı** (5/5'inde metin farkı, **birinde puan anlamı TERS DÖNDÜ**). ⛔ Pratik sonuç: taşınacak şık sayısı 8 değil **88'in TAMAMI**; düşecek senaryo **15**. Efor **S değil L**. Kanıt: `docs/raporlar/kesif/konsey-icerik-2026-09-21.md:16-19,118-122`.
> ⛔ SONUÇ: K-16 bugün `seed-certification` çalıştırırsa **20/80 çıkar, 22/88 değil.** Seed öncesi bir "içerik→seed taşıma" adımı gerekir (KARAR-3/4 metni + madde 159 kriz hukuki teyidi + KALEM 8 destek kaynağı adı bloklarıyla birlikte). Bu, KARAR-3'ün hukuki-metin sorusunu değiştirmez; yalnız seed'in bugünkü kapsamını netleştirir.
**Sorun ne:** Bankadaki bir senaryoda mentörün ciddi bir durumu öğrendiğinde ne yapacağı soruluyor ve doğru şıkta **yasal bildirim yükümlülüğü** ima ediliyor. Bu hukuki bir iddia, avukat onayı yok. Bu tek cümle yüzünden 88 şıkın tamamı üç haftadır canlıya çıkmıyor.
**Neden sana soruyorum:** Hukuki sonucu olan bir metin. Ben avukat değilim, aşağıdaki hiçbir şey hukuki görüş değildir.
**Seçenekler:**
**A) Yasal iddia içermeyen metinle yaz** — "kurumun belirlediği destek birimine yönlendirir ve kurum politikasını uygular" · Kullanıcı: sertifika içeriği bugün canlıya çıkar · Kazanç: 87 şık serbest kalır, hukuki risk almazsın · Kayıp: avukat sonra "aslında bildirim zorunlu" derse metin yeniden yazılır · Süre: S · Geri alınır: evet
**B) O senaryoyu bankadan geçici çıkar** (21 senaryo / 84 şık seed edilir) · Kullanıcı: sertifika çıkar, bir senaryo eksik · Kazanç: tartışmalı cümleye hiç dokunmazsın · Kayıp: banka eksik, sertifikanın kapsamı daralır, sonra tekrar seed gerekir · Süre: S · Geri alınır: evet
**C) Avukat cevabını bekle** · Kullanıcı: sertifika ekranı bozuk kalmaya devam eder · Kazanç: sıfır risk · Kayıp: süresiz bekleme; bugünkü durum bu · Süre: ? · Geri alınır: —
**Karşılaştırma:** A ile B arasındaki fark, "yumuşatılmış metinle yayınlamak" ile "hiç sormamak". Konunun mentör eğitiminde yer alması senin için önemliyse A; konu hassas ve yarım söylemektense hiç söylememeyi tercih ediyorsan B. C yalnızca avukat görüşünün günler içinde geleceğini biliyorsan mantıklı.
**Benim önerim:** A — metin hukuki iddia içermiyor, kurum politikasına yönlendiriyor; avukat gelince tek satır değişir.
**Cevap vermezsen:** K-16 atlanır → sertifika ekranı bozuk kalır (madde 30 açık).
**CEVAP:**

---

### KARAR-4 · Kriz durumunda yönlendirilecek "destek kaynağı" ne yazsın?  [ÜRÜN KARARI]
**Şu an ne var:** Bir şıkta "somut destek kaynağına yönlendirir" yazıyor ama kaynağın adı boş bırakılmış.
**Sorun ne:** Her kurumun kaynağı farklı: üniversitede psikolojik danışma birimi, şirkette İK, STK'da başka bir yapı. Tek metin hepsine uymuyor.
**Neden sana soruyorum:** Kurumlara görünen metin + kriz anıyla ilgili, yani yanlış yönlendirme zararlı olabilir.
**Seçenekler:**
**A) Sabit metin:** "kurumun psikolojik destek birimi; acil durumda 112" · Kullanıcı: her kurumda aynı metni görür · Kazanç: bugün çıkar, her kuruma kabaca uyar · Kayıp: birimi olmayan kurumda metin havada kalır · Süre: S · Migration: yok
**B) Kuruma özel alan** (`supportContactText`) — kurum kendi yazar, boşsa A metni görünür · Kullanıcı: kendi kurumunun gerçek birimini görür · Kazanç: doğru yönlendirme · Kayıp: küçük migration + kurum yönetici ekranı; kurumlar doldurmazsa zaten A'ya düşer · Süre: M · Migration: VAR
**C) Yalnız "112 / acil yardım hattı"** · Kullanıcı: tek ulusal numara · Kazanç: her zaman doğru, hiç bakım istemez · Kayıp: kurum içi destek yolu görünmez; her durum 112'lik değil, orantısız kaçabilir · Süre: S · Migration: yok
**Karşılaştırma:** Kurumların çeşitliliği senin satış hikâyenin parçasıysa B doğru yatırım. Hızlı çıkmak istiyorsan A yeterli ve B'ye sonradan geçilebilir (A metni varsayılan olur). C tek başına eksik ama A ile birleştirilmiş hali zaten A'nın içinde.
**Benim önerim:** A şimdi, B'yi kuyruk adayı yap — A ile seed bugün atılır, B sonra üstüne gelir.
**Cevap vermezsen:** K-16 atlanır (KARAR-3 ile birlikte sertifika seed'ini kilitliyor).
**CEVAP:**

---

### KARAR-5 · Öğrenme yolculuğu içeriği canlıya girsin mi?  [ÜRÜN KARARI · SEED]
**Şu an ne var:** İçerik hazır (`seed-learning-journey` güvenli komut), canlıya hiç atılmamış. Neden atılmadığı belgelerde yazmıyor.
**Sorun ne:** Kullanıcı öğrenme yolculuğu bölümünde ya boş ekran ya eksik içerik görüyor.
**Neden sana soruyorum:** Seed = canlı veriye yazma. Senin iki değişmez kuralından biri.
**Seçenekler:**
**A) At (önce yedek)** · Kullanıcı: içeriği görmeye başlar · Kazanç: hazır iş kullanıcıya ulaşır · Kayıp: içeriği kimse okumadan canlıya gider; kötü/eksik metin kullanıcıya görünür · Süre: S · Geri alınır: evet (yedek var)
**B) Önce sen oku, sonra at** · Kullanıcı: bir gün daha bekler · Kazanç: canlıya çıkan metni görmüş olursun · Kayıp: sana bir okuma işi daha düşer · Süre: S + senin zamanın
**C) Ertele** · Kullanıcı: boş ekran devam · Kazanç: yok · Kayıp: hazır iş rafta kalmaya devam eder
**Karşılaştırma:** Bu içeriğin kalitesinden eminsen A. Kim yazdığını/ne yazdığını hatırlamıyorsan B — ajan içeriği okunur biçimde ilerleme dosyasına döker, sen beş dakikada bakarsın. C'nin savunması yok.
**Benim önerim:** B — kullanıcıya ilk görünen içerik, bir kez göz gezdirmeye değer.
**Cevap vermezsen:** K-18 atlanır.
**CEVAP:**

---

### KARAR-6 · Menti tüm mentörleri görebilsin mi?  [ÜRÜN KARARI]
**Şu an ne var:** Menti yalnız kendisiyle eşleştirilen mentörü görüyor; kurumdaki diğer mentörlerin listesi yok.
**Sorun ne:** Testte "mentörleri göremiyorum" diye not düşüldü. Ama bu eksiklik mi, bilinçli tasarım mı belli değil.
**Neden sana soruyorum:** Bu ürünün temel iddiasına dokunuyor — "DISC ile doğru eşleştirme" mi yoksa "mentör kataloğu" mu satıyorsun?
**Seçenekler:**
**A) Liste olmasın** · Kullanıcı: yalnız eşleştiği mentörü görür · Kazanç: eşleştirme motorunun değeri korunur; menti "ben seçeyim" diye motoru atlamaz · Kayıp: menti kapalı kutu hissi yaşayabilir, güven azalabilir · Süre: yok
**B) Salt-okunur liste** (isim + uzmanlık, talep butonu yok) · Kullanıcı: kurumda kimler var görür ama doğrudan seçemez · Kazanç: şeffaflık + motor korunur · Kayıp: "görüyorum ama seçemiyorum" sinir bozucu olabilir · Süre: M
**C) Tam liste + doğrudan talep** · Kullanıcı: istediği mentöre kendisi başvurur · Kazanç: kullanıcı özgürlüğü · Kayıp: eşleştirme motoru fiilen devre dışı kalır; popüler mentörler dolar, diğerleri boş kalır · Süre: M
**Karşılaştırma:** Ürünün satış argümanı "biz doğru eşi buluyoruz" ise A ya da B. Kurumlar "çalışanımız istediğini seçsin" diyorsa C. B ortada durur ama iki tarafı da tam memnun etmeyebilir.
**Benim önerim:** A — ama bu tamamen senin ürün kararın, benim önerime güvenme; DISC motoru ürünün merkezinde olduğu için böyle diyorum.
**Cevap vermezsen:** K-19'un bu parçası atlanır.
**CEVAP:** A  *(PO, 2026-09-21, strateji katmanı karar oturumu)*
> ⭐ **PO ek isteği (iki madde):**
> **(1) Menti kendisine UYGUN OLMAYAN mentörü görmesin** → **alt uyum eşiği** uygulansın. API'de `minMatchScore` parametresi var; **menti ekranında kullanılıyor mu kontrol edilsin.** Eşik **DEĞERİ teknik karardır** — ajan makul bir varsayılan belirler ve gerekçesini yazar.
> **(2) Uyum oranı görünsün** → ✅ **ZATEN VAR:** `frontend/src/app/(dashboard)/menti/page.tsx:311-318` (yüzde + *"Neden uyumlu:"* gerekçesi; DISC tipi **bilinçli gizli**).

---

### KARAR-7 · Online görüşmenin toplantı linkini kim girer?  [ÜRÜN KARARI]
**Şu an ne var:** Online görüşme seçilebiliyor ama toplantı linkinin nereden geleceği tanımlı değil.
**Sorun ne:** Randevu onaylanıyor, taraflar nerede buluşacağını bilmiyor.
**Neden sana soruyorum:** "Sorumluluk kimde" sorusu; KARAR-1 ile de tutarlı olmalı.
**Seçenekler:**
**A) Mentör girer** · Kullanıcı: mentör randevuyu onaylarken link alanını doldurur, menti görür · Kazanç: slotu açan taraf şartları da belirler, KARAR-1'le tutarlı · Kayıp: mentör unutursa görüşme linksiz kalır, hatırlatma gerekir · Süre: S
**B) Menti girer** · Kullanıcı: talep ederken linki kendisi koyar · Kazanç: mentörün üstünde yük yok · Kayıp: mentör kendi hesabını kullanmak isteyebilir; tuhaf durur · Süre: S
**C) Sistem üretir** (Zoom/Meet entegrasyonu) · Kullanıcı: link otomatik gelir · Kazanç: hiç kimse uğraşmaz, en iyi deneyim · Kayıp: dış servis entegrasyonu, hesap yönetimi, maliyet — ayrı bir proje · Süre: L
**Karşılaştırma:** Kısa vadede A ve B arasında fark küçük; asıl fark kimin unutma riskini taşıdığı. C doğru hedef ama şimdi değil.
**Benim önerim:** A — mentör zaten slot ve şartları belirleyen taraf olacak.
**Cevap vermezsen:** K-19'un bu parçası atlanır.
**CEVAP:** A  *(PO, 2026-09-21, strateji katmanı karar oturumu)*

---

### KARAR-8 · Repoları private yapma  [PO AKSİYONU — ajan yapamaz]
**Şu an ne var:** Karar dosyası (`00-KARAR-TAKIP.md:517`) "repolar PO tarafından private yapıldı" diyor. **Gerçekte ikisi de public** — 2026-09-09'da kimlik doğrulaması olmadan klonlandı.
**Sorun ne:** Kod, KVKK metinleri, güvenlik denetim raporu, tüm karar geçmişi herkese açık. Kapatıldığı sanılan bir açık aslında açık.
**Neden sana soruyorum:** GitHub hesabı senin; ajan yapamaz.
**Seçenekler:**
**A) Bugün private yap** · Kazanç: açık kapanır · Kayıp: strateji sohbetinin repoya doğrudan erişimi kapanır, bağlam paketi yöntemine dönülür · Süre: 2 dakika
**B) Otonom turlar bitince yap** · Kazanç: birkaç gün daha hızlı bağlam · Kayıp: o günlerde açık sürüyor · Süre: 2 dakika (sonra)
**C) Public kalsın** · Kazanç: açık kaynak görünürlüğü · Kayıp: KVKK metinleri ve güvenlik raporu dahil her şey açıkta
**Karşılaştırma:** Gerçek kullanıcı ~sıfır olduğu için sızacak kişisel veri yok; risk daha çok iş/itibar tarafında. Yine de karar dosyasının yanlış bilgi taşıması başlı başına sorun — hangi seçeneği seçersen seç o satır düzeltilmeli.
**Benim önerim:** B — sonra kesinlikle yap, unutma.
**Cevap vermezsen:** Hiçbir iş kilitlenmez; açık sürer.
**CEVAP:**

---

### KARAR-9 · Kulüp modülü ve İş İlanları  [ÜRÜN KARARI]
**Şu an ne var:** İkisinin de backend'i tam yazılmış (Kulüp: 7 uç + 2 tablo; İş İlanları: 4 uç), frontend sıfır. Belgelerde "canlı PO niyeti" diye işaretli ama aylardır yapılmamış.
**Sorun ne:** Yazılmış kod kullanıcıya hiç ulaşmıyor. Ya bitirilmeli ya da açıkça ertelenmeli — ortada durması hem kafa karıştırıyor hem bakım maliyeti yaratıyor.
**Neden sana soruyorum:** Yeni bir özelliğin var olup olmayacağı kararı.
**Seçenekler:**
**A) Kulüp FE'yi kuyruğa ekle** · Kullanıcı: kulüp oluşturur/katılır · Kazanç: STK/kurum paketinde anlatacak bir şey olur · Kayıp: çekirdek akış (eşleş→randevu→görüş) hâlâ pürüzlü, dikkat dağılır · Süre: L
**B) İkisini de v2'ye ertele** · Kullanıcı: değişiklik yok · Kazanç: tüm emek çekirdek akışa gider · Kayıp: yazılmış kod raflarda beklemeye devam eder · Süre: yok
**C) Yalnız iş ilanları** · Kullanıcı: ilan listesi görür · Kazanç: kulüpten küçük iş, kurumlar için görünür değer · Kayıp: yine çekirdek dışı · Süre: M
**Karşılaştırma:** Yakında bir kuruma demo/satış yapacaksan ve kulüp o konuşmanın parçasıysa A. Önce ürünün ana akışının kusursuz çalışmasını istiyorsan B. C ikisinin ortası ama iş ilanlarının kime yarayacağı belgelerde net değil.
**Benim önerim:** B — üç bug hâlâ kullanıcıyı durduruyorken yeni modül açmak erken.
**Cevap vermezsen:** Kuyruğa eklenmez, yani B uygulanmış olur.
⚠️ AĞUSTOS SİNYALİ (2026-08-27, KISMİ — A/B/C DEĞİL): Kulüp-tipi kurum **çıkış blokeri olarak AKTİF edilecek** (`00-PO-KARARLARI-2026-08-27.md:52` G1-13) ama kulüp MODÜLÜ FE'si ⏸️ şimdilik-almada (`:79`/`:105` G10-12 — "aktif kararı verildi, iş sırasına alınmadı"). İş ilanları ağustosta hiç geçmiyor. Yani "kulüp kavramı aktif" ama "FE yap/ertele" (bu kartın A/B) hâlâ açık. PO teyit ederse CEVAP'a yazılabilir.
**CEVAP:**

---

### KARAR-10 · OCEAN/SJT psikometri motoru  [ÜRÜN KARARI]
**Şu an ne var:** Tam bir ikinci psikometri motoru yazılmış (profil hesaplama, mentör sıralama, sektör skoru, soru tabloları) ve frontend'den hiç çağrılmıyor. Üstelik bir ölçek hatası var: bugün bağlansa herkes aynı sonucu alır.
**Sorun ne:** Sistemde iki eşleştirme motoru var — biri çalışıyor (DISC), biri uyuyor (OCEAN). Bu ikilik hem kafa karıştırıyor hem her değişiklikte iki yerde düşünmek gerekiyor.
**Neden sana soruyorum:** Ürünün hangi bilimsel modele dayandığı stratejik bir karar.
**Seçenekler:**
**A) v2'ye ertele, dokunma** · Kullanıcı: değişiklik yok · Kazanç: emek çekirdeğe gider · Kayıp: ölü kod durmaya devam eder, her denetimde tekrar gündeme gelir · Süre: yok
**B) Yalnız ölçek hatasını düzelt** (matematik), bağlama · Kullanıcı: değişiklik yok · Kazanç: motor "açılmaya hazır" hale gelir, hata unutulmaz · Kayıp: kullanıcıya hâlâ sıfır değer; yine ölü kod · Süre: M
**C) Kuyruğa tam iş olarak ekle** (düzelt + bağla) · Kullanıcı: daha zengin profil ve eşleştirme · Kazanç: yatırılmış emek karşılığını verir · Kayıp: çok büyük iş; DISC zaten çalışıyor, ölçülebilir fayda belirsiz · Süre: XL
**Karşılaştırma:** Ürünün iddiası "DISC tabanlı" olarak kalacaksa A doğru ve motor bir gün silinmeli. Daha derin bir psikometri ürünü hedefliyorsan C, ama o ayrı bir proje planı ister. B, karar vermeden hatayı kapatmak — ölü kodu canlı tutmanın maliyetli hali.
**Benim önerim:** A — DISC çalışıyor, bu motor bugünün sorunu değil.
**Cevap vermezsen:** Kuyruğa eklenmez, yani A uygulanmış olur.
⚠️ AĞUSTOS SİNYALİ (2026-08-27, GERİLİM — A/B/C DEĞİL): Ağustos G2-07+G2-08+G10-21'i **"tek iş: sektör 5-bileşen + OCEAN katmanını canlı eşleştirmeye BAĞLA"** diye işleme aldı (`00-PO-KARARLARI-2026-08-27.md:108`); ayrıca G2-01..05 (DISC matrisi) 🗑️ geçersiz, "Big Five'a bırakıldı" (`:39`). Bu, bu kartın önerisi A (v2'ye ertele/dokunma) ile GERİLİMLİ — ağustos yönü bağlamaya (C) daha yakın. Ölçek hatası ayrı. PO teyit ederse CEVAP'a yazılabilir.

⚠️ EK (2026-09-21, psikometri konseyi): Bu kart YENİDEN AÇILMADI — aşağıdakiler mevcut A/B/C seçeneklerinin FİYATIDIR, yeni seçenek değildir.

**① PO'nun asıl sorusunun cevabı — rahatlatıcı:** Motor ölü AMA hiçbir kullanıcı yanlış sonuç GÖRMEDİ (kanıt: CA §B.2).
Ekrandaki "Sen bir Öncü'sün" kartı DISC harfinden üretiliyor (`onboardingController.ts:464-466` → `DiscRecallCard.tsx:57`) ve OCEAN'a hiç uğramıyor; iki veri farklı tablolarda (`User.discResultCard` ↔ `UserProfile.ocean*`) ve aralarında kod yolu yok. Kapsam beyanı: BE `src/ tests/ scripts/ prisma/` + FE `src/ e2e/`, 20+ terim harf duyarsız (`archetype · arketip · ocean · bigfive · openness · neuroticism · discToOcean · deriveArchetype · compute-profile · rank-mentors` …) → FE'deki 16 dosyadaki tüm eşleşmeler satır bazında incelendi, hepsi DISC harfi kaynaklı ya da ölü yol.
⚠️ İki "sızıntı yüzeyi" açık ama bugün kullanıcıya ulaşmıyor: (1) `POST /api/scoring/compute-profile` canlı bir uç (`server.ts:132`) ve yanıtında `archetype` + `ocean` dönüyor (`sjtScoringController.ts:74-86`) — FE çağırmıyor, uç açık; (2) `/admin/eslesmeler` sayfası arketip sütunlarını çiziyor (`eslesmeler/page.tsx:134,142`) — tablo boş olduğu için görünmüyor.

**② ÜÇ SEÇENEĞİN MALİYETİ (eşit ayrıntıda, tavsiye YOK — harfler yukarıdaki A/B/C ile aynı):**

Üç seçenekte de geçerli ortak gerçekler:
· `UserProfile.ocean*` + `archetype` DB'ye KALICI yazılıyor (`scoring.service.ts:103-115`), runtime hesap değil. Şema `schema.prisma:992-999`.
· `discToOcean` ve `deriveArchetype` için SIFIR birim testi var (kapsam: `tests/`, 8 terim harf duyarsız → 0 eşleşme). Hata tam bu yüzden sessiz kaldı.
· Canlı DB'de kaç `UserProfile` satırında `archetype != null` olduğu ❓ TEYİT GEREK — ölçülmeli, varsayılmamalı (PO işi; bulut DB'ye bakamaz).

| | A · ERTELE / DOKUNMA | B · YALNIZ ÖLÇEĞİ ONAR | C · ONAR + BAĞLA |
|---|---|---|---|
| Kullanıcı ne görür | Değişiklik yok | **Değişiklik yok** (yol zaten ölü) | Daha zengin profil + arketip kartı; eşleştirme gerekçesi değişir |
| Kaç dosya | 0 | **1 satır bloğu** (`scoring.service.ts:92-97`) *veya* formülü 0–1'e göre yaz (`adapter.ts:15-16`) | Yukarıdakiler + `matching.ts` bağlama + `scoring.config.ts:31` eşik kalibrasyonu + sektör 5-bileşen bağlama |
| Hangi test | — | **Yeni** birim testi yazılmalı (bugün 0) | Yeni birim + entegrasyon + sıralama regresyon testleri |
| Hangi davranış değişir | Hiçbiri | Hiçbiri — motor "açılmaya hazır" olur | **Canlı sıralama değişir** → mevcut eşleşmeler kayar |
| Migration | Yok | **Şema migration'ı YOK** (kolon tipleri aynı) ama veri ANLAMI değişir → `backfill/recompute` script'i gerekir | B'nin aynısı + eşik kalibrasyonu veri gerektirir |
| Geri alınır mı | — | Evet (kod geri alınır, backfill yeniden koşar) | Zor — sıralama değişimi kullanıcı deneyimine yansır |
| Süre | Yok | **S–M** | **XL** |
| **Ne kaybedersin** | Ölü kod durmaya devam eder, her denetimde yeniden gündeme gelir; `archetype` yazılmış satırlar (varsa) çöp kalır | Kullanıcıya **hâlâ sıfır değer**; ölü kodu bakımlı tutma maliyeti sürer; eşik kalibrasyonu yine yapılmamış olur | Çok büyük iş; DISC zaten çalışıyor, ölçülebilir fayda **belirsiz** — üstelik faydayı ölçecek mekanizma da yok (`Match` hiç yazılmıyor) |
| Regresyon riski | Sıfır | **Düşük** — hiçbir ekran bağlı değil, hiçbir test kırılmaz | Yüksek |

**③ İki uyarı (hangi harf seçilirse seçilsin):**
⛔ **I-13 düzeltilmeden bağlama (C), rastgeleden BETERDİR:** `COMPATIBILITY_MATRIX['M1_m1'] = 60` (`scoring.config.ts:38-44`) ⇒ `getCharacterScore` (`scoring.service.ts:39-42`) her çift için sabit 60 döner, karakter skoru HİÇ ayırt etmez. Ayrıca `BLOCKED_PAIRS = {M4:['m3'], M1:['m4']}` (`:33`) ⇒ toksik-çift vetosu hiç tetiklenmez, `isHardBlocked` daima `false`.
⛔ **Ölçek yalnız çağrı noktasında düzeltilirse** iki tip + üç ölçek yorumu belirsizliği kalır ve hata yeniden doğabilir ⇒ **I-13 ile I-14 birlikte** yapılmalı (kuyruk bunu zaten söylüyor).
⛔ **KVKK SIRASI:** C seçeneği `createMatchIfEligible`'ı (`scoring.service.ts:137`) canlandırır ve o fonksiyon `Match.mentorArchetype`/`mentiArchetype`'ı yazar. ⛔ BİRLİKTE YAPILMALI — önce silme yolu düzeltilir, SONRA Match yazımı açılır. Ters sıra = KVKK ihlali.

**Kaynak:** `docs/raporlar/kesif/konsey-psikometri-2026-09-21.md` §3 (B.1-B.4) · §5 D.1. Kartın "AĞUSTOS SİNYALİ" gerilimi (ağustos yönü C'ye yakın, kart önerisi A) bu ekle ÇÖZÜLMEZ — yalnız fiyatı konur.

**CEVAP:** C  *(PO, 2026-09-21, strateji katmanı karar oturumu)*
> ⭐ **PO kararı — AŞAMALI uygulanır. Üç aşama ayrı ayrı yapılır, her biri ayrı kapı taşır:**
>
> **1 · DÜZELT + TEST.** Ölçek hatası (DISC `0-1` ↔ formül `0-100`) giderilir, **iki farklı `DiscVector` tipi birleştirilir**, bugün **SIFIR** olan birim testleri yazılır. ⇒ **Kullanıcı etkilenmez.**
>
> **2 · YENİDEN HESAPLAMA (backfill).** DB'deki yanlış `archetype`/`ocean*` değerleri yeniden hesaplanır. ⛔ **CANLI VERİ** — önce **tarihli yedek tablo**, sonra **PO'nun AÇIK onayı.**
>
> **3 · EŞLEŞTİRMEYE BAĞLAMA — AÇMA/KAPAMA ANAHTARIYLA (feature flag).** Yeni motor eskisinin **yanında** çalışır; önce **eski/yeni sıralama karşılaştırması PO'ya gösterilir**; PO onaylarsa açılır, **tek tuşla eskiye dönülür.**
>
> ⚠️ **Uyarı — ölçüm mekanizması YOK:** eşleşme kalitesini ölçen mekanizma bugün yok (`Match` tablosuna yazılmıyor — psikometri konseyi ①). Yeni sıralamanın *"daha iyi"* olduğu bir süre **PO'nun gözüyle** değerlendirilir. `Match` yazımı düzelince (⛔ **KVKK silme yoluyla birlikte, doğru sırayla** — bkz. `GV-08` ↔ `U-18` çapraz atfı) ölçüm mümkün olur.
>
> ⚠️ **KARAR-6 bağlantısı:** menti ekranındaki uyum yüzdesi **bugün DISC motorunun skorudur**. Motor bağlanınca **YÜZDELER DEĞİŞİR** — anahtar (feature flag) bu yüzden şart.

---

### KARAR-11 · Kullanılmayan kodla ne yapılsın?  [ÜRÜN KARARI · GERİ DÖNÜLMEZ]
**Şu an ne var:** Sistemde aynı işi yapan ikinci kopyalar var. Örnek: sosyal profil düzenleme hem `/users/me/social` hem `/users/me/profile` ucunda yazılı; ekran yalnız ikincisini kullanıyor, birincisi hiç çağrılmıyor. Benzer ikilikler: sistem kayıtları (`/system-logs` ↔ `/platform/logs`), kurum yönetimi uçları.
**Sorun ne:** Ölü kod iki zarar veriyor. Birincisi, her denetimde "bu eksik özellik mi?" diye yanlış alarm üretiyor — bu üç kez oldu. İkincisi, kullanılmayan ama açık duran bir uç güvenlik yüzeyidir; kimse bakmadığı için kimse düzeltmez.
**Neden sana soruyorum:** Silmek geri dönülmezdir ve kodun neden yazıldığı bilgisini de siler. Senin kuralın net: önce niyeti bil, sonra emin ol, sonra arşivle, sonra sil.
**Seçenekler:**

**A) Karantina → bir tur bekle → sonra sil** *(iki aşamalı)*
· Kullanıcı ne görür: Hiçbir şey; bunlar zaten kullanılmıyor.
· Ne kazanırsın: Kod yerinde kalır, sadece devre dışı olur. Bir şey bozulursa tek satırla geri açılır. Arşiv belgesi hazırlanır. Bir tur sonra emin olarak silinir.
· Ne kaybedersin: İki tur sürer. O süre boyunca kod hâlâ depoda durur.
· Süre: M · Geri alınır mı: evet (kolay) · Migration: yok

**B) Sadece işaretle, hiç dokunma** *(@deprecated)*
· Kullanıcı ne görür: Hiçbir şey.
· Ne kazanırsın: Sıfır risk. Bir sonraki okuyan "bu ölü" diye bilir, yanlış alarm biter.
· Ne kaybedersin: Uç hâlâ açık — güvenlik yüzeyi durur. Kod tabanı küçülmez. Pratikte sonsuza kadar kalır.
· Süre: S · Geri alınır mı: gerekmiyor · Migration: yok

**C) Arşivle ve doğrudan sil** *(tek aşamalı)*
· Kullanıcı ne görür: Hiçbir şey — beklenen bu; beklenmeyen bir bağımlılık varsa bir şey bozulur.
· Ne kazanırsın: En temiz sonuç, tek turda biter.
· Ne kaybedersin: Karantina güvenlik ağı yok. Gözden kaçan bir kullanım varsa canlıda çıkar. Geri alma git'ten yapılır ama fark edilmesi zaman alabilir.
· Süre: S · Geri alınır mı: evet (git revert) · Migration: yok

**Karşılaştırma:** Üçünde de arşiv belgesi yazılıyor, yani "neyi sildik" bilgisi hiçbir durumda kaybolmuyor. Fark risk iştahında: A temkinli ve senin kuralına en yakın; C hızlı ama gözden kaçan bir bağımlılığı canlıda bulur; B hiçbir şeyi çözmez, sadece etiketler — ölü kod kalıcı olur.
⚠️ Hangi seçeneği seçersen seç, ajan her kalem için önce **neden yazıldığını** araştıracak. Gerekçesi bulunamayan hiçbir kalem karantinaya bile alınmayacak, sana ayrı kart olarak gelecek.
**Benim önerim:** A — senin koyduğun kuralın kod karşılığı bu; geri dönüş ağı var, arşiv var, ikinci onay sende.
**Cevap vermezsen:** K-13 ve E-5 atlanır. E-4 (arşiv belgesi + karantina) yine de yapılır, yani hazırlık boşa gitmez.
⚠️ AĞUSTOS SİNYALİ (2026-08-27, YÖN — A/B/C DEĞİL): Ağustos ilkesi **"Keşif olmadan silme YOK"** (`00-PO-KARARLARI-2026-08-27.md:87`, G4-09/G4-10 önce keşif); G10-02..21 ⏸️ "bilinçli terk veya v2" (`:79`). Bu, bu kartın önerisi A (karantina→bekle→sil) yönünü DESTEKLER. PO teyit ederse CEVAP'a yazılabilir.
**CEVAP:** A  *(PO, 2026-09-21, strateji katmanı karar oturumu)*

---
## Ajanın ekleyeceği yeni kararlar buradan itibaren (KARAR-12, 13, …)
Ajan: §4 şablonuna birebir uy. "Ne kaybedersin" satırını boş bırakma.

> **📸 Kaynak:** `docs/raporlar/kesif/hayalet-envanter-2026-09-19.md` (niyet arkeolojisi + triyaj).
> Bu kartlar backend'de yazılmış ama kullanıcıya ulaşmamış kod kütlesinin **kart açılması gereken** kısmıdır.
> Mükerrer uçlar (KARAR-11), kulüp/iş ilanları (KARAR-9), OCEAN/SJT (KARAR-10) zaten mevcut kartlarda — tekrar sorulmadı.

---

### KARAR-12 · Görüşme geri bildirim kayıt sistemi ne olsun?  [ÜRÜN KARARI]
**Şu an ne var:** Görüşme sonrası menti/mentör bir "check-in" (kısa değerlendirme) dolduruyor ve bu çalışıyor. Ama bunun ALTINDA, bundan ayrı, ikinci bir "geri bildirim kaydı" sistemi backend'de tam yazılı: her etkileşimi ayrı ayrı kaydedip analiz için saklıyor. Kanıt: `backend/src/routes/feedbackLogRoutes.ts:17-30` (3 uç: yaz/listele/tek-kayıt). Bu üç ucun frontend'de HİÇBİR çağıranı yok (kapsam: `frontend/src` tümü, harf duyarsız, 0 sonuç).
**Sorun ne:** Bu sistem eşleştirmeyi zamanla iyileştirmek için tasarlanmış (hangi eşleşme iyi gitti, hangisi kötü — bir tür öğrenme döngüsü). Ama kimse bu verileri ne giriyor ne görüyor. Ya bağlanmalı ya da niyeti netleşmeli.
**Neden sana soruyorum:** Bu verinin "kullanıcıya görünen bir panel" mi yoksa "yalnız senin göreceğin iç analiz aracı" mı olacağı bir ürün tercihi — teknik değil.
**Kapsadığı kalemler:** `feedbackLogRoutes.ts` (3 uç) + `FeedbackLog` modeli + buna bağlı `rewardPenalty.ts` skorlama mantığı (aktif import edilmiş). Not: KVKK 3-yıl saklama zaten uygulanmış.
**Seçenekler:**
**A) İç analiz aracı yap** (yalnız platform admin görür, kullanıcıya görünmez) · Kullanıcı: hiçbir şey görmez, arka planda veri birikir · Kazanç: eşleştirme kalitesini ölçmeye başlarsın, kullanıcıyı yormazsın · Kaybedersin: kullanıcı katkısı hissetmez; panel yapımı senin işin, kimse "geri bildirim verdim" demez · Süre: M · Geri alınır: evet · Migration: yok
**B) Kullanıcıya görünen geri bildirim özelliği yap** · Kullanıcı: görüşme sonrası açık uçlu geri bildirim bırakır, belki geçmişini görür · Kazanç: kullanıcı sesini duyurur, zengin veri · Kaybedersin: mevcut check-in ile çakışır/tekrar olur, kullanıcıyı iki kez sorguya çeker · Süre: L · Geri alınır: zor (kullanıcı alışır) · Migration: yok
**C) Şimdilik dursun, check-in yeterli** · Kullanıcı: değişiklik yok · Kazanç: emek çekirdeğe gider, mükerrerlik riski yok · Kaybedersin: yazılmış sistem rafta kalır, öğrenme döngüsü hiç başlamaz · Süre: yok · Migration: yok
**Karşılaştırma:** Eşleştirme motorunu veriyle iyileştirmek yakın hedefinse A doğru ve check-in ile çakışmaz (biri kullanıcıya, biri sana). Kullanıcı sesini ürünün parçası yapmak istiyorsan B, ama check-in ile sınırı iyi çizilmeli. Çekirdek akış (eşleş→randevu→görüş) hâlâ pürüzlüyse C.
**Benim önerim:** A — check-in kullanıcı tarafını zaten karşılıyor; bu sistemin değeri sana ölçüm verisi vermesinde, kullanıcıyı tekrar yormadan.
**Cevap vermezsen:** feedbackLog uçları bağlanmaz, öğrenme döngüsü kapalı kalır. Başka iş etkilenmez.
**CEVAP:**

---

### KARAR-13 · Yöneticiye manuel "işlet" butonları verilsin mi?  [ÜRÜN KARARI]
**Şu an ne var:** Sistemde arka planda otomatik çalışan bakım işleri var: eşleştirme ayarını yeniden hesaplama, eski/çöp veriyi temizleme, görüşme sonrası geri bildirim hatırlatması gönderme, ve bir mentinin "oryantasyon kilidini" kaldırma. Bunların hepsi backend'de uç olarak da yazılı ama hiçbir ekranda butonu yok. Kanıt: `adminRoutes.ts:80-81` (tuning/purge), `meetingRoutes.ts:132` (hatırlatıcı), `meetingRoutes.ts:137` (kilit kaldır). Frontend'de 0 çağrı.
**Sorun ne:** Bu işler otomatiğe bağlı (zamanlanmış). Ama bir yönetici "şimdi çalıştır" demek isteyebilir — ör. yeni mentörler eklendi, eşleştirmeyi hemen yenilemek istiyor; ya da bir menti yanlışlıkla kilitlendi, elle açmak istiyor. Şu an bunu yapamıyor, otomatik işin sırasını beklemek zorunda.
**Neden sana soruyorum:** "Yöneticiye ne kadar kontrol verelim" bir ürün tercihi — fazla buton paneli karmaşıklaştırır, az buton yöneticiyi çaresiz bırakır.
**Kapsadığı kalemler:** `admin/cron/run-tuning`, `admin/cron/run-purge`, `meetings/reminders/send`, `meetings/orientation-lock/:userId` (DELETE).
**Seçenekler:**
**A) Hepsine yönetici butonu ver** · Kullanıcı (yönetici): "eşleştirmeyi yenile", "hatırlatıcı gönder", "kilidi kaldır" butonları görür · Kazanç: yönetici tam kontrol, otomatiği beklemez · Kaybedersin: yanlış tıklama riski (purge veri siler!), panel karmaşıklaşır, her butona onay/uyarı gerekir · Süre: M · Geri alınır: evet · Migration: yok
**B) Yalnız güvenli/sık olanlara buton ver** (kilit kaldır + eşleştirme yenile), tehlikelileri (purge) otomatikte bırak · Kullanıcı: iki güvenli buton · Kazanç: en sık ihtiyaç karşılanır, tehlikeli işlem elden uzak · Kaybedersin: purge/hatırlatıcı hâlâ elle tetiklenemez · Süre: S · Geri alınır: evet · Migration: yok
**C) Hiç buton verme, hepsi otomatik kalsın** · Kullanıcı: değişiklik yok · Kazanç: sıfır yanlış-tıklama riski, panel sade · Kaybedersin: yönetici çaresiz kaldığı durumlarda (yanlış kilit vb.) sana başvurmak zorunda · Süre: yok · Migration: yok
**Karşılaştırma:** Yönetici deneyimini güçlendirmek istiyorsan B en dengeli — sık ve güvenli işleri açar, veri silen purge'ü elden uzak tutar. Tam kontrol felsefen varsa A ama purge butonu ciddi risk. Kurumlar henüz azsa ve sen destek verebiliyorsan C yeterli.
**Benim önerim:** B — "kilidi kaldır" gerçek bir kullanıcı-kurtarma ihtiyacı; purge gibi yıkıcı işi butona koymak orantısız risk.
**Cevap vermezsen:** Bu uçlar bağlanmaz, otomatik çalışmaya devam eder (kırık değil). Başka iş etkilenmez.
**CEVAP:**

---

### KARAR-14 · Yönetici, bir kullanıcının verisini panelden silebilsin/indirebilsin mi?  [ÜRÜN KARARI · HUKUKİ/KVKK]
**Şu an ne var:** Kullanıcının kendisi verilerini indirebiliyor ve hesabını silebiliyor (self-servis, çalışıyor — `/api/me/data-export`, `/api/me/delete-account`). Bunun bir de YÖNETİCİ tarafı backend'de yazılı: yönetici bir kullanıcının verisini dışa aktarabilir, anonimleştirebilir veya kalıcı silebilir. Kanıt: `userRoutes.ts:177` (anonymize), `:182` (hard-delete), `:187` (export). Hiçbirinin ekranda butonu yok.
**Sorun ne:** KVKK kapsamında bir kullanıcı "verimi silin" diye kuruma başvurursa, yöneticinin bunu yapabilmesi gerekebilir. Ama bu aynı zamanda tehlikeli: bir yönetici başka birinin verisini kalıcı silebilir/indirebilir — kötüye kullanım ve gizlilik riski.
**Neden sana soruyorum:** Hukuki (KVKK) sonucu olan ve geri dönülmez (kalıcı silme) bir yetki — kimin, kimin verisine dokunabileceği ürün+hukuk kararı. Ben avukat değilim.
**Kapsadığı kalemler:** `/api/users/:id/anonymize`, `/api/users/:id/hard-delete` (DELETE), `/api/users/:id/export` (ADMIN muadilleri).
**Seçenekler:**
**A) Yönetici bu üç işlemi panelden yapabilsin** (onay + log ile) · Kullanıcı (yönetici): kullanıcı kartında "veriyi indir / anonimleştir / sil" · Kazanç: KVKK başvurusuna kurum hızlı cevap verir, self-servise erişemeyen kullanıcı için de çözüm · Kaybedersin: yönetici başkasının verisini görebilir/silebilir — gizlilik yüzeyi büyür, kötüye kullanım riski, her işlem denetim izi ister · Süre: L · Geri alınır: hard-delete HAYIR (kalıcı) · Migration: yok
**B) Yalnız anonimleştirme ve dışa aktarma, kalıcı silme YOK** · Kullanıcı: yönetici indirir/anonimleştirir ama kalıcı silemez · Kazanç: KVKK ihtiyacı büyük ölçüde karşılanır, geri dönülmez silme riskini almaz · Kaybedersin: "tamamen sil" talebi yalnız kullanıcının kendisiyle ya da seninle çözülür · Süre: M · Geri alınır: evet (anonimleştirme geri alınamaz ama silme kadar sert değil) · Migration: yok
**C) Hiç açma, yalnız self-servis kalsın** · Kullanıcı: değişiklik yok · Kazanç: en dar gizlilik yüzeyi, yönetici kimsenin verisine dokunamaz · Kaybedersin: self-servise erişemeyen (hesabı kilitli, vefat vb.) kullanıcının KVKK talebi karşılıksız kalır, yük sana biner · Süre: yok · Migration: yok
**Karşılaştırma:** Kurumların KVKK sorumluluğunu kendi panellerinden yönetmesini istiyorsan A ama kalıcı silme için sağlam onay+log+yetki şart. Riski minimize edip ihtiyacın çoğunu karşılamak istiyorsan B en dengeli. Gizliliği en üstte tutuyorsan ve kurum sayısı azken sen aracılık edebiliyorsan C.
**Benim önerim:** B — KVKK ihtiyacının çoğunu karşılar, geri dönülmez silme yetkisini yöneticiye vermenin riskini almaz; kalıcı silme ayrı bir karar olarak sonra gelebilir. (Bu senin ürün+hukuk kararın, önerime güvenme — avukat görüşü değerli olur.)
**Cevap vermezsen:** ADMIN KVKK uçları bağlanmaz, self-servis çalışmaya devam eder. Başka iş etkilenmez.
**CEVAP:**

---

### KARAR-15 · Çok kuruma üye kullanıcı, kurumlar arası geçiş yapabilsin mi?  [ÜRÜN KARARI]
**Şu an ne var:** Bir kullanıcı birden fazla kuruma üye olabiliyor (veri modeli buna izin veriyor). Bunun için bir "kurum değiştirici" arayüz bileşeni de yazılmış (üyelikleri listeler, aktif kurumu değiştirir). Ama bu bileşen hiçbir ekrana konulmamış — kullanıcı şu an yalnız tek kurumda çalışıyor gibi görünüyor. Kanıt: `frontend/src/components/organisms/TenantSwitcher.tsx:36` — hiçbir yerden import edilmiyor (kapsam: `frontend/src` tümü, 0 referans).
**Sorun ne:** Bir kullanıcı hem üniversitesinde hem de bir STK'da mentörse, şu an ikisi arasında geçiş yapamıyor. Ya bu özellik açılmalı ya da "bu ürün tek-kurum kullanıcı içindir" diye netleşmeli.
**Neden sana soruyorum:** "Kullanıcı aynı anda kaç kuruma ait olabilir ve bunu görebilir mi" ürünün temel kapsamıyla ilgili bir karar.
**Kapsadığı kalemler:** `TenantSwitcher` bileşeni (+ bağlı çok-kurumlu üyelik akışı).
**Seçenekler:**
**A) Kurum değiştiriciyi aç** (üst menüye koy) · Kullanıcı: birden çok kurumu varsa üstte kurum seçer, geçiş yapar · Kazanç: çok-kurumlu kullanıcı (üniversite+STK) gerçek ihtiyaç, model zaten destekliyor · Kaybedersin: tek-kurumlu kullanıcı için gereksiz bir öğe, test/kenar durum yükü (yanlış kurumda işlem riski) · Süre: M · Geri alınır: evet · Migration: yok
**B) Yalnız birden fazla üyeliği olana göster** (tek üyelikte gizli) · Kullanıcı: çoğu kullanıcı hiç görmez, yalnız çok-kurumlu olan görür · Kazanç: ihtiyacı olana çözüm, çoğunluk için sade · Kaybedersin: yine de test/kenar durum yükü, nadir bir senaryoya emek · Süre: M · Geri alınır: evet · Migration: yok
**C) Açma, tek-kurum modeli kalsın** · Kullanıcı: değişiklik yok · Kazanç: en sade akış, sıfır kenar durum · Kaybedersin: çok-kurumlu kullanıcı ikinci kurumuna erişemez, yazılmış bileşen rafta kalır · Süre: yok · Migration: yok
**Karşılaştırma:** Aynı kişinin birden çok kurumda yer alması senin hedef senaryonsa (üniversite mezunu + iş yeri gibi) B en akıllıcası — ihtiyacı olana açılır, çoğunluğu yormaz. Bu senaryo nadir/uzaksa C yeterli. A yalnızca çoğu kullanıcının çok-kurumlu olacağını düşünüyorsan mantıklı.
**Benim önerim:** B — model zaten destekliyor, bileşen hazır; koşullu göstermek düşük maliyetle gerçek ihtiyacı karşılar, çoğunluğu etkilemez.
**Cevap vermezsen:** TenantSwitcher bağlanmaz, tek-kurum akışı devam eder. Başka iş etkilenmez.
**CEVAP:**

---

### KARAR-16 · Yöneticiye eşleştirme kontrolleri (görünürlük onayı + yeniden eşleştirme) verilsin mi?  [ÜRÜN KARARI]
**Şu an ne var:** Backend'de iki yönetici aksiyonu yazılı ama ekranda yok: (1) bir mentörün "görünür olma" onayını yönetici teyit eder (double-opt-in); (2) yönetici bir kullanıcıyı "yeniden eşleştir" diyerek eşleştirme sırasına tekrar sokar. Kanıt: `adminRoutes.ts:69` (visibility-optin confirm), `adminRoutes.ts:56` (rematch). Frontend'de 0 çağrı. Not: rematch'in bildirim kısmı henüz taslak (stub).
**Sorun ne:** Yönetici bir mentörü onaylamak ya da kötü giden bir eşleşmeyi yeniden kurmak isteyebilir ama şu an yapamıyor. Eşleştirme tamamen otomatik; yöneticinin müdahale kolu yok.
**Neden sana soruyorum:** "Eşleştirmeye yönetici ne kadar karışsın" ürünün "biz doğru eşi buluyoruz" iddiasına dokunuyor — fazla müdahale motorun değerini zayıflatır.
**Kapsadığı kalemler:** `admin/visibility-optin/:optInId/confirm`, `admin/users/:id/rematch` (+ rematch bildirimi stub → gerçek bildirim gerekebilir).
**Seçenekler:**
**A) İkisini de aç** (onay + yeniden eşleştir butonları) · Kullanıcı (yönetici): mentör görünürlüğünü onaylar, kötü eşleşmeyi yeniden kurar · Kazanç: yönetici gerçek kontrol, sıkışan durumları çözer · Kaybedersin: yönetici motoru sık ezerse "otomatik eşleştirme" değeri aşınır; rematch bildirimi stub olduğu için kullanıcı neden yeniden eşleştiğini anlamayabilir · Süre: M · Geri alınır: evet · Migration: yok
**B) Yalnız görünürlük onayını aç, rematch'i sonraya bırak** · Kullanıcı: yönetici mentör onaylar; yeniden eşleştirme yok · Kazanç: en sık ve düşük riskli ihtiyaç karşılanır, bildirimi tamamlanmamış rematch beklemede kalır · Kaybedersin: kötü eşleşmeyi yönetici elle düzeltemez · Süre: S · Geri alınır: evet · Migration: yok
**C) İkisini de açma** · Kullanıcı: değişiklik yok · Kazanç: motor saf otomatik kalır, panel sade · Kaybedersin: yönetici sıkışan durumda (onay bekleyen mentör, kötü eşleşme) çaresiz · Süre: yok · Migration: yok
**Karşılaştırma:** Yöneticiye eşleştirmede söz hakkı vermek istiyorsan ama motoru korumak istiyorsan B en güvenli başlangıç — görünürlük onayı motoru ezmez, yalnız kapı açar. Tam müdahale kolu istiyorsan A ama rematch bildiriminin tamamlanması gerekir. Motorun tam otomatik kalmasını savunuyorsan C.
**Benim önerim:** B — görünürlük onayı düşük riskli ve net bir ihtiyaç; rematch, bildirimi tamamlanmadan açılırsa kullanıcı kafa karışıklığı yaratır.
**Cevap vermezsen:** İki uç da bağlanmaz. Başka iş etkilenmez.
**CEVAP:**

---

### KARAR-17 · Kurum yöneticisi, davet göndermeden canlı bir önizleme görebilsin mi?  [ÜRÜN KARARI]
**Şu an ne var:** Bir kurum yöneticisi platforma bakarken, gerçek kullanıcı davet etmeden "ürün nasıl görünüyor" diye canlı bir önizleme göremiyor. Backend'de bunun için bir "önizleme" ucu yazılı (kurumun kendi görünümünü örnek veriyle gösteren), ama ekranı yok. Kanıt: `selfServeRoutes.ts:29` (`/api/tenants/:slug/preview`). Belgelerde bu "çift-aha / önizleme aha" diye ürün fikri olarak geçiyor (`docs/.../T4-A2-arsiv-strateji.md:49`).
**Sorun ne:** Yeni bir kurum yöneticisi platformu değerlendirirken "önce kullanıcı davet et, sonra gör" engeliyle karşılaşıyor. Önce görüp sonra karar vermek (dene-sonra-al) dönüşümü artırabilir.
**Neden sana soruyorum:** Bu bir büyüme/satış (PLG) tercihi — önizlemenin var olup olmayacağı ve ne göstereceği ürün kararı.
**Kapsadığı kalemler:** `GET /api/tenants/:slug/preview` + self-serve önizleme demo ekranı (FE yok).
**Seçenekler:**
**A) Önizleme demo ekranını yap** · Kullanıcı (yönetici): davet etmeden örnek bir menti/mentör deneyimini canlı görür · Kazanç: "önce gör, sonra karar ver" — kurum kaydı/dönüşüm artabilir, satış hikâyesi güçlenir · Kaybedersin: örnek veri gerçekçi değilse yanlış izlenim; bakım (demo içeriği güncel tutulmalı); çekirdek akıştan emek çeker · Süre: L · Geri alınır: evet · Migration: yok
**B) Basit statik önizleme** (ekran görüntüsü/tanıtım, canlı demo değil) · Kullanıcı: sabit tanıtım görselleri/metin · Kazanç: hızlı, düşük bakım, yine de fikir verir · Kaybedersin: "canlı deneme" hissi olmaz, backend önizleme ucu kullanılmaz (rafta kalır) · Süre: S · Geri alınır: evet · Migration: yok
**C) Şimdilik yapma** · Kullanıcı: değişiklik yok · Kazanç: emek çekirdek akışa gider · Kaybedersin: yazılmış önizleme ucu atıl kalır, dene-sonra-al dönüşüm fırsatı kaçar · Süre: yok · Migration: yok
**Karşılaştırma:** Kurumlara satış/demo yakın hedefinse ve "önce gör" dönüşümü artıracaksa A yatırıma değer, ama demo içeriğinin gerçekçi ve bakımlı olması şart. Hızlı bir tanıtım yeterliyse B. Çekirdek akış (üç bug daha önce vardı) hâlâ önceliğinse C.
**Benim önerim:** C şimdilik — çekirdek akış kusursuzlaşmadan demo önizleme erken; ama kuruma demo/satış gündeme gelince A'ya geç. (Bu senin büyüme kararın, önerime güvenme.)
**Cevap vermezsen:** Önizleme ucu bağlanmaz. Başka iş etkilenmez.
**CEVAP:**

---
## Bilanço devri kartları (AŞAMA F, 2026-09-19)

> **📸 Kaynak:** `docs/raporlar/bilanco/kararlar/00-ONCELIK-SIRASI-2026-08-28.md` Faz 0-8, koda karşı doğrulandı.
> Aşağıdaki kartlar, o sıradaki **PO-manuel** ve **ürün-kararı gerektiren** açık kalemlerdir. Kalan açık kalemler
> `00-KUYRUK.md` AŞAMA F'ye (F-01..F-33) iş olarak girdi; bunlar ajanın yapamayacağı ya da senin karar vermen gereken kısımlar.

---

### KARAR-18 · PO-MANUEL İŞLER LİSTESİ  [PO AKSİYONU — ajan yapamaz]
Bunlar kod değil; sunucu/hesap/hukuk/yerel-makine adımları. Ajan yapamaz, bulut VM'de hiç yapamaz. Her biri tek satır — yaptıkça `[x]` işaretle.

- [ ] **G8-01 + G8-02** foto yükleme kalıcı volume + env (Dokploy). Kod hazır; sunucuda volume tanımı gerekiyor. Detay: `docs/kararlar/dokploy-foto-volume-talimati.md`. (↔ K-04)
- [ ] **G5-01 + G5-02** kurum onay/red maili — kod HAZIR, `destek@` mail kutusu yok, bekliyor.
- [ ] **G1-09** `destek@` mail adresi/kutusu kurulumu (yukarıdaki mail zincirini açar).
- [ ] **G1-10 + G1-13** KVKK aydınlatma metni + kulüp beyanı — avukatta. (Kulüp aktifse beyan ŞART.) F-02/F-03/F-07 buna bağlı.
- [ ] **G1-28** sunucu sertleştirme (HTTPS/firewall/SSH/yedek) — altyapı. Kod tarafı = K-14.
- [ ] **G8-03 + G8-04** canlı akış gözle testleri — gerçek kullanıcıyla ekran doğrulaması.
- [ ] **G8-05** yedek `.env` dosyasını sil (sızıntı yüzeyi).
- [ ] **G8-08** izole test DB kur (`TEST_DATABASE_URL`) — entegrasyon testleri lokalde guard'la duruyor.
- [ ] **G9-07** repoyu OneDrive dışına (`C:\dev\`) taşı — `.git` senkron/bozulma riski.
- [ ] **G8-06** git dal/worktree + geçici script temizliği.
- [ ] **KARAR-8** repoları private yap (ayrı kartta duruyor, hatırlatma).

**CEVAP (isteğe bağlı — bu bir onay kartı değil, hatırlatma listesi):**

---

### KARAR-19 · KVKK geri-dönülmez yetkiler kümesi  [ÜRÜN KARARI · HUKUKİ · GERİ DÖNÜLMEZ]
**Şu an ne var:** Üç KVKK kalemi teknik olarak yarım kaldı ve hepsi geri-dönülmez/hukuki sonuç taşıdığı için ajan kendi başına ilerletemiyor:
(a) Kurum (tenant) **kalıcı silme** ucu yok — sadece "dondurma" var (`platformRoutes.ts:53` freeze; cron yalnız TASLAK kurum siler). (b) Rıza mekanizması **öncesi** kayıtlar için yeniden-rıza politikası belirsiz (teknik backfill ✅ yapıldı `backfill-consent.ts`, ama eski kayıt politikası açık — G1-16). (c) Denetim izi (kalibrasyon AUDIT) SystemLog'ta **90 günde siliniyor** (`gdprService.ts:341,366`) → iz-koruma ile KVKK imha süresi çelişiyor (G1-15).
**Sorun ne:** Bir kurum "bizi tamamen silin" derse yapının buna cevabı yok; eski kayıtların rıza durumu belirsiz kalırsa hukuki açık; denetim izini hem tutup hem 90 günde silmek ikisini de zayıflatıyor.
**Neden sana soruyorum:** Üçü de geri-dönülmez (kalıcı silme) ve/veya hukuki (rıza, saklama süresi). Ben avukat değilim; aşağıdakiler hukuki görüş değildir.
**Seçenekler:**
**A) Üçünü de şimdi netleştir** (kurum hard-delete ucu + eski-kayıt yeniden-rıza akışı + denetim izi ayrı saklama) · Kullanıcı: kurum tam silinebilir, eski kayıtlar yeniden rıza ister, denetim izi korunur · Kazanç: KVKK duruşu tam · Kaybedersin: en büyük iş, kalıcı silme riski, hukukçu onayı şart, migration · Süre: L · Geri alınır: kurum silme HAYIR · Migration: VAR
**B) Yalnız denetim izi saklamasını çöz** (audit izini SystemLog 90g'den ayır, uzun sakla), kurum silme + eski-rıza ertele · Kullanıcı: değişiklik yok · Kazanç: en düşük riskli, iz kaybı önlenir · Kaybedersin: kurum silme + eski-rıza açık kalır · Süre: M · Geri alınır: evet · Migration: küçük
**C) Şimdilik hiçbiri, hukukçu paketiyle birlikte** · Kullanıcı: değişiklik yok · Kazanç: emek çekirdeğe gider, tek hukuk turunda toplanır · Kaybedersin: üç açık da sürer · Süre: yok · Migration: yok
**Karşılaştırma:** Yakında kuruma satış/KVKK denetimi bekliyorsan A gerekli ama hukukçu ve migration şart. Riski minimize edip en somut açığı (iz kaybı) kapatmak istiyorsan B. KVKK paketini avukatla toptan çözeceksen C — bu projede hukuk zaten G1-10'da bekliyor.
**Benim önerim:** C şimdi + B'yi kuyruk adayı — kalıcı kurum silme ve eski-rıza avukat metnine (G1-10) bağlı; denetim izi saklaması ise düşük riskli, ayrı yapılabilir. (Bu senin ürün+hukuk kararın, önerime güvenme.)
**Cevap vermezsen:** F-02/F-07 ve G1-29/G1-16 açık kalır. Başka iş etkilenmez.
⚠️ AĞUSTOS SİNYALİ (2026-08-27, KISMİ — A/B/C DEĞİL): Üç alt-kalem de ağustosta ✅ İŞLEME AL kovasında: G1-29 (kurum silme) · G1-16 (eski-rıza) · G1-15 (denetim izi) (`00-PO-KARARLARI-2026-08-27.md:58`). Yani "yapılacak" yönü var; ama HANGİ kapsam/sıra (bu kartın A/B/C'si) ağustosta belirlenmedi. G1-10 (aydınlatma metni, avukat) çıkış blokeri (`:51`) — bu kararlar ona bağlı. PO teyit ederse CEVAP'a yazılabilir.
**CEVAP:**

---

### KARAR-20 · Mentör, menti talebini reddedebilsin mi?  [ÜRÜN KARARI]
**Şu an ne var:** Menti bir mentöre doğrudan talep gönderiyor (`requestController.ts:17`); mentörün "hayır" deme akışı **hiç yok** (eski VisibilityOptIn onay adımı kaldırılmış). Öncelik sırasındaki "G4-25 ret yumuşatma" işi, var olmayan bir ret akışını yumuşatmaya çalışıyor.
**Sorun ne:** Bir mentör uygun olmadığı bir talebi kibarca geri çeviremiyor — ya görmezden geliyor ya kabul etmek zorunda hissediyor. Menti de yanıtsız kalınca ne olduğunu anlamıyor.
**Neden sana soruyorum:** "Mentör reddedebilir mi" ürünün karakterini belirliyor — eşleştirme motoruna güven mi, mentör özerkliği mi.
**Seçenekler:**
**A) Mentör reddedebilsin + otomatik yumuşatma** · Kullanıcı: mentör "şu an uygun değilim" der, menti nazik mesaj + alternatif mentör görür · Kazanç: mentör özerkliği, menti belirsizlikte kalmaz · Kaybedersin: popüler mentör çok ret verirse menti moralsiz olur; ret sebebi yönetimi gerekir · Süre: M · Geri alınır: evet · Migration: yok (durum alanı yeterli olabilir)
**B) Ret yok, ama "yanıt süresi/otomatik yeniden-eşleştirme"** · Kullanıcı: mentör N gün yanıtlamazsa sistem başka mentöre yönlendirir · Kazanç: kimse "hayır" demek zorunda kalmaz, akış tıkanmaz · Kaybedersin: mentör açık kontrol sahibi olmaz; zamanlama mantığı gerekir · Süre: M · Geri alınır: evet · Migration: yok
**C) Değişmesin, ret akışı açılmasın** · Kullanıcı: bugünkü gibi · Kazanç: sıfır iş, motor tam otomatik · Kaybedersin: mentör sıkışırsa çaresi yok, G4-25 kalıcı açık · Süre: yok · Migration: yok
**Karşılaştırma:** Mentör tarafına güven ve özerklik vermek istiyorsan A. İnsanları "hayır" deme yükünden kurtarıp akışı otomatik tutmak istiyorsan B. Çekirdek akış hâlâ pürüzlüyse ve mentör şikayeti gelmediyse C.
**Benim önerim:** A — mentörün kibarca hayır diyebilmesi gerçek bir ihtiyaç; yumuşatma menti tarafını korur. Ama bu senin ürün kararın.
**Cevap vermezsen:** F-17 (G4-25) atlanır. Başka iş etkilenmez.
⚠️ AĞUSTOS SİNYALİ (2026-08-27, VARSAYIM HATALI — A/B/C DEĞİL): Ağustos G4-25 "ret yumuşatma"yı ✅ işleme aldı (`00-PO-KARARLARI-2026-08-27.md:61`) AMA var olan bir ret akışını varsaydı; kod gerçeği: mentör→menti ret akışı HİÇ yok (`requestController.ts:17`). Bu yüzden ağustos "işleme al" kararı bu kartın ön-sorusunu (ret olsun mu?) yanıtlamıyor. PO teyit ederse CEVAP'a yazılabilir.
**CEVAP:** A  *(PO, 2026-09-21, strateji katmanı karar oturumu)*

---

### KARAR-21 · STK anket sorusu cevap tipi: Likert-sabit mi, seçmeli mi?  [ÜRÜN KARARI · MIGRATION]
**Şu an ne var:** Kurumların ekleyebildiği özel sorular yalnız **Likert** (1-5 katılıyorum/katılmıyorum) tipinde; şıklı (çoktan seçmeli) veya açık-uçlu cevap seçeneği yok. Kanıt: `Question` modelinde `answerType` alanı yok. (Not: `SjtQuestion.AnswerFormat` benzer isimli ama farklı bir kavram — sertifika şık düzeni.)
**Sorun ne:** Bir kurum "en çok hangi konuda destek istersin?" gibi şıklı ya da "beklentin ne?" gibi açık bir soru soramıyor; her şeyi Likert'e sıkıştırmak zorunda.
**Neden sana soruyorum:** "Kurumlar ne kadar esnek soru sorabilsin" bir ürün tercihi; ayrıca veritabanı alanı eklemek gerekiyor (geri dönüşü zor).
**Seçenekler:**
**A) İki tip ekle: Likert + çoktan seçmeli** · Kullanıcı: kurum soru eklerken tip seçer · Kazanç: en sık ihtiyaç (şıklı) karşılanır · Kaybedersin: açık-uçlu yine yok; migration + form değişikliği · Süre: M · Geri alınır: zor (veri modeli) · Migration: VAR
**B) Üç tip: Likert + çoktan seçmeli + açık-uçlu** · Kullanıcı: tam esneklik · Kazanç: her soru tipi mümkün · Kaybedersin: açık-uçlu cevaplar analiz/eşleştirmeye giremez (serbest metin), raporlama karmaşıklaşır · Süre: L · Geri alınır: zor · Migration: VAR
**C) Şimdilik Likert kalsın** · Kullanıcı: değişiklik yok · Kazanç: migration bütçesi başka işe · Kaybedersin: kurum esnekliği yok, G3-13 kalıcı açık · Süre: yok · Migration: yok
**Karşılaştırma:** Kurum anketlerini satış hikâyenin parçası yapacaksan A yeterli ve dengeli (şıklı en sık istenen). Tam esneklik istiyorsan B ama açık-uçlu verinin nereye gideceğini (analiz/eşleştirme mi, sadece görüntüleme mi) önceden çözmen gerekir. Başka migration yapılmayacaksa C ile ertelenebilir.
**Benim önerim:** A — şıklı soru en sık gerçek ihtiyaç; açık-uçlu, cevabın nereye akacağı netleşmeden eklenirse ölü veri olur. KARAR-1/2'ye de "evet" dersen aynı migration turunda yapılabilir.
**Cevap vermezsen:** F-12 (G3-13) atlanır. Başka iş etkilenmez.
⚠️ AĞUSTOS SİNYALİ (2026-08-27, C DIŞLANMIŞ — A/B/C DEĞİL): Ağustos G3-13'ü "⏸️→✅ canlandı" (`00-PO-KARARLARI-2026-08-27.md:60`) + bağlı-karar "G3-04→G3-13: STK şıklı-soru isteği `answerType` şema alanını zorunlu kılar" (`:106`). Yani ağustos answerType eklenmesini VE şıklı-soruyu istiyor → bu kartın C seçeneği (Likert kalsın) ağustosla ÇELİŞİR; yön A veya B. PO teyit ederse CEVAP'a yazılabilir.
**CEVAP:**

---

### KARAR-22 · Mentör bir mentiyi reddederken ne olsun? (ret deneyimi) (1 işi açar)  [ÜRÜN KARARI · ŞEMA]
**Şu an ne var:** Mentör bir randevu talebini "Reddet" ile geri çevirebiliyor ama menti bunu **yalnız** "Görüşmelerim"e düşen kırmızı **"İptal Edildi"** rozetinden anlıyor. Bildirim yok, e-posta yok, gerekçe yok, alternatif mentör yok. Kanıt: `backend/src/controllers/meetingController.ts:563-585` (rejectMeeting yalnız `status:CANCELLED, notes:reason??null`, hiçbir `notify*` çağrısı yok — kardeş `approveMeeting` `:556` bildirim atıyor, asimetri koda gömülü); FE gerekçe hiç göndermiyor (`mentor/page.tsx:97`).
**Sorun ne:** Menti personası bunu **en kritik risk** sayıyor: menti "hayır"ı "ben yetersizim" diye okur. Şu an ret çıplak gösteriliyor — personanın "reddi ASLA çıplak gösterme" prensibinin tam tersi. Ayrıca ret akışı olmadığı için "ret yumuşatma" (G4-25/F-17) da havada.
**Neden sana soruyorum:** Ürün + hukuk-yakını + geri-dönülmez şema kararı (yeni alan). Kaç alt-soru var, hepsi tek karta kümelendi:
  · (i) Ret **gerekçesi zorunlu mu**, opsiyonel mi, hiç sorulmasın mı?
  · (ii) Menti **alternatif mentör** görecek mi (ör. "işte sana uygun 3 mentör daha")?
  · (iii) Reddedilince menti'ye **bildirim/e-posta** gitsin mi?
  · (iv) Ret sebebi menti'ye **gösterilsin mi**, yoksa yalnız yumuşatılmış jenerik mesaj mı?
**Seçenekler:**
**A) Tam yumuşatma** (opsiyonel gerekçe + jenerik nazik mesaj + otomatik 3 alternatif + bildirim) · Kullanıcı: menti "Bu sefer olmadı, işte sana uygun 3 mentör daha" + bildirim görür, ham gerekçeyi görmez · Ne kazanırsın: personanın en kritik riski kapanır, menti akışta kalır · Ne kaybedersin: en büyük iş — yeni şema alanı (`rejectionReason`), alternatif-öneri akışı, bildirim/e-posta entegrasyonu; alternatif motoru zayıfsa boş liste riski · Süre: L · Geri alınır: evet · Migration: VAR (`rejectionReason`)
**B) Nazik mesaj + bildirim, alternatif YOK** (gerekçe menti'ye gösterilmez, jenerik teselli + bildirim) · Kullanıcı: menti "Mentör şu an yeni menti alamıyor" + bildirim görür · Ne kazanırsın: çıplak kırmızı rozet kalkar, orta iş; asimetri düzelir · Ne kaybedersin: menti yine "sonra ne yapayım" diye kalır (alternatif yok) · Süre: M · Geri alınır: evet · Migration: opsiyonel (jenerik metin alan gerektirmez)
**C) Yalnız görsel yumuşatma** (kırmızı "İptal Edildi" → nötr "Bu görüşme gerçekleşmedi", başka değişiklik yok) · Kullanıcı: daha az sert rozet · Ne kazanırsın: en ucuz, tek FE değişikliği · Ne kaybedersin: bildirim/alternatif/gerekçe hiçbiri yok; kök sorun sürüyor · Süre: S · Migration: yok
**Karşılaştırma:** Menti elde tutma (retention) yakın hedefinse ve alternatif motoruna güveniyorsan A doğru yatırım. Riski azaltıp en sert yarayı (çıplak kırmızı + sessizlik) kapatmak istiyorsan B dengeli. Sadece görsel sertliği almak ve kararı ertelemek istiyorsan C — ama kök sorun (menti ne yapacağını bilmiyor) sürer.
**Benim önerim:** B — çıplak ret + sessizlik en akut yara; bildirim + nazik mesaj bunu orta eforla kapatır. Alternatif öneri (A) ayrı bir tur olarak sonra gelebilir (eşleştirme motoru olgunlaşınca). (Bu senin ürün kararın, önerime güvenme.)
⚠️ KARAR-20 İLE İLİŞKİ (aynı tema, kümelenmeli): KARAR-20 "mentör reddedebilsin mi" soruyordu (F-17/G4-25 kaynaklı, "ret akışı hiç yok" varsayımıyla). Panel denetimi gösterdi ki **meeting-talebi reddi KODDA VAR** (`mentor/page.tsx:257-274` Onayla/Reddet, MT11 ✅) — eksik olan reddin DENEYİMİ. Yani KARAR-20'nin "olsun mu" sorusu meeting düzeyinde zaten "evet"; KARAR-22 (bu kart) "nasıl olsun"u soruyor. İkisi birlikte cevaplanabilir; KARAR-22 ayrıntılı/kanıtlı olanı.
**Cevap vermezsen:** P-05 (ret deneyimi) ve F-17 (G4-25 ret yumuşatma) atlanır. Başka iş etkilenmez.
**CEVAP:** B  *(PO, 2026-09-21, strateji katmanı karar oturumu)*
> ⚠️ **Not:** "bildirim" iki kanaldan gider — **uygulama içi (çan) çalışır**, **e-posta bildirimi SMTP ayarlanana kadar GİTMEZ** (`docs/otonom/03-PO-ELLE-ISLER.md` B#4).

---

### KARAR-23 · Kurum başvuru bildirimleri (onay/ret/düzeltme e-postası) açılsın mı? (1 işi açar)  [ÜRÜN KARARI · HUKUKİ]
**Şu an ne var:** Kurum başvuru bildirimi ana şalteri kapalı. Platform yöneticisi bir STK başvurusunu onaylayınca/reddedince/düzeltme isteyince panelde "başarılı" görüyor ama kuruma **hiçbir e-posta gitmiyor** (yalnız log). Oysa bekleme ekranı kuruma "e-posta ile bilgilendirileceksiniz" sözü veriyor. Kanıt: `config.ts:88` (`TENANT_NOTIFICATIONS_ENABLED` varsayılan false), `platformController.ts:298/325/371`, `tenantNotifications.ts:116-122`, `pending-review/page.tsx:28-29`.
**Sorun ne:** Genel/edu e-postalı bir kurum belirsiz süre askıda kalıyor; "düzeltme istendi" durumunda ne düzelteceğini bilemediği için asla düzeltmiyor. İlk izlenim burada kayboluyor.
**Neden sana soruyorum:** Teknik değil: ret ve düzeltme metinleri kuruma giden, **hukuki sonucu olabilecek** metinler ve içerikleri henüz gözden geçirilmedi.
**Seçenekler:**
**A) Aç + metinleri şimdi gözden geçir** · Kullanıcı: kurum onay/ret/düzeltme mailini alır · Ne kazanırsın: başvuru döngüsü kapanır · Ne kaybedersin: metin gözden geçirme eforu, yanlış ton hukuki risk · Süre M · Geri alınır (env) · Migration yok
**B) Aç ama yalnız ONAY mailini gönder, ret/düzeltmeyi beklet** · Kullanıcı: onayda mail, rette yok · Ne kazanırsın: en riskli metinler beklerken onay akışı çalışır · Ne kaybedersin: ret/düzeltme hâlâ sessiz · Süre M · Geri alınır · Migration yok
**C) Kapalı bırak, yalnız uygulama-içi durum göstergesi (U-04)** · Kullanıcı: mail yok ama panelde durumu görür · Ne kazanırsın: hukuki metin riski yok · Ne kaybedersin: kurum uygulamaya girmeden haber alamaz · Süre S · Geri alınır · Migration yok
**Karşılaştırma:** İlk kurumları hızlı almak istiyorsan ve metinlere güveniyorsan A. Metinler henüz hazır değilse B (onay akışını aç, hukuki metinleri beklet). Hiç e-posta göndermeden yalnız uygulama-içi bilgilendirmeyle idare edeceksen C.
**Benim önerim:** B — en riskli olan ret/düzeltme metinleri; onları beklerken onay maili en çok işi kapatır. (Bu senin ürün+hukuk kararın, önerime güvenme.)
**Cevap vermezsen:** U-04 e-posta tarafı etkisiz kalır (03-PO env adımı yapılsa bile ton riski çözülmez); W risk #4 sürer.
**CEVAP:**

---

### KARAR-24 · Hata "iz kaydı" (stack) platform paneline açılsın mı? (0 işi açar — V-02 kısmı)  [ÜRÜN KARARI · KVKK]
**Şu an ne var:** Bir sunucu hatası olduğunda ayrıntısı (hangi satırda patladı) hiçbir ekranda görünmüyor; KVKK gerekçesiyle bilinçli olarak gizlenmiş (`platformController.ts:182-185`). Panelde birbirinin aynısı "Beklenmedik sunucu hatası" satırları görünüyor. Kanıt: W §A.4, §4.2.
**Sorun ne:** Bir hata çıktığında hangi ekranın, hangi kurumun, hangi kullanıcının etkilendiği ayırt edilemiyor; teşhis için veritabanına elle sorgu atmak gerekiyor.
**Neden sana soruyorum:** Hatanın ayrıntısını panele koymak, içinde kazara kişisel veri/iç detay taşıyabilir — KVKK dengesi ürün kararı.
**Seçenekler:**
**A) Ara yol: yalnız istek bağlamı (adres + kullanıcı no + kurum no; e-posta/ad ASLA)** · Kullanıcı (operatör): hangi uç/kurum patladığını görür · Ne kazanırsın: teşhis kolaylaşır, yeni kişisel-veri yüzeyi açılmaz · Ne kaybedersin: tam iz (stack) yok, derin teşhis hâlâ log/DB · Süre M · Geri alınır · Migration yok
**B) Tam iz kaydını platform yöneticisine (filtreli) göster** · Ne kazanırsın: en hızlı teşhis · Ne kaybedersin: iz içinde kazara kişisel veri/iç detay sızma riski, KVKK yüzeyi büyür · Süre M · Geri alınır
**C) Hiçbir şey açma; teşhis yalnız DB erişimiyle** · Ne kazanırsın: sıfır yeni yüzey · Ne kaybedersin: her teşhis elle SQL, yavaş ve operatöre bağımlı · Süre yok
**Karşılaştırma:** Teşhisi hızlandırıp KVKK yüzeyini büyütmemek istiyorsan A yeter (E1'i kapatır). En derin teşhis şartsa ve filtreye güveniyorsan B. Hiç risk almak istemiyorsan C — ama teşhis yavaş kalır.
**Benim önerim:** A — E1'i kapatır, yeni kişisel-veri yüzeyi açmaz.
**Cevap vermezsen:** V-02'nin "iz kaydını panele aç" kısmı belirsiz kalır; 500 teşhisi elle SQL'e bağımlı sürer.
**CEVAP:**

---

### KARAR-25 · Gerçek yedek nereye yazılsın? (0 işi açar — G1-28 🔴 blokerine bağlı)  [ÜRÜN KARARI · KVKK · ALTYAPI]
**Şu an ne var:** Düzenli/bütün-veritabanı yedeği YOK; 6 saatten eski veri kaybına karşı sıfır koruma. Üstelik haftalık silme işi Pazar 03:00 UTC çalışıyor. Kanıt: W §B.1, `cronScheduler.ts:414`. = `madde 120 / [G1-28]` 🔴 çıkış blokeri.
**Sorun ne:** Pazartesi mesaide fark edilen bir sorunda Neon'un 6 saatlik geri-alma penceresi çoktan kapanmış olur → veri kalıcı gider.
**Neden sana soruyorum:** Üç seçenek farklı maliyet/hukuk profiline sahip; özellikle biri KVKK'da "üçüncü ülkeye veri aktarımı" sayılabilir (proje zaten bir aktarım envanteri tutuyor).
**Seçenekler:**
**A) Dokploy diskine (volume) yazan cron** · Ne kazanırsın: veri VPS içinde kalır, KVKK aktarımı yok · Ne kaybedersin: aynı sunucu tamamen giderse yedek de gider; cron+script eforu · Süre M · Migration yok
**B) Neon ücretli plan (pencere 6 saat → 30 gün)** · Ne kazanırsın: kod işi yok, en az emek · Ne kaybedersin: aylık ücret; yine tek sağlayıcıya bağımlı · Süre S (hesap) · Migration yok
**C) GitHub Actions yedek dosyası (artifact)** · Ne kazanırsın: repo altyapısında, kolay · Ne kaybedersin: ⚠️ KVKK'da **üçüncü ülkeye aktarım** sayılabilir (aktarım envanterine eklenmeli), ABD sunucu · Süre M · Migration yok
**Karşılaştırma:** KVKK'da veriyi yurt içinde/VPS'te tutmak istiyorsan A. En az emekle pencereyi büyütmek istiyorsan B (ama tek sağlayıcı riski sürer). Repo araçlarını kullanmak kolayına gidiyorsa C — ama aktarım envanteri ve hukuki değerlendirme şart.
**Benim önerim:** Bu senin ürün+hukuk kararın, önerime güvenme — yalnız KVKK açısından A veya B, C'den daha güvenli. İdeali: A/B + restore (geri yükleme) provası.
**Cevap vermezsen:** 🔴 çıkış blokeri (G1-28) açık kalır; 03-PO A#2 (yedek + restore provası) yapılamaz.
**CEVAP:**

---

### KARAR-26 · İki yedek tablo (S26/S37) düşürülsün mü? (0 işi açar — DB)  [ÜRÜN KARARI · DB · GERİ DÖNÜLMEZ]
**Şu an ne var:** `MentorshipAgreement_yedek_20260830` (150 satır, 21 gündür) ve `CertificationOption_yedek_20260909` (20 satır, 11 gündür) canlı veritabanında duruyor; ikisi de güncel şemada yok. Kanıt: W §4.4, `00-KARAR-TAKIP.md:189`.
**Sorun ne:** Şemada olmayan bu tablolar, bir `migrate`/`db push` sırasında "fazlalık" görülüp silinmek istenebilir — yani koruma amaçlı yedek, koruduğu veriyi kaybetme riski taşıyor. Tek savunma bir insan kuralı (`--accept-data-loss` yasağı).
**Neden sana soruyorum:** DROP (tablo silme) geri dönülmez bir veri işlemidir; "artık gerek yok" (regresyon görülmedi) kararını yalnız sen verebilirsin.
**Seçenekler:**
**A) Şimdi DROP et (regresyon yok teyidiyle)** · Ne kazanırsın: drift + kazara-silme riski biter, şema temiz · Ne kaybedersin: yedek verisi kalıcı gider · Süre S · Migration/DB · **GERİ DÖNÜLMEZ**
**B) Beklet (regresyon penceresi dolana kadar)** · Ne kazanırsın: veri elde kalır (gerekirse geri dönülür) · Ne kaybedersin: drift/DROP riski sürer, yedekler birikmeye devam eder · Süre yok
**C) Kalıcı sakla — şemaya "arşiv tablo" olarak ekle** · Ne kazanırsın: hem korunur hem drift biter · Ne kaybedersin: şema kirlenir, migration eforu · Süre M · Migration
**Karşılaştırma:** İlgili işlerin regresyonsuz çalıştığından eminsen A (temiz). Emin değilsen B (veri elde kalsın). Bu yedekleri kalıcı kanıt olarak tutmak istiyorsan C.
**Benim önerim:** Bu senin veri kararın, önerime güvenme — regresyon teyitliyse A, değilse B. ⛔ Bulutta yapılamaz (canlı Neon gerekir), 03-PO C#10'da.
**Cevap vermezsen:** Drift + migrate DROP riski sürer.
**CEVAP:**

---

### KARAR-27 · Dış hata izleme servisi (ör. Sentry) kurulsun mu? (0 işi açar — izleme)  [ÜRÜN KARARI · KVKK · ALTYAPI]
**Şu an ne var:** Dış hata izleme / performans servisi YOK. Bu tur frontend'e hata ekranı eklendi (V-12) ama hataları **merkezî toplayan** bir yer yok; backend hatası yalnız `SystemLog`'ta. Kanıt: W §2.A, §4#20.
**Sorun ne:** Canlıda bir hatayı proaktif görmenin merkezî bir yolu yok; kullanıcı söylemeden çoğu hata fark edilmiyor.
**Neden sana soruyorum:** Dış servis kişisel veri/iç detay taşıyabilir (KVKK üçüncü ülke) + aylık maliyet + entegrasyon eforu — ürün+hukuk kararı.
**Seçenekler:**
**A) Dış servis (Sentry vb.), kişisel-veri temizleme ile** · Ne kazanırsın: proaktif alarm + hata toplama · Ne kaybedersin: KVKK aktarım yüzeyi, aylık ücret, entegrasyon · Süre M/L · Geri alınır
**B) Kendi sunucumuzda hata toplama (self-host)** · Ne kazanırsın: veri dışarı çıkmaz · Ne kaybedersin: kurulum + bakım yükü · Süre L
**C) Kurma; iç `SystemLog` + `/health` + (KARAR-24 bağlamı) ile yetin** · Ne kazanırsın: yeni yüzey/maliyet yok · Ne kaybedersin: proaktif alarm yok, teşhis elle · Süre yok
**Karşılaştırma:** Ölçek büyüyorsa ve proaktif alarm şartsa A (en yaygın) veya veri hassasiyeti yüksekse B. Erken aşamadaysan C + KARAR-24 kısa vadede yeterli olabilir.
**Benim önerim:** Kısa vadede C + KARAR-24; kullanıcı sayısı artınca A/B. (Bu senin kararın.)
**Cevap vermezsen:** Dış izleme gelmez; V-02 (iç izleme) ile yetinilir — kabul edilebilir bir ara durum.
**CEVAP:**

---

### KARAR-28 · Ölü LLM/OpenAI ortam değişkenleri silinsin mi? (0 işi açar — SİLME PROTOKOLÜ)  [ÜRÜN KARARI · SİLME PROTOKOLÜ]
**Şu an ne var:** `LLM_PROVIDER` / `OPENAI_API_KEY` / `OPENAI_MODEL` `config.ts`'te okunuyor ama **hiçbir yerde kullanılmıyor** (ice-breaker/LLM yolu koddan silinmiş). Bu tur `.env.example`'da OPENAI_* ölü işaretlendi, LLM_PROVIDER eklenmedi. Kanıt: `config.ts:65-67`, W §D.3.
**Sorun ne:** Ölü değişkenler `.env.example`'da sır (API anahtarı) koymaya davet ediyor (yanıltıcı). Ama silme protokolü gereği "kullanılmıyor" tek başına silme gerekçesi değil.
**Neden sana soruyorum:** `config.ts` alanlarının ve `.env.example` satırlarının SİLİNMESİ = kod silme → SİLME PROTOKOLÜ PO kararı gerektirir. Niyet: ileride LLM (ice-breaker) geri gelecek mi?
**Seçenekler:**
**A) Sil (config alanları + .env.example satırları; önce arşiv belgesine yaz)** · Ne kazanırsın: yanıltıcı ölü env gider, sır ifşa daveti biter · Ne kaybedersin: LLM geri gelirse küçük iskele yeniden yazılır · Süre S · Geri alınır (arşivden) · Migration yok
**B) Bırak ama ölü-işaretli (bugünkü durum)** · Ne kazanırsın: iş yok, iskele durur · Ne kaybedersin: yanıltıcı satırlar kalır · Süre yok
**C) Canlandır (LLM/ice-breaker yolunu geri getir)** · Ne kazanırsın: ice-breaker özelliği · Ne kaybedersin: büyük iş + LLM maliyeti + KVKK (prompt'a giden veri) · Süre L · Migration yok
**Karşılaştırma:** LLM planın yoksa A (temiz, arşivli). Kararı ertelemek istiyorsan B (bugünkü ölü-işaret yeterince uyarıyor). Yakında ice-breaker düşünüyorsan C.
**Benim önerim:** A — LLM yolu bilinçli kaldırılmış, ölü env yanıltıcı; arşivleyerek silmek temiz. (İleride LLM planın varsa B.)
**Cevap vermezsen:** OPENAI_*/LLM_PROVIDER ölü-işaretli kalır — zararsız ama dağınık.
**CEVAP:**

---

### KARAR-29 · Öğrenme yolculuğunda diğer şıkların açıklaması gösterilsin mi? (1 işi açar — K-06)  [ÜRÜN KARARI]
**Şu an ne var:** Öğrenme yolculuğu senaryosunda kullanıcı bir şık seçince YALNIZ seçtiği şıkkın açıklaması görünüyor; diğer 3 şıkkın açıklaması gösterilmiyor. Kanıt: `ScenarioGuideEngine.tsx:271` — açıklamalar API'de **bilinçli** olarak istemciye yüklenmiyor ("cevap anahtarı sızmasın").
**Sorun ne:** Kullanıcı "neden diğerleri daha zayıf/yanlış" ı öğrenemiyor — öğrenme değeri eksik kalıyor. Ama bunun bir sebebi var: tüm açıklamalar baştan gelirse kullanıcı cevabı seçmeden "doğru olan hangisi" ipucunu alır (cevap anahtarı sızar).
**Neden sana soruyorum:** Bu pedagojik bir tasarım kararı: öğrenme değeri (hepsini göster) ↔ cevap-anahtarı sızması (gösterme). Ayrıca "seçtikten SONRA hepsini göster" seçeneği backend değişikliği + akış kararı gerektirir. Teknik değil, ürün/pedagoji kararı.
**Seçenekler:**
**A) Seçtikten SONRA 4 şıkkın da açıklamasını göster** · Kullanıcı ne görür: cevapladıktan sonra tüm şıkların açıklaması (neden bu güçlü, diğerleri neden zayıf) · Ne kazanırsın: en yüksek öğrenme değeri, cevap-anahtarı sızmaz (cevap sonrası) · Ne kaybedersin: backend açıklamaları cevap-sonrası göndermeli (küçük backend işi) · Süre M · Geri alınır · Migration yok
**B) Bugünkü gibi bırak (yalnız seçilenin açıklaması)** · Kullanıcı ne görür: yalnız kendi seçtiği şıkkın açıklaması · Ne kazanırsın: iş yok, sızma riski sıfır · Ne kaybedersin: karşılaştırmalı öğrenme yok · Süre yok
**C) Baştan hepsini göster (seçimden önce)** · Kullanıcı ne görür: tüm açıklamalar seçim öncesi · Ne kazanırsın: en basit uygulama · Ne kaybedersin: ⛔ cevap anahtarı sızar — senaryo bir "test" ise değeri düşer · Süre S · Geri alınır
**Karşılaştırma:** Senaryolar bir ÖĞRENME aracıysa ve puanlama önemli değilse A en iyisi (cevap-sonrası, sızma yok). Senaryolar bir DEĞERLENDİRME/test ise B güvenli. C sızma nedeniyle önerilmez.
**Benim önerim:** A — cevap-sonrası tüm açıklamalar öğrenme değerini artırır, sızma riski yok. Ama senaryolar puanlanıyor/sertifikaya sayılıyorsa B kalsın.
**Cevap vermezsen:** K-06 uygulanmaz; bugünkü davranış (yalnız seçilen açıklama) korunur — kabul edilebilir ara durum.
**CEVAP:** A  *(PO, 2026-09-21, strateji katmanı karar oturumu)*
> ⭐ **PO teyidi:** öğrenme yolculuğu senaryoları sertifika sınavında **ÇIKMIYOR** → cevap sonrası 4 şıkkın açıklamasını göstermek **cevap anahtarı sızdırmaz**.

---

# ⭐ BB TURU KARTLARI (2026-09-21) — devir analizi §4 + kuyruk §7.4

> **Kaynak:** `docs/raporlar/kesif/devir-analizi-2026-09-21.md` §4. Numaralar bu turda verildi (önceki en yüksek: **KARAR-29**).
> ⛔ **CEVAP satırları BOŞ** — yalnız PO doldurur.

---

### KARAR-30 · Senaryo isimleri: seed'den ÖNCE mi SONRA mı değişken yapılsın  [ÜRÜN + SIRA KARARI] (2 işi açar)
**Şu an ne var:** Senaryo metinlerindeki kişi isimleri koda gömülü. Kurum kendi bağlamına uygun isim kullanamıyor. Kanıt: 9 terim (`menti_denge`·`mentor_mimar`·`sert_1` …) iki repo tamamında harf duyarsız → **kodda 0 dosya** (7 isabetin hepsi belge). İçerik hazır: `docs/raporlar/icerik/menti-yolculugu-ve-eslesme-metinleri-2026-09-03.md:56` (14 değişken).
**Sorun ne:** Bu iş **tek başına** bir sıra sorusu doğuruyor: sertifika (K-16) ve öğrenme yolculuğu (K-18) içerikleri **canlı veritabanına yazılacak**. İsim değişkeni altyapısı bu yazımdan ÖNCE yapılırsa isimler baştan değişken olarak girer; SONRA yapılırsa **aynı içeriği ikinci kez yazmak** gerekir.
**Neden sana soruyorum:** Canlı veritabanına içerik yazımı geri dönülmez bir işlem ve onayın şart; sıranın yanlış seçilmesi aynı işi iki kez yaptırır.
**Seçenekler:**
· **A — Önce isim altyapısı, sonra içerik yazımı.** Kullanıcı ne görür: bir süre daha bugünkü "Seçenek A" metinleri. Ne kazanırsın: içerik canlıya **bir kez** yazılır, kurum ilk günden kendi isimlerini kullanır. Ne kaybedersin: sertifika/yolculuk içeriği **gecikir** (isim altyapısı önce bitmeli). Süre **M** · geri alınır ✅ · migration **olası** (kurum-bazlı isim alanı).
· **B — Önce içerik yazımı, isimler sonra.** Kullanıcı ne görür: gerçek senaryolar **hemen** canlıda. Ne kazanırsın: en hızlı görünür değer. Ne kaybedersin: isim altyapısı gelince **aynı içerik ikinci kez yazılır** — canlı veritabanına ikinci geri-dönülmez işlem + ikinci onay turu. Süre **S sonra M** · geri alınır ⚠️ zor · migration **olası**.
· **C — İsimler sabit kalsın, değişken altyapısı hiç yapılmasın.** Kullanıcı ne görür: bugünkü hâli, kalıcı. Ne kazanırsın: sıfır iş. Ne kaybedersin: **kurum kendi bağlamını kuramaz**; senaryolar her kurumda aynı kurgu isimlerle okunur, sahiplik hissi düşer. Süre **0** · geri alınır ✅.
**Karşılaştırma:** Sertifika/yolculuk içeriğini yakında canlıya almak istiyorsan B hızlıdır ama ikinci yazım maliyetini kabul etmiş olursun. İçerik birkaç hafta bekleyebiliyorsa A toplamda daha ucuz. C yalnız "isim özelleştirme bizim için önemli değil" diyorsan doğrudur.
**Benim önerim:** **A** — çünkü canlı veritabanına içerik yazımı bu projede onay + yedek gerektiren ağır bir işlem; onu iki kez yapmaktansa bir kez doğru yapmak daha ucuz.
**Cevap vermezsen:** **I-09** kuyrukta bekler; ayrıca **K-16** ve **K-18** seed işleri "hangi sıra" sorusu cevapsız olduğu için güvenle başlatılamaz.
**CEVAP:**

---

### KARAR-31 · Kriz bildirimi (kendine zarar) + yaş sınırı  [ÜRÜN + HUKUK] (2 işi açar)
**Şu an ne var:** Sertifika sınavında mentöre *"menti kendine zarar ifadesi kullanırsa ne yaparsın"* diye **soruluyor** (red-line konu `kriz-yonetimi`) ama canlıda böyle bir akış **yok**. Kanıt: 7 terim, İKİ DİLLİ, harf duyarsız (`kriz`·`crisis`·`selfharm`·`self-harm`·`kendine zarar`·`acil durum`·`emergency`) → **2 satır, 0'ı akış** (biri iş unvanı listesi, biri sınav konu etiketi).
**Sorun ne:** Mentör eğitimde öğrendiği refleksi uygulayacak bir yer bulamıyor; kriz anında sistem sessiz. Sertifika bir davranışı öğretiyor, ürün karşılığını sunmuyor.
**Neden sana soruyorum:** Bir kişinin en kırılgan anında kimin haberdar olacağı hukuki ve etik bir karardır; yanlış kurgu zarar verir.
**Seçenekler:**
· **A — Bildirim yok, yalnız yardım hattı metni.** Kullanıcı ne görür: kriz ifadesinde ekranda destek hattı bilgisi. Ne kazanırsın: hukuki risk en düşük, mahremiyet tam. Ne kaybedersin: **kurum hiçbir zaman haberdar olmaz**; mentör yalnız kalır. Süre **S** · geri alınır ✅ · migration yok.
· **B — Sessiz bildirim (menti bilmez).** Kullanıcı ne görür: menti hiçbir şey görmez; kurum yöneticisine bildirim düşer. Ne kazanırsın: müdahale mümkün. Ne kaybedersin: **menti izlendiğini bilmiyor** — güven ihlali ve KVKK açık rıza sorunu. Süre **M** · geri alınır ⚠️ (gönderilen bildirim geri alınamaz) · migration **var**.
· **C — Şeffaf bildirim (menti görür).** Kullanıcı ne görür: *"bu mesaj kurum yöneticisiyle paylaşıldı"* bilgisi. Ne kazanırsın: dürüst ve KVKK-uyumlu. Ne kaybedersin: menti **bir daha o konuyu açmaz** — özellik kendi amacını zayıflatır. Süre **M** · geri alınır ⚠️ · migration **var**.
**Karşılaştırma:** Üçü de avukat onayı ister. A en güvenli ama en az koruyucu; C etik olarak en savunulabilir ama işlevi zayıflatır; B en riskli çünkü kişi bilmeden izlenir.
**Benim önerim:** Yok — **bu senin ürün kararın, önerime güvenme.** Avukat görüşü alınmadan hiçbiri seçilmemeli.
⚠️ **BAĞLI SORU (aynı kart, avukata TEK soru olarak gitmeli):** Bu akış 18 yaş altı menti varsayıyorsa **`G1-01` çöker** — bugün *"18+ beyanı yeterli"* deniyor; gerçek yaş ve veli onayı gerekir.
**Cevap vermezsen:** **I-18** kuyrukta bekler; sertifika bir davranışı öğretip karşılığını sunmamaya devam eder.
**CEVAP:**

---

### KARAR-32 · Mentör kendini havuzdan çekebilsin mi  [ÜRÜN KARARI] (2 işi açar)
**Şu an ne var:** Backend **tam ve güvenli**: `POST /mentors/:mentorId/visibility-optin` + rol kontrolü + sahiplik guard'ı (`userRoutes.ts:91-96`, V-03 IDOR düzeltmesi). Ama **hiçbir ekran bunu çağırmıyor** — frontend taraması (2 terim, harf duyarsız) → **0 sonuç**. Ayrıca şemada uyuyan bir alan var: `UserProfile.mentorVisibilityEnabled` (`schema.prisma:323`, varsayılan `true`) — **hiçbir akış okumuyor/yazmıyor**, eşleştirme filtrelerinde de kullanılmıyor.
**Sorun ne:** Mentör yoğun bir dönemde ya da izne çıkarken kendini menti havuzundan geçici olarak çekemiyor. Yapabileceği tek şey hiç yanıt vermemek — bu da mentiyi süresiz bekletiyor.
**Neden sana soruyorum:** "Mentör kendi görünürlüğünü kontrol edebilir mi" bir yetki sorusudur; ayrıca uyuyan alanın **silinmesi mi bağlanması mı** gerektiği silme protokolüne göre PO kararıdır.
**Seçenekler:**
· **A — Mentör kendi görünürlüğünü açıp kapatabilsin.** Kullanıcı ne görür: profilinde "Yeni menti kabul ediyorum" anahtarı. Ne kazanırsın: mentör tükenmeden kendini koruyabilir; menti boş yere beklemez. Ne kaybedersin: havuz **anlık küçülebilir**; menti "mentör yok" ekranıyla daha sık karşılaşır. Süre **S** (backend hazır) · geri alınır ✅ · migration yok.
· **B — Yalnız kurum yöneticisi kapatabilsin.** Kullanıcı ne görür: mentörde anahtar yok; yönetici panelinden yönetilir. Ne kazanırsın: havuz kontrolü kurumda kalır. Ne kaybedersin: mentör kendi yükünü **yönetemez**, yöneticiye yazmak zorunda — sürtünme. Süre **S** · geri alınır ✅ · migration yok.
· **C — Hiç açılmasın; uyuyan alan silme protokolüne girsin.** Kullanıcı ne görür: değişiklik yok. Ne kazanırsın: sıfır iş; şema sadeleşir. Ne kaybedersin: mentörün tek çıkışı **sessiz kalmak** olur; ayrıca backend'de çalışan bir uç kalıcı olarak öksüz kalır. Süre **0** (silme ayrı tur) · geri alınır ✅.
**Karşılaştırma:** Mentör sayısı azken A havuzu daralttığı için riskli görünebilir; ama "sessiz mentör" zaten fiilen havuz dışındadır ve mentiyi bekleterek zarar verir. B, kurumun program sahipliği güçlüyse doğrudur. C yalnız "mentör her zaman açık olmalı" diyorsan tutarlıdır.
**Benim önerim:** **A** — çünkü backend ve güvenlik guard'ı zaten hazır; iş yalnız ekran, ve "sessiz mentör" sorununu görünür hâle getirir.
⚠️ **Not:** Hangi seçenek seçilirse seçilsin, `mentorVisibilityEnabled` alanının **bağlanacağı mı silineceği mi** aynı cevapta netleşir (silme = ayrı tur + ikinci onay, SİLME PROTOKOLÜ).
**Cevap vermezsen:** **Y-15** kuyrukta bekler; şemadaki uyuyan alan belirsiz kalır.
**CEVAP:** A  *(PO, 2026-09-21, strateji katmanı karar oturumu)*

---

### KARAR-33 · Kurumdan üye çıkarma ve red tipi  [ÜRÜN KARARI] (2 işi açar)
**Şu an ne var:** Yönetici yalnız *bekleyen* başvuruyu reddedebiliyor. Backend aslında onaylı üyeye de uygulanabiliyor (`adminController.ts:740-781`; tek engel `:755` zaten reddedilmiş kayıt) ama **ekranda düğme yok** — onaylı üye listeleri red bilgisini yalnız OKUYOR. Ayrıca çıkarılan kişiye giden mail *"dilerseniz tekrar başvurabilirsiniz"* diyor (`emailService.ts:174`) — onaylı üye çıkarılırken **yanlış metin**.
**Sorun ne:** Kuruma uygun olmadığı anlaşılan bir üye sistemde kalıyor. Ayrıca red tek tip: kötü niyetli kişiye de, eksik form dolduran iyi niyetli kişiye de aynı kibar mesaj gidiyor.
**Neden sana soruyorum:** Birinin kurumdan çıkarılması ve "bir daha başvuramaz" denmesi kişinin hakkını etkiler; KVKK ve etik sonucu var.
**Seçenekler:**
· **A — Çıkarma yok, yalnız "düzeltme iste".** Kullanıcı ne görür: bugünkü gibi. Ne kazanırsın: sıfır risk, sıfır iş. Ne kaybedersin: **kuruma zarar veren üye sistemde kalır**; yönetici elle uğraşır. Süre **S** · geri alınır ✅.
· **B — Üyelik pasifleştirilir, veri kalır.** Kullanıcı ne görür: çıkarılan kişi giriş yapamaz; geçmiş görüşmeleri kurumda kalır. Ne kazanırsın: geri alınabilir, istatistik bozulmaz. Ne kaybedersin: kişinin verisi kurumda **kalmaya devam eder** — KVKK açısından gerekçe yazılmalı. Süre **S** (backend hazır) · geri alınır ✅.
· **C — Üyelik + veri anonimleştirilir.** Kullanıcı ne görür: kişi ve izleri kurumdan silinir. Ne kazanırsın: KVKK açısından en temiz. Ne kaybedersin: **geri dönüşü YOK**; mentörün geçmiş görüşme sayısı da düşer, **emeği kaybolur**. Süre **M** · geri alınamaz ⛔.
**Karşılaştırma:** Kurum küçük ve güven esaslıysa B yeter (çıkar, ama izi tut). Taciz/kötüye kullanım vakası bekleniyorsa C gerekir ama emek-kaybı yan etkisi konuşulmalı. A yalnız "şimdilik" cevabıdır.
**Benim önerim:** **B** — çünkü geri alınabilir, mentör emeğini korur ve backend zaten bunu yapıyor; C'yi gerektiren vaka çıkınca ayrı karar verilir.
**Cevap vermezsen:** **Y-14** (madde 36) kuyrukta bekler; yönetici onaylı üyeyi çıkaramamaya devam eder ve yanlış e-posta metni yerinde kalır.
**CEVAP:**

---

### KARAR-34 · Kulüp tipi kurum ve kurumlar-arası görünürlük  [ÜRÜN + HUKUK] (3 işi açar)
**Şu an ne var:** Kulüp modülü backend'de canlı (`clubRoutes.ts`) ama avukat notu *"veri sorumlusu üniversitedir, kulübün imza yetkisi yok"* diyor (madde 91). Ayrı olarak kurumlar birbirinin verisine tamamen kapalı.
**Sorun ne:** Bir üniversite kulübü kendi başına kayıt olursa sözleşmeyi imzalayacak tüzel kişi yok. Ayrıca hiçbir kurum diğerinin başarısını göremediği için "biz de yapalım" etkisi doğmuyor.
**Neden sana soruyorum:** Kimin kaydolabileceği ve kimin ne göreceği — hukuki sorumluluk ve büyüme stratejisi.
**Seçenekler:**
· **A — Kulüp kaydı kapalı, kurum verisi tamamen kapalı.** Ne kazanırsın: sıfır hukuki risk. Ne kaybedersin: **kulüpler hiç giremez** (hedef kitlenin bir bölümü) + organik büyüme kanalı yok. Süre **S** · geri alınır ✅.
· **B — Kulüp ancak üniversite onayıyla; kurum isterse anonim/toplu veri paylaşır.** Ne kazanırsın: hukuk korunur, büyüme kanalı açılır; k-anonimlik altyapısı **zaten kodda** (`mask.ts:70`). Ne kaybedersin: onay akışı **ek iş**. Süre **M** · geri alınır ✅ · migration **olası**.
· **C — Kulüp açık kalsın (beyanla), kurumlar arası açık görünürlük.** Ne kazanırsın: en hızlı büyüme. Ne kaybedersin: **avukat riski kurumda** + küçük kurumda toplu veri bile kişiyi ifşa edebilir. Süre **M** · geri alınması zor ⛔ (paylaşılan veri geri alınamaz).
**Karşılaştırma:** B, hukuk ile büyümeyi ayıran tek seçenek ama en pahalısı. C, gerçek kullanıcı ~sıfırken cazip görünür; kurum sayısı artınca geri alınamaz.
**Benim önerim:** **B** — çünkü avukat notu zaten C'yi riskli ilan etmiş ve k-anonimlik altyapısı kodda hazır.
**Cevap vermezsen:** madde 91 · 115 · 116 kuyruğa giremez; kulüp modülü canlı ama hukuken savunmasız kalır.
**CEVAP:**

---

### KARAR-35 · Canlı veritabanına salt-okuma izni  [OPERASYON KARARI] (5+ işi açar)
**Şu an ne var:** madde 30 · 33 · 118, söz S10 ve Y6 — hepsi *"canlı veritabanında kaç kayıt var"* sorusuna bağlı ve bu soru **hiç sorulmamış**. Proje kuralı canlı veritabanına `SELECT` için bile onay istiyor.
**Sorun ne:** Beş iş, tek bir sayım yapılamadığı için aylardır kilitli.
**Neden sana soruyorum:** Canlı ve yerel aynı veritabanını paylaşıyor (⚠️ bu varsayım da bu turda **çelişkili** çıktı — bkz. `03-PO-ELLE-ISLER.md` ADIM 0); dokunma izni sende.
**Seçenekler:**
· **A — Salt-okuma `SELECT count(*)` izni ver.** Ne kazanırsın: beş iş **aynı anda** açılır; kişisel veri okunmaz, yalnız sayı döner. Ne kaybedersin: yanlış yazılmış bir sorgu teorik olarak yük bindirir (pratikte `count(*)` zararsız). Süre **S** · geri alınır ✅.
· **B — Sen kendi panelinden say, sayıyı belgeye yaz.** Ne kazanırsın: ajan veritabanına hiç dokunmaz. Ne kaybedersin: **iş sende**; her teyit turunda tekrar gerekir. Süre **S (senin için)** · geri alınır ✅.
· **C — Ertele.** Ne kaybedersin: madde 30/33/118 + S10 + Y6 **kilitli kalır**; sertifika ve öğrenme içeriği ilerlemez. Süre **0** · geri alınır ✅.
**Karşılaştırma:** A ile B aynı sonucu verir; fark işin kimde olduğudur. C hiçbir şey çözmez, yalnız erteler.
**Benim önerim:** **A** — `count(*)` kişisel veri döndürmez ve beş kalemi tek hamlede açar.
⚠️ **Ön koşul:** Hangi veritabanının canlı olduğu (`03-PO-ELLE-ISLER.md` ADIM 0) netleşmeden sayım anlamsızdır.
**Cevap vermezsen:** Beş kalem teyitsiz kapalı kalır.
**CEVAP:**

---

### KARAR-36 · Yarım kalmış üç teknik kalem: `answeredFollowup` · `qualityMultiplier` ikizi · iki yedek tablo  [VERİ KARARI] (4 işi açar)
**Şu an ne var:** (a) Kod var olmayan bir tabloyu sorguluyor — `profile-completeness.service.ts:43-50`; ⚠️ **bu turda daha kötüsü bulundu:** `(prisma as any).answeredFollowup?.count(...)` optional chaining yüzünden **hata fırlatmadan `undefined` dönüyor** → sonuç **her zaman 0** ve `catch` bloğu **ölü kod**, yedek hesaplama hiç çalışmıyor → profil tamamlanma yüzdesi **sistematik düşük**. (b) `UserProfile.qualityMultiplier` kullanılmıyor; canlı akış `TenantMembership` üzerinden yürüyor. (c) İki yedek tablo (`MentorshipAgreement_yedek_20260830` 150 satır · `CertificationOption_yedek_20260909` 20 satır) şemada **yok** → `migrate dev`/`db push` onları fazlalık görüp silebilir.
**Sorun ne:** Üçü de "yarım bırakılmış"; hiçbiri hata vermiyor, bu yüzden kimse fark etmiyor. Ama üçü de bir gün sessizce veri kaybettirebilir.
**Neden sana soruyorum:** Üçü de **silme** kararına dokunuyor; SİLME PROTOKOLÜ senin ikinci onayını şart koşuyor.
**Seçenekler (her kalem için aynı üçlü):**
· **A — Tamamla/kalıcılaştır.** (a) tabloyu aç · (b) ikizi doğru bağla · (c) yedek tabloları şemaya ekle. Ne kazanırsın: hiçbir şey kaybolmaz; (c) için `migrate dev`'in kazara silmesi **imkânsızlaşır**. Ne kaybedersin: **migration** + kalıcı bakım yükü. Süre **M** · geri alınır ✅ · migration **var**.
· **B — Karantinaya al** (`@deprecated`, rota kapalı), bir tur sonra ikinci onayla sil. Ne kazanırsın: protokole uygun, geri dönülebilir. Ne kaybedersin: iki tur sürer. Süre **M** · geri alınır ✅.
· **C — Şimdi sil (DROP).** Ne kazanırsın: en temiz. Ne kaybedersin: **geri dönüşü yok**; yedek tablolar silinirse 6 saatlik geri-yükleme penceresi dışındaki **tek koruma gider**. Süre **S** · geri alınamaz ⛔ · migration **var**.
**Karşılaştırma:** (c) yedek tablolar için özellikle dikkat — onlar **koruma amaçlı** duruyor; erken silmek koruma kaybıdır. (a) ve (b) normal ölü-kod protokolüne girer.
**Benim önerim:** (a)+(b) için **B** (karantina), (c) için **A** (şemaya ekle) — çünkü yedek tabloyu şemaya eklemek kazara silinmesini önler ve silme kararını aceleye getirmez.
**Cevap vermezsen:** **Y-18** (madde 126), D3, **S26** ve **S37** açık kalır; bir `migrate dev` turunda yedek tablolar **uyarısız kaybolabilir**.
**CEVAP:**

---

### KARAR-37 · `00-KARAR-TAKIP` madde 103 — kart mı özet mi kazanır  [BELGE/METODOLOJİ]
**Şu an ne var:** `G2-01..05` kartları madde 103 için **🗑️ geçersiz** diyor; madde 103 satırı hâlâ **🔵❓** duruyor.
**Sorun ne:** Aynı kalem iki yerde iki farklı durumda. KURAL 15 *"çelişkide KART kazanır"* diyor — ama kartın konusu *"DISC matrisi onayı"*, madde 103'ünki *"psikometrik gerekçenin belgelenmemesi"*; **aynı şey olmayabilir.**
**Neden sana soruyorum:** Bu tam olarak **G1-23 vakasının tekrarı** — orada da özet belge, farklı konulu bir kanıta dayanarak bir kalemi yanlışlıkla kapatmıştı ("21. hayalet tamamlanmış") ve bu, KURAL 15'in doğma sebebi oldu.
**Seçenekler:**
· **A — Kart kazanır, madde 103 🗑️.** Ne kazanırsın: tek hamlede kapanır. Ne kaybedersin: **gerçekten ayrı bir konuysa sessizce kaybolur** (G1-23 tekrarı). Süre **S** · geri alınır ✅.
· **B — Ayrı konu; madde 103 ⬜ AÇIK kalır, gerekirse yeni kart açılır.** Ne kazanırsın: kayıp yok. Ne kaybedersin: bir kalem daha açık listede. Süre **S** · geri alınır ✅.
· **C — ❓ TEYİT GEREK bırak.** Ne kaybedersin: belirsizlik sürer, her turda yeniden tartışılır. Süre **0** · geri alınır ✅.
**Karşılaştırma:** A hızlı ama G1-23 dersini görmezden gelir; B bir kalem maliyetine kaybı önler; C hiçbir şey çözmez.
**Benim önerim:** **B** — çünkü aynı hata bu projede bir kez ölçülmüş ve kural hâline getirilmiş (KURAL 15'in gerekçesi).
**Cevap vermezsen:** madde 103 belirsiz kalır, her denetim turunda yeniden gündeme gelir.
**CEVAP:**

---

## ⭐ DÖRT KONSEY KARARLARI (2026-09-21) — KARAR-38…52

> Bu 15 kart dört konsey raporundan geldi. Numaralar **KARAR-37**'den devam ediyor (doğrulandı).
> Kümeleme: 38-40 güvenlik/KVKK · 41-44 psikometri/eşleştirme · 45-48 içerik/metin · 49-52 belge yönetişimi.
> ⛔ `CEVAP:` satırları **boş** — yalnız PO doldurur.

---

### KARAR-38 · Kurum sunucusunun ülkesi ve aydınlatma metninin düzeltilmesi  [HUKUK + ÜRÜN] (1 işi açar)
> ⭐ **Kaynak:** güvenlik konseyi (`docs/raporlar/kesif/konsey-guvenlik-kvkk-2026-09-21.md`), 2026-09-21.
> ⚠️ **ÇAPRAZ:** bu kartın avukat sorusu **KARAR-47** (hukuki metin paketi) içinde tek seferde sorulur — ayrı bir hukuk görüşmesi açma.
**Şu an ne var:** KVKK aydınlatma sayfası (`app/kvkk/page.tsx:92-107`) *"İrlanda (Avrupa Birliği) bölgesinde … GDPR standartlarına tabidir"* diyor. Proje belgesi ise PO teyidiyle veritabanı bölgesinin **Londra / Birleşik Krallık** olduğunu yazıyor (`CLAUDE.md:255`, madde 92, 2026-08-26) — **BK, AB üyesi değil.** Metin ayrıca "yönetilen PostgreSQL hizmeti" diyor, PROD ise kendi konteynerinde Postgres çalıştırıyor (`docker-compose.yml:16-24`). Aktarım bölümü (`:60-64`) Google/LinkedIn OAuth ve e-posta sağlayıcısını **hiç saymıyor**; işlenen veri listesinde (`:31-39`) 8 kategori eksik (mesaj içeriği, telefon, sosyal linkler, avatar, OCEAN/arketip, şikâyet kayıtları, IP adresi `platformAudit.ts:32`, `lastLoginAt`).
**Sorun ne:** Kuruma ve kullanıcıya **yanlış ülke ve yanlış hukuki rejim** beyan ediliyor. Bir denetimde ilk bakılacak belge budur; yanlış beyan, eksik beyandan daha ağır sonuç doğurur.
**Neden sana soruyorum:** Metin hukuki sonuç doğuruyor ve ajan doğru cevabı koddan çıkaramaz — **uygulama sunucusunun ülkesi kodda hiç yok** (yalnız veritabanı bölgesi belgede).
**Seçenekler:**
· **A — Metni gerçeğe uydur (Londra/BK + tüm alıcılar).** Kullanıcı ne görür: doğru ülke, doğru rejim ve tam alıcı listesi. Ne kazanırsın: beyan gerçeğe uyar, denetimde savunulabilir. **NE KAYBEDERSİN:** BK'ye aktarım **yurt dışı aktarım** sayılırsa KVKK Md.9 gereği ek açık rıza/taahhütname gerekebilir → **yeni bir rıza akışı** ve mevcut kullanıcılardan yeniden onay demek. Süre **M** · geri alınır ✅ · migration **yok**.
· **B — Sunucuyu AB/Türkiye'ye taşı, metni koru.** Kullanıcı ne görür: hiçbir değişiklik. Ne kazanırsın: en temiz hukuki konum, ek rıza yükü yok. **NE KAYBEDERSİN:** taşıma **geri dönülmez bir altyapı işi** — kesinti riski, yeniden yapılandırma, maliyet; üstelik taşıma maliyeti bu turda **ölçülmedi**. Süre **L** · geri alınması **zor ⛔** · migration **yok** (veri taşınır).
· **C — Önce avukata sor, sonra karar ver.** Kullanıcı ne görür: bir süre daha bugünkü (yanlış) metni. Ne kazanırsın: yanlış yöne para/zaman harcanmaz. **NE KAYBEDERSİN:** metin **yanlış hâliyle canlıda kalmaya devam eder**; her geçen gün yanlış beyanla kullanıcı alınır. Süre **S** (soru) + bekleme · geri alınır ✅ · migration **yok**.
**Karşılaştırma:** A hızlı ve dürüst ama yeni bir rıza yükü getirebilir. B en temiz ama en pahalı ve maliyeti bugün bilinmiyor. C tek başına çözüm değil; A veya B'nin ön adımıdır.
**Benim önerim:** **C → sonra A.** Çünkü "BK'ye aktarım ek rıza ister mi" sorusunun cevabı A'nın maliyetini tamamen değiştiriyor ve bunu ajan bilemez. Ama C'de **beklerken metin düzeltilmeli** — en azından "İrlanda/AB" ifadesinin kaldırılıp "sunucu konumu teyit ediliyor" denmesi, yanlış beyandan iyidir.
**Cevap vermezsen:** GV-09 kilitli kalır; aydınlatma metni yanlış ülke beyanıyla canlıda durur. Avukat paketine bağlı **F-02** (mesaj saklama süresi), **F-03** (OAuth rıza metni) ve **GV-18** (rıza sürümü, `CONSENT_VERSION` yer tutucu) da **birlikte kilitli kalır**.
**CEVAP:**

---

### KARAR-39 · Anonimleştirme kapsamı: psikometrik kopyalar ve başkasının yazdığı yorumlar  [ÜRÜN + KVKK] (1 işi açar)
> ⭐ **Kaynak:** güvenlik konseyi (`docs/raporlar/kesif/konsey-guvenlik-kvkk-2026-09-21.md`), 2026-09-21.
**Şu an ne var:** Hesap kapatınca `UserProfile.archetype`, OCEAN ve DISC değerleri **özenle siliniyor** (`gdprService.ts:112-119`) — ama **aynı arketip `Match` tablosunda düz metin duruyor** (`schema.prisma:1035-1036`, **NOT NULL**) ve `Match.mentorId → UserProfile.id → userId` zinciriyle hâlâ kişiye bağlanabiliyor. Ayrıca `MatchFeedback.comment` (başkasının o kişi hakkında yazdığı 1000 karakterlik yorum) hiç ellenmiyor; `fromUserId`'de **FK bile yok** (`:1170`) → şema düzeyinde hiçbir cascade yakalayamaz. Kullanıcıya verilen metin ise *"kimliğinizle ilişkilendirilebilir verileriniz geri döndürülemez şekilde anonimleştirildi"* diyor (`:50`).
**Sorun ne:** Verilen taahhüt **psikometrik veri için gerçekleşmiyor**. Ayrıca `Match` satırını boşaltmak kurumun geçmiş eşleştirme istatistiklerini de etkiler — bu bir denge sorusu.
**Neden sana soruyorum:** "Kişi gitti; ama onun hakkında **başkasının yazdığı** yorum ve onunla kurulmuş eşleşmenin istatistiği kalsın mı?" — bu bir KVKK yorumu değil, **ürün ve etik** kararıdır.
**Seçenekler:**
· **A — Arketipi boşalt, yorumu da boşalt.** Kullanıcı ne görür: verilen taahhüt aynen gerçekleşir. Ne kazanırsın: en temiz konum; taahhüt metni doğru olur. **NE KAYBEDERSİN:** `Match.mentorArchetype` **NOT NULL** → ya migration ile nullable yapılır ya `'[kaldırıldı]'` yazılır; kurumun geçmiş eşleştirme kalitesi analizi bozulur. Süre **M** · geri alınır ✅ · **migration olası**.
· **B — Arketipi boşalt, yorumu bırak (yazarın verisi say).** Kullanıcı ne görür: profili gider, hakkında yazılanlar kalır. Ne kazanırsın: yazarın ifade kaydı korunur; **projede bu desen zaten var** (`gdprService.ts:168-171`, `MentorshipAgreement`'ta yalnız menti tarafı boşaltılıyor). **NE KAYBEDERSİN:** kişi hakkında 1000 karakterlik yorum sistemde kalır — "unutulma hakkı" tam karşılanmaz, kişi itiraz ederse savunması zor. Süre **S** · geri alınır ✅ · migration **yok**.
· **C — İkisini de bırak, taahhüt metnini düzelt.** Kullanıcı ne görür: "anonimleştirildi" yerine "bir kısmı kalır" diyen dürüst ama küçültülmüş bir vaat. Ne kazanırsın: sıfır kod işi. **NE KAYBEDERSİN:** ürünün **en hassas vaadinden geri adım**; KVKK açısından da en zayıf konum. Süre **S** · geri alınır ✅ · migration **yok**.
**Karşılaştırma:** A taahhüde birebir uyar ama istatistik maliyeti ve migration getirir. B mevcut proje desenine uygun ve ucuz, ama yorum konusunda savunması zayıf. C dürüst ama vaadi küçültür.
**Benim önerim:** **B + taahhüt metninin netleştirilmesi** — arketip (kişinin **kendi** psikometrik verisi) A'daki gibi temizlenmeli; yorum ise projenin zaten benimsediği "yazarın verisi" desenine bırakılmalı; ama `gdprService.ts:50`'deki metin bu ayrımı **açıkça** söylemeli.
**Cevap vermezsen:** GV-08'in **yorum ayağı** kilitli kalır (arketip + 4 alan ayağı karardan bağımsız yapılabilir); anonimleştirme 6 tabloyu atlamaya devam eder ve kullanıcıya verilen taahhüt yanlış kalır.
**CEVAP:**

---

### KARAR-40 · Eski `POST /api/meetings` ucu: düzeltilsin mi, karantinaya mı alınsın  [ÜRÜN/TEKNİK] (1 işi açar)
> ⭐ **Kaynak:** güvenlik konseyi (`docs/raporlar/kesif/konsey-guvenlik-kvkk-2026-09-21.md`), 2026-09-21.
**Şu an ne var:** İki görüşme yaratma yolu var. Canlı arayüz `POST /api/meetings/book` kullanıyor (kimliği **token'dan** alıyor, güvenli — `meetingController.ts:515`). Eski `POST /api/meetings` ise kimliği **gövdeden** alıyor ve sahiplik kontrolü yok (`:155-211`, GV-06) — ama oryantasyon kilidini **uygulayan tek yol** da bu (`:162`).
**Sorun ne:** Açık uç canlıda mount'lu ve her mentiye yetkili. Bunu düzeltmek mi kapatmak mı gerektiği bir mükerrer-kod kararı.
**Neden sana soruyorum:** Uç kapatmak **geri dönülmez** ve projenin SİLME PROTOKOLÜ'ne tabi (`K-13`, `E-4`); protokol senin ikinci onayını şart koşuyor.
**Seçenekler:**
· **A — Sahiplik kapısı ekle, uç kalsın.** Kullanıcı ne görür: kimse başkası adına randevu açamaz; başka hiçbir şey değişmez. Ne kazanırsın: **bugün güvenli**, hiçbir şey kaybolmaz, protokol gerekmez. **NE KAYBEDERSİN:** mükerrer kod kalır; iki yol arasındaki davranış farkı (oryantasyon kilidi yalnız eski yolda) sürer ve gelecekte yine karışır. Süre **S** · geri alınır ✅ · migration **yok**.
· **B — Karantinaya al (rota kapalı), oryantasyon kilidini `book`'a taşı.** Kullanıcı ne görür: tek bir randevu yolu; kilit artık gerçekten çalışıyor. Ne kazanırsın: mükerrerlik biter, kilit **doğru yolda** uygulanır (V-15'i de çözer). **NE KAYBEDERSİN:** iki iş birden; `K-13` protokolü gereği **niyet + ikame kanıtı + arşiv belgesi** yazılmalı; bir tur bekler ve bu arada açık uç açık kalır. Süre **M** · geri alınır ✅ (karantina 🟡) · migration **yok**.
· **C — Şimdilik dokunma, `K-13`/`E-4` turunu bekle.** Kullanıcı ne görür: hiçbir değişiklik. Ne kazanırsın: hiçbir şey. **NE KAYBEDERSİN:** ⛔ **açık uç canlıda açık kalır** — GV-06 bir çıkış blokeri; kabul edilemez. Süre **0** · geri alınır ✅ · migration **yok**.
**Karşılaştırma:** A açığı bugün kapatır ama teknik borcu bırakır. B doğru son hâldir ama yavaştır. C açığı açık bırakır.
**Benim önerim:** **A şimdi, B sonra** — sahiplik kapısı bugün eklensin (GV-06 kapansın), karantina kararı `K-13`/`E-4` turunda SİLME PROTOKOLÜ ile verilsin. Güvenlik düzeltmesi temizlik kararını **beklememeli**.
**Cevap vermezsen:** GV-06'nın **acil yaması yine de yapılabilir** (A yolu karardan bağımsızdır), ama mükerrerlik ve oryantasyon kilidinin yanlış yolda durması sürer; V-15 ve K-13 ile birlikte belirsiz kalır.
**CEVAP:**

---

### KARAR-41 · Mentörün bir kontenjanı olsun mu? (1 işi açar — P-15)  [ÜRÜN KARARI · ŞEMA]
> ⭐ **Kaynak:** psikometri konseyi (`docs/raporlar/kesif/konsey-psikometri-2026-09-21.md`), 2026-09-21.
**Şu an ne var:** Kapasite/kontenjan kavramı **kodda hiç yok** (kapsam: BE `src/` · `prisma/` · `tests/`; terimler `maxMentees · capacity · maxMenti · kontenjan · kapasite · activeMentiLimit · mentiLimit`, harf duyarsız + iki dilli → ilgili **0 eşleşme**; dönen 4 satır SMTP adresi, seed soru metni ve e-posta testi). Eşleştirmenin hiçbir elemesi aktif menti sayısına bakmıyor (`matching.ts:267,270,274,278,283`).
**Sorun ne:** 20 aktif mentisi olan mentör ile hiç mentisi olmayan mentör **aynı havuzda, aynı skorla** yarışıyor. Sektörü uyan popüler bir mentör herkese önerilmeye devam ediyor; yeni katılan mentöre hiç talep gitmiyor. Mentör personasının kendi endişesi tam olarak bu: *"sürekli meşgul edilmek istemem — mentörlük ara ara bir iştir"* ve *"herkesle eşleşmek istemem, seçicilik korunmalı"* (`persona/mentor-persona-...:60-62`).
**Neden sana soruyorum:** Kontenjan koymak *"kim kiminle eşleşebilir"i* değiştirir — bir mentör, uyumlu olduğu hâlde bir mentiye artık görünmez. Bu bir ürün vaadidir, teknik ayar değil.
**Seçenekler:**
**A) Kontenjan yok (bugünkü durum)** · Kullanıcı ne görür: değişiklik yok · Ne kazanırsın: iş yok; menti her zaman en uyumlu mentörü görür · **Ne kaybedersin:** popüler mentör bunalır ve platformu bırakabilir; yeni mentör hiç talep almaz, o da bırakır; P-15 satırı sonsuza kadar kilitli kalır · Süre **yok** · Geri alınır **—(değişiklik yok)** · Migration **yok**
**B) Mentör kendi kontenjanını belirlesin** (profilinde "aynı anda en fazla N menti") · Kullanıcı ne görür: mentör bir sayı seçer, dolunca havuzdan düşer · Ne kazanırsın: seçicilik mentörün elinde, persona endişesi doğrudan karşılanır · **Ne kaybedersin:** **yeni alan = migration**; menti "dün gördüğüm mentör kayboldu" diyebilir ve sebebini kimse açıklayamaz; kontenjanların dolu olduğu bir kurumda menti **hiç mentör göremeyebilir** · Süre **M** · Geri alınır **evet** (alan kalır, filtre kapatılır) · Migration **VAR**
**C) Kontenjan yok ama skorda yumuşak yük dengesi** (aktif menti sayısı arttıkça skor bir miktar düşer) · Kullanıcı ne görür: yoğun mentör listede aşağı iner ama **kaybolmaz** · Ne kazanırsın: migration yok (sayım canlı hesaplanır); kimse havuz dışında kalmaz · **Ne kaybedersin:** mentörün kendi tercihi **sorulmamış** olur, persona endişesi tam karşılanmaz; "%uyum" artık saf uyum olmaktan çıkar, sayının anlamı bulanır ve kullanıcıya açıklanamaz · Süre **M** · Geri alınır **evet** · Migration **yok**
**Karşılaştırma:** Sorun bugün "mentör bunalıyor" mu, yoksa "yeni mentör talep alamıyor" mu — cevaba göre değişir. Birincisiyse B (tercih mentörde), ikincisiyse C (dağıtım düzelir, kimse kaybolmaz). A yalnız mentör sayısı mentiden fazlaysa güvenlidir.
**Benim önerim:** **C** — çünkü migration gerektirmiyor ve iki sorunun da acı tarafını azaltıyor; B sonradan üzerine eklenebilir. *(Bu senin ürün kararın; mentörlerin "beni koru" demesi senin için asıl mesele ise B doğrudur — önerime güvenme.)*
**Cevap vermezsen:** **P-15 satırı kilitli kalır** (bugün "kartsız gizli 🔴" durumunda); dağıtım dengesizliği sessizce sürer ve kimse şikâyet etmediği için fark edilmez.
**CEVAP:**

---

### KARAR-42 · DISC testi tekrar edilebilsin mi? (3 düğme bunu vaat ediyor, hiçbiri çalışmıyor)  [ÜRÜN KARARI · VERİ]
> ⭐ **Kaynak:** psikometri konseyi (`docs/raporlar/kesif/konsey-psikometri-2026-09-21.md`), 2026-09-21.
⚠️ **Kaç işi açar:** bugün kuyrukta **doğrudan karşılığı olan satır YOK** — cevap gelince PO'nun **yeni satır açması gerekir**; ayrıca **PS-10**'daki çıkışsız döngünün diğer ucunu kapatır ve **PS-03**'ün (Likert `discType`) kullanıcı faydasını görünür kılar.
**Şu an ne var:** Arayüzde üç ayrı düğme *"DISC Testini Güncelle"* / *"DISC Profilini Güncelle"* diyor (`mentor/page.tsx:163` · `menti/page.tsx:284` · `profile/page.tsx:225,234`). Üçü de `/disc-test`'e götürüyor. Ama soru havuzunun **tamamını** cevaplamış bir kullanıcı oraya girince **tek soru bile göremiyor**: sistem *"DISC Profiliniz Hazır!"* yazıp **2,5 saniye sonra panoya geri atıyor** (`questionService.ts:174` → `useDiscTest.ts:223,195-199` → `disc-test/page.tsx:53-56`). Cevapları sıfırlayan hiçbir yol yok (kapsam: BE `src/` tamamı, `userResponse.delete|reset.*test|retake` harf duyarsız → tek isabet `gdprService.ts:108`, o da hesap silme).
⚠️ **Sınır — abartma:** bu yalnız **havuzun tamamını** cevaplamış kullanıcıyı etkiler; onboarding'i bitirip Likert havuzuna hiç girmemiş kullanıcı testi normal görür. Etkilenen kitlenin büyüklüğü **TEYİT GEREK (canlı DB)**.
**Sorun ne:** Kullanıcıya bir söz veriliyor ve sessizce tutulmuyor. Kişi kendini değişmiş hissedip profilini güncellemek istiyor, düğmeye basıyor, hiçbir şey olmuyor. Üstelik "uygun mentor bulunamadı" ekranı da onu **aynı çalışmayan sayfaya** yönlendiriyor (`menti/page.tsx:276-287`) → **çıkışsız döngü**.
**Neden sana soruyorum:** Testin tekrar edilebilmesi teknik değil ürün/veri kararı. Tekrar test **eski cevapların üzerine yazar** (`@@unique([userId, questionId])` + `upsert`, `questionService.ts:198-208`) — geçmiş tutulmuyor (kapsam: `schema.prisma` tamamı, `ResponseHistory|ResponseVersion|Audit.*Response` → yok). "Kişinin eski profili silinsin mi, saklansın mı" verinin anlamını belirler.
**Seçenekler:**
**A) Düğmeleri dürüst yap** — tekrar testi açma, düğmeyi *"DISC profilimi gör"*e çevir · Kullanıcı ne görür: vaat edilmeyen şeyi beklemiyor · Ne kazanırsın: yalan biter, iş küçük · **Ne kaybedersin:** kişi profilini **hiç** güncelleyemez; zamanla profil bayatlar ve eşleştirme eskiyen veriyle çalışır; PS-03'ün (Likert `discType`) düzeltmesi kullanıcıya hiç yansımaz · Süre **S** · Geri alınır **evet** · Migration **yok**
**B) Tekrar testi aç, eski cevapların üzerine yaz** · Kullanıcı ne görür: testi baştan alabiliyor · Ne kazanırsın: vaat tutulur, profil tazelenir, çıkışsız döngü kapanır · **Ne kaybedersin:** **eski profil geri getirilemez**; "kişi zamanla nasıl değişti" sorusu sonsuza kadar cevapsız kalır; kötü niyetli kullanıcı skorunu deneme-yanılmayla optimize edebilir · Süre **M** · Geri alınır **hayır (veri kaybı)** · Migration **yok**
**C) Tekrar testi aç + eski cevabı sürümle** (geçmiş tablosu) · Kullanıcı ne görür: B ile aynı · Ne kazanırsın: profil değişimi izlenebilir, ileride "gelişim grafiği" mümkün · **Ne kaybedersin:** **yeni tablo = migration**; canlı DB'ye dokunuş ve yedek zorunluluğu; iş belirgin büyür; KVKK saklama süresi sorusu da açılır · Süre **L** · Geri alınır **kısmen** · Migration **VAR**
**Karşılaştırma:** Canlıda çok az kullanıcı varsa B'nin veri kaybı küçüktür ve vaadi hemen tutar. Ürün ileride "kendi gelişimini gör" iddiası taşıyacaksa C'yi **sonradan** eklemek geriye dönük veriyi kurtaramaz — o veri zaten kaybolmuş olur. A en ucuz ve en dürüst olan; ama profil tazeleme ihtiyacını tamamen erteler.
**Benim önerim:** **B** — çünkü vaat zaten verilmiş durumda ve tutulmaması kullanıcıya bugün zarar veriyor; sürümleme ayrı ve sonradan verilebilecek bir karardır. *(Bu senin ürün kararın; "geçmişi saklamak" sana önemli geliyorsa önerime güvenme, C doğrudur.)*
**Cevap vermezsen:** Üç düğme yalan söylemeye devam eder; "uygun mentor yok" ekranındaki çıkışsız döngü (PS-10) kapanmaz.
**CEVAP:**

---

### KARAR-43 · İki yön neden farklı? Menti, mentörün eleyeceği bir eşleşmeyi görmeye devam etmeli mi? (1 işi açar — cevap sonrası yeni satır)  [ÜRÜN KARARI]
> ⭐ **Kaynak:** psikometri konseyi (`docs/raporlar/kesif/konsey-psikometri-2026-09-21.md`), 2026-09-21.
**Şu an ne var:** Eşleştirme iki yönde **asimetrik** çalışıyor (`matching.ts:265-323` ↔ `:406-427`). Mentör→menti yönünde altı mekanizma var: kalite çarpanı (`:300`), toksik-çift vetosu D×S (`:283`), zaman uyumu filtresi (`:274-276`), beklenti kesişimi (`:278-281`), 4 kademeli fallback (`:200-227`), iletişim tarzı bonusu +10 (`:288-294`). **Menti→mentör yönünde bunların HİÇBİRİ yok.**
**Sorun ne:** Aynı çift, iki taraftan bakınca **farklı yüzde** görüyor. Mentörün *"bana uygun değil"* diye eleyeceği bir menti, kendi panelinde o mentörü yüksek uyumla görüp talep gönderiyor — ve reddediliyor. Menti için bu, sistemin ona **yanlış umut** vermesidir.
**Neden sana soruyorum:** "Menti neyi görebilmeli" doğrudan ürün kararıdır. Filtreleri menti yönüne de uygulamak menti havuzunu **daraltır** — az mentörlü kurumda menti ekranı boşalabilir.
**Seçenekler:**
**A) Bugünkü gibi kalsın (menti her şeyi görür)** · Kullanıcı ne görür: değişiklik yok · Ne kazanırsın: menti ekranı hiç boşalmaz, umut sinyali korunur; iş yok · **Ne kaybedersin:** yanlış umut ve boşa giden talepler sürer; "neden mentörde %74, bende %88 yazıyor?" sorusunun cevabı hiç olmaz; her ret bir hayal kırıklığı üretir (P-05'in yükünü artırır) · Süre **yok** · Geri alınır **— (değişiklik yok)** · Migration **yok**
**B) Filtreler iki yöne de uygulansın (simetrik)** · Kullanıcı ne görür: menti yalnız gerçekten uyumlu mentörleri görür · Ne kazanırsın: yüzdeler tutarlı, boşa talep azalır · **Ne kaybedersin:** **menti ekranı boşalabilir** — özellikle küçük kurumda; "hiç mentör yok" hissi menti personasının en büyük kayıp riski (`menti-persona-...:65,73`); boşalan ekranın sebebini de açıklayamayız (PS-10 ile çakışır) · Süre **M** · Geri alınır **evet** · Migration **yok**
**C) Simetrik filtre + menti yönünde fallback** (eleme uygulanır, liste boşalırsa mentör yönündeki 4 kademenin aynısı gevşetir) · Kullanıcı ne görür: uyumlu liste görür; liste boşalırsa "uyum düşük" rozetiyle yine bir şey görür · Ne kazanırsın: B'nin tutarlılığı + A'nın boşalmama güvencesi · **Ne kaybedersin:** en büyük iş; iki yönün kodu ortaklaştırılmalı (bugün ayrı yazılmış) ⇒ **canlı sıralama regresyon riski** ve bu riski yakalayacak test bugün yok (PS-07/PS-08 önce yapılmalı) · Süre **L** · Geri alınır **evet** · Migration **yok**
**Karşılaştırma:** Kurumlarda mentör sayısı mentiden azsa B tehlikelidir — menti boş ekran görür ve gider. C bu riski kapatır ama en pahalısıdır. A yalnız "yanlış umut"un maliyetini kabul ediyorsan doğrudur.
**Benim önerim:** **C** — çünkü fallback mekanizması zaten yazılı (`matching.ts:200-227`), diğer yöne taşınması sıfırdan tasarım değil. *(Bu senin ürün kararın.)*
**Cevap vermezsen:** Asimetri sürer; iki taraftaki yüzde tutarsızlığı açıklanamaz ve mentörün eleyeceği mentiler talep göndermeye devam eder.
**CEVAP:**

---

### KARAR-44 · Algoritma kendi sonuçlarından öğrensin mi — ve hangi memnuniyet verisi "gerçek" sayılsın? (2-3 işi açar)  [ÜRÜN + VERİ KARARI]
> ⭐ **Kaynak:** psikometri konseyi (`docs/raporlar/kesif/konsey-psikometri-2026-09-21.md`), 2026-09-21.
⚠️ **KÜMELEME UYARISI (PO'ya):** Bu kartın kapsamı **mevcut KARAR-12** (*"Görüşme geri bildirim kayıt sistemi ne olsun?"*, `01-KARARLAR.md:282`) ile **büyük ölçüde örtüşüyor** — KARAR-12 açıkça `feedbackLogRoutes.ts` + `FeedbackLog` modeli + **`rewardPenalty.ts` skorlama mantığını** kapsıyor. `CLAUDE.md` **"KÜMELE"** kuralı gereği PO iki seçenekten birini tercih etmeli: **(i)** bu kart açılmaz, metni **KARAR-12'ye `⚠️ EK` olarak** eklenir; **(ii)** ayrı kart açılır ve KARAR-12 *"bu kartla birlikte cevaplanır"* diye işaretlenir. **Ajan karar vermedi.**
**Şu an ne var:** Öğrenme döngüsü **yazılmış ama kapalı**; iki ayrı kopma:
 1. Görüşme sonrası check-in'lerden *"D mentör + S menti bu kurumda kötü gidiyor"* sinyali hesaplanıp `MatchCombinationScore` tablosuna **yazılıyor** (`rewardPenalty.ts:58-62`, 16 DISC kombinasyonu) — ama eşleştirme motoru bu tabloyu **hiç okumuyor** (kapsam K5: `rewardPenalty · getCombinationScores · matchCombinationScore · applyFeedbackSignal` × BE+FE → sıralama yolunda **0 okuma**). Kodun kendi yorumu gelecek zamanla yazılmış: *"…bonus/ceza **uygulayabilir**"* (`:66-68`).
 2. Haftalık otomatik ağırlık ayarı (Pazar 02:00 UTC, `cronScheduler.ts:71`) `FeedbackLog`'un NPS'ini okuyor (`algorithmTuner.ts:144-161`) — ama **hiçbir ekran o tabloya yazmıyor** (FE'de `POST /api/feedback-logs` → **0**). Gerçek memnuniyet **başka tabloya** gidiyor: `Feedback.periodicNpsScore` (`periodic-survey/page.tsx:54-58`, `schema.prisma:648`). İki alan arasında senkron yok ⇒ cron her hafta koşup *"yeterli veri yok"* deyip dönüyor (`algorithmTuner.ts:286,290-292`), yöneticinin **"Başarı oranı"** kartı da bu yüzden daima boş (`adminController.ts:91-96` → `admin/kpi/page.tsx:70` `—`).
**Sorun ne:** Ürün *"gerçek kullanıcı verisi biriktikçe kalibre edilecek"* diye **yazılı bir söz** veriyor (`eslesme-uyum-po-inceleme-2026-08-26.md:91`). Bugün o söz **yapısal olarak tutulamaz**: veri toplanıyor, bir yere yazılıyor, ama okuyan yok. Kurum *"eşleştirmeniz işe yarıyor mu"* diye sorduğunda sistem cevap veremiyor.
**Neden sana soruyorum:** İki ayrı ürün sorusu var, ikisi de teknik değil: (a) algoritma kendi kendine değişsin mi, yoksa her değişiklik insan onayından mı geçsin; (b) hangi memnuniyet ölçümü **resmî** sayılsın. (b) verinin anlamını belirler ve geri dönüşü zordur.
**Seçenekler:**
**A) Döngü kapalı kalsın; yalnız dürüstlük düzeltilsin** (KPI kartı yanıltıcı `—` yerine "veri yok" desin = PS-05) · Kullanıcı ne görür: yönetici kartın neden boş olduğunu okur · Ne kazanırsın: en ucuz; yanlış izlenim biter · **Ne kaybedersin:** algoritma **hiç öğrenmez**, ağırlıklar sonsuza kadar sezgisel kalır; toplanan check-in verisi çöpe gider; kalibrasyon sözü belgede kalırsa her denetimde yeniden bulunur (çıkarılması gerekir) · Süre **S** · Geri alınır **evet** · Migration **yok**
**B) Tek canonical NPS seç + otomatik ayarı çalışır hâle getir** (`Feedback.periodicNpsScore`'u tuner'a bağla) · Kullanıcı ne görür: yönetici gerçek başarı oranını görür; ağırlıklar veriye göre **önerilir** (uygulama yine admin onayıyla, `algorithmTuner.ts:373`) · Ne kazanırsın: verilen söz tutulur, ağırlık sezgiden çıkar, insan onayı korunur · **Ne kaybedersin:** iki alandan biri **terk edilir** → `FeedbackLog.npsScore` ölü alan olur ve SİLME PROTOKOLÜ gerektirir; eşiğe (≥10 yanıt) ulaşana kadar kart yine boş görünür; iki alanın geçmiş verisi **birleştirilemez** · Süre **M** · Geri alınır **evet** · Migration **yok** (mevcut alanlar kullanılır)
**C) B + kombinasyon skorunu da sıralamaya bağla** (tam öğrenme döngüsü) · Kullanıcı ne görür: eşleştirme zamanla o kuruma özel iyileşir · Ne kazanırsın: yatırılmış emeğin tamamı karşılığını verir; ürünün asıl iddiası gerçekleşir · **Ne kaybedersin:** **sıralama kendiliğinden değişmeye başlar** — aynı menti dün gördüğü mentörü bugün göremeyebilir ve sebebini kimse açıklayamaz; az veriyle erken öğrenme **yanlış** öğrenmedir (birkaç kötü check-in koca bir DISC kombinasyonunu cezalandırır); hata ayıklaması zor ve bugün bunu yakalayacak test yok (PS-07/PS-08 ön koşul) · Süre **L** · Geri alınır **kısmen** (bayrakla kapatılır, öğrenilmiş katsayılar kalır) · Migration **yok**
**Karşılaştırma:** Canlıda kullanıcı sayısı düşükken C tehlikelidir. B, sözü tutar ve insan onayını korur. A yalnız "şimdilik ölçmeyeceğiz" demeye hazırsan doğrudur — ama o zaman kalibrasyon sözünün belgeden **çıkarılması** gerekir.
**Benim önerim:** **B** — çünkü sözü tutuyor, insan onayını koruyor ve az veriyle yanlış öğrenme riskini almıyor. *(Bu senin ürün kararın.)*
**Cevap vermezsen:** Cron her hafta boşa koşar, KPI kartı sessizce boş kalır, toplanan check-in verisi hiçbir işe yaramaz; **KARAR-12 de fiilen cevapsız kalır.**
**CEVAP:**

---

### KARAR-45 · Arketip adları: hangi metin hangi koda bağlanacak? (4 işi açar) [ÜRÜN KARARI]
> ⭐ **Kaynak:** içerik konseyi (`docs/raporlar/kesif/konsey-icerik-2026-09-21.md`), 2026-09-21.
> ⚠️ **ÇAPRAZ:** **KARAR-10** (OCEAN motoru) ile karıştırma — o *motor açılsın mı*, bu *hangi ad hangi koda bağlansın*. Motor açılmasa bile ad↔kod kararı **IC-14 · I-01 · I-15**'i açar.

**Şu an ne var:** Kullanıcı bugün mizaç testini bitirince "Sen bir **Öncü**sün!" gibi bir kart görüyor
(4 ad: Öncü · Ateşleyici · Yapı Taşı · Kâşif). Kanıt: `onboardingController.ts:53-104`, ekran `ResultStep.tsx:39-43`.
Ayrıca yazılmış ama hiç gösterilmeyen **8 yeni arketip kartı** var (Mimar · Ayna · Liman · Pusula / Rotacı · Kâşif ·
Denge Arayan · İz Açan) — `arketip-ve-yaklasim-icerigi-2026-09-03.md:153-261`.

**Sorun ne:** Üç ayrı yerde "**Kâşif**" var ve üçü farklı kişiyi anlatıyor: canlıdaki DISC kartında bir mizaç tipi
(`onboardingController.ts:94`), eski karar belgesinde bir **mentör** tipi (`03-psikometri-ve-algoritma.md:14`),
yeni içerikte bir **menti** tipi (`arketip-...md:53`). Üstelik yeni 8 adın hiçbirinin, sistemin içindeki kod
değerine (M1…m4 gibi teknik etiketler) karşılığı **hiçbir belgede yazılı değil**. Buna karar verilmeden yeni
kartlar bağlanamaz; bağlanırsa kullanıcı aynı adı iki ekranda iki farklı anlamda görür. Ayrıca yeni adlardan
**"İz Açan" senin onayını almamış** (belge `:263` bunu kendisi not etmiş).

**Neden sana soruyorum:** Kullanıcının kendisi hakkında okuduğu **kimlik etiketi**. Teknik değil; hangi adın
kalacağı, hangisinin emekli olacağı ürün kararı ve geri dönmesi zor (kullanıcı ekran görüntüsü paylaşıyor —
`onboardingController.ts:68` `shareHeadline`).

**Seçenekler:**
**A) Yeni 8 ad kazanır, canlıdaki 4 DISC adı emekli olur** · Kullanıcı: yeni kartları görür, eski adlar kaybolur ·
Kazanç: tek sistem, çakışma biter · Kayıp: bugün test çözmüş kullanıcıların bildiği ad değişir; "Kâşif" anlam
değiştirir (mizaç tipi → menti arketipi) · Süre: M · Geri alınır: evet (metin) · Migration: yok
**B) İkisi yan yana yaşar — farklı şeyler oldukları açıkça yazılır** · Kullanıcı: hem mizaç kartını hem arketip
kartını görür · Kazanç: hiçbir içerik çöpe gitmez · Kayıp: iki kavramı ayırt etmek kullanıcıya iş yükü;
"Kâşif" çakışması **sürer** (ad değişmezse kafa karışıklığı kalıcı) · Süre: M · Geri alınır: evet · Migration: yok
**C) Yeni 8 ad kazanır ama çakışan adlar yeniden adlandırılır** ("Kâşif" ve onaysız "İz Açan" değişir) ·
Kullanıcı: çakışmasız tek sistem · Kazanç: hem çakışma hem onay sorunu biter · Kayıp: 2 ad yeniden yazılır,
8 kartın ilgili cümleleri elden geçer (belgeye göre "İz Açan" 6 yerde geçiyor) · Süre: M+ · Geri alınır: evet

**Karşılaştırma:** Eski 4 adın kullanıcı zihninde yer ettiğini düşünüyorsan B; tek ve temiz bir sistem istiyorsan
A; A'yı istiyorsun ama "Kâşif"in iki anlamı seni rahatsız ediyorsa C. A ve C arasındaki tek fark iki adın yeniden
yazılması.
**Benim önerim:** C — çakışma kalıcı kafa karışıklığı üretir ve "İz Açan" zaten onayını bekliyor; ikisini tek
turda kapatmak ucuz.
**Cevap vermezsen:** I-01 (yaklaşım metinleri), I-15 (arketip kartı), C-?? (ham `M1` kodları) ve madde 139'un
menti varyantları **bağlanamaz** — dördü de bu eşlemeye bağlı.
**CEVAP:**

---

### KARAR-46 · Sertifika içeriğinin hangi sürümü canlıya gidecek? (P-99'u açar) [ÜRÜN KARARI · SEED]
> ⭐ **Kaynak:** içerik konseyi (`docs/raporlar/kesif/konsey-icerik-2026-09-21.md`), 2026-09-21.
> ⚠️ **ÇAPRAZ:** **KARAR-3** (kriz senaryosunun hukuki metni) ile aynı seed'i bekliyor ama farklı soru — o *tek cümlenin hukuku*, bu *hangi sürüm*. İkisi de cevaplanmadan **P-99 → K-16** zinciri açılmaz. ⚠️ Kapsam: yeni sürüm 88 şıkın TAMAMINI taşır ve seed'deki 20 senaryonun 15'ini eler (bkz. `00-KUYRUK` P-99 sayı düzeltmesi).

**Şu an ne var:** Aynı sertifika sahnesi **üç farklı metinle** üç yerde duruyor: 2026-09-03 tarihli faz6 belgesi ·
2026-09-08 tarihli oturum belgeleri · **kodda bambaşka bir üçüncü sahne** (`seed-certification.ts:216-217`).
Hangisinin canlıya gideceği hiçbir belgede yazmıyor; faz6 hâlâ "dondurulmuş" etiketli.

**Sorun ne:** Kuyruk (P-99) işi "22 senaryoyu seed'e taşı" diye tarif ediyor; gerçekte **22'nin 17'sinin seed'de
karşılığı yok, seed'deki 20'nin 15'i belgelerde gerekçeli elenmiş** ve ortak olan 5 senaryonun **5'i de yeniden
yazılmış** — birinde puanlamanın anlamı ters dönmüş. Ayrıca taşımadan önce üç teknik soru cevapsız: konu
kodlarının değişmesi kurumların "kapattığım konu" kaydını öksüz bırakır, geçme eşiği 10 konuda 8 iken 11 konuda
**9'a çıkar** (sertifika zorlaşır), ve belgelerdeki 17 "iç not" konu düzeyinde yazılmış ama alan **şık**
düzeyinde (`schema.prisma:1158`).

**Neden sana soruyorum:** Hangi içeriğin mentörlere sınav olarak çıkacağı ve sertifikanın **zorlaşması** ürün
kararı; ayrıca canlı veriye yazma (seed) senin iki değişmez kuralından biri.

**Seçenekler:**
**A) 2026-09-08 serisi kazanır — tam taşıma** · Kullanıcı: 11 konu / 22 senaryo ile sınava girer, sertifika
zorlaşır (8→9 konu) · Kazanç: en olgun içerik canlıya çıkar, elenen 15 sahnenin gerekçesi zaten yazılı ·
Kayıp: 88 şıkkın tamamı yeniden yazılacak (efor L), konu kodları değişince eski kayıtlar öksüz kalır ·
Süre: L · Geri alınır: evet (yedek + pasifleştirme) · Migration: yok (iç not şık düzeyinde kalırsa)
**B) Önce yalnız 4 kritik (red-line) konu taşınır, gerisi sonra** · Kullanıcı: kriz/sınır/gizlilik/geri bildirim
konularında yeni metni görür, kalan 7 konu eski metinde kalır · Kazanç: en riskli içerik önce düzelir, efor M ·
Kayıp: bir süre **karışık sürüm** yayında olur (bazı konular yeni, bazıları eski); geçme eşiği iki kez değişir ·
Süre: M · Geri alınır: evet · Migration: yok
**C) Hiç taşıma — bugünkü 20/80 kalır** · Kullanıcı: bugünkü sınavı görmeye devam eder · Kazanç: sıfır risk,
sıfır iş · Kayıp: üç haftadır yazılı duran içerik rafta kalır; **puanlama anlamı ters olan senaryo canlıda
kalmaya devam eder** · Süre: — · Geri alınır: —

**Karşılaştırma:** Sertifikanın zorlaşmasını şimdi göze alabiliyorsan A tek turda biter. Kriz içeriğinin doğru
olması acilse ama toplu değişimi istemiyorsan B; ama karışık sürüm yönetmek gerekir. C'nin tek savunması zaman.
**Benim önerim:** A — ama **KARAR-3 ve KARAR-4 cevaplanmadan başlanamaz** (kriz senaryolarının 8 şıkkı onlara
bağlı) ve iş ikiye bölünmeli: "içerik taşıma PR'ı" ve "seed çalıştırma turu".
**Cevap vermezsen:** P-99 ve K-16 açık kalır; sertifika ekranı bugünkü hâliyle kalır.
**CEVAP:**

---

### KARAR-47 · Hukuki metin paketi — avukata tek seferde ne sorulacak? (5 kalem) [HUKUKİ · PO+AVUKAT]
> ⭐ **Kaynak:** içerik konseyi (`docs/raporlar/kesif/konsey-icerik-2026-09-21.md`), 2026-09-21.
> ⚠️ **ÇAPRAZ:** **KARAR-38** (sunucu ülkesi/aydınlatma metni) · **KARAR-3/KARAR-4** (sertifika kriz metni) · **F-02** (mesaj saklama süresi) · **F-03**/**GV-18** (rıza sürümü) hepsi aynı avukat paketine bağlı — **tek görüşmede** sorulmalı.

**Şu an ne var:** Ürünün üç hukuki sayfası (KVKK aydınlatma · gizlilik · kullanım koşulları) **kendi içinde
"bu metin taslaktır" diyor** (`kvkk/page.tsx:109` · `gizlilik/page.tsx:85` · `terms/page.tsx:73`), ama kayıt
ekranı kullanıcıya bu metinler için **zorunlu açık rıza** aldırıyor (`_RegisterContent.tsx:398-418`).

**Sorun ne:** Beş ayrı yerde, kodun gerçekten yaptığından **daha fazlasını vaat eden** ya da eksik kalan metin var:
① davet kartı *"Bilgileriniz KVKK uyumlu … ve güvendedir"* (`InvitationCard.tsx:142`) ve footer *"KVKK uyumlu"*
damgası (`page.tsx:65`) — metinler taslakken koşulsuz uyum beyanı · ② geri bildirim ekranı *"kimliğin
paylaşılmaz"* diyor (`MeetingFeedbackCard.tsx:173`) ama yönetici geri bildirimleri **ad-soyadla** listeliyor
(`feedbackLogController.ts:134-135`) · ③ "Sertifikalı Mentör" rozeti hiçbir yerde "bu mesleki bir yeterlilik
değildir" demiyor (kapsam: `frontend/src/app/**`, 6 terim TR+EN → **0 çekince**) · ④ landing *"Sonsuza kadar
ücretsiz"* diyor (`HeroSection.tsx:34,51`), koşullarda karşılığı yok · ⑤ 18 yaş beyanı ayrı kutu değil, KVKK
rızasının metnine gömülü (`_RegisterContent.tsx:162`) ve **yaş verisi hiç saklanmıyor** → beyanın ispatı yok
(`consentService.ts:59`).

**Neden sana soruyorum:** Hepsi hukuki sonucu olan metin. Ben avukat değilim; aşağıdaki hiçbir şey hukuki görüş
değildir ve **metin önerisi yazılmadı**.

**Seçenekler:**
**A) Beşini tek pakette avukata sor, cevap gelene kadar dokunma** · Kullanıcı: bugünkü metinleri görmeye devam
eder · Kazanç: tek seferde doğru metin, dağınık düzeltme olmaz · Kayıp: süresiz bekleme; "güvendedir" ve
"kimliğin paylaşılmaz" gibi **kodla çelişen** cümleler yayında kalır · Süre: ? · Geri alınır: —
**B) Kodla ÇELİŞENLERİ hemen düzelt (② ve ①), geri kalanı avukata bırak** · Kullanıcı: doğru kapsamı okur ·
Kazanç: yanlış beyan bugün kalkar, hukuki yorum gerektirenler beklemede kalır · Kayıp: iki kez metin turu olur ·
Süre: S + bekleme · Geri alınır: evet
**C) Beşini de şimdi yumuşat, avukat gelince rafine et** · Kullanıcı: daha temkinli metinler görür ·
Kazanç: risk bugün düşer · Kayıp: pazarlama gücü azalır ("sonsuza kadar ücretsiz" ve "KVKK uyumlu" satış
cümleleri); avukat gelince üçüncü kez yazılır · Süre: M · Geri alınır: evet

**Karşılaştırma:** ② ve ① kodun yaptığıyla doğrudan çelişiyor — bunlar hukuki yorum değil **olgu düzeltmesi**,
avukat beklemeye gerek yok. ③④⑤ gerçekten hukuki yorum istiyor. B bu ayrımı yapan tek seçenek.
**Benim önerim:** B — ama bu senin ürün/hukuk kararın, önerime güvenme.
**Cevap vermezsen:** 13 hukuki bulgunun hiçbiri hareket etmez; ②'deki çelişki (kimlik paylaşılmaz ↔ yönetici
ad-soyad görüyor) yayında kalır.
**CEVAP:**

---

### KARAR-48 · Test sonucu ve eşleşme skoru kullanıcıya nasıl anlatılsın? (3 ekran) [ÜRÜN KARARI]
> ⭐ **Kaynak:** içerik konseyi (`docs/raporlar/kesif/konsey-icerik-2026-09-21.md`), 2026-09-21.

**Şu an ne var:** Mizaç testi bitince ekran *"Sen bir Öncüsün!"* diyor, konfeti atıyor, *"En İyi Eş: S + C"*
yazıyor ve *"…en uygun … kişiyle **eşleştirileceksin**"* diye söz veriyor (`ResultStep.tsx:39-43,71,98-100`).
Eşleşme kartında *"%87 uyum"* gibi bir sayı var (`menti/page.tsx:311`), gerekçe üretilemezse yerine
*"Genel profil uyumu"* basılıyor (`matchingController.ts:15`).

**Sorun ne:** Ürünün kendi metodoloji sayfası *"kesin bir başarı garantisi değil"*, *"DISC kişilik tanısı
değildir"* diyor — ama kullanıcının **gerçekten okuduğu** ekranlar (sonuç kartı, eşleşme kartı) bu temkinli dili
taşımıyor: kimlik etiketi ("Sen bir X'sin"), üstünlük ("En İyi Eş"), kesin vaat ("eşleştirileceksin") ve
açıklamasız bir yüzde. Üstelik sonuç kartında **paylaş düğmesi** var, yani bu dil ürünün dışına taşınıyor.
Ayrıca havuz boşsa aynı kullanıcı birkaç ekran sonra *"uygun mentor bulunamadı"* görüyor — vaat tutulmuyor.

**Neden sana soruyorum:** Kullanıcının kendisi hakkında ne öğrendiği ve üründen ne beklediği; ölçü değil **vaat**
meselesi. Teknik değil.

**Seçenekler:**
**A) Koşullu dile geç** ("şu an şu eğilimi gösteriyorsun", "genelde iyi anlaşılan", "eşleştirmeye çalışacağız",
yüzde yerine bant) · Kullanıcı: daha dürüst, daha az kesin bir kart görür · Kazanç: metodoloji sayfasıyla tutarlı
olur, vaat tutulmadığında hayal kırıklığı azalır · Kayıp: "aha anı" zayıflar, paylaşılabilirlik düşer ·
Süre: S · Migration: yok
**B) Bugünkü dil kalsın, yanına küçük bir çekince satırı eklensin** · Kullanıcı: aynı heyecanı yaşar, altında bir
açıklama görür · Kazanç: etki korunur, dürüstlük eklenir · Kayıp: çekinceyi kimse okumaz; çelişki görünür kalır ·
Süre: S · Migration: yok
**C) Hiçbir şey değişmesin** · Kullanıcı: bugünkü kartı görür · Kazanç: sıfır iş, en güçlü ilk izlenim ·
Kayıp: ürün iki dille konuşur (metodoloji temkinli, kart iddialı); yüzde açıklanmadığı için "neden bu mentör"
sorusu cevapsız kalır · Süre: — · Geri alınır: —

**Karşılaştırma:** İlk izlenimin çarpıcılığı büyüme için kritikse B; ürünün tek sesle konuşması senin için
önemliyse A. C yalnızca bu çelişkiyi bilinçli kabul ediyorsan savunulabilir.
**Benim önerim:** A — yüzde ve "eşleştirileceksin" ürünün **tutamadığı** iki vaat; kalan kısım zaten güçlü.
**Cevap vermezsen:** C1-1…C1-6 (6 metin) olduğu gibi kalır; eşleşme kartındaki boş gerekçe de sürer.
**CEVAP:**

---

### KARAR-49 · `devir/01` ve `devir/06`: "dondurulmuş" mu, "kalıcı referans" mı?  [BELGE POLİTİKASI] (2 işi açar)
> ⭐ **Kaynak:** yönetişim konseyi (`docs/raporlar/kesif/konsey-yonetisim-2026-09-21.md`), 2026-09-21.

**Şu an ne var:** İki devir belgesi künyesinde **tek cümle içinde** hem 📸 DONDURULMUŞ hem *"kalıcı referans"* yazıyor (`devir/01-felsefe-ve-calisma-tarzi.md:3` · `devir/06-devir-kilavuzu.md:3`). Üstelik `01`'in başlığı **"yeni sohbet önce bunu oku"**. İçlerinde bugün geçersiz olan **6 "PR aç, merge etme" satırı** var (`01`'de 2 · `06`'da 2 · `03`'te 1 · `04`'te 1). Kanıt: `docs/00-BELGE-HARITASI.md:61`. İkinci kat çelişki: `00-BELGE-HARITASI.md:38` bu iki dosyayı **🔄** etiketliyor, dosyalar kendini **📸** diyor.

**Sorun ne:** Yeni bir oturum "önce bunu oku" diyen belgeyi açıp **artık geçerli olmayan merge kuralını** öğreniyor. Doğrusu kapıya bağlı (🟢 merge et · 🟡 PR'da bekle · 🔴 dokunma). Sonuç: ajan 🟢 işleri merge etmiyor, otonom kuyruk tıkanıyor. BB turu 9 yeri düzeltti, bu 6'sına "dondurulmuş belgeye dokunulmaz" gerekçesiyle dokunmadı — **iki turdur açık**.

**Neden sana soruyorum:** Dondurulmuş belgeye dokunmak "tarihsel iz" ilkesini deler; dokunmamak yanlış kuralı yürürlükte bırakır. İkisi de belge politikası kararı, teknik değil.

**Seçenekler:**
· **A — Künyeden "kalıcı referans" ibaresini kaldır, yönlendirme ekle.** Kullanıcı ne görür: `01`/`06` açınca *"bu 2026-08-11 fotoğrafıdır; güncel kural `CLAUDE.md § MERGE POLİTİKASI`"*. Ne kazanırsın: tarihsel iz **tam korunur**, yanlış kural etkisizleşir. **Ne kaybedersin:** belge hâlâ "önce bunu oku" diyor — yeni gelen yine oradan başlar, 6 bayat satırı yine okur. Süre **S** · geri alınır ✅ · migration yok.
· **B — 6 bayat satırı `~~[ESKİ]~~` + ⚠️ GÜNCELLEME ile damgala** (BB'nin diğer 9'da yaptığının aynısı). Kullanıcı ne görür: satırı görür ama üstü çizilidir, altında doğrusu yazar. Ne kazanırsın: **tutarlılık** — aynı kural her yerde aynı biçimde düzeltilmiş olur. **Ne kaybedersin:** dondurulmuş belge düzenlenmiş olur (ilke esner, emsal doğar); 4 dosyaya dokunulur; ileride "hangi 📸 belgeye dokunulabilir" sorusu belirsizleşir. Süre **S** · geri alınır ✅ · migration yok.
· **C — `devir/01-06` setini arşive taşı, yerine tek "yeni gelen" sayfası.** Kullanıcı ne görür: tek güncel başlangıç sayfası. Ne kazanırsın: kök sorun biter, "önce bunu oku" tek ve doğru yere işaret eder. **Ne kaybedersin: en pahalısı** — 6 belge taşınır, onlara giden atıflar kırılır, devir hikâyesi dağılır; SİLME PROTOKOLÜ'nün 5 adımı işletilmeli. Süre **M** · geri alınır ⚠️ (git mv + atıflar elle) · migration yok.

**Karşılaştırma:** A en ucuz ve ilkeye en sadık olanı ama "önce bunu oku" tuzağını bırakıyor. B tutarlılığı sağlıyor ve BB'nin zaten kurduğu deseni tamamlıyor; ilkeden sapması küçük çünkü damga **silme değil ekleme**. C sorunu kökten çözüyor ama bu turun kapasitesinin üstünde ve atıf ağını riske atıyor.

**Benim önerim:** **B** — çünkü BB zaten 9 yeri bu desenle düzeltti; 6'sını dışarıda bırakmak kuralın kendisini yarım uygulamak oluyor, ve damga hiçbir tarihsel izi silmiyor.

**Cevap vermezsen:** Belge işleri ilerler ama **yeni her oturum yanlış merge kuralını okumaya devam eder**; otonom kuyruk 🟢 işlerde tıkanmayı sürdürür.

**CEVAP:**

---

### KARAR-50 · Kuralların "geçersizleşme koşulu" zorunlu olsun mu?  [BELGE/METODOLOJİ] (4 işi açar)
> ⭐ **Kaynak:** yönetişim konseyi (`docs/raporlar/kesif/konsey-yonetisim-2026-09-21.md`), 2026-09-21.

**Şu an ne var:** 74 kuraldan **6'sının** (%8,1) geçersizleşme koşulu yazılı; **68'inin yok**. 6'sının hiçbiri ölçülebilir tetik taşımıyor (*"X olunca"* diyor, X'i kimin ne zaman kontrol edeceği yazılı değil) — bu yüzden **hiçbiri kendiliğinden tetiklenmemiş**. Sonuç: koşulu fiilen sağlanmış 4 kural hâlâ yürürlükte görünüyor, biri **yanlış kanıta dayanan bir güvenlik kuralı** (`CLAUDE.md:442`, 24 gündür yanlış).
⚠️ Brief *"KURAL 17 var ama yarım uygulanmış"* diyordu — **öyle bir kural hiç yazılmadı** (13 terim · BB + 11 dal · 0 dosya; bu turda `docs/` + `CLAUDE.md` yeniden tarandı → yalnız raporun kendi 4 "yok" beyanı çıktı).

**Sorun ne:** Kurallar yalnız **birikiyor**, hiç düşmüyor. Her ders yeni kural oluyor, hiçbiri emekliye ayrılmıyor. CLAUDE.md bugün bölmeyle 34.742'ye indi ama **payı yalnız 258 karakter** — bir sonraki ders sınırı yeniden aşar.

**Neden sana soruyorum:** Bu konseyin özel kuralı *"CLAUDE.md'yi BÜYÜTECEK hiçbir öneri kabul edilmez"* diyor. Böyle bir kural eklemek CLAUDE.md'yi büyütür. **Ben bu yüzden önermiyorum ve kuralı YAZMADIM** — ama sorunun kendisi gerçek ve kararı senin.

**Seçenekler:**
· **A — Kural EKLEME. Bunun yerine 4 bayat kuralı tek seferde düzelt** (YN-04, YN-05 + 2 takip kalemi). Kullanıcı/ajan ne görür: yanlış kanıta dayanan güvenlik kuralı düzelir. Ne kazanırsın: CLAUDE.md **büyümez**, bugünkü zarar biter, 258 karakterlik pay korunur. **Ne kaybedersin: mekanizma kurulmaz** — 3 ay sonra aynı yerde olursunuz, bayat kurallar yeniden birikir. Süre **S** · geri alınır ✅ · migration yok.
· **B — Kural ekle ama yer aç: YN-14 birleştirmeleriyle BİRLİKTE uygula.** Ne kazanırsın: mekanizma kurulur **ve** dosya yine de küçülür (birleştirme ≈4.494 kazandırıyor, kural ~400 maliyet). **Ne kaybedersin:** kural sayısı artar, her yeni kural yazımı zahmetlenir; ve konseyin "büyütme" yasağını ancak bir paketle birlikte delmiş olursun — emsal doğar. Süre **M** · geri alınır ✅ · migration yok.
· **C — Kural yerine ALIŞKANLIK: KURAL 12'nin 3. ayağını (tazelik denetimi) script'e bağla.** Ne kazanırsın: **sıfır karakter maliyeti** — denetim otomatikleşir, CLAUDE.md hiç büyümez. **Ne kaybedersin:** script yazılana kadar hiçbir şey değişmez; `CLAUDE.md` bunu *"ileride script ile"* diyeli beri **hiç yapılmadı** (`scripts/` altında tazelik script'i yok, yalnız `kvkk-docx-gen.py` + `verify.sh`) — aynı akıbet olabilir. Süre **M** · geri alınır ✅ · migration yok.

**Karşılaştırma:** A bugünü kurtarır, yarını kurtarmaz. B kalıcı çözüm ama kural sayısını artırır ve yasakla ancak paket hâlinde bağdaşır. C en zarif olanı (maliyet sıfır) ama aynı söz bir kez verilip tutulmadı; script gerçekten yazılacaksa en iyisi, yazılmayacaksa en kötüsü.

**Benim önerim:** **A şimdi, C sonra** — B'yi önermiyorum çünkü konseyin yasağını ancak bir paketle birlikte deler; A'nın kazancı kesin ve bugün alınabilir, C ayrı bir iş olarak kuyruğa girebilir.

**Cevap vermezsen:** 4 bayat kural yürürlükte kalır — en ciddisi `CLAUDE.md:442`'deki **yanlış kanıtlı güvenlik kuralı**; ve kural birikmesi aynı hızla sürer, 258 karakterlik pay kısa sürede tükenir.

**CEVAP:**

---

### KARAR-51 · 4 "yaşayan ama ölü" belge dondurulsun mu?  [BELGE POLİTİKASI] (2 işi açar)
> ⭐ **Kaynak:** yönetişim konseyi (`docs/raporlar/kesif/konsey-yonetisim-2026-09-21.md`), 2026-09-21.

**Şu an ne var:** 26 aktif 🔄 YAŞAYAN belgeden **2'si kesin ölü**, **2'si ölü adayı**. İkisi kendi içinde *"işi X devraldı"* yazıyor ama künyesi hâlâ 🔄 diyor: `kararlar/konu/08-acik-sorular.md:5` (→ `00-KARAR-TAKIP.md`) · `raporlar/icerik/kod-kalemleri-2026-09-03.md:8` (→ `00-KUYRUK.md` AŞAMA I). Adaylar: `kararlar/10-yol-tamamlananlar.md` · `raporlar/bilanco/kararlar/G9-belge-surec.md`.

**Sorun ne:** 🔄 damgası "buraya bak, güncel" demek. Okuyan ölü belgeyi güncel sanıp yanlış yere yazıyor ya da bayat bilgiyi doğru sanıyor.

**Neden sana soruyorum:** Bir belgeyi dondurmak *"bu artık canonical değil"* demektir — KURAL 7 gereği canonical kararı PO'nundur. Ayrıca `10-yol-tamamlananlar` için **atıf zinciri** var: `10-yol-haritasi.md:7` hâlâ oraya yönlendiriyor.

**Seçenekler:**
· **A — Yalnız 2 kesin ölüyü dondur.** Kullanıcı ne görür: bu ikisi *"📸 dondurulmuş, güncel için X"* diyor. Ne kazanırsın: kanıtı kendi içinde olan iki vaka kapanır, risk sıfır, hazır metinler mevcut. **Ne kaybedersin:** 2 ölü aday belirsiz kalır; `00-BELGE-HARITASI`'nın 🔄 sayımı yine tam doğru olmaz. Süre **S** · geri alınır ✅ · migration yok.
· **B — Dördünü birden dondur.** Ne kazanırsın: 🔄 kümesi tamamen dürüst olur, sayım bir kerede düzelir. **Ne kaybedersin:** `10-yol-tamamlananlar` dondurulursa `10-yol-haritasi.md:7`'deki yönlendirme **kırık atıf** olur — önce o düzeltilmeli; `G9` için KURAL 12 eşiği henüz dolmadı (**2026-10-02**), erken dondurmak kendi kuralını delmek olur. Süre **M** · geri alınır ✅ · migration yok.
· **C — Hiçbirini dondurma, yalnız "son güncelleme" tarihi ekle.** Ne kazanırsın: hiçbir canonical değişmez, sıfır risk. **Ne kaybedersin: asıl sorun çözülmez** — okuyan yine 🔄 görüp güncel sanar; tarih eklemek "bu belge ölü" demez. Süre **S** · geri alınır ✅ · migration yok.

**Karşılaştırma:** A risksiz ve kanıtı belgelerin kendisinde. B daha eksiksiz ama iki ön koşul istiyor (atıf düzeltme + eşik bekleme). C sorunu görünür kılar ama çözmez.

**Benim önerim:** **A** — iki kesin vaka bugün kapansın; `10-yol-tamamlananlar` ancak `10-yol-haritasi.md:7` düzeltildikten sonra, `G9` ise 2026-10-02'de kendi kuralıyla dondurulsun.

**Cevap vermezsen:** 4 belge 🔄 görünmeye devam eder; `00-BELGE-HARITASI`'nın 🔄 sayımı da yanlış kalır.

**CEVAP:**

---

### KARAR-52 · Taşınan KURAL 8 mükerreri: hangi gövde kalsın?  [BELGE/METODOLOJİ] — ⭐ BU TURDA DOĞDU
> ⭐ **Kaynak:** yönetişim konseyi (`docs/raporlar/kesif/konsey-yonetisim-2026-09-21.md`), 2026-09-21.
> ⚠️ **BU TURDA DOĞDU:** mükerrer, bu PR'daki CLAUDE.md bölmesiyle iki dosyadan tek dosyaya taşındı (YN-02).

**Şu an ne var:** Bölme sonrası `belge-duzeni-rehberi.md`'de **KURAL 8 iki kez** var: `:99-109` (rehberin kendi gövdesi, 2026-08-23) ve `:143-152` (CLAUDE.md'den 2026-09-21'de taşınan kopya). Rapor `:337` (B.4-1) bu taşımanın mükerreri **çözeceğini** söylüyordu; fiilen mükerrer **iki dosyadan tek dosyaya taşındı**, ortadan kalkmadı.

**Sorun ne:** Rehberin kendi KURAL 1'i *"tek gerçek kaynağı"* diyor — şimdi kendi dosyasının içinde iki gerçek kaynağı var. Okuyan hangisine uyacağını bilemez; ikisi birebir aynı da değil (rehber hâli 1.300 karakter, taşınan hâli 974).

**Neden sana soruyorum:** Bir kural gövdesini elemek `CLAUDE.md § SİLME PROTOKOLÜ`'ne ve rapor `:333`'teki *"hiçbir kural gövdesi silinmiyor"* taahhüdüne dokunuyor. Hangi gövdenin canonical olduğu belge politikası kararıdır.

**Seçenekler:**
· **A — Rehberin kendi gövdesi (`:99-109`) kalsın; taşınan kopya `## GEÇMİŞ`e insin.** Kullanıcı/ajan ne görür: tek KURAL 8, en uzun ve en eski gövde. Ne kazanırsın: canonical zinciri bozulmaz, hiçbir satır silinmez. **Ne kaybedersin:** CLAUDE.md'nin son hâli (974 karakter) daha güncel olabilir — bu turda içerik farkı **karşılaştırılmadı** (❓ TEYİT GEREK); yanlış gövdeyi seçme riski var. Süre **S** · geri alınır ✅.
· **B — İki gövdeyi BİRLEŞTİR, farkları tek metinde topla.** Ne kazanırsın: hiçbir bilgi kaybı yok, tek gerçek kaynağı gerçekten tek olur. **Ne kaybedersin:** elle karşılaştırma gerektirir (iki gövde satır satır okunmalı); birleştirme sırasında sessiz bir kayıp riski — bu yüzden ⛔ `kalan + taşınan = önceki` denetimi zorunlu olur. Süre **M** · geri alınır ✅.
· **C — İkisi de kalsın, taşınan kopyaya *"bkz. yukarıdaki KURAL 8"* notu düşülsün.** Ne kazanırsın: sıfır risk, sıfır karar. **Ne kaybedersin:** dosya **8.103 karakterlik** taşımanın üstüne ~974 karakter gereksiz taşımaya devam eder; ve "mükerrer bırakma" bu projede üç kez sorun doğurdu. Süre **S** · geri alınır ✅.

**Karşılaştırma:** A hızlı ama hangi gövdenin daha güncel olduğu doğrulanmadan seçim yapıyor. B tek doğru çözüm ama emek istiyor ve denetim şart. C hiçbir şeyi çözmez, yalnız görünür kılar.

**Benim önerim:** **B** — iki gövde de kural metni, ikisi de kısa; birleştirme yarım saatlik iş ve `CLAUDE.md § SİLME PROTOKOLÜ`'ne hiç girmiyor (silme değil birleştirme). A'yı ancak gövdeler birebir aynı çıkarsa öneririm.

**Cevap vermezsen:** YN-02 kuyrukta bekler; `belge-duzeni-rehberi.md` kendi KURAL 1'ini ihlal etmeye devam eder ve "kuralları oku" diyen ajan aynı kuralı iki farklı uzunlukta okur.

**CEVAP:**
