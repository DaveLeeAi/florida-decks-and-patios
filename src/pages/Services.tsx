import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { useSiteData } from "@/contexts/SiteDataContext";
import { Hammer, Wrench, Layers, FileCheck, TreePine, Home, ChefHat, ArrowRight } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Hammer: <Hammer className="h-7 w-7" />,
  Wrench: <Wrench className="h-7 w-7" />,
  Layers: <Layers className="h-7 w-7" />,
  FileCheck: <FileCheck className="h-7 w-7" />,
  TreePine: <TreePine className="h-7 w-7" />,
  Home: <Home className="h-7 w-7" />,
  ChefHat: <ChefHat className="h-7 w-7" />,
};

export default function Services() {
  const { services } = useSiteData();

  return (
    <Layout>
      <section className="section-padding bg-section-alt">
        <div className="container-narrow mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">Our Services</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              From custom deck builds to outdoor kitchens, we deliver exceptional craftsmanship for every outdoor living project.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Link
                key={service.slug}
                to={`/services/${service.slug}`}
                className="group bg-card rounded-lg border border-border p-8 hover:shadow-xl hover:border-primary/30 transition-all duration-300"
              >
                <div className="h-14 w-14 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  {iconMap[service.icon]}
                </div>
                <h2 className="font-heading text-xl font-semibold text-foreground mb-3">{service.title}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{service.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground">{service.priceRange}</span>
                  <span className="text-sm font-medium text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                    Details <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
