'use client';

/**
 * GV-18 — rıza metni sürümü güncellenince kullanıcıya banner + yeniden onay butonu.
 *
 * Bugün `needsReconsent` hiçbir aktif kullanıcı için true DÖNMEZ (CONSENT_VERSION yer tutucu,
 * avukat metni gelene kadar sürüm hiç artmıyor) — bu bileşen canlıda görünmeyen bir altyapı.
 * Gerçek sürüm artışı olduğunda devreye girer.
 */

import { useState } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { Button } from '@/components/ui/button';
import { submitReconsent } from '@/lib/api/reconsent';

export function ReconsentBanner() {
  const { user, accessToken } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  if (!user?.needsReconsent || done) return null;

  async function handleReconsent() {
    if (!user || !accessToken) return;
    setSubmitting(true);
    setError(null);
    const result = await submitReconsent(accessToken, user.tenantId);
    setSubmitting(false);
    if (result.ok) {
      setDone(true);
    } else {
      setError(result.error.message ?? 'İşlem başarısız oldu, lütfen tekrar deneyin.');
    }
  }

  return (
    <div className="mb-6 rounded-2xl border-2 border-dashed border-destructive/50 bg-destructive/5 p-4 flex items-center justify-between gap-4">
      <div>
        <p className="text-sm font-medium">Aydınlatma metnimiz güncellendi</p>
        <p className="text-xs text-muted-foreground">
          Devam edebilmek için güncel metni onaylamanız gerekiyor.
        </p>
        {error && <p className="text-xs text-destructive mt-1">{error}</p>}
      </div>
      <Button size="sm" onClick={handleReconsent} disabled={submitting}>
        {submitting ? '…' : 'Onayla'}
      </Button>
    </div>
  );
}
