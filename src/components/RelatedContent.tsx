import { Link } from "react-router-dom";
import { ArrowRight, Wrench, BookOpen, HelpCircle, MapPin, FileText } from "lucide-react";
import { type RelatedLink, getRelatedLinks } from "@/data/linkGraph";

const ICON_MAP: Record<RelatedLink["type"], React.ReactNode> = {
  tool: <Wrench className="h-4 w-4 shrink-0 text-primary" />,
  guide: <BookOpen className="h-4 w-4 shrink-0 text-primary" />,
  faq: <HelpCircle className="h-4 w-4 shrink-0 text-primary" />,
  city: <MapPin className="h-4 w-4 shrink-0 text-primary" />,
  page: <FileText className="h-4 w-4 shrink-0 text-primary" />,
};

interface Props {
  topics: string[];
  title?: string;
  maxLinks?: number;
  className?: string;
}

export default function RelatedContent({ topics, title = "Related Resources", maxLinks = 6, className = "" }: Props) {
  const links = getRelatedLinks(topics, maxLinks);
  if (links.length === 0) return null;

  return (
    <div className={`bg-card rounded-lg border border-border p-5 md:p-6 ${className}`}>
      <h3 className="font-heading text-lg font-bold text-foreground mb-4">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {links.map((link) => (
          <Link
            key={link.href}
            to={link.href}
            className="flex items-start gap-3 p-3 rounded-md border border-border hover:border-primary/30 hover:bg-primary/5 transition-colors group"
          >
            {ICON_MAP[link.type]}
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors flex items-center gap-1">
                {link.label}
                <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </p>
              <p className="text-xs text-muted-foreground leading-snug mt-0.5">{link.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
