import type { TenantMember, TenantMemberRole } from '@/lib/api/platform';

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
      return 'bg-indigo-900/60 text-indigo-400';
    case 'MENTOR':
      return 'bg-sky-900/60 text-sky-400';
    case 'MENTI':
      return 'bg-slate-700 text-slate-300';
  }
}

export function MembersTable({
  members,
  loading,
  roleFilter,
  onRoleFilterChange,
}: {
  members: TenantMember[];
  loading: boolean;
  roleFilter: RoleFilter;
  onRoleFilterChange: (role: RoleFilter) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-1">
        {ROLE_FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => onRoleFilterChange(f.key)}
            className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
              roleFilter === f.key
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-slate-400 text-sm">Yükleniyor…</p>
      ) : members.length === 0 ? (
        <p className="text-slate-400 text-sm">Üye bulunamadı.</p>
      ) : (
        <div className="rounded-xl border border-slate-700 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-800 text-slate-400">
              <tr>
                <th className="px-4 py-3 text-left">Ad</th>
                <th className="px-4 py-3 text-left">Rol</th>
                <th className="px-4 py-3 text-left">E-posta (maskeli)</th>
                <th className="px-4 py-3 text-left">DISC</th>
                <th className="px-4 py-3 text-left">Sertifika</th>
                <th className="px-4 py-3 text-left">Journey</th>
                <th className="px-4 py-3 text-left">Katılım</th>
                <th className="px-4 py-3 text-left">Aktif</th>
              </tr>
            </thead>
            <tbody>
              {members.map((m) => (
                <tr key={m.id} className="border-t border-slate-800 hover:bg-slate-800/30">
                  <td className="px-4 py-3 text-white">{m.fullName}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${roleBadgeClass(m.role)}`}>
                      {ROLE_LABEL[m.role]}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-400 font-mono text-xs">{m.emailMasked}</td>
                  <td className="px-4 py-3 text-slate-300">{m.discType ?? '—'}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      m.isCertified ? 'bg-green-900/60 text-green-400' : 'bg-slate-700 text-slate-400'
                    }`}>
                      {m.certificationStatus}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-400 text-xs whitespace-nowrap">
                    {m.learningJourneyCompletedAt
                      ? new Date(m.learningJourneyCompletedAt).toLocaleDateString('tr-TR')
                      : '—'}
                  </td>
                  <td className="px-4 py-3 text-slate-400 text-xs whitespace-nowrap">
                    {new Date(m.joinedAt).toLocaleDateString('tr-TR')}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      m.isActive ? 'bg-green-900/60 text-green-400' : 'bg-red-900/60 text-red-400'
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
