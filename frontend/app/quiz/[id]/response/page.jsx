"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams, useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  Award,
  Clock,
  BarChart3,
  AlertTriangle,
  Trophy,
  Target,
  TrendingUp,
} from "lucide-react"
import { toast } from "react-hot-toast"

export default function QuizResponsePage() {
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()
  const userId = searchParams.get("userid")

  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (params.id && userId) {
      fetchResponse()
    } else {
      setError("Missing quiz ID or user ID")
      setLoading(false)
    }
  }, [params.id, userId])

  const fetchResponse = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${process.env.NEXT_PUBLIC_Backend_URL}/api/responses/public/${params.id}/${userId}`)

      if (!response.ok) {
        throw new Error("Failed to fetch quiz results")
      }

      const data = await response.json()
      setResponse(data)
    } catch (error) {
      console.error("Error fetching quiz results:", error)
      setError("Failed to load your quiz results. Please try again later.")
      toast.error("Failed to load quiz results")
    } finally {
      setLoading(false)
    }
  }

  const calculateStats = () => {
    if (!response || !response.questions) return { score: 0, correct: 0, total: 0 }

    const total = response.questions.length
    const correct = response.questions.filter((q) => q.user_response?.is_correct).length
    const score = total > 0 ? Math.round((correct / total) * 100) : 0

    return { score, correct, total }
  }

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreBgColor = (score) => {
    if (score >= 80) return "from-green-50 to-emerald-50 border-green-200"
    if (score >= 60) return "from-yellow-50 to-orange-50 border-yellow-200"
    return "from-red-50 to-pink-50 border-red-200"
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

  const getUserName = () => {
    if (!userId) return "User"
    return userId.split(":")[0] || "User"
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-10 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-6 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </Button>

          <Card className="bg-white rounded-2xl shadow-lg border-0 mb-8">
            <CardContent className="p-8">
              <div className="flex flex-col items-center justify-center">
                <Skeleton className="h-20 w-20 rounded-full mb-4" />
                <Skeleton className="h-8 w-48 mb-2" />
                <Skeleton className="h-6 w-64 mb-6" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                  <Skeleton className="h-32 w-full" />
                  <Skeleton className="h-32 w-full" />
                  <Skeleton className="h-32 w-full" />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="bg-white rounded-2xl shadow-lg border-0">
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
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error || !response) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-10 px-4 sm:px-6 flex items-center justify-center">
        <Card className="bg-white rounded-2xl shadow-lg border-0 max-w-lg w-full">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-10 h-10 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Results Not Available</h2>
            <p className="text-gray-600 mb-6">
              {error || "Your quiz results couldn't be loaded. They may have expired or are temporarily unavailable."}
            </p>
            <Button onClick={() => router.push("/")} className="bg-indigo-600 hover:bg-indigo-700">
              Return Home
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const stats = calculateStats()

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => router.push("/")}
          className="mb-6 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 flex items-center gap-2 transition-all duration-200"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Button>

        {/* Results Summary */}
        <Card className="bg-white rounded-2xl shadow-lg border-0 mb-8 overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white text-center">
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-14 h-14 text-white" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Quiz Results</h1>
            <p className="text-indigo-100 text-lg">
              {response.quiz_title} - {getUserName()}
            </p>
          </div>

          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className={`bg-gradient-to-r ${getScoreBgColor(stats.score)} p-6 rounded-xl text-center border-2`}>
                <div
                  className={`text-5xl font-bold ${getScoreColor(stats.score)} mb-2 flex items-center justify-center gap-2`}
                >
                  <Award className="w-8 h-8" />
                  {stats.score}%
                </div>
                <div className={`${getScoreColor(stats.score)} font-semibold text-lg`}>Overall Score</div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl text-center border-2 border-blue-200">
                <div className="text-5xl font-bold text-blue-600 mb-2 flex items-center justify-center gap-2">
                  <Target className="w-8 h-8" />
                  {stats.correct}/{stats.total}
                </div>
                <div className="text-blue-700 font-semibold text-lg">Correct Answers</div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl text-center border-2 border-purple-200">
                <div className="text-5xl font-bold text-purple-600 mb-2 flex items-center justify-center gap-2">
                  <TrendingUp className="w-8 h-8" />
                  {stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0}%
                </div>
                <div className="text-purple-700 font-semibold text-lg">Accuracy Rate</div>
              </div>
            </div>

            <div className="text-center p-6 bg-gradient-to-r from-gray-50 to-indigo-50 rounded-xl border border-gray-200">
              <p className="text-gray-700 text-lg mb-4">
                {stats.score >= 80
                  ? "🎉 Excellent work! You've demonstrated outstanding knowledge."
                  : stats.score >= 60
                    ? "👍 Good job! You have a solid understanding of the material."
                    : "📚 Keep learning! Practice makes perfect."}
              </p>
              <Button
                onClick={() => router.push("/")}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Take Another Quiz
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Question Breakdown */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <BarChart3 className="w-6 h-6 text-indigo-600" />
            <h2 className="text-2xl font-bold text-gray-800">Detailed Results</h2>
          </div>

          {response.questions.map((question, index) => {
            const isCorrect = question.user_response?.is_correct
            const userAnswer = question.user_response?.answer || question.user_response?.text_answer

            return (
              <Card
                key={question.question_id}
                className={`bg-white rounded-2xl shadow-lg border-0 overflow-hidden ${
                  isCorrect ? "border-l-4 border-green-500" : "border-l-4 border-red-500"
                }`}
              >
                <CardHeader className="bg-gradient-to-r from-gray-50 to-indigo-50 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-3">
                      <span
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                          isCorrect ? "bg-green-500" : "bg-red-500"
                        }`}
                      >
                        {index + 1}
                      </span>
                      Question {index + 1}
                    </CardTitle>
                    <Badge
                      className={`${
                        isCorrect
                          ? "bg-green-100 text-green-700 border-green-200"
                          : "bg-red-100 text-red-700 border-red-200"
                      }`}
                    >
                      {isCorrect ? (
                        <>
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Correct
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3 h-3 mr-1" />
                          Incorrect
                        </>
                      )}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="p-6">
                  <div className="space-y-6">
                    {/* Question Text */}
                    <div>
                      <label className="text-sm font-semibold text-gray-700 mb-3 block">Question</label>
                      <div className="p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200">
                        <p className="text-gray-800 font-medium leading-relaxed">{question.question_text}</p>
                      </div>
                    </div>

                    {/* Multiple Choice Questions */}
                    {question.type === "single-choice" && question.options && (
                      <div>
                        <label className="text-sm font-semibold text-gray-700 mb-3 block">Answer Options</label>
                        <div className="space-y-3">
                          {question.options.map((option) => {
                            const isUserChoice = userAnswer === option.id
                            const isCorrectOption = option.is_correct

                            return (
                              <div
                                key={option.id}
                                className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-200 ${
                                  isCorrectOption
                                    ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 shadow-md"
                                    : isUserChoice && !isCorrectOption
                                      ? "bg-gradient-to-r from-red-50 to-pink-50 border-red-200 shadow-md"
                                      : "bg-gray-50 border-gray-200"
                                }`}
                              >
                                <div
                                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                    isCorrectOption
                                      ? "border-green-500 bg-green-500"
                                      : isUserChoice && !isCorrectOption
                                        ? "border-red-500 bg-red-500"
                                        : "border-gray-300"
                                  }`}
                                >
                                  {isCorrectOption && <CheckCircle className="w-4 h-4 text-white" />}
                                  {isUserChoice && !isCorrectOption && <XCircle className="w-4 h-4 text-white" />}
                                  {!isCorrectOption && !isUserChoice && (
                                    <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
                                  )}
                                </div>
                                <span
                                  className={`flex-1 font-medium ${
                                    isCorrectOption
                                      ? "text-green-800"
                                      : isUserChoice && !isCorrectOption
                                        ? "text-red-800"
                                        : "text-gray-700"
                                  }`}
                                >
                                  {option.text}
                                </span>
                                {isCorrectOption && (
                                  <Badge className="bg-green-600 text-white border-0 shadow-sm">✓ Correct Answer</Badge>
                                )}
                                {isUserChoice && !isCorrectOption && (
                                  <Badge className="bg-red-600 text-white border-0 shadow-sm">Your Choice</Badge>
                                )}
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )}

                    {/* Short Text Questions */}
                    {question.type === "short-text" && (
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-semibold text-gray-700 mb-3 block">Your Answer</label>
                          <div
                            className={`p-4 rounded-xl border-2 ${
                              isCorrect
                                ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 shadow-md"
                                : "bg-gradient-to-r from-red-50 to-pink-50 border-red-200 shadow-md"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              {isCorrect ? (
                                <CheckCircle className="w-6 h-6 text-green-600" />
                              ) : (
                                <XCircle className="w-6 h-6 text-red-600" />
                              )}
                              <span
                                className={`font-semibold text-lg ${isCorrect ? "text-green-800" : "text-red-800"}`}
                              >
                                {userAnswer}
                              </span>
                            </div>
                          </div>
                        </div>

                        {!isCorrect && question.correct_answer && (
                          <div>
                            <label className="text-sm font-semibold text-gray-700 mb-3 block">Correct Answer</label>
                            <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl shadow-md">
                              <div className="flex items-center gap-3">
                                <CheckCircle className="w-6 h-6 text-green-600" />
                                <span className="font-semibold text-green-800 text-lg">{question.correct_answer}</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Submission Time */}
                    {question.user_response?.submitted_at && (
                      <div className="pt-4 border-t border-gray-100">
                        <p className="text-sm text-gray-500 flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          Answered on {formatDate(question.user_response.submitted_at)}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Performance Summary */}
        <Card className="bg-white rounded-2xl shadow-lg border-0 mt-8">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-indigo-50 border-b border-gray-100">
            <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-3">
              <BarChart3 className="w-6 h-6 text-indigo-600" />
              Performance Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-800">Question Types Performance</h4>
                <div className="space-y-2">
                  {["single-choice", "short-text"].map((type) => {
                    const typeQuestions = response.questions.filter((q) => q.type === type)
                    const typeCorrect = typeQuestions.filter((q) => q.user_response?.is_correct).length
                    const typeTotal = typeQuestions.length
                    const typePercentage = typeTotal > 0 ? Math.round((typeCorrect / typeTotal) * 100) : 0

                    if (typeTotal === 0) return null

                    return (
                      <div key={type} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium text-gray-700">
                          {type === "single-choice" ? "Multiple Choice" : "Short Answer"}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">
                            {typeCorrect}/{typeTotal}
                          </span>
                          <Badge
                            className={`${typePercentage >= 70 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                          >
                            {typePercentage}%
                          </Badge>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-gray-800">Recommendations</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  {stats.score >= 80 ? (
                    <p className="p-3 bg-green-50 rounded-lg border border-green-200">
                      🌟 Excellent performance! You have a strong grasp of the material.
                    </p>
                  ) : stats.score >= 60 ? (
                    <p className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                      📖 Good work! Review the incorrect answers to improve further.
                    </p>
                  ) : (
                    <p className="p-3 bg-red-50 rounded-lg border border-red-200">
                      📚 Consider reviewing the material and practicing more questions.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
