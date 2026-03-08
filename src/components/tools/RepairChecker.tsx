import { useState } from "react";
import { Link } from "react-router-dom";
import { RefreshCw, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSiteData } from "@/contexts/SiteDataContext";

export default function RepairChecker() {
  const { settings } = useSiteData();
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
        <div className="mt-6 space-y-4">
          <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
            <p className="text-sm text-foreground leading-relaxed">{result}</p>
            <p className="text-xs text-muted-foreground mt-3">
              *This is general guidance only, not a professional assessment. A proper inspection is needed to determine the best course of action.
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
