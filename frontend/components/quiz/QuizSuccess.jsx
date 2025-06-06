"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, BarChart3, ArrowRight } from "lucide-react"
import confetti from "canvas-confetti"
import { useEffect } from "react"

export default function QuizSuccess({ quizTitle, onViewResults }) {
  useEffect(() => {
    // Trigger confetti animation
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    })
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-10 px-4 sm:px-6 flex items-center justify-center">
      <Card className="bg-white rounded-2xl shadow-lg border-0 max-w-lg w-full">
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-8 text-white text-center">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl font-bold mb-2">Quiz Submitted!</h2>
          <p className="text-green-100 text-lg">Thank you for completing "{quizTitle}"</p>
        </div>
        <CardContent className="p-8 text-center">
          <p className="text-gray-700 mb-8 text-lg leading-relaxed">
            Your responses have been recorded successfully. Click below to view your results and see how you performed!
          </p>
          <Button
            onClick={onViewResults}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 mx-auto"
          >
            <BarChart3 className="w-5 h-5" />
            View My Results
            <ArrowRight className="w-5 h-5" />
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
