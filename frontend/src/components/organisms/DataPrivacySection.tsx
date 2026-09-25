'use client';

/**
 * KVKK self-servis hak ekranı (G1-05).
 *
 * İki hak, sade Türkçe (hukuk jargonu yok):
 *   1. "Verilerimi indir" → GET /api/me/data-export → JSON dosyası indirir.
 *   2. "Hesabımı kapat"   → iki adımlı onay (uyarı → e-posta teyidi) → POST /api/me/delete-account.
 *
 * Hesap kapatma anonimleştirir (geri alınamaz). Başarıda oturum düşer → login'e yönlendirilir.
 */

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/providers/AuthProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useModalDialog } from '@/hooks/useModalDialog';
import { fetchMyDataExport, deleteMyAccount } from '@/lib/api/kvkk';
import { summarizeDataExport, type DataSummarySection } from '@/lib/kvkkSummary';

type DeleteStep = 'closed' | 'warning' | 'confirm';

export function DataPrivacySection() {
  const { user, accessToken, logout } = useAuth();
  const router = useRouter();

  const [downloading, setDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);

  // K-12: ham JSON yerine okunur özet
  const [viewing, setViewing] = useState(false);
  const [summary, setSummary] = useState<DataSummarySection[] | null>(null);
  const [summaryError, setSummaryError] = useState<string | null>(null);

  const [step, setStep] = useState<DeleteStep>('closed');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  // ── Hesabımı kapat ──────────────────────────────────────────────────────────
  const resetDeleteFlow = () => {
    setStep('closed');
    setConfirmEmail('');
    setDeleteError(null);
  };

  // F-21: onay penceresi — odak içeri, Esc ile kapanır (silme sürerken kapanmaz), kapanınca
  // odak "Hesabımı kapat" düğmesine döner.
  const deleteDialogRef = useModalDialog<HTMLDivElement>(step !== 'closed', () => {
    if (!deleting) resetDeleteFlow();
  });

  if (!user || !accessToken) return null;

  // ── Verilerimi indir ────────────────────────────────────────────────────────
  const handleDownload = async () => {
    setDownloading(true);
    setDownloadError(null);

    const result = await fetchMyDataExport(accessToken, user.tenantId);
    setDownloading(false);

    if (!result.ok) {
      setDownloadError(result.error.message ?? 'Veriler indirilemedi. Lütfen tekrar deneyin.');
      return;
    }

    // JSON'u tarayıcıda blob olarak indir (sunucuya ekstra yük yok).
    const blob = new Blob([JSON.stringify(result.data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `verilerim-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  // ── Verilerimi görüntüle (okunur özet) ──────────────────────────────────────
  const handleView = async () => {
    // Zaten yüklüyse yalnız aç/kapat.
    if (summary) { setViewing((v) => !v); return; }
    setViewing(true);
    setSummaryError(null);

    const result = await fetchMyDataExport(accessToken, user.tenantId);
    if (!result.ok) {
      setSummaryError(result.error.message ?? 'Veriler getirilemedi. Lütfen tekrar deneyin.');
      setViewing(false);
      return;
    }
    setSummary(summarizeDataExport(result.data));
  };

  const handleDelete = async () => {
    setDeleting(true);
    setDeleteError(null);

    const result = await deleteMyAccount(confirmEmail.trim(), accessToken, user.tenantId);

    if (!result.ok) {
      setDeleting(false);
      setDeleteError(result.error.message ?? 'Hesap kapatılamadı. Lütfen tekrar deneyin.');
      return;
    }

    // Başarı: oturum düştü (üyelik pasif, refresh cookie temizlendi). İstemci tarafında da temizle.
    await logout();
    router.replace('/login');
  };

  const emailMatches = confirmEmail.trim().toLowerCase() === user.email.toLowerCase();

  return (
    <section className="rounded-xl border border-border bg-card p-5 space-y-5">
      <div>
        <h2 className="text-base font-semibold text-foreground">Verilerim ve Gizlilik</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Kişisel verileriniz üzerindeki haklarınızı buradan kullanabilirsiniz. Ayrıntılar için{' '}
          <Link href="/kvkk" className="text-primary hover:underline">
            KVKK Aydınlatma Metni
          </Link>
          .
        </p>
      </div>

      {/* ── Verilerimi görüntüle / indir ─────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-medium text-foreground">Verilerim</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Profiliniz, rızalarınız ve etkinlik özetinizi ekranda görüntüleyin veya JSON dosyası olarak indirin.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleView}>
            {viewing && summary ? 'Gizle' : 'Görüntüle'}
          </Button>
          <Button variant="outline" onClick={handleDownload} disabled={downloading}>
            {downloading ? 'Hazırlanıyor…' : 'İndir'}
          </Button>
        </div>
      </div>
      {downloadError && (
        <p className="text-xs text-destructive" role="alert">{downloadError}</p>
      )}
      {summaryError && (
        <p className="text-xs text-destructive" role="alert">{summaryError}</p>
      )}

      {/* ── Okunur özet (K-12) ───────────────────────────────────────── */}
      {viewing && summary && (
        <div className="rounded-lg border border-border bg-muted/30 p-4 space-y-4">
          {summary.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-foreground mb-1.5">{section.title}</h3>
              <dl className="space-y-1">
                {section.rows.map((row, i) => (
                  <div key={`${section.title}-${i}`} className="flex flex-wrap justify-between gap-x-3 text-xs">
                    <dt className="text-muted-foreground">{row.label}</dt>
                    <dd className="text-foreground text-right break-words">{row.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
          <p className="text-[11px] text-muted-foreground border-t border-border pt-2">
            Bu özet size gösterilir; mesaj içerikleri ve karşı tarafın kişisel verileri paylaşılmaz.
          </p>
        </div>
      )}

      {/* ── Hesap kapatma (tehlikeli alan) ───────────────────────────── */}
      <div className="border-t border-border pt-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-sm font-medium text-destructive">Hesabımı kapat</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Hesabınız kapatılır ve kişisel verileriniz geri alınamaz şekilde anonimleştirilir.
            </p>
          </div>
          <Button variant="destructive" onClick={() => setStep('warning')}>
            Hesabımı kapat
          </Button>
        </div>
      </div>

      {/* ── İki adımlı onay modalı ───────────────────────────────────── */}
      {step !== 'closed' && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          ref={deleteDialogRef}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-account-title"
        >
          <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-xl space-y-4">
            {step === 'warning' && (
              <>
                <h3 id="delete-account-title" className="text-lg font-bold text-foreground">
                  Hesabınızı kapatmak üzeresiniz
                </h3>
                <div className="text-sm text-muted-foreground space-y-2">
                  <p>Bu işlem geri alınamaz. Onaylarsanız:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Adınız, e-postanız ve profil bilgileriniz anonimleştirilir.</li>
                    <li>Aktif eşleşme ve görüşmeleriniz kapanır.</li>
                    <li>Bir daha bu hesapla giriş yapamazsınız.</li>
                  </ul>
                  <p>Ortak kayıtlarda (mesaj, görüşme) kimliğiniz kaldırılır; karşı tarafın verisi korunur.</p>
                </div>
                <div className="flex justify-end gap-2 pt-1">
                  <Button variant="outline" onClick={resetDeleteFlow}>Vazgeç</Button>
                  <Button variant="destructive" onClick={() => setStep('confirm')}>Devam et</Button>
                </div>
              </>
            )}

            {step === 'confirm' && (
              <>
                <h3 id="delete-account-title" className="text-lg font-bold text-foreground">
                  Son onay
                </h3>
                <p className="text-sm text-muted-foreground">
                  Onaylamak için e-posta adresinizi yazın:{' '}
                  <span className="font-medium text-foreground break-all">{user.email}</span>
                </p>
                <Input
                  type="email"
                  value={confirmEmail}
                  onChange={(e) => setConfirmEmail(e.target.value)}
                  placeholder="e-posta adresiniz"
                  autoComplete="off"
                  aria-label="E-posta teyidi"
                  aria-invalid={deleteError ? true : undefined}
                  aria-describedby={deleteError ? 'delete-account-error' : undefined}
                  autoFocus
                />
                {deleteError && (
                  <p id="delete-account-error" className="text-xs text-destructive" role="alert">{deleteError}</p>
                )}
                <div className="flex justify-end gap-2 pt-1">
                  <Button variant="outline" onClick={resetDeleteFlow} disabled={deleting}>
                    Vazgeç
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={handleDelete}
                    disabled={!emailMatches || deleting}
                  >
                    {deleting ? 'Kapatılıyor…' : 'Hesabımı kalıcı olarak kapat'}
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
