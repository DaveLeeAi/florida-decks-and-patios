

## Massive FAQ Database — 150+ Entries

### What we'll build

A dedicated **FAQ page** (`/faq`) with 150+ categorized FAQs organized into 8 sections, plus full structured data (FAQ schema) for SEO. Each answer includes contextual links to relevant tools and CTAs.

### Architecture

**New data file**: `src/data/faqData.ts`
- Export an array of FAQ objects: `{ category, question, answer, relatedTools?, cta? }`
- 8 categories: Permits, Inspections, Materials, Costs, Repairs, Hurricane Requirements, Railings, Stairs
- ~19 FAQs per category = 150+ total
- `relatedTools` maps to tool anchors (`/tools#budget`, `/tools#permits`, `/tools#repair`, `/tools#violations`, `/tools#design`, `/tools#roi`)
- `cta` optional string for contextual call-to-action

**New page**: `src/pages/FAQ.tsx`
- Category tabs using existing `Tabs` component for navigation
- Accordion-style Q&A within each category using existing `Accordion` component
- Each answer renders related tool links as small badges/buttons and a CTA link where applicable
- Search/filter input at top to find FAQs across all categories
- `FAQSchema` with all 150+ questions for structured data
- Disclaimer alert at bottom

**Route**: Add `/faq` to `App.tsx` with lazy loading

**Internal linking**: Add FAQ link to existing pages (Tools page, Materials Hub) and site navigation

### Files changed

1. **Create** `src/data/faqData.ts` — 150+ FAQ entries across 8 categories with tool links and CTAs
2. **Create** `src/pages/FAQ.tsx` — searchable, tabbed FAQ page with accordions, schema, and disclaimers
3. **Edit** `src/App.tsx` — add lazy-loaded `/faq` route
4. **Edit** `src/pages/Tools.tsx` — remove inline FAQ arrays (they move to `faqData.ts`), import from shared source
5. **Edit** `src/components/Header.tsx` — add FAQ to navigation

