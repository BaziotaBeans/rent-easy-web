import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonContracts() {
  return (
    <main className="flex flex-col py-10 gap-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <Skeleton className="w-[156px] h-9" />
          <Skeleton className="w-[80px] h-7" />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Skeleton className="w-[260px] h-5" />

        <Skeleton className="w-[300px] h-8" />
      </div>

      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="w-full h-[236px]" />
        ))}
      </div>
    </main>
  );
}
