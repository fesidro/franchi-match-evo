import { Lock, Star } from "lucide-react";

interface PremiumFranchiseCardProps {
  name: string;
  segment: string;
  investment: string;
  logoUrl?: string;
  rating?: number;
  units?: string;
  royalties?: string;
  isFocused?: boolean;
}

export function PremiumFranchiseCard({
  name,
  segment,
  investment,
  logoUrl,
  rating = 4,
  units,
  royalties,
  isFocused = false,
}: PremiumFranchiseCardProps) {
  return (
    <div
      className={`
        w-[280px] flex flex-col rounded-xl
        border border-border bg-background
        shadow-[0_20px_60px_-15px_hsl(217_91%_35%_/_0.1),_0_8px_24px_-8px_hsl(0_0%_0%_/_0.06)]
        transition-all duration-500
        ${isFocused ? "border-primary/30 shadow-[0_25px_80px_-15px_hsl(217_91%_35%_/_0.15),_0_12px_32px_-8px_hsl(0_0%_0%_/_0.08)]" : ""}
      `}
    >
      {/* Blue top border accent */}
      <div className="absolute -top-px left-6 right-6 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />

      {/* Logo area */}
      <div className="flex items-center justify-center py-6">
        {logoUrl ? (
          <img src={logoUrl} alt={name} className="max-h-14 max-w-[120px] object-contain" />
        ) : (
          <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-primary/15 bg-primary/5">
            <span className="text-xl font-bold text-primary">{name.charAt(0)}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col px-5 pb-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-primary">
          {segment}
        </p>
        <h3 className="mt-1 text-base font-semibold text-foreground !text-base">{name}</h3>

        {/* Rating */}
        <div className="mt-2 flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-3 w-3 ${i < rating ? "fill-secondary text-secondary" : "text-border"}`}
            />
          ))}
          {units && (
            <span className="ml-2 text-[10px] text-muted-foreground">{units} unidades</span>
          )}
        </div>

        {/* Info row */}
        <div className="mt-3 flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground">
          <div>
            <p className="text-[10px] text-muted-foreground/70">Investimento</p>
            <p className="text-sm font-bold text-primary-dark">{investment}</p>
          </div>
          {royalties && (
            <div className="text-right">
              <p className="text-[10px] text-muted-foreground/70">Royalties</p>
              <p className="text-sm font-semibold text-foreground">{royalties}</p>
            </div>
          )}
        </div>
      </div>

      {/* Raio-X premium lock section */}
      <div className="mx-3 mb-3 rounded-xl border border-primary/10 bg-primary/5 p-3">
        <div className="flex items-center gap-2 mb-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
            <Lock className="h-3 w-3 text-primary" />
          </div>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">
            Conteúdo Premium
          </span>
        </div>
        <button className="w-full rounded-lg bg-secondary py-2 text-xs font-semibold text-secondary-foreground shadow-[0_4px_12px_hsl(25_95%_53%_/_0.3)] transition-all duration-200 hover:bg-secondary-light hover:shadow-[0_6px_20px_hsl(25_95%_53%_/_0.4)]">
          Desbloquear Raio-X de Risco
        </button>
      </div>
    </div>
  );
}
