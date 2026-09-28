import { characters } from "@/data/characters";
import CharacterCard from "@/components/CharacterCard";

export default function CharacterShowcase() {
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

        {/* Character grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {characters.map((character) => (
            <CharacterCard
              key={character.id}
              character={character}
            />
          ))}
        </div>

      </div>
    </section>
  );
}