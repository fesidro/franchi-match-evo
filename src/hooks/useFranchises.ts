import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface Franchise {
  id: string;
  nome: string;
  descricao: string | null;
  segmento: string;
  investimento_minimo: number | null;
  investimento_maximo: number | null;
  payback_medio: number | null;
  unidades_brasil: number | null;
  logo_url: string | null;
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
