"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { TimePoint } from "@/types/dashboard";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { format, parseISO } from "date-fns";
import EmptyState from "@/components/common/empty-state";
function isMonthlySeries(data: TimePoint[]) {
  if (data.length === 12) return true;
  return data.length <= 13 && data.every((d) => d.date.endsWith("-01"));
}

function formatXAxis(dateStr: string, monthly: boolean) {
  const d = parseISO(dateStr);
  return monthly ? format(d, "MMM") : format(d, "MMM d");
}

export default function OrdersBarChart({ data }: { data: TimePoint[] }) {
  const monthly = isMonthlySeries(data);
  if (!data || data.length === 0) {
    return (
      <EmptyState
        title="No chart data"
        message="Try a different range or user type."
      />
    );
  }

  return (
    <Card className="h-90">
      <CardHeader>
        <CardTitle className="text-base">Orders</CardTitle>
      </CardHeader>
      <CardContent className="h-70">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              dataKey="date"
              tickFormatter={(v) => formatXAxis(String(v), monthly)}
              tickMargin={8}
            />

            <YAxis
              tickFormatter={(v) =>
                new Intl.NumberFormat(undefined, {
                  notation: "compact",
                }).format(Number(v))
              }
            />

            <Tooltip
              labelFormatter={(label) =>
                monthly
                  ? format(parseISO(String(label)), "MMMM yyyy")
                  : format(parseISO(String(label)), "MMM d, yyyy")
              }
              formatter={(value) => [
                new Intl.NumberFormat().format(Number(value)),
                "Orders",
              ]}
            />

            <Bar dataKey="orders" isAnimationActive radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
