# 00 — KARAR & İŞ TAKİBİ (NE KALDI · NE YARIM · NE UNUTULDU)

**🔄 YAŞAYAN** (canonical: açık iş/karar takibi) · **Son güncelleme:** 2026-08-23

> **Bu belge NEDEN var:** "Hep önümdeki işe odaklanıyorum ama arkada yarım bıraktığım işleri, ölü kodları,
> alıp da uygulamadığım kararları unutuyorum; canlıya çıkınca eksik keşfediyorum." Bu belge o sorunu çözer:
> **TEK yerde**, açık iş + yarım iş + ölü kod + uygulanmamış karar — durumu net, **kanıtlı** (dosya:satır),
> ve **iş yaptıkça otomatik güncellenir** (kural: `CLAUDE.md` "Karar-Takip Disiplini").
>
> **Kural:** Bu belge asla "yapıldı" demez — **kod öyle demedikçe.** Her statü grep/dosya kanıtıyla doğrulanır;
> doğrulanamayan "❓ TEYİT GEREK" işaretlenir (uydurma yok). Belge ↔ kod çelişirse **KOD KAZANIR**.
> Derin gerekçe için ilgili canonical belgeye link verilir (kopyalama yok — Kural 1).

---

## A. ⚡ TEK BAKIŞTA (şu an)

> **Çıkış önceliği (hangi iş çıkıştan önce/sonra):** `00-CIKIS-PLANI.md` — açık işler K0-K5'e sınıflandı; gerçek çıkış-bloker sadece 5 K0 + 1 K1.

| Kategori | Sayı | Tek cümle |
|---|:---:|---|
| 🔴/🟡/🔵 **v1 açık iş** | **6** | ⚡ #37 kurum "düzeltme iste" → **✅ CANLIDA** (backend #50 + çatı #104 merged, migration canlıda). Kalan: cevap-tipi(#13), kurum-maili(#6), 2a/2b/#7-B tasarım-hazır, içerik/seed/PO + **9a** ağırlık-ayar (migration bekliyor) + **37m** kurum-mail-açma (PO-manuel env) |
| ❓ **karar/keşif bekliyor** | **5** | K6 admin-guard, sektör/etiket havuzu, K3 eski-kayıt consent, #36 önce-keşif, **9b** scoring dekoratif-kalibrasyon (yeni bulgu) |
| 💀 **ölü kod / yarım bağlantı** | **9 kalem** | Çoğu TEK yarım özelliğin parçası: "eşleşme-sonrası değerlendirme/metrik" (#7 tasarımıyla bağlanacak) |
| 🔵 **v2 backlog** | **15** | Hiç dokunulmadı (14-28: algoritma/DB-riskli/ileri-faz/retention) |
| ✅ **canlıda (v1)** | **~10** | KARAR 5, K2, K5, menü, rozetler, DISC harf, İş 2+3, admin soru UI, login enumeration |

> **En çarpıcı gerçek:** Ölü kodların çoğu rastgele değil — **birlikte tek bir yarım-kalmış özellik** oluşturuyor
> ("görüşme sonrası değerlendirme + dönemsel metrik + otomatik checkpoint"). Bu özelliğin **tasarımı yeni yazıldı**
> (`degerlendirme-metrik-sistemi-tasarim-2026-08-19.md`, #7). Yani "ölü kod"u silmek değil, **#7 ile bağlamak** = özellik tamamlanır. Detay: **Bölüm C**.

> **⚡ GÜNCELLEME (2026-08-23) — strateji-denetimi + PO oturumu:** 6 strateji belgesi kodla karşılaştırıldı
> (`strateji-gercek-denetimi-2026-08-20.md`, 85 madde: %66 tam var). **Ana bulgu:** admin tasarım-kartları baştan sona
> uygulanmış; kalan kopukluk 3 eksende — mail/bildirim (37m, en yüksek kaldıraç), menti retention inceliği (bekleme/ret/kutlama),
> yönetici kanıt katmanı (export/oran/trend). **Yeni açık iş:** Y1–Y7 + **DISC-DERİNLEŞME kurgusu** (numarasız — bkz. **Bölüm B.4**).
> Bu turda birçok ❓ karara bağlandı (9b→düzeltilecek, K6→v2, K3→en son, sektör/etiket→talep-onay, 2a→30 gün uyku modu,
> #13→ertelendi); satır-içi **⚠️ GÜNCELLEME (2026-08-23)** notlarına bakınız.

> **⚡ GÜNCELLEME (2026-08-23) — belge-düzeni reorg (salt-docs, KOD YOK):** `docs/kararlar/` + `docs/raporlar/` alt-klasörlere
> ayrıldı (git mv, içerik değişmedi); canonical taşıyıcılar kökte kaldı; 38 tam-yol referansı güncellendi; 00-INDEX yeniden
> yazıldı; kırık-link 0; docs/ 68 dosya (kayıp yok). Bu turda **2 yeni 🟡 altyapı-hijyen maddesi** eklendi → **Bölüm E** (repo/altyapı hijyeni).

> **⚡ GÜNCELLEME (2026-08-23) — tam-belge taraması (42 belge, 7 paralel salt-okuma ajanı):** Reorg turunda belgeler yüzeysel
> tarandığından içlerindeki kararlar sistematik çıkarılmamıştı. Bu tur 42 içerik belgesi TAM okunup kod gerçeğiyle çapraz
> kontrol edildi → **13 gerçek yeni kayıp madde** çıktı (3'ü 🔴 GÜVENLİK canlı-öncesi) → **Bölüm F**. Ayrıca ~25 "belge açık
> diyor kod yapmış" bayat-not adayı + `icerik/` belgelerinin kökten bayat öncülü (`seed-questions.ts` yok) tespit edildi.
> **MADDE 67 (çerez izni) VAR** (10-yol:146) — eklenmedi. Tam döküm: `../raporlar/kod-denetimi/tam-belge-taramasi-2026-08-23.md`.

---

## B. 🔴 AÇIK İŞLER TABLOSU

> Durum: 🔴 hiç başlanmadı · 🟡 yarım/kısmi · 🔵 tasarım hazır kod bekliyor · ❓ karar/keşif bekliyor · ⏸️ bilinçli ertelendi.
> Numaralar `10-yol-haritasi.md` ile aynı (referans için sabit). Alternatif adlar parantezde.

### B.1 — v1 açık işler (canlı-öncesi)

| No | İş | Durum | Tür | Ne gerekiyor (somut sıradaki adım) | Kanıt | Migration? | Boy |
|---|---|:---:|---|---|---|:---:|:---:|
| 6 | Onay/red maili — **kurum/destek** kısmı | 🟡 | yarım-kaldı | Kurum(tenant)-onay/ret maili + `destek@` + prod `PLATFORM_ADMIN_EMAIL` env bağla (kullanıcı maili ✅ çalışıyor) | `10-yol:md.6`; tam-envanter C3 | Hayır | S-M |
| 7 | Havuz kartı (A) + eşleşme-sonrası değerlendirme (B) | (A) ✅ CANLIDA / (B) 🔵 | (A) TAMAMLANDI + (B) tasarım-hazır | (A) **✅ CANLIDA** aday kartı gerekçe FE render (çatı #102, DISC harfi hariç); (B) = **#7 sistem tasarımı** (bkz. C) | (A) main `mentor/page.tsx` compatibilityReason (2×) + `RankedMenti` tipi; (B) `degerlendirme-metrik-sistemi-tasarim-2026-08-19.md` | (A) Hayır (B) Evet | (A) S (B) L |
| 9 | Algoritma kalibrasyon ağırlık UI (0.60/0.40) | ✅ CANLIDA (gösterim) | gösterim TAMAMLANDI | **GÖSTERİM ✅ CANLIDA** (backend #49 + çatı #102): "Mevcut Ağırlıklar" kartı %60/%40 + salt-okuma endpoint. **AYARLAMA YAPILMADI** → madde 9a migration turu | main `algorithm-tuner/page.tsx` kart (2×) + `GET /algorithm-tuner/weights` | Hayır (gösterim) / Evet (ayar) | S |
| 13 | Soru cevap-tipi seçimi (şıklı/açık-uçlu) | ⏸️ ertelendi | hiç-başlanmadı | Kapsam belirsiz (tipler/validation/skoring) → **PO netleştir**; sonra şema alanı = migration · **⚠️ GÜNCELLEME (2026-08-23): ERTELENDİ** — "İçerik & Soru Felsefesi Keşfi" turundan (bkz. B.4) sonra tekrar değerlendirilecek; **muhtemelen gereksiz.** | tam-envanter A4; `schema.prisma` alan yok | **Evet** | M |
| 30 | Sertifika bankası 5→20 canlı seed | 🔴 | içerik-eksik | `seedCertification()` kontrollü çalıştır (idempotent) → **canlı DB yazımı, PO onayı ZORUNLU** | tam-envanter A5; canlı ~5, kod 20 | **Evet (seed)** | S |
| 31 | DISC-tipine-özel "mentiye yaklaşım" içeriği | 🔵 | içerik-eksik | 3 seçenek (statik kılavuz M / SJT koşullu L / sertifika varyant L) → PO seçsin · **⚠️ GÜNCELLEME (2026-08-23):** mevcut soruların hangi felsefeyle/nasıl üretildiği **ÖNCE anlaşılacak**, sonra aynı mantıkla yazılacak. **Yeni DISC/karakter kurgusu (B.4) ile BİRLEŞİK düşünülecek.** | tam-envanter A6; `eksikler-...:9-18` | Seçeneğe göre | M-L |
| 33 | SJT belge-kod (3 vs 4) + seed↔canlı (32 vs 20) kalan | 🔴 ❓ | içerik-eksik | (a) seed↔canlı: re-seed mi trim mi (canlı DB, PO); (b) SJT 3→4 içerik genişletme (PO) | tam-envanter C4; `03-psikometri:47` "4", kod 3 | **Evet (a)** | S |
| 34 | Öğrenme-yolculuğu tamamlanma görünürlüğü (STK admin) | ✅ CANLIDA | TAMAMLANDI | **✅ CANLIDA** (backend #49 → `18cfc42` + çatı #102 → `0fd4942`, merged): `adminListUsers`'a `learningJourneyCompletedAt` + havuz kolonu. Test var | 🟩 main `adminController.ts` alan döner (4×) + test; `menti/mentor-havuzu` kolonu (2×) | Hayır | S |
| 35 | **(2a)** İki tip red: "düzeltme iste" vs "kalıcı/ghost sessiz red" (KARAR 2) | 🔵 | tasarım-hazır | Backend red-tipi alanı + 2 buton + e-posta ayrımı (ghost = sessiz, tekrar-başvuru yok) · **⚠️ GÜNCELLEME (2026-08-23): ghost red = 30 GÜN UYKU MODU.** Kişinin verileri (DISC/profil/mesaj) hemen SİLİNMEZ; 30 gün içinde kurum geri alırsa veriler geri gelir, almazsa **TAMAMEN silinir** (PO geri-alınamazlığı bilerek onayladı). **Zamanlanmış iş (cron) gerekir.** | `11-tasarim-kararlari` KARAR 2; `10-yol:md.35` | **Evet** | M-L |
| 36 | **(2b)** Onaylanmış (aktif) kullanıcıyı sistemden çıkarma (KARAR 3) | 🔵 ❓ | tasarım-hazır + önce-keşif | **ÖNCE git'ten doğrula** (isActive=false/demote kodda var mı?), eksikse yap | `11-tasarim-kararlari` KARAR 3; `10-yol:md.36` | ❓ (keşif sonrası) | M |

### B.2 — Karar/keşif bekleyenler (kodlanamaz — önce PO/keşif)

| No | Konu | Durum | Ne gerekiyor | Kanıt | Migration? |
|---|---|:---:|---|---|:---:|
| K6 | Admin sayfaları server-side guard | ⏸️ v2 | v1-güvenlik mi v2-iyileştirme mi → PO (API zaten backend-korumalı, savunma-derinliği) · **⚠️ GÜNCELLEME (2026-08-23): v2'ye ERTELENDİ.** Ürün önce çıksın; ancak sistem yöneticisi paneli düzgün ayarlanmış olmalı. | tam-envanter A2; `04-guvenlik` | Hayır |
| — | Sektör/etiket başlangıç havuzu (admin-tablo, KARAR 12) | 🔵 ❓ | seed mi / admin-yönetilir tablo mu → şema+PO kararı · **⚠️ GÜNCELLEME (2026-08-23): PO kararı — talep-onay akışı.** Yönetici etiket **yazabilir**; mentör/menti etiket ekleme **TALEBİNDE** bulunabilir; yönetici reddeder / kabul eder / farklı öneri sunar. **ÖNCE kodda ne olduğu keşfedilecek** (`PendingTag`/`tagController` var — bağlı mı?). | tam-envanter A9; `tasarim-kararlari-admin` | Evet |
| K3 | Eski kayıt consent politikası | ⏸️ EN SON | yeniden-rıza / bulk / erteleme → PO ürün+hukuk kararı · **⚠️ GÜNCELLEME (2026-08-23): YAPILACAK ama EN SONA** — canlıya çıkmadan hemen önce (o zamana dek hangi izinlerin isteneceği netleşecek). | tam-envanter A3; `08-acik-sorular` | Evet (backfill) |
| — | K4 yaş **verisi** doğrulaması (beyan ✅ ama veri yok) | ❓ | Şemada yaş alanı yok; öz-beyan yeterli mi yoksa veri-doğrulama mı → PO | 🟩 `schema.prisma` yaş alanı yok (A1) | Evet |
| 9a | **Eşleştirme ağırlığı AYARLANABİLİRLİĞİ** (tenant bazlı) | 🔵 tasarım-hazır | **PO kararı alındı:** varsayılan %60/%40, dernek değiştirebilsin ama **5'er adımla** (küsürat yok), iki ağırlık toplamı hep %100 (biri artınca diğeri azalır). FE: slider ya da +/−, biçim uygulayıcıya. **Migration gerekli** (tenant-bazlı alan) + canlı eşleştirmeyi etkiler → #7 Aşama 2 ile birlikte, PO onaylı migration turu. **Ön iş: madde 9b** · **⚠️ GÜNCELLEME (2026-08-23):** ağırlığı kurumun **TÜM yöneticileri** değiştirebilir (yalnız kurucu değil); iz = kalibrasyon sayfasında tek satır *"son değişiklik: kim / ne zaman / eski→yeni"*; aynı iz hem ağırlık-değişikliği hem **kalibrasyon onay/red** aksiyonları için tutulur. | 🟩 `algorithmTuner.ts:28-37` (STEP=0.05, MIN/MAX var); #9 gösterim 🔀 PR'da | **Evet** |
| 9b | **`scoring.ts` saklanan ağırlığı yoksayıyor** (kalibrasyon dekoratif) | ❓ bulgu | #9 turunda keşfedildi: canlı eşleştirme (`scoring.ts:96` → `matching.ts`) hardcoded 0.6/0.4 kullanır; `getAlgorithmWeights` (Tenant.tenantVocabulary) YALNIZ kalibrasyon UI'ında okunur → approve edilen ağırlık canlıya YANSIMAZ. Düzeltilmeli mi (PO+staging) → 9a ile birleşebilir · **⚠️ GÜNCELLEME (2026-08-23): PO kararı — DÜZELTİLECEK** (❓ → 🔵). Canlı eşleştirme **kaydedilen ağırlığı OKUYACAK**; tüm kurumlar %60/%40 varsayılanıyla başlar, kurum kendi kitlesine göre ayarlar. | 🟩 `getAlgorithmWeights` çağıran: yalnız `algorithmTuner.ts:109`; canlı yol `scoring.ts:96` hardcoded | Hayır (kod) |
| 37 | **Kurum (STK) başvurusu "DÜZELTME İSTE" akışı** (red değil, revizyon talebi) | ✅ CANLIDA | TAMAMLANDI | **✅ CANLIDA** (backend #50 → `ba92dfa` + çatı #104 → `2639e2e`, merged): migration (CORRECTION_REQUESTED enum + `Tenant.correctionNote`, canlıya uygulandı — DB teyitli) + platform admin "Düzeltme İste" endpoint/UI + kurum resubmit + getMe tenant bloğu + mail altyapısı (GÖNDERİM KAPALI). Test CI'da geçti. **⚠️ mail açma = madde 37m** | 🟩 main `platformController.requestTenantCorrection`; `resubmitTenantApplication`; `TenantCorrectionBanner`; `tenantNotifications.ts`; canlı DB enum+kolon VAR | ✅ (additive) |
| 37m | **Kurum mail gönderimini AÇMA** (env bağlama) | 🔴 PO-manuel | Altyapı hazır (`tenantNotifications.ts`, 3 şablon) ama `TENANT_NOTIFICATIONS_ENABLED=false` → gerçek mail GİTMİYOR (log-only). PO `destek@` adresi + prod SMTP env kurup bayrağı `true` yapınca açılır. **Kod işi YOK — PO/altyapı işi.** · **⚠️ GÜNCELLEME (2026-08-23): PO yapacak ama ŞİMDİ DEĞİL.** (Not: denetim raporu Bölüm C — bu bayrak en yüksek kaldıraç; 🟠 bildirim kümesinin tamamı buna bağlı.) | 🟩 `config.email.tenantNotificationsEnabled`; `tenantNotifications.ts` gate | Hayır |

### B.3 — v2 backlog (madde 14-28, hiç dokunulmadı)

| No | İş | Durum | Migration? | Not |
|---|---|:---:|:---:|---|
| 14 | Sektör skoru 5-bileşen canlı bağlama (`sector-scorer` U1) | ⏸️ | Hayır (kod hazır) | staging ŞART; bkz. C-U1 |
| 15 | Eşleştirmeyi birleştir (iki skorlama → tek) | ⏸️ | Hayır | 14'ten sonra, staging |
| 16 | F3 tenant hard-delete (KVKK Md.7) | 🔴 | **Evet** | GERİ-ALINAMAZ + DB → keşif+PO önce |
| 17 | F6 hayalet mod + toplu CSV davet | 🔴 | **Evet** | yeni model, büyük tur |
| 18 | `VisibilityOptIn.requestMessage` kolonu DROP | ⏸️ | **Evet** | teknik borç, PO-onaylı migration |
| 19 | "Neden uyumlu" Katman 2 (KARAR 8) | ⏸️ | Hayır | ürün olgunlaşınca |
| 20 | Mentör yaklaşım kılavuzu Katman 3 (KARAR 9) | ⏸️ | ? | KVKK+etik karar önce |
| 21 | Sektör kolonu (KARAR 10) | ⏸️ | Evet | canlı-sonrası |
| 22 | Landing UX paketi + yumuşak lacivert tema | ⏸️ | Hayır | canlı-sonrası |
| 23 | Gerçek push (Expo/FCM) — şu an stub `sent:true` | ⏸️ | Hayır | tam-envanter A8; in-app/e-posta idare ediyor |
| 24 | Retention otomatik nudge (cron) | ⏸️ | Hayır | manuel `nudgeUser` var |
| 25 | Privacy center UI + DISC için ayrı rıza | ⏸️ | Evet | KVKK ileri |
| 26 | RLS lint kuralı (`findUnique` sızıntı tuzağı) | ⏸️ | Hayır | güvenlik-iyileştirme |
| 27 | Staging ortamı (14/15 ön koşulu) | ⏸️ | Hayır | altyapı |
| 28 | Ortam temizliği (merged worktree/branch sil) | ⏸️ | Hayır | `git branch --merged` teyidi önce |

---

### B.4 — 🆕 2026-08-23 turu: strateji-denetimi + PO oturum kararları

> **Kaynak 1:** `docs/raporlar/kod-denetimi/strateji-gercek-denetimi-2026-08-20.md` (6 strateji belgesi ↔ kod, 85 madde) Bölüm D.
> **Kaynak 2:** bu oturumda ürün sahibinin sözlü verdiği kararlar (aşağıdaki yeni tasarım + erteleme/keşif kararları).
> Yukarıdaki B.1/B.2 satırlarına işlenen PO kararları için ilgili satırdaki **⚠️ GÜNCELLEME (2026-08-23)** notlarına bakınız
> (9a, 9b, K6, K3, sektör/etiket, #35/2a, #13, #31, 37m). Aşağıdakiler **yeni** kalemler.

**Denetimden çıkan yeni açık işler (Y1–Y7 — denetim raporu Bölüm D.1):**

| No | İş (denetimden) | Durum | Ne gerekiyor | Kaynak |
|---|---|:---:|---|---|
| Y1 | Menti **bekleme anı** deneyimi — öğrenme+DISC derinleştirme'yi bekleme ekranına bağla + umut/peer-count mesajı | 🔴 | Bekleme ekranı CTA + sosyal-kanıt (S) | denetim B.1/6-8 |
| Y2 | Menti **reddi yumuşatma** (3 alternatif) + **küçük başarı kutlaması** | 🔴 | Kutlama (S) canlı-öncesi; ret-yumuşatma (M) sonra | denetim B.1/10-11 |
| Y3 | Yönetici **rapor EXPORT** (PDF/CSV) + görüşme ivmesi/tamamlama-uyum ORAN metrikleri | 🔴 | En az export (S) — Persona B/C kanıtı | denetim B.3/2,3,10,11,12,14 |
| Y4 | Yönetici **proaktif kırmızı uyarı** kartı (eşik-tabanlı alarm) | 🟡 | Eşik aşınca kırmızı vurgulu uyarı (S) | denetim B.3/16,17 |
| Y5 | **Mentör kapasite sınırı** (kaç mentiye kadar) | 🔴 | Kapasite alanı + matching kullanımı (M) — PO kararı | denetim B.2/11 |
| Y6 | **Global seed doğrulaması** (A8 DISC soruları + oyunlaştırma stages canlı Neon'da var mı?) | ❓ veri | Salt-okuma `SELECT count(*) WHERE tenantId IS NULL`; boşsa seed (PO onaylı DB yazımı) | denetim B.5/SEED |
| Y7 | Platform **büyüme metrikleri** (ivme, aktif/pasif oran) + platform **ayar UI** + 3. seviye kullanıcı drill | 🔴/🟡 | Düşük öncelik (platform admin = PO); canlı-sonrası | denetim B.4/3,4,12,18 |

**🆕 Yeni ürün tasarımı — DISC/karakter derinleşme kurgusu (PO bu oturumda tanımladı):**

| No | İş | Durum | Tanım | Not |
|---|---|:---:|---|---|
| **DISC-DERİNLEŞME kurgusu** (numarasız · PO "yeni kurgu" dedi — ⚠️ eski "#38" etiketi madde-38 güvenlikle çakıştığı için ADA çevrildi; #33=SJT ile de KARIŞTIRMA) | Tek-seferlik DISC yerine **kademeli karakter derinleşmesi** | 🔵 ❓ tasarım | Önce bir **ANA KARAKTER** belirlensin; kişi sistemi kullandıkça (oyun gibi, soru cevapladıkça) karakter **DERİNLEŞSİN ve kesinleşsin**; sonra kişinin karakterine göre **karşı tarafa NASIL YAKLAŞACAĞI** anlatılsın. PO: *"kişiyi tespit ettik, karşındakini de tespit ettik, bildirdik — ama nasıl aksiyon alması gerektiğini de söylemek lazım."* | **#31 ile birleşik** düşünülecek. PO ayrıca **TÜM soruları görmek** istiyor, sonra beğendiklerini/beğenmediklerini ayıracak. Mevcut altyapı zaten adaptif (`adaptiveTestEngine`, DEEPENING) — kurgu buna oturabilir |

**📁 Sonraki tur notları (bu oturumda PO tanımladı — uygulama YOK):**
- **İÇERİK & SORU FELSEFESİ KEŞFİ:** tüm soruların (DISC / sertifika / SJT / öğrenme-yolculuğu / kurum-özel) **içeriği + hangi felsefeyle üretildikleri + nasıl puanlandıkları** çıkarılacak. **DISC-DERİNLEŞME kurgusu, #31, #13, #30 bu keşfe bağlı** — keşiften önce kodlanmayacak.
- **BELGE YENİDEN YAPILANDIRMA TURU (~68 belge):** PO mevcut belge düzeninden **memnun değil.** Kapsam: klasör ayrımı
  (strateji/ ↔ envanter/), isim düzeltmeleri (karışan çiftler), arşivleme, tüm belge setinin referans haritası + sadeleştirme
  (denetim raporu Bölüm E ile aynı; `admin-panelleri-tasarim` güçlü arşiv adayı). Ayrı büyük tur.

**🔵 CANLI ÖNCESİ DENETİM LİSTESİ (yeni madde — zaman: TÜM geliştirme bitince, ayrı tur):**
> PO bir kontrol listesi tarif etti. ⚠️ Liste klasik **pazarlama sitesi** için yazılmış; bu ürün **giriş yapılan bir UYGULAMA** —
> bazı maddeler (portfolyo, harita, müşteri yorumları, ekip fotoğrafları) UYMAYABİLİR; SEO maddeleri yalnız **public/landing** için.
- **Public/landing (SEO):** 404 sayfası · hero CTA · iç linkleme · teşekkür sayfası · breadcrumb · SSS · site hızı · sticky CTA ·
  robots.txt · benzersiz `<title>` · meta description · OG/Twitter kartları · görsel alt etiketleri · JSON-LD schema · Search Console.
- **Yasal (zorunlu):** KVKK / gizlilik / çerez metinleri (K3 ile birleşir; sayfalar kodda MEVCUT, metin taslak).
- **Uygulamaya özel EK maddeler:** uygulama-içi (giriş sonrası) sayfaların arama motoruna **KAPALI** olduğu teyidi (KVKK) ·
  boş-durum ekranları · hata/yükleniyor durumları · **mail akışları uçtan uca testi** (37m açılınca) · mobil kullanılabilirlik
  (çok-kolonlu yönetici tabloları) · yedekleme/geri dönüş · **foto volume kalıcılığı** (Dokploy) · sunucu güvenliği.

**🔴/🟡 2026-08-23 hijyen + PO-manuel maddeleri (belge-düzeni turundan çıktı):**
- **🔴 Çerez izni / Consent Mode v2 bandı** — canlı-öncesi ZORUNLU. PR **#110** (analytics GTM/GA4/Clarity, **merge-kilitli**) buna bağlı; K3/çerez metinleriyle birleşik. Bant olmadan üçüncü-taraf veri aktarımı = KVKK ihlali (yurt-dışı aktarım beyanıyla çelişir).
- **✅ Repolar PRIVATE yapıldı** (2026-08-25, PO-manuel) — çatı `menti-mentor-v2` + backend `menti-mentor` artık private. (Eskiden public'ti; G1/G3 açıkları da #51 ile canlıda düzeltildi.)
- **🟡 Depo hijyeni:** 20 merge-olmamış uzak dal (13'ü 25+ gün eski) + 3 atıl worktree (`cati-bump`, `cati-compose`, `cati-lj`) — gözden geçir/temizle (PO onayı).
- **🔵 Belge düzeni — alt-klasör + isimlendirme tasarımı HAZIR** (öneri; plan dosyasında): `kararlar/` sıcak-kök + `konu/`+`denetim/`; `raporlar/` `persona/panel/denetim/kesif/icerik/`. Uygulama ayrı BYPASS turu (git mv + ~120-150 referans + INDEX en son). Taşıyıcı 5 ad (09-DURUM/10-yol/00-KARAR-TAKIP/00-INDEX/CLAUDE.md) KALIR.

---

## C. 💀 ÖLÜ KOD & YARIM BAĞLANTILAR (niyeti anla → bağla; SİLME kararı PO'da)

> **Ürün sahibi ilkesi:** "Biz o kodu bir sebeple yazdık; önemli olan **neden yazdığımızı bulup kaldığı yerden devam etmek**."
> Bu bölüm her kalem için: ne yapıyor · **neden yazılmış (niyet)** · neye bağlanacak · bağlanınca hangi iş biter · kanıt.
> **"Sil" ÖNERİLMEZ** — gerçekten terk adayı olanlar "❓ bilinçli terk mi, PO kararı" diye işaretlenir.

### 🌟 ÖRÜNTÜ: "Eşleşme-sonrası değerlendirme + metrik + dönemsel checkpoint" — TEK yarım özellik
> Aşağıdaki **5 kalem birbirinden bağımsız ölü kod DEĞİL** — hepsi backend+şema+FE'de yazılıp **birbirine bağlanmadan bırakılmış tek bir özelliğin** parçaları. Tasarımı yeni formalize edildi: `degerlendirme-metrik-sistemi-tasarim-2026-08-19.md` (roadmap #7-B). **Bunları bağlamak = #7'yi inşa etmek** (silmek değil).

> **⚡ GÜNCELLEME (2026-08-19) — #7 Aşama 1 (migration'sız uçları bağla) PR'da 🔀 (MERGE OLMADI):**
> backend PR **#48** + çatı PR **#100**. Kod gerçeğiyle işaretlendi (PR'da bekliyor, "canlıda" DEĞİL):
> - ✅🔀 **D1 `findMatchesDueForCheckpoint`** → günlük cron'a bağlandı (`runCheckpointFeedbackReminderCron`), **LOG-ONLY** (gerçek bildirim Aşama 2 — mail geri-alınamaz + dedup guard'ı şema ister).
> - ✅🔀 **Kalite puanı kalıcı yazım** → `TenantMembership.qualityMultiplier`'a event-driven yazılır (`persistMentorQualityMultiplier`); yönetici havuzunda "Kalite Puanı" kolonu görünür.
> - ✅🔀 **F1 `getPairSignal` / `/pair-signal`** → yöneticiye TOPLU bağlandı (`adminListMatches` risk sinyali kolonu; eşleşmeler sayfası "Risk" rozeti). Esik mantığı `pairSignal.service.ts`'te.
> - 🟡 **F5/F6 `ContextualFeedbackHost`/`MeetingProvider`** → BAĞLANMADI (Aşama 2/3): kullanıcı-bazlı "vadesi gelen checkpoint" endpoint'i + poller yok; kullanıcıya görünen modal → şüphede bağlama kuralı.
> - 🟡 **feedback şema alanları** (`periodic*` vb.) → hâlâ yazılmıyor (değerlendirme formu Aşama 3).
> - ⏭️ **Otomatik pasifleştirme + tenant eşik alanı** → Aşama 2 (şema = migration = PO onayı gerekli). **⚠️ GÜNCELLEME (2026-08-23):** dernek **eşiği kendi girer**; özellik **varsayılan KAPALI**.

> **⚡ GÜNCELLEME (2026-08-19, merge turu) — #7 Aşama 1 ✅ MERGED, CANLIDA:** yukarıdaki 🔀 PR'lar merge edildi
> (backend #48 → backend main `b5f4b88`; çatı #100 → çatı main `ef2b995`; pointer senkron; iki main CI yeşil).
> Yani **✅🔀 kalemleri artık ✅ CANLIDA** (autodeploy açık): D1 checkpoint cron (LOG-ONLY), kalite puanı kalıcı
> yazım + yönetici "Kalite Puanı" kolonu, F1 risk sinyali + eşleşmeler "Risk" rozeti. **Hâlâ AÇIK (Aşama 2/3):**
> 🟡 F5/F6 ContextualFeedbackHost, 🟡 feedback `periodic*` alanları, ⏭️ otomatik pasifleştirme + tenant eşik (migration).

| Kalem | Yer (kanıt 🟩) | Ne / Niyet | Neye bağlanacak → hangi iş biter |
|---|---|---|---|
| **D1** `findMatchesDueForCheckpoint` | `backend/.../feedback.service.ts:71` (0 çağrı) | Dönemsel checkpoint'i gelen eşleşmeleri bulur — **periyodik değerlendirme tetikleyicisi** | #7 cron/periyodik metrik toplama → dönemsel değerlendirme otomatikleşir |
| **feedback şema alanları** `engagementScore`, `goalClarityScore`, `periodic*` (Trust/Network/Confidence/Nps/CareerGrowth) | `schema.prisma:589-590,597-601` — tanımlı, **hiçbir endpoint yazmıyor** (yalnız menti'den gizleme destructure'ı `feedbackController.ts:130-133`) | Mentör→menti dönemsel değerlendirme alanları (kariyer/güven/ağ/özgüven/NPS) | #7 değerlendirme formu → alanlar dolar, metrik hesaplanır |
| **F5/F6** `ContextualFeedbackHost` + `MeetingProvider`/`useMeeting` | `ContextualFeedbackHost.tsx:22` (mount yok) · `MeetingContext.tsx:34` (provider mount yok) | Görüşme sonrası **bağlamsal feedback formunu** otomatik gösteren FE zinciri | #7 FE tarafı. **Not:** backend `payload.tags` alanı eksik olduğu için bağlanmamış (`unutulmus-niyet:69`) |
| **F1 + öksüz endpoint** `getPairSignal` + `GET /api/meetings/pair-signal` | `meetings.ts:111` (0 çağrı); endpoint `meetingRoutes.ts` var | Mentör-menti çiftinin **sağlık/risk sinyali** (backend hazır, FE bağlanmamış) | #7 risk-sinyali/metrik paneli → çift durumu görünür |

### Diğer ölü/atıl kalemler (örüntü dışı)

| Kalem | Yer (kanıt 🟩) | Ne / Niyet | Durum → öneri (silme değil) |
|---|---|---|---|
| **D2** `llmRetry.ts` / `fetchWithRetry` | `llmRetry.ts:34` (0 import) | LLM retry sarmalayıcı; dosya yorumu "matchReason.ts kullanır" der ama **`matchReason.ts` YOK** (LLM eşleşme-gerekçesi kaldırılmış) | **❓ bilinçli terk mi?** LLM-gerekçe geri gelecek mi = PO kararı. Silme değil, karar bekliyor |
| **D3** `UserProfile.qualityMultiplier` | `schema.prisma:970` (ikiz); canlı akış `TenantMembership.qualityMultiplier:1065` kullanıyor (certification/sjtScoring/matching/scoring) | Mentör kalite katsayısı; **UserProfile ikizi atıl** (tüm okuma/yazma TenantMembership'te) | **❓ PO:** DROP migration mi (canlı DB) yoksa ileride kullanılacak mı? Silme değil |
| **U1** `sector-scorer.service.ts` | `:67,99` (dış çağrı 0, coverage FNDA:0) | 5-bileşen sektör-uyum skoru; canlı basit Jaccard etiket-kesişimi kullanıyor | **⏸️ bilinçli bekliyor** = v2 #14 (staging şart). Bağlanmayı bekliyor |
| **U2** `matchingInterface.ts` (strategy pattern) | 0 import; yorum "USER akışı / planlı JOB_LISTING" | Gelecek iş-ilanı eşleştirmesi şablonu | **⏸️ bilinçli** gelecek-şablon. Dokunma |
| **maxMeetingsPerWeek** | `schema.prisma:167` + admin CRUD `adminSettingsController.ts:62-113` + test `hardening.test.ts:293` | Menti haftalık maks. görüşme sınırı — **admin ayarlanabilir + test var (ÖLÜ DEĞİL)** | **❓ TEYİT GEREK:** ayar yazılıyor ama görüşme oluşturmada **enforce ediliyor mu** doğrulanmadı → ayrı bakılmalı |

### C.2 — 2026-08-23 tam niyet envanteri (5 paralel ajan · kod-teyitli)
> Yukarıdaki C kümesine EK — 5 ajanın çıkardığı, C'de olmayan yarım-iş/bağlanmamış-kod kalemleri, **niyetiyle**.
> Niyet kaynağı çoğunda **2026-07-07 "sprint 8-11" mega-commit'i** (backend-first inşa) — o yüzden çok endpoint FE'siz kaldı.
> Tam döküm + FE-çağrı kanıtları: `../raporlar/kod-denetimi/yarim-is-niyet-envanteri-2026-08-23.md`. Sayı: **BAĞLA ~11 · BEKLET ~15 · ❓ PO ~12**.

| Kalem (dosya:satır) | Niyet (neden yazıldı) | Neye bağlanacak → biter | Öneri |
|---|---|---|---|
| **SJT psikometri akışı:** `POST /scoring/compute-profile` + `/rank-mentors` (`sjtScoringRoutes.ts:20,26`) + `SjtQuestion/SjtOption` tabloları (`schema.prisma:889,906`, 0 query) | SJT tabanlı profil+mentör sıralama alternatif yolu (cert paketleri, `1e11e73`) | SJT test akışı FE ekranı → canlı eşleşmeye alternatif | ❓ PO: SJT canlıya girecek mi (girmezse BEKLET) |
| **`taxonomy.service.ts` + `IndustryNode`** (`sector-scorer.service.ts:2`'den çağrılıyor) | Taksonomi ağacı yakınlığı → isabetli sektör skoru | U1 sector-scorer canlıya bağlanınca → İŞ 7 | BEKLET (U1/İŞ 7'ye bağlı) |
| **Kulüp modülü:** `/clubs` 7 uç (`clubRoutes.ts:20-44`) + `Club/ClubMembership` tabloları | Kulüp/topluluk özelliği (sprint 8-11 backend-first) | FE tümü + pilot kulüp kararı (`08-acik-sorular`) | ❓ PO KARARI (canlıya girecek mi, yarım-terk mi) |
| **Feedback-logs modülü:** `/feedback-logs` + `/combination-scores` (`feedbackLogRoutes.ts`) | ML geri-bildirim döngüsü / kombinasyon skor analizi | ML analiz paneli veya iç araç | ❓ PO KARARI (ürün-yüzü mü iç araç mı) |
| **Tenant-admin şikayet inceleme:** `GET/PATCH /admin/reports` (`reportController.ts`) | Kurum-içi şikayet döngüsünün admin tarafı (`7cfc8d5`); oluşturma canlı, inceleme yarım | Tenant-admin şikayet paneli → döngü kapanır | BAĞLA |
| **Admin manuel eşleştirme aksiyonları:** `/users/:id/rematch` (`adminRoutes.ts:55`) + `/visibility-optin/:id/confirm` (double-opt-in, `:68`) | Admin yeniden-eşleştirme + görünürlük onayı | Admin eşleşmeler ekranı butonu | BAĞLA (mentor opt-in T7 ile birlikte) |
| **Profil-güç zinciri:** `profile-completeness.service.ts:28` + `ProfileStrengthCard.tsx` (ikisi de bağlanmamış) | Profil tamamlanma % kartı | Endpoint + dashboard mount (uçtan uca) | BEKLET (profil-güç özelliği) |
| **`TenantSwitcher.tsx`** (mount yok) + backend `/my-tenants` endpoint YOK | Çok-kurum kullanıcı için kurum değiştirme UI | Nav'a mount + backend membership endpoint | BEKLET (çok-kurum UI) |
| **`MeetingScheduler.tsx`** (231 satır, mount yok) | Mentor müsaitlik+rezervasyon UI (canonical `mentor/availability` akışı ayrı) | — (canonical akış zaten var) | ❓ PO KARARI (canonical varken kopya = bilinçli terk mi) |
| **`PATCH /users/me/social`** (`onboardingController.ts:461`) | Sosyal profil (linkedin/instagram) düzenleme | Profil düzenleme ekranı | ❓ PO / düşük-riskli BAĞLA (**niyet belgede yok**) |
| **Mükerrer/eski uçlar:** `/api/system-logs` (platform `/logs` varken) · `/api/super-admin/*` (T6, `/platform/*` varken) · `POST/PATCH /tenants` (platform elle kurum) | Eski/paralel platform-admin API'leri | — | ❓ PO KARARI (konsolide mi) |
| **Endpoint okuma-tarafı boşlukları:** `GET /requests` + `/:id` · `GET /meetings/:id/check-ins` · `/meetings/active` (poller) · `reminders/send` · `orientation-lock` · `questions/respond` (bulk) | Yazma-tarafı bağlı, okuma/liste/tetik tarafı FE'siz | İlgili panel/akış | BEKLET / ❓ PO (uca göre) |
| **`iceBreaker.ts`** (0 import, "decommissioned") | LLM ice-breaker (kaldırılmış) | — | ❓ PO KARARI (bilinçli terk; silme PO'da) |

> **⚠️ Not:** KVKK FE üçlüsü (export/anonymize/hard-delete) = **madde 40** (zaten takipte); mentör görünürlük opt-in FE = **Bölüm F T7**;
> admin sayfaları client-side guard (`(admin)/layout.tsx:6` "Sprint 15" TODO) = **K6** (server-side guard, B.2) — hepsi mevcut, burada tekrar sayılmadı.
> **"~14 FE'siz özellik" iddiası → kod-teyidiyle 9 doğrulandı** (AJAN-D); gerisi yanlış-pozitif (pair-signal FE-stub var, profile-completeness iki uçta bağsız, super-admin ikame).

---

## D. ✅ TAMAMLANANLAR (kısa referans — "bunu yaptım mı?")

> Detay: `10-yol-tamamlananlar.md` + `09-DURUM.md`. Buraya yalnız "yaptım mı?" hızlı-cevabı için liste.

- **v1 canlıda:** KARAR 5 DISC güvenlik (#37+#71) · K2 OAuth consent (#38+#73) · K4 18+ beyan · K5 sunucu konumu (#73) ·
  ThemeToggle (zaten vardı) · sol menü 4-grup (#76) · durum rozeti (zaten vardı) · sertifika rozeti (#40+#77) ·
  **DISC çoklu harf #12 (#47+#93)** · **login enumeration #37 (#46+#91)** · İş 2+3 zinciri (#41-43+#81-85) · admin soru düzenleme UI (#87).
- **Sürpriz "zaten tam" (belge yanılmıştı):** **K2 OAuth `kvkkConsentAt` TAM** — tüm giriş yollarında set ediliyor
  (🟩 `oauthService.ts:112`, `authController.ts:176`, `selfServeController.ts:284/303`). Eski "OAuth yarım" iddiası geçersiz.
- **Eski bayat sanılıp aslında canlıda:** F1 foto upload · F2 platform drill-down · F7 KPI drill-down.

---

## E. 🟡 Repo / altyapı hijyeni (PO kararı bekleyen — kod dışı)

> Kod dışı, repo/geliştirme-ortamı hijyeni. Kayıp gitmesin diye burada; çözümü ayrı tur + PO kararı.

- **🟡 OneDrive senkron riski:** Repo `OneDrive/Masaüstü/Geliştirme` altında — OneDrive'ın `.git` dosyalarını senkronlaması
  kilitleme/bozulma riski + disk doluluğu getiriyor (2026-08-23 turunda disk %98'e dayandı, bir önceki tur `sed` geçici-dosyası patlamıştı).
  **Aday:** repoyu OneDrive dışına taşımak (ör. `C:\dev\`). **PO kararı.**
- **🟡 Dağınık backend kopyaları + atıl worktree'ler:** `C:\Users\...\backend-mail`, `backend-testfix`, `backend-cfgfix` (~1 GB) +
  3 atıl git worktree duruyor. Her birinde **commit edilmemiş iş var mı** kontrol edilip temizlenecek (**ayrı tur**, PO onayı).
- **🟡 Etiket-gerçek çelişkisi — 3 yaşayan belge (KURAL 3/4 ihlali, AJAN-E 2026-08-23):** (a) `oz-denetim/durum-panosu-2026-08-14.md`
  🔄 etiketli ama git'e göre **11 gün donmuş** + madde 38-78/#12/#37/#7'den habersiz + adı zaten tarihli → **📸'ye düşürülmeli** (en net vaka;
  canonical statü zaten `00-KARAR-TAKIP`'e taşındı). (b) `konu/tasarim-kararlari-admin-2026-08-11.md` + (c) `konu/degerlendirme-metrik-...-2026-08-19.md`:
  tarihli ad + 🔄 etiket (Kural-4 ad↔etiket tutarsızlığı) → yaşayan kalacaksa **ad tarihsizleştirilmeli**. **PO kararı** (ad değişimi
  referans+INDEX günceller; bu tur TAŞINMADI, salt öneri). ✅ Gerçek statü çelişkisi taraması: **0** (taşıyıcılar senkron, kodla teyitli).

---

## F. 🔍 2026-08-23 tam-belge taramasından çıkan kayıp maddeler

> 42 içerik belgesi (raporlar + kararlar/konu + oz-denetim) TAM okundu, kod gerçeğiyle çapraz kontrol edildi (7 paralel
> salt-okuma ajanı). Zaten takip edilenler (madde 1-67, B.4, ölü kod C) elendi; **arada yapılmış** olanlar bayat-not adayı
> olarak ayrıldı. Kalan **gerçek yeni kayıp maddeler** burada. Tam döküm + bayat liste: `../raporlar/kod-denetimi/tam-belge-taramasi-2026-08-23.md`.

### F.1 — 🔴 GÜVENLİK · CANLI ÖNCESİ (✅ #51 MERGED — düzeltmeler canlıda; repolar PO tarafından PRIVATE yapıldı)
> ✅ Üç açık da **#51 ile CANLIDA düzeltildi** (b4b6d66); repolar PO tarafından **PRIVATE yapıldı.** (Tarihsel: bu açıklar public repoda görünürdü.)

| Kod | İş | Kanıt (bu tur elle doğrulandı) | Migr | Not |
|---|---|---|:---:|---|
| G1 | `updateUser` (+2 kardeş uç) yanıtı `select`siz tüm User objesini döner → **password hash + PII sızıntısı** | `userController.ts:272→277` (ayrıca 355→381, 418→424) | Hayır | =10-yol madde 38 · **✅ CANLIDA (#51 MERGED → backend main `b4b6d66`):** db.ts global omit + explicit select + test |
| G2 | `hardDeleteUser` Meeting/Feedback FK non-null → **transaction rollback = KVKK kalıcı silme çalışmıyor** | `gdprService.ts:172-174` (kod-yorumu itiraf) + `schema.prisma` Meeting FK RESTRICT | Olası (SetNull) | =10-yol madde 39; **AÇIK** (migration+PO: sil mi anonimleştir mi — envanter C-5 kanıt) |
| G3 | `listSuspicionReports` `select`siz → **şüphe raporu edenin PII'si maskesiz** platform admin'e döner | `platformController.ts:353` | Hayır | =10-yol madde 68 · **✅ CANLIDA (#51 MERGED → backend main `b4b6d66`):** maskName/maskContact + explicit select + test |

### F.5 — 🔍 2026-08-25 güvenlik+KVKK turundan yeni maddeler (numara burada doğar, 79'dan)
> Kaynak: FAZ A/B/C (backend PR #51 + salt-okuma teyitler + `kvkk-veri-aktarim-envanteri-2026-08-25.md`). KURAL 8: numara YALNIZ burada.

| No | İş | Tür | Kanıt | Öncelik |
|:---:|---|---|---|---|
| **79** | `maxMeetingsPerWeek` enforce EDİLMİYORDU → menti limitsiz görüşme açar | yapılmamış-iş (sessiz yanlış) | `meetingController.ts` | ✅ **CANLIDA (#51 MERGED, backend main `b4b6d66`)** (menti başına · sabit 7-günlük UTC kova · tanımsızsa limit yok · 409 · iptal/tamamlanan hariç; test) |
| **80** | `getPlatformLogs` `select`siz + `listUserReports` fullName maskesiz | güvenlik/PII | `platformController.ts:175,411` | ✅ **CANLIDA (#51 MERGED, backend main `b4b6d66`)** (explicit select + maskName + test) |
| **88** | `getPlatformStats` → `recentLogs` `select`siz → ham `meta` (PII) | güvenlik/PII | `platformController.ts:98` | ✅ **CANLIDA (#51 MERGED, backend main `b4b6d66`)** (explicit select, meta çıkarıldı; test) |
| **89** | `listPendingTenants` admin `fullName`+`email` maskesiz | güvenlik/karar | `platformController.ts` | ✅ **CANLIDA (#51 MERGED, backend main `b4b6d66`)** — KARAR: maskele (onay akışı e-posta tüketmiyor, mail adresi yeniden çeker; `maskEmail` domain'i korur). Test |
| **94** | `listPendingTenants` **VIEW audit izi yok** (`listUserReports`/`getAnomalies` aksine) → tutarlılık için eklenebilir | güvenlik/tutarlılık (düşük) | `platformController.ts` (AJAN-1 bulgusu, madde 89 turu) | 🔵 düşük (PII artık maskeli) |
| **90** | **Veri İşleyen Sözleşmesi kayıt akışına entegrasyon** — Tenant yasal kimlik alanları (unvan/adres/VERBİS) | yapılmamış-iş (KVKK) | Belge 8; şema alanı yok → **migration** | 🟡 (hukukçu onayı sonrası) |
| **91** | **Kulüp-tipi tenant AKTİF EDİLMEZ** — üniversite kulübünün veri sorumlusu üniversitedir, imza yetkisi yok (avukat) | karar/kısıt (KVKK) | Belge 8; kulüp modülü (madde 41) | 🔴 (canlı-öncesi kısıt) |
| **92** | **Sunucu ülkesi teyidi** — belge "eu-west-2/İrlanda" çelişkili (eu-west-2=Londra/UK, eu-west-1=İrlanda); yasal metin ülke beyanı için PO sağlayıcı panelinden teyit | PO-manuel (KVKK) | envanter C-1; kapak dosyası 🔴 | 🔴 (yasal beyan riski) |
| **93** | **Tam anonimleştirme** — `anonymizeUser` kısmi (takma-adlaştırma). **✅ Kısmen CANLIDA (#51 MERGED):** sosyal/avatar/enneagram/discResultCard eklendi. **KALAN:** mesaj içeriği · fiziksel foto dosyası (disk) · `Meeting.phoneNumber/notes` · kayıt-anahtarı (userId PK) bağı → çapraz-tablo yeniden-tanımlanma riski | yapılmamış-iş (KVKK, mimari) | `gdprService.ts:64-96`; saklama-imha metni gerçeğe göre düzeltildi | 🟡 (madde 39 ile akraba) |
| **81** | KVKK **otomatik imha süreci** yok (yalnız SystemLog 90g); mesaj içeriği/FeedbackLog **süresiz**; hardDelete'te bile Message kalır | yapılmamış-iş (KVKK) | envanter C-5; `gdprService.ts:253` (yorum "3 yıl" uygulanmamış) | 🟡 (saklama politikası bağımlı) |
| **82** | Rıza metni **sürümü tutulmuyor** (`consentVersion` yok, yalnız `kvkkConsentAt` zaman damgası) → ispat açığı | yapılmamış-iş (KVKK ispat) | envanter C-6; grep `consentVersion` sonuç yok | 🟡 |
| **83** | **OAuth'ta açık rıza UI'da alınmıyor** (`oauthService.ts:112` implicit set; ekranda kutu yok) + KVKK/18+ **tek kutuda birleşik** + aydınlatma≠açık rıza ayrımı yok | yapılmamış-iş/[HUKUKÇU] | envanter C-6; `_RegisterContent.tsx:414` | 🟡 (hukukçu kararına bağlı) |
| **84** | Başvuru/`destek@` e-postası config'te **tanımsız** + FE hak-kullanım ekranı yok → Md.11 hak kullanım kanalı operasyonel eksik | yapılmamış-iş (KVKK) | envanter C-8; `config.ts:31,70-74` · **madde 40 (KVKK FE) ile bağla** | 🟡 |
| **85** | Aydınlatma metni **eksik kategoriler** (mesaj içeriği, sosyal linkler, OCEAN/SJT, lastLoginAt, phone sayılmıyor); OAuth aktarımı Md.5 listesinde yok | belge-kod çelişki (KVKK) | envanter C-7 (#3,#4) → KVKK paketi düzeltecek | 🟡 |
| **86** | `mentorVisibilityEnabled` **ölü/bağlanmamış PLG alanı** (default true, setter yok, hiçbir eşleşme sorgusunda filtre değil) — yarım özellik mi bilinçli mi | ölü-kod/karar | FAZ B (T7); `schema.prisma:283`, `userController.ts:177` | 🔵❓ PO |
| **87** | Onaylanan kalibrasyon önerisi (`saveAlgorithmWeights`) scoring'de **okunmuyor** → ölü yazma yolu (9b'nin latent izi) | ölü-kod (düşük) | FAZ B (9b); `scoring.ts:96` weights argümanı almaz | 🔵 düşük |

> **VERBİS teyidi + veri sorumlusu kimliği** = PO manuel (kod dışı); envanter [PO DOLDURACAK] alanlarında. **madde 39 (G2)** = KVKK silme migration'ı, F.1'de açık.

### F.2 — 🟡/🔵/❓ Yeni iş / karar / çelişki (takipte yoktu, kod-teyitli)
> **Yol-haritası numaraları (2026-08-23 verildi):** T1=**69** · T2=**70** · T3=**71** · T4=**72** · T5=**73** · T6=**74** · T7=**75** · T8=**76** · T9=**77** · T10=**78** (10-yol `v1-H`). G1=madde 38, G2=madde 39 (mevcut), G3=68.

| Kod | İş | Tür | Kanıt | Boy | Migr |
|---|---|---|---|:---:|:---:|
| T1 (madde 69) | Zod VALIDATION yanıtında `message` yok → generic "Hata" | ✅ **CANLIDA (#51, `b4b6d66`)** | `questionController.ts` (`firstValidationMessage`; FE zaten `message` okuyor → FE değişikliği YOK) | S | Hayır |
| T2 (madde 70) | adaptive-test backend `progress` döndürmüyor | ✅ **CANLIDA (#51, `b4b6d66`)** | `adaptiveTestEngine.ts` (`computeProgress`, migration yok; FE guard `DailyQuestionWidget.tsx:39` = ayrı FE turu) | M | Hayır |
| T3 | `SuspicionReport`'ta `tenantId` yok → raporlar global, tenant-izolasyon boşluğu | açık-soru/güvenlik | `platformController.ts:348-356` | S | Olası |
| T4 | Sertifika baraj "0 puan" kuralı yalnız `isRedLine`'da kodlanmış; "tüm sorularda mı" kararı yok | verilmemiş-karar | `certification.service.ts:67` | S | Hayır |
| T5 | `seed-certification.ts` runner'a bağlı değil → 20-senaryo bankasını canlıya **güvenli** taşıma yöntemi yok (**madde #30'u BLOKLAR**) | yapılmamış-iş | `package.json` (tek seed = `prisma/seed.ts`) | M | Evet |
| T6 | `superAdminRoutes` mount edilmiş ama FE'de 0 kullanım → paralel/ölü platform-admin API'si | ölü-kod/karar | `server.ts:12,105` + FE "super-admin" → yok | S | Hayır |
| T7 | Mentör **görünürlük opt-in** FE ekranı bağlı değil (backend `setVisibilityOptIn` var) | yapılmamış-iş | backend var; FE çağrısı → yok | M | Hayır |
| T8 | Sıfırdan manuel eşleştirme: envanter "eksik" ↔ strateji "elle eşleştirme YASAK" → **çelişki, PO** | çelişki/karar | `stk-panel-envanteri:71,148` ↔ `stk-strateji:67` | M | Hayır |
| T9 | Platform tek-kullanıcı profil drill-down endpoint'i yok (üye listesi var, kişiye inilmiyor) | yapılmamış-iş | `platform.ts` (üye var, `/users/:userId` yok) | M | Hayır |
| T10 | Mentör emeği görünür kılma (takdir/rozet/"yılın mentörü") — persona-kaynaklı, hiç yok | yapılmamış-iş | `mentor-persona:83-86`; kodda rozet → yok | M | Olası |

### F.3 — 📄 Bayat belge notu (ayrı hijyen turu)
- `raporlar/icerik/` 6 belgesi + `disc-sorulari` **var olmayan `seed-questions.ts`'e dayanıyor** (silindi #45); gerçek kaynak `seed.ts`=32 soru → bu belgelere ⚠️ GÜNCELLEME notu gerek.
- ~25 "belge açık diyor, kod yapmış" bayat-not adayı (kesif/panel/konu belgeleri) → tam liste tarama raporunda Bölüm 3. Kaynak belgelere ⚠️ notu düşülecek (silme yok).

### F.4 — ❓ Sonraki turda kod-teyidi bekleyen (bu tur okunmadı)
N+1 konuşma listesi · pagination'sız listeler · a11y (modal/label/radiogroup) · DISC light WCAG · onay/red maili başvurana gidiyor mu · KARAR 6 davet→oto-onay tetiği · `maxMeetingsPerWeek` enforce · profile-completeness uçtan uca bağı. (uydurma yok — TEYİT GEREK)

> **⚠️ Numara notu (✅ 2026-08-23 çözüldü):** F maddeleri numaralandı (G3+T1-T10 → **68-78**, `v1-H`). **#38 çakışması çözüldü:**
> **madde 38 = güvenlik `updateUser`** (sayı dizisinde KALIR, canonical) · B.4'teki DISC işi artık numarasız **"DISC-DERİNLEŞME kurgusu"** adıyla anılır (sayı dizisinden çıkarıldı). Sonraki yeni iş: **79'dan** başla.

---

## G. 📌 NASIL KULLANILIR (bu belgenin kendi kılavuzu)

1. **Her oturum başında** bu belge OKUNUR; ajan ürün sahibine açık maddeleri (🔴/🟡/🔵/❓) proaktif hatırlatır.
   Ürün sahibi "arkada ne kaldı" diye sormak zorunda kalmamalı — ajan söyler. *(Kural: `CLAUDE.md` "Karar-Takip Disiplini".)*
2. **Bir iş bitince** ilgili satır ✅'a çekilir + D bölümüne taşınır — **AMA önce KOD GERÇEĞİYLE doğrulanır**
   (grep/dosya). Belge asla "yapıldı" demez, kod öyle demedikçe. Doğrulanamıyorsa "❓ TEYİT GEREK".
3. **Yeni karar alınınca** buraya 🔴 satır EKLENİR (karar alındı ama yapılmadı = görünür kalır, unutulmaz).
4. **Bu belge ↔ 09-DURUM/10-yol ilişkisi:** bu belge = "**ne kaldı**" görünürlüğü (açık iş/ölü kod/karar tek bakışta) ·
   `09-DURUM` = "**şu an ne oldu**" anlatısı · `10-yol-haritasi` = öncelikli sıra · `10-yol-tamamlananlar` = biten v1.
   Çelişkide **KOD kazanır**, sonra bu belge düzeltilir (silme yok — `belge-duzeni-rehberi` Kural 6).
