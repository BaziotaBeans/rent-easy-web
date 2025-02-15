// src/store/usePropertyFilter.ts
import { create } from "zustand";

type SortOrder = "recent" | "asc" | "desc";

interface FilterState {
  searchTerm: string;
  propertyTypes: string[];
  propertySoldOrRented: string[];
  sortOrder: SortOrder;
  setSearchTerm: (term: string) => void;
  togglePropertyType: (type: string) => void;
  togglePropertySoldOrRented: (type: string) => void;
  setSortOrder: (order: SortOrder) => void;
  resetFilters: () => void;
}

export const usePropertyFilter = create<FilterState>((set, get) => ({
  searchTerm: "",
  propertyTypes: [],
  propertySoldOrRented: [],
  sortOrder: "recent",

  setSearchTerm: (term) => set({ searchTerm: term }),

  togglePropertyType: (type) => {
    const { propertyTypes } = get();
    const updatedTypes = propertyTypes.includes(type)
      ? propertyTypes.filter((t) => t !== type)
      : [...propertyTypes, type];
    set({ propertyTypes: updatedTypes });
  },

  togglePropertySoldOrRented: (type) => {
    const { propertySoldOrRented } = get();
    const updatedSoldOrRented = propertySoldOrRented.includes(type)
    ? propertySoldOrRented.filter((t) => t !== type)
    : [...propertySoldOrRented, type];
    set({ propertySoldOrRented: updatedSoldOrRented });
  },

  setSortOrder: (order) => set({ sortOrder: order }),

  resetFilters: () =>
    set({
      searchTerm: "",
      propertyTypes: [],
      sortOrder: "recent",
    }),
}));
