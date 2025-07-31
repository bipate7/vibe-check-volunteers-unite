
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import Events from "./pages/Events";
import EventCreate from "./pages/EventCreate";
import EventDetails from "./pages/EventDetails";
import Volunteers from "./pages/Volunteers";
import VolunteerCreate from "./pages/VolunteerCreate";
import Attendance from "./pages/Attendance";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import VolunteerDetails from "./pages/VolunteerDetails";
import Index from "./pages/Index";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Home Page */}
          <Route path="/" element={<Index />} />
          
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Protected Routes with MainLayout */}
          <Route path="/dashboard" element={<MainLayout><Dashboard /></MainLayout>} />
          <Route path="/events" element={<MainLayout><Events /></MainLayout>} />
          <Route path="/events/new" element={<MainLayout><EventCreate /></MainLayout>} />
          <Route path="/events/:id" element={<MainLayout><EventDetails /></MainLayout>} />
          <Route path="/volunteers" element={<MainLayout><Volunteers /></MainLayout>} />
          <Route path="/volunteers/new" element={<MainLayout><VolunteerCreate /></MainLayout>} />
          <Route path="/volunteers/:id" element={<MainLayout><VolunteerDetails /></MainLayout>} />
          <Route path="/attendance" element={<MainLayout><Attendance /></MainLayout>} />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
