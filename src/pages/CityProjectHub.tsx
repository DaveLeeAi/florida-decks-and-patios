import { useParams, Navigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";
import { getCityProjectHub, cityProjectHubs } from "@/data/cityProjectHubData";
import { portfolioProjects } from "@/data/portfolioData";
import PortfolioCard from "@/components/PortfolioCard";
import RelatedContent from "@/components/RelatedContent";
import { FAQSchema, LocalBusinessSchema } from "@/components/seo/JsonLdSchema";
import { Button } from "@/components/ui/button";
import { MapPin, Layers, Thermometer, ArrowRight, BookOpen, Wrench } from "lucide-react";

export default function CityProjectHub() {
  const { hubSlug } = useParams<{ hubSlug: string }>();
  const hub = hubSlug ? getCityProjectHub(hubSlug) : undefined;

  if (!hub) return <Navigate to="/portfolio" replace />;

  const cityProjects = portfolioProjects.filter(
    (p) => p.city === hub.portfolioCityFilter
  );

  return (
    <Layout>
      <Helmet>
        <title>{hub.metaTitle}</title>
        <meta name="description" content={hub.metaDescription} />
        <link rel="canonical" href={`https://florida-decks-and-patios.lovable.app/${hub.slug}`} />
      </Helmet>
      <LocalBusinessSchema />

      {/* Hero */}
      <section className="section-padding bg-background border-b border-border">
        <div className="container-narrow mx-auto text-center">
          <div className="flex items-center justify-center gap-2 text-primary text-sm font-medium mb-3">
            <MapPin className="h-4 w-4" />
            <span>{hub.cityName}, Florida</span>
          </div>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {hub.h1}
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
            {hub.intro}
          </p>
        </div>
      </section>

      {/* Featured Portfolio Projects */}
      <section className="section-padding bg-section-alt">
        <div className="container-narrow mx-auto">
          <h2 className="font-heading text-2xl font-bold text-foreground mb-2">
            Featured {hub.cityName} Projects
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl">
            Recent deck, patio, and outdoor living installations completed in the {hub.cityName} area.
          </p>

          {cityProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cityProjects.map((project) => (
                <PortfolioCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="bg-card border border-border rounded-lg p-8 text-center">
              <p className="text-muted-foreground mb-4">
                We're currently adding {hub.cityName}-area projects to our portfolio. In the meantime, browse our full project gallery for inspiration.
              </p>
              <Button asChild variant="outline">
                <Link to="/portfolio">View All Projects</Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Common Outdoor Structure Choices */}
      <section className="section-padding bg-background">
        <div className="container-narrow mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <Layers className="h-6 w-6 text-primary" />
            <h2 className="font-heading text-2xl font-bold text-foreground">
              Popular Outdoor Structures in {hub.cityName}
            </h2>
          </div>
          <p className="text-muted-foreground mb-8 max-w-2xl">
            The most common outdoor living projects homeowners choose in the {hub.cityName} market.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {hub.outdoorChoices.map((choice, i) => (
              <div
                key={i}
                className="bg-card border border-border rounded-lg p-5 hover:border-primary/30 transition-colors"
              >
                <h3 className="font-heading text-base font-semibold text-foreground mb-2">
                  {choice.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {choice.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Climate & Design Considerations */}
      <section className="section-padding bg-section-alt">
        <div className="container-narrow mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <Thermometer className="h-6 w-6 text-primary" />
            <h2 className="font-heading text-2xl font-bold text-foreground">
              {hub.climateDesign.heading}
            </h2>
          </div>
          <ul className="mt-6 space-y-3 max-w-3xl">
            {hub.climateDesign.points.map((point, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 rounded-full bg-primary shrink-0" />
                <span className="text-sm text-muted-foreground leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Internal Links */}
      <section className="section-padding bg-background">
        <div className="container-narrow mx-auto">
          <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
            Explore Our Services & Resources
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <InternalLinkCard
              icon={<Layers className="h-5 w-5 text-primary" />}
              title="Our Services"
              description="Custom deck construction, patio installation, pergolas, and repairs across Florida."
              href="/services"
            />
            <InternalLinkCard
              icon={<Wrench className="h-5 w-5 text-primary" />}
              title="Free Planning Tools"
              description="Cost estimators, permit checkers, and design tools to help plan your project."
              href="/tools"
            />
            <InternalLinkCard
              icon={<BookOpen className="h-5 w-5 text-primary" />}
              title="FAQ & Resources"
              description="Answers to common questions about deck and patio construction in Florida."
              href="/faq"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary/5 border-t border-primary/10">
        <div className="container-narrow mx-auto text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-3">
            {hub.ctaHeadline}
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            {hub.ctaText}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/portfolio">
                View All Projects <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/contact">Get a Free Estimate</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}

function InternalLinkCard({
  icon,
  title,
  description,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      to={href}
      className="flex items-start gap-3 p-4 bg-card border border-border rounded-lg hover:border-primary/30 hover:bg-primary/5 transition-colors group"
    >
      <div className="mt-0.5 shrink-0">{icon}</div>
      <div>
        <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors flex items-center gap-1">
          {title}
          <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
        </p>
        <p className="text-xs text-muted-foreground leading-snug mt-0.5">{description}</p>
      </div>
    </Link>
  );
}
