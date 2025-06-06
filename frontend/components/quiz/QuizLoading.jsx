import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function QuizLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-10 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header Skeleton */}
        <Card className="bg-white rounded-2xl shadow-lg border-0 overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
            <Skeleton className="h-10 w-3/4 bg-white/20 mb-2" />
            <Skeleton className="h-5 w-1/2 bg-white/20" />
          </div>
          <CardContent className="p-6">
            <Skeleton className="h-5 w-full" />
          </CardContent>
        </Card>

        {/* Name Input Skeleton */}
        <Card className="bg-white rounded-2xl shadow-lg border-0 mb-8">
          <CardContent className="p-6">
            <Skeleton className="h-6 w-32 mb-4" />
            <Skeleton className="h-14 w-full" />
          </CardContent>
        </Card>

        {/* Questions Skeletons */}
        {[1, 2, 3].map((i) => (
          <Card key={i} className="bg-white rounded-2xl shadow-lg border-0 mb-8">
            <CardContent className="p-6">
              <div className="flex items-start gap-4 mb-6">
                <Skeleton className="h-8 w-8 rounded-full" />
                <div className="flex-1">
                  <Skeleton className="h-7 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/3" />
                </div>
              </div>
              <div className="pl-12 space-y-3">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Submit Button Skeleton */}
        <div className="flex justify-center mt-8 mb-16">
          <Skeleton className="h-14 w-40" />
        </div>
      </div>
    </div>
  )
}
