# EŞLEŞTİRME MOTORU + SEKTÖR/ETİKET DERİN KEŞFİ

**📸 DONDURULMUŞ** (keşif fotoğrafı — 2026-08-27) · 🟢 BYPASS yalnız-belge (kod OKUNDU, değiştirilmedi; DB'ye dokunulmadı)

> **Ne bu:** Değerlendirme sisteminin yeniden tasarımı (DISC→Big Five, Likert→senaryo) öncesi **son keşif**. PO talimatı:
> "Önerileri uygulamadan önce ne yapmışız, ne düşünmüşüz, neye niyet etmişiz, neleri yarım bırakmışız — bilelim."
> Bu rapor TASARIM YAPMAZ, ÖNERİ GETİRMEZ — yalnız mevcut kod gerçeğini + geçmiş niyeti dosya:satır kanıtıyla çıkarır.
> Bilanço G2 karar dosyasıyla çakışan bulgularda "G2-XX'de var" denir; yalnız yeni mekanizma/kanıt eklenir.

---

## 1. ⭐ TEK SATIR FORMÜL (bugün havuzda %87'yi üreten)

Bir menti/mentör havuza baktığında gördüğü yüzde **`matching.ts` → `scoring.ts` (DISC yolu)** tarafından üretilir:

```
gösterilen% = min(100,  [ sektörSkoru × sektörAğırlık + karakterSkoru × karakterAğırlık ] × kaliteÇarpanı
                          + etkileşimBonusu × kaliteÇarpanı )
```

| Terim | Kaynak (dosya:satır) | Nasıl |
|---|---|---|
| **sektörSkoru** | `scoring.ts:31-41` (`computeSectorScore`) | `(ortak_etiket / MENTİ_etiket_sayısı) × 100` — **asimetrik**, Jaccard-birleşim DEĞİL; payda menti etiket seti. Menti etiketi yoksa → **0** |
| **karakterSkoru** | `scoring.ts:63-84` (`computeDiscScore`) | Vektör varsa: `confidence × vektörSkor + (1−confidence) × matrisSkor`; yoksa DISC matris; mentör DISC yoksa → **50** |
| **sektörAğırlık / karakterAğırlık** | `scoring.ts:89-90` + `algorithmTuner` (tenant) | Varsayılan **0.6 / 0.4**; tenant `tenantVocabulary.algorithmWeights`'te değiştirebilir; `matching.ts:104` bir kez okunur (N+1 yok), hata→0.6/0.4 |
| **kaliteÇarpanı** | `scoring.ts:118-122` (`applyQualityMultiplier`) | `1.0 + ((ortFeedback−3)/2)×0.2`, clamp **0.8–1.2**; <3 feedback→1.0. `matching.ts:100` her istekte **CANLI** hesaplanır (kalıcı alan OKUNMAZ) |
| **etkileşimBonusu** | `matching.ts:288-294, 307` | `interactionStyle` mentör=menti ise **+10** (×kaliteÇarpanı), skora en son eklenir |
| **matris değerleri** | `scoring.ts:44-49` | `D:{D60,I75,S30,C85} I:{D70,I60,S70,C80} S:{D35,I70,S75,C65} C:{D85,I75,S65,C60}` (mentör satır, menti sütun) |

**Filtreler/kapılar (skordan ÖNCE, `scoreAndFilter` `matching.ts:265-323`):** idari blok (`blockedPairs`) → mentör DISC-dışlama filtresi → zaman-uyumu (`timeCommitment`) → beklenti-kesişimi (`expectationCategories` en az 1 ortak) → **anti-match** (yalnız D-mentör + S-menti, `scoring.ts:20-22`). Eşleşme bulunmazsa **4 kademe fallback** (`matching.ts:200-227`): 0 tüm filtreler → 1 zaman gevşe → 2 anti-match kalk → 3 yalnız-sektör (uyarı rozetli). Eşik: `explicitMinScore` (mentör filtresi/arg) > `tenant.minMatchScoreThreshold`; kademe-3'te tenant barajı atlanır (aktivasyon deadlock önleme).

> **Kritik gerçek:** Canlı sektör skoru = **basit etiket-kesişimi** (`scoring.ts:31`). 5-bileşenli "kapsamlı" sektör skoru (aşağıda §3) YAZILMIŞ ama bu formüle **bağlı değil**. Canlı karakter = **DISC matris/vektör**; OCEAN/SJT bu formülde **okunmaz** (madde 101).

**Canlı yol teyidi (grep):** `matchingController.ts:59` (`rankMentisForMentor`, mentör havuzu) + `:107` (`rankMentorsForMenti`, menti havuzu kartı) → ikisi de `matching.ts` (DISC). `/api/scoring/rank-mentors` + `/compute-profile` (OCEAN yolu) `frontend/src`'te **çağrılmıyor** (arandı, sonuç yok).

---

## 2. MOTOR RÖNTGENİ — canlı zincir (uçtan uca)

**Giriş — okunan veriler** (`matching.ts:69-96, 149-172`):
- Mentör: `sectorTags, discType, timeCommitment, interactionStyle, expectationCategories` + `TenantMembership.role=MENTOR` doğrulaması.
- Aday menti: `sectorTags, discType, discVector (JSON), skills, avatarUrl, timeCommitment, interactionStyle, expectationCategories`, `approvalStatus=APPROVED`, `take:500`.
- Tenant: `minMatchScoreThreshold, blockedPairs`. Mentör filtresi: `minCompatibilityScore, blockedDiscTypes, filterEnabled`.
- **Cross-tenant:** yalnız iki taraf da `isSharedPoolActive` ise havuz paylaşılır (`matching.ts:130-144`).

**Hesap (senkron, DB'siz — N+1 yok):** her aday için `computeTotalScore` (yukarıdaki formül) + `interactionBonus`. Sonra `totalScore` azalan sıralama (`matching.ts:325`).

**Çıkış:** `RankedMenti` (skor + sektörSkoru + discScoru + confidence + qualityMultiplier + fallbackLevel + warnings). Yüzde = `totalScore` (0-100, 1 ondalık). `discScore` menti→mentör kartında DTO'dan ÇIKARILIR (KARAR 5; `matching.ts:345-347`).

**⚠️ qualityMultiplier ikilemi (kod-teyitli, `scoring.ts:163-166`):** Kalıcı `TenantMembership.qualityMultiplier` alanı YALNIZ `scoring.service.ts`/`/rank-mentors` tarafından okunur — o da FE'de çağrılmaz. Canlı `matching.ts` katsayıyı **her istekte yeniden hesaplar** (`computeMentorQualityMultiplier`, son 10 feedback). Yani kalıcı yazım yalnız yöneticiye görünürlük; sıralamayı değiştirmez.

---

## 3. UYUYAN SERVİSİN OTOPSİSİ — `sector-scorer.service.ts` (5 bileşen)

Kod **TAM yazılmış** (stub DEĞİL; "return 50" arandı, sonuç yok). Canlı `matching.ts` bunu **import etmiyor**.

| Bileşen | Ağırlık | Ne ölçüyor | Formül (dosya:satır) |
|---|:---:|---|---|
| **A** Taksonomi yakınlığı | **0.30** | İki sektör kodunun ağaçta yakınlığı | `taxonomy.service.ts:44-68` LCA: aynı düğüm=1.0, kardeş=0.75, kuzen=0.40, uzak=0.0 (`PROXIMITY=[1.0,0.75,0.40]`) |
| **B** Beceri kapsama | **0.25** | Mentör becerileri menti becerisini ne kadar karşılıyor | `sector-scorer:12-16` `ortak/mentiSkills.length` (asimetrik, payda=menti) |
| **C** Hedef-uzmanlık | **0.25** | Menti hedefleri mentör becerisine ne kadar düşüyor | `sector-scorer:20-24` `ortak/mentiGoals.length` |
| **D** Kıdem çan eğrisi | **0.15** | Mentör deneyimi "tatlı nokta"da mı | `sector-scorer:29-34` Gaussian μ=5.5 yıl, σ=3.0; null→0.5 |
| **E** Bağlam bonusu | **0.05** | Ortak okul/şirket/topluluk | `sector-scorer:39-55` okul×0.40 + şirket×0.35 + topluluk×0.25 (payda=menti listesi), cap 1.0 |

Nihai: `raw = 0.30A + 0.25B + 0.25C + 0.15D + 0.05E`, `×1000/10` → 0-100 (`sector-scorer:83-84`).

**Taksonomi mekanizması (`taxonomy.service.ts`):** `IndustryNode` öz-referanslı ağaç (`parent`). `buildAncestorChain` (`:16-31`) her koddan köke zincir çıkarır (düğüm başına 1 DB sorgusu, ~3-4 seviye). `computeTaxonomyProximity` (`:44-68`) iki zincirde ilk ortak atayı (LCA) bulup uzak tarafın adım sayısıyla puanlar. **Çatı-eşleşme (kısmi puan) VAR** — kardeş/kuzen kademeli. **Embedding YOK** (yorum `:37` "LCA, embedding değil").

**Eş-anlamlı/normalize:** sector-scorer içinde YOK; yalnız `.toLowerCase()`. (Etiket normalize genel durumu §4.)

**Bağlanma eksiği (canlıya girmek için):** `sector-scorer:99-111` `rankMentorsWithSectorScore` **entegrasyon fonksiyonu var** ama `scoring.service.ts`'nin `rankMentorsForMenti`'sini (OCEAN yolu, Boru B) çağırıyor — canlı `matching.ts`'i (DISC yolu, Boru A) DEĞİL. Yani sector-scorer, **canlıda çağrılmayan OCEAN boru hattına** bağlı. Canlı DISC yoluna bağlamak için: `matching.ts` `computeSectorScore` çağrısı → `resolveSectorScore` ile değiştirilmeli + adayların `UserProfile` (industryCode/skillTags/goalTags/schools...) yüklenmeli (bugün `matching.ts` `User.sectorTags`'i okur, `UserProfile`'ı değil). **DURDU sebebi: "staging şart"** (T4-A1-E45; canlı eşleştirme davranışını değiştirir).

**Kod-içi niyet yorumları (AYNEN):**
- `sector-scorer:9-11`: *"Bileşen B: Asimetrik Beceri Kapsama — Payda = mentiSkills.length (menti ne öğrenmek istiyor). Mentor etiketleri ne kadar mentiyi 'karşılıyor'?"*
- `sector-scorer:87-97`: *"Plug-and-play entegrasyon fonksiyonu ... Kullanım (controller veya matching servisi içinde): `const ranked = await rankMentorsWithSectorScore(mentiProfile, mentorProfiles);`"* → niyet: **plug-and-play canlıya takılacaktı**, takılmadı.
- `taxonomy.service.ts:7-8`: *"IndustryNode öz-referanslı model olduğundan Prisma tipi çıkarsaması başarısız olur."* (teknik tuzak notu)

---

## 4. ETİKET ALTYAPISI ENVANTERİ

**7 ayrı etiket kavramı** (tek ortak "eşleşme etiketi havuzu" YOK):

| # | Alan (schema:satır) | Kavram | Kim üretir |
|:---:|---|---|---|
| 1 | `User.sectorTags` (schema:241) | Sektör etiketi — canlı skorun %60 girdisi | Kullanıcı (onboarding+profil) **VE** admin |
| 2 | `UserProfile.skillTags/goalTags` (schema:962-963) | Beceri/hedef — 5-bileşen B/C (uyuyan) | Kullanıcı (onboarding) |
| 3 | `UserProfile.schools/companies/communities` (schema:964-965) | Bağlam — 5-bileşen E · **PII** | Kullanıcı |
| 4 | `UserProfile.industryCode` (schema:959) + `IndustryNode` (schema:1016) | Taksonomi ağacı kodu (LCA) | Sistem/seed (kullanıcı girmez) |
| 5 | `PendingTag` (schema:823-842) | Talep-onay kuyruğu (öneri→onay/merge/red) | Kullanıcı önerir, admin işler |
| 6 | `Tenant.tenantVocabulary` Json (schema:154) | E-posta dili + **algorithmWeights deposu** (etiket sözlüğü DEĞİL) | Admin + sistem |
| 7 | `JobListing.tags` (schema:626) | İlan etiketi (ayrı) | Tenant/admin |

**Giriş kontrolü — SERBEST (onaylı-havuz doğrulaması YOK):**
- `sanitizeTags` (`onboardingController.ts:20-27`): `.trim().toLowerCase()` + whitelist regex `^[a-zğüşıöç0-9\s\-&\/\.,'()]+$` + uzunluk + dedupe. **maxLen alana göre:** skill/goal **60**, schools/companies/communities **120**, varsayılan **80**.
- `SECTOR_TAG_SCHEMA` (`userController.ts:14-22`): min1/max**50** karakter; `SECTOR_TAGS_SCHEMA` max **20 etiket** + dedupe.
- Yazan: kullanıcı-self (`onboardingController.ts:305,314`, `userController.ts:343`) + admin (`userController.ts:238,446`). **Onaylı havuza karşı kontrol YOK** — serbest metin, yalnız karakter/uzunluk/adet elenir.

**PendingTag — YARIM (asimetrik):** admin tarafı TAM bağlı (`adminRoutes.ts:63-66` + FE `admin/tags/page.tsx`); **kullanıcı-öneri (producer) FE'de bağlanmamış** — `tags/suggest` frontend'te çağrı YOK (arandı, sonuç yok) → kuyruk pratikte dolmuyor. approve edilen etiket "global havuza" değil yalnız **öneren kişinin** sectorTags'ine eklenir (`tagController.ts:126-159`); planlanan `Tenant.globalTags` şemada YOK.

**Eş-anlamlı/normalize/stemming: YOK** (grep synonym/alias/stem → arandı, sonuç yok). Tek birleştirme = **admin manuel merge** (`tagController.mergeTag`, `array_replace` ham SQL). Otomatik "yazılım↔software" yok. `toLowerCase()` locale-duyarsız (Türkçe İ/ı tuzağı).

---

## 5. NİYET ARKEOLOJİSİ

**(a) %60/40 SEÇİM GEREKÇESİ → BELGELENMEMİŞ** (4 belgede çapraz-teyit, en net: `konu/03-psikometri` üretimi `bolumler` `05-felsefe-motoru:184` *"NEDEN 60/40? gerekçe YOK — sezgisel"* + `raporlar/icerik/eslesme-uyum-po-inceleme-2026-08-26:88` *"kodun içine elle yazılmış sabit sayılar ... bilimsel/psikometrik kaynağı yok; belgelenmemiştir"*). "%60 sektör/%40 karakter" bir **ürün kararı** olarak yazılı (`konu/03-psikometri-ve-algoritma.md:19`) ama "neden sektör ağır bassın" gerekçesi yok. PO onay kutusu bile boş (`eslesme-uyum:81-82` `[ ]`). → **G2-05'te kart var**; yeni: gerekçesizlik 4-belge teyitli.

**(b) "ÜÇÜNCÜ BİLEŞEN" → VAR, ama ÇARPAN olarak (toplama terim değil).** `03-psikometri:20` (aynen) *"Mentörlük yetkinliği toplama eklenmez, çarpan olarak modüle eder."* + `:44-46` *"3. sütun: Mentörlük Yetkinliği — 5 boyut (P1 Pedagoji, P2 Geri bildirim, P3 Empati, P4 Adanmışlık, P5 Uyarlanabilirlik)."* Bugün kod-karşılığı = `qualityMultiplier` (0.8-1.2 çarpan). Kapasite/müsaitlik ayrı skor bileşeni olarak **DÜŞÜNÜLMEMİŞ** (yalnız kart-gösterim kararı, `06-tasarim-ux`).

**(c) "KAPSAMLI SEKTÖR SKORU" → VAR, tam reçete + tasarım gerekçesi.** `03-psikometri:38-42` (aynen) *"Ana Sektör %30, Beceri Kesişimi %25, Hedef-Uzmanlık Hizalaması %25, Kıdem Delta %15, Ortak Bağlam %5 ... Taksonomi: hiyerarşik ağaç (IndustryNode) + LCA (embedding değil); beceriler asimetrik kapsama (payda=menti); kıdem çan eğrisi (3-8 yıl ideal)."* Bu reçete = bugün `sector-scorer.service.ts`'in TAM karşılığı (kod yazıldı, bağlanmadı). ⚠️ `03-psikometri:41` "stub, nötr 50 dönüyor ⏳" satırı artık **BAYAT** (kod tam). Sektör ağırlıkları (30/25/25/15/5) da **PO onaysız** (`03-psikometri:62` *"nihai mi? ❓ 'reçete harika' dedi ama tek tek onaylamadı"*).

**(d) Diğer sabitler → hepsi BELGELENMEMİŞ:** anti-match D-mentör+S-menti gerekçesi (`05-felsefe:186`), tiebreak D>I>S>C (`05-felsefe:181` "yalnız deterministiklik için"), 16 matris değerinin türetimi (`05-felsefe:185`). Kod-içi itiraf: `discLetters.ts:23,27` *"başlangıç değerleri, gerçek kullanıcı verisi biriktikçe kalibre edilecek."* → **G2-04'te kart var** (madde 103).

**Yarım niyetler:** sector-scorer bağlanmadı (🟡 G2-08); SJT/OCEAN okunmuyor (⬜ G2-07/madde 101); iki skorlamayı birleştir (🔵 md.15); **"varsayılana düşen profil oranı" izleme metriği** (⬜, iz yok) — kökeni erken güvenlik-denetimi (`bolumler/T4-A2` → `arsiv/strateji-ve-guvenlik-denetimi:373` *"boyut tam 50'ye düşerse kişi hiçbir tipe düşmez → varsayılana kayar ... İzle: 'varsayılana düşen profil oranı'"*).

---

## 6. SJT MEKANİZMASI + DISC→OCEAN ADAPTÖRÜ

**İki ayrı boru hattı, birbirine bağlı DEĞİL:** Boru A = Likert DISC adaptif (`adaptiveTestEngine.ts`+`questionService.ts`, CANLI) · Boru B = SJT senaryo (`sjt-scorer.ts`+`sjtScoringController.ts`, yalnız `/compute-profile` çağrılırsa).

**(1) triggersOn → ÖLÜ ALAN.** `triggersOn` yalnız veri tanımında geçiyor (`schema.prisma:896`, `seed.ts:526+`, migration). **Hiçbir servis OKUMUYOR** (`grep triggersOn src` → arandı, sonuç yok). "Boyut belirsiz → o boyutun FOLLOWUP'ını aç" davranışı **kodda YOK**; `sjt-scorer.ts:48-51` yalnız `code:{in}+isActive` filtreler, FE hangi kodu gönderirse onu puanlar.

**(2) Confidence → yanıt/hedef (varyans YOK), iki farklı formül:** tam test `adaptiveTestEngine.ts:231` `min(1, toplamYanıt/maxOlası)`; önizleme `:282` `min(1, geçmiş/20)` (sabit 20). **CORE eşiği tutarsız (madde 102):** `adaptiveTestEngine.ts:22` `MIN_CORE_RESPONSES=5` (sabit) ↔ `questionService.ts:117` `coreThreshold=coreCount` (=tüm CORE=20). DEEPENING **dominant** boyuta göre açılır (`adaptiveTestEngine.ts:207-209`, `getDominantType:100-103`) — **en belirsiz boyuta göre DEĞİL**.

**(3) MOST_LEAST puanlama:** `sjt-scorer.ts:66-72` — `most` seçenek **+1.0**, `least` seçenek **−0.5** (guard: least≠most); SINGLE format +1.0.

**(4) sjt-scorer NE ölçüyor:** **OCEAN** (o/c/e/a/n), DISC değil (`sjt-scorer.ts:44,77`). Formül `:80` `raw = 50 + ((toplam/hits)/3)×50`, clamp 0-100. `hits===0` guard `:79` (yanıtlanmamış boyut sonuca girmez). Çıktı `sjtOverrides` → `mergeWithSjt` (`scoring.service.ts:98`) ile DISC-türetilmiş OCEAN'a karışır (`profileSource=HYBRID`) — ama eşleştirme sıralaması bunu yeniden okumaz (madde 101).

**(5) DISC→OCEAN matrisi (AYNEN, `scoring.config.ts:23-29`):**

| OCEAN | d | i | s | c |
|---|:---:|:---:|:---:|:---:|
| o (açıklık) | 0.1 | 0.4 | −0.3 | −0.2 |
| c (sorumluluk) | 0.3 | −0.1 | 0.1 | 0.6 |
| e (dışadönük) | 0.4 | 0.6 | −0.2 | −0.3 |
| a (uyumluluk) | −0.5 | 0.2 | 0.5 | −0.1 |
| n (nevrotiklik) | −0.2 | −0.1 | −0.4 | 0.1 |

Projeksiyon (`disc-to-ocean.adapter.ts:14-16`): `raw = Σ(w·disc)`, `clamp(50 + 50·raw/100)`. Arketip eşikleri `scoring.config.ts:31` `{HIGH:60, MID:55, LOW:45}`; mentör M1-M4 / menti m1-m4 kuralları (`adapter.ts:30-42`). **B modelinde bu yol tersine dönecek** (senaryo→OCEAN doğrudan), bugün DISC→OCEAN türetiliyor.

**(6) Ölçekleme tespiti (salt gözlem):** SJT havuzu bugün **3 soru** (`seed.ts:530-573`; 1 FOLLOWUP, 0 mentör-FOLLOWUP). DISC havuzu **32** (20 CORE + 12 DEEPENING). Havuz 30-40'a çıkarsa: Boru A'da `coreThreshold` dinamik ama `MIN_CORE_RESPONSES=5` + önizleme `/20` sabitleri güncellenmez (madde 102 büyür). Boru B'de "hangi FOLLOWUP açılacak" seçici kod olmadığından (triggersOn ölü), havuz büyütmek tek başına adaptif SJT'yi ÇALIŞTIRMAZ — okuyucu katman eklenmeden ölçek devreye girmez. `profile-completeness.service.ts:44-50` `answeredFollowup` tablosunu sorguluyor ama **o tablo şemada YOK** (try/catch fallback) → followup takibi de yarım.

---

## 7. ÇELİŞKİ / SÜRPRİZ LİSTESİ

1. **İki paralel skorlama sistemi, biri tamamen ölü:** DISC yolu (canlı) ↔ OCEAN/arketip yolu (`scoring.config.ts` M1-M4 + `scoring.service.ts`) FE'de çağrılmıyor. 5-bileşen sector-scorer da bu ölü yola bağlı → **canlıya hiç değmiyor** (madde 101 mekanizması netleşti).
2. **Kalite çarpanı iki kez yaşıyor:** kalıcı `TenantMembership.qualityMultiplier` (yönetici görünürlüğü) ↔ canlı-hesap (sıralama). Kalıcı olan sıralamayı etkilemez (`scoring.ts:163-166`) — sürpriz: yöneticinin gördüğü puan ile motorun kullandığı FARKLI anlarda hesaplanır.
3. **Sürpriz — 5-bileşen sektör skoru STUB DEĞİL:** belge (`03-psikometri:41`) hâlâ "stub nötr 50" diyor; kod TAM. Belge bayat.
4. **etiketBirleştirme yok ama merge SQL var:** otomatik eş-anlamlı yok; admin `array_replace` ile elle birleştiriyor → "yazılım" ve "software" bugün AYRI etiket, skorda eşleşmez.
5. **PendingTag yarım:** admin onay ekranı var ama kullanıcı öneri butonu FE'de yok → onay kuyruğu kod-yoluyla dolmuyor.
6. **triggersOn ölü:** SJT adaptif tetikleme veri modelinde tasarlanmış, okuyan kod yok.
7. **answeredFollowup tablosu şemada yok** ama `profile-completeness` onu sorguluyor (try/catch ile gizleniyor).
8. **sektör skoru asimetrik + payda=menti:** hem canlı (`scoring.ts:40`) hem 5-bileşen (`sector-scorer:15,23`) menti-merkezli; mentörün fazla etiketi skoru düşürmez/artırmaz — bilinçli tasarım ama belgede gerekçe kısa.

## 8. TEYİT GEREK LİSTESİ (❓ — bu turda çözülemeyen)

- **Canlı DB soru/etiket sayıları** (DISC canlı ~20 vs kod 32, sertifika, IndustryNode ağacı dolu mu, kaç industryCode atanmış) — DB'ye sorulmadı (kural). ❓ TEYİT GEREK (DB).
- **`/api/scoring/*` (OCEAN yolu) herhangi bir yerden çağrılıyor mu** (admin aracı/test dışında) — FE grep boş; başka tüketici ❓ (arka-uç iç çağrı taraması sonraki tur).
- **Hard-gate (toksik veto) yönetici eşiğinden gerçekten ayrı mı** kod düzeyinde — `scoring.config.ts:33` `BLOCKED_PAIRS` OCEAN yolunda; canlı DISC yolunda karşılığı `ANTI_MATCH_RULES` (tek çift). İki sistemin veto tutarlılığı ❓.
- **IndustryNode taksonomi ağacı seed'li mi, kaç düğüm** — `taxonomy.service` çalışır ama ağaç boşsa proximity hep 0. ❓ TEYİT GEREK (DB/seed).

---

## 9. ⭐ KALEM LİSTESİ (KURAL 9)

> Bu keşfin ürettiği kalemler. Numara YALNIZ `00-KARAR-TAKIP`'te doğar — burada "numara-adayı-mı" işaretlenir. Çoğu G2 kartında zaten var → "G2-XX'de var".

| # | Kalem | durum | numara-adayı-mı |
|:---:|---|:---:|---|
| 1 | Canlı sektör skoru basit etiket-kesişimi; 5-bileşen sector-scorer bağlı değil | 🟡 | G2-08'de var (yeni: bağlama-adımı netleşti) |
| 2 | %60/40 ağırlık gerekçesi belgelenmemiş (4-belge teyitli) | ❓ | G2-05'te var |
| 3 | 16 matris + anti-match + tiebreak gerekçesi belgelenmemiş | ❓ | G2-01/02/03/04'te var |
| 4 | SJT/OCEAN + 5-bileşen sektör canlı eşleştirmede okunmuyor (2 ölü boru) | ⬜ | G2-07/madde 101'de var (yeni: mekanizma) |
| 5 | CORE eşiği tutarsız (MIN_CORE_RESPONSES=5 ↔ coreThreshold=20 ↔ önizleme /20) | ❓ | madde 102'de var (yeni: 3. sabit /20) |
| 6 | triggersOn ölü alan — SJT adaptif tetikleme okuyan kod yok | ⬜ | **numara-adayı EVET** (yeni; madde 101 akrabası, ayrı mekanizma) |
| 7 | `answeredFollowup` tablosu şemada yok, profile-completeness sorguluyor | ❓ | **numara-adayı EVET** (yeni) |
| 8 | PendingTag kullanıcı-öneri (producer) FE'de bağlı değil — kuyruk dolmuyor | 🟡 | **numara-adayı EVET** (yeni; C20/etiket-havuzu akrabası) |
| 9 | Eş-anlamlı/normalize etiket otomasyonu yok (yazılım↔software ayrı) | ⬜ | **numara-adayı EVET** (yeni) |
| 10 | Sektör 5-bileşen ağırlıkları (30/25/25/15/5) PO onaysız | ❓ | G2-08 akrabası (yeni: ağırlık-onayı ayrı) |
| 11 | qualityMultiplier kalıcı-yazım sıralamayı etkilemiyor (yalnız görünürlük) | 🟡 | G2/madde 87 akrabası (bilinen; teyit) |
| 12 | `03-psikometri:41` "sector-scorer stub" satırı bayat (kod tam) | 🗑️ | **numara-adayı EVET** (belge-hijyen; ⚠️ not gerek) |
| 13 | "Varsayılana düşen profil oranı" izleme metriği yok (nötr-50 kör-noktası) | ⬜ | G2-06'da var |
| 14 | IndustryNode taksonomi ağacı seed durumu (boşsa proximity hep 0) | ❓ | **numara-adayı EVET** (DB-teyit) |

**KALEM LİSTESİ: 14 satır** (yeni numara-adayı: 6 · geri kalanı G2/101/102/103'te mevcut).

---

> **Kapanış:** Bu tur yalnız TESPİT — tasarım/öneri yok. Tasarım tezi bundan sonra yazılacak. Kod okundu, değiştirilmedi; DB'ye dokunulmadı; PR açık, MERGE EDİLMEDİ.
