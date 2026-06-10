'use client';

import { useSearchParams } from 'next/navigation';
import { RegisterForm } from '@/components/organisms/RegisterForm';

export default function RegisterContent() {
  const params = useSearchParams();
  return <RegisterForm initialTenantSlug={params.get('tenant') ?? ''} />;
}
