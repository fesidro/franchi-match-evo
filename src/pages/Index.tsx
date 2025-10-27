import Hero from "@/components/Hero";
import AuthForm from "@/components/AuthForm";
import Packages from "@/components/Packages";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Hero />
      <AuthForm />
      <Packages />
      <FAQ />
      <Contact />
      
      <footer className="bg-muted/30 border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2024 FranchiMatch - Consultoria de Franquias. Todos os direitos reservados.</p>
          <p className="mt-2">
            CNPJ: 00.000.000/0001-00 | Especialistas em franchising e negócio próprio
          </p>
          <p className="mt-4">
            <Link to="/admin/franquias" className="text-primary hover:underline">
              Área Administrativa
            </Link>
          </p>
        </div>
      </footer>
    </main>
  );
};

export default Index;
