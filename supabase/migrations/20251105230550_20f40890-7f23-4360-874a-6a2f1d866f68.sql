-- Adicionar colunas faltantes na tabela franquias
ALTER TABLE franquias
ADD COLUMN IF NOT EXISTS taxa_franquia TEXT,
ADD COLUMN IF NOT EXISTS royalties TEXT,
ADD COLUMN IF NOT EXISTS nivel_interesse_marca TEXT CHECK (nivel_interesse_marca IN ('MUITO ALTO', 'ALTO', 'MÉDIO', 'BAIXO', 'MUITO BAIXO')),
ADD COLUMN IF NOT EXISTS nivel_interesse_franquia TEXT CHECK (nivel_interesse_franquia IN ('MUITO ALTO', 'ALTO', 'MÉDIO', 'BAIXO', 'MUITO BAIXO')),
ADD COLUMN IF NOT EXISTS nivel_dedicacao TEXT CHECK (nivel_dedicacao IN ('Full-time', 'Part-time', 'Gerenciado')),
ADD COLUMN IF NOT EXISTS qtd_unidades INTEGER,
ADD COLUMN IF NOT EXISTS nivel_satisfacao_franqueados NUMERIC(3,1),
ADD COLUMN IF NOT EXISTS nivel_suporte_franquia NUMERIC(3,1),
ADD COLUMN IF NOT EXISTS publico_alvo TEXT,
ADD COLUMN IF NOT EXISTS pros_resumido TEXT[],
ADD COLUMN IF NOT EXISTS contras_resumido TEXT[];