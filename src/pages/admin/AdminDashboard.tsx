import AdminLayout from "@/components/AdminLayout";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Building2, Image, Phone, Navigation, Palette, FileText,
  Wrench, BookOpen, Settings, ArrowRight,
} from "lucide-react";

const sections = [
  { label: "Basic Info", path: "/admin/basic-info", icon: Building2, desc: "Company name, phone, email, address" },
  { label: "Services", path: "/admin/services", icon: Wrench, desc: "Manage service offerings" },
  { label: "Portfolio", path: "/admin/portfolio", icon: Image, desc: "Manage project gallery" },
  { label: "Blog", path: "/admin/blog", icon: BookOpen, desc: "Manage blog posts" },
  { label: "Contact", path: "/admin/contact", icon: Phone, desc: "Contact page settings" },
  { label: "Navigation", path: "/admin/navigation", icon: Navigation, desc: "Menu links & ordering" },
  { label: "Branding", path: "/admin/branding", icon: Palette, desc: "Colors, fonts, logo" },
  { label: "Content", path: "/admin/content", icon: FileText, desc: "Hero, testimonials, trust badges" },
  { label: "Settings", path: "/admin/settings", icon: Settings, desc: "General settings" },
];

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-heading font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">Manage your website content and settings</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map((s) => (
          <Link key={s.path} to={s.path}>
            <Card className="hover:shadow-md hover:border-primary/30 transition-all cursor-pointer h-full">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    <s.icon className="h-4 w-4 text-primary" />
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <CardTitle className="text-base mb-1">{s.label}</CardTitle>
                <p className="text-xs text-muted-foreground">{s.desc}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </AdminLayout>
  );
}
