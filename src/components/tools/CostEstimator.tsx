import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  DollarSign, ArrowRight, Calculator, Lightbulb, MapPin,
  ChevronDown, ChevronRight, Printer, Clock, AlertTriangle, CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import { calculateDeckCost, costCities, type CostInputs, type CostResult } from "@/data/costEstimatorRules";

/* ── Step Config ── */
const STEPS = [
  { label: "Location & Size", fields: ["city", "size"] },
  { label: "Material & Height", fields: ["material", "height"] },
  { label: "Features", fields: ["stairs", "railing", "roof", "electrical"] },
];

function HelpTip({ text }: { text: string }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="inline-flex items-center justify-center h-4 w-4 rounded-full bg-muted text-muted-foreground text-[10px] font-bold cursor-help ml-1">?</span>
      </TooltipTrigger>
      <TooltipContent side="top" className="max-w-[240px] text-xs">{text}</TooltipContent>
    </Tooltip>
  );
}

function CostLine({ label, low, high }: { label: string; low: number; high: number }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-border last:border-0">
      <span className="text-sm text-foreground">{label}</span>
      <span className="text-sm font-semibold text-foreground tabular-nums">
        ${low.toLocaleString()} – ${high.toLocaleString()}
      </span>
    </div>
  );
}

export default function CostEstimator() {
  const [step, setStep] = useState(0);
  const [showTips, setShowTips] = useState(false);

  // Inputs
  const [cityId, setCityId] = useState("tampa");
  const [deckSize, setDeckSize] = useState(300);
  const [material, setMaterial] = useState<CostInputs["material"]>("composite");
  const [height, setHeight] = useState<CostInputs["height"]>("low");
  const [hasStairs, setHasStairs] = useState(false);
  const [stairSteps, setStairSteps] = useState(4);
  const [hasRailing, setHasRailing] = useState(true);
  const [railingType, setRailingType] = useState<CostInputs["railingType"]>("composite");
  const [roofType, setRoofType] = useState<CostInputs["roofType"]>("none");
  const [electrical, setElectrical] = useState<CostInputs["electrical"]>("none");

  const [result, setResult] = useState<CostResult | null>(null);

  const progress = ((step + 1) / (STEPS.length + 1)) * 100;

  const inputs: CostInputs = useMemo(() => ({
    cityId, deckSize, material, height, hasStairs, stairSteps, hasRailing, railingType, roofType, electrical,
  }), [cityId, deckSize, material, height, hasStairs, stairSteps, hasRailing, railingType, roofType, electrical]);

  const calculate = () => {
    const r = calculateDeckCost(inputs);
    setResult(r);
    setStep(3);
  };

  const reset = () => { setResult(null); setStep(0); };

  const canNext = step === 0 ? deckSize >= 50 : true;

  const handlePrint = () => {
    if (!result) return;
    const b = result.breakdown;
    const city = costCities.find((c) => c.id === cityId);
    let html = `<html><head><title>Deck Cost Estimate - ${city?.name || "Florida"}</title><style>body{font-family:system-ui,sans-serif;max-width:700px;margin:40px auto;padding:0 20px;color:#1a1a1a}h1{font-size:22px}h2{font-size:16px;margin-top:24px;border-bottom:1px solid #ddd;padding-bottom:6px}table{width:100%;border-collapse:collapse;margin:12px 0}td{padding:6px 0;border-bottom:1px solid #eee;font-size:14px}td:last-child{text-align:right;font-weight:600}.total{font-size:18px;font-weight:700;background:#f0f7f0;padding:12px;border-radius:8px;text-align:center;margin:16px 0}.note{font-size:12px;color:#666;margin-top:24px;font-style:italic}</style></head><body>`;
    html += `<h1>Florida Deck Cost Estimate</h1><p>City: ${city?.name || "Florida"} · Size: ${deckSize} sq ft · Material: ${b.materialCost.label}</p>`;
    html += `<div class="total">Estimated Total: $${b.totalLow.toLocaleString()} – $${b.totalHigh.toLocaleString()}</div>`;
    html += `<h2>Cost Breakdown</h2><table>`;
    const lines = [b.materialCost, b.laborCost, b.hardwareCost, b.permitCost, b.stairsCost, b.railingCost, b.roofCost, b.electricalCost, b.engineeringCost].filter(Boolean);
    lines.forEach((l) => { if (l) html += `<tr><td>${l.label}</td><td>$${l.low.toLocaleString()} – $${l.high.toLocaleString()}</td></tr>`; });
    html += `</table>`;
    html += `<h2>Timeline</h2><p>Permit: ${result.timeline.permitWeeks} · Construction: ${result.timeline.constructionWeeks} · Total: ${result.timeline.totalWeeks}</p>`;
    if (result.materialNotes.length > 0) { html += `<h2>Material Notes</h2><ul>`; result.materialNotes.forEach((n) => { html += `<li>${n}</li>`; }); html += `</ul>`; }
    if (result.tips.length > 0) { html += `<h2>Tips</h2><ul>`; result.tips.forEach((t) => { html += `<li>${t}</li>`; }); html += `</ul>`; }
    html += `<p class="note">This estimate is for planning purposes only. Actual costs depend on site conditions, design complexity, and contractor pricing. Always get multiple quotes from licensed Florida contractors.</p>`;
    html += `<p class="note">Generated by Florida Decks and Patios — floridadecksandpatios.com</p>`;
    html += `</body></html>`;
    const w = window.open("", "_blank");
    if (w) { w.document.write(html); w.document.close(); w.print(); }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 md:p-8">
      <div className="flex items-center gap-3 mb-2">
        <Calculator className="h-6 w-6 text-primary" />
        <h2 className="font-heading text-2xl font-bold text-foreground">Florida Deck Cost Estimator</h2>
      </div>
      <p className="text-sm text-muted-foreground mb-6">
        Get a detailed cost breakdown for your Florida deck project — materials, labor, permits, and more.
      </p>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
          {STEPS.map((s, i) => (
            <button
              key={i}
              onClick={() => { if (i < step || result) { setStep(i); setResult(null); } }}
              className={`transition-colors ${i <= step ? "text-primary font-semibold" : ""} ${i < step ? "cursor-pointer hover:text-primary/70" : ""}`}
            >
              {s.label}
            </button>
          ))}
          <span className={step === 3 ? "text-primary font-semibold" : ""}>Results</span>
        </div>
        <Progress value={result ? 100 : progress} className="h-1.5" />
      </div>

      {/* Disclaimer */}
      <Alert className="mb-6 border-primary/20 bg-primary/5">
        <AlertTriangle className="h-4 w-4 text-primary" />
        <AlertDescription className="text-xs text-muted-foreground">
          Estimates are for planning only. Actual costs depend on site conditions, design, and contractor pricing. Always get multiple quotes.
        </AlertDescription>
      </Alert>

      {/* ═══ STEP 0: Location & Size ═══ */}
      {step === 0 && !result && (
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              <MapPin className="inline h-3.5 w-3.5 mr-1 text-primary" />City / Region
              <HelpTip text="Labor rates and permit costs vary significantly across Florida. Select the closest city." />
            </label>
            <select value={cityId} onChange={(e) => setCityId(e.target.value)} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground">
              {costCities.map((c) => <option key={c.id} value={c.id}>{c.name} ({c.region})</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Deck Size: {deckSize} sq ft
              <HelpTip text="A typical residential deck is 200–400 sq ft. Large entertainment decks are 500–1000+ sq ft." />
            </label>
            <input type="range" min={50} max={1500} step={25} value={deckSize} onChange={(e) => setDeckSize(Number(e.target.value))} className="w-full accent-primary" />
            <div className="flex justify-between text-xs text-muted-foreground mt-1"><span>50</span><span>750</span><span>1,500</span></div>
          </div>
          <Button onClick={() => setStep(1)} disabled={!canNext} className="w-full md:w-auto">
            Next: Material & Height <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}

      {/* ═══ STEP 1: Material & Height ═══ */}
      {step === 1 && !result && (
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Decking Material
              <HelpTip text="Composite is the most popular choice in Florida — it resists moisture, UV, and insects with minimal maintenance." />
            </label>
            <select value={material} onChange={(e) => setMaterial(e.target.value as CostInputs["material"])} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground">
              <option value="pressure-treated">Pressure-Treated Pine (Budget)</option>
              <option value="cedar">Western Red Cedar (Mid-Range)</option>
              <option value="composite">Capped Composite (Popular)</option>
              <option value="premium-composite">Premium Composite — TimberTech/Trex (High-End)</option>
              <option value="pvc">PVC Decking — AZEK (Premium)</option>
              <option value="hardwood">Ipe / Brazilian Hardwood (Luxury)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Deck Height
              <HelpTip text="Elevated decks (30&quot;+) require engineering and cost more due to structural requirements." />
            </label>
            <div className="grid grid-cols-2 gap-2">
              {([
                { v: "ground", l: "Ground Level", d: "Under 12 inches" },
                { v: "low", l: "Low Deck", d: "12–30 inches" },
                { v: "elevated", l: "Elevated", d: "30–72 inches" },
                { v: "second-story", l: "Second Story", d: "72+ inches" },
              ] as const).map((h) => (
                <button
                  key={h.v}
                  onClick={() => setHeight(h.v)}
                  className={`text-left p-3 rounded-lg border transition-colors ${height === h.v ? "bg-primary text-primary-foreground border-primary" : "bg-background text-foreground border-border hover:border-primary/50"}`}
                >
                  <span className="text-sm font-medium block">{h.l}</span>
                  <span className={`text-xs ${height === h.v ? "text-primary-foreground/80" : "text-muted-foreground"}`}>{h.d}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setStep(0)}>Back</Button>
            <Button onClick={() => setStep(2)}>Next: Features <ArrowRight className="ml-2 h-4 w-4" /></Button>
          </div>
        </div>
      )}

      {/* ═══ STEP 2: Features ═══ */}
      {step === 2 && !result && (
        <div className="space-y-5">
          {/* Stairs */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Stairs
              <HelpTip text="Stairs add $500–$3,000+ depending on material and number of steps." />
            </label>
            <div className="flex gap-2 mb-2">
              <button onClick={() => setHasStairs(false)} className={`text-xs px-4 py-2 rounded-full border transition-colors ${!hasStairs ? "bg-primary text-primary-foreground border-primary" : "bg-background text-muted-foreground border-border hover:border-primary/50"}`}>No Stairs</button>
              <button onClick={() => setHasStairs(true)} className={`text-xs px-4 py-2 rounded-full border transition-colors ${hasStairs ? "bg-primary text-primary-foreground border-primary" : "bg-background text-muted-foreground border-border hover:border-primary/50"}`}>Yes, Add Stairs</button>
            </div>
            {hasStairs && (
              <select value={stairSteps} onChange={(e) => setStairSteps(Number(e.target.value))} className="w-full max-w-xs rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground">
                {[3, 4, 5, 6, 8, 10, 12, 15].map((n) => <option key={n} value={n}>{n} steps</option>)}
              </select>
            )}
          </div>

          {/* Railing */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Railing
              <HelpTip text="Required for decks 30&quot;+ above grade. Railing type significantly affects total cost." />
            </label>
            <div className="flex gap-2 mb-2">
              <button onClick={() => setHasRailing(false)} className={`text-xs px-4 py-2 rounded-full border transition-colors ${!hasRailing ? "bg-primary text-primary-foreground border-primary" : "bg-background text-muted-foreground border-border hover:border-primary/50"}`}>No Railing</button>
              <button onClick={() => setHasRailing(true)} className={`text-xs px-4 py-2 rounded-full border transition-colors ${hasRailing ? "bg-primary text-primary-foreground border-primary" : "bg-background text-muted-foreground border-border hover:border-primary/50"}`}>Add Railing</button>
            </div>
            {hasRailing && (
              <select value={railingType} onChange={(e) => setRailingType(e.target.value as CostInputs["railingType"])} className="w-full max-w-xs rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground">
                <option value="wood">Wood Railing ($25–$45/ft)</option>
                <option value="composite">Composite Railing ($40–$70/ft)</option>
                <option value="cable">Cable Railing ($60–$110/ft)</option>
                <option value="glass">Glass Panel Railing ($100–$180/ft)</option>
              </select>
            )}
          </div>

          {/* Roof */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Roof / Pergola Cover
              <HelpTip text="Solid roofs require additional permitting and engineering. Pergolas add shade without full permitting in many areas." />
            </label>
            <div className="flex flex-wrap gap-2">
              {([
                { v: "none", l: "No Cover" },
                { v: "pergola", l: "Open Pergola" },
                { v: "solid-roof", l: "Solid Roof" },
              ] as const).map((r) => (
                <button key={r.v} onClick={() => setRoofType(r.v)} className={`text-xs px-4 py-2 rounded-full border transition-colors ${roofType === r.v ? "bg-primary text-primary-foreground border-primary" : "bg-background text-muted-foreground border-border hover:border-primary/50"}`}>{r.l}</button>
              ))}
            </div>
          </div>

          {/* Electrical */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Electrical
              <HelpTip text="Electrical work requires a licensed electrician and separate electrical inspection." />
            </label>
            <div className="flex flex-wrap gap-2">
              {([
                { v: "none", l: "None" },
                { v: "lighting", l: "Lighting Only" },
                { v: "outlets-fans", l: "Outlets & Fans" },
              ] as const).map((e) => (
                <button key={e.v} onClick={() => setElectrical(e.v)} className={`text-xs px-4 py-2 rounded-full border transition-colors ${electrical === e.v ? "bg-primary text-primary-foreground border-primary" : "bg-background text-muted-foreground border-border hover:border-primary/50"}`}>{e.l}</button>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
            <Button onClick={calculate}>
              <Calculator className="mr-2 h-4 w-4" />Calculate My Estimate
            </Button>
          </div>
        </div>
      )}

      {/* ═══ RESULTS ═══ */}
      {result && (
        <div className="space-y-6 animate-in fade-in-0 slide-in-from-top-2 duration-300">
          {/* Total */}
          <div className="p-5 rounded-xl bg-primary/5 border border-primary/20 text-center">
            <p className="text-sm text-muted-foreground mb-1">Estimated Total Cost</p>
            <p className="text-3xl font-heading font-bold text-foreground">
              ${result.breakdown.totalLow.toLocaleString()} – ${result.breakdown.totalHigh.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              For a {deckSize} sq ft {MATERIAL_RATES_LABEL[material]} deck in {costCities.find((c) => c.id === cityId)?.name || "Florida"}
            </p>
          </div>

          {/* Breakdown */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-primary" />Cost Breakdown
            </h3>
            <div className="rounded-lg border border-border bg-background p-4">
              <CostLine label={result.breakdown.materialCost.label} low={result.breakdown.materialCost.low} high={result.breakdown.materialCost.high} />
              <CostLine label={result.breakdown.laborCost.label} low={result.breakdown.laborCost.low} high={result.breakdown.laborCost.high} />
              <CostLine label={result.breakdown.hardwareCost.label} low={result.breakdown.hardwareCost.low} high={result.breakdown.hardwareCost.high} />
              <CostLine label={result.breakdown.permitCost.label} low={result.breakdown.permitCost.low} high={result.breakdown.permitCost.high} />
              {result.breakdown.stairsCost && <CostLine label={result.breakdown.stairsCost.label} low={result.breakdown.stairsCost.low} high={result.breakdown.stairsCost.high} />}
              {result.breakdown.railingCost && <CostLine label={result.breakdown.railingCost.label} low={result.breakdown.railingCost.low} high={result.breakdown.railingCost.high} />}
              {result.breakdown.roofCost && <CostLine label={result.breakdown.roofCost.label} low={result.breakdown.roofCost.low} high={result.breakdown.roofCost.high} />}
              {result.breakdown.electricalCost && <CostLine label={result.breakdown.electricalCost.label} low={result.breakdown.electricalCost.low} high={result.breakdown.electricalCost.high} />}
              {result.breakdown.engineeringCost && <CostLine label={result.breakdown.engineeringCost.label} low={result.breakdown.engineeringCost.low} high={result.breakdown.engineeringCost.high} />}
            </div>
          </div>

          {/* Timeline */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />Estimated Timeline
            </h3>
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-lg border border-border bg-background p-3 text-center">
                <p className="text-xs text-muted-foreground">Permitting</p>
                <p className="text-sm font-semibold text-foreground">{result.timeline.permitWeeks}</p>
              </div>
              <div className="rounded-lg border border-border bg-background p-3 text-center">
                <p className="text-xs text-muted-foreground">Construction</p>
                <p className="text-sm font-semibold text-foreground">{result.timeline.constructionWeeks}</p>
              </div>
              <div className="rounded-lg border border-primary/20 bg-primary/5 p-3 text-center">
                <p className="text-xs text-muted-foreground">Total</p>
                <p className="text-sm font-semibold text-primary">{result.timeline.totalWeeks}</p>
              </div>
            </div>
          </div>

          {/* Material Notes */}
          {result.materialNotes.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-primary" />Material Notes
              </h3>
              <ul className="space-y-2">
                {result.materialNotes.map((n, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                    <span>{n}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tips */}
          <button onClick={() => setShowTips(!showTips)} className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors">
            {showTips ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            Homeowner Tips
          </button>
          {showTips && (
            <ul className="space-y-2 animate-in fade-in-0 duration-200">
              {result.tips.map((t, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Lightbulb className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <Printer className="mr-2 h-4 w-4" />Print Estimate
            </Button>
            <Button variant="outline" size="sm" onClick={reset}>
              Start New Estimate
            </Button>
          </div>

          {/* CTA */}
          <div className="rounded-xl border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10 p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1 space-y-1">
                <h4 className="font-heading font-bold text-foreground text-base sm:text-lg">
                  Ready for an Accurate Quote?
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Get a free, no-obligation estimate from a licensed Florida contractor in your area.
                </p>
              </div>
              <Button asChild size="lg" className="shrink-0">
                <Link to="/contact">Get Free Estimate <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </div>

          {/* Related Tools */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2">
            <Link to="/tools#permits" className="flex items-center gap-2 p-3 rounded-lg border border-border hover:border-primary/30 hover:bg-primary/5 transition-colors text-sm text-foreground">
              <CheckCircle className="h-4 w-4 text-primary shrink-0" />Permit Checker
            </Link>
            <Link to="/tools#violations" className="flex items-center gap-2 p-3 rounded-lg border border-border hover:border-primary/30 hover:bg-primary/5 transition-colors text-sm text-foreground">
              <AlertTriangle className="h-4 w-4 text-primary shrink-0" />Violation Decoder
            </Link>
            <Link to="/tools#repair" className="flex items-center gap-2 p-3 rounded-lg border border-border hover:border-primary/30 hover:bg-primary/5 transition-colors text-sm text-foreground">
              <Calculator className="h-4 w-4 text-primary shrink-0" />Repair Checker
            </Link>
          </div>
        </div>
      )}

      <p className="text-xs text-muted-foreground mt-6 italic">
        <strong>Methodology:</strong> Based on 2026 Florida contractor pricing data, material supplier costs, and county permit fee schedules across 20 Florida markets.
      </p>
    </div>
  );
}

// Label lookup used in results
const MATERIAL_RATES_LABEL: Record<CostInputs["material"], string> = {
  "pressure-treated": "Pressure-Treated Pine",
  "cedar": "Cedar",
  "composite": "Composite",
  "premium-composite": "Premium Composite",
  "pvc": "PVC",
  "hardwood": "Ipe Hardwood",
};
