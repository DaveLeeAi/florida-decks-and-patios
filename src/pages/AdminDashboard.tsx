import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSiteData, type CompanyInfo, type HeroSlide, type Service, type PortfolioProject, type BlogPost, type Testimonial, type TrustBadge, type NavLink as NavLinkType, type SiteSettings } from "@/contexts/SiteDataContext";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, Save, Plus, Trash2, GripVertical, ArrowLeft, Check } from "lucide-react";
import { toast } from "sonner";

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

// Reusable field component
function Field({ label, value, onChange, type = "text", rows, placeholder, required }: {
  label: string; value: string; onChange: (v: string) => void; type?: string; rows?: number; placeholder?: string; required?: boolean;
}) {
  const cls = "w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground";
  return (
    <div>
      <label className="block text-xs font-medium text-muted-foreground mb-1">{label}</label>
      {rows ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} className={cls + " resize-none"} rows={rows} placeholder={placeholder} required={required} maxLength={5000} />
      ) : (
        <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className={cls} placeholder={placeholder} required={required} maxLength={500} />
      )}
    </div>
  );
}

function SaveButton({ onClick }: { onClick: () => void }) {
  return (
    <Button onClick={onClick} className="bg-amber text-charcoal hover:bg-amber-dark font-semibold gap-2">
      <Save className="h-4 w-4" /> Save Changes
    </Button>
  );
}

// ============ BASIC INFO ============
function BasicInfoTab() {
  const { company, updateCompany } = useSiteData();
  const [form, setForm] = useState<CompanyInfo>({ ...company });
  const u = (field: keyof CompanyInfo, val: string) => setForm(f => ({ ...f, [field]: val }));

  return (
    <div className="space-y-4">
      <h2 className="font-heading text-xl font-bold text-foreground">Basic Info</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Company Name" value={form.name} onChange={(v) => u("name", v)} />
        <Field label="Tagline" value={form.tagline} onChange={(v) => u("tagline", v)} />
        <Field label="Phone" value={form.phone} onChange={(v) => u("phone", v)} />
        <Field label="Phone Display" value={form.phoneDisplay} onChange={(v) => u("phoneDisplay", v)} />
        <Field label="Email" value={form.email} onChange={(v) => u("email", v)} type="email" />
        <Field label="Address" value={form.address} onChange={(v) => u("address", v)} />
        <Field label="City" value={form.city} onChange={(v) => u("city", v)} />
        <Field label="State" value={form.state} onChange={(v) => u("state", v)} />
        <Field label="ZIP" value={form.zip} onChange={(v) => u("zip", v)} />
      </div>
      <SaveButton onClick={() => { updateCompany(form); toast.success("Basic info saved!"); }} />
    </div>
  );
}

// ============ SERVICES ============
function ServicesTab() {
  const { services, updateServices } = useSiteData();
  const [items, setItems] = useState<Service[]>(services.map(s => ({ ...s })));
  const [editing, setEditing] = useState<number | null>(null);

  const updateItem = (index: number, field: keyof Service, value: any) => {
    setItems(prev => prev.map((s, i) => {
      if (i !== index) return s;
      const updated = { ...s, [field]: value };
      if (field === "title") updated.slug = toServiceSlug(value);
      return updated;
    }));
  };

  const toServiceSlug = (text: string) =>
    text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 80) || `service-${Date.now()}`;

  const addService = () => {
    const newService: Service = {
      slug: toServiceSlug("New Service"),
      title: "New Service",
      shortTitle: "New Service",
      icon: "Hammer",
      description: "",
      longDescription: "",
      features: [],
      priceRange: "",
    };
    setItems(prev => [...prev, newService]);
    setEditing(items.length);
  };

  const removeService = (index: number) => {
    setItems(prev => prev.filter((_, i) => i !== index));
    setEditing(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-xl font-bold text-foreground">Services ({items.length})</h2>
        <Button variant="outline" size="sm" className="gap-1" onClick={addService}><Plus className="h-4 w-4" /> Add</Button>
      </div>

      <div className="space-y-2">
        {items.map((s, i) => (
          <div key={i} className="border border-border rounded-lg bg-card">
            <div className="flex items-center justify-between p-3 cursor-pointer" onClick={() => setEditing(editing === i ? null : i)}>
              <div className="flex items-center gap-2">
                <GripVertical className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium text-sm text-foreground">{s.title}</span>
                <span className="text-xs text-muted-foreground">{s.priceRange}</span>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={(e) => { e.stopPropagation(); removeService(i); }}>
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
            {editing === i && (
              <div className="p-4 pt-0 space-y-3 border-t border-border">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Field label="Title" value={s.title} onChange={(v) => updateItem(i, "title", v)} />
                  <Field label="Short Title" value={s.shortTitle} onChange={(v) => updateItem(i, "shortTitle", v)} />
                  <Field label="Slug" value={s.slug} onChange={(v) => updateItem(i, "slug", v)} />
                  <Field label="Icon (Hammer, Wrench, Layers, FileCheck, TreePine, Home, ChefHat)" value={s.icon} onChange={(v) => updateItem(i, "icon", v)} />
                  <Field label="Price Range" value={s.priceRange} onChange={(v) => updateItem(i, "priceRange", v)} />
                </div>
                <Field label="Short Description" value={s.description} onChange={(v) => updateItem(i, "description", v)} rows={2} />
                <Field label="Full Description (use \\n for newlines, **bold**, ## headings)" value={s.longDescription} onChange={(v) => updateItem(i, "longDescription", v)} rows={6} />
                <Field label="Features (comma separated)" value={s.features.join(", ")} onChange={(v) => updateItem(i, "features", v.split(",").map(f => f.trim()).filter(Boolean))} />
              </div>
            )}
          </div>
        ))}
      </div>

      <SaveButton onClick={() => { updateServices(items); toast.success("Services saved!"); }} />
    </div>
  );
}

// ============ PORTFOLIO ============
function PortfolioTab() {
  const { portfolioProjects, updatePortfolio } = useSiteData();
  const [items, setItems] = useState<PortfolioProject[]>(portfolioProjects.map(p => ({ ...p })));
  const [editing, setEditing] = useState<number | null>(null);

  const updateItem = (index: number, field: keyof PortfolioProject, value: any) => {
    setItems(prev => prev.map((p, i) => i === index ? { ...p, [field]: value } : p));
  };

  const addProject = () => {
    setItems(prev => [...prev, { id: Date.now(), title: "New Project", category: "", description: "", location: "", image: "" }]);
    setEditing(items.length);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-xl font-bold text-foreground">Portfolio ({items.length})</h2>
        <Button variant="outline" size="sm" className="gap-1" onClick={addProject}><Plus className="h-4 w-4" /> Add</Button>
      </div>

      <div className="space-y-2">
        {items.map((p, i) => (
          <div key={p.id} className="border border-border rounded-lg bg-card">
            <div className="flex items-center justify-between p-3 cursor-pointer" onClick={() => setEditing(editing === i ? null : i)}>
              <div className="flex items-center gap-2">
                {p.image && <img src={p.image} alt="" className="h-8 w-12 object-cover rounded" />}
                <span className="font-medium text-sm text-foreground">{p.title}</span>
                <span className="text-xs text-muted-foreground">{p.category}</span>
              </div>
              <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={(e) => { e.stopPropagation(); setItems(prev => prev.filter((_, j) => j !== i)); setEditing(null); }}>
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
            {editing === i && (
              <div className="p-4 pt-0 space-y-3 border-t border-border">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Field label="Title" value={p.title} onChange={(v) => updateItem(i, "title", v)} />
                  <Field label="Category" value={p.category} onChange={(v) => updateItem(i, "category", v)} />
                  <Field label="Location" value={p.location} onChange={(v) => updateItem(i, "location", v)} />
                  <Field label="Image URL" value={p.image} onChange={(v) => updateItem(i, "image", v)} />
                </div>
                <Field label="Description" value={p.description} onChange={(v) => updateItem(i, "description", v)} rows={3} />
                {p.image && <img src={p.image} alt="Preview" className="h-24 w-auto object-cover rounded border border-border" />}
              </div>
            )}
          </div>
        ))}
      </div>

      <SaveButton onClick={() => { updatePortfolio(items); toast.success("Portfolio saved!"); }} />
    </div>
  );
}

// ============ BLOG ============
function BlogTab() {
  const { blogPosts, updateBlogPosts } = useSiteData();
  const [items, setItems] = useState<BlogPost[]>(blogPosts.map(p => ({ ...p })));
  const [editing, setEditing] = useState<number | null>(null);

  

  const toSlug = (text: string) =>
    text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 80) || `post-${Date.now()}`;

  const addPost = () => {
    const title = "New Blog Post";
    const newPost: BlogPost = {
      slug: toSlug(title),
      title,
      excerpt: "",
      date: new Date().toISOString().split("T")[0],
      category: "General",
      content: "",
    };
    setItems(prev => [newPost, ...prev]);
    setEditing(0);
  };

  const updateItem = (index: number, field: keyof BlogPost, value: string) => {
    setItems(prev => prev.map((p, i) => {
      if (i !== index) return p;
      const updated = { ...p, [field]: value };
      // Auto-generate slug from title
      if (field === "title") {
        updated.slug = toSlug(value);
      }
      return updated;
    }));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-xl font-bold text-foreground">Blog Posts ({items.length})</h2>
        <Button variant="outline" size="sm" className="gap-1" onClick={addPost}><Plus className="h-4 w-4" /> New Post</Button>
      </div>

      <div className="space-y-2">
        {items.map((p, i) => (
          <div key={p.slug + i} className="border border-border rounded-lg bg-card">
            <div className="flex items-center justify-between p-3 cursor-pointer" onClick={() => setEditing(editing === i ? null : i)}>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded">{p.category}</span>
                <span className="font-medium text-sm text-foreground">{p.title}</span>
                <span className="text-xs text-muted-foreground">{p.date}</span>
              </div>
              <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={(e) => { e.stopPropagation(); setItems(prev => prev.filter((_, j) => j !== i)); setEditing(null); }}>
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
            {editing === i && (
              <div className="p-4 pt-0 space-y-3 border-t border-border">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Field label="Title" value={p.title} onChange={(v) => updateItem(i, "title", v)} />
                  <Field label="Slug" value={p.slug} onChange={(v) => updateItem(i, "slug", v)} />
                  <Field label="Category" value={p.category} onChange={(v) => updateItem(i, "category", v)} />
                  <Field label="Date" value={p.date} onChange={(v) => updateItem(i, "date", v)} type="date" />
                </div>
                <Field label="Excerpt" value={p.excerpt} onChange={(v) => updateItem(i, "excerpt", v)} rows={2} />
                <Field label="Content (Markdown: ## headings, **bold**, - lists, 1. ordered, | tables)" value={p.content} onChange={(v) => updateItem(i, "content", v)} rows={12} />
              </div>
            )}
          </div>
        ))}
      </div>

      <SaveButton onClick={() => { updateBlogPosts(items); toast.success("Blog posts saved!"); }} />
    </div>
  );
}

// ============ NAVIGATION ============
function NavigationTab() {
  const { navLinks, updateNavLinks } = useSiteData();
  const [items, setItems] = useState<NavLinkType[]>(navLinks.map(l => ({ ...l })));

  const updateItem = (index: number, field: keyof NavLinkType, value: string) => {
    setItems(prev => prev.map((l, i) => i === index ? { ...l, [field]: value } : l));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-xl font-bold text-foreground">Navigation Links</h2>
        <Button variant="outline" size="sm" className="gap-1" onClick={() => setItems(prev => [...prev, { label: "New Link", path: "/" }])}>
          <Plus className="h-4 w-4" /> Add
        </Button>
      </div>

      <div className="space-y-2">
        {items.map((l, i) => (
          <div key={i} className="flex items-center gap-3 p-3 border border-border rounded-lg bg-card">
            <GripVertical className="h-4 w-4 text-muted-foreground shrink-0" />
            <div className="grid grid-cols-2 gap-3 flex-1">
              <Field label="Label" value={l.label} onChange={(v) => updateItem(i, "label", v)} />
              <Field label="Path" value={l.path} onChange={(v) => updateItem(i, "path", v)} />
            </div>
            <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive shrink-0" onClick={() => setItems(prev => prev.filter((_, j) => j !== i))}>
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        ))}
      </div>

      <SaveButton onClick={() => { updateNavLinks(items); toast.success("Navigation saved!"); }} />
    </div>
  );
}

// ============ CONTENT (Hero, Testimonials, Trust Badges) ============
function ContentTab() {
  const { heroSlides, testimonials, trustBadges, updateHeroSlides, updateTestimonials, updateTrustBadges } = useSiteData();
  const [heroes, setHeroes] = useState<HeroSlide[]>(heroSlides.map(h => ({ ...h })));
  const [tests, setTests] = useState<Testimonial[]>(testimonials.map(t => ({ ...t })));
  const [badges, setBadges] = useState<TrustBadge[]>(trustBadges.map(b => ({ ...b })));
  const [section, setSection] = useState<"hero" | "testimonials" | "badges">("hero");

  return (
    <div className="space-y-4">
      <h2 className="font-heading text-xl font-bold text-foreground">Content Management</h2>

      <div className="flex gap-2 mb-4">
        {(["hero", "testimonials", "badges"] as const).map(s => (
          <Button key={s} variant={section === s ? "default" : "outline"} size="sm" onClick={() => setSection(s)} className="capitalize">
            {s === "hero" ? "Hero Slides" : s === "badges" ? "Trust Badges" : "Testimonials"}
          </Button>
        ))}
      </div>

      {section === "hero" && (
        <div className="space-y-3">
          {heroes.map((h, i) => (
            <div key={i} className="p-4 border border-border rounded-lg bg-card space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">Slide {i + 1}</span>
                <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => setHeroes(prev => prev.filter((_, j) => j !== i))}>
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Field label="Headline" value={h.headline} onChange={(v) => setHeroes(prev => prev.map((s, j) => j === i ? { ...s, headline: v } : s))} />
                <Field label="Subheadline" value={h.subheadline} onChange={(v) => setHeroes(prev => prev.map((s, j) => j === i ? { ...s, subheadline: v } : s))} />
                <Field label="Image URL" value={h.image} onChange={(v) => setHeroes(prev => prev.map((s, j) => j === i ? { ...s, image: v } : s))} />
                <Field label="Alt Text" value={h.alt} onChange={(v) => setHeroes(prev => prev.map((s, j) => j === i ? { ...s, alt: v } : s))} />
              </div>
              {h.image && <img src={h.image} alt="Preview" className="h-16 w-auto object-cover rounded border border-border" />}
            </div>
          ))}
          <Button variant="outline" size="sm" className="gap-1" onClick={() => setHeroes(prev => [...prev, { image: "", alt: "", headline: "New Slide", subheadline: "" }])}>
            <Plus className="h-4 w-4" /> Add Slide
          </Button>
          <div><SaveButton onClick={() => { updateHeroSlides(heroes); toast.success("Hero slides saved!"); }} /></div>
        </div>
      )}

      {section === "testimonials" && (
        <div className="space-y-3">
          {tests.map((t, i) => (
            <div key={i} className="p-4 border border-border rounded-lg bg-card space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">{t.name}</span>
                <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => setTests(prev => prev.filter((_, j) => j !== i))}>
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Field label="Name" value={t.name} onChange={(v) => setTests(prev => prev.map((s, j) => j === i ? { ...s, name: v } : s))} />
                <Field label="Location" value={t.location} onChange={(v) => setTests(prev => prev.map((s, j) => j === i ? { ...s, location: v } : s))} />
                <Field label="Rating (1-5)" value={String(t.rating)} onChange={(v) => setTests(prev => prev.map((s, j) => j === i ? { ...s, rating: Math.min(5, Math.max(1, parseInt(v) || 5)) } : s))} type="number" />
              </div>
              <Field label="Text" value={t.text} onChange={(v) => setTests(prev => prev.map((s, j) => j === i ? { ...s, text: v } : s))} rows={2} />
              
            </div>
          ))}
          <Button variant="outline" size="sm" className="gap-1" onClick={() => setTests(prev => [...prev, { name: "New Reviewer", location: "", text: "", rating: 5, note: "" }])}>
            <Plus className="h-4 w-4" /> Add Testimonial
          </Button>
          <div><SaveButton onClick={() => { updateTestimonials(tests); toast.success("Testimonials saved!"); }} /></div>
        </div>
      )}

      {section === "badges" && (
        <div className="space-y-3">
          {badges.map((b, i) => (
            <div key={i} className="p-4 border border-border rounded-lg bg-card space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">{b.title}</span>
                <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => setBadges(prev => prev.filter((_, j) => j !== i))}>
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Field label="Title" value={b.title} onChange={(v) => setBadges(prev => prev.map((s, j) => j === i ? { ...s, title: v } : s))} />
                <Field label="Icon (Shield, Award, FileCheck, Users)" value={b.icon} onChange={(v) => setBadges(prev => prev.map((s, j) => j === i ? { ...s, icon: v } : s))} />
              </div>
              <Field label="Text" value={b.text} onChange={(v) => setBadges(prev => prev.map((s, j) => j === i ? { ...s, text: v } : s))} />
            </div>
          ))}
          <Button variant="outline" size="sm" className="gap-1" onClick={() => setBadges(prev => [...prev, { icon: "Shield", title: "New Badge", text: "" }])}>
            <Plus className="h-4 w-4" /> Add Badge
          </Button>
          <div><SaveButton onClick={() => { updateTrustBadges(badges); toast.success("Trust badges saved!"); }} /></div>
        </div>
      )}
    </div>
  );
}

// ============ SETTINGS ============
function SettingsTab() {
  const { settings, updateSettings } = useSiteData();
  const [form, setForm] = useState<SiteSettings>({ ...settings });

  const resetAll = () => {
    if (confirm("This will reset ALL site data to defaults. Are you sure?")) {
      localStorage.removeItem("siteData");
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="font-heading text-xl font-bold text-foreground">Site Settings</h2>

      <div className="space-y-4 p-4 border border-border rounded-lg bg-card">
        <h3 className="font-medium text-foreground">CTA Button</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Field label="CTA Text" value={form.ctaText} onChange={(v) => setForm(f => ({ ...f, ctaText: v }))} />
          <Field label="CTA Link" value={form.ctaLink} onChange={(v) => setForm(f => ({ ...f, ctaLink: v }))} />
        </div>
        <Field label="Footer Text" value={form.footerText} onChange={(v) => setForm(f => ({ ...f, footerText: v }))} rows={2} />
        <SaveButton onClick={() => { updateSettings(form); toast.success("Settings saved!"); }} />
      </div>

      <div className="p-4 border border-destructive/30 rounded-lg bg-destructive/5">
        <h3 className="font-medium text-destructive mb-2">Danger Zone</h3>
        <p className="text-sm text-muted-foreground mb-3">Reset all site data back to factory defaults. This cannot be undone.</p>
        <Button variant="destructive" onClick={resetAll}>Reset All Data</Button>
      </div>
    </div>
  );
}

// ============ MAIN DASHBOARD ============
export default function AdminDashboard() {
  useAdminGuard();
  const navigate = useNavigate();

  const logout = () => {
    sessionStorage.removeItem("admin_auth");
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" /> View Site
            </Link>
            <span className="text-border">|</span>
            <span className="font-heading font-bold text-foreground">Admin Dashboard</span>
            <span className="text-border">|</span>
            <Link to="/admin/chats" className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1">
              Chat History
            </Link>
            <Link to="/admin/kb" className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1">
              Knowledge Base
            </Link>
          </div>
          <Button variant="ghost" size="sm" className="text-muted-foreground gap-1" onClick={logout}>
            <LogOut className="h-4 w-4" /> Logout
          </Button>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Tabs defaultValue="basic" className="space-y-6">
          <TabsList className="flex flex-wrap h-auto gap-1 bg-muted p-1">
            <TabsTrigger value="basic" className="text-xs">Basic Info</TabsTrigger>
            <TabsTrigger value="services" className="text-xs">Services</TabsTrigger>
            <TabsTrigger value="portfolio" className="text-xs">Portfolio</TabsTrigger>
            <TabsTrigger value="blog" className="text-xs">Blog</TabsTrigger>
            <TabsTrigger value="content" className="text-xs">Content</TabsTrigger>
            <TabsTrigger value="navigation" className="text-xs">Navigation</TabsTrigger>
            <TabsTrigger value="settings" className="text-xs">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="basic"><BasicInfoTab /></TabsContent>
          <TabsContent value="services"><ServicesTab /></TabsContent>
          <TabsContent value="portfolio"><PortfolioTab /></TabsContent>
          <TabsContent value="blog"><BlogTab /></TabsContent>
          <TabsContent value="content"><ContentTab /></TabsContent>
          <TabsContent value="navigation"><NavigationTab /></TabsContent>
          <TabsContent value="settings"><SettingsTab /></TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
