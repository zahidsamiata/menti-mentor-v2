/**
 * AN-30 / KARAR-34 — GranularConsentForm birim testleri.
 *
 * Zorunlu 4 madde hepsi işaretlenmeden "devam" (kayıt formunun asıl CTA'sı) aktif olmamalı;
 * bu bileşen kendi başına buton içermez (kontrollü/controlled bileşen — bkz. dosya başı yorumu),
 * bu yüzden "devam aktif mi" `isGranularConsentValid` saf fonksiyonuyla ölçülür ve küçük bir
 * sarmalayıcı (wrapper) üzerinden gerçek bir "Devam" butonuyla doğrulanır — gerçek kayıt
 * formundaki (`_RegisterContent.tsx`) CTA disable mantığıyla birebir aynı kural.
 */
import { useState } from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import {
  GranularConsentForm,
  EMPTY_GRANULAR_CONSENT,
  isGranularConsentValid,
  type GranularConsentValue,
} from '@/components/organisms/GranularConsentForm';

function Wrapper() {
  const [value, setValue] = useState<GranularConsentValue>(EMPTY_GRANULAR_CONSENT);
  return (
    <div>
      <GranularConsentForm value={value} onChange={setValue} />
      <button disabled={!isGranularConsentValid(value)}>Devam</button>
    </div>
  );
}

describe('GranularConsentForm (AN-30)', () => {
  it('render edilir: 4 zorunlu + 2 isteğe bağlı, toplam 6 checkbox', () => {
    render(<Wrapper />);
    expect(screen.getAllByRole('checkbox')).toHaveLength(6);
    expect(screen.getByText(/DISC eşleştirme/i)).toBeInTheDocument();
    expect(screen.getByText(/Kurumlar arası paylaşım/i)).toBeInTheDocument();
  });

  it('her madde metninde YER TUTUCU etiketi görünür', () => {
    render(<Wrapper />);
    expect(screen.getAllByText('[YER TUTUCU — avukat onayı bekliyor]')).toHaveLength(6);
  });

  it('zorunlu kutular işaretlenmeden "Devam" disabled kalır', () => {
    render(<Wrapper />);
    expect(screen.getByRole('button', { name: 'Devam' })).toBeDisabled();
  });

  it('yalnız isteğe bağlılar işaretlenirse "Devam" hâlâ disabled (zorunlular etkilenmez)', () => {
    render(<Wrapper />);
    fireEvent.click(screen.getByLabelText(/Kurumlar arası paylaşım/i));
    fireEvent.click(screen.getByLabelText(/OCEAN kişilik profili/i));
    expect(screen.getByRole('button', { name: 'Devam' })).toBeDisabled();
  });

  it('4 zorunlu kutunun HEPSİ işaretlenince "Devam" enabled olur', () => {
    render(<Wrapper />);
    fireEvent.click(screen.getByLabelText(/DISC eşleştirme/i));
    fireEvent.click(screen.getByLabelText(/Yurt dışında saklama/i));
    fireEvent.click(screen.getByLabelText(/Veri işleme/i));
    fireEvent.click(screen.getByLabelText(/Anonim iyileştirme/i));
    expect(screen.getByRole('button', { name: 'Devam' })).toBeEnabled();
  });

  it('isGranularConsentValid: yalnız 4 zorunlu alana bakar, isteğe bağlılar sonucu etkilemez', () => {
    const allMandatory: GranularConsentValue = {
      discMatching: true,
      foreignStorage: true,
      dataProcessing: true,
      anonymizedImprovement: true,
      crossTenantSharing: false,
      oceanProfiling: false,
    };
    expect(isGranularConsentValid(allMandatory)).toBe(true);
    expect(isGranularConsentValid({ ...allMandatory, discMatching: false })).toBe(false);
  });
});
