/**
 * K-10 — koyu modda okunmayan alanlar.
 *
 * Sorun: sabit açık zemin (`bg-*-50` / `bg-*-100`) veya sabit koyu metin (`text-*-600..800`)
 * koyu temada karşılıksız kalınca metin okunmuyordu (ör. DISC şıkkı: açık renk `text-foreground`
 * metin + `bg-violet-50` zemin). Bu testler:
 *  - render edilen bileşenlerde tema dışı sabit rengin koyu mod karşılığı olmadan kalmadığını,
 *  - dokunulan sayfaların kaynağında her renkli sınıf dizgesinin `dark:` eşi taşıdığını
 * doğrular.
 */
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { DiscTestStep } from '@/app/onboarding/_steps/DiscTestStep';
import { DiscBadge } from '@/components/atoms/DiscBadge';
import { DISC_DIMENSION_COLORS } from '@/types/discTest';

// Koyu temada karşılıksız kalırsa okunmayı bozan sabit açık zemin / koyu metin sınıfları.
const LIGHT_ONLY = /(?:^|\s)(?:hover:|data-\[selected=true\]:)?(bg-[a-z]+-(?:50|100)|text-[a-z]+-(?:600|700|800))(?=\s|$)/g;

/** Bir sınıf dizgesindeki her sabit açık-tema rengi için aynı renk ailesinde `dark:` eşi var mı? */
function unpairedLightClasses(classString: string): string[] {
  const missing: string[] = [];
  for (const m of classString.matchAll(LIGHT_ONLY)) {
    const cls = m[1];
    const [kind, color] = cls.split('-');
    const pairRe = new RegExp(`dark:(?:[a-z-]+\\[[^\\]]+\\]:|hover:)?${kind}-${color}-`);
    if (!pairRe.test(classString)) missing.push(cls);
  }
  return missing;
}

describe('K-10 · DiscTestStep şıkları koyu modda okunur', () => {
  const question = { id: 1, text: 'Senaryo', options: { A: 'Şık A', B: 'Şık B', C: 'Şık C', D: 'Şık D' } };

  it('seçili şık koyu modda sabit açık zemin yerine yarı saydam ton taşır', () => {
    render(<DiscTestStep questions={[question]} onComplete={vi.fn()} isSubmitting={false} error={null} />);
    const optionA = screen.getByText('Şık A').closest('button')!;
    fireEvent.click(optionA);

    expect(optionA.getAttribute('data-selected')).toBe('true');
    expect(optionA.className).toContain('dark:data-[selected=true]:bg-violet-500/15');
    expect(optionA.className).toContain('dark:hover:bg-violet-500/15');
  });

  it('hiçbir şık/harf rozetinde koyu mod karşılığı olmayan sabit açık renk yok', () => {
    const { container } = render(
      <DiscTestStep questions={[question]} onComplete={vi.fn()} isSubmitting={false} error={null} />,
    );
    const offenders = Array.from(container.querySelectorAll<HTMLElement>('[class]'))
      .flatMap((el) => unpairedLightClasses(el.getAttribute('class') ?? ''));
    expect(offenders).toEqual([]);
  });
});

describe('K-10 · DISC renkleri', () => {
  it('DiscBadge sarı (I) harfi açıkta 600, koyuda 400 tonu kullanır; düşük kontrastlı 500 tonu yok', () => {
    render(<DiscBadge discLetters="Is" />);
    const el = screen.getByText('Is');
    expect(el.className).toContain('text-yellow-600');
    expect(el.className).toContain('dark:text-yellow-400');
    expect(el.className).not.toMatch(/(?:^|\s)text-yellow-500(?:\s|$)/);
  });

  it('DISC boyut rozetlerinin hepsi koyu mod eşi taşır; GENERAL sabit gri yerine tema token\'ı', () => {
    for (const cls of Object.values(DISC_DIMENSION_COLORS)) {
      expect(unpairedLightClasses(cls)).toEqual([]);
    }
    expect(DISC_DIMENSION_COLORS.GENERAL).not.toContain('bg-gray-100');
    expect(DISC_DIMENSION_COLORS.GENERAL).not.toContain('text-gray-700');
    expect(DISC_DIMENSION_COLORS.GENERAL).toBe('bg-muted text-muted-foreground');
  });
});

// Sayfa bileşenleri çok sayıda sağlayıcı/API'ye bağlı; renk sınıfları sabit dizge olduğu için
// kaynaktaki her sınıf dizgesi denetlenir (negatif: koyu mod eşi olmayan sabit açık renk kalmamalı).
describe('K-10 · dokunulan sayfalarda koyu mod eşi olmayan sabit renk kalmadı', () => {
  const SRC = join(__dirname, '..');
  const files = [
    'app/(dashboard)/mentor/certification/page.tsx',
    'app/(dashboard)/meetings/page.tsx',
    'app/onboarding/stk/_steps/Step4Account.tsx',
    'app/onboarding/stk/pending-review/page.tsx',
    'app/(dashboard)/profile/page.tsx',
    'app/(dashboard)/mentor/page.tsx',
    'app/(admin)/admin/questions/page.tsx',
    'components/atoms/DiscBadge.tsx',
    'app/onboarding/_steps/DiscTestStep.tsx',
    'types/discTest.ts',
  ];

  it.each(files)('%s', (rel) => {
    const source = readFileSync(join(SRC, rel), 'utf8');
    const strings = source.match(/(["'`])(?:(?!\1)[^\\\n]|\\.)*\1/g) ?? [];
    const offenders = strings.flatMap((s) => unpairedLightClasses(s.slice(1, -1)).map((c) => `${c} ← ${s}`));
    expect(offenders).toEqual([]);
  });

  it('DISC harf renklerinde düşük kontrastlı 500 tonu kalmadı', () => {
    for (const rel of ['components/atoms/DiscBadge.tsx', 'app/(dashboard)/profile/page.tsx',
      'app/(dashboard)/mentor/page.tsx', 'app/(admin)/admin/questions/page.tsx']) {
      const source = readFileSync(join(SRC, rel), 'utf8');
      expect(source).not.toMatch(/'text-(?:red|yellow|green|blue)-500'/);
    }
  });
});
