// City Outdoor Living Project Hub Data
// Each entry has unique local context — NOT template-swapped city names

export interface CityProjectHub {
  slug: string;           // URL slug e.g. "miami-decks-patios-projects"
  cityName: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;          // 2-3 sentences, unique per city
  portfolioCityFilter: string; // matches CityType in portfolioData
  outdoorChoices: {
    title: string;
    description: string;
  }[];
  climateDesign: {
    heading: string;
    points: string[];
  };
  ctaHeadline: string;
  ctaText: string;
}

export const cityProjectHubs: CityProjectHub[] = [
  {
    slug: "miami-decks-patios-projects",
    cityName: "Miami",
    metaTitle: "Miami Deck & Patio Projects | Outdoor Living Portfolio – FL",
    metaDescription: "Browse completed deck and patio projects in Miami. HVHZ-compliant pool decks, coastal composite installations, and outdoor living spaces built for South Florida's tropical climate.",
    h1: "Miami Outdoor Living Projects",
    intro: "Miami homeowners face unique challenges when building outdoor spaces — salt air corrosion, HVHZ wind ratings, and year-round tropical exposure demand materials and construction methods that most of Florida doesn't require. Our Miami project portfolio showcases real installations that meet Miami-Dade's strict building standards while creating beautiful, functional outdoor living areas.",
    portfolioCityFilter: "Miami",
    outdoorChoices: [
      { title: "Pool Decks", description: "Anti-slip composite surfaces with cool-touch technology are the most requested pool deck solution in Miami. Marine-grade 316 stainless steel hardware is essential within 3,000 feet of the coast." },
      { title: "Rooftop & Balcony Decks", description: "Pedestal-mounted composite systems allow waterproof membrane protection underneath while creating usable outdoor space on flat roofs and elevated balconies." },
      { title: "Covered Patios with Outdoor Kitchens", description: "Full outdoor kitchens under hurricane-rated pergolas or covered patios are popular in Miami's entertaining culture, combining shade, cooking, and lounge areas." },
      { title: "Waterfront Decks", description: "Properties along Biscayne Bay and the Intracoastal require all-stainless construction with NOA-certified materials to pass Miami-Dade inspections." },
    ],
    climateDesign: {
      heading: "Designing for Miami's Tropical Climate",
      points: [
        "All materials must carry Miami-Dade NOA (Notice of Acceptance) certification for HVHZ compliance",
        "316 marine-grade stainless steel hardware is mandatory near the coast — standard galvanized fails within 12 months",
        "UV index averaging 10–12 year-round causes rapid surface degradation on unprotected wood",
        "62 inches of annual rainfall with intense tropical downpours requires superior drainage engineering",
        "Cool-touch and heat-reflective deck surfaces are strongly recommended for barefoot comfort near pools",
      ],
    },
    ctaHeadline: "Planning an Outdoor Project in Miami?",
    ctaText: "Explore our full portfolio of completed deck and patio installations or get started with a free project consultation.",
  },
  {
    slug: "tampa-deck-patio-projects",
    cityName: "Tampa",
    metaTitle: "Tampa Deck & Patio Projects | Outdoor Living Portfolio – FL",
    metaDescription: "View completed deck and patio projects in Tampa Bay. Composite deck rebuilds, covered patios, and humidity-resistant outdoor spaces built for Tampa's subtropical climate.",
    h1: "Tampa Bay Outdoor Living Projects",
    intro: "Tampa Bay's subtropical humidity and intense summer heat make material selection critical for any outdoor living project. Our completed Tampa projects demonstrate how modern composite decking and engineered construction methods create durable backyard spaces that handle 74% average humidity and daily summer thunderstorms without the constant maintenance wood decks demand.",
    portfolioCityFilter: "Tampa",
    outdoorChoices: [
      { title: "Composite Deck Rebuilds", description: "Replacing aging pressure-treated decks with composite is the most common Tampa project. Homeowners eliminate annual staining and mold treatment while upgrading structural connections to current code." },
      { title: "Covered Lanais", description: "Tampa's afternoon thunderstorms make covered outdoor spaces highly desirable. Screened and roofed lanais extend usable outdoor time through the summer rainy season." },
      { title: "Paver Patios", description: "Interlocking pavers on compacted base provide durable, low-maintenance outdoor surfaces that handle heavy rain and resist the shifting that can occur in Tampa's sandy soils." },
      { title: "Deck Repairs & Code Upgrades", description: "Many Tampa homes built in the 1990s–2000s have decks approaching end-of-life. Targeted repairs including joist reinforcement and railing upgrades restore safety without full rebuilds." },
    ],
    climateDesign: {
      heading: "Building for Tampa's Humid Subtropical Climate",
      points: [
        "74% average humidity drives rapid mold and algae growth — capped composite with built-in mold inhibitors is strongly recommended",
        "Lighter-colored deck boards reduce surface temperatures that can exceed 160°F on dark boards in direct Tampa sun",
        "52 inches of concentrated summer rainfall requires proper deck drainage and grading away from the home's foundation",
        "Standard galvanized hardware is acceptable for inland Tampa, saving 15–20% versus marine-grade alternatives",
        "Over 60% of Tampa homes are in HOA communities — architectural review may be required before construction begins",
      ],
    },
    ctaHeadline: "Ready to Build in Tampa Bay?",
    ctaText: "Browse our Tampa project portfolio for inspiration or contact us to discuss your outdoor living goals.",
  },
  {
    slug: "orlando-outdoor-living-projects",
    cityName: "Orlando",
    metaTitle: "Orlando Deck & Patio Projects | Outdoor Living Portfolio – FL",
    metaDescription: "See completed deck, patio, and pergola projects in Orlando. UV-resistant composites, family-friendly designs, and outdoor living spaces built for Central Florida's year-round lifestyle.",
    h1: "Orlando Outdoor Living Projects",
    intro: "Central Florida's year-round outdoor lifestyle makes Orlando one of the strongest markets for deck, patio, and pergola construction. Without the salt air concerns of coastal cities, Orlando homeowners can focus on UV protection, shade solutions, and family-friendly designs that maximize backyard usability through every season.",
    portfolioCityFilter: "Orlando",
    outdoorChoices: [
      { title: "Pergolas with Shade Systems", description: "Orlando's intense UV index — regularly exceeding 10 in summer — makes shade structures a top priority. Pergolas with retractable canopies or motorized louvers create adjustable outdoor comfort." },
      { title: "Multi-Level Decks", description: "Orlando's relatively flat topography means multi-level decks are often designed for visual interest and zone separation rather than terrain adaptation." },
      { title: "Screened Patio Enclosures", description: "Central Florida's mosquito and lovebugs seasons drive demand for screened patios that provide outdoor enjoyment without insect interference." },
      { title: "Outdoor Entertainment Areas", description: "With families spending more time outdoors year-round, integrated grilling stations, fire pits, and seating areas are popular additions to Orlando backyards." },
    ],
    climateDesign: {
      heading: "Designing for Central Florida's Climate",
      points: [
        "No salt air exposure inland — standard galvanized hardware works well, saving 15–20% on fastener costs",
        "UV index 8–10 causes rapid wood silvering and surface cracking within 1–2 seasons without protection",
        "54 inches of rain concentrated in daily afternoon thunderstorms June–September requires excellent drainage",
        "Capped composite decking is essential to prevent fading and maintain appearance under intense Central Florida sun",
        "Sandy soils in much of Orange County require properly sized footings to prevent settling over time",
      ],
    },
    ctaHeadline: "Planning an Outdoor Space in Orlando?",
    ctaText: "Explore our Orlando-area projects or start planning your backyard transformation with a free consultation.",
  },
  {
    slug: "jacksonville-deck-patio-projects",
    cityName: "Jacksonville",
    metaTitle: "Jacksonville Deck & Patio Projects | Outdoor Living Portfolio – FL",
    metaDescription: "Browse completed deck and patio projects in Jacksonville. Deck repairs, composite installations, and outdoor living spaces built for Northeast Florida's climate.",
    h1: "Jacksonville Outdoor Living Projects",
    intro: "Jacksonville's Northeast Florida location brings a slightly cooler winter season and less intense salt air than South Florida, but the humid subtropical climate still demands careful material and construction choices. Our Jacksonville projects focus on practical, code-compliant outdoor spaces that handle the region's wet summers and occasional nor'easters.",
    portfolioCityFilter: "Jacksonville",
    outdoorChoices: [
      { title: "Deck Repairs & Restoration", description: "Jacksonville has a large inventory of aging wood decks from the 1990s–2000s building boom. Targeted repairs — joist reinforcement, stair rebuilds, railing upgrades — restore safety and extend deck life." },
      { title: "Composite Deck Installations", description: "New composite deck builds are increasingly popular as homeowners replace deteriorating wood structures with low-maintenance, code-compliant alternatives." },
      { title: "Ground-Level Patios", description: "Paver and concrete patio installations provide durable outdoor surfaces that work well with Jacksonville's relatively flat residential lots." },
      { title: "Backyard Pergolas", description: "Freestanding and attached pergolas provide shade and visual structure to Jacksonville backyards, often combined with ceiling fans for summer comfort." },
    ],
    climateDesign: {
      heading: "Building for Northeast Florida's Climate",
      points: [
        "Warm, wet summers accelerate wood decay at connection points where moisture gets trapped between structural members",
        "Moderate coastal exposure in eastern Duval County may require upgraded hardware for salt resistance",
        "Proper ventilation beneath decks helps extend pressure-treated wood framing life in Jacksonville's humid conditions",
        "Northeast Florida's occasional winter freezes can stress improperly installed paver patios — adequate base depth is critical",
        "Wind zone requirements in Duval County require engineered connections at all structural deck posts",
      ],
    },
    ctaHeadline: "Building in Jacksonville?",
    ctaText: "See our completed Jacksonville projects or get started with a free project estimate.",
  },
  {
    slug: "sarasota-deck-patio-projects",
    cityName: "Sarasota",
    metaTitle: "Sarasota Deck & Patio Projects | Outdoor Living Portfolio – FL",
    metaDescription: "View completed deck and patio projects in Sarasota. Covered patios, Gulf-side outdoor kitchens, and coastal-grade outdoor living spaces for Southwest Florida homeowners.",
    h1: "Sarasota Outdoor Living Projects",
    intro: "Sarasota's Gulf Coast location combines salt air exposure with a sophisticated homeowner market that expects quality outdoor entertaining spaces. Our Sarasota projects feature covered patios, outdoor kitchens, and composite decks built with coastal-grade materials that hold up to the Southwest Florida environment while matching the area's refined aesthetic standards.",
    portfolioCityFilter: "Sarasota",
    outdoorChoices: [
      { title: "Covered Patios & Outdoor Kitchens", description: "Sarasota homeowners frequently invest in full outdoor entertaining areas with standing-seam metal roofs, built-in grills, and granite countertops designed for year-round Gulf Coast living." },
      { title: "Pool Deck Resurfacing", description: "Replacing worn concrete pool decks with cool-touch pavers or composite surfaces improves safety and comfort around Sarasota's many residential pools." },
      { title: "Coastal Composite Decks", description: "Composite decking with marine-grade hardware provides the low-maintenance durability needed for Gulf-side properties without sacrificing the upscale appearance Sarasota homeowners expect." },
      { title: "Lanai Expansions", description: "Extending or upgrading existing screened lanais is a common project in Sarasota, adding usable square footage while maintaining insect protection." },
    ],
    climateDesign: {
      heading: "Designing for Sarasota's Gulf Coast Climate",
      points: [
        "Gulf salt air accelerates hardware corrosion — marine-grade or stainless fasteners recommended for properties within 2 miles of the water",
        "Standing-seam metal roofing on covered patios handles Gulf wind and rain better than traditional shingle roofing",
        "Summer surface temperatures on south-facing patios can exceed 150°F — light-colored materials and shade structures are essential",
        "Afternoon thunderstorms from June through September require proper drainage design for all ground-level patio installations",
        "Sarasota County requires engineering stamps for most attached structures, including covered patios and pergolas",
      ],
    },
    ctaHeadline: "Planning a Project in Sarasota?",
    ctaText: "Browse our Sarasota-area portfolio or contact us to start planning your outdoor living space.",
  },
  {
    slug: "fort-lauderdale-deck-projects",
    cityName: "Fort Lauderdale",
    metaTitle: "Fort Lauderdale Deck & Patio Projects | Outdoor Living Portfolio – FL",
    metaDescription: "See completed deck and patio projects in Fort Lauderdale. Rooftop decks, waterfront installations, and HVHZ-compliant outdoor spaces for Broward County homeowners.",
    h1: "Fort Lauderdale Outdoor Living Projects",
    intro: "Fort Lauderdale's Intracoastal waterfront lifestyle and Broward County's HVHZ requirements create a unique construction environment for outdoor projects. Our Fort Lauderdale portfolio features rooftop decks, waterfront installations, and covered patios that meet the area's stringent wind ratings while maximizing the indoor-outdoor living that defines South Florida.",
    portfolioCityFilter: "Fort Lauderdale",
    outdoorChoices: [
      { title: "Rooftop Decks", description: "Pedestal-mounted composite systems on flat roofs are increasingly popular in Fort Lauderdale's urban waterfront neighborhoods, converting unused roof space into outdoor living areas." },
      { title: "Waterfront Composite Decks", description: "Properties along the Intracoastal and New River require marine-grade construction with 316 stainless hardware to handle constant salt exposure." },
      { title: "Covered Entertaining Patios", description: "Hurricane-rated covered patios with outdoor kitchens are a Fort Lauderdale staple, providing year-round outdoor entertaining space protected from afternoon storms." },
      { title: "Balcony & Terrace Renovations", description: "Many Fort Lauderdale condos and townhomes feature balcony and terrace renovations with composite decking over existing concrete surfaces." },
    ],
    climateDesign: {
      heading: "Building in Broward County's Coastal Environment",
      points: [
        "Broward County falls within the HVHZ — all materials require Miami-Dade NOA certification or equivalent wind ratings",
        "Constant Intracoastal salt exposure demands 316 stainless steel throughout — no exceptions for waterfront properties",
        "Rooftop installations face extreme wind exposure requiring engineered anchoring systems rated for 150+ mph",
        "Year-round UV exposure at index 10+ makes capped composite or PVC decking essential for surface longevity",
        "Permit processing in Broward County typically runs 10–30 business days with engineering review required",
      ],
    },
    ctaHeadline: "Ready to Build in Fort Lauderdale?",
    ctaText: "Explore our Fort Lauderdale projects or start your outdoor living conversation with a free consultation.",
  },
  {
    slug: "naples-outdoor-living-projects",
    cityName: "Naples",
    metaTitle: "Naples Deck & Patio Projects | Luxury Outdoor Living Portfolio – FL",
    metaDescription: "Browse luxury deck and patio projects in Naples. Travertine patios, waterfront decks, outdoor kitchens, and premium outdoor living spaces for Southwest Florida homeowners.",
    h1: "Naples Luxury Outdoor Living Projects",
    intro: "Naples homeowners expect premium outdoor living spaces that match the quality of their Gulf Coast properties. Our Naples projects feature travertine patios, full outdoor kitchens, motorized pergolas, and composite waterfront decks built with the highest-grade materials available — designed to withstand Southwest Florida's tropical conditions while delivering an elevated aesthetic.",
    portfolioCityFilter: "Naples",
    outdoorChoices: [
      { title: "Luxury Outdoor Kitchens", description: "Full outdoor kitchens with built-in grills, sinks, refrigerators, and granite countertops are a signature Naples feature, often covered by motorized louver pergolas." },
      { title: "Travertine & Natural Stone Patios", description: "Travertine pavers are the most popular patio surface in Naples — naturally cool underfoot, elegant in appearance, and durable in Florida's tropical climate." },
      { title: "Waterfront Composite Decks", description: "Gulf-side and canal-front properties require premium composite decking with marine-grade hardware for long-term performance against salt air exposure." },
      { title: "Motorized Pergola Systems", description: "Adjustable louver pergolas that open for sun and close watertight during rain are increasingly popular on Naples properties for their versatility and clean design." },
    ],
    climateDesign: {
      heading: "Designing for Naples' Tropical Gulf Climate",
      points: [
        "Gulf proximity brings persistent salt air that corrodes standard hardware — marine-grade stainless steel is recommended for most Naples properties",
        "Travertine pavers stay cooler underfoot than concrete or porcelain, making them ideal for Naples' barefoot outdoor lifestyle",
        "Motorized louver pergolas handle the transition between Florida's intense sun and sudden afternoon rain events",
        "Collier County requires engineering stamps for most outdoor structures including attached patios and pergolas",
        "Premium landscape integration is expected in Naples — outdoor living spaces typically include lighting, irrigation, and planting coordination",
      ],
    },
    ctaHeadline: "Designing Your Naples Outdoor Space?",
    ctaText: "Explore our Naples portfolio or schedule a consultation to discuss your luxury outdoor living project.",
  },
  {
    slug: "st-petersburg-deck-projects",
    cityName: "St Petersburg",
    metaTitle: "St. Petersburg Deck & Patio Projects | Outdoor Living Portfolio – FL",
    metaDescription: "View completed deck and patio projects in St. Petersburg. Waterfront composite decks, multi-level installations, and coastal outdoor living spaces in Pinellas County.",
    h1: "St. Petersburg Outdoor Living Projects",
    intro: "St. Petersburg's waterfront lifestyle and year-round sunshine make outdoor living spaces a core part of home value in Pinellas County. Our St. Pete projects showcase waterfront composite decks, multi-level installations, and covered patios built with marine-grade hardware to handle Tampa Bay's salt air while maximizing panoramic water views.",
    portfolioCityFilter: "St Petersburg",
    outdoorChoices: [
      { title: "Waterfront Multi-Level Decks", description: "St. Petersburg's waterfront properties often call for multi-level deck systems that provide separate zones for dining, lounging, and dock access with unobstructed bay views." },
      { title: "Cable Railing Systems", description: "Stainless steel cable railings are the most requested railing style in St. Pete — they preserve water views while meeting height and spacing requirements." },
      { title: "Dock-Connected Decks", description: "Custom stairways connecting upper decks to dock level require specific engineering for tidal conditions and coastal wind loads in Pinellas County." },
      { title: "Covered Outdoor Living Areas", description: "Covered patios and screened lanais extend usable outdoor time through St. Pete's summer storm season while keeping the open-air feel." },
    ],
    climateDesign: {
      heading: "Building for St. Petersburg's Coastal Climate",
      points: [
        "Tampa Bay salt air drives rapid hardware corrosion — 316 stainless steel is the practical standard for waterfront St. Pete properties",
        "Standard galvanized hardware can fail in as few as 5–8 years in direct salt air exposure near the bay",
        "Pinellas County coastal zone requirements mandate hurricane tie-downs at every structural post",
        "Composite decking eliminates the constant refinishing that wood decks require in St. Pete's salt and humidity environment",
        "St. Petersburg averages 361 days of sunshine per year — UV-resistant capped composite is essential for surface longevity",
      ],
    },
    ctaHeadline: "Building in St. Petersburg?",
    ctaText: "Browse our St. Pete waterfront projects or get started with a free project consultation.",
  },
  {
    slug: "palm-beach-deck-patio-projects",
    cityName: "Palm Beach",
    metaTitle: "Palm Beach Deck & Patio Projects | Outdoor Living Portfolio – FL",
    metaDescription: "See completed deck and patio projects in Palm Beach. Luxury outdoor living, coastal composite installations, and hurricane-rated patios for Palm Beach County homeowners.",
    h1: "Palm Beach Outdoor Living Projects",
    intro: "Palm Beach County homeowners invest in outdoor living spaces that reflect the area's upscale coastal lifestyle. Our Palm Beach projects feature premium composite decks, covered entertaining areas, and patio installations built with hurricane-rated hardware and corrosion-resistant materials suited to the Atlantic coast environment.",
    portfolioCityFilter: "Palm Beach",
    outdoorChoices: [
      { title: "Coastal Composite Decks", description: "Premium composite decking with marine-grade fasteners is the standard for Palm Beach properties, providing low-maintenance durability against Atlantic salt air and UV exposure." },
      { title: "Covered Entertaining Patios", description: "Hurricane-rated covered patios with outdoor furniture zones and integrated lighting create year-round outdoor living spaces suitable for Palm Beach's social entertaining culture." },
      { title: "Pool Deck Renovations", description: "Upgrading aging concrete or wood pool decks with anti-slip composite or cool-touch pavers improves safety and aesthetics around Palm Beach's residential pools." },
      { title: "Garden Pergolas", description: "Freestanding pergolas integrated with tropical landscaping provide shaded outdoor retreats that complement Palm Beach's lush property designs." },
    ],
    climateDesign: {
      heading: "Designing for Palm Beach's Atlantic Coast Climate",
      points: [
        "Direct Atlantic exposure brings aggressive salt spray — marine-grade hardware is required for most Palm Beach properties",
        "Hurricane season (June–November) demands engineered wind connections at all structural points per Palm Beach County code",
        "Year-round UV index averaging 9–11 makes capped PVC or composite decking the practical material choice",
        "Heavy tropical rainfall events require superior drainage engineering for ground-level patio and deck installations",
        "Palm Beach County requires permits for most deck and patio structures over 200 sq ft or 30 inches above grade",
      ],
    },
    ctaHeadline: "Planning a Project in Palm Beach?",
    ctaText: "Explore our Palm Beach project portfolio or contact us for a free consultation on your outdoor living vision.",
  },
];

export function getCityProjectHub(slug: string): CityProjectHub | undefined {
  return cityProjectHubs.find(h => h.slug === slug);
}
