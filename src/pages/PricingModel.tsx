import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Check, 
  X, 
  Crown, 
  Zap, 
  Shield, 
  Users, 
  Star,
  Sparkles,
  TrendingUp,
  Globe,
  Headphones,
  Database
} from "lucide-react";

const PricingModel = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: "Starter",
      description: "Perfect for small institutions",
      price: { monthly: 299, annual: 2390 }, // 20% discount on annual
      pricePerStudent: { monthly: 15, annual: 12 },
      maxStudents: 500,
      popular: false,
      features: [
        "Student Management System",
        "Basic Attendance Tracking",
        "Fee Management",
        "Academic Records",
        "Basic Analytics Dashboard",
        "Email Support",
        "Mobile App Access",
        "Data Export (CSV)",
      ],
      limitations: [
        "No AI-Powered Features",
        "No Gamification",
        "No Alumni Network",
        "Limited Integrations"
      ]
    },
    {
      name: "Professional",
      description: "Most popular for growing institutions",
      price: { monthly: 599, annual: 4792 }, // 20% discount on annual
      pricePerStudent: { monthly: 25, annual: 20 },
      maxStudents: 2000,
      popular: true,
      features: [
        "Everything in Starter",
        "AI-Powered Study Assistant",
        "Predictive Analytics",
        "Gamification System",
        "Placement & Alumni Connect",
        "Advanced Reporting",
        "API Access",
        "Priority Email Support",
        "Video Call Support",
        "Custom Branding",
        "Multi-language Support",
        "Third-party Integrations",
      ],
      limitations: [
        "No White-label Solution",
        "No Custom Modules"
      ]
    },
    {
      name: "Enterprise",
      description: "For large institutions with advanced needs",
      price: { monthly: 1299, annual: 10392 }, // 20% discount on annual
      pricePerStudent: { monthly: 35, annual: 28 },
      maxStudents: "Unlimited",
      popular: false,
      features: [
        "Everything in Professional",
        "White-label Solution",
        "Custom Module Development",
        "Dedicated Account Manager",
        "24/7 Phone Support",
        "Advanced Security Features",
        "Single Sign-On (SSO)",
        "Custom Integrations",
        "Advanced Analytics & BI",
        "Compliance Reporting",
        "Data Migration Support",
        "Training & Onboarding",
        "Blockchain Certificates",
        "IoT Integrations",
      ],
      limitations: []
    }
  ];

  const additionalServices = [
    {
      name: "Custom Module Development",
      description: "Build custom features tailored to your institution",
      price: "Starting at ₹50,000",
      icon: Sparkles
    },
    {
      name: "Data Migration Service",
      description: "Professional migration from your existing system",
      price: "₹25,000 - ₹1,00,000",
      icon: Database
    },
    {
      name: "Training & Onboarding",
      description: "Comprehensive training for your staff",
      price: "₹15,000 per session",
      icon: Users
    },
    {
      name: "Dedicated Support",
      description: "Priority support with dedicated account manager",
      price: "₹30,000/month",
      icon: Headphones
    }
  ];

  const testimonials = [
    {
      name: "Dr. Rajesh Kumar",
      role: "Principal, Tech Institute Bangalore",
      content: "Smart Link has transformed our institution's efficiency. The AI features are game-changing!",
      rating: 5
    },
    {
      name: "Priya Sharma",
      role: "Admin Head, Modern College Mumbai",
      content: "The gamification features have significantly improved student engagement. Highly recommended!",
      rating: 5
    }
  ];

  const faqs = [
    {
      question: "Is there a setup fee?",
      answer: "No, there are no setup fees. We include onboarding and basic training in all plans."
    },
    {
      question: "Can I change plans anytime?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect in the next billing cycle."
    },
    {
      question: "Do you offer data migration?",
      answer: "Yes, we offer professional data migration services. Basic migration is included in Enterprise plan."
    },
    {
      question: "What about data security?",
      answer: "We use enterprise-grade security with encrypted data storage and comply with Indian data protection laws."
    },
    {
      question: "Is there a free trial?",
      answer: "Yes, we offer a 14-day free trial for all plans with full feature access."
    }
  ];

  const getPrice = (plan: any) => {
    return isAnnual ? plan.price.annual : plan.price.monthly;
  };

  const getPricePerStudent = (plan: any) => {
    return isAnnual ? plan.pricePerStudent.annual : plan.pricePerStudent.monthly;
  };

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">Choose Your Plan</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Affordable, transparent pricing designed for educational institutions of all sizes
        </p>
        
        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <span className={`text-sm ${!isAnnual ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
            Monthly
          </span>
          <Switch 
            checked={isAnnual} 
            onCheckedChange={setIsAnnual}
            className="data-[state=checked]:bg-primary"
          />
          <span className={`text-sm ${isAnnual ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
            Annual
          </span>
          <Badge className="bg-success text-success-foreground ml-2">
            Save 20%
          </Badge>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <Card 
            key={index} 
            className={`relative border-0 shadow-elegant bg-gradient-card ${
              plan.popular ? 'ring-2 ring-primary shadow-glow' : ''
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-gradient-primary text-primary-foreground px-6 py-1">
                  <Crown className="w-4 h-4 mr-1" />
                  Most Popular
                </Badge>
              </div>
            )}
            
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold text-foreground">{plan.name}</CardTitle>
              <p className="text-muted-foreground">{plan.description}</p>
              
              <div className="mt-6">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-foreground">₹{getPrice(plan).toLocaleString()}</span>
                  <span className="text-muted-foreground">/{isAnnual ? 'year' : 'month'}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  ₹{getPricePerStudent(plan)}/{isAnnual ? 'year' : 'month'} per student
                </p>
                <p className="text-xs text-muted-foreground">
                  Up to {plan.maxStudents} students
                </p>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <Button 
                className={`w-full ${
                  plan.popular 
                    ? 'bg-gradient-primary hover:bg-gradient-accent' 
                    : 'bg-gradient-secondary hover:bg-gradient-primary'
                }`}
              >
                {plan.popular ? 'Start Free Trial' : 'Get Started'}
              </Button>

              <div className="space-y-4">
                <h4 className="font-semibold text-foreground">Features Included:</h4>
                <ul className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                {plan.limitations.length > 0 && (
                  <div className="pt-4 border-t border-border">
                    <h4 className="font-semibold text-muted-foreground mb-3">Not Included:</h4>
                    <ul className="space-y-2">
                      {plan.limitations.map((limitation, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <X className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-muted-foreground">{limitation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Additional Services */}
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Additional Services</h2>
          <p className="text-muted-foreground">Enhance your experience with our professional services</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {additionalServices.map((service, index) => (
            <Card key={index} className="border-0 shadow-card bg-gradient-card text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 rounded-full bg-gradient-accent flex items-center justify-center mx-auto mb-4">
                  <service.icon className="w-8 h-8 text-accent-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{service.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
                <p className="font-semibold text-primary">{service.price}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">What Our Clients Say</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-0 shadow-card bg-gradient-card">
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-foreground mb-4">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqs.map((faq, index) => (
            <Card key={index} className="border-0 shadow-card bg-gradient-card">
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-2">{faq.question}</h3>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-primary rounded-xl p-8 text-center text-primary-foreground">
        <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Institution?</h2>
        <p className="text-xl mb-6 text-primary-foreground/90">
          Join 500+ institutions already using Smart Link ERP
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
            <Zap className="w-5 h-5 mr-2" />
            Start 14-Day Free Trial
          </Button>
          <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
            <Users className="w-5 h-5 mr-2" />
            Book a Demo
          </Button>
        </div>
        <p className="text-sm text-primary-foreground/80 mt-4">
          No credit card required • Full feature access • Setup included
        </p>
      </div>
    </div>
  );
};

export default PricingModel;