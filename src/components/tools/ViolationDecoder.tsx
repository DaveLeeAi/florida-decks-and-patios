import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
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
  Info,
  FileText,
  MessageSquare,
  Shield,
} from "lucide-react";
import { VIOLATIONS, CTA_LABELS, TYPE_LABELS, QUICK_FILTERS, type ViolationEntry } from "@/data/violationData";
import { searchViolations, filterByCategory } from "@/utils/violationSearch";

const severityConfig = {
  critical: {
    color: "bg-destructive text-destructive-foreground",
    icon: ShieldAlert,
    label: "Critical",
  },
  moderate: {
    color: "bg-accent text-accent-foreground",
    icon: AlertTriangle,
    label: "Moderate",
  },
  minor: {
    color: "bg-muted text-muted-foreground",
    icon: ShieldCheck,
    label: "Minor",
  },
};

function ResultCard({ v }: { v: ViolationEntry }) {
  const sev = severityConfig[v.severity];
  const SevIcon = sev.icon;
  const ctaLabel = CTA_LABELS[v.ctaType];
  const typeLabel = TYPE_LABELS[v.type];

  return (
    <div className="rounded-lg border border-border bg-card p-5 space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center gap-2">
        <Badge className={sev.color}>
          <SevIcon className="h-3 w-3 mr-1" />
          {sev.label}
        </Badge>
        <Badge variant="outline" className="text-xs">
          {typeLabel}
        </Badge>
        {v.jurisdiction !== "Florida" && v.jurisdiction !== "General" && (
          <Badge variant="secondary" className="text-xs">
            {v.jurisdiction}
          </Badge>
        )}
      </div>

      <div>
        <h3 className="font-heading font-bold text-foreground text-lg">
          {v.code && <span className="text-primary">{v.code} — </span>}
          {v.title}
        </h3>
      </div>

      {/* Summary */}
      <p className="text-sm text-muted-foreground leading-relaxed">{v.summary}</p>

      {/* Why It Matters */}
      <div className="bg-muted/50 rounded-md p-3">
        <div className="flex items-center gap-2 mb-1">
          <Info className="h-4 w-4 text-primary shrink-0" />
          <span className="text-sm font-semibold text-foreground">Why This Matters</span>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">{v.whyItMatters}</p>
      </div>

      {/* Common Inspector Language */}
      {v.commonInspectorLanguage && (
        <div className="bg-muted/30 rounded-md p-3 border-l-2 border-primary/30">
          <div className="flex items-center gap-2 mb-1">
            <MessageSquare className="h-4 w-4 text-primary shrink-0" />
            <span className="text-sm font-semibold text-foreground">What the Inspector Might Write</span>
          </div>
          <p className="text-sm text-muted-foreground italic">{v.commonInspectorLanguage}</p>
        </div>
      )}

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
        {v.estimatedCost && (
          <div className="flex items-center gap-1.5 text-foreground">
            <DollarSign className="h-4 w-4 text-primary" />
            <span>
              <strong>Estimated Cost:</strong> {v.estimatedCost.label}
            </span>
          </div>
        )}
        <div className="flex items-center gap-1.5 text-foreground">
          <ClipboardCheck className="h-4 w-4 text-primary" />
          <span>
            <strong>Re-inspection:</strong> {v.reinspectionLikely ? "Likely required" : "Usually not required"}
          </span>
        </div>
        {v.permitReviewNeeded && (
          <div className="flex items-center gap-1.5 text-foreground">
            <FileText className="h-4 w-4 text-primary" />
            <span>
              <strong>Permit review may be needed</strong>
            </span>
          </div>
        )}
      </div>

      {/* CTA */}
      <Button asChild className="w-full sm:w-auto">
        <Link to="/contact">
          {ctaLabel} <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
}

export default function ViolationDecoder() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const results = useMemo(() => {
    if (activeFilter) {
      return filterByCategory(activeFilter, VIOLATIONS);
    }
    if (query.trim()) {
      return searchViolations(query, VIOLATIONS);
    }
    return [];
  }, [query, activeFilter]);

  const showEmpty = (query.trim() || activeFilter) && results.length === 0;
  const showDefault = !query.trim() && !activeFilter;

  const handleFilterClick = (keyword: string) => {
    if (activeFilter === keyword) {
      setActiveFilter(null);
    } else {
      setActiveFilter(keyword);
      setQuery("");
    }
  };

  const handleSearchChange = (value: string) => {
    setQuery(value);
    if (value.trim()) {
      setActiveFilter(null);
    }
  };

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <div className="flex items-center gap-3">
          <ShieldAlert className="h-6 w-6 text-primary" />
          <CardTitle className="font-heading text-2xl text-foreground">
            Florida Deck &amp; Patio Inspection Failure Explainer
          </CardTitle>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Got a failed inspection notice? Enter the code from your notice (e.g., R507.2) or describe the issue in your own words (e.g., "railing height" or "no permit") to get a plain-English explanation, common repair steps, and what to do next.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Type a code (R507.2), keyword (hurricane strap), or describe the issue…"
            className="pl-10"
            value={query}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </div>

        {/* Quick Filters */}
        <div>
          <p className="text-xs text-muted-foreground mb-2">Quick filters:</p>
          <div className="flex flex-wrap gap-2">
            {QUICK_FILTERS.map((f) => (
              <button
                key={f.keyword}
                onClick={() => handleFilterClick(f.keyword)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                  activeFilter === f.keyword
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border bg-muted text-foreground hover:bg-primary hover:text-primary-foreground"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <Alert className="border-primary/20 bg-primary/5">
          <Shield className="h-4 w-4 text-primary" />
          <AlertDescription className="text-xs text-muted-foreground leading-relaxed">
            This tool provides general educational guidance based on common Florida residential outdoor-structure inspection issues. It is not official code interpretation. Final requirements vary by jurisdiction, approved plans, product approvals, and inspector notes. Always consult your local building department for official guidance.
          </AlertDescription>
        </Alert>

        {/* Default state */}
        {showDefault && (
          <div className="text-center py-6">
            <p className="text-sm text-muted-foreground mb-1">
              Search or select a filter above to explore <strong>{VIOLATIONS.length}</strong> common Florida deck, patio, and outdoor structure inspection issues.
            </p>
            <p className="text-xs text-muted-foreground">
              Covers structural framing, railings &amp; stairs, permits &amp; documentation, HVHZ/Miami-Dade requirements, drainage, and electrical issues.
            </p>
          </div>
        )}

        {/* Empty state */}
        {showEmpty && (
          <div className="text-center py-8 space-y-4">
            <p className="text-sm text-muted-foreground">
              No results found for "<strong>{query || activeFilter}</strong>."
            </p>
            <p className="text-xs text-muted-foreground">
              Try a different code, keyword, or use the quick filters above. Common searches include "ledger," "railing," "permit," and "hurricane strap."
            </p>
            <Button asChild variant="outline">
              <Link to="/contact">
                Need Help Reading Your Inspection Notice? <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        )}

        {/* Results */}
        {results.length > 0 && (
          <>
            <p className="text-xs text-muted-foreground">
              Showing {results.length} result{results.length !== 1 ? "s" : ""}
              {query.trim() ? ` for "${query}"` : activeFilter ? ` for "${activeFilter}"` : ""}
            </p>
            <div className="space-y-4">
              {results.map((v) => (
                <ResultCard key={v.id} v={v} />
              ))}
            </div>

            {/* Post-results conversion block */}
            <div className="mt-8 rounded-lg border border-primary/20 bg-primary/5 p-6 text-center space-y-3">
              <h4 className="font-heading font-bold text-foreground text-lg">
                Need Professional Help With a Failed Inspection?
              </h4>
              <p className="text-sm text-muted-foreground max-w-xl mx-auto">
                We help Florida homeowners resolve inspection failures, fix code issues, and get permits closed out. Bring your inspection notice — we'll walk through it with you for free.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <Button asChild>
                  <Link to="/contact">
                    Get a Free Inspection Review <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/blog/florida-deck-inspection-failures">
                    Read the Full Guide <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
