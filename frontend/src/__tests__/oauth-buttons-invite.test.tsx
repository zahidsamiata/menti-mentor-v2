/**
 * U-06 — OAuth düğmeleri davet token'ını backend'e iletir.
 * Davetli kişi Google/LinkedIn ile kayıt olunca backend token'ı doğrulayıp hesabı onaylı açar.
 */
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { OAuthButtons } from '@/components/molecules/OAuthButtons';

describe('U-06: OAuthButtons davet token\'ı', () => {
  const assign = vi.fn();
  const original = window.location;

  afterEach(() => {
    assign.mockReset();
    Object.defineProperty(window, 'location', { configurable: true, value: original });
  });

  function mockLocation() {
    Object.defineProperty(window, 'location', { configurable: true, value: { ...original, assign } });
  }

  it('davet token\'ı varsa OAuth başlangıç adresine eklenir', async () => {
    mockLocation();
    render(<OAuthButtons tenantSlug="acme" role="MENTOR" inviteToken="tok/+=1" />);
    await userEvent.click(screen.getAllByRole('button')[0]!);
    const url = assign.mock.calls[0]![0] as string;
    expect(url).toContain('tenantSlug=acme');
    expect(url).toContain('role=MENTOR');
    expect(url).toContain(`inviteToken=${encodeURIComponent('tok/+=1')}`);
  });

  it('negatif: davet yoksa adreste inviteToken parametresi yok', async () => {
    mockLocation();
    render(<OAuthButtons tenantSlug="acme" />);
    await userEvent.click(screen.getAllByRole('button')[0]!);
    expect(assign.mock.calls[0]![0] as string).not.toContain('inviteToken');
  });
});
