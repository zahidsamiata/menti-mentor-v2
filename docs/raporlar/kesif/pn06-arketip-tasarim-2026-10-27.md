> 🔄 YAŞAYAN — PN-06 uygulanırken okunur. TÜR: 🔄 · TAZELEME TETİKLEYİCİSİ: PN-06 PR'ı açılınca.
> Kaynak: KARAR-63 ✅ A (PO NOTU 2026-10-21) · kuyruk satırı PN-06 · tasarım: opus planlama alt-ajanı, 2026-10-27 (salt-okuma, kanıt dosya:satır).

# PN-06 — arketip eşikleri yerine "ana tip + yakın tip" tasarımı (2026-10-27)

## 1. Arketip nerede tutuluyor, kim okuyor
- Kayıt: `UserProfile.archetype` + `archetypeRole` (`backend/prisma/schema.prisma:997-998`, indeks `:1024`); OCEAN puanları `oceanO..N` yanında (`:992-996`). `Match.mentorArchetype/mentiArchetype` eşleşme anındaki kopya (`:1035-1036`).
- Tek yazıcı: `computeAndStoreProfile` (`scoring.service.ts:81-120`) ← `POST /api/scoring/compute-profile` (`sjtScoringController.ts:73`); ön yüz bu ucu çağırmıyor → canlıda çoğu kullanıcıda `archetype = null` olması beklenir (TEYİT GEREK: salt-okuma sayım).
- Okuyanlar: `scoring.service.ts:35-79` (BLOCKED_PAIRS + COMPATIBILITY_MATRIX, `scoring.config.ts:37-48`) ← `createMatchIfEligible` (çağıran yok) · `rankMentorsForMenti` ← `POST /api/scoring/rank-mentors` (ön yüz çağırmıyor) · `sector-scorer.service.ts:99` (çağıran yok); `profile-completeness.service.ts:14` (yalnız null kontrolü); KVKK/log: `gdprService.ts:165,173-174`, `gdprOwnDataExport.ts:100`, `logSanitizer.ts:40`; yönetici eşleşmeler: `adminController.ts:381,431` → `admin/eslesmeler/page.tsx:141,149` (ham kod — IC-14).
- **Canlı sıralama (`matching.ts`, `matchingController.ts:121`) arketipi okumuyor** → kullanıcının gördüğü sıralama DEĞİŞMEZ. Kullanılmayan `/rank-mentors` yolu yalnız ana kod değişen kişide değişir; yakın (ikinci) tip puanlamada ASLA kullanılmaz.
- Kanıt testi: `matching.ts` sıralamasını aynı sahte verilerle iki kez, yalnız `UserProfile.archetype` farklı (M1/M4) koştur → sonuçlar birebir eşit (desen `tests/disc-vector-parse.unit.test.ts:157-167`).

## 2. Yeni sınıflandırıcı
`classifyArchetype(ocean, role) → { primary, secondary, nearCodes, isClose }` (`disc-to-ocean.adapter.ts`); `deriveArchetype` aynı imzayla `primary` döner (`scoring.service.ts:103` değişmez). `ARCHETYPE_THRESHOLDS` (`scoring.config.ts:35`) ve varsayılan M1/m1 satırları (`adapter:49,56`) kalkar.
- Puan: `score_k = 50 + Σ_d u_kd·(x_d − 50)`, `u_k = (P_k − 50)/‖P_k − 50‖₁` — prototipe normalize izdüşüm; prototipin söz etmediği boyut ceza vermez; 0-100 ölçeğinde kalır.
- `ARCHETYPE_CLOSE_GAP = 10` (`scoring.config.ts`; ARK:98-109 "10 puan" kuralı — yargıya dayalı, ampirik değil). `isClose = birinci − ikinci < 10`; eşitlikte sabit kod sırası.

| Kod | Ad | Prototip (o,c,e,a,n; yazılmayan = 50) | Kaynak |
|---|---|---|---|
| M1 | Mimar | o70 c70 | eski kural c>H&&o>H · TAS "yüksek sorumluluk + açıklık" |
| M2 | Ayna | o70 e70 | o>H&&e>H · "açıklık + sıcaklık" |
| M3 | Liman | a80 | a>H · "çok yüksek uyumluluk" |
| M4 | Pusula | c70 a30 | c>H&&a<L |
| m1 | Rotacı | o40 c80 | c>H&&o<MID · "çok yüksek sorumluluk" |
| m2 | Merak Eden | o80 c40 | o>H&&c<L |
| m3 | Denge Arayan | a60 n70 | a>MID&&n>MID · "yüksek duyarlılık" |
| m4 | Yola Çıkan | o60 e70 a30 | e>H&&a<L · TAS O ekler |

Saf DISC köşeleri (elle): mentör D→Pusula (yakın: Ayna) · I→Ayna · S→Liman · C→Pusula (yakın: Mimar); menti D→Yola Çıkan (yakın: Rotacı) · I→Merak Eden (yakın: Yola Çıkan) · S→Rotacı · C→Rotacı.
- Yakın tip ve "şimdilik" OKUNURKEN hesaplanır (saklı `oceanO..N` + `archetypeRole`, SJT düzeltmeleri dahil) → **migration yok**.

## 3. Gösterim
- Bugün kullanıcı eski 4 adlı DISC kartını görüyor (Öncü/Ateşleyici/Yapı Taşı/Kâşif): `onboardingController.ts:53-105` → `ResultStep.tsx:41`, `DiscRecallCard.tsx:58`, `profile/page.tsx:226`. M/m arketip yalnız `compute-profile` yanıtında ve yönetici eşleşmeler sayfasında (ham kod).
- En küçük değişiklik: `compute-profile` yanıtına `archetypeSecondary` · `archetypeClose` · `archetypeNear` (yalnız kod; puan yok — KARAR-60); ön yüzde tek kod→{ad, ikon} sözlüğü (IC-14'ü de kapatır) + "ana tip — yakın tip" bileşeni, `isClose` iken IC-10 / ARK §6 "şimdilik" cümlesi.
- Kuyruk ölçütü ("sonuç kartında") kullanıcı kartının 8 adlı karta geçmesini gerektirir → I-15 / PS-A3 / IC-14 işi.

## 4. Testler
- `tests/disc-to-ocean.unit.test.ts:17-19, 58-70, 84-120` eşik blokları yeniden yazılır.
- Yeni `tests/archetype-classifier.unit.test.ts`: her prototip kendini seçer (isClose false) · hepsi-50 → isClose true, belirli primary · 9.99/10.00 sınırı · DISC simplex ızgarası (0.05): tüm mentör kodları ve m1/m2/m4 bir yerde primary; m3 yalnız SJT `n` düzeltmesiyle · secondary ≠ primary, aynı rol ailesi · ADMIN menti ailesine düşer (`adapter:52`).
- Sıralama değişmezlik testi (§1).
- Mutasyonlar: eski kural geri → "saf I menti = m2" kırmızı · CLOSE_GAP=0 → yakınlık testleri kırmızı · M1/M4 prototipi takası → (a) kırmızı.

## 5. Riskler / PO'ya kalanlar
1. Kapsam: PN-06 = backend + API + yönetici sözlüğü; "kartta görür" ölçütü I-15'e taşınsın (öneri).
2. Denge Arayan (m3) yalnız DISC'ten erişilemez (duyarlılık en çok 55); bugün de böyle. m3'ü uyumluluğa kaydırmak (saf S → Denge Arayan) ürün kararı.
3. Prototip değerleri ve 10 puan yargıya dayalı → psikometri/PO onayı; "kaç kişi şimdilik görür" ölçümü (ARK:109).
4. Saklı arketipler bayat: gösterim okunurken hesaplanır; sıralamada kullanılan sütun bir sonraki `compute-profile`'da tazelenir. Toplu tazeleme betiği 🔵 (PO onayı + tarihli yedek); önce null-olmayan `archetype` satırlarının salt-okuma sayımı.
5. "Şimdilik" metinleri PO onaylı değil (`menti-simdilik-varyantlari.md:51`) ve hâlâ "Kâşif" diyor → KARAR-143 gereği "Merak Eden". Dört varyant `archetypeNear` ister; tek evet/hayır bayrağı yetmez.
6. Gizlilik: yeni alanlar kişilik verisi — `logSanitizer.ts:40` `archetype` alt dizesini yakalıyor mu kontrol edilir; KVKK dışa aktarım/anonimleştirme listelerine eklenir.
