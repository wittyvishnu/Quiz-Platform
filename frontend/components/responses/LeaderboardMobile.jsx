"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Clock, ExternalLink } from "lucide-react"

export default function LeaderboardMobile({
  responses,
  quiz,
  quizId,
  router,
  extractUserName,
  getUserInitials,
  calculateScore,
  getRankIcon,
  getScoreBadgeColor,
  formatDate,
}) {
  return (
    <div className="divide-y divide-gray-100">
      {responses.map((response, index) => {
        const rank = index + 1
        const userName = extractUserName(response.name)
        const userInitials = getUserInitials(response.name)
        const totalQuestions = quiz?.questions?.length || 0
        const score = calculateScore(response.total_correct_answers, totalQuestions)

        return (
          <div
            key={response.name}
            className={`p-4 sm:p-6 hover:bg-gray-50 transition-colors ${
              rank <= 3 ? "bg-gradient-to-r from-yellow-50 to-orange-50" : ""
            }`}
          >
            <div className="space-y-4">
              {/* Header Row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10">{getRankIcon(rank)}</div>
                <Avatar className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 shadow-md flex items-center justify-center">
                  <AvatarFallback className="text-black font-semibold text-base sm:text-lg tracking-wide">
                    {userInitials}
                  </AvatarFallback>
                </Avatar>

                  <div>
                    <div className="font-semibold text-gray-800 text-base sm:text-lg">{userName}</div>
                    <div className="text-xs sm:text-sm text-gray-500">Rank #{rank}</div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => router.push(`/quiz/${quizId}/response?userid=${response.name}`)}
                  className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 p-2"
                >
                  <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <Badge className={`text-sm sm:text-base font-bold px-2 py-1 ${getScoreBadgeColor(score)}`}>
                    {score}%
                  </Badge>
                  <div className="text-xs text-gray-500 mt-1">Score</div>
                </div>
                <div className="text-center">
                  <div className="text-sm sm:text-base font-semibold text-gray-800">
                    {response.total_correct_answers}/{totalQuestions}
                  </div>
                  <div className="text-xs text-gray-500">Correct</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-gray-600">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="text-xs sm:text-sm">{formatDate(response.submitted_at)}</span>
                  </div>
                  <div className="text-xs text-gray-500">Submitted</div>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
