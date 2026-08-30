import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThreeQuestionsStep } from '@/app/onboarding/_steps/ThreeQuestionsStep';
import type { MatchingPreferences } from '@/types/onboarding';

/**
 * Üç soru ekranı (S1/S2/S3, §10.2) — rol ayrımı, ≤2 sınırı, S1 opsiyonel, S2/S3 zorunlu.
 */
describe('ThreeQuestionsStep', () => {
  it('menti: S1 (≤2) + S2 + S3 seçip gönderir', () => {
    const onComplete = vi.fn();
    render(<ThreeQuestionsStep role="MENTI" onComplete={onComplete} isSubmitting={false} error={null} />);

    fireEvent.click(screen.getByRole('button', { name: 'Ne yapacağıma karar veremiyorum' }));
    fireEvent.click(screen.getByRole('button', { name: 'Kendime güvenmiyorum' }));
    fireEvent.click(screen.getByRole('button', { name: 'Birlikte düşünelim' }));       // S2
    fireEvent.click(screen.getByRole('button', { name: 'Öğrenmek' }));                  // S3
    fireEvent.click(screen.getByRole('button', { name: /Tamamla ve Eşleşmeye Geç/ }));

    expect(onComplete).toHaveBeenCalledTimes(1);
    const p = onComplete.mock.calls[0]![0] as MatchingPreferences;
    expect(p.mentiNeeds).toEqual(['KARAR_VEREMIYORUM', 'GUVENMIYORUM']);
    expect(p.supportApproach).toBe('BIRLIKTE_DUSUNME');
    expect(p.priorityValue).toBe('LEARNING');
    expect(p.mentorStrengths).toBeUndefined();
  });

  it('mentör: S1 mentör soru setini gösterir ve gönderir', () => {
    const onComplete = vi.fn();
    render(<ThreeQuestionsStep role="MENTOR" onComplete={onComplete} isSubmitting={false} error={null} />);

    fireEvent.click(screen.getByRole('button', { name: 'Ağ kurmada' }));
    fireEvent.click(screen.getByRole('button', { name: 'Yol gösteririm' }));            // mentör S2
    fireEvent.click(screen.getByRole('button', { name: 'Somut sonuç almak' }));         // S3
    fireEvent.click(screen.getByRole('button', { name: /Tamamla ve Eşleşmeye Geç/ }));

    const p = onComplete.mock.calls[0]![0] as MatchingPreferences;
    expect(p.mentorStrengths).toEqual(['AG_KURMA']);
    expect(p.supportApproach).toBe('YOL_GOSTERME');
    expect(p.mentiNeeds).toBeUndefined();
  });

  it('S1 en fazla 2 — 3. seçenek engellenir', () => {
    const onComplete = vi.fn();
    render(<ThreeQuestionsStep role="MENTI" onComplete={onComplete} isSubmitting={false} error={null} />);

    fireEvent.click(screen.getByRole('button', { name: 'Ne yapacağıma karar veremiyorum' }));
    fireEvent.click(screen.getByRole('button', { name: 'Kendime güvenmiyorum' }));
    // 3.'yü tıkla — disabled olmalı, eklenmemeli
    const third = screen.getByRole('button', { name: 'Doğru insanları tanımıyorum' });
    expect(third).toBeDisabled();
    fireEvent.click(third);

    fireEvent.click(screen.getByRole('button', { name: 'Birlikte düşünelim' }));
    fireEvent.click(screen.getByRole('button', { name: 'Öğrenmek' }));
    fireEvent.click(screen.getByRole('button', { name: /Tamamla ve Eşleşmeye Geç/ }));

    const p = onComplete.mock.calls[0]![0] as MatchingPreferences;
    expect(p.mentiNeeds).toHaveLength(2);
  });

  it('S1 boş bırakılabilir; yalnız S2 + S3 ile gönderilir (EK2)', () => {
    const onComplete = vi.fn();
    render(<ThreeQuestionsStep role="MENTI" onComplete={onComplete} isSubmitting={false} error={null} />);

    fireEvent.click(screen.getByRole('button', { name: 'Sadece dinlesin, ben çözerim' })); // S2
    fireEvent.click(screen.getByRole('button', { name: 'Anlaşılmak' }));                     // S3
    fireEvent.click(screen.getByRole('button', { name: /Tamamla ve Eşleşmeye Geç/ }));

    const p = onComplete.mock.calls[0]![0] as MatchingPreferences;
    expect(p.mentiNeeds).toBeUndefined();
    expect(p.supportApproach).toBe('DINLEME');
    expect(p.priorityValue).toBe('UNDERSTOOD');
  });

  it('S2/S3 zorunlu — ikisi seçilmeden gönderilemez', () => {
    const onComplete = vi.fn();
    render(<ThreeQuestionsStep role="MENTI" onComplete={onComplete} isSubmitting={false} error={null} />);

    // yalnız S2 seçili, S3 yok → buton disabled
    fireEvent.click(screen.getByRole('button', { name: 'Birlikte düşünelim' }));
    fireEvent.click(screen.getByRole('button', { name: /Tamamla ve Eşleşmeye Geç/ }));
    expect(onComplete).not.toHaveBeenCalled();
  });
});
