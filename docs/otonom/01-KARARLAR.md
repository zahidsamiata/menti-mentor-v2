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
| KARAR-11 | Kullanılmayan/mükerrer kod ne olsun | **2** (K-13, E-5) | ⬜ boş · ⚠️ ağustos "keşif olmadan silme YOK" → karantina yönü |
| KARAR-22 | Mentör reddederken ne olsun (ret deneyimi) | 1 (P-05) | ⬜ boş · ⚠️ KARAR-20 ile aynı tema (kümelenmeli); ret KODDA VAR, deneyimi eksik |
| KARAR-1 | Randevu format/süre kim belirler | 1 (K-15) | ⬜ boş |
| KARAR-2 | Profile serbest bağlantı alanı | 1 (K-17) | ⬜ boş |
| KARAR-3 | Sertifika "bildirim yükümlülüğü" hukuki metni | 1 (K-16) | ⬜ boş |
| KARAR-4 | Kriz destek kaynağı metni | 1 (K-16) | ⬜ boş |
| KARAR-5 | Öğrenme yolculuğu seed canlıya | 1 (K-18) | ⬜ boş |
| KARAR-6 | Menti tüm mentörleri görsün mü | 1 (K-19 içerik) | ⬜ boş |
| KARAR-7 | Online toplantı linkini kim girer | 1 (K-19 içerik) | ⬜ boş |
| KARAR-10 | OCEAN/SJT psikometri motoru | 1 (F-11) | ⬜ boş · ⚠️ ağustos G2-07/08/G10-21 "canlı eşleştirmeye bağla" → bağlama yönü |
| KARAR-19 | KVKK geri-dönülmez yetkiler kümesi | 1 (F-07) | ⬜ boş · ⚠️ ağustos G1-15/16/29 ✅ işleme-al |
| KARAR-20 | Mentör menti talebini reddedebilsin mi | 1 (F-17) | ⬜ boş · ⚠️ ağustos G4-25 ✅ ama varsayım hatalı · **KARAR-22 ile kümelenmeli** |
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
| KARAR-29 | Öğrenme yolculuğu diğer şık açıklamaları gösterilsin mi | 1 (K-06) | ⬜ boş · pedagoji · cevap-anahtarı sızması |
| KARAR-0 | Merge politikası | — | ✅ CEVAPLANDI |
| KARAR-18 | PO-manuel işler listesi (onay değil) | — | — (hatırlatma) |
| **KARAR-35** | **Canlı DB'ye salt-okuma izni** | **5+** (md.30·33·118, S10, Y6) | ⬜ boş · ⭐ BB turu · en çok iş açan yeni kart |
| **KARAR-36** | **Yarım 3 teknik kalem** (`answeredFollowup` · ikiz alan · 2 yedek tablo) | **4** (Y-18, D3, S26, S37) | ⬜ boş · ⭐ BB turu · ⚠️ `migrate dev` yedek tabloyu silebilir |
| **KARAR-34** | **Kulüp tipi kurum + kurumlar arası görünürlük** | **3** (md.91·115·116) | ⬜ boş · ⭐ BB turu · avukat notu var |
| **KARAR-30** | **Senaryo isimleri: seed'den önce mi sonra mı** | **2** (I-09, K-16/K-18 sırası) | ⬜ boş · ⭐ BB turu · ⚠️ yanlış sıra = içerik iki kez canlıya yazılır |
| **KARAR-31** | **Kriz bildirimi (kendine zarar) + yaş sınırı** | **2** (I-18, G1-01) | ⬜ boş · ⭐ BB turu · ⛔ AVUKAT ön koşulu, öneri YOK |
| **KARAR-32** | **Mentör kendini havuzdan çekebilsin mi** | **2** (Y-15, `mentorVisibilityEnabled`) | ⬜ boş · ⭐ BB turu · backend hazır, ekran yok |
| **KARAR-33** | **Kurumdan üye çıkarma + red tipi** | **2** (Y-14/md.36, md.35) | ⬜ boş · ⭐ BB turu · backend hazır, düğme yok |
| **KARAR-37** | **madde 103 — kart mı özet mi kazanır** | 1 (md.103) | ⬜ boş · ⭐ BB turu · G1-23 vakasının tekrarı riski |

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
**CEVAP:**

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
**CEVAP:**

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
**CEVAP:**

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
**CEVAP:**

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
**CEVAP:**

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
**CEVAP:**

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
**CEVAP:**

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
**CEVAP:**

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
**CEVAP:**

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
