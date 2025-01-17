import { createStore } from "zustand/vanilla";

export type PropertyDetailDialogState = {
  isOpen: boolean;
};

export type PropertyDetailDialogActions = {
  onOpen: () => void;
  onClose: () => void;
};

export type PropertyDetailDialogStore = PropertyDetailDialogState &
  PropertyDetailDialogActions;

export const defaultInitState: PropertyDetailDialogState = {
  isOpen: false,
};

export const createPropertyDetailDialogStore = (
  initState: PropertyDetailDialogState = defaultInitState
) => {
  return createStore<PropertyDetailDialogStore>()((set) => ({
    ...initState,
    onOpen: () => set((_) => ({ isOpen: true })),
    onClose: () => set((_) => ({ isOpen: false })),
  }));
};
