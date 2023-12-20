"use client";

import { useRouter } from "next/navigation";
import { z } from "zod";
import { env } from "~/env";
import { getApiUrl } from "~/utils/base-urls";

const apiPostResponseSchema = z.object({
  id: z.string().min(1),
});

export function BreakButtons() {
  const router = useRouter();

  const handleNewBreak = async (s: number) => {
    // TODO: get url from env

    const date = new Date();
    date.setSeconds(date.getSeconds() + s);

    // TODO: handle errors with toast
    const result = await fetch(`${getApiUrl()}/api/break`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ date }),
    });

    const json = (await result.json()) as unknown;

    const { id } = apiPostResponseSchema.parse(json);

    router.push(`/${id}`);
  };

  return (
    <>
      <button
        onClick={() => handleNewBreak(10)}
        className="rounded bg-emerald-400 px-4 py-2 text-xl font-semibold text-white hover:brightness-90"
      >
        10 sec
      </button>
      <button
        onClick={() => handleNewBreak(1 * 60)}
        className="rounded bg-emerald-400 px-4 py-2 text-xl font-semibold text-white hover:brightness-90"
      >
        1 min
      </button>
      <button
        onClick={() => handleNewBreak(5 * 60)}
        className="rounded bg-emerald-400 px-4 py-2 text-xl font-semibold text-white hover:brightness-90"
      >
        5 min
      </button>
      {/*<button className="rounded bg-emerald-400 px-4 py-2 text-xl font-semibold text-white hover:brightness-90">
          New break
        </button>*/}
    </>
  );
}
