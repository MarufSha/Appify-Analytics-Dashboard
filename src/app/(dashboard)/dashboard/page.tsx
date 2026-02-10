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
import { Download, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  exportKpisCsv,
  exportTimeseriesCsv,
  exportUserMixCsv,
  exportTrafficSourcesCsv,
} from "@/lib/dashboard-export";
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

  function buildBaseName() {
    const ts = new Date();
    const stamp = `${ts.getFullYear()}-${String(ts.getMonth() + 1).padStart(
      2,
      "0",
    )}-${String(ts.getDate()).padStart(2, "0")}_${String(
      ts.getHours(),
    ).padStart(2, "0")}${String(ts.getMinutes()).padStart(2, "0")}`;

    return `dashboard_${role}_${dateRange}_${userType}_${stamp}`;
  }

  function exportOne(which: "kpis" | "timeseries" | "user-mix" | "traffic") {
    if (!view) return;

    const base = buildBaseName();

    if (which === "kpis") {
      exportKpisCsv(`${base}_kpis.csv`, view.kpis);
      toast.success("Exported", { description: "KPIs CSV downloaded." });
      return;
    }

    if (which === "timeseries") {
      exportTimeseriesCsv(`${base}_timeseries.csv`, view.timeseries);
      toast.success("Exported", { description: "Timeseries CSV downloaded." });
      return;
    }

    if (which === "user-mix") {
      exportUserMixCsv(`${base}_user-mix.csv`, view.userBreakdown);
      toast.success("Exported", { description: "User Mix CSV downloaded." });
      return;
    }

    if (which === "traffic") {
      if (role !== "admin") {
        toast.error("Not available", {
          description: "Traffic Sources export is Admin-only.",
        });
        return;
      }
      exportTrafficSourcesCsv(
        `${base}_traffic-sources.csv`,
        view.trafficSources,
      );
      toast.success("Exported", {
        description: "Traffic Sources CSV downloaded.",
      });
    }
  }

  function exportAll() {
    if (!view) return;
    exportOne("kpis");
    exportOne("timeseries");
    exportOne("user-mix");
    if (role === "admin") exportOne("traffic");
  }

  async function refresh() {
    await fetchDashboard();
    toast("Refreshed", { description: "Dashboard data reloaded." });
  }

  if (isLoading) return <LoadingSkeleton />;
  if (error) return <ErrorState message={error} onRetry={fetchDashboard} />;
  if (!view) return <EmptyState />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <FilterBar />
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={refresh}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Export as CSV</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem onClick={() => exportOne("kpis")}>
                KPIs
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => exportOne("timeseries")}>
                Timeseries (Revenue + Orders)
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => exportOne("user-mix")}>
                User Mix
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => exportOne("traffic")}
                disabled={role !== "admin"}
              >
                Traffic Sources (Admin)
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem onClick={exportAll}>
                Export All
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
