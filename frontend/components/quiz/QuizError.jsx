import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, RefreshCw } from 'lucide-react'

export default function QuizError({ error }) {
  const refreshPage = () => {
    window.location.reload()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-10 px-4 sm:px-6 flex items-center justify-center">
      <Card className="bg-white rounded-2xl shadow-lg border-0 max-w-lg w-full">
        <CardContent className="p-8 text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-10 h-10 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Quiz Not Available</h2>
          <p className="text-gray-600 mb-6">
            {error || "This quiz couldn't be loaded. It may have been removed or is temporarily unavailable."}
          </p>
          <Button onClick={refreshPage} className="bg-indigo-600 hover:bg-indigo-700">
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
