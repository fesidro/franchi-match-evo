import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

const packages = [
  {
    name: "Essencial",
    description: "Ideal para quem está começando a explorar o universo das franquias",
    price: "R$ 1.997",
    period: "Pacote único",
    features: [
      "Análise de perfil empreendedor",
      "Mapeamento de 10 franquias adequadas",
      "Relatório detalhado de viabilidade",
      "1 consultoria online (2h)",
      "Suporte por 30 dias",
    ],
    popular: false,
  },
  {
    name: "Premium",
    description: "Acompanhamento completo para uma decisão segura e assertiva",
    price: "R$ 4.997",
    period: "Pacote completo",
    features: [
      "Tudo do plano Essencial",
      "Análise financeira aprofundada",
      "Visita técnica a 3 franquias (presencial)",
      "Negociação assistida",
      "3 consultorias especializadas",
      "Suporte por 90 dias",
      "Validação de contrato",
    ],
    popular: true,
  },
  {
    name: "Elite",
    description: "Assessoria completa do planejamento à abertura da sua franquia",
    price: "R$ 9.997",
    period: "Acompanhamento total",
    features: [
      "Tudo do plano Premium",
      "Consultoria ilimitada por 12 meses",
      "Acompanhamento na implantação",
      "Consultoria pós-abertura (3 meses)",
      "Análise de múltiplas unidades",
      "Acesso prioritário a lançamentos",
      "Network exclusivo de franqueados",
      "Mentoria executiva",
    ],
    popular: false,
  },
];

const Packages = () => {
  return (
    <section id="packages" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <Badge variant="secondary" className="mb-2">Nossos Pacotes</Badge>
          <h2 className="text-foreground">Escolha o Plano Ideal para Você</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Investimento com retorno garantido: nossa expertise a serviço do seu sucesso
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {packages.map((pkg) => (
            <Card 
              key={pkg.name} 
              className={`relative flex flex-col transition-smooth hover:shadow-xl ${
                pkg.popular ? 'border-primary shadow-primary scale-105' : ''
              }`}
            >
              {pkg.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-secondary text-secondary-foreground">
                  Mais Popular
                </Badge>
              )}
              
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl mb-2">{pkg.name}</CardTitle>
                <CardDescription className="text-base">{pkg.description}</CardDescription>
                <div className="pt-4">
                  <div className="text-4xl font-bold text-primary">{pkg.price}</div>
                  <div className="text-sm text-muted-foreground mt-1">{pkg.period}</div>
                </div>
              </CardHeader>

              <CardContent className="flex-grow">
                <ul className="space-y-3">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Button 
                  variant={pkg.popular ? "cta" : "hero"} 
                  size="lg" 
                  className="w-full"
                >
                  Escolher {pkg.name}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-12 max-w-2xl mx-auto">
          Todos os planos incluem garantia de satisfação. Não encontrou a franquia ideal? Devolvemos seu investimento.
        </p>
      </div>
    </section>
  );
};

export default Packages;
