import { create } from "zustand";
import type { DashboardData, DateRangeKey, UserTypeKey } from "@/types/dashboard";
import { getDashboardData } from "@/services/dashboard-api";

type DashboardState = {
  data: DashboardData | null;
  isLoading: boolean;
  error: string | null;

  dateRange: DateRangeKey;
  userType: UserTypeKey;

  setDateRange: (v: DateRangeKey) => void;
  setUserType: (v: UserTypeKey) => void;

  fetchDashboard: () => Promise<void>;
};

export const useDashboardStore = create<DashboardState>((set, get) => ({
  data: null,
  isLoading: false,
  error: null,

  dateRange: "7d",
  userType: "all",

  setDateRange: (v) => set({ dateRange: v }),
  setUserType: (v) => set({ userType: v }),

  fetchDashboard: async () => {
    if (get().isLoading) return;
    set({ isLoading: true, error: null });

    try {
      const data = await getDashboardData();
      set({ data, isLoading: false });
    } catch (e) {
      set({
        error: e instanceof Error ? e.message : "Failed to load dashboard",
        isLoading: false,
      });
    }
  },
}));
