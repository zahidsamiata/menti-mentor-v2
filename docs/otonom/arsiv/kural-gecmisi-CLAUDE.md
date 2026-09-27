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

