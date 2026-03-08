// ═══════════════════════════════════════════════════════════════
// Florida Deck & Patio FAQ Database — 150+ Entries
// Organized by category with tool links and CTAs
// ═══════════════════════════════════════════════════════════════

export type FAQCategory =
  | "permits"
  | "inspections"
  | "materials"
  | "costs"
  | "repairs"
  | "hurricanes"
  | "railings"
  | "stairs";

export interface FAQEntry {
  category: FAQCategory;
  question: string;
  answer: string;
  relatedTools?: { label: string; href: string }[];
  cta?: string;
}

export const FAQ_CATEGORIES: { id: FAQCategory; label: string; description: string }[] = [
  { id: "permits", label: "Permits", description: "Florida building permits, applications, and requirements" },
  { id: "inspections", label: "Inspections", description: "Deck inspections, failures, and reinspection processes" },
  { id: "materials", label: "Materials", description: "Decking materials, composites, wood, and hardware" },
  { id: "costs", label: "Costs", description: "Deck construction costs, budgeting, and financing" },
  { id: "repairs", label: "Repairs", description: "Deck repair, maintenance, and restoration" },
  { id: "hurricanes", label: "Hurricane Requirements", description: "Wind loads, hurricane straps, and HVHZ compliance" },
  { id: "railings", label: "Railings", description: "Railing codes, materials, and installation" },
  { id: "stairs", label: "Stairs", description: "Stair codes, design, and safety requirements" },
];

export const faqEntries: FAQEntry[] = [
  // ═══ PERMITS (19 entries) ═══
  {
    category: "permits",
    question: "Do I need a permit to build a deck in Florida?",
    answer: "Yes. Florida requires building permits for most attached decks and any deck over 30 inches above grade. Even ground-level decks may require permits in some municipalities. The permit process ensures your deck meets the Florida Building Code for structural safety, wind resistance, and proper construction.",
    relatedTools: [{ label: "Permit Checker", href: "/tools#permits" }],
    cta: "Use our Permit Checker to see exactly what your city requires.",
  },
  {
    category: "permits",
    question: "How much does a deck permit cost in Florida?",
    answer: "Deck permit fees in Florida typically range from $150 to $2,500 depending on your city and project complexity. Simple ground-level decks in smaller cities may cost $150–$400. Larger projects in Miami-Dade or Broward counties requiring HVHZ engineering can exceed $2,000. After-the-fact permits are usually double the standard fee.",
    relatedTools: [{ label: "Permit Checker", href: "/tools#permits" }, { label: "Cost Estimator", href: "/tools#budget" }],
  },
  {
    category: "permits",
    question: "How long does it take to get a deck permit in Florida?",
    answer: "Permit processing times vary significantly by city. Smaller municipalities like Ocala or Tallahassee may issue permits in 5–10 business days. Larger cities like Tampa or Orlando take 2–4 weeks. Miami-Dade HVHZ permits can take 4–8 weeks due to mandatory engineering review and NOA verification.",
    relatedTools: [{ label: "Permit Checker", href: "/tools#permits" }],
  },
  {
    category: "permits",
    question: "Can I build a deck without a permit in Florida?",
    answer: "Building without a permit is illegal in Florida and carries serious consequences: fines of $500–$5,000 per day, forced removal orders, insurance claim denials, and complications when selling your home. Unpermitted work also won't be covered by contractor warranties. Always pull a permit — it protects your investment.",
    relatedTools: [{ label: "Permit Checker", href: "/tools#permits" }],
    cta: "Check your city's permit requirements in seconds.",
  },
  {
    category: "permits",
    question: "What documents do I need for a Florida deck permit?",
    answer: "Most Florida jurisdictions require: a site plan showing deck location on the property, construction drawings with dimensions, a materials list, engineered plans (if required by size or height), proof of contractor licensing, and a completed permit application. Coastal and HVHZ zones require additional engineering documents and NOA certifications.",
    relatedTools: [{ label: "Permit Checker", href: "/tools#permits" }],
  },
  {
    category: "permits",
    question: "Do I need an engineer for my deck permit in Florida?",
    answer: "Engineering is required in several scenarios: decks exceeding prescriptive code limits (typically over 200 sq ft or 8 ft above grade), any deck in Miami-Dade or Broward HVHZ zones, decks supporting heavy loads like hot tubs or outdoor kitchens, and multi-level designs. Engineering typically costs $500–$2,500.",
    relatedTools: [{ label: "Permit Checker", href: "/tools#permits" }, { label: "Cost Estimator", href: "/tools#budget" }],
  },
  {
    category: "permits",
    question: "What is an after-the-fact permit in Florida?",
    answer: "An after-the-fact (ATF) permit allows you to legalize unpermitted construction. ATF permit fees are typically double the standard fee, and the structure must pass all required inspections in its current state. If it fails, you'll need to make corrections at your own expense before final approval.",
  },
  {
    category: "permits",
    question: "Do freestanding decks need permits in Florida?",
    answer: "In many Florida cities, freestanding decks under 30 inches above grade and under 200 square feet may be exempt from permits. However, this varies by municipality. Some cities require permits for all decks regardless of size. Always check with your local building department before starting construction.",
    relatedTools: [{ label: "Permit Checker", href: "/tools#permits" }],
  },
  {
    category: "permits",
    question: "Do I need a separate electrical permit for deck lighting?",
    answer: "Yes. Any electrical work on your deck — including hardwired lighting, outlets, ceiling fans, or hot tub connections — requires a separate electrical permit. Low-voltage landscape lighting (12V) and solar-powered lights typically don't require permits. GFCI protection is required for all outdoor outlets per Florida code.",
  },
  {
    category: "permits",
    question: "Can a homeowner pull their own deck permit in Florida?",
    answer: "Yes, Florida allows homeowners to pull their own permits for work on their primary residence (homeowner exemption). However, you must personally supervise the work, and you cannot use unlicensed labor for structural work. The exemption doesn't apply to investment properties or properties you plan to sell within one year.",
  },
  {
    category: "permits",
    question: "What is a Notice of Commencement in Florida?",
    answer: "A Notice of Commencement (NOC) is a legal document that must be recorded with the county clerk before construction begins on projects over $2,500. It establishes the project's start date, identifies the owner and contractor, and protects lien rights. Your contractor should handle this, but verify it's been filed.",
  },
  {
    category: "permits",
    question: "Do I need a permit for a pergola in Florida?",
    answer: "Most Florida cities require permits for pergolas, especially if they're attached to the house or exceed certain size limits. Open-air pergolas under 200 sq ft may be exempt in some jurisdictions. Any pergola with a solid roof, electrical, or plumbing always requires a permit.",
    relatedTools: [{ label: "Permit Checker", href: "/tools#permits" }],
  },
  {
    category: "permits",
    question: "What setback requirements apply to decks in Florida?",
    answer: "Setbacks vary by municipality but typically require 5–10 feet from rear property lines, 5–15 feet from side property lines, and compliance with any easements. Elevated decks may have stricter setbacks due to privacy and sight-line concerns. Your permit application's site plan must show compliance with all setbacks.",
  },
  {
    category: "permits",
    question: "Can I get a deck permit online in Florida?",
    answer: "Many Florida cities now offer online permitting, including Tampa, Orlando, Jacksonville, and Miami-Dade. The online process typically allows you to submit applications, upload plans, pay fees, and schedule inspections digitally. Processing times are generally the same as in-person applications.",
    relatedTools: [{ label: "Permit Checker", href: "/tools#permits" }],
  },
  {
    category: "permits",
    question: "What happens if I start building before my permit is approved?",
    answer: "Starting construction before permit approval is a code violation in Florida. You may face stop-work orders, fines, and could be required to remove completed work. The permit may also be delayed or denied. Wait for the approved permit and post it visibly at the job site before any work begins.",
  },
  {
    category: "permits",
    question: "Do I need a permit to replace my existing deck in Florida?",
    answer: "Yes. Replacing an existing deck — even on the same footprint — typically requires a new permit because construction methods and code requirements may have changed since the original was built. A replacement is treated as new construction and must meet current Florida Building Code standards.",
    relatedTools: [{ label: "Permit Checker", href: "/tools#permits" }],
  },
  {
    category: "permits",
    question: "What is a product approval number and do I need one?",
    answer: "Florida Product Approval numbers confirm that building products meet Florida Building Code requirements. In HVHZ zones (Miami-Dade, Broward), products must also have a Notice of Acceptance (NOA). Your contractor should provide product approval documentation for all structural materials used in your deck.",
  },
  {
    category: "permits",
    question: "Do I need HOA approval in addition to a permit?",
    answer: "Yes. HOA approval and building permits are separate requirements. Your HOA may have restrictions on deck size, materials, colors, and placement that go beyond code requirements. Always get HOA approval before applying for a permit to avoid costly redesigns. Some HOAs require architectural review committee approval.",
  },
  {
    category: "permits",
    question: "What is a survey and do I need one for my deck permit?",
    answer: "A boundary survey shows your exact property lines and is often required for deck permits, especially when building near property lines or easements. Surveys cost $300–$800 in Florida. Some cities accept a spot survey (less detailed) for simpler projects. Check with your building department for specific requirements.",
  },

  // ═══ INSPECTIONS (19 entries) ═══
  {
    category: "inspections",
    question: "What inspections are required for a deck in Florida?",
    answer: "Florida typically requires 3–5 inspections: footing/foundation inspection (before pouring concrete), framing inspection (after structural framing), electrical inspection (if applicable), final inspection (completed deck), and in some areas, a separate railing inspection. HVHZ zones may require additional engineering inspections.",
    relatedTools: [{ label: "Inspection Failure Explainer", href: "/tools#violations" }],
  },
  {
    category: "inspections",
    question: "What does a failed deck inspection mean in Florida?",
    answer: "A failed inspection means the inspector found one or more issues that don't meet Florida Building Code requirements. Common reasons include improper ledger connections, missing hurricane straps, railing height violations, or permit documentation issues. Most failures can be corrected and reinspected.",
    relatedTools: [{ label: "Inspection Failure Explainer", href: "/tools#violations" }],
    cta: "Use our Violation Decoder to understand your inspection results.",
  },
  {
    category: "inspections",
    question: "Can I use my deck after it fails inspection?",
    answer: "Generally, you should not use a deck that has failed inspection, especially for critical structural issues. A failed inspection means the structure hasn't been verified as safe. Consult your inspector's notes and a licensed contractor to understand the severity before using the deck.",
    relatedTools: [{ label: "Inspection Failure Explainer", href: "/tools#violations" }],
  },
  {
    category: "inspections",
    question: "How do I schedule a deck inspection in Florida?",
    answer: "Contact your local building department to schedule inspections. Most cities allow scheduling online or by phone. You'll need your permit number. Inspections are typically scheduled 24–48 hours in advance. The work being inspected must be visible and accessible — don't cover framing before the framing inspection.",
  },
  {
    category: "inspections",
    question: "What do inspectors look for during a deck framing inspection?",
    answer: "Inspectors verify: joist size, spacing, and span compliance; beam connections and post-to-beam hardware; ledger board attachment method and fastener spacing; hurricane strap and uplift connector installation; proper blocking and bridging; and compliance with approved plans. All hardware must match the approved engineering documents.",
    relatedTools: [{ label: "Inspection Failure Explainer", href: "/tools#violations" }],
  },
  {
    category: "inspections",
    question: "What is the most common reason decks fail inspection in Florida?",
    answer: "Improper ledger board attachment is the #1 cause of failed deck inspections in Florida. Code requires specific lag screws or through-bolts at 16 inches on center with proper flashing. Missing or improperly installed hurricane straps is the second most common failure, followed by railing height violations.",
    relatedTools: [{ label: "Inspection Failure Explainer", href: "/tools#violations" }, { label: "Repair Checker", href: "/tools#repair" }],
  },
  {
    category: "inspections",
    question: "Do I need a reinspection after fixing a deck code issue?",
    answer: "In most cases, yes. Critical and moderate violations typically require a reinspection after repairs to verify the work was done correctly. Minor issues like drainage may not always require reinspection, but check with your local building department. Reinspection fees are typically $50–$150.",
    relatedTools: [{ label: "Inspection Failure Explainer", href: "/tools#violations" }],
  },
  {
    category: "inspections",
    question: "What is a ledger board failure on a deck?",
    answer: "A ledger board failure means the board that attaches your deck to your house is not properly secured. Florida code (FBC R507.2) requires specific lag screws or through-bolts at 16 inches on center spacing. Improper ledger connections are the #1 cause of deck collapses nationwide.",
    relatedTools: [{ label: "Inspection Failure Explainer", href: "/tools#violations" }, { label: "Repair Checker", href: "/tools#repair" }],
  },
  {
    category: "inspections",
    question: "What happens if my deck was built without inspections?",
    answer: "A deck built without required inspections is considered unpermitted work in Florida. You may need to apply for an after-the-fact permit, which costs double. The inspector may require you to expose framing by removing deck boards to verify structural connections. In worst cases, demolition and rebuild may be required.",
  },
  {
    category: "inspections",
    question: "How long do I have to get my deck inspected after construction?",
    answer: "Most Florida jurisdictions require inspections at specific construction milestones — you can't proceed to the next phase without passing the current inspection. Permits typically expire if no inspection occurs within 180 days of issuance or the last inspection. Expired permits require renewal fees.",
  },
  {
    category: "inspections",
    question: "Can I be present during a deck inspection?",
    answer: "Yes, homeowners are welcome and encouraged to be present during inspections. Being there allows you to ask questions, understand any issues found, and get immediate clarification on corrections needed. Your contractor should also be present or available by phone.",
  },
  {
    category: "inspections",
    question: "What is a footing inspection for a deck?",
    answer: "A footing inspection verifies that your deck's concrete footings are the correct size, depth, and placement before concrete is poured. In Florida, footings must extend below the frost line (minimal in FL) but must meet minimum depth requirements for wind uplift resistance. Inspectors check hole dimensions, rebar placement, and soil conditions.",
  },
  {
    category: "inspections",
    question: "What is the difference between a code violation and a permit issue?",
    answer: "A code violation means the physical construction doesn't meet building code requirements — wrong materials, improper spacing, missing hardware. A permit issue relates to paperwork — missing permits, skipped inspections, or plans that don't match actual construction. Both can cause a failed inspection but require different remedies.",
    relatedTools: [{ label: "Inspection Failure Explainer", href: "/tools#violations" }],
  },
  {
    category: "inspections",
    question: "What is an NOA issue in Miami-Dade?",
    answer: "A Notice of Acceptance (NOA) is a Miami-Dade County approval confirming that a building product meets High-Velocity Hurricane Zone (HVHZ) requirements. If your deck materials don't have valid NOAs, the inspection will automatically fail and materials must be replaced with approved alternatives.",
    relatedTools: [{ label: "Inspection Failure Explainer", href: "/tools#violations" }],
  },
  {
    category: "inspections",
    question: "When do I need an engineer for a failed deck inspection?",
    answer: "An engineer is typically required when the deck exceeds prescriptive code limits — unusual heights, heavy loads (hot tubs, outdoor kitchens), structural damage repairs, or when field work doesn't match the original plans. The building department will tell you if engineering is needed.",
  },
  {
    category: "inspections",
    question: "What is a final inspection for a deck?",
    answer: "The final inspection is the last step before your deck is officially approved for use. The inspector verifies: all previous inspection corrections were made, railing height and spacing compliance, stair dimensions, proper guardrails at required locations, and overall code compliance. Once passed, you'll receive a Certificate of Completion.",
  },
  {
    category: "inspections",
    question: "Can my deck permit be revoked after approval?",
    answer: "While rare, permits can be revoked if fraud is discovered, if the work deviates significantly from approved plans, or if safety hazards are identified after the fact. Code enforcement can also issue violations if the deck deteriorates to an unsafe condition over time.",
  },
  {
    category: "inspections",
    question: "Do I need an inspection for deck repairs in Florida?",
    answer: "Minor cosmetic repairs (replacing individual boards, refinishing) typically don't require inspections. Structural repairs — replacing posts, beams, joists, or ledger boards — require permits and inspections. When in doubt, call your building department to ask. Unpermitted structural repairs can create liability issues.",
    relatedTools: [{ label: "Repair Checker", href: "/tools#repair" }],
  },
  {
    category: "inspections",
    question: "What is a spot inspection vs. a scheduled inspection?",
    answer: "A scheduled inspection is requested by the permit holder at specific construction milestones. A spot inspection (or complaint inspection) is initiated by the building department, often due to neighbor complaints or code enforcement observations. Spot inspections can result in stop-work orders if permits are missing.",
  },

  // ═══ MATERIALS (19 entries) ═══
  {
    category: "materials",
    question: "What is the best deck material for Florida's climate?",
    answer: "Composite decking (like Trex or TimberTech) is the top choice for Florida because it resists moisture, mold, UV fading, and termites without annual maintenance. Pressure-treated Southern Yellow Pine is the budget option but requires yearly sealing. For coastal areas, aluminum or PVC decking offers the best corrosion resistance.",
    relatedTools: [{ label: "Materials Hub", href: "/materials" }, { label: "Cost Estimator", href: "/tools#budget" }],
    cta: "Compare materials in our Materials Knowledge Hub.",
  },
  {
    category: "materials",
    question: "How long does pressure-treated wood last in Florida?",
    answer: "Pressure-treated Southern Yellow Pine lasts 10–15 years in Florida with proper maintenance (annual sealing, mold treatment). In coastal areas with salt air exposure, lifespan drops to 8–12 years. Ground-contact rated lumber lasts longer for posts and beams. Without maintenance, expect significant deterioration within 5–7 years.",
    relatedTools: [{ label: "Materials Hub", href: "/materials" }],
  },
  {
    category: "materials",
    question: "Is Trex or TimberTech better for Florida?",
    answer: "Both are excellent for Florida. Trex Transcend offers superior UV resistance and a wider color selection. TimberTech AZEK (PVC) is fully waterproof and ideal for docks or ground-level applications. TimberTech Composite offers the best wood-grain aesthetics. For most Florida decks, either brand performs equally well — choose based on color preference and budget.",
    relatedTools: [{ label: "Materials Hub", href: "/materials" }, { label: "Design Generator", href: "/tools#design" }],
  },
  {
    category: "materials",
    question: "What fasteners should I use for a deck in Florida?",
    answer: "Use stainless steel (316 marine grade) fasteners within 3 miles of the coast. Hot-dipped galvanized (HDG) fasteners work for inland areas. Never use standard zinc-plated screws — they corrode within 2–5 years in Florida's humidity. For composite decking, use manufacturer-recommended hidden fastener systems for a clean look.",
    relatedTools: [{ label: "Materials Hub", href: "/materials" }],
  },
  {
    category: "materials",
    question: "What is the difference between composite and PVC decking?",
    answer: "Composite decking is made from wood fibers and plastic — it's heavier, slightly more affordable, and has a more natural feel. PVC decking (like TimberTech AZEK) contains no wood fibers — it's lighter, fully waterproof, won't absorb moisture, and resists mold better. PVC costs 15–25% more but is ideal for Florida's moisture-heavy environment.",
    relatedTools: [{ label: "Materials Hub", href: "/materials" }],
  },
  {
    category: "materials",
    question: "Do composite decks get hot in Florida sun?",
    answer: "Yes, darker composite boards can reach 150°F+ in direct Florida sun. Choose lighter colors (Foggy Wharf, Rope Swing, Pebble Grey) for barefoot comfort. Some brands offer CoolDeck technology that reflects heat. Adding shade structures like pergolas also significantly reduces surface temperature.",
    relatedTools: [{ label: "Design Generator", href: "/tools#design" }],
  },
  {
    category: "materials",
    question: "What type of wood is best for deck posts in Florida?",
    answer: "Ground-contact rated pressure-treated Southern Yellow Pine (UC4A or UC4B) is standard for posts in Florida. For coastal areas or docks, fiberglass-reinforced polymer posts or steel posts with marine-grade coating offer superior longevity. Posts should be set on concrete footings — never buried directly in Florida's soil.",
  },
  {
    category: "materials",
    question: "What joist hangers do I need for a Florida deck?",
    answer: "Use Simpson Strong-Tie or USP galvanized joist hangers rated for the wind zone in your area. In coastal areas (within 3 miles), use stainless steel or G185 galvanized hangers. Standard zinc-plated hangers will corrode. Hurricane/seismic joist hangers (like Simpson?"H" series) are required in high-wind zones.",
    relatedTools: [{ label: "Materials Hub", href: "/materials" }],
  },
  {
    category: "materials",
    question: "Can I use cedar for a deck in Florida?",
    answer: "Cedar is not recommended for Florida decks. While naturally rot-resistant in dry climates, cedar performs poorly in Florida's humidity — it's softer than pine, warps more easily, and doesn't hold up to constant moisture exposure. Pressure-treated pine or composite are far better choices for Florida's climate.",
    relatedTools: [{ label: "Materials Hub", href: "/materials" }],
  },
  {
    category: "materials",
    question: "What is the best deck board spacing for Florida humidity?",
    answer: "Leave 1/8 to 3/16 inch gaps between deck boards for drainage and expansion in Florida's heat. Composite boards expand more than wood — follow manufacturer spacing guidelines exactly. For hidden fastener systems, the clips automatically set correct spacing. Proper spacing prevents water pooling and mold growth.",
    relatedTools: [{ label: "Materials Hub", href: "/materials" }],
  },
  {
    category: "materials",
    question: "What is capped composite decking?",
    answer: "Capped composite has a protective polymer shell wrapped around the core board. This cap blocks moisture, prevents staining, resists fading, and protects against mold and mildew. Uncapped composite (older products) can absorb moisture and stain. For Florida, always choose capped composite — the performance difference is significant.",
    relatedTools: [{ label: "Materials Hub", href: "/materials" }],
  },
  {
    category: "materials",
    question: "What is the best material for deck railings in Florida?",
    answer: "Aluminum railings are the top choice for Florida — they resist corrosion, require zero maintenance, and are available in many styles. Composite railings match your deck boards. Cable railings offer unobstructed views for waterfront properties. Wood railings require constant maintenance in Florida's climate and are not recommended for coastal areas.",
    relatedTools: [{ label: "Materials Hub", href: "/materials" }],
  },
  {
    category: "materials",
    question: "Do I need treated lumber for my deck frame in Florida?",
    answer: "Yes. Florida Building Code requires all structural deck lumber to be pressure-treated or naturally durable. Standard untreated lumber will rot rapidly in Florida's humidity — often within 1–3 years. Use ground-contact rated (UC4A minimum) lumber for any wood within 6 inches of the ground.",
  },
  {
    category: "materials",
    question: "What is the warranty on composite decking?",
    answer: "Most premium composite decking carries a 25–50 year limited warranty. Trex offers 25-year fade & stain and 25-year structural warranties. TimberTech AZEK offers 50-year structural and 30-year fade & stain warranties. These warranties require proper installation and maintenance per manufacturer guidelines.",
    relatedTools: [{ label: "Materials Hub", href: "/materials" }],
  },
  {
    category: "materials",
    question: "What is the best underlayment for a deck in Florida?",
    answer: "Self-adhering joist tape (like Trex Protect or G-Tape) is essential in Florida. It prevents moisture from penetrating the tops of joists where deck boards sit, dramatically extending the life of your substructure. This $100–$200 investment can add 10+ years to your deck's frame — it's the most cost-effective upgrade available.",
  },
  {
    category: "materials",
    question: "Can I use ipe wood for a deck in Florida?",
    answer: "Ipe (Brazilian hardwood) is extremely durable and naturally resistant to rot, insects, and UV — making it an excellent but expensive choice for Florida. Ipe decking costs $12–$20 per sq ft for materials alone. It's extremely hard (requires pre-drilling), heavy, and requires periodic oiling. Budget 2–3x the cost of composite.",
    relatedTools: [{ label: "Cost Estimator", href: "/tools#budget" }],
  },
  {
    category: "materials",
    question: "What is the difference between galvanized and stainless steel hardware?",
    answer: "Galvanized (zinc-coated) hardware is suitable for inland Florida decks at lower cost. Stainless steel (304 for moderate exposure, 316 marine grade for coastal) resists salt-air corrosion far better. Within 3 miles of the coast, stainless steel is essentially required — galvanized hardware can fail within 5–10 years in salt air.",
    relatedTools: [{ label: "Materials Hub", href: "/materials" }],
  },
  {
    category: "materials",
    question: "Should I use hidden fasteners for my deck?",
    answer: "Hidden fastener systems offer a cleaner look, reduce tripping hazards, and many automatically set correct board spacing. They cost $0.50–$1.50 more per sq ft than face screwing. Most composite manufacturers offer brand-specific hidden systems optimized for their boards. For Florida, hidden fasteners also reduce moisture entry points.",
  },
  {
    category: "materials",
    question: "What is ground-contact rated lumber?",
    answer: "Ground-contact rated lumber (UC4A or UC4B) has higher preservative retention than above-ground treated wood. It's required for any wood within 6 inches of the ground or in direct contact with concrete. In Florida, use UC4A for posts on footings and UC4B for wood embedded in the ground. Standard above-ground treated wood will rot quickly at ground level.",
  },

  // ═══ COSTS (19 entries) ═══
  {
    category: "costs",
    question: "How much does a deck cost in Florida in 2026?",
    answer: "Florida deck costs range from $35–$125+ per square foot installed depending on material, location, and complexity. A typical 300 sq ft composite deck costs $12,000–$27,000 in most markets. Miami-Dade HVHZ projects can exceed $50,000 due to mandatory engineering and NOA-approved materials.",
    relatedTools: [{ label: "Cost Estimator", href: "/tools#budget" }, { label: "ROI Calculator", href: "/tools#roi" }],
    cta: "Get a personalized estimate with our Cost Estimator.",
  },
  {
    category: "costs",
    question: "What is the cheapest deck material in Florida?",
    answer: "Pressure-treated Southern Yellow Pine is the most affordable at $8–$16 per square foot for materials only ($35–$85/sq ft installed). However, it requires 30–40 hours of annual maintenance and typically lasts only 10–15 years in Florida's climate. Composite decking costs more upfront but has lower total cost of ownership over 25+ years.",
    relatedTools: [{ label: "Cost Estimator", href: "/tools#budget" }, { label: "Materials Hub", href: "/materials" }],
  },
  {
    category: "costs",
    question: "How long does it take to build a deck in Florida?",
    answer: "Including permitting, a typical Florida deck project takes 3–10 weeks total. Permit processing takes 1–6 weeks depending on the city. Construction takes 1–4 weeks for a standard 200–400 sq ft deck. Complex multi-level decks or projects requiring engineering can take 6–8 weeks for construction alone.",
    relatedTools: [{ label: "Permit Checker", href: "/tools#permits" }],
  },
  {
    category: "costs",
    question: "Does a deck add value to my home in Florida?",
    answer: "Yes. A well-built deck typically recovers 65–85% of its cost at resale, and in desirable Florida markets like Naples, Sarasota, and coastal cities, ROI can exceed 90%. Composite decks in move-in-ready condition command the highest returns. A $25,000 composite deck can add $15,000–$22,000 to your home's resale value.",
    relatedTools: [{ label: "ROI Calculator", href: "/tools#roi" }],
    cta: "Calculate your deck's ROI with our free tool.",
  },
  {
    category: "costs",
    question: "How much does a composite deck cost vs. wood in Florida?",
    answer: "Composite decking costs $55–$125/sq ft installed vs. $35–$85/sq ft for pressure-treated wood. Over 25 years, composite is often cheaper due to zero staining/sealing costs ($500–$1,000/year for wood). A 300 sq ft composite deck costs $16,500–$37,500 vs. $10,500–$25,500 for wood — but wood requires $12,500–$25,000 in lifetime maintenance.",
    relatedTools: [{ label: "Cost Estimator", href: "/tools#budget" }, { label: "ROI Calculator", href: "/tools#roi" }],
  },
  {
    category: "costs",
    question: "What are the hidden costs of building a deck in Florida?",
    answer: "Common hidden costs include: permits ($150–$2,500), engineering ($500–$2,500), survey ($300–$800), tree removal ($200–$2,000), grading/drainage ($500–$3,000), electrical for lighting ($500–$2,000), and soil remediation if needed. Budget an additional 15–25% beyond the deck construction estimate for these items.",
    relatedTools: [{ label: "Cost Estimator", href: "/tools#budget" }],
  },
  {
    category: "costs",
    question: "How much does deck maintenance cost in Florida?",
    answer: "Wood deck maintenance costs $500–$1,500 annually for cleaning, sealing, and mold treatment — totaling $12,000–$37,000 over 25 years. Composite deck maintenance is minimal: occasional soap-and-water cleaning costs under $50/year. This maintenance cost difference is why composite often has lower total cost of ownership despite higher upfront pricing.",
    relatedTools: [{ label: "Materials Hub", href: "/materials" }],
  },
  {
    category: "costs",
    question: "How much does a second-story deck cost in Florida?",
    answer: "Second-story decks cost 50–100% more than ground-level decks due to taller posts, additional bracing, engineering requirements, and safety considerations. Expect $75–$175/sq ft installed. A 200 sq ft second-story deck typically costs $15,000–$35,000 in Florida, plus mandatory engineering ($1,000–$2,500).",
    relatedTools: [{ label: "Cost Estimator", href: "/tools#budget" }],
  },
  {
    category: "costs",
    question: "How much does it cost to add stairs to a deck in Florida?",
    answer: "Deck stairs cost $75–$250 per linear foot of rise, depending on material and width. A standard 4-foot rise with 36-inch-wide stairs costs $1,500–$4,000. Wider stairs, curved designs, or landing platforms increase costs. Florida code requires handrails on stairs with 4+ risers, adding $300–$1,200.",
    relatedTools: [{ label: "Cost Estimator", href: "/tools#budget" }],
  },
  {
    category: "costs",
    question: "Is it cheaper to build a deck in winter in Florida?",
    answer: "Slightly. Florida's 'off-season' for deck building (November–February) can offer 5–15% savings as contractor demand decreases. Material prices are generally stable year-round. The biggest advantage of winter building is faster permitting (less backlog) and more comfortable working conditions for crews.",
  },
  {
    category: "costs",
    question: "How much does a deck with a roof cost in Florida?",
    answer: "Adding a solid roof or covered structure to your deck significantly increases costs — expect $15,000–$50,000+ for the roof alone, depending on size and materials. Pergolas are more affordable at $3,000–$15,000. Covered decks require separate structural engineering and permits, adding $1,000–$3,000 in fees.",
    relatedTools: [{ label: "Cost Estimator", href: "/tools#budget" }],
  },
  {
    category: "costs",
    question: "How much do deck railings cost in Florida?",
    answer: "Railing costs per linear foot: wood ($20–$45), composite ($35–$70), aluminum ($40–$80), cable ($60–$120), glass ($75–$150). A typical 300 sq ft deck needs 50–70 linear feet of railing, costing $1,000–$10,500 total. Florida code requires 36-inch minimum railing height for residential decks over 30 inches above grade.",
    relatedTools: [{ label: "Cost Estimator", href: "/tools#budget" }],
  },
  {
    category: "costs",
    question: "Can I finance a deck project in Florida?",
    answer: "Yes. Common financing options include home equity loans (lowest rates, 5–8%), home equity lines of credit (HELOCs), personal loans (higher rates, 8–15%), contractor financing (varies widely), and some manufacturers offer promotional financing through dealers. A $25,000 deck financed over 10 years at 7% costs about $290/month.",
  },
  {
    category: "costs",
    question: "How much does it cost to demo an old deck in Florida?",
    answer: "Deck demolition and removal costs $5–$15 per sq ft in Florida, or $1,000–$4,500 for a typical 200–300 sq ft deck. Factors include deck height, material (concrete is more expensive to remove), accessibility, and disposal fees. Some contractors offer demo discounts when combined with new deck construction.",
    relatedTools: [{ label: "Cost Estimator", href: "/tools#budget" }],
  },
  {
    category: "costs",
    question: "Why do deck costs vary so much by Florida city?",
    answer: "Cost variations are driven by: local permit fees (Miami-Dade charges 3–5x more than smaller cities), labor market differences (South Florida labor rates are 20–40% higher), code requirements (HVHZ zones add engineering and material costs), and cost of living differences that affect overhead and material sourcing.",
    relatedTools: [{ label: "Cost Estimator", href: "/tools#budget" }],
  },
  {
    category: "costs",
    question: "How much does an outdoor kitchen on a deck cost?",
    answer: "Outdoor kitchens on decks range from $5,000 (basic grill island) to $50,000+ (full kitchen with appliances, counters, plumbing). The deck itself needs engineering for the added weight, costing $500–$2,000 extra. Gas and plumbing connections require separate permits. Budget $15,000–$30,000 for a mid-range outdoor kitchen setup.",
    relatedTools: [{ label: "Design Generator", href: "/tools#design" }],
  },
  {
    category: "costs",
    question: "What does a hot tub deck cost in Florida?",
    answer: "A hot-tub-ready deck section requires reinforced framing to support 3,000–6,000 lbs when filled. This adds $2,000–$5,000 to your deck cost for the reinforced section, plus engineering ($500–$1,500). The hot tub itself costs $3,000–$15,000. Electrical for a 220V hookup adds $500–$1,500.",
    relatedTools: [{ label: "Cost Estimator", href: "/tools#budget" }, { label: "Design Generator", href: "/tools#design" }],
  },
  {
    category: "costs",
    question: "How much does deck lighting cost in Florida?",
    answer: "Low-voltage LED deck lighting costs $500–$2,000 for a basic package (post caps, step lights). Hardwired systems with recessed lights, railing lighting, and landscape integration cost $2,000–$8,000. Solar options cost $200–$800 but provide less consistent illumination. An electrical permit is required for all hardwired installations.",
  },
  {
    category: "costs",
    question: "Should I get multiple quotes for my deck project?",
    answer: "Yes — get at least 3 quotes from licensed, insured Florida contractors. Compare apples-to-apples: same materials, same scope. The lowest bid isn't always best — verify licensing (DBPR), insurance, references, and warranty terms. A detailed written proposal protects both parties and prevents scope creep.",
    cta: "Contact us for a free estimate from verified professionals.",
  },

  // ═══ REPAIRS (19 entries) ═══
  {
    category: "repairs",
    question: "How do I know if my deck needs repair or replacement?",
    answer: "Signs of needed repair: soft or spongy boards, visible rot, loose railings, popped nails/screws, mold that doesn't clean off, and wobbling when walked on. If more than 25–30% of boards need replacement, or if structural members (joists, beams, posts) are compromised, full replacement is usually more cost-effective than piecemeal repairs.",
    relatedTools: [{ label: "Repair Checker", href: "/tools#repair" }],
    cta: "Use our Repair Checker to assess your deck's condition.",
  },
  {
    category: "repairs",
    question: "How much does it cost to repair a deck in Florida?",
    answer: "Minor repairs (replacing a few boards, tightening hardware) cost $200–$1,000. Moderate repairs (replacing railings, multiple boards, refinishing) cost $1,000–$5,000. Major structural repairs (posts, beams, ledger board) cost $3,000–$15,000+. If repairs exceed 50% of replacement cost, rebuilding is typically recommended.",
    relatedTools: [{ label: "Repair Checker", href: "/tools#repair" }, { label: "Cost Estimator", href: "/tools#budget" }],
  },
  {
    category: "repairs",
    question: "Can I repair my deck myself in Florida?",
    answer: "Cosmetic repairs (replacing surface boards, refinishing, cleaning) are suitable for DIY. Structural repairs — posts, beams, joists, ledger boards, and hurricane connections — should be done by a licensed contractor and require permits in most Florida jurisdictions. Improper structural repairs create safety and liability risks.",
    relatedTools: [{ label: "Repair Checker", href: "/tools#repair" }],
  },
  {
    category: "repairs",
    question: "How do I treat mold on my Florida deck?",
    answer: "Apply a deck-specific mold cleaner (containing sodium percarbonate or oxygen bleach). Let it sit 10–15 minutes, scrub with a stiff brush, then rinse with a garden hose or low-pressure washer (max 1500 PSI for wood). Avoid chlorine bleach — it damages wood fibers. Reapply mold treatment every 3–6 months in Florida's humidity.",
    relatedTools: [{ label: "Repair Checker", href: "/tools#repair" }],
  },
  {
    category: "repairs",
    question: "How often should I seal my wood deck in Florida?",
    answer: "Every 1–2 years in Florida, depending on sun exposure and proximity to water. South-facing decks with no shade may need annual sealing. Use a UV-resistant, mold-inhibiting penetrating sealer — not film-forming sealers which peel in Florida's humidity. Apply during the dry season (November–March) for best results.",
  },
  {
    category: "repairs",
    question: "Why is my deck wobbly?",
    answer: "Common causes: deteriorated post-to-footing connections, rotted posts at ground level, loose ledger board attachment, corroded hardware, or inadequate lateral bracing. A wobbly deck is a safety concern — have it assessed promptly. In Florida's climate, post bases and hardware deteriorate faster than in drier climates.",
    relatedTools: [{ label: "Repair Checker", href: "/tools#repair" }],
  },
  {
    category: "repairs",
    question: "How do I fix a rotted deck post in Florida?",
    answer: "Rotted posts must be replaced, not patched. Use a temporary jack to support the deck, remove the old post, install a new ground-contact rated post (UC4A minimum) on a proper concrete footing with a post base connector. Never bury the new post directly in soil. This is structural work that typically requires a permit.",
    relatedTools: [{ label: "Repair Checker", href: "/tools#repair" }],
  },
  {
    category: "repairs",
    question: "Can I replace wood deck boards with composite?",
    answer: "Yes, but check that your existing frame can support composite — it's heavier than wood and may require different joist spacing (typically 16 inches on center for composite vs. 24 inches for some wood). The frame must also be in good condition. Adding joist tape before installing composite boards extends frame life significantly.",
    relatedTools: [{ label: "Materials Hub", href: "/materials" }, { label: "Cost Estimator", href: "/tools#budget" }],
  },
  {
    category: "repairs",
    question: "How do I fix a sagging deck in Florida?",
    answer: "Sagging indicates structural failure — usually undersized beams, failed post connections, or deteriorated footings. Identify the cause before attempting repairs. Options include adding support posts and footings, sistering new joists alongside damaged ones, or replacing failed beams. This requires engineering assessment and permits.",
    relatedTools: [{ label: "Repair Checker", href: "/tools#repair" }],
  },
  {
    category: "repairs",
    question: "What causes deck board cupping in Florida?",
    answer: "Cupping (boards curling upward at edges) is caused by uneven moisture exposure — the top dries in sun while the bottom stays damp. Common in Florida due to high humidity. Prevention: proper board spacing for airflow, adequate ventilation underneath, and consistent sealing on all sides of wood boards. Severe cupping requires board replacement.",
  },
  {
    category: "repairs",
    question: "How do I repair deck ledger flashing?",
    answer: "Improper or deteriorated ledger flashing is a leading cause of water damage in Florida. Remove the old flashing, inspect the ledger board and house band board for rot, install new self-adhering membrane flashing that extends up behind the siding and over the top of the ledger, then install metal drip-edge flashing. This prevents water intrusion at the house connection.",
    relatedTools: [{ label: "Repair Checker", href: "/tools#repair" }],
  },
  {
    category: "repairs",
    question: "Should I pressure wash my deck in Florida?",
    answer: "Yes, but use caution. Keep pressure under 1500 PSI for wood decks — higher pressure damages wood fibers and creates a fuzzy surface. Use a fan tip, not a zero-degree nozzle. Composite decks can handle gentle pressure washing. In Florida, pressure wash 1–2 times per year to control mold and mildew buildup.",
  },
  {
    category: "repairs",
    question: "How do I fix popped deck screws?",
    answer: "Popped screws indicate wood shrinkage or joist movement. Remove the old screw, fill the hole with exterior wood filler, and drive a new, slightly longer screw 1–2 inches from the original hole. Use coated deck screws rated for treated lumber. If screws are popping across the entire deck, it may indicate a structural movement issue.",
  },
  {
    category: "repairs",
    question: "Can I patch a composite deck board?",
    answer: "Small scratches on composite can be buffed with fine-grit sandpaper (for uncapped boards) or a heat gun (for capped boards). Deep gouges or cracks require full board replacement — composite cannot be patched like wood. Keep spare boards from your original installation for color-matched replacements.",
  },
  {
    category: "repairs",
    question: "How do I fix water pooling on my deck?",
    answer: "Water pooling indicates inadequate slope or warped boards. Solutions: replace warped boards, add shimming to create proper drainage slope (1/8 inch per foot minimum), clear debris from board gaps, and ensure the substructure hasn't shifted. Persistent pooling accelerates rot and mold in Florida's climate.",
    relatedTools: [{ label: "Repair Checker", href: "/tools#repair" }],
  },
  {
    category: "repairs",
    question: "Do I need to repair termite damage on my deck?",
    answer: "Yes — termite damage compromises structural integrity. Have a pest control company treat the infestation first, then assess damage. Surface tunneling may be cosmetic, but internal hollowing of joists or posts requires replacement. Florida's subterranean termites can cause significant hidden damage. Annual termite inspections are recommended.",
    relatedTools: [{ label: "Repair Checker", href: "/tools#repair" }],
  },
  {
    category: "repairs",
    question: "How do I maintain my deck before hurricane season?",
    answer: "Before June 1: inspect and tighten all hurricane straps and connectors, check ledger board attachment, remove any loose items that could become projectiles, verify railing connections, inspect post bases for corrosion, and create a plan for securing or removing outdoor furniture. Post-storm, inspect for shifted boards, water damage, and loosened connections.",
  },
  {
    category: "repairs",
    question: "What is the best deck stain for Florida?",
    answer: "Use a penetrating semi-transparent or solid-color stain with UV inhibitors and mold resistance. Oil-based stains penetrate better but require more frequent reapplication (12–18 months). Water-based stains are easier to apply and last 2–3 years. Look for products specifically formulated for tropical/humid climates.",
  },
  {
    category: "repairs",
    question: "Can I repair a deck railing without replacing the whole thing?",
    answer: "Individual balusters and rail sections can be replaced independently. If the posts are solid, you can replace just the rail sections between them. Wobbly post connections should be repaired with new hardware — not just tightened. If more than 30% of railings need repair, full replacement is more cost-effective and ensures code compliance.",
    relatedTools: [{ label: "Repair Checker", href: "/tools#repair" }],
  },

  // ═══ HURRICANES (19 entries) ═══
  {
    category: "hurricanes",
    question: "What are hurricane straps and does my deck need them?",
    answer: "Hurricane straps (also called wind clips or tie-downs) are metal connectors that secure deck framing against wind uplift forces. Florida Building Code requires them on all attached decks in wind zones exceeding 110 mph — which includes most of the state. They connect joists to beams, beams to posts, and posts to footings.",
    relatedTools: [{ label: "Materials Hub", href: "/materials" }],
    cta: "Learn more about hurricane-resistant deck design.",
  },
  {
    category: "hurricanes",
    question: "What wind speed is my deck designed for in Florida?",
    answer: "Florida's design wind speeds range from 110 mph (interior North Florida) to 185 mph (Miami-Dade coast). Your deck must be engineered for your specific location's wind speed, which determines the size and type of connectors, fasteners, and structural members required. Your permit documents specify the design wind speed.",
    relatedTools: [{ label: "Permit Checker", href: "/tools#permits" }],
  },
  {
    category: "hurricanes",
    question: "What is a High-Velocity Hurricane Zone (HVHZ)?",
    answer: "HVHZ applies to Miami-Dade and Broward counties, requiring stricter building standards than the rest of Florida. HVHZ requirements include: products with Notice of Acceptance (NOA), specific connector types, mandatory engineering by a Florida-licensed PE, and additional inspections. HVHZ compliance adds 20–40% to project costs.",
    relatedTools: [{ label: "Permit Checker", href: "/tools#permits" }],
  },
  {
    category: "hurricanes",
    question: "What deck connectors are required in Florida hurricane zones?",
    answer: "Required connectors include: post-to-footing hold-downs (Simpson HD series or equivalent), beam-to-post connectors, joist-to-beam hurricane ties, and ledger-board-to-house connections. The specific model and size depends on your wind speed zone and structural loads. An engineer specifies exact connector requirements.",
    relatedTools: [{ label: "Materials Hub", href: "/materials" }],
  },
  {
    category: "hurricanes",
    question: "How do I prepare my deck for a hurricane?",
    answer: "Before a hurricane: secure or remove all furniture, umbrellas, planters, and decorative items. Retract or remove shade structures. Close any operable screens. Check that all hurricane straps are tight. After the storm: inspect for shifted boards, loose connections, water damage at ledger, and debris damage before using the deck.",
  },
  {
    category: "hurricanes",
    question: "Will my homeowner's insurance cover hurricane damage to my deck?",
    answer: "Most Florida homeowner's policies cover hurricane damage to attached structures like decks, subject to your hurricane deductible (typically 2–5% of dwelling coverage). However, unpermitted decks or decks that don't meet code may be denied coverage. Detached structures (freestanding decks) may fall under 'other structures' coverage with lower limits.",
  },
  {
    category: "hurricanes",
    question: "What is wind uplift and why does it matter for decks?",
    answer: "Wind uplift is the upward force created when wind passes over your deck — similar to how airplane wings generate lift. In a hurricane, uplift forces can literally rip a deck off its footings. Hurricane straps and hold-down connectors resist this uplift force, which is why Florida code mandates them in wind zones.",
  },
  {
    category: "hurricanes",
    question: "Do freestanding decks need hurricane straps in Florida?",
    answer: "Yes. While freestanding decks aren't attached to the house, they still need uplift resistance in Florida's wind zones. Post-to-footing connectors and beam-to-post ties are required. The specific requirements depend on your wind zone speed. Freestanding doesn't mean exempt from wind-resistance requirements.",
  },
  {
    category: "hurricanes",
    question: "What is the difference between HVHZ and non-HVHZ requirements?",
    answer: "HVHZ (Miami-Dade/Broward) requires: product NOAs, specific approved connector types, mandatory PE engineering, more inspection checkpoints, and approved testing lab certifications. Non-HVHZ areas follow the general Florida Building Code with prescriptive options available for simpler projects. HVHZ compliance typically adds 20–40% to costs.",
  },
  {
    category: "hurricanes",
    question: "Can I retrofit hurricane straps on my existing deck?",
    answer: "Yes, but it's complex. Retrofitting requires accessing joist-to-beam and beam-to-post connections, which may mean temporarily removing deck boards. A licensed contractor should assess whether retrofit is feasible or if structural modifications are needed. Retrofit typically costs $1,500–$5,000 depending on deck size and accessibility.",
    relatedTools: [{ label: "Repair Checker", href: "/tools#repair" }],
  },
  {
    category: "hurricanes",
    question: "What happens to my deck if it's not hurricane rated?",
    answer: "A non-hurricane-rated deck risks: structural failure during high winds, insurance claim denial, code violations if discovered during sale or inspection, and personal injury liability. In HVHZ zones, non-compliant construction can result in demolition orders. Upgrading to hurricane compliance is a safety and financial priority.",
  },
  {
    category: "hurricanes",
    question: "Do pergolas need hurricane straps in Florida?",
    answer: "Yes. Attached pergolas must meet the same wind-resistance requirements as decks. Freestanding pergolas also need uplift resistance. Open-air pergolas may have different wind load calculations than solid-roof structures, but connectors are still required. Your engineer will specify the appropriate hardware.",
  },
  {
    category: "hurricanes",
    question: "What is a continuous load path for a deck?",
    answer: "A continuous load path means forces (wind, gravity, uplift) transfer uninterrupted from the deck surface through the framing to the foundation. Every connection in the chain must be properly designed: deck board to joist, joist to beam, beam to post, post to footing. A break in this path is where failures occur during storms.",
  },
  {
    category: "hurricanes",
    question: "How does coastal construction affect deck design in Florida?",
    answer: "Coastal construction (CCCL — Coastal Construction Control Line) adds requirements: elevated foundations, corrosion-resistant materials (316 stainless steel), specific footing designs for storm surge, and V-zone or A-zone flood requirements. Coastal decks often cost 30–60% more than inland projects due to these enhanced requirements.",
    relatedTools: [{ label: "Cost Estimator", href: "/tools#budget" }],
  },
  {
    category: "hurricanes",
    question: "What is a deck wind load calculation?",
    answer: "A wind load calculation determines the forces your deck must resist based on: location's design wind speed, deck height above ground, exposure category (terrain), and surface area. These calculations are done by a licensed Professional Engineer (PE) and determine the size of structural members and connectors required.",
  },
  {
    category: "hurricanes",
    question: "Are screen enclosures on decks hurricane rated?",
    answer: "Standard screen enclosures are NOT hurricane rated — they're designed to be sacrificial in major storms. Impact-rated screen systems exist but cost 3–5x more. Many Florida homeowners choose standard screens with the understanding that panels may need replacement after severe storms. Remove screen panels before a hurricane if possible.",
  },
  {
    category: "hurricanes",
    question: "What is an exposure category for wind loads?",
    answer: "Exposure category describes the terrain around your property: Exposure B (suburban, trees/buildings nearby), Exposure C (open terrain, few obstructions — most of Florida), and Exposure D (waterfront/coastal with no obstructions). Higher exposure means greater wind forces and stronger connections required. Most Florida coastal properties are Exposure C or D.",
  },
  {
    category: "hurricanes",
    question: "Do I need impact-rated deck materials in HVHZ zones?",
    answer: "Deck surface materials (boards, railings) don't require impact ratings in HVHZ zones — impact ratings apply to windows, doors, and building envelope. However, all structural connectors and fasteners must have NOA approval. The deck must be designed to resist both positive (downward) and negative (uplift) wind pressures.",
  },
  {
    category: "hurricanes",
    question: "Can a deck be built to survive a Category 5 hurricane?",
    answer: "Decks in the highest Florida wind zones (185 mph — Miami-Dade coast) are engineered for Category 4+ wind speeds. No structure is guaranteed in a Cat 5 (157+ mph sustained). Proper engineering, connectors, and construction practices maximize survival chances. Flying debris and storm surge are additional risks beyond wind that can damage any outdoor structure.",
  },

  // ═══ RAILINGS (19 entries) ═══
  {
    category: "railings",
    question: "When does a deck require railings in Florida?",
    answer: "Florida Building Code requires guardrails on any deck surface more than 30 inches above the adjacent grade. Railings must be at least 36 inches high for residential decks (42 inches for commercial). Even decks under 30 inches may benefit from railings for safety, though they're not code-required.",
  },
  {
    category: "railings",
    question: "What is the required railing height for decks in Florida?",
    answer: "Residential decks require 36-inch minimum guardrail height measured from the deck surface. Commercial/multi-family properties require 42-inch minimum. These are measured from the finished deck surface to the top of the rail cap. Some HOAs require heights greater than the minimum — check your community's rules.",
  },
  {
    category: "railings",
    question: "What is the maximum baluster spacing for deck railings in Florida?",
    answer: "Balusters must be spaced so that a 4-inch sphere cannot pass through at any point. This means maximum baluster spacing is approximately 3.5 inches on center (accounting for baluster width). This applies to all portions of the railing system, including any decorative openings. The 4-inch rule prevents children from getting their heads stuck.",
  },
  {
    category: "railings",
    question: "What is the best railing material for Florida?",
    answer: "Aluminum railings are the top choice for Florida — zero maintenance, corrosion resistant, lightweight, and available in many styles. Composite railings match your deck boards but are bulkier. Cable railings offer open views for waterfront properties. Glass panels are premium but require frequent cleaning in Florida's dusty environment.",
    relatedTools: [{ label: "Materials Hub", href: "/materials" }],
  },
  {
    category: "railings",
    question: "Can I use cable railings on my Florida deck?",
    answer: "Yes. Cable railings are popular in Florida, especially for waterfront properties. They must meet the same 4-inch sphere test — cable spacing is typically 3 inches on center. Cables must be tensioned properly and use stainless steel (316 marine grade recommended in coastal areas). Check that your local code and HOA allow cable railings.",
    relatedTools: [{ label: "Materials Hub", href: "/materials" }],
  },
  {
    category: "railings",
    question: "How much do deck railings cost in Florida?",
    answer: "Railing costs per linear foot installed: wood ($20–$45), composite ($35–$70), aluminum ($40–$80), cable ($60–$120), glass ($75–$150). A standard 300 sq ft deck needs approximately 50–70 linear feet of railing. Material choice dramatically impacts total project cost — glass railings can cost 5x more than wood.",
    relatedTools: [{ label: "Cost Estimator", href: "/tools#budget" }],
  },
  {
    category: "railings",
    question: "Do I need a railing around my ground-level deck?",
    answer: "If your deck surface is less than 30 inches above grade at all points, railings are not required by Florida code. However, railings still provide safety benefits, especially for elderly homeowners or families with young children. Many homeowners add partial railings or planters for definition without full guardrails.",
  },
  {
    category: "railings",
    question: "What is a graspable handrail vs. a guardrail?",
    answer: "A guardrail prevents falls from the deck edge — required at 30+ inches above grade. A handrail is graspable for stair safety — required on stairs with 4+ risers. Handrails must be graspable (1.25–2 inch circular or specific non-circular profiles). A guardrail is not automatically a code-compliant handrail — stairs may need both.",
  },
  {
    category: "railings",
    question: "Can I have horizontal railings on my Florida deck?",
    answer: "Horizontal railing designs must still pass the 4-inch sphere test at every point. Some horizontal designs create a 'ladder effect' that children can climb, which some jurisdictions restrict. Check your local code — some Florida cities prohibit horizontal railings for this reason. Verify with your building department before selecting this style.",
  },
  {
    category: "railings",
    question: "How do I install deck railing posts in Florida?",
    answer: "Railing posts should be bolted through the rim joist with two 1/2-inch bolts minimum. Posts notched over the deck surface (versus mounted on top) provide the strongest connection. Post spacing should not exceed 6 feet on center. In high-wind zones, your engineer may specify closer spacing or additional blocking.",
  },
  {
    category: "railings",
    question: "What is the code for railing post spacing on a Florida deck?",
    answer: "Railing posts are typically spaced 6 feet on center maximum, though this depends on the railing system and post material. Posts must withstand a 200-pound load applied in any direction at the top. Manufacturers provide maximum spacing based on their system's engineering. Wider spacing may require larger posts.",
  },
  {
    category: "railings",
    question: "Do I need railings around my hot tub on the deck?",
    answer: "While not always code-required, barriers around hot tubs are recommended for safety and may be required by some Florida jurisdictions — especially if the tub is above 30 inches from grade. Many insurance policies require barriers. At minimum, a lockable cover is essential for child safety.",
  },
  {
    category: "railings",
    question: "Can I remove railings from my deck?",
    answer: "You cannot remove railings if your deck is 30+ inches above grade — they're code-required. Removing required railings makes your deck non-compliant and creates liability. If you're replacing railings, the new system must meet current code, which may differ from when the original was installed.",
  },
  {
    category: "railings",
    question: "What is an ADA-compliant deck railing?",
    answer: "ADA compliance requires: 42-inch railing height, graspable handrails (1.25–2 inch diameter), handrail extensions at top and bottom of ramps/stairs, and smooth surfaces without sharp edges. ADA applies to commercial and public-access decks. Residential decks don't require ADA compliance but aging-in-place designs often incorporate these features.",
  },
  {
    category: "railings",
    question: "How do I maintain wood deck railings in Florida?",
    answer: "Sand lightly, clean with a deck cleaner, and apply stain/sealer every 1–2 years. Inspect all connections annually — tighten loose bolts and replace corroded hardware. Check that posts haven't loosened at the deck connection. In Florida's climate, wood railings typically need replacement after 10–15 years even with good maintenance.",
  },
  {
    category: "railings",
    question: "Are glass railings code-compliant in Florida?",
    answer: "Yes. Tempered or laminated glass panels that meet ASTM standards are code-compliant. Glass must be minimum 3/8 inch tempered for residential use. Glass railings must still meet the 36-inch height requirement and withstand a 200-pound load test. They're popular for waterfront Florida properties to preserve views.",
  },
  {
    category: "railings",
    question: "Can I add lighting to my deck railings?",
    answer: "Yes — rail-mounted lights are popular and improve safety. Options include solar post caps ($15–$40 each), low-voltage LED rail lights ($5–$20 per fixture), and integrated lighting systems built into specific railing products. Hardwired options require an electrical permit. Solar options are easiest to install with no permit needed.",
  },
  {
    category: "railings",
    question: "What is the weight requirement for deck railings in Florida?",
    answer: "Florida code requires guardrails to resist a 200-pound concentrated load applied at the top in any direction, and a 20-pound-per-linear-foot uniform load along the top rail. Infill (balusters) must resist a 50-pound load on any 1-square-foot area. These loads ensure the railing can safely catch a person.",
  },
  {
    category: "railings",
    question: "Do I need railings on my deck stairs?",
    answer: "Handrails are required on at least one side of stairs with 4 or more risers in Florida. If the stair is wider than 44 inches, handrails are required on both sides. Handrails must be graspable (1.25–2 inch diameter) and continuous from top to bottom. Open sides of stairs 30+ inches above grade require guardrails as well.",
  },

  // ═══ STAIRS (19 entries) ═══
  {
    category: "stairs",
    question: "What is the maximum step height for deck stairs in Florida?",
    answer: "Florida Building Code limits stair riser height to 7.75 inches maximum, with a recommended range of 7–7.5 inches. All risers must be uniform — the tallest and shortest riser cannot differ by more than 3/8 inch. Inconsistent risers are a tripping hazard and will fail inspection.",
  },
  {
    category: "stairs",
    question: "What is the minimum tread depth for deck stairs in Florida?",
    answer: "Minimum tread depth is 10 inches in Florida. The tread depth plus twice the riser height should equal 24–25 inches for comfortable stairs (e.g., 7.5-inch rise + 10.5-inch tread = 25.5 inches). Deeper treads are allowed and generally more comfortable but reduce the stair's overall run.",
  },
  {
    category: "stairs",
    question: "How wide do deck stairs need to be in Florida?",
    answer: "Minimum stair width is 36 inches for residential decks in Florida. This is measured between the inside edges of the stair stringers (or handrails if they project into the stair width). Wider stairs (48–60 inches) are more comfortable and visually appealing, and may be required for higher-traffic applications.",
  },
  {
    category: "stairs",
    question: "Do I need a landing on my deck stairs in Florida?",
    answer: "A landing is required at the top and bottom of every stairway. The landing must be at least as wide as the stairs and at least 36 inches deep in the direction of travel. For long runs (typically 12+ feet of vertical rise), intermediate landings may be required. Landings must be level (maximum 1/4 inch per foot slope for drainage).",
  },
  {
    category: "stairs",
    question: "How many stringers do deck stairs need in Florida?",
    answer: "The number of stringers depends on stair width and tread material. For 36-inch-wide stairs with 2x lumber treads, a minimum of 3 stringers is standard. Wider stairs need additional stringers — typically one stringer per 16 inches of width for 5/4 decking or 24 inches for 2x treads. Composite treads follow manufacturer spacing requirements.",
  },
  {
    category: "stairs",
    question: "What is a stair stringer and how should it be built?",
    answer: "A stringer is the angled support board that the treads and risers attach to. In Florida, stringers must be cut from minimum 2x12 pressure-treated lumber. After cutting, the remaining wood at the narrowest point must be at least 3.5 inches. Pre-cut stringers from lumber yards are available for standard heights. Stringers must be attached to the deck frame with metal connectors.",
  },
  {
    category: "stairs",
    question: "Do deck stairs need risers (closed backs) in Florida?",
    answer: "Open-riser stairs are allowed in Florida if the opening between treads doesn't allow a 4-inch sphere to pass through. For open risers, this typically means the gap can be no more than 4 inches (when measured between the nosing of one tread and the riser face of the next). Many homeowners prefer open risers for drainage and a lighter look.",
  },
  {
    category: "stairs",
    question: "How do I attach deck stairs to the deck frame?",
    answer: "Use metal stair-stringer connectors (like Simpson LSC or LUS series) to attach stringers to the deck rim joist. Never rely on toenailing alone. The top connection must resist both vertical loads and lateral forces. At the bottom, stringers should rest on a concrete pad and be connected with a post base or angle bracket.",
  },
  {
    category: "stairs",
    question: "What is a nosing on deck stairs and is it required?",
    answer: "A nosing is the front edge of the tread that overhangs the riser below. Florida code requires a 0.75 to 1.25-inch nosing on stairs with solid risers. If using open risers, nosing is not required. Nosing provides a visual reference for each step edge and gives your foot more landing area.",
  },
  {
    category: "stairs",
    question: "How do I build deck stairs on a slope?",
    answer: "Stairs on sloped ground require careful planning: the bottom landing must be level (excavate or build up as needed), stringers may need to be different lengths for uneven terrain, and additional footings may be required. For significant slopes, a zigzag stair design with landings is more practical and code-compliant than a straight run.",
  },
  {
    category: "stairs",
    question: "Can I use composite treads on deck stairs in Florida?",
    answer: "Yes. Composite stair treads are available from most decking manufacturers and match your deck boards. Use manufacturer-specific stair nose pieces for a finished edge. Composite treads typically require tighter stringer spacing (12–16 inches on center vs. 16–24 for wood). Check that the composite product is rated for stair applications.",
    relatedTools: [{ label: "Materials Hub", href: "/materials" }],
  },
  {
    category: "stairs",
    question: "What is the code for deck stair lighting in Florida?",
    answer: "While stair lighting isn't explicitly required by Florida Building Code for residential decks, it's recommended for safety and may be required by some local amendments or HOA rules. If you install hardwired stair lighting, it requires an electrical permit. Low-voltage and solar options don't require permits and are easy to retrofit.",
  },
  {
    category: "stairs",
    question: "How much do deck stairs cost in Florida?",
    answer: "Deck stairs cost $75–$250 per linear foot of rise. A standard 4-foot rise with 36-inch-wide stairs costs $1,500–$4,000 depending on materials. Wider stairs, curved designs, composite materials, and landing platforms increase costs. Handrails add $300–$1,200 depending on material. Second-story stairs with tall posts cost significantly more.",
    relatedTools: [{ label: "Cost Estimator", href: "/tools#budget" }],
  },
  {
    category: "stairs",
    question: "Do I need a handrail on both sides of my deck stairs?",
    answer: "For stairs 44 inches wide or narrower, a handrail is required on at least one side if there are 4 or more risers. For stairs wider than 44 inches, handrails are required on both sides. If the stair's open side is more than 30 inches above grade, a guardrail (not just a handrail) is required on that side.",
  },
  {
    category: "stairs",
    question: "What is the difference between a handrail and a guardrail on stairs?",
    answer: "A handrail is a graspable rail you hold while ascending/descending — it must be 1.25–2 inches in diameter with specific profile requirements. A guardrail prevents falls from open sides — it must be 34–38 inches high (measured from the stair nosing line) with baluster infill meeting the 4-inch sphere test. Stairs may require both.",
  },
  {
    category: "stairs",
    question: "Can I build spiral stairs for my deck in Florida?",
    answer: "Spiral stairs are code-compliant if they meet specific requirements: minimum 26-inch clear width, minimum 7.5-inch tread depth at 12 inches from the narrow end, maximum 9.5-inch riser height, and headroom requirements. They save space but are harder to navigate and not suitable as primary egress. Engineering is typically required.",
  },
  {
    category: "stairs",
    question: "How do I prevent deck stairs from rotting in Florida?",
    answer: "Use ground-contact rated pressure-treated lumber for stringers. Ensure the bottom of stringers sits on concrete, not soil. Apply end-cut preservative to any cuts. Use joist tape on horizontal surfaces. Maintain drainage around the base to prevent standing water. Apply annual sealer to all exposed wood. Composite treads eliminate tread rot entirely.",
    relatedTools: [{ label: "Repair Checker", href: "/tools#repair" }],
  },
  {
    category: "stairs",
    question: "What is a winder stair and is it allowed in Florida?",
    answer: "Winder stairs turn without a landing, using pie-shaped treads at the turn. Florida code allows winders if the tread depth is at least 6 inches at the narrow end and 10 inches at the 12-inch walk line. Winders save space compared to landings but can be a tripping hazard. They're less common on outdoor decks than interior stairs.",
  },
  {
    category: "stairs",
    question: "How do I make deck stairs slip-resistant in Florida?",
    answer: "Add anti-slip tread strips or tape to each step, choose textured composite treads with built-in traction, or apply non-slip deck coating. In Florida, stairs get especially slippery from morning dew, rain, and mold growth. Some composite manufacturers offer boards with enhanced slip resistance ratings for stair applications. Keeping stairs clean of algae is essential.",
    relatedTools: [{ label: "Materials Hub", href: "/materials" }],
  },
];
