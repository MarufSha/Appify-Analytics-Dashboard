"use client";

import DateRangeSelect from "./date-range-select";
import UserTypeSelect from "./user-type-select";
import { useDashboardStore } from "../../../store/dashboard-store";

export default function FilterBar() {
  const dateRange = useDashboardStore((s) => s.dateRange);
  const userType = useDashboardStore((s) => s.userType);
  const setDateRange = useDashboardStore((s) => s.setDateRange);
  const setUserType = useDashboardStore((s) => s.setUserType);

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="text-lg font-semibold tracking-tight">Overview</h2>
        <p className="text-sm text-muted-foreground">
          Filter the dashboard data.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <DateRangeSelect value={dateRange} onChange={setDateRange} />
        <UserTypeSelect value={userType} onChange={setUserType} />
      </div>
    </div>
  );
}
