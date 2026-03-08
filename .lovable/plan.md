

## Plan: Add 4 East Coast City Landing Pages

### Overview
Add Miami-Dade, Space Coast (Melbourne), Palm Beach, and First Coast (St. Augustine) as new city data entries. Update the `LocalBusinessSchema` to include the new cities in `areaServed`. Update the Header dropdown to show all 9 cities.

### Changes

#### 1. `src/data/cityData.ts` — Add 4 new city objects

Append 4 new `CityData` entries to the `cityPages` array:

**Miami-Dade / Gold Coast** (`miami-decks`)
- County: Miami-Dade / Broward, Region: Southeast Florida
- Tagline: "HVHZ Compliance & Coastal Luxury"
- Cost: $50–$125+/sq ft, permit requires digitally signed/sealed engineered drawings for 30"+ or 200+ sq ft
- Climate: HVHZ Wind Zone 175+ mph, salt air true, 316-grade stainless mandatory
- City multiplier: 1.08 (+8% HVHZ Premium)
- Meta description from user data
- Unique content: HVHZ NOA requirements, luxury high-rise market

**Space Coast / Brevard** (`melbourne-decks`)
- County: Brevard County, Region: Central East Coast
- Cost: $40–$85/sq ft composite
- Permit: 30-day processing for residential under 7,500 sq ft
- Climate: Salt fog requiring weekly freshwater rinses
- City multiplier: 1.02 (+2% Coastal Durability Bonus)

**Palm Beach / Treasure Coast** (`west-palm-beach-decks`)
- County: Palm Beach / Martin County, Region: Southeast Florida
- Cost: $60–$90/sq ft (Ipe/Tigerwood popular)
- Permit: Martin County requires permit regardless of size for permanent structures
- Climate: Intense UV causing rapid wood silvering
- City multiplier: 1.05 (+5% Waterfront Premium)

**First Coast / St. Augustine** (`st-augustine-decks`)
- County: St. Johns County, Region: Northeast Florida
- Cost: $35–$75/sq ft
- Permit: Minor work exemptions for unattached decks under 200 sq ft
- Climate: Freeze-thaw cycles causing wood expansion
- City multiplier: 1.0 (Standard)
- Permit link: https://www.sjcfl.us

Each entry follows the exact `CityData` interface with full `climateProfile`, `costData`, `realEstate`, `faq`, `materialDurability`, and `uniqueContent` fields populated from the user's researched data.

#### 2. `src/components/seo/JsonLdSchema.tsx` — Expand `areaServed`

Add Miami, Fort Lauderdale, Melbourne, West Palm Beach, and St. Augustine to the `areaServed` array in `LocalBusinessSchema`. Add an `hasOfferCatalog` entry for "HVHZ-Compliant Deck Construction".

#### 3. `src/components/Header.tsx` — No structural change needed

The Header already dynamically renders from `cityPages`, so the 4 new cities will automatically appear in the Service Areas dropdown.

### No new routes needed
The existing `/:slug` catch-all route in `App.tsx` already handles dynamic city slugs via `CityLanding.tsx`.

### File Summary
| File | Change |
|------|--------|
| `src/data/cityData.ts` | Add 4 new city objects (~400 lines) |
| `src/components/seo/JsonLdSchema.tsx` | Add 5 new cities to `areaServed`, add HVHZ offer catalog |

