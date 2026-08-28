# BİLANÇO KARAR DOSYASI — G10: Ölü kod / yarım özellik / terk adayları

**📸 DONDURULMUŞ** · 2026-08-27 · Tur-5b · Kaynak: `00-SAYIM-2026-08-27.md` (c/G10) + `karar-defteri-2026-08-26.md` (GRUP 10)

> **Ne bu:** G10 grubundaki her kalem için PO'nun tek tek karar verebileceği **sade Türkçe karar kartı**. Salt-okuma + kod-teyidi; kod/DB/PR değiştirilmedi. Bu grup en çok "kod-iddiası" taşıyan grup — her "0 import / bağlanmamış / ölü tablo" iddiası GENİŞ grep ile koddan teyit edildi; çürüyenler ⚠️ ile işaretlendi.

---

## DOSYA BAŞI — mutabakat & durum

**Tur-5a beyanı (SAYIM c/G10):** 29 kalem.

**Bu dosyada:** 4 ✅ (kart yok, "zaten yapılmışlar") + **25 karar kartı** = 29. **Beyan TUTTU (29 = 29).**

> ⚠️ **SAYIM (a) ana tablo ile küçük tutarsızlık (dürüst not):** (a) tablosunda G10 satırı ✅4/🟡4/⬜7/❓11 verir (toplam 26) ama 🔵 kolonu G10 için boş (·) bırakılmış. Oysa (c) listesinde **3 adet 🔵** kalem var (md.18 requestMessage-DROP, U2/md.44 matchingInterface, md.45 5-dosya-bundle). 26 + 3 🔵 = 29. Yani (c) listesi tam (29); (a) tablosu G10 için 🔵 sayımını atlamış. Bu dosya (c) listesini esas aldı — 29 kalem tam işlendi.

### Durum dağılımı (bu dosya, 29 kalem)
| durum | adet | kart? |
|---|:---:|---|
| ✅ zaten yapılmış | 4 | HAYIR (aşağıda listelenir) |
| 🟡 yarım | 4 | evet |
| ⬜ açık | 7 | evet |
| ❓ teyit/karar | 11 | evet |
| 🔵 bilinçli erteleme | 3 | evet |
| **TOPLAM** | **29** | **25 kart** |

### Kod-teyidi özeti
- **16 kod-teyidi gereken kalem** GENİŞ grep ile teyit edildi (backend/src + frontend/src + tests; dosya-adı VE import/kullanım; harf-duyarsız).
- **1 ÇÜRÜDÜ (yanlış-pozitif):** `SjtQuestion/SjtOption` "0 prisma query" — aslında **canlı route üzerinden sorgulanıyor** (kart [G10-11], detay aşağıda). Bilanço yanılmış.
- **3 kalem kod-teyidiyle ÇÖZÜLDÜ (❓→netlik):** `mentiRequestController` (dosya YOK = silinmiş), `discResultCard` (FE'de okunuyor = çelişki değil), `rewardPenalty.ts` (bağlı = yanlış-alarm).
- Kalan ❓'lar kod-durumu netleşse de **KARARI PO'nundur** (bilinçli terk mi, ürün mü) — kod tek başına çözmez.

### PO okuma süresi
~28 dk (25 kart × ~1.1 dk).

---

## Bu grupta zaten yapılmışlar (✅ — kart YOK)

Bunlar kod gerçeğiyle doğrulandı, karar gerektirmez — bilgi için listelenir:

- ✅ **`getPairSignal` FE "Risk" rozeti bağlandı** (F1, Aşama 1 / #48/#100) — eşleşme risk sinyali FE'de gösteriliyor.
- ✅ **`iceBreaker.ts` SİLİNDİ** (decommissioned) — dosya kod tabanında YOK; LLM ice-breaker yolu tamamen kaldırıldı.
- ✅ **super-admin router SİLİNMEDİ (testli) ↔ Taraf-2 visibility SİLİNDİ (#35)** — `server.ts:105` super-admin router mount VAR ve testli; Taraf-2 visibility opt-in kaldırıldı. Hakem: kod gerçeği = router yaşıyor.
- ✅ **`run-tuning` / `run-purge` cron manuel tetik** — bilinçli debug amaçlı bırakıldı; ölü kod değil.

---

**[G10-01] Kesin-ölü kod bloğunu sil (llmRetry / TenantContext-ikiz / MeetingScheduler 231-satır)**
Ne: Üç ayrı ölü/atıl parçanın toplu temizliği önerisi: (a) `llmRetry.ts` (84 satır, 0 import), (b) "TenantContext ikiz tip", (c) 231 satırlık kullanılmayan MeetingScheduler bileşeni.
Neden başlanmıştı: NİYET BELGELENMEMİŞ — LLM yolu kaldırılınca artık kod, gelecekteki entegrasyon için "belki lazım olur" diye bırakılmış scaffolding.
Nerede durdu: Silme PO onayı bekliyor (temizlik kararı PO'nundur).
Bugünkü durum: ⬜
Etkisi: Kullanıcıya görünmez; bakım-yükü ve kafa-karışıklığı (yeni geliştirici "bu neden var?" der).
İş boyu: S
Kaynak: SAYIM (c)/G10 · Numara: md.44
⚠️ kod-teyidi: `llmRetry.ts` = 84 satır, **0 import** teyitli (yalnız kendi içinde `fetchWithRetry` tanımı). `MeetingScheduler.tsx` = **231 satır** teyitli, 0 import (bkz. [G10-22]). **"TenantContext-ikiz" ÇÜRÜK-ADAYI:** kodda `TenantContext` tipinin **yalnız TEK tanımı** var (`types.ts`) — "ikiz" ikinci tanım bulunamadı (ya zaten temizlendi ya da middleware-içi inline `req.tenant` tipiydi). llmRetry+MeetingScheduler ölü doğrulandı; ikiz-tip iddiası artık geçersiz.
⚠️ ilişkili: [G10-08] (llmRetry ayrı kart), [G10-22] (MeetingScheduler bundle)

🟡 **YARIM — GÜNCELLEME (2026-08-28, Faz 1b, backend PR #56 + çatı PR #129):** Demetin 3 parçasından yalnız 1'i temizlendi:
- **(a) llmRetry.ts → ✅ SİLİNDİ** (backend PR #56; 0 import kod-teyitli, tüketici `matchReason.ts` silinmiş).
- **(c) MeetingScheduler.tsx → ⬜ SİLİNMEDİ (yarım özellik, satır 57'deki "ölü" nitelemesi düzeltildi):** backend `/availability` endpoint'i (`meetingRoutes.ts:34`) GERÇEKTEN var; bileşen backend enum'larıyla birebir eşleşiyor + `onSaveAvailability`/`onBook` callback'leri bağlanmak için tasarlanmış → **ölü değil, bağlanmayı bekleyen özellik.** Silme değil (bağla/PO kararı; zaten [G10-20] "şimdilik alma"da izleniyor).
- **(b) TenantContext-ikiz → 🗑️ GEÇERSİZ** (tek tanım var, ikiz iddiası çürük — kartın kendi kod-teyidi).

[x] işleme al   [ ] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---

**[G10-02] `VisibilityOptIn.requestMessage` ölü kolonu DROP et**
Ne: `VisibilityOptIn` tablosundaki `requestMessage` kolonu atıl görünüyor (menti artık mesajını `MatchRequest` aşamasında yazıyor); kolon DROP migration adayı.
Neden başlanmıştı: Eski akışta menti opt-in sırasında mesaj yazıyordu (Akış B); akış `MatchRequest.requestMessage`'a taşınınca bu kolon geride kaldı.
Nerede durdu: Bilinçli ertelendi (🔵) — DROP migration + PO onayı gerektiriyor; canlı-öncesi düşük öncelik.
Bugünkü durum: 🔵
Etkisi: Kullanıcıya görünmez; ölü kolon = şema-gürültüsü + gereksiz anonimleştirme adımı.
İş boyu: S
Kaynak: SAYIM (c)/G10 · Numara: md.18/A21
⚠️ kod-teyidi: `requestMessage` KOD'da hâlâ referanslı ama yazan yer YOK — `gdprService.ts` yalnız **anonimleştirmede** null'lar (`visibilityOptIn.requestMessage`), aktif YAZIM yok. Atıl-kolon iddiası teyitli.
⚠️ ilişkili: [G10-09] (aynı desen: yaz-yok/DROP-adayı ikiz kolon)

[ ] işleme al   [x] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---

**[G10-03] `matchingInterface.ts` USER-strategy + Job Board şablonu (kasıtlı-ileride)**
Ne: `matchingInterface.ts` içindeki kullanıcı-stratejisi soyutlaması ve iş-ilanı (Job Board) eşleştirme şablonu — gelecekteki iş-ilanı özelliği için hazırlanmış, şu an uyuyor.
Neden başlanmıştı: `MatchTargetType: USER | JOB_LISTING` polimorfik tasarımı — gelecek iş-ilanı (job board) modülünü desteklemek için soyutlama katmanı kuruldu.
Nerede durdu: Bilinçli ertelendi (🔵) — iş-ilanı ürünü henüz yol haritasında değil.
Bugünkü durum: 🔵
Etkisi: Kullanıcıya görünmez; uyuyan soyutlama, gelecekte bağlanacak.
İş boyu: M
Kaynak: SAYIM (c)/G10 · Numara: U2/md.44
⚠️ kod-teyidi: `matchingInterface.ts` = 100 satır, backend/src'te **0 import** teyitli (dosya var, tüketici yok). "Uyuyan/kasıtlı-ileride" doğru.
⚠️ ilişkili: [G10-22] (aynı dosya md.45 5-dosya bundle'ında da geçiyor — KATLAMA yok, bu kart U2 Job-Board niyetine, [G10-22] genel "yarım-özellik sil-niyeti-yok-eder" bundle'ına odaklı)

[ ] işleme al   [x] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---

**[G10-04] `findMatchesDueForCheckpoint` cron'a bağlı ama LOG-ONLY (gerçek bildirim yok)**
Ne: Kontrol-noktası gelen eşleşmeleri bulan fonksiyon cron'a bağlandı ama şu an yalnız LOG yazıyor; gerçek bildirim/dürtme Aşama 2'ye kaldı.
Neden başlanmıştı: Eşleşme sağlık takibi (belirli günlerde "nasıl gidiyor?" dürtmesi) için altyapı; önce bağlantı+log, sonra gerçek aksiyon planlandı.
Nerede durdu: Aşama 2 (gerçek bildirim) yapılmadı — bildirim altyapısı (push/mail) hazır değil.
Bugünkü durum: 🟡
Etkisi: Kullanıcıya görünmez (log-only); niyet var, aksiyon yarım.
İş boyu: M
Kaynak: SAYIM (c)/G10 · Numara: D1
⚠️ kod-teyidi: `cronScheduler.ts:359` `findMatchesDueForCheckpoint` çağrısı VAR; :340 yorumu "ölü fonksiyonu cron'a bağlar" + LOG-ONLY teyitli. Fonksiyon `feedback.service.ts:71`. Yarım-bağlı doğru.

[ ] işleme al   [x] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---

**[G10-05] Feedback şema alanları yazılmıyor (engagement/goalClarity/periodic*×5)**
Ne: `Feedback` tablosunda 5+ alan (engagementScore, goalClarityScore, periodic* beşlisi) şemada tanımlı ama controller'ın create.data'sında ve Zod'unda YOK → hiç yazılmıyor.
Neden başlanmıştı: Zengin geri-bildirim modeli (mentörün mentiyi çok-boyutlu değerlendirmesi + periyodik kariyer/güven/ağ/özgüven/NPS ölçümü) için şema hazırlandı; form (#7 Aşama 3) inşa edilmedi.
Nerede durdu: FE formu (#7 Aşama 3) yapılmadı; backend controller alanları kabul etmiyor.
Bugünkü durum: 🟡
Etkisi: Kullanıcıya görünmez; şemada boş kolonlar + yarım geri-bildirim modeli. Migration GEREKMEZ (alanlar zaten şemada).
İş boyu: M
Kaynak: SAYIM (c)/G10 · Numara: NUMARASIZ
⚠️ kod-teyidi: `feedbackController.ts:131-150` bu alanları açıkça **destructure ile DIŞLIYOR** (`engagementScore: _e`, `goalClarityScore: _gc`, `periodic*`) + yorum "Mentor→Menti alanları … yazılmıyor". Yaz-yok teyitli.

[ ] işleme al   [x] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---

**[G10-06] `ContextualFeedbackHost` / `MeetingProvider` bağlanmadı**
Ne: Bağlamsal geri-bildirim host bileşeni ve `MeetingProvider` context'i FE'de tanımlı ama hiçbir yerde mount/import edilmiyor; ayrıca `payload.tags` backend şemasında yok.
Neden başlanmıştı: Görüşme sonrası bağlamsal ("şu görüşme nasıldı?") geri-bildirim UX'i — bir görüşme sağlayıcısı (MeetingProvider) + tetikleyici host planlandı.
Nerede durdu: Bileşenler yazıldı ama uygulamaya bağlanmadı; backend `tags` alanı da eklenmedi.
Bugünkü durum: ⬜
Etkisi: Kullanıcıya görünmez (mount yok); yarım FE özelliği.
İş boyu: M
Kaynak: SAYIM (c)/G10 · Numara: F5/F6
⚠️ kod-teyidi: `ContextualFeedbackHost.tsx` (default export) + `MeetingContext.tsx` (`MeetingProvider`/`useMeeting`) tanımlı; her ikisi de **kendi dosyaları dışında 0 import** teyitli. Bağlanmamış doğru.

[ ] işleme al   [x] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---

**[G10-07] `llmRetry.ts` — LLM kaldırıldı, 0 import (atıl)**
Ne: `fetchWithRetry` yardımcısı içeren dosya; LLM yolu silinince tüketicisi (`matchReason.ts`) de silindi → dosya artık 0 import.
Neden başlanmıştı: OpenAI çağrılarında yeniden-deneme (retry) için yardımcı; LLM ice-breaker/match-reason yolu kaldırılınca öksüz kaldı.
Nerede durdu: Silinmedi — "gelecekte LLM entegrasyonu dönerse lazım olur" diye bırakıldı (backend/CLAUDE.md bunu açıkça not eder).
Bugünkü durum: ⬜
Etkisi: Kullanıcıya görünmez; 84 satır ölü scaffolding.
İş boyu: S
Kaynak: SAYIM (c)/G10 · Numara: D2/md.44
⚠️ kod-teyidi: `llmRetry.ts:34` `fetchWithRetry` tanımı; backend/src'te **0 import** teyitli. `matchReason.ts` de yok (silinmiş). Atıl doğru.
⚠️ ilişkili: [G10-01] (aynı dosya md.44 toplu-sil bundle'ında)

[ ] işleme al   [x] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---

**[G10-08] `UserProfile.qualityMultiplier` ikiz alan atıl (canlı = Membership)**
Ne: `UserProfile` tablosunda `qualityMultiplier` kolonu var ama canlı okuma/yazma `TenantMembership.qualityMultiplier`'dan yapılıyor → UserProfile'daki ikiz atıl (DROP migration adayı).
Neden başlanmıştı: Kalite-katsayısı önce UserProfile'da tutuluyordu; kurum-içi rol/sayım kaynağı `TenantMembership`'e taşınınca (bir kullanıcı farklı kurumlarda farklı katsayı) UserProfile kolonu geride kaldı.
Nerede durdu: DROP migration + eski-kod-okuma teyidi PO onayı bekliyor.
Bugünkü durum: ❓
Etkisi: Kullanıcıya görünmez; ölü ikiz kolon + "hangisi doğru kaynak?" kafa-karışıklığı.
İş boyu: S
Kaynak: SAYIM (c)/G10 · Numara: D3
⚠️ kod-teyidi: `qualityMultiplier` tüm canlı okumaları **`TenantMembership`'ten** yapıyor teyitli (matching.ts, scoring.service.ts, adminController.ts, sjtScoringController.ts, certification.service.ts — hepsi membership). `UserProfile.qualityMultiplier` (schema.prisma:970) için kod-okuma bulunamadı → ikiz-atıl doğru.
⚠️ ilişkili: **[G1] qualityMultiplier okuma-kaynağı (K7)** — G1'de "eski-kod eski yerden okuyor olabilir" ❓'sı bu ikiz kolonun tehlikesi; bu kart DROP'a, G1 kartı okuma-kaynağı doğrulamasına odaklı.

[ ] işleme al   [x] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---

**[G10-09] `SjtQuestion` / `SjtOption` tabloları — ⚠️ "ölü tablo" iddiası ÇÜRÜDÜ**
Ne: Bilanço "SjtQuestion/SjtOption tabloları 0 prisma query, ölü-tablo adayı" demişti. **Kod gerçeği: bu tablolar canlı bir route üzerinden sorgulanıyor.**
Neden başlanmıştı: SJT (durumsal muhakeme testi) puanlama — senaryo soruları + seçenekleri tablodan okunuyor.
Nerede durdu: DURUŞ YOK — özellik bağlı ve çalışıyor.
Bugünkü durum: ✅ (ölü DEĞİL — düzeltildi)
Etkisi: Ölü değil; SJT puanlama akışı canlı.
İş boyu: — (aksiyon yok, kayıt düzeltmesi)
Kaynak: SAYIM (c)/G10 · Numara: NUMARASIZ
⚠️ **bilanço yanılmış:** "SjtQuestion/SjtOption 0 prisma query (ölü-tablo)" → **GERÇEK: `sjt-scorer.ts` `prisma.sjtQuestion.findMany` çağırıyor; `sjt-scorer` → `sjtScoringController.ts` (import) → `sjtScoringRoutes.ts` → `server.ts` `/api/scoring` mount.** Yani tablolar canlı route'tan sorgulanıyor. ("Madde 124'te registerMessages/assertTestDatabase böyle çürümüştü" uyarısı bu grupta da gerçekleşti.)

[ ] işleme al   [x] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---

**[G10-10] `PATCH /users/me/social` bağlanmamış — NİYET BELGEDE YOK**
Ne: Sosyal profil güncelleme endpoint'i; niyeti belgelenmemiş, FE tarafında çağrılıp çağrılmadığı belirsizdi.
Neden başlanmıştı: NİYET BELGELENMEMİŞ — muhtemelen kayıt-sonrası sosyal medya/link güncelleme için planlanmış.
Nerede durdu: DURUŞ SEBEBİ YOK — endpoint yazıldı, FE bağlantısı belgelenmedi.
Bugünkü durum: ❓ (PO: bilinçli mi terk mi)
Etkisi: Kullanıcıya görünmez (FE çağırmıyorsa); bağlanmamış endpoint = saldırı-yüzeyi + kafa-karışıklığı.
İş boyu: S
Kaynak: SAYIM (c)/G10 · Numara: md.45/A20
⚠️ kod-teyidi: Route **MOUNT VAR** — `onboardingRoutes.ts:41` `PATCH /users/me/social` + `requireAuth()` + `updateSocialProfile` handler (`onboardingController.ts:455`). Yani "bağlanmamış" = backend'e değil, **FE'ye bağlanmamış** (FE'de `me/social` çağrısı bulunamadı). Backend endpoint canlı ve auth'lu.

[ ] işleme al   [x] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---

**[G10-11] `PATCH /users/:id/self-profile` — `me/profile` ile mükerrer mi?**
Ne: Kendi kaydını güncelleme endpoint'i; mevcut `me/profile` akışıyla işlev-çakışması (mükerrerlik) şüphesi.
Neden başlanmıştı: NİYET BELGELENMEMİŞ — sahibi/ADMIN'in bir kullanıcı kaydını `:id` ile güncellemesi için.
Nerede durdu: Mükerrer mi karara bağlanmadı.
Bugünkü durum: ❓ (PO/keşif kararı)
Etkisi: Kullanıcıya görünmez; iki-yol-aynı-iş = bakım-yükü, hangisi canonical belirsiz.
İş boyu: S
Kaynak: SAYIM (c)/G10 · Numara: A20
⚠️ kod-teyidi: Route VAR — `userRoutes.ts:117-119` `PATCH /users/:id/self-profile` (yorum: "kendi kaydını güncelleyebilir, ADMIN veya sahibi"). Mükerrerlik `me/profile` ile karşılaştırmalı keşif gerektirir (bu kart onu tetikler).

[ ] işleme al   [x] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---

**[G10-12] `/clubs` 7 uç FE'siz — kulüp modülü ürün mü ölü mü?**
Ne: Kulüp (`/clubs`) modülünün 7 endpoint'i backend'de tam ve testli ama FE tarafında hiç kullanılmıyor.
Neden başlanmıştı: Kulüp-tipi tenant (öğrenci kulübü / topluluk) desteği — ayrı bir tenant tipi olarak planlandı. (G1'de "Kulüp-tipi tenant AKTİF EDİLMEZ, avukat kısıtı" notu ilişkili.)
Nerede durdu: Backend inşa edildi + testlendi; FE hiç bağlanmadı (kulüp tipi canlı-öncesi hukuki kısıtla dondurulmuş olabilir).
Bugünkü durum: ❓ (PO: ürün mü / ertele mi)
Etkisi: Kullanıcıya görünmez (FE yok); bakım-yükü + saldırı-yüzeyi (mount'lu endpoint'ler).
İş boyu: M
Kaynak: SAYIM (c)/G10 · Numara: md.41
⚠️ kod-teyidi: `clubController.ts` + `clubRoutes.ts` VAR, `server.ts`'te mount + **testli** (`clubs-idor.test.ts`, `security.test.ts`). FE'de (`frontend/src`) `clubs`/`clubController` kullanımı = **0** teyitli. FE'siz doğru; backend canlı+testli (silme = testleri de siler, PO kararı).
⚠️ ilişkili: **[G1] md.91 Kulüp-tipi tenant aktif-edilmez (avukat kısıtı)** — bu modülün neden dondurulduğunu açıklayabilir.

[ ] işleme al   [x] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[x] PO notu: Kulüp modeli AKTİF — kulüpler STK ile aynı yetkilere sahip, fark yok. ⚠️ G1-13'e bağlı (kulüp-tipi kurum aktif etme + açık beyan).
---

**[G10-13] `/feedback-logs` + `/combination-scores` FE'siz (ML / geri-bildirim paneli)**
Ne: Geri-bildirim logları ve kombinasyon-skorları endpoint'leri backend'de var ama FE'de tüketen ekran yok — muhtemelen bir ML/analiz paneli için.
Neden başlanmıştı: NİYET BELGEDE ZAYIF — DISC-kombinasyon skorlarının ve geri-bildirim sinyallerinin izlendiği bir yönetici/ML paneli planlanmış (rewardPenalty sinyaliyle ilişkili, bkz. [G10-16]).
Nerede durdu: Backend uçları var; FE paneli inşa edilmedi.
Bugünkü durum: ❓ (PO: ürün mü / ertele mi)
Etkisi: Kullanıcıya görünmez; bağlanmamış analiz altyapısı.
İş boyu: M
Kaynak: SAYIM (c)/G10 · Numara: md.42
⚠️ kod-teyidi: `feedbackLogController.ts` + `feedbackLogRoutes.ts` VAR, `server.ts`'te mount teyitli. FE'de yalnız `types/admin.ts`'te **tip tanımı** var (canlı çağrı DEĞİL) → FE-panel yok doğru.
⚠️ ilişkili: [G10-16] (`rewardPenalty.ts` bu feedbackLog akışına bağlı — o AKTİF, panel FE'si değil)

[ ] işleme al   [x] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---

**[G10-14] `/rematch` admin FE aksiyonu yok (push-stub'a bağlı)**
Ne: Yeniden-eşleştirme (`/rematch`) endpoint'i var ama admin panelinde onu tetikleyen FE aksiyonu yok; ayrıca push-bildirim stub'ına bağlı.
Neden başlanmıştı: Bir eşleşme bozulunca/reddedilince adminin "yeniden eşleştir" diyebilmesi için; push bildirimi de planlanmıştı (ama push stub).
Nerede durdu: DURUŞ SEBEBİ YOK — backend uç var, admin FE butonu yok, push gerçek değil (stub).
Bugünkü durum: ⬜
Etkisi: Kullanıcıya görünmez (admin tetikleyemiyor); yarım özellik.
İş boyu: M
Kaynak: SAYIM (c)/G10 · Numara: NUMARASIZ
⚠️ kod-teyidi: `adminController.ts:450` rematch stub referansı; FE'de `/rematch` yalnız `types/admin.ts` + bir testte geçiyor, canlı admin aksiyonu **yok** teyitli.

[ ] işleme al   [x] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---

**[G10-15] `questionController` toplu-yanıt endpoint (hazır, FE çağırmıyor)**
Ne: `POST /api/questions/respond` toplu yanıt endpoint'i backend'de hazır ama FE tek-soru (`/questions/:id/respond`) çağırıyor → toplu uç kullanılmıyor.
Neden başlanmıştı: Toplu import / proje-içi kullanım için saklanmış (controller yorumu "ileride kullanım / toplu import").
Nerede durdu: FE tek-soru akışı tercih etti; toplu uç bağlanmadı.
Bugünkü durum: ⬜
Etkisi: Kullanıcıya görünmez; kullanılmayan endpoint (belgelenmiş "ileride" niyeti var).
İş boyu: S
Kaynak: SAYIM (c)/G10 · Numara: md.70-akraba
⚠️ kod-teyidi: `questionController.ts:335` `submitResponses` (toplu) + yorum ":11 ileride kullanım". FE **tek-soru** `/api/questions/:id/respond` çağırıyor (`discTest.ts:32`), toplu `/questions/respond` çağrısı FE'de **yok** teyitli.

[ ] işleme al   [x] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---

**[G10-16] `rewardPenalty.ts` — ⚠️ "import izi yok" iddiası ÇÜRÜDÜ (bağlı)**
Ne: Bilanço "rewardPenalty.ts import izi yok, yanlış-alarm/bağlı olabilir — teyit" demişti. **Kod gerçeği: bağlı ve aktif.**
Neden başlanmıştı: Geri-bildirim sinyaliyle mentör kalite-katsayısını ödül/ceza olarak güncelleme (`applyFeedbackSignal`).
Nerede durdu: DURUŞ YOK — bağlı ve çağrılıyor.
Bugünkü durum: ✅ (bağlı — yanlış-alarm doğrulandı)
Etkisi: Ölü değil; geri-bildirim → kalite-katsayısı akışı canlı.
İş boyu: — (aksiyon yok)
Kaynak: SAYIM (c)/G10 · Numara: NUMARASIZ
⚠️ **bilanço yanılmış (kendi şüphesini doğruladı):** `applyFeedbackSignal` (rewardPenalty.ts) **iki controller'da import ediliyor** — `feedbackLogController.ts:5` + `meetingCheckInController.ts:5`. Import izi VAR; ölü değil.

[ ] işleme al   [x] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---

**[G10-17] `discResultCard` yaz-oku çelişkisi — ⚠️ ÇÖZÜLDÜ (FE'de okunuyor)**
Ne: Bir raporda "discResultCard okunmuyor" (hayalet), başka yerde "havuzda okunuyor" deniyordu — çelişki. **Kod gerçeği: yazılıyor VE FE'de okunuyor; gerçek çelişki değil.**
Neden başlanmıştı: DISC "Aha Anı" kartı (arketip + skorlar) — kullanıcıya kişilik özetini göstermek için.
Nerede durdu: DURUŞ YOK — tamam.
Bugünkü durum: 🟡→✅ (çelişki yanlış-alarmdı; alan canlı)
Etkisi: Kullanıcıya görünür (FE kartı); çelişki kaydı düzeltilir.
İş boyu: — (kayıt düzeltmesi)
Kaynak: SAYIM (c)/G10 · Numara: NUMARASIZ
⚠️ **bilanço nüansı çözüldü:** `discResultCard` YAZILIYOR (`onboardingController.ts:402-429`), FE'de OKUNUYOR (`lib/api/profile.ts:10`, `types/onboarding.ts:19`), `userController.ts:152` select'te (KARAR 5 rol-maskesiyle). "Hayalet okuma-yok" iddiası yanlıştı; kart-havuz "okunuyor" doğruydu.

[ ] işleme al   [x] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---

**[G10-18] `enneagramWing` — yazılır+echo-edilir ama tüketici yok**
Ne: `enneagramWing` alanı hesaplanır, User'a yazılır ve temperament endpoint'inde echo edilir; ama hiçbir tüketici (FE / eşleştirme) onu OKUMAZ.
Neden başlanmıştı: NİYET BELGEDE ZAYIF — enneagram (mizaç) analizinin bir çıktısı; muhtemelen ileride eşleştirme/gösterim için hesaplanıyor.
Nerede durdu: Hesap+yazım+echo yapıldı ama tüketen yer (FE gösterim / matching okuma) bağlanmadı.
Bugünkü durum: 🟡
Etkisi: Kullanıcıya görünmez (echo edilse de gösterilmiyor); yarım-bağlı alan.
İş boyu: S
Kaynak: SAYIM (c)/G10 · Numara: NUMARASIZ (md.86/101 akrabası)
⚠️ kod-teyidi (VERDİKT: yarım-bağlı, gerçek çelişki DEĞİL): `temperamentAnalysis.ts:64-79` hesaplar+döner; `temperamentController.ts:60,66` echo eder; `User.enneagramWing` (schema:254) yazılır; `gdprService.ts` anonimleştirir. FE'de grep **BOŞ**, `matching.ts`'te **kullanılmaz** teyitli. Yani: temperament endpoint echo eder ama eşleştirme/FE tüketmez — "hiçbir yerde okunmuyor" fazla-kesin, doğru nüans "aktif tüketici yok".

[ ] işleme al   [x] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---

**[G10-19] `mentorVisibilityEnabled` ölü/bağlanmamış PLG alanı**
Ne: `User.mentorVisibilityEnabled` (default true) alanı var ama setter'ı yok ve hiçbir eşleşme sorgusunda filtre olarak okunmuyor → ölü PLG (product-led-growth) alanı.
Neden başlanmıştı: Freemium/PLG mimarisi (madde 75/T7 mentör opt-in) — mentörün görünürlüğünü aç/kapa özelliği; default görünür yapıldı ama filtreleme bağlanmadı.
Nerede durdu: FAZ B'de "K1 değil K2" kararıyla default-true bırakıldı; alan hiçbir eşleşme sorgusunda okunmuyor → opt-in eşleşmeyi bloklamıyor (yan etki: alan ölü).
Bugünkü durum: ❓ (PO: bilinçli mi yarım mı)
Etkisi: Kullanıcıya görünmez; ölü PLG alanı (gösterge var, mantık yok).
İş boyu: S
Kaynak: SAYIM (c)/G10 · Numara: md.86
⚠️ kod-teyidi: `schema.prisma:283` `mentorVisibilityEnabled Boolean @default(true)`; `userController.ts:177` select'te echo edilir; `matching.ts:357-373` (00-CIKIS-PLANI kaydı) hiçbir eşleşme sorgusunda filtre DEĞİL; setter bulunamadı → ölü/echo-only doğru.
⚠️ ilişkili: [G10-18] (aynı desen: yaz/echo var, tüketici/mantık yok)

[ ] işleme al   [x] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---

**[G10-20] 5-dosya yarım-özellik bundle (matchingInterface / profile-completeness / ProfileStrengthCard / TenantSwitcher / MeetingScheduler)**
Ne: Beş ayrı yarım-özellik dosyası — hepsi şema/dosya olarak var ama import edilmiyor (bağlanmadı). Silme, arkalarındaki niyeti de yok eder.
Neden başlanmıştı: NİYET KISMEN BELGELENMEMİŞ — profil-tamlık göstergesi (ProfileStrengthCard/profile-completeness), kurum-değiştirme (TenantSwitcher, çok-tenant kullanıcı için), görüşme planlayıcı (MeetingScheduler), eşleştirme-arayüz soyutlaması (matchingInterface). Hepsi yarım-özellik parçaları.
Nerede durdu: Bileşenler/servisler yazıldı, uygulamaya bağlanmadı.
Bugünkü durum: 🔵 (bilinçli ertelenmiş yarım-özellik demeti)
Etkisi: Kullanıcıya görünmez; 5 uyuyan dosya = bakım-yükü + "sil mi geliştir mi" kararı.
İş boyu: M (her biri ayrı değerlendirme)
Kaynak: SAYIM (c)/G10 · Numara: md.45
⚠️ kod-teyidi: `MeetingScheduler.tsx` (231 satır), `TenantSwitcher.tsx`, `ProfileStrengthCard.tsx` FE'de **kendi dosyaları dışında 0 import** teyitli; `matchingInterface.ts` backend'de 0 import teyitli (bkz. [G10-03]). Bağlanmamış doğru. (Silme = niyet-yok-eder, PO kararı.)
⚠️ ilişkili: [G10-01] (MeetingScheduler md.44 toplu-sil bundle'ında da) · [G10-03] (matchingInterface U2 Job-Board niyetiyle ayrı kart — KATLAMA yok: bu kart 5-dosya bakım-yükü demetine, [G10-03] iş-ilanı ürün-niyetine odaklı)

[ ] işleme al   [x] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---

**[G10-21] `taxonomy.service` / `IndustryNode` — LCA seed'li ama skorlamada kullanılmıyor**
Ne: Sektör taksonomisi (IndustryNode ağacı + LCA/en-yakın-ortak-ata mantığı) seed'li ve `taxonomy.service` bağlı, ama canlı eşleştirme skorlamasında (`matching.ts`) kullanılmıyor.
Neden başlanmıştı: 5-bileşenli sektör skoru (`sector-scorer.service`) için hiyerarşik sektör yakınlığı (IndustryNode ağacında LCA mesafesi) planlandı.
Nerede durdu: `taxonomy.service` → `sector-scorer.service`'e bağlı ama `sector-scorer` `matching.ts` tarafından ÇAĞRILMIYOR (uyuyor) → dolayısıyla taxonomy de canlı skorlamaya girmiyor.
Bugünkü durum: ⬜
Etkisi: Kullanıcıya görünmez; seed'li ama atıl skorlama katmanı.
İş boyu: M
Kaynak: SAYIM (c)/G10 · Numara: NUMARASIZ
⚠️ kod-teyidi: `taxonomy.service.ts` VAR, `onboardingController.ts` + `sector-scorer.service.ts` import ediyor. Ama `matching.ts`'te `taxonomy`/`IndustryNode` **kullanımı YOK** teyitli → canlı skorlama yolunda değil. "sector-scorer bağlı ama matching çağırmıyor" doğru.
⚠️ ilişkili: **[G2] sector-scorer (md.14/İŞ7/U1)** — sektör skoru servisi UYUYOR (`sector-scorer.service.ts` TAM, `matching.ts` çağırmıyor); taxonomy o servisin alt-katmanı. Bu kart taxonomy/IndustryNode'a, G2 kartı sector-scorer'ın matching'e bağlanmasına odaklı.

[ ] işleme al   [x] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---

**[G10-22] `LoginForm.tsx` "Sprint 14 TenantProvider köprüsü" bayat-yorum**
Ne: `LoginForm.tsx` başındaki yorum "AuthProvider'dan TenantProvider'a köprülenecek (Sprint 14'te tam entegrasyon)" — bayat/tamamlanmış-olabilir bir sprint-referansı.
Neden başlanmıştı: Geçmiş bir sprint planlaması; auth→tenant context köprüsü için not.
Nerede durdu: DURUŞ SEBEBİ YOK — yorum kaldı, gerçek durum (köprü kuruldu mu) belirsiz.
Bugünkü durum: ❓ (bayat-yorum temizliği)
Etkisi: Kullanıcıya görünmez; yanıltıcı/bayat yorum (yeni geliştirici "Sprint 14 ne?" der).
İş boyu: S
Kaynak: SAYIM (c)/G10 · Numara: NUMARASIZ
⚠️ kod-teyidi: `LoginForm.tsx:7` "AuthProvider'dan TenantProvider'a köprülenecek (Sprint 14'te tam entegrasyon)" yorumu **mevcut** teyitli. Köprünün kurulup kurulmadığı ayrı keşif ister (yorum-temizliği önce onu gerektirir).

[x] işleme al   [ ] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---

**[G10-23] `mentiRequestController.ts` durumu — ⚠️ ÇÖZÜLDÜ (dosya YOK = silinmiş)**
Ne: Bir kaynak "mentiRequestController VAR" (kart-havuz), başka bir denetim "SİLİNDİ" diyordu — çelişki. **Kod gerçeği: dosya yok, silinmiş.**
Neden başlanmıştı: Menti-talep akışı için ayrı controller; sonradan (muhtemelen `requestController`'a) konsolide edilmiş.
Nerede durdu: Silinmiş — çelişki zaman farkından (eski kaynak "VAR" derken hâlâ vardı).
Bugünkü durum: ❓→🗑️-çözüldü (dosya yok; kayıt "silinmiş" olarak netleşti)
Etkisi: Yok (dosya zaten yok); yalnız çelişkili kayıt düzeltilir.
İş boyu: — (kayıt düzeltmesi)
Kaynak: SAYIM (c)/G10 · Numara: NUMARASIZ
⚠️ **kod-teyidi ile çözüldü:** `backend/src`'te `mentiRequestController` dosyası **YOK** (glob boş) ve hiçbir import yok teyitli. "SİLİNDİ" doğru; "VAR" iddiası bayat (zaman farkı). Menti-talep işlevi `requestController.ts`'te.

[x] işleme al   [ ] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---

**[G10-24] Mentör karar ekranında menti CHAT ilk mesajı (Conversation↔Meeting FK yok) — "KALICI İŞ"**
Ne: Mentörün bir mentiyi onaylama/karar ekranında, mentinin ilk chat mesajını görebilmesi. Ön-koşul (chat/Conversation) hazır ama `Conversation`↔`Meeting` arası FK yok → bu iş inşa edilmedi.
Neden başlanmıştı: Mentörün "bu menti ile neden eşleştim + ilk mesajı" bağlamını karar anında görmesi (dönüşümü artırır) — kalıcı/izsiz bir iş fikri.
Nerede durdu: Chat altyapısı ✅ ama Conversation-Meeting bağı (FK) kurulmadı → iş inşa edilmedi.
Bugünkü durum: ⬜ (🌱 izsiz, "KALICI İŞ")
Etkisi: Kullanıcıya görünür özellik (henüz yok); mentör karar bağlamı eksik.
İş boyu: L
Kaynak: SAYIM (c)/G10 · Numara: NUMARASIZ
⚠️ kod-teyidi: Karar-defteri "ön-koşul (chat) ✅, iş inşa edilmedi, Conversation↔Meeting FK yok" der; bu bir gelecek-iş fikri (ölü kod değil, yapılmamış iş). Ayrıntılı FK-teyidi bu kartın kapsamı dışında (iş henüz yok).

[ ] işleme al   [x] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---

**[G10-25] Profil-düzenleme keşfi (kayıt-sonrası bilgi/foto güncelleme var mı?)**
Ne: Kullanıcının kayıttan sonra profil bilgilerini/fotoğrafını güncelleyebilme yeteneği var mı — bu PLANLA keşfi hiç yapılmamış.
Neden başlanmıştı: NİYET — temel bir ürün yeteneği; ama sistemli keşif yapılmadı (endpoint'ler var mı, FE ekranı var mı belirsiz).
Nerede durdu: Keşif hiç yapılmamış (🌱).
Bugünkü durum: ❓ (keşif kararı)
Etkisi: Belirsiz — eğer güncelleme yoksa kullanıcı takılır (yüksek UX etkisi); önce keşif gerekir.
İş boyu: S (keşif) / ? (bulguya göre iş)
Kaynak: SAYIM (c)/G10 · Numara: NUMARASIZ
⚠️ kod-teyidi (ipuçları — tam keşif ayrı iş): profil-güncelleme uçları KISMEN var ([G10-10] `PATCH /users/me/social`, [G10-11] `/users/:id/self-profile`, ayrıca `me/profile`, F1 foto-upload avatarUrl). Yani altyapı kısmen mevcut ama "kullanıcı gerçekten kendi profilini/fotoğrafını düzenleyebiliyor mu" uçtan-uca keşfi yapılmalı.
⚠️ ilişkili: [G10-10], [G10-11] (bu keşif onların mükerrer/canonical durumunu da netleştirir) · [G4] F1 foto-upload (avatarUrl havuzda)

[x] işleme al   [ ] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[x] PO notu: Kullanıcı kayıt sonrası fotoğrafını/bilgisini değiştirebiliyor mu — önce keşif, sonra iş.
---

## KAPANIŞ — özet

- **Tur-5a beyanı 29 ↔ yazılan: 25 kart + 4 ✅ (kart yok) = 29. TUTTU.**
- **Kod-teyidi:** 16 iddia GENİŞ grep ile teyit edildi.
- **ÇÜRÜYEN (yanlış-pozitif) — 2 adet:**
  1. `SjtQuestion/SjtOption` "0 prisma query / ölü tablo" → **canlı route'tan sorgulanıyor** ([G10-09]).
  2. `rewardPenalty.ts` "import izi yok" → **2 controller'da import, bağlı** ([G10-16]).
- **Kod-teyidiyle ÇÖZÜLEN çelişki — 2 adet:** `discResultCard` (FE'de okunuyor, çelişki değil, [G10-17]) · `mentiRequestController` (dosya YOK = silinmiş, [G10-23]).
- **Nüanslanan (fazla-kesin iddia düzeltildi) — 1:** `enneagramWing` "hiçbir yerde okunmuyor" → temperament endpoint echo eder, aktif tüketici yok ([G10-18]).
- **Kalan ❓'lar:** kod-durumu netleşse de **bilinçli-terk mi / ürün mü** kararı PO'nundur (özellikle /clubs, feedback-logs, me/social, self-profile, mentorVisibilityEnabled).
- **Tereddüt çiftleri çapraz-notlandı (KATLANMADI):** qualityMultiplier ikiz↔[G1] K7 · taxonomy/IndustryNode↔[G2] sector-scorer · matchingInterface [G10-03] (U2 Job-Board)↔[G10-20] (5-dosya bundle).
