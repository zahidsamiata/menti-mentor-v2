# MentiMentor — Yol Haritası (SIRADAKİ İŞLER)
**🔄 YAŞAYAN** (canonical: iş kuyruğu — sıradaki açık işler)

> Bu belge yalnızca **BUNDAN SONRA yapılacak açık işleri** öncelik sırasıyla tutar. Tamamlanan işler
> burada durmaz — güncel durum `docs/kararlar/09-DURUM.md`'de; 2026-08-10 öncesi tam geçmiş (eski İŞ 0-8
> planı dahil) `docs/arsiv/09-DURUM-ve-yolharitasi-arsiv-2026-08-10.md`'de. Kaynak denetim:
> `docs/kararlar/belge-denetimi-2026-08-10.md` + `unutulmus-niyet-envanteri-2026-08-10.md`.
>
> **Son güncelleme:** 2026-08-11 (belge-aksiyon denetiminden kurtarılan 7 PO-onaylı madde **F bölümüne** eklendi;
> A–E dokunulmadı). Önceki: 2026-08-10 (belge temizliği — çözülmüş/eskimiş maddeler çıkarıldı).
> **İşler tek tek, ürün sahibi başlattıkça yapılır. Öncelik sırasını ürün sahibi değiştirebilir.**

---

## 🔴 A) STK ADMİN PANELİ — 13 BULGU (ürün sahibi test etti)
**İlk adım (PLANLA):** her madde için "backend hazır mı / ne kadar iş (S/M/L)" salt-okuma keşfi; sonra öncelik.
> ⚠️ GÜNCELLEME (2026-08-11): Keşif tamamlandı → `stk-admin-bulgu-envanteri-2026-08-11.md` (13/13 kanıtlı).
> İlk inşa turu (S işler, açık PR): **md.7 (Yöneticiler atama UI)**, **md.9 (CORE/DEEPENING Türkçe etiket, enum-safe)**,
> **md.1 (şifre göster/gizle)** bağlandı. **md.4 (DISC ikincil gösterim) ERTELENDİ** — backend'e yeni PII-sınıfı DISC
> alanı eklemeyi gerektiriyor (backend CLAUDE.md), PO/uyum kararı + ayrı backend turu gerek. Kalan md.2/3/5/6/8/10-13
> hâlâ açık. Detay/tip/S-M-L: envanter belgesi.
1. Giriş ekranı şifre göster/gizle butonu yok (+ kayıt + şifre-sıfırlama ekranları).
2. Admin sol menü sıralama/gruplama gözden geçir (tasarım kararı).
3. Havuz tablosu "Sektörler" kolonu — çoklu değer nasıl gösterilecek.
4. DISC gösterimi tek harf — ikincil/karma tip backend'de tutuluyor mu (keşif) + gösterim kararı.
5. Havuz sayfası layout (tasarım kararı).
6. Algoritma Kalibrasyon Merkezi çok boş — ağırlıklar backend'de var (0.60/0.40 hardcoded), sayfa ne göstermeli.
7. Yöneticiler sayfası işlevi belirsiz — atama/çıkarma/yetki backend'de var (`promote-admin`/`demote-admin`, max 3).
8. Soru Yönetimi: ifadelerin puanlama/cevap-tipi görünmüyor (keşif).
9. CORE/DEEPENING İngilizce — Türkçeleştir (enum mu görünüm mü, keşif).
10. Yeni soru formu cevap tipi (şıklı/açık uçlu) seçimi yok.
11. Yeni soru formunda tek seçenekli gereksiz dropdown.
12. Etiket Yönetimi: sayfa amacı doğru; hazır sistem etiketleri nerede tanımlı (teyit).
13. Sertifika Konuları: içerik/senaryo görünmüyor + "kurum ekleyemez" gerekçesi (topic1-5 placeholder mı gerçek mi).

## 🔴 B) KVKK / YASAL (üretim öncesi kritik — envanter #54 K1–K5)
- **K1** Yasal metinler TASLAK (`/kvkk`, `/gizlilik`, `/terms` — "taslak niteliğinde") → hukukçu incelemesi.
- **K2** OAuth kullanıcılarında `kvkkConsentAt` NULL (`oauthService.ts:98-110` set etmiyor; register/self-serve ediyor) → **kod**.
- **K3** Migration-öncesi eski kayıt consent politikası yok → **karar** (yeniden-rıza / bulk / erteleme).
- **K4** Yaş 18+ doğrulama/input yok (terms "18+" diyor) → karar + kod.
- **K5** Veri sorumlusu kimliği + sunucu konumu (Neon/Hostinger) beyanı yok → karar + içerik.
- (İlgili) Privacy center UI · DISC için ayrı rıza → envanter #54 (D).

## 🟡 C) ALGORİTMA + HARDENING
- **Sektör skoru (eski İŞ 7):** zengin 5-bileşen `sector-scorer.service.ts` YAZILI ama **canlı yola bağlı DEĞİL**
  (uyuyor). Canlı eşleşme basit `computeSectorScore` (etiket-örtüşme ×0.6) kullanıyor. İş: servisi
  `rank-mentors → resolveSectorScore` yoluna bağla + IndustryNode eşlemesi. **Canlı eşleşmeyi değiştirir → staging ŞART.**
- **Eşleştirmeyi birleştir (eski İŞ 8):** iki paralel skorlama tek sisteme. İŞ 7 sonrası, staging'de.
- **K6** Admin sayfaları client-side guard → server `middleware.ts` hardening (API zaten backend-korumalı; veri sızıntısı değil, savunma-derinliği).
- **super-admin router + `setVisibilityOptIn` (Taraf-1) kararı:** sil / bağla / ertele (ikisi de "niyetli ama bağlanmamış"; super-admin testli, Taraf-1 yarım admin manuel-eşleştirme).
- **`VisibilityOptIn` şema kolonu DROP** → ayrı, PO-onaylı migration turu (DB'ye dokunan bir işle birlikte).
- **Retention davranışsal kalan:** otomatik-nudge (KVKK/rıza) · mentör/menti "sevdirme" deneyimi · onboarding "aha" · bekleme salonu bildirim izni (envanter #54 D).

## 🟡 D) ALTYAPI + TEMİZLİK
- **Staging ortamı (eski İŞ 5):** `staging.sivilkapasite.org` + ayrı Neon branch + Dokploy 2. app + `.env.compose.staging`. Canlı-riskli işlerin (sektör skoru) test zemini.
- **Ortam temizliği (eski İŞ 1 — YAPILMADI):** merge olmuş worktree/branch sil — `git worktree list`: `cati-lj`, `cati-bump`, `cati-compose`; merged branch'ler (`feat/learning-journey`, `fix/forgot-password-page` vb.). Önce `git branch --merged` teyidi.
- **Onay paneli tamamlama (eski İŞ 3 — ❓ teyit):** kurum onay/ret bildirim maili + `destek@` gerçek kutu + prod `PLATFORM_ADMIN_EMAIL`.
- **Öğrenme yolculuğu kalan uçları (eski İŞ 4 — ❓):** DISC ton + STK düzenleme + içerik onayı + uçtan uca test.
- **Landing UX paketi (eski İŞ 6):** tooltip/hover/kontrast (WCAG) · slogan · kart tasarımı · light-tema DISC renk/rozet.

## 🟢 E) ÜRÜN SAHİBİ MANUEL (kod değil)
- Chat canlı uçtan uca test · foto Dokploy volume testi · mentör metriklerini canlıda gözle görme · repoları PRIVATE yapma.

## 🟣 F) DENETİMDEN KURTARILAN İŞLER (belge-aksiyon-denetimi-2026-08-11 · PO onayı 2026-08-11)
> Belge-aksiyon denetimi (PR #59) "unutulmuş ama değerli" maddeleri çıkardı; ürün sahibi bunları tek tek gözden
> geçirip aşağıdaki 7'sini SEÇTİ. Bir daha kaybolmasınlar diye buraya alındı. Öncelik/etiket her maddede.
> A–E öncelik kademesi bozulmasın diye ayrı bölüm; her madde ilgili A–E temasına çapraz-referanslı.

- **F1 — Fotoğraf yükleme (client-side):** *Yapılacak iş.* Kullanıcı kendi fotoğrafını yükleyebilsin (upload
  endpoint + UI); `avatarUrl` DB'de var ama şu an yalnız OAuth'tan geliyor, kullanıcı yükleyemiyor.
  **ÖN KOŞUL BAĞI:** kart tasarımındaki "foto zorunlu" kararı bu iş gelmeden uygulanamaz (ilişkili: D Landing UX — kart).
  *kaynak: belge-aksiyon-denetimi-2026-08-11.md · PO onayı 2026-08-11.*
- **F2 — Platform drill-down UI:** *Yapılacak iş (backend hazır, ön yüz bağlanacak).* 4 endpoint hazır
  (`platformTenantController.ts`: overview/members/meetings/analytics); frontend bağlanmamış → platform admin
  kurum detayına inemiyor. *kaynak: belge-aksiyon-denetimi-2026-08-11.md · PO onayı 2026-08-11.*
- **F3 — Tenant hard-delete (KVKK Md.7):** *ÖNCE KEŞİF + PO KARARI — doğrudan kodlanmaz.* GERİ-ALINAMAZ, DB'ye
  dokunur (canlı=lokal aynı Neon). Şu an yalnız freeze (soft) var. Keşif: gerçek silme mi / anonimleştirme mi,
  ilişkili kayıt/FK'lara ne olacak, mevcut `gdprService` ile ilişki → sonra PO kararı → ANCAK sonra kod.
  (ilişkili: B KVKK/Yasal.) *kaynak: belge-aksiyon-denetimi-2026-08-11.md · PO onayı 2026-08-11.*
- **F4 — Landing slogan güncelleme:** *ÖNCE TAM METİN + PO ONAYI, SONRA UYGULA (bu turda uygulama YOK).* Karar
  verilen tam metin (`06-tasarim-ux.md:21` kanıtı): **H1 = "Mentörlük programınızı doğru eşleşmelerle,
  zahmetsizce yönetin."** · **alt = "DISC davranış modeline göre mentör ve mentileri eşleştirin, tüm süreci tek
  panelden takip edin."** (Eski/zayıf: "Ağınızı Sadece Takvimle Değil, İnsan Kimyasıyla Yönetin".) PO tam metni
  onaylayınca `frontend/src/app/page.tsx` güncellenecek. (ilişkili: D Landing UX — slogan zaten listede.)
  *kaynak: belge-aksiyon-denetimi-2026-08-11.md · PO onayı 2026-08-11.*
- **F5 — Eşleşme hesaplama tetikleyicisi:** *KEŞİF + PO KARARI (ürün kararı).* Event-driven mi, sayfa-açılınca mı
  karara bağlanmamış (`08-acik-sorular.md:20`). Önce mevcut tetik davranışını keşfet → sonra PO karar versin.
  (ilişkili: C Algoritma.) *kaynak: belge-aksiyon-denetimi-2026-08-11.md · PO onayı 2026-08-11.*
- **F6 — Hayalet mod + toplu CSV davet:** *AYRI BÜYÜK TUR, PO ONAYLI.* Pasif ön-oluşturulmuş üye + toplu içe
  aktarma; şemada YOK → yeni model/alan → migration → PO onayı ŞART. STK onboarding'i hızlandırma değeri var.
  Ayrı büyük iş kalemi. *kaynak: belge-aksiyon-denetimi-2026-08-11.md · PO onayı 2026-08-11.*
- **F7 — KPI drill-down (sayıdan kişiye):** *Yapılacak iş.* Özet sayılar var (ör. "15 mentörsüz menti") ama kişi
  listesine inilemiyor → yönetici aksiyona geçemiyor. Backend veri var; UI drill-down bağlanacak.
  (ilişkili: A/C admin metrikleri.) *kaynak: belge-aksiyon-denetimi-2026-08-11.md · PO onayı 2026-08-11.*

> **Denetimdeki 3 "sınırda" madde — teyit sonucu (yeni madde EKLENMEDİ):**
> - **Mentör otomatik dürtme (nudge):** ZATEN VAR → C bölümü "Retention davranışsal kalan: otomatik-nudge …" (satır 45).
> - **Bekleme salonu bildirim izni:** ZATEN VAR → C bölümü "… bekleme salonu bildirim izni (envanter #54 D)" (satır 45).
> - **Yumuşak lacivert tema:** ⚠️ TEYİT GEREK — D "Landing UX paketi" (satır 52) "slogan · kart · light-tema DISC
>   renk/rozet" içeriyor ama "lacivert" adı geçmiyor; muhtemelen bu paketin içinde, PO netleştirsin. Uydurulmadı.

---

## 📌 HER İŞTE SABİT KURALLAR
- Mod bildir: keşif→PLAN · kod+"merge etme"→BYPASS · merge/silme→MANUEL ONAY.
- Güvenlik ağı: uzun otonom işlerde "PR aç, MERGE ETME" → ürün sahibi en sonda inceler.
- Submodule sırası: backend PR → çatı pointer → çatı PR (ara commit yok).
- Neon migration: `IF NOT EXISTS` + `db execute` + `migrate resolve`; `db push` YASAK. Canlı=lokal aynı DB → onay al.
- Test güvenliği: `TEST_DATABASE_URL` yoksa testler gerçek Neon'a truncate atmaz (guard).
- Canlı davranışı değiştiren her iş (sektör skoru, eşleştirme birleştirme) staging'den SONRA.
- Temiz kod: sabitler config'te, açık isim, DRY, katman ayrımı, mevcut stile uy. Kullanıcıya görünen metin Türkçe.
