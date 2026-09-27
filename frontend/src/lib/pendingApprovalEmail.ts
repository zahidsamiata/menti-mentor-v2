// AJ-24: onay bekleyen kullanıcının e-postası giriş formundan /pending-approval'a URL yerine sekme
// belleğiyle taşınır. Eskiden `?email=` query'siyle gidiyordu → adres tarayıcı geçmişine ve sunucu/proxy
// erişim günlüklerine düşüyordu (kişisel veri). Desen IC-08 düzeltme notuyla aynı (lib/pendingCorrectionNote).
// sessionStorage sekmeye özeldir: sayfa yenilenince adres görünmeye devam eder, sekme kapanınca silinir.
const STORAGE_KEY = 'mentimentor.pendingApprovalEmail';

export function storePendingApprovalEmail(email: string | null): void {
  try {
    const trimmed = email?.trim();
    if (trimmed) sessionStorage.setItem(STORAGE_KEY, trimmed);
    else sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // Depolama kapalıysa ekran genel "kayıtlı e-posta adresinize" metnini gösterir; giriş akışı bozulmaz.
  }
}

export function readPendingApprovalEmail(): string | null {
  try {
    const email = sessionStorage.getItem(STORAGE_KEY);
    return email && email.trim() ? email : null;
  } catch {
    return null;
  }
}

export function clearPendingApprovalEmail(): void {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // yok say
  }
}
