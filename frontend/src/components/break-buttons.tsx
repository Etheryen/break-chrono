"use client";

import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { z } from "zod";
import { getApiUrl } from "~/utils/base-urls";

const MINUTES_PRESETS = [5, 10, 15, 20, 25, 30, 45, 60] as const;

const apiPostResponseSchema = z.object({
  id: z.string().min(1),
});

export function BreakButtons() {
  const router = useRouter();
  const [currentMinutesLoading, setCurrentMinutesLoading] = useState<
    (typeof MINUTES_PRESETS)[number] | null
  >(null);

  const handleNewBreak = async (minutes: (typeof MINUTES_PRESETS)[number]) => {
    setCurrentMinutesLoading(minutes);

    const date = new Date();
    date.setMinutes(date.getMinutes() + minutes);

    try {
      const result = await fetch(`${getApiUrl()}/api/breaks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ date }),
      });

      const json = (await result.json()) as unknown;

      const { id } = apiPostResponseSchema.parse(json);

      router.push(`/${id}`);
    } catch (_) {
      setCurrentMinutesLoading(null);
      toast.error(
        <div className="font-mono font-semibold">
          Error occured, please try again
        </div>,
      );
    }
  };

  return (
    <>
      {MINUTES_PRESETS.map((minutes) => (
        <button
          key={minutes}
          onClick={() => handleNewBreak(minutes)}
          disabled={!!currentMinutesLoading}
          className="inline-flex items-center justify-center gap-2 rounded bg-emerald-400 px-4 py-2 text-xl font-semibold text-white hover:brightness-90 disabled:cursor-not-allowed disabled:brightness-75"
        >
          {minutes == currentMinutesLoading && (
            <Loader2Icon className="h-5 w-5 animate-spin" />
          )}
          <span>{minutes} min</span>
        </button>
      ))}
      {/*<button className="rounded bg-emerald-400 px-4 py-2 text-xl font-semibold text-white hover:brightness-90">
          New break
        </button>*/}
    </>
  );
}
