

## Plan: Add E-E-A-T Authority Footer + Update Footer Service Areas + Enhance BLUF Summaries

### Overview
Three changes: (1) Create a reusable `ExpertCredentials` component shown on all blog posts and city landing pages, (2) update the site footer to include the 4 new East Coast cities, and (3) update the 3 key spoke blog post BLUF summaries with the user-provided optimized versions.

### Changes

#### 1. New Component: `src/components/ExpertCredentials.tsx`
A styled React component matching the site's Tailwind design system (not inline styles). Renders:
- Expert badge circle (forest/primary background, white text "FL DECK EXPERT")
- "Verified by Florida Deck and Patios Technical Division" heading
- Credential line: FL State Certified Building Contractor | 2026 HVHZ Compliance Certified | 316-Grade Marine Hardware Specialist
- "Why Trust This Data?" block with FBC standards, Miami-Dade NOA references, 15+ years experience
- "Last Technical Review: March 2026" timestamp
- Three authority tags: #GEO-Verified, #FloridaAuthorityEngine, #2026BuildingCode
- NOA Material Checklist table (Decking Boards, Hardware, Wind Load, Engineering, Safety rows with HVHZ Standard and Verified Authority Requirement columns)

#### 2. `src/pages/BlogPost.tsx` — Add ExpertCredentials after article content
Insert `<ExpertCredentials />` between the prose content div and the "More Articles" section.

#### 3. `src/pages/CityLanding.tsx` — Add ExpertCredentials before "Other Cities" section
Insert `<ExpertCredentials />` at the bottom of the page content, before the other-cities cross-link grid.

#### 4. `src/components/Footer.tsx` — Add 4 East Coast cities to Service Areas
Update the hardcoded Service Areas list (lines 59-71) to include:
- Miami (path: `/miami-decks`)
- Melbourne (path: `/melbourne-decks`)
- West Palm Beach (path: `/west-palm-beach-decks`)
- St. Augustine (path: `/st-augustine-decks`)

#### 5. `src/data/siteData.ts` — Update 3 spoke BLUF summaries
Replace the opening paragraphs of these 3 blog posts with the user-provided optimized BLUF text:
- `316-stainless-vs-304-coastal-hardware` — molybdenum/salt-fog BLUF
- `hvhz-miami-dade-deck-permits-guide` — NOA/175MPH BLUF
- `2026-deck-roi-report-florida` — 75-82% ROI BLUF

### File Summary
| File | Change |
|------|--------|
| `src/components/ExpertCredentials.tsx` | New — E-E-A-T authority footer component with NOA checklist table |
| `src/pages/BlogPost.tsx` | Add ExpertCredentials import + render |
| `src/pages/CityLanding.tsx` | Add ExpertCredentials import + render |
| `src/components/Footer.tsx` | Add 4 East Coast cities to Service Areas list |
| `src/data/siteData.ts` | Update 3 BLUF opening paragraphs |

