import type { ViolationEntry, Jurisdiction } from "@/data/violationData";

/* ──────────────────────────────────────────
   ALIAS MAP — homeowner language → search terms
   ────────────────────────────────────────── */
const ALIASES: Record<string, string[]> = {
  // Railing / guard
  "guard rail": ["railing", "guardrail", "guard"],
  "guardrail": ["railing", "guard rail", "guard"],
  "banister": ["handrail", "railing"],
  "spindle": ["baluster", "guard", "railing"],
  "railing too short": ["railing", "height", "guard"],
  "rail height": ["railing", "height", "guard"],
  "wobbly railing": ["loose", "guard", "railing", "attachment"],
  "wobbly": ["loose", "guard", "railing"],
  "railing moves": ["loose", "guard", "railing"],

  // Permits
  "no permit": ["permit", "unpermitted", "after-the-fact"],
  "without permit": ["permit", "unpermitted"],
  "didn't get a permit": ["permit", "unpermitted"],
  "illegal deck": ["permit", "unpermitted"],
  "permit expired": ["permit", "expired"],
  "do i need a permit": ["permit"],
  "stop work": ["permit", "inspection"],
  "red tag": ["inspection", "failed", "stop work"],

  // HVHZ / NOA
  "noa": ["hvhz", "notice of acceptance", "miami-dade", "NOA"],
  "notice of acceptance": ["noa", "hvhz"],
  "hurricane zone": ["hvhz"],
  "high velocity": ["hvhz"],
  "miami dade": ["hvhz", "noa", "miami-dade", "HVHZ"],
  "miami-dade": ["hvhz", "noa", "HVHZ"],
  "broward": ["hvhz", "noa"],

  // Stairs
  "staircase": ["stair", "step", "riser"],
  "steps": ["stair", "riser", "tread"],
  "uneven steps": ["stair", "riser", "inconsistent"],
  "tripped on stairs": ["stair", "riser", "tread", "trip"],
  "steps too steep": ["stair", "riser", "height"],
  "stairs different heights": ["stair", "riser", "inconsistent"],

  // Structural - homeowner language
  "deck collapsed": ["ledger", "collapse", "connection"],
  "deck falling": ["ledger", "collapse", "pulling away"],
  "pulling away": ["ledger", "separating", "connection", "detaching"],
  "separating from house": ["ledger", "connection", "pulling away"],
  "deck feels bouncy": ["joist", "bounce", "deflection", "span"],
  "bouncy": ["bounce", "joist", "deflection"],
  "spongy deck": ["joist", "bounce", "deflection", "rot"],
  "sagging": ["sag", "deflection", "joist", "beam"],
  "deck is sinking": ["footing", "settling", "foundation"],
  "deck is leaning": ["post", "footing", "settling"],
  "deck pulling away": ["ledger", "separating", "pulling away", "detaching"],
  "deck separating": ["ledger", "separating", "pulling away"],
  "gap between deck and house": ["ledger", "separating", "pulling away"],

  // Water / rot
  "rot": ["rot", "moisture", "water damage", "deteriorated"],
  "rotting": ["rot", "decay", "deteriorated", "moisture"],
  "water damage": ["rot", "moisture", "flashing", "drainage"],
  "wood is soft": ["rot", "decay", "deteriorated"],
  "moldy": ["rot", "moisture", "mold"],
  "standing water": ["drainage", "pooling", "water"],
  "mold on deck": ["rot", "moisture", "mold", "fungus"],

  // Inspection process
  "failed inspection": ["inspection", "failed", "final inspection"],
  "inspection failed": ["inspection", "failed"],
  "failed final": ["final inspection", "failed"],
  "didn't pass inspection": ["inspection", "failed"],

  // Electrical
  "outlet": ["receptacle", "GFCI", "electrical"],
  "plug": ["receptacle", "GFCI", "electrical", "outlet"],
  "shocked": ["GFCI", "bonding", "grounding", "electrical"],
  "got shocked": ["GFCI", "bonding", "grounding", "electrical"],

  // Other homeowner terms
  "termites": ["termite", "pest", "insect"],
  "bugs eating wood": ["termite", "pest", "decay"],
  "hot tub": ["hot tub", "spa", "heavy", "load"],
  "spa": ["hot tub", "heavy", "load"],
  "screen porch": ["screen", "enclosure", "lanai"],
  "lanai": ["screen", "enclosure", "screened porch"],
  "pergola": ["pergola", "patio cover", "anchorage"],
  "screen enclosure": ["screen", "enclosure", "lanai", "attachment"],

  // Hardware
  "joist hanger": ["joist hanger", "hanger", "joist"],
  "simpson": ["connector", "hanger", "hurricane", "simpson"],
  "hurricane strap": ["hurricane", "strap", "tie", "uplift"],
  "hurricane clip": ["hurricane", "strap", "tie"],
  "post cap": ["post", "beam", "connection", "post cap"],
};

/* ──────────────────────────────────────────
   NORMALIZATION
   ────────────────────────────────────────── */
function normalizeQuery(raw: string): string {
  return raw
    .toLowerCase()
    .replace(/[^\w\s./-]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeCode(raw: string): string {
  return raw
    .toUpperCase()
    .replace(/^FBC\s+/i, "")
    .replace(/^NEC\s+/i, "NEC ")
    .trim();
}

/* ──────────────────────────────────────────
   JURISDICTION MATCHING
   ────────────────────────────────────────── */
const JURISDICTION_HIERARCHY: Record<Jurisdiction, Jurisdiction[]> = {
  "General": ["General", "Florida", "HVHZ", "Miami-Dade", "Broward"],
  "Florida": ["Florida", "General"],
  "HVHZ": ["HVHZ", "Miami-Dade", "Broward", "Florida", "General"],
  "Miami-Dade": ["Miami-Dade", "HVHZ", "Florida", "General"],
  "Broward": ["Broward", "HVHZ", "Florida", "General"],
};

function jurisdictionScore(entryJurisdiction: Jurisdiction, selectedJurisdiction: Jurisdiction | null): number {
  if (!selectedJurisdiction || selectedJurisdiction === "General") return 0;
  const hierarchy = JURISDICTION_HIERARCHY[selectedJurisdiction];
  if (!hierarchy) return 0;
  const idx = hierarchy.indexOf(entryJurisdiction);
  if (idx === -1) return -5; // deprioritize non-matching
  if (idx === 0) return 15; // exact match bonus
  if (idx === 1) return 5;
  return 0;
}

/* ──────────────────────────────────────────
   MAIN SEARCH
   ────────────────────────────────────────── */
export function searchViolations(
  query: string,
  violations: ViolationEntry[],
  jurisdiction?: Jurisdiction | null
): ViolationEntry[] {
  const q = normalizeQuery(query);
  if (!q) return [];

  const scored: { entry: ViolationEntry; score: number }[] = [];
  const qCode = normalizeCode(query);
  const qTokens = q.split(" ").filter(Boolean);

  // Expand query with aliases
  const expandedTerms = new Set(qTokens);
  for (const token of qTokens) {
    for (const [alias, expansions] of Object.entries(ALIASES)) {
      if (q.includes(alias) || token === alias) {
        expansions.forEach((e) => expandedTerms.add(e.toLowerCase()));
      }
    }
  }
  for (const [alias, expansions] of Object.entries(ALIASES)) {
    if (q.includes(alias)) {
      expansions.forEach((e) => expandedTerms.add(e.toLowerCase()));
    }
  }

  for (const entry of violations) {
    let score = 0;

    // 1. Exact code match
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
        if (kw === term) score += 20;
        else if (kw.includes(term) || term.includes(kw)) score += 10;
      }
    }

    // 3. Alias match (entry-level aliases)
    if (entry.aliases) {
      for (const alias of entry.aliases) {
        const aliasLower = alias.toLowerCase();
        if (q.includes(aliasLower) || aliasLower.includes(q)) {
          score += 25;
        } else {
          for (const term of expandedTerms) {
            if (aliasLower.includes(term)) score += 8;
          }
        }
      }
    }

    // 4. Title match
    const titleLower = entry.title.toLowerCase();
    for (const term of expandedTerms) {
      if (titleLower.includes(term)) score += 15;
    }

    // 5. Type/category match
    const typeLower = entry.type.replace(/_/g, " ");
    for (const term of expandedTerms) {
      if (typeLower.includes(term)) score += 8;
    }

    // 6. Summary text match
    const summaryLower = entry.summary.toLowerCase();
    for (const term of expandedTerms) {
      if (summaryLower.includes(term)) score += 3;
    }

    // 7. Related terms match
    if (entry.relatedTerms) {
      for (const term of expandedTerms) {
        for (const rt of entry.relatedTerms) {
          if (rt.toLowerCase().includes(term)) score += 5;
        }
      }
    }

    // 8. Search weight bonus
    if (entry.searchWeight && score > 0) {
      score += entry.searchWeight;
    }

    // 9. Jurisdiction bonus/penalty
    score += jurisdictionScore(entry.jurisdiction, jurisdiction ?? null);

    if (score > 0) {
      scored.push({ entry, score });
    }
  }

  scored.sort((a, b) => b.score - a.score);
  return scored.map((s) => s.entry);
}

/* ──────────────────────────────────────────
   CATEGORY FILTER
   ────────────────────────────────────────── */
export function filterByCategory(
  keyword: string,
  violations: ViolationEntry[],
  jurisdiction?: Jurisdiction | null
): ViolationEntry[] {
  const kw = keyword.toLowerCase();
  let filtered = violations.filter(
    (v) =>
      v.keywords.some((k) => k.toLowerCase().includes(kw)) ||
      v.type.replace(/_/g, " ").includes(kw) ||
      v.title.toLowerCase().includes(kw)
  );

  if (jurisdiction && jurisdiction !== "General") {
    const hierarchy = JURISDICTION_HIERARCHY[jurisdiction];
    filtered.sort((a, b) => {
      const aIdx = hierarchy.indexOf(a.jurisdiction);
      const bIdx = hierarchy.indexOf(b.jurisdiction);
      return (aIdx === -1 ? 99 : aIdx) - (bIdx === -1 ? 99 : bIdx);
    });
  }

  return filtered;
}

/* ──────────────────────────────────────────
   PASTE-NOTE PARSER
   Extracts keywords/phrases from pasted inspection text
   and matches against the violation dataset.
   ────────────────────────────────────────── */
export function parseInspectionNote(
  noteText: string,
  violations: ViolationEntry[],
  jurisdiction?: Jurisdiction | null
): { matches: ViolationEntry[]; extractedPhrases: string[] } {
  const text = noteText.toLowerCase().trim();
  if (text.length < 5) return { matches: [], extractedPhrases: [] };

  const extractedPhrases: string[] = [];
  const matchScores = new Map<string, number>();

  // Split into sentences/phrases
  const sentences = text.split(/[.\n;]+/).map((s) => s.trim()).filter((s) => s.length > 3);

  for (const sentence of sentences) {
    // Check each violation's keywords, aliases, and inspector language
    for (const entry of violations) {
      let sentenceScore = 0;

      // Check keywords
      for (const kw of entry.keywords) {
        if (sentence.includes(kw.toLowerCase())) {
          sentenceScore += 15;
        }
      }

      // Check aliases
      if (entry.aliases) {
        for (const alias of entry.aliases) {
          if (sentence.includes(alias.toLowerCase())) {
            sentenceScore += 20;
          }
        }
      }

      // Check inspector language
      if (entry.commonInspectorLanguage) {
        const inspectorPhrases = entry.commonInspectorLanguage.toLowerCase()
          .replace(/[""]/g, "")
          .split(/\s+or\s+/)
          .map((p) => p.trim().replace(/^["']|["']$/g, ""));

        for (const phrase of inspectorPhrases) {
          // Check if significant words from the inspector phrase appear in the sentence
          const phraseWords = phrase.split(/\s+/).filter((w) => w.length > 3);
          const matchedWords = phraseWords.filter((w) => sentence.includes(w));
          if (matchedWords.length >= Math.ceil(phraseWords.length * 0.5)) {
            sentenceScore += 30;
          }
        }
      }

      // Check code reference
      if (entry.code) {
        const codeNorm = entry.code.toLowerCase().replace(/\s+/g, "");
        const sentenceNorm = sentence.replace(/\s+/g, "");
        if (sentenceNorm.includes(codeNorm)) {
          sentenceScore += 50;
        }
      }

      if (sentenceScore > 0) {
        const existing = matchScores.get(entry.id) || 0;
        matchScores.set(entry.id, existing + sentenceScore);
        if (!extractedPhrases.includes(sentence) && sentence.length < 200) {
          extractedPhrases.push(sentence);
        }
      }
    }
  }

  // Also run against alias map
  for (const [alias, expansions] of Object.entries(ALIASES)) {
    if (text.includes(alias)) {
      if (!extractedPhrases.some((p) => p.includes(alias))) {
        extractedPhrases.push(alias);
      }
    }
  }

  // Sort by score and return matched entries
  const sortedIds = [...matchScores.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([id]) => id);

  const matches = sortedIds
    .map((id) => violations.find((v) => v.id === id))
    .filter(Boolean) as ViolationEntry[];

  // Apply jurisdiction prioritization
  if (jurisdiction && jurisdiction !== "General") {
    const hierarchy = JURISDICTION_HIERARCHY[jurisdiction];
    matches.sort((a, b) => {
      const aScore = matchScores.get(a.id) || 0;
      const bScore = matchScores.get(b.id) || 0;
      const aJuris = hierarchy.indexOf(a.jurisdiction) === 0 ? 10 : 0;
      const bJuris = hierarchy.indexOf(b.jurisdiction) === 0 ? 10 : 0;
      return (bScore + bJuris) - (aScore + aJuris);
    });
  }

  return { matches, extractedPhrases: extractedPhrases.slice(0, 5) };
}
