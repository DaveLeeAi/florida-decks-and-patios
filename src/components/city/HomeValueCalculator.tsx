import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calculator, TrendingUp, Wrench, Sparkles } from "lucide-react";
import type { CityData } from "@/data/cityData";

interface Props {
  city: CityData;
}

export default function HomeValueCalculator({ city }: Props) {
  const [projectCost, setProjectCost] = useState("");
  const [material, setMaterial] = useState<"wood" | "composite">("composite");
  const [result, setResult] = useState<{
    valueIncrease: number;
    tenYearSavings: number;
    multiplierApplied: boolean;
  } | null>(null);

  const calculate = () => {
    const cost = parseFloat(projectCost) || 0;
    if (cost <= 0) return;

    // Base ROI midpoints from 2026 data
    const woodROIMidpoint = 0.725; // 50–95% range midpoint
    const compositeROIMidpoint = 0.75; // 68–82% range midpoint

    const baseROI = material === "wood" ? woodROIMidpoint : compositeROIMidpoint;

    // Apply city multiplier
    const adjustedROI = baseROI * city.cityMultiplier;
    const valueIncrease = Math.round(cost * adjustedROI);

    // 10-Year Maintenance Savings
    const annualWoodMaint = 500;
    const annualCompositeMaint = 50;
    const tenYearSavings = material === "composite"
      ? (annualWoodMaint - annualCompositeMaint) * 10
      : 0;

    setResult({
      valueIncrease,
      tenYearSavings,
      multiplierApplied: city.cityMultiplier > 1.0,
    });
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-primary/10">
          <Calculator className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="font-heading text-xl font-bold text-foreground">📊 2026 Home Value Impact Calculator</h3>
          <p className="text-sm text-muted-foreground">Estimates for the <strong>{city.name}</strong> market</p>
        </div>
      </div>

      {/* City Multiplier Badge */}
      {city.cityMultiplier > 1.0 && (
        <div className="mb-6 flex items-center gap-2 bg-accent/50 text-accent-foreground px-4 py-2.5 rounded-lg border border-accent">
          <Sparkles className="h-4 w-4 text-primary shrink-0" />
          <span className="text-sm font-medium">{city.cityMultiplierLabel} applied for {city.name}</span>
        </div>
      )}

      <div className="space-y-4 mb-6">
        {/* Project Budget */}
        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">Project Budget ($)</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
            <input
              type="number"
              value={projectCost}
              onChange={(e) => setProjectCost(e.target.value)}
              placeholder="20000"
              className="w-full pl-7 pr-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>

        {/* Material Choice */}
        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">Material Choice</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setMaterial("wood")}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg border text-sm font-medium transition-colors ${
                material === "wood"
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-input bg-background text-foreground/80 hover:border-primary/30"
              }`}
            >
              <Wrench className="h-4 w-4 shrink-0" />
              <div className="text-left">
                <p className="font-semibold">Pressure-Treated Wood</p>
                <p className="text-xs text-muted-foreground">50–95% ROI range</p>
              </div>
            </button>
            <button
              onClick={() => setMaterial("composite")}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg border text-sm font-medium transition-colors ${
                material === "composite"
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-input bg-background text-foreground/80 hover:border-primary/30"
              }`}
            >
              <TrendingUp className="h-4 w-4 shrink-0" />
              <div className="text-left">
                <p className="font-semibold">Premium Composite/PVC</p>
                <p className="text-xs text-muted-foreground">68–82% ROI + savings</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      <Button onClick={calculate} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
        Calculate Authority ROI
      </Button>

      {result && (
        <div className="mt-6 p-5 bg-primary/5 rounded-lg border border-primary/20">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-5 w-5 text-primary" />
            <span className="font-heading font-semibold text-foreground">Results for {city.name} Market</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-1">🏠 Home Value Increase</p>
              <p className="text-lg font-bold text-primary">${result.valueIncrease.toLocaleString()}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-1">🛠️ 10-Year Maint. Savings</p>
              <p className="text-lg font-bold text-primary">
                {result.tenYearSavings > 0 ? `$${result.tenYearSavings.toLocaleString()}` : "$0 (Requires annual maintenance)"}
              </p>
            </div>
          </div>

          {result.multiplierApplied && (
            <p className="text-xs text-primary font-medium mt-3 text-center">
              ✦ {city.cityMultiplierLabel} included in this estimate
            </p>
          )}

          <p className="text-xs text-muted-foreground mt-4 italic">
            *Based on 2026 Florida Regional Authority Data. Median home price in {city.name}: {city.realEstate.medianHomePrice}. 
            Homes with quality outdoor spaces sell {city.realEstate.daysFasterToSell} faster. 
            This calculator is for informational purposes only and does not constitute financial advice.
          </p>
        </div>
      )}
    </div>
  );
}
