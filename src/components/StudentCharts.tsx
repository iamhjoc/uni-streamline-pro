import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Area, AreaChart } from "recharts";
import { TrendingUp, Users, BookOpen, MessageSquare } from "lucide-react";

const attendanceData = [
  { month: "Jan", attendance: 85, target: 90 },
  { month: "Feb", attendance: 92, target: 90 },
  { month: "Mar", attendance: 78, target: 90 },
  { month: "Apr", attendance: 88, target: 90 },
  { month: "May", attendance: 95, target: 90 },
  { month: "Jun", attendance: 82, target: 90 },
];

const gradesData = [
  { grade: "A+", count: 45, percentage: 18 },
  { grade: "A", count: 78, percentage: 31 },
  { grade: "B+", count: 65, percentage: 26 },
  { grade: "B", count: 42, percentage: 17 },
  { grade: "C", count: 20, percentage: 8 },
];

const feedbackData = [
  { category: "Teaching Quality", rating: 4.5, maxRating: 5.0, color: "hsl(var(--success))" },
  { category: "Course Content", rating: 4.2, maxRating: 5.0, color: "hsl(var(--primary))" },
  { category: "Facilities", rating: 3.8, maxRating: 5.0, color: "hsl(var(--warning))" },
  { category: "Support Staff", rating: 4.1, maxRating: 5.0, color: "hsl(var(--primary-glow))" },
  { category: "Overall Experience", rating: 4.3, maxRating: 5.0, color: "hsl(var(--accent))" },
];

const chartConfig = {
  attendance: {
    label: "Attendance %",
    color: "hsl(var(--primary))",
  },
  target: {
    label: "Target %",
    color: "hsl(var(--primary-glow))",
  },
  grades: {
    label: "Grades",
    color: "hsl(var(--primary))",
  },
  feedback: {
    label: "Rating",
    color: "hsl(var(--primary))",
  },
};

const GRADE_COLORS = [
  "hsl(var(--success))",
  "hsl(var(--primary))",
  "hsl(var(--primary-glow))",
  "hsl(var(--warning))",
  "hsl(var(--destructive))",
];

export const StudentCharts = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
      {/* Attendance Chart */}
      <Card className="border-0 shadow-card hover:shadow-glow transition-all duration-300">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-foreground">
            <TrendingUp className="w-5 h-5 text-primary" />
            Monthly Attendance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={attendanceData}>
                <defs>
                  <linearGradient id="attendanceGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="month" 
                  axisLine={false}
                  tickLine={false}
                  className="text-muted-foreground"
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  className="text-muted-foreground"
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="attendance"
                  stroke="hsl(var(--primary))"
                  fillOpacity={1}
                  fill="url(#attendanceGradient)"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="target"
                  stroke="hsl(var(--primary-glow))"
                  strokeDasharray="5 5"
                  strokeWidth={1}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Grades Distribution */}
      <Card className="border-0 shadow-card hover:shadow-glow transition-all duration-300">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-foreground">
            <BookOpen className="w-5 h-5 text-primary" />
            Grade Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={gradesData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="count"
                >
                  {gradesData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={GRADE_COLORS[index % GRADE_COLORS.length]}
                      className="hover:opacity-80 transition-opacity"
                    />
                  ))}
                </Pie>
                <ChartTooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
                          <p className="text-sm font-medium">{`Grade ${data.grade}`}</p>
                          <p className="text-sm text-muted-foreground">{`${data.count} students (${data.percentage}%)`}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Enhanced Feedback System */}
      <Card className="border-0 shadow-card hover:shadow-glow transition-all duration-300">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-foreground">
            <MessageSquare className="w-5 h-5 text-primary" />
            Student Feedback Ratings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {feedbackData.map((item, index) => (
            <div key={item.category} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-foreground">{item.category}</span>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold" style={{ color: item.color }}>
                    {item.rating}
                  </span>
                  <span className="text-xs text-muted-foreground">/5.0</span>
                </div>
              </div>
              <div className="relative h-3 bg-muted/30 rounded-full overflow-hidden">
                <div 
                  className="absolute top-0 left-0 h-full rounded-full transition-all duration-700 ease-out shadow-glow"
                  style={{ 
                    backgroundColor: item.color,
                    width: `${(item.rating / item.maxRating) * 100}%`,
                    animation: `slideIn 0.7s ease-out ${index * 0.1}s both`
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Poor</span>
                <span>Average</span>
                <span>Excellent</span>
              </div>
            </div>
          ))}
          <div className="mt-6 p-3 rounded-lg bg-gradient-to-r from-primary/10 via-primary-glow/10 to-primary/10 border border-primary/20">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Overall Satisfaction</p>
              <p className="text-2xl font-bold text-primary">
                {(feedbackData.reduce((sum, item) => sum + item.rating, 0) / feedbackData.length).toFixed(1)}/5.0
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};