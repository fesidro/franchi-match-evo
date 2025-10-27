-- Criar tabela de franquias
CREATE TABLE public.franquias (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  descricao TEXT,
  segmento TEXT NOT NULL,
  investimento_minimo DECIMAL(15,2),
  investimento_maximo DECIMAL(15,2),
  payback_medio INTEGER,
  unidades_brasil INTEGER,
  logo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Criar tabela de interações de match
CREATE TABLE public.interacoes_match (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  franquia_id UUID NOT NULL REFERENCES public.franquias(id) ON DELETE CASCADE,
  acao TEXT NOT NULL CHECK (acao IN ('gostei', 'nao_gostei', 'favoritou', 'desfavoritou')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Criar tabela de favoritos
CREATE TABLE public.favoritos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  franquia_id UUID NOT NULL REFERENCES public.franquias(id) ON DELETE CASCADE,
  ativo BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(usuario_id, franquia_id)
);

-- Criar tabela de detalhes pacote 2
CREATE TABLE public.franquias_detalhes_pacote2 (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  franquia_id UUID NOT NULL REFERENCES public.franquias(id) ON DELETE CASCADE UNIQUE,
  taxa_franquia DECIMAL(15,2),
  taxa_royalties DECIMAL(5,2),
  taxa_marketing DECIMAL(5,2),
  suporte_oferecido TEXT,
  treinamento TEXT,
  territorio_exclusivo BOOLEAN,
  requisitos_espaco TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Criar tabela de detalhes pacote 3
CREATE TABLE public.franquias_detalhes_pacote3 (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  franquia_id UUID NOT NULL REFERENCES public.franquias(id) ON DELETE CASCADE UNIQUE,
  analise_mercado TEXT,
  potencial_retorno TEXT,
  riscos_identificados TEXT,
  pontos_fortes TEXT,
  pontos_fracos TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Criar tabela de detalhes pacote 4
CREATE TABLE public.franquias_detalhes_pacote4 (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  franquia_id UUID NOT NULL REFERENCES public.franquias(id) ON DELETE CASCADE UNIQUE,
  estrategia_negociacao TEXT,
  documentos_necessarios TEXT,
  cronograma_implementacao TEXT,
  suporte_pos_venda TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Criar tabela de compras de pacotes
CREATE TABLE public.compras_pacotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  franquia_id UUID NOT NULL REFERENCES public.franquias(id) ON DELETE CASCADE,
  numero_pacote INTEGER NOT NULL CHECK (numero_pacote IN (2, 3, 4)),
  pago BOOLEAN DEFAULT false,
  valor DECIMAL(10,2),
  data_compra TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(usuario_id, franquia_id, numero_pacote)
);

-- Enable RLS
ALTER TABLE public.franquias ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interacoes_match ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favoritos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.franquias_detalhes_pacote2 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.franquias_detalhes_pacote3 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.franquias_detalhes_pacote4 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.compras_pacotes ENABLE ROW LEVEL SECURITY;

-- RLS Policies para franquias (todos podem ver)
CREATE POLICY "Franquias são visíveis para todos"
  ON public.franquias FOR SELECT
  USING (true);

-- RLS Policies para interacoes_match
CREATE POLICY "Usuários podem ver suas próprias interações"
  ON public.interacoes_match FOR SELECT
  USING (auth.uid() = usuario_id);

CREATE POLICY "Usuários podem criar suas próprias interações"
  ON public.interacoes_match FOR INSERT
  WITH CHECK (auth.uid() = usuario_id);

-- RLS Policies para favoritos
CREATE POLICY "Usuários podem ver seus próprios favoritos"
  ON public.favoritos FOR SELECT
  USING (auth.uid() = usuario_id);

CREATE POLICY "Usuários podem criar seus próprios favoritos"
  ON public.favoritos FOR INSERT
  WITH CHECK (auth.uid() = usuario_id);

CREATE POLICY "Usuários podem atualizar seus próprios favoritos"
  ON public.favoritos FOR UPDATE
  USING (auth.uid() = usuario_id);

-- RLS Policies para detalhes pacote 2 (todos podem ver)
CREATE POLICY "Detalhes pacote 2 visíveis para todos"
  ON public.franquias_detalhes_pacote2 FOR SELECT
  USING (true);

-- RLS Policies para detalhes pacote 3 (apenas quem comprou)
CREATE POLICY "Usuários podem ver detalhes pacote 3 se compraram"
  ON public.franquias_detalhes_pacote3 FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.compras_pacotes
      WHERE usuario_id = auth.uid()
        AND franquia_id = franquias_detalhes_pacote3.franquia_id
        AND numero_pacote = 3
        AND pago = true
    )
  );

-- RLS Policies para detalhes pacote 4 (apenas quem comprou)
CREATE POLICY "Usuários podem ver detalhes pacote 4 se compraram"
  ON public.franquias_detalhes_pacote4 FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.compras_pacotes
      WHERE usuario_id = auth.uid()
        AND franquia_id = franquias_detalhes_pacote4.franquia_id
        AND numero_pacote = 4
        AND pago = true
    )
  );

-- RLS Policies para compras_pacotes
CREATE POLICY "Usuários podem ver suas próprias compras"
  ON public.compras_pacotes FOR SELECT
  USING (auth.uid() = usuario_id);

CREATE POLICY "Usuários podem criar suas próprias compras"
  ON public.compras_pacotes FOR INSERT
  WITH CHECK (auth.uid() = usuario_id);

-- Trigger para atualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_favoritos_updated_at
  BEFORE UPDATE ON public.favoritos
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Inserir dados de exemplo de franquias
INSERT INTO public.franquias (nome, descricao, segmento, investimento_minimo, investimento_maximo, payback_medio, unidades_brasil, logo_url) VALUES
('McDonald''s', 'Rede internacional de fast-food', 'Alimentação', 500000, 1500000, 36, 2500, null),
('O Boticário', 'Franquia de cosméticos e perfumaria', 'Beleza', 150000, 350000, 24, 3800, null),
('Subway', 'Sanduíches e fast-food saudável', 'Alimentação', 250000, 500000, 30, 2200, null),
('Chilli Beans', 'Óculos de sol e acessórios', 'Moda', 120000, 280000, 28, 850, null),
('Localiza', 'Locação de veículos', 'Serviços', 800000, 2000000, 48, 650, null),
('Mundo Verde', 'Produtos naturais e suplementos', 'Saúde', 180000, 400000, 32, 480, null),
('Kumon', 'Educação complementar', 'Educação', 80000, 150000, 18, 1800, null),
('Wizard', 'Ensino de idiomas', 'Educação', 200000, 450000, 36, 1200, null);

-- Inserir detalhes pacote 2 para algumas franquias
INSERT INTO public.franquias_detalhes_pacote2 (franquia_id, taxa_franquia, taxa_royalties, taxa_marketing, suporte_oferecido, treinamento, territorio_exclusivo, requisitos_espaco)
SELECT id, 50000, 5.0, 5.0, 'Suporte completo de instalação e operação', 'Treinamento inicial de 30 dias', true, 'Mínimo 100m²'
FROM public.franquias
WHERE nome IN ('McDonald''s', 'O Boticário', 'Subway', 'Chilli Beans');