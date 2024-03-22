"use client";

import { useRouter } from "next/navigation";
import { encode } from "~/utils/date-decoding";

const MINUTES_PRESETS = [5, 10, 15, 20, 25, 30, 45, 60] as const;

export function BreakButtons() {
  const router = useRouter();

  const handleNewBreak = async (minutes: (typeof MINUTES_PRESETS)[number]) => {
    const date = new Date();
    date.setMinutes(date.getMinutes() + minutes);

    router.push(`/${encode(date)}`);
  };

  return (
    <>
      {MINUTES_PRESETS.map((minutes) => (
        <button
          key={minutes}
          onClick={() => handleNewBreak(minutes)}
          className="inline-flex items-center justify-center gap-2 rounded bg-emerald-400 px-4 py-2 text-xl font-semibold text-white hover:brightness-90 disabled:cursor-not-allowed disabled:brightness-75"
        >
          <span>{minutes} min</span>
        </button>
      ))}
    </>
  );
}
