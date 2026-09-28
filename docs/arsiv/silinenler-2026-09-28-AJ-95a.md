# Değiştirilenler arşivi — 2026-09-28 · AJ-95a (psikometrik Json alanlarına yazım öncesi Zod, md.170)

> CLAUDE.md § SİLME PROTOKOLÜ adım 4. Hiçbir özellik SİLİNMEDİ: psikometrik `Json` alanlarının yazım
> noktalarına şema kapısı eklendi, yöneticinin `temperamentJson` girdisi serbest `boundedJson` yerine
> mizaç sonucu şemasına bağlandı, kurum önizlemesindeki doğrulamasız DISC okuması `parseDiscVector`'a çevrildi.
> Backend dalı `otonom/AJ-95a-json-psikometrik-zod-20260928`. Kuyruk: `docs/otonom/00-KUYRUK.md` AJ-95.
> Son commit (eski hâl, tüm maddeler): backend main `b024c27`.
> Geri alma (hepsi): `git -C backend revert <AJ-95a merge commit>`.

### 1. `backend/src/controllers/userController.ts` — `UpdateUserSchema` / `CreateUserSchema` `temperamentJson` (satır 277 ve 334)

- **Neden yazılmıştı:** yönetici profil düzenleme/oluşturmada serbest-biçim JSON alanlarına boyut sınırı
  (JSON bomba koruması, `MAX_JSON_BYTES`).
- **Neden değişti:** `temperamentJson` psikometrik bir alan (mizaç testi sonucu, `TemperamentResult`);
  serbest nesne kabul etmek uygulama tipinin yazımda uygulanmamasıydı (md.170). Artık
  `TemperamentResultWriteSchema` (strict, `backend/src/services/jsonFieldSchemas.ts`) → bozuk yapı 400.
  Çıplak `null` artık 400: eskiden şema geçiriyordu ama Prisma nullable `Json` alanına çıplak `null`
  kabul etmez → istek zaten 500 ile düşüyordu. Diğer üç alan (`volunteerHistory`/`pastProjects`/`education`)
  `boundedJson`'da KALDI (AJ-95b/sonraki PR).
- **Eski hâl (aynen, iki şemada da):**
  ```ts
    temperamentJson: boundedJson,
  ```

### 2. `backend/src/controllers/selfServeController.ts` — `getDominantDimension` imzası + önizleme DISC okuması (satır 130-135, 504-512)

- **Neden yazılmıştı:** kurum önizlemesinde yöneticinin baskın DISC boyutunu seçmek.
- **Neden değişti:** doğrulamasız `as Record<string, number>` bozuk kayıtta (metin/NaN/eksik anahtar)
  baskın boyutu sessizce yanlış seçiyor, ham bozuk JSON'u yanıta koyuyordu (AJ-94 7b eki). Artık
  `parseDiscVector` → bozuk ya da eski (confidence'sız) vektör "vektör yok" sayılır → aynı 422 yolu.
- **Eski hâl (aynen):**
  ```ts
  function getDominantDimension(discVector: Record<string, number>): string {
    const dims = ['D', 'I', 'S', 'C'] as const;
    return dims.reduce((best, dim) => (
      (discVector[dim] ?? 0) > (discVector[best] ?? 0) ? dim : best
    ), 'D' as string);
  }
  ```
  ```ts
    if (!admin?.discVector) {
      return res.status(422).json({
        error:   'DISC_TESTI_EKSIK',
        message: 'Önizleme için önce DISC mizaç testini tamamlamanız gerekmektedir.',
        hint:    '/api/questions endpoint\'inden sorular alınabilir.',
      });
    }

    const discVector  = admin.discVector as Record<string, number>;
  ```

### 3. Yazım satırları — doğrulamasız değer (sunucu-hesaplı yollar)

- **Neden yazılmıştı:** değer sunucuda hesaplanıyor; tip derleme zamanında vardı.
- **Neden değişti:** derleme zamanı tipi yazımda uygulanmıyordu; hesaplama hatası ya da bozuk DB girdisi
  (ör. aralık dışı Likert) eşleştirmenin okuduğu alana bozuk yapı yazabiliyordu. Artık `toValidatedJson`.
- **Eski hâl (aynen):**
  - `backend/src/services/adaptiveTestEngine.ts:254` — `      discVector: discVector as object,`
  - `backend/src/services/discVectorService.ts:141` — `    data: { discVector: vector satisfies object },`
  - `backend/src/controllers/onboardingController.ts:496-497` —
    ```ts
          discVector:     persistedDiscVector,
          discResultCard,
    ```
  - `backend/src/controllers/temperamentController.ts:58` — `      temperamentJson: result,`
