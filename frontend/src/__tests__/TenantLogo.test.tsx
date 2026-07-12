import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TenantLogo } from '@/components/atoms/TenantLogo';

vi.mock('next/image', () => ({
  default: ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} />,
}));

describe('TenantLogo — null-safety regression', () => {
  it('displayName null iken çökmez ve ? fallback gösterir', () => {
    expect(() =>
      render(<TenantLogo tenant={{ displayName: null, logoUrl: null }} />)
    ).not.toThrow();
    expect(screen.getByText('?')).toBeInTheDocument();
  });

  it('displayName boş string iken ? fallback gösterir', () => {
    render(<TenantLogo tenant={{ displayName: '', logoUrl: null }} />);
    expect(screen.getByText('?')).toBeInTheDocument();
  });

  it('displayName ile ilk harfleri doğru türetir', () => {
    render(<TenantLogo tenant={{ displayName: 'Uluslararası Dernek', logoUrl: null }} />);
    expect(screen.getByText('UD')).toBeInTheDocument();
  });

  it('logoUrl varken <img> render eder, displayName null olsa bile çökmez', () => {
    expect(() =>
      render(<TenantLogo tenant={{ displayName: null, logoUrl: 'https://example.com/logo.png' }} />)
    ).not.toThrow();
    expect(screen.getByRole('img')).toBeInTheDocument();
  });
});
