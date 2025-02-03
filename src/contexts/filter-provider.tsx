"use client";

import { createContext, useContext, useState, ReactNode, useMemo } from "react";
import { PropertyResponse } from "@/types/property";
import { MAX_FILTER_PRICE } from "@/utils/constant";

interface FilterContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  priceRange: { min: number; max: number };
  setPriceRange: (range: { min: number; max: number }) => void;
  selectedTypes: string[];
  setSelectedTypes: (types: string[] | ((prev: string[]) => string[])) => void;
  purpose: "rent" | "buy" | null;
  setPurpose: (purpose: "rent" | "buy" | null) => void;
  bedrooms: number;
  setBedrooms: (bedrooms: number) => void;
  bathrooms: number;
  setBathrooms: (bathrooms: number) => void;
  filterProperties: (properties: PropertyResponse[]) => PropertyResponse[];
  resetFilters: () => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({ children }: { children: ReactNode }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({
    min: 0,
    max: MAX_FILTER_PRICE,
  });
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [purpose, setPurpose] = useState<"rent" | "buy" | null>(null);
  const [bedrooms, setBedrooms] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);

  const resetFilters = () => {
    setSearchQuery("");
    setPriceRange({
      min: 0,
      max: MAX_FILTER_PRICE,
    });
    setSelectedTypes([]);
    setPurpose(null);
    setBedrooms(0);
    setBathrooms(0);
  };

  const filterProperties = (properties: PropertyResponse[]) => {
    let filteredProperties = properties;

    if (searchQuery) {
      const searchTerms = searchQuery.split(",")[0].toLowerCase();
      filteredProperties = properties.filter((property) =>
        [
          property.property.address,
          property.property.county,
        ].some((field) => field.toLowerCase().includes(searchTerms))
      );
    }

    if (priceRange.min > 0 || priceRange.max < 500000000) {
      filteredProperties = filteredProperties.filter(
        (property) =>
          property.property.price >= priceRange.min &&
          property.property.price <= priceRange.max
      );
    }

    if (selectedTypes.length > 0) {
      filteredProperties = filteredProperties.filter((property) =>
        selectedTypes.includes(property.property.propertyType ?? "")
      );
    }

    if (purpose) {
      filteredProperties = filteredProperties.filter((property) => {
        const propertyType =
          property.property.fkPropertyTypeEntity.designation.toLowerCase();
        return (
          (purpose === "rent" && propertyType === "arrendamento") ||
          (purpose === "buy" &&
            (propertyType === "venda" || propertyType === "terreno"))
        );
      });
    }

    if (bedrooms > 0) {
      filteredProperties = filteredProperties.filter((property) => {
        const isTerreno =
          property.property.fkPropertyTypeEntity.designation.toLowerCase() ===
          "terreno";
        if (isTerreno) return false;

        if (bedrooms === 5) {
          return property.property.room >= 5;
        }
        return property.property.room == bedrooms;
      });
    }

    if (bathrooms > 0) {
      filteredProperties = filteredProperties.filter((property) => {
        const isTerreno =
          property.property.fkPropertyTypeEntity.designation.toLowerCase() ===
          "terreno";
        if (isTerreno) return false;

        if (bathrooms === 5) {
          return property.property.bathroom >= 5;
        }
        return property.property.bathroom == bathrooms;
      });
    }

    return filteredProperties;
  };

  const contextValue = useMemo(() => ({
    searchQuery,
    setSearchQuery,
    priceRange,
    setPriceRange,
    selectedTypes,
    setSelectedTypes,
    purpose,
    setPurpose,
    bedrooms,
    setBedrooms,
    bathrooms,
    setBathrooms,
    filterProperties,
    resetFilters,
  }), [
    searchQuery,
    priceRange,
    selectedTypes,
    purpose,
    bedrooms,
    bathrooms,
  ]);

  return (
    <FilterContext.Provider value={contextValue}>
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