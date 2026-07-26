/** Sertifika öğrenme akışı tipleri (Paket D). */

export interface CertOption {
  key: string;
  label: string;
}

export interface CertQuestion {
  code: string;
  topic: string | null;
  variant: string | null;
  isRedLine: boolean;
  scenario: string;
  options: CertOption[];
}

export interface CertQuestionsResponse {
  questions: CertQuestion[];
}

export type CertOutcome = 'correct' | 'acceptable' | 'wrong';

/** POST /api/scoring/certification/answer yanıtı — seçim sonrası öğrenme anı. */
export interface CertReveal {
  outcome: CertOutcome | null;
  explanation: string | null;
  isRedLine: boolean;
  firstAttemptPass: boolean;
}

export interface CertTopicResult {
  topic: string;
  isRedLine: boolean;
  firstScore: number;
  passed: boolean;
}

/** POST /api/scoring/certify yanıtı. */
export interface CertResult {
  certScore: number;
  passRate: number;
  totalTopics: number;
  passedTopics: number;
  passed: boolean;
  status: string;
  failReason: 'BELOW_THRESHOLD' | null;
  attempts: number;
  topicResults: CertTopicResult[];
}
