> 🧊 DONMUŞ — rutin turda okunmaz (yalnız bir kalemin geçmişi aranırken, grep ile).
> TÜR: 🧊 · SON DOĞRULAMA: 2026-09-26 (📸 fotoğraf tarihi) · TAZELEME TETİKLEYİCİSİ: KALICI — tazeleme gerekmez (dondurulmuş)
> ⚠️ Tarama fotoğrafı (OTONOM-PROMPT K5-Y3); sezgisel eşleştirme — dinamik yollarda test gözden kaçmış olabilir.

# K5-Y3 · eksik negatif testler (2026-09-26)

Kaynak: backend `origin/main` @ 4f92627 · 23 route dosyası · 154 test dosyası · yöntem: uç yolu (ve yol-değişkeni/yardımcı fonksiyon çözümlemesi) test `it()` bloklarında aranıp bloktaki beklenen durum kodu + başlık anahtar kelimesiyle sınıflandı, şüpheli eşleşmeler elle ayıklandı. Sezgisel tarama: ✅ = en az bir aday test bulundu (dosya:satır), ❌ = bulunamadı. Yanlış negatif mümkündür (dinamik yol kuran testler).

**Zincir kısaltmaları:** T=requireTenant · auth=requireAuth() · ADMIN/MENTOR/MENTI=requireRole · role(A,MR,MI)=çok rollü requireRole · self=requireSelfOrAdmin · PA=requirePlatformAdmin · ctrl-inline=route'ta middleware yok, kontrol controller içinde (authenticateTenantAdmin) · rl=rate limit.
**Uygulanabilirlik:** b yalnız rol kısıtlı zincirde; c platform-admin uçlarında "—" (tasarım gereği kurumlar arası); d yalnız `:param`'lı kurum uçlarında.
**Genel ara katman kapsamı:** requireTenant'ın "başka kurumun X-Tenant-Id başlığı → 403" davranışı uçtan bağımsız olarak `hardening.test.ts:51` ve `tenant-suspension.test.ts:131`'de test ediliyor; tablodaki (c) **uca özgü** kaynak/veri izolasyon testini arar.

## Sayım
- Taranan uç (kasıtlı public hariç): **179**
- Kurum uçlarında (c) veya (d) testi eksik olan: **134** (platform-admin uçları sayıma dahil değil)
- Hiç HTTP testi olmayan router aileleri: `clubRoutes` (7 uç), `jobListingRoutes` (4 uç) — test app'e mount edilmemiş.

## Tablo
| Uç | Zincir | a 401 | b 403 rol | c kurum | d IDOR | Not |
|---|---|---|---|---|---|---|
| `GET /api/admin/kpi` | T+ADMIN | ❌ | ✅ tenant-suspension.test.ts:62, tenant-suspension.test.ts:87 | ❌ | — |  |
| `GET /api/admin/kpi/export` | T+ADMIN | ✅ kpi-csv-export.test.ts:115 | ✅ kpi-csv-export.test.ts:103, kpi-csv-export.test.ts:109 | ✅ kpi-csv-export.test.ts:82, kpi-csv-export.test.ts:96 | — | c: kpi-csv-export.test.ts:96 (not.toBe(200)) |
| `GET /api/admin/health-metrics` | T+ADMIN | ❌ | ❌ | ❌ | — |  |
| `GET /api/admin/users` | T+ADMIN | ✅ admin.test.ts:209 | ✅ admin.test.ts:202, degerlendirme-metrik-asama1.test.ts:198 | ✅ admin.test.ts:174 | — |  |
| `GET /api/admin/matches` | T+ADMIN | ❌ | ✅ degerlendirme-metrik-asama1.test.ts:288 | ❌ | — |  |
| `GET /api/admin/mentors/certification-results` | T+ADMIN | ❌ | ❌ | ❌ | — |  |
| `POST /api/admin/users/:id/approve` | T+ADMIN | ❌ | ✅ admin.test.ts:58 | ✅ admin.test.ts:99 | ❌ |  |
| `POST /api/admin/users/:id/reject` | T+ADMIN | ✅ session-revocation.test.ts:68 | ❌ | ❌ | ❌ |  |
| `POST /api/admin/users/:id/request-correction` | T+ADMIN | ❌ | ❌ | ❌ | ❌ |  |
| `POST /api/admin/users/:id/rematch` | T+ADMIN | ❌ | ❌ | ❌ | ❌ |  |
| `POST /api/admin/users/:id/nudge` | T+ADMIN | ❌ | ❌ | ❌ | ❌ |  |
| `GET /api/admin/users/:id/coaching-suggestions` | T+ADMIN | ❌ | ❌ | ❌ | ❌ |  |
| `GET /api/admin/tags/pending` | T+ADMIN | ❌ | ❌ | ❌ | — |  |
| `POST /api/admin/tags/:id/approve` | T+ADMIN | ❌ | ❌ | ❌ | ❌ |  |
| `POST /api/admin/tags/:id/merge` | T+ADMIN | ❌ | ❌ | ❌ | ❌ |  |
| `POST /api/admin/tags/:id/reject` | T+ADMIN | ❌ | ❌ | ❌ | ❌ |  |
| `POST /api/admin/visibility-optin/:optInId/confirm` | T+ADMIN | ❌ | ❌ | ❌ | ❌ |  |
| `GET /api/admin/algorithm-tuner/pending` | T+ADMIN | ❌ | ❌ | ❌ | — |  |
| `GET /api/admin/algorithm-tuner/weights` | T+ADMIN | ❌ | ❌ | ✅ algorithm-weights-manual.test.ts:232 | — |  |
| `PUT /api/admin/algorithm-tuner/weights` | T+ADMIN | ❌ | ✅ algorithm-weights-manual.test.ts:92 | ✅ algorithm-weights-manual.test.ts:102, algorithm-weights-manual.test.ts:232 | — |  |
| `POST /api/admin/algorithm-tuner/approve` | T+ADMIN | ❌ | ❌ | ❌ | — |  |
| `POST /api/admin/algorithm-tuner/reject` | T+ADMIN | ❌ | ❌ | ❌ | — |  |
| `POST /api/admin/cron/run-tuning` | T+ADMIN | ❌ | ❌ | ❌ | — |  |
| `POST /api/admin/cron/run-purge` | T+ADMIN | ❌ | ❌ | ❌ | — |  |
| `GET /api/admin/reports` | T+ADMIN | ❌ | ❌ | ❌ | — |  |
| `PATCH /api/admin/reports/:id` | T+ADMIN | ❌ | ❌ | ❌ | ❌ |  |
| `GET /api/admin/managers` | T+ADMIN | ✅ session-revocation.test.ts:37 | ✅ session-revocation.test.ts:37, session-revocation.test.ts:55 | ❌ | — |  |
| `POST /api/admin/users/:id/promote-admin` | T+ADMIN | ❌ | ✅ security-audit-2.test.ts:116 | ❌ | ❌ | yalnız 3-admin limiti (security-audit-2.test.ts:117) |
| `POST /api/admin/users/:id/demote-admin` | T+ADMIN | ✅ session-revocation.test.ts:37 | ✅ session-revocation.test.ts:37 | ❌ | ❌ |  |
| `PATCH /api/tenants/:id/settings` | ctrl-inline | ❌ | ✅ tenant-admin-inactive-membership.test.ts:105, tenant-admin-inactive-membership.test.ts:53 | ✅ tenant-admin-inactive-membership.test.ts:98 | ❌ | c: tenant-admin-inactive-membership.test.ts:99 |
| `POST /api/tenants/:id/block-pair` | ctrl-inline | ❌ | ✅ tenant-admin-inactive-membership.test.ts:65 | ❌ | ❌ |  |
| `GET /api/agreements/active` | T+auth | ❌ | — | ❌ | — |  |
| `POST /api/agreements` | T+role(A,MR,MI) | ❌ | ✅ security-audit-2.test.ts:337 | ❌ | — |  |
| `POST /api/agreements/:id/confirm` | T+auth | ❌ | — | ❌ | ✅ feedback-loop.test.ts:337 |  |
| `POST /api/agreements/:id/renew` | T+auth | ❌ | — | ❌ | ❌ |  |
| `POST /api/agreements/:id/end` | T+auth | ❌ | — | ❌ | ❌ |  |
| `GET /api/analytics/:userId` | T+auth+self | ❌ | — | ❌ | ✅ analytics-idor.test.ts:44 |  |
| `GET /api/auth/me` | T | ✅ auth-route-order.test.ts:9, session-revocation.test.ts:68 | — | ✅ session-tenant-branding.test.ts:58 | — |  |
| `POST /api/auth/reconsent` | T | ✅ gv18-reconsent.test.ts:70 | — | ❌ | — |  |
| `POST /api/auth/change-password` | ? | ✅ gv19-change-password.test.ts:102, gv19-change-password.test.ts:40 | — | ❌ | — |  |
| `POST /api/auth/reapply` | rl | — | — | ❌ | — |  |
| `GET /api/clubs` | T+auth | ❌ | — | ❌ | — | router test app'e (tests/helpers/request.ts) MOUNT EDİLMEMİŞ — HTTP testi yok |
| `POST /api/clubs` | T+ADMIN | ❌ | ❌ | ❌ | — | router test app'e (tests/helpers/request.ts) MOUNT EDİLMEMİŞ — HTTP testi yok |
| `GET /api/clubs/:id` | T+auth | ❌ | — | ❌ | ❌ | router test app'e (tests/helpers/request.ts) MOUNT EDİLMEMİŞ — HTTP testi yok |
| `PATCH /api/clubs/:id` | T+ADMIN | ❌ | ❌ | ❌ | ❌ | router test app'e (tests/helpers/request.ts) MOUNT EDİLMEMİŞ — HTTP testi yok |
| `GET /api/clubs/:id/members` | T+auth | ❌ | — | ❌ | ❌ | router test app'e (tests/helpers/request.ts) MOUNT EDİLMEMİŞ — HTTP testi yok |
| `POST /api/clubs/:id/members` | T+ADMIN | ❌ | ❌ | ❌ | ❌ | router test app'e (tests/helpers/request.ts) MOUNT EDİLMEMİŞ — HTTP testi yok |
| `DELETE /api/clubs/:id/members/:userId` | T+ADMIN | ❌ | ❌ | ❌ | ❌ | router test app'e (tests/helpers/request.ts) MOUNT EDİLMEMİŞ — HTTP testi yok |
| `GET /api/conversations/unread-count` | T+auth | ❌ | — | ❌ | — |  |
| `GET /api/conversations` | T+auth | ❌ | — | ❌ | — |  |
| `POST /api/conversations` | T+MENTI | ❌ | ✅ kr19b-pair-block-message-request.test.ts:54, kr19b-pair-block-message-request.test.ts:82 | ❌ | — |  |
| `GET /api/conversations/:id/messages` | T+auth | ❌ | — | ❌ | ✅ conversation.test.ts:129, conversation.test.ts:171 |  |
| `POST /api/conversations/:id/messages` | T+auth | ❌ | — | ❌ | ✅ conversation.test.ts:129, conversation.test.ts:171 |  |
| `POST /api/conversations/:id/read` | T+auth | ❌ | — | ❌ | ✅ conversation.test.ts:129 |  |
| `POST /api/feedback-logs` | T+role(A,MR) | ❌ | ✅ feedbacklog-identity.test.ts:76 | ❌ | — | test app'te mount yok; yalnız özel app (feedbacklog-identity, security-audit-2) |
| `GET /api/feedback-logs` | T+auth | ❌ | — | ❌ | — | test app'te mount yok; yalnız özel app (feedbacklog-identity, security-audit-2) |
| `GET /api/feedback-logs/combination-scores` | T+ADMIN | ❌ | ❌ | ❌ | — | test app'te mount yok; yalnız özel app (feedbacklog-identity, security-audit-2) |
| `GET /api/feedback-logs/:id` | T+auth | ❌ | — | ❌ | ❌ | test app'te mount yok; yalnız özel app (feedbacklog-identity, security-audit-2) |
| `GET /api/job-listings` | T+auth | ❌ | — | ❌ | — | router test app'e (tests/helpers/request.ts) MOUNT EDİLMEMİŞ — HTTP testi yok |
| `POST /api/job-listings` | T+ADMIN | ❌ | ❌ | ❌ | — | router test app'e (tests/helpers/request.ts) MOUNT EDİLMEMİŞ — HTTP testi yok |
| `GET /api/job-listings/:id` | T+auth | ❌ | — | ❌ | ❌ | router test app'e (tests/helpers/request.ts) MOUNT EDİLMEMİŞ — HTTP testi yok |
| `PATCH /api/job-listings/:id` | T+ADMIN | ❌ | ❌ | ❌ | ❌ | router test app'e (tests/helpers/request.ts) MOUNT EDİLMEMİŞ — HTTP testi yok |
| `GET /api/admin/learning-journey/stages` | T+ADMIN | ❌ | ✅ learning-journey.test.ts:303 | ❌ | — |  |
| `POST /api/admin/learning-journey/stages` | T+ADMIN | ❌ | ❌ | ❌ | — |  |
| `POST /api/admin/learning-journey/stages/reorder` | T+ADMIN | ❌ | ✅ learning-journey.test.ts:285 | ❌ | — |  |
| `PATCH /api/admin/learning-journey/stages/:stageId` | T+ADMIN | ❌ | ✅ learning-journey.test.ts:227 | ❌ | ❌ |  |
| `DELETE /api/admin/learning-journey/stages/:stageId` | T+ADMIN | ❌ | ✅ learning-journey.test.ts:227 | ❌ | ❌ |  |
| `POST /api/admin/learning-journey/stages/:stageId/customize` | T+ADMIN | ❌ | ❌ | ❌ | ❌ |  |
| `POST /api/admin/learning-journey/stages/:stageId/hide` | T+ADMIN | ❌ | ❌ | ❌ | ❌ |  |
| `DELETE /api/admin/learning-journey/stages/:stageId/hide` | T+ADMIN | ❌ | ❌ | ❌ | ❌ |  |
| `GET /api/learning-journey/stages` | T+role(MR,MI) | ❌ | ❌ | ✅ learning-journey.test.ts:321 | — |  |
| `GET /api/learning-journey/status` | T+role(MR,MI) | ❌ | ❌ | ❌ | — |  |
| `POST /api/learning-journey/complete` | T+role(MR,MI) | ❌ | ❌ | ❌ | — |  |
| `POST /api/learning-journey/stages/:stageId/select` | T+role(MR,MI) | ❌ | ❌ | ❌ | ❌ |  |
| `POST /api/meetings/availability` | T+MENTOR | ❌ | ❌ | ❌ | — |  |
| `GET /api/meetings/availability` | T+auth | ❌ | — | ❌ | — |  |
| `POST /api/meetings/book` | T+MENTI | ❌ | ✅ meetings.test.ts:130 | ❌ | — |  |
| `GET /api/meetings/active` | T+auth | ❌ | — | ❌ | — |  |
| `GET /api/meetings/weekly-limit` | T+auth | ✅ meetings.test.ts:368 | — | ✅ meetings.test.ts:372 | — |  |
| `POST /api/meetings/:meetingId/feedback-prompted` | T+auth | ❌ | — | ❌ | ❌ |  |
| `POST /api/meetings` | T+role(A,MI) | ❌ | ✅ create-meeting-identity.test.ts:57, create-meeting-identity.test.ts:65 | ❌ | — |  |
| `GET /api/meetings` | T+auth | ❌ | — | ❌ | — |  |
| `PATCH /api/meetings/:id` | T+role(A,MR) | ❌ | ❌ | ❌ | ✅ meeting-ownership.test.ts:58 |  |
| `POST /api/meetings/:meetingId/feedback` | T+role(A,MR,MI) | ❌ | ✅ meeting-feedback-ownership.test.ts:104 | ❌ | ✅ meeting-feedback-ownership.test.ts:77 | elle düzeltildi ("taraf olmayan") |
| `GET /api/meetings/:meetingId/feedback` | T+auth | ❌ | — | ❌ | ✅ meeting-feedback-ownership.test.ts:118 | elle düzeltildi |
| `POST /api/meetings/:meetingId/approve` | T+MENTOR | ❌ | ❌ | ❌ | ❌ |  |
| `POST /api/meetings/:meetingId/reject` | T+MENTOR | ❌ | ❌ | ❌ | ❌ |  |
| `POST /api/meetings/:meetingId/mark-not-happened` | T+MENTOR | ❌ | ✅ meeting-mark-not-happened.test.ts:74 | ❌ | ✅ meeting-mark-not-happened.test.ts:62 |  |
| `POST /api/meetings/:meetingId/check-in` | T+auth | ❌ | — | ❌ | ❌ |  |
| `GET /api/meetings/:meetingId/check-ins` | T+auth | ✅ checkin-visibility.test.ts:90 | — | ✅ checkin-visibility.test.ts:83 | ❌ |  |
| `GET /api/meetings/pair-signal` | T+ADMIN | ❌ | ❌ | ❌ | — |  |
| `POST /api/meetings/reminders/send` | T+ADMIN | ❌ | ❌ | ❌ | — |  |
| `DELETE /api/meetings/orientation-lock/:userId` | T+ADMIN | ❌ | ❌ | ❌ | ❌ |  |
| `POST /api/users/profile/complete` | T+auth | ❌ | — | ❌ | — |  |
| `GET /api/users/disc/questions` | T+auth | ❌ | — | ❌ | — |  |
| `POST /api/users/disc/submit` | T+auth | ✅ hardening.test.ts:333 | — | ❌ | — |  |
| `PATCH /api/users/me/social` | T+auth | ❌ | — | ❌ | — |  |
| `PATCH /api/users/me/matching-preferences` | T+auth | ❌ | — | ❌ | — |  |
| `GET /api/platform/stats` | PA | ✅ security-audit-2.test.ts:88 | ❌ | — | — |  |
| `GET /api/platform/health` | PA | ❌ | ❌ | — | — |  |
| `GET /api/platform/logs` | PA | ❌ | ❌ | — | — |  |
| `GET /api/platform/tenants/pending` | PA | ❌ | ❌ | — | — |  |
| `GET /api/platform/tenants` | PA | ❌ | ❌ | — | — |  |
| `POST /api/platform/tenants/:id/approve` | PA | ❌ | ❌ | — | — |  |
| `POST /api/platform/tenants/:id/reject` | PA | ❌ | ❌ | — | — |  |
| `POST /api/platform/tenants/:id/request-correction` | PA | ✅ tenant-correction.test.ts:69 | ❌ | — | — |  |
| `POST /api/platform/tenants/:id/freeze` | PA | ❌ | ✅ tenant-suspension.test.ts:174, tenant-suspension.test.ts:185 | — | — |  |
| `POST /api/platform/tenants/:id/activate` | PA | ❌ | ❌ | — | — |  |
| `GET /api/platform/tenants/:id/overview` | PA | ❌ | ❌ | — | — |  |
| `GET /api/platform/tenants/:id/members` | PA | ❌ | ❌ | — | — |  |
| `GET /api/platform/tenants/:id/meetings` | PA | ❌ | ❌ | — | — |  |
| `GET /api/platform/tenants/:id/analytics` | PA | ❌ | ❌ | — | — |  |
| `GET /api/platform/suspicion-reports` | PA | ✅ platform-read-audit.test.ts:80 | ❌ | — | — |  |
| `POST /api/platform/suspicion-reports/:id/review` | PA | ❌ | ❌ | — | — |  |
| `GET /api/platform/user-reports` | PA | ❌ | ❌ | — | — |  |
| `PATCH /api/platform/user-reports/:id` | PA | ❌ | ❌ | — | — |  |
| `GET /api/platform/anomalies` | PA | ❌ | ❌ | — | — |  |
| `GET /api/questions` | T+auth | ✅ authorization.test.ts:130 | — | ✅ question-list-admin.test.ts:90 | — |  |
| `POST /api/questions` | T+ADMIN | ❌ | ✅ questions.test.ts:54 | ❌ | — |  |
| `POST /api/questions/respond` | T+auth | ✅ authorization.test.ts:144 | — | ❌ | — |  |
| `GET /api/questions/my-responses` | T+auth | ✅ authorization.test.ts:137 | — | ❌ | — |  |
| `GET /api/questions/hidden` | T+ADMIN | ❌ | ✅ question-hidden-list.test.ts:71, question-hidden-list.test.ts:80 | ✅ question-hidden-list.test.ts:89 | — |  |
| `PATCH /api/questions/:questionId` | T+ADMIN | ❌ | ❌ | ❌ | ❌ |  |
| `DELETE /api/questions/:questionId` | T+ADMIN | ❌ | ❌ | ❌ | ❌ |  |
| `POST /api/questions/:questionId/hide` | T+ADMIN | ❌ | ✅ questions.test.ts:124, questions.test.ts:40 | ✅ question-hidden-list.test.ts:89 | ❌ |  |
| `DELETE /api/questions/:questionId/hide` | T+ADMIN | ❌ | ❌ | ❌ | ❌ |  |
| `POST /api/questions/:questionId/respond` | T+auth | ✅ authorization.test.ts:152 | — | ❌ | ❌ |  |
| `POST /api/tenants/self-serve/resubmit` | ctrl-inline | ❌ | ❌ | ❌ | — |  |
| `PATCH /api/tenants/:id/onboarding` | ctrl-inline | ❌ | ❌ | ❌ | ❌ |  |
| `GET /api/tenants/:slug/preview` | ctrl-inline | ❌ | ❌ | ❌ | — |  |
| `POST /api/tenants/:id/invitations` | ctrl-inline | ❌ | ✅ tenant-verification.test.ts:97 | ❌ | ❌ |  |
| `GET /api/tenants/:id/invitation-templates` | ctrl-inline | ❌ | ✅ tenant-admin-inactive-membership.test.ts:80, tenant-suspension.test.ts:62 | ❌ | ❌ |  |
| `PUT /api/tenants/:id/invitation-templates` | ctrl-inline | ❌ | ❌ | ❌ | ❌ |  |
| `POST /api/scoring/compute-profile` | T+auth | ❌ | — | ❌ | — |  |
| `POST /api/scoring/rank-mentors` | T+auth | ❌ | — | ✅ rank-mentors-ownership.test.ts:65 | — |  |
| `POST /api/scoring/feedback` | T+role(MR,MI) | ❌ | ✅ scoring-feedback-ownership.test.ts:86 | ✅ scoring-feedback-ownership.test.ts:117 | — |  |
| `GET /api/scoring/certification/questions` | T+MENTOR | ✅ certification.test.ts:290 | ❌ | ❌ | — |  |
| `POST /api/scoring/certification/answer` | T+MENTOR | ❌ | ❌ | ❌ | — |  |
| `POST /api/scoring/certify` | T+MENTOR | ❌ | ❌ | ❌ | — |  |
| `GET /api/scoring/certification/topics` | T+ADMIN | ❌ | ✅ certification.test.ts:293 | ❌ | — |  |
| `PATCH /api/scoring/certification/topics` | T+ADMIN | ❌ | ❌ | ❌ | — |  |
| `GET /api/super-admin/dashboard` | PA | ❌ | ❌ | — | — |  |
| `PATCH /api/super-admin/tenants/:id/status` | PA | ❌ | ❌ | — | — |  |
| `GET /api/super-admin/tenants/pending` | PA | ❌ | ❌ | — | — |  |
| `PATCH /api/super-admin/tenants/:id/verify` | PA | ❌ | ❌ | — | — |  |
| `GET /api/system-logs` | PA | ✅ security.test.ts:134 | ✅ security.test.ts:138, security.test.ts:151 | — | — |  |
| `GET /api/tenants` | PA | ❌ | ❌ | — | — |  |
| `POST /api/tenants` | PA | ❌ | ❌ | — | — |  |
| `GET /api/tenants/:id` | PA | ✅ authorization.test.ts:178, authorization.test.ts:47 | ✅ authorization.test.ts:178 | — | — |  |
| `PATCH /api/tenants/:id` | PA | ✅ authorization.test.ts:42 | ❌ | — | — |  |
| `GET /api/users` | T+auth | ❌ | — | ❌ | — |  |
| `GET /api/users/mentor-count` | T+auth | ❌ | — | ❌ | — |  |
| `POST /api/users` | T+ADMIN | ❌ | ❌ | ❌ | — |  |
| `GET /api/users/:id` | T+auth | ✅ hardening.test.ts:77, security.test.ts:46 | — | ✅ hardening.test.ts:50, hardening.test.ts:64 | — | d: aynı kurumda profil görme tasarım gereği; onay kapısı user-detail-approval-gate.test.ts:27 |
| `PATCH /api/users/me/profile` | T+auth | ✅ profile.test.ts:100 | — | ❌ | — |  |
| `POST /api/users/me/avatar` | T+auth+rl | ❌ | — | ❌ | — |  |
| `PATCH /api/users/:id` | T+ADMIN | ✅ session-revocation.test.ts:88 | ✅ profile.test.ts:108 | ❌ | ❌ |  |
| `POST /api/users/:id/temperament-test` | T+role(A,MI) | ❌ | ❌ | ❌ | ✅ security-audit-2.test.ts:223 |  |
| `GET /api/mentors/:mentorId/candidates` | T+role(A,MR) | ✅ matching.test.ts:58 | ✅ matching-approval-gate.test.ts:53 | ✅ matching-ranking.test.ts:123, matching-ranking.test.ts:134 | ❌ |  |
| `GET /api/mentis/:mentiId/mentor-matches` | T+role(A,MI)+self | ✅ matching-approval-gate.test.ts:43 | ✅ matching-approval-gate.test.ts:35, matching-approval-gate.test.ts:43 | ✅ matching-ranking.test.ts:134 | ✅ mentor-matches.test.ts:54 |  |
| `POST /api/mentors/:mentorId/visibility-optin` | T+role(A,MR)+self | ❌ | ❌ | ✅ matching.test.ts:130 | ✅ visibility-optin-idor.test.ts:46 |  |
| `GET /api/mentors/:mentorId/dashboard-metrics` | T+role(A,MR)+self | ❌ | ❌ | ❌ | ❌ |  |
| `POST /api/users/:id/report` | T+auth | ❌ | — | ❌ | ❌ |  |
| `GET /api/requests` | T+auth | ❌ | — | ❌ | — |  |
| `GET /api/requests/:id` | T+auth | ❌ | — | ❌ | ❌ |  |
| `POST /api/requests` | T+auth | ❌ | — | ✅ tenant-isolation-fixes.test.ts:69 | — |  |
| `GET /api/users/:userId/clubs` | T+auth+self | ✅ security.test.ts:109 | — | ❌ | ✅ clubs-idor.test.ts:44 |  |
| `PATCH /api/users/:id/self-profile` | T+auth | ❌ | — | ❌ | ✅ security-audit-2.test.ts:262 |  |
| `GET /api/users/:id/adaptive-test/next` | T+auth | ❌ | — | ❌ | ❌ |  |
| `POST /api/users/:id/adaptive-test/answer` | T+auth | ❌ | — | ❌ | ❌ |  |
| `GET /api/users/:id/adaptive-test/preview` | T+auth | ❌ | — | ✅ adaptive-preview-scope.test.ts:41 | ✅ adaptive-preview-scope.test.ts:48 |  |
| `GET /api/mentors/:mentorId/filter` | T+role(A,MR)+self | ❌ | ❌ | ✅ tenant-isolation-fixes.test.ts:22 | ✅ mentor-filter-idor.test.ts:81 |  |
| `PUT /api/mentors/:mentorId/filter` | T+role(A,MR)+self | ❌ | ❌ | ❌ | ✅ mentor-filter-idor.test.ts:34 |  |
| `POST /api/users/me/orientation-completed` | T+MENTI | ❌ | ✅ feedback-loop.test.ts:178 | ❌ | — |  |
| `POST /api/users/:id/anonymize` | T+ADMIN | ❌ | ❌ | ❌ | ❌ | yalnız servis düzeyi test (gdpr-anonymize); HTTP uç testi yok |
| `DELETE /api/users/:id/hard-delete` | T+ADMIN | ❌ | ❌ | ❌ | ❌ | yalnız servis düzeyi test (gdpr-anonymize:293) |
| `GET /api/users/:id/export` | T+auth+rl | ❌ | — | ❌ | ❌ | yalnız rate-limit testi (export-id-rate-limit.test.ts:38) |
| `GET /api/me/data-export` | T+auth+rl | ✅ me-data-rights.test.ts:72 | — | ❌ | — |  |
| `POST /api/me/delete-account` | T+auth+rl | ❌ | — | ❌ | — |  |

## ÖNCELİK LİSTESİ — (c)/(d) eksik, PII veya kurum verisi döndüren/yazan en riskli 10 uç
1. `GET /api/users/:id/export` — `src/routes/userRoutes.ts:192` · requireAuth yalnız; tam kişisel veri dışa aktarımı; başka kullanıcı (d) ve başka kurum yöneticisi (c) testi yok.
2. `POST /api/users/:id/anonymize` — `src/routes/userRoutes.ts:180` (+ `DELETE /users/:id/hard-delete` `:185`) · geri dönülmez; başka kurumun kullanıcısını anonimleştirme (c) HTTP testi yok.
3. `POST /api/admin/users/:id/promote-admin` — `src/routes/adminRoutes.ts:92` (+ demote `:93`) · yetki yükseltme; başka kurum üyesini yönetici yapma (c) testi yok.
4. `GET /api/feedback-logs/:id` — `src/routes/feedbackLogRoutes.ts:30` · kişi hakkında yazılmış değerlendirme; hiç test yok (c+d).
5. `GET /api/requests/:id` — `src/routes/userRoutes.ts:112` · eşleşme talebi + mesaj; hiç test yok (c+d). (Liste ucu `requests-list-idor` ile korunuyor, tekil uç değil.)
6. `GET /api/admin/users/:id/coaching-suggestions` — `src/routes/adminRoutes.ts:63` · kişi bazlı koçluk çıktısı; hiç test yok.
7. `PATCH /api/admin/reports/:id` — `src/routes/adminRoutes.ts:88` (+ `GET /admin/reports` `:87`) · kullanıcı şikâyetleri (PII); başka kurumun raporunu inceleme (c) testi yok.
8. `PATCH /api/users/:id` — `src/routes/userRoutes.ts:58` · yönetici başka kurumun kullanıcısını düzenleyebilir mi (c) testi yok (yalnız rol 403 var).
9. `GET /api/users/:id/adaptive-test/next` + `POST .../answer` — `src/routes/userRoutes.ts:131,136` · kişilik verisi yazımı; requireAuth yalnız, başkası adına cevap (d) ve (c) testi yok (preview ucu korunuyor: adaptive-preview-scope).
10. `GET /api/mentors/:mentorId/dashboard-metrics` — `src/routes/userRoutes.ts:100` · mentör metrikleri; requireSelfOrAdmin var ama hiç test yok (c+d).

**Ek not:** `clubRoutes.ts:26-41` (`GET /clubs/:id`, `/:id/members` üye listesi = PII) ve `POST /api/users/:id/report` (`userRoutes.ts:108`), `POST /api/meetings/:meetingId/check-in` (`meetingRoutes.ts:128`), `GET /api/meetings/:meetingId/feedback` (c) ilk 10'un hemen arkasında.
