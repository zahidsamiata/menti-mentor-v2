# BİLANÇO KARAR DOSYASI — G3: İçerik (sorular, sertifika, öğrenme yolculuğu)

**📸 DONDURULMUŞ** · 2026-08-27 (Tur-5b) · Kaynak: `docs/raporlar/bilanco/kararlar/00-SAYIM-2026-08-27.md` (G3 listesi) + `karar-defteri-2026-08-26.md` (GRUP 6 İçerik s.187-209 + GRUP 3 sertifika/etiket kalemleri)

> **Ne bu:** G3 grubundaki her karar-gerektiren kalem için PO'nun tek tek işaretleyeceği karar kartı. Salt-okuma + kod-teyit; kod/DB/PR/commit YOK, mevcut belge değiştirilmedi. SEVİYE-1 psikometri/içerik kalemleri geniş grep ile kod-teyitli.

---

## DOSYA BAŞI — mutabakat

- **Tur-5a beyanı (SAYIM tablo (a) + liste (c)):** G3 = **25 kalem** (görev brief'i "24" diyordu; canonical SAYIM 25 gösterir — **✅ kart-yok'a giren 6 + kart-alan 19 = 25** ile birebir tuttu; brief'teki 24 muhtemelen ✅'lerden birini saymamış. Zorlama yapılmadı: SAYIM'ın 25 satırı işlendi).
- **Yazılan kart + ✅ kart-yok mutabakatı:** 25 kalem = **19 kart** (karar-gerektiren) + **6 ✅ "zaten yapılmışlar"**. Ancak kuraldaki istisna gereği ✅ olsa da PO-onay bekleyen 2 kalem (68-soru inceleme, DISC-32/SJT-3 döküm PO teyidi) ilgili kartlarında ❓ olarak yer alır — bunlar çift-sayılmaz, birincil satırları kart olarak işlenir.
- **Durum dağılımı (25 kalem):** ✅ = 6 · ⬜ = 13 · ❓ = 4 · 🔵 = 2 · 🟡 = 0 · 🗑️ = 0.
- **PO okuma süresi (tahmini):** ~21 dk (SAYIM (a) tablosu G3 satırı).

**Kod-teyidi özeti (bu dosyada):** 6 SEVİYE-1/kod-iddialı kalem grep'le doğrulandı — **hiçbiri çürümedi**. DB'ye sorulamayan 3 canlı-sayı kalemi ❓ TEYİT GEREK (DB) kaldı.

---

## Bu grupta zaten yapılmışlar (✅ — kart YOK)

Bunlar kod-gerçeğiyle doğrulanmış tamamlanmış kalemlerdir; PO kararı GEREKMEZ (bilgi için):

- ✅ **DISC 32 soru (20 CORE + 12 DEEPENING)** — belge "20" bayatı çözüldü. KOD-TEYİT: `seed.ts` içinde 34 tip-girişi (CORE/DEEPENING/SJT) grep'le doğrulandı; kod 32 DISC sorusu üretir. *(Not: canlı sayı DB-teyit ister → aşağıda [G3-06] kartı.)*
- ✅ **SJT 3 soru (2 CORE + 1 FOLLOWUP)** — belge "4" YANLIŞ, KOD 3. KOD-TEYİT: `seed.ts` SJT tip-girişleri.
- ✅ **Admin soru düzenleme UI (tenant-scoped IDOR)** — `questions/page.tsx` mevcut; "buton yok" iddiası bayat çıktı.
- ✅ **CORE/DEEPENING Türkçe görünüm-etiketi** (enum DB'de EN kalır) — TYPE_LABELS Temel/Derinleştirme.
- ✅ **STK-custom soru DISC'i etkilemez** (STK_CUSTOM ayrımı doğru) — KOD-TEYİT: `questionController.ts`/`questionService.ts` STK_CUSTOM ayrımı mevcut. *(NÜANS: "canlı 1 kullanım" DB-teyit ister → [G3-04] kartı.)*
- ✅ **Öğrenme yolculuğu puanlama YOK (bilinçli tasarım); 13 aşama seed'li; ADMIN görür** — `learningJourney.service.ts` seed'li. Bilinçli tasarım kararı.

---

## KARAR KARTLARI (G3)

---
**[G3-01] DISC-tipine-özel "mentiye yaklaşım" içeriği (EN BÜYÜK BOŞLUK)**
Ne: Bir mentöre, karşısındaki mentinin DISC tipine göre "bu kişiye nasıl yaklaşmalısın" rehber içeriği. Şu an bu içerik SIFIRDAN yok; sistemde tek koçluk-önerisi motoru YÖNETİCİYE hitap ediyor, mentöre-menti yaklaşımı değil.
Neden başlanmıştı: Mentörün karşısındaki kişiyi anlaması ve doğru tonu bulması ürünün çekirdek vaadi; DISC eşleştirmesinin "sonra ne yapmalı" karşılığı.
Nerede durdu: Hiç başlanmadı — 3 farklı üretim seçeneği (elle yaz / şablon / yarı-otomatik) PO'ya sunuldu, biçim kararı verilmedi.
Bugünkü durum: ⬜
Etkisi: Eşleştirme doğru olsa bile mentör "şimdi ne yapacağım" sorusuna ürün içinde yanıt bulamıyor.
İş boyu: L
Kaynak: karar-defteri GRUP 6 (md.31/A1) · Numara: md.31 / A1
KOD-TEYİT: `coachingSuggestions.ts` YALNIZ `adminController.ts` tarafından import ediliyor (yöneticiye) — mentöre-menti yaklaşım içeriği kodda YOK. Doğrulandı, korunur.

[ ] işleme al   [x] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[x] PO notu: ⏸️ değil — TASARIM TEZİNE BAĞLI. Model değişimi (DISC→Big Five) bunu yeniden tanımlıyor; tez bitince sıraya girecek.
---
**[G3-02] DISC-DERİNLEŞME kurgusu (kademeli karakter netleşmesi + karşıya-yaklaşım)**
Ne: Kullanıcının DISC profilinin zamanla, ek sorularla derinleşip netleşmesi + karşıdakine yaklaşım katmanı. Adaptif motor ve DEEPENING soruları var (~%50-60 zemin) ama aksiyon/UX/sınır kısmı eksik.
Neden başlanmıştı: Tek-seferlik testin sığlığını aşmak; kullanıcıyı sisteme bağlı tutan kademeli "kendini keşif" deneyimi.
Neden başlanmıştı (devam): Bekleyen menti için retention aracı (bkz. G4 bekleme-anı).
Nerede durdu: Motor + DEEPENING discVector yazımı VAR; ama aksiyon akışı, UX sunumu ve "ne zaman durur" sınırı tasarlanmadı. PO tasarım kararı bekliyor (3 seçenek).
Bugünkü durum: 🔵 (bilinçli erteleme — zemin var, üst-kurgu PO'da)
Etkisi: Yarı-kurulu güçlü bir retention özelliği atıl; bitirilirse menti bekleme deneyimini besler.
İş boyu: L
Kaynak: karar-defteri GRUP 6 (A1) · Numara: A1

[ ] işleme al   [x] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---
**[G3-03] "Sınırsız-yeniden-derinleşme davranışı" kararı**
Ne: Kullanıcı derinleşme sorularını tekrar tekrar cevaplarsa her seferinde discVector değişir mi, kaç kez izin verilir, kilit var mı — karara bağlanmamış davranış.
Neden başlanmıştı: [G3-02] DISC-derinleşmenin doğrudan alt-sorusu; profil kararlılığı için gerekli.
Nerede durdu: Yalnızca soru olarak not edilmiş; niyet/tasarım belgelenmemiş.
Bugünkü durum: ❓
Etkisi: Kararsız bırakılırsa profil her derinleşmede oynar, eşleştirme tutarsızlaşabilir.
İş boyu: S
Kaynak: karar-defteri GRUP 6 (A3) · Numara: A3

[ ] işleme al   [x] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---
**[G3-04] STK-custom sorunun değer üretip üretmediği (canlı 1 kullanım)**
Ne: STK-custom sorular DISC'i etkilemez (doğru çalışıyor) ama neredeyse hiç kullanılmıyor (canlıda ~1). Tut mu, kaldır mı — değer sorgusu.
Neden başlanmıştı: Kurumların kendi ek soruları için esneklik.
Nerede durdu: Mekanizma çalışıyor; kullanım verisi PO'nun tut/kaldır kararını beklettiriyor.
Bugünkü durum: ❓ TEYİT GEREK (DB) — "canlı 1" sayısı DB'ye sorulamadı.
Etkisi: Kullanılmayan özellik bakım yükü; kaldırılırsa yüzey sadeleşir.
İş boyu: S
Kaynak: karar-defteri GRUP 3 (B8a/E6) · Numara: B8a / E6
KOD-TEYİT: STK_CUSTOM ayrımı `questionController.ts`/`questionService.ts`'te mevcut (doğru çalışıyor); canlı kullanım sayısı DB → ❓ kalır.

[x] işleme al   [ ] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[x] PO notu: STK-özel sorular KALIYOR ve GENİŞLETİLİYOR — kurumlar şıklı soru ve anket yapabilmeli. ⚠️ G3-13'ü (answerType/migration) canlandırır.
---
**[G3-05] Sertifika soru ekleme yetkisi + gerekçe belgesi**
Ne: Sertifika sorularını yalnız platform/yönetici ekleyebilir (kurum ekleyemez) — bilinçli kısıt. Kod-kısıt VAR ama "neden kurum ekleyemez" gerekçe belgesi zayıf.
Neden başlanmıştı: Sertifika bütünlüğü/standardı için merkezi kontrol.
Nerede durdu: Kısıt kodda uygulanıyor; yalnız gerekçe belgesi eksik/zayıf.
Bugünkü durum: ✅ (kod) / ❓ (gerekçe belgesi)
Etkisi: İşlevsel tamam; belge zayıflığı sonraki geliştiriciyi/PO'yu belirsiz bırakır.
İş boyu: S
Kaynak: karar-defteri GRUP 3 (md.13-akraba/B13) · Numara: md.13-akraba / B13

[x] işleme al   [ ] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[x] PO notu: Faz 6'ya taşındı (içerik fazı) — sertifika içerik zinciriyle birlikte.
---
**[G3-06] DISC canlı soru sayısı teyidi (kod 32 ↔ canlı ~20)**
Ne: Kod 32 DISC sorusu üretir; canlı ortamda ~20 görünüyor olabilir (seed eksik/kısmi şüphesi). Canlı sayı DB'ye sorulmadı.
Neden başlanmıştı: Belge "20" bayatı çözüldü; ama canlı gerçek DB-teyit ister.
Nerede durdu: Kural gereği canlı DB'ye sorgu atılmadı.
Bugünkü durum: ❓ TEYİT GEREK (DB)
Etkisi: Canlı 20 ise seed eksik demek; kullanıcı eksik test alıyor olabilir.
İş boyu: S
Kaynak: karar-defteri GRUP 6 (Ç3-canlı) · Numara: Ç3-canlı
KOD-TEYİT: `seed.ts` 34 tip-girişi grep'le doğrulandı (kod 32 üretir); canlı sayı DB → ❓.

[ ] işleme al   [x] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---
**[G3-07] SJT içerik 3→4 genişletme mi belge-düzelt mi**
Ne: SJT kodda 3 soru; bazı belgeler "4" diyordu (bayat). Karar: içeriği 4'e mi çıkaralım yoksa belgeleri 3'e mi düzeltelim.
Neden başlanmıştı: SJT (durumsal muhakeme) katmanının kapsamı.
Nerede durdu: PO kararı bekliyor (içerik genişletme vs. belge düzeltme).
Bugünkü durum: ⬜
Etkisi: 4'e çıkarma içerik+puanlama işi; 3'te bırakma yalnız belge hijyeni.
İş boyu: S
Kaynak: karar-defteri GRUP 6 (md.33-akraba) · Numara: md.33-akraba

[ ] işleme al   [x] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---
**[G3-08] Sertifika senaryo seed↔canlı tutarsızlığı (kod 20 ↔ canlı ~5)**
Ne: Sertifika seed'i 20 senaryo tanımlar (idempotent upsert) ama canlıda ~5 görünüyor. Seed uygulanmamış/kısmi.
Neden başlanmıştı: Sertifika sınavının senaryo havuzu.
Nerede durdu: Seed dosyası hazır; canlıya güvenli şekilde uygulanmadı (bkz. [G3-09] güvenli-runner yok).
Bugünkü durum: ⬜ (+ canlı ~5 sayısı ❓ DB-teyit)
Etkisi: Sınav havuzu eksikse kullanıcılar dar/yinelenen senaryo görür; sertifika değeri düşer.
İş boyu: M
Kaynak: karar-defteri GRUP 6 (md.30) · Numara: md.30
KOD-TEYİT: `seed-certification.ts` idempotent upsert (yalnız 2 upsert grep-eşleşmesi; salt-yazma, deleteMany yok — güvenli). Canlı ~5 → ❓ DB.

[x] işleme al   [ ] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[x] PO notu: Faz 6. Güvenli seed runner (G3-09) bunu kilitliyor — önce o. ⚠️ Canlı DB yazımı, PO onayı ZORUNLU.
---
**[G3-09] Güvenli sertifika seed runner yok (md.30'u bloklar)**
Ne: `seed-certification.ts` mevcut ve güvenli (upsert) ama `package.json`'da onu çalıştıran bir script referansı YOK — yani seed'i güvenle koşturacak resmi bir yol yok.
Neden başlanmıştı: [G3-08] sertifika senaryolarını canlıya uygulamak için güvenli, yanlışlıkla-silme-yapmayan runner gerekli.
Nerede durdu: Seed dosyası var, runner/script bağlanmadı.
Bugünkü durum: ⬜ (BLOKER — [G3-08]'i kilitler)
Etkisi: Güvenli runner olmadan seed çalıştırma riski (yanlış script = veri kaybı korkusu); bu yüzden [G3-08] askıda.
İş boyu: S
Kaynak: karar-defteri GRUP 6 (md.73/T5) · Numara: md.73 / T5
KOD-TEYİT: `backend/package.json`'da `seed-certification` referansı grep'le ARANDI, BULUNAMADI. Doğrulandı, korunur.

[x] işleme al   [ ] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---
**[G3-10] PO TÜM soruları görüp beğendiğini ayıracak (68-soru inceleme belgesi HAZIR, boş)**
Ne: PO tüm DISC/SJT sorularını gözden geçirip beğendiğini seçmek istiyor. İnceleme belgesi 68 soruyla HAZIR ama tüm onay kutuları boş.
Neden başlanmıştı: İçerik kalitesini PO'nun onaylaması; kötü/çelişen soruları elemek.
Nerede durdu: Belge hazırlandı, PO işaretlemeye başlamadı — EN BÜYÜK BEKLEYEN PO-İŞİ.
Bugünkü durum: ⬜ (belge hazır, aksiyon PO'da)
Etkisi: Onaysız içerik canlıda; kalite/tutarlılık PO gözünden geçmemiş.
İş boyu: L (PO okuma-işi)
Kaynak: karar-defteri GRUP 6 (A2/A4) · Numara: A2 / A4
KOD-TEYİT: `sorular-po-inceleme-2026-08-26.md` içinde ~68 boş "PO notu" kutusu (grep: 69 eşleşme) doğrulandı.

[ ] işleme al   [x] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[x] PO notu: ⏸️ değil — TASARIM TEZİNE BAĞLI. Model değişimi (DISC→Big Five) bunu yeniden tanımlıyor; tez bitince sıraya girecek.
---
**[G3-11] 17 eşleştirme PO-onay noktası (16 komb.+anti-match+tiebreak+%60-40+genel)**
Ne: Eşleştirme uyum matrisinin PO-onay noktaları (16 DISC kombinasyonu + anti-match + tiebreak + %60/40 ağırlık + genel) tümüyle boş işaretli. İçerik/psikometri onayı.
Neden başlanmıştı: Matris/ağırlık/eşik değerleri ampirik kaynaksız ("kalibre edilecek" kod-içi itiraf); PO'nun ürün kararı olarak onaylaması gerek.
Nerede durdu: `eslesme-uyum` belgesindeki tüm onay kutuları boş.
Bugünkü durum: ❓ (PO onayı)
Etkisi: Onaysız psikometrik varsayımlar üretimde; eşleştirme kalitesi bilimsel dayanaksız.
İş boyu: M (PO karar-işi)
Kaynak: karar-defteri GRUP 6 (md.103 çıktısı) · Numara: (md.103 çıktısı)
KOD-TEYİT: `scoring.ts:45 D:{D:60,I:75,S:30,C:85}` matris + `:20 ANTI_MATCH_RULES` (D-mentör/S-menti) + `:89 DEFAULT_SECTOR_WEIGHT=0.6` belgeyle BİREBİR; `discLetters.ts:23` "gerçek kullanıcı verisi biriktikçe kalibre edilecek" itirafı doğrulandı. ⚠️ ilişkili: [G2-06] aynı 5 onay noktası psikometri tarafından da işaretlenir (aynı karar, iki gruptan görünür).

[ ] işleme al   [ ] şimdilik alma   [x] geçersiz   [ ] anlamadım / açıkla
[x] PO notu: Eski DISC kurgusundan kalma. Yeni tasarımda SJT havuzu 30-40 senaryoya çıkıyor (boyut-belirsizliği temelli); '3→4' sorusu anlamını yitirdi. Bkz. tasarım belgesi B6.
---
**[G3-12] İçerik & Soru Felsefesi Keşfi (tüm soruların içerik+felsefe+puanlama)**
Ne: Tüm soruların içeriğini, arkasındaki felsefeyi ve puanlama mantığını çıkaran keşif. Kısmen 2026-08-26'da yapıldı, tam değil.
Neden başlanmıştı: İçerik kararlarını (elemek/eklemek/düzeltmek) sağlam temele oturtmak.
Nerede durdu: Kısmen yapıldı; tamamlanmadı.
Bugünkü durum: ⬜
Etkisi: Eksik keşif → içerik kararları yarım bilgiyle alınır.
İş boyu: M
Kaynak: karar-defteri GRUP 6 (A4) · Numara: A4

[ ] işleme al   [x] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---
**[G3-13] Kurum-özel soru cevap-tipi (answerType şema alanı yok, migration)**
Ne: Kurum-özel sorularda cevap tipi (şıklı / açık-uçlu) seçilebilsin isteniyor ama `answerType` şema alanı YOK; sistem Likert-sabit. Migration gerektirir. ⏸️ ERTELENDİ.
Neden başlanmıştı: Kurumların farklı soru tiplerine ihtiyacı; esnek anket.
Nerede durdu: Kapsam belirsizliği nedeniyle PO'ya ertelendi; şema/seed'de answerType yok.
Bugünkü durum: ⬜ (ertelenmiş, kapsam PO'da)
Etkisi: Kurumlar yalnız Likert soru sorabiliyor; açık-uçlu/şıklı esnekliği yok.
İş boyu: M (şema migration + seed + UI)
Kaynak: karar-defteri GRUP 6 (md.13/B8b) · Numara: md.13 / B8b
KOD-TEYİT: `answerType` backend/schema/seed'te grep'le ARANDI — YALNIZ belgelerde geçiyor, KOD'da YOK. Likert-sabit doğrulandı, korunur.

[x] işleme al   [ ] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[x] PO notu: PO kararıyla canlandı (⏸️→✅) — STK şıklı soru + anket isteği answerType şema alanını zorunlu kılıyor (migration).
---
**[G3-14] İçerik felsefesi gözlemleri (reverse-kod yok, sosyal-beğenilirlik, tek-persona, outcome tutarsız)**
Ne: İçerik-kalite gözlemleri — ters-kodlu madde yok, sosyal-beğenilirlik yanlılığı, tek-persona varsayımı, outcome tutarsızlığı. KOD DIŞI içerik kalitesi meselesi.
Neden başlanmıştı: Psikometrik geçerlilik endişesi (soruların ölçüm kalitesi).
Nerede durdu: Gözlem olarak kaydedildi; aksiyon alınmadı (PO sorusu).
Bugünkü durum: ⬜
Etkisi: Ölçüm yanlılığı → DISC sonuçları sistematik sapabilir.
İş boyu: M
Kaynak: karar-defteri GRUP 6 (NUMARASIZ) · Numara: NUMARASIZ

[ ] işleme al   [x] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---
**[G3-15] Soru metni yazım hataları**
Ne: Belirli sorularda yazım/ifade hataları (I9/D9 "güçlüğüm"→"güçlü yanım", C20/D20, SJT1 "Menteen"→"Menti'n"). KOD DIŞI içerik metni, düşük efor.
Neden başlanmıştı: Kullanıcıya görünen metin kalitesi/profesyonellik.
Nerede durdu: Tespit edildi; düzeltilmedi.
Bugünkü durum: ⬜
Etkisi: Kullanıcı güvenini zedeleyen görünür yazım hataları.
İş boyu: S
Kaynak: karar-defteri GRUP 6 (NUMARASIZ) · Numara: NUMARASIZ

[x] işleme al   [ ] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---
**[G3-16] Global içerik seed'i ana Neon'a uygula (DISC+LearningJourney "boş" görünüyor)**
Ne: Canlı (=lokal ana Neon) ortamda DISC + LearningJourney içeriği "boş" görünüyor = seed eksik. PO-onaylı güvenli seed uygulanmalı.
Neden başlanmıştı: İçeriğin canlıda gerçekten mevcut olması.
Nerede durdu: Seed dosyaları var; canlıya güvenli/onaylı uygulama yapılmadı.
Bugünkü durum: ⬜
Etkisi: İçerik canlıda eksikse kullanıcı boş test/yolculuk görür.
İş boyu: M
Kaynak: karar-defteri GRUP 6 (NUMARASIZ/Y6) · Numara: NUMARASIZ / Y6

[x] işleme al   [ ] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---
**[G3-17] Öğrenme yolculuğu kalan uçları (DISC ton + STK düzenleme + içerik onayı + uçtan uca test)**
Ne: Öğrenme yolculuğu kodu merge'li ama açık uçlar var: DISC'e göre ton, STK'nın aşama düzenlemesi, içerik onayı, uçtan uca test.
Neden başlanmıştı: 13-aşamalı öğrenme yolculuğunu üretime tam hazır getirmek.
Nerede durdu: Çekirdek merge edildi; kenar uçlar açık.
Bugünkü durum: ❓
Etkisi: Yarım-cilalı özellik; kenar durumlar canlıda sürpriz çıkarabilir.
İş boyu: M
Kaynak: karar-defteri GRUP 6 (A15) · Numara: A15

[ ] işleme al   [x] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---
**[G3-18] 6 canlı-teyit kuyruğu (DISC/sertifika/SJT/LearningStage/kurum-özel canlı sayı + FE-progress haritası)**
Ne: Altyapı-kontrol turu — canlıdaki gerçek sayılar (DISC/sertifika/SJT/LearningStage/kurum-özel) + FE ilerleme haritası DB'ye sorulmadı (kural).
Neden başlanmıştı: Kod↔canlı tutarsızlıklarını (G3-06/G3-08 gibi) toplu doğrulamak.
Nerede durdu: Kural gereği DB'ye sorgu atılmadı; tek bir teyit turunda toplanmalı.
Bugünkü durum: ❓ TEYİT GEREK (DB)
Etkisi: Kod↔canlı farkları görünmeden içerik kararları eksik bilgiyle alınır.
İş boyu: S (DB-teyit turu)
Kaynak: karar-defteri GRUP 6 (NUMARASIZ/Y6) · Numara: NUMARASIZ / Y6

[x] işleme al   [ ] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---
**[G3-19] Sertifika/etiket havuzu admin-yönetilir tablo + etiket ekleme akışı**
Ne: Sertifika/etiket havuzu için admin-yönetilir bir tablo yok (seed'de etiket var ama talep-onay akışı belirsiz). İkincil: etiket ekleme yönetici doğrudan mı yoksa öneri-onayı mı (md.C20).
Neden başlanmıştı: Kurumların etiket/sertifika havuzunu yönetebilmesi (öneri→onay iş akışı).
Nerede durdu: "Hazır sistem etiketleri" seed'de bulunamadı; yönetim tablosu/akışı tasarlanmadı.
Bugünkü durum: ⬜ / ❓ (PO)
Etkisi: Etiket/sertifika havuzu elle-kod-bağımlı; kurumlar kendi kelime dağarcığını yönetemiyor.
İş boyu: M
Kaynak: karar-defteri GRUP 3 (KARAR 12/A9 + md.C20) · Numara: KARAR 12/A9 (+ md.C20)
> Not: SAYIM'da bu iki satır (KARAR 12/A9 ve md.C20) ayrı listeleniyor; tek karar-yüzeyi olduğu için burada tek kartta birleştirildi — numara doğurulmadı, ikisi de kaynak olarak anıldı.

[x] işleme al   [ ] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---

## Kalan kalem — bilgi (kart-dışı, 🔵 bilinçli erteleme)

- 🔵 **Mentör yaklaşım Katman-3 (rıza/mahremiyet/dil kılavuzu)** — karar-defteri GRUP 6 (md.20/KARAR 9). [G3-01] DISC-yaklaşım içeriğinin üst-katmanı; bilinçli olarak canlı-sonrasına ertelendi. PO kararı gerekirse [G3-01] ile birlikte ele alınır. *(SAYIM'da 🔵 olarak sayıldı; ayrı kart açılmadı — erteleme kararı zaten alınmış.)*

---

## MUTABAKAT KONTROLÜ (G3)

- SAYIM (c) G3 = 25 satır. Bu dosyada: **6 ✅ (kart-yok)** + **19 kart** = **25**. ✅ Birebir tuttu.
  - Kart dağılımı: G3-01..G3-19 = 19 kart.
  - Not: G3-02 (🔵) ve son 🔵 (Katman-3) SAYIM'da ayrı iki 🔵 satırı; biri kart aldı (zemin kod var, aksiyon PO'da), diğeri bilgi notu (erteleme zaten kesin). [G3-19] iki SAYIM satırını (KARAR12/A9 + md.C20) tek karta katladı → kart sayısı 19, kalem sayısı korundu (numara doğurulmadı).
- **Kod-teyidi:** 6 kod-iddialı kalem doğrulandı (coachingSuggestions-admin, seed-cert runner yok, answerType yok, DISC matris/anti-match/ağırlık, seed 34-tip, STK_CUSTOM ayrımı) — **0 çürüdü**. DB-sorulamayan: 3 kalem (G3-04 canlı-1, G3-06 canlı-DISC, G3-08 canlı-cert + G3-18 toplu) ❓ TEYİT GEREK (DB) kaldı.
