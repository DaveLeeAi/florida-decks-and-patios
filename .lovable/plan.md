

## Plan: Update City Data with Hyper-Local 2026 Authority Data

### What Changes

Update `src/data/cityData.ts` to replace current cost estimates, FAQ answers, climate advice, and material durability data with the user's researched hyper-local data for all 5 cities.

---

### Specific Updates Per City

**1. Tampa Bay**
- Cost data: `$45–$85/sq ft` wood, `$60–$110+/sq ft` premium composite (currently much lower)
- FAQ permit answer: update to mention "attached or higher than 30 inches" threshold
- Climate advice: add algae growth warning, recommend composite for slip prevention
- Material durability: align with global report (PT: 30-40 hrs/yr maintenance, 10-15 yr lifespan; Composite: 2-4 hrs/yr, 25-50 yr)

**2. Orlando**
- Cost data: `$40–$80/sq ft` wood, `$55–$100/sq ft` composite
- FAQ permit answer: update to 120 sq ft zoning permit threshold with setback note
- Climate advice: add UV degradation and "silvering" warning, recommend capped composites
- Material durability: align with global report

**3. Sarasota / Venice**
- Cost data: Ipe/PVC exceeds `$120/sq ft`, add specialty hardware note
- FAQ permit answer: add V-Zone storm surge regulation and engineered plan requirement
- Climate advice: emphasize 316-grade stainless steel mandatory for structural integrity
- Material durability: align with global report

**4. Jacksonville**
- Cost data: `$38–$75/sq ft` wood, `$50–$95/sq ft` composite
- FAQ permit answer: update to "attached or exceeding 30 inches" mandatory permit
- Climate advice: add temperature fluctuation and wood expansion/contraction warning
- Permit link: update to JAXEPICS (`https://jaxepics.coj.net`)
- Material durability: align with global report

**5. Ocala**
- Cost data: `$35–$70/sq ft` wood, `$45–$85/sq ft` composite
- FAQ permit answer: update to 200 sq ft unattached exemption with zoning review note
- Climate advice: add Formosan termite warning, recommend pressure-treated or inorganic composite for ground-level
- Material durability: align with global report

### Global Material Durability Alignment
All cities will use the user's researched baseline:
- **Pressure-Treated**: 30–40 hrs/yr maintenance, 10–15 yr lifespan (adjusted down for coastal), 60–65% ROI
- **Capped Composite**: 2–4 hrs/yr maintenance, 25–50 yr lifespan, 75–82% ROI

### Technical Approach
- Single file edit: `src/data/cityData.ts`
- Update `costData`, `faq`, `climateProfile.climateAdvice`, and `materialDurability` fields for all 5 city objects
- Update Jacksonville's `permitLink` to the JAXEPICS URL
- No interface or component changes needed

