// ═══════════════════════════════════════════════════════════════
// Internal Linking Knowledge Graph
// Maps relationships between all content for cross-linking
// ═══════════════════════════════════════════════════════════════

export interface RelatedLink {
  label: string;
  href: string;
  description: string;
  type: "tool" | "guide" | "faq" | "city" | "page";
}

// Contextual link sets by topic
export const LINK_GRAPH: Record<string, RelatedLink[]> = {
  permits: [
    { label: "Permit Checker Tool", href: "/tools#permits", description: "Check your city's permit requirements", type: "tool" },
    { label: "Permit FAQs", href: "/faq?tab=permits", description: "19 permit questions answered", type: "faq" },
    { label: "Cost Estimator", href: "/tools#budget", description: "Estimate total project cost including permits", type: "tool" },
    { label: "Inspection Guide", href: "/faq?tab=inspections", description: "What to expect during inspections", type: "faq" },
  ],
  materials: [
    { label: "Materials Knowledge Hub", href: "/materials", description: "Compare decking materials for Florida", type: "guide" },
    { label: "Material FAQs", href: "/faq?tab=materials", description: "19 material questions answered", type: "faq" },
    { label: "Cost Estimator", href: "/tools#budget", description: "Compare material costs side by side", type: "tool" },
    { label: "Design Idea Generator", href: "/tools#design", description: "Get design ideas based on your material choice", type: "tool" },
    { label: "Diagrams Library", href: "/diagrams", description: "Technical diagrams for deck construction", type: "guide" },
  ],
  costs: [
    { label: "Cost Estimator", href: "/tools#budget", description: "Get a personalized cost estimate", type: "tool" },
    { label: "ROI Calculator", href: "/tools#roi", description: "Calculate your deck's return on investment", type: "tool" },
    { label: "Cost FAQs", href: "/faq?tab=costs", description: "19 cost questions answered", type: "faq" },
    { label: "Materials Hub", href: "/materials", description: "Compare material costs and lifespans", type: "guide" },
    { label: "Budget Estimator", href: "/tools#budget", description: "Plan your project budget", type: "tool" },
  ],
  hurricanes: [
    { label: "Hurricane FAQs", href: "/faq?tab=hurricanes", description: "19 hurricane requirement questions", type: "faq" },
    { label: "Hurricane Connector Diagram", href: "/diagrams#hurricane-connectors", description: "Visual guide to wind-resistance hardware", type: "guide" },
    { label: "Permit Checker", href: "/tools#permits", description: "Check wind zone requirements for your city", type: "tool" },
    { label: "Materials Hub", href: "/materials", description: "Corrosion-resistant hardware guide", type: "guide" },
    { label: "Repair Checker", href: "/tools#repair", description: "Assess hurricane strap condition", type: "tool" },
  ],
  railings: [
    { label: "Railing FAQs", href: "/faq?tab=railings", description: "19 railing code questions answered", type: "faq" },
    { label: "Railing Height Diagram", href: "/diagrams#railing-height", description: "Visual code requirements for railings", type: "guide" },
    { label: "Materials Hub", href: "/materials", description: "Compare railing materials", type: "guide" },
    { label: "Cost Estimator", href: "/tools#budget", description: "Estimate railing costs", type: "tool" },
  ],
  stairs: [
    { label: "Stair FAQs", href: "/faq?tab=stairs", description: "19 stair code questions answered", type: "faq" },
    { label: "Stair Geometry Diagram", href: "/diagrams#stair-geometry", description: "Visual stair code requirements", type: "guide" },
    { label: "Cost Estimator", href: "/tools#budget", description: "Estimate stair costs", type: "tool" },
  ],
  repairs: [
    { label: "Repair Checker Tool", href: "/tools#repair", description: "Assess your deck's repair needs", type: "tool" },
    { label: "Repair FAQs", href: "/faq?tab=repairs", description: "19 repair questions answered", type: "faq" },
    { label: "Inspection Failure Explainer", href: "/tools#violations", description: "Decode failed inspection results", type: "tool" },
    { label: "Materials Hub", href: "/materials", description: "Find replacement materials", type: "guide" },
  ],
  inspections: [
    { label: "Inspection FAQs", href: "/faq?tab=inspections", description: "19 inspection questions answered", type: "faq" },
    { label: "Inspection Failure Explainer", href: "/tools#violations", description: "Understand failed inspection codes", type: "tool" },
    { label: "Permit Checker", href: "/tools#permits", description: "Check what inspections your city requires", type: "tool" },
    { label: "Repair Checker", href: "/tools#repair", description: "Assess repairs needed after failed inspection", type: "tool" },
  ],
  design: [
    { label: "Design Idea Generator", href: "/tools#design", description: "Get personalized design recommendations", type: "tool" },
    { label: "Materials Hub", href: "/materials", description: "Explore material options for your design", type: "guide" },
    { label: "ROI Calculator", href: "/tools#roi", description: "See how design choices affect ROI", type: "tool" },
    { label: "Diagrams Library", href: "/diagrams", description: "Technical construction diagrams", type: "guide" },
    { label: "Portfolio", href: "/portfolio", description: "Browse completed deck projects", type: "page" },
  ],
  general: [
    { label: "Free Planning Tools", href: "/tools", description: "All deck planning tools in one place", type: "tool" },
    { label: "FAQ Database", href: "/faq", description: "152+ Florida deck questions answered", type: "faq" },
    { label: "Materials Hub", href: "/materials", description: "Complete materials comparison guide", type: "guide" },
    { label: "Diagrams Library", href: "/diagrams", description: "Technical deck construction diagrams", type: "guide" },
    { label: "Glossary", href: "/glossary", description: "Deck building terminology explained", type: "page" },
    { label: "Contact Us", href: "/contact", description: "Get a free estimate from verified pros", type: "page" },
  ],
};

export function getRelatedLinks(topics: string[], maxLinks = 6): RelatedLink[] {
  const seen = new Set<string>();
  const result: RelatedLink[] = [];
  for (const topic of topics) {
    const links = LINK_GRAPH[topic] || [];
    for (const link of links) {
      if (!seen.has(link.href) && result.length < maxLinks) {
        seen.add(link.href);
        result.push(link);
      }
    }
  }
  return result;
}
