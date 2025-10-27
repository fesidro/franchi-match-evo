import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          <h1 className="text-gradient">
            A Consultoria que Transforma seu Sonho de Franquia em Realidade
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Conectamos você à franquia ideal com segurança, estratégia e acompanhamento personalizado. 
            Sua jornada rumo ao <span className="font-semibold text-foreground">negócio próprio</span> começa aqui.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            <Button variant="hero" size="xl" className="group">
              Encontre Sua Franquia Ideal
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="xl">
              Agende uma Consultoria
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 max-w-3xl mx-auto">
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
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl opacity-50 animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl opacity-50 animate-pulse" style={{ animationDelay: '1s' }} />
    </section>
  );
};

export default Hero;
