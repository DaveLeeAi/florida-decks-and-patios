import { useState, useEffect, useRef } from "react";
import logoImg from "@/assets/logo.png";
import { Link, useLocation } from "react-router-dom";
import { useSiteData } from "@/contexts/SiteDataContext";
import { Phone, Menu, X, ChevronDown, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cityPages } from "@/data/cityData";


export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [areasOpen, setAreasOpen] = useState(false);
  const [mobileAreasOpen, setMobileAreasOpen] = useState(false);
  const location = useLocation();
  const { company, navLinks, settings } = useSiteData();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setAreasOpen(false);
    setMobileAreasOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setAreasOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const citySlugs = cityPages.map((c) => `/areas/${c.slug}`);
  const isAreaActive = citySlugs.includes(location.pathname);

  const phoneIsPlaceholder = !company.phone || company.phone.includes("PLACEHOLDER");

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-card/95 backdrop-blur-md shadow-md"
          : "bg-card/80 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between h-20 md:h-24 px-4 md:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 font-heading font-bold text-lg md:text-xl text-primary shrink-0">
          <img src={logoImg} alt="Florida Decks and Patios" className="h-14 md:h-16 w-auto" />
          <span className="hidden sm:inline leading-tight">{company.name}</span>
          <span className="sm:hidden leading-tight">FD&P</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`whitespace-nowrap px-3 py-2 rounded-md text-sm font-semibold transition-colors ${
                location.pathname === link.path
                  ? "text-primary bg-primary/10"
                  : "text-foreground/80 hover:text-primary hover:bg-primary/5"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* Service Areas Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setAreasOpen(!areasOpen)}
              className={`whitespace-nowrap flex items-center gap-1 px-3 py-2 rounded-md text-sm font-semibold transition-colors ${
                isAreaActive
                  ? "text-primary bg-primary/10"
                  : "text-foreground/80 hover:text-primary hover:bg-primary/5"
              }`}
            >
              Areas
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${areasOpen ? "rotate-180" : ""}`} />
            </button>

            {areasOpen && (
              <div className="absolute top-full right-0 mt-2 w-80 bg-card border border-border rounded-lg shadow-lg overflow-hidden animate-fade-in z-50">
                <div className="p-4 grid grid-cols-2 gap-x-4 gap-y-2">
                  {cityPages.map((city) => (
                    <Link
                      key={city.slug}
                      to={`/areas/${city.slug}`}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        location.pathname === `/areas/${city.slug}`
                          ? "text-primary bg-primary/10"
                          : "text-foreground/80 hover:text-primary hover:bg-primary/5"
                      }`}
                    >
                      {city.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Right side: phone + CTA + mobile toggle */}
        <div className="flex items-center gap-3">
          <a
            href={phoneIsPlaceholder ? "/contact" : `tel:${company.phone}`}
            className="hidden md:inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-[hsl(var(--forest-dark))] transition-colors whitespace-nowrap"
          >
            <Phone className="h-4 w-4 shrink-0" />
            <span>{phoneIsPlaceholder ? "Call for Estimate" : company.phoneDisplay}</span>
          </a>
          <Link to={settings.ctaLink}>
            <Button size="default" className="hidden sm:inline-flex bg-amber text-charcoal hover:bg-amber-dark font-bold text-sm px-5 shadow-md whitespace-nowrap">
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

            {/* Mobile Service Areas */}
            <button
              onClick={() => setMobileAreasOpen(!mobileAreasOpen)}
              className={`flex items-center justify-between px-4 py-3 rounded-md text-base font-medium transition-colors ${
                isAreaActive
                  ? "text-primary bg-primary/10"
                  : "text-foreground/80 hover:text-primary hover:bg-primary/5"
              }`}
            >
              Service Areas
              <ChevronDown className={`h-4 w-4 transition-transform ${mobileAreasOpen ? "rotate-180" : ""}`} />
            </button>

            {mobileAreasOpen && (
              <div className="ml-4 flex flex-col gap-1">
                {cityPages.map((city) => (
                  <Link
                    key={city.slug}
                    to={`/areas/${city.slug}`}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${
                      location.pathname === `/areas/${city.slug}`
                        ? "text-primary bg-primary/10"
                        : "text-foreground/80 hover:text-primary hover:bg-primary/5"
                    }`}
                  >
                    <MapPin className="h-3.5 w-3.5" />
                    {city.name}
                  </Link>
                ))}
              </div>
            )}

            <a
              href={phoneIsPlaceholder ? "/contact" : `tel:${company.phone}`}
              className="flex items-center gap-2 px-4 py-3 text-base font-medium text-foreground/80"
            >
              <Phone className="h-4 w-4" />
              {phoneIsPlaceholder ? "Call for Estimate" : company.phoneDisplay}
            </a>
            <Link to={settings.ctaLink} className="mt-2">
              <Button className="w-full bg-primary text-primary-foreground hover:bg-[hsl(var(--forest-dark))] font-semibold">
                {settings.ctaText}
              </Button>
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
