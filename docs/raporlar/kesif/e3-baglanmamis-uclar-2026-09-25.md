# E-3 · Bağlanmamış uçlar — sınıflama (2026-09-25)

🔄 YAŞAYAN · Kaynak: otonom tur keşfi (salt-okuma; çatı + backend `origin/main`). Kuyruk: `docs/otonom/00-KUYRUK.md` E-3.
Yöntem: backend'deki 190 uç (23 rota dosyası + `server.ts`) frontend `src` ile eşlendi (şablon dizeler, `lib/api/*` sarmalayıcıları dahil; testler hariç) + ikinci derece tarama (çağrılmayan sarmalayıcı, mount edilmemiş bileşen). **⭐ YANLIŞ SORU TUZAĞI** uygulandı: çağrılmayan her uç için "aynı işi yapan başka yol var mı" soruldu.
⛔ Bu belge hiçbir şeyin silinmesini önermez. MÜKERRER ve TERK sınıfları yalnız listelenir; silme/karantina = silme protokolü (PO).

## Özet
| Sınıf | Sayı | Anlamı |
|---|---|---|
| BAĞLA | 10 (1'i 🔴) | İşi yapan başka yol yok; ekrana bağlanırsa kullanıcı değer görür |
| MÜKERRER | 21 | Aynı işi başka bir uç yapıyor (çoğu K-13 / AN-13 altında izleniyor) |
| İÇ/SİSTEM | 7 | OAuth dönüşü, abonelikten çıkma, cron elle tetikleme vb. — ekran gerekmez |
| TERK / ÜRÜN KARARI | 24 | Özelliğin üründe olup olmayacağı belirsiz (kulüp, iş ilanı, feedback-log, KVKK yönetici işlemleri…) |
| **Toplam** | **62** | 55 yol bazlı + 7 ölü sarmalayıcı / mount edilmemiş bileşen |

Rapor `kod-inceleme-2026-09-24.md` D11'deki "28 bağlanmamış"ın büyük kısmı kulüp / iş ilanı / feedback-log aileleri → burada TERK/ÜRÜN'e kondu (özellik var mı yok mu PO sorusu).

## BAĞLA (10)
| Uç | Handler | Kanıt | Öneri · efor · kapı | Kuyruk |
|---|---|---|---|---|
| GET /api/meetings/active | meetingRoutes.ts:54 | "MeetingProvider poller" yorumu var, poller yok; `triggerFeedback` çağrılmıyor | dashboard layout'a poller + mount · M · 🟡 | AN-47 yakını |
| POST /api/scoring/feedback | sjtScoringRoutes.ts:33 | tek çağıran `ContextualFeedbackHost.tsx:46`, bileşen hiç import edilmiyor | üstteki paket | AN-47 |
| POST /api/meetings/:meetingId/feedback-prompted | meetingRoutes.ts:66 | tek çağıran `ContextualFeedbackHost.tsx:63` | üstteki paket | — |
| PATCH /api/meetings/:id (→ COMPLETED) | meetingRoutes.ts:86 | şema COMPLETED'i kabul ediyor (`meetingController.ts:281`); görüşme "tamamlandı"ya geçmiyor | mentöre "Görüşme yapıldı" düğmesi · S · 🔴 | U-01 (KARAR-80/M11) |
| POST /api/agreements | agreementRoutes.ts:19 | `agreementsApi.create` çağrılmıyor; taslak hiç doğmuyor, onayla/yenile/bitir ekranları açılamıyor | eşleşme sonrası "Anlaşma taslağı" formu · M · 🟡 (kim başlatır — ürün sorusu olabilir) | KR-18/KR-19 komşu |
| DELETE /api/questions/:questionId/hide | questionRoutes.ts:61 | yönetici gizleyebiliyor ama geri açamıyor; gizlenen soru ekrandan kayboluyor (`questionService.ts:76`) | admin/questions "Gizlenenler" + "Göster" · S-M · 🟢 (küçük backend eki, migration yok) | — |
| GET /api/meetings/pair-signal | meetingRoutes.ts:132 | sarmalayıcı hazır (`lib/api/meetings.ts:130`), çağrılmıyor | admin/eslesmeler satırına çift sinyali rozeti · S · 🟢 | — |
| GET /api/meetings/:meetingId/check-ins | meetingRoutes.ts:126 | check-in yazılıyor, hiçbir ekranda okunmuyor | meetings "check-in'lerim" · S-M · 🟡 (mahrem veri) | GV-04 (BITTI) |
| POST /api/tenants/:id/block-pair | adminSettingsRoutes.ts:18 | çift engeli backend'de var, arayüzü yok | "Çifti engelle" · S-M · 🟡 · KR-19'dan sonra | KR-19 |
| GET /api/meetings/:meetingId/feedback | meetingRoutes.ts:98 | geri bildirim gönderiliyor, okunmuyor | "verdiğim değerlendirme" · S · 🟡 · düşük değer | — |

**Öncelik (en az emek / en çok değer):** 1) bağlamsal geri bildirim kartı (🟡 M) · 2) anlaşma taslağı formu (🟡 M) · 3) çift sinyali rozeti (🟢 S) · 4) gizlenen soruyu geri açma (🟢 S-M) · 5) check-in geçmişi (🟡 S-M). En yüksek değerli kalem "Görüşme yapıldı" düğmesi, ama KARAR-80/M11'e bağlı (🔴).

## MÜKERRER (21) — yalnız listelendi
| Uç | Handler | İşi yapan yol | Kuyruk |
|---|---|---|---|
| PATCH /api/users/me/social | onboardingRoutes.ts:41 | `/api/users/me/profile` (`profile/page.tsx:147`) | K-13 |
| PATCH /api/users/:id/self-profile | userRoutes.ts:121 | aynı | AN-13 |
| POST /api/users/:id/temperament-test | userRoutes.ts:62 | `/api/users/disc/submit` + adaptive-test | — |
| POST /api/scoring/compute-profile | sjtScoringRoutes.ts:19 | profil disc/adaptive gönderiminde hesaplanıyor | — |
| POST /api/scoring/rank-mentors | sjtScoringRoutes.ts:26 | `/api/mentis/:id/mentor-matches` · `/mentors/:id/candidates` | — |
| GET /api/super-admin/dashboard | superAdminRoutes.ts:14 | `/api/platform/stats` | K-13 |
| PATCH /api/super-admin/tenants/:id/status | superAdminRoutes.ts:15 | `/platform/tenants/:id/freeze`, `/activate` | K-13 |
| GET /api/super-admin/tenants/pending | superAdminRoutes.ts:18 | `/platform/tenants/pending` | K-13 |
| PATCH /api/super-admin/tenants/:id/verify | superAdminRoutes.ts:19 | `/platform/tenants/:id/approve`, `/reject` | K-13 |
| GET /api/system-logs | systemLogRoutes.ts:12 | `/api/platform/logs` | K-13 |
| GET /api/tenants | tenantRoutes.ts:16 | `/api/platform/tenants` | K-13 |
| POST /api/tenants | tenantRoutes.ts:17 | `/api/tenants/self-serve/register` | K-13 |
| GET /api/tenants/:id | tenantRoutes.ts:18 | `/platform/tenants/:id/overview` | K-13 |
| PATCH /api/tenants/:id | tenantRoutes.ts:19 | `/tenants/:id/onboarding` + `/:id/settings` (tam ikiz değil — PO teyidi) | K-13 |
| POST /api/meetings | meetingRoutes.ts:74 | `/api/meetings/book` | K-13 · V-15 · GV-06 |
| GET /api/users | userRoutes.ts:27 | `/api/admin/users` + mentor-matches | — |
| POST /api/users | userRoutes.ts:34 | davet akışı `/tenants/:id/invitations` | — |
| POST /api/requests | userRoutes.ts:113 | `POST /api/conversations` (MatchRequest'i kendisi yaratıyor) | Y-04 |
| GET /api/requests | userRoutes.ts:111 | `GET /api/conversations` | Y-04 |
| GET /api/requests/:id | userRoutes.ts:112 | `/conversations/:id/messages` | — |
| GET /api/users/:id/export | userRoutes.ts:192 | kişinin kendisi için `/api/me/data-export`; yöneticinin başkası adına kullanımı ürün sorusu | — |

## İÇ/SİSTEM (7)
OAuth callback (`authRoutes.ts:61`) · abonelikten çıkma (`selfServeRoutes.ts:38`) · cron elle tetikleme ×2 (`adminRoutes.ts:80-81`) · `POST /api/meetings/reminders/send` (cron aynı işi yapıyor) · `POST /api/questions/respond` (toplu/veri taşıma) · `GET /api/feedback-logs/combination-scores` (ADMIN analiz).

## TERK / ÜRÜN KARARI (24) — yalnız listelendi
Kulüp ailesi (7 + `/users/:userId/clubs`) · iş ilanı ailesi (4) · feedback-log ailesi (3; AN-47/KARAR-89) · `GET /api/analytics/:userId` (ham DISC türevi, KVKK hassas) · `POST /api/admin/users/:id/rematch` (KARAR-80/M14) · visibility-optin ×2 (Y-15, KARAR-80/M7) · `DELETE /api/meetings/orientation-lock/:userId` (KARAR-80/M19, KARAR-92) · `PATCH /api/users/:id` (yetki sorusu) · yönetici KVKK işlemleri `anonymize`/`hard-delete` (GV-08 🔴) · `GET /api/tenants/:slug/preview` (sihirbaz önizleme adımı hiç yapılmamış).

## Kuyruğa not
Kuyrukta kendi satırı olmayan BAĞLA kalemleri: bağlamsal geri bildirim kartı · anlaşma taslağı · çift sinyali · soru geri açma · check-in geçmişi · değerlendirme okuma. Kuyruk satırı olmayan MÜKERRER'ler: temperament-test, compute-profile/rank-mentors, `POST /api/users`, requests ailesi.

## ⚠️ GÜNCELLEME (2026-09-25, uygulama sırasında doğrulama)
- ~~[ESKİ · 2026-09-25] BAĞLA: GET /api/meetings/pair-signal — çift sinyali rozeti · S · 🟢~~
  ⚠️ **GÜNCELLEME:** çift sinyali ZATEN ekranda — `frontend/src/app/(admin)/admin/eslesmeler/page.tsx:163-181` "Risk" sütunu (İyi/Dikkat/Riskli/Veri yok, `lib/adminMetrics.ts:22-27`); veri yönetici çift listesinden (`backend/src/controllers/adminController.ts:390-437`, aynı `pairSignal.service.ts`, "#7 Aşama 1"). ⇒ `GET /api/meetings/pair-signal` **MÜKERRER** (yanlış soru tuzağı). Silinmez; K-13/E-4 silme protokolü adayı. Sayılar: BAĞLA 9 · MÜKERRER 22.
- ~~[ESKİ · 2026-09-25] "Yönetici soruyu gizleyebiliyor (`questions/page.tsx:49`) ama geri açamıyor"~~
  ⚠️ **GÜNCELLEME:** "Gizle" düğmesi 1dfc63f (2026-07-13) ile bilinçli kaldırılmış (DISC soruları gizlenemez; gizlenebilen tek tür global STK_CUSTOM, Y6 sonrası API'den oluşturulamıyor). Geri açma ekranı (E-3b, #127/#308) yalnız eski/API ile oluşmuş gizleme kayıtları için anlamlı.
- ⭐ **Yeni bulgular (E-3b sırasında):** (1) `GET /api/questions` `tenantId` döndürmüyor → admin/questions sayfasında DISC soruları "Kuruma Özel Sorular" altında Düzenle/Sil düğmeleriyle görünüyor (backend 403 veriyor, veri güvende, ekran yanlış); (2) kurumun eklediği STK_CUSTOM sorular `listQuestions` yanıtına hiç eklenmiyor (`stkQuestions` hesaplanıyor ama dönmüyor) → yöneticinin eklediği soru listede görünmüyor. Kuyrukta: E-3c.
