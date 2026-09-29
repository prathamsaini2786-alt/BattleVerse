"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { characters } from "@/data/characters";

export default function BattlePage() {
  const searchParams = useSearchParams();

  const fighter1Id = searchParams.get("fighter1") || "gojo";
  const fighter2Id = searchParams.get("fighter2") || "luffy";

  const fighter1 =
    characters.find((character) => character.id === fighter1Id) ||
    characters[0];

  const fighter2 =
    characters.find((character) => character.id === fighter2Id) ||
    characters[1];

  const [health1, setHealth1] = useState(100);
  const [health2, setHealth2] = useState(100);
  const [round, setRound] = useState(0);
  const [battleLog, setBattleLog] = useState<string[]>([]);
  const [winner, setWinner] = useState<string | null>(null);
  const [battleStarted, setBattleStarted] = useState(false);

  const imagePath = (image: string) =>
    image.startsWith("/") ? image : `/characters/${image}`;

  const runBattle = () => {
    setHealth1(100);
    setHealth2(100);
    setRound(0);
    setBattleLog([]);
    setWinner(null);
    setBattleStarted(true);
  };

  useEffect(() => {
    if (!battleStarted || winner) return;

    if (health1 <= 0 || health2 <= 0) {
      if (health1 <= 0 && health2 <= 0) {
        setWinner("DRAW");
      } else if (health1 <= 0) {
        setWinner(fighter2.name);
      } else {
        setWinner(fighter1.name);
      }

      return;
    }

    const timer = setTimeout(() => {
      const attackerIsOne = Math.random() > 0.5;

      const baseDamage = attackerIsOne
        ? fighter1.power / 8
        : fighter2.power / 8;

      const randomFactor = 0.65 + Math.random() * 0.7;

      const damage = Math.max(
        5,
        Math.round(baseDamage * randomFactor)
      );

      if (attackerIsOne) {
        setHealth2((previous) =>
          Math.max(0, previous - damage)
        );

        setBattleLog((previous) => [
          `${fighter1.name} attacks ${fighter2.name} for ${damage} damage.`,
          ...previous,
        ]);
      } else {
        setHealth1((previous) =>
          Math.max(0, previous - damage)
        );

        setBattleLog((previous) => [
          `${fighter2.name} attacks ${fighter1.name} for ${damage} damage.`,
          ...previous,
        ]);
      }

      setRound((previous) => previous + 1);
    }, 900);

    return () => clearTimeout(timer);
  }, [
    battleStarted,
    winner,
    health1,
    health2,
    fighter1,
    fighter2,
  ]);

  return (
    <main className="min-h-screen bg-black px-6 py-12 text-white md:px-10">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-12 flex items-center justify-between">
          <a
            href="/"
            className="text-sm font-bold uppercase tracking-[0.25em] text-zinc-500 transition hover:text-white"
          >
            ← Battleverse
          </a>

          <p className="text-xs uppercase tracking-[0.3em] text-zinc-600">
            Battle Simulation
          </p>
        </div>

        {/* Title */}
        <div className="mb-12 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-purple-400">
            Simulation #{round + 1}
          </p>

          <h1 className="mt-4 text-5xl font-black uppercase tracking-[-0.05em] md:text-8xl">
            {fighter1.name}
            <span className="mx-4 text-zinc-700">VS</span>
            {fighter2.name}
          </h1>
        </div>

        {/* Fighters */}
        <div className="grid gap-6 md:grid-cols-[1fr_auto_1fr]">

          {/* Fighter 1 */}
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950 p-8">
            <div
              className={`absolute inset-0 bg-gradient-to-br ${fighter1.accent} opacity-50`}
            />

            <div className="relative z-10">

              <div className="mb-8 flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.3em] text-zinc-500">
                  Fighter 1
                </span>

                <span className="text-xs font-bold text-zinc-500">
                  {fighter1.universe}
                </span>
              </div>

              <div className="mx-auto mb-8 h-64 w-64 overflow-hidden rounded-full border border-white/10 bg-black">
                <img
                  src={imagePath(fighter1.image)}
                  alt={fighter1.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <h2 className="text-center text-4xl font-black uppercase">
                {fighter1.name}
              </h2>

              <p className="mt-2 text-center text-sm text-zinc-500">
                POWER {fighter1.power}
              </p>

              {/* Health */}
              <div className="mt-8">
                <div className="mb-2 flex justify-between text-xs uppercase tracking-widest">
                  <span className="text-zinc-500">Health</span>
                  <span>{health1}%</span>
                </div>

                <div className="h-3 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-white transition-all duration-500"
                    style={{ width: `${health1}%` }}
                  />
                </div>
              </div>

            </div>
          </div>

          {/* VS */}
          <div className="flex items-center justify-center">
            <div className="text-center">
              <div className="text-5xl font-black text-zinc-800">
                VS
              </div>

              <div className="mt-3 text-xs uppercase tracking-[0.3em] text-zinc-600">
                Round {round}
              </div>
            </div>
          </div>

          {/* Fighter 2 */}
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950 p-8">
            <div
              className={`absolute inset-0 bg-gradient-to-br ${fighter2.accent} opacity-50`}
            />

            <div className="relative z-10">

              <div className="mb-8 flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.3em] text-zinc-500">
                  Fighter 2
                </span>

                <span className="text-xs font-bold text-zinc-500">
                  {fighter2.universe}
                </span>
              </div>

              <div className="mx-auto mb-8 h-64 w-64 overflow-hidden rounded-full border border-white/10 bg-black">
                <img
                  src={imagePath(fighter2.image)}
                  alt={fighter2.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <h2 className="text-center text-4xl font-black uppercase">
                {fighter2.name}
              </h2>

              <p className="mt-2 text-center text-sm text-zinc-500">
                POWER {fighter2.power}
              </p>

              {/* Health */}
              <div className="mt-8">
                <div className="mb-2 flex justify-between text-xs uppercase tracking-widest">
                  <span className="text-zinc-500">Health</span>
                  <span>{health2}%</span>
                </div>

                <div className="h-3 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-white transition-all duration-500"
                    style={{ width: `${health2}%` }}
                  />
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Battle controls */}
        <div className="mt-10 flex justify-center">
          {!battleStarted || winner ? (
            <button
              onClick={runBattle}
              className="rounded-full bg-white px-10 py-4 text-sm font-black uppercase tracking-[0.2em] text-black transition hover:scale-105"
            >
              {winner ? "Fight Again →" : "Start Battle →"}
            </button>
          ) : (
            <div className="rounded-full border border-white/10 px-8 py-4 text-xs uppercase tracking-[0.3em] text-zinc-500">
              Battle in progress...
            </div>
          )}
        </div>

        {/* Winner */}
        {winner && (
          <div className="mt-12 rounded-[2rem] border border-purple-500/20 bg-purple-500/5 p-10 text-center">
            <p className="text-xs uppercase tracking-[0.4em] text-purple-400">
              Winner
            </p>

            <h2 className="mt-3 text-6xl font-black uppercase md:text-8xl">
              {winner}
            </h2>

            <p className="mt-4 text-sm text-zinc-500">
              Victory achieved after {round} rounds.
            </p>
          </div>
        )}

        {/* Battle log */}
        <div className="mt-12 rounded-[2rem] border border-white/10 bg-zinc-950 p-8">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-[0.3em]">
              Battle Log
            </h3>

            <span className="text-xs text-zinc-600">
              {battleLog.length} events
            </span>
          </div>

          <div className="max-h-64 space-y-3 overflow-y-auto">
            {battleLog.length === 0 ? (
              <p className="text-sm text-zinc-700">
                Waiting for battle to begin...
              </p>
            ) : (
              battleLog.map((event, index) => (
                <div
                  key={index}
                  className="border-l border-white/10 pl-4 text-sm text-zinc-500"
                >
                  {event}
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </main>
  );
}