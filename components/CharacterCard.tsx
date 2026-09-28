import type { Character } from "@/data/characters";

type CharacterCardProps = {
  character: Character;
};

export default function CharacterCard({
  character,
}: CharacterCardProps) {
  return (
    <article
      className={`group relative min-h-[420px] overflow-hidden rounded-[2rem] bg-gradient-to-br ${character.accent} border border-white/10 p-8 transition-all duration-500 hover:-translate-y-2 hover:border-white/20`}
    >
      {/* Decorative circle */}
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/5 blur-2xl transition-transform duration-700 group-hover:scale-125" />

      {/* Character placeholder */}
      <div className="relative flex h-64 items-center justify-center">
        <div className="flex h-48 w-48 items-center justify-center rounded-full border border-white/10 bg-black/30">
          <span className="text-5xl font-black uppercase text-white/20">
            {character.name.charAt(0)}
          </span>
        </div>
      </div>

      {/* Character information */}
      <div className="relative mt-4">
        <p className="text-xs uppercase tracking-[0.3em] text-white/50">
          {character.universe}
        </p>

        <div className="mt-2 flex items-end justify-between gap-4">
          <h3 className="text-3xl font-black uppercase tracking-tight">
            {character.name}
          </h3>

          <span className="text-sm font-bold text-white/50">
            {character.power}
          </span>
        </div>

        {/* Power bar */}
        <div className="mt-5 h-1 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-white transition-all duration-700 group-hover:bg-purple-400"
            style={{ width: `${character.power}%` }}
          />
        </div>
      </div>
    </article>
  );
}