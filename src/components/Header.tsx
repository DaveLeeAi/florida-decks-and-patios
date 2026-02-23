import { useState, useEffect, useCallback, useRef } from "react";
import logoImg from "@/assets/logo.png";
import { Link, useLocation } from "react-router-dom";
import { useSiteData } from "@/contexts/SiteDataContext";
import { Phone, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { company, navLinks, settings } = useSiteData();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-card/95 backdrop-blur-md shadow-md"
          : "bg-card/80 backdrop-blur-sm"
      }`}
    >
      <div className="container-narrow mx-auto flex items-center justify-between h-16 md:h-20 px-4 md:px-8">
        <Link to="/" className="flex items-center gap-2 font-heading font-bold text-xl text-primary">
          <img src={logoImg} alt="Florida Decks and Patios" className="h-10 w-auto" />
          <span className="hidden sm:inline">{company.name}</span>
          <span className="sm:hidden">FD&P</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-4 py-2 rounded-md text-base font-semibold transition-colors ${
                location.pathname === link.path
                  ? "text-primary bg-primary/10"
                  : "text-foreground/80 hover:text-primary hover:bg-primary/5"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${company.phone}`}
            className="hidden md:flex items-center gap-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
          >
            <Phone className="h-4 w-4" />
            {company.phoneDisplay}
          </a>
          <Link to={settings.ctaLink}>
            <Button size="default" className="hidden sm:inline-flex bg-amber text-charcoal hover:bg-amber-dark font-bold text-sm px-6 shadow-md">
              {settings.ctaText}
            </Button>
          </Link>
          <button
            className="lg:hidden p-2 text-foreground/80 hover:text-primary"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="lg:hidden bg-card border-t border-border animate-fade-in" aria-label="Mobile navigation">
          <div className="container-narrow mx-auto px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-3 rounded-md text-base font-medium transition-colors ${
                  location.pathname === link.path
                    ? "text-primary bg-primary/10"
                    : "text-foreground/80 hover:text-primary hover:bg-primary/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={`tel:${company.phone}`}
              className="flex items-center gap-2 px-4 py-3 text-base font-medium text-foreground/80"
            >
              <Phone className="h-4 w-4" />
              {company.phoneDisplay}
            </a>
            <Link to={settings.ctaLink} className="mt-2">
              <Button className="w-full bg-primary text-primary-foreground hover:bg-forest-dark font-semibold">
                {settings.ctaText}
              </Button>
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
