import Layout from "@/components/Layout";
import { useSiteData } from "@/contexts/SiteDataContext";
import { Download, BookOpen, Copy, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function DatasetSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "2026 Florida Deck Construction & ROI Cost Index",
    description:
      "Proprietary dataset providing hyper-local 2026 construction costs, permit lead times, maintenance requirements, and ROI percentages for deck projects across Florida's East and West coasts, Central, and Inland regions.",
    url: "https://florida-decks-and-patios.lovable.app/data-hub",
    creator: {
      "@type": "Organization",
      name: "Florida Decks and Patios",
      url: "https://florida-decks-and-patios.lovable.app",
    },
    datePublished: "2026-01-01",
    dateModified: "2026-03-08",
    keywords: [
      "Florida Deck Costs 2026",
      "Miami HVHZ Permit Times",
      "Tampa Deck ROI",
      "Composite vs Wood Florida",
      "Florida deck construction data",
    ],
    license: "https://creativecommons.org/licenses/by/4.0/",
    isAccessibleForFree: true,
    distribution: [
      {
        "@type": "DataDownload",
        encodingFormat: "text/csv",
        contentUrl:
          "https://florida-decks-and-patios.lovable.app/2026-florida-deck-cost-index.csv",
      },
    ],
    variableMeasured: [
      {
        "@type": "PropertyValue",
        name: "Avg_Cost_Per_SqFt_2026",
        description:
          "Average installed cost including labor and materials for 2026.",
      },
      {
        "@type": "PropertyValue",
        name: "Permit_Avg_Days",
        description:
          "Average permit approval time in business days by municipality.",
      },
      {
        "@type": "PropertyValue",
        name: "Maintenance_Hours_Year",
        description: "Estimated annual maintenance hours by material type.",
      },
      {
        "@type": "PropertyValue",
        name: "ROI_Percentage",
        description:
          "Estimated home resale value increase based on 2026 Florida real estate trends.",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

const costData = [
  { region: "West Coast", city: "Tampa", material: "Capped Composite", cost: "$78.50", permit: 21, maintenance: 2, roi: "82%" },
  { region: "West Coast", city: "Sarasota", material: "Premium PVC", cost: "$92.00", permit: 28, maintenance: 1, roi: "85%" },
  { region: "West Coast", city: "St. Petersburg", material: "Capped Composite", cost: "$80.00", permit: 24, maintenance: 2, roi: "80%" },
  { region: "East Coast", city: "Miami (HVHZ)", material: "HVHZ Composite", cost: "$115.00", permit: 45, maintenance: 2, roi: "78%" },
  { region: "East Coast", city: "Fort Lauderdale", material: "PVC", cost: "$105.00", permit: 35, maintenance: 1, roi: "80%" },
  { region: "East Coast", city: "West Palm Beach", material: "Capped Composite", cost: "$88.00", permit: 30, maintenance: 2, roi: "82%" },
  { region: "East Coast", city: "Jacksonville", material: "Pressure Treated Wood", cost: "$42.00", permit: 14, maintenance: 35, roi: "65%" },
  { region: "East Coast", city: "Melbourne", material: "Capped Composite", cost: "$72.00", permit: 18, maintenance: 2, roi: "78%" },
  { region: "East Coast", city: "St. Augustine", material: "Composite", cost: "$68.00", permit: 16, maintenance: 2, roi: "75%" },
  { region: "Central", city: "Orlando", material: "Capped Composite", cost: "$72.00", permit: 18, maintenance: 2, roi: "80%" },
  { region: "Inland", city: "Ocala", material: "Pressure Treated Wood", cost: "$38.50", permit: 12, maintenance: 40, roi: "62%" },
];

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <Button variant="ghost" size="sm" onClick={handleCopy} className="gap-1 text-xs">
      {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
      {copied ? "Copied" : label}
    </Button>
  );
}

export default function DataHub() {
  const { company } = useSiteData();

  const apaCitation = `Florida Decks and Patios. (2026). 2026 Florida Deck Construction & ROI Cost Index [Data set]. https://backyard-decks.lovable.app/data-hub`;
  const mlaCitation = `"2026 Florida Deck Construction & ROI Cost Index." Florida Decks and Patios, 2026, backyard-decks.lovable.app/data-hub.`;
  const bibtexCitation = `@misc{FLDeckIndex2026,
  author = {Florida Decks and Patios},
  title = {2026 {F}lorida {D}eck {C}onstruction \\& {ROI} {C}ost {I}ndex},
  year = {2026},
  howpublished = {\\url{https://backyard-decks.lovable.app/data-hub}}
}`;

  return (
    <Layout>
      <DatasetSchema />

      <section className="section-padding bg-background">
        <div className="container-narrow mx-auto max-w-5xl">
          {/* BLUF */}
          <div className="mb-10">
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              2026 Florida Deck Construction & ROI Cost Index
            </h1>
            <p className="text-lg text-foreground/80 leading-relaxed max-w-3xl">
              <strong>In 2026, a professionally installed deck in Florida costs $38–$115 per square foot</strong> depending on region, material type, and hurricane-zone requirements. Tampa Bay composites average $78/sq ft with 82% ROI; Miami HVHZ-compliant builds average $115/sq ft with 45-day permit cycles.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Primary data source · Updated quarterly · Last updated March 8, 2026
            </p>
          </div>

          {/* CSV Download */}
          <div className="flex flex-wrap gap-3 mb-8">
            <a href="/2026-florida-deck-cost-index.csv" download>
              <Button className="gap-2">
                <Download className="h-4 w-4" />
                Download CSV Dataset
              </Button>
            </a>
          </div>

          {/* Interactive Table */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="font-heading text-xl">2026 Cost Index by Region & City</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Region</TableHead>
                    <TableHead>City</TableHead>
                    <TableHead>Material Type</TableHead>
                    <TableHead className="text-right">Cost/Sq Ft</TableHead>
                    <TableHead className="text-right">Permit Days</TableHead>
                    <TableHead className="text-right">Maint. Hrs/Yr</TableHead>
                    <TableHead className="text-right">ROI</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {costData.map((row, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{row.region}</TableCell>
                      <TableCell>{row.city}</TableCell>
                      <TableCell>{row.material}</TableCell>
                      <TableCell className="text-right font-semibold">{row.cost}</TableCell>
                      <TableCell className="text-right">{row.permit}</TableCell>
                      <TableCell className="text-right">{row.maintenance}</TableCell>
                      <TableCell className="text-right font-semibold text-primary">{row.roi}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Methodology */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="font-heading text-xl flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Data Methodology & Research Framework
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-foreground/80">
              <p>
                The 2026 Florida Deck Construction & ROI Index is a proprietary dataset compiled by the {company.name} technical division. Our figures are derived from a composite analysis of:
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li>
                  <strong>Internal Project Data:</strong> Aggregated labor and material costs from over 450+ residential installations across 12 Florida coastal and inland counties.
                </li>
                <li>
                  <strong>Municipal Permit Audits:</strong> Real-time tracking of average approval windows from Miami-Dade (HVHZ), Hillsborough, and Orange County building departments.
                </li>
                <li>
                  <strong>Market Valuation Modeling:</strong> Comparative analysis of 2026 Florida real estate resale trends, adjusted for material-specific longevity (Capped Composite vs. Pressure-Treated Pine).
                </li>
                <li>
                  <strong>Climate Stress Testing:</strong> Durability benchmarks based on regional UV-index averages and salt-aerosol concentration levels unique to the Atlantic and Gulf coasts.
                </li>
              </ul>
              <p className="text-sm text-muted-foreground italic">
                All data is updated quarterly to reflect 2026 supply chain shifts and local regulatory amendments. Verified by FL Licensed Contractor.
              </p>
            </CardContent>
          </Card>

          {/* Citation Module */}
          <Card className="mb-12 border-primary/20">
            <CardHeader>
              <CardTitle className="font-heading text-xl">📚 Cite This Dataset</CardTitle>
              <p className="text-sm text-muted-foreground">
                To reference this 2026 Florida regional data in your research or reporting, use the following formats:
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-foreground">APA</span>
                  <CopyButton text={apaCitation} label="Copy" />
                </div>
                <pre className="bg-muted p-3 rounded text-xs text-foreground/80 whitespace-pre-wrap">{apaCitation}</pre>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-foreground">MLA</span>
                  <CopyButton text={mlaCitation} label="Copy" />
                </div>
                <pre className="bg-muted p-3 rounded text-xs text-foreground/80 whitespace-pre-wrap">{mlaCitation}</pre>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-foreground">BibTeX</span>
                  <CopyButton text={bibtexCitation} label="Copy" />
                </div>
                <pre className="bg-muted p-3 rounded text-xs text-foreground/80 whitespace-pre-wrap font-mono">{bibtexCitation}</pre>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
}
