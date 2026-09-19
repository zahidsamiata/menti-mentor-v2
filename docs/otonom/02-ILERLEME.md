# 02-ILERLEME — Otonom Tur İlerleme Defteri

> PO'nun turdan sonra okuyacağı TEK dosya. En baştaki "TUR ÖZETİ" bölümü kapanışta doldurulur.

---

## TUR ÖZETİ — TUR 1 (2026-09-19)

**BİTTİ ve CANLIDA (3 iş):**
- **K-01** — (kullanıcı-görünmez altyapı) submodule pointer sarkması giderildi; defter temiz.
- **K-07** — Kullanıcı artık sertifika ve öğrenme yolculuğu şıklarını **her zaman üstten A, B, C, D** sırasıyla görüyor (karıştırma sonrası harfler artık yapışık kalmıyor).
- **K-09** — Menti panelinde "Onaylanan Eşleşmeler" ve "Tamamlanan Toplantılar" kartları artık **gerçek sayı** gösteriyor (eskiden hep 0'dı).

**BİTTİ ve CANLIDA — K-02 de merge oldu (toplam 4 iş):**
- **K-02** — /disc-test artık hata/boş durumda **sonsuz iskelet yerine** anlaşılır mesaj + "Tekrar dene" gösteriyor. (PR #179 merged, CI 8/8.)

**KARAR BEKLEYEN:** Bu turda yalnız migration'sız/karar'sız 🟢 işler yapıldı. Tüm KARAR-1..11 hâlâ **cevapsız** → 🔴 işler (K-13, K-15..K-19, E-5) ve 🟡 işler bekliyor. Bunları açmak için `01-KARARLAR.md`'yi cevaplaman gerekiyor.

**BAŞARISIZ:** 0.

**CANLIDA KONTROL EDİLECEKLER:**
- Sertifika sınavı / öğrenme yolculuğu: şıklar üstten A→D mı?
- Menti paneli: eşleşme/toplantı kartları gerçek sayı mı?
- /disc-test: (soru havuzu boşsa/istek başarısızsa) sonsuz iskelet yerine mesaj + Tekrar dene çıkıyor mu?

**PO'NUN KENDİ YAPMASI GEREKENLER:**
- `01-KARARLAR.md`'deki KARAR-1..11'i cevapla → kilitli işler (randevu mimarisi, sertifika seed, profil linki, öğrenme yolculuğu seed, mükerrer uç temizliği) açılır.
- KARAR-8 (repoları private yap) — GitHub hesabı gerektirir, ajan yapamaz.

**SONRAKİ TUR İÇİN NOT (ajan):** K-08 (sosyal alan platform doğrulaması) FE+BE — backend submodule + pointer akışı gerektiriyor; bu tur bağlam bütçesi için bilinçli SIRAYA bırakıldı, kök sebep kanıtlandı (`backend userController.ts:325-336` NULLABLE_URL platform kontrolü yok; FE `profile/page.tsx:392-419`). K-03/K-06/K-10/K-11/K-12 de bekliyor.

---

---

## TUR 1 — 2026-09-19 11:42
**Aktif şeritler:** Tek orkestratör, SIRALI yürütme (git kilidi riski + submodule → şüphede sıralı).
Okuma keşifleri paralel alt-ajanla. Yazma işleri sırayla.

**Açılışta doğrulanan durum (kanıt):**
- Çatı origin/main = `15c624e` (PR #175 madde164 MERGED), backend pointer `02129fe` (feature commit → SARKMA)
- Backend origin/main HEAD = `1304790` (merge commit #71)
- `02129fe → 1304790` ileri sarım güvenli (merge-base --is-ancestor = 0)
- Lokal main geride (`6ae7d4b`) → güncellenecek
- `docs/otonom/` + `docs/gelen/` untracked (PO yerel dosyaları, korunuyor)
- Tüm KARARLAR (KARAR-1..11) CEVAP boş → 🔴 işler kilitli, atlanacak
- gh: zahidsamiata authenticated

### İş kayıtları (append-only)

**K-01 · Submodule pointer re-bump · ✅ BİTTİ & CANLIDA (PR #176 merged)**
- Çatı pointer `02129fe` (feature) → `1304790` (backend main HEAD, merge commit #71). Ata teyitli.
- CI: 8/8 pass (backend/frontend/integration/e2e). Doğrulama listesi tam.
- CANLIDA BAK: kullanıcı-görünür değişiklik yok; defter/pointer düzeltmesi (sarkma giderildi).

**K-07 · Şık harfleri karıştırmadan sonra A→D · ✅ BİTTİ & CANLIDA (PR #177 merged)**
- Kök: `certification/page.tsx:290` + `ScenarioGuideEngine.tsx:218` görünüm harfini `o.key`/`c.key`'den basıyordu → shuffle sonrası harfler orijinal sıraya yapışık.
- Düzeltme: görünüm harfi map index'inden (`String.fromCharCode(65+idx)`); cevap kimliği (`o.key`) korunur.
- Test: ScenarioGuideEngine.test.tsx 5/5 (yeni: shuffle sonrası ilk şık 'A)'). CI 8/8.
- CANLIDA BAK: sertifika + öğrenme yolculuğu şıkları hep üstten A,B,C,D sırasıyla.

**K-09 · Menti paneli sahte 0 kartları gerçek veriye · ✅ BİTTİ & CANLIDA (PR #178 merged)**
- Kök: `menti/page.tsx:203-204` "Onaylanan Eşleşmeler"/"Tamamlanan Toplantılar" `value={0}` hardcoded.
- Düzeltme: `/api/meetings` (backend kendi toplantılarına kapsar) verisinden türetildi; sayım saf helper'a (`lib/mentiMetrics.ts`) çıkarıldı + test (3/3). Backend değişmedi.
- Tamamlanan = COMPLETED sayısı · Onaylanan eşleşme = PENDING/CANCELLED dışı tekil mentör.
- CANLIDA BAK: menti panelinde gerçek tamamlanan toplantı + onaylanan eşleşme sayısı.
- NOT: "Gönderilen Talepler" kartı oturum-içi sayaç (sahte 0 değil) → kapsam dışı bırakıldı.

**K-02 · /disc-test sonsuz iskelet → hata/boş ekranı · ✅ BİTTİ & CANLIDA (PR #179 merged, CI 8/8)**
- Kök (kesin): `disc-test/page.tsx:86` iskeleti `questions.length===0` ile gösteriyordu → yükleniyor/hata/boş üçü karışıyor; getQuestions başarısızsa hata hiç görünmeden sonsuz iskelet.
- Düzeltme: `DiscTestState.loading` bayrağı + `reload()`; sayfa üç durumu ayırır (iskelet / 'Test yüklenemedi'+Tekrar dene / 'Aktif test sorusu yok'). Test-içi hata hâlâ kartta inline.
- Test: useDiscTest.test.tsx 3/3. Lokal tsc+eslint temiz.
- CANLIDA BAK (merge sonrası): /disc-test hata/boş durumda anlaşılır mesaj + Tekrar dene.
