/**
 * AJ-84 — Günlük profil sorusu (DailyQuestionWidget) ekran okuyucu yapısı.
 *
 * Neden ayrı dosya: `a11y-f21.test.tsx` LikertScale/ThreeQuestionsStep'i ölçüyor; menti/mentör panel
 * testleri bu bileşeni taklit ediyor. Burada GERÇEK bileşen render edilir; yalnız API katmanı sahtedir.
 *
 * Bileşenin gerçek davranışı (DailyQuestionWidget.tsx:82-86): seçim ayrı "Gönder" düğmesiyle
 * gönderildiği için ok tuşu odağı taşır VE seçer (`selectOnMove` varsayılanı true).
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, within, waitFor } from '@testing-library/react';
import { DailyQuestionWidget } from '@/components/organisms/DailyQuestionWidget';

const USER_ID = 'user-1';
const QUESTION_ID = 'q-1';
const QUESTION_TEXT = 'Yeni insanlarla tanışmaktan keyif alırım.';

const nextResponse = {
  done: false,
  question: {
    id: QUESTION_ID,
    tenantId: null,
    text: QUESTION_TEXT,
    type: 'CORE',
    discDimension: 'I',
    order: 1,
    isActive: true,
    isRequired: false,
  },
  progress: {
    totalAnswered: 3,
    coreAnswered: 3,
    deepeningAnswered: 0,
    coreThreshold: 20,
    isDeepening: false,
    isComplete: false,
    completionPercent: 15,
  },
};

// useQuery bağımlılığında `api` var → her render'da aynı fonksiyon dönmeli (yoksa sonsuz yeniden çekim).
const { apiMock } = vi.hoisted(() => ({ apiMock: vi.fn() }));
vi.mock('@/hooks/useApiClient', () => ({ useApiClient: () => apiMock }));

beforeEach(() => {
  apiMock.mockReset();
  apiMock.mockImplementation(async () => ({ ok: true, data: nextResponse }));
});

async function renderWidget() {
  render(<DailyQuestionWidget userId={USER_ID} />);
  return screen.findByRole('radiogroup', { name: QUESTION_TEXT });
}

describe('AJ-84 · DailyQuestionWidget — radiogroup erişilebilirliği', () => {
  it('soru metniyle adlandırılmış radiogroup; 5 radio, hiçbiri seçili değil, yalnız ilki Tab sırasında', async () => {
    const group = await renderWidget();
    expect(group).toHaveAccessibleName(QUESTION_TEXT);

    const radios = within(group).getAllByRole('radio');
    expect(radios).toHaveLength(5);
    radios.forEach((r) => expect(r).toHaveAttribute('aria-checked', 'false'));
    expect(radios.map((r) => r.tabIndex)).toEqual([0, -1, -1, -1, -1]);
    expect(screen.getByRole('button', { name: 'Gönder ve devam et' })).toBeDisabled();
  });

  it('tıklanan seçenek aria-checked=true, diğerleri false; Tab sırası seçilene geçer', async () => {
    const group = await renderWidget();
    const radios = within(group).getAllByRole('radio');

    fireEvent.click(radios[2]!);

    expect(radios.map((r) => r.getAttribute('aria-checked'))).toEqual([
      'false', 'false', 'true', 'false', 'false',
    ]);
    expect(radios.map((r) => r.tabIndex)).toEqual([-1, -1, 0, -1, -1]);
  });

  it('ok tuşları odağı taşır VE seçer; Home/End uçlara gider, sondan başa sarar', async () => {
    const group = await renderWidget();
    const radios = within(group).getAllByRole('radio');
    const checked = () => radios.map((r) => r.getAttribute('aria-checked') === 'true');

    radios[0]!.focus();
    fireEvent.keyDown(radios[0]!, { key: 'ArrowRight' });
    expect(radios[1]).toHaveFocus();
    expect(checked()).toEqual([false, true, false, false, false]);

    fireEvent.keyDown(radios[1]!, { key: 'ArrowDown' });
    expect(radios[2]).toHaveFocus();
    expect(checked()).toEqual([false, false, true, false, false]);

    fireEvent.keyDown(radios[2]!, { key: 'ArrowLeft' });
    expect(radios[1]).toHaveFocus();
    expect(checked()).toEqual([false, true, false, false, false]);

    fireEvent.keyDown(radios[1]!, { key: 'End' });
    expect(radios[4]).toHaveFocus();
    expect(checked()).toEqual([false, false, false, false, true]);

    fireEvent.keyDown(radios[4]!, { key: 'ArrowRight' }); // sondan başa sarar
    expect(radios[0]).toHaveFocus();
    expect(checked()).toEqual([true, false, false, false, false]);

    fireEvent.keyDown(radios[0]!, { key: 'ArrowUp' }); // baştan sona sarar
    expect(radios[4]).toHaveFocus();

    fireEvent.keyDown(radios[4]!, { key: 'Home' });
    expect(radios[0]).toHaveFocus();
    expect(checked()).toEqual([true, false, false, false, false]);
    expect(radios.map((r) => r.tabIndex)).toEqual([0, -1, -1, -1, -1]);
  });

  it('klavyeyle seçilen değer "Gönder ve devam et" ile gönderilir', async () => {
    const group = await renderWidget();
    const radios = within(group).getAllByRole('radio');

    radios[0]!.focus();
    fireEvent.keyDown(radios[0]!, { key: 'ArrowRight' });
    fireEvent.keyDown(radios[1]!, { key: 'ArrowRight' });
    fireEvent.keyDown(radios[2]!, { key: 'ArrowRight' }); // 4 = "Katılıyorum"

    const submit = screen.getByRole('button', { name: 'Gönder ve devam et' });
    expect(submit).toBeEnabled();
    fireEvent.click(submit);

    await waitFor(() =>
      expect(apiMock).toHaveBeenCalledWith(`/api/users/${USER_ID}/adaptive-test/answer`, {
        method: 'POST',
        body: { questionId: QUESTION_ID, value: 4 },
      }),
    );
    expect(await screen.findByText('Kaydedildi!')).toBeInTheDocument();
  });
});
