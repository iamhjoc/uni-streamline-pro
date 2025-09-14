import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import AIChat from "@/components/AIChat";
import { 
  Home, 
  Users, 
  CreditCard, 
  Building2, 
  GraduationCap,
  Menu,
  X,
  BookOpen,
  Settings,
  TrendingUp,
  Trophy,
  Briefcase,
  Zap,
  DollarSign
} from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

const navigation = [
  { name: "Student Dashboard", href: "/student-dashboard", icon: Users },
  { name: "Admissions", href: "/admissions", icon: Users },
  { name: "Students", href: "/students", icon: BookOpen },
  { name: "Fee Management", href: "/fees", icon: CreditCard },
  { name: "Payments", href: "/payments", icon: CreditCard },
  { name: "Gamification", href: "/gamification", icon: Trophy },
  { name: "Placement Connect", href: "/placement", icon: Briefcase },
  { name: "Hostel Management", href: "/hostel", icon: Building2 },
  { name: "Examinations", href: "/exams", icon: GraduationCap },
  { name: "Course Seats", href: "/course-seats", icon: Settings },
  { name: "Analytics", href: "/analytics", icon: TrendingUp },
  { name: "Future Tech", href: "/future-tech", icon: Zap },
  { name: "Pricing", href: "/pricing", icon: DollarSign },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-accent">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 transform bg-card border-r border-border transition-transform duration-300 ease-in-out lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex h-full flex-col">
          {/* Logo and close button */}
          <div className="flex h-16 items-center justify-between px-6 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">Smart Link</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                  <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 hover:translate-x-1",
                    isActive
                      ? "bg-gradient-primary text-primary-foreground shadow-card animate-pulse"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent hover:shadow-glow"
                  )}
                >
                  <item.icon className="w-5 h-5 transition-transform duration-300 hover:rotate-12" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-border">
            <p className="text-xs text-muted-foreground text-center">
              Smart Link Academic Management System
            </p>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Top bar */}
        <header className="h-16 bg-card border-b border-border px-6 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </Button>
          
          <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground">
              Welcome to Smart Link Academic Management System
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>

      {/* AI Chat Component */}
      <AIChat />
    </div>
  );
}