import { createContext, useContext, useState, useCallback, useEffect, useRef, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
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
  { label: "FAQ", path: "/faq" },
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
      return parseSiteData(parsed);
    }
  } catch {}
  return getDefaults();
}

function getDefaults(): SiteData {
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

function parseSiteData(parsed: any): SiteData {
  const d = getDefaults();
  return {
    company: parsed.company ?? d.company,
    heroSlides: parsed.heroSlides ?? d.heroSlides,
    services: parsed.services ?? d.services,
    portfolioProjects: parsed.portfolioProjects ?? d.portfolioProjects,
    blogPosts: parsed.blogPosts ?? d.blogPosts,
    testimonials: parsed.testimonials ?? d.testimonials,
    trustBadges: parsed.trustBadges ?? d.trustBadges,
    navLinks: parsed.navLinks ?? d.navLinks,
    settings: parsed.settings ?? d.settings,
  };
}

const SiteDataContext = createContext<SiteDataContextType | null>(null);

export function SiteDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<SiteData>(getInitialData);
  const initialLoadDone = useRef(false);

  // On mount: try to load from Supabase first, then fall back to localStorage / defaults
  useEffect(() => {
    async function loadFromCloud() {
      try {
        const { data: row } = await supabase
          .from("site_config")
          .select("data")
          .eq("id", "main")
          .maybeSingle();

        if (row?.data && typeof row.data === "object") {
          const cloudData = parseSiteData(row.data as any);
          setData(cloudData);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(cloudData));
        }
      } catch {
        // Supabase not available — localStorage / defaults already loaded
      }
      initialLoadDone.current = true;
    }
    loadFromCloud();
  }, []);

  // Cross-tab sync: listen for localStorage changes from other tabs
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          setData(parseSiteData(JSON.parse(e.newValue)));
        } catch {}
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const persistUpdate = useCallback(<K extends keyof SiteData>(key: K, value: SiteData[K]) => {
    setData(prev => {
      const n = { ...prev, [key]: value };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(n));
      // Also upsert to Supabase (fire-and-forget)
      supabase.from("site_config").upsert({
        id: "main",
        data: n as any,
        updated_at: new Date().toISOString(),
      }).then(({ error }) => {
        if (error) console.warn("site_config upsert failed (may need auth):", error.message);
      });
      return n;
    });
  }, []);

  const updateCompany = useCallback((company: CompanyInfo) => persistUpdate("company", company), [persistUpdate]);
  const updateHeroSlides = useCallback((heroSlides: HeroSlide[]) => persistUpdate("heroSlides", heroSlides), [persistUpdate]);
  const updateServices = useCallback((services: Service[]) => persistUpdate("services", services), [persistUpdate]);
  const updatePortfolio = useCallback((portfolioProjects: PortfolioProject[]) => persistUpdate("portfolioProjects", portfolioProjects), [persistUpdate]);
  const updateBlogPosts = useCallback((blogPosts: BlogPost[]) => persistUpdate("blogPosts", blogPosts), [persistUpdate]);
  const updateTestimonials = useCallback((testimonials: Testimonial[]) => persistUpdate("testimonials", testimonials), [persistUpdate]);
  const updateTrustBadges = useCallback((trustBadges: TrustBadge[]) => persistUpdate("trustBadges", trustBadges), [persistUpdate]);
  const updateNavLinks = useCallback((navLinks: NavLink[]) => persistUpdate("navLinks", navLinks), [persistUpdate]);
  const updateSettings = useCallback((settings: SiteSettings) => persistUpdate("settings", settings), [persistUpdate]);

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
