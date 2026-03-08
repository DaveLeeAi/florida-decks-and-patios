import { useParams, Navigate, Link } from "react-router-dom";
import { useEffect } from "react";
import Layout from "@/components/Layout";
import { getCitySeoPage, citySeoPages } from "@/data/citySeoData";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { FAQSchema, LocalBusinessSchema } from "@/components/seo/JsonLdSchema";
import {
  MapPin, ArrowRight, Shield, Sun, Wind, Droplets, AlertTriangle,
  CheckCircle, Wrench, Calculator, FileText, BookOpen, Phone,
} from "lucide-react";
import { COMPANY } from "@/data/siteData";

export default function CitySeoLanding() {
  const { citySlug, serviceSlug } = useParams<{ citySlug: string; serviceSlug?: string }>();
  const city = citySlug ? getCitySeoPage(citySlug) : undefined;

  useEffect(() => {
    if (city) {
      document.title = city.metaTitle;
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute("content", city.metaDescription);
      else {
        const m = document.createElement("meta");
        m.name = "description";
        m.content = city.metaDescription;
        document.head.appendChild(m);
      }
    }
  }, [city]);

  if (!city) return <Navigate to="/" replace />;

  const activeService = serviceSlug
    ? city.services.find((s) => s.slug === serviceSlug)
    : null;

  const serviceLabel = activeService?.serviceLabel || `Deck & Patio Services in ${city.cityName}`;

  const faqQuestions = [
    { question: `Do I need a permit for a deck in ${city.cityName}?`, answer: city.permitNotes.join(" ") },
    { question: `What materials are best for decks in ${city.cityName}?`, answer: city.typicalMaterials.map((m) => `${m.name}: ${m.note}`).join(". ") },
    { question: `What are common deck inspection failures in ${city.cityName}?`, answer: city.commonFailures.map((f) => `${f.issue}: ${f.detail}`).join(". ") },
    { question: `What climate factors affect decks in ${city.cityName}?`, answer: city.climate.summary + " " + city.climate.considerations.join(". ") },
  ];

  const otherCities = citySeoPages.filter((c) => c.citySlug !== city.citySlug);

  return (
    <Layout>
      <FAQSchema questions={faqQuestions} />
      <LocalBusinessSchema />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary to-primary/80 text-primary-foreground section-padding pt-32 md:pt-40">
        <div className="container-narrow mx-auto">
          <div className="flex items-center gap-2 text-primary-foreground/70 text-sm mb-4">
            <MapPin className="h-4 w-4" />
            <span>{city.county} · {city.state}</span>
          </div>
          <h1 className="font-heading text-3xl md:text-5xl font-bold leading-tight mb-4">
            {activeService ? serviceLabel : city.heroHeadline}
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/85 max-w-2xl mb-8">{city.heroSubheadline}</p>
          <div className="flex flex-wrap gap-3">
            <Link to="/contact">
              <Button size="lg" className="bg-amber text-charcoal hover:bg-amber-dark font-bold shadow-lg">
                Get a Free {city.cityName} Estimate
              </Button>
            </Link>
            <Link to="/tools">
              <Button size="lg" className="bg-transparent border-2 border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 font-semibold">
                <Calculator className="h-4 w-4 mr-2" />Use Our Planning Tools
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-section-alt">
        <div className="container-narrow mx-auto">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">
            Our Services in {city.cityName}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {city.services.map((svc) => (
              <Link
                key={svc.slug}
                to={`/city/${city.citySlug}/${svc.slug}`}
                className={`group p-5 rounded-xl border transition-all ${
                  activeService?.slug === svc.slug
                    ? "border-primary bg-primary/5 shadow-md"
                    : "border-border bg-card hover:border-primary/30 hover:shadow-md"
                }`}
              >
                <Wrench className="h-5 w-5 text-primary mb-2" />
                <h3 className="font-heading font-semibold text-foreground text-sm group-hover:text-primary transition-colors">{svc.serviceLabel}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Climate */}
      <section className="section-padding bg-background">
        <div className="container-narrow mx-auto">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">
            How {city.cityName}'s Climate Affects Your Deck
          </h2>
          <p className="text-muted-foreground mb-6">{city.climate.summary}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {city.climate.considerations.map((c, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-lg border border-border bg-card">
                {i === 0 ? <Droplets className="h-5 w-5 text-primary shrink-0 mt-0.5" /> :
                 i === 1 ? <Wind className="h-5 w-5 text-primary shrink-0 mt-0.5" /> :
                 i === 2 ? <Sun className="h-5 w-5 text-primary shrink-0 mt-0.5" /> :
                 <Shield className="h-5 w-5 text-primary shrink-0 mt-0.5" />}
                <p className="text-sm text-foreground">{c}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Permit Notes */}
      <section className="section-padding bg-section-alt">
        <div className="container-narrow mx-auto">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">
            <FileText className="inline h-6 w-6 text-primary mr-2" />
            {city.cityName} Permit Requirements
          </h2>
          <div className="space-y-3">
            {city.permitNotes.map((note, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-card border border-border">
                <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <p className="text-sm text-foreground">{note}</p>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Link to="/tools" className="text-sm text-primary font-medium hover:text-primary/80 flex items-center gap-1">
              Use our Permit Requirement Checker <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Materials */}
      <section className="section-padding bg-background">
        <div className="container-narrow mx-auto">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">
            Recommended Materials for {city.cityName}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {city.typicalMaterials.map((m, i) => (
              <div key={i} className="p-5 rounded-xl border border-border bg-card">
                <h3 className="font-heading font-semibold text-foreground text-base mb-1">{m.name}</h3>
                <p className="text-sm text-muted-foreground">{m.note}</p>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Link to="/tools#budget" className="text-sm text-primary font-medium hover:text-primary/80 flex items-center gap-1">
              Estimate your material costs <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Common Inspection Failures */}
      <section className="section-padding bg-section-alt">
        <div className="container-narrow mx-auto">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">
            <AlertTriangle className="inline h-6 w-6 text-destructive mr-2" />
            Common Inspection Failures in {city.cityName}
          </h2>
          <div className="space-y-4">
            {city.commonFailures.map((f, i) => (
              <div key={i} className="p-5 rounded-xl border border-border bg-card">
                <h3 className="font-heading font-semibold text-foreground text-base mb-1">{f.issue}</h3>
                <p className="text-sm text-muted-foreground">{f.detail}</p>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Link to="/tools#violations" className="text-sm text-primary font-medium hover:text-primary/80 flex items-center gap-1">
              Search our Inspection Failure Database <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-background">
        <div className="container-narrow mx-auto">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">
            {city.cityName} Deck Building FAQs
          </h2>
          <div className="space-y-6">
            {faqQuestions.map((faq, i) => (
              <div key={i} className="bg-card rounded-xl border border-border p-6">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{faq.question}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-narrow mx-auto text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">{city.ctaHeadline}</h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">{city.ctaSubheadline}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact">
              <Button size="lg" className="bg-amber text-charcoal hover:bg-amber-dark font-bold shadow-lg">
                Get Your Free Estimate
              </Button>
            </Link>
            <a href={`tel:${COMPANY.phone}`}>
              <Button size="lg" className="bg-transparent border-2 border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 font-semibold">
                <Phone className="h-4 w-4 mr-2" />Call {COMPANY.phoneDisplay}
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Other Cities */}
      <section className="section-padding bg-section-alt">
        <div className="container-narrow mx-auto">
          <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground mb-6">
            We Also Serve These Florida Cities
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {otherCities.map((c) => (
              <Link
                key={c.citySlug}
                to={`/city/${c.citySlug}`}
                className="group bg-card rounded-lg border border-border p-3 hover:border-primary/30 hover:shadow-md transition-all text-center"
              >
                <p className="font-heading font-semibold text-foreground group-hover:text-primary transition-colors text-sm">{c.cityName}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{c.county}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Related Tools */}
      <section className="section-padding bg-background">
        <div className="container-narrow mx-auto">
          <h2 className="font-heading text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />Free Planning Tools
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <Link to="/tools#budget" className="p-4 rounded-lg border border-border bg-card hover:border-primary/30 hover:bg-primary/5 transition-all">
              <Calculator className="h-5 w-5 text-primary mb-2" />
              <p className="text-sm font-semibold text-foreground">Cost Estimator</p>
              <p className="text-xs text-muted-foreground">Get a detailed cost breakdown</p>
            </Link>
            <Link to="/tools#permits" className="p-4 rounded-lg border border-border bg-card hover:border-primary/30 hover:bg-primary/5 transition-all">
              <FileText className="h-5 w-5 text-primary mb-2" />
              <p className="text-sm font-semibold text-foreground">Permit Checker</p>
              <p className="text-xs text-muted-foreground">Check permit requirements</p>
            </Link>
            <Link to="/tools#violations" className="p-4 rounded-lg border border-border bg-card hover:border-primary/30 hover:bg-primary/5 transition-all">
              <AlertTriangle className="h-5 w-5 text-primary mb-2" />
              <p className="text-sm font-semibold text-foreground">Violation Decoder</p>
              <p className="text-xs text-muted-foreground">Decode inspection failures</p>
            </Link>
            <Link to="/tools#repair" className="p-4 rounded-lg border border-border bg-card hover:border-primary/30 hover:bg-primary/5 transition-all">
              <Wrench className="h-5 w-5 text-primary mb-2" />
              <p className="text-sm font-semibold text-foreground">Repair Checker</p>
              <p className="text-xs text-muted-foreground">Repair vs. replace assessment</p>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
