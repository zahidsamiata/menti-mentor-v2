// IC-08: onay bekleyen kullanıcıya yöneticinin "düzeltme iste" notu. Giriş yanıtından /pending-approval'a
// URL yerine sekme belleğiyle taşınır (serbest metin adres çubuğuna, geçmişe ve sunucu günlüklerine düşmesin).
const STORAGE_KEY = 'mentimentor.pendingCorrectionNote';

export function storePendingCorrectionNote(note: string | null): void {
  try {
    if (note && note.trim()) sessionStorage.setItem(STORAGE_KEY, note);
    else sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // Depolama kapalıysa not yalnız e-postayla ulaşır; giriş akışı bozulmaz.
  }
}

export function readPendingCorrectionNote(): string | null {
  try {
    const note = sessionStorage.getItem(STORAGE_KEY);
    return note && note.trim() ? note : null;
  } catch {
    return null;
  }
}

export function clearPendingCorrectionNote(): void {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // yok say
  }
}
