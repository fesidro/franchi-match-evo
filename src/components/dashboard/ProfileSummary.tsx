import { DollarSign, Clock, Briefcase, TrendingUp } from "lucide-react";

const badges = [
  {
    icon: DollarSign,
    label: "Capital Disponível",
    value: "R$ 150.000",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Clock,
    label: "Nível de Dedicação",
    value: "Integral",
    color: "bg-secondary/10 text-secondary",
  },
  {
    icon: Briefcase,
    label: "Experiência",
    value: "Intermediário",
    color: "bg-emerald-500/10 text-emerald-600",
  },
  {
    icon: TrendingUp,
    label: "Matches Encontrados",
    value: "12",
    color: "bg-violet-500/10 text-violet-600",
  },
];

export function ProfileSummary() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {badges.map((badge) => (
        <div
          key={badge.label}
          className="flex items-center gap-4 rounded-lg border border-border bg-card p-4 shadow-sm transition-smooth hover:shadow-md"
        >
          <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${badge.color}`}>
            <badge.icon className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground truncate">{badge.label}</p>
            <p className="text-base font-semibold text-foreground truncate">{badge.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
