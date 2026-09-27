# Karantinaya alınanlar — 2026-09-27

> ⛔ Bu belge SİLME PROTOKOLÜ'nün (CLAUDE.md § SİLME PROTOKOLÜ) 4. adımıdır: **ARŞİV**.
> Hiçbir kayıt burada SİLİNMİYOR — yalnız devre dışı bırakılan (karantina) kod parçalarının
> TAM içeriği, neden yazıldığı, neden karantinaya alındığı ve geri alma komutu kayda geçiriliyor.
> İş: **AN-12** (`docs/otonom/00-KUYRUK.md`) — kapı 🔵 (ajan hazırlar, PO'nun tek "EVET"i ile
> merge edilir). Bu turda **gerçek silme YOK** — yalnız yazma yolları karantinaya alındı.

## AN-12 · `interactionStyle` — yazma yollarının karantinası

### 1. NİYET — alan neden eklendi

- İlk eklenme: backend `3e49117` ("feat: bento grid dashboard ve jwt güvenlik altyapısı") —
  `User.interactionStyle InteractionStyle?` (enum `GOREV_BAZLI | SOHBET_BAZLI`), mentörün
  "nasıl mentörlük ettiği" tercihini tutmak için. Eşleştirme motoruna +10 bonus olarak
  eklendi (`matching.ts`): mentör ve menti aynı `interactionStyle` değerine sahipse skor +10.
- Sonraki kullanım: `9db39d5` ("feat(profile): completeProfile endpoint'e
  expectationCategories/timeCommitment/interactionStyle eklendi") — onboarding akışına
  yazma yolu olarak eklendi.
- Tasarım gerekçesi ilk hâliyle: mentör-menti "çalışma tarzı" hizalaması ölçmek.

### 2. İKAME KANITI — bugün bu işi yapan başka yol var mı

- **EVET.** `docs/kararlar/konu/degerlendirme-sistemi-tasarim-2026-08-27.md` §10.2 KARAR 2
  (revize 2026-08-29): mentör-menti çalışma tarzı hizalaması artık **`supportApproach`**
  alanı ile HER İKİ ROLDE (mentör + menti) soruluyor — üç-soru ekranı (S2), backend #62/#64
  ile canlıya alındı (`schema.prisma` `supportApproach SupportApproach?`).
  `interactionStyle` bu geçişten sonra **yalnız mentörde** ve **eski, dar bir 2-değerli
  eksende** kalmıştı; menti tarafı hiç toplanmadığı için hizalama zaten ölçülemiyordu.
- Kod kanıtı (2026-08-29 doğrulama turu, hâlâ geçerli — bu tur yeniden doğrulandı):
  `matching.ts` içindeki interactionStyle bonusu iki tarafı karşılaştırır
  (`c.interactionStyle === opts.mentorInteractionStyle`) AMA menti tarafı bu alanı hiç
  toplamadığından (frontend `ProfileStep.tsx` mentöre soruyordu, mentiye SORMUYORDU;
  2026-08-30'dan sonra mentöre de SORULMUYOR) `c.interactionStyle` her zaman `null` →
  bonus **fiilen hiçbir zaman tetiklenmiyor.**

### 3. YENİ KARAR — dondurma kararının kanıtı

- **PO kararı (2026-08-29), belge: `docs/kararlar/konu/degerlendirme-sistemi-tasarim-2026-08-27.md:574-586`**
  ("KARAR 2 · `interactionStyle` ↔ S2 → YENİ ALAN, ESKİSİ DONDURULUR"):
  > "`interactionStyle` **DONDURULUR** — mentöre eski soru SORULMAZ, sütun şemada KALIR,
  > **TÜRETME YOK**, hiçbir yere yazılmaz. Faz 5'te motor `supportApproach` okumaya
  > başlayınca sütun emekliye ayrılır."
  >
  > "İŞ 0 bulgusu (dondurma güvenli mi): `interactionStyle` `matching.ts` DIŞINDA
  > fonksiyonel olarak okunmuyor — yalnız 2 pasif SELECT + FE DTO tipi (render etmiyor).
  > Dondurulunca SELECT'ler null döner, hiçbir mantık/gösterim tüketmediği için fonksiyonel
  > etki YOK."
- Ek kanıt: `docs/kararlar/00-KARAR-TAKIP.md:142` — "KARAR 2 REVİZE (PO): interactionStyle
  KÖPRÜ İPTAL → DONDURULUR (türetme YOK)."
- Frontend tarafı bu kararı zaten uyguladı (2026-08-30): `frontend/src/app/onboarding/_steps/ProfileStep.tsx:50-51`
  ve `frontend/src/types/onboarding.ts:56-58` — "eski Mentorluk Tarzı sorusu KALDIRILDI",
  `ProfileData` tipinden `interactionStyle` çıkarıldı. **Bu turdan (AN-12) önce backend
  YAZMA yolları hâlâ Zod şemalarında kabul ediyordu** — dondurma kararı FE'de tamdı ama
  BE'de yalnız "yazılmıyor" (fiilen, FE göndermediği için) idi, "yazılamaz" (yapısal
  garanti) DEĞİLDİ. AN-12 bu farkı kapatıyor: BE artık yapısal olarak da yazmıyor.

### 4. ARŞİV — karantinaya alınan TAM kod (değişiklik öncesi hâli)

Aşağıdaki üç parça `backend` reposunda, dal `otonom/AN-12-interactionstyle-karantina-20260927`,
temel commit `5fb14164175f99ec989b90c80b22d4718bf871d9` (origin/main) üzerinde karantinaya
alındı. **Şema alanı (`prisma/schema.prisma`'daki `User.interactionStyle`) DEĞİŞMEDİ — yalnız
aşağıdaki üç YAZMA yolu.**

#### 4a. `src/controllers/userController.ts` — `UpdateUserSchema` + `updateUser` (ADMIN, `PATCH /api/users/:id`)

Değişiklik öncesi (son commit `5fb1416`):
```ts
const UpdateUserSchema = z.object({
  fullName: z.string().min(2).max(200).optional(),
  sectorTags: SECTOR_TAGS_SCHEMA,
  discType: z.enum(['D', 'I', 'S', 'C']).nullable().optional(),
  temperamentJson: boundedJson,
  volunteerHistory: boundedJson,
  pastProjects: boundedJson,
  education: boundedJson,
  skills: z.array(z.string().max(100)).max(30).optional(),
  isActive: z.boolean().optional(),
  timeCommitment: z.enum(TIME_COMMITMENT_VALUES).nullable().optional(),
  interactionStyle: z.enum(INTERACTION_STYLE_VALUES).nullable().optional(),
  expectationCategories: z
    .array(z.enum(EXPECTATION_CATEGORY_VALUES))
    .max(2, 'Maksimum 2 beklenti kategorisi seçilebilir.')
    .optional(),
  // Zengin profil alanları
  bioSummary: z.string().max(2000).nullable().optional(),
  expertiseDetails: z.string().max(2000).nullable().optional(),
  targetAudience: z.string().max(1000).nullable().optional(),
}).strict();

export async function updateUser(req: RequestWithTenant, res: Response) {
  const parsed = validateRequest(UpdateUserSchema, req.body, res);
  if (!parsed.success) return parsed.response;

  const existing = await prisma.user.findFirst({
    where: { id: req.params['id'] as string, tenantId: req.tenant.tenantId },
    select: { id: true },
  });
  if (!existing) {
    return res.status(404).json({ error: 'NOT_FOUND', message: 'Kullanıcı bulunamadı.' });
  }

  // ...
  const updated = await prisma.user.update({
    where: { id: existing.id },
    data: parsed.data,
    select: USER_FULL_SELECT,
  });
```

**Neden karantinaya alındı:** `interactionStyle` DONDURULMUŞ; bu ADMIN ucu `parsed.data`'yı
olduğu gibi Prisma'ya veriyordu — eğer biri (test/script/gelecekteki bir FE değişikliği)
gövdede `interactionStyle` gönderirse şemadaki tip kısıtına takılmadan doğrudan yazılıyordu.
**Neden Zod anahtarı SİLİNMEDİ (yalnız controller katmanında yok sayıldı):** şema `.strict()`
— anahtarı Zod'dan tamamen çıkarmak, `interactionStyle` içeren HERHANGİ bir isteği (diğer tüm
alanlar geçerli olsa bile) "Unrecognized key" hatasıyla TÜMDEN reddederdi. Bu, karantinanın
amacından (sessizce yok say) daha yıkıcı bir davranış değişikliği olurdu. Bunun yerine
`updateUser` içinde `parsed.data`'dan `interactionStyle` destructure ile ÇIKARILIP geri kalanı
(`updateData`) yazılıyor — istek reddedilmiyor, yalnız bu tek alan DB'ye ulaşmıyor.

**Geri alma komutu (gerçek silme DEĞİL — bu bir karantina, geri alma = eski davranışa dönüş):**
```bash
git -C backend revert <bu-turun-commit-hash'i>
# veya elle: userController.ts'te `updateData` yerine `parsed.data` kullan (destructure'ı kaldır).
```

#### 4b. `src/controllers/userController.ts` — `CreateUserSchema` + `createUser` (ADMIN, `POST /api/users`)

Değişiklik öncesi (son commit `5fb1416`):
```ts
const CreateUserSchema = z.object({
  role: z.enum(['ADMIN', 'MENTOR', 'MENTI']),
  email: z.string().email().max(254),
  fullName: z.string().min(2).max(200),
  sectorTags: SECTOR_TAGS_SCHEMA,
  discType: z.enum(['D', 'I', 'S', 'C']).optional(),
  temperamentJson: boundedJson,
  timeCommitment: z.enum(TIME_COMMITMENT_VALUES).optional(),
  interactionStyle: z.enum(INTERACTION_STYLE_VALUES).optional(),
  expectationCategories: z
    .array(z.enum(EXPECTATION_CATEGORY_VALUES))
    .max(2, 'Maksimum 2 beklenti kategorisi seçilebilir.')
    .optional(),
  // ...
});

export async function createUser(req: RequestWithTenant, res: Response) {
  const parsed = validateRequest(CreateUserSchema, req.body, res);
  if (!parsed.success) return parsed.response;

  const user = await prisma.user.create({
    data: {
      tenantId: req.tenant.tenantId,
      role: parsed.data.role,
      email: parsed.data.email.toLowerCase(),
      fullName: parsed.data.fullName,
      sectorTags: parsed.data.sectorTags ?? [],
      discType: parsed.data.discType,
      temperamentJson: parsed.data.temperamentJson,
      timeCommitment: parsed.data.timeCommitment,
      interactionStyle: parsed.data.interactionStyle,
      expectationCategories: parsed.data.expectationCategories ?? [],
      // ...
    },
```

**Neden karantinaya alındı:** aynı gerekçe (4a) — `CreateUserSchema` `.strict()` DEĞİL, bu
yüzden Zod anahtarını kaldırmak burada 400 riskine yol açmıyordu, ama tutarlılık için (ve
`@deprecated` iz bırakmak için) anahtar korunup yalnız `prisma.user.create` veri nesnesinden
`interactionStyle: parsed.data.interactionStyle,` satırı çıkarıldı — yeni kullanıcı her zaman
`interactionStyle: null` (Prisma varsayılanı) ile oluşuyor.

**Geri alma:** `interactionStyle: parsed.data.interactionStyle,` satırını `prisma.user.create`
veri nesnesine (timeCommitment satırından sonra) geri ekle.

#### 4c. `src/controllers/onboardingController.ts` — `CompleteProfileSchema` + `completeProfile` (`POST /api/users/profile/complete`, kendi profilini tamamlayan MENTOR/MENTI)

Değişiklik öncesi (son commit `5fb1416`):
```ts
const CompleteProfileSchema = z.object({
  sector:                SECTOR_TAG_SCHEMA,
  skills:                z.array(z.string().min(1).max(100)).max(30).default([]),
  experienceYears:       z.number().int().min(0).max(60),
  expectationCategories: z.array(z.enum(EXPECTATION_CATEGORIES)).max(6).optional(),
  timeCommitment:        z.enum(TIME_COMMITMENTS).optional(),
  interactionStyle:      z.enum(INTERACTION_STYLES).optional(),
  goals:                 z.array(z.string().max(100)).max(30).optional(),
  schools:               z.array(z.string().max(120)).max(20).optional(),
  companies:             z.array(z.string().max(120)).max(20).optional(),
  communities:           z.array(z.string().max(120)).max(20).optional(),
});

export async function completeProfile(req: RequestWithTenant, res: Response) {
  // ...
  const {
    sector, skills, experienceYears, expectationCategories, timeCommitment, interactionStyle,
    goals, schools, companies, communities,
  } = parsed.data;
  // ...
  const updated = await prisma.user.update({
    where: { id: user.id },
    data: {
      sectorTags:  mergedTags,
      skills,
      selfProfile: updatedSelf,
      ...(expectationCategories !== undefined && { expectationCategories }),
      ...(timeCommitment        !== undefined && { timeCommitment        }),
      ...(interactionStyle      !== undefined && { interactionStyle      }),
    },
```

**Neden karantinaya alındı:** bu, GERÇEK CANLI kullanıcı akışının (onboarding profil
tamamlama) yazma ucuydu — frontend `interactionStyle`'ı 2026-08-30'dan beri GÖNDERMİYOR
(`frontend/src/types/onboarding.ts:56-58`, `ProfileData` arayüzünden çıkarıldı) ama backend
ucu göndermeye devam eden herhangi bir istemciyi (script, eski mobil istemci, doğrudan API
çağrısı) hâlâ kabul edip yazıyordu — dondurma kararı yalnız FE disiplinine dayanıyordu, BE
yapısal garanti VERMİYORDU. AN-12 sonrası: değer gönderilse bile `...(interactionStyle !==
undefined && { interactionStyle })` satırı kaldırıldığı için Prisma `update` veri nesnesine
hiç girmiyor — DB'de var olan değer (varsa) DEĞİŞMİYOR, yoksa (null) null kalıyor.

**Geri alma:** destructure'a `interactionStyle`'ı geri ekle, `prisma.user.update` veri
nesnesine `...(interactionStyle !== undefined && { interactionStyle }),` satırını
`timeCommitment` satırından sonra geri ekle.

### 5. ÖNCE KARANTİNA — ne YAPILMADI (bilerek)

- ⛔ `prisma/schema.prisma`'daki `User.interactionStyle InteractionStyle?` alanı **DOKUNULMADI**
  — migration YOK, sütun duruyor.
- ⛔ `src/services/matching.ts` içindeki OKUMA yolu ve +10 bonus mantığı **DOKUNULMADI** —
  hâlâ mevcut/geçmiş verideki değerleri okuyup karşılaştırıyor (fiilen hep null olduğu için
  tetiklenmiyor, ama kod olarak duruyor — Faz 5'te ayrı iş).
  ⚠️ **AN-12 kapsam netliği:** kuyruk satırı "matematiksel skorlama önceliği" ifadesini
  taşımıyor ama görev tanımı "MATCHING/skorlama dosyası — 7b yapılacak" diyordu; bu ifade
  Bölüm B'deki (tie-break) matching.ts'e değil, olası bir yanlış okumayı önlemek için: burada
  matching.ts'e HİÇBİR SATIR DOKUNULMADI, yalnız üç yazma ucu değişti.
- ⛔ `userController.ts`/`onboardingController.ts` SELECT'lerindeki (okuma) `interactionStyle:
  true` satırları **DOKUNULMADI** — GET uçları hâlâ mevcut DB değerini doğru döndürüyor.
- ⛔ Hiçbir kullanıcı satırı SİLİNMEDİ veya null'a ZORLANMADI — yalnız YENİ yazmalar
  engellendi. Karantina öncesi zaten dolu olan bir `interactionStyle` değeri varsa (yukarıdaki
  4a/4c geri alma senaryosunda olduğu gibi) o değer OKUNMAYA devam eder.

### Durum

🔵 **KARANTİNA — PO'nun tek "EVET"i bekliyor** (`docs/otonom/OTONOM-PROMPT.txt` Bölüm 7).
PR'lar: backend (bkz. PR linki `02-ILERLEME.md`'de aranabilir — bu turda kuyruk/karar
dosyalarına yazılmadı, PO'ya rapor edildi) + çatı (bu arşiv belgesi, ayrı PR).
Merge PO onayından SONRA yapılacak.
