import { ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAdmin } from "@/contexts/AdminContext";
import {
  Building2, Image, Phone, Navigation, Palette, FileText,
  Wrench, BookOpen, Settings, LogOut, LayoutDashboard,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const sidebarItems = [
  { label: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { label: "Basic Info", path: "/admin/basic-info", icon: Building2 },
  { label: "Services", path: "/admin/services", icon: Wrench },
  { label: "Portfolio", path: "/admin/portfolio", icon: Image },
  { label: "Blog", path: "/admin/blog", icon: BookOpen },
  { label: "Contact", path: "/admin/contact", icon: Phone },
  { label: "Navigation", path: "/admin/navigation", icon: Navigation },
  { label: "Branding", path: "/admin/branding", icon: Palette },
  { label: "Content", path: "/admin/content", icon: FileText },
  { label: "Settings", path: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { logout } = useAdmin();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <div className="flex min-h-screen bg-muted/30">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border flex flex-col shrink-0">
        <div className="p-4 border-b border-border">
          <Link to="/" className="flex items-center gap-2 font-heading font-bold text-lg text-primary">
            <span>🪵</span> Admin Panel
          </Link>
        </div>
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {sidebarItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground/70 hover:bg-muted hover:text-foreground"
                }`}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-border">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        <div className="max-w-4xl">{children}</div>
      </main>
    </div>
  );
}
