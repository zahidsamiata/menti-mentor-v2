/**
 * Y-16 (madde 127) — kullanıcı ekranından sektör etiketi önerme.
 *
 * Backend ucu `POST /api/tags/suggest` (gövde: `{ value }`) vardı ama hiçbir ekran çağırmıyordu.
 * Bu test: profil sayfasında öneri alanının göründüğünü; geçerli girişte ucun doğru gövdeyle
 * çağrıldığını ve "yönetici onayına gönderildi" mesajının göründüğünü; boş/geçersiz/zaten var
 * olan girişte istek GİTMEDİĞİNİ; uç hata verirse hatanın kullanıcıya gösterildiğini doğrular.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SectorTagSuggest } from '@/components/molecules/SectorTagSuggest';
import { apiClient } from '@/lib/api/client';
import ProfilePage from '@/app/(dashboard)/profile/page';

const apiMock = vi.fn();
vi.mock('@/hooks/useApiClient', () => ({ useApiClient: () => apiMock }));

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
}));
vi.mock('@/providers/AuthProvider', () => ({
  useAuth: () => ({
    user: { id: 'u1', role: 'MENTI', fullName: 'Deneme Kullanıcı', email: 'deneme@example.com', discType: null },
    accessToken: 't',
    isLoading: false,
  }),
}));
// Kararlı referans — profil sayfasındaki useEffect([profile]) döngüye girmesin.
const profileData = {
  id: 'u1', fullName: 'Deneme Kullanıcı', email: 'deneme@example.com', role: 'MENTI', discType: null,
  discResultCard: null, bioSummary: null, expertiseDetails: null, targetAudience: null,
  education: null, pastProjects: null, volunteerHistory: null, skills: [],
  sectorTags: ['yazılım'], linkedinUrl: null, instagramUrl: null, avatarUrl: null,
};
vi.mock('@/hooks/useQuery', () => ({
  useQuery: () => ({ data: profileData, isLoading: false, error: null, refetch: vi.fn() }),
}));
vi.mock('@/components/organisms/DataPrivacySection', () => ({ DataPrivacySection: () => null }));
vi.mock('@/components/molecules/WeeklyMeetingLimitNote', () => ({ WeeklyMeetingLimitNote: () => null }));

async function suggest(text: string) {
  const user = userEvent.setup();
  const input = screen.getByLabelText(/Alanınız listede yok mu/);
  if (text) await user.type(input, text);
  await user.click(screen.getByRole('button', { name: 'Öner' }));
}

describe('Y-16: sektör etiketi önerme', () => {
  beforeEach(() => apiMock.mockReset());

  it('profil sayfasında mevcut sektör etiketleri ve öneri alanı görünür', () => {
    render(<ProfilePage />);
    expect(screen.getByText('Sektör Etiketleri')).toBeInTheDocument();
    expect(screen.getByText('yazılım')).toBeInTheDocument();
    expect(screen.getByLabelText(/Alanınız listede yok mu/)).toBeInTheDocument();
  });

  it('geçerli öneri doğru gövdeyle gönderilir ve onay mesajı görünür', async () => {
    apiMock.mockResolvedValue({
      ok: true,
      data: {
        message: 'Etiket önerisi alındı.',
        tag: { id: 't1', value: 'oyun tasarımı', status: 'PENDING', createdAt: '2026-09-25T00:00:00Z' },
      },
    });
    render(<SectorTagSuggest currentTags={['yazılım']} />);
    await suggest('  Oyun Tasarımı ');

    expect(apiMock).toHaveBeenCalledTimes(1);
    expect(apiMock).toHaveBeenCalledWith('/api/tags/suggest', {
      method: 'POST',
      body: { value: 'Oyun Tasarımı' },
    });
    const status = await screen.findByRole('status');
    expect(status).toHaveTextContent(
      '"oyun tasarımı" önerisi yönetici incelemesine gönderildi. Yönetici onaylarsa profilinize eklenir; başka bir etiketle birleştirilir ya da reddedilirse eklenmez.',
    );
    // Backend'de ortak bir "etiket listesi" yok: onayda yalnız önerenin profiline eklenir.
    expect(screen.getByTestId('sector-tag-suggest')).not.toHaveTextContent(/etiket listesine/);
    expect(screen.getByLabelText(/Alanınız listede yok mu/)).toHaveValue('');
  });

  it('etiket zaten incelemedeyse bunu dürüstçe söyler', async () => {
    apiMock.mockResolvedValue({ ok: true, data: { message: 'Bu etiket zaten incelemede.', status: 'PENDING' } });
    render(<SectorTagSuggest currentTags={[]} />);
    await suggest('fintek');
    expect(await screen.findByRole('status')).toHaveTextContent(/zaten yönetici incelemesinde/);
  });

  it('negatif: boş girişte istek gitmez, hata mesajı görünür', async () => {
    render(<SectorTagSuggest currentTags={[]} />);
    await suggest('');
    expect(apiMock).not.toHaveBeenCalled();
    expect(screen.getByRole('alert')).toHaveTextContent('Etiket en az 2 karakter olmalı.');
  });

  it('negatif: geçersiz karakterli girişte istek gitmez', async () => {
    render(<SectorTagSuggest currentTags={[]} />);
    await suggest('ar&ge');
    expect(apiMock).not.toHaveBeenCalled();
    expect(screen.getByRole('alert')).toHaveTextContent(/yalnızca harf, rakam, boşluk ve tire/);
  });

  it('negatif: zaten sahip olunan etiket için istek gitmez', async () => {
    render(<SectorTagSuggest currentTags={['yazılım']} />);
    await suggest('YAZILIM');
    expect(apiMock).not.toHaveBeenCalled();
    expect(screen.getByRole('status')).toHaveTextContent('Bu etiket zaten sektör etiketlerinizde var.');
  });

  it('uç hata verirse mesaj kullanıcıya gösterilir', async () => {
    apiMock.mockResolvedValue({
      ok: false,
      error: { error: 'NETWORK_ERROR', message: 'Sunucuya ulaşılamıyor.' },
      status: 0,
    });
    render(<SectorTagSuggest currentTags={[]} />);
    await suggest('fintek');
    expect(await screen.findByRole('alert')).toHaveTextContent('Sunucuya ulaşılamıyor.');
    // Giriş korunur — kullanıcı tekrar deneyebilir.
    expect(screen.getByLabelText(/Alanınız listede yok mu/)).toHaveValue('fintek');
  });

  it('backend 400 (doğrulama) yanıtı gerçek istemciden geçip alan mesajıyla gösterilir', async () => {
    // Backend SuggestTagSchema hatasında `message` göndermez, yalnız `details` (flatten) döner;
    // istemci ilk alan mesajını kullanıcıya taşımalı — hata sessiz yutulmamalı.
    const fetchMock = vi.fn(async () => new Response(
      JSON.stringify({
        error: 'VALIDATION',
        details: { formErrors: [], fieldErrors: { value: ['Etiket geçersiz karakter içeriyor'] } },
      }),
      { status: 400, headers: { 'Content-Type': 'application/json' } },
    ));
    vi.stubGlobal('fetch', fetchMock);
    apiMock.mockImplementation((path: string, opts: Parameters<typeof apiClient>[1]) => apiClient(path, opts));
    try {
      render(<SectorTagSuggest currentTags={[]} />);
      await suggest('fintek');
      expect(fetchMock).toHaveBeenCalledTimes(1);
      const [url, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit];
      expect(url).toMatch(/\/api\/tags\/suggest$/);
      expect(JSON.parse(init.body as string)).toEqual({ value: 'fintek' });
      expect(await screen.findByRole('alert')).toHaveTextContent('Etiket geçersiz karakter içeriyor');
    } finally {
      vi.unstubAllGlobals();
    }
  });
});
