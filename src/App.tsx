import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { AdminProvider, useAdmin } from "@/contexts/AdminContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const Services = lazy(() => import("./pages/Services"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const Tools = lazy(() => import("./pages/Tools"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Contact = lazy(() => import("./pages/Contact"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));

// Admin pages
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminBasicInfo = lazy(() => import("./pages/admin/AdminBasicInfo"));
const AdminServices = lazy(() => import("./pages/admin/AdminServices"));
const AdminPortfolio = lazy(() => import("./pages/admin/AdminPortfolio"));
const AdminBlog = lazy(() => import("./pages/admin/AdminBlog"));
const AdminContact = lazy(() => import("./pages/admin/AdminContact"));
const AdminNavigation = lazy(() => import("./pages/admin/AdminNavigation"));
const AdminBranding = lazy(() => import("./pages/admin/AdminBranding"));
const AdminContent = lazy(() => import("./pages/admin/AdminContent"));
const AdminSettings = lazy(() => import("./pages/admin/AdminSettings"));

const queryClient = new QueryClient();

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAdmin();
  if (!isAuthenticated) return <Navigate to="/admin/login" replace />;
  return <>{children}</>;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AdminProvider>
        <BrowserRouter>
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

              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
              <Route path="/admin/basic-info" element={<ProtectedRoute><AdminBasicInfo /></ProtectedRoute>} />
              <Route path="/admin/services" element={<ProtectedRoute><AdminServices /></ProtectedRoute>} />
              <Route path="/admin/portfolio" element={<ProtectedRoute><AdminPortfolio /></ProtectedRoute>} />
              <Route path="/admin/blog" element={<ProtectedRoute><AdminBlog /></ProtectedRoute>} />
              <Route path="/admin/contact" element={<ProtectedRoute><AdminContact /></ProtectedRoute>} />
              <Route path="/admin/navigation" element={<ProtectedRoute><AdminNavigation /></ProtectedRoute>} />
              <Route path="/admin/branding" element={<ProtectedRoute><AdminBranding /></ProtectedRoute>} />
              <Route path="/admin/content" element={<ProtectedRoute><AdminContent /></ProtectedRoute>} />
              <Route path="/admin/settings" element={<ProtectedRoute><AdminSettings /></ProtectedRoute>} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AdminProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
