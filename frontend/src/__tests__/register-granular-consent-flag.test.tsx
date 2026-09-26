/**
 * AN-30 / KARAR-34 — kayıt ekranı granüler rıza FLAG'i.
 *
 * `NEXT_PUBLIC_GRANULAR_CONSENT_ENABLED` hiçbir ortamda set EDİLMEZ (varsayılan kapalı,
 * KARAR-80 M17: avukat onaylı gerçek metin gelmeden ekran canlıda açılmaz). Bu test, flag
 * KAPALIYKEN mevcut tek-kutu davranışının BİREBİR aynı kaldığını doğrular (regresyon).
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
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

import RegisterContent from '@/app/(auth)/register/_RegisterContent';

describe('AN-30 — kayıt ekranı, GRANULAR_CONSENT_ENABLED flag KAPALI (varsayılan)', () => {
  beforeEach(() => {
    registerMock.mockReset();
    registerMock.mockResolvedValue({ ok: true, data: { message: 'ok', user: null } });
  });

  it('yalnız TEK KVKK onay kutusu görünür, granüler form YOK', async () => {
    render(<RegisterContent />);
    await waitFor(() => expect(screen.getByLabelText(/e-posta adresi/i)).toBeInTheDocument());
    // Eski tek kutunun metni görünür
    expect(screen.getByText(/18 yaşından büyük olduğumu beyan ederim/i)).toBeInTheDocument();
    // Granüler formun zorunlu madde başlıkları EKRANDA YOK
    expect(screen.queryByText(/DISC eşleştirme/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Yurt dışında saklama/i)).not.toBeInTheDocument();
    // Tek checkbox var (KVKK) — granüler formun 6 checkbox'ı yok
    expect(screen.getAllByRole('checkbox')).toHaveLength(1);
  });

  it('KVKK kutusu işaretlenmeden submit edilirse eski hata mesajı görünür, register çağrılmaz', async () => {
    render(<RegisterContent />);
    await waitFor(() => expect(screen.getByLabelText(/e-posta adresi/i)).toBeInTheDocument());
    fireEvent.change(screen.getByLabelText(/e-posta adresi/i), { target: { value: 'user@ornek.com' } });
    fireEvent.change(screen.getByLabelText('Güçlü Bir Şifre'), { target: { value: 'Test1234!' } });
    fireEvent.change(screen.getByLabelText('Şifre Tekrar'), { target: { value: 'Test1234!' } });
    fireEvent.click(screen.getByRole('button', { name: /hesabımı oluştur/i }));

    await waitFor(() =>
      expect(screen.getByText('KVKK onayı ve 18+ beyanı zorunludur.')).toBeInTheDocument(),
    );
    expect(registerMock).not.toHaveBeenCalled();
  });

  it("KVKK kutusu işaretlenip submit edilince register payload'ında granularConsent alanı YOK", async () => {
    render(<RegisterContent />);
    await waitFor(() => expect(screen.getByLabelText(/e-posta adresi/i)).toBeInTheDocument());
    fireEvent.change(screen.getByLabelText(/e-posta adresi/i), { target: { value: 'user@ornek.com' } });
    fireEvent.change(screen.getByLabelText('Güçlü Bir Şifre'), { target: { value: 'Test1234!' } });
    fireEvent.change(screen.getByLabelText('Şifre Tekrar'), { target: { value: 'Test1234!' } });
    fireEvent.click(screen.getByRole('checkbox'));
    fireEvent.click(screen.getByRole('button', { name: /hesabımı oluştur/i }));

    await waitFor(() => expect(registerMock).toHaveBeenCalledTimes(1));
    const payload = registerMock.mock.calls[0][0];
    expect(payload.kvkkConsent).toBe(true);
    expect(payload.granularConsent).toBeUndefined();
  });
});
