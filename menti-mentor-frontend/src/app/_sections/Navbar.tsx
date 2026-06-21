'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const ROLE_LINKS = [
  { label: 'Dernek Girişi', href: '/login?role=admin'  },
  { label: 'Mentör Girişi', href: '/login?role=mentor' },
  { label: 'Menti Girişi',  href: '/login?role=menti'  },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">

          {/* ── Logo ─────────────────────────────────────────────────── */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg">
              <span className="text-xs font-black text-white tracking-tighter">M²</span>
            </div>
            <span className="text-base font-bold text-white hidden sm:block">
              Menti<span className="text-indigo-400">Mentor</span>
            </span>
          </Link>

          {/* ── Desktop nav ──────────────────────────────────────────── */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Ana gezinti">
            {ROLE_LINKS.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="rounded-md px-3 py-1.5 text-sm text-slate-300 hover:text-white hover:bg-white/8 transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* ── Desktop CTA ──────────────────────────────────────────── */}
          <Button
            asChild
            className="hidden md:flex gap-1.5 bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-400 hover:to-violet-500 border-0 text-white shadow-lg shadow-indigo-500/25 shrink-0"
          >
            <Link href="/register">
              <Sparkles className="h-3.5 w-3.5" aria-hidden />
              Derneğini Kur (Ücretsiz)
            </Link>
          </Button>

          {/* ── Mobile toggle ────────────────────────────────────────── */}
          <button
            className="md:hidden rounded-md p-2 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? 'Menüyü kapat' : 'Menüyü aç'}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* ── Mobile dropdown ──────────────────────────────────────── */}
        <div className={cn(
          'md:hidden overflow-hidden transition-all duration-300 ease-in-out',
          open ? 'max-h-64 pb-4' : 'max-h-0',
        )}>
          <div className="flex flex-col gap-1 pt-2">
            {ROLE_LINKS.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/8 transition-colors"
              >
                {label}
              </Link>
            ))}
            <Link
              href="/register"
              onClick={() => setOpen(false)}
              className="mt-2 flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-500 to-violet-600 px-4 py-2.5 text-sm font-semibold text-white"
            >
              <Sparkles className="h-4 w-4" aria-hidden />
              Derneğini Kur (Ücretsiz)
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
