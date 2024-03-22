import Link from "next/link";
import { CopyLink } from "~/components/copy-link";
import { Timer } from "~/components/timer";
import { decode } from "~/utils/date-decoding";

export default async function BreakPage({
  params,
}: {
  params: { dateString: string };
}) {
  const dateObj = new Date(decode(params.dateString));

  return (
    <main className="flex min-h-screen flex-col items-center justify-center supports-[height:100dvh]:min-h-[100dvh]">
      <Link
        href={"/"}
        className="absolute top-6 rounded-xl px-8 py-4 text-4xl font-extrabold tracking-tight hover:cursor-pointer hover:bg-neutral-100 2xl:left-6"
      >
        Break<span className="text-emerald-400">Chrono</span>
      </Link>
      <div className="absolute top-32 text-center 2xl:top-10">
        <CopyLink dateString={params.dateString} />
      </div>
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <div>
          <Timer end={dateObj} />
        </div>
      </div>
    </main>
  );
}
