import { EmptyStateSVG } from "@/components/svg/empty-state";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  title?: string;
  description?: string;
  className?: string;
}

export function EmptyState({ title, description, className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center w-full h-gull", className)}>
      <EmptyStateSVG />
      <h2 className="text-zinc-600 font-medium text-lg">{title}</h2>
      <p className="text-sm">{description}</p>
    </div>
  );
}
