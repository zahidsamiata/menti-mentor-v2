# KVKK Veri Aktarım Envanteri — kod-kanıtlı (2026-08-25)

**📸 DONDURULMUŞ (2026-08-25)** — o günün fotoğrafı, güncellenmez. Kanıtlar backend submodule kodu (`ba92dfa`) + frontend'e dayanır.

> ⚠️ **GÜNCELLEME (2026-08-26):** **Sunucu ülkesi PO teyitli — Londra / Birleşik Krallık** (AWS Europe (London), `eu-west-2`). Eski **"İrlanda" varsayımı HATALIYDI** (`eu-west-2`=Londra/BK, İrlanda=`eu-west-1`). ⚠️ Birleşik Krallık **AB üyesi DEĞİL** → yurt dışı aktarım değerlendirmesini etkiler. Bu düzeltme yasal metinlere işlendi; `00-KARAR-TAKIP` madde 92 ✅ ÇÖZÜLDÜ. (Rapor 📸 dondurulmuş; aşağıdaki C-1 satırları o günün çelişki fotoğrafıdır — bu not güncel gerçeği verir.)

> **Amaç:** KVKK belge paketinin (aydınlatma/açık rıza/gizlilik/çerez/saklama/başvuru) **kod gerçeğine dayanması** için "hangi veri → hangi
> servis → hangi ülke → ne kadar saklanıyor" envanteri. Jenerik şablon değil. Bu rapor bir sonraki turda hukuki paketin TEK kaynağıdır.
> Yöntem: 2 paralel salt-okuma ajanı. DB'ye komut yok; env DEĞERLERİ yazılmadı (yalnız tanımlı/tanımsız). "sanırım" yok — her satır dosya:satır.

## ⚡ TEK BAKIŞTA
- **Barındırma:** Neon Postgres (AB — **bölge çelişkisi TEYİT GEREK**) + Dokploy uygulama sunucusu (**konum TEYİT GEREK, PO**).
- **Yurtdışı aktarım / 3. taraf:** SMTP e-posta · Google + LinkedIn OAuth. **Analytics AKTİF DEĞİL** (#110 kilitli). **LLM/AI: ölü** (içerik dışarı gitmiyor).
- **Çerez:** 2 zorunlu oturum çerezi (rıza istemez) + localStorage (tema/token/tenant). Analytics çerezi YOK (#110 ile gelecek).
- **En kritik uyum boşlukları:** (1) OAuth'ta açık rıza UI'da alınmıyor (kod varsayıyor) · (2) KVKK+18 tek kutuda birleşik, aydınlatma≠açık rıza ayrımı yok · (3) rıza metni SÜRÜMÜ tutulmuyor · (4) aydınlatma metni birçok kategoriyi (mesaj içeriği, sosyal link, OCEAN, lastLogin) saymıyor · (5) hak-kullanım kanalı operasyonel eksik (FE yok + başvuru adresi tanımsız) · (6) otomatik imha yalnız SystemLog'da; mesaj/feedback süresiz.

---

## C-1 — BARINDIRMA
| Bileşen | Konum | Durum | Kanıt |
|---|---|---|---|
| Neon Postgres (canlı=lokal aynı) | AB — **ÇELİŞKİ:** `CLAUDE.md:81` "eu-west-2/İrlanda" coğrafi tutarsız (eu-west-2=Londra, İrlanda=eu-west-1); arşiv "eu-west-1/Ireland" | AKTİF | `CLAUDE.md:71,81` · `arsiv/SOHBET-KARAR-OZETI-devir.md:14` → **[PO DOLDURACAK: Neon konsolundan gerçek bölge]** |
| Dokploy uygulama sunucusu | Kodda konum ipucu YOK | TEYİT GEREK | `CLAUDE.md:87` → **[PO DOLDURACAK: sunucu ülkesi]** |
| Foto/upload | `UPLOAD_DIR` env / `<backend>/uploads`, kendi origin (harici CDN YOK) | AKTİF (yerel disk) | `config.ts:98-102`, `avatarStorage.ts:55-67` |

## C-2 — ÜÇÜNCÜ TARAFLAR (giden kişisel veri)
| Servis | Giden/gelen kişisel veri | Durum | Kanıt |
|---|---|---|---|
| SMTP e-posta (nodemailer, öneri Resend) | **Giden:** alıcı e-posta + ad + içerik (ad/tenant/tarih/görüşme). Mesaj METNİ konmaz ("yeni mesaj var"). Şifre-sıfırlama token linki. | Altyapı hazır; `SMTP_*` tanımsızsa atlanır; STK bildirimleri `TENANT_NOTIFICATIONS_ENABLED` varsayılan KAPALI | `emailService.ts:8-16,31-48,61-63`; `config.ts:70-74` |
| Google OAuth (OIDC) | **Gelen:** sub, email, name, email_verified, picture(avatar). Scope `openid profile email`. Host: accounts.google.com, oauth2.googleapis.com | Aktif; `GOOGLE_CLIENT_*` tanımsızsa devre dışı | `googleProvider.ts:16-18,55-86`; `config.ts:112-116` |
| LinkedIn OAuth (OIDC) | **Gelen:** sub, email, name, email_verified (foto ALINMIYOR). Host: linkedin.com/oauth, api.linkedin.com | Aktif; `LINKEDIN_CLIENT_*` tanımsızsa devre dışı | `linkedinProvider.ts:17-19,40-65`; `config.ts:117-121` |
| Analytics (GTM/GA4/Clarity) | Kodda tracking snippet **YOK** (arandı, sonuç yok) | **AKTİF DEĞİL** — PR #110 OPEN ("🛑 MERGE ETME"); merge edilirse aktif | grep `gtag/clarity/dataLayer/GTM-` → frontend/src sonuç yok · PR #110 |
| LLM/AI (OpenAI/Anthropic) | DISC/mesaj içeriği dışarı **GİTMİYOR** | **ÖLÜ KOD** — `llmRetry.ts` generic helper, çağıranı `matchReason.ts` repoda yok; `new OpenAI`/`api.openai.com` → sonuç yok | `llmRetry.ts:4-5`; grep sonuç yok |
| CDN / harici depolama | yok (arandı, sonuç yok) | — | `avatarStorage.ts:55-56` |
| Diğer dış host | Yalnız Google+LinkedIn OAuth endpoint'leri; başka dış servis çağrısı yok | — | grep `https://` → yalnız oauth provider'lar |

## C-3 — ÇEREZ ENVANTERİ (çerez politikasının temeli)
**Backend `res.cookie` ile SET EDİLEN (2 çerez):**
| Ad | Amaç | Ömür | HttpOnly/Secure/SameSite | Rıza sınıfı | Kanıt |
|---|---|---|---|---|---|
| `mm_refresh` | Oturum yenileme token'ı | Kalıcı, **7 gün** | HttpOnly ✓ · Secure=prod · SameSite `strict` | **Zorunlu** (oturum) — rıza istemez | `authController.ts:55,59-66`; `selfServeController.ts:13-14,29-36` |
| `platform_token` | Platform-admin oturum JWT | Kalıcı, **1 saat** | HttpOnly ✓ · Secure=prod · SameSite `strict` · path `/api/platform` | **Zorunlu** (yönetici) — rıza istemez | `platformController.ts:13-20,59` |

**İstemci depolama (çerez DEĞİL — ayrı beyan gerekebilir):** `accessToken` (React memory, cookie/localStorage değil — `AuthProvider.tsx:143-147`) · `mm-theme` (localStorage, tema — `ThemeProvider.tsx:29,49`) · `X-Tenant-Id` (localStorage, tenant seçimi — `TenantContext.tsx:21`).
**Yok:** CSRF çerezi (SameSite=strict + Authorization header'a dayanıyor) · dil çerezi (tek dil TR) · **3.taraf/analytics çerezi (AKTİF DEĞİL — #110 merge edilirse `_ga`/`_gid`/`_clck` eklenecek, RIZA GEREKTİRİR)**.

## C-4 — VERİ KATEGORİLERİ (`schema.prisma`)
| Kategori | Model.alan (schema:satır) |
|---|---|
| Kimlik | `User.fullName`(238), `User.email`(235), `Tenant.name`(151), `SuspicionReport.reporterName`(1171) |
| İletişim | `User.email`(235), `Meeting.phoneNumber`(519), `SuspicionReport.contact`(1173) |
| Profil (foto/CV/sosyal) | `User.avatarUrl`(296), `linkedinUrl`(297), `instagramUrl`(298), `bioSummary`(258), `education/volunteerHistory/pastProjects/skills`(246-249), `UserProfile.schools/companies/communities`(963-965) |
| **⭐ PSİKOMETRİK** | `User.discType`(243), `discVector`Json(288), `temperamentJson`Json(244), `selfProfile`Json(293), `enneagramWing`(254), `discResultCard`Json(285), `UserProfile.discDISC/ocean*`(945-953), `archetype`(954), `UserResponse.value`(863), `SjtOption.weights`(912), `TenantMembership.certScore/certifications`(1065) |
| Mesaj içeriği | `Message.content`(455, yorumda "PII"), `Conversation`(418), `MatchRequest.requestMessage`(402), `Meeting.notes`(516), `MeetingCheckIn.openNote`(560), `Feedback.keyLearnings/specificComments`(597-604), `UserReport.description`(1150) |
| Davranışsal | `User.lastLoginAt`(303), `SystemLog.meta`Json(640-646), `RefreshToken`(780), `PasswordResetToken`(845) |
| Kurumsal | `TenantMembership.role/isActive/cert*`(1054-1087) |

> **[HUKUKÇU KARARI 1]** DISC/mizaç/OCEAN profili (`discVector`, `temperamentJson`, `UserProfile.ocean*`, `archetype`) + SJT/sertifika yanıtları **KVKK Md.6 özel nitelikli kişisel veri** sayılır mı? Kod bunları "hassas" işaretliyor (`gdprService.ts:16-20`) ama bu mühendislik sınıflaması — Md.6 kapsamı (psikometrik profil özel nitelikli mi) hukukçu görüşü gerektirir. Sayılırsa: ayrı açık rıza + ek güvenlik tedbiri + aktarım kısıtı.

## C-5 — SAKLAMA GERÇEĞİ (`gdprService.ts`, `cronScheduler.ts`)
| Veri kategorisi | Tablo | Şu an ne kadar (kod gerçeği) | Otomatik imha |
|---|---|---|---|
| Sistem/davranışsal log | `SystemLog` | **90 gün** (`gdprService.ts:262`) | ✅ VAR — `purgeExpiredData`, cron Pazar 03:00 UTC (`cronScheduler.ts:396`) |
| Geri bildirim | `FeedbackLog` | **Süresiz** (yorumda "3 yıl" ama uygulanmamış, `gdprService.ts:253`) | ❌ YOK |
| DISC yanıtları | `UserResponse` | Kullanıcı-tetikli silmeye kadar | ❌ otomatik yok |
| **Mesaj içeriği** | `Message`/`Conversation` | **Süresiz — hardDelete'te bile silinmiyor** | ❌ YOK |
| Taslak kurum+kullanıcı | `Tenant`+`User` | 96 saat taslak kalırsa silinir | ✅ VAR (yalnız taslak onboarding) |
| Oturum token | `RefreshToken`/`PasswordResetToken` | `expiresAt`'e kadar; DB purge cron'u yok | ❌ süre-bazlı otomatik purge yok |

- **`hardDeleteUser` SİLER:** UserResponse, VisibilityOptIn, MatchRequest, ClubMembership, FeedbackLog, UserProfile, User. **KALIR (FK RESTRICT — madde 39):** Meeting, Feedback, MeetingCheckIn, Message/Conversation, MentorshipAgreement, Match, UserReport → gerçek veride **transaction patlayabilir** (`gdprService.ts:171-174` itiraf ediyor).
- **`anonymizeUser`:** User PII + UserResponse + UserProfile temizler; **`Message.content`, Feedback serbest metinleri anonimleştirilmez — kalır.**
- **Ghost-red 30 gün uyku modu (madde 35):** Backend'de **YOK** — yalnız tasarım (grep sonuç yok).

## C-6 — RIZA TOPLAMA NOKTALARI
| Nokta | Kod | Gösterilen / enforce |
|---|---|---|
| Klasik kayıt (davet) | `_RegisterContent.tsx:396-421` + `authController.ts:33` `z.literal(true)` | Tek checkbox; `authController.ts:176` `kvkkConsentAt` set |
| Self-serve kurum başvurusu | `Step4Account.tsx:190-213` + `selfServeController.ts:230` | Tek checkbox; `kvkkConsentAt` Tenant(284)+User(303) |
| OAuth (Google/LinkedIn) | `oauthService.ts:98-115` | ⚠️ **Ekranda ayrı onay kutusu YOK** — `:112` implicit `kvkkConsentAt` set ("OAuth başlatmak=rıza" varsayımı); **açık rıza UI'da ALINMIYOR** |
| DISC testi başlangıcı | `disc-test/page.tsx` | **Hiçbir KVKK/rıza gösterimi YOK** (grep boş) — psikometrik toplama noktasında ayrı aydınlatma yok |

**⭐ Bulgular:** (a) **KVKK + 18+ TEK kutuda birleşik** (`_RegisterContent.tsx:414-415` "…açık rıza veriyor **ve** 18 yaşından büyüğüm"; self-serve 18+ ibaresi bile YOK). (b) **Aydınlatma ≠ açık rıza ayrı DEĞİL** (tek checkbox ikisini birleştiriyor) → **[HUKUKÇU KARARI 2]**. (c) **Consent SÜRÜMÜ tutulmuyor** (`consentVersion/policyVersion` grep sonuç yok; yalnız `kvkkConsentAt` zaman damgası) → ispat açığı. (d) `kvkkConsentAt` tüm yollarda set ediliyor (register/self-serve/OAuth).

## C-7 — BEYAN ↔ KOD ÇELİŞKİSİ (metin temel alınmadı, yalnız çelişki)
| # | Sayfa der ki | Kod yapar ki | Çelişki |
|---|---|---|---|
| 1 | `gizlilik/page.tsx:69-72` "silme talebinde imha edilir/anonimleştirilir" | Meeting/Message/Feedback silinmiyor (FK); Message anonimleştirilmiyor | **VAR** |
| 2 | `gizlilik:72` "loglar 90 gün sonra otomatik silinir" | `gdprService.ts:262` doğru | Yok ✅ |
| 3 | `kvkk/page.tsx:32-38` işlenen veriler listesi | Kod ayrıca: **Message içeriği, avatarUrl/sosyal linkler, OCEAN/SJT, lastLoginAt, phoneNumber** — sayfada YOK | **VAR** (eksik kategoriler) |
| 4 | `kvkk:60-65` "üçüncü kişiye aktarım yapılmaz" | OAuth (Google/LinkedIn) veri alışverişi Md.5 aktarım listesinde YOK | Kısmi |
| 5 | `terms/page.tsx:30` "18 yaşını doldurmuş olmanız gerekir" | Yaş doğrulaması yok (yalnız beyan); self-serve'de 18+ ibaresi bile yok | **VAR** |

## C-8 — HAK KULLANIM YOLU (madde 40 bağımlılığı)
- **Backend endpoint VAR** (`userRoutes.ts:167-185`): `POST /users/:id/anonymize` (ADMIN), `DELETE /users/:id/hard-delete` (ADMIN), `GET /users/:id/export` (self/ADMIN).
- **FE ekranı YOK:** kullanıcı kendi verisini export/silme talep edemiyor (yalnız admin panelleri). Anonymize/hardDelete ADMIN-only → **kullanıcı kendisi başlatamaz.**
- **Başvuru e-postası (`destek@`) config'te TANIMSIZ:** `config.ts:31` yalnız `admin@platform.local` placeholder; `config.ts:70-74` "PO destek@ kurup env bağlayınca". `gizlilik:77-81`/`kvkk:110-111` "kurum yöneticiniz aracılığıyla" der ama somut adres yok.
- **BULGU:** Veri sahibi Md.11 hakkını kullanmak için ne FE ekranına ne tanımlı başvuru adresine sahip → **hak kullanım kanalı operasyonel eksik** (KVKK metni buna bağımlı).

---

## ⭐ HUKUKÇUYA SORULACAKLAR (numaralı — belge paketinde [HUKUKÇU KARARI] olarak taşınacak)
1. **DISC/OCEAN/psikometrik profil Md.6 özel nitelikli veri mi?** (Sayılırsa ayrı açık rıza + ek tedbir gerekir.)
2. **Aydınlatma ≠ açık rıza ayrımı:** mevcut tek-kutu birleşik onay (KVKK+18+hizmet) KVKK'ya uygun mu; aydınlatma metni + açık rıza AYRI mı olmalı?
3. **OAuth açık rıza:** OAuth butonuna basmadan önce açık rıza kutusu şart mı, "OAuth başlatmak=rıza" varsayımı yeterli mi?
4. **Yurtdışı aktarım (Md.9, 2024 değişikliği):** Neon (AB) + Google/LinkedIn OAuth sistematik aktarımı için açık rıza yeterli mi, yoksa standart sözleşme + Kurul bildirimi mi gerekir?
5. **18+ beyan:** yaş doğrulaması olmadan yalnız beyan (self-serve'de o da yok) yeterli mi; küçük verisi riski?
6. **Çerez rızası:** `mm_refresh`/`platform_token` zorunlu-oturum çerezi rıza istemez — doğru mu? Analytics (#110) çerezleri hangi rıza mekanizmasını gerektirir?
7. **Saklama süreleri:** mesaj içeriği/feedback süresiz saklama + hardDelete'te bile kalan Meeting/Message KVKK'ya uygun mu; önerilen süreler?
8. **Consent sürümlemesi:** rıza metni sürümü tutulmadan (yalnız zaman damgası) ispat yükü karşılanır mı?

## [PO DOLDURACAK] ALANLAR
- Neon gerçek bölgesi (konsoldan) · Dokploy sunucu ülkesi · veri sorumlusu unvan/adres/MERSİS/KEP · VERBİS kayıt durumu · `destek@`/başvuru e-posta adresi (kurulacak) · önceki hukukçu geri bildiriminin kapsadığı noktalar.

## BİLİNEN UYUM BOŞLUKLARI (dürüst)
FE hak-kullanım ekranı yok (madde 40) · otomatik imha yalnız SystemLog (mesaj/feedback süresiz) · rıza metni sürümlenmiyor · OAuth açık rıza UI'da alınmıyor · KVKK+18 birleşik kutu · aydınlatma metni eksik kategoriler · hardDelete FK'de patlıyor (madde 39) · başvuru adresi tanımsız · analytics kilitli (#110) · VERBİS durumu belirsiz · 18+ yalnız beyan, doğrulama yok.
