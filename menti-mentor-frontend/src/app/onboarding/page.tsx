/**
 * /onboarding — Profil Tamamlama & DISC Test Wizard
 *
 * Yapı:
 *  page.tsx (server) → <Suspense> → _OnboardingContent (client)
 *    → ProfileStep  (adım 1)
 *    → DiscTestStep (adım 2)
 *    → ResultStep   (adım 3)
 *
 * Layout notu: (dashboard) grubunun dışında; sidebar yoktur.
 * Odaklanmış, tam ekran wizard deneyimi için root layout yeterlidir.
 */

import { Suspense } from 'react';
import { type Metadata } from 'next';
import OnboardingContent from './_OnboardingContent';

export const metadata: Metadata = {
  title:       'Profilini Tamamla',
  description: 'Seni en iyi eşleşmeye kavuşturacak profil adımları.',
};

function OnboardingShell() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="h-12 w-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
    </div>
  );
}

export default function OnboardingPage() {
  return (
    <Suspense fallback={<OnboardingShell />}>
      <OnboardingContent />
    </Suspense>
  );
}
