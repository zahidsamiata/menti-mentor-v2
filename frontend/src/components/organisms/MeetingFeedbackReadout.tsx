'use client';

/**
 * E-3e — görüşme değerlendirmesini OKUMA ekranı.
 *
 * Backend (`GET /api/meetings/:meetingId/feedback`, feedbackController.ts
 * getMeetingFeedback) taraf bazlı görünürlük uygular — KARAR-80 (M22, A kabul,
 * GV-04): yazan yalnız KENDİ kaydını görür, kurum yöneticisi hepsini görür,
 * karşı tarafın alanları HİÇ dönmez ("en dar görünürlük"). Bu bileşen backend'in
 * döndürdüğünden FAZLASINI göstermez: hangi alanlar dolu geldiyse onları render
 * eder, mentör/menti ayrımını KENDİSİ yapmaz (o ayrım zaten backend'de yapıldı).
 */

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useApiClient } from '@/hooks/useApiClient';
import { meetingsApi, type MeetingFeedback } from '@/lib/api/meetings';
import { Button } from '@/components/ui/button';

type ApiClient = ReturnType<typeof useApiClient>;

const SCORE_5_LABELS: Record<string, string> = {
  guidanceScore: 'Yönlendirme kalitesi',
  resourceSharingScore: 'Kaynak paylaşımı',
  trustScore: 'Güven ve güvenlik hissi',
  preparednessScore: 'Hazırlık',
  proactivityScore: 'Proaktiflik',
  engagementScore: 'Katılım/motivasyon',
  goalClarityScore: 'Hedef netliği',
  periodicNetworkScore: 'Ağ genişlemesi',
  periodicConfidenceScore: 'Özgüven değişimi',
};

const SCORE_10_LABELS: Record<string, string> = {
  periodicTrustScore: 'Güven puanı',
  periodicNpsScore: 'Tavsiye puanı (NPS)',
};

const TEXT_LABELS: Record<string, string> = {
  keyLearnings: 'Öne çıkan öğrenmeler',
  specificComments: 'Özel yorumlar',
  periodicCareerGrowth: 'Kariyer gelişimi notu',
};

type ReadoutState =
  | { kind: 'loading' }
  | { kind: 'found'; feedback: MeetingFeedback }
  | { kind: 'not-found' }
  // 403 (taraf değil) ya da beklenmeyen durum — sessizce gizlenir, kullanıcıyı korkutmaz.
  | { kind: 'hidden' }
  | { kind: 'error' };

function asRecord(feedback: MeetingFeedback): Record<string, unknown> {
  return feedback as unknown as Record<string, unknown>;
}

interface MeetingFeedbackReadoutProps {
  api: ApiClient;
  meetingId: string;
}

export function MeetingFeedbackReadout({ api, meetingId }: MeetingFeedbackReadoutProps) {
  const [state, setState] = useState<ReadoutState>({ kind: 'loading' });

  useEffect(() => {
    let cancelled = false;
    setState({ kind: 'loading' });

    // `Promise.resolve().then(...)`: `api()` her ortamda garanti bir fonksiyon
    // değildir (ör. test double'ları) — senkron fırlatılan hatayı da yakalayıp
    // reddedilen bir promise'e çevirir, aksi hâlde effect içinde çöker (render hatası).
    Promise.resolve()
      .then(() => meetingsApi.getFeedback(api, meetingId))
      .then((result) => {
        if (cancelled) return;
        if (result.ok) {
          setState({ kind: 'found', feedback: result.data });
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
    return (
      <Button asChild size="sm" variant="outline" className="w-full">
        <Link href={`/meeting-checkin?meetingId=${meetingId}`}>Değerlendirme Yap →</Link>
      </Button>
    );
  }

  const data = asRecord(state.feedback);
  const scoreRows: { label: string; value: string }[] = [];
  for (const [key, label] of Object.entries(SCORE_5_LABELS)) {
    const value = data[key];
    if (typeof value === 'number') scoreRows.push({ label, value: `${value}/5` });
  }
  for (const [key, label] of Object.entries(SCORE_10_LABELS)) {
    const value = data[key];
    if (typeof value === 'number') scoreRows.push({ label, value: `${value}/10` });
  }
  const textRows: { label: string; value: string }[] = [];
  for (const [key, label] of Object.entries(TEXT_LABELS)) {
    const value = data[key];
    if (typeof value === 'string' && value.trim()) textRows.push({ label, value });
  }

  if (scoreRows.length === 0 && textRows.length === 0) {
    // Kayıt var ama backend bu tarafa dönen HİÇBİR alanı doldurmamış (ör. karşı
    // tarafın puanları henüz girilmedi) — boş tablo yerine nötr bir onay metni.
    return <p className="text-xs text-muted-foreground">Değerlendirmeniz kaydedildi.</p>;
  }

  return (
    <div className="rounded-lg border border-border bg-muted/30 p-3 space-y-1.5">
      <p className="text-xs font-semibold text-foreground">Değerlendirmeniz</p>
      {scoreRows.map((row) => (
        <p key={row.label} className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
          <span>{row.label}</span>
          <span className="font-medium text-foreground">{row.value}</span>
        </p>
      ))}
      {textRows.map((row) => (
        <p key={row.label} className="text-xs text-muted-foreground">
          <span className="font-medium text-foreground">{row.label}:</span> {row.value}
        </p>
      ))}
    </div>
  );
}
