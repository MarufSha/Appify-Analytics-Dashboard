import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ErrorState({ message }: { message: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Something broke</CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        {message}
      </CardContent>
    </Card>
  );
}
