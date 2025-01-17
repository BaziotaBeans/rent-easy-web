import { create } from "zustand";

export type PaymentMethodOption = "reference" | "multicaixa-express";

interface PaymentStore {
  selectedType: PaymentMethodOption;
  setSelectedType: (type: PaymentMethodOption) => void;
}

export const usePaymentStore = create<PaymentStore>((set) => ({
  selectedType: "reference", // Valor inicial
  setSelectedType: (type) => set({ selectedType: type }),
}));