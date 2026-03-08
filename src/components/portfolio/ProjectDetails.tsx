import { MapPin, Ruler, Layers, Clock, DollarSign, TreePine } from "lucide-react";
import type { PortfolioProject } from "@/data/portfolioData";

interface ProjectDetailsProps {
  project: PortfolioProject;
  cityDisplay: string;
}

export default function ProjectDetails({ project, cityDisplay }: ProjectDetailsProps) {
  return (
    <section className="section-padding bg-section-alt">
      <div className="container-narrow mx-auto">
        <h2 className="font-heading text-2xl font-bold text-foreground mb-6">Project Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <DetailRow icon={MapPin} label="Location" value={`${cityDisplay}, Florida`} />
          <DetailRow icon={Layers} label="Project Type" value={project.projectType} />
          <DetailRow icon={Ruler} label="Approximate Size" value={project.deckSize} />
          <DetailRow icon={Layers} label="Primary Materials" value={project.materials} />
          <DetailRow icon={TreePine} label="Environment" value={project.environment} />
          <DetailRow icon={Clock} label="Timeline" value={project.duration} />
          <DetailRow icon={DollarSign} label="Budget Range" value={project.budgetRange} />
        </div>
      </div>
    </section>
  );
}

function DetailRow({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 bg-card border border-border rounded-lg p-4">
      <Icon className="h-5 w-5 text-primary shrink-0 mt-0.5" />
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-semibold text-foreground">{value}</p>
      </div>
    </div>
  );
}
