"use client";

import { ListFilter, ArrowDownUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { usePropertyFilter } from "@/store/use-property-agent-filter";
import { PropertyResponse } from "@/types/property";
import { countProperties } from "@/utils";
import { Separator } from "@/components/ui/separator";

interface FilterPropertyProps {
  data: PropertyResponse[];
}

export function FilterProperty({ data }: FilterPropertyProps) {
  const {
    propertyTypes,
    sortOrder,
    togglePropertyType,
    setSortOrder,
    propertySoldOrRented,
    togglePropertySoldOrRented,
  } = usePropertyFilter();

  const propertyOptions = ["Terreno", "Apartamento", "Casa", "Vivenda"];

  const propertySoldOrRentedOptions = ["Alugados", "Vendidos"];

  const { publishedCount, rentedCount, soldCount } = countProperties(data);

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <span className="text-sm text-zinc-600 font-medium flex items-center gap-2">
          Activo
          <span className="text-zinc-500 text-xs font-medium bg-zinc-100 rounded-sm px-1">
            {publishedCount}
          </span>
        </span>
        <span className="text-sm text-zinc-600 font-medium flex items-center gap-2">
          Alugados
          <span className="text-zinc-500 text-xs font-medium bg-zinc-100 rounded-sm px-1">
            {rentedCount}
          </span>
        </span>
        <span className="text-sm text-zinc-600 font-medium flex items-center gap-2">
          Vendido
          <span className="text-zinc-500 text-xs font-medium bg-zinc-100 rounded-sm px-1">
            {soldCount}
          </span>
        </span>
        <span className="text-sm text-zinc-600 font-medium flex items-center gap-2">
          Total
          <span className="text-zinc-500 text-xs font-medium bg-zinc-100 rounded-sm px-1">
            {data.length}
          </span>
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="text-xs h-8 px-3">
              <ListFilter className="w-4 h-4" /> Filtrar
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-44 flex flex-col gap-4" side="bottom" >
            <span className="text-sm font-medium">Filtrar por tipo:</span>

            <div className="flex flex-col gap-4">
              {propertyOptions.map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox
                    id={type}
                    checked={propertyTypes.includes(type)}
                    onCheckedChange={() => togglePropertyType(type)}
                  />
                  <label htmlFor={type} className="text-sm">
                    {type}
                  </label>
                </div>
              ))}

              <Separator />

              {propertySoldOrRentedOptions.map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox
                    id={type}
                    checked={propertySoldOrRented.includes(type)}
                    onCheckedChange={() => togglePropertySoldOrRented(type)}
                  />
                  <label htmlFor={type} className="text-sm">
                    {type}
                  </label>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="text-xs h-8 px-3">
              <ArrowDownUp className="w-4 h-4" /> Ordenar
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-44 flex flex-col space-y-3">
            <span className="text-sm font-medium">Ordenar por:</span>
            <RadioGroup
              value={sortOrder}
              onValueChange={(value) =>
                setSortOrder(value as "recent" | "asc" | "desc")
              }
              className="space-y-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="recent" id="recent" />
                <label htmlFor="recent" className="text-sm">
                  Mais recente
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem value="asc" id="asc" />
                <label htmlFor="asc" className="text-sm">
                  Mais antigo
                </label>
              </div>
            </RadioGroup>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
