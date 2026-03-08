

## Plan: Production-Ready Florida Deck Inspection Failure Explainer

### Summary
Replace the existing basic `ViolationDecoder.tsx` with a comprehensive, homeowner-friendly "Inspection Failure Explainer" system across 4 new/modified files, plus KB data insertion.

---

### Files to Create/Modify

#### 1. `src/data/violationData.ts` (NEW)
- Define the `ViolationEntry` TypeScript type with all fields from the spec (id, type, jurisdiction, code, title, severity, keywords, summary, whyItMatters, commonInspectorLanguage, howToFix, estimatedCost, reinspectionLikely, permitReviewNeeded, relatedTerms, ctaType, slug, faqQuestion, faqAnswer)
- Populate 35+ entries across all categories: code_violation, inspection_issue, documentation_issue, permit_issue, hvhz_issue, electrical_issue, drainage_issue
- Cover all items listed in the spec (structural/framing, guards/stairs/safety, permits/documentation, HVHZ/coastal, site/water, electrical/accessory)
- Export CTA label mapping function based on ctaType
- Export category labels and quick-filter chip definitions

#### 2. `src/utils/violationSearch.ts` (NEW)
- Normalize search queries (lowercase, strip punctuation, handle "r507.2" -> "R507.2")
- Search ranking: exact code match first, keyword match second, partial text match third
- Support alias matching ("guard rail" -> railing, "no permit" -> permit, "noa" -> hvhz)
- Return scored/ranked results array
- Clean, maintainable helper — no spaghetti

#### 3. `src/components/tools/ViolationDecoder.tsx` (REWRITE)
Complete rewrite with new UX:
- **Header**: "Florida Deck & Patio Inspection Failure Explainer" title, homeowner-friendly subtitle, visible educational disclaimer
- **Search input**: accepts codes, keywords, plain English phrases
- **Quick-filter chips**: Ledger, Flashing, Footings, Railing, Stairs, Permit Issues, NOA/HVHZ, Electrical, Drainage
- **Result cards** showing: title, code (if available), type badge, severity badge, plain-English summary, "why it matters", common inspector wording, how-to-fix steps, cost range, reinspection status, permit review note, contextual CTA button
- **Empty state**: "No exact match" with popular suggestions and contact CTA
- **Post-results conversion block**: trust copy, CTA, link to blog post
- **Contextual CTA text** per ctaType (structural -> "Book a Structural Deck Review", permit -> "Get Permit & Reinspection Help", etc.)
- All CTAs link to /contact
- Mobile-responsive, matches existing site design

#### 4. `src/pages/Tools.tsx` (MODIFY)
- Update the ViolationDecoder section with new heading: "Florida Deck & Patio Inspection Failure Explainer"
- Add intro copy and disclaimer as specified
- Add internal link to the blog post
- Update FAQSchema with expanded FAQ items (8+ questions covering failed inspections, permits, reinspection, ledger failures, NOA issues, engineer requirements)

#### 5. `src/data/siteData.ts` (MODIFY)
- Add comprehensive blog post to `blogPosts` array:
  - Title: "Florida Deck Inspection Failures: Top Code Violations, Permit Issues, and How to Fix Them"
  - Slug: "florida-deck-inspection-failures"
  - Category: "Hurricane & Code"
  - BLUF format, 2000+ word content covering all major categories
  - Structured with tables, sections for structural/railing/stair/permit/HVHZ/electrical failures
  - Common inspector note examples, "when you need an engineer", Florida vs HVHZ differences
  - Internal link to /tools decoder
  - FAQ section at bottom
  - Final CTA
- Add 5 commented placeholder entries for future related articles (ledger board failures, railing heights, no-permit guide, NOA problems, etc.)

#### 6. Knowledge Base Insert (Database)
- Insert 12-15 violation-specific KB entries with metadata tags for chatbot use
- Tagged with `{"type":"code_violation","code":"...","severity":"...","category":"..."}`

---

### Design Approach
- Reuses existing UI components (Card, Badge, Button, Input, Alert)
- Severity badges: Critical (destructive), Moderate (accent/yellow), Minor (muted)
- Matches current site typography, spacing, and color scheme
- Cards are scan-friendly with clear hierarchy
- Educational disclaimer visible but not alarming

### No Route Changes Needed
Tool lives on existing `/tools` page. Blog uses existing `/blog/:slug` route.

