'use client';

import { useAuth } from '@/providers/AuthProvider';
import { Button } from '@/components/ui/button';
import { Clock, Mail, LogOut } from 'lucide-react';

export default function PendingApprovalPage() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md text-center space-y-6 animate-fade-in">

        {/* İkon */}
        <div className="flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/20">
            <Clock className="h-8 w-8 text-amber-400" aria-hidden />
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

        {/* Bilgi kutusu */}
        <div className="rounded-xl border border-border bg-muted/50 p-5 text-left space-y-3">
          <div className="flex items-start gap-3">
            <Mail className="h-4 w-4 text-primary shrink-0 mt-0.5" aria-hidden />
            <p className="text-sm text-muted-foreground">
              Onay sonrasında{' '}
              <span className="font-medium text-foreground">{user?.email}</span>{' '}
              adresine bildirim gönderilecek.
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
          onClick={() => void logout()}
        >
          <LogOut className="h-4 w-4" aria-hidden />
          Farklı hesapla giriş yap
        </Button>

      </div>
    </div>
  );
}
