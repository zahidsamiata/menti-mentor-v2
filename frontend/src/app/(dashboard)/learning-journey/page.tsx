'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';
import { useApiClient } from '@/hooks/useApiClient';
import { useQuery } from '@/hooks/useQuery';
import { learningJourneyApi } from '@/lib/api/learningJourney';
import {
  ScenarioGuideEngine,
  type EngineScenario,
} from '@/components/organisms/ScenarioGuideEngine';
import { AlertMessage } from '@/components/molecules/AlertMessage';

/**
 * Öğrenme Yolculuğu — mentör ve menti için keşif akışı (ortak motor).
 * İçerik API'den gelir (audience = kullanıcının rolü); cevap anahtarı önden yüklenmez.
 */
export default function LearningJourneyPage() {
  const { user } = useAuth();
  const api = useApiClient();
  const router = useRouter();

  const isPlayer = user?.role === 'MENTOR' || user?.role === 'MENTI';

  const { data, isLoading, error } = useQuery(
    () => learningJourneyApi.getStages(api),
    [api],
    { enabled: isPlayer },
  );

  if (!user || !isPlayer) return null;

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto py-6">
        <div className="h-40 rounded-2xl bg-muted animate-pulse" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="max-w-2xl mx-auto py-6">
        <AlertMessage type="error" message={error ?? 'Yolculuk yüklenemedi.'} />
      </div>
    );
  }

  const scenarios: EngineScenario[] = data.items.map((s) => ({
    id: s.id,
    situationText: s.situationText,
    choices: s.choices,
  }));

  async function resolveChoice(stageId: string, choiceKey: string) {
    const res = await learningJourneyApi.select(api, stageId, choiceKey);
    if (!res.ok) throw new Error(res.error.message ?? 'Seçim çözümlenemedi');
    return { outcome: res.data.outcome, feedback: res.data.feedback };
  }

  async function onComplete() {
    const res = await learningJourneyApi.complete(api);
    if (res.ok) router.push(user?.role === 'MENTOR' ? '/mentor' : '/menti');
    return { ok: res.ok };
  }

  return (
    <ScenarioGuideEngine
      title={data.frame.journeyTitle}
      subtitle={data.frame.intro}
      scenarios={scenarios}
      resolveChoice={resolveChoice}
      onComplete={onComplete}
      completion={{
        emoji: '🌟',
        title: 'Yolculuğu tamamladın!',
        message: data.frame.closing,
        buttonLabel: 'Panele Dön',
      }}
    />
  );
}
