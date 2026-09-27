> 🧊 DONMUŞ — rutin turda okunmaz (yalnız bir kalemin geçmişi aranırken, grep ile).
> TÜR: 🧊 · SON DOĞRULAMA: 2026-09-26 (📸 fotoğraf tarihi) · TAZELEME TETİKLEYİCİSİ: KALICI — tazeleme gerekmez (dondurulmuş)
> ⚠️ Bu belge bir TARAMA fotoğrafıdır; hiçbir kalem silinmedi ve silme önerilmedi (silme protokolü: gerekçe → ikame → arşiv → karantina 🔵 → gerçek silme 🔴). Güncel durum: `docs/otonom/00-KUYRUK.md` AN-54 · soru: `docs/otonom/01-KARARLAR.md` KARAR-100.

# AN-54 · gerekçesiz kalem taraması (2026-09-26)


## Kapsam beyanı
- **Şema:** backend `origin/main` @ `60715c7` → `prisma/schema.prisma` (1327 satır) · **39 model · 34 enum**. Awk ile çıkarılan 694 kalem: 569 model alanı + 125 enum değeri.
- **Kullanım araması:** `git grep -w -c <ad> origin/main -- src` (backend; **harf duyarlı**, tam kelime), frontend için `git grep -w -c <ad> origin/main -- frontend/src` (çatı). Adaylar için ek olarak `src tests prisma scripts` (migrations + schema hariç) tarandı.
- **Ön süzgeç:** backend src'de ≤2 geçen tüm kalemler + 3-6 geçen skaler alanlar satır satır okundu. Model erişimi ayrıca `prisma.<model>` / `tx.<model>` deseniyle sayıldı.
- **Aday dışı bırakılan (gerekçeli):**
  - **74 ters-ilişki dizisi** (`Tenant.jobListings`, `User.meetingsAsMentor` …): Prisma ilişkinin karşı ucunu şemada ZORUNLU kılar; koddan okunmaması normaldir.
  - **Zod listesiyle yazılan enum değerleri** (`InteractionStyle`, `ExpectationCategory`, `MentiNeed`, `MentorStrength`, `SupportApproach`, `PriorityValue`, `ClubType`, `ClubMemberRole`, `ConsentSource`, `Weekday`): değerler `onboardingController.ts:268-390`, `userController.ts:246-248`, `clubController.ts:13-14`, `consentService.ts`, `meetingController.ts:14-27`'de dize listesi / `Object.values` ile geçiyor → CANLI.
  - **Spread ile yazılan alanlar** (`MeetingCheckIn.progressRating/wantedMore/concernTag/continuationView/menteePreparedness`): yalnız Zod'da geçiyor ama `data` yayılımıyla yazılıyor; `meetingCheckInController.ts:119` `select`'siz `findMany` ile ham dönüyor.
  - `AnswerFormat.MOST_LEAST` (`sjt-scorer.ts:63` else-dalı), `CertificationStatus.NOT_STARTED` (`@default`), `AgreementStatus.DRAFT/ENDED` (`agreementController.ts:40,119,211`), `MatchStatus.EARLY_EXIT` (`feedback.service.ts:96`), `IndustryNode.parentId` (`taxonomy.service.ts:23` `parent` ilişkisiyle okunuyor — önceki turda da elendi).
- **Sınır:** Tam-kelime sayımı alan adını **model ayırmadan** sayar; ortak adlı alanlar (`notes`, `description`, `location`, `status` …) başka modelde kullanıldığı için bu taramada kaçabilir. Ortak adlı alanlar için model-bazlı ikinci geçiş YAPILMADI.
- **Niyet araması:** `git log origin/main -S<ad> --reverse -- prisma/schema.prisma` (ilk ekleyen commit + gövdesi) · o commit'in main'e PR ile gelip gelmediği (üç eski commit PR öncesi, doğrudan main — PR yok) · `git grep <ad> origin/main -- docs` · şema/kod yorumu.

## Sayım
| | Adet |
|---|---|
| Taranan model / enum | 39 / 34 |
| Taranan kalem (alan + enum değeri) | 694 (569 + 125) |
| Backend src'de 0 geçen model alanı | 44 (42'si ters-ilişki dizisi) |
| Backend src'de 0 geçen enum değeri | 2 (`QuestionTier.FOLLOWUP`, `ProfileSource.SJT_ENRICHED`) |
| **Aday (okunmayan / yazılmayan / yalnız şemada)** | **19** kalem (tabloda 14 satır; Feedback çiftleri/beşlisi gruplu) |
| GEREKÇE VAR | 15 |
| KISMİ | 2 (`MeetingCheckIn.submittedAt`, `MatchStatus.DISSOLVED`) |
| **GEREKÇE BULUNAMADI** | **2** (1'i bilinen: `Tenant.verifiedBy`) |

## Tablo
| Model.alan / enum | Kullanım (okuma/yazma, dosya:satır) | Niyet araması | Sonuç | Kuyrukta |
|---|---|---|---|---|
| `Tenant.verifiedBy` | 0 oku · 0 yaz (schema:224) | **BİLİNEN** — yeniden araştırılmadı (`hayalet-envanter-2026-09-19.md:77,101`) | **GEREKÇE BULUNAMADI** (bilinen) | AN-08 · KARAR-76 |
| `ProfileSource.SJT_ENRICHED` | 0 oku · 0 yaz. Kod SJT sonrası `HYBRID`, yoksa `DISC_DERIVED` yazıyor (`scoring.service.ts:104-105`); okuyan yalnız `HYBRID`'e bakıyor (`profile-completeness.service.ts:49`) | İlk ekleyen `de6be04` (2026-07-07, "sprint 8-11 …", gövde yok, PR yok). `docs/` içinde **0 geçiş**; şemada yorum yok (schema:977-981). `HYBRID` ile farkı hiçbir yerde anlatılmıyor | **GEREKÇE BULUNAMADI** | — (KARAR-36/Y-18 profileSource'a dolaylı değiyor, bu değeri anmıyor) |
| `QuestionTier.FOLLOWUP` | src'de 0; yalnız tehlikeli `prisma/seed.ts:563` yazıyor; tetikleyen kod yok | `de6be04` (gövde yok) + `docs/arsiv/icerik/sjt-sorulari-2026-08-15.md:37,45` ("boyut kararsızsa FOLLOWUP açılır — adaptif"), `00-KARAR-TAKIP.md:652` md.125 | GEREKÇE VAR | Y-18 / KARAR-36 · F-11 |
| `SjtQuestion.triggersOn` | src'de 0; yalnız `seed.ts:529` yazıyor | `de6be04` + şema yorumu :939 + `degerlendirme-sistemi-tasarim-2026-08-27.md:363` + md.125 | GEREKÇE VAR (önceki turda da bulundu) | F-09 · F-11 · AN-13 (KARAR-10/57) |
| `SjtOption.signalsArchetype` | src'de 0; yalnız `seed.ts:542-555` yazıyor | `de6be04` + `sjt-sorulari-2026-08-15.md:18` + `00-KUYRUK.md:266` | GEREKÇE VAR (önceki turda da bulundu) | F-09 · AN-13 |
| `SjtQuestion.forRole` | src'de 0 (skorlayıcı `code` ile arıyor, `sjt-scorer.ts:48`); yalnız `seed.ts:538,552` + `@@index` | `de6be04` + `docs/devir/gunluk/oturum-2026-09.md:343-352` ("forRole rol-nötr" Faz 5 kararı), `00-KARAR-TAKIP.md:204` S33 | GEREKÇE VAR | AN-13 · F-11 |
| `CertificationOption.internalNote` | 0 oku · 0 yaz (repoda) | `d2de787` "madde 163, MIGRATION" + şema yorumu :1158 → `sertifika-oturum1-4-kritik-konu-2026-09-08.md` KALEM 6; `hayalet-envanter:78` "WIP, ölü değil" | GEREKÇE VAR | (madde 30 sertifika seed'i) |
| `Feedback.engagementScore`, `goalClarityScore` | 0 yaz; yalnız menti görünümünden gizleme destructure'ı `feedbackController.ts:193`; FE 0 | `36746b2` gövdesi: "Enrich Feedback model: engagementScore, goalClarityScore, periodic fields"; `G10-olu-kod-terk.md:136-146` (G10-05), `00-KARAR-TAKIP.md:460` | GEREKÇE VAR | AN-40 (G10-05) → E-4 |
| `Feedback.periodicTrustScore`, `periodicNetworkScore`, `periodicConfidenceScore`, `periodicNpsScore`, `periodicCareerGrowth` | Backend 0 yaz (Zod `feedbackController.ts:10-28`'de yok); okuma yalnız gizleme `:195-196` + GDPR `gdprService.ts:166,216`. ⚠️ FE `/periodic-survey` bu alanları GÖNDERİYOR (`periodic-survey/page.tsx:55-62`) ama Zod bunları atıyor ve "en az bir puan" `refine`'ı yüzünden istek düşüyor (Network FE'de de yok) | `36746b2` gövdesi + şema yorumları :644-648 + G10-05 + `01-KARARLAR.md:1245` | GEREKÇE VAR | KR-11 · KARAR-78 · AN-40 |
| `VisibilityOptIn.iceBreaker` | 0 okuma; yazma yalnız GDPR sıfırlaması `gdprService.ts:175,217` + test `gdpr-anonymize.test.ts:179` | İlk ekleyen `3e49117` (2026-05-22, "bento grid dashboard…", gövde yok, PR yok). Niyet docs'ta: LLM buz-kırıcı yolu — `08-oturum-tezi-2026-08-28.md:138` ("ölü LLM yolu iceBreaker/matchReason/llmRetry kaldırıldı"), `00-KARAR-TAKIP.md:493`. **Kod kaldırılmış, kolon kalmış;** kolon için ayrıca karar yok | GEREKÇE VAR (niyet) · kolonun geleceği kararsız | E-4 dolaylı (iceBreaker.ts terk kaydı) |
| `Conversation.matchRequestId` | Yazma `conversationController.ts:189`; okuma 0 | `5c651eb` (commit gövdesi bu alanı anmıyor) + şema yorumu :468 "Köken izi — hangi talepten doğdu (yeni talep veya eski veri backfill'i)" | GEREKÇE VAR (yorum) — yalnız-yazılan denetim izi | — |
| `IndustryNode.depth` | src'de okuma 0 (grep eşleşmeleri başka `depth` değişkenleri); yazma yalnız tehlikeli `seed.ts:709-710`; `@@index([depth])` | `de6be04` + şema yorumu :1057,1062 ("1=sektör, 2=alt-sektör, 3=yaprak") + `00-KARAR-TAKIP.md:482` (taksonomi ağacı) | GEREKÇE VAR | — (sektör motoru: F-11) |
| `MeetingCheckIn.submittedAt` | src'de 0 geçiş; `@default(now())` ile yazılıyor; `select`'siz `findMany` ile ham dönüyor (`meetingCheckInController.ts:119,156`); FE'de bu model için okuyan yok (FE'deki 2 geçiş `PendingTagCard` yerel değişkeni). Modelde `createdAt` YOK → tek zaman damgası bu | `36746b2` (model tanımı; alanın nedeni yazılmamış); docs'ta 0 geçiş | KISMİ | — |
| `MatchStatus.DISSOLVED` | Backend hiçbir yerde bu duruma YAZMIYOR; yalnız admin filtre Zod'u `adminController.ts:348`; FE etiket "Feshedildi" (`admin/eslesmeler/page.tsx:31,39`) | `de6be04` (gövde yok); docs yalnız durum listesini sayıyor (`admin-panelleri-tasarim-2026-08-02.md:48`, `degerlendirme-metrik-sistemi-tasarim-2026-08-19.md:93`) — "fesih ne zaman/kim tarafından" yazılmamış | KISMİ | — |
| `User.approvedAt` (kontrol) | Yazma `adminController.ts:652`, okuma `:270` select → FE | Aday değil — tabloda yanlış-alarm kontrolü olarak durur | (elendi) | — |
| `Weekday`, `ConsentSource.*` vb. düşük sayımlı enum değerleri | Yukarıdaki "aday dışı" listesi | — | (elendi) | — |

> Not: son iki satır aday sayısına DAHİL DEĞİL. 19 aday = verifiedBy · SJT_ENRICHED · FOLLOWUP · triggersOn · signalsArchetype · forRole · internalNote · engagementScore · goalClarityScore · periodic×5 · iceBreaker · matchRequestId · depth · submittedAt · DISSOLVED (1+1+1+1+1+1+1+2+5+1+1+1+1+1 = 19).

### Yan bulgu (tarama sırasında, AN-54 kapsamı dışında — yalnız not)
- `/periodic-survey` gönderimi: FE `periodicNpsScore/…` alanlarını `POST /api/meetings/:id/feedback`'e yolluyor; `FeedbackSchema` (`feedbackController.ts:10-28`) bunları tanımıyor, `refine` beş klasik puandan birini istediği için istek 400 döner. Zaten **KR-11 / KARAR-78** altında izleniyor.

## PO'ya sorulacaklar (yalnız GEREKÇE BULUNAMADI)
1. `Tenant.verifiedBy` — zaten KARAR-76'da (bilinen, yeni kart gerekmez).
2. `ProfileSource.SJT_ENRICHED` — hiç yazılmayan/okunmayan profil kaynağı değeri; `HYBRID`'den farkı hiçbir belgede yok: ayrı bir "yalnız SJT'den türetilmiş profil" durumu mu planlanmıştı, yoksa `HYBRID` onun yerini mi aldı?
