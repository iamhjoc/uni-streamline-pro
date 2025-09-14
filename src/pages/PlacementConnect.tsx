import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Briefcase, 
  Users, 
  Star, 
  MapPin, 
  Calendar, 
  TrendingUp,
  Building,
  GraduationCap,
  Linkedin,
  Github,
  ExternalLink,
  Search,
  Filter,
  Heart,
  BookOpen
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PlacementConnect = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");

  const jobOpportunities = [
    {
      id: 1,
      title: "Software Developer Intern",
      company: "TechCorp Solutions",
      location: "Bangalore, India",
      type: "Internship",
      salary: "₹25,000/month",
      deadline: "2024-03-15",
      skills: ["React", "Node.js", "MongoDB"],
      applicants: 45,
      matched: true
    },
    {
      id: 2,
      title: "Data Analyst",
      company: "DataViz Inc",
      location: "Mumbai, India",
      type: "Full-time",
      salary: "₹6-8 LPA",
      deadline: "2024-03-20",
      skills: ["Python", "SQL", "Tableau"],
      applicants: 32,
      matched: false
    },
    {
      id: 3,
      title: "Frontend Developer",
      company: "StartupHub",
      location: "Remote",
      type: "Full-time",
      salary: "₹8-12 LPA",
      deadline: "2024-03-25",
      skills: ["React", "TypeScript", "CSS"],
      applicants: 78,
      matched: true
    }
  ];

  const alumni = [
    {
      id: 1,
      name: "Arjun Mehta",
      batch: "2020",
      course: "B.Tech CSE",
      company: "Google",
      position: "Senior Software Engineer",
      location: "Bangalore",
      experience: "4+ years",
      skills: ["Machine Learning", "Python", "Cloud Computing"],
      linkedin: "#",
      github: "#",
      avatar: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Sakshi Sharma",
      batch: "2019",
      course: "MBA Finance",
      company: "Goldman Sachs",
      position: "Investment Analyst",
      location: "Mumbai",
      experience: "5+ years",
      skills: ["Financial Analysis", "Risk Management", "Excel"],
      linkedin: "#",
      github: "#",
      avatar: "/placeholder.svg"
    },
    {
      id: 3,
      name: "Rohit Gupta",
      batch: "2021",
      course: "B.Tech IT",
      company: "Microsoft",
      position: "Product Manager",
      location: "Hyderabad",
      experience: "3+ years",
      skills: ["Product Strategy", "Agile", "Data Analysis"],
      linkedin: "#",
      github: "#",
      avatar: "/placeholder.svg"
    }
  ];

  const placementStats = [
    { label: "Placement Rate", value: "94%", trend: "+5%" },
    { label: "Average Package", value: "₹7.2 LPA", trend: "+12%" },
    { label: "Highest Package", value: "₹45 LPA", trend: "+8%" },
    { label: "Companies Visited", value: "156", trend: "+23%" }
  ];

  const upcomingEvents = [
    {
      title: "TechTalk: Career in AI/ML",
      speaker: "Priya Patel (Google AI)",
      date: "2024-02-25",
      time: "2:00 PM - 3:30 PM",
      type: "Virtual",
      registered: 234
    },
    {
      title: "Resume Building Workshop",
      speaker: "HR Team (Infosys)",
      date: "2024-02-28",
      time: "10:00 AM - 12:00 PM",
      type: "In-person",
      registered: 89
    },
    {
      title: "Mock Interview Drive",
      speaker: "Industry Experts",
      date: "2024-03-05",
      time: "9:00 AM - 5:00 PM",
      type: "Hybrid",
      registered: 156
    }
  ];

  const handleJobApply = (jobId: number) => {
    toast({
      title: "Application Submitted!",
      description: "Your application has been submitted. We'll notify you about the next steps.",
    });
  };

  const handleConnectAlumni = (alumniName: string) => {
    toast({
      title: "Connection Request Sent!",
      description: `Your connection request has been sent to ${alumniName}.`,
    });
  };

  const getJobTypeColor = (type: string) => {
    switch (type) {
      case 'Internship': return 'bg-primary text-primary-foreground';
      case 'Full-time': return 'bg-success text-success-foreground';
      case 'Part-time': return 'bg-warning text-warning-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Placement & Alumni Connect</h1>
        <p className="text-muted-foreground">Discover opportunities and connect with successful alumni</p>
      </div>

      {/* Placement Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {placementStats.map((stat, index) => (
          <Card key={index} className="border-0 shadow-card bg-gradient-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                </div>
                <div className="flex items-center gap-1 text-success text-sm">
                  <TrendingUp className="w-4 h-4" />
                  {stat.trend}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="opportunities" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="opportunities">Job Opportunities</TabsTrigger>
          <TabsTrigger value="alumni">Alumni Network</TabsTrigger>
          <TabsTrigger value="events">Events & Workshops</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="opportunities" className="space-y-6">
          {/* Search and Filter */}
          <Card className="border-0 shadow-card">
            <CardContent className="p-4">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search jobs by title, company, or skills..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Job Listings */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {jobOpportunities.map((job) => (
              <Card key={job.id} className="border-0 shadow-card bg-gradient-card hover:shadow-glow transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{job.title}</CardTitle>
                      <div className="flex items-center gap-2 mt-2">
                        <Building className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{job.company}</span>
                      </div>
                    </div>
                    {job.matched && (
                      <Badge className="bg-gradient-accent text-accent-foreground">
                        <Heart className="w-3 h-3 mr-1" />
                        Matched
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {job.location}
                    </div>
                    <Badge className={getJobTypeColor(job.type)}>
                      {job.type}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-foreground">{job.salary}</span>
                    <span className="text-muted-foreground">Deadline: {job.deadline}</span>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Required Skills:</p>
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <span className="text-sm text-muted-foreground">{job.applicants} applicants</span>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                      <Button 
                        size="sm" 
                        className="bg-gradient-primary hover:bg-gradient-accent"
                        onClick={() => handleJobApply(job.id)}
                      >
                        <Briefcase className="w-4 h-4 mr-2" />
                        Apply Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="alumni" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {alumni.map((person) => (
              <Card key={person.id} className="border-0 shadow-card bg-gradient-card hover:shadow-glow transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={person.avatar} />
                      <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                        {person.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-foreground">{person.name}</h3>
                      <p className="text-sm text-muted-foreground">{person.course} • {person.batch}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{person.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Building className="w-4 h-4 text-primary" />
                        <span className="font-medium text-sm">{person.company}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{person.position}</p>
                      <p className="text-xs text-muted-foreground">{person.experience}</p>
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground mb-2">Expertise:</p>
                      <div className="flex flex-wrap gap-1">
                        {person.skills.slice(0, 3).map((skill, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" asChild>
                          <a href={person.linkedin} target="_blank" rel="noopener noreferrer">
                            <Linkedin className="w-4 h-4" />
                          </a>
                        </Button>
                        <Button variant="ghost" size="sm" asChild>
                          <a href={person.github} target="_blank" rel="noopener noreferrer">
                            <Github className="w-4 h-4" />
                          </a>
                        </Button>
                      </div>
                      <Button 
                        size="sm" 
                        className="bg-gradient-primary hover:bg-gradient-accent"
                        onClick={() => handleConnectAlumni(person.name)}
                      >
                        <Users className="w-4 h-4 mr-2" />
                        Connect
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="events" className="space-y-6">
          <div className="space-y-4">
            {upcomingEvents.map((event, index) => (
              <Card key={index} className="border-0 shadow-card bg-gradient-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 rounded-full bg-gradient-accent flex items-center justify-center">
                          <Calendar className="w-6 h-6 text-accent-foreground" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{event.title}</h3>
                          <p className="text-sm text-muted-foreground">by {event.speaker}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground ml-15">
                        <span>{event.date} • {event.time}</span>
                        <Badge variant="outline">{event.type}</Badge>
                        <span>{event.registered} registered</span>
                      </div>
                    </div>
                    <Button className="bg-gradient-primary hover:bg-gradient-accent">
                      Register Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-0 shadow-card bg-gradient-card">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Resume Builder</h3>
                <p className="text-sm text-muted-foreground mb-4">Create professional resumes with AI-powered suggestions</p>
                <Button className="w-full bg-gradient-primary hover:bg-gradient-accent">
                  Build Resume
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-card bg-gradient-card">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-secondary flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-secondary-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Interview Prep</h3>
                <p className="text-sm text-muted-foreground mb-4">Practice with mock interviews and get feedback</p>
                <Button className="w-full bg-gradient-secondary hover:bg-gradient-accent">
                  Start Practice
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-card bg-gradient-card">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-accent flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="w-8 h-8 text-accent-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Career Guidance</h3>
                <p className="text-sm text-muted-foreground mb-4">Get personalized career advice from experts</p>
                <Button className="w-full bg-gradient-accent hover:bg-gradient-primary">
                  Get Guidance
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PlacementConnect;