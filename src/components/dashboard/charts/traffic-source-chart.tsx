"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { TrafficItem } from "@/types/dashboard";
import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";

export default function TrafficSourceChart({ data }: { data: TrafficItem[] }) {
  return (
    <Card className="h-90">
      <CardHeader>
        <CardTitle className="text-base">Traffic Sources</CardTitle>
      </CardHeader>
      <CardContent className="h-70">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip />
            <Pie
              data={data}
              dataKey="value"
              nameKey="source"
              outerRadius={95}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
