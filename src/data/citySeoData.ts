// ═══════════════════════════════════════════════════════════════
// City SEO Landing Page Data — 10 Target Cities
// Expandable: add new cities by appending to the array
// ═══════════════════════════════════════════════════════════════

export interface CitySeoService {
  slug: string; // e.g., "deck-construction-miami"
  serviceType: "deck-construction" | "deck-repair" | "patio-construction" | "pergola-construction";
  serviceLabel: string;
}

export interface CitySeoPage {
  citySlug: string; // e.g., "miami"
  cityName: string;
  state: string;
  county: string;
  metaTitle: string;
  metaDescription: string;
  heroHeadline: string;
  heroSubheadline: string;
  services: CitySeoService[];
  climate: {
    summary: string;
    considerations: string[];
  };
  permitNotes: string[];
  typicalMaterials: { name: string; note: string }[];
  commonFailures: { issue: string; detail: string }[];
  ctaHeadline: string;
  ctaSubheadline: string;
}

export const citySeoPages: CitySeoPage[] = [
  {
    citySlug: "miami",
    cityName: "Miami",
    state: "FL",
    county: "Miami-Dade County",
    metaTitle: "Deck & Patio Construction Miami FL | HVHZ-Compliant Builders 2026",
    metaDescription: "Expert deck, patio, and pergola construction in Miami. HVHZ-compliant, NOA-approved materials, 316-grade hardware. Free estimates from licensed Miami-Dade contractors.",
    heroHeadline: "Miami Deck & Patio Construction",
    heroSubheadline: "HVHZ-compliant outdoor living built for Miami-Dade's tropical climate — engineered, permitted, and hurricane-rated.",
    services: [
      { slug: "deck-construction-miami", serviceType: "deck-construction", serviceLabel: "Deck Construction in Miami" },
      { slug: "deck-repair-miami", serviceType: "deck-repair", serviceLabel: "Deck Repair in Miami" },
      { slug: "patio-construction-miami", serviceType: "patio-construction", serviceLabel: "Patio Construction in Miami" },
      { slug: "pergola-construction-miami", serviceType: "pergola-construction", serviceLabel: "Pergola Construction in Miami" },
    ],
    climate: {
      summary: "Miami's tropical maritime climate with year-round salt exposure, UV index 10–12, and 78% humidity creates the most demanding environment for outdoor structures in the continental US.",
      considerations: [
        "All hardware must be 316 marine-grade stainless steel within 3,000 ft of coast — standard galvanized fails in 6–12 months",
        "HVHZ (High-Velocity Hurricane Zone) designation requires all materials to carry Miami-Dade NOA certification",
        "Year-round UV index of 10–12 causes rapid material degradation — capped composite or PVC strongly recommended",
        "62 inches of annual rainfall with intense tropical storms requires superior drainage engineering",
      ],
    },
    permitNotes: [
      "All decks over 30\" or 200 sq ft require digitally signed and sealed engineering drawings",
      "Miami-Dade NOA (Notice of Acceptance) required for every material used",
      "Permit fees: $400–$2,500 depending on complexity",
      "Processing time: 15–45 business days",
      "Bilingual permit coordination available (English/Spanish)",
    ],
    typicalMaterials: [
      { name: "PVC Decking (AZEK)", note: "Top coastal pick — zero moisture absorption, complete salt resistance" },
      { name: "Ipe Hardwood", note: "Luxury standard — 30–50 year lifespan with proper maintenance" },
      { name: "Aluminum Framing", note: "Corrosion-proof alternative to wood framing in direct ocean exposure" },
      { name: "NOA-Certified Composite", note: "Must have valid Miami-Dade approval number" },
    ],
    commonFailures: [
      { issue: "Missing NOA certification", detail: "Materials without valid Miami-Dade Notice of Acceptance are automatically rejected" },
      { issue: "Incorrect hurricane strap installation", detail: "HVHZ requires specific connector patterns — missing connectors fail inspection" },
      { issue: "Non-marine-grade hardware", detail: "Standard galvanized screws and connectors corrode rapidly in salt air" },
      { issue: "Unsealed engineering drawings", detail: "Plans must be digitally signed and sealed by a licensed Florida PE" },
    ],
    ctaHeadline: "Build Your Miami Deck the Right Way",
    ctaSubheadline: "Free consultation with licensed Miami-Dade HVHZ-compliant contractors. We handle all permitting and NOA verification.",
  },
  {
    citySlug: "tampa",
    cityName: "Tampa",
    state: "FL",
    county: "Hillsborough County",
    metaTitle: "Deck & Patio Builders Tampa FL | Custom Outdoor Living 2026",
    metaDescription: "Custom deck and patio construction in Tampa Bay. Hurricane-rated hardware, humidity-resistant materials. Free estimates from licensed Hillsborough County contractors.",
    heroHeadline: "Tampa Deck & Patio Construction",
    heroSubheadline: "Custom outdoor living engineered for Tampa Bay's subtropical climate — built to FBC standards with hurricane-rated hardware.",
    services: [
      { slug: "deck-construction-tampa", serviceType: "deck-construction", serviceLabel: "Deck Construction in Tampa" },
      { slug: "deck-repair-tampa", serviceType: "deck-repair", serviceLabel: "Deck Repair in Tampa" },
      { slug: "patio-construction-tampa", serviceType: "patio-construction", serviceLabel: "Patio Construction in Tampa" },
      { slug: "pergola-construction-tampa", serviceType: "pergola-construction", serviceLabel: "Pergola Construction in Tampa" },
    ],
    climate: {
      summary: "Tampa Bay's subtropical humidity (74% avg) with intense summer heat creates ideal conditions for mold growth and wood decay. UV index 9–11 from April through October accelerates surface degradation.",
      considerations: [
        "High humidity causes rapid algae and mold growth — composite with built-in mold inhibitors strongly recommended",
        "Pressure-treated pine shows visible mold within 6–8 months without treatment",
        "Choose lighter deck colors — Tampa afternoon temps exceed 95°F and dark boards reach 160°F",
        "52 inches of concentrated summer rainfall requires proper drainage design",
      ],
    },
    permitNotes: [
      "Permit required for attached decks or decks over 30\" above grade",
      "Freestanding ground-level decks under 200 sq ft may be exempt — verify with Hillsborough County",
      "Permit fees: $200–$800",
      "Processing time: 7–21 business days",
      "Over 60% of Tampa homes are in HOA communities — check architectural review requirements",
    ],
    typicalMaterials: [
      { name: "Capped Composite", note: "Most popular choice — resists humidity, mold, and UV with minimal maintenance" },
      { name: "Pressure-Treated Pine", note: "Budget option but requires 30–40 hours/year maintenance in Tampa's climate" },
      { name: "PVC Decking", note: "Premium option — zero moisture absorption, ideal for covered lanais" },
      { name: "Standard Galvanized Hardware", note: "Acceptable for inland Tampa — saves 15–20% vs. coastal hardware" },
    ],
    commonFailures: [
      { issue: "Improper ledger board connection", detail: "Must use lag screws or through-bolts at 16\" OC per FBC R507.2" },
      { issue: "Missing hurricane straps", detail: "Wind Zone 130 mph requires engineered connections at all structural points" },
      { issue: "HOA non-compliance", detail: "Many Tampa HOAs require pre-approval — building without approval risks forced removal" },
      { issue: "Inadequate drainage", detail: "Tampa's heavy summer rains require proper grading away from foundation" },
    ],
    ctaHeadline: "Build Your Tampa Bay Deck",
    ctaSubheadline: "Free estimate from licensed Tampa contractors. We handle permits, HOA coordination, and build to code.",
  },
  {
    citySlug: "orlando",
    cityName: "Orlando",
    state: "FL",
    county: "Orange County",
    metaTitle: "Deck & Patio Construction Orlando FL | Family-Friendly Outdoor Living 2026",
    metaDescription: "Professional deck and patio construction in Orlando. UV-resistant composites, family-safe designs. Free estimates from licensed Orange County contractors.",
    heroHeadline: "Orlando Deck & Patio Construction",
    heroSubheadline: "Family-friendly outdoor spaces designed for Central Florida's year-round lifestyle — permitted and built to code.",
    services: [
      { slug: "deck-construction-orlando", serviceType: "deck-construction", serviceLabel: "Deck Construction in Orlando" },
      { slug: "deck-repair-orlando", serviceType: "deck-repair", serviceLabel: "Deck Repair in Orlando" },
      { slug: "patio-construction-orlando", serviceType: "patio-construction", serviceLabel: "Patio Construction in Orlando" },
      { slug: "pergola-construction-orlando", serviceType: "pergola-construction", serviceLabel: "Pergola Construction in Orlando" },
    ],
    climate: {
      summary: "Orlando's inland Central Florida location means intense UV (index 8–10), 54 inches of rain with daily summer thunderstorms, but no salt-air exposure — saving on hardware costs.",
      considerations: [
        "Intense UV causes rapid wood 'silvering' and surface cracking within 1–2 seasons",
        "Capped composites essential to prevent fading and maintain appearance",
        "No salt air — standard galvanized hardware acceptable, saving 15–20% on fasteners",
        "Daily afternoon thunderstorms June–September require excellent drainage under and around deck",
      ],
    },
    permitNotes: [
      "Decks under 120 sq ft may qualify for Zoning Permit only",
      "Attached decks of any size require a full building permit",
      "Permit fees: $150–$600",
      "Fast Track options available for standard projects",
      "Processing time: 7–14 business days",
    ],
    typicalMaterials: [
      { name: "Capped Composite", note: "Best all-around — UV-resistant with 25–50 year lifespan" },
      { name: "Pressure-Treated Pine", note: "Budget-friendly at $40–$80/sq ft installed" },
      { name: "Standard Galvanized Hardware", note: "No marine-grade needed inland — cost savings" },
      { name: "Eco-Friendly Composites", note: "Recycled material options align with Orlando's sustainability focus" },
    ],
    commonFailures: [
      { issue: "Setback violations", detail: "Orange County zoning requires careful setback planning, especially on smaller lots" },
      { issue: "Missing final inspection", detail: "Project cannot be used until final inspection passes" },
      { issue: "Incorrect joist spacing", detail: "Must match engineering plans — common DIY mistake" },
      { issue: "Improper drainage grading", detail: "Heavy rain patterns require water to flow away from foundation" },
    ],
    ctaHeadline: "Build Your Orlando Outdoor Space",
    ctaSubheadline: "Free estimates from licensed Orange County contractors. Family-safe designs, fully permitted.",
  },
  {
    citySlug: "jacksonville",
    cityName: "Jacksonville",
    state: "FL",
    county: "Duval / St. Johns County",
    metaTitle: "Deck Builders Jacksonville FL | Durable Decks & Patios 2026",
    metaDescription: "Durable deck construction in Jacksonville. Military-family friendly, maximum ROI. Free estimates from licensed Duval County contractors.",
    heroHeadline: "Jacksonville Deck & Patio Construction",
    heroSubheadline: "Maximum ROI outdoor living built for Northeast Florida — durable, low-maintenance, and military-family friendly.",
    services: [
      { slug: "deck-construction-jacksonville", serviceType: "deck-construction", serviceLabel: "Deck Construction in Jacksonville" },
      { slug: "deck-repair-jacksonville", serviceType: "deck-repair", serviceLabel: "Deck Repair in Jacksonville" },
      { slug: "patio-construction-jacksonville", serviceType: "patio-construction", serviceLabel: "Patio Construction in Jacksonville" },
      { slug: "pergola-construction-jacksonville", serviceType: "pergola-construction", serviceLabel: "Pergola Construction in Jacksonville" },
    ],
    climate: {
      summary: "Jacksonville's northern subtropical climate with moderate coastal influence causes wood expansion/contraction cycles. Coastal Duval properties face salt-air corrosion.",
      considerations: [
        "Temperature cycling causes wood warping, split boards, and loosened fasteners",
        "Coastal properties (Jax Beach, Neptune Beach) need 316 stainless steel hardware",
        "Inland Jacksonville can use standard galvanized — saving 15–20% on hardware",
        "50 inches of rainfall with distinct wet/dry seasons",
      ],
    },
    permitNotes: [
      "Permit mandatory for attached decks or decks over 30\" above grade",
      "Freestanding ground-level decks under 200 sq ft may be exempt",
      "Permit fees: $150–$600",
      "JAXEPICS online portal for permit applications",
      "St. Johns County has separate requirements",
    ],
    typicalMaterials: [
      { name: "Capped Composite", note: "Best dimensional stability against thermal cycling" },
      { name: "Pressure-Treated Pine", note: "Budget option — best value in the state at $38–$75/sq ft" },
      { name: "PVC Decking", note: "Premium choice for coastal Duval properties" },
      { name: "Mixed Hardware Zones", note: "316 stainless for beach, galvanized for inland" },
    ],
    commonFailures: [
      { issue: "Wrong hardware for zone", detail: "Coastal and inland Jacksonville have different hardware requirements" },
      { issue: "Thermal cycling damage", detail: "Wood expansion causes fastener pop-out and board warping" },
      { issue: "Flood zone non-compliance", detail: "Many Jax properties are in flood zones — BFE requirements apply" },
      { issue: "Ledger connection failure", detail: "The #1 cause of deck collapses — proper through-bolts required" },
    ],
    ctaHeadline: "Build Your Jacksonville Deck",
    ctaSubheadline: "Best ROI in Florida. Free estimate from licensed Northeast Florida contractors.",
  },
  {
    citySlug: "st-petersburg",
    cityName: "St. Petersburg",
    state: "FL",
    county: "Pinellas County",
    metaTitle: "Deck & Patio Builders St. Petersburg FL | Coastal Construction 2026",
    metaDescription: "Expert deck and patio construction in St. Petersburg. Salt-air resistant materials, barrier island compliant. Free estimates from licensed Pinellas County contractors.",
    heroHeadline: "St. Petersburg Deck & Patio Construction",
    heroSubheadline: "Coastal-grade outdoor living built for Pinellas County — salt-air resistant, hurricane-rated, and barrier island compliant.",
    services: [
      { slug: "deck-construction-st-petersburg", serviceType: "deck-construction", serviceLabel: "Deck Construction in St. Petersburg" },
      { slug: "deck-repair-st-petersburg", serviceType: "deck-repair", serviceLabel: "Deck Repair in St. Petersburg" },
      { slug: "patio-construction-st-petersburg", serviceType: "patio-construction", serviceLabel: "Patio Construction in St. Petersburg" },
      { slug: "pergola-construction-st-petersburg", serviceType: "pergola-construction", serviceLabel: "Pergola Construction in St. Petersburg" },
    ],
    climate: {
      summary: "St. Petersburg's coastal peninsula location means salt air exposure on three sides, with 140 mph wind zone ratings and frequent gulf storm exposure.",
      considerations: [
        "Salt air from Tampa Bay and Gulf requires marine-grade hardware throughout",
        "140 mph wind zone — hurricane straps and engineered connections required",
        "Barrier island properties have additional coastal construction restrictions",
        "Flood zone compliance required in many waterfront areas",
      ],
    },
    permitNotes: [
      "Permit required for most deck construction",
      "Barrier island properties face additional coastal reviews",
      "Permit fees: $200–$900",
      "Processing time: 10–25 business days",
      "Flood zone documentation often required",
    ],
    typicalMaterials: [
      { name: "PVC Decking", note: "Ideal for salt-air — zero moisture absorption" },
      { name: "Capped Composite", note: "Popular mid-range option with salt resistance" },
      { name: "316 Stainless Hardware", note: "Required for all waterfront properties" },
      { name: "Aluminum Framing", note: "Growing trend for waterfront homes — zero corrosion" },
    ],
    commonFailures: [
      { issue: "Corroded fasteners", detail: "Standard zinc-plated hardware fails in 2–5 years in salt air" },
      { issue: "Flood zone violations", detail: "Decks must meet Base Flood Elevation requirements in FEMA zones" },
      { issue: "Missing wind engineering", detail: "140 mph zone requires engineered connections — not optional" },
      { issue: "Barrier island setback violations", detail: "Strict coastal construction control line requirements" },
    ],
    ctaHeadline: "Build Your St. Pete Outdoor Space",
    ctaSubheadline: "Free estimate from licensed Pinellas County coastal construction specialists.",
  },
  {
    citySlug: "fort-lauderdale",
    cityName: "Fort Lauderdale",
    state: "FL",
    county: "Broward County",
    metaTitle: "Deck & Patio Construction Fort Lauderdale FL | HVHZ Builders 2026",
    metaDescription: "HVHZ-compliant deck and patio construction in Fort Lauderdale. NOA-approved materials, marine-grade hardware. Licensed Broward County contractors.",
    heroHeadline: "Fort Lauderdale Deck & Patio Construction",
    heroSubheadline: "HVHZ-compliant luxury outdoor living — NOA-approved, marine-grade, and engineered for Broward County's hurricane zone.",
    services: [
      { slug: "deck-construction-fort-lauderdale", serviceType: "deck-construction", serviceLabel: "Deck Construction in Fort Lauderdale" },
      { slug: "deck-repair-fort-lauderdale", serviceType: "deck-repair", serviceLabel: "Deck Repair in Fort Lauderdale" },
      { slug: "patio-construction-fort-lauderdale", serviceType: "patio-construction", serviceLabel: "Patio Construction in Fort Lauderdale" },
      { slug: "pergola-construction-fort-lauderdale", serviceType: "pergola-construction", serviceLabel: "Pergola Construction in Fort Lauderdale" },
    ],
    climate: {
      summary: "Fort Lauderdale shares Miami's HVHZ designation with 175+ mph wind ratings, year-round salt exposure, and tropical humidity — requiring the highest-grade materials and engineering.",
      considerations: [
        "HVHZ requirements identical to Miami-Dade — all materials need NOA certification",
        "Waterway-adjacent properties (Fort Lauderdale's extensive canal system) need marine setback review",
        "Year-round salt exposure requires 316 stainless steel throughout",
        "Tropical humidity accelerates wood decay — composite or PVC strongly recommended",
      ],
    },
    permitNotes: [
      "HVHZ requirements apply — NOA-approved materials required",
      "Engineered, sealed drawings required for most deck projects",
      "Permit fees: $350–$2,000",
      "Processing time: 14–40 business days",
      "Waterway setback review for canal-front properties",
    ],
    typicalMaterials: [
      { name: "NOA-Certified Composite", note: "Must have valid Broward County approval" },
      { name: "PVC Decking", note: "Premium choice for canal-front and oceanfront" },
      { name: "316 Marine-Grade Stainless", note: "Mandatory for all structural connections" },
      { name: "Aluminum Framing", note: "Ideal for waterway properties — zero corrosion risk" },
    ],
    commonFailures: [
      { issue: "NOA documentation gaps", detail: "Every material must have valid, current NOA — expired approvals cause rejection" },
      { issue: "Canal setback violations", detail: "Fort Lauderdale's extensive waterways have strict setback requirements" },
      { issue: "Hurricane connector patterns", detail: "HVHZ requires specific connector placement at every structural joint" },
      { issue: "Non-compliant electrical", detail: "All outdoor electrical must meet HVHZ and NEC requirements simultaneously" },
    ],
    ctaHeadline: "Build Your Fort Lauderdale Deck",
    ctaSubheadline: "HVHZ-compliant construction from licensed Broward County specialists. Free consultation.",
  },
  {
    citySlug: "sarasota",
    cityName: "Sarasota",
    state: "FL",
    county: "Sarasota County",
    metaTitle: "Deck & Patio Builders Sarasota FL | Premium Coastal Living 2026",
    metaDescription: "Premium deck and patio construction in Sarasota. Salt-air durable, V-Zone compliant. Free estimates from licensed Sarasota County contractors.",
    heroHeadline: "Sarasota Premium Deck & Patio Construction",
    heroSubheadline: "Luxury outdoor living built with salt-air resistant materials — engineered for Sarasota's coastal climate and premium lifestyle.",
    services: [
      { slug: "deck-construction-sarasota", serviceType: "deck-construction", serviceLabel: "Deck Construction in Sarasota" },
      { slug: "deck-repair-sarasota", serviceType: "deck-repair", serviceLabel: "Deck Repair in Sarasota" },
      { slug: "patio-construction-sarasota", serviceType: "patio-construction", serviceLabel: "Patio Construction in Sarasota" },
      { slug: "pergola-construction-sarasota", serviceType: "pergola-construction", serviceLabel: "Pergola Construction in Sarasota" },
    ],
    climate: {
      summary: "Sarasota's Gulf Coast location means aggressive salt-air corrosion, 140–150 mph wind zones, and post-hurricane rebuilding standards.",
      considerations: [
        "Salt air within 5 miles of beach requires 316 marine-grade stainless for all fasteners",
        "V-Zone coastal regulations may require storm surge engineering",
        "Post-Hurricane Ian/Milton rebuilding codes apply — stricter than pre-storm standards",
        "Premium lifestyle market expects resort-quality materials and finishes",
      ],
    },
    permitNotes: [
      "V-Zone coastal properties require storm surge engineering",
      "Even small decks may need permits in flood zones",
      "Permit fees: $250–$1,000",
      "Engineer stamp required for most coastal projects",
      "Processing time: 10–30 business days",
    ],
    typicalMaterials: [
      { name: "PVC Decking (AZEK)", note: "#1 recommended for Sarasota coastal — zero moisture absorption" },
      { name: "Ipe Hardwood", note: "Luxury market standard — cable railings for view preservation" },
      { name: "316 Stainless Steel", note: "Mandatory within 5 miles of beach" },
      { name: "Premium Composite", note: "Mid-range luxury option with excellent salt resistance" },
    ],
    commonFailures: [
      { issue: "V-Zone non-compliance", detail: "Coastal structures must withstand storm surges per FEMA V-Zone requirements" },
      { issue: "Corroded hardware", detail: "Standard galvanized fails in 12–18 months in Sarasota salt air" },
      { issue: "Post-hurricane code gaps", detail: "Older designs don't meet updated post-Ian/Milton building codes" },
      { issue: "Missing flood elevation documentation", detail: "Base Flood Elevation compliance documentation required" },
    ],
    ctaHeadline: "Build Your Sarasota Dream Deck",
    ctaSubheadline: "Premium coastal construction from licensed Sarasota County specialists. Free design consultation.",
  },
  {
    citySlug: "naples",
    cityName: "Naples",
    state: "FL",
    county: "Collier County",
    metaTitle: "Deck & Patio Construction Naples FL | Luxury Coastal Builders 2026",
    metaDescription: "Luxury deck and patio construction in Naples. Hurricane-engineered, salt-resistant. Free estimates from licensed Collier County contractors.",
    heroHeadline: "Naples Luxury Deck & Patio Construction",
    heroSubheadline: "Resort-quality outdoor living engineered for Naples' coastal environment — premium materials, hurricane-rated, fully permitted.",
    services: [
      { slug: "deck-construction-naples", serviceType: "deck-construction", serviceLabel: "Deck Construction in Naples" },
      { slug: "deck-repair-naples", serviceType: "deck-repair", serviceLabel: "Deck Repair in Naples" },
      { slug: "patio-construction-naples", serviceType: "patio-construction", serviceLabel: "Patio Construction in Naples" },
      { slug: "pergola-construction-naples", serviceType: "pergola-construction", serviceLabel: "Pergola Construction in Naples" },
    ],
    climate: {
      summary: "Naples' 150 mph wind zone, aggressive salt air, and post-hurricane rebuilding standards demand the highest-quality materials and engineering.",
      considerations: [
        "150 mph wind zone — engineered connections required for all structures",
        "Post-hurricane rebuilding codes in effect — stricter than standard FBC",
        "Luxury market expects premium material selections and custom designs",
        "Salt air requires marine-grade hardware and corrosion-resistant materials",
      ],
    },
    permitNotes: [
      "Collier County requires engineering for most deck projects",
      "Post-hurricane rebuilding standards apply",
      "Permit fees: $300–$1,200",
      "Processing time: 14–35 business days",
      "Luxury projects often require additional architectural review",
    ],
    typicalMaterials: [
      { name: "Ipe Hardwood", note: "Naples luxury standard — stunning appearance, 30–50 year lifespan" },
      { name: "PVC Decking", note: "Premium low-maintenance alternative to hardwood" },
      { name: "Aluminum Framing", note: "Corrosion-proof for waterfront estates" },
      { name: "Natural Stone Pavers", note: "Popular for patio and pool deck applications" },
    ],
    commonFailures: [
      { issue: "Wind engineering deficiencies", detail: "150 mph zone requires robust engineered connections at every joint" },
      { issue: "Post-storm code updates", detail: "Projects designed to pre-hurricane standards may not meet current code" },
      { issue: "Luxury material compatibility", detail: "Mixed material systems need compatible fasteners and connections" },
      { issue: "Coastal setback violations", detail: "Beachfront properties have strict construction control line requirements" },
    ],
    ctaHeadline: "Build Your Naples Outdoor Paradise",
    ctaSubheadline: "Luxury coastal construction from licensed Collier County contractors. Free design consultation.",
  },
  {
    citySlug: "palm-beach",
    cityName: "Palm Beach",
    state: "FL",
    county: "Palm Beach County",
    metaTitle: "Deck & Patio Builders Palm Beach FL | High-Wind Zone Construction 2026",
    metaDescription: "Expert deck and patio construction in Palm Beach. High-wind engineered, coastal-grade hardware. Free estimates from licensed Palm Beach County contractors.",
    heroHeadline: "Palm Beach Deck & Patio Construction",
    heroSubheadline: "High-wind zone outdoor living with coastal-grade engineering — built for Palm Beach County's demanding environment.",
    services: [
      { slug: "deck-construction-palm-beach", serviceType: "deck-construction", serviceLabel: "Deck Construction in Palm Beach" },
      { slug: "deck-repair-palm-beach", serviceType: "deck-repair", serviceLabel: "Deck Repair in Palm Beach" },
      { slug: "patio-construction-palm-beach", serviceType: "patio-construction", serviceLabel: "Patio Construction in Palm Beach" },
      { slug: "pergola-construction-palm-beach", serviceType: "pergola-construction", serviceLabel: "Pergola Construction in Palm Beach" },
    ],
    climate: {
      summary: "Palm Beach County's 150–170 mph wind zone, coastal salt exposure, and tropical humidity create demanding conditions for outdoor construction.",
      considerations: [
        "150–170 mph wind zone — among the highest in Florida outside HVHZ",
        "Coastal salt air requires marine-grade hardware for all waterfront properties",
        "Tropical humidity accelerates wood decay and mold growth",
        "Beachfront properties face strict coastal setback requirements",
      ],
    },
    permitNotes: [
      "High wind zone — engineered connections required",
      "Coastal setback requirements for beachfront properties",
      "Permit fees: $300–$1,500",
      "Processing time: 14–35 business days",
      "Engineering reviews required for elevated or attached decks",
    ],
    typicalMaterials: [
      { name: "Capped Composite", note: "Popular choice balancing performance and cost" },
      { name: "PVC Decking", note: "Premium pick for oceanfront properties" },
      { name: "316 Stainless Hardware", note: "Required for all coastal-facing structures" },
      { name: "Engineered Connectors", note: "High-wind rated connectors at every structural point" },
    ],
    commonFailures: [
      { issue: "Insufficient wind-load connections", detail: "150–170 mph zone requires robust engineered hardware at every joint" },
      { issue: "Coastal construction line violations", detail: "Building seaward of the CCCL requires additional state review" },
      { issue: "Non-marine-grade hardware", detail: "Salt air corrodes standard hardware rapidly — 316 stainless required" },
      { issue: "Missing engineering stamp", detail: "Elevated and attached decks require PE-stamped drawings" },
    ],
    ctaHeadline: "Build Your Palm Beach Deck",
    ctaSubheadline: "High-wind zone specialists. Free estimates from licensed Palm Beach County contractors.",
  },
  {
    citySlug: "tallahassee",
    cityName: "Tallahassee",
    state: "FL",
    county: "Leon County",
    metaTitle: "Deck & Patio Builders Tallahassee FL | Affordable Outdoor Living 2026",
    metaDescription: "Affordable deck and patio construction in Tallahassee. Lower wind zone, faster permits. Free estimates from licensed Leon County contractors.",
    heroHeadline: "Tallahassee Deck & Patio Construction",
    heroSubheadline: "Quality outdoor living at North Florida's best prices — lower wind requirements, faster permitting, and competitive contractor rates.",
    services: [
      { slug: "deck-construction-tallahassee", serviceType: "deck-construction", serviceLabel: "Deck Construction in Tallahassee" },
      { slug: "deck-repair-tallahassee", serviceType: "deck-repair", serviceLabel: "Deck Repair in Tallahassee" },
      { slug: "patio-construction-tallahassee", serviceType: "patio-construction", serviceLabel: "Patio Construction in Tallahassee" },
      { slug: "pergola-construction-tallahassee", serviceType: "pergola-construction", serviceLabel: "Pergola Construction in Tallahassee" },
    ],
    climate: {
      summary: "Tallahassee's North Florida climate is more moderate than coastal cities. Lower wind zone (120 mph) simplifies engineering, but humidity and UV still require proper material selection.",
      considerations: [
        "Lower wind zone (120 mph) — simplified engineering for most projects",
        "No salt air — standard galvanized hardware acceptable throughout",
        "North Florida humidity still requires moisture-resistant materials",
        "Historic district overlay may apply in downtown areas",
      ],
    },
    permitNotes: [
      "Lower wind zone simplifies engineering requirements",
      "Historic district may require additional architectural review",
      "Permit fees: $100–$500 — among the lowest in Florida",
      "Processing time: 5–14 business days — among the fastest",
      "Generally straightforward permitting process",
    ],
    typicalMaterials: [
      { name: "Pressure-Treated Pine", note: "Best budget option — climate is kinder to wood than coastal cities" },
      { name: "Capped Composite", note: "Low-maintenance option for long-term value" },
      { name: "Standard Galvanized Hardware", note: "No marine-grade needed — significant cost savings" },
      { name: "Cedar", note: "Natural beauty option — lasts longer in Tallahassee's milder climate" },
    ],
    commonFailures: [
      { issue: "Historic district non-compliance", detail: "Downtown properties may need architectural review before construction" },
      { issue: "Ledger connection issues", detail: "Still the #1 structural failure — proper bolting required even in low-wind zones" },
      { issue: "Missing final inspection", detail: "Project not complete until final inspection passes" },
      { issue: "Termite damage", detail: "North Florida termite pressure requires treated wood or inorganic materials" },
    ],
    ctaHeadline: "Build Your Tallahassee Deck",
    ctaSubheadline: "Most affordable market in Florida. Free estimates from licensed Leon County contractors.",
  },
];

// Helper to find a city page by slug
export function getCitySeoPage(slug: string): CitySeoPage | undefined {
  return citySeoPages.find((c) => c.citySlug === slug);
}
