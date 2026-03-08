import Layout from "@/components/Layout";
import { Helmet } from "react-helmet-async";
import { COMPANY } from "@/data/siteData";

export default function Privacy() {
  return (
    <Layout>
      <Helmet>
        <title>Privacy Policy | Florida Decks and Patios</title>
        <meta name="description" content="Privacy policy for Florida Decks and Patios." />
        <link rel="canonical" href="https://florida-decks-and-patios.lovable.app/privacy" />
      </Helmet>
      <section className="section-padding bg-background">
        <div className="container-narrow mx-auto max-w-3xl">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8">Privacy Policy</h1>
          <div className="space-y-6 text-foreground/80 leading-relaxed text-sm">
            <p><strong className="text-foreground">Last Updated:</strong> January 1, 2026</p>

            <h2 className="font-heading text-xl font-semibold text-foreground !mt-8">Information We Collect</h2>
            <p>When you use our website or contact us, we may collect personal information such as your name, email address, phone number, mailing address, and details about your project. We collect this information when you fill out our contact form, request an estimate, or communicate with us directly.</p>

            <h2 className="font-heading text-xl font-semibold text-foreground !mt-8">How We Use Your Information</h2>
            <p>We use the information we collect to respond to your inquiries, provide project estimates, communicate about services, improve our website, and comply with legal obligations. We do not sell your personal information to third parties.</p>

            <h2 className="font-heading text-xl font-semibold text-foreground !mt-8">Cookies</h2>
            <p>Our website may use cookies to improve your browsing experience and analyze site traffic. You can control cookie settings through your browser preferences.</p>

            <h2 className="font-heading text-xl font-semibold text-foreground !mt-8">Data Security</h2>
            <p>We implement reasonable security measures to protect your personal information from unauthorized access, use, or disclosure. However, no internet transmission is completely secure.</p>

            <h2 className="font-heading text-xl font-semibold text-foreground !mt-8">Your Rights</h2>
            <p>You may request access to, correction of, or deletion of your personal information at any time by contacting us at {COMPANY.email}.</p>

            <h2 className="font-heading text-xl font-semibold text-foreground !mt-8">Contact</h2>
            <p>If you have questions about this privacy policy, please contact us at {COMPANY.email} or call {COMPANY.phoneDisplay}.</p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
