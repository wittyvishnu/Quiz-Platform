import { Card, CardContent } from "@/components/ui/card"
import { HelpCircle } from "lucide-react"

export default function QuizHeader({ title, questionCount }) {
  return (
    <Card className="bg-white rounded-2xl shadow-lg border-0 overflow-hidden mb-8">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        <p className="text-indigo-100 flex items-center gap-2">
          <HelpCircle className="w-5 h-5" />
          {questionCount} questions • Please answer all questions to the best of your knowledge
        </p>
      </div>
      <CardContent className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50">
        <div className="flex items-center gap-3 text-gray-700 text-sm">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-indigo-600 rounded-full"></span>
            <span>Required fields are marked with an asterisk (*)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
