import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { ArrowLeft, LogOut, Download, Mail, Search, Inbox } from "lucide-react";
import { toast } from "sonner";
import { Helmet } from "react-helmet-async";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  city: string | null;
  service: string | null;
  budget: string | null;
  message: string | null;
  created_at: string;
  contacted: boolean;
}

function useAdminGuard() {
  const navigate = useNavigate();
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) navigate("/admin/login", { replace: true });
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) navigate("/admin/login", { replace: true });
    });
    return () => subscription.unsubscribe();
  }, [navigate]);
}

export default function AdminLeads() {
  useAdminGuard();
  const navigate = useNavigate();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      toast.error("Failed to load leads");
    } else {
      setLeads((data as Lead[]) || []);
    }
    setLoading(false);
  };

  const filtered = useMemo(() => {
    if (!search.trim()) return leads;
    const q = search.toLowerCase();
    return leads.filter(
      (l) =>
        l.name.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q) ||
        (l.city && l.city.toLowerCase().includes(q))
    );
  }, [leads, search]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const weekAgo = new Date(today);
  weekAgo.setDate(weekAgo.getDate() - 7);

  const countToday = leads.filter((l) => new Date(l.created_at) >= today).length;
  const countWeek = leads.filter((l) => new Date(l.created_at) >= weekAgo).length;

  const toggleContacted = async (lead: Lead) => {
    const newVal = !lead.contacted;
    setLeads((prev) =>
      prev.map((l) => (l.id === lead.id ? { ...l, contacted: newVal } : l))
    );
    const { error } = await supabase
      .from("leads")
      .update({ contacted: newVal } as any)
      .eq("id", lead.id);
    if (error) {
      toast.error("Failed to update");
      setLeads((prev) =>
        prev.map((l) => (l.id === lead.id ? { ...l, contacted: !newVal } : l))
      );
    }
  };

  const exportCSV = () => {
    const headers = ["Date", "Name", "Email", "Phone", "City", "Service", "Budget", "Source", "Contacted"];
    const rows = filtered.map((l) => [
      new Date(l.created_at).toLocaleDateString(),
      l.name,
      l.email,
      l.phone || "",
      l.city || "",
      l.service || "",
      l.budget || "",
      l.message || "",
      l.contacted ? "Yes" : "No",
    ]);
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <title>Admin — Leads</title>
      </Helmet>

      {/* Top bar */}
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3 flex-wrap">
            <Link to="/" className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" /> Site
            </Link>
            <span className="text-border">|</span>
            <Link to="/admin/dashboard" className="text-sm text-muted-foreground hover:text-primary">Dashboard</Link>
            <Link to="/admin/leads" className="text-sm text-primary font-semibold">Leads</Link>
            <Link to="/admin/chats" className="text-sm text-muted-foreground hover:text-primary">Chats</Link>
            <Link to="/admin/kb" className="text-sm text-muted-foreground hover:text-primary">KB</Link>
          </div>
          <Button variant="ghost" size="sm" className="text-muted-foreground gap-1" onClick={logout}>
            <LogOut className="h-4 w-4" /> Logout
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Lead Management</h1>

        {/* Summary bar */}
        <div className="flex flex-wrap gap-4">
          {[
            { label: "Today", count: countToday },
            { label: "This Week", count: countWeek },
            { label: "All Time", count: leads.length },
          ].map((s) => (
            <div key={s.label} className="bg-card border border-border rounded-lg px-4 py-3 min-w-[120px]">
              <p className="text-xs text-muted-foreground">{s.label}</p>
              <p className="text-2xl font-bold text-foreground">{s.count}</p>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, or city…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button variant="outline" size="sm" className="gap-1" onClick={exportCSV}>
            <Download className="h-4 w-4" /> Export CSV
          </Button>
        </div>

        {/* Table */}
        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-3">
            <Inbox className="h-12 w-12" />
            <p className="text-lg font-medium">{search ? "No leads match your search" : "No leads yet"}</p>
          </div>
        ) : (
          <div className="border border-border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead className="text-xs">Date</TableHead>
                  <TableHead className="text-xs">Name</TableHead>
                  <TableHead className="text-xs">Email</TableHead>
                  <TableHead className="text-xs">Phone</TableHead>
                  <TableHead className="text-xs">City</TableHead>
                  <TableHead className="text-xs">Service</TableHead>
                  <TableHead className="text-xs">Budget</TableHead>
                  <TableHead className="text-xs">Source</TableHead>
                  <TableHead className="text-xs text-center">Contacted</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((l) => (
                  <TableRow key={l.id} className={l.contacted ? "opacity-60" : ""}>
                    <TableCell className="text-xs whitespace-nowrap">
                      {new Date(l.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-sm font-medium">{l.name}</TableCell>
                    <TableCell className="text-sm">
                      <a href={`mailto:${l.email}`} className="text-primary hover:underline inline-flex items-center gap-1">
                        <Mail className="h-3 w-3" /> {l.email}
                      </a>
                    </TableCell>
                    <TableCell className="text-sm">{l.phone || "—"}</TableCell>
                    <TableCell className="text-sm">{l.city || "—"}</TableCell>
                    <TableCell className="text-sm">{l.service || "—"}</TableCell>
                    <TableCell className="text-sm">{l.budget || "—"}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{l.message || "—"}</TableCell>
                    <TableCell className="text-center">
                      <Switch
                        checked={l.contacted}
                        onCheckedChange={() => toggleContacted(l)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
}
