import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useFranchises } from "@/hooks/useFranchises";
import { useFavorites } from "@/hooks/useFavorites";
import { useMatchInteractions } from "@/hooks/useMatchInteractions";
import { FranchiseCard } from "@/components/match/FranchiseCard";
import { FavoritesList } from "@/components/match/FavoritesList";
import { Card, CardContent } from "@/components/ui/card";
import { Star, RotateCcw, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Match = () => {
  const [userId, setUserId] = useState<string | undefined>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showResetDialog, setShowResetDialog] = useState(false);

  // Obter ou criar ID de usuário para testes
  useEffect(() => {
    const getUsuarioId = async () => {
      // Verificar se há usuário logado
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user?.id) {
        setUserId(session.user.id);
        return;
      }
      
      // Se não houver usuário logado, usar ID temporário de teste
      let tempUserId = localStorage.getItem('temp_user_id');
      if (!tempUserId) {
        tempUserId = 'test-user-' + Date.now();
        localStorage.setItem('temp_user_id', tempUserId);
      }
      setUserId(tempUserId);
    };

    getUsuarioId();
  }, []);

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

  const handleRemoveFav = async (favoritoId: number, franquiaId: string) => {
    await removeFavorite(favoritoId, franquiaId);
  };

  const handleReset = async () => {
    if (!userId) {
      toast.error("Não foi possível resetar: usuário não identificado");
      return;
    }

    try {
      // Deletar todas as interações
      const { error: interacoesError } = await supabase
        .from("interacoes_match")
        .delete()
        .eq("usuario_id", userId);

      if (interacoesError) throw interacoesError;

      // Deletar todos os favoritos
      const { error: favoritosError } = await supabase
        .from("favoritos")
        .delete()
        .eq("usuario_id", userId);

      if (favoritosError) throw favoritosError;

      // Resetar estado
      setCurrentIndex(0);
      setShowResetDialog(false);
      
      // Recarregar a página para buscar franquias novamente
      window.location.reload();
      
      toast.success("Teste resetado! Voltando ao início...");
    } catch (error: any) {
      console.error("Erro ao resetar:", error);
      toast.error("Erro ao resetar teste");
    }
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
          <Link to="/" className="flex items-center gap-3">
            <span className="text-2xl font-bold text-gradient">FranchiMatch</span>
            <span className="text-sm text-muted-foreground hidden sm:inline">Encontre a sua franquia</span>
          </Link>
          <Button 
            variant="outline" 
            onClick={() => setShowResetDialog(true)} 
            className="gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Resetar Teste
          </Button>
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
          <Link to="/" className="flex items-center gap-3">
            <span className="text-2xl font-bold text-gradient">FranchiMatch</span>
            <span className="text-sm text-muted-foreground hidden sm:inline">Encontre a sua franquia</span>
          </Link>
          <Button 
            variant="outline" 
            onClick={() => setShowResetDialog(true)} 
            className="gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Resetar Teste
          </Button>
        </div>
      </header>

      <AlertDialog open={showResetDialog} onOpenChange={setShowResetDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Resetar teste?</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja resetar? Isso vai limpar todos os gostei, não gostei e favoritos.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleReset}>Sim, resetar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-[1fr,320px] gap-8 max-w-7xl mx-auto">
          {/* Main Card Area */}
          <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
            <div className="flex items-center gap-4">
              {/* Seta Anterior */}
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentIndex(prev => prev > 0 ? prev - 1 : franchises.length - 1)}
                className="h-12 w-12 rounded-full"
                title="Card anterior"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>

              <FranchiseCard
                franchise={currentFranchise}
                onLike={handleLike}
                onDislike={handleDislike}
                onFavorite={handleFavorite}
                isAnimating={isAnimating}
              />

              {/* Seta Próximo */}
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentIndex(prev => prev < franchises.length - 1 ? prev + 1 : 0)}
                className="h-12 w-12 rounded-full"
                title="Próximo card"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>

            <p className="text-muted-foreground text-center mt-6 max-w-md">
              {currentIndex + 1} de {franchises.length} • Explore as franquias usando as setas ou os botões
            </p>
          </div>

          {/* Favorites Sidebar */}
          <aside className="lg:sticky lg:top-24 h-fit">
            <FavoritesList
              favorites={favorites}
              onRemove={handleRemoveFav}
            />
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Match;
