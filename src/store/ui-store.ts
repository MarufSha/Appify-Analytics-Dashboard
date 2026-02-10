import { create } from "zustand";
import type { RoleKey } from "@/types/dashboard";

type UiState = {
  role: RoleKey;
  setRole: (r: RoleKey) => void;
};
function getInitialRole(): RoleKey {
  if (typeof window === "undefined") return "admin";
  const saved = window.localStorage.getItem("role");
  return saved === "manager" ? "manager" : "admin";
}

export const useUiStore = create<UiState>((set) => ({
  role: getInitialRole(),
  setRole: (role) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("role", role);
    }
    set({ role });
  },
}));
