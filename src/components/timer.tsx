"use client";

import { useState, useEffect } from "react";
import { cn } from "~/utils/classnames";

export function Timer({ end }: { end: Date }) {
  const { days, hours, minutes, seconds } = useCountdown(end);

  if (days > 99) {
    return (
      <div className="text-center font-mono text-[8vw] font-semibold text-red-600">
        Long ago...
      </div>
    );
  }

  const isBreakOver = new Date() > end;

  return (
    <div
      className={cn("font-mono text-[18vw] font-semibold text-emerald-400", {
        "text-[15vw]": hours > 0 && days < 1,
        "text-[12vw]": days > 0,
        "text-red-600": isBreakOver,
      })}
    >
      {days > 0 && <span>{days < 10 ? `0${days}:` : `${days}:`}</span>}
      {hours > 0 && <span>{hours < 10 ? `0${hours}:` : `${hours}:`}</span>}
      <span>{minutes < 10 ? `0${minutes}:` : `${minutes}:`}</span>
      <span>{seconds < 10 ? `0${seconds}` : `${seconds}`}</span>
    </div>
  );
}

const useCountdown = (end: Date) => {
  const initialDiff = end.getTime() - Date.now();

  const days = Math.abs(Math.floor(initialDiff / (1000 * 60 * 60 * 24)));
  const hours = Math.abs(Math.floor((initialDiff / (1000 * 60 * 60)) % 24));
  const minutes = Math.abs(Math.floor((initialDiff / 1000 / 60) % 60));
  const seconds = Math.abs(Math.floor((initialDiff / 1000) % 60));

  const [time, setTime] = useState({
    days: initialDiff > 0 ? days : days - 1,
    hours: initialDiff > 0 ? hours : hours - 1,
    minutes: initialDiff > 0 ? minutes : minutes - 1,
    seconds,
  });

  const handleSetTime = (endDate: Date) => {
    const diff = endDate.getTime() - Date.now();

    const days = Math.abs(Math.floor(diff / (1000 * 60 * 60 * 24)));
    const hours = Math.abs(Math.floor((diff / (1000 * 60 * 60)) % 24));
    const minutes = Math.abs(Math.floor((diff / 1000 / 60) % 60));
    const seconds = Math.abs(Math.floor((diff / 1000) % 60));

    setTime({
      days: diff > 0 ? days : days - 1,
      hours: diff > 0 ? hours : hours - 1,
      minutes: diff > 0 ? minutes : minutes - 1,
      seconds,
    });
  };

  useEffect(() => {
    const interval = setInterval(() => handleSetTime(end), 1000);
    return () => clearInterval(interval);
  }, [end]);

  return time;
};
