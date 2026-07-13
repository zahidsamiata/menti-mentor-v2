'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useApiClient } from '@/hooks/useApiClient';
import { useQuery } from '@/hooks/useQuery';
import { agreementsApi } from '@/lib/api/agreements';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertMessage } from '@/components/molecules/AlertMessage';

const FREQ_LABEL: Record<string, string> = { WEEKLY: 'Haftada bir', BIWEEKLY: 'İki haftada bir', MONTHLY: 'Ayda bir' };
const CHANNEL_LABEL: Record<string, string> = { ONLINE: 'Online', IN_PERSON: 'Yüz yüze', PHONE: 'Telefon' };
const STATUS_LABEL: Record<string, string> = {
  DRAFT: 'Taslak', ACTIVE: 'Aktif', RENEWAL_PENDING: 'Yenileme Bekleniyor', RENEWED: 'Yenilendi', ENDED: 'Tamamlandı',
};

export default function AgreementPage() {
  const params   = useParams();
  const router   = useRouter();
  const api      = useApiClient();
  const id       = params['id'] as string;

  const { data, isLoading, error } = useQuery(() => agreementsApi.getActive(api), [api]);
  const [actionError, setActionError] = useState<string | null>(null);
  const [loading, setLoading]         = useState(false);

  async function handleRenew() {
    setLoading(true);
    setActionError(null);
    const res = await agreementsApi.renew(api, id);
    setLoading(false);
    if (res.ok) router.push('/menti');
    else setActionError((res as { ok: false; error: { message?: string } }).error.message ?? 'Hata');
  }

  async function handleEnd() {
    setLoading(true);
    setActionError(null);
    const res = await agreementsApi.end(api, id);
    setLoading(false);
    if (res.ok) router.push('/menti');
    else setActionError((res as { ok: false; error: { message?: string } }).error.message ?? 'Hata');
  }

  async function handleConfirm() {
    setLoading(true);
    setActionError(null);
    const res = await agreementsApi.confirm(api, id);
    setLoading(false);
    if (res.ok) router.push('/menti');
    else setActionError((res as { ok: false; error: { message?: string } }).error.message ?? 'Hata');
  }

  if (isLoading) return <div className="animate-pulse h-32 bg-muted rounded-2xl" />;
  if (error || !data) return <AlertMessage type="error" message="Anlaşma bulunamadı." />;

  const agreement = data;
  const isPending = agreement.status === 'RENEWAL_PENDING';
  const isDraft   = agreement.status === 'DRAFT';

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in py-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Mentörlük Anlaşması</h1>
        <Badge variant={isPending ? 'warning' : 'secondary'}>{STATUS_LABEL[agreement.status]}</Badge>
      </div>

      {actionError && <AlertMessage type="error" message={actionError} />}

      <Card>
        <CardHeader><CardTitle className="text-base">Anlaşma Detayları</CardTitle></CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs text-muted-foreground">Görüşme sıklığı</p>
              <p className="font-medium">{FREQ_LABEL[agreement.meetingFrequency]}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">İletişim kanalı</p>
              <p className="font-medium">{CHANNEL_LABEL[agreement.communicationChannel]}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Süre</p>
              <p className="font-medium">{agreement.durationWeeks} hafta ({agreement.targetMeetings} görüşme)</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Gündem sahibi</p>
              <p className="font-medium">{agreement.agendaOwner === 'MENTI' ? 'Menti' : 'Mentor'}</p>
            </div>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Menti hedefi</p>
            <p className="bg-muted rounded-lg p-3 text-sm">{agreement.mentiGoal}</p>
          </div>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <span>Mentor onayı: {agreement.mentorConfirmedAt ? '✅' : '⏳ Bekleniyor'}</span>
            <span>Menti onayı: {agreement.mentiConfirmedAt ? '✅' : '⏳ Bekleniyor'}</span>
          </div>
          {agreement.expiresAt && (
            <p className="text-xs text-muted-foreground">
              Bitiş: {new Date(agreement.expiresAt).toLocaleDateString('tr-TR')}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Yenileme kararı */}
      {isPending && (
        <Card className="border-amber-300">
          <CardContent className="p-5 space-y-4">
            <h3 className="font-semibold text-sm">Anlaşmanız bitmek üzere. Ne yapmak istersiniz?</h3>
            <p className="text-xs text-muted-foreground">
              Devam etmek: mevcut koşullarla {agreement.durationWeeks} hafta daha sürer.
              Bitirmek: ilişkiyi onurlu şekilde sonlandırır, yeni eşleşme isteyebilirsiniz.
            </p>
            <div className="flex gap-3">
              <Button onClick={handleRenew} disabled={loading} className="flex-1">
                {loading ? '…' : 'Devam Et ✓'}
              </Button>
              <Button onClick={handleEnd} disabled={loading} variant="outline" className="flex-1 text-destructive border-destructive/40">
                {loading ? '…' : 'Onurlu Bitiş'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Taslak onayı */}
      {isDraft && (
        <Card className="border-primary/30">
          <CardContent className="p-5 space-y-3">
            <h3 className="font-semibold text-sm">Anlaşmayı onaylamak ister misiniz?</h3>
            <p className="text-xs text-muted-foreground">
              Her iki taraf onayladıktan sonra anlaşma aktif olacak.
            </p>
            <Button onClick={handleConfirm} disabled={loading} size="sm">
              {loading ? 'Onaylanıyor…' : 'Onaylıyorum ✓'}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
