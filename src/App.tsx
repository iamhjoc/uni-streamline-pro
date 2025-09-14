import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Admissions from "./pages/Admissions";
import Students from "./pages/Students";
import Fees from "./pages/Fees";
import Payments from "./pages/Payments";
import Hostel from "./pages/Hostel";
import Exams from "./pages/Exams";
import CourseSeats from "./pages/CourseSeats";
import Analytics from "./pages/Analytics";
import StudentDashboard from "./pages/StudentDashboard";
import Gamification from "./pages/Gamification";
import PlacementConnect from "./pages/PlacementConnect";
import PricingModel from "./pages/PricingModel";
import Settings from "./pages/Settings";
import FutureTech from "./pages/FutureTech";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><Dashboard /></Layout>} />
          <Route path="/student-dashboard" element={<Layout><StudentDashboard /></Layout>} />
          <Route path="/admissions" element={<Layout><Admissions /></Layout>} />
          <Route path="/students" element={<Layout><Students /></Layout>} />
          <Route path="/fees" element={<Layout><Fees /></Layout>} />
          <Route path="/payments" element={<Layout><Payments /></Layout>} />
          <Route path="/gamification" element={<Layout><Gamification /></Layout>} />
          <Route path="/placement" element={<Layout><PlacementConnect /></Layout>} />
          <Route path="/hostel" element={<Layout><Hostel /></Layout>} />
          <Route path="/exams" element={<Layout><Exams /></Layout>} />
          <Route path="/course-seats" element={<Layout><CourseSeats /></Layout>} />
          <Route path="/analytics" element={<Layout><Analytics /></Layout>} />
          <Route path="/future-tech" element={<Layout><FutureTech /></Layout>} />
          <Route path="/pricing" element={<Layout><PricingModel /></Layout>} />
          <Route path="/settings" element={<Layout><Settings /></Layout>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
