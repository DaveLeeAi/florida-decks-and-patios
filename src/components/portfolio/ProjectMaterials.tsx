import { Hammer } from "lucide-react";

interface ProjectMaterialsProps {
  materialsDetail: string;
  materials: string;
}

export default function ProjectMaterials({ materialsDetail, materials }: ProjectMaterialsProps) {
  return (
    <section className="section-padding bg-section-alt">
      <div className="container-narrow mx-auto">
        <div className="flex items-center gap-2 mb-4">
          <Hammer className="h-6 w-6 text-primary" />
          <h2 className="font-heading text-2xl font-bold text-foreground">Materials & Design Considerations</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed max-w-3xl">
          {materialsDetail}
        </p>
      </div>
    </section>
  );
}
