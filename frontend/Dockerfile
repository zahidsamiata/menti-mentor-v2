# ─── Stage 1: Bağımlılıklar ──────────────────────────────────────────────────
FROM node:22-alpine AS deps
WORKDIR /app

COPY package*.json ./
RUN npm ci --ignore-scripts

# ─── Stage 2: Build ───────────────────────────────────────────────────────────
FROM node:22-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build-time env değişkenleri (ARG → ENV → Next.js NEXT_PUBLIC_ prefix ile gömülür)
ARG NEXT_PUBLIC_API_URL=http://localhost:3000
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
# Y-09: kanonik site kökü (og:image, sitemap, robots, metadataBase). Boş bırakılırsa
# getSiteUrl() (src/lib/siteUrl.ts) localhost fallback'ine düşer — prod'da set edilmeli.
ARG NEXT_PUBLIC_SITE_URL=
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
# F-05 (G1-26): Cloudflare Turnstile CAPTCHA site key (public, gizli DEĞİL). Boş bırakılırsa
# TurnstileWidget hiç render edilmez (bugünkü görünüm aynen korunur) — backend'deki
# TURNSTILE_SECRET_KEY ile birlikte set edilmeli, aksi halde widget görünür ama backend
# no-op kalır (zararsız ama gereksiz).
ARG NEXT_PUBLIC_TURNSTILE_SITE_KEY=
ENV NEXT_PUBLIC_TURNSTILE_SITE_KEY=$NEXT_PUBLIC_TURNSTILE_SITE_KEY
# DK-01: hata izleme (Sentry) — boşsa izleme tamamen kapalı (SDK yüklenmez, ağ çağrısı yok).
# Anahtar yalnız avukat onayı (aydınlatma metni + yurtdışı aktarım) sonrası Dokploy build argümanı olarak girilir.
ARG NEXT_PUBLIC_SENTRY_DSN=
ENV NEXT_PUBLIC_SENTRY_DSN=$NEXT_PUBLIC_SENTRY_DSN
ARG NEXT_PUBLIC_SENTRY_ENVIRONMENT=
ENV NEXT_PUBLIC_SENTRY_ENVIRONMENT=$NEXT_PUBLIC_SENTRY_ENVIRONMENT

RUN npm run build

# ─── Stage 3: Production runner (Next.js standalone) ─────────────────────────
FROM node:22-alpine AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Standalone bundle: .next/standalone + static + public
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
ENV NODE_ENV=production
ENV PORT=3001
EXPOSE 3001

CMD ["node", "server.js"]
