/**
 * AJ-25 (Y-06 kalanı) — herkese açık (oturumsuz) HER sayfanın altından yasal metinlere
 * (KVKK aydınlatma, gizlilik) gidilebilir.
 *
 * İki katman:
 *  1. Render: public segment layout'ları çocukla render edilince KVKK + gizlilik bağlantısı var.
 *  2. Kapsam: `app/` taranır; oturum gerektiren alanlar (aşağıda gerekçeli liste) dışındaki her
 *     `page.tsx` için sayfa ya da atası olan bir layout yasal alt bilgiyi takıyor olmalı.
 *     Yeni public sayfa alt bilgisiz eklenirse bu test kırmızı olur.
 */

import fs from 'node:fs';
import path from 'node:path';
import type { ReactNode } from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import AuthLayout from '@/app/(auth)/layout';
import PendingApprovalLayout from '@/app/pending-approval/layout';
import MetodolojiLayout from '@/app/metodoloji/layout';
import BildirLayout from '@/app/bildir/layout';
import JoinLayout from '@/app/join/layout';
import OnboardingLayout from '@/app/onboarding/layout';

const APP_DIR = path.join(process.cwd(), 'src', 'app');

const LAYOUTS: Array<[string, (props: { children: ReactNode }) => ReactNode]> = [
  ['(auth) — giriş, kayıt, şifremi unuttum, şifre sıfırlama', AuthLayout],
  ['pending-approval', PendingApprovalLayout],
  ['metodoloji', MetodolojiLayout],
  ['bildir', BildirLayout],
  ['join', JoinLayout],
  ['onboarding (stk, pending-review dahil)', OnboardingLayout],
];

describe('AJ-25 — public layout alt bilgisi', () => {
  it.each(LAYOUTS)('%s: çocuğu korur ve KVKK + gizlilik bağlantısını gösterir', (_name, Layout) => {
    render(<>{Layout({ children: <p>sayfa içeriği</p> })}</>);
    expect(screen.getByText('sayfa içeriği')).toBeInTheDocument();
    const nav = screen.getByRole('navigation', { name: 'Yasal bağlantılar' });
    expect(within(nav).getByRole('link', { name: /KVKK/ })).toHaveAttribute('href', '/kvkk');
    expect(within(nav).getByRole('link', { name: /Gizlilik/ })).toHaveAttribute('href', '/gizlilik');
  });
});

/**
 * Oturum gerektiren ya da kullanıcıya içerik göstermeyen alanlar — alt bilgi şartı yok.
 * (dashboard/admin: giriş yapmış kullanıcı; platform: iç ekip paneli; oauth: anlık yönlendirme ekranı.)
 */
const EXEMPT_PREFIXES = ['(dashboard)', '(admin)', 'platform', 'oauth'];

/** Alt bilgiyi takan işaretler: ortak kabuk, SiteFooter ya da ana sayfanın kendi yasal nav'ı. */
const FOOTER_MARKER = /\bPublicPageShell\b|\bSiteFooter\b|aria-label="Yasal bağlantılar"/;

function readIfExists(file: string): string {
  return fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '';
}

function collectPageDirs(dir: string, rel: string, out: string[]): void {
  if (fs.existsSync(path.join(dir, 'page.tsx'))) out.push(rel);
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory() || entry.name.startsWith('_') || entry.name === 'api') continue;
    collectPageDirs(path.join(dir, entry.name), rel ? `${rel}/${entry.name}` : entry.name, out);
  }
}

/** Sayfa ya da kök HARİÇ herhangi bir atası layout'u alt bilgiyi takıyor mu? */
function hasLegalFooter(relDir: string): boolean {
  if (FOOTER_MARKER.test(readIfExists(path.join(APP_DIR, relDir, 'page.tsx')))) return true;
  const parts = relDir.split('/').filter(Boolean);
  for (let depth = parts.length; depth >= 1; depth--) {
    const layout = path.join(APP_DIR, ...parts.slice(0, depth), 'layout.tsx');
    if (FOOTER_MARKER.test(readIfExists(layout))) return true;
  }
  return false;
}

describe('AJ-25 — kapsam: her public sayfada yasal alt bilgi', () => {
  const pageDirs: string[] = [];
  collectPageDirs(APP_DIR, '', pageDirs);
  const publicPageDirs = pageDirs.filter(
    (rel) => !EXEMPT_PREFIXES.some((p) => rel === p || rel.startsWith(`${p}/`)),
  );

  it('bugünkü public sayfaların hepsi taramaya giriyor (tarama boş dönmüyor)', () => {
    for (const expected of [
      '', '(auth)/login', '(auth)/register', '(auth)/forgot-password', '(auth)/reset-password',
      'metodoloji', 'bildir', 'join', 'pending-approval', 'onboarding', 'onboarding/stk',
      'onboarding/stk/pending-review', 'gizlilik', 'kvkk', 'terms',
    ]) {
      expect(publicPageDirs).toContain(expected);
    }
  });

  it.each(publicPageDirs.map((rel) => [rel || '(ana sayfa)', rel]))(
    '%s alt bilgide yasal bağlantı taşıyor',
    (_label, rel) => {
      expect(hasLegalFooter(rel)).toBe(true);
    },
  );
});
