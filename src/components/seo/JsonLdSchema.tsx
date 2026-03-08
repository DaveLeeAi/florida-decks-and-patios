import { useEffect } from "react";
import { COMPANY } from "@/data/siteData";

interface JsonLdProps {
  schema: Record<string, unknown>;
}

function JsonLd({ schema }: JsonLdProps) {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, [schema]);
  return null;
}

export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: COMPANY.name,
    description: "Referral network connecting homeowners with DBPR-licensed, insured Florida contractors for custom deck building, patio installation, and outdoor living spaces. All contractors verified before project begins.",
    url: "https://florida-decks-and-patios.lovable.app",
    telephone: COMPANY.phone,
    email: COMPANY.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: COMPANY.address,
      addressLocality: COMPANY.city,
      addressRegion: COMPANY.state,
      postalCode: COMPANY.zip,
      addressCountry: "US",
    },
    areaServed: [
      { "@type": "City", name: "Tampa", addressRegion: "FL" },
      { "@type": "City", name: "Orlando", addressRegion: "FL" },
      { "@type": "City", name: "Sarasota", addressRegion: "FL" },
      { "@type": "City", name: "Jacksonville", addressRegion: "FL" },
      { "@type": "City", name: "Ocala", addressRegion: "FL" },
      { "@type": "City", name: "Miami", addressRegion: "FL" },
      { "@type": "City", name: "Fort Lauderdale", addressRegion: "FL" },
      { "@type": "City", name: "Melbourne", addressRegion: "FL" },
      { "@type": "City", name: "West Palm Beach", addressRegion: "FL" },
      { "@type": "City", name: "St. Augustine", addressRegion: "FL" },
      { "@type": "City", name: "Fort Myers", addressRegion: "FL" },
      { "@type": "City", name: "Cape Coral", addressRegion: "FL" },
      { "@type": "City", name: "Gainesville", addressRegion: "FL" },
      { "@type": "City", name: "Daytona Beach", addressRegion: "FL" },
      { "@type": "City", name: "Bradenton", addressRegion: "FL" },
      { "@type": "City", name: "Clearwater", addressRegion: "FL" },
      { "@type": "City", name: "Lakeland", addressRegion: "FL" },
      { "@type": "City", name: "Port Charlotte", addressRegion: "FL" },
      { "@type": "City", name: "Jupiter", addressRegion: "FL" },
      { "@type": "City", name: "Fort Pierce", addressRegion: "FL" },
      { "@type": "City", name: "The Villages", addressRegion: "FL" },
      { "@type": "City", name: "Kissimmee", addressRegion: "FL" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Florida Deck Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "HVHZ-Compliant Deck Construction",
            description: "High-Velocity Hurricane Zone engineered decks for Miami-Dade and Broward counties with NOA-approved materials.",
          },
        },
      ],
    },
    priceRange: "$$–$$$$",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
  };
  return <JsonLd schema={schema} />;
}

export function HowToSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Maintain a Deck in Florida",
    description: "A seasonal guide to maintaining your deck in Florida's humid, UV-intense climate with hurricane preparation steps.",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Spring Deep Clean and Mold Treatment",
        text: "Apply a mold-killing deck cleaner to address humidity-related mold growth. Power wash on low setting (max 1500 PSI for wood). Inspect all hardware for corrosion, especially hurricane straps.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Summer Hurricane Preparation",
        text: "Before June 1, verify all hurricane straps and ledger board connections are secure. Create a furniture securing plan. Sweep weekly to prevent debris buildup and moisture trapping.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Fall Post-Storm Assessment",
        text: "After any major storm, inspect for loose boards, shifted posts, damaged railings, and water intrusion at the ledger board. Apply second round of mold treatment for humid fall conditions.",
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Winter Sealing and Structural Check",
        text: "Apply annual sealant during Florida's mild winter. Re-torque bolts and check post connections. Clean under the deck to improve airflow and schedule any needed spring repairs.",
      },
    ],
    totalTime: "PT4H",
    supply: [
      { "@type": "HowToSupply", name: "Deck cleaner with mold inhibitor" },
      { "@type": "HowToSupply", name: "UV-resistant stain or sealant" },
      { "@type": "HowToSupply", name: "Corrosion-resistant replacement screws" },
    ],
    tool: [
      { "@type": "HowToTool", name: "Pressure washer (max 1500 PSI)" },
      { "@type": "HowToTool", name: "Soft-bristle brush" },
      { "@type": "HowToTool", name: "Torque wrench" },
    ],
  };
  return <JsonLd schema={schema} />;
}

interface FAQSchemaProps {
  questions: { question: string; answer: string }[];
}

export function FAQSchema({ questions }: FAQSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  };
  return <JsonLd schema={schema} />;
}

interface CityServiceSchemaProps {
  cityName: string;
  slug: string;
  description: string;
}

export function CityServiceSchema({ cityName, slug, description }: CityServiceSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Deck Building and Outdoor Living Construction",
    provider: {
      "@type": "HomeAndConstructionBusiness",
      name: COMPANY.name,
      telephone: COMPANY.phone,
      email: COMPANY.email,
    },
    areaServed: {
      "@type": "City",
      name: cityName,
      addressRegion: "FL",
      addressCountry: "US",
    },
    description,
    url: `https://backyard-decks.lovable.app/${slug}`,
  };
  return <JsonLd schema={schema} />;
}

interface TechArticleSchemaProps {
  title: string;
  description: string;
  slug: string;
  datePublished: string;
  dateModified?: string;
  category: string;
}

export function TechArticleSchema({ title, description, slug, datePublished, dateModified, category }: TechArticleSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: title,
    description,
    url: `https://backyard-decks.lovable.app/blog/${slug}`,
    datePublished,
    dateModified: dateModified || datePublished,
    proficiencyLevel: "Beginner",
    author: {
      "@type": "Organization",
      name: COMPANY.name,
      url: "https://backyard-decks.lovable.app",
    },
    publisher: {
      "@type": "Organization",
      name: COMPANY.name,
      url: "https://backyard-decks.lovable.app",
    },
    about: {
      "@type": "Thing",
      name: category,
    },
    inLanguage: "en-US",
  };
  return <JsonLd schema={schema} />;
}
