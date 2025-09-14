import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Eye, Edit, User, BookOpen, Calendar, Phone, Mail } from "lucide-react";
import { StudentCharts } from "@/components/StudentCharts";

const Students = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("all");

  const students = [
    { 
      id: "STU001", 
      name: "Rahul Sharma", 
      email: "rahul@email.com", 
      course: "B.Tech CSE", 
      year: "2nd Year",
      status: "active", 
      enrollmentDate: "2023-08-15", 
      phone: "9876543210",
      cgpa: "8.5"
    },
    { 
      id: "STU002", 
      name: "Priya Patel", 
      email: "priya@email.com", 
      course: "MBA Finance", 
      year: "1st Year",
      status: "active", 
      enrollmentDate: "2024-01-10", 
      phone: "8765432109",
      cgpa: "9.2"
    },
    { 
      id: "STU003", 
      name: "Amit Kumar", 
      email: "amit@email.com", 
      course: "B.Sc Physics", 
      year: "3rd Year",
      status: "active", 
      enrollmentDate: "2022-08-20", 
      phone: "7654321098",
      cgpa: "7.8"
    },
    { 
      id: "STU004", 
      name: "Sneha Singh", 
      email: "sneha@email.com", 
      course: "M.Tech IT", 
      year: "2nd Year",
      status: "inactive", 
      enrollmentDate: "2023-01-15", 
      phone: "6543210987",
      cgpa: "8.9"
    },
    { 
      id: "STU005", 
      name: "Vikash Yadav", 
      email: "vikash@email.com", 
      course: "BCA", 
      year: "1st Year",
      status: "active", 
      enrollmentDate: "2024-01-05", 
      phone: "5432109876",
      cgpa: "8.1"
    },
  ];

  const courses = ["B.Tech CSE", "MBA Finance", "B.Sc Physics", "M.Tech IT", "BCA"];

  const getStatusColor = (status: string) => {
    return status === "active" 
      ? "bg-success text-success-foreground" 
      : "bg-destructive text-destructive-foreground";
  };

  const getCGPAColor = (cgpa: string) => {
    const grade = parseFloat(cgpa);
    if (grade >= 9) return "text-success";
    if (grade >= 7.5) return "text-primary";
    if (grade >= 6) return "text-warning";
    return "text-destructive";
  };

  const handleStudentClick = (student: any) => {
    // Handle student profile view/edit
    console.log('Opening student profile for:', student.name);
    // You can add navigation to student detail page or open modal here
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.course.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = selectedCourse === "all" || student.course === selectedCourse;
    return matchesSearch && matchesCourse;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Student Records</h1>
        <p className="text-muted-foreground">Manage student information and academic records</p>
      </div>

      {/* Student Analytics Charts */}
      <StudentCharts />

      {/* Search and Filters */}
      <Card className="border-0 shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Search Students
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search by name, ID, or course..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Courses</SelectItem>
                {courses.map((course) => (
                  <SelectItem key={course} value={course}>
                    {course}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Students Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredStudents.map((student) => (
          <Card key={student.id} className="border-0 shadow-card hover:shadow-glow transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => handleStudentClick(student)}
                    className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center hover:scale-110 transition-all duration-300 cursor-pointer shadow-card hover:shadow-glow button-load-animation"
                  >
                    <User className="w-6 h-6 text-primary-foreground" />
                  </button>
                  <div>
                    <h3 className="font-semibold text-foreground">{student.name}</h3>
                    <p className="text-sm text-muted-foreground">{student.id}</p>
                  </div>
                </div>
                <Badge className={getStatusColor(student.status)}>
                  {student.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <BookOpen className="w-4 h-4 text-primary" />
                  <span className="font-medium">{student.course}</span>
                  <span className="text-muted-foreground">• {student.year}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <span>{student.email}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  <span>{student.phone}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>Enrolled: {student.enrollmentDate}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <div>
                  <p className="text-xs text-muted-foreground">CGPA</p>
                  <p className={`text-lg font-bold ${getCGPAColor(student.cgpa)}`}>
                    {student.cgpa}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredStudents.length === 0 && (
        <Card className="border-0 shadow-card">
          <CardContent className="py-12 text-center">
            <User className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No Students Found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or filters.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Students;