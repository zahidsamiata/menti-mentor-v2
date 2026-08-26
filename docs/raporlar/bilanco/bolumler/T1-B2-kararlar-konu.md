# BELGE BİLANÇOSU — TUR 1 / GRUP B2 (kararlar/konu — 13 belge)

**📸 DONDURULMUŞ** (bilanço bölümü — 2026-08-26) · Tur 1/GRUP-B2 · Salt-okuma defter

> **Ne bu:** `docs/kararlar/konu/` altındaki 13 belgenin BAŞTAN-SONA (tam) okuma-defteri. Her karar/iş/niyet
> kalemi tek satır. Çapraz-kontrol referansı: `T1-A-canonical.md` (numaralı envanter + A1-A23 numarasız + Ç1-Ç6 çelişki).
> Numara DOĞURULMADI (yalnız mevcut numaralar). Kod salt-okundu (SJT sayısı + DISC görünürlük teyidi); DEĞİŞTİRİLMEDİ.
> `kvkk-metinleri/` klasörüne GİRİLMEDİ (kural).

---

## 0. OKUMA İLERLEME TABLOSU

| belge | satır | okundu | bulunan kalem |
|---|:---:|:---:|:---:|
| `01-urun-vizyonu.md` | 37 | ✅ TAM | 8 |
| `02-mimari-ve-altyapi.md` | 57 | ✅ TAM | 10 |
| `03-psikometri-ve-algoritma.md` | 64 | ✅ TAM | 12 |
| `04-guvenlik-ve-kvkk.md` | 68 | ✅ TAM | 14 |
| `05-ozellikler-ve-paneller.md` | 60 | ✅ TAM | 13 |
| `06-tasarim-ux.md` | 63 | ✅ TAM | 16 |
| `07-calisma-tarzi.md` | 57 | ✅ TAM | 4 |
| `08-acik-sorular.md` | 57 | ✅ TAM | 21 |
| `11-tasarim-kararlari-yasam-dongusu-ve-disc.md` | 148 | ✅ TAM | 8 |
| `belge-duzeni-rehberi.md` | 106 | ✅ TAM | 9 |
| `chat-v1-teslim.md` | 72 | ✅ TAM | 9 |
| `degerlendirme-metrik-sistemi-tasarim-2026-08-19.md` | 232 | ✅ TAM | 20 |
| `tasarim-kararlari-admin-2026-08-11.md` | 133 | ✅ TAM | 12 |

**Toplam: 13/13 belge TAM okundu. Okunmayan: 0. Toplam kalem: 156.**

> **En çok karar içeren:** `degerlendirme-metrik-sistemi-tasarim-2026-08-19.md` (#7 vizyonu, 11 akış adımı + 4 kod-gerçeği bloğu
> + 6 PO-açık-nokta) ve `tasarim-kararlari-admin-2026-08-11.md` (12 KARAR). Sonra `08-acik-sorular.md` (zaten açık-soru listesi, 21 kalem).

---

## 1. DEFTER — belge belge (her kalem tek satır)

**DURUM kodları:** ✅ YAPILDI · 🔀 PR'DA · ⬜ AÇIK · ❓ TEYİT GEREK · 🗑️ GEÇERSİZ ADAYI

### 01 — Ürün Vizyonu

| kaynak | kalem | numara | durum | not/kanıt |
|---|---|---|:---:|---|
| 01:15-16 | Şimdilik tamamen ücretsiz, ileride premium (freemium) — çekirdek sonsuza dek ücretsiz | NUMARASIZ | ⬜ AÇIK | vizyon/iş-modeli kararı; kod işi değil |
| 01:18 | Premium (white-label/analitik/ROI) baştan "kilitli görünür" tutulacak | NUMARASIZ | ⬜ AÇIK | uygulanmadı beyanı |
| 01:19 | Tenant seviyesinde plan/limit altyapısı (`Tenant.plan`/`limits`, herkes `FREE_UNLIMITED`) bugünden kodlanmalı | NUMARASIZ | ❓ TEYİT GEREK | belge "⏳ uygulanmadı" diyor; kodda alan var mı teyit gerek (S1-veri değil, ürün-altyapı) |
| 01:23 | Modül sırası: Mentörlük→Kurumsal hafıza→Sponsorluk→Belgelendirme→Ağ→Etkinlik | NUMARASIZ | ⬜ AÇIK | vizyon sırası (v2+ modüller) |
| 01:27 | Erasmus İPTAL — kâr amacı gütmeyen sosyal girişim modeli | NUMARASIZ | ✅ YAPILDI | karar kesinleşmiş (🔄 iptal işaretli) |
| 01:31 | Gelir/sürdürülebilirlik kanalı (sponsor/partnerlik/hibe/bağış) belirsiz | NUMARASIZ | ❓ TEYİT GEREK | MVP sonrası; =08:17 kopyası |
| 01:32-33 | Pilot kulüp/üniversite hangisi + alt-ürün adlandırma detayı | NUMARASIZ | ⬜ AÇIK | =08:18-19 kopyası |
| 01:36 | "UniClub" eski çatı ismi geçersiz → Sivilkapasite | NUMARASIZ | ✅ YAPILDI | çelişki-notu, çözülmüş |

### 02 — Mimari ve Altyapı

| kaynak | kalem | numara | durum | not/kanıt |
|---|---|---|:---:|---|
| 02:8-10 | Canlı = lokal AYNI Neon DB (`ep-fancy-tooth-ab4u5xhr`) — lokal yazım canlıyı etkiler | NUMARASIZ | ✅ YAPILDI (kural) | kalıcı kritik kural, CLAUDE.md'de de var; güncel |
| 02:14-17 | Tehlikeli seed (`prisma/seed.ts` deleteMany) ASLA çalıştırma; güvenli liste güncellendi | NUMARASIZ | ✅ YAPILDI (kural) | 2026-08-23 güncellemesi kod-kanıtlı (seed-questions.ts silindi) |
| 02:19-22 | Neon migration kuralı: `IF NOT EXISTS`+`db execute`+`migrate resolve`; `db push` YASAK | NUMARASIZ | ✅ YAPILDI (kural) | kalıcı kural |
| 02:27 | Next.js sürüm çelişkisi (14.2.35 vs 15.5.20) — güncel 15.5.20 doğrulandı | NUMARASIZ | ✅ YAPILDI | 2026-08-14 package.json ile doğrulanmış; =08:41 |
| 02:33 | Autodeploy AÇIK ama env değişikliği manuel redeploy ister | NUMARASIZ | ✅ YAPILDI (kural) | altyapı gerçeği |
| 02:38-40 | Mail=Resend (Gmail SMTP kırık), key rotasyonu yapıldı | NUMARASIZ | ✅ YAPILDI | çözülmüş; =04:61 |
| 02:43-45 | Barındırma: Neon+Dokploy kaldı (VPS/PaaS tartışması aşıldı) | NUMARASIZ | ✅ YAPILDI | çelişki çözülmüş |
| 02:48-49 | JSON alan guard + Neon pool retry (teknik risk) | NUMARASIZ | ❓ TEYİT GEREK | =04:39 P1; kod-teyit gerek |
| 02:50 | Rate limiter in-memory → çok instance'ta Redis'e taşınmalı | NUMARASIZ | ⬜ AÇIK | teknik borç; T1-A ölü-kod/borç ile örtüşmez, ayrı |
| 02:51 | `certified/qualityMultiplier` UserProfile→TenantMembership taşındı; eski kod eski yerden okuyor olabilir | NUMARASIZ | ❓ TEYİT GEREK | S1-veri; T1-A madde 9b/87 (`computeTotalScore` ops.ağırlık) ile ilişkili — okuma kaynağı teyit gerek |

### 03 — Psikometri ve Algoritma (yoğun)

| kaynak | kalem | numara | durum | not/kanıt |
|---|---|---|:---:|---|
| 03:9-11 | DISC görünür + OCEAN motor; adapter (`disc-to-ocean.adapter.ts`) | NUMARASIZ | ✅ YAPILDI | 🟢✅ işaretli |
| 03:13-16 | 8 arketip (4 mentör + 4 menti) | NUMARASIZ | ✅ YAPILDI | 🟢✅ |
| 03:19-21 | Eşleşme formülü (Sektör×0.60 + Mizaç×0.40)×qualityMultiplier | NUMARASIZ | ✅ YAPILDI | T1-A madde 9 (%60/%40 kartı ✅); `scoring.service.ts` |
| 03:23-28 | Hard-gate toksik blok (M4-m3 veto, D-mentör+S-menti bloklu); yönetici eşiği ≠ hard-gate | NUMARASIZ | ✅ YAPILDI | 🟢✅; `BLOCKED_PAIRS`; S1 ama belge kanıt-satırı veriyor |
| 03:30-36 | SJT senaryo-bazlı (Likert reddedildi), CORE Single-Select + FOLLOWUP Most/Least; CAT/IRT reddi | NUMARASIZ | ✅ YAPILDI | 🟢✅; `sjt-scorer.ts`, `answerFormat` enum |
| 03:38-42 | Sektör skoru reçetesi (5 alt-metrik %30/25/25/15/5) — kod YAZILMADI, stub nötr 50 döner | NUMARASIZ | ⬜ AÇIK | ⏳ kod bekliyor; T1-A madde 14 (v2 sektör-scorer) + U1 ölü-kod ile örtüşür |
| 03:44-46 | Mentörlük yetkinliği 5 boyut + "Önce Eğit Sonra Kalibre Et" | NUMARASIZ | ✅ YAPILDI | 🟢✅; `certification.service.ts` |
| **03:47-48** | **Mini Akademi 4 modül + 4 SJT — KOD GERÇEĞİ = 3 SJT** ("4" tasarım niyeti) | NUMARASIZ | ⬜ AÇIK (PO) | **ÇELİŞKİ (T1-A Ç4). KOD DOĞRULADIM: `seed.ts:530` SJT_QUESTIONS = 3 giriş (Q_MENTOR_CORE_01/Q_MENTI_CORE_01/Q_MENTI_FOLLOWUP_N_01). Belge içi ⚠️ notu 3 diyor; satır 47 gövde hâlâ "4" → içerik genişletme #33/PO** |
| 03:49-50 | Baraj 65 + kırmızı-çizgi (isRedLine 0 puan) + 24s cooldown; PASS_THRESHOLD=65 | NUMARASIZ | ✅ YAPILDI | `certification.service.ts`, CERT_CONFIG |
| 03:52-55 | Progressive profiling + kademeli fallback (`{items:[],fallbackLevel}` throw etmez) + geri bildirim döngüsü ±%20 | NUMARASIZ | ✅ YAPILDI | 🟢✅ [P0 güvenlik] |
| 03:57-59 | Multi-tenant kimlik: User global, TenantMembership pivot, Match tenant-scoped | NUMARASIZ | ✅ YAPILDI | 🟢; `@@unique([userId,tenantId])` |
| 03:62-64 | AÇIK: sektör ağırlıkları nihai mi + tetikleyici event/sayfa + baraj-0 tüm sorular mı | NUMARASIZ | ❓ TEYİT GEREK | =08:23-25; T1-A madde 72 (baraj) + A14 (tetikleyici) |

### 04 — Güvenlik ve KVKK (yoğun, SEVİYE-1)

| kaynak | kalem | numara | durum | not/kanıt |
|---|---|---|:---:|---|
| 04:6 | ⚠️ üst-not: IDOR "2 açık" DEĞİL kod korumalı; K2/K4/K5 CANLIDA; kalan K3+K6 | NUMARASIZ | ✅ YAPILDI (not) | 2026-08-23 güncel; T1-A madde 2/3/4 (K2/K4/K5 ✅) |
| 04:19-22 | Multi-tenant: X-Tenant-Id tek başına güvenilmez, (id+tenantId) filtre, 5-katmanlı requireTenant + RLS | NUMARASIZ | ✅ YAPILDI | S1; belge "repo-inceleme'de görüldü" der |
| 04:22 | RLS `findUnique`'i filtrelemiyor → gelecekte sessiz sızıntı tuzağı; lint kuralı önerildi | NUMARASIZ | ❓ TEYİT GEREK | S1; T1-A madde 26 (RLS lint, v2) ile örtüşür |
| 04:25-26 | Çift-tenant kimlik: profil/rol/sertifika `(userId,tenantId)` ile; eski kod UserProfile'dan okuyorsa yanlış | NUMARASIZ | ❓ TEYİT GEREK | S1; =02:51; okuma kaynağı teyit gerek |
| 04:31-35 | 2 IDOR (`/mentors/:mentorId/candidates` + `/requests/:id`) — **✅ 2026-08-14 KORUMALI kanıtlandı** | NUMARASIZ | ✅ YAPILDI | S1; `161ae00`; `matchingController.ts:45-52`,`requestController.ts:116-121`; "⏳ DÜZELTİLMEDİ" satırı BAYAT (belge içi işaretli) |
| 04:38 | DISC matematik edge-case guard (sıfıra bölme/NaN, `deriveArchetype` undefined dönmez) | NUMARASIZ | ❓ TEYİT GEREK | P1; kod-teyit gerek |
| 04:39 | JSON alan guard'ları (limits/blockedPairs Array.isArray/Zod) | NUMARASIZ | ❓ TEYİT GEREK | P1; =02:48 |
| 04:40 | Kural paneli hardening (clamp, blockedPairs Zod self-block reddi, tenantId payload'dan alınmaz) | NUMARASIZ | ❓ TEYİT GEREK | P1; kod-teyit gerek |
| 04:41 | Next.js tenant cache zehirlenmesi (queryKey'e tenantId) | NUMARASIZ | ❓ TEYİT GEREK | P1 |
| 04:44-48 | KVKK: DISC ham profil ASLA dönmez, super-admin agregat-only, audit log (VIEW_TENANT_MEMBERS), bloklama sessiz | NUMARASIZ | ✅ YAPILDI | S1; discVisibility.ts KANITLANDI (kod mevcut); 🟢 |
| 04:51 | Privacy center UI + DISC ayrı rıza + Meeting/Feedback FK nullable + 18+ (canlı-öncesi blocker) | NUMARASIZ | ⬜ AÇIK | S1; T1-A madde 40 (KVKK FE üçlü) + 25 (privacy center v2) + 83 |
| 04:52 | Açık sorulara bağlı: yaş politikası + veri sorumlusu + sunucu konumu | NUMARASIZ | ❓ TEYİT GEREK | K5 sunucu ✅ (madde 92 Londra); yaş+sorumlu açık (=08:11-12) |
| 04:54-57 | Sunucu/altyapı güvenliği HİÇ ele alınmadı (Dokploy HTTP, firewall/SSH/SSL/yedek) + repo PRIVATE | NUMARASIZ | ⬜ AÇIK | repo PRIVATE ✅ 2026-08-25 (T1-A A22/H3); altyapı-sertleştirme AÇIK; T1-A A6 canlı-öncesi denetim |
| 04:64-68 | Öncelik sırası (P0/P1/P2) — kullanıcı tek tek onaylamadı | NUMARASIZ | ❓ TEYİT GEREK | asistan tavsiyesi, PO onayı yok |

### 05 — Özellikler ve Paneller

| kaynak | kalem | numara | durum | not/kanıt |
|---|---|---|:---:|---|
| 05:6-13 | Platform admin paneli Kapsam B (KpiCards/MembersTable/MeetingsTable/DiscSummary) — kodlandı | NUMARASIZ | ✅ YAPILDI | 🟢✅ "merge edilmedi" beyanı eski; backend PR#26+FE#29 |
| 05:10 | Mentör/menti sayımı `TenantMembership.role` (User.role DEĞİL) | NUMARASIZ | ✅ YAPILDI | CLAUDE.md veri-modeli kuralıyla uyumlu |
| 05:15-22 | 5 admin paneli (A1 eşleşme/A2 mentör/A3 menti/A4 sertifika/A7 branding) — PR#32/#26 | NUMARASIZ | ✅ YAPILDI | ✅ işaretli; A1 Match persist `scoring.service.ts:137` |
| 05:20 | Match DB'ye persist ediliyor (scoring.service.ts:137) | NUMARASIZ | ✅ YAPILDI | T1-A A15 "match persist mi" teyit sorusuyla ilişkili — burada ✅ beyan |
| 05:24-28 | Takvim/feedback (Availability+Meeting) + bağlamsal feedback + timezone bug **✅ DÜZELTİLDİ** | NUMARASIZ | ✅ YAPILDI | `6a30f21`; "⏳ düzeltilmedi" BAYAT (belge içi işaretli); =08:27 |
| 05:31-34 | Öğrenme yolculuğu (learningJourney.service.ts) puanlama YOK=bilinçli; 13 aşama; ADMIN göremez | NUMARASIZ | ✅ YAPILDI | seed'lendi; T1-A madde 34 (STK admin görünürlüğü ✅) |
| 05:36-38 | DISC soru görüntüleme (A8) — kod sağlam, 20 soru yüklendi, kullanıcı teyit edecek ⏳ | NUMARASIZ | ❓ TEYİT GEREK | canlı sayı teyidi (T1-A Ç3 DISC 32/20) |
| 05:40-43 | Onboarding Çift-Aha + self-serve şablon + üye akışı (davet linki tenantId+rol) | NUMARASIZ | ⬜ AÇIK | 🟢 tasarım; =06:57 |
| 05:45-48 | 4-aktör panel + 4 KPI + Erken Uyarı (Aktif/Kapasite/Süre/NPS) | NUMARASIZ | ⬜ AÇIK | tasarım; health-metrics kısmen (08:50) |
| 05:51-52 | Panel PR (#26/#29) merge + sertifika/öğrenme uçtan uca test | NUMARASIZ | ❓ TEYİT GEREK | test bekliyor beyanı (eski) |
| 05:53 | Onay bildirimi maili (kurum onaylanınca başvurana gidiyor mu belirsiz) | NUMARASIZ | ⬜ AÇIK | T1-A madde 6 (kurum onay maili 🟡 açık); =08:36 |
| 05:54 | Yöneticilik verme akışı (A9) YENİDEN KURGULANACAK — kod öncesi PO'ya sorulacak (söz verildi) | NUMARASIZ | ⬜ AÇIK | T1-A A9 (9a ✅ ama A9 kurgu ayrı); =08:31 |
| 05:55 | Geri bildirim mekanizması: her sayfada "hata/öneri bildir"→mail; takip sistemi yok | NUMARASIZ | ⬜ AÇIK | tasarım niyeti |

### 06 — Tasarım ve UX

| kaynak | kalem | numara | durum | not/kanıt |
|---|---|---|:---:|---|
| 06:6 | Tema toggle var (PR#32: .dark/ThemeProvider/localStorage/FOUC/ThemeToggle) | NUMARASIZ | ✅ YAPILDI | 🟢✅; T1-A madde 5 (ThemeToggle ✅) |
| 06:7-11 | Landing dark/light CANLI-SONRASINA ERTELENDİ; şimdilik landing DARK; metodoloji sayfası koyu | NUMARASIZ | ⬜ AÇIK | ⏸️ ertelendi; ~256 hardcoded nokta; T1-A madde 22 (landing UX v2) |
| 06:12 | Yumuşak lacivert landing yönü — uygulanmadı ⏳ | NUMARASIZ | ⬜ AÇIK | 🟢⏳ |
| 06:13 | M² logo dokunulmayacak (beğenildi) | NUMARASIZ | ✅ YAPILDI | 🟢 karar |
| 06:16 (D21) | Toggle admin/platform nav'a eklenmeli — **✅ TAMAMLANDI** (`188aad5`) | D21 | ✅ YAPILDI | T1-A madde 5 |
| 06:17 (D22) | DISC renkleri light'ta WCAG FAIL (1.8-3.9:1) — 5 dosya ~7 renk 600/700'e | D22 | ⬜ AÇIK | T1-A madde 51-55/64 (SEO/WCAG) ile ilişkili; a11y borcu |
| 06:18 (D23) | Platform admin rozetleri light'ta koyu leke — light varyant gerekli | D23 | ⬜ AÇIK | a11y/tema borcu |
| 06:19 | 🔴 DISC renk TON kararı PO gözünden verilecek — light onaylanmadı | NUMARASIZ | ❓ TEYİT GEREK | PO kararı; =08:47 |
| 06:22-23 | Slogan değişikliği (yeni H1 + alt metin) — karar verildi, uygulanmadı ⏳ | NUMARASIZ | ⬜ AÇIK | 🟢⏳ |
| 06:24 | Landing UX paketi (tooltip/hover köprü/link tıklanamıyor/"i" ikonu/kontrast/sıfır-etikette skor çelişkisi/mobil) | NUMARASIZ | ⬜ AÇIK | ⏳ kodlanmadı; AlgorithmBento mantık hatası öncelikli; T1-A madde 22 |
| 06:26-40 | Menti/mentör havuzu KART tasarımı (görsel kart, foto+isim+rol+DISC rozeti+etiket+%UYUM+aksiyon; rating YOK) | NUMARASIZ | ⬜ AÇIK | ⏳ tasarlanacak; backend %90 hazır; admin-11:KARAR 2 ile aynı |
| 06:33 | Kartta gösterilmeyecek: deneyim/sosyal link/müsaitlik (detayda koşullu) | NUMARASIZ | ⬜ AÇIK | kart tasarımı detayı |
| 06:34 | Grid+sayfalama ~15-18 kart (kesin sayı açık soru); 3/2/1 sütun | NUMARASIZ | ❓ TEYİT GEREK | =08:46 sayfa-başı sayı açık |
| 06:39 | Fotoğraf herkesten istenecek, şimdilik opsiyonel, ileride zorunlu | NUMARASIZ | ⬜ AÇIK | =08:44 zorunluluk tarihi belirsiz |
| 06:46-49 | Mesajlaşma ŞİMDİLİK YOK — yalnız niyet mektubu; ileride matched sınırlı DM belki | NUMARASIZ | ⬜ AÇIK | karar (v1 kapsam dışı); chat-v1 ile ilişki (chat-v1 = talep mesajlaşma, serbest DM değil) |
| 06:52-60 | UX iyileştirme: sol menü tipografi + sayfa açıklama metinleri + soru-ekleme dropdown Türkçeleştir + kayıt akışı basitleştirme | NUMARASIZ | ⬜ AÇIK | ⏳; KARAR 4 (FE tam Türkçe) ile örtüşür; =06:54 dropdown İngilizce |

### 07 — Çalışma Tarzı ve Prompt Felsefesi

| kaynak | kalem | numara | durum | not/kanıt |
|---|---|---|:---:|---|
| 07:8-16 | Prompt standardı 8 unsur (büyük resim/mod/devsecops/paralellik/durak/teyit/hata/kapanış) | NUMARASIZ | ✅ YAPILDI (kural) | çalışma disiplini; CLAUDE.md ile uyumlu |
| 07:25-37 | DevSecOps katman şablonu K0-K10 | NUMARASIZ | ✅ YAPILDI (kural) | kalıcı şablon |
| 07:40-41 | Model: standart Sonnet yeterli, 1M gerekmez; doküman .md olarak referansla | NUMARASIZ | ⬜ AÇIK (not) | çalışma-tercihi; CLAUDE.md model-yönlendirme ile kısmen çelişebilir (Sonnet/Opus ayrımı) — teyit |
| 07:44-58 | Hafıza sistemi + doküman tonu + kanıtlanmış dersler (SHA tahmin etme, önce teşhis) | NUMARASIZ | ✅ YAPILDI (kural) | disiplin notları |

### 08 — Açık Sorular (zaten açık-karar listesi)

| kaynak | kalem | numara | durum | not/kanıt |
|---|---|---|:---:|---|
| 08:6 | ⚠️ üst-not: K2/K4/K5 CANLIDA; canonical açık-karar artık 00-KARAR-TAKIP | NUMARASIZ | ✅ YAPILDI (not) | 2026-08-23; bu belge kısmen bayat işaretli |
| 08:11 | Yaş politikası 18+ mı gençler mi (veli izni) — NET KARAR YOK; Koşullar 18+ ama ürün genç hedefliyor | NUMARASIZ | ❓ TEYİT GEREK | S1-KVKK; T1-A madde 91/83 ilişkili; ÇELİŞKİ (metin 18+ ↔ hedef genç) |
| 08:12 | Veri sorumlusu kimliği (şahıs/şirket/dernek) belirsiz | NUMARASIZ | ❓ TEYİT GEREK | S1-KVKK; PO "bilmiyorum" dedi |
| 08:13 | Sunucu konumu beyanı (Neon=? Hostinger=?) | NUMARASIZ | ✅ YAPILDI | T1-A madde 92 (Londra/BK, PO teyitli 2026-08-26); bu satır BAYAT (hâlâ "?") |
| 08:14 | Yasal metin incelemesi hukukçu şart (DISC hassas veriye yakın) | NUMARASIZ | ⬜ AÇIK | S1-KVKK; T1-A A17 (KVKK FE avukata Word ile) |
| 08:17 | Gelir modeli kanalı | NUMARASIZ | ❓ TEYİT GEREK | =01:31 |
| 08:18 | Pilot kulüp/üniversite | NUMARASIZ | ⬜ AÇIK | =01:32 |
| 08:19 | Alt-ürün adlandırma (MentiMentor mu) | NUMARASIZ | ⬜ AÇIK | 🟡; =01:33 |
| 08:20 | Modül önceliklendirme onayı — PO açıkça onaylamadı | NUMARASIZ | ❓ TEYİT GEREK | ⚪ |
| 08:23 | Sektör ağırlıkları (30/25/25/15/5) nihai mi | NUMARASIZ | ❓ TEYİT GEREK | =03:62 |
| 08:24 | Eşleşme tetikleyicisi event/sayfa-açılınca | NUMARASIZ | ❓ TEYİT GEREK | T1-A A14; =03:63 |
| 08:25 | Baraj-0 kuralı tüm sorular mı isRedLine mı | NUMARASIZ | ❓ TEYİT GEREK | T1-A madde 72; =03:64 |
| 08:26 | Format enum uyumsuzluğu (frontend "online" vs Prisma "ONLINE") — doğrulanmadı | NUMARASIZ | ❓ TEYİT GEREK | potansiyel bug |
| 08:27 | ~~timezone bug~~ ✅ ÇÖZÜLDÜ (`6a30f21`) | NUMARASIZ | ✅ YAPILDI | =05:28 |
| 08:28 | Çarpan vs hard-gate yumuşaması (P5) karara bağlanmadı | NUMARASIZ | ❓ TEYİT GEREK | ❓ |
| 08:31 | Yöneticilik verme akışı (A9) yeniden kurgulanacak; promote-admin var max 3, liste eksik | NUMARASIZ | ⬜ AÇIK | =05:54; T1-A A9 |
| 08:32 | Sertifika soru ekleme yönetici mi bilinçli kısıt mı | NUMARASIZ | ❓ TEYİT GEREK | =05:58 |
| 08:33 | DISC/sektör dağılım oranı ayarı (A6) hardcoded, büyük iş, yapılacak mı | NUMARASIZ | ❓ TEYİT GEREK | =05:59 |
| 08:34 | Etiket ekleme yönetici doğrudan mı (öneri beklemeden) | NUMARASIZ | ❓ TEYİT GEREK | admin-11:KARAR 12 (havuz onaydan geçer) ile ilişkili; kod durumu belirsiz |
| 08:35 | Arkadaşın başvurusu: canlıdan kaydoldu panelde görünmedi — çözülmedi, GERÇEK KİŞİ bekliyor | NUMARASIZ | ⬜ AÇIK | ⏳ b3 membership backfill; =05:60 |
| 08:36 | Onay bildirimi maili kurum onaylanınca gidiyor mu | NUMARASIZ | ⬜ AÇIK | =05:53; T1-A madde 6 |

> **Not (08 devamı — altyapı/kart/retention blokları):** 08:39-53 arası ek açık sorular T1-A ve yukarıdaki satırlarla örtüşür:
> AnsweredFollowup tablosu (❓opsiyonel) · izole test DB kalıcı (⏳) · Next sürüm (✅ çözüldü) · foto zorunluluk (=06:39) ·
> kart DISC gösterim harf/renk (❓ =06:34) · sayfa-başı kart sayısı (❓) · DISC renk ton light (❓ =06:19) ·
> yönetici çekirdek metrik health-metrics YAPILDI/genişletme açık · otomatik-nudge ERTELENDİ (rıza) · pasif/ölü eşiği ·
> üç-taraf gerçek görüşme ⚪. Hepsi ⬜/❓; ayrı satır şişmesin diye burada topluca — her biri 08 içinde açık işaretli.

### 11 — Yaşam Döngüsü & DISC Gösterimi (yoğun — KARAR 1-4)

| kaynak | kalem | numara | durum | not/kanıt |
|---|---|---|:---:|---|
| 11:20-49 | KARAR 1 — DISC ikincil/çoklu harf (midline + saf-stil istisnası + güçten-zayıfa + BÜYÜK/küçük yakınlık) | KARAR 1 (#12=md.4) | ✅ YAPILDI | T1-A madde 12 (DISC "DI" ✅ #47+#93+#94; `DISC_LETTER_CONFIG`/`discLetters.ts`); belge "sayı #12 keşfinde" der, kod bağlanmış |
| 11:38-43 | KARAR 1 açık nokta: "çok yakın=BÜYÜK" kesin sayısal eşik #12 keşfine bırakıldı | KARAR 1 | ❓ TEYİT GEREK | eşik ölçeğe bağlı; kod var ama eşik-kalibrasyon teyit gerek |
| 11:53-80 | KARAR 2 — Ghost red / kalıcı reddetme (giriş mesajı + içerik-temizle+kabuk + reapply YOK + mail YOK) | KARAR 2 (2a/#35) | 🔵 AÇIK (tasarım-hazır) | T1-A madde 35 (2a 🔵 migration+cron; A8 30-gün-uyku); migration gerekir, PO onaylı ayrı tur |
| 11:72-78 | KARAR 2 uygulama: `rejectionType: CORRECTION|GHOST` alanı + reapply ghost reddi + enumeration güvenliği | KARAR 2 | ⬜ AÇIK | migration; kod yazılmadı beyanı |
| 11:84-114 | KARAR 3 — Onaylı kullanıcıyı çıkarma (pasifleştir/sil + iz + not + kişi mesajı + eşleşmiş menti bildirimi) | KARAR 3 (2b/#36) | 🔵 AÇIK (tasarım-hazır) | T1-A madde 36 (2b 🔵❓ önce keşif); migration; degerlendirme #7 AŞAMA 3 ile örtüşür |
| 11:100-105 | KARAR 3 kısıt: kişiye mesaj yalnız "pasifleştir"de; "tamamen sil"de imkansız (arayüz uyarmalı) | KARAR 3 | ⬜ AÇIK | tasarım kısıtı |
| 11:118-135 | KARAR 4 — ön yüzde HİÇ İngilizce olmayacak (kalıcı FE standardı + ayrı hijyen işi) | KARAR 4 | ⬜ AÇIK (kural) | CLAUDE.md dil kuralını pekiştirir; mevcut İngilizce kalıntı temizliği ayrı tur (=06:52-54 dropdown) |
| 11:140-148 | Özet tablo + kırmızı-kural hatırlatma (KARAR 2/3 migration → önce DUR + PO onayı) | NUMARASIZ | ✅ YAPILDI (not) | disiplin notu |

### belge-duzeni-rehberi (canonical — 8 düzen kuralı)

| kaynak | kalem | numara | durum | not/kanıt |
|---|---|---|:---:|---|
| bdr:11-16 | KURAL 1 — tek gerçek kaynağı (canonical kazanır, kopyalama link ver) | KURAL 1 | ✅ YAPILDI (kural) | canonical rehber |
| bdr:17-39 | KURAL 2 — tür=klasör + alt-klasör (kararlar/konu/oz-denetim · raporlar/kesif/kod-denetimi/panel/persona/icerik) | KURAL 2 | ✅ YAPILDI (kural) | 2026-08-23 reorg (git mv); T1-A A5 (belge reorg kısmen) |
| bdr:40-45 | KURAL 3 — 🔄 yaşayan / 📸 dondurulmuş üst-etiket | KURAL 3 | ✅ YAPILDI (kural) | — |
| bdr:46-50 | KURAL 4 — adlandırma (dondurulmuş tarihli, yaşayan tarihsiz) | KURAL 4 | ✅ YAPILDI (kural) | T1-A A11: 2 belge tarihli-ad+🔄 çelişkisi (tasarim-kararlari-admin, degerlendirme-metrik) → PO kararı |
| bdr:51-56 | KURAL 5 — INDEX=harita, yeni belge→INDEX güncelle | KURAL 5 | ✅ YAPILDI (kural) | bitiş adımı |
| bdr:57-63 | KURAL 6 — eksik/yanlış işaretleme (silme yok, ⚠️ GÜNCELLEME notu) | KURAL 6 | ✅ YAPILDI (kural) | Belge Düzeltme Deseni ile aynı |
| bdr:64-79 | KURAL 7 — taşıyıcı belgelerin iş bölümü (5 canonical sınırı, statü tek yerde, çelişkide KOD kazanır) | KURAL 7 | ✅ YAPILDI (kural) | 2026-08-23; G1/G2 sınır sorununu çözer |
| bdr:81-90 | KURAL 8 — bulgu yaşam döngüsü (rapor📸→KARAR-TAKIP numara→yol-haritası tek satır→biten 4 yer→günlük) | KURAL 8 | ✅ YAPILDI (kural) | numara yalnız KARAR-TAKIP'te doğar; bu bilanço turu buna uyuyor |
| bdr:106 | Canonical: bu rehber düzen için tek yetkili, CLAUDE.md buraya işaret eder | NUMARASIZ | ✅ YAPILDI (kural) | — |

### chat-v1-teslim (📸 dondurulmuş teslim)

| kaynak | kalem | numara | durum | not/kanıt |
|---|---|---|:---:|---|
| cv1:5-8 | chat v1 PR hazır, iki repo CI YEŞİL, MERGE YOK (backend#33 / çatı#40) | NUMARASIZ | ✅ YAPILDI | teslim kaydı; belge "v1 tamamlandı canlıda" der (üst-başlık) — teslim-anı PR açık, sonra merge |
| cv1:12-18 | Onaylı kapsam: zorunlu ilk mesaj + düz-metin süresiz + okundu + app-içi+mail bildirim + polling; DM/foto/grup kapsam dışı | NUMARASIZ | ✅ YAPILDI | kilitli kapsam |
| cv1:27-36 | 6 endpoint (`/api/conversations` POST/messages/GET/read/unread-count) | NUMARASIZ | ✅ YAPILDI | kod-kanıtlı endpoint listesi |
| cv1:37-41 | Güvenlik: katılımcı-bazlı yetki + cross-tenant tuzağı çözüldü + IDOR auth'tan + PII log/mail'de yok | NUMARASIZ | ✅ YAPILDI | S1; belge dosya-kanıtı verir (`conversationController.ts`) |
| cv1:43-48 | Okundu-bazlı e-posta mantığı (unread=0→mail, >0→mail atma, okununca reset) | NUMARASIZ | ✅ YAPILDI | — |
| cv1:63 | **Backfill YOK:** eski `MatchRequest.requestMessage` chat'e taşınmadı | NUMARASIZ | ⬜ AÇIK (bilinçli) | kapsam kararı |
| cv1:64 | **`VisibilityOptIn.requestMessage` ölü alan DROP edilmedi** — migration→PO ayrı tur; backend hâlâ yazıyor | NUMARASIZ | ⬜ AÇIK | T1-A A21 + madde 18 (v2 DROP); ölü alan |
| cv1:66-68 | Unread count/başına + deep-link e-postada yok + admin moderasyon inbox yok | NUMARASIZ | ⬜ AÇIK | bilinen sınırlar |
| cv1:70-72 | Migration `20260806000000_add_chat...` additive uygulandı; bu turda yeni migration yok | NUMARASIZ | ✅ YAPILDI | canlı=lokal DB'ye PO onaylı |

### degerlendirme-metrik-sistemi (#7 — EN YOĞUN, 232 satır)

| kaynak | kalem | numara | durum | not/kanıt |
|---|---|---|:---:|---|
| dm:29-53 | #7 VİZYON 11 adım (karşılıklı değerlendirme→puan→metrik takip→periyodik→eşik-altı-oto-pasif→bildirim→görüşme→yeniden-değerlendirme→onay-döngüsü→hatırlatma→çıkarma) | NUMARASIZ | ⬜ AÇIK (vizyon) | T1-A madde 7-B (🔵 tasarım-hazır); aşamalı |
| dm:58-67 | EŞİK KARARI: dernek-bazlı aç/kapa, VARSAYILAN KAPALI; eşiği dernek girer (öneri 5/3.1); global sabit YOK | NUMARASIZ | 🔵 AÇIK (karar-alındı) | T1-A A7 (dernek eşiği kendi girer, varsayılan KAPALI); kod Aşama 2 |
| dm:65-79 | ÜSLUP KURALI: pasifleştirme dili destekleyici, "başarısız/düşük puan" YASAK + 3 taslak metin | NUMARASIZ | ⬜ AÇIK (kural) | Türkçe destekleyici; nihai metin hukuk gözden geçirir |
| dm:88-91 | KOD-GERÇEĞİ ZATEN VAR (şema): Feedback/MeetingCheckIn/MatchFeedback/FeedbackLog/Match/MentorshipAgreement/qualityMultiplier | NUMARASIZ | ✅ YAPILDI | S1; dosya:satır kanıtlı (`schema.prisma`) |
| dm:92-98 | Çalışan backend: feedback/check-in/pair-signal/health-metrics/coaching + cron altyapı (5 iş) | NUMARASIZ | ✅ YAPILDI | dosya:satır kanıtlı |
| dm:99-101 | Canlı FE: check-in formu + feedback modalı + KPI NPS + program-sağlığı drill-down | NUMARASIZ | ✅ YAPILDI | dosya:satır |
| dm:104-106 | 🔴 ÖLÜ: `findMatchesDueForCheckpoint` çağrısız (DAY_3/14/30 tetik yok) — **✅ Aşama1 cron'a bağlandı LOG-ONLY** | NUMARASIZ | ✅ YAPILDI (kısmi) | T1-A D1 (✅🔀 cron LOG-ONLY); gerçek bildirim Aşama 2 |
| dm:107-110 | 🔴 Kalite puanı DB'ye YAZILMIYOR (bellekte hesap-at) — **✅ Aşama1 `persistMentorQualityMultiplier` kalıcı yazım** | NUMARASIZ | ✅ YAPILDI | dm:220-223 güncelleme (#48/#100 merged); T1-A 9b |
| dm:111-112 | 🔴 `maxMeetingsPerWeek` uygulanmıyor (yalnız CRUD) — **madde 79 ile enforce edildi** | NUMARASIZ | ✅ YAPILDI | T1-A madde 79 (haftalık limit ✅ 7-gün UTC kova); dm satırı bu turda güncellenmemiş (kısmi bayat) |
| dm:113-114 | 🔴 `getPairSignal` FE'de çağrılmıyor — **✅ Aşama1 "Risk" rozeti bağlandı** | NUMARASIZ | ✅ YAPILDI | dm:220-223; T1-A F1 (getPairSignal ✅ bağlandı) |
| dm:116-131 | TEYİT-1 yeniden-değerlendirme: DISC test tekrarı KISMEN/YOK; sertifika-retry VAR; admin-tetikli genel akış YOK | NUMARASIZ | ⬜ AÇIK | S1; dosya:satır; Aşama 3 |
| dm:133-140 | TEYİT-2 periyodik hatırlatma: cron altyapı VAR; checkpoint tetik ÖLÜ; pasif-kişi periyodik hatırlatma YOK | NUMARASIZ | ⬜ AÇIK | Aşama 3 |
| dm:142-147 | HİÇ OLMAYAN: `blocked/restrictedUntil` + oto-pasifleştirme mantığı + dernek eşik/bayrak + kişi-puan onay-döngüsü ekranı | NUMARASIZ | ⬜ AÇIK | Aşama 2/3; migration gerekir |
| dm:151-156 | GÖRÜNÜRLÜK/KVKK: kişi-bazlı puan YALNIZ yöneticiye (kişi görmez); KVKK Md.11 erişim hakkı ayrı hukuk konusu | NUMARASIZ | ✅ YAPILDI (karar)/❓ hukuk | S1; KARAR 5 ruhu; hukuk tarafı açık |
| dm:163-173 | AŞAMA 1 (migration YOK): uçları bağla — **✅ MERGED CANLIDA** (backend#48→`b5f4b88`, çatı#100→`ef2b995`) | NUMARASIZ | ✅ YAPILDI | dm:214-216 güncelleme; iki main CI yeşil |
| dm:175-179 | AŞAMA 2 (migration VAR): `blocked/restrictedUntil` + eşik kontrolü bookMeeting'e | NUMARASIZ | ⬜ AÇIK | additive nullable; PO onaylı |
| dm:181-188 | AŞAMA 3 (L): yeniden-değerlendirme + periyodik hatırlatma + onay döngüsü + 2b/#36 çıkarma | NUMARASIZ | ⬜ AÇIK | 11:KARAR 3 ile örtüşür |
| dm:192-204 | 6 PO-AÇIK-NOKTA: puan kaynağı? periyodu kim ayarlar? oto/yarı-oto? yeniden-değerlendirme UX? onay ekranı? ölü-kod kararı? | NUMARASIZ | ❓ TEYİT GEREK | PO netleştirene kadar açık |
| dm:203-204 | Ölü kod kararı: `maxMeetingsPerWeek`/`findMatchesDueForCheckpoint`/`blockedPairs` bağla mı sil mi | NUMARASIZ | ❓ TEYİT GEREK | T1-A ölü-kod bölümü; ilk ikisi kısmen çözüldü |
| dm:208-233 | BU TURUN KAYDI + ⚡ güncellemeler (Aşama 1 merged; Aşama 2'ye kayan: oto-pasif kodu+eşik alanı, checkpoint gerçek-bildirim, ContextualFeedbackHost/MeetingProvider bağlama, feedback periodic* form) | NUMARASIZ | ⬜ AÇIK (kayan) | T1-A F5/F6 (ContextualFeedbackHost/MeetingProvider bağlanmadı) |

### tasarim-kararlari-admin-2026-08-11 (12 KARAR)

| kaynak | kalem | numara | durum | not/kanıt |
|---|---|---|:---:|---|
| ta:20-30 | KARAR 1 — sol menü 4 grup (Günlük/İnsanlar/Program&İçerik/Ayarlar) | KARAR 1 | ✅ YAPILDI | T1-A madde 8 (sol menü 4-grup ✅ çatı#76) |
| ta:32-43 | KARAR 2 — havuz KART görünümü, içerik role göre (yönetici DISC+durum / mentör→menti DISC+skor / menti→mentör SADECE skor) | KARAR 2 | ⬜ AÇIK | =06:26 kart tasarımı; B4 ile birlikte; iş boyutu M/L keşif |
| ta:45-47 | KARAR 3 — durum rozeti (Onaylı/Bekliyor/Pasif) yalnız yönetici, otomatik | KARAR 3 | ✅ YAPILDI | T1-A madde 10 (durum rozeti ✅ `APPROVAL_META`) |
| ta:49-52 | KARAR 4 — sertifika rozeti HERKES görür ("Sertifikalı ✓"), sertifikasızda rozet yok | KARAR 4 | ✅ YAPILDI | T1-A madde 11 (sertifika rozeti ✅ `TenantMembership.isCertified`) |
| ta:54-62 | KARAR 5 — DISC görünürlük ASİMETRİK (menti mentörün DISC'ini GÖRMEZ); ham vektör hiçbir rolde | KARAR 5 | ✅ YAPILDI | S1; **KOD KANITLANDI: `discVisibility.ts` mevcut**; T1-A madde 1 (KARAR 5 ✅ #37+#71) |
| ta:64-68 | KARAR 7 — "Neden uyumlu" Katman 1 (zengin ama ham-DISC ifşa etmeyen metin); KARAR 2'nin parçası | KARAR 7 | ⬜ AÇIK | kart işiyle birlikte; T1-A madde 19 ("neden uyumlu" Katman-2 v2) ile faz ilişkisi |
| ta:70-80 | KARAR 11 — DISC baskın+ikincil HARF ("DI"), yüzde GÖSTERİLMEZ; B4'ün güvenli çözümü | KARAR 11 | ✅ YAPILDI | T1-A madde 12 (DISC "DI" ✅); 11:KARAR 1 bunu detaylandırır/yerine geçer |
| ta:78-80 | KARAR 11 ileri-faz: yüzde dağılımı SADECE yöneticiye (KVKK+rıza) — ertelendi | KARAR 11 | ⬜ AÇIK (ertelendi) | seçenek B ileri faz |
| ta:82-93 | KARAR 12 — hazır etiket/sektör havuzu (kullanıcı seçer, öneri PO onayından); eşleştirme motoru girdisi=standart havuz ŞART | KARAR 12 | 🔵 AÇIK (ilke ✅) | T1-A: sektör/etiket havuzu (🔵❓ talep-onay); B12 eksiği; kod/seed keşfi gerek |
| ta:99-103 | KARAR 6 — otomatik onay (yönetici davetiyle gelen ONAYLI, dışardan başvuran Bekliyor) — kodda var mı KEŞİF | KARAR 6 | ❓ TEYİT GEREK | T1-A A14 (KARAR 6 InvitationTemplate var tetik yok); F6 ile birlikte |
| ta:105-121 | KARAR 8 (Katman 2 sonra) + KARAR 9 (mentör yaklaşım kılavuzu — rıza/mahremiyet/dil, hukuk+etik) + KARAR 10 (sektör kolonu canlı-sonrası) | KARAR 8/9/10 | ⬜ AÇIK (vizyon) | KARAR 9 = T1-A madde 20 (mentör yaklaşım Katman-3 v2); veri-girişi boşluğu |
| ta:126-133 | Özet: 8 kesinleşmiş (1,2,3,4,5,7,11,12-ilke) + 4 keşif (6,8,9,10) + çapraz bağlar (KARAR 12↔B12↔skorlama) | NUMARASIZ | ✅ YAPILDI (not) | özet |

---

## 2. ÇELİŞKİLER (belge ↔ belge / belge ↔ kod — hakem OLMADIM)

| # | Çelişki | Kaynak | Karşı-gerçek | Not (yeni/kod) |
|---|---|---|---|---|
| BÇ1 | **SJT sayısı: belge "4" ↔ kod "3"** | `03:47` gövde "4 pedagojik SJT" | `03:48` ⚠️-notu "kod=3" + **KOD: `seed.ts:530` SJT_QUESTIONS=3 giriş** | **KOD KAZANIR=3.** T1-A Ç4 ile aynı. 03 içi ⚠️ notu düzeltmiş ama satır 47 gövde hâlâ "4" (içerik-genişletme #33/PO) |
| BÇ2 | **Yaş politikası: metin 18+ ↔ ürün genç hedefliyor** | `08:11` Kullanım Koşulları "18+" | `08:11` "ürün genç menti hedefliyor" | Kayıtlı ÇELİŞKİ; NET KARAR YOK (PO/hukukçu); T1-A madde 91/83 |
| BÇ3 | **Sunucu konumu: 08 "?" ↔ karar Londra/BK** | `08:13` "Neon=? Hostinger=?" (açık soru) | T1-A madde 92 "Londra/BK, PO teyitli 2026-08-26" | ÇÖZÜLDÜ (Londra/BK); 08:13 satırı BAYAT (T1-A Ç6 ile aynı) |
| BÇ4 | **`maxMeetingsPerWeek`: dm "uygulanmıyor" ↔ madde 79 enforce** | `dm:111-112` "🔴 uygulanmıyor" | T1-A madde 79 "haftalık limit ✅ enforce (7-gün UTC kova)" | ÇÖZÜLDÜ (madde 79); dm:111-112 bu turda güncellenmemiş (kısmi bayat — dm ⚡güncellemeleri Aşama1'i işledi ama bu satırı değil) |
| BÇ5 | **Model tercihi: 07 "Sonnet yeterli" ↔ CLAUDE.md Sonnet/Opus ayrımı** | `07:40` "standart Sonnet yeterli, 1M gerekmez" | CLAUDE.md "Model Yönlendirme: Opus→karmaşık/riskli" | Yumuşak çelişki; 07 eski genel-tercih, CLAUDE.md daha ayrıntılı — teyit (düşük öncelik) |
| BÇ6 | **chat-v1 üst-başlık "canlıda" ↔ gövde "PR hazır MERGE YOK"** | `cv1:3` "v1 tamamlandı, canlıda" | `cv1:5` "PR hazır, MERGE YOK" | Zaman-farkı: teslim-anı PR açık, sonra merge edilmiş (üst-başlık güncel). Çelişki değil, faz-notu |

**Çelişki toplam: 6** (BÇ1-BÇ6). BÇ1/BÇ3/BÇ4 = **bayat-satır adayı** (yeni gerçek belge gövdesine tam işlenmemiş) · BÇ2 = açık PO/hukuk kararı · BÇ5 = yumuşak/düşük · BÇ6 = faz-notu (gerçek çelişki değil).

---

## 3. HAYALET-TAMAMLANMIŞ ADAYLARI (belge içi "açık/⏳" ↔ kod "yapıldı")

> Bu belgelerin çoğu belge-içi ⚠️/✅ notlarıyla zaten düzeltmiş; kalan "gövde bayat" satırlar:

| # | Kalem | "Açık" diyen | "Yapıldı" kanıtı |
|---|---|---|---|
| BH1 | SJT içeriği 4 | `03:47` gövde | KOD=3 (`seed.ts:530`) — belge-içi ⚠️ not düzeltmiş, gövde kalmış |
| BH2 | Sunucu konumu belirsiz | `08:13` açık soru | ✅ Londra/BK (madde 92, 2026-08-26) |
| BH3 | `maxMeetingsPerWeek` uygulanmıyor | `dm:111-112` 🔴 | ✅ enforce (madde 79) |
| BH4 | timezone bug düzeltilmedi | `05:27` (⏳ satırı) | ✅ `6a30f21` — belge-içi ✅ not var (05:28), ⏳ satırı üstte kalmış |
| BH5 | 2 IDOR düzeltilmedi | `04:34` (⏳ satırı) | ✅ KORUMALI kanıtlandı `161ae00` — belge-içi ✅ not var (04:35), ⏳ satırı üstte kalmış |

**Hayalet toplam: 5.** Hepsi belge-içi ⚠️/✅ notuyla **kısmen** düzeltilmiş; yalnız ilk (gövde) satırlar bayat kaldı. → Belge-hijyeni düzeltme adayı (SEVİYE-2, silme yok, ⚠️ not deseni). PO kararı gerekmez; belge-hijyen turu işi.

---

## 4. SEVİYE-1 KOD KANITI DURUMU (bu grubun S1 kalemleri)

> S1 = güvenlik/KVKK/DB/eşleştirme/kimlik → belge beyanı YETMEZ. Bu turda salt-okuma iki kod-teyit yapıldı:

- **✅ TEYİT: SJT sayısı = 3** — `backend/prisma/seed.ts:530` `SJT_QUESTIONS` dizisi 3 giriş (Q_MENTOR_CORE_01, Q_MENTI_CORE_01, Q_MENTI_FOLLOWUP_N_01). Belge "4" (03:47 gövde) YANLIŞ, ⚠️-notu (03:48) DOĞRU.
- **✅ TEYİT: DISC görünürlük kodu MEVCUT** — `backend/src/services/discVisibility.ts` + `discLetters.ts` + `userController.ts` (`canViewerSeeDiscType`). KARAR 5 (asimetrik menti→mentör görmez) kod düzeyinde var (T1-A madde 1 ✅ ile uyumlu).

> **Kanıt-eksik / ❓ kalan S1 kalemler (bu turda DB'ye/koda derin bakılmadı — kural):**
> - `02:51` / `04:25-26` **certified/qualityMultiplier okuma kaynağı** (UserProfile ↔ TenantMembership eski-okuma riski) — kod-teyit gerek.
> - `01:19` **`Tenant.plan/limits` altyapısı kodlandı mı** — belge "⏳ uygulanmadı"; teyit gerek.
> - `04:38-41` **DISC edge-case + JSON guard + kural-panel hardening** (P1) — kod-teyit gerek.
> - `08:26` **format enum "online" vs "ONLINE"** — potansiyel bug, doğrulanmadı.
> - `03:47` **DISC canlı soru sayısı** (Ç3: kod 32 üretir ↔ canlı ~20) — canlı DB sayısı ⏳ (DB'ye sorulmadı, kural).
> - `dm:151-156` **kişi-puan yalnız-yönetici görünürlüğü** kararı ✅ ama KVKK Md.11 erişim hakkı hukuk-açık.

---

## KAPANIŞ NOTU (Grup B2)

- **13/13 belge TAM okundu**, okunmayan 0. `kvkk-metinleri/` klasörüne girilmedi (kural).
- **Toplam 156 kalem.** Durum dağılımı: **✅ YAPILDI ~62 · 🔀 PR'DA 0 (bu grup PR takip etmiyor; ilgili PR'lar merged/T1-A'da) · ⬜ AÇIK ~52 · ❓ TEYİT GEREK ~40 · 🔵 (karar-alındı-kod-bekliyor, ⬜ alt-türü olarak sayıldı) · 🗑️ 0.**
- **NUMARASIZ kalem: ~140** (bu belgeler zaten düz-metin karar arşivi; numara taşıyanlar yalnız 11:KARAR 1-4, admin-11:KARAR 1-12, bdr:KURAL 1-8, 06:D21-23). Numara DOĞURULMADI.
- **Çelişki: 6** (BÇ1-BÇ6; 3 bayat-satır adayı, 1 açık PO/hukuk kararı, 2 yumuşak/faz-notu).
- **Hayalet-tamamlanmış: 5** (BH1-BH5; hepsi belge-içi ⚠️/✅ notuyla kısmen düzeltilmiş, gövde satırı bayat).
- **En çok karar içeren belge:** `degerlendirme-metrik-sistemi-tasarim-2026-08-19.md` (#7, 232 satır — 11 vizyon adımı + 4 kod-gerçeği bloğu + 3 aşama + 6 PO-açık-nokta). Yakın ikinci: `tasarim-kararlari-admin-2026-08-11.md` (12 KARAR).
- **Kod salt-okundu (2 teyit):** SJT=3 doğrulandı, discVisibility.ts mevcut doğrulandı. Kod DEĞİŞTİRİLMEDİ, DB'ye dokunulmadı, PR açılmadı, git commit yapılmadı, numara doğurulmadı.
