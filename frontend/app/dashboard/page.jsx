"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Plus, Eye, BarChart3, Calendar, Clock, Copy } from "lucide-react"
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

  const QuizSkeleton = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
      <div className="space-y-3">
        <Skeleton className="h-6 w-3/4" />
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
      <Skeleton className="h-12 w-full rounded-lg" />
      <div className="flex gap-3">
        <Skeleton className="h-10 flex-1 rounded-lg" />
        <Skeleton className="h-10 flex-1 rounded-lg" />
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-indigo-600 mb-2">Quiz Dashboard</h1>
          <p className="text-gray-600 text-lg mb-8">Create and manage your interactive quizzes</p>

          <Button
            onClick={() => router.push("/dashboard/create-quiz")}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-full py-4 text-lg font-medium"
            size="lg"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create New Quiz
          </Button>
        </div>

        {/* Quizzes Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <BarChart3 className="w-6 h-6 text-indigo-600" />
            <h2 className="text-2xl font-bold text-gray-800">
              Your Quizzes {!loading && <span className="text-lg font-normal text-gray-500">({quizzes.length})</span>}
            </h2>
          </div>

          {loading ? (
            <div className="space-y-6">
              {Array.from({ length: 2 }).map((_, index) => (
                <QuizSkeleton key={index} />
              ))}
            </div>
          ) : quizzes.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
              <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Plus className="w-10 h-10 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Create Your First Quiz</h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto text-lg">
                Start building engaging quizzes with multiple question types and instant feedback
              </p>
              <Button
                onClick={() => router.push("/dashboard/create-quiz")}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create Quiz
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {quizzes.map((quiz) => (
                <div key={quiz.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-3">{quiz.title}</h3>
                      <div className="flex items-center gap-6 text-gray-500">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(quiz.created_at)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>Active</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-100 rounded-lg p-4 flex items-center gap-3">
                      <div className="flex-1 overflow-hidden">
                        <div
                          className="overflow-x-auto scrollbar-hidden"
                          style={{
                            scrollbarWidth: "none",
                            msOverflowStyle: "none",
                          }}
                        >
                          <p className="text-gray-600 whitespace-nowrap pr-2">{quiz.public_url}</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          copyToClipboard(quiz.public_url)
                        }}
                        className="h-8 w-8 p-0 text-indigo-600 hover:bg-indigo-50 flex-shrink-0 rounded-md"
                        title="Copy URL"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        className="flex-1 border-gray-200 text-indigo-600 hover:bg-indigo-50 rounded-lg py-3"
                        onClick={() => router.push(`/dashboard/quiz/${quiz.id}`)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      <Button
                        className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg py-3"
                        onClick={() => router.push(`/dashboard/quiz/${quiz.id}/responses`)}
                      >
                        <BarChart3 className="w-4 h-4 mr-2" />
                        Responses
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
