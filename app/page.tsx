"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { characters } from "@/data/characters";
import type { Character } from "@/data/characters";

export default function HomePage() {
  const router = useRouter();

  const [fighter1, setFighter1] = useState<Character | null>(null);
  const [fighter2, setFighter2] = useState<Character | null>(null);

  const handleSelect = (character: Character) => {
    // Clicking an already-selected fighter removes them.
    if (fighter1?.id === character.id) {
      setFighter1(null);
      return;
    }

    if (fighter2?.id === character.id) {
      setFighter2(null);
      return;
    }

    // Fill Fighter 1 first, then Fighter 2.
    if (!fighter1) {
      setFighter1(character);
      return;
    }

    if (!fighter2) {
      setFighter2(character);
    }
  };

  const startBattle = () => {
    if (!fighter1 || !fighter2) return;

    router.push(
      `/battle?fighter1=${fighter1.id}&fighter2=${fighter2.id}`
    );
  };

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero */}
      <section className="relative overflow-hidden px-6 pb-20 pt-16 md:px-10 md:pt-24">
        <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-purple-600/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <div className="mb-16 flex items-center justify-between">
            <p className="text-sm font-black uppercase tracking-[0.3em]">
              BattleVerse
            </p>

            <p className="text-xs uppercase tracking-[0.3em] text-zinc-600">
              Fictional Battle Simulator
            </p>
          </div>

          <div className="max-w-5xl">
            <p className="mb-6 text-xs font-bold uppercase tracking-[0.4em] text-purple-400">
              Choose your fighters
            </p>

            <h1 className="text-6xl font-black uppercase leading-[0.85] tracking-[-0.06em] md:text-9xl">
              WHO
              <br />
              WOULD
              <br />
              WIN?
            </h1>

            <p className="mt-8 max-w-xl text-sm leading-7 text-zinc-500 md:text-base">
              Pick two fictional characters and let the BattleVerse engine
              decide their fate.
            </p>
          </div>
        </div>
      </section>

      {/* Selection status */}
      <section className="border-y border-white/10 bg-zinc-950/60 px-6 py-6 md:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-3">
            <div
              className={`rounded-full border px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] ${
                fighter1
                  ? "border-purple-400/50 bg-purple-400/10 text-purple-300"
                  : "border-white/10 text-zinc-600"
              }`}
            >
              Fighter 1: {fighter1?.name ?? "Choose"}
            </div>

            <div
              className={`rounded-full border px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] ${
                fighter2
                  ? "border-red-400/50 bg-red-400/10 text-red-300"
                  : "border-white/10 text-zinc-600"
              }`}
            >
              Fighter 2: {fighter2?.name ?? "Choose"}
            </div>
          </div>

          <p className="text-xs uppercase tracking-[0.25em] text-zinc-600">
            {fighter1 && fighter2
              ? "Ready for battle"
              : "Select two fighters"}
          </p>
        </div>
      </section>

      {/* Character roster */}
      <section className="px-6 py-20 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-zinc-600">
                Available roster
              </p>

              <h2 className="mt-3 text-4xl font-black uppercase tracking-[-0.04em] md:text-6xl">
                Select your fighters
              </h2>
            </div>

            <span className="hidden text-xs uppercase tracking-[0.2em] text-zinc-600 md:block">
              {characters.length} characters
            </span>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {characters.map((character) => {
              const selected =
                fighter1?.id === character.id ||
                fighter2?.id === character.id;

              const selectionSlot =
                fighter1?.id === character.id
                  ? 1
                  : fighter2?.id === character.id
                    ? 2
                    : null;

              return (
                <button
                  key={character.id}
                  type="button"
                  onClick={() => handleSelect(character)}
                  className={`group relative min-h-[520px] overflow-hidden rounded-[2rem] border bg-gradient-to-br p-7 text-left transition-all duration-500 ${
                    selected
                      ? selectionSlot === 1
                        ? "border-purple-400/70 ring-2 ring-purple-400/20"
                        : "border-red-400/70 ring-2 ring-red-400/20"
                      : "border-white/10 hover:-translate-y-2 hover:border-white/20"
                  } ${character.accent}`}
                >
                  <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl transition-transform duration-700 group-hover:scale-150" />

                  {selected && (
                    <div
                      className={`absolute left-7 top-7 z-20 rounded-full px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] ${
                        selectionSlot === 1
                          ? "bg-purple-400 text-black"
                          : "bg-red-400 text-black"
                      }`}
                    >
                      Fighter {selectionSlot}
                    </div>
                  )}

                  <div className="relative z-10 flex items-center justify-between">
                    <span className="text-xs uppercase tracking-[0.3em] text-white/50">
                      {character.universe}
                    </span>

                    <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[10px] font-bold text-white/50">
                      {character.power}
                    </span>
                  </div>

                  <div className="relative mx-auto mt-8 h-64 w-64 overflow-hidden rounded-full border border-white/10 bg-black/30 shadow-2xl transition-transform duration-700 group-hover:scale-105">
                    <Image
                      src={character.image}
                      alt={character.name}
                      fill
                      sizes="256px"
                      className="object-cover"
                    />
                  </div>

                  <div className="relative z-10 mt-8">
                    <h3 className="text-4xl font-black uppercase tracking-[-0.04em]">
                      {character.name}
                    </h3>

                    <p className="mt-2 text-xs font-bold uppercase tracking-[0.2em] text-white/40">
                      {character.ability}
                    </p>

                    <p className="mt-4 text-sm leading-6 text-white/40">
                      {character.description}
                    </p>

                    <div className="mt-6">
                      <div className="mb-2 flex justify-between text-[10px] uppercase tracking-[0.2em] text-white/40">
                        <span>Power</span>
                        <span>{character.power}%</span>
                      </div>

                      <div className="h-1 overflow-hidden rounded-full bg-white/10">
                        <div
                          className="h-full rounded-full bg-white transition-all duration-700 group-hover:bg-purple-400"
                          style={{
                            width: `${character.power}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-5 right-7 text-[9px] font-bold uppercase tracking-[0.25em] text-white/20 transition-colors group-hover:text-white/50">
                    {selected ? "Click to remove" : "Click to select"}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Battle CTA */}
      <section className="px-6 pb-24 md:px-10">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-zinc-950 p-8 text-center md:p-14">
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-600">
            Your matchup
          </p>

          <div className="mt-5 text-3xl font-black uppercase tracking-[-0.04em] md:text-5xl">
            {fighter1?.name ?? "Fighter 1"}
            <span className="mx-3 text-zinc-700">VS</span>
            {fighter2?.name ?? "Fighter 2"}
          </div>

          <button
            type="button"
            disabled={!fighter1 || !fighter2}
            onClick={startBattle}
            className="mt-8 rounded-full bg-white px-10 py-4 text-xs font-black uppercase tracking-[0.25em] text-black transition-all hover:scale-105 disabled:cursor-not-allowed disabled:bg-zinc-800 disabled:text-zinc-600 disabled:hover:scale-100"
          >
            Start Battle →
          </button>
        </div>
      </section>
    </main>
  );
}
