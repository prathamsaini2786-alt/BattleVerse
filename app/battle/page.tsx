"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { characters } from "@/data/characters";
import { simulateBattle } from "@/lib/battleEngine";

function BattleContent() {
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
  const [isRunning, setIsRunning] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<string | null>(null);
  const [damagePopup1, setDamagePopup1] = useState<number | null>(null);
  const [damagePopup2, setDamagePopup2] = useState<number | null>(null);
  const [flash1, setFlash1] = useState(false);
  const [flash2, setFlash2] = useState(false);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const resetVisuals = () => {
    setHealth1(100);
    setHealth2(100);
    setRound(0);
    setBattleLog([]);
    setWinner(null);
    setCurrentEvent(null);
    setDamagePopup1(null);
    setDamagePopup2(null);
    setFlash1(false);
    setFlash2(false);
  };

  const runBattle = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    const result = simulateBattle(fighter1, fighter2);

    resetVisuals();
    setBattleStarted(true);
    setIsRunning(true);

    let eventIndex = 0;

    timerRef.current = setInterval(() => {
      if (eventIndex >= result.events.length) {
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }

        setHealth1(
          result.fighters.find(
            (fighter) => fighter.id === fighter1.id
          )?.health ?? 0
        );

        setHealth2(
          result.fighters.find(
            (fighter) => fighter.id === fighter2.id
          )?.health ?? 0
        );

        setRound(result.rounds);
        setWinner(result.winner.name);
        setCurrentEvent(`${result.winner.name} wins the battle.`);
        setIsRunning(false);

        return;
      }

      const event = result.events[eventIndex];

      setCurrentEvent(event.message);

      setBattleLog((previous) => [
        event.message,
        ...previous,
      ]);

      setRound(event.round);

      if (event.defender === fighter1.name) {
        if (event.damage > 0) {
          setHealth1((previous) =>
            Math.max(0, previous - event.damage)
          );

          setDamagePopup1(event.damage);
          setFlash1(true);

          setTimeout(() => {
            setDamagePopup1(null);
            setFlash1(false);
          }, 450);
        }
      }

      if (event.defender === fighter2.name) {
        if (event.damage > 0) {
          setHealth2((previous) =>
            Math.max(0, previous - event.damage)
          );

          setDamagePopup2(event.damage);
          setFlash2(true);

          setTimeout(() => {
            setDamagePopup2(null);
            setFlash2(false);
          }, 450);
        }
      }

      eventIndex++;
    }, 700);
  };

  const healthColor = (health: number) => {
    if (health <= 25) return "bg-red-500";
    if (health <= 50) return "bg-orange-400";
    return "bg-white";
  };

  const fighterCard = (
    fighter: typeof fighter1,
    health: number,
    damagePopup: number | null,
    flash: boolean,
    fighterNumber: 1 | 2
  ) => (
    <div
      className={`relative overflow-hidden rounded-[2rem] border bg-zinc-950 p-8 transition-all duration-300 ${
        winner === fighter.name
          ? "border-purple-400/60 shadow-[0_0_60px_rgba(168,85,247,0.15)]"
          : "border-white/10"
      } ${health <= 0 ? "opacity-60 grayscale" : ""}`}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${fighter.accent} opacity-50`}
      />

      {flash && (
        <div className="pointer-events-none absolute inset-0 z-20 animate-pulse bg-red-500/10" />
      )}

      <div className="relative z-10">

        <div className="mb-8 flex items-center justify-between">
          <span className="text-xs uppercase tracking-[0.3em] text-zinc-500">
            Fighter {fighterNumber}
          </span>

          <span className="text-xs font-bold text-zinc-500">
            {fighter.universe}
          </span>
        </div>

        <div className="relative mx-auto mb-8 h-64 w-64">

          <div className="absolute inset-0 rounded-full bg-white/5 blur-3xl" />

          <div
            className={`relative h-64 w-64 overflow-hidden rounded-full border bg-black transition-all duration-300 ${
              flash
                ? "scale-95 border-red-400/70"
                : "border-white/10"
            }`}
          >
            <img
              src={fighter.image}
              alt={fighter.name}
              className="h-full w-full object-cover"
            />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>

          {damagePopup !== null && (
            <div className="absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2 animate-bounce text-5xl font-black text-red-400 drop-shadow-[0_0_15px_rgba(248,113,113,0.7)]">
              -{damagePopup}
            </div>
          )}
        </div>

        <h2 className="text-center text-4xl font-black uppercase tracking-[-0.04em]">
          {fighter.name}
        </h2>

        <p className="mt-2 text-center text-sm font-bold uppercase tracking-[0.2em] text-purple-400">
          {fighter.ability}
        </p>

        <div className="mt-6 grid grid-cols-2 gap-3 text-center text-xs uppercase tracking-widest">
          {[
            ["Power", fighter.power],
            ["Defense", fighter.defense],
            ["Speed", fighter.speed],
            ["Durability", fighter.durability],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-xl border border-white/5 bg-white/[0.04] p-3"
            >
              <span className="block text-zinc-600">
                {label}
              </span>

              <span className="font-bold">
                {value}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <div className="mb-2 flex justify-between text-xs uppercase tracking-widest">
            <span className="text-zinc-500">
              Health
            </span>

            <span className="font-bold">
              {health}%
            </span>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-white/10">
            <div
              className={`h-full rounded-full transition-all duration-500 ${healthColor(
                health
              )}`}
              style={{
                width: `${health}%`,
              }}
            />
          </div>
        </div>

        {health <= 0 && (
          <div className="mt-5 text-center text-xs font-black uppercase tracking-[0.35em] text-red-400">
            Eliminated
          </div>
        )}

        {winner === fighter.name && (
          <div className="mt-5 text-center text-xs font-black uppercase tracking-[0.35em] text-purple-400">
            Victory
          </div>
        )}
      </div>
    </div>
  );

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
        <div className="mb-10 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-purple-400">
            {battleStarted
              ? `Round ${round}`
              : "Simulation Ready"}
          </p>

          <h1 className="mt-4 text-5xl font-black uppercase tracking-[-0.05em] md:text-8xl">
            {fighter1.name}

            <span className="mx-4 text-zinc-800">
              VS
            </span>

            {fighter2.name}
          </h1>
        </div>

        {/* Live event */}
        <div className="mx-auto mb-10 min-h-12 max-w-3xl text-center">
          {currentEvent ? (
            <div className="rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 text-sm text-zinc-400">
              {currentEvent}
            </div>
          ) : (
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-700">
              Select your fighters and begin the simulation
            </p>
          )}
        </div>

        {/* Fighters */}
        <div className="grid gap-6 md:grid-cols-[1fr_auto_1fr]">

          {fighterCard(
            fighter1,
            health1,
            damagePopup1,
            flash1,
            1
          )}

          {/* Center */}
          <div className="flex items-center justify-center">
            <div className="text-center">

              <div
                className={`text-5xl font-black transition-all duration-300 ${
                  isRunning
                    ? "scale-110 text-purple-400"
                    : "text-zinc-800"
                }`}
              >
                VS
              </div>

              <div className="mt-3 text-xs uppercase tracking-[0.3em] text-zinc-600">
                Round {round}
              </div>

              {isRunning && (
                <div className="mx-auto mt-5 flex gap-1">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-purple-400" />
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-purple-400 [animation-delay:150ms]" />
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-purple-400 [animation-delay:300ms]" />
                </div>
              )}
            </div>
          </div>

          {fighterCard(
            fighter2,
            health2,
            damagePopup2,
            flash2,
            2
          )}
        </div>

        {/* Controls */}
        <div className="mt-10 flex justify-center">
          {!isRunning ? (
            <button
              onClick={runBattle}
              className="rounded-full bg-white px-10 py-4 text-sm font-black uppercase tracking-[0.2em] text-black transition hover:scale-105 hover:bg-purple-300"
            >
              {winner
                ? "Fight Again →"
                : "Start Battle →"}
            </button>
          ) : (
            <div className="rounded-full border border-purple-400/20 bg-purple-400/5 px-8 py-4 text-xs uppercase tracking-[0.3em] text-purple-300">
              Battle in progress...
            </div>
          )}
        </div>

        {/* Winner */}
        {winner && (
          <div className="relative mt-12 overflow-hidden rounded-[2rem] border border-purple-400/20 bg-purple-500/[0.05] p-10 text-center">

            <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/10 blur-3xl" />

            <div className="relative">
              <p className="text-xs font-bold uppercase tracking-[0.5em] text-purple-400">
                Winner
              </p>

              <h2 className="mt-3 text-6xl font-black uppercase tracking-[-0.05em] md:text-8xl">
                {winner}
              </h2>

              <p className="mt-4 text-sm text-zinc-500">
                Victory achieved after {round} rounds.
              </p>
            </div>
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

          <div className="max-h-72 space-y-2 overflow-y-auto">
            {battleLog.length === 0 ? (
              <p className="text-sm text-zinc-700">
                Waiting for battle to begin...
              </p>
            ) : (
              battleLog.map((event, index) => (
                <div
                  key={`${event}-${index}`}
                  className={`rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 text-sm ${
                    index === 0
                      ? "text-white"
                      : "text-zinc-600"
                  }`}
                >
                  <span className="mr-3 text-[10px] font-bold uppercase tracking-widest text-zinc-700">
                    #{battleLog.length - index}
                  </span>

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

export default function BattlePage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-black text-white">
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
            Loading Battle...
          </p>
        </main>
      }
    >
      <BattleContent />
    </Suspense>
  );
}
