import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calculator, TrendingUp } from "lucide-react";
import type { CityData } from "@/data/cityData";

interface Props {
  city: CityData;
}

export default function HomeValueCalculator({ city }: Props) {
  const [homeValue, setHomeValue] = useState("");
  const [deckCost, setDeckCost] = useState("");
  const [result, setResult] = useState<{ valueAdded: number; roi: number; netGain: number } | null>(null);

  const calculate = () => {
    const hv = parseFloat(homeValue) || 0;
    const dc = parseFloat(deckCost) || 0;
    if (hv <= 0 || dc <= 0) return;

    const roiLow = parseInt(city.realEstate.deckROIPercent.split("–")[0]) / 100;
    const roiHigh = parseInt(city.realEstate.deckROIPercent.split("–")[1].replace("%", "")) / 100;
    const avgRoi = (roiLow + roiHigh) / 2;
    const valueAdded = Math.round(dc * avgRoi);
    const roi = Math.round(avgRoi * 100);
    const netGain = valueAdded - dc;

    setResult({ valueAdded, roi, netGain });
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-primary/10">
          <Calculator className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="font-heading text-xl font-bold text-foreground">Home Value Impact Calculator</h3>
          <p className="text-sm text-muted-foreground">Estimate how a new deck affects your {city.name} home's resale value</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">Your Home's Current Value</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
            <input
              type="number"
              value={homeValue}
              onChange={(e) => setHomeValue(e.target.value)}
              placeholder={city.realEstate.medianHomePriceNum.toString()}
              className="w-full pl-7 pr-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">Estimated Deck Investment</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
            <input
              type="number"
              value={deckCost}
              onChange={(e) => setDeckCost(e.target.value)}
              placeholder="15000"
              className="w-full pl-7 pr-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>
      </div>

      <Button onClick={calculate} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
        Calculate Value Impact
      </Button>

      {result && (
        <div className="mt-6 p-5 bg-primary/5 rounded-lg border border-primary/20">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-5 w-5 text-primary" />
            <span className="font-heading font-semibold text-foreground">Results for {city.name} Market</span>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-1">Estimated Value Added</p>
              <p className="text-lg font-bold text-primary">${result.valueAdded.toLocaleString()}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-1">Projected ROI</p>
              <p className="text-lg font-bold text-primary">{result.roi}%</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-1">Net Impact</p>
              <p className={`text-lg font-bold ${result.netGain >= 0 ? "text-primary" : "text-destructive"}`}>
                {result.netGain >= 0 ? "+" : "-"}${Math.abs(result.netGain).toLocaleString()}
              </p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-4 italic">
            Based on 2026 {city.name} real estate data. Median home price: {city.realEstate.medianHomePrice}. Average deck ROI in {city.name}: {city.realEstate.deckROIPercent}. Homes with quality outdoor spaces sell {city.realEstate.daysFasterToSell} faster.
          </p>
        </div>
      )}
    </div>
  );
}
