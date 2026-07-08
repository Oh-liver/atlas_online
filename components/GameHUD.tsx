interface GameHUDProps {
  round: number;
  totalRounds: number;
  score: number;
}

export default function GameHUD({ round, totalRounds, score }: GameHUDProps) {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-[500] flex items-center justify-between px-5 py-4">
      <div className="pointer-events-auto flex items-center gap-3 rounded-sm border border-chart-brass/30 bg-chart-ink/80 px-4 py-2 backdrop-blur">
        <span className="font-display italic text-lg text-chart-brasslight">Atlas Guess</span>
        <span className="h-4 w-px bg-chart-brass/30" />
        <span className="font-mono text-xs uppercase tracking-widest text-chart-fog">
          Kolo {round} / {totalRounds}
        </span>
      </div>
      <div className="pointer-events-auto rounded-sm border border-chart-brass/30 bg-chart-ink/80 px-4 py-2 backdrop-blur">
        <span className="font-mono text-xs uppercase tracking-widest text-chart-fog">Skóre </span>
        <span className="font-mono text-sm text-chart-brasslight">{score.toLocaleString("sk-SK")}</span>
      </div>
    </div>
  );
}
