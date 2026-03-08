import Layout from "@/components/Layout";
import { Helmet } from "react-helmet-async";
import { FAQSchema } from "@/components/seo/JsonLdSchema";
import RelatedContent from "@/components/RelatedContent";

const glossaryTerms = [
  { term: "HVHZ (High-Velocity Hurricane Zone)", definition: "A geographic area designated by the Florida Building Code — covering all of Miami-Dade County and portions of Broward County — where building materials and construction methods must meet enhanced wind-load standards of 175+ MPH. All deck materials in HVHZ zones must carry a valid Miami-Dade NOA." },
  { term: "NOA (Notice of Acceptance)", definition: "A Miami-Dade County product certification proving a building material has been independently tested and approved for use in the HVHZ. Without a valid NOA number, a material cannot be used in Miami-Dade or HVHZ portions of Broward County. Verify NOA status at the Miami-Dade Product Control Search portal." },
  { term: "FBC (Florida Building Code)", definition: "The statewide building code governing all residential and commercial construction in Florida. The 2026 8th Edition incorporates ASCE 7-22 wind load standards. The FBC is stricter than the International Residential Code (IRC) used in most other states, particularly for wind resistance and coastal construction." },
  { term: "ASCE 7-22", definition: "The American Society of Civil Engineers standard for Minimum Design Loads and Associated Criteria for Buildings and Other Structures. The 2022 edition, adopted into the 2026 FBC, increases design wind speeds by 5–15 MPH in many Florida zip codes compared to the previous code cycle." },
  { term: "NGVD (National Geodetic Vertical Datum)", definition: "A vertical reference system (NGVD 1929) used to measure elevation relative to sea level. Florida is transitioning from NGVD 1929 to NAVD 1988, with a typical difference of 1.0–1.5 feet in the Tampa Bay area. Critical for determining Base Flood Elevation compliance in FEMA flood zones." },
  { term: "BFE (Base Flood Elevation)", definition: "The computed elevation to which floodwater is anticipated to rise during a base flood (1% annual chance flood). In Florida's AE and VE flood zones, deck structures must be elevated to or above BFE as shown on the community's Flood Insurance Rate Map (FIRM)." },
  { term: "TAS 114 (Test Application Standard)", definition: "A Miami-Dade County testing protocol for wind-driven rain resistance. Products installed in HVHZ zones must pass TAS 114 testing to demonstrate they can withstand water infiltration during hurricane-force winds." },
  { term: "Simpson Strong-Tie", definition: "A leading manufacturer of structural connectors, hurricane ties, hold-down brackets, and post bases used in Florida deck construction. Their HD series hold-downs and H2.5A hurricane ties are standard specifications for wind-resistant deck framing in Florida." },
  { term: "Capped Composite Decking", definition: "A decking board made from a composite core (wood fiber + plastic polymer) wrapped in a protective polymer shell (cap). The cap provides UV resistance, mold resistance, and stain protection. In Florida, capped composite is the most popular deck surface material, with a typical lifespan of 25–40 years." },
  { term: "PVC Decking", definition: "A 100% synthetic decking board made from polyvinyl chloride with zero wood fiber content. PVC boards have zero moisture absorption, making them the most moisture-resistant decking option — ideal for Florida's high-humidity environment and pool surrounds." },
  { term: "Ipe (Brazilian Walnut)", definition: "A tropical hardwood from South America with a Janka hardness rating of 3,680 — one of the hardest commercial woods available. Naturally resistant to rot, mold, and insects. In Florida, Ipe decks last 40–75 years. FSC certification should be verified to ensure sustainable sourcing." },
  { term: "Ledger Board", definition: "A horizontal framing member attached directly to the house's band joist or rim joist. The ledger board transfers the deck's weight and wind-load forces to the home's structure. In Florida, ledger board connections must include DTT2Z tension ties and proper flashing to prevent water intrusion." },
  { term: "Hurricane Strap (Hurricane Tie)", definition: "A galvanized or stainless steel connector that physically ties roof or deck framing members together to resist wind uplift forces. In Florida deck construction, hurricane ties (such as Simpson H2.5A) are required at every joist-to-beam connection in most wind zones." },
  { term: "316-Grade Stainless Steel", definition: "A marine-grade stainless steel alloy containing 2–3% molybdenum for enhanced resistance to chloride (salt) corrosion. Mandatory for all deck hardware within 5 miles of Florida's coast. Unlike 304-grade stainless, 316-grade resists tea-staining and pitting in salt-air environments." },
  { term: "Continuous Load Path", definition: "An engineering principle ensuring every structural element in a deck is physically connected to the element above and below it, creating an unbroken chain from deck surface through the structure into the ground. Critical for hurricane resistance — wind uplift forces travel through this chain rather than pulling components apart." },
  { term: "ERU (Equivalent Residential Unit)", definition: "A stormwater billing metric used by many Florida counties. One ERU equals the average impervious surface area of a single-family home (typically 2,500–3,500 sq ft). Stormwater utility fees are charged per ERU. Permeable surfaces and elevated decks may qualify for ERU reductions." },
  { term: "Helical Pier", definition: "A steel shaft with helical plates screwed into the ground to provide foundation support. Used in Florida when sandy soil, high water tables, or sinkhole-prone areas prevent standard concrete footings from reaching stable bearing capacity. Typical cost: $150–$300 per pier." },
  { term: "ACQ (Alkaline Copper Quaternary)", definition: "A wood preservative treatment used in modern pressure-treated lumber, replacing the older CCA (Chromated Copper Arsenate) formulation. In Florida, ACQ-treated lumber loses effectiveness after 8–12 years due to heat and moisture, requiring monitoring for termite and rot vulnerability." },
  { term: "Formosan Subterranean Termite", definition: "An invasive termite species prevalent in Central and South Florida with colonies of 5–10 million individuals. Capable of consuming one foot of 2×4 lumber per month. The primary reason inorganic decking materials (PVC, composite, aluminum) are recommended for Central Florida deck construction." },
  { term: "FSC (Forest Stewardship Council)", definition: "An international nonprofit organization that certifies sustainably managed forests and products made from their timber. Only 15–20% of Ipe sold in the US carries verifiable FSC chain-of-custody certification. Verify at info.fsc.org using the supplier's CoC number." },
];

export default function Glossary() {
  const faqQuestions = glossaryTerms.map((t) => ({
    question: `What is ${t.term.split(" (")[0]}?`,
    answer: t.definition,
  }));

  return (
    <Layout>
      <Helmet>
        <title>Florida Deck & Construction Glossary | 100+ Terms Explained</title>
        <meta name="description" content="Plain-English definitions of Florida deck building terms, permit codes, material names, and construction jargon." />
        <link rel="canonical" href="https://florida-decks-and-patios.lovable.app/glossary" />
      </Helmet>
      <FAQSchema questions={faqQuestions} />

      <section className="section-padding bg-background">
        <div className="container-narrow mx-auto max-w-3xl">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Florida Outdoor Living Glossary
          </h1>
          <p className="text-foreground/80 mb-2">
            <strong>Technical terms used in Florida deck construction, permitting, and coastal building codes.</strong> This glossary defines industry-specific terminology referenced throughout our guides, cost data, and city-specific landing pages.
          </p>
          <p className="text-sm text-muted-foreground mb-10">
            Last updated March 8, 2026 · Verified by FL Licensed Contractor
          </p>

          <dl className="space-y-6">
            {glossaryTerms.map((item) => (
              <div key={item.term} className="border-b border-border pb-5">
                <dt className="font-heading font-semibold text-lg text-foreground mb-1">
                  {item.term}
                </dt>
                <dd className="text-foreground/80 leading-relaxed">
                  {item.definition}
                </dd>
              </div>
            ))}
          </dl>

          <RelatedContent topics={["materials", "hurricanes", "general"]} title="Related Resources" maxLinks={4} className="mt-10" />
        </div>
      </section>
    </Layout>
  );
}
