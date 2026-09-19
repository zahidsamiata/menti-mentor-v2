import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor, act } from '@testing-library/react';
import { useDiscTest } from '@/hooks/useDiscTest';
import { discTestApi } from '@/lib/api/discTest';

vi.mock('@/lib/api/discTest', () => ({
  discTestApi: {
    getQuestions: vi.fn(),
    getProgress: vi.fn(),
    respond: vi.fn(),
  },
}));

const mockedApi = vi.mocked(discTestApi);

const META = { coreCount: 2, deepeningCount: 0, coreThreshold: 2, dimensionalTotal: 2 };
function okQuestions(items: Array<{ id: string }>) {
  return {
    ok: true as const,
    data: {
      items: items.map((q, i) => ({
        id: q.id,
        text: `Soru ${i}`,
        type: 'CORE' as const,
        discDimension: 'D' as const,
        order: i,
      })),
      total: items.length,
      meta: META,
    },
  };
}
const okProgress = {
  ok: true as const,
  data: {
    totalAnswered: 0,
    coreAnswered: 0,
    deepeningAnswered: 0,
    coreThreshold: 2,
    isDeepening: false,
    isComplete: false,
    completionPercent: 0,
  },
};

describe('useDiscTest — K-02 yükleme durumu ayrımı', () => {
  beforeEach(() => vi.clearAllMocks());

  it('yükleme hatasında: error dolar, loading kapanır (sonsuz iskelet yok)', async () => {
    mockedApi.getQuestions.mockResolvedValue({ ok: false, error: { message: 'boom' } } as never);
    mockedApi.getProgress.mockResolvedValue(okProgress as never);

    const { result } = renderHook(() =>
      useDiscTest({ token: 't', tenantId: 'tn', onComplete: vi.fn() }),
    );

    await waitFor(() => expect(result.current.error).not.toBeNull());
    // Kritik: loading kapandı → sayfa iskelet yerine hata ekranını gösterebilir
    expect(result.current.state.loading).toBe(false);
    expect(result.current.state.questions.length).toBe(0);
  });

  it('reload() başarılı ikinci denemede soruları yükler', async () => {
    mockedApi.getQuestions
      .mockResolvedValueOnce({ ok: false, error: { message: 'boom' } } as never)
      .mockResolvedValueOnce(okQuestions([{ id: 'q1' }, { id: 'q2' }]) as never);
    mockedApi.getProgress.mockResolvedValue(okProgress as never);

    const { result } = renderHook(() =>
      useDiscTest({ token: 't', tenantId: 'tn', onComplete: vi.fn() }),
    );

    await waitFor(() => expect(result.current.error).not.toBeNull());

    act(() => result.current.reload());

    await waitFor(() => expect(result.current.state.questions.length).toBe(2));
    expect(result.current.error).toBeNull();
    expect(result.current.state.loading).toBe(false);
    expect(result.current.currentQuestion?.id).toBe('q1');
  });

  it('boş havuz: loading kapanır, hata yok, soru yok (boş-durum ekranı için)', async () => {
    mockedApi.getQuestions.mockResolvedValue(okQuestions([]) as never);
    mockedApi.getProgress.mockResolvedValue(okProgress as never);

    const { result } = renderHook(() =>
      useDiscTest({ token: 't', tenantId: 'tn', onComplete: vi.fn() }),
    );

    await waitFor(() => expect(result.current.state.loading).toBe(false));
    expect(result.current.error).toBeNull();
    expect(result.current.state.questions.length).toBe(0);
  });
});
