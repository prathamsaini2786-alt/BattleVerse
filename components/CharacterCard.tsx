import Image from "next/image";
import type { Character } from "@/data/characters";

type CharacterCardProps = {
  character: Character;
  selected: boolean;
  selectionSlot: 1 | 2 | null;
  onSelect: () => void;
};

export default function CharacterCard({
  character,
  selected,
  selectionSlot,
  onSelect,
}: CharacterCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group relative min-h-[500px] w-full overflow-hidden rounded-[2rem] border bg-gradient-to-br p-8 text-left transition-all duration-500 ${
        selected
          ? selectionSlot === 1
            ? "border-purple-400/70 ring-2 ring-purple-400/30"
            : "border-red-400/70 ring-2 ring-red-400/30"
          : "border-white/10 hover:-translate-y-3 hover:border-white/20"
      } ${character.accent}`}
    >
      {/* Selected overlay */}
      {selected && (
        <div
          className={`absolute inset-0 pointer-events-none ${
            selectionSlot === 1
              ? "bg-purple-500/[0.05]"
              : "bg-red-500/[0.05]"
          }`}
        />
      )}

      {/* Ambient glow */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl transition-transform duration-700 group-hover:scale-150" />

      {/* Selection badge */}
      {selected && (
        <div
          className={`absolute left-8 top-8 z-30 rounded-full px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] ${
            selectionSlot === 1
              ? "bg-purple-400 text-black"
              : "bg-red-400 text-black"
          }`}
        >
          Fighter {selectionSlot}
        </div>
      )}

      {/* Universe + Rank */}
      <div className="relative z-20 flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.3em] text-white/50">
          {character.universe}
        </p>

        <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white/50">
          Rank #{character.power}
        </span>
      </div>

      {/* Character visual */}
      <div className="relative flex h-[310px] items-center justify-center">

        {/* Glow */}
        <div
          className={`absolute h-56 w-56 rounded-full blur-2xl transition-all duration-700 group-hover:h-64 group-hover:w-64 ${
            selected ? "bg-white/10" : "bg-white/5"
          }`}
        />

        {/* Image */}
        <div
          className={`relative h-64 w-64 overflow-hidden rounded-full border bg-black/30 shadow-2xl transition-all duration-700 group-hover:scale-110 ${
            selected
              ? "border-white/30"
              : "border-white/10"
          }`}
        >
          <Image
            src={character.image}
            alt={character.name}
            fill
            sizes="256px"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </div>
      </div>

      {/* Information */}
      <div className="relative z-10">
        <div className="flex items-end justify-between gap-4">

          <h3 className="text-4xl font-black uppercase tracking-[-0.04em]">
            {character.name}
          </h3>

          {selected && (
            <span className="mb-1 text-xs font-bold uppercase tracking-[0.2em] text-white/50">
              Selected
            </span>
          )}

        </div>

        <p className="mt-2 max-w-sm text-sm leading-6 text-white/40">
          {character.description}
        </p>

        {/* Power */}
        <div className="mt-6">
          <div className="mb-2 flex justify-between text-[10px] uppercase tracking-[0.2em] text-white/40">
            <span>Power</span>
            <span>{character.power}%</span>
          </div>

          <div className="h-1 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-white transition-all duration-700 group-hover:bg-purple-400"
              style={{ width: `${character.power}%` }}
            />
          </div>
        </div>
      </div>

      {/* Bottom select indicator */}
      <div className="absolute bottom-5 right-7 text-[9px] font-bold uppercase tracking-[0.25em] text-white/20 transition-colors group-hover:text-white/50">
        {selected ? "Click to remove" : "Click to select"}
      </div>
    </button>
  );
}