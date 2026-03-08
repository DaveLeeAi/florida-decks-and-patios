import { useState } from "react";
import { Link } from "react-router-dom";
import { Calculator, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSiteData } from "@/contexts/SiteDataContext";

export default function BudgetEstimator() {
  const { settings } = useSiteData();
  const [type, setType] = useState("deck");
  const [size, setSize] = useState(300);
  const [material, setMaterial] = useState("pressure-treated");
  const [addOns, setAddOns] = useState<string[]>([]);
  const [result, setResult] = useState<{ low: number; high: number } | null>(null);

  const calculate = () => {
    const rates: Record<string, [number, number]> = {
      "pressure-treated": [15, 25],
      cedar: [25, 35],
      composite: [30, 60],
      hardwood: [40, 75],
    };
    const typeMultipliers: Record<string, number> = {
      deck: 1,
      porch: 1.3,
      pergola: 0.8,
      "outdoor-kitchen": 1.6,
    };
    const addOnCosts: Record<string, number> = {
      lighting: 1500,
      railing: size * 0.4 * 40,
      stairs: 2000,
      "built-in-seating": 3000,
    };
    const [rLow, rHigh] = rates[material] || [20, 40];
    const mult = typeMultipliers[type] || 1;
    let low = Math.round(rLow * size * mult);
    let high = Math.round(rHigh * size * mult);
    addOns.forEach((a) => {
      const cost = addOnCosts[a] || 0;
      low += cost * 0.8;
      high += cost * 1.2;
    });
    setResult({ low: Math.round(low), high: Math.round(high) });
  };

  const toggleAddOn = (a: string) =>
    setAddOns((prev) => (prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]));

  return (
    <div className="bg-card rounded-lg border border-border p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <Calculator className="h-6 w-6 text-primary" />
        <h2 className="font-heading text-2xl font-bold text-foreground">Project Budget Estimator</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Project Type</label>
          <select value={type} onChange={(e) => setType(e.target.value)} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground">
            <option value="deck">Deck</option>
            <option value="porch">Porch</option>
            <option value="pergola">Pergola</option>
            <option value="outdoor-kitchen">Outdoor Kitchen</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Size (sq ft): {size}</label>
          <input type="range" min={100} max={1000} step={25} value={size} onChange={(e) => setSize(Number(e.target.value))} className="w-full accent-primary" />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>100</span><span>1000</span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Material Tier</label>
          <select value={material} onChange={(e) => setMaterial(e.target.value)} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground">
            <option value="pressure-treated">Pressure-Treated Wood</option>
            <option value="cedar">Cedar</option>
            <option value="composite">Composite</option>
            <option value="hardwood">Hardwood (Ipe)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Add-Ons</label>
          <div className="flex flex-wrap gap-2">
            {["lighting", "railing", "stairs", "built-in-seating"].map((a) => (
              <button
                key={a}
                onClick={() => toggleAddOn(a)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                  addOns.includes(a)
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background text-muted-foreground border-border hover:border-primary/50"
                }`}
              >
                {a.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
              </button>
            ))}
          </div>
        </div>
      </div>

      <Button onClick={calculate} className="bg-primary text-primary-foreground hover:bg-forest-dark font-semibold w-full md:w-auto">
        Calculate Estimate
      </Button>

      {result && (
        <div className="mt-6 space-y-4">
          <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
            <p className="text-sm text-muted-foreground mb-1">Estimated Range</p>
            <p className="text-2xl font-heading font-bold text-foreground">
              ${result.low.toLocaleString()} – ${result.high.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              *This is a rough estimate. Actual costs depend on site conditions, design complexity, and local market rates.
            </p>
          </div>
          <Button asChild className="w-full md:w-auto bg-amber-600 hover:bg-amber-700 text-white font-semibold">
            <Link to={settings.ctaLink}>
              Match with a Local Builder <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      )}

      <p className="text-xs text-muted-foreground mt-6 italic">
        <strong>Methodology:</strong> Our estimations are based on a 2026 analysis of average Florida material costs and labor rates from professional contractors in the Tampa and Orlando areas.
      </p>
    </div>
  );
}
