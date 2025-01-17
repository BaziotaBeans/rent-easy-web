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

export function FilterProperty() {
  const { propertyTypes, sortOrder, togglePropertyType, setSortOrder } = usePropertyFilter();

  const propertyOptions = ["Terreno", "Apartamento", "Casa", "Vivenda"];

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <span className="text-sm text-zinc-600 font-medium flex items-center gap-2">
          Activo
          <span className="text-zinc-500 text-xs font-medium bg-zinc-100 rounded-sm px-1">
            6
          </span>
        </span>
        <span className="text-sm text-zinc-600 font-medium flex items-center gap-2">
          Pendente
          <span className="text-zinc-500 text-xs font-medium bg-zinc-100 rounded-sm px-1">
            2
          </span>
        </span>
        <span className="text-sm text-zinc-600 font-medium flex items-center gap-2">
          Vendido
          <span className="text-zinc-500 text-xs font-medium bg-zinc-100 rounded-sm px-1">
            3
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
          <PopoverContent className="w-44 flex flex-col gap-4">
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
