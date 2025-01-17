import { create } from 'zustand';

interface PropertyDetailDialogState {
  openId: string | null; // ID do diálogo atualmente aberto
  onOpen: (id: string) => void; // Abre o diálogo com o ID fornecido
  onClose: () => void; // Fecha o diálogo
}

export const usePropertyDetailDialog = create<PropertyDetailDialogState>((set) => ({
  openId: null,
  onOpen: (id) => set({ openId: id }),
  onClose: () => set({ openId: null }),
}));
