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

export default function OrdersBarChart({ data }: { data: TimePoint[] }) {
  return (
    <Card className="h-90">
      <CardHeader>
        <CardTitle className="text-base">Orders</CardTitle>
      </CardHeader>
      <CardContent className="h-70">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" hide />
            <YAxis />
            <Tooltip />
            <Bar dataKey="orders" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
