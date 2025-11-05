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
  faturamento_medio: string | null;
  investimento: string | null;
  investimento_total: number | null;
  investimento_minimo: number | null;
  investimento_maximo: number | null;
  taxa_franquia: string | null;
  royalties: string | null;
  royalties_percentual: number | null;
  faturamento_medio_mensal: number | null;
  payback_medio: number | null;
  payback_medio_meses: string | null;
  nivel_interesse_marca: string | null;
  nivel_interesse_franquia: string | null;
  nivel_dedicacao: string | null;
  qtd_unidades: number | null;
  unidades_brasil: number | null;
  idade_franquia_anos: number | null;
  nivel_satisfacao_franqueados: number | null;
  nivel_suporte_franquia: number | null;
  publico_alvo: string | null;
  pros: string[] | null;
  contras: string[] | null;
  pros_resumido: string[] | null;
  contras_resumido: string[] | null;
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
      
      // Adaptar dados do Supabase para FranquiaAdmin
      const adaptedData = (data || []).map((item: any) => ({
        ...item,
        royalties: item.royalties || null,
      }));
      
      setFranquias(adaptedData);
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

      // Processar pros, contras, pros_resumido e contras_resumido
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
        
        // Converter pros_resumido de string para array se necessário
        if (typeof processed.pros_resumido === "string") {
          processed.pros_resumido = processed.pros_resumido.split(",").map((s: string) => s.trim());
        }
        
        // Converter contras_resumido de string para array se necessário
        if (typeof processed.contras_resumido === "string") {
          processed.contras_resumido = processed.contras_resumido.split(",").map((s: string) => s.trim());
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
      // Remover campos que não existem na tabela do Supabase
      const { royalties_percentual, investimento_minimo, investimento_maximo, unidades_brasil, payback_medio, idade_franquia_anos, ...dataToSave } = franquia;
      
      if (franquia.id) {
        // Update
        const { error } = await supabase
          .from("franquias")
          .update(dataToSave as any)
          .eq("id", franquia.id);

        if (error) throw error;
        toast.success("Franquia atualizada com sucesso");
      } else {
        // Insert
        const { error } = await supabase.from("franquias").insert([dataToSave as any]);

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
