import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Calculator, RefreshCw } from "lucide-react";

function BudgetEstimator() {
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
        <div className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/20">
          <p className="text-sm text-muted-foreground mb-1">Estimated Range</p>
          <p className="text-2xl font-heading font-bold text-foreground">
            ${result.low.toLocaleString()} – ${result.high.toLocaleString()}
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            *This is a rough estimate. Actual costs depend on site conditions, design complexity, and local market rates. Contact us for an accurate quote.
          </p>
        </div>
      )}
    </div>
  );
}

function RepairChecker() {
  const [age, setAge] = useState("");
  const [issues, setIssues] = useState<string[]>([]);
  const [result, setResult] = useState<string | null>(null);

  const toggleIssue = (issue: string) =>
    setIssues((prev) => (prev.includes(issue) ? prev.filter((x) => x !== issue) : [...prev, issue]));

  const check = () => {
    const ageNum = parseInt(age) || 0;
    const structuralIssues = issues.filter((i) => ["rotted-joists", "sinking-posts", "major-cracks"].includes(i)).length;
    const cosmeticIssues = issues.filter((i) => ["faded-boards", "loose-boards", "minor-stains"].includes(i)).length;

    if (ageNum > 20 && structuralIssues >= 2) {
      setResult("REPLACE: Your deck likely has significant structural deterioration. A full replacement would be more cost-effective and safer than extensive repairs. We recommend a free inspection to assess the substructure.");
    } else if (structuralIssues >= 2) {
      setResult("MAJOR REPAIR: Your deck has structural concerns that need professional attention. Targeted repairs to the substructure may be sufficient, but a thorough inspection is essential before deciding.");
    } else if (ageNum > 15 && cosmeticIssues >= 2) {
      setResult("RESURFACE: Your deck's substructure may still be sound, but the surface needs attention. Consider replacing the deck boards while keeping the frame — this saves 30-50% vs. full replacement.");
    } else if (cosmeticIssues >= 1 || structuralIssues === 1) {
      setResult("REPAIR: Targeted repairs should address your issues effectively. Most individual problems can be fixed without replacing the entire deck, saving you significant cost.");
    } else {
      setResult("MAINTAIN: Your deck sounds like it's in decent shape! Regular cleaning, staining, and minor maintenance should keep it going for years to come.");
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <RefreshCw className="h-6 w-6 text-primary" />
        <h2 className="font-heading text-2xl font-bold text-foreground">Repair vs. Replace Checker</h2>
      </div>

      <div className="space-y-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Deck Age (years)</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="e.g. 12"
            className="w-full max-w-xs rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Current Issues (select all that apply)</label>
          <div className="flex flex-wrap gap-2">
            {[
              { id: "rotted-joists", label: "Rotted Joists/Beams" },
              { id: "sinking-posts", label: "Sinking/Leaning Posts" },
              { id: "major-cracks", label: "Major Structural Cracks" },
              { id: "loose-boards", label: "Loose/Warped Boards" },
              { id: "faded-boards", label: "Faded/Weathered Surface" },
              { id: "minor-stains", label: "Stains/Mildew" },
            ].map((issue) => (
              <button
                key={issue.id}
                onClick={() => toggleIssue(issue.id)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                  issues.includes(issue.id)
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background text-muted-foreground border-border hover:border-primary/50"
                }`}
              >
                {issue.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <Button onClick={check} className="bg-primary text-primary-foreground hover:bg-forest-dark font-semibold w-full md:w-auto">
        Check My Deck
      </Button>

      {result && (
        <div className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/20">
          <p className="text-sm text-foreground leading-relaxed">{result}</p>
          <p className="text-xs text-muted-foreground mt-3">
            *This is general guidance only, not a professional assessment. A proper inspection is needed to determine the best course of action. No liability is assumed.
          </p>
        </div>
      )}
    </div>
  );
}

export default function Tools() {
  return (
    <Layout>
      <section className="section-padding bg-section-alt">
        <div className="container-narrow mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">Planning Tools</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Use these free tools to get a rough idea of your project scope and budget before reaching out for a professional estimate.
            </p>
          </div>
          <div className="space-y-8">
            <BudgetEstimator />
            <RepairChecker />
          </div>
        </div>
      </section>
    </Layout>
  );
}
