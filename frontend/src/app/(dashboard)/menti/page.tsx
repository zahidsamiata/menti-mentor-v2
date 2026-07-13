'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';
import { useTenant } from '@/providers/TenantProvider';
import { TenantLogo } from '@/components/atoms/TenantLogo';
import { DashboardMetricCard } from '@/components/organisms/DashboardMetricCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useApiClient } from '@/hooks/useApiClient';
import { useQuery } from '@/hooks/useQuery';
import { matchingApi, matchRequestApi } from '@/lib/api/matching';
import { agreementsApi } from '@/lib/api/agreements';
import { DailyQuestionWidget } from '@/components/organisms/DailyQuestionWidget';
import { DiscConfidenceWidget } from '@/components/organisms/DiscConfidenceWidget';
import type { MentorListItem } from '@/types/matching';

const DISC_COLORS: Record<string, string> = {
  D: 'bg-red-400', I: 'bg-yellow-400', S: 'bg-green-400', C: 'bg-blue-400',
};
const DISC_LABELS: Record<string, string> = {
  D: 'Dominant', I: 'Influential', S: 'Steady', C: 'Conscientious',
};

export default function MentiDashboardPage() {
  const { user, isLoading } = useAuth();
  const { tenant } = useTenant();
  const api = useApiClient();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    if (!user) { router.replace('/login'); return; }
    if (user.role !== 'MENTI') {
      router.replace('/dashboard');
    }
  }, [user, isLoading, router]);

  const needsDiscTest     = !user?.discType;
  const isApproved        = user?.approvalStatus === 'APPROVED';
  const needsOrientation  = user?.needsOrientation === true;

  const { data: agreementData } = useQuery(
    () => agreementsApi.getActive(api),
    [api],
    { enabled: isApproved && !needsOrientation },
  );

  // ONAYLANMIŞ: tam mentor listesi (PII dahil)
  const { data: mentorsData, isLoading: mentorsLoading } = useQuery(
    () => matchingApi.listMentors(api),
    [api],
    { enabled: isApproved && !needsDiscTest },
  );

  // PENDING + DISC tamamsa: PII-free sayım (KVKK — mentor isimleri tarayıcıya gönderilmez)
  const { data: mentorCountData } = useQuery(
    () => matchingApi.countMentors(api),
    [api],
    { enabled: !isApproved && !needsDiscTest },
  );

  // Talep modalı state
  const [selectedMentor, setSelectedMentor] = useState<MentorListItem | null>(null);
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [sentIds, setSentIds] = useState<Set<string>>(new Set());
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    if (selectedMentor) { el.showModal(); } else { el.close(); }
  }, [selectedMentor]);

  function openModal(mentor: MentorListItem) {
    setMessage('');
    setSendError(null);
    setSelectedMentor(mentor);
  }

  function closeModal() {
    setSelectedMentor(null);
  }

  async function handleSend() {
    if (!user || !selectedMentor) return;
    setSending(true);
    setSendError(null);
    const result = await matchRequestApi.create(api, {
      requesterUserId: user.id,
      targetType: 'USER',
      targetId: selectedMentor.id,
      requestMessage: message.trim() || undefined,
    });
    setSending(false);
    if (result.ok) {
      setSentIds((prev) => new Set(prev).add(selectedMentor.id));
      closeModal();
    } else {
      setSendError(result.error.message ?? 'Talep gönderilemedi.');
    }
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Başlık */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {tenant && <TenantLogo tenant={tenant} size={40} />}
          <div>
            <h1 className="text-2xl font-bold">Menti Paneli</h1>
            <p className="text-sm text-muted-foreground">
              Hoş geldiniz, {user?.fullName?.split(' ')[0] ?? 'Menti'}
            </p>
          </div>
        </div>
        <Badge variant={isApproved ? 'success' : 'warning'} className="text-xs">
          {isApproved ? 'Onaylandı' : 'Onay Bekleniyor'}
        </Badge>
      </div>

      {/* Oryantasyon kilidi uyarısı */}
      {needsOrientation && (
        <div className="rounded-2xl border-2 border-dashed border-destructive/50 bg-destructive/5 p-6 flex items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold text-sm text-destructive">Görüşme Kilidi Aktif</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Son görüşmedeki hazırlık puanınız düşük bulundu. Kısa rehberi tamamladığınızda kilit otomatik kaldırılır.
            </p>
          </div>
          <Button asChild size="sm" variant="destructive">
            <Link href="/menti/orientation-guide">Rehbere Başla →</Link>
          </Button>
        </div>
      )}

      {/* Anlaşma yenileme uyarısı */}
      {agreementData?.status === 'RENEWAL_PENDING' && (
        <div className="rounded-2xl border-2 border-dashed border-amber-400/60 bg-amber-50 dark:bg-amber-950/20 p-6 flex items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold text-sm text-amber-800 dark:text-amber-300">Mentörlük Anlaşmanız Bitmek Üzere</h3>
            <p className="text-xs text-amber-700 dark:text-amber-400 mt-0.5">
              Devam etmek istiyor musunuz? Yenileme veya onurlu bitiş seçeneğini seçin.
            </p>
          </div>
          <Button asChild size="sm" variant="outline">
            <Link href={`/menti/agreement/${agreementData.id}`}>Karar Ver →</Link>
          </Button>
        </div>
      )}

      {/* DISC testi tamamlanmamış uyarısı */}
      {needsDiscTest && (
        <div className="rounded-2xl border-2 border-dashed border-primary/40 bg-primary/5 p-6 flex items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold text-sm">DISC Profilinizi Tamamlayın</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Profil tamamlandığında size uygun mentorlar gösterilmeye başlar.
            </p>
          </div>
          <Button asChild size="sm">
            <Link href="/disc-test">Teste Başla →</Link>
          </Button>
        </div>
      )}

      {/* Bekleme odası banner — PII-free mentor sayısı (KVKK) */}
      {!needsDiscTest && !isApproved && (
        <div className="rounded-2xl border-2 border-dashed border-amber-400/50 bg-amber-50 dark:bg-amber-950/20 p-6 space-y-2">
          <h3 className="font-semibold text-sm text-amber-800 dark:text-amber-300">
            Bekleme Odasındasınız
          </h3>
          {mentorCountData && mentorCountData.count >= 3 ? (
            // Küçük havuz koruması: eşik altında (<3) sayı gösterme — kimliği daraltabilir
            <p className="text-xs text-amber-700 dark:text-amber-400">
              Profiliniz analiz edildi.{' '}
              <strong className="font-semibold">{mentorCountData.count} onaylı mentor</strong>{' '}
              bu programda yer alıyor — yönetici onayı sonrası eşleşme başlayacak.
            </p>
          ) : (
            <p className="text-xs text-amber-700 dark:text-amber-400">
              DISC testiniz tamamlandı. Yöneticiniz profilinizi onayladığında mentor listesine erişebilirsiniz.
            </p>
          )}
        </div>
      )}

      {/* Profil güvenilirliği + günün sorusu */}
      {user?.id && <DiscConfidenceWidget userId={user.id} />}
      {user?.id && <DailyQuestionWidget userId={user.id} />}

      {/* Metrikler — sadece onaylı kullanıcılar için gerçek veri */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <DashboardMetricCard label="Gönderilen Talepler" value={sentIds.size} color="brand" />
        <DashboardMetricCard label="Onaylanan Eşleşmeler" value={0} color="success" />
        <DashboardMetricCard label="Tamamlanan Toplantılar" value={0} color="neutral" />
        <DashboardMetricCard label="DISC Profili" value={user?.discType ?? '—'} color="warning" />
      </div>

      {/* Önerilen Mentorlar */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Önerilen Mentorlar</CardTitle>
        </CardHeader>
        <CardContent>
          {needsDiscTest ? (
            <p className="text-sm text-muted-foreground text-center py-6">
              DISC profilinizi tamamladıktan sonra size uygun mentorlar burada görünecek.
            </p>
          ) : !isApproved ? (
            <p className="text-sm text-muted-foreground text-center py-6">
              Yönetici onayı bekleniyor. Onay sonrasında mentor listesine erişebilirsiniz.
            </p>
          ) : mentorsLoading ? (
            <div className="flex flex-col gap-3 py-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-16 rounded-xl bg-muted animate-pulse" />
              ))}
            </div>
          ) : !mentorsData?.items.length ? (
            <p className="text-sm text-muted-foreground text-center py-6">
              Şu an uygun mentor bulunamadı.
            </p>
          ) : (
            <div className="divide-y divide-border">
              {mentorsData.items.map((mentor) => (
                <div key={mentor.id} className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-sm font-semibold">
                      {mentor.fullName[0]}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{mentor.fullName}</p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        {mentor.discType && (
                          <span className={`inline-block h-2 w-2 rounded-full ${DISC_COLORS[mentor.discType]}`} />
                        )}
                        <p className="text-xs text-muted-foreground">
                          {mentor.discType ? DISC_LABELS[mentor.discType] : 'Profil yok'}
                          {mentor.sectorTags.length > 0 && ` · ${mentor.sectorTags.slice(0, 2).join(', ')}`}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => router.push(`/book-meeting?mentorId=${mentor.id}`)}
                    >
                      Randevu Al
                    </Button>
                    <Button
                      size="sm"
                      variant={sentIds.has(mentor.id) ? 'secondary' : 'default'}
                      disabled={sentIds.has(mentor.id)}
                      onClick={() => !sentIds.has(mentor.id) && openModal(mentor)}
                    >
                      {sentIds.has(mentor.id) ? 'Gönderildi ✓' : 'Mesaj'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Talep Gönder Modalı */}
      <dialog
        ref={dialogRef}
        className="rounded-2xl border border-border bg-card p-6 shadow-xl w-full max-w-md backdrop:bg-black/50"
        onCancel={closeModal}
      >
        {selectedMentor && (
          <>
            <h2 className="text-lg font-semibold">
              {selectedMentor.fullName} · Talep Gönder
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Kendinizi kısaca tanıtın ve bu mentorla neden eşleşmek istediğinizi yazın.
            </p>

            <textarea
              className="mt-4 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
              rows={5}
              maxLength={1000}
              placeholder="Merhaba, ben... Bu eşleşmeden beklentim..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              autoFocus
            />
            <p className="mt-1 text-right text-xs text-muted-foreground">
              {message.length}/1000
            </p>

            {sendError && (
              <p className="mt-2 text-xs text-destructive">{sendError}</p>
            )}

            <div className="mt-4 flex justify-end gap-2">
              <Button variant="outline" onClick={closeModal} disabled={sending}>
                Vazgeç
              </Button>
              <Button onClick={handleSend} disabled={sending}>
                {sending ? 'Gönderiliyor…' : 'Gönder'}
              </Button>
            </div>
          </>
        )}
      </dialog>
    </div>
  );
}
