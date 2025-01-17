import { Skeleton } from "../ui/skeleton";

export function SkeletonCardProperty() {
  return (
    <>
      {Array.from({ length: 6 }).map((_, index) => (
        <Skeleton key={index} className="w-full h-[288px] rounded-md" />
      ))}
    </>
  );
}
