/**
 * Step5Invite — davet süresi metni (U-11).
 *
 * Ekranda "90 gün" yazıyordu; U-11 kod gerçeğine (30 gün) hizaladı. U-12 (KARAR-82 A) süreyi 7 güne
 * indirdi (backend services/invitationToken.ts INVITATION_TTL_DAYS). Metin koda hizalı.
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Step5Invite } from '@/app/onboarding/stk/_steps/Step5Invite';
import type { WizardData } from '@/app/onboarding/stk/_StkOnboardingContent';

vi.mock('@/lib/api/selfServe', () => ({
  createInvitation: vi.fn().mockResolvedValue({ ok: false, error: { message: 'x' } }),
}));

describe('Step5Invite — davet süresi', () => {
  it('davet linki geçerlilik süresi 7 gün gösterir (30/90 değil)', () => {
    // tenantId yok → useEffect erken döner, ağ çağrısı olmaz.
    render(<Step5Invite data={{} as WizardData} />);

    expect(screen.getByText(/7 gün geçerlidir/)).toBeInTheDocument();
    expect(screen.queryByText(/30 gün geçerlidir/)).not.toBeInTheDocument();
    expect(screen.queryByText(/90 gün geçerlidir/)).not.toBeInTheDocument();
  });
});
