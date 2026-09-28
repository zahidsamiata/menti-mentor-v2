/**
 * AJ-79 (md.111 / G2-06) — platform kurum Analizler sekmesinde "varsayılana düşen profil" satırı.
 * Backend `getTenantAnalytics` → `defaultProfile` (k-anonim; küçük kurumda gizli gelir).
 */
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DiscSummary } from '@/app/platform/tenants/[id]/_components/DiscSummary';
import type { TenantAnalytics, TenantDefaultProfile } from '@/lib/api/platform';

function analytics(defaultProfile?: TenantDefaultProfile, withDisc = true): TenantAnalytics {
  return {
    totalWithDisc: withDisc ? 4 : 0,
    discDistribution: withDisc ? [{ discType: 'D', count: 4 }] : [],
    defaultProfile,
  };
}

const visible: TenantDefaultProfile = { withoutVector: 2, activeMembers: 5, ratePercent: 40, suppressed: false, minGroupSize: 3 };

describe('DiscSummary — varsayılana düşen profil satırı', () => {
  it('oran ve toplu sayı görünür (%40, 2/5)', () => {
    render(<DiscSummary analytics={analytics(visible)} loading={false} />);
    expect(screen.getByTestId('default-profile-rate').textContent).toContain('%40 (2/5)');
  });

  it('DISC dağılımı boşken de satır görünür', () => {
    render(<DiscSummary analytics={analytics(visible, false)} loading={false} />);
    expect(screen.getByTestId('default-profile-rate').textContent).toContain('%40 (2/5)');
    expect(screen.getByText('DISC analizi için yeterli veri yok.')).toBeTruthy();
  });

  it('küçük kurumda gizli metni, sayı yok', () => {
    render(
      <DiscSummary
        analytics={analytics({ withoutVector: 0, activeMembers: 0, ratePercent: null, suppressed: true, minGroupSize: 3 })}
        loading={false}
      />,
    );
    const text = screen.getByTestId('default-profile-rate').textContent ?? '';
    expect(text).toContain('gizli (<3 üye)');
    expect(text).not.toContain('%');
  });

  it('alan gelmezse (eski backend) satır yok', () => {
    render(<DiscSummary analytics={analytics(undefined)} loading={false} />);
    expect(screen.queryByTestId('default-profile-rate')).toBeNull();
  });
});
