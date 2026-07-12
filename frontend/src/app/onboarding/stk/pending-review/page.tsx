import { Clock, Mail } from 'lucide-react';

export default function PendingReviewPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6 text-center">
        <div className="flex justify-center">
          <div className="h-16 w-16 rounded-full bg-amber-100 flex items-center justify-center">
            <Clock className="h-8 w-8 text-amber-600" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground">Başvurunuz İnceleniyor</h1>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Kurum kaydınız alındı. Platform ekibimiz başvurunuzu en kısa sürede
            inceleyecek ve size e-posta ile bilgi verecektir.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card p-5 text-left space-y-3">
          <div className="flex items-start gap-3">
            <Mail className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm font-medium text-foreground">E-posta bildirimi</p>
              <p className="text-xs text-muted-foreground">
                Onay veya ret kararı e-posta adresinize iletilecektir.
              </p>
            </div>
          </div>
        </div>

        <p className="text-xs text-muted-foreground">
          Sorularınız için{' '}
          <a
            href="mailto:destek@mentimentor.io"
            className="text-primary underline underline-offset-2 hover:text-primary/80"
          >
            destek@mentimentor.io
          </a>{' '}
          adresine yazabilirsiniz.
          <br />
          Kurumsal e-posta adresiyle daha hızlı onaylanırsınız.
        </p>

        <a
          href="/login"
          className="inline-block text-sm text-muted-foreground hover:text-foreground underline underline-offset-2 transition-colors"
        >
          Giriş Sayfasına Dön
        </a>
      </div>
    </div>
  );
}
