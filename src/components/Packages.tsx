import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, Search, FileCheck, Rocket, ArrowRight } from "lucide-react";

const packages = [
  {
    step: "01",
    name: "PACOTE 1 - MATCH DAS FRANQUIAS",
    title: "Descoberta e Perfil",
    description: "Identifique as franquias que realmente combinam com você através de análise detalhada do seu perfil e objetivos",
    icon: Target,
    highlights: [
      "Análise de perfil empreendedor",
      "Match com franquias ideais",
      "Relatório personalizado"
    ]
  },
  {
    step: "02",
    name: "PACOTE 2 - ANÁLISE E VALIDAÇÃO",
    title: "Due Diligence Completa",
    description: "Validação profunda das marcas selecionadas com análise financeira, jurídica e de mercado sem viés comercial",
    icon: Search,
    highlights: [
      "Análise financeira independente",
      "Validação de mercado",
      "Entrevistas com franqueados"
    ]
  },
  {
    step: "03",
    name: "PACOTE 3 - DECISÃO E NEGOCIAÇÃO",
    title: "Escolha Estratégica",
    description: "Suporte na decisão final e negociação assertiva para garantir as melhores condições do seu investimento",
    icon: FileCheck,
    highlights: [
      "Apoio na decisão final",
      "Negociação assistida",
      "Revisão de contratos"
    ]
  },
  {
    step: "04",
    name: "PACOTE 4 - IMPLEMENTAÇÃO",
    title: "Abertura e Operação",
    description: "Acompanhamento completo na implantação da unidade e nos primeiros meses de operação para seu sucesso",
    icon: Rocket,
    highlights: [
      "Suporte na implantação",
      "Consultoria operacional",
      "Mentoria inicial"
    ]
  }
];

const Packages = () => {
  return (
    <section id="packages" className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <Badge variant="secondary" className="mb-2">Nossa Metodologia</Badge>
          <h2 className="text-foreground">O Percurso Para a Franquia Certa</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Nosso compromisso é com você, investidor, não com o franqueador. Oferecemos uma análise 
            isenta e focada no seu sucesso, guiando você da definição do perfil à validação da marca.
          </p>
        </div>

        {/* Journey Timeline */}
        <div className="max-w-6xl mx-auto space-y-8">
          {packages.map((pkg, index) => {
            const Icon = pkg.icon;
            return (
              <div 
                key={pkg.name}
                className="relative animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Timeline connector - hide for last item */}
                {index < packages.length - 1 && (
                  <div className="absolute left-8 top-24 w-0.5 h-full bg-gradient-to-b from-primary to-primary/20 hidden md:block" />
                )}
                
                <Card className="relative overflow-hidden hover:shadow-xl transition-smooth border-2 hover:border-primary/50">
                  <CardHeader>
                    <div className="flex items-start gap-6">
                      {/* Step Number and Icon */}
                      <div className="flex-shrink-0">
                        <div className="relative">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center shadow-primary">
                            <Icon className="h-8 w-8 text-primary-foreground" />
                          </div>
                          <Badge 
                            variant="secondary" 
                            className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center p-0 font-bold"
                          >
                            {pkg.step}
                          </Badge>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 space-y-3">
                        <div>
                          <p className="text-sm font-semibold text-primary mb-1">{pkg.name}</p>
                          <CardTitle className="text-2xl mb-2">{pkg.title}</CardTitle>
                          <CardDescription className="text-base leading-relaxed">
                            {pkg.description}
                          </CardDescription>
                        </div>

                        {/* Highlights */}
                        <div className="flex flex-wrap gap-2 pt-2">
                          {pkg.highlights.map((highlight, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {highlight}
                            </Badge>
                          ))}
                        </div>

                        {/* CTA Button */}
                        <div className="pt-4">
                          <Button 
                            variant="hero" 
                            className="gap-2 group"
                            asChild
                          >
                            <a href="#">
                              Saiba Mais
                              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </a>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 space-y-6">
          <div className="max-w-2xl mx-auto space-y-3">
            <h3 className="text-2xl font-bold text-foreground">Pronto para começar sua jornada?</h3>
            <p className="text-muted-foreground">
              Combine os pacotes de acordo com suas necessidades ou escolha a jornada completa 
              para ter o suporte total da decisão à abertura.
            </p>
          </div>
          <Button variant="cta" size="lg" className="gap-2">
            Falar com Especialista
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Packages;
