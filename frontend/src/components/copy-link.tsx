"use client";

import copy from "copy-to-clipboard";
import { CheckIcon, CopyIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { getBaseUrl } from "~/utils/base-urls";

export function CopyLink({ id }: { id: string }) {
  const [isCopied, setIsCopied] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const handleCopy = () => {
    if (timeoutId) clearTimeout(timeoutId);

    copy(`${getBaseUrl()}/${id}`);
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
      className="absolute top-6 mt-4 inline-flex items-center gap-4 rounded-xl px-4 py-2 text-center font-mono text-xl hover:cursor-pointer hover:bg-neutral-200"
    >
      <span>
        {getBaseUrl()}/{id}
      </span>
      <span className="text-emerald-400">
        {isCopied ? <CheckIcon /> : <CopyIcon />}
      </span>
    </div>
  );
}
