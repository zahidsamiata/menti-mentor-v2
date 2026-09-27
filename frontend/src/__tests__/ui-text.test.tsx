/**
 * F-28 — ortak arayüz metinleri sözlüğü (`lib/uiText.ts`).
 *
 * İki güvence:
 *   1. Sözlük değerleri ekranda görülen Türkçe metinlerle HARFİ HARFİNE aynı (anlık görüntü değil,
 *      açık eşitlik) — bir değerin sessizce değişmesi burada yakalanır.
 *   2. Sözlüğe bağlanan bileşenler aynı metni göstermeye devam eder (bağlama ekranda hiçbir harfi
 *      değiştirmemeli).
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { UI_TEXT } from '@/lib/uiText';
import { ConfirmDialog } from '@/components/molecules/ConfirmDialog';
import { CorrectionNoteDialog } from '@/components/molecules/CorrectionNoteDialog';
import { RejectReasonDialog } from '@/components/molecules/RejectReasonDialog';

// jsdom <dialog> API'sini (showModal/close) içermez; bileşenler mount'ta çağırır.
HTMLDialogElement.prototype.showModal ??= function showModal() {};
HTMLDialogElement.prototype.close ??= function close() {};

describe('UI_TEXT sözlüğü — beklenen Türkçe metinler', () => {
  it('eylem etiketleri ekrandaki metinlerle birebir aynı', () => {
    expect(UI_TEXT.actions.save).toBe('Kaydet');
    expect(UI_TEXT.actions.cancel).toBe('Vazgeç');
    expect(UI_TEXT.actions.confirm).toBe('Onayla');
    expect(UI_TEXT.actions.close).toBe('Kapat');
    expect(UI_TEXT.actions.send).toBe('Gönder');
    expect(UI_TEXT.actions.delete).toBe('Sil');
    expect(UI_TEXT.actions.retry).toBe('Tekrar dene');
  });

  it('durum metinleri tek karakter üç nokta (…) ile biter', () => {
    expect(UI_TEXT.status.loading).toBe('Yükleniyor…');
    expect(UI_TEXT.status.saving).toBe('Kaydediliyor…');
    expect(UI_TEXT.status.sending).toBe('Gönderiliyor…');
    for (const value of Object.values(UI_TEXT.status)) {
      expect(value.endsWith('…')).toBe(true);
      expect(value).not.toContain('...');
    }
  });

  it('filtre metinleri', () => {
    expect(UI_TEXT.filters.all).toBe('Tümü');
  });
});

describe('Sözlüğe bağlanan bileşenler metni değiştirmedi', () => {
  it('ConfirmDialog varsayılan düğmeleri "Onayla" ve "Vazgeç"', () => {
    render(
      <ConfirmDialog open title="Başlık" description="Açıklama" onConfirm={vi.fn()} onCancel={vi.fn()} />,
    );
    expect(screen.getByText('Onayla')).toBeInTheDocument();
    expect(screen.getByText('Vazgeç')).toBeInTheDocument();
  });

  it('ConfirmDialog verilen etiketleri sözlüğe ezdirmez', () => {
    render(
      <ConfirmDialog
        open title="Başlık" description="Açıklama"
        confirmLabel="Sil" cancelLabel="Kapat"
        onConfirm={vi.fn()} onCancel={vi.fn()}
      />,
    );
    expect(screen.getByText('Sil')).toBeInTheDocument();
    expect(screen.getByText('Kapat')).toBeInTheDocument();
    expect(screen.queryByText('Onayla')).not.toBeInTheDocument();
  });

  it('RejectReasonDialog vazgeç düğmesi "Vazgeç"', () => {
    render(<RejectReasonDialog open userName="Kullanıcı" onConfirm={vi.fn()} onCancel={vi.fn()} />);
    expect(screen.getByText('Vazgeç')).toBeInTheDocument();
  });

  it('CorrectionNoteDialog gönderim sürerken "Gönderiliyor…" ve "Vazgeç" gösterir', () => {
    render(
      <CorrectionNoteDialog open isLoading userName="Kullanıcı" onConfirm={vi.fn()} onCancel={vi.fn()} />,
    );
    expect(screen.getByText('Gönderiliyor…')).toBeInTheDocument();
    expect(screen.getByText('Vazgeç')).toBeInTheDocument();
  });
});

/**
 * AJ-41 (F-28 kalıntısı) — "Vazgeç" düğme metni kaynakta satır içi yazılmaz; `UI_TEXT.actions.cancel`
 * kullanılır. Sözlük dosyası ve testler hariç tüm `src/` taranır; yorum satırları sayılmaz.
 */
const SRC_ROOT = join(process.cwd(), 'src');
const DICTIONARY_FILE = join(SRC_ROOT, 'lib', 'uiText.ts');

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

describe('AJ-41 · satır içi "Vazgeç" kalıntısı yok', () => {
  it('src/ altında sözlük dışında "Vazgeç" metni geçmiyor', () => {
    const offenders: string[] = [];
    for (const file of sourceFiles(SRC_ROOT)) {
      if (file === DICTIONARY_FILE) continue;
      readFileSync(file, 'utf8').split('\n').forEach((line, i) => {
        if (!isCommentLine(line) && line.includes('Vazgeç')) offenders.push(`${relative(SRC_ROOT, file)}:${i + 1}`);
      });
    }
    expect(offenders).toEqual([]);
  });
});
