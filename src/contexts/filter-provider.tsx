"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { PropertyResponse } from "@/types/property";

interface FilterContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  priceRange: number;
  setPriceRange: (range: number) => void;
  selectedTypes: string[];
  setSelectedTypes: (types: string[]) => void;
  purpose: "rent" | "buy" | null;
  setPurpose: (purpose: "rent" | "buy" | null) => void;
  filterProperties: (properties: PropertyResponse[]) => PropertyResponse[];
  resetFilters: () => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({ children }: { children: ReactNode }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState(500000000);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [purpose, setPurpose] = useState<"rent" | "buy" | null>(null);

  const resetFilters = () => {
    setSearchQuery("");
    setPriceRange(500000000);
    setSelectedTypes([]);
    setPurpose(null);
  };

  const filterProperties = (properties: PropertyResponse[]) => {
    // First filter by location if search query exists
    let filteredProperties = properties;
    
    // if (searchQuery) {
    //   const searchTerms = searchQuery.split(",").map(term => term.trim().toLowerCase());
    //   filteredProperties = properties.filter(property => 
    //     searchTerms.some(term => 
    //       [
    //         property.property.address,
    //         // property.property.county,
    //         // property.property.province,
    //       ].some(field => field.toLowerCase().includes(term))
    //     )
    //   );
    // }
    
    if (searchQuery) {
      const searchTerms = searchQuery.split(",")[0].toLowerCase();
      filteredProperties = properties.filter(property => 
        [
            property.property.address,
            property.property.county,
            // property.property.province,
          ].some(field => field.toLowerCase().includes(searchTerms))
      );
    }

    // Then apply price filter to the location-filtered results
    if (priceRange < 500000000) {
      filteredProperties = filteredProperties.filter(
        property => property.property.price <= priceRange
      );
    }

    // Apply type filter to the previous results
    if (selectedTypes.length > 0) {
      filteredProperties = filteredProperties.filter(property =>
        selectedTypes.includes(property.property.fkPropertyTypeEntity.designation)
      );
    }

    // Finally apply purpose filter
    if (purpose) {
      filteredProperties = filteredProperties.filter(
        property => 
          property.property.fkPropertyTypeEntity.designation.toLowerCase() ===
          (purpose === "rent" ? "arrendamento" : "venda")
      );
    }

    return filteredProperties;
  };

  return (
    <FilterContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        priceRange,
        setPriceRange,
        selectedTypes,
        setSelectedTypes,
        purpose,
        setPurpose,
        filterProperties,
        resetFilters
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
};