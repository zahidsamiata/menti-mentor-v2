/**
 * Y-11 (madde 60) — "Sayfanın başına dön" düğmesi.
 *
 * Doğrular: kaydırma yokken düğme görünmez; eşik aşılınca görünür; tıklayınca sayfa başına (top 0)
 * yumuşak kaydırılır; hareket-azaltma tercihinde anlık kaydırılır; klavyeyle (Enter) çalışır;
 * eşiğin altına dönünce yeniden gizlenir; bileşen kalkınca kaydırma dinleyicisi temizlenir.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ScrollToTopButton, SCROLL_TO_TOP_THRESHOLD_PX } from '@/components/atoms/ScrollToTopButton';

const LABEL = 'Sayfanın başına dön';

function scrollWindowTo(y: number) {
  act(() => {
    Object.defineProperty(window, 'scrollY', { value: y, configurable: true, writable: true });
    fireEvent.scroll(window);
  });
}

function mockReducedMotion(reduce: boolean) {
  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: reduce && query.includes('prefers-reduced-motion: reduce'),
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      onchange: null,
      dispatchEvent: vi.fn(),
    })),
  });
}

describe('ScrollToTopButton', () => {
  let scrollToSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    scrollToSpy = vi.fn();
    Object.defineProperty(window, 'scrollTo', { value: scrollToSpy, configurable: true, writable: true });
    Object.defineProperty(window, 'scrollY', { value: 0, configurable: true, writable: true });
    mockReducedMotion(false);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('kaydırma yokken düğme görünmez', () => {
    render(<ScrollToTopButton />);
    expect(screen.queryByRole('button', { name: LABEL })).toBeNull();
  });

  it('eşik aşılınca düğme görünür; eşiğin kendisinde görünmez', () => {
    render(<ScrollToTopButton />);
    scrollWindowTo(SCROLL_TO_TOP_THRESHOLD_PX);
    expect(screen.queryByRole('button', { name: LABEL })).toBeNull();
    scrollWindowTo(SCROLL_TO_TOP_THRESHOLD_PX + 1);
    expect(screen.getByRole('button', { name: LABEL })).toBeTruthy();
  });

  it('sayfa zaten aşağıdayken açılırsa düğme hemen görünür', () => {
    Object.defineProperty(window, 'scrollY', { value: 2000, configurable: true, writable: true });
    render(<ScrollToTopButton />);
    expect(screen.getByRole('button', { name: LABEL })).toBeTruthy();
  });

  it('tıklayınca sayfa başına yumuşak kaydırılır', async () => {
    render(<ScrollToTopButton />);
    scrollWindowTo(1500);
    await userEvent.click(screen.getByRole('button', { name: LABEL }));
    expect(scrollToSpy).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });

  it('hareket-azaltma tercihinde anlık kaydırılır (behavior auto)', async () => {
    mockReducedMotion(true);
    render(<ScrollToTopButton />);
    scrollWindowTo(1500);
    await userEvent.click(screen.getByRole('button', { name: LABEL }));
    expect(scrollToSpy).toHaveBeenCalledWith({ top: 0, behavior: 'auto' });
  });

  it('klavyeyle (Tab + Enter) çalışır', async () => {
    const user = userEvent.setup();
    render(<ScrollToTopButton />);
    scrollWindowTo(1500);
    await user.tab();
    const button = screen.getByRole('button', { name: LABEL });
    expect(document.activeElement).toBe(button);
    await user.keyboard('{Enter}');
    expect(scrollToSpy).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });

  it('eşiğin altına dönünce düğme yeniden gizlenir', () => {
    render(<ScrollToTopButton />);
    scrollWindowTo(1500);
    expect(screen.getByRole('button', { name: LABEL })).toBeTruthy();
    scrollWindowTo(100);
    expect(screen.queryByRole('button', { name: LABEL })).toBeNull();
  });

  it('kaydırma dinleyicisi pasif eklenir ve bileşen kalkınca temizlenir', () => {
    const addSpy = vi.spyOn(window, 'addEventListener');
    const removeSpy = vi.spyOn(window, 'removeEventListener');
    const { unmount } = render(<ScrollToTopButton />);
    const added = addSpy.mock.calls.find(([type]) => type === 'scroll');
    expect(added?.[2]).toEqual({ passive: true });
    unmount();
    expect(removeSpy).toHaveBeenCalledWith('scroll', added?.[1]);
  });
});
