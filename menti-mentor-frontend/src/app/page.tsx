import { redirect } from 'next/navigation';

/** Root URL — kimlik doğrulama gerektiren uygulamada giriş sayfasına yönlendir. */
export default function RootPage() {
  redirect('/login');
}
