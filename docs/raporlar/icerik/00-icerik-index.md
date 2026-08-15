# İçerik Dökümü — INDEX (2026-08-15)

**📸 DONDURULMUŞ (2026-08-15)** — değerlendirme/test/soru sistemlerinin TAM içerik dökümü. Üst envanter: `../degerlendirme-test-soru-envanteri-2026-08-15.md` (PR #78). Eksik analizi: `../eksikler-derinlestirilmis-2026-08-15.md`.

> Amaç: her testin tüm soru/cevaplarını tam metin arşivlemek + seed (kod) ↔ canlı DB tutarlılığını kanıtlamak.
> Kaynak: seed dosyaları + **canlı DB salt-okuma sayımı** (yalnız `.count()`, sıfır yazma).

## Belgeler
| Belge | İçerik | Canlı sayı | Seed (kod) | Tutuyor mu |
|---|---|---|---|---|
| [disc-sorulari](disc-sorulari-2026-08-15.md) | 20 DISC mizaç sorusu (tam metin) | 20 (16 CORE + 4 DEEPENING) | `seed-questions.ts`: 20 · ⚠️ `seed.ts`: 32 (ayrı set) | ✅ canlı = seed-questions (20); seed.ts'in 32'si canlıda YOK |
| [sertifika-senaryolari](sertifika-senaryolari-2026-08-15.md) | 20 senaryo (10 konu × 2 varyant, tam metin + puan/açıklama) | **5 soru + 20 seçenek** | `seed-certification.ts`: 20 soru + 80 seçenek | 🔴 **TUTMUYOR** — 20'lik banka canlıya seed edilmemiş |
| [ogrenme-yolculugu](ogrenme-yolculugu-2026-08-15.md) | 13 aşama (7 mentör + 6 menti, tam metin) | 13 | `seed-learning-journey.ts`: 13 | ✅ birebir |
| [sjt-sorulari](sjt-sorulari-2026-08-15.md) | 3 SJT sorusu (tam metin + OCEAN ağırlıkları) | 3 + 12 seçenek | `seed.ts`: 3 | ✅ birebir · ⚠️ belge "4 SJT" der |
| [stk-custom-sorular](stk-custom-sorular-2026-08-15.md) | STK-özel sorular | **1** | seed'de 0 | ⚠️ canlıda 1 (envanterin "0"ı düzeltildi) |

## En kritik 3 seed↔canlı farkı
1. 🔴 **Sertifika:** kodda 20 zengin senaryo, canlıda yalnız 5 → zengin banka **deploy edilmemiş** (en önemli).
2. ⚠️ **DISC:** iki çelişen seed kaynağı (`seed-questions.ts` 20 vs `seed.ts` 32); canlı 20 (güvenli olan). Tehlikeli `seed.ts` temizlenmeli.
3. ⚠️ **STK custom:** canlıda 1 soru var (envanter "0" demişti) — kod-canlı farkı.

## DISC-tipine-özel "mentiye yaklaşım" içeriği — HER testte kontrol edildi
| Test | DISC-tipine-özel yaklaşım içeriği |
|---|---|
| DISC soruları | ❌ (kişinin kendi mizacını ölçer) |
| Sertifika | ❌ (genel mentörlük yetkinliği; menti-DISC koşullu değil) |
| Öğrenme Yolculuğu | ❌ (genel rol becerisi) |
| SJT | ❌ (kendi eğilimi; arketip sinyali var ama menti-DISC koşullu değil) |

→ **Hiçbir testte "mentinin DISC tipine göre nasıl yaklaşılır" adaptif içeriği YOK.** En büyük boşluk (bkz. eksikler raporu).
