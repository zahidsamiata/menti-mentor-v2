# Unutulmuş Niyet Envanteri (2026-08-10)

> **Amaç:** Aylardır süren projede "yapmayı düşündüğümüz / tasvir ettiğimiz ama hiç ya da yarım
> aksiyona geçtiğimiz" niyetleri tek yerde toplamak. Ürün sahibi bunları gözden geçirip
> **"hâlâ istiyorum / geçersiz / unutmuşum"** diye ayıklayacak.
>
> **Yöntem:** 4 kaynak tarandı (salt-okuma): (A) karar/rapor belgeleri, (B) kod içi niyet yorumları,
> (C) yarım özellikler, (D) strateji/güvenlik/KVKK belgelerindeki kodlanmamış fikirler. Her satır
> **dosya:satır kanıtlı**. Emin olunmayanlar **TEYİT GEREK** işaretli. Bu, "kod var/ön yüz yok"
> kopuk-uç taraması DEĞİL (o ayrı yapıldı) — bu **"niyet var, kod hiç/yarım"** taramasıdır.
>
> **Kaynak notları:** Ana docs `main`'de (feat/light-theme docs'u main'in alt kümesi, benzersiz
> dosya yok). `strateji-ve-guvenlik-denetimi.md` **`docs/arsiv/` altında** (arşivlenmiş strateji —
> "iki-aha", "Ekran 7a", "bildirim izni" fikirleri buradan; hâlâ geçerli olabilir ama arşiv statüsünde).

---

## ⭐ UNUTULMUŞ AMA KRİTİK (önce bunlar — KVKK yasal + güvenlik)

| # | Konu | Kanıt | Durum | Neden kritik |
|---|---|---|---|---|
| K1 | **Yasal metinler TASLAK** (/kvkk, /gizlilik, /terms) | `frontend/src/app/kvkk/page.tsx:92`, `gizlilik/page.tsx:85`, `terms/page.tsx:73` ("Bu metin taslak niteliğinde") | Yarım — hukukçu incelemesi bekliyor | Canlı öncesi KVKK yükümlülüğü. Kullanıcı canlıda görüyor. |
| K2 | **OAuth kullanıcılarında `kvkkConsentAt` NULL** | Register (`authController.ts:173`) + self-serve (`selfServeController.ts:284`) set ediyor; ama `backend/src/services/oauth/` altında `kvkkConsentAt` **hiç set edilmiyor** (grep boş) | Yarım — politika+kod eksik | KVKK Md.5 ispat yükü: Google/LinkedIn ile girenlerin rıza anı kayıtsız. **TEYİT GEREK:** OAuth kullanıcı-yaratma yolunu doğrula. |
| K3 | **Migration-öncesi eski kayıtlar `kvkkConsentAt` NULL — backfill politikası yok** | `04-guvenlik-ve-kvkk.md` (kvkkConsentAt nullable notu); kodda backfill/rıza-yeniden-alma yok | Hiç-başlanmadı (karar bekliyor) | Eski kullanıcılar için rıza kanıtı yok. Karar gerek: yeniden-rıza ekranı mı, bulk-accept mi, erteleme mi. |
| K4 | **Yaş politikası çelişkili** (18+ vs genç+veli izni) | `08-acik-sorular.md:7`; `terms` "18 yaşını doldurmuş" diyor ama üründe yaş doğrulama input'u yok | Hiç-başlanmadı (karar bekliyor) | KVKK küçük verisi; terms↔ürün çelişkisi. |
| K5 | **Veri sorumlusu kimliği + sunucu konumu beyanı yok** | `08-acik-sorular.md:8-9`; frontend'de gösterim yok | Hiç-başlanmadı (karar bekliyor) | KVKK Md.1 / yurt dışı aktarım beyanı (Neon/Hostinger konumu belirsiz). |
| K6 | **Admin sayfaları sadece client-side guard** (server middleware yok) | `frontend/src/app/(admin)/layout.tsx:6` ("middleware koruması Sprint 15'te… şimdilik client-side"); `frontend/src/middleware.ts` **yok** | Yarım (ertelenmiş hardening) | ⚠️ Nüans: API backend'de `requireRole` ile korunuyor → **veri sızıntısı DEĞİL**; admin kabuğu kısa süre render olup client redirect ediyor. Savunma-derinliği açığı. |
| K7 | **Çift-tenant kimlik testi yetersiz** | `04-guvenlik-ve-kvkk.md` (certified/qualityMultiplier `UserProfile→TenantMembership` taşındı); tüm okumaların membership'ten olduğu doğrulanmadı | TEYİT GEREK | Bir kullanıcı bir tenant'ta mentör başka tenant'ta menti iken profil tutarlılığı test edilmemiş. |

> Not: P0 güvenlik kontrolleri (tenant izolasyonu, IDOR `/requests/:id`, eşleşme deadlock, DISC math
> guard, JSON guard, kural paneli Zod) **kodlanmış VE testli** görünüyor (`tenant-isolation-fixes.test.ts`,
> `security-audit-2.test.ts`, `matching.test.ts`, `hardening.test.ts`). Kritik açık olanlar yukarıdaki K1–K7.

---

## (A) Belgelerdeki ertelenmiş/planlanmış niyetler

Yalnızca açık/yarım/belirsiz olanlar; "✅ yapıldı/MERGED" işaretliler atlandı.

| Kaynak (dosya:satır) | Niyet | Durum | Kullanıcı görüyor mu | Kritik |
|---|---|---|---|---|
| `01-urun-vizyonu.md:18` | Tenant plan/limit altyapısı (freemium) | Hiç-başlanmadı | Hayır | — |
| `03-psikometri-ve-algoritma.md:37-40` · `08-acik-sorular.md:19` | Sektör skoru 5-bileşen (reçete 30/25/25/15/5) — kod stub, nötr 50 dönüyor | Yarım (backend stub) | Dolaylı (eşleşme) | Yüksek efor — bkz. C-örtüşme |
| `04-guvenlik-ve-kvkk.md:18` | RLS lint kuralı (`findUnique` sızıntı tuzağı) | Hiç-başlanmadı | Hayır | Güvenlik-iyileştirme |
| `05-ozellikler-ve-paneller.md:57` · `08-acik-sorular.md:29` | DISC/sektör ağırlık oranı admin-ayarlanabilir (şu an 0.60/0.40 hardcoded) | Hiç-başlanmadı | Hayır | — |
| `05-ozellikler-ve-paneller.md:51-52` · `08:32` | Onay paneli: kurum onay/ret **bildirim maili** + `destek@` gerçek kutu | Yarım (mail altyapısı hazır, bağlanmadı) | Evet (başvuran sessiz kalıyor) | — |
| `06-tasarim-ux.md:11,21,23,25` | Landing: yumuşak lacivert tema · slogan · UX paketi (tooltip/hover/kontrast) · kart tasarımı | Hiç-başlanmadı (karar verilmiş, kodlanmamış) | Evet (landing) | — |
| `06-tasarim-ux.md:14,16,17` | Light-tema: tema toggle nav'a · DISC renk WCAG kontrast · platform admin rozet light variant | Hiç-başlanmadı | Evet | — |
| `06-tasarim-ux.md:40` | Fotoğraf zorunluluğu (şu an opsiyonel → ileride zorunlu?) | Ertelendi (karar yok) | Evet | — |
| `08-acik-sorular.md:20` | Eşleşme hesaplama tetikleyicisi (event-driven mi sayfa-açılınca mı) | Karar bekliyor | Dolaylı | — |
| `08-acik-sorular.md:27,30` | Yöneticilik-verme akışı (tüm onaylı kullanıcı listesi eksik) · yönetici etiket ekleme | Yarım/belirsiz | Evet (admin) | — |
| `08-acik-sorular.md:13,14,49` | Gelir/sürdürülebilirlik modeli · pilot kulüp seçimi · gerçek kullanıcı görüşmeleri | Karar bekliyor (iş/strateji) | Hayır | — |
| `09-DURUM.md` (foto volume) | Dokploy foto volume redeploy-sonrası kalıcılık doğrulaması | Ertelendi (teknik doğrulama açık) | Evet (foto kaybı riski) | Acil-teknik |
| `10-yol-haritasi.md` (İŞ 2/4/5/6/7/8) | İzole test DB · öğrenme yolculuğu kalan uçları · **staging ortamı** · hayalet-backend temizliği · sektör skoru canlı · eşleştirme birleştirme | Ertelendi/kağıt üstünde | Hayır | Bazıları staging-şart |
| `10-yol-haritasi.md` (bağımsız) | Repoları PRIVATE yap (GitHub ayarı) · profil-düzenleme keşfi · tema toggle | Hiç-başlanmadı | Kısmi | Repo-private = güvenlik |

---

## (B) Koddaki niyet izleri (TODO/stub/"ileride")

Test dosyalarındaki normal mock'lar elendi; üretim kodu.

| Dosya:satır | İşaret | Gerçekten yarım mı | Kullanıcı etkisi |
|---|---|---|---|
| `backend/src/services/notificationService.ts:49` | `TODO: gerçek push (Expo/FCM)`; `sendPushNotification` sabit `sent:true` | **Evet** (BİLİNİYOR) | Push gitmez (in-app/e-posta idare ediyor) |
| `backend/src/controllers/adminController.ts:450` | `// Bildirimi gönder (stub)` — rematch bildirimi | Evet (push stub'a bağlı) | Admin rematch bildirimi gitmez |
| `backend/src/services/matchingInterface.ts:56-90` | `USER strategy stub` + Job Board ekleme rehberi (`MatchTargetType=JOB_LISTING`) | Evet ama **kasıtlı ileride** | Hayır (aktif değil) |
| `backend/src/controllers/questionController.ts:11` | `POST /questions/respond → toplu yanıt (ileride kullanım)` | Kısmi (endpoint hazır, FE çağırmıyor) | Hayır |
| `frontend/.../ContextualFeedbackHost.tsx:58` | `payload.tags backend şemasında yok; şimdilik yok` | Evet (backend alan eksik) | Hayır (sessiz) |
| `backend/src/controllers/selfServeController.ts:178` | `personaId: 'mock-...'` preview persona | TEYİT GEREK (preview-only, DB'ye yazmıyor sanılıyor) | Hayır (önizleme) |
| `backend/src/services/adaptiveTestEngine.ts:138-140` | Fallback PLACEHOLDER soru ("Lütfen temel soruları tamamlayın") | TEYİT GEREK (normal akışta tetiklenmez) | Kısmi |

> Not (B-eski yorum, yarım DEĞİL): `activityService.ts:8`, `emailService.ts:39`, `oauthTypes.ts:37`,
> `llmRetry.ts:8`, `taxonomy.service.ts:42` gibi yerlerdeki "(ileride)"/dokümantasyon yorumları
> **fonksiyonel-tam** — sadece bağlam notu, iş eksik değil.

---

## (C) Yarım özellikler (başladı ama iç mantık/adım eksik)

| Özellik | Dosya:satır | Ne eksik | Kullanıcı görüyor mu |
|---|---|---|---|
| Push bildirim (stub) | `notificationService.ts:39-55` | Gerçek provider entegrasyonu (BİLİNİYOR) | Hayır (konsol/log) |
| Sektör skoru algoritması | `sector-scorer.service.ts` (stub, sabit 50) | 5-bileşenli gerçek hesap canlı yola bağlı değil | Dolaylı (eşleşme kalitesi) |
| `DailyQuestionWidget` progress | `frontend/.../DailyQuestionWidget.tsx:36-41` | Backend adaptif-test yanıtı `progress` döndürmüyor → widget savunmacı gizleniyor | Hayır (sessiz) |
| Adaptif test fallback sorusu | `adaptiveTestEngine.ts:138-140` | Placeholder metin üretim-uygun değil | Kısmi |

> **TEYİT GEREK (muhtemelen TAM, derin bakılmadı — yarım DEĞİL sanılıyor):** sertifika motoru
> (`mentor/certification/page.tsx`), STK onboarding wizard 3-5. adımlar (`onboarding/stk/_steps`),
> öğrenme yolculuğu motoru (`learningJourney.service.ts`), conversation tam akışı
> (`conversationController.ts`). Bunlar akış-tam görünüyor; kesin demek için bütüncül inceleme gerekir.

---

## (D) Strateji/güvenlik/KVKK belgelerinde kodlanmamış fikirler

| Fikir | Belge kaynağı | Kod durumu | Kritik |
|---|---|---|---|
| **Bekleme salonu bildirim izni** ("İlk eşleşmen hazır olunca haber verelim mi?" — arşivde "en kritik") | `docs/arsiv/strateji-ve-guvenlik-denetimi.md:236-240` | Bekleme salonu **VAR** (`/admin/waiting-room` layout:33; menti `ResultStep.tsx:135`). **AMA `Notification.requestPermission` / bildirim izni istemi kodda YOK** (grep boş) | UX — arşiv "en kritik" demiş |
| **Mentör görünürlük opt-in ekranı ("Ekran 7a")** | `docs/arsiv/strateji-ve-guvenlik-denetimi.md:231-234` | Backend `setVisibilityOptIn` (`matchingController.ts:80`) + `VisibilityOptIn` tablosu VAR; **FE'de bu opt-in ekranı belirsiz** (onboarding step'lerinde yok). Not: menti-tarafı Taraf-2 zaten ölü-kod olarak silindi | TEYİT GEREK |
| **STK "iki-aha modeli"** (önizleme aha + gerçek aha) | `docs/arsiv/strateji-ve-guvenlik-denetimi.md:103-116` | Onboarding wizard var; self-serve preview mock persona gösteriyor (`selfServeController.ts`) ama "canlı veri ile aha" tam değil | TEYİT GEREK |
| **Oyunlaştırılmış DISC/mizaç testi** | `docs/arsiv/strateji-ve-guvenlik-denetimi.md:220-224` | **KODLANMIŞ** görünüyor (`DiscTestStep.tsx` + `sjt-scorer.ts` Most/Least) | — (muhtemelen tamam) |
| **Privacy center UI** (KVKK Md.11 silme/düzeltme/dışa-aktarma hakları — kullanıcı yüzü) | `04-guvenlik-ve-kvkk.md` | Backend GDPR servisi var (`gdprService`, anonymize/hard-delete/export endpoint'leri); **kullanıcıya dönük self-servis privacy sayfası belirsiz** | KVKK — TEYİT GEREK |
| **DISC için ayrı açık rıza** (hassas veri) | `04-guvenlik-ve-kvkk.md` | Register'da tek rıza; DISC'e ayrı rıza ekranı yok | KVKK — karar bekliyor |

---

## Özet + öneri

- **Toplam ~40+ niyet** dört kategoride; çoğu "hiç-başlanmadı (kağıt üstünde)" ya da "karar bekliyor".
- **Unutulmuş ama KRİTİK (K1–K7):** yasal metinler taslak · OAuth+eski-kayıt KVKK consent · yaş
  politikası · veri sorumlusu/sunucu beyanı · admin server-guard · çift-tenant test. Bunlar **canlı
  öncesi** ele alınmalı (özellikle KVKK yasal + OAuth consent).
- **Yüksek değer / net iş:** sektör skoru algoritmasını canlı yola bağlamak (staging şart) · onay
  bildirim maili · bekleme salonu bildirim izni istemi.
- **Muhtemelen zaten tam (yanlış alarm olmasın):** oyunlaştırılmış DISC, P0 güvenlik kontrolleri,
  bekleme salonu (var; sadece bildirim izni eksik).

> Bu envanter ürün sahibinin **karar listesi**: her satır için "hâlâ istiyorum / geçersiz / unutmuşum".
> Hiçbir şey değiştirilmedi (salt-okuma tur). TEYİT GEREK satırları kesin iddia değildir.
