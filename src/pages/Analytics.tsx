import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { 
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line, 
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from "recharts";
import { TrendingUp, Users, BookOpen, Calendar as CalendarIcon, Target, Award, Clock } from "lucide-react";

// Sample data for charts
const attendanceData = { present: 85, absent: 15 };
const attendanceColors = ["hsl(var(--success))", "hsl(var(--destructive))"];

const subjectMarksData = [
  { subject: "Mathematics", marks: 92 },
  { subject: "Physics", marks: 88 },
  { subject: "Chemistry", marks: 85 },
  { subject: "Biology", marks: 90 },
  { subject: "English", marks: 87 },
];

const semesterTrendData = [
  { semester: "Sem 1", marks: 82 },
  { semester: "Sem 2", marks: 85 },
  { semester: "Sem 3", marks: 88 },
  { semester: "Sem 4", marks: 91 },
  { semester: "Sem 5", marks: 89 },
  { semester: "Sem 6", marks: 93 },
];

const engagementData = [
  { category: "Academics", value: 85, fullMark: 100 },
  { category: "Attendance", value: 92, fullMark: 100 },
  { category: "Activities", value: 78, fullMark: 100 },
  { category: "Assignments", value: 88, fullMark: 100 },
  { category: "Participation", value: 82, fullMark: 100 },
];

const classPerformanceData = [
  { class: "Class A", A: 45, B: 35, C: 20 },
  { class: "Class B", A: 38, B: 42, C: 20 },
  { class: "Class C", A: 42, B: 38, C: 20 },
  { class: "Class D", A: 35, B: 45, C: 20 },
];

const marksDistributionData = [
  { range: "90-100", count: 12 },
  { range: "80-89", count: 25 },
  { range: "70-79", count: 18 },
  { range: "60-69", count: 8 },
  { range: "50-59", count: 3 },
];

const attendanceCalendarData = [
  { date: "2024-01-01", count: 1 },
  { date: "2024-01-02", count: 0 },
  { date: "2024-01-03", count: 1 },
  { date: "2024-01-04", count: 1 },
  { date: "2024-01-05", count: 0 },
  // Add more calendar data as needed
];

const chartConfig = {
  attendance: { label: "Attendance", color: "hsl(var(--primary))" },
  marks: { label: "Marks", color: "hsl(var(--primary))" },
  engagement: { label: "Engagement", color: "hsl(var(--primary))" },
};

const Analytics = () => {
  return (
    <div className="space-y-8 p-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
        <div className="flex gap-2">
          <div className="animate-pulse bg-primary/20 rounded-full w-2 h-2"></div>
          <div className="animate-pulse bg-primary/40 rounded-full w-2 h-2" style={{animationDelay: '0.5s'}}></div>
          <div className="animate-pulse bg-primary/60 rounded-full w-2 h-2" style={{animationDelay: '1s'}}></div>
        </div>
      </div>

      {/* Key Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="border-0 shadow-card hover:shadow-glow transition-all duration-500 hover:scale-105 animate-slide-in-right">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Target className="w-4 h-4 text-success animate-spin-slow" />
              Attendance Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="text-3xl font-bold text-success">85%</div>
              <div className="relative w-16 h-16">
                <svg className="w-16 h-16 transform -rotate-90">
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke="hsl(var(--muted))"
                    strokeWidth="4"
                    fill="none"
                  />
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke="hsl(var(--success))"
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray={`${85 * 1.76} 176`}
                    className="transition-all duration-1000 ease-out"
                    style={{ animation: 'progressRing 2s ease-out forwards' }}
                  />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card hover:shadow-glow transition-all duration-500 hover:scale-105 animate-slide-in-up" style={{animationDelay: '0.2s'}}>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Award className="w-4 h-4 text-primary animate-bounce" />
              Average Marks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="text-3xl font-bold text-primary">88.4</div>
              <div className="flex items-center text-success">
                <TrendingUp className="w-4 h-4 animate-pulse" />
                <span className="text-sm ml-1">+2.3%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card hover:shadow-glow transition-all duration-500 hover:scale-105 animate-slide-in-left" style={{animationDelay: '0.4s'}}>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Clock className="w-4 h-4 text-warning animate-pulse" />
              Upcoming Exams
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-warning mb-2">3</div>
            <div className="w-full bg-muted/30 rounded-full h-2">
              <div className="bg-gradient-to-r from-warning to-warning/60 h-2 rounded-full w-3/4 animate-progressBar"></div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Attendance Donut Chart */}
        <Card className="border-0 shadow-card hover:shadow-glow transition-all duration-300 animate-scale-in">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Users className="w-5 h-5 text-primary animate-pulse" />
              Attendance Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: "Present", value: attendanceData.present },
                      { name: "Absent", value: attendanceData.absent }
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {attendanceColors.map((color, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={color}
                        className="hover:opacity-80 transition-opacity animate-rotateIn"
                        style={{animationDelay: `${index * 0.3}s`}}
                      />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Subject-wise Marks Bar Chart */}
        <Card className="border-0 shadow-card hover:shadow-glow transition-all duration-300 animate-scale-in" style={{animationDelay: '0.2s'}}>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-foreground">
              <BookOpen className="w-5 h-5 text-primary animate-bounce" />
              Subject-wise Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={subjectMarksData}>
                  <XAxis 
                    dataKey="subject" 
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
                  <Bar 
                    dataKey="marks" 
                    fill="hsl(var(--primary))"
                    radius={[4, 4, 0, 0]}
                    className="animate-slideUp"
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Semester Trend Line Chart */}
        <Card className="border-0 shadow-card hover:shadow-glow transition-all duration-300 animate-scale-in" style={{animationDelay: '0.4s'}}>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-foreground">
              <TrendingUp className="w-5 h-5 text-success animate-pulse" />
              Performance Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={semesterTrendData}>
                  <XAxis 
                    dataKey="semester" 
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
                  <Line
                    type="monotone"
                    dataKey="marks"
                    stroke="hsl(var(--success))"
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--success))", strokeWidth: 2, r: 6 }}
                    className="animate-drawLine"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Engagement Radar Chart */}
        <Card className="border-0 shadow-card hover:shadow-glow transition-all duration-300 animate-scale-in" style={{animationDelay: '0.6s'}}>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Target className="w-5 h-5 text-primary animate-spin-slow" />
              Overall Engagement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={engagementData}>
                  <PolarGrid />
                  <PolarAngleAxis 
                    dataKey="category" 
                    className="text-muted-foreground text-sm"
                  />
                  <PolarRadiusAxis 
                    angle={90} 
                    domain={[0, 100]}
                    className="text-muted-foreground"
                  />
                  <Radar
                    name="Engagement"
                    dataKey="value"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary))"
                    fillOpacity={0.3}
                    strokeWidth={2}
                    className="animate-fadeIn"
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                </RadarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Class Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        {/* Class Performance Stacked Bar */}
        <Card className="border-0 shadow-card hover:shadow-glow transition-all duration-300 animate-slide-in-left">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Users className="w-5 h-5 text-primary animate-bounce" />
              Class Performance Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={classPerformanceData}>
                  <XAxis 
                    dataKey="class" 
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
                  <Bar dataKey="A" stackId="a" fill="hsl(var(--success))" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="B" stackId="a" fill="hsl(var(--primary))" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="C" stackId="a" fill="hsl(var(--warning))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Marks Distribution Histogram */}
        <Card className="border-0 shadow-card hover:shadow-glow transition-all duration-300 animate-slide-in-right">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Award className="w-5 h-5 text-primary animate-pulse" />
              Marks Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={marksDistributionData}>
                  <XAxis 
                    dataKey="range" 
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
                  <Bar 
                    dataKey="count" 
                    fill="hsl(var(--primary-glow))"
                    radius={[4, 4, 0, 0]}
                    className="animate-slideUp"
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;