

## Plan: Complete the 24-Hour Authority Sprint

### Assessment: What's Done vs. What's Needed

**Already built**: 5 city routes, CityLanding template (H1, FAQ, Material Durability, Home Value Calculator), JSON-LD schemas, footer service area links, hyper-local data.

**Gaps to close**:

---

### 1. Header — Add "Service Areas" Dropdown
**File**: `src/components/Header.tsx`

Add a dropdown menu under a "Service Areas" nav item in both desktop and mobile nav. Desktop uses hover/click dropdown with the 5 city links. Mobile uses an expandable section.

### 2. Upgrade Home Value Calculator with City Multipliers & Material Toggle
**Files**: `src/data/cityData.ts`, `src/components/city/HomeValueCalculator.tsx`

Add to `CityData` interface:
- `cityMultiplier: number` — Sarasota: 1.05, Orlando: 1.03, Tampa/Jacksonville: 1.0, Ocala: 1.0
- `cityMultiplierLabel: string` — e.g. "+5% Coastal Premium", "+3% Outdoor Living Bonus"

Rewrite the calculator to match the user's spec:
- **Material selector**: Wood (50–95% ROI range, midpoint ~72.5%) vs. Composite (68–82% ROI range, midpoint ~75%)
- **Formula**: `Estimated Value Increase = (Project Cost × Base ROI%) × City Multiplier`
- **10-Year Savings**: `(Annual Wood Maintenance $500 − Annual Composite Maintenance $50) × 10 = $4,500` (shown for composite; $0 for wood)
- **Results display**: Home Value Increase, 10-Year Maintenance Savings, and the city multiplier badge
- **YMYL disclaimer** and methodology note at bottom

### 3. Add Topic Cluster Internal Links on City Pages
**File**: `src/pages/CityLanding.tsx`

Add a "Expert Guides for [City] Homeowners" section before the CTA that links to 3–4 relevant blog posts (e.g., cost article, materials comparison, permits article). This creates the "topic cluster" link structure for SEO.

### 4. Mobile Table Responsiveness
**File**: `src/pages/CityLanding.tsx`

The cost and durability tables already have `overflow-x-auto`. Add `min-w-[600px]` to inner tables so they scroll cleanly on mobile rather than squishing columns.

---

### Summary of File Changes
| File | Change |
|------|--------|
| `src/data/cityData.ts` | Add `cityMultiplier` and `cityMultiplierLabel` to interface and all 5 cities |
| `src/components/city/HomeValueCalculator.tsx` | Rewrite with material toggle, city multiplier, 10-year savings formula |
| `src/components/Header.tsx` | Add Service Areas dropdown (desktop + mobile) |
| `src/pages/CityLanding.tsx` | Add topic cluster blog links section, improve table mobile min-width |

