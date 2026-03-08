import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  FileCheck,
  ArrowRight,
  ArrowLeft,
  AlertTriangle,
  CheckCircle2,
  Clock,
  DollarSign,
  Shield,
  Download,
  Phone,
  ExternalLink,
  Info,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  type PermitInputs,
  type PermitResult,
  permitCities,
  determinePermitRequirements,
  permitChecklist,
} from "@/data/permitRules";
import { useSiteData } from "@/contexts/SiteDataContext";

const TOTAL_STEPS = 4;

const heightOptions = [
  { value: "ground", label: 'Ground Level (under 12")', tip: "Typically the simplest permit scenario." },
  { value: "low", label: 'Low Deck (12\u201330")', tip: "Most jurisdictions require permits at 30 inches above grade." },
  { value: "elevated", label: 'Elevated Deck (30\u201372")', tip: "Elevated decks typically require additional structural review and engineering." },
  { value: "second-story", label: 'Second Story (72"+)', tip: "Always requires engineered plans and full permitting." },
];

const attachmentOptions = [
  { value: "ledger", label: "Ledger Attached to House", tip: "Attached decks almost always require permits and proper ledger connections." },
  { value: "freestanding", label: "Freestanding", tip: "May qualify for exemptions in some jurisdictions if small and ground-level." },
  { value: "masonry", label: "Attached to Masonry", tip: "Requires specialized anchoring — expansion bolts or epoxy anchors." },
  { value: "stucco", label: "Attached to Stucco Wall", tip: "Requires flashing behind stucco and proper moisture barrier." },
];

const roofOptions = [
  { value: "none", label: "No Cover" },
  { value: "pergola", label: "Open Pergola" },
  { value: "solid-roof", label: "Solid Roof" },
];

const electricalOptions = [
  { value: "none", label: "None" },
  { value: "lighting", label: "Lighting Only" },
  { value: "outlets-fans", label: "Outlets & Fans" },
];

function LabelWithTooltip({ label, tip }: { label: string; tip: string }) {
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="inline-flex items-center gap-1 cursor-help">
            {label}
            <HelpCircle className="h-3.5 w-3.5 text-muted-foreground" />
          </span>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs text-xs">{tip}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

function ToggleGroup({
  options,
  value,
  onChange,
}: {
  options: { value: string; label: string; tip?: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => onChange(o.value)}
          className={`text-sm px-4 py-2 rounded-lg border transition-colors ${
            value === o.value
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-background text-muted-foreground border-border hover:border-primary/50"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

function likelihoodColor(l: string) {
  switch (l) {
    case "almost-certainly": return "bg-destructive/10 text-destructive border-destructive/30";
    case "likely": return "bg-amber-500/10 text-amber-700 border-amber-500/30";
    case "possibly": return "bg-blue-500/10 text-blue-700 border-blue-500/30";
    default: return "bg-emerald-500/10 text-emerald-700 border-emerald-500/30";
  }
}

export default function PermitChecker() {
  const { settings } = useSiteData();
  const resultRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(1);
  const [result, setResult] = useState<PermitResult | null>(null);
  const [inputs, setInputs] = useState<PermitInputs>({
    cityId: "",
    deckSize: 300,
    height: "ground",
    attachment: "ledger",
    hasStairs: false,
    stairSteps: 4,
    roofType: "none",
    electrical: "none",
    hoaStatus: "no",
    floodZone: "no",
    material: "composite",
    railingsRequired: "no",
  });

  const update = <K extends keyof PermitInputs>(key: K, val: PermitInputs[K]) =>
    setInputs((p) => ({ ...p, [key]: val }));

  const progress = result ? 100 : (step / TOTAL_STEPS) * 100;

  const canProceed = () => {
    if (step === 1 && !inputs.cityId) return false;
    return true;
  };

  const next = () => {
    if (step < TOTAL_STEPS) setStep(step + 1);
  };
  const prev = () => {
    if (step > 1) setStep(step - 1);
  };

  const calculate = () => {
    const r = determinePermitRequirements(inputs);
    setResult(r);
    setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
  };

  const reset = () => {
    setResult(null);
    setStep(1);
  };

  const printChecklist = () => {
    const city = permitCities.find((c) => c.id === inputs.cityId);
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(`<!DOCTYPE html><html><head><title>Florida Deck Permit Checklist</title>
    <style>body{font-family:system-ui,sans-serif;max-width:700px;margin:40px auto;padding:0 20px;color:#222}
    h1{font-size:22px;margin-bottom:4px}h2{font-size:16px;margin-top:24px;border-bottom:1px solid #ccc;padding-bottom:4px}
    .item{display:flex;gap:12px;margin:12px 0;align-items:flex-start}
    .box{width:18px;height:18px;border:2px solid #666;border-radius:3px;flex-shrink:0;margin-top:2px}
    .meta{font-size:13px;color:#555}p{font-size:14px;line-height:1.6}
    .disclaimer{font-size:11px;color:#888;margin-top:30px;border-top:1px solid #ddd;padding-top:12px}
    @media print{body{margin:20px}}</style></head><body>
    <h1>Florida Deck Permit Checklist</h1>
    <p class="meta">${city ? city.name + ", " + city.county : "Florida"} · ${inputs.deckSize} sq ft · ${inputs.height === "ground" ? "Ground Level" : inputs.height === "low" ? "Low Deck" : inputs.height === "elevated" ? "Elevated Deck" : "Second Story"}</p>
    <h2>Pre-Permit Steps</h2>
    ${permitChecklist.map((c) => `<div class="item"><div class="box"></div><div><strong>${c.step}. ${c.title}</strong><br/><span class="meta">${c.description}</span></div></div>`).join("")}
    ${city ? `<h2>Local Contact</h2><p><strong>${city.permitDepartment}</strong><br/>${city.permitPhone}<br/><a href="${city.permitLink}">${city.permitLink}</a></p>` : ""}
    <p class="disclaimer">This checklist is for planning purposes only. Permit requirements vary by jurisdiction. Always confirm with your local building department before starting work. Generated by FloridaDecksAndPatios.com</p>
    </body></html>`);
    w.document.close();
    w.print();
  };

  const selectedCity = permitCities.find((c) => c.id === inputs.cityId);

  return (
    <div className="bg-card rounded-lg border border-border p-6 md:p-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <FileCheck className="h-6 w-6 text-primary" />
        <h2 className="font-heading text-2xl font-bold text-foreground">
          Florida Deck Permit Requirement Checker
        </h2>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        Answer a few questions about your project to see what permits, inspections, and fees to expect.
      </p>

      {/* Disclaimer Top */}
      <Alert className="mb-6 border-primary/30 bg-primary/5">
        <Info className="h-4 w-4 text-primary" />
        <AlertDescription className="text-xs text-foreground">
          This tool provides general guidance only. Permit requirements vary by jurisdiction. Always confirm with your local building department before starting work.
        </AlertDescription>
      </Alert>

      {/* Progress */}
      {!result && (
        <div className="mb-6">
          <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
            <span>Step {step} of {TOTAL_STEPS}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      )}

      {/* ── Form Steps ── */}
      {!result && (
        <div className="space-y-6">
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">City / Region</label>
                <select
                  value={inputs.cityId}
                  onChange={(e) => update("cityId", e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
                >
                  <option value="">Select a city...</option>
                  {permitCities.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.county})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Deck Size (sq ft): {inputs.deckSize}
                </label>
                <input
                  type="range"
                  min={50}
                  max={1500}
                  step={25}
                  value={inputs.deckSize}
                  onChange={(e) => update("deckSize", Number(e.target.value))}
                  className="w-full accent-primary"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>50</span><span>750</span><span>1500</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  <LabelWithTooltip label="Height Above Grade" tip="Florida Building Code generally requires permits for decks over 30 inches above grade. Second-story decks always require full engineering." />
                </label>
                <ToggleGroup
                  options={heightOptions}
                  value={inputs.height}
                  onChange={(v) => update("height", v as PermitInputs["height"])}
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  <LabelWithTooltip label="Attachment Type" tip="How the deck connects to your home is one of the biggest factors in permit requirements. Attached decks almost always require permits." />
                </label>
                <ToggleGroup
                  options={attachmentOptions}
                  value={inputs.attachment}
                  onChange={(v) => update("attachment", v as PermitInputs["attachment"])}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Stairs</label>
                <ToggleGroup
                  options={[
                    { value: "no", label: "No Stairs" },
                    { value: "yes", label: "Yes, has stairs" },
                  ]}
                  value={inputs.hasStairs ? "yes" : "no"}
                  onChange={(v) => update("hasStairs", v === "yes")}
                />
                {inputs.hasStairs && (
                  <div className="mt-3">
                    <label className="block text-xs text-muted-foreground mb-1">Number of steps: {inputs.stairSteps}</label>
                    <input
                      type="range"
                      min={2}
                      max={20}
                      value={inputs.stairSteps}
                      onChange={(e) => update("stairSteps", Number(e.target.value))}
                      className="w-full accent-primary"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Roof / Pergola Cover</label>
                <ToggleGroup
                  options={roofOptions}
                  value={inputs.roofType}
                  onChange={(v) => update("roofType", v as PermitInputs["roofType"])}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Electrical</label>
                <ToggleGroup
                  options={electricalOptions}
                  value={inputs.electrical}
                  onChange={(v) => update("electrical", v as PermitInputs["electrical"])}
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  <LabelWithTooltip label="HOA Community?" tip="HOA communities often require architectural review approval before you can apply for a building permit." />
                </label>
                <ToggleGroup
                  options={[
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" },
                    { value: "not-sure", label: "Not Sure" },
                  ]}
                  value={inputs.hoaStatus}
                  onChange={(v) => update("hoaStatus", v as PermitInputs["hoaStatus"])}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  <LabelWithTooltip label="Property in a Flood Zone?" tip="Flood zone properties typically require permits for any outdoor structure and must meet Base Flood Elevation requirements." />
                </label>
                <ToggleGroup
                  options={[
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" },
                    { value: "not-sure", label: "Not Sure" },
                  ]}
                  value={inputs.floodZone}
                  onChange={(v) => update("floodZone", v as PermitInputs["floodZone"])}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Deck Material</label>
                <ToggleGroup
                  options={[
                    { value: "pressure-treated", label: "Pressure Treated Wood" },
                    { value: "composite", label: "Composite" },
                    { value: "mixed", label: "Mixed Materials" },
                  ]}
                  value={inputs.material}
                  onChange={(v) => update("material", v as PermitInputs["material"])}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  <LabelWithTooltip label="Railings Required?" tip="Florida code requires railings on decks 30 inches or more above grade. Railings must be 36 inch minimum height with max 4 inch baluster spacing." />
                </label>
                <ToggleGroup
                  options={[
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" },
                  ]}
                  value={inputs.railingsRequired}
                  onChange={(v) => update("railingsRequired", v as PermitInputs["railingsRequired"])}
                />
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <h3 className="font-heading text-lg font-semibold text-foreground">Review Your Inputs</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="text-muted-foreground">City</div>
                <div className="text-foreground font-medium">{selectedCity?.name || "—"}</div>
                <div className="text-muted-foreground">Size</div>
                <div className="text-foreground font-medium">{inputs.deckSize} sq ft</div>
                <div className="text-muted-foreground">Height</div>
                <div className="text-foreground font-medium">{heightOptions.find((h) => h.value === inputs.height)?.label}</div>
                <div className="text-muted-foreground">Attachment</div>
                <div className="text-foreground font-medium">{attachmentOptions.find((a) => a.value === inputs.attachment)?.label}</div>
                <div className="text-muted-foreground">Stairs</div>
                <div className="text-foreground font-medium">{inputs.hasStairs ? `Yes (${inputs.stairSteps} steps)` : "No"}</div>
                <div className="text-muted-foreground">Roof/Pergola</div>
                <div className="text-foreground font-medium">{roofOptions.find((r) => r.value === inputs.roofType)?.label}</div>
                <div className="text-muted-foreground">Electrical</div>
                <div className="text-foreground font-medium">{electricalOptions.find((e) => e.value === inputs.electrical)?.label}</div>
                <div className="text-muted-foreground">HOA</div>
                <div className="text-foreground font-medium capitalize">{inputs.hoaStatus === "not-sure" ? "Not Sure" : inputs.hoaStatus === "yes" ? "Yes" : "No"}</div>
                <div className="text-muted-foreground">Flood Zone</div>
                <div className="text-foreground font-medium capitalize">{inputs.floodZone === "not-sure" ? "Not Sure" : inputs.floodZone === "yes" ? "Yes" : "No"}</div>
                <div className="text-muted-foreground">Material</div>
                <div className="text-foreground font-medium capitalize">{inputs.material.replace(/-/g, " ")}</div>
                <div className="text-muted-foreground">Railings</div>
                <div className="text-foreground font-medium">{inputs.railingsRequired === "yes" ? "Yes" : "No"}</div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between pt-2">
            <Button
              variant="outline"
              onClick={prev}
              disabled={step === 1}
              className="gap-1"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
            {step < TOTAL_STEPS ? (
              <Button onClick={next} disabled={!canProceed()} className="gap-1">
                Next <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={calculate} disabled={!canProceed()} className="gap-1 bg-primary text-primary-foreground">
                Check Requirements <FileCheck className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      )}

      {/* ── Results ── */}
      {result && (
        <div ref={resultRef} className="space-y-6 mt-2">
          {/* Likelihood Badge */}
          <div className={`rounded-lg border p-4 ${likelihoodColor(result.likelihood)}`}>
            <div className="flex items-center gap-2 mb-1">
              {result.likelihood === "almost-certainly" || result.likelihood === "likely" ? (
                <AlertTriangle className="h-5 w-5" />
              ) : (
                <CheckCircle2 className="h-5 w-5" />
              )}
              <span className="font-heading text-lg font-bold">{result.likelihoodLabel}</span>
            </div>
            <p className="text-sm opacity-90">{result.likelihoodExplanation}</p>
          </div>

          {/* Inspections */}
          <div className="bg-muted/30 rounded-lg p-4">
            <h3 className="font-heading text-base font-semibold text-foreground mb-3 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              Required Inspections Sequence
            </h3>
            <div className="space-y-0">
              {result.inspections.map((insp, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <div className="flex flex-col items-center">
                    <div className="h-7 w-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold shrink-0">
                      {i + 1}
                    </div>
                    {i < result.inspections.length - 1 && (
                      <div className="w-0.5 h-6 bg-primary/30" />
                    )}
                  </div>
                  <div className="pb-3">
                    <p className="text-sm font-semibold text-foreground">{insp.name}</p>
                    <p className="text-xs text-muted-foreground">{insp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fee & Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-muted/30 rounded-lg p-4">
              <h3 className="font-heading text-base font-semibold text-foreground mb-2 flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-primary" />
                Estimated Permit Fees
              </h3>
              <p className="text-2xl font-heading font-bold text-foreground">
                ${result.feeRange[0].toLocaleString()} – ${result.feeRange[1].toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Includes permit application fees{result.feeRange[1] > 1000 ? " and estimated engineering costs" : ""}. Actual fees vary by jurisdiction.
              </p>
            </div>
            <div className="bg-muted/30 rounded-lg p-4">
              <h3 className="font-heading text-base font-semibold text-foreground mb-2 flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                Construction Timeline
              </h3>
              <ul className="space-y-1 text-sm">
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Permit Processing</span>
                  <span className="text-foreground font-medium">{result.timeline.permitProcessing}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Inspections</span>
                  <span className="text-foreground font-medium">{result.timeline.inspectionTimeline}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Construction</span>
                  <span className="text-foreground font-medium">{result.timeline.constructionDuration}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Special Requirements */}
          {result.specialRequirements.length > 0 && (
            <div className="bg-muted/30 rounded-lg p-4">
              <h3 className="font-heading text-base font-semibold text-foreground mb-3 flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                Special Requirements for Your Project
              </h3>
              <ul className="space-y-2">
                {result.specialRequirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                    <span className="text-foreground">{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Common Mistakes */}
          {result.commonMistakes.length > 0 && (
            <div className="bg-amber-500/5 border border-amber-500/20 rounded-lg p-4">
              <h3 className="font-heading text-base font-semibold text-foreground mb-3 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-600" />
                Common Mistakes to Avoid
              </h3>
              <ul className="space-y-2">
                {result.commonMistakes.map((m, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0" />
                    <span className="text-foreground">{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Risk Warning Block */}
          {(result.likelihood === "almost-certainly" || result.likelihood === "likely") && (
            <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-4">
              <h3 className="font-heading text-base font-semibold text-destructive mb-3 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Risks of Building Without a Permit
              </h3>
              <ul className="space-y-2">
                {result.riskWarnings.map((w, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-destructive shrink-0" />
                    <span className="text-foreground">{w}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-muted-foreground mt-3 italic">
                This information is educational and does not constitute legal advice. Consult your local building department for official requirements.
              </p>
            </div>
          )}

          {/* Local Contact */}
          {selectedCity && (
            <div className="bg-muted/30 rounded-lg p-4">
              <h3 className="font-heading text-base font-semibold text-foreground mb-2">
                {selectedCity.permitDepartment}
              </h3>
              <div className="flex flex-wrap gap-3">
                <a
                  href={`tel:${selectedCity.permitPhone}`}
                  className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
                >
                  <Phone className="h-3.5 w-3.5" />
                  {selectedCity.permitPhone}
                </a>
                <a
                  href={selectedCity.permitLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  Permit Portal
                </a>
              </div>
            </div>
          )}

          {/* Download Checklist */}
          <Button onClick={printChecklist} variant="outline" className="w-full gap-2">
            <Download className="h-4 w-4" />
            Download Deck Permit Checklist
          </Button>

          {/* Internal Links */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link
              to="/tools#budget"
              className="text-sm text-center px-3 py-2 rounded-lg border border-border bg-background hover:border-primary/50 text-foreground transition-colors"
            >
              Deck Cost Estimator →
            </Link>
            <Link
              to="/tools#violations"
              className="text-sm text-center px-3 py-2 rounded-lg border border-border bg-background hover:border-primary/50 text-foreground transition-colors"
            >
              Violation Code Decoder →
            </Link>
            <Link
              to="/tools#repair"
              className="text-sm text-center px-3 py-2 rounded-lg border border-border bg-background hover:border-primary/50 text-foreground transition-colors"
            >
              Deck Repair Estimator →
            </Link>
          </div>

          {/* CTA */}
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 text-center">
            <h3 className="font-heading text-lg font-bold text-foreground mb-2">
              Need help pulling a permit or preparing for inspection?
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              We connect you with licensed Florida contractors who handle permitting, engineering, and inspections as part of the project.
            </p>
            <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold gap-1">
              <Link to={settings.ctaLink}>
                Request Deck Consultation <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Disclaimer Bottom */}
          <Alert className="border-primary/30 bg-primary/5">
            <Info className="h-4 w-4 text-primary" />
            <AlertDescription className="text-xs text-foreground">
              This tool provides general guidance only. Permit requirements vary by jurisdiction. Always confirm with your local building department before starting work. This is not legal or professional advice.
            </AlertDescription>
          </Alert>

          {/* Start Over */}
          <div className="text-center">
            <Button variant="ghost" onClick={reset} className="text-sm text-muted-foreground">
              ← Start Over with New Inputs
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
