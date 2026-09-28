import type { Character } from "@/data/characters";

type CharacterCardProps = {
  character: Character;
};

export default function CharacterCard({
  character,
}: CharacterCardProps) {
  return (
    <article
      className={`group relative min-h-[500px] overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br ${character.accent} p-8 transition-all duration-500 hover:-translate-y-3 hover:border-white/20`}
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl transition-transform duration-700 group-hover:scale-150" />

      {/* Universe */}
      <div className="relative z-10 flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.3em] text-white/50">
          {character.universe}
        </p>

        <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white/50">
          Rank #{character.power}
        </span>
      </div>

      {/* Character visual */}
      <div className="relative flex h-[310px] items-center justify-center">
        <div className="absolute h-56 w-56 rounded-full bg-white/5 blur-2xl transition-all duration-700 group-hover:h-64 group-hover:w-64" />

        <div className="relative flex h-56 w-56 items-center justify-center rounded-full border border-white/10 bg-black/30 shadow-2xl transition-transform duration-700 group-hover:scale-110">
          <span className="text-7xl font-black uppercase text-white/10 transition-colors duration-500 group-hover:text-white/20">
            {character.name.charAt(0)}
          </span>
        </div>
      </div>

      {/* Information */}
      <div className="relative z-10">
        <h3 className="text-4xl font-black uppercase tracking-[-0.04em]">
          {character.name}
        </h3>

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
    </article>
  );
}