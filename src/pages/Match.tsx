import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, X, Info, Star, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Match = () => {
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
            <Card className="w-full max-w-md shadow-2xl border-2 animate-scale-in">
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
                    <h3 className="text-2xl font-bold text-foreground">Nome da Franquia</h3>
                    <p className="text-muted-foreground">Uma descrição breve e atrativa da oportunidade de negócio</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 py-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Segmento</p>
                      <p className="font-semibold text-foreground">Alimentação</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Investimento</p>
                      <p className="font-semibold text-foreground">R$ 150.000</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Payback Médio</p>
                      <p className="font-semibold text-foreground">24 meses</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Unidades</p>
                      <p className="font-semibold text-foreground">250+</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-3 pt-4">
                    <Button variant="outline" className="gap-2">
                      <Info className="h-4 w-4" />
                      Saber mais
                    </Button>
                    <Button variant="outline" className="gap-2 border-destructive/50 text-destructive hover:bg-destructive hover:text-destructive-foreground">
                      <X className="h-4 w-4" />
                      Não gostei
                    </Button>
                    <Button variant="hero" className="gap-2">
                      <Heart className="h-4 w-4" />
                      Gostei
                    </Button>
                    <Button variant="secondary" className="gap-2">
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

                <div className="space-y-3 min-h-[200px] flex flex-col items-center justify-center">
                  <div className="text-center space-y-2 text-muted-foreground">
                    <Star className="h-12 w-12 mx-auto opacity-20" />
                    <p className="text-sm">Nenhuma franquia favoritada ainda</p>
                  </div>
                </div>

                <Button variant="cta" className="w-full gap-2" disabled>
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
