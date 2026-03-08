// ═══════════════════════════════════════════════════════════════
// Florida Deck Permit Requirement Rules Engine
// Expandable rule-based system for permit determination
// ═══════════════════════════════════════════════════════════════

export interface PermitCity {
  id: string;
  name: string;
  county: string;
  region: string;
  isHVHZ: boolean;
  isCoastal: boolean;
  windSpeed: string;
  permitFeeRange: [number, number];
  complexPermitFeeRange: [number, number];
  permitProcessingDays: [number, number];
  permitLink: string;
  permitDepartment: string;
  permitPhone: string;
  specialNotes: string[];
}

export interface PermitInputs {
  cityId: string;
  deckSize: number;
  height: "ground" | "low" | "elevated" | "second-story";
  attachment: "ledger" | "freestanding" | "masonry" | "stucco";
  hasStairs: boolean;
  stairSteps: number;
  roofType: "none" | "pergola" | "solid-roof";
  electrical: "none" | "lighting" | "outlets-fans";
  hoaStatus: "yes" | "no" | "not-sure";
  floodZone: "yes" | "no" | "not-sure";
  material: "pressure-treated" | "composite" | "mixed";
  railingsRequired: "yes" | "no";
}

export type PermitLikelihood = "almost-certainly" | "likely" | "possibly" | "possibly-not";

export interface InspectionStep {
  name: string;
  description: string;
  typical: boolean; // always required vs conditional
}

export interface PermitResult {
  likelihood: PermitLikelihood;
  likelihoodLabel: string;
  likelihoodExplanation: string;
  inspections: InspectionStep[];
  feeRange: [number, number];
  timeline: {
    permitProcessing: string;
    inspectionTimeline: string;
    constructionDuration: string;
  };
  specialRequirements: string[];
  commonMistakes: string[];
  riskWarnings: string[];
}

// ── 20 Florida Cities ──────────────────────────────────────────

export const permitCities: PermitCity[] = [
  {
    id: "miami",
    name: "Miami",
    county: "Miami-Dade",
    region: "Southeast Florida",
    isHVHZ: true,
    isCoastal: true,
    windSpeed: "175+ mph",
    permitFeeRange: [400, 800],
    complexPermitFeeRange: [1000, 2500],
    permitProcessingDays: [15, 45],
    permitLink: "https://www.miamidade.gov/permits",
    permitDepartment: "Miami-Dade Permitting Portal",
    permitPhone: "(786) 315-2000",
    specialNotes: [
      "All materials must have a valid Miami-Dade NOA (Notice of Acceptance)",
      "Digitally signed and sealed engineering drawings required for most decks",
      "316-grade stainless steel hardware mandatory within 3,000 ft of coast",
    ],
  },
  {
    id: "tampa",
    name: "Tampa",
    county: "Hillsborough",
    region: "Central West Florida",
    isHVHZ: false,
    isCoastal: false,
    windSpeed: "130 mph",
    permitFeeRange: [200, 400],
    complexPermitFeeRange: [500, 800],
    permitProcessingDays: [7, 21],
    permitLink: "https://www.hillsboroughcounty.org/en/residents/property-owners-and-renters/building-permits",
    permitDepartment: "Hillsborough County Building Services",
    permitPhone: "(813) 272-5600",
    specialNotes: [
      "High HOA prevalence — over 60% of homes in HOA communities",
      "Master-planned communities may have additional architectural review",
    ],
  },
  {
    id: "orlando",
    name: "Orlando",
    county: "Orange County",
    region: "Central Florida",
    isHVHZ: false,
    isCoastal: false,
    windSpeed: "130 mph",
    permitFeeRange: [150, 350],
    complexPermitFeeRange: [400, 600],
    permitProcessingDays: [7, 14],
    permitLink: "https://www.orangecountyfl.net/BuildingPermitting.aspx",
    permitDepartment: "Orange County Building Division",
    permitPhone: "(407) 836-5540",
    specialNotes: [
      "Decks under 120 sq ft may qualify for Zoning Permit only",
      "Fast Track options available for standard projects",
    ],
  },
  {
    id: "jacksonville",
    name: "Jacksonville",
    county: "Duval County",
    region: "Northeast Florida",
    isHVHZ: false,
    isCoastal: true,
    windSpeed: "120–130 mph",
    permitFeeRange: [150, 350],
    complexPermitFeeRange: [400, 600],
    permitProcessingDays: [7, 21],
    permitLink: "https://jaxepics.coj.net",
    permitDepartment: "City of Jacksonville Building Inspection Division",
    permitPhone: "(904) 255-7800",
    specialNotes: [
      "Coastal Duval properties require salt-air rated hardware",
      "Inland Jacksonville can use standard galvanized fasteners",
    ],
  },
  {
    id: "st-petersburg",
    name: "St. Petersburg",
    county: "Pinellas County",
    region: "Tampa Bay Area",
    isHVHZ: false,
    isCoastal: true,
    windSpeed: "140 mph",
    permitFeeRange: [200, 450],
    complexPermitFeeRange: [500, 900],
    permitProcessingDays: [10, 25],
    permitLink: "https://www.stpete.org/building_and_development/",
    permitDepartment: "City of St. Petersburg Building Services",
    permitPhone: "(727) 893-7373",
    specialNotes: [
      "Barrier island properties may have additional coastal construction requirements",
      "Flood zone compliance required in many areas",
    ],
  },
  {
    id: "fort-lauderdale",
    name: "Fort Lauderdale",
    county: "Broward County",
    region: "Southeast Florida",
    isHVHZ: true,
    isCoastal: true,
    windSpeed: "175+ mph",
    permitFeeRange: [350, 700],
    complexPermitFeeRange: [800, 2000],
    permitProcessingDays: [14, 40],
    permitLink: "https://www.fortlauderdale.gov/departments/development-services/building-services",
    permitDepartment: "Fort Lauderdale Building Services",
    permitPhone: "(954) 828-6520",
    specialNotes: [
      "HVHZ requirements apply — NOA-approved materials required",
      "Waterway-adjacent properties need marine setback review",
    ],
  },
  {
    id: "sarasota",
    name: "Sarasota",
    county: "Sarasota County",
    region: "Southwest Florida",
    isHVHZ: false,
    isCoastal: true,
    windSpeed: "140–150 mph",
    permitFeeRange: [250, 500],
    complexPermitFeeRange: [600, 1000],
    permitProcessingDays: [10, 30],
    permitLink: "https://www.scgov.net/government/building-permits",
    permitDepartment: "Sarasota County Building Department",
    permitPhone: "(941) 861-6151",
    specialNotes: [
      "V-Zone coastal regulations may require storm surge engineering",
      "316 marine-grade stainless steel required within 5 miles of beach",
    ],
  },
  {
    id: "naples",
    name: "Naples",
    county: "Collier County",
    region: "Southwest Florida",
    isHVHZ: false,
    isCoastal: true,
    windSpeed: "150 mph",
    permitFeeRange: [300, 600],
    complexPermitFeeRange: [700, 1200],
    permitProcessingDays: [14, 35],
    permitLink: "https://www.colliercountyfl.gov/growth-management/building-review-permitting",
    permitDepartment: "Collier County Building Review",
    permitPhone: "(239) 252-2400",
    specialNotes: [
      "Post-hurricane rebuilding standards apply",
      "Luxury market — expect premium material and engineering costs",
    ],
  },
  {
    id: "palm-beach",
    name: "Palm Beach",
    county: "Palm Beach County",
    region: "Southeast Florida",
    isHVHZ: false,
    isCoastal: true,
    windSpeed: "150–170 mph",
    permitFeeRange: [300, 650],
    complexPermitFeeRange: [700, 1500],
    permitProcessingDays: [14, 35],
    permitLink: "https://www.pbcgov.com/building",
    permitDepartment: "Palm Beach County Building Division",
    permitPhone: "(561) 233-5100",
    specialNotes: [
      "High wind zone — engineered connections required",
      "Coastal setback requirements for beachfront properties",
    ],
  },
  {
    id: "tallahassee",
    name: "Tallahassee",
    county: "Leon County",
    region: "North Florida",
    isHVHZ: false,
    isCoastal: false,
    windSpeed: "120 mph",
    permitFeeRange: [100, 250],
    complexPermitFeeRange: [300, 500],
    permitProcessingDays: [5, 14],
    permitLink: "https://www.talgov.com/gm/gm-building.aspx",
    permitDepartment: "City of Tallahassee Growth Management",
    permitPhone: "(850) 891-7001",
    specialNotes: [
      "Lower wind zone — simplified engineering for most projects",
      "Historic district overlay may apply in downtown areas",
    ],
  },
  {
    id: "st-augustine",
    name: "St. Augustine",
    county: "St. Johns County",
    region: "Northeast Florida",
    isHVHZ: false,
    isCoastal: true,
    windSpeed: "130 mph",
    permitFeeRange: [175, 400],
    complexPermitFeeRange: [450, 700],
    permitProcessingDays: [10, 25],
    permitLink: "https://www.sjcfl.us/Building",
    permitDepartment: "St. Johns County Building Department",
    permitPhone: "(904) 827-6800",
    specialNotes: [
      "Historic district requires additional architectural review",
      "Coastal properties need flood zone compliance",
    ],
  },
  {
    id: "daytona-beach",
    name: "Daytona Beach",
    county: "Volusia County",
    region: "Central East Coast",
    isHVHZ: false,
    isCoastal: true,
    windSpeed: "130–140 mph",
    permitFeeRange: [150, 350],
    complexPermitFeeRange: [400, 650],
    permitProcessingDays: [7, 21],
    permitLink: "https://www.volusia.org/services/growth-and-resource-management/building-and-code-administration/",
    permitDepartment: "Volusia County Building & Code Administration",
    permitPhone: "(386) 736-5929",
    specialNotes: [
      "Beachside properties face strict coastal construction control line rules",
    ],
  },
  {
    id: "pensacola",
    name: "Pensacola",
    county: "Escambia County",
    region: "Northwest Florida (Panhandle)",
    isHVHZ: false,
    isCoastal: true,
    windSpeed: "140–150 mph",
    permitFeeRange: [150, 350],
    complexPermitFeeRange: [400, 700],
    permitProcessingDays: [7, 21],
    permitLink: "https://myescambia.com/our-services/building-inspections",
    permitDepartment: "Escambia County Building Inspections",
    permitPhone: "(850) 595-3550",
    specialNotes: [
      "Panhandle wind zone — higher wind speeds than many Florida markets",
      "Post-Hurricane Michael code updates apply",
    ],
  },
  {
    id: "lakeland",
    name: "Lakeland",
    county: "Polk County",
    region: "Central Florida",
    isHVHZ: false,
    isCoastal: false,
    windSpeed: "120–130 mph",
    permitFeeRange: [125, 300],
    complexPermitFeeRange: [350, 550],
    permitProcessingDays: [5, 14],
    permitLink: "https://www.lakelandgov.net/departments/community-development/building-inspection/",
    permitDepartment: "City of Lakeland Building Inspection",
    permitPhone: "(863) 834-6011",
    specialNotes: [
      "Inland location — standard galvanized hardware acceptable",
      "Generally faster permit processing than coastal counties",
    ],
  },
  {
    id: "bradenton",
    name: "Bradenton",
    county: "Manatee County",
    region: "Southwest Florida",
    isHVHZ: false,
    isCoastal: true,
    windSpeed: "140 mph",
    permitFeeRange: [200, 400],
    complexPermitFeeRange: [500, 800],
    permitProcessingDays: [10, 25],
    permitLink: "https://www.mymanatee.org/departments/building_and_development_services",
    permitDepartment: "Manatee County Building & Development Services",
    permitPhone: "(941) 748-4501",
    specialNotes: [
      "Anna Maria Island and coastal areas have additional restrictions",
      "Flood zone requirements common in western Manatee County",
    ],
  },
  {
    id: "cape-coral",
    name: "Cape Coral",
    county: "Lee County",
    region: "Southwest Florida",
    isHVHZ: false,
    isCoastal: true,
    windSpeed: "150 mph",
    permitFeeRange: [200, 450],
    complexPermitFeeRange: [500, 900],
    permitProcessingDays: [10, 30],
    permitLink: "https://www.capecoral.gov/department/community_development/building_division/",
    permitDepartment: "City of Cape Coral Building Division",
    permitPhone: "(239) 574-0553",
    specialNotes: [
      "Post-Hurricane Ian rebuilding codes in effect",
      "Canal-front properties require marine setback review",
    ],
  },
  {
    id: "clearwater",
    name: "Clearwater",
    county: "Pinellas County",
    region: "Tampa Bay Area",
    isHVHZ: false,
    isCoastal: true,
    windSpeed: "140 mph",
    permitFeeRange: [200, 400],
    complexPermitFeeRange: [500, 850],
    permitProcessingDays: [10, 25],
    permitLink: "https://www.myclearwater.com/government/city-departments/planning-development/building-permits",
    permitDepartment: "City of Clearwater Planning & Development",
    permitPhone: "(727) 562-4567",
    specialNotes: [
      "Clearwater Beach properties have strict coastal construction requirements",
      "Barrier island flood zone compliance required",
    ],
  },
  {
    id: "gainesville",
    name: "Gainesville",
    county: "Alachua County",
    region: "North Central Florida",
    isHVHZ: false,
    isCoastal: false,
    windSpeed: "120 mph",
    permitFeeRange: [100, 250],
    complexPermitFeeRange: [300, 500],
    permitProcessingDays: [5, 14],
    permitLink: "https://growth-management.alachuacounty.us/building",
    permitDepartment: "Alachua County Building Division",
    permitPhone: "(352) 374-5243",
    specialNotes: [
      "Lower wind zone — simplified engineering requirements",
      "University area properties may have historic overlay requirements",
    ],
  },
  {
    id: "port-st-lucie",
    name: "Port St. Lucie",
    county: "St. Lucie County",
    region: "Treasure Coast",
    isHVHZ: false,
    isCoastal: true,
    windSpeed: "150 mph",
    permitFeeRange: [200, 400],
    complexPermitFeeRange: [500, 800],
    permitProcessingDays: [10, 25],
    permitLink: "https://www.cityofpsl.com/government/departments/building",
    permitDepartment: "City of Port St. Lucie Building Department",
    permitPhone: "(772) 871-5132",
    specialNotes: [
      "High wind zone — engineered connections required for most decks",
      "Growing market with generally responsive permit processing",
    ],
  },
  {
    id: "ocala",
    name: "Ocala",
    county: "Marion County",
    region: "North Central Florida",
    isHVHZ: false,
    isCoastal: false,
    windSpeed: "115–120 mph",
    permitFeeRange: [100, 250],
    complexPermitFeeRange: [300, 500],
    permitProcessingDays: [5, 14],
    permitLink: "https://www.marioncountyfl.org/departments-agencies/building-safety",
    permitDepartment: "Marion County Building Safety",
    permitPhone: "(352) 438-2400",
    specialNotes: [
      "Lower wind zone — simplified engineering",
      "Fastest and most affordable permitting in the state",
      "Inland — no salt-air hardware requirements",
    ],
  },
];

// ── Permit Determination Rules ─────────────────────────────────

export function determinePermitRequirements(inputs: PermitInputs): PermitResult {
  const city = permitCities.find((c) => c.id === inputs.cityId);
  const isAttached = inputs.attachment !== "freestanding";
  const isElevated = inputs.height === "elevated" || inputs.height === "second-story";
  const isHigh = inputs.height === "second-story";
  const hasRoof = inputs.roofType !== "none";
  const hasElectrical = inputs.electrical !== "none";
  const isComplex = isElevated || hasRoof || hasElectrical || isHigh || inputs.deckSize > 500;

  // ── Likelihood ──
  let likelihood: PermitLikelihood = "possibly-not";
  let likelihoodLabel = "Permit Possibly Not Required";
  let likelihoodExplanation = "";

  if (city?.isHVHZ) {
    likelihood = "almost-certainly";
    likelihoodLabel = "Almost Certainly Required";
    likelihoodExplanation =
      "Your city is in a High-Velocity Hurricane Zone (HVHZ). Virtually all deck construction requires a permit with engineered, NOA-approved plans.";
  } else if (isAttached || isElevated || inputs.deckSize > 200 || hasRoof) {
    likelihood = "almost-certainly";
    likelihoodLabel = "Almost Certainly Required";
    likelihoodExplanation =
      "Based on your inputs (attached structure, elevated height, size, or roof cover), a building permit is almost certainly required by Florida Building Code.";
  } else if (inputs.deckSize > 100 || inputs.hasStairs || hasElectrical) {
    likelihood = "likely";
    likelihoodLabel = "Likely Required";
    likelihoodExplanation =
      "Your project characteristics suggest a permit will likely be required. Some jurisdictions may have exemptions for small freestanding ground-level decks, but stairs, electrical, or larger sizes typically trigger permit requirements.";
  } else if (inputs.floodZone === "yes") {
    likelihood = "likely";
    likelihoodLabel = "Likely Required";
    likelihoodExplanation =
      "Properties in flood zones typically require permits for any outdoor structure to verify compliance with Base Flood Elevation requirements.";
  } else {
    likelihood = "possibly";
    likelihoodLabel = "Possibly Required";
    likelihoodExplanation =
      "Small, freestanding, ground-level decks under 100 sq ft may be exempt in some Florida jurisdictions. However, many cities still require at minimum a zoning review. Always confirm with your local building department.";
  }

  // ── Inspections ──
  const inspections: InspectionStep[] = [
    { name: "Permit Issued", description: "Building department reviews and approves your plans and issues the construction permit.", typical: true },
    { name: "Footing / Foundation Inspection", description: "Inspector verifies post holes, footing depth, concrete pours, and soil conditions before framing begins.", typical: true },
    { name: "Framing Inspection", description: "Inspector checks joists, beams, ledger connections, hurricane straps, and structural hardware before decking is installed.", typical: true },
  ];

  if (hasElectrical) {
    inspections.push({
      name: "Electrical Inspection",
      description: "Licensed electrician's work inspected for proper wiring, GFCI protection, weatherproof boxes, and code-compliant circuits.",
      typical: true,
    });
  }

  if (hasRoof && inputs.roofType === "solid-roof") {
    inspections.push({
      name: "Roof / Structure Inspection",
      description: "Inspector verifies roof framing, load connections, and wind-rated attachments for solid roof covers.",
      typical: true,
    });
  }

  inspections.push({
    name: "Final Inspection",
    description: "Complete review of the finished structure including railings, stairs, hardware, and overall code compliance. Must pass before use.",
    typical: true,
  });

  // ── Fees ──
  let feeRange: [number, number];
  if (city) {
    feeRange = isComplex ? city.complexPermitFeeRange : city.permitFeeRange;
  } else {
    feeRange = isComplex ? [400, 1000] : [150, 400];
  }

  // Add engineering cost for complex projects
  if (isComplex && (isElevated || isHigh || city?.isHVHZ)) {
    feeRange = [feeRange[0] + 500, feeRange[1] + 2000];
  }

  // ── Timeline ──
  const processingDays = city?.permitProcessingDays || [7, 30];
  const constructionWeeks: [number, number] = inputs.deckSize <= 200
    ? [1, 2]
    : inputs.deckSize <= 500
      ? [2, 4]
      : [4, 8];

  if (isComplex) {
    constructionWeeks[0] += 1;
    constructionWeeks[1] += 2;
  }

  const timeline = {
    permitProcessing: `${processingDays[0]}–${processingDays[1]} business days`,
    inspectionTimeline: `${inspections.length * 2}–${inspections.length * 5} business days between inspections`,
    constructionDuration: `${constructionWeeks[0]}–${constructionWeeks[1]} weeks typical`,
  };

  // ── Special Requirements ──
  const specialRequirements: string[] = [];

  if (city?.isHVHZ) {
    specialRequirements.push("HVHZ-compliant connectors and hurricane straps required (Simpson Strong-Tie or equivalent with NOA)");
    specialRequirements.push("All materials must carry a valid Miami-Dade Notice of Acceptance (NOA) number");
    specialRequirements.push("Digitally signed and sealed engineering drawings required");
  }

  if (city?.isCoastal) {
    specialRequirements.push("316 marine-grade stainless steel or hot-dipped galvanized hardware recommended for coastal properties");
  }

  if (inputs.hoaStatus === "yes" || inputs.hoaStatus === "not-sure") {
    specialRequirements.push("HOA architectural review and approval likely required before construction — submit plans to your HOA board first");
  }

  if (inputs.floodZone === "yes" || inputs.floodZone === "not-sure") {
    specialRequirements.push("Flood zone review required — deck may need to meet Base Flood Elevation (BFE) requirements");
  }

  if (isElevated || isHigh) {
    specialRequirements.push("Engineered structural drawings likely required for elevated or second-story decks");
  }

  if (inputs.attachment === "masonry") {
    specialRequirements.push("Masonry attachment requires specialized anchoring — expansion bolts or epoxy anchors per FBC requirements");
  }

  if (inputs.attachment === "stucco") {
    specialRequirements.push("Stucco wall attachment requires flashing behind stucco and proper moisture barrier installation");
  }

  if (inputs.roofType === "solid-roof") {
    specialRequirements.push("Solid roof covers may require separate roofing permit and additional wind-load engineering");
  }

  if (inputs.railingsRequired === "yes" || isElevated) {
    specialRequirements.push("Railings must be 36\" minimum height (42\" for commercial) with max 4\" baluster spacing per FBC R507.8");
  }

  // ── City-specific notes ──
  if (city?.specialNotes) {
    specialRequirements.push(...city.specialNotes);
  }

  // ── Common Mistakes ──
  const commonMistakes: string[] = [
    "Starting construction before the permit is issued — stop-work orders carry penalties of $500–$5,000/day",
    "Not scheduling inspections at each required phase — work covered before inspection must be uncovered at owner's expense",
  ];

  if (isAttached) {
    commonMistakes.push("Improper ledger board attachment — the #1 cause of deck collapses in Florida. Must use lag screws or through-bolts at 16\" on center per FBC R507.2");
  }

  if (city?.isHVHZ) {
    commonMistakes.push("Using non-NOA-approved materials in Miami-Dade or Broward — automatic inspection failure and material replacement required");
  }

  if (inputs.hoaStatus === "yes") {
    commonMistakes.push("Pulling a building permit without HOA approval first — some HOAs can require removal of non-approved structures");
  }

  if (city?.isCoastal) {
    commonMistakes.push("Using standard zinc-plated screws in coastal areas — they corrode within 2–5 years and can cause structural failure");
  }

  if (inputs.hasStairs && inputs.stairSteps >= 4) {
    commonMistakes.push("Stair handrail non-compliance — stairs with 4+ risers require graspable handrails (1.25\"–2\" diameter) on at least one side");
  }

  if (inputs.floodZone === "yes") {
    commonMistakes.push("Building below Base Flood Elevation — structures in flood zones must meet or exceed BFE, or face insurance and compliance issues");
  }

  // ── Risk Warnings ──
  const riskWarnings = [
    "Building without a permit can result in fines of $500–$5,000 per day in most Florida jurisdictions",
    "Unpermitted work may not be covered by homeowner's insurance in the event of storm damage or injury",
    "Unpermitted structures can trigger stop-work orders, forced demolition, and after-the-fact permit fees (typically 2x the standard fee)",
    "When selling your home, unpermitted work must be disclosed and can delay or kill a real estate transaction",
    "Failed inspections on unpermitted work can require complete tear-down and rebuild to current code standards",
  ];

  return {
    likelihood,
    likelihoodLabel,
    likelihoodExplanation,
    inspections,
    feeRange,
    timeline,
    specialRequirements,
    commonMistakes,
    riskWarnings,
  };
}

// ── Permit FAQ Data ────────────────────────────────────────────

export const permitFAQs = [
  {
    question: "Do decks require permits in Florida?",
    answer: "In most Florida jurisdictions, yes. Any deck that is attached to a house, elevated more than 30 inches above grade, or exceeds 200 square feet typically requires a building permit. Even smaller freestanding decks may require a zoning review. In High-Velocity Hurricane Zones (Miami-Dade and Broward), virtually all outdoor construction requires a permit with engineered plans.",
  },
  {
    question: "Do pergolas require permits in Florida?",
    answer: "Generally yes, if the pergola is attached to the house or has a solid roof cover. Open-air freestanding pergolas under 200 sq ft may be exempt in some counties, but most Florida jurisdictions require at minimum a zoning review. Pergolas with electrical (lighting, fans) always require a permit for the electrical component.",
  },
  {
    question: "How high can a deck be without a permit in Florida?",
    answer: "Most Florida counties require a permit for any deck over 30 inches above grade. Ground-level decks (under 12 inches) that are freestanding and under 200 sq ft may be exempt in some jurisdictions, but this varies significantly by county. Always check with your local building department — exemptions are not universal.",
  },
  {
    question: "What inspections are required for decks in Florida?",
    answer: "A typical Florida deck project requires 3–5 inspections: (1) Footing/foundation inspection before pouring concrete, (2) Framing inspection before installing decking, (3) Electrical inspection if wiring is involved, (4) Final inspection of the completed structure. Complex projects with roofs may require additional inspections. All inspections must pass before the deck can be used.",
  },
  {
    question: "How long does it take to get a deck permit in Florida?",
    answer: "Permit processing times vary widely: 5–14 business days in smaller inland counties (Ocala, Gainesville, Tallahassee), 7–21 days in mid-size markets (Tampa, Orlando, Jacksonville), and 14–45 days in complex jurisdictions (Miami-Dade, Fort Lauderdale). Engineering reviews and HVHZ compliance can add additional time.",
  },
  {
    question: "How much does a deck permit cost in Florida?",
    answer: "Basic deck permits in Florida range from $100–$800 depending on the city and project scope. Complex projects with engineering, HVHZ compliance, or solid roof covers can cost $500–$2,500+ in permit and engineering fees. Miami-Dade has the highest permit fees in the state due to mandatory engineering requirements.",
  },
  {
    question: "What happens if I build a deck without a permit in Florida?",
    answer: "Building without a permit in Florida can result in daily fines ($500–$5,000/day), stop-work orders, forced demolition, after-the-fact permit fees (typically double the standard fee), insurance claim denials, and complications when selling your home. The risks far outweigh the cost and time of proper permitting.",
  },
];

// ── Checklist Items ────────────────────────────────────────────

export const permitChecklist = [
  { step: 1, title: "Verify Local Permit Requirements", description: "Contact your city or county building department to confirm specific requirements for your project." },
  { step: 2, title: "Confirm HOA Rules", description: "If you live in an HOA community, submit your plans for architectural review before applying for a permit." },
  { step: 3, title: "Prepare a Site Plan", description: "Create a scaled drawing showing the deck location, property lines, setbacks, and existing structures." },
  { step: 4, title: "Confirm Structural Details", description: "Document footing sizes, joist spacing, beam spans, and post sizes per Florida Building Code tables." },
  { step: 5, title: "Verify Connectors & Materials", description: "Ensure all hardware (hurricane straps, joist hangers, fasteners) meets FBC requirements for your wind zone." },
  { step: 6, title: "Obtain Engineering (if required)", description: "For elevated, attached, or HVHZ decks, hire a licensed Florida PE to prepare sealed structural drawings." },
  { step: 7, title: "Submit Permit Application", description: "File your application with all required documents. Pay applicable fees and wait for approval." },
  { step: 8, title: "Schedule Inspections", description: "Call for inspections at each required phase — never cover work before it's been inspected and approved." },
  { step: 9, title: "Close Out the Permit", description: "After passing the final inspection, request the Certificate of Completion for your records." },
];
