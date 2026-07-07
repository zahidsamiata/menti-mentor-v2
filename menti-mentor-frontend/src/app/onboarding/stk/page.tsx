import type { Metadata } from 'next';
import StkOnboardingContent from './_StkOnboardingContent';

export const metadata: Metadata = { title: 'Kurumunu Kur — MentiMentor' };

export default function StkOnboardingPage() {
  return <StkOnboardingContent />;
}
