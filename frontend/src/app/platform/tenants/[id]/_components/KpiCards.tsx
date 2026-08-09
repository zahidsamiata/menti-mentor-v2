import type { TenantOverview } from '@/lib/api/platform';

export function KpiCards({ counts }: { counts: TenantOverview['counts'] }) {
  const cards = [
    { label: 'Mentörler', value: counts.mentors },
    { label: 'Mentiler', value: counts.mentis },
    { label: 'Görüşmeler', value: counts.meetings },
    { label: 'Üyeler', value: counts.members },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {cards.map((c) => (
        <div key={c.label} className="rounded-xl bg-card border border-border p-4">
          <p className="text-xs text-muted-foreground">{c.label}</p>
          <p className="text-2xl font-bold mt-1 text-foreground">{c.value}</p>
        </div>
      ))}
    </div>
  );
}
