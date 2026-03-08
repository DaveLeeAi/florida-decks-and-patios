import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";
import { useSiteData } from "@/contexts/SiteDataContext";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export default function Contact() {
  const { company, services, settings } = useSiteData();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "", email: "", phone: "", city: "", service: "", budget: "", message: "",
  });
  // Honeypot field
  const [website, setWebsite] = useState("");

  const update = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  const validatePhone = (phone: string): boolean => {
    if (!phone) return true; // phone is optional
    const digits = phone.replace(/\D/g, "");
    return digits.length === 10 || digits.length === 11;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot: silently discard spam
    if (website) {
      setSubmitted(true);
      return;
    }

    if (!validatePhone(form.phone)) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    setLoading(true);
    setError("");

    const { error: insertError } = await supabase.from("leads").insert({
      name: form.name,
      email: form.email,
      phone: form.phone || null,
      city: form.city || null,
      service: form.service || null,
      budget: form.budget || null,
      message: form.message,
    });

    setLoading(false);

    if (insertError) {
      console.error("Lead insert error:", insertError);
      setError("Something went wrong. Please try again or call us directly.");
      return;
    }

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Layout>
        <section className="section-padding bg-background min-h-[60vh] flex items-center justify-center">
          <div className="text-center max-w-md">
            <CheckCircle className="h-16 w-16 text-primary mx-auto mb-6" />
            <h1 className="font-heading text-3xl font-bold text-foreground mb-4">Thank You!</h1>
            <p className="text-muted-foreground">We've received your request. Our team will contact you within 24 hours to discuss your project.</p>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="section-padding bg-section-alt" id="estimate">
        <div className="container-narrow mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">{settings.ctaText}</h1>
              <p className="text-muted-foreground text-lg mb-8">Tell us about your project and we'll provide a detailed, no-obligation estimate within 24 hours.</p>

              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="flex items-center gap-2 bg-destructive/10 text-destructive text-sm p-3 rounded-md">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    {error}
                  </div>
                )}

                {/* Honeypot - hidden from real users */}
                <input
                  type="text"
                  name="website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  autoComplete="off"
                  tabIndex={-1}
                  aria-hidden="true"
                  style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0 }}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Full Name *</label>
                    <input required maxLength={100} value={form.name} onChange={(e) => update("name", e.target.value)} className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm text-foreground" placeholder="John Smith" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Email *</label>
                    <input required type="email" maxLength={255} value={form.email} onChange={(e) => update("email", e.target.value)} className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm text-foreground" placeholder="john@example.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Phone</label>
                    <input type="tel" maxLength={20} value={form.phone} onChange={(e) => update("phone", e.target.value)} className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm text-foreground" placeholder="(555) 000-0000" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">City</label>
                    <input maxLength={100} value={form.city} onChange={(e) => update("city", e.target.value)} className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm text-foreground" placeholder="Tampa, FL" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Service Type</label>
                    <select value={form.service} onChange={(e) => update("service", e.target.value)} className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm text-foreground">
                      <option value="">Select a service...</option>
                      {services.map(s => <option key={s.slug} value={s.shortTitle}>{s.shortTitle}</option>)}
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Budget Range</label>
                    <select value={form.budget} onChange={(e) => update("budget", e.target.value)} className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm text-foreground">
                      <option value="">Select range...</option>
                      <option value="Under $5,000">Under $5,000</option>
                      <option value="$5,000 - $15,000">$5,000 – $15,000</option>
                      <option value="$15,000 - $30,000">$15,000 – $30,000</option>
                      <option value="$30,000 - $50,000">$30,000 – $50,000</option>
                      <option value="$50,000+">$50,000+</option>
                      <option value="Not sure">Not sure yet</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Tell Us About Your Project *</label>
                  <textarea required maxLength={1000} rows={4} value={form.message} onChange={(e) => update("message", e.target.value)} className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm text-foreground resize-none" placeholder="Describe your project..." />
                </div>
                <Button type="submit" size="lg" disabled={loading} className="bg-primary text-primary-foreground hover:bg-forest-dark font-semibold px-8">
                  {loading ? <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Submitting...</> : "Submit Request"}
                </Button>
              </form>
            </div>

            <div className="space-y-6">
              <div className="bg-card rounded-lg border border-border p-6">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-4">Contact Info</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3 text-sm text-foreground/80">
                    <Phone className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                    <a href={`tel:${company.phone}`} className="hover:text-primary transition-colors">{company.phoneDisplay}</a>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-foreground/80">
                    <Mail className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                    <a href={`mailto:${company.email}`} className="hover:text-primary transition-colors">{company.email}</a>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-foreground/80">
                    <MapPin className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                    <span>{company.address}<br />{company.city}, {company.state} {company.zip}</span>
                  </li>
                </ul>
              </div>
              <div className="bg-primary/5 rounded-lg border border-primary/20 p-6">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">What Happens Next?</h3>
                <ol className="space-y-3 text-sm text-foreground/80">
                  <li className="flex gap-3"><span className="h-6 w-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shrink-0">1</span>We review your project details within 24 hours.</li>
                  <li className="flex gap-3"><span className="h-6 w-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shrink-0">2</span>We schedule a free on-site visit at your convenience.</li>
                  <li className="flex gap-3"><span className="h-6 w-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shrink-0">3</span>You receive a detailed written estimate.</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
