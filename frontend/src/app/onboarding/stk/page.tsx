import type { Metadata } from 'next';
import { PRIVATE_AREA_METADATA } from '@/lib/privateAreaMetadata';
import StkOnboardingContent from './_StkOnboardingContent';

// AJ-47: `/onboarding` robots.txt'de artık kapalı değil; kayıt sihirbazı eskisi gibi dizin dışında kalsın.
export const metadata: Metadata = { title: 'Kurumunu Kur — MentiMentor', ...PRIVATE_AREA_METADATA };

export default function StkOnboardingPage() {
  return <StkOnboardingContent />;
}
