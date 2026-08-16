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
  canReapply?: boolean;
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
