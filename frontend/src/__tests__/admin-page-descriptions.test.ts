/**
 * AJ-91 — kurum yönetici paneli sayfa açıklamaları sözlüğü (`lib/adminPageDescriptions.ts`).
 *
 * Güvenceler:
 *   1. Her panel sayfası (app/(admin)/admin/<klasör>/page.tsx) için sözlükte TAM bir anahtar var;
 *      sözlükte sayfası olmayan (artık) anahtar yok.
 *   2. Her sayfa başlığın (h1) hemen altındaki açıklamada YALNIZ sözlükteki metni gösterir —
 *      sayfaya elle yazılmış açıklama geri dönerse test kırılır.
 *   3. Her açıklama dolu, tek cümle ve teknik terim içermiyor.
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, it, expect } from 'vitest';
import { ADMIN_PAGE_DESCRIPTIONS, type AdminPageKey } from '@/lib/adminPageDescriptions';

const ADMIN_DIR = join(process.cwd(), 'src', 'app', '(admin)', 'admin');

/** Açıklama başlığı olan panel sayfaları (kök `admin/page.tsx` yalnız yönlendirir, başlığı yok). */
function panelPageFolders(): string[] {
  return readdirSync(ADMIN_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && existsSync(join(ADMIN_DIR, entry.name, 'page.tsx')))
    .map((entry) => entry.name)
    .sort();
}

function escapeRegExp(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** Sayfada sözlüğe erişimin iki yazımı: `.anahtar` veya `['anah-tar']`. */
function accessorPattern(key: string): string {
  return /^[a-z]+$/i.test(key)
    ? `ADMIN_PAGE_DESCRIPTIONS\\.${key}`
    : `ADMIN_PAGE_DESCRIPTIONS\\['${escapeRegExp(key)}'\\]`;
}

const KEYS = Object.keys(ADMIN_PAGE_DESCRIPTIONS) as AdminPageKey[];

/** Kurum yöneticisinin bilmesi beklenmeyen teknik/İngilizce terimler (eski metinlerde geçiyordu). */
const TECHNICAL_TERMS = [/tenant/i, /aggregate/i, /\bPII\b/, /\bNPS\b/, /\bKPI\b/, /red-line/i, /optimize/i, /global/i, /sistem/i];

describe('AJ-91 · panel sayfası ↔ sözlük eşleşmesi', () => {
  it('her panel sayfasının sözlükte anahtarı var, artık anahtar yok', () => {
    expect(KEYS.slice().sort()).toEqual(panelPageFolders());
  });

  it.each(panelPageFolders())('%s sayfası başlık altında yalnız sözlükteki metni gösterir', (folder) => {
    const source = readFileSync(join(ADMIN_DIR, folder, 'page.tsx'), 'utf8');
    expect(source).toContain("import { ADMIN_PAGE_DESCRIPTIONS } from '@/lib/adminPageDescriptions';");
    const headingThenDescription = new RegExp(
      `</h1>\\s*<p className="[^"]*">\\{${accessorPattern(folder)}\\}</p>`,
    );
    expect(source).toMatch(headingThenDescription);
  });
});

describe('AJ-91 · açıklama metinleri', () => {
  it.each(KEYS)('%s: dolu, tek cümle, noktayla biter', (key) => {
    const text = ADMIN_PAGE_DESCRIPTIONS[key];
    expect(text.trim()).toBe(text);
    expect(text.length).toBeGreaterThan(20);
    expect(text.endsWith('.')).toBe(true);
    // Tek cümle: sondaki nokta dışında cümle sonu işareti yok.
    expect(text.slice(0, -1)).not.toMatch(/[.!?](\s|$)/);
  });

  it.each(KEYS)('%s: teknik terim içermez', (key) => {
    const text = ADMIN_PAGE_DESCRIPTIONS[key];
    for (const term of TECHNICAL_TERMS) expect(text).not.toMatch(term);
  });
});
