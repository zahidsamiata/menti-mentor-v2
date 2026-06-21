/**
 * GET /api/invitations/:token/join endpoint yanıt tipleri.
 */

export interface InvitationData {
  valid:           true;
  role:            'MENTOR' | 'MENTI';
  tenantName:      string;
  slug:            string;
  logoUrl:         string | null;
  primaryColor:    string;
  programTemplate: string | null;
  plan:            string;
}

export interface InvitationTokenError {
  valid:   false;
  error:   string;
  message: string;
}

export type InvitationResult = InvitationData | InvitationTokenError;
