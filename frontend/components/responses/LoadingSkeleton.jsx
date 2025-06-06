"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowLeft } from "lucide-react"

export default function LoadingSkeleton({ router }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <Button
          variant="ghost"
          onClick={() => router.push("/dashboard")}
          className="mb-6 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-sm sm:text-base">Back to Dashboard</span>
        </Button>

        <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
          {/* Analytics Skeleton */}
          <Card className="bg-white rounded-2xl shadow-lg border-0">
            <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 sm:p-6">
              <div className="flex items-center gap-3">
                <Skeleton className="h-6 w-6 sm:h-8 sm:w-8 bg-white/20" />
                <Skeleton className="h-6 sm:h-8 w-32 sm:w-48 bg-white/20" />
              </div>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 lg:p-8">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-24 sm:h-32 w-full" />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Leaderboard Skeleton */}
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-4 sm:p-6">
              <div className="flex items-center gap-3">
                <Skeleton className="h-6 w-6 sm:h-8 sm:w-8 bg-white/20" />
                <Skeleton className="h-6 sm:h-8 w-40 sm:w-64 bg-white/20" />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-4 sm:px-6 py-4">
                      <Skeleton className="h-4 w-12" />
                    </th>
                    <th className="px-4 sm:px-6 py-4">
                      <Skeleton className="h-4 w-24" />
                    </th>
                    <th className="px-4 sm:px-6 py-4">
                      <Skeleton className="h-4 w-16" />
                    </th>
                    <th className="px-4 sm:px-6 py-4 hidden sm:table-cell">
                      <Skeleton className="h-4 w-20" />
                    </th>
                    <th className="px-4 sm:px-6 py-4 hidden md:table-cell">
                      <Skeleton className="h-4 w-20" />
                    </th>
                    <th className="px-4 sm:px-6 py-4">
                      <Skeleton className="h-4 w-16" />
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[1, 2, 3].map((i) => (
                    <tr key={i}>
                      <td className="px-4 sm:px-6 py-4">
                        <Skeleton className="h-8 w-8 rounded-full mx-auto" />
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <div className="flex items-center space-x-3 sm:space-x-4">
                          <Skeleton className="h-10 w-10 sm:h-12 sm:w-12 rounded-full" />
                          <div className="flex-1">
                            <Skeleton className="h-4 w-24 mb-1" />
                            <Skeleton className="h-3 w-16" />
                          </div>
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <Skeleton className="h-6 w-16" />
                      </td>
                      <td className="px-4 sm:px-6 py-4 hidden sm:table-cell">
                        <Skeleton className="h-4 w-12 mb-1" />
                        <Skeleton className="h-3 w-16" />
                      </td>
                      <td className="px-4 sm:px-6 py-4 hidden md:table-cell">
                        <Skeleton className="h-4 w-16 mb-1" />
                        <Skeleton className="h-3 w-12" />
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <Skeleton className="h-8 w-16" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
