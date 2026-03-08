import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { COMPANY } from "@/data/siteData";
import { permitCities } from "@/data/permitRules";
import { Shield, Clock, Star, CheckCircle2, Users, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const projectTypes = [
  "New Deck Build",
  "Deck Repair / Restoration",
  "Composite Decking",
  "Pool Deck",
  "Patio / Pavers",
  "Pergola / Gazebo",
  "Screened Porch",
  "Outdoor Kitchen",
];

const budgetRanges = [
  "Under $5,000",
  "$5,000 – $10,000",
  "$10,000 – $25,000",
  "$25,000 – $50,000",
  "$50,000+",
  "Not sure yet",
];

const timelines = [
  "ASAP – within 2 weeks",
  "1–3 months",
  "3–6 months",
  "Just researching",
];

const cities = permitCities.map((c) => c.name).sort();

function JsonLdLocalBusiness() {
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "HomeAndConstructionBusiness",
      name: COMPANY.name,
      description: "Get 3 free quotes from pre-screened, licensed Florida deck and patio contractors. No obligation.",
      url: "https://florida-decks-and-patios.lovable.app/free-quotes",
      telephone: COMPANY.phone,
      email: COMPANY.email,
      areaServed: { "@type": "State", name: "Florida", addressCountry: "US" },
      priceRange: "$$–$$$$",
    };
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, []);
  return null;
}

export default function FreeQuotes() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    projects: [] as string[],
    budget: "",
    timeline: "",
    message: "",
    honeypot: "",
  });

  const toggleProject = (p: string) => {
    setForm((prev) => ({
      ...prev,
      projects: prev.projects.includes(p)
        ? prev.projects.filter((x) => x !== p)
        : [...prev.projects, p],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.honeypot) return;

    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
      toast({ title: "Please fill in all required fields", variant: "destructive" });
      return;
    }

    const phoneClean = form.phone.replace(/\D/g, "");
    if (phoneClean.length < 10) {
      toast({ title: "Please enter a valid 10-digit phone number", variant: "destructive" });
      return;
    }

    setLoading(true);
    const { error } = await supabase.from("leads").insert({
      name: form.name.trim().slice(0, 100),
      email: form.email.trim().slice(0, 255),
      phone: phoneClean.slice(0, 15),
      city: form.city || null,
      service: form.projects.join(", ") || null,
      budget: form.budget || null,
      message: [
        form.timeline ? `Timeline: ${form.timeline}` : "",
        form.message ? form.message.trim().slice(0, 1000) : "",
        "Source: free-quotes",
      ].filter(Boolean).join(" | "),
    });
    setLoading(false);

    if (error) {
      toast({ title: "Something went wrong. Please try again.", variant: "destructive" });
      return;
    }
    setSubmitted(true);
  };

  const trustBadges = [
    { icon: Shield, label: "Licensed & Insured", sub: "All contractors DBPR-verified" },
    { icon: Clock, label: "24-Hour Match", sub: "Responses within one business day" },
    { icon: Star, label: "Pre-Screened", sub: "Background & reference checked" },
    { icon: Users, label: "3 Contractor Quotes", sub: "Compare and choose the best fit" },
  ];

  if (submitted) {
    return (
      <Layout>
        <Helmet>
          <title>Thank You | Florida Decks and Patios</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <section className="min-h-[70vh] flex items-center justify-center px-4">
          <div className="max-w-lg text-center space-y-6">
            <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle2 className="h-8 w-8 text-primary" />
            </div>
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
              We're Matching You Now
            </h1>
            <p className="text-lg text-muted-foreground">
              Expect your first contractor response within <strong className="text-foreground">24 hours</strong>. We're reviewing your project details and selecting 3 pre-screened, licensed contractors in your area.
            </p>
            <p className="text-sm text-muted-foreground">No spam. No obligation. Just real quotes from real contractors.</p>
            <Button asChild variant="outline" size="lg">
              <a href="/">Back to Home</a>
            </Button>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <Helmet>
        <title>Get 3 Free Deck & Patio Quotes | Florida Contractors</title>
        <meta name="description" content="Tell us your project — we match you with 3 pre-screened, licensed Florida contractors within 24 hours. No spam, no obligation. Free quotes." />
        <link rel="canonical" href="https://florida-decks-and-patios.lovable.app/free-quotes" />
      </Helmet>
      <JsonLdLocalBusiness />

      {/* Hero */}
      <section className="bg-gradient-to-b from-primary/15 via-primary/5 to-background pt-20 pb-10 md:pt-28 md:pb-14">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <span className="inline-block bg-amber/20 text-amber-dark text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
            100% Free · No Obligation
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight mb-4">
            Get 3 Free Deck & Patio Quotes From Florida's Best Contractors
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tell us your project — we match you with 3 pre-screened, licensed Florida contractors within 24 hours. No spam, no obligation.
          </p>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="max-w-4xl mx-auto px-4 -mt-2 mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {trustBadges.map((b) => (
            <div key={b.label} className="flex flex-col items-center text-center p-4 bg-card border border-border/50 rounded-xl">
              <b.icon className="h-6 w-6 text-primary mb-2" />
              <p className="text-sm font-semibold text-foreground">{b.label}</p>
              <p className="text-xs text-muted-foreground">{b.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Form */}
      <section className="max-w-2xl mx-auto px-4 pb-20">
        <form onSubmit={handleSubmit} className="bg-card border border-border/60 rounded-2xl shadow-lg p-6 md:p-10 space-y-6">
          {/* Honeypot */}
          <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" value={form.honeypot} onChange={(e) => setForm({ ...form, honeypot: e.target.value })} />

          <div className="space-y-2">
            <Label htmlFor="name">Full Name <span className="text-destructive">*</span></Label>
            <Input id="name" placeholder="Your name" maxLength={100} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email <span className="text-destructive">*</span></Label>
              <Input id="email" type="email" placeholder="you@email.com" maxLength={255} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone <span className="text-destructive">*</span></Label>
              <Input id="phone" type="tel" placeholder="(555) 123-4567" maxLength={15} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
            </div>
          </div>

          <div className="space-y-2">
            <Label>City / Area</Label>
            <Select value={form.city} onValueChange={(v) => setForm({ ...form, city: v })}>
              <SelectTrigger><SelectValue placeholder="Select your city" /></SelectTrigger>
              <SelectContent>
                {cities.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
                <SelectItem value="Other">Other Florida city</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label>Project Type <span className="text-muted-foreground text-xs">(select all that apply)</span></Label>
            <div className="grid grid-cols-2 gap-2">
              {projectTypes.map((p) => (
                <label key={p} className="flex items-center gap-2 text-sm cursor-pointer hover:text-primary transition-colors">
                  <Checkbox checked={form.projects.includes(p)} onCheckedChange={() => toggleProject(p)} />
                  {p}
                </label>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Budget Range</Label>
              <Select value={form.budget} onValueChange={(v) => setForm({ ...form, budget: v })}>
                <SelectTrigger><SelectValue placeholder="Select budget" /></SelectTrigger>
                <SelectContent>
                  {budgetRanges.map((b) => (
                    <SelectItem key={b} value={b}>{b}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Timeline</Label>
              <Select value={form.timeline} onValueChange={(v) => setForm({ ...form, timeline: v })}>
                <SelectTrigger><SelectValue placeholder="When do you need this?" /></SelectTrigger>
                <SelectContent>
                  {timelines.map((t) => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Additional Details <span className="text-muted-foreground text-xs">(optional)</span></Label>
            <Textarea id="message" placeholder="Describe your project, special requirements, or questions…" maxLength={1000} rows={3} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
          </div>

          <Button type="submit" disabled={loading} size="lg" className="w-full bg-amber text-charcoal hover:bg-amber-dark font-bold text-base shadow-md">
            {loading ? "Submitting…" : "Get My 3 Free Quotes"}
            {!loading && <ArrowRight className="h-4 w-4 ml-1" />}
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            By submitting, you agree to our{" "}
            <a href="/privacy" className="underline hover:text-primary">Privacy Policy</a>. We never sell your information.
          </p>
        </form>
      </section>
    </Layout>
  );
}
