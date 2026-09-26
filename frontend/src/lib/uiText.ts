/**
 * Ortak arayüz metinleri sözlüğü — ekranlarda defalarca tekrar eden kısa metinler tek yerde (F-28 / G6-05).
 *
 * NEDEN VAR: "Kaydet", "Vazgeç", "Yükleniyor…" gibi metinler onlarca bileşende elle yazılıyordu;
 * bir yazım değişikliği (ör. üç nokta "..." → "…") her dosyada ayrı ayrı yapılmak zorundaydı ve
 * aynı düğme farklı ekranlarda farklı yazılabiliyordu. Bu sözlük tek kaynaktır.
 *
 * KAPSAM: yalnız BAĞLAMDAN BAĞIMSIZ, genel metinler (düğme, durum, filtre). Akışa özgü mesajlar
 * kendi modüllerinde kalır — buraya taşınmaz:
 *   - Kayıt akışı: `registerMessages.ts` · Giriş akışı: `loginMessages.ts`
 *   - "Üç soru" adımı: `threeQuestionsText.ts` · Enum → Türkçe etiket: `enumLabels.ts`
 *   - API hata kodu → kullanıcı mesajı: `apiErrorMessage.ts`
 *
 * NASIL EKLENİR:
 *   1. Metin en az 3 yerde BİREBİR aynı geçiyorsa buraya eklenir (tek kullanım için ekleme yok).
 *   2. Uygun gruba (actions / status / filters) İngilizce anahtarla yazılır; değer Türkçe ve
 *      ekrandakiyle harfi harfine aynıdır. Üç nokta her zaman tek karakter "…" (U+2026).
 *   3. `src/__tests__/ui-text.test.ts` içindeki beklenen değerler tablosuna satır eklenir.
 *   4. Bileşende `import { UI_TEXT } from '@/lib/uiText'` → `{UI_TEXT.actions.save}`.
 *
 * ⚠️ Bir değeri değiştirmek, onu kullanan TÜM ekranları değiştirir. Tek ekranda farklı metin
 * gerekiyorsa sözlüğü değiştirme — o ekranda yerel metin kullan.
 */

export const UI_TEXT = {
  /** Düğme / eylem etiketleri. */
  actions: {
    save: 'Kaydet',
    /** Diyalog ve formlarda "vazgeç" düğmesi (bu projede "İptal" yerine bu kullanılır). */
    cancel: 'Vazgeç',
    confirm: 'Onayla',
    close: 'Kapat',
    send: 'Gönder',
    delete: 'Sil',
    retry: 'Tekrar dene',
  },
  /** Süren işlem göstergeleri — hepsi tek karakter üç nokta "…" ile biter. */
  status: {
    loading: 'Yükleniyor…',
    saving: 'Kaydediliyor…',
    sending: 'Gönderiliyor…',
  },
  /** Liste filtreleri. */
  filters: {
    all: 'Tümü',
  },
} as const;

export type UiText = typeof UI_TEXT;
