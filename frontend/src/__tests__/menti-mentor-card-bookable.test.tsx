/**
 * AN-28 — menti panelindeki mentör kartı: gerçekten randevu alınabilir mi?
 *
 * KARAR-80/M7: kart isFaded=true olsa da HİÇ kaldırılmaz, yalnız soluk (opacity) + "Sınırlı"
 * rozetiyle işaretlenir. KARAR-32 revizyonu: isBookable=false olan mentörde "Görüşme Talep Et"
 * devre dışı kalır, "Mesaj" HER ZAMAN aktif kalır.
 * AJ-66 (KARAR 4): sertifikalı mentörde "✓ Sertifikalı" rozeti; sertifikasızda hiçbir etiket yok.
 * AJ-81 (KARAR 2/5/7): kartta uyum yüzdesi ("%80" + "uyum") ve "Neden uyumlu:" gerekçesi görünür;
 * mentörün DISC harfi/tipi GÖRÜNMEZ. DTO'da discType zaten yoktur (backend
 * `matchingController.ts` buildMentiFacingMentorItem beyaz liste + `backend/tests/mentor-matches.test.ts`);
 * buradaki negatif test ek savunma katmanını ölçer: yanıta sızsa bile kart onu ekrana basmaz.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import MentiDashboardPage from '@/app/(dashboard)/menti/page';
import { MENTOR_POOL_PAGE_SIZE } from '@/lib/api/matching';
import type { MentorMatch } from '@/types/matching';

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
}));
vi.mock('@/providers/AuthProvider', () => ({
  useAuth: () => ({
    user: { id: 'menti-1', role: 'MENTI', discType: 'D', approvalStatus: 'APPROVED', fullName: 'Deneme Menti' },
    isLoading: false,
  }),
}));
vi.mock('@/providers/TenantProvider', () => ({ useTenant: () => ({ tenant: null }) }));

vi.mock('@/components/organisms/DailyQuestionWidget', () => ({ DailyQuestionWidget: () => null }));
vi.mock('@/components/organisms/DiscConfidenceWidget', () => ({ DiscConfidenceWidget: () => null }));
vi.mock('@/components/organisms/DiscRecallCard', () => ({ DiscRecallCard: () => null }));
vi.mock('@/components/organisms/LearningJourneyCard', () => ({ LearningJourneyCard: () => null }));
vi.mock('@/components/organisms/NotificationOptInButton', () => ({ NotificationOptInButton: () => null }));

const bookableMentor: MentorMatch = {
  mentorId: 'mentor-bookable',
  mentorName: 'Uygun Mentör',
  mentorAvatarUrl: null,
  sectorTags: ['teknoloji'],
  skills: [],
  matchScore: 80,
  compatibilityReason: 'Ortak sektör ve ilgi alanları',
  isFaded: false,
  isBookable: true,
  isCertified: true,
};

const fadedMentor: MentorMatch = {
  mentorId: 'mentor-faded',
  mentorName: 'Soluk Mentör',
  mentorAvatarUrl: null,
  sectorTags: ['finans'],
  skills: [],
  matchScore: 60,
  compatibilityReason: 'Genel profil uyumu',
  isFaded: true,
  isBookable: false,
  isCertified: false,
};

let mentorMatchesResponse: unknown = { ok: true, data: { items: [bookableMentor, fadedMentor] } };

const apiMock = vi.fn(async (path: string) => {
  if (path === `/api/mentis/menti-1/mentor-matches?limit=${MENTOR_POOL_PAGE_SIZE}`) return mentorMatchesResponse;
  if (path === '/api/agreements/active') return { ok: false, error: { error: 'NOT_FOUND', message: 'yok' }, status: 404 };
  if (path === '/api/meetings') return { ok: true, data: { items: [] } };
  if (path === '/api/conversations') return { ok: true, data: { items: [] } };
  return { ok: false, error: { error: 'NOT_MOCKED', message: 'yok' }, status: 404 };
});
vi.mock('@/hooks/useApiClient', () => ({ useApiClient: () => apiMock }));

HTMLDialogElement.prototype.showModal ??= function showModal() {};
HTMLDialogElement.prototype.close ??= function close() {};

describe('AN-28 · Menti mentör kartı — isFaded / isBookable', () => {
  beforeEach(() => {
    apiMock.mockClear();
    mentorMatchesResponse = { ok: true, data: { items: [bookableMentor, fadedMentor] } };
  });

  it('isBookable:true mentörde "Görüşme Talep Et" aktif ve tıklanabilir', async () => {
    render(<MentiDashboardPage />);
    await screen.findByText('Uygun Mentör');

    const card = screen.getByText('Uygun Mentör').closest('div.rounded-xl') as HTMLElement;
    const bookButton = within(card).getByRole('button', { name: 'Görüşme Talep Et' });
    expect(bookButton).not.toBeDisabled();
  });

  it('isBookable:false mentörde "Görüşme Talep Et" devre dışı, "Mesaj" aktif kalır', async () => {
    render(<MentiDashboardPage />);
    await screen.findByText('Soluk Mentör');

    const card = screen.getByText('Soluk Mentör').closest('div.rounded-xl') as HTMLElement;
    const bookButton = within(card).getByRole('button', { name: 'Görüşme Talep Et' });
    expect(bookButton).toBeDisabled();

    const messageButton = within(card).getByRole('button', { name: 'Mesaj' });
    expect(messageButton).not.toBeDisabled();
  });

  it('isFaded:true kart GİZLENMEZ — "Sınırlı" rozetiyle listede kalır (KARAR-80/M7)', async () => {
    render(<MentiDashboardPage />);
    await screen.findByText('Soluk Mentör');
    // Her iki kart da listede: soluk mentör kaldırılmadı.
    expect(screen.getByText('Uygun Mentör')).toBeInTheDocument();
    expect(screen.getByText('Soluk Mentör')).toBeInTheDocument();
    expect(screen.getByText('Sınırlı')).toBeInTheDocument();
  });

  it('isFaded:false mentörde "Sınırlı" rozeti YOK', async () => {
    render(<MentiDashboardPage />);
    await screen.findByText('Uygun Mentör');
    const card = screen.getByText('Uygun Mentör').closest('div.rounded-xl') as HTMLElement;
    expect(within(card).queryByText('Sınırlı')).not.toBeInTheDocument();
  });
});

// AJ-66 · KARAR 4: sertifika rozeti herkese görünür, yalnız pozitif (sertifikasızda etiket YOK).
describe('AJ-66 · Menti mentör kartı — "✓ Sertifikalı" rozeti', () => {
  beforeEach(() => {
    apiMock.mockClear();
    mentorMatchesResponse = { ok: true, data: { items: [bookableMentor, fadedMentor] } };
  });

  it('isCertified:true mentör kartında "✓ Sertifikalı" rozeti görünür', async () => {
    render(<MentiDashboardPage />);
    await screen.findByText('Uygun Mentör');
    const card = screen.getByText('Uygun Mentör').closest('div.rounded-xl') as HTMLElement;
    expect(within(card).getByText('✓ Sertifikalı')).toBeInTheDocument();
  });

  it('isCertified:false mentör kartında sertifikayla ilgili HİÇBİR etiket yok (olumsuz etiket yok)', async () => {
    render(<MentiDashboardPage />);
    await screen.findByText('Soluk Mentör');
    const card = screen.getByText('Soluk Mentör').closest('div.rounded-xl') as HTMLElement;
    expect(within(card).queryByText(/sertifika/i)).not.toBeInTheDocument();
  });
});

// AJ-81 · KARAR 2/7: uyum yüzdesi + gerekçe görünür · KARAR 5: mentörün DISC tipi görünmez.
describe('AJ-81 · Menti mentör kartı — uyum yüzdesi, gerekçe, DISC gizliliği', () => {
  // Backend DTO'su discType/discLetters TAŞIMAZ; burada sızmış gibi eklenir (tip dışı alan) ki
  // ön yüzün bunu ekrana basmadığı ölçülsün. C → arketip "Kâşif" (DiscBadge DISC_META).
  const leakedDiscMentor = {
    ...bookableMentor,
    mentorId: 'mentor-leaked-disc',
    mentorName: 'Sızıntı Mentör',
    matchScore: 73,
    compatibilityReason: 'İletişim tarzları uyumlu',
    discType: 'C',
    discLetters: 'Cs',
  } as MentorMatch;

  beforeEach(() => {
    apiMock.mockClear();
    mentorMatchesResponse = { ok: true, data: { items: [bookableMentor, fadedMentor, leakedDiscMentor] } };
  });

  function cardOf(name: string): HTMLElement {
    return screen.getByText(name).closest('div.rounded-xl') as HTMLElement;
  }

  it('her kartta uyum skoru "%<sayı>" biçiminde ve "uyum" etiketiyle görünür', async () => {
    render(<MentiDashboardPage />);
    await screen.findByText('Uygun Mentör');
    const bookable = cardOf('Uygun Mentör');
    expect(within(bookable).getByText('%80')).toBeInTheDocument();
    expect(within(bookable).getByText('uyum')).toBeInTheDocument();
    // Kart kendi skorunu gösterir, başka kartınkini değil.
    expect(within(bookable).queryByText('%60')).not.toBeInTheDocument();
    expect(within(cardOf('Soluk Mentör')).getByText('%60')).toBeInTheDocument();
  });

  it('her kartta "Neden uyumlu:" başlığıyla o mentörün gerekçesi görünür', async () => {
    render(<MentiDashboardPage />);
    await screen.findByText('Uygun Mentör');
    const bookableReason = within(cardOf('Uygun Mentör')).getByText('Neden uyumlu:', { exact: false }).closest('p');
    expect(bookableReason).toHaveTextContent('Neden uyumlu: Ortak sektör ve ilgi alanları');
    const fadedReason = within(cardOf('Soluk Mentör')).getByText('Neden uyumlu:', { exact: false }).closest('p');
    expect(fadedReason).toHaveTextContent('Neden uyumlu: Genel profil uyumu');
  });

  it('negatif: yanıta discType/discLetters sızsa bile kartta DISC harfi, tipi ya da arketipi görünmez', async () => {
    render(<MentiDashboardPage />);
    await screen.findByText('Sızıntı Mentör');
    const card = cardOf('Sızıntı Mentör');
    // Kartın geri kalanı normal çiziliyor (test boş kartı ölçmüyor).
    expect(within(card).getByText('%73')).toBeInTheDocument();
    expect(card).toHaveTextContent('Neden uyumlu: İletişim tarzları uyumlu');
    // DISC hiçbir biçimde yok: harf (tek/çoklu), "DISC" kelimesi, arketip adı, tooltip.
    expect(within(card).queryByText('C')).not.toBeInTheDocument();
    expect(within(card).queryByText('Cs')).not.toBeInTheDocument();
    expect(within(card).queryByText(/DISC/i)).not.toBeInTheDocument();
    expect(card.textContent ?? '').not.toMatch(/Kâşif|Öncü|Ateşleyici|Yapı Taşı/);
    expect(card.querySelector('[title*="Kâşif"]')).toBeNull();
  });
});

describe('PS-10 · Menti boş mentör listesi — profili suçlamaz, teste göndermez', () => {
  beforeEach(() => {
    apiMock.mockClear();
    mentorMatchesResponse = { ok: true, data: { items: [] } };
  });

  it('boş listede doğru sebep yazar ve /disc-test bağlantısı göstermez', async () => {
    render(<MentiDashboardPage />);
    expect(await screen.findByText('Programınızda şu an görüşülebilecek mentör yok')).toBeInTheDocument();
    expect(screen.getByText(/Bu, profilinizle ilgili değil/)).toBeInTheDocument();
    expect(screen.queryByText(/DISC Profilini Güncelle/)).not.toBeInTheDocument();
    expect(screen.queryByText(/profilinizle eşleşen mentor yok/)).not.toBeInTheDocument();
  });
});
