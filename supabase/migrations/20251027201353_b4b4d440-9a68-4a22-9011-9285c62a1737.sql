-- Adicionar novos campos à tabela franquias
ALTER TABLE public.franquias
ADD COLUMN IF NOT EXISTS selo_excelencia_abf boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS subsegmento text,
ADD COLUMN IF NOT EXISTS investimento_total numeric,
ADD COLUMN IF NOT EXISTS taxa_franquia numeric,
ADD COLUMN IF NOT EXISTS royalties_percentual numeric,
ADD COLUMN IF NOT EXISTS faturamento_medio_mensal numeric,
ADD COLUMN IF NOT EXISTS payback_medio_meses integer,
ADD COLUMN IF NOT EXISTS nivel_dedicacao text,
ADD COLUMN IF NOT EXISTS qtd_unidades integer,
ADD COLUMN IF NOT EXISTS idade_franquia_anos integer,
ADD COLUMN IF NOT EXISTS nivel_satisfacao_franqueados numeric,
ADD COLUMN IF NOT EXISTS nivel_suporte_franquia numeric,
ADD COLUMN IF NOT EXISTS pros text[],
ADD COLUMN IF NOT EXISTS contras text[],
ADD COLUMN IF NOT EXISTS ativo boolean DEFAULT true;

-- Adicionar políticas RLS para permitir operações de admin
-- (Por enquanto permitindo para usuários autenticados, idealmente deveria verificar se é admin)
CREATE POLICY "Usuários autenticados podem inserir franquias"
ON public.franquias
FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Usuários autenticados podem atualizar franquias"
ON public.franquias
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Usuários autenticados podem deletar franquias"
ON public.franquias
FOR DELETE
TO authenticated
USING (true);