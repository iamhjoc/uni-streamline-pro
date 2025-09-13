import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, GraduationCap, Users, AlertCircle, CheckCircle, TrendingUp } from "lucide-react";

const CourseSeats = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  // Simulate admin role check (in real app, this would come from authentication)
  const userRole = "admin"; // Change to "user" to test access restriction

  const courseSeatsData = [
    {
      id: "CS001",
      courseName: "B.Tech Computer Science",
      department: "Engineering",
      totalSeats: 120,
      filledSeats: 118,
      waitingList: 25,
      fees: 125000,
      duration: "4 Years",
      status: "almost_full"
    },
    {
      id: "CS002",
      courseName: "B.Tech Mechanical Engineering",
      department: "Engineering", 
      totalSeats: 100,
      filledSeats: 87,
      waitingList: 12,
      fees: 120000,
      duration: "4 Years",
      status: "available"
    },
    {
      id: "CS003",
      courseName: "MBA Finance",
      department: "Management",
      totalSeats: 80,
      filledSeats: 76,
      waitingList: 18,
      fees: 250000,
      duration: "2 Years",
      status: "almost_full"
    },
    {
      id: "CS004",
      courseName: "M.Tech Information Technology",
      department: "Engineering",
      totalSeats: 60,
      filledSeats: 45,
      waitingList: 8,
      fees: 150000,
      duration: "2 Years",
      status: "available"
    },
    {
      id: "CS005",
      courseName: "B.Sc Physics",
      department: "Science",
      totalSeats: 50,
      filledSeats: 50,
      waitingList: 15,
      fees: 80000,
      duration: "3 Years",
      status: "full"
    },
    {
      id: "CS006",
      courseName: "BCA (Computer Applications)",
      department: "Science",
      totalSeats: 90,
      filledSeats: 72,
      waitingList: 6,
      fees: 95000,
      duration: "3 Years",
      status: "available"
    }
  ];

  const departments = ["Engineering", "Management", "Science"];

  // Role-based access control
  if (userRole !== "admin") {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Card className="border-0 shadow-card max-w-md">
          <CardContent className="p-8 text-center">
            <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
            <h2 className="text-xl font-bold text-foreground mb-2">Access Restricted</h2>
            <p className="text-muted-foreground mb-4">
              This section is only accessible to administrators. Please contact your admin for access.
            </p>
            <Button variant="outline" onClick={() => window.history.back()}>
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "full":
        return { 
          color: "bg-destructive text-destructive-foreground", 
          icon: AlertCircle,
          label: "Full"
        };
      case "almost_full":
        return { 
          color: "bg-warning text-warning-foreground", 
          icon: AlertCircle,
          label: "Almost Full"
        };
      case "available":
        return { 
          color: "bg-success text-success-foreground", 
          icon: CheckCircle,
          label: "Available"
        };
      default:
        return { 
          color: "bg-muted text-muted-foreground", 
          icon: AlertCircle,
          label: "Unknown"
        };
    }
  };

  const getOccupancyPercentage = (filled: number, total: number) => {
    return Math.round((filled / total) * 100);
  };

  const filteredCourses = courseSeatsData.filter(course => {
    const matchesSearch = course.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === "all" || course.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  const totalSeats = courseSeatsData.reduce((sum, course) => sum + course.totalSeats, 0);
  const totalFilled = courseSeatsData.reduce((sum, course) => sum + course.filledSeats, 0);
  const totalWaiting = courseSeatsData.reduce((sum, course) => sum + course.waitingList, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Course Seats Management</h1>
        <p className="text-muted-foreground">Monitor course availability and seat allocation (Admin Only)</p>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <GraduationCap className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Seats</p>
                <p className="text-2xl font-bold text-foreground">{totalSeats}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-success/10">
                <Users className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Filled Seats</p>
                <p className="text-2xl font-bold text-foreground">{totalFilled}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-warning/10">
                <AlertCircle className="w-6 h-6 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Available</p>
                <p className="text-2xl font-bold text-foreground">{totalSeats - totalFilled}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-accent">
                <TrendingUp className="w-6 h-6 text-accent-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Occupancy Rate</p>
                <p className="text-2xl font-bold text-foreground">
                  {Math.round((totalFilled / totalSeats) * 100)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="border-0 shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Search Courses
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search by course name or department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Course Seats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCourses.map((course) => {
          const statusConfig = getStatusConfig(course.status);
          const StatusIcon = statusConfig.icon;
          const occupancyPercentage = getOccupancyPercentage(course.filledSeats, course.totalSeats);
          const availableSeats = course.totalSeats - course.filledSeats;
          
          return (
            <Card key={course.id} className="border-0 shadow-card hover:shadow-glow transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{course.courseName}</h3>
                    <p className="text-sm text-muted-foreground">{course.department} • {course.duration}</p>
                  </div>
                  <Badge className={statusConfig.color}>
                    <StatusIcon className="w-3 h-3 mr-1" />
                    {statusConfig.label}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Seat Statistics */}
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-3 bg-accent/50 rounded-lg">
                    <p className="text-lg font-bold text-foreground">{course.totalSeats}</p>
                    <p className="text-xs text-muted-foreground">Total Seats</p>
                  </div>
                  <div className="p-3 bg-success/10 rounded-lg">
                    <p className="text-lg font-bold text-success">{course.filledSeats}</p>
                    <p className="text-xs text-muted-foreground">Filled</p>
                  </div>
                  <div className="p-3 bg-warning/10 rounded-lg">
                    <p className="text-lg font-bold text-warning">{availableSeats}</p>
                    <p className="text-xs text-muted-foreground">Available</p>
                  </div>
                </div>

                {/* Occupancy Bar */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">Occupancy</span>
                    <span className="text-sm font-bold text-foreground">{occupancyPercentage}%</span>
                  </div>
                  <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-primary rounded-full transition-all duration-300"
                      style={{ width: `${occupancyPercentage}%` }}
                    />
                  </div>
                </div>

                {/* Additional Info */}
                <div className="flex items-center justify-between text-sm">
                  <div>
                    <p className="text-muted-foreground">Waiting List</p>
                    <p className="font-medium text-foreground">{course.waitingList} students</p>
                  </div>
                  <div className="text-right">
                    <p className="text-muted-foreground">Annual Fees</p>
                    <p className="font-bold text-primary">₹{course.fees.toLocaleString('en-IN')}</p>
                  </div>
                </div>

                <div className="flex gap-2 pt-2 border-t border-border">
                  <Button variant="outline" size="sm" className="flex-1">
                    View Details
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Manage Seats
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredCourses.length === 0 && (
        <Card className="border-0 shadow-card">
          <CardContent className="py-12 text-center">
            <GraduationCap className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No Courses Found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or filters.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CourseSeats;