import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

const AuthForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    whatsapp: "",
    agreedToTerms: false
  });
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    whatsapp: "",
    terms: ""
  });

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateWhatsApp = (whatsapp: string): boolean => {
    const phoneRegex = /^\(?[1-9]{2}\)?\s?9?\d{4}-?\d{4}$/;
    return phoneRegex.test(whatsapp.replace(/\s/g, ''));
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors = {
      fullName: "",
      email: "",
      whatsapp: "",
      terms: ""
    };

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Nome completo é obrigatório";
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = "Nome deve ter pelo menos 3 caracteres";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email é obrigatório";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Email inválido";
    }

    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = "WhatsApp é obrigatório";
    } else if (!validateWhatsApp(formData.whatsapp)) {
      newErrors.whatsapp = "Formato de WhatsApp inválido (ex: 11 99999-9999)";
    }

    if (!formData.agreedToTerms) {
      newErrors.terms = "Você deve concordar com os termos";
    }

    setErrors(newErrors);

    if (Object.values(newErrors).every(error => error === "")) {
      toast({
        title: "Cadastro recebido!",
        description: "Em breve entraremos em contato para dar match na sua franquia ideal.",
      });
      setFormData({
        fullName: "",
        email: "",
        whatsapp: "",
        agreedToTerms: false
      });
    }
  };

  return (
    <section id="cadastro" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8 space-y-3">
            <h2 className="text-foreground">Encontre Sua Franquia Ideal</h2>
            <p className="text-muted-foreground">
              Preencha seus dados e comece sua jornada rumo ao negócio próprio
            </p>
          </div>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Cadastre-se Agora</CardTitle>
              <CardDescription>
                Receba orientação personalizada para escolher a franquia perfeita para você
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Nome Completo</Label>
                  <Input 
                    id="fullName" 
                    type="text" 
                    placeholder="João Silva"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    className={errors.fullName ? "border-destructive" : ""}
                  />
                  {errors.fullName && (
                    <p className="text-sm text-destructive">{errors.fullName}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={errors.email ? "border-destructive" : ""}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="whatsapp">WhatsApp</Label>
                  <Input 
                    id="whatsapp" 
                    type="tel" 
                    placeholder="(11) 99999-9999"
                    value={formData.whatsapp}
                    onChange={(e) => handleInputChange("whatsapp", e.target.value)}
                    className={errors.whatsapp ? "border-destructive" : ""}
                  />
                  {errors.whatsapp && (
                    <p className="text-sm text-destructive">{errors.whatsapp}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-start space-x-2">
                    <Checkbox 
                      id="terms" 
                      checked={formData.agreedToTerms}
                      onCheckedChange={(checked) => handleInputChange("agreedToTerms", checked as boolean)}
                      className={errors.terms ? "border-destructive" : ""}
                    />
                    <Label 
                      htmlFor="terms" 
                      className="text-sm leading-relaxed cursor-pointer"
                    >
                      Ao clicar, você concorda com os{" "}
                      <a href="#" className="text-primary hover:underline">
                        Termos de Uso
                      </a>
                      {" "}e a{" "}
                      <a href="#" className="text-primary hover:underline">
                        Política de Privacidade
                      </a>
                    </Label>
                  </div>
                  {errors.terms && (
                    <p className="text-sm text-destructive">{errors.terms}</p>
                  )}
                </div>

                <Button 
                  type="submit" 
                  variant="hero" 
                  className="w-full" 
                  size="lg"
                >
                  Dê Match na sua Franquia
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AuthForm;
