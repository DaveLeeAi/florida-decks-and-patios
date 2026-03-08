import Layout from "@/components/Layout";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen } from "lucide-react";
import RelatedContent from "@/components/RelatedContent";
import {
  LedgerBoardDiagram,
  JoistSpacingDiagram,
  RailingHeightDiagram,
  StairGeometryDiagram,
  HurricaneConnectorDiagram,
} from "@/components/diagrams/DeckDiagrams";

const DIAGRAMS = [
  {
    id: "ledger-board",
    title: "Ledger Board Attachment",
    description:
      "The ledger board connects your deck to your house. Improper attachment is the #1 cause of deck collapses in Florida. Florida code requires ½\" lag screws or through-bolts at 16\" on center with proper metal flashing above.",
    Component: LedgerBoardDiagram,
    topics: ["inspections", "repairs"],
  },
  {
    id: "joist-spacing",
    title: "Joist Spacing",
    description:
      "Joist spacing determines how much weight your deck can support. Standard spacing is 16\" on center for wood decking. Composite manufacturers may require 12\" or 16\" depending on the product. Diagonal board patterns require tighter spacing.",
    Component: JoistSpacingDiagram,
    topics: ["materials", "costs"],
  },
  {
    id: "railing-height",
    title: "Railing Height & Baluster Spacing",
    description:
      "Florida requires 36\" minimum guardrail height for residential decks over 30\" above grade (42\" for commercial). Balusters must be spaced so a 4\" sphere cannot pass through. Rails must withstand a 200 lb concentrated load.",
    Component: RailingHeightDiagram,
    topics: ["railings", "inspections"],
  },
  {
    id: "stair-geometry",
    title: "Stair Geometry & Code Requirements",
    description:
      "Florida Building Code limits risers to 7.75\" maximum with 10\" minimum tread depth. All risers must be uniform within 3/8\". Handrails are required on stairs with 4+ risers. Stairs must be at least 36\" wide.",
    Component: StairGeometryDiagram,
    topics: ["stairs", "inspections"],
  },
  {
    id: "hurricane-connectors",
    title: "Hurricane Connector Load Path",
    description:
      "Florida's wind zones require a continuous load path from deck surface to footings. Hurricane ties connect joists to beams, post-beam connectors transfer loads to posts, and hold-downs anchor posts to concrete footings. Every link in the chain must resist wind uplift.",
    Component: HurricaneConnectorDiagram,
    topics: ["hurricanes", "materials"],
  },
];

export default function Diagrams() {
  useEffect(() => {
    document.title = "Deck Construction Diagrams | Florida Decks and Patios";
    const meta = document.querySelector('meta[name="description"]');
    const desc =
      "Technical diagrams for Florida deck construction: ledger boards, joist spacing, railing codes, stair geometry, and hurricane connectors. Visual guides for homeowners.";
    if (meta) meta.setAttribute("content", desc);
    else {
      const m = document.createElement("meta");
      m.name = "description";
      m.content = desc;
      document.head.appendChild(m);
    }
  }, []);

  return (
    <Layout>
      <section className="section-padding bg-section-alt">
        <div className="container-narrow mx-auto">
          {/* Hero */}
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-2 mb-3">
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
              Deck Construction Diagrams
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Visual guides to Florida deck building codes, structural connections,
              and construction details. Reference these diagrams when planning or
              inspecting your deck.
            </p>
          </div>

          {/* Quick jump */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {DIAGRAMS.map((d) => (
              <a
                key={d.id}
                href={`#${d.id}`}
                className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1.5 rounded-full hover:bg-primary/20 transition-colors"
              >
                {d.title}
              </a>
            ))}
          </div>

          {/* Diagrams */}
          <div className="space-y-12">
            {DIAGRAMS.map((d) => (
              <div
                key={d.id}
                id={d.id}
                className="bg-card rounded-lg border border-border overflow-hidden scroll-mt-28"
              >
                <div className="p-5 md:p-8">
                  <h2 className="font-heading text-2xl font-bold text-foreground mb-2">
                    {d.title}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-2xl">
                    {d.description}
                  </p>
                  <div className="max-w-lg mx-auto">
                    <d.Component />
                  </div>
                </div>
                <div className="border-t border-border p-4 md:px-8">
                  <RelatedContent
                    topics={d.topics}
                    title="Related Resources"
                    maxLinks={4}
                    className="border-0 p-0"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">
              Have questions about any of these construction details?
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                to="/faq"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
              >
                Browse 152+ FAQs <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/tools"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
              >
                Use Planning Tools <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
              >
                Get a Free Estimate <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
