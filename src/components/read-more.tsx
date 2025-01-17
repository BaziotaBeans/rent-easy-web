"use client";

import * as React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

import { cn } from "@/lib/utils";

interface ReadMoreProps {
  text: string;
  maxLength?: number;
  className?: string;
}

export const ReadMore: React.FC<ReadMoreProps> = ({
  text,
  maxLength = 100,
  className,
}) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const toggleExpanded = () => setIsExpanded((prev) => !prev);

  const isTruncated = text.length > maxLength;
  const displayText =
    isExpanded || !isTruncated ? text : text.slice(0, maxLength) + "...";

  return (
    <div className={cn("space-y-2", className)}>
      {/* Texto com transição suave */}
      <p
        className={cn(
          "transition-all duration-300 ease-in-out text-zinc-600",
          isExpanded ? "max-h-full" : "max-h-20 overflow-hidden"
        )}
      >
        {displayText}
      </p>

      {/* Botão para alternar entre expandir e colapsar */}
      {isTruncated && (
        <button
          onClick={toggleExpanded}
          className="text-zinc-700 font-semibold hover:underline flex items-center"
        >
          {isExpanded ? "Ler menos" : "Ler mais"}
          {isExpanded ? <ChevronUp /> : <ChevronDown />}
        </button>
      )}
    </div>
  );
};
