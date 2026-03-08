import Layout from "@/components/Layout";
import { Helmet } from "react-helmet-async";
import { COMPANY } from "@/data/siteData";

export default function Terms() {
  return (
    <Layout>
      <Helmet>
        <title>Terms of Service | Florida Decks and Patios</title>
        <meta name="description" content="Terms of service for Florida Decks and Patios." />
        <link rel="canonical" href="https://florida-decks-and-patios.lovable.app/terms" />
      </Helmet>
      <section className="section-padding bg-background">
        <div className="container-narrow mx-auto max-w-3xl">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8">Terms of Service</h1>
          <div className="space-y-6 text-foreground/80 leading-relaxed text-sm">
            <p><strong className="text-foreground">Last Updated:</strong> January 1, 2026</p>

            <h2 className="font-heading text-xl font-semibold text-foreground !mt-8">Acceptance of Terms</h2>
            <p>By accessing and using this website, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website.</p>

            <h2 className="font-heading text-xl font-semibold text-foreground !mt-8">Services</h2>
            <p>{COMPANY.name} provides outdoor construction services including but not limited to deck building, repair, pergola installation, porch construction, and outdoor kitchen design. All services are subject to a separate written agreement between {COMPANY.name} and the client.</p>

            <h2 className="font-heading text-xl font-semibold text-foreground !mt-8">Estimates & Pricing</h2>
            <p>All estimates provided through this website or our tools are approximate and for informational purposes only. Final pricing is determined after an on-site assessment and is provided in a formal written proposal.</p>

            <h2 className="font-heading text-xl font-semibold text-foreground !mt-8">Website Content</h2>
            <p>The content on this website is for general informational purposes only and does not constitute professional advice. While we strive for accuracy, we make no guarantees about the completeness or reliability of the information presented.</p>

            <h2 className="font-heading text-xl font-semibold text-foreground !mt-8">Limitation of Liability</h2>
            <p>{COMPANY.name} shall not be liable for any indirect, incidental, or consequential damages arising from the use of this website or reliance on its content, including the planning tools and calculators provided.</p>

            <h2 className="font-heading text-xl font-semibold text-foreground !mt-8">Intellectual Property</h2>
            <p>All content, designs, and materials on this website are the property of {COMPANY.name} and are protected by applicable intellectual property laws.</p>

            <h2 className="font-heading text-xl font-semibold text-foreground !mt-8">Contact</h2>
            <p>For questions about these terms, contact us at {COMPANY.email} or call {COMPANY.phoneDisplay}.</p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
