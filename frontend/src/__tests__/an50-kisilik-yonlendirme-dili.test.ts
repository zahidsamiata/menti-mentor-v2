/**
 * AN-50 + AN-10 kalan ayak — kullanıcıya görünen dil:
 *  - KARAR-64 C: kişilik özelliği her yerde "kişilik" (mizaç değil);
 *  - KARAR-66 B: sistem eşleştirmez, ÖNERİR/YÖNLENDİRİR — "akıllı eşleştirme", "Eşleştirme Motoru",
 *    "nasıl eşleştirir" gibi iddialar geri çekildi.
 *
 * Kapsam: `src/` (testler hariç), yorum satırları hariç. Hukuki sayfalar (gizlilik/kvkk/terms) BİLEREK
 * dışarıda: metinleri avukat onayına bağlı (KARAR-47, AN-41) — ajan değiştirmez.
 * "Eşleşme" (kurulmuş mentörlük ilişkisi) bu testin konusu değil.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { describe, it, expect } from 'vitest';

const SRC_ROOT = join(process.cwd(), 'src');
const LEGAL_PAGES = ['gizlilik', 'kvkk', 'terms'].map((d) => `${sep}app${sep}${d}${sep}`);

function sourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) return name === '__tests__' ? [] : sourceFiles(full);
    return /\.(ts|tsx)$/.test(name) && !/\.test\.tsx?$/.test(name) ? [full] : [];
  });
}

function isCommentLine(line: string): boolean {
  const t = line.trim();
  return t.startsWith('//') || t.startsWith('*') || t.startsWith('/*') || t.startsWith('{/*');
}

function offenders(pattern: RegExp): string[] {
  const out: string[] = [];
  for (const file of sourceFiles(SRC_ROOT)) {
    if (LEGAL_PAGES.some((p) => file.includes(p))) continue;
    readFileSync(file, 'utf8').split('\n').forEach((line, i) => {
      if (!isCommentLine(line) && pattern.test(line)) out.push(`${relative(SRC_ROOT, file)}:${i + 1}`);
    });
  }
  return out;
}

describe('AN-50 · kişilik ve yönlendirme dili', () => {
  it('kullanıcıya görünen metinde "mizaç" geçmiyor (KARAR-64 C → kişilik)', () => {
    expect(offenders(/miza[çc]/i)).toEqual([]);
  });

  it('sistemin eşleştirdiği iddiası yok (KARAR-66 B → öneri/yönlendirme)', () => {
    expect(offenders(/akıllı eşleştirme|Eşleştirme Motoru|nasıl eşleştirir|eşleştirme platformu|eşleştirileceksin|eşleştirebilmemiz/i)).toEqual([]);
  });
});
