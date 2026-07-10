'use client';

import { useApiClient } from '@/hooks/useApiClient';
import { useQuery } from '@/hooks/useQuery';
import { questionsApi } from '@/lib/api/questions';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface Props {
  userId: string;
}

/**
 * DISC profil güvenilirliği göstergesi.
 *
 * confidence = backend'den gelen discVector.confidence (0–1).
 * 0 ise henüz yanıt yok → bileşen görünmez.
 * Hiçbir eşik değeri hardcode edilmedi; gösterilen yüzde ve bar
 * tamamen backend yanıtından türetilir.
 */
export function DiscConfidenceWidget({ userId }: Props) {
  const api = useApiClient();

  const { data, isLoading } = useQuery(
    () => questionsApi.getDiscPreview(api, userId),
    [api, userId],
    { enabled: Boolean(userId) },
  );

  if (isLoading || !data) return null;

  const confidence = data.discVector.confidence;
  if (confidence <= 0) return null;

  const pct = Math.round(confidence * 100);

  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardContent className="pt-4 pb-3 space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-foreground">Profil Güvenilirliği</span>
          <span className="font-bold text-primary">%{pct}</span>
        </div>
        <Progress value={pct} className="h-1.5" />
        <p className="text-xs text-muted-foreground">
          Daha fazla soru cevapladıkça profilin daha isabetli eşleşmeler üretir.
        </p>
      </CardContent>
    </Card>
  );
}
