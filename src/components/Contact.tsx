import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <Badge variant="secondary" className="mb-2">Contato</Badge>
          <h2 className="text-foreground">Vamos Conversar?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Nossa equipe está pronta para esclarecer suas dúvidas e iniciar sua jornada
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Envie uma mensagem</CardTitle>
              <CardDescription>
                Preencha o formulário e retornaremos em até 24 horas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="contact-name">Nome completo</Label>
                  <Input id="contact-name" placeholder="João Silva" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contact-email">E-mail</Label>
                    <Input id="contact-email" type="email" placeholder="seu@email.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-phone">Telefone</Label>
                    <Input id="contact-phone" type="tel" placeholder="(11) 99999-9999" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-interest">Interesse em investimento</Label>
                  <Input id="contact-interest" placeholder="Ex: R$ 100.000 a R$ 300.000" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-message">Mensagem</Label>
                  <Textarea 
                    id="contact-message" 
                    placeholder="Conte-nos um pouco sobre suas expectativas e objetivos..."
                    rows={5}
                  />
                </div>

                <Button variant="cta" size="lg" className="w-full">
                  Enviar Mensagem
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Informações de Contato</CardTitle>
                <CardDescription>
                  Entre em contato pelos nossos canais oficiais
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">E-mail</div>
                    <a 
                      href="mailto:contato@franchimatch.com.br" 
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      contato@franchimatch.com.br
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Telefone / WhatsApp</div>
                    <a 
                      href="tel:+551140403030" 
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      (11) 4040-3030
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Endereço</div>
                    <p className="text-muted-foreground">
                      Av. Paulista, 1500 - 15º andar<br />
                      Bela Vista, São Paulo - SP<br />
                      CEP: 01310-100
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Horário de Atendimento</div>
                    <p className="text-muted-foreground">
                      Segunda a Sexta: 9h às 18h<br />
                      Sábado: 9h às 13h
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg bg-primary text-primary-foreground">
              <CardContent className="pt-6">
                <p className="text-lg font-semibold mb-2">
                  Agende uma Consultoria Gratuita
                </p>
                <p className="text-sm opacity-90 mb-4">
                  30 minutos para entender seu perfil e apresentar as melhores oportunidades
                </p>
                <Button variant="secondary" size="lg" className="w-full">
                  Agendar Agora
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
