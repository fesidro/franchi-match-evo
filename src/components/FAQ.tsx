import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

const faqs = [
  {
    question: "Como funciona o processo de consultoria de franquias?",
    answer: "Nosso processo começa com uma análise completa do seu perfil empreendedor, seguida pelo mapeamento de franquias alinhadas aos seus objetivos e capital disponível. Realizamos análise de viabilidade financeira, acompanhamos visitas técnicas e auxiliamos na negociação e validação do contrato. O acompanhamento continua mesmo após a escolha da franquia.",
  },
  {
    question: "Quanto tempo leva para escolher a franquia ideal?",
    answer: "O processo completo geralmente leva de 30 a 90 dias, dependendo do pacote escolhido e da sua disponibilidade. No plano Essencial, você terá insights iniciais em 15 dias. Já nos planos Premium e Elite, o processo é mais aprofundado, incluindo visitas técnicas e análises detalhadas, garantindo uma decisão mais segura e informada.",
  },
  {
    question: "Quais são os custos envolvidos além da consultoria?",
    answer: "Além do investimento na consultoria, você precisará considerar: a taxa de franquia, capital de giro, investimento em instalações e equipamentos, e taxas de royalties. Nossa análise financeira detalha todos esses custos previamente, garantindo que você só considere franquias compatíveis com seu orçamento total.",
  },
  {
    question: "Vocês têm parceria com franqueadoras específicas?",
    answer: "Não. Nossa independência é nosso maior valor. Não temos acordos comerciais com franqueadoras, o que garante uma recomendação 100% imparcial. Avaliamos mais de 500 redes de franquias com base em critérios técnicos, sempre priorizando o melhor retorno para você.",
  },
  {
    question: "E se eu não encontrar uma franquia que me satisfaça?",
    answer: "Oferecemos garantia de satisfação em todos os nossos pacotes. Se após nossa análise você decidir não investir em nenhuma das franquias apresentadas, devolvemos o valor investido na consultoria. Acreditamos que a confiança é a base de uma parceria de sucesso.",
  },
  {
    question: "Posso escolher franquias de qualquer segmento?",
    answer: "Sim! Trabalhamos com franquias de todos os segmentos: alimentação, educação, saúde, serviços, varejo, e muito mais. Nossa análise de perfil identifica quais segmentos se alinham melhor com suas habilidades, experiência e preferências pessoais.",
  },
  {
    question: "Vocês ajudam também após a abertura da franquia?",
    answer: "Sim! Nos planos Premium e Elite, oferecemos suporte pós-abertura. No plano Elite, você tem 3 meses de consultoria após a inauguração, auxiliando em gestão, marketing local, e otimização operacional. Queremos ver seu negócio prosperando!",
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <Badge variant="secondary" className="mb-2">Perguntas Frequentes</Badge>
          <h2 className="text-foreground">Tire Suas Dúvidas</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Respostas claras para as perguntas mais comuns sobre consultoria de franquias
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-card border rounded-lg px-6 shadow-sm"
              >
                <AccordionTrigger className="text-left font-semibold hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <p className="text-center text-muted-foreground mt-12">
          Ainda tem dúvidas? <a href="#contact" className="text-primary font-semibold hover:underline">Entre em contato conosco</a>
        </p>
      </div>
    </section>
  );
};

export default FAQ;
