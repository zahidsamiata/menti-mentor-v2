import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProfileStep } from '@/app/onboarding/_steps/ProfileStep';
import type { ProfileData } from '@/types/onboarding';

/**
 * Aşama 1 — ProfileStep opsiyonel bağlam alanları (okul / şirket / topluluk).
 * Virgülle ayrılmış metin → string[]; menti için skills → goals.
 */
describe('ProfileStep — opsiyonel bağlam alanları', () => {
  it('okul/şirket girdilerini diziye çevirir ve menti skills→goals gönderir', () => {
    const onComplete = vi.fn();
    render(<ProfileStep role="MENTI" onComplete={onComplete} isSubmitting={false} error={null} />);

    // Zorunlu alanlar
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Teknoloji' } });
    fireEvent.click(screen.getByRole('button', { name: /Alanımda deneyim kazandım/ })); // 3–7 Yıl
    fireEvent.click(screen.getByRole('button', { name: 'Proje Yönetimi' }));            // skill chip

    // Opsiyonel bağlam
    fireEvent.change(screen.getByLabelText(/Okullar/), { target: { value: 'Boğaziçi, ODTÜ' } });
    fireEvent.change(screen.getByLabelText(/Şirketler/), { target: { value: 'Trendyol' } });

    fireEvent.click(screen.getByRole('button', { name: /Devam Et/ }));

    expect(onComplete).toHaveBeenCalledTimes(1);
    const payload = onComplete.mock.calls[0]![0] as ProfileData;
    expect(payload.sector).toBe('Teknoloji');
    expect(payload.schools).toEqual(['Boğaziçi', 'ODTÜ']);
    expect(payload.companies).toEqual(['Trendyol']);
    expect(payload.communities).toBeUndefined();        // boş → gönderilmez
    expect(payload.goals).toEqual(['Proje Yönetimi']);  // menti: skills → goals
  });

  it('opsiyonel alanlar boşsa yalnızca zorunlu veri gönderilir (mentor: goals yok)', () => {
    const onComplete = vi.fn();
    render(<ProfileStep role="MENTOR" onComplete={onComplete} isSubmitting={false} error={null} />);

    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Finans' } });
    fireEvent.click(screen.getByRole('button', { name: /Alanımda uzmanlaştım/ })); // 8+ Yıl
    fireEvent.click(screen.getByRole('button', { name: /Devam Et/ }));

    const payload = onComplete.mock.calls[0]![0] as ProfileData;
    expect(payload.schools).toBeUndefined();
    expect(payload.companies).toBeUndefined();
    expect(payload.goals).toBeUndefined();  // mentor → goals gönderilmez
  });
});
