# Değiştirilenler arşivi — 2026-09-28 · AJ-94 (DiscVector tip hijyeni, md.168+169)

> CLAUDE.md § SİLME PROTOKOLÜ adım 4. Hiçbir özellik SİLİNMEDİ: bir fonksiyon (`parseDiscVector`)
> başka dosyaya TAŞINDI ve sıkılaştırıldı, üç doğrulamasız tip dönüşümü doğrulamalı okumaya çevrildi,
> bir tip yeniden adlandırıldı. Backend dalı `otonom/AJ-94-discvector-tip-hijyeni-20260928`.
> Kuyruk: `docs/otonom/00-KUYRUK.md` AJ-94. Skor formülü (`computeDiscScore`/`computeTotalScore`) DEĞİŞMEDİ;
> geçerli vektörde skorlar birebir aynı (regresyon testi `backend/tests/disc-vector-parse.unit.test.ts`).
> Son commit (eski hâl, tüm maddeler): backend main `f49153b`.
> Geri alma (hepsi): `git -C backend revert <AJ-94 merge commit>`.

### 1. `backend/src/services/discVectorService.ts` — modül-içi `parseDiscVector` (satır 31-50)

- **Neden yazılmıştı:** Prisma `Json` dönüşünü `as unknown as DiscVector` yerine tip-güvenli okumak
  (yalnız `getDiscVector` kullanıyordu; onun da çağıranı yok).
- **Neden değişti:** eşleştirme ve analitik aynı kapıyı kullansın diye saf `backend/src/services/scoring.ts`'e
  taşındı ve `export` edildi; `typeof === 'number'` NaN/Infinity'yi geçiriyordu → `Number.isFinite` eklendi,
  dizi açıkça reddediliyor. `discVectorService` artık `scoring.js`'ten içe aktarıyor.
- **Eski hâl (aynen):**
  ```ts
  // ─── Tip doğrulama guard'ı ────────────────────────────────────────────────────

  /**
   * Prisma'nın `Json` dönüş tipini `DiscVector`'e tip-güvenli şekilde dönüştürür.
   * `as unknown as DiscVector` kullanımını ortadan kaldırır.
   */
  function parseDiscVector(raw: unknown): DiscVector | null {
    if (raw === null || typeof raw !== 'object') return null;
    const v = raw as Record<string, unknown>;
    if (
      typeof v['D'] !== 'number' ||
      typeof v['I'] !== 'number' ||
      typeof v['S'] !== 'number' ||
      typeof v['C'] !== 'number' ||
      typeof v['confidence'] !== 'number'
    ) {
      return null;
    }
    return { D: v['D'], I: v['I'], S: v['S'], C: v['C'], confidence: v['confidence'] };
  }
  ```
  (içe aktarma satırı: `import type { DiscVector } from './scoring.js';`)

### 2. `backend/src/services/matching.ts` — iki doğrulamasız dönüşüm (satır 3, 301, 350-351, 528)

- **Neden yazılmıştı:** DB `Json` alanını skor motoruna vermek (yorum "güvenli şekilde cast et" diyordu ama doğrulama yoktu).
- **Neden değişti:** bozuk kayıt (eksik anahtar, metin, NaN) `computeDiscScore`'da NaN/yanlış skor üretip
  sıralamayı sessizce bozuyordu. Artık `parseDiscVector` → bozuk = null = vektörsüz aday/menti yolu.
- **Eski hâl (aynen):**
  ```ts
  import { computeTotalScore, isAntiMatch, computeMentorQualityMultiplier, type DiscVector } from './scoring.js';
  ```
  ```ts
    discVector: unknown;          // DB'den gelen JSON — DiscVector olarak cast edilir
  ```
  ```ts
      // Kesirli vektörü güvenli şekilde cast et
      const mentiVector = opts.sectorOnly ? null : (c.discVector as DiscVector | null);
  ```
  ```ts
    const mentiVector = menti.discVector as DiscVector | null;
  ```

### 3. `backend/src/controllers/analyticsController.ts` — üçüncü doğrulamasız dönüşüm (satır 5, 19-22)

- **Neden yazılmıştı:** kayıtlı vektör varsa analitik profilde onu kullanmak, yoksa discType yedeği.
- **Neden değişti:** aynı sorun (kuyrukta yoktu, ön analizde bulundu). Bozuk vektör artık discType yedeğine düşer.
  ⚠️ Yan etki: confidence alanı OLMAYAN eski (PS-02 öncesi) vektörler de artık discType yedeğine düşer —
  `/api/analytics/:userId`'nin ön yüzde çağıranı YOK (grep `frontend/src` = 0), kullanıcıya görünen değişiklik yok.
- **Eski hâl (aynen):**
  ```ts
  import type { DiscVector } from '../services/scoring.js';
  ```
  ```ts
    // discVector yoksa fallback: discType'dan düz vektör üret
    let vec: DiscVector;
    if (user.discVector) {
      vec = user.discVector as DiscVector;
    } else if (user.discType) {
  ```

### 4. `backend/src/services/scoring.config.ts` + `disc-to-ocean.adapter.ts` — tip adı `DiscVector` → `DiscAxisValues`

- **Neden yazılmıştı:** DISC→OCEAN ağırlık satırı ve 0-100 ölçekli girdi için küçük harfli yapı.
- **Neden değişti:** `scoring.ts`'teki eşleştirme `DiscVector`'ü (büyük harf + confidence, 0-1 oran) ile aynı adı
  taşıyordu; yapı ve ölçek farklı olduğundan birleştirilemez → ayrışan ad. Yapı değişmedi.
- **Eski hâl (aynen):**
  ```ts
  export interface DiscVector {
    d: number;
    i: number;
    s: number;
    c: number;
  }
  ```
  ```ts
  export const DISC_TO_OCEAN_WEIGHTS: Record<OceanKey, DiscVector> = {
  ```
  adapter: `type DiscVector,` (import) · `toOceanScale(...): DiscVector` · `discToOcean(disc: DiscVector)`.
