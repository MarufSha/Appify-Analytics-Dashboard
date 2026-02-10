"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { TrafficItem } from "@/types/dashboard";
import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from "recharts";
import EmptyState from "@/components/common/empty-state";
const COLORS = ["#f97316", "#06b6d4", "#ef4444", "#eab308"]; 

export default function TrafficSourceChart({ data }: { data: TrafficItem[] }) {
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
        <CardTitle className="text-base">Traffic Sources</CardTitle>
      </CardHeader>
      <CardContent className="h-70">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip />
            <Legend />
            <Pie
              data={data}
              dataKey="value"
              nameKey="source"
              innerRadius={60}
              outerRadius={95}
              paddingAngle={2}
              isAnimationActive
            >
              {data.map((_, idx) => (
                <Cell key={`t-${idx}`} fill={COLORS[idx % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
