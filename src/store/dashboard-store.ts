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

    const maxAttempts = 3;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        const raw = await getDashboardData();
        set({ raw, isLoading: false, error: null });
        return;
      } catch (e) {
        const msg = e instanceof Error ? e.message : "Failed to load dashboard";

        if (attempt === maxAttempts) {
          set({ error: msg, isLoading: false });
          return;
        }

        const wait = 250 * 2 ** (attempt - 1);
        await new Promise((r) => setTimeout(r, wait));
      }
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
