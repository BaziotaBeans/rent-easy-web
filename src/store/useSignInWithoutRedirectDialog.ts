import { create } from "zustand";

interface SignInWithoutRedirectDialogState {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  onManualHandle: (value: boolean) => void;
}

export const useSignInWithoutRedirectDialogDialog =
  create<SignInWithoutRedirectDialogState>((set) => ({
    open: false,
    onOpen: () => set({ open: true }),
    onClose: () => set({ open: false }),
    onManualHandle: (value: boolean) => set({ open: value }),
  }));

  