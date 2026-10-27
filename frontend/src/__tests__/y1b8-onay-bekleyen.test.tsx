/**
 * Y1-B8 (KARAR-101 B genişletilmiş + EK) — onay bekleyen kişi giriş yapar ve kayıt sürecine gider;
 * mentörleri yalnız isimsiz alan özeti olarak görür; yöneticinin notu panelde görünür.
 */
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { getSmartRedirect, PENDING_APPROVAL_PATH } from '@/lib/postLoginRedirect';
import {
  MentorPendingApprovalPanel,
  MentorSectorPreview,
  PendingCorrectionNote,
} from '@/components/molecules/PendingApprovalNotice';

const base = { approvalStatus: 'PENDING', tenantId: 't1' } as const;

describe('Y1-B8 giriş sonrası yönlendirme', () => {
  it('onay bekleyen yeni kişi 8 soruya (onboarding) gider, bekleme sayfasına değil', () => {
    expect(getSmartRedirect({ ...base, role: 'MENTI', discType: null } as never)).toBe('/onboarding');
  });
  it('testi bitmiş onay bekleyen menti kendi paneline gider', () => {
    const target = getSmartRedirect({ ...base, role: 'MENTI', discType: 'D' } as never);
    expect(target).toBe('/menti');
    expect(target).not.toBe(PENDING_APPROVAL_PATH);
  });
  it('testi bitmiş onay bekleyen mentör kendi paneline gider', () => {
    expect(getSmartRedirect({ ...base, role: 'MENTOR', discType: 'I' } as never)).toBe('/mentor');
  });
});

describe('Y1-B8 isimsiz mentör özeti ve not', () => {
  it('alanları sayıyla gösterir', () => {
    render(<MentorSectorPreview sectors={[{ sector: 'yazılım', count: 4 }, { sector: 'pazarlama', count: 3 }]} />);
    expect(screen.getByText(/yazılım \(4\)/)).toBeInTheDocument();
    expect(screen.getByText(/pazarlama \(3\)/)).toBeInTheDocument();
  });
  it('alan yoksa hiçbir şey çizmez', () => {
    const { container } = render(<MentorSectorPreview sectors={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
  it('yöneticinin notu görünür; not yoksa kutu yok', () => {
    const { rerender, container } = render(<PendingCorrectionNote note="Fotoğraf ekleyin." />);
    expect(screen.getByText('Fotoğraf ekleyin.')).toBeInTheDocument();
    rerender(<PendingCorrectionNote note={null} />);
    expect(container).toBeEmptyDOMElement();
  });
  it('onay bekleyen mentör paneli bekleme açıklaması gösterir', () => {
    render(<MentorPendingApprovalPanel correctionNote={null} />);
    expect(screen.getByText('Yönetici onayı bekleniyor')).toBeInTheDocument();
  });
});
