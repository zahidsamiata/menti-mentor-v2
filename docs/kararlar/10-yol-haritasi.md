# MentiMentor — Sıradaki İşler Yol Haritası

> Bu belge, mail işinden sonra yapılacak tüm işleri doğru sıraya, bağlamına, moduna ve
> bağımlılığına göre toplar. Amaç: her seferinde "sırada ne var" diye düşünmeden bu belgeyi
> takip ederek ilerlemek. **İşler tek tek, kullanıcı başlattıkça yapılır — bu belge yalnızca referans.**

---

## 🆕 GÜNCEL ÖNCELİK KUYRUĞU (2026-08-02 geç oturum — EN GÜNCEL)

> Aşağıdaki eski "İŞ 0–8" planının çoğu tamamlandı (mail, IDOR, timezone, foto). Bu kuyruk
> güncel önceliği yansıtır; öncelik sırasını Zahid değiştirebilir. Eski plan referans olarak altta durur.

1. **MERGE TURU** — biriken tüm PR/commit'ler (#26–#32 + bugünküler: güvenlik, foto), CI yeşilse.
   - Submodule pointer sırası **kritik**: backend push → çatı `git add backend` → çatı commit → çatı push (ara commit yok).
   - **Merge kararı Zahid'de.** + **Dokploy foto volume ayarı bu turda** (persistent volume `/app/uploads` + `UPLOAD_DIR=/app/uploads` env + `NEXT_PUBLIC_API_URL` kontrolü).
2. **PROFİL-DÜZENLEME KEŞFİ (PLANLA)** — kullanıcı bilgilerini/fotosunu **kayıttan SONRA** güncelleyebiliyor mu, silebiliyor/ekleyebiliyor mu? Profil düzenleme sayfası var mı, eksik mi?
3. **KART + SAYFALAMA TASARIMI** — 06-tasarim-ux'taki kararlara göre. Backend **%90 hazır** (kart-havuz-backend-envanteri raporu). %UYUM İŞ 7'ye bağlı değil, bugünkü skorla çalışır.
4. **RETENTION TURU** (büyük; teknik + davranışsal) — 3 aşamalı:
   - a. **Keşif (PLANLA):** hesap/veri korunuyor mu; cleanup cron kimi siliyor; `lastLoginAt`/aktiflik verisi var mı; kullanıcıyı geri getiren ne var (bildirim/öğrenme/oyunlaştırma).
   - b. **Metrik belirleme (Zahid kararı):** yönetici panelinde hangi anlamlı veriler.
   - c. **Uygulama — YÖNETİCİ İSTATİSTİK PANELİ:** önce özet sayı/grafik → tıklayınca alt kişiler (**drill-down**). Kişi-bazlı liste değil, anlamlı istatistik öncelik. + pasifi dürtme araçları.
   - ✅ **DURUM (2026-08-02): STK-yönetici dilimi BÜYÜK ÖLÇÜDE YAPILDI** — `lastLoginAt` temeli (`1895ca5`) + kaynayan-üye metrikleri (`e0edb4f`) + elle nudge (`465ae47`) + KPI drill-down (`b39b8bd`). Bkz. 09-DURUM retention bloğu.
   - 🟡 **KALAN (davranışsal + genişletme):** otomatik-nudge (KVKK/rıza — bkz. 08); mentör/menti "sevdirme" deneyimi (persona belgeleri); onboarding "aha"; görüşme sayıları/onboarding-% metrikleri; menti/mentör tarafı retention panelleri (şimdiki panel yönetici içindi).
   - **Referanslar — 3 persona belgesi (bu turun temeli):** menti/mentör/yönetici sevdirme belgeleri retention turunun temelidir; keşif + metrik + panel bunlardan türer:
     - docs/raporlar/menti-persona-ve-sevdirme-2026-08-02.md (talep tarafı — tutmak zor, kırılgan; bekleme anı riski)
     - docs/raporlar/mentor-persona-ve-sevdirme-2026-08-02.md (arz tarafı — en kıt kaynak; mentörü tutmak mentiden önce gelir)
     - docs/raporlar/yonetici-persona-ve-metrikler-2026-08-02.md (3 yönetici personası + 3 temel soru + metrik taslağı)
5. **PLATFORM ADMIN KEŞFİ (PLANLA)** — 4-rol metodolojisinin (STK yönetici ✅ → **platform admin** → mentör → menti) sıradaki rolü. `lastLoginAt`'i platform admin de kullanacak → STK ile ortak eksikler tek yerde birleştirilecek. (Not: STK yönetici metodolojisi — strateji ✅ + kıyas ✅ + aksiyon ✅ — büyük ölçüde tamam; kalan hayalet-mod/ön-tanımlı davet ayrı tur, bkz. katilim-modeli notu.)
6. **HAYALET-BACKEND LİSTESİ** — hayalet-backend raporundaki bulguları tek tek bağla/sil/ertele (Zahid ile birlikte karar).
7. **SEKTÖR SKORU = İŞ 7** (aşağıdaki eski plandaki İŞ 7 ile aynı) — 5-bileşenli `sector-scorer`'ı canlı yola bağla. **Canlı eşleşmeyi değiştirir → staging ŞART → staging sonrası.**
8. **MENTİ MENTÖR-TARAMA UX** — 100+ mentörlü tenant için gerçek arama/sayfalama (sinyal gelince; kart tasarımı bunu kısmen çözecek).

---

## 🔄 ŞU AN ÜZERİNDE (devam eden — bitmeden diğerlerine geçme)

### İŞ 0 — MAIL ALTYAPISI (Resend + domain + bounce guard) — BAŞLADI
- **Ne:** Gmail App Password 20 Tem'den beri iptal → mail akışı kırık. Resend'e geçiş +
  `noreply@sivilkapasite.org` + `@test.local` bounce guard + hata loglama.
- **Mod:** BYPASS (kod), PR aç MERGE ETME. Kod ↔ DNS paralel iki kol.
- **Claude kolu:** kod PR'ı (`fix/mail-infrastructure`).
- **Senin manuel adımların:** Resend hesabı → sivilkapasite.org ekle → Hostinger DNS'e
  SPF/DKIM/DMARC → verify → API key → env'e koy.
- **Bitince:** uçtan uca gerçek mail testi (kendi adresine gelir, @test.local'e gitmez) → onayınla merge.
- **⚠️ Bu iş forgot-password'ı GERÇEKTEN tamamlar** (sayfa var ama mail gitmiyor).

---

## 🧹 İŞ 1 — ORTAM TEMİZLİĞİ (mail biter bitmez, KISA)
- **Ne:** Bugünkü işlerden kalan artıkları topla.
- **Mod:** BYPASS (temizlik). Silmeden önce "merged mi" teyidi.
- **Kapsam:**
  - Worktree'ler: `cati-lj`, `backend-testfix` (merge oldu → sil).
  - Temp scriptler: `backend/scripts/gen-reset-link.mjs`, `check-*.mjs`.
  - Merge olmuş branch'ler (local+remote, önce `git branch --merged` teyidi):
    - çatı: `fix/forgot-password-page`, `feat/learning-journey` (+ mail branch merge olduysa)
    - backend: `fix/test-db-isolation`, `feat/learning-journey`
  - Arka plan server'lar (:3000, :3001) + monitor → durdur.
  - Canlı checkout'ları temiz `main`'e al.
- **Neden önce bu:** Temiz ortamla başla; birikmiş worktree/branch submodule pointer'ı karıştırmasın.
- **Bağımlılık:** Mail merge/kapanmadan bazı branch'ler silinmemeli → mail'den sonra.

---

## 🗄️ İŞ 2 — İZOLE TEST DB (TEST_DATABASE_URL) (temizlikten sonra, KISA)
- **Ne:** DB fix guard'ı var ama izole test DB yok → lokal `npm run verify` guard'la DURUYOR.
  Neon'da ayrı test branch bağlanacak.
- **Mod:** BYPASS (config) + senin Neon adımını bekle.
- **Senin manuel adımın:** Neon Console → Branches → New branch ("test") → connection string →
  `.env.test`'e `TEST_DATABASE_URL` (prod'dan FARKLI olmalı).
- **Claude kolu:** guard/config doğrula → izole DB'de tam verify koş → yeşil teyidi.
- **Neden burada:** Küçük iş, yüksek fayda. İŞ 5 (staging) için Neon-branch provası.
- **Bağımlılık:** Bağımsız ama staging'den (İŞ 5) önce yapılmalı.

---

## 📬 İŞ 3 — ONAY PANELİ TAMAMLAMA (bildirim maili + destek@ + prod admin)
- **Ne:** Keşifte çıkan onay paneli eksikleri. Panel çalışıyor AMA:
  1. Kurum onaylanınca/reddedilince başvurana BİLDİRİM GİTMİYOR (sessiz) → asimetri.
  2. `destek@mentimentor.io` placeholder (domain sivilkapasite.org) → yazan ulaşamaz.
  3. Prod'da `PLATFORM_ADMIN_EMAIL` yok → `admin@platform.local` ile giriliyor.
- **Mod:** BYPASS (kod), PR aç MERGE ETME.
- **Kapsam kararları (kullanıcı, iş başlamadan):** onay/ret bildirim maili? ret gerekçesi iletilsin mi?
  destek@ gerçek kutuya mı bağlansın?
- **Senin manuel adımın (varsa):** destek@ için gerçek mailbox; prod env'e `PLATFORM_ADMIN_EMAIL`.
- **Bağımlılık:** İŞ 0'a BAĞLI (bildirim maili çalışan mail altyapısı ister) → mail'den sonra.

---

## 🌱 İŞ 4 — ÖĞRENME YOLCULUĞU: KALAN AÇIK UÇLAR
- **Ne:** Kod merge edildi ama açık:
  - DISC + yolculuk düzenleme KEŞFİ (DISC sorularının tonu + STK düzenleme mimarisi).
  - İçerik kesin onayı (küçük yazım düzeltmeleri: menti Aşama 1 "Bu t," kesik).
  - Canlıda/staging'de uçtan uca test.
- **Mod:** Önce PLAN (keşif), sonra BYPASS (düzeltmeler).
- **Bağımlılık:** Uçtan uca test için staging (İŞ 5) veya en az izole test DB (İŞ 2) faydalı.
  Keşif kısmı bağımsız.

---

## 🏗️ İŞ 5 — STAGING ORTAMI (en büyük, en çok manuel adım)
- **Ne:** Canlının kopyası ama AYRI DB olan test ortamı.
  `staging.sivilkapasite.org` + ayrı Neon branch + Dokploy 2. app.
- **Mod:** BYPASS (kod: env ayrımı, config) + çok sayıda senin manuel adımın.
- **Senin manuel adımların:** Neon'da staging branch (test'ten AYRI); Dokploy 2. uygulama;
  subdomain + SSL; OAuth/SMTP staging callback ve env'leri.
- **Claude kolu:** `.env.compose.staging` + config env ayrımı.
- **Neden EN SON:** En büyük iş, en çok hosting/DNS adımı sende; riskli (yanlış DATABASE_URL
  prod'u etkileyebilir).
- **Bağımlılık:** İŞ 2 provası burada işe yarar; İŞ 0 (mail) staging'de de gerekli.

---

## 🎨 İŞ 6 — LANDING UX İYİLEŞTİRME PAKETİ (staging'de test et)
- **Öncelikli (güven zedeleyen):**
  - Tooltip kayboluyor (kaynak linkleri tıklanamıyor) → hover köprüsü + sabitle.
  - Sıfır etikette sıfır-olmayan skor (%52/%68) → çelişki; demo olduğu belli olsun.
  - "i" ikonu keşfedilebilir değil → kontrast + hafif ipucu.
- **Orta:** düşük kontrastlı gri metinler (WCAG); mobil deneyim testi.
- **Ekle:** alan-özel hata mesajları (Ad Soyad <3 → genel değil, alan-özel).
- **Mod:** BYPASS (frontend), PR aç MERGE ETME.
- **Bağımlılık:** Staging'de test ideal ama şart değil.

---

## 📊 İŞ 7 — AŞAMA 2: ÇOK-EKSENLİ SKORLAMA
- **Ne:** Uyuyan `sector-scorer.service.ts` (5 bileşen) canlıya bağlanacak.
  `rank-mentors → resolveSectorScore`; SECTORS↔IndustryNode eşlemesi; testler.
- **Mod:** Önce PLAN, sonra BYPASS.
- **Bağımlılık:** Canlı eşleşme davranışını değiştirir → staging'de test ŞART → staging'den sonra.

---

## 🔀 İŞ 8 — AŞAMA 3/4: EŞLEŞTİRMEYİ BİRLEŞTİR + TEMİZLİK
- **Ne:** İki paralel skorlama sistemini tek yap. 3a/3b kararı bekliyor.
- **Mod:** PLAN → karar → BYPASS.
- **Bağımlılık:** İŞ 7'den sonra. En riskli → staging şart.

---

## 🧩 BAĞIMSIZ / SIRA-SERBEST İŞLER (araya sığar, aciliyet düşük)
- Depoları PRIVATE yap (GitHub Settings → Danger Zone — kullanıcı yapar).
- STK → platform öneri/talep kanalı (form → platform admin).
- Profil/tanıtım sayfası (eşleşenler okul/bölüm görsün).
- Gerçek STK logo şeridi.
- Panel açık/koyu tema toggle.
- STK sayfa özelleştirmesi → ŞİMDİ YAPILMIYOR (gerçek talep gelince).

---

## 🗺️ ÖZET SIRA (neden bu sıra)
```
0. MAIL (devam) ──────────► forgot-password'ı gerçekten bitirir; İŞ 3 buna bağlı.
1. TEMİZLİK ──────────────► masayı topla, mail branch'i de kapansın.
2. İZOLE TEST DB ─────────► verify güvenli koşsun; staging provası.
3. ONAY PANELİ TAMAMLAMA ─► mail altyapısı (0) hazır olunca bildirim eklenebilir.
4. ÖĞRENME YOLCULUĞU uçları► keşif + küçük düzeltmeler; test için 2/5 faydalı.
5. STAGING ───────────────► en büyük manuel iş; canlı-riskli işlerin test zemini.
6. LANDING UX ────────────► staging'de test; güven zedeleyen hatalar.
7. ÇOK-EKSENLİ SKORLAMA ──► canlı eşleşme değişir → staging ŞART.
8. EŞLEŞTİRME BİRLEŞTİR ──► en riskli; en sona, staging'de.
   (Bağımsız işler herhangi bir araya sığar.)
```

**Temel mantık:** Önce KIRIK olanı düzelt (mail) → ORTAMI topla (temizlik + test DB) →
ÜRÜNÜ çalışır yap (onay paneli) → TEST ZEMİNİ kur (staging) → en son CANLI-RİSKLİ
değişiklikleri staging'de yap (skorlama, birleştirme). Canlı davranışı değiştiren her iş
staging'den sonra. Manuel adımı çok olan büyük işler küçük kod işlerinden sonra.

---

## 📌 HER İŞTE UYGULANACAK SABİT KURALLAR
- Mod bildirimi: keşif→PLAN, kod+"merge etme"→BYPASS, merge/silme→MANUEL ONAY.
- Güvenlik ağı: uzun otonom işlerde "PR aç, MERGE ETME" → kullanıcı en sonda inceler.
- Submodule sırası: backend PR → çatı pointer → çatı PR (ara commit yok).
- Neon migration: `IF NOT EXISTS` + `db execute` + `migrate resolve`. `db push` YASAK.
- Test güvenliği: `TEST_DATABASE_URL` yoksa testler gerçek Neon'a truncate atmaz (guard).
- Bağımsız işler paralel alt-agent (tek oturum); bağımlı/şüphede sıralı. Ayrı terminal YOK.
- Temiz kod: sabitler config'te, açık isim, DRY, katman ayrımı, mevcut stile uy.
- Dürüstlük: uydurma yok; canlıda AI/token maliyeti yok; içerik statik.
- Ürün vizyonu (senaryo/içerik) AI tek başına UYDURMAZ; kullanıcı sağlar/onaylar.
