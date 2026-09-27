> 📸 DONDURULMUŞ (2026-09-27) — fotoğraf; güncellenmez. Güncel durum: `docs/otonom/00-KUYRUK.md` (AJ-46 · E-1 ayağı).
> TÜR: 📸 · SON DOĞRULAMA: 2026-09-27 · TAZELEME TETİKLEYİCİSİ: KALICI — tazeleme gerekmez (dondurulmuş)
> Ana belge: `hayalet-envanter-2026-09-19.md` (🧊, değiştirilmedi). Bu ek yalnız **kalem başına niyet kanıtı** sütununu verir (E-1 ölçütü: "her kalem için gerekçe ya da bulunamadı").

# E-1 EKİ · Hayalet envanter — kalem başına niyet kanıtı (2026-09-27)

## Neden bu ek
`bitti-dogrulama-2026-09-27.md` E-1 satırı: ana belge 35 ucu **19 gruplu satırda** veriyor ve "kart/not" sütunu karta ya da ikameye atıf yapıyor; **kalem başına** "neden yazıldı" kanıtı (commit / PR / belge satırı) yok. Bu ek o sütunu tek tek doldurur. Kova ve karar kartı ana belgede kalır — burada tekrarlanmaz.

## Yöntem (tekrarlanabilir)
- **İlk ekleyen commit:** backend `origin/main` @ `b79547d` üzerinde `git log --reverse -S'<işleyici adı ya da yol dizesi>' -- <rota dosyası>` → ilk sonuç. Alanlar için aynı komut `prisma/schema.prisma` üzerinde. Bileşenler için çatı `git log --follow --diff-filter=A`.
- **PR:** commit konusunda `(#N)` varsa o; yoksa `git log --merges --ancestry-path <sha>..origin/main --reverse` ile commit'i main'e taşıyan ilk birleştirme. İkisi de yoksa **PR yok** (doğrudan main — iki erken mega-commit `3e49117` ve `de6be04` böyle).
- **Belge satırı:** niyeti (neden yazıldığını) söyleyen ilk yaşayan/donmuş belge satırı. Satır numaraları çatı `bf44329` itibarıyladır. Kısaltmalar: **KT** = `docs/kararlar/00-KARAR-TAKIP.md` · **YİN** = `docs/raporlar/kod-denetimi/yarim-is-niyet-envanteri-2026-08-23.md` · **KR** = `docs/otonom/01-KARARLAR.md`.
- ⚠️ Mega-commit'lerin gövdesi uç düzeyinde gerekçe içermez; bu durumda niyet **yalnız belgeden** gelir. Belgede de yoksa **GEREKÇE BULUNAMADI** yazılır (uydurulmaz).

## (a) Öksüz backend uçları — 43 kalem (ana belge: "35")

| # | Uç | İlk commit (tarih · konu) | PR | Niyet belgesi (dosya:satır) | Niyet |
|---|---|---|---|---|---|
| 1a | `GET /api/clubs` | `3e49117` (2026-05-22 · ilk iskele) | PR yok | KT:485 · YİN:47 · KR KARAR-9 | Kulüp/topluluk özelliği (backend-first) |
| 1b | `POST /api/clubs` | `3e49117` | PR yok | KT:485 · YİN:47 | aynı |
| 1c | `GET /api/clubs/:id` | `3e49117` | PR yok | KT:485 · YİN:47 | aynı |
| 1d | `PATCH /api/clubs/:id` | `3e49117` | PR yok | KT:485 · YİN:47 | aynı |
| 1e | `GET /api/clubs/:id/members` | `3e49117` | PR yok | KT:485 · YİN:47 | aynı |
| 1f | `POST /api/clubs/:id/members` | `3e49117` | PR yok | KT:485 · YİN:47 | aynı |
| 1h | `DELETE /api/clubs/:id/members/:userId` | `3e49117` | PR yok | KT:485 · YİN:47 | aynı (ana belgenin grup sayısında yoktu) |
| 1g | `GET /api/users/:userId/clubs` | `3e49117` | PR yok | KT:485 | aynı (kişinin kulüpleri) |
| 2a | `GET /api/job-listings` | `3e49117` | PR yok | KR:249 (KARAR-9 seçenek C) · KT:473 (U2 `matchingInterface` "planlı JOB_LISTING") | Kurum iş ilanı + ileride ilan eşleştirmesi |
| 2b | `POST /api/job-listings` | `3e49117` | PR yok | KR:249 · KT:473 | aynı |
| 2c | `GET /api/job-listings/:id` | `3e49117` | PR yok | KR:249 · KT:473 | aynı |
| 2d | `PATCH /api/job-listings/:id` | `3e49117` | PR yok | KR:249 · KT:473 | aynı |
| 3a | `GET /api/super-admin/dashboard` | `de6be04` (2026-07-07 · sprint 8-11) | PR yok | KT:493 · YİN:52 | Eski platform yöneticisi API'si (T6); bugün `/api/platform/*` |
| 3b | `PATCH /api/super-admin/tenants/:id/status` | `de6be04` | PR yok | KT:493 · YİN:52 | aynı |
| 3c | `GET /api/super-admin/tenants/pending` | `7365600` (2026-07-12 · kurum doğrulama sistemi) | main'e #15 ile | commit konusu "kurum doğrulama sistemi" · KT:493 | Kurum doğrulama kuyruğu |
| 3d | `PATCH /api/super-admin/tenants/:id/verify` | `7365600` | main'e #15 ile | commit konusu · KT:493 | Kurum doğrulama |
| 4 | `GET /api/system-logs` | `3e49117` | PR yok | KT:493 | Eski sistem günlüğü; bugün `/api/platform/logs` |
| 5a | `GET /api/tenants` | `3e49117` | PR yok | KT:493 ("platform elle kurum") | Elle kurum yönetimi (ilk iskele) |
| 5b | `POST /api/tenants` | `3e49117` | PR yok | KT:493 | aynı |
| 5c | `GET /api/tenants/:id` | `3e49117` | PR yok | KT:493 | aynı |
| 5d | `PATCH /api/tenants/:id` | `3e49117` | PR yok | KT:493 | aynı |
| 6 | `PATCH /api/users/me/social` | `7df1fae` (2026-07-13 · platform paneli, profil) | main'e #15 ile | KT:492 "**niyet belgede yok**" · commit konusu "profil" | Sosyal profil düzenleme — **belge niyeti YOK**, yalnız commit konusu (ikame: `/api/users/me/profile`, CLAUDE.md § YANLIŞ SORU TUZAĞI) |
| 7 | `PATCH /api/users/:id/self-profile` | `3e49117` | PR yok | `docs/raporlar/bilanco/karar-defteri-2026-08-26.md:341` "**NİYET BELGELENMEMİŞ**" | **GEREKÇE BULUNAMADI** (yalnız ikame kanıtı: `/api/users/me/profile`) |
| 8a | `POST /api/feedback-logs` | `3e49117` | PR yok | KT:486 · YİN:48 | ML geri bildirim döngüsü / kombinasyon analizi |
| 8b | `GET /api/feedback-logs` | `3e49117` | PR yok | KT:486 · YİN:48 | aynı |
| 8c | `GET /api/feedback-logs/:id` | `3e49117` | PR yok | KT:486 · YİN:48 | aynı |
| 8d | `GET /api/feedback-logs/combination-scores` | `3e49117` | PR yok | KT:486 ("`/combination-scores`") · YİN:48 | Kombinasyon skor analizi (ana belgenin grup sayısında yoktu) |
| 9a | `POST /api/admin/cron/run-tuning` | `de6be04` | PR yok | `docs/raporlar/bilanco/kararlar/G10-olu-kod-terk.md:68` "bilinçli debug amaçlı" · KR:280 (KARAR-13) | Zamanlanmış işi elle tetikleme (hata ayıklama) |
| 9b | `POST /api/admin/cron/run-purge` | `de6be04` | PR yok | G10-olu-kod-terk.md:68 · KR:280 | aynı |
| 10 | `POST /api/meetings/reminders/send` | `3e49117` | PR yok | KT:494 · YİN:29 | Hatırlatıcıyı elle gönderme (okuma/tetik tarafı) |
| 11 | `DELETE /api/meetings/orientation-lock/:userId` | `3e49117` | PR yok | KT:494 · YİN:29 | Yöneticinin oryantasyon kilidini kaldırması |
| 12a | `POST /api/users/:id/anonymize` | `de6be04` | PR yok | KT:497 (madde 40) · `docs/devir/03-kvkk-is-paketi.md:42` · rota yorumu "KVKK Md.7 / GDPR Md.17" | Yönetici eliyle KVKK anonimleştirme |
| 12b | `DELETE /api/users/:id/hard-delete` | `de6be04` | PR yok | KT:497 · kvkk-is-paketi:42 · rota yorumu "GDPR Md.17" | Yönetici eliyle kalıcı silme |
| 12c | `GET /api/users/:id/export` | `de6be04` | PR yok | KT:497 · rota yorumu "KVKK Md.11 / GDPR Md.20" | Yönetici eliyle veri dışa aktarma |
| 13a | `GET /api/admin/reports` | `7cfc8d5` (2026-08-05 · kullanıcı şikâyeti) | #26 | KT:487 · YİN:50 | Kurum-içi şikâyet döngüsünün yönetici tarafı |
| 13b | `PATCH /api/admin/reports/:id` | `7cfc8d5` | #26 | KT:487 · YİN:50 | aynı |
| 14 | `POST /api/admin/visibility-optin/:optInId/confirm` | `de6be04` | PR yok | KT:488 · YİN:24 | Mentör görünürlüğü çift onayı |
| 15 | `POST /api/admin/users/:id/rematch` | `de6be04` | PR yok | KT:488 · YİN:24 | Yöneticinin yeniden eşleştirme aksiyonu |
| 16 | `POST /api/tags/suggest` | `de6be04` | PR yok | KT:656 (madde 127, PendingTag öneri akışı) · `operasyonel-hazirlik-2026-09-19.md:447-451` | Kullanıcı etiket önerisi üreticisi (onay kuyruğunu besler) |
| 17 | `GET /api/tenants/:slug/preview` | `de6be04` | PR yok | KR:341-344 (KARAR-17) · `docs/raporlar/bilanco/bolumler/T4-A2-arsiv-strateji.md:256` | Self-serve kurum önizlemesi ("çift-aha" demo) |
| 18 | `POST /api/users/:id/temperament-test` | `3e49117` | PR yok | yalnız ikame notu: `proje-analizi-kapsamli-denetim-2026-08-22.md:71` "adaptive test ile ikame" | **GEREKÇE BULUNAMADI** (kendi niyeti belgede yok; eski mizaç testi olduğu ad ve ikame notundan çıkarılıyor) |
| 19a | `GET /api/requests` | `3e49117` | PR yok | KT:494 · YİN:29 | Eşleşme isteği okuma tarafı (yazma bağlı) |
| 19b | `GET /api/requests/:id` | `3e49117` | PR yok | KT:494 · YİN:29 | aynı |

## (b) Ölü şema alanları — 4 kalem

| Alan | İlk commit | PR | Niyet belgesi | Niyet |
|---|---|---|---|---|
| `SjtQuestion.triggersOn` | `de6be04` | PR yok | `docs/arsiv/icerik/sjt-sorulari-2026-08-15.md:37` · şema yorumu | Adaptif SJT: kararsız boyutta takip sorusu |
| `SjtOption.signalsArchetype` | `de6be04` | PR yok | `sjt-sorulari-2026-08-15.md:18` | Seçeneğin arketip sinyali |
| `Tenant.verifiedBy` | `7365600` | main'e #15 ile | — (kardeş `verificationStatus`/`verifiedAt` belgeli; bu alanın kendisi değil) | **GEREKÇE BULUNAMADI** (ana belgeyle aynı; KARAR-76) |
| `CertificationOption.internalNote` | `d2de787` (2026-09-09 · madde 163) | #70 | commit konusu "madde 163" · KT:333 | Sertifika şıkkına iç not (seed bağlayacak) |

## (c) Mount edilmeyen bileşenler — 3 kalem

| Bileşen | İlk commit | PR | Niyet belgesi | Niyet |
|---|---|---|---|---|
| `MeetingScheduler` | `918727b` (2026-06-21 · ilk büyük iskele) | PR yok | KT:491 · YİN:33 | Mentör müsaitlik + randevu arayüzü |
| `ContextualFeedbackHost` (+ `MeetingContext`) | `918727b` | PR yok | KT:449 (F5/F6) · YİN:33 | Görüşme sonrası bağlamsal geri bildirim modalı |
| `TenantSwitcher` | `918727b` | PR yok | KT:490 · YİN:33 | Çok kurumlu kullanıcı için kurum değiştirici |

## Sayım ve ana belgeyle fark
- ⚠️ **Uç sayısı 35 değil, 43.** Ana belgenin kendi grup sayıları (7+4+4+1+4+1+1+3+2+1+1+3+2+1+1+1+1+1+2) **41** eder; parantezdeki toplam 19. grubu (2 uç) atlamış ve yanlış toplanmış. Koddan tek tek sayınca iki uç daha çıkıyor: `DELETE /api/clubs/:id/members/:userId` (`clubRoutes.ts:40-44`) ve `GET /api/feedback-logs/combination-scores` (`feedbackLogRoutes.ts:23-27`) → **43**. Ana belge 🧊 olduğu için düzeltilmedi; doğru sayı bu ektedir.
- Kalem: 43 uç + 4 alan + 3 bileşen = **50**; 50'sinin de ilk commit'i bulundu. PR'lı: 7 (#15 ×4: `7365600`'ün iki ucu + `Tenant.verifiedBy` + `7df1fae` · #26 ×2 · #70 ×1) · PR yok: 43 (doğrudan main, erken dönem).
- **GEREKÇE BULUNAMADI: 3** — `Tenant.verifiedBy` (ana belgede de vardı) + **`PATCH /users/:id/self-profile`** + **`POST /users/:id/temperament-test`**. Ana belge uçlar için "GEREKÇE BULUNAMADI: 0" diyordu; kalem başına bakınca bu iki ucun **kendi niyeti** belgede yok, yalnız ikame kanıtı var. `PATCH /users/me/social` için belge niyeti yok ama commit konusu "profil" diyor → sınırda, BULUNAMADI sayılmadı.
- Sonuç: üç uç da zaten KARAR-11 (karantina adayı, silinmez) kapsamında; silme protokolü gereği "GEREKÇE BULUNAMADI" olan kalem **karantinaya bile alınmaz, PO'ya sorulur** — bu iki uç için soru, KARAR-11 kartına not olarak ana ajana devredildi (bu ek kart açmaz).
