import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PremiumFranchiseCard } from "./PremiumFranchiseCard";

interface Franchise {
  name: string;
  segment: string;
  investment: string;
  logoUrl?: string;
  rating?: number;
  units?: string;
  royalties?: string;
}

interface Carousel3DProps {
  franchises: Franchise[];
}

export function Carousel3D({ franchises }: Carousel3DProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = franchises.length;

  const prev = () => setActiveIndex((i) => (i - 1 + total) % total);
  const next = () => setActiveIndex((i) => (i + 1) % total);

  const getCardStyle = (index: number) => {
    let diff = index - activeIndex;
    // Wrap around
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    const absDiff = Math.abs(diff);
    const maxVisible = 3;

    if (absDiff > maxVisible) {
      return { opacity: 0, transform: "scale(0.5) translateX(0px)", zIndex: 0, pointerEvents: "none" as const, filter: "blur(8px)" };
    }

    const translateX = diff * 220;
    const translateZ = -absDiff * 120;
    const rotateY = diff * -12;
    const scale = 1 - absDiff * 0.12;
    const opacity = 1 - absDiff * 0.25;
    const blur = absDiff > 1 ? (absDiff - 1) * 3 : 0;

    return {
      transform: `perspective(1200px) translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
      opacity,
      zIndex: maxVisible - absDiff,
      filter: blur > 0 ? `blur(${blur}px)` : "none",
      pointerEvents: (absDiff === 0 ? "auto" : "none") as "auto" | "none",
    };
  };

  return (
    <div className="relative flex flex-1 flex-col items-center justify-center">
      {/* Carousel container */}
      <div className="relative flex h-[420px] w-full items-center justify-center" style={{ perspective: "1200px" }}>
        {franchises.map((f, i) => (
          <div
            key={f.name}
            className="absolute transition-all duration-500 ease-out"
            style={getCardStyle(i)}
          >
            <PremiumFranchiseCard {...f} isFocused={i === activeIndex} />
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="mt-6 flex items-center gap-6">
        <button
          onClick={prev}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/20 bg-background/80 backdrop-blur-sm transition-smooth hover:border-gold/40 hover:shadow-md"
        >
          <ChevronLeft className="h-4 w-4 text-gold-dark" />
        </button>

        {/* Dots */}
        <div className="flex items-center gap-2">
          {franchises.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? "w-6 bg-gold"
                  : "w-1.5 bg-gold/20 hover:bg-gold/40"
              }`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/20 bg-background/80 backdrop-blur-sm transition-smooth hover:border-gold/40 hover:shadow-md"
        >
          <ChevronRight className="h-4 w-4 text-gold-dark" />
        </button>
      </div>
    </div>
  );
}
