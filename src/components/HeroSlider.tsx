import { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { useSiteData } from "@/contexts/SiteDataContext";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroSlider() {
  const { heroSlides, settings } = useSiteData();
  const [current, setCurrent] = useState(0);
  const [isFlashing, setIsFlashing] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const goTo = useCallback((index: number) => {
    if (!prefersReducedMotion.current) {
      setIsFlashing(true);
      setTimeout(() => setIsFlashing(false), 400);
    }
    setCurrent(index);
  }, []);

  const next = useCallback(() => {
    goTo((current + 1) % heroSlides.length);
  }, [current, goTo, heroSlides.length]);

  const prev = useCallback(() => {
    goTo((current - 1 + heroSlides.length) % heroSlides.length);
  }, [current, goTo, heroSlides.length]);

  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setInterval(next, 14000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [next, isPaused]);

  useEffect(() => {
    const handler = () => setIsPaused(document.hidden);
    document.addEventListener("visibilitychange", handler);
    return () => document.removeEventListener("visibilitychange", handler);
  }, []);

  if (!heroSlides.length) return null;
  const slide = heroSlides[current % heroSlides.length];

  return (
    <section
      className="relative w-full h-[90vh] overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-roledescription="carousel"
      aria-label="Featured outdoor living projects"
    >
      {heroSlides.map((s, i) => (
        <div key={i} className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${i === current ? "opacity-100" : "opacity-0"}`} aria-hidden={i !== current}>
          <img
            key={i === current ? `kb-${current}-${Date.now()}` : `img-${i}`}
            src={s.image}
            alt={s.alt}
            className={`w-full h-full object-cover ${i === current ? "animate-ken-burns" : ""}`}
            loading={i === 0 ? "eager" : "lazy"}
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-charcoal/55" />

      {isFlashing && <div className="absolute inset-0 hero-flash bg-warm-white/20 pointer-events-none z-10" />}

      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4">
        <h1 key={`h-${current}`} className="font-heading font-bold text-base md:text-lg lg:text-xl text-primary-foreground mb-1 md:mb-2 animate-fade-in-up" style={{ animationDuration: "0.5s" }}>
          {slide.headline}
        </h1>
        <p key={`p-${current}`} className="text-xs md:text-sm text-primary-foreground/85 max-w-md mb-3 animate-fade-in-up" style={{ animationDelay: "0.1s", animationDuration: "0.5s" }}>
          {slide.subheadline}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: "0.2s", animationDuration: "0.5s" }}>
          <Link to={settings.ctaLink}>
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-forest-dark font-semibold text-sm px-6 h-9 shadow-lg">
              {settings.ctaText}
            </Button>
          </Link>
          <Link to="/portfolio">
            <Button size="sm" variant="outline" className="border-primary-foreground/40 text-primary-foreground bg-primary-foreground/10 hover:bg-primary-foreground/20 font-semibold text-sm px-6 h-9">
              View Our Portfolio
            </Button>
          </Link>
        </div>
      </div>

      <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-charcoal/40 text-primary-foreground/80 hover:bg-charcoal/60 transition-colors" aria-label="Previous slide">
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-charcoal/40 text-primary-foreground/80 hover:bg-charcoal/60 transition-colors" aria-label="Next slide">
        <ChevronRight className="h-6 w-6" />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {heroSlides.map((_, i) => (
          <button key={i} onClick={() => goTo(i)} className={`h-2.5 rounded-full transition-all duration-300 ${i === current ? "w-8 bg-amber" : "w-2.5 bg-primary-foreground/40 hover:bg-primary-foreground/60"}`} aria-label={`Go to slide ${i + 1}`} />
        ))}
      </div>
    </section>
  );
}
