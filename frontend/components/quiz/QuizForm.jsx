"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Loader2, List, FileText } from "lucide-react"

export default function QuizForm({ quiz, onSubmit, submitting }) {
  const [name, setName] = useState("")
  const [answers, setAnswers] = useState({})
  const [errors, setErrors] = useState({})

  const handleSingleChoiceAnswer = (questionId, optionId) => {
    setAnswers({
      ...answers,
      [questionId]: {
        question_id: questionId,
        answer: optionId,
      },
    })

    // Clear error for this question if it exists
    if (errors[questionId]) {
      const newErrors = { ...errors }
      delete newErrors[questionId]
      setErrors(newErrors)
    }
  }

  const handleShortTextAnswer = (questionId, text) => {
    setAnswers({
      ...answers,
      [questionId]: {
        question_id: questionId,
        text_answer: text,
      },
    })

    // Clear error for this question if it exists
    if (errors[questionId]) {
      const newErrors = { ...errors }
      delete newErrors[questionId]
      setErrors(newErrors)
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!name.trim()) {
      newErrors.name = "Please enter your name"
    }

    quiz.questions.forEach((question) => {
      if (!answers[question.id]) {
        newErrors[question.id] = "This question requires an answer"
      } else if (
        question.type === "short-text" &&
        (!answers[question.id].text_answer || !answers[question.id].text_answer.trim())
      ) {
        newErrors[question.id] = "Please provide an answer"
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      // Convert answers object to array format expected by API
      const answersArray = Object.values(answers)
      onSubmit(name, answersArray)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Name Input */}
      <Card className="bg-white rounded-2xl shadow-lg border-0">
        <CardContent className="p-6">
          <div className="space-y-4">
            <Label htmlFor="name" className="text-lg font-medium text-gray-800">
              Your Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`text-lg p-6 ${errors.name ? "border-red-500 focus:ring-red-500" : ""}`}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>
        </CardContent>
      </Card>

      {/* Questions */}
      {quiz.questions &&
        quiz.questions.map((question, index) => (
          <Card key={question.id} className="bg-white rounded-2xl shadow-lg border-0">
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-indigo-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-semibold text-gray-800">{question.question_text}</h3>
                      <Badge
                        className={
                          question.type === "single-choice"
                            ? "bg-blue-100 text-blue-700 border-blue-200"
                            : "bg-green-100 text-green-700 border-green-200"
                        }
                      >
                        {question.type === "single-choice" ? (
                          <>
                            <List className="w-3 h-3 mr-1" />
                            Multiple Choice
                          </>
                        ) : (
                          <>
                            <FileText className="w-3 h-3 mr-1" />
                            Short Answer
                          </>
                        )}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500">
                      {question.type === "single-choice" ? "Select one option" : "Enter your answer"}
                    </p>
                  </div>
                </div>

                {question.type === "single-choice" && question.question_options && (
                  <div className="pl-12">
                    <RadioGroup
                      value={answers[question.id]?.answer || ""}
                      onValueChange={(value) => handleSingleChoiceAnswer(question.id, value)}
                      className="space-y-3"
                    >
                      {question.question_options.map((option) => (
                        <div
                          key={option.id}
                          className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                        >
                          <RadioGroupItem value={option.id} id={option.id} className="text-indigo-600" />
                          <Label htmlFor={option.id} className="flex-1 cursor-pointer font-medium text-gray-700">
                            {option.option_text}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                    {errors[question.id] && <p className="text-red-500 text-sm mt-2">{errors[question.id]}</p>}
                  </div>
                )}

                {question.type === "short-text" && (
                  <div className="pl-12">
                    <Textarea
                      placeholder="Type your answer here..."
                      value={answers[question.id]?.text_answer || ""}
                      onChange={(e) => handleShortTextAnswer(question.id, e.target.value)}
                      className={`min-h-[100px] ${errors[question.id] ? "border-red-500 focus:ring-red-500" : ""}`}
                    />
                    {errors[question.id] && <p className="text-red-500 text-sm mt-2">{errors[question.id]}</p>}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}

      {/* Submit Button */}
      <div className="flex justify-center pt-8 pb-16">
        <Button
          type="submit"
          disabled={submitting}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
        >
          {submitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Submitting Quiz...
            </>
          ) : (
            <>
              Submit Quiz
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
