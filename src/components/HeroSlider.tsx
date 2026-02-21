import { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { heroSlides } from "@/data/siteData";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroSlider() {
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
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + heroSlides.length) % heroSlides.length);
  }, [current, goTo]);

  // Auto-rotate
  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setInterval(next, 6000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [next, isPaused]);

  // Pause on tab hidden
  useEffect(() => {
    const handler = () => setIsPaused(document.hidden);
    document.addEventListener("visibilitychange", handler);
    return () => document.removeEventListener("visibilitychange", handler);
  }, []);

  const slide = heroSlides[current];

  return (
    <section
      className="relative w-full overflow-hidden hero-section"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-roledescription="carousel"
      aria-label="Featured outdoor living projects"
    >
      {/* Background images */}
      {heroSlides.map((s, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={i !== current}
        >
          <img
            key={i === current ? `kb-${current}-${Date.now()}` : `img-${i}`}
            src={s.image}
            alt={s.alt}
            className={`w-full h-full object-cover ${i === current ? "animate-ken-burns" : ""}`}
            loading={i === 0 ? "eager" : "lazy"}
          />
        </div>
      ))}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-charcoal/60" />

      {/* Flash effect */}
      {isFlashing && (
        <div className="absolute inset-0 hero-flash bg-warm-white/20 pointer-events-none z-10" />
      )}

      {/* Content — left-aligned desktop, centered mobile */}
      <div className="relative z-20 flex items-center h-full px-6 md:px-12 lg:px-20">
        <div className="w-full max-w-2xl text-center md:text-left">
          <h1
            key={`h-${current}`}
            className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-primary-foreground animate-fade-in-up hero-headline"
          >
            {slide.headline}
          </h1>
          <p
            key={`p-${current}`}
            className="text-base sm:text-lg md:text-xl text-primary-foreground/80 max-w-xl mt-5 md:mt-6 animate-fade-in-up hero-subheadline mx-auto md:mx-0"
            style={{ animationDelay: "0.1s", animationDuration: "0.5s" }}
          >
            {slide.subheadline}
          </p>
          <div
            className="flex flex-col sm:flex-row gap-4 mt-8 md:mt-10 animate-fade-in-up justify-center md:justify-start"
            style={{ animationDelay: "0.2s", animationDuration: "0.5s" }}
          >
            <Link to="/contact">
              <Button
                size="lg"
                className="bg-amber text-charcoal hover:bg-amber-dark font-bold text-base px-8 h-12 rounded-lg shadow-lg"
              >
                Get Free Inspection
              </Button>
            </Link>
            <Link to="/portfolio">
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground/30 text-primary-foreground bg-primary-foreground/5 hover:bg-primary-foreground/15 font-semibold text-base px-8 h-12 rounded-lg"
              >
                View Our Portfolio
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Arrow controls */}
      <button
        onClick={prev}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-charcoal/30 text-primary-foreground/70 hover:bg-charcoal/50 hover:text-primary-foreground transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-charcoal/30 text-primary-foreground/70 hover:bg-charcoal/50 hover:text-primary-foreground transition-all"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2.5">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              i === current ? "w-9 bg-amber" : "w-2.5 bg-primary-foreground/35 hover:bg-primary-foreground/55"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
