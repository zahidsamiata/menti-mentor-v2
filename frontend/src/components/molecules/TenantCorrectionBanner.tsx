'use client';

/**
 * Molecule: TenantCorrectionBanner — #37
 *
 * STK yöneticisi için: platform admin başvuruya "düzeltme istediyse"
 * (tenant.verificationStatus === 'CORRECTION_REQUESTED') üstte bir bilgi bandı gösterir:
 * düzeltme notunu iletir + bilgileri güncelleyip tekrar göndermeyi sağlar.
 *
 * Dil: destekleyici ("reddedildiniz" değil, "bilgilerinizi güncelleyin"). Yalnız ADMIN'e anlamlı
 * (correctionNote backend'de yalnız ADMIN'e döner). Onay/red/normal durumda hiçbir şey göstermez.
 */

import { useEffect, useState } from 'react';
import { useApiClient } from '@/hooks/useApiClient';
import { useAuth } from '@/providers/AuthProvider';
import { resubmitTenantApplication, type TenantVerificationStatus } from '@/lib/api/selfServe';

interface MeResponse {
  role: string;
  tenant: {
    name: string;
    verificationStatus: TenantVerificationStatus;
    correctionNote: string | null;
  } | null;
}

export function TenantCorrectionBanner() {
  const api = useApiClient();
  const { accessToken } = useAuth();

  const [note, setNote] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false); // form açık mı
  const [role, setRole] = useState('');
  const [proof, setProof] = useState('');
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      const res = await api<MeResponse>('/api/auth/me');
      if (!alive) return;
      if (res.ok && res.data.tenant?.verificationStatus === 'CORRECTION_REQUESTED') {
        setNote(res.data.tenant.correctionNote);
        setVisible(true);
      }
    })();
    return () => { alive = false; };
  }, [api]);

  if (!visible) return null;

  async function handleResubmit() {
    if (!accessToken || proof.trim().length === 0) return;
    setSaving(true);
    setError(null);
    const res = await resubmitTenantApplication(accessToken, {
      institutionRole: role.trim() || undefined,
      verificationNote: proof.trim(),
    });
    setSaving(false);
    if (res.ok) {
      setDone(true);
      setOpen(false);
    } else {
      setError(res.error.message ?? 'Gönderim başarısız. Lütfen tekrar deneyin.');
    }
  }

  if (done) {
    return (
      <div className="mb-4 rounded-xl border border-emerald-300 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/30 p-4">
        <p className="text-sm font-medium text-emerald-800 dark:text-emerald-300">
          ✓ Bilgileriniz güncellendi ve başvurunuz tekrar incelemeye gönderildi.
        </p>
        <p className="mt-1 text-xs text-emerald-700 dark:text-emerald-400">
          İncelemenin sonucu size bildirilecektir. Teşekkür ederiz.
        </p>
      </div>
    );
  }

  return (
    <div className="mb-4 rounded-xl border border-amber-300 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/30 p-4">
      <p className="text-sm font-semibold text-amber-800 dark:text-amber-300">
        Başvurunuz için bilgi güncellemesi isteniyor
      </p>
      <p className="mt-1 text-sm text-amber-700 dark:text-amber-400">
        Başvurunuz reddedilmedi. Platform ekibimiz aşağıdaki bilgileri güncellemenizi rica ediyor.
        Güncelledikten sonra başvurunuz yeniden incelemeye alınır.
      </p>
      {note && (
        <p className="mt-2 rounded-lg bg-amber-100 dark:bg-amber-900/40 p-3 text-sm text-amber-900 dark:text-amber-200">
          <span className="font-medium">Güncellenmesi istenen: </span>{note}
        </p>
      )}

      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="mt-3 rounded-lg bg-amber-600 hover:bg-amber-500 px-3 py-1.5 text-sm font-medium text-white transition-colors"
        >
          Bilgileri Güncelle
        </button>
      ) : (
        <div className="mt-3 space-y-2">
          <div>
            <label className="text-xs font-medium text-amber-800 dark:text-amber-300">
              Kurumdaki göreviniz (opsiyonel)
            </label>
            <input
              value={role}
              onChange={(e) => setRole(e.target.value)}
              maxLength={200}
              placeholder="Örn: Kulüp Başkanı"
              className="mt-1 w-full rounded-lg border border-amber-300 dark:border-amber-800 bg-background p-2 text-sm outline-none focus:ring-2 focus:ring-amber-400/40"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-amber-800 dark:text-amber-300">
              Doğrulama bilgisi / belge bağlantısı
            </label>
            <textarea
              value={proof}
              onChange={(e) => setProof(e.target.value)}
              rows={3}
              maxLength={1000}
              placeholder="Örn: kurumunuzu doğrulayan resmi bir bağlantı veya açıklama."
              className="mt-1 w-full rounded-lg border border-amber-300 dark:border-amber-800 bg-background p-2 text-sm outline-none focus:ring-2 focus:ring-amber-400/40"
            />
            <p className="mt-1 text-xs text-amber-700 dark:text-amber-400">
              ⚠️ Kişisel veri (kimlik no, telefon vb.) paylaşmayın.
            </p>
          </div>
          {error && <p className="text-xs text-red-600 dark:text-red-400">{error}</p>}
          <div className="flex gap-2">
            <button
              onClick={handleResubmit}
              disabled={saving || proof.trim().length === 0}
              className="rounded-lg bg-amber-600 hover:bg-amber-500 px-3 py-1.5 text-sm font-medium text-white transition-colors disabled:opacity-50"
            >
              {saving ? 'Gönderiliyor…' : 'Tekrar Gönder'}
            </button>
            <button
              onClick={() => setOpen(false)}
              disabled={saving}
              className="rounded-lg border border-amber-300 dark:border-amber-800 px-3 py-1.5 text-sm text-amber-800 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900/40 transition-colors"
            >
              Vazgeç
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
