import { create } from "zustand";

interface PropertyFilterState {
  selectedPropertyPurpose: string;
  selectedPropertyType: string;
  selectedStep: string;

  setSelectedPropertyPurpose: (purpose: string) => void;
  setSelectedPropertyType: (type: string) => void;
  setSelectedStep: (step: string) => void; // Função para alterar o passo
  resetFilters: () => void;
}

export const usePropertyFilterStore = create<PropertyFilterState>((set) => ({
  selectedPropertyPurpose: "", //"rent", // Valor inicial
  selectedPropertyType: "", //"apartment", // Valor inicia
  selectedStep: "",

  setSelectedPropertyPurpose: (purpose) =>
    set(() => ({ selectedPropertyPurpose: purpose })),

  setSelectedPropertyType: (type) =>
    set(() => ({ selectedPropertyType: type })),

  setSelectedStep: (step) => set(() => ({ selectedStep: step })),

  // 🔄 Método para resetar os filtros
  resetFilters: () =>
    set(() => ({
      selectedPropertyPurpose: "",
      selectedPropertyType: "",
      selectedStep: "",
    })),
}));
