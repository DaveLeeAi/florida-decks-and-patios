import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { TrendingUp, ArrowRight, DollarSign, Home, Info, BarChart3, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const CITIES = [
  { id: "miami", name: "Miami", multiplier: 1.04 },
  { id: "tampa", name: "Tampa", multiplier: 1.04 },
  { id: "orlando", name: "Orlando", multiplier: 1.03 },
  { id: "jacksonville", name: "Jacksonville", multiplier: 1.03 },
  { id: "st-petersburg", name: "St. Petersburg", multiplier: 1.04 },
  { id: "fort-lauderdale", name: "Fort Lauderdale", multiplier: 1.05 },
  { id: "sarasota", name: "Sarasota", multiplier: 1.05 },
  { id: "naples", name: "Naples", multiplier: 1.06 },
  { id: "palm-beach", name: "Palm Beach", multiplier: 1.06 },
  { id: "tallahassee", name: "Tallahassee", multiplier: 1.02 },
  { id: "cape-coral", name: "Cape Coral", multiplier: 1.04 },
  { id: "clearwater", name: "Clearwater", multiplier: 1.04 },
  { id: "bradenton", name: "Bradenton", multiplier: 1.04 },
  { id: "port-st-lucie", name: "Port St. Lucie", multiplier: 1.03 },
  { id: "other", name: "Other Florida City", multiplier: 1.03 },
];

const MATERIALS = [
  { id: "pressure-treated", label: "Pressure-Treated Wood", roiPct: 0.95, maintenanceCost10yr: 4500, lifespan: "10–15 years" },
  { id: "composite", label: "Composite", roiPct: 0.82, maintenanceCost10yr: 300, lifespan: "25–30 years" },
  { id: "premium-composite", label: "Premium Composite", roiPct: 0.78, maintenanceCost10yr: 200, lifespan: "30+ years" },
  { id: "pvc", label: "PVC Decking", roiPct: 0.75, maintenanceCost10yr: 150, lifespan: "30+ years" },
  { id: "hardwood", label: "Hardwood (Ipe)", roiPct: 0.70, maintenanceCost10yr: 2000, lifespan: "40+ years" },
];

interface ROIResult {
  resaleIncrease: number;
  roi: number;
  roiPct: number;
  netCost: number;
  maintenanceSavings: number;
  totalValueAdded: number;
  factors: string[];
  materialNote: string;
}

function calculateROI(homeValue: number, deckCost: number, cityId: string, materialId: string): ROIResult {
  const city = CITIES.find(c => c.id === cityId) || CITIES[CITIES.length - 1];
  const material = MATERIALS.find(m => m.id === materialId) || MATERIALS[0];

  // Base resale value increase: deck cost × material ROI × city multiplier
  const baseROI = material.roiPct;
  const cityBoost = city.multiplier;
  const adjustedROI = baseROI * cityBoost;

  const resaleIncrease = Math.round(deckCost * adjustedROI);
  const roi = resaleIncrease - deckCost;
  const roiPct = Math.round(adjustedROI * 100);

  // Compare maintenance to pressure-treated baseline
  const ptMaintenance = MATERIALS[0].maintenanceCost10yr;
  const maintenanceSavings = materialId !== "pressure-treated" ? ptMaintenance - material.maintenanceCost10yr : 0;
  const totalValueAdded = resaleIncrease + maintenanceSavings;

  const factors: string[] = [];
  if (cityBoost >= 1.05) factors.push(`${city.name} is a premium market — decks add above-average value here`);
  else if (cityBoost >= 1.04) factors.push(`${city.name}'s strong housing market supports good deck ROI`);
  else factors.push(`${city.name} has moderate deck value appreciation — quality builds still pay off`);

  if (deckCost / homeValue > 0.15) factors.push("⚠️ Your deck cost exceeds 15% of home value — ROI typically drops above this threshold");
  else if (deckCost / homeValue < 0.05) factors.push("Your deck is well within the 'sweet spot' for home improvement ROI (under 10% of home value)");

  if (materialId === "pressure-treated") factors.push("Wood decks have the highest initial ROI but require $400–$600/year in maintenance to maintain value");
  if (materialId === "composite" || materialId === "premium-composite") factors.push("Composite decks save $4,500+ in maintenance costs over 10 years vs. wood — improving total ROI");
  if (materialId === "hardwood") factors.push("Hardwood adds luxury appeal but the premium cost reduces initial ROI. Best for high-end markets like Naples and Palm Beach");

  factors.push("Permitted and inspected decks add more resale value than unpermitted work — buyers and appraisers verify this");

  const materialNote = materialId === "pressure-treated"
    ? "While pressure-treated has the highest initial ROI percentage, you'll spend an estimated $4,500 on maintenance over 10 years (sealing, staining, board replacement)."
    : materialId === "composite" || materialId === "premium-composite"
    ? "Composite's lower maintenance costs ($200–$300 over 10 years) effectively close the ROI gap with wood when factoring total cost of ownership."
    : materialId === "pvc"
    ? "PVC has the lowest maintenance cost of any material. Its slightly lower ROI percentage is offset by near-zero upkeep expenses."
    : "Hardwood decks have the longest lifespan of any material. In luxury markets, the premium craftsmanship can command above-average value.";

  return { resaleIncrease, roi, roiPct, netCost: deckCost - resaleIncrease, maintenanceSavings, totalValueAdded, factors, materialNote };
}

function formatCurrency(n: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

export default function ROICalculator() {
  const [homeValue, setHomeValue] = useState("");
  const [deckCost, setDeckCost] = useState("");
  const [cityId, setCityId] = useState("");
  const [materialId, setMaterialId] = useState("");
  const [result, setResult] = useState<ROIResult | null>(null);

  const canCalculate = Number(homeValue) > 0 && Number(deckCost) > 0 && !!cityId && !!materialId;

  const handleCalculate = () => {
    if (!canCalculate) return;
    setResult(calculateROI(Number(homeValue), Number(deckCost), cityId, materialId));
  };

  const reset = () => {
    setHomeValue("");
    setDeckCost("");
    setCityId("");
    setMaterialId("");
    setResult(null);
  };

  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 font-heading text-xl md:text-2xl text-foreground">
          <div className="p-2 bg-primary/10 rounded-lg">
            <TrendingUp className="h-6 w-6 text-primary" />
          </div>
          Deck ROI Calculator
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Estimate how much value a new deck adds to your Florida home. Based on 2026 cost-vs-value data and regional market factors.
        </p>
      </CardHeader>

      <CardContent>
        {!result ? (
          <div className="space-y-6">
            {/* Home Value */}
            <div>
              <label className="text-sm font-semibold text-foreground mb-1.5 block">Estimated Home Value</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="number"
                  placeholder="350000"
                  value={homeValue}
                  onChange={e => setHomeValue(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            {/* Deck Cost */}
            <div>
              <label className="text-sm font-semibold text-foreground mb-1.5 block">Expected Deck Cost</label>
              <p className="text-xs text-muted-foreground mb-1.5">Not sure? Use our <Link to="/tools#budget" className="text-primary underline">Cost Estimator</Link> first.</p>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="number"
                  placeholder="25000"
                  value={deckCost}
                  onChange={e => setDeckCost(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            {/* City */}
            <div>
              <label className="text-sm font-semibold text-foreground mb-2 block">City / Market</label>
              <div className="flex flex-wrap gap-2">
                {CITIES.map(c => (
                  <button
                    key={c.id}
                    onClick={() => setCityId(c.id)}
                    className={`px-3 py-1.5 rounded-lg border text-xs transition-all ${cityId === c.id ? "border-primary bg-primary/5 text-primary font-semibold" : "border-border text-foreground hover:border-primary/30"}`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Material */}
            <div>
              <label className="text-sm font-semibold text-foreground mb-2 block">Deck Material</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {MATERIALS.map(m => (
                  <button
                    key={m.id}
                    onClick={() => setMaterialId(m.id)}
                    className={`p-3 rounded-lg border text-left transition-all ${materialId === m.id ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-border hover:border-primary/30"}`}
                  >
                    <p className="text-sm font-semibold text-foreground">{m.label}</p>
                    <p className="text-xs text-muted-foreground">~{Math.round(m.roiPct * 100)}% cost recovery · {m.lifespan}</p>
                  </button>
                ))}
              </div>
            </div>

            <Button onClick={handleCalculate} disabled={!canCalculate} className="w-full gap-2 font-bold">
              <BarChart3 className="h-4 w-4" /> Calculate ROI
            </Button>
          </div>
        ) : (
          /* Results */
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-heading text-lg font-bold text-foreground">Your Deck ROI Estimate</h3>
              <Button variant="outline" size="sm" onClick={reset}>Recalculate</Button>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-primary/5 rounded-xl p-4 text-center border border-primary/20">
                <p className="text-2xl font-bold text-primary">{result.roiPct}%</p>
                <p className="text-xs text-muted-foreground mt-1">Cost Recovery</p>
              </div>
              <div className="bg-accent/5 rounded-xl p-4 text-center border border-accent/20">
                <p className="text-2xl font-bold text-accent">{formatCurrency(result.resaleIncrease)}</p>
                <p className="text-xs text-muted-foreground mt-1">Resale Value Added</p>
              </div>
              <div className="rounded-xl p-4 text-center border border-border">
                <p className="text-2xl font-bold text-foreground">{formatCurrency(Math.abs(result.netCost))}</p>
                <p className="text-xs text-muted-foreground mt-1">{result.netCost > 0 ? "Net Cost After Value" : "Net Value Gain"}</p>
              </div>
              <div className="rounded-xl p-4 text-center border border-border">
                <p className="text-2xl font-bold text-foreground">{formatCurrency(result.totalValueAdded)}</p>
                <p className="text-xs text-muted-foreground mt-1">Total Value (incl. savings)</p>
              </div>
            </div>

            {/* Maintenance Savings */}
            {result.maintenanceSavings > 0 && (
              <Alert className="border-primary/30 bg-primary/5">
                <CheckCircle className="h-4 w-4 text-primary" />
                <AlertDescription className="text-sm text-foreground">
                  <strong>10-Year Maintenance Savings:</strong> {formatCurrency(result.maintenanceSavings)} compared to pressure-treated wood. This improves your effective ROI.
                </AlertDescription>
              </Alert>
            )}

            {/* Material Note */}
            <div className="bg-card rounded-xl border border-border p-4">
              <p className="text-xs font-semibold text-foreground mb-1 flex items-center gap-1">
                <Info className="h-3.5 w-3.5 text-primary" /> Material Insight
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">{result.materialNote}</p>
            </div>

            {/* Factors */}
            <div className="bg-card rounded-xl border border-border p-4">
              <p className="text-xs font-semibold text-foreground mb-2">Factors Influencing Your ROI</p>
              <ul className="space-y-2">
                {result.factors.map((f, i) => (
                  <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Disclaimer */}
            <Alert className="border-border">
              <Info className="h-4 w-4 text-muted-foreground" />
              <AlertDescription className="text-xs text-muted-foreground">
                ROI estimates are based on national cost-vs-value studies adjusted for Florida regional data. Actual resale value depends on market conditions, deck quality, and buyer preferences. This is not an appraisal.
              </AlertDescription>
            </Alert>

            {/* Related Tools */}
            <div className="border-t border-border pt-6">
              <p className="text-sm font-semibold text-foreground mb-3">Related Planning Tools</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Link to="/tools#budget" className="p-3 rounded-lg border border-border hover:border-primary/30 transition-all">
                  <p className="text-sm font-semibold text-foreground">Cost Estimator</p>
                  <p className="text-xs text-muted-foreground">Get a detailed cost breakdown</p>
                </Link>
                <Link to="/tools#design" className="p-3 rounded-lg border border-border hover:border-primary/30 transition-all">
                  <p className="text-sm font-semibold text-foreground">Design Generator</p>
                  <p className="text-xs text-muted-foreground">Get personalized design ideas</p>
                </Link>
                <Link to="/materials" className="p-3 rounded-lg border border-border hover:border-primary/30 transition-all">
                  <p className="text-sm font-semibold text-foreground">Materials Hub</p>
                  <p className="text-xs text-muted-foreground">Compare decking materials</p>
                </Link>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-primary text-primary-foreground rounded-xl p-6 text-center">
              <h4 className="font-heading font-bold text-lg mb-2">Maximize Your Deck Investment</h4>
              <p className="text-primary-foreground/80 text-sm mb-4">Get a professional estimate from a licensed Florida contractor.</p>
              <Link to="/contact">
                <Button className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold gap-2">
                  Get Free Estimate <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
