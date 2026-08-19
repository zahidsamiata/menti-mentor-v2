# 03 — KVKK İŞ PAKETİ (canlı öncesi kritik — yol haritasında B, öncelik yüksek)

**📸 DONDURULMUŞ** — oturum devir notu (KVKK iş paketi).

> **Amaç:** Yeni sohbetin sıradaki en kritik iş paketini kanıtla görmesi. Bu paket **canlı öncesi
> yasal blocker** içerir. Kaynak: `10-yol-haritasi.md` (B), `unutulmus-niyet-envanteri-2026-08-10.md`
> (K1-K6), `04-guvenlik-ve-kvkk.md`, `belge-denetimi-2026-08-10.md` (SONUÇ md.1).
> **İlk adım daima KEŞİF (PLANLA)** — form/şema körlemesine değiştirilmez; her madde önce doğrulanır.

---

## Neden şimdi
Ürün canlıda (sivilkapasite.org) ve gerçek kullanıcı verisi gelmeden bu KVKK açıkları kapanmalı.
Bazıları **kod**, bazıları **ürün sahibi kararı** (hukukçu/politika). Denetim (`belge-denetimi`)
KVKK/yasal K1–K5'i açık işlerin **1. sırasına** koydu.

## Açık maddeler (kanıtlı)

| # | Konu | Tür | Kanıt | Not |
|---|---|---|---|---|
| **K1** | Yasal metinler **TASLAK** (`/kvkk`, `/gizlilik`, `/terms`) | Karar (hukukçu) | `frontend/src/app/kvkk/page.tsx:92`, `gizlilik/page.tsx:85`, `terms/page.tsx:73` ("Bu metin taslak niteliğinde") | Kullanıcı canlıda taslak metin görüyor. Hukukçu incelemesi gerekli |
| **K2** | OAuth kullanıcılarında **`kvkkConsentAt` NULL** | **Kod** | Register (`authController.ts:173`) + self-serve (`selfServeController.ts:284`) rızayı set ediyor; ama `backend/src/services/oauth/` altında `kvkkConsentAt` set edilmiyor (grep boş). Envanter K2 + belge-denetimi SONUÇ md.1 `oauthService.ts:98-110` | KVKK Md.5 ispat yükü: Google/LinkedIn ile girenlerin rıza anı kayıtsız. **TEYİT GEREK:** OAuth kullanıcı-yaratma yolunu keşifle doğrula |
| **K3** | Migration-öncesi eski kayıtlar `kvkkConsentAt` NULL — **backfill politikası yok** | Karar | `04-guvenlik-ve-kvkk.md` (nullable notu); kodda backfill/yeniden-rıza yok | Karar: yeniden-rıza ekranı mı / bulk-accept mi / erteleme mi |
| **K4** | Yaş politikası çelişkili (18+ vs genç+veli) — **yaş doğrulama input'u yok** | Karar + Kod | `08-acik-sorular.md:7`; `terms` "18 yaşını doldurmuş" diyor ama üründe yaş input'u yok | KVKK küçük verisi; terms↔ürün çelişkisi |
| **K5** | **Veri sorumlusu kimliği + sunucu konumu beyanı yok** | Karar + İçerik | `08-acik-sorular.md:8-9`; frontend'de gösterim yok | KVKK Md.1 / yurt dışı aktarım beyanı (Neon İrlanda / Hostinger konumu belirsiz) |
| **K6** | Admin sayfaları **sadece client-side guard** (server `middleware.ts` yok) | Kod (hardening) | `frontend/src/app/(admin)/layout.tsx:6` ("middleware koruması Sprint 15'te… şimdilik client-side"); `frontend/src/middleware.ts` yok | ⚠️ **Nüans:** API backend'de `requireRole` ile korunuyor → **veri sızıntısı DEĞİL**; admin kabuğu kısa süre render olup client redirect ediyor. Savunma-derinliği açığı (yol haritası C'de) |

## İlişkili (aynı yasal çerçeve — envanter D)
- **Privacy center UI** (KVKK Md.11 silme/düzeltme/dışa-aktarma — kullanıcı yüzü): backend GDPR servisi
  VAR (`gdprService`, anonymize/hard-delete/export endpoint'leri); **kullanıcıya dönük self-servis
  sayfa belirsiz** → TEYİT GEREK.
- **DISC için ayrı açık rıza** (hassas veri): register'da tek rıza var; DISC'e ayrı rıza ekranı yok → karar.

## Zaten güvende olan (yanlış alarm olmasın)
- **DISC HAM profil ASLA gösterilmez** — `discVector`/`selfProfile`/`temperamentJson` response'a dönmez;
  sadece `discType` veya arketip adı (`04-guvenlik-ve-kvkk.md`, panelde uygulandı 🟢).
- **Audit log** hassas veri erişimini logluyor (KVKK Md.12, append-only) 🟢.
- **P0 tenant izolasyonu / IDOR** kodlanmış + testli.

---

## Nasıl başlanmalı (ilk tur planı)
1. **MOD: PLANLA (keşif).** Model: Opus (güvenlik/KVKK).
2. Her madde için salt-okuma keşif: kod gerçekten ne yapıyor, hangi dosya, ne kadar iş.
   - **K2 (OAuth consent)** en somut **kod** işi — `backend/src/services/oauth*` yolunu aç, `kvkkConsentAt`
     set edilen register yolunu örnek al, OAuth kullanıcı-yaratmaya aynısını ekle. Ama **önce** OAuth
     kullanıcı-yaratma yolunun tam yerini kanıtla (K2 TEYİT GEREK).
3. Kararlıları (K1/K3/K4/K5) **"ürün sahibi kararı gerekli"** diye ayır — kod başlamadan politika lazım.
4. Kod yazılan maddede **PR aç, MERGE ETME.** Şema/DB'ye dokunacak bir şey çıkarsa (yeni alan) → önce onay.

> Not: KVKK açıkları form/şema körlemesine değiştirilerek çözülmez. Yaş input'u, rıza kutusu gibi
> değişiklikler register akışını ve muhtemelen şemayı etkiler → önce keşif + PO kararı, sonra kod.
> Sonraki iş için **04-13-admin-bulgusu** (paralel STK-admin iş kuyruğu) ve önceliklendirme için
> **05-bekleyen-kararlar-ve-manuel**'e bak.
