> 🧊 ARŞİV — 03-PO-ELLE-ISLER.md'den taşınan tamamlanmış maddeler ve eski notlar (AYNEN). Kural: OTONOM-PROMPT.txt § AKTİF/ARŞİV AYRIMI · PO K-A 2026-09-26.

# 03-PO-ELLE-ISLER — TAMAMLANAN MADDELER VE ESKİ NOTLAR

## §Başlık altı — "taslak" kurum ACİL maddesi (taşındı 2026-09-27)
> Kaynak: aktif dosyanın başlığının hemen altı (`# 03 — PO'NUN ELLE YAPACAKLARI` girişi).

> ~~[ESKİ · 2026-09-25] ⛔⛔ **ACİL (2026-09-25) — canlıda "taslak" kurum var mı?** Yeni kurum kaydı, sihirbazda logo girilmediyse / renk değiştirilmediyse / platform onayı bekliyorsa "taslak" adımında kalıyordu; her gün çalışan temizlik 96 saati geçen, anlaşması olmayan taslak kurumları **kullanıcılarıyla birlikte siliyor** (`backend/src/services/cronScheduler.ts:181-212`). İleriye dönük düzeltme: menti-mentor-v2 #272. **Senin bakman gereken:** Neon/prod veritabanında `SELECT id, slug, "createdAt", "onboardingStep", "verificationStatus" FROM "Tenant" WHERE "onboardingStep" IN ('TEMPLATE','LOGO','PREVIEW') AND "isActive" = true;` (salt okuma). Satır varsa **KARAR-81**'i cevapla; ajan tarihli yedek alıp düzeltir. Acil güvence istersen Dokploy'da geçici `CRON_ENABLED=false` (tüm zamanlanmış işleri durdurur — KVKK imhası dahil; bkz. V-11).~~
> ✅ **GÜNCELLEME 2026-09-25 (PO): gerek kalmadı — KARAR-81.** Canlıda gerçek kurum yok; mevcut taslaklar test verisi, silinmeleri sorun değil. Sorgu ve `CRON_ENABLED=false` gerekmiyor. İleriye dönük düzeltme kuyrukta: KR-23.

## §"## Ortak doğrulama yolu" — eski `/health` notu (taşındı 2026-09-27)
> Kaynak: `## Ortak doğrulama yolu` bölümünün ilk satırı; güncel hâli (V-01/V-11 İNDİ, `/health` zenginleştirildi) aktif dosyada kalmaya devam ediyor.

~~[ESKİ · 2026-09-19] Çoğu ortam değeri tek yerden görülür: **`GET /health`** → `env` alanı. Bu tur `/health` zenginleştirilirse (Bölüm 6 + V-01/V-04/V-11) SMTP · DB · cron durumu da buradan okunacak.~~

## §"## Karar bekleyenler" — eski "kartlar bu turda açıldı" beyanı (taşındı 2026-09-27)
> Kaynak: `## Karar bekleyenler (kart 01-KARARLAR.md'de — PO cevap yazacak)` bölümü; düzeltme notu ("YANLIŞ BEYAN DÜZELTİLDİ" + "Doğrusu:") aktif dosyada kalmaya devam ediyor.

~~[ESKİ · 2026-09-19] Bu belgedeki bazı işler bir ÜRÜN/HUKUK kararına bağlı. Kartlar bu turda açıldı (KARAR-23+): kurum bildirimleri açılsın mı (§4.1) · hata stack'i panele açılsın mı (§4.2) · yedek nereye (§4.3) · yedek tablo DROP (§4.4) · `mentorVisibilityEnabled` (§4.5) · oryantasyon kilidi engel mi (§9.2) · dış hata izleme servisi kurulsun mu · `LLM_PROVIDER`/OpenAI ölü env silinsin mi.~~

## §"❓ Kod tarafı TEYİT GEREK" — `.dockerignore` ↔ `migrate deploy` maddesi (taşındı 2026-09-27, TAMAMEN kapandı)
> Kaynak: `## ❓ Kod tarafı TEYİT GEREK (ajan bulutta yapamadı, canlı/gerçek hesap ister)` listesinin üçüncü maddesi. Güncelleme notu bu satırın PO işi olmadığını ve `00-KUYRUK.md`'nin V-14 Notu'na taşındığını belgeliyordu ("Buradan çıkarıldı") — madde bütünüyle kapandığı için aktif dosyadan tamamen kaldırıldı.

- ~~[ESKİ · 2026-09-19] `.dockerignore` ↔ `migrate deploy` çelişkisi kurtarmada şema oluşturuyor mu (W §7#28 / V-14, `docker build`).~~ ⚠️ **GÜNCELLEME (2026-09-21): BU SATIR PO İŞİ DEĞİL** — `docker build` lokal/CI'da koşar, Dokploy veya Neon erişimi gerektirmez ⇒ **ajan işi**, `00-KUYRUK.md`'de **V-14** Not'una taşındı. Buradan çıkarıldı.

## Başlık · "Karar bekleyenler" (GÖREV 2.4 kart başına dosya düzeni) · taşındı 2026-09-28

```text
## Karar bekleyenler (kart `01-KARARLAR.md`'de — PO cevap yazacak)
```
