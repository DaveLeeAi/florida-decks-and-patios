import { useState, useRef, useCallback } from "react";
import { GripVertical, MapPin, Layers } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import beforeImg from "@/assets/before-deck.jpg";
import afterImg from "@/assets/after-deck.jpg";

interface BeforeAfterSliderProps {
  beforeSrc?: string;
  afterSrc?: string;
  beforeAlt?: string;
  afterAlt?: string;
  location?: string;
  materials?: string;
  className?: string;
}

export default function BeforeAfterSlider({
  beforeSrc = beforeImg,
  afterSrc = afterImg,
  beforeAlt = "Weathered deck before restoration",
  afterAlt = "Restored deck after professional refinishing",
  location = "Tampa, FL",
  materials = "Composite decking with hidden fasteners",
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
    <Card className={cn("w-full max-w-4xl mx-auto overflow-hidden", className)}>
      <CardContent className="p-0">
        <div
          ref={containerRef}
          className="relative w-full aspect-[4/3] select-none touch-none cursor-col-resize"
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
          <img src={afterSrc} alt={afterAlt} className="absolute inset-0 w-full h-full object-cover" draggable={false} />
          <div className="absolute inset-0 overflow-hidden" style={{ width: `${position}%` }}>
            <img src={beforeSrc} alt={beforeAlt} className="absolute inset-0 w-full h-full object-cover" style={{ width: containerRef.current?.offsetWidth || "100%", maxWidth: "none" }} draggable={false} />
          </div>
          <div className="absolute top-0 bottom-0 w-0.5 bg-primary-foreground/90 shadow-[0_0_8px_rgba(0,0,0,0.4)]" style={{ left: `${position}%`, transform: "translateX(-50%)" }}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-12 w-8 rounded-lg bg-card border-2 border-primary shadow-[0_4px_16px_rgba(0,0,0,0.3)] flex items-center justify-center">
              <GripVertical className="h-5 w-5 text-primary" />
            </div>
          </div>
          <span className={cn("absolute top-3 left-3 bg-charcoal/70 text-primary-foreground text-xs font-semibold px-2.5 py-1 rounded-md backdrop-blur-sm transition-opacity duration-300", isDragging ? "opacity-0" : "opacity-100")}>Before</span>
          <span className={cn("absolute top-3 right-3 bg-primary/80 text-primary-foreground text-xs font-semibold px-2.5 py-1 rounded-md backdrop-blur-sm transition-opacity duration-300", isDragging ? "opacity-0" : "opacity-100")}>After</span>
        </div>

        {/* Caption */}
        <div className="px-5 py-4 border-t border-border bg-card">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 text-primary shrink-0" />
              <span>{location}</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Layers className="h-4 w-4 text-primary shrink-0" />
              <span>{materials}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
