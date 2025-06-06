"use client"

import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, HelpCircle, Copy, Globe } from "lucide-react"
import { toast } from "react-hot-toast"

export default function QuizHeader({ quiz }) {
  const copyToClipboard = async (url) => {
    try {
      await navigator.clipboard.writeText(url)
      toast.success("Public URL copied to clipboard!")
    } catch (err) {
      toast.error("Failed to copy URL")
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <Card className="bg-white rounded-2xl shadow-lg border-0 overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
        <CardTitle className="text-3xl font-bold mb-4">{quiz.title}</CardTitle>
        <div className="flex flex-wrap items-center gap-6 text-indigo-100">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            <span>Created {formatDate(quiz.created_at)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            <Badge className="bg-green-500 text-white border-0">Active</Badge>
          </div>
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5" />
            <span>{quiz.questions?.length || 0} Questions</span>
          </div>
        </div>
      </div>

      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-3 block flex items-center gap-2">
              <Globe className="w-4 h-4 text-indigo-600" />
              Public Quiz URL
            </label>
            <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-gray-50 to-indigo-50 rounded-xl border border-gray-200">
              <span className="text-sm text-gray-700 flex-1 font-mono break-all">{quiz.public_url}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(quiz.public_url)}
                className="h-10 w-10 p-0 hover:bg-indigo-100 text-indigo-600 rounded-lg transition-all duration-200"
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
              <span>💡</span>
              Share this URL with participants to take the quiz
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
