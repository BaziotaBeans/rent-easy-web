import { ComponentType } from "react";

interface SelectPropertyTypeItemProps {
  icon?: ComponentType<{ size?: number; color?: string; className?: string }>;
  size?: number;
  color?: string;
}

export function SelectPropertyTypeItem({
  icon: Icon,
  size = 24,
  color = "currentColor",
}: SelectPropertyTypeItemProps) {
  return (
    <button className="rounded-md ring-2 ring-zinc-200 flex flex-col items-start justify-center w-full h-12 px-2">
      {Icon && (
        <div className="w-9 h-9 flex items-center justify-center rounded-full border">
          <Icon
            size={size}
            className="text-zinc-400"
            //   color={color}
          />
        </div>
      )}
    </button>
  );
}
