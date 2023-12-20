import Link from "next/link";
import { z } from "zod";
import { CopyLink } from "~/components/copy-link";
import { Timer } from "~/components/timer";
import { getApiUrl } from "~/utils/base-urls";
import { dateToRelative } from "~/utils/relative-time";

const apiGetResponseSchema = z.object({
  date: z.string().min(1),
});

export default async function BreakPage({
  params,
}: {
  params: { id: string };
}) {
  // TODO: handle errors
  // TODO: maybe generate static params
  const result = await fetch(`${getApiUrl()}/api/break/${params.id}`);
  const json = (await result.json()) as unknown;
  const { date } = apiGetResponseSchema.parse(json);
  const dateObj = new Date(date);

  const relativeTime = dateToRelative(dateObj);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-neutral-100">
      <Link
        href={"/"}
        className="absolute left-6 top-6 rounded-xl px-8 py-4 text-4xl font-extrabold tracking-tight hover:cursor-pointer hover:bg-neutral-200"
      >
        Break<span className="text-emerald-400">Chrono</span>
      </Link>
      <CopyLink id={params.id} />
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <div>
          {/* <h2>
            {/* FIXME: that doesn't update */}
          {/*{isBreakOver ? "Break ended" : "Break ends"} {relativeTime} /*}
          {/*</h2> */}
          <Timer end={dateObj} />
        </div>
      </div>
    </main>
  );
}
