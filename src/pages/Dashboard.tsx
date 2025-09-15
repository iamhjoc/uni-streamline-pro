import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, CreditCard, Building2, GraduationCap, TrendingUp, AlertCircle } from "lucide-react";
import { AnimatedIcon } from "@/components/AnimatedIcon";
import { Card3D } from "@/components/Card3D";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Students",
      value: "2,847",
      change: "+12%",
      icon: Users,
      color: "text-primary",
      glow: "primary" as const,
    },
    {
      title: "Pending Admissions",
      value: "156",
      change: "+8%",
      icon: GraduationCap,
      color: "text-warning",
      glow: "warning" as const,
    },
    {
      title: "Fee Collection",
      value: "₹12,45,680",
      change: "+15%",
      icon: CreditCard,
      color: "text-success",
      glow: "success" as const,
    },
    {
      title: "Hostel Occupancy",
      value: "89%",
      change: "+2%",
      icon: Building2,
      color: "text-primary",
      glow: "accent" as const,
    },
  ];

  const recentAdmissions = [
    { id: "ADM001", name: "Rahul Sharma", course: "B.Tech CSE", status: "approved", date: "2024-01-15" },
    { id: "ADM002", name: "Priya Patel", course: "MBA Finance", status: "pending", date: "2024-01-14" },
    { id: "ADM003", name: "Amit Kumar", course: "B.Sc Physics", status: "approved", date: "2024-01-13" },
    { id: "ADM004", name: "Sneha Singh", course: "M.Tech IT", status: "under_review", date: "2024-01-12" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved": return "bg-success text-success-foreground";
      case "pending": return "bg-warning text-warning-foreground";
      case "under_review": return "bg-primary text-primary-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to Smart Link Academic Management System</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card3D key={stat.title} className="border-0 shadow-card animate-fade-in" style={{animationDelay: `${index * 100}ms`}}>
            <Card className="border-0 shadow-none bg-transparent">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <AnimatedIcon 
                        icon={TrendingUp} 
                        className="w-4 h-4 text-success" 
                        glowType="success"
                        animationType="pulse"
                        delay={index * 150 + 500}
                      />
                      <span className="text-sm text-success font-medium">{stat.change}</span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg bg-accent ${stat.color} card-3d`}>
                    <AnimatedIcon 
                      icon={stat.icon} 
                      className="w-6 h-6" 
                      glowType={stat.glow}
                      animationType="bounce"
                      delay={index * 200 + 1000}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Card3D>
        ))}
      </div>

      {/* Recent Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Admissions */}
        <Card3D className="border-0 shadow-card">
          <Card className="border-0 shadow-none bg-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AnimatedIcon 
                  icon={Users} 
                  className="w-5 h-5" 
                  glowType="primary"
                  animationType="float"
                  delay={1500}
                />
                Recent Admissions
              </CardTitle>
            </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAdmissions.map((admission) => (
                <div key={admission.id} className="flex items-center justify-between p-3 rounded-lg bg-accent/50">
                  <div>
                    <p className="font-medium text-foreground">{admission.name}</p>
                    <p className="text-sm text-muted-foreground">{admission.course} • {admission.id}</p>
                  </div>
                  <div className="text-right">
                    <Badge className={`${getStatusColor(admission.status)} mb-1`}>
                      {admission.status.replace('_', ' ')}
                    </Badge>
                    <p className="text-xs text-muted-foreground">{admission.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          </Card>
        </Card3D>

        {/* Fee Status */}
        <Card3D className="border-0 shadow-card">
          <Card className="border-0 shadow-none bg-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AnimatedIcon 
                  icon={CreditCard} 
                  className="w-5 h-5" 
                  glowType="success"
                  animationType="float"
                  delay={1700}
                />
                Fee Collection Status
              </CardTitle>
            </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-gradient-success text-success-foreground">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90">Collected This Month</p>
                    <p className="text-2xl font-bold">₹8,45,200</p>
                  </div>
                  <CreditCard className="w-8 h-8 opacity-90" />
                </div>
              </div>
              
              <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
                  <div className="flex items-center gap-3">
                    <AnimatedIcon 
                      icon={AlertCircle} 
                      className="w-5 h-5 text-warning" 
                      glowType="warning"
                      animationType="pulse"
                      delay={2000}
                    />
                    <div>
                    <p className="text-sm font-medium text-foreground">Pending Payments</p>
                    <p className="text-xs text-muted-foreground">245 students have overdue fees</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-accent/50 rounded-lg">
                  <p className="text-lg font-bold text-foreground">92%</p>
                  <p className="text-xs text-muted-foreground">Collection Rate</p>
                </div>
                <div className="text-center p-3 bg-accent/50 rounded-lg">
                  <p className="text-lg font-bold text-foreground">₹4,00,480</p>
                  <p className="text-xs text-muted-foreground">Pending Amount</p>
                </div>
              </div>
            </div>
          </CardContent>
          </Card>
        </Card3D>
      </div>

      {/* Hostel and Exam Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card3D className="border-0 shadow-card">
          <Card className="border-0 shadow-none bg-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AnimatedIcon 
                  icon={Building2} 
                  className="w-5 h-5" 
                  glowType="accent"
                  animationType="float"
                  delay={2200}
                />
                Hostel Occupancy
              </CardTitle>
            </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {["Boys Hostel A", "Girls Hostel B", "PG Block C"].map((hostel, index) => (
                <div key={hostel} className="flex items-center justify-between p-3 rounded-lg bg-accent/50">
                  <span className="font-medium text-foreground">{hostel}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-primary rounded-full"
                        style={{ width: `${85 + index * 5}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-foreground">{85 + index * 5}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          </Card>
        </Card3D>

        <Card3D className="border-0 shadow-card">
          <Card className="border-0 shadow-none bg-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AnimatedIcon 
                  icon={GraduationCap} 
                  className="w-5 h-5" 
                  glowType="warning"
                  animationType="float"
                  delay={2400}
                />
                Upcoming Examinations
              </CardTitle>
            </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { exam: "Mid-Term Examinations", date: "2024-02-15", students: "1,245" },
                { exam: "Practical Assessments", date: "2024-02-20", students: "856" },
                { exam: "Final Examinations", date: "2024-03-10", students: "2,134" },
              ].map((exam) => (
                <div key={exam.exam} className="flex items-center justify-between p-3 rounded-lg bg-accent/50">
                  <div>
                    <p className="font-medium text-foreground">{exam.exam}</p>
                    <p className="text-sm text-muted-foreground">{exam.students} students</p>
                  </div>
                  <Badge variant="outline" className="text-primary border-primary">
                    {exam.date}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
          </Card>
        </Card3D>
      </div>
    </div>
  );
};

export default Dashboard;