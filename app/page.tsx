import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-7xl font-bold tracking-tight">
            BATTLEVERSE
          </h1>

          <p className="mt-6 text-xl text-gray-400">
            The ultimate fictional character battle simulator.
          </p>
        </div>
      </section>
    </main>
  );
}