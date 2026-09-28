'use client';

/**
 * Öğrenme Yolculuğu davet kartı — mentör ve menti panolarında ortak kullanılır (DRY).
 * Davetkâr, baskısız: tamamlanmışsa "tekrar bak", yarıdaysa "Aşama X/Y · sıradaki: …" +
 * "kaldığın yerden devam et" (P-08 — ilerleme kalıcı), hiç başlamadıysa "başla".
 */

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useApiClient } from '@/hooks/useApiClient';
import { useQuery } from '@/hooks/useQuery';
import { learningJourneyApi } from '@/lib/api/learningJourney';
import { journeyProgressLine } from '@/lib/learningJourneyProgress';

export function LearningJourneyCard() {
  const api = useApiClient();
  const { data } = useQuery(() => learningJourneyApi.getStatus(api), [api]);

  const completed = data?.completed === true;
  const progressLine = journeyProgressLine(data);

  return (
    <Card className="border-primary/30 bg-primary/5">
      <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4">
        <div>
          <p className="text-sm font-semibold flex items-center gap-2">
            🚀 Öğrenme Yolculuğu
            {completed && (
              <Badge variant="success" className="text-xs">
                Tamamlandı ✓
              </Badge>
            )}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            {completed
              ? 'Yolculuğu tamamladın. Dilediğinde geri dönüp tekrar keşfedebilirsin.'
              : progressLine
                ? progressLine
                : 'Kısa, sıcak bir keşif — sınav değil. Gerçek durumlarda iyi bir mentörlüğün nasıl hissettirdiğini birlikte deneyimleyelim.'}
          </p>
        </div>
        <Button asChild size="sm" variant={completed ? 'outline' : 'default'}>
          <Link href="/learning-journey">
            {completed ? 'Tekrar bak →' : progressLine ? 'Kaldığın yerden devam et →' : 'Yolculuğa başla →'}
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
