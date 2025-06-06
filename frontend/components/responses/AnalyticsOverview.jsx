import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart3, Users, Target, TrendingUp, Award } from "lucide-react"

export default function AnalyticsOverview({ responses, quiz }) {
  const calculateAnalytics = () => {
    if (responses.length === 0 || !quiz) {
      return {
        totalParticipants: 0,
        averageScore: 0,
        completionRate: 0,
        topScore: 0,
      }
    }

    const totalQuestions = quiz.questions?.length || 0
    const scores = responses.map((r) => {
      if (totalQuestions === 0) return 0
      return Math.round((r.total_correct_answers / totalQuestions) * 100)
    })
    const averageScore = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0
    const topScore = scores.length > 0 ? Math.max(...scores) : 0

    return {
      totalParticipants: responses.length,
      averageScore,
      completionRate: 100,
      topScore,
    }
  }

  const analytics = calculateAnalytics()

  const analyticsData = [
    {
      title: "Total Participants",
      value: analytics.totalParticipants,
      icon: Users,
      bgColor: "from-blue-500 to-indigo-600",
      lightBg: "from-blue-50 to-indigo-50",
      borderColor: "border-blue-200",
      textColor: "text-blue-700",
      iconColor: "text-blue-600",
    },
    {
      title: "Average Score",
      value: `${analytics.averageScore}%`,
      icon: Target,
      bgColor: "from-green-500 to-emerald-600",
      lightBg: "from-green-50 to-emerald-50",
      borderColor: "border-green-200",
      textColor: "text-green-700",
      iconColor: "text-green-600",
    },
    {
      title: "Completion Rate",
      value: `${analytics.completionRate}%`,
      icon: TrendingUp,
      bgColor: "from-purple-500 to-pink-600",
      lightBg: "from-purple-50 to-pink-50",
      borderColor: "border-purple-200",
      textColor: "text-purple-700",
      iconColor: "text-purple-600",
    },
    {
      title: "Top Score",
      value: `${analytics.topScore}%`,
      icon: Award,
      bgColor: "from-yellow-500 to-orange-600",
      lightBg: "from-yellow-50 to-orange-50",
      borderColor: "border-yellow-200",
      textColor: "text-yellow-700",
      iconColor: "text-yellow-600",
    },
  ]

  return (
    <Card className="bg-white rounded-2xl shadow-lg border-0 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 sm:p-6">
        <CardTitle className="text-xl sm:text-2xl font-bold flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BarChart3 className="w-6 h-6 sm:w-8 sm:h-8" />
            <span>Quiz Analytics</span>
          </div>
          <Badge className="bg-white/20 text-white border-0 text-sm sm:text-base">
            {analytics.totalParticipants} participants
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {analyticsData.map((item, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${item.lightBg} p-4 sm:p-6 rounded-xl border-2 ${item.borderColor} text-center transition-all duration-200 hover:shadow-md`}
            >
              <div
                className={`flex items-center justify-center gap-2 text-2xl sm:text-3xl lg:text-4xl font-bold ${item.iconColor} mb-2`}
              >
                <item.icon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
                <span>{item.value}</span>
              </div>
              <div className={`${item.textColor} font-medium text-sm sm:text-base`}>{item.title}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
