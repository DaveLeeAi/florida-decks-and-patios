

## Plan: SEO/GEO-Optimized Planning Tools Page

### What Changes

The `src/pages/Tools.tsx` file will be substantially expanded with five additions:

---

### 1. Methodology Note (E-E-A-T)
Add a small "Methodology" callout beneath each calculator's result area:
> "Our estimations are based on a 2026 analysis of average Florida material costs and labor rates from professional contractors in the Tampa and Orlando areas."

### 2. YMYL/Financial Disclaimer Banner
Add a prominent disclaimer card at the top of the page (below the heading, above the tools):
> "Florida Decks and Patios is a free consumer resource. Estimates are for planning purposes only and are not official quotes. We connect you with licensed local professionals who provide final pricing."

Styled as an `Alert` component with an info icon for visual prominence.

### 3. "How We Calculate These Numbers" Section (AEO/SGE)
Add a new section after the two calculators with an `h2` heading and bullet points covering:
- Local Florida building code requirements and permit fees
- Material cost volatility and regional supplier pricing
- Labor rate variations across Tampa, Orlando, and South Florida markets
- Project complexity factors (elevation, access, soil conditions)

### 4. "Florida Deck Planning Guide" Section (GEO/RAG)
Add 3-4 short paragraphs of unique Florida-specific content below the methodology section:
- **Humidity & moisture management** — pressure-treated vs. composite in Florida's climate
- **Salt air corrosion** — coastal considerations for hardware and fasteners
- **Hurricane straps & wind resistance** — Florida building code wind load requirements
- **UV exposure & sun damage** — material fade and heat retention in direct Florida sun

### 5. Post-Result CTA (SXO)
After both the Budget Estimator result and the Repair Checker result, add a prominent "Match with a Local Builder" CTA button that links to the contact/quote page (using `settings.ctaLink` from site data).

---

### Technical Approach
- All changes in `src/pages/Tools.tsx` only
- Import `Link` from react-router-dom, `Alert`/`AlertDescription` components, `useSiteData` context, and additional Lucide icons (`Info`, `Shield`, `BookOpen`, `ArrowRight`)
- New static content sections are plain JSX — no new state or logic needed
- CTA buttons reuse existing Button styling with the amber accent color matching the header CTA

