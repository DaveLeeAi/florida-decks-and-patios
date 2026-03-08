import { Link } from "react-router-dom";
import { useSiteData } from "@/contexts/SiteDataContext";
import { Phone, Mail, MapPin } from "lucide-react";
import logoImg from "@/assets/logo.png";

export default function Footer() {
  const { company, services, settings } = useSiteData();

  return (
    <footer className="bg-forest-dark text-primary-foreground">
      <div className="container-narrow mx-auto section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Link to="/" className="font-heading font-bold text-xl flex items-center gap-3 mb-4">
              <img src={logoImg} alt={company.name} className="h-12 w-auto" />
              {company.name}
            </Link>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              {company.tagline}. {settings.footerText}
            </p>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              {services.slice(0, 5).map((s) => (
                <li key={s.slug}>
                  <Link to={`/services/${s.slug}`} className="text-sm text-primary-foreground/70 hover:text-amber transition-colors">
                    {s.shortTitle}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/services" className="text-sm text-amber hover:text-amber-light transition-colors font-medium">
                  View All →
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { label: "Portfolio", path: "/portfolio" },
                { label: "Blog", path: "/blog" },
                { label: "Project Estimator", path: "/tools" },
                { label: "Contact Us", path: "/contact" },
              ].map((l) => (
                <li key={l.path}>
                  <Link to={l.path} className="text-sm text-primary-foreground/70 hover:text-amber transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="font-heading font-semibold text-lg mt-6 mb-3">Service Areas</h3>
            <ul className="space-y-2">
              {[
                { label: "Tampa Bay", path: "/tampa-decks" },
                { label: "Orlando", path: "/orlando-patios" },
                { label: "Sarasota", path: "/sarasota-outdoor-living" },
                { label: "Jacksonville", path: "/jacksonville-decks" },
                { label: "Ocala", path: "/ocala-outdoor-living" },
              ].map((l) => (
                <li key={l.path}>
                  <Link to={l.path} className="text-sm text-primary-foreground/70 hover:text-amber transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-primary-foreground/70">
                <Phone className="h-4 w-4 mt-0.5 shrink-0 text-amber" />
                <a href={`tel:${company.phone}`} className="hover:text-amber transition-colors">{company.phoneDisplay}</a>
              </li>
              <li className="flex items-start gap-3 text-sm text-primary-foreground/70">
                <Mail className="h-4 w-4 mt-0.5 shrink-0 text-amber" />
                <a href={`mailto:${company.email}`} className="hover:text-amber transition-colors">{company.email}</a>
              </li>
              <li className="flex items-start gap-3 text-sm text-primary-foreground/70">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-amber" />
                <span>{company.address}<br />{company.city}, {company.state} {company.zip}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-primary-foreground/50">
            © {new Date().getFullYear()} {company.name}. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm text-primary-foreground/50">
            <Link to="/privacy" className="hover:text-amber transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-amber transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
