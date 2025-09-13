import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Building2, User, Bed, MapPin, Phone, Mail } from "lucide-react";

const Hostel = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedHostel, setSelectedHostel] = useState("all");

  const hostelData = [
    { 
      id: "HST001",
      name: "Boys Hostel A",
      totalRooms: 100,
      occupiedRooms: 87,
      capacity: 200,
      currentOccupancy: 174,
      warden: "Mr. Rajesh Kumar",
      contact: "9876543210"
    },
    { 
      id: "HST002",
      name: "Girls Hostel B",
      totalRooms: 80,
      occupiedRooms: 72,
      capacity: 160,
      currentOccupancy: 144,
      warden: "Mrs. Priya Sharma",
      contact: "8765432109"
    },
    { 
      id: "HST003",
      name: "PG Block C",
      totalRooms: 60,
      occupiedRooms: 45,
      capacity: 120,
      currentOccupancy: 90,
      warden: "Dr. Amit Verma",
      contact: "7654321098"
    }
  ];

  const roomAllocations = [
    {
      id: "ROOM001",
      hostelName: "Boys Hostel A",
      roomNumber: "A-101",
      studentId: "STU001",
      studentName: "Rahul Sharma",
      course: "B.Tech CSE",
      checkIn: "2023-08-15",
      status: "occupied",
      contact: "9876543210"
    },
    {
      id: "ROOM002",
      hostelName: "Girls Hostel B",
      roomNumber: "B-205",
      studentId: "STU002",
      studentName: "Priya Patel",
      course: "MBA Finance",
      checkIn: "2024-01-10",
      status: "occupied",
      contact: "8765432109"
    },
    {
      id: "ROOM003",
      hostelName: "Boys Hostel A",
      roomNumber: "A-302",
      studentId: null,
      studentName: null,
      course: null,
      checkIn: null,
      status: "vacant",
      contact: null
    },
    {
      id: "ROOM004",
      hostelName: "PG Block C",
      roomNumber: "C-150",
      studentId: "STU004",
      studentName: "Sneha Singh",
      course: "M.Tech IT",
      checkIn: "2023-01-15",
      status: "occupied",
      contact: "6543210987"
    }
  ];

  const getOccupancyColor = (percentage: number) => {
    if (percentage >= 90) return "text-destructive";
    if (percentage >= 75) return "text-warning";
    return "text-success";
  };

  const getStatusColor = (status: string) => {
    return status === "occupied" 
      ? "bg-success text-success-foreground" 
      : "bg-accent text-accent-foreground";
  };

  const filteredAllocations = roomAllocations.filter(allocation => {
    const matchesSearch = allocation.studentName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         allocation.studentId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         allocation.roomNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesHostel = selectedHostel === "all" || allocation.hostelName === selectedHostel;
    return matchesSearch && matchesHostel;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Hostel Management</h1>
        <p className="text-muted-foreground">Manage hostel occupancy and room allocations</p>
      </div>

      {/* Hostel Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {hostelData.map((hostel) => {
          const occupancyPercentage = Math.round((hostel.currentOccupancy / hostel.capacity) * 100);
          
          return (
            <Card key={hostel.id} className="border-0 shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-primary" />
                  {hostel.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Total Rooms</p>
                    <p className="text-lg font-bold text-foreground">{hostel.totalRooms}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Occupied</p>
                    <p className="text-lg font-bold text-foreground">{hostel.occupiedRooms}</p>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">Occupancy</span>
                    <span className={`text-sm font-bold ${getOccupancyColor(occupancyPercentage)}`}>
                      {occupancyPercentage}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-primary rounded-full transition-all duration-300"
                      style={{ width: `${occupancyPercentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {hostel.currentOccupancy} / {hostel.capacity} students
                  </p>
                </div>

                <div className="pt-4 border-t border-border space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">Warden:</span>
                    <span className="text-foreground">{hostel.warden}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span className="text-foreground">{hostel.contact}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Search and Filters */}
      <Card className="border-0 shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Search Room Allocations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search by student name, ID, or room number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={selectedHostel} onValueChange={setSelectedHostel}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by hostel" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Hostels</SelectItem>
                {hostelData.map((hostel) => (
                  <SelectItem key={hostel.id} value={hostel.name}>
                    {hostel.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Room Allocations */}
      <Card className="border-0 shadow-card">
        <CardHeader>
          <CardTitle>Room Allocations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredAllocations.map((allocation) => (
              <div key={allocation.id} className="p-4 rounded-lg border border-border bg-card hover:shadow-card transition-all duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span className="font-semibold text-foreground">{allocation.roomNumber}</span>
                      </div>
                      <Badge className="bg-primary text-primary-foreground">
                        {allocation.hostelName}
                      </Badge>
                      <Badge className={getStatusColor(allocation.status)}>
                        {allocation.status}
                      </Badge>
                    </div>
                    
                    {allocation.status === "occupied" ? (
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Student</p>
                          <p className="font-medium text-foreground">{allocation.studentName}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Student ID</p>
                          <p className="font-medium text-foreground">{allocation.studentId}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Course</p>
                          <p className="font-medium text-foreground">{allocation.course}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Check-in Date</p>
                          <p className="font-medium text-foreground">{allocation.checkIn}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="text-sm text-muted-foreground">
                        Room is available for allocation
                      </div>
                    )}
                    
                    {allocation.contact && (
                      <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="w-4 h-4" />
                        <span>{allocation.contact}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 ml-4">
                    {allocation.status === "vacant" ? (
                      <Button className="bg-gradient-primary text-primary-foreground">
                        <Bed className="w-4 h-4 mr-2" />
                        Allocate Room
                      </Button>
                    ) : (
                      <Button variant="outline">
                        <User className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {filteredAllocations.length === 0 && (
        <Card className="border-0 shadow-card">
          <CardContent className="py-12 text-center">
            <Building2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No Room Allocations Found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or filters.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Hostel;