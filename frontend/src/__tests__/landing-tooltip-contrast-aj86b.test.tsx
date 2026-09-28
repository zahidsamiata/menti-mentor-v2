/**
 * AJ-86b — landing bilgi (ⓘ) balonu + gri metin kontrastı.
 *
 * - Balon ikondan balona geçerken kapanmıyor (hover köprüsü + kısa kapanış gecikmesi).
 * - Kaynak linkine klavyeyle geçince balon açık kalıyor (eski `onBlur` balonu kaldırıyordu).
 * - Ekrana sığmayan balon yukarı açılıyor / kenara hizalanıyor (saf `computeTooltipPlacement`).
 * - İkon yanındaki metnin rengini alıyor (koyu zeminde soluk `text-muted-foreground` değil).
 * - Landing kaynaklarında koyu zeminde AA altı kalan `text-slate-500/600` yok.
 */
import { describe, it, expect, vi, afterEach } from 'vitest';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { render, screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  InfoTooltip,
  computeTooltipPlacement,
  TOOLTIP_CLOSE_DELAY_MS,
} from '@/components/atoms/InfoTooltip';

const SOURCES = [
  { label: 'Kaynak A', url: 'https://example.org/a' },
  { label: 'Kaynak B', url: 'https://example.org/b' },
];

function renderTooltip() {
  return render(
    <p>
      Önceki metin
      <InfoTooltip label="Neden?" detail="Açıklama metni" sources={SOURCES} />
      <button type="button">Sonraki düğme</button>
    </p>,
  );
}

afterEach(() => {
  vi.useRealTimers();
});

describe('computeTooltipPlacement', () => {
  const base = { tooltipWidth: 288, tooltipHeight: 200, viewportWidth: 1280, viewportHeight: 800 };

  it('yer varsa altta ve ortalı açılır', () => {
    expect(
      computeTooltipPlacement({ ...base, trigger: { left: 600, right: 620, top: 100, bottom: 120 } }),
    ).toEqual({ vertical: 'bottom', align: 'center' });
  });

  it('altta yer yoksa yukarı açılır', () => {
    expect(
      computeTooltipPlacement({ ...base, trigger: { left: 600, right: 620, top: 700, bottom: 720 } }).vertical,
    ).toBe('top');
  });

  it('ne altta ne üstte yer varsa altta kalır (sayfa kaydırılabilir)', () => {
    expect(
      computeTooltipPlacement({
        ...base,
        viewportHeight: 300,
        trigger: { left: 600, right: 620, top: 150, bottom: 170 },
      }).vertical,
    ).toBe('bottom');
  });

  it('sol kenara yakın ikon → balon sola hizalı (ekrandan taşmaz)', () => {
    expect(
      computeTooltipPlacement({ ...base, trigger: { left: 20, right: 40, top: 100, bottom: 120 } }).align,
    ).toBe('start');
  });

  it('sağ kenara yakın ikon → balon sağa hizalı', () => {
    expect(
      computeTooltipPlacement({ ...base, trigger: { left: 1240, right: 1260, top: 100, bottom: 120 } }).align,
    ).toBe('end');
  });
});

describe('InfoTooltip — erişilebilirlik ve etkileşim', () => {
  it('klavye odağıyla açılır; tetikleyici aria-describedby ile balona bağlı; Escape kapatır', async () => {
    const user = userEvent.setup();
    renderTooltip();
    await user.tab();
    const trigger = screen.getByRole('button', { name: 'Neden?' });
    expect(trigger).toHaveFocus();
    const tip = screen.getByRole('tooltip');
    expect(tip).toHaveTextContent('Açıklama metni');
    expect(trigger).toHaveAttribute('aria-describedby', tip.id);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    expect(trigger).not.toHaveAttribute('aria-describedby');
  });

  it('Tab ile kaynak linkine geçince balon açık kalır, link odaklanır', async () => {
    const user = userEvent.setup();
    renderTooltip();
    await user.tab(); // tetikleyici
    await user.tab(); // ilk kaynak linki
    const link = screen.getByRole('link', { name: 'Kaynak A' });
    expect(link).toHaveFocus();
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
  });

  it('odak balonun dışına çıkınca kapanır', async () => {
    const user = userEvent.setup();
    renderTooltip();
    await user.tab();
    await user.tab();
    await user.tab();
    await user.tab(); // Sonraki düğme
    expect(screen.getByRole('button', { name: 'Sonraki düğme' })).toHaveFocus();
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('fare ikondan çıkıp balona geçerken (gecikme içinde) kapanmaz — hover köprüsü', () => {
    vi.useFakeTimers();
    renderTooltip();
    const container = screen.getByRole('button', { name: 'Neden?' }).parentElement!;
    fireEvent.pointerEnter(container);
    expect(screen.getByRole('tooltip')).toBeInTheDocument();

    fireEvent.pointerLeave(container);
    // ikon → balon arası geçiş: hemen kapanmamalı
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
    act(() => { vi.advanceTimersByTime(TOOLTIP_CLOSE_DELAY_MS / 2); });
    fireEvent.pointerEnter(container);
    act(() => { vi.advanceTimersByTime(TOOLTIP_CLOSE_DELAY_MS * 2); });
    expect(screen.getByRole('tooltip')).toBeInTheDocument();

    fireEvent.pointerLeave(container);
    act(() => { vi.advanceTimersByTime(TOOLTIP_CLOSE_DELAY_MS + 10); });
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('balonla ikon arasındaki boşluk margin değil saydam dolgu (köprü)', () => {
    renderTooltip();
    fireEvent.click(screen.getByRole('button', { name: 'Neden?' }));
    const wrapper = screen.getByRole('tooltip').parentElement!;
    expect(wrapper.className).toMatch(/\b(pt|pb)-2\b/);
    expect(wrapper.className).not.toMatch(/\bmt-2\b/);
    expect(screen.getByRole('tooltip').className).not.toMatch(/\bmt-2\b/);
  });

  it('dokunmatik "enter" balonu açmaz; dokunma (tıklama) açar', () => {
    renderTooltip();
    const trigger = screen.getByRole('button', { name: 'Neden?' });
    fireEvent.pointerEnter(trigger.parentElement!, { pointerType: 'touch' });
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    fireEvent.click(trigger);
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
  });

  it('ikon yanındaki metnin rengini alır (soluk muted-foreground değil)', () => {
    renderTooltip();
    const trigger = screen.getByRole('button', { name: 'Neden?' });
    expect(trigger.className).toMatch(/\btext-current\b/);
    expect(trigger.className).not.toMatch(/text-muted-foreground/);
  });

  it('kaynak linki AA kontrastlı ton kullanır (açıkta 4.34:1 olan text-primary değil)', () => {
    renderTooltip();
    fireEvent.click(screen.getByRole('button', { name: 'Neden?' }));
    const link = screen.getByRole('link', { name: 'Kaynak A' });
    expect(link.className).not.toMatch(/\btext-primary\b/);
    expect(link.className).toMatch(/\btext-indigo-700\b/);
    expect(link.className).toMatch(/\bdark:text-indigo-300\b/);
  });
});

describe('Landing gri metin kontrastı (kaynak taraması)', () => {
  // slate-500 koyu landing zemininde 3.07–4.24:1, slate-600 1.93–2.66:1 (AA 4.5:1 altı);
  // slate-400 aynı zeminlerde ≥ 5.71:1.
  // AJ-86c: landing artık tema-duyarlı — gri metin `text-landing-*` token'ından gelir. Açık temada
  // koyu gri geçerlidir; bu yüzden `dark:` önekli sınıf taramaya girmez (tema eşi, iki temanın ölçümü
  // `landing-theme-aj86c.test.tsx`'te). Önek yoksa sınıf iki temada da geçerlidir → yasak.
  const LOW_CONTRAST_GRAY = /(?<!dark:)(?<![\w-])text-(?:slate|gray|zinc|neutral)-(?:500|600|700|800|900)(?![\w-])/g;
  const APP = join(__dirname, '..', 'app');
  const files = [
    ...readdirSync(join(APP, '_sections')).filter((n) => n.endsWith('.tsx')).map((n) => join(APP, '_sections', n)),
    join(APP, 'page.tsx'),
  ];

  it('tarama gerçekten landing dosyalarını görüyor', () => {
    expect(files.length).toBeGreaterThanOrEqual(8);
  });

  it('landing kaynaklarında koyu zeminde AA altı gri metin sınıfı yok', () => {
    const offenders = files.flatMap((f) => {
      const hits = readFileSync(f, 'utf8').match(LOW_CONTRAST_GRAY) ?? [];
      return hits.map((h) => `${f.split('/app/')[1]}: ${h}`);
    });
    expect(offenders).toEqual([]);
  });
});
