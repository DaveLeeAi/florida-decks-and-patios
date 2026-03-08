import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";
import { useSiteData } from "@/contexts/SiteDataContext";
import {
  Hammer, Wrench, Layers, FileCheck, TreePine, Home, ChefHat,
  ArrowRight, Waves, Grid3x3, Droplets, Sun, Shield, CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const iconMap: Record<string, React.ReactNode> = {
  Hammer: <Hammer className="h-7 w-7" />,
  Wrench: <Wrench className="h-7 w-7" />,
  Layers: <Layers className="h-7 w-7" />,
  FileCheck: <FileCheck className="h-7 w-7" />,
  TreePine: <TreePine className="h-7 w-7" />,
  Home: <Home className="h-7 w-7" />,
  ChefHat: <ChefHat className="h-7 w-7" />,
  Waves: <Waves className="h-7 w-7" />,
  Grid3x3: <Grid3x3 className="h-7 w-7" />,
};

const featuredProjects = [
  {
    title: "Composite Deck Rebuild in Tampa",
    slug: "tampa-composite-deck-rebuild",
    description: "A complete deck rebuild replacing a deteriorating pressure-treated structure with modern composite decking and aluminum railings.",
    location: "Tampa, FL",
    type: "Deck Installation",
  },
  {
    title: "Miami Pool Deck Renovation",
    slug: "miami-pool-deck-renovation",
    description: "Slip-resistant composite pool deck with drainage-conscious layout and corrosion-resistant hardware for a coastal Miami home.",
    location: "Miami, FL",
    type: "Pool Deck",
  },
  {
    title: "Orlando Paver Patio with Pergola",
    slug: "orlando-paver-patio-pergola",
    description: "A custom paver patio with attached cedar pergola, string lighting, and integrated seating in an Orlando backyard.",
    location: "Orlando, FL",
    type: "Patio & Pergola",
  },
];

const structureComparisons = [
  { name: "Deck", best: "Elevated outdoor living, entertaining, homes with uneven terrain", materials: "Composite, pressure-treated wood, hardwood" },
  { name: "Patio", best: "Ground-level entertaining, dining, low-maintenance outdoor spaces", materials: "Pavers, travertine, stamped concrete, natural stone" },
  { name: "Pergola", best: "Shade, defined outdoor rooms, garden focal points", materials: "Cedar, vinyl, aluminum, pressure-treated wood" },
  { name: "Screened Porch", best: "Bug-free outdoor living, year-round comfort, weather protection", materials: "Aluminum or wood frames with professional-grade screening" },
  { name: "Pool Deck", best: "Poolside lounging, safety-focused surfaces, outdoor entertaining", materials: "Composite, cool-deck surfaces, textured pavers" },
];

const climatePoints = [
  { icon: <Droplets className="h-5 w-5" />, title: "Humidity & Moisture", text: "Florida's year-round humidity above 70% accelerates mold, mildew, and wood decay. Materials like composite decking and sealed pavers resist moisture damage far better than untreated wood." },
  { icon: <Sun className="h-5 w-5" />, title: "UV & Heat Exposure", text: "With a UV index regularly exceeding 10, surfaces fade and degrade faster here than in most states. UV-resistant composite boards and lighter-colored pavers help manage heat retention and fading." },
  { icon: <Droplets className="h-5 w-5" />, title: "Heavy Rain & Drainage", text: "Florida's summer thunderstorms can dump inches of rain in minutes. Proper drainage planning, permeable pavers, and elevated deck framing prevent water pooling and structural damage." },
  { icon: <Shield className="h-5 w-5" />, title: "Coastal Corrosion", text: "Salt air within 15 miles of the coast corrodes standard hardware quickly. Stainless steel and hot-dipped galvanized fasteners, plus corrosion-resistant railing systems, are essential near the water." },
];

export default function Services() {
  const { services } = useSiteData();

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Deck & Patio Services in Florida",
    description: "Custom decks, patios, pergolas, porches, outdoor kitchens, and pool deck services for Florida homeowners.",
    numberOfItems: services.length,
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: s.title,
        description: s.description,
        provider: { "@type": "HomeAndConstructionBusiness", name: "Florida Decks and Patios" },
        areaServed: { "@type": "State", name: "Florida" },
      },
    })),
  };

  return (
    <Layout>
      <Helmet>
        <title>Deck & Patio Services in Florida | Florida Decks and Patios</title>
        <meta name="description" content="Custom deck construction, patio installation, pergolas, screened porches, pool decks, and outdoor kitchens designed for Florida's climate. Explore our full range of outdoor living services." />
        <link rel="canonical" href="https://florida-decks-and-patios.lovable.app/services" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      {/* ── Hero / Intro ── */}
      <section className="section-padding bg-section-alt">
        <div className="container-narrow mx-auto text-center">
          <p className="text-sm font-semibold text-primary tracking-wide uppercase mb-3">Florida Outdoor Living</p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
            Deck &amp; Patio Services in Florida
          </h1>
          <p className="text-primary font-semibold text-lg mb-4">
            Custom decks, patios, pergolas, porches, and outdoor living upgrades designed for Florida homes.
          </p>
          <p className="text-muted-foreground text-base max-w-2xl mx-auto leading-relaxed">
            Florida's outdoor spaces face unique challenges — intense humidity, heavy rain, powerful UV exposure, and coastal salt air.
            Every project we support is planned with these conditions in mind, using materials and construction methods that hold up across Florida's demanding climate.
          </p>
        </div>
      </section>

      {/* ── 9-Card Service Grid ── */}
      <section className="section-padding">
        <div className="container-narrow mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link
                key={service.slug}
                to={`/services/${service.slug}`}
                className="group bg-card rounded-lg border border-border p-7 hover:shadow-xl hover:border-primary/30 transition-all duration-300 flex flex-col"
              >
                <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  {iconMap[service.icon] || <Hammer className="h-7 w-7" />}
                </div>
                <h2 className="font-heading text-lg font-semibold text-foreground mb-2">{service.title}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">{service.description}</p>
                <div className="flex items-center justify-between pt-2 border-t border-border/50">
                  <span className="text-xs font-medium text-muted-foreground">{service.priceRange}</span>
                  <span className="text-sm font-medium text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                    Details <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── How to Choose ── */}
      <section className="section-padding bg-section-alt">
        <div className="container-narrow mx-auto">
          <h2 className="font-heading text-3xl font-bold text-foreground mb-3 text-center">How to Choose the Right Outdoor Structure</h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-8">
            The best outdoor structure depends on your goals — whether you want elevated entertaining, ground-level dining, poolside lounging, or year-round bug-free comfort.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-primary/5">
                  <th className="text-left p-4 font-semibold text-foreground">Structure</th>
                  <th className="text-left p-4 font-semibold text-foreground">Best For</th>
                  <th className="text-left p-4 font-semibold text-foreground hidden md:table-cell">Common Materials</th>
                </tr>
              </thead>
              <tbody>
                {structureComparisons.map((item) => (
                  <tr key={item.name} className="border-t border-border/50">
                    <td className="p-4 font-medium text-foreground whitespace-nowrap">{item.name}</td>
                    <td className="p-4 text-muted-foreground">{item.best}</td>
                    <td className="p-4 text-muted-foreground hidden md:table-cell">{item.materials}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted-foreground mt-4 text-center">
            Not sure which option fits your property? <Link to="/faq" className="text-primary font-medium hover:underline">Read our FAQ</Link> or <Link to="/contact" className="text-primary font-medium hover:underline">request a free consultation</Link>.
          </p>
        </div>
      </section>

      {/* ── Built for Florida Weather ── */}
      <section className="section-padding">
        <div className="container-narrow mx-auto">
          <h2 className="font-heading text-3xl font-bold text-foreground mb-3 text-center">Built for Florida Weather</h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-10">
            Outdoor projects in Florida require more than good design — they need materials and methods that handle the state's unique environmental demands.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {climatePoints.map((point) => (
              <div key={point.title} className="flex gap-4 p-5 bg-card rounded-lg border border-border">
                <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                  {point.icon}
                </div>
                <div>
                  <h3 className="font-heading text-base font-semibold text-foreground mb-1">{point.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{point.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Projects ── */}
      <section className="section-padding bg-section-alt">
        <div className="container-narrow mx-auto">
          <h2 className="font-heading text-3xl font-bold text-foreground mb-3 text-center">See Recent Florida Projects</h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-8">
            Explore real deck, patio, and outdoor living projects completed across Florida.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <Link
                key={project.slug}
                to={`/portfolio/${project.slug}`}
                className="group bg-card rounded-lg border border-border p-6 hover:shadow-lg hover:border-primary/30 transition-all"
              >
                <span className="text-xs font-semibold text-primary uppercase tracking-wide">{project.type}</span>
                <h3 className="font-heading text-lg font-semibold text-foreground mt-2 mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">{project.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{project.location}</span>
                  <span className="text-sm font-medium text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                    View Project <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/portfolio">
              <Button variant="outline" className="font-semibold">
                Browse All Projects <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-padding">
        <div className="container-narrow mx-auto">
          <div className="bg-primary/5 border border-primary/15 rounded-xl p-8 md:p-12 text-center">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-3">Planning an Outdoor Living Project?</h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">
              Whether you're comparing materials, exploring design ideas, or ready to get started, we're here to help you plan the right outdoor structure for your Florida home.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/portfolio">
                <Button variant="outline" size="lg" className="font-bold px-6">
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  View Recent Projects
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" className="bg-amber text-charcoal hover:bg-amber-dark font-bold px-6 shadow-md">
                  Request an Estimate
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
