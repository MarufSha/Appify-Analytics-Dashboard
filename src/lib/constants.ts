import type { DateRangeKey } from "@/types/dashboard";

export const DATE_RANGE_DAYS: Record<Exclude<DateRangeKey, "12m">, number> = {
  "7d": 7,
  "30d": 30,
};