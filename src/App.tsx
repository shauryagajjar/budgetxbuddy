import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Basics from "./pages/Basics";
import Tools from "./pages/Tools";
import Simulator from "./pages/Simulator";
import Plan from "./pages/Plan";
import ForSchools from "./pages/ForSchools";
import Premium from "./pages/Premium";
import About from "./pages/About";
import Auth from "./pages/Auth";
import LearningPath from "./pages/LearningPath";
import Simulations from "./pages/Simulations";
import CareerQuiz from "./pages/CareerQuiz";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/basics" element={<Basics />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/simulator" element={<Simulator />} />
            <Route path="/plan" element={<Plan />} />
            <Route path="/learning-path" element={<LearningPath />} />
            <Route path="/simulations" element={<Simulations />} />
            <Route path="/career-quiz" element={<CareerQuiz />} />
            <Route path="/for-schools" element={<ForSchools />} />
            <Route path="/premium" element={<Premium />} />
            <Route path="/about" element={<About />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
