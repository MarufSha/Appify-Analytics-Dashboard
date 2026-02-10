"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import DateRangeSelect from "./date-range-select";
import UserTypeSelect from "./user-type-select";
import { useDashboardStore } from "@/store/dashboard-store";
import type { DateRangeKey, UserTypeKey } from "@/types/dashboard";

const validRanges: DateRangeKey[] = ["7d", "30d", "12m"];
const validTypes: UserTypeKey[] = ["all", "new", "returning"];

export default function FilterBar() {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const dateRange = useDashboardStore((s) => s.dateRange);
  const userType = useDashboardStore((s) => s.userType);
  const setDateRange = useDashboardStore((s) => s.setDateRange);
  const setUserType = useDashboardStore((s) => s.setUserType);

  useEffect(() => {
    const range = sp.get("range");
    const type = sp.get("type");

    if (range && validRanges.includes(range as DateRangeKey)) {
      setDateRange(range as DateRangeKey);
    }
    if (type && validTypes.includes(type as UserTypeKey)) {
      setUserType(type as UserTypeKey);
    }

  }, []);

  function pushQuery(nextRange: DateRangeKey, nextType: UserTypeKey) {
    const params = new URLSearchParams(sp.toString());
    params.set("range", nextRange);
    params.set("type", nextType);
    router.replace(`${pathname}?${params.toString()}`);
  }

  function onRangeChange(v: DateRangeKey) {
    setDateRange(v);
    pushQuery(v, userType);
  }

  function onTypeChange(v: UserTypeKey) {
    setUserType(v);
    pushQuery(dateRange, v);
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="text-lg font-semibold tracking-tight">Overview</h2>
        <p className="text-sm text-muted-foreground">
          Filter the dashboard data.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <DateRangeSelect value={dateRange} onChange={onRangeChange} />
        <UserTypeSelect value={userType} onChange={onTypeChange} />
      </div>
    </div>
  );
}
