// ═══════════════════════════════════════════════════════════════
// Florida Deck Cost Estimator — Rules Engine
// ═══════════════════════════════════════════════════════════════

export interface CostCity {
  id: string;
  name: string;
  region: string;
  laborMultiplier: number;
  permitFeeRange: [number, number];
  isCoastal: boolean;
  isHVHZ: boolean;
}

export interface CostInputs {
  cityId: string;
  deckSize: number;
  material: "pressure-treated" | "cedar" | "composite" | "premium-composite" | "pvc" | "hardwood";
  height: "ground" | "low" | "elevated" | "second-story";
  hasStairs: boolean;
  stairSteps: number;
  hasRailing: boolean;
  railingType: "wood" | "composite" | "cable" | "glass";
  roofType: "none" | "pergola" | "solid-roof";
  electrical: "none" | "lighting" | "outlets-fans";
}

export interface CostBreakdown {
  materialCost: { label: string; low: number; high: number };
  laborCost: { label: string; low: number; high: number };
  permitCost: { label: string; low: number; high: number };
  stairsCost: { label: string; low: number; high: number } | null;
  railingCost: { label: string; low: number; high: number } | null;
  roofCost: { label: string; low: number; high: number } | null;
  electricalCost: { label: string; low: number; high: number } | null;
  engineeringCost: { label: string; low: number; high: number } | null;
  hardwareCost: { label: string; low: number; high: number };
  totalLow: number;
  totalHigh: number;
}

export interface CostResult {
  breakdown: CostBreakdown;
  timeline: {
    permitWeeks: string;
    constructionWeeks: string;
    totalWeeks: string;
  };
  materialNotes: string[];
  tips: string[];
}

// ── City Data ──────────────────────────────────────────────────

export const costCities: CostCity[] = [
  { id: "miami", name: "Miami", region: "SE Florida", laborMultiplier: 1.35, permitFeeRange: [400, 2500], isCoastal: true, isHVHZ: true },
  { id: "fort-lauderdale", name: "Fort Lauderdale", region: "SE Florida", laborMultiplier: 1.3, permitFeeRange: [350, 2000], isCoastal: true, isHVHZ: true },
  { id: "tampa", name: "Tampa", region: "Central West", laborMultiplier: 1.0, permitFeeRange: [200, 800], isCoastal: false, isHVHZ: false },
  { id: "orlando", name: "Orlando", region: "Central", laborMultiplier: 0.95, permitFeeRange: [150, 600], isCoastal: false, isHVHZ: false },
  { id: "jacksonville", name: "Jacksonville", region: "NE Florida", laborMultiplier: 0.88, permitFeeRange: [150, 600], isCoastal: true, isHVHZ: false },
  { id: "st-petersburg", name: "St. Petersburg", region: "Tampa Bay", laborMultiplier: 1.05, permitFeeRange: [200, 900], isCoastal: true, isHVHZ: false },
  { id: "sarasota", name: "Sarasota", region: "SW Florida", laborMultiplier: 1.15, permitFeeRange: [250, 1000], isCoastal: true, isHVHZ: false },
  { id: "naples", name: "Naples", region: "SW Florida", laborMultiplier: 1.2, permitFeeRange: [300, 1200], isCoastal: true, isHVHZ: false },
  { id: "palm-beach", name: "Palm Beach", region: "SE Florida", laborMultiplier: 1.25, permitFeeRange: [300, 1500], isCoastal: true, isHVHZ: false },
  { id: "tallahassee", name: "Tallahassee", region: "N Florida", laborMultiplier: 0.82, permitFeeRange: [100, 500], isCoastal: false, isHVHZ: false },
  { id: "st-augustine", name: "St. Augustine", region: "NE Florida", laborMultiplier: 0.92, permitFeeRange: [175, 700], isCoastal: true, isHVHZ: false },
  { id: "daytona-beach", name: "Daytona Beach", region: "Central East", laborMultiplier: 0.9, permitFeeRange: [150, 650], isCoastal: true, isHVHZ: false },
  { id: "pensacola", name: "Pensacola", region: "Panhandle", laborMultiplier: 0.85, permitFeeRange: [150, 700], isCoastal: true, isHVHZ: false },
  { id: "lakeland", name: "Lakeland", region: "Central", laborMultiplier: 0.88, permitFeeRange: [125, 550], isCoastal: false, isHVHZ: false },
  { id: "cape-coral", name: "Cape Coral", region: "SW Florida", laborMultiplier: 1.1, permitFeeRange: [200, 900], isCoastal: true, isHVHZ: false },
  { id: "clearwater", name: "Clearwater", region: "Tampa Bay", laborMultiplier: 1.05, permitFeeRange: [200, 850], isCoastal: true, isHVHZ: false },
  { id: "gainesville", name: "Gainesville", region: "N Central", laborMultiplier: 0.82, permitFeeRange: [100, 500], isCoastal: false, isHVHZ: false },
  { id: "ocala", name: "Ocala", region: "N Central", laborMultiplier: 0.78, permitFeeRange: [100, 500], isCoastal: false, isHVHZ: false },
  { id: "bradenton", name: "Bradenton", region: "SW Florida", laborMultiplier: 1.05, permitFeeRange: [200, 800], isCoastal: true, isHVHZ: false },
  { id: "port-st-lucie", name: "Port St. Lucie", region: "Treasure Coast", laborMultiplier: 1.0, permitFeeRange: [200, 800], isCoastal: true, isHVHZ: false },
];

// ── Material Rates (per sq ft, materials only) ─────────────────

const MATERIAL_RATES: Record<CostInputs["material"], { low: number; high: number; label: string }> = {
  "pressure-treated": { low: 8, high: 16, label: "Pressure-Treated Pine" },
  "cedar": { low: 14, high: 24, label: "Western Red Cedar" },
  "composite": { low: 18, high: 32, label: "Capped Composite" },
  "premium-composite": { low: 28, high: 45, label: "Premium Composite (TimberTech/Trex)" },
  "pvc": { low: 30, high: 48, label: "PVC Decking (AZEK)" },
  "hardwood": { low: 35, high: 60, label: "Ipe / Brazilian Hardwood" },
};

// ── Labor Base Rates (per sq ft) ───────────────────────────────

const LABOR_BASE: Record<CostInputs["height"], { low: number; high: number }> = {
  "ground": { low: 10, high: 16 },
  "low": { low: 14, high: 20 },
  "elevated": { low: 18, high: 28 },
  "second-story": { low: 25, high: 40 },
};

// ── Railing Costs (per linear foot) ────────────────────────────

const RAILING_RATES: Record<CostInputs["railingType"], { low: number; high: number; label: string }> = {
  "wood": { low: 25, high: 45, label: "Wood Railing" },
  "composite": { low: 40, high: 70, label: "Composite Railing" },
  "cable": { low: 60, high: 110, label: "Cable Railing" },
  "glass": { low: 100, high: 180, label: "Glass Panel Railing" },
};

// ── Main Estimator ─────────────────────────────────────────────

export function calculateDeckCost(inputs: CostInputs): CostResult {
  const city = costCities.find((c) => c.id === inputs.cityId);
  const laborMult = city?.laborMultiplier ?? 1.0;

  // Material cost
  const mat = MATERIAL_RATES[inputs.material];
  const materialCost = {
    label: mat.label,
    low: Math.round(mat.low * inputs.deckSize),
    high: Math.round(mat.high * inputs.deckSize),
  };

  // Labor cost
  const labor = LABOR_BASE[inputs.height];
  const laborCost = {
    label: `Installation labor (${city?.name || "Florida"} rates)`,
    low: Math.round(labor.low * inputs.deckSize * laborMult),
    high: Math.round(labor.high * inputs.deckSize * laborMult),
  };

  // Hardware (fasteners, connectors, hurricane straps)
  const hwMultiplier = city?.isCoastal ? 1.4 : 1.0;
  const hvhzMultiplier = city?.isHVHZ ? 1.6 : 1.0;
  const hardwareCost = {
    label: `Hardware & connectors${city?.isCoastal ? " (marine-grade)" : ""}`,
    low: Math.round(inputs.deckSize * 3 * hwMultiplier * hvhzMultiplier),
    high: Math.round(inputs.deckSize * 6 * hwMultiplier * hvhzMultiplier),
  };

  // Permit cost
  const isComplex = inputs.height === "elevated" || inputs.height === "second-story" || inputs.roofType !== "none" || inputs.electrical !== "none" || inputs.deckSize > 500;
  const permitRange = city?.permitFeeRange || [150, 800];
  const permitCost = {
    label: "Permit fees",
    low: isComplex ? Math.round(permitRange[0] * 1.5) : permitRange[0],
    high: isComplex ? permitRange[1] : Math.round(permitRange[1] * 0.6),
  };

  // Stairs
  let stairsCost: CostBreakdown["stairsCost"] = null;
  if (inputs.hasStairs) {
    const perStep = inputs.material === "pressure-treated" || inputs.material === "cedar" ? 120 : 200;
    const steps = inputs.stairSteps || 4;
    stairsCost = {
      label: `Stairs (${steps} steps)`,
      low: Math.round(steps * perStep * 0.8),
      high: Math.round(steps * perStep * 1.3 * laborMult),
    };
  }

  // Railing
  let railingCost: CostBreakdown["railingCost"] = null;
  if (inputs.hasRailing) {
    const perimeter = Math.round(Math.sqrt(inputs.deckSize) * 3.2); // rough perimeter estimate
    const rail = RAILING_RATES[inputs.railingType];
    railingCost = {
      label: `${rail.label} (~${perimeter} linear ft)`,
      low: Math.round(perimeter * rail.low),
      high: Math.round(perimeter * rail.high),
    };
  }

  // Roof/Pergola
  let roofCost: CostBreakdown["roofCost"] = null;
  if (inputs.roofType === "pergola") {
    roofCost = { label: "Open Pergola", low: Math.round(inputs.deckSize * 12), high: Math.round(inputs.deckSize * 25 * laborMult) };
  } else if (inputs.roofType === "solid-roof") {
    roofCost = { label: "Solid Roof Cover", low: Math.round(inputs.deckSize * 25), high: Math.round(inputs.deckSize * 50 * laborMult) };
  }

  // Electrical
  let electricalCost: CostBreakdown["electricalCost"] = null;
  if (inputs.electrical === "lighting") {
    electricalCost = { label: "Deck Lighting", low: 800, high: 2500 };
  } else if (inputs.electrical === "outlets-fans") {
    electricalCost = { label: "Outlets, Fans & Lighting", low: 2000, high: 5500 };
  }

  // Engineering
  let engineeringCost: CostBreakdown["engineeringCost"] = null;
  if (inputs.height === "elevated" || inputs.height === "second-story" || city?.isHVHZ) {
    engineeringCost = {
      label: `Structural engineering${city?.isHVHZ ? " (HVHZ sealed plans)" : ""}`,
      low: city?.isHVHZ ? 1500 : 500,
      high: city?.isHVHZ ? 3500 : 2000,
    };
  }

  // Totals
  const items = [materialCost, laborCost, hardwareCost, permitCost, stairsCost, railingCost, roofCost, electricalCost, engineeringCost];
  const totalLow = items.reduce((sum, item) => sum + (item?.low || 0), 0);
  const totalHigh = items.reduce((sum, item) => sum + (item?.high || 0), 0);

  const breakdown: CostBreakdown = {
    materialCost, laborCost, permitCost, stairsCost, railingCost, roofCost, electricalCost, engineeringCost, hardwareCost, totalLow, totalHigh,
  };

  // Timeline
  const permitWeeksLow = Math.ceil((city?.permitFeeRange ? 7 : 14) / 7);
  const permitWeeksHigh = Math.ceil((city?.isHVHZ ? 45 : 21) / 7);
  const constWeeks: [number, number] = inputs.deckSize <= 200 ? [1, 2] : inputs.deckSize <= 500 ? [2, 4] : [4, 8];
  if (isComplex) { constWeeks[0] += 1; constWeeks[1] += 2; }

  const timeline = {
    permitWeeks: `${permitWeeksLow}–${permitWeeksHigh} weeks`,
    constructionWeeks: `${constWeeks[0]}–${constWeeks[1]} weeks`,
    totalWeeks: `${permitWeeksLow + constWeeks[0]}–${permitWeeksHigh + constWeeks[1]} weeks`,
  };

  // Material Notes
  const materialNotes: string[] = [];
  if (inputs.material === "pressure-treated") {
    materialNotes.push("Pressure-treated pine requires annual sealing/staining (30–40 hours) and typically lasts 10–15 years in Florida's climate.");
    materialNotes.push("Budget for replacement deck boards within 10 years — cracking and warping are common in Florida heat.");
  }
  if (inputs.material === "composite" || inputs.material === "premium-composite") {
    materialNotes.push("Composite decking lasts 25–50 years with minimal maintenance (2–4 hours/year soap-and-water cleaning).");
    materialNotes.push("Choose lighter colors in Florida — dark composite can reach 150°F+ in direct sun.");
  }
  if (inputs.material === "pvc") {
    materialNotes.push("PVC is the top pick for coastal Florida — zero moisture absorption and complete salt resistance.");
  }
  if (inputs.material === "hardwood") {
    materialNotes.push("Ipe hardwood is stunning but requires specialized installation and 8–15 hours/year of oiling to prevent graying.");
  }
  if (city?.isCoastal) {
    materialNotes.push("Coastal location: 316 marine-grade stainless steel hardware is required to prevent salt-air corrosion.");
  }
  if (city?.isHVHZ) {
    materialNotes.push("HVHZ zone: All materials must carry a Miami-Dade NOA (Notice of Acceptance) number.");
  }

  // Tips
  const tips: string[] = [
    "Get at least 3 quotes from licensed contractors — prices vary 20–40% between companies.",
    "Ask to see the contractor's license, insurance, and recent project photos before signing.",
    "Never pay more than 30% upfront — standard payment schedules are 30% deposit, 30% at framing, 40% at completion.",
  ];
  if (inputs.material === "pressure-treated") {
    tips.push("Consider composite for long-term savings — the 25-year total cost of ownership is often lower than wood due to maintenance savings.");
  }
  if (inputs.deckSize > 400) {
    tips.push("For larger decks, ask about phased construction to spread costs over time.");
  }

  return { breakdown, timeline, materialNotes, tips };
}
