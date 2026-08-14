# 05 — BEKLEYEN KARARLAR VE ÜRÜN SAHİBİ MANUEL İŞLERİ

> **Amaç:** Kod dışı bekleyenler tek yerde: ürün sahibi kararı bekleyen teknik kararlar + ürün sahibinin
> elle yapacağı işler + kağıt üstünde kalmış unutulmuş niyetler. Kaynak: `10-yol-haritasi.md` (C/E),
> `09-DURUM.md`, `unutulmus-niyet-envanteri-2026-08-10.md`, `belge-denetimi-2026-08-10.md`, `chat-v1-teslim.md`.
>
> **⚠️ GÜNCELLEME (2026-08-14):** Bu liste 2026-08-11 fotoğrafıdır. Güncellenmiş TAM bekleyen liste (PR #65 merge,
> 6 arşiv teyidi, karar-statü taraması, durum panosu, v1/v2 önceliklendirme dahil):
> **`docs/devir/07-oturum-2026-08-14.md`** (C bölümü).

---

## A) KARAR BEKLEYEN TEKNİK İŞLER (kod yazmadan önce PO kararı)

### 1) super-admin router + `setVisibilityOptIn` (Taraf-1) — sil / bağla / ertele
- **Durum:** İkisi de "niyetli ama tam bağlanmamış". Karar bekliyor.
- **Kanıt:** `setVisibilityOptIn` (Taraf-1) `userRoutes.ts:76-81` / `matchingController.ts:80` — **kasıtlı korundu**
  (yarım admin manuel-eşleştirme yeteneği). super-admin router **ölü değil** — davranışsal testi var
  (`tenant-verification.test.ts:153,172,204`), silme turunda korundu.
- **Not:** Belge-denetimi, bunların "ölü kod" olmadığını netleştirdi; eski "sil" önerisi revize edildi.
  Karar: canlı yola bağla / tamamen kaldır / olduğu gibi bırak.

### 2) `VisibilityOptIn.requestMessage` ŞEMA kolonu DROP → ayrı, PO-onaylı migration turu
- **Durum:** Ertelenmiş teknik borç (bilinçli). Kod artık yazmıyor/okumuyor.
- **Kanıt:** `schema.prisma`'da `requestMessage String?` duruyor (belge-denetimi B md.53).
- **Neden ertelendi:** DROP = şema/migration → "DB şeması değişmez / canlı=lokal aynı DB → onay al"
  kuralı gereği DB'ye dokunan başka bir migration turuyla birlikte, ürün sahibi onayıyla yapılır.
- **Nasıl:** Neon shadow-DB deseni — `IF NOT EXISTS`/`db execute` + `migrate resolve`, `db push` YASAK.

### 3) Diğer karar bekleyenler (envanter A/D)
- Sektör-DISC ağırlık oranı **admin-ayarlanabilir** mi (şu an `0.60/0.40` hardcoded).
- Eşleşme hesaplama tetikleyicisi: event-driven mi, sayfa-açılınca mı (`08:20`).
- Yöneticilik-verme akışı: tüm onaylı kullanıcı listesi eksik (`08:27,30`).
- Fotoğraf zorunluluğu (şu an opsiyonel → ileride zorunlu?) — karar yok (`06-tasarim-ux:40`).
- Gelir/sürdürülebilirlik modeli · pilot kulüp · gerçek kullanıcı görüşmeleri (iş/strateji, `08:13,14,49`).

---

## B) ÜRÜN SAHİBİ MANUEL İŞLERİ (kod değil — elle yapılır)

| İş | Detay | Kaynak |
|---|---|---|
| **Chat uçtan uca canlı test** | menti→mentör ilk mesaj · thread · çan rozeti (45sn polling) · okundu · okundu-bazlı mail | `09-DURUM.md`, `chat-v1-teslim.md` |
| **Foto volume doğrulama (Dokploy)** | `/app/uploads` kalıcı volume + `UPLOAD_DIR=/app/uploads` env; redeploy sonrası foto duruyor mu; **uid 1001 yazma izni** kritik. **Bu ayar merge/autodeploy'dan ÖNCE yapılmalı yoksa fotolar sessizce silinir.** | `dokploy-foto-volume-talimati.md` |
| **Mentör paneli metriklerini canlıda gözle görme** | Gerçek veri doluyor mu (aktif menti/bekleyen/tamamlanan/NPS) | `09-DURUM.md` |
| **Repoları PRIVATE yapma** | GitHub web ayarı; sonra Dokploy erişimini doğrula. Repo-private = güvenlik | `04-guvenlik-ve-kvkk.md:52`, yol haritası |

---

## C) UNUTULMUŞ / KAĞIT ÜSTÜNDE NİYETLER (envanter — PO ayıklayacak)

> Ürün sahibi her satır için: "hâlâ istiyorum / geçersiz / unutmuşum". Salt bilgi, aksiyon değil.

- **Sektör skoru servisi UYUYOR:** zengin 5-bileşen `sector-scorer.service.ts` YAZILI ama **canlı yola
  bağlı değil** (import/çağrı grep boş). Canlı eşleşme basit `computeSectorScore` (etiket-örtüşme ×0.6,
  `scoring.ts:94`) kullanıyor. İş: servisi `rank-mentors → resolveSectorScore` yoluna bağla + IndustryNode
  eşlemesi. **Canlı eşleşmeyi değiştirir → staging ŞART.** (Not: "sabit 50 stub" ifadesi yanlıştı;
  canlı skorer basit ama gerçek — belge-denetimi düzeltmesi.)
- **Eşleştirmeyi birleştir:** iki paralel skorlama tek sisteme (sektör skoru sonrası, staging'de).
- **Bekleme salonu bildirim izni:** bekleme salonu VAR (`/admin/waiting-room`, menti `ResultStep.tsx:135`)
  ama `Notification.requestPermission` istemi kodda YOK (arşiv "en kritik" demiş).
- **Mentör görünürlük opt-in ekranı ("Ekran 7a"):** backend `setVisibilityOptIn` + `VisibilityOptIn`
  tablosu var; FE opt-in ekranı belirsiz (TEYİT GEREK).
- **STK "iki-aha modeli"** (önizleme aha + gerçek aha): onboarding wizard var, "canlı veri ile aha" tam değil (TEYİT GEREK).
- **Onay paneli bildirim maili** (kurum onay/ret) + `destek@` gerçek kutu + prod `PLATFORM_ADMIN_EMAIL`
  (mail altyapısı hazır, bağlanmadı; başvuran sessiz kalıyor).
- **Öğrenme yolculuğu kalan uçları:** DISC ton + STK düzenleme + içerik onayı + uçtan uca test (kod MERGED,
  uçlar açık — TEYİT GEREK).
- **Landing UX paketi:** yumuşak lacivert tema · slogan · tooltip/hover/kontrast (WCAG) · kart tasarımı ·
  light-tema DISC renk/rozet (`06-tasarim-ux`).
- **Push bildirim STUB:** `notificationService.ts:49` `TODO: gerçek push (Expo/FCM)`; sabit `sent:true`
  (BİLİNİYOR; in-app/e-posta idare ediyor). Admin rematch bildirimi de buna bağlı stub.
- **RLS lint kuralı:** `findUnique` sızıntı tuzağı için lint (güvenlik-iyileştirme, `04:18`).
- **Altyapı temizliği:** merge olmuş worktree/branch sil — `git worktree list` → `cati-lj`, `cati-bump`,
  `cati-compose`; merged `feat/learning-journey`, `fix/forgot-password-page` (önce `git branch --merged` teyidi).
- **Staging ortamı:** `staging.sivilkapasite.org` + ayrı Neon branch + Dokploy 2. app + `.env.compose.staging`
  (canlı-riskli işlerin — sektör skoru — test zemini).
- **Sunucu/altyapı güvenliği (HİÇ ele alınmadı):** Dokploy HTTP, firewall, SSH sertleştirme, SSL, yedekleme —
  ayrı bir tur olmalı (`04-guvenlik-ve-kvkk.md:49-51`).

> Detaylı kanıt (dosya:satır) için: `unutulmus-niyet-envanteri-2026-08-10.md`. TEYİT GEREK satırları
> kesin iddia değildir — keşif gerektirir.
