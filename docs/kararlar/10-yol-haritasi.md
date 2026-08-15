# MentiMentor — Yol Haritası (SIRADAKİ İŞLER) · v1/v2 öncelikli

**🔄 YAŞAYAN** (canonical: iş kuyruğu)

> Bu belge yalnızca **BUNDAN SONRA yapılacak açık işleri** öncelik sırasıyla tutar. Biten işler burada durmaz —
> güncel durum `09-DURUM.md`'de; 2026-08-10 öncesi tam geçmiş `docs/arsiv/09-DURUM-ve-yolharitasi-arsiv-2026-08-10.md`'de.
>
> **Son güncelleme:** 2026-08-14 (**v1/v2 önceliklendirme** — kaynak: `00-karar-statu-haritasi-2026-08-14.md` +
> `00-DURUM-PANOSU.md` + KARAR 5 güvenlik denetimi. Biten işler [F1/F2/F7] düşürüldü, tasarım kararları eklendi).
> Önceki: 2026-08-11 (F bölümü 7 madde). **Statüler karar-statü haritasından gelir (dosya:satır kanıtlı).**
>
> **Çerçeve (ürün sahibi kararı):** **GENİŞ v1** = (1) yasal+güvenlik blocker · (2) az işle kazanç · (3) STK admin panel tam görünsün.
> **v2** = ağır/riskli/ileri-faz. **İşler tek tek, ürün sahibi başlattıkça yapılır; sırayı PO değiştirebilir.**

---

# 🟢 v1 — CANLI ÖNCESİ (öncelikli, sırayla)

## v1-A · 🔴 GÜVENLİK & YASAL BLOCKER (canlı-öncesi ŞART)

1. **🟡 KARAR 5 — DISC güvenlik açığı düzeltmesi** — **v1 #1, canlı-öncesi ŞART.** *Düzeltme PR AÇIK, merge PO'da (backend #37 + çatı #71).*
   > ⚠️ GÜNCELLEME (2026-08-15): düzeltme kodlandı → **PR açık, merge bekliyor** (henüz merge YOK). Merkezi `discVisibility.ts`
   > (`canViewerSeeDiscType`): `listUsers`+`getUser` menti→mentör `discType`/`discResultCard`'ı response'tan çıkarır; FE menti kartı
   > DISC göstermez; regresyon testi eklendi. Gerçek kanıt CI'da (lokal entegrasyon TEST_DATABASE_URL guard'ıyla durur). Detay: `09-DURUM.md` "🟡 GÜVENLİK".
   - **Bulgu (bu oturum, salt-okuma denetimi):** Menti, mentörün DISC **tipini (harf) + arketipini** görüyor → KARAR 5 ihlali.
     Kanıt: `backend/src/controllers/userController.ts:90` (`listUsers` select `discType`) + `:138-139` (`USER_PUBLIC_SELECT`
     `discType`/`discResultCard`) + `frontend/src/app/(dashboard)/menti/page.tsx:262-266` (render). Ham vektör güvenli (`USER_FULL_SELECT` self/admin).
   - **Çelişki:** kod `discType`'ı bilinçli public tasarlamış (yorum s.138) — KARAR 5 (2026-08-11) daha yeni PO kararı → **KARAR 5 kazanır**.
   - **İş:** viewer-role + target-role farkındalıklı select (menti→mentör **gizle**; mentör→menti **göster**; admin hepsi). Tek yönlü kaldırma mentörün meşru görünümünü bozar.
   - **⚠️ ÖN-KOŞUL:** havuz kart işi (v1-C, KARAR 2/7) **bu düzeltmeden SONRA** yapılır — yoksa açığı ekrana taşır.
2. **K2 — OAuth `kvkkConsentAt`** (KVKK) — `oauthService.ts` OAuth kullanıcıda consent set etmiyor (local/self-serve ediyor). ★ küçük backend fix (S).
3. **K4 — Yaş 18+ doğrulama** (KVKK) — kayıt formunda yaş input + backend alan/kontrol yok (terms "18+" diyor). Karar + kod.
4. **K5 — Sunucu konumu beyanı** (KVKK) — veri sorumlusu metni var; hosting/sunucu konumu beyanı yok. İçerik (S).

> **Not:** K1 yasal metinler ✅ yazılı (hukukçu onayı ayrı, PO/dış iş). K3 (eski kayıt consent politikası) → aşağıda "❓ önce karar".

## v1-B · ★ AZ İŞLE KAZANÇ (🟨/🟧 — S, ucuz kazanım)
5. **ThemeToggle admin/platform nav'a** (S) — menti/mentör'de var, admin/platform'da yok.
6. **Onay paneli bildirim maili** (S-M) — mail altyapısı hazır; kurum onay/ret maili + `destek@` + prod `PLATFORM_ADMIN_EMAIL` bağlanacak (başvuran sessiz kalmasın).

> (K2 OAuth consent + K5 sunucu konumu da S-boyu az-işle-kazanç; yasal oldukları için v1-A'da.)

## v1-C · STK ADMİN PANEL — TAM GÖRÜNSÜN (görünüm eksikleri)
7. **Havuz KART görünümü + "Neden uyumlu" L1 (KARAR 2 + KARAR 7 · =md.5)** — backend `compatibilityReason` üretiyor, FE hâlâ tablo + tip eksik. **⚠️ KARAR 5 düzeltmesinden SONRA** (kart bakan-role göre ayrışmalı: menti→mentör DISC göstermez).
8. **Sol menü 4-grup gruplama (KARAR 1 · =md.2)** — `layout.tsx` hâlâ "3+Gelişmiş"; tasarım: Günlük İşler / İnsanlar / Program&İçerik / Ayarlar&Kurulum.
9. **Algoritma Kalibrasyon sayfası (md.6)** — sayfa var ama sadece rapor-frekansı; ağırlık (0.60/0.40) gösterimi/ayarı yok.
10. **Durum rozeti (KARAR 3)** — Onaylı/Bekliyor/Pasif, yalnız yönetici görür; render edilmiyor.
11. **Sertifika rozeti (KARAR 4)** — "Sertifikalı ✓", herkes görür; mentör kartında yok.
12. **DISC baskın+ikincil HARF "DI" (KARAR 11 · =md.4)** — havuzda tek harf; ikincil harf türetme/gösterim yok. Türetilmiş **harf** (yüzde değil) PII-güvenli; KARAR 5 düzeltmesiyle uyumlu uygulanmalı.
13. **Soru cevap-tipi seçimi (md.10)** — soru formunda şıklı/açık-uçlu seçimi. *(⚠️ kapsam belirsiz — aşağıda teyit.)*

---

# 🔵 v2 — SONRA (ağır / riskli / ileri-faz)

## v2-A · Algoritma (canlı davranış — staging ŞART)
14. **Sektör skoru servisi canlı bağlama (eski İŞ 7)** — 5-bileşen `sector-scorer.service.ts` yazılı, canlı yola bağlı değil. Canlı eşleşmeyi değiştirir → **staging şart**.
15. **Eşleştirmeyi birleştir (eski İŞ 8)** — iki paralel skorlama tek sisteme; İŞ 7 sonrası, staging'de.

## v2-B · Büyük/riskli (DB + migration + geri-alınamaz)
16. **F3 — Tenant hard-delete (KVKK Md.7)** — sadece freeze var. **GERİ-ALINAMAZ + DB** (canlı=lokal aynı Neon) → önce keşif + PO kararı, ANCAK sonra kod.
17. **F6 — Hayalet mod + toplu CSV davet** — şemada yok → yeni model/migration → ayrı büyük tur, PO onaylı.
18. **`VisibilityOptIn.requestMessage` şema kolonu DROP** (🔵) — ertelenmiş teknik borç; DB'ye dokunur → PO-onaylı ayrı migration turu.

## v2-C · İleri-faz / bilinçli ertelenmiş (🔵 — boşluk DEĞİL)
19. **"Neden uyumlu" Katman 2 (KARAR 8)** — ürün olgunlaşınca zenginleştirme.
20. **Mentör yaklaşım kılavuzu Katman 3 (KARAR 9)** — vizyon; KVKK rıza + mahremiyet + etik karar ÖNCE.
21. **Sektör kolonu (KARAR 10 · =md.3)** — canlı-sonrası (veri girişi boşluğu, blocker değil).
22. **Landing UX paketi + yumuşak lacivert tema** — tooltip/hover/WCAG kontrast/kart/slogan/light-tema DISC renk-rozet (canlı-sonrası).
23. **Push bildirim (gerçek Expo/FCM)** — şu an stub (`sent:true`); in-app/e-posta idare ediyor.

## v2-D · Retention / güvenlik-iyileştirme / altyapı
24. **Retention otomatik nudge (cron)** — manuel `nudgeUser` var; otomatik zamanlı yok.
25. **Privacy center UI + DISC için ayrı rıza** (KVKK ileri).
26. **RLS lint kuralı** (`findUnique` sızıntı tuzağı — güvenlik-iyileştirme, `04:18`).
27. **Staging ortamı (eski İŞ 5)** — `staging.sivilkapasite.org` + ayrı Neon branch + Dokploy 2. app (v2-A'nın ön koşulu).
28. **Ortam temizliği** — merged worktree/branch sil (`cati-lj/bump/compose`); önce `git branch --merged` teyidi.

---

# ⚠️ v1/v2 SINIRDA — PO KARARI GEREKLİ
- **K6 — Admin server-side guard** (`frontend/src/middleware.ts` yok, client-side only). API zaten backend-korumalı → **savunma-derinliği, blocker DEĞİL**. v1-güvenlik mi v2-iyileştirme mi → **PO kararı**.
- **Sektör/etiket başlangıç havuzu (KARAR 12 · =md.12)** — seed'de etiket var, admin-yönetilir tablo yok. **seed mi / admin-tablo mu** = şema+keşif+PO kararı. Panel görünümü (v1) mi, şema-işi (v2) mi → **PO kararı**.

# ❓ ÖNCE TEYİT / ÜRÜN KARARI GEREK (kodlanamaz — keşif ister)
> Bunlar v1/v2 sırasına sokulmadan önce **keşif veya PO ürün kararı** ister; doğrudan kodlanamaz.
- **SJT/scoring endpoint'leri** (`/scoring/compute-profile`, `/rank-mentors`) — backend hazır, FE çağrısı yok → **bağla mı sil mi? PO ürün kararı** (canlı eşleşme farklı yol kullanıyor).
- **F5 — Eşleşme hesaplama tetikleyicisi** — event-driven mi sayfa-açılınca mı (`08:20`) → keşif + PO.
- **KARAR 6 — Otomatik onay** (önden davet→onaylı) — `InvitationTemplate` var, tetik yok → keşif.
- **super-admin router + `setVisibilityOptIn` (Taraf-1)** — sil / bağla / ertele → PO kararı (ikisi de kasıtlı korundu, testli).
- **Match DB'ye persist ediliyor mu** · **ön-tanımlı davet otomatik onay (Yol B)** — teyit (DB'ye bağlanılmadı).
- **Öğrenme yolculuğu kalan uçları** (DISC ton, STK düzenleme, içerik onayı, uçtan uca test) — teyit.
- **STK iki-aha modeli** · **mentör görünürlük opt-in ekranı (7a)** · persona sunum fikirleri (ilk-aha/reddi-yumuşat/emeği-görünür) — teyit.
- **K3 — Eski kayıt consent politikası** (yeniden-rıza / bulk / erteleme) — PO kararı.
- **md.11 gereksiz tek-seçenekli dropdown** — minor UI, güncel formda teyit.

---

# 🟢 E) ÜRÜN SAHİBİ MANUEL İŞLERİ (kod değil — ayrı kuyruk)
- **⚠️ Foto volume / Dokploy ayarı — CANLI/MERGE ÖNCESİ ŞART.** `/app/uploads` kalıcı volume + `UPLOAD_DIR` + uid 1001 yazma izni; yoksa fotolar sessizce silinir. (`dokploy-foto-volume-talimati.md`)
- Chat uçtan uca canlı test · Mentör metriklerini canlıda gözle görme · Repoları PRIVATE yapma.
- **Sunucu/altyapı güvenliği** (Dokploy HTTP, firewall, SSH, SSL, yedekleme) — ayrı tur, altyapı (`04:49-51`).

---

# ✅ TAMAMLANDI — bu turda bayattan düşürüldü (tarihsel iz)
> Karar-statü haritası bunları **kod TAM** buldu; yol haritası hâlâ "yapılacak" sayıyordu → düşürüldü. Detay: `09-DURUM.md`.
- **F1 — Fotoğraf yükleme** ✅ (kanıt: `avatarController.ts:23-57` + `profile/page.tsx:101-207`). "foto zorunlu kart" bağı ayrı iş (v1-C kart).
- **F2 — Platform drill-down UI** ✅ (kanıt: `platformTenantController.ts` + `lib/api/platform.ts`).
- **F7 — KPI drill-down (sayıdan kişiye)** ✅ (kanıt: `retentionMetrics.service.ts` + `ProgramHealthSection.tsx`).
- **#62 STK admin S işleri** (md.1 şifre · md.7 yönetici atama · md.9 CORE/DEEPENING TR) ✅ · **md.8 soru görünürlük · md.13 sertifika konuları** ✅ (doğrulandı).

---

## 📌 HER İŞTE SABİT KURALLAR
- Mod bildir: keşif→PLANLA (salt-okuma) · kod+"merge etme"→BYPASS. Merge gerekince "BYPASS + şu PR'a merge yetkisi (PO onaylı)".
- Güvenlik ağı: uzun otonom işlerde "PR aç, MERGE ETME" → ürün sahibi en sonda inceler.
- Submodule sırası: backend PR → çatı pointer → çatı PR (ara commit yok).
- Neon migration: `IF NOT EXISTS` + `db execute` + `migrate resolve`; `db push` YASAK. Canlı=lokal aynı DB → onay al.
- Test güvenliği: `TEST_DATABASE_URL` yoksa testler gerçek Neon'a truncate atmaz (guard).
- Canlı davranışı değiştiren her iş (sektör skoru, eşleştirme birleştirme) staging'den SONRA.
- Temiz kod: sabitler config'te, açık isim, DRY, katman ayrımı, mevcut stile uy. Kullanıcıya görünen metin Türkçe.
