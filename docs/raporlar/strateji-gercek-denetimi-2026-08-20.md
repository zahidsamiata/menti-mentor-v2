# STRATEJİ ↔ GERÇEK DENETİMİ (DERİN)
**📸 DONDURULMUŞ (2026-08-20)** — bu tarihteki kod gerçeğinin belge vaatlerine karşı fotoğrafı; güncellenmez.
**Amaç:** 6 strateji/persona belgesinde yazan HER maddenin bugün kodda ne durumda olduğunu — özellikle
"arka planda var ama ön yüze bağlanmamış" özellikleri — madde madde, kanıtlı tespit etmek.
**Yöntem:** Her madde 7'li sınıflandırma + `dosya:satır` kanıtı. Belge↔kod çelişirse KOD kazanır.
**Kapsam:** yalnız 6 belge (menti/mentör/yönetici-metrik/stk-yönetici/platform-admin/admin-panel-tasarım).
**Sınır:** salt-okuma denetim; kod/DB/migration değişikliği yok. Kararlar ürün sahibinde.

## Sınıflandırma etiketleri
- ✅ **TAM VAR** — backend + ön yüz çalışıyor, kullanıcı görüyor.
- 🟠 **SADECE ARKA PLANDA** — backend/şema var, ön yüze çıkmamış. *(PO için en önemli kategori.)*
- 🟡 **SADECE ÖN YÜZDE / YARIM** — FE var, backend eksik/stub ya da kısmen çalışıyor.
- 🔴 **HİÇ YOK** — ne backend ne FE.
- ⚠️ **UYUMSUZ** — var ama belgeden farklı çalışıyor.
- 🔄 **ÜSTÜNE YENİ KARAR** — sonradan farklı karar alınmış (kaynak gösterilir).
- ⛔ **ARTIK GEÇERSİZ GÖRÜNÜYOR** — ürün yönü değişmiş olabilir; kesin hüküm yok, PO teyit etmeli.

---

## BÖLÜM A — ⚡ TEK BAKIŞTA

**Toplam denetlenen madde: 85** (5 rol/belge bölümü).

| Kategori | Adet | % |
|---|---|---|
| ✅ TAM VAR | **56** | ~66% |
| 🟠 SADECE ARKA PLANDA | 3 | ~4% |
| 🟡 SADECE ÖN YÜZDE / YARIM | 11 | ~13% |
| 🔴 HİÇ YOK | 10 | ~12% |
| ⚠️ UYUMSUZ | 3 | ~4% |
| ❓ BELİRSİZ (veri/karar) | 2 | ~2% |
| 🔄 ÜSTÜNE YENİ KARAR | 0 | — |
| ⛔ ARTIK GEÇERSİZ | 0 | — |

**Rol bazında özet:**
| Rol / belge | Madde | ✅ | 🟠 | 🟡 | 🔴 | ⚠️ | ❓ | Genel izlenim |
|---|---|---|---|---|---|---|---|---|
| B.1 MENTİ | 13 | 8 | 1 | 1 | 2 | 1 | 0 | Keşif/yolculuk/DISC güçlü; **bekleme anı** yarım, ret-yumuşatma+kutlama yok |
| B.2 MENTÖR | 14 | 9 | 2 | 1 | 1 | 1 | 0 | Panel (gelen ilgi/etki/seçicilik/müsaitlik) tam; bildirim arka planda, kapasite yok |
| B.3 STK YÖNETİCİ | 27 | 16 | 0 | 6 | 3 | 1 | 1 | Sağlık/drill/nudge/onay güçlü; **S3 kanıt (export, ivme/oran) zayıf** |
| B.4 PLATFORM ADMİN | 20 | 13 | 0 | 3 | 4 | 0 | 0 | Güvenlik/gözlem (audit/health/abuse) olgun; büyüme metrikleri + ayar UI yok |
| B.5 ADMİN PANEL TASARIM | 11 | 10 | 0 | 0 | 0 | 0 | 1 | **6 panel + oyunlaştırma TAMAMEN kodlanmış** (tek açık: seed verisi) |

**En çarpıcı 5 bulgu:**
1. **Tasarım kartları belgesi baştan sona uygulanmış** — 6 admin paneli (A1-A4, A7, A8) + oyunlaştırma kodlandı;
   `Match` tablosu kalıcı, branding'in `logoUrl` XSS guard'ı bile eklenmiş. Bu belge artık **arşiv adayı**.
2. **"Arka planda var, çıkmamış" tek büyük küme = bildirim/mail** — tetikleyiciler hazır ama gönderim KAPALI (karar 37m).
   Mail açma tek kararı 🟠 kümesinin tamamını kullanıcıya çıkarır → **en yüksek kaldıraçlı tek aksiyon.**
3. **Menti "bekleme anı" (belgenin ilan ettiği ölüm noktası) yarım kalmış** — öğrenme yolculuğu + DISC derinleştirme VAR
   ama bekleme deneyimine bağlanmamış; reddi yumuşatma ve küçük-başarı kutlaması HİÇ YOK (retention riski).
4. **Yönetici "kanıt/etki" (S3) zayıf** — dönemsel rapor EXPORT yok; görüşme ivmesi ve tamamlama/uyum ORAN metrikleri eksik.
   Persona B/C (kurul/sponsora kanıt sunan yönetici) için canlı-öncesi gerçek risk.
5. **Öz-doğrulama en az 2 alt-ajan hatasını yakaladı** — mentör DISC "hediye" kartı + LinkedIn/WhatsApp paylaşım butonları
   "YOK" sanılıyordu; kod okundu → onboarding `ResultStep` tüm rollere gösteriyor, **VAR**. (Kanıt disiplini işe yaradı.)

**Tek cümle:** Proje, strateji belgelerinin somut/panel vaatlerini büyük ölçüde (%66 tam) hayata geçirmiş; kalan kopukluk
üç eksende toplanıyor — (1) mail/bildirim (karar bekliyor), (2) menti retention inceliği (bekleme/ret/kutlama),
(3) yönetici kanıt katmanı (export/oran/trend).

---

## BÖLÜM B — ROL ROL DERİN TABLO

### B.1 — MENTİ
> Kaynak: `docs/raporlar/menti-persona-ve-sevdirme-2026-08-02.md`
> Belge stratejik/persona odaklı; "vaat" = tarif edilen somut deneyim/özellik. 14 madde çıkarıldı.

| # | Belgedeki madde (vaat) | Durum | Kodda karşılığı (kanıt) | Not / fark | Öneri |
|---|---|---|---|---|---|
| 1 | **DISC "özgüven aşısı" / aha kartı** — DISC sonucu "sen değerlisin / sen bir X'sin" diye cesaretlendirici sunulmalı (P1, en güçlü aday) | ✅ TAM VAR | Onboarding sonrası tam "Aha Anı" kartı: `frontend/src/app/onboarding/_steps/ResultStep.tsx:59-147` (arketip + `superPower` + güçlü yanlar + gelişim alanı + konfeti + WhatsApp/LinkedIn paylaş + "Sen bir {archetype}sın!"). Backend: `backend/src/controllers/onboardingController.ts:53-101` (`DISC_RESULT_CARDS`), `:399-429` kart üretimi, `schema.prisma` `User.discResultCard` | Belgenin istediği "özgüven aşısı" birebir var — güçlü uyum. Profil sayfasında da özet: `frontend/src/app/(dashboard)/profile/page.tsx:218-220` | Korunmalı. Kartın DISC-testi (onboarding dışı tekrar) akışında da gösterilip gösterilmediği kontrol edilebilir |
| 2 | **Keşif yuvası — "bana uygun mentörler kimler" kart havuzu** (Yuva 1) | ✅ TAM VAR | `frontend/src/app/(dashboard)/menti/page.tsx:249-303` (mentör kart grid: avatar, ad, sektör, uyum sebebi, Randevu/Mesaj). Backend `matchingController.ts:96-115`, `services/matching.ts` `rankMentorsForMenti`, route `userRoutes.ts:81-86` | Belgedeki "umut/merak" hissi kart havuzuyla karşılanıyor | — |
| 3 | **Uyum skoru gösterimi** (önerilen mentörün % uyumu) | ✅ TAM VAR | `menti/page.tsx:272` `%{mentor.matchScore}`; backend sector %60 + DISC %40 → `matchingController.ts` `buildMentiFacingMentorItem` | — | — |
| 4 | **Yolculuk yuvası — öğrenme aşamaları / ilerleme** (Yuva 2, kritik) | ✅ TAM VAR | `frontend/src/app/(dashboard)/learning-journey/page.tsx` + `components/organisms/ScenarioGuideEngine.tsx`; backend `schema.prisma` `LearningStage`, `services/learningJourney.service.ts`, `routes/learningJourneyRoutes.ts`. Menti'de davet kartı: `menti/page.tsx:197-198` | Senaryo-tabanlı, puanlama yok (sınav değil) | bkz. madde 6 (bekleme anına bağlama) |
| 5 | **İlişkilerim yuvası — görüşmelerim + sonraki randevu** (Yuva 3) | ✅ TAM VAR | `frontend/src/app/(dashboard)/meetings/page.tsx` (Yaklaşan/Geçmiş, durum badge); backend `schema.prisma` `Meeting`, `routes/meetingRoutes.ts`, `meetingController.ts` | — | — |
| 6 | **Bekleme anı — öğrenme içeriği (mentörsüz beklerken meşgul tut)** (Bölüm 4 / P2) | 🟡 SADECE ÖN YÜZDE / YARIM | Öğrenme yolculuğu var (madde 4) AMA `menti/page.tsx` yalnız `!needsDiscTest` iken `LearningJourneyCard` gösteriyor; PENDING/bekleme durumunda öğrenme akışı bekleme deneyimiyle **birleştirilmemiş**. Bekleme banner'ı (`:172-191`) yalnız mentör sayısı + statik metin | Belgenin "en kritik risk"i (bekleme = ölüm) tam karşılanmıyor: içerik var ama bekleme anına konumlandırılmamış | Bekleme ekranına öğrenme yolculuğu + DISC derinleştirme'yi belirgin CTA olarak koy (S) |
| 7 | **Bekleme anı — DISC derinleştirme (kendini tanıma)** | ✅ TAM VAR (mekanizma) | `components/organisms/DailyQuestionWidget.tsx` (dashboard "Profil Sorusu", Likert 1-5); backend `services/adaptiveTestEngine.ts`, `QuestionType.DEEPENING` (`schema.prisma`) | Mekanizma tam; ancak "beklerken derinleştir" olarak özel konumlandırılmamış (madde 6 ile aynı boşluk) | Bekleme deneyimine bağla |
| 8 | **Bekleme anı — umut sinyali / sosyal kanıt** ("senin gibi 12 kişi bekliyor, mentörler geliyor / yakında eşleşeceksin") | ⚠️ UYUMSUZ (kısmi) | Bekleme banner'ı var (`menti/page.tsx:172-191`) ama yalnız **onaylı mentör sayısı** gösteriyor; "senin gibi N kişi bekliyor" peer-count ve "yakında eşleşeceksin" umut mesajı YOK. **Öz-doğrulama:** `menti/` içinde `bekleyen\|waiting\|yakında eşleş\|mentörler geliyor` arandı → eşleşme yok | Belgedeki sosyal-kanıt/umut mesajı zayıf; mevcut mesaj statik | Peer-count + zaman umudu ekle (S) |
| 9 | **Boş havuz ekranı yönetimi** (çıplak "mentörün yok" YASAK) | ✅ TAM VAR | `menti/page.tsx:237-247` empty-state: "Şu an uygun mentor bulunamadı" + yönlendirme + DISC güncelle butonu (çıplak değil) | Belgeye uyumlu | — |
| 10 | **Reddi yumuşatma — mentör reddederse "3 alternatif" göster** (P3) | 🔴 HİÇ YOK | Mentör→menti ret/decline akışı yok. **Öz-doğrulama:** `menti/` içinde `alternatif\|reddedil\|reject\|dolu\|3 mentör` → eşleşme yok; backend `decline/rejection/alternative/rematch` → bulunamadı | Belgenin P3 prensibi kodlanmamış. Ret sinyali kişiselleştirilmiş yumuşatma içermiyor | Ret akışı + alternatif öneri (M); önce ürün kararı gerekli |
| 11 | **Küçük başarıları kutla** ("İlk görüşmeni tamamladın!") (P4) | 🔴 HİÇ YOK | Görüşme/aşama tamamlama kutlaması/rozet/milestone yok. Konfeti yalnız DISC aha kartında (`ResultStep.tsx:63`). **Öz-doğrulama:** FE `celebrat\|milestone\|tebrik\|kutla\|tamamladın\|rozet` → 42 dosya çıktı ama hepsi UI `badge`/durum rozeti; görüşme-tamamlama kutlaması yok. Backend `notificationService` stub | İlerleme/kutlama sinyali eksik (P4 karşılanmıyor) | İlk görüşme / aşama bitince kutlama (S) |
| 12 | **İlk temas eşiği — niyet mektubu akışı kolay** (Bölüm 7.5) | ✅ TAM VAR | `frontend/src/app/(dashboard)/book-meeting/page.tsx:74-75` `requestMessage` (50-500 char zorunlu niyet mesajı) + kart "Mesaj" modalı; backend `conversationController.ts` `startConversation`, `schema.prisma` `Conversation` | Akış temiz, zorunlu, sınırlı | — |
| 13 | **Menti bildirimleri (cesaret verici ton)** | 🟠 SADECE ARKA PLANDA | Backend `services/notificationService.ts:59-93` (`notifyVisibilityApproved`, `notifyMatchRequestReceived` vb.) VAR ama gönderim **stub** (SystemLog'a yazıyor; push/email entegrasyonu yok). FE'de genel bildirim merkezi yok — yalnız mesaj çanı `components/organisms/MessagesBell.tsx` | Bildirim tetikleyicileri arka planda hazır, kullanıcıya çıkmıyor | Bildirim gösterimi + gerçek gönderim (M) — mail işiyle (37m) örtüşür |
| 14 | **Sektör bazlı mentör bulma** | ✅ TAM VAR (gösterim) | `menti/page.tsx:264-267` `sectorTags`; backend `services/scoring.service.ts` sektör %60 ağırlık, `matching.ts` | Sektör **filtresi/daraltma** UI'ı yok (yalnız gösterim + sıralama) | Menti tarafına sektör filtresi opsiyonel (S) |

**B.1 dağılımı:** ✅ 8 · 🟠 1 · 🟡 1 · 🔴 2 · ⚠️ 1 · 🔄 0 · ⛔ 0 (toplam 13 madde satırı; madde 7 mekanizma-tam).

### B.2 — MENTÖR
> Kaynak: `docs/raporlar/mentor-persona-ve-sevdirme-2026-08-02.md` · 14 madde.

| # | Belgedeki madde (vaat) | Durum | Kodda karşılığı (kanıt) | Not / fark | Öneri |
|---|---|---|---|---|---|
| 1 | **İlk 5 dk'da "aha"** — ilk girişte boş panel değil, "işte sana 3 uygun menti, %92 uyum" değeri (P1) | ✅ TAM VAR | `frontend/src/app/(dashboard)/mentor/page.tsx:186-200` (özet metrik kartları) + `:386-452` "Eşleşme Önerileri" (%uyum + gerekçe). Backend `services/matching.ts` `rankMentisForMentor`, `matchingController.ts:39-71` | İlk ekran değer gösteriyor, boş panel değil | — |
| 2 | **DISC sonucu HEDİYE gibi sun** — "Sen bir Öncü'sün, güçlü yönlerin..." (P2) | ✅ TAM VAR | Onboarding "Aha Anı" kartı **tüm rollere** gösteriliyor: `frontend/src/app/onboarding/_OnboardingContent.tsx:202-203` `ResultStep` (rol-gate yok) → `_steps/ResultStep.tsx:59-147`. Backend `onboardingController.ts:53-101` `DISC_RESULT_CARDS` **rol-bağımsız** (`:399`) | ⚠️ **Öz-doğrulama düzeltmesi:** alt-ajan "yalnız menti" dedi; onboarding rol-gate içermiyor → mentör de alıyor. Ancak kart yalnız onboarding anında; mentör panelinden tekrar erişilemez (özet: `profile/page.tsx:218-220`) | Panelde DISC kartına kalıcı erişim eklenebilir (S) |
| 3 | **DISC kartı paylaşılabilir** (LinkedIn/WhatsApp, gurur duyulası) | ✅ TAM VAR | `ResultStep.tsx:16-51` `ShareButtons` (WhatsApp + LinkedIn) + `:130` `shareHeadline` | ⚠️ **Öz-doğrulama düzeltmesi:** alt-ajan "YOK" dedi; kod okundu → paylaşım butonları MEVCUT. Onboarding anında | — |
| 4 | **Gelen ilgi yuvası — niyet mektupları / kimler görüşmek istiyor** (Yuva 1) | ✅ TAM VAR | `mentor/page.tsx:201-281` "Toplantı Talepleri" (niyet mesajı + uyum skoru + profil); inbox `messages/page.tsx:22-90`. Backend `conversationController.ts` `startConversation`/`listConversations` | — | — |
| 5 | **Aktif ilişkiler yuvası — kime mentörlük + sonraki görüşme** (Yuva 2) | ✅ TAM VAR | `mentor/page.tsx:454-489` "Yaklaşan Toplantılar"; backend `mentorMetricsController.ts:14-52`, `schema.prisma` `Meeting` | — | — |
| 6 | **Kendi etkim yuvası — "4 mentiyle görüştün, 12 saat" istatistik** (Yuva 3) | ✅ TAM VAR (kısmi metrik) | `mentorMetricsController.ts:26-54` (bekleyen, tamamlanan, aktif menti, ort. NPS); `mentor/page.tsx:32-43,186-200` | **Fark:** "toplam saat" metriği YOK; NPS var (belge saat diyor). İçerik ~eşdeğer | "Toplam mentörlük saati" eklenebilir (S) |
| 7 | **Ritim dengesi — seyrek anlamlı bildirim** ("yeni menti görüşmek istiyor") (P3) | 🟠 SADECE ARKA PLANDA | `services/notificationService.ts:84-93` `notifyMatchRequestReceived` tetikleniyor ama **gönderim stub** (SystemLog). In-app mesaj çanı gerçek: `components/organisms/MessagesBell.tsx` | Tetikleyici var; gerçek push/mail gönderimi yok (37m mail işiyle örtüşür) | Gerçek gönderim + ritim kontrolü (M) |
| 8 | **Emeği görünür kıl — sertifika / rozet / "yılın mentörü" / teşekkür** (P4) | 🟡 SADECE ÖN YÜZDE / YARIM | Sertifika tam: `frontend/src/app/(dashboard)/mentor/certification/page.tsx:178-189` "Sertifikalı Mentörsün" + `services/certification.service.ts`, `schema.prisma` `isCertified/certifiedAt`. AMA "yılın mentörü" rozeti / dönemsel teşekkür / rozet çeşitliliği YOK | Sadece tek sertifika rozeti var; P4'ün takdir çeşitliliği (rozet/teşekkür sinyali) eksik | Dönemsel takdir/rozet (S-M) — PO kararı |
| 9 | **Seçicilik — mentiyi kabul/reddetme** (Bölüm 3) | ✅ TAM VAR | `mentor/page.tsx:257-274` Onayla/Reddet; backend `matchingController.ts:117-191` `setVisibilityOptIn` (APPROVED/REJECTED), `meetingRoutes.ts:98-109` approve/reject | Not: bu ret menti tarafında "yumuşatılmıyor" (bkz. B.1 madde 10) | — |
| 10 | **Müsaitlik ayarı — mentör kendi müsaitliğini belirler** | ✅ TAM VAR | `frontend/src/app/(dashboard)/mentor/availability/page.tsx:31-186` (gün + saat blokları); backend `schema.prisma` `AvailabilityBlock`, `meetingRoutes.ts:31-43`. **Öz-doğrulama:** mentor klasöründe `availability` sayfası bulundu | — | — |
| 11 | **Kapasite sınırı — kaç mentiye kadar alacağını belirler** (Bölüm 6.5) | 🔴 HİÇ YOK | Mentör-bazlı kapasite yok. **Öz-doğrulama:** `capacity/maxMenti/maxMentee` backend'de arandı → yalnız `Tenant.maxMeetingsPerWeek` (tenant-bazlı, mentör-bazlı değil) | Belgenin "kaç mentiye kadar keyif" dengesi kodlanmamış | Mentör kapasite alanı + matching'de kullanım (M) — PO kararı |
| 12 | **Sektör bazlı menti filtresi — kendi alanından menti bulma** | ⚠️ UYUMSUZ | Filtre var ama **sektör değil**: `controllers/mentorFilterController.ts` = `minCompatibilityScore` + `blockedDiscTypes`; UI `mentor/page.tsx:283-384` (uyum slider + DISC toggle). Sektör filtresi yok | Sektör zaten scoring'de %60 ağırlıklı ama açık "sektör filtresi" belgedeki gibi değil | Sektör filtresi eklenebilir (S) |
| 13 | **İkinci girişi tetikleyen bildirim** ("bekleyen menti var") (Derin S1) | 🟠 SADECE ARKA PLANDA | `services/nudgeService.ts`, `notificationService.ts`, `emailService.ts`, `cronScheduler.ts`, `tenantNotifications.ts` VAR; ama gerçek gönderim mail açılmasına bağlı (37m) | Madde 7 ile aynı kök: altyapı var, kullanıcıya çıkış kapalı | Mail/push açılınca aktif (M) |
| 14 | **Menti kartında uyum göstergesi (%uyum + sebep)** | ✅ TAM VAR | `mentor/page.tsx:417-450` (%uyum + sektör%/DISC% + gerekçe); backend `matching.ts` `RankedMenti.totalScore` | — | — |

**B.2 dağılımı:** ✅ 9 · 🟠 2 · 🟡 1 · 🔴 1 · ⚠️ 1 · 🔄 0 · ⛔ 0 (14 madde). *Alt-ajan 2 maddede (2,3) yanlış "YOK" dedi; öz-grep ✅'ye düzeltti.*

### B.3 — STK YÖNETİCİ (tenant admin)
> Kaynak: `yonetici-persona-ve-metrikler-2026-08-02.md` (metrik taslağı) + `stk-yonetici-strateji-2026-08-02.md` (ideal panel). 27 madde.
> Not: strateji belgesinde 2026-08-05 kod-doğrulama notu var; aşağıdaki durumlar **bugünkü** kodla yeniden doğrulandı.

**S1 — "Program yaşıyor mu?" (aktiflik/ivme)**

| # | Belgedeki madde | Durum | Kodda karşılığı (kanıt) | Not / fark | Öneri |
|---|---|---|---|---|---|
| 1 | Aktif üye sayısı **+ oran** (bu hafta/ay giriş yapan) | 🟡 YARIM | Toplam aktif: `adminController.ts:36-124` `getKpiDashboard` (`user.count isActive`); pasif tarafı `retentionMetrics.service.ts:65-75` (`lastLoginAt`). FE `admin/kpi/page.tsx` | "Bu hafta/ay giren **oran**" (aktiflik %) KPI kartı yok; yalnız toplam + pasif | Aktiflik oranı kartı (S) |
| 2 | Bu ayki görüşme sayısı **+ ok (↑/↓ ivme)** | 🔴 HİÇ YOK | Tenant-aylık görüşme aggregate KPI yok. `Meeting` verisi var ama `adminController.ts:376,426` `meetingCount` **eşleşme-başına** (pairSignal için), KPI değil | İvme/trend hiç yok | Aylık görüşme + geçen aya kıyas (M) |
| 3 | Haftalık aktiflik trendi grafiği | 🔴 HİÇ YOK | Trend serisi üretimi/gösterimi yok. **Öz-doğrulama:** KPI'de `trend/↑/↓/ivme` arandı → eşleşme yok | — | Trend grafiği (M) |
| 4 | Pasif üye sayısı (X gün girmemiş) | ✅ TAM VAR | `retentionMetrics.service.ts` `passiveMembers` (DEFAULT_PASSIVE_DAYS=30); FE `components/organisms/ProgramHealthSection.tsx:57,139-163` | Eşik sabit (30g) | — |

**S2 — "Kimse kaynıyor mu?" (boşluk/risk)**

| # | Belgedeki madde | Durum | Kodda karşılığı (kanıt) | Not / fark | Öneri |
|---|---|---|---|---|---|
| 5 | Mentörsüz bekleyen menti sayısı (+drill) | ✅ TAM VAR | `retentionMetrics.service.ts:56` `mentorlessMenti` (count+items); FE drill `ProgramHealthSection.tsx:55,105-114` | — | — |
| 6 | Hiç görüşmemiş ("ölü") eşleşme | ✅ TAM VAR | `retentionMetrics.service.ts:99-137` `deadMatches` (STALE=14g, meeting cross-check); FE `:56,116-137` | Titiz kurgu | — |
| 7 | Mentör/menti dengesi (arz-talep) | ✅ TAM VAR | `retentionMetrics.service.ts:47-54` `supplyDemand`; FE `ProgramHealthSection.tsx:64-67` | — | — |
| 8 | Uzun süre pasif üyeler LİSTESİ (dürtülecekler) | ✅ TAM VAR | `passiveMembers.items` (CAP 100); FE drill + "Hatırlat" `ProgramHealthSection.tsx:144-161` | — | — |
| 9 | Onay bekleyen başvuru sayısı | ✅ TAM VAR | `adminController.ts:232-339` `adminListUsers` (PENDING); FE `admin/approvals/page.tsx` + `admin/waiting-room/page.tsx` | 2 sayfa (onay kuyruğu + bekleme odası) | İkisinin ayrımı netleştirilebilir (S) |

**S3 — "Gösterebilir miyim?" (kanıt/etki)**

| # | Belgedeki madde | Durum | Kodda karşılığı (kanıt) | Not / fark | Öneri |
|---|---|---|---|---|---|
| 10 | Toplam üye/eşleşme/**görüşme** kümülatif | 🟡 YARIM | Üye + eşleşme (`activeMatches`) `adminController.ts:39-85`; FE KPI kartları. **Görüşme kümülatif** KPI yok | Görüşme toplamı eksik | Görüşme kümülatif kartı (S) |
| 11 | Onboarding/DISC tamamlama **oranı (%)** | 🟡 YARIM | Kişi-bazlı gösterim: `admin/mentor-havuzu/page.tsx:94`, `menti-havuzu` (`learningJourneyCompletedAt`, DISC). Tenant **oran** KPI kartı yok | Kişi listesinde var, özet oran yok | Tamamlama % kartı (S) |
| 12 | Ortalama eşleşme uyum skoru | 🟡 YARIM | Satır-bazlı: `adminController.ts:354-436` `adminListMatches` (`predictedScore/sectorScore/characterScore`); FE `admin/eslesmeler/page.tsx:147-158`. **Ortalama** kartı yok | "Bizim farkımız" metriği özet değil | Ortalama uyum kartı (S) |
| 13 | Memnuniyet / NPS / feedback skoru | ✅ TAM VAR | `adminController.ts:72-92` `avgNpsByPhase` + `successRate`; FE `admin/kpi/page.tsx:53-76` NPS kartı | — | — |
| 14 | Dönemsel/indirilebilir özet rapor (PDF/Excel/CSV) | 🔴 HİÇ YOK | Export endpoint/UI yok. **Öz-doğrulama:** FE `export/download/indir/csv/pdf/rapor-indir` arandı → **0 dosya** | S3'ün "sponsora sun" ihtiyacı karşılanmıyor — kritik eksik | Rapor export (M) — Persona B/C için önemli |

**Panel tasarım ilkeleri**

| # | Belgedeki madde | Durum | Kodda karşılığı (kanıt) | Not / fark | Öneri |
|---|---|---|---|---|---|
| 15 | Drill-down: sayıya tıkla → kişiler | ✅ TAM VAR | `ProgramHealthSection.tsx:70-166` (tıklanabilir sayı → kişi listesi + "+N daha") | Belge ilkesine tam uyum | — |
| 16 | Renk kodlu durum (yeşil/kırmızı/sarı) **+ ok (↑/↓)** | 🟡 YARIM | Renk variant altyapısı: `services/pairSignal.service.ts` (GREEN/YELLOW/RED), `lib/adminMetrics.ts:22-27` `RISK_META`. **Ok (↑/↓) trend göstergesi yok** | Renk var, ivme oku yok (madde 2 ile bağlı) | Trend oku (S) |
| 17 | Proaktif **kırmızı UYARI** kartı ("15 menti bekliyor") | ⚠️ UYUMSUZ | `ProgramHealthSection.tsx` sayıları gösteriyor + tıklanabilir AMA eşik-tabanlı kırmızı **alarm** değil; nötr sayı kartları (renk/threshold vurgusu yok) | Belge "panel uyarmalı, yönetici aramamalı" diyor; mevcut pasif gösterim | Eşik aşınca kırmızı vurgulu uyarı (S) |

**MÜDAHALE (aksiyonlar)**

| # | Belgedeki madde | Durum | Kodda karşılığı (kanıt) | Not / fark | Öneri |
|---|---|---|---|---|---|
| 18 | Üye onaylama/reddetme | ✅ TAM VAR | `adminController.ts:630-777` `approveUser/rejectUser/requestCorrection` (+`approvedBy/rejectedAt/rejectionReason`); FE `admin/waiting-room/page.tsx` | — | — |
| 19 | Davet etme (mentör/menti çağır) | ✅ TAM VAR | `selfServeController.ts:730-759` template + `routes/invitationRoutes.ts`; FE `admin/invite/page.tsx` (e-posta/WhatsApp şablonu + link) | — | — |
| 20 | Dürtme — **otomatik VE elle** | 🟡 YARIM | Elle tam: `adminController.ts:157-219` `nudgeUser` (24s cooldown, AUDIT log) + FE `ProgramHealthSection.tsx:41-48,173-186` "Hatırlat". **Otomatik dürtme YOK** (KVKK rıza gerekçesiyle kapsam dışı) | Belge "hem otomatik hem elle"; otomatik eksik | Otomatik dürtme — PO+KVKK kararı |
| 21 | Üye çıkarma/engelleme + **LOGLU** | ✅ TAM VAR | `rejectUser` `isActive:false` + `logger` (adminController); eşleşme engelleme `adminSettingsController.ts:128-217` `blockPair` + AUDIT log | "Ban" ayrı değil; reject/isActive + block-pair. Loglu | — |
| 22 | Yönetici atama/çıkarma + **son-admin guard** | ✅ TAM VAR | `adminController.ts` `promoteToAdmin/demoteFromAdmin` (MAX 3), son-admin guard (`SON_ADMIN`); FE `admin/managers/page.tsx` | — | — |
| 23 | **Elle eşleştirme YOK** (bilinçli sınır — yalnız algoritma) | ✅ TAM VAR (doğru şekilde yok) | Admin route'larında elle pair endpoint yok; yalnız GET `/admin/matches` (görüntüleme), `rematch` (algoritma yeniden koşum), `block-pair`. Eşleştirme `services/matching.ts` | Belgenin "torpil önleme" sınırı korunmuş | — |

**Üye katılım modeli**

| # | Belgedeki madde | Durum | Kodda karşılığı (kanıt) | Not / fark | Öneri |
|---|---|---|---|---|---|
| 24 | Yol A — davet + onay; PENDING havuzda görünmez ("hayalet mod") | ✅ TAM VAR | Register `approvalStatus:'PENDING'` (`authController`); `listUsers` where `approvalStatus:'APPROVED'` (PR #31 / `be295e2`, test `listusers-approval-filter.test.ts`); matching `approvalStatus:'APPROVED'` süzer | Belgede de "uygulandı" işaretli — doğrulandı | — |
| 25 | Yol B — ön-tanımlı davet **OTOMATİK onay** | ❓ BELİRSİZ (muhtemelen belgedeki gibi yok) | **Öz-doğrulama:** `selfServeController.ts:245` `AUTO_APPROVED` yalnız **tenant doğrulama** tier'ı (INSTITUTION domain); `:298` `APPROVED` yalnız **kurucu yönetici**. Üye-düzeyi "davetle gelen otomatik onaylanır" akışı net konumlanmadı; `joinViaInvitation` (`invitationRoutes.ts:13`) token doğruluyor | Belgenin 2026-08-05 notu da "teyit edilemeyen" demiş | Davet-join akışının approvalStatus'u netleştirilmeli — PO kararı |

**Güvenlik**

| # | Belgedeki madde | Durum | Kodda karşılığı (kanıt) | Not / fark | Öneri |
|---|---|---|---|---|---|
| 26 | Tenant izolasyonu (yalnız kendi kurumu) | ✅ TAM VAR | Sorgular `tenantId` scope'lu; `middleware/tenant.ts`. FE tenant header otomatik | — | — |
| 27 | Engelleme/çıkarma LOGLU (denetim izi) | ✅ TAM VAR | `nudgeService.ts` AUDIT, `adminSettingsController.ts:196-217` blockPair AUDIT, promote/demote `logger` | Ayrı denetim tablosu değil, SystemLog/logger | — |

**B.3 dağılımı:** ✅ 16 · 🟠 0 · 🟡 6 · 🔴 3 · ⚠️ 1 · 🔄 0 · ⛔ 0 · ❓ 1 (27 madde). *En çarpıcı: metrik altyapısı (retentionMetrics + drill-down + nudge) güçlü; ama görüşme/ivme trendleri, tamamlama/uyum ORANLARI ve rapor EXPORT eksik — Persona B/C (kurul/sponsor kanıtı) için S3 zayıf.*

### B.4 — PLATFORM ADMİN (sistem sahibi, `/platform`)
> Kaynak: `docs/raporlar/platform-admin-strateji-2026-08-02.md`. 20 madde. Belgede 2026-08-05 backend-doğrulama notu var; burada özellikle **frontend** yeniden doğrulandı.

**A — Büyüme nabzı**

| # | Belgedeki madde | Durum | Kodda karşılığı (kanıt) | Not / fark | Öneri |
|---|---|---|---|---|---|
| 1 | Kurum sayıları (aktif/bekleyen/dondurulmuş) | ✅ TAM VAR | `platformController.ts:69-88` `getPlatformStats`; FE `platform/dashboard/page.tsx` KPI + "Tüm Kurumlar" durum badge (Dondurulmuş/PENDING/APPROVED) | "Dondurulmuş kurum **sayısı**" ayrı özet kartı yok (durum tabloda) | Dondurulmuş özet kartı (S) |
| 2 | Kullanıcı sayısı + rol dağılımı (ADMIN/MENTOR/MENTI) | ✅ TAM VAR | `platformController.ts:72-88`; FE dashboard KPI (Kullanıcılar/Mentörler/Mentiler/Adminler) | — | — |
| 3 | Bu ay artış (yeni kurum+kullanıcı) **+ ivme (↑/↓)** | 🔴 HİÇ YOK | `getPlatformStats` `createdAt` tarih filtresi yok; FE'de trend yok. **Öz-doğrulama:** dashboard'da `ivme/↑/↓/growth/geçen ay` arandı → **eşleşme yok** | Büyüme momentumu hiç yok | Aylık artış + geçen aya kıyas (M) |
| 4 | Sistem-geneli aktif/pasif oranı (lastLoginAt) | 🔴 HİÇ YOK | `User.lastLoginAt` alanı var ama platform istatistiğine dahil değil; FE'de oran kartı yok | STK tarafında lastLoginAt kullanılıyor, platformda değil | Sistem-geneli aktiflik (S) |

**B — Sistem sağlığı**

| # | Belgedeki madde | Durum | Kodda karşılığı (kanıt) | Not / fark | Öneri |
|---|---|---|---|---|---|
| 5 | Durum göstergesi (yeşil/kırmızı): sistem/mail(Resend)/DB | ✅ TAM VAR | `platformController.ts:131-162` `getPlatformHealth` (DB `SELECT 1`, SMTP config, son 24s ERROR, uptime); FE `dashboard/page.tsx` HealthPill (4 gösterge) | ⚠️ Mail **gerçek gönderim testi değil**, yalnız env config kontrolü | Gerçek mail probe (S) |
| 6 | Hata/log görünürlüğü (son kritik hatalar + drill) | ✅ TAM VAR | `platformController.ts:94` `recentLogs` + `getPlatformLogs` (category/level); FE "Sistem Logları" tab (AUDIT/ERROR filtre, limit 200) | Sayfalama yok (limit 200 sabit) | Log pagination (S) |

**C — Kötüye kullanım alarmı**

| # | Belgedeki madde | Durum | Kodda karşılığı (kanıt) | Not / fark | Öneri |
|---|---|---|---|---|---|
| 7 | Otomatik anormallik tespiti | ✅ TAM VAR | `services/abuseDetection.service.ts:26-67` `detectAnomalies` (v1: ≥2 şikayet / ≥3 reddet eşiği), `platformController.ts:432` `getAnomalies`; FE "Kullanıcı Şikayetleri/Abuse" tab | v1 basit kural (belge de "v1 basit" diyor) | v2 derinleştirme (M) |
| 8 | Kullanıcı şikayeti (report) listesi | ✅ TAM VAR | `platformController.ts:380-408` `listUserReports` + `reviewUserReport`; FE Abuse tab. **İki kaynak:** ayrıca `SuspicionReport` "Şüphe Bildirimleri" tab (`listSuspicionReports`) | İki ayrı report modeli (UserReport + SuspicionReport) | İkisinin ayrımı belgelenebilir (S) |
| 9 | "Dikkat gereken N durum" yüzey özeti + drill | 🟡 YARIM | Tab badge var (`stats.totals.unreviewedReports`, `dashboard/page.tsx:161`); drill tab'ları tam. AMA yüzeyde tek "N dikkat" uyarı banner'ı yok | Alarm yüzeyi zayıf; kullanıcı tab'a inmeli | Özet alarm banner (S) |

**D — Kurum listesi + drill-down**

| # | Belgedeki madde | Durum | Kodda karşılığı (kanıt) | Not / fark | Öneri |
|---|---|---|---|---|---|
| 10 | Kurum listesi (aktif/ölü/onay bekliyor) | ✅ TAM VAR | `platformController.ts:208-234` `listAllTenants`; FE "Tüm Kurumlar" tab (durum badge + kullanıcı sayısı) | — | — |
| 11 | Kurum → içi (üye/eşleşme/aktivite) drill | ✅ TAM VAR | `platformTenantController.ts` `getTenantOverview/Members/Meetings/Analytics`; FE `platform/tenants/[id]/page.tsx` + `_components` (KpiCards/MembersTable/MeetingsTable/DiscSummary) | — | — |
| 12 | Kurum → tek kullanıcı → **en dibe** drill | 🟡 YARIM | Kurum→üye listesi var (`MembersTable`) ama üye satırı tıklanamaz; tek-kullanıcı detay sayfası yok | 3. seviye drill (kullanıcı detayı) eksik | Kullanıcı detay drill (M) |
| 13 | Kurum içine iniş LOGLANIR (KVKK) | ✅ TAM VAR | `platformTenantController.ts:131,206,243,273` her handler `auditPlatformAction`; FE Denetim İzi tab | ⚠️ Audit veri döndükten **sonra** yazılıyor (belge "önce" ima ediyor); risk düşük | Audit'i yanıt öncesine al (S) |

**E — Yönetmek**

| # | Belgedeki madde | Durum | Kodda karşılığı (kanıt) | Not / fark | Öneri |
|---|---|---|---|---|---|
| 14 | Kurum onaylama/reddetme | ✅ TAM VAR | `platformController.ts:237-279` `approveTenant/rejectTenant`; FE "Bekleyen" tab (Onayla/Düzeltme İste/Reddet) | — | — |
| 15 | Kurum dondurma/aktifleştirme | ✅ TAM VAR | `platformController.ts:328-345` `freezeTenant/activateTenant`; FE Dondur/Aktifleştir | — | — |
| 16 | Kurum **silme (hard delete)** | 🔴 HİÇ YOK (bilinçli) | Kalıcı silme endpoint/UI yok; yalnız freeze (soft, geri-alınabilir). **Belgenin kendi 2026-08-05 notu da hard-delete yok diyor** | "Silme" pratikte freeze ile karşılanıyor | Kalıcı silme gerçekten gerekiyorsa PO kararı |
| 17 | Kötüye kullanıma müdahale (şüpheli kurum/kullanıcı dondur) | 🟡 YARIM | Kurum `freezeTenant` var; ama anomali grid'inden doğrudan aksiyon butonu yok, tek-kullanıcı dondurma net değil | Tespit var, tek-tık müdahale zayıf | Anomali→dondur bağlantısı (S) |
| 18 | Platform seviyesi ayarlar (sistem geneli konfig) | 🔴 HİÇ YOK | Ayar endpoint/UI yok; config env-sabit (`config.ts`) | Eşik/mail/retention tuning UI yok | Gerekliyse ayar paneli — PO önceliği |

**F — Korumak**

| # | Belgedeki madde | Durum | Kodda karşılığı (kanıt) | Not / fark | Öneri |
|---|---|---|---|---|---|
| 19 | KVKK audit log (SystemLog AUDIT) | ✅ TAM VAR | `services/platformAudit.ts` `auditPlatformAction` (SystemLog AUDIT; PII/DISC değeri yazılmaz); FE Denetim İzi tab | ⚠️ Belgedeki "AdminAuditLog tablosu" adı YANLIŞ (SystemLog kullanılıyor) — belgenin kendi notu düzeltmiş | — |
| 20 | Kötüye kullanım tespiti (otomatik + report birlikte) | ✅ TAM VAR | 7+8 birleşimi: `getAnomalies` + `listUserReports` FE Abuse tab'ında `Promise.all` | — | — |

**B.4 dağılımı:** ✅ 13 · 🟠 0 · 🟡 3 · 🔴 4 · ⚠️ 0 · 🔄 0 · ⛔ 0 (20 madde). *Platform admin belgesi en olgun bölüm: güvenlik/gözlem (audit, health, abuse) tam. Eksikler büyüme metrikleri (ivme, aktif/pasif oran) + platform ayarlar UI + 3. seviye kullanıcı drill.*

### B.5 — ADMİN PANEL TASARIM KARTLARI
> Kaynak: `docs/raporlar/admin-panelleri-tasarim-2026-08-02.md`. Belge 6 panel (A1-A4, A7, A8) + oyunlaştırma + ortak UI/güvenlik ÖNERDİ (kod yazılmamıştı). Soru: bunlar kodlandı mı?
> **Genel sonuç: 6 panelin TAMAMI + oyunlaştırma KODLANMIŞ.** Tasarım kartlarının vaatleri büyük ölçüde karşılanmış — bu belge artık ~büyük ölçüde uygulanmış (arşiv adayı, bkz. Bölüm E).

| # | Tasarım kartı (vaat) | Durum | Kodda karşılığı (kanıt) | Not / fark | Öneri |
|---|---|---|---|---|---|
| A1 | Eşleşme paneli: tablo (Mentör/Menti/Puan/Sektör%/Karakter%/Durum) + durum sekmeleri + satır detay (arketip/görüşme/risk) | ✅ TAM VAR | FE `admin/eslesmeler/page.tsx` (Mentör/Menti/Puan/Sektör/Karakter/Görüşme/Risk/Durum + sekmeler + risk sinyali). BE `adminController.ts:354-436` `adminListMatches`, route `adminRoutes.ts:50` | Risk sinyali (GREEN/YELLOW/RED) da eklenmiş (tasarımın ötesinde) | — |
| A1-kritik | **Match persist mi, runtime mı?** (kartın "eforu belirler" sorusu) | ✅ ÇÖZÜLMÜŞ (persist) | **Öz-doğrulama:** `schema.prisma:985` `model Match { predictedScore, mentorArchetype, status... }` — kalıcı tablo. Runtime skorlama değil | Kartın açık sorusu kapandı: Match kalıcı | — |
| A2 | Mentör havuzu: Kullanıcı/DISC/Sektörler/Kayıt/Durum + filtre + sayfalama | ✅ TAM VAR | FE `admin/mentor-havuzu/page.tsx` (Ad/E-posta/DISC/Sektörler/Durum/Sertifika/Kalite/Yolculuk/Kayıt). BE `adminController.ts:236-339` `adminListUsers` | Tasarımdan zengin (sertifika/kalite/yolculuk sütunları eklenmiş) | — |
| A3 | Menti havuzu: A2 + "Eşleşme Durumu" sütunu | ✅ TAM VAR (bilinçli sadeleştirme) | FE `admin/menti-havuzu/page.tsx` (Ad/E-posta/DISC/Sektörler/Durum/Yolculuk/Kayıt). Aynı `adminListUsers` `role=MENTI` | "Eşleşme Durumu" sütunu **bilinçli çıkarılmış** (yalınlık kararı, sayfa yorumunda belirtili) | — |
| A4 | Sertifika sonuç panosu: Mentör/Durum rozeti/Skor%/Deneme + filtre + detay modal | ✅ TAM VAR | FE `admin/sertifika-sonuclari/page.tsx` (Mentör/Durum rozeti/Skor/Deneme/Tarih + sekmeler). BE `adminController.ts` `adminListCertResults`, kaynak `TenantMembership` | — | — |
| A7 | Branding: logoUrl + 6 preset renk + custom picker + canlı önizleme + displayName | ✅ TAM VAR (displayName hariç) | FE `admin/branding/page.tsx` (`PRESET_COLORS:34`, custom picker, canlı önizleme, hex doğrulama). BE `PATCH /tenants/:id/onboarding`. **XSS guard eklenmiş:** `isSafeLogoUrl:50` (data: reddeder, https-only) — kartın uyardığı XSS kapatılmış | **displayName bu panelden düzenlenemez** (önizlemede gösteriliyor); kart "eklenebilir (küçük)" demişti | displayName düzenleme (S) |
| A8 | DISC soruları görüntüleme: global + tenant sorular + detay | ✅ TAM VAR (kod) · ❓ VERİ | FE `admin/questions/page.tsx` (global kilitli + tenant-özel + metin/boyut/tür/kategori). BE `questionController` + `buildQuestionList` | ⚠️ Kartın **kritik bulgusu:** global sorular canlı Neon'a seed'li mi? Kod sağlam ama veri durumu bu turda doğrulanmadı (bkz. aşağı seed satırı) | — |
| OJ | Oyunlaştırma (Learning Journey): 13 aşama, correct/warn/wrong + feedback, role-based (ADMIN görmez), puanlama YOK | ✅ TAM VAR (kod) · ❓ VERİ | FE oyuncu `learning-journey/page.tsx` + admin düzenleme `admin/learning-journey/page.tsx` (7 admin endpoint). BE `learningJourneyController` + `learningJourneyAdminController`; `audienceForRole` ADMIN'i reddeder; puanlama yok (bilinçli) | ⚠️ Aynı seed sorusu (aşağı) | — |
| SEED | **Kartın #1 kritik bulgusu:** global DISC soruları + learning stages canlı Neon'da seed'li mi? (veri, kod değil) | ❓ BELİRSİZ (veri) | Kod sağlam (A8+OJ). Ama `SELECT count(*) FROM "Question" WHERE tenantId IS NULL` + `LearningStage` sayısı bu turda **doğrulanmadı** (salt-okuma denetim, DB'ye bağlanılmadı) | A8/OJ "boş görünüyor" ihtimalinin kökü buysa kod değil veri | Canlı Neon'da global seed sayımı doğrulanmalı (D'ye taşındı) |
| DS | Ortak UI deseni (başlık+Badge, AlertMessage, loading skeleton, empty-state, sayfalama) | ✅ TAM VAR | Panellerde tutarlı desen: `AlertMessage`, `animate-pulse` skeleton, dashed empty-state, `← Önceki/Sonraki →` | — | — |
| SEC | Güvenlik: `requireRole('ADMIN')` + tenant izolasyonu + PII (email opsiyonel, ham DISC vektörü ASLA) | ✅ TAM VAR | Tüm admin route'lar `requireRole('ADMIN')` + `where tenantId`; select'lerde `discVector/selfProfile/temperamentJson` HARİÇ; A1/A4 email göstermiyor, A2/A3 email admin'e (bilinçli) | KVKK deseni tutarlı | — |

**B.5 dağılımı:** ✅ 10 · ❓ 1 (veri: seed) — 11 satır (6 panel + A1-persist + OJ + seed + DS + SEC). *En çarpıcı: bu tasarım belgesinin TÜM önerileri kodlanmış (Match persist dahil, branding XSS guard dahil); tek açık nokta canlı veri seed durumu.*

---

## BÖLÜM C — 🟠 "ARKA PLANDA VAR, ÖN YÜZDE YOK" LİSTESİ
> PO için en kritik kategori. Denetimin genel bulgusu: **çoğu özellik ön yüze BAĞLANMIŞ** (nadir bir sonuç).
> Arka planda hazır olup kullanıcıya çıkmayan **tek büyük küme = bildirim/mail altyapısı**. Kök neden ortak:
> kurum mail gönderimi bilinçli KAPALI (git: `#37 FAZ 3 — GÖNDERİM KAPALI, bayrak arkasında`; karar 37m).

| 🟠 Öğe | Ne yapıyor (arka plan) | Neden ön yüzde yok | Bağlamak ne kadar iş | Migration? |
|---|---|---|---|---|
| **Bildirim tetikleyicileri** (`notificationService.ts`: `notifyVisibilityApproved`, `notifyMatchRequestReceived`, `notifyPendingVisibilityRequest`) | Menti/mentör olaylarında bildirim üretir; şu an SystemLog'a yazar | Gerçek push/e-posta gönderimi stub; FE'de genel bildirim merkezi yok (yalnız `MessagesBell` mesaj çanı) | **M** — gönderim entegrasyonu (push/mail) + FE bildirim gösterimi | Muhtemelen hayır (SystemLog mevcut); push token saklamak gerekirse S migration |
| **Kurum bildirim altyapısı** (`tenantNotifications.ts`, `nudgeService.ts`, `emailService.ts`, `cronScheduler.ts`) | Pasif üye/ölü eşleşme re-engagement + kurum bildirim gönderimi; cron tetikli | Mail gönderimi KAPALI (37m); elle nudge (admin) çalışıyor ama otomatik/e-posta akışı kapalı | **M** — mail açma + şablon/rıza + otomatik tetik testi | Hayır |
| **Mentör ritim bildirimi** ("yeni menti görüşmek istiyor", ikinci giriş tetikleyici) | B.2 madde 7/13 — tetikleyici kod hazır | Aynı mail/gönderim kapalılığı | **M** (yukarıdakiyle aynı iş) | Hayır |
| **DISC "aha" kartı — panelden tekrar erişim** | Onboarding'de tam kart var (`ResultStep.tsx`); backend `discResultCard` User'da saklı | Panelden (menti/mentör dashboard) karta kalıcı erişim bağlanmamış; yalnız profil özeti | **S** — mevcut veriyle panel kartı | Hayır |

**Özet:** 🟠 kümesi dar ve tek köklü (bildirim/mail kapalı). Mail açma kararı (37m) verilince B.1/13, B.2/7, B.2/13
birlikte kullanıcıya çıkar. Diğer "eksik"lerin çoğu 🟡/🔴 (backend de yok) — arka planda gizli değil, hiç yok.

---

## BÖLÜM D — 📌 BEKLEYEN KARARLAR (tek liste)
> Bu denetimden çıkanlar + `00-KARAR-TAKIP.md`'den zaten bekleyenler. Her karar: neden · seçenekler · risk · öneri. **Karar VERİLMEZ — sunulur.**

### D.1 — Bu denetimden çıkan yeni kararlar

**Y1 · Bekleme anı deneyimi (menti retention'ın "ölüm noktası")**
Neden: Belgenin en kritik riski (bekleme = kayıp); öğrenme yolculuğu + DISC derinleştirme VAR ama bekleme ekranına
konumlandırılmamış (B.1/6-8). · Seçenekler: (a) bekleme ekranına öğrenme+derinleştirme CTA + peer-count/umut mesajı
ekle, (b) dokunma. · Risk: canlı öncesi menti erimesi. · Öneri: (a), düşük efor (S).

**Y2 · Reddi yumuşatma + küçük başarı kutlaması (menti P3/P4)**
Neden: İkisi de 🔴 HİÇ YOK (B.1/10-11). · Seçenekler: ret akışı + 3 alternatif (M) / kutlama-bildirimi (S) / erteleme.
· Risk: menti "yetersizim" hissi, ilerleme hissi eksikliği. · Öneri: kutlama (S) canlı-öncesi, ret-yumuşatma sonraya.

**Y3 · Yönetici S3 kanıt katmanı: rapor EXPORT + oran/ivme metrikleri**
Neden: Persona B/C (kurul/sponsor kanıtı) için rapor indirme 🔴 YOK; görüşme trendi/ivme, tamamlama/uyum ORANLARI
eksik (B.3/2,3,10,11,12,14). · Seçenekler: (a) PDF/CSV export + trend kartları (M), (b) yalnız export (S), (c) erteleme.
· Risk: Persona B/C değer görmez → bırakır. · Öneri: en az export (S) canlı-öncesi güçlü aday.

**Y4 · Proaktif kırmızı uyarı (panel "uyarmalı, yönetici aramamalı")**
Neden: Sağlık sayıları nötr gösteriliyor, eşik-tabanlı kırmızı alarm yok (B.3/16,17). · Öneri: eşik aşınca kırmızı
vurgulu uyarı kartı (S).

**Y5 · Mentör kapasite sınırı**
Neden: 🔴 YOK (B.2/11); belge "kaç mentiye kadar keyif" dengesi istiyor. · Seçenekler: kapasite alanı + matching'de
kullanım (M) / erteleme. · Risk: mentör aşırı yüklenip bırakır. · Öneri: PO kararı — canlı-sonrası olabilir.

**Y6 · Global seed doğrulaması (A8 + oyunlaştırma verisi)**
Neden: Kod sağlam ama global DISC soruları + learning stages canlı Neon'da seed'li mi bu turda doğrulanmadı (B.5/SEED).
· Seçenekler: (a) `SELECT count(*) FROM "Question" WHERE tenantId IS NULL` + LearningStage sayımı (salt-okuma) → boşsa
seed uygula (DB yazımı, onay gerekir). · Risk: seed yoksa iki özellik canlıda "boş" görünür. · Öneri: önce sayımı doğrula.

**Y7 · Platform büyüme metrikleri + ayarlar UI**
Neden: ivme/aktif-pasif oran (B.4/3,4) ve platform ayar paneli (B.4/18) 🔴 YOK; 3. seviye kullanıcı drill (B.4/12) yarım.
· Öneri: düşük öncelik (platform admin = PO kendisi); canlı-sonrası.

### D.2 — Zaten bekleyen kararlar (`00-KARAR-TAKIP.md`) — bu denetimle örtüşenler işaretli
- **9a** — Ağırlık ayarlanabilirliği (PO kararı: 5'er adım/toplam %100), migration bekliyor.
- **9b** — Scoring kalibrasyonu yoksayıyor (düzeltilmeli).
- **#13** — Soru cevap-tipi kapsamı.
- **#30** — Sertifika 5→20 seed. *(B.5/A4 paneli hazır; içerik/seed ayrı.)*
- **#31** — DISC-yaklaşım içeriği.
- **#36** — Kullanıcı çıkarma — önce keşif. *(B.3/21 ile ilişkili.)*
- **K6** — Admin server guard.
- **K3** — Eski kayıt consent.
- **37m** — Kurum mail açma (PO manuel). *(⭐ Bölüm C'nin tamamı buna bağlı — en yüksek kaldıraç.)*

### D.3 — Cevaplanmamış sorular (PO cevaplamalı)
- **(a)** Kurum düzeltme yapınca otomatik mi incelemeye dönsün? (şu an otomatik)
- **(b)** Kurum kaç kez düzeltme yapabilir — sınır? (şu an sınırsız)
- **(c)** Düzeltme notu geçmişi tutulsun mu? (şu an son not)
- **(d)** Ağırlık değişikliği izi görünsün mü — "son değişiklik: kim/ne zaman/eski→yeni"? (öneri: evet)
- **(e)** Ağırlığı kurumun tüm yöneticileri mi değiştirebilsin, sadece kurucu mu?
- **(f)** 9b düzeltilmeden önce canlıda hangi kurumların hangi ağırlıkları kayıtlı — kontrol edilsin mi?
- **(g)** 2a ghost-red'de kişinin HANGİ verileri silinecek (DISC/profil/mesaj)? Geri-alınamaz.
- **(h)** 2a ghost-red geri alınabilir mi (yönetici hata yaparsa)?
- **(i · yeni)** Yol B (ön-tanımlı davet otomatik onay) belgede var ama kodda net değil (B.3/25) — istenen davranış bu mu, uygulanacak mı?

---

## BÖLÜM E — 📁 SONRAKİ TUR NOTLARI (bu turda uygulama YOK)

### E.1 — Kapsam dışı envanter/teşhis raporları (sonraki tur: benzer denetim)
Bu tur yalnız 6 strateji/persona belgesini denetledi. Aşağıdakiler için de aynı "belge↔kod" denetimi ayrı tur:
`teshis-raporu-2026-08-02`, `depo-denetimi-2026-08-02`, `hayalet-backend-2026-08-02`, `kapasite-analizi-2026-08-02`,
`kart-havuz-backend-envanteri-2026-08-02`, `katilim-modeli-mevcut-durum-notu-2026-08-02`, `mentor-karti-rakip-analizi-2026-08-02`,
`platform-admin-panel-envanteri-2026-08-02`, `stk-yonetici-panel-envanteri-2026-08-02`, `tema-durum-ve-landing-maliyeti-2026-08-02`,
`degerlendirme-test-soru-envanteri-2026-08-15`, `eksikler-derinlestirilmis-2026-08-15`,
`belge-mimarisi-ve-merge-cozumu-onerileri-2026-08-19`, `tam-envanter-gercek-durum-2026-08-19`, `icerik/*`.

### E.2 — Klasör ayrımı önerisi (strateji ↔ envanter)
`docs/raporlar/` iki tür belge karışık tutuyor: **strateji/vizyon** ("olması gereken") ↔ **envanter/fotoğraf** ("mevcut durum").
Öneri: `docs/raporlar/strateji/` ve `docs/raporlar/envanter/` alt klasörleri. Böylece "ideal mi, gerçek mi" karışmaz.
(Uygulama yok — öneri; `00-INDEX.md` ve `belge-duzeni-rehberi.md` ile uyumlu yürütülmeli.)

### E.3 — İsim benzerliği (karışabilecek çiftler) + ayırt edici ad önerisi
- `platform-admin-panel-envanteri` ↔ `platform-admin-strateji` → `...-envanter-mevcut` / `...-strateji-ideal`
- `stk-yonetici-panel-envanteri` ↔ `stk-yonetici-strateji` → aynı desen
- `yonetici-persona-ve-metrikler` ↔ `stk-yonetici-strateji` (ikisi de yönetici) → persona vs panel-strateji ayrımı ada yazılabilir
- `tam-envanter-gercek-durum` ↔ **bu rapor** `strateji-gercek-denetimi` → ikisi de "gerçek durum"; bu rapor "strateji-KIYAS", diğeri "genel envanter" — ad netleştirilebilir

### E.4 — Arşiv adayları (öneri; silme ASLA)
- **`admin-panelleri-tasarim-2026-08-02` → güçlü arşiv adayı:** 6 panel + oyunlaştırma **büyük ölçüde uygulanmış** (B.5).
  Tasarım sunumu görevini tamamladı. `docs/arsiv/`'e taşınabilir (üstüne "uygulandı, bkz. bu denetim" notuyla).
- Diğer 5 belge (menti/mentör/yönetici-metrik/stk-strateji/platform-strateji): **yaşayan referans** — eksikler (🟡/🔴)
  hâlâ açık; henüz arşivlik değil. Eksikler kapandıkça yeniden değerlendirilir.

### E.5 — ⚠️ CANLI ÖNCESİ DENETİM LİSTESİ (yeni — ayrı tur; bu turda uygulama YOK)
> PO'nun tarif ettiği kontrol listesi. ⚠️ Klasik pazarlama sitesi için yazılmış; bu ürün **giriş yapılan bir uygulama** —
> bazı maddeler uymaz. SEO maddeleri yalnız **public/landing** sayfalara. "Tüm geliştirme bitince ayrı tur" işaretiyle kaydedildi.

**Yalnız public/landing sayfalar için geçerli (SEO):** benzersiz `<title>`'lar · meta description · Open Graph/Twitter kartları ·
JSON-LD schema · robots.txt · Search Console doğrulama · hero CTA · iç linkleme · breadcrumb · SSS · site hızı/performans · sticky CTA · görsel alt etiketleri · 404 sayfası · teşekkür sayfası.
**Uymayabilir (giriş yapılan uygulama):** portfolyo · harita/adres · müşteri yorumları · ekip fotoğrafları — landing'de opsiyonel, uygulama-içinde anlamsız.
**Zorunlu KVKK/hukuk sayfaları:** KVKK · gizlilik · çerez (kod'da `kvkk`, `gizlilik`, `terms` sayfaları MEVCUT — teyit edildi).
**Uygulamaya özel EK maddeler (önerilen):**
- Uygulama-içi (giriş sonrası) sayfaların arama motoruna **KAPALI** olduğu teyidi (KVKK — kullanıcı verisi indekslenmemeli).
- **Boş-durum ekranları:** eşleşmesi olmayan menti/mentör, yeni/boş kurum (bazıları var — B.1/9, B.3 empty-state'ler; tam tarama gerekli).
- **Hata/yükleniyor durumları:** her panelde loading skeleton + AlertMessage tutarlılığı (desen var — B.5/DS; uçtan uca test).
- **Mail akışlarının uçtan uca testi:** 37m mail açılınca davet/onay/bildirim/nudge e-postaları gerçekten gidiyor mu.
- **Mobil kullanılabilirlik:** çok-kolonlu yönetici tabloları (havuz, eşleşme, sertifika) mobilde okunuyor mu.
- **Yedekleme/geri dönüş** · **foto/avatar volume kalıcılığı** (avatarStorage) · **sunucu güvenliği** (prod ayrı Postgres).
- **Global seed doğrulaması** (Y6) — canlıda A8/oyunlaştırma boş görünmesin.

---
*Denetim raporu — üçlü persona + strateji setinin kod gerçeğiyle karşılaştırması.*
