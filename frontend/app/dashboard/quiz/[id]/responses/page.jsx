"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { toast } from "react-hot-toast"
import AnalyticsOverview from "@/components/responses/AnalyticsOverview"
import LeaderboardTable from "@/components/responses/LeaderboardTable"
import LoadingSkeleton from "@/components/responses/LoadingSkeleton"
import ErrorState from "@/components/responses/ErrorState"

export default function QuizResponsesPage() {
  const router = useRouter()
  const params = useParams()
  const [responses, setResponses] = useState([])
  const [quiz, setQuiz] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (params.id) {
      fetchResponses()
      fetchQuizDetails()
    }
  }, [params.id])

  const fetchResponses = async () => {
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        toast.error("Please login to continue")
        router.push("/login")
        return
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_Backend_URL}/api/responses/${params.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch responses")
      }

      const data = await response.json()
      setResponses(data)
    } catch (error) {
      console.error("Error fetching responses:", error)
      setError("Failed to load quiz responses")
      toast.error("Failed to load responses")
    } finally {
      setLoading(false)
    }
  }

  const fetchQuizDetails = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`${process.env.NEXT_PUBLIC_Backend_URL}/api/quizzes/${params.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      if (response.ok) {
        const data = await response.json()
        setQuiz(data)
      }
    } catch (error) {
      console.error("Error fetching quiz details:", error)
    }
  }

  if (loading) {
    return <LoadingSkeleton router={router} />
  }

  if (error) {
    return <ErrorState error={error} router={router} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <Button
          variant="ghost"
          onClick={() => router.push("/dashboard")}
          className="mb-6 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 flex items-center gap-2 transition-all duration-200"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-sm sm:text-base">Back to Dashboard</span>
        </Button>

        <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
          <AnalyticsOverview responses={responses} quiz={quiz} />
          <LeaderboardTable responses={responses} quiz={quiz} quizId={params.id} router={router} />
        </div>
      </div>
    </div>
  )
}
