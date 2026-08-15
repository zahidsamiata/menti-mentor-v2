'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';
import { useTenant } from '@/providers/TenantProvider';
import { TenantLogo } from '@/components/atoms/TenantLogo';
import { UserAvatar } from '@/components/atoms/UserAvatar';
import { ReportUserButton } from '@/components/organisms/ReportUserButton';
import { DashboardMetricCard } from '@/components/organisms/DashboardMetricCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useApiClient } from '@/hooks/useApiClient';
import { useQuery } from '@/hooks/useQuery';
import { matchingApi } from '@/lib/api/matching';
import { conversationsApi } from '@/lib/api/conversations';
import { agreementsApi } from '@/lib/api/agreements';
import { DailyQuestionWidget } from '@/components/organisms/DailyQuestionWidget';
import { DiscConfidenceWidget } from '@/components/organisms/DiscConfidenceWidget';
import { LearningJourneyCard } from '@/components/organisms/LearningJourneyCard';
import type { MentorMatch } from '@/types/matching';

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

  // ONAYLANMIŞ: uyum skorlu mentör kartları (KARAR 5 güvenli — discType dönmez).
  // Menti kendi id'siyle "bana uygun mentörler"i uyum yüzdesiyle görür.
  const { data: mentorsData, isLoading: mentorsLoading } = useQuery(
    () => matchingApi.mentorMatches(api, user?.id ?? ''),
    [api, user?.id],
    { enabled: isApproved && !needsDiscTest && !!user?.id },
  );

  // PENDING + DISC tamamsa: PII-free sayım (KVKK — mentor isimleri tarayıcıya gönderilmez)
  const { data: mentorCountData } = useQuery(
    () => matchingApi.countMentors(api),
    [api],
    { enabled: !isApproved && !needsDiscTest },
  );

  // Talep modalı state
  const [selectedMentor, setSelectedMentor] = useState<MentorMatch | null>(null);
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

  function openModal(mentor: MentorMatch) {
    setMessage('');
    setSendError(null);
    setSelectedMentor(mentor);
  }

  function closeModal() {
    setSelectedMentor(null);
  }

  async function handleSend() {
    if (!user || !selectedMentor) return;
    const body = message.trim();
    // İlk mesaj ZORUNLU — konuşma bu mesajla başlar.
    if (!body) { setSendError('Lütfen bir mesaj yazın.'); return; }
    setSending(true);
    setSendError(null);
    const result = await conversationsApi.start(api, {
      mentorUserId: selectedMentor.mentorId,
      message: body,
    });
    setSending(false);
    if (result.ok) {
      setSentIds((prev) => new Set(prev).add(selectedMentor.mentorId));
      closeModal();
      router.push(`/messages/${result.data.conversation.id}`);
    } else {
      setSendError(result.error.message ?? 'Mesaj gönderilemedi.');
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

      {/* Öğrenme Yolculuğu — DISC sonrası davet (menti sertifikaya girmez) */}
      {!needsDiscTest && <LearningJourneyCard />}

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
            <div className="text-center py-8 space-y-3">
              <p className="text-sm text-muted-foreground">
                DISC profilinizi tamamladıktan sonra size uygun mentorlar burada görünecek.
              </p>
              <Button asChild size="sm">
                <Link href="/disc-test">DISC Testini Başlat →</Link>
              </Button>
            </div>
          ) : !isApproved ? (
            <div className="text-center py-8 space-y-2">
              <p className="text-sm font-medium">Yönetici onayı bekleniyor</p>
              <p className="text-xs text-muted-foreground">
                Profiliniz inceleniyor. Onay sonrasında mentor listesine erişip randevu alabilirsiniz.
              </p>
            </div>
          ) : mentorsLoading ? (
            <div className="flex flex-col gap-3 py-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-16 rounded-xl bg-muted animate-pulse" />
              ))}
            </div>
          ) : !mentorsData?.items.length ? (
            <div className="text-center py-8 space-y-2">
              <p className="text-sm font-medium">Şu an uygun mentor bulunamadı</p>
              <p className="text-xs text-muted-foreground">
                Programınıza henüz mentor katılmamış ya da profilinizle eşleşen mentor yok.
                DISC profilinizin güncel olduğundan emin olun.
              </p>
              <Button asChild variant="outline" size="sm">
                <Link href="/disc-test">DISC Profilini Güncelle →</Link>
              </Button>
            </div>
          ) : (
            // Havuz KART görünümü (KARAR 2/7): uyum skoru (yüzde) + "neden uyumlu" L1.
            // KARAR 5: menti mentörün DISC tipini GÖRMEZ — kart yalnız skor + jenerik
            // gerekçe + sektör gösterir; backend discType göndermez (ek savunma katmanı).
            <div className="grid gap-3 sm:grid-cols-2">
              {mentorsData.items.map((mentor) => (
                <div
                  key={mentor.mentorId}
                  className="rounded-xl border border-border bg-card p-4 flex flex-col gap-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <UserAvatar src={mentor.mentorAvatarUrl} name={mentor.mentorName} size={40} />
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{mentor.mentorName}</p>
                        <p className="text-xs text-muted-foreground truncate">
                          {mentor.sectorTags.length > 0
                            ? mentor.sectorTags.slice(0, 3).join(', ')
                            : 'Sektör belirtilmemiş'}
                        </p>
                      </div>
                    </div>
                    {/* Uyum skoru — yüzde. DISC gerekçesi gösterilmez (KARAR 5). */}
                    <div className="shrink-0 text-right">
                      <span className="text-lg font-bold text-primary tabular-nums">%{mentor.matchScore}</span>
                      <p className="text-[10px] text-muted-foreground leading-none">uyum</p>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">Neden uyumlu: </span>
                    {mentor.compatibilityReason}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => router.push(`/book-meeting?mentorId=${mentor.mentorId}`)}
                    >
                      Randevu Al
                    </Button>
                    <Button
                      size="sm"
                      variant={sentIds.has(mentor.mentorId) ? 'secondary' : 'default'}
                      disabled={sentIds.has(mentor.mentorId)}
                      onClick={() => !sentIds.has(mentor.mentorId) && openModal(mentor)}
                    >
                      {sentIds.has(mentor.mentorId) ? 'Gönderildi ✓' : 'Mesaj'}
                    </Button>
                    <ReportUserButton targetUserId={mentor.mentorId} targetName={mentor.mentorName} />
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
              {selectedMentor.mentorName} · Mesaj Gönder
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Kendinizi kısaca tanıtın ve neden eşleşmek istediğinizi yazın. Bu ilk mesajla konuşma başlar.
            </p>

            <textarea
              className="mt-4 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
              rows={5}
              maxLength={2000}
              placeholder="Merhaba, ben... Bu eşleşmeden beklentim..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              autoFocus
            />
            <p className="mt-1 text-right text-xs text-muted-foreground">
              {message.length}/2000
            </p>

            {sendError && (
              <p className="mt-2 text-xs text-destructive">{sendError}</p>
            )}

            <div className="mt-4 flex justify-end gap-2">
              <Button variant="outline" onClick={closeModal} disabled={sending}>
                Vazgeç
              </Button>
              <Button onClick={handleSend} disabled={sending || message.trim().length === 0}>
                {sending ? 'Gönderiliyor…' : 'Gönder'}
              </Button>
            </div>
          </>
        )}
      </dialog>
    </div>
  );
}
