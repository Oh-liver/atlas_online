import { RoundResult, MAX_POINTS_PER_ROUND, TOTAL_ROUNDS } from "@/lib/types";
import { formatDistance } from "@/lib/scoring";

interface FinalScoreProps {
  results: RoundResult[];
  onPlayAgain: () => void;
}

export default function FinalScore({ results, onPlayAgain }: FinalScoreProps) {
  const total = results.reduce((sum, r) => sum + r.points, 0);
  const maxTotal = MAX_POINTS_PER_ROUND * TOTAL_ROUNDS;

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-8 bg-chart-ink px-6 py-10 text-center">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.35em] text-chart-fog">Cestovný denník</p>
        <h1 className="mt-3 font-display text-4xl text-chart-parchment">
          {total.toLocaleString("sk-SK")}
          <span className="text-chart-fog"> / {maxTotal.toLocaleString("sk-SK")}</span>
        </h1>
      </div>

      <div className="w-full max-w-md space-y-2">
        {results.map((r, i) => (
          <div
            key={i}
            className="flex items-center justify-between rounded-sm border border-chart-brass/20 bg-chart-deep/60 px-4 py-3"
          >
            <span className="font-mono text-xs uppercase tracking-widest text-chart-fog">Kolo {i + 1}</span>
            <span className="font-mono text-sm text-chart-parchment">{formatDistance(r.distanceKm)}</span>
            <span className="font-mono text-sm text-chart-brasslight">{r.points.toLocaleString("sk-SK")} b</span>
          </div>
        ))}
      </div>

      <button
        onClick={onPlayAgain}
        className="rounded-sm border border-chart-brass/60 bg-chart-brass/10 px-8 py-3 font-mono text-sm uppercase tracking-widest text-chart-brasslight transition hover:bg-chart-brass/20"
      >
        Hrať znova
      </button>
    </div>
  );
}
