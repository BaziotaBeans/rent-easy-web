"use client";

import * as React from "react";
import { ChevronDown, CircleCheck } from "lucide-react";

import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Checkbox } from "../ui/checkbox";
import { dummy_home_type } from "@/data/dummy_home_type";

export function ButtonFilterType() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-10 flex items-center" variant="outline">
          Tipo de imóvel <ChevronDown className="w-6 h-6" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0" align="end">
        <div className="w-60 flex flex-col gap-3">
          <div className="bg-primary-base/10 py-2 px-4 flex flex-col gap-3">
            <h3 className="text-zinc-500 font-semibold text-sm">
              Tipo de imóvel
            </h3>
            <button className="flex items-center gap-2 font-semibold text-primary-base-hover text-sm">
              <CircleCheck /> Selecionar Tudo
            </button>
          </div>
          <div className="flex flex-col gap-4 px-4 pt-2 pb-4">
            {dummy_home_type.map((item) => (
              <div className="flex items-center space-x-2" key={item.id}>
                <Checkbox className="text-primary-base" id={item.name} />
                <label
                  htmlFor={item.name}
                  className="text-base text-zinc-600 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {item.name}
                </label>
              </div>
            ))}

            <Button size="lg" variant={"primary"} className="font-bold">
              Aplicar
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}