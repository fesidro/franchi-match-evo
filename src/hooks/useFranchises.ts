import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface Franchise {
  id: string;
  nome: string;
  logo_url: string | null;
  segmento: string | null;
  subsegmento: string | null;
  investimento: string | null;
  investimento_total: number | null;
  taxa_franquia: string | null;
  royalties: string | null;
  royalties_percentual: number | null;
  faturamento_medio: string | null;
  faturamento_medio_mensal: number | null;
  payback_medio_meses: string | null;
  unidades_brasil: number | null;
  qtd_unidades: number | null;
  idade_franquia_anos: number | null;
  selo_excelencia_abf: boolean | null;
  nivel_satisfacao_franqueados: number | null;
  nivel_suporte_franquia: number | null;
  nivel_interesse_marca: string | null;
  nivel_interesse_franquia: string | null;
  nivel_dedicacao: string | null;
  publico_alvo: string | null;
  pros: string[] | null;
  pros_resumido: string[] | null;
  contras: string[] | null;
  contras_resumido: string[] | null;
  ativo: boolean;
  data_criacao: string;
}

export const useFranchises = (userId: string | undefined) => {
  const [franchises, setFranchises] = useState<Franchise[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchFranchises = async () => {
      try {
        // Buscar IDs das franquias já interagidas
        const { data: interactions } = await supabase
          .from("interacoes_match")
          .select("franquia_id")
          .eq("usuario_id", userId);

        const interactedIds = interactions?.map((i) => i.franquia_id) || [];

        // Buscar franquias que ainda não foram interagidas
        let query = supabase.from("franquias").select("*");

        if (interactedIds.length > 0) {
          query = query.not("id", "in", `(${interactedIds.join(",")})`);
        }

        const { data, error } = await query;

        if (error) throw error;

        setFranchises(data || []);
      } catch (error: any) {
        toast.error("Erro ao carregar franquias");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchFranchises();
  }, [userId]);

  return { franchises, loading, setFranchises };
};
