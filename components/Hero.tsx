export default function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-80px)] overflow-hidden bg-black text-white">
      
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-600/20 blur-[140px]" />

      {/* Accent shapes */}
      <div className="pointer-events-none absolute -right-32 top-20 h-80 w-80 rounded-full bg-red-600/10 blur-[100px]" />
      <div className="pointer-events-none absolute -left-32 bottom-10 h-80 w-80 rounded-full bg-orange-500/10 blur-[100px]" />

      {/* Main content */}
      <div className="relative z-10 flex min-h-[calc(100vh-80px)] flex-col items-center justify-center px-6 text-center">

        <p className="mb-6 text-sm font-medium uppercase tracking-[0.45em] text-zinc-500">
          THE ULTIMATE FICTIONAL BATTLE SIMULATOR
        </p>

        <h1 className="max-w-6xl text-[clamp(4rem,12vw,11rem)] font-black uppercase leading-[0.8] tracking-[-0.07em]">
          Battle
          <span className="block text-zinc-400">
            Verse
          </span>
        </h1>

        <p className="mt-10 max-w-xl text-base leading-7 text-zinc-400 md:text-lg">
          Bring the greatest fictional characters together and discover
          who survives when every universe collides.
        </p>

        {/* CTA */}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">

          <a
            href="#characters"
            className="rounded-full bg-white px-8 py-4 text-sm font-bold uppercase tracking-wider text-black transition-all duration-300 hover:scale-105 hover:bg-zinc-200"
          >
            Explore Characters
          </a>

          <a
            href="#battle"
            className="rounded-full border border-zinc-700 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition-all duration-300 hover:border-purple-500 hover:bg-purple-500/10"
          >
            Start a Battle
          </a>

        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3">
          <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-600">
            Scroll
          </span>

          <div className="h-12 w-px bg-gradient-to-b from-zinc-500 to-transparent" />
        </div>

      </div>
    </section>
  );
}