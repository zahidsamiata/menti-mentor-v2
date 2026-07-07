/**
 * DISC Adaptif Test Tipleri
 *
 * ──────────────────────────────────────────────────────────────
 * Önemli Tasarım Kararı: CORE_COMPLETION_THRESHOLD sabiti kaldırıldı.
 * ──────────────────────────────────────────────────────────────
 *
 * Önceki versiyonda `CORE_COMPLETION_THRESHOLD = 20` frontend'de hardcoded'dı.
 * Admin soru ekleyip/sildiğinde eşik yanlış kalıyordu.
 *
 * Yeni yaklaşım: Backend `GET /api/questions` yanıtı `meta.coreThreshold` döner.
 * Frontend bu değeri kullanır — admin havuzu değiştirse dahi test akışı otomatik uyum sağlar.
 */

export type QuestionType = 'CORE' | 'DEEPENING';
export type DiscDimension = 'D' | 'I' | 'S' | 'C' | 'GENERAL';

/** Likert ölçeği: 1 = Hiç katılmıyorum, 5 = Tamamen katılıyorum */
export type LikertValue = 1 | 2 | 3 | 4 | 5;

export interface DiscQuestion {
  id: string;
  text: string;
  type: QuestionType;
  discDimension: DiscDimension;
  order: number;
}

/**
 * Backend'in `GET /api/questions` yanıtındaki pool meta verisi.
 * Hook bu nesneyi kullanarak faz geçiş kararını verir — hardcoded sabite gerek yoktur.
 */
export interface QuestionPoolMeta {
  coreCount: number;
  deepeningCount: number;
  /** DEEPENING kilidi açılma eşiği — backend dinamik hesaplar */
  coreThreshold: number;
  /** confidence referansı: GENERAL hariç aktif soru sayısı */
  dimensionalTotal: number;
}

/** Backend `GET /api/questions` tam yanıt yapısı */
export interface QuestionsResponse {
  items: DiscQuestion[];
  total: number;
  meta: QuestionPoolMeta;
}

/** DISC boyut vektörü */
export interface DiscVector {
  D: number;
  I: number;
  S: number;
  C: number;
  /** 0–1 arası güven skoru */
  confidence: number;
}

/** GET /api/users/:id/adaptive-test/preview yanıtı */
export interface DiscPreviewResponse {
  discVector: DiscVector;
  note: string;
}

/**
 * Backend `POST /api/questions/:id/respond` yanıt yapısı.
 * progress: faz kararı bu nesneden alınır (isDeepening, isComplete).
 */
export interface RespondResponse {
  discVector: DiscVector;
  progress: AdaptiveProgress;
}

/**
 * Backend'in döndürdüğü adaptif ilerleme.
 * Frontend bu nesneye bakarak faz geçişini belirler — client-side hesap yapmaz.
 */
export interface AdaptiveProgress {
  totalAnswered: number;
  coreAnswered: number;
  deepeningAnswered: number;
  coreThreshold: number;
  isDeepening: boolean;
  isComplete: boolean;
  completionPercent: number;
}

/** Test akışı faz durumu — backend'den türetilir */
export type TestPhase = 'CORE' | 'DEEPENING' | 'COMPLETE';

/** Hook'un yönettiği istemci tarafı state */
export interface DiscTestState {
  questions: DiscQuestion[];
  /** Pool meta verisi yüklendikten sonra dolar */
  meta: QuestionPoolMeta | null;
  /** Cevaplanan soru ID → Likert değeri */
  answers: Record<string, LikertValue>;
  currentIndex: number;
  phase: TestPhase;
  isSubmitting: boolean;
  /**
   * Faz geçişi yeni gerçekleşti mi? (CORE → DEEPENING)
   * true olduğunda UI geçiş animasyonu gösterir; bir sonraki render'da false'a döner.
   */
  phaseJustChanged: boolean;
}

/** Likert görsel etiket eşlemesi — erişilebilirlik için aria-label dahil */
export const LIKERT_LABELS: Record<LikertValue, { label: string; ariaLabel: string }> = {
  1: { label: '1', ariaLabel: 'Hiç katılmıyorum' },
  2: { label: '2', ariaLabel: 'Katılmıyorum' },
  3: { label: '3', ariaLabel: 'Kararsızım' },
  4: { label: '4', ariaLabel: 'Katılıyorum' },
  5: { label: '5', ariaLabel: 'Tamamen katılıyorum' },
};

/** DISC boyut rozet renk haritası — Tailwind sınıfları */
export const DISC_DIMENSION_COLORS: Record<DiscDimension, string> = {
  D: 'bg-red-100 text-red-800',
  I: 'bg-yellow-100 text-yellow-800',
  S: 'bg-green-100 text-green-800',
  C: 'bg-blue-100 text-blue-800',
  GENERAL: 'bg-gray-100 text-gray-700',
};

/** DISC boyutu kullanıcıya gösterilecek Türkçe etiketler */
export const DISC_DIMENSION_LABELS: Record<DiscDimension, string> = {
  D: 'Kararlılık',
  I: 'Etki',
  S: 'Denge',
  C: 'Titizlik',
  GENERAL: 'Genel',
};
