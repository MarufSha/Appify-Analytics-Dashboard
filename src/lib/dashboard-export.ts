import { toCsv, downloadTextFile } from "@/lib/csv";
import type {
  KpiView,
  BreakdownItem,
  TrafficItem,
  TimePoint,
} from "@/types/dashboard";

function formatMoney(n: number) {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

function formatPercent(n: number) {
  const sign = n > 0 ? "+" : "";
  return `${sign}${n.toFixed(1)}%`;
}

export type ExportSection =
  | "kpis"
  | "timeseries"
  | "user-mix"
  | "traffic-sources";

export function exportKpisCsv(filename: string, kpis: KpiView) {
  const rows = [
    {
      metric: "Revenue",
      value: formatMoney(kpis.revenue.value),
      prevValue: formatMoney(kpis.revenue.prevValue),
      delta: formatPercent(kpis.revenue.deltaPercent),
      trend: kpis.revenue.trend,
    },
    {
      metric: "Orders",
      value: kpis.orders.value,
      prevValue: kpis.orders.prevValue,
      delta: formatPercent(kpis.orders.deltaPercent),
      trend: kpis.orders.trend,
    },
    {
      metric: "Users",
      value: kpis.users.value,
      prevValue: kpis.users.prevValue,
      delta: formatPercent(kpis.users.deltaPercent),
      trend: kpis.users.trend,
    },
    {
      metric: "Conversion Rate",
      value: `${kpis.conversionRate.value.toFixed(2)}%`,
      prevValue: `${kpis.conversionRate.prevValue.toFixed(2)}%`,
      delta: formatPercent(kpis.conversionRate.deltaPercent),
      trend: kpis.conversionRate.trend,
    },
  ];

  downloadTextFile(filename, toCsv(rows));
}

export function exportTimeseriesCsv(filename: string, timeseries: TimePoint[]) {
  const rows = timeseries.map((p) => ({
    date: p.date,
    revenue: p.revenue,
    orders: p.orders,
  }));
  downloadTextFile(filename, toCsv(rows));
}

export function exportUserMixCsv(filename: string, userMix: BreakdownItem[]) {
  const rows = userMix.map((u) => ({
    type: u.type,
    value: u.value,
  }));
  downloadTextFile(filename, toCsv(rows));
}

export function exportTrafficSourcesCsv(
  filename: string,
  traffic: TrafficItem[],
) {
  const rows = traffic.map((t) => ({
    source: t.source,
    value: t.value,
  }));
  downloadTextFile(filename, toCsv(rows));
}
