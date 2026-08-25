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
> yönetici kanıt katmanı (export/oran/trend). **Yeni açık iş:** Y1–Y7 + **#38 yeni DISC/karakter kurgusu** (bkz. **Bölüm B.4**).
> Bu turda birçok ❓ karara bağlandı (9b→düzeltilecek, K6→v2, K3→en son, sektör/etiket→talep-onay, 2a→30 gün uyku modu,
> #13→ertelendi); satır-içi **⚠️ GÜNCELLEME (2026-08-23)** notlarına bakınız.

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
| **#38** (PO "yeni kurgu / #33" dedi — ⚠️ mevcut #33=SJT ile KARIŞTIRMA) | Tek-seferlik DISC yerine **kademeli karakter derinleşmesi** | 🔵 ❓ tasarım | Önce bir **ANA KARAKTER** belirlensin; kişi sistemi kullandıkça (oyun gibi, soru cevapladıkça) karakter **DERİNLEŞSİN ve kesinleşsin**; sonra kişinin karakterine göre **karşı tarafa NASIL YAKLAŞACAĞI** anlatılsın. PO: *"kişiyi tespit ettik, karşındakini de tespit ettik, bildirdik — ama nasıl aksiyon alması gerektiğini de söylemek lazım."* | **#31 ile birleşik** düşünülecek. PO ayrıca **TÜM soruları görmek** istiyor, sonra beğendiklerini/beğenmediklerini ayıracak. Mevcut altyapı zaten adaptif (`adaptiveTestEngine`, DEEPENING) — kurgu buna oturabilir |

**📁 Sonraki tur notları (bu oturumda PO tanımladı — uygulama YOK):**
- **İÇERİK & SORU FELSEFESİ KEŞFİ:** tüm soruların (DISC / sertifika / SJT / öğrenme-yolculuğu / kurum-özel) **içeriği + hangi felsefeyle üretildikleri + nasıl puanlandıkları** çıkarılacak. **#38, #31, #13, #30 bu keşfe bağlı** — keşiften önce kodlanmayacak.
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
- **🔴 Repolar PUBLIC** (çatı `menti-mentor-v2` + backend `menti-mentor`) — PO-manuel: GitHub'dan private yap (kanıt: `gh repo view --json visibility`).
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

## E. 📌 NASIL KULLANILIR (bu belgenin kendi kılavuzu)

1. **Her oturum başında** bu belge OKUNUR; ajan ürün sahibine açık maddeleri (🔴/🟡/🔵/❓) proaktif hatırlatır.
   Ürün sahibi "arkada ne kaldı" diye sormak zorunda kalmamalı — ajan söyler. *(Kural: `CLAUDE.md` "Karar-Takip Disiplini".)*
2. **Bir iş bitince** ilgili satır ✅'a çekilir + D bölümüne taşınır — **AMA önce KOD GERÇEĞİYLE doğrulanır**
   (grep/dosya). Belge asla "yapıldı" demez, kod öyle demedikçe. Doğrulanamıyorsa "❓ TEYİT GEREK".
3. **Yeni karar alınınca** buraya 🔴 satır EKLENİR (karar alındı ama yapılmadı = görünür kalır, unutulmaz).
4. **Bu belge ↔ 09-DURUM/10-yol ilişkisi:** bu belge = "**ne kaldı**" görünürlüğü (açık iş/ölü kod/karar tek bakışta) ·
   `09-DURUM` = "**şu an ne oldu**" anlatısı · `10-yol-haritasi` = öncelikli sıra · `10-yol-tamamlananlar` = biten v1.
   Çelişkide **KOD kazanır**, sonra bu belge düzeltilir (silme yok — `belge-duzeni-rehberi` Kural 6).
