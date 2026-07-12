import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import WaitingRoomPage from '@/app/(admin)/admin/waiting-room/page';

// Mutable mock state — tests set .data before each render
const queryResult: { data: unknown; isLoading: boolean; error: null; refetch: ReturnType<typeof vi.fn> } = {
  data: null,
  isLoading: false,
  error: null,
  refetch: vi.fn(),
};

vi.mock('@/hooks/useApiClient', () => ({ useApiClient: () => ({}) }));
vi.mock('@/hooks/useQuery', () => ({ useQuery: () => queryResult }));
vi.mock('@/components/organisms/CoachingSuggestionsDialog', () => ({
  CoachingSuggestionsDialog: () => null,
}));
vi.mock('@/components/molecules/ConfirmDialog', () => ({
  ConfirmDialog: () => null,
}));

const makeUser = (sectorTags: unknown) => ({
  id: 'u1',
  role: 'MENTOR',
  email: 'mentor@test.com',
  fullName: 'Test Mentor',
  isActive: true,
  sectorTags,
  skills: [],
  discType: null,
  rematchPriority: false,
  rematchCount: 0,
  needsOrientation: false,
  approvalStatus: 'PENDING',
  createdAt: '2026-01-01T00:00:00.000Z',
});

describe('WaitingRoom — sectorTags null-safety regression', () => {
  beforeEach(() => {
    queryResult.refetch = vi.fn();
  });

  it('sectorTags null gelince çökmez ve — placeholder gösterir', () => {
    queryResult.data = { items: [makeUser(null)], total: 1 };
    expect(() => render(<WaitingRoomPage />)).not.toThrow();
    expect(screen.getAllByText('—').length).toBeGreaterThan(0);
  });

  it('sectorTags undefined gelince çökmez', () => {
    queryResult.data = { items: [makeUser(undefined)], total: 1 };
    expect(() => render(<WaitingRoomPage />)).not.toThrow();
  });

  it('sectorTags dolu diziyse etiketleri gösterir', () => {
    queryResult.data = { items: [makeUser(['Teknoloji', 'Eğitim', 'Sağlık'])], total: 1 };
    render(<WaitingRoomPage />);
    expect(screen.getByText(/Teknoloji/)).toBeInTheDocument();
    expect(screen.getByText(/\+1/)).toBeInTheDocument();
  });
});
