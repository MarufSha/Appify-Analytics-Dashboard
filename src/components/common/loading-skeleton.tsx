import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-64" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-10 w-40" />
          <Skeleton className="h-10 w-40" />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Skeleton className="h-28" />
        <Skeleton className="h-28" />
        <Skeleton className="h-28" />
        <Skeleton className="h-28" />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Skeleton className="h-90" />
        <Skeleton className="h-90" />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Skeleton className="h-90" />
        <Skeleton className="h-90" />
      </div>
    </div>
  );
}
