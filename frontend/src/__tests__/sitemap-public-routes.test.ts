/**
 * Y-13 — Sitemap elle yazılmaz; `app/` taranarak herkese açık rotalar çıkarılır.
 *
 * Kilitlenenler: (1) bugünkü 9 yol aynen korunur, (2) yeni herkese açık sayfa kendiliğinden
 * girer, özel alanlar (noindex layout, route grubu altı, dinamik segment, `_` klasör, token
 * sayfaları) girmez, (3) sitemap'te robots.txt'nin disallow ettiği yol olmaz.
 */

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { describe, it, expect, afterEach, beforeEach, vi } from 'vitest';
import { discoverPublicPaths, ROBOTS_DISALLOW } from '@/lib/publicRoutes';
import sitemap from '@/app/sitemap';
import robots from '@/app/robots';

const APP_DIR = path.join(process.cwd(), 'src', 'app');

const TODAY_PUBLIC_PATHS = [
  '',
  '/bildir',
  '/forgot-password',
  '/gizlilik',
  '/kvkk',
  '/login',
  '/metodoloji',
  '/register',
  '/terms',
];

let tmpDirs: string[] = [];

beforeEach(() => {
  vi.stubEnv('NEXT_PUBLIC_SITE_URL', '');
});

afterEach(() => {
  vi.unstubAllEnvs();
  for (const dir of tmpDirs) fs.rmSync(dir, { recursive: true, force: true });
  tmpDirs = [];
});

function makeApp(files: Record<string, string>): string {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'y13-app-'));
  tmpDirs.push(root);
  for (const [rel, content] of Object.entries(files)) {
    const full = path.join(root, rel);
    fs.mkdirSync(path.dirname(full), { recursive: true });
    fs.writeFileSync(full, content);
  }
  return root;
}

const PAGE = 'export default function Page() { return null; }';
const PRIVATE_LAYOUT =
  "import { PRIVATE_AREA_METADATA } from '@/lib/privateAreaMetadata';\nexport const metadata = PRIVATE_AREA_METADATA;";

describe('Y-13 gerçek app dizini', () => {
  it('bugünkü 9 herkese açık yol aynen çıkar', () => {
    expect(discoverPublicPaths(APP_DIR)).toEqual(TODAY_PUBLIC_PATHS);
  });

  it('sitemap() her yolu site kökü ile üretir, ana sayfa önceliği 1', () => {
    const entries = sitemap();
    expect(entries).toHaveLength(TODAY_PUBLIC_PATHS.length);
    expect(entries[0]).toMatchObject({ url: 'http://localhost:3001', priority: 1 });
    expect(entries.slice(1).every((e) => e.priority === 0.6)).toBe(true);
  });

  it('sitemap robots.txt disallow edilen hiçbir yolu içermez', () => {
    const rules = robots().rules;
    const disallow = (Array.isArray(rules) ? rules[0].disallow : rules.disallow) as string[];
    expect(disallow).toEqual([...ROBOTS_DISALLOW]);
    const base = 'http://localhost:3001';
    for (const entry of sitemap()) {
      const urlPath = entry.url.slice(base.length);
      for (const prefix of disallow) {
        expect(urlPath === prefix || urlPath.startsWith(`${prefix}/`)).toBe(false);
      }
    }
  });

  it('token sayfaları ve özel alanlar sitemap dışında', () => {
    const paths = discoverPublicPaths(APP_DIR);
    for (const p of ['/reset-password', '/join', '/pending-approval', '/oauth/callback', '/profile', '/disc-test', '/onboarding/stk']) {
      expect(paths).not.toContain(p);
    }
  });
});

describe('Y-13 tarama kuralları (sahte app dizini)', () => {
  it('yeni herkese açık sayfa kendiliğinden girer', () => {
    const app = makeApp({ 'page.tsx': PAGE, 'hakkimizda/page.tsx': PAGE, 'blog/yazilar/page.tsx': PAGE });
    expect(discoverPublicPaths(app)).toEqual(['', '/blog/yazilar', '/hakkimizda']);
  });

  it('route grubu URL segmenti üretmez', () => {
    const app = makeApp({ 'page.tsx': PAGE, '(auth)/giris/page.tsx': PAGE });
    expect(discoverPublicPaths(app)).toEqual(['', '/giris']);
  });

  it('noindex layout altındaki her şey dışlanır (Y-08)', () => {
    const app = makeApp({
      'page.tsx': PAGE,
      '(panel)/layout.tsx': PRIVATE_LAYOUT,
      '(panel)/ayarlar/page.tsx': PAGE,
      'ozel/layout.tsx': PRIVATE_LAYOUT,
      'ozel/alt/page.tsx': PAGE,
    });
    expect(discoverPublicPaths(app)).toEqual(['']);
  });

  it('noindex sayfa dışlanır ama kardeş alt sayfası girer', () => {
    const app = makeApp({
      'page.tsx': PAGE,
      'sihirbaz/page.tsx': PRIVATE_LAYOUT,
      'sihirbaz/tanitim/page.tsx': PAGE,
    });
    expect(discoverPublicPaths(app)).toEqual(['', '/sihirbaz/tanitim']);
  });

  it('dinamik, _özel, @slot, api klasörleri ve sayfasız klasörler dışlanır', () => {
    const app = makeApp({
      'page.tsx': PAGE,
      'yazi/[slug]/page.tsx': PAGE,
      '_sections/page.tsx': PAGE,
      '@modal/page.tsx': PAGE,
      'api/page.tsx': PAGE,
      'fonts/x.woff': '',
    });
    expect(discoverPublicPaths(app)).toEqual(['']);
  });

  it('robots disallow önekleri ve token sayfaları dışlanır', () => {
    const app = makeApp({
      'page.tsx': PAGE,
      'mentor/page.tsx': PAGE,
      'mentor/liste/page.tsx': PAGE,
      'mentorluk/page.tsx': PAGE,
      'reset-password/page.tsx': PAGE,
      'join/page.tsx': PAGE,
    });
    expect(discoverPublicPaths(app)).toEqual(['', '/mentorluk']);
  });
});
