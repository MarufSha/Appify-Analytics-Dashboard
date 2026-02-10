import type { DashboardData } from "@/types/dashboard";
import data from "@/mock/dashboard.json";

export async function getDashboardData(): Promise<DashboardData> {
  await new Promise((r) => setTimeout(r, 350));
  return data as DashboardData;
}
