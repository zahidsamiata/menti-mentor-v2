'use client';

import { useState, useEffect, useRef } from 'react';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FormField } from '@/components/molecules/FormField';
import { AlertMessage } from '@/components/molecules/AlertMessage';
import { checkSlugAvailability } from '@/lib/api/selfServe';
import type { WizardData } from '../_StkOnboardingContent';

interface Props {
  data: WizardData;
  onUpdate: (p: Partial<WizardData>) => void;
  onNext: () => void;
}

const SLUG_RE = /^[a-z0-9-]{2,50}$/;

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .slice(0, 50);
}

type SlugStatus = 'idle' | 'checking' | 'available' | 'taken' | 'invalid';

export function Step1Slug({ data, onUpdate, onNext }: Props) {
  const [nameError,  setNameError]  = useState('');
  const [slugStatus, setSlugStatus] = useState<SlugStatus>('idle');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // slug input değişince debounced check
  useEffect(() => {
    if (!data.slug) { setSlugStatus('idle'); return; }
    if (!SLUG_RE.test(data.slug)) { setSlugStatus('invalid'); return; }

    setSlugStatus('checking');
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(async () => {
      const res = await checkSlugAvailability(data.slug);
      setSlugStatus(!res.ok ? 'idle' : res.data.available ? 'available' : 'taken');
    }, 500);

    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [data.slug]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    onUpdate({ tenantName: name, slug: toSlug(name) });
    setNameError('');
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '');
    onUpdate({ slug: raw });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.tenantName.trim()) { setNameError('Kurum adı zorunludur.'); return; }
    if (slugStatus !== 'available') return;
    onNext();
  };

  const SlugIcon = () => {
    if (slugStatus === 'checking') return <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />;
    if (slugStatus === 'available') return <CheckCircle2 className="h-4 w-4 text-emerald-500" />;
    if (slugStatus === 'taken' || slugStatus === 'invalid') return <XCircle className="h-4 w-4 text-destructive" />;
    return null;
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5">

        <FormField
          label="Kurum Adı"
          name="tenantName"
          placeholder="ör: Ankara Mezunlar Derneği"
          value={data.tenantName}
          onChange={handleNameChange}
          error={nameError}
        />

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground" htmlFor="slug">
            Kurum Adresi (slug)
          </label>
          <div className="relative">
            <div className="flex items-center rounded-md border border-input bg-background text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
              <span className="pl-3 pr-1 text-muted-foreground text-xs select-none whitespace-nowrap">
                mentimentor.app/
              </span>
              <input
                id="slug"
                name="slug"
                value={data.slug}
                onChange={handleSlugChange}
                placeholder="kurum-adi"
                className="flex-1 bg-transparent py-2 pr-10 outline-none placeholder:text-muted-foreground/50"
                autoCorrect="off"
                autoCapitalize="none"
                spellCheck={false}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <SlugIcon />
              </div>
            </div>
          </div>

          {slugStatus === 'available' && (
            <p className="text-xs text-emerald-600">Bu adres kullanılabilir.</p>
          )}
          {slugStatus === 'taken' && (
            <p className="text-xs text-destructive">Bu adres başka bir kurum tarafından alınmış.</p>
          )}
          {slugStatus === 'invalid' && (
            <p className="text-xs text-destructive">Yalnızca küçük harf, rakam ve tire (-) kullanılabilir.</p>
          )}
          <p className="text-xs text-muted-foreground">
            Üyeleriniz bu linkten katılır. Sonradan değiştirilemez.
          </p>
        </div>

        {slugStatus === 'taken' && (
          <AlertMessage
            type="error"
            message={`"${data.slug}" zaten alınmış. Farklı bir adres deneyin.`}
          />
        )}
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={slugStatus !== 'available' || !data.tenantName.trim()}
      >
        Devam Et
      </Button>
    </form>
  );
}
