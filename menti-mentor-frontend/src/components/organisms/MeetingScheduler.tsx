'use client';

import { useState, type ReactNode } from 'react';
import { Calendar, Clock, Video, MapPin, Phone, Plus, X, Check } from 'lucide-react';

// Backend Prisma enum değerleriyle birebir eşleşmeli (BÜYÜK HARF)
type MeetingFormat = 'ONLINE' | 'IN_PERSON' | 'PHONE';

// Backend Weekday enum değerleriyle birebir eşleşmeli
type Weekday = 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN';

// Backend /api/meetings/availability beklentisiyle uyumlu alan adları
export interface TimeBlock {
  id: string;
  weekday: Weekday;    // backend: weekday (Weekday enum)
  startTime: string;  // backend: startTime "HH:MM"
  endTime: string;    // backend: endTime  "HH:MM"
}

interface MeetingSchedulerProps {
  mode: 'mentor' | 'menti';
  initialBlocks?: TimeBlock[];
  onSaveAvailability?: (blocks: TimeBlock[]) => void;
  availableBlocks?: TimeBlock[];
  onBook?: (block: TimeBlock, format: MeetingFormat) => void;
}

const DAYS: { value: Weekday; label: string }[] = [
  { value: 'MON', label: 'Pzt'  },
  { value: 'TUE', label: 'Salı' },
  { value: 'WED', label: 'Çar'  },
  { value: 'THU', label: 'Per'  },
  { value: 'FRI', label: 'Cuma' },
  { value: 'SAT', label: 'Cmt'  },
  { value: 'SUN', label: 'Paz'  },
];

const HOURS = Array.from({ length: 14 }, (_, i) => `${String(i + 8).padStart(2, '0')}:00`);

// key değerleri backend MeetingFormat enum ile birebir eşleşiyor
const FORMATS: { key: MeetingFormat; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { key: 'ONLINE',    label: 'Online',    icon: Video  },
  { key: 'IN_PERSON', label: 'Yüz yüze', icon: MapPin },
  { key: 'PHONE',     label: 'Telefon',   icon: Phone  },
];

export default function MeetingScheduler(props: MeetingSchedulerProps) {
  return props.mode === 'mentor' ? (
    <MentorAvailability {...props} />
  ) : (
    <MentiBooking {...props} />
  );
}

function MentorAvailability({ initialBlocks = [], onSaveAvailability }: MeetingSchedulerProps) {
  const [blocks, setBlocks] = useState<TimeBlock[]>(initialBlocks);
  const [draft, setDraft] = useState<{ weekday: Weekday; startTime: string; endTime: string }>({
    weekday:   'TUE',
    startTime: '14:00',
    endTime:   '16:00',
  });

  const addBlock = () => {
    if (draft.startTime >= draft.endTime) return;
    setBlocks((b) => [...b, { id: crypto.randomUUID(), ...draft }]);
  };

  const removeBlock = (id: string) => setBlocks((b) => b.filter((x) => x.id !== id));

  const dayLabel = (weekday: Weekday) =>
    DAYS.find((d) => d.value === weekday)?.label ?? weekday;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center gap-2">
        <Calendar className="h-5 w-5 text-indigo-600" />
        <h3 className="text-base font-semibold text-slate-800">Müsaitlik Saatlerin</h3>
      </div>

      <div className="mb-4 flex flex-wrap items-end gap-3 rounded-xl bg-slate-50 p-4">
        <Field label="Gün">
          <select
            value={draft.weekday}
            onChange={(e) => setDraft({ ...draft, weekday: e.target.value as Weekday })}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
          >
            {DAYS.map((d) => (
              <option key={d.value} value={d.value}>{d.label}</option>
            ))}
          </select>
        </Field>
        <Field label="Başlangıç">
          <TimeSelect value={draft.startTime} onChange={(v) => setDraft({ ...draft, startTime: v })} />
        </Field>
        <Field label="Bitiş">
          <TimeSelect value={draft.endTime} onChange={(v) => setDraft({ ...draft, endTime: v })} />
        </Field>
        <button
          onClick={addBlock}
          className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4" /> Ekle
        </button>
      </div>

      <div className="space-y-2">
        {blocks.length === 0 && (
          <p className="py-4 text-center text-sm text-slate-400">Henüz müsaitlik eklemedin</p>
        )}
        {blocks.map((b) => (
          <div
            key={b.id}
            className="flex items-center justify-between rounded-lg border border-slate-100 bg-white px-4 py-2.5"
          >
            <div className="flex items-center gap-3 text-sm">
              <span className="rounded-md bg-indigo-50 px-2 py-0.5 font-medium text-indigo-700">
                {dayLabel(b.weekday)}
              </span>
              <span className="flex items-center gap-1 text-slate-600">
                <Clock className="h-3.5 w-3.5" />
                {b.startTime} – {b.endTime}
              </span>
            </div>
            <button
              onClick={() => removeBlock(b.id)}
              className="text-slate-300 transition hover:text-rose-500"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={() => onSaveAvailability?.(blocks)}
        className="mt-5 w-full rounded-xl bg-slate-900 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
      >
        Müsaitliği Kaydet
      </button>
    </div>
  );
}

function MentiBooking({ availableBlocks = [], onBook }: MeetingSchedulerProps) {
  const [selectedBlock, setSelectedBlock] = useState<TimeBlock | null>(null);
  const [format, setFormat] = useState<MeetingFormat>('ONLINE');

  const dayLabel = (weekday: Weekday) =>
    DAYS.find((d) => d.value === weekday)?.label ?? weekday;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center gap-2">
        <Calendar className="h-5 w-5 text-indigo-600" />
        <h3 className="text-base font-semibold text-slate-800">Görüşme Planla</h3>
      </div>

      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-400">Uygun saatler</p>
      <div className="mb-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {availableBlocks.map((b) => {
          const active = selectedBlock?.id === b.id;
          return (
            <button
              key={b.id}
              onClick={() => setSelectedBlock(b)}
              className={`rounded-xl border px-3 py-2.5 text-left text-sm transition ${
                active
                  ? 'border-indigo-500 bg-indigo-50 ring-1 ring-indigo-500'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="font-medium text-slate-800">{dayLabel(b.weekday)}</div>
              <div className="text-xs text-slate-500">{b.startTime} – {b.endTime}</div>
            </button>
          );
        })}
      </div>

      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-400">Görüşme formatı</p>
      <div className="mb-6 grid grid-cols-3 gap-2">
        {FORMATS.map(({ key, label, icon: Icon }) => {
          const active = format === key;
          return (
            <button
              key={key}
              onClick={() => setFormat(key)}
              className={`flex flex-col items-center gap-1.5 rounded-xl border py-3 transition ${
                active
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                  : 'border-slate-200 text-slate-600 hover:border-slate-300'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs font-medium">{label}</span>
            </button>
          );
        })}
      </div>

      <button
        disabled={!selectedBlock}
        onClick={() => selectedBlock && onBook?.(selectedBlock, format)}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
      >
        <Check className="h-4 w-4" />
        Görüşmeyi Oluştur
      </button>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-medium text-slate-500">{label}</span>
      {children}
    </div>
  );
}

function TimeSelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
    >
      {HOURS.map((h) => <option key={h}>{h}</option>)}
    </select>
  );
}
