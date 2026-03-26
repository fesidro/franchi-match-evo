import { useState } from "react";
import { Check, Lock, ShieldCheck, CreditCard, LockOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.svg";

const deliverables = [
  "Termômetro Jurídico: Descubra o volume de processos ocultos.",
  "Ponto de Equilíbrio Frio: Saiba quanto precisa vender por dia para não quebrar.",
  "Red Flags da COF: Alertas críticos antes de assinar qualquer contrato.",
  "Análise de Satisfação: O que franqueados reais dizem sobre a marca.",
  "Comparativo de Mercado: Como a franquia se posiciona frente aos concorrentes.",
];

export default function Checkout() {
  const [form, setForm] = useState({ name: "", email: "", cpf: "", card: "", expiry: "", cvv: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: integrate payment gateway
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <Link to="/">
            <img src={logo} alt="franchiMatch" className="h-8" />
          </Link>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-primary" />
            <span>Ambiente 100% Seguro</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 md:py-16">
        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1fr_420px] lg:gap-12">

          {/* Left Column — Value Proposition */}
          <div className="space-y-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Relatório Digital
              </p>
              <h1 className="mt-2 text-2xl font-bold leading-tight tracking-tight text-foreground md:text-3xl lg:text-4xl !text-2xl md:!text-3xl lg:!text-4xl">
                Você está a um passo de descobrir a{" "}
                <span className="text-primary">verdadeira face</span> desta franquia.
              </h1>
              <p className="mt-4 text-base text-muted-foreground leading-relaxed">
                O Raio-X de Risco analisa de forma independente os pontos críticos que a franqueadora nunca vai te contar. Dados reais, sem viés comercial.
              </p>
            </div>

            {/* Checklist */}
            <div className="space-y-3">
              <p className="text-sm font-semibold text-foreground">O que você vai receber:</p>
              {deliverables.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                    <Check className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <p className="text-sm text-foreground/80">{item}</p>
                </div>
              ))}
            </div>

            {/* Risk Reversal Box */}
            <div className="rounded-xl border border-primary/15 bg-primary/5 p-5">
              <p className="text-sm font-semibold text-foreground leading-relaxed">
                🎁 <span className="text-primary">Garantia de Investimento Inteligente:</span>{" "}
                Se você decidir avançar para a consultoria completa (Pacote 3) em até 7 dias, estes R$&nbsp;97 serão{" "}
                <strong>100% abatidos</strong> do valor.
              </p>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">500+</span> relatórios entregues
              <span className="text-border">|</span>
              <span className="font-semibold text-foreground">98%</span> de satisfação
            </div>
          </div>

          {/* Right Column — Payment Form */}
          <div className="lg:sticky lg:top-8 h-fit">
            <div className="rounded-2xl border border-border bg-background p-6 shadow-[0_8px_30px_hsl(217_91%_35%_/_0.08)] md:p-8">
              {/* Price header */}
              <div className="mb-6 text-center">
                <p className="text-sm text-muted-foreground">Raio-X de Risco de Franquia</p>
                <p className="mt-1 text-4xl font-bold tracking-tight text-foreground !text-4xl">
                  R$ 97<span className="text-lg font-normal text-muted-foreground">,00</span>
                </p>
                <p className="mt-1 text-xs text-muted-foreground">Pagamento único • Acesso imediato</p>
              </div>

              <div className="mb-6 h-px bg-border" />

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-xs font-semibold text-foreground">Nome Completo</Label>
                  <Input
                    id="name"
                    placeholder="Seu nome completo"
                    value={form.name}
                    onChange={handleChange("name")}
                    required
                    maxLength={100}
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-xs font-semibold text-foreground">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={form.email}
                    onChange={handleChange("email")}
                    required
                    maxLength={255}
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cpf" className="text-xs font-semibold text-foreground">CPF</Label>
                  <Input
                    id="cpf"
                    placeholder="000.000.000-00"
                    value={form.cpf}
                    onChange={handleChange("cpf")}
                    required
                    maxLength={14}
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="card" className="text-xs font-semibold text-foreground">Número do Cartão</Label>
                  <div className="relative">
                    <Input
                      id="card"
                      placeholder="0000 0000 0000 0000"
                      value={form.card}
                      onChange={handleChange("card")}
                      required
                      maxLength={19}
                      className="h-11 pr-10"
                    />
                    <CreditCard className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/50" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="expiry" className="text-xs font-semibold text-foreground">Validade</Label>
                    <Input
                      id="expiry"
                      placeholder="MM/AA"
                      value={form.expiry}
                      onChange={handleChange("expiry")}
                      required
                      maxLength={5}
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv" className="text-xs font-semibold text-foreground">CVV</Label>
                    <Input
                      id="cvv"
                      placeholder="000"
                      value={form.cvv}
                      onChange={handleChange("cvv")}
                      required
                      maxLength={4}
                      className="h-11"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="mt-2 h-14 w-full rounded-lg bg-secondary text-base font-bold text-secondary-foreground shadow-[0_6px_20px_hsl(25_95%_53%_/_0.35)] transition-all duration-200 hover:bg-secondary-light hover:shadow-[0_8px_28px_hsl(25_95%_53%_/_0.45)]"
                >
                  <LockOpen className="mr-2 h-5 w-5" />
                  {loading ? "Processando..." : "Desbloquear Meu Raio-X Agora — R$ 97"}
                </Button>
              </form>

              {/* Security footer */}
              <div className="mt-5 flex flex-col items-center gap-3">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Lock className="h-3.5 w-3.5" />
                  <span>Pagamento criptografado e seguro</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground/40">
                  <span className="text-[10px] font-bold tracking-wider uppercase">Visa</span>
                  <span className="text-[10px] font-bold tracking-wider uppercase">Mastercard</span>
                  <span className="text-[10px] font-bold tracking-wider uppercase">Elo</span>
                  <span className="text-[10px] font-bold tracking-wider uppercase">Amex</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
