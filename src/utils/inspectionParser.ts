// ═══════════════════════════════════════════════════════════════
// Inspection Note Parser — Structured Architecture for LLM Upgrade
// ═══════════════════════════════════════════════════════════════
//
// ARCHITECTURE NOTES (for future LLM integration):
// 1. parseDeterministic() — current keyword/pattern matching
// 2. parseLLM() — future: send to edge function that calls an LLM
// 3. parseInspectionNotes() — orchestrator that picks best strategy
//
// To add LLM: create an edge function, call it from parseLLM(),
// then update parseInspectionNotes() to try LLM first with
// deterministic as fallback.
// ═══════════════════════════════════════════════════════════════

import type { ViolationEntry, Jurisdiction } from "@/data/violationData";
import { parseInspectionNote, type ScoredResult } from "@/utils/violationSearch";

export interface ParsedPhrase {
  text: string;
  matchedKeywords: string[];
  confidence: "high" | "medium" | "low";
}

export interface ParserResult {
  matches: ScoredResult[];
  extractedPhrases: ParsedPhrase[];
  rawPhrases: string[];
  strategy: "deterministic" | "llm";
  inputLength: number;
  processingMs: number;
}

// ── Keyword Highlight Extraction ───────────────────────────────

const HIGHLIGHT_KEYWORDS = [
  "ledger", "guardrail", "railing", "handrail", "baluster", "joist", "beam",
  "post", "footing", "footer", "hurricane", "strap", "hanger", "bolt",
  "lag", "flashing", "rot", "decay", "mold", "termite", "GFCI", "receptacle",
  "permit", "unpermitted", "NOA", "HVHZ", "stair", "riser", "tread",
  "drainage", "grading", "deflection", "span", "spacing", "connection",
  "attachment", "anchor", "fastener", "inspection", "failed", "correction",
  "violation", "stop work", "reinspection", "collapse", "pulling away",
  "separating", "loose", "bouncy", "sinking", "sagging", "wobble",
];

function extractHighlightedKeywords(text: string): string[] {
  const lower = text.toLowerCase();
  return HIGHLIGHT_KEYWORDS.filter((kw) => lower.includes(kw.toLowerCase()));
}

// ── Phrase Confidence Scoring ──────────────────────────────────

function scorePhraseConfidence(phrase: string, matchedKeywords: string[]): "high" | "medium" | "low" {
  if (matchedKeywords.length >= 3) return "high";
  if (matchedKeywords.length >= 1) return "medium";
  return "low";
}

// ── Deterministic Parser (current) ─────────────────────────────

function parseDeterministic(
  noteText: string,
  violations: ViolationEntry[],
  jurisdiction?: Jurisdiction | null
): ParserResult {
  const start = performance.now();
  const { matches, extractedPhrases: rawPhrases } = parseInspectionNote(noteText, violations, jurisdiction);

  // Enhance phrases with keyword highlighting
  const extractedPhrases: ParsedPhrase[] = rawPhrases.map((text) => {
    const matchedKeywords = extractHighlightedKeywords(text);
    return {
      text,
      matchedKeywords,
      confidence: scorePhraseConfidence(text, matchedKeywords),
    };
  });

  return {
    matches,
    extractedPhrases,
    rawPhrases,
    strategy: "deterministic",
    inputLength: noteText.length,
    processingMs: Math.round(performance.now() - start),
  };
}

// ── LLM Parser (future placeholder) ────────────────────────────

// async function parseLLM(
//   noteText: string,
//   violations: ViolationEntry[],
//   jurisdiction?: Jurisdiction | null
// ): Promise<ParserResult> {
//   // Future: call edge function with the note text
//   // const { data } = await supabase.functions.invoke('parse-inspection-note', {
//   //   body: { noteText, jurisdiction }
//   // });
//   // Map LLM response to ParserResult format
//   throw new Error("LLM parser not yet implemented");
// }

// ── Orchestrator ───────────────────────────────────────────────

export function parseInspectionNotes(
  noteText: string,
  violations: ViolationEntry[],
  jurisdiction?: Jurisdiction | null
): ParserResult {
  // Current: deterministic only
  // Future: try LLM first, fall back to deterministic
  return parseDeterministic(noteText, violations, jurisdiction);
}

// ── Example Inspection Notes (expanded) ────────────────────────

export const ENHANCED_EXAMPLE_NOTES = [
  {
    label: "Ledger Board Failure",
    text: "Failed - ledger board attachment does not meet FBC R507.2. Lag screws at 24\" OC, code requires 16\" OC. Flashing missing behind ledger. Correct attachment and install proper flashing before reinspection.",
    expectedIssues: ["Ledger attachment", "Flashing"],
  },
  {
    label: "Railing & Stair Issues",
    text: "Guard rail height measured at 32 inches, minimum 36 inches required per R507.8. Baluster spacing exceeds 4 inch maximum at multiple locations. Stair risers inconsistent - variation exceeds 3/8 inch tolerance per R507.5.2. Handrail not graspable - exceeds 2 inch diameter.",
    expectedIssues: ["Railing height", "Baluster spacing", "Stair riser", "Handrail"],
  },
  {
    label: "HVHZ / NOA Rejection",
    text: "HVHZ inspection: Composite decking material does not have valid Miami-Dade NOA. Simpson Strong-Tie connectors used are approved but installation pattern incorrect - missing connectors at every other joist per NOA specifications. All decking must be replaced with NOA-approved product.",
    expectedIssues: ["NOA", "HVHZ connectors"],
  },
  {
    label: "Structural Concerns",
    text: "Joist span exceeds maximum for 2x8 at 16\" OC - measured 12 ft span, maximum allowed 11 ft 7 inches. Post not bearing on footing - post shifted 3 inches off center. Beam splice not at post location. Engineering review required for span correction.",
    expectedIssues: ["Joist span", "Post footing", "Beam splice"],
  },
  {
    label: "Permit & Process Issues",
    text: "Stop work order issued. Construction began before permit approval. Footing inspection not called prior to concrete pour. Work must stop immediately. Apply for after-the-fact permit with double fees. Footings may need to be exposed for verification.",
    expectedIssues: ["Permit", "Stop work", "Inspection sequence"],
  },
  {
    label: "Electrical & Drainage",
    text: "Outdoor receptacles not GFCI protected per NEC 210.8. Missing in-use weatherproof covers on deck outlets. Low-voltage lighting transformer not accessible. Improper grading causing water to pool against foundation. Deck drainage directing water toward structure.",
    expectedIssues: ["GFCI", "Weatherproof covers", "Drainage"],
  },
];

// ── Highlight text with matched keywords ───────────────────────

export function highlightKeywordsInText(text: string, keywords: string[]): Array<{ text: string; highlighted: boolean }> {
  if (keywords.length === 0) return [{ text, highlighted: false }];

  const pattern = new RegExp(`(${keywords.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "gi");
  const parts: Array<{ text: string; highlighted: boolean }> = [];
  let lastIndex = 0;

  text.replace(pattern, (match, _g1, offset) => {
    if (offset > lastIndex) {
      parts.push({ text: text.slice(lastIndex, offset), highlighted: false });
    }
    parts.push({ text: match, highlighted: true });
    lastIndex = offset + match.length;
    return match;
  });

  if (lastIndex < text.length) {
    parts.push({ text: text.slice(lastIndex), highlighted: false });
  }

  return parts;
}
