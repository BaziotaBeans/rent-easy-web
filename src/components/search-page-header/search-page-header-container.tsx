"use client";

import { Button } from "../ui/button";
import { ButtonFilterBedsBaths } from "./button-filter-beds-baths";
import { ButtonFilterPrice } from "./button-filter-price";
import { ButtonFilterPurpose } from "./button-filter-purpose";
import { ButtonFilterType } from "./button-filter-type";
import { SearchBarFilter } from "./search-bar-filter";
import { useFilter } from "@/contexts/filter-provider";

export function SearchPageHeaderContainer() {
  const { resetFilters } = useFilter();

  return (
    <div className="flex items-center h-16 gap-3 py-4 px-6 bg-white border-b ">
      <SearchBarFilter />
      <ButtonFilterPurpose />
      <ButtonFilterPrice />
      <ButtonFilterBedsBaths/>
      <ButtonFilterType />
      <Button className="h-10" variant="primary" onClick={resetFilters}>
        Redefinir filtros
      </Button>
    </div>
  );
}