"use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Trophy, ExternalLink, Crown, Medal, Users } from "lucide-react"

export default function LeaderboardTable({ responses, quiz, quizId, router }) {
  const extractUserName = (fullName) => {
    return fullName.split(":")[0] || fullName
  }

  const getUserInitials = (name) => {
    const cleanName = extractUserName(name)
    return cleanName
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase())
      .join("")
      .slice(0, 2)
  }

  const calculateScore = (correctAnswers, totalQuestions) => {
    if (totalQuestions === 0) return 0
    return Math.round((correctAnswers / totalQuestions) * 100)
  }

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Crown className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
      case 2:
        return <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
      case 3:
        return <Medal className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
      default:
        return (
          <span className="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center text-gray-500 font-bold text-xs sm:text-sm">
            {rank}
          </span>
        )
    }
  }

  const getScoreBadge = (score) => {
    if (score >= 80) return "bg-green-100 text-green-800 hover:bg-green-100"
    if (score >= 60) return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
    return "bg-red-100 text-red-800 hover:bg-red-100"
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return {
      shortDate: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      time: date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    }
  }

  const sortedResponses = [...responses].sort((a, b) => {
    if (b.total_correct_answers !== a.total_correct_answers) {
      return b.total_correct_answers - a.total_correct_answers
    }
    return new Date(a.submitted_at) - new Date(b.submitted_at)
  })

  if (responses.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border p-8 sm:p-12 text-center">
        <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No responses found</h3>
        <p className="text-gray-500">Share your quiz link to start collecting responses and see the leaderboard.</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Trophy className="w-6 h-6 sm:w-8 sm:h-8" />
            <h2 className="text-xl sm:text-2xl font-bold">Quiz Leaderboard</h2>
          </div>
          {quiz && (
            <span className="text-base sm:text-lg font-normal opacity-90 truncate max-w-[150px] sm:max-w-none">
              {quiz.title}
            </span>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-3 sm:px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[60px]">
                Rank
              </th>
              <th className="px-3 sm:px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[200px]">
                Participant
              </th>
              <th className="px-3 sm:px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[80px]">
                Score
              </th>
              <th className="px-3 sm:px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[120px]">
                Correct Answers
              </th>
              <th className="px-3 sm:px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[100px]">
                Submitted
              </th>
              <th className="px-3 sm:px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[80px]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedResponses.map((response, index) => {
              const rank = index + 1
              const userName = extractUserName(response.name)
              const userInitials = getUserInitials(response.name)
              const totalQuestions = quiz?.questions?.length || 0
              const score = calculateScore(response.total_correct_answers, totalQuestions)
              const date = formatDate(response.submitted_at)

              return (
                <tr
                  key={response.name}
                  className={`hover:bg-gray-50 transition-colors ${
                    rank <= 3 ? "bg-gradient-to-r from-yellow-50 to-orange-50" : ""
                  }`}
                >
                  <td className="px-3 sm:px-6 py-4">
                    <div className="flex items-center justify-center w-8 h-8">{getRankIcon(rank)}</div>
                  </td>

                  <td className="px-3 sm:px-6 py-4">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <div className="flex-shrink-0">
                        <Avatar className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-indigo-500 to-purple-500">
                          <AvatarFallback className="text-white font-bold text-xs sm:text-sm">
                            {userInitials}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-medium text-gray-900 truncate">{userName}</div>
                        <div className="text-xs text-gray-500">Rank #{rank}</div>
                      </div>
                    </div>
                  </td>

                  <td className="px-3 sm:px-6 py-4">
                    <Badge className={`text-xs sm:text-sm font-bold whitespace-nowrap ${getScoreBadge(score)}`}>
                      {score}%
                    </Badge>
                  </td>

                  <td className="px-3 sm:px-6 py-4">
                    <div className="text-sm font-medium text-gray-900 whitespace-nowrap">
                      {response.total_correct_answers}/{totalQuestions}
                    </div>
                    <div className="text-xs text-gray-500">questions</div>
                  </td>

                  <td className="px-3 sm:px-6 py-4">
                    <div className="text-sm text-gray-900 whitespace-nowrap">{date.shortDate}</div>
                    <div className="text-xs text-gray-500 whitespace-nowrap">{date.time}</div>
                  </td>

                  <td className="px-3 sm:px-6 py-4">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => router.push(`/quiz/${quizId}/response?userid=${response.name}`)}
                      className="whitespace-nowrap text-xs sm:text-sm"
                    >
                      <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                      View
                    </Button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Scroll indicator for mobile */}
      <div className="sm:hidden bg-gray-50 px-4 py-2 text-center">
        <p className="text-xs text-gray-500">← Scroll horizontally to see more →</p>
      </div>
    </div>
  )
}
