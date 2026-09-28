> 🧊 ARŞİV — CLAUDE.md'den taşınan ESKİ/katman metinleri (AYNEN). Aktif dosyada yalnız GÜNCEL kural durur.
> Kural: PO kararı K-A (2026-09-26) · OTONOM-PROMPT.txt § AKTİF/ARŞİV AYRIMI (e). Git geçmişi + bu arşiv = denetim izi.

# CLAUDE.md — KURAL GEÇMİŞİ

## OTONOM · Nedir · taşındı 2026-09-27

```text
PO (ürün sahibi) kod yazmaz ve her adımda onay veremez. *(⚠️ GÜNCELLEME 2026-09-26, YN-13: kişi adı kaldırıldı — § Kişi Adı Yasağı.)* İş artık sohbetten değil **dosyalardan** yürür.
```

## OTONOM · MERGE POLİTİKASI (atıf notu) · taşındı 2026-09-27

```text
~~[ESKİ · 2026-09-19] `CLAUDE.md:8`'deki **"PR aç, MERGE ETME"** kuralı ve `CLAUDE.md:35`'teki akış bu bölümle güncellenmiştir.~~
⚠️ **GÜNCELLEME (2026-09-21): atıf hedefleri kaymıştı —** bu bölümün güncellediği gerçek satırlar **`CLAUDE.md:178`** ("PR aç, MERGE ETME", bu turda üstü çizildi) ve **`CLAUDE.md:207`** ("PR açılır → CI yeşil → merge") akışıdır. Bugün `:8` = "PO kod yazmaz…", `:35` = "Şema/migration değişikliği YOK" — başka içerik. (Satır numaraları 2026-09-21 itibarıyladır.)
```

## OTONOM · MERGE POLİTİKASI (kontrol listesi maddesi) · taşındı 2026-09-27

```text
- [ ] auth / KVKK / matching dosyalarına dokunulmadı
```

## OTONOM · MERGE POLİTİKASI (3 renk → 4 renk) · taşındı 2026-09-27

```text
~~[ESKİ · 2026-09-26] **🟡 işler** (riskli/geniş): PR'da durur, merge edilmez.~~
⚠️ **GÜNCELLEME 2026-09-26 (PO): 4 renk** — tam metin `docs/otonom/OTONOM-PROMPT.txt` Bölüm 7 / 7b:
```

## OTONOM · MERGE POLİTİKASI (🟢 parantezi) · taşındı 2026-09-27

```text
- **🟢 işler**: ajan yapar + merge eder (varsayılan). Auth/yetki · KVKK/rıza · matching/skorlama dosyasına dokunuyorsa bağımsız inceleme "SONUÇ: ONAY" + negatif test şartı kendiliğinden eklenir (yukarıdaki listenin "auth / KVKK / matching dosyalarına dokunulmadı" maddesi yerine).
```

## OTONOM · DEĞİŞMEYEN İKİ KURAL (seed güvenli liste) · taşındı 2026-09-27

```text
   Güvenli olanlar: ~~`seed-questions`~~ (silindi 2026-08-23, bkz. :263 — § CANLI = LOKAL AYNI DB), `seed-learning-journey`, `seed-certification`, `seed-test-tenant`
```

## OTONOM · SİLME PROTOKOLÜ (adım 5) · taşındı 2026-09-27

```text
   ~~[ESKİ · 2026-09-26] Karantina 🟡'dır, gerçek silme 🔴'dır.~~
   ⚠️ GÜNCELLEME 2026-09-26 (PO): Karantina 🔵'dır (PO'nun tek "EVET"i), gerçek silme 🔴'dır (İKİNCİ onay).
```

## OTONOM · Karar kartı sayısı · taşındı 2026-09-27

```text
> ⚠️ GÜNCELLEME (2026-09-19): Önceki turlarda uygulanan **"en fazla 5/10 yeni kart"** sınırı KALDIRILDI.
> Gerekçe (PO): bastırılan karar, PO'nun göremediği tıkanma üretir. Eski "≤5/≤10" ifadeleri artık geçerli değil.
```

## OTONOM · MOD ETİKETİ (KARE ≠ DAİRE) · taşındı 2026-09-27

```text
⛔ **KARE ≠ DAİRE.** ~~[ESKİ · 2026-09-26] 🟢 🟡 🔴 daireleri `00-KUYRUK.md`'de **kapı** anlamındadır
(🟢 yap+merge · 🟡 yap+PR · 🔴 karar bekler).~~
⚠️ GÜNCELLEME 2026-09-26 (PO): 🟢 🔵 🟡 🔴 daireleri `00-KUYRUK.md`'de **kapı** anlamındadır
```

## Çalışma Sözleşmesi (merge kuralı) · taşındı 2026-09-27

```text
- ~~[ESKİ · 2026-09-10 öncesi] **PR aç, MERGE ETME**: merge kararı kullanıcınındır. Push + PR yeterli.~~
  ~~[ESKİ · 2026-09-26]⚠️ **GÜNCELLEME (2026-09-21): doğrusu —** kapıya göre: **🟢 → doğrulama listesi tamsa MERGE ET** · **🟡 → PR aç, merge etme** · **🔴 → KARAR cevapsızsa dokunma.** — kanıt: `CLAUDE.md:25-45` (MERGE POLİTİKASI) · `docs/otonom/00-KUYRUK.md:6-16` · `docs/otonom/OTONOM-PROMPT.txt:151-152`. ⚠️ Bulut oturumu (claude.ai/code) **hiçbir kapıda merge edemez** (`CLAUDE.md:163`) — orada "PR aç, merge etme" **aynen geçerlidir**.~~
  ⚠️ **GÜNCELLEME 2026-09-26 (PO): 4 renk —** **🟢 → doğrulama listesi (+ hassas dosyada bağımsız inceleme ONAY + negatif test) tamsa MERGE ET** · **🔵 → hazırla, PR + EVET/HAYIR kartı; PO "EVET"i + tarihli yedek olmadan merge etme** · **🟡 → yalnız PO eli; kod kısmı 🟢 gibi, PO kısmı `03-PO-ELLE-ISLER.md`** · **🔴 → KARAR cevapsızsa dokunma.** — kanıt: `docs/otonom/OTONOM-PROMPT.txt` Bölüm 7/7b · `docs/otonom/00-KUYRUK.md` § Kapılar. ⚠️ Bulut oturumu (claude.ai/code) **hiçbir kapıda merge edemez** (§ Bulut oturumu farkı) — orada "PR aç, merge etme" **aynen geçerlidir**.
```

## Proje Hafızası (PROJECT_STATUS) · taşındı 2026-09-27

```text
- Genel tanıtım (dondurulmuş onboarding): docs/arsiv/PROJECT_STATUS.md — güncel durum İÇİN DEĞİL (bkz. 09-DURUM). ⚠️ GÜNCELLEME (2026-08-28, G9-09): kökten `docs/arsiv/`'e taşındı; güncel durum canonical = `docs/kararlar/09-DURUM.md`.
```

## Proje Hafızası (03-PO-ELLE-ISLER) · taşındı 2026-09-27

```text
- **PO'nun elle yapacakları (kod dışı: Dokploy/SMTP/Neon/env): docs/otonom/03-PO-ELLE-ISLER.md** — ⚠️ GÜNCELLEME (2026-09-19): W+X denetimlerinden çıkan, kodla çözülemeyen işler burada; ajan bunları kuyruğa yazmaz, PO tek tek yapar.
```

## Branch Akışı · taşındı 2026-09-27

```text
- ~~[ESKİ · 2026-09-25] Her iş feature branch'te yapılır: `git checkout -b feat/xxx`~~
  ⚠️ **GÜNCELLEME 2026-09-25 (PO):** YALNIZ `docs/` altını değiştiren commit'ler doğrudan main'e push edilebilir. Kod, schema, script, CI, Dockerfile ve package dosyaları HER ZAMAN dal + PR ile gider (`git checkout -b feat/xxx`).
```

## CANLI = LOKAL AYNI DB (çelişki paragrafı, 1. kopya) · taşındı 2026-09-27

```text
  > ⚠️ **ÇELİŞKİ (2026-09-21):** Bu satır ("canlı ve lokal **AYNI Neon**") ile aşağıdaki **"Ortam / Veritabanı — PROD ≠ DEV ≠ TEST"** bölümünün PROD satırı ("docker-compose Postgres, **Neon değil**") birbirini yalanlıyor. PO Dokploy'da `DATABASE_URL`'in hangi sunucuyu gösterdiğini teyit edecek. **O zamana kadar EN KÖTÜ DURUMU varsay: migration/seed öncesi yedek ZORUNLU.** — takip: `docs/otonom/03-PO-ELLE-ISLER.md` (en üstteki teyit maddesi) · kanıt: `docs/raporlar/kesif/devir-analizi-2026-09-21.md`.
```

## CANLI = LOKAL AYNI DB (seed güvenli liste) · taşındı 2026-09-27

```text
  Güvenli: seed-questions.ts, seed-learning-journey.ts, seed-test-tenant.mjs.
  > ⚠️ GÜNCELLEME (2026-08-23): `seed-questions.ts` **SİLİNDİ** (backend `5745e0f`, "ölü/çelişen seed-questions.ts kaldır")
  > — artık güvenli listede DEĞİL. Kod-kanıtlı **gerçek güvenli** liste (yalnız `upsert`, `deleteMany` YOK):
  > `seed-certification.ts` · `seed-learning-journey.ts` · `scripts/seed-test-tenant.mjs`.
  > **Tehlikeli = `prisma/seed.ts`** (`npm run seed` = `tsx prisma/seed.ts`) — satır 300-307'de toplu `deleteMany()` (userResponse/feedback/meeting/matchRequest… siler). ASLA çalıştırma.
```

## Ortam / Veritabanı (çelişki paragrafı, 2. kopya) · taşındı 2026-09-27

```text
  > ⚠️ **ÇELİŞKİ (2026-09-21):** Bu satır ("PROD: docker-compose Postgres, **Neon değil**") ile yukarıdaki **"⚠️ CANLI = LOKAL AYNI DB"** bölümünün ilk satırı ("canlı ve lokal **AYNI Neon**") birbirini yalanlıyor. PO Dokploy'da `DATABASE_URL`'in hangi sunucuyu gösterdiğini teyit edecek. **O zamana kadar EN KÖTÜ DURUMU varsay: migration/seed öncesi yedek ZORUNLU.** — takip: `docs/otonom/03-PO-ELLE-ISLER.md` (en üstteki teyit maddesi) · kanıt: `docs/raporlar/kesif/devir-analizi-2026-09-21.md`.
```

## Model Yönlendirme · taşındı 2026-09-27

```text
> ⚠️ GÜNCELLEME (2026-08-28, G9-15): Model isimleri (sürüm/sınıf) ve "basit iş→hafif model" ilkesi bu bölümden
> ÇIKARILDI — model seçimi her turun promptunda belirtildiği için belgede sabitlenmesi yalnız eskiyen bilgi üretiyordu.
```

## Belge Senkronizasyonu (2026-08-11 notu) · taşındı 2026-09-27

```text
> ⚠️ GÜNCELLEME (2026-08-11): Eski "iş bitince 09-DURUM güncellenir" kuralı bu **atlanamaz bitiş adımıyla**
> güçlendirildi (kararlar yazılıp unutuluyor sorununu kökten önlemek için). İçerik kaybı yok — genişletildi.
```

## Güvenlik · KASITLI public uçlar (başlık notu) · taşındı 2026-09-27

```text
- KASITLI public olan endpoint'ler (⚠️ GÜNCELLEME 2026-09-21, V-09 — kod-teyitli tam liste;
  eski liste 10 ucu atlıyordu → denetimlerde yanlış "fazlalık" alarmı doğuruyordu):
```

## PO KARARLARI 2026-09-26 (5c atfı eklenmeden önce) · taşındı 2026-09-27

```text
Tam metin: `docs/otonom/OTONOM-PROMPT.txt` Bölüm 5b. Özet: sık okunan dosyalarda eski metin arşive AYNEN taşınır, aktif dosyada `~~[ESKİ]~~` katmanı bırakılmaz (K-A) · ajan kodda doğruladığı hata için `AJ-` satırı açıp kapıya göre işler (K-C).
```

## DEĞİŞMEYEN İKİ KURAL + CANLI = LOKAL AYNI DB (seed "güvenli" listesi) · taşındı 2026-09-27 (AJ-08 7b bulgusu: seed-certification pasifleştiriyor)

```text
   Güvenli olanlar: `seed-learning-journey`, `seed-certification`, `seed-test-tenant` (`seed-questions` 2026-08-23'te silindi — § CANLI = LOKAL AYNI DB)
  Kod-kanıtlı güvenli liste (yalnız `upsert`, `deleteMany` YOK): `seed-certification.ts` · `seed-learning-journey.ts` · `scripts/seed-test-tenant.mjs` (`seed-questions.ts` 2026-08-23'te silindi, backend `5745e0f`).
```

## Güvenlik Kuralları · KASITLI public uç listesi · eski satır 403 ve 409 · taşındı 2026-09-27 (AJ-27: `/api/auth/reapply` eklendi)

```text
  `/reset-password` · `GET /api/auth/:provider` (+`/callback`, OAuth) ·
  (Kanıt: `authRoutes.ts:21-56` · `platformRoutes.ts:34-35` · `invitationRoutes.ts:13` ·
```

## Güvenlik Kuralları · KASITLI public uç listesi (devam) · eski satır 408, 410 · taşındı 2026-09-27 (AJ-27 7b: rate-limit kapsamı + kayan kanıt satırları)

```text
  Hepsi rate-limitli. **Bunun DIŞINDA public endpoint YOK** — yeni public uç eklenirse buraya eklenir.
  `selfServeRoutes.ts:23-38` · `suspicionRoutes.ts:9` · `server.ts:60,71`.)
```

## MOD ETİKETİ + Belge senkronu — SONA (satır numarası atıfları) · taşındı 2026-09-27 (AJ-46 · YN-10: satır atfı → bölüm adı)

```text
`CLAUDE.md:4-5`'teki "Mod bildir" kuralının görsel karşılığı:
`CLAUDE.md:126` "her turun sonunda belge senkronu" kuralı otonom turda şöyle uygulanır:
```

## YN-14 birleştirmeleri (B.4-4/5/6/7/9) · taşındı 2026-09-27 (AJ-46)

> Aynı kural birden çok yerde yazıyordu; her biri TEK yerde bırakıldı, diğer yerlerde atıf. Kural ANLAMI değişmedi.
> Aşağıda her bloğun CLAUDE.md'deki ESKİ metni AYNEN (yeni hâli CLAUDE.md'de).

### B.4-4 · MERGE POLİTİKASI kontrol listesi (TEST_DATABASE_URL maddesi)

```text
- [ ] ⚠️ `TEST_DATABASE_URL` yoksa entegrasyon testleri guard'la DURUR → **bunu "yeşil" sayma.**
      Bu durumda asıl kanıt CI'dır; CI yeşil değilse merge YOK. (KURAL 14: CI YEŞİL ≠ TEST KOŞTU)
```

### B.4-4 · verify ↔ CI farkı (TEST_DATABASE_URL — tek kaynak yapıldı)

```text
- `npm run verify` backend entegrasyon testlerini `TEST_DATABASE_URL` guard'ına tabi koşar. Lokalde TEST_DATABASE_URL
  YOKSA testler guard'la DURUR (canlı Neon'a truncate atmaz) → yeşil sanma; asıl kanıt CI'dadır.
```

### B.4-4 · Ortam / Veritabanı (Test satırı)

```text
- **Test**: `TEST_DATABASE_URL` (izole DB) beklenir. Yoksa guard (`assertTestDatabase.ts`) devreye girer — canlı
  Neon'a TRUNCATE atılmaz, suite durur.
```

### B.4-5 · Paralellik — şerit sistemi (şüphe kuralı)

```text
⛔ Bir şerit başka şeridin dosyasına DOKUNMAZ. Ortak dosya gerekiyorsa işler SIRALI yapılır.
Şüphede: SIRALI. Bozuk kod, hızlı koddan pahalıdır.
```

### B.4-5 · Koşullu Paralellik (son madde)

```text
- Paralel başlatmadan ÖNCE parçaların gerçekten bağımsız olduğunu doğrula. Şüphede kalırsan sıralı git:
  doğruluk ve güvenlik hızdan önce gelir.
```

### B.4-6 · Belge senkronu — SONA, tek sefer (gövde)

```text
§ Belge Senkronizasyonu — ZORUNLU BİTİŞ ADIMI'ndaki "her turun sonunda belge senkronu" kuralı otonom turda şöyle uygulanır:
her iş sonrası DEĞİL, **kuyruğun sonunda TEK PR** (K-20). Ajan `00-KARAR-TAKIP.md`'ye
**numara VERMEZ**, "aday" etiketiyle yazar; eski satırları silmez, üstünü çizer.
Gerekçe: son bir ayda belge muhasebesi tur bütçesinin büyük kısmını yedi; ürün büyümedi.
```

### B.4-6 · Belge Senkronizasyonu — ZORUNLU BİTİŞ ADIMI (madde 3 + bitiş)

```text
  3. **Güncelleme gerekmiyorsa** (ör. salt-okuma PLANLA turu veya durumu değiştirmeyen iş) **→** bu AÇIKÇA belirtilir:
     "belge güncellemesi gerekmedi: [neden]".
- Bu adım atlanırsa **tur EKSİK sayılır** — kapanış raporunda belge-senkron durumu her zaman belirtilir.
```

### B.4-6 · Karar-Takip Disiplini KURAL 2 (gövde bitiş listesine taşındı)

```text
- **KURAL 2 — Tur sonunda GÜNCELLE (zorunlu bitiş adımı):** Her BYPASS (iş yapan) tur bitişinde `00-KARAR-TAKIP.md`
  güncellenir: tamamlanan iş ✅'a çekilir **(yalnız KOD GERÇEĞİYLE doğrulanarak — belge asla koddan önce "yapıldı"
  demez)**, yarım kalan 🟡 olarak nedeniyle işaretlenir, turda çıkan yeni iş/karar 🔴 satır olarak EKLENİR.
  Gerekmiyorsa açıkça "karar-takip güncellemesi gerekmedi: [neden]" denir. Atlanırsa **tur EKSİK sayılır.**
```

### B.4-6 · Karar-Takip Disiplini (09-DURUM/10-yol ilişkisi son satırı)

```text
  Yukarıdaki "Belge Senkronizasyonu" bitiş adımı geçerliliğini korur; bu ona EK bir adımdır.
```

### B.4-7 · Submodule Senkronizasyonu (Sıra)

```text
- Sıra: backend commit → backend push → çatı repo `git add backend` → çatı commit → çatı push.
```

### B.4-7 · Merge sonrası pointer bump (Merge SIRASI maddesi — sıra tekrarı)

```text
- ⚠️ **Merge SIRASI (2026-08-28'de yaşandı, bkz. Faz 1b):** backend PR merge → **çatı pointer re-bump → çatı PR merge.**
  Çatı PR'ı pointer düzeltilmeden merge edilirse
```

### B.4-9 · Çalışma Sözleşmesi (Merge — kapıya göre; 4 renk tekrarı)

```text
- **Merge — kapıya göre (4 renk, PO 2026-09-26):** **🟢 → doğrulama listesi (+ hassas dosyada bağımsız inceleme ONAY + negatif test) tamsa MERGE ET** · **🔵 → hazırla, PR + EVET/HAYIR kartı; PO "EVET"i + tarihli yedek olmadan merge etme** · **🟡 → yalnız PO eli; kod kısmı 🟢 gibi, PO kısmı `03-PO-ELLE-ISLER.md`** · **🔴 → KARAR cevapsızsa dokunma.** — kanıt: `docs/otonom/OTONOM-PROMPT.txt` Bölüm 7/7b · `docs/otonom/00-KUYRUK.md` § Kapılar.
```

### B.4-9 · MERGE POLİTİKASI (4 renk listesi — tanım 00-KUYRUK § Kapılar'da)

```text
**4 renk (PO 2026-09-26)** — tam metin `docs/otonom/OTONOM-PROMPT.txt` Bölüm 7 / 7b:
- **🟢 işler**: ajan yapar + merge eder (varsayılan). Auth/yetki · KVKK/rıza · matching/skorlama dosyasına dokunuyorsa bağımsız inceleme "SONUÇ: ONAY" + negatif test şartı kendiliğinden eklenir.
- **🔵 işler**: migration · seed · canlı veriye yazma · karantina → ajan hazırlar (PR + inceleme ONAY + `01-KARARLAR.md`'de EVET/HAYIR kartı), PO'nun tek "EVET"i + tarihli yedekle merge edilir.
- **🟡 işler**: yalnız PO'nun eliyle yapılabilen iş (sunucu/Dokploy · hesap/anahtar · GitHub ayarı · avukat · kuruma görünen/hukuki metnin onayı); kod kısmı 🟢 kurallarıyla yapılır, PO kısmı `docs/otonom/03-PO-ELLE-ISLER.md`'ye yazılır.
**🔴 işler**: ilgili KARAR cevaplanmadan dokunulmaz.
```

### B.4-9 · Bitti tanımı — tek ölçü (gövde 00-KUYRUK § "Bitti" tanımı'na taşındı)

```text
Bir iş ancak şu üçü varsa ✅:
1. **Kullanıcı görüyor** — ekranda bir şey değişti ya da bir hata kayboldu.
   ⛔ "Backend hazır" · "bileşen yazıldı ama mount edilmedi" · "uç eklendi" → BİTMEDİ.
2. Testler yeşil (yukarıdaki kontrol listesi)
3. `02-ILERLEME.md`'ye yazıldı — dosyalar, PR, ve "kullanıcı artık şunu görüyor" cümlesi

Raporda YAPTIĞINI değil KULLANICININ GÖRECEĞİNİ yaz:
✅ "artık /disc-test açılıyor"   ❌ "loading state düzeltildi"
```

### B.4-9 · 00-KUYRUK.md § "Bitti" tanımı (CLAUDE.md gövdesiyle birleşti; TEK KAYNAK artık burası) · 00-KUYRUK'tan

```text
## "Bitti" tanımı
1. **Kullanıcı görüyor** — ekranda bir şey değişti ya da bir hata kayboldu. "Backend hazır" sayılmaz.
2. **Testler yeşil** — mevcutlar + yeni davranış için en az bir test
3. **02-ILERLEME.md'ye yazıldı** — ne yapıldı, dosyalar, PR, "kullanıcı artık şunu görüyor"
```

## AJ-46 7b düzeltmesi (2026-09-27) — YN-14'te değişen iki CLAUDE.md satırının TAM eski hâli (önceki kayıtta yalnız baş kısmı vardı)

### § Çalışma Sözleşmesi — "Merge — kapıya göre" · eski satır 186 (main)

```text
- **Merge — kapıya göre (4 renk, PO 2026-09-26):** **🟢 → doğrulama listesi (+ hassas dosyada bağımsız inceleme ONAY + negatif test) tamsa MERGE ET** · **🔵 → hazırla, PR + EVET/HAYIR kartı; PO "EVET"i + tarihli yedek olmadan merge etme** · **🟡 → yalnız PO eli; kod kısmı 🟢 gibi, PO kısmı `03-PO-ELLE-ISLER.md`** · **🔴 → KARAR cevapsızsa dokunma.** — kanıt: `docs/otonom/OTONOM-PROMPT.txt` Bölüm 7/7b · `docs/otonom/00-KUYRUK.md` § Kapılar. ⚠️ Bulut oturumu (claude.ai/code) **hiçbir kapıda merge edemez** (§ Bulut oturumu farkı) — orada "PR aç, merge etme" **aynen geçerlidir**.
```

### § Merge sonrası pointer bump — "Merge SIRASI" bloğu · eski satır 236-239 (main)

```text
- ⚠️ **Merge SIRASI (2026-08-28'de yaşandı, bkz. Faz 1b):** backend PR merge → **çatı pointer re-bump → çatı PR merge.**
  Çatı PR'ı pointer düzeltilmeden merge edilirse main, backend **feature-commit'ini** gösterir (ağaç DOĞRU kalır — kod sağlam —
  ama pointer **sarkar**). Düzeltme: temiz main'den ayrı `chore(pointer)` PR'ı ile `main` HEAD'e re-bump. Sarkma zararsızdır
  (feature-commit backend main'in atası) ama temiz değildir → tek turda kapat.
```

## GÖREV 2.4 duruma göre bölme · taşındı 2026-09-28

Karar kartları kart başına dosyaya (`docs/otonom/kararlar/`) ve 🔴 kuyruk satırları `00-KUYRUK-KARAR-BEKLEYEN.md`'ye ayrılınca değişen CLAUDE.md satırlarının TAM eski hâli. OTONOM-PROMPT'ta AYNEN bulunan tekrar metin taraması: 0 blok (CLAUDE.md Türkçe karakterli, OTONOM-PROMPT eski bölümleri ASCII — kelimesi kelimesine eşleşme yok) → atfa dönen metin yok.

### § Üç dosya — tablo satırı 00-KUYRUK

```text
| `docs/otonom/00-KUYRUK.md` | Sıralı iş listesi, şerit dağılımı, kapılar | PO ekler · ajan yalnız Durum/Not günceller |
```

### § Üç dosya — tablo satırı 01-KARARLAR

```text
| `docs/otonom/01-KARARLAR.md` | Ürün kararı kuyruğu | Ajan SORU ekler · **yalnız PO CEVAP yazar** |
```

### § Karar kartı biçimi — ilk cümle

```text
Ürün kararına gelince `01-KARARLAR.md`'nin SONUNA ekle, işi ATLA, DURMA. Şablon:
```

### § Karar kartı sayısı — madde 3 İNDEKS

```text
  3. **İNDEKS** — `01-KARARLAR.md`'nin BAŞINDA içindekiler tablosu tutulur.
```

## GÖREV 2.4 düzeltme — § Belge Senkronizasyonu 09-DURUM notu 0.4 ile tutarlı · taşındı 2026-09-28

```text
> ⚠️ PO 2026-09-26: `09-DURUM.md` ve `00-KARAR-TAKIP.md` 2026-09-20'den beri güncellenmiyor; genel belge taraması yapılana kadar otonom turlar bu iki dosyaya yazmaz — tur sonu kaydı `docs/otonom/00-SIMDI.md` + `02-ILERLEME.md`.
```
