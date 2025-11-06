import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, X, Info, Star, ArrowRight, Trash2, LogOut } from "lucide-react";
import { useFranchises } from "@/hooks/useFranchises";
import { useFavorites } from "@/hooks/useFavorites";
import { useMatchInteractions } from "@/hooks/useMatchInteractions";

const Match = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string | undefined>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const { franchises, loading: loadingFranchises, setFranchises } = useFranchises(userId);
  const { favorites, loading: loadingFavorites, addFavorite, removeFavorite } = useFavorites(userId);
  const { recordInteraction } = useMatchInteractions(userId);

  // useEffect(() => {
  //   // Verificar autenticação
  //   supabase.auth.getSession().then(({ data: { session } }) => {
  //     if (!session) {
  //       navigate("/auth");
  //       return;
  //     }
  //     setUserId(session.user.id);
  //   });

  //   const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
  //     if (!session) {
  //       navigate("/auth");
  //     } else {
  //       setUserId(session.user.id);
  //     }
  //   });

  //   return () => subscription.unsubscribe();
  // }, [navigate]);

  // const handleLogout = async () => {
  //   await supabase.auth.signOut();
  //   navigate("/");
  // };

  const currentFranchise = franchises[currentIndex];

  const handleLike = async () => {
    if (isAnimating || !currentFranchise) return;
    
    const success = await recordInteraction(currentFranchise.id, "gostei");
    if (success) {
      handleNext();
    }
  };

  const handleDislike = async () => {
    if (isAnimating || !currentFranchise) return;
    
    const success = await recordInteraction(currentFranchise.id, "nao_gostei");
    if (success) {
      handleNext();
    }
  };

  const handleFavorite = async () => {
    if (isAnimating || !currentFranchise) return;
    
    setIsAnimating(true);
    const success = await addFavorite(currentFranchise);
    
    if (success) {
      setTimeout(() => {
        handleNext();
        setIsAnimating(false);
      }, 500);
    } else {
      setIsAnimating(false);
    }
  };

  const handleNext = () => {
    if (isAnimating) return;
    
    // Remove a franquia atual da lista
    const newFranchises = franchises.filter((_, index) => index !== currentIndex);
    setFranchises(newFranchises);
    
    // Resetar o índice se necessário
    if (currentIndex >= newFranchises.length) {
      setCurrentIndex(0);
    }
  };

  const handleRemoveFav = async (favoritoId: string, franquiaId: string) => {
    await removeFavorite(favoritoId, franquiaId);
  };

  if (loadingFranchises || loadingFavorites) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
          <p className="text-muted-foreground">Carregando franquias...</p>
        </div>
      </div>
    );
  }

  if (franchises.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
        <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-gradient">
              FranchiMatch
            </Link>
            {/* <Button variant="outline" onClick={handleLogout} className="gap-2">
              <LogOut className="h-4 w-4" />
              Sair
            </Button> */}
          </div>
        </header>
        <div className="flex items-center justify-center min-h-[calc(100vh-100px)]">
          <Card className="max-w-md">
            <CardContent className="p-8 text-center space-y-4">
              <Star className="h-16 w-16 mx-auto text-muted-foreground opacity-50" />
              <h2 className="text-2xl font-bold">Sem mais franquias</h2>
              <p className="text-muted-foreground">
                Você já visualizou todas as franquias disponíveis!
              </p>
              <Button variant="cta" className="w-full" asChild>
                <Link to="/">Voltar ao Início</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-gradient">
            FranchiMatch
          </Link>
          {/* <Button variant="outline" onClick={handleLogout} className="gap-2">
            <LogOut className="h-4 w-4" />
            Sair
          </Button> */}
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
                    <h3 className="text-2xl font-bold text-foreground">{currentFranchise.nome}</h3>
                    <p className="text-muted-foreground">{currentFranchise.descricao || "Descrição não disponível"}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 py-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Segmento</p>
                      <p className="font-semibold text-foreground">{currentFranchise.segmento}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Investimento</p>
                      <p className="font-semibold text-foreground">
                        {currentFranchise.investimento_minimo 
                          ? `R$ ${currentFranchise.investimento_minimo.toLocaleString('pt-BR')}`
                          : "Sob consulta"}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Payback Médio</p>
                      <p className="font-semibold text-foreground">
                        {currentFranchise.payback_medio ? `${currentFranchise.payback_medio} meses` : "N/D"}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Unidades</p>
                      <p className="font-semibold text-foreground">
                        {currentFranchise.unidades_brasil ? `${currentFranchise.unidades_brasil}+` : "N/D"}
                      </p>
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
                      onClick={handleDislike}
                    >
                      <X className="h-4 w-4" />
                      Não gostei
                    </Button>
                    <Button variant="hero" className="gap-2" onClick={handleLike}>
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
                  Favorite de 3 a 5 marcas para análise ({favorites.length}/3)
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
                        key={franchise.favorito_id} 
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
                                {franchise.nome}
                              </h4>
                              <p className="text-xs text-muted-foreground">{franchise.segmento}</p>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="flex-shrink-0 h-8 w-8"
                              onClick={() => handleRemoveFav(franchise.favorito_id, franchise.id)}
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
