import { FileText, BarChart3, MapPin, Calendar, Shield, Star, Quote } from "lucide-react";

const valueBlocks = [
  {
    icon: FileText,
    title: "Pente-fino na COF",
    description: "Identificamos cláusulas abusivas, pegadinhas contratuais e riscos ocultos antes que você assine.",
  },
  {
    icon: BarChart3,
    title: "Análise de DRE e Viabilidade",
    description: "Projeções financeiras realistas com cenários otimista, moderado e conservador para sua região.",
  },
  {
    icon: MapPin,
    title: "Mapeamento da Concorrência Local",
    description: "Levantamento completo dos concorrentes diretos e indiretos no raio de atuação da unidade.",
  },
];

const testimonials = [
  {
    name: "Carlos M.",
    role: "Investidor — São Paulo, SP",
    text: "A consultoria me mostrou 3 red flags na COF que eu jamais teria percebido sozinho. Economizei R$ 180 mil em um negócio que parecia perfeito na superfície.",
    rating: 5,
  },
  {
    name: "Fernanda L.",
    role: "Ex-executiva — Belo Horizonte, MG",
    text: "Com a análise de DRE, descobri que o ponto de equilíbrio real era 40% maior do que a franqueadora apresentou. Escolhi outra marca e hoje faturo acima da média.",
    rating: 5,
  },
  {
    name: "Ricardo S.",
    role: "Empresário — Curitiba, PR",
    text: "O mapeamento de concorrência revelou uma saturação no bairro que eu queria. Mudamos a localização e a unidade já opera no azul desde o terceiro mês.",
    rating: 5,
  },
];

const Consultoria = () => {
  return (
    <main className="min-h-screen bg-foreground">
      {/* Hero Header */}
      <section className="relative overflow-hidden">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/20 to-transparent pointer-events-none" />

        <div className="container mx-auto px-4 pt-20 pb-16 relative z-10 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-md bg-primary/10 border border-primary/20 mb-8">
            <Shield className="h-4 w-4 text-primary-foreground/70" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-primary-foreground/70">
              Consultoria Estratégica Premium
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-primary-foreground leading-tight mb-6">
            A Certeza Antes do Contrato.{" "}
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: "var(--gradient-cta)" }}>
              Agende sua Consultoria Estratégica.
            </span>
          </h1>

          <p className="text-base md:text-lg text-primary-foreground/60 max-w-2xl mx-auto leading-relaxed">
            A análise profunda que separa os negócios lucrativos das armadilhas financeiras.
            Escolha o melhor horário para estruturarmos o seu plano de ação.
          </p>
        </div>
      </section>

      {/* Value Blocks */}
      <section className="container mx-auto px-4 -mt-4 pb-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {valueBlocks.map((block) => (
            <div
              key={block.title}
              className="group rounded-xl border border-border/10 bg-card/5 backdrop-blur-sm p-6 transition-smooth hover:bg-card/10"
            >
              <div className="h-12 w-12 rounded-lg bg-primary/15 flex items-center justify-center mb-4">
                <block.icon className="h-6 w-6 text-primary-light" style={{ color: "hsl(217 85% 65%)" }} />
              </div>
              <h3 className="text-lg font-bold tracking-tight text-primary-foreground mb-2">
                {block.title}
              </h3>
              <p className="text-sm text-primary-foreground/50 leading-relaxed">
                {block.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Calendar Section */}
      <section className="container mx-auto px-4 pb-20">
        <div className="max-w-3xl mx-auto">
          <div className="rounded-2xl bg-background shadow-xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                Escolha o melhor <span className="text-primary">horário</span>
              </h2>
              <p className="text-sm text-muted-foreground mt-2">
                Sessões de 60 minutos com nossos analistas especializados
              </p>
            </div>

            {/* Calendar Placeholder */}
            <div className="rounded-xl border-2 border-dashed border-border bg-muted/50 flex flex-col items-center justify-center py-20 px-6">
              <Calendar className="h-16 w-16 text-muted-foreground/40 mb-4" />
              <p className="text-muted-foreground font-medium text-center">
                [Área reservada para a integração do widget do Calendly / Cal.com]
              </p>
              <p className="text-xs text-muted-foreground/60 mt-2">
                Incorpore o embed do seu calendário aqui
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="border-t border-border/10">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-primary-foreground">
              O que dizem os <span style={{ color: "hsl(25 95% 53%)" }}>investidores</span>
            </h2>
            <p className="text-sm text-primary-foreground/50 mt-2">
              Decisões mais seguras geram resultados melhores
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="rounded-xl border border-border/10 bg-card/5 backdrop-blur-sm p-6"
              >
                <Quote className="h-5 w-5 text-secondary/60 mb-4" />
                <p className="text-sm text-primary-foreground/70 leading-relaxed mb-5">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-secondary text-secondary" />
                  ))}
                </div>
                <p className="text-sm font-semibold text-primary-foreground">{t.name}</p>
                <p className="text-xs text-primary-foreground/40">{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="border-t border-border/10 py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-primary-foreground/40">
            © 2024 FranchiMatch — Consultoria Estratégica de Franquias
          </p>
        </div>
      </section>
    </main>
  );
};

export default Consultoria;
