import { useState, useEffect, useCallback, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { COMPANY } from "@/data/siteData";
import { Phone, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Services", path: "/services" },
  { label: "Tools", path: "/tools" },
  { label: "Portfolio", path: "/portfolio" },
  { label: "Blog", path: "/blog" },
  { label: "Contact", path: "/contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

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
          : "bg-transparent"
      }`}
    >
      <div className="container-narrow mx-auto flex items-center justify-between h-16 md:h-20 px-4 md:px-8">
        {/* Logo */}
        <Link to="/" className={`flex items-center gap-2 font-heading font-bold text-xl transition-colors ${scrolled ? "text-primary" : "text-primary-foreground"}`}>
          <span className="text-2xl">🪵</span>
          <span className="hidden sm:inline">{COMPANY.name}</span>
          <span className="sm:hidden">T&S</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-4 py-2 rounded-md text-base font-semibold transition-colors ${
                location.pathname === link.path
                  ? scrolled ? "text-primary bg-primary/10" : "text-primary-foreground bg-primary-foreground/10"
                  : scrolled ? "text-foreground/80 hover:text-primary hover:bg-primary/5" : "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <a
            href={`tel:${COMPANY.phone}`}
            className={`hidden md:flex items-center gap-2 text-sm font-medium transition-colors ${
              scrolled ? "text-foreground/80 hover:text-primary" : "text-primary-foreground/80 hover:text-primary-foreground"
            }`}
          >
            <Phone className="h-4 w-4" />
            {COMPANY.phoneDisplay}
          </a>
          <Link to="/contact">
            <Button size="default" className="hidden sm:inline-flex bg-amber text-charcoal hover:bg-amber-dark font-bold text-sm px-6 shadow-md">
              Get Free Estimate
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

      {/* Mobile Nav */}
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
              href={`tel:${COMPANY.phone}`}
              className="flex items-center gap-2 px-4 py-3 text-base font-medium text-foreground/80"
            >
              <Phone className="h-4 w-4" />
              {COMPANY.phoneDisplay}
            </a>
            <Link to="/contact" className="mt-2">
              <Button className="w-full bg-primary text-primary-foreground hover:bg-forest-dark font-semibold">
                Get Free Estimate
              </Button>
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
