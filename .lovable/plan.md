

## Plan: Code Violation Decoder Tool + Blog Post + KB Data

### Overview
Three-part feature: (1) a structured database of Florida deck/patio inspection failures and code violations, (2) an interactive "Violation Code Decoder" tool where users enter a code and get an explanation + CTA, and (3) a comprehensive blog post on common violations and how to fix them.

---

### 1. Knowledge Base Entries (Database Insert)
Add 10-12 KB entries covering common Florida deck/patio inspection failures:
- Failed ledger board connections (FBC R507.2)
- Missing/inadequate flashing (FBC R507.2.1)
- Improper footing depth (FBC R403.1)
- Missing hurricane straps/ties (FBC R802.11)
- Railing height violations (FBC R312.1 — 36" vs 42")
- Stair riser/tread violations (FBC R311.7)
- Improper joist spacing/span (FBC R507.5)
- Missing permits / work without inspection
- Electrical code violations on outdoor structures
- HVHZ-specific violations (Miami-Dade NOA issues)
- Drainage/grading violations
- Missing post-to-beam connections

Each entry tagged with metadata: `{"type":"code_violation","code":"R507.2","severity":"structural"}`.

### 2. Violation Code Decoder Tool (New Component)
**File:** `src/components/tools/ViolationDecoder.tsx`

- Search input where users type a violation code (e.g., "R507.2") or keyword (e.g., "railing height")
- Static data object with ~20 common Florida Building Code violations mapped to:
  - Code reference (e.g., FBC R312.1)
  - Title (e.g., "Guard Rail Height Violation")
  - Severity level (Critical / Moderate / Minor)
  - Plain-English explanation of what failed and why it matters
  - How to fix it (brief steps)
  - Estimated repair cost range
  - Whether re-inspection is required
- Results display as cards with severity badges
- CTA button: "Get a Free Inspection" linking to /contact
- JSON-LD structured data for each violation (FAQSchema reuse)

**File:** `src/pages/Tools.tsx` — Add ViolationDecoder alongside existing tools.

### 3. Blog Post (siteData.ts)
Add a new blog post to the `blogPosts` array:
- **Title:** "Florida Deck Inspection Failures: The Top 10 Code Violations and How to Fix Them"
- **Category:** "Hurricane & Code"
- Covers each major violation with code reference, explanation, fix steps, cost estimate, and re-inspection requirements
- Structured with tables, lists, and BLUF pattern matching existing blog style
- Internal link to the Violation Decoder tool

### 4. Structured Data / SEO
- Add `FAQSchema` to the Tools page covering violation questions
- The decoder tool itself becomes a rich snippet source for searches like "Florida deck code violation R507.2"

### 5. Route Changes
None needed — the decoder goes on the existing `/tools` page.

### Files Modified
- `src/data/siteData.ts` — New blog post added to `blogPosts`
- `src/components/tools/ViolationDecoder.tsx` — New component
- `src/pages/Tools.tsx` — Import and render ViolationDecoder
- KB entries inserted via database tool

