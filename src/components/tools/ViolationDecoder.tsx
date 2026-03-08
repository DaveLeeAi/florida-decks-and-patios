import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import {
  AlertTriangle,
  Search,
  ShieldAlert,
  ShieldCheck,
  DollarSign,
  Wrench,
  ClipboardCheck,
  ArrowRight,
} from "lucide-react";

interface Violation {
  code: string;
  title: string;
  severity: "Critical" | "Moderate" | "Minor";
  explanation: string;
  howToFix: string[];
  costRange: string;
  reinspectionRequired: boolean;
  keywords: string[];
}

const VIOLATIONS: Violation[] = [
  {
    code: "FBC R507.2",
    title: "Ledger Board Connection Failure",
    severity: "Critical",
    explanation:
      "The deck ledger board is not properly attached to the house band joist. Florida Building Code requires through-bolts or lag screws at specific spacing (typically 1/2\" lag screws at 16\" OC staggered) with a minimum 1/2\" gap for drainage. Nails alone are never acceptable. This is the #1 cause of catastrophic deck collapses in Florida.",
    howToFix: [
      "Remove existing nails or under-spec fasteners",
      "Install 1/2\" hot-dipped galvanized or stainless steel lag screws at 16\" OC in a staggered pattern",
      "Verify band joist is structurally sound — sister if necessary",
      "Install code-compliant flashing above the ledger",
    ],
    costRange: "$800–$2,500",
    reinspectionRequired: true,
    keywords: ["ledger", "connection", "attachment", "collapse", "lag screw", "bolt"],
  },
  {
    code: "FBC R507.2.1",
    title: "Missing or Inadequate Ledger Flashing",
    severity: "Critical",
    explanation:
      "Flashing prevents water from entering the gap between the ledger board and the house sheathing. Missing or improperly installed flashing causes wood rot at the band joist — the most common source of hidden structural damage on Florida decks. FBC requires corrosion-resistant metal flashing that extends behind the house siding.",
    howToFix: [
      "Remove siding above the ledger to expose the attachment point",
      "Install self-adhering waterproof membrane over sheathing",
      "Install Z-flashing or drip-edge flashing behind siding and over ledger top",
      "Re-install siding with proper overlap and sealant",
    ],
    costRange: "$500–$1,800",
    reinspectionRequired: true,
    keywords: ["flashing", "water damage", "rot", "moisture", "siding", "waterproof"],
  },
  {
    code: "FBC R403.1",
    title: "Improper Footing Depth or Size",
    severity: "Critical",
    explanation:
      "Deck post footings must extend to a minimum depth determined by local frost line and soil bearing capacity. In most Florida counties, footings must be at least 12\" deep and 24\" in diameter for standard decks. Sandy coastal soils may require deeper footings or helical piers. Undersized footings cause settling, which leads to structural failure.",
    howToFix: [
      "Excavate existing footings to verify depth and size",
      "Pour new footings to code-required dimensions if undersized",
      "Consider helical piers in sandy or unstable soil conditions",
      "Install Simpson Strong-Tie post bases on new concrete footings",
    ],
    costRange: "$1,200–$4,000",
    reinspectionRequired: true,
    keywords: ["footing", "foundation", "depth", "pier", "concrete", "settling", "soil"],
  },
  {
    code: "FBC R802.11",
    title: "Missing Hurricane Straps or Ties",
    severity: "Critical",
    explanation:
      "Florida Building Code mandates hurricane straps or ties at every beam-to-post and joist-to-beam connection on attached decks. In wind zones above 130 mph (most of coastal Florida), engineered Simpson Strong-Tie H-series or equivalent connectors are required. Missing straps are one of the most common failed inspection items statewide.",
    howToFix: [
      "Install Simpson Strong-Tie H2.5A or equivalent hurricane ties at every joist-to-beam connection",
      "Add HD hold-downs at post-to-footing connections",
      "Use structural screws (not nails) for all connector installations",
      "Verify connector schedule matches the engineered plans",
    ],
    costRange: "$600–$2,000",
    reinspectionRequired: true,
    keywords: ["hurricane", "strap", "tie", "wind", "connector", "simpson", "strong-tie"],
  },
  {
    code: "FBC R312.1",
    title: "Guard Rail Height Violation",
    severity: "Moderate",
    explanation:
      "Any deck surface 30\" or more above grade requires a guard rail (also called a guardrail or railing). Florida Building Code requires a minimum height of 36\" for residential decks under 30\" above grade. For decks 30\"+ above grade, the minimum is 36\" (residential) — however, many Florida counties have adopted the 42\" IRC standard. Baluster spacing must not exceed 4\" to prevent child entrapment.",
    howToFix: [
      "Measure existing rail height from deck surface to top of rail",
      "Extend posts and install new top rail if height is deficient",
      "Check all baluster spacing — replace any sections exceeding 4\" gaps",
      "Verify post mounting meets lateral load requirements (200 lb)",
    ],
    costRange: "$400–$1,500",
    reinspectionRequired: true,
    keywords: ["railing", "rail", "height", "guard", "baluster", "spindle", "child safety"],
  },
  {
    code: "FBC R311.7",
    title: "Stair Riser/Tread Dimension Violation",
    severity: "Moderate",
    explanation:
      "Deck stairs must have a maximum riser height of 7-3/4\" and a minimum tread depth of 10\". The variation between the tallest and shortest riser cannot exceed 3/8\". Inconsistent riser heights are a leading cause of trip-and-fall injuries and are flagged in nearly 30% of Florida deck inspections.",
    howToFix: [
      "Measure all risers — identify any exceeding 7-3/4\" or varying by more than 3/8\"",
      "Rebuild stringer(s) with consistent rise/run calculations",
      "Ensure minimum 10\" tread depth on all steps",
      "Install code-compliant handrail with graspable profile (1-1/4\" to 2\" diameter)",
    ],
    costRange: "$500–$2,000",
    reinspectionRequired: true,
    keywords: ["stair", "step", "riser", "tread", "trip", "fall", "stringer"],
  },
  {
    code: "FBC R507.5",
    title: "Improper Joist Spacing or Span",
    severity: "Moderate",
    explanation:
      "Deck joists must be spaced and sized according to the span tables in the Florida Building Code. Common violations include 2×6 joists spanning more than 9'–9\" at 16\" OC, or 2×8 joists exceeding 13' spans. Overloaded joists cause bouncing, sagging, and eventual structural failure. Composite decking often requires 12\" OC maximum joist spacing.",
    howToFix: [
      "Verify joist size and spacing against FBC span tables",
      "Sister additional joists alongside under-spec members",
      "Add mid-span blocking for lateral stability",
      "If composite decking is installed, confirm manufacturer's joist spacing requirement (usually 12\" or 16\" OC)",
    ],
    costRange: "$800–$3,000",
    reinspectionRequired: true,
    keywords: ["joist", "spacing", "span", "sag", "bounce", "sister", "blocking"],
  },
  {
    code: "FBC 105.1",
    title: "Work Performed Without Permit",
    severity: "Critical",
    explanation:
      "Any deck over 200 sq ft, over 30\" above grade, or attached to the house requires a building permit in all Florida counties. Unpermitted deck work can result in forced demolition orders, fines of $500–$5,000 per day, insurance claim denials, and complications when selling the property. Florida statute 553.79 governs permit requirements.",
    howToFix: [
      "Stop all work immediately and contact the local building department",
      "Apply for an 'after-the-fact' permit (fees are typically double the standard permit fee)",
      "Hire a licensed engineer to certify the existing structure if required",
      "Schedule all required inspections — may require opening up finished work for access",
    ],
    costRange: "$1,500–$8,000+ (includes penalties)",
    reinspectionRequired: true,
    keywords: ["permit", "unpermitted", "no permit", "illegal", "fine", "demolition"],
  },
  {
    code: "NEC 210.8(F)",
    title: "Missing GFCI Protection on Outdoor Outlets",
    severity: "Moderate",
    explanation:
      "All outdoor receptacles on decks and patios must have Ground Fault Circuit Interrupter (GFCI) protection per the National Electrical Code (adopted by Florida). Outdoor lighting circuits on decks over 6 feet above grade also require GFCI protection. Missing GFCI protection on wet-location outlets is an electrocution hazard and automatic inspection failure.",
    howToFix: [
      "Install GFCI-protected receptacles or GFCI breakers for all outdoor deck circuits",
      "Ensure weatherproof in-use covers on all outdoor outlets",
      "Verify outdoor lighting circuits have appropriate protection",
      "Have work performed by a licensed Florida electrician",
    ],
    costRange: "$200–$800",
    reinspectionRequired: true,
    keywords: ["electrical", "GFCI", "outlet", "receptacle", "shock", "electrocution", "lighting"],
  },
  {
    code: "Miami-Dade HVHZ",
    title: "HVHZ Non-Compliant Materials (Miami-Dade/Broward)",
    severity: "Critical",
    explanation:
      "Properties within the High-Velocity Hurricane Zone (Miami-Dade and Broward counties) must use materials with a valid Notice of Acceptance (NOA) or Florida Product Approval. Standard building materials approved elsewhere in Florida are NOT automatically approved in HVHZ zones. Using non-NOA materials results in automatic permit denial and inspection failure.",
    howToFix: [
      "Verify all structural connectors carry valid Miami-Dade NOA numbers",
      "Replace any non-approved fasteners, hangers, or connectors with NOA-listed equivalents",
      "Confirm decking material has Florida Product Approval for HVHZ use",
      "Retain NOA documentation for final inspection — inspectors will request product numbers",
    ],
    costRange: "$1,000–$5,000",
    reinspectionRequired: true,
    keywords: ["HVHZ", "Miami-Dade", "Broward", "NOA", "hurricane zone", "product approval"],
  },
  {
    code: "FBC R401.4",
    title: "Drainage and Grading Violation",
    severity: "Minor",
    explanation:
      "The area beneath and around a deck must be graded to direct water away from the house foundation. Florida Building Code requires a minimum 6\" fall in the first 10 feet away from the foundation. Standing water under decks accelerates post deterioration, attracts termites, and can undermine footings in Florida's sandy soils.",
    howToFix: [
      "Re-grade soil beneath the deck to slope away from the foundation (minimum 6\" in 10')",
      "Install French drain or gravel drainage bed if re-grading is impractical",
      "Add landscape fabric beneath gravel to prevent weed growth and soil erosion",
      "Ensure downspouts and gutter discharge are directed away from the deck area",
    ],
    costRange: "$300–$1,500",
    reinspectionRequired: false,
    keywords: ["drainage", "grading", "water", "standing water", "slope", "foundation"],
  },
  {
    code: "FBC R507.3.1",
    title: "Missing Post-to-Beam Connection Hardware",
    severity: "Critical",
    explanation:
      "Posts must be positively connected to beams using approved metal connectors — not just toe-nailed or notched without hardware. Florida's wind loads require engineered connections that resist both uplift and lateral forces. A simple notched post with no hardware can fail under 80+ mph winds, well below Florida's minimum design wind speeds.",
    howToFix: [
      "Install Simpson Strong-Tie post caps (BC series) at every post-to-beam connection",
      "Replace any toe-nailed connections with bolted post cap assemblies",
      "Verify post cap load ratings meet or exceed the engineered design requirements",
      "Use structural screws or through-bolts — never pneumatic nails for structural connections",
    ],
    costRange: "$500–$1,800",
    reinspectionRequired: true,
    keywords: ["post", "beam", "connection", "hardware", "post cap", "notch", "uplift"],
  },
  {
    code: "FBC R507.6",
    title: "Deck Board Fastener Violation",
    severity: "Minor",
    explanation:
      "Deck boards must be fastened with corrosion-resistant screws appropriate for the board material and coastal exposure zone. Using standard zinc-plated screws in coastal areas or incompatible fasteners with ACQ-treated lumber causes premature fastener failure and board loosening. Composite manufacturers often require specific hidden fastener systems.",
    howToFix: [
      "Remove non-compliant fasteners and replace with approved alternatives",
      "Use stainless steel screws (316 grade within 3 miles of coast)",
      "Follow composite manufacturer's required fastener type and pattern",
      "Pre-drill hardwood boards to prevent splitting",
    ],
    costRange: "$200–$800",
    reinspectionRequired: false,
    keywords: ["fastener", "screw", "nail", "corrosion", "board", "loose"],
  },
  {
    code: "FBC R312.2",
    title: "Missing or Non-Graspable Handrail",
    severity: "Moderate",
    explanation:
      "All deck stairs with 4 or more risers require a graspable handrail. The handrail profile must be between 1-1/4\" and 2\" in diameter (circular) or provide an equivalent graspable shape. Flat 2×4 or 2×6 top rails do NOT qualify as graspable handrails. This is one of the most frequently cited violations on deck stair inspections in Florida.",
    howToFix: [
      "Install a code-compliant handrail with 1-1/4\" to 2\" graspable profile",
      "Handrail must be continuous from top riser to bottom riser",
      "Secure handrail brackets to structural posts — not to balusters",
      "Maintain 34\"–38\" height measured from stair nosing to top of handrail",
    ],
    costRange: "$300–$900",
    reinspectionRequired: true,
    keywords: ["handrail", "graspable", "stair rail", "grip", "2x4", "flat rail"],
  },
];

const severityConfig = {
  Critical: {
    color: "bg-destructive text-destructive-foreground",
    icon: ShieldAlert,
  },
  Moderate: {
    color: "bg-accent text-accent-foreground",
    icon: AlertTriangle,
  },
  Minor: {
    color: "bg-muted text-muted-foreground",
    icon: ShieldCheck,
  },
};

export default function ViolationDecoder() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return VIOLATIONS.filter(
      (v) =>
        v.code.toLowerCase().includes(q) ||
        v.title.toLowerCase().includes(q) ||
        v.keywords.some((k) => k.toLowerCase().includes(q)) ||
        v.explanation.toLowerCase().includes(q)
    );
  }, [query]);

  const showAll = query.trim() === "";

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <div className="flex items-center gap-3">
          <ShieldAlert className="h-6 w-6 text-primary" />
          <CardTitle className="font-heading text-2xl text-foreground">
            Florida Building Code Violation Decoder
          </CardTitle>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Enter a violation code (e.g., R507.2) or keyword (e.g., "railing height") to get a plain-English explanation, repair steps, and cost estimate.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by code (R507.2) or keyword (hurricane strap, railing, permit)…"
            className="pl-10"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/* Results */}
        {query.trim() && results.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-6">
            No violations found for "{query}". Try a different code or keyword.
          </p>
        )}

        {showAll && (
          <div className="text-center py-4">
            <p className="text-sm text-muted-foreground mb-3">
              Browse all {VIOLATIONS.length} common Florida deck &amp; patio code violations, or type above to search.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {["ledger", "hurricane", "railing", "permit", "footing", "stair"].map((kw) => (
                <button
                  key={kw}
                  onClick={() => setQuery(kw)}
                  className="text-xs px-3 py-1.5 rounded-full border border-border bg-muted text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  {kw}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-4">
          {results.map((v) => {
            const sev = severityConfig[v.severity];
            const SevIcon = sev.icon;
            return (
              <div
                key={v.code}
                className="rounded-lg border border-border bg-card p-5 space-y-4"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                  <Badge className={sev.color}>
                    <SevIcon className="h-3 w-3 mr-1" />
                    {v.severity}
                  </Badge>
                  <div className="flex-1">
                    <h3 className="font-heading font-bold text-foreground text-lg">
                      {v.code} — {v.title}
                    </h3>
                  </div>
                </div>

                {/* Explanation */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {v.explanation}
                </p>

                {/* Fix Steps */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Wrench className="h-4 w-4 text-primary" />
                    <span className="text-sm font-semibold text-foreground">How to Fix</span>
                  </div>
                  <ol className="list-decimal list-inside space-y-1 text-sm text-foreground">
                    {v.howToFix.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ol>
                </div>

                {/* Meta row */}
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-1.5 text-foreground">
                    <DollarSign className="h-4 w-4 text-primary" />
                    <span>
                      <strong>Estimated Cost:</strong> {v.costRange}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-foreground">
                    <ClipboardCheck className="h-4 w-4 text-primary" />
                    <span>
                      <strong>Re-inspection:</strong>{" "}
                      {v.reinspectionRequired ? "Required" : "Not required"}
                    </span>
                  </div>
                </div>

                {/* CTA */}
                <Button asChild className="w-full sm:w-auto">
                  <Link to="/contact">
                    Get a Free Inspection <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
