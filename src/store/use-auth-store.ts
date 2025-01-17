import { create } from "zustand";
import { UserData } from "@/types/auth";
import { auth } from "@/lib/auth";

interface AuthStore {
  isAuthenticated: boolean;
  user: UserData | null;
  updateAuthState: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
    isAuthenticated: auth.isAuthenticated(),
    user: auth.getUserData(),
    updateAuthState: () => {
      set({
        isAuthenticated: auth.isAuthenticated(),
        user: auth.getUserData()
      });
    },
  }));