import fs from 'node:fs';
import path from 'node:path';

/**
 * Y-13 — Herkese açık rotaların TEK kaynağı (sitemap + robots).
 *
 * AJ-47 — Özel alanlar robots.txt ile KAPATILMAZ, yalnız `noindex` ile dizin dışı tutulur.
 * Neden: robots.txt'de Disallow edilen yol taranmaz; tarayıcı sayfadaki `noindex`'i hiç
 * okuyamaz ve başka sitelerden bağlantı verilen adres "açıklamasız" olarak dizine girebilir.
 * Bu yüzden `app/robots.ts` hiçbir yolu kapatmaz; `PRIVATE_PATH_PREFIXES` altındaki HER sayfa
 * `PRIVATE_AREA_METADATA` (noindex) taşımak zorundadır — `findPrivatePagesWithoutNoindex`
 * bunu denetler, eksik varsa sitemap üretimi (build) kırılır.
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
 *  - `PRIVATE_PATH_PREFIXES` önekleri (özel alan sitemap'te olamaz — noindex'e ek emniyet)
 *  - `TOKEN_ONLY_PATHS`: oturum gerektirmeyen ama yalnız linkteki token ile anlamlı sayfalar
 */

/**
 * Korumalı/kişisel alan önekleri. robots.txt'de Disallow EDİLMEZ (AJ-47); bu öneklerin altındaki
 * her sayfa noindex taşır ve sitemap'e girmez.
 */
export const PRIVATE_PATH_PREFIXES = [
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

/** Import satırları ve yorumlar sayılmaz: yalnız import edilip kullanılmayan sabit noindex vermez (AJ-47). */
function stripImportsAndComments(source: string): string {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/^\s*\/\/.*$/gm, '')
    .replace(/^\s*import\b[^;]*;/gm, '');
}

function usesPrivateMetadata(file: string | null): boolean {
  return file !== null && PRIVATE_MARKER.test(stripImportsAndComments(fs.readFileSync(file, 'utf8')));
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

function isUnderPrivatePrefix(urlPath: string): boolean {
  return PRIVATE_PATH_PREFIXES.some((prefix) => urlPath === prefix || urlPath.startsWith(`${prefix}/`));
}

function isBlockedPath(urlPath: string): boolean {
  return isUnderPrivatePrefix(urlPath) || (TOKEN_ONLY_PATHS as readonly string[]).includes(urlPath);
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

function collectUnindexedPrivatePages(dir: string, urlPath: string, coveredByLayout: boolean, out: string[]): void {
  const covered = coveredByLayout || usesPrivateMetadata(findFile(dir, LAYOUT_FILES));
  const page = findFile(dir, PAGE_FILES);
  if (page && !covered && isUnderPrivatePrefix(urlPath) && !usesPrivateMetadata(page)) out.push(urlPath);

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    // Dinamik `[param]` segmentleri de gezilir: `/platform/tenants/[id]` da özel alandır.
    if (!entry.isDirectory() || entry.name.startsWith('_') || entry.name === 'api') continue;
    const childUrl = isRouteGroup(entry.name) ? urlPath : `${urlPath}/${entry.name}`;
    collectUnindexedPrivatePages(path.join(dir, entry.name), childUrl, covered, out);
  }
}

/**
 * AJ-47 — `PRIVATE_PATH_PREFIXES` altında olup ne kendisi ne de bir üst layout'u
 * `PRIVATE_AREA_METADATA` (noindex) kullanan sayfalar. Boş dönmelidir: robots.txt artık bu
 * yolları kapatmadığı için noindex'siz özel sayfa arama motoru dizinine girebilir.
 */
export function findPrivatePagesWithoutNoindex(appDir: string): string[] {
  const found: string[] = [];
  collectUnindexedPrivatePages(appDir, '', false, found);
  return found.sort();
}
