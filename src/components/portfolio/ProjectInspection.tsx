import { Shield, CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface ProjectInspectionProps {
  inspectionInsights: string[];
  projectType: string;
}

export default function ProjectInspection({ inspectionInsights, projectType }: ProjectInspectionProps) {
  return (
    <section className="section-padding bg-section-alt">
      <div className="container-narrow mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <Shield className="h-6 w-6 text-primary" />
          <h2 className="font-heading text-2xl font-bold text-foreground">Inspection Insights</h2>
        </div>
        <p className="text-muted-foreground mb-6 max-w-2xl">
          Key inspection items verified during this {projectType.toLowerCase()} project, ensuring full Florida Building Code compliance.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {inspectionInsights.map((insight, i) => (
            <div key={i} className="flex items-start gap-3 bg-card p-4 rounded-lg border border-border">
              <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <span className="text-sm text-foreground/90">{insight}</span>
            </div>
          ))}
        </div>
        <Link to="/tools" className="text-primary text-sm font-medium hover:underline flex items-center gap-1">
          Use our Inspection Failure Decoder tool <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </section>
  );
}
