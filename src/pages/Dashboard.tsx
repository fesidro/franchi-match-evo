import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { ProfileSummary } from "@/components/dashboard/ProfileSummary";
import { FranchiseMatchCard } from "@/components/dashboard/FranchiseMatchCard";
import { Search } from "lucide-react";

const mockFranchises = [
  { name: "Cresci e Perdi", segment: "Alimentação", investment: "R$ 120.000", rating: 4, units: "380" },
  { name: "CleanPro", segment: "Serviços", investment: "R$ 85.000", rating: 5, units: "210" },
  { name: "TechFix", segment: "Tecnologia", investment: "R$ 95.000", rating: 4, units: "150" },
  { name: "PetAmigo", segment: "Pet Shop", investment: "R$ 110.000", rating: 3, units: "420" },
  { name: "EduPlus", segment: "Educação", investment: "R$ 200.000", rating: 5, units: "95" },
  { name: "FitZone", segment: "Saúde e Bem-estar", investment: "R$ 180.000", rating: 4, units: "270" },
];

export default function Dashboard() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-muted/30">
        <DashboardSidebar />

        <div className="flex-1 flex flex-col min-w-0">
          {/* Top bar */}
          <header className="sticky top-0 z-10 h-14 flex items-center gap-4 border-b border-border bg-card/80 backdrop-blur-sm px-4 md:px-6">
            <SidebarTrigger className="shrink-0" />
            <h1 className="text-base font-semibold text-foreground !text-base">
              Visão Geral do seu Perfil
            </h1>

            <div className="ml-auto flex items-center gap-3">
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Buscar franquias..."
                  className="h-9 w-56 rounded-md border border-input bg-background pl-9 pr-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-semibold">
                JP
              </div>
            </div>
          </header>

          {/* Main content */}
          <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-8">
            {/* Profile summary badges */}
            <ProfileSummary />

            {/* Matches section */}
            <section className="space-y-4">
              <div>
                <h2 className="text-2xl font-bold text-foreground !text-2xl">Meus Matches</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Franquias que combinam com o seu perfil. Analise os riscos antes de investir.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {mockFranchises.map((f) => (
                  <FranchiseMatchCard key={f.name} {...f} />
                ))}
              </div>
            </section>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
