/**
 * AJ-85 (erişilebilirlik denetimi bulgu #10, WCAG 1.4.3) — `text-emerald-600` bekçisi.
 *
 * `text-emerald-600` beyaz zeminde ~3.8:1; normal metin için AA eşiği 4.5:1'in altında. AJ-07
 * denetimdeki 6 ekranı düzeltti, kalan 18 yer AJ-85'te `text-emerald-700` ya da (koyu yeşil zeminli
 * rozetlerde) `SUCCESS_PILL_CLASS` deseniyle kapatıldı. Bu test kaynak ağacını tarar: yeni bir
 * `text-emerald-600` eklenirse (ya da düzeltme geri alınırsa) kırmızı olur.
 */
import { describe, it, expect } from 'vitest';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

import { SUCCESS_PILL_CLASS } from '@/lib/a11y/statusColors';

const SRC = join(__dirname, '..');
const LOW_CONTRAST = /(?<![\w-])text-emerald-600(?![\w-])/;
const SOURCE_EXT = /\.(?:tsx?|jsx?|mjs|css)$/;

/**
 * Kasıtlı istisnalar (yol `src/` altına göre) — her biri gerekçeli, kalıcı değil.
 * - platform kurum sayfası: aynı turda AJ-79 bu dosyada çalıştığı için AJ-85 dokunmadı (dosya
 *   çakışması). Oradaki 2 rozet (`tenantStatusBadge`, Aktif/Pasif) AJ-79 sonrası
 *   `SUCCESS_PILL_CLASS`'a çekilecek; o iş yapılınca bu satır SİLİNİR.
 */
const ALLOWED: Record<string, string> = {
  'app/platform/tenants/[id]/page.tsx': 'AJ-79 ile dosya çakışması — sonraki adımda SUCCESS_PILL_CLASS',
};

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) return name === '__tests__' || name === 'node_modules' ? [] : walk(full);
    return SOURCE_EXT.test(name) ? [full] : [];
  });
}

describe('AJ-85 · açık temada düşük kontrastlı yeşil metin kalmadı', () => {
  const files = walk(SRC).map((f) => relative(SRC, f).split(sep).join('/'));

  it('tarama gerçekten kaynak dosyaları görüyor (boş tarama yeşil sayılmaz)', () => {
    expect(files.length).toBeGreaterThan(100);
    expect(files).toContain('app/platform/dashboard/page.tsx');
  });

  it('src/ altında (testler hariç) istisna listesi dışında `text-emerald-600` yok', () => {
    const offenders = files
      .filter((rel) => !(rel in ALLOWED))
      .flatMap((rel) =>
        readFileSync(join(SRC, rel), 'utf8')
          .split('\n')
          .map((line, i) => (LOW_CONTRAST.test(line) ? `${rel}:${i + 1}` : null))
          .filter((hit): hit is string => hit !== null),
      );
    expect(offenders).toEqual([]);
  });

  it('istisna listesi bayatlamadı: listedeki dosya hâlâ var ve hâlâ istisnaya ihtiyaç duyuyor', () => {
    for (const rel of Object.keys(ALLOWED)) {
      expect(files).toContain(rel);
      expect(readFileSync(join(SRC, rel), 'utf8')).toMatch(LOW_CONTRAST);
    }
  });

  it('yeşil rozet deseni açık temada açık zemin + koyu metin, koyu temada eski görünüm', () => {
    const classes = SUCCESS_PILL_CLASS.split(' ');
    // Açık tema: Badge variant="success" ile aynı çift (~6.8:1).
    expect(classes).toContain('bg-emerald-100');
    expect(classes).toContain('text-emerald-800');
    // Açık temada koyu yeşil zemin (beyazla karışınca ~1.2:1) KALMAMALI — yalnız dark: önekiyle.
    expect(classes).not.toContain('bg-green-900/60');
    expect(classes).toContain('dark:bg-green-900/60');
    expect(classes).toContain('dark:text-emerald-400');
  });
});
