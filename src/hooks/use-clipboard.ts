"use client";

import { useState, useCallback } from "react";
import { copyToClipboard } from "@/lib/utils/clipboard";

export function useClipboard(resetDelay = 2000) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(
    async (text: string) => {
      const success = await copyToClipboard(text);
      if (success) {
        setCopied(true);
        setTimeout(() => setCopied(false), resetDelay);
      }
      return success;
    },
    [resetDelay]
  );

  return { copied, copy };
}
