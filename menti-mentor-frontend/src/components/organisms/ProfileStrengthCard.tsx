'use client';

import { useEffect, useState } from 'react';
import { Sparkles, ArrowRight, Zap } from 'lucide-react';

interface ProfileStrengthCardProps {
  percent: number;
  hint: string;
  pendingQuestions?: number;
  onContinue?: () => void;
}

export default function ProfileStrengthCard({
  percent,
  hint,
  pendingQuestions = 0,
  onContinue,
}: ProfileStrengthCardProps) {
  const [animatedPercent, setAnimatedPercent] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setAnimatedPercent(percent), 120);
    return () => clearTimeout(t);
  }, [percent]);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50">
            <Sparkles className="h-4 w-4 text-indigo-600" />
          </div>
          <span className="text-sm font-semibold text-slate-800">Profil Gücün</span>
        </div>
        <span className="text-lg font-bold tabular-nums text-indigo-600">%{percent}</span>
      </div>

      <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-1000 ease-out"
          style={{ width: `${animatedPercent}%` }}
        />
      </div>

      <p className="mt-3 text-xs text-slate-500">{hint}</p>

      {pendingQuestions > 0 && (
        <button
          onClick={onContinue}
          className="mt-4 flex w-full items-center justify-between rounded-xl bg-indigo-50 px-4 py-3 text-sm font-medium text-indigo-700 transition hover:bg-indigo-100"
        >
          <span className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            {pendingQuestions} kısa soru daha
          </span>
          <ArrowRight className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
