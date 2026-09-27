/**
 * AN-10 (mentor/mentör ayağı) — panel ekranlarında Türkçe metin tek yazımla: "mentör".
 * Kapsam dışı (bilerek): marka adı "MentiMentor", sektör etiketi VERİSİ ("Eğitim & Mentorluk" — kayıtlı değer),
 * tanıtım sayfası (_sections) ve SEO başlıkları, kod tanımlayıcıları ('MENTOR', mentorId…).
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const FILES = [
  'src/app/(admin)/admin/invite/page.tsx',
  'src/app/(dashboard)/meetings/page.tsx',
  'src/app/(dashboard)/menti/agreement/[id]/page.tsx',
  'src/app/(dashboard)/menti/orientation-guide/page.tsx',
  'src/app/(dashboard)/menti/page.tsx',
  'src/app/(dashboard)/mentor/certification/page.tsx',
  'src/app/(dashboard)/mentor/page.tsx',
  'src/app/onboarding/stk/_steps/Step2Template.tsx',
  'src/components/organisms/LearningJourneyCard.tsx',
];

// Türkçe metin içinde (boşluk/tırnak/> sonrası) ek almış ya da yalın "mentor" — kod tanımlayıcısı değil.
const TURKISH_MENTOR_WORD = /(?<=[\s>'"(])[Mm]entor(lar|ları|u|un|una|unuz|unuzla|unuzun|a|dan|la|luk|lük)?(?=[\s.,!?:;'"<)—])/;

function textLines(file: string): string[] {
  return readFileSync(join(process.cwd(), file), 'utf8')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .split('\n')
    .filter((line) => !/^\s*(\/\/|\*|\/\*|\{\/\*)/.test(line.trim()) && !line.trim().startsWith('*'))
    .filter((line) => !/\b(mentor|mentors|mentorId|mentorName)\b\s*[:.=(]|=>|\(mentor\)|\bmentor\./.test(line));
}

describe('AN-10 · mentör yazımı (panel ekranları)', () => {
  for (const file of FILES) {
    it(`${file}: Türkçe metinde "mentor" yazımı kalmadı`, () => {
      const offenders = textLines(file).filter((line) => TURKISH_MENTOR_WORD.test(line));
      expect(offenders).toEqual([]);
    });
  }
});
