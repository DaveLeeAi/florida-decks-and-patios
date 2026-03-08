export interface ChecklistItem {
  text: string;
  detail?: string;
}

export interface ChecklistSection {
  title: string;
  items: ChecklistItem[];
}

export interface Checklist {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  color: string;
  sections: ChecklistSection[];
  footer: string;
}

export const checklists: Checklist[] = [
  {
    id: "deck-inspection",
    title: "Deck Inspection Checklist",
    subtitle: "Complete 47-Point Home Deck Safety Audit",
    description: "Use this professional-grade checklist to evaluate your deck's structural integrity, safety compliance, and maintenance needs before calling a contractor.",
    icon: "ClipboardCheck",
    color: "primary",
    sections: [
      {
        title: "Structural Foundation",
        items: [
          { text: "Check all footings for cracking, heaving, or settling", detail: "Look for gaps between post base and footing surface" },
          { text: "Verify post-to-footing connections are intact", detail: "Simpson PBS/ABU brackets should show no rust or looseness" },
          { text: "Inspect concrete footings for spalling or erosion" },
          { text: "Confirm footings extend below frost line (12\" min in FL)" },
          { text: "Check for standing water around footings after rain" },
          { text: "Verify footing diameter meets code (min 12\" diameter)" },
        ],
      },
      {
        title: "Posts & Beams",
        items: [
          { text: "Check all posts for rot at ground contact point", detail: "Probe with screwdriver — penetration > ¼\" indicates decay" },
          { text: "Verify posts are plumb (use level on two faces)" },
          { text: "Inspect post-to-beam connections for hardware integrity" },
          { text: "Check beams for sagging, cracking, or splitting" },
          { text: "Look for insect damage (mud tubes, bore holes, frass)" },
          { text: "Confirm notched posts don't exceed 50% notch depth" },
          { text: "Verify beam splices occur over posts, not mid-span" },
        ],
      },
      {
        title: "Joists & Decking",
        items: [
          { text: "Check joist spacing (16\" O.C. standard, 12\" for diagonal)" },
          { text: "Inspect joist hangers — all nail holes filled, no rust" },
          { text: "Look for bouncy or soft spots indicating joist failure" },
          { text: "Verify blocking/bridging at spans over 8 feet" },
          { text: "Check decking fasteners — popped nails, stripped screws" },
          { text: "Inspect deck boards for warping, cupping, or splitting" },
          { text: "Test deck board spacing (⅛\" gap for drainage)" },
          { text: "Look for mold/mildew growth between boards" },
        ],
      },
      {
        title: "Ledger Board & House Attachment",
        items: [
          { text: "Inspect ledger board flashing — no gaps, properly lapped", detail: "Z-flashing must tuck under siding and over ledger" },
          { text: "Verify lag bolts/through-bolts at 16\" O.C. staggered" },
          { text: "Check for water staining on interior wall behind ledger" },
          { text: "Confirm ledger is attached to rim joist, not just siding" },
          { text: "Look for sealant failure at bolt penetrations" },
          { text: "Verify no gaps between ledger and house framing" },
        ],
      },
      {
        title: "Railings & Guards",
        items: [
          { text: "Test railing height (36\" min residential, 42\" commercial)", detail: "Measure from deck surface to top of rail cap" },
          { text: "Perform 200-lb lateral load test on railing posts" },
          { text: "Check baluster spacing with 4\" sphere test", detail: "A 4\" ball must not pass through any opening" },
          { text: "Inspect post-to-deck connections for wobble" },
          { text: "Verify no climbable horizontal rails (ladder effect)" },
          { text: "Check metal railings for rust, loose welds, or corrosion" },
          { text: "Confirm gates on elevated decks are self-closing/latching" },
        ],
      },
      {
        title: "Stairs & Steps",
        items: [
          { text: "Verify uniform riser height (max 7¾\", ⅜\" variance)" },
          { text: "Check tread depth (min 10\" nose to nose)" },
          { text: "Confirm stair width (min 36\")" },
          { text: "Inspect stringer connections at top and bottom" },
          { text: "Test handrail graspability (1¼\" to 2\" diameter)" },
          { text: "Verify handrail height (34\"–38\" measured from stair nose)" },
          { text: "Check stair lighting adequacy for night use" },
        ],
      },
      {
        title: "Hurricane & Wind Resistance (Florida-Specific)",
        items: [
          { text: "Verify hurricane tie/clip connectors at every joist-to-beam", detail: "Simpson H2.5A or equivalent required in HVHZ" },
          { text: "Check hold-down hardware at post-to-footing connections" },
          { text: "Confirm continuous load path from deck to foundation" },
          { text: "Inspect for missing or damaged uplift connectors" },
          { text: "Verify fastener schedule meets FBC wind speed requirements" },
          { text: "Check roof-to-deck attachment if pergola/cover present" },
        ],
      },
    ],
    footer: "This checklist is for informational purposes only and does not replace a licensed inspector's evaluation. Florida Building Code requirements may vary by jurisdiction. Contact Florida Decks & Patios for a professional assessment.",
  },
  {
    id: "permit-checklist",
    title: "Deck Permit Application Checklist",
    subtitle: "Everything You Need Before Applying for a Florida Deck Permit",
    description: "Don't waste trips to the building department. This checklist ensures you have every document, drawing, and form ready for a smooth permit application.",
    icon: "FileCheck",
    color: "amber",
    sections: [
      {
        title: "Property Documentation",
        items: [
          { text: "Property survey (dated within last 5 years preferred)" },
          { text: "Proof of ownership (deed or tax record)" },
          { text: "HOA approval letter (if applicable)", detail: "Some HOAs require architectural review board approval" },
          { text: "Existing site plan showing property boundaries" },
          { text: "Flood zone determination (FEMA map or elevation certificate)" },
          { text: "Previous permit history for the property" },
        ],
      },
      {
        title: "Site Plan Requirements",
        items: [
          { text: "Drawn to scale (1/4\" = 1' or 1/8\" = 1' typical)" },
          { text: "Show all property lines with dimensions" },
          { text: "Mark all setback distances (front, side, rear)" },
          { text: "Include location of existing structures, driveways, wells, septic" },
          { text: "Show proposed deck footprint with dimensions" },
          { text: "Mark easements, rights-of-way, and utility locations" },
          { text: "Include compass orientation (North arrow)" },
          { text: "Note lot coverage percentage (existing + proposed)" },
        ],
      },
      {
        title: "Construction Drawings",
        items: [
          { text: "Floor plan/deck layout with all dimensions" },
          { text: "Elevation drawings (front and side minimum)" },
          { text: "Footing detail — size, depth, reinforcement, spacing" },
          { text: "Framing plan — joist size, spacing, span tables referenced" },
          { text: "Ledger board attachment detail with flashing" },
          { text: "Railing/guard detail with height and spacing" },
          { text: "Stair detail with rise/run calculations" },
          { text: "Hurricane connector schedule and placement" },
          { text: "Material specifications (species, grade, treatment level)" },
          { text: "Cross-section detail showing full assembly" },
        ],
      },
      {
        title: "Engineering (If Required)",
        items: [
          { text: "Structural engineer's sealed drawings", detail: "Required for decks over 30\" high or unusual designs in most FL counties" },
          { text: "Wind load calculations per FBC Chapter 16" },
          { text: "Soil bearing capacity report (if poor soils suspected)" },
          { text: "Product approval documentation for hardware/connectors" },
          { text: "Truss/beam engineering if covering a large span" },
        ],
      },
      {
        title: "Contractor Documentation",
        items: [
          { text: "Contractor license number (verify active with DBPR)" },
          { text: "Liability insurance certificate (current)" },
          { text: "Workers' compensation certificate or exemption" },
          { text: "Signed contract or proposal" },
          { text: "Notice of Commencement (to be filed after permit issued)" },
        ],
      },
      {
        title: "Application Forms & Fees",
        items: [
          { text: "Completed building permit application form" },
          { text: "Permit fee (varies by county — budget $150–$1,200)" },
          { text: "Plan review fee (often separate from permit fee)" },
          { text: "Impact fees (if applicable in your county)" },
          { text: "Zoning review/approval (some counties require separate)" },
          { text: "Tree removal permit (if clearing for deck footprint)" },
          { text: "Environmental review (if near wetlands/coastal)" },
        ],
      },
    ],
    footer: "Permit requirements vary by Florida county and municipality. This checklist covers common requirements but your local building department may have additional items. Use our Permit Checker tool at /tools for county-specific guidance.",
  },
  {
    id: "reinspection-checklist",
    title: "Reinspection Preparation Checklist",
    subtitle: "Fix Violations & Pass Your Deck Reinspection the First Time",
    description: "Failed your deck inspection? Use this checklist to address common violations and prepare for reinspection so you don't pay repeat fees.",
    icon: "RotateCcw",
    color: "destructive",
    sections: [
      {
        title: "Before You Schedule Reinspection",
        items: [
          { text: "Review original inspection report in detail", detail: "Highlight each cited violation and code reference" },
          { text: "Photograph all corrections before calling for reinspection" },
          { text: "Verify your permit is still active (not expired)" },
          { text: "Confirm your contractor is available for reinspection day" },
          { text: "Check reinspection fee amount with building department" },
          { text: "Ensure all work areas are accessible to inspector" },
        ],
      },
      {
        title: "Common Footing Violations to Fix",
        items: [
          { text: "Footings not deep enough — must extend to code depth" },
          { text: "Footing diameter undersized — 12\" minimum typical" },
          { text: "Missing rebar in footings — #4 rebar usually required" },
          { text: "Post not centered on footing" },
          { text: "Footing poured on fill soil without compaction" },
          { text: "Missing post base hardware (Simpson-type connectors)" },
        ],
      },
      {
        title: "Common Framing Violations to Fix",
        items: [
          { text: "Joist hangers missing or wrong size", detail: "Must match joist dimensions exactly" },
          { text: "Incomplete nailing of joist hangers (every hole must be filled)" },
          { text: "Ledger board fasteners wrong type or spacing" },
          { text: "Missing ledger flashing or improper flashing installation" },
          { text: "Beam splice not located over a support post" },
          { text: "Joists exceeding maximum span for size/species" },
          { text: "Missing blocking at cantilever points" },
          { text: "Wrong lumber grade or species used" },
        ],
      },
      {
        title: "Common Railing Violations to Fix",
        items: [
          { text: "Railing height below 36\" (measure and adjust)" },
          { text: "Baluster spacing exceeds 4\" (add intermediate balusters)" },
          { text: "Railing post connections inadequate (add through-bolts)" },
          { text: "Missing railing on open side above 30\" drop" },
          { text: "Graspable handrail missing on stairs" },
          { text: "Horizontal rail members creating ladder effect" },
        ],
      },
      {
        title: "Common Stair Violations to Fix",
        items: [
          { text: "Non-uniform riser heights (max ⅜\" variance allowed)" },
          { text: "Tread depth less than 10\"" },
          { text: "Missing nosing or nosing exceeds 1¼\"" },
          { text: "Stair width less than 36\"" },
          { text: "Stringer not properly attached at top or bottom" },
          { text: "Missing handrail or wrong handrail height" },
        ],
      },
      {
        title: "Hurricane Hardware Violations (FL-Specific)",
        items: [
          { text: "Missing hurricane clips/ties at joist-to-beam connections" },
          { text: "Wrong connector model for the application" },
          { text: "Incomplete nailing of hurricane connectors" },
          { text: "Missing hold-down at post base" },
          { text: "Uplift path not continuous from deck to ground" },
        ],
      },
      {
        title: "Day-of Reinspection Prep",
        items: [
          { text: "Clear all debris from work area" },
          { text: "Ensure inspector can see all corrections (don't cover framing)" },
          { text: "Have original inspection report on site" },
          { text: "Have approved plans on site" },
          { text: "Keep dog/pets secured during inspection" },
          { text: "Be present or have contractor present to answer questions" },
          { text: "Have product data sheets for connectors/hardware available" },
        ],
      },
    ],
    footer: "Reinspection fees typically range from $50–$150 per visit. Correcting all violations before scheduling saves time and money. Use our Violation Decoder tool at /tools to understand code citations on your report.",
  },
  {
    id: "contractor-evaluation",
    title: "Contractor Evaluation Checklist",
    subtitle: "How to Vet a Florida Deck Contractor Before Signing",
    description: "Protect yourself from unlicensed contractors and bad builds. Score potential contractors across 8 categories to find the right fit for your deck project.",
    icon: "UserCheck",
    color: "secondary",
    sections: [
      {
        title: "License & Insurance Verification",
        items: [
          { text: "Verify active Florida contractor license on DBPR website", detail: "Search at myfloridalicense.com — license must be current" },
          { text: "Confirm license type covers deck work (CGC, CRC, or CBC)" },
          { text: "Request Certificate of Insurance — liability min $300K" },
          { text: "Verify workers' compensation coverage or exemption" },
          { text: "Check for disciplinary actions on license history" },
          { text: "Confirm contractor pulls permits (never pull your own)" },
        ],
      },
      {
        title: "Experience & Specialization",
        items: [
          { text: "Ask for 5+ years of deck-specific experience in Florida" },
          { text: "Request portfolio of completed deck projects" },
          { text: "Ask about experience with your specific material choice" },
          { text: "Confirm familiarity with local building codes & wind zones" },
          { text: "Ask about HVHZ (High-Velocity Hurricane Zone) experience if applicable" },
          { text: "Request photos of projects similar to your scope" },
        ],
      },
      {
        title: "References & Reviews",
        items: [
          { text: "Request 3+ recent references (within past 12 months)" },
          { text: "Actually call references — ask about timeline, quality, cleanup" },
          { text: "Check Google Business Profile reviews (20+ reviews preferred)" },
          { text: "Look up BBB rating and complaint history" },
          { text: "Search county records for past permit pass/fail rates" },
          { text: "Ask neighbors or local community groups for feedback" },
        ],
      },
      {
        title: "Written Estimate Evaluation",
        items: [
          { text: "Estimate is detailed, itemized (not just lump sum)", detail: "Should break out materials, labor, permits, hardware separately" },
          { text: "Materials specified by brand, species, grade, and size" },
          { text: "Hardware/connectors listed (joist hangers, hurricane clips, etc.)" },
          { text: "Permit costs and who pulls them clearly stated" },
          { text: "Timeline with start date and estimated completion" },
          { text: "Payment schedule tied to milestones (not front-loaded)" },
          { text: "Warranty terms clearly stated (workmanship + materials)" },
        ],
      },
      {
        title: "Contract Red Flags",
        items: [
          { text: "❌ Asks for more than 10% deposit upfront" },
          { text: "❌ Pressures you to sign immediately (\"today only\" pricing)" },
          { text: "❌ Offers to skip permits to save money" },
          { text: "❌ Cannot provide license number or insurance docs" },
          { text: "❌ Only accepts cash and won't provide receipts" },
          { text: "❌ No written warranty or refuses to put terms in writing" },
          { text: "❌ Uses subcontractors without disclosing" },
          { text: "❌ Will not provide lien waiver upon final payment" },
        ],
      },
      {
        title: "Contract Must-Haves",
        items: [
          { text: "✅ Full legal business name and license number" },
          { text: "✅ Detailed scope of work matching the estimate" },
          { text: "✅ Material specifications (brand, grade, species)" },
          { text: "✅ Start date, estimated duration, and completion date" },
          { text: "✅ Payment schedule (never more than value of work completed)" },
          { text: "✅ Change order process defined in writing" },
          { text: "✅ Warranty terms: min 1-year workmanship, material warranty passed through" },
          { text: "✅ Cleanup and debris removal included" },
          { text: "✅ Right to cancel within 3 business days (FL law)" },
        ],
      },
      {
        title: "Communication & Professionalism",
        items: [
          { text: "Returns calls/emails within 24 hours" },
          { text: "Shows up to estimate appointment on time" },
          { text: "Provides a permanent business address (not just P.O. box)" },
          { text: "Has professional website and/or established business presence" },
          { text: "Answers technical questions confidently and accurately" },
          { text: "Doesn't badmouth competitors" },
        ],
      },
      {
        title: "Post-Hire Monitoring",
        items: [
          { text: "Verify permit was actually pulled (check county portal)" },
          { text: "Confirm Notice of Commencement was filed" },
          { text: "Monitor work progress against agreed timeline" },
          { text: "Verify inspections are being called in at correct stages" },
          { text: "Document any deviations from approved plans" },
          { text: "Get lien waivers from contractor and subcontractors at final payment" },
        ],
      },
    ],
    footer: "Never hire an unlicensed contractor in Florida — it voids your insurance coverage and leaves you liable for injuries and code violations. Verify any contractor at myfloridalicense.com before signing a contract.",
  },
];
