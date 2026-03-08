import type { ViolationEntry } from "@/data/violationData";

const ALIASES: Record<string, string[]> = {
  "guard rail": ["railing", "guardrail", "guard"],
  "guardrail": ["railing", "guard rail", "guard"],
  "no permit": ["permit", "unpermitted", "after-the-fact"],
  "without permit": ["permit", "unpermitted"],
  "noa": ["hvhz", "notice of acceptance", "miami-dade"],
  "notice of acceptance": ["noa", "hvhz"],
  "hurricane zone": ["hvhz"],
  "high velocity": ["hvhz"],
  "staircase": ["stair", "step", "riser"],
  "steps": ["stair", "riser", "tread"],
  "banister": ["handrail", "railing"],
  "spindle": ["baluster", "guard", "railing"],
  "failed inspection": ["inspection", "failed"],
  "deck collapsed": ["ledger", "collapse", "connection"],
  "wobbly": ["loose", "guard", "railing"],
  "sagging": ["sag", "deflection", "joist", "beam"],
  "bouncy": ["bounce", "joist", "deflection"],
  "rot": ["rot", "moisture", "water damage", "deteriorated"],
  "water damage": ["rot", "moisture", "flashing", "drainage"],
};

function normalizeQuery(raw: string): string {
  return raw
    .toLowerCase()
    .replace(/[^\w\s./-]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeCode(raw: string): string {
  // "r507.2" -> "R507.2", "fbc r507.2" -> "R507.2"
  return raw
    .toUpperCase()
    .replace(/^FBC\s+/i, "")
    .replace(/^NEC\s+/i, "NEC ")
    .trim();
}

export function searchViolations(
  query: string,
  violations: ViolationEntry[]
): ViolationEntry[] {
  const q = normalizeQuery(query);
  if (!q) return [];

  const scored: { entry: ViolationEntry; score: number }[] = [];

  const qCode = normalizeCode(query);
  const qTokens = q.split(" ").filter(Boolean);

  // Expand query with aliases
  const expandedTerms = new Set(qTokens);
  for (const token of qTokens) {
    // Check multi-word aliases
    for (const [alias, expansions] of Object.entries(ALIASES)) {
      if (q.includes(alias) || token === alias) {
        expansions.forEach((e) => expandedTerms.add(e));
      }
    }
  }
  // Also check the full query against multi-word aliases
  for (const [alias, expansions] of Object.entries(ALIASES)) {
    if (q.includes(alias)) {
      expansions.forEach((e) => expandedTerms.add(e));
    }
  }

  for (const entry of violations) {
    let score = 0;

    // 1. Exact code match (highest priority)
    if (entry.code) {
      const entryCode = normalizeCode(entry.code);
      if (entryCode === qCode) {
        score += 100;
      } else if (entryCode.includes(qCode) || qCode.includes(entryCode)) {
        score += 50;
      }
    }

    // 2. Keyword match
    const entryKeywords = entry.keywords.map((k) => k.toLowerCase());
    for (const term of expandedTerms) {
      for (const kw of entryKeywords) {
        if (kw === term) {
          score += 20;
        } else if (kw.includes(term) || term.includes(kw)) {
          score += 10;
        }
      }
    }

    // 3. Title match
    const titleLower = entry.title.toLowerCase();
    for (const term of expandedTerms) {
      if (titleLower.includes(term)) {
        score += 15;
      }
    }

    // 4. Type/category match
    const typeLower = entry.type.replace(/_/g, " ");
    for (const term of expandedTerms) {
      if (typeLower.includes(term)) {
        score += 8;
      }
    }

    // 5. Summary/explanation text match (lowest weight)
    const summaryLower = entry.summary.toLowerCase();
    for (const term of expandedTerms) {
      if (summaryLower.includes(term)) {
        score += 3;
      }
    }

    // 6. Related terms match
    if (entry.relatedTerms) {
      for (const term of expandedTerms) {
        for (const rt of entry.relatedTerms) {
          if (rt.toLowerCase().includes(term)) {
            score += 5;
          }
        }
      }
    }

    if (score > 0) {
      scored.push({ entry, score });
    }
  }

  // Sort by score descending
  scored.sort((a, b) => b.score - a.score);
  return scored.map((s) => s.entry);
}

export function filterByCategory(
  keyword: string,
  violations: ViolationEntry[]
): ViolationEntry[] {
  const kw = keyword.toLowerCase();
  return violations.filter(
    (v) =>
      v.keywords.some((k) => k.toLowerCase().includes(kw)) ||
      v.type.replace(/_/g, " ").includes(kw) ||
      v.title.toLowerCase().includes(kw)
  );
}
