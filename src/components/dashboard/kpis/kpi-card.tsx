import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  value: string;
  deltaPercent: number;
  trend: "up" | "down" | "flat";
  hint?: string;
};

export default function KpiCard({
  title,
  value,
  deltaPercent,
  trend,
  hint,
}: Props) {
  const isUp = trend === "up";
  const isDown = trend === "down";

  const Icon = isUp ? ArrowUpRight : isDown ? ArrowDownRight : Minus;

  const deltaText =
    trend === "flat"
      ? "0.0%"
      : `${deltaPercent > 0 ? "+" : ""}${deltaPercent.toFixed(1)}%`;

  return (
    <Card className="transition hover:shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex items-end justify-between gap-3">
          <div>
            <div className="text-2xl font-semibold tracking-tight">{value}</div>
            {hint ? (
              <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
            ) : null}
          </div>

          <div
            className={cn(
              "flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium",
              isUp && "bg-emerald-500/10 text-emerald-600",
              isDown && "bg-red-500/10 text-red-600",
              trend === "flat" && "bg-muted text-muted-foreground",
            )}
            title="Change vs previous period"
          >
            <Icon className="h-4 w-4" />
            {deltaText}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
