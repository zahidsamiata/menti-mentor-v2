import fs from 'node:fs';
import path from 'node:path';

/**
 * Y-13 — Herkese açık rotaların TEK kaynağı (sitemap + robots).
 *
 * Neden tarama: sitemap eskiden elle yazılmış bir diziydi; yeni herkese açık sayfa eklenince
 * listeye eklenmesi unutuluyor, sitemap'te çıkmıyordu. Artık `app/` dizini BUILD sırasında
 * taranır (`app/sitemap.ts` force-static → build'de bir kez üretilir, standalone çıktıda
 * hazır dosya servis edilir; çalışma anında `src/` olmadığı için tarama yalnız build'de olur).
 *
 * Dışlama kuralları (herkese açık DEĞİL ya da dizine girmemeli):
 *  - `_` önekli klasörler (özel bileşenler), `api`, dinamik `[param]`, paralel `@slot`,
 *    yakalama `(.)` segmentleri
 *  - Y-08 `PRIVATE_AREA_METADATA` (noindex) kullanan layout'un altı ya da o sabiti kullanan sayfa
 *  - `ROBOTS_DISALLOW` önekleri (taramaya kapalı yol sitemap'te olamaz)
 *  - `TOKEN_ONLY_PATHS`: oturum gerektirmeyen ama yalnız linkteki token ile anlamlı sayfalar
 */

/** robots.txt disallow — korumalı/kişisel alanlar. `app/robots.ts` buradan okur. */
export const ROBOTS_DISALLOW = [
  '/dashboard',
  '/admin',
  '/platform',
  '/onboarding',
  '/menti',
  '/mentor',
  '/messages',
] as const;

/** Token'sız açıldığında işe yaramayan sayfalar (şifre sıfırlama linki, davet linki). */
export const TOKEN_ONLY_PATHS = ['/reset-password', '/join'] as const;

const PAGE_FILES = ['page.tsx', 'page.ts', 'page.jsx', 'page.js'];
const LAYOUT_FILES = ['layout.tsx', 'layout.ts', 'layout.jsx', 'layout.js'];
const PRIVATE_MARKER = /\bPRIVATE_AREA_METADATA\b/;

function findFile(dir: string, names: string[]): string | null {
  for (const name of names) {
    const full = path.join(dir, name);
    if (fs.existsSync(full)) return full;
  }
  return null;
}

function usesPrivateMetadata(file: string | null): boolean {
  return file !== null && PRIVATE_MARKER.test(fs.readFileSync(file, 'utf8'));
}

/** Rota üretmeyen ya da sitemap'e giremeyecek klasörler. */
function isSkippedSegment(name: string): boolean {
  return (
    name.startsWith('_') ||
    name.startsWith('[') ||
    name.startsWith('@') ||
    name.startsWith('(.') ||
    name === 'api'
  );
}

function isRouteGroup(name: string): boolean {
  return name.startsWith('(') && name.endsWith(')');
}

function isBlockedPath(urlPath: string): boolean {
  const matchesPrefix = (prefix: string) => urlPath === prefix || urlPath.startsWith(`${prefix}/`);
  return ROBOTS_DISALLOW.some(matchesPrefix) || (TOKEN_ONLY_PATHS as readonly string[]).includes(urlPath);
}

function collectPages(dir: string, urlPath: string, out: string[]): void {
  // Y-08: noindex layout'un altındaki her şey özel alandır.
  if (usesPrivateMetadata(findFile(dir, LAYOUT_FILES))) return;

  const page = findFile(dir, PAGE_FILES);
  if (page && !usesPrivateMetadata(page)) out.push(urlPath);

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory() || isSkippedSegment(entry.name)) continue;
    const childUrl = isRouteGroup(entry.name) ? urlPath : `${urlPath}/${entry.name}`;
    collectPages(path.join(dir, entry.name), childUrl, out);
  }
}

/**
 * `appDir` altındaki herkese açık, dizine girebilir rotalar. Ana sayfa `''` olarak döner
 * (sitemap `${base}${path}` birleştirir). Sıra: ana sayfa önce, sonra alfabetik.
 */
export function discoverPublicPaths(appDir: string): string[] {
  const found: string[] = [];
  collectPages(appDir, '', found);
  return found
    .filter((urlPath) => !isBlockedPath(urlPath))
    .sort((a, b) => (a === '' ? -1 : b === '' ? 1 : a.localeCompare(b)));
}
