import { BreakButtons } from "~/components/break-buttons";

export default function HomePage() {
  // TODO: extract dark mode
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl md:text-[7rem]">
          Break<span className="text-emerald-400">Chrono</span>
        </h1>
        <div className="flex flex-wrap justify-center gap-4">
          <BreakButtons />
        </div>
      </div>
    </main>
  );
}
