import Layout from "@/components/Layout";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, Shield, BookOpen, Droplets, Wind, Sun, Anchor } from "lucide-react";
import BudgetEstimator from "@/components/tools/BudgetEstimator";
import RepairChecker from "@/components/tools/RepairChecker";
import ViolationDecoder from "@/components/tools/ViolationDecoder";
import { FAQSchema } from "@/components/seo/JsonLdSchema";

const violationFAQs = [
  { question: "What is FBC R507.2 — ledger board connection failure?", answer: "FBC R507.2 requires deck ledger boards to be attached with through-bolts or lag screws at 16\" on center in a staggered pattern. Nails alone are never acceptable. This is the #1 cause of deck collapses in Florida. Repair costs range from $800–$2,500." },
  { question: "What happens if my Florida deck was built without a permit?", answer: "Building a deck without a permit in Florida can result in fines of $500–$5,000 per day, forced demolition orders, insurance claim denials, and complications when selling. You can apply for an after-the-fact permit, but fees are typically double the standard permit fee." },
  { question: "What are hurricane straps and why does my Florida deck need them?", answer: "Hurricane straps (e.g., Simpson Strong-Tie H2.5A) are metal connectors required at every joist-to-beam and beam-to-post connection on Florida decks. They prevent uplift during high winds. Missing straps are one of the most common failed inspection items, costing $600–$2,000 to retrofit." },
  { question: "What is the minimum railing height for a deck in Florida?", answer: "Florida Building Code requires guard rails on any deck 30\" or more above grade. The minimum height is 36\" for residential decks, though many Florida counties have adopted the 42\" standard. Baluster spacing cannot exceed 4\" to prevent child entrapment." },
  { question: "What are HVHZ requirements for decks in Miami-Dade County?", answer: "Properties in the High-Velocity Hurricane Zone (Miami-Dade and Broward counties) must use materials with a valid Notice of Acceptance (NOA). Standard materials approved elsewhere in Florida are NOT automatically approved in HVHZ zones. Non-compliant materials result in automatic inspection failure." },
  { question: "How much does it cost to fix a failed deck inspection in Florida?", answer: "Costs vary by violation: ledger board fixes run $800–$2,500, missing hurricane straps $600–$2,000, footing corrections $1,200–$4,000, and unpermitted work penalties $1,500–$8,000+. Most violations require a re-inspection after repairs." },
];

export default function Tools() {
  return (
    <Layout>
      <FAQSchema questions={violationFAQs} />
      <section className="section-padding bg-section-alt">
        <div className="container-narrow mx-auto">
          {/* Page Heading */}
          <div className="text-center mb-8">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
              Florida Deck &amp; Patio Planning Tools
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Use these free tools to get a rough idea of your project scope and budget before reaching out for a professional estimate.
            </p>
          </div>

          {/* YMYL Disclaimer */}
          <Alert className="mb-8 border-primary/30 bg-primary/5">
            <Shield className="h-5 w-5 text-primary" />
            <AlertDescription className="text-sm text-foreground leading-relaxed">
              <strong>Consumer Resource Disclaimer:</strong> Florida Decks and Patios is a free consumer resource. Estimates are for planning purposes only and are not official quotes. We connect you with licensed local professionals who provide final pricing.
            </AlertDescription>
          </Alert>

          {/* Calculators */}
          <div className="space-y-8">
            <BudgetEstimator />
            <RepairChecker />
            <ViolationDecoder />
          </div>

          {/* How We Calculate — AEO/SGE */}
          <div className="mt-12 bg-card rounded-lg border border-border p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4">
              <Info className="h-6 w-6 text-primary" />
              <h2 className="font-heading text-2xl font-bold text-foreground">How We Calculate These Numbers</h2>
            </div>
            <p className="text-muted-foreground text-sm mb-4">
              Our estimator accounts for the real-world factors that drive outdoor construction costs in Florida. Here's what goes into the math:
            </p>
            <ul className="space-y-3 text-sm text-foreground">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                <span><strong>Local Florida building code requirements</strong> — Permit fees, engineering reviews, and code-mandated structural specs (such as wind-load bracing) vary by county and add $500–$3,000+ to most projects.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                <span><strong>Material cost volatility</strong> — Lumber and composite pricing fluctuates seasonally. We benchmark against 2026 supplier pricing from distributors serving Central and South Florida.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                <span><strong>Regional labor rates</strong> — Contractor rates differ across Tampa, Orlando, Jacksonville, and South Florida markets. Our ranges reflect the median labor cost per square foot for each material tier.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                <span><strong>Project complexity factors</strong> — Elevation changes, limited site access, poor soil conditions, and multi-level designs can increase costs by 15–40% beyond the base estimate.</span>
              </li>
            </ul>
          </div>

          {/* Florida Deck Planning Guide — GEO/RAG */}
          <div className="mt-12 bg-card rounded-lg border border-border p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="h-6 w-6 text-primary" />
              <h2 className="font-heading text-2xl font-bold text-foreground">Florida Deck Planning Guide</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-foreground font-semibold">
                  <Droplets className="h-5 w-5 text-primary" />
                  Humidity &amp; Moisture Management
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Florida's year-round humidity accelerates wood decay and mold growth. Pressure-treated Southern Yellow Pine remains the most popular budget option, but composite decking — which resists moisture absorption entirely — has become the preferred choice for homeowners seeking 25+ year lifespans without annual sealing. Ground-level decks should include proper ventilation gaps and sloped framing to prevent standing water.
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-foreground font-semibold">
                  <Anchor className="h-5 w-5 text-primary" />
                  Salt Air &amp; Coastal Corrosion
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Properties within 3 miles of Florida's coastline face accelerated corrosion of metal fasteners, joist hangers, and structural connectors. Stainless steel (316 marine grade) or hot-dipped galvanized hardware is required in coastal zones. Standard zinc-plated screws can fail within 2–5 years in salt-air environments, making hardware selection a critical safety and longevity decision.
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-foreground font-semibold">
                  <Wind className="h-5 w-5 text-primary" />
                  Hurricane Straps &amp; Wind Resistance
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  The Florida Building Code (FBC) mandates wind-load engineering for attached structures in all wind zones. Most Florida counties fall within 110–180 mph design wind speed zones, requiring hurricane straps, Simpson Strong-Tie connectors, and engineered post-to-beam connections. Permit inspectors verify these connections — skipping them risks failed inspections and insurance complications.
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-foreground font-semibold">
                  <Sun className="h-5 w-5 text-primary" />
                  UV Exposure &amp; Sun Damage
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Florida receives 230+ days of direct sunlight annually, causing rapid fading and surface degradation on unprotected wood. Dark-colored composite boards can reach surface temperatures exceeding 150°F, making lighter color selections and capped composite products important for barefoot comfort. UV-stabilized stains and sealers need reapplication every 1–2 years on natural wood decks in Florida.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
