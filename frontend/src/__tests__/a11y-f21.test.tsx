/**
 * F-21 — erişilebilirlik: tek-seçim soru grupları (radiogroup + klavye), özel modal pencereler
 * (role=dialog, Esc, odak tuzağı, odak geri dönüşü) ve yalnız ikonlu düğmelerin erişilebilir adı.
 */
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { LikertScale } from '@/components/molecules/LikertScale';
import { ThreeQuestionsStep } from '@/app/onboarding/_steps/ThreeQuestionsStep';
import { DiscTestStep } from '@/app/onboarding/_steps/DiscTestStep';
import { ReportUserButton } from '@/components/organisms/ReportUserButton';
import MeetingFeedbackCard from '@/components/organisms/MeetingFeedbackCard';
import { CorrectionNoteDialog } from '@/components/molecules/CorrectionNoteDialog';

vi.mock('@/hooks/useApiClient', () => ({
  useApiClient: () => vi.fn(async () => ({ ok: true, data: { ok: true } })),
}));

// jsdom <dialog> API'sini (showModal/close) içermez.
HTMLDialogElement.prototype.showModal ??= function showModal() {};
HTMLDialogElement.prototype.close ??= function close() {};

describe('F-21 · radiogroup — tek seçim soru grupları', () => {
  it('LikertScale: radiogroup + 5 radio; gezici tabIndex; ok tuşu odağı taşır ama cevap göndermez', () => {
    const onChange = vi.fn();
    render(<LikertScale value={null} onChange={onChange} />);

    const group = screen.getByRole('radiogroup', { name: 'Katılım düzeyi seçin' });
    const radios = within(group).getAllByRole('radio');
    expect(radios).toHaveLength(5);
    radios.forEach((r) => expect(r).toHaveAttribute('aria-checked', 'false'));
    // Hiçbiri seçili değilken yalnız ilki Tab sırasında.
    expect(radios.map((r) => r.tabIndex)).toEqual([0, -1, -1, -1, -1]);

    radios[0]!.focus();
    fireEvent.keyDown(radios[0]!, { key: 'ArrowRight' });
    expect(radios[1]).toHaveFocus();
    fireEvent.keyDown(radios[1]!, { key: 'End' });
    expect(radios[4]).toHaveFocus();
    fireEvent.keyDown(radios[4]!, { key: 'ArrowRight' }); // sondan başa sarar
    expect(radios[0]).toHaveFocus();
    // Seçim hemen ilerlettiği için ok tuşu seçim yapmaz.
    expect(onChange).not.toHaveBeenCalled();

    fireEvent.click(radios[2]!); // Boşluk/Enter native düğmede click üretir
    expect(onChange).toHaveBeenCalledWith(3);
  });

  it('LikertScale: seçili değer aria-checked=true ve Tab sırasındaki tek öğe', () => {
    render(<LikertScale value={4} onChange={() => {}} />);
    const radios = screen.getAllByRole('radio');
    expect(radios[3]).toHaveAttribute('aria-checked', 'true');
    expect(radios.map((r) => r.tabIndex)).toEqual([-1, -1, -1, 0, -1]);
  });

  it('ThreeQuestionsStep: S2/S3 radiogroup, soru başlığıyla adlandırılır; ok tuşu seçer', () => {
    render(<ThreeQuestionsStep role="MENTI" onComplete={vi.fn()} isSubmitting={false} error={null} />);

    const groups = screen.getAllByRole('radiogroup');
    expect(groups).toHaveLength(2);
    groups.forEach((g) => expect(g).toHaveAccessibleName());

    const s2Radios = within(groups[0]!).getAllByRole('radio');
    s2Radios[0]!.focus();
    fireEvent.keyDown(s2Radios[0]!, { key: 'ArrowDown' });
    expect(s2Radios[1]).toHaveFocus();
    expect(s2Radios[1]).toHaveAttribute('aria-checked', 'true');
    expect(s2Radios[0]).toHaveAttribute('aria-checked', 'false');

    fireEvent.keyDown(s2Radios[1]!, { key: 'ArrowUp' });
    expect(s2Radios[0]).toHaveAttribute('aria-checked', 'true');
    fireEvent.keyDown(s2Radios[0]!, { key: 'Home' });
    expect(s2Radios[0]).toHaveFocus();
  });

  it('DiscTestStep: şıklar radio; ok tuşu yalnız odağı taşır, cevap tıklama/Enter ile verilir', () => {
    const onComplete = vi.fn();
    render(
      <DiscTestStep
        questions={[{ id: 1, text: 'Yeni bir ekibe katıldığında ilk ne yaparsın?', options: { A: 'Liderlik', B: 'Sohbet', C: 'Gözlem', D: 'Plan' } }]}
        onComplete={onComplete}
        isSubmitting={false}
        error={null}
      />,
    );

    const group = screen.getByRole('radiogroup', { name: 'Yeni bir ekibe katıldığında ilk ne yaparsın?' });
    const radios = within(group).getAllByRole('radio');
    expect(radios).toHaveLength(4);

    radios[0]!.focus();
    fireEvent.keyDown(radios[0]!, { key: 'ArrowDown' });
    expect(radios[1]).toHaveFocus();
    radios.forEach((r) => expect(r).toHaveAttribute('aria-checked', 'false'));

    fireEvent.click(radios[1]!);
    expect(radios[1]).toHaveAttribute('aria-checked', 'true');
  });

  it('CorrectionNoteDialog: diyalog başlıkla adlandırılır, şablonlar radiogroup', () => {
    render(<CorrectionNoteDialog open userName="Deneme" onConfirm={vi.fn()} onCancel={vi.fn()} />);
    const dialog = screen.getByRole('dialog', { hidden: true });
    // jsdom'da <dialog open> özniteliği showModal ile konmadığı için öğe "gizli" sayılır ve ad
    // hesaplanmaz; bağı doğrudan doğrula: aria-labelledby → başlık.
    const titleId = dialog.getAttribute('aria-labelledby');
    expect(titleId).toBeTruthy();
    expect(document.getElementById(titleId!)).toHaveTextContent('Düzeltme Talebi');
    const group = within(dialog).getByRole('radiogroup', { hidden: true });
    expect(document.getElementById(group.getAttribute('aria-labelledby')!)).toHaveTextContent('Hazır Şablonlar');
    const radios = within(group).getAllByRole('radio', { hidden: true });
    radios[0]!.focus();
    fireEvent.keyDown(radios[0]!, { key: 'ArrowDown' });
    expect(radios[1]).toHaveAttribute('aria-checked', 'true');
  });
});

describe('F-21 · özel modal — role=dialog, Esc, odak', () => {
  it('ReportUserButton: açılınca dialog + odak içeride; Esc kapatır ve odak tetikleyiciye döner', () => {
    render(<ReportUserButton targetUserId="u1" targetName="Test Kişi" />);
    const trigger = screen.getByRole('button', { name: 'Şikayet et' });
    trigger.focus();
    fireEvent.click(trigger);

    const dialog = screen.getByRole('dialog', { name: 'Şikayet: Test Kişi' });
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog.contains(document.activeElement)).toBe(true);
    expect(within(dialog).getByRole('radiogroup', { name: 'Şikayet nedeni' })).toBeInTheDocument();

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it('ReportUserButton: Tab son öğeden ilk öğeye, Shift+Tab ilkten sona döner (odak dışarı kaçmaz)', () => {
    render(<ReportUserButton targetUserId="u1" targetName="Test Kişi" />);
    fireEvent.click(screen.getByRole('button', { name: 'Şikayet et' }));
    const dialog = screen.getByRole('dialog');

    const last = within(dialog).getByRole('button', { name: 'Şikayet Et' });
    last.focus();
    fireEvent.keyDown(document, { key: 'Tab' });
    expect(dialog.contains(document.activeElement)).toBe(true);
    expect(document.activeElement).not.toBe(last);

    const first = document.activeElement as HTMLElement;
    fireEvent.keyDown(document, { key: 'Tab', shiftKey: true });
    expect(document.activeElement).toBe(last);
    expect(first).not.toBe(last);
  });
});

describe('F-21 · yalnız ikonlu düğmeler — erişilebilir ad', () => {
  it('MeetingFeedbackCard: kapatma (X) düğmesinin adı "Kapat"; hiçbir düğme adsız değil', () => {
    render(<MeetingFeedbackCard mentorName="Mentör" onSubmit={vi.fn()} onDismiss={vi.fn()} />);
    expect(screen.getByRole('button', { name: 'Kapat' })).toBeInTheDocument();
    screen.getAllByRole('button').forEach((b) => expect(b).toHaveAccessibleName());
  });
});
