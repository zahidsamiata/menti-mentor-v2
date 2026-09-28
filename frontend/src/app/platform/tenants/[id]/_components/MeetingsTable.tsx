import type { TenantMeeting } from '@/lib/api/platform';
import { meetingFormatLabel } from '@/lib/enumLabels';
import { UI_TEXT } from '@/lib/uiText';
import { DANGER_PILL_CLASS, INFO_PILL_CLASS, SUCCESS_PILL_CLASS, WARNING_PILL_CLASS } from '@/lib/a11y/statusColors';

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
      return SUCCESS_PILL_CLASS;
    case 'CANCELLED':
      return DANGER_PILL_CLASS;
    case 'PENDING':
      return WARNING_PILL_CLASS;
    case 'IN_PROGRESS':
      return 'bg-primary/15 text-primary';
    case 'SCHEDULED':
      return INFO_PILL_CLASS;
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
  if (loading) return <p className="text-muted-foreground text-sm">{UI_TEXT.status.loading}</p>;
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
              <td className="px-4 py-3 text-muted-foreground">{meetingFormatLabel(m.format)}</td>
              <td className="px-4 py-3">
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  m.hasFeedback ? SUCCESS_PILL_CLASS : 'bg-muted text-muted-foreground'
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
