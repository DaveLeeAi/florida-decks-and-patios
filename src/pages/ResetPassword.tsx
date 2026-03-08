import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Lock, Loader2, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [ready, setReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Listen for the PASSWORD_RECOVERY event from the hash token
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setReady(true);
      }
    });

    // Also check if already in a session (user clicked the link)
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setReady(true);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    const { error: updateError } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    setSuccess(true);
    setTimeout(() => navigate("/admin/dashboard"), 2000);
  };

  if (!ready) {
    return (
      <div className="min-h-screen bg-forest-dark flex items-center justify-center px-4">
        <div className="text-center">
          <div className="h-8 w-8 border-2 border-amber border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-primary-foreground/60 text-sm">Verifying reset link…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-forest-dark flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="h-16 w-16 rounded-full bg-amber/20 flex items-center justify-center mx-auto mb-4">
            <Lock className="h-8 w-8 text-amber" />
          </div>
          <h1 className="font-heading text-2xl font-bold text-primary-foreground">Set New Password</h1>
          <p className="text-primary-foreground/60 text-sm mt-1">Enter your new password below</p>
        </div>

        {success ? (
          <div className="bg-card rounded-lg border border-border p-6 shadow-xl text-center">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
            <p className="text-foreground font-medium">Password updated!</p>
            <p className="text-muted-foreground text-sm mt-1">Redirecting to dashboard…</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-card rounded-lg border border-border p-6 space-y-4 shadow-xl">
            {error && (
              <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md text-center">{error}</div>
            )}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">New Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-md border border-input bg-background pl-10 pr-3 py-2.5 text-sm text-foreground"
                  placeholder="••••••••••"
                  required
                  minLength={8}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full rounded-md border border-input bg-background pl-10 pr-3 py-2.5 text-sm text-foreground"
                  placeholder="••••••••••"
                  required
                  minLength={8}
                />
              </div>
            </div>
            <Button type="submit" disabled={loading} className="w-full bg-amber text-charcoal hover:bg-amber-dark font-bold">
              {loading ? <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Updating…</> : "Update Password"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
