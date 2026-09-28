/**
 * DK-01 — tarayıcı tarafı dış hata izleme (Sentry). KARAR-27 → A.
 *
 * ── Anahtar yoksa HİÇBİR ŞEY yapmaz ──────────────────────────────────────────
 * `NEXT_PUBLIC_SENTRY_DSN` build anında boşsa SDK paketi İNDİRİLMEZ (dinamik import yapılmaz),
 * `init` çağrılmaz, ağ isteği olmaz; `captureError` sessizce döner.
 *
 * ── Neden `@sentry/nextjs` değil `@sentry/browser` ──────────────────────────
 * `@sentry/nextjs` `next.config` sarmalayıcısı, sunucu/edge kurulum dosyaları ve kaynak haritası
 * yüklemesi ister (build'e ve CSP'ye daha geniş dokunuş). Burada yalnız tarayıcıdaki hatalar
 * toplanır; sunucu hataları backend'de (`backend/src/services/errorMonitor.ts`) yakalanır.
 *
 * ── Kişisel veri ─────────────────────────────────────────────────────────────
 * `sendDefaultPii: false`; oturum kaydı (replay) ve performans izleme EKLENMEZ. Her olay ve iz kaydı
 * aşağıdaki süzgeçten geçer: istek başlıkları/çerezleri/gövdesi, adreslerin sorgu ve # kısmı
 * (davet/şifre sıfırlama token'ları orada taşınır), kullanıcı e-posta/IP'si düşer; metinlerdeki
 * e-posta ve JWT maskelenir. Kural seti backend GV-07 süzgeciyle aynı yöndedir.
 */

const REDACTED = '[gizli]';

// E-posta biçimli alt dize — backend `logSanitizer.ts` ile aynı sınırlı desen (doğrusal süre).
const EMAIL_PATTERN = /[A-Za-z0-9._%+-]{1,64}@[A-Za-z0-9-]{1,63}(?:\.[A-Za-z0-9-]{1,63}){0,8}\.[A-Za-z]{2,24}/g;
const JWT_IN_TEXT = /eyJ[A-Za-z0-9_-]{5,}\.[A-Za-z0-9_-]{5,}\.[A-Za-z0-9_-]*/g;
const AUTH_SCHEME_IN_TEXT = /\b(Bearer|Basic)\s+[A-Za-z0-9._~+/=-]+/gi;
const JWT_LIKE_SEGMENT = /^[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{8,}$/;

/** Olayın bu süzgecin dokunduğu alt kümesi (SDK tiplerine bağlanmaz; yapısal olarak uyar). */
export interface ScrubbableFrame {
  filename?: string;
  vars?: unknown;
  context_line?: string;
  pre_context?: string[];
  post_context?: string[];
}

export interface ScrubbableBreadcrumb {
  category?: string;
  message?: string;
  data?: Record<string, unknown>;
}

export interface ScrubbableEvent {
  message?: string;
  transaction?: string;
  request?: { url?: string; method?: string; headers?: unknown; cookies?: unknown; data?: unknown; query_string?: unknown };
  user?: { id?: string | number; email?: string; ip_address?: string | null; username?: string };
  exception?: {
    values?: Array<{ type?: string; value?: string; stacktrace?: { frames?: ScrubbableFrame[] } }>;
  };
  extra?: Record<string, unknown>;
  contexts?: Record<string, unknown>;
  tags?: Record<string, unknown>;
  breadcrumbs?: ScrubbableBreadcrumb[];
}

/** Serbest metindeki e-posta, JWT ve Authorization değerlerini maskeler. */
export function scrubMonitorText(text: string): string {
  const withoutEmail = text.includes('@')
    ? text.replace(EMAIL_PATTERN, (match) => `${match[0]}***@${match.split('@')[1]}`)
    : text;
  return withoutEmail.replace(JWT_IN_TEXT, REDACTED).replace(AUTH_SCHEME_IN_TEXT, `$1 ${REDACTED}`);
}

/** Adresin sorgu (`?`) ve parça (`#`) kısmını düşürür; JWT biçimli yol parçasını gizler. */
export function scrubMonitorUrl(url: string): string {
  const cut = url.search(/[?#]/);
  const base = cut === -1 ? url : url.slice(0, cut);
  const schemeEnd = base.indexOf('://');
  const pathStart = schemeEnd === -1 ? 0 : base.indexOf('/', schemeEnd + 3);
  if (pathStart === -1) return base;
  const path = base
    .slice(pathStart)
    .split('/')
    .map((segment) => (JWT_LIKE_SEGMENT.test(segment) ? REDACTED : segment))
    .join('/');
  return scrubMonitorText(base.slice(0, pathStart) + path);
}

const SENSITIVE_KEY = /(email|token|password|secret|cookie|authorization|fullname|phone|apikey)$/i;

function scrubValue(value: unknown, depth: number): unknown {
  if (typeof value === 'string') return scrubMonitorText(value);
  if (depth > 6 || value === null || typeof value !== 'object') return depth > 6 ? REDACTED : value;
  if (Array.isArray(value)) return value.map((item) => scrubValue(item, depth + 1));
  const out: Record<string, unknown> = {};
  for (const [key, inner] of Object.entries(value)) {
    out[key] = SENSITIVE_KEY.test(key.replace(/[_-]/g, '')) ? REDACTED : scrubValue(inner, depth + 1);
  }
  return out;
}

function scrubRecord(record: Record<string, unknown>): Record<string, unknown> {
  return scrubValue(record, 0) as Record<string, unknown>;
}

function scrubFrame<F extends ScrubbableFrame>(frame: F): F {
  // Yerel değişken değerleri (kişisel veri taşıyabilir) kopyaya alınmaz.
  const out: F = { ...frame };
  delete out.vars;
  if (typeof out.context_line === 'string') out.context_line = scrubMonitorText(out.context_line);
  if (Array.isArray(out.pre_context)) out.pre_context = out.pre_context.map(scrubMonitorText);
  if (Array.isArray(out.post_context)) out.post_context = out.post_context.map(scrubMonitorText);
  return out;
}

/** İz kaydı süzgeci — konsol argümanları düşer; gezinme/istek adresleri sorgusuz kalır. */
export function scrubBreadcrumb<T extends ScrubbableBreadcrumb>(breadcrumb: T): T {
  const out: T = { ...breadcrumb };
  if (typeof out.message === 'string') out.message = scrubMonitorText(out.message);
  if (out.category === 'console') {
    delete out.data;
    return out;
  }
  if (out.data) {
    const data: Record<string, unknown> = { ...out.data };
    for (const key of ['url', 'from', 'to']) {
      if (typeof data[key] === 'string') data[key] = scrubMonitorUrl(data[key] as string);
    }
    out.data = scrubRecord(data);
  }
  return out;
}

/**
 * Olay süzgeci — `beforeSend`. Girdiyi değiştirmez. Düşenler: istek başlıkları (Referer dahil),
 * çerezler, gövde, sorgu; kullanıcı e-posta/ad/IP (yalnız `id` kalır); yerel değişkenler.
 */
export function scrubEvent<T extends ScrubbableEvent>(event: T): T {
  const out: T = { ...event };
  if (typeof out.message === 'string') out.message = scrubMonitorText(out.message);
  if (typeof out.transaction === 'string') {
    out.transaction = out.transaction.startsWith('/') || out.transaction.includes('://')
      ? scrubMonitorUrl(out.transaction)
      : scrubMonitorText(out.transaction);
  }
  if (out.request) {
    out.request = {
      ...(typeof out.request.method === 'string' && { method: out.request.method }),
      ...(typeof out.request.url === 'string' && { url: scrubMonitorUrl(out.request.url) }),
    };
  }
  if (out.user) {
    const id = out.user.id;
    if (id === undefined || id === null) delete out.user;
    else out.user = { id };
  }
  if (out.exception?.values) {
    out.exception = {
      ...out.exception,
      values: out.exception.values.map((value) => ({
        ...value,
        ...(typeof value.value === 'string' && { value: scrubMonitorText(value.value) }),
        ...(value.stacktrace?.frames && {
          stacktrace: { ...value.stacktrace, frames: value.stacktrace.frames.map(scrubFrame) },
        }),
      })),
    };
  }
  if (out.extra) out.extra = scrubRecord(out.extra);
  if (out.contexts) out.contexts = scrubRecord(out.contexts);
  if (out.tags) out.tags = scrubRecord(out.tags);
  if (out.breadcrumbs) out.breadcrumbs = out.breadcrumbs.map((b) => scrubBreadcrumb(b));
  return out;
}

/** SDK'nın kullanılan kısmı (testte sahte yükleyici verilebilsin diye). */
export interface ErrorMonitorSdk {
  init: (options: Record<string, unknown>) => unknown;
  captureException: (error: unknown) => unknown;
}

export interface ErrorMonitorOptions {
  dsn?: string;
  environment?: string;
  loadSdk?: () => Promise<ErrorMonitorSdk>;
}

let activeSdk: ErrorMonitorSdk | null = null;
let initStarted = false;

const defaultLoadSdk = async (): Promise<ErrorMonitorSdk> =>
  (await import('@sentry/browser')) as unknown as ErrorMonitorSdk;

/**
 * Sentry v11'de veri toplamayı `sendDefaultPii` DEĞİL `dataCollection` yönetir ve varsayılanları AÇIKTIR
 * (`@sentry/core` `resolveDataCollectionOptions`). `userInfo: false` ayrıca tarayıcı istemcisinin IP
 * çıkarımını (`infer_ip: "never"`) ve oturuma `{{auto}}` IP eklenmesini kapatır (`@sentry/browser` client).
 */
export const DATA_COLLECTION_OFF = {
  userInfo: false,
  cookies: false,
  httpHeaders: false,
  httpBodies: [] as string[],
  urlQueryParams: false,
  stackFrameVariables: false,
  databaseQueryData: false,
  queues: false,
  graphQL: { document: false, variables: false },
  genAI: { inputs: false, outputs: false },
};

/**
 * Varsayılan listeden çıkarılan entegrasyonlar. `BrowserSession`: oturum (sağlık) takibi — yalnız hata
 * toplanıyor; her sayfa açılışında oturum gönderimi gereksiz veri aktarımıdır.
 */
const DISABLED_INTEGRATIONS = new Set(['BrowserSession']);

/** `init`e verilen seçenekler — replay/tracing entegrasyonu EKLENMEZ, örnekleme oranı verilmez. */
export function buildSdkOptions(dsn: string, environment?: string): Record<string, unknown> {
  return {
    dsn,
    environment,
    dataCollection: DATA_COLLECTION_OFF,
    sendDefaultPii: false,
    integrations: (defaults: Array<{ name: string }>) =>
      defaults.filter((integration) => !DISABLED_INTEGRATIONS.has(integration.name)),
    beforeSend: (event: ScrubbableEvent) => scrubEvent(event),
    beforeBreadcrumb: (breadcrumb: ScrubbableBreadcrumb) => scrubBreadcrumb(breadcrumb),
  };
}

/**
 * Anahtar varsa SDK'yı yükleyip başlatır (bir kez); yoksa hiçbir şey yapmaz.
 * `process.env.NEXT_PUBLIC_*` build anında metne gömülür — doğrudan adla okunmalı.
 */
export async function initErrorMonitor(options: ErrorMonitorOptions = {}): Promise<boolean> {
  const dsn = (options.dsn ?? process.env.NEXT_PUBLIC_SENTRY_DSN ?? '').trim();
  if (!dsn || initStarted) return activeSdk !== null;
  initStarted = true;
  try {
    const sdk = await (options.loadSdk ?? defaultLoadSdk)();
    sdk.init(buildSdkOptions(dsn, options.environment ?? process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT));
    activeSdk = sdk;
    return true;
  } catch {
    // İzleme kurulamazsa uygulama etkilenmez.
    initStarted = false;
    return false;
  }
}

/** Hatayı dış izleme servisine iletir; izleme etkin değilse hiçbir şey yapmaz. */
export function captureError(error: unknown): void {
  if (!activeSdk) return;
  try {
    activeSdk.captureException(error);
  } catch {
    // İzleme hatası asla ekranı bozmaz.
  }
}

/** Yalnız test: modül durumunu sıfırlar. */
export function resetErrorMonitorForTest(): void {
  activeSdk = null;
  initStarted = false;
}
