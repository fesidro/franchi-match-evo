-- ============================================
-- TABELA: franquias (Pacote 1 - Match)
-- ============================================

-- Primeiro, vamos verificar se a tabela existe e fazer backup se necessário
DO $$ 
BEGIN
    IF EXISTS (SELECT FROM pg_tables WHERE tablename = 'franquias') THEN
        -- Se existir, vamos adicionar as colunas que faltam
        ALTER TABLE franquias 
        ADD COLUMN IF NOT EXISTS faturamento_medio TEXT,
        ADD COLUMN IF NOT EXISTS investimento TEXT,
        ADD COLUMN IF NOT EXISTS nivel_interesse_marca TEXT CHECK (nivel_interesse_marca IN ('MUITO ALTO', 'ALTO', 'MÉDIO', 'BAIXO', 'MUITO BAIXO')),
        ADD COLUMN IF NOT EXISTS nivel_interesse_franquia TEXT CHECK (nivel_interesse_franquia IN ('MUITO ALTO', 'ALTO', 'MÉDIO', 'BAIXO', 'MUITO BAIXO')),
        ADD COLUMN IF NOT EXISTS publico_alvo TEXT,
        ADD COLUMN IF NOT EXISTS pros_resumido TEXT[],
        ADD COLUMN IF NOT EXISTS contras_resumido TEXT[],
        ADD COLUMN IF NOT EXISTS data_atualizacao TIMESTAMPTZ;
    END IF;
END $$;

-- ============================================
-- TABELA: franquias_detalhes_pacote2
-- ============================================

CREATE TABLE IF NOT EXISTS franquias_detalhes_pacote2_new (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    franquia_id UUID NOT NULL REFERENCES franquias(id) ON DELETE CASCADE,
    analise_do_segmento TEXT,
    crescimento_anual_segmento NUMERIC(5,2),
    background_nivel_dedicacao TEXT,
    background_investimento TEXT,
    background_satisfacao_franqueados TEXT,
    background_suporte_franquia TEXT,
    unidades_2024 INTEGER,
    unidades_2023 INTEGER,
    crescimento_unidades NUMERIC(5,2) GENERATED ALWAYS AS (
        CASE 
            WHEN unidades_2023 > 0 THEN 
                ((unidades_2024::NUMERIC - unidades_2023::NUMERIC) / unidades_2023::NUMERIC) * 100
            ELSE NULL
        END
    ) STORED,
    capilaridade_regional TEXT,
    idade_franquia INTEGER,
    pros_detalhados TEXT[],
    contras_detalhados TEXT[],
    expertise_necessaria TEXT,
    nivel_experiencia_segmento TEXT,
    experiencia_segmento TEXT,
    habilidades_chaves TEXT[],
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(franquia_id)
);

-- Renomear tabela antiga se existir e copiar dados
DO $$
BEGIN
    IF EXISTS (SELECT FROM pg_tables WHERE tablename = 'franquias_detalhes_pacote2') THEN
        DROP TABLE franquias_detalhes_pacote2;
    END IF;
    
    ALTER TABLE franquias_detalhes_pacote2_new RENAME TO franquias_detalhes_pacote2;
END $$;

-- Criar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_franquias_segmento ON franquias(segmento);
CREATE INDEX IF NOT EXISTS idx_franquias_ativo ON franquias(ativo);
CREATE INDEX IF NOT EXISTS idx_pacote2_franquia_id ON franquias_detalhes_pacote2(franquia_id);

-- Habilitar RLS na nova tabela
ALTER TABLE franquias_detalhes_pacote2 ENABLE ROW LEVEL SECURITY;

-- Criar política de leitura para todos autenticados
CREATE POLICY "Detalhes pacote 2 visíveis para todos autenticados" 
ON franquias_detalhes_pacote2 
FOR SELECT 
TO authenticated
USING (true);

-- Criar política de inserção/atualização/deleção para autenticados
CREATE POLICY "Usuários autenticados podem gerenciar detalhes pacote 2" 
ON franquias_detalhes_pacote2 
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);