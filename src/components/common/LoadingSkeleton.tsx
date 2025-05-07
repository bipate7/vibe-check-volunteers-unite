
import { Skeleton } from "@/components/ui/skeleton";

type LoadingSkeletonProps = {
  count?: number;
  type?: 'card' | 'table' | 'form';
};

const LoadingSkeleton = ({ count = 3, type = 'card' }: LoadingSkeletonProps) => {
  if (type === 'card') {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array(count).fill(0).map((_, i) => (
          <div key={i} className="p-4 border rounded-md bg-card">
            <div className="flex justify-between items-start">
              <div>
                <Skeleton className="h-5 w-32 mb-2" />
                <Skeleton className="h-8 w-24" />
              </div>
              <Skeleton className="h-10 w-10 rounded-full" />
            </div>
            <div className="mt-4">
              <Skeleton className="h-4 w-full mt-2" />
              <Skeleton className="h-4 w-3/4 mt-2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'table') {
    return (
      <div className="border rounded-md">
        <div className="p-4 border-b bg-muted/40">
          <div className="flex gap-4">
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-6 w-1/4" />
          </div>
        </div>
        {Array(count).fill(0).map((_, i) => (
          <div key={i} className="p-4 border-b">
            <div className="flex gap-4">
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-6 w-1/4" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'form') {
    return (
      <div className="space-y-6">
        {Array(count).fill(0).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>
        ))}
        <Skeleton className="h-10 w-32 mt-4" />
      </div>
    );
  }

  return null;
};

export default LoadingSkeleton;
