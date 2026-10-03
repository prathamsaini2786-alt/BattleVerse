"use client";

import {
  Suspense,
  useEffect,
  useRef,
  useState,
} from "react";
import { useSearchParams } from "next/navigation";

import { characters } from "@/data/characters";

import {
  simulateBattleRoyale,
  type BattleRoyaleResult,
  type RoyaleEvent,
} from "@/lib/battleRoyaleEngine";

function BattleRoyaleContent() {
  const searchParams = useSearchParams();

  const fighterIds =
    searchParams
      .get("fighters")
      ?.split(",")
      .filter(Boolean) ?? [];

  const selectedFighters = fighterIds
    .map((id) =>
      characters.find(
        (character) => character.id === id
      )
    )
    .filter(
      (character): character is typeof characters[number] =>
        Boolean(character)
    );

  const [health, setHealth] = useState<
    Record<string, number>
  >({});

  const [alive, setAlive] = useState<
    Record<string, boolean>
  >({});

  const [round, setRound] = useState(0);

  const [events, setEvents] = useState<
    RoyaleEvent[]
  >([]);

  const [currentEvent, setCurrentEvent] =
    useState<string | null>(null);

  const [winner, setWinner] =
    useState<string | null>(null);

  const [result, setResult] =
    useState<BattleRoyaleResult | null>(
      null
    );

  const [isRunning, setIsRunning] =
    useState(false);

  const [started, setStarted] =
    useState(false);

  const [damagePopup, setDamagePopup] =
    useState<Record<string, number | null>>(
      {}
    );

  const [flash, setFlash] =
    useState<Record<string, boolean>>({});

  const timerRef =
    useRef<ReturnType<typeof setInterval> | null>(
      null
    );

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const initializeBattle = () => {
    const initialHealth: Record<
      string,
      number
    > = {};

    const initialAlive: Record<
      string,
      boolean
    > = {};

    for (const fighter of selectedFighters) {
      initialHealth[fighter.id] = 100;
      initialAlive[fighter.id] = true;
    }

    setHealth(initialHealth);
    setAlive(initialAlive);
    setRound(0);
    setEvents([]);
    setCurrentEvent(null);
    setWinner(null);
    setResult(null);
    setDamagePopup({});
    setFlash({});
  };

  const startBattle = () => {
    if (selectedFighters.length < 2) return;

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    initializeBattle();

    const battle =
      simulateBattleRoyale(
        selectedFighters
      );

    setResult(battle);
    setStarted(true);
    setIsRunning(true);

    let eventIndex = 0;

    timerRef.current = setInterval(() => {
      if (
        eventIndex >=
        battle.events.length
      ) {
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }

        setHealth(
          Object.fromEntries(
            battle.fighters.map(
              (fighter) => [
                fighter.id,
                fighter.health,
              ]
            )
          )
        );

        setAlive(
          Object.fromEntries(
            battle.fighters.map(
              (fighter) => [
                fighter.id,
                fighter.alive,
              ]
            )
          )
        );

        setRound(battle.rounds);

        setWinner(
          battle.winner.name
        );

        setCurrentEvent(
          `${battle.winner.name} is the last fighter standing.`
        );

        setIsRunning(false);

        return;
      }

      const event =
        battle.events[eventIndex];

      setCurrentEvent(
        event.message
      );

      setEvents((previous) => [
        event,
        ...previous,
      ]);

      setRound(event.round);

      if (event.damage > 0) {
        const defender =
          selectedFighters.find(
            (fighter) =>
              fighter.name ===
              event.defender
          );

        if (defender) {
          setHealth((previous) => ({
            ...previous,
            [defender.id]:
              Math.max(
                0,
                (previous[
                  defender.id
                ] ?? 100) -
                  event.damage
              ),
          }));

          setDamagePopup(
            (previous) => ({
              ...previous,
              [defender.id]:
                event.damage,
            })
          );

          setFlash(
            (previous) => ({
              ...previous,
              [defender.id]: true,
            })
          );

          setTimeout(() => {
            setDamagePopup(
              (previous) => ({
                ...previous,
                [defender.id]: null,
              })
            );

            setFlash(
              (previous) => ({
                ...previous,
                [defender.id]: false,
              })
            );
          }, 450);
        }
      }

      if (
        event.type === "elimination"
      ) {
        const eliminated =
          selectedFighters.find(
            (fighter) =>
              fighter.name ===
              event.defender
          );

        if (eliminated) {
          setAlive(
            (previous) => ({
              ...previous,
              [eliminated.id]: false,
            })
          );
        }
      }

      eventIndex++;
    }, 650);
  };

  const healthColor = (
    value: number
  ) => {
    if (value <= 25) {
      return "bg-red-500";
    }

    if (value <= 50) {
      return "bg-orange-400";
    }

    return "bg-white";
  };

  if (selectedFighters.length < 2) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black text-white">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-red-400">
            Invalid Battle
          </p>

          <h1 className="mt-4 text-5xl font-black uppercase">
            Select at least two fighters
          </h1>

          <a
            href="/battle-royale"
            className="mt-8 inline-block rounded-full bg-white px-8 py-4 text-xs font-black uppercase tracking-[0.25em] text-black"
          >
            Back to Battle Royale
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white md:px-10">
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}

        <div className="mb-10 flex items-center justify-between">
          <a
            href="/battle-royale"
            className="text-sm font-bold uppercase tracking-[0.25em] text-zinc-500 transition hover:text-white"
          >
            ← Battle Royale
          </a>

          <div className="text-right">
            <p className="text-xs uppercase tracking-[0.3em] text-red-400">
              {isRunning
                ? `Round ${round}`
                : winner
                  ? "Battle Complete"
                  : "Arena Ready"}
            </p>

            <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-zinc-700">
              {selectedFighters.length} Fighters
            </p>
          </div>
        </div>

        {/* TITLE */}

        <div className="mb-10 text-center">
          <p className="text-xs uppercase tracking-[0.5em] text-red-400">
            Last Fighter Standing
          </p>

          <h1 className="mt-4 text-5xl font-black uppercase tracking-[-0.06em] md:text-8xl">
            Battle Royale
          </h1>

          <div className="mx-auto mt-6 min-h-12 max-w-3xl">
            {currentEvent ? (
              <div className="rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 text-sm text-zinc-400">
                {currentEvent}
              </div>
            ) : (
              <p className="text-xs uppercase tracking-[0.3em] text-zinc-700">
                Every fighter for themselves.
              </p>
            )}
          </div>
        </div>

        {/* ARENA */}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {selectedFighters.map(
            (fighter, index) => {
              const fighterHealth =
                health[fighter.id] ?? 100;

              const fighterAlive =
                alive[fighter.id] ?? true;

              const isWinner =
                winner === fighter.name;

              return (
                <div
                  key={fighter.id}
                  className={`relative overflow-hidden rounded-[2rem] border bg-zinc-950 p-6 transition-all duration-500 ${
                    isWinner
                      ? "border-red-400/70 shadow-[0_0_60px_rgba(248,113,113,0.12)]"
                      : fighterAlive
                        ? "border-white/10"
                        : "border-red-500/20 opacity-50 grayscale"
                  }`}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${fighter.accent} opacity-40`}
                  />

                  {flash[fighter.id] && (
                    <div className="pointer-events-none absolute inset-0 z-20 animate-pulse bg-red-500/10" />
                  )}

                  <div className="relative z-10">

                    <div className="mb-5 flex items-center justify-between">
                      <span className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-600">
                        Fighter {index + 1}
                      </span>

                      <span
                        className={`text-[9px] font-black uppercase tracking-[0.2em] ${
                          fighterAlive
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >
                        {fighterAlive
                          ? "Alive"
                          : "Eliminated"}
                      </span>
                    </div>

                    <div className="relative mx-auto h-40 w-40">

                      <div className="absolute inset-0 rounded-full bg-white/5 blur-2xl" />

                      <div
                        className={`relative h-40 w-40 overflow-hidden rounded-full border transition-all ${
                          flash[fighter.id]
                            ? "scale-95 border-red-400"
                            : "border-white/10"
                        }`}
                      >
                        <img
                          src={fighter.image}
                          alt={fighter.name}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      {damagePopup[
                        fighter.id
                      ] != null && (
                        <div className="absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2 animate-bounce text-4xl font-black text-red-400">
                          -
                          {
                            damagePopup[
                              fighter.id
                            ]
                          }
                        </div>
                      )}
                    </div>

                    <h2 className="mt-5 text-center text-3xl font-black uppercase">
                      {fighter.name}
                    </h2>

                    <p className="mt-1 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-red-400">
                      {fighter.ability}
                    </p>

                    {/* HEALTH */}

                    <div className="mt-6">

                      <div className="mb-2 flex justify-between text-[9px] uppercase tracking-[0.2em]">
                        <span className="text-zinc-600">
                          Health
                        </span>

                        <span className="font-black">
                          {fighterHealth}%
                        </span>
                      </div>

                      <div className="h-2 overflow-hidden rounded-full bg-white/10">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${healthColor(
                            fighterHealth
                          )}`}
                          style={{
                            width: `${fighterHealth}%`,
                          }}
                        />
                      </div>
                    </div>

                    {/* STATS */}

                    <div className="mt-5 grid grid-cols-4 gap-1">
                      {[
                        fighter.power,
                        fighter.defense,
                        fighter.speed,
                        fighter.durability,
                      ].map(
                        (value, statIndex) => (
                          <div
                            key={statIndex}
                            className="rounded-lg border border-white/5 bg-white/[0.03] p-2 text-center"
                          >
                            <p className="text-[7px] uppercase text-zinc-700">
                              {
                                [
                                  "PWR",
                                  "DEF",
                                  "SPD",
                                  "DUR",
                                ][statIndex]
                              }
                            </p>

                            <p className="mt-1 text-xs font-black">
                              {value}
                            </p>
                          </div>
                        )
                      )}
                    </div>

                    {isWinner && (
                      <div className="mt-5 text-center text-[10px] font-black uppercase tracking-[0.35em] text-red-400">
                        Last Fighter Standing
                      </div>
                    )}

                  </div>
                </div>
              );
            }
          )}
        </div>

        {/* START */}

        {!started && (
          <div className="mt-10 flex justify-center">
            <button
              onClick={startBattle}
              className="rounded-full bg-white px-12 py-5 text-xs font-black uppercase tracking-[0.25em] text-black transition hover:scale-105 hover:bg-red-400"
            >
              Enter The Arena →
            </button>
          </div>
        )}

        {/* WINNER */}

        {winner && (
          <div className="relative mt-12 overflow-hidden rounded-[2rem] border border-red-400/20 bg-red-500/[0.04] p-10 text-center">

            <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500/10 blur-3xl" />

            <div className="relative">

              <p className="text-xs font-black uppercase tracking-[0.5em] text-red-400">
                Winner
              </p>

              <h2 className="mt-3 text-6xl font-black uppercase tracking-[-0.06em] md:text-9xl">
                {winner}
              </h2>

              <p className="mt-4 text-sm text-zinc-500">
                Last fighter standing after{" "}
                {result?.rounds ?? round} rounds.
              </p>

              <button
                onClick={startBattle}
                className="mt-8 rounded-full border border-white/10 bg-white px-8 py-4 text-xs font-black uppercase tracking-[0.25em] text-black transition hover:scale-105"
              >
                Run It Again →
              </button>

            </div>
          </div>
        )}

        {/* LIVE LOG */}

        <div className="mt-12 rounded-[2rem] border border-white/10 bg-zinc-950 p-7">

          <div className="mb-6 flex items-center justify-between">

            <div>
              <p className="text-xs font-black uppercase tracking-[0.3em]">
                Combat Log
              </p>

              <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-zinc-700">
                Live arena events
              </p>
            </div>

            <span className="text-xs text-zinc-600">
              {events.length} events
            </span>
          </div>

          <div className="max-h-80 space-y-2 overflow-y-auto">

            {events.length === 0 ? (
              <p className="text-sm text-zinc-700">
                The arena is waiting...
              </p>
            ) : (
              events.map(
                (event, index) => (
                  <div
                    key={`${event.round}-${index}`}
                    className={`rounded-xl border p-4 ${
                      event.type ===
                      "elimination"
                        ? "border-red-500/30 bg-red-500/[0.06]"
                        : event.type ===
                            "critical"
                          ? "border-orange-500/20 bg-orange-500/[0.04]"
                          : event.type ===
                              "ability"
                            ? "border-purple-500/20 bg-purple-500/[0.04]"
                            : event.type ===
                                "dodge"
                              ? "border-blue-500/20 bg-blue-500/[0.04]"
                              : "border-white/5 bg-white/[0.02]"
                    }`}
                  >
                    <div className="flex gap-4">

                      <span className="min-w-12 text-[9px] font-black uppercase tracking-widest text-zinc-600">
                        R{event.round}
                      </span>

                      <div className="flex-1">

                        <p
                          className={`text-sm ${
                            index === 0
                              ? "text-white"
                              : "text-zinc-500"
                          }`}
                        >
                          {event.message}
                        </p>

                        {event.damage >
                          0 && (
                          <p className="mt-2 text-[9px] uppercase tracking-[0.2em] text-zinc-700">
                            {event.damage} damage
                          </p>
                        )}

                      </div>

                    </div>
                  </div>
                )
              )
            )}

          </div>
        </div>

      </div>
    </main>
  );
}

export default function BattleRoyaleSimulationPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-black text-white">
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
            Loading Arena...
          </p>
        </main>
      }
    >
      <BattleRoyaleContent />
    </Suspense>
  );
}