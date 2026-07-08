"use client";

import { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import GameHUD from "@/components/GameHUD";
import RoundResult from "@/components/RoundResult";
import FinalScore from "@/components/FinalScore";
import { haversineDistanceKm, scoreFromDistance, bearingDegrees } from "@/lib/scoring";
import { Guess, RoundLocation, RoundResult as RoundResultType, TOTAL_ROUNDS } from "@/lib/types";

const StreetView = dynamic(() => import("@/components/StreetView"), { ssr: false });
const GuessMap = dynamic(() => import("@/components/GuessMap"), { ssr: false });

type Phase = "intro" | "loading" | "guessing" | "result" | "final";

export default function Home() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [round, setRound] = useState<RoundLocation | null>(null);
  const [roundNumber, setRoundNumber] = useState(1);
  const [guess, setGuess] = useState<Guess | null>(null);
  const [mapExpanded, setMapExpanded] = useState(false);
  const [results, setResults] = useState<RoundResultType[]>([]);
  const [error, setError] = useState<string | null>(null);

  const loadRound = useCallback(async () => {
    setPhase("loading");
    setError(null);
    setGuess(null);
    try {
      const res = await fetch("/api/random-location");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Neznáma chyba");
      setRound({ imageId: data.imageId, lat: data.lat, lng: data.lng });
      setPhase("guessing");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Nepodarilo sa načítať kolo.");
      setPhase("guessing");
    }
  }, []);

  const startGame = () => {
    setRoundNumber(1);
    setResults([]);
    loadRound();
  };

  const submitGuess = () => {
    if (!round || !guess) return;
    const distanceKm = haversineDistanceKm(guess.lat, guess.lng, round.lat, round.lng);
    const points = scoreFromDistance(distanceKm);
    setResults((prev) => [...prev, { round, guess, distanceKm, points }]);
    setPhase("result");
    setMapExpanded(false);
  };

  const nextRound = () => {
    if (roundNumber >= TOTAL_ROUNDS) {
      setPhase("final");
      return;
    }
    setRoundNumber((n) => n + 1);
    loadRound();
  };

  const totalScore = results.reduce((sum, r) => sum + r.points, 0);
  const lastResult = results[results.length - 1];

  if (phase === "intro") {
    return (
      <main className="flex h-dvh w-full flex-col items-center justify-center gap-8 px-6 text-center">
        <div className="space-y-4">
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-chart-fog">Zadarmo · Celosvetovo</p>
          <h1 className="font-display text-5xl italic text-chart-parchment">Atlas Guess</h1>
          <p className="mx-auto max-w-md font-body text-sm text-chart-fog">
            Piati kolá, jeden svet. Pozri sa na fotku ulice a klikni na mapu presne tam,
            kde si myslíš, že bola odfotená. Čím bližšie, tým viac bodov.
          </p>
        </div>
        <button
          onClick={startGame}
          className="rounded-sm border border-chart-brass/60 bg-chart-brass/10 px-8 py-3 font-mono text-sm uppercase tracking-widest text-chart-brasslight transition hover:bg-chart-brass/20"
        >
          Začať hru
        </button>
      </main>
    );
  }

  if (phase === "final") {
    return (
      <main className="h-dvh w-full">
        <FinalScore results={results} onPlayAgain={startGame} />
      </main>
    );
  }

  return (
    <main className="relative h-dvh w-full overflow-hidden bg-chart-ink">
      {phase !== "loading" && <GameHUD round={roundNumber} totalRounds={TOTAL_ROUNDS} score={totalScore} />}

      {phase === "loading" && (
        <div className="flex h-full w-full items-center justify-center">
          <p className="font-mono text-sm uppercase tracking-widest text-chart-brasslight">
            Hľadám miesto na mape…
          </p>
        </div>
      )}

      {phase === "guessing" && round && (
        <>
          <div className="absolute inset-0">
            <StreetView imageId={round.imageId} />
          </div>

          {error && (
            <p className="absolute left-1/2 top-16 -translate-x-1/2 rounded-sm bg-chart-rust/90 px-4 py-2 font-mono text-xs text-chart-paper">
              {error}
            </p>
          )}

          {/* Collapsible guess map, classic-mode style, bottom-right corner */}
          <div
            className={`absolute bottom-5 right-5 z-[400] overflow-hidden rounded-sm border border-chart-brass/40 shadow-instrument transition-all duration-300 ${
              mapExpanded ? "h-[70vh] w-[85vw] max-w-2xl" : "h-40 w-56 hover:h-48 hover:w-64"
            }`}
            onMouseEnter={() => setMapExpanded(true)}
            onMouseLeave={() => setMapExpanded(false)}
          >
            <GuessMap mode="guess" guess={guess} onGuess={(lat, lng) => setGuess({ lat, lng })} />
          </div>

          {guess && (
            <button
              onClick={submitGuess}
              className="absolute bottom-5 left-1/2 z-[450] -translate-x-1/2 rounded-sm border border-chart-brass/60 bg-chart-ink px-8 py-3 font-mono text-sm uppercase tracking-widest text-chart-brasslight shadow-instrument transition hover:bg-chart-brass/20"
            >
              Potvrdiť tip
            </button>
          )}
        </>
      )}

      {phase === "result" && lastResult && (
        <div className="grid h-full w-full grid-cols-1 md:grid-cols-2">
          <div className="relative hidden md:block">
            <GuessMap mode="reveal" guess={lastResult.guess} actual={lastResult.round} />
          </div>
          <RoundResult
            distanceKm={lastResult.distanceKm}
            points={lastResult.points}
            bearing={bearingDegrees(
              lastResult.guess?.lat ?? lastResult.round.lat,
              lastResult.guess?.lng ?? lastResult.round.lng,
              lastResult.round.lat,
              lastResult.round.lng
            )}
            roundNumber={roundNumber}
            totalRounds={TOTAL_ROUNDS}
            isLastRound={roundNumber >= TOTAL_ROUNDS}
            onNext={nextRound}
          />
        </div>
      )}
    </main>
  );
}
