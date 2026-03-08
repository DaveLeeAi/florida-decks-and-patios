import { useParams, Navigate, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { getCityBySlug, cityPages } from "@/data/cityData";
import { COMPANY } from "@/data/siteData";
import { Button } from "@/components/ui/button";
import { MapPin, ExternalLink, Phone, Shield, Thermometer, Droplets, Wind, Sun, ArrowRight } from "lucide-react";
import HomeValueCalculator from "@/components/city/HomeValueCalculator";
import { FAQSchema, CityServiceSchema, LocalBusinessSchema, HowToSchema } from "@/components/seo/JsonLdSchema";
import { useEffect } from "react";

export default function CityLanding() {
  const { slug } = useParams<{ slug: string }>();
  const city = slug ? getCityBySlug(slug) : undefined;

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

  const faqQuestions = [
    { question: `Do I need a permit for a deck under 100 sq ft in ${city.name}?`, answer: city.faq.permitUnder100 },
    { question: `What is the 2026 average cost per square foot for a composite deck in ${city.name}?`, answer: city.faq.avgCostPerSqFt },
    { question: `How long do wood decks actually last in the Florida sun?`, answer: city.faq.woodDeckLifespan },
  ];

  const otherCities = cityPages.filter((c) => c.slug !== city.slug);

  return (
    <Layout>
      <FAQSchema questions={faqQuestions} />
      <CityServiceSchema cityName={city.name} slug={city.slug} description={city.metaDescription} />
      <LocalBusinessSchema />
      <HowToSchema />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary to-primary/80 text-primary-foreground section-padding pt-32 md:pt-40">
        <div className="container-narrow mx-auto">
          <div className="flex items-center gap-2 text-primary-foreground/70 text-sm mb-4">
            <MapPin className="h-4 w-4" />
            <span>{city.county} · {city.region}</span>
          </div>
          <h1 className="font-heading text-3xl md:text-5xl font-bold leading-tight mb-4">{city.heroHeadline}</h1>
          <p className="text-lg md:text-xl text-primary-foreground/85 max-w-2xl mb-8">{city.heroSubheadline}</p>
          <div className="flex flex-wrap gap-3">
            <Link to="/contact">
              <Button size="lg" className="bg-amber text-charcoal hover:bg-amber-dark font-bold shadow-lg">
                Get a Free {city.name} Estimate
              </Button>
            </Link>
            <a href={city.permitLink} target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-semibold">
                <ExternalLink className="h-4 w-4 mr-2" />
                {city.county} Permits
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Climate Profile */}
      <section className="section-padding bg-section-alt">
        <div className="container-narrow mx-auto">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-8">
            How {city.name}'s Climate Affects Your Deck
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-card rounded-lg p-4 border border-border text-center">
              <Droplets className="h-6 w-6 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium text-foreground">Humidity</p>
              <p className="text-xs text-muted-foreground mt-1">{city.climateProfile.humidity}</p>
            </div>
            <div className="bg-card rounded-lg p-4 border border-border text-center">
              <Sun className="h-6 w-6 text-amber mx-auto mb-2" />
              <p className="text-sm font-medium text-foreground">UV Exposure</p>
              <p className="text-xs text-muted-foreground mt-1">{city.climateProfile.uvIndex}</p>
            </div>
            <div className="bg-card rounded-lg p-4 border border-border text-center">
              <Wind className="h-6 w-6 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium text-foreground">Wind Zone</p>
              <p className="text-xs text-muted-foreground mt-1">{city.climateProfile.hurricaneZone}</p>
            </div>
            <div className="bg-card rounded-lg p-4 border border-border text-center">
              <Thermometer className="h-6 w-6 text-destructive mx-auto mb-2" />
              <p className="text-sm font-medium text-foreground">Salt Air</p>
              <p className="text-xs text-muted-foreground mt-1">{city.climateProfile.saltAir ? "Yes — marine-grade hardware required" : "No — standard hardware OK"}</p>
            </div>
          </div>
          <div className="bg-card rounded-xl border border-border p-6">
            <p className="text-foreground/80 leading-relaxed">{city.climateProfile.climateAdvice}</p>
          </div>
        </div>
      </section>

      {/* Cost Estimates */}
      <section className="section-padding bg-background">
        <div className="container-narrow mx-auto">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-2">
            {city.name} Deck Costs in 2026
          </h2>
          <p className="text-muted-foreground mb-8">Average installed costs for the {city.county} market</p>

          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-muted">
                  <th className="px-4 py-3 text-left font-semibold text-foreground">Material</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">Cost/Sq Ft</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">300 Sq Ft Deck</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">500 Sq Ft Deck</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Pressure-Treated Pine", cost: city.costData.pressureTreatedPerSqFt },
                  { name: "Composite (Mid-Range)", cost: city.costData.compositePerSqFt },
                  { name: "Composite (Premium)", cost: city.costData.premiumCompositePerSqFt },
                ].map((row, i) => {
                  const [low, high] = row.cost.replace(/\$/g, "").split("–").map(Number);
                  return (
                    <tr key={i} className="border-t border-border">
                      <td className="px-4 py-3 font-medium text-foreground">{row.name}</td>
                      <td className="px-4 py-3 text-foreground/80">{row.cost}</td>
                      <td className="px-4 py-3 text-foreground/80">${(low * 300).toLocaleString()}–${(high * 300).toLocaleString()}</td>
                      <td className="px-4 py-3 text-foreground/80">${(low * 500).toLocaleString()}–${(high * 500).toLocaleString()}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-card rounded-lg p-4 border border-border">
              <p className="text-xs text-muted-foreground">Labor Rate</p>
              <p className="font-semibold text-foreground">{city.costData.laborRatePerSqFt}/sq ft</p>
            </div>
            <div className="bg-card rounded-lg p-4 border border-border">
              <p className="text-xs text-muted-foreground">Basic Permit</p>
              <p className="font-semibold text-foreground">{city.costData.permitFeeBasic}</p>
            </div>
            <div className="bg-card rounded-lg p-4 border border-border">
              <p className="text-xs text-muted-foreground">Complex Permit</p>
              <p className="font-semibold text-foreground">{city.costData.permitFeeComplex}</p>
            </div>
            <div className="bg-card rounded-lg p-4 border border-border">
              <p className="text-xs text-muted-foreground">Engineering</p>
              <p className="font-semibold text-foreground text-xs">{city.costData.engineeringRequired}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Material Durability Report */}
      <section className="section-padding bg-section-alt">
        <div className="container-narrow mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Shield className="h-6 w-6 text-primary" />
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
              Material Durability Report: {city.name}
            </h2>
          </div>
          <p className="text-muted-foreground mb-6">How different materials perform in {city.name}'s specific climate conditions</p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-muted">
                  <th className="px-4 py-3 text-left font-semibold text-foreground">Material</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">Expected Lifespan</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">Maintenance Hours/Year</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">Salt Resistance</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">Recommendation</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Pressure-Treated Pine", ...city.materialDurability.pressureTreated, salt: city.climateProfile.saltAir ? "Poor" : "N/A", rec: city.climateProfile.saltAir ? "Not recommended" : "Budget option" },
                  { name: "Capped Composite", ...city.materialDurability.composite, salt: "Good", rec: "Best all-around" },
                  { name: "PVC Decking", ...city.materialDurability.pvc, salt: "Excellent", rec: city.climateProfile.saltAir ? "Top pick for coastal" : "Premium option" },
                  { name: "Ipe Hardwood", ...city.materialDurability.ipe, salt: "Good", rec: "Luxury pick" },
                ].map((row, i) => (
                  <tr key={i} className="border-t border-border">
                    <td className="px-4 py-3 font-medium text-foreground">{row.name}</td>
                    <td className="px-4 py-3 text-foreground/80">{row.lifespan}</td>
                    <td className="px-4 py-3 text-foreground/80">{row.maintenanceHours}</td>
                    <td className="px-4 py-3 text-foreground/80">{row.salt}</td>
                    <td className="px-4 py-3 text-foreground/80">{row.rec}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Expert Answers (FAQ / AEO) */}
      <section className="section-padding bg-background">
        <div className="container-narrow mx-auto">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-8">
            Expert Answers: {city.name} Deck Building
          </h2>
          <div className="space-y-8">
            {faqQuestions.map((faq, i) => (
              <div key={i} className="bg-card rounded-xl border border-border p-6 md:p-8">
                <h3 className="font-heading text-lg md:text-xl font-semibold text-foreground mb-3">{faq.question}</h3>
                <p className="text-foreground/80 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Home Value Calculator */}
      <section className="section-padding bg-section-alt">
        <div className="container-narrow mx-auto max-w-2xl">
          <HomeValueCalculator city={city} />
        </div>
      </section>

      {/* Unique City Content / Knowledge Cluster */}
      <section className="section-padding bg-background">
        <div className="container-narrow mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-2">
            Why {city.name} Is a "{city.knowledgeCluster}" Market
          </h2>
          <p className="text-muted-foreground mb-6">{city.realEstate.marketTrend}</p>
          <div className="prose max-w-none">
            {city.uniqueContent.split("\n\n").map((block, i) => {
              if (block.startsWith("- ")) {
                return (
                  <ul key={i} className="space-y-2 mb-6 ml-4">
                    {block.split("\n").map((line, j) => (
                      <li key={j} className="text-foreground/80 list-disc" dangerouslySetInnerHTML={{ __html: line.replace(/^- /, "").replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }} />
                    ))}
                  </ul>
                );
              }
              return <p key={i} className="text-foreground/80 leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: block.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }} />;
            })}
          </div>
        </div>
      </section>

      {/* Permit Info */}
      <section className="section-padding bg-section-alt">
        <div className="container-narrow mx-auto">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">
            {city.county} Permit Information
          </h2>
          <div className="bg-card rounded-xl border border-border p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Department</p>
                <p className="font-semibold text-foreground">{city.permitDepartment}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Phone</p>
                <a href={`tel:${city.permitPhone}`} className="font-semibold text-primary hover:underline flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  {city.permitPhone}
                </a>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Online Portal</p>
                <a href={city.permitLink} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:underline flex items-center gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Apply Online
                </a>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">We handle everything:</strong> Florida Decks and Patios manages all permitting, plan submissions, inspections, and HOA coordination for every {city.name} project at no additional charge.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-narrow mx-auto text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">
            Ready to Build Your {city.name} Deck?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Get a free consultation and detailed estimate for your {city.county} project. We handle permits, HOA approvals, and build to Florida Building Code standards.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact">
              <Button size="lg" className="bg-amber text-charcoal hover:bg-amber-dark font-bold shadow-lg">
                Get Your Free Estimate
              </Button>
            </Link>
            <a href={`tel:${COMPANY.phone}`}>
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-semibold">
                <Phone className="h-4 w-4 mr-2" />
                Call {COMPANY.phoneDisplay}
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Other Cities */}
      <section className="section-padding bg-background">
        <div className="container-narrow mx-auto">
          <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground mb-6">
            We Also Serve These Florida Areas
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {otherCities.map((c) => (
              <Link
                key={c.slug}
                to={`/${c.slug}`}
                className="group bg-card rounded-lg border border-border p-4 hover:border-primary/30 hover:shadow-md transition-all"
              >
                <p className="font-heading font-semibold text-foreground group-hover:text-primary transition-colors text-sm">{c.name}</p>
                <p className="text-xs text-muted-foreground mt-1">{c.tagline}</p>
                <span className="text-xs text-primary font-medium flex items-center gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  View <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
