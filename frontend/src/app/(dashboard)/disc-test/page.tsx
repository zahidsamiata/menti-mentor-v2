'use client';

/**
 * DISC Adaptif Test Sayfası
 *
 * Akış:
 *  1. AuthProvider'dan token + tenantId alınır
 *  2. useDiscTest soruları + mevcut ilerlemeyi yükler (test devam ettirme desteklenir)
 *  3. Backend-driven faz geçişi: hook state.phaseJustChanged flag'ini yönetir
 *  4. Tüm sorular bitince "Profil Hazır" ekranı → /dashboard yönlendirmesi
 *
 * Refactoring notu: prevPhaseRef kaldırıldı.
 * Önceki versiyonda sayfa bileşeni faz karşılaştırması yapıyordu (prevPhaseRef).
 * Artık useDiscTest hook'u state.phaseJustChanged'i kendi yönetir; sayfa sadece okur.
 */

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';
import { useTenant } from '@/providers/TenantProvider';
import { useDiscTest } from '@/hooks/useDiscTest';
import { DiscTestCard } from '@/components/organisms/DiscTestCard';
import { UI_TEXT } from '@/lib/uiText';

export default function DiscTestPage() {
  const router = useRouter();
  const { user, accessToken } = useAuth();
  const { tenant } = useTenant();

  if (!user || !accessToken || !tenant) {
    return <DiscTestSkeleton />;
  }

  return (
    <DiscTestContent
      token={accessToken}
      tenantId={user.tenantId}
      onComplete={() => router.push('/dashboard?profileReady=1')}
    />
  );
}

// ─── İçerik bileşeni ─────────────────────────────────────────────────────────

interface DiscTestContentProps {
  token: string;
  tenantId: string;
  onComplete: () => void;
}

function DiscTestContent({ token, tenantId, onComplete }: DiscTestContentProps) {
  const [completed, setCompleted] = useState(false);

  const handleComplete = useCallback(() => {
    setCompleted(true);
    setTimeout(onComplete, 2500);
  }, [onComplete]);

  const { state, currentQuestion, progressPercent, answer, error, reload } = useDiscTest({
    token,
    tenantId,
    onComplete: handleComplete,
  });

  // Tamamlandı ekranı
  if (completed) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-6 text-center animate-fade-in">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand/10">
          <svg className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
            />
          </svg>
        </div>
        <div>
          <h2 className="text-2xl font-bold">DISC Profiliniz Hazır!</h2>
          <p className="text-muted-foreground mt-1">
            Cevaplarınız analiz ediliyor. Dashboard&apos;a yönlendiriliyorsunuz…
          </p>
        </div>
      </div>
    );
  }

  // Yükleniyor (yalnızca gerçek yükleme sürerken)
  if (state.loading) return <DiscTestSkeleton />;

  // K-02: yükleme hatası — eskiden sonsuz iskelet gösteriliyordu. Artık anlaşılır mesaj + tekrar dene.
  if (error && state.questions.length === 0) {
    return <DiscTestLoadError message={error} onRetry={reload} />;
  }

  // K-02: sorular yüklendi ama havuz boş — sonsuz iskelet yerine bilgilendirme.
  if (state.questions.length === 0) {
    return <DiscTestEmpty />;
  }

  // Tüm sorular geçildi ama onComplete henüz çağrılmadı
  if (!currentQuestion) return null;

  const totalQuestions = state.meta
    ? state.meta.coreCount + state.meta.deepeningCount
    : state.questions.length;

  return (
    <div className="flex min-h-[calc(100vh-6rem)] items-center justify-center px-4 py-8">
      <DiscTestCard
        question={currentQuestion}
        questionNumber={state.currentIndex + 1}
        totalQuestions={totalQuestions}
        progressPercent={progressPercent}
        phaseJustChanged={state.phaseJustChanged}
        isSubmitting={state.isSubmitting}
        error={error}
        onAnswer={answer}
      />
    </div>
  );
}

// ─── Yükleme hatası (K-02) ────────────────────────────────────────────────────

function DiscTestLoadError({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-4 text-center animate-fade-in px-4">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
        <svg className="h-8 w-8 text-destructive" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <div>
        <h2 className="text-lg font-semibold">Test yüklenemedi</h2>
        <p className="text-sm text-muted-foreground mt-1 max-w-sm">{message}</p>
      </div>
      <button
        onClick={onRetry}
        className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        {UI_TEXT.actions.retry}
      </button>
    </div>
  );
}

// ─── Boş havuz (K-02) ─────────────────────────────────────────────────────────

function DiscTestEmpty() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-3 text-center animate-fade-in px-4">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
        <svg className="h-8 w-8 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <div>
        <h2 className="text-lg font-semibold">Şu an aktif test sorusu yok</h2>
        <p className="text-sm text-muted-foreground mt-1 max-w-sm">
          Test soruları henüz hazırlanmamış olabilir. Lütfen kurum yöneticinizle iletişime geçin.
        </p>
      </div>
    </div>
  );
}

// ─── Loading skeleton ─────────────────────────────────────────────────────────

function DiscTestSkeleton() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="w-full max-w-lg space-y-6 animate-pulse">
        <div className="h-2 w-full rounded-full bg-muted" />
        <div className="rounded-2xl border border-border bg-card p-8 space-y-6">
          <div className="space-y-3">
            <div className="h-4 w-3/4 rounded bg-muted" />
            <div className="h-4 w-full rounded bg-muted" />
            <div className="h-4 w-2/3 rounded bg-muted" />
          </div>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-12 flex-1 rounded-lg bg-muted" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
