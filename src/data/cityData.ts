export interface CityData {
  slug: string;
  name: string;
  county: string;
  region: string;
  tagline: string;
  metaTitle: string;
  metaDescription: string;
  focusKeyword: string;
  heroHeadline: string;
  heroSubheadline: string;
  permitLink: string;
  permitDepartment: string;
  permitPhone: string;
  climateProfile: {
    primary: string;
    humidity: string;
    uvIndex: string;
    saltAir: boolean;
    hurricaneZone: string;
    annualRainfall: string;
    climateAdvice: string;
  };
  costData: {
    pressureTreatedPerSqFt: string;
    compositePerSqFt: string;
    premiumCompositePerSqFt: string;
    laborRatePerSqFt: string;
    permitFeeBasic: string;
    permitFeeComplex: string;
    avgProjectTotal: string;
    engineeringRequired: string;
  };
  realEstate: {
    medianHomePrice: string;
    medianHomePriceNum: number;
    deckROIPercent: string;
    avgValueAdded: string;
    daysFasterToSell: string;
    marketTrend: string;
  };
  faq: {
    permitUnder100: string;
    avgCostPerSqFt: string;
    woodDeckLifespan: string;
  };
  materialDurability: {
    pressureTreated: { lifespan: string; maintenanceHours: string; };
    composite: { lifespan: string; maintenanceHours: string; };
    pvc: { lifespan: string; maintenanceHours: string; };
    ipe: { lifespan: string; maintenanceHours: string; };
  };
  knowledgeCluster: string;
  uniqueContent: string;
}

export const cityPages: CityData[] = [
  {
    slug: "tampa-decks",
    name: "Tampa Bay",
    county: "Hillsborough / Pasco",
    region: "Central West Florida",
    tagline: "Volume Leader in Outdoor Living",
    metaTitle: "Tampa Deck Builders | Custom Decks & Patios in Tampa Bay FL",
    metaDescription: "Tampa's top-rated deck builder. Custom composite & wood decks built to Florida Building Code. See local costs, permits, and project photos for Hillsborough County.",
    focusKeyword: "deck builder Tampa",
    heroHeadline: "Tampa Bay's Trusted Deck & Patio Experts",
    heroSubheadline: "Custom outdoor living spaces engineered for Tampa's climate — built to FBC standards with hurricane-rated hardware.",
    permitLink: "https://www.hillsboroughcounty.org/en/residents/property-owners-and-renters/building-permits",
    permitDepartment: "Hillsborough County Building Services",
    permitPhone: "(813) 272-5600",
    climateProfile: {
      primary: "Subtropical humidity with intense summer heat",
      humidity: "74% average annual humidity",
      uvIndex: "UV index 9–11 from April through October",
      saltAir: false,
      hurricaneZone: "Wind Zone 130 mph design speed",
      annualRainfall: "52 inches, concentrated June–September",
      climateAdvice: "Tampa's combination of extreme humidity and intense UV is the #1 enemy of untreated wood decks. Pressure-treated pine in Tampa typically shows signs of mold within 6–8 months without treatment. Composite decking with built-in mold inhibitors performs significantly better. Choose lighter colors to reduce surface heat — Tampa afternoon temperatures regularly exceed 95°F from May through September, and dark composite boards can reach 160°F in direct sun.",
    },
    costData: {
      pressureTreatedPerSqFt: "$18–$26",
      compositePerSqFt: "$35–$52",
      premiumCompositePerSqFt: "$50–$70",
      laborRatePerSqFt: "$12–$18",
      permitFeeBasic: "$200–$400",
      permitFeeComplex: "$500–$800",
      avgProjectTotal: "$10,500–$16,000",
      engineeringRequired: "Required for attached and elevated decks",
    },
    realEstate: {
      medianHomePrice: "$385,000",
      medianHomePriceNum: 385000,
      deckROIPercent: "68–78%",
      avgValueAdded: "$12,000–$22,000",
      daysFasterToSell: "18 days",
      marketTrend: "Tampa Bay's master-planned community boom means homes with quality outdoor spaces sell significantly faster. HOAs in communities like FishHawk Ranch, Westchase, and New Tampa actively promote outdoor living upgrades.",
    },
    faq: {
      permitUnder100: "In Hillsborough County, freestanding decks under 200 sq ft that are ground-level (under 30 inches) typically do not require a building permit. However, any deck attached to your home requires a permit regardless of size. Always verify with the Hillsborough County Building Services department, as rules may differ for properties in flood zones or HOA communities.",
      avgCostPerSqFt: "The 2026 average cost per square foot for a composite deck in Tampa is $35–$52 installed, including corrosion-resistant hardware and standard railings. This is approximately 10% above the national average due to Florida Building Code requirements for hurricane-rated connectors. Premium composite lines run $50–$70 per square foot.",
      woodDeckLifespan: "In Tampa's subtropical climate with 74% average humidity and UV index regularly exceeding 10, untreated pressure-treated wood decks typically last 8–12 years. With diligent annual maintenance (staining, sealing, mold treatment), you can extend this to 12–15 years. Composite decks in Tampa last 25–35 years with minimal maintenance.",
    },
    materialDurability: {
      pressureTreated: { lifespan: "8–12 years", maintenanceHours: "16–24 hrs/year" },
      composite: { lifespan: "25–35 years", maintenanceHours: "2–4 hrs/year" },
      pvc: { lifespan: "30–40 years", maintenanceHours: "1–3 hrs/year" },
      ipe: { lifespan: "30–50 years", maintenanceHours: "6–10 hrs/year" },
    },
    knowledgeCluster: "Volume Leader",
    uniqueContent: "Tampa Bay leads Florida in new deck construction volume, driven by explosive growth in master-planned communities across Hillsborough and Pasco counties. Communities like FishHawk Ranch, Watergrass, Epperson, and Bexley are adding thousands of homes annually — many with builder-grade patios that homeowners want to upgrade to full composite deck systems.\n\nThe Tampa market is characterized by:\n\n- **High HOA prevalence**: Over 60% of Tampa homes are in HOA communities with specific architectural review requirements for deck projects\n- **Master-planned community standards**: Many communities require composite or PVC decking (no pressure-treated wood) and pre-approved color palettes\n- **Volume pricing advantage**: The high demand in Tampa means competitive contractor pricing and shorter wait times compared to coastal luxury markets\n- **Family-oriented designs**: Multi-level decks with play areas, built-in storage, and screened sections for year-round family use",
  },
  {
    slug: "orlando-patios",
    name: "Orlando",
    county: "Orange County",
    region: "Central Florida",
    tagline: "Sustainable Growth & Family Living",
    metaTitle: "Orlando Deck & Patio Builders | Custom Outdoor Spaces in Orange County FL",
    metaDescription: "Orlando's premier deck and patio builder. Composite decks, screened porches, and outdoor kitchens built for Central Florida's climate. See local costs and permits.",
    focusKeyword: "deck builder Orlando",
    heroHeadline: "Orlando's Expert Deck & Patio Builders",
    heroSubheadline: "Family-friendly outdoor spaces designed for Central Florida's year-round lifestyle — permitted and built to code in Orange County.",
    permitLink: "https://www.orangecountyfl.net/BuildingPermitting.aspx",
    permitDepartment: "Orange County Building Division",
    permitPhone: "(407) 836-5540",
    climateProfile: {
      primary: "Inland subtropical with heavy summer rainfall",
      humidity: "72% average annual humidity",
      uvIndex: "UV index 8–10 from March through November",
      saltAir: false,
      hurricaneZone: "Wind Zone 130 mph design speed",
      annualRainfall: "54 inches, with afternoon thunderstorms daily June–September",
      climateAdvice: "Orlando's primary deck challenge is moisture management. With 54 inches of annual rainfall and daily afternoon thunderstorms during summer, proper drainage under and around your deck is critical. Orlando doesn't face salt air corrosion like coastal cities, which makes standard galvanized hardware acceptable (saving 15–20% on fastener costs vs. coastal projects). However, Orlando's intense but slightly lower UV exposure still degrades untreated wood rapidly. Composite decking with proper ventilation underneath performs best in Orlando's wet-dry cycles.",
    },
    costData: {
      pressureTreatedPerSqFt: "$16–$24",
      compositePerSqFt: "$32–$48",
      premiumCompositePerSqFt: "$48–$65",
      laborRatePerSqFt: "$10–$16",
      permitFeeBasic: "$150–$350",
      permitFeeComplex: "$400–$600",
      avgProjectTotal: "$9,600–$14,400",
      engineeringRequired: "Required for elevated decks",
    },
    realEstate: {
      medianHomePrice: "$370,000",
      medianHomePriceNum: 370000,
      deckROIPercent: "65–75%",
      avgValueAdded: "$10,000–$20,000",
      daysFasterToSell: "15 days",
      marketTrend: "Orlando's sustained population growth (1,000+ new residents per week) drives strong demand for move-in-ready homes with outdoor living spaces. Family-oriented layouts with screened porches and covered patios are the most sought-after outdoor features in the Orlando MLS market.",
    },
    faq: {
      permitUnder100: "In Orange County, freestanding decks under 200 sq ft that are ground-level generally do not require a permit. Any deck attached to your home requires a permit regardless of size. Orlando has specific zoning setback requirements that may affect even small freestanding decks — check with the Orange County Building Division before starting any project.",
      avgCostPerSqFt: "The 2026 average cost per square foot for a composite deck in Orlando is $32–$48 installed. Orlando is one of the more affordable Florida markets for deck building because inland location eliminates the need for marine-grade stainless steel hardware required in coastal areas. Premium composite with upgraded railings runs $48–$65 per square foot.",
      woodDeckLifespan: "In Orlando's inland Central Florida climate, pressure-treated wood decks last 10–14 years with proper maintenance. Orlando's slightly lower salt exposure compared to coastal cities means hardware corrosion is less of an issue, but the intense daily rain-then-sun cycle during summer creates ideal conditions for mold and wood rot. Annual staining and bi-annual mold treatment are essential.",
    },
    materialDurability: {
      pressureTreated: { lifespan: "10–14 years", maintenanceHours: "14–20 hrs/year" },
      composite: { lifespan: "25–35 years", maintenanceHours: "2–4 hrs/year" },
      pvc: { lifespan: "30–40 years", maintenanceHours: "1–3 hrs/year" },
      ipe: { lifespan: "35–50 years", maintenanceHours: "5–8 hrs/year" },
    },
    knowledgeCluster: "Sustainable Growth",
    uniqueContent: "Orlando's explosive population growth — over 1,000 new residents per week — creates unique opportunities and challenges for outdoor living projects. The city's family-centric demographics drive demand for practical, multi-functional deck designs that serve daily life, not just weekend entertaining.\n\nKey Orlando market characteristics:\n\n- **Zoning-conscious layouts**: Orange County's residential zoning requires careful setback planning, especially on smaller lots in communities like Lake Nona, Horizon West, and Windermere\n- **Sustainable material demand**: Orlando homeowners increasingly request eco-friendly composite options made from recycled materials, aligning with the city's sustainability initiatives\n- **Family-first design**: Play-safe surfaces, built-in gates for toddler safety, and covered homework/remote-work zones are common Orlando-specific requests\n- **HOA integration**: Many Orlando communities require architectural review — we handle all coordination as part of our project process",
  },
  {
    slug: "sarasota-outdoor-living",
    name: "Sarasota / Venice",
    county: "Sarasota County",
    region: "Southwest Florida",
    tagline: "Premium Coastal Living",
    metaTitle: "Sarasota Deck Builders | Premium Outdoor Living in Sarasota & Venice FL",
    metaDescription: "Sarasota's luxury deck and outdoor living specialists. Salt-air resistant composite and PVC decking engineered for coastal Florida. See Sarasota County costs and permits.",
    focusKeyword: "deck builder Sarasota",
    heroHeadline: "Sarasota's Premium Outdoor Living Specialists",
    heroSubheadline: "Luxury decks and outdoor spaces built with salt-air resistant materials — engineered for Sarasota's coastal climate and lifestyle.",
    permitLink: "https://www.scgov.net/government/building-permits",
    permitDepartment: "Sarasota County Building Department",
    permitPhone: "(941) 861-6151",
    climateProfile: {
      primary: "Coastal subtropical with significant salt air exposure",
      humidity: "76% average annual humidity",
      uvIndex: "UV index 9–11 from March through November",
      saltAir: true,
      hurricaneZone: "Wind Zone 140 mph design speed (coastal areas to 150+ mph)",
      annualRainfall: "56 inches with intense gulf storm surges",
      climateAdvice: "Sarasota's salt air is the most aggressive material degrader on Florida's Gulf Coast. Properties within 5 miles of the beach require 316 marine-grade stainless steel for all fasteners and connectors — standard galvanized hardware will show corrosion within 12–18 months. PVC and capped composite decking are strongly recommended over wood for coastal Sarasota installations. The combination of salt spray, high UV, and frequent gulf storms creates one of the most demanding environments for outdoor structures in the entire Southeast.",
    },
    costData: {
      pressureTreatedPerSqFt: "$22–$30",
      compositePerSqFt: "$40–$60",
      premiumCompositePerSqFt: "$55–$80",
      laborRatePerSqFt: "$14–$20",
      permitFeeBasic: "$250–$500",
      permitFeeComplex: "$600–$1,000",
      avgProjectTotal: "$14,000–$22,000",
      engineeringRequired: "Usually required — engineer stamp for coastal zone projects",
    },
    realEstate: {
      medianHomePrice: "$480,000",
      medianHomePriceNum: 480000,
      deckROIPercent: "70–82%",
      avgValueAdded: "$18,000–$32,000",
      daysFasterToSell: "25 days",
      marketTrend: "Sarasota's luxury market expects premium outdoor spaces. Homes with well-designed waterfront decks, screened lanais, and outdoor kitchens command 8–12% higher sale prices than comparable homes without them. The post-hurricane rebuilding surge has created additional demand for code-compliant, storm-resistant outdoor structures.",
    },
    faq: {
      permitUnder100: "In Sarasota County, virtually all deck construction requires a permit due to the coastal wind zone designation. Even small freestanding decks under 100 sq ft may need a permit if located in a flood zone, velocity zone, or within the coastal construction control line. Always contact Sarasota County Building Services before starting any outdoor structure project.",
      avgCostPerSqFt: "The 2026 average cost per square foot for a composite deck in Sarasota is $40–$60 installed. Sarasota's coastal location drives higher costs due to mandatory marine-grade stainless steel hardware, deeper engineered footings, and more complex wind-load engineering requirements. Premium PVC or capped composite with 316 SS hardware runs $55–$80 per square foot.",
      woodDeckLifespan: "In Sarasota's coastal environment with salt air, high humidity, and intense UV, pressure-treated wood decks typically last only 6–10 years even with aggressive annual maintenance. The salt spray corrodes fasteners rapidly and accelerates wood decay. We strongly recommend composite or PVC decking for all Sarasota projects — these materials resist salt, moisture, and UV while lasting 25–40 years with minimal care.",
    },
    materialDurability: {
      pressureTreated: { lifespan: "6–10 years", maintenanceHours: "20–30 hrs/year" },
      composite: { lifespan: "25–35 years", maintenanceHours: "3–5 hrs/year" },
      pvc: { lifespan: "30–45 years", maintenanceHours: "1–3 hrs/year" },
      ipe: { lifespan: "30–50 years", maintenanceHours: "8–12 hrs/year" },
    },
    knowledgeCluster: "Salt-Air Durability & Premium Lifestyle",
    uniqueContent: "Sarasota and Venice represent Florida's premium outdoor living market. Homeowners here expect resort-quality materials and finishes, and the coastal environment demands them.\n\nAfter Hurricanes Ian (2022) and Milton (2024), Sarasota County has significantly tightened enforcement of building codes for outdoor structures. This creates both challenges and opportunities:\n\n- **Post-hurricane rebuilding surge**: Many homes need new or rebuilt decks, creating high contractor demand and the opportunity to upgrade to modern, storm-resistant designs\n- **Salt-air material selection**: PVC decking (like AZEK and TimberTech Advanced PVC) is the #1 recommended material for Sarasota coastal properties due to zero moisture absorption and complete salt resistance\n- **Premium design expectations**: Sarasota clients typically request cable railings for view preservation, integrated lighting, and multi-zone layouts for entertaining\n- **Stricter wind engineering**: Coastal Sarasota projects routinely require stamped engineering drawings rated for 140–150+ mph winds, adding $1,500–$3,000 to project costs\n- **Flood zone compliance**: Many Sarasota properties fall within FEMA flood zones, requiring elevated deck designs that meet Base Flood Elevation (BFE) requirements",
  },
  {
    slug: "jacksonville-decks",
    name: "Jacksonville",
    county: "St. Johns / Duval County",
    region: "Northeast Florida",
    tagline: "Maximum ROI & Military-Friendly",
    metaTitle: "Jacksonville Deck Builders | Durable Decks & Patios in Jacksonville FL",
    metaDescription: "Jacksonville's trusted deck builder. Military-family-friendly pricing with durable, FBC-compliant composite and wood decks. See St. Johns County costs and permits.",
    focusKeyword: "deck builder Jacksonville",
    heroHeadline: "Jacksonville's Durable Deck & Patio Builders",
    heroSubheadline: "Military-family-friendly deck building with maximum ROI — engineered for Northeast Florida's climate and built to last.",
    permitLink: "https://www.coj.net/departments/building-inspection",
    permitDepartment: "City of Jacksonville Building Inspection Division",
    permitPhone: "(904) 255-7800",
    climateProfile: {
      primary: "Northern subtropical with moderate coastal influence",
      humidity: "71% average annual humidity",
      uvIndex: "UV index 7–10 from March through October",
      saltAir: true,
      hurricaneZone: "Wind Zone 120–130 mph design speed",
      annualRainfall: "50 inches with distinct wet/dry seasons",
      climateAdvice: "Jacksonville's climate is Florida's most moderate, which translates to better material longevity than Central or South Florida. Coastal Duval County properties (Jacksonville Beach, Neptune Beach, Atlantic Beach) still require salt-air rated hardware, but inland Jacksonville and St. Johns County projects can use standard galvanized fasteners. Jacksonville's cooler winters (occasional frost) mean decks experience mild thermal cycling that can loosen fasteners over time — annual hardware checks are recommended.",
    },
    costData: {
      pressureTreatedPerSqFt: "$15–$22",
      compositePerSqFt: "$30–$45",
      premiumCompositePerSqFt: "$45–$62",
      laborRatePerSqFt: "$10–$15",
      permitFeeBasic: "$150–$350",
      permitFeeComplex: "$400–$600",
      avgProjectTotal: "$8,500–$13,500",
      engineeringRequired: "Required for elevated decks in coastal zone",
    },
    realEstate: {
      medianHomePrice: "$340,000",
      medianHomePriceNum: 340000,
      deckROIPercent: "70–82%",
      avgValueAdded: "$10,000–$18,000",
      daysFasterToSell: "12 days",
      marketTrend: "Jacksonville offers the best deck ROI in Florida due to lower construction costs combined with strong home value appreciation. The large military presence (NAS Jacksonville, Mayport Naval Station) creates consistent demand for move-in-ready homes with outdoor spaces, as military families prioritize turnkey features during PCS moves.",
    },
    faq: {
      permitUnder100: "In Duval County (City of Jacksonville), freestanding decks under 200 sq ft that are ground-level typically do not require a building permit. Decks attached to the home always require a permit. If your property is in St. Johns County or a coastal flood zone, different thresholds may apply. Always verify with your local building department.",
      avgCostPerSqFt: "The 2026 average cost per square foot for a composite deck in Jacksonville is $30–$45 installed — the most affordable among Florida's major metros. Jacksonville's lower labor rates and inland location (for non-beach properties) reduce overall project costs by 10–15% compared to Tampa or Sarasota. Premium composite runs $45–$62 per square foot.",
      woodDeckLifespan: "In Jacksonville's more moderate North Florida climate, pressure-treated wood decks typically last 10–15 years with annual maintenance — longer than anywhere else in the state. Jacksonville's cooler winters and lower UV intensity slow the degradation process. However, coastal Jacksonville Beach properties face salt air that can reduce this to 8–12 years.",
    },
    materialDurability: {
      pressureTreated: { lifespan: "10–15 years", maintenanceHours: "12–18 hrs/year" },
      composite: { lifespan: "28–40 years", maintenanceHours: "2–4 hrs/year" },
      pvc: { lifespan: "30–40 years", maintenanceHours: "1–3 hrs/year" },
      ipe: { lifespan: "35–55 years", maintenanceHours: "5–8 hrs/year" },
    },
    knowledgeCluster: "Maximum ROI & Military-Friendly",
    uniqueContent: "Jacksonville is Florida's best-value deck market and offers the highest ROI for outdoor living investments. Several factors make Jacksonville unique:\n\n- **Military-family market**: With NAS Jacksonville, Mayport Naval Station, and Camp Blanding nearby, a significant portion of the housing market serves military families. These buyers prioritize durable, low-maintenance outdoor spaces they can enjoy during their 2–4 year assignment without worrying about annual upkeep\n- **VA loan prevalence**: Many Jacksonville home purchases use VA financing, and well-maintained outdoor spaces help homes appraise at higher values — critical for VA loans that require homes to meet appraised value\n- **Cost advantage**: Jacksonville's labor rates are 15–20% lower than Tampa or Sarasota, making it possible to get a premium composite deck at near-budget prices\n- **St. Johns County growth**: Rapidly growing St. Johns County (Nocatee, Ponte Vedra) represents a premium sub-market with higher budgets and design expectations\n- **Climate advantage**: Northeast Florida's more moderate climate means materials last longer, delivering better long-term value for the investment",
  },
  {
    slug: "ocala-outdoor-living",
    name: "Ocala",
    county: "Marion County",
    region: "North Central Florida",
    tagline: "Affordable New Build Additions",
    metaTitle: "Ocala Deck Builders | Affordable Decks & Patios in Marion County FL",
    metaDescription: "Ocala's affordable deck and patio builder. New build additions, budget-friendly composite decks, and patio designs for Marion County homeowners. See local costs.",
    focusKeyword: "deck builder Ocala",
    heroHeadline: "Ocala's Affordable Deck & Patio Experts",
    heroSubheadline: "Quality outdoor living spaces at North Central Florida's best prices — perfect for new builds, first-time homeowners, and retirement communities.",
    permitLink: "https://www.marioncountyfl.org/departments-agencies/building-safety",
    permitDepartment: "Marion County Building Safety",
    permitPhone: "(352) 438-2400",
    climateProfile: {
      primary: "Inland north-central subtropical with moderate conditions",
      humidity: "70% average annual humidity",
      uvIndex: "UV index 7–10 from April through October",
      saltAir: false,
      hurricaneZone: "Wind Zone 115–120 mph design speed (lower than coastal)",
      annualRainfall: "50 inches with typical Florida summer rain pattern",
      climateAdvice: "Ocala's inland location provides one of Florida's most forgiving climates for deck building. No salt air exposure means standard galvanized hardware works perfectly — saving 20–30% on fastener costs compared to coastal projects. Wind load requirements are lower than coastal counties (115–120 mph vs. 140–150 mph), which simplifies engineering and reduces material costs. Ocala's well-drained sandy soil is ideal for standard concrete footings without the need for helical piers. The primary challenges are humidity-driven mold and UV degradation — both manageable with proper material selection.",
    },
    costData: {
      pressureTreatedPerSqFt: "$14–$20",
      compositePerSqFt: "$28–$42",
      premiumCompositePerSqFt: "$42–$58",
      laborRatePerSqFt: "$9–$14",
      permitFeeBasic: "$100–$250",
      permitFeeComplex: "$300–$500",
      avgProjectTotal: "$7,500–$12,000",
      engineeringRequired: "Only for complex or elevated decks",
    },
    realEstate: {
      medianHomePrice: "$285,000",
      medianHomePriceNum: 285000,
      deckROIPercent: "72–85%",
      avgValueAdded: "$8,000–$15,000",
      daysFasterToSell: "10 days",
      marketTrend: "Ocala is Florida's fastest-growing affordable market. First-time buyers and retirees are drawn to Marion County's lower home prices and property taxes. New construction communities like Del Webb Stone Creek, On Top of the World, and Calesa Township create steady demand for outdoor living additions that transform builder-basic backyards.",
    },
    faq: {
      permitUnder100: "In Marion County, freestanding decks under 200 sq ft that are ground-level (under 30 inches above grade) typically do not require a building permit. Attached decks of any size require a permit. Marion County's permitting process is generally faster and less expensive than coastal counties — expect 1–2 weeks for approval on standard deck projects.",
      avgCostPerSqFt: "The 2026 average cost per square foot for a composite deck in Ocala is $28–$42 installed — the most affordable in the state. Ocala's inland location eliminates the need for marine-grade hardware, lower wind zone ratings reduce engineering requirements, and competitive labor rates keep installation costs down. A quality 300 sq ft composite deck in Ocala can be built for under $12,000.",
      woodDeckLifespan: "In Ocala's inland North Central Florida climate, pressure-treated wood decks can last 12–16 years with proper maintenance — the longest lifespan for wood decks anywhere in Florida. The absence of salt air and slightly lower humidity compared to coastal areas slows corrosion and decay. However, annual staining and mold prevention are still essential in Ocala's subtropical climate.",
    },
    materialDurability: {
      pressureTreated: { lifespan: "12–16 years", maintenanceHours: "10–16 hrs/year" },
      composite: { lifespan: "28–40 years", maintenanceHours: "2–3 hrs/year" },
      pvc: { lifespan: "30–40 years", maintenanceHours: "1–2 hrs/year" },
      ipe: { lifespan: "35–55 years", maintenanceHours: "4–7 hrs/year" },
    },
    knowledgeCluster: "Affordability & New Build Additions",
    uniqueContent: "Ocala represents Florida's affordable outdoor living frontier. With median home prices 25–40% lower than coastal markets, Ocala homeowners get more deck for their dollar — and the ROI is among the highest in the state.\n\nWhat makes the Ocala market unique:\n\n- **New build additions**: Many Ocala homes are new construction with builder-basic concrete patios. Upgrading to a composite deck or adding a screened porch is the most popular outdoor improvement in the area\n- **Retirement community demand**: Communities like On Top of the World, Del Webb Stone Creek, and Oak Run have active homeowner populations looking for low-maintenance outdoor spaces for entertaining and relaxation\n- **First-time homeowner budget**: Ocala's affordability attracts first-time buyers who want quality outdoor living at entry-level pricing — pressure-treated wood decks starting under $5,000 for a 300 sq ft platform\n- **Horse country aesthetic**: Ocala's identity as Florida's Horse Capital influences design preferences — natural wood tones, ranch-style layouts, and open-air designs that connect to the pastoral landscape\n- **Lower regulatory burden**: Marion County's lower wind zone requirements and faster permitting process mean quicker project timelines and lower overhead costs passed to homeowners",
  },
];

export function getCityBySlug(slug: string): CityData | undefined {
  return cityPages.find((city) => city.slug === slug);
}

export function getAllCitySlugs(): string[] {
  return cityPages.map((city) => city.slug);
}
