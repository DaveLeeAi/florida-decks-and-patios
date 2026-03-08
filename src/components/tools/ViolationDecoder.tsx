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
  ChevronRight, CheckCircle, Send,
} from "lucide-react";
import {
  VIOLATIONS, CTA_LABELS, TYPE_LABELS, QUICK_FILTERS, POPULAR_ISSUES,
  COMMON_INSPECTOR_NOTES, JURISDICTIONS, PERMIT_DECISION_TREE,
  INSPECTION_CHECKLIST, REINSPECTION_CHECKLIST,
  type ViolationEntry, type Jurisdiction,
} from "@/data/violationData";
import { searchViolations, filterByCategory, parseInspectionNote } from "@/utils/violationSearch";

/* ── Severity Config ── */
const severityConfig = {
  critical: { color: "bg-destructive text-destructive-foreground", icon: ShieldAlert, label: "Critical — Act Now" },
  moderate: { color: "bg-accent text-accent-foreground", icon: AlertTriangle, label: "Moderate" },
  minor: { color: "bg-muted text-muted-foreground", icon: ShieldCheck, label: "Minor" },
};

/* ══════════════════════════════════════════
   RESULT CARD
   ══════════════════════════════════════════ */
function ResultCard({ v }: { v: ViolationEntry }) {
  const [expanded, setExpanded] = useState(false);
  const sev = severityConfig[v.severity];
  const SevIcon = sev.icon;

  return (
    <div className="rounded-lg border border-border bg-card p-4 sm:p-6 space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <Badge className={sev.color}><SevIcon className="h-3 w-3 mr-1" />{sev.label}</Badge>
        <Badge variant="outline" className="text-xs">{TYPE_LABELS[v.type]}</Badge>
        {v.jurisdiction !== "Florida" && v.jurisdiction !== "General" && (
          <Badge variant="secondary" className="text-xs">{v.jurisdiction}</Badge>
        )}
      </div>

      <div>
        <h3 className="font-heading font-bold text-foreground text-base sm:text-lg leading-snug">{v.title}</h3>
        {v.code && <p className="text-xs text-muted-foreground mt-0.5">Code ref: {v.code}</p>}
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed">{v.summary}</p>

      <div className="bg-muted/50 rounded-md p-3">
        <div className="flex items-center gap-2 mb-1"><Info className="h-4 w-4 text-primary shrink-0" /><span className="text-sm font-semibold text-foreground">Why This Matters</span></div>
        <p className="text-sm text-muted-foreground leading-relaxed">{v.whyItMatters}</p>
      </div>

      {v.commonInspectorLanguage && (
        <div className="bg-muted/30 rounded-md p-3 border-l-2 border-primary/30">
          <div className="flex items-center gap-2 mb-1"><MessageSquare className="h-4 w-4 text-primary shrink-0" /><span className="text-sm font-semibold text-foreground">What the Inspector Might Write</span></div>
          <p className="text-sm text-muted-foreground italic">{v.commonInspectorLanguage}</p>
        </div>
      )}

      <button onClick={() => setExpanded(!expanded)} className="flex items-center gap-1.5 text-sm text-primary font-medium hover:text-primary/80 transition-colors">
        {expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        {expanded ? "Hide repair steps & details" : "Show repair steps & cost estimate"}
      </button>

      {expanded && (
        <div className="space-y-4 pt-2 animate-in fade-in-0 slide-in-from-top-2 duration-200">
          <div>
            <div className="flex items-center gap-2 mb-2"><Wrench className="h-4 w-4 text-primary" /><span className="text-sm font-semibold text-foreground">How to Fix</span></div>
            <ol className="list-decimal list-inside space-y-1.5 text-sm text-foreground">
              {v.howToFix.map((step, i) => <li key={i} className="leading-relaxed">{step}</li>)}
            </ol>
          </div>

          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 text-sm border-t border-border pt-3">
            {v.estimatedCost && (
              <div className="flex items-center gap-1.5 text-foreground"><DollarSign className="h-4 w-4 text-primary shrink-0" /><span><strong>Est. Cost:</strong> {v.estimatedCost.label}</span></div>
            )}
            <div className="flex items-center gap-1.5 text-foreground"><ClipboardCheck className="h-4 w-4 text-primary shrink-0" /><span><strong>Reinspection:</strong> {v.reinspectionLikely ? "Likely required" : "Usually not required"}</span></div>
            {v.permitReviewNeeded && (
              <div className="flex items-center gap-1.5 text-foreground"><FileText className="h-4 w-4 text-primary shrink-0" /><span><strong>Permit review may be needed</strong></span></div>
            )}
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-2 pt-2">
        <Button asChild size="sm" className="w-full sm:w-auto"><Link to="/contact">{CTA_LABELS[v.ctaType]} <ArrowRight className="ml-1.5 h-3.5 w-3.5" /></Link></Button>
        <Button asChild variant="outline" size="sm" className="w-full sm:w-auto text-xs"><Link to="/blog/florida-deck-inspection-failures"><BookOpen className="mr-1 h-3 w-3" />Read the Full Guide</Link></Button>
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
    if ("yesMessage" in current && current.yesMessage) { setResult(current.yesMessage as string); }
    else if ("yesNext" in current && current.yesNext !== undefined) { setStep(current.yesNext as number); }
  };
  const handleNo = () => {
    if ("noMessage" in current && current.noMessage) { setResult(current.noMessage as string); }
    else if ("noNext" in current && current.noNext !== undefined) { setStep(current.noNext as number); }
  };
  const reset = () => { setStep(0); setResult(null); };

  return (
    <div className="rounded-lg border border-border bg-card p-4 sm:p-6 space-y-4">
      <div className="flex items-center gap-2"><FileText className="h-5 w-5 text-primary" /><h3 className="font-heading font-bold text-foreground text-base">{tree.title}</h3></div>
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
          <div className="bg-primary/5 border border-primary/20 rounded-md p-4">
            <p className="text-sm text-foreground leading-relaxed">{result}</p>
          </div>
          <div className="flex gap-3">
            <Button size="sm" variant="outline" onClick={reset}>Start Over</Button>
            <Button size="sm" asChild><Link to="/contact">Get Permit Help <ArrowRight className="ml-1.5 h-3.5 w-3.5" /></Link></Button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════
   CHECKLIST (printable)
   ══════════════════════════════════════════ */
function ChecklistBlock({ title, sections, icon }: { title: string; sections: { section: string; items: string[] }[]; icon: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  const handleDownload = () => {
    let content = `${title}\n${"=".repeat(title.length)}\n\n`;
    content += "This checklist is for educational reference only. Requirements vary by county.\n\n";
    sections.forEach((s) => {
      content += `## ${s.section}\n`;
      s.items.forEach((item) => { content += `☐ ${item}\n`; });
      content += "\n";
    });
    content += `\nGenerated from Florida Decks and Patios — floridadecksandpatios.com\n`;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title.replace(/\s+/g, "-").toLowerCase()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-4 hover:bg-muted/30 transition-colors">
        <div className="flex items-center gap-2">{icon}<span className="font-heading font-semibold text-foreground text-sm">{title}</span></div>
        {open ? <ChevronDown className="h-4 w-4 text-muted-foreground" /> : <ChevronRight className="h-4 w-4 text-muted-foreground" />}
      </button>
      {open && (
        <div className="px-4 pb-4 space-y-4 animate-in fade-in-0 duration-200">
          {sections.map((s, i) => (
            <div key={i}>
              <h4 className="text-sm font-semibold text-foreground mb-2">{s.section}</h4>
              <ul className="space-y-1.5">
                {s.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="mt-0.5 h-4 w-4 rounded border border-border shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <Button size="sm" variant="outline" onClick={handleDownload}><Download className="mr-1.5 h-3.5 w-3.5" />Download Checklist</Button>
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
      <div className="rounded-lg border border-primary/20 bg-primary/5 p-6 text-center space-y-3">
        <CheckCircle className="h-10 w-10 text-primary mx-auto" />
        <h4 className="font-heading font-bold text-foreground">Thank You!</h4>
        <p className="text-sm text-muted-foreground">We'll review your information and get back to you within 24 hours.</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border bg-card p-4 sm:p-6 space-y-4">
      <div className="text-center space-y-1">
        <h4 className="font-heading font-bold text-foreground text-base sm:text-lg">Not Sure What Your Notice Means?</h4>
        <p className="text-sm text-muted-foreground">Send us your inspection notice — we'll explain it in plain English. No obligation.</p>
      </div>
      <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-foreground mb-1">Name *</label>
            <Input required maxLength={100} value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Your name" className="h-9 text-sm" />
          </div>
          <div>
            <label className="block text-xs font-medium text-foreground mb-1">Email *</label>
            <Input required type="email" maxLength={255} value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@example.com" className="h-9 text-sm" />
          </div>
          <div>
            <label className="block text-xs font-medium text-foreground mb-1">Phone</label>
            <Input type="tel" maxLength={20} value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="(555) 000-0000" className="h-9 text-sm" />
          </div>
          <div>
            <label className="block text-xs font-medium text-foreground mb-1">City / County</label>
            <Input maxLength={100} value={form.city} onChange={(e) => update("city", e.target.value)} placeholder="Tampa, Hillsborough" className="h-9 text-sm" />
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-foreground mb-1">What do you need help with?</label>
          <select value={form.helpType} onChange={(e) => update("helpType", e.target.value)} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground">
            <option value="">Select...</option>
            <option value="failed_inspection">Failed inspection</option>
            <option value="permit_help">Need permit help</option>
            <option value="reinspection">Reinspection help</option>
            <option value="safety">Deck safety concern</option>
            <option value="noa">NOA / product approval issue</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-foreground mb-1">Describe your issue</label>
          <Textarea maxLength={1000} value={form.issue} onChange={(e) => update("issue", e.target.value)} placeholder="Paste your inspection notice or describe the issue..." className="text-sm min-h-[70px]" />
        </div>
        <Button type="submit" className="w-full sm:w-auto"><Send className="mr-1.5 h-3.5 w-3.5" />Get My Inspection Review</Button>
      </form>
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
  const [showPasteInput, setShowPasteInput] = useState(false);
  const [showPermitTree, setShowPermitTree] = useState(false);

  // Search results
  const results = useMemo(() => {
    if (activeFilter) return filterByCategory(activeFilter, VIOLATIONS, jurisdiction);
    if (query.trim()) return searchViolations(query, VIOLATIONS, jurisdiction);
    return [];
  }, [query, activeFilter, jurisdiction]);

  // Paste-note parser results
  const pasteResults = useMemo(() => {
    if (pasteText.trim().length > 10) return parseInspectionNote(pasteText, VIOLATIONS, jurisdiction);
    return { matches: [], extractedPhrases: [] };
  }, [pasteText, jurisdiction]);

  const activeResults = pasteResults.matches.length > 0 ? pasteResults.matches : results;
  const showEmpty = (query.trim() || activeFilter || pasteText.trim().length > 10) && activeResults.length === 0;
  const showDefault = !query.trim() && !activeFilter && pasteResults.matches.length === 0;

  const handleFilterClick = useCallback((keyword: string) => {
    setActiveFilter((prev) => prev === keyword ? null : keyword);
    setQuery("");
    setPasteText("");
  }, []);

  const handleSearchChange = useCallback((value: string) => {
    setQuery(value);
    if (value.trim()) { setActiveFilter(null); setPasteText(""); }
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
          Enter a code from your notice (e.g., R507.2), describe the issue in your own words, or paste your inspection notice below.
        </p>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* ── Jurisdiction Selector ── */}
        <div>
          <label className="text-xs font-medium text-foreground mb-1.5 flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-primary" /> Where is your property?
          </label>
          <select
            value={jurisdiction}
            onChange={(e) => setJurisdiction(e.target.value as Jurisdiction)}
            className="w-full sm:w-auto rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
          >
            {JURISDICTIONS.map((j) => (
              <option key={j.value} value={j.value}>{j.label}</option>
            ))}
          </select>
          {(jurisdiction === "HVHZ" || jurisdiction === "Miami-Dade" || jurisdiction === "Broward") && (
            <p className="text-xs text-primary mt-1">HVHZ zones have stricter requirements — we'll prioritize those issues in your results.</p>
          )}
        </div>

        {/* ── Search ── */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Type a code, keyword, or describe your issue…"
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
                className={`text-xs px-3 py-1.5 rounded-md border transition-colors ${
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
            <strong>Educational guidance only.</strong> This tool explains common Florida inspection issues in plain language. It is not official code interpretation. Requirements vary by jurisdiction, approved plans, and inspector discretion.
          </AlertDescription>
        </Alert>

        {/* ── Default State ── */}
        {showDefault && (
          <div className="space-y-6">
            {/* Paste Inspection Notice */}
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 sm:p-5 space-y-3">
              <div className="flex items-center gap-2">
                <Clipboard className="h-5 w-5 text-primary" />
                <h3 className="font-heading font-semibold text-foreground text-base">Paste Your Inspection Notice</h3>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Paste the text from your failed inspection notice or inspector's comments. We'll identify the issues mentioned and explain each one.
              </p>
              {!showPasteInput ? (
                <Button variant="outline" size="sm" onClick={() => setShowPasteInput(true)} className="text-xs">
                  <FileText className="mr-1.5 h-3.5 w-3.5" /> Paste My Notice
                </Button>
              ) : (
                <div className="space-y-2">
                  <Textarea
                    placeholder="Paste your inspection notice text here… e.g. 'Failed due to missing ledger flashing and improper fasteners. Guard rail height below minimum. No permit on file.'"
                    className="text-sm min-h-[100px] bg-background"
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
                  <p className="text-[10px] text-muted-foreground">We match against {VIOLATIONS.length} known issues using keyword detection — not AI interpretation.</p>
                </div>
              )}
            </div>

            {/* Popular Issues */}
            <div>
              <div className="flex items-center gap-2 mb-3"><HelpCircle className="h-5 w-5 text-primary" /><h3 className="font-heading font-semibold text-foreground text-base">Common Homeowner Questions</h3></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {POPULAR_ISSUES.map((issue) => (
                  <button key={issue.searchTerm} onClick={() => handleSearchChange(issue.searchTerm)} className="text-left text-sm px-4 py-3 rounded-md border border-border bg-muted/50 text-foreground hover:bg-primary/10 hover:border-primary/30 transition-colors leading-snug">
                    {issue.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Common Inspector Notes */}
            <div>
              <div className="flex items-center gap-2 mb-3"><MessageSquare className="h-5 w-5 text-primary" /><h3 className="font-heading font-semibold text-foreground text-base">Recognize Your Inspector's Note?</h3></div>
              <div className="space-y-2">
                {COMMON_INSPECTOR_NOTES.map((item) => (
                  <button key={item.issueId} onClick={() => { const e = VIOLATIONS.find((v) => v.id === item.issueId); if (e) handleSearchChange(e.title); }} className="w-full text-left text-sm px-4 py-3 rounded-md border border-border bg-card hover:bg-primary/5 hover:border-primary/30 transition-colors italic text-muted-foreground leading-snug">
                    {item.note}
                  </button>
                ))}
              </div>
            </div>

            {/* Built Without Permit */}
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
              <h3 className="font-heading font-semibold text-foreground text-base flex items-center gap-2"><Download className="h-5 w-5 text-primary" /> Downloadable Checklists</h3>
              <ChecklistBlock title="Failed Inspection Checklist" sections={INSPECTION_CHECKLIST} icon={<ClipboardCheck className="h-4 w-4 text-primary" />} />
              <ChecklistBlock title="Reinspection Prep Checklist" sections={REINSPECTION_CHECKLIST} icon={<Clipboard className="h-4 w-4 text-primary" />} />
            </div>

            <p className="text-xs text-muted-foreground text-center">
              This tool covers <strong>{VIOLATIONS.length}</strong> common Florida deck, patio, porch, pergola, and outdoor structure inspection issues.
            </p>
          </div>
        )}

        {/* ── Empty State ── */}
        {showEmpty && (
          <div className="text-center py-6 space-y-4">
            <p className="text-sm text-muted-foreground">No results found for "<strong>{query || activeFilter || "your note"}</strong>."</p>
            <p className="text-xs text-muted-foreground max-w-md mx-auto">Try different wording — for example, "deck pulling away" instead of a code number, or use the category filters above.</p>
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-5 space-y-3 max-w-lg mx-auto">
              <h4 className="font-heading font-bold text-foreground text-base">Can't Find Your Issue?</h4>
              <p className="text-sm text-muted-foreground">Send us your inspection notice — we'll read through it and explain every item. No obligation.</p>
              <Button asChild><Link to="/contact">Get Help Reading Your Notice <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
            </div>
          </div>
        )}

        {/* ── Results ── */}
        {activeResults.length > 0 && (
          <>
            <p className="text-xs text-muted-foreground">
              {pasteResults.matches.length > 0
                ? `Found ${activeResults.length} issue${activeResults.length !== 1 ? "s" : ""} in your notice`
                : `Showing ${activeResults.length} result${activeResults.length !== 1 ? "s" : ""}${query.trim() ? ` for "${query}"` : activeFilter ? ` for "${activeFilter}"` : ""}`
              }
            </p>

            <div className="space-y-4">
              {activeResults.slice(0, 10).map((v) => <ResultCard key={v.id} v={v} />)}
            </div>

            {activeResults.length > 10 && (
              <p className="text-xs text-muted-foreground text-center">Showing top 10 of {activeResults.length} results. Try a more specific search to narrow down.</p>
            )}

            {/* Related content links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
              <Link to="/blog/florida-deck-inspection-failures" className="flex items-center gap-2 p-3 rounded-md border border-border hover:border-primary/30 hover:bg-primary/5 transition-colors text-sm text-foreground">
                <BookOpen className="h-4 w-4 text-primary shrink-0" />
                <span>Full Guide: Florida Deck Inspection Failures</span>
              </Link>
              <Link to="/blog/deck-permit-vs-code-issue" className="flex items-center gap-2 p-3 rounded-md border border-border hover:border-primary/30 hover:bg-primary/5 transition-colors text-sm text-foreground">
                <BookOpen className="h-4 w-4 text-primary shrink-0" />
                <span>Permit Issue vs. Code Violation Explained</span>
              </Link>
              <Link to="/blog/when-do-you-need-engineer-deck-florida" className="flex items-center gap-2 p-3 rounded-md border border-border hover:border-primary/30 hover:bg-primary/5 transition-colors text-sm text-foreground">
                <BookOpen className="h-4 w-4 text-primary shrink-0" />
                <span>When Do You Need an Engineer?</span>
              </Link>
              <Link to="/services/permits-compliance" className="flex items-center gap-2 p-3 rounded-md border border-border hover:border-primary/30 hover:bg-primary/5 transition-colors text-sm text-foreground">
                <Shield className="h-4 w-4 text-primary shrink-0" />
                <span>Our Permits & Compliance Services</span>
              </Link>
            </div>

            {/* Mini Lead Form */}
            <MiniLeadForm />
          </>
        )}
      </CardContent>
    </Card>
  );
}
