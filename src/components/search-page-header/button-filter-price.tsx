"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import { useFilter } from "@/contexts/filter-provider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Slider } from "../ui/slider";
import { cn } from "@/lib/utils";
import { formatPriceToKwanza } from "@/utils/format-price";

export function ButtonFilterPrice() {
  const { setPriceRange } = useFilter();
  const [sliderValue, setSliderValue] = React.useState([500000000]);

  React.useEffect(() => {
    setPriceRange(sliderValue[0]);
  }, [sliderValue, setPriceRange]);

  console.log(sliderValue);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-10 flex items-center" variant="outline">
          Preço
          <ChevronDown className="w-6 h-6" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto" align="end">
        <div className="w-80 flex flex-col gap-3 p-2">
          <label>Faixa de preço</label>
          <div className="relative w-full h-10">
            {/* Texto no tracker */}
            <div
              className="absolute top-10 -translate-y-6 flex items-center justify-center px-2 h-8 bg-white border border-gray-300 rounded-md shadow text-xs font-medium text-gray-800"
              style={{
                left: `calc(${(sliderValue[0] / 500000000) * 100}% - 40px)`, // Centraliza o texto no handle
              }}
            >
              {formatPriceToKwanza(sliderValue[0])}
            </div>

            {/* Slider */}
            <Slider
              value={sliderValue}
              onValueChange={(value) => setSliderValue(value)} // Atualiza o valor ao mover
              defaultValue={[10000]}
              max={500000000}
              step={100} 
              className={cn("w-full")}
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}