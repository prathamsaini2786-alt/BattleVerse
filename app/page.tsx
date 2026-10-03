import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-300px] h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-purple-600/10 blur-[140px]" />

        <div className="absolute bottom-[-300px] right-[-200px] h-[500px] w-[500px] rounded-full bg-red-600/5 blur-[120px]" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-8 md:px-10">

        {/* NAVBAR */}

        <nav className="flex items-center justify-between">
          <Link
            href="/"
            className="text-lg font-black uppercase tracking-[-0.04em]"
          >
            Battle<span className="text-purple-400">Verse</span>
          </Link>

          <div className="text-[10px] font-bold uppercase tracking-[0.35em] text-zinc-600">
            Fictional Battle Simulator
          </div>
        </nav>

        {/* HERO */}

        <section className="flex flex-1 flex-col justify-center py-20">

          <div className="max-w-5xl">

            <p className="mb-6 text-xs font-bold uppercase tracking-[0.5em] text-purple-400">
              Enter the arena
            </p>

            <h1 className="text-6xl font-black uppercase leading-[0.85] tracking-[-0.07em] md:text-9xl">
              WHO
              <br />
              <span className="text-zinc-700">
                WOULD
              </span>
              <br />
              WIN?
            </h1>

            <p className="mt-8 max-w-xl text-sm leading-7 text-zinc-500 md:text-base">
              Battle your favorite fictional characters in simulated
              fights powered by stats, abilities, critical hits,
              dodges and unpredictable combat.
            </p>

          </div>

          {/* MODE SELECTION */}

          <div className="mt-20">

            <div className="mb-6">

              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-600">
                Choose your mode
              </p>

              <h2 className="mt-2 text-2xl font-black uppercase tracking-[-0.03em]">
                Enter the Arena
              </h2>

            </div>

            <div className="grid gap-5 md:grid-cols-2">

              {/* 1V1 */}

              <Link
                href="/battle"
                className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-purple-400/40 md:p-10"
              >

                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-purple-500/5 to-transparent opacity-60 transition group-hover:opacity-100" />

                <div className="relative">

                  <div className="flex items-center justify-between">

                    <span className="text-xs font-black tracking-[0.3em] text-zinc-700">
                      01
                    </span>

                    <span className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-600 transition group-hover:text-purple-300">
                      Enter →
                    </span>

                  </div>

                  <div className="mt-20">

                    <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-purple-400">
                      Fighter vs Fighter
                    </p>

                    <h3 className="mt-3 text-6xl font-black uppercase tracking-[-0.06em]">
                      1v1
                    </h3>

                    <p className="mt-5 max-w-md text-sm leading-6 text-zinc-500">
                      Choose two characters and watch them battle
                      through attacks, abilities, critical hits
                      and dodges.
                    </p>

                  </div>

                  <div className="mt-10 h-px bg-white/5" />

                  <div className="mt-5 flex items-center justify-between">

                    <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-700">
                      Two fighters
                    </span>

                    <span className="text-xl text-zinc-700 transition group-hover:translate-x-2 group-hover:text-white">
                      →
                    </span>

                  </div>

                </div>

              </Link>

              {/* BATTLE ROYALE */}

              <Link
                href="/battle-royale"
                className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-red-400/40 md:p-10"
              >

                <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 via-orange-500/5 to-transparent opacity-60 transition group-hover:opacity-100" />

                <div className="relative">

                  <div className="flex items-center justify-between">

                    <span className="text-xs font-black tracking-[0.3em] text-zinc-700">
                      02
                    </span>

                    <span className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-600 transition group-hover:text-red-300">
                      Enter →
                    </span>

                  </div>

                  <div className="mt-20">

                    <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-red-400">
                      Last Fighter Standing
                    </p>

                    <h3 className="mt-3 text-5xl font-black uppercase tracking-[-0.06em] md:text-6xl">
                      Battle
                      <br />
                      Royale
                    </h3>

                    <p className="mt-5 max-w-md text-sm leading-6 text-zinc-500">
                      Drop multiple fictional characters into one
                      arena and fight until only one survivor remains.
                    </p>

                  </div>

                  <div className="mt-10 h-px bg-white/5" />

                  <div className="mt-5 flex items-center justify-between">

                    <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-700">
                      Multiple fighters
                    </span>

                    <span className="text-xl text-zinc-700 transition group-hover:translate-x-2 group-hover:text-white">
                      →
                    </span>

                  </div>

                </div>

              </Link>

            </div>

          </div>

        </section>

        {/* FOOTER */}

        <footer className="flex items-center justify-between border-t border-white/5 py-6">

          <span className="text-[9px] uppercase tracking-[0.3em] text-zinc-700">
            BattleVerse © 2026
          </span>

          <span className="text-[9px] uppercase tracking-[0.3em] text-zinc-700">
            Fictional characters • Simulated battles
          </span>

        </footer>

      </div>
    </main>
  );
}
