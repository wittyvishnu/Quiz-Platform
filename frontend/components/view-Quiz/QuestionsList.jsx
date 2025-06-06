import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { HelpCircle, CheckCircle, FileText, List } from "lucide-react"

export default function QuestionsList({ questions }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <HelpCircle className="w-6 h-6 text-indigo-600" />
        <h2 className="text-2xl font-bold text-gray-800">Questions ({questions?.length || 0})</h2>
      </div>

      {questions?.map((question, index) => (
        <Card key={question.id} className="bg-white rounded-2xl shadow-lg border-0 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-indigo-50 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-3">
                <span className="bg-indigo-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </span>
                Question {index + 1}
              </CardTitle>
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
                    Short Text
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

              {/* Multiple Choice Options */}
              {question.type === "single-choice" && question.question_options && (
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-3 block">Answer Options</label>
                  <div className="space-y-3">
                    {question.question_options.map((option, optionIndex) => (
                      <div
                        key={option.id}
                        className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-200 ${
                          option.is_correct
                            ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 shadow-md"
                            : "bg-gray-50 border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            option.is_correct ? "border-green-500 bg-green-500" : "border-gray-300"
                          }`}
                        >
                          {option.is_correct && <CheckCircle className="w-4 h-4 text-white" />}
                          {!option.is_correct && <span className="w-2 h-2 bg-gray-300 rounded-full"></span>}
                        </div>
                        <span
                          className={`flex-1 font-medium ${option.is_correct ? "text-green-800" : "text-gray-700"}`}
                        >
                          {option.option_text}
                        </span>
                        {option.is_correct && (
                          <Badge className="bg-green-600 text-white border-0 shadow-sm">✓ Correct Answer</Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Short Text Answer */}
              {question.type === "short-text" && question.correct_answer && (
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-3 block">Correct Answer</label>
                  <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl shadow-md">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                      <span className="font-semibold text-green-800 text-lg">{question.correct_answer}</span>
                    </div>
                    {question.correct_answer.includes(",") && (
                      <p className="text-sm text-green-600 mt-2 ml-9">
                        💡 Multiple correct answers are accepted (comma-separated)
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
