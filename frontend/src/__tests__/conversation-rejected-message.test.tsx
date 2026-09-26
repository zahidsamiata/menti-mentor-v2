/** U-18 inceleme bulguları: reddedilen mentöre tekrar yazan menti nazik metin görür; ret hatası pencere içinde. */
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ConfirmDialog } from '@/components/molecules/ConfirmDialog';
import { conversationStartErrorMessage } from '@/lib/conversationRejected';

describe('U-18 — reddedilmiş konuşma mesajları', () => {
  it('CONVERSATION_REJECTED ham backend metni yerine nazik metne çevrilir', () => {
    const text = conversationStartErrorMessage({ error: 'CONVERSATION_REJECTED', message: 'Bu konuşma reddedildi.' });
    expect(text).toMatch(/Bu eşleşme gerçekleşmedi/);
    expect(text).toMatch(/profilinle ilgili değil/);
    expect(text).not.toBe('Bu konuşma reddedildi.');
  });

  it('diğer hatalarda backend mesajı, yoksa genel metin', () => {
    expect(conversationStartErrorMessage({ error: 'X', message: 'Başka hata' })).toBe('Başka hata');
    expect(conversationStartErrorMessage({ error: 'X' })).toBe('Mesaj gönderilemedi.');
  });

  it('ConfirmDialog hatayı pencerenin içinde gösterir', () => {
    HTMLDialogElement.prototype.showModal ??= vi.fn();
    HTMLDialogElement.prototype.close ??= vi.fn();
    render(
      <ConfirmDialog open title="Emin misin?" description="Açıklama" error="Reddedilemedi." onConfirm={vi.fn()} onCancel={vi.fn()} />,
    );
    const alert = screen.getByRole('alert', { hidden: true });
    expect(alert).toHaveTextContent('Reddedilemedi.');
    expect(alert.closest('dialog')).not.toBeNull();
  });
});
