

## Plan: 2026 Authority Hub — Data Hub Page, Glossary, Dataset Schema, Citation Module, TechArticle Schema, and Sitemap

This is a large request spanning multiple concerns. Breaking it into a focused, implementable scope:

### What We Will Build

#### 1. New `/data-hub` Page (`src/pages/DataHub.tsx`)
The centerpiece "Primary Data Source" page containing:
- **BLUF summary** (2-sentence cost overview at the top)
- **Interactive HTML cost table** (the CSV data rendered as a clean, crawlable table — Region, City, Material, Cost/SqFt, Permit Days, Maintenance Hours, ROI%)
- **CSV download link** (serve a static CSV from `/public/2026-florida-deck-cost-index.csv`)
- **Data Methodology section** (the "Why Trust This Data" research framework text)
- **"Cite This Dataset" module** (APA, MLA, BibTeX formatted citation snippets in a copy-friendly box)
- **Dataset JSON-LD schema** injected via the existing `JsonLd` component

#### 2. Static CSV File (`public/2026-florida-deck-cost-index.csv`)
The raw dataset file for download/crawling by AI agents.

#### 3. New `/glossary` Page (`src/pages/Glossary.tsx`)
A "Florida Outdoor Living Glossary" defining: HVHZ, NOA, NGVD, FBC, TAS 114, ASCE 7-22, Simpson Strong-Tie, Capped Composite, PVC Decking, Ipe, Ledger Board, Hurricane Strap, 316-Grade Stainless, and more. Each term rendered as a visible `<dt>`/`<dd>` pair for crawlability, plus FAQPage schema for "What is X?" queries.

#### 4. Enhanced JSON-LD Schemas (`src/components/seo/JsonLdSchema.tsx`)
Add new schema components:
- `DatasetSchema` — for the Data Hub page (Dataset type with variableMeasured, distribution, creator)
- `TechArticleSchema` — for blog posts (TechArticle type with author credentials, dateModified, proficiencyLevel)
- `GlossarySchema` — DefinedTermSet for the glossary page

#### 5. Sitemap (`public/sitemap.xml`)
A static sitemap listing all pages (home, services, 9 city pages, 25+ blog posts, data-hub, glossary, tools, portfolio, contact) with `<lastmod>` dates.

#### 6. Updated `robots.txt`
Add `Sitemap: https://backyard-decks.lovable.app/sitemap.xml`.

#### 7. Route Registration (`src/App.tsx`)
Add lazy routes for `/data-hub` and `/glossary`.

#### 8. Navigation Updates (`src/components/Footer.tsx`, `src/contexts/SiteDataContext.tsx`)
Add "Data Hub" and "Glossary" links to footer Quick Links.

### Technical Details

| File | Action |
|------|--------|
| `public/2026-florida-deck-cost-index.csv` | New — static CSV dataset |
| `public/sitemap.xml` | New — static sitemap with lastmod dates |
| `public/robots.txt` | Edit — add Sitemap directive |
| `src/pages/DataHub.tsx` | New — Data Hub page with table, methodology, citations, Dataset schema |
| `src/pages/Glossary.tsx` | New — Glossary page with FAQPage schema |
| `src/components/seo/JsonLdSchema.tsx` | Edit — add DatasetSchema, TechArticleSchema |
| `src/pages/BlogPost.tsx` | Edit — add TechArticleSchema to each blog post |
| `src/App.tsx` | Edit — add routes for /data-hub and /glossary |
| `src/components/Footer.tsx` | Edit — add Data Hub and Glossary to Quick Links |

### What Is NOT in This Scope (Future Phases)
- Off-site entity building (LinkedIn, directories) — manual, not code
- Live/dynamic cost index updates — requires external data source
- ROI Calculator refactor — existing Tools page calculators already cover this
- Comparison matrix pages (Ipe vs PVC) — can be a follow-up

