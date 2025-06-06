"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Search, Link2, Hash, HelpCircle, Home, Loader2 } from "lucide-react"
import { toast } from "react-hot-toast"

export default function QuizEntryPage() {
  const router = useRouter()
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [inputType, setInputType] = useState(null) // 'id' or 'url'

  // Detect input type as user types
  const handleInputChange = (value) => {
    setInput(value)

    if (!value.trim()) {
      setInputType(null)
      return
    }

    // Check if it's a URL (contains http/https or domain-like pattern)
    if (value.includes("http") || value.includes("://") || value.includes(".")) {
      setInputType("url")
    } else {
      // Assume it's an ID if it's not a URL
      setInputType("id")
    }
  }

  const validateAndRedirect = async () => {
    const trimmedInput = input.trim()

    if (!trimmedInput) {
      toast.error("Please enter a quiz code or URL")
      return
    }

    setLoading(true)

    try {
      if (inputType === "url") {
        // Handle URL input
        if (trimmedInput.includes("http") || trimmedInput.includes("://")) {
          // Full URL provided
          window.location.href = trimmedInput
        } else {
          // Partial URL, assume it needs protocol
          window.location.href = `https://${trimmedInput}`
        }
      } else {
        // Handle ID input - validate if quiz exists
        const response = await fetch(`${process.env.NEXT_PUBLIC_Backend_URL}/api/quizzes/${trimmedInput}`)

        if (response.ok) {
          router.push(`/quiz/${trimmedInput}`)
        } else {
          toast.error("Quiz not found. Please check the code and try again.")
        }
      }
    } catch (error) {
      console.error("Error validating quiz:", error)
      toast.error("Unable to access quiz. Please check your input and try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    validateAndRedirect()
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      validateAndRedirect()
    }
  }

  const examples = [
    {
      type: "Quiz ID",
      example: "abc123",
      description: "Short quiz identifier",
    },
    {
      type: "Full URL",
      example: "https://quiz-platform.com/quiz/abc123",
      description: "Complete quiz link",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Search className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Take Quiz
              </span>
            </div>
            <Button
              variant="ghost"
              onClick={() => router.push("/")}
              className="text-gray-600 hover:text-indigo-600 flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Home</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-2xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="w-20 h-20 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Enter Quiz Code or URL</h1>
            <p className="text-lg text-gray-600 max-w-lg mx-auto">
              Enter your quiz code or paste the complete quiz URL to get started
            </p>
          </div>

          {/* Input Form */}
          <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0 mb-8">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-xl font-semibold text-gray-800 flex items-center justify-center gap-2">
                <Search className="w-5 h-5 text-indigo-600" />
                Access Your Quiz
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="quiz-input" className="text-base font-medium text-gray-700">
                    Quiz Code or URL
                  </Label>
                  <div className="relative">
                    <Input
                      id="quiz-input"
                      placeholder="Enter quiz code (e.g., abc123) or paste full URL"
                      value={input}
                      onChange={(e) => handleInputChange(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="text-lg p-6 pr-12 border-2 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
                      disabled={loading}
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                      {inputType === "id" && <Hash className="w-5 h-5 text-indigo-500" />}
                      {inputType === "url" && <Link2 className="w-5 h-5 text-green-500" />}
                    </div>
                  </div>

                  {/* Input Type Indicator */}
                  {inputType && (
                    <div className="flex items-center gap-2">
                      <Badge
                        className={`${
                          inputType === "id"
                            ? "bg-indigo-100 text-indigo-700 border-indigo-200"
                            : "bg-green-100 text-green-700 border-green-200"
                        }`}
                      >
                        {inputType === "id" ? (
                          <>
                            <Hash className="w-3 h-3 mr-1" />
                            Quiz ID Detected
                          </>
                        ) : (
                          <>
                            <Link2 className="w-3 h-3 mr-1" />
                            URL Detected
                          </>
                        )}
                      </Badge>
                    </div>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Accessing Quiz...
                    </>
                  ) : (
                    <>
                      Access Quiz
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Examples Section */}
          <Card className="bg-white/60 backdrop-blur-sm border border-gray-200">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-indigo-600" />
                Input Examples
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {examples.map((example, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors cursor-pointer"
                    onClick={() => handleInputChange(example.example)}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {example.type === "Quiz ID" ? (
                        <Hash className="w-4 h-4 text-indigo-500" />
                      ) : (
                        <Link2 className="w-4 h-4 text-green-500" />
                      )}
                      <span className="font-medium text-gray-800">{example.type}</span>
                    </div>
                    <div className="text-sm text-gray-600 mb-1">{example.description}</div>
                    <code className="text-sm bg-white px-2 py-1 rounded border text-gray-700 font-mono">
                      {example.example}
                    </code>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-700 flex items-start gap-2">
                  <HelpCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Tip:</strong> You can paste any quiz URL or enter just the quiz ID. The system will
                    automatically detect the format and redirect you accordingly.
                  </span>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Additional Help */}
          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">Don't have a quiz code?</p>
            <Button
              variant="outline"
              onClick={() => router.push("/")}
              className="border-indigo-200 text-indigo-600 hover:bg-indigo-50"
            >
              Browse Available Quizzes
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
