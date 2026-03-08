import { Thermometer } from "lucide-react";

interface ProjectClimateProps {
  climateConsiderations: string;
  cityDisplay: string;
}

export default function ProjectClimate({ climateConsiderations, cityDisplay }: ProjectClimateProps) {
  return (
    <section className="section-padding bg-background">
      <div className="container-narrow mx-auto">
        <div className="flex items-center gap-2 mb-4">
          <Thermometer className="h-6 w-6 text-primary" />
          <h2 className="font-heading text-2xl font-bold text-foreground">Florida Climate Considerations</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed max-w-3xl">
          {climateConsiderations}
        </p>
      </div>
    </section>
  );
}
