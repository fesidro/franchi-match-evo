import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, ArrowRight, Trash2 } from "lucide-react";

interface Favorite {
  favorito_id: number;
  id: string;
  nome: string;
  segmento: string | null;
  logo_url: string | null;
}

interface FavoritesListProps {
  favorites: Favorite[];
  onRemove: (favoritoId: number, franquiaId: string) => void;
}

export const FavoritesList = ({ favorites, onRemove }: FavoritesListProps) => {
  return (
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
                    {franchise.logo_url ? (
                      <img 
                        src={franchise.logo_url} 
                        alt={franchise.nome}
                        className="w-16 h-16 object-contain rounded-lg flex-shrink-0 bg-muted p-2"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-xl font-bold text-primary">
                          {franchise.nome.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
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
                      onClick={() => onRemove(franchise.favorito_id, franchise.id)}
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
  );
};
