import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import hero4 from "@/assets/hero-4.jpg";
import hero5 from "@/assets/hero-5.jpg";
import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";
import portfolio4 from "@/assets/portfolio-4.jpg";
import portfolio5 from "@/assets/portfolio-5.jpg";
import portfolio6 from "@/assets/portfolio-6.jpg";
import portfolio7 from "@/assets/portfolio-7.jpg";
import portfolio8 from "@/assets/portfolio-8.jpg";
import portfolio9 from "@/assets/portfolio-9.jpg";
import portfolio10 from "@/assets/portfolio-10.jpg";
import portfolio11 from "@/assets/portfolio-11.jpg";
import portfolio12 from "@/assets/portfolio-12.jpg";
import portfolio13 from "@/assets/portfolio-13.jpg";
import portfolio14 from "@/assets/portfolio-14.jpg";
import portfolio15 from "@/assets/portfolio-15.jpg";

export const COMPANY = {
  name: "Florida Decks and Patios",
  phone: "555-238-9102",
  phoneDisplay: "(555) 238-9102",
  email: "hello@floridadecksandpatios.com",
  address: "1425 Oakwood Trail, Suite 200",
  city: "Tampa",
  state: "FL",
  zip: "33601",
  tagline: "Crafting Your Perfect Outdoor Space",
};

export const heroSlides = [
  {
    image: hero1,
    alt: "Expansive wooden deck with outdoor furniture surrounded by lush trees at sunset",
    headline: "Premium Deck Building",
    subheadline: "Handcrafted outdoor living spaces designed to elevate your home and lifestyle.",
  },
  {
    image: hero2,
    alt: "Modern composite deck with string lights and comfortable seating at dusk",
    headline: "Composite Decking Experts",
    subheadline: "Low-maintenance, high-style decking that lasts for decades.",
  },
  {
    image: hero3,
    alt: "Beautiful cedar pergola with stone patio and garden seating area",
    headline: "Pergolas & Patio Design",
    subheadline: "Create the perfect shaded retreat for entertaining and relaxation.",
  },
  {
    image: hero4,
    alt: "Custom outdoor kitchen with built-in grill and bar seating on a modern deck",
    headline: "Outdoor Kitchens & More",
    subheadline: "Full outdoor cooking and entertaining spaces built to impress.",
  },
  {
    image: hero5,
    alt: "Elegant screened porch with ceiling fan and wicker furniture overlooking green lawn",
    headline: "Screened Porches",
    subheadline: "Year-round comfort with protection from the elements.",
  },
];

export const services = [
  {
    slug: "deck-installation",
    title: "Custom Deck Design & Build",
    shortTitle: "Deck Installation",
    icon: "Hammer",
    description: "Tailored designs that match your home's architecture. We build with premium pressure-treated pine or composite materials for lasting beauty.",
    longDescription: `Our custom deck design and build service is the cornerstone of what we do. We begin every project with a thorough consultation to understand your vision, assess your property, and recommend the best materials and design approach.\n\nWhether you want a simple ground-level platform or a multi-tier deck with built-in seating and planters, our licensed team delivers exceptional craftsmanship every time.\n\n**What's Included:**\n- Free on-site consultation and 3D design preview\n- Material selection guidance (pressure-treated pine, cedar, composite)\n- All permitting and HOA coordination\n- Professional installation with structural warranty\n- Post-build walkthrough and care instructions`,
    features: ["3D Design Preview", "Material Guidance", "Permit Handling", "Structural Warranty"],
    priceRange: "$8,000 – $45,000+",
  },
  {
    slug: "deck-repair",
    title: "Deck Repair & Restoration",
    shortTitle: "Deck Repair",
    icon: "Wrench",
    description: "Extend the life of your existing deck. We handle structural repairs, board replacement, and safety inspections to keep your deck safe and beautiful.",
    longDescription: `Don't replace your entire deck when targeted repairs can restore it to like-new condition. Our repair team assesses the structural integrity of your existing deck and provides honest recommendations.\n\nFrom replacing rotted joists and warped boards to re-securing loose railings, we handle it all with the same precision as our new builds.\n\n**Common Repairs:**\n- Rotted or damaged board replacement\n- Structural joist and beam repair\n- Railing tightening and replacement\n- Stair rebuilding\n- Power washing and re-staining`,
    features: ["Safety Inspection", "Board Replacement", "Structural Repair", "Re-staining"],
    priceRange: "$500 – $8,000",
  },
  {
    slug: "composite-decking",
    title: "Composite Decking",
    shortTitle: "Composite Decking",
    icon: "Layers",
    description: "Low-maintenance, high-durability options from top brands. Built to last for decades without the hassle of annual staining.",
    longDescription: `Composite decking offers the beauty of natural wood without the ongoing maintenance. We're certified installers for leading composite brands, ensuring your deck is built to manufacturer specifications.\n\nComposite boards resist fading, staining, scratching, and mold — making them ideal for busy families and anyone who wants to spend time on their deck, not maintaining it.\n\n**Benefits:**\n- No annual staining or sealing required\n- Fade, scratch, and mold resistant\n- 25-50 year manufacturer warranties\n- Wide range of colors and textures\n- Eco-friendly recycled materials available`,
    features: ["25-50 Year Warranty", "No Staining Needed", "Fade Resistant", "Eco-Friendly Options"],
    priceRange: "$12,000 – $55,000+",
  },
  {
    slug: "permits-compliance",
    title: "Permits & Compliance",
    shortTitle: "Permits & Compliance",
    icon: "FileCheck",
    description: "We handle all local permitting, HOA approvals, and building code compliance so you can relax while we manage the paperwork.",
    longDescription: `Navigating building permits and HOA requirements can be stressful. Our team handles the entire process — from pulling permits to scheduling inspections — so you don't have to.\n\nWe stay current on all local building codes and work directly with your HOA to ensure designs meet their guidelines before construction begins.\n\n**We Handle:**\n- Building permit applications\n- HOA design review submissions\n- Code compliance verification\n- Inspection scheduling\n- Final approval documentation`,
    features: ["Permit Filing", "HOA Coordination", "Code Compliance", "Inspection Scheduling"],
    priceRange: "Included with projects",
  },
  {
    slug: "pergolas-patios",
    title: "Pergolas & Patios",
    shortTitle: "Pergolas & Patios",
    icon: "TreePine",
    description: "Create shaded outdoor retreats with custom pergolas, gazebos, and patio installations that complement your landscape.",
    longDescription: `A well-designed pergola or patio extends your living space and adds architectural interest to your backyard. We design and build custom structures using cedar, pressure-treated lumber, vinyl, or aluminum.\n\nFrom freestanding garden pergolas to attached patio covers, we create outdoor spaces that provide shade, beauty, and increased property value.\n\n**Options:**\n- Freestanding or attached pergolas\n- Stone, paver, or stamped concrete patios\n- Retractable shade solutions\n- Integrated lighting and fans\n- Custom dimensions to fit any space`,
    features: ["Custom Sizing", "Multiple Materials", "Integrated Lighting", "Shade Solutions"],
    priceRange: "$5,000 – $30,000+",
  },
  {
    slug: "porches",
    title: "Screened & Open Porches",
    shortTitle: "Porches",
    icon: "Home",
    description: "Extend your living space with a screened-in or open porch. Enjoy the outdoors year-round with protection from bugs and weather.",
    longDescription: `Porches bridge the gap between indoor comfort and outdoor beauty. Whether you prefer an open-air porch for warm evenings or a fully screened enclosure for bug-free relaxation, we build porches that become your favorite room.\n\nOur porches feature quality framing, professional-grade screening, and custom finishing details like beadboard ceilings and ceiling fans.\n\n**Porch Types:**\n- Screened porches with aluminum or wood frames\n- Open covered porches\n- Three-season rooms\n- Porch conversions (open to screened)\n- Multi-level porch designs`,
    features: ["Screened Options", "Ceiling Fans", "Custom Finishes", "Year-Round Use"],
    priceRange: "$10,000 – $40,000+",
  },
  {
    slug: "outdoor-kitchens",
    title: "Outdoor Kitchens",
    shortTitle: "Outdoor Kitchens",
    icon: "ChefHat",
    description: "Full outdoor cooking and entertaining spaces with built-in grills, counters, sinks, and bar seating.",
    longDescription: `Take your entertaining to the next level with a custom outdoor kitchen. We design and build complete cooking spaces featuring built-in grills, refrigeration, sinks, countertops, and storage — all built to withstand the elements.\n\nOur outdoor kitchens are constructed with weather-resistant materials and include proper ventilation, drainage, and utility connections.\n\n**Features Available:**\n- Built-in gas or charcoal grills\n- Granite or concrete countertops\n- Outdoor-rated refrigerators and sinks\n- Bar seating and serving areas\n- Weatherproof cabinetry\n- Gas and electrical hookups`,
    features: ["Built-in Grills", "Stone Countertops", "Bar Seating", "Weather-Resistant"],
    priceRange: "$15,000 – $75,000+",
  },
];

export const portfolioProjects = [
  { id: 1, title: "Lakeside Cedar Deck", category: "Deck Installation", description: "A 600 sq ft cedar deck overlooking a private lake with built-in bench seating and solar post lights.", location: "Tampa, FL", image: portfolio1 },
  { id: 2, title: "Modern Composite Entertaining Space", category: "Composite Decking", description: "Multi-level composite deck with cable railing system and integrated LED step lighting.", location: "St. Petersburg, FL", image: portfolio2 },
  { id: 3, title: "Craftsman Pergola & Patio", category: "Pergolas & Patios", description: "Custom cedar pergola over a 400 sq ft stone paver patio with built-in fire pit.", location: "Clearwater, FL", image: portfolio3 },
  { id: 4, title: "Chef's Outdoor Kitchen", category: "Outdoor Kitchens", description: "Full outdoor kitchen with granite counters, built-in grill, refrigerator, and bar seating for six.", location: "Jacksonville, FL", image: portfolio4 },
  { id: 5, title: "Victorian Screened Porch", category: "Porches", description: "Screened porch with beadboard ceiling, ceiling fan, and custom railing details matching the home's Victorian style.", location: "Boca Raton, FL", image: portfolio5 },
  { id: 6, title: "Backyard Deck Restoration", category: "Deck Repair", description: "Complete restoration of a 15-year-old pressure-treated deck including joist replacement and new composite boards.", location: "West Palm Beach, FL", image: portfolio6 },
  { id: 7, title: "Hillside Multi-Level Deck", category: "Deck Installation", description: "Three-level deck system navigating a steep hillside with spiral staircase and multiple seating areas.", location: "Gainesville, FL", image: portfolio7 },
  { id: 8, title: "Poolside Composite Deck", category: "Composite Decking", description: "Slip-resistant composite decking surrounding a pool area with built-in planter boxes and outdoor shower.", location: "Johns Creek, FL", image: portfolio8 },
  { id: 9, title: "Tropical Sunset Patio", category: "Pergolas & Patios", description: "Spacious paver patio with modern railing and tropical landscaping, perfect for sunset entertaining.", location: "Naples, FL", image: portfolio9 },
  { id: 10, title: "Luxury Screened Lanai", category: "Porches", description: "Elegant screened-in porch with vaulted ceiling, ceiling fan, and lush tropical garden views.", location: "Sarasota, FL", image: portfolio10 },
  { id: 11, title: "Gourmet Outdoor Kitchen", category: "Outdoor Kitchens", description: "Full outdoor kitchen with stainless steel appliances, granite counters, and bar seating on a composite deck.", location: "Fort Lauderdale, FL", image: portfolio11 },
  { id: 12, title: "Pergola & Patio Retreat", category: "Pergolas & Patios", description: "Custom wooden pergola with string lighting over a natural stone patio with outdoor dining and lounge areas.", location: "Orlando, FL", image: portfolio12 },
  { id: 13, title: "Waterfront Dock Deck", category: "Deck Installation", description: "Premium composite decking extending to a private boat dock with cable railing and panoramic water views.", location: "Cape Coral, FL", image: portfolio13 },
  { id: 14, title: "Resort-Style Pool Deck", category: "Composite Decking", description: "Paver and composite pool deck with lounge area, tropical plants, and spa surround in a resort-style layout.", location: "Miami, FL", image: portfolio14 },
  { id: 15, title: "Tropical Sunset Lounge Deck", category: "Deck Installation", description: "Elevated hardwood deck with modern lounge furniture, palm tree landscaping, and stunning sunset views.", location: "Key West, FL", image: portfolio15 },
];

export const blogPosts = [
  {
    slug: "pressure-treated-vs-composite",
    title: "Pressure-Treated vs. Composite: Which Decking Is Right for You?",
    excerpt: "Choosing between pressure-treated wood and composite decking? We break down cost, durability, maintenance, and aesthetics to help you decide.",
    date: "2026-01-15",
    category: "Materials",
    content: `Choosing the right decking material is one of the most important decisions you'll make for your outdoor project. Let's compare the two most popular options.\n\n## Pressure-Treated Wood\n\nPressure-treated lumber has been the go-to decking material for decades. It's affordable, widely available, and naturally strong.\n\n**Pros:**\n- Lower upfront cost ($15–25 per sq ft installed)\n- Natural wood appearance\n- Easy to cut and work with\n- Can be stained any color\n\n**Cons:**\n- Requires annual maintenance (staining/sealing)\n- Prone to warping, splitting, and rot over time\n- Shorter lifespan (10–15 years without diligent care)\n\n## Composite Decking\n\nComposite boards are made from a blend of wood fibers and plastic polymers. They mimic the look of natural wood without the maintenance.\n\n**Pros:**\n- Virtually maintenance-free\n- 25–50 year warranties\n- Resistant to rot, insects, and fading\n- Consistent appearance over time\n\n**Cons:**\n- Higher upfront cost ($30–60 per sq ft installed)\n- Can retain heat in direct sun\n- Limited ability to refinish\n\n## Our Recommendation\n\nFor most homeowners, composite decking offers the best long-term value. While the initial investment is higher, the savings on maintenance products and labor over 20+ years typically make composite the more economical choice.\n\nHowever, if budget is your primary concern and you're comfortable with annual upkeep, pressure-treated wood delivers excellent results at a lower price point.\n\n*Contact us for a free material consultation tailored to your specific project and budget.*`,
  },
  {
    slug: "deck-maintenance-seasonal-guide",
    title: "The Complete Seasonal Deck Maintenance Guide",
    excerpt: "Keep your deck in top shape year-round with this seasonal maintenance checklist for both wood and composite decks.",
    date: "2026-01-08",
    category: "Maintenance",
    content: `Regular maintenance extends your deck's life and keeps it looking great. Here's what to do each season.\n\n## Spring\n\n- **Inspect** all boards, railings, and stairs for winter damage\n- **Clean** with a deck-specific cleaner and soft brush\n- **Power wash** on low setting (max 1500 PSI for wood)\n- **Check** for loose screws or nails and tighten/replace\n- **Re-stain or seal** wood decks if the water bead test fails\n\n## Summer\n\n- **Sweep** regularly to prevent debris buildup\n- **Move** planters periodically to prevent moisture trapping\n- **Clean** grill drippings promptly to prevent staining\n- **Trim** vegetation growing near or under the deck\n\n## Fall\n\n- **Clear leaves** promptly — wet leaves stain and trap moisture\n- **Clean gutters** above the deck to prevent water runoff damage\n- **Apply** a fresh coat of water repellent on wood decks\n- **Store** or cover outdoor furniture\n\n## Winter\n\n- **Remove snow** with a plastic shovel (never metal)\n- **Avoid** salt-based ice melt on wood decks\n- **Use** calcium chloride for composite decks if needed\n- **Check** for ice dams under the deck\n\n*Following this schedule can add 5–10 years to your deck's lifespan.*`,
  },
  {
    slug: "how-much-does-deck-cost",
    title: "How Much Does a New Deck Cost in 2026?",
    excerpt: "A transparent breakdown of deck building costs including materials, labor, permits, and common add-ons.",
    date: "2025-12-20",
    category: "Cost Guide",
    content: `Understanding deck costs helps you budget effectively and avoid surprises. Here's a comprehensive breakdown for 2026.\n\n## Average Costs by Material\n\n| Material | Cost per Sq Ft (installed) | 300 Sq Ft Deck |\n|----------|---------------------------|----------------|\n| Pressure-Treated | $15–25 | $4,500–7,500 |\n| Cedar | $25–35 | $7,500–10,500 |\n| Composite | $30–60 | $9,000–18,000 |\n| Hardwood (Ipe) | $40–75 | $12,000–22,500 |\n\n## Additional Cost Factors\n\n- **Height & access**: Elevated decks cost 20–40% more\n- **Shape complexity**: Curved or multi-level adds 15–30%\n- **Railings**: $20–100 per linear foot depending on material\n- **Stairs**: $75–200 per step\n- **Permits**: $200–2,000 depending on municipality\n- **Design & engineering**: $500–2,500 for complex projects\n\n## Ways to Manage Costs\n\n1. Build during the off-season (fall/winter) for potential discounts\n2. Keep the design simple — rectangle decks cost less than custom shapes\n3. Use composite for the deck surface but pressure-treated for the substructure\n4. Phase the project — build the deck now, add the pergola next year\n\n*Get an accurate estimate for your specific project with our free on-site consultation.*`,
  },
  {
    slug: "do-i-need-permit-for-deck",
    title: "Do I Need a Permit to Build a Deck? Here's What You Should Know",
    excerpt: "Permit requirements vary by location. Learn when you need one, what happens without it, and how we handle the process.",
    date: "2025-12-10",
    category: "Permits",
    content: `Building permits are required for most deck projects, but the specifics depend on your location and project scope.\n\n## When You Typically Need a Permit\n\n- Decks higher than 30 inches above grade\n- Decks attached to the house\n- Any deck over 200 square feet\n- Decks with electrical or plumbing\n- Covered structures (roofed porches, pergolas in some areas)\n\n## When You Might Not Need One\n\n- Ground-level, freestanding decks under 200 sq ft\n- Replacement of existing deck boards (no structural changes)\n- Minor repairs\n\n## What Happens Without a Permit?\n\n- Fines ranging from $500 to $10,000+\n- Required removal or rebuild to code\n- Issues when selling your home (inspectors will flag it)\n- Voided homeowner's insurance coverage for deck-related claims\n\n## How We Handle Permits\n\nOur team manages the entire permitting process:\n1. We prepare all required drawings and specifications\n2. We submit the application and pay fees on your behalf\n3. We schedule and attend all required inspections\n4. We provide you with final approval documentation\n\n*Permits are included with all our full-service projects at no additional charge.*`,
  },
  {
    slug: "best-deck-design-trends-2026",
    title: "Top Deck Design Trends for 2026",
    excerpt: "From mixed materials to outdoor living rooms, discover the design trends shaping outdoor spaces this year.",
    date: "2025-11-28",
    category: "Design",
    content: `Deck design continues to evolve with homeowner priorities shifting toward outdoor living functionality. Here are the top trends we're seeing in 2026.\n\n## 1. Mixed Material Palettes\n\nCombining composite decking with natural stone, metal railings, and wood accents creates visual depth and architectural interest. This "curated" look is replacing the monochrome decks of years past.\n\n## 2. Outdoor Living Rooms\n\nDecks are being designed as true extensions of the home with defined zones for cooking, dining, lounging, and even working from home. Built-in furniture and area rugs create room-like boundaries.\n\n## 3. Low-Profile & Ground-Level Designs\n\nMinimalist ground-level decks that flow seamlessly from interior floors are increasingly popular. They blur the line between indoor and outdoor spaces and often don't require permits.\n\n## 4. Integrated Technology\n\nSmart lighting, built-in Bluetooth speakers, motorized pergola louvers, and USB charging stations are becoming standard requests rather than luxury add-ons.\n\n## 5. Sustainable & Recycled Materials\n\nEco-conscious homeowners are choosing composite boards made from recycled materials, responsibly sourced lumber, and low-VOC finishes.\n\n## 6. Bold Color Choices\n\nWhile gray and brown remain popular, more homeowners are choosing warm tones like pecan, mahogany, and even black decking for a modern dramatic look.\n\n*Ready to incorporate these trends into your project? Schedule a design consultation today.*`,
  },
  {
    slug: "pergola-vs-gazebo-vs-pavilion",
    title: "Pergola vs. Gazebo vs. Pavilion: Which Shade Structure Is Best?",
    excerpt: "Understanding the differences between outdoor shade structures helps you choose the right one for your space and budget.",
    date: "2025-11-15",
    category: "Design",
    content: `All three structures add beauty and function to your backyard, but they serve different purposes. Let's break down the differences.\n\n## Pergola\n\nAn open-roof structure with cross beams that provide partial shade. Can be freestanding or attached to a house.\n\n- **Best for**: Defining outdoor spaces, growing vines, partial shade\n- **Cost**: $3,000–$15,000\n- **Shade**: 30–60% (can be increased with fabric, louvers, or vines)\n- **Permits**: Usually required if attached to home\n\n## Gazebo\n\nA freestanding, fully roofed structure, typically octagonal or round with open sides.\n\n- **Best for**: Garden focal points, complete weather protection\n- **Cost**: $5,000–$25,000\n- **Shade**: 100% under the roof\n- **Permits**: Almost always required\n\n## Pavilion\n\nA rectangular, fully roofed structure supported by posts with completely open sides.\n\n- **Best for**: Outdoor kitchens, large entertaining areas, pool houses\n- **Cost**: $8,000–$40,000\n- **Shade**: 100% under the roof\n- **Permits**: Always required\n\n## Our Recommendation\n\nFor most residential backyards, a pergola offers the best balance of aesthetics, flexibility, and cost. If you need full weather protection, a pavilion provides more usable space than a gazebo for the same footprint.\n\n*Not sure which is right for your space? Book a free consultation and we'll help you decide.*`,
  },
  {
    slug: "increase-home-value-outdoor-space",
    title: "How Outdoor Living Spaces Increase Your Home's Value",
    excerpt: "Quality outdoor improvements offer some of the best returns on investment. Here's what the data shows.",
    date: "2025-11-01",
    category: "Investment",
    content: `Investing in outdoor living spaces isn't just about enjoyment — it's a smart financial move. Here's what the latest data shows about return on investment.\n\n## ROI by Project Type\n\n| Project | Average Cost | Average ROI |\n|---------|-------------|-------------|\n| Wood Deck | $16,000 | 65–75% |\n| Composite Deck | $22,000 | 60–70% |\n| Patio | $6,000 | 50–65% |\n| Outdoor Kitchen | $25,000 | 55–75% |\n| Screened Porch | $20,000 | 70–80% |\n\n## Why Outdoor Spaces Add Value\n\n1. **Expanded living area**: Buyers see decks and patios as additional square footage\n2. **Curb appeal**: Well-designed outdoor spaces create strong first impressions\n3. **Lifestyle appeal**: Post-pandemic, outdoor spaces rank in buyers' top 3 priorities\n4. **Differentiation**: Homes with quality outdoor spaces sell faster than comparable homes without\n\n## Maximizing Your ROI\n\n- **Use quality materials** that will still look good at resale time\n- **Keep designs timeless** rather than overly trendy\n- **Ensure proper permitting** — unpermitted work devalues a home\n- **Maintain regularly** — a neglected deck hurts more than helps\n- **Add lighting** — it's low cost but dramatically improves perceived value\n\n*Our design team considers resale value in every project we plan. Let's build something that pays you back.*`,
  },
  {
    slug: "choosing-right-deck-railing",
    title: "A Homeowner's Guide to Choosing the Right Deck Railing",
    excerpt: "Deck railings impact both safety and aesthetics. Compare wood, metal, cable, glass, and composite options.",
    date: "2025-10-18",
    category: "Materials",
    content: `Your railing choice dramatically affects your deck's appearance and safety. Here's a comparison of the most popular options.\n\n## Wood Railings\n\n- **Look**: Classic, traditional\n- **Cost**: $20–40/linear ft installed\n- **Maintenance**: High — requires staining/sealing every 1–2 years\n- **Best for**: Budget-friendly projects, traditional home styles\n\n## Aluminum Railings\n\n- **Look**: Clean, modern lines\n- **Cost**: $40–80/linear ft installed\n- **Maintenance**: Virtually none\n- **Best for**: Low-maintenance, modern or transitional styles\n\n## Cable Railings\n\n- **Look**: Open, contemporary, preserves views\n- **Cost**: $60–120/linear ft installed\n- **Maintenance**: Occasional tension adjustment\n- **Best for**: Scenic properties, modern architecture\n\n## Glass Panel Railings\n\n- **Look**: Invisible, unobstructed views\n- **Cost**: $100–200/linear ft installed\n- **Maintenance**: Regular cleaning\n- **Best for**: Premium properties, waterfront views\n\n## Composite Railings\n\n- **Look**: Matches composite decking, varied styles\n- **Cost**: $30–60/linear ft installed\n- **Maintenance**: Minimal — occasional cleaning\n- **Best for**: Matching composite deck systems\n\n## Code Requirements\n\nRegardless of material, most building codes require:\n- Railings on any deck 30+ inches above grade\n- Minimum height of 36 inches (42 inches for commercial)\n- Balusters spaced no more than 4 inches apart\n- Must withstand 200 lbs of force\n\n*We help you choose the perfect railing system during your design consultation.*`,
  },
];

export const testimonials = [
  {
    name: "Sarah M.",
    location: "Roswell, GA",
    text: "They transformed our backyard into an outdoor oasis. The composite deck is beautiful and we love that it requires zero maintenance. Highly recommend!",
    rating: 5,
    note: "Sample testimonial for demonstration purposes",
  },
  {
    name: "James & Linda K.",
    location: "Alpharetta, GA",
    text: "Professional from start to finish. They handled all the permits and HOA paperwork, which was a huge relief. The deck looks even better than the 3D preview they showed us.",
    rating: 5,
    note: "Sample testimonial for demonstration purposes",
  },
  {
    name: "David R.",
    location: "Marietta, GA",
    text: "Our outdoor kitchen has completely changed how we entertain. The quality of materials and craftsmanship is outstanding. Worth every penny.",
    rating: 5,
    note: "Sample testimonial for demonstration purposes",
  },
];

export const trustBadges = [
  { icon: "Shield", title: "Licensed & Insured", text: "Fully licensed and insured for your protection" },
  { icon: "Award", title: "5-Year Workmanship Warranty", text: "We stand behind every project we build" },
  { icon: "FileCheck", title: "Permit & HOA Experts", text: "We handle all the paperwork for you" },
  { icon: "Users", title: "Local Crew", text: "Experienced local craftsmen who care about your community" },
];
