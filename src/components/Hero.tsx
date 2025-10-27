import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="container mx-auto px-4 py-20 md:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* Content */}
          <div className="space-y-8 animate-fade-in text-center lg:text-left">
            <h1 className="text-gradient">
              Da decisão ao sucesso — sua franquia começa aqui.
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
              Somos uma consultoria independente e mentoria de ponta que guia você, com dados e método, 
              da definição do perfil à validação da marca — para escolher a franquia certa com{" "}
              <span className="font-semibold text-foreground">segurança e clareza.</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center pt-6">
              <Button variant="hero" size="xl" className="group">
                Dê Match na sua Franquia Ideal
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="xl">
                Agende uma Consultoria
              </Button>
            </div>
          </div>

          {/* Visual Element - Franchise Cards */}
          <div className="relative h-[500px] hidden lg:block animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Card 1 - Background */}
              <div className="absolute w-72 h-96 bg-card border-2 border-border rounded-xl shadow-lg transform -rotate-12 translate-x-[-40px] translate-y-[20px] opacity-70">
                <div className="p-6 h-full flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="w-16 h-16 bg-primary/20 rounded-lg" />
                    <div className="h-4 bg-muted rounded w-3/4" />
                    <div className="h-3 bg-muted rounded w-1/2" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 bg-muted rounded" />
                    <div className="h-3 bg-muted rounded w-5/6" />
                  </div>
                </div>
              </div>

              {/* Card 2 - Middle */}
              <div className="absolute w-72 h-96 bg-card border-2 border-border rounded-xl shadow-xl transform -rotate-6 translate-y-[10px] opacity-85">
                <div className="p-6 h-full flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="w-16 h-16 bg-secondary/30 rounded-lg" />
                    <div className="h-4 bg-muted rounded w-3/4" />
                    <div className="h-3 bg-muted rounded w-1/2" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 bg-muted rounded" />
                    <div className="h-3 bg-muted rounded w-5/6" />
                  </div>
                </div>
              </div>

              {/* Card 3 - Front (Featured) */}
              <div className="absolute w-72 h-96 bg-card border-2 border-primary/50 rounded-xl shadow-2xl transform rotate-3 translate-x-[40px] z-10">
                <div className="p-6 h-full flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-lg animate-pulse" />
                    <p className="text-lg font-semibold text-foreground">Franquia de Alimentação</p>
                    <p className="text-sm text-muted-foreground">Investimento inicial médio</p>
                  </div>
                  <div className="space-y-3">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">ROI médio:</span>
                        <span className="font-semibold">24 meses</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Perfil:</span>
                        <span className="font-semibold">Gestão ativa</span>
                      </div>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full w-4/5 bg-gradient-to-r from-primary to-secondary rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16 max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: '0.4s' }}>

          <div className="space-y-2">
            <div className="text-4xl font-bold text-primary">500+</div>
            <p className="text-sm text-muted-foreground">Franquias Analisadas</p>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-bold text-primary">98%</div>
            <p className="text-sm text-muted-foreground">Satisfação dos Clientes</p>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-bold text-primary">15+</div>
            <p className="text-sm text-muted-foreground">Anos de Experiência</p>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl opacity-50 animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl opacity-50 animate-pulse" style={{ animationDelay: '1s' }} />
    </section>
  );
};

export default Hero;
