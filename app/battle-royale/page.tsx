"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { characters } from "@/data/characters";
import type { Character } from "@/data/characters";

export default function BattleRoyalePage() {
  const router = useRouter();

  const [selected, setSelected] = useState<Character[]>([]);

  const toggleCharacter = (character: Character) => {
    const alreadySelected = selected.some(
      (fighter) => fighter.id === character.id
    );

    if (alreadySelected) {
      setSelected((previous) =>
        previous.filter(
          (fighter) => fighter.id !== character.id
        )
      );

      return;
    }

    if (selected.length >= 6) return;

    setSelected((previous) => [
      ...previous,
      character,
    ]);
  };

  const startBattleRoyale = () => {
    if (selected.length < 4) return;

    const fighterIds = selected
      .map((fighter) => fighter.id)
      .join(",");

    router.push(
      `/battle-royale/simulate?fighters=${fighterIds}`
    );
  };

  return (
    <main className="min-h-screen bg-black text-white">

      {/* HEADER */}

      <div className="mx-auto max-w-7xl px-6 py-8 md:px-10">

        <div className="flex items-center justify-between">

          <Link
            href="/"
            className="text-sm font-bold uppercase tracking-[0.25em] text-zinc-500 transition hover:text-white"
          >
            ← BattleVerse
          </Link>

          <span className="text-xs uppercase tracking-[0.3em] text-zinc-600">
            Battle Royale
          </span>

        </div>

      </div>

      {/* HERO */}

      <section className="px-6 pb-16 pt-16 md:px-10">

        <div className="mx-auto max-w-7xl">

          <p className="text-xs font-bold uppercase tracking-[0.5em] text-red-400">
            Battle Mode 02
          </p>

          <h1 className="mt-5 max-w-5xl text-6xl font-black uppercase leading-[0.85] tracking-[-0.07em] md:text-9xl">
            Build Your
            <br />
            <span className="text-zinc-700">
              Arena
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-sm leading-7 text-zinc-500 md:text-base">
            Choose 4 to 6 fictional characters.
            They will enter the arena together.
            Only one will survive.
          </p>

        </div>

      </section>

      {/* SELECTION BAR */}

      <section className="sticky top-0 z-40 border-y border-white/10 bg-black/90 px-6 py-5 backdrop-blur-xl md:px-10">

        <div className="mx-auto flex max-w-7xl flex-col gap-5 md:flex-row md:items-center md:justify-between">

          <div>

            <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-zinc-600">
              Fighters selected
            </p>

            <div className="mt-2 flex items-center gap-3">

              <span
                className={`text-3xl font-black ${
                  selected.length >= 4
                    ? "text-red-400"
                    : "text-white"
                }`}
              >
                {selected.length}
              </span>

              <span className="text-sm text-zinc-600">
                / 6
              </span>

            </div>

          </div>

          <div className="flex flex-wrap gap-2">

            {selected.map((fighter, index) => (

              <div
                key={fighter.id}
                className="rounded-full border border-red-400/30 bg-red-400/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-red-300"
              >
                {index + 1}. {fighter.name}
              </div>

            ))}

          </div>

          <button
            type="button"
            onClick={startBattleRoyale}
            disabled={selected.length < 4}
            className="rounded-full bg-white px-7 py-3 text-xs font-black uppercase tracking-[0.2em] text-black transition hover:scale-105 hover:bg-red-300 disabled:cursor-not-allowed disabled:bg-zinc-800 disabled:text-zinc-600 disabled:hover:scale-100"
          >
            {selected.length < 4
              ? `Select ${4 - selected.length} More`
              : "Enter Arena →"}
          </button>

        </div>

      </section>

      {/* ROSTER */}

      <section className="px-6 py-16 md:px-10">

        <div className="mx-auto max-w-7xl">

          <div className="mb-10 flex items-end justify-between">

            <div>

              <p className="text-xs uppercase tracking-[0.3em] text-zinc-600">
                Available roster
              </p>

              <h2 className="mt-3 text-4xl font-black uppercase tracking-[-0.04em] md:text-6xl">
                Choose your fighters
              </h2>

            </div>

            <span className="hidden text-xs uppercase tracking-[0.2em] text-zinc-600 md:block">
              4 minimum • 6 maximum
            </span>

          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

            {characters.map((character) => {

              const index = selected.findIndex(
                (fighter) =>
                  fighter.id === character.id
              );

              const isSelected = index !== -1;

              const isFull =
                selected.length >= 6 &&
                !isSelected;

              return (

                <button
                  key={character.id}
                  type="button"
                  disabled={isFull}
                  onClick={() =>
                    toggleCharacter(character)
                  }
                  className={`group relative min-h-[500px] overflow-hidden rounded-[2rem] border bg-gradient-to-br p-7 text-left transition-all duration-500 ${character.accent} ${
                    isSelected
                      ? "border-red-400/70 ring-2 ring-red-400/20"
                      : "border-white/10 hover:-translate-y-2 hover:border-white/20"
                  } ${
                    isFull
                      ? "cursor-not-allowed opacity-40"
                      : ""
                  }`}
                >

                  {/* Selection number */}

                  {isSelected && (

                    <div className="absolute left-7 top-7 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-red-400 text-xs font-black text-black">
                      {index + 1}
                    </div>

                  )}

                  {/* Top */}

                  <div className="relative z-10 flex items-center justify-between">

                    <span className="text-xs uppercase tracking-[0.3em] text-white/50">
                      {character.universe}
                    </span>

                    <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[10px] font-bold text-white/50">
                      {character.power}
                    </span>

                  </div>

                  {/* Image */}

                  <div className="relative mx-auto mt-8 h-60 w-60 overflow-hidden rounded-full border border-white/10 bg-black/30 shadow-2xl transition-transform duration-700 group-hover:scale-105">

                    <img
                      src={character.image}
                      alt={character.name}
                      className="h-full w-full object-cover"
                    />

                  </div>

                  {/* Info */}

                  <div className="relative z-10 mt-7">

                    <h3 className="text-4xl font-black uppercase tracking-[-0.04em]">
                      {character.name}
                    </h3>

                    <p className="mt-2 text-xs font-bold uppercase tracking-[0.2em] text-white/40">
                      {character.ability}
                    </p>

                    <div className="mt-6 grid grid-cols-4 gap-2">

                      {[
                        ["P", character.power],
                        ["D", character.defense],
                        ["S", character.speed],
                        ["DR", character.durability],
                      ].map(([label, value]) => (

                        <div
                          key={label}
                          className="rounded-lg border border-white/5 bg-black/20 p-2 text-center"
                        >

                          <span className="block text-[8px] text-white/30">
                            {label}
                          </span>

                          <span className="text-xs font-bold">
                            {value}
                          </span>

                        </div>

                      ))}

                    </div>

                  </div>

                  {/* Selection state */}

                  <div className="absolute bottom-6 right-7 text-[9px] font-bold uppercase tracking-[0.25em] text-white/20 transition-colors group-hover:text-white/50">

                    {isSelected
                      ? "Click to remove"
                      : isFull
                        ? "Arena full"
                        : "Click to select"}

                  </div>

                </button>

              );

            })}

          </div>

        </div>

      </section>

      {/* BOTTOM CTA */}

      <section className="px-6 pb-24 md:px-10">

        <div className="mx-auto max-w-7xl rounded-[2rem] border border-red-400/10 bg-red-500/[0.03] p-10 text-center">

          <p className="text-xs uppercase tracking-[0.3em] text-zinc-600">
            Arena status
          </p>

          <h2 className="mt-4 text-3xl font-black uppercase md:text-5xl">

            {selected.length === 0
              ? "Choose your fighters"
              : selected.length < 4
                ? `${4 - selected.length} more fighter${4 - selected.length === 1 ? "" : "s"} required`
                : "The arena is ready"}

          </h2>

          <button
            type="button"
            onClick={startBattleRoyale}
            disabled={selected.length < 4}
            className="mt-7 rounded-full bg-red-400 px-10 py-4 text-xs font-black uppercase tracking-[0.25em] text-black transition hover:scale-105 hover:bg-red-300 disabled:cursor-not-allowed disabled:bg-zinc-800 disabled:text-zinc-600 disabled:hover:scale-100"
          >
            Enter Battle Royale →
          </button>

        </div>

      </section>

    </main>
  );
}