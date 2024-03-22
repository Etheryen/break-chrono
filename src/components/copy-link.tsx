"use client";

import copy from "copy-to-clipboard";
import { CheckIcon, CopyIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { getBaseUrl } from "~/utils/base-url";

export function CopyLink({ dateString }: { dateString: string }) {
  const [isCopied, setIsCopied] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const handleCopy = () => {
    if (timeoutId) clearTimeout(timeoutId);

    copy(`${getBaseUrl()}/${dateString}`);
    setIsCopied(true);
    toast.success(
      <div className="font-mono font-semibold">Copied link to clipboard!</div>,
    );
    const newTimeoutId = setTimeout(() => {
      setIsCopied(false);
      setTimeoutId(null);
    }, 2000);
    setTimeoutId(newTimeoutId);
  };

  return (
    <div
      onClick={handleCopy}
      className="flex items-center gap-4 rounded-xl px-4 py-2 font-mono text-xl hover:cursor-pointer hover:bg-neutral-100"
    >
      <span className="block max-w-[80vw] truncate">
        {getBaseUrl()}/{dateString}
      </span>
      <span className="text-emerald-400">
        {isCopied ? <CheckIcon /> : <CopyIcon />}
      </span>
    </div>
  );
}
