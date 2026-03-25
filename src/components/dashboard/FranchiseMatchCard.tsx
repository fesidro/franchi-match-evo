import { Lock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FranchiseMatchCardProps {
  name: string;
  segment: string;
  investment: string;
  logoUrl?: string;
  rating?: number;
  units?: string;
}

export function FranchiseMatchCard({
  name,
  segment,
  investment,
  logoUrl,
  rating = 4,
  units,
}: FranchiseMatchCardProps) {
  return (
    <div className="group flex flex-col rounded-lg border border-border bg-card shadow-sm transition-smooth hover:shadow-lg hover:-translate-y-0.5 overflow-hidden">
      {/* Logo area */}
      <div className="flex items-center justify-center h-36 bg-muted/50 border-b border-border p-6">
        {logoUrl ? (
          <img src={logoUrl} alt={name} className="max-h-20 max-w-full object-contain" />
        ) : (
          <div className="h-16 w-16 rounded-lg bg-primary/10 flex items-center justify-center">
            <span className="text-2xl font-bold text-primary">
              {name.charAt(0)}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            {segment}
          </p>
          <h3 className="text-lg font-semibold text-foreground mt-1 !text-lg">{name}</h3>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-3.5 w-3.5 ${i < rating ? "fill-secondary text-secondary" : "text-border"}`}
            />
          ))}
          {units && (
            <span className="text-xs text-muted-foreground ml-2">{units} unidades</span>
          )}
        </div>

        {/* Investment */}
        <div className="mt-auto pt-2 border-t border-border">
          <p className="text-xs text-muted-foreground">Investimento Inicial</p>
          <p className="text-lg font-bold text-primary">
            a partir de {investment}
          </p>
        </div>
      </div>

      {/* CTA */}
      <Button
        variant="cta"
        className="rounded-none h-12 text-sm gap-2 hover:brightness-110 hover:shadow-lg"
      >
        <Lock className="h-4 w-4" />
        Desbloquear Raio-X de Risco (Pacote 2)
      </Button>
    </div>
  );
}
