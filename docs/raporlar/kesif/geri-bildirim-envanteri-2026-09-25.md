> 🧊 DONMUŞ — rutin turda okunmaz (yalnız bir kalemin geçmişi aranırken, grep ile).
> TÜR: 🧊 · SON DOĞRULAMA: 2026-09-25 (📸 fotoğraf tarihi) · TAZELEME TETİKLEYİCİSİ: KALICI — tazeleme gerekmez (dondurulmuş)
> ⚠️ Bu belge kalemlerin TANIMINI tutar, DURUMUNU TUTMAZ. Güncel durum: `docs/otonom/00-KUYRUK.md`.
> İŞLENME: ⬜ bulgular henüz kuyruğa işlenmedi (hazır satırlar ve kart adayları en sonda)

# GERİ BİLDİRİM / KALİTE MODELLERİ ENVANTERİ + GÖRÜŞME SONRASI SORU İÇERİĞİ

**📸 DONDURULMUŞ** — bu turun kod fotoğrafı.
**Kuyruk işleri:** AN-47 (envanter) · AN-48 (soru içeriği) · **Dal:** `otonom/AN-47-48-geri-bildirim-envanteri-20260925` · **Tarih:** 2026-09-25
**Kod sürümü:** backend `main` @ `5ae0352` · çatı+frontend `main` @ `a662c06`
**Mod:** 🟩 PLANLA — salt-okuma. Kod, veritabanı (DB), şema **değişmedi**; DB'ye **bağlanılmadı** (her "veri birikiyor mu" hükmü yalnız koddan çıkarıldı). Soru metinlerine **dokunulmadı**. Repoya eklenen tek dosya bu belgedir.

---

## PO için — 5 satırlık özet

1. Görüşme sonrası dört ayrı "değerlendirme kutusu" (veritabanı tablosu) var. **Ekrandan gerçekten dolan yalnız biri:** `MeetingCheckIn` (görüşme sonrası kısa değerlendirme, `/meeting-checkin` sayfası). Diğer üçü ekrandan hiç dolmuyor (biri yalnız teknik uçtan dolabiliyor, biri reddedilen bir formdan besleniyor, biri hiç açılmayan bir pencereden).
2. Dolan kutunun cevaplarının çoğu **hiçbir yerde okunmuyor:** "Hedefinize ne kadar yaklaştınız?" puanı, mentörün "menti hazırlıklı mıydı" puanı ve **"Yöneticinize iletmek istediğiniz bir şey var mı?"** notu kaydediliyor ama hiçbir ekranda görünmüyor — yönetici bu notu göremiyor.
3. Yöneticinin NPS/başarı oranı kartı, mentörün "Ortalama NPS" kutusu ve algoritma ayarı, **hiç dolmayan** kutudan (`FeedbackLog`) okuyor → hepsi kalıcı olarak boş; ayrıca bir **ölçek hatası** var (0-10 puanların ortalaması "70 ve üstü başarılı" eşiğiyle kıyaslanıyor — veri gelse bile yanlış karar verir).
4. Sorulan soruların çoğu **memnuniyet** ölçüyor ("ne kadar değerliydi", "nasıldı"). Tek **sonuç** sorusu ("hedefe ne kadar yaklaştın") belirsiz ve okunmuyor; **davranış** sorusu ("geçen sefer konuştuğun adımı attın mı / sonraki adımın ne") hiç yok.
5. Önerilen yeni soruların bir kısmı mevcut alanlara **migration'sız** (veritabanı yapısı değişmeden) yazılabilir; "önceki adımı attın mı" ve "ne değişti" gibi davranış soruları **yeni alan** ister → senin kararın; KARAR-77'nin (iki taraf ayrı kayıt) zaten gerektirdiği migration'la **tek seferde** yapılabilir.

---

# BÖLÜM 1 — AN-47 · Geri bildirim/kalite modelleri envanteri

## 1.0 Kapsam ve yöntem (KURAL 13 — negatif iddia kapsam beyanı)

- **Taranan dizinler:** `backend/src` · `backend/prisma` · `backend/tests` · `backend/scripts` · `frontend/src` (testler dahil, ayrı işaretlendi) · `docs/otonom/00-KUYRUK.md` · `docs/otonom/01-KARARLAR.md`.
- **Aranan terimler (harf duyarsız, iki dil):** `feedbackLog` · `feedback-logs` · `meetingCheckIn` · `check-in` · `check-ins` · `feedback` · `/feedback` · `scoring/feedback` · `matchFeedback` · `feedbackPrompted` · `hasFeedback` · `pair-signal` · `coaching-suggestions` · `npsScore` · `starRating` · `goalAchieved` · `guidanceScore` · `trustScore` · `preparednessScore` · `progressRating` · `continueIntent` · `openNote` · `nextTopicNote` · `wantedMore` · `concernTag` · `continuationView` · `menteePreparedness` · `progressScore` · `rapportScore` · `earlyExit` · `periodic` · `MeetingProvider` · `ContextualFeedbackHost` · `triggerFeedback` · `değerlendirme` · `geri bildirim` · `anket`.
- **Benzer başka model var mı?** Şemadaki 39 modelin adı tarandı (`Rating|Review|Survey|Nps|Reflection|Evaluation|CheckIn|Feedback`). Kalite/geri bildirim taşıyan **yalnız bu dört model** var. Komşu ama farklı işteki modeller: `MatchCombinationScore` (`schema.prisma:534`, geri bildirimden **türetilen** DISC kombinasyon puanı — ham cevap değil), `MentorshipAgreement.mentiGoal` (`schema.prisma:1242`, menti hedefi — soru önerilerinde kullanıldı), `SuspicionReport` (şüphe bildirimi, F-31 ile ilgili, kalite değil).

## 1.1 Tek bakış — ölü mü, canlı mı

| Model | Ne tutar (kısaca) | Ekrandan doluyor mu | Okuyan var mı | Hüküm |
|---|---|---|---|---|
| **MeetingCheckIn** | Görüşme başına, **her taraftan ayrı** kısa değerlendirme (3-4 zorunlu + opsiyonel derin) | ✅ **EVET** — `/meeting-checkin` | Kısmen: yalnız 2 alan (`overallRating`, `continueIntent`) okunuyor | 🟢 **CANLI** (ama cevapların çoğu okunmuyor) |
| **Feedback** | Görüşme başına **tek kayıt**, iki tarafın puanları aynı satırda + dönemlik anket alanları | ❌ **HAYIR** — tek FE yazanı (`/periodic-survey`) her gönderimde reddediliyor, sayfaya bağlantı da yok | Evet: mentör kalite katsayısı (canlı eşleştirmede) + oryantasyon kilidi | 🟠 **YAZILI AMA BESLENMİYOR** (okuyan canlı, yazan kopuk) |
| **FeedbackLog** | Mentör-menti **çifti** başına faz 1 / faz 3 (3. ay) puanı + NPS + hedef başarıldı mı | ❌ **HAYIR** — FE'de çağıran yok; yalnız API ucu (mentör/yönetici) | Evet: yönetici KPI, mentör NPS kutusu, algoritma ayarı, KVKK dışa aktarımı | 🟠 **YAZILI AMA BESLENMİYOR** (okuyan 4 yer, yazan yok → hepsi boş) |
| **MatchFeedback** | **Eşleşme** başına 3./14./30. gün kontrol noktası puanı + erken çıkış | ❌ **HAYIR** — FE penceresi hiç açılmıyor; ayrıca `Match` satırı hiç oluşmadığı için yazılamaz | Yalnız öksüz servis + log-only cron | 🔴 **FİİLEN ÖLÜ** (iki katmanlı kopukluk) |

> ⚠️ "Ölü" burada **"silinsin"** demek DEĞİLDİR. Dördünün de yazılma niyeti belli (bkz. 1.2 "Niyet"). Silme/karantina SİLME PROTOKOLÜ'ne ve PO kararına tabidir; bu belge yalnız harita çıkarır.

## 1.2 Model kartları

### A) `MeetingCheckIn` — `backend/prisma/schema.prisma:586-619`

- **Niyet:** `36746b2` (2026-07-07) "MeetingCheckIn — per-meeting quality feedback with efficiency signal" (görüşme başına kalite geri bildirimi + verimsizlik sinyali).
- **Alanlar:** zorunlu `overallRating` 1-5 · `progressRating` 1-5 · `continueIntent` (EVET/BELIRSIZ/HAYIR) · yalnız mentör `menteePreparedness` 1-5 · opsiyonel `wantedMore` · `nextTopicNote` (500) · `concernTag` · `continuationView` · `openNote` (1000). Benzersizlik: `(meetingId, userId)` → **her taraf kendi kaydını yazar** (`:614`).
- **Kim doldurur:** görüşmenin iki tarafı (mentör + menti); rol kayıttan çıkarılır, istekten değil (`meetingCheckInController.ts:56-63`).
- **Ne zaman / hangi uç:** görüşme `COMPLETED` olduktan sonra (`meetingCheckInController.ts:49-54`) · `POST /api/meetings/:meetingId/check-in` (`meetingRoutes.ts:121-124`) → `upsert` (`meetingCheckInController.ts:65-75`), yani tekrar gönderim üzerine yazar.
- **Frontend:** `frontend/src/app/(dashboard)/meeting-checkin/page.tsx` (soru metinleri `:141-160`, `:203-233`) · API sarmalayıcısı `frontend/src/lib/api/meetings.ts:128-129`. Girişi: `/meetings` sayfasındaki "N görüşme değerlendirme bekliyor → Şimdi Yap" bandı (`meetings/page.tsx:163-172`).
- **Veri birikiyor mu:** ✅ Evet — FE → uç → `upsert` yolu tam.
- **Okuyan yerler:**
  - Makine öğrenmesi sinyali: `overallRating` → DISC kombinasyon puanı (`meetingCheckInController.ts:78-88` → `rewardPenalty.ts`).
  - Yönetici **çift risk sinyali** (YEŞİL/SARI/KIRMIZI): `overallRating` + `continueIntent` (`adminController.ts:393-417`, `pairSignal.service.ts`) → `/admin/eslesmeler` (`eslesmeler/page.tsx:166`). ⚠️ Görüşmenin `matchId`'si üzerinden gruplar; `Match` hiç yazılmadığı için **pratikte boş** (PS-04 / U-18).
  - Yönetici **koçluk önerileri**: kullanıcının kendi check-in ortalaması (`coachingSuggestions.ts:73-100`) → `adminRoutes.ts:60` → `admin/waiting-room/page.tsx:200` (`CoachingSuggestionsDialog`). ✅ canlı.
  - `GET /:meetingId/check-ins` (`meetingCheckInController.ts:103-129`) ve `GET /pair-signal` (`:133-169`): **FE'de çağıran yok** (`meetings.ts:131-136` sarmalayıcı yazılı, kullanan yok).
- **Hiç okunmayan alanlar (kapsam: `backend/src` + `frontend/src`, testler hariç, 0 okuyucu):** `progressRating` · `menteePreparedness` · `wantedMore` · `nextTopicNote` · `openNote` · `concernTag` · `continuationView`. Son ikisi **formda bile yok** (backend kabul ediyor, FE sormuyor).
- **KVKK:** anonimleştirmede serbest metinler siliniyor (`gdprService.ts:144-147`) ✅. ⚠️ **KVKK dışa aktarımına girmiyor** (`gdprService.ts:284-306` yalnız `FeedbackLog`'u alıyor) ve saklama süresi imhası yok (`gdprService.ts:371` yalnız `FeedbackLog`).
- **Hüküm:** 🟢 CANLI — sistemin **fiilî** görüşme değerlendirmesi budur.

### B) `Feedback` — `backend/prisma/schema.prisma:621-661`

- **Niyet:** ilk büyük commit `3e49117` (2026-05-22). Görüşme başına iki yönlü puan (menti→mentör: yönlendirme/kaynak/güven · mentör→menti: hazırlık/proaktiflik/katılım/hedef netliği) + sonradan eklenen "dönemlik derin (ayda bir tetiklenir)" alanları (`:643-648`).
- **Alanlar:** `guidanceScore` · `resourceSharingScore` · `trustScore` · `preparednessScore` · `proactivityScore` · `engagementScore` · `goalClarityScore` · `keyLearnings` · `specificComments` · `periodicCareerGrowth` · `periodicTrustScore` (1-10) · `periodicNetworkScore` · `periodicConfidenceScore` · `periodicNpsScore` (0-10). `meetingId @unique` → **görüşme başına tek kayıt** (KARAR-77 sorunu).
- **Kim doldurur:** görüşmenin tarafları; hangi alanı kim yazabilir kayıttan çıkarılıyor (`feedbackController.ts:69-96`).
- **Ne zaman / hangi uç:** `COMPLETED` sonrası, ilk gönderen kaydı kilitler (`hasFeedback`) · `POST /api/meetings/:meetingId/feedback` (`meetingRoutes.ts:93-97`, `feedbackController.ts:30-151`).
- **Frontend:** Tek çağıran `frontend/src/app/(dashboard)/periodic-survey/page.tsx:54-65`. ⚠️ **Her gönderim 400 ile reddedilir:** sayfa yalnız `periodic*` alanları + `specificComments` gönderiyor; backend doğrulama şeması (`feedbackController.ts:9-28`) `periodic*` alanlarını **tanımıyor** (atıyor) ve "en az bir puan" şartı (`:20-28`) sağlanmıyor. Sayfaya **hiçbir yerden bağlantı yok** (kapsam: `frontend/src`, `periodic-survey` → 0 bağlantı). `engagementScore` · `goalClarityScore` · `keyLearnings` · `guidance/resource/trust/preparedness/proactivity` için **hiçbir FE formu yok** (kapsam: `frontend/src`, 0 sonuç). = KR-11 / KARAR-78.
- **Veri birikiyor mu:** ❌ Ekrandan hayır. Yalnız API'yi doğrudan çağıran biri yazabilir.
- **Okuyan yerler (canlı!):**
  - **Canlı eşleştirmede mentör kalite katsayısı:** `matching.ts:100` → `scoring.ts:127-149` (son 10 kaydın menti→mentör puanları). Veri gelmediği için **her mentörde nötr 1.0** kalır.
  - Kalıcı kalite katsayısı yazımı (`feedbackController.ts:125-136` → `scoring.ts` `persistMentorQualityMultiplier`).
  - **Oryantasyon kilidi:** mentörün hazırlık puanı ≤2 ise menti kilitlenir (`feedbackController.ts:138-148`) → bu yol beslenmediği için **kilit hiç tetiklenmez**; aynı soruyu soran check-in alanı (`menteePreparedness`) ise kilide bağlı değil.
  - `hasFeedback` bayrağı: hatırlatma e-postaları (`cronScheduler.ts:232-257`, `feedbackController.ts:240-294`) ve platform tablosu (`platform/tenants/[id]/_components/MeetingsTable.tsx:70-72`) bunu okur → bkz. 1.4 Y-2.
- **Hüküm:** 🟠 YAZILI AMA BESLENMİYOR. Okuyan taraf canlı eşleştirmeye kadar uzanıyor; yazan taraf kopuk.

### C) `FeedbackLog` — `backend/prisma/schema.prisma:510-532`

- **Niyet:** `3e49117` (2026-05-22) · rota yorumu "ML geri bildirim döngüsü" (`feedbackLogRoutes.ts:15`). KARAR-12 kartı: eşleştirmeyi zamanla iyileştirecek öğrenme döngüsü.
- **Alanlar:** `phase` (1 = 1. ay, 3 = 3. ay) · `starRating` 1-5 · `difficulty` (ZAMAN_UYUMSUZLUGU/BEKLENTI_FARKI/ILETISIM_TARZI/ULASAMADIM; 1-2 yıldızda zorunlu) · `npsScore` 0-10 · `goalAchieved` (EVET/KISMEN/HAYIR; 3. ayda zorunlu). Benzersizlik: `(mentorId, mentiId, phase)` → **çift başına faz başına tek kayıt**.
- **Kim doldurur:** yalnız **MENTÖR** (kendi adına, görüştüğü menti için — GV-05) veya **YÖNETİCİ** (`feedbackLogRoutes.ts:17`, backend main `feedbackLogController.ts:46-68`). Menti yazamaz, göremez (`:134`, `:183`).
- **Ne zaman / hangi uç:** belirli bir tetik **yok**; `POST /api/feedback-logs` (backend main `feedbackLogController.ts:87`).
- **Frontend:** **Yok** (kapsam: `frontend/src`, `feedback-logs|feedbackLog` → yalnız tip/KVKK özet satırları: `types/admin.ts:124`, `lib/kvkkSummary.ts:82`, `lib/api/kvkk.ts:18`; yazan 0). = KARAR-12 "Şu an ne var" ile aynı tespit.
- **Veri birikiyor mu:** ❌ Hayır.
- **Okuyan yerler (4 yer, hepsi boş döner):**
  - Yönetici KPI: toplam sayı + faz bazında ortalama NPS + "başarı oranı" (`adminController.ts:75-104`) → `admin/kpi/page.tsx:88-106`. PS-05 ile "neden boş" açıklaması eklendi ✅.
  - Mentör paneli "Ortalama NPS" kutusu (`mentorMetricsController.ts:83-86` → `mentor/page.tsx:43`) → kalıcı "—".
  - Algoritma ağırlık ayarı (`algorithmTuner.ts:144-160`, `:274-306`) → `admin/algorithm-tuner/page.tsx:272-279`; 3. ay örnek sayısı <10 olduğu için **hiç ayar yapılmaz**.
  - KVKK dışa aktarımı (`gdprService.ts:299-302`) + 3 yıllık imha (`gdprService.ts:371`) + FE KVKK özeti "Görüşme değerlendirmesi: N kayıt" (`frontend/src/lib/kvkkSummary.ts:82`) → kullanıcıya **0 kayıt** gösterir, oysa kullanıcının gerçek değerlendirmeleri `MeetingCheckIn`'de.
- **⚠️ Ölçek hatası (veri gelse bile yanlış sonuç):** `npsScore` 0-10 aralığında (`feedbackLogController.ts:26`). Ortalaması alınıp (`algorithmTuner.ts:156-158`, `adminController.ts:96-100`) **70 / 60 / 50** eşikleriyle kıyaslanıyor (`algorithmTuner.ts:297-306`, yorum `adminController.ts:103`). 0-10 ortalaması asla 50'yi geçemez → yeterli veri olduğunda ayarlayıcı **her zaman** "NPS < 50 → DISC ağırlığını artır" dalına düşer. Gerçek NPS (tavsiye edenler % − eleştirenler %, −100..+100) hesaplanmıyor.
- **Hüküm:** 🟠 YAZILI AMA BESLENMİYOR.

### D) `MatchFeedback` — `backend/prisma/schema.prisma:1165-1182`

- **Niyet:** `de6be04` (2026-07-07, "sprint 8-11"). Eşleşmenin 3., 14., 30. gününde kontrol noktası geri bildirimi; "bu eşleşme bana uygun değil" erken çıkışı.
- **Alanlar:** `checkpoint` (DAY_3/DAY_14/DAY_30) · `role` · `progressScore` 1-5 · `rapportScore` 1-5 · `earlyExit` · `comment`. Benzersizlik: `(matchId, checkpoint, fromUserId)`. ⚠️ `fromUserId` için yabancı anahtar yok (GV-08 kapsamı).
- **Kim doldurur:** eşleşmenin tarafı (MENTOR/MENTI); kimlik ve rol oturumdan (`sjtScoringController.ts:274-280`, `feedback.service.ts:54-64`).
- **Ne zaman / hangi uç:** `POST /api/scoring/feedback` (`sjtScoringRoutes.ts:33-37` → `feedback.service.ts:31-101`). Tetik: log-only cron `runCheckpointFeedbackReminderCron` (`cronScheduler.ts:376-406`) — **bildirim göndermez**, yalnız sayar.
- **Frontend:** `MeetingFeedbackCard.tsx` (soru metinleri `:79-173`) ← `ContextualFeedbackHost.tsx:22-75` ← `MeetingContext.tsx:34-51`. ⚠️ **Hiçbiri bir sayfaya monte edilmemiş:** `MeetingProvider` ve `<ContextualFeedbackHost>` hiçbir yerde kullanılmıyor, `triggerFeedback` hiç çağrılmıyor (kapsam: `frontend/src`, 3 terim, yalnız tanım dosyaları).
- **Veri birikiyor mu:** ❌ İki katmanlı hayır: (1) pencere açılmıyor; (2) açılsa da uç bir `Match` satırı ister (`feedback.service.ts:39-52`) ve `Match`'e yazan akış bağlı değil (U-18: `createMatchIfEligible` → `scoring.service.ts:137`, canlı çağıranı yok).
- **Okuyan yerler:** `profile-completeness.service.ts:52` (servisin kendisi **hiçbir yerden import edilmiyor** — kapsam `backend/src`, 0) · cron sayacı (`feedback.service.ts:103-130`). Ayrıca kart "tags" seçimlerini backend'e hiç göndermiyor (`ContextualFeedbackHost.tsx:58`).
- **Hüküm:** 🔴 FİİLEN ÖLÜ — ama niyeti (eşleşme sağlığını erken yakalamak + erken çıkış) **başka bir yolla kısmen karşılanıyor:** check-in'in `continueIntent = HAYIR` cevabı ve çift risk sinyali aynı işi görmeye çalışıyor. → "eksik özellik" değil **MÜKERRER NİYET** (bkz. 1.3).

## 1.3 "Yanlış soru tuzağı" kontrolü — aynı işi yapan başka yol var mı?

Tek tek "ölü" görünen alanların çoğunun işi **başka modelde zaten soruluyor**. Aşağıdaki eşleme, AN-49'daki birleştirmenin hammaddesidir:

| Ölçülmek istenen şey | MeetingCheckIn (CANLI) | Feedback | FeedbackLog | MatchFeedback |
|---|---|---|---|---|
| Genel memnuniyet | `overallRating` ✅ | — | `starRating` | `rapportScore` |
| Hedefe ilerleme (sonuç) | `progressRating` (okunmuyor) | `goalClarityScore` (formu yok) | `goalAchieved` | `progressScore` |
| Devam niyeti / erken çıkış | `continueIntent` ✅ · `continuationView` (formda yok) | — | — | `earlyExit` |
| Mentinin hazırlığı (mentör gözü) | `menteePreparedness` (okunmuyor) | `preparednessScore` (kilidi tetikler, formu yok) | — | — |
| Mentörün kalitesi (menti gözü) | — (yalnız `overallRating` dolaylı) | `guidance/resourceSharing/trust` (katsayıyı besler, formu yok) | — | chip'ler (gönderilmiyor) |
| Sorun sebebi | `concernTag` (formda yok) · `wantedMore` | — | `difficulty` | — |
| Tavsiye (NPS) | — | `periodicNpsScore` (form reddediliyor) | `npsScore` | — |
| Serbest not | `nextTopicNote` · `openNote` (okunmuyor) | `keyLearnings` · `specificComments` | — | `comment` |

**Sonuç:** Kopukluğun özü "özellik yok" değil, **okuyan ile yazanın farklı kutulara bağlı olması**: kullanıcı cevabını `MeetingCheckIn`'e yazıyor; kalite katsayısı `Feedback`'ten, NPS/başarı/algoritma `FeedbackLog`'dan, profil tamamlama `MatchFeedback`'ten okuyor. Hiçbir okuyucu canlı kutuya bakmıyor (risk sinyali ve koçluk önerisi hariç).

## 1.4 Yan bulgular — kullanıcının gördüğü etkiler

| # | Kullanıcı ne yaşıyor | Kanıt |
|---|---|---|
| Y-1 | `/meetings` sayfasındaki "**N görüşme değerlendirme bekliyor**" bandı **hiç azalmıyor**: tamamlanan her görüşmeyi sayıyor, değerlendirme yapılıp yapılmadığına bakmıyor. "Şimdi Yap" hep **en son** görüşmeye gidiyor → eski görüşmeleri değerlendirmenin ekrandan yolu yok. | `meetings/page.tsx:151-153`, `:172` · liste yanıtında değerlendirme bilgisi yok: `meetingController.ts:263-281` |
| Y-2 | Görüşme kartındaki "**Değerlendirme Yap →**" düğmesi **hiç görünmüyor**: koşul `awaitingMentorApproval === false`, ama liste yanıtında bu alan yok (`undefined`). Ayrıca `!isPast` şartı tamamlanmış (geçmiş) görüşmeyi zaten dışlıyor. | `meetings/page.tsx:39-40`, `:98-103` · `meetingController.ts:263-281` |
| Y-3 | Check-in yapan kişiye de "henüz geri bildirim vermediniz" **hatırlatma e-postası** gidiyor: e-posta `hasFeedback`'e bakıyor, onu yalnız (beslenmeyen) `Feedback` yazıyor. E-postada forma **bağlantı da yok**. | `cronScheduler.ts:239-257` · `feedbackController.ts:116-119`, `:240-294` · e-posta gövdesi backend main `emailService.ts:330-350` |
| Y-4 | Check-in sonrası "kilometre taşı" sayısı **bir fazla** çıkabilir: kod "bu görüşme henüz COMPLETED değil → +1" varsayıyor, oysa backend yalnız COMPLETED görüşmeye check-in kabul ediyor. | `meeting-checkin/page.tsx:38`, `:85-87` · `meetingCheckInController.ts:49-54` |
| Y-5 | Mentör "menti hazırlıksızdı" (1-2) dese de **oryantasyon kilidi tetiklenmez** (kilit beslenmeyen `Feedback`'e bağlı). | `feedbackController.ts:138-148` vs `meeting-checkin/page.tsx:151-157` |
| Y-6 | Canlı eşleştirmede mentör kalite katsayısı **herkeste 1.0** (nötr) — menti puanları hiç ulaşmıyor. | `matching.ts:100` · `scoring.ts:127-149` |
| Y-7 | KVKK "verilerimi indir" çıktısı ve KVKK özeti, kişinin gerçek değerlendirmelerini (`MeetingCheckIn`) **içermiyor**; "Görüşme değerlendirmesi: 0 kayıt" gösteriyor. `MeetingCheckIn` için saklama süresi imhası da yok. | `gdprService.ts:284-306`, `:371` · `frontend/src/lib/kvkkSummary.ts:82` |
| Y-8 | Form "**Yöneticinize iletmek istediğiniz bir şey var mı?**" diyor; yöneticinin bu notu göreceği **hiçbir ekran yok** (`openNote` okuyucusu 0). Kullanıcıya verilen örtük söz tutulmuyor. | `meeting-checkin/page.tsx:233` · okuyucu taraması: yalnız `gdprService.ts:146,194` |
| Y-9 | NPS ölçek hatası (bkz. 1.2 C) — veri geldiği gün algoritma ayarı yanlış yöne döner, "başarı oranı" anlamsız sayı gösterir. | `algorithmTuner.ts:290-306` · `adminController.ts:103-104` |

## 1.5 Kuyruk satırlarıyla karşılaştırma

| Satır / kart | Bu envanterle ilişkisi | Çelişki var mı |
|---|---|---|
| **PS-05** (✅ BITTI) | "Başarı oranı daima boş" → kök: `FeedbackLog` beslenmiyor. Envanter doğruluyor. Ek: veri gelse de **ölçek hatası** (Y-9) var — PS-05 bunu kapsamıyor. | Yok; **ek bulgu** |
| **PS-04** / **U-18** | Çift risk sinyali `MeetingCheckIn` okuyor ama `Meeting.matchId` üzerinden gruplandığı için `Match` yokken boş. `MatchFeedback`'in de aynı kök (Match yok) yüzünden yazılamadığı eklendi. | Yok; **ek bulgu:** U-18 açılınca `MatchFeedback` de yazılabilir hâle gelir → AN-49'dan önce "hangisi kalacak" kararı gerekir |
| **F-31** | Kuyruk Not'u "`FeedbackLog` = görüşme NPS'i" diyor. Doğrusu: `FeedbackLog` = **çift başına faz** puanı (görüşme başına değil) ve ekrandan hiç dolmuyor. F-31'in "ürün geri bildirimi" için bu dört modelden hiçbiri uygun değil — Not'un sonucu (yeni model = migration) **doğru**. | Küçük tanım düzeltmesi |
| **KR-08** / **KARAR-77 = A** | KARAR-77 "iki taraf ayrı kayıt" diyor. `MeetingCheckIn` bunu **zaten** yapıyor (`@@unique([meetingId, userId])`) ve görünürlük kuralı da aynı (`meetingCheckInController.ts:100-102`). KR-08'in migration'ı `Feedback`'e yapılırsa ikinci bir "görüşme başına her taraftan bir kayıt" kutusu doğar. | ⚠️ **ÇELİŞKİ ADAYI** (KR-08 Not'u "önce AN-47'ye bak; çelişki varsa BASARISIZ + sebep" diyor): KR-08'e başlamadan önce PO'ya "`Feedback`'i mi ikiye ayıralım, yoksa `Feedback` puanlarını `MeetingCheckIn`'e mi taşıyalım?" sorulmalı → bkz. kart adayı KA-1 |
| **KR-11** / **KARAR-78** | Envanter A8 bulgusunu doğruluyor (form reddediliyor, bağlantı yok). Ek: dönemlik anketin cevapları `FeedbackLog`'daki `npsScore`/`goalAchieved` ile **aynı işi** görüyor (iki ayrı NPS kutusu). | Yok; **kümeleme notu** (KARAR-44 ↔ KARAR-78 ↔ KARAR-12) |
| **KARAR-12** (cevapsız) | "Check-in çalışıyor, `FeedbackLog` ayrı" tespiti doğru. Eksik olan: KPI/algoritma/mentör NPS'inin **okuyucu** olarak `FeedbackLog`'a bağlı olması — C seçeneği ("dursun") bu okuyucuları kalıcı boş bırakır. | Yok; karta **"Kaybedersin"** eki önerilir |
| **KARAR-44** (cevapsız) | "Hangi memnuniyet verisi gerçek sayılsın" sorusunun cevabı bu envanterle somutlaşır: bugün **tek gerçek veri** `MeetingCheckIn`. | Yok |
| **KARAR-67** (cevapsız) | Yönetici serbest metin nota insin mi? `openNote` metni "Yöneticinize iletmek…" diye soruluyor ama gösterilmiyor (Y-8) → karar cevaplanana kadar **form metni ile davranış çelişik**. | ⚠️ Metin ↔ davranış çelişkisi |
| **KARAR-80/M12** | Sıra "AN-47 → KR-08 · AN-48 aynı migration'a" — bu belge o sıranın ilk adımı. | Yok |
| **AN-49** | Sıra kuralı (GV-08 → Match → kalite görünümü) korunmalı. Bu envanter: birleşik görünümün **tek canlı kaynağı** `MeetingCheckIn`. | Yok |

---

# BÖLÜM 2 — AN-48 · Görüşme sonrası soru içeriği

> ⛔ Aşağıdaki metinler koddan **birebir** alınmıştır; hiçbiri değiştirilmedi. Öneriler yalnız öneridir, PO onaylar.

**Sinyal türleri:** **Memnuniyet** = "beğendin mi" (zayıf: çoğu kişi yüksek verir, neyi düzelteceğini söylemez) · **Davranış** = kişi bir şey **yaptı mı / yapacak mı** (orta-güçlü: doğrulanabilir) · **Sonuç** = ne **değişti** (güçlü: programın asıl amacı) · **Niyet** = gelecekte ne yapmayı düşünüyor (orta: tahmin gücü var, garanti değil).

## 2.1 Mevcut sorular

### A) `/meeting-checkin` — CANLI, veriyi `MeetingCheckIn`'e yazar

| # | Soru metni (birebir) | Kim | Alan | Ölçtüğü | Sinyal | Zayıflık |
|---|---|---|---|---|---|---|
| A1 | "Bu görüşme ne kadar değerliydi?" (1-5 yıldız) — `meeting-checkin/page.tsx:142` | ikisi | `overallRating` | genel memnuniyet | Memnuniyet | Yıldızların ne demek olduğu yazmıyor (3 = "orta" mı "iyi" mi?); tavan etkisi (çoğu 4-5 verir); neyin iyi/kötü gittiğini söylemez. Algoritma sinyali ve risk sinyali **tek başına** buna dayanıyor. |
| A2 | "Hedefinize ne kadar yaklaştınız?" (1-5) — `:147` | ikisi | `progressRating` | hedefe ilerleme | Sonuç (öz-bildirim) | Tek sonuç sorusu ama: (a) **hedef ekranda gösterilmiyor** (menti hedefi `MentorshipAgreement.mentiGoal`'da var); (b) "bu görüşmeyle mi" yoksa "toplamda mı" belirsiz; (c) **mentöre de soruluyor** — mentörün "hedefiniz"i ne? (d) **hiçbir yerde okunmuyor.** |
| A3 | "Menti bu görüşmeye ne kadar hazırlıklı geldi?" (1-5) — `:153` | mentör | `menteePreparedness` | mentinin hazırlığı | Davranış (üçüncü göz) | Güçlü soru türü (başkasının gözlemi), ama "hazırlık" tanımsız (gündem mi getirdi, önceki adımı mı yaptı?). **Okunmuyor**, kilide bağlı değil (Y-5). |
| A4 | "Bir sonraki görüşmeye gelecek misiniz?" — seçenekler "✅ Evet, kesinlikle" · "🤔 Henüz emin değilim" · "❌ Devam etmek istemiyorum" — `:18-20`, `:160` | ikisi | `continueIntent` | devam niyeti | Niyet | İyi erken uyarı; ama "neden" sorulmuyor (HAYIR diyen için takip sorusu yok). Mentöre "gelecek misiniz" ifadesi garip. |
| A5 | "Bu görüşmede daha fazla istediğiniz bir şey var mıydı?" — "Daha fazla yönlendirme / kaynak/öneri / bağlantı / Daha dürüst geri bildirim / Hayır, yeterliydi" — `:22-28`, `:203` | menti | `wantedMore` | karşılanmamış ihtiyaç | Memnuniyet (eksik yönü) | Eyleme dönük iyi soru (mentöre ne değiştireceğini söyler) ama tek seçim ve **okunmuyor**; mentöre hiç ulaşmıyor. |
| A6 | "Bir sonraki görüşmede konuşmak istediğiniz konu?" — `:221` | ikisi | `nextTopicNote` | gelecek gündem | Niyet | "Sonraki **adım**" değil "sonraki **konu**" soruyor (eylem değil sohbet). **Okunmuyor**, karşı tarafa veya sonraki görüşmeye taşınmıyor → yazanın emeği boşa. |
| A7 | "Yöneticinize iletmek istediğiniz bir şey var mı?" — `:233` | ikisi | `openNote` | yöneticiye serbest mesaj | — (kanal) | Yöneticiye ulaşmıyor (Y-8); KARAR-67 ile çelişik. Güven riski: kişi sorun bildirdiğini sanıp yanıt bekler. |
| — | *(formda yok)* | mentör | `concernTag` (MOT_DUSUK/HEDEF_BELIRSIZ/ZAMAN_YOK/ILETISIM/HAYIR) · `continuationView` | mentörün endişe sebebi · devam görüşü | Davranış/niyet | Backend hazır, **FE sormuyor** (`meetingCheckInController.ts:23-24`). |

### B) `/periodic-survey` — KIRIK (her gönderim reddediliyor, bağlantı yok) → `Feedback.periodic*`

| # | Soru metni (birebir) — `periodic-survey/page.tsx` | Alan | Ölçtüğü | Sinyal | Zayıflık |
|---|---|---|---|---|---|
| B1 | "Bu programı bir arkadaşınıza ne kadar tavsiye ederdiniz? (0–10)" — `:96` | `periodicNpsScore` | tavsiye | Memnuniyet (sadakat) | Standart NPS; programı ölçer, ilişkiyi değil. Aynı işi `FeedbackLog.npsScore` da görüyor (iki kutu). Doğru NPS hesabı yapılmıyor (Y-9). |
| B2 | "Mentörünüzle/mentiyle güven ilişkinizi 1-10 puanlayın" — `:122` | `periodicTrustScore` | güven | Memnuniyet (ilişki) | Ölçek 1-10, diğer tüm puanlar 1-5 → karşılaştırılamaz. |
| B3 | "Kariyer hedefleriniz bu süreçte ne kadar netleşti?" — "Çok daha netleşti / Biraz netleşti / Değişmedi / Daha da karmaşıklaştı" — `:17-20`, `:140` | `periodicCareerGrowth` | hedef netliği | **Sonuç** | İyi sonuç sorusu. Ama cevap kodu (ör. `MUCH_CLEARER`) **serbest metin** alanına (2000 karakter, şemadaki soru "…nasıl katkı sağladı?") yazılmaya çalışılıyor → alanın anlamıyla uyumsuz. |
| B4 | "Bu süreçte özgüveniniz nasıl değişti?" — "Çok arttı … Çok azaldı" — `:24-28`, `:158` | `periodicConfidenceScore` | özgüven değişimi | Sonuç (öz-bildirim) | İyi; "neden" yok. |
| B5 | "Yöneticinize iletmek istediğiniz bir şey? (opsiyonel)" — `:176` | `specificComments` | serbest | — | `specificComments` şemada **mentör→menti** yorumu; menti yazarsa backend reddeder (`feedbackController.ts:91-96`). A7 ile aynı "yöneticiye ulaşmıyor" sorunu. |

### C) `MeetingFeedbackCard` — ÖLÜ (hiç açılmıyor) → `MatchFeedback`

| # | Soru metni (birebir) — `MeetingFeedbackCard.tsx` | Alan | Sinyal | Zayıflık |
|---|---|---|---|---|
| C1 | "Görüşme nasıldı?" — 😕 Zayıf · 😐 İdare eder · 🙂 İyi · 😍 Harika — `:23-28`, `:79` | `rapportScore` | Memnuniyet | En düşük seçenek **2** (1 yok) → ölçek yukarı kaymış. |
| C2 | "Ne öne çıktı?" — 👂 İyi dinledi · 💡 Net yönlendirdi · 🎯 Hedefe odaklı · 🤝 Rahat hissettim · ⏰ Zamanı iyi yönetti / 🌀 Dağınıktı · 🧊 Mesafeliydi · 🏃 Acele etti · ❓ Net değildi — `:30-40`, `:99` | (gönderilmiyor) | **Davranış** (mentörün gözlenen davranışı) | **Dört formun en iyi davranış sorusu** — ama seçimler backend'e hiç gitmiyor (`ContextualFeedbackHost.tsx:58`). |
| C3 | "Bu görüşme seni hedefine yaklaştırdı mı?" (Hiç … Çok kaydırıcı) — `:118` | `progressScore` | Sonuç | Kaydırıcı **3'te başlıyor**; dokunmadan geçen "3" kaydeder (varsayılan yanlılığı). |
| C4 | "Eklemek istediğin?" — `:145` | `comment` | — | Genel. |
| C5 | "Bu eşleşme bana uygun değil, farklı birini dene" — `:170` | `earlyExit` | Davranış (çıkış) | Güçlü ama geri alınamaz etki (eşleşmeyi bitirir) tek tıkla. |

### D) Formu olmayan alanlar (yalnız şema yorumu var — kullanıcıya hiç sorulmadı)

`Feedback`: "Yönlendirme kalitesi" · "Kaynak paylaşımı" · "Güven ve güvenlik hissi" · "Hazırlık" · "Proaktiflik" · "Katılım/motivasyon" · "Hedef netliği" · `keyLearnings` · "Bu ilişki kariyer gelişimine nasıl katkı sağladı?" · "Ağ genişlemesi" (`schema.prisma:629-648`). `FeedbackLog`: yıldız · zorluk · NPS · "hedef başarıldı mı" (`feedbackLogController.ts:8-36`).
Not: `keyLearnings` ("ne öğrendin") ve `goalAchieved` (EVET/KISMEN/HAYIR) **sonuç** ölçen iki iyi alan — ikisi de hiç sorulmuyor.

## 2.2 Genel değerlendirme

- **Denge:** canlı formda (A) 7 sorudan **1'i sonuç** (A2), **1'i davranış** (A3, yalnız mentör), gerisi memnuniyet/niyet/serbest metin. Algoritmayı ve yönetici risk sinyalini besleyen tek sayı **memnuniyet** (A1).
- **Döngü kopuk:** "Sonraki görüşmede ne konuşalım" (A6) yazılıyor ama bir sonraki görüşmede **geri sorulmuyor** ("geçen sefer X demiştin, oldu mu?"). Davranış ölçümünün en ucuz yolu bu döngüyü kapatmak.
- **Hedef görünmüyor:** anlaşmadaki menti hedefi (`MentorshipAgreement.mentiGoal`) hazır; soru metnine konursa A2 ölçülebilir hâle gelir.
- **Ölçek karmaşası:** 1-5 yıldız · 1-10 güven · 0-10 NPS · 2-5 emoji · kaydırıcı → modeller arası kıyas yapılamaz.
- **Rol körlüğü:** A2 ve A4 mentöre de aynı cümleyle soruluyor.

## 2.3 Öneriler (uygulama değil — PO onayı gerekir)

"Migration" = veritabanı yapısına yeni sütun eklemek (PO kararı, yedek zorunlu). "Metin değişikliği" = yalnız ekrandaki cümle; kolay geri alınır ama **soru metni değişikliği de PO onayıyla** yapılır (AN-48 kuralı).

| # | Önerilen soru | Kim | Sinyal | Neyi ölçer | Nereye yazılır | Migration |
|---|---|---|---|---|---|---|
| Ö1 | "**Geçen görüşmede '⟨önceki sonraki-adım cevabı⟩' demiştin. Yaptın mı?**" — Evet / Kısmen / Hayır / Vazgeçtim | menti | **Davranış** | Taahhüt edilen adımı uygulama | Yeni alan (ör. `prevStepDone`, EVET/KISMEN/HAYIR/VAZGECTI). Değer kümesi `FeedbackLog.goalAchieved` ile aynı olabilir (tutarlılık). | **VAR** |
| Ö2 | "**Bu görüşmeden sonra atacağın tek somut adım ne?**" (kısa metin) | menti | Davranış (taahhüt) | Görüşmenin eyleme dönüşmesi; Ö1'in girdisi | Teknik olarak mevcut `nextTopicNote` (500) alanına yazılabilir, ama **alanın anlamı değişir** ("konu" → "adım"; eski kayıtlarla karışır) → ya anlam değişikliği PO kararı ya yeni alan (`nextStep`). | Seçeneğe göre yok / VAR |
| Ö3 | A2'nin yeni metni: "**'⟨anlaşmadaki hedefin⟩' hedefine bu görüşme sayesinde ne kadar yaklaştın?**" — 1 = Hiç ilerleme yok · 3 = Biraz · 5 = Belirgin ilerleme (uçlar etiketli) | menti | **Sonuç** | Hedefe ilerleme, görüşmeye bağlı | Mevcut `progressRating` (anlamı aynı kalır, yalnız netleşir). Hedef metni `MentorshipAgreement.mentiGoal`'dan okunur. | **YOK** |
| Ö4 | Mentör için A2 yerine: "**Mentinin hedefine ilerlemesini nasıl görüyorsun?**" (aynı etiketli 1-5) | mentör | Sonuç (üçüncü göz) | İlerlemeye dış bakış; Ö3 ile kıyas (öz-bildirim ↔ gözlem farkı güçlü bir sinyaldir) | Mevcut `progressRating` (rol alanı `role` zaten var → iki görüş ayrışır). ⚠️ Mentör kayıtlarında alanın anlamı "kendi hedefi"nden "mentinin ilerlemesi"ne kayar → eski mentör kayıtları için not düşülmeli. | **YOK** |
| Ö5 | "**Bu görüşmeden sonra senin için ne değişti?**" (çoklu seçim) — Bir konuda netleştim · Bir karar verdim · Yeni bir kaynak/bağlantı edindim · Yapacağım işi planladım · Pek bir şey değişmedi | menti | **Sonuç** | Görüşmenin somut çıktısı | Çoklu seçim için yeni alan (liste). Tek seçime indirilirse `wantedMore` benzeri yeni tek-değer alan gerekir; mevcut hiçbir alan uygun değil. | **VAR** |
| Ö6 | A3'ün netleştirilmiş metni: "**Menti geçen görüşmede konuştuğunuz adım üzerinde çalışıp geldi mi?**" (1-5, uçlar etiketli) | mentör | **Davranış** (gözlem) | Takip / sorumluluk | Mevcut `menteePreparedness` (hazırlığın somut tanımı; anlam daralır, değişmez). | **YOK** |
| Ö7 | Mentör endişe sorusunu **forma ekle** (şemada hazır): "Bu ilişkide seni düşündüren bir şey var mı?" — Motivasyon düşük · Hedef belirsiz · Zaman bulamıyor · İletişim zor · Yok | mentör | Davranış/risk | Erken uyarı sebebi | Mevcut `concernTag` + istenirse `continuationView`. | **YOK** |
| Ö8 | A4 için takip sorusu (yalnız "Henüz emin değilim"/"Devam etmek istemiyorum" seçilince): "Neden?" — Zaman · Beklentim karşılanmadı · İletişim · Hedefim değişti · Diğer | ikisi | Niyet + sebep | Çıkışın sebebi | `FeedbackLog.difficulty` değer kümesiyle hizalanabilir, ama check-in'de alan yok → yeni alan; ya da mentörde `concernTag` yeniden kullanılır (menti için yok). | Menti için **VAR** |
| Ö9 | A1'i **koru** ("Bu görüşme ne kadar değerliydi?") ama uçlarını etiketle (1 = Zaman kaybıydı · 5 = Çok değerliydi). | ikisi | Memnuniyet | — | Mevcut `overallRating`. ⚠️ Algoritma sinyali ve risk sinyali bu alana bağlı → metin değişirse **ölçek anlamı** korunmalı. | **YOK** |
| Ö10 | Dönemlik (3. ay) sonuç sorusu: "**Programa başlarken belirlediğin hedefe ulaştın mı?**" — Evet / Kısmen / Hayır + "**Somut olarak ne değişti?**" (iş, terfi, karar, beceri — kısa metin) | menti | **Sonuç** | Programın asıl çıktısı | Mevcut `FeedbackLog.goalAchieved` (EVET/KISMEN/HAYIR — birebir) + `Feedback.periodicCareerGrowth` (serbest metin, şemadaki sorusu zaten "…nasıl katkı sağladı?"). ⚠️ Hangi kutunun kalacağı KARAR-12/44/78'e bağlı. | **YOK** (ama kutu kararı gerekir) |
| Ö11 | A7'nin metni: KARAR-67 cevabına göre ya yöneticiye gösterilecek ya da metin "**Programı iyileştirmemize yardım edecek bir notun var mı?** (kurum yöneticisi yalnız toplu hâlini görür)" gibi **gerçekle uyumlu** hâle getirilecek. | ikisi | — | — | Mevcut `openNote`. | **YOK** |

**Önerilen tek migration paketi (PO onaylarsa):** Ö1 (`prevStepDone`) + Ö2 (`nextStep`, anlam değişikliği istenmezse) + Ö5 (`changeTags`) + Ö8 (menti çıkış sebebi) → dört yeni, **boş başlayan** sütun; mevcut veriye dokunmaz. KARAR-80/M12'deki "KR-08 · AN-48 aynı migration'a" sırasına uyar. ⛔ Migration: tarihli yedek tablo + PO "evet" olmadan yapılmaz.

**Migration'sız hemen yapılabilecekler (yine PO metin onayıyla):** Ö3 · Ö4 · Ö6 · Ö7 · Ö9 · Ö11 · ve okunmayan alanların (A2, A3, A5, A6) bir ekranda gösterilmesi (bkz. AN-49 / KARAR-67).

---

## KALEM LİSTESİ (KURAL 9)

| # | Kalem | Önerilen durum | Numara adayı mı |
|---|---|---|---|
| 1 | Dört modelin canlı/ölü haritası çıkarıldı (tek canlı: `MeetingCheckIn`) | ✅ YAPILDI (bu belge) | hayır (AN-47) |
| 2 | Mevcut 17 soru metni (+ formda olmayan 2 alan) koddan çıkarıldı, sinyal türü + zayıflık yazıldı; 11 öneri üretildi | ✅ YAPILDI (bu belge) | hayır (AN-48) |
| 3 | `progressRating` · `menteePreparedness` · `wantedMore` · `nextTopicNote` · `openNote` yazılıyor, hiç okunmuyor | ⬜ AÇIK | hayır → AN-49'a Not |
| 4 | "N görüşme değerlendirme bekliyor" bandı hiç azalmıyor; yalnız son görüşme değerlendirilebiliyor (Y-1) | ⬜ AÇIK | **evet** |
| 5 | "Değerlendirme Yap →" düğmesi hiç görünmüyor (Y-2) | ⬜ AÇIK | **evet** (4 ile aynı satır) |
| 6 | Check-in yapana "geri bildirim vermediniz" e-postası gidiyor; e-postada bağlantı yok (Y-3) | ⬜ AÇIK | **evet** |
| 7 | Kilometre taşı sayısı bir fazla (Y-4) | ⬜ AÇIK | evet (4 ile aynı satır) |
| 8 | Oryantasyon kilidi beslenmeyen modele bağlı (Y-5) | ❓ TEYİT GEREK (ürün kararı) | kart adayı |
| 9 | Canlı eşleştirmede mentör kalite katsayısı hep 1.0 (Y-6) | ⬜ AÇIK | hayır → KARAR-44 / AN-49 Not |
| 10 | KVKK dışa aktarımı/özeti `MeetingCheckIn`'i içermiyor; saklama imhası yok (Y-7) | ⬜ AÇIK | **evet** (KVKK → 🟡) |
| 11 | "Yöneticinize iletmek…" metni ile davranış çelişkili (Y-8) | ❓ TEYİT GEREK | hayır → KARAR-67 eki |
| 12 | NPS ölçek hatası (0-10 ortalaması 70/50 eşiği) (Y-9) | ⬜ AÇIK | **evet** |
| 13 | `/periodic-survey` `specificComments` menti adına gönderiyor → ayrıca reddedilir | ⬜ AÇIK | hayır → KR-11 Not |
| 14 | `MeetingFeedbackCard` chip seçimleri backend'e gönderilmiyor | ⬜ AÇIK | hayır → karantina/karar kapsamı (KARAR-12/M12) |
| 15 | `profile-completeness.service.ts` hiçbir yerden import edilmiyor | ❓ TEYİT GEREK (SİLME PROTOKOLÜ) | hayır |
| 16 | KR-08 migration'ı `Feedback`'e yapılırsa `MeetingCheckIn` ile ikinci "taraf başına kayıt" kutusu doğar | ❓ TEYİT GEREK | kart adayı KA-1 |

## HAZIR KUYRUK SATIRLARI (KURAL 23 — öneri; kuyruğa bu turda YAZILMADI)

| No (aday) | Şerit | İş | Kapı | Bitti ölçütü | Not |
|---|---|---|---|---|---|
| AN-47a | Ş1 | `/meetings` değerlendirme bandı ve düğmesi: yalnız **değerlendirilmemiş** tamamlanan görüşmeleri say; her kart kendi görüşmesine götürsün; kilometre taşı +1 hatası | 🟢 | Kullanıcı check-in yapınca band azalıyor; eski görüşmeyi de değerlendirebiliyor | Kanıt: Y-1, Y-2, Y-4. Liste yanıtına "bu kullanıcı check-in yaptı mı" bilgisi eklemek backend dokunuşu (şema yok). Auth/KVKK/matching değil. |
| AN-47b | Ş0 | Hatırlatma e-postası check-in yapmış kişiye gitmesin + e-postaya form bağlantısı | 🟡 | Check-in yapan kişi hatırlatma almıyor; e-postadan forma tek tıkla gidiyor | Kanıt: Y-3. `hasFeedback`'in anlamı değişmemeli → sorgu `MeetingCheckIn`'e bakmalı. Canlıya giden e-posta = geri alınamaz dış etki → 🟡. |
| AN-47c | Ş0 | KVKK dışa aktarımı ve özetine `MeetingCheckIn` (+ `Feedback`, `MatchFeedback` kendi kayıtları) eklensin | 🟡 KVKK | "Verilerimi indir" çıktısında kişinin görüşme değerlendirmeleri görünüyor | Kanıt: Y-7. KVKK dosyası → 🟡. Saklama süresi ayağı hukuki → kart adayı KA-3. |
| AN-47d | Ş0 | NPS ölçek hatası: 0-10 puanlardan gerçek NPS (tavsiye eden % − eleştiren %) hesaplansın ya da eşikler 0-10'a çevrilsin | 🟡 | Yönetici "başarı oranı" ve algoritma ayarı doğru ölçekle çalışıyor | Kanıt: Y-9. Algoritma ayarı eşleştirmeye komşu → 🟡. Veri bugün boş olduğundan acil değil; veri akışı açılmadan ÖNCE yapılmalı. |

## KART ADAYLARI (KURAL 23 — öneri; `01-KARARLAR.md`'ye bu turda YAZILMADI)

- **KA-1 · Görüşme değerlendirmesinin tek kutusu hangisi olsun? (KR-08 · AN-49 · KR-11'i açar) [ÜRÜN KARARI · MIGRATION]**
  Soru: KARAR-77=A uygulanırken `Feedback`'i "taraf başına kayıt" yapmak mı, yoksa `Feedback`'teki puanları (yönlendirme/kaynak/güven · hazırlık/proaktiflik) zaten taraf başına olan `MeetingCheckIn`'e taşıyıp tek kutuda birleşmek mi?
  · **A) `Feedback`'i böl (KR-08 olduğu gibi):** kazanç — mevcut okuyucular (kalite katsayısı, kilit) değişmez · kayıp — kullanıcıya iki ayrı form, iki kutu; check-in ile mükerrer.
  · **B) `MeetingCheckIn`'e taşı:** kazanç — tek form, tek kutu, AN-49 kolaylaşır · kayıp — kalite katsayısı ve kilit kodu yeni kutuya bağlanmalı (matching dokunuşu, 🟡); `Feedback` karantinaya girer (SİLME PROTOKOLÜ).
  · Öneri: B (bugün gerçekten dolan tek kutu bu). **Bu senin ürün kararın.**
  ⚠️ KARAR-77'nin **görünürlük** cevabı iki seçenekte de aynen uygulanır (`MeetingCheckIn` zaten aynı kuralla çalışıyor).
- **KA-2 · AN-48 soru önerileri hangileri alınsın? (AN-48 uygulaması) [ÜRÜN KARARI · kısmen MIGRATION]** — Ö1-Ö11'den seçim; migration'lı olanlar (Ö1 · Ö2-yeni-alan · Ö5 · Ö8) KA-1 migration'ıyla aynı pakete.
- **KA-3 · Görüşme değerlendirmeleri ne kadar saklansın? [HUKUKİ / KVKK]** — `FeedbackLog` için 3 yıl imha var; `MeetingCheckIn` (tek dolan kutu) için yok. Aydınlatma metniyle tutarlı süre gerekli (G1-10 Message saklama sorusu ile aynı oturumda cevaplanabilir).
- **KA-4 · Oryantasyon kilidi mentörün check-in'deki "hazırlıksızdı" cevabıyla tetiklensin mi? [ÜRÜN KARARI]** — Bugün kilit hiç çalışmıyor (Y-5). Açılırsa menti tek bir düşük puanla kilitlenebilir → kullanıcıyı doğrudan etkiler.
- **KARAR-67'ye EK (yeni kart değil):** `openNote` formda "Yöneticinize iletmek…" diye soruluyor ama gösterilmiyor (Y-8); karar hangi yönde çıkarsa çıksın form metni ona uydurulmalı (Ö11).
- **KARAR-12'ye EK (yeni kart değil):** "C) dursun" seçeneğinin "Kaybedersin" satırına: yönetici KPI NPS/başarı oranı, mentör "Ortalama NPS" kutusu ve algoritma ayarı **kalıcı boş** kalır.

---

*Belge güncellemesi gerekmedi: `09-DURUM` / `10-yol-haritasi` / `00-KUYRUK` / `02-ILERLEME` bu turda ellenmedi (PLANLA turu; kuyruk durumu orkestratör tarafından yazılır).*
