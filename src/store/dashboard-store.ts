import { create } from "zustand";
import type {
  DashboardData,
  DateRangeKey,
  UserTypeKey,
} from "@/types/dashboard";
import { getDashboardData } from "@/services/dashboard-api";
import { selectDashboardView } from "@/lib/dashboard-selectors";

type DashboardState = {
  raw: DashboardData | null;
  isLoading: boolean;
  error: string | null;

  dateRange: DateRangeKey;
  userType: UserTypeKey;

  setDateRange: (v: DateRangeKey) => void;
  setUserType: (v: UserTypeKey) => void;

  fetchDashboard: () => Promise<void>;
};

export const useDashboardStore = create<DashboardState>((set, get) => ({
  raw: null,
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
      const raw = await getDashboardData();
      set({ raw, isLoading: false });
    } catch (e) {
      set({
        error: e instanceof Error ? e.message : "Failed to load dashboard",
        isLoading: false,
      });
    }
  },
}));

export function useDashboardView() {
  const raw = useDashboardStore((s) => s.raw);
  const dateRange = useDashboardStore((s) => s.dateRange);
  const userType = useDashboardStore((s) => s.userType);

  if (!raw) return null;
  return selectDashboardView(raw, dateRange, userType);
}
