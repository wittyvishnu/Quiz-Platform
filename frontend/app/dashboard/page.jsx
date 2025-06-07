"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Plus, Eye, BarChart3, Calendar, Clock, Copy, Users, TrendingUp, Star, Zap } from "lucide-react"
import { toast } from "react-hot-toast"

export default function Dashboard() {
  const [quizzes, setQuizzes] = useState([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const copyToClipboard = async (url) => {
    try {
      await navigator.clipboard.writeText(url)
      toast.success("Public URL copied to clipboard!")
    } catch (err) {
      toast.error("Failed to copy URL")
    }
  }

  useEffect(() => {
    fetchQuizzes()
  }, [])

  const fetchQuizzes = async () => {
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        toast.error("Please login to continue")
        router.push("/login")
        return
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_Backend_URL}/api/quizzes`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch quizzes")
      }

      const data = await response.json()
      setQuizzes(data)
    } catch (error) {
      toast.error("Failed to load quizzes")
      console.error("Error fetching quizzes:", error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getRandomGradient = (index) => {
    const gradients = [
      "from-purple-500 to-pink-500",
      "from-blue-500 to-cyan-500",
      "from-green-500 to-emerald-500",
      "from-orange-500 to-red-500",
      "from-indigo-500 to-purple-500",
      "from-pink-500 to-rose-500",
    ]
    return gradients[index % gradients.length]
  }

  const QuizSkeleton = () => (
    <div className="group relative bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 to-pink-500"></div>
      <div className="p-8 space-y-6">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <Skeleton className="h-7 w-3/4 mb-3" />
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <Skeleton className="h-4 w-20" />
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>
            </div>
            <Skeleton className="h-8 w-16 rounded-full" />
          </div>
        </div>
        <Skeleton className="h-14 w-full rounded-xl" />
        <div className="flex gap-3">
          <Skeleton className="h-12 flex-1 rounded-xl" />
          <Skeleton className="h-12 flex-1 rounded-xl" />
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Quiz Dashboard
            </h1>
            <p className="text-gray-600 text-xl">Create and manage your interactive quizzes</p>
          </div>

          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-full blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
            <Button
              onClick={() => router.push("/dashboard/create-quiz")}
              className="relative w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white rounded-full py-6 text-xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]"
              size="lg"
            >
              <Plus className="w-6 h-6 mr-3" />
              Create New Quiz
              <Zap className="w-5 h-5 ml-3" />
            </Button>
          </div>
        </div>

        {/* Quizzes Section */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-800">Your Quizzes</h2>
              {!loading && (
                <p className="text-gray-600">
                  {quizzes.length} {quizzes.length === 1 ? "quiz" : "quizzes"} created
                </p>
              )}
            </div>
          </div>

          {loading ? (
            <div className="space-y-8">
              {Array.from({ length: 2 }).map((_, index) => (
                <QuizSkeleton key={index} />
              ))}
            </div>
          ) : quizzes.length === 0 ? (
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 rounded-3xl blur opacity-25"></div>
              <div className="relative bg-white rounded-3xl shadow-xl border border-gray-100 p-16 text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-8">
                  <Plus className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Create Your First Quiz</h3>
                <p className="text-gray-600 mb-10 max-w-md mx-auto text-lg leading-relaxed">
                  Start building engaging quizzes with multiple question types and instant feedback
                </p>
                <Button
                  onClick={() => router.push("/dashboard/create-quiz")}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-10 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Create Quiz
                  <Star className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {quizzes.map((quiz, index) => (
                <div
                  key={quiz.id}
                  className="group relative bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  {/* Gradient Top Border */}
                  <div
                    className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${getRandomGradient(index)}`}
                  ></div>

                  <div className="p-8 space-y-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-indigo-600 transition-colors duration-300">
                          {quiz.title}
                        </h3>
                        <div className="flex items-center gap-6 text-gray-500">
                          <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-full">
                            <Calendar className="w-4 h-4" />
                            <span className="font-medium">{formatDate(quiz.created_at)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="font-medium text-green-600">Active</span>
                          </div>
                        </div>
                      </div>
                      <Badge className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white border-0 px-4 py-2 text-sm font-semibold">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        Live
                      </Badge>
                    </div>

                    {/* URL Section with Enhanced Design */}
                    <div className="relative group/url">
                      <div className="absolute -inset-1 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl blur opacity-25 group-hover/url:opacity-40 transition duration-300"></div>
                      <div className="relative bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 flex items-center gap-4 border border-gray-200">
                        <div className="flex-1 overflow-hidden">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                            <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                              Public URL
                            </span>
                          </div>
                          <div
                            className="overflow-x-auto scrollbar-hidden"
                            style={{
                              scrollbarWidth: "none",
                              msOverflowStyle: "none",
                            }}
                          >
                            <p className="text-gray-700 whitespace-nowrap pr-2 font-mono text-sm">{quiz.public_url}</p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            copyToClipboard(quiz.public_url)
                          }}
                          className="h-10 w-10 p-0 text-indigo-600 hover:bg-indigo-100 flex-shrink-0 rounded-lg transition-all duration-200 hover:scale-110"
                          title="Copy URL"
                        >
                          <Copy className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>

                    {/* Action Buttons with Enhanced Design */}
                    <div className="flex gap-4">
                      <Button
                        variant="outline"
                        className="flex-1 border-2 border-indigo-200 text-indigo-600 hover:bg-indigo-50 hover:border-indigo-300 rounded-xl py-4 text-lg font-semibold transition-all duration-300 hover:shadow-lg group/btn"
                        onClick={() => router.push(`/dashboard/quiz/${quiz.id}`)}
                      >
                        <Eye className="w-5 h-5 mr-2 group-hover/btn:scale-110 transition-transform duration-200" />
                        View Quiz
                      </Button>
                      <Button
                        className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] group/btn"
                        onClick={() => router.push(`/dashboard/quiz/${quiz.id}/responses`)}
                      >
                        <BarChart3 className="w-5 h-5 mr-2 group-hover/btn:scale-110 transition-transform duration-200" />
                        Responses
                        <Users className="w-4 h-4 ml-2" />
                      </Button>
                    </div>

                   
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
