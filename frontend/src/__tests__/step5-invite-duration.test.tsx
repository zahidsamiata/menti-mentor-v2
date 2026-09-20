/**
 * Step5Invite — davet süresi metni (U-11).
 *
 * Ekranda "90 gün" yazıyordu ama kod gerçeği 30 gün (invitation JWT expiresIn '30d';
 * config.invitationTokenExpiry=90d ölü ayar). Metin koda hizalandı.
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Step5Invite } from '@/app/onboarding/stk/_steps/Step5Invite';
import type { WizardData } from '@/app/onboarding/stk/_StkOnboardingContent';

vi.mock('@/lib/api/selfServe', () => ({
  createInvitation: vi.fn().mockResolvedValue({ ok: false, error: { message: 'x' } }),
}));

describe('Step5Invite — davet süresi', () => {
  it('davet linki geçerlilik süresi 30 gün gösterir (90 değil)', () => {
    // tenantId yok → useEffect erken döner, ağ çağrısı olmaz.
    render(<Step5Invite data={{} as WizardData} />);

    expect(screen.getByText(/30 gün geçerlidir/)).toBeInTheDocument();
    expect(screen.queryByText(/90 gün geçerlidir/)).not.toBeInTheDocument();
  });
});
