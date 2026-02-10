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

export function exportDashboardCsvBundle(args: {
  baseName: string;
  kpis: KpiView;
  timeseries: TimePoint[];
  userMix: BreakdownItem[];
  traffic: TrafficItem[];
  includeTraffic: boolean;
}) {
  const { baseName, kpis, timeseries, userMix, traffic, includeTraffic } = args;

  const kpiRows = [
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

  const kpisCsv = toCsv(kpiRows);
  downloadTextFile(`${baseName}_kpis.csv`, kpisCsv);

  const tsCsv = toCsv(
    timeseries.map((p) => ({
      date: p.date,
      revenue: p.revenue,
      orders: p.orders,
    })),
  );
  downloadTextFile(`${baseName}_timeseries.csv`, tsCsv);

  const userCsv = toCsv(
    userMix.map((u) => ({
      type: u.type,
      value: u.value,
    })),
  );
  downloadTextFile(`${baseName}_user-mix.csv`, userCsv);

  if (includeTraffic) {
    const trafficCsv = toCsv(
      traffic.map((t) => ({
        source: t.source,
        value: t.value,
      })),
    );
    downloadTextFile(`${baseName}_traffic-sources.csv`, trafficCsv);
  }
}
