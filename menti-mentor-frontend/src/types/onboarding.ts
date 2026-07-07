/** GET /api/users/disc/questions yanıtı */
export interface DiscQuestion {
  id:      number;
  text:    string;
  options: Record<string, string>; // { A: "metin", B: "metin", C: "metin", D: "metin" }
}

export interface DiscQuestionsResponse {
  questions: DiscQuestion[];
  total:     number;
}

/** POST /api/users/disc/submit body */
export interface DiscAnswer {
  questionId:     number;
  selectedOption: string; // "A" | "B" | "C" | "D"
}

/** discResultCard alanının tam şekli */
export interface DiscResultCard {
  archetype:      string;   // "Kâşif" | "Öncü" | "Ateşleyici" | "Yapı Taşı"
  icon:           string;   // "🧭" | "🦅" | "🔥" | "🌿"
  superPower:     string;
  description:    string;
  shareHeadline:  string;   // LinkedIn / WhatsApp için
  strengths:      string[];
  growthArea:     string;
  compatibleWith: string[]; // ["I", "D"]
  dominant:       string;   // "C"
  discVector:     Record<string, number>;
  rawScores:      Record<string, number>;
  completedAt:    string;
}

/** POST /api/users/disc/submit yanıtı */
export interface SubmitDiscResponse {
  message:    string;
  resultCard: DiscResultCard;
  user: {
    id:         string;
    fullName:   string;
    discType:   string | null;
    discVector: Record<string, number> | null;
  };
}

export type ExpectationCategory =
  | 'KARIYER_YONLENDIRME'
  | 'TEKNIK_BECERI'
  | 'IS_STAJ_BAGLANTISI'
  | 'GIRISIMCILIK'
  | 'KISISEL_GELISIM'
  | 'SEKTOR_TANIMA';

export type TimeCommitment = 'AYDA_1' | 'AYDA_2_3' | 'HAFTADA_1' | 'HAFTADA_2_PLUS';
export type InteractionStyle = 'GOREV_BAZLI' | 'SOHBET_BAZLI';

/** POST /api/users/profile/complete body */
export interface ProfileData {
  sector:                string;
  skills:                string[];
  experienceYears:       number;
  // Rol-spesifik (opsiyonel)
  expectationCategories?: ExpectationCategory[];
  timeCommitment?:        TimeCommitment;
  interactionStyle?:      InteractionStyle;
}
