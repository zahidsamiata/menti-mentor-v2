# 02-ILERLEME — Otonom Tur İlerleme Defteri

> PO'nun turdan sonra okuyacağı TEK dosya. En baştaki "TUR ÖZETİ" bölümü kapanışta doldurulur.

---

## ⭐ TUR KAYIT — CS BİLANÇO DENETİMİ RAPORU İŞLENDİ + 00-KARAR-TAKIP İKİ EKSİK (2026-09-23)

> **Mod:** 🟥 BYPASS — KISA/KAYIT turu (yalnız kayıt; kuyruk işi YAPILMADI). Dal: `otonom/kayit-analiz-turu-20260923`.
> **Kod DEĞİŞMEDİ · DB/migration/seed YOK · hiçbir şey SİLİNMEDİ · yasak bölge (server.ts/auth/KVKK/matching) DOKUNULMADI.**
> Kaynak: `docs/raporlar/kesif/konu-bilanco-denetimi-2026-09-23.md` (CS denetimi; `otonom/CS-...` dalında, henüz main'de değil — `git show` ile okundu).
> ⚠️ Bu tur PR/commit'ler push edildi; **merge PO'nun tek tıkı.** Sonra PO `/goal` + OTONOM-PROMPT gönderecek.

**§1a — CS §6 KUYRUK (KN-01..14):** **14 yeni satır eklendi** (AN-33..AN-46 — 13 KN satırı + AN-46 ikinci-derece öksüz). **Mükerrer olduğu için eklenmeyen: 1** — KN-14 (belge-düzeni "6→16 kural") YN-02'ye katlandı. Ayrıca KN-12(b) (08-acik çift-kaynak) YN-06'ya ek bulgu olarak; AN-42 (bayat satır) Ç-18/Ç-19'un çözülü olduğu bilgisiyle güncellendi. Her satır KANIT (dosya:satır) + "kaynak: CS raporu" taşıyor.

**§1b — CS §7 KARAR KARTLARI:** **4 kart eklendi** — KARAR-72 (ghost/kalıcı red) · KARAR-73 (değerlendirme AŞAMA 2/3) · KARAR-74 (tenant kalıcı silme, G1-29) · KARAR-75 (KVKK metninde kişi adı, Ç-16). CS'nin A/B/C/D harfleri 72-75'e dönüştürüldü. İndekse "CS BİLANÇO DENETİMİ KARARLARI" alt-tablosu eklendi. Mükerrer YOK; CEVAP satırları boş bırakıldı. En yüksek numara 71→75 (DOĞRULANDI: eski en yüksek 71 idi, prompt "72" demişti).

**§1c — 19 ÇELİŞKİ:** **17'si belgeye tarihli not olarak işlendi** (`~~[ESKİ]~~` + `⚠️ ÇELİŞKİ (2026-09-23, CS raporu)` + kanıt; belge↔kod çelişkisinde HÜKÜM VERİLMEDİ, iki taraf yazıldı). Living konu/ (Ç-01..05,07..11) inline; KVKK taslakları (Ç-12..16); 📸 belgeler (Ç-06 chat-v1 · Ç-17 bilanço) "KOD DOGRULAMA NOTU (2026-09-23)" başlığıyla SONA. **2'si (Ç-18, Ç-19) kod-doğrulama ile ZATEN ÇÖZÜLÜ bulundu** — `backend/CLAUDE.md:5,54` "38 model"+LLM removed · `CLAUDE.md:258` "Londra" (İrlanda yalnız 📸 `bolumler/T3-C` fotoğrafında); CS satır atıfları (:81 · :7,46,51) bölme sonrası bayat. Toplam: **17 işlendi / 2 zaten çözülü.** (Not: Ç-12'nin 05-saklama ayağı o dosyada mevcut değildi → o ayak "zaten yok".)

**§1d — DONDURMA metinleri:** **13 belgeye damga/not** — 9 📸 G-karta (G2·G3·G4a·G4b·G5·G6·G7·G8·G11) "DURUM NOTU: TANIM tutar, DURUM tutmaz → 00-KUYRUK" + 4 bilanço belgesine (00-SAYIM · 00-KATLAMA-IZI · 00-ONCELIK-SIRASI tek tutarlı damga · bilanco-po-ozet 📸). ⛔ **🔄 kartlar (G1·G9·G10) MUAF** — PO 2026-09-02'de un-froze etti, 📸 notu EKLENMEDİ. **bolumler/ (16 dosya) MUAF** — zaten 📸 damgalı (CS §5 "ek not gerekmiyor").

**§1e — İKİNCİ-DERECE ÖKSÜZ:** AN-46 satırı eklendi (G1 güvenlik derinliği G1-03,11,16,18,20,21,24,25,27,30 — G-kartta açık ama kuyrukta yok; + G11 2 kod-dışı strateji). G10 ikinci-derece öksüzü = AN-40 (KN-08).

**§1f — BAYATLIK:** **11 "kartta açık ama bugün CANLI" kalem düzeltildi** (üstü çizili + `✅ CANLIDA 2026-09-23, kanıt: PR/dosya`): 🔄 kartlarda 5 INLINE (G1-14/PR#81 · G1-22/mask.ts:52 · G1-26/suspicionRoutes.ts:9 · G10-22/PR#206 · G10-19/KARAR-32) + 📸 kartlarda 6 KOD DOGRULAMA NOTU (G4-01·G4-14·G4-22/23·G4-24·G4-31·G4-39 · G6-01 · G5-04 · G7-03 · G3-05). **2 kalem "zaten ✅"** raporlandı (G3-19 · G2-11). ⚠️ CS "≥20" tahmin etti; PR/dosya kanıtı OLAN 11 kalem işaretlendi — kanıtsız kalanlar UYDURULMADI.

**§2 — 00-KARAR-TAKIP iki eksik:**
- **§2a ROL NOTU:** belgenin EN BAŞINA "bu belge KARAR/SÖZ GEÇMİŞİDİR, aktif iş `00-KUYRUK.md`'dedir" banner'ı **eklendi** (mevcut 2026-09-21 ROL DARALTMASI tablosuna ek özet).
- **§2b SATIR-İÇİ ŞİŞME:** **1 satır kısaltıldı** — en uzun AKTİF satır (satır 5 "Son güncelleme" dated katmanları) **3.098 → 1.700 karakter**; contiguous üstü-çizili zincir (1.438 krk) `## GEÇMİŞ §son-guncelleme`'ye taşındı. **KARAKTER DENETİMİ ✅:** kalan 1.657 + ayraç 3 + taşınan 1.438 = 3.098 (önceki toplam, tutuyor); taşınan metin hedefte AYNEN 1 kez. Diğer 4 en-uzun satır (md.30/162/348/584) TAŞINMADI — struck parçaları contiguous değil (mevcut GÜNCELLEME katmanları arasına serpilmiş) → güvenle kısaltılamaz, YN-09'a katlandı (kalan ~31 satır). ⚠️ satır 860 (4.621 krk) = ZATEN GEÇMİŞ arşivi (§md.101), kısaltılmaz.

**Kuyruk yeni satır dağılımı (AN-33..46, 14 satır):** 🟢 **6** (AN-35,38,39,42,43,44) · 🟡 **4** (AN-36,37,40,41) · 🔴 **3** (AN-33/KARAR-72, AN-34/KARAR-73, AN-45/keşif) · ❓ triyaj **1** (AN-46). (AN-37 🟡 ama KARAR-74 bekler.)

**Kanıt disiplini:** her iddia dosya:satır · "sanırım" kullanılmadı · mükerrer açmadan önce ARANDI (KN-14→YN-02, kalan satırlar→YN-09) · hiçbir şey silinmedi (üstü çizili + not) · belge taşımada karakter denetimi yapıldı ve tuttu.

**Commit'ler (3):** (1) §1a+§1b kuyruk+kartlar · (2) §1c+§1d+§1f çelişki+dondurma+bayatlık · (3) §2 karar-takip. Hepsi push edildi.

---

## ⭐ TUR KAYIT — ANALİZ TURU BULGULARI DOSYAYA İŞLENDİ (2026-09-23)

> **Mod:** 🟥 BYPASS — KAYIT turu (yalnız kayıt, kuyruk işi YAPILMADI). Dal: `otonom/kayit-analiz-turu-20260923`.
> **Kod DEĞİŞMEDİ · DB/migration/seed YOK · hiçbir şey SİLİNMEDİ · #110'a DOKUNULMADI · yasak bölge (server.ts) DOKUNULMADI.**
> ⚠️ Bu tur PR açar, **merge PO'nun tek tıkı** — sonra PO `/goal` + OTONOM-PROMPT gönderecek.

**Bölüm 0 — Temizlik:** 2 takılı arka plan bash (PID 16152 + 17724, ~4 saat, i02test sonsuz döngüsü) SONLANDIRILDI; bekledikleri `/tmp/i02test.txt` hiç yazılmamıştı (I-02 vi.hoisted ile çözülmüş, nöbetçi unutulmuş). Başka shell'e dokunulmadı. Çalışma ağacı temizdi.

**Bölüm 1 — Gelen kutusu (`docs/gelen/`, .gitignore'da):** 13 dosya tarandı → **13'ü de güvenle silinebilir** (özleri izlenen belge/kodda ZATEN kayıtlı: `internalNote` canlı `schema.prisma:1158`, içerik `docs/raporlar/icerik/sertifika-oturum*` altında arşivli, kararlar `00-KARAR-TAKIP` md.1'de). **Kayıtlanmamış hiçbir şey ÇIKMADI. PII YOK.** Silme PO işi (03-PO #28). Envanter: `docs/raporlar/kesif/gelen-kutusu-envanteri-2026-09-23.md`.

**Bölüm 2 — Merge:** `CR-persona-panel-gelisimi` → **PR #258 merge** (CI yeşil, tek dosya 341 satır). `CQ-analiz-ozeti` **zaten merge edilmişti** (PR #260, `00-ANALIZ-TURU-OZETI` main'de). Açık PR yalnız #110 (dokunulmadı).

**Bölüm 3 — 3 PO kararı yazıldı** (`01-KARARLAR.md`):
- **KARAR-53** (booking↔müsaitlik) → ÖZEL, mentörün 4 hâli (blok=katı+takvim · koşul=esnek · meşgul=soluk/mesaj · boş=dürt+eskalasyon 3/7/10 gün); KARAR-1 ile TEK migration.
- **KARAR-32** → REVİZYON (eski "A" üstü çizildi): havuzdan ÇIKMAZ, soluk görünür, yalnız mesaj, `mentorVisibilityEnabled` bağlanır.
- **KARAR-34** → ÖZEL, topluluk lideri modeli (lider onaylanır/veri sorumlusu) + kayıt ekranı zorunlu/isteğe-bağlı + SORU2→B anonim toplu.
- Kilidi açılan kuyruk satırı: **K-05** (gate 🔴→🟡) · Y-15 · U-19 notları güncellendi.

**Bölüm 4 — 18 yeni karar kartı** (KARAR-54..71, CEVAP boş) + **4 mevcut karta EK bilgi** (KARAR-31 kriz kanalı · 45 dördüncü ad seti · 46 STK konu kaybı · 48 damgalayan/sevdirme dili). İndekse "ANALİZ TURU KARARLARI" alt-tablosu eklendi. Mükerrer açılmadı.

**Bölüm 5 — AŞAMA AN: 32 iş satırı** (AN-01..AN-32) kuyruğa eklendi, her satır kanıtlı (dosya:satır + kaynak + neden). A11 note-only kurala uyuldu (yeni satır açılmadı). Kapı dağılımı (AN): **🟢=11 · 🟡=14 · 🔴=6 · ❓=1**. ÇIKIŞ BLOKERİ etiketleri "KARAR-69 (çıkış tanımı) bekliyor" notuyla aday.

**Bölüm 6 — PO işleri + paketler** (`03-PO-ELLE-ISLER.md`): Avukat A7 güncellendi (topluluk veri sorumlusu somut) + A9/A10 YENİ (anonim toplu veri · kriz bildirimi). **UZMAN PAKETİ YENİ:** (a) psikometri G-1..G-6, (b) ruh sağlığı RS-1..RS-3. PO işleri #27 (gerçek kullanıcı görüşmesi) · #28 (gelen/ temizliği) · #29 (salt-okuma DB sayımları + deploy topolojisi).

**Kuyruk son dağılımı (246 satır, mevcut/en-sağ kapıya göre):** 🟢=129 · 🟡=100 · 🔴=16 · ❓=1 · BEKLIYOR=184. (🟢'lerin bir kısmı BITTI/CANLIDA satırlar.)

**PR:** `otonom/kayit-analiz-turu-20260923` (7 commit). ⛔ Kuyruk işi YAPILMADI — PO merge edip `/goal` gönderecek.

---

## ⭐⭐ TUR I+Y (TERMINAL) — AŞAMA I + ÇIKIŞ BLOKERİ 🟢 İŞLER (2026-09-23)

> **Mod:** 🟥 BYPASS — terminal. Otonom tur, DURMAMA KURALI aktif. Hedef: kuyrukta 🟢 BEKLIYOR bırakmamak (çok-oturumluk; bu tur ilk parti).
> **DB/migration/seed YOK · şema DEĞİŞMEDİ · #110'a DOKUNULMADI · hiçbir şey SİLİNMEDİ · KARAR CEVAP satırı doldurulmadı · yasak bölge (server.ts rate-limit/trust-proxy) DOKUNULMADI.**

### BITTI ve CANLIDA (8 iş — kullanıcı ne görüyor) — HEPSİ MERGE EDİLDİ
| İş | PR | Kullanıcı artık şunu görüyor |
|---|---|---|
| **I-06** (belge) | çatı #243 ✅ | Tasarım belgesini okuyan, iptal edilmiş "unisex isim" kararını geçerli sanmıyor ([ESKİ] damgalı, faz6 §4'e yönlendirildi) |
| **I-02** (onboarding sıra) | çatı #246 ✅ | Yeni kayıtta önce üç soruyu cevaplıyor, arketip kartını (ödül) EN SONDA görüyor. ⚠️ Test mock'u OOM'a yol açıyordu → `vi.hoisted` ile düzeltildi |
| **I-03 + IC-04** (sertifika sonuç) | çatı #244 ✅ | Sınavı geçemeyen mentör zayıf konuların ADINI (kritik=🔴) görüyor + Öğrenme Yolculuğu linki; kritik konudan elenen artık yanıltıcı "%80 gerekli" görmüyor |
| **Y-01** (CORS trim) ⛔T2 | backend #88 + pointer #248 ✅ | `ALLOWED_ORIGINS` boşluklu env değeriyle bile site açılıyor (origin sessizce düşmüyor) |
| **Y-06** (Footer) ⛔T1 | çatı #247 ✅ | Gizlilik/KVKK/Kullanım Koşulları sayfalarının altından ve ana sayfa footer'ından yasal metinlere tıklayıp gidiyor (önceden ölü `<span>`) |
| **P-10** (mentör e-posta) ⛔T2+T3 | backend #89 + pointer #253 ✅ | Menti booking yaptığında mentöre e-posta bildirimi gidiyor (çan bildirimine ek). ⚠️ Ulaşması SMTP'ye bağlı (PO-elle B#4) |
| **IC-02** (davet yazımı) | çatı #255 ✅ | Yönetici davet metnini (e-posta/WhatsApp) kopyaladığında tutarlı "mentör olarak davet etti" görüyor (önceden aynı cümlede "mentörlük … mentor" tutarsızdı) |

### KARAR AÇILDI (yapılamadı — PO cevabı bekliyor)
- **KARAR-53** (#251) — **K-05** çıkış blokeri incelemesinde GERÇEK BUG bulundu: müsaitlik girmemiş mentör HİÇ randevu talebi alamıyor (FE "yine de öner" ↔ backend 409 reddi). Çözüm yönü ürün kararı (menti blok dışına çıkabilir mi). K-05 → 🔴 KARAR-53. Öneri: B (esnek, mentör karar verir).

### Pointer bump (bu turda 2 backend PR → 2 bump)
- #248: `b0b3dcb→dd7c48c8` (Y-01) · #253: `dd7c48c8→4686ba4c` (P-10). Her ikisi fast-forward.
- **SON eşitlik teyidi: çatı main pointer == backend main HEAD == `4686ba4c` → ✅ EŞİT.**

### KUYRUK SON DAĞILIMI (bu partiden sonra)
- 🟢 BEKLIYOR: **54** · 🟡 BEKLIYOR: **75** · 🔴 BEKLIYOR: **19** → **hedef HENÜZ sağlanmadı, çok-oturumluk iş.** (Tur başında 🟢=~60 idi; 6 🟢 + K-05→🔴 kapatıldı.)
- **Sıradaki öncelik (sonraki tur):** çıkış blokeri 🟢 kalmadı (K-05 → 🔴 KARAR-53). AŞAMA I **I-04** (sertifika 4-garantili çekim, backend) · **I-05** (görüşme sıklığı — ⚠️ bekleme aşamasında veri yok, ürün belirsizliği) · **I-07** (yanlış konu tekrar, backend). Sonra U/P kalanları, sonra Y/GV/PS/IC/YN büyük kümeleri (dosya-kanıtlı, çoğu bağımsız FE/BE).

### CANLIDA KONTROL EDİLECEKLER (PO gözle)
1. Sertifika sınavını geçemeyen mentör: zayıf konu ADLARI + "Öğrenme Yolculuğu'na git" düğmesi görünüyor mu?
2. Public sayfaların (gizlilik/kvkk/terms) altında yasal linkli footer var mı, tıklanıyor mu?
3. Yeni kayıt onboarding: üç soru → SONRA arketip kartı sırası.
4. (SMTP kuruluysa) menti randevu talep edince mentöre e-posta gidiyor mu?

### PO CEVABI GEREKEN: **KARAR-53** (K-05 booking çelişkisi) — `01-KARARLAR.md`
### STASH: yok · BACKEND: pointer eşit `4686ba4c` (yukarıda) · SİLME: yok

---

## ⭐⭐ TUR BG (TERMINAL) — BULUT İŞLERİ MERGE + POINTER + 4 KARAR KAYDI (2026-09-22)

> **Mod:** 🟥 BYPASS — terminal. **Kod DEĞİŞMEDİ** (yalnız merge + docs + submodule pointer) · **DB/migration/seed YOK** · **hiçbir şey SİLİNMEDİ** · #110'a DOKUNULMADI.
> Dallar: `otonom/BF-merge-karar-kaydi-20260922` (docs+pointer, **merged #241**) · `otonom/BG-terminal-kapanis-20260922` (bu kapanış notu).

### 1 · Merge edilen PR'lar (hepsi CI yeşil)
| PR | Repo | Ne | CI | Kapsam teyidi |
|---|---|---|---|---|
| **#240** BE | çatı | 9 karar kaydı + konsey düzeni (docs) | 8/8 pass | docs-only (frontend/backend 0 değişiklik, 3-nokta diff teyitli) |
| **#231** F-19 | çatı | Yönetici proaktif eşik-alarmı (FE) | 8/8 pass | frontend-only: `(admin)/admin/kpi/page.tsx` · `lib/adminAlerts.ts` · test |
| **#87** BD | backend | Kimlik sahteciliği düzeltmesi (GV-01/02) | pass | tam 5 dosya (sjtScoringController · feedback.service · feedbackController + 2 test) — fazlası YOK |
| **#241** BF | çatı | pointer bump + 4 karar + avukat paketi | 8/8 pass | docs + submodule pointer, kod 0 |

### 2 · Kapatılan 8 PR (içeriği BE ile main'e girdi)
`AZ #232` · `BA #233` · `CA #235` · `CB #237` · `CC #238` · `CD #236` → **kapatıldı** (yorumla).
`BB #234` · `BC #239` → GitHub **"already merged"** olarak kapattı (commit'leri BE üzerinden main'e ulaştı — daha temiz sonuç).
⛔ **Kanıt disiplini:** 8 PR'ın da dosyaları kapatmadan ÖNCE main'de doğrulandı (her biri için `git cat-file -e origin/main:<dosya>` → hepsi PRESENT).

### 3 · Pointer bump
- Eski: `b5415bd116aa9ffc7ed3dc30dc0146852072b058`
- Yeni: `b0b3dcbe57061eb95e5bdb0fe5fd3885f0558c6a` (backend main HEAD, BD #87 merge commit)
- Ata kontrolü: `merge-base --is-ancestor eski yeni` → **YES** (ileri sarım güvenli).
- **Eşitlik teyidi:** çatı main pointer == backend main HEAD → **✅ EŞİT**.

### 4 · Yazılan 4 CEVAP (PO, 2026-09-21, strateji katmanı) + kilidi açılan satırlar
- **KARAR-23** → ÖZEL: onay+düzeltme maili gönderilir, **ret maili YOK** (kırıcı olabilir).
- **KARAR-24** → B: hata iz kaydı panele, **PII temizlenmiş** (denetim izi KALDIRILMAZ).
- **KARAR-27** → A: Sentry + kişisel veri temizleme + KVKK metni şartı.
- **KARAR-33** → B: dondur, sebep seç, 30 gün sonra psikometri sil, mentör emeği/sayısı korunur.
- İndeks 4 kart **✅ CEVAPLANDI**. **Kilidi açılan/eklenen kuyruk satırı: 4** → `DK-01` (Sentry) · `DK-02` (düzeltme e-postası metni) · `DK-03` (panel hata ayrıntısı) + **Y-14** kapsam genişledi (KARAR-33 akışı absorbe edildi).
- **KARAR-34**'e PO topluluk-mentorluğu **SORUSU** eklendi (CEVAP'a dokunulmadı).

### 5 · Avukat paketi
- `03-PO-ELLE-ISLER.md` → yeni **"⚖️ AVUKAT PAKETİ"** bölümü, **8 madde** (A1-A8): KARAR-3/4/31/27/33/24/34/23. E-bölümü KARAR-47 maddeleriyle mükerrer denetimi yapıldı; `kvkk-metinleri/` paketine atıf verildi.

### 6 · Kuyruk İŞLENMEDİ (bilinçli)
⛔ OTONOM-PROMPT okunmadı, kuyruk işlerine başlanmadı — PO'nun zamanı/bağlantısı kısıtlı. Bir sonraki oturum `/goal` + OTONOM-PROMPT ile kaldığı yerden işler.

**Belge senkronu:** 09-DURUM/10-yol güncellemesi gerekmedi — bu tur ürün özelliği eklemedi (yalnız merge + karar kaydı); durum anlatısı BE turunda zaten güncellendi.

---

## ⭐⭐ TUR BE — 9 KARAR CEVAPLANDI, 8 İŞİN KİLİDİ AÇILDI (2026-09-21) · YALNIZ BELGE

> **Mod:** 🟥 BYPASS — bulut. **Kod DEĞİŞMEDİ · DB/migration/seed YOK · hiçbir şey SİLİNMEDİ.**
> Dal: `otonom/BE-karar-kaydi-20260921` (BC'nin üstüne açıldı). Kaynak: **PO, 2026-09-21 strateji katmanı karar oturumu.**
> **Neden bu tur var:** 9 karar ve birkaç plan **yalnız sohbette** duruyordu — dosyaya yazılmasaydı kaybolacaktı.

### ⭐⭐ PO İÇİN — MERGE SIRASI

**Zincir: BB → BC → BE. YALNIZ BU PR'I (BE) MERGE ET** — BB ve BC içerikleri de onunla gelir.

**Sonra şu PR'ları KAPAT** (içerikleri bu PR'ın içinde):
`AZ` · `BA` · `BB` · `BC` · `CA` · `CB` · `CC` · `CD`

**Ayrıca merge et:** **`F-19`** (çatı, kod) · **`BD`** (backend, güvenlik — **onaylandı**).
⚠️ **`BD` merge'ünden SONRA ÇATI POINTER BUMP gerekir** (terminal işi; bulut yapamaz):
`git submodule update --remote backend` → `git add backend` → commit → çatı PR.

### 1 · Doldurulan CEVAP: **9**

| Karar | Cevap | Şart / ek |
|---|:---:|---|
| KARAR-11 | **A** | karantina → bir tur bekle → sonra sil |
| KARAR-32 | **A** | — |
| KARAR-20 | **A** | — |
| KARAR-7 | **A** | — |
| KARAR-1 | **A** | ⛔ **MIGRATION** (`AvailabilityBlock`: `format` + `durationMin`) → önce tarihli yedek tablo, sonra PO'nun **AÇIK onayı**. Ajan tek başına migration **ÇALIŞTIRMAZ** |
| KARAR-22 | **B** | ⚠️ bildirim iki kanal: uygulama içi (çan) **çalışır**, **e-posta SMTP ayarlanana kadar GİTMEZ** (`03-PO-ELLE-ISLER` B#4) |
| KARAR-29 | **A** | ⭐ PO teyidi: yolculuk senaryoları sertifika sınavında **ÇIKMIYOR** → şık açıklaması **cevap anahtarı sızdırmaz** |
| KARAR-6 | **A** | + **alt uyum eşiği** (ek 1) · uyum oranı **zaten var** (ek 2) |
| KARAR-10 | **C** | ⭐ **AŞAMALI** — 3 aşama, feature flag zorunlu |

`01-KARARLAR.md` başındaki **İÇİNDEKİLER** tablosunda bu 9 satırın *"Cevap durumu"* kolonu
**`✅ CEVAPLANDI (2026-09-21): <harf>`** yapıldı.

### 2 · Kilidi açılan kuyruk satırı: **8** (eski kapı üstü çizili bırakıldı)

| Satır | Eski kapı | Yeni kapı | Neden |
|---|---|:---:|---|
| `I-15` | 🔴 KARAR-10 | **🟡** | matching/skorlama (istisna 2) — KARAR-10 aşama 3 |
| `I-16` | 🔴 KARAR-22 | **🟡** | `MatchRequest`'te **durum alanı yok** → MIGRATION |
| `K-06` | 🔴 KARAR-29 | **🟢** | üç istisnanın hiçbiri yok; PO teyidi kilidi kaldırdı. Durum `ATLANDI(karar)` → **`BEKLIYOR`** |
| `K-15` | 🔴 KARAR-1 | **🟡** | MIGRATION + yedek + PO onayı |
| `K-19` | 🔴 KARAR-8, KARAR-10 | **🟢** | ⚠️ **etiket yazım hatası doğrulandı** — içeriği **KARAR-6 + KARAR-7** |
| `F-11` | 🔴 KARAR-10 | **🟡** | matching; üç aşamanın şemsiyesi |
| `F-17` | 🔴 KARAR-20 | **🟡** | ret akışı için şema alanı → MIGRATION |
| `P-05` | 🔴 KARAR-22 | **🟡** | `rejectionReason` şemada yok → MIGRATION |

⛔ **KİLİDİ AÇILMAYAN: `E-5` — kasıtlı.** KARAR-11 cevaplandı ama bu satırın kapısı **İKİ şartlıydı**
(*"KARAR-11 **+ karantina turu geçmiş**"*) ve ikinci şart sağlanmadı. Ayrıca `CLAUDE.md` § SİLME PROTOKOLÜ
adım 5 açık: *"karantina 🟡'dır, **gerçek silme 🔴'dır**"* ve silme **PO'nun İKİNCİ onayını** ister.
⇒ **🔴 KALIR.** Açılan kısım **`K-13`**'tedir (karantina ayağı, zaten 🟡) — Not'una işlendi.

### 3 · KARAR-10 için eklenen aşama satırları: **3** (+ KARAR-6 için **1**)

| Satır | Kapı | Ne |
|---|:---:|---|
| `PS-A1` | 🟡 | **Aşama 1 — düzelt + test.** Ölçek hatası (DISC `0-1` ↔ formül `0-100`), iki `DiscVector` tipi birleştirilir, bugün **SIFIR** olan birim testleri yazılır. **Kullanıcı etkilenmez.** |
| `PS-A2` | 🟡 | **Aşama 2 — backfill.** ⛔ **CANLI VERİ:** önce tarihli yedek tablo, sonra PO'nun açık onayı. Şema migration'ı yok ama **verinin ANLAMI değişiyor.** ⛔ Bulut **yapamaz** |
| `PS-A3` | 🟡 | **Aşama 3 — eşleştirmeye bağla, AÇMA/KAPAMA ANAHTARIYLA.** Eski/yeni sıralama karşılaştırması PO'ya gösterilir; tek tuşla geri dönülür |
| `PS-A4` | 🟡 | **KARAR-6 ek(1)** — menti tarafı alt uyum eşiği |

⚠️ **KARAR-10'un kendi uyarıları satırlara yazıldı:** ölçüm mekanizması **YOK** (`Match` yazılmıyor) → *"daha iyi"*
bir süre **PO'nun gözüyle** değerlendirilir; `Match` yazımı açılırsa **KVKK sırası bağlayıcıdır** (önce silme yolu
`GV-08`, sonra `U-18`); motor bağlanınca **menti ekranındaki YÜZDELER DEĞİŞİR** (KARAR-6 bağlantısı).

### ⭐ PO'nun sorduğu kontrolün cevabı (KARAR-6 ek 1) — kod-teyitli

**`minMatchScore` menti ekranında KULLANILMIYOR — ve bugün KULLANILAMAZ.**

| Kanıt | Bulgu |
|---|---|
| `matchingController.ts:23,63` · `matching.ts:62` · FE `lib/api/matching.ts:34-37` | Parametre **yalnız mentör→menti** yönünde var (`getRankedMentis`) |
| `matching.ts:351-354` | **Menti→mentör** yönü `rankMentorsForMenti` **imzasında eşik YOK** (yalnız `{mentiId, mentiTenantId, limit}`) |
| `matching.ts:88-91` | `tenant.minMatchScoreThreshold` okuması **yalnız mentör yönünde** — menti yönü onu **hiç okumuyor** |
| `matchingController.ts:107-111` · FE `matching.ts:23-24` | Controller yalnız `limit` geçiriyor; FE yalnız `?limit=100` çağırıyor |

⇒ İş *"var olan parametreyi geçir"* **değil**, `rankMentorsForMenti`'ye eşik **eklemek** → bu yüzden kapı **🟢 değil 🟡**.

**Eşik DEĞERİ (ajanın teknik kararı + gerekçesi):** sabit sayı yazılmaz; **kurumun kendi
`Tenant.minMatchScoreThreshold`** değeri taban alınır (`schema.prisma:201`, `@default(50)`, panelden 20-90).
Gerekçe: (1) `CLAUDE.md` *"sihirli sayı YOK"*; (2) mentör yönü **zaten bunu yapıyor** (`matching.ts:116`) → iki yön
**simetrik** olur; (3) değer **kurumun elinde** kalır. ⛔ **Boş liste tuzağı:** mentör yönündeki level-3 kaçış kapısı
menti yönünde de kurulmazsa küçük kurumda menti **hiç mentör göremez** → `PS-10` ile SIRALI.

**KARAR-6 ek(2) — uyum oranı görünsün:** ✅ **ZATEN VAR** (`menti/page.tsx:311-318`) → satır açılmadı.

### 4 · GV-01 / GV-02 — güvenlik onay notu **EKLENDİ** ✅

İkisinin de Not'una strateji katmanı onayı işlendi (backend dalı
`otonom/BD-guvenlik-kimlik-sahteciligi-20260921`): kimlik yalnız oturumdan (`req.auth`) · rol
`TenantMembership`'ten · taraf karşılaştırması ilişki üzerinden · yazma ucu okuma ucunun desenini birebir alıyor ·
taraf kontrolü **hiçbir yazmadan ÖNCE** · **EK AÇIK kapatıldı** (alan bölümlemesi: mentör kendi kalite puanını,
menti kendine kilit basamaz) · **11 test**.
**Durum: `BEKLIYOR` → `PR-ACIK`.** ⚠️ Merge sonrası **ÇATI POINTER BUMP** gerekir.

⭐ **Yan düzeltme (YN-07'nin bir ayağı kapandı):** kuyruğun *"Durum kodları"* satırı **6 kod** sayıyordu ve
`PR-ACIK`'i içermiyordu — ama kuyruk gövdesinde `PR-ACIK` **zaten kullanılıyordu** (F-19). Canonical
`OTONOM-PROMPT.txt:81-82` **7 kod** sayıyor; kuyruk ona hizalandı (eski satır üstü çizili). Ayrıca
`belge-duzeni-rehberi` § KURAL 10'daki `✅·🟡·🔀·⬜·❓·🗑️` alfabesinin **AYRI** olduğu (kart kodları, kuyruk
durumu değil) açıkça yazıldı.

### 5 · `07-calisma-tarzi.md`'ye eklenen bölümler: **2**

- **`## Konsey denetimleri (2026-09-21)`** — yedi konsey ve **tek sorusu** · sıklık tablosu ·
  ⭐ KURAL *"Konsey BELGE ÜRETMEZ, KUYRUĞU BESLER"* (salt-okuma · raporu 📸 · tek işi hazır kuyruk satırı +
  numarasız kart · ⛔ paralel konseyler ortak dosyaya yazmaz, bulguları **tek uygulama turu** işler) ·
  ilk çalışma kaydı (2026-09-21, dört konsey + diğer üçünün o haftaki karşılıkları).
- **`## Karar oturumu biçimi — PO tercihi (2026-09-21)`** — her karar için: bugün ne oluyor · neden sorun ·
  kullanıcı ne yaşar · ne kazanılır / **ne kaybedilir** · hangi kararla bağlantılı. ⛔ Kısa *"(öneri)"* **yetmez**.

⛔ **`CLAUDE.md`'ye EKLENMEDİ** — dosya **34.742 karakter**, 35.000 hedefinin altında; büyütülmedi (doğrulandı).
⛔ **Yeni planlama belgesi AÇILMADI** (kural). Künye tazelendi (KURAL 12 birincil ayak).

### 6 · `03-PO-ELLE-ISLER.md`'ye eklenen bölüm: **1**

**`## Ajan sunucusu (opsiyonel) — PC kapalıyken terminal çalışsın`** — öncelik **DÜŞÜK**,
⛔ **canlıya çıkış blokeri DEĞİL.** Mevcut VPS'te ayrı kullanıcı ile Claude Code.
⛔ **Pazarlık dışı:** `sudo` YOK · **`docker` grubuna EKLENMEZ** (docker grubu = fiilen root) · yalnız ev dizini.
⛔ `DATABASE_URL` **kalıcı yazılmaz** — migration turunda tek seferlik.
Gözden geçirme koşulu: CPU düzenli **%40**'ı aşarsa ayrı sunucuya taşınır.
⚠️ Ubuntu 22.04'te yükleyici zaman aşımı bildirilmiş; 24.04 sorunsuz.

### 7 · ⛔ BU TURUN YAPMADIKLARI (bilinçli)

- ⛔ **Kod / DB / migration / seed: sıfır temas.**
- ⛔ **Yalnız yukarıdaki 9 CEVAP dolduruldu** — başka hiçbir `CEVAP:` satırına dokunulmadı, hiçbir cevap uydurulmadı.
- ⛔ **Hiçbir şey silinmedi** — eski kapılar ve eski künye `~~[ESKİ]~~` damgasıyla yerinde.
- ⛔ **Yeni planlama belgesi açılmadı.**
- ⛔ **Merge edilmedi** — bulut merge edemez.
- ⛔ `E-5` **bilerek açılmadı** (yukarıda gerekçeli).

### 8 · CANLIDA BAK

**Yok — bu tur yalnız belge.** Ama kilit açıldı: **8 iş** artık çalışılabilir durumda ve bunlardan
**`K-06` ile `K-19` 🟢** — yani doğrulama listesi geçerse **merge edilebilir**, PO beklemez.

---

## ⭐⭐ TUR BC — DÖRT KONSEY UYGULANDI + YEDİ DAL BİRLEŞTİRİLDİ (2026-09-21) · YALNIZ BELGE

> **Mod:** 🟥 BYPASS — bulut. **Kod DEĞİŞMEDİ · DB/migration/seed YOK · hiçbir şey SİLİNMEDİ · `CEVAP:` satırları BOŞ.**
> Dal: `otonom/BC-birlesik-uygulama-20260921` (BB'nin üstüne açıldı).

### ⭐⭐ PO İÇİN — TEK CÜMLE

**Bu PR'ı merge et. Sonra şu PR'ları KAPAT (içerikleri bu PR'ın içinde):**
**`AZ` · `BA` · `BB` · `CA` · `CB` · `CC` · `CD`.**
Ayrıca **`F19`** (kod) ve **`BD`** (güvenlik kodu) **ayrı** merge edilir — onlar bu PR'da değil.
⇒ Sekiz merge yerine **iki merge** yapıyorsun.

### 1 · Birleştirilen dallar (7) ve getirilen dosyalar

| Dal | Getirilen dosya | Satır |
|---|---|---:|
| `AZ-devir-analizi` | `docs/raporlar/kesif/devir-analizi-2026-09-21.md` | 603 |
| `BA-po-cikis-kilavuzu` | `docs/raporlar/kesif/po-cikis-kilavuzu-2026-09-21.md` | 745 |
| `BB-devir-uygulama` | **taban dal** (AŞAMA I + Y, KARAR-30…37, arşivleme) | — |
| `CA-konsey-psikometri` | `docs/raporlar/kesif/konsey-psikometri-2026-09-21.md` | 591 |
| `CB-konsey-guvenlik` | `docs/raporlar/kesif/konsey-guvenlik-kvkk-2026-09-21.md` | 452 |
| `CC-konsey-icerik` | `docs/raporlar/kesif/konsey-icerik-2026-09-21.md` | 737 |
| `CD-konsey-yonetisim` | `docs/raporlar/kesif/konsey-yonetisim-2026-09-21.md` | 640 |

### 2 · Her konseyden kuyruğa giren satır sayısı

| Konsey | Yeni kuyruk satırı | Mevcut satıra NOT | Açılan kart | PO kalemi |
|---|---:|---:|---|---|
| 🔐 **GV** güvenlik/KVKK | **25** (GV-01…GV-25) | 17 | KARAR-38·39·40 | #19 · #20 · #21 + #10 notu |
| 🧠 **PS** psikometri | **11** (PS-01…PS-11) | 12 | KARAR-41·42·43·44 + KARAR-10 eki | #22 · #23 |
| ✍️ **IC** içerik | **14** (IC-01…IC-14) | 2 (+ §2.2'deki 6 düzeltme) | KARAR-45·46·47·48 | #24 |
| 🗂️ **YN** yönetişim | **15** (YN-01…YN-15) | 2 | KARAR-49·50·51·52 | #25 · #26 |
| **TOPLAM** | **65** | **33** | **15 kart** (KARAR-38…52) | **8 kalem** (#19-26) |

⭐ **GV-01 ve GV-02 kuyruğun EN ÜSTÜNDE** — AŞAMA I'dan da önce, yeni `## ⛔⛔ EN ÜST — KİMLİK SAHTECİLİĞİ`
bloğunda. İkisi de **kimlik istek gövdesinden alınıyor** → bir kullanıcı başkası adına hareket edebiliyor.
⛔ Bu turda **kodlanmadı**; ayrı bulut turu (`otonom/BD-...`) düzeltme PR'ini hazırlıyor.

⭐ **MATCH ↔ KVKK ÇAPRAZ ATFI** — iki konseyi birlikte okuyunca çıkan bulgu, beş satıra işlendi
(`U-18` · `PS-04` · `F-11` · `I-15` · `GV-08`):
*"⛔ BİRLİKTE YAPILMALI — önce silme yolu düzeltilir, SONRA `Match` yazımı açılır. Ters sıra = KVKK ihlali."*
Bugün `Match` tablosu **boş** olduğu için sızıntı **gerçek veride YOK**; `Match` yazımı açıldığı **AN** gerçekleşir.

### 3 · Düzeltilen yanlış bilgiler (§2.1-2.4)

| # | Ne yanlıştı | Doğrusu | Nereye işlendi |
|---|---|---|---|
| **2.1** | Sertifika farkı *"2 senaryo + 8 şık"* | `tam.md`'nin 20 sahnesinden **15'i gerekçeli ELENDİ**; kalan 5'in **5'i de yeniden yazıldı** (birinde **puan anlamı TERS DÖNDÜ**). Taşınacak: **88 şıkın TAMAMI**. Efor **S değil L** | 5 yer: `00-KUYRUK` K-16(:139)·K-16 dipnotu(:209)·P-99(:247) · `01-KARARLAR` KARAR-3 · `02-ILERLEME` B.2 |
| **2.2** | 6 kalem *"içerik hazır"* | **2'si hazır değil, 1'i yer tutucuyla dolu:** md.139 = **4/8 YARIM** (menti sürümü hiç yazılmamış) · I-17/md.167 = seed'e koyacak içerik **hiç yazılmamış** · md.147 = her aşamada `{mentor_*}`, kodda **0 karşılık** → bugün seed edilirse ekranda ham `{mentor_mimar}` görünür | 6 satır: `I-01` · `I-10` · `I-15` · `I-16` · `I-17` · `K-18` |
| **2.3** | *"KURAL 17"e atıf veren belgeler var"* | ⛔ **UYGULANACAK BİR ŞEY YOK (no-op, kanıtlı).** Kapsam: tüm `docs/` + `CLAUDE.md`, `*.md`+`*.txt`, harf duyarsız → **4 isabet, DÖRDÜ DE** yönetişim raporunun kendi içinde ve zaten *"böyle bir kural YOK"* diyor. Hayalet yalnız brief'te yaşıyor | — (düzeltilecek bayat atıf yok) |
| **2.4** | *"Belgelerde CLAUDE.md boyutu BAYT cinsinden geçiyor"* | ⛔ **UYGULANACAK BİR ŞEY YOK (no-op, kanıtlı).** `45.154`/`50.477` → **3 isabet, ÜÇÜ DE** yönetişim raporunun içinde ve rapor zaten *"o sayı BAYTTIR, gerçeği 46.817 karakter"* diyor. Hiçbir yaşayan belgeye sızmamış | — |

### 4 · ⭐ CLAUDE.md BÖLME — karakter denetimi

> ⚠️ **`wc -m` bu ortamda BAYT sayıyor** (locale `POSIX`, `LANG` boş) → tüm sayılar `python3 len(str)` iledir.

| | Karakter | Bayt | Satır |
|---|---:|---:|---:|
| **ÖNCE** (`a795828`) | **47.456** | 51.168 | 711 |
| **SONRA** | **34.742** | 37.668 | 494 |
| **Hedef** | **< 35.000** | — | — |
| **Pay** | **258** ✅ TUTUYOR | — | — |

| Taşınan blok | Karakter | Nereye |
|---|---:|---|
| KURAL 8-16 gövdeleri | **8.101** | `docs/kararlar/konu/belge-duzeni-rehberi.md` (10.987 → **19.612**) |
| RTK komut kataloğu | **5.019** | `docs/kararlar/konu/rtk-komut-rehberi.md` (**YENİ**, 5.450) |

✅ **Taşınan metin her iki hedefte de AYNEN bulundu** (tam-blok karşılaştırma, `0` kayıp satır).
✅ **Hiçbir şey silinmedi.** RTK atfı özgün `<!-- rtk-instructions v2 -->` işaretçilerinin **İÇİNDE** bırakıldı
(araç sözleşmesi bozulmasın) ve *"⛔ AKTİF, kullanmaya devam et"* notu hem `CLAUDE.md`'de hem rehberde yazılı.
⛔ Planın **3. ve 4. blokları UYGULANMADI** (brifing gereği — önce bu ikisinin sonucu görülsün).

**Atıf sayısı:** repo genelinde `CLAUDE.md:<satır>` biçiminde **211 atıf**. Taşınan bloklara işaret eden: **11**.
**Güncellenen: 1** (`00-KUYRUK` V-09 — `:453` hem zaten bayattı hem bölmede kırıldı → **bölüm adına** çevrildi).
**10'u 📸 DONDURULMUŞ belgelerde** (9'u `konsey-yonetisim`, 1'i `T3-C` 2026-08-26) → tek tek değiştirilmedi;
`konsey-yonetisim`'in başına **atıf haritası notu** eklendi (Belge Düzeltme Deseni — rapor kendi künyesinde
*"işlendikten sonra güncellenmez"* diyor, 9 kanıt atfını değiştirmek fotoğrafı tahrif ederdi).

⚠️ **YENİ BORÇ (bu turda doğdu, açık):** taşıma sonrası `belge-duzeni-rehberi.md`'de **KURAL 8 iki kez** var
(`:99` kendi gövdesi + `:143` taşınan kopya) → **YN-02** + **KARAR-52**. Ayrıca pay **258 karakter ≈ 3 satır**;
bir sonraki ders eklendiğinde sınır aşılır → **Kademe 2** (YN-01) artık opsiyonel değil.

### 5 · §4 — tutarlılık maddesi (yeni kural DEĞİL)

Güvenlik konseyinin asıl bulgusu: **11 bulgunun 9'unda doğru koruma aynı dosyada ya da aynı ailede ZATEN VARDI**,
yalnız bir yolda uygulanmamıştı (okuma korunuyor/yazma korunmuyor · ikiz uç korunuyor/eski uç korunmuyor).
Yönetişim konseyi *"yeni kural ekleme"* dediği için bu **mevcut kanıt disiplinine TEK MADDE** olarak eklendi:
`CLAUDE.md` § "Her yeni endpoint için ZORUNLU kontrol" + `OTONOM-PROMPT.txt` § "KANIT DİSİPLİNİ" →
**KOMŞU UÇ KARŞILAŞTIRMASI.**

### 6 · Belge haritası (§5.1)

Altı yeni rapor `docs/00-BELGE-HARITASI.md`'ye **📸 DONDURULMUŞ** olarak işlendi (§C'nin "17 belge" sayımı
bugün **23**). Ayrıca **KURAL 5 borcunun bir kısmı kapandı:** yeni açılan `rtk-komut-rehberi.md`
`docs/kararlar/00-INDEX.md`'e kaydedildi. Haritanın kendisinin INDEX'e işlenmesi **hâlâ açık** (YN-03).

### 7 · ⛔ BU TURUN YAPMADIKLARI (bilinçli)

- ⛔ **Kod / DB / migration / seed: sıfır temas.** `backend/` ve `frontend/` altına dokunulmadı.
- ⛔ **Hiçbir şey silinmedi** — tüm düzeltmeler `~~[ESKİ]~~` + `⚠️ GÜNCELLEME` deseniyle.
- ⛔ **`CEVAP:` satırları boş** (15/15 doğrulandı) — karar PO'nundur.
- ⛔ **Merge edilmedi** — bulut merge edemez.
- ⛔ CLAUDE.md bölme planının **3. ve 4. blokları** yapılmadı.
- ⛔ 📸 DONDURULMUŞ raporların gövdesine dokunulmadı (yalnız `konsey-yonetisim` başına atıf haritası notu).
- ⚠️ **GV-24 ve GV-25 RAPOR BOŞLUĞUDUR** — güvenlik raporunun §2.A.2'si 7 IDOR bulgusu sayıyor ama §3'e
  yalnız 5'i alınmış. KURAL 9 gereği satır açıldı, `⚠️` ile işaretlendi → **PO onaylamazsa düşer, kayıt kalır.**

### 8 · CANLIDA BAK

**Yok — bu tur yalnız belge.** Kullanıcının göreceği hiçbir şey değişmedi. Bu turun çıktısı: **65 kuyruk satırı +
15 karar kartı + 8 PO kalemi**, ve kuyruğun en üstünde artık **iki kimlik sahteciliği açığı** duruyor.

---

## ⭐ TUR BB — DEVİR ANALİZİNİN BELGE KISMI UYGULANDI (2026-09-21) · YALNIZ BELGE

> **Mod:** 🟥 BYPASS — yalnız belge. **Kod DEĞİŞMEDİ · DB/migration/seed YOK · kuyruk işi YAPILMADI · hiçbir şey SİLİNMEDİ.** Kaynak: `docs/raporlar/kesif/devir-analizi-2026-09-21.md` (dal `otonom/AZ-devir-analizi-20260921`, henüz merge edilmedi). Dal: `otonom/BB-devir-uygulama-20260921`.
> ⚠️ **Rapor bir FOTOĞRAFTI** — her kalem güncel main'e karşı yeniden doğrulandı; **11 iddiası düzeltildi, 1 satır hiç açılmadı.**

### AŞAMA I — PO'nun "EN ÖN SIRA" içerik bloğu (rapor §0.2)
- **Birim (KURAL 16):** "kalem" = `00-KARAR-TAKIP` B.1'de kendi numarası olan madde = **138…160 → 23 madde**.
- **Kuyruğa yeni giren: 18 satır** (I-01…I-18). **3'ü zaten CANLIDA** (143·144·145 — kod+test kanıtlı, satır AÇILMADI) · **2'si mevcut K-18 kapsamında** (147·148).
- **Hazır yazılı içerikli 6 kalem** işaretlendi — iş *"sıfırdan yaz"* değil *"hazır metni bağla"*: madde 151 (8/8) · 154 (3/3) · 155 (2/2) · 138 (8/8) · 139 (4/4) · 147 (5/5), hepsi `docs/raporlar/icerik/` altında dosya:satır ile.
- **Kapılar:** 8 🟢 · 7 🟡 · 3 🔴.
- ⛔ **I-13 — OCEAN motoru ARİTMETİKLE ölü doğrulandı:** `UserProfile.discD..C` **0-1** yazılıyor, `discToOcean` **0-100** bekliyor → çıktı **[49,75 – 50,30]**, eşikler **60/55/45** ⇒ **8 arketipin 6'sı erişilemez**, herkes fallback M1/m1 alıyor; hata/uyarı/log yok. **138·139·140 bu düzeltmeden ÖNCE kodlanırsa boşa gider.**
- ⚠️ **Raporun 5 iddiası çürüdü** (terim taraması yapmış, davranış taraması yapmamış): 149·150·155·157·158 → ⬜ değil **🟡 YARIM**; düzeltilmiş hâliyle yazıldı.

### AŞAMA Y — yol haritası + karar takibi devri (rapor §3)
- **18 satır** (Y-01…Y-18). **⛔ 1 satır AÇILMADI:** madde 71 (`SuspicionReport.tenantId`) — kart **G1-04 ⚫ GEÇERSİZ** (*"public-create + platform-only-read → tasarım kararı"*), **KURAL 15: kart kazanır**.
- **Birleştirilen:** madde 56+67 tek satır (Y-12); madde 67 tek başına açılmamalı — main'de üçüncü-taraf çerez **sıfır**, gizlilik sayfası bunu beyan ediyor ⇒ bugün çerez bandı yasal olarak gereksiz. **Sıra bağımlılığı 67→56** yazıldı. **PR #110 AÇIK** (GitHub teyidi).
- ⚠️ **Raporun 6 iddiası düzeltildi:** md.94 (1 uç değil **4 uç**) · md.100 (sorguyu yapan kod eklendi) · md.53 (`robots:` 0 değil; + `'use client'` kısıtı) · md.52 (OG **var**, eksik olan görsel) · md.61 (WhatsApp 2. kullanım) · md.126 (catch **ölü kod**, etki daha büyük).

### KARAR KARTLARI — 8 yeni (KARAR-30…37)
En yüksek numara doğrulandı (**KARAR-0…29**) → yeniler **30**'dan. İçindekiler tablosuna etkiye göre sıralı 8 satır. ⛔ **CEVAP satırları BOŞ.**
En çok iş açan: **KARAR-35** (canlı DB salt-okuma, 5+) · **KARAR-36** (yarım 3 teknik kalem, 4) · **KARAR-34** (kulüp, 3).

### BAYAT MERGE KURALI (rapor §0.3/§6)
- **Düzeltilen: 9 yer** (üstü çizili + tarihli GÜNCELLEME, silme yok): `CLAUDE.md:26` (atıf hedefleri kaymıştı) · `CLAUDE.md:178` · `09-DURUM.md:450` · `10-yol-haritasi.md:308,309` · `konu/07-calisma-tarzi.md:10,19` · `konu/11-…-disc.md:148` · `00-BELGE-HARITASI.md:61`.
- **YÜRÜRLÜKTE KALAN: 6** — hepsi `docs/devir/01,03,04,06`'da ve hepsi **📸 DONDURULMUŞ** → talimat gereği **dokunulmadı**. ⚠️ **Sıfır değil**; `devir/01` ve `devir/06` kendini *"kalıcı referans"* ilan ettiği için **PO kararı gerekir**.
- **Rapora iki düzeltme:** rapor "14 satır" dedi, listesinde **15** vardı (tarama da 15 buldu) · **`CLAUDE.md:163` bayat DEĞİL** (bulut gerçekten merge edemiyor) → değiştirilmedi.

### 09-DURUM ARŞİVLEME (rapor §12) — satır denetimli
| | satır |
|---|---:|
| kaynak önce | **463** |
| taşınan (18-236) | **219** |
| kaynak sonra | **246** (244 + 2 pointer) |
| **DENETİM** | 244 + 219 = **463** ✅ |
Arşiv: `docs/arsiv/09-DURUM-gecmis-katmanlar-2026-09-21.md` (236 satır). **İstisna:** satır 11-16 (yedek tablo zorunluluğu) taşınmadı — katman değil, yürürlükteki operasyonel emir.
**Yan kazanç:** 09-DURUM'da 1.000+ karakter satır **38 → 3**.

### SATIR İÇİ GEÇMİŞ ŞİŞMESİ (rapor §14) — yeni kural + ilk uygulama
`CLAUDE.md`'ye **"tarihsel iz satırın İÇİNDE tutulmaz"** kuralı (1.000 karakter tavanı + zorunlu taşıma denetimi). İlk uygulama:
| anahtar | önce | sonra | taşınan |
|---|---:|---:|---:|
| md.101 | 5.937 | **1.353** | 4.622 |
| md.30 | 5.156 | **3.266** | 1.926 |
| T5 | 3.377 | **2.453** | 957 |
Taşınan metin `## GEÇMİŞ` altında `§md.101`/`§md.30`/`§T5` başlıklarıyla **aynen** duruyor.
⚠️ **DÜRÜST NOT:** üçü de 1.000 tavanının **altına inmedi**; kalan şişmenin büyük kısmı **güncel metin** ve hangi kuşağın geçerli olduğu **editöryal karar** — otomatik kesme anlamı bozardı, ayrı tura bırakıldı. Ayrıca `docs/` genelinde 1.000+ satır sayısı **74 → 78 çıktı**, çünkü taşınan uzun satırlar arşivde **aynen** duruyor; kazanç motorun her tur okuduğu dosyada.

### KUYRUK HİJYENİ (rapor §7)
**5 yanlış kapı** — en kritiği **F-31 🟢→🟡** (⚠️ *tehlikeli yön*: ürün geri-bildirimi için uygun depo yok → yeni model = migration; 🟢 kalsaydı ajan şema değiştirip merge edebilirdi). Ayrıca K-13 🔴→🟡 · F-09 🔴→🟡 (numarasız KARAR = sonsuz kilit) · F-07 🟡→🔴 KARAR-19 · P-16 🟡→🟢.
**2 bayat durum kodda doğrulandı:** F-10 → **BITTI** (`menti/page.tsx:288,311,317`) · P-06 → **YARIM**.
**4 mükerrer** işaretlendi (silinmedi) · **5 kartsız gizli 🔴** damgalandı (U-19 → **KARAR-32** ile kapsandı).
**14 ajan çıkış blokeri** `⛔ ÇIKIŞ BLOKERİ (T…)` ile işaretlendi; kapı bölümüne anlamı + T1/T2/T3 testi eklendi.

### ⚠️ CANLI VERİTABANI ÇELİŞKİSİ — ÇÖZÜLMEDİ, İŞARETLENDİ
`CLAUDE.md` kendi içinde çelişiyor: *"canlı ve lokal **AYNI Neon**"* ↔ *"**PROD**: docker-compose Postgres, **Neon değil**"*. Kırmızı kural 1, yedek stratejisi ve "6 saat geri-yükleme" hesabı buna dayanıyor.
⛔ **Hangisi doğru KARAR VERİLMEDİ** — yalnız PO Dokploy'daki `DATABASE_URL`'e bakarak bilebilir. **Her iki satırın yanına** aynı not + `03-PO-ELLE-ISLER.md`'ye **ADIM 0** olarak en üste. O zamana kadar **EN KÖTÜ DURUM: migration/seed öncesi yedek ZORUNLU.**

### DİĞER
- **`03-PO-ELLE-ISLER.md`:** en üste *"⛔ CANLIYA ÇIKIŞ İÇİN ŞART"* (PO'nun 10 işi + T-testi + efor) + BA kılavuzuna atıf · **D grubu (14-18)** canlı gözlem testleri · `/health` zenginleştirmesi kod-teyidiyle güncellendi (tek istekte `db·smtp·cron·env`) · *"kartlar açıldı (KARAR-23+)"* **yanlış beyanı** düzeltildi (kartlar yoktu) · V-14 PO listesinden çıkarıldı (ajan işi).
- **Emeklilik:** `10-yol-haritasi` 📸 · `00-CIKIS-PLANI` 📸 (*"fikri ölmedi, taşındı"* + KATI TEST yerinde) · `00-KART-INDEKSI` 📸 snapshot · `00-ONCELIK-SIRASI` çelişkisi kapatıldı · `00-KUYRUK` **🔄 YAŞAYAN** damgası (*"TEK aktif iş kaynağı"*) · `00-KARAR-TAKIP` **emekli EDİLMEDİ**, rolü daraldı. ⛔ Hiçbir belge taşınmadı/silinmedi/yeniden adlandırılmadı.
- **`OTONOM-PROMPT.txt`:** sıra yeniden (0 çıkış blokeri → 1 AŞAMA I → 2 U,P → 3 V → 4 K,F,E,Y) · **🟢 bitince 🟡'lere geç** kuralı (PR aç, merge etme, Durum `PR-ACIK`, PR no zorunlu; migration'lı 🟡 PR başlığına ⛔ uyarısı) · kapanış koşulu genişletildi · `PR-ACIK` durum kodu · **`git stash push -u` → `-u` kaldırıldı** · açılışta **yarım kalmış push edilmiş dal** kontrolü.
- **`.gitignore`:** `docs/gelen/` eklendi. · **`belge-duzeni-rehberi` KURAL 2-B** genişletildi (indeks adı tek; `00-INDEKS.md` **yeniden adlandırılmadı** — 11 atıf/4 dosya, bir kısmı tarihsel).
- **F-19:** BEKLIYOR → **PR-ACIK** (dal `ac7a3f4`, 2026-09-21 08:56; **PR #231 açık**). ⛔ BITTI yazılmadı: merge olmadan canlıda değil.

### ⭐ PO İÇİN MERGE SIRASI
**1)** AZ raporu (#232) → **2)** BA kılavuzu (#233) → **3)** bu PR → **4)** F-19 (#231).
⛔ **BU PR MERGE EDİLMEDEN TERMİNAL BAŞLATILMAMALI** — `OTONOM-PROMPT.txt`'in yeni sırası ve AŞAMA I bu PR'da.


## TUR DEVAM (checkpoint 2) — TUR AD (2026-09-21) · /goal sürüyor
CANLIDA (bu checkpoint'e kadar toplam): P-11/12/13 · U-04/05/16 · V-01/02/08/11/14 · F-15/16/22/25/26 · **K-04 · K-11 · F-27 · V-09 · F-13** · (K-06→KARAR-29).
Pointer en son **b5415bd** (K-04+F-27). Açık PR YOK (hepsi merge).
**KALAN 🟢 BEKLIYOR:** K-05 · K-08 · K-10 · F-01 · F-10 · F-14 · F-19 · F-21 · F-28 · F-31 · F-32 · F-33 · P-10 · E-3.
Not: K-05/K-08/P-10 = BE+FE (pointer bump gerekir) · F-01 = büyük belge reorg · E-3 = hayalet BAĞLA kovası (E-1/E-2 raporlarına bağlı).

---

## TUR DEVAM — TUR AD (2026-09-21) · /goal: tüm 🟢 BEKLIYOR bitirilecek
İkinci dalga CANLIDA (merge + pointer bump 1ad47f5→81523fa): **V-01, V-02, V-08, V-11, V-14, F-25, F-22, F-15, F-16** + **F-26/U-05 zaten yapılmış (§5c)**.
- Ops (PR #84+#227): /health'e smtp+cron · 500 log meta+process handler · .dockerignore fix · platform mail gerçek probe.
- FE: görüşme paylaşım kartı (#226) · menti bekleme umut sinyali + DISC özgüven tonu (#228) · docker BACKEND_URL (#225).
Kalan 🟢 sürüyor (K-04/05/06/08/10/11 · F-01/10/13/14/19/21/27/28/31/32/33 · P-10 · V-09 · E-3).

---

## TUR ÖZETİ — TUR AD (2026-09-21) · 6 iş CANLIDA · TUR YARIM (kalan 🟢 ~22)

**Neden yarım:** Kuyrukta hâlâ 🟢 BEKLIYOR iş var → K-20 (belge senkronu) yapılmadı (DURMAMA: K-20 yalnız hiç 🟢 kalmayınca). Bağlam yönetimi için temiz kesim. Her iş ANINDA commit+push+merge edildi (ARA KAYIT).

### ✅ BİTTİ ve CANLIDA — 6 iş (hepsi merge + gerekirse pointer bump ile CANLIDA)
1. **P-11 (PR #82 BE + #222 FE):** Mentör panelinde artık **'Mentörlük Saati'** kartı — tamamlanan görüşmelerin toplam süresi (saat). Emek "kaç görüşme" değil "kaç saat" de görünür.
2. **P-12 (PR #82 BE + #222 FE):** Sertifikalı mentör panelde **'✅ Sertifikalı' rozeti** görür (eskiden koşulsuz 'Sertifikaya başla →').
3. **P-13 (PR #82 BE + #222 FE):** Mentör panelde **'Mentilerim' listesi** — aktif menti adları (sayacın arkasını açar). `dashboard-metrics` ucu 3 alanla genişledi (salt-okuma, IDOR korumalı, yeni tablo/kolon yok).
4. **U-16 (PR #83 BE):** `emailService.send()` boolean döner → feedback hatırlatma yanıtı **gerçek teslim** sayısını verir ('gönderildi' yalanı bitti); cron `reminderEmailSentAt`'i **yalnız teslimde** yazar (SMTP yokken tek-atımlık hatırlatma yanmaz).
5. **U-04 (PR #224 FE):** Kurum yöneticisi `pending-review` ekranında **gerçek onay/ret durumunu** görür (`/api/auth/me` → verificationStatus): onaylandı→olumlu+giriş · reddedildi→dürüst+gerekçe · düzeltme→not · bekliyor→'inceleniyor'.
6. **U-05 (ZATEN YAPILMIŞ, kod-teyit §5c):** Platform admin dashboard'da bekleyen kurum başvurusu **kırmızı sekme rozeti + kartı** zaten var (`platform/dashboard/page.tsx:160,239`). Agent-parça bitmiş; e-posta bildirimi PO adımı.

### KARAR BEKLİYOR — 0 yeni kart
Yalnız kararsız/geri-alınır 🟢 işler seçildi. Açık KARAR-1..28 değişmedi, CEVAP satırlarına dokunulmadı.

### BAŞARISIZ — 0

### CANLIDA KONTROL EDİLECEKLER (PO gözle bakacak)
- Mentör panelinde 'Mentörlük Saati' kartı + 'Mentilerim' listesi (P-11/P-13)
- Sertifikalı mentör panelinde 'Sertifikaya başla' yerine '✅ Sertifikalı' rozeti (P-12)
- Hatırlatma gönderim yanıtı gerçek sayı; SMTP yokken hatırlatma yanmıyor (U-16)
- Kurum bekleme ekranı (`/onboarding/stk/pending-review`) gerçek durumu gösteriyor (U-04)

### PO'NUN KENDİ YAPMASI GEREKENLER
`docs/otonom/03-PO-ELLE-ISLER.md`. Bu turdaki işlerin tam etkisi için: **SMTP değerleri** (U-16 gönderim / U-04·U-05 e-posta bildirimi) + **TENANT_NOTIFICATIONS_ENABLED** kararı (§4.1).

### KUYRUK SON DAĞILIMI
- BITTI (bu tur): 6 · **kalan 🟢 BEKLIYOR ~22** (K-04/05/06/08/10/11 · F-01/10/13/14/15/16/19/21/22/25/26/27/28/31/32/33 · P-10 · V-01/02/08/09/11/14 · E-3). 🟡/🔴 sabit (KARAR bekleyenlere dokunulmadı).
- **Test:** Backend `mentor-metrics.unit.test.ts` 9 (yeni) + `emailService.test.ts` 4→6; FE suite 111→121 (`mentor-panel-data` 5 + `pending-review-status` 5). KURAL 14: test adları+sayıları CI logunda doğrulandı (68 backend test dosyası; #82/#83 CI yeşil).

### BACKEND
- pointer eski `19e7703` → yeni `1ad47f5` (P-11/12/13 #82 + U-16 #83). Ata teyidi ileri-sarım güvenli. Çatı pointer == backend main HEAD → **SARKMA YOK** (PR #223).

### DOKUNULMAYANLAR / STASH
⛔ DB/migration/seed YOK · şema DEĞİŞMEDİ · `server.ts` yasak bölge DOKUNULMADI · auth guard/KVKK-silme/matching motoru DEĞİŞMEDİ · KIRIK TEST YOK (yalnız test EKLENDİ) · `docs/gelen/` ELLENMEDİ · KARAR CEVAP satırı doldurulmadı · #110 ELLENMEDİ · hiçbir şey silinmedi.
STASH: `stash@{0}: stray-docx-preserve` — ÖNCEKİ oturumdan, bu turda oluşturulmadı, DOKUNULMADI.

---

## TUR ÖZETİ — TUR AC (2026-09-21) · 4 iş CANLIDA · TUR YARIM (kalan 🟢: ~36)

**Neden yarım:** Kuyrukta hâlâ çok 🟢 var → K-20 (belge senkronu) yapılmadı (DURMAMA: K-20 yalnız hiç 🟢 kalmayınca). Bağlam yönetimi için temiz kesim.

### ✅ BİTTİ ve CANLIDA — 3 iş merge (+ 1 PR CI'da) — hepsi FE, ayrı PR, tek tek revert edilebilir
1. **F-20 (PR #218):** Bekleyen menti bekleme odasında **'🔔 Bildirimlere izin ver'** düğmesi görüyor; izin verince/reddedince durum metni. `NotificationOptInButton` (SSR/desteksiz tarayıcıda hiçbir şey render etmez). =G5-04.
2. **F-29 (PR #219):** SEO paketi — `app/sitemap.ts` + `app/robots.ts` + `metadataBase`; `lang` tr→tr-TR. Tek kaynak `getSiteUrl()` (env `NEXT_PUBLIC_SITE_URL`, dev fallback). =G7-03.
3. **K-12 (PR #220):** Profil › 'Verilerim'e **'Görüntüle'** — `/api/me/data-export` ham JSON yerine okunur Türkçe bölümler (kimlik/profil · etkinlik sayıları · rıza geçmişi). Yeni uç YOK; mesaj içeriği/karşı taraf PII'si özete girmez.
4. **U-10 (PR #221):** Boş-durumlar — admin/questions DISC+kuruma-özel kartları boşken kaybolmuyor/yönlendirici metin; book-meeting müsaitlik boşken kart gizlenmiyor. Kapsam denetimi: mentör toplantı talepleri P-09'da zaten çözülmüş, admin/certification pratikte boş olmuyor → dokunulmadı.

### KARAR BEKLİYOR — 0 yeni kart
Yalnız kararsız/geri-alınır 🟢 işler seçildi. Açık KARAR-1..28 değişmedi, CEVAP satırlarına dokunulmadı.
**K-06 (öğrenme yolculuğu diğer şık açıklaması) ATLANDI:** açıklamalar API'de **bilinçli** istemciye yüklenmiyor ("cevap anahtarı sızmasın", `ScenarioGuideEngine.tsx:271`) + backend/repo-arası değişiklik → deliberate design, silme/değiştirme protokolü gereği bu turda dokunulmadı. Sonraki tur ürün kararı olarak değerlendirilmeli.

### BAŞARISIZ — 0

### CANLIDA KONTROL EDİLECEKLER (PO)
- Bekleyen menti panelinde '🔔 Bildirimlere izin ver' düğmesi (F-20)
- Profil › Verilerim › 'Görüntüle' → okunur veri özeti (K-12)
- Randevu ekranında müsaitliği olmayan mentörde yönlendirici kart (U-10)
- (SEO teknik — kullanıcı görmez) /sitemap.xml ve /robots.txt yanıt veriyor mu (F-29)

### PO'NUN KENDİ YAPMASI GEREKENLER
`docs/otonom/03-PO-ELLE-ISLER.md` (değişmedi). F-29 canlıda tam etki için **`NEXT_PUBLIC_SITE_URL`** prod domaine set edilmeli (yoksa sitemap dev fallback URL üretir).

### KUYRUK / TEST / DOKUNULMAYANLAR
- Backend işi YOK → **submodule pointer DEĞİŞMEDİ.** Şema/migration/seed YOK.
- Yeni FE testleri: notification-optin 4 · site-url 3 · kvkk-summary 5 · book-meeting boş-müsaitlik 1. Her PR'da çatı CI 8/8 (build+tsc+lint+vitest+integration+e2e).
- ⛔ DOKUNULMAYAN: auth/KVKK-silme/matching/şema/migration/seed · `server.ts` yasak bölge · `docs/gelen/` · KARAR CEVAP satırları · #110 · hiçbir şey silinmedi.
- ⚠️ **Working-tree'de ajanın DOKUNMADIĞI değişiklik:** `docs/otonom/OTONOM-PROMPT.txt` unstaged (M) — önceden var, benim commit'lerime dahil edilmedi (§7 gereği dokunulmadı).

---

## TUR ÖZETİ — TUR AB (2026-09-20 gece) · 10 iş CANLIDA + prompt güncellemesi · TUR YARIM (kalan 🟢: 40)

**Neden yarım:** K-20 (belge senkronu) YALNIZ hiç 🟢 iş kalmayınca yapılır (DURMAMA KURALI D.1). Kuyrukta hâlâ
**40 tane 🟢 BEKLIYOR** iş var → K-20 YAPILMADI, tur yarım kapandı. Bağlam dolduğu için temiz kesim (D.4).
Sonraki tur aynı promptla kaldığı yerden devam eder.

### ✅ BİTTİ ve CANLIDA — 10 kuyruk işi (+ prompt + pointer bump) — hepsi ayrı PR, tek tek revert edilebilir
**Frontend (çatı, canlı):**
1. **P-02 (PR #211):** Menti "Gönderilen Talepler" sayfa yenilenince artık sıfırlanmıyor (kalıcı `/api/conversations`).
2. **P-03 (PR #209):** Menti panelinde DISC arketip "aha" kartı rapeli — kayıttan sonra tekrar görülebiliyor.
3. **P-07 (PR #214):** Görüşme değerlendirmesi sonrası kaçıncı görüşme olduğuna göre kişiye özel kutlama (jenerik değil).
4. **P-09 (PR #210):** Yeni mentör boş panelde 'Toplantı Talepleri' kartını + doğru rol metnini görüyor.
5. **P-14 (PR #216):** Mentör panelinde emeğini anlatan takdir cümlesi ('💚 …').
6. **U-14 (PR #212):** Süresi dolmuş davette 'Yeni davet iste' + 'Giriş yap' düğmeleri.
**Backend (submodule, pointer #215 ile CANLIDA):**
7. **V-10 (PR #78):** `/users/:id/export` rate limit (KVKK export bypass'ı kapandı).
8. **V-07 (PR #79):** Hatırlatma mailinde batch tavanı + toplantı-başına cooldown (SMTP spam koruması).
9. **V-13 (PR #80):** `/api/tags/suggest` requireTenant+requireAuth ile mount (fail-closed ölü uç çözüldü).
10. **F-06 (PR #81):** Kalibrasyon audit yazımı artık yutulmuyor (await + catch, G1-14).
**Altyapı:** OTONOM-PROMPT.txt'ye DURMAMA KURALI + ARA KAYIT eklendi (#208) · backend pointer `4528048`→`19e7703` bump (#215).

### KARAR BEKLİYOR — 0 yeni kart açıldı
Bu tur yalnız kararsız/geri-alınır 🟢 işler seçildi. Açık KARAR-1..28 değişmedi, CEVAP satırlarına dokunulmadı.

### BAŞARISIZ — 0

### CANLIDA KONTROL EDİLECEKLER (PO gözle bakacak)
- Menti panelinde DISC arketip kartı tekrar görünüyor mu (P-03) + gönderilen talep sayısı yenilenince korunuyor mu (P-02)
- Görüşme değerlendirmesi sonrası kilometre-taşı kutlaması (P-07)
- Yeni mentör boş panelinde 'Toplantı Talepleri' kartı + takdir cümlesi (P-09/P-14)
- Süresi dolmuş davette 'Yeni davet iste' düğmesi (U-14)
- (Backend) `/api/tags/suggest` artık 201 dönüyor · hatırlatma maili tekrar tetiklenince spam atmıyor

### KUYRUK SON DAĞILIMI
- **BITTI (bu tur):** 10 · **kalan 🟢 BEKLIYOR: 40** (K-04/05/06/08/10/11/12 · F-01/10/13/14/15/16/19/20/21/22/25/26/27/28/29/31/32/33 · P-10/11/12/13 · U-04/05/10/16 · V-01/02/08/09/11/14 · E-3)
- 🟡 ve 🔴 sabit (KARAR bekleyenlere dokunulmadı).
- **Test:** Backend CI 67 test dosyası passed (yeni: reminder-batch-cooldown 2 + export-id-rate-limit 1 + tags-suggest-mount 2; F-06 audit testi deterministik) · Frontend 25 test dosyası passed (yeni: disc-recall-card·mentor-empty-panel·mentiMetrics+4·milestones 6·mentorAppreciation 4·join-expired). KURAL 14: test adları CI logunda doğrulandı.

### BACKEND
- pointer eski `4528048` → yeni `19e7703` (V-07/10/13/F-06). Ata teyidi ileri-sarım güvenli. Çatı pointer == backend main HEAD → **SARKMA YOK.**

### PO'NUN KENDİ YAPMASI GEREKENLER
`docs/otonom/03-PO-ELLE-ISLER.md` (değişmedi). En kritik 3: avatar kalıcı disk (K-04/Dokploy) · SMTP değerleri (V-01/U-15) · yedek+restore provası.

### DOKUNULMAYANLAR
⛔ DB/migration/seed YOK · şema DEĞİŞMEDİ · `server.ts` rate-limit/trust-proxy (yasak bölge) DOKUNULMADI · auth guard/KVKK-silme/matching motoru DEĞİŞMEDİ · KIRIK TEST YOK (yalnız test EKLENDİ) · `docs/gelen/` ELLENMEDİ · KARAR CEVAP satırı doldurulmadı · #110 ellenmedi · hiçbir şey silinmedi.

---

## TUR ÖZETİ — TUR AA (2026-09-20) · OTONOM-PROMPT güncelleme + 5 uçtan-uca (U) + 1 temizlik CANLIDA

**Neden bu tur:** OTONOM-PROMPT.txt 2026-09-19'dan bayattı (en kritik: ARA KAYIT kuralı yoktu → önceki gece 2 turun emeği push edilmeden kayboldu). Önce prompt güncellendi, sonra kuyruktaki uçtan-uca (U) yolculuğu tıkayan 🟢 FE düzeltmeleri işlendi. Her iş bittiğinde ANINDA commit+push+PR (ARA KAYIT).

### BİTTİ ve CANLIDA — 6 iş merge edildi (hepsi FE; backend/şema/DB DEĞİŞMEDİ)
1. **Bölüm A — OTONOM-PROMPT.txt (PR #200):** 7 madde eklendi (ARA KAYIT kuralı · kapı politikası gevşetmesi · 6 aşama · PO/ajan ayrımı · 3. mod REMOTE CONTROL · yasak bölge server.ts). *Belge — kullanıcıya görünmez ama sonraki turların davranışını düzeltir.*
2. **U-02 (PR #201):** Menti/mentör "Görüşmelerim"de online görüşmenin **katılım linkini** görüp tıklıyor (yüz yüze→konum, telefon→numara). Eskiden backend gönderiyordu ama 0 yerde render ediliyordu.
3. **U-07 (PR #202):** Onay bekleyen kullanıcı `/pending-approval`'da **kendi e-postasını** görüyor (eskiden boştu — token yoktu).
4. **U-03 (PR #204):** Davet ekranında link/şablon **hatası artık görünüyor** (eskiden sessizdi, 403 dahil); kopyalanan davet metninde **kurum adı dolu** (eskiden boştu).
5. **U-09 (PR #203):** Boş onay/bekleme panelinde yanıltıcı "🎉 Tüm kayıtlar işlendi" yerine **doğru metin + "Davet gönder" düğmesi**.
6. **U-11 (PR #205):** Kurum onboarding son adımında davet süresi **30 gün** (koddaki gerçek; eskiden "90 gün" yazıyordu).
7. **F-30 (PR #206):** `LoginForm` bayat "Sprint 14" yorumu temizlendi (yalnız yorum).

### KARAR BEKLİYOR — 0 yeni kart açıldı
Bu turda ürün kararı gerektiren işe girilmedi (yalnız kararsız, geri-alınır FE düzeltmeleri seçildi). Mevcut açık KARAR-1..28 değişmedi.

### BAŞARISIZ — 0

### CANLIDA KONTROL EDİLECEKLER
- "Görüşmelerim"de online görüşmede katılım linki tıklanabilir mi (U-02)
- Onay bekleyen ekranında e-posta dolu mu (U-07)
- Davet metni kopyalanınca kurum adı dolu mu + hata görünüyor mu (U-03)
- Yeni kurumda boş onay panelinde "Davet gönder" düğmesi var mı (U-09)

### PO'NUN KENDİ YAPMASI GEREKENLER
`docs/otonom/03-PO-ELLE-ISLER.md` (değişmedi). En kritik 3: avatar kalıcı disk (K-04) · SMTP değerleri (U-04/U-15/V-01) · yedek+restore provası (madde 120/G1-28).

### KUYRUK SON DAĞILIMI
6 iş 🟢'dan BITTI'ye · 🟡 sabit · 🔴 12 sabit. Test: FE suite 78/78 (11 yeni test bu tur), 6 PR'ın hepsinde CI 8/8. Backend işi YOK → submodule pointer değişmedi (`4528048`).

### DOKUNULMAYANLAR
⛔ DB'ye komut GİTMEDİ · migration YOK · seed YOK · şema DEĞİŞMEDİ · `server.ts` rate-limit/trust-proxy (yasak bölge) DOKUNULMADI · auth guard/KVKK/matching dosyası DEĞİŞMEDİ · KIRIK TEST YOK (yalnız 11 test EKLENDİ) · `docs/gelen/` ELLENMEDİ · KARAR CEVAP satırı doldurulmadı · ölü `config.invitationTokenExpiry` SİLİNMEDİ (protokol).

---

## TUR ÖZETİ — TUR Z (2026-09-20) · W+X denetimleri kuyruğa + 3 güvenlik/sağlamlık düzeltmesi

**Neden bu tur:** 2026-09-19'daki iki büyük denetim (X uçtan-uca kurum yolculuğu, W operasyonel hazırlık) rapor olarak duruyordu ama kuyruğa hiç işlenmemişti (öksüz bulgu). Bu tur işledi + birbirine dokunmayan 3 açığı kapattı.

### ⭐ CANLIDA BAK (PO gözle/operatör bakacak) — 3 düzeltme canlıya alındı
1. **Güvenlik (IDOR):** Bir mentör, başka bir mentörün ID'sini kullanarak onun adına "görünürlük opt-in" kaydı **artık yazamıyor** — 403 alıyor (kendi adına veya ADMIN yazabilir). *(backend PR #76)*
2. **Sağlamlık (/health):** Veritabanı çökerse `/health` artık **503** dönüyor (eskiden "her şey yolunda" diyordu). Docker konteyneri gerçekten "unhealthy" görünür. *(backend PR #77)*
3. **Beyaz ekran gitti:** Bir sayfa çökerse kullanıcı beyaz ekran yerine **"Bir şeyler ters gitti" + Tekrar dene / Ana sayfaya dön** görüyor; bilinmeyen adres → **404 ekranı**. Hata ayrıntısı kullanıcıya gösterilmiyor (güvenlik). *(çatı PR #197)*

### Belgeye işlenenler (kod değil, kuyruk/karar)
- **`00-KUYRUK` AŞAMA U** (X raporu, U-01..U-19) + **AŞAMA V** (W raporu, V-01..V-15). Numaralar "aday" — PO onaylayınca kesinleşir.
- **`.env.example`** 17 belgelenmemiş ortam değişkeni eklendi + 3 ölü ayar işaretlendi *(backend PR #75)*.
- Yeni **`docs/otonom/03-PO-ELLE-ISLER.md`** — senin elle yapman gereken kod-dışı işler (Dokploy avatar diski, SMTP, yedek, NODE_ENV, kurum bildirimi env…), her biri "nasıl anladığın" doğrulama adımıyla.
- **`01-KARARLAR` KARAR-23..28** açıldı — 6 yeni ürün/hukuk kararı seni bekliyor (kurum bildirimleri · hata izi panele · yedek nereye · yedek tablo silme · dış hata izleme · ölü LLM env). **Cevap bekliyor.**

### ⛔ SENİN ELLE YAPMAN GEREKENLER (özet — ayrıntı 03-PO-ELLE-ISLER.md)
En acil: **avatar için kalıcı disk (Dokploy)** · **düzenli yedek + geri-yükleme provası** (🔴 çıkış blokeri) · **NODE_ENV=production teyidi** · **SMTP doldur** · **TENANT_NOTIFICATIONS_ENABLED=true**.

### Doğrulama
- 3 kod PR'ı CI yeşil; yeni testler CI log'unda doğrulandı (KURAL 14): IDOR 3 test (→468), /health 2 test (→467), frontend 8/8.
- `npm run verify`: tsc/eslint/frontend(69 test)+build ✓; backend entegrasyon TEST_DATABASE_URL guard'ıyla durdu (lokalde beklenen) → asıl kanıt CI.
- Submodule pointer `61aae07 → 4528048` (backend main HEAD, ata teyitli). Çatı pointer == backend main HEAD ✅.

### ⛔ DOKUNULMAYANLAR
Yeni ürün kodu (3 düzeltme dışında) YAZILMADI · DB/migration/seed YOK · şema DEĞİŞMEDİ · `server.ts` rate-limit/trust-proxy'ye DOKUNULMADI (K-14/F-04 yasak bölge) · 🔴 sayısı **12** sabit · hiçbir CEVAP satırı doldurulmadı · #110 (MERGE ETME) ellenmedi · hiçbir şey silinmedi (ölü ayarlar yalnız işaretlendi).

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

**TUR 3 — 2026-09-19 · AŞAMA E (E-1 niyet arkeolojisi + E-2 triyaj) · salt-okuma keşif**
- **E-1 ✅ BİTTİ** — Rapor: `docs/raporlar/kesif/hayalet-envanter-2026-09-19.md`. 4 paralel salt-okuma alt-ajan.
  - Envanter (baştan çıkarıldı): **35 öksüz backend ucu** · **4 ölü şema alanı** (1'i WIP internalNote, 1'i verifiedBy) · **3 mount edilmeyen bileşen**.
  - Eski "~56 uç / ~44 kalem" repoda kanıtlanamadı — gerçek 2026-08-02 raporu **6 uç** saymış; "~56" başka oturumun şişmiş sayısı.
  - Yanlış-pozitif elendi: `platform/tenants/:id/meetings` aslında çağrılıyor. `IndustryNode.parentId` relation'la okunuyor (ölü değil).
  - **GEREKÇE BULUNAMADI = 1** (yalnız `Tenant.verifiedBy` alanının kendi niyeti; kardeş alanlar belgeli).
- **E-2 ✅ BİTTİ** — 4 kova: 🔧BAĞLA~7 · 🔒KARANTİNA ADAYI~13 (hepsi mevcut KARAR-11) · ⚙️OPERASYON~7 · ❓SOR (KARAR-9/10/12/15).
  - **6 YENİ kümelenmiş karar kartı: KARAR-12..17** (01-KARARLAR sonuna). ≤10 sınırı korundu.
  - Mükerrer uçlar (KARAR-11), kulüp+iş ilanları (KARAR-9), OCEAN/SJT+triggersOn/signalsArchetype (KARAR-10) → mevcut kartlara REFERANS, tekrar kart açılmadı.
  - Kart açılmayan düşük-değer (sonraki tura): tags/suggest · /requests GET · verifiedBy audit yazımı (teknik).
- **⛔ Kod/DB/şema/seed DEĞİŞMEDİ · frontend/ backend/ yalnız OKUNDU · hiçbir şey silinmedi/karantinaya alınmadı · 01-KARARLAR CEVAP satırlarına dokunulmadı (yalnız sona kart eklendi).**
- **PO'YA:** 01-KARARLAR'da artık **17 karar** cevap bekliyor (KARAR-1..11 eski + KARAR-12..17 yeni). Hepsi tek oturumda cevaplanabilir.


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

---

## TUR 2 — 2026-09-19 · BİLANÇO DENKLEŞTİRME (AŞAMA F) · salt-okuma denetim + yalnız belge yazımı
**Mod:** 🟩 PLANLA (kod/DB/şema DEĞİŞMEDİ) → SONDA yalnız belge yazımı. 8 paralel salt-okuma alt-ajan (Faz 1-8).

**Ne yapıldı:** `00-ONCELIK-SIRASI-2026-08-28.md` (2026-08-28'de yazılmış, 21 gün işlenmemiş "87 işleme al" sırası)
Faz 0-8'deki her kalem **bugünün koduna karşı** doğrulandı (dosya:satır kanıtı). Açık kalemler `00-KUYRUK.md` AŞAMA F'ye devredildi.

- **ADIM 0 (tekrarı önle):** `T3-D-tur1-denklestirme.md` okundu — o belge FARKLI bir işti (TUR-1 sayım-tahminlerini
  denkleştirdi: ~103/~140 → kesin sayı, 🟡 kodu ekleme, ThemeToggle düzeltmesi). "87 işleme al" kalemlerini koda karşı
  doğrulama YAPILMAMIŞTI → bu tur o boşluğu doldurdu, tekrar yok.
- **Taranan:** ~71 öncelik-sırası kalemi (birim: sırada adı geçen satır; G9-grubu tek satır=12 belge kalemi temsil eder).
  Kaynağın "87" sayısı tek tek G-kartını sayar (G9 tek başına 16 kart) → fark birim tanımından, çelişki değil.
- **Dört durum dağılımı:** ✅ 20 · 🟡 14 · ⬜ 31 · 🗑️ 2 (G2-10 çift-çarpım çürütüldü #138, G10-23 dosya silinmiş) ·
  ⚫ geçersiz/bilinçli-devredildi 3 (G1-01 yaş→metin beyanı · G1-17 backend'de çözüldü · G1-04 public form, izolasyon açığı değil) · ❓ 1 (G3-16/18 canlı içerik = DB teyit turu).
- **⭐ "Yapıldı sanılıp yapılmamış" = 0.** Tersine, **"yapılmamış sanılıp YAPILMIŞ" (kart bayat, kod ilerlemiş) = 5:**
  - **G3-19** etiket havuzu — kart ⬜ der; `schema.prisma:843-880 PendingTag` + `tagController` (suggest/approve/merge/reject) + admin route'ları VAR.
  - **G2-11** davetli=onaylı tetiği — kart "kodda yok" der; `authController.ts:165-169` inviteToken→APPROVED tetiği VAR (PO 2026-09-01 Seçenek A).
  - **G4-02** menti-yönü "neden uyumlu" — kart eksik der; `menti/page.tsx:288-291 compatibilityReason` render ediliyor.
  - **G4-04** yönetici atama + onaylı liste — kart 🟡 der; `(admin)/admin/managers/page.tsx` tam panel.
  - **G10-25** profil düzenleme — kart ❓ der; `(dashboard)/profile` + `lib/api/profile.ts` çalışıyor (YANLIŞ SORU TUZAĞI'nın klasik örneği).
- **Örtüşme (yeni satır AÇILMADI, mevcut K- satırına Not eklendi):** K-13 = G10-01(c)/G4-09/G4-10/G10-23 · K-14 = G1-28/F-04/F-05 ·
  K-16 = G3-08/G3-09 · K-04 = G8-01/G8-02. (⚠️ K-16'da sayı bayatı yakalandı: KARAR-3 metni "22/88" der, kod 20/80.)
- **AŞAMA F'ye eklenen:** **33 satır** (F-01..F-33). Faz dağılımı: Faz1=1 · Faz2=2 · Faz3=4 · Faz4=0(→KARAR-19) ·
  Faz5=4 · Faz6=3 · Faz7=8 · Faz8=11. Faz sırası korundu (Faz1 üstte, Faz8 altta).
- **Açılan yeni KARAR kartı: 4** — KARAR-18 (PO-manuel işler listesi, 11 kalem) · KARAR-19 (KVKK geri-dönülmez küme: kurum silme + eski-rıza + iz saklama) ·
  KARAR-20 (mentör reddi akışı var mı) · KARAR-21 (STK anket cevap tipi). ≤5 sınırı korundu.
- **Faz 5 tespiti:** algoritma çekirdeğinin çoğu (OCEAN/sektör motoru bağlama, yeni %45/30/25 skor + 2 veto, B12 göç)
  **KARAR-10'a kilitli** ve o karar cevapsız → F-11 tek satırda kümelendi. Motorlar YAZILI ama `matching.ts` çağırmıyor.
- **⛔ DOKUNULMAYANLAR:** frontend/ backend/ yalnız OKUNDU · DB/migration/seed YOK · şema DEĞİŞMEDİ · hiçbir şey silinmedi/karantinaya alınmadı ·
  01-KARARLAR CEVAP satırlarına dokunulmadı (yalnız sona KARAR-18..21 eklendi) · mevcut K- işleri (K-03/05/06/08/10/11/12...) YAPILMADI.
- **Değişen dosyalar:** `00-KUYRUK.md` (AŞAMA F + 4 K-satırı Not) · `01-KARARLAR.md` (KARAR-18..21) · `02-ILERLEME.md` (bu kayıt) ·
  `00-ONCELIK-SIRASI-2026-08-28.md` (devir notu, gövde silinmedi).

---

## TUR 3 — 2026-09-19 · BÖLÜM A: backend merge + submodule pointer bump
**Mod:** 🟥 BYPASS (yalnız merge + pointer, ürün kodu YAZILMADI).

- **Backend PR #72** (`otonom/G-platform-email-env-20260919`) — `PLATFORM_ADMIN_EMAIL` `.env.example`'a eklendi +
  production'da varsayılan değerdeyse `console.warn` (throw DEĞİL) + unit test.
- **A.1 doğrulama:** CI yeşil (ci pass 2m36s). **throw kontrolü: kod satırlarında throw YOK** — 3 `throw` sözcüğü de
  yorum satırında (JSDoc + inline gerekçe). Production yolu `console.warn` (`config.ts`). Değişen dosyalar tam 3 izinli:
  `.env.example` · `src/config.ts` · `tests/platformAdminEmail.unit.test.ts`. Fazlası YOK.
- **A.2 merge:** squash merge, dal silindi. Backend main HEAD → `f229ffe`.
- **A.3 pointer bump:** eski çatı pointer `1304790` → yeni `f229ffe`. Ata teyidi: `merge-base --is-ancestor 1304790 f229ffe` = 0 (ileri sarım GÜVENLİ).
  Çatı PR **#185** (`otonom/J-pointer-bump-...`), CI 8/8 yeşil (backend+frontend+integration+e2e, iki koşu), merge edildi.
- **A.4 teyit:** çatı pointer `f229ffe` == backend main HEAD `f229ffe` → **SARKMA YOK.** Düzeltme artık pointer üzerinden canlıya çıkabilir.
- **⚠️ PO YAPACAK:** Dokploy ortam değişkenlerine `PLATFORM_ADMIN_EMAIL` eklenmeli (yoksa kod yalnız uyarı loglar, giriş e-postası varsayılanda kalır).

---

## TUR 3 — 2026-09-19 · BÖLÜM B: kayıt düzeltmeleri (belge-only)
**Mod:** 🟥 BYPASS (yalnız belge; ürün kodu YAZILMADI). Dal: `otonom/I-kayit-duzeltmeleri-20260919`.

- **B.1 — 5 bayat G-kartı kod-teyidiyle düzeltildi** (eski durum üstü çizili, tarihli DÜZELTME notu):
  - G3-19 (G3-icerik.md) ⬜/❓ → ✅ `PendingTag` + `tagController` + adminRoutes:63-66.
  - G2-11 (G2-eslestirme-psikometri.md) ❓ → ✅ `authController.ts:165-169` invite→APPROVED. Eski KOD-TEYİT yanlış dosyaya (`selfServeController`) bakmıştı → o da düzeltildi.
  - G4-02 (G4a-panel-akis.md) ⬜ → ✅ `menti/page.tsx:290 compatibilityReason`.
  - G4-04 (G4a-panel-akis.md) 🟡 → ✅ `managers/page.tsx:24,37,45`.
  - G10-25 (G10-olu-kod-terk.md) ❓ → ✅ profil düzenleme çalışıyor + ⛔ **YANLIŞ SORU TUZAĞI 5. TEKRAR** uyarısı karta yazıldı (6. kez olmasın).
- **B.2 — Sertifika sayısı: "22/88 bayat" DEĞİLMİŞ (düzeltmenin düzeltmesi).** Kod-teyit: **iki sayı da gerçek, farklı kaynak.**
  - "22 senaryo / 88 şık" = YAZILI İÇERİK (`docs/raporlar/icerik/sertifika-oturum1/2/3-...-2026-09-08.md`, 3 belge, 11 konu×2). Doğru.
  - Seed kodu `seed-certification.ts` = **20 senaryo / 80 şık** (eski sürüm; 20× CERT_T, 80 options, 10 topic). Finalize 22/88 içeriği seed'e **taşınMADI** → K-16 bugün seed atarsa 20/80 çıkar.
  - ⚠️ **SAYI DÜZELTMESİ-2 (2026-09-21, içerik konseyi ① — kaynak-teyitli):** ~~[ESKİ · 2026-09-21] fark yalnız **2 senaryo + 8 şık** (20/80 → 22/88)~~ — **BU YANLIŞTI.** Doğrusu: `tam.md` (= seed'in birebir kaynağı, `seed-certification.ts:7`) 20 sahne sundu, finalize içerik bunların **yalnız 5'ini** aldı (%25) — yani seed'deki **20 senaryonun 15'i gerekçeli olarak ELENDİ** ("ELENEN SAHNELER" tabloları: yüzey ayrımı/çelişki). Kalan **5'inin 5'i de yeniden yazıldı** (5/5'inde metin farkı, **birinde puan anlamı TERS DÖNDÜ**). ⛔ Pratik sonuç: taşınacak şık sayısı 8 değil **88'in TAMAMI**; düşecek senaryo **15**. Efor **S değil L**. Kanıt: `docs/raporlar/kesif/konsey-icerik-2026-09-21.md:16-19,118-122`.
  - Düzeltilen yerler: KARAR-3 (SAYI DÜZELTMESİ notu) + 00-KUYRUK K-16 satırı + AŞAMA F örtüşme notu (PR #184'teki "sayı bayat" ifadem düzeltildi). `10-yol-haritasi:152` + `00-KARAR-TAKIP:281` DOKUNULMADI (içeriği doğru anlatıyorlar). `docs/gelen/*` ⛔ ellenmedi (PO-yerel).
- **B.3 — "En fazla 5/10 karar kartı" ÜST SINIRI KALDIRILDI** (PO). İki yer: CLAUDE.md ("Karar kartı sayısı — ÜST SINIR YOKTUR" + KÜMELE/SIRALA/İNDEKS) + 00-KUYRUK E-2 satırı ("≤10" üstü çizili + GÜNCELLEME).
- **B.4 — 01-KARARLAR.md başına İÇİNDEKİLER eklendi** (22 satır, KARAR-0..21). "Kaç işi açar" = 🔴 bağlı K-/F-/E- satırı, kanıtlı, etkiye göre sıralı. En çok iş açan 3: **KARAR-11 (2: K-13/E-5)** · KARAR-10/1/2/3/4/5/6/7/19/20/21 (1'er). ⚠️ K-19 kapı etiketi "KARAR-8, KARAR-10" olası yazım hatası (içeriği KARAR-6/7) — indekste içeriğe göre eşlendi + not düşüldü, kart gövdesi taşınMADI.
- **B.5 — PO KARAR MUTABAKATI** (`00-PO-KARARLARI-2026-08-27.md` okundu, kod-teyitli):
  - 6 karta "⚠️ AĞUSTOS SİNYALİ" notu eklendi (A/B/C DEĞİL, yalnız yön): KARAR-9 (kulüp kurumu aktif/modül ⏸️) · KARAR-10 (bağlama yönü) · KARAR-11 (karantina yönü) · KARAR-19 (G1-15/16/29 işleme-al) · KARAR-20 (varsayım hatalı) · KARAR-21 (C dışlanmış).
  - ⛔ Hiçbir CEVAP satırı DOLDURULMADI (yalnız işaret). Teyit: 21 boş CEVAP + KARAR-0 (eski PO cevabı) + KARAR-18 (isteğe bağlı hatırlatma).
  - **Ağustosta ✅ işleme-al ama kuyrukta karşılığı OLMAYAN kalem: 0.** ⏸️ şimdilik-alma kalemleri G4-11/G4-12 (v2 anomali/büyüme) + G11-01/02 (uzun-vade strateji) kuyrukta iz taşımıyor — ama ⏸️ oldukları için bu normal (eksik iş değil, görünürlük boşluğu; kuyruğa EKLENMEDİ).
- **⛔ DOKUNULMAYANLAR:** frontend/backend kaynak DEĞİŞMEDİ · DB/migration/seed YOK · şema DEĞİŞMEDİ · hiçbir şey silinmedi · #110 ellenmedi · `panel-denetimi-mentor-menti-2026-09-19.md` ellenmedi · `docs/gelen/*` ellenmedi · CEVAP satırları dolmadı.
- **Değişen dosyalar:** `01-KARARLAR.md` (indeks + KARAR-3 sayı notu + 6 ağustos notu) · `00-KUYRUK.md` (K-16/F-notu + E-2 sınır) · `CLAUDE.md` (kart sınırı) · `G3-icerik.md` · `G2-eslestirme-psikometri.md` · `G4a-panel-akis.md` · `G10-olu-kod-terk.md` · `02-ILERLEME.md` (bu kayıt).

---

## TUR 4 — 2026-09-19 · Panel denetimi bulguları kuyruğa (AŞAMA P) · belge-only
**Mod:** 🟥 BYPASS (yalnız merge + belge; ürün kodu YAZILMADI). Dal: `otonom/L-panel-bulgulari-kuyruga-20260919`.

- **İŞ 1 — H dalı merge:** PR **#186** (`panel-denetimi-mentor-menti-2026-09-19.md` tek dosya). 3-noktalı (merge-base) diff = yalnız 1 dosya eklendi (başka değişiklik yok). CI 8/8 yeşil → squash merge, dal silindi.
- **İŞ 2 — AŞAMA P:** Rapor §2/§3'teki **14 açık kalem (11 🟡 + 3 ⬜)** + §6 beşlisi + güvenlik + seed önkoşulu kuyruğa alındı → **P-00..P-16 + P-99 = 18 satır.** Sıra: en az emek→en çok değer (rapor ölçütü). §6 beşlisi P-01..P-05.
  Kapsam denetimi: 14 açık kalemin hepsi eşlendi (M3→P-06·M5→P-05·M6→P-07·M8→P-08·M9→P-01·M13→P-02·MT1→P-04·MT2→P-09·MT5→P-10·MT6→P-11·MT7→P-12·MT9→P-13·MT10→P-14·MT13→P-15). Alınmayan: ✅ VAR (11) + ❓ M11 (ölçülemez his) — İŞ2 gereği doğru.
- **İŞ 3 — GÜVENLİK:** **P-00** (k-anonimlik eşiği yalnız FE — `userController.ts:125-135` maskeleme yok; CLAUDE.md "frontend guard yeterli değil" ihlali, 🟡 PR'da dursun) + **P-16** (sayım `User.role` üzerinden, kural `TenantMembership.role` — çok kurumluda şişer, TEYİT GEREK). ⛔ Kendim DÜZELTMEDİM.
- **İŞ 4 — Belge yanlışları (BY-1..BY-6): 5/6 düzeltildi, 1 atlandı (gerekçeli).**
  - **BY-1/2/3/4** → hepsi `docs/raporlar/kod-denetimi/strateji-gercek-denetimi-2026-08-20.md` (📸 DONDURULMUŞ) → gövde değişmedi, sona **"KOD DOĞRULAMA NOTU (2026-09-19)"** bölümü eklendi (platform-admin deseni), her biri üstü-çizili eski iddia + DÜZELTME + kanıt + kuyruk eşlemesi (P-04/P-01/P-12/P-03).
  - **BY-6** → `docs/kararlar/09-DURUM.md:432` "Menti ⬜" → G9-03 deseniyle üstü çizili + "Menti ✅" düzeltmesi (`:5` ile çelişiyordu).
  - **BY-5 ATLANDI** → `backend/CLAUDE.md` submodule kaynağı; ⛔ DevSecOps "backend/ kaynak dosyalarını değiştirme". Rapor §5 BY-5 + §7 Ç-1'de kanıtıyla duruyor → sıradaki backend turuna bırakıldı.
  - ⛔ `docs/00-BELGE-HARITASI.md` + `docs/devir/` ELLENMEDİ (başka tur alanı).
- **İŞ 5 — Sertifika seed önkoşulu:** **P-99** (içerik→seed taşıma, K-16 önkoşulu, 🟡) + K-16 Not'una "ÖNKOŞUL: P-99" eklendi.
- **İŞ 6 — KARAR-22** (mentör reddederken ne olsun — ret deneyimi) açıldı, 4 alt-soru KÜMELENDİ (gerekçe/alternatif/bildirim/gösterim). İndekse eklendi (1 iş: P-05). ⚠️ KARAR-20 ile aynı tema tespit edildi (ret KODDA VAR — `mentor/page.tsx:257-274` MT11; eksik olan deneyim) → çapraz-referans + "kümelenmeli" notu iki karta da düşüldü. ⛔ CEVAP DOLDURULMADI.
- **⛔ DOKUNULMAYANLAR:** frontend/backend kaynak DEĞİŞMEDİ · DB/migration/seed YOK · şema DEĞİŞMEDİ · hiçbir şey silinmedi · mevcut K-/F-/E- işleri YAPILMADI · `docs/00-BELGE-HARITASI.md` + `docs/devir/` ellenmedi · CEVAP satırları dolmadı.
- **Değişen dosyalar:** `00-KUYRUK.md` (AŞAMA P + K-16 önkoşul notu) · `01-KARARLAR.md` (KARAR-22 + indeks) · `strateji-gercek-denetimi-2026-08-20.md` (BY-1..4 KOD DOĞRULAMA NOTU) · `09-DURUM.md` (BY-6) · `02-ILERLEME.md` (bu kayıt).

---

## TUR 5 — 2026-09-19 · BÜYÜK TUR: 4 PR merge + pointer + yapısal düzeltmeler + bütünsel doğrulama
**Mod:** 🟥 BYPASS (merge + belge + doğrulama; YENİ ÜRÜN KODU YAZILMADI). Dallar: A/B/D merge PR'ları · C=`otonom/S-pointer-bump-...` · E+F=`otonom/T-yapisal-ve-kuyruk-...`

### A) Frontend PR'ları (çatı)
- **#190 (N)** menti mentör adı — 3-nokta diff tam 3 dosya (`meetings/page.tsx`·`lib/api/meetings.ts`·test), CI 8/8 → **merged.**
- **#191 (O)** müsaitlik çoklu aralık (K-03) — 3-nokta diff tam 2 dosya (`mentor/availability/page.tsx`·test), CI 8/8 → **merged.**

### B) Backend PR + BY-5
- **#73 (M)** mentor-count k-anonimlik backend'e taşındı — 3 dosya (`userController.ts`·`mask.ts`·test), CI pass → **merged.** Backend HEAD `f229ffe→4aff01e`.
- **BY-5 (#74)** — `backend/CLAUDE.md:65` "requestMessage on VisibilityOptIn (Akış B) and MatchRequest" ifadesi kod-teyidiyle düzeltildi: KOD 09-DURUM'u doğruladı — **Akış B silinmiş** (VisibilityOptIn.requestMessage alanı `schema.prisma:407` durur, akış yok); canlı niyet mektubu YALNIZ `Meeting.requestMessage`; `MatchRequest.requestMessage` yalnız `POST /api/requests` (`requestController.ts:60`, FE caller yok), canlı yol `conversationController.ts:154` requestMessage'sız yaratır→NULL. Üstü çizili + DÜZELTME. CI pass → **merged.** Backend HEAD `4aff01e→61aae07`.

### C) Submodule pointer bump (#192)
- Eski `f229ffe` → yeni **`61aae07`** (backend main HEAD, #73+#74 dahil). Ata teyidi: `merge-base --is-ancestor f229ffe 61aae07`=0 (ileri sarım güvenli). CI 8/8 → **merged.**
- **C.4 TEYİT:** çatı pointer `61aae07` == backend main HEAD `61aae07` → **SARKMA YOK.**

### D) #188 belge haritası
- **Satır doğrulaması:** main 07-oturum = 1333; dal 3 dosya toplamı = 139 (07-oturum kısaltılmış) + 715 (oturum-2026-08) + 527 (oturum-2026-09) = **1381 ≥ 1333** (satır kaybı YOK, +48 indeks). CI 8/8 → **merged.** (+ `00-BELGE-HARITASI.md` 565 satır bonus.)

### E) Yapısal düzeltmeler (harita kaynak)
- **E.1 EKSEN KURALI:** `belge-duzeni-rehberi.md`'ye **KURAL 2-B** eklendi (KONU+YÖNTEM çakışırsa → YÖNTEM klasörü + KONU'ya zorunlu çapraz atıf). Geriye dönük: `raporlar/persona/00-INDEX.md` + `raporlar/panel/00-INDEX.md` **oluşturuldu** (2 dosya); beş kıyas bölümü çapraz atıflandı (B.1 s.64 · B.2 s.87 · B.3 s.109 · B.4 s.177 · B.5 s.232); B.5 için `arsiv/admin-panelleri-tasarim-2026-08-02.md`'ye de atıf. **Toplam atıf: 8** (persona 4 + panel 4-satır).
- **E.2 NUMARA ÇİFTLERİ:** haritanın 7 doğrulanmış çifti çift-yönlü bağlandı (119↔G1-22 · 120↔G1-28 · 111↔G2-06 · 121↔G8-05 · 113↔G10-10 · 114↔G10-09 · 116↔G4-38) — `00-KARAR-TAKIP` madde satırı + G-kartı başlığı (14 edit). **Atlanan çift: 0** (harita "7 doğrulanmış" dedi, hepsi kod-mevcut).
- **E.3 KART İNDEKSİ:** `docs/kararlar/00-KART-INDEKSI.md` köprü belgesi oluşturuldu — **184/184 kart** (G1..G11, 12 G-dosyası tam tarama): konu·durum·madde·KUYRUK·canonical kaynak. "Durum TUTMAZ, yönlendirir." `kararlar/00-INDEX.md`'ye eklendi (KURAL 5). Eksik: 0 kart (kapsam tam); zayıf nokta = madde-no bazı yerlerde karar-defteri iç-numarası (belgede açıkça yazıldı) + G2 numara-ekseni çakışması (F-08 öncelik-doc no).
- **E.4 HARİTA NOTU:** `00-BELGE-HARITASI.md` B.0 + P-1 + P-2 yanına tarihli "✅ ÇÖZÜLDÜ" notları.

### F) Kuyruk + bütünsel doğrulama
- **F.1** 3 iş BITTI'ye çekildi (numara kod-teyitli): **P-00**=k-anonimlik (M #73), **P-01**=menti mentör adı (N #190), **K-03**=müsaitlik çoklu aralık (O #191). Her birine PR + "CANLIDA BAK" notu.
- **F.2 ⭐ BÜTÜNSEL DOĞRULAMA:** `npm run verify` çalıştı (exit 0). Backend tsc/tsc-test/eslint + frontend tsc/vitest/build adımları geçti; **backend entegrasyon testleri TEST_DATABASE_URL güvenlik kilidine takıldı** (lokalde beklenen — canlı Neon'a TRUNCATE atmaz) → **"yeşil" SAYILMADI** (KURAL 14). **Asıl kanıt CI:** 5 merge edilen PR'ın (#190·#191·#73/#74·#192·#188) HEPSİNDE `Integration Tests (Auth+Matching+Admin)` + `E2E Browser` + `Backend TS+Prisma+Lint` + `Frontend TS+Build` = **pass**. Frontend PR'ları (N/O) yeni test ekledi (meetings-opponent-name · mentor-availability-multi-block) → CI frontend suite'inde koştu, geçti. **KIRMIZI = 0 → REVERT YOK.**
- **F.3 CANLI DOĞRULAMA (PO gözle bakacak):**
  1. Menti "Görüşmelerim"de mentörün **adı** görünüyor mu? (N)
  2. Mentör iki farklı gün müsaitlik ekleyip kaydedebiliyor mu? Test: **Pazartesi 09:00-17:00, sonra Cuma 11:00-17:00 → İKİSİ de kalmalı** (O)
  3. Menti panelinde **mentör sayısı** kartı doğru davranıyor mu (N<3 gizli)? (M — backend maskeleme)
- **⛔ DOKUNULMAYANLAR:** yeni ürün kodu YAZILMADI · DB/migration/seed YOK · şema DEĞİŞMEDİ · #110 (MERGE ETME) ellenmedi · hiçbir CEVAP satırı doldurulmadı · hiçbir şey silinmedi (üstü çizili + not).
- **Değişen dosyalar (E+F, branch T):** `belge-duzeni-rehberi.md` · `raporlar/persona/00-INDEX.md` (yeni) · `raporlar/panel/00-INDEX.md` (yeni) · `arsiv/admin-panelleri-tasarim-2026-08-02.md` · `00-KARAR-TAKIP.md` (7 çift) · 5 G-kartı (G1/G2/G8/G10/G4b) · `00-KART-INDEKSI.md` (yeni) · `kararlar/00-INDEX.md` · `00-BELGE-HARITASI.md` · `00-KUYRUK.md` (F.1) · `02-ILERLEME.md`.

---

## TUR AB — 2026-09-20 (gece) · OTONOM: çoklu 🟢 iş — ARA KAYIT (devam ediyor)
**Mod:** 🟥 BYPASS. Her iş ayrı dal + ayrı PR + merge (tek tek revert edilebilir). DURMAMA KURALI aktif.

### CHECKPOINT 1 — 7 iş merge edildi (bu bir ara kayıttır, tur DEVAM EDİYOR)
- **Bölüm A — OTONOM-PROMPT.txt (PR #208 merged):** DURMAMA KURALI (D.1-D.4) + ARA KAYIT bölümleri eklendi (bayattı).
- **P-03 (PR #209 merged):** `DiscRecallCard` — menti panelinde DISC arketip "aha" kartı rapeli (`/api/users/:id` discResultCard, salt-okunur). Test 1.
- **P-09 (PR #210 merged):** mentör onay kuyruğu kartı boşken kaybolmuyor + mesaj boş-durum metni role göre. Test 2.
- **P-02 (PR #211 merged):** "Gönderilen Talepler" kalıcı — `/api/conversations`'tan türetilir (`countSentRequests` helper). Sayfa yenilenince 0'a düşmüyor. Test +4.
- **V-10 (backend PR #78 merged):** `/users/:id/export` rate limit eklendi (bypass kapandı). Test 1 (integration).
- **V-07 (backend PR #79 merged):** hatırlatma mail batch tavanı + toplantı-başına cooldown (SMTP burst koruması, şema değişmedi). Test 2 (integration).
- **V-13 (backend PR #80 merged):** `/api/tags/suggest` requireTenant+requireAuth ile mount (fail-closed ölü uç çözüldü). Test 2 (integration).

### ⚠️ BEKLEYEN
- **U-14 (PR #212):** süresi dolmuş davette "yeni davet iste" + "giriş yap" düğmeleri. CI'da, merge bekliyor.
- **BACKEND POINTER BUMP:** V-07/V-10/V-13 backend main'e merge edildi ama çatı pointer HENÜZ bump edilMEDİ →
  bu 3 backend düzeltmesi CANLIDA DEĞİL. Turun SONUNDA tek bump yapılacak (eski `4528048` → yeni backend main HEAD).
- **DB/migration/seed YOK · şema DEĞİŞMEDİ · server.ts rate-limit/trust-proxy (yasak bölge) DOKUNULMADI · KARAR CEVAP satırı doldurulmadı · hiçbir şey silinmedi.**

---
TUR YARIM KALDI — son biten iş: P-14 (mentör takdir) · kalan 🟢: 40 · sıradaki: U-10 (4 ekran boş-durum) ya da V-01/V-02 (güvenlik). K-20 YAPILMADI (🟢 iş kaldı, DURMAMA D.1). Bağlam doldu → temiz kesim (D.4). Sonraki tur aynı promptla devam.
