import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";
import { SiteDataProvider } from "@/contexts/SiteDataContext";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const Services = lazy(() => import("./pages/Services"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const Tools = lazy(() => import("./pages/Tools"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Contact = lazy(() => import("./pages/Contact"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const CityLanding = lazy(() => import("./pages/CityLanding"));
const AdminKB = lazy(() => import("./pages/AdminKB"));
const AdminChatHistory = lazy(() => import("./pages/AdminChatHistory"));
const DataHub = lazy(() => import("./pages/DataHub"));
const Glossary = lazy(() => import("./pages/Glossary"));
const CitySeoLanding = lazy(() => import("./pages/CitySeoLanding"));
const MaterialsHub = lazy(() => import("./pages/MaterialsHub"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Diagrams = lazy(() => import("./pages/Diagrams"));
const Checklists = lazy(() => import("./pages/Checklists"));

const queryClient = new QueryClient();

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <SiteDataProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:slug" element={<ServiceDetail />} />
              <Route path="/tools" element={<Tools />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/kb" element={<AdminKB />} />
              <Route path="/admin/chats" element={<AdminChatHistory />} />
              <Route path="/data-hub" element={<DataHub />} />
              <Route path="/glossary" element={<Glossary />} />
              <Route path="/materials" element={<MaterialsHub />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/diagrams" element={<Diagrams />} />
              <Route path="/checklists" element={<Checklists />} />
              <Route path="/city/:citySlug" element={<CitySeoLanding />} />
              <Route path="/city/:citySlug/:serviceSlug" element={<CitySeoLanding />} />
              <Route path="/:slug" element={<CityLanding />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </SiteDataProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

