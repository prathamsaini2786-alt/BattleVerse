import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <Hero />

      <section
        id="characters"
        className="min-h-screen bg-black px-6 py-32 text-white"
      >
        <div className="mx-auto max-w-7xl">
          <p className="text-sm uppercase tracking-[0.35em] text-zinc-500">
            The Roster
          </p>

          <h2 className="mt-4 text-5xl font-black uppercase tracking-tight md:text-8xl">
            Characters
          </h2>
        </div>
      </section>

      <section
        id="battle"
        className="min-h-screen bg-zinc-950 px-6 py-32 text-white"
      >
        <div className="mx-auto max-w-7xl">
          <p className="text-sm uppercase tracking-[0.35em] text-zinc-500">
            Choose Your Fight
          </p>

          <h2 className="mt-4 text-5xl font-black uppercase tracking-tight md:text-8xl">
            Battle
          </h2>
        </div>
      </section>
    </main>
  );
}