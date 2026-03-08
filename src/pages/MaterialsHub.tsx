import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { useSiteData } from "@/contexts/SiteDataContext";
import { ArrowRight, BookOpen, Wrench, Shield, Droplets, Wind } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FAQSchema } from "@/components/seo/JsonLdSchema";
import { useEffect } from "react";

const MATERIALS_SLUGS = [
  "pressure-treated-vs-composite",
  "trex-vs-timbertech-florida-2026",
  "best-deck-fasteners-florida",
  "wood-vs-aluminum-railing-florida",
  "deck-board-spacing-florida-humidity",
  "coastal-corrosion-resistant-hardware-guide",
  "best-decking-materials-florida-climate",
  "hidden-fastener-systems-modern-deck",
  "eco-friendly-decking-brands-florida-2026",
];

const materialsFAQs = [
  { question: "What is the best decking material for Florida?", answer: "Capped composite decking is the best all-around choice for most Florida homeowners. It resists humidity, mold, UV fading, and salt-air corrosion with minimal maintenance (2–4 hours/year). PVC is best for severe coastal exposure. Pressure-treated pine is the budget option but requires 30–40 hours of annual maintenance." },
  { question: "Is Trex or TimberTech better for Florida?", answer: "Both perform well. Trex wins on price and recycled content (95%). TimberTech wins on premium aesthetics and its 4-sided cap (better moisture protection on cut ends). For most Florida homeowners, Trex Transcend or TimberTech PRO in a lighter color are the best choices." },
  { question: "Do I need stainless steel screws for a Florida deck?", answer: "Within 5 miles of salt water, yes — 316 marine-grade stainless steel is required. Inland Florida can use hot-dipped galvanized or coated fasteners. Standard zinc-plated fasteners should never be used on any Florida deck due to humidity and ACQ-treated lumber chemistry." },
  { question: "How far apart should deck boards be in Florida?", answer: "Florida's heat causes more thermal expansion than northern states. Most composite manufacturers recommend 3/16\" to 1/4\" end-to-end gaps for Florida installations, adjusted based on board temperature at installation time. Standard 1/8\" spacing used up north will cause buckling." },
];

export default function MaterialsHub() {
  const { blogPosts } = useSiteData();

  useEffect(() => {
    document.title = "Deck Materials Knowledge Hub | Florida Decks and Patios";
    const meta = document.querySelector('meta[name="description"]');
    const desc = "Compare deck materials for Florida's climate. Expert guides on composite vs. wood, Trex vs. TimberTech, fasteners, railing, and coastal corrosion-resistant hardware.";
    if (meta) meta.setAttribute("content", desc);
    else {
      const m = document.createElement("meta");
      m.name = "description";
      m.content = desc;
      document.head.appendChild(m);
    }
  }, []);

  const guides = MATERIALS_SLUGS.map((slug) => blogPosts.find((p) => p.slug === slug)).filter(Boolean);

  const featured = guides.slice(0, 3);
  const rest = guides.slice(3);

  return (
    <Layout>
      <FAQSchema questions={materialsFAQs} />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary to-primary/80 text-primary-foreground section-padding pt-32 md:pt-40">
        <div className="container-narrow mx-auto">
          <div className="flex items-center gap-2 text-primary-foreground/70 text-sm mb-4">
            <BookOpen className="h-4 w-4" />
            <span>Knowledge Hub</span>
          </div>
          <h1 className="font-heading text-3xl md:text-5xl font-bold leading-tight mb-4">
            Deck Materials Knowledge Hub
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/85 max-w-2xl mb-8">
            Expert comparisons and guides for choosing the right materials for Florida's demanding climate — humidity, salt air, UV, and hurricane winds.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/tools#budget">
              <Button size="lg" className="bg-amber text-charcoal hover:bg-amber-dark font-bold shadow-lg">
                <Wrench className="h-4 w-4 mr-2" />Estimate Your Material Costs
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="section-padding bg-section-alt">
        <div className="container-narrow mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              { icon: Droplets, label: "Moisture Resistance", link: "#guides" },
              { icon: Wind, label: "Salt Air & Coastal", link: "#guides" },
              { icon: Shield, label: "Fasteners & Hardware", link: "#guides" },
              { icon: Wrench, label: "Installation Tips", link: "#guides" },
            ].map((item, i) => (
              <a key={i} href={item.link} className="flex flex-col items-center gap-2 p-4 rounded-xl border border-border bg-card hover:border-primary/30 hover:shadow-md transition-all text-center">
                <item.icon className="h-6 w-6 text-primary" />
                <span className="text-sm font-semibold text-foreground">{item.label}</span>
              </a>
            ))}
          </div>

          {/* Featured Guides */}
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">Featured Comparisons</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {featured.map((post: any) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="group bg-card rounded-xl border border-border p-6 hover:border-primary/30 hover:shadow-lg transition-all"
              >
                <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">{post.category}</span>
                <h3 className="font-heading font-bold text-foreground text-base mt-3 mb-2 group-hover:text-primary transition-colors leading-tight">{post.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">{post.excerpt}</p>
                <span className="text-sm text-primary font-medium flex items-center gap-1 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  Read Guide <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>

          {/* All Guides */}
          <div id="guides">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-6">All Material Guides</h2>
            <div className="space-y-4">
              {rest.map((post: any) => (
                <Link
                  key={post.slug}
                  to={`/blog/${post.slug}`}
                  className="group flex items-start gap-4 p-5 rounded-xl border border-border bg-card hover:border-primary/30 hover:shadow-md transition-all"
                >
                  <BookOpen className="h-5 w-5 text-primary shrink-0 mt-1" />
                  <div>
                    <span className="text-xs font-medium text-primary">{post.category}</span>
                    <h3 className="font-heading font-semibold text-foreground text-sm mt-1 group-hover:text-primary transition-colors">{post.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{post.excerpt}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0 mt-1 group-hover:text-primary transition-colors" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-background">
        <div className="container-narrow mx-auto">
          <h2 className="font-heading text-2xl font-bold text-foreground mb-6">Material FAQs</h2>
          <div className="space-y-6">
            {materialsFAQs.map((faq, i) => (
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
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">Need Help Choosing Materials?</h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Get a free material consultation — we'll recommend the right products for your specific Florida location and budget.
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-amber text-charcoal hover:bg-amber-dark font-bold shadow-lg">
              Get Free Material Consultation <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Related Tools */}
      <section className="section-padding bg-section-alt">
        <div className="container-narrow mx-auto">
          <h2 className="font-heading text-xl font-bold text-foreground mb-4">Related Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link to="/tools#budget" className="p-4 rounded-lg border border-border bg-card hover:border-primary/30 hover:bg-primary/5 transition-all">
              <Wrench className="h-5 w-5 text-primary mb-2" />
              <p className="text-sm font-semibold text-foreground">Cost Estimator</p>
              <p className="text-xs text-muted-foreground">See how materials affect total cost</p>
            </Link>
            <Link to="/tools#violations" className="p-4 rounded-lg border border-border bg-card hover:border-primary/30 hover:bg-primary/5 transition-all">
              <Shield className="h-5 w-5 text-primary mb-2" />
              <p className="text-sm font-semibold text-foreground">Violation Decoder</p>
              <p className="text-xs text-muted-foreground">Decode material-related failures</p>
            </Link>
            <Link to="/blog/hurricane-resistant-deck-design-florida" className="p-4 rounded-lg border border-border bg-card hover:border-primary/30 hover:bg-primary/5 transition-all">
              <Wind className="h-5 w-5 text-primary mb-2" />
              <p className="text-sm font-semibold text-foreground">Hurricane Guide</p>
              <p className="text-xs text-muted-foreground">Wind-rated hardware requirements</p>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
