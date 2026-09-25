/**
 * IC-03 — ekranda ham İngilizce enum yerine Türkçe karşılık.
 * Ortak sözlük: `lib/enumLabels.ts`.
 */
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import {
  roleLabel,
  tagStatusLabel,
  meetingFormatLabel,
  certStatusBadge,
} from '@/lib/enumLabels';
import { MembersTable } from '@/app/platform/tenants/[id]/_components/MembersTable';
import { MeetingsTable } from '@/app/platform/tenants/[id]/_components/MeetingsTable';
import type { TenantMember, TenantMeeting } from '@/lib/api/platform';

const queryResult: { data: unknown; isLoading: boolean; error: null; refetch: () => void } = {
  data: null,
  isLoading: false,
  error: null,
  refetch: vi.fn(),
};

vi.mock('@/hooks/useApiClient', () => ({ useApiClient: () => ({}) }));
vi.mock('@/hooks/useQuery', () => ({ useQuery: () => queryResult }));
vi.mock('@/hooks/useMutation', () => ({
  useMutation: () => ({ mutate: vi.fn(), isLoading: false }),
}));
vi.mock('@/components/organisms/CoachingSuggestionsDialog', () => ({
  CoachingSuggestionsDialog: () => null,
}));
vi.mock('@/components/organisms/PendingTagCard', () => ({ PendingTagCard: () => null }));
vi.mock('@/components/molecules/RejectReasonDialog', () => ({ RejectReasonDialog: () => null }));
vi.mock('@/components/molecules/CorrectionNoteDialog', () => ({ CorrectionNoteDialog: () => null }));
vi.mock('@/components/molecules/ConfirmDialog', () => ({ ConfirmDialog: () => null }));

const makeAdminUser = (role: string) => ({
  id: 'u1',
  role,
  email: 'kisi@test.com',
  fullName: 'Deneme Kişi',
  isActive: true,
  sectorTags: [],
  skills: [],
  discType: null,
  rematchPriority: false,
  rematchCount: 0,
  needsOrientation: false,
  approvalStatus: 'PENDING',
  createdAt: '2026-01-01T00:00:00.000Z',
});

describe('enumLabels — saf sözlük', () => {
  it('bilinen değerleri Türkçeye çevirir', () => {
    expect(roleLabel('MENTOR')).toBe('Mentör');
    expect(roleLabel('MENTI')).toBe('Menti');
    expect(roleLabel('ADMIN')).toBe('Kurum Yöneticisi');
    expect(tagStatusLabel('APPROVED')).toBe('Onaylandı');
    expect(tagStatusLabel('MERGED')).toBe('Birleştirildi');
    expect(tagStatusLabel('REJECTED')).toBe('Reddedildi');
    expect(meetingFormatLabel('IN_PERSON')).toBe('Yüz yüze');
    expect(certStatusBadge('COOLDOWN').label).toBe('Bekleme');
  });

  it('bilinmeyen değerde ham değeri döner, boşta tire gösterir (çökmez)', () => {
    expect(roleLabel('SOMETHING_NEW')).toBe('SOMETHING_NEW');
    expect(meetingFormatLabel('HYBRID')).toBe('HYBRID');
    expect(certStatusBadge('WEIRD')).toEqual({ label: 'WEIRD', className: 'bg-muted text-muted-foreground' });
    expect(roleLabel(null)).toBe('—');
    expect(certStatusBadge(undefined).label).toBe('—');
  });
});

describe('Bekleme odası — rol rozeti', () => {
  it('MENTOR yerine "Mentör" görünür', async () => {
    const { default: WaitingRoomPage } = await import('@/app/(admin)/admin/waiting-room/page');
    queryResult.data = { items: [makeAdminUser('MENTOR')], total: 1 };
    render(<WaitingRoomPage />);
    expect(screen.getByText('Mentör')).toBeInTheDocument();
    expect(screen.queryByText('MENTOR')).not.toBeInTheDocument();
  });
});

describe('PendingUserCard — rol rozeti', () => {
  it('MENTI yerine "Menti" görünür, ham enum yok', async () => {
    const { PendingUserCard } = await import('@/components/organisms/PendingUserCard');
    render(
      <PendingUserCard
        user={{ ...makeAdminUser('MENTI'), sectorTags: [] } as never}
        onActionComplete={() => {}}
      />,
    );
    expect(screen.getByText('Menti')).toBeInTheDocument();
    expect(screen.queryByText('MENTI')).not.toBeInTheDocument();
  });
});

describe('Etiket yönetimi — durum rozeti', () => {
  it('APPROVED/MERGED/REJECTED yerine Türkçe durum görünür', async () => {
    const { default: TagsPage } = await import('@/app/(admin)/admin/tags/page');
    queryResult.data = {
      items: [
        { id: 't1', value: 'a', status: 'APPROVED', mergedInto: null, submittedBy: 'x', createdAt: '' },
        { id: 't2', value: 'b', status: 'MERGED', mergedInto: 'c', submittedBy: 'x', createdAt: '' },
        { id: 't3', value: 'd', status: 'REJECTED', mergedInto: null, submittedBy: 'x', createdAt: '' },
      ],
      totalPages: 1,
    };
    render(<TagsPage />);
    fireEvent.click(screen.getByText('Onaylananlar'));
    expect(screen.getByText('Onaylandı')).toBeInTheDocument();
    expect(screen.getByText('Birleştirildi')).toBeInTheDocument();
    expect(screen.getByText('Reddedildi')).toBeInTheDocument();
    for (const raw of ['APPROVED', 'MERGED', 'REJECTED']) {
      expect(screen.queryByText(raw)).not.toBeInTheDocument();
    }
  });
});

describe('Platform kurum detayı — üye ve görüşme tabloları', () => {
  const member = (certificationStatus: string): TenantMember => ({
    id: 'm1',
    fullName: 'Üye Bir',
    role: 'MENTOR',
    isActive: true,
    joinedAt: '2026-01-01T00:00:00.000Z',
    emailMasked: 'u***@t.com',
    discType: null,
    certificationStatus,
    isCertified: certificationStatus === 'CERTIFIED',
    learningJourneyCompletedAt: null,
  });

  it('sertifika durumu Türkçe, "Journey" başlığı Türkçe', () => {
    render(
      <MembersTable members={[member('COOLDOWN')]} loading={false} roleFilter="ALL" onRoleFilterChange={() => {}} />,
    );
    expect(screen.getByText('Bekleme')).toBeInTheDocument();
    expect(screen.queryByText('COOLDOWN')).not.toBeInTheDocument();
    expect(screen.getByText('Öğrenme Yolculuğu')).toBeInTheDocument();
    expect(screen.queryByText('Journey')).not.toBeInTheDocument();
  });

  it('bilinmeyen sertifika durumu ham değerle görünür (boş kalmaz)', () => {
    render(
      <MembersTable members={[member('NEW_STATE')]} loading={false} roleFilter="ALL" onRoleFilterChange={() => {}} />,
    );
    expect(screen.getByText('NEW_STATE')).toBeInTheDocument();
  });

  it('görüşme formatı Türkçe görünür', () => {
    const meeting: TenantMeeting = {
      id: 'g1',
      startsAt: '2026-01-01T10:00:00.000Z',
      status: 'COMPLETED',
      format: 'IN_PERSON',
      hasFeedback: false,
      mentor: { id: 'a', fullName: 'Mentör Bir' },
      menti: { id: 'b', fullName: 'Menti Bir' },
    };
    render(<MeetingsTable meetings={[meeting]} loading={false} />);
    expect(screen.getByText('Yüz yüze')).toBeInTheDocument();
    expect(screen.queryByText('IN_PERSON')).not.toBeInTheDocument();
  });
});
