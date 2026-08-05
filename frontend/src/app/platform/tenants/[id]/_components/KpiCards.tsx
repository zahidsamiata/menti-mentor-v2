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
        <div key={c.label} className="rounded-xl bg-slate-800/60 border border-slate-700 p-4">
          <p className="text-xs text-slate-400">{c.label}</p>
          <p className="text-2xl font-bold mt-1 text-white">{c.value}</p>
        </div>
      ))}
    </div>
  );
}
