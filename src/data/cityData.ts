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
  cityMultiplier: number;
  cityMultiplierLabel: string;
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
    metaDescription: "Build a custom Tampa deck designed for 2026 climate trends. Get real-time Hillsborough/Pasco permit links, current wood vs. composite cost-per-sq-ft ($45-$110), and expert tips for humidity-resistant outdoor living.",
    focusKeyword: "deck builder Tampa",
    heroHeadline: "Tampa Bay's Trusted Deck & Patio Experts",
    heroSubheadline: "Custom outdoor living spaces engineered for Tampa's climate — built to FBC standards with hurricane-rated hardware.",
    permitLink: "https://www.hillsboroughcounty.org/en/residents/property-owners-and-renters/building-permits",
    permitDepartment: "Hillsborough County Building Services",
    cityMultiplier: 1.0,
    cityMultiplierLabel: "Standard Appraisal Lift for Master-Planned Communities",
    permitPhone: "(813) 272-5600",
    climateProfile: {
      primary: "Subtropical humidity with intense summer heat",
      humidity: "74% average annual humidity",
      uvIndex: "UV index 9–11 from April through October",
      saltAir: false,
      hurricaneZone: "Wind Zone 130 mph design speed",
      annualRainfall: "52 inches, concentrated June–September",
      climateAdvice: "Tampa Bay's high humidity in Pasco and Hillsborough counties leads to rapid algae growth on wood surfaces, creating dangerous slippery conditions. Composite decking with built-in mold inhibitors is strongly recommended to avoid both slip hazards and wood rot. Pressure-treated pine in Tampa typically shows visible mold within 6–8 months without treatment. Choose lighter colors to reduce surface heat — Tampa afternoon temperatures regularly exceed 95°F from May through September, and dark composite boards can reach 160°F in direct sun.",
    },
    costData: {
      pressureTreatedPerSqFt: "$45–$85",
      compositePerSqFt: "$60–$90",
      premiumCompositePerSqFt: "$90–$110",
      laborRatePerSqFt: "$15–$22",
      permitFeeBasic: "$200–$400",
      permitFeeComplex: "$500–$800",
      avgProjectTotal: "$13,500–$27,500",
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
      permitUnder100: "In most of Tampa Bay, a permit is required if the deck is attached to the house or higher than 30 inches above grade. Freestanding, ground-level decks under 200 sq ft may be exempt, but always verify with Hillsborough County Building Services or Pasco County Building Services, as rules differ for properties in flood zones or HOA communities.",
      avgCostPerSqFt: "The 2026 average cost per square foot for a composite deck in Tampa Bay is $60–$90 installed, including corrosion-resistant hardware and standard railings. High demand in master-planned communities like Wesley Chapel pushes averages higher than the state norm. Premium composite lines run $90–$110+ per square foot.",
      woodDeckLifespan: "In Tampa's subtropical climate with 74% average humidity and UV index regularly exceeding 10, untreated pressure-treated wood decks typically last 10–15 years. With diligent annual maintenance (30–40 hours of sanding, staining, and mold treatment), you can reach the upper range. Composite decks in Tampa last 25–50 years with only 2–4 hours of annual soap-and-water maintenance.",
    },
    materialDurability: {
      pressureTreated: { lifespan: "10–15 years", maintenanceHours: "30–40 hrs/year" },
      composite: { lifespan: "25–50 years", maintenanceHours: "2–4 hrs/year" },
      pvc: { lifespan: "30–50 years", maintenanceHours: "1–3 hrs/year" },
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
    metaDescription: "Explore Orlando's 2026 deck building guide. Navigate Orange County zoning laws easily with our local permit hub. See why capped composite is the 'Sustainable Growth' leader for Central Florida sun and UV protection.",
    focusKeyword: "deck builder Orlando",
    heroHeadline: "Orlando's Expert Deck & Patio Builders",
    heroSubheadline: "Family-friendly outdoor spaces designed for Central Florida's year-round lifestyle — permitted and built to code in Orange County.",
    permitLink: "https://www.orangecountyfl.net/BuildingPermitting.aspx",
    permitDepartment: "Orange County Building Division",
    cityMultiplier: 1.03,
    cityMultiplierLabel: "+3% Outdoor Living Bonus",
    permitPhone: "(407) 836-5540",
    climateProfile: {
      primary: "Inland subtropical with heavy summer rainfall",
      humidity: "72% average annual humidity",
      uvIndex: "UV index 8–10 from March through November",
      saltAir: false,
      hurricaneZone: "Wind Zone 130 mph design speed",
      annualRainfall: "54 inches, with afternoon thunderstorms daily June–September",
      climateAdvice: "Orlando's intense central Florida sun causes rapid UV degradation of untreated wood, leading to 'silvering' and surface cracking within 1–2 seasons. Capped composites are essential to prevent fading and maintain appearance. With 54 inches of annual rainfall and daily afternoon thunderstorms during summer, proper drainage under and around your deck is critical. Orlando doesn't face salt air corrosion like coastal cities, which makes standard galvanized hardware acceptable — saving 15–20% on fastener costs vs. coastal projects.",
    },
    costData: {
      pressureTreatedPerSqFt: "$40–$80",
      compositePerSqFt: "$55–$80",
      premiumCompositePerSqFt: "$80–$100",
      laborRatePerSqFt: "$12–$18",
      permitFeeBasic: "$150–$350",
      permitFeeComplex: "$400–$600",
      avgProjectTotal: "$12,000–$20,000",
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
      permitUnder100: "In Orange County, decks under 120 sq ft may only require a Zoning Permit rather than a full building permit, provided they meet specific setback requirements. Any deck attached to your home requires a full building permit regardless of size. Check with the Orange County Building Division or City of Orlando Permitting for Fast Track options.",
      avgCostPerSqFt: "The 2026 average cost per square foot for a composite deck in Orlando is $55–$80 installed. Urban infill projects in areas like Lake Nona and Horizon West average $40–$80/sq ft for pressure-treated wood and $55–$100/sq ft for standard composite. Orlando's inland location eliminates marine-grade hardware costs, keeping prices below coastal markets.",
      woodDeckLifespan: "In Orlando's inland Central Florida climate, pressure-treated wood decks typically last 10–15 years with proper maintenance including 30–40 hours annually of sanding and staining. The intense daily rain-then-sun cycle during summer creates ideal conditions for mold, wood rot, and UV 'silvering.' Composite decks in Orlando last 25–50 years with only 2–4 hours of annual soap-and-water cleaning.",
    },
    materialDurability: {
      pressureTreated: { lifespan: "10–15 years", maintenanceHours: "30–40 hrs/year" },
      composite: { lifespan: "25–50 years", maintenanceHours: "2–4 hrs/year" },
      pvc: { lifespan: "30–50 years", maintenanceHours: "1–3 hrs/year" },
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
    metaDescription: "The Sarasota authority for salt-air durable decks. Get 2026 pricing on 316-grade stainless hardware and premium PVC. Access Sarasota County V-Zone permit requirements and high-ROI coastal material reports.",
    focusKeyword: "deck builder Sarasota",
    heroHeadline: "Sarasota's Premium Outdoor Living Specialists",
    heroSubheadline: "Luxury decks and outdoor spaces built with salt-air resistant materials — engineered for Sarasota's coastal climate and lifestyle.",
    permitLink: "https://www.scgov.net/government/building-permits",
    permitDepartment: "Sarasota County Building Department",
    cityMultiplier: 1.05,
    cityMultiplierLabel: "+5% Coastal Premium",
    permitPhone: "(941) 861-6151",
    climateProfile: {
      primary: "Coastal subtropical with significant salt air exposure",
      humidity: "76% average annual humidity",
      uvIndex: "UV index 9–11 from March through November",
      saltAir: true,
      hurricaneZone: "Wind Zone 140 mph design speed (coastal areas to 150+ mph)",
      annualRainfall: "56 inches with intense gulf storm surges",
      climateAdvice: "Sarasota's salt air is the most aggressive material degrader on Florida's Gulf Coast. Properties within 5 miles of the beach require 316 marine-grade stainless steel for all fasteners and connectors — standard galvanized hardware will show corrosion within 12–18 months and can lead to structural failure. Coastal 'V-Zone' regulations often require engineered plans for decks to ensure they can withstand storm surges. PVC and capped composite decking are strongly recommended over wood; Ipe or high-end PVC decks often exceed $120/sq ft due to specialty hardware required for salt-air resistance.",
    },
    costData: {
      pressureTreatedPerSqFt: "$28–$38",
      compositePerSqFt: "$60–$85",
      premiumCompositePerSqFt: "$85–$120",
      laborRatePerSqFt: "$18–$25",
      permitFeeBasic: "$250–$500",
      permitFeeComplex: "$600–$1,000",
      avgProjectTotal: "$18,000–$36,000",
      engineeringRequired: "Usually required — engineer stamp for coastal V-Zone projects",
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
      permitUnder100: "In Sarasota County, coastal 'V-Zone' regulations often require engineered plans for decks to ensure they can withstand storm surges. Even small freestanding decks under 100 sq ft may need a permit if located in a flood zone, velocity zone, or within the coastal construction control line. Virtually all deck construction in Sarasota County requires a permit due to the coastal wind zone designation.",
      avgCostPerSqFt: "The 2026 average cost per square foot for a composite deck in Sarasota is $60–$85 installed. Sarasota's premium lifestyle market drives higher costs due to mandatory 316-grade stainless steel hardware, deeper engineered footings, and V-Zone wind-load engineering requirements. Ipe or high-end PVC decks often exceed $120/sq ft due to specialty hardware required for salt-air resistance.",
      woodDeckLifespan: "In Sarasota's coastal environment with salt air, 76% humidity, and intense UV, pressure-treated wood decks typically last only 8–12 years even with aggressive annual maintenance of 30–40 hours. The salt spray corrodes standard fasteners rapidly and accelerates wood decay. Only 316-grade stainless steel hardware should be used to prevent structural failure. Composite or PVC decking lasts 25–50 years with only 2–4 hours of annual care.",
    },
    materialDurability: {
      pressureTreated: { lifespan: "8–12 years", maintenanceHours: "30–40 hrs/year" },
      composite: { lifespan: "25–50 years", maintenanceHours: "2–4 hrs/year" },
      pvc: { lifespan: "30–50 years", maintenanceHours: "1–3 hrs/year" },
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
    metaDescription: "Maximize your St. Johns home value with a professional 2026 deck build. Compare local Jacksonville costs ($38-$95/sq-ft) and download our durability report on preventing wood warp in coastal Florida temperatures.",
    focusKeyword: "deck builder Jacksonville",
    heroHeadline: "Jacksonville's Durable Deck & Patio Builders",
    heroSubheadline: "Military-family-friendly deck building with maximum ROI — engineered for Northeast Florida's climate and built to last.",
    permitLink: "https://jaxepics.coj.net",
    permitDepartment: "City of Jacksonville Building Inspection Division",
    cityMultiplier: 1.0,
    cityMultiplierLabel: "Standard Appraisal Lift",
    permitPhone: "(904) 255-7800",
    climateProfile: {
      primary: "Northern subtropical with moderate coastal influence",
      humidity: "71% average annual humidity",
      uvIndex: "UV index 7–10 from March through October",
      saltAir: true,
      hurricaneZone: "Wind Zone 120–130 mph design speed",
      annualRainfall: "50 inches with distinct wet/dry seasons",
      climateAdvice: "Jacksonville's fluctuating coastal temperatures cause wood to expand and contract, leading to warping, split boards, and loosened fasteners over time. Composite decking provides better dimensional stability and resists this thermal cycling. Coastal Duval County properties (Jacksonville Beach, Neptune Beach, Atlantic Beach) still require salt-air rated 316-grade stainless steel hardware, but inland Jacksonville and St. Johns County projects can use standard galvanized fasteners — saving 15–20% on hardware costs.",
    },
    costData: {
      pressureTreatedPerSqFt: "$38–$75",
      compositePerSqFt: "$50–$75",
      premiumCompositePerSqFt: "$75–$95",
      laborRatePerSqFt: "$10–$16",
      permitFeeBasic: "$150–$350",
      permitFeeComplex: "$400–$600",
      avgProjectTotal: "$11,400–$19,000",
      engineeringRequired: "Required for attached structures or elevated decks in coastal zone",
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
      permitUnder100: "In Jacksonville, a permit is mandatory for any deck attached to a primary structure or exceeding 30 inches in height. Freestanding, ground-level decks under 200 sq ft may be exempt. If your property is in St. Johns County or a coastal flood zone, different thresholds may apply. Always verify with the City of Jacksonville JAXEPICS portal or St. Johns County Building Services.",
      avgCostPerSqFt: "The 2026 average cost per square foot for a composite deck in Jacksonville is $50–$75 installed — a competitive market for military families. Jacksonville's lower labor rates and inland location (for non-beach properties) reduce costs by 10–15% compared to Tampa or Sarasota. Premium composite runs $75–$95 per square foot.",
      woodDeckLifespan: "In Jacksonville's North Florida climate, pressure-treated wood decks typically last 10–15 years with 30–40 hours of annual maintenance (sanding and staining). Jacksonville's fluctuating coastal temperatures cause wood to expand and contract, leading to warping over time. Composite provides better ROI as it resists this warping while lasting 25–50 years with minimal care.",
    },
    materialDurability: {
      pressureTreated: { lifespan: "10–15 years", maintenanceHours: "30–40 hrs/year" },
      composite: { lifespan: "25–50 years", maintenanceHours: "2–4 hrs/year" },
      pvc: { lifespan: "30–50 years", maintenanceHours: "1–3 hrs/year" },
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
    cityMultiplier: 1.0,
    cityMultiplierLabel: "Standard ROI",
    permitPhone: "(352) 438-2400",
    climateProfile: {
      primary: "Inland north-central subtropical with moderate conditions",
      humidity: "70% average annual humidity",
      uvIndex: "UV index 7–10 from April through October",
      saltAir: false,
      hurricaneZone: "Wind Zone 115–120 mph design speed (lower than coastal)",
      annualRainfall: "50 inches with typical Florida summer rain pattern",
      climateAdvice: "Ocala's inland location means no salt air exposure, but inland humidity fosters significant Formosan termite activity — pressure-treated wood or inorganic composite is a must for ground-level additions. Standard galvanized hardware works perfectly, saving 20–30% on fastener costs compared to coastal projects. Wind load requirements are lower than coastal counties (115–120 mph vs. 140–150 mph), simplifying engineering and reducing material costs. Ocala's well-drained sandy soil is ideal for standard concrete footings without helical piers.",
    },
    costData: {
      pressureTreatedPerSqFt: "$35–$70",
      compositePerSqFt: "$45–$65",
      premiumCompositePerSqFt: "$65–$85",
      laborRatePerSqFt: "$9–$14",
      permitFeeBasic: "$100–$250",
      permitFeeComplex: "$300–$500",
      avgProjectTotal: "$7,500–$14,000",
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
      permitUnder100: "In Marion County, smaller rural decks under 200 sq ft that are unattached may be exempt from some building permits, but always require a zoning review. Attached decks of any size require a full building permit. Marion County's permitting process is generally faster and less expensive than coastal counties — expect 1–2 weeks for approval on standard projects.",
      avgCostPerSqFt: "The 2026 average cost per square foot for a composite deck in Ocala is $45–$65 installed — the best affordability for new builds in Florida. Ocala's inland location eliminates marine-grade hardware costs, lower wind zone ratings reduce engineering requirements, and competitive labor rates keep installation costs down. A quality 300 sq ft composite deck in Ocala can be built for under $14,000.",
      woodDeckLifespan: "In Ocala's inland North Central Florida climate, pressure-treated wood decks can last 10–15 years with 30–40 hours of annual maintenance. The absence of salt air slows corrosion, but inland humidity fosters Formosan termite activity — pressure-treated or inorganic composite materials are essential for ground-level additions. Composite decks last 25–50 years with only 2–4 hours of annual care.",
    },
    materialDurability: {
      pressureTreated: { lifespan: "10–15 years", maintenanceHours: "30–40 hrs/year" },
      composite: { lifespan: "25–50 years", maintenanceHours: "2–4 hrs/year" },
      pvc: { lifespan: "30–50 years", maintenanceHours: "1–2 hrs/year" },
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
