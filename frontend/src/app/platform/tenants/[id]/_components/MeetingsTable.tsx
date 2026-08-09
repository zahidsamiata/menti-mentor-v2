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
      return 'bg-green-900/60 text-emerald-600 dark:text-emerald-400';
    case 'CANCELLED':
      return 'bg-red-900/60 text-destructive';
    case 'PENDING':
      return 'bg-yellow-900/60 text-amber-600 dark:text-amber-400';
    case 'IN_PROGRESS':
      return 'bg-primary/15 text-primary';
    case 'SCHEDULED':
      return 'bg-sky-900/60 text-sky-600 dark:text-sky-400';
    default:
      return 'bg-muted text-muted-foreground';
  }
}

export function MeetingsTable({
  meetings,
  loading,
}: {
  meetings: TenantMeeting[];
  loading: boolean;
}) {
  if (loading) return <p className="text-muted-foreground text-sm">Yükleniyor…</p>;
  if (meetings.length === 0) return <p className="text-muted-foreground text-sm">Görüşme bulunamadı.</p>;

  return (
    <div className="rounded-xl border border-border overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-muted text-muted-foreground">
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
            <tr key={m.id} className="border-t border-border hover:bg-muted/50">
              <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                {new Date(m.startsAt).toLocaleString('tr-TR')}
              </td>
              <td className="px-4 py-3 text-foreground">{m.mentor.fullName}</td>
              <td className="px-4 py-3 text-foreground">{m.menti.fullName}</td>
              <td className="px-4 py-3">
                <span className={`text-xs px-2 py-0.5 rounded-full ${statusBadgeClass(m.status)}`}>
                  {STATUS_LABEL[m.status] ?? m.status}
                </span>
              </td>
              <td className="px-4 py-3 text-muted-foreground">{m.format}</td>
              <td className="px-4 py-3">
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  m.hasFeedback ? 'bg-green-900/60 text-emerald-600 dark:text-emerald-400' : 'bg-muted text-muted-foreground'
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
