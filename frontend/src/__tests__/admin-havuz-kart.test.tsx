/**
 * AJ-63 — yönetici mentör/menti havuzu tablo yerine KART ızgarası (admin KARAR 2).
 *
 * Kartta: fotoğraf/baş harf · isim · DISC harfi · durum rozeti (KARAR 3, Pasif dahil) · sertifika
 * rozeti (KARAR 4, yalnız sertifikalı mentörde) · aksiyon (e-posta; bekleyende Onay ekranı bağlantısı).
 * Tablo sütunlarının hiçbiri kaybolmaz (e-posta, sektör, onay izi, kalite puanı, öğrenme yolculuğu, kayıt).
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import MentorHavuzuPage from '@/app/(admin)/admin/mentor-havuzu/page';
import MentiHavuzuPage from '@/app/(admin)/admin/menti-havuzu/page';
import type { AdminUser } from '@/types/admin';

function makeUser(over: Partial<AdminUser>): AdminUser {
  return {
    id: 'u',
    role: 'MENTOR',
    email: 'kisi@example.com',
    fullName: 'Kişi',
    isActive: true,
    sectorTags: [],
    skills: [],
    discType: null,
    discLetters: null,
    rematchPriority: false,
    rematchCount: 0,
    needsOrientation: false,
    approvalStatus: 'APPROVED',
    createdAt: '2026-09-01T00:00:00.000Z',
    isCertified: false,
    ...over,
  } as AdminUser;
}

let items: AdminUser[] = [];
const listUsers = vi.fn(async () => ({
  ok: true,
  data: { items, total: items.length, page: 1, pageSize: 20, totalPages: 1 },
}));

vi.mock('@/hooks/useApiClient', () => ({ useApiClient: () => vi.fn() }));
vi.mock('@/lib/api/admin', () => ({ adminApi: { listUsers: (...args: unknown[]) => listUsers(...(args as [])) } }));

function seed(role: 'MENTOR' | 'MENTI') {
  items = [
    makeUser({
      id: 'a1', role, fullName: 'Onaylı Kişi', email: 'onayli@example.com', discLetters: 'Di',
      isCertified: true, approvedAt: '2026-09-02T00:00:00.000Z', approvedByName: 'Yönetici A',
      sectorTags: ['Eğitim', 'Sağlık', 'Teknoloji'], qualityMultiplier: 1.1,
      learningJourneyCompletedAt: '2026-09-03T00:00:00.000Z',
    }),
    makeUser({ id: 'p1', role, fullName: 'Bekleyen Kişi', email: 'bekleyen@example.com', approvalStatus: 'PENDING', discType: 'S' }),
    makeUser({ id: 'x1', role, fullName: 'Pasif Kişi', email: 'pasif@example.com', isActive: false }),
  ];
}

async function cardOf(name: string) {
  return (await screen.findByRole('article', { name })) as HTMLElement;
}

describe.each([
  ['Mentör havuzu', MentorHavuzuPage, 'MENTOR' as const, 'Mentör listesi'],
  ['Menti havuzu', MentiHavuzuPage, 'MENTI' as const, 'Menti listesi'],
])('%s — kart ızgarası (AJ-63)', (_name, Page, role, listLabel) => {
  beforeEach(() => {
    listUsers.mockClear();
    seed(role);
  });

  it('kişiler liste içinde kart olarak çizilir; tablo yok', async () => {
    render(<Page />);
    const list = await screen.findByRole('list', { name: listLabel });
    expect(within(list).getAllByRole('listitem')).toHaveLength(items.length);
    expect(within(list).getAllByRole('article')).toHaveLength(items.length);
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
    expect(document.querySelector('table')).toBeNull();
  });

  it('her kartta isim (başlık) + durum rozeti + e-posta aksiyonu var', async () => {
    render(<Page />);
    const expected: Record<string, string> = { 'Onaylı Kişi': 'Onaylı', 'Bekleyen Kişi': 'Bekliyor', 'Pasif Kişi': 'Pasif' };
    for (const [name, label] of Object.entries(expected)) {
      const card = await cardOf(name);
      expect(within(card).getByRole('heading', { name })).toBeInTheDocument();
      expect(within(card).getByTestId('pool-status-badge')).toHaveTextContent(label);
      const mail = within(card).getByRole('link', { name: `${name} kişisine e-posta gönder` });
      expect(mail).toHaveAttribute('href', `mailto:${items.find((u) => u.fullName === name)!.email}`);
    }
  });

  it('bekleyen kişide Onay ekranı bağlantısı var; onaylı kişide yok', async () => {
    render(<Page />);
    const pending = await cardOf('Bekleyen Kişi');
    expect(within(pending).getByRole('link', { name: 'Bekleyen Kişi için onay ekranına git' }))
      .toHaveAttribute('href', '/admin/approvals');
    const approved = await cardOf('Onaylı Kişi');
    expect(within(approved).queryByRole('link', { name: /onay ekranına git/ })).not.toBeInTheDocument();
  });

  it('DISC harfi + tablo sütunlarının bilgisi kartta korunur', async () => {
    render(<Page />);
    const card = await cardOf('Onaylı Kişi');
    expect(within(card).getByText('Di')).toBeInTheDocument();
    expect(within(card).getByText('onayli@example.com')).toBeInTheDocument();
    expect(within(card).getByText(/Eğitim, Sağlık/)).toHaveTextContent('+1');
    expect(within(card).getByText(/Onaylayan: Yönetici A/)).toBeInTheDocument();
    expect(within(card).getByText('Öğrenme yolculuğu')).toBeInTheDocument();
    expect(within(card).getByText(`✓ ${new Date('2026-09-03T00:00:00.000Z').toLocaleDateString('tr-TR')}`)).toBeInTheDocument();
    expect(within(card).getByText('Kayıt')).toBeInTheDocument();
    // Tek harf yedeği: discLetters yoksa discType gösterilir.
    expect(within(await cardOf('Bekleyen Kişi')).getByText('S')).toBeInTheDocument();
  });
});

describe('Sertifika rozeti + kalite puanı (yalnız mentör havuzu, KARAR 4)', () => {
  it('mentör: sertifikalıda "✓ Sertifikalı" + kalite puanı var; sertifikasızda rozet yok', async () => {
    seed('MENTOR');
    render(<MentorHavuzuPage />);
    const certified = await cardOf('Onaylı Kişi');
    expect(within(certified).getByTestId('pool-cert-badge')).toHaveTextContent('✓ Sertifikalı');
    expect(within(certified).getByText('Kalite puanı')).toBeInTheDocument();
    const uncertified = await cardOf('Bekleyen Kişi');
    expect(within(uncertified).queryByTestId('pool-cert-badge')).not.toBeInTheDocument();
  });

  it('menti havuzunda sertifika rozeti ve kalite puanı gösterilmez', async () => {
    seed('MENTI');
    render(<MentiHavuzuPage />);
    const card = await cardOf('Onaylı Kişi');
    expect(within(card).queryByTestId('pool-cert-badge')).not.toBeInTheDocument();
    expect(within(card).queryByText('Kalite puanı')).not.toBeInTheDocument();
  });
});
