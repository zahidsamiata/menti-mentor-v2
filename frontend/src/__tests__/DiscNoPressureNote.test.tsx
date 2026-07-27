import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DiscNoPressureNote } from '@/components/molecules/DiscNoPressureNote';

describe('DiscNoPressureNote — DISC baskısızlık mesajı', () => {
  it('doğru-yanlış olmadığını ve kalıba sokmadığını belirten mesajı gösterir', () => {
    render(<DiscNoPressureNote />);
    expect(screen.getByText(/doğru-yanlış yok/i)).toBeInTheDocument();
    expect(screen.getByText(/kalıba sokmak için değil/i)).toBeInTheDocument();
    expect(screen.getByText(/en uygun\s+eşleşmeyi/i)).toBeInTheDocument();
  });
});
