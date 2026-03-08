import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { portfolioProjects, PROJECT_TYPES, MATERIAL_TYPES, CITY_TYPES, type ProjectType, type MaterialType, type CityType } from "@/data/portfolioData";
import { Filter, X, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import PortfolioCard from "@/components/PortfolioCard";
import { Helmet } from "react-helmet-async";

export default function Portfolio() {
  const [typeFilter, setTypeFilter] = useState<ProjectType | "All">("All");
  const [materialFilter, setMaterialFilter] = useState<MaterialType | "All">("All");
  const [cityFilter, setCityFilter] = useState<CityType | "All">("All");
  const [showFilters, setShowFilters] = useState(false);

  const activeFilterCount = [typeFilter, materialFilter, cityFilter].filter(f => f !== "All").length;

  const filtered = useMemo(() => {
    return portfolioProjects.filter(p => {
      if (typeFilter !== "All" && p.projectType !== typeFilter) return false;
      if (materialFilter !== "All" && p.materials !== materialFilter) return false;
      if (cityFilter !== "All" && p.city !== cityFilter) return false;
      return true;
    });
  }, [typeFilter, materialFilter, cityFilter]);

  const clearFilters = () => {
    setTypeFilter("All");
    setMaterialFilter("All");
    setCityFilter("All");
  };

  return (
    <Layout>
      <Helmet>
        <title>Deck & Patio Portfolio | 30+ Florida Projects | Florida Decks and Patios</title>
        <meta name="description" content="Browse 30+ completed deck, patio, and pergola projects across Florida. Project photos, details, and inspection insights from Tampa, Miami, Orlando, and more." />
      </Helmet>

      {/* Hero */}
      <section className="bg-gradient-to-b from-primary/10 to-background section-padding">
        <div className="container-narrow mx-auto text-center">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            Our Project Portfolio
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto mb-8">
            Browse {portfolioProjects.length}+ completed deck, patio, and pergola projects across Florida.
            Every project includes real photos, materials used, and inspection insights.
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-sm text-muted-foreground">
            <span className="bg-card border border-border rounded-full px-4 py-1.5">{portfolioProjects.filter(p => p.projectType === "Deck").length} Deck Projects</span>
            <span className="bg-card border border-border rounded-full px-4 py-1.5">{portfolioProjects.filter(p => p.projectType === "Patio").length} Patio Projects</span>
            <span className="bg-card border border-border rounded-full px-4 py-1.5">{portfolioProjects.filter(p => p.projectType === "Pergola").length} Pergola Projects</span>
            <span className="bg-card border border-border rounded-full px-4 py-1.5">{portfolioProjects.filter(p => p.projectType === "Repair").length} Repair Projects</span>
          </div>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="section-padding bg-background">
        <div className="container-narrow mx-auto">
          {/* Filter Toggle */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-heading text-2xl font-bold text-foreground">
              {filtered.length} Project{filtered.length !== 1 ? "s" : ""}
            </h2>
            <div className="flex items-center gap-2">
              {activeFilterCount > 0 && (
                <Button variant="ghost" size="sm" onClick={clearFilters} className="text-muted-foreground">
                  <X className="h-4 w-4 mr-1" /> Clear
                </Button>
              )}
              <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)} className="gap-2">
                <Filter className="h-4 w-4" />
                Filters
                {activeFilterCount > 0 && (
                  <Badge variant="default" className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-xs rounded-full">
                    {activeFilterCount}
                  </Badge>
                )}
                <ChevronDown className={`h-3 w-3 transition-transform ${showFilters ? "rotate-180" : ""}`} />
              </Button>
            </div>
          </div>

          {/* Filter Panels */}
          {showFilters && (
            <div className="bg-card border border-border rounded-lg p-5 mb-8 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Project Type</label>
                  <div className="flex flex-wrap gap-1.5">
                    <FilterChip active={typeFilter === "All"} onClick={() => setTypeFilter("All")}>All</FilterChip>
                    {PROJECT_TYPES.map(t => (
                      <FilterChip key={t} active={typeFilter === t} onClick={() => setTypeFilter(t)}>{t}</FilterChip>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Materials</label>
                  <div className="flex flex-wrap gap-1.5">
                    <FilterChip active={materialFilter === "All"} onClick={() => setMaterialFilter("All")}>All</FilterChip>
                    {MATERIAL_TYPES.map(m => (
                      <FilterChip key={m} active={materialFilter === m} onClick={() => setMaterialFilter(m)}>{m}</FilterChip>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Location</label>
                  <div className="flex flex-wrap gap-1.5">
                    <FilterChip active={cityFilter === "All"} onClick={() => setCityFilter("All")}>All</FilterChip>
                    {CITY_TYPES.map(c => (
                      <FilterChip key={c} active={cityFilter === c} onClick={() => setCityFilter(c)}>{c}</FilterChip>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Project Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project) => (
              <PortfolioCard key={project.id} project={project} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No projects match your filters.</p>
              <Button variant="outline" className="mt-4" onClick={clearFilters}>Clear Filters</Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-narrow mx-auto text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Project?</h2>
          <p className="text-primary-foreground/80 text-lg mb-6 max-w-2xl mx-auto">
            Get a free estimate for your deck, patio, or pergola project anywhere in Florida.
          </p>
          <Link to="/contact">
            <Button size="lg" variant="secondary" className="text-base px-8">
              Request Free Estimate
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}

function FilterChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
        active
          ? "bg-primary text-primary-foreground border-primary"
          : "bg-background text-muted-foreground border-border hover:border-primary/50"
      }`}
    >
      {children}
    </button>
  );
}
