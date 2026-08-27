# BİLANÇO KARAR DOSYASI — G6: Veri modeli / migration / teknik borç

**📸 DONDURULMUŞ** · 2026-08-27 · Tur-5b · Kaynak: `00-SAYIM-2026-08-27.md` (c) G6 başlığı + `karar-defteri-2026-08-26.md` GRUP 8 içindeki veri-modeli kalemleri. Salt-okuma + kod-teyit; kod/DB/PR/commit YOK, mevcut belge değiştirilmedi.

## Mutabakat (beyan ↔ yazılan)

- **Tur-5a beyanı: G6 = 7 kalem.** Canonical `00-SAYIM (c)` G6 listesi de **7 satır** (ana tablo "G6 | 7 | ✅0 🟡0 ⬜6 ❓1"). **BEYAN TUTTU (7=7).**
- **7 kalem dağılımı:** ⬜ 6 · ❓ 1 · ✅/🟡/🗑️/🔵/📌 = 0.
- **Yazılan kart sayısı: 7** (hepsi açık: ⬜ 6 + ❓ 1). **Kart YOK: 0** (bu grupta hiçbir ✅/📌 yok → "zaten yapılmışlar" bölümü boş).
- **Kod-teyidi:** 7/7 kalem kod/şema-gerçeğiyle teyit edildi (schema.prisma + controller grep). **0 çürüdü**, **0 ❓-çözülemez.**
- **Durum dağılımı (bu dosya):** işleme-alınabilir açık = 7 · zaten-yapılmış = 0.
- **PO okuma süresi (tahmini): ~8 dk** (7 kart × ~1.1 dk, teknik yoğun).

> **Not (G6 sınırı):** Bu kalemlerin çoğu 00-SAYIM'da G6 başlığı altında listelenir ama karar-defterinde **GRUP 8 (Altyapı/Teknik-borç)** tablosunda geçer — 00-SAYIM (c) esas alındı. Kod-teyitleri backend `schema.prisma` ve controller'lardan yapıldı.

---

## KARTLAR

---
**[G6-01] N+1 konuşma listesi + pagination'sız listeler**

Ne: `listConversations` her konuşma için ayrı `message.count` + `message.findFirst` sorgusu atıyor (`Promise.all(convos.map(...))`) — klasik N+1. Ayrıca birçok liste endpoint'i pagination'sız.
Neden başlanmıştı: Performans-borç tespiti (canlı-öncesi/sonrası ölçek riski).
Nerede durdu: DURUŞ SEBEBİ YOK (tespit edildi, optimizasyon yapılmadı; canlı-öncesi düşük veri ile fark etmiyor).
Bugünkü durum: ⬜ (N+1 çöz: tek aggregate/JOIN + inbox pagination)
Etkisi: Orta (konuşma sayısı arttıkça O(n) sorgu; DB yükü)
İş boyu: M
Kaynak: karar-defteri GRUP 8 (md.48)
Numara: md.48
⚠️ Kod-teyit: `conversationController.ts:236-261` `listConversations` içinde `Promise.all(convos.map(async c => { message.count(...); message.findFirst(...) }))` — N+1 DOĞRULANDI (konuşma başına 2 ek sorgu, pagination yok).

[x] işleme al   [ ] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu:
---

---
**[G6-02] String→enum dönüşümü (UserReport / InvitationTemplate / Tenant / MeetingCheckIn / MentorshipAgreement) + çift-rol User.role↔Membership**

Ne: Birçok "sınırlı-değer-kümesi" alan Prisma'da `String` + yorum-satırı olarak tutuluyor (gerçek `enum` yerine). Ayrıca rol iki yerde: `User.role UserRole` **ve** `TenantMembership.role` (CLAUDE.md "Membership.role esas") — çift-rol tutarsızlık riski.
Neden başlanmıştı: Şema-borç tespiti; enum tip-güvenliği + tek-rol-kaynağı temizliği.
Nerede durdu: DURUŞ SEBEBİ YOK (migration işi; ertelendi).
Bugünkü durum: ⬜ (string alanları enum'a çevir + çift-rol netleştir/tekilleştir)
Etkisi: Orta (tip-güvenliği, geçersiz-değer riski; çift-rol okuma-tutarsızlığı — güvenlik-akrabası)
İş boyu: M (migration + kod dokunuşu)
Kaynak: karar-defteri GRUP 8 (md.49)
Numara: md.49
⚠️ Kod-teyit (schema.prisma DOĞRULANDI):
- `UserReport.reason String` (:1149 "SPAM|HARASSMENT|...") + `UserReport.status String @default("OPEN")` (:1151) — string.
- `InvitationTemplate.role String` (:1230 "MENTOR|MENTI") + `format String` (:1231 "EMAIL|WHATSAPP") — string.
- `Tenant.plan/onboardingStep/programTemplate/reportingFrequency String` (:162-178) — string.
- `MeetingCheckIn.continueIntent/wantedMore/concernTag/continuationView String` (:553-562) — string.
- `MentorshipAgreement.meetingFrequency/communicationChannel String` (:1193-1194) — string (AMA `status AgreementStatus` :1206 = ZATEN enum, o alan hariç).
- Çift-rol: `User.role UserRole` (:234, enum) + ayrı `TenantMembership.role` (:1054 modeli) — İKİSİ DE mevcut, çift-rol DOĞRULANDI.

[ ] işleme al   [x] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu:
---

---
**[G6-03] onDelete stratejisi tanımsız (çoğu FK RESTRICT); staleDraftCleanup dolu tenant silemiyor**

Ne: Şemada çoğu FK için açık `onDelete` stratejisi yok → Prisma default RESTRICT. Bu yüzden `staleDraftCleanup` içinde veri olan tenant silinemiyor (RESTRICT ihlali). Tenant hard-delete (KVKK Md.7) ile ilişkili.
Neden başlanmıştı: Şema-borç + KVKK tenant-silme ihtiyacı.
Nerede durdu: DURUŞ SEBEBİ YOK (onDelete stratejisi tanımlanmadı; Cascade/SetNull kararı verilmedi).
Bugünkü durum: ⬜ (FK onDelete stratejisi tanımla — Cascade/SetNull/Restrict bilinçli seç)
Etkisi: Orta-Yüksek (tenant hard-delete bloklu = KVKK silme borcu; G1 ile bağlı)
İş boyu: M-L (her FK ilişkisi gözden geçirilmeli + migration)
Kaynak: karar-defteri GRUP 8 (md.49-akraba)
Numara: md.49-akraba
⚠️ Kod-teyit: schema.prisma'da `onDelete` çoğu ilişkide YOK (grep `onDelete`=19 tanım; ~40 model + çok-FK'ya göre çoğu tanımsız → RESTRICT default). `InvitationTemplate.tenant ... onDelete: Cascade` (:1237) gibi az sayıda açık tanım var; çoğu (User/Meeting/VisibilityOptIn FK'ları) tanımsız DOĞRULANDI.

[x] işleme al   [ ] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu:
---

---
**[G6-04] `User.email` global unique (multi-tenant çakışma?) + Meeting index eksik**

Ne: `User.email String @unique` global unique — aynı e-posta iki farklı tenant'ta kayıt olamaz (multi-tenant'ta çakışma olabilir; kasıtlı global-user modeli de olabilir). Ayrıca Meeting'te bazı sorgu-yolları için index eksik (düşük).
Neden başlanmıştı: Şema-tasarım gözlemi (multi-tenant kimlik modeli belirsizliği).
Nerede durdu: DURUŞ SEBEBİ YOK (kasıtlı-mı-borç-mu netleştirilmedi).
Bugünkü durum: ❓ (kasıtlı global-user mı, yoksa `@@unique([tenantId, email])` mı olmalı — PO/mimari kararı)
Etkisi: Düşük-Orta (multi-tenant'ta aynı kişi tek hesap = ürün kararı; Meeting index = perf)
İş boyu: S (karar) / M (uygulama+migration)
Kaynak: karar-defteri GRUP 8 (NUMARASIZ)
Numara: NUMARASIZ
⚠️ Kod-teyit: `schema.prisma:235 email String @unique` (global, tenant-scope DEĞİL) DOĞRULANDI. Multi-tenant çakışma riski gerçek; ancak bu "tek kişi = tek hesap" bilinçli tasarım da olabilir → ❓ (mimari niyet belgelenmemiş).

[ ] işleme al   [x] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu:
---

---
**[G6-05] Sayfa metinleri merkezileştirme (C17 — dağınık inline string)**

Ne: Kullanıcıya görünen sayfa metinleri kod içine dağınık inline string olarak gömülü; merkezi bir metin/sözlük modülü yok (C17).
Neden başlanmıştı: NİYET var — temiz-kod/i18n hazırlığı (dağınık string tek yerde toplanmalı); madde 47 içinde anıldı, UNUTULDU.
Nerede durdu: DURUŞ SEBEBİ YOK (unutuldu; madde 47 temiz-kod borcunun parçası).
Bugünkü durum: ⬜ (sayfa metinlerini merkezi modüle topla)
Etkisi: Düşük-Orta (sürdürülebilirlik; metin değişikliği çok yerde el gerektirir)
İş boyu: M
Kaynak: karar-defteri GRUP 8 (md.47/C17)
Numara: md.47/C17
⚠️ Not: G9-02 (`registerMessages.ts` belge iddiası) bu kalemin belge-tarafıdır; ikisi ilişkili — merkezileştirme yapılırsa CLAUDE.md iddiası da gerçeğe kavuşur.

[x] işleme al   [ ] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu:
---

---
**[G6-06] Temiz-kod borcu: Zod validate() middleware (~85 kopya/30 dosya) + cookie helper duplike + PII-select 11+ yer**

Ne: Zod doğrulama `.safeParse()` kalıbı ~85 kez 30 dosyada elle tekrarlanıyor (validate() middleware'e çıkarılmalı); cookie helper (`setRefreshCookie`/`clearRefreshCookie`) authController ↔ selfServeController'da duplike; PII-select 11+ yerde kopya.
Neden başlanmıştı: NİYET var — DRY/temiz-kod (madde 47).
Nerede durdu: DURUŞ SEBEBİ YOK (kümülatif borç; ertelendi).
Bugünkü durum: ⬜ (validate() middleware + cookie helper + PII-select ortak yardımcıya al)
Etkisi: Orta (sürdürülebilirlik; kopya kod = tutarsızlık/hata riski)
İş boyu: M-L
Kaynak: karar-defteri GRUP 8 (md.47)
Numara: md.47
⚠️ Kod-teyit: `.safeParse(` grep = **89 kopya / 30 dosya** (bilanço "~85" tutarlı, hatta biraz fazla). Cookie helper: `authController.ts:59-70` `setRefreshCookie/clearRefreshCookie/getRefreshTokenFromCookie` tanımlı + `selfServeController.ts` `setRefreshCookie`/`REFRESH_COOKIE_NAME` = 4 ref (duplike DOĞRULANDI).

[ ] işleme al   [x] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu:
---

---
**[G6-07] Kullanılmayan 5 `@radix-ui/*` paketi (0 import)**

Ne: frontend `package.json`'da 7 `@radix-ui/*` paketi var; yalnız 2'si (label, slot) import ediliyor. 5'i (avatar, dialog, dropdown-menu, separator, toast) 0 import → gereksiz bağımlılık.
Neden başlanmıştı: NİYET var — bağımlılık hijyeni (kullanılmayan paket sil; bundle + audit yüzeyi).
Nerede durdu: DURUŞ SEBEBİ YOK (tespit edildi, kaldırma yapılmadı; build yeşil kalmalı doğrulanmalı).
Bugünkü durum: ⬜ (5 kullanılmayan @radix-ui paketini kaldır + build yeşil teyit)
Etkisi: Düşük (bundle boyutu + npm audit yüzeyi; işlevsel etki yok)
İş boyu: S
Kaynak: karar-defteri GRUP 8 (md.46)
Numara: md.46
⚠️ Kod-teyit: `frontend/package.json:14-20` = 7 @radix-ui paketi. `frontend/src` grep: yalnız `label.tsx` (react-label) + `button.tsx` (react-slot) import ediyor = 2 kullanılan → **5 kullanılmayan (avatar/dialog/dropdown-menu/separator/toast) DOĞRULANDI**.

[x] işleme al   [ ] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu:
---

---

## Bu grupta zaten yapılmışlar (kart YOK)

**Yok.** G6'nın 7 kaleminin tamamı açık (⬜ 6 + ❓ 1); bu grupta ✅ tamamlanmış, 📌 kalıcı-kural veya madde-124'te düzeltilmiş kalem YOK. Beyan (7) ile kart sayısı (7) birebir tuttu.

> **Not (requestMessage DROP — G6 değil, G10):** Görev metni "requestMessage DROP" kalemini G6 kod-teyidi kapsamında andı; ancak `VisibilityOptIn.requestMessage` DROP kalemi 00-SAYIM'da **G10 (ölü kod), md.18/A21, 🔵 bilinçli-erteleme** olarak sınıflanmıştır (bu dosyanın kapsamı DEĞİL). Kod-teyit tamlığı için: `schema.prisma:364 requestMessage String?` HÂLÂ MEVCUT (DROP yapılmamış; menti-driven akışta yazılıyor — canlı, ölü-kolon değil şu an) — G10 kartında değerlendirilir.
