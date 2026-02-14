import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import HeroSlider from "@/components/HeroSlider";
import { services, testimonials, trustBadges, blogPosts, COMPANY } from "@/data/siteData";
import { Shield, Award, FileCheck, Users, Star, ArrowRight, Hammer, Wrench, Layers, TreePine, Home, ChefHat } from "lucide-react";
import { Button } from "@/components/ui/button";

const iconMap: Record<string, React.ReactNode> = {
  Hammer: <Hammer className="h-6 w-6" />,
  Wrench: <Wrench className="h-6 w-6" />,
  Layers: <Layers className="h-6 w-6" />,
  FileCheck: <FileCheck className="h-6 w-6" />,
  TreePine: <TreePine className="h-6 w-6" />,
  Home: <Home className="h-6 w-6" />,
  ChefHat: <ChefHat className="h-6 w-6" />,
};

const trustIconMap: Record<string, React.ReactNode> = {
  Shield: <Shield className="h-8 w-8 text-primary" />,
  Award: <Award className="h-8 w-8 text-primary" />,
  FileCheck: <FileCheck className="h-8 w-8 text-primary" />,
  Users: <Users className="h-8 w-8 text-primary" />,
};

export default function Index() {
  return (
    <Layout>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: COMPANY.name,
            telephone: COMPANY.phone,
            email: COMPANY.email,
            address: {
              "@type": "PostalAddress",
              streetAddress: COMPANY.address,
              addressLocality: COMPANY.city,
              addressRegion: COMPANY.state,
              postalCode: COMPANY.zip,
            },
            description: COMPANY.tagline,
          }),
        }}
      />

      <HeroSlider />

      {/* Services Section */}
      <section className="section-padding bg-background">
        <div className="container-narrow mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Expert Outdoor Building Services
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              From ground-up builds to safety repairs, we provide the craftsmanship and reliability your home deserves.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.slice(0, 4).map((service) => (
              <Link
                key={service.slug}
                to={`/services/${service.slug}`}
                className="group bg-card rounded-lg border border-border p-6 hover:shadow-lg hover:border-primary/30 transition-all duration-300"
              >
                <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  {iconMap[service.icon]}
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{service.shortTitle}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">{service.description.slice(0, 120)}...</p>
                <span className="text-sm font-medium text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                  Learn more <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/services">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold">
                View All Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="section-padding bg-section-alt">
        <div className="container-narrow mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center text-foreground mb-10">
            Why Homeowners Choose Us
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustBadges.map((badge) => (
              <div key={badge.title} className="trust-badge flex-col items-center text-center">
                {trustIconMap[badge.icon]}
                <h3 className="font-heading font-semibold text-foreground mt-3">{badge.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{badge.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-background">
        <div className="container-narrow mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center text-foreground mb-10">
            What Our Clients Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-card rounded-lg border border-border p-6">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-amber text-amber" />
                  ))}
                </div>
                <p className="text-foreground/80 text-sm leading-relaxed mb-4 italic">"{t.text}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-sm text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.location}</p>
                  </div>
                </div>
                <p className="text-[10px] text-muted-foreground/50 mt-2">{t.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Blog Posts */}
      <section className="section-padding bg-section-alt">
        <div className="container-narrow mx-auto">
          <div className="flex items-center justify-between mb-10">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
              From Our Blog
            </h2>
            <Link to="/blog" className="text-primary font-medium hover:text-forest-dark transition-colors flex items-center gap-1">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPosts.slice(0, 3).map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="group bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">{post.category}</span>
                  <h3 className="font-heading text-lg font-semibold text-foreground mt-3 mb-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{post.excerpt.slice(0, 120)}...</p>
                  <p className="text-xs text-muted-foreground mt-3">{new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary">
        <div className="container-narrow mx-auto text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Transform Your Outdoor Space?
          </h2>
          <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto mb-8">
            Get a free, no-obligation estimate for your project. Our team will visit your property, discuss your vision, and provide a detailed proposal.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="bg-amber text-amber-foreground hover:bg-amber-dark font-semibold text-base px-8 h-12">
                Get Free Estimate
              </Button>
            </Link>
            <a href={`tel:${COMPANY.phone}`}>
              <Button size="lg" variant="outline" className="border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 font-semibold text-base px-8 h-12">
                Call {COMPANY.phoneDisplay}
              </Button>
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
