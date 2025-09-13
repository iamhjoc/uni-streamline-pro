import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Calendar, GraduationCap, Award, BarChart3, FileText, Clock } from "lucide-react";

const Exams = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const upcomingExams = [
    {
      id: "EX001",
      title: "Mid-Term Examinations",
      course: "B.Tech CSE",
      subject: "Data Structures",
      date: "2024-02-15",
      time: "09:00 AM",
      duration: "3 hours",
      venue: "Hall A",
      registeredStudents: 125,
      status: "scheduled"
    },
    {
      id: "EX002",
      title: "Practical Assessment",
      course: "MBA Finance",
      subject: "Financial Analysis",
      date: "2024-02-18",
      time: "02:00 PM",
      duration: "2 hours",
      venue: "Lab B",
      registeredStudents: 85,
      status: "scheduled"
    },
    {
      id: "EX003",
      title: "Final Examinations",
      course: "B.Sc Physics",
      subject: "Quantum Mechanics",
      date: "2024-03-10",
      time: "10:00 AM",
      duration: "3 hours",
      venue: "Hall C",
      registeredStudents: 67,
      status: "scheduled"
    }
  ];

  const examResults = [
    {
      id: "RES001",
      studentId: "STU001",
      studentName: "Rahul Sharma",
      course: "B.Tech CSE",
      subject: "Data Structures",
      examType: "Mid-Term",
      marksObtained: 85,
      totalMarks: 100,
      grade: "A",
      status: "published"
    },
    {
      id: "RES002",
      studentId: "STU002",
      studentName: "Priya Patel",
      course: "MBA Finance",
      subject: "Marketing Management",
      examType: "Mid-Term",
      marksObtained: 92,
      totalMarks: 100,
      grade: "A+",
      status: "published"
    },
    {
      id: "RES003",
      studentId: "STU003",
      studentName: "Amit Kumar",
      course: "B.Sc Physics",
      subject: "Classical Mechanics",
      examType: "Mid-Term",
      marksObtained: 78,
      totalMarks: 100,
      grade: "B+",
      status: "published"
    },
    {
      id: "RES004",
      studentId: "STU004",
      studentName: "Sneha Singh",
      course: "M.Tech IT",
      subject: "Advanced Algorithms",
      examType: "Final",
      marksObtained: 88,
      totalMarks: 100,
      grade: "A",
      status: "under_review"
    }
  ];

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case "A+": return "text-success";
      case "A": return "text-success";
      case "B+": return "text-primary";
      case "B": return "text-primary";
      case "C+": return "text-warning";
      case "C": return "text-warning";
      default: return "text-destructive";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published": return "bg-success text-success-foreground";
      case "under_review": return "bg-warning text-warning-foreground";
      case "scheduled": return "bg-primary text-primary-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const filteredResults = examResults.filter(result => 
    result.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    result.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    result.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Examination Management</h1>
        <p className="text-muted-foreground">Manage examinations, results, and academic records</p>
      </div>

      <Tabs defaultValue="upcoming" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upcoming" className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Upcoming Exams
          </TabsTrigger>
          <TabsTrigger value="results" className="flex items-center gap-2">
            <Award className="w-4 h-4" />
            Results & Grades
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-6">
          {/* Exam Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="border-0 shadow-card">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Calendar className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Scheduled Exams</p>
                    <p className="text-2xl font-bold text-foreground">{upcomingExams.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-card">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-success/10">
                    <GraduationCap className="w-6 h-6 text-success" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Students</p>
                    <p className="text-2xl font-bold text-foreground">
                      {upcomingExams.reduce((sum, exam) => sum + exam.registeredStudents, 0)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-card">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-warning/10">
                    <Clock className="w-6 h-6 text-warning" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">This Week</p>
                    <p className="text-2xl font-bold text-foreground">2</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-card">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-accent">
                    <FileText className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Venues Booked</p>
                    <p className="text-2xl font-bold text-foreground">8</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Examinations */}
          <Card className="border-0 shadow-card">
            <CardHeader>
              <CardTitle>Scheduled Examinations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingExams.map((exam) => (
                  <div key={exam.id} className="p-4 rounded-lg border border-border bg-card hover:shadow-card transition-all duration-200">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="font-semibold text-foreground">{exam.title}</h3>
                          <Badge className={getStatusColor(exam.status)}>
                            {exam.status}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Subject</p>
                            <p className="font-medium text-foreground">{exam.subject}</p>
                            <p className="text-xs text-muted-foreground">{exam.course}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Date & Time</p>
                            <p className="font-medium text-foreground">{exam.date}</p>
                            <p className="text-xs text-muted-foreground">{exam.time}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Duration</p>
                            <p className="font-medium text-foreground">{exam.duration}</p>
                            <p className="text-xs text-muted-foreground">Venue: {exam.venue}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Registered</p>
                            <p className="font-medium text-foreground">{exam.registeredStudents} students</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2 ml-4">
                        <Button variant="outline" size="sm">
                          <FileText className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Calendar className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results" className="space-y-6">
          {/* Search Results */}
          <Card className="border-0 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="w-5 h-5" />
                Search Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search by student name, ID, or subject..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                  />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by course" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Courses</SelectItem>
                    <SelectItem value="btech">B.Tech</SelectItem>
                    <SelectItem value="mba">MBA</SelectItem>
                    <SelectItem value="mtech">M.Tech</SelectItem>
                    <SelectItem value="bsc">B.Sc</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Results Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredResults.map((result) => (
              <Card key={result.id} className="border-0 shadow-card hover:shadow-glow transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground">{result.studentName}</h3>
                      <p className="text-sm text-muted-foreground">{result.studentId}</p>
                    </div>
                    <Badge className={getStatusColor(result.status)}>
                      {result.status.replace('_', ' ')}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Subject</p>
                      <p className="font-medium text-foreground">{result.subject}</p>
                      <p className="text-xs text-muted-foreground">{result.course} • {result.examType}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Score</p>
                        <p className="text-lg font-bold text-primary">
                          {result.marksObtained}/{result.totalMarks}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {Math.round((result.marksObtained / result.totalMarks) * 100)}%
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Grade</p>
                        <p className={`text-2xl font-bold ${getGradeColor(result.grade)}`}>
                          {result.grade}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 pt-2 border-t border-border">
                    <Button variant="outline" size="sm" className="flex-1">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Analytics
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <FileText className="w-4 h-4 mr-2" />
                      Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredResults.length === 0 && (
            <Card className="border-0 shadow-card">
              <CardContent className="py-12 text-center">
                <Award className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No Results Found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search criteria.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Exams;