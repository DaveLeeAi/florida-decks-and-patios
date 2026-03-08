

## Plan: Add SEO/GEO-Optimized Blog Articles

### Current State
8 blog posts exist in `src/data/siteData.ts` covering materials, maintenance, cost, permits, design, investment, and railings.

### New Articles (6 posts)
Each targets multiple optimization frameworks from the user's list while staying on-topic for a Florida deck/patio business.

---

**1. "Florida Building Codes for Decks: What Every Homeowner Must Know"**
- Category: "Permits & Codes"
- Slug: `florida-deck-building-codes-2026`
- **Targets**: YMYL (safety/financial), E-E-A-T (expertise), Topical Authority, Knowledge Graph/Entities, Information Gain
- Content: Florida-specific wind load requirements, hurricane strap codes, frost-free footing depths, IRC vs Florida Building Code differences, permit process by county (Hillsborough, Orange, Pinellas)

**2. "What Does a Deck Really Cost? A Data-Driven Breakdown for Florida"**
- Category: "Cost Guide"
- Slug: `florida-deck-cost-breakdown-data`
- **Targets**: AEO/BLUF (answer-first format), Schema/Structured Data (table-heavy), Zero-Click Search (direct answers), SGE (citeable facts), YMYL
- Content: Opens with BLUF summary, cost tables by Florida region, material price comparison with humidity factor, permit fee table by county, FAQ-style subheadings for AEO snippets

**3. "How to Choose a Deck Builder in Florida: A Homeowner's Checklist"**
- Category: "Hiring Guide"
- Slug: `how-to-choose-deck-builder-florida`
- **Targets**: E-E-A-T (trust signals), HCU (helpful, people-first), SXO (actionable checklist), GEO/RAG (unique Florida entities), Semantic Search
- Content: License verification (DBPR lookup), insurance requirements, questions to ask, red flags, Florida-specific considerations (hurricane experience, moisture expertise), checklist format

**4. "Best Decking Materials for Florida's Climate: A Complete Comparison"**
- Category: "Materials"
- Slug: `best-decking-materials-florida-climate`
- **Targets**: GEO/RAG (Florida-specific entities LLMs cite), AIO/LLMO (comparison format AI loves), Topical Authority, Semantic Search, Information Gain
- Content: Material performance in humidity/salt air/UV, heat retention data, mold resistance ratings, warranty behavior in coastal vs inland Florida, composite brand comparisons for tropical climates

**5. "Outdoor Kitchen Planning: Design, Permits, and Costs in Florida"**
- Category: "Design"
- Slug: `outdoor-kitchen-planning-florida`
- **Targets**: VSO (visual-friendly topic), SXO (planning journey), YMYL (gas/electrical safety), E-E-A-T, Topical Authority expansion
- Content: Layout options, appliance selection for Florida humidity, gas line permits, electrical requirements, countertop materials that resist Florida weather, cost ranges, ROI data

**6. "Deck vs. Patio: Which Is Better for Your Florida Backyard?"**
- Category: "Design"
- Slug: `deck-vs-patio-florida`
- **Targets**: AEO (direct comparison answers), Zero-Click Search, SGE (structured comparison), BLUF, Semantic Search, RAG
- Content: Opens with BLUF answer, side-by-side comparison table, Florida soil/drainage considerations, cost comparison, maintenance comparison, best use cases, FAQ subheadings

---

### Technical Changes
- **File**: `src/data/siteData.ts` — append 6 new objects to the `blogPosts` array
- Each post includes: slug, title, excerpt, date (staggered Feb-Mar 2026), category, and full markdown content
- Content uses the same markdown conventions (## headings, tables, bold, lists, italics) already parsed by `BlogPost.tsx`
- No component changes needed — existing blog list and detail pages handle everything

### Content Strategy Notes
- All articles use Florida-specific entities (counties, DBPR, FBC codes) for GEO/RAG discoverability
- FAQ-style subheadings ("How much does X cost?") target AEO featured snippets
- Tables and comparison formats are preferred by SGE and AI citation engines
- BLUF pattern used in cost/comparison articles for Zero-Click optimization
- Each article ends with a CTA italicized line (existing pattern)

