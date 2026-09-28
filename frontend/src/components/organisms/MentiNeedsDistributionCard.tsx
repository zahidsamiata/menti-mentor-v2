/**
 * Organism: MentiNeedsDistributionCard — mentilerin "şu an en çok neye ihtiyacın var?" (S1)
 * cevaplarının kurum geneli TOPLU dağılımı (AJ-89).
 *
 * §10.3 (PO kararı): yönetici yalnız toplu görür, kişiye inmez. Gizleme BACKEND'de yapılır
 * (`mentiNeedsDistribution.service.ts`, k-anonimlik) — bu kart gelen sayıyı yalnız gösterir,
 * eşik altı hücreyi/dağılımı "gizli" diye açıklar (sessiz 0 göstermez: 0 ile 1-2 kişi ayırt edilmez).
 * Seçenek metinleri onboarding'deki soruyla AYNI kaynaktan (`threeQuestionsText.ts`).
 */

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MENTI_S1 } from '@/lib/threeQuestionsText';
import type { MentiNeedsDistribution } from '@/types/admin';

interface MentiNeedsDistributionCardProps {
  distribution: MentiNeedsDistribution;
}

const labelOf = (need: string): string => MENTI_S1.options.find((o) => o.value === need)?.label ?? need;

export function MentiNeedsDistributionCard({ distribution }: MentiNeedsDistributionCardProps) {
  const min = distribution.minGroupSize;
  return (
    <Card data-testid="kpi-menti-needs">
      <CardHeader>
        <CardTitle className="text-base">Mentilerin ihtiyaç dağılımı</CardTitle>
        <p className="text-xs text-muted-foreground">«{MENTI_S1.prompt}» sorusunun kurum geneli toplu sonucu.</p>
      </CardHeader>
      <CardContent className="space-y-2">
        {distribution.suppressed ? (
          <p className="text-sm text-muted-foreground" data-testid="kpi-menti-needs-hidden">
            Yeterli cevap yok (gizlilik için en az {min} menti cevabı gerekiyor).
          </p>
        ) : (
          <>
            {distribution.options.map((o) => (
              <div key={o.need} className="flex justify-between gap-2 text-sm">
                <span className="text-muted-foreground">{labelOf(o.need)}</span>
                {o.suppressed ? (
                  <span className="text-xs text-muted-foreground text-right">gizli (&lt;{min} kişi)</span>
                ) : (
                  <span className="font-semibold">
                    %{o.percent}
                    <span className="text-xs text-muted-foreground ml-1">({o.count} kişi)</span>
                  </span>
                )}
              </div>
            ))}
            <p className="pt-1 text-xs text-muted-foreground">
              {distribution.respondentCount} menti cevapladı. Her menti en fazla {MENTI_S1.max} seçenek
              işaretleyebildiği için yüzdelerin toplamı %100&apos;ü aşabilir. Kişi bazında gösterilmez.
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
}
