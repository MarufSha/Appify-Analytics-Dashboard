"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { BreakdownItem } from "@/types/dashboard";
import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from "recharts";
import EmptyState from "@/components/common/empty-state";

const COLORS = ["#22c55e", "#3b82f6", "#a855f7"];

export default function UsersPieChart({ data }: { data: BreakdownItem[] }) {
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
        <CardTitle className="text-base">User Mix</CardTitle>
      </CardHeader>
      <CardContent className="h-70">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip />
            <Legend />
            <Pie
              data={data}
              dataKey="value"
              nameKey="type"
              innerRadius={60}
              outerRadius={95}
              paddingAngle={2}
              isAnimationActive
            >
              {data.map((_, idx) => (
                <Cell key={`u-${idx}`} fill={COLORS[idx % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
