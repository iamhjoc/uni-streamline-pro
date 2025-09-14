import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  Calendar, 
  Award, 
  Target, 
  BookOpen, 
  Clock,
  Star,
  Trophy,
  Zap,
  AlertTriangle,
  CheckCircle,
  Brain,
  Lightbulb
} from "lucide-react";

const StudentDashboard = () => {
  const [student] = useState({
    name: "Rahul Sharma",
    id: "STU001",
    course: "B.Tech CSE",
    year: "2nd Year",
    semester: "4th Semester",
    cgpa: 8.5,
    attendance: 92,
    totalCredits: 120,
    completedCredits: 75
  });

  const [motivationalTip] = useState([
    "Great progress this week! Keep up the consistent study habits.",
    "Your attendance is excellent. This discipline will help in your career!",
    "Consider joining the coding club to enhance your programming skills."
  ]);

  const upcomingDeadlines = [
    { title: "Data Structures Assignment", due: "2024-02-20", subject: "DSA", priority: "high" },
    { title: "Physics Lab Report", due: "2024-02-22", subject: "Physics", priority: "medium" },
    { title: "English Essay Submission", due: "2024-02-25", subject: "English", priority: "low" }
  ];

  const achievements = [
    { title: "Perfect Attendance", icon: Trophy, color: "text-yellow-500", points: 100 },
    { title: "Assignment Ace", icon: Star, color: "text-blue-500", points: 75 },
    { title: "Early Submitter", icon: Zap, color: "text-green-500", points: 50 }
  ];

  const performanceInsights = [
    { subject: "Mathematics", grade: "A", trend: "up", improvement: "+5%" },
    { subject: "Data Structures", grade: "A-", trend: "stable", improvement: "0%" },
    { subject: "Physics", grade: "B+", trend: "up", improvement: "+8%" },
    { subject: "English", grade: "B", trend: "down", improvement: "-3%" }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-destructive text-destructive-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'low': return 'bg-success text-success-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-success" />;
      case 'down': return <AlertTriangle className="w-4 h-4 text-destructive" />;
      default: return <CheckCircle className="w-4 h-4 text-primary" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-primary rounded-xl p-6 text-primary-foreground">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, {student.name}! 👋</h1>
            <p className="text-primary-foreground/90">{student.course} • {student.year}</p>
            <p className="text-primary-foreground/80 text-sm mt-1">Student ID: {student.id}</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold">{student.cgpa}</div>
            <p className="text-primary-foreground/90">Current CGPA</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-card bg-gradient-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-accent flex items-center justify-center">
                <Calendar className="w-6 h-6 text-accent-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Attendance</p>
                <p className="text-2xl font-bold text-foreground">{student.attendance}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card bg-gradient-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-secondary flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-secondary-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Credits</p>
                <p className="text-2xl font-bold text-foreground">{student.completedCredits}/{student.totalCredits}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card bg-gradient-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center">
                <Target className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Semester</p>
                <p className="text-lg font-bold text-foreground">{student.semester}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card bg-gradient-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-accent flex items-center justify-center">
                <Award className="w-6 h-6 text-accent-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Rank</p>
                <p className="text-2xl font-bold text-foreground">12th</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Upcoming Deadlines */}
            <Card className="border-0 shadow-elegant bg-gradient-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Upcoming Deadlines
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingDeadlines.map((deadline, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-border bg-card/50">
                      <div>
                        <h4 className="font-medium text-foreground">{deadline.title}</h4>
                        <p className="text-sm text-muted-foreground">{deadline.subject}</p>
                        <p className="text-xs text-muted-foreground mt-1">Due: {deadline.due}</p>
                      </div>
                      <Badge className={getPriorityColor(deadline.priority)}>
                        {deadline.priority}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Progress Tracking */}
            <Card className="border-0 shadow-elegant bg-gradient-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Academic Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Course Completion</span>
                    <span>{Math.round((student.completedCredits / student.totalCredits) * 100)}%</span>
                  </div>
                  <Progress value={(student.completedCredits / student.totalCredits) * 100} className="h-3" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Semester Progress</span>
                    <span>75%</span>
                  </div>
                  <Progress value={75} className="h-3" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Assignment Completion</span>
                    <span>88%</span>
                  </div>
                  <Progress value={88} className="h-3" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Motivational Tips */}
          <Card className="border-0 shadow-elegant bg-gradient-glow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Lightbulb className="w-5 h-5" />
                Daily Motivation & Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {motivationalTip.map((tip, index) => (
                  <div key={index} className="p-4 rounded-lg bg-card/50 border border-border">
                    <p className="text-sm text-foreground">{tip}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card className="border-0 shadow-elegant bg-gradient-card">
            <CardHeader>
              <CardTitle>Subject Performance Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {performanceInsights.map((subject, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-border bg-card/50">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">{subject.subject}</h4>
                        <p className="text-sm text-muted-foreground">Current Grade: {subject.grade}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="text-sm font-medium">{subject.improvement}</p>
                        <p className="text-xs text-muted-foreground">vs last month</p>
                      </div>
                      {getTrendIcon(subject.trend)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <Card key={index} className="border-0 shadow-card bg-gradient-card hover:shadow-glow transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center mx-auto mb-4">
                    <achievement.icon className={`w-8 h-8 ${achievement.color}`} />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{achievement.title}</h3>
                  <Badge className="bg-gradient-accent text-accent-foreground">
                    +{achievement.points} points
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <Card className="border-0 shadow-elegant bg-gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5" />
                AI-Powered Academic Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-lg bg-success/10 border border-success/20">
                <h4 className="font-medium text-success mb-2">✅ Strengths Identified</h4>
                <p className="text-sm text-foreground">Your consistent attendance and timely assignment submissions show excellent discipline. Mathematics performance is trending upward.</p>
              </div>
              
              <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
                <h4 className="font-medium text-warning mb-2">⚠️ Areas for Improvement</h4>
                <p className="text-sm text-foreground">English performance shows a slight decline. Consider joining study groups or seeking additional help from faculty.</p>
              </div>
              
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                <h4 className="font-medium text-primary mb-2">🎯 Personalized Recommendations</h4>
                <ul className="text-sm text-foreground space-y-1">
                  <li>• Join the college debate club to improve English communication</li>
                  <li>• Participate in coding competitions to enhance programming skills</li>
                  <li>• Consider internship opportunities in your field of interest</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentDashboard;