import Link from 'next/link';
import type { TenantMember, TenantMemberRole } from '@/lib/api/platform';
import { certStatusBadge } from '@/lib/enumLabels';
import { UI_TEXT } from '@/lib/uiText';
import { DANGER_PILL_CLASS, INFO_PILL_CLASS, SUCCESS_PILL_CLASS } from '@/lib/a11y/statusColors';

type RoleFilter = TenantMemberRole | 'ALL';

const ROLE_FILTERS: { key: RoleFilter; label: string }[] = [
  { key: 'ALL', label: 'Hepsi' },
  { key: 'MENTOR', label: 'Mentörler' },
  { key: 'MENTI', label: 'Mentiler' },
  { key: 'ADMIN', label: 'Adminler' },
];

const ROLE_LABEL: Record<TenantMemberRole, string> = {
  ADMIN: 'Admin',
  MENTOR: 'Mentör',
  MENTI: 'Menti',
};

function roleBadgeClass(role: TenantMemberRole): string {
  switch (role) {
    case 'ADMIN':
      return 'bg-primary/15 text-primary';
    case 'MENTOR':
      return INFO_PILL_CLASS;
    case 'MENTI':
      return 'bg-muted text-muted-foreground';
  }
}

export function MembersTable({
  tenantId,
  members,
  loading,
  roleFilter,
  onRoleFilterChange,
}: {
  tenantId: string;
  members: TenantMember[];
  loading: boolean;
  roleFilter: RoleFilter;
  onRoleFilterChange: (role: RoleFilter) => void;
}) {
  return (
    <div className="space-y-4">
      {/* AJ-85: görünür başlık yok → grup adı aria-label; seçili filtre aria-pressed ile duyurulur. */}
      <div className="flex flex-wrap gap-1" role="group" aria-label="Role göre filtrele">
        {ROLE_FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            aria-pressed={roleFilter === f.key}
            onClick={() => onRoleFilterChange(f.key)}
            className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
              roleFilter === f.key
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:text-foreground'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-muted-foreground text-sm">{UI_TEXT.status.loading}</p>
      ) : members.length === 0 ? (
        <p className="text-muted-foreground text-sm">Üye bulunamadı.</p>
      ) : (
        <div className="rounded-xl border border-border overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted text-muted-foreground">
              <tr>
                <th className="px-4 py-3 text-left">Ad</th>
                <th className="px-4 py-3 text-left">Rol</th>
                <th className="px-4 py-3 text-left">E-posta (maskeli)</th>
                <th className="px-4 py-3 text-left">DISC</th>
                <th className="px-4 py-3 text-left">Sertifika</th>
                <th className="px-4 py-3 text-left">Öğrenme Yolculuğu</th>
                <th className="px-4 py-3 text-left">Katılım</th>
                <th className="px-4 py-3 text-left">Aktif</th>
              </tr>
            </thead>
            <tbody>
              {members.map((m) => (
                <tr key={m.id} className="border-t border-border hover:bg-muted/50">
                  <td className="px-4 py-3 text-foreground">
                    <Link
                      href={`/platform/tenants/${tenantId}/users/${m.id}`}
                      className="hover:text-primary hover:underline"
                    >
                      {m.fullName}
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${roleBadgeClass(m.role)}`}>
                      {ROLE_LABEL[m.role]}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground font-mono text-xs">{m.emailMasked}</td>
                  <td className="px-4 py-3 text-foreground">{m.discType ?? '—'}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${certStatusBadge(m.certificationStatus).className}`}>
                      {certStatusBadge(m.certificationStatus).label}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground text-xs whitespace-nowrap">
                    {m.learningJourneyCompletedAt
                      ? new Date(m.learningJourneyCompletedAt).toLocaleDateString('tr-TR')
                      : '—'}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground text-xs whitespace-nowrap">
                    {new Date(m.joinedAt).toLocaleDateString('tr-TR')}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      m.isActive ? SUCCESS_PILL_CLASS : DANGER_PILL_CLASS
                    }`}>
                      {m.isActive ? 'Aktif' : 'Pasif'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export type { RoleFilter };
