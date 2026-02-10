import type { DashboardData } from "@/types/dashboard";
import data from "@/mock/dashboard.json";
import { getDevFlag } from "@/lib/dev-flags";

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

function shouldFail() {
  const fail = getDevFlag("fail");
  if (fail === "1") return true;
  if (fail === "0") return false;

  return Math.random() < 0.1;
}

export async function getDashboardData(): Promise<DashboardData> {
  const delayRaw = getDevFlag("delay");
  const delay = delayRaw ? Math.max(0, Number(delayRaw)) : 450;

  await sleep(delay);

  if (shouldFail()) {
    throw new Error("Mock API error: failed to fetch dashboard data.");
  }

  return data as DashboardData;
}
