

## Plan: Add "Miami vs. Tampa" Authority Comparison Blog Post

### Overview
Add a new blog post entry to the `blogPosts` array in `src/data/siteData.ts`. The post will be a comprehensive "Florida Deck Wars: Miami vs. Tampa" comparison article optimized for all the search frameworks (AEO, GEO, SGE, E-E-A-T, YMYL, etc.) using the BLUF pattern, structured comparison tables, and unique Florida entities (HVHZ, NOA, wind codes).

### File Change: `src/data/siteData.ts`

Insert a new blog post object before the closing `];` of the `blogPosts` array (after line 270). The post will include:

- **Slug**: `miami-vs-tampa-deck-building`
- **Title**: "Miami vs. Tampa Deck Building in 2026: East Coast HVHZ vs. West Coast Humidity"
- **Category**: "Regional Guide"
- **Date**: `2026-03-08`
- **Excerpt**: Summarizing the coast-to-coast comparison with specific cost ranges and regulatory differences.

**Content structure** (markdown-formatted string matching existing blog post patterns):

1. **BLUF paragraph** — Bottom-line summary: Miami requires HVHZ-compliant NOA-approved materials and costs $50–$125/sq ft; Tampa focuses on humidity/mold resistance at $30–$60/sq ft.

2. **Section: The Regulatory Landscape** — H2 comparing Miami-Dade HVHZ 175mph+ wind load ratings and digitally signed engineering drawings vs. Tampa's elevation/setback requirements and Gulf-side flood zone codes.

3. **Section: Material Performance Rankings (2026)** — Markdown table:
   | Feature | East Coast (Miami/WPB) | West Coast (Tampa/Sarasota) |
   Top Material, Hardware standard, Cool-Tech necessity.

4. **Section: 2026 Cost Comparison** — Table with cost per sq ft ranges, permit costs, and typical 16x20 project totals for both regions.

5. **Section: 2026 Material ROI Snapshot** — Table from user data: Pressure-Treated Pine, Ipe, Composite, Aluminum with cost, maintenance level.

6. **Section: The ROI Verdict** — Miami/East Coast 78% (storm resilience + luxury) vs. Tampa/West Coast 82% (lifestyle + low maintenance).

7. **Section: Expert Checklist** — Bullet lists for East Coast (HVHZ certification, NOA verification), West Coast (termite treatment, mold prevention), and Both (2026 FBC permit on-site).

8. **YMYL disclaimer** — Italic closing note about regional cost analysis basis and consultation CTA.

### No other file changes needed
- Routes: Already handled by `/blog/:slug` route
- Blog listing: Automatically picks up new entries from the array
- City landing pages: The `blogPosts.slice(0, 3)` in topic cluster will naturally include this if it's among the first 3

