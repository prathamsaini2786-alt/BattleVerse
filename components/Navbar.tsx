export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 z-50 flex w-full items-center justify-between px-8 py-6 text-white">
      <div className="text-xl font-bold tracking-widest">
        BATTLEVERSE
      </div>

      <div className="flex items-center gap-8 text-sm uppercase tracking-wider">
        <a href="#characters" className="transition-opacity hover:opacity-60">
          Characters
        </a>

        <a href="#battles" className="transition-opacity hover:opacity-60">
          Battles
        </a>

        <a href="#about" className="transition-opacity hover:opacity-60">
          About
        </a>
      </div>
    </nav>
  );
}