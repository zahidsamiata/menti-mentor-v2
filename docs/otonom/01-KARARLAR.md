# 01-KARARLAR — Ürün Karar Kuyruğu (v2)

**Nasıl cevaplarsın:** Her kartın en altındaki `**CEVAP:**` satırına harf yaz. Örnek: `**CEVAP:** A`
İstersen yanına not ekle: `**CEVAP:** A — ama metni ben yazacağım`
Cevapsız bıraktığın karar, ilgili işi kilitler. Kilitlediği iş her kartta yazıyor.

**Ajan bu dosyaya yalnız SORU ekler, cevap yazmaz.** Yeni sorular dosyanın sonuna, numara devam ederek.
**Teknik kararlar burada YOKTUR** — onları ajan kendi verir (kütüphane, dosya yapısı, isimlendirme,
renk paleti, hata mesajı metni, hangi mükerrer ucun kalacağı, çeviri).

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
**CEVAP:**

---
## Ajanın ekleyeceği yeni kararlar buradan itibaren (KARAR-12, 13, …)
Ajan: §4 şablonuna birebir uy. "Ne kaybedersin" satırını boş bırakma.
