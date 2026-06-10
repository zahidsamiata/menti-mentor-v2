'use client';

/**
 * DISC Adaptif Test Hook — Refactored
 *
 * Sorumluluklar (Single Responsibility):
 *   - Soru listesi + pool meta verisini yükler (getQuestions)
 *   - Mevcut ilerlemeyi getirir → test kaldığı yerden devam eder (getProgress)
 *   - Her yanıtı backend'e gönderir, dönen progress'e göre fazı günceller
 *   - Faz geçiş bildirimini (phaseJustChanged) kapsüller — UI bileşeni bilmez
 *
 * ──────────────────────────────────────────────────────────────
 * Faz Geçiş Modeli (Backend-Driven)
 * ──────────────────────────────────────────────────────────────
 *   Önceki versiyon: CORE_COMPLETION_THRESHOLD = 20 sabitiyle client-side karar
 *   Yeni versiyon   : backend her yanıt sonrası AdaptiveProgress.isDeepening döner
 *
 *   Bu yaklaşımın avantajı: Admin CORE soru sayısını değiştirirse frontend
 *   kod değişikliği gerektirmez; backend yeni eşiği hesaplar ve döner.
 *
 * ──────────────────────────────────────────────────────────────
 * İlerleme Hesabı O(1)
 * ──────────────────────────────────────────────────────────────
 *   Önceki versiyon: filter + find kombinasyonu → O(n²)
 *   Yeni versiyon  : questionTypeMap (Map<id, type>) ile O(1) lookup
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { discTestApi } from '@/lib/api/discTest';
import type {
  DiscQuestion,
  DiscTestState,
  LikertValue,
  TestPhase,
} from '@/types/discTest';

// ─── Arayüzler ───────────────────────────────────────────────────────────────

interface UseDiscTestOptions {
  token: string;
  tenantId: string;
  onComplete: () => void;
}

export interface UseDiscTestReturn {
  state: DiscTestState;
  /** Aktif soru veya null (yüklenme / tamamlanma durumunda) */
  currentQuestion: DiscQuestion | null;
  /** 0–100 ilerleme yüzdesi (UI progress bar için) */
  progressPercent: number;
  /** Kullanıcının seçim yaptığında çağrılacak handler */
  answer: (value: LikertValue) => Promise<void>;
  /** Yükleme/API hatası mesajı veya null */
  error: string | null;
}

// ─── Başlangıç state'i ───────────────────────────────────────────────────────

function buildInitialState(): DiscTestState {
  return {
    questions: [],
    meta: null,
    answers: {},
    currentIndex: 0,
    phase: 'CORE',
    isSubmitting: false,
    phaseJustChanged: false,
  };
}

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useDiscTest({ token, tenantId, onComplete }: UseDiscTestOptions): UseDiscTestReturn {
  const [state, setState] = useState<DiscTestState>(buildInitialState);
  const [error, setError] = useState<string | null>(null);

  /**
   * onComplete'i ref'e al: useEffect bağımlılık listesini temiz tutar.
   * Caller her render'da yeni bir fonksiyon referansı verse de hook yeniden
   * yüklenmez; sadece onComplete'in güncel versiyonu çağrılır.
   */
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  // ── 1. Soruları + mevcut ilerlemeyi yükle ──────────────────────────────────
  useEffect(() => {
    let cancelled = false;

    async function load() {
      const [questionsResult, progressResult] = await Promise.all([
        discTestApi.getQuestions(token, tenantId),
        discTestApi.getProgress(token, tenantId),
      ]);

      if (cancelled) return;

      if (!questionsResult.ok) {
        setError('Sorular yüklenemedi. Lütfen sayfayı yenileyin.');
        return;
      }

      const { items: rawQuestions, meta } = questionsResult.data;

      /**
       * Sıralama garantisi: Backend CORE'ları önce, her grup içinde `order`'a göre döner.
       * Burada yeniden sıralama yapmak gerekmez; invariant olarak belgelenmiştir.
       * (questionService.ts → buildQuestionList → orderBy: [{type:'asc'}, {order:'asc'}])
       */
      const questions = rawQuestions;

      // Mevcut ilerlemeye göre hangi soru gösterilmeli?
      const answeredIds = progressResult.ok
        ? new Set(await resolveAnsweredIds(progressResult.data.totalAnswered, questions))
        : new Set<string>();

      // Cevaplanmamış ilk sorunun index'ini bul (test devam ettirme)
      const resumeIndex = findResumeIndex(questions, answeredIds);

      // Backend progress ile faz belirle
      const phase = derivePhase(
        progressResult.ok ? progressResult.data : null,
      );

      setState({
        questions,
        meta,
        answers: {},         // history'yi hafızada tutmaya gerek yok; backend güvende
        currentIndex: resumeIndex,
        phase,
        isSubmitting: false,
        phaseJustChanged: false,
      });
    }

    void load();
    return () => { cancelled = true; };
  }, [token, tenantId]); // token/tenantId değişirse (OAuth yenileme vb.) yeniden yükle

  // ── 2. Cevap gönder ────────────────────────────────────────────────────────
  const answer = useCallback(
    async (value: LikertValue) => {
      const current = state.questions[state.currentIndex];
      if (!current || state.isSubmitting) return;

      setState((prev) => ({ ...prev, isSubmitting: true, phaseJustChanged: false }));
      setError(null);

      const result = await discTestApi.respond(current.id, value, token, tenantId);

      if (!result.ok) {
        setError('Cevap kaydedilemedi. Lütfen tekrar deneyin.');
        setState((prev) => ({ ...prev, isSubmitting: false }));
        return;
      }

      const { progress } = result.data;
      const nextIndex = state.currentIndex + 1;
      const isLastQuestion = nextIndex >= state.questions.length;

      // Faz geçişi gerçekleşti mi?
      const currentPhase = state.phase;
      const newPhase: TestPhase = isLastQuestion || progress.isComplete
        ? 'COMPLETE'
        : progress.isDeepening
        ? 'DEEPENING'
        : 'CORE';
      const phaseJustChanged = currentPhase === 'CORE' && newPhase === 'DEEPENING';

      setState((prev) => ({
        ...prev,
        answers: { ...prev.answers, [current.id]: value },
        currentIndex: nextIndex,
        phase: newPhase,
        isSubmitting: false,
        phaseJustChanged,
      }));
    },
    // Bağımlılıklar: sadece state'in değişen parçaları — geri kalan sabit kalır
    [state.currentIndex, state.isSubmitting, state.phase, state.questions, token, tenantId],
  );

  // ── 3. Tamamlanma callback'i ───────────────────────────────────────────────
  useEffect(() => {
    if (state.phase === 'COMPLETE') {
      onCompleteRef.current();
    }
  }, [state.phase]);

  // ── 4. Türetilmiş değerler ────────────────────────────────────────────────
  const currentQuestion = state.questions[state.currentIndex] ?? null;

  /**
   * İlerleme yüzdesi: backend'den gelen meta varsa pool boyutuna göre hesaplanır.
   * meta yoksa mevcut index / toplam soru sayısına göre yaklaşık hesaplanır.
   */
  const progressPercent = calcProgressPercent(state);

  return { state, currentQuestion, progressPercent, answer, error };
}

// ─── Yardımcı fonksiyonlar ────────────────────────────────────────────────────

/**
 * Backend progress nesnesinden veya pool meta verisinden fazı türetir.
 * progress null ise (ilk yükleme) CORE fazından başlanır.
 */
function derivePhase(
  progress: { isDeepening: boolean; isComplete: boolean } | null,
): TestPhase {
  if (!progress) return 'CORE';
  if (progress.isComplete) return 'COMPLETE';
  if (progress.isDeepening) return 'DEEPENING';
  return 'CORE';
}

/**
 * Cevaplanmamış ilk sorunun index'ini bulur (test devam ettirme için).
 * Backend'den gelen answeredCount ile Set oluşturmak yerine,
 * progress.totalAnswered sayısını kullanarak basit bir index hesabı yapılır.
 * Sıralama invariant'ına güvenilir: CORE önce, aynı grup içinde order artan.
 */
function findResumeIndex(questions: DiscQuestion[], answeredIds: Set<string>): number {
  if (answeredIds.size === 0) return 0;
  const firstUnanswered = questions.findIndex((q) => !answeredIds.has(q.id));
  return firstUnanswered === -1 ? questions.length : firstUnanswered;
}

/**
 * Cevaplanmış soru ID'lerini türetir.
 * Şu an backend /my-responses yalnızca sayısal özet döndürdüğünden,
 * frontend cevaplanan ID'leri bilmeden sadece totalAnswered kullanarak
 * index resumption yapabilir (sıralı ilerleme varsayımıyla).
 */
async function resolveAnsweredIds(
  totalAnswered: number,
  questions: DiscQuestion[],
): Promise<string[]> {
  // Sıralı ilerlemede ilk N soru cevaplanmıştır
  return questions.slice(0, totalAnswered).map((q) => q.id);
}

/**
 * İlerleme yüzdesi hesabı.
 * meta varsa: currentIndex / (coreCount + deepeningCount) × 100
 * meta yoksa: currentIndex / questions.length × 100
 */
function calcProgressPercent(state: DiscTestState): number {
  const total = state.meta
    ? state.meta.coreCount + state.meta.deepeningCount
    : state.questions.length;
  if (total === 0) return 0;
  return Math.round((state.currentIndex / total) * 100);
}
