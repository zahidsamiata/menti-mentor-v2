/**
 * IC-09 — yöneticinin kullanıcıya gönderdiği düzeltme şablonlarının tonu.
 * Şablonlar e-postayla kullanıcıya gider; yargılayan/emir kipindeki kalıplar geri gelmemeli.
 */

import { describe, it, expect } from 'vitest';
import { CORRECTION_NOTE_PRESETS } from '@/types/admin';

// Suçlayıcı / yargılayıcı / sert emir kalıpları (küçük harfe çevrilmiş metinde aranır).
const ACCUSATORY_PATTERNS = [
  'yetersiz',
  'çok genel',
  'belirtiniz',
  'yükleyiniz',
  'tanıtınız',
  'hatalı',
  'eksik',
  'yanlış',
  'geçersiz',
];

describe('CORRECTION_NOTE_PRESETS (IC-09 ton kuralı)', () => {
  it('şablon seti korunur: 5 benzersiz şablon', () => {
    expect(CORRECTION_NOTE_PRESETS).toHaveLength(5);
    expect(new Set(CORRECTION_NOTE_PRESETS).size).toBe(5);
  });

  it('her şablon backend sınırına uyar (10-500 karakter)', () => {
    for (const preset of CORRECTION_NOTE_PRESETS) {
      expect(preset.length).toBeGreaterThanOrEqual(10);
      expect(preset.length).toBeLessThanOrEqual(500);
    }
  });

  it('hiçbir şablonda suçlayıcı/emir kalıbı yok', () => {
    for (const preset of CORRECTION_NOTE_PRESETS) {
      const lower = preset.toLocaleLowerCase('tr-TR');
      for (const pattern of ACCUSATORY_PATTERNS) {
        expect(lower, `"${preset}" içinde "${pattern}"`).not.toContain(pattern);
      }
    }
  });

  it('anlam korunur: her şablon kendi düzeltme konusunu aynı sırada anar', () => {
    const topics = ['mezuniyet yılı', 'kurum bilgi', 'uzmanlık etiket', 'fotoğraf', 'biyografi'];
    topics.forEach((topic, i) => {
      expect(CORRECTION_NOTE_PRESETS[i].toLocaleLowerCase('tr-TR')).toContain(topic);
    });
  });
});
