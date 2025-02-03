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
import { MAX_FILTER_PRICE } from "@/utils/constant";

export function ButtonFilterPrice() {
  const { setPriceRange } = useFilter();
  const [sliderValue, setSliderValue] = React.useState<[number, number]>([
    0, MAX_FILTER_PRICE,
  ]); // Estado para os valores mínimo e máximo

  React.useEffect(() => {
    // Atualiza o filtro de preço com os valores mínimo e máximo
    setPriceRange({ min: sliderValue[0], max: sliderValue[1] });
  }, [sliderValue, setPriceRange]);

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
            {/* Texto acima do handle mínimo */}
            <div
              className="absolute top-10 -translate-y-6 flex items-center justify-center px-2 h-8 bg-white border border-gray-300 rounded-md shadow text-xs font-medium text-gray-800"
              style={{
                left: `calc(${(sliderValue[0] / MAX_FILTER_PRICE) * 100}% - 40px)`, // Centraliza o texto no handle mínimo
              }}
            >
              {formatPriceToKwanza(sliderValue[0])}
            </div>

            {/* Texto acima do handle máximo */}
            <div
              className="absolute top-10 -translate-y-6 flex items-center justify-center px-2 h-8 bg-white border border-gray-300 rounded-md shadow text-xs font-medium text-gray-800"
              style={{
                left: `calc(${(sliderValue[1] / MAX_FILTER_PRICE) * 100}% - 40px)`, // Centraliza o texto no handle máximo
              }}
            >
              {formatPriceToKwanza(sliderValue[1])}
            </div>

            {/* Slider */}
            <Slider
              value={sliderValue}
              onValueChange={(value) => setSliderValue(value as [number, number])} // Atualiza os valores mínimo e máximo
              defaultValue={[0, MAX_FILTER_PRICE]}
              max={MAX_FILTER_PRICE}
              step={10}
              minStepsBetweenThumbs={1} // Distância mínima entre os handles
              className={cn("w-full")}
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}