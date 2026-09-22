<!-- otonom-calisma-modu · eklenme: 2026-09-19 · PO kararı -->
# ⭐ OTONOM ÇALIŞMA MODU (2026-09-19'dan itibaren geçerli)

> ⚠️ Bu bölüm, bu dosyadaki bazı eski kurallardan ÖNCE gelir. Çelişki halinde burası kazanır.
> Hangi kuralları geçersiz kıldığı aşağıda tek tek yazılı — eski satırlar silinmedi, tarihsel iz korunuyor.

## Nedir
PO (Zahid) kod yazmaz ve her adımda onay veremez. İş artık sohbetten değil **dosyalardan** yürür.
Ajan kuyruğu baştan sona işler, karar noktasında DURMAZ — soruyu dosyaya yazıp sonraki işe geçer.
PO toplu karar verir, aynı prompt tekrar gönderilir, kaldığı yerden devam eder.

## Üç dosya — çalışma buradan okunur
| Dosya | Ne işe yarar | Kim yazar |
|---|---|---|
| `docs/otonom/00-KUYRUK.md` | Sıralı iş listesi, şerit dağılımı, kapılar | PO ekler · ajan yalnız Durum/Not günceller |
| `docs/otonom/01-KARARLAR.md` | Ürün kararı kuyruğu | Ajan SORU ekler · **yalnız PO CEVAP yazar** |
| `docs/otonom/02-ILERLEME.md` | Ne yapıldı, ne atlandı, ne bozuldu | Ajan yazar · PO okur |

⛔ Bu üç dosya **git'te izlenir ve commit edilir.** Lokalde kalmaları kabul edilmez:
bulut oturumları (claude.ai/code) yalnız repodaki dosyaları görür. Kuyruk ilerledikçe
Durum güncellemeleri normal commit'lerle gider.

Ana prompt: `docs/otonom/OTONOM-PROMPT.txt` — her turda aynen gönderilir, yeniden yazılmaz.

## ✅ MERGE POLİTİKASI — "PR aç, MERGE ETME" kuralı KISMEN KALDIRILDI
~~[ESKİ · 2026-09-19] `CLAUDE.md:8`'deki **"PR aç, MERGE ETME"** kuralı ve `CLAUDE.md:35`'teki akış bu bölümle güncellenmiştir.~~
⚠️ **GÜNCELLEME (2026-09-21): atıf hedefleri kaymıştı —** bu bölümün güncellediği gerçek satırlar **`CLAUDE.md:178`** ("PR aç, MERGE ETME", bu turda üstü çizildi) ve **`CLAUDE.md:207`** ("PR açılır → CI yeşil → merge") akışıdır. Bugün `:8` = "PO kod yazmaz…", `:35` = "Şema/migration değişikliği YOK" — başka içerik. (Satır numaraları 2026-09-21 itibarıyladır.)
Gerekçe: gerçek kullanıcı ~sıfır, her iş ayrı PR (tek tek revert edilebilir), `npm run verify` kapısı var.

**🟢 işler: doğrulama listesi tam geçerse MERGE EDİLİR, PO beklenmez.**
Merge öncesi kontrol listesi — bir madde bile eksikse merge YOK, PR bırakılır:
- [ ] `npm run verify` yeşil (backend tsc + tsc-test + eslint + frontend tsc + vitest + build + entegrasyon)
- [ ] ⚠️ `TEST_DATABASE_URL` yoksa entegrasyon testleri guard'la DURUR → **bunu "yeşil" sayma.**
      Bu durumda asıl kanıt CI'dır; CI yeşil değilse merge YOK. (KURAL 14: CI YEŞİL ≠ TEST KOŞTU)
- [ ] CI iki repoda da yeşil (çatı + backend; backend CI yalnız main-hedefli PR'da koşar)
- [ ] Şema/migration değişikliği YOK
- [ ] seed komutu çalıştırılmadı
- [ ] auth / KVKK / matching dosyalarına dokunulmadı
- [ ] Değişiklik yalnız o işin kapsamındaki dosyalarda

Merge sonrası: **submodule pointer'ını backend main HEAD'e re-bump et** (bkz. "Merge sonrası pointer bump").
Merge sonrası `02-ILERLEME.md`'ye ekle: `CANLIDA BAK: <kullanıcı ne görmeli>`

**🟡 işler** (riskli/geniş): PR'da durur, merge edilmez.
**🔴 işler**: ilgili KARAR cevaplanmadan dokunulmaz.

⛔ **DEĞİŞMEYEN İKİ KURAL** — bunlar kaldırılmadı, aynen geçerli:
1. **Migration/DB**: canlı = lokal AYNI Neon. Yalnız ilgili KARAR "evet" ise VE etkilenen tablo için
   tarihli yedek tablo alındıktan sonra. Yedek adı + satır sayısı `02-ILERLEME.md`'ye yazılır.
2. **seed**: `seed.ts` / `npm run seed` / `prisma db seed` ASLA.
   Güvenli olanlar: `seed-questions`, `seed-learning-journey`, `seed-certification`, `seed-test-tenant`
   — bunlar da yalnız KARAR evet + yedek sonrası.

## ⭐ KARAR AYRIMI — neyi sorma, neyi sor
**SEN KARAR VER, SORMA (teknik):** kütüphane · dosya/klasör yapısı · isimlendirme · state yönetimi ·
test yöntemi · refaktör kapsamı · hata mesajı metni · renk paleti · hizalama · index/performans · çeviri

**DUR VE SOR (ürün / geri dönülmez):** kullanıcı neyi görebilecek/yapabilecek · bir özellik var mı yok mu ·
bir özelliğin SİLİNMESİ · hukuki veya KVKK sonucu olan metin · verinin ANLAMINI değiştiren migration ·
yetki kimde (mentör mü menti mi) · canlı veriye geri dönülmez dokunuş · seed · kurumlara görünen metin

Kararsızsan tek soru: **"bunu geri almak kolay mı?"** Kolaysa kendin yap. Zorsa sor.

## ⛔ SİLME PROTOKOLÜ — SİLME SON ÇAREDİR
PO kuralı (2026-09-10): *"Önemli olan biz neden öyle bir şey yapmışız, onu bildikten sonra doğru
uygulayalım. O karar üzerine FARKLI bir karar aldıysak ve son karardan da EMİNSEK silebiliriz.
Sildiğimiz kısımları arşiv belgesine yazarız ki geri almak istediğimizde ne alacağımızı bilelim."*

Hiçbir kod · uç · alan · tablo · bileşen · dosya · test şu beş adım olmadan silinmez:
1. **NİYET** — neden yazıldı? git log + commit + PR + `docs/` gerekçesi.
   ⛔ "GEREKÇE BULUNAMADI" ise SİLİNMEZ, karantinaya bile alınmaz → PO'ya SOR.
2. **İKAME KANITI** — bu işi bugün yapan başka yol var mı? Kapsam beyanıyla (KURAL 13).
3. **YENİ KARAR** — sonradan farklı bir karar alınmış mı, belgede kanıtı ne?
   ⛔ "Kullanılmıyor" tek başına gerekçe DEĞİLDİR.
4. **ARŞİV** — `docs/arsiv/silinenler-YYYY-MM-DD.md`: tam yol · kodun TAM içeriği (kırpmadan) ·
   neden yazılmıştı · neden çıkarılıyor · son commit hash · geri alma komutu.
   ⛔ Arşiv satırı yazılmadan silme commit'i atılmaz.
5. **ÖNCE KARANTİNA** — doğrudan silme YOK. Kod yerinde kalır, devre dışı bırakılır
   (rota kapalı / `@deprecated` / export kaldırıldı). Bir tur sorunsuz geçerse, **PO'nun İKİNCİ onayıyla** silinir.
   Karantina 🟡'dır, gerçek silme 🔴'dır.

⚠️ İstisna YOK. "Zaten ölü" · "kimse kullanmıyor" · "mükerrer" gerekçeleri protokolü atlatmaz.

## ⭐ YANLIŞ SORU TUZAĞI (2026-09-09'da üç kez yaşandı)
Bir uç/bileşen çağrılmıyor diye **"özellik yok" DEME.** Önce sor: *bu işi yapan BAŞKA bir yol var mı?*
Varsa bulgu "eksik özellik" değil **MÜKERRER KOD**'dur — işi bağlamak değil, protokole sokmaktır.

**Gerçek vaka:** `/users/me/social` (`backend/src/routes/onboardingRoutes.ts:42`) öksüz sanıldı ve
üç ayrı denetimde "profil düzenleme ekranı yok" diye raporlandı. Oysa sosyal profil düzenleme
`frontend/src/app/(dashboard)/profile/page.tsx` üzerinden `/api/users/me/profile` ile ÇALIŞIYOR.
Yanlış olan kod değil, sorulan soruydu.

## Karar kartı biçimi — PO teknik bilmiyor
Ürün kararına gelince `01-KARARLAR.md`'nin SONUNA ekle, işi ATLA, DURMA. Şablon:

```
### KARAR-N · <başlık>  [ÜRÜN KARARI]
**Şu an ne var:** mevcut davranış, kullanıcı gözünden. Kanıt: dosya:satır
**Sorun ne:** kullanıcı için ne eksik/yanlış (teknik terim kullanma, kullanırsan parantezle açıkla)
**Neden sana soruyorum:** teknik değil ürün kararı olmasının sebebi
**Seçenekler:** A/B/C — her biri için:
  · Kullanıcı ne görür · Ne kazanırsın · Ne kaybedersin
  · Süre S/M/L · Geri alınır mı · Migration var/yok
**Karşılaştırma:** hangisi hangi durumda doğru (2-3 cümle, taraf tutmadan)
**Benim önerim:** <harf> — çünkü <tek cümle>
**Cevap vermezsen:** hangi işler etkilenir
**CEVAP:**
```
⚠️ "Ne kaybedersin" ASLA boş kalmaz. Seçenekler gerçekten farklı sonuç vermeli.
⚠️ Kendi önerine güvenmiyorsan yaz: *"bu senin ürün kararın, önerime güvenme."*

### ⭐ Karar kartı sayısı — ÜST SINIR YOKTUR (PO kararı, 2026-09-19)
> ⚠️ GÜNCELLEME (2026-09-19): Önceki turlarda uygulanan **"en fazla 5/10 yeni kart"** sınırı KALDIRILDI.
> Gerekçe (PO): bastırılan karar, PO'nun göremediği tıkanma üretir. Eski "≤5/≤10" ifadeleri artık geçerli değil.
- Karar kartı sayısında **ÜST SINIR YOKTUR.** Gerekli her karar için kart açılır. Ama kartlar şu üç şarta uyar:
  1. **KÜMELE** — aynı ürün sorusunu paylaşan kalemler TEK kartta toplanır.
  2. **SIRALA** — etkiye göre: kaç işi açıyor + kullanıcıya etkisi. Başlığa `(n işi açar)` etiketi konur.
  3. **İNDEKS** — `01-KARARLAR.md`'nin BAŞINDA içindekiler tablosu tutulur.

## Paralellik — şerit sistemi
**Okuma** (keşif/envanter/arkeoloji): sınırsız paralel alt-ajan.
**Yazma**: en fazla 4 şerit. Her şeridin SAHİP OLDUĞU dosyalar `00-KUYRUK.md`'de yazılı.
⛔ Bir şerit başka şeridin dosyasına DOKUNMAZ. Ortak dosya gerekiyorsa işler SIRALI yapılır.
Şüphede: SIRALI. Bozuk kod, hızlı koddan pahalıdır.
Dal adı: `otonom/K-xx-kisa-ad-YYYYMMDD` · her iş ayrı dal, ayrı PR (tek tek revert edilebilir).
`02-ILERLEME.md`'ye yazarken tek seferde EKLE (append), başkasının satırını silme.

## ⭐ MOD ETİKETİ — renk kodu ve yerleşim (2026-09-19)
`CLAUDE.md:4-5`'teki "Mod bildir" kuralının görsel karşılığı:

| İşaret | Mod | Anlam |
|---|---|---|
| 🟥 | **BYPASS** | Kod yazar, commit atar, PR açar, kapısı uygunsa merge eder |
| 🟩 | **PLANLA** | Salt-okuma keşif. Hiçbir şey değişmez. |

⛔ **KARE ≠ DAİRE.** 🟢 🟡 🔴 daireleri `00-KUYRUK.md`'de **kapı** anlamındadır
(🟢 yap+merge · 🟡 yap+PR · 🔴 karar bekler). Mod etiketi asla daire kullanmaz;
kapı etiketi asla kare kullanmaz. Bir promptun başında 🟥 görmek "dur" demek DEĞİLDİR.

**Yerleşim:** mod etiketi kopyalanan promptun İÇİNDE değil, ÜSTÜNDE ve ALTINDA durur.
Üstte işin adıyla, altta sonucuyla:
- `🟩 PLANLA — randevu mimarisi keşfi` … `🟩 PLANLA — hiçbir şey değişmedi, değişmeyecek.`
- `🟥 BYPASS — K-06 şık açıklamaları` … `🟥 BYPASS — K-06 yazıldı, PR açıldı, merge edildi.`

## Belge senkronu — SONA, tek sefer
`CLAUDE.md:126` "her turun sonunda belge senkronu" kuralı otonom turda şöyle uygulanır:
her iş sonrası DEĞİL, **kuyruğun sonunda TEK PR** (K-20). Ajan `00-KARAR-TAKIP.md`'ye
**numara VERMEZ**, "aday" etiketiyle yazar; eski satırları silmez, üstünü çizer.
Gerekçe: son bir ayda belge muhasebesi tur bütçesinin büyük kısmını yedi; ürün büyümedi.

## Bitti tanımı — tek ölçü
Bir iş ancak şu üçü varsa ✅:
1. **Kullanıcı görüyor** — ekranda bir şey değişti ya da bir hata kayboldu.
   ⛔ "Backend hazır" · "bileşen yazıldı ama mount edilmedi" · "uç eklendi" → BİTMEDİ.
2. Testler yeşil (yukarıdaki kontrol listesi)
3. `02-ILERLEME.md`'ye yazıldı — dosyalar, PR, ve "kullanıcı artık şunu görüyor" cümlesi

Raporda YAPTIĞINI değil KULLANICININ GÖRECEĞİNİ yaz:
✅ "artık /disc-test açılıyor"   ❌ "loading state düzeltildi"

## Bulut oturumu farkı (claude.ai/code)
Bulut VM'de Neon DB ve Dokploy erişimi YOKTUR → migration ve seed işleri (🔴) bulutta YAPILAMAZ, atlanır.
Bulut dal gönderir ve PR açar; **main'e merge etmez** → merge PO'nun GitHub'dan tek tıkıdır.
Bulut izin modları: Auto / Accept edits / Plan (Bypass yok).
Bulut yalnız **repodaki** dosyaları görür → `docs/otonom/` commit edilmiş olmalı.

<!-- /otonom-calisma-modu -->

---

<!-- çalışma-kuralları -->
# Çalışma Kuralları (her oturumda geçerli)

## Çalışma Sözleşmesi — mod & onay
- **Mod bildir**: her turda mod net olsun — PLAN (salt-okuma) / BYPASS (uygula) / MANUEL-ONAY (öner→onay→uygula).
- **Geri-alınamaz adımda DUR**: merge, prod deploy, prod DB yazımı (backfill/migration), force-push, external
  servise gönderim → önce DUR, onay bekle.
- ~~[ESKİ · 2026-09-10 öncesi] **PR aç, MERGE ETME**: merge kararı kullanıcınındır. Push + PR yeterli.~~
  ⚠️ **GÜNCELLEME (2026-09-21): doğrusu —** kapıya göre: **🟢 → doğrulama listesi tamsa MERGE ET** · **🟡 → PR aç, merge etme** · **🔴 → KARAR cevapsızsa dokunma.** — kanıt: `CLAUDE.md:25-45` (MERGE POLİTİKASI) · `docs/otonom/00-KUYRUK.md:6-16` · `docs/otonom/OTONOM-PROMPT.txt:151-152`. ⚠️ Bulut oturumu (claude.ai/code) **hiçbir kapıda merge edemez** (`CLAUDE.md:163`) — orada "PR aç, merge etme" **aynen geçerlidir**.
- **Uçtan uca yürüt**: iş verilince tek turda kapsamlı ilerle; karar gerekeni "kullanıcı kararı gerekli: …" diye
  NOT et, gereksiz durma.
- **SHA/commit/branch tahmin etme**: durumu git'ten DOĞRULA, hafızadan varsayma.
- **Dürüst pushback**: yanlış/riskli görüneni söyle; testi/CI'ı yeşil GÖSTERME — gerçek durumu ver.

## 📁 Proje Hafızası — nereye bakılır
- **Güncel durum (canonical, ŞU AN): docs/kararlar/09-DURUM.md** — her oturum başında oku.
- Genel tanıtım (dondurulmuş onboarding): docs/arsiv/PROJECT_STATUS.md — güncel durum İÇİN DEĞİL (bkz. 09-DURUM). ⚠️ GÜNCELLEME (2026-08-28, G9-09): kökten `docs/arsiv/`'e taşındı; güncel durum canonical = `docs/kararlar/09-DURUM.md`.
- Detaylı kararlar (konu bazlı): docs/kararlar/00-INDEX.md (buradan ilgili konuya git)
- Geçmiş raporlar: docs/raporlar/
- **PO'nun elle yapacakları (kod dışı: Dokploy/SMTP/Neon/env): docs/otonom/03-PO-ELLE-ISLER.md** — ⚠️ GÜNCELLEME (2026-09-19): W+X denetimlerinden çıkan, kodla çözülemeyen işler burada; ajan bunları kuyruğa yazmaz, PO tek tek yapar.
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
- ⚠️ **Merge SIRASI (2026-08-28'de yaşandı, bkz. Faz 1b):** backend PR merge → **çatı pointer re-bump → çatı PR merge.**
  Çatı PR'ı pointer düzeltilmeden merge edilirse main, backend **feature-commit'ini** gösterir (ağaç DOĞRU kalır — kod sağlam —
  ama pointer **sarkar**). Düzeltme: temiz main'den ayrı `chore(pointer)` PR'ı ile `main` HEAD'e re-bump. Sarkma zararsızdır
  (feature-commit backend main'in atası) ama temiz değildir → tek turda kapat.

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
  > ⚠️ **ÇELİŞKİ (2026-09-21):** Bu satır ("canlı ve lokal **AYNI Neon**") ile aşağıdaki **"Ortam / Veritabanı — PROD ≠ DEV ≠ TEST"** bölümünün PROD satırı ("docker-compose Postgres, **Neon değil**") birbirini yalanlıyor. PO Dokploy'da `DATABASE_URL`'in hangi sunucuyu gösterdiğini teyit edecek. **O zamana kadar EN KÖTÜ DURUMU varsay: migration/seed öncesi yedek ZORUNLU.** — takip: `docs/otonom/03-PO-ELLE-ISLER.md` (en üstteki teyit maddesi) · kanıt: `docs/raporlar/kesif/devir-analizi-2026-09-21.md`.
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
  > ⚠️ **ÇELİŞKİ (2026-09-21):** Bu satır ("PROD: docker-compose Postgres, **Neon değil**") ile yukarıdaki **"⚠️ CANLI = LOKAL AYNI DB"** bölümünün ilk satırı ("canlı ve lokal **AYNI Neon**") birbirini yalanlıyor. PO Dokploy'da `DATABASE_URL`'in hangi sunucuyu gösterdiğini teyit edecek. **O zamana kadar EN KÖTÜ DURUMU varsay: migration/seed öncesi yedek ZORUNLU.** — takip: `docs/otonom/03-PO-ELLE-ISLER.md` (en üstteki teyit maddesi) · kanıt: `docs/raporlar/kesif/devir-analizi-2026-09-21.md`.
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
### ⭐ KALICI KURAL — tarihsel iz satırın İÇİNDE tutulmaz (2026-09-21)
**İlke:** Tarihsel iz **korunur** ama **satırın içinde birikmez.** Satırda yalnız **güncel durum** + bir `geçmiş: bkz. <yer>` atfı durur. Üstü çizili eski zincir, belgenin sonundaki **`## GEÇMİŞ`** bölümüne ya da arşive taşınır. ⛔ **Hiçbir şey silinmez — yer değiştirir.**
**Neden:** "eskiyi silme, üstünü çiz" kuralı satırın İÇİNDE uygulandığı için satır her güncellemede büyüyor, hiç küçülmüyor. Ölçüm (2026-09-21): `docs/` altında 1.000 karakteri aşan **74 satır**; en uzunu `00-KARAR-TAKIP.md` madde 101 satırı = **6.460 karakter** (4 kuşak düzeltme, geçerli bilgi ~200 karakter). Tablo hücresinde bu, okunamaz demektir. Dağılım: `09-DURUM.md` 38 · `00-KARAR-TAKIP.md` 30 → **%92'si iki dosyada.**
**Uygulama:**
1. **1.000 karakter** tavandır; düzeltme eklerken aşılıyorsa **önce** taşıma yapılır.
2. Satırda yalnız son geçerli hâl kalır, sonuna `· geçmiş: bkz. GEÇMİŞ §<anahtar>` eklenir.
3. Üstü-çizili zincir **tek karakter değiştirilmeden** `## GEÇMİŞ` altına `### §<anahtar>` başlığıyla yapıştırılır; tarihler ve `~~biçim~~` korunur.
4. `<anahtar>` = kalıcı numara (md.101, S35, G1-23…) — atıf ağının omurgası, asla değişmez (`10-yol-tamamlananlar.md:10-13`).
5. `09-DURUM.md` gibi ters-kronolojik belgelerde taşıma yeri `docs/arsiv/09-DURUM-gecmis-katmanlar-<tarih>.md`.
6. ⛔ **Taşıma denetimi ZORUNLU:** `kalan + taşınan = önceki toplam` (satır VEYA karakter) kapanış raporunda **sayıyla** gösterilir; tutmuyorsa **taşıma geri alınır.**

**"Belge Düzeltme Deseni" ile ÇELİŞMEZ — onu tamamlar:** Düzeltme Deseni **"ne yazılır"**ı söyler (eski cümle silinmez, `~~[ESKİ]~~` + `⚠️ GÜNCELLEME`); bu kural **"nerede durur"**u söyler. İz silinmez, biçimi bozulmaz; yalnız satırdan bölüme iner ve satırda ona giden bir atıf kalır. `belge-duzeni-rehberi` KURAL 6 (silme yok) ve KURAL 7 (statü tek yerde) ile de çelişmez.

### ⭐ KALICI KURAL — AKTİF İŞ KAYNAĞI TEKTİR (2026-09-21)
**Kural:** Aktif iş kaynağı **tektir: `docs/otonom/00-KUYRUK.md`.** Yeni planlama/öncelik belgesi **AÇILMAZ.** Yeni bir iş kaynağı bulunursa (eski yol haritası, bilanço listesi, denetim raporu) kalemleri **kuyruğa devredilir** ve kaynak **📸 DONDURULUR** — taşınmaz, silinmez, yeniden adlandırılmaz.
**Tek istisna:** kod değiştirilerek çözülemeyen işler → `docs/otonom/03-PO-ELLE-ISLER.md`.
**Gerekçe (2026-09-21):** altı ayrı planlama belgesi birikmişti (`10-yol-haritasi` · `00-CIKIS-PLANI` · `00-ONCELIK-SIRASI` · `00-KARAR-TAKIP` · `00-KART-INDEKSI` · `00-KUYRUK`) ve otonom motor yalnız kuyruğu okuduğu için **PO'nun "en öncelikli" dediği içerik bloğu (madde 138-160) 21 gün hiçbir tura girmedi.** Kaynak: `docs/raporlar/kesif/devir-analizi-2026-09-21.md` §0.2.
**Uygulama:** Bir belge iş kaynağı olmaktan çıkarılırken başına (a) 📸 damgası, (b) *"devir kanıtı: hangi kalemler kuyruğun hangi aşamasına gitti"*, (c) *"takip artık nerede"* tablosu yazılır. `00-KARAR-TAKIP` istisnadır: **emekli edilmez, rolü daralır** (karar/söz/ölü-kod geçmişi orada kalır, iş takibi kuyruğa geçer).


## Belge düzeni — KURAL 1-16
Tek canonical: `docs/kararlar/konu/belge-duzeni-rehberi.md` (KURAL 1-16, tam gövde).
Belge oluşturur/düzenlerken oraya bak; kuralların tamamı orada.

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
- ⭐ **KOMŞU UÇ KARŞILAŞTIRMASI** *(2026-09-21, güvenlik konseyi — yeni kural değil, bu listeye tek madde)*:
  Yeni ya da değişen her uç için: **kimlik OTURUMDAN mı alınıyor** (istek gövdesinden DEĞİL) ·
  sahiplik kontrolü · tenant izolasyonu · onay kapısı — **aynı ailedeki KOMŞU UÇ ile karşılaştır.**
  Komşuda olan koruma burada yoksa, **bu bir bulgudur.**
  *(Gerekçe: 11 güvenlik bulgusunun 9'unda doğru koruma aynı dosyada ya da aynı ailede ZATEN VARDI,
  yalnız bir yolda uygulanmamıştı — okuma korunuyor/yazma korunmuyor, ikiz uç korunuyor/eski uç
  korunmuyor. Kanıt: `docs/raporlar/kesif/konsey-guvenlik-kvkk-2026-09-21.md` §0.)*
- KASITLI public olan endpoint'ler (⚠️ GÜNCELLEME 2026-09-21, V-09 — kod-teyitli tam liste;
  eski liste 10 ucu atlıyordu → denetimlerde yanlış "fazlalık" alarmı doğuruyordu):
  **auth:** `POST /api/auth/register` · `/login` · `/refresh` · `/logout` · `/forgot-password` ·
  `/reset-password` · `GET /api/auth/:provider` (+`/callback`, OAuth) ·
  **platform:** `POST /api/platform/auth` · `/logout` ·
  **onboarding/kurum:** `GET /api/invitations/:token/join` · `GET /api/tenants/self-serve/check-slug` ·
  `POST /api/tenants/self-serve/register` · `GET /api/tenants/unsubscribe` ·
  **diğer:** `POST /api/suspicion-reports` · `GET /health` · `GET /uploads/**` (statik, CSP-sandbox).
  Hepsi rate-limitli. **Bunun DIŞINDA public endpoint YOK** — yeni public uç eklenirse buraya eklenir.
  (Kanıt: `authRoutes.ts:21-56` · `platformRoutes.ts:34-35` · `invitationRoutes.ts:13` ·
  `selfServeRoutes.ts:23-38` · `suspicionRoutes.ts:9` · `server.ts:60,71`.)

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
## RTK — token-tasarruflu komutlar
Komutları `rtk` ile önekle (`rtk git`, `rtk tsc`, `rtk vitest`, `rtk grep`…). ⛔ **AKTİF, kullanmaya devam et.**
Tam komut listesi ve tasarruf oranları: `docs/kararlar/konu/rtk-komut-rehberi.md`.
<!-- /rtk-instructions -->
