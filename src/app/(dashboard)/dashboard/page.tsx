"use client";

import { useEffect } from "react";
import { useDashboardStore, useDashboardView } from "@/store/dashboard-store";

import FilterBar from "@/components/dashboard/filters/filter-bar";
import KpiGrid from "@/components/dashboard/kpis/kpi-grid";
import { useUiStore } from "@/store/ui-store";
import RevenueLineChart from "@/components/dashboard/charts/revenue-line-chart";
import OrdersBarChart from "@/components/dashboard/charts/orders-bar-chart";
import UsersPieChart from "@/components/dashboard/charts/users-pie-chart";
import TrafficSourceChart from "@/components/dashboard/charts/traffic-source-chart";

import LoadingSkeleton from "@/components/common/loading-skeleton";
import ErrorState from "@/components/common/error-state";
import EmptyState from "@/components/common/empty-state";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { toCsv, downloadTextFile } from "@/lib/csv";
import { toast } from "sonner";

const Dashboard = () => {
  const view = useDashboardView();
  const isLoading = useDashboardStore((s) => s.isLoading);
  const error = useDashboardStore((s) => s.error);
  const fetchDashboard = useDashboardStore((s) => s.fetchDashboard);
  const role = useUiStore((s) => s.role);
  const dateRange = useDashboardStore((s) => s.dateRange);
  const userType = useDashboardStore((s) => s.userType);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);
  function exportCsv() {
    if (!view) return;

    const csv = toCsv(view.timeseries, [
      { key: "date", header: "Date" },
      { key: "revenue", header: "Revenue" },
      { key: "orders", header: "Orders" },
    ]);

    const filename = `dashboard_${dateRange}_${userType}.csv`;
    downloadTextFile(filename, csv);

    toast.success("Exported CSV", { description: `Saved ${filename}` });
  }

  if (isLoading) return <LoadingSkeleton />;
  if (error) return <ErrorState message={error} />;
  if (!view) return <EmptyState />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <FilterBar />
        <div className="flex items-center gap-2">
          <Button onClick={exportCsv}>
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      <KpiGrid kpis={view.kpis} />

      <div className="grid gap-4 lg:grid-cols-2">
        <RevenueLineChart data={view.timeseries} />
        <OrdersBarChart data={view.timeseries} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <UsersPieChart data={view.userBreakdown} />
        {role === "admin" ? (
          <TrafficSourceChart data={view.trafficSources} />
        ) : (
          <div className="flex rounded-lg border bg-card p-6 text-semibold text-muted-foreground justify-center items-center">
            Traffic Sources is available for Admin role.
          </div>
        )}
      </div>
    </div>
  );
};
export default Dashboard;
