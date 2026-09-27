/**
 * IC-11 — aynı `Meeting` kaydı ekranlarda tek terimle anılır: "görüşme".
 * Kullanıcıya görünen metinlerde "randevu/toplantı/buluşma" kalmadı (yorum satırları ve yasal sayfalar hariç —
 * KVKK/gizlilik metinleri hukuki metin, ayrı onay süreci).
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const FILES = [
  'src/app/(dashboard)/book-meeting/page.tsx',
  'src/app/(dashboard)/meetings/page.tsx',
  'src/app/(dashboard)/menti/page.tsx',
  'src/app/(dashboard)/menti/orientation-guide/page.tsx',
  'src/app/(dashboard)/mentor/page.tsx',
  'src/app/(dashboard)/mentor/availability/page.tsx',
  'src/app/_sections/GameSection.tsx',
  // AJ-41: yönetici çift engelleme onay metni (E-3d ile "randevu" geri gelmişti).
  'src/app/(admin)/admin/eslesmeler/BlockPairPanel.tsx',
];

function userFacingLines(file: string): string[] {
  const lines = readFileSync(join(process.cwd(), file), 'utf8').split('\n');
  let inBlockComment = false;
  const out: string[] = [];
  for (const line of lines) {
    const trimmed = line.trim();
    if (inBlockComment) {
      if (trimmed.includes('*/')) inBlockComment = false;
      continue;
    }
    if (trimmed.startsWith('{/*') || trimmed.startsWith('/*')) {
      if (!trimmed.includes('*/')) inBlockComment = true;
      continue;
    }
    if (trimmed.startsWith('//') || trimmed.startsWith('*')) continue;
    out.push(line);
  }
  return out;
}

describe('IC-11 · görüşme terimi (frontend)', () => {
  for (const file of FILES) {
    it(`${file}: "randevu/toplantı/buluşma" yok`, () => {
      const offenders = userFacingLines(file).filter((line) => /randevu|toplantı|buluşma/i.test(line));
      expect(offenders).toEqual([]);
    });
  }
});
