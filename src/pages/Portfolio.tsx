import { useState } from "react";
import Layout from "@/components/Layout";
import { portfolioProjects } from "@/data/siteData";
import { X } from "lucide-react";

export default function Portfolio() {
  const [selected, setSelected] = useState<typeof portfolioProjects[0] | null>(null);
  const categories = ["All", ...Array.from(new Set(portfolioProjects.map((p) => p.category)))];
  const [filter, setFilter] = useState("All");

  const filtered = filter === "All" ? portfolioProjects : portfolioProjects.filter((p) => p.category === filter);

  return (
    <Layout>
      <section className="section-padding bg-section-alt">
        <div className="container-narrow mx-auto">
          <div className="text-center mb-10">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">Our Portfolio</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Browse our completed projects to see the quality and craftsmanship we bring to every outdoor living space.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`text-sm px-4 py-2 rounded-full border transition-colors ${
                  filter === cat
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background text-muted-foreground border-border hover:border-primary/50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project) => (
              <button
                key={project.id}
                onClick={() => setSelected(project)}
                className="group bg-card rounded-lg border border-border overflow-hidden text-left hover:shadow-lg transition-all"
              >
                <div className="h-48 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <span className="text-4xl opacity-50">🏠</span>
                </div>
                <div className="p-5">
                  <span className="text-xs font-medium text-primary">{project.category}</span>
                  <h3 className="font-heading text-lg font-semibold text-foreground mt-1 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">{project.location}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/60 backdrop-blur-sm" onClick={() => setSelected(null)}>
          <div className="bg-card rounded-lg max-w-lg w-full p-8 relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setSelected(null)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
              <X className="h-5 w-5" />
            </button>
            <span className="text-xs font-medium text-primary">{selected.category}</span>
            <h2 className="font-heading text-2xl font-bold text-foreground mt-2 mb-2">{selected.title}</h2>
            <p className="text-sm text-muted-foreground mb-4">{selected.location}</p>
            <p className="text-foreground/80 leading-relaxed">{selected.description}</p>
          </div>
        </div>
      )}
    </Layout>
  );
}
