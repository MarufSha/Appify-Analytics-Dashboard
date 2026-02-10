"use client";

import { useEffect } from "react";
import { useDashboardStore, useDashboardView } from "@/store/dashboard-store";

import FilterBar from "@/components/dashboard/filters/filter-bar";
import KpiGrid from "@/components/dashboard/kpis/kpi-grid";

import RevenueLineChart from "@/components/dashboard/charts/revenue-line-chart";
import OrdersBarChart from "@/components/dashboard/charts/orders-bar-chart";
import UsersPieChart from "@/components/dashboard/charts/users-pie-chart";
import TrafficSourceChart from "@/components/dashboard/charts/traffic-source-chart";

import LoadingSkeleton from "@/components/common/loading-skeleton";
import ErrorState from "@/components/common/error-state";
import EmptyState from "@/components/common/empty-state";
const Dashboard = () => {
  const view = useDashboardView();
  const isLoading = useDashboardStore((s) => s.isLoading);
  const error = useDashboardStore((s) => s.error);
  const fetchDashboard = useDashboardStore((s) => s.fetchDashboard);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  if (isLoading) return <LoadingSkeleton />;
  if (error) return <ErrorState message={error} />;
  if (!view) return <EmptyState />;

  return (
    <div className="space-y-6">
      <FilterBar />

      <KpiGrid kpis={view.kpis} />

      <div className="grid gap-4 lg:grid-cols-2">
        <RevenueLineChart data={view.timeseries} />
        <OrdersBarChart data={view.timeseries} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <UsersPieChart data={view.userBreakdown} />
        <TrafficSourceChart data={view.trafficSources} />
      </div>
    </div>
  );
};
export default Dashboard;
