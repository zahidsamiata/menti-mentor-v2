# 00-KUYRUK — Otonom İş Kuyruğu (v2)
Güncelleme: 2026-09-10 · Sahip: PO (Zahid)
Ajan bu dosyayı OKUR, yalnız `Durum` ve `Not` kolonlarını günceller. İş EKLEMEZ.

## Kapılar
🟢 **YAP+MERGE** — yap, doğrulama listesi tam ✅ ise merge et, canlıya al
🟡 **YAP+PR** — yap, PR aç, merge etme (riskli/geniş)
🔴 **KARAR BEKLER** — ilgili KARAR cevapsızsa DOKUNMA, atla, sonrakine geç

## "Bitti" tanımı
1. **Kullanıcı görüyor** — ekranda bir şey değişti ya da bir hata kayboldu. "Backend hazır" sayılmaz.
2. **Testler yeşil** — mevcutlar + yeni davranış için en az bir test
3. **02-ILERLEME.md'ye yazıldı** — ne yapıldı, dosyalar, PR, "kullanıcı artık şunu görüyor"

## ⛔ K-20 ZAMANLAMASI — belge senkronu gerçekten EN SON
K-20 PR'ı, diğer TÜM PR'lar merge edildikten SONRA hazırlanır.
Bir iş merge edilmeden belgeye "CANLIDA" YAZILMAZ; "PR'DA" da yazılmaz —
o iş belge senkronuna kadar beklenir.
Gerekçe (Tur 1'de yaşandı): K-20 PR'ı K-02 merge olmadan hazırlandı, sonra
K-02 merge edildi ama 09-DURUM'a dönülmedi → aynı commit içinde iki belge çelişti.
Kontrol: K-20'yi açmadan önce `gh pr list --state open --author @me` boş olmalı.

## ⏱️ CI BEKLERKEN BOŞ DURMA
CI koşarken poller döngüsüne girme (`sleep`, tekrarlı `gh pr checks`).
CI beklerken SIRADAKİ işin kök sebep analizine başla; merge'leri topluca yap.
Gerekçe (Tur 1'de yaşandı): 32 dakikanın kayda değer kısmı CI beklemekle geçti.
İstisna: turun SON PR'ı (K-20) — orada beklemek doğru, yapılacak başka iş yok.

## Durum kodları
BEKLIYOR · CALISILIYOR · BITTI · ATLANDI(karar) · BASARISIZ · IPTAL(PO)

---

## ŞERİT DAĞILIMI (paralel yazma — dosya sahipliği)

| Şerit | Sahip olduğu alan | İşler |
|---|---|---|
| **Ş1 · Menti akışı** | `app/(dashboard)/disc-test/**` · `app/(dashboard)/learning-journey/**` · `app/(dashboard)/menti/**` · DISC/test bileşenleri | K-02, K-06, K-07, K-09 |
| **Ş2 · Randevu** | `app/(dashboard)/book-meeting/**` · `app/(dashboard)/mentor/availability/**` · `components/organisms/MeetingScheduler.tsx` · `backend/src/controllers/meetingController.ts` · `backend/src/routes/meetingRoutes.ts` | K-03, K-05, K-15 |
| **Ş3 · Profil & KVKK** | `app/(dashboard)/profile/**` · `lib/api/profile.ts` · `backend/src/controllers/onboardingController.ts` · KVKK/veri sayfaları · fotoğraf yükleme | K-04, K-08, K-12, K-17 |
| **Ş4 · Admin & altyapı** | `app/(dashboard)/admin/**` · `backend/src/routes/adminRoutes.ts` · `backend/src/server.ts` · güvenlik ara katmanları · tema/global CSS | K-11, K-14, K-10 |
| **Ş0 · Sıralı** | Birden fazla şeridi ilgilendiren, ortak dosyaya dokunan işler. TEK BAŞINA çalışır, diğerleri beklemez ama onun dosyasına dokunmaz. | K-01, K-13, K-16, K-18, K-19, E-1..E-4, K-20 |

⚠️ Bir iş kendi şeridinin dışına çıkmak zorundaysa → Ş0'a taşı, Not'a yaz.

---

## AŞAMA A — Migration'sız, kullanıcının hemen göreceği işler

| # | Şerit | İş | Kapı | Bitti demek | Durum | Not |
|---|---|---|---|---|---|---|
| K-01 | Ş0 | **Submodule pointer re-bump.** Çatı main'deki backend pointer `02129fe`, backend main HEAD `1304790`. İçerik aynı, defter düzeltmesi. | 🟢 | pointer == backend main HEAD | BITTI | PR #176 merged. pointer→1304790, ata teyitli, CI 8/8. |
| K-02 | Ş1 | **/disc-test boş sayfa.** "DISC Testini Güncelle" → sayfa yükleme iskeletinde takılıyor. Üç şıktan hangisi: istek atılmıyor / hata catch loading'i kapatmıyor / boş-durum ekranı yok. | 🟢 | /disc-test açılıyor, test başlıyor | BITTI | PR #179 merged (CI 8/8). Kök: page:86 loading==questions.length; hata sonsuz iskelet. loading bayrağı+reload+hata/boş ekran. Test 3/3. |
| K-03 | Ş2 | **Müsaitlik çoklu aralık.** Pzt + Cuma eklenince yalnız Cuma kalıyor. Backend diziyi olduğu gibi yazıyor (meetingController.ts:342-360) → şüphe FE'de. | 🟢 | 2+ aralık eklenip listede görünüyor | BEKLIYOR | |
| K-04 | Ş3 | **Fotoğraf yükleme sunucu hatası.** ÖNCE `docs/kararlar/dokploy-foto-volume-talimati.md` oku. Kod mu (dizin/izin/hata yutma) altyapı mı (volume yok)? Kod ise düzelt; altyapı ise 01-KARARLAR'a PO için TAM talimat + anlaşılır hata mesajı. | 🟢 | Kod: yükleme çalışıyor · Altyapı: talimat yazıldı + hata mesajı anlaşılır | BEKLIYOR | = G8-01/G8-02 foto volume (Faz 0 altyapı → KARAR-18). |
| K-05 | Ş2 | **Menti randevu — migration'sız yarısı.** Müsaitlik formdan ÖNCE gösterilsin; menti serbest tarih yerine mevcut aralıklardan seçsin; 409 ("saat müsaitliğe uymuyor") anlaşılır Türkçe gösterilsin. `MeetingScheduler.tsx:144 MentiBooking` slot seçtiriyorsa bağla, yoksa yaz. Format/süre şimdilik mentide. | 🟡 | Menti müsait olmayan saati SEÇEMİYOR | BEKLIYOR | |
| K-06 | Ş1 | **Öğrenme yolculuğu — diğer şıkların açıklaması.** Şu an yalnız seçilenin açıklaması görünüyor. | 🟢 | 4 şıkın da açıklaması görünüyor | BEKLIYOR | |
| K-07 | Ş1 | **Şık harfleri.** Şıklar karıştırılıyor, A/B/C/D harfleri orijinal sıraya yapışık kalıyor. Karıştırmadan SONRA yeniden ata. | 🟢 | Üstten alta her zaman A→D | BITTI | PR #177 merged. görünüm harfi=index, kimlik korundu. certification+ScenarioGuideEngine. Test 5/5. |
| K-08 | Ş3 | **Sosyal alan doğrulaması.** LinkedIn alanına YouTube linki kaydedilebiliyor. FE+BE platform doğrulaması (`/api/users/me/profile`). Yeni alan EKLEME. | 🟢 | Yanlış platform linki reddediliyor | BEKLIYOR | |
| K-09 | Ş1 | **Menti panelinde sabit sıfır kartlar.** Gerçek veriye bağla; veri kaynağı yoksa kartı kaldır. Hangisi yapıldı → Not. | 🟢 | Ekranda sahte sayı yok | BITTI | PR #178 merged. 2 kart /api/meetings'e bağlandı (bind, kaldırma değil). mentiMetrics.ts+test 3/3. "Gönderilen Talepler"=oturum sayacı, dokunulmadı. |
| K-10 | Ş4 | **Dark mode kontrast.** Test 3.4'teki okunmayan alanlar. Palet tutarlılığı TEKNİK karar, sorma. | 🟢 | Belirtilen ekranlarda metin okunuyor | BEKLIYOR | |
| K-11 | Ş4 | **Tenant-admin şikayet inceleme paneli.** `GET/PATCH /admin/reports` var, UI yok → şikayet döngüsü kapanmıyor. Liste + durum değiştirme. | 🟡 | Admin şikayeti görüp durumunu değiştirebiliyor | BEKLIYOR | |
| K-12 | Ş3 | **KVKK insan-okunur veri özeti.** Mevcut `/users/me/data-export` çıktısını okunur sayfada göster (ham JSON değil). Yeni uç YOK. | 🟢 | Kullanıcı Türkçe veri özeti görüyor | BEKLIYOR | |

## AŞAMA B — Temizlik ve güvenlik

| # | Şerit | İş | Kapı | Bitti demek | Durum | Not |
|---|---|---|---|---|---|---|
| K-13 | Ş0 | **Mükerrer uçlar — NİYET + KARANTİNA (silme YOK).** `/users/me/social`, `/system-logs` (↔/platform/logs), tenants CRUD ikilikleri. ⛔ SİLME PROTOKOLÜ (prompt §3.5) uygulanır: her uç için önce **neden yazıldığı** (git log + commit + belge), sonra ikame kanıtı, sonra arşiv belgesi, sonra karantina. **SİLME YAPILMAZ** — KARAR-11 cevabı beklenir. | 🔴 KARAR-11 | Her uç için gerekçe + ikame kanıtı + arşiv satırı; karantina PR'da | BEKLIYOR | = G10-01(c) MeetingScheduler bileşeni · G4-09/G4-10 super-admin ikizi (FE 0 kullanım) · G10-23 (silinmiş, çözülmüş). E-2/E-3/E-4 hayalet akışıyla aynı. |
| K-14 | Ş4 | **S19 sunucu sertleştirme — kod tarafı.** helmet · rate-limit · CORS · body-limit · güvenlik başlıkları. Altyapı kısmı (HTTPS, firewall, SSH, yedek) → 01-KARARLAR'a PO kontrol listesi. | 🟡 | Kod PR'da · altyapı listesi kararlarda | BEKLIYOR | = G1-28 (altyapı → KARAR-18). ⚠️ F-04 (G1-23 CSP) aynı `server.ts`'e dokunur → SIRALI yap. F-05 (G1-26) ile ilişkili. |

## AŞAMA C — Ürün kararı / migration bekleyenler

| # | Şerit | İş | Kapı | Bitti demek | Durum | Not |
|---|---|---|---|---|---|---|
| K-15 | Ş2 | **AvailabilityBlock'a format + süre (tam randevu mimarisi).** ⛔ önce `availability_block_yedek_20260910`; migration default'lu (format=ONLINE, durationMin=60); mentör slot açarken format+süre seçer; menti slottan seçer. | 🔴 KARAR-1 | Mentör format+süre belirliyor, menti seçiyor, eski kayıtlar bozulmadı | BEKLIYOR | |
| K-16 | Ş0 | **madde 30 — sertifika bankası seed.** ⛔ önce `certification_option_yedek_20260910`, yalnız `seed-certification`. | 🔴 KARAR-3, KARAR-4 | Sertifika ekranında "Seçenek A" yerine gerçek metin | BEKLIYOR | = G3-08 (kod 20 senaryo/80 şık HAZIR — ⚠️ KARAR-3 metni "22/88" der, kod 20/80 · sayı bayat) · G3-09 (npm runner yok, `seed-certification.ts:320` tsx guard var). |
| K-17 | Ş3 | **Sosyal profile serbest bağlantı alanı** (migration). | 🔴 KARAR-2 | Kullanıcı ek link ekleyebiliyor | BEKLIYOR | |
| K-18 | Ş0 | **Öğrenme yolculuğu seed** (madde 147/148). ⛔ önce yedek, `seed-learning-journey`. | 🔴 KARAR-5 | Canlıda içerik görünüyor | BEKLIYOR | |
| K-19 | Ş0 | **Kalan ürün kararları uygulaması:** menti mentör listesi · toplantı linki kimde. Her biri ayrı PR. | 🔴 KARAR-8, KARAR-10 | Her karar için ekranda değişiklik | BEKLIYOR | |

## AŞAMA E — ⭐ HAYALET BACKEND: niyet arkeolojisi → triyaj → yapım

Bağlam: Bir denetim "backend'de yazılmış ama kullanıcıya ulaşmamış ~17 blok · ~56 çağrılmayan uç · ~44 tekil kalem" buldu.
PO kararı: **hepsi ele alınacak** — ama "ele almak" hepsini yapmak değil. Önce NEDEN yazıldıkları anlaşılacak.

| # | Şerit | İş | Kapı | Bitti demek | Durum | Not |
|---|---|---|---|---|---|---|
| E-1 | Ş0 | **NİYET ARKEOLOJİSİ (salt-okuma, sınırsız paralel alt-ajan).** Her kalem için: (1) ne yapıyor, (2) **neden yazılmış** — git log + commit mesajı + ilgili PR + `docs/` içindeki gerekçe, kanıt satırıyla, (3) kime yarar — hangi rol hangi işini kolaylaştırır, (4) bugün hâlâ anlamlı mı, (5) çalışır durumda mı yoksa bozuk mu. Çıktı: `docs/raporlar/kesif/hayalet-envanter-2026-09-10.md`, kalem başına tek satır. ⚠️ "neden yazıldı" bulunamıyorsa "GEREKÇE BULUNAMADI" yaz, UYDURMA. | 🟢 | Her kalem için gerekçe ya da "bulunamadı" | BITTI | Rapor: `hayalet-envanter-2026-09-19.md`. 35 öksüz uç + 4 ölü alan + 3 öksüz bileşen. Eski "~56/~44" şişmişti (gerçek 2026-08-02=6 uç). GEREKÇE BULUNAMADI=1 (Tenant.verifiedBy). 4 paralel alt-ajan. |
| E-2 | Ş0 | **TRİYAJ.** E-1 çıktısındaki her kalemi dört kovadan birine koy: **BAĞLA** (gerçek ürün boşluğu, kullanıcıya değer) · **KARANTİNA ADAYI** (işi yapan başka yol VAR — ikame kapsam beyanıyla kanıtlanır; ⛔ SİLİNMEZ, yalnız aday olarak işaretlenir) · **OPERASYON** (cron/purge/admin tetik — bugün UI'ı yok; ⚠️ "UI olmamalı" DEME, "admin için bir tetik butonu işe yarar mı" sorusunu PO'ya kart olarak aç) · **SOR** (ürün kararı gerekiyor). Kova sayıları raporun başına. SOR ve KARANTİNA ADAYI kovasındaki her kalem için §4 şablonuyla KARAR kartı. ⚠️ Gerekçesi bulunamayan hiçbir kalem KARANTİNA ADAYI olamaz — otomatik SOR olur. | 🟢 | Dört kova + sayılar + kartlar karar dosyasında | BITTI | 4 kova: BAĞLA~7 · KARANTİNA ADAYI~13(→KARAR-11) · OPERASYON~7 · SOR(→KARAR-9/10/12/15). 6 YENİ kart KARAR-12..17 (kümelenmiş, ≤10). Mükerrerler mevcut KARAR-9/10/11'e referansla — tekrar kart AÇILMADI. |
| E-3 | değişir | **BAĞLA kovasını yap.** Her kalem ayrı PR, kendi şeridinde. Küçük ve migration'sız olanlar 🟢, diğerleri 🟡. Sırala: en az emekle en çok kullanıcı değeri önce. | 🟢/🟡 | Her kalem için kullanıcı ekranda bir şey görüyor | BEKLIYOR | |
| E-4 | Ş0 | **ARŞİV BELGESİ + KARANTİNA.** `docs/arsiv/silinenler-2026-09-10.md` oluştur: her karantina adayı için tam kod içeriği, neden yazıldığı, neden devre dışı bırakıldığı, son commit hash'i, geri alma komutu. Sonra karantinaya al (rota kapat / @deprecated), **SİLME**. ⛔ Gerçek silme ayrı bir turda, PO'nun ikinci onayıyla. | 🟡 | Arşiv belgesi tam + karantina PR'da; hiçbir şey silinmedi | BEKLIYOR | |
| E-5 | Ş0 | **GERÇEK SİLME** — yalnız karantina bir tur sorunsuz geçtiyse ve KARAR-11 "sil" diyorsa. Arşiv belgesi zaten hazır. | 🔴 KARAR-11 + karantina turu geçmiş | Silinenler listesi + arşivden geri alma yolu çalışıyor | BEKLIYOR | |

## AŞAMA D — Kapanış

| # | Şerit | İş | Kapı | Bitti demek | Durum | Not |
|---|---|---|---|---|---|---|
| K-20 | Ş0 | **Belge senkronu — TEK commit, EN SON.** 09-DURUM (yeni bölüm en üste) · 00-KARAR-TAKIP (yalnız bu turda değişenler, numara verme, "aday" etiketi) · oturum günlüğü. ⚠️ Her iş sonrası DEĞİL, turun sonunda bir kez. | 🟢 | Üç belge güncel, tek PR | BITTI | PR #180 merged (CI 8/8). 09-DURUM+oturum günlüğü+KARAR-TAKIP tek PR. |

## AŞAMA F — BİLANÇO DEVRİ (2026-08-28 öncelik sırası → koda karşı doğrulandı 2026-09-19)

Bağlam: `docs/raporlar/bilanco/kararlar/00-ONCELIK-SIRASI-2026-08-28.md` (Faz 0-8, "87 işleme al") 21 gün işlenmemişti.
Bu tur her kalem **bugünün koduna karşı** doğrulandı (salt-okuma, 8 paralel alt-ajan). ✅/🗑️/⚫ kapananlar satır ALMADI;
örtüşenler mevcut K- satırının Not'una eklendi; açık (🟡/⬜) ve örtüşmeyen kalemler aşağıda. Faz sırası korundu.
Kaynak kalem kodu + doğrulama kanıtı (dosya:satır) her satırın Not'unda.

| # | Şerit | İş | Kapı | Bitti demek | Durum | Not |
|---|---|---|---|---|---|---|
| F-01 | Ş0 | **Belge reorg — taşıyıcı-ad + büyük reorg.** G9 grubu Faz 1a'da çoğu ✅; kalan: 5 canonical taşıyıcı belge (09-DURUM/10-yol/00-INDEX/00-KARAR-TAKIP) taşınması + ~38 referans + ~68 belge isim/klasör standardizasyonu. | 🟡 | Taşıyıcı adlar taşındı, referanslar kırılmadı | BEKLIYOR | =G9-11 (🟡) + G9-12 (⬜), Faz 1. Kanıt: 09-DURUM.md hâlâ `docs/kararlar/` kökünde |
| F-02 | Ş3 | **Message otomatik imha (G1-06 kalanı).** FeedbackLog 3-yıl + SystemLog 90g imhası ✅ yazılı; kullanıcı **mesajlarının** (Message) saklama-süre imhası yazılmadı. | 🟡 | Mesaj saklama süresi dolunca otomatik siliniyor | BEKLIYOR | =G1-06, Faz 2. Süre G1-10 avukat metnine bağlı. Kanıt: `gdprService.ts` TODO(G1-10); FeedbackLog `deleteMany` var |
| F-03 | Ş3 | **OAuth rıza ayrımı (G1-08).** Google ile girişte KVKK/açık rıza UI'da ayrıca alınmıyor (implicit). Kayıt formunda checkbox var, OAuth'ta yok. | 🟡 | OAuth ile girişte de açık rıza kutusu görünüyor | BEKLIYOR | =G1-08, Faz 2. Hukukçu görüşüne bağlı. Kanıt: `oauthService.ts:112-120` implicit; `OAuthButtons.tsx` checkbox yok |
| F-04 | Ş4 | **logoUrl XSS guard (G1-23).** Logo URL çıplak `z.string().url()`; host/MIME allowlist + CSP yok. `javascript:`/veri-URI riski. | 🟡 | Logo URL host/MIME allowlist'e tabi, CSP kapsıyor | BEKLIYOR | =G1-23, Faz 3. ⚠️ K-14 ile aynı dosya `server.ts` → SIRALI. Kanıt: `tenantController.ts:11,82`; `server.ts:44` global CSP kapalı. (⚠️ eskiden "guard var" sanıldı — o IDOR guard'ıydı, XSS değil) |
| F-05 | Ş4 | **CAPTCHA/step-up (G1-26).** Public şüphe formunda IP-limit ✅ var; CAPTCHA + step-up doğrulama yok. | 🟡 | Public formda bot/spam koruması güçlendi | BEKLIYOR | =G1-26, Faz 3. Kanıt: `suspicionRoutes.ts:9` rate-limit var; CAPTCHA grep boş |
| F-06 | Ş4 | **Denetim izi hata yakalama (G1-14).** Kalibrasyon audit yazımı `void logger.info('AUDIT',...)` (fire-and-forget) — yazım sessizce düşebilir. | 🟢 | Audit yazımı hatası artık yutulmuyor | BEKLIYOR | =G1-14, Faz 3. Kanıt: `adminController.ts:863` void logger |
| F-07 | Ş4 | **Denetim izi saklama gerilimi (G1-15).** Kalibrasyon AUDIT izi SystemLog'ta 90 günde siliniyor → iz-koruma ↔ KVKK imha gerilimi. | 🟡 | İz-koruma ile imha politikası uzlaştırıldı | BEKLIYOR | =G1-15, Faz 3. Kanıt: `gdprService.ts:341,366`. Tasarım/hukuki karar tarafı KARAR-19'da |
| F-08 | Ş0 | **Sektör asimetri paydası (G2-09).** Sektör skoru paydası menti-etiket sayısı yerine iki tarafın etiket **birleşimi** olmalı (B9.4). | 🟡 | Sektör skoru simetrik paydayla hesaplanıyor | BEKLIYOR | =G2-09, Faz 5. KARAR-10'dan bağımsız küçük iş. Kanıt: `scoring.ts:34-40` payda `mentiSet.size` |
| F-09 | Ş0 | **12 SJT senaryo + arketip seed.** Şema/model ✅ (`SjtQuestion.triggersOn/signalsArchetype`); seed'de yalnız 3 senaryo var (12 değil). | 🔴 seed | Canlıda 12 SJT senaryosu + arketipler | BEKLIYOR | =Faz5 "12 senaryo+arketip". Seed=PO onayı + yedek. Kanıt: `seed.ts:530-573` 3 senaryo |
| F-10 | Ş4 | **Havuz kartı FE (G4-01).** Backend rol-ayrımlı select ~%90 hazır; menti-yönü havuz kartı FE tasarımı yok (B10.3). | 🟡 | Menti havuzu rol-bazlı kart olarak görüyor | BEKLIYOR | =G4-01, Faz 5. Kanıt: `matching.ts:337-349` RankedMentor DTO hazır, FE kart yok |
| F-11 | Ş0 | **Algoritma çekirdeği — KARAR-10 kilitli küme.** OCEAN/sektör motoru canlı eşleştirmeye bağlama (G2-07/08/G10-21) + yeni skor formülü %45/30/25 + 2 veto (V1/V2) + triggersOn derinleşme (madde 125/B6) + Big Five göç planı (B12). Motorlar YAZILI ama `matching.ts` onları çağırmıyor. | 🔴 KARAR-10 | KARAR-10 cevabına göre motor bağlanır/ertelenir | BEKLIYOR | =Faz5 çoğu. Hepsi KARAR-10'a kilitli. Kanıt: `matching.ts:3-5` yeni motoru import etmez; `scoring.ts:89-90` hâlâ 0.6/0.4 |
| F-12 | Ş1 | **STK anket cevap tipi (G3-13).** Kurum-özel soru Likert-sabit; şıklı/açık cevap tipi seçimi yok (migration). | 🔴 KARAR-21 | Kurum soru eklerken cevap tipini seçiyor | BEKLIYOR | =G3-13, Faz 6. Migration. Kanıt: `Question` modelinde answerType yok (SjtQuestion.AnswerFormat farklı kavram) |
| F-13 | Ş0 | **Sertifika soru-ekleme gerekçe belgesi (G3-05).** Kısıt kodda ✅ (kurum sertifika sorusu ekleyemez); "neden" gerekçe belgesi zayıf/yok. | 🟢 | Karar-gerekçe belgesi yazıldı | BEKLIYOR | =G3-05, Faz 6. Kanıt: `certification.service.ts:385` kısıt var; ayrı gerekçe belgesi yok |
| F-14 | Ş1 | **Menti personası çeşitlendirme (B8).** Sertifika/içerik senaryolarında menti persona çeşitliliği — içerik işi. | 🟡 | Senaryolarda çeşitli menti personaları var | BEKLIYOR | =Faz6 B8. İçerik turu. Kanıt: persona alanı/çeşitlendirme grep boş |
| F-15 | Ş1 | **Bekleme anı (G4-22+G4-23).** Bekleyen mentiye öğrenme+DISC+umut sinyali ("N kişi bekliyor, mentörler geliyor") ile anlamlı bekleme; şu an statik banner. | 🟡 | Bekleyen menti anlamlı/umut veren ekran görüyor | BEKLIYOR | =G4-22/23, Faz 7. Kanıt: `menti/page.tsx:184-202` statik banner |
| F-16 | Ş1 | **Menti özgüven sunumu (G4-24).** DISC sonucu tüm rollere ortak; menti-özel "güçlü yanların" tonu yok. | 🟡 | Menti kendi DISC'ini özgüven veren tonla görüyor | BEKLIYOR | =G4-24, Faz 7. Kanıt: `ResultStep.tsx` role-ortak sunum |
| F-17 | Ş2 | **Mentör reddi + yumuşatma (G4-25).** Mentör→menti ret akışı HİÇ yok (VisibilityOptIn onayı kaldırılmış); dolayısıyla yumuşatma da yok. Önce "mentör reddedebilsin mi" kararı gerekir. | 🔴 KARAR-20 | KARAR-20'ye göre ret akışı + nazik gösterim | BEKLIYOR | =G4-25, Faz 7. Kanıt: `requestController.ts:17` doğrudan talep, ret akışı yok |
| F-18 | Ş4 | **Yönetici/sponsor rapor export (G4-30).** Kuruma/sponsora PDF/Excel/CSV KPI raporu yok (KVKK kişi-JSON export'undan farklı). | 🟡 | Yönetici program raporunu dışa aktarabiliyor | BEKLIYOR | =G4-30, Faz 7. Format/veri alt-kararı yapımda. Kanıt: `backend/src`'de PDF/CSV/xlsx 0 sonuç |
| F-19 | Ş4 | **Proaktif kırmızı uyarı (G4-31).** `pairSignal` GREEN/YELLOW/RED var ama ikili-görüşme sağlığı için; yöneticiyi harekete geçiren eşik-alarmı (bekleyen menti vb.) yok. | 🟡 | Yönetici eşik aşımında proaktif kırmızı uyarı görüyor | BEKLIYOR | =G4-31, Faz 7. Kanıt: `pairSignal.service.ts:12,25-58` farklı amaç |
| F-20 | Ş1 | **Bildirim izni (G5-04).** Bekleme salonunda `Notification.requestPermission` istemi hiç yok. | 🟢 | Kullanıcıya bildirim izni isteniyor | BEKLIYOR | =G5-04, Faz 7. Kanıt: `frontend/src` `requestPermission` 0 dosya |
| F-21 | Ş0 | **Erişilebilirlik paketi (G7-01+02+09).** aria/role/klavye (Likert radiogroup, modal role=dialog yok) + DISC kontrast + WCAG denetimi. | 🟡 | Ekran okuyucu/klavye ile temel akışlar erişilebilir | BEKLIYOR | =G7-01/02/09, Faz 7. ⚠️ K-10 (dark-mode kontrast) ile kesişir. Kanıt: `DailyQuestionWidget.tsx:79-92` aria yok |
| F-22 | Ş1 | **Görüşme-tamamlama paylaşım kartı (G4-39).** "Görüşme tamamladım 🎉" paylaşılabilir kutlama kartı yok (DISC sonuç kartıyla karıştırılmasın). | 🟢 | Görüşme sonrası paylaşılabilir kutlama kartı | BEKLIYOR | =G4-39, Faz 7. Kanıt: `meetings/page.tsx:24` yalnız durum rozeti |
| F-23 | Ş4 | **adminSettings izolasyon deseni (G4-05).** Controller-içi elle `tenantId` filtresi; merkezî tenant-izolasyon deseni yok (güvenlik açığı değil, tutarsızlık). | 🟡 | adminSettings merkezî izolasyon desenine geçti | BEKLIYOR | =G4-05, Faz 8. Kanıt: `adminSettingsController.ts:82,97,143` elle filtre |
| F-24 | Ş4 | **Platform tek-kullanıcı drill-down (G4-08).** `/tenants/:id/users/:userId` platform detay ucu yok. | 🟡 | Platform admin bir kullanıcının detayına iniyor | BEKLIYOR | =G4-08, Faz 8. Kanıt: route grep — yok |
| F-25 | Ş4 | **Mail gerçek probe (G4-14).** Sistem sağlığı mail göstergesi yalnız config-var'a bakıyor; gerçek gönderim testi yapmıyor (bilinçli). | 🟢 | Mail göstergesi gerçek probe sonucunu gösteriyor | BEKLIYOR | =G4-14, Faz 8. Kanıt: `platformController.ts:146-156` config-only |
| F-26 | Ş4 | **`.env.example` eksik değişken (G4-17).** `PLATFORM_ADMIN_EMAIL` örnek env dosyasında yok. | 🟢 | .env.example tam | BEKLIYOR | =G4-17, Faz 8. Kanıt: `backend/.env.example` grep 0 |
| F-27 | Ş0 | **N+1 konuşma listesi (G6-01).** `listConversations` her konuşma için ayrı count+findFirst; pagination yok. | 🟡 | Konuşma listesi tek sorguda + sayfalı | BEKLIYOR | =G6-01, Faz 8. E-2/E-3 ile ilişkili. Kanıt: `conversationController.ts:236-261` Promise.all(map) |
| F-28 | Ş0 | **Sayfa metni merkezileştirme (G6-05).** `registerMessages.ts`+`threeQuestionsText.ts` özel modüller var; genel sayfa-metni sözlüğü yok. | 🟡 | Dağınık inline metinler merkezî sözlükte | BEKLIYOR | =G6-05, Faz 8. Kanıt: yalnız 2 özel modül; global i18n/dictionary yok |
| F-29 | Ş4 | **SEO teknik paketi (G7-03).** sitemap/robots/metadataBase/OG-image yok; `lang="tr"` (tr-TR değil). | 🟢 | sitemap+robots+metadataBase mevcut | BEKLIYOR | =G7-03, Faz 8. Kanıt: `app/` sitemap/robots 0; `layout.tsx:39` lang="tr" |
| F-30 | Ş1 | **Bayat yorum temizliği (G10-22).** `LoginForm.tsx:7` "Sprint 14'te tam entegrasyon" bayat yorumu. | 🟢 | Bayat yorum kaldırıldı | BEKLIYOR | =G10-22, Faz 8. Kanıt: `LoginForm.tsx:7` |
| F-31 | Ş3 | **Genel ürün geri-bildirim akışı (G5-05).** `/bildir` sayfası yalnız SuspicionReport gönderiyor; her sayfada "hata/öneri bildir"→ürün ekibine akış yok. | 🟡 | Kullanıcı üründen geri bildirim bırakabiliyor | BEKLIYOR | =G5-05, Faz 8. Kanıt: `bildir/page.tsx` submitSuspicionReport |
| F-32 | Ş4 | **Sekme geçiş yavaşlığı (G8-13).** İstemci önbelleği/prefetch katmanı yok; her sekmede yeniden fetch. | 🟡 | Sekme geçişleri hızlı (önbellek) | BEKLIYOR | =G8-13, Faz 8. Kanıt: `lib/hooks` prefetch/swr/query 0 |
| F-33 | Ş4 | **Dashboard sol-alt kullanıcı kartı (G8-14).** Admin panelde var; menti/mentör dashboard'unda sağ-üst bar, sol-alt kart yok. | 🟢 | Dashboard'da sol-alt kullanıcı kartı/menü | BEKLIYOR | =G8-14, Faz 8. Kanıt: `(admin)/layout.tsx:128-142` var; `DashboardNav.tsx:44,64` top-bar |

> **Örtüşme — mevcut K- satırlarına eklenen kalemler (yeni satır AÇILMADI):**
> - **K-13** (mükerrer uçlar) = G10-01(c) MeetingScheduler mount edilmeyen bileşen · G4-09/G4-10 super-admin ikizi (FE 0 kullanım) · G10-23 (mentiRequestController — dosya silinmiş, çözülmüş). Hepsi E-2/E-3/E-4 hayalet akışında.
> - **K-14** (sunucu sertleştirme) = G1-28 (Faz 0 altyapı, KARAR-18) + F-04 (G1-23 CSP, aynı `server.ts` → SIRALI) + F-05 (G1-26 kısmi).
> - **K-16** (sertifika seed) = G3-08 (kod 20 senaryo/80 şık HAZIR — ⚠️ KARAR-3 metni "22/88" der, kod 20/80, sayı bayat) · G3-09 (npm runner yok, dosya-içi tsx guard var).
> - **K-04** (foto yükleme) = G8-01/G8-02 foto volume (Faz 0, KARAR-18).
> - **K-12** (KVKK insan-okunur özet) = G1-05 zaten ✅; K-12 onun bir sonraki adımı (ham JSON → okunur sayfa).

> **✅/🗑️/⚫ kapananlar (satır ALMADI, kanıt aşağıda) — "yapılmamış sanılıp YAPILMIŞ" olanlar dahil:**
> Faz1: G9-grubu·G9-05·G6-07·G7-12·G7-13 ✅. Faz2: G1-05·G1-07 ✅; G1-01 ⚫ (bilinçli kapsam düşürüldü→metin beyanı).
> Faz3: G7-04·G1-02·G1-19 ✅; G1-17 ⚫ (backend `requireRole`'de çözüldü, middleware admin-guard teknik imkânsız); G1-04 ⚫ (yeniden tanım: public form, tenant izolasyon açığı değil).
> Faz4: S21·Üç-soru·G6-03(onDelete) ✅. Faz5: G2-10 🗑️ (qm² çift-çarpım iddiası PR #138'de çürütüldü).
> Faz6: G3-19 (etiket havuzu — kart ⬜ der, `PendingTag`+tagController VAR)·B7·B8-yüzey ✅.
> Faz8: **G4-02·G4-04·G2-11·G10-25 = kart açık/eksik der ama KODDA VAR** (compatibilityReason FE · managers paneli · davetli=onaylı tetiği `authController.ts:165` · profil düzenleme çalışıyor); G10-23 🗑️.
> ❓ TEYİT (bulut/DB yapamaz): G3-16/G3-18 canlı içerik sayıları — DB-teyit turu gerekir.

---
## Ajan kuyruğa iş EKLEMEZ
Çalışırken "şu da yapılmalı" görürse `01-KARARLAR.md`'ye **KUYRUK ADAYI** olarak yazar. PO ekler.
