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
| K-04 | Ş3 | **Fotoğraf yükleme sunucu hatası.** ÖNCE `docs/kararlar/dokploy-foto-volume-talimati.md` oku. Kod mu (dizin/izin/hata yutma) altyapı mı (volume yok)? Kod ise düzelt; altyapı ise 01-KARARLAR'a PO için TAM talimat + anlaşılır hata mesajı. | 🟢 | Kod: yükleme çalışıyor · Altyapı: talimat yazıldı + hata mesajı anlaşılır | BEKLIYOR | |
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
| K-13 | Ş0 | **Mükerrer uçlar — NİYET + KARANTİNA (silme YOK).** `/users/me/social`, `/system-logs` (↔/platform/logs), tenants CRUD ikilikleri. ⛔ SİLME PROTOKOLÜ (prompt §3.5) uygulanır: her uç için önce **neden yazıldığı** (git log + commit + belge), sonra ikame kanıtı, sonra arşiv belgesi, sonra karantina. **SİLME YAPILMAZ** — KARAR-11 cevabı beklenir. | 🔴 KARAR-11 | Her uç için gerekçe + ikame kanıtı + arşiv satırı; karantina PR'da | BEKLIYOR | |
| K-14 | Ş4 | **S19 sunucu sertleştirme — kod tarafı.** helmet · rate-limit · CORS · body-limit · güvenlik başlıkları. Altyapı kısmı (HTTPS, firewall, SSH, yedek) → 01-KARARLAR'a PO kontrol listesi. | 🟡 | Kod PR'da · altyapı listesi kararlarda | BEKLIYOR | |

## AŞAMA C — Ürün kararı / migration bekleyenler

| # | Şerit | İş | Kapı | Bitti demek | Durum | Not |
|---|---|---|---|---|---|---|
| K-15 | Ş2 | **AvailabilityBlock'a format + süre (tam randevu mimarisi).** ⛔ önce `availability_block_yedek_20260910`; migration default'lu (format=ONLINE, durationMin=60); mentör slot açarken format+süre seçer; menti slottan seçer. | 🔴 KARAR-1 | Mentör format+süre belirliyor, menti seçiyor, eski kayıtlar bozulmadı | BEKLIYOR | |
| K-16 | Ş0 | **madde 30 — sertifika bankası seed.** ⛔ önce `certification_option_yedek_20260910`, yalnız `seed-certification`. | 🔴 KARAR-3, KARAR-4 | Sertifika ekranında "Seçenek A" yerine gerçek metin | BEKLIYOR | |
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

---
## Ajan kuyruğa iş EKLEMEZ
Çalışırken "şu da yapılmalı" görürse `01-KARARLAR.md`'ye **KUYRUK ADAYI** olarak yazar. PO ekler.
