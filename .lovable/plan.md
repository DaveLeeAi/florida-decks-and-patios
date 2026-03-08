

## Plan: Update 8 Old Blog Articles with SEO/GEO Optimization

### Problem
The original 8 blog posts are generic, nationally-focused content. They lack the Florida-specific entities, BLUF patterns, AEO-ready subheadings, comparison tables, YMYL disclaimers, and GEO/RAG-optimized content that the 6 newer articles have.

### Changes — `src/data/siteData.ts`

Each of the 8 old articles will be rewritten to match the new article standard:

---

**1. "Pressure-Treated vs. Composite" → Florida-focused comparison**
- Add BLUF opening with direct answer
- Add Florida humidity/UV/salt air performance data per material
- Add comparison table with Florida-specific lifespan and cost columns
- Reference Florida climate zones and coastal vs inland differences
- Add CTA line matching new article pattern

**2. "Seasonal Deck Maintenance Guide" → Florida seasonal maintenance**
- Reframe for Florida's climate (no snow/frost, focus on hurricane season prep, mold/mildew from humidity, UV damage)
- Add Florida-specific tasks: pre-hurricane inspections, post-storm checklists, rainy season drainage
- Add BLUF summary
- Reference Florida counties and climate conditions

**3. "How Much Does a New Deck Cost in 2026?" → Florida cost focus**
- Add BLUF opening with Florida-specific price range
- Update cost table with Florida pricing (10-15% above national)
- Add Florida permit fee table by county
- Add hurricane hardware cost factors
- Reference regional labor rate differences (Tampa vs Orlando vs Miami)
- Avoid duplicating the new cost article — focus this one on "quick overview" while the new one is "data-driven deep dive"

**4. "Do I Need a Permit for a Deck?" → Florida permit specifics**
- Rewrite entirely for Florida Building Code requirements
- Add county-specific permit thresholds
- Reference DBPR, FBC vs IRC differences
- Add hurricane strap and wind load mention
- Add HOA considerations for Florida communities
- Differentiate from the new codes article (this = "do I need one?", new = "what are the codes?")

**5. "Top Deck Design Trends for 2026" → Florida design trends**
- Add Florida-specific trend context (hurricane-resistant designs, heat-reflective materials, tropical landscaping integration)
- Reference Florida outdoor living culture
- Add BLUF summary
- Mention Florida Building Code implications for each trend

**6. "Pergola vs. Gazebo vs. Pavilion" → Florida shade structures**
- Add Florida wind load requirements for each structure type
- Add hurricane resistance ratings
- Reference Florida permit requirements by structure type
- Add Florida-specific material recommendations (corrosion-resistant, UV-stable)
- Add comparison table with Florida-specific columns

**7. "How Outdoor Spaces Increase Home Value" → Florida real estate focus**
- Reference Florida real estate market data
- Add Florida-specific ROI data
- Mention Florida's year-round outdoor living advantage
- Reference specific Florida metro markets (Tampa, Orlando, Miami)
- Add BLUF opening

**8. "Choosing the Right Deck Railing" → Florida railing guide**
- Add Florida code requirements (wind load on railings, coastal corrosion)
- Add salt air resistance ratings per material
- Add Florida-specific material recommendations
- Reference FBC railing requirements vs generic IRC
- Add comparison table with Florida performance columns

### Pattern Applied to All 8 Articles
- **BLUF opening** paragraph with direct answer (AEO/Zero-Click)
- **Florida-specific entities** throughout (counties, DBPR, FBC, hurricane straps, wind zones)
- **Comparison tables** where appropriate (SGE/AIO citation format)
- **FAQ-style subheadings** as questions ("How much does X cost in Florida?")
- **Methodology/trust line** in italic at the end referencing Florida contractor data
- **Updated dates** to Feb-Mar 2026 to reflect refreshed content
- **Updated excerpts** with Florida-specific keywords for blog listing page

### No Component Changes
All rendering logic in `BlogPost.tsx` and `Blog.tsx` already handles the markdown patterns used.

