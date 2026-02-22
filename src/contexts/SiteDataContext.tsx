import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import * as defaults from "@/data/siteData";

// Types
export interface CompanyInfo {
  name: string;
  phone: string;
  phoneDisplay: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  tagline: string;
}

export interface HeroSlide {
  image: string;
  alt: string;
  headline: string;
  subheadline: string;
}

export interface Service {
  slug: string;
  title: string;
  shortTitle: string;
  icon: string;
  description: string;
  longDescription: string;
  features: string[];
  priceRange: string;
}

export interface PortfolioProject {
  id: number;
  title: string;
  category: string;
  description: string;
  location: string;
  image: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  content: string;
}

export interface Testimonial {
  name: string;
  location: string;
  text: string;
  rating: number;
  note: string;
}

export interface TrustBadge {
  icon: string;
  title: string;
  text: string;
}

export interface NavLink {
  label: string;
  path: string;
}

export interface SiteSettings {
  ctaText: string;
  ctaLink: string;
  footerText: string;
}

interface SiteData {
  company: CompanyInfo;
  heroSlides: HeroSlide[];
  services: Service[];
  portfolioProjects: PortfolioProject[];
  blogPosts: BlogPost[];
  testimonials: Testimonial[];
  trustBadges: TrustBadge[];
  navLinks: NavLink[];
  settings: SiteSettings;
}

interface SiteDataContextType extends SiteData {
  updateCompany: (data: CompanyInfo) => void;
  updateHeroSlides: (data: HeroSlide[]) => void;
  updateServices: (data: Service[]) => void;
  updatePortfolio: (data: PortfolioProject[]) => void;
  updateBlogPosts: (data: BlogPost[]) => void;
  updateTestimonials: (data: Testimonial[]) => void;
  updateTrustBadges: (data: TrustBadge[]) => void;
  updateNavLinks: (data: NavLink[]) => void;
  updateSettings: (data: SiteSettings) => void;
}

const STORAGE_KEY = "siteData";

const defaultNavLinks: NavLink[] = [
  { label: "Home", path: "/" },
  { label: "Services", path: "/services" },
  { label: "Tools", path: "/tools" },
  { label: "Portfolio", path: "/portfolio" },
  { label: "Blog", path: "/blog" },
  { label: "Contact", path: "/contact" },
];

const defaultSettings: SiteSettings = {
  ctaText: "Get Free Estimate",
  ctaLink: "/contact",
  footerText: "Licensed, insured, and committed to quality craftsmanship for every outdoor project.",
};

function getInitialData(): SiteData {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        company: parsed.company ?? defaults.COMPANY,
        heroSlides: parsed.heroSlides ?? defaults.heroSlides,
        services: parsed.services ?? defaults.services,
        portfolioProjects: parsed.portfolioProjects ?? defaults.portfolioProjects,
        blogPosts: parsed.blogPosts ?? defaults.blogPosts,
        testimonials: parsed.testimonials ?? defaults.testimonials,
        trustBadges: parsed.trustBadges ?? defaults.trustBadges,
        navLinks: parsed.navLinks ?? defaultNavLinks,
        settings: parsed.settings ?? defaultSettings,
      };
    }
  } catch {}
  return {
    company: defaults.COMPANY,
    heroSlides: defaults.heroSlides as HeroSlide[],
    services: defaults.services as Service[],
    portfolioProjects: defaults.portfolioProjects as PortfolioProject[],
    blogPosts: defaults.blogPosts as BlogPost[],
    testimonials: defaults.testimonials as Testimonial[],
    trustBadges: defaults.trustBadges as TrustBadge[],
    navLinks: defaultNavLinks,
    settings: defaultSettings,
  };
}

const SiteDataContext = createContext<SiteDataContextType | null>(null);

export function SiteDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<SiteData>(getInitialData);

  const persist = useCallback((newData: SiteData) => {
    setData(newData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
  }, []);

  const updateCompany = useCallback((company: CompanyInfo) => {
    setData(prev => { const n = { ...prev, company }; localStorage.setItem(STORAGE_KEY, JSON.stringify(n)); return n; });
  }, []);

  const updateHeroSlides = useCallback((heroSlides: HeroSlide[]) => {
    setData(prev => { const n = { ...prev, heroSlides }; localStorage.setItem(STORAGE_KEY, JSON.stringify(n)); return n; });
  }, []);

  const updateServices = useCallback((services: Service[]) => {
    setData(prev => { const n = { ...prev, services }; localStorage.setItem(STORAGE_KEY, JSON.stringify(n)); return n; });
  }, []);

  const updatePortfolio = useCallback((portfolioProjects: PortfolioProject[]) => {
    setData(prev => { const n = { ...prev, portfolioProjects }; localStorage.setItem(STORAGE_KEY, JSON.stringify(n)); return n; });
  }, []);

  const updateBlogPosts = useCallback((blogPosts: BlogPost[]) => {
    setData(prev => { const n = { ...prev, blogPosts }; localStorage.setItem(STORAGE_KEY, JSON.stringify(n)); return n; });
  }, []);

  const updateTestimonials = useCallback((testimonials: Testimonial[]) => {
    setData(prev => { const n = { ...prev, testimonials }; localStorage.setItem(STORAGE_KEY, JSON.stringify(n)); return n; });
  }, []);

  const updateTrustBadges = useCallback((trustBadges: TrustBadge[]) => {
    setData(prev => { const n = { ...prev, trustBadges }; localStorage.setItem(STORAGE_KEY, JSON.stringify(n)); return n; });
  }, []);

  const updateNavLinks = useCallback((navLinks: NavLink[]) => {
    setData(prev => { const n = { ...prev, navLinks }; localStorage.setItem(STORAGE_KEY, JSON.stringify(n)); return n; });
  }, []);

  const updateSettings = useCallback((settings: SiteSettings) => {
    setData(prev => { const n = { ...prev, settings }; localStorage.setItem(STORAGE_KEY, JSON.stringify(n)); return n; });
  }, []);

  return (
    <SiteDataContext.Provider
      value={{
        ...data,
        updateCompany,
        updateHeroSlides,
        updateServices,
        updatePortfolio,
        updateBlogPosts,
        updateTestimonials,
        updateTrustBadges,
        updateNavLinks,
        updateSettings,
      }}
    >
      {children}
    </SiteDataContext.Provider>
  );
}

export function useSiteData() {
  const ctx = useContext(SiteDataContext);
  if (!ctx) throw new Error("useSiteData must be used within SiteDataProvider");
  return ctx;
}
