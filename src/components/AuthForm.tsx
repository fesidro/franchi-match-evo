import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <section id="auth" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8 space-y-3">
            <h2 className="text-foreground">Comece Sua Jornada</h2>
            <p className="text-muted-foreground">
              Acesse sua conta ou cadastre-se para explorar oportunidades exclusivas
            </p>
          </div>

          <Card className="shadow-lg">
            <CardHeader>
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login" onClick={() => setIsLogin(true)}>
                    Login
                  </TabsTrigger>
                  <TabsTrigger value="cadastro" onClick={() => setIsLogin(false)}>
                    Cadastro
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="login" className="mt-6 space-y-4">
                  <CardTitle>Bem-vindo de volta</CardTitle>
                  <CardDescription>
                    Entre com suas credenciais para acessar sua conta
                  </CardDescription>

                  <div className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="email-login">E-mail</Label>
                      <Input id="email-login" type="email" placeholder="seu@email.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password-login">Senha</Label>
                      <Input id="password-login" type="password" placeholder="••••••••" />
                    </div>
                    <Button variant="hero" className="w-full" size="lg">
                      Entrar
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="cadastro" className="mt-6 space-y-4">
                  <CardTitle>Crie sua conta</CardTitle>
                  <CardDescription>
                    Preencha seus dados para começar sua jornada
                  </CardDescription>

                  <div className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome completo</Label>
                      <Input id="name" type="text" placeholder="João Silva" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email-signup">E-mail</Label>
                      <Input id="email-signup" type="email" placeholder="seu@email.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone</Label>
                      <Input id="phone" type="tel" placeholder="(11) 99999-9999" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password-signup">Senha</Label>
                      <Input id="password-signup" type="password" placeholder="••••••••" />
                    </div>
                    <Button variant="cta" className="w-full" size="lg">
                      Criar Conta
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardHeader>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AuthForm;
