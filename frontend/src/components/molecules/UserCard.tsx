'use client';

import { LogOut } from 'lucide-react';

/**
 * Panel kullanıcı kartı — oturumdaki kullanıcının adı (+ isteğe bağlı rolü) + e-postası + çıkış.
 *
 * Neden ortak bileşen: admin sidebar'ının sol-alt kartı (G8-14) menti/mentör panelinde de
 * gösteriliyor (F-33); aynı işaretleme iki yerde elle kopyalanmasın diye buraya çıkarıldı.
 * Yalnız çağıranın verdiği (oturumdaki kullanıcının kendi) verisini çizer — veri çekmez.
 * `roleLabel`/`ariaLabel` verilmezse DOM, admin sidebar'ının önceki kartıyla birebir aynıdır.
 */
interface UserCardProps {
  fullName: string;
  email: string;
  roleLabel?: string;
  onLogout: () => void | Promise<void>;
  className?: string;
  ariaLabel?: string;
}

export function UserCard({ fullName, email, roleLabel, onLogout, className, ariaLabel }: UserCardProps) {
  return (
    <div className={className} role={ariaLabel ? 'region' : undefined} aria-label={ariaLabel}>
      <div>
        <p className="text-xs text-muted-foreground truncate">{fullName}</p>
        {roleLabel && <p className="text-xs text-muted-foreground/70 truncate">{roleLabel}</p>}
        <p className="text-xs text-muted-foreground truncate">{email}</p>
      </div>
      <button
        type="button"
        onClick={onLogout}
        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <LogOut className="h-4 w-4" aria-hidden />
        Çıkış Yap
      </button>
    </div>
  );
}
