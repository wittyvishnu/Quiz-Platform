"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { toast } from "react-hot-toast"
import QuizHeader from "@/components/quiz/QuizHeader"
import QuizForm from "@/components/quiz/QuizForm"
import QuizLoading from "@/components/quiz/QuizLoading"
import QuizError from "@/components/quiz/QuizError"
import QuizSuccess from "@/components/quiz/QuizSuccess"

export default function QuizPage() {
  const router = useRouter()
  const params = useParams()
  const [quiz, setQuiz] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [userId, setUserId] = useState(null)

  useEffect(() => {
    if (params.id) {
      fetchQuiz()
    }
  }, [params.id])

  const fetchQuiz = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${process.env.NEXT_PUBLIC_Backend_URL}/api/quizzes/${params.id}`)

      if (!response.ok) {
        throw new Error("Failed to fetch quiz")
      }

      const data = await response.json()
      setQuiz(data)
    } catch (error) {
      console.error("Error fetching quiz:", error)
      setError("Failed to load quiz. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (name, answers) => {
    try {
      setSubmitting(true)

      const payload = {
        quiz_id: quiz.id,
        name: name,
        answers: answers,
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_Backend_URL}/api/responses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error("Failed to submit quiz")
      }

      const data = await response.json()
      setUserId(data.userid)
      setSubmitted(true)
      toast.success("Quiz submitted successfully!")
    } catch (error) {
      console.error("Error submitting quiz:", error)
      toast.error("Failed to submit quiz. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  const viewResults = () => {
    router.push(`/quiz/${params.id}/response?userid=${userId}`)
  }

  if (loading) {
    return <QuizLoading />
  }

  if (error || !quiz) {
    return <QuizError error={error} />
  }

  if (submitted) {
    return <QuizSuccess quizTitle={quiz.title} onViewResults={viewResults} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-10 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <QuizHeader title={quiz.title} questionCount={quiz.questions?.length || 0} />
        <QuizForm quiz={quiz} onSubmit={handleSubmit} submitting={submitting} />
      </div>
    </div>
  )
}
