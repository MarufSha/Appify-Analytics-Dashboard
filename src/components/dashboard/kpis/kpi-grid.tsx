import KpiCard from "./kpi-card";
import type { Kpis } from "@/types/dashboard";

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

export default function KpiGrid({ kpis }: { kpis: Kpis }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <KpiCard title="Revenue" value={formatMoney(kpis.revenue)} badge="Live" />
      <KpiCard title="Orders" value={formatInt(kpis.orders)} />
      <KpiCard title="Users" value={formatInt(kpis.users)} />
      <KpiCard
        title="Conversion"
        value={`${kpis.conversionRate.toFixed(2)}%`}
        hint="Sessions → Purchases"
      />
    </div>
  );
}
