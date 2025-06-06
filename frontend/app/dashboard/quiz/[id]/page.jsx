"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { toast } from "react-hot-toast"
import QuizHeader from "@/components/view-Quiz/QuizHeader"
import QuizActions from "@/components/view-Quiz/QuizActions"
import QuestionsList from "@/components/view-Quiz/QuestionsList"
import QuizStatistics from "@/components/view-Quiz/QuizStatistics"
import LoadingSkeleton from "@/components/view-Quiz/LoadingSkeleton"
import ErrorState from "@/components/view-Quiz/ErrorState"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function QuizView() {
  const router = useRouter()
  const params = useParams()
  const [quiz, setQuiz] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params.id) {
      fetchQuiz()
    }
  }, [params.id])

  const fetchQuiz = async () => {
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        toast.error("Please login to continue")
        router.push("/login")
        return
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_Backend_URL}/api/quizzes/${params.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch quiz")
      }

      const data = await response.json()
      setQuiz(data)
    } catch (error) {
      toast.error("Failed to load quiz")
      console.error("Error fetching quiz:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="container mx-auto px-6 py-8">
          <Button
            variant="ghost"
            onClick={() => router.push("/dashboard")}
            className="mb-6 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </Button>
          <div className="max-w-5xl mx-auto">
            <LoadingSkeleton />
          </div>
        </div>
      </div>
    )
  }

  if (!quiz) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="container mx-auto px-6 py-8">
          <Button
            variant="ghost"
            onClick={() => router.push("/dashboard")}
            className="mb-6 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </Button>
          <div className="max-w-5xl mx-auto">
            <ErrorState onBackToDashboard={() => router.push("/dashboard")} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto px-6 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => router.push("/dashboard")}
          className="mb-6 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 flex items-center gap-2 transition-all duration-200"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </Button>

        <div className="max-w-5xl mx-auto space-y-8">
          {/* Quiz Header */}
          <QuizHeader quiz={quiz} />

          {/* Quiz Actions */}
          <QuizActions quiz={quiz} router={router} />

          {/* Questions List */}
          <QuestionsList questions={quiz.questions} />

        </div>
      </div>
    </div>
  )
}
