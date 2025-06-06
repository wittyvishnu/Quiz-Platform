import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function LoadingSkeleton() {
  return (
    <div className="space-y-8">
      {/* Header Skeleton */}
      <Card className="bg-white rounded-2xl shadow-lg border-0">
        <div className="bg-gradient-to-r from-gray-200 to-gray-300 p-6">
          <Skeleton className="h-8 w-3/4 mb-4 bg-white/20" />
          <div className="flex items-center gap-6">
            <Skeleton className="h-4 w-32 bg-white/20" />
            <Skeleton className="h-4 w-24 bg-white/20" />
            <Skeleton className="h-4 w-28 bg-white/20" />
          </div>
        </div>
        <CardContent className="p-6">
          <Skeleton className="h-12 w-full mb-4" />
          <Skeleton className="h-4 w-64" />
        </CardContent>
      </Card>

      {/* Actions Skeleton */}
      <Card className="bg-white rounded-2xl shadow-lg border-0">
        <CardContent className="p-6">
          <Skeleton className="h-6 w-32 mb-4" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} className="h-10 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Questions Skeleton */}
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        {Array.from({ length: 3 }).map((_, index) => (
          <Card key={index} className="bg-white rounded-2xl shadow-lg border-0">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-indigo-50">
              <div className="flex items-center justify-between">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-6 w-32" />
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <Skeleton className="h-16 w-full mb-4" />
              <div className="space-y-3">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-3/4" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Statistics Skeleton */}
      <Card className="bg-white rounded-2xl shadow-lg border-0">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-indigo-50">
          <Skeleton className="h-6 w-48" />
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-24 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
