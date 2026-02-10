import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function EmptyState() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">No data</CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        Nothing to show yet.
      </CardContent>
    </Card>
  );
}
