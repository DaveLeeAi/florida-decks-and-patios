import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";
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
  HelpCircle,
  BookOpen,
  Clipboard,
} from "lucide-react";
import {
  VIOLATIONS,
  CTA_LABELS,
  TYPE_LABELS,
  QUICK_FILTERS,
  POPULAR_ISSUES,
  COMMON_INSPECTOR_NOTES,
  type ViolationEntry,
} from "@/data/violationData";
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

/* ── Result Card ── */
function ResultCard({ v }: { v: ViolationEntry }) {
  const sev = severityConfig[v.severity];
  const SevIcon = sev.icon;
  const ctaLabel = CTA_LABELS[v.ctaType];
  const typeLabel = TYPE_LABELS[v.type];

  return (
    <div className="rounded-lg border border-border bg-card p-4 sm:p-6 space-y-4">
      {/* Badges row */}
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

      {/* Title — homeowner-friendly first, code secondary */}
      <div>
        <h3 className="font-heading font-bold text-foreground text-base sm:text-lg leading-snug">
          {v.title}
        </h3>
        {v.code && (
          <p className="text-xs text-muted-foreground mt-0.5">Code reference: {v.code}</p>
        )}
      </div>

      {/* Summary */}
      <p className="text-sm text-muted-foreground leading-relaxed">{v.summary}</p>

      {/* Why It Matters */}
      <div className="bg-muted/50 rounded-md p-3 sm:p-4">
        <div className="flex items-center gap-2 mb-1.5">
          <Info className="h-4 w-4 text-primary shrink-0" />
          <span className="text-sm font-semibold text-foreground">Why This Matters</span>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">{v.whyItMatters}</p>
      </div>

      {/* Common Inspector Language */}
      {v.commonInspectorLanguage && (
        <div className="bg-muted/30 rounded-md p-3 sm:p-4 border-l-2 border-primary/30">
          <div className="flex items-center gap-2 mb-1.5">
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
        <ol className="list-decimal list-inside space-y-1.5 text-sm text-foreground">
          {v.howToFix.map((step, i) => (
            <li key={i} className="leading-relaxed">{step}</li>
          ))}
        </ol>
      </div>

      {/* Meta row */}
      <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4 text-sm border-t border-border pt-4">
        {v.estimatedCost && (
          <div className="flex items-center gap-1.5 text-foreground">
            <DollarSign className="h-4 w-4 text-primary shrink-0" />
            <span>
              <strong>Estimated Cost:</strong> {v.estimatedCost.label}
            </span>
          </div>
        )}
        <div className="flex items-center gap-1.5 text-foreground">
          <ClipboardCheck className="h-4 w-4 text-primary shrink-0" />
          <span>
            <strong>Re-inspection:</strong> {v.reinspectionLikely ? "Likely required" : "Usually not required"}
          </span>
        </div>
        {v.permitReviewNeeded && (
          <div className="flex items-center gap-1.5 text-foreground">
            <FileText className="h-4 w-4 text-primary shrink-0" />
            <span><strong>Permit review may be needed</strong></span>
          </div>
        )}
      </div>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <Button asChild className="w-full sm:w-auto">
          <Link to="/contact">
            {ctaLabel} <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
        <Button asChild variant="outline" className="w-full sm:w-auto text-xs">
          <Link to="/blog/florida-deck-inspection-failures">
            <BookOpen className="mr-1.5 h-3.5 w-3.5" />
            Read the Full Guide
          </Link>
        </Button>
      </div>
    </div>
  );
}

/* ── Main Component ── */
export default function ViolationDecoder() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [showPasteInput, setShowPasteInput] = useState(false);

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

  const handleInspectorNoteClick = (issueId: string) => {
    const entry = VIOLATIONS.find((v) => v.id === issueId);
    if (entry) {
      setQuery(entry.title);
      setActiveFilter(null);
    }
  };

  const handlePopularIssueClick = (searchTerm: string) => {
    setQuery(searchTerm);
    setActiveFilter(null);
  };

  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <ShieldAlert className="h-6 w-6 text-primary shrink-0" />
          <CardTitle className="font-heading text-xl sm:text-2xl text-foreground leading-tight">
            Florida Deck &amp; Patio Inspection Failure Explainer
          </CardTitle>
        </div>
        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
          Got a failed inspection notice? Enter the code from your notice (e.g., R507.2) or describe the issue in plain English (e.g., "my deck is pulling away from the house") to get an explanation, repair steps, and what to do next.
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* ── Search ── */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Type a code, keyword, or describe your issue…"
            className="pl-10 h-11"
            value={query}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </div>

        {/* ── Quick Filters ── */}
        <div>
          <p className="text-xs text-muted-foreground mb-2 font-medium">Browse by category:</p>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {QUICK_FILTERS.map((f) => (
              <button
                key={f.keyword}
                onClick={() => handleFilterClick(f.keyword)}
                className={`text-xs px-3 py-1.5 rounded-md border transition-colors ${
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

        {/* ── Disclaimer ── */}
        <Alert className="border-primary/20 bg-primary/5">
          <Shield className="h-4 w-4 text-primary" />
          <AlertDescription className="text-xs text-muted-foreground leading-relaxed">
            This tool provides general educational guidance based on common Florida residential outdoor-structure inspection issues. It is not official code interpretation. Final requirements vary by jurisdiction, approved plans, product approvals, and inspector notes.
          </AlertDescription>
        </Alert>

        {/* ── Default State ── */}
        {showDefault && (
          <div className="space-y-8">
            {/* Popular Issues */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <HelpCircle className="h-5 w-5 text-primary" />
                <h3 className="font-heading font-semibold text-foreground text-base">Popular Issues</h3>
              </div>
              <p className="text-xs text-muted-foreground mb-3">
                Click any issue below to see the explanation:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {POPULAR_ISSUES.map((issue) => (
                  <button
                    key={issue.searchTerm}
                    onClick={() => handlePopularIssueClick(issue.searchTerm)}
                    className="text-left text-sm px-4 py-3 rounded-md border border-border bg-muted/50 text-foreground hover:bg-primary/10 hover:border-primary/30 transition-colors"
                  >
                    {issue.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Common Inspector Notes */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Clipboard className="h-5 w-5 text-primary" />
                <h3 className="font-heading font-semibold text-foreground text-base">
                  Most Common Failed Inspection Notes
                </h3>
              </div>
              <p className="text-xs text-muted-foreground mb-3">
                Recognize something from your inspection notice? Click to learn more:
              </p>
              <div className="space-y-2">
                {COMMON_INSPECTOR_NOTES.map((item) => (
                  <button
                    key={item.issueId}
                    onClick={() => handleInspectorNoteClick(item.issueId)}
                    className="w-full text-left text-sm px-4 py-3 rounded-md border border-border bg-card hover:bg-primary/5 hover:border-primary/30 transition-colors italic text-muted-foreground"
                  >
                    {item.note}
                  </button>
                ))}
              </div>
            </div>

            {/* Paste Your Notice — placeholder */}
            <div className="rounded-lg border border-dashed border-primary/30 bg-primary/5 p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="h-5 w-5 text-primary" />
                <h3 className="font-heading font-semibold text-foreground text-base">
                  Paste Your Inspection Notice
                </h3>
                <Badge variant="outline" className="text-[10px] ml-1">Coming Soon</Badge>
              </div>
              <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                Soon you'll be able to paste your full inspection notice text here and we'll automatically identify and explain every issue mentioned.
              </p>
              {!showPasteInput ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowPasteInput(true)}
                  className="text-xs"
                >
                  Try It (Beta)
                </Button>
              ) : (
                <div className="space-y-2">
                  <Textarea
                    placeholder="Paste your inspection notice text here…"
                    className="text-sm min-h-[80px] bg-background"
                    onChange={(e) => {
                      const text = e.target.value.trim();
                      if (text.length > 5) {
                        // Extract first meaningful phrase as search
                        const firstLine = text.split(/[.\n]/)[0]?.trim();
                        if (firstLine) handleSearchChange(firstLine);
                      }
                    }}
                  />
                  <p className="text-[10px] text-muted-foreground">
                    Beta — currently searches using the first line of your pasted text. Full multi-issue parsing coming soon.
                  </p>
                </div>
              )}
            </div>

            {/* Stats line */}
            <p className="text-xs text-muted-foreground text-center">
              This tool covers <strong>{VIOLATIONS.length}</strong> common Florida deck, patio, porch, pergola, and outdoor structure inspection issues across structural, safety, permit, HVHZ, electrical, and drainage categories.
            </p>
          </div>
        )}

        {/* ── Empty State ── */}
        {showEmpty && (
          <div className="text-center py-8 space-y-4">
            <p className="text-sm text-muted-foreground">
              No results found for "<strong>{query || activeFilter}</strong>."
            </p>
            <p className="text-xs text-muted-foreground max-w-md mx-auto">
              Try different wording — for example, "deck pulling away" instead of a code number, or use the category filters above.
            </p>
            {/* Still not sure block */}
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-5 mt-4 space-y-3 max-w-lg mx-auto">
              <h4 className="font-heading font-bold text-foreground text-base">
                Still not sure what your notice means?
              </h4>
              <p className="text-sm text-muted-foreground">
                Bring your inspection notice to a free consultation. We'll read through it with you and explain every item in plain English — no obligation.
              </p>
              <Button asChild>
                <Link to="/contact">
                  Get Help Reading Your Notice <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        )}

        {/* ── Results ── */}
        {results.length > 0 && (
          <>
            <p className="text-xs text-muted-foreground">
              Showing {results.length} result{results.length !== 1 ? "s" : ""}
              {query.trim() ? ` for "${query}"` : activeFilter ? ` for "${activeFilter}"` : ""}
            </p>
            <div className="space-y-5">
              {results.map((v) => (
                <ResultCard key={v.id} v={v} />
              ))}
            </div>

            {/* ── Still not sure CTA ── */}
            <div className="rounded-lg border border-border bg-muted/50 p-5 sm:p-6 text-center space-y-3 mt-6">
              <HelpCircle className="h-8 w-8 text-primary mx-auto" />
              <h4 className="font-heading font-bold text-foreground text-base sm:text-lg">
                Still Not Sure What Your Notice Means?
              </h4>
              <p className="text-sm text-muted-foreground max-w-xl mx-auto">
                Inspection notices can be confusing. Bring yours to a free consultation — we'll walk through every item with you and explain your options. No obligation, no pressure.
              </p>
              <Button asChild>
                <Link to="/contact">
                  Get Help Reading Your Notice <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* ── Post-results conversion block ── */}
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-5 sm:p-6 text-center space-y-3">
              <h4 className="font-heading font-bold text-foreground text-base sm:text-lg">
                Need Professional Help With a Failed Inspection?
              </h4>
              <p className="text-sm text-muted-foreground max-w-xl mx-auto">
                We help Florida homeowners resolve inspection failures, fix code issues, and get permits closed out. Bring your inspection notice — we'll walk through it with you for free.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3 pt-1">
                <Button asChild>
                  <Link to="/contact">
                    Get a Free Inspection Review <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/blog/florida-deck-inspection-failures">
                    <BookOpen className="mr-1.5 h-3.5 w-3.5" />
                    Read the Full Guide
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
