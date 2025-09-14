import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Cpu, 
  Zap, 
  Shield, 
  Eye, 
  Fingerprint, 
  Wifi, 
  Smartphone,
  Blocks,
  Award,
  ChevronRight,
  Clock,
  Users,
  Lock,
  Sparkles,
  Rocket,
  Globe
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const FutureTech = () => {
  const { toast } = useToast();
  
  const [featuresStatus] = useState({
    blockchain: { enabled: false, beta: true, coming: false },
    arVr: { enabled: false, beta: false, coming: true },
    iot: { enabled: false, beta: true, coming: false },
    aiAdvanced: { enabled: true, beta: false, coming: false },
    biometric: { enabled: false, beta: true, coming: false },
    quantum: { enabled: false, beta: false, coming: true }
  });

  const blockchainFeatures = [
    {
      title: "Tamper-Proof Digital Certificates",
      description: "Issue degrees and certificates that can be verified globally without fraud",
      status: "Beta",
      benefits: ["100% Fraud Prevention", "Global Verification", "Instant Authentication"],
      icon: Award
    },
    {
      title: "Secure Academic Records",
      description: "Store all student records on blockchain for permanent, unalterable history",
      status: "Development", 
      benefits: ["Permanent Storage", "Cannot be Altered", "Privacy Protected"],
      icon: Shield
    },
    {
      title: "Smart Contracts for Payments",
      description: "Automate fee payments, scholarships, and refunds using blockchain contracts",
      status: "Coming Soon",
      benefits: ["Automated Processing", "Transparent Rules", "Reduced Disputes"],
      icon: Zap
    }
  ];

  const arVrFeatures = [
    {
      title: "Virtual Classroom Experience",
      description: "Immersive 3D classrooms for remote learning with real-time interaction",
      status: "Prototype",
      capabilities: ["3D Interactive Lessons", "Virtual Lab Experiments", "Collaborative Spaces"],
      icon: Eye
    },
    {
      title: "AR Campus Tours",
      description: "Give prospective students interactive campus tours using augmented reality",
      status: "Planning",
      capabilities: ["Interactive Building Info", "Historical Overlays", "Real-time Navigation"],
      icon: Smartphone
    },
    {
      title: "Mixed Reality Training",
      description: "Professional skill training using MR for engineering, medical, and technical courses",
      status: "Research",
      capabilities: ["Hands-on Simulation", "Safe Practice Environment", "Real-world Integration"],
      icon: Cpu
    }
  ];

  const iotFeatures = [
    {
      title: "Smart Attendance System",
      description: "Automated attendance using NFC cards, biometric scanners, and smart badges",
      status: "Beta Testing",
      tech: ["NFC Cards", "Fingerprint Scanners", "Face Recognition", "Smart Badges"],
      icon: Fingerprint
    },
    {
      title: "Campus Environmental Monitoring",
      description: "IoT sensors for air quality, temperature, occupancy, and energy management",
      status: "Pilot Program",
      tech: ["Air Quality Sensors", "Smart Thermostats", "Occupancy Detectors", "Energy Meters"],
      icon: Wifi
    },
    {
      title: "Smart Infrastructure",
      description: "Connected devices for lighting, security, and facility management",
      status: "Development",
      tech: ["Smart Lighting", "Security Cameras", "Access Control", "Maintenance Alerts"],
      icon: Blocks
    }
  ];

  const timelineData = [
    { phase: "Phase 1", period: "Q2 2024", title: "Blockchain Certificates", status: "In Progress" },
    { phase: "Phase 2", period: "Q3 2024", title: "IoT Attendance System", status: "Beta" },
    { phase: "Phase 3", period: "Q4 2024", title: "AR Campus Features", status: "Development" },
    { phase: "Phase 4", period: "Q1 2025", title: "VR Classrooms", status: "Planning" },
    { phase: "Phase 5", period: "Q2 2025", title: "Quantum Security", status: "Research" }
  ];

  const handleRequestDemo = (feature: string) => {
    toast({
      title: "Demo Request Submitted",
      description: `We'll contact you soon to schedule a ${feature} demonstration.`,
    });
  };

  const handleJoinBeta = (feature: string) => {
    toast({
      title: "Beta Access Requested",
      description: `You've been added to the ${feature} beta testing waitlist.`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Beta': 
      case 'Beta Testing': return 'bg-primary text-primary-foreground';
      case 'Development': 
      case 'Prototype': return 'bg-warning text-warning-foreground';
      case 'Coming Soon': 
      case 'Planning': 
      case 'Research': return 'bg-muted text-muted-foreground';
      case 'Live': return 'bg-success text-success-foreground';
      case 'In Progress': return 'bg-blue-500 text-white';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">Future-Ready Technologies</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Explore cutting-edge technologies that will transform education. Get early access to revolutionary features.
        </p>
        <Badge className="bg-gradient-accent text-accent-foreground px-4 py-2">
          <Rocket className="w-4 h-4 mr-2" />
          Innovation Lab
        </Badge>
      </div>

      {/* Development Timeline */}
      <Card className="border-0 shadow-elegant bg-gradient-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Development Roadmap 2024-2025
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {timelineData.map((item, index) => (
              <div key={index} className="flex items-center gap-4 p-4 rounded-lg border border-border bg-card/50">
                <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-foreground">{item.title}</h4>
                    <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.phase} • {item.period}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="blockchain" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="blockchain">Blockchain</TabsTrigger>
          <TabsTrigger value="ar-vr">AR/VR</TabsTrigger>
          <TabsTrigger value="iot">IoT Integration</TabsTrigger>
          <TabsTrigger value="quantum">Quantum Security</TabsTrigger>
        </TabsList>

        <TabsContent value="blockchain" className="space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-2">Blockchain-Based Digital Certificates</h2>
            <p className="text-muted-foreground">Tamper-proof, globally verifiable academic credentials</p>
            <Badge className="bg-primary text-primary-foreground mt-2">Beta Testing Available</Badge>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {blockchainFeatures.map((feature, index) => (
              <Card key={index} className="border-0 shadow-card bg-gradient-card hover:shadow-glow transition-all duration-300">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-gradient-accent flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  <Badge className={getStatusColor(feature.status)}>{feature.status}</Badge>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                  
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Key Benefits:</h4>
                    <ul className="space-y-1">
                      {feature.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Sparkles className="w-3 h-3 text-accent" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4">
                    {feature.status === 'Beta' ? (
                      <Button 
                        className="w-full bg-gradient-primary hover:bg-gradient-accent"
                        onClick={() => handleJoinBeta('Blockchain Certificates')}
                      >
                        Join Beta Program
                      </Button>
                    ) : (
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => handleRequestDemo('Blockchain')}
                      >
                        Request Demo
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Live Demo Section */}
          <Card className="border-0 shadow-elegant bg-gradient-glow">
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-bold text-foreground mb-4">See Blockchain Certificates in Action</h3>
              <p className="text-muted-foreground mb-6">
                Experience how our blockchain-based certificates work with a live demonstration
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-gradient-primary hover:bg-gradient-accent">
                  <Globe className="w-4 h-4 mr-2" />
                  Live Demo
                </Button>
                <Button variant="outline">
                  <Shield className="w-4 h-4 mr-2" />
                  Verify Sample Certificate
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ar-vr" className="space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-2">AR/VR Learning Environments</h2>
            <p className="text-muted-foreground">Immersive educational experiences for the future of learning</p>
            <Badge className="bg-warning text-warning-foreground mt-2">Coming Q4 2024</Badge>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {arVrFeatures.map((feature, index) => (
              <Card key={index} className="border-0 shadow-card bg-gradient-card">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-gradient-secondary flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-secondary-foreground" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  <Badge className={getStatusColor(feature.status)}>{feature.status}</Badge>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                  
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Capabilities:</h4>
                    <ul className="space-y-1">
                      {feature.capabilities.map((capability, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Eye className="w-3 h-3 text-secondary" />
                          {capability}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleRequestDemo('AR/VR')}
                  >
                    Request Preview
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* AR/VR Progress */}
          <Card className="border-0 shadow-elegant bg-gradient-card">
            <CardHeader>
              <CardTitle>Development Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>VR Classroom Platform</span>
                  <span>40%</span>
                </div>
                <Progress value={40} className="h-3" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>AR Campus Navigation</span>
                  <span>25%</span>
                </div>
                <Progress value={25} className="h-3" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Mixed Reality Lab Simulations</span>
                  <span>15%</span>
                </div>
                <Progress value={15} className="h-3" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="iot" className="space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-2">IoT Smart Campus Integration</h2>
            <p className="text-muted-foreground">Connected devices for automated attendance and smart infrastructure</p>
            <Badge className="bg-primary text-primary-foreground mt-2">Beta Program Active</Badge>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {iotFeatures.map((feature, index) => (
              <Card key={index} className="border-0 shadow-card bg-gradient-card">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  <Badge className={getStatusColor(feature.status)}>{feature.status}</Badge>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                  
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Technologies:</h4>
                    <div className="flex flex-wrap gap-1">
                      {feature.tech.map((tech, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button 
                    className={`w-full ${
                      feature.status === 'Beta Testing' 
                        ? 'bg-gradient-primary hover:bg-gradient-accent' 
                        : 'bg-gradient-secondary hover:bg-gradient-primary'
                    }`}
                    onClick={() => feature.status === 'Beta Testing' 
                      ? handleJoinBeta('IoT Attendance') 
                      : handleRequestDemo('IoT Integration')
                    }
                  >
                    {feature.status === 'Beta Testing' ? 'Join Beta Test' : 'Request Info'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="quantum" className="space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-2">Quantum-Enhanced Security</h2>
            <p className="text-muted-foreground">Next-generation encryption for ultimate data protection</p>
            <Badge className="bg-muted text-muted-foreground mt-2">Research Phase • 2025</Badge>
          </div>

          <Card className="border-0 shadow-elegant bg-gradient-card">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <div className="w-24 h-24 rounded-full bg-gradient-accent flex items-center justify-center mx-auto">
                  <Lock className="w-12 h-12 text-accent-foreground" />
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">Quantum Cryptography</h3>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    We're researching quantum encryption methods to provide unbreakable security for student data, 
                    ensuring protection against future quantum computing threats.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <div className="text-center">
                    <h4 className="font-semibold text-foreground mb-2">Quantum Key Distribution</h4>
                    <p className="text-sm text-muted-foreground">Unbreakable encryption keys using quantum mechanics</p>
                  </div>
                  <div className="text-center">
                    <h4 className="font-semibold text-foreground mb-2">Post-Quantum Algorithms</h4>
                    <p className="text-sm text-muted-foreground">Future-proof encryption methods</p>
                  </div>
                  <div className="text-center">
                    <h4 className="font-semibold text-foreground mb-2">Quantum Random Generation</h4>
                    <p className="text-sm text-muted-foreground">True randomness for maximum security</p>
                  </div>
                </div>

                <Button variant="outline" className="mt-8">
                  <Users className="w-4 h-4 mr-2" />
                  Join Research Updates List
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* CTA Section */}
      <Card className="border-0 shadow-elegant bg-gradient-primary text-primary-foreground">
        <CardContent className="p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Be Part of the Future</h2>
          <p className="text-xl mb-6 text-primary-foreground/90">
            Get early access to cutting-edge features and help shape the future of education technology
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
              <Rocket className="w-5 h-5 mr-2" />
              Join Innovation Program
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
              <Globe className="w-5 h-5 mr-2" />
              Schedule Future Tech Demo
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FutureTech;