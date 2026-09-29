"use client";

import { useState } from "react";
import { characters, type Character } from "@/data/characters";
import CharacterCard from "@/components/CharacterCard";

export default function CharacterShowcase() {
  const [fighterOne, setFighterOne] = useState<Character | null>(null);
  const [fighterTwo, setFighterTwo] = useState<Character | null>(null);

  const handleSelect = (character: Character) => {
    // Clicking an already selected fighter removes them
    if (fighterOne?.id === character.id) {
      setFighterOne(null);
      return;
    }

    if (fighterTwo?.id === character.id) {
      setFighterTwo(null);
      return;
    }

    // First fighter slot
    if (!fighterOne) {
      setFighterOne(character);
      return;
    }

    // Second fighter slot
    if (!fighterTwo) {
      setFighterTwo(character);
      return;
    }

    // Both slots full — replace fighter two
    setFighterTwo(character);
  };

  const clearSelection = () => {
    setFighterOne(null);
    setFighterTwo(null);
  };

  const startBattle = () => {
    if (!fighterOne || !fighterTwo) return;

    const battleSection = document.getElementById("battle");

    if (battleSection) {
      battleSection.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="characters"
      className="relative overflow-hidden bg-black px-6 py-32 text-white md:py-48"
    >
      <div className="mx-auto max-w-7xl">

        {/* Section heading */}
        <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-purple-400">
              The Roster
            </p>

            <h2 className="mt-4 max-w-4xl text-5xl font-black uppercase leading-[0.9] tracking-[-0.04em] md:text-8xl">
              Choose
              <span className="block text-zinc-500">
                Your Legends
              </span>
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-6 text-zinc-500">
            Heroes, villains, legends and monsters from across fictional
            universes. Choose your fighters and let the simulation decide.
          </p>
        </div>

        {/* Selection status */}
        <div className="mb-10 rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
                Battle Selection
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-3">

                {/* Fighter 1 */}
                <div
                  className={`rounded-xl border px-4 py-3 ${
                    fighterOne
                      ? "border-purple-400/40 bg-purple-500/10"
                      : "border-white/10 bg-white/[0.03]"
                  }`}
                >
                  <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                    Fighter 1
                  </p>

                  <p className="mt-1 font-bold uppercase">
                    {fighterOne?.name ?? "Choose Fighter"}
                  </p>
                </div>

                <span className="text-xl font-black text-zinc-700">
                  VS
                </span>

                {/* Fighter 2 */}
                <div
                  className={`rounded-xl border px-4 py-3 ${
                    fighterTwo
                      ? "border-red-400/40 bg-red-500/10"
                      : "border-white/10 bg-white/[0.03]"
                  }`}
                >
                  <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                    Fighter 2
                  </p>

                  <p className="mt-1 font-bold uppercase">
                    {fighterTwo?.name ?? "Choose Fighter"}
                  </p>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap gap-3">

              <button
                onClick={clearSelection}
                disabled={!fighterOne && !fighterTwo}
                className="rounded-full border border-white/10 px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 transition hover:border-white/20 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
              >
                Clear
              </button>

              <button
                onClick={startBattle}
                disabled={!fighterOne || !fighterTwo}
                className="rounded-full bg-white px-6 py-3 text-xs font-black uppercase tracking-[0.2em] text-black transition hover:scale-105 hover:bg-purple-300 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:scale-100"
              >
                Start Battle →
              </button>
            </div>
          </div>
        </div>

        {/* Character grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {characters.map((character) => (
            <CharacterCard
              key={character.id}
              character={character}
              selected={
                fighterOne?.id === character.id ||
                fighterTwo?.id === character.id
              }
              selectionSlot={
                fighterOne?.id === character.id
                  ? 1
                  : fighterTwo?.id === character.id
                    ? 2
                    : null
              }
              onSelect={() => handleSelect(character)}
            />
          ))}
        </div>

        {/* Bottom instruction */}
        <div className="mt-12 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-600">
            {!fighterOne
              ? "Select your first fighter"
              : !fighterTwo
                ? "Select your opponent"
                : "Ready for battle"}
          </p>
        </div>

      </div>
    </section>
  );
}