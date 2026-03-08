// ═══════════════════════════════════════════════════════════════
// Florida Deck & Patio FAQ — Homeowner-Focused SEO Edition
// 20 questions across 5 categories with internal portfolio links
// ═══════════════════════════════════════════════════════════════

export type FAQCategory =
  | "general"
  | "climate"
  | "permits"
  | "costs"
  | "design";

export interface FAQEntry {
  category: FAQCategory;
  question: string;
  answer: string;
  /** Optional inline HTML for internal links within the answer */
  answerHtml?: string;
  relatedTools?: { label: string; href: string }[];
  cta?: string;
}

export const FAQ_CATEGORIES: { id: FAQCategory; label: string; description: string }[] = [
  { id: "general", label: "General Questions", description: "Common questions about decks, patios, and outdoor living in Florida" },
  { id: "climate", label: "Florida Climate & Durability", description: "How Florida's weather affects deck and patio materials and construction" },
  { id: "permits", label: "Permits & Construction", description: "Building permits, inspections, and code requirements in Florida" },
  { id: "costs", label: "Cost & Planning", description: "Budgeting, pricing factors, and project planning for Florida deck and patio projects" },
  { id: "design", label: "Design & Ideas", description: "Design considerations for outdoor living spaces in Florida" },
];

export const faqEntries: FAQEntry[] = [
  // ═══ GENERAL (4 entries) ═══
  {
    category: "general",
    question: "What is the difference between a deck and a patio?",
    answer: "A deck is a raised platform typically built with wood or composite lumber and attached to or near a home. A patio is a ground-level surface made from pavers, concrete, or natural stone placed directly on a prepared base. Both create outdoor living space, but the best choice depends on your yard's terrain, budget, and how you plan to use the area.",
  },
  {
    category: "general",
    question: "How long does deck installation usually take in Florida?",
    answer: "Most residential deck installations in Florida take between 5 and 20 days depending on size, complexity, and materials. A simple ground-level deck may be completed in under a week, while larger multi-level designs or projects that include pergolas and outdoor kitchens can take three weeks or more. Permit processing time is separate and should be factored into your overall timeline.",
  },
  {
    category: "general",
    question: "What materials are commonly used for decks and patios in Florida?",
    answer: "The most popular deck materials in Florida are composite decking and pressure-treated Southern Yellow Pine. For patios, homeowners often choose travertine pavers, brick pavers, or stamped concrete. Material selection in Florida is heavily influenced by humidity, UV exposure, and proximity to salt air, which affect long-term durability.",
    answerHtml: 'The most popular deck materials in Florida are composite decking and pressure-treated Southern Yellow Pine. For patios, homeowners often choose travertine pavers, brick pavers, or stamped concrete. You can see examples of different material choices in our <a href="/portfolio/tampa-composite-deck-rebuild" class="text-primary hover:underline">Tampa composite deck project</a> and our <a href="/portfolio/sarasota-pool-deck" class="text-primary hover:underline">Sarasota travertine pool deck</a>.',
  },
  {
    category: "general",
    question: "Can a deck or patio increase my home's value?",
    answer: "Yes. Outdoor living spaces are highly valued in Florida's year-round warm climate. A well-built deck or patio typically returns 60–80% of its cost at resale and can make a home significantly more attractive to buyers. In Florida, where outdoor entertaining is a lifestyle rather than a seasonal activity, these improvements are especially impactful.",
    relatedTools: [{ label: "ROI Calculator", href: "/tools#roi" }],
  },

  // ═══ CLIMATE (4 entries) ═══
  {
    category: "climate",
    question: "What decking materials work best in Florida's humidity?",
    answer: "Composite decking and PVC decking perform best in Florida's high humidity because they resist mold, mildew, and moisture absorption. Pressure-treated wood is also suitable but requires regular maintenance including cleaning and re-staining every 2–3 years. Untreated wood species will deteriorate rapidly in Florida's humid subtropical climate.",
  },
  {
    category: "climate",
    question: "Are composite decks a good choice for Florida weather?",
    answer: "Composite decking is one of the best choices for Florida weather. Modern composites resist fading from UV exposure, won't rot or warp from humidity, and handle heavy rain without absorbing moisture. Many Florida homeowners choose composite specifically to avoid the frequent maintenance that wood decks require in this climate.",
    answerHtml: 'Composite decking is one of the best choices for Florida weather. Modern composites resist fading from UV exposure, won\'t rot or warp from humidity, and handle heavy rain without absorbing moisture. Our <a href="/portfolio/miami-pool-deck-renovation" class="text-primary hover:underline">Miami pool deck installation</a> is a good example of composite decking designed for coastal Florida conditions.',
  },
  {
    category: "climate",
    question: "How do decks handle heavy rain and storms in Florida?",
    answer: "Properly built decks in Florida are designed to handle heavy rain through correct drainage slopes, adequate spacing between boards, and proper flashing at the house connection. In hurricane-prone areas, additional structural requirements include hurricane straps, reinforced post connections, and wind-rated railings. Drainage design is one of the most important aspects of Florida deck construction.",
  },
  {
    category: "climate",
    question: "What materials resist corrosion near coastal areas in Florida?",
    answer: "For coastal Florida properties, marine-grade 316 stainless steel hardware is essential — standard galvanized fasteners can corrode within a few years in salt air. Composite decking, aluminum railings, and PVC trim all resist salt corrosion. Powder-coated aluminum is preferred over painted steel for any metal components within a few miles of the coast.",
    answerHtml: 'For coastal Florida properties, marine-grade 316 stainless steel hardware is essential — standard galvanized fasteners can corrode within a few years in salt air. Composite decking, aluminum railings, and PVC trim all resist salt corrosion. Our <a href="/portfolio/st-petersburg-waterfront-deck" class="text-primary hover:underline">St Petersburg waterfront deck</a> demonstrates material choices specifically for salt air environments.',
  },

  // ═══ PERMITS (4 entries) ═══
  {
    category: "permits",
    question: "Do decks require building permits in Florida?",
    answer: "Yes, most deck projects in Florida require building permits. This includes attached decks of any size and freestanding decks over 30 inches above grade. Permit requirements and fees vary by city and county — for example, Miami-Dade County has stricter requirements than smaller inland cities. Always check with your local building department before starting construction.",
    relatedTools: [{ label: "Permit Checker", href: "/tools#permits" }],
  },
  {
    category: "permits",
    question: "Do patio installations require permits in Florida?",
    answer: "Patio permit requirements vary by municipality. Simple paver or concrete patios at ground level are often exempt in many Florida cities. However, patios with roofed structures, gas lines for fire pits or outdoor kitchens, or electrical installations will require separate permits. Covered patios attached to the home almost always need permits and may require engineering.",
    relatedTools: [{ label: "Permit Checker", href: "/tools#permits" }],
  },
  {
    category: "permits",
    question: "Are there building code requirements for deck railings in Florida?",
    answer: "Yes. The Florida Building Code requires guard rails on any deck surface more than 30 inches above grade. Rails must be at least 36 inches high for residential decks, and balusters must be spaced to prevent a 4-inch sphere from passing through. In Miami-Dade and Broward counties, railings must also meet high-velocity hurricane zone wind load requirements.",
  },
  {
    category: "permits",
    question: "What inspections are required during deck construction in Florida?",
    answer: "Florida typically requires three to five inspections during deck construction: a footing inspection before pouring concrete, a framing inspection after structural work is complete, an electrical inspection if applicable, and a final inspection of the completed project. Some counties also require a separate railing inspection. Each phase must pass before work can continue.",
    relatedTools: [{ label: "Inspection Failure Decoder", href: "/tools#violations" }],
  },

  // ═══ COSTS (4 entries) ═══
  {
    category: "costs",
    question: "How much does a deck installation cost in Florida?",
    answer: "Deck installation costs in Florida vary widely based on size, materials, and site conditions. Pressure-treated wood decks generally start at lower price points, while composite and PVC decks cost more upfront but require less maintenance over time. Factors like elevation, railing style, and proximity to the coast all affect the final cost. We recommend getting estimates based on your specific project requirements.",
    relatedTools: [{ label: "Cost Estimator", href: "/tools#budget" }],
  },
  {
    category: "costs",
    question: "How much does a pool deck cost in Florida?",
    answer: "Pool deck costs depend on the material chosen and the area to be covered. Travertine pavers, concrete pavers, and stamped concrete are the most common pool deck surfaces in Florida. Each material has different cost ranges, and additional factors like drainage design, pool barrier requirements, and site preparation affect the overall budget.",
    answerHtml: 'Pool deck costs depend on the material chosen and the area to be covered. Travertine pavers, concrete pavers, and stamped concrete are the most common pool deck surfaces in Florida. You can see material and design options in our <a href="/portfolio/sarasota-pool-deck" class="text-primary hover:underline">Sarasota pool deck renovation</a>. Additional factors like drainage, pool barriers, and site prep affect the overall budget.',
    relatedTools: [{ label: "Cost Estimator", href: "/tools#budget" }],
  },
  {
    category: "costs",
    question: "What factors affect deck or patio project costs?",
    answer: "The main cost factors for Florida deck and patio projects are material type, project size, elevation and complexity, site conditions, and local permit requirements. Coastal locations may require marine-grade hardware that adds to the budget. Projects requiring engineering stamps, such as those in high-velocity hurricane zones, also have higher permit and design costs.",
    relatedTools: [{ label: "Budget Estimator", href: "/tools#budget" }],
  },
  {
    category: "costs",
    question: "Is composite decking more expensive than wood?",
    answer: "Composite decking has a higher upfront material cost than pressure-treated wood, but it eliminates the ongoing expenses of staining, sealing, and board replacement that wood decks require in Florida's demanding climate. Over a 15–20 year period, many homeowners find that composite's total cost of ownership is comparable to or lower than wood when maintenance is factored in.",
  },

  // ═══ DESIGN (4 entries) ═══
  {
    category: "design",
    question: "What size deck works best for a small backyard?",
    answer: "For small backyards, a deck in the 200–400 square foot range typically provides comfortable space for a dining set and a couple of lounge chairs. Ground-level decks work well in tight spaces because they don't require stairs or railings, maximizing usable area. Multi-level designs can also help small yards by creating distinct zones without taking up additional footprint.",
  },
  {
    category: "design",
    question: "Can a deck be built around an existing pool?",
    answer: "Yes, decks and patios are commonly built around existing pools in Florida. The design must maintain required pool barrier setbacks and provide proper drainage away from the pool equipment. Materials like travertine pavers and textured composite boards are popular choices because they provide slip-resistant surfaces and stay cooler in direct sunlight.",
    answerHtml: 'Yes, decks and patios are commonly built around existing pools in Florida. The design must maintain required pool barrier setbacks and provide proper drainage away from the pool equipment. Our <a href="/portfolio/miami-pool-deck-renovation" class="text-primary hover:underline">Miami pool deck project</a> shows how composite decking can wrap around an existing pool with safety features built in.',
  },
  {
    category: "design",
    question: "Are pergolas commonly added to patios in Florida?",
    answer: "Pergolas are one of the most popular additions to Florida patios because they provide adjustable shade in a climate where outdoor spaces are used year-round. Modern options include motorized louver systems that close during rain and open for sun, as well as traditional wood and aluminum designs with retractable fabric panels. Many Florida homeowners combine pergolas with outdoor kitchens for covered cooking and dining areas.",
    relatedTools: [{ label: "Design Ideas", href: "/tools#design" }],
  },
  {
    category: "design",
    question: "How do homeowners plan outdoor living spaces in Florida?",
    answer: "Planning an outdoor living space in Florida starts with understanding how you'll use the area — dining, lounging, cooking, or all three. Consider sun exposure throughout the day, prevailing breezes, and proximity to indoor living areas. Florida's climate allows year-round outdoor use, so many homeowners invest in features like covered areas for rain protection, screened enclosures for insect control, and ceiling fans for air circulation.",
    relatedTools: [{ label: "Design Idea Generator", href: "/tools#design" }],
    cta: "Explore our portfolio for Florida outdoor living inspiration.",
  },
];
