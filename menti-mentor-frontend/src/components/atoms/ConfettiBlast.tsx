'use client';

/**
 * Atom: ConfettiBlast
 * Bağımlılıksız, saf CSS konfeti animasyonu.
 * Mountlandığında 60 renkli parçacık dökülür, 4 saniyede kaybolur.
 */

import { useMemo } from 'react';

const COLORS = [
  '#6366f1', '#8b5cf6', '#ec4899', '#f59e0b',
  '#10b981', '#3b82f6', '#ef4444', '#f97316',
  '#a3e635', '#06b6d4',
];

interface Particle {
  id:       number;
  x:        number;  // % başlangıç x konumu
  delay:    number;  // saniye
  duration: number;  // saniye
  color:    string;
  size:     number;  // px
  skew:     number;  // başlangıç rotasyonu (deg)
}

function seededRand(seed: number): number {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

export function ConfettiBlast() {
  const particles = useMemo<Particle[]>(() =>
    Array.from({ length: 60 }, (_, i) => ({
      id:       i,
      x:        seededRand(i * 3)     * 100,
      delay:    seededRand(i * 7)     * 1.8,
      duration: 2.5 + seededRand(i * 13) * 2,
      color:    COLORS[i % COLORS.length]!,
      size:     6 + Math.floor(seededRand(i * 17) * 8),
      skew:     seededRand(i * 5)     * 360,
    })), []);

  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden z-[9999]"
      aria-hidden
    >
      {/* Keyframe animasyonu inline olarak tanımlanır; globals.css değiştirilmez */}
      <style>{`
        @keyframes confetti-fall {
          0%   { transform: translateY(-30px) rotate(0deg); opacity: 1; }
          80%  { opacity: 1; }
          100% { transform: translateY(105vh) rotate(700deg); opacity: 0; }
        }
      `}</style>

      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position:         'absolute',
            left:             `${p.x}%`,
            top:              0,
            width:            p.size,
            height:           p.size * (seededRand(p.id * 11) > 0.5 ? 2.5 : 1),
            backgroundColor:  p.color,
            borderRadius:     seededRand(p.id * 9) > 0.5 ? '50%' : '2px',
            transform:        `rotate(${p.skew}deg)`,
            animation:        `confetti-fall ${p.duration}s ${p.delay}s ease-in forwards`,
          }}
        />
      ))}
    </div>
  );
}
