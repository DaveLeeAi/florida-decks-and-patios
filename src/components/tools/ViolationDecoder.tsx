import { useState, useMemo, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import {
  AlertTriangle, Search, ShieldAlert, ShieldCheck, DollarSign, Wrench,
  ClipboardCheck, ArrowRight, Info, FileText, MessageSquare, Shield,
  HelpCircle, BookOpen, Clipboard, MapPin, Download, ChevronDown,
  ChevronRight, CheckCircle, Send, Star, Phone,
} from "lucide-react";
import {
  VIOLATIONS, CTA_LABELS, TYPE_LABELS, QUICK_FILTERS, POPULAR_ISSUES,
  COMMON_INSPECTOR_NOTES, EXAMPLE_INSPECTION_NOTES, MOST_COMMON_ISSUES,
  JURISDICTIONS, PERMIT_DECISION_TREE, INSPECTION_CHECKLIST, REINSPECTION_CHECKLIST,
  type ViolationEntry, type Jurisdiction,
} from "@/data/violationData";
import { searchViolations, filterByCategory, parseInspectionNote, type ScoredResult } from "@/utils/violationSearch";

/* ── Severity Config ── */
const severityConfig = {
  critical: { color: "bg-destructive text-destructive-foreground", icon: ShieldAlert, label: "Critical — Act Now" },
  moderate: { color: "bg-accent text-accent-foreground", icon: AlertTriangle, label: "Moderate" },
  minor: { color: "bg-muted text-muted-foreground", icon: ShieldCheck, label: "Minor" },
};

const confidenceConfig = {
  high: { label: "Likely match", color: "bg-primary/10 text-primary border-primary/30" },
  medium: { label: "Possible match", color: "bg-accent/10 text-accent-foreground border-accent/30" },
  low: { label: "Related", color: "bg-muted text-muted-foreground border-border" },
};

/* ══════════════════════════════════════════
   RESULT CARD
   ══════════════════════════════════════════ */
function ResultCard({ v, confidence, showConfidence }: { v: ViolationEntry; confidence?: "high" | "medium" | "low"; showConfidence?: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const sev = severityConfig[v.severity];
  const SevIcon = sev.icon;
  const conf = confidence ? confidenceConfig[confidence] : null;

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden transition-shadow hover:shadow-md">
      <div className="p-4 sm:p-5 space-y-3">
        {/* Badges row */}
        <div className="flex flex-wrap items-center gap-1.5">
          {showConfidence && conf && (
            <Badge variant="outline" className={`text-[10px] ${conf.color}`}>
              <Star className="h-2.5 w-2.5 mr-0.5" />{conf.label}
            </Badge>
          )}
          <Badge className={`${sev.color} text-[10px]`}><SevIcon className="h-2.5 w-2.5 mr-0.5" />{sev.label}</Badge>
          <Badge variant="outline" className="text-[10px]">{TYPE_LABELS[v.type]}</Badge>
          {v.jurisdiction !== "Florida" && v.jurisdiction !== "General" && (
            <Badge variant="secondary" className="text-[10px]">{v.jurisdiction}</Badge>
          )}
        </div>

        {/* Title */}
        <div>
          <h3 className="font-heading font-bold text-foreground text-base sm:text-lg leading-snug">{v.title}</h3>
          {v.code && <p className="text-[11px] text-muted-foreground mt-0.5">Reference: {v.code}</p>}
        </div>

        {/* Summary */}
        <p className="text-sm text-muted-foreground leading-relaxed">{v.summary}</p>

        {/* Why it matters */}
        <div className="bg-muted/40 rounded-lg p-3">
          <div className="flex items-start gap-2 mb-1">
            <Info className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <span className="text-sm font-semibold text-foreground">Why This Matters to You</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed pl-6">{v.whyItMatters}</p>
        </div>

        {/* Inspector language */}
        {v.commonInspectorLanguage && (
          <div className="rounded-lg p-3 border-l-3 border-primary/30 bg-primary/5">
            <div className="flex items-start gap-2 mb-1">
              <MessageSquare className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <span className="text-sm font-semibold text-foreground">What the Inspector Might Write</span>
            </div>
            <p className="text-sm text-muted-foreground italic pl-6">{v.commonInspectorLanguage}</p>
          </div>
        )}

        {/* Expand toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1.5 text-sm text-primary font-medium hover:text-primary/80 transition-colors py-1"
        >
          {expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          {expanded ? "Hide repair steps & details" : "How do I fix this?"}
        </button>

        {/* Expanded details */}
        {expanded && (
          <div className="space-y-4 pt-1 animate-in fade-in-0 slide-in-from-top-2 duration-200">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Wrench className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold text-foreground">Steps to Fix</span>
              </div>
              <ol className="list-decimal list-inside space-y-1.5 text-sm text-foreground pl-1">
                {v.howToFix.map((step, i) => <li key={i} className="leading-relaxed">{step}</li>)}
              </ol>
            </div>

            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 text-sm border-t border-border pt-3">
              {v.estimatedCost && (
                <div className="flex items-center gap-1.5 text-foreground">
                  <DollarSign className="h-4 w-4 text-primary shrink-0" />
                  <span><strong>Typical cost:</strong> {v.estimatedCost.label}</span>
                </div>
              )}
              <div className="flex items-center gap-1.5 text-foreground">
                <ClipboardCheck className="h-4 w-4 text-primary shrink-0" />
                <span><strong>Reinspection:</strong> {v.reinspectionLikely ? "Likely required" : "Usually not required"}</span>
              </div>
              {v.permitReviewNeeded && (
                <div className="flex items-center gap-1.5 text-foreground">
                  <FileText className="h-4 w-4 text-primary shrink-0" />
                  <span><strong>Permit review may be needed</strong></span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-2 pt-1">
          <Button asChild size="sm" className="w-full sm:w-auto">
            <Link to="/contact">{CTA_LABELS[v.ctaType]} <ArrowRight className="ml-1.5 h-3.5 w-3.5" /></Link>
          </Button>
          <Button asChild variant="outline" size="sm" className="w-full sm:w-auto text-xs">
            <Link to="/blog/florida-deck-inspection-failures">
              <BookOpen className="mr-1 h-3 w-3" />Read the Full Guide
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   REINSPECTION CTA STRIP
   ══════════════════════════════════════════ */
function ReinspectionStrip() {
  return (
    <div className="rounded-xl border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10 p-5 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex-1 space-y-1">
          <h4 className="font-heading font-bold text-foreground text-base sm:text-lg flex items-center gap-2">
            <Phone className="h-5 w-5 text-primary" />
            Need Help with Your Reinspection?
          </h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            We help Florida homeowners fix inspection failures, prepare for reinspection, and close out permits — the right way.
          </p>
        </div>
        <Button asChild size="lg" className="shrink-0">
          <Link to="/contact">Get Reinspection Help <ArrowRight className="ml-2 h-4 w-4" /></Link>
        </Button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   PERMIT DECISION TREE
   ══════════════════════════════════════════ */
function PermitTree() {
  const [step, setStep] = useState(0);
  const [result, setResult] = useState<string | null>(null);
  const tree = PERMIT_DECISION_TREE;
  const current = tree.steps[step];

  const handleYes = () => {
    if ("yesMessage" in current && current.yesMessage) setResult(current.yesMessage as string);
    else if ("yesNext" in current && current.yesNext !== undefined) setStep(current.yesNext as number);
  };
  const handleNo = () => {
    if ("noMessage" in current && current.noMessage) setResult(current.noMessage as string);
    else if ("noNext" in current && current.noNext !== undefined) setStep(current.noNext as number);
  };

  return (
    <div className="rounded-xl border border-border bg-card p-4 sm:p-6 space-y-4">
      <div className="flex items-center gap-2">
        <FileText className="h-5 w-5 text-primary" />
        <h3 className="font-heading font-bold text-foreground text-base">{tree.title}</h3>
      </div>
      <p className="text-xs text-muted-foreground">{tree.disclaimer}</p>

      {!result ? (
        <div className="space-y-3">
          <p className="text-sm text-foreground font-medium">{current?.question}</p>
          <div className="flex gap-3">
            <Button size="sm" onClick={handleYes}>Yes</Button>
            <Button size="sm" variant="outline" onClick={handleNo}>No</Button>
          </div>
          <p className="text-xs text-muted-foreground">Step {step + 1} of {tree.steps.length}</p>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
            <p className="text-sm text-foreground leading-relaxed">{result}</p>
          </div>
          <div className="flex gap-3">
            <Button size="sm" variant="outline" onClick={() => { setStep(0); setResult(null); }}>Start Over</Button>
            <Button size="sm" asChild><Link to="/contact">Get Permit Help <ArrowRight className="ml-1.5 h-3.5 w-3.5" /></Link></Button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════
   CHECKLIST BLOCK
   ══════════════════════════════════════════ */
function ChecklistBlock({ title, sections, icon }: { title: string; sections: { section: string; items: string[] }[]; icon: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  const handleDownload = () => {
    let content = `${title}\n${"=".repeat(title.length)}\n\nThis checklist is for educational reference only. Requirements vary by county.\n\n`;
    sections.forEach((s) => {
      content += `## ${s.section}\n`;
      s.items.forEach((item) => { content += `☐ ${item}\n`; });
      content += "\n";
    });
    content += `\nGenerated from Florida Decks and Patios — floridadecksandpatios.com\n`;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `${title.replace(/\s+/g, "-").toLowerCase()}.txt`; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-4 hover:bg-muted/30 transition-colors">
        <div className="flex items-center gap-2">{icon}<span className="font-heading font-semibold text-foreground text-sm">{title}</span></div>
        {open ? <ChevronDown className="h-4 w-4 text-muted-foreground" /> : <ChevronRight className="h-4 w-4 text-muted-foreground" />}
      </button>
      {open && (
        <div className="px-4 pb-5 space-y-4 animate-in fade-in-0 duration-200">
          {sections.map((s, i) => (
            <div key={i}>
              <h4 className="text-sm font-semibold text-foreground mb-2">{s.section}</h4>
              <ul className="space-y-1.5">
                {s.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <span className="mt-0.5 h-4 w-4 rounded border border-border shrink-0 bg-background" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <Button size="sm" variant="outline" onClick={handleDownload} className="mt-2">
            <Download className="mr-1.5 h-3.5 w-3.5" />Download as Text File
          </Button>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════
   MINI LEAD FORM
   ══════════════════════════════════════════ */
function MiniLeadForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", city: "", issue: "", helpType: "" });
  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  if (submitted) {
    return (
      <div className="rounded-xl border border-primary/20 bg-primary/5 p-6 text-center space-y-3">
        <CheckCircle className="h-10 w-10 text-primary mx-auto" />
        <h4 className="font-heading font-bold text-foreground">We Got It — We'll Be in Touch</h4>
        <p className="text-sm text-muted-foreground">Our team will review your information and reach out within 24 hours.</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-card p-4 sm:p-6 space-y-4">
      <div className="text-center space-y-1.5">
        <h4 className="font-heading font-bold text-foreground text-base sm:text-lg">
          Send Us Your Inspection Notice
        </h4>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          Not sure what to do next? Share the details — we'll explain it in plain English and let you know your options. No obligation.
        </p>
      </div>
      <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-foreground mb-1" htmlFor="lead-name">Name *</label>
            <Input id="lead-name" required maxLength={100} value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Your name" className="h-9 text-sm" />
          </div>
          <div>
            <label className="block text-xs font-medium text-foreground mb-1" htmlFor="lead-email">Email *</label>
            <Input id="lead-email" required type="email" maxLength={255} value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@example.com" className="h-9 text-sm" />
          </div>
          <div>
            <label className="block text-xs font-medium text-foreground mb-1" htmlFor="lead-phone">Phone</label>
            <Input id="lead-phone" type="tel" maxLength={20} value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="(555) 000-0000" className="h-9 text-sm" />
          </div>
          <div>
            <label className="block text-xs font-medium text-foreground mb-1" htmlFor="lead-city">City / County</label>
            <Input id="lead-city" maxLength={100} value={form.city} onChange={(e) => update("city", e.target.value)} placeholder="Tampa, Hillsborough" className="h-9 text-sm" />
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-foreground mb-1" htmlFor="lead-type">What do you need help with?</label>
          <select id="lead-type" value={form.helpType} onChange={(e) => update("helpType", e.target.value)} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground">
            <option value="">Select…</option>
            <option value="failed_inspection">Failed inspection</option>
            <option value="permit_help">Need permit help</option>
            <option value="reinspection">Reinspection help</option>
            <option value="safety">Deck safety concern</option>
            <option value="noa">NOA / product approval issue</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-foreground mb-1" htmlFor="lead-issue">Describe your issue or paste your notice</label>
          <Textarea id="lead-issue" maxLength={1000} value={form.issue} onChange={(e) => update("issue", e.target.value)} placeholder="Tell us what happened or paste your inspection notice…" className="text-sm min-h-[70px]" />
        </div>
        <Button type="submit" className="w-full sm:w-auto"><Send className="mr-1.5 h-3.5 w-3.5" />Get My Inspection Review</Button>
      </form>
    </div>
  );
}

/* ══════════════════════════════════════════
   MOST COMMON ISSUES BLOCK
   ══════════════════════════════════════════ */
function MostCommonBlock({ onSelect }: { onSelect: (term: string) => void }) {
  const commonEntries = MOST_COMMON_ISSUES
    .map((id) => VIOLATIONS.find((v) => v.id === id))
    .filter(Boolean) as ViolationEntry[];

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Star className="h-5 w-5 text-primary" />
        <h3 className="font-heading font-semibold text-foreground text-base">Most Common Issues</h3>
      </div>
      <p className="text-xs text-muted-foreground">These are the inspection failures we see most often across Florida.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {commonEntries.map((entry) => {
          const sev = severityConfig[entry.severity];
          return (
            <button
              key={entry.id}
              onClick={() => onSelect(entry.title)}
              className="text-left p-3 rounded-lg border border-border bg-card hover:border-primary/30 hover:bg-primary/5 transition-all group"
            >
              <div className="flex items-start gap-2.5">
                <sev.icon className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground leading-snug group-hover:text-primary transition-colors">{entry.title}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-1">{entry.summary.slice(0, 80)}…</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   MAIN DECODER COMPONENT
   ══════════════════════════════════════════ */
export default function ViolationDecoder() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [jurisdiction, setJurisdiction] = useState<Jurisdiction>("General");
  const [pasteText, setPasteText] = useState("");
  const [showPermitTree, setShowPermitTree] = useState(false);

  // Search results
  const results = useMemo(() => {
    if (activeFilter) return filterByCategory(activeFilter, VIOLATIONS, jurisdiction);
    if (query.trim()) return searchViolations(query, VIOLATIONS, jurisdiction);
    return [];
  }, [query, activeFilter, jurisdiction]);

  // Paste-note parser
  const pasteResults = useMemo(() => {
    if (pasteText.trim().length > 10) return parseInspectionNote(pasteText, VIOLATIONS, jurisdiction);
    return { matches: [] as ScoredResult[], extractedPhrases: [] as string[] };
  }, [pasteText, jurisdiction]);

  const activeResults = pasteResults.matches.length > 0 ? pasteResults.matches : results;
  const showEmpty = (query.trim() || activeFilter || pasteText.trim().length > 10) && activeResults.length === 0;
  const showDefault = !query.trim() && !activeFilter && pasteResults.matches.length === 0;
  const isPasteMode = pasteResults.matches.length > 0;

  const handleFilterClick = useCallback((keyword: string) => {
    setActiveFilter((prev) => prev === keyword ? null : keyword);
    setQuery(""); setPasteText("");
  }, []);

  const handleSearchChange = useCallback((value: string) => {
    setQuery(value);
    if (value.trim()) { setActiveFilter(null); setPasteText(""); }
  }, []);

  const handlePasteExample = useCallback((text: string) => {
    setPasteText(text);
    setQuery(""); setActiveFilter(null);
  }, []);

  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <ShieldAlert className="h-6 w-6 text-primary shrink-0" />
          <CardTitle className="font-heading text-xl sm:text-2xl text-foreground leading-tight">
            Why Did My Deck Inspection Fail?
          </CardTitle>
        </div>
        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
          Search by code reference, describe the problem in your own words, or paste your inspector's notes below. We'll explain what it means and what to do next.
        </p>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* ── Jurisdiction ── */}
        <div>
          <label className="text-xs font-medium text-foreground mb-1.5 flex items-center gap-1.5" htmlFor="jurisdiction-select">
            <MapPin className="h-3.5 w-3.5 text-primary" /> Where is your property?
          </label>
          <select
            id="jurisdiction-select"
            value={jurisdiction}
            onChange={(e) => setJurisdiction(e.target.value as Jurisdiction)}
            className="w-full sm:w-auto rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
          >
            {JURISDICTIONS.map((j) => <option key={j.value} value={j.value}>{j.label}</option>)}
          </select>
          {(jurisdiction === "HVHZ" || jurisdiction === "Miami-Dade" || jurisdiction === "Broward") && (
            <p className="text-xs text-primary mt-1.5 flex items-center gap-1">
              <Shield className="h-3 w-3" /> HVHZ zones have stricter requirements — we'll prioritize those issues.
            </p>
          )}
        </div>

        {/* ── Search ── */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder='Try "deck pulling away" or "R507.2" or "no permit"…'
            className="pl-10 h-11"
            value={query}
            onChange={(e) => handleSearchChange(e.target.value)}
            aria-label="Search inspection issues"
          />
        </div>

        {/* ── Quick Filters ── */}
        <div>
          <p className="text-xs text-muted-foreground mb-2 font-medium">Browse by category:</p>
          <div className="flex flex-wrap gap-1.5">
            {QUICK_FILTERS.map((f) => (
              <button
                key={f.keyword}
                onClick={() => handleFilterClick(f.keyword)}
                aria-pressed={activeFilter === f.keyword}
                className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                  activeFilter === f.keyword
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border bg-muted text-foreground hover:bg-primary/10 hover:border-primary/30"
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
            <strong>Educational guidance only.</strong> This tool explains common Florida inspection issues in plain language — it's not official code interpretation. Requirements vary by jurisdiction and inspector.
          </AlertDescription>
        </Alert>

        {/* ══════════ DEFAULT STATE ══════════ */}
        {showDefault && (
          <div className="space-y-6">
            {/* Paste Inspection Notice */}
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 sm:p-5 space-y-3">
              <div className="flex items-center gap-2">
                <Clipboard className="h-5 w-5 text-primary" />
                <h3 className="font-heading font-semibold text-foreground text-base">Paste Your Inspection Notice</h3>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Got a failed inspection notice? Paste the text below and we'll identify the issues and explain each one.
              </p>
              <Textarea
                placeholder="Paste your inspection notice here…"
                className="text-sm min-h-[90px] bg-background"
                value={pasteText}
                onChange={(e) => { setPasteText(e.target.value); setQuery(""); setActiveFilter(null); }}
                aria-label="Paste inspection notice"
              />
              {pasteResults.extractedPhrases.length > 0 && (
                <div className="text-xs text-muted-foreground">
                  <span className="font-medium">Issues detected:</span>{" "}
                  {pasteResults.extractedPhrases.map((p, i) => (
                    <Badge key={i} variant="outline" className="text-[10px] mr-1 mb-1">{p}</Badge>
                  ))}
                </div>
              )}
              <p className="text-[10px] text-muted-foreground">Matches against {VIOLATIONS.length} known issues using keyword detection — no AI, no guessing.</p>

              {/* Example Notes */}
              <div className="pt-2 border-t border-primary/10">
                <p className="text-xs font-medium text-foreground mb-2">Try an example:</p>
                <div className="flex flex-wrap gap-1.5">
                  {EXAMPLE_INSPECTION_NOTES.map((ex) => (
                    <button
                      key={ex.label}
                      onClick={() => handlePasteExample(ex.text)}
                      className="text-[11px] px-2.5 py-1 rounded-full border border-border bg-background text-muted-foreground hover:bg-primary/10 hover:border-primary/30 hover:text-foreground transition-colors"
                    >
                      {ex.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Most Common Issues */}
            <MostCommonBlock onSelect={handleSearchChange} />

            {/* Popular Questions */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <HelpCircle className="h-5 w-5 text-primary" />
                <h3 className="font-heading font-semibold text-foreground text-base">Common Homeowner Questions</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {POPULAR_ISSUES.map((issue) => (
                  <button
                    key={issue.searchTerm}
                    onClick={() => handleSearchChange(issue.searchTerm)}
                    className="text-left text-sm px-4 py-3 rounded-lg border border-border bg-card text-foreground hover:bg-primary/5 hover:border-primary/30 transition-colors leading-snug"
                  >
                    {issue.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Inspector Notes */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <MessageSquare className="h-5 w-5 text-primary" />
                <h3 className="font-heading font-semibold text-foreground text-base">Recognize Your Inspector's Note?</h3>
              </div>
              <div className="space-y-2">
                {COMMON_INSPECTOR_NOTES.map((item) => (
                  <button
                    key={item.issueId}
                    onClick={() => { const e = VIOLATIONS.find((v) => v.id === item.issueId); if (e) handleSearchChange(e.title); }}
                    className="w-full text-left text-sm px-4 py-3 rounded-lg border border-border bg-card hover:bg-primary/5 hover:border-primary/30 transition-colors italic text-muted-foreground leading-snug"
                  >
                    {item.note}
                  </button>
                ))}
              </div>
            </div>

            {/* Permit Tree */}
            <div>
              <button onClick={() => setShowPermitTree(!showPermitTree)} className="flex items-center gap-2 text-left">
                {showPermitTree ? <ChevronDown className="h-4 w-4 text-primary" /> : <ChevronRight className="h-4 w-4 text-primary" />}
                <FileText className="h-5 w-5 text-primary" />
                <span className="font-heading font-semibold text-foreground text-base">Built Without a Permit? Start Here</span>
              </button>
              {showPermitTree && <div className="mt-3"><PermitTree /></div>}
            </div>

            {/* Checklists */}
            <div className="space-y-2">
              <h3 className="font-heading font-semibold text-foreground text-base flex items-center gap-2">
                <Download className="h-5 w-5 text-primary" /> Downloadable Checklists
              </h3>
              <ChecklistBlock title="Failed Inspection Checklist" sections={INSPECTION_CHECKLIST} icon={<ClipboardCheck className="h-4 w-4 text-primary" />} />
              <ChecklistBlock title="Reinspection Prep Checklist" sections={REINSPECTION_CHECKLIST} icon={<Clipboard className="h-4 w-4 text-primary" />} />
            </div>

            {/* Reinspection CTA */}
            <ReinspectionStrip />

            <p className="text-xs text-muted-foreground text-center">
              Covers <strong>{VIOLATIONS.length}</strong> common Florida deck, patio, porch, pergola, and outdoor structure inspection issues.
            </p>
          </div>
        )}

        {/* ══════════ EMPTY STATE ══════════ */}
        {showEmpty && (
          <div className="text-center py-8 space-y-5">
            <div className="space-y-2">
              <HelpCircle className="h-10 w-10 text-muted-foreground/50 mx-auto" />
              <p className="text-sm text-muted-foreground">
                No matching issues found for "<strong>{query || activeFilter || "your note"}</strong>"
              </p>
              <p className="text-xs text-muted-foreground max-w-md mx-auto leading-relaxed">
                Try describing the problem differently — for example, "deck pulling away" instead of a code number, or use the category filters above.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              <Button variant="outline" size="sm" onClick={() => { setQuery(""); setActiveFilter(null); setPasteText(""); }}>
                Clear & Start Over
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleSearchChange("failed inspection")}>
                Browse All Failed Inspections
              </Button>
            </div>

            <div className="rounded-xl border border-primary/20 bg-primary/5 p-5 space-y-3 max-w-lg mx-auto">
              <h4 className="font-heading font-bold text-foreground text-base">Can't Find Your Issue?</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Send us a photo or copy of your inspection notice. We'll read through it and explain every item — free, no obligation.
              </p>
              <Button asChild>
                <Link to="/contact">Get Help Reading Your Notice <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        )}

        {/* ══════════ RESULTS ══════════ */}
        {activeResults.length > 0 && (
          <>
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">
                {isPasteMode
                  ? `Found ${activeResults.length} issue${activeResults.length !== 1 ? "s" : ""} in your notice`
                  : `${activeResults.length} result${activeResults.length !== 1 ? "s" : ""}${query.trim() ? ` for "${query}"` : activeFilter ? ` in "${activeFilter}"` : ""}`
                }
              </p>
              {(query || activeFilter || pasteText) && (
                <button
                  onClick={() => { setQuery(""); setActiveFilter(null); setPasteText(""); }}
                  className="text-xs text-primary hover:text-primary/80 font-medium"
                >
                  Clear results
                </button>
              )}
            </div>

            <div className="space-y-3">
              {activeResults.slice(0, 10).map((r) => (
                <ResultCard
                  key={r.entry.id}
                  v={r.entry}
                  confidence={r.confidence}
                  showConfidence={isPasteMode || (query.trim().length > 0)}
                />
              ))}
            </div>

            {activeResults.length > 10 && (
              <p className="text-xs text-muted-foreground text-center">
                Showing top 10 of {activeResults.length} results. Try a more specific search to narrow down.
              </p>
            )}

            {/* Related reading */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
              <Link to="/blog/florida-deck-inspection-failures" className="flex items-center gap-2 p-3 rounded-lg border border-border hover:border-primary/30 hover:bg-primary/5 transition-colors text-sm text-foreground">
                <BookOpen className="h-4 w-4 text-primary shrink-0" />Full Guide: Florida Deck Inspection Failures
              </Link>
              <Link to="/blog/deck-permit-vs-code-issue" className="flex items-center gap-2 p-3 rounded-lg border border-border hover:border-primary/30 hover:bg-primary/5 transition-colors text-sm text-foreground">
                <BookOpen className="h-4 w-4 text-primary shrink-0" />Permit Issue vs. Code Violation
              </Link>
              <Link to="/blog/when-do-you-need-engineer-deck-florida" className="flex items-center gap-2 p-3 rounded-lg border border-border hover:border-primary/30 hover:bg-primary/5 transition-colors text-sm text-foreground">
                <BookOpen className="h-4 w-4 text-primary shrink-0" />When Do You Need an Engineer?
              </Link>
              <Link to="/services/permits-compliance" className="flex items-center gap-2 p-3 rounded-lg border border-border hover:border-primary/30 hover:bg-primary/5 transition-colors text-sm text-foreground">
                <Shield className="h-4 w-4 text-primary shrink-0" />Permits & Compliance Services
              </Link>
            </div>

            {/* Reinspection CTA */}
            <ReinspectionStrip />

            {/* Lead Form */}
            <MiniLeadForm />
          </>
        )}
      </CardContent>
    </Card>
  );
}
