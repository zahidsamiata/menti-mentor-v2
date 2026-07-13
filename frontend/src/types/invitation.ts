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
  invitedByName:   string | null;
  invitedByTitle:  string | null;
}

export interface InvitationTokenError {
  valid:   false;
  error:   string;
  message: string;
}

export type InvitationResult = InvitationData | InvitationTokenError;
