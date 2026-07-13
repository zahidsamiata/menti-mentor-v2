'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';
import { useApiClient } from '@/hooks/useApiClient';
import { useQuery } from '@/hooks/useQuery';
import { meetingsApi } from '@/lib/api/meetings';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertMessage } from '@/components/molecules/AlertMessage';
import type { Meeting } from '@/lib/api/meetings';

const FORMAT_LABELS: Record<string, string> = {
  ONLINE: 'Online', IN_PERSON: 'Yüz yüze', PHONE: 'Telefon',
};

const STATUS_LABELS: Record<string, { label: string; variant: 'warning' | 'success' | 'secondary' | 'destructive' }> = {
  PENDING:    { label: 'Onay Bekleniyor', variant: 'warning' },
  SCHEDULED:  { label: 'Onaylandı',       variant: 'success' },
  IN_PROGRESS:{ label: 'Devam Ediyor',    variant: 'brand' as 'success' },
  COMPLETED:  { label: 'Tamamlandı',      variant: 'secondary' },
  CANCELLED:  { label: 'İptal Edildi',    variant: 'destructive' },
  APPROVED:   { label: 'Onaylandı',       variant: 'success' },
};

function MeetingCard({ meeting, userId }: { meeting: Meeting; userId: string }) {
  const isMentor  = meeting.mentorUserId === userId;
  const opponent  = isMentor ? meeting.menti : null;
  const startDate = new Date(meeting.startsAt);
  const isPast    = startDate < new Date();
  const needsFeedback = meeting.status === 'COMPLETED' && meeting.awaitingMentorApproval === false;
  const statusInfo = STATUS_LABELS[meeting.status] ?? { label: meeting.status, variant: 'secondary' as const };

  return (
    <div className="rounded-xl border border-border p-4 space-y-2">
      {/* Üst satır: tarih + durum badge */}
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-medium">
          {startDate.toLocaleString('tr-TR', { dateStyle: 'medium', timeStyle: 'short' })}
        </p>
        <Badge variant={statusInfo.variant as Parameters<typeof Badge>[0]['variant']}>
          {statusInfo.label}
        </Badge>
      </div>

      {/* Karşı taraf */}
      {opponent?.fullName && (
        <p className="text-xs text-muted-foreground">
          {isMentor ? 'Menti' : 'Mentor'}: <span className="font-medium text-foreground">{opponent.fullName}</span>
        </p>
      )}

      {/* Format */}
      <p className="text-xs text-muted-foreground">{FORMAT_LABELS[meeting.format] ?? meeting.format}</p>

      {/* Feedback uyarısı */}
      {needsFeedback && !isPast && (
        <Button asChild size="sm" variant="outline" className="w-full border-amber-400 text-amber-700 hover:bg-amber-50">
          <Link href={`/meeting-checkin?meetingId=${meeting.id}`}>
            Değerlendirme Yap →
          </Link>
        </Button>
      )}
    </div>
  );
}

export default function MeetingsPage() {
  const { user, isLoading } = useAuth();
  const api = useApiClient();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) router.replace('/login');
  }, [user, isLoading, router]);

  const listParams = user?.role === 'MENTOR'
    ? { mentorId: user.id }
    : user?.role === 'MENTI'
    ? { mentiId: user.id }
    : {};

  const { data, isLoading: meetingsLoading, error } = useQuery(
    () => meetingsApi.list(api, listParams),
    [api, user?.id],
    { enabled: Boolean(user?.id) },
  );

  if (!user && !isLoading) return null;

  const now = new Date();
  const upcoming = (data?.items ?? []).filter(
    (m) => new Date(m.startsAt) >= now && m.status !== 'CANCELLED',
  ).sort((a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime());

  const past = (data?.items ?? []).filter(
    (m) => new Date(m.startsAt) < now || m.status === 'CANCELLED',
  ).sort((a, b) => new Date(b.startsAt).getTime() - new Date(a.startsAt).getTime());

  const pendingFeedback = (data?.items ?? []).filter(
    (m) => m.status === 'COMPLETED' && !m.awaitingMentorApproval,
  );

  return (
    <div className="space-y-6 max-w-2xl mx-auto animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Görüşmelerim</h1>
        <p className="text-sm text-muted-foreground">Tüm randevularınız ve geçmiş görüşmeleriniz.</p>
      </div>

      {/* Bekleyen feedback uyarısı */}
      {pendingFeedback.length > 0 && (
        <div className="rounded-xl border-2 border-amber-400 bg-amber-50 dark:bg-amber-950/20 p-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-amber-800 dark:text-amber-300">
              {pendingFeedback.length} görüşme değerlendirme bekliyor
            </p>
            <p className="text-xs text-amber-700 dark:text-amber-400">Görüşme sonrası değerlendirme henüz tamamlanmadı.</p>
          </div>
          <Button asChild size="sm" variant="outline" className="shrink-0 border-amber-500">
            <Link href={`/meeting-checkin?meetingId=${pendingFeedback[0]!.id}`}>
              Şimdi Yap
            </Link>
          </Button>
        </div>
      )}

      {error && <AlertMessage type="error" message={error} />}

      {meetingsLoading && (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => <div key={i} className="h-24 animate-pulse rounded-xl bg-muted" />)}
        </div>
      )}

      {/* Yaklaşan */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            Yaklaşan Görüşmeler
            {upcoming.length > 0 && (
              <Badge variant="brand" className="ml-2 text-xs">{upcoming.length}</Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {upcoming.length === 0 ? (
            <div className="text-center py-8 text-sm text-muted-foreground">
              <p>Yaklaşan görüşme yok.</p>
              {user?.role === 'MENTI' && (
                <Button asChild variant="link" size="sm" className="mt-1">
                  <Link href="/menti">Mentor listesine git →</Link>
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              {upcoming.map((m) => <MeetingCard key={m.id} meeting={m} userId={user!.id} />)}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Geçmiş */}
      {past.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base text-muted-foreground">Geçmiş Görüşmeler</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {past.map((m) => <MeetingCard key={m.id} meeting={m} userId={user!.id} />)}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
