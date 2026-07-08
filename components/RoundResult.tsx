"use client";

import { useEffect, useState } from "react";
import { formatDistance } from "@/lib/scoring";
import { MAX_POINTS_PER_ROUND } from "@/lib/types";

interface RoundResultProps {
  distanceKm: number;
  points: number;
  bearing: number;
  roundNumber: number;
  totalRounds: number;
  isLastRound: boolean;
  onNext: () => void;
}

export default function RoundResult({
  distanceKm,
  points,
  bearing,
  roundNumber,
  totalRounds,
  isLastRound,
  onNext
}: RoundResultProps) {
  const [needleRotation, setNeedleRotation] = useState(0);

  useEffect(() => {
    setNeedleRotation(0);
    const t = setTimeout(() => setNeedleRotation(bearing), 80);
    return () => clearTimeout(t);
  }, [bearing]);

  const pct = Math.round((points / MAX_POINTS_PER_ROUND) * 100);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-6 bg-chart-ink/95 px-6 py-8 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-chart-fog">
        Kolo {roundNumber} / {totalRounds}
      </p>

      {/* Signature element: brass compass rose pointing toward the real spot */}
      <div className="relative flex h-40 w-40 items-center justify-center">
        <svg viewBox="0 0 200 200" className="h-full w-full">
          <circle cx="100" cy="100" r="92" fill="none" stroke="#2E5A57" strokeWidth="1.5" />
          <circle cx="100" cy="100" r="70" fill="none" stroke="#C9A24B" strokeOpacity="0.4" strokeWidth="1" />
          {Array.from({ length: 36 }).map((_, i) => {
            const angle = (i * 10 * Math.PI) / 180;
            const long = i % 9 === 0;
            const r1 = long ? 78 : 86;
            const x1 = 100 + r1 * Math.sin(angle);
            const y1 = 100 - r1 * Math.cos(angle);
            const x2 = 100 + 92 * Math.sin(angle);
            const y2 = 100 - 92 * Math.cos(angle);
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#C9A24B"
                strokeWidth={long ? 1.5 : 0.75}
                strokeOpacity={long ? 0.9 : 0.5}
              />
            );
          })}
          <text x="100" y="24" textAnchor="middle" fill="#E4C778" fontSize="12" fontFamily="var(--font-mono)">N</text>

          <g className="compass-needle" style={{ transform: `rotate(${needleRotation}deg)` }}>
            <polygon points="100,32 108,104 100,96 92,104" fill="#B4542D" />
            <polygon points="100,168 108,96 100,104 92,96" fill="#EDE6D3" />
          </g>
          <circle cx="100" cy="100" r="5" fill="#0B1A24" stroke="#C9A24B" strokeWidth="1.5" />
        </svg>
      </div>

      <div className="space-y-1">
        <p className="font-display text-3xl text-chart-parchment">{formatDistance(distanceKm)}</p>
        <p className="font-mono text-xs uppercase tracking-widest text-chart-fog">od skutočného miesta</p>
      </div>

      <div className="w-full max-w-xs space-y-2">
        <div className="h-2 w-full overflow-hidden rounded-full bg-chart-deep">
          <div
            className="h-full rounded-full bg-chart-brass transition-all duration-700"
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="font-mono text-sm text-chart-brasslight">{points.toLocaleString("sk-SK")} bodov</p>
      </div>

      <button
        onClick={onNext}
        className="rounded-sm border border-chart-brass/60 bg-chart-brass/10 px-6 py-3 font-mono text-sm uppercase tracking-widest text-chart-brasslight transition hover:bg-chart-brass/20"
      >
        {isLastRound ? "Zobraziť výsledky" : "Ďalšie kolo →"}
      </button>
    </div>
  );
}
