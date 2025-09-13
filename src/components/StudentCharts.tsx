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
  { category: "Teaching Quality", rating: 4.5 },
  { category: "Course Content", rating: 4.2 },
  { category: "Facilities", rating: 3.8 },
  { category: "Support Staff", rating: 4.1 },
  { category: "Overall Experience", rating: 4.3 },
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

      {/* Feedback System */}
      <Card className="border-0 shadow-card hover:shadow-glow transition-all duration-300">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-foreground">
            <MessageSquare className="w-5 h-5 text-primary" />
            Feedback Ratings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={feedbackData} layout="horizontal">
                <defs>
                  <linearGradient id="feedbackGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="hsl(var(--primary-glow))" stopOpacity={0.6}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  type="number" 
                  domain={[0, 5]}
                  axisLine={false}
                  tickLine={false}
                  className="text-muted-foreground"
                />
                <YAxis 
                  type="category"
                  dataKey="category" 
                  axisLine={false}
                  tickLine={false}
                  className="text-muted-foreground text-xs"
                  width={100}
                />
                <ChartTooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
                          <p className="text-sm font-medium">{data.category}</p>
                          <p className="text-sm text-muted-foreground">{`Rating: ${data.rating}/5.0`}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar 
                  dataKey="rating" 
                  fill="url(#feedbackGradient)"
                  radius={[0, 4, 4, 0]}
                  className="hover:opacity-80 transition-opacity"
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};