"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart3, ArrowLeft } from "lucide-react"

export default function ErrorState({ error, router }) {
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

        <Card className="bg-white rounded-2xl shadow-lg border-0 max-w-lg mx-auto">
          <CardContent className="p-6 sm:p-8 text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <BarChart3 className="w-8 h-8 sm:w-10 sm:h-10 text-red-600" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3">No Responses Found</h2>
            <p className="text-gray-600 mb-6 text-sm sm:text-base">{error}</p>
            <Button onClick={() => router.push("/dashboard")} className="bg-indigo-600 hover:bg-indigo-700">
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
