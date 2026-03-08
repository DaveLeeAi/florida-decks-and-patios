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
  { id: "costs", label: "Cost & Planning", description: "Budgeting, pricing factors, and project planning for deck and patio projects" },
  { id: "design", label: "Design & Outdoor Living", description: "Design considerations for outdoor living spaces in Florida" },
];

export const faqEntries: FAQEntry[] = [
  // ═══ GENERAL (4 entries) ═══
  {
    category: "general",
    question: "What is the difference between a deck and a patio?",
    answer: "A deck is a raised platform built with wood or composite lumber, usually attached to a home. A patio is a ground-level surface made from pavers, concrete, or stone. Both create outdoor living space — the best choice depends on your yard's terrain, budget, and intended use.",
  },
  {
    category: "general",
    question: "How long does deck installation usually take?",
    answer: "Most residential deck installations take between one and three weeks depending on size, complexity, and materials. Simpler ground-level decks may finish in under a week, while larger multi-level projects take longer. Permit processing time should be factored into your overall timeline separately.",
  },
  {
    category: "general",
    question: "What materials are commonly used for decks and patios?",
    answer: "Popular deck materials include composite decking and pressure-treated pine. For patios, homeowners often choose travertine pavers, brick pavers, or stamped concrete. Material selection in Florida is heavily influenced by humidity, UV exposure, and salt air.",
    answerHtml: 'Popular deck materials include composite decking and pressure-treated pine. For patios, homeowners often choose travertine pavers, brick, or stamped concrete. See material examples in our <a href="/portfolio/tampa-composite-deck-rebuild" class="text-primary hover:underline">Tampa composite deck project</a> and <a href="/portfolio/sarasota-pool-deck" class="text-primary hover:underline">Sarasota travertine pool deck</a>.',
  },
  {
    category: "general",
    question: "Can a deck or patio increase my home's value?",
    answer: "Yes. A well-built deck or patio typically returns 60–80% of its cost at resale. In Florida, where outdoor entertaining is year-round, these improvements are especially valued by buyers and can make a home significantly more attractive on the market.",
    relatedTools: [{ label: "ROI Calculator", href: "/tools#roi" }],
  },

  // ═══ CLIMATE (4 entries) ═══
  {
    category: "climate",
    question: "What decking materials work best in Florida's humidity?",
    answer: "Composite and PVC decking perform best in high humidity because they resist mold, mildew, and moisture absorption. Pressure-treated wood is also suitable but needs regular cleaning and re-staining every two to three years. Untreated wood deteriorates rapidly in Florida's subtropical climate.",
  },
  {
    category: "climate",
    question: "Are composite decks a good choice for Florida weather?",
    answer: "Composite decking is one of the top choices for Florida. Modern composites resist UV fading, won't rot from humidity, and handle heavy rain without absorbing moisture. Many homeowners choose composite to avoid the frequent maintenance wood decks require in this climate.",
    answerHtml: 'Composite decking is one of the top choices for Florida. Modern composites resist UV fading, won\'t rot from humidity, and handle heavy rain well. Our <a href="/portfolio/miami-pool-deck-renovation" class="text-primary hover:underline">Miami pool deck renovation</a> is a good example of composite decking built for coastal conditions.',
  },
  {
    category: "climate",
    question: "How do decks handle heavy rain and storms in Florida?",
    answer: "Properly built Florida decks manage heavy rain through correct drainage slopes, board spacing, and flashing at the house connection. In hurricane-prone areas, structural requirements include hurricane straps, reinforced post connections, and wind-rated railings. Good drainage design is critical for deck longevity.",
  },
  {
    category: "climate",
    question: "What materials resist corrosion near coastal areas?",
    answer: "Coastal properties need marine-grade 316 stainless steel hardware — standard galvanized fasteners corrode quickly in salt air. Composite decking, aluminum railings, and PVC trim all resist salt corrosion well. Powder-coated aluminum is preferred over painted steel for metal components near the coast.",
    answerHtml: 'Coastal properties need marine-grade 316 stainless steel hardware — standard galvanized fasteners corrode quickly in salt air. Composite decking, aluminum railings, and PVC trim resist corrosion well. Our <a href="/portfolio/st-petersburg-waterfront-deck" class="text-primary hover:underline">St. Petersburg waterfront deck</a> demonstrates material choices for salt air environments.',
  },

  // ═══ PERMITS (4 entries) ═══
  {
    category: "permits",
    question: "Do decks require building permits in Florida?",
    answer: "Yes, most deck projects in Florida require permits. This includes attached decks of any size and freestanding decks over 30 inches above grade. Requirements and fees vary by city and county, so always check with your local building department before starting construction.",
    relatedTools: [{ label: "Permit Checker", href: "/tools#permits" }],
  },
  {
    category: "permits",
    question: "Do patio installations require permits in Florida?",
    answer: "It depends on the scope. Simple paver or concrete patios at ground level are often exempt. However, patios with roofed structures, gas lines, or electrical installations typically require permits. Covered patios attached to the home almost always need permits and may require engineering approval.",
    relatedTools: [{ label: "Permit Checker", href: "/tools#permits" }],
  },
  {
    category: "permits",
    question: "Are there building code requirements for deck railings?",
    answer: "Yes. Florida Building Code requires guard rails on any deck surface more than 30 inches above grade. Residential rails must be at least 36 inches high, and balusters must prevent a 4-inch sphere from passing through. High-velocity hurricane zones have additional wind load requirements.",
  },
  {
    category: "permits",
    question: "What inspections are required during deck construction?",
    answer: "Florida typically requires three to five inspections: footings before pouring concrete, framing after structural work, electrical if applicable, and a final inspection of the completed project. Some counties add a separate railing inspection. Each phase must pass before work continues.",
    relatedTools: [{ label: "Inspection Failure Decoder", href: "/tools#violations" }],
  },

  // ═══ COSTS (4 entries) ═══
  {
    category: "costs",
    question: "How much does a deck installation cost in Florida?",
    answer: "Costs vary based on project size, materials, and site conditions. Pressure-treated wood decks start at lower price points, while composite and PVC cost more upfront but require less maintenance. Elevation, railing style, and coastal proximity all affect the final budget.",
    relatedTools: [{ label: "Cost Estimator", href: "/tools#budget" }],
  },
  {
    category: "costs",
    question: "How much does a pool deck renovation cost?",
    answer: "Pool deck costs depend on the material and area to be covered. Travertine pavers, concrete pavers, and stamped concrete are the most common options. Drainage design, pool barrier requirements, and site preparation also affect the overall budget.",
    answerHtml: 'Pool deck costs depend on the material and area to be covered. Travertine pavers, concrete pavers, and stamped concrete are the most common options. See material and design choices in our <a href="/portfolio/sarasota-pool-deck" class="text-primary hover:underline">Sarasota pool deck renovation</a>. Drainage, barriers, and site prep also affect the budget.',
    relatedTools: [{ label: "Cost Estimator", href: "/tools#budget" }],
  },
  {
    category: "costs",
    question: "What factors affect deck or patio project costs?",
    answer: "The main cost drivers are material type, project size, structural complexity, and site conditions. Coastal locations may require marine-grade hardware. Projects in high-velocity hurricane zones have higher permit and engineering costs. Getting multiple estimates helps establish a realistic budget.",
    relatedTools: [{ label: "Budget Estimator", href: "/tools#budget" }],
  },
  {
    category: "costs",
    question: "Is composite decking more expensive than wood?",
    answer: "Composite has a higher upfront cost than pressure-treated wood, but it eliminates ongoing staining, sealing, and board replacement expenses. Over 15–20 years, many homeowners find composite's total cost of ownership is comparable to wood when Florida's demanding maintenance requirements are factored in.",
  },

  // ═══ DESIGN (4 entries) ═══
  {
    category: "design",
    question: "What size deck works best for a small backyard?",
    answer: "A deck in the 200–400 square foot range typically fits a dining set and lounge chairs comfortably. Ground-level decks work well in tight spaces because they skip stairs and railings, maximizing usable area. Multi-level designs can create distinct zones without expanding the footprint.",
  },
  {
    category: "design",
    question: "Can a deck be built around an existing pool?",
    answer: "Yes, decks and patios are commonly built around existing pools in Florida. The design must maintain pool barrier setbacks and provide proper drainage. Travertine pavers and textured composite boards are popular because they offer slip resistance and stay cooler underfoot.",
    answerHtml: 'Yes, decks and patios are commonly built around existing pools in Florida. The design must maintain pool barrier setbacks and provide proper drainage. Our <a href="/portfolio/miami-pool-deck-renovation" class="text-primary hover:underline">Miami pool deck project</a> shows composite decking wrapped around an existing pool with built-in safety features.',
  },
  {
    category: "design",
    question: "Are pergolas commonly added to patios in Florida?",
    answer: "Pergolas are among the most popular patio additions in Florida because they provide adjustable shade for year-round outdoor use. Modern options include motorized louver systems that close during rain and open for sun. Many homeowners combine pergolas with outdoor kitchens for covered dining areas.",
    relatedTools: [{ label: "Design Ideas", href: "/tools#design" }],
  },
  {
    category: "design",
    question: "How do homeowners plan outdoor living spaces?",
    answer: "Start by defining how you'll use the space — dining, lounging, cooking, or entertaining. Consider sun exposure, prevailing breezes, and proximity to indoor rooms. Florida's climate allows year-round use, so features like covered areas, screened enclosures, and ceiling fans are common additions.",
    relatedTools: [{ label: "Design Idea Generator", href: "/tools#design" }],
    cta: "Explore our portfolio for Florida outdoor living inspiration.",
  },
];
