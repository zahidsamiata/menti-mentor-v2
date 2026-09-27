'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { Button } from '@/components/ui/button';
import { Clock, Mail, LogOut, PenLine } from 'lucide-react';
import { clearPendingCorrectionNote, readPendingCorrectionNote } from '@/lib/pendingCorrectionNote';
import { clearPendingApprovalEmail, readPendingApprovalEmail } from '@/lib/pendingApprovalEmail';

export default function PendingApprovalPage() {
  const { user, logout } = useAuth();
  // PENDING kullanıcıya JWT verilmediğinden user genelde null olur → e-postayı giriş formunun
  // sekme belleğine bıraktığı değerden al (U-07; AJ-24: URL'de taşınmaz). Token varsa user.email öncelikli.
  const [storedEmail, setStoredEmail] = useState<string | null>(null);
  const email = user?.email ?? storedEmail ?? undefined;
  // IC-08: yöneticinin düzeltme notu — giriş formu sekme belleğine bırakır (bkz. lib/pendingCorrectionNote).
  const [correctionNote, setCorrectionNote] = useState<string | null>(null);
  useEffect(() => {
    setStoredEmail(readPendingApprovalEmail());
    setCorrectionNote(readPendingCorrectionNote());
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md text-center space-y-6 animate-fade-in">

        {/* İkon */}
        <div className="flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/20">
            <Clock className="h-8 w-8 text-amber-600 dark:text-amber-400" aria-hidden />
          </div>
        </div>

        {/* Başlık */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground">
            Onay Bekleniyor
          </h1>
          {user?.fullName && (
            <p className="text-muted-foreground">
              Merhaba <strong className="text-foreground">{user.fullName}</strong>,
            </p>
          )}
          <p className="text-sm text-muted-foreground leading-relaxed">
            Hesabınız kurum yöneticinizin onayını bekliyor.
            Onay işlemi tamamlandığında e-posta ile bilgilendirileceksiniz.
          </p>
        </div>

        {correctionNote && (
          <div
            role="status"
            className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-5 text-left space-y-2"
          >
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <PenLine className="h-4 w-4 text-amber-600 dark:text-amber-400" aria-hidden />
              Yöneticinizin notu
            </div>
            <p className="whitespace-pre-line break-words text-sm text-foreground">{correctionNote}</p>
          </div>
        )}

        {/* Bilgi kutusu */}
        <div className="rounded-xl border border-border bg-muted/50 p-5 text-left space-y-3">
          <div className="flex items-start gap-3">
            <Mail className="h-4 w-4 text-primary shrink-0 mt-0.5" aria-hidden />
            <p className="text-sm text-muted-foreground">
              {email ? (
                <>
                  Onay sonrasında{' '}
                  <span className="font-medium text-foreground">{email}</span>{' '}
                  adresine bildirim gönderilecek.
                </>
              ) : (
                <>Onay sonrasında kayıtlı e-posta adresinize bildirim gönderilecek.</>
              )}
            </p>
          </div>
          <p className="text-xs text-muted-foreground pl-7">
            Uzun süre onay gelmezse kurum yöneticinizle iletişime geçin.
          </p>
        </div>

        {/* Çıkış */}
        <Button
          variant="outline"
          className="gap-2"
          onClick={() => {
            clearPendingCorrectionNote();
            clearPendingApprovalEmail();
            void logout();
          }}
        >
          <LogOut className="h-4 w-4" aria-hidden />
          Farklı hesapla giriş yap
        </Button>

      </div>
    </div>
  );
}
