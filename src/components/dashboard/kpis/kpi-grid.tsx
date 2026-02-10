import KpiCard from "./kpi-card";
import type { KpiView } from "@/types/dashboard";

function formatMoney(n: number) {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

function formatInt(n: number) {
  return new Intl.NumberFormat().format(n);
}

export default function KpiGrid({ kpis }: { kpis: KpiView }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <KpiCard
        title="Revenue"
        value={formatMoney(kpis.revenue.value)}
      />

      <KpiCard
        title="Orders"
        value={formatInt(kpis.orders.value)}
      />

      <KpiCard
        title="Users"
        value={formatInt(kpis.users.value)}
      />

      <KpiCard
        title="Conversion"
        value={`${kpis.conversionRate.value.toFixed(2)}%`}
      />
    </div>
  );
}
