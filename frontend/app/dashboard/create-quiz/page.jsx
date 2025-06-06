"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Plus, Trash2 } from "lucide-react"
import { toast } from "react-hot-toast"

export default function CreateQuiz() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [quizTitle, setQuizTitle] = useState("")
  const [questions, setQuestions] = useState([
    {
      type: "single-choice",
      question_text: "",
      options: [
        { text: "", is_correct: false },
        { text: "", is_correct: false },
      ],
    },
    {
      type: "short-text",
      question_text: "",
      correct_answer: "",
    },
  ])

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        type: "single-choice",
        question_text: "",
        options: [
          { text: "", is_correct: false },
          { text: "", is_correct: false },
        ],
      },
    ])
  }

  const removeQuestion = (index) => {
    if (questions.length > 2) {
      setQuestions(questions.filter((_, i) => i !== index))
    } else {
      toast.error("You need at least 2 questions")
    }
  }

  const updateQuestion = (index, field, value) => {
    const updatedQuestions = [...questions]
    updatedQuestions[index][field] = value
    setQuestions(updatedQuestions)
  }

  const updateOption = (questionIndex, optionIndex, field, value) => {
    const updatedQuestions = [...questions]
    updatedQuestions[questionIndex].options[optionIndex][field] = value
    setQuestions(updatedQuestions)
  }

  const addOption = (questionIndex) => {
    const updatedQuestions = [...questions]
    updatedQuestions[questionIndex].options.push({ text: "", is_correct: false })
    setQuestions(updatedQuestions)
  }

  const removeOption = (questionIndex, optionIndex) => {
    const updatedQuestions = [...questions]
    if (updatedQuestions[questionIndex].options.length > 2) {
      updatedQuestions[questionIndex].options.splice(optionIndex, 1)
      setQuestions(updatedQuestions)
    } else {
      toast.error("You need at least 2 options")
    }
  }

  const setCorrectAnswer = (questionIndex, optionIndex) => {
    const updatedQuestions = [...questions]
    updatedQuestions[questionIndex].options.forEach((option, index) => {
      option.is_correct = index === optionIndex
    })
    setQuestions(updatedQuestions)
  }

  const validateQuiz = () => {
    if (!quizTitle.trim()) {
      toast.error("Please enter a quiz title")
      return false
    }

    for (let i = 0; i < questions.length; i++) {
      const question = questions[i]

      if (!question.question_text.trim()) {
        toast.error(`Please enter text for question ${i + 1}`)
        return false
      }

      if (question.type === "single-choice") {
        if (question.options.length < 2) {
          toast.error(`Question ${i + 1} needs at least 2 options`)
          return false
        }

        const hasCorrectAnswer = question.options.some((option) => option.is_correct)
        if (!hasCorrectAnswer) {
          toast.error(`Please select a correct answer for question ${i + 1}`)
          return false
        }

        const hasEmptyOption = question.options.some((option) => !option.text.trim())
        if (hasEmptyOption) {
          toast.error(`Please fill all options for question ${i + 1}`)
          return false
        }
      }

      if (question.type === "short-text" && !question.correct_answer.trim()) {
        toast.error(`Please enter correct answer for question ${i + 1}`)
        return false
      }
    }

    return true
  }

  const handleSubmit = async () => {
    if (!validateQuiz()) return

    setLoading(true)
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        toast.error("Please login to continue")
        router.push("/login")
        return
      }

      // Format the data according to the required structure
      const quizData = {
        title: quizTitle,
        questions: questions.map((question) => {
          if (question.type === "short-text") {
            // For short-text questions, only include type, question_text, and correct_answer
            return {
              type: question.type,
              question_text: question.question_text,
              correct_answer: question.correct_answer,
            }
          }
          // For single-choice questions, include all fields
          return {
            type: question.type,
            question_text: question.question_text,
            options: question.options,
          }
        }),
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_Backend_URL}/api/quizzes`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(quizData),
      })

      if (!response.ok) {
        throw new Error("Failed to create quiz")
      }

      toast.success("Quiz created successfully!")
      router.push("/dashboard")
    } catch (error) {
      toast.error("Failed to create quiz")
      console.error("Error creating quiz:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => router.push("/dashboard")}
            className="mb-6 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </Button>
          <div className="text-center">
            <h1 className="text-4xl font-bold text-indigo-600 mb-2">Create New Quiz</h1>
            <p className="text-gray-600 text-lg">Build an engaging quiz with multiple question types</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Quiz Title */}
          <Card className="bg-white rounded-xl shadow-sm">
            <CardContent className="p-6">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">Quiz Details</h2>
                <div>
                  <Label htmlFor="title" className="text-sm font-medium">
                    Quiz Title
                  </Label>
                  <Input
                    id="title"
                    placeholder="Enter your quiz title..."
                    value={quizTitle}
                    onChange={(e) => setQuizTitle(e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Questions */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                Questions ({questions.length})
              </h2>
              <Button onClick={addQuestion} className="bg-green-600 hover:bg-green-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add Question
              </Button>
            </div>

            {questions.map((question, questionIndex) => (
              <Card key={questionIndex} className="bg-white rounded-xl shadow-sm">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-800">Question {questionIndex + 1}</h3>
                      <div className="flex items-center gap-2">
                        <Select
                          value={question.type}
                          onValueChange={(value) => updateQuestion(questionIndex, "type", value)}
                        >
                          <SelectTrigger className="w-40">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="single-choice">Multiple Choice</SelectItem>
                            <SelectItem value="short-text">Short Text</SelectItem>
                          </SelectContent>
                        </Select>
                        {questions.length > 2 && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeQuestion(questionIndex)}
                            className="text-red-600 border-red-200 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium">Question Text</Label>
                      <Textarea
                        placeholder="Enter your question..."
                        value={question.question_text}
                        onChange={(e) => updateQuestion(questionIndex, "question_text", e.target.value)}
                        className="mt-1"
                      />
                    </div>

                    {question.type === "single-choice" && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label className="text-sm font-medium">Answer Options</Label>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => addOption(questionIndex)}
                            className="text-indigo-600 border-indigo-200 hover:bg-indigo-50"
                          >
                            <Plus className="w-4 h-4 mr-1" />
                            Add Option
                          </Button>
                        </div>
                        {question.options.map((option, optionIndex) => (
                          <div key={optionIndex} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <Checkbox
                              checked={option.is_correct}
                              onCheckedChange={() => setCorrectAnswer(questionIndex, optionIndex)}
                              className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                            />
                            <Input
                              placeholder={`Option ${optionIndex + 1}`}
                              value={option.text}
                              onChange={(e) => updateOption(questionIndex, optionIndex, "text", e.target.value)}
                              className="flex-1"
                            />
                            {question.options.length > 2 && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => removeOption(questionIndex, optionIndex)}
                                className="text-red-600 border-red-200 hover:bg-red-50"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        ))}
                        <p className="text-xs text-gray-500">Check the box next to the correct answer</p>
                      </div>
                    )}

                    {question.type === "short-text" && (
                      <div>
                        <Label className="text-sm font-medium">Correct Answer(s)</Label>
                        <Input
                          placeholder="Enter correct answers separated by commas..."
                          value={question.correct_answer}
                          onChange={(e) => updateQuestion(questionIndex, "correct_answer", e.target.value)}
                          className="mt-1"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          For multiple correct answers, separate them with commas (e.g., "Paris,London,Berlin")
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-8">
            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-12 py-3 text-lg shadow-md hover:shadow-lg transition-all duration-300"
              size="lg"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Creating Quiz...
                </>
              ) : (
                "Create Quiz"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
