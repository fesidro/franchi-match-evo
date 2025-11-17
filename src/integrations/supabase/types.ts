export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      compras_pacotes: {
        Row: {
          data_compra: string
          data_entrega: string | null
          franquia_id: string | null
          id: string
          pacote: number
          status: string
          usuario_id: string
          valor_pago: number | null
        }
        Insert: {
          data_compra?: string
          data_entrega?: string | null
          franquia_id?: string | null
          id?: string
          pacote: number
          status?: string
          usuario_id: string
          valor_pago?: number | null
        }
        Update: {
          data_compra?: string
          data_entrega?: string | null
          franquia_id?: string | null
          id?: string
          pacote?: number
          status?: string
          usuario_id?: string
          valor_pago?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "compras_pacotes_franquia_id_fkey"
            columns: ["franquia_id"]
            isOneToOne: false
            referencedRelation: "franquias"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "compras_pacotes_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      favoritos: {
        Row: {
          ativo: boolean
          data_favoritado: string
          franquia_id: string
          id: number
          usuario_id: string
        }
        Insert: {
          ativo?: boolean
          data_favoritado?: string
          franquia_id: string
          id?: number
          usuario_id: string
        }
        Update: {
          ativo?: boolean
          data_favoritado?: string
          franquia_id?: string
          id?: number
          usuario_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "favoritos_franquia_id_fkey"
            columns: ["franquia_id"]
            isOneToOne: false
            referencedRelation: "franquias"
            referencedColumns: ["id"]
          },
        ]
      }
      franquias: {
        Row: {
          ativo: boolean
          contras_resumido: string[] | null
          data_criacao: string
          faturamento_medio: string | null
          id: string
          investimento: string | null
          logo_url: string | null
          nivel_dedicacao: string | null
          nivel_interesse_franquia: string | null
          nivel_interesse_marca: string | null
          nivel_satisfacao_franqueados: number | null
          nivel_suporte_franquia: number | null
          nome: string
          payback_medio_meses: string | null
          pros_resumido: string[] | null
          publico_alvo: string | null
          qtd_unidades: string | null
          royalties: string | null
          segmento: string | null
          selo_excelencia_abf: boolean | null
          subsegmento: string | null
          taxa_franquia: string | null
        }
        Insert: {
          ativo?: boolean
          contras_resumido?: string[] | null
          data_criacao?: string
          faturamento_medio?: string | null
          id?: string
          investimento?: string | null
          logo_url?: string | null
          nivel_dedicacao?: string | null
          nivel_interesse_franquia?: string | null
          nivel_interesse_marca?: string | null
          nivel_satisfacao_franqueados?: number | null
          nivel_suporte_franquia?: number | null
          nome: string
          payback_medio_meses?: string | null
          pros_resumido?: string[] | null
          publico_alvo?: string | null
          qtd_unidades?: string | null
          royalties?: string | null
          segmento?: string | null
          selo_excelencia_abf?: boolean | null
          subsegmento?: string | null
          taxa_franquia?: string | null
        }
        Update: {
          ativo?: boolean
          contras_resumido?: string[] | null
          data_criacao?: string
          faturamento_medio?: string | null
          id?: string
          investimento?: string | null
          logo_url?: string | null
          nivel_dedicacao?: string | null
          nivel_interesse_franquia?: string | null
          nivel_interesse_marca?: string | null
          nivel_satisfacao_franqueados?: number | null
          nivel_suporte_franquia?: number | null
          nome?: string
          payback_medio_meses?: string | null
          pros_resumido?: string[] | null
          publico_alvo?: string | null
          qtd_unidades?: string | null
          royalties?: string | null
          segmento?: string | null
          selo_excelencia_abf?: boolean | null
          subsegmento?: string | null
          taxa_franquia?: string | null
        }
        Relationships: []
      }
      franquias_backup_antes_excluir: {
        Row: {
          ativo: boolean | null
          contras: string[] | null
          contras_resumido: string[] | null
          data_criacao: string | null
          faturamento_medio: string | null
          faturamento_medio_mensal: string | null
          id: string | null
          idade_franquia_anos: string | null
          investimento: string | null
          investimento_total: string | null
          logo_url: string | null
          nivel_dedicacao: string | null
          nivel_interesse_franquia: string | null
          nivel_interesse_marca: string | null
          nivel_satisfacao_franqueados: number | null
          nivel_suporte_franquia: number | null
          nome: string | null
          payback_medio_meses: string | null
          pros: string[] | null
          pros_resumido: string[] | null
          publico_alvo: string | null
          qtd_unidades: string | null
          royalties: string | null
          royalties_percentual: string | null
          segmento: string | null
          selo_excelencia_abf: boolean | null
          subsegmento: string | null
          taxa_franquia: string | null
          unidades_brasil: string | null
        }
        Insert: {
          ativo?: boolean | null
          contras?: string[] | null
          contras_resumido?: string[] | null
          data_criacao?: string | null
          faturamento_medio?: string | null
          faturamento_medio_mensal?: string | null
          id?: string | null
          idade_franquia_anos?: string | null
          investimento?: string | null
          investimento_total?: string | null
          logo_url?: string | null
          nivel_dedicacao?: string | null
          nivel_interesse_franquia?: string | null
          nivel_interesse_marca?: string | null
          nivel_satisfacao_franqueados?: number | null
          nivel_suporte_franquia?: number | null
          nome?: string | null
          payback_medio_meses?: string | null
          pros?: string[] | null
          pros_resumido?: string[] | null
          publico_alvo?: string | null
          qtd_unidades?: string | null
          royalties?: string | null
          royalties_percentual?: string | null
          segmento?: string | null
          selo_excelencia_abf?: boolean | null
          subsegmento?: string | null
          taxa_franquia?: string | null
          unidades_brasil?: string | null
        }
        Update: {
          ativo?: boolean | null
          contras?: string[] | null
          contras_resumido?: string[] | null
          data_criacao?: string | null
          faturamento_medio?: string | null
          faturamento_medio_mensal?: string | null
          id?: string | null
          idade_franquia_anos?: string | null
          investimento?: string | null
          investimento_total?: string | null
          logo_url?: string | null
          nivel_dedicacao?: string | null
          nivel_interesse_franquia?: string | null
          nivel_interesse_marca?: string | null
          nivel_satisfacao_franqueados?: number | null
          nivel_suporte_franquia?: number | null
          nome?: string | null
          payback_medio_meses?: string | null
          pros?: string[] | null
          pros_resumido?: string[] | null
          publico_alvo?: string | null
          qtd_unidades?: string | null
          royalties?: string | null
          royalties_percentual?: string | null
          segmento?: string | null
          selo_excelencia_abf?: boolean | null
          subsegmento?: string | null
          taxa_franquia?: string | null
          unidades_brasil?: string | null
        }
        Relationships: []
      }
      franquias_backup_antes_restauracao: {
        Row: {
          ativo: boolean | null
          contras: string[] | null
          contras_resumido: string[] | null
          data_criacao: string | null
          faturamento_medio: string | null
          faturamento_medio_mensal: string | null
          id: string | null
          idade_franquia_anos: string | null
          investimento: string | null
          investimento_total: string | null
          logo_url: string | null
          nivel_dedicacao: string | null
          nivel_interesse_franquia: string | null
          nivel_interesse_marca: string | null
          nivel_satisfacao_franqueados: number | null
          nivel_suporte_franquia: number | null
          nome: string | null
          payback_medio_meses: string | null
          pros: string[] | null
          pros_resumido: string[] | null
          publico_alvo: string | null
          qtd_unidades: string | null
          royalties: string | null
          royalties_percentual: string | null
          segmento: string | null
          selo_excelencia_abf: boolean | null
          subsegmento: string | null
          taxa_franquia: string | null
          unidades_brasil: string | null
        }
        Insert: {
          ativo?: boolean | null
          contras?: string[] | null
          contras_resumido?: string[] | null
          data_criacao?: string | null
          faturamento_medio?: string | null
          faturamento_medio_mensal?: string | null
          id?: string | null
          idade_franquia_anos?: string | null
          investimento?: string | null
          investimento_total?: string | null
          logo_url?: string | null
          nivel_dedicacao?: string | null
          nivel_interesse_franquia?: string | null
          nivel_interesse_marca?: string | null
          nivel_satisfacao_franqueados?: number | null
          nivel_suporte_franquia?: number | null
          nome?: string | null
          payback_medio_meses?: string | null
          pros?: string[] | null
          pros_resumido?: string[] | null
          publico_alvo?: string | null
          qtd_unidades?: string | null
          royalties?: string | null
          royalties_percentual?: string | null
          segmento?: string | null
          selo_excelencia_abf?: boolean | null
          subsegmento?: string | null
          taxa_franquia?: string | null
          unidades_brasil?: string | null
        }
        Update: {
          ativo?: boolean | null
          contras?: string[] | null
          contras_resumido?: string[] | null
          data_criacao?: string | null
          faturamento_medio?: string | null
          faturamento_medio_mensal?: string | null
          id?: string | null
          idade_franquia_anos?: string | null
          investimento?: string | null
          investimento_total?: string | null
          logo_url?: string | null
          nivel_dedicacao?: string | null
          nivel_interesse_franquia?: string | null
          nivel_interesse_marca?: string | null
          nivel_satisfacao_franqueados?: number | null
          nivel_suporte_franquia?: number | null
          nome?: string | null
          payback_medio_meses?: string | null
          pros?: string[] | null
          pros_resumido?: string[] | null
          publico_alvo?: string | null
          qtd_unidades?: string | null
          royalties?: string | null
          royalties_percentual?: string | null
          segmento?: string | null
          selo_excelencia_abf?: boolean | null
          subsegmento?: string | null
          taxa_franquia?: string | null
          unidades_brasil?: string | null
        }
        Relationships: []
      }
      franquias_detalhes_pacote2: {
        Row: {
          analise_crescimento: string | null
          analise_macroeconomica: string | null
          analise_satisfacao_qualitativa: string | null
          contexto_dedicacao: string | null
          contexto_suporte_detalhado: string | null
          detalhes_investimento: Json | null
          dificuldades_do_segmento: string | null
          expertise_necessaria: string | null
          franquia_id: string
          habilidades_chaves: string[] | null
          historico_crescimento_unidades: Json | null
          id: string
          persona_franqueado_ideal: string | null
          persona_publico_alvo: string | null
          principais_players_concorrentes: string | null
          projecao_crescimento_segmento: string | null
        }
        Insert: {
          analise_crescimento?: string | null
          analise_macroeconomica?: string | null
          analise_satisfacao_qualitativa?: string | null
          contexto_dedicacao?: string | null
          contexto_suporte_detalhado?: string | null
          detalhes_investimento?: Json | null
          dificuldades_do_segmento?: string | null
          expertise_necessaria?: string | null
          franquia_id: string
          habilidades_chaves?: string[] | null
          historico_crescimento_unidades?: Json | null
          id?: string
          persona_franqueado_ideal?: string | null
          persona_publico_alvo?: string | null
          principais_players_concorrentes?: string | null
          projecao_crescimento_segmento?: string | null
        }
        Update: {
          analise_crescimento?: string | null
          analise_macroeconomica?: string | null
          analise_satisfacao_qualitativa?: string | null
          contexto_dedicacao?: string | null
          contexto_suporte_detalhado?: string | null
          detalhes_investimento?: Json | null
          dificuldades_do_segmento?: string | null
          expertise_necessaria?: string | null
          franquia_id?: string
          habilidades_chaves?: string[] | null
          historico_crescimento_unidades?: Json | null
          id?: string
          persona_franqueado_ideal?: string | null
          persona_publico_alvo?: string | null
          principais_players_concorrentes?: string | null
          projecao_crescimento_segmento?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "franquias_detalhes_pacote2_franquia_id_fkey"
            columns: ["franquia_id"]
            isOneToOne: false
            referencedRelation: "franquias"
            referencedColumns: ["id"]
          },
        ]
      }
      franquias_detalhes_pacote3: {
        Row: {
          analise_processos_judiciais: Json | null
          cof_pegadinhas: string[] | null
          cof_pontos_principais: string | null
          cof_url: string | null
          condicoes_repasse: string | null
          condicoes_rescisao: string | null
          franquia_id: string
          id: string
          modelo_negocio_segredos: string | null
          ranking_confianca_classificacao: number | null
          ranking_confianca_pontos_negativos: string[] | null
          ranking_confianca_pontos_positivos: string[] | null
          tempo_contrato: string | null
        }
        Insert: {
          analise_processos_judiciais?: Json | null
          cof_pegadinhas?: string[] | null
          cof_pontos_principais?: string | null
          cof_url?: string | null
          condicoes_repasse?: string | null
          condicoes_rescisao?: string | null
          franquia_id: string
          id?: string
          modelo_negocio_segredos?: string | null
          ranking_confianca_classificacao?: number | null
          ranking_confianca_pontos_negativos?: string[] | null
          ranking_confianca_pontos_positivos?: string[] | null
          tempo_contrato?: string | null
        }
        Update: {
          analise_processos_judiciais?: Json | null
          cof_pegadinhas?: string[] | null
          cof_pontos_principais?: string | null
          cof_url?: string | null
          condicoes_repasse?: string | null
          condicoes_rescisao?: string | null
          franquia_id?: string
          id?: string
          modelo_negocio_segredos?: string | null
          ranking_confianca_classificacao?: number | null
          ranking_confianca_pontos_negativos?: string[] | null
          ranking_confianca_pontos_positivos?: string[] | null
          tempo_contrato?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "franquias_detalhes_pacote3_franquia_id_fkey"
            columns: ["franquia_id"]
            isOneToOne: false
            referencedRelation: "franquias"
            referencedColumns: ["id"]
          },
        ]
      }
      franquias_detalhes_pacote4: {
        Row: {
          analise_construcao_margem: Json | null
          analise_demanda_real: Json | null
          dre_cenarios: Json | null
          franquia_id: string
          id: string
          mapa_cidade_perfil: Json | null
          mapa_concorrentes: Json | null
          pesquisa_valores_imobiliarios: Json | null
          regiao_analise: string | null
        }
        Insert: {
          analise_construcao_margem?: Json | null
          analise_demanda_real?: Json | null
          dre_cenarios?: Json | null
          franquia_id: string
          id?: string
          mapa_cidade_perfil?: Json | null
          mapa_concorrentes?: Json | null
          pesquisa_valores_imobiliarios?: Json | null
          regiao_analise?: string | null
        }
        Update: {
          analise_construcao_margem?: Json | null
          analise_demanda_real?: Json | null
          dre_cenarios?: Json | null
          franquia_id?: string
          id?: string
          mapa_cidade_perfil?: Json | null
          mapa_concorrentes?: Json | null
          pesquisa_valores_imobiliarios?: Json | null
          regiao_analise?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "franquias_detalhes_pacote4_franquia_id_fkey"
            columns: ["franquia_id"]
            isOneToOne: false
            referencedRelation: "franquias"
            referencedColumns: ["id"]
          },
        ]
      }
      interacoes_match: {
        Row: {
          acao: string
          data_acao: string
          franquia_id: string
          id: number
          usuario_id: string
        }
        Insert: {
          acao: string
          data_acao?: string
          franquia_id: string
          id?: number
          usuario_id: string
        }
        Update: {
          acao?: string
          data_acao?: string
          franquia_id?: string
          id?: number
          usuario_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "interacoes_match_franquia_id_fkey"
            columns: ["franquia_id"]
            isOneToOne: false
            referencedRelation: "franquias"
            referencedColumns: ["id"]
          },
        ]
      }
      perfil_investidor: {
        Row: {
          background_profissional: string | null
          dedicacao_desejada: string | null
          id: string
          investimento_disponivel: number | null
          nivel_experiencia: string | null
          tempo_para_abrir: string | null
          usuario_id: string
        }
        Insert: {
          background_profissional?: string | null
          dedicacao_desejada?: string | null
          id?: string
          investimento_disponivel?: number | null
          nivel_experiencia?: string | null
          tempo_para_abrir?: string | null
          usuario_id: string
        }
        Update: {
          background_profissional?: string | null
          dedicacao_desejada?: string | null
          id?: string
          investimento_disponivel?: number | null
          nivel_experiencia?: string | null
          tempo_para_abrir?: string | null
          usuario_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "perfil_investidor_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      usuarios: {
        Row: {
          aceite_termos: boolean
          data_cadastro: string
          email: string
          id: string
          nome_completo: string | null
          perfil_completo: boolean
          whatsapp: string | null
        }
        Insert: {
          aceite_termos?: boolean
          data_cadastro?: string
          email: string
          id?: string
          nome_completo?: string | null
          perfil_completo?: boolean
          whatsapp?: string | null
        }
        Update: {
          aceite_termos?: boolean
          data_cadastro?: string
          email?: string
          id?: string
          nome_completo?: string | null
          perfil_completo?: boolean
          whatsapp?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
