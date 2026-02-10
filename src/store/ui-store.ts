import { create } from "zustand";
import type { RoleKey } from "@/types/dashboard";

type UiState = {
  role: RoleKey;
  setRole: (r: RoleKey) => void;
};

export const useUiStore = create<UiState>((set) => ({
  role: "admin",
  setRole: (role) => set({ role }),
}));
