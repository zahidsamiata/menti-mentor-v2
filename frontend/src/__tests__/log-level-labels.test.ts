/**
 * IC-03 (kalan) — platform panelinde log seviyesi Türkçe; AUDIT kategorisi "Denetim".
 */
import { describe, it, expect } from 'vitest';
import { logLevelLabel, logBadgeLabel } from '@/lib/enumLabels';

describe('log seviyesi etiketleri', () => {
  it('seviyeleri Türkçeye çevirir', () => {
    expect(logLevelLabel('ERROR')).toBe('Hata');
    expect(logLevelLabel('WARN')).toBe('Uyarı');
    expect(logLevelLabel('INFO')).toBe('Bilgi');
  });

  it('AUDIT kategorisi seviyeden bağımsız "Denetim" gösterir', () => {
    expect(logBadgeLabel({ level: 'INFO', category: 'AUDIT' })).toBe('Denetim');
    expect(logBadgeLabel({ level: 'ERROR', category: 'SYSTEM' })).toBe('Hata');
  });

  it('negatif: bilinmeyen seviye ham değer, boş değer tire (çökmez)', () => {
    expect(logLevelLabel('DEBUG')).toBe('DEBUG');
    expect(logLevelLabel(null)).toBe('—');
  });
});
