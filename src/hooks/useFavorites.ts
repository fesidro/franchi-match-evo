import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Franchise } from "./useFranchises";

export interface Favorite extends Franchise {
  favorito_id: string;
}

export const useFavorites = (userId: string | undefined) => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFavorites = async () => {
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("favoritos")
        .select(`
          id,
          franquias (*)
        `)
        .eq("usuario_id", userId)
        .eq("ativo", true);

      if (error) throw error;

      const favoritesData = data?.map((fav: any) => ({
        favorito_id: fav.id,
        ...fav.franquias,
      })) || [];

      setFavorites(favoritesData);
    } catch (error: any) {
      toast.error("Erro ao carregar favoritos");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, [userId]);

  const addFavorite = async (franquia: Franchise): Promise<boolean> => {
    if (!userId) return false;

    try {
      // Verificar limite de 3 favoritos
      const { count } = await supabase
        .from("favoritos")
        .select("*", { count: "exact", head: true })
        .eq("usuario_id", userId)
        .eq("ativo", true);

      if (count !== null && count >= 3) {
        toast.error("Você atingiu o limite de 3 favoritos gratuitos. Desfavorite uma marca para adicionar outra.");
        return false;
      }

      // Inserir favorito
      const { error: favError } = await supabase
        .from("favoritos")
        .insert({
          usuario_id: userId,
          franquia_id: franquia.id,
          ativo: true,
        });

      if (favError) throw favError;

      // Registrar interação
      await supabase.from("interacoes_match").insert({
        usuario_id: userId,
        franquia_id: franquia.id,
        acao: "favoritou",
      });

      await fetchFavorites();
      toast.success(`${franquia.nome} adicionada aos favoritos!`);
      return true;
    } catch (error: any) {
      toast.error("Erro ao adicionar favorito");
      console.error(error);
      return false;
    }
  };

  const removeFavorite = async (favoritoId: string, franquiaId: string) => {
    if (!userId) return;

    try {
      // Atualizar favorito para inativo
      const { error: updateError } = await supabase
        .from("favoritos")
        .update({ ativo: false })
        .eq("id", favoritoId);

      if (updateError) throw updateError;

      // Registrar interação
      await supabase.from("interacoes_match").insert({
        usuario_id: userId,
        franquia_id: franquiaId,
        acao: "desfavoritou",
      });

      await fetchFavorites();
      toast.success("Favorito removido!");
    } catch (error: any) {
      toast.error("Erro ao remover favorito");
      console.error(error);
    }
  };

  return { favorites, loading, addFavorite, removeFavorite };
};
