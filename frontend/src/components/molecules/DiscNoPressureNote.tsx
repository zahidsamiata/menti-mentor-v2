import { cn } from '@/lib/utils';

/**
 * DISC testlerinde baskısızlık mesajı — her iki testte (birincil + ikincil) ortak (DRY).
 * "Sınav değil, keşif": her adımda görünür kalması amaçlanır.
 */
export function DiscNoPressureNote({ className }: { className?: string }) {
  return (
    <p
      className={cn(
        'rounded-xl border border-primary/20 bg-primary/5 px-4 py-2.5 text-xs leading-relaxed text-muted-foreground',
        className,
      )}
    >
      💛 Burada doğru-yanlış yok; bu sorular seni bir kalıba sokmak için değil, sana en uygun
      eşleşmeyi bulmak için. Kendine en yakın olanı seç.
    </p>
  );
}
