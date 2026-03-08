import { useState, useRef, useCallback, useEffect } from "react";
import { GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import beforeImg from "@/assets/before-deck.jpg";
import afterImg from "@/assets/after-deck.jpg";

interface BeforeAfterSliderProps {
  beforeSrc?: string;
  afterSrc?: string;
  beforeAlt?: string;
  afterAlt?: string;
  className?: string;
}

export default function BeforeAfterSlider({
  beforeSrc = beforeImg,
  afterSrc = afterImg,
  beforeAlt = "Weathered deck before restoration",
  afterAlt = "Restored deck after professional refinishing",
  className,
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
    setIsDragging(true);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
  }, [updatePosition]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging) return;
    updatePosition(e.clientX);
  }, [isDragging, updatePosition]);

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Keyboard accessibility
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") setPosition((p) => Math.max(0, p - 2));
    if (e.key === "ArrowRight") setPosition((p) => Math.min(100, p + 2));
  }, []);

  return (
    <div className={cn("w-full max-w-4xl mx-auto", className)}>
      <div
        ref={containerRef}
        className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border-2 border-border shadow-lg select-none touch-none cursor-col-resize"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        role="slider"
        aria-label="Before and after comparison slider"
        aria-valuenow={Math.round(position)}
        aria-valuemin={0}
        aria-valuemax={100}
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        {/* After image (full, underneath) */}
        <img
          src={afterSrc}
          alt={afterAlt}
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />

        {/* Before image (clipped) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${position}%` }}
        >
          <img
            src={beforeSrc}
            alt={beforeAlt}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ width: containerRef.current?.offsetWidth || "100%", maxWidth: "none" }}
            draggable={false}
          />
        </div>

        {/* Slider line */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-primary-foreground/90 shadow-[0_0_8px_rgba(0,0,0,0.4)]"
          style={{ left: `${position}%`, transform: "translateX(-50%)" }}
        >
          {/* Handle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-12 w-8 rounded-lg bg-card border-2 border-primary shadow-[0_4px_16px_rgba(0,0,0,0.3)] flex items-center justify-center">
            <GripVertical className="h-5 w-5 text-primary" />
          </div>
        </div>

        {/* Labels */}
        <span
          className={cn(
            "absolute top-3 left-3 bg-charcoal/70 text-primary-foreground text-xs font-semibold px-2.5 py-1 rounded-md backdrop-blur-sm transition-opacity duration-300",
            isDragging ? "opacity-0" : "opacity-100"
          )}
        >
          Before
        </span>
        <span
          className={cn(
            "absolute top-3 right-3 bg-primary/80 text-primary-foreground text-xs font-semibold px-2.5 py-1 rounded-md backdrop-blur-sm transition-opacity duration-300",
            isDragging ? "opacity-0" : "opacity-100"
          )}
        >
          After
        </span>
      </div>
    </div>
  );
}
