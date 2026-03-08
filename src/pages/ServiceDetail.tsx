import { useParams, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";
import { useSiteData } from "@/contexts/SiteDataContext";
import { ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { services, company, settings } = useSiteData();
  const service = services.find((s) => s.slug === slug);

  if (!service) return <Navigate to="/services" replace />;

  return (
    <Layout>
      <Helmet>
        <title>{service.title} in Florida | Florida Decks and Patios</title>
        <meta name="description" content={service.description + " Serving all of Florida. Free estimates."} />
        <link rel="canonical" href={"https://florida-decks-and-patios.lovable.app/services/" + service.slug} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.title,
          description: service.description,
          provider: { "@type": "LocalBusiness", name: company.name },
          areaServed: { "@type": "State", name: "Florida" },
        })}</script>
      </Helmet>

      <section className="section-padding bg-background">
        <div className="container-narrow mx-auto max-w-3xl">
          <Link to="/services" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
            <ArrowLeft className="h-4 w-4" /> Back to Services
          </Link>

          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">{service.title}</h1>
          <p className="text-lg text-muted-foreground mb-6">{service.description}</p>

          {service.priceRange && (
            <div className="inline-block bg-primary/10 text-primary font-medium text-sm px-4 py-2 rounded-md mb-8">
              Typical Range: {service.priceRange}
            </div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
            {service.features.map((f) => (
              <div key={f} className="flex items-center gap-2 text-sm text-foreground">
                <Check className="h-4 w-4 text-primary shrink-0" /> {f}
              </div>
            ))}
          </div>

          <div className="prose prose-slate max-w-none">
            {service.longDescription.split("\n\n").map((para, i) => {
              if (para.startsWith("**") && para.endsWith("**")) {
                return <h3 key={i} className="font-heading text-xl font-semibold text-foreground mt-8 mb-3">{para.replace(/\*\*/g, "")}</h3>;
              }
              if (para.startsWith("- ")) {
                return (
                  <ul key={i} className="space-y-2 mb-6">
                    {para.split("\n").map((line, j) => (
                      <li key={j} className="flex items-start gap-2 text-foreground/80">
                        <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>{line.replace(/^- /, "")}</span>
                      </li>
                    ))}
                  </ul>
                );
              }
              return <p key={i} className="text-foreground/80 leading-relaxed mb-4">{para}</p>;
            })}
          </div>

          <div className="mt-12 p-8 rounded-lg bg-primary/5 border border-primary/20 text-center">
            <h3 className="font-heading text-xl font-semibold text-foreground mb-2">Interested in {service.shortTitle}?</h3>
            <p className="text-muted-foreground mb-4">Get a free, no-obligation estimate for your project.</p>
            <Link to={settings.ctaLink}>
              <Button className="bg-primary text-primary-foreground hover:bg-forest-dark font-semibold">{settings.ctaText}</Button>
            </Link>
          </div>

          <div className="mt-12">
            <h3 className="font-heading text-lg font-semibold text-foreground mb-4">Other Services</h3>
            <div className="flex flex-wrap gap-2">
              {services.filter((s) => s.slug !== slug).map((s) => (
                <Link key={s.slug} to={`/services/${s.slug}`} className="text-sm bg-muted text-muted-foreground px-3 py-1.5 rounded-md hover:bg-primary/10 hover:text-primary transition-colors">
                  {s.shortTitle}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
