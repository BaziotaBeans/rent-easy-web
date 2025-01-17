"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonHome() {
  return (
    <main className="flex flex-col py-10 gap-6">
      <div className="flex items-center justify-between">
        <Skeleton className="w-40 h-8 rounded-md" />

        <Skeleton className="w-40 h-9 rounded-md" />
      </div>

      <Skeleton className="w-full h-12 rounded-md" />

      <Skeleton className="w-full h-8 rounded-md" />

      {Array.from({ length: 4 }).map((_, index) => (
        <Skeleton key={index} className="w-full rounded-md h-[190px]" />
      ))}
    </main>
  );
}
