import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import {
  ScenarioGuideEngine,
  type EngineScenario,
} from '@/components/organisms/ScenarioGuideEngine';

const SCENARIOS: EngineScenario[] = [
  {
    id: 's1',
    situationText: 'İlk durum burada.',
    choices: [
      { key: 'a', label: 'Doğru seçim' },
      { key: 'b', label: 'Yanlış seçim' },
    ],
  },
  {
    id: 's2',
    situationText: 'İkinci durum burada.',
    choices: [{ key: 'a', label: 'Tek seçim' }],
  },
];

function renderEngine(overrides: Partial<React.ComponentProps<typeof ScenarioGuideEngine>> = {}) {
  const resolveChoice = vi.fn(async (_id: string, key: string) => ({
    outcome: key === 'a' ? ('correct' as const) : ('wrong' as const),
    feedback: key === 'a' ? 'Aferin, iyi seçim.' : 'Bu seçim zorlar.',
  }));
  const onComplete = vi.fn(async () => ({ ok: true }));
  render(
    <ScenarioGuideEngine
      title="Test Yolculuğu"
      subtitle="Baskı yok, keşif."
      scenarios={SCENARIOS}
      resolveChoice={resolveChoice}
      onComplete={onComplete}
      completion={{ title: 'Bitti!', message: 'Kapanış metni.', buttonLabel: 'Dön' }}
      {...overrides}
    />,
  );
  return { resolveChoice, onComplete };
}

describe('ScenarioGuideEngine — keşif motoru (puan yok)', () => {
  it('ilk durumu ve seçenekleri gösterir; puan/score görünmez', () => {
    renderEngine();
    expect(screen.getByText(/İlk durum burada/)).toBeInTheDocument();
    expect(screen.getByText('Doğru seçim')).toBeInTheDocument();
    expect(screen.queryByText(/puan/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/score/i)).not.toBeInTheDocument();
  });

  it('seçim yapınca resolveChoice çağrılır ve feedback gösterilir', async () => {
    const { resolveChoice } = renderEngine();
    fireEvent.click(screen.getByText('Yanlış seçim'));
    await waitFor(() => expect(screen.getByText('Bu seçim zorlar.')).toBeInTheDocument());
    expect(resolveChoice).toHaveBeenCalledWith('s1', 'b');
  });

  it('tüm aşamalar bitince tamamlama ekranı çıkar ve onComplete çağrılır', async () => {
    const { onComplete } = renderEngine();

    // 1. aşama: seç → sonraki
    fireEvent.click(screen.getByText('Doğru seçim'));
    await waitFor(() => expect(screen.getByText('Aferin, iyi seçim.')).toBeInTheDocument());
    fireEvent.click(screen.getByText('Sonraki →'));

    // 2. aşama (son): seç → tamamla
    await waitFor(() => expect(screen.getByText(/İkinci durum burada/)).toBeInTheDocument());
    fireEvent.click(screen.getByText('Tek seçim'));
    await waitFor(() => expect(screen.getByText('Tamamla →')).toBeInTheDocument());
    fireEvent.click(screen.getByText('Tamamla →'));

    // Kapanış ekranı
    await waitFor(() => expect(screen.getByText('Bitti!')).toBeInTheDocument());
    expect(screen.getByText('Kapanış metni.')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Dön'));
    await waitFor(() => expect(onComplete).toHaveBeenCalledTimes(1));
  });
});
