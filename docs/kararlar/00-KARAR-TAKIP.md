# 00 — KARAR & İŞ TAKİBİ (NE KALDI · NE YARIM · NE UNUTULDU)

**🔄 YAŞAYAN** (canonical: açık iş/karar takibi) · **Son güncelleme:** 2026-08-19

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
| 🔴/🟡/🔵 **v1 açık iş** | **10** | Canlı-öncesi kalan: 4 küçük (kalibrasyon UI, cevap-tipi, öğrenme-yolculuğu STK, kurum-maili) + 3 tasarım-hazır (2a/2b/#7) + 3 içerik/seed/PO |
| ❓ **karar/keşif bekliyor** | **4** | K6 admin-guard, sektör/etiket havuzu, K3 eski-kayıt consent, #36 önce-keşif |
| 💀 **ölü kod / yarım bağlantı** | **9 kalem** | Çoğu TEK yarım özelliğin parçası: "eşleşme-sonrası değerlendirme/metrik" (#7 tasarımıyla bağlanacak) |
| 🔵 **v2 backlog** | **15** | Hiç dokunulmadı (14-28: algoritma/DB-riskli/ileri-faz/retention) |
| ✅ **canlıda (v1)** | **~10** | KARAR 5, K2, K5, menü, rozetler, DISC harf, İş 2+3, admin soru UI, login enumeration |

> **En çarpıcı gerçek:** Ölü kodların çoğu rastgele değil — **birlikte tek bir yarım-kalmış özellik** oluşturuyor
> ("görüşme sonrası değerlendirme + dönemsel metrik + otomatik checkpoint"). Bu özelliğin **tasarımı yeni yazıldı**
> (`degerlendirme-metrik-sistemi-tasarim-2026-08-19.md`, #7). Yani "ölü kod"u silmek değil, **#7 ile bağlamak** = özellik tamamlanır. Detay: **Bölüm C**.

---

## B. 🔴 AÇIK İŞLER TABLOSU

> Durum: 🔴 hiç başlanmadı · 🟡 yarım/kısmi · 🔵 tasarım hazır kod bekliyor · ❓ karar/keşif bekliyor · ⏸️ bilinçli ertelendi.
> Numaralar `10-yol-haritasi.md` ile aynı (referans için sabit). Alternatif adlar parantezde.

### B.1 — v1 açık işler (canlı-öncesi)

| No | İş | Durum | Tür | Ne gerekiyor (somut sıradaki adım) | Kanıt | Migration? | Boy |
|---|---|:---:|---|---|---|:---:|:---:|
| 6 | Onay/red maili — **kurum/destek** kısmı | 🟡 | yarım-kaldı | Kurum(tenant)-onay/ret maili + `destek@` + prod `PLATFORM_ADMIN_EMAIL` env bağla (kullanıcı maili ✅ çalışıyor) | `10-yol:md.6`; tam-envanter C3 | Hayır | S-M |
| 7 | Havuz kartı (A) + eşleşme-sonrası değerlendirme (B) | 🟡 / 🔵 | yarım-kaldı + tasarım-hazır | (A) mentör→menti aday kartı gerekçe FE render (backend üretiyor); (B) = **#7 sistem tasarımı** (bkz. C) | `matchingController.ts:10-16` üretir, `mentor/page.tsx` render yok; `degerlendirme-metrik-sistemi-tasarim-2026-08-19.md` | (A) Hayır (B) Evet | (A) S (B) L |
| 9 | Algoritma kalibrasyon ağırlık UI (0.60/0.40) | 🔴 | hiç-başlanmadı | `algorithm-tuner` sayfasına ağırlık gösterimi/ayarı ekle (şu an sadece rapor-frekansı) | `09-DURUM` (grep negatif) | Hayır | S |
| 13 | Soru cevap-tipi seçimi (şıklı/açık-uçlu) | 🔴 ❓ | hiç-başlanmadı | Kapsam belirsiz (tipler/validation/skoring) → **PO netleştir**; sonra şema alanı = migration | tam-envanter A4; `schema.prisma` alan yok | **Evet** | M |
| 30 | Sertifika bankası 5→20 canlı seed | 🔴 | içerik-eksik | `seedCertification()` kontrollü çalıştır (idempotent) → **canlı DB yazımı, PO onayı ZORUNLU** | tam-envanter A5; canlı ~5, kod 20 | **Evet (seed)** | S |
| 31 | DISC-tipine-özel "mentiye yaklaşım" içeriği | 🔵 | içerik-eksik | 3 seçenek (statik kılavuz M / SJT koşullu L / sertifika varyant L) → PO seçsin | tam-envanter A6; `eksikler-...:9-18` | Seçeneğe göre | M-L |
| 33 | SJT belge-kod (3 vs 4) + seed↔canlı (32 vs 20) kalan | 🔴 ❓ | içerik-eksik | (a) seed↔canlı: re-seed mi trim mi (canlı DB, PO); (b) SJT 3→4 içerik genişletme (PO) | tam-envanter C4; `03-psikometri:47` "4", kod 3 | **Evet (a)** | S |
| 34 | Öğrenme-yolculuğu tamamlanma görünürlüğü (STK admin) | 🟡 | yarım-kaldı | `learningJourneyCompletedAt`'i STK `adminController` select'ine ekle (platform admin'de ZATEN var) | 🟩 `platformTenantController.ts:177,202` var; `adminController` yok | Hayır | S |
| 35 | **(2a)** İki tip red: "düzeltme iste" vs "kalıcı/ghost sessiz red" (KARAR 2) | 🔵 | tasarım-hazır | Backend red-tipi alanı + 2 buton + e-posta ayrımı (ghost = sessiz, tekrar-başvuru yok) | `11-tasarim-kararlari` KARAR 2; `10-yol:md.35` | **Evet (muhtemel)** | M-L |
| 36 | **(2b)** Onaylanmış (aktif) kullanıcıyı sistemden çıkarma (KARAR 3) | 🔵 ❓ | tasarım-hazır + önce-keşif | **ÖNCE git'ten doğrula** (isActive=false/demote kodda var mı?), eksikse yap | `11-tasarim-kararlari` KARAR 3; `10-yol:md.36` | ❓ (keşif sonrası) | M |

### B.2 — Karar/keşif bekleyenler (kodlanamaz — önce PO/keşif)

| No | Konu | Durum | Ne gerekiyor | Kanıt | Migration? |
|---|---|:---:|---|---|:---:|
| K6 | Admin sayfaları server-side guard | ❓ | v1-güvenlik mi v2-iyileştirme mi → PO (API zaten backend-korumalı, savunma-derinliği) | tam-envanter A2; `04-guvenlik` | Hayır |
| — | Sektör/etiket başlangıç havuzu (admin-tablo, KARAR 12) | ❓ | seed mi / admin-yönetilir tablo mu → şema+PO kararı | tam-envanter A9; `tasarim-kararlari-admin` | Evet |
| K3 | Eski kayıt consent politikası | ❓ | yeniden-rıza / bulk / erteleme → PO ürün+hukuk kararı | tam-envanter A3; `08-acik-sorular` | Evet (backfill) |
| — | K4 yaş **verisi** doğrulaması (beyan ✅ ama veri yok) | ❓ | Şemada yaş alanı yok; öz-beyan yeterli mi yoksa veri-doğrulama mı → PO | 🟩 `schema.prisma` yaş alanı yok (A1) | Evet |

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

## C. 💀 ÖLÜ KOD & YARIM BAĞLANTILAR (niyeti anla → bağla; SİLME kararı PO'da)

> **Ürün sahibi ilkesi:** "Biz o kodu bir sebeple yazdık; önemli olan **neden yazdığımızı bulup kaldığı yerden devam etmek**."
> Bu bölüm her kalem için: ne yapıyor · **neden yazılmış (niyet)** · neye bağlanacak · bağlanınca hangi iş biter · kanıt.
> **"Sil" ÖNERİLMEZ** — gerçekten terk adayı olanlar "❓ bilinçli terk mi, PO kararı" diye işaretlenir.

### 🌟 ÖRÜNTÜ: "Eşleşme-sonrası değerlendirme + metrik + dönemsel checkpoint" — TEK yarım özellik
> Aşağıdaki **5 kalem birbirinden bağımsız ölü kod DEĞİL** — hepsi backend+şema+FE'de yazılıp **birbirine bağlanmadan bırakılmış tek bir özelliğin** parçaları. Tasarımı yeni formalize edildi: `degerlendirme-metrik-sistemi-tasarim-2026-08-19.md` (roadmap #7-B). **Bunları bağlamak = #7'yi inşa etmek** (silmek değil).

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
