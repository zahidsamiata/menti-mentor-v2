import { apiClient } from './client';
import type { InvitationData, InvitationResult } from '@/types/invitation';

/**
 * Davet tokenını doğrular ve tenant branding verisini döner.
 * Public endpoint — auth token gerektirmez.
 */
export async function fetchInvitation(token: string): Promise<InvitationResult> {
  // JWT noktaları URL path'inde encode edilmeden taşınır; encodeURIComponent yine de
  // güvenli olması için uygulanır (özellikle + gibi edge case karakterleri için).
  const result = await apiClient<InvitationData>(
    `/api/invitations/${encodeURIComponent(token)}/join`,
    { withRefresh: false },
  );

  if (result.ok) return result.data;

  return {
    valid:   false,
    error:   result.error.error ?? 'BILINMEYEN_HATA',
    message: result.error.message ?? 'Davet linki doğrulanamadı.',
  };
}
