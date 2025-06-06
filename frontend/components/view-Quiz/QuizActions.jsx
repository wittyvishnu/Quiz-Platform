"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Eye, BarChart3, Share2, Edit, Trash2, Download } from "lucide-react"
import { toast } from "react-hot-toast"

export default function QuizActions({ quiz, router }) {
  const copyToClipboard = async (url) => {
    try {
      await navigator.clipboard.writeText(url)
      toast.success("Quiz URL copied to clipboard!")
    } catch (err) {
      toast.error("Failed to copy URL")
    }
  }

  return (
    <Card className="bg-white rounded-2xl shadow-lg border-0">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Quiz Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 ">
          <Button
            onClick={() => window.open(quiz.public_url, "_blank")}
            className="bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white shadow-md hover:shadow-lg transition-all duration-200"
          >
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>

          <Button
            variant="outline"
            onClick={() => router.push(`/dashboard/quiz/${quiz.id}/responses`)}
            className="border-purple-200 text-purple-600 hover:bg-purple-50 hover:border-purple-300 transition-all duration-200"
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Responses
          </Button>

          <Button
            variant="outline"
            onClick={() => copyToClipboard(quiz.public_url)}
            className="border-green-200 text-green-600 hover:bg-green-50 hover:border-green-300 transition-all duration-200"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>

                  </div>
      </CardContent>
    </Card>
  )
}
