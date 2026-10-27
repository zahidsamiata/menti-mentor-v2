import { PenLine } from 'lucide-react';

/**
 * Y1-B8 (KARAR-101): onay bekleyen kişi artık giriş yapıp panele geliyor; yöneticinin "düzeltme iste"
 * notu (IC-08) eskiden yalnız /pending-approval ekranındaydı — artık panelde de görünür.
 * Not backend'de yalnız PENDING kullanıcıya dolu döner (authController correctionNoteFor).
 */
export function PendingCorrectionNote({ note }: { note: string | null | undefined }) {
  if (!note) return null;
  return (
    <div role="status" className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-left space-y-1">
      <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
        <PenLine className="h-4 w-4 text-amber-600 dark:text-amber-400" aria-hidden />
        Yöneticinizin notu
      </div>
      <p className="whitespace-pre-line break-words text-sm text-foreground">{note}</p>
    </div>
  );
}

/**
 * Mentörlerin isimsiz alan özeti: "Alanlar: yazılım (4) · pazarlama (3)". Backend eşik altındaki
 * alanı hiç göndermez; boşsa hiçbir şey çizilmez.
 */
export function MentorSectorPreview({ sectors }: { sectors: { sector: string; count: number }[] | undefined }) {
  if (!sectors || sectors.length === 0) return null;
  return (
    <p className="text-xs text-amber-700 dark:text-amber-400">
      Alanlar:{' '}
      {sectors.map((s, i) => (
        <span key={s.sector}>
          {i > 0 && ' · '}
          {s.sector} ({s.count})
        </span>
      ))}
    </p>
  );
}

/** Onay bekleyen mentörün paneli: kapalı bölümler yerine tek açıklama (backend bu uçlara 403 verir). */
export function MentorPendingApprovalPanel({ correctionNote }: { correctionNote: string | null | undefined }) {
  return (
    <div className="rounded-2xl border-2 border-dashed border-amber-400/50 bg-amber-50 dark:bg-amber-950/20 p-6 space-y-3">
      <h3 className="font-semibold text-sm text-amber-800 dark:text-amber-300">Yönetici onayı bekleniyor</h3>
      <p className="text-xs text-amber-700 dark:text-amber-400">
        Profiliniz inceleniyor. Onay sonrasında menti adaylarını, görüşme taleplerini ve mesajları burada göreceksiniz.
        Beklerken profilinizi tamamlayabilir ve kişilik sorularını yanıtlayabilirsiniz.
      </p>
      <PendingCorrectionNote note={correctionNote} />
    </div>
  );
}
