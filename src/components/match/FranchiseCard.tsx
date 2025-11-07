import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, X, Info, Star, ChevronUp, Award, Check, XCircle, HelpCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Franchise } from "@/hooks/useFranchises";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface FranchiseCardProps {
  franchise: Franchise;
  onLike: () => void;
  onDislike: () => void;
  onFavorite: () => void;
  isAnimating: boolean;
}

const getInterestColor = (nivel: string | null) => {
  if (!nivel) return "bg-muted text-muted-foreground";

  switch (nivel.toUpperCase()) {
    case "MUITO ALTO":
      return "bg-green-500/10 text-green-600 border-green-500/20";
    case "ALTO":
      return "bg-blue-500/10 text-blue-600 border-blue-500/20";
    case "MÉDIO":
      return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20";
    case "BAIXO":
      return "bg-orange-500/10 text-orange-600 border-orange-500/20";
    case "MUITO BAIXO":
      return "bg-red-500/10 text-red-600 border-red-500/20";
    default:
      return "bg-muted text-muted-foreground";
  }
};

export const FranchiseCard = ({ franchise, onLike, onDislike, onFavorite, isAnimating }: FranchiseCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Função para recolher o card e executar a ação
  const handleLikeWithCollapse = () => {
    setIsExpanded(false);
    onLike();
  };

  const handleDislikeWithCollapse = () => {
    setIsExpanded(false);
    onDislike();
  };

  return (
    <Card
      className={`w-full max-w-md shadow-2xl border-2 transition-all duration-500 ${
        isAnimating ? "opacity-0 scale-75 translate-x-96" : "animate-scale-in"
      }`}
    >
      <CardContent className="p-0">
        {/* Logo Section */}
        <div className="h-64 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center border-b relative">
          {franchise.selo_excelencia_abf && (
            <div className="absolute top-4 right-4">
              <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20 gap-1">
                <Award className="h-3 w-3" />
                Selo ABF
              </Badge>
            </div>
          )}

          {franchise.logo_url ? (
            <img
              src={franchise.logo_url}
              alt={franchise.nome}
              className="w-32 h-32 object-contain rounded-lg shadow-lg bg-background p-4"
            />
          ) : (
            <div className="w-32 h-32 bg-background rounded-lg shadow-lg flex items-center justify-center">
              <span className="text-4xl font-bold text-primary">{franchise.nome.charAt(0).toUpperCase()}</span>
            </div>
          )}
        </div>

        {/* Card Content */}
        <div className="p-6 space-y-4">
          {/* Basic Info */}
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-foreground">{franchise.nome}</h3>
            <p className="text-sm text-muted-foreground">
              {franchise.segmento}
              {franchise.subsegmento && ` • ${franchise.subsegmento}`}
            </p>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Faturamento Médio</p>
              <p className="font-semibold text-foreground">{franchise.faturamento_medio || "Sob consulta"}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Investimento</p>
              <p className="font-semibold text-foreground">{franchise.investimento || "Sob consulta"}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Payback Médio</p>
              <p className="font-semibold text-foreground">{franchise.payback_medio_meses || "N/D"}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Satisfação média dos franqueados</p>
              <div className="space-y-1">
                <Progress value={franchise.nivel_satisfacao_franqueados || 0} className="h-2" />
                <p className="text-xs text-muted-foreground">{franchise.nivel_satisfacao_franqueados || 0}%</p>
              </div>
            </div>
          </div>

          {/* Expanded Content */}
          {isExpanded && (
            <div className="space-y-4 pt-4 border-t animate-fade-in">
              {/* Interest & Dedication */}
              <div className="space-y-3 p-4 bg-muted/30 rounded-lg border-l-4 border-primary">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-semibold text-foreground">Interesse e Dedicação</h4>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p className="text-sm">
                          <strong>Marca:</strong> Nível de interesse da marca em expandir (quanto maior, mais
                          oportunidades).
                          <br />
                          <strong>Franquia:</strong> Nível de interesse da franqueadora em novos franqueados (quanto
                          maior, mais suporte inicial).
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="flex flex-wrap gap-2">
                  {franchise.nivel_interesse_marca && (
                    <Badge variant="outline" className={getInterestColor(franchise.nivel_interesse_marca)}>
                      Marca: {franchise.nivel_interesse_marca}
                    </Badge>
                  )}
                  {franchise.nivel_interesse_franquia && (
                    <Badge variant="outline" className={getInterestColor(franchise.nivel_interesse_franquia)}>
                      Franquia: {franchise.nivel_interesse_franquia}
                    </Badge>
                  )}
                  {franchise.nivel_dedicacao && <Badge variant="outline">{franchise.nivel_dedicacao}</Badge>}
                </div>
              </div>

              {/* Financial Info */}
              <div className="space-y-3 p-4 bg-blue-500/5 rounded-lg border-l-4 border-blue-500">
                <h4 className="text-sm font-semibold text-foreground">Informações Financeiras</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {franchise.taxa_franquia && (
                    <div>
                      <p className="text-muted-foreground">Taxa de Franquia</p>
                      <p className="font-medium">{franchise.taxa_franquia}</p>
                    </div>
                  )}
                  {franchise.royalties && (
                    <div>
                      <p className="text-muted-foreground">Royalties</p>
                      <p className="font-medium">{franchise.royalties}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Network Info */}
              <div className="space-y-3 p-4 bg-green-500/5 rounded-lg border-l-4 border-green-500">
                <h4 className="text-sm font-semibold text-foreground">Informações da Rede</h4>
                <div className="space-y-3">
                  {franchise.qtd_unidades && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Quantidade de Unidades</p>
                      <p className="font-medium">{franchise.qtd_unidades}</p>
                    </div>
                  )}
                  {franchise.nivel_satisfacao_franqueados !== null && (
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Satisfação dos Franqueados</span>
                        <span className="font-medium">{franchise.nivel_satisfacao_franqueados}%</span>
                      </div>
                      <Progress value={franchise.nivel_satisfacao_franqueados} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1 italic">Dados coletados de franqueados</p>
                    </div>
                  )}
                  {franchise.nivel_suporte_franquia !== null && (
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Suporte da Franquia</span>
                        <span className="font-medium">{franchise.nivel_suporte_franquia}%</span>
                      </div>
                      <Progress value={franchise.nivel_suporte_franquia} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1 italic">Dados coletados de franqueados</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Target Audience */}
              {franchise.publico_alvo && (
                <div className="space-y-3 p-4 bg-purple-500/5 rounded-lg border-l-4 border-purple-500">
                  <h4 className="text-sm font-semibold text-foreground">Público-Alvo</h4>
                  <p className="text-sm text-muted-foreground">{franchise.publico_alvo}</p>
                </div>
              )}

              {/* Pros and Cons */}
              {(franchise.pros_resumido || franchise.contras_resumido) && (
                <div className="space-y-3 p-4 bg-amber-500/5 rounded-lg border-l-4 border-amber-500">
                  <h4 className="text-sm font-semibold text-foreground">Análise Geral</h4>
                  <div className="space-y-3">
                    {franchise.pros_resumido && franchise.pros_resumido.length > 0 && (
                      <div className="space-y-2">
                        <h5 className="text-sm font-medium text-foreground">Pontos Positivos</h5>
                        <ul className="space-y-1">
                          {franchise.pros_resumido.map((pro, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
                              <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                              <span className="text-muted-foreground">{pro}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {franchise.contras_resumido && franchise.contras_resumido.length > 0 && (
                      <div className="space-y-2">
                        <h5 className="text-sm font-medium text-foreground">Pontos de Atenção</h5>
                        <ul className="space-y-1">
                          {franchise.contras_resumido.map((contra, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
                              <XCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                              <span className="text-muted-foreground">{contra}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-4">
            <Button variant="outline" className="gap-2" onClick={() => setIsExpanded(!isExpanded)}>
              {isExpanded ? (
                <>
                  <ChevronUp className="h-4 w-4" />
                  Recolher
                </>
              ) : (
                <>
                  <Info className="h-4 w-4" />
                  Saber mais
                </>
              )}
            </Button>
            <Button
              variant="outline"
              className="gap-2 border-destructive/50 text-destructive hover:bg-destructive hover:text-destructive-foreground"
              onClick={handleDislikeWithCollapse}
            >
              <X className="h-4 w-4" />
              Não gostei
            </Button>
            <Button variant="hero" className="gap-2" onClick={handleLikeWithCollapse}>
              <Heart className="h-4 w-4" />
              Gostei
            </Button>
            <Button variant="secondary" className="gap-2" onClick={onFavorite} disabled={isAnimating}>
              <Star className="h-4 w-4" />
              Favoritar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
