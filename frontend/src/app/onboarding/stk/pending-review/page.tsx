'use client';

/**
 * U-04 — Kurum onay/ret durumu artık uygulama-içinde görünür.
 *
 * Eskiden bu ekran her zaman statik "Başvurunuz İnceleniyor" diyordu; kurum yöneticisi
 * onaylanıp onaylanmadığını yalnızca e-postadan öğrenebiliyordu (SMTP kapalıysa hiç).
 * Artık /api/auth/me üzerinden gerçek `tenant.verificationStatus` okunur ve duruma göre
 * ekran değişir. Oturum yoksa/erişilemezse güvenli varsayılan = "inceleniyor".
 *
 * Not: e-posta bildiriminin AÇILMASI PO adımıdır (TENANT_NOTIFICATIONS_ENABLED + SMTP,
 * bkz. 03-PO-ELLE-ISLER). Bu ekran uygulama-içi göstergeyi sağlar; e-postadan bağımsızdır.
 */

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Clock, Mail, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';
import { useApiClient } from '@/hooks/useApiClient';
import type { TenantVerificationStatus } from '@/lib/api/selfServe';

interface MeResponse {
  role: string;
  tenant: {
    name: string;
    verificationStatus: TenantVerificationStatus;
    correctionNote: string | null;
  } | null;
}

export default function PendingReviewPage() {
  const api = useApiClient();
  const [status, setStatus] = useState<TenantVerificationStatus | null>(null);
  const [correctionNote, setCorrectionNote] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      const res = await api<MeResponse>('/api/auth/me');
      if (!alive) return;
      if (res.ok && res.data.tenant) {
        setStatus(res.data.tenant.verificationStatus);
        setCorrectionNote(res.data.tenant.correctionNote);
      }
      setLoading(false);
    })();
    return () => { alive = false; };
  }, [api]);

  // Onaylandı → net olumlu ekran + panele giriş.
  if (status === 'APPROVED' || status === 'AUTO_APPROVED') {
    return (
      <Shell
        icon={<CheckCircle2 className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />}
        iconBg="bg-emerald-100 dark:bg-emerald-950/30"
        title="Başvurunuz Onaylandı 🎉"
        desc="Kurumunuz onaylandı. Artık giriş yapıp programınızı yönetmeye başlayabilirsiniz."
      >
        <Link
          href="/login"
          className="inline-block rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Giriş Yap →
        </Link>
      </Shell>
    );
  }

  // Düzeltme isteniyor → nazik ton + not; ayrıntılı düzeltme formu panelde (TenantCorrectionBanner).
  if (status === 'CORRECTION_REQUESTED') {
    return (
      <Shell
        icon={<AlertTriangle className="h-8 w-8 text-amber-600 dark:text-amber-400" />}
        iconBg="bg-amber-100 dark:bg-amber-950/30"
        title="Bilgi Güncellemesi İsteniyor"
        desc="Başvurunuz reddedilmedi. Platform ekibimiz bazı bilgileri güncellemenizi rica ediyor. Giriş yaptıktan sonra panelinizdeki bandan bilgileri güncelleyip tekrar gönderebilirsiniz."
      >
        {correctionNote && (
          <p className="rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 p-3 text-sm text-amber-900 dark:text-amber-200 text-left">
            <span className="font-medium">Güncellenmesi istenen: </span>{correctionNote}
          </p>
        )}
        <Link
          href="/login"
          className="inline-block rounded-lg bg-amber-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-amber-500 transition-colors"
        >
          Giriş Yap ve Güncelle →
        </Link>
      </Shell>
    );
  }

  // Reddedildi → dürüst ama destekleyici; varsa gerekçe.
  if (status === 'REJECTED') {
    return (
      <Shell
        icon={<XCircle className="h-8 w-8 text-red-600 dark:text-red-400" />}
        iconBg="bg-red-100 dark:bg-red-950/30"
        title="Başvurunuz Onaylanmadı"
        desc="Başvurunuz şu an onaylanmadı. Sorularınız veya yeniden başvuru için destek ekibimizle iletişime geçebilirsiniz."
      >
        {correctionNote && (
          <p className="rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 p-3 text-sm text-red-900 dark:text-red-200 text-left">
            <span className="font-medium">Not: </span>{correctionNote}
          </p>
        )}
        <a
          href="mailto:destek@mentimentor.io"
          className="inline-block rounded-lg border border-border px-5 py-2.5 text-sm font-medium hover:bg-muted transition-colors"
        >
          Destek ile İletişime Geç
        </a>
      </Shell>
    );
  }

  // Varsayılan: PENDING_REVIEW · oturum yok · yüklenirken → "inceleniyor" (eski davranış).
  return (
    <Shell
      icon={<Clock className="h-8 w-8 text-amber-600 dark:text-amber-400" />}
      iconBg="bg-amber-100 dark:bg-amber-950/30"
      title="Başvurunuz İnceleniyor"
      desc="Kurum kaydınız alındı. Platform ekibimiz başvurunuzu en kısa sürede inceleyecektir. Bu sayfayı yenileyerek güncel durumu görebilirsiniz."
    >
      <div className="rounded-xl border border-border bg-card p-5 text-left space-y-3">
        <div className="flex items-start gap-3">
          <Mail className="h-5 w-5 text-primary shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="text-sm font-medium text-foreground">Bildirim</p>
            <p className="text-xs text-muted-foreground">
              Onay veya ret kararı bu ekranda görünür; e-posta bildirimi de gönderilir.
            </p>
          </div>
        </div>
      </div>
      {loading && (
        <p className="text-xs text-muted-foreground">Güncel durum kontrol ediliyor…</p>
      )}
    </Shell>
  );
}

/** Ortak sayfa iskeleti — durum ekranları aynı düzeni paylaşır. */
function Shell({
  icon, iconBg, title, desc, children,
}: {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  desc: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6 text-center">
        <div className="flex justify-center">
          <div className={`h-16 w-16 rounded-full ${iconBg} flex items-center justify-center`}>
            {icon}
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground">{title}</h1>
          <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
        </div>

        {children}

        <p className="text-xs text-muted-foreground">
          Sorularınız için{' '}
          <a
            href="mailto:destek@mentimentor.io"
            className="text-primary underline underline-offset-2 hover:text-primary/80"
          >
            destek@mentimentor.io
          </a>{' '}
          adresine yazabilirsiniz.
        </p>

        <Link
          href="/login"
          className="inline-block text-sm text-muted-foreground hover:text-foreground underline underline-offset-2 transition-colors"
        >
          Giriş Sayfasına Dön
        </Link>
      </div>
    </div>
  );
}
