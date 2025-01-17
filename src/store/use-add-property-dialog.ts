import { create } from "zustand";

interface AddPropertyDialogState {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  onManualHandle: (value: boolean) => void;
}

export const useAddPropertyDialogDialog =
  create<AddPropertyDialogState>((set) => ({
    open: false,
    onOpen: () => set({ open: true }),
    onClose: () => set({ open: false }),
    onManualHandle: (value: boolean) => set({ open: value }),
  }));
