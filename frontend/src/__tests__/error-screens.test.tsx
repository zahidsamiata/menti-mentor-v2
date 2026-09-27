/**
 * V-12 (AJ-45) — hata ekranları: beyaz ekran yerine anlaşılır Türkçe ekran, ayrıntı gizli.
 *
 * `app/error.tsx`, `app/global-error.tsx`, `app/not-found.tsx` hiçbir testte ölçülmüyordu.
 * Bu test her üç ekran için:
 * - Türkçe başlık + yönlendirme (Tekrar dene → reset, Ana sayfaya dön → "/");
 * - hata mesajı / stack / digest kullanıcıya GÖSTERİLMEZ (yalnız konsola yazılır).
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ErrorScreen from '@/app/error';
import GlobalError from '@/app/global-error';
import NotFound from '@/app/not-found';

const SECRET_MESSAGE = 'Invalid prisma.user.findUnique() invocation at /srv/app/src/secret.ts:42';
const SECRET_DIGEST = 'digest-7f3a9c';

function makeError(): Error & { digest?: string } {
  const err = new Error(SECRET_MESSAGE) as Error & { digest?: string };
  err.stack = `Error: ${SECRET_MESSAGE}\n    at handler (/srv/app/src/secret.ts:42:7)`;
  err.digest = SECRET_DIGEST;
  return err;
}

function expectNoLeak() {
  const text = document.body.textContent ?? '';
  expect(text).not.toContain('prisma');
  expect(text).not.toContain('secret.ts');
  expect(text).not.toContain(SECRET_DIGEST);
}

describe('Hata ekranları (V-12)', () => {
  let consoleError: ReturnType<typeof vi.spyOn>;
  beforeEach(() => {
    consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
  });
  afterEach(() => {
    consoleError.mockRestore();
  });

  it('error.tsx: Türkçe mesaj + Tekrar dene reset çağırır, ayrıntı gösterilmez yalnız konsola yazılır', () => {
    const reset = vi.fn();
    const error = makeError();
    render(<ErrorScreen error={error} reset={reset} />);

    expect(screen.getByRole('heading', { name: 'Bir şeyler ters gitti' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Ana sayfaya dön/ })).toHaveAttribute('href', '/');
    fireEvent.click(screen.getByRole('button', { name: /Tekrar dene/ }));
    expect(reset).toHaveBeenCalledTimes(1);

    expectNoLeak();
    expect(consoleError).toHaveBeenCalledWith('[error-boundary]', error);
  });

  it('global-error.tsx: kök çöküşte de Türkçe mesaj + Tekrar dene, ayrıntı gösterilmez', () => {
    const reset = vi.fn();
    const error = makeError();
    render(<GlobalError error={error} reset={reset} />);

    expect(screen.getByRole('heading', { name: 'Bir şeyler ters gitti' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Ana sayfaya dön/ })).toHaveAttribute('href', '/');
    fireEvent.click(screen.getByRole('button', { name: /Tekrar dene/ }));
    expect(reset).toHaveBeenCalledTimes(1);

    expectNoLeak();
    expect(consoleError).toHaveBeenCalledWith('[global-error-boundary]', error);
  });

  it('not-found.tsx: "Sayfa bulunamadı" + ana sayfaya dönüş bağlantısı', () => {
    render(<NotFound />);
    expect(screen.getByRole('heading', { name: 'Sayfa bulunamadı' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Ana sayfaya dön/ })).toHaveAttribute('href', '/');
  });
});
