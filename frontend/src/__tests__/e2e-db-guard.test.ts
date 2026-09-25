/**
 * KR-15 — e2e veritabanı kilidi fail-closed: yalnız açıkça verilmiş YEREL adres.
 */
import { describe, it, expect } from 'vitest';
import { assertLocalE2eDatabase } from '../../e2e/dbGuard';

describe('KR-15: assertLocalE2eDatabase', () => {
  it('yerel test veritabanı kabul edilir (CI job adresi)', () => {
    expect(assertLocalE2eDatabase('postgresql://postgres:postgres@localhost:5432/menti_mentor_test')).toBe('localhost');
    expect(assertLocalE2eDatabase('postgresql://u:p@127.0.0.1:5432/db')).toBe('127.0.0.1');
  });

  it('negatif: adres boşsa artık yalnız uyarı değil, durur', () => {
    expect(() => assertLocalE2eDatabase(undefined)).toThrow(/GÜVENLİK KİLİDİ/);
    expect(() => assertLocalE2eDatabase('  ')).toThrow(/tanımlı değil/);
  });

  it('negatif: canlı ya da uzak veritabanı durdurulur', () => {
    for (const url of [
      'postgresql://u:p@ep-example.eu-west-2.aws.neon.tech/neondb?sslmode=require',
      'postgresql://u:p@postgres:5432/menti',
      'postgresql://u:p@10.0.0.5:5432/menti',
      'postgresql://u:p@localhost:5432/db?host=ep-example.neon.tech',
    ]) {
      expect(() => assertLocalE2eDatabase(url), url).toThrow(/GÜVENLİK KİLİDİ/);
    }
  });

  it('negatif: çözümlenemeyen adres durdurulur', () => {
    expect(() => assertLocalE2eDatabase('bozuk-adres')).toThrow(/çözümlenemedi/);
  });
});
