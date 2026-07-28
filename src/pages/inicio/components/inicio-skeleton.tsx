import { cn } from '@/shared/lib/utils'

function SkeletonBlock({ className }: { className?: string }) {
  return <div className={cn('animate-pulse rounded-lg bg-muted', className)} />
}

export function InicioSkeleton() {
  return (
    <div>
      <div className="mb-8 flex flex-col items-start gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-2">
          <SkeletonBlock className="h-3 w-32" />
          <SkeletonBlock className="h-7 w-48" />
        </div>
        <SkeletonBlock className="h-9 w-full sm:w-40" />
      </div>

      <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <SkeletonBlock className="h-28" />
        <SkeletonBlock className="h-28" />
        <SkeletonBlock className="h-28" />
      </div>

      <div className="mb-4 flex flex-col gap-2">
        <SkeletonBlock className="h-5 w-56" />
        <SkeletonBlock className="h-4 w-80 max-w-full" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <SkeletonBlock key={index} className="h-40" />
        ))}
      </div>
    </div>
  )
}
