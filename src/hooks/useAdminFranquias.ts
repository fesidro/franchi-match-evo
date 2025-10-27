import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface FranquiaAdmin {
  id?: string;
  nome: string;
  logo_url: string | null;
  selo_excelencia_abf: boolean;
  segmento: string;
  subsegmento: string | null;
  descricao: string | null;
  investimento_total: number | null;
  investimento_minimo: number | null;
  investimento_maximo: number | null;
  taxa_franquia: number | null;
  royalties_percentual: number | null;
  faturamento_medio_mensal: number | null;
  payback_medio: number | null;
  payback_medio_meses: number | null;
  nivel_dedicacao: string | null;
  qtd_unidades: number | null;
  unidades_brasil: number | null;
  idade_franquia_anos: number | null;
  nivel_satisfacao_franqueados: number | null;
  nivel_suporte_franquia: number | null;
  pros: string[] | null;
  contras: string[] | null;
  ativo: boolean;
}

export const useAdminFranquias = () => {
  const [franquias, setFranquias] = useState<FranquiaAdmin[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFranquias = async () => {
    try {
      const { data, error } = await supabase
        .from("franquias")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setFranquias(data || []);
    } catch (error: any) {
      toast.error("Erro ao carregar franquias");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFranquias();
  }, []);

  const importFromJson = async (jsonText: string) => {
    try {
      const data = JSON.parse(jsonText);
      
      if (!Array.isArray(data)) {
        throw new Error("O JSON deve ser um array de franquias");
      }

      // Processar pros e contras
      const processedData = data.map((item: any) => {
        const processed = { ...item };
        
        // Converter pros de string para array se necessário
        if (typeof processed.pros === "string") {
          processed.pros = processed.pros.split(",").map((s: string) => s.trim());
        }
        
        // Converter contras de string para array se necessário
        if (typeof processed.contras === "string") {
          processed.contras = processed.contras.split(",").map((s: string) => s.trim());
        }
        
        return processed;
      });

      const { error } = await supabase.from("franquias").insert(processedData);

      if (error) throw error;

      toast.success(`${processedData.length} franquias importadas com sucesso!`);
      fetchFranquias();
      return true;
    } catch (error: any) {
      toast.error(`Erro ao importar: ${error.message}`);
      console.error(error);
      return false;
    }
  };

  const clearAll = async () => {
    try {
      const { error } = await supabase.from("franquias").delete().neq("id", "00000000-0000-0000-0000-000000000000");

      if (error) throw error;

      toast.success("Todas as franquias foram removidas");
      fetchFranquias();
      return true;
    } catch (error: any) {
      toast.error("Erro ao limpar franquias");
      console.error(error);
      return false;
    }
  };

  const deleteFranquia = async (id: string) => {
    try {
      const { error } = await supabase.from("franquias").delete().eq("id", id);

      if (error) throw error;

      toast.success("Franquia deletada com sucesso");
      fetchFranquias();
      return true;
    } catch (error: any) {
      toast.error("Erro ao deletar franquia");
      console.error(error);
      return false;
    }
  };

  const saveFranquia = async (franquia: FranquiaAdmin) => {
    try {
      if (franquia.id) {
        // Update
        const { error } = await supabase
          .from("franquias")
          .update(franquia)
          .eq("id", franquia.id);

        if (error) throw error;
        toast.success("Franquia atualizada com sucesso");
      } else {
        // Insert
        const { error } = await supabase.from("franquias").insert([franquia]);

        if (error) throw error;
        toast.success("Franquia criada com sucesso");
      }

      fetchFranquias();
      return true;
    } catch (error: any) {
      toast.error(`Erro ao salvar franquia: ${error.message}`);
      console.error(error);
      return false;
    }
  };

  return {
    franquias,
    loading,
    importFromJson,
    clearAll,
    deleteFranquia,
    saveFranquia,
    refreshFranquias: fetchFranquias,
  };
};
