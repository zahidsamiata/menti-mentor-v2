# BELGE BİLANÇOSU — TUR 1 / GRUP A (canonical takip belgeleri)

**📸 DONDURULMUŞ** (bilanço bölümü — 2026-08-26) · Kaynak dal: `docs/belge-bilancosu-2026-08-26` · Tur 1/4

> **Ne bu:** `docs/kararlar/` kök **canonical takip belgelerinin** (6 belge) baştan-sona okuma-sayımı.
> Bu bölüm, Grup B (kararlar/konu + oz-denetim) ajanlarının **çapraz-kontrol referansıdır** — Grup B kalemleri
> bu belgede karşılık arayacak. Numara YALNIZ 00-KARAR-TAKIP'te doğar (KURAL 8); burada "numara adayı" bile YOK,
> yalnız MEVCUT numaralar sayılır. **NİHAİ RAPOR/PR bu turda YAZILMAZ.**

---

## 0. OKUMA İLERLEME TABLOSU (Grup A)

| belge | satır | okundu | bulunan kalem |
|---|:---:|:---:|:---:|
| `00-KARAR-TAKIP.md` | 338 | ✅ TAM | ~103 numaralı + K/Y/T/G kodları + 9 ölü-kod + NUMARASIZ (aşağıda) |
| `10-yol-haritasi.md` | 254 | ✅ TAM | madde 1-78 (numaralı) + v2 14-28 + K6/sektör + ❓-teyit bloğu |
| `10-yol-tamamlananlar.md` | 68 | ✅ TAM | 26 biten v1 (tablo) + madde 1 tarihsel gövde |
| `00-CIKIS-PLANI.md` | 120 | ✅ TAM | K0-K5 sınıflandırma (5 K0 + 1 K1) + 10 K5-soru |
| `09-DURUM.md` | 341 | ✅ TAM | ~15 snapshot katmanı + ✅ bölümler + BEKLEYEN/borç |
| `00-INDEX.md` | 192 | ✅ TAM | belge haritası (envanter — karar kalemi az) |

**Grup A toplam: 6/6 belge TAM okundu. Okunmayan: 0.**

---

## 1. NUMARALI İŞ ENVANTERİ — durum (canonical, kod-doğrulamalı)

> Bu belgeler zaten canonical takip; durum + kanıt içlerinde beyan edilmiş. SEVİYE-1 kalemlerde (güvenlik/KVKK/
> DB/eşleştirme/kimlik) kod kanıtı canonical belgede dosya:satır olarak verilmiş → burada ✅/kanıt kabul edilir,
> Grup B'de "belge açık diyor kod yapmış" adayları BUNLARLA çaprazlanır. Numara sırasıyla:

### ✅ YAPILDI (canlıda — canonical + PR kanıtlı)
| No | İş | Kanıt (canonical) | Seviye |
|---|---|---|:---:|
| 1 | KARAR 5 DISC güvenlik (menti mentör DISC görmez) | backend #37+çatı #71; `discVisibility.ts` | S1 ✅ |
| 2 | K2 OAuth `kvkkConsentAt` | #38+#73; `oauthService.ts:112`,`authController.ts:176` | S1 ✅ |
| 3 | K4 18+ öz-beyan (KVKK metnine gömülü) | #38+#73 | S1 ✅ |
| 4 | K5 sunucu konumu beyanı | #73; `kvkk/page.tsx` §8 | S1 ✅ |
| 5 | ThemeToggle admin/platform nav | zaten mevcut; `(admin)/layout.tsx:92` | S2 ✅ |
| 8 | Sol menü 4-grup | çatı #76 | S2 ✅ |
| 10 | Durum rozeti | zaten mevcut; `APPROVAL_META` | S2 ✅ |
| 11 | Sertifika rozeti (kişi-geneli) | #40+#77; `TenantMembership.isCertified` | S2 ✅ |
| 12 | DISC çoklu harf "DI" | #47+#93+#94; `DISC_LETTER_CONFIG`,`discLetters.ts` | S1 ✅ |
| 29 | İş 2+3 (onay/red izi+gerekçe+reddedilen akışı) | #41-43,#81-85 | S1 ✅ |
| 32 | Admin soru düzenleme UI | çatı #87 (tenant-scoped IDOR) | S1 ✅ |
| 34 | Öğrenme-yolculuğu görünürlüğü (STK admin) | #49+#102; `adminController` | S2 ✅ |
| 37 | Kurum "DÜZELTME İSTE" akışı | #50+#104; migration canlıda (CORRECTION_REQUESTED) | S1 ✅ |
| 38 (G1) | `updateUser` password+PII sızıntısı fix | #51 `b4b6d66`; db.ts global omit+select | S1 ✅ |
| 68 (G3) | `SuspicionReport` reporter PII maske | #51; maskName/maskContact | S1 ✅ |
| 69 (T1) | Zod validation mesajı | #51; `firstValidationMessage` | S2 ✅ |
| 70 (T2) | adaptive-test `progress` (+FE guard #114) | #51 backend + çatı #114 | S2 ✅ |
| 79 | Haftalık görüşme limiti enforce | #51; 7-günlük UTC kova | S1 ✅ |
| 80 | `getPlatformLogs` select + `listUserReports` maske | #51 | S1 ✅ |
| 88 | `getPlatformStats` recentLogs meta çıkarıldı | #51 | S1 ✅ |
| 89 | `listPendingTenants` admin PII maske | #51 | S1 ✅ |
| 9 (gösterim) | Ağırlık gösterim kartı %60/%40 | #49+#102; `GET .../weights` | S2 ✅ |
| 9a | Tenant manuel ağırlık ayarı (PUT weights, +/− %5) | #52 `838d128`+çatı #114; migration YOK | S1 ✅ |
| 9b | Motor kaydedilen ağırlığı okur (madde 87 çözüldü) | #52; `computeTotalScore` ops. ağırlık | S1 ✅ |
| 87 | Onaylanan kalibrasyon scoring'de okunmuyordu (ölü yazma) | 9b ile çözüldü #52 | S1 ✅ |
| 92 | KVKK sunucu ülkesi Londra/BK (AB değil) | çatı #117; PO teyitli | S1 ✅ |
| 95 | Kalibrasyon 'son değişiklik' aktör izi | #53 `b433554`+çatı #116; migration YOK | S1 ✅ |
| 93+39 (96) | Tam anonimleştirme + hardDelete→anonymize | #54 `b433554`+çatı #117; PO (c)+(iii)+(2); migration YOK | S1 ✅ |

### ⬜ AÇIK (v1 — canlı öncesi/sonrası)
| No | İş | Durum notu (canonical) | Seviye |
|---|---|---|:---:|
| 6 | Kurum onay/ret maili + `destek@` + env | 🟡 kullanıcı maili ✅ / kurum kısmı AÇIK | S2 |
| 7-B | Eşleşme-sonrası değerlendirme Aşama 2/3 | 🔵 tasarım-hazır (#7); migration'lı | S1 |
| 13 | Soru cevap-tipi (şıklı/açık-uçlu) | ⏸️ ERTELENDİ; migration; kapsam belirsiz→PO | S1 (migr) |
| 30 | Sertifika 5→20 canlı seed | 🔴 T73 runner bloke; canlı DB yazımı→PO | S1 (seed) |
| 31 | DISC-tipine-özel "mentiye yaklaşım" içeriği | 🔵 SIFIRDAN yazılacak (negatif teyit) | S2 (içerik) |
| 33 | SJT içerik 3→4 + seed↔canlı 32/20 kalan | 🔴❓ canlı DB→PO | S1 (seed) |
| 35 (2a) | İki tip red: düzeltme-iste vs ghost/30-gün-uyku | 🔵 tasarım-hazır; migration+cron | S1 (migr) |
| 36 (2b) | Onaylanmış kullanıcıyı çıkarma | 🔵❓ önce keşif (kodda var mı) | S1 |
| 37m | Kurum mail gönderimini AÇMA (env) | 🔴 PO-manuel; `TENANT_NOTIFICATIONS_ENABLED=false` | K4 (env) |
| 39 (G2) | hardDelete FK — **NOT:** 93+39 ile anonymize'e yönlendirildi | ✅ CANLIDA (#54) ama G2 tablosu hâlâ "açık" gösteriyor ⚠️ ÇELİŞKİ (bkz. §3) | S1 |
| 40 | KVKK FE üçlüsü (export/anon/silme) | ⬜ backend hazır, FE 0 | S1 (KVKK) |
| 66 | `www`→çıplak-host 301 (SEO-kanonik) | 🔴 KRİTİK; `middleware.ts` yok | S2 (altyapı) |
| 90 | Veri İşleyen Sözleşmesi entegrasyon (tenant yasal alan) | 🟡 migration; hukukçu sonrası | S1 (KVKK) |
| 91 | Kulüp-tipi tenant AKTİF EDİLMEZ (avukat kısıtı) | 🔴 canlı-öncesi kısıt | S1 (KVKK) |
| 97 | FE hesap-kapatma/anonimleştirme akışı YOK | 🟡 madde 39 EK ŞART (PO 2026-08-26) | S1 (KVKK FE) |

### ⬜ AÇIK (v1-F analiz + SEO — 38-65 arası açık kalanlar)
| No | İş | Seviye |
|---|---|:---:|
| 41 | Kulüp modülü FE yok (backend tam) — ❓ PO özellik mi ölü mü | S1 (karar) |
| 42 | Feedback-logs modülü FE yok — ❓ PO | S1 (karar) |
| 43 | Kurum-içi şikayet inceleme FE yok (`/admin/reports`) | S2 |
| 44 | Kesin-ölü kod sil (llmRetry/TenantContext/MeetingScheduler) — PO onayı | S2 |
| 45 | Yarım-özellik ölü kod bağla (TenantSwitcher/ProfileStrength/sector-scorer…) | S2 |
| 46 | Kullanılmayan 5 `@radix-ui/*` paketi | S2 |
| 47 | Temiz-kod borcu (Zod validate() middleware, cookie helper duplike…) | S2 |
| 48 | DB perf (N+1 konuşma, pagination'sız listeler) | S2 |
| 49 | DB bütünlük (string→enum, çift-rol User.role vs Membership) | S1 (veri) |
| 50 | a11y noktasal (ReportUserButton modal, label, radiogroup) | S2 |
| 51-55 | SEO teknik (favicon/OG/metadataBase/sitemap/robots/lang tr-TR) | S2 |
| 56 | GTM+GA4+Clarity+GSC — KISMİ (kod var, merge/deploy yok; #110 kilitli) | S2 (KVKK bağlı) |
| 57-63 | Kurumsal sayfalar/footer/nav/scroll-top/WhatsApp/JSON-LD/semantik | S2 |
| 64 | WCAG 2.1 AA denetimi | S2 |
| 65 | Tema (büyük ölçüde mevcut) — teyit+parlatma | S2 |
| 67 | 🍪 Çerez-izni bandı (Consent Mode v2) — analytics ön-koşulu | S1 (KVKK) |

### ❓ TEYİT GEREK / KARAR (F.5 yeni + F.2 T-kodları)
| No | İş | Seviye |
|---|---|:---:|
| 71 (T3) | `SuspicionReport`'ta `tenantId` yok → tenant-izolasyon boşluğu | S1 (güvenlik) |
| 72 (T4) | Sertifika baraj "0 puan" yalnız isRedLine'da — tüm sorularda mı? | S1 (karar) |
| 73 (T5) | Güvenli sertifika seed runner (madde 30'u bloklar) | S1 (seed) |
| 74 (T6) | Mükerrer platform API konsolidasyon (super-admin/system-logs) | S2 |
| 75 (T7) | Mentör görünürlük opt-in FE (backend var) | S2 |
| 76 (T8) | Sıfırdan manuel eşleştirme: envanter "eksik" ↔ strateji "YASAK" ÇELİŞKİ | S1 (karar) |
| 77 (T9) | Platform tek-kullanıcı drill-down endpoint yok | S2 |
| 78 (T10) | Mentör emeği görünür kılma (takdir/rozet) | S2 |
| 81 | KVKK otomatik imha süreci yok (mesaj/FeedbackLog süresiz) | S1 (KVKK) |
| 82 | Rıza metni **sürümü** tutulmuyor (`consentVersion` yok) — ispat açığı | S1 (KVKK) |
| 83 | OAuth açık rıza UI'da alınmıyor + KVKK/18+ tek kutuda | S1 (KVKK/hukukçu) |
| 84 | `destek@` config'te tanımsız + FE hak-kullanım ekranı yok | S1 (KVKK) |
| 85 | Aydınlatma metni eksik kategoriler (mesaj/sosyal/OCEAN/SJT/phone) | S1 (KVKK) |
| 86 | `mentorVisibilityEnabled` ölü/bağlanmamış PLG alanı | S1 (ölü-kod) |
| 94 | `listPendingTenants` VIEW audit izi yok (düşük) | S2 |
| 98 | Kalibrasyon audit yazımı `void` (fire-and-forget) — iz kaybolabilir | S1 (KVKK denetim) |
| 99 | SystemLog 90 gün purge → "son değişiklik" izi 3 ay sonra kaybolur | S1 (KVKK/iz) |
| 100 | `SystemLog.meta.tenantId` JSON-yol sorgusu indekssiz (perf) | S2 |
| 101 | SJT/OCEAN katmanı canlı eşleştirmede OKUNMUYOR (bağlanmamış paralel) | S1 (eşleştirme) |
| 102 | CORE-eşiği tutarsızlığı (adaptiveTestEngine 5 ↔ questionService dinamik) | S1 (teyit) |
| 103 | Psikometrik gerekçe BELGELENMEMİŞ (uyum matrisi/ağırlık elle sabit) | S1 (kalite) |

### 🔵 v2 backlog (14-28 — hiç dokunulmadı)
14 sektör-skoru canlı bağlama · 15 eşleştirme birleştir · 16 tenant hard-delete (KVKK Md.7, migration) · 17 hayalet mod+CSV davet · 18 `VisibilityOptIn.requestMessage` DROP · 19 "neden uyumlu" Katman-2 · 20 mentör yaklaşım Katman-3 · 21 sektör kolonu · 22 landing UX+tema · 23 gerçek push (Expo/FCM stub) · 24 retention nudge cron · 25 privacy center UI+DISC ayrı rıza · 26 RLS lint · 27 staging ortamı · 28 ortam temizliği.

### Denetim işleri (Y1-Y7) + K-kodları
Y1 menti bekleme anı · Y2 ret yumuşatma+kutlama · Y3 yönetici rapor EXPORT+oran · Y4 proaktif kırmızı uyarı · Y5 mentör kapasite sınırı · Y6 global seed doğrulaması (❓veri) · Y7 platform büyüme metrik.
K3 eski-kayıt consent (⏸️ EN SON) · K6 admin server-side guard (⏸️ v2) · sektör/etiket havuzu (🔵❓ talep-onay) · K4-yaş-verisi (❓).

### 💀 Ölü kod / yarım bağlantı (9 kalem — C bölümü)
D1 `findMatchesDueForCheckpoint` (✅🔀 cron'a bağlandı, LOG-ONLY) · feedback şema alanları (`periodic*` yazılmıyor) · F5/F6 `ContextualFeedbackHost`/`MeetingProvider` (bağlanmadı) · F1 `getPairSignal` (✅ bağlandı) · D2 `llmRetry.ts` (❓terk) · D3 `UserProfile.qualityMultiplier` ikizi (❓DROP) · U1 `sector-scorer` (⏸️v2#14) · U2 `matchingInterface.ts` (⏸️şablon) · `maxMeetingsPerWeek` (❓enforce → madde 79 ile çözüldü).
+ C.2 (2026-08-23, 5 ajan): SJT psikometri akışı · taxonomy.service · Kulüp modülü · Feedback-logs · şikayet inceleme · admin rematch · profil-güç zinciri · TenantSwitcher · MeetingScheduler · `PATCH /users/me/social` · mükerrer platform uçlar · iceBreaker.ts.

---

## 2. ⭐ NUMARASIZ NİYETLER (düz metne gömülü — bu turun ASIL bulgusu)

> Numarası olmayan, tabloda olmayan, grep'le zor bulunan kararlar/niyetler. Şüphede EKLENDİ. Kaynak: dosya:satır.

| # | Kaynak (dosya:satır) | Niyet (tek cümle) | Durum |
|---|---|---|:---:|
| A1 | `00-KARAR-TAKIP.md:129` | **DISC-DERİNLEŞME kurgusu** — tek-seferlik DISC yerine kademeli karakter derinleşmesi; kullandıkça karakter kesinleşsin, sonra karşı tarafa nasıl yaklaşılacağı anlatılsın (numarasız, PO "yeni kurgu"; #31 ile birleşik) | 🔵❓ tasarım |
| A2 | `00-KARAR-TAKIP.md:129` | PO **TÜM soruları görmek** istiyor, sonra beğendiklerini/beğenmediklerini ayıracak | ⬜ AÇIK (PO işi) |
| A3 | `00-KARAR-TAKIP.md:129` | "Sınırsız-yeniden-derinleşme davranışı karara bağlanmalı" (her sefer discVector'ü değiştiriyor) | ❓ TEYİT/KARAR |
| A4 | `00-KARAR-TAKIP.md:132` | **İçerik & Soru Felsefesi keşfi** — tüm soruların içeriği+felsefesi+puanlaması çıkarılacak; #31/#13/#30/DISC-derinleşme buna bağlı, keşiften önce kodlanmayacak | ⬜ AÇIK (kısmen içerik turu yapıldı 2026-08-26) |
| A5 | `00-KARAR-TAKIP.md:133-135` | **BELGE YENİDEN YAPILANDIRMA turu (~68 belge)** — PO belge düzeninden memnun değil; klasör ayrımı+isim düzeltme+arşivleme+referans haritası+sadeleştirme (`admin-panelleri-tasarim` arşiv adayı) | ⬜ AÇIK (kısmen 2026-08-23 reorg yapıldı; bu bilanço turu onun parçası) |
| A6 | `00-KARAR-TAKIP.md:137-145` | **CANLI ÖNCESİ DENETİM LİSTESİ** — PO kontrol listesi tarif etti (SEO+yasal+uygulama-içi noindex+boş-durum+mail-testi+mobil+yedekleme+foto-volume+sunucu güvenliği); ayrı tur | ⬜ AÇIK |
| A7 | `00-KARAR-TAKIP.md:171` | #7 otomatik pasifleştirme: dernek **eşiği kendi girer**; özellik **varsayılan KAPALI** | 🔵 karar-alındı, kod bekliyor (Aşama 2) |
| A8 | `00-KARAR-TAKIP.md:68` | 2a ghost red = **30 GÜN UYKU MODU** — veriler hemen silinmez, 30 gün içinde geri alınabilir yoksa TAMAMEN silinir (PO geri-alınamazlığı onayladı); **cron gerekir** | 🔵 tasarım-hazır (madde 35) |
| A9 | `00-KARAR-TAKIP.md:79` | 9a: ağırlığı kurumun **TÜM yöneticileri** değiştirebilir; iz "son değişiklik: kim/ne zaman/eski→yeni"; aynı iz kalibrasyon onay/red için de tutulur | ✅ CANLIDA (9a/95) |
| A10 | `00-KARAR-TAKIP.md:240-242` | **🟡 OneDrive senkron riski** — repo OneDrive altında, `.git` senkronu bozulma+disk riski; aday: repoyu `C:\dev\`'e taşı; **PO kararı** | 🟡 AÇIK (PO kararı) |
| A11 | `00-KARAR-TAKIP.md:244-248` | **Etiket-gerçek çelişkisi** — `durum-panosu-2026-08-14` 🔄 ama 11 gün donmuş → 📸'ye düşürülmeli; +2 belge (tasarim-kararlari-admin, degerlendirme-metrik) tarihli-ad+🔄 → ad tarihsizleştirilmeli; **PO kararı** (bu tur TAŞINMADI) | 🟡 AÇIK (PO kararı — K5-soru 9) |
| A12 | `10-yol-haritasi.md:150` | 📌 GTM+GA4 yapısı **EN SON kontrol edilecek** (canlı deploy sonrası; çift-sayım/GSC/GA realtime); şimdilik dokunulmaz | ⏸️ ertelendi (PO) |
| A13 | `10-yol-haritasi.md:225` | "STK iki-aha modeli" + persona sunum fikirleri (ilk-aha/reddi-yumuşat/emeği-görünür) — teyit | ❓ TEYİT |
| A14 | `10-yol-haritasi.md:220-221` | F5 eşleşme hesaplama tetikleyicisi (event-driven mi sayfa-açılınca mı) + KARAR 6 otomatik onay (InvitationTemplate var, tetik yok) | ❓ keşif+PO |
| A15 | `10-yol-haritasi.md:223-224` | "Match DB'ye persist ediliyor mu" + öğrenme yolculuğu kalan uçları (DISC ton/STK düzenleme/içerik onayı/uçtan uca) — teyit | ❓ TEYİT |
| A16 | `10-yol-haritasi.md:227` | md.11 gereksiz tek-seçenekli dropdown — minor UI, güncel formda teyit | ❓ TEYİT (minor) |
| A17 | `00-CIKIS-PLANI.md:42` | KVKK metinleri **FE site-entegrasyonu PO kararıyla İPTAL** — avukata Word ile gidilecek, sayfalara gömme hukukçu onayı sonrasına ertelendi (silme yok) | ⏸️ ertelendi (PO kararı) |
| A18 | `00-CIKIS-PLANI.md:84` (K5-2) | **KVKK kalıcı silme: SİL mi ANONİMLEŞTİR mi** — PO kararı gerekti | ✅ ÇÖZÜLDÜ (PO: anonimleştir = madde 96 (c)) — ama çıkış-planı hâlâ soru olarak listeliyor ⚠️ (bkz. §3) |
| A19 | `00-CIKIS-PLANI.md:83` (K5-1) | **Çıkışta Google Analytics olsun mu?** EVET→#67+#56 K0'a yükselir; #110 bu karara bağlı | ❓ PO KARARI (açık) |
| A20 | `00-CIKIS-PLANI.md:92` (K5-10) | Bilinçli terk adayları (sil PO kararı): `MeetingScheduler.tsx`·`iceBreaker.ts`·`PATCH /users/me/social`·`/users/:id/self-profile` — terk mi bağlanacak mı | ❓ PO KARARI |
| A21 | `09-DURUM.md:322-324` | **Ertelenmiş teknik borç:** `VisibilityOptIn.requestMessage` şema kolonu duruyor (kod yazmıyor/okumuyor), DROP=migration→PO-onaylı ayrı tur (=madde 18) | 🔵 ertelendi |
| A22 | `09-DURUM.md:316-320` | **BEKLEYEN (PO elinde):** chat uçtan uca canlı test · foto volume doğrulama · mentör metrik canlı gözlem · repo PRIVATE | ⬜ (repo PRIVATE ✅ 2026-08-25; kalanlar açık) |
| A23 | `10-yol-tamamlananlar.md:9-11` | **Numaraları başka dosyaya taşımak referans ağını kırar** (belge-mimarisi #97 uyarısı) → maddeler numarasıyla yerinde kalır; A5 (belge reorg) turunda bu KISIT gözetilecek | 📌 kısıt-notu (kalıcı) |

**NUMARASIZ toplam: 23 kalem** (A1-A23). Bunların **~11'i açık iş/karar** (A1,A2,A3,A4,A5,A6,A10,A11,A19,A20 + A14/A15 teyit), **~5'i PO kararı bekliyor**, geri kalanı çözülmüş/kısıt-notu.

---

## 3. ⭐ ÇELİŞKİLER (belge ↔ belge; hakem OLMADIM, ikisini de yazdım)

| # | Çelişki | Belge 1 | Belge 2 | Not (hangisi yeni / kod) |
|---|---|---|---|---|
| Ç1 | **madde 39 (G2) durumu** | `00-KARAR-TAKIP.md:299` "F.1'de açık" + `00-CIKIS-PLANI.md:40` K0 "madde 39 açık, Tur-3 migration" | `00-KARAR-TAKIP.md:264` (G2) + `10-yol-tamamlananlar.md:45` "✅ CANLIDA #54" + `09-DURUM.md:8` "93/39 TAM" | **Kod/yeni kazanır: 39 = ✅ CANLIDA** (2026-08-26, #54 anonymize'e yönlendirme). ÇIKIŞ-PLANI + KARAR-TAKIP:299 **bayat** — 39'u hâlâ K0 açık gösteriyor. → düzeltme adayı |
| Ç2 | **K5-soru 2 (sil mi anonimleştir mi)** | `00-CIKIS-PLANI.md:84` hâlâ **açık soru** olarak listeli | `00-KARAR-TAKIP.md:289` (96) "PO KARARI 1·1·1=(c)" = anonimleştir, CANLIDA | **Çözüldü (anonimleştir);** çıkış-planı bayat. → düzeltme adayı |
| Ç3 | **DISC soru sayısı canlıda** | `09-DURUM.md:130` "DISC soruları (20) yüklü" (TEK BAKIŞTA, eski katman) | `00-KARAR-TAKIP.md:66` "**DISC=32** (kod), belge 20=silinmiş seed-questions.ts" | **Kod: seed.ts=32 üretir; canlıda ~20 (seed↔canlı tutarsızlığı, madde 33).** 09-DURUM:130 satırı eski snapshot; canlı sayı ⏳ TEYİT GEREK (DB) |
| Ç4 | **SJT soru sayısı** | `konu/03-psikometri:47` "4 SJT" (belge) | `00-KARAR-TAKIP.md:66` + `09-DURUM.md:215` "**kod 3**, belge hizalandı" | **Kod: 3.** Belge 03 satır 47 hâlâ "4" diyorsa bayat (Grup B'de teyit edilecek) |
| Ç5 | **madde 76 (T8) manuel eşleştirme** | envanter "manuel eşleştirme eksik" (`stk-panel-envanteri:71,148`) | strateji "elle eşleştirme YASAK" (`stk-strateji:67`) | **Kayıtlı çelişki — PO kararı** (K5-soru 8). İkisi de canonical'da işaretli, çözülmemiş |
| Ç6 | **Sunucu ülkesi** | eski metinler "İrlanda/AB, eu-west-2" (`09-DURUM.md:255` K5 eski satır) | `00-KARAR-TAKIP.md:280` (92) "**Londra/BK, eu-west-2=Londra**, AB DEĞİL; İrlanda hatalıydı" | **Çözüldü: Londra/BK** (PO teyitli 2026-08-26). Eski "İrlanda" satırları (09-DURUM:255, CLAUDE.md env notu) bayat |

**Çelişki toplam: 6.** Ç1/Ç2/Ç6 = **bayat-not adayı** (yeni gerçek belgeye işlenmemiş eski satır kaldı) · Ç3/Ç4 = **canlı sayı teyidi bekliyor** (DB) · Ç5 = **açık PO kararı**.

---

## 4. ⭐ HAYALET TAMAMLANMIŞ ADAYLARI (belge "açık" diyor, kod/PR "yapıldı")

> Canonical belgeler zaten kod-doğrulamalı olduğundan az; bulunanlar §3 çelişkileriyle örtüşür.

| # | Kalem | "Açık" diyen | "Yapıldı" kanıtı |
|---|---|---|---|
| H1 | madde 39 (KVKK hardDelete silme) | `00-CIKIS-PLANI.md:40` K0 açık; `KARAR-TAKIP:299` | ✅ #54 CANLIDA (anonymize'e yönlendirme) — bkz. Ç1 |
| H2 | K5-soru 2 (sil/anonimleştir kararı) | `00-CIKIS-PLANI.md:84` soru | ✅ PO kararı verildi (madde 96) — bkz. Ç2 |
| H3 | Repo PRIVATE | `00-CIKIS-PLANI.md:41` K0 "yap"; `09-DURUM.md:320` BEKLEYEN | ✅ 2026-08-25 PO yaptı (`KARAR-TAKIP:149`) — çıkış-planı+09-DURUM:320 bayat |

**Hayalet toplam: 3** (hepsi §3 ile bağlı; canonical belge güncellemesi geride kalmış).

---

## 5. SEVİYE-1 KOD KANITI DURUMU (Grup A kalemleri)

> S1 = güvenlik/KVKK/DB/eşleştirme/kimlik. Kod kanıtı ZORUNLU. Canonical belgeler dosya:satır kanıtı VERMİŞ →
> bu turda kod DOĞRUDAN açılmadı (Grup A referans-okuma turu); belgede beyan edilen kanıt-satırları Grup B'de ve
> sonraki turlarda örneklemle doğrulanabilir. Burada **kanıtı canonical'da EKSİK/❓ kalan** S1 kalemler:

- **101** (SJT/OCEAN canlı eşleştirmede okunmuyor) — belge `scoring.ts:163-166` yorumu + grep diyor; **⏳ canlı davranış teyidi** açık.
- **102** (CORE-eşiği tutarsızlığı) — hangi FE ekranı hangi ilerlemeyi gösteriyor **⏳ TEYİT GEREK (FE)**.
- **86** (`mentorVisibilityEnabled` ölü alan) — bilinçli mi yarım mı **❓ PO** (kanıt var, karar yok).
- **72** (sertifika baraj 0-puan kuralı) — "tüm sorularda mı" **verilmemiş karar**.
- Ç3/Ç4 (DISC 32/20, SJT 3) — **canlı DB sayısı ⏳ TEYİT GEREK** (bu tur DB'ye sorulmadı, kural).

> Not: Bu turda DB'ye HİÇBİR sorgu yapılmadı (sınır). Canlı-sayı teyitleri sonraki (DB-onaylı) tura kalır.

---

## KAPANIŞ NOTU (Grup A)
- **6/6 belge TAM okundu**, okunmayan 0.
- Numaralı envanter: **~103 madde** + K/Y/T/G kodları + 9+ ölü-kod kalemi. Durum dağılımı canonical'da beyan edilmiş
  (yaklaşık: ✅ ~28 · ⬜ AÇIK ~30 · ❓/karar ~25 · 🔵 v2 ~15).
- **⭐ NUMARASIZ niyet: 23 kalem** (A1-A23) — bu turun ana çıktısı.
- **⭐ Çelişki: 6** (Ç1-Ç6; 3'ü bayat-not adayı, 2'si canlı-sayı teyidi, 1'i açık PO kararı).
- **⭐ Hayalet-tamamlanmış: 3** (H1-H3; canonical güncellemesi geride kalmış — çıkış-planı en bayat).
- **En çarpıcı gerçek:** `00-CIKIS-PLANI.md` (2026-08-25 güncel) madde 39 + K5-soru 2 + repo-private konularında
  **2026-08-26 kararlarından habersiz** → çıkış-planı, canonical takip belgeleri arasında **en bayat olanı**.
- DB'ye dokunulmadı, kod değiştirilmedi, PR açılmadı, numara doğurulmadı.
