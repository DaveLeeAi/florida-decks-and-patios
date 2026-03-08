import { useParams, Link, Navigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { portfolioProjects } from "@/data/portfolioData";
import { MapPin, Ruler, Layers, Clock, DollarSign, ArrowLeft, ArrowRight, Wrench, Shield, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { X, ZoomIn } from "lucide-react";
import { Helmet } from "react-helmet-async";

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = portfolioProjects.find(p => p.slug === slug);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  if (!project) return <Navigate to="/portfolio" replace />;

  const cityDisplay = project.city === "Other Florida" ? "Gainesville" : project.city;

  const similar = portfolioProjects
    .filter(p => p.id !== project.id && (p.city === project.city || p.projectType === project.projectType))
    .slice(0, 3);

  const heroImage = project.afterImage;

  return (
    <Layout>
      <Helmet>
        <title>{project.title} | Florida Decks and Patios Portfolio</title>
        <meta name="description" content={`${project.title} — ${project.description.slice(0, 140)}...`} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": project.title,
          "description": project.description,
          "image": project.afterImage,
          "author": { "@type": "Organization", "name": "Florida Decks and Patios" },
        })}</script>
      </Helmet>

      {/* Breadcrumb */}
      <section className="bg-section-alt border-b border-border">
        <div className="container-narrow mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/portfolio" className="hover:text-primary transition-colors flex items-center gap-1">
              <ArrowLeft className="h-3.5 w-3.5" /> Portfolio
            </Link>
            <span>/</span>
            <span className="text-foreground font-medium truncate">{project.title}</span>
          </div>
        </div>
      </section>

      {/* Hero */}
      <section className="section-padding bg-background">
        <div className="container-narrow mx-auto">
          <div className="mb-6">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">{project.projectType}</Badge>
              <Badge variant="outline">{project.materials}</Badge>
            </div>
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3">
              {project.title}
            </h1>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <MapPin className="h-4 w-4 text-primary" />
              <span>{cityDisplay}, Florida</span>
            </div>
          </div>

          {/* Hero Image */}
          <button
            onClick={() => setLightboxImg(heroImage)}
            className="group relative w-full aspect-[16/9] rounded-lg overflow-hidden border border-border"
          >
            <img
              src={heroImage}
              alt={`${project.title} — completed project in ${cityDisplay}, Florida`}
              className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
              width={1200}
              height={675}
            />
            <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors flex items-center justify-center">
              <ZoomIn className="h-8 w-8 text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" />
            </div>
            <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-card/80 backdrop-blur-sm text-foreground text-xs font-medium px-3 py-1.5 rounded-md">
              <MapPin className="h-3.5 w-3.5 text-primary" />
              {cityDisplay}, FL · {project.materials}
            </div>
          </button>
        </div>
      </section>

      {/* Project Overview */}
      <section className="section-padding bg-section-alt">
        <div className="container-narrow mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <OverviewCard icon={Ruler} label="Deck Size" value={project.deckSize} />
            <OverviewCard icon={Layers} label="Materials" value={project.materials} />
            <OverviewCard icon={Clock} label="Duration" value={project.duration} />
            <OverviewCard icon={DollarSign} label="Budget Range" value={project.budgetRange} />
          </div>

          <p className="text-foreground/90 text-lg leading-relaxed max-w-3xl">
            {project.description}
          </p>
        </div>
      </section>

      {/* Problem & Solution */}
      <section className="section-padding bg-background">
        <div className="container-narrow mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-destructive/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-10 w-10 rounded-full bg-destructive/10 flex items-center justify-center">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                  </div>
                  <h2 className="font-heading text-xl font-bold text-foreground">The Problem</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">{project.problem}</p>
              </CardContent>
            </Card>

            <Card className="border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Wrench className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="font-heading text-xl font-bold text-foreground">The Solution</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">{project.solution}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Inspection Insights */}
      <section className="section-padding bg-section-alt">
        <div className="container-narrow mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <Shield className="h-6 w-6 text-primary" />
            <h2 className="font-heading text-2xl font-bold text-foreground">Inspection Insights</h2>
          </div>
          <p className="text-muted-foreground mb-6 max-w-2xl">
            Key inspection issues identified and corrected during this project, ensuring full Florida Building Code compliance.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {project.inspectionInsights.map((insight, i) => (
              <div key={i} className="flex items-start gap-3 bg-card p-4 rounded-lg border border-border">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-foreground/90">{insight}</span>
              </div>
            ))}
          </div>
          <Link to="/tools" className="text-primary text-sm font-medium hover:underline flex items-center gap-1">
            Use our Inspection Failure Decoder tool <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>

      {/* Gallery placeholder — hidden until verified project images are available */}
      {/* 
      <section className="section-padding bg-background">
        <div className="container-narrow mx-auto">
          <h2 className="font-heading text-2xl font-bold text-foreground mb-6">Project Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {project.galleryImages.map((img, i) => (
              <button key={i} onClick={() => setLightboxImg(img)} className="group relative aspect-[4/3] rounded-lg overflow-hidden border border-border">
                <img src={img} alt={`${project.title} photo ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
              </button>
            ))}
          </div>
        </div>
      </section>
      */}

      {/* Related Tools */}
      <section className="section-padding bg-background">
        <div className="container-narrow mx-auto">
          <h2 className="font-heading text-2xl font-bold text-foreground mb-2">Planning a Similar Project?</h2>
          <p className="text-muted-foreground mb-6">Use our free tools to estimate costs, check permits, and review common inspection issues.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <ToolLink to="/tools" icon={DollarSign} label="Estimate Your Deck Cost" desc="Get an instant cost estimate based on size, materials, and location." />
            <ToolLink to="/tools" icon={Shield} label="Check Permit Requirements" desc="See what permits your Florida county requires for your project." />
            <ToolLink to="/tools" icon={AlertTriangle} label="Review Inspection Issues" desc="Decode common inspection failures and learn how to fix them." />
          </div>
        </div>
      </section>

      {/* Similar Projects */}
      {similar.length > 0 && (
        <section className="section-padding bg-section-alt">
          <div className="container-narrow mx-auto">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-6">Similar Projects</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {similar.map(p => (
                <Link key={p.id} to={`/portfolio/${p.slug}`} className="group bg-card rounded-lg border border-border overflow-hidden hover:shadow-md transition-all">
                  <div className="h-40 overflow-hidden">
                    <img src={p.afterImage} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-heading text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{p.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{p.city === "Other Florida" ? "Gainesville" : p.city}, FL · {p.materials}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-narrow mx-auto text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Interested in a Similar {project.projectType} Project?
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-6 max-w-2xl mx-auto">
            Get a free, no-obligation estimate for your {project.projectType.toLowerCase()} project in {cityDisplay === "Gainesville" ? "Florida" : cityDisplay}.
          </p>
          <Link to="/contact">
            <Button size="lg" variant="secondary" className="text-base px-8">
              Request Deck Estimate
            </Button>
          </Link>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxImg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/80 backdrop-blur-sm" onClick={() => setLightboxImg(null)}>
          <div className="relative max-w-4xl w-full animate-fade-in" onClick={e => e.stopPropagation()}>
            <button onClick={() => setLightboxImg(null)} className="absolute -top-10 right-0 text-primary-foreground/80 hover:text-primary-foreground">
              <X className="h-6 w-6" />
            </button>
            <img src={lightboxImg} alt="Project photo" className="w-full max-h-[80vh] object-contain rounded-lg" />
          </div>
        </div>
      )}
    </Layout>
  );
}

function OverviewCard({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="bg-card border border-border rounded-lg p-4 text-center">
      <Icon className="h-5 w-5 text-primary mx-auto mb-2" />
      <p className="text-xs text-muted-foreground mb-0.5">{label}</p>
      <p className="text-sm font-semibold text-foreground">{value}</p>
    </div>
  );
}

function ToolLink({ to, icon: Icon, label, desc }: { to: string; icon: any; label: string; desc: string }) {
  return (
    <Link to={to} className="bg-card border border-border rounded-lg p-5 hover:border-primary/30 hover:shadow-sm transition-all group">
      <Icon className="h-6 w-6 text-primary mb-3" />
      <h3 className="font-heading text-sm font-semibold text-foreground group-hover:text-primary transition-colors mb-1">{label}</h3>
      <p className="text-xs text-muted-foreground">{desc}</p>
    </Link>
  );
}
