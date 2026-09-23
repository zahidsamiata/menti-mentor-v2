📸 ARŞİV — 2026-09-23. Buradaki kayıtlar TAMAMLANMIŞ/CEVAPLANMIŞ'tır.
Aktif iş ve cevapsız kararlar ana dosyadadır (`docs/otonom/01-KARARLAR.md`). Buraya YENİ kayıt EKLENMEZ.

# 01-KARARLAR — CEVAPLANMIŞ KARARLAR ARŞİVİ (2026-09)

Kaynak: `docs/otonom/01-KARARLAR.md`'den 2026-09-23'te taşınan, CEVAP satırı DOLU kartlar. Kart metni AYNEN korundu; indeks satırları ana dosyada kaldı.

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
**CEVAP:** **ÖZEL (PO, 2026-09-21, strateji katmanı karar oturumu):** onay → ✅ e-posta gönderilir · düzeltme → ✅ e-posta gönderilir · **ret → ❌ e-posta YOK.** Reddedilen kurum yalnız uygulama içi durumu görür (U-04). **Gerekçe (PO):** *"ret maili kırıcı olabilir."*
⚠️ **Düzeltme e-postası da kuruma giden bir metindir:** ajan metni HAZIRLAR, ancak bildirim AÇILMADAN ÖNCE PO'nun onayına sunulur → `03-PO-ELLE-ISLER.md`'ye onay işi olarak eklendi.
⚠️ E-posta gönderimi **SMTP'ye** (çıkış kılavuzu B4) ve **`TENANT_NOTIFICATIONS_ENABLED`'a** (B5) bağlıdır.

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
**CEVAP:** **B (PO, 2026-09-21, strateji katmanı karar oturumu):** Hata ayrıntısı (tam iz kaydı) platform paneline **KİŞİSEL VERİ TEMİZLENMİŞ** olarak açılır. **PO gerekçesi:** *"amaç sorunu doğru çözebilmek."*
⚠️ **KAPSAM DIŞI:** platform yöneticisinin KURUM VERİSİNE erişimindeki **erişim kaydı (denetim izi) KALDIRILMAZ.** Erişim engellenmiyor, yalnız kaydediliyor. *"Tüm sistemi kayıtsız gezme"* ayrı bir HUKUKİ karardır → avukat paketi (bkz. `03-PO-ELLE-ISLER.md` madde 6).

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
**CEVAP:** **A (PO, 2026-09-21, strateji katmanı karar oturumu):** Sentry (ya da eşdeğeri) kurulur, **KİŞİSEL VERİ TEMİZLEME ayarıyla.**
⚠️ **PO şartı:** Sentry'nin kullanımı, kullanıcıların onayladığı KVKK belgelerinde (**aydınlatma metni + yurtdışı aktarım envanteri**) YER ALMALI.
**Doğan işler:** AJAN → entegrasyon + veri temizleme (kuyruğa yeni satır) · PO → hesap açma + anahtarı Dokploy'a girme (`03-PO-ELLE-ISLER.md`) · AVUKAT → aydınlatma metnine yurtdışı aktarım maddesi (avukat paketi).

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
**CEVAP:** ~~A  *(PO, 2026-09-21, strateji katmanı karar oturumu)*~~
⚠️ **REVİZYON (PO, 2026-09-23, strateji katmanı karar oturumu):** Mentör havuzdan **ÇIKARILMAZ.** Listede kalır ama **SOLUK / şeffaf** görünür; meşgul olduğu bir bakışta anlaşılır. O hâldeyken **YALNIZ MESAJ** alır, **randevu talebi ALMAZ** (KARAR-53 ③ ile aynı davranış). **Gerekçe:** menti mentörün VAR olduğunu görsün, yalnız şu an müsait olmadığını anlasın — tamamen gizlemek (eski A'nın "kapat" etkisi) mentörü yok sayardı. `mentorVisibilityEnabled` alanı **BAĞLANIR** (silinmez): `true`=normal, `false`=soluk/mesaj-only hâli (KARAR-53 ③).

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
**CEVAP:** **B + PO detayları (PO, 2026-09-21, strateji katmanı karar oturumu):**
· **Üyelik DONDURULUR, geçmiş kalır.** Yönetici çıkarırken **SEBEP seçer** (kötüye kullanım / diğer); kişiye giden mesajın **TONU sebebe göre değişir.**
· **YÖNETİCİ çıkardıysa:** 30 gün içinde geri ALINMAZSA kişinin **KARAKTER ANALİZİ** (DISC, arketip, psikometrik profil) **SİLİNİR.**
· **KİŞİ KENDİSİ çıktı ise:** 30 gün (KVKK silme talebine cevap üst sınırı; kısaltılabilir). ⚠️ Mevcut hesap silme akışıyla (`/me/delete-account`) UYUMLU hale getir; **KVKK silme hakkını ZAYIFLATMA.**
· **Mentörün görüşme SAYISI DÜŞMEZ** — emeği korunur.
· **Mentörün görüştüğü kişiler listesinde eski üyenin ADI görünür ama SOLUK / yarı saydam,** "sistemde değil" olduğu anlaşılır. ⚠️ Adın kalması **AVUKAT onayına** bağlı (veri minimizasyonu). Onaylanmazsa **"Eski üye"** yazılır, sayı ve tarih kalır.
· Bu kural **güvenlik konseyi ③'ü** (`Match.mentorArchetype` silinmiyor) de çözer: psikometrik veri silinir, toplam sayılar korunur.

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
⚠️ **PO SORUSU (2026-09-21):** Günümüzde mentorluk çoğu zaman resmi kurumda değil, topluluklarda (meslek toplulukları, mezun ağları vb.) oluyor — platform bunlara göre esnek olmalı mı? Bu kartla birlikte ele alınacak. Üç boyut:
 (1) **KAYIT:** topluluklar çoğunlukla genel e-postayla gelir → her biri PO'nun elle onay kuyruğuna düşer; başka doğrulama yolu gerekir.
 (2) ⭐ **KVKK ROLÜ:** tüzel kişiliği olmayan toplulukta veri sorumlusu büyük olasılıkla **PLATFORMUN KENDİSİ** olur — KVKK yükü artar. AVUKAT PAKETİNE.
 (3) **SATIŞ:** topluluk sözleşme imzalamayabilir — fiyatlama/sorumluluk farklı.
 Kodda: kulüp modülü backend'i yazılı (7 uç, 2 tablo), ekranı yok (KARAR-9 ertelendi).
**CEVAP:** **ÖZEL MODEL (PO, 2026-09-23, strateji katmanı karar oturumu).**

**SORU 1 · TOPLULUK LİDERİ MODELİ:** Lider bir **TALEP** oluşturur → PO **yalnız LİDERİ** onaylar (üyeler PO onayına **DÜŞMEZ**) → lider kendi ekosistemini açar, üyelerini **KENDİSİ davet eder** (topluluk = yöneticisi bir kişi olan kurum, mevcut kurum akışıyla aynı iskelet).
  **KVKK:** VERİ SORUMLUSU = **topluluk lideri**, platform = **VERİ İŞLEYEN.** *(⚠️ Bu, KARAR-34 kartındaki PO SORUSU (2) ile ilişkili ama ayrışıyor: lider tüzel/gerçek kişi olarak sorumluluğu üstlenirse platform işleyen kalır; lider yoksa/üstlenmezse veri sorumlusu platform olur — bu ikinci hâl AVUKAT PAKETİNE, bkz. Bölüm 6.4.)*
  **KAYIT EKRANI** — PO kuralı *"alternatifi olmayanı seçenek gibi sunma"*:
    **ZORUNLU** (her biri AYRI işaretlenir; biri eksikse GİRİŞ YOK):
      · DISC ile eşleştirme · verinin yurt dışında saklanması (bilgilendirme + kabul) · veri işleme koşulları · anonim verilerin eşleştirmeyi iyileştirmede kullanılması
    **İSTEĞE BAĞLI** (hayır demek girişi ENGELLEMEZ):
      · diğer kurum/topluluklarla anonim toplu veri paylaşımı · derin psikometri (OCEAN)
  **AYNI EKRAN KURUM YÖNETİCİLERİ için de uygulanır** (tek akış).
  ⛔ **AVUKAT ONAYINA BAĞLI** — metin avukat onayı olmadan yayınlanmaz.

**SORU 2 → B:** İzin verilirse **yalnız ANONİM TOPLU** veri paylaşılır; k-anonimlik altyapısı **hazır** (`backend/src/services/mask.ts` · `applyKAnonymity`). Kurumlar-arası **açık/kişi-düzeyi** görünürlük YOK.

⚠️ Not: kartın gövdesindeki eski öneri (B) bu özel modelle **detaylandırıldı**; çelişki yok — "kulüp ancak üniversite onayıyla" yerine **"topluluk ancak lider onayıyla"** genelleştirildi (üniversite kulübü bu modelin özel hâli).

---

### KARAR-53 · Menti, mentörün müsait olmadığı saati önerebilir mi? (booking ↔ müsaitlik çelişkisi)  [ÜRÜN KARARI]
**Şu an ne var:** Menti randevu isterken bir tarih/saat seçiyor. İki ekran birbiriyle çelişiyor:
- Mentörün **hiç müsaitlik bloğu yoksa**, ekran *"Aşağıdan yine de bir zaman önerip talep gönderebilirsiniz; mentör uygunluğa göre yanıtlayacaktır"* diyor (`book-meeting/page.tsx:117-127`, U-10 kararı) — AMA backend her talebi **409 ile reddediyor** çünkü `fitsAvailability` blok yokken daima `false` (`meetingController.ts:465-483`). ⇒ Müsaitlik girmemiş mentöre **HİÇBİR randevu talebi ulaşamıyor** (ana akış kırık).
- Mentörün **blokları varsa** ama menti blok DIŞI saat seçerse, ekran mavi bilgiyle *"Yine de talep gönderebilirsiniz"* diyor (`:131-133`) — backend yine **409 reddediyor**.

Yani FE "gönder" diyor, backend "olmaz" diyor. Kanıt: 409 mesajı Türkçe ve anlaşılır (`meetingController.ts:483`), sorun mesaj değil **davranış çelişkisi**.

**Sorun ne:** Menti mentöre randevu öneremiyor ya da önerdiğini sanıp reddediliyor. Özellikle müsaitlik girmemiş mentör hiç talep alamıyor.

**Neden sana soruyorum:** "Menti mentörün beyan ettiği saatlerin DIŞINA çıkabilir mi" bir ürün/politika kararı — mentörün zamanını korumak (katı) ile esnek talep (mentör karar verir) arasında seçim. Geri dönüşü kolay değil çünkü iki ekranın ve backend'in davranışını hizalıyor.

**Seçenekler:**
· **A — KATI: menti yalnız mentörün müsait bloğundan seçebilir.** FE blok dışı saati SEÇTİRMEZ (buton kapalı), blok yoksa "bu mentör şu an randevu almıyor" der. Backend 409 güvenlik ağı kalır. Kullanıcı ne görür: sadece geçerli saatler. Ne kazanırsın: mentör zamanı korunur, çelişki biter. **Ne kaybedersin:** müsaitlik girmemiş mentör hiç randevu ALAMAZ (mentörlerin çoğu blok girmemişse akış tıkanır); U-10'un "yine de öner" vaadi SİLİNİR. Süre **M** · geri alınır ✅ · migration yok.
· **B — ESNEK: menti her saati önerebilir, mentör onaylar/reddeder.** Backend `fitsAvailability` HARD-REJECT'i kaldırılır (blok dışı = uyarı, red değil); talep PENDING gider, mentör karar verir. Kullanıcı ne görür: istediği saati önerir, "mentör onayına gönderildi". Ne kazanırsın: U-10 vaadi gerçekleşir, müsaitlik girmemiş mentör de talep alır. **Ne kaybedersin:** mentör alakasız saat talepleriyle dolabilir; müsaitlik bloğu "öneri" seviyesine iner. Süre **M** · geri alınır ✅ · migration yok · ⚠️ auth/matching değil ama randevu akışı → 🟡.
· **C — HİBRİT: blok VARSA katı (yalnız blok içi), blok YOKSA esnek (her saat önerilebilir).** Kullanıcı ne görür: müsaitlik girmiş mentörde sadece geçerli saatler; girmemişte serbest öneri. Ne kazanırsın: ikisinin iyi yanı; hiçbir mentör "randevu alamaz" durumuna düşmez. **Ne kaybedersin:** iki ayrı davranış = daha karmaşık FE + backend; menti neden bazen serbest bazen kısıtlı olduğunu anlamayabilir. Süre **L** · geri alınır ✅ · migration yok.

**Karşılaştırma:** A mentör zamanını en çok korur ama müsaitlik-girmemiş mentörü tamamen kapatır (bugün mentörlerin durumu bilinmiyor → riskli). B en az sürtünme ve U-10 ile tutarlı ama mentör gelen kutusu kirlenebilir. C kullanıcı deneyimini en iyi dengeler ama en pahalısı ve iki-kafalı.

**Benim önerim:** **B** — çünkü U-10 zaten "mentör karar verir" yönünde sevk edilmiş; backend'i ona hizalamak çelişkiyi kökten bitirir ve hiçbir mentörü randevuya kapatmaz. (Bu senin ürün kararın; katı zaman koruması istiyorsan A/C.)

**Cevap vermezsen:** K-05 (çıkış blokeri) yapılamaz; müsaitlik girmemiş mentörler sessizce hiç randevu talebi alamamaya devam eder (ana akış kırık, kimse fark etmez = T3).

**CEVAP:** **ÖZEL TASARIM — A/B/C'nin hiçbiri değil (PO, 2026-09-23, strateji katmanı karar oturumu).**
Mentörün **DÖRT HÂLİ** var; her hâlde menti farklı şey yapar:

**① MÜSAİTLİK BLOĞU GİRMİŞ → KATI.** Menti **takvimden yalnız seçili saatlerden** randevu alır; blok dışı saat **SEÇİLEMEZ**.
  ⭐ **TAKVİM GÖRÜNÜMÜ:** menti mentörün müsait saatlerini takvimde **SEÇİLİ ALANLAR** olarak görür (bugünkü boş tarih-saat kutusu yerine hangi saatlerin açık olduğu GÖRÜNÜR). Backend `fitsAvailability` hard-reject **KALIR** (güvenlik ağı).

**② BLOK YOK ama KOŞUL GİRMİŞ → ESNEK.** Mentör en azından bir **ZAMAN ARALIĞI** (ör. "hafta içi akşamları") + **GÖRÜŞME TÜRÜ** (online / yüz yüze) yazar; menti kendi zamanını **bu koşullara göre önerir**, TALEP OLUŞUR. Backend `fitsAvailability` bu hâlde koşula göre çalışır (blok yoksa daima-red DEĞİL).

**③ MEŞGUL ("tatil modu") → listede SOLUK/şeffaf görünür; YALNIZ MESAJ; randevu YOK.** (KARAR-32 revizyonuyla aynı davranış.) Backend `fitsAvailability` hard-reject KALIR.

**④ NE BLOK NE KOŞUL → yalnız mesaj + sistem mentörü DÜRTER.** Belli süre sonra hatırlatma, daha sonra **kurum yöneticisine** bildirim.
  ⏱️ **Makul varsayılan süreler (ajan belirledi, PO değiştirebilir):** menti talebinden **3 gün** sonra mentöre 1. hatırlatma → **7 gün** sonra 2. hatırlatma → **10 gün** sonra kurum yöneticisine eskalasyon bildirimi. **Gerekçe:** 3 gün = bir iş-günü tamponu bırakır ama mentiyi süresiz bekletmez; 7 gün = bir hafta hiç dönüş yoksa ısrar; 10 gün = iki iş-haftasına yakın sessizlik yöneticinin devreye girmesi için makul eşik. (Bu sayılar müsaitlik-hatırlatma işinin Not'una da yazılacak — bkz. Bölüm 5.)

**ZAMAN ÖNERİSİ MESAJI:** normal mesaj kanalından gider ama **YAPILANDIRILMIŞ** — menti NEDEN görüşmek istediğini anlatır + bir ZAMAN talep eder; mentör bunu sıradan mesajdan ayırt edebilir (② ve ④'te kullanılır).

⚠️ **KARAR-1** (mentör slot açar; format + süre slota) ile **AYNI VERİ AİLESİ** → **TEK migration'da birleşir, ayrı migration AÇMA.** Mentör koşul alanları (zaman aralığı + görüşme türü) da bu birleşik migration'a girer.

---

### KARAR-66 · "Akıllı eşleştirme" iddiası — ölçelim mi, geri mi çekelim?  (2 işi açar)  [ÜRÜN KARARI]
**Şu an ne var:** Belge "eşleşme kalitesi = bizim farkımız" diyor (`yonetici:86`); kod ise: `Match` tablosu boş, `predictedScore` yazılmıyor/okunmuyor, DISC ağırlıkları sezgisel. Kanıt: `persona-panel-gelisimi-2026-09-23.md:248` (C2).
**Sorun ne:** PO'nun kurula/sponsora tek satış argümanı, kendi sistemi tarafından bile ispatlanamıyor. Bu ölçülebilir bir iddia — tondan (KARAR-48 sevdirme dili) farklı, gerçek bir kanıt boşluğu.
**Neden sana soruyorum:** "Neyi vaat ediyoruz + nasıl kanıtlayacağız" ürün/pazarlama kararı.
**Seçenekler:**
· **A — `Match`'i yaz + kaliteyi ölç** (`createMatchIfEligible` çağrılsın, predicted↔gerçek karşılaştırması). Ne kazanırsın: gerçek kanıt. **Ne kaybedersin:** matching koduna dokunma (🔴), efor L; migration olası. Süre L · geri alınır ✅ · migration olası
· **B — İddiayı geri çek** — "kalite metriği" yerine "eşleştirme yardımcısı" konumlandır. Ne kazanırsın: dürüst, hızlı. **Ne kaybedersin:** satış argümanı zayıflar. Süre S · geri alınır ✅ · migration yok
· **C — Bekle** — ilk gerçek görüşmeler birikene kadar iddiayı ne öne çıkar ne çek. Ne kazanırsın: erteleme, iş yok. **Ne kaybedersin:** belirsizlik sürer. Süre — · geri alınır ✅ · migration yok
**Karşılaştırma:** A gerçek çözüm ama en pahalı ve matching-riskli; B dürüst ama pazarlamayı küçültür; C erteleme.
**Benim önerim:** A (uzun vade) ama ilk kurum canlıya girmeden B dili kullanılsın. *(Ürün kararın.)*
**Cevap vermezsen:** Y-A4, U-A1, R3/R4/R6 riski açık kalır.
**CEVAP:** **B (PO, 2026-09-23, strateji katmanı karar oturumu).** İddia geri çekilir. "Akıllı eşleştirme / kalite garantisi" yerine "eşleştirme yardımcısı" — PO düzeltmesiyle daha doğrusu **"YÖNLENDİRME".** **Gerekçe:** sistem eşleştirmiyor, ÖNERİYOR; üstelik kaliteyi ölçen mekanizma yok (`Match` tablosu boş, `predictedScore` yazılmıyor/okunmuyor). Ölçüm kurulunca (Bölüm E.1 — kalite görünümü) iddia KANITLA BİRLİKTE geri konabilir.

---

### KARAR-69 · "ÇIKIŞ" tanımı ne?  (0 doğrudan iş — ama TÜM çıkış-blokeri etiketlerini geçerli/geçersiz kılar)  [ÜRÜN KARARI · METODOLOJİ]
**Şu an ne var:** Analiz turu (`00-ANALIZ-TURU-OZETI-2026-09-23.md`) her bulguda "bu çıkış blokeri mi?" diye sordu ve bulguları buna göre önceliklendirdi; ama "çıkış" (canlıya çıkış / lansman) hiçbir yerde tanımlı değil. Tanım olmadan "çıkış blokeri" etiketi öznel.
**Sorun ne:** Tüm önceliklendirme "çıkış blokeri mi?" sorusuna dayanıyor; ama herkes "çıkış"tan farklı şey anlıyorsa blokeri listesi güvenilir değil. Bir bulgu "MVP için blokeri değil ama ilk kurum için blokeri" olabilir — hangisi geçerli, tanıma bağlı.
**Neden sana soruyorum:** "Ürünün hazır sayılacağı an" tanımı bir ürün/metodoloji kararı; teknik değil ve tüm kuyruk önceliğini belirler.
**Seçenekler:**
· **A — ÇIKIŞ = çalışan MVP** (temel akış uçtan uca çalışıyor, gerçek kullanıcı yok). Ne kazanırsın: en erken çıkış, hızlı öğrenme. **Ne kaybedersin:** KVKK/kriz/kalite boşlukları çıkıştan sonra keşfedilir; itibar riski. Süre — (tanım) · geri alınır ✅ · migration yok
· **B — ÇIKIŞ = ilk gerçek kurum canlıda** (bir STK gerçek mentileriyle kullanıyor). Ne kazanırsın: gerçek doğrulama, gerçek geri bildirim. **Ne kaybedersin:** kurum bulma + hazırlık gecikmesi; blokeri listesi genişler. Süre — · geri alınır ✅ · migration yok
· **C — ÇIKIŞ = KVKK/yasal zorunluluklar tamam** (aydınlatma, silme, kriz kanalı, avukat onayı). Ne kazanırsın: hukuki güvenli zemin. **Ne kaybedersin:** en geç çıkış; ürün özellikleri beklerken hukuk işi öne geçer. Süre — · geri alınır ✅ · migration yok
· **D — ÇIKIŞ = ilk 10 gerçek canlı görüşme tamamlandı.** Ne kazanırsın: "işe yarıyor" kanıtı somut. **Ne kaybedersin:** en geç ve en dar tanım; buraya varmak için önce A/B'nin de geçilmesi gerekir. Süre — · geri alınır ✅ · migration yok
**Karşılaştırma:** Bunlar aslında aşamalar (A→B→C birbirini kapsar) ama "blokeri" etiketi hangi aşamaya bakacağımızı bilmek ister. Erken öğrenme öncelikse A; gerçek doğrulama öncelikse B; hukuki güvenlik ilk sırada ise C tabanı zorunlu; kanıt öncelikse D.
**Benim önerim:** B'yi çıkış tanımı, C'yi çıkış ÖN KOŞULU say — çünkü ürün ancak gerçek bir kurumda anlam kazanır ama KVKK/kriz boşlukları (KARAR-67, KARAR-31 EK) hiçbir çıkışta ertelenemez. Bu tanımla "çıkış blokeri" = "ilk kurum + KVKK tabanı için gereken".
**Cevap vermezsen:** analiz turunun ve kuyruğun tüm "çıkış blokeri" öncelik etiketleri öznel kalır; hangi işin gerçekten acil olduğu belirsizleşir.
**CEVAP:** **A + B (PO, 2026-09-23, strateji katmanı karar oturumu).** ÇIKIŞ = sistem uçtan uca çalışır VE ilk gerçek dernek mentileriyle kullanır. **PO gerekçesi:** *"Hukuk çok önemli değil; sistem büyüdükçe önemli olan şeyler. İlk aşamalarda ürünü test edeceğiz, kalitesini görmemiz lazım. Belki yaptığımız çalışma çöp olacak. Ürün bitti, herkes memnun, çok kurum geldi — o zaman sistemin ayakları yere bassın diye hukuk önemli."* ⚠️ **STRATEJİ KATMANI NOTU (PO'nun bilgisi dahilinde) — "hukuk" tek kutu DEĞİL:** **(a) ÖLÇEĞE BAĞLI:** VERBİS · kurumsal sözleşmeler · envanter mükemmelliği · her metnin avukat onayı → **ERTELENİR** (PO kararı bu yönde). **(b) İLK KULLANICIYLA devreye giren:** aydınlatma · açık rıza · silme hakkı · yurtdışı saklama bilgilendirmesi → kullanıcı SAYISINA bakmaz; çoğu ZATEN yazılı, yalnız avukat onayı bekliyor → ek iş değil, **BEKLEYEN ONAY.** **(c) KRİZ KANALI** → hukuk değil GÜVENLİK; ayrı karar olarak PO'ya yeniden sorulacak, bu kararla KAPANMAZ. **UYGULAMA:** kuyruktaki TÜM "⛔ ÇIKIŞ BLOKERİ" etiketleri bu tanıma göre yeniden değerlendirilir; (a) grubu "ilk kurum" kutusuna kayar, (b) grubu blokeri KALIR.

---

### KARAR-70 · Gerçek kullanıcı görüşmesi: ne zaman, kaç kişi, hangi roller?  (1 işi açar — görüşme kılavuzu)  [ÜRÜN KARARI · SÜREÇ]
> ⚠️ Not: 2026-09-09'da yapılan test, PO'nun KENDİ hesaplarıyla yaptığı bir gezinti (dogfooding) testiydi — GERÇEK kullanıcı görüşmesi DEĞİL. Tek somut çıktısı mentör panelindeki İngilizce DISC etiketiydi (`persona-panel-gelisimi-2026-09-23.md:318`). Gerçek kullanıcı testi HÂLÂ yapılmadı.
**Şu an ne var:** 7 persona/panel/strateji belgesinin 7'si de "gerçek mentilerle doğrulanmalı" şartını koşmuş; 7 haftadır yapılmadı. Bugün ⬜ (test edilmemiş) durumdaki 10 davranışsal varsayım YALNIZCA gerçek kullanıcı görüşmesiyle sınanabilir (`persona-panel-gelisimi-2026-09-23.md:334,337`).
**Sorun ne:** Ürünün en büyük belirsizliği "menti gerçekten kırılgan mı, mentör gerçekten seçici mi" gibi davranışsal varsayımlar; bunlar koda karşı test edilemez, yalnız gerçek insanla sınanır. Görüşme yapılmadan persona-v2 (KARAR-68 B yolu) üretilemez ve tasarım zemini tahmin olarak kalır.
**Neden sana soruyorum:** Görüşmenin ölçeği (kaç kişi), zamanlaması (çıkıştan önce mi sonra mı) ve kapsamı (hangi roller) bir süreç + ürün kararı; kılavuzu ajan hazırlayacak (kuyruk işi) ama ölçek/zamanlama PO kararı.
**Seçenekler:**
· **A — Küçük ve erken: 3-5 kişi (menti + mentör + yönetici karışık), çıkıştan ÖNCE.** Ne kazanırsın: en büyük belirsizlik erken çözülür; persona-v2 için girdi gelir. **Ne kaybedersin:** az kişi = zayıf sinyal; ürün henüz ham olduğu için bazı sorular sorulamaz. Süre S · geri alınır ✅ · migration yok
· **B — Rol başına derin: her rolden 3'er kişi (9-12 görüşme), yapılandırılmış kılavuzla.** Ne kazanırsın: her rolün varsayımları ayrı ayrı sınanır, güçlü sinyal. **Ne kaybedersin:** organizasyon yükü büyük; katılımcı bulmak gecikir. Süre M · geri alınır ✅ · migration yok
· **C — İlk kurum canlıya girdikten sonra, gerçek kullanımdan: ilk 10 görüşmenin taraflarıyla.** Ne kazanırsın: gerçek davranış verisiyle beslenir, en gerçekçi. **Ne kaybedersin:** en geç; çıkış öncesi belirsizlik çözülmez; kurum canlıya girene kadar beklenir. Süre L · geri alınır ✅ · migration yok
**Karşılaştırma:** Belirsizliği çıkıştan önce azaltmak öncelikse A (hızlı) ya da B (derin ama yavaş); gerçek kullanım verisini beklemeye razıysan C. A ve B ürünün ham hâlini test eder, C canlı hâlini.
**Benim önerim:** A — belgelerin kendi şartı (3-5 görüşme) bu; küçük ve erken bir tur, persona-v2'yi (KARAR-68) tetikler ve 10 ⬜ varsayımdan en kritiklerini erken sınar. Kılavuzu ajan hazırlar, görüşmeyi PO yürütür (`03-PO-ELLE-ISLER.md`).
**Cevap vermezsen:** persona-panel raporunun tüm ⬜ varsayımları (10 adet) test edilmeden kalır; KARAR-68 B yolu (persona-v2) tetiklenemez.
**CEVAP:** **C, sonra B (PO, 2026-09-23, strateji katmanı karar oturumu).** Önce C (ilk dernek canlıya girince, gerçek kullanımdan), sonra B (rol başına derin). ⭐ **PO EKİ:** Sorular SİSTEMİN İÇİNE gömülsün — köşede, ZORUNLU DEĞİL, isteyen cevaplar; veri otomatik biriksin. PO tek tek insan aramaz, her iş PO'ya gelmez. ⚠️ **STRATEJİ KATMANI NOTU:** otomatik sorular KALANLARI anlatır, GİDENLERİ anlatmaz — vazgeçen kullanıcı anket doldurmaz. Oysa en kritik varsayım "menti ilk olumsuz deneyimde sessizce kaybolur". Telafi: ilk dernek geldiğinde YALNIZ 2-3 kişiyle, özellikle BIRAKMIŞ olanlarla yarım saatlik görüşme — C'nin içine yazılır. ⚠️ 2026-09-09 testi PO'nun kendi hesaplarıyla yaptığı gezinti testiydi — GERÇEK kullanıcı görüşmesi DEĞİL.

---
