"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { ButtonFilterBedsBaths } from "./button-filter-beds-baths";
import { ButtonFilterPrice } from "./button-filter-price";
import { ButtonFilterPurpose } from "./button-filter-purpose";
import { ButtonFilterType } from "./button-filter-type";
import { SearchBarFilter } from "./search-bar-filter";
import { useFilter } from "@/contexts/filter-provider";
import { SlidersHorizontal, X } from "lucide-react";

export function SearchPageHeaderContainer() {
  const { resetFilters } = useFilter();
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  return (
    <div className="bg-white border-b">
      {/* Container principal */}
      <div className="flex items-center h-16 gap-3 py-4 px-6">
        {/* Barra de pesquisa sempre visível */}
        <SearchBarFilter />

        {/* Botão de abrir/fechar filtros no mobile */}
        <button
          className="block md:hidden"
          onClick={() => setIsFiltersOpen(!isFiltersOpen)}
        >
          {isFiltersOpen ? <X size={24} /> : <SlidersHorizontal size={24} />}
        </button>

        {/* Filtros - Visíveis apenas em telas médias (`md`) ou quando abertos no mobile */}
        <div className="hidden md:flex items-center gap-3">
          <ButtonFilterPurpose />
          <ButtonFilterPrice />
          <ButtonFilterBedsBaths />
          <ButtonFilterType />
          <Button className="h-10" variant="primary" onClick={resetFilters}>
            Redefinir filtros
          </Button>
        </div>
      </div>

      {/* Filtros no mobile - Expandem quando o estado `isFiltersOpen` é verdadeiro */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isFiltersOpen ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
        } md:hidden`}
      >
        <div className="flex flex-col gap-3 px-6 py-4">
          <ButtonFilterPurpose />
          <ButtonFilterPrice />
          <ButtonFilterBedsBaths />
          <ButtonFilterType />
          <Button className="h-10 w-full" variant="primary" onClick={resetFilters}>
            Redefinir filtros
          </Button>
        </div>
      </div>
    </div>
  );
}
