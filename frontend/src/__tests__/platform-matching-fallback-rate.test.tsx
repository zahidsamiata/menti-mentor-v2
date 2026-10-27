/**
 * AJ-111 (md.111 / G2-06) — platform kurum Analizler sekmesinde "gevşetilen eşleştirme %" satırı.
 * Backend `getTenantAnalytics` → `matchingFallback` (kurum+gün toplu sayaç; 5 istekten azsa yetersiz veri).
 */
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DiscSummary } from '@/app/platform/tenants/[id]/_components/DiscSummary';
import type { TenantAnalytics, TenantMatchingFallback } from '@/lib/api/platform';

function analytics(matchingFallback?: TenantMatchingFallback, withDisc = true): TenantAnalytics {
  return {
    totalWithDisc: withDisc ? 4 : 0,
    discDistribution: withDisc ? [{ discType: 'D', count: 4 }] : [],
    matchingFallback,
  };
}

const visible: TenantMatchingFallback = {
  windowDays: 30,
  totalRequests: 10,
  relaxedRequests: 4,
  byLevel: { level1: 1, level2: 0, level3: 3 },
  ratePercent: 40,
  insufficientData: false,
  minSample: 5,
};

describe('DiscSummary — gevşetilen eşleştirme satırı', () => {
  it('oran, istek sayısı ve kademe dağılımı görünür', () => {
    render(<DiscSummary analytics={analytics(visible)} loading={false} />);
    const text = screen.getByTestId('matching-fallback-rate').textContent ?? '';
    expect(text).toContain('son 30 gün');
    expect(text).toContain('%40 (4/10 istek)');
    expect(text).toContain('Yalnız sektör uyumu: 3');
  });

  it('ondalık Türkçe biçimde (16,7)', () => {
    render(<DiscSummary analytics={analytics({ ...visible, ratePercent: 16.7, relaxedRequests: 1, totalRequests: 6 })} loading={false} />);
    expect(screen.getByTestId('matching-fallback-rate').textContent).toContain('%16,7 (1/6 istek)');
  });

  it('DISC dağılımı boşken de satır görünür', () => {
    render(<DiscSummary analytics={analytics(visible, false)} loading={false} />);
    expect(screen.getByTestId('matching-fallback-rate').textContent).toContain('%40');
  });

  it('yetersiz veride oran ve dağılım yok, "yetersiz veri" yazar', () => {
    render(
      <DiscSummary
        analytics={analytics({ ...visible, totalRequests: 4, relaxedRequests: 3, ratePercent: null, insufficientData: true })}
        loading={false}
      />,
    );
    const text = screen.getByTestId('matching-fallback-rate').textContent ?? '';
    expect(text).toContain('yetersiz veri (<5 istek)');
    expect(text).not.toContain('%');
    expect(text).not.toContain('Yalnız sektör');
  });

  it('alan gelmezse (eski backend) satır yok', () => {
    render(<DiscSummary analytics={analytics(undefined)} loading={false} />);
    expect(screen.queryByTestId('matching-fallback-rate')).toBeNull();
  });
});
