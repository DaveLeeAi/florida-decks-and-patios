import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Palette, ArrowRight, ArrowLeft, Lightbulb, DollarSign, Star, Sparkles, TreePine, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

const SIZES = [
  { id: "small", label: "Small (100–200 sq ft)", desc: "Intimate bistro or reading nook" },
  { id: "medium", label: "Medium (200–400 sq ft)", desc: "Entertaining & grilling space" },
  { id: "large", label: "Large (400–700 sq ft)", desc: "Multi-zone outdoor living" },
  { id: "xlarge", label: "Extra Large (700+ sq ft)", desc: "Full outdoor room with zones" },
] as const;

const STYLES = [
  { id: "modern", label: "Modern Minimalist", icon: "◻", desc: "Clean lines, neutral tones, hidden fasteners" },
  { id: "tropical", label: "Tropical Resort", icon: "🌴", desc: "Lush plantings, natural materials, shade features" },
  { id: "coastal", label: "Coastal Casual", icon: "🌊", desc: "Light colors, cable railing, salt-resistant" },
  { id: "traditional", label: "Classic Traditional", icon: "🏛", desc: "Turned balusters, stained wood, symmetrical" },
  { id: "rustic", label: "Rustic Retreat", icon: "🪵", desc: "Natural textures, stone accents, earthy tones" },
  { id: "entertainer", label: "Entertainer's Dream", icon: "🎉", desc: "Built-in seating, bar area, lighting" },
] as const;

const BUDGETS = [
  { id: "economy", label: "Budget-Friendly", range: "$5,000–$15,000", desc: "Pressure-treated wood, basic design" },
  { id: "mid", label: "Mid-Range", range: "$15,000–$35,000", desc: "Composite decking, some upgrades" },
  { id: "premium", label: "Premium", range: "$35,000–$60,000", desc: "Premium composite, custom features" },
  { id: "luxury", label: "Luxury", range: "$60,000+", desc: "Hardwood or PVC, full outdoor living" },
] as const;

const MATERIALS_OPTIONS = [
  { id: "pressure-treated", label: "Pressure-Treated Wood" },
  { id: "composite", label: "Composite (Trex, TimberTech)" },
  { id: "pvc", label: "PVC Decking" },
  { id: "hardwood", label: "Hardwood (Ipe, Cumaru)" },
  { id: "unsure", label: "Not sure yet" },
] as const;

const FEATURES = [
  { id: "stairs", label: "Stairs / Multi-level" },
  { id: "railing", label: "Railing System" },
  { id: "pergola", label: "Pergola / Shade" },
  { id: "lighting", label: "Deck Lighting" },
  { id: "kitchen", label: "Outdoor Kitchen Area" },
  { id: "seating", label: "Built-in Seating" },
  { id: "planter", label: "Built-in Planters" },
  { id: "hottub", label: "Hot Tub Pad" },
  { id: "privacy", label: "Privacy Screen" },
  { id: "fire", label: "Fire Pit Area" },
] as const;

interface Inputs {
  size: string;
  style: string;
  budget: string;
  material: string;
  features: string[];
}

interface DesignIdea {
  title: string;
  description: string;
  features: string[];
  materialRec: string;
  costRange: string;
  tip: string;
}

function generateIdeas(inputs: Inputs): DesignIdea[] {
  const ideas: DesignIdea[] = [];
  const style = STYLES.find(s => s.id === inputs.style);
  const size = SIZES.find(s => s.id === inputs.size);
  const budget = BUDGETS.find(b => b.id === inputs.budget);
  const hasFeature = (f: string) => inputs.features.includes(f);

  // Primary recommendation
  const primary: DesignIdea = {
    title: `${style?.label || "Custom"} ${size?.id === "small" ? "Retreat" : size?.id === "xlarge" ? "Outdoor Living Suite" : "Deck"}`,
    description: getMainDescription(inputs),
    features: getRecommendedFeatures(inputs),
    materialRec: getMaterialRecommendation(inputs),
    costRange: budget?.range || "$15,000–$35,000",
    tip: getProTip(inputs),
  };
  ideas.push(primary);

  // Alternative: upgrade version
  if (inputs.budget !== "luxury") {
    ideas.push({
      title: `Upgraded ${style?.label || ""} Package`,
      description: `Take your ${style?.label?.toLowerCase()} design to the next level with premium materials and additional features that maximize your outdoor living space.`,
      features: getUpgradeFeatures(inputs),
      materialRec: getUpgradeMaterial(inputs),
      costRange: getUpgradeCost(inputs),
      tip: "Investing in composite or PVC materials saves $4,500+ in maintenance costs over 10 years compared to pressure-treated wood.",
    });
  }

  // Alternative: Florida-optimized
  ideas.push({
    title: "Florida Climate-Optimized Design",
    description: "Engineered specifically for Florida's humidity, UV exposure, and storm season. Every material and detail chosen for maximum longevity in subtropical conditions.",
    features: [
      "Light-colored capped composite (cooler barefoot temps)",
      "316 stainless steel fasteners for humidity resistance",
      "Sloped framing for water drainage",
      hasFeature("pergola") ? "Hurricane-rated pergola with removable shade panels" : "Integrated shade sail anchor points",
      "Hidden fastener system (no surface screws to corrode)",
      "Ground-level ventilation gaps for airflow",
    ],
    materialRec: "Trex Transcend or TimberTech PRO in a light color (Island Mist, Foggy Wharf). These capped composites resist mold, UV, and moisture — critical for Florida.",
    costRange: inputs.budget === "economy" ? "$12,000–$22,000" : inputs.budget === "mid" ? "$22,000–$40,000" : "$40,000–$75,000",
    tip: "In Florida, lighter deck board colors stay 20–30°F cooler underfoot than dark colors. This matters more here than anywhere else in the US.",
  });

  return ideas;
}

function getMainDescription(inputs: Inputs): string {
  const styleDescs: Record<string, string> = {
    modern: "A sleek, contemporary deck with clean horizontal lines, minimal visible hardware, and a monochromatic color palette. Picture-frame border detail and flush-mount lighting create an upscale look.",
    tropical: "A lush outdoor retreat surrounded by tropical plantings with natural-toned decking that blends into the landscape. Pergola with climbing vines provides dappled shade.",
    coastal: "A breezy, light-toned deck designed to complement waterfront or near-coastal living. Cable railing preserves views while meeting Florida code. Salt-resistant hardware throughout.",
    traditional: "A classic, symmetrical deck with turned wood or composite balusters, warm-toned stain, and a timeless design that enhances your home's curb appeal.",
    rustic: "An earthy, textured deck combining natural wood tones with stone accents. Rough-hewn post details and warm lighting create a cabin-retreat atmosphere — Florida style.",
    entertainer: "A party-ready outdoor space with distinct zones for grilling, dining, and lounging. Built-in bar counter, integrated speakers, and ambient lighting set the stage.",
  };
  return styleDescs[inputs.style] || "A custom-designed deck tailored to your preferences, budget, and Florida's unique climate requirements.";
}

function getRecommendedFeatures(inputs: Inputs): string[] {
  const features: string[] = [];
  const hasFeature = (f: string) => inputs.features.includes(f);

  if (hasFeature("stairs")) features.push("Multi-level layout with code-compliant stairs and landing");
  if (hasFeature("railing")) features.push("Railing system matching your deck style (required for decks 30\"+ above grade)");
  if (hasFeature("pergola")) features.push("Attached pergola for shade — check permit requirements in your city");
  if (hasFeature("lighting")) features.push("Integrated LED deck lighting (post caps, stair risers, and perimeter)");
  if (hasFeature("kitchen")) features.push("Outdoor kitchen zone with countertop space and utility connections");
  if (hasFeature("seating")) features.push("Built-in bench seating with hidden storage underneath");
  if (hasFeature("planter")) features.push("Integrated planter boxes with drainage for tropical plants");
  if (hasFeature("hottub")) features.push("Reinforced hot tub pad (engineered for load — may require permit)");
  if (hasFeature("privacy")) features.push("Privacy screen or lattice panel — check HOA rules first");
  if (hasFeature("fire")) features.push("Fire pit area with non-combustible pad and proper clearances");

  if (features.length < 3) {
    features.push("Picture-frame border detail for a finished look");
    features.push("Hidden fastener system for clean surface");
  }

  return features;
}

function getMaterialRecommendation(inputs: Inputs): string {
  const recs: Record<string, string> = {
    "pressure-treated": "Pressure-treated Southern Yellow Pine (#1 grade). Budget-friendly but requires annual sealing in Florida. Expect 10–15 year lifespan with proper maintenance.",
    composite: "Capped composite decking (Trex Transcend or TimberTech PRO). Best value for Florida — resists humidity, mold, and UV with minimal maintenance. 25-year warranty typical.",
    pvc: "PVC cellular decking (TimberTech AZEK or similar). Zero moisture absorption makes it ideal for coastal or poolside. Won't splinter, crack, or support mold growth.",
    hardwood: "Tropical hardwood (Ipe or Cumaru). The most beautiful and durable option — naturally resists rot, insects, and fire. Extremely dense; requires specialized installation.",
    unsure: "We recommend capped composite for most Florida homeowners. It balances cost, durability, and low maintenance. Use our Cost Estimator to compare material pricing.",
  };
  return recs[inputs.material] || recs.unsure;
}

function getProTip(inputs: Inputs): string {
  if (inputs.features.includes("hottub")) return "Hot tubs weigh 3,000–6,000 lbs when filled. Florida code requires engineered plans for this load. Budget $1,500–$3,000 for structural engineering.";
  if (inputs.features.includes("kitchen")) return "Outdoor kitchens near the house may require a separate permit and gas line inspection. Plan utility runs before deck framing begins.";
  if (inputs.style === "coastal") return "Within 5 miles of salt water, all fasteners and connectors must be 316 marine-grade stainless steel. This adds 15–25% to hardware costs but prevents premature failure.";
  if (inputs.size === "xlarge") return "Large decks (700+ sq ft) almost always require engineered plans in Florida. Budget $2,000–$4,000 for structural engineering and sealed drawings.";
  return "Get at least 3 quotes from licensed Florida contractors. Verify their license at myfloridalicense.com and confirm they pull permits for every project.";
}

function getUpgradeFeatures(inputs: Inputs): string[] {
  const base = getRecommendedFeatures(inputs);
  return [
    ...base,
    "Upgraded to hidden fastener system",
    "Premium post cap lighting",
    "Composite or cable railing upgrade",
  ];
}

function getUpgradeMaterial(inputs: Inputs): string {
  if (inputs.material === "pressure-treated") return "Upgrade to composite: Save 30–40 hours of annual maintenance and gain a 25-year warranty. The 10-year cost of ownership is often lower than wood.";
  if (inputs.material === "composite") return "Upgrade to premium PVC decking for zero moisture absorption and a lifetime fade warranty. Ideal for pool surrounds and coastal locations.";
  return "Consider TimberTech AZEK Vintage collection — the most realistic wood-look PVC on the market with lifetime structural and fade warranties.";
}

function getUpgradeCost(inputs: Inputs): string {
  if (inputs.budget === "economy") return "$15,000–$30,000";
  if (inputs.budget === "mid") return "$35,000–$55,000";
  return "$60,000–$90,000";
}

const STEPS = ["Size", "Style", "Budget & Material", "Features"];

export default function DesignIdeaGenerator() {
  const [step, setStep] = useState(0);
  const [inputs, setInputs] = useState<Inputs>({
    size: "",
    style: "",
    budget: "",
    material: "",
    features: [],
  });
  const [results, setResults] = useState<DesignIdea[] | null>(null);

  const canNext = () => {
    if (step === 0) return !!inputs.size;
    if (step === 1) return !!inputs.style;
    if (step === 2) return !!inputs.budget && !!inputs.material;
    return true;
  };

  const handleGenerate = () => {
    setResults(generateIdeas(inputs));
  };

  const toggleFeature = (id: string) => {
    setInputs(prev => ({
      ...prev,
      features: prev.features.includes(id)
        ? prev.features.filter(f => f !== id)
        : [...prev.features, id],
    }));
  };

  const reset = () => {
    setStep(0);
    setInputs({ size: "", style: "", budget: "", material: "", features: [] });
    setResults(null);
  };

  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 font-heading text-xl md:text-2xl text-foreground">
          <div className="p-2 bg-accent/10 rounded-lg">
            <Palette className="h-6 w-6 text-accent" />
          </div>
          Deck Design Idea Generator
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Answer a few questions and get personalized deck design ideas with features, materials, and cost estimates for Florida.
        </p>
      </CardHeader>

      <CardContent>
        {!results ? (
          <>
            {/* Progress */}
            <div className="mb-6">
              <div className="flex justify-between text-xs text-muted-foreground mb-2">
                {STEPS.map((s, i) => (
                  <span key={s} className={i <= step ? "text-primary font-semibold" : ""}>{s}</span>
                ))}
              </div>
              <Progress value={((step + 1) / STEPS.length) * 100} className="h-2" />
            </div>

            {/* Step 0: Size */}
            {step === 0 && (
              <div className="space-y-3">
                <h3 className="font-heading font-semibold text-foreground">What size deck are you envisioning?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SIZES.map(s => (
                    <button
                      key={s.id}
                      onClick={() => setInputs(p => ({ ...p, size: s.id }))}
                      className={`p-4 rounded-lg border text-left transition-all ${inputs.size === s.id ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-border hover:border-primary/30"}`}
                    >
                      <p className="font-semibold text-sm text-foreground">{s.label}</p>
                      <p className="text-xs text-muted-foreground mt-1">{s.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 1: Style */}
            {step === 1 && (
              <div className="space-y-3">
                <h3 className="font-heading font-semibold text-foreground">What style speaks to you?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {STYLES.map(s => (
                    <button
                      key={s.id}
                      onClick={() => setInputs(p => ({ ...p, style: s.id }))}
                      className={`p-4 rounded-lg border text-left transition-all ${inputs.style === s.id ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-border hover:border-primary/30"}`}
                    >
                      <p className="font-semibold text-sm text-foreground">{s.icon} {s.label}</p>
                      <p className="text-xs text-muted-foreground mt-1">{s.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Budget & Material */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="space-y-3">
                  <h3 className="font-heading font-semibold text-foreground">What's your budget range?</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {BUDGETS.map(b => (
                      <button
                        key={b.id}
                        onClick={() => setInputs(p => ({ ...p, budget: b.id }))}
                        className={`p-4 rounded-lg border text-left transition-all ${inputs.budget === b.id ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-border hover:border-primary/30"}`}
                      >
                        <p className="font-semibold text-sm text-foreground">{b.label}</p>
                        <p className="text-xs text-accent font-medium">{b.range}</p>
                        <p className="text-xs text-muted-foreground mt-1">{b.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="font-heading font-semibold text-foreground">Preferred material?</h3>
                  <div className="flex flex-wrap gap-2">
                    {MATERIALS_OPTIONS.map(m => (
                      <button
                        key={m.id}
                        onClick={() => setInputs(p => ({ ...p, material: m.id }))}
                        className={`px-4 py-2 rounded-lg border text-sm transition-all ${inputs.material === m.id ? "border-primary bg-primary/5 text-primary font-semibold" : "border-border text-foreground hover:border-primary/30"}`}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Features */}
            {step === 3 && (
              <div className="space-y-3">
                <h3 className="font-heading font-semibold text-foreground">Select features you're interested in</h3>
                <p className="text-xs text-muted-foreground">Choose as many as you'd like — or skip to generate ideas.</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {FEATURES.map(f => (
                    <button
                      key={f.id}
                      onClick={() => toggleFeature(f.id)}
                      className={`px-3 py-2.5 rounded-lg border text-sm transition-all ${inputs.features.includes(f.id) ? "border-primary bg-primary/5 text-primary font-semibold" : "border-border text-foreground hover:border-primary/30"}`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={() => setStep(s => s - 1)}
                disabled={step === 0}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </Button>
              {step < STEPS.length - 1 ? (
                <Button onClick={() => setStep(s => s + 1)} disabled={!canNext()} className="gap-2">
                  Next <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button onClick={handleGenerate} className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90 font-bold">
                  <Sparkles className="h-4 w-4" /> Generate Design Ideas
                </Button>
              )}
            </div>
          </>
        ) : (
          /* Results */
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-heading text-lg font-bold text-foreground flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-accent" /> Your Design Ideas
              </h3>
              <Button variant="outline" size="sm" onClick={reset}>Start Over</Button>
            </div>

            {results.map((idea, i) => (
              <div key={i} className={`rounded-xl border p-5 md:p-6 ${i === 0 ? "border-primary bg-primary/5" : "border-border bg-card"}`}>
                {i === 0 && (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded mb-3">
                    <Star className="h-3 w-3" /> Top Recommendation
                  </span>
                )}
                <h4 className="font-heading font-bold text-foreground text-lg mb-2">{idea.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{idea.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs font-semibold text-foreground mb-2 flex items-center gap-1">
                      <Lightbulb className="h-3.5 w-3.5 text-accent" /> Recommended Features
                    </p>
                    <ul className="space-y-1.5">
                      {idea.features.map((f, j) => (
                        <li key={j} className="text-xs text-muted-foreground flex items-start gap-1.5">
                          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-foreground mb-2 flex items-center gap-1">
                      <TreePine className="h-3.5 w-3.5 text-primary" /> Material Recommendation
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{idea.materialRec}</p>
                    <div className="mt-3 flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-accent" />
                      <span className="text-sm font-bold text-foreground">{idea.costRange}</span>
                      <span className="text-xs text-muted-foreground">estimated range</span>
                    </div>
                  </div>
                </div>

                <Alert className="border-accent/30 bg-accent/5">
                  <Home className="h-4 w-4 text-accent" />
                  <AlertDescription className="text-xs text-foreground">
                    <strong>Pro Tip:</strong> {idea.tip}
                  </AlertDescription>
                </Alert>
              </div>
            ))}

            {/* Related Tools */}
            <div className="border-t border-border pt-6">
              <p className="text-sm font-semibold text-foreground mb-3">Refine your plan with these tools:</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Link to="/tools#budget" className="p-3 rounded-lg border border-border hover:border-primary/30 transition-all">
                  <p className="text-sm font-semibold text-foreground">Cost Estimator</p>
                  <p className="text-xs text-muted-foreground">Get a detailed cost breakdown</p>
                </Link>
                <Link to="/tools#permits" className="p-3 rounded-lg border border-border hover:border-primary/30 transition-all">
                  <p className="text-sm font-semibold text-foreground">Permit Checker</p>
                  <p className="text-xs text-muted-foreground">Check permit requirements</p>
                </Link>
                <Link to="/materials" className="p-3 rounded-lg border border-border hover:border-primary/30 transition-all">
                  <p className="text-sm font-semibold text-foreground">Materials Hub</p>
                  <p className="text-xs text-muted-foreground">Compare decking materials</p>
                </Link>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-primary text-primary-foreground rounded-xl p-6 text-center">
              <h4 className="font-heading font-bold text-lg mb-2">Ready to bring your design to life?</h4>
              <p className="text-primary-foreground/80 text-sm mb-4">Get a free consultation with a licensed Florida deck contractor.</p>
              <Link to="/contact">
                <Button className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold gap-2">
                  Request Free Consultation <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
