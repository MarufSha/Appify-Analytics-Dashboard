"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import DateRangeSelect from "./date-range-select";
import UserTypeSelect from "./user-type-select";
import { useDashboardStore } from "@/store/dashboard-store";
import type { DateRangeKey, UserTypeKey } from "@/types/dashboard";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

const validRanges: DateRangeKey[] = ["7d", "30d", "12m"];
const validTypes: UserTypeKey[] = ["all", "new", "returning"];

function readLS<T extends string>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  const v = window.localStorage.getItem(key);
  return (v as T) ?? fallback;
}

export default function FilterBar() {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const dateRange = useDashboardStore((s) => s.dateRange);
  const userType = useDashboardStore((s) => s.userType);
  const setDateRange = useDashboardStore((s) => s.setDateRange);
  const setUserType = useDashboardStore((s) => s.setUserType);

  useEffect(() => {
    const rangeQ = sp.get("range");
    const typeQ = sp.get("type");

    const rangeLS = readLS<DateRangeKey>("filter:range", "7d");
    const typeLS = readLS<UserTypeKey>("filter:type", "all");

    const nextRange =
      rangeQ && validRanges.includes(rangeQ as DateRangeKey)
        ? (rangeQ as DateRangeKey)
        : rangeLS;

    const nextType =
      typeQ && validTypes.includes(typeQ as UserTypeKey)
        ? (typeQ as UserTypeKey)
        : typeLS;

    setDateRange(nextRange);
    setUserType(nextType);
    const params = new URLSearchParams(sp.toString());
    params.set("range", nextRange);
    params.set("type", nextType);
    router.replace(`${pathname}?${params.toString()}`);
  }, []);

  function pushQuery(nextRange: DateRangeKey, nextType: UserTypeKey) {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("filter:range", nextRange);
      window.localStorage.setItem("filter:type", nextType);
    }

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
  function reset() {
    const nextRange: DateRangeKey = "7d";
    const nextType: UserTypeKey = "all";
    setDateRange(nextRange);
    setUserType(nextType);
    pushQuery(nextRange, nextType);
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
        <Button variant="outline" onClick={reset}>
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset
        </Button>
      </div>
    </div>
  );
}
