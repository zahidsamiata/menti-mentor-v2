'use client';

import { useState, type FormEvent } from 'react';
import { useApiClient } from '@/hooks/useApiClient';
import { Button } from '@/components/ui/button';
import { tagsApi, validateTagSuggestion, TAG_SUGGEST_MAX, type SuggestTagResponse } from '@/lib/api/tags';
import { cn } from '@/lib/utils';

/**
 * Sektör etiketleri + "listede yok mu? öner" (madde 127, Y-16).
 *
 * Kullanıcı mevcut sektör etiketlerini görür; havuzda olmayan bir alanı önerebilir.
 * Öneri doğrudan profile YAZILMAZ — `POST /api/tags/suggest` ile kurumun onay kuyruğuna
 * düşer. Yönetici `/admin/tags` ekranında (backend tagController approve/merge/reject):
 *  - ONAYLARSA etiket YALNIZ önerenin sectorTags listesine eklenir (ortak bir "etiket listesi" yok);
 *  - başka etiketle BİRLEŞTİRİRSE ya da REDDEDERSE önerene eklenmez.
 * Başarı metni bu üç sonucu olduğu gibi söyler; koşulsuz "eklenecek" sözü vermez.
 */

type Feedback = { kind: 'success' | 'info' | 'error'; text: string } | null;

const FEEDBACK_STYLES: Record<'success' | 'info' | 'error', string> = {
  success: 'text-emerald-600 dark:text-emerald-400',
  info:    'text-muted-foreground',
  error:   'text-destructive',
};

/** Backend yanıtını dürüst kullanıcı mesajına çevirir (yeni öneri mi, zaten var mı). */
export function suggestionResultText(data: SuggestTagResponse): { kind: 'success' | 'info'; text: string } {
  if (data.tag) {
    return {
      kind: 'success',
      text: `"${data.tag.value}" önerisi yönetici incelemesine gönderildi. Yönetici onaylarsa profilinize eklenir; başka bir etiketle birleştirilir ya da reddedilirse eklenmez.`,
    };
  }
  if (data.status === 'PENDING') {
    return { kind: 'info', text: 'Bu etiket zaten yönetici incelemesinde; yeni bir öneri oluşturulmadı.' };
  }
  return {
    kind: 'info',
    text: 'Bu etiket kurumunuzda daha önce önerilip değerlendirilmiş; yeni bir öneri oluşturulmadı.',
  };
}

export function SectorTagSuggest({ currentTags }: { currentTags: string[] }) {
  const api = useApiClient();
  const [value, setValue] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<Feedback>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const check = validateTagSuggestion(value);
    if (!check.ok) {
      setFeedback({ kind: 'error', text: check.message });
      return;
    }
    // Türkçe büyük/küçük harf (I→ı, İ→i) için yerel karşılaştırma — "YAZILIM" = "yazılım".
    const lowered = check.value.toLocaleLowerCase('tr-TR');
    if (currentTags.some((t) => t.toLocaleLowerCase('tr-TR') === lowered)) {
      setFeedback({ kind: 'info', text: 'Bu etiket zaten sektör etiketlerinizde var.' });
      return;
    }

    setSubmitting(true);
    setFeedback(null);
    const result = await tagsApi.suggest(api, check.value);
    setSubmitting(false);

    if (result.ok) {
      setFeedback(suggestionResultText(result.data));
      setValue('');
    } else {
      setFeedback({
        kind: 'error',
        text: result.error.message ?? 'Öneri gönderilemedi. Lütfen tekrar deneyin.',
      });
    }
  };

  return (
    <fieldset data-testid="sector-tag-suggest">
      <legend className="text-sm font-semibold text-foreground mb-2">Sektör Etiketleri</legend>

      {currentTags.length > 0 ? (
        <div className="flex flex-wrap gap-2 mb-3">
          {currentTags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border bg-muted/40 px-3 py-1 text-xs font-medium text-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      ) : (
        <p className="text-xs text-muted-foreground mb-3">Henüz sektör etiketiniz yok.</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-2" noValidate>
        <label htmlFor="sector-tag-suggest-input" className="text-xs text-muted-foreground block">
          Alanınız listede yok mu? Yeni bir etiket önerin — öneriniz yönetici incelemesine gider.
        </label>
        <div className="flex gap-2">
          <input
            id="sector-tag-suggest-input"
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            maxLength={TAG_SUGGEST_MAX}
            placeholder="örn. oyun tasarımı"
            className={cn(
              'flex-1 min-w-0 rounded-xl border border-border bg-background px-4 py-2.5 text-sm',
              'focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary',
              'transition-colors placeholder:text-muted-foreground',
            )}
          />
          <Button type="submit" variant="outline" disabled={submitting} className="rounded-xl shrink-0">
            {submitting ? 'Gönderiliyor…' : 'Öner'}
          </Button>
        </div>
        {feedback && (
          <p
            className={cn('text-xs', FEEDBACK_STYLES[feedback.kind])}
            role={feedback.kind === 'error' ? 'alert' : 'status'}
          >
            {feedback.text}
          </p>
        )}
      </form>
    </fieldset>
  );
}
