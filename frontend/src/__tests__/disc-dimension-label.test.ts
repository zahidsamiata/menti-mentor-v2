import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { discDimensionLabel } from '@/types/discTest';

describe('IC-01 — DISC boyut etiketleri tek kaynaktan Türkçe', () => {
  it('harfi Türkçe boyut adıyla birlikte gösterir', () => {
    expect(discDimensionLabel('D')).toBe('D — Kararlılık');
    expect(discDimensionLabel('I')).toBe('I — Etki');
    expect(discDimensionLabel('S')).toBe('S — Denge');
    expect(discDimensionLabel('C')).toBe('C — Titizlik');
  });

  it('bilinmeyen değeri olduğu gibi döndürür', () => {
    expect(discDimensionLabel('X')).toBe('X');
  });

  it('kullanıcıya görünen ekranlarda İngilizce DISC adı kalmadı', () => {
    const files = [
      'src/app/(dashboard)/mentor/page.tsx',
      'src/app/(admin)/admin/questions/page.tsx',
      'src/app/onboarding/_steps/ResultStep.tsx',
      'src/components/organisms/DiscRecallCard.tsx',
    ];
    for (const file of files) {
      const source = readFileSync(join(process.cwd(), file), 'utf8');
      expect(source, file).not.toMatch(/Dominant|Influential|Steady|Conscientious/);
    }
  });
});
