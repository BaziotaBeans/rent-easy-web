// src/store/usePropertyFilter.ts
import { create } from "zustand";

type SortOrder = "recent" | "asc" | "desc";

interface FilterState {
  searchTerm: string;
  propertyTypes: string[];
  sortOrder: SortOrder;
  setSearchTerm: (term: string) => void;
  togglePropertyType: (type: string) => void;
  setSortOrder: (order: SortOrder) => void;
  resetFilters: () => void;
}

export const usePropertyFilter = create<FilterState>((set, get) => ({
  searchTerm: "",
  propertyTypes: [],
  sortOrder: "recent",

  setSearchTerm: (term) => set({ searchTerm: term }),

  togglePropertyType: (type) => {
    const { propertyTypes } = get();
    const updatedTypes = propertyTypes.includes(type)
      ? propertyTypes.filter((t) => t !== type)
      : [...propertyTypes, type];
    set({ propertyTypes: updatedTypes });
  },

  setSortOrder: (order) => set({ sortOrder: order }),

  resetFilters: () =>
    set({
      searchTerm: "",
      propertyTypes: [],
      sortOrder: "recent",
    }),
}));
