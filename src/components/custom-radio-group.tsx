import { Check } from "lucide-react";
import { ComponentType } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { usePropertyFilterStore } from "@/store/use-property-filter-store";

interface CustomRadioGroupProps {
  items: {
    value: string;
    title: string;
    description: string;
    icon?: ComponentType<{ size?: number; color?: string; className?: string }>;
  }[];
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
}

export function CustomRadioGroup({
  items,
  value,
  onValueChange,
  className,
}: CustomRadioGroupProps) {
  const { selectedPropertyPurpose } = usePropertyFilterStore();

  return (
    <RadioGroup
      value={value}
      onValueChange={onValueChange}
      className={`${className}`}
    >
      {items.map((item) => {
        if (selectedPropertyPurpose == 'rent' && item.value == 'terrain') return null;

        return (
          <div
            key={item.value}
            className={`relative flex items-start space-x-4 rounded-lg border p-4 cursor-pointer hover:bg-slate-50 transition-colors 
            ${
              value === item.value
                ? "bg-white border-primary-base ring-1 ring-primary-base"
                : "bg-white border-zinc-200 ring-1 ring-zinc-200"
            }`}
            onClick={() => onValueChange(item.value)}
          >
            <div className="flex-1 flex gap-3 items-start">
              <div className="border-2 border-zinc-200 rounded-md p-1">
                {item.icon && (
                  <item.icon
                    className="w-6 h-6 text-gray-400"
                    //   color={color}
                  />
                )}
              </div>
              <div className="flex flex-col">
                <Label htmlFor={item.value} className="text-base font-medium">
                  {item.title}
                </Label>
                <p className="text-gray-500 text-sm">{item.description}</p>
              </div>
            </div>
            <div className="relative">
              <RadioGroupItem
                value={item.value}
                id={item.value}
                className={`mt-1 aspect-square h-5 w-5 rounded-full border-2 ${
                  value === item.value
                    ? "border-primary-base"
                    : "border-zinc-200"
                }`}
              />
              {value === item.value && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-primary-base rounded-full p-0.5">
                    <Check className="h-3.5 w-3.5 text-white stroke-[3.5]" />
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </RadioGroup>
  );
}
