

## Plan: Update Meta Descriptions with Authority Hub Copy

### Changes — `src/data/cityData.ts`

Replace the 5 `metaDescription` values with the user's CTR-optimized authority descriptions:

| City | Line | New Description |
|------|------|----------------|
| Tampa | 67 | "Build a custom Tampa deck designed for 2026 climate trends. Get real-time Hillsborough/Pasco permit links, current wood vs. composite cost-per-sq-ft ($45-$110), and expert tips for humidity-resistant outdoor living." |
| Orlando | 124 | "Explore Orlando's 2026 deck building guide. Navigate Orange County zoning laws easily with our local permit hub. See why capped composite is the 'Sustainable Growth' leader for Central Florida sun and UV protection." |
| Sarasota | 181 | "The Sarasota authority for salt-air durable decks. Get 2026 pricing on 316-grade stainless hardware and premium PVC. Access Sarasota County V-Zone permit requirements and high-ROI coastal material reports." |
| Jacksonville | 238 | "Maximize your St. Johns home value with a professional 2026 deck build. Compare local Jacksonville costs ($38-$95/sq-ft) and download our durability report on preventing wood warp in coastal Florida temperatures." |
| Ocala | 295 | "Affordable 2026 deck solutions for Ocala new builds. Access Marion County permit shortcuts and local cost data ($35-$85/sq-ft). Learn how to protect your investment from inland termite pressure with inorganic materials." |

Single file, 5 line replacements. No other changes needed — these descriptions are already consumed by the `useEffect` in `CityLanding.tsx` that sets the `<meta name="description">` tag.

