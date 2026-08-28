<!-- çalışma-kuralları -->
# Çalışma Kuralları (her oturumda geçerli)

## Çalışma Sözleşmesi — mod & onay
- **Mod bildir**: her turda mod net olsun — PLAN (salt-okuma) / BYPASS (uygula) / MANUEL-ONAY (öner→onay→uygula).
- **Geri-alınamaz adımda DUR**: merge, prod deploy, prod DB yazımı (backfill/migration), force-push, external
  servise gönderim → önce DUR, onay bekle.
- **PR aç, MERGE ETME**: merge kararı kullanıcınındır. Push + PR yeterli.
- **Uçtan uca yürüt**: iş verilince tek turda kapsamlı ilerle; karar gerekeni "kullanıcı kararı gerekli: …" diye
  NOT et, gereksiz durma.
- **SHA/commit/branch tahmin etme**: durumu git'ten DOĞRULA, hafızadan varsayma.
- **Dürüst pushback**: yanlış/riskli görüneni söyle; testi/CI'ı yeşil GÖSTERME — gerçek durumu ver.

## 📁 Proje Hafızası — nereye bakılır
- **Güncel durum (canonical, ŞU AN): docs/kararlar/09-DURUM.md** — her oturum başında oku.
- Genel tanıtım (dondurulmuş onboarding): docs/arsiv/PROJECT_STATUS.md — güncel durum İÇİN DEĞİL (bkz. 09-DURUM). ⚠️ GÜNCELLEME (2026-08-28, G9-09): kökten `docs/arsiv/`'e taşındı; güncel durum canonical = `docs/kararlar/09-DURUM.md`.
- Detaylı kararlar (konu bazlı): docs/kararlar/00-INDEX.md (buradan ilgili konuya git)
- Geçmiş raporlar: docs/raporlar/
- Yeni bir işe başlarken: önce docs/kararlar/09-DURUM.md oku (nerede kaldık).

## Push Öncesi — ZORUNLU
- **Her push öncesi `npm run verify` koş.** Yeşil değilse push yok.
- verify = CI ile birebir aynı: backend tsc + tsc-test + eslint + frontend tsc + vitest + build + entegrasyon testleri.
- `scripts/verify.sh` içeriği CI workflow ile eşlenmiş tutulur.

## verify ↔ CI farkı — dikkat
- `npm run verify` backend entegrasyon testlerini `TEST_DATABASE_URL` guard'ına tabi koşar. Lokalde TEST_DATABASE_URL
  YOKSA testler guard'la DURUR (canlı Neon'a truncate atmaz) → yeşil sanma; asıl kanıt CI'dadır.
- Backend CI yalnızca `main` hedefli PR/push'ta tetiklenir. Stacked (panel/feature-base) PR'larda backend CI koşmaz
  → gerçek CI ancak main-base olunca çıkar. Çatı (umbrella) CI her branch'te koşar ve backend suite'ini submodule
  pointer'ı üzerinden çalıştırır.

## Branch Akışı — DOĞRUDAN main'E PUSH YOK
- Her iş feature branch'te yapılır: `git checkout -b feat/xxx`
- PR açılır → CI iki repoda da yeşil → merge.
- Main hep yeşil kalır, "Run failed" maili gitmez.

## CI Kontrolü — İKİ REPO
- Her push sonrası `gh run list --limit 3` HEM backend HEM çatı repo için kontrol edilir.
- Biri yeşil diye diğeri atlanmaz.

## Submodule Senkronizasyonu
- Backend değişince aynı tur içinde pointer güncellenir ve çatı push edilir.
- Backend push ile pointer güncellemesi arasında ASLA ara commit/push olmaz.
- Sıra: backend commit → backend push → çatı repo `git add backend` → çatı commit → çatı push.

### Merge sonrası pointer bump — DANS ÖNLEME (her merge turunda tekrarlıyordu)
> Kök neden: backend PR merge edilince backend `main` HEAD ilerler (merge commit); çatı feature PR'ı ise açıldığı
> andaki **feature commit** pointer'ını taşır (merge-öncesi SHA). Bu fark her turda elle keşfediliyordu.
- Backend PR **MERGE EDİLDİKTEN sonra** çatı pointer'ı feature commit'e DEĞİL, **backend `main` HEAD'e (merge commit)** bump edilir.
  Komut: `git submodule update --remote backend` (`.gitmodules`'ta `branch = main` tanımlı — main HEAD'i otomatik çeker).
- Sıra: (1) backend PR'ları merge et → (2) TEK çatı turunda `git submodule update --remote backend` + `git add backend` + commit
  → (3) çatı PR'ı pointer'ı bump → (4) tek CI bekle → (5) merge.
- Paralel çatı PR'ı varsa: bump'ı TEK noktada (en son açık PR'da) yap — her PR'da ayrı bump CI'ı gereksiz tekrar bekletir.
- Pointer "CONFLICTING" ama **descendant** görünüyorsa: git auto-resolve eder, zararsız — panik yok, doğrula:
  `git merge-base --is-ancestor <eski-pointer> <yeni-pointer>` (0 dönerse güvenli, ileri sarım).

## API/Şema Değişikliği
- Endpoint veya Prisma şeması değişince "bunu kim kullanıyor?" taraması yapılır: testler, frontend, diğer servisler.

## Veri Modeli — Kurum-içi rol/sayım kaynağı
- Kurum-içi rol ve sayım (admin panel, KPI dahil) **`TenantMembership.role`** üzerindendir — `User.role` DEĞİL.
  Bir kullanıcı farklı kurumlarda farklı rolde olabilir.
- Her kullanıcı-katılım akışında (kayıt, OAuth, rol atama/çıkarma) `ensureMembership()` / `ensureMembershipSafe()`
  (`membership.ts` servisi) çağrılır — idempotent, non-fatal (ana akışı bozmaz).

## Migration Kuralı
- Neon shadow-DB sorunu: `IF NOT EXISTS` SQL + `db execute` + `migrate resolve`. `db push --accept-data-loss` YASAK.

## ⚠️ CANLI = LOKAL AYNI DB (kritik)
- Canlı ve lokal AYNI Neon DB'sini paylaşıyor (ep-fancy-tooth-ab4u5xhr).
- Lokalde DB'ye yazmak = canlıyı anında etkilemek. Seed/migration/DB işleminde onay al.
- Tehlikeli seed.ts / npm run seed / prisma db seed VERİ SİLER — asla çalıştırma.
  Güvenli: seed-questions.ts, seed-learning-journey.ts, seed-test-tenant.mjs.
  > ⚠️ GÜNCELLEME (2026-08-23): `seed-questions.ts` **SİLİNDİ** (backend `5745e0f`, "ölü/çelişen seed-questions.ts kaldır")
  > — artık güvenli listede DEĞİL. Kod-kanıtlı **gerçek güvenli** liste (yalnız `upsert`, `deleteMany` YOK):
  > `seed-certification.ts` · `seed-learning-journey.ts` · `scripts/seed-test-tenant.mjs`.
  > **Tehlikeli = `prisma/seed.ts`** (`npm run seed` = `tsx prisma/seed.ts`) — satır 300-307'de toplu `deleteMany()` (userResponse/feedback/meeting/matchRequest… siler). ASLA çalıştırma.

## Ortam / Veritabanı — PROD ≠ DEV ≠ TEST
- **Lokal geliştirme**: `backend/.env` → ana Neon (`ep-fancy-tooth-ab4u5xhr`, eu-west-2 = **Londra/Birleşik Krallık**, AB üyesi DEĞİL — madde 92, PO teyitli 2026-08-26). Bu CANLI veri;
  lokalde ona bağlıyken DB'ye YAZMA (salt-okuma sorgu, PII maskeli).
- **Test**: `TEST_DATABASE_URL` (izole DB) beklenir. Yoksa guard (`assertTestDatabase.ts`) devreye girer — canlı
  Neon'a TRUNCATE atılmaz, suite durur.
- **CI**: ephemeral localhost Postgres (service container). `.env.test` gitignored → CI'a girmez; test env
  `tests/setup.ts`'te set edilir.
- **PROD**: docker-compose Postgres (`@postgres:5432`), Neon değil. Migration/backfill prod'da prod `DATABASE_URL` ile.
- **Kural**: hangi DB'ye bağlı olduğunu ÖNCE host'tan doğrula (secret'sız). Yanlış DB'de iş yapma.

## Neon test branch — geçici izole DB koreografisi
- İzole test için ayrı Neon branch açılırsa: (1) mevcut `.env`'i yedekle, (2) yeni host'u kanıtla (secret'sız),
  (3) iş bitince ana DB'ye GERİ DÖN. `.env.testbranch-temp` gibi geçici secret dosyaları iş sonunda silinir.
- PC restart eski dev-server process'lerini kapatır — yeni oturumda `:3000/:3001` boş olabilir; yanlış DB'de
  dinleyen stale process'e güvenme, portu doğrula.

## Belirsiz / Riskli Durumda
- DUR ve kullanıcıya raporla. Tahmin yürüterek riskli adım atmak yasak.

## Koşullu Paralellik — hızlan ama çakıştırma
- Bir iş, gerçekten BAĞIMSIZ parçalara ayrılıyorsa (aynı dosyalara/duruma/repo-submodule'e dokunmayan
  ve birbirinin çıktısına bağlı olmayan) → paralel alt-agent'larla yürüt, hızlandır.
- Parçalar aynı dosyaya/repoya/submodule'e ya da birbirinin çıktısına bağımlıysa → SIRALI yürüt.
  Özellikle şunlar HER ZAMAN sıralıdır: migration, merge, submodule pointer güncelleme, paylaşılan
  servis/config dosyaları. Burada paralellik çakışma ve veri bozulması riski taşır.
- Paralel başlatmadan ÖNCE parçaların gerçekten bağımsız olduğunu doğrula. Şüphede kalırsan sıralı git:
  doğruluk ve güvenlik hızdan önce gelir.

## Kişi Adı Yasağı — KALICI
- Hiçbir kod/yorum/commit/PR/belgeye kişi adı YAZMA. Nötr terim kullan ("ürün sahibi" / "PO").
- Mevcut belgelerdeki isimler ayrı bir temizlik işinde giderilir; yeni içeriğe isim eklenmez.

## Model Yönlendirme
> ⚠️ GÜNCELLEME (2026-08-28, G9-15): Model isimleri (sürüm/sınıf) ve "basit iş→hafif model" ilkesi bu bölümden
> ÇIKARILDI — model seçimi her turun promptunda belirtildiği için belgede sabitlenmesi yalnız eskiyen bilgi üretiyordu.
- Model seçimi her turun promptunda belirtilir; belgede sabitlenmez.

## Hata Felsefesi — panik yok
- Ters giderse sırayla: (1) önce sorunu ARAŞTIR + KANITLA (teşhis + kanıt), (2) sonra çözüm + risk
  değerlendir, (3) net ve düşük riskliyse çöz; belirsizse DUR ve sor.
- Panikle deneme-yanılma düzeltme YAPMA.

## Belge Senkronizasyonu — ZORUNLU BİTİŞ ADIMI (atlanamaz)
> ⚠️ GÜNCELLEME (2026-08-11): Eski "iş bitince 09-DURUM güncellenir" kuralı bu **atlanamaz bitiş adımıyla**
> güçlendirildi (kararlar yazılıp unutuluyor sorununu kökten önlemek için). İçerik kaybı yok — genişletildi.

- **Her BYPASS (kod/iş yapan) tur, aşağıdaki belge-senkron kontrolü yapılmadan TAMAMLANMIŞ SAYILMAZ.**
  Aynı tur/commit (docs branch'inde) içinde şunlar KONTROL EDİLİR ve gerekiyorsa güncellenir:
  1. **İş/özellik tamamlandıysa →** `docs/kararlar/09-DURUM.md` güncellenir: ne yapıldı + PR no + bilinen sınırlar.
     (Sonraki oturum nerede kalındığını buradan görür.)
  2. **İş kuyruğu değiştiyse** (madde düştü / eklendi / önceliği değişti) **→** `docs/kararlar/10-yol-haritasi.md` güncellenir.
  3. **Güncelleme gerekmiyorsa** (ör. salt-okuma PLANLA turu veya durumu değiştirmeyen iş) **→** bu AÇIKÇA belirtilir:
     "belge güncellemesi gerekmedi: [neden]".
- Bu adım atlanırsa **tur EKSİK sayılır** — kapanış raporunda belge-senkron durumu her zaman belirtilir.
- Belge hijyeni geçerli: eskiyi SİLME → `⚠️ GÜNCELLEME (tarih): …` notuyla ekle veya `docs/arsiv/`'e taşı (bkz. "Belge Düzeltme Deseni").

### Docs çakışması önleme — SERİLEŞTİR (09-DURUM / 10-yol-haritasi)
> Kök neden: birden çok iş açıkken hepsi 09-DURUM/10-yol'un aynı ortak başlık bölgesine ("Son güncelleme",
> "⚡ ŞU AN / TEK BAKIŞTA", "Açık PR") yazınca merge çakışıyordu (#92/#94 böyle çakıştı, manuel çözüldü).
- `09-DURUM.md` ve `10-yol-haritasi.md` **PAYLAŞILAN DURUM dosyalarıdır** → "Koşullu Paralellik" gereği bu iki dosyaya
  yazım **SIRALIDIR**. Aynı anda iki iş bu dosyalara YAZMAZ (migration/merge/pointer gibi = sıralı).
- İş PR'ları kodu taşır; 09/10 güncellemesi **en sona, TEK docs turunda** toplanır (veya işler sıralıysa sırayla).
- Ortak başlık bölgesine dokunurken mevcut satırı değiştirmek yerine mümkünse **tarihli alt-bölüme append** et
  (Belge Düzeltme Deseni). Şişen tarih/SHA katmanları düzenli olarak `docs/arsiv/`'e taşınır (bkz. 09-DURUM geçmiş-katmanlar arşivi).
- (Opsiyonel güvenlik ağı) `.gitattributes`'a `docs/kararlar/09-DURUM.md merge=union` eklenebilir — ANCAK union
  çelişkili satırları da birleştirir (iki dal farklı "Açık PR: X" yazarsa ikisi de kalır) → yalnız saf-append bölge için güvenli, tek başına önerilmez.

## Karar-Takip Disiplini — "arkada ne kaldı" bir daha unutulmasın
> Amaç: alınan ama uygulanmayan kararlar, yarım işler ve bağlanmamış (ölü) kod görünür kalsın; ürün sahibi
> canlıda eksik keşfetmesin. Tek canonical: `docs/kararlar/00-KARAR-TAKIP.md` (🔄 açık iş/karar/ölü-kod takibi).

- **KURAL 1 — Oturum başında OKU + hatırlat (proaktif):** Her yeni oturumun İLK adımı `00-KARAR-TAKIP.md`'yi okumak
  ve ürün sahibine **açık maddeleri** (🔴/🟡/🔵/❓) kısaca hatırlatmaktır. Ürün sahibi "arkada ne kaldı?" diye
  sormak zorunda kalmamalı — ajan proaktif söyler.
- **KURAL 2 — Tur sonunda GÜNCELLE (zorunlu bitiş adımı):** Her BYPASS (iş yapan) tur bitişinde `00-KARAR-TAKIP.md`
  güncellenir: tamamlanan iş ✅'a çekilir **(yalnız KOD GERÇEĞİYLE doğrulanarak — belge asla koddan önce "yapıldı"
  demez)**, yarım kalan 🟡 olarak nedeniyle işaretlenir, turda çıkan yeni iş/karar 🔴 satır olarak EKLENİR.
  Gerekmiyorsa açıkça "karar-takip güncellemesi gerekmedi: [neden]" denir. Atlanırsa **tur EKSİK sayılır.**
- **09-DURUM/10-yol ile ilişki (çakışmaz, tamamlar):** `00-KARAR-TAKIP` = "**ne kaldı**" görünürlüğü (açık iş +
  ölü kod + karar tek bakışta) · `09-DURUM` = "**şu an ne oldu**" anlatısı · `10-yol-haritasi` = öncelikli sıra.
  Yukarıdaki "Belge Senkronizasyonu" bitiş adımı geçerliliğini korur; bu ona EK bir adımdır.
- **Ölü kod ilkesi:** ölü/bağlanmamış kod için "sil" varsayılan DEĞİL — önce **niyeti anla + neye bağlanacağını**
  bul (çoğu yarım özelliğin parçası). Gerçek terk adayı "❓ bilinçli terk mi, PO kararı" işaretlenir; silme PO kararıdır.

## Git Fetch Önce — lokal main geride kalabilir
- Main durumu (ahead/behind, merge oldu mu) kontrol edilecekse ÖNCE `git fetch origin`.
- Lokal main güncel değilken yapılan teşhis yanlış olur (yaşandı).

## Belge Düzeltme Deseni — tarihsel iz korunur
- Eski/yanlış çıkan bir kararı SİLME; üstüne `⚠️ GÜNCELLEME (tarih): …` notu ekle.
- Böylece kararın neden değiştiği ve tarihsel iz korunur.
- **⭐ KALICI KURAL — bayat gövde satırı üstü-çizili damgalanır (2026-08-28, G9-03):** Bir ⚠️ GÜNCELLEME notu
  eklerken ESKİ yanlış cümleyi normal yazıyla BIRAKMA — okuyan onu hâlâ geçerli sanır. Cümleyi SİLME ama üstünü çiz
  + `[ESKİ]` damgası ver. Desen (bu 2 satır birlikte):
  > `~~[ESKİ · {düzeltme tarihi}] {yanlış cümle}~~`
  > `⚠️ GÜNCELLEME ({bugün}): {doğrusu} — kanıt: {kaynak}`
  Böylece hem tarihsel iz korunur (cümle silinmez) hem de bayat satır görsel olarak "artık geçerli değil" der.
  (Zaten bir ⚠️/✅ GÜNCELLEME notu varsa yalnız eski cümleyi üstü-çizili damgalamak yeterli; notu tekrar yazma.)

## Belge Düzeni — her belge işinde uy
- Belge oluştururken/düzenlerken `docs/kararlar/konu/belge-duzeni-rehberi.md`'deki **8 düzen kuralına** uyulur:
  (1) tek gerçek kaynağı/canonical, (2) tür=klasör + alt-klasör (kararlar/raporlar/arsiv), (3) yaşayan 🔄 / dondurulmuş 📸 üst-etiketi,
  (4) adlandırma (dondurulmuş=tarihli, yaşayan=tarihsiz), (5) yeni belge → `00-INDEX.md` güncelle, (6) eksik-işaretleme (⚠️ GÜNCELLEME, silme yok),
  (7) taşıyıcı belge iş bölümü (statü tek yerde, diğerleri referans), (8) bulgu yaşam döngüsü (aşağıda).
- Bu kurallar "Belge Eş-Zamanlılığı" + "Belge Düzeltme Deseni" ile tutarlıdır; çelişki yok. Rehber = canonical.

### KURAL 8 — Bulgu yaşam döngüsü (keşif turu tur-sonu kontrol listesi)
- (1) Keşif → **tarihli 📸 rapor** (`raporlar/`); ham kanıt, aksiyon kaynağı olarak bırakılmaz.
- (2) **Her aksiyon `00-KARAR-TAKIP`'e girer — numarasını YALNIZ orada alır** (tek numara dizisi; rapordan doğrudan yol haritasına madde geçmez).
- (3) Öncelik verilince → `10-yol-haritasi`'na **tek satır** (numara + öncelik + "detay: KARAR-TAKIP"); detay kopyalanmaz.
- (4) İş bitince → **önce KOD doğrula**, sonra 4 yer: KARAR-TAKIP ✅ · yol-haritası stub · `10-yol-tamamlananlar` · `09-DURUM`.
- (5) Oturum bitince → `devir/07-oturum-gunlugu`'na bölüm.

> **⚠️ GÜNCELLEME (2026-08-27): KURAL 9-12 yürürlüğe girdi** — 4-turluk belge bilançosunun kök-neden teşhisinden çıktı
> (`docs/raporlar/bilanco/tekrar-onleme-2026-08-26.md`, PO onaylı). Amaç: ~175 kalemin numarasız izsizleşmesi + 15 sözün
> 11'inin devralınmaması + bayat "yapıldı" iddiaları bir daha yaşanmasın. KURAL 8'i tamamlarlar, çelişmezler.

### KURAL 9 — Her rapor KALEM LİSTESİ'yle biter
- Keşif/denetim/analiz raporu üreten HER tur, raporu **"KALEM LİSTESİ"** bölümüyle bitirir. Listede satır almayan bulgu, **bulgu SAYILMAZ** (rapor gövdesine gömülü kalıp kaybolmaz).
- Her satır 3 alan taşır: **kalem** (tek cümle) · **önerilen durum** (aşağıdaki 6'dan biri) · **numara-adayı-mı** (evet/hayır — bu sütun ZORUNLU; yoksa yine numarasız liste doğar).
- Bu liste, bulguların `00-KARAR-TAKIP`'e girişinin (KURAL 8 adım 2) kaynağıdır — rapordan doğrudan aktarılır.

### KURAL 10 — ✅ kanıtsız basılmaz
- "YAPILDI" (✅) yazabilmek için **kod kanıtı (dosya:satır) VEYA açık "KOD DIŞI" etiketi ZORUNLU.** Belge beyanı tek başına YETMEZ.
- **Kısmi iş ✅ değildir → 🟡 YARIM** (ne var / ne yok, ikisi de kanıtlı). Belge ↔ kod çelişirse KOD kazanır.
- **Durum kodları 6 tanedir (başkası YASAK):** ✅ YAPILDI · 🟡 YARIM · 🔀 PR'DA · ⬜ AÇIK · ❓ TEYİT GEREK · 🗑️ GEÇERSİZ ADAYI.

### KURAL 11 — Söz açılışta okunur (EN KRİTİK — disiplin sona değil BAŞA)
- `00-KARAR-TAKIP.md`'de **"⭐ SONRAKİ-TUR SÖZLERİ"** bölümü tutulur (YENİ DOSYA AÇMA — ikinci kaynak = çelişki riski).
- Oturum kapanışında verilen her söz ("sonraki turda/ileride yapılacak"), `07-oturum-gunlugu`'ye yazıldığı AN buraya da **tek satır** kopyalanır (söz · hangi oturum · durum · ilgili madde no).
- **Her oturum BAŞINDA bu bölüm OKUNUR** ve ürün sahibine açık sözler hatırlatılır. Söz yerine getirilince ✅ + kaldırılır. *(Teşhis: 15 sözün 11'i devralınmadığı için düştü; disiplin oturum sonundan başına taşındı.)*

### KURAL 12 — Tazelik denetimi (3 ayak; 30-gün ikincil)
- **Birincil (yapısal-tetik):** Yapısal kod değişiminde (model ekle/sil, dosya kaldır, ortam/env değişimi) ilgili **`CLAUDE.md` dosyaları DOĞRULANIR** — model sayısı, dosya adları, ortam bilgisi grep'le kontrol edilir. *(backend/CLAUDE.md "5 model / iceBreaker.ts" bu yüzden aylarca bayat kaldı.)*
- **İkincil (karar-yayılımı):** Bir karar değişince **"bunu başka nerede yazmışız"** belge taraması yapılır *(bilançoda 9 çelişki bu yüzden doğdu — ör. sunucu ülkesi 5 belgede).*
- **Üçüncül (süre):** 🔄 YAŞAYAN belge 30 günü aşarsa "bayat" işaretlenir — bu ayak **ELLE değil, ileride script ile** (elle yapılırsa unutulur; maliyet>fayda). Şimdilik birincil+ikincil elle yürür.

<!-- /çalışma-kuralları -->

<!-- güvenlik-kuralları -->
## Güvenlik Kuralları — kod yazarken UY

### Her yeni endpoint için ZORUNLU kontrol
- Auth gerekli mi? requireAuth() / requireRole() eklendi mi?
- Doğru rol mü? (platform admin ≠ tenant admin ≠ MENTOR ≠ MENTI)
- Tenant izolasyonu: sorgu tenantId ile filtreleniyor mu?
- IDOR: kullanıcı başkasının kaynağına ID tahmin ederek erişebilir mi?
  (kendi kaydı mı diye kontrol et — sadece "giriş yapmış" yetmez)
- Zod ile girdi doğrulama var mı?
- KASITLI public olan endpoint'ler: login, register, health, unsubscribe,
  invitation join, suspicion report. Bunun DIŞINDA public endpoint YOK.

### Veri döndürürken
- Explicit `select` kullan — `password` ASLA dönmesin.
- Over-fetching yapma: sadece gereken alanlar. PII gereksiz yere sızmasın.
- Hata mesajları iç detay sızdırmasın (stack trace, DB hatası, dosya yolu).

### Frontend guard yeterli DEĞİL
- Frontend'de bir şeyi gizlemek = güvenlik değil. Backend'de de guard olmalı.
- Kullanıcı API'yi doğrudan çağırabilir.

### Token / sır
- Token'lar HttpOnly cookie'de. localStorage'a token YAZMA.
- Sır (API key, şifre, secret) koda YAZMA — env'den oku.
- Sır'ı log'a, response'a, hata mesajına BASMA.

### Public endpoint eklerken
- Rate limit var mı? Boyut sınırı var mı? Spam/kötüye kullanım korumalı mı?

### Hassas veri eklerken (yeni alan/model)
- Bu veri PII mi? Kim görmeli, kim görmemeli?
- KVKK: toplanması meşru mu, silinebiliyor mu?
- Kişi hakkında yazılan yorumlar (feedback vb.) — o kişi görmeli mi?

### Bağımlılık
- Yeni paket eklerken npm audit çalıştır. HIGH/CRITICAL varsa ekleme.

### Yeniden kullanılacak kalıplar (bu projede mevcut)
- **Ownership (`:id` IDOR)**: `requireSelfOrAdmin(paramName)` middleware (`authorize.ts`) — sahibi/ADMIN değilse
  403. Yeni `:id`/`:userId` endpoint'inde inline yazma, route'a bunu ekle.
- **Login/public brute-force**: IP-bazlı `loginRateLimiter` / `platformAuthRateLimiter` (`rateLimiter.ts`)
  pattern'ini uyarla; `generalRateLimiter` tenant-key'lidir, public endpoint'te zayıftır.
- **Kullanıcıya görünen mesajlar**: dağınık inline string yerine merkezi/kod-bazlı mesaj resolver'ı (PLANLANAN desen —
  `registerMessages.ts` örnek addır, dosya HENÜZ kodda YOK: grep boş; gerçek merkezileştirme ayrı iş). Enumeration-safe
  tut (hesap varlığını sızdırma).

### Şüphedeysen
- Güvenlik açısından emin değilsen DUR ve kullanıcıya sor. Tahmin yürütme.

<!-- /güvenlik-kuralları -->

<!-- temiz-kod -->
## Temiz Kod & Sürdürülebilirlik — kod yazarken UY

> Bu proje uzun ömürlüdür. Kod, yıllar sonra başka biri açtığında (belki sen değil)
> rahatça anlaşılıp güvenle geliştirilebilir olmalı. "Çalışıyor" yetmez; "anlaşılır ve
> değiştirilebilir" olmalı.

### İsimlendirme & yapı
- Açık, niyet belli isimler kullan (`d`, `tmp`, `data2` değil). İsim, ne yaptığını anlatsın.
- Tek sorumluluk: bir fonksiyon/dosya tek iş yapsın. Uzayan fonksiyonu böl.
- Katman ayrımı: iş mantığı (service) ↔ HTTP (controller) ↔ UI (component) ↔ veri (Prisma)
  karışmasın. Mantığı controller/component içine gömme; saf, test edilebilir fonksiyona çıkar.

### Sabitler & tekrar
- Sihirli sayı/dize YOK. Eşik, limit, süre gibi değerler tek bir config/const'ta toplanır
  (örn. `CERT_CONFIG`). Aynı değer iki yerde elle yazılmaz.
- DRY: aynı mantığı kopyalama; ortak yardımcıya al. Ama erken/aşırı soyutlama da yapma —
  iki kez tekrar edince çıkar, bir kez için değil.

### Yorumlar
- Yorum "ne"yi değil "neden"i anlatır (kod zaten ne yaptığını söyler). Sıra dışı bir karar,
  bir kısıt (Neon shadow-DB gibi) veya bir tuzak varsa yaz.
- Ölü kod / yorum satırına alınmış kod bırakma — sil (git geçmişi zaten tutar).

### Test edilebilirlik & bağımlılık
- Çekirdek mantığı DB/HTTP'den arındırılmış saf fonksiyon yaz; birim testi kolaylaşır.
- Yeni bağımlılık ekleme (gerçekten gerekmedikçe). Eklerken `npm audit` (güvenlik kuralı).

### Stil & mimari kayıt
- MEVCUT stile ve konvansiyonlara uy; kendi stilini dayatma. Yeni dosya, komşularına benzesin
  (isimlendirme, yorum yoğunluğu, dosya düzeni).
- Önemli/kalıcı bir mimari kararı (neden böyle yapıldı) CLAUDE.md'ye veya ilgili dosyanın
  başına kısa not olarak düş; sonraki geliştirici tahmin etmesin.

### Dil
- Kullanıcıya görünen her metin (hata/uyarı/buton/mesaj) TÜRKÇE; kod iç mekaniği (değişken/fonksiyon/commit/
  error-code) İngilizce.

<!-- /temiz-kod -->

<!-- rtk-instructions v2 -->
# RTK (Rust Token Killer) - Token-Optimized Commands

## Golden Rule

**Always prefix commands with `rtk`**. If RTK has a dedicated filter, it uses it. If not, it passes through unchanged. This means RTK is always safe to use.

**Important**: Even in command chains with `&&`, use `rtk`:
```bash
# ❌ Wrong
git add . && git commit -m "msg" && git push

# ✅ Correct
rtk git add . && rtk git commit -m "msg" && rtk git push
```

## RTK Commands by Workflow

### Build & Compile (80-90% savings)
```bash
rtk cargo build         # Cargo build output
rtk cargo check         # Cargo check output
rtk cargo clippy        # Clippy warnings grouped by file (80%)
rtk tsc                 # TypeScript errors grouped by file/code (83%)
rtk lint                # ESLint/Biome violations grouped (84%)
rtk prettier --check    # Files needing format only (70%)
rtk next build          # Next.js build with route metrics (87%)
```

### Test (60-99% savings)
```bash
rtk cargo test          # Cargo test failures only (90%)
rtk go test             # Go test failures only (90%)
rtk jest                # Jest failures only (99.5%)
rtk vitest              # Vitest failures only (99.5%)
rtk playwright test     # Playwright failures only (94%)
rtk pytest              # Python test failures only (90%)
rtk rake test           # Ruby test failures only (90%)
rtk rspec               # RSpec test failures only (60%)
rtk test <cmd>          # Generic test wrapper - failures only
```

### Git (59-80% savings)
```bash
rtk git status          # Compact status
rtk git log             # Compact log (works with all git flags)
rtk git diff            # Compact diff (80%)
rtk git show            # Compact show (80%)
rtk git add             # Ultra-compact confirmations (59%)
rtk git commit          # Ultra-compact confirmations (59%)
rtk git push            # Ultra-compact confirmations
rtk git pull            # Ultra-compact confirmations
rtk git branch          # Compact branch list
rtk git fetch           # Compact fetch
rtk git stash           # Compact stash
rtk git worktree        # Compact worktree
```

Note: Git passthrough works for ALL subcommands, even those not explicitly listed.

### GitHub (26-87% savings)
```bash
rtk gh pr view <num>    # Compact PR view (87%)
rtk gh pr checks        # Compact PR checks (79%)
rtk gh run list         # Compact workflow runs (82%)
rtk gh issue list       # Compact issue list (80%)
rtk gh api              # Compact API responses (26%)
```

### JavaScript/TypeScript Tooling (70-90% savings)
```bash
rtk pnpm list           # Compact dependency tree (70%)
rtk pnpm outdated       # Compact outdated packages (80%)
rtk pnpm install        # Compact install output (90%)
rtk npm run <script>    # Compact npm script output
rtk npx <cmd>           # Compact npx command output
rtk prisma              # Prisma without ASCII art (88%)
```

### Files & Search (60-75% savings)
```bash
rtk ls <path>           # Tree format, compact (65%)
rtk read <file>         # Code reading with filtering (60%)
rtk grep <pattern>      # Search grouped by file (75%). Format flags (-c, -l, -L, -o, -Z) run raw.
rtk find <pattern>      # Find grouped by directory (70%)
```

### Analysis & Debug (70-90% savings)
```bash
rtk err <cmd>           # Filter errors only from any command
rtk log <file>          # Deduplicated logs with counts
rtk json <file>         # JSON structure without values
rtk deps                # Dependency overview
rtk env                 # Environment variables compact
rtk summary <cmd>       # Smart summary of command output
rtk diff                # Ultra-compact diffs
```

### Infrastructure (85% savings)
```bash
rtk docker ps           # Compact container list
rtk docker images       # Compact image list
rtk docker logs <c>     # Deduplicated logs
rtk kubectl get         # Compact resource list
rtk kubectl logs        # Deduplicated pod logs
```

### Network (65-70% savings)
```bash
rtk curl <url>          # Compact HTTP responses (70%)
rtk wget <url>          # Compact download output (65%)
```

### Meta Commands
```bash
rtk gain                # View token savings statistics
rtk gain --history      # View command history with savings
rtk discover            # Analyze Claude Code sessions for missed RTK usage
rtk proxy <cmd>         # Run command without filtering (for debugging)
rtk init                # Add RTK instructions to CLAUDE.md
rtk init --global       # Add RTK to ~/.claude/CLAUDE.md
```

## Token Savings Overview

| Category | Commands | Typical Savings |
|----------|----------|-----------------|
| Tests | vitest, playwright, cargo test | 90-99% |
| Build | next, tsc, lint, prettier | 70-87% |
| Git | status, log, diff, add, commit | 59-80% |
| GitHub | gh pr, gh run, gh issue | 26-87% |
| Package Managers | pnpm, npm, npx | 70-90% |
| Files | ls, read, grep, find | 60-75% |
| Infrastructure | docker, kubectl | 85% |
| Network | curl, wget | 65-70% |

Overall average: **60-90% token reduction** on common development operations.
<!-- /rtk-instructions -->
