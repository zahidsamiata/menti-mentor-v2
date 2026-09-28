/**
 * Tailwind konfigürasyonu — CSS custom property tabanlı dinamik tema sistemi.
 *
 * Tasarım kararı: Renkler doğrudan Tailwind'e sabitlenmez; CSS değişkenlerine
 * (--brand, --primary vb.) referans verilir. Bu değişkenler TenantProvider
 * tarafından runtime'da tenant'a özgü değerlerle doldurulur.
 * Böylece farklı tenant'lar aynı bileşenleri farklı renklerle kullanabilir.
 */

import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    // K-10: sınıf haritaları (ör. DISC_DIMENSION_COLORS) types/ altında da tutuluyor; taranmazsa CSS'e girmez.
    './src/types/**/*.{ts,tsx}',
    // AJ-121: erişilebilir renk sınıfları (`lib/a11y/statusColors.ts`, `shareColors.ts`) lib/ altında;
    // taranmazsa rozet/paylaş düğmesi renkleri CSS'e girmez (AJ-110 rozet sınıfları bu yüzden üretilmiyordu).
    './src/lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // ── Sistem renkleri (shadcn/ui token seti) ──────────────────────────
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        // shadcn/ui primary — TenantProvider tarafından brand rengiyle eşlenir
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },

        // ── Tenant marka renkleri (runtime'da TenantProvider tarafından atanır) ──
        brand: {
          DEFAULT: 'hsl(var(--brand))',
          foreground: 'hsl(var(--brand-foreground))',
          light: 'hsl(var(--brand-light))',
          dark: 'hsl(var(--brand-dark))',
        },

        // ── Landing yüzeyleri (AJ-86c) — açık/koyu değerleri globals.css'te ──
        // `<alpha-value>`: bg-landing-surface/80 gibi saydamlık kipleri çalışsın.
        landing: {
          bg: 'hsl(var(--landing-bg) / <alpha-value>)',
          surface: 'hsl(var(--landing-surface) / <alpha-value>)',
          raised: 'hsl(var(--landing-raised) / <alpha-value>)',
          track: 'hsl(var(--landing-track) / <alpha-value>)',
          border: 'hsl(var(--landing-border) / <alpha-value>)',
          fg: 'hsl(var(--landing-fg) / <alpha-value>)',
          soft: 'hsl(var(--landing-soft) / <alpha-value>)',
          muted: 'hsl(var(--landing-muted) / <alpha-value>)',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(4px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.2s ease-out',
      },
    },
  },
  plugins: [],
};

export default config;
