import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const useMatchInteractions = (userId: string | undefined) => {
  const recordInteraction = async (franquiaId: string, acao: "gostei" | "nao_gostei") => {
    if (!userId) return false;

    try {
      const { error } = await supabase.from("interacoes_match").insert({
        usuario_id: userId,
        franquia_id: franquiaId,
        acao,
      });

      if (error) throw error;
      return true;
    } catch (error: any) {
      toast.error("Erro ao registrar interação");
      console.error(error);
      return false;
    }
  };

  return { recordInteraction };
};
