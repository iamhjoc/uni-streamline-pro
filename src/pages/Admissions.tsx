import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, Eye, Edit, FileText, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { validateFormData } from "@/lib/validation";

const Admissions = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");

  const applications = [
    { id: "ADM001", name: "Rahul Sharma", email: "rahul@email.com", course: "B.Tech CSE", status: "approved", date: "2024-01-15", phone: "9876543210" },
    { id: "ADM002", name: "Priya Patel", email: "priya@email.com", course: "MBA Finance", status: "pending", date: "2024-01-14", phone: "8765432109" },
    { id: "ADM003", name: "Amit Kumar", email: "amit@email.com", course: "B.Sc Physics", status: "approved", date: "2024-01-13", phone: "7654321098" },
    { id: "ADM004", name: "Sneha Singh", email: "sneha@email.com", course: "M.Tech IT", status: "under_review", date: "2024-01-12", phone: "6543210987" },
    { id: "ADM005", name: "Vikash Yadav", email: "vikash@email.com", course: "BCA", status: "rejected", date: "2024-01-11", phone: "5432109876" },
  ];

  const courses = [
    "B.Tech Computer Science", "B.Tech Mechanical", "B.Tech Electrical", 
    "MBA Finance", "MBA Marketing", "M.Tech IT", "B.Sc Physics", 
    "B.Sc Chemistry", "BCA", "MCA"
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved": return "bg-success text-success-foreground";
      case "pending": return "bg-warning text-warning-foreground";
      case "under_review": return "bg-primary text-primary-foreground";
      case "rejected": return "bg-destructive text-destructive-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get('fullName') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;

    // Validate form data for spam
    const validation = validateFormData({ name, email, phone });
    
    if (!validation.isValid) {
      toast({
        title: "Invalid Information",
        description: validation.errors.join(' '),
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Application Submitted",
      description: "New admission application has been submitted successfully.",
    });
  };

  const filteredApplications = applications.filter(app => 
    app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Admissions Management</h1>
        <p className="text-muted-foreground">Manage student admissions and applications</p>
      </div>

      <Tabs defaultValue="applications" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="applications" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Applications
          </TabsTrigger>
          <TabsTrigger value="new-application" className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New Application
          </TabsTrigger>
        </TabsList>

        <TabsContent value="applications" className="space-y-6">
          {/* Search and Filters */}
          <Card className="border-0 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="w-5 h-5" />
                Search Applications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search by name, ID, or course..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                  />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="under_review">Under Review</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Applications List */}
          <Card className="border-0 shadow-card">
            <CardHeader>
              <CardTitle>Admission Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredApplications.map((application) => (
                  <div key={application.id} className="p-4 rounded-lg border border-border bg-card">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-foreground">{application.name}</h3>
                          <Badge className={getStatusColor(application.status)}>
                            {application.status.replace('_', ' ')}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                          <div>
                            <span className="font-medium">ID:</span> {application.id}
                          </div>
                          <div>
                            <span className="font-medium">Course:</span> {application.course}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {application.date}
                          </div>
                        </div>
                        <div className="mt-2 text-sm text-muted-foreground">
                          <span className="font-medium">Email:</span> {application.email} | 
                          <span className="font-medium"> Phone:</span> {application.phone}
                        </div>
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
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="new-application" className="space-y-6">
          <Card className="border-0 shadow-card">
            <CardHeader>
              <CardTitle>New Admission Application</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitApplication} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input 
                      id="fullName" 
                      name="fullName"
                      required 
                      placeholder="Enter student's full name"
                      pattern="[A-Za-z\s\-\.\']+"
                      title="Please enter a valid name (letters, spaces, hyphens, and apostrophes only)"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input 
                      id="email" 
                      name="email"
                      type="email" 
                      required 
                      placeholder="student@email.com"
                      pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                      title="Please enter a valid email address"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input 
                      id="phone" 
                      name="phone"
                      required 
                      placeholder="+91 9876543210"
                      pattern="[\+]?[0-9]{10,15}"
                      title="Please enter a valid phone number (10-15 digits)"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                    <Input id="dateOfBirth" type="date" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="course">Desired Course *</Label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a course" />
                      </SelectTrigger>
                      <SelectContent>
                        {courses.map((course) => (
                          <SelectItem key={course} value={course.toLowerCase().replace(/\s+/g, '_')}>
                            {course}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="previousQualification">Previous Qualification *</Label>
                    <Input id="previousQualification" required placeholder="e.g., 12th Grade, Bachelor's" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address *</Label>
                  <Textarea id="address" required placeholder="Enter complete address" rows={3} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="additionalInfo">Additional Information</Label>
                  <Textarea id="additionalInfo" placeholder="Any additional information or special requirements" rows={3} />
                </div>

                <div className="flex gap-4">
                  <Button type="submit" className="bg-gradient-primary text-primary-foreground">
                    Submit Application
                  </Button>
                  <Button type="button" variant="outline">
                    Save as Draft
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admissions;