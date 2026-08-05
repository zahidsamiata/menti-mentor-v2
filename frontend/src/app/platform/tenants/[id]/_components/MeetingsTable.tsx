import type { TenantMeeting } from '@/lib/api/platform';

const STATUS_LABEL: Record<string, string> = {
  PENDING: 'Beklemede',
  SCHEDULED: 'Planlandı',
  IN_PROGRESS: 'Devam Ediyor',
  APPROVED: 'Onaylandı',
  COMPLETED: 'Tamamlandı',
  CANCELLED: 'İptal',
};

function statusBadgeClass(status: string): string {
  switch (status) {
    case 'COMPLETED':
    case 'APPROVED':
      return 'bg-green-900/60 text-green-400';
    case 'CANCELLED':
      return 'bg-red-900/60 text-red-400';
    case 'PENDING':
      return 'bg-yellow-900/60 text-yellow-400';
    case 'IN_PROGRESS':
      return 'bg-indigo-900/60 text-indigo-400';
    case 'SCHEDULED':
      return 'bg-sky-900/60 text-sky-400';
    default:
      return 'bg-slate-700 text-slate-400';
  }
}

export function MeetingsTable({
  meetings,
  loading,
}: {
  meetings: TenantMeeting[];
  loading: boolean;
}) {
  if (loading) return <p className="text-slate-400 text-sm">Yükleniyor…</p>;
  if (meetings.length === 0) return <p className="text-slate-400 text-sm">Görüşme bulunamadı.</p>;

  return (
    <div className="rounded-xl border border-slate-700 overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-slate-800 text-slate-400">
          <tr>
            <th className="px-4 py-3 text-left">Tarih</th>
            <th className="px-4 py-3 text-left">Mentör</th>
            <th className="px-4 py-3 text-left">Menti</th>
            <th className="px-4 py-3 text-left">Durum</th>
            <th className="px-4 py-3 text-left">Format</th>
            <th className="px-4 py-3 text-left">Geri bildirim</th>
          </tr>
        </thead>
        <tbody>
          {meetings.map((m) => (
            <tr key={m.id} className="border-t border-slate-800 hover:bg-slate-800/30">
              <td className="px-4 py-3 text-slate-300 whitespace-nowrap">
                {new Date(m.startsAt).toLocaleString('tr-TR')}
              </td>
              <td className="px-4 py-3 text-white">{m.mentor.fullName}</td>
              <td className="px-4 py-3 text-white">{m.menti.fullName}</td>
              <td className="px-4 py-3">
                <span className={`text-xs px-2 py-0.5 rounded-full ${statusBadgeClass(m.status)}`}>
                  {STATUS_LABEL[m.status] ?? m.status}
                </span>
              </td>
              <td className="px-4 py-3 text-slate-400">{m.format}</td>
              <td className="px-4 py-3">
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  m.hasFeedback ? 'bg-green-900/60 text-green-400' : 'bg-slate-700 text-slate-400'
                }`}>
                  {m.hasFeedback ? 'Var' : 'Yok'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
