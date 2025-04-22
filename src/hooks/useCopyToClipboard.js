import { useState } from "react";

export const useCopyToClipboard = () => {
  const [copied, setCopied] = useState(false);

  const copy = async (text) => {
    if (!navigator?.clipboard) return false;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      return true;
    } catch (err) {
      console.error("Copy failed", err);
      setCopied(false);
      return false;
    }
  };

  return { copy, copied };
};
