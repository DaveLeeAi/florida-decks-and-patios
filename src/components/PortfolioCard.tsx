import { Link } from "react-router-dom";
import { MapPin, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { PortfolioProject } from "@/data/portfolioData";

function getSeoExcerpt(project: PortfolioProject): string {
  const cityDisplay = project.city === "Other Florida" ? "Gainesville" : project.city;
  const materialLabel = project.materials.toLowerCase();
  const typeLabel = project.projectType.toLowerCase();

  const excerpts: Record<string, string[]> = {
    Deck: [
      `Built for outdoor living in ${cityDisplay} with durable ${materialLabel} and a clean modern finish.`,
      `Designed for Florida weather — low maintenance and long-term backyard enjoyment in ${cityDisplay}.`,
      `A custom ${typeLabel} built to handle ${cityDisplay}'s climate while maximizing curb appeal.`,
    ],
    Patio: [
      `A professionally installed patio in ${cityDisplay} using premium ${materialLabel} for lasting beauty.`,
      `Crafted for year-round entertaining in ${cityDisplay} with weather-resistant ${materialLabel}.`,
    ],
    Pergola: [
      `Custom pergola design in ${cityDisplay} — shade, style, and Florida-grade durability.`,
      `An elegant outdoor structure in ${cityDisplay} built with ${materialLabel} to withstand coastal conditions.`,
    ],
    Repair: [
      `Expert deck repair in ${cityDisplay} — structural restoration and code-compliant upgrades.`,
      `Professionally repaired and reinforced for safety and longevity in ${cityDisplay}.`,
    ],
  };

  const options = excerpts[project.projectType] || excerpts.Deck;
  return options[project.id % options.length];
}

export default function PortfolioCard({ project }: { project: PortfolioProject }) {
  const cityDisplay = project.city === "Other Florida" ? "Gainesville" : project.city;

  return (
    <article className="group bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all duration-300">
      <Link to={`/portfolio/${project.slug}`} className="block">
        {/* Image */}
        <div className="aspect-[4/3] overflow-hidden relative">
          <img
            src={project.afterImage}
            alt={`${project.title} — ${cityDisplay}, Florida`}
            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
            loading="lazy"
            width={600}
            height={450}
          />
          <div className="absolute top-3 left-3">
            <Badge variant="secondary" className="text-xs bg-primary/90 text-primary-foreground border-0 shadow-sm">
              {project.projectType}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-heading text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-1.5 leading-snug">
            {project.title}
          </h3>

          <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-3">
            <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
            <span>{cityDisplay}, FL</span>
            {project.materials && (
              <>
                <span className="text-border">·</span>
                <span>{project.materials}</span>
              </>
            )}
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            {getSeoExcerpt(project)}
          </p>

          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground/70">{project.deckSize} · {project.completionYear}</span>
            <span className="text-primary text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
              View Project <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
