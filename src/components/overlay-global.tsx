"use client";

import { useOverlayFocus } from "@/contexts/overlay-focus-provider";
import { cn } from "@/lib/utils";

export function OverlayGlobal() {
  const { isOverlayFocus } = useOverlayFocus();

  return (
    <div
      className={cn("fixed left-0 top-0 bg-black/70 z-40 w-full h-screen", {
        hidden: !isOverlayFocus,
      })}
    />
  );
}
