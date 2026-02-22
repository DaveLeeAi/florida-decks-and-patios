import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Lock, User } from "lucide-react";

const ADMIN_USER = "admin";
const ADMIN_PASS = "Password123456!!!";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      sessionStorage.setItem("admin_auth", "true");
      navigate("/admin/dashboard");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-forest-dark flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="h-16 w-16 rounded-full bg-amber/20 flex items-center justify-center mx-auto mb-4">
            <Lock className="h-8 w-8 text-amber" />
          </div>
          <h1 className="font-heading text-2xl font-bold text-primary-foreground">Admin Dashboard</h1>
          <p className="text-primary-foreground/60 text-sm mt-1">Sign in to manage your site</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-card rounded-lg border border-border p-6 space-y-4 shadow-xl">
          {error && (
            <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md text-center">{error}</div>
          )}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Username</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-md border border-input bg-background pl-10 pr-3 py-2.5 text-sm text-foreground"
                placeholder="admin"
                required
                maxLength={50}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md border border-input bg-background pl-10 pr-3 py-2.5 text-sm text-foreground"
                placeholder="••••••••••"
                required
                maxLength={100}
              />
            </div>
          </div>
          <Button type="submit" className="w-full bg-amber text-charcoal hover:bg-amber-dark font-bold">
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
}
