import { useState } from "react";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { Carousel3D } from "@/components/dashboard/Carousel3D";
import { Menu } from "lucide-react";

const mockFranchises = [
  { name: "Cresci e Perdi", segment: "Alimentação", investment: "R$ 120.000", rating: 4, units: "380", royalties: "5%" },
  { name: "CleanPro", segment: "Serviços", investment: "R$ 85.000", rating: 5, units: "210", royalties: "6%" },
  { name: "TechFix", segment: "Tecnologia", investment: "R$ 95.000", rating: 4, units: "150", royalties: "4%" },
  { name: "PetAmigo", segment: "Pet Shop", investment: "R$ 110.000", rating: 3, units: "420", royalties: "5.5%" },
  { name: "EduPlus", segment: "Educação", investment: "R$ 200.000", rating: 5, units: "95", royalties: "7%" },
  { name: "FitZone", segment: "Saúde e Bem-estar", investment: "R$ 180.000", rating: 4, units: "270", royalties: "6%" },
];

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background">
      {/* Subtle reflective floor gradient */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-muted/40 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(217_91%_35%_/_0.03)_0%,_transparent_70%)]" />
      </div>

      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-5 left-5 z-50 flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background/80 backdrop-blur-md lg:hidden"
      >
        <Menu className="h-5 w-5 text-primary" />
      </button>

      {/* Sidebar */}
      <DashboardSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <main className="relative z-10 flex min-h-screen flex-col px-4 pb-12 pt-20 lg:pl-72 lg:pr-8 lg:pt-8">
        {/* Header */}
        <header className="mb-8 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
              Área exclusiva
            </p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight text-foreground md:text-4xl !text-3xl md:!text-4xl">
              Área do <span className="text-primary">Franqueado</span>
            </h1>
          </div>

          {/* Investor Profile */}
          <div className="relative rounded-xl border border-border bg-background/60 px-6 py-4 backdrop-blur-sm">
            <div className="absolute -top-px left-6 right-6 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
            <p className="text-sm font-semibold text-foreground">Alexandre Pereira</p>
            <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-xs text-muted-foreground">
              <span>Capital Disponível: <strong className="text-primary">R$ 150.000</strong></span>
              <span>Dedicação: <strong className="text-foreground">Integral</strong></span>
            </div>
          </div>
        </header>

        {/* Section title */}
        <div className="mb-6 text-center">
          <h2 className="text-xl font-bold tracking-tight text-foreground !text-xl">
            Meus <span className="text-primary">Matches</span>
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Franquias que combinam com o seu perfil. Analise os riscos antes de investir.
          </p>
        </div>

        {/* 3D Carousel */}
        <Carousel3D franchises={mockFranchises} />
      </main>
    </div>
  );
}
