import Link from 'next/link';

/**
 * Y-06 — Public sayfaların ortak alt bilgisi. Yasal metinlere (Gizlilik, KVKK,
 * Kullanım Koşulları, Metodoloji) tıklanabilir bağlantılar sağlar. Önceden bu
 * bağlantılar yalnız ana sayfada ve ölü `<span>` olarak duruyordu.
 */
const LEGAL_LINKS = [
  { href: '/gizlilik',   label: 'Gizlilik Politikası' },
  { href: '/kvkk',       label: 'KVKK Aydınlatma Metni' },
  { href: '/terms',      label: 'Kullanım Koşulları' },
  { href: '/metodoloji', label: 'Metodoloji' },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-muted/30 py-8 px-4 mt-12">
      <div className="mx-auto max-w-4xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground text-center">
          © {new Date().getFullYear()} MentiMentor · KVKK uyumlu · Türkiye&apos;de geliştirildi 🇹🇷
        </p>
        <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs" aria-label="Yasal bağlantılar">
          {LEGAL_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
