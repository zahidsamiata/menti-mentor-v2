'use client';

/**
 * E-3e — görüşme değerlendirmesini (check-in) OKUMA ekranı.
 *
 * ⚠️ DÜZELTME (bağımsız inceleme, PR #372): ilk sürüm yanlış tablodan okuyordu —
 * "Değerlendirme Yap" (/meeting-checkin) aslında `MeetingCheckIn` tablosuna
 * yazıyor, ilk sürüm ise `Feedback` tablosunu (`GET /:id/feedback`) okuyordu.
 * İkisi FARKLI modeller (bkz. backend/prisma/schema.prisma) — sonuç: kullanıcı
 * kendi değerlendirmesini hiç göremiyordu, buton da hiç kaybolmuyordu. Bu sürüm
 * doğru uçtan okur: `GET /api/meetings/:meetingId/check-ins`
 * (backend/src/routes/meetingRoutes.ts:128 → meetingCheckInController.ts:102 getCheckIns).
 * `Feedback` tablosunun okuma ekranı ayrı bir iş (AJ-14), bu bileşenin kapsamında değil.
 *
 * Backend taraf bazlı en dar görünürlük uygular (GV-04 ile aynı ilke, kod içi
 * yorum: "taraf YALNIZ KENDİ kaydını görür; karşı tarafın değerlendirmesini
 * görmez... yönetici görüşmenin tüm kayıtlarını görür"): normal taraf için
 * `items` ya boştur ya da YALNIZ kendi kaydını içerir (backend sorguyu userId
 * ile filtreler); ADMIN için tarafların gönderdiği TÜM kayıtlar döner. Ön yüz
 * bunun ötesinde bir şey göstermez — kendi kaydını `items` içinde
 * `userId === oturumdaki kullanıcı` eşleşmesiyle bulur, eşleşme yoksa (normal
 * taraf için olağan durum: henüz check-in yapılmamış) "Değerlendirme Yap"a
 * yönlendirir.
 */

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useApiClient } from '@/hooks/useApiClient';
import { meetingsApi, type MeetingCheckInRecord } from '@/lib/api/meetings';
import { Button } from '@/components/ui/button';

type ApiClient = ReturnType<typeof useApiClient>;

const CONTINUE_INTENT_LABELS: Record<string, string> = {
  EVET: 'Evet, kesinlikle',
  BELIRSIZ: 'Henüz emin değilim',
  HAYIR: 'Devam etmek istemiyorum',
};

type ReadoutState =
  | { kind: 'loading' }
  | { kind: 'found'; items: MeetingCheckInRecord[] }
  | { kind: 'not-found' }
  // 403 (taraf değil) ya da beklenmeyen durum — sessizce gizlenir, kullanıcıyı korkutmaz.
  | { kind: 'hidden' }
  | { kind: 'error' };

interface MeetingCheckInReadoutProps {
  api: ApiClient;
  meetingId: string;
  /** Oturumdaki kullanıcının id'si — kendi kaydını bulmak için (bkz. dosya üstü not). */
  currentUserId: string;
  /** true ise kurum yöneticisi görünümü: "Değerlendirmeniz" değil "Değerlendirmeler" etiketi. */
  isAdmin: boolean;
}

export function MeetingCheckInReadout({ api, meetingId, currentUserId, isAdmin }: MeetingCheckInReadoutProps) {
  const [state, setState] = useState<ReadoutState>({ kind: 'loading' });

  useEffect(() => {
    let cancelled = false;
    setState({ kind: 'loading' });

    // `Promise.resolve().then(...)`: `api()` her ortamda garanti bir fonksiyon
    // değildir (ör. test double'ları) — senkron fırlatılan hatayı da yakalayıp
    // reddedilen bir promise'e çevirir, aksi hâlde effect içinde çöker (render hatası).
    Promise.resolve()
      .then(() => meetingsApi.getCheckIns(api, meetingId))
      .then((result) => {
        if (cancelled) return;
        if (result.ok) {
          if (result.data.items.length === 0) { setState({ kind: 'not-found' }); return; }
          setState({ kind: 'found', items: result.data.items });
          return;
        }
        if (result.status === 404) { setState({ kind: 'not-found' }); return; }
        if (result.status === 403) { setState({ kind: 'hidden' }); return; }
        setState({ kind: 'error' });
      })
      .catch(() => {
        if (!cancelled) setState({ kind: 'error' });
      });

    return () => { cancelled = true; };
  }, [api, meetingId]);

  if (state.kind === 'loading') {
    return <div role="status" aria-label="Değerlendirme yükleniyor" className="h-4 w-40 animate-pulse rounded bg-muted" />;
  }

  if (state.kind === 'hidden') return null;

  if (state.kind === 'error') {
    return <p className="text-xs text-muted-foreground">Değerlendirme yüklenemedi.</p>;
  }

  if (state.kind === 'not-found') {
    // Admin check-in yapan bir taraf değil — hiç kayıt yoksa gösterecek bir şeyi yok.
    if (isAdmin) return null;
    return (
      <Button asChild size="sm" variant="outline" className="w-full">
        <Link href={`/meeting-checkin?meetingId=${meetingId}`}>Değerlendirme Yap →</Link>
      </Button>
    );
  }

  if (isAdmin) {
    return (
      <div className="space-y-2">
        <p className="text-xs font-semibold text-foreground">Değerlendirmeler</p>
        {state.items.map((item) => <CheckInCard key={item.id} item={item} />)}
      </div>
    );
  }

  // Normal taraf: backend zaten yalnız kendi kaydını döndürüyor, ama karşı
  // tarafın kaydı yanlışlıkla gelse bile (savunma amaçlı) "Değerlendirmeniz"
  // etiketi ALTINDA yalnız `userId` eşleşen kayıt gösterilir — asla başkasının
  // kaydı "kaydedildi" diye sunulmaz.
  const ownRecord = state.items.find((item) => item.userId === currentUserId);
  if (!ownRecord) {
    return (
      <Button asChild size="sm" variant="outline" className="w-full">
        <Link href={`/meeting-checkin?meetingId=${meetingId}`}>Değerlendirme Yap →</Link>
      </Button>
    );
  }

  return <CheckInCard title="Değerlendirmeniz" item={ownRecord} />;
}

function CheckInCard({ title, item }: { title?: string; item: MeetingCheckInRecord }) {
  const rows: { label: string; value: string }[] = [
    { label: 'Görüşme ne kadar değerliydi', value: `${item.overallRating}/5` },
    { label: 'Hedefe yaklaşma', value: `${item.progressRating}/5` },
    { label: 'Devam etme niyeti', value: CONTINUE_INTENT_LABELS[item.continueIntent] ?? item.continueIntent },
  ];
  if (typeof item.menteePreparedness === 'number') {
    rows.push({ label: 'Menti hazırlığı', value: `${item.menteePreparedness}/5` });
  }

  return (
    <div className="rounded-lg border border-border bg-muted/30 p-3 space-y-1.5">
      {title && <p className="text-xs font-semibold text-foreground">{title}</p>}
      {rows.map((row) => (
        <p key={row.label} className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
          <span>{row.label}</span>
          <span className="font-medium text-foreground">{row.value}</span>
        </p>
      ))}
      {item.openNote && (
        <p className="text-xs text-muted-foreground">
          <span className="font-medium text-foreground">Not:</span> {item.openNote}
        </p>
      )}
    </div>
  );
}
