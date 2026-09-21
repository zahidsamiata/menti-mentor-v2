'use client';

import { Zap, TrendingUp, Users } from 'lucide-react';
import { useApiClient } from '@/hooks/useApiClient';
import { useQuery } from '@/hooks/useQuery';
import { cn } from '@/lib/utils';

/**
 * P-03 — DISC "özgüven aşısı" rapeli.
 *
 * Kayıt sonrası gösterilen zengin arketip kartı (`ResultStep`) tek seferlikti;
 * panelde/testte bir daha görünmüyordu. Bu bileşen aynı kartın SALT-OKUNUR
 * (paylaşım/devam butonsuz) rapelini panelde gösterir. Veri kaynağı zaten
 * hazır olan `GET /api/users/:id` yanıtının `discResultCard` alanıdır — yeni
 * uç eklenmedi. Kart yoksa (DISC henüz tamamlanmadıysa) bileşen görünmez.
 */

/** Profil yanıtındaki DISC kart şekli (`lib/api/profile.ts` ile aynı). */
export interface DiscRecallCardData {
  archetype: string;
  icon: string;
  superPower: string;
  description: string;
  strengths: string[];
  growthArea: string;
  compatibleWith: string[];
  dominant: string;
}

// ─── Salt-okunur görünüm (saf, test edilebilir) ──────────────────────────────

export function DiscRecallCardView({
  card,
  role,
}: {
  card: DiscRecallCardData;
  /** F-16: menti için özgüven veren ek ton; diğer rollerde gösterilmez. */
  role?: 'MENTI' | 'MENTOR' | 'ADMIN';
}) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl border-2 border-primary/30',
        'bg-gradient-to-br from-primary/5 via-card to-primary/10',
        'p-5 shadow-lg shadow-primary/10 text-center',
      )}
    >
      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-primary/70">
        Senin DISC Profilin
      </p>

      <div className="mb-3 text-5xl leading-none" aria-hidden>
        {card.icon}
      </div>

      <h3 className="mb-1 text-xl font-bold text-foreground">
        Sen bir <span className="text-primary">{card.archetype}</span>sın!
      </h3>

      <p className="mb-3 text-sm font-semibold text-primary/80">✦ {card.superPower}</p>

      <p className="mb-4 text-sm leading-relaxed text-muted-foreground text-balance">
        {card.description}
      </p>

      <div className="mb-4 flex flex-wrap justify-center gap-2">
        {card.strengths.map((strength) => (
          <span
            key={strength}
            className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
          >
            {strength}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2 rounded-xl bg-background/60 p-3 text-xs">
        <div className="flex flex-col items-center gap-1">
          <Zap className="h-4 w-4 text-primary" aria-hidden />
          <span className="text-muted-foreground">Dominant</span>
          <span className="font-bold text-foreground">{card.dominant}</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Users className="h-4 w-4 text-primary" aria-hidden />
          <span className="text-muted-foreground">En İyi Eş</span>
          <span className="font-bold text-foreground">{card.compatibleWith.join(' + ')}</span>
        </div>
      </div>

      <div className="mt-4 rounded-xl bg-muted/60 p-3 text-left">
        <p className="mb-0.5 flex items-center gap-1 text-xs font-semibold text-muted-foreground">
          <TrendingUp className="h-3.5 w-3.5" aria-hidden /> Gelişim Alanın
        </p>
        <p className="text-xs text-muted-foreground">{card.growthArea}</p>
      </div>

      {/* F-16: menti-özel özgüven tonu — güçlü yanlarını sahiplenmesini teşvik eder. */}
      {role === 'MENTI' && (
        <p className="mt-4 rounded-xl bg-primary/10 p-3 text-xs font-medium text-primary text-balance">
          💪 Bu güçlü yanlar senin. Doğru mentörle daha da parlayacaklar — kendine güven, yolun açık.
        </p>
      )}
    </div>
  );
}

// ─── Kendi kendine veri çeken sarmalayıcı ────────────────────────────────────

interface ProfileWithCard {
  discResultCard: DiscRecallCardData | null;
}

export function DiscRecallCard({ userId, role }: { userId: string; role?: 'MENTI' | 'MENTOR' | 'ADMIN' }) {
  const api = useApiClient();

  const { data } = useQuery<ProfileWithCard>(
    () => api<ProfileWithCard>(`/api/users/${userId}`),
    [api, userId],
    { enabled: Boolean(userId) },
  );

  if (!data?.discResultCard) return null;

  return <DiscRecallCardView card={data.discResultCard} role={role} />;
}
