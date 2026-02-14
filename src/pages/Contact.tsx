import { useState } from "react";
import Layout from "@/components/Layout";
import { COMPANY } from "@/data/siteData";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, CheckCircle } from "lucide-react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    service: "",
    budget: "",
    message: "",
  });

  const update = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, integrate with Formspree/Resend/Netlify Forms
    // For now, show confirmation
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Layout>
        <section className="section-padding bg-background min-h-[60vh] flex items-center justify-center">
          <div className="text-center max-w-md">
            <CheckCircle className="h-16 w-16 text-primary mx-auto mb-6" />
            <h1 className="font-heading text-3xl font-bold text-foreground mb-4">Thank You!</h1>
            <p className="text-muted-foreground mb-2">
              We've received your request and will get back to you within 24 hours.
            </p>
            <p className="text-sm text-muted-foreground">
              A confirmation email has been sent to <strong className="text-foreground">{form.email}</strong>.
            </p>
            <p className="mt-6 text-sm text-muted-foreground italic">
              Confirmation email template: "Hi {form.name}, thank you for reaching out to {COMPANY.name}! We've received your inquiry about {form.service || "our services"} and a member of our team will contact you within 1 business day to discuss your project. If you need immediate assistance, call us at {COMPANY.phoneDisplay}."
            </p>
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
            {/* Form */}
            <div className="lg:col-span-2">
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">Get a Free Estimate</h1>
              <p className="text-muted-foreground text-lg mb-8">
                Tell us about your project and we'll provide a detailed, no-obligation estimate within 24 hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Full Name *</label>
                    <input
                      required
                      maxLength={100}
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm text-foreground"
                      placeholder="John Smith"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Email *</label>
                    <input
                      required
                      type="email"
                      maxLength={255}
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm text-foreground"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Phone</label>
                    <input
                      type="tel"
                      maxLength={20}
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm text-foreground"
                      placeholder="(555) 000-0000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">City</label>
                    <input
                      maxLength={100}
                      value={form.city}
                      onChange={(e) => update("city", e.target.value)}
                      className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm text-foreground"
                      placeholder="Roswell, GA"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Service Type</label>
                    <select
                      value={form.service}
                      onChange={(e) => update("service", e.target.value)}
                      className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm text-foreground"
                    >
                      <option value="">Select a service...</option>
                      <option value="Deck Installation">Deck Installation</option>
                      <option value="Deck Repair">Deck Repair</option>
                      <option value="Composite Decking">Composite Decking</option>
                      <option value="Pergolas & Patios">Pergolas & Patios</option>
                      <option value="Porches">Porches</option>
                      <option value="Outdoor Kitchens">Outdoor Kitchens</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Budget Range</label>
                    <select
                      value={form.budget}
                      onChange={(e) => update("budget", e.target.value)}
                      className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm text-foreground"
                    >
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
                  <textarea
                    required
                    maxLength={1000}
                    rows={4}
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm text-foreground resize-none"
                    placeholder="Describe your project, goals, timeline, or any questions..."
                  />
                </div>
                <Button type="submit" size="lg" className="bg-primary text-primary-foreground hover:bg-forest-dark font-semibold px-8">
                  Submit Request
                </Button>
              </form>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-card rounded-lg border border-border p-6">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-4">Contact Info</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3 text-sm text-foreground/80">
                    <Phone className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                    <a href={`tel:${COMPANY.phone}`} className="hover:text-primary transition-colors">{COMPANY.phoneDisplay}</a>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-foreground/80">
                    <Mail className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                    <a href={`mailto:${COMPANY.email}`} className="hover:text-primary transition-colors">{COMPANY.email}</a>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-foreground/80">
                    <MapPin className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                    <span>{COMPANY.address}<br />{COMPANY.city}, {COMPANY.state} {COMPANY.zip}</span>
                  </li>
                </ul>
              </div>
              <div className="bg-primary/5 rounded-lg border border-primary/20 p-6">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">What Happens Next?</h3>
                <ol className="space-y-3 text-sm text-foreground/80">
                  <li className="flex gap-3">
                    <span className="h-6 w-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shrink-0">1</span>
                    We review your project details within 24 hours.
                  </li>
                  <li className="flex gap-3">
                    <span className="h-6 w-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shrink-0">2</span>
                    We schedule a free on-site visit at your convenience.
                  </li>
                  <li className="flex gap-3">
                    <span className="h-6 w-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shrink-0">3</span>
                    You receive a detailed written estimate.
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
