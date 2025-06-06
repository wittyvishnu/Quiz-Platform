import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, Users, Target, TrendingUp, Clock } from "lucide-react"

export default function QuizStatistics() {
  const stats = [
    {
      title: "Total Responses",
      value: "0",
      icon: Users,
      color: "blue",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
      iconColor: "text-blue-500",
    },
    {
      title: "Average Score",
      value: "0%",
      icon: Target,
      color: "green",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
      iconColor: "text-green-500",
    },
    {
      title: "Completion Rate",
      value: "0%",
      icon: TrendingUp,
      color: "purple",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
      iconColor: "text-purple-500",
    },
    {
      title: "Avg. Time Taken",
      value: "0 min",
      icon: Clock,
      color: "orange",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600",
      iconColor: "text-orange-500",
    },
  ]

  return (
    <Card className="bg-white rounded-2xl shadow-lg border-0">
      <CardHeader className="bg-gradient-to-r from-gray-50 to-indigo-50 border-b border-gray-100">
        <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-3">
          <BarChart3 className="w-6 h-6 text-indigo-600" />
          Quiz Statistics
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`${stat.bgColor} p-6 rounded-xl border border-gray-100 transition-all duration-200 hover:shadow-md`}
            >
              <div className="flex items-center justify-between mb-3">
                <stat.icon className={`w-8 h-8 ${stat.iconColor}`} />
                <div className={`text-3xl font-bold ${stat.textColor}`}>{stat.value}</div>
              </div>
              <div className={`text-sm font-medium ${stat.textColor}`}>{stat.title}</div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
          <p className="text-sm text-blue-700 flex items-center gap-2">
            <span>📊</span>
            <strong>Note:</strong> Statistics will be updated as participants complete the quiz.
            <span className="underline cursor-pointer hover:text-blue-800">View detailed analytics →</span>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
