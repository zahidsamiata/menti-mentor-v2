/**
 * AN-30 7b — kayıt ekranı, `NEXT_PUBLIC_GRANULAR_CONSENT_ENABLED` AÇIKKEN gönderim yolu.
 *
 * Bayrak modül yüklenirken okunduğu için env `vi.stubEnv` ile açılır ve bileşen
 * `vi.resetModules()` SONRASI dinamik import edilir. Bayrak KAPALIYKEN eski davranış:
 * register-granular-consent-flag.test.tsx.
 */
import { describe, it, expect, vi, beforeAll, afterAll, beforeEach } from 'vitest';
import type { ComponentType } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
  useSearchParams: () => ({ get: (k: string) => (k === 'token' ? 'invite-token' : null) }),
}));

vi.mock('@/lib/api/invitation', () => ({
  fetchInvitation: vi.fn().mockResolvedValue({
    valid: true,
    role: 'MENTI',
    tenantName: 'Test Tenant',
    slug: 'test-tenant',
    logoUrl: null,
    primaryColor: '#6366f1',
    programTemplate: null,
    plan: 'FREE',
    invitedByName: null,
    invitedByTitle: null,
  }),
}));
vi.mock('@/providers/AuthProvider', () => ({ useAuth: () => ({ login: vi.fn() }) }));
vi.mock('@/components/molecules/OAuthButtons', () => ({ OAuthButtons: () => null }));

const { registerMock } = vi.hoisted(() => ({ registerMock: vi.fn() }));
vi.mock('@/lib/api/auth', () => ({ authApi: { register: registerMock } }));

let RegisterContent: ComponentType;

beforeAll(async () => {
  vi.stubEnv('NEXT_PUBLIC_GRANULAR_CONSENT_ENABLED', 'true');
  vi.resetModules();
  RegisterContent = (await import('@/app/(auth)/register/_RegisterContent')).default;
});

afterAll(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});

async function fillCredentials() {
  render(<RegisterContent />);
  await waitFor(() => expect(screen.getByLabelText(/e-posta adresi/i)).toBeInTheDocument());
  fireEvent.change(screen.getByLabelText(/e-posta adresi/i), { target: { value: 'user@ornek.com' } });
  fireEvent.change(screen.getByLabelText('Güçlü Bir Şifre'), { target: { value: 'Test1234!' } });
  fireEvent.change(screen.getByLabelText('Şifre Tekrar'), { target: { value: 'Test1234!' } });
}

describe('AN-30 — kayıt ekranı, GRANULAR_CONSENT_ENABLED flag AÇIK', () => {
  beforeEach(() => {
    registerMock.mockReset();
    registerMock.mockResolvedValue({ ok: true, data: { message: 'ok', user: null } });
  });

  it('granüler form görünür: 18+/Aydınlatma kutusu + /kvkk bağlantısı dahil 7 kutu', async () => {
    render(<RegisterContent />);
    await waitFor(() => expect(screen.getByLabelText(/e-posta adresi/i)).toBeInTheDocument());
    expect(screen.getAllByRole('checkbox')).toHaveLength(7);
    expect(screen.getByText(/18 yaşından büyük olduğumu beyan ederim/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /kvkk aydınlatma metni/i })).toHaveAttribute('href', '/kvkk');
  });

  it('zorunlu madde eksikken (18+ işaretsiz) hata görünür, register ÇAĞRILMAZ', async () => {
    await fillCredentials();
    fireEvent.click(screen.getByLabelText(/DISC eşleştirme/i));
    fireEvent.click(screen.getByLabelText(/Yurt dışında saklama/i));
    fireEvent.click(screen.getByLabelText(/Veri işleme/i));
    fireEvent.click(screen.getByLabelText(/Anonim iyileştirme/i));
    fireEvent.click(screen.getByRole('button', { name: /hesabımı oluştur/i }));

    await waitFor(() =>
      expect(screen.getByText('Zorunlu onay maddelerinin tamamı işaretlenmelidir.')).toBeInTheDocument(),
    );
    expect(registerMock).not.toHaveBeenCalled();
  });

  it('tüm zorunlular + bir isteğe bağlı işaretlenince payload kutulardan türer', async () => {
    await fillCredentials();
    fireEvent.click(screen.getByLabelText(/18 yaşından büyük olduğumu beyan ederim/i));
    fireEvent.click(screen.getByLabelText(/DISC eşleştirme/i));
    fireEvent.click(screen.getByLabelText(/Yurt dışında saklama/i));
    fireEvent.click(screen.getByLabelText(/Veri işleme/i));
    fireEvent.click(screen.getByLabelText(/Anonim iyileştirme/i));
    fireEvent.click(screen.getByLabelText(/OCEAN kişilik profili/i));
    fireEvent.click(screen.getByRole('button', { name: /hesabımı oluştur/i }));

    await waitFor(() => expect(registerMock).toHaveBeenCalledTimes(1));
    const payload = registerMock.mock.calls[0][0];
    expect(payload.kvkkConsent).toBe(true);
    expect(payload.granularConsent).toEqual({
      discMatching: true,
      foreignStorage: true,
      dataProcessing: true,
      anonymizedImprovement: true,
      crossTenantSharing: false,
      oceanProfiling: true,
    });
  });
});
