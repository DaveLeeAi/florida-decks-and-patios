import { useParams, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";
import { permitCities } from "@/data/permitRules";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { COMPANY } from "@/data/siteData";
import {
  Phone, ExternalLink, Clock, DollarSign, ShieldAlert, Wind,
  FileText, ClipboardCheck, AlertTriangle, MapPin, ArrowLeft,
} from "lucide-react";
import { generateSlug } from "./PermitsHub";
import { useEffect } from "react";

const requiredDocuments = [
  "Completed building permit application",
  "Site plan / survey showing deck location and setbacks",
  "Construction drawings with dimensions and materials",
  "Engineering plans (if elevated or attached to structure)",
  "Product approval documentation / NOA (if in HVHZ)",
  "Contractor license and insurance verification",
  "HOA approval letter (if applicable)",
  "Flood zone elevation certificate (if in flood zone)",
];

const standardInspections = [
  { name: "Foundation / Footing Inspection", description: "Verify post holes, concrete footings, and anchor bolt placement before pouring or backfilling." },
  { name: "Framing / Structural Inspection", description: "Inspect joists, beams, ledger board connection, and hurricane hardware before decking is installed." },
  { name: "Electrical Rough-In", description: "Required if deck includes lighting, outlets, or fans. Must pass before covering." },
  { name: "Final Inspection", description: "Complete build-out including railings, stairs, and all finishes verified against approved plans." },
];

function JsonLdGovernmentService({ city }: { city: typeof permitCities[0] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "GovernmentService",
    name: `${city.county} Deck Building Permit`,
    serviceType: "Building Permit",
    provider: {
      "@type": "GovernmentOrganization",
      name: city.permitDepartment,
      telephone: city.permitPhone,
      url: city.permitLink,
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: city.county,
      addressRegion: "FL",
      addressCountry: "US",
    },
    description: `Deck and outdoor structure building permit services for ${city.county}, Florida. Processing time: ${city.permitProcessingDays[0]}–${city.permitProcessingDays[1]} business days. Fees: $${city.permitFeeRange[0]}–$${city.permitFeeRange[1]}.`,
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, []);

  return null;
}

export default function PermitCounty() {
  const { countySlug } = useParams<{ countySlug: string }>();
  const city = permitCities.find((c) => generateSlug(c.name) === countySlug);

  if (!city) return <Navigate to="/permits" replace />;

  const feeLabel = city.permitFeeRange[1] > 500 ? "Premium" : city.permitFeeRange[1] > 300 ? "Moderate" : "Budget-Friendly";

  return (
    <Layout>
      <Helmet>
        <title>{city.name} Deck Permit Requirements – {city.county}, FL</title>
        <meta name="description" content={`Deck permit fees, turnaround times, required documents, and inspection details for ${city.county}, Florida. ${city.isHVHZ ? "HVHZ zone — NOA-approved materials required." : ""}`} />
        <link rel="canonical" href={`https://florida-decks-and-patios.lovable.app/permits/${countySlug}`} />
      </Helmet>
      <JsonLdGovernmentService city={city} />

      {/* Hero */}
      <section className="bg-gradient-to-b from-primary/10 to-background py-14 md:py-20">
        <div className="max-w-5xl mx-auto px-4">
          <Link to="/permits" className="inline-flex items-center gap-1 text-sm text-primary hover:underline mb-4">
            <ArrowLeft className="h-3.5 w-3.5" /> All Counties
          </Link>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">
            {city.name} Deck Permit Requirements
          </h1>
          <p className="text-lg text-muted-foreground">{city.county} · {city.region}</p>
          {city.isHVHZ && (
            <div className="mt-4 inline-flex items-center gap-2 bg-destructive/10 text-destructive font-semibold text-sm px-4 py-2 rounded-lg">
              <ShieldAlert className="h-4 w-4" /> High-Velocity Hurricane Zone (HVHZ) — Stricter Requirements Apply
            </div>
          )}
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-10 space-y-10">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: Clock, label: "Processing Time", value: `${city.permitProcessingDays[0]}–${city.permitProcessingDays[1]} days` },
            { icon: DollarSign, label: "Standard Fee", value: `$${city.permitFeeRange[0]}–$${city.permitFeeRange[1]}` },
            { icon: DollarSign, label: "Complex Fee", value: `$${city.complexPermitFeeRange[0]}–$${city.complexPermitFeeRange[1]}` },
            { icon: Wind, label: "Design Wind Speed", value: city.windSpeed },
          ].map((stat) => (
            <Card key={stat.label} className="border-border/60">
              <CardContent className="p-5 flex items-start gap-3">
                <stat.icon className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground font-medium">{stat.label}</p>
                  <p className="text-base font-bold text-foreground">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Permit Office */}
        <Card className="border-border/60">
          <CardContent className="p-6 space-y-3">
            <h2 className="font-heading text-xl font-bold flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" /> Permit Office Details
            </h2>
            <p className="text-foreground font-medium">{city.permitDepartment}</p>
            <div className="flex flex-wrap gap-4">
              <a href={`tel:${city.permitPhone}`} className="inline-flex items-center gap-2 text-sm text-primary hover:underline">
                <Phone className="h-4 w-4" /> {city.permitPhone}
              </a>
              <a href={city.permitLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-primary hover:underline">
                <ExternalLink className="h-4 w-4" /> Official Website
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Fee Structure */}
        <div>
          <h2 className="font-heading text-xl font-bold mb-4 flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-primary" /> Fee Structure
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Card className="border-border/60">
              <CardContent className="p-5">
                <p className="text-sm text-muted-foreground">Standard Deck Permit</p>
                <p className="text-2xl font-bold text-foreground">${city.permitFeeRange[0]} – ${city.permitFeeRange[1]}</p>
                <p className="text-xs text-muted-foreground mt-1">Ground-level, freestanding, or simple attached decks</p>
              </CardContent>
            </Card>
            <Card className="border-border/60">
              <CardContent className="p-5">
                <p className="text-sm text-muted-foreground">Complex / Elevated Deck Permit</p>
                <p className="text-2xl font-bold text-foreground">${city.complexPermitFeeRange[0]} – ${city.complexPermitFeeRange[1]}</p>
                <p className="text-xs text-muted-foreground mt-1">Multi-level, roofed, electrical, or engineered structures</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Special Notes */}
        {city.specialNotes.length > 0 && (
          <div>
            <h2 className="font-heading text-xl font-bold mb-4 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber" /> County-Specific Requirements
            </h2>
            <ul className="space-y-2">
              {city.specialNotes.map((note, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-foreground bg-muted/50 rounded-lg px-4 py-3">
                  <span className="text-amber font-bold mt-0.5">•</span>
                  {note}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Required Documents */}
        <div>
          <h2 className="font-heading text-xl font-bold mb-4 flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" /> Required Documents
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {requiredDocuments.map((doc, i) => (
              <div key={i} className="flex items-start gap-3 text-sm text-foreground bg-card border border-border/60 rounded-lg px-4 py-3">
                <span className="text-primary font-bold">{i + 1}.</span>
                {doc}
                {i === 4 && !city.isHVHZ && <span className="text-muted-foreground text-xs ml-1">(if applicable)</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Inspections */}
        <div>
          <h2 className="font-heading text-xl font-bold mb-4 flex items-center gap-2">
            <ClipboardCheck className="h-5 w-5 text-primary" /> Required Inspections
          </h2>
          <div className="space-y-3">
            {standardInspections.map((insp, i) => (
              <Card key={i} className="border-border/60">
                <CardContent className="p-4">
                  <p className="font-semibold text-foreground">{i + 1}. {insp.name}</p>
                  <p className="text-sm text-muted-foreground mt-1">{insp.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-8 text-center space-y-4">
            <h2 className="font-heading text-2xl font-bold text-foreground">
              Need Help With Your {city.name} Deck Permit?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Our network of licensed contractors handles the full permitting process in {city.county}. Get matched with a verified builder today.
            </p>
            <Link to="/contact">
              <Button size="lg" className="bg-amber text-charcoal hover:bg-amber-dark font-bold">
                Get a Free Consultation
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
