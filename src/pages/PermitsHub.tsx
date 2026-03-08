import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { permitCities } from "@/data/permitRules";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, DollarSign, ShieldAlert, ArrowRight } from "lucide-react";

function generateSlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export { generateSlug };

export default function PermitsHub() {
  return (
    <Layout>
      <Helmet>
        <title>Florida Deck Permit Requirements by County | 20 Counties</title>
        <meta name="description" content="Explore deck permit requirements, fees, turnaround times, and required documents for 20 Florida counties. Find your county's building department details." />
        <link rel="canonical" href="https://florida-decks-and-patios.lovable.app/permits" />
      </Helmet>

      <section className="bg-gradient-to-b from-primary/10 to-background py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-4">
            Florida Deck Permit Requirements
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Permit rules vary by county across Florida. Select your county below to see office details, fee structures, turnaround times, required documents, and inspection requirements.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {permitCities.map((city) => {
            const slug = generateSlug(city.name);
            const feeLabel = city.permitFeeRange[1] > 500 ? "Premium" : city.permitFeeRange[1] > 300 ? "Moderate" : "Budget-Friendly";
            return (
              <Card key={city.id} className="group hover:shadow-lg transition-shadow border-border/60">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{city.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{city.county}</p>
                    </div>
                    {city.isHVHZ && (
                      <span className="flex items-center gap-1 text-xs font-semibold text-destructive bg-destructive/10 px-2 py-1 rounded-md">
                        <ShieldAlert className="h-3 w-3" /> HVHZ
                      </span>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 shrink-0 text-primary" />
                    <span>{city.permitProcessingDays[0]}–{city.permitProcessingDays[1]} business days</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <DollarSign className="h-4 w-4 shrink-0 text-primary" />
                    <span>{feeLabel} · ${city.permitFeeRange[0]}–${city.permitFeeRange[1]}</span>
                  </div>
                  <Link to={`/permits/${slug}`}>
                    <Button variant="outline" size="sm" className="w-full mt-2 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      View Requirements <ArrowRight className="h-3.5 w-3.5 ml-1" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 pb-16 text-center">
        <h2 className="font-heading text-2xl font-bold mb-4">Not Sure About Your County?</h2>
        <p className="text-muted-foreground mb-6">
          Use our interactive Permit Requirement Checker to get a personalized assessment based on your project details.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/tools">
            <Button variant="outline" size="lg">Try the Permit Checker</Button>
          </Link>
          <Link to="/contact">
            <Button size="lg" className="bg-amber text-charcoal hover:bg-amber-dark font-bold">
              Get a Free Consultation
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
