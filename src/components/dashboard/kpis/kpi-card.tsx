import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  value: string;
  hint?: string;
};

export default function KpiCard({
  title,
  value,
  hint,
}: Props) {
  
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
              "flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium"
            )}
            title="Change vs previous period"
          >
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
