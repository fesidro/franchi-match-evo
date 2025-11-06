-- Remover políticas antigas se existirem
DROP POLICY IF EXISTS "Franquias são visíveis para todos" ON franquias;
DROP POLICY IF EXISTS "Usuários autenticados podem atualizar franquias" ON franquias;
DROP POLICY IF EXISTS "Usuários autenticados podem deletar franquias" ON franquias;
DROP POLICY IF EXISTS "Usuários autenticados podem inserir franquias" ON franquias;
DROP POLICY IF EXISTS "Usuarios podem ver franquias ativas" ON franquias;
DROP POLICY IF EXISTS "Permitir inserção de franquias" ON franquias;
DROP POLICY IF EXISTS "Permitir atualização de franquias" ON franquias;
DROP POLICY IF EXISTS "Permitir exclusão de franquias" ON franquias;

-- Criar políticas completas para franquias
-- SELECT: Todos podem ler franquias ativas
CREATE POLICY "Usuarios podem ver franquias ativas" ON franquias
    FOR SELECT USING (ativo = true);

-- INSERT: Permitir inserção
CREATE POLICY "Permitir inserção de franquias" ON franquias
    FOR INSERT WITH CHECK (true);

-- UPDATE: Permitir atualização
CREATE POLICY "Permitir atualização de franquias" ON franquias
    FOR UPDATE USING (true);

-- DELETE: Permitir exclusão
CREATE POLICY "Permitir exclusão de franquias" ON franquias
    FOR DELETE USING (true);

-- Fazer o mesmo para a tabela franquias_detalhes_pacote2
DROP POLICY IF EXISTS "Detalhes pacote 2 visíveis para todos autenticados" ON franquias_detalhes_pacote2;
DROP POLICY IF EXISTS "Usuários autenticados podem gerenciar detalhes pacote 2" ON franquias_detalhes_pacote2;
DROP POLICY IF EXISTS "Usuarios podem ver detalhes pacote 2" ON franquias_detalhes_pacote2;
DROP POLICY IF EXISTS "Permitir inserção pacote 2" ON franquias_detalhes_pacote2;
DROP POLICY IF EXISTS "Permitir atualização pacote 2" ON franquias_detalhes_pacote2;
DROP POLICY IF EXISTS "Permitir exclusão pacote 2" ON franquias_detalhes_pacote2;

CREATE POLICY "Usuarios podem ver detalhes pacote 2" ON franquias_detalhes_pacote2
    FOR SELECT USING (true);

CREATE POLICY "Permitir inserção pacote 2" ON franquias_detalhes_pacote2
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Permitir atualização pacote 2" ON franquias_detalhes_pacote2
    FOR UPDATE USING (true);

CREATE POLICY "Permitir exclusão pacote 2" ON franquias_detalhes_pacote2
    FOR DELETE USING (true);