# BİLANÇO KARAR DOSYALARI — OKUMA REHBERİ & MUTABAKAT (Tur-5b)

**📸 DONDURULMUŞ (2026-08-27)** — Tur-5b bilanço karar dosyalarının okuma dizini (üst-etiket eklendi: G9-10, 2026-08-28).

**2026-08-27** · PO'nun tek tek işaretleyeceği karar kartlarının ana dizini. Her grup ayrı dosya; her kalem bir kart + `[ ]` kutucukları.

> **Nasıl kullanılır:** Her kartta 4 kutu var — `[ ] işleme al` · `[ ] şimdilik alma` · `[ ] geçersiz` · `[ ] anlamadım / açıkla` — birini işaretle, gerekirse `[ ] PO notu:` satırına yaz. Sıralamak (öncelik) senin işin; kartlar öncelik sırasında DEĞİL.

## Grup dosyaları + önerilen okuma sırası
> Sıra pratik (önem değil): önce kararları diğerlerini açan/kilitleyen gruplar.

| sıra | dosya | konu | kart | ✅ (kart yok) | toplam |
|:---:|---|---|:---:|:---:|:---:|
| 1 | `G9-belge-surec.md` | Belge düzeni / çalışma tarzı / süreç | 16 | 11 | 27 |
| 2 | `G10-olu-kod-terk.md` | Ölü kod / yarım özellik / terk adayları | 25 | 4 | 29 |
| 3 | `G1-guvenlik-kvkk.md` | Güvenlik / KVKK / hukuk | 30 | 19 | 49 |
| 4 | `G3-icerik.md` | İçerik (sorular, sertifika, öğrenme) | 19 | 6 | 25 |
| 5 | `G6-veri-modeli-borc.md` | Veri modeli / migration / teknik borç | 7 | 0 | 7 |
| 6 | `G2-eslestirme-psikometri.md` | Eşleştirme motoru / psikometri | 11 | 10 | 21 |
| 7 | `G4a-panel-akis.md` + `G4b-panel-akis.md` | Panel & akış (admin/platform/retention) | 39 | 20 | 59 |
| 8 | `G5-bildirim-mail.md` | Bildirim / mail / iletişim | 7 | 0 | 7 |
| 9 | `G7-ux-tasarim.md` | UX / tasarım / erişilebilirlik / SEO | 14 | 1 | 15 |
| 10 | `G8-altyapi-po-manuel.md` | Altyapı / deploy / PO manuel işler | 14 | 3 | 17 |
| 11 | `G11-urun-stratejisi.md` | Ürün stratejisi / vizyon / iş modeli | 2 | 2 | 4 |
| | **TOPLAM** | **11 grup** | **184** | **76** | **260** |

- **PO'nun işaretleyeceği karar kartı: 184** (✅ zaten yapılmışlar kart almaz — her dosyanın sonunda tek-satır liste).
- **Tahmini toplam okuma: ~230 dk** (184 kart × ~1.25 dk).

## ⭐ MUTABAKAT (beyan ↔ yazılan)
Tur-5a sayımı 260 (görünür satır) demişti; katlama (Tur-5a-EK) gerçek tekil ≈**258-259** buldu. Karar dosyaları **SAYIM'ın 260-tabanındaki grup listelerinden** üretildi → toplam **260** (184 kart + 76 ✅).
- **9 grup beyanla BİREBİR tuttu** (G1, G2, G4, G5, G6, G7, G8, G10, G11).
- **2 grupta +1 fark (açıklamalı):** G3 = 25 (katlama sonrası 24 idi; **md.21 sektör-kolonu ikizi** SAYIM listesinde duruyor), G9 = 27 (katlama sonrası 26; **İrlanda-361 ikizi** SAYIM listesinde). Bu 2 ikiz `00-KATLAMA-IZI-2026-08-27.md`'de birincilleriyle bağlı — kartta bir kez daha görünürler, PO tek işaretler. Yani **gerçek tekil 258**, kart-tabanı 260 (fark = bu 2 açık ikiz).

## ⭐ KOD-TEYİDİ SONUCU — bilanço yanlış-pozitifleri (bu turun değerli çıktısı)
PO'nun endişesi ("ön yüzü dolu arkası boş") haklıydı: kartlar yazılmadan önce kod-iddialı kalemler geniş grep'le teyit edildi ve **bilançonun birkaç bulgusu ÇÜRÜDÜ** (madde 124'teki registerMessages/assertTestDatabase gibi). Kartlarda "⚠️ bilanço yanılmış" notuyla düzeltildi:

| kalem | bilanço dedi | KOD gerçeği |
|---|---|---|
| `SjtQuestion`/`SjtOption` (G10) | "0 sorgu, ölü tablo" | **Ölü DEĞİL** — `sjt-scorer.ts` sorguluyor, `/api/scoring` route'undan canlı |
| `rewardPenalty.ts` (G10) | "import izi yok" | **Bağlı** — feedbackLog + meetingCheckIn controller import ediyor |
| Favicon (G7) | "yok, default" | **VAR** — `app/favicon.ico` mevcut |
| OG/Twitter/robots meta (G7) | "iç sayfalar OG'siz" | Ana sayfada **VAR** (`app/page.tsx`) |
| `<html lang>` (G7) | "tr → tr-TR olmalı" | `lang="tr"` **zaten VAR** (yalnız tr-TR ince ayarı) |
| Analytics kodu (G7) | "kod eklendi, build yeşil" | **grep boş** — kod henüz YOK (ters yönde çürüme) |
| Onboarding şablon-seçim (G4) | "ekran yok" | Org-şablonu (`Step2Template`) **VAR**; menti-persona yönü yok (nüans) |
| logoUrl XSS (G1) | "hiç guard yok" | İstemci-tarafı `isSafeLogoUrl` VAR; backend `z.string().url()` zayıf (nüans) |
| `discResultCard` (G10) | "yaz-oku çelişkisi" | FE'de okunuyor — çelişki değil |
| `enneagramWing` (G10) | "hiçbir yerde okunmuyor" | Endpoint echo eder; aktif tüketici yok (nüans) |
| `TenantContext` ikiz (G10) | "iki tanım" | Tek tanım — ikiz iddiası geçersiz |

> **Sonuç:** ~11 kalem düzeltildi/nüanslandı. Bu, "her bulguyu koda karşı doğrula" mekanizmasının değerini kanıtlıyor — PO gerçekten var olmayan işlere zaman ayırmayacak.

## Durum ikonları
✅ YAPILDI (kart yok, liste) · 🟡 YARIM · ⬜ AÇIK · ❓ TEYİT/KARAR GEREK · 🗑️ GEÇERSİZ ADAYI (PO onaylamalı) · 🔵 bilinçli erteleme (v2).

## Kaynak zinciri
Ham kanıt (dosya:satır): `../karar-defteri-2026-08-26.md` · Sayım: `00-SAYIM-2026-08-27.md` · İkiz katlama: `00-KATLAMA-IZI-2026-08-27.md` · Bu rehber = giriş.
