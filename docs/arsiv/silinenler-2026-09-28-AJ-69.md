# Silinen / değişen kod arşivi — AJ-69 (2026-09-28)

> İş: AJ-69 — küçük örnekte (yanıt < k-anonimlik eşiği 3) NPS ortalaması gösterilmesin (V-05/G1-22 kalanı).
> Silme DEĞİL: aşağıdaki satırlar yerine maskeli sürümleri kondu. Eski hâl AYNEN burada.
> Geri alma: ilgili PR'ları revert etmek yeterli (backend `zahidsamiata/menti-mentor` dal `otonom/AJ-69-nps-kucuk-orneklem-20260928`, çatı aynı dal adı) ya da aşağıdaki satırları geri yapıştırmak.

## 1. `backend/src/services/algorithmTuner.ts` — "düşüş" gerekçe metni (son commit `19753e1`)
Eski hâl (`decideSectorWeight`, ~:321-327):
```ts
  if (phase1AvgNps !== null && phase1AvgNps >= HIGH && phase3AvgNps < PHASE3_DROP) {
    // 1. ay iyi başladı ama 3. ay düştü → uzun vadeli uyum sorunu
    return {
      newSectorWeight: Math.max(MIN_SECTOR_WEIGHT, currentSectorWeight - STEP),
      reason: `1. ay ortalama NPS ${phase1AvgNps}/10 → 3. ay ${phase3AvgNps}/10 düşüşü — DISC ağırlığı +${STEP * 100}%`,
    };
  }
```
- Neden yazılmıştı: yöneticiye önerinin gerekçesini sayılarla anlatmak (KR-07 ölçek düzeltmesiyle 0-10'a taşınmıştı).
- Neden değişti: 1. ay örneği 1-2 yanıt olabilir (karar yalnız 3. ay ≥ 10'u şart koşar); metin ekrana, e-postaya ve uygulanınca `algorithmWeights.reason`'a gidiyordu → küçük kurumda tek kişinin puanı okunabiliyordu. Yeni metin 3. ay ortalamasını korur, 1. ay ortalamasını yazmaz. Karar mantığı aynı.

## 2. `backend/src/services/algorithmTuner.ts` — sonuç tipi, okuma ve e-posta argümanları (son commit `19753e1`)
Eski hâl:
```ts
export type TuningResult = {
  tenantId: string;
  previousWeights: AlgorithmWeights;
  newWeights: AlgorithmWeights;
  phase1Nps: NpsStats;
  phase3Nps: NpsStats;
```
```ts
    previousWeights: { ...current },
    newWeights: { ...current },
    phase1Nps,
    phase3Nps,
    adjusted: false,
```
```ts
  const vocab = tenant?.tenantVocabulary as Record<string, unknown> | null;
  return (vocab?.pendingAlgorithmAdjustment as PendingAdjustment) ?? null;
}
```
```ts
  const vocab = tenant?.tenantVocabulary as Record<string, unknown> | null;
  const stored = vocab?.algorithmWeights as AlgorithmWeights | undefined;
  return stored ?? { ...DEFAULT_WEIGHTS };
```
```ts
      phase1Nps:  result.phase1Nps.avgNps,
      phase3Nps:  result.phase3Nps.avgNps,
```
- Neden yazılmıştı: öneriyi kaydedip yöneticiye göstermek/e-postalamak (onay kapısı).
- Neden değişti: ham ortalama k-anonimlik eşiği altında da dışarı çıkıyordu; artık `maskNpsSample` (mask.ts) ile maskeli çıkıyor, kayıtlı eski öneri ve uygulanmış gerekçe okuma anında maskeleniyor.

## 3. `backend/src/services/emailService.ts` — `sendAlgorithmAdjustmentProposal` (son commit `2970e08`)
Eski hâl:
```ts
  phase1Nps: number | null;
  phase3Nps: number | null;
```
```ts
     <p>NPS Verileri: 1. ay = ${escapeHtml(args.phase1Nps ?? 'Yetersiz veri')} | 3. ay = ${escapeHtml(args.phase3Nps ?? 'Yetersiz veri')}</p>
```
- Neden değişti: e-posta artık istatistik nesnesi alır ve `formatNpsSample` ile kendisi de maskeler (eşik altında "gizli (<3 yanıt)").

## 4. `backend/tests/email-html-escape.unit.test.ts:142` (son commit `5d76b94`)
Eski hâl:
```ts
      phase1Nps: null, phase3Nps: 40, prevSector: 60, prevDisc: 40, newSector: 55, newDisc: 45,
```
- Neden değişti: yeni imzaya uyarlama (test ettiği kaçırma davranışı aynı).

## 5. `frontend/src/app/(admin)/admin/algorithm-tuner/page.tsx` — NPS kutuları (son commit `674da94`)
Eski hâl:
```tsx
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-border p-3 text-center">
                  <p className="text-xs text-muted-foreground">1. Ay NPS</p>
                  <p className="text-2xl font-bold mt-1">
                    {pending.phase1Nps.avgNps ?? '—'}
                  </p>
                  <p className="text-xs text-muted-foreground">{pending.phase1Nps.sampleSize} yanıt</p>
                </div>
                <div className="rounded-xl border border-border p-3 text-center">
                  <p className="text-xs text-muted-foreground">3. Ay NPS</p>
                  <p className="text-2xl font-bold mt-1">
                    {pending.phase3Nps.avgNps ?? '—'}
                  </p>
                  <p className="text-xs text-muted-foreground">{pending.phase3Nps.sampleSize} yanıt</p>
                </div>
              </div>
```
- Neden değişti: gizli örnekte "gizli (<3 yanıt — gizlilik için gösterilmiyor)" gösteren `NpsTile` bileşenine taşındı.

## 6. `frontend/src/lib/api/algorithmTuner.ts` — `PendingAdjustment` tipi (son commit `674da94`)
Eski hâl:
```ts
  phase1Nps: { avgNps: number | null; sampleSize: number };
  phase3Nps: { avgNps: number | null; sampleSize: number };
```
- Neden değişti: backend artık `suppressed` + `minSampleSize` de döndürüyor (`NpsSample` tipi).
