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
          <Route path="/admissions" element={<Layout><Admissions /></Layout>} />
          <Route path="/students" element={<Layout><Students /></Layout>} />
          <Route path="/fees" element={<Layout><Fees /></Layout>} />
          <Route path="/payments" element={<Layout><Payments /></Layout>} />
          <Route path="/hostel" element={<Layout><Hostel /></Layout>} />
          <Route path="/exams" element={<Layout><Exams /></Layout>} />
          <Route path="/course-seats" element={<Layout><CourseSeats /></Layout>} />
          <Route path="/analytics" element={<Layout><Analytics /></Layout>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
