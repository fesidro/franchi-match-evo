import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, X, Info, Star, ArrowRight, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

interface Franchise {
  id: number;
  name: string;
  description: string;
  segment: string;
  investment: string;
  payback: string;
  units: string;
}

const mockFranchises: Franchise[] = [
  {
    id: 1,
    name: "Franquia de Alimentação Premium",
    description: "Uma oportunidade única no segmento de alimentação saudável e de alta qualidade",
    segment: "Alimentação",
    investment: "R$ 150.000",
    payback: "24 meses",
    units: "250+"
  },
  {
    id: 2,
    name: "Franquia de Serviços Automotivos",
    description: "Negócio consolidado no mercado automotivo com excelente retorno",
    segment: "Automotivo",
    investment: "R$ 200.000",
    payback: "18 meses",
    units: "180+"
  },
  {
    id: 3,
    name: "Franquia de Educação Infantil",
    description: "Marca reconhecida nacionalmente no segmento de educação para crianças",
    segment: "Educação",
    investment: "R$ 300.000",
    payback: "30 meses",
    units: "420+"
  },
  {
    id: 4,
    name: "Franquia de Beleza e Estética",
    description: "Salão de beleza moderno com produtos exclusivos e alta demanda",
    segment: "Beleza",
    investment: "R$ 120.000",
    payback: "20 meses",
    units: "310+"
  },
  {
    id: 5,
    name: "Franquia de Academia Fitness",
    description: "Rede de academias com equipamentos de ponta e metodologia exclusiva",
    segment: "Fitness",
    investment: "R$ 400.000",
    payback: "36 meses",
    units: "150+"
  }
];

const Match = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [favorites, setFavorites] = useState<Franchise[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const currentFranchise = mockFranchises[currentIndex];

  const handleFavorite = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setFavorites([...favorites, currentFranchise]);
    
    setTimeout(() => {
      setCurrentIndex((currentIndex + 1) % mockFranchises.length);
      setIsAnimating(false);
    }, 500);
  };

  const handleNext = () => {
    if (isAnimating) return;
    setCurrentIndex((currentIndex + 1) % mockFranchises.length);
  };

  const handleRemoveFavorite = (id: number) => {
    setFavorites(favorites.filter(fav => fav.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-gradient">
            FranchiMatch
          </Link>
          <Button variant="outline" asChild>
            <Link to="/">Voltar ao Início</Link>
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-[1fr,320px] gap-8 max-w-7xl mx-auto">
          {/* Main Card Area */}
          <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gradient">
              Encontre Sua Franquia Ideal
            </h1>

            {/* Franchise Card */}
            <Card 
              className={`w-full max-w-md shadow-2xl border-2 transition-all duration-500 ${
                isAnimating ? 'opacity-0 scale-75 translate-x-96' : 'animate-scale-in'
              }`}
            >
              <CardContent className="p-0">
                {/* Logo Placeholder */}
                <div className="h-64 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center border-b">
                  <div className="w-32 h-32 bg-background rounded-lg shadow-lg flex items-center justify-center">
                    <span className="text-4xl font-bold text-muted-foreground">Logo</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-foreground">{currentFranchise.name}</h3>
                    <p className="text-muted-foreground">{currentFranchise.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 py-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Segmento</p>
                      <p className="font-semibold text-foreground">{currentFranchise.segment}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Investimento</p>
                      <p className="font-semibold text-foreground">{currentFranchise.investment}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Payback Médio</p>
                      <p className="font-semibold text-foreground">{currentFranchise.payback}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Unidades</p>
                      <p className="font-semibold text-foreground">{currentFranchise.units}</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-3 pt-4">
                    <Button variant="outline" className="gap-2">
                      <Info className="h-4 w-4" />
                      Saber mais
                    </Button>
                    <Button 
                      variant="outline" 
                      className="gap-2 border-destructive/50 text-destructive hover:bg-destructive hover:text-destructive-foreground"
                      onClick={handleNext}
                    >
                      <X className="h-4 w-4" />
                      Não gostei
                    </Button>
                    <Button variant="hero" className="gap-2" onClick={handleNext}>
                      <Heart className="h-4 w-4" />
                      Gostei
                    </Button>
                    <Button 
                      variant="secondary" 
                      className="gap-2"
                      onClick={handleFavorite}
                      disabled={isAnimating}
                    >
                      <Star className="h-4 w-4" />
                      Favoritar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <p className="text-muted-foreground text-center mt-6 max-w-md">
              Explore as opções de franquias e escolha as que mais combinam com seu perfil empreendedor
            </p>
          </div>

          {/* Favorites Sidebar */}
          <aside className="lg:sticky lg:top-24 h-fit">
            <Card className="shadow-lg">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-secondary" />
                  <h2 className="text-xl font-bold text-foreground">Favoritos</h2>
                </div>
                
                <p className="text-sm text-muted-foreground">
                  Favorite de 3 a 5 marcas para análise
                </p>

                <div className="space-y-3 min-h-[200px]">
                  {favorites.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-[200px] text-center space-y-2 text-muted-foreground">
                      <Star className="h-12 w-12 mx-auto opacity-20" />
                      <p className="text-sm">Nenhuma franquia favoritada ainda</p>
                    </div>
                  ) : (
                    favorites.map((franchise, index) => (
                      <Card 
                        key={franchise.id} 
                        className="animate-scale-in shadow-md hover:shadow-lg transition-shadow"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                              <span className="text-xl font-bold text-muted-foreground">Logo</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-sm text-foreground truncate">
                                {franchise.name}
                              </h4>
                              <p className="text-xs text-muted-foreground">{franchise.segment}</p>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="flex-shrink-0 h-8 w-8"
                              onClick={() => handleRemoveFavorite(franchise.id)}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>

                <Button 
                  variant="cta" 
                  className="w-full gap-2" 
                  disabled={favorites.length < 3}
                >
                  Ver Informações Detalhadas
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Match;
