/**
 * API client tipleri — tüm backend endpoint yanıt şekilleri burada tanımlanır.
 * Yeni bir endpoint eklendiğinde, yanıt tipi de buraya eklenmeli.
 */

/** Tüm başarısız API yanıtlarının genel şekli. */
export interface ApiError {
  error: string;
  message?: string;
  details?: Record<string, string[]>;
  // İş 3 P2: reddedilen kullanıcı girişinde backend gerekçeyi + tekrar-başvuru bilgisini taşır.
  rejectionReason?: string | null;
  /** IC-08: onay bekleyen hesapta yöneticinin "düzeltme iste" notu (yalnız doğru şifreden sonra döner). */
  correctionNote?: string | null;
  canReapply?: boolean;
  /** AJ-37: sertifika COOLDOWN_ACTIVE (409) yanıtında molanın bitiş anı (ISO). */
  cooldownUntil?: string | null;
}

/** fetch wrapper'ının dönüş tipi. */
export type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: ApiError; status: number };

/** Sayfalandırılmış liste yanıtı için genel kapsayıcı. */
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
