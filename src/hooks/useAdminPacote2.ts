import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Pacote2Data {
  franquia_nome: string;
  analise_do_segmento?: string;
  crescimento_anual_segmento?: number;
  background_nivel_dedicacao?: string;
  background_investimento?: string;
  unidades_2024?: number;
  unidades_2023?: number;
  capilaridade_regional?: string;
  background_satisfacao_franqueados?: string;
  background_suporte_franquia?: string;
  idade_franquia?: number;
  pros_detalhados?: string[];
  contras_detalhados?: string[];
  expertise_necessaria?: string;
  nivel_experiencia_segmento?: string;
  experiencia_segmento?: string;
  habilidades_chaves?: string[];
}

export const useAdminPacote2 = () => {
  const [loading, setLoading] = useState(false);

  const importFromJson = async (jsonText: string) => {
    setLoading(true);
    try {
      const data = JSON.parse(jsonText) as Pacote2Data[];
      
      if (!Array.isArray(data)) {
        toast.error("O JSON deve ser um array de objetos");
        return;
      }

      let successCount = 0;
      let errorCount = 0;
      const errors: string[] = [];

      for (const item of data) {
        try {
          // Buscar franquia pelo nome exato
          const { data: franquiaData, error: franquiaError } = await supabase
            .from("franquias")
            .select("id")
            .eq("nome", item.franquia_nome)
            .single();

          if (franquiaError || !franquiaData) {
            errors.push(`Franquia não encontrada: ${item.franquia_nome}`);
            errorCount++;
            continue;
          }

          const franquiaId = franquiaData.id;

          // Verificar se já existe registro
          const { data: existingData } = await supabase
            .from("franquias_detalhes_pacote2")
            .select("id")
            .eq("franquia_id", franquiaId)
            .maybeSingle();

          const pacote2Record = {
            franquia_id: franquiaId,
            analise_do_segmento: item.analise_do_segmento || null,
            crescimento_anual_segmento: item.crescimento_anual_segmento || null,
            background_nivel_dedicacao: item.background_nivel_dedicacao || null,
            background_investimento: item.background_investimento || null,
            unidades_2024: item.unidades_2024 || null,
            unidades_2023: item.unidades_2023 || null,
            capilaridade_regional: item.capilaridade_regional || null,
            background_satisfacao_franqueados: item.background_satisfacao_franqueados || null,
            background_suporte_franquia: item.background_suporte_franquia || null,
            idade_franquia: item.idade_franquia || null,
            pros_detalhados: item.pros_detalhados || null,
            contras_detalhados: item.contras_detalhados || null,
            expertise_necessaria: item.expertise_necessaria || null,
            nivel_experiencia_segmento: item.nivel_experiencia_segmento || null,
            experiencia_segmento: item.experiencia_segmento || null,
            habilidades_chaves: item.habilidades_chaves || null,
          };

          if (existingData) {
            // Atualizar registro existente
            const { error: updateError } = await supabase
              .from("franquias_detalhes_pacote2")
              .update(pacote2Record)
              .eq("id", existingData.id);

            if (updateError) {
              errors.push(`Erro ao atualizar ${item.franquia_nome}: ${updateError.message}`);
              errorCount++;
            } else {
              successCount++;
            }
          } else {
            // Criar novo registro
            const { error: insertError } = await supabase
              .from("franquias_detalhes_pacote2")
              .insert(pacote2Record);

            if (insertError) {
              errors.push(`Erro ao inserir ${item.franquia_nome}: ${insertError.message}`);
              errorCount++;
            } else {
              successCount++;
            }
          }
        } catch (itemError) {
          errors.push(`Erro ao processar ${item.franquia_nome}: ${itemError}`);
          errorCount++;
        }
      }

      // Exibir resultados
      if (successCount > 0) {
        toast.success(`${successCount} registro(s) do Pacote 2 importado(s) com sucesso!`);
      }
      
      if (errorCount > 0) {
        toast.error(`${errorCount} erro(s) durante a importação`, {
          description: errors.slice(0, 3).join("\n") + (errors.length > 3 ? "\n..." : ""),
        });
        console.error("Erros detalhados:", errors);
      }

    } catch (error) {
      console.error("Erro ao importar dados do Pacote 2:", error);
      toast.error("Erro ao processar o JSON. Verifique o formato.");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    importFromJson,
  };
};
