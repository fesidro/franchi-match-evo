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
          created_at: string | null
          data_compra: string | null
          franquia_id: string
          id: string
          numero_pacote: number
          pago: boolean | null
          usuario_id: string
          valor: number | null
        }
        Insert: {
          created_at?: string | null
          data_compra?: string | null
          franquia_id: string
          id?: string
          numero_pacote: number
          pago?: boolean | null
          usuario_id: string
          valor?: number | null
        }
        Update: {
          created_at?: string | null
          data_compra?: string | null
          franquia_id?: string
          id?: string
          numero_pacote?: number
          pago?: boolean | null
          usuario_id?: string
          valor?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "compras_pacotes_franquia_id_fkey"
            columns: ["franquia_id"]
            isOneToOne: false
            referencedRelation: "franquias"
            referencedColumns: ["id"]
          },
        ]
      }
      favoritos: {
        Row: {
          ativo: boolean | null
          created_at: string | null
          franquia_id: string
          id: string
          updated_at: string | null
          usuario_id: string
        }
        Insert: {
          ativo?: boolean | null
          created_at?: string | null
          franquia_id: string
          id?: string
          updated_at?: string | null
          usuario_id: string
        }
        Update: {
          ativo?: boolean | null
          created_at?: string | null
          franquia_id?: string
          id?: string
          updated_at?: string | null
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
          ativo: boolean | null
          contras: string[] | null
          created_at: string | null
          descricao: string | null
          faturamento_medio_mensal: number | null
          id: string
          idade_franquia_anos: number | null
          investimento_maximo: number | null
          investimento_minimo: number | null
          investimento_total: number | null
          logo_url: string | null
          nivel_dedicacao: string | null
          nivel_satisfacao_franqueados: number | null
          nivel_suporte_franquia: number | null
          nome: string
          payback_medio: number | null
          payback_medio_meses: number | null
          pros: string[] | null
          qtd_unidades: number | null
          royalties_percentual: number | null
          segmento: string
          selo_excelencia_abf: boolean | null
          subsegmento: string | null
          taxa_franquia: number | null
          unidades_brasil: number | null
        }
        Insert: {
          ativo?: boolean | null
          contras?: string[] | null
          created_at?: string | null
          descricao?: string | null
          faturamento_medio_mensal?: number | null
          id?: string
          idade_franquia_anos?: number | null
          investimento_maximo?: number | null
          investimento_minimo?: number | null
          investimento_total?: number | null
          logo_url?: string | null
          nivel_dedicacao?: string | null
          nivel_satisfacao_franqueados?: number | null
          nivel_suporte_franquia?: number | null
          nome: string
          payback_medio?: number | null
          payback_medio_meses?: number | null
          pros?: string[] | null
          qtd_unidades?: number | null
          royalties_percentual?: number | null
          segmento: string
          selo_excelencia_abf?: boolean | null
          subsegmento?: string | null
          taxa_franquia?: number | null
          unidades_brasil?: number | null
        }
        Update: {
          ativo?: boolean | null
          contras?: string[] | null
          created_at?: string | null
          descricao?: string | null
          faturamento_medio_mensal?: number | null
          id?: string
          idade_franquia_anos?: number | null
          investimento_maximo?: number | null
          investimento_minimo?: number | null
          investimento_total?: number | null
          logo_url?: string | null
          nivel_dedicacao?: string | null
          nivel_satisfacao_franqueados?: number | null
          nivel_suporte_franquia?: number | null
          nome?: string
          payback_medio?: number | null
          payback_medio_meses?: number | null
          pros?: string[] | null
          qtd_unidades?: number | null
          royalties_percentual?: number | null
          segmento?: string
          selo_excelencia_abf?: boolean | null
          subsegmento?: string | null
          taxa_franquia?: number | null
          unidades_brasil?: number | null
        }
        Relationships: []
      }
      franquias_detalhes_pacote2: {
        Row: {
          created_at: string | null
          franquia_id: string
          id: string
          requisitos_espaco: string | null
          suporte_oferecido: string | null
          taxa_franquia: number | null
          taxa_marketing: number | null
          taxa_royalties: number | null
          territorio_exclusivo: boolean | null
          treinamento: string | null
        }
        Insert: {
          created_at?: string | null
          franquia_id: string
          id?: string
          requisitos_espaco?: string | null
          suporte_oferecido?: string | null
          taxa_franquia?: number | null
          taxa_marketing?: number | null
          taxa_royalties?: number | null
          territorio_exclusivo?: boolean | null
          treinamento?: string | null
        }
        Update: {
          created_at?: string | null
          franquia_id?: string
          id?: string
          requisitos_espaco?: string | null
          suporte_oferecido?: string | null
          taxa_franquia?: number | null
          taxa_marketing?: number | null
          taxa_royalties?: number | null
          territorio_exclusivo?: boolean | null
          treinamento?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "franquias_detalhes_pacote2_franquia_id_fkey"
            columns: ["franquia_id"]
            isOneToOne: true
            referencedRelation: "franquias"
            referencedColumns: ["id"]
          },
        ]
      }
      franquias_detalhes_pacote3: {
        Row: {
          analise_mercado: string | null
          created_at: string | null
          franquia_id: string
          id: string
          pontos_fortes: string | null
          pontos_fracos: string | null
          potencial_retorno: string | null
          riscos_identificados: string | null
        }
        Insert: {
          analise_mercado?: string | null
          created_at?: string | null
          franquia_id: string
          id?: string
          pontos_fortes?: string | null
          pontos_fracos?: string | null
          potencial_retorno?: string | null
          riscos_identificados?: string | null
        }
        Update: {
          analise_mercado?: string | null
          created_at?: string | null
          franquia_id?: string
          id?: string
          pontos_fortes?: string | null
          pontos_fracos?: string | null
          potencial_retorno?: string | null
          riscos_identificados?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "franquias_detalhes_pacote3_franquia_id_fkey"
            columns: ["franquia_id"]
            isOneToOne: true
            referencedRelation: "franquias"
            referencedColumns: ["id"]
          },
        ]
      }
      franquias_detalhes_pacote4: {
        Row: {
          created_at: string | null
          cronograma_implementacao: string | null
          documentos_necessarios: string | null
          estrategia_negociacao: string | null
          franquia_id: string
          id: string
          suporte_pos_venda: string | null
        }
        Insert: {
          created_at?: string | null
          cronograma_implementacao?: string | null
          documentos_necessarios?: string | null
          estrategia_negociacao?: string | null
          franquia_id: string
          id?: string
          suporte_pos_venda?: string | null
        }
        Update: {
          created_at?: string | null
          cronograma_implementacao?: string | null
          documentos_necessarios?: string | null
          estrategia_negociacao?: string | null
          franquia_id?: string
          id?: string
          suporte_pos_venda?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "franquias_detalhes_pacote4_franquia_id_fkey"
            columns: ["franquia_id"]
            isOneToOne: true
            referencedRelation: "franquias"
            referencedColumns: ["id"]
          },
        ]
      }
      interacoes_match: {
        Row: {
          acao: string
          created_at: string | null
          franquia_id: string
          id: string
          usuario_id: string
        }
        Insert: {
          acao: string
          created_at?: string | null
          franquia_id: string
          id?: string
          usuario_id: string
        }
        Update: {
          acao?: string
          created_at?: string | null
          franquia_id?: string
          id?: string
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
