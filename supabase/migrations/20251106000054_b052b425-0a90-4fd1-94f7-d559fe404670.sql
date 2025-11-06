-- ETAPA 1: CORRIGIR TIPOS DE DADOS E CONSTRAINTS

-- Remover constraints existentes que podem causar problemas
ALTER TABLE franquias DROP CONSTRAINT IF EXISTS franquias_nivel_interesse_marca_check;
ALTER TABLE franquias DROP CONSTRAINT IF EXISTS franquias_nivel_interesse_franquia_check;
ALTER TABLE franquias DROP CONSTRAINT IF EXISTS franquias_nivel_dedicacao_check;

-- Alterar tipos de dados para TEXT (campos que devem aceitar texto livre)
ALTER TABLE franquias ALTER COLUMN faturamento_medio TYPE TEXT;
ALTER TABLE franquias ALTER COLUMN investimento TYPE TEXT;
ALTER TABLE franquias ALTER COLUMN payback_medio_meses TYPE TEXT;
ALTER TABLE franquias ALTER COLUMN taxa_franquia TYPE TEXT;
ALTER TABLE franquias ALTER COLUMN royalties TYPE TEXT;

-- Recriar constraints com valores corretos
ALTER TABLE franquias ADD CONSTRAINT franquias_nivel_interesse_marca_check 
  CHECK (nivel_interesse_marca IN ('MUITO ALTO', 'ALTO', 'MÉDIO', 'BAIXO', 'MUITO BAIXO'));

ALTER TABLE franquias ADD CONSTRAINT franquias_nivel_interesse_franquia_check 
  CHECK (nivel_interesse_franquia IN ('MUITO ALTO', 'ALTO', 'MÉDIO', 'BAIXO', 'MUITO BAIXO'));

ALTER TABLE franquias ADD CONSTRAINT franquias_nivel_dedicacao_check 
  CHECK (nivel_dedicacao IN ('Full-time', 'Part-time', 'Gerenciado'));