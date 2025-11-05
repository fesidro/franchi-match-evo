import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FranquiaAdmin } from "@/hooks/useAdminFranquias";

interface FranquiaFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  franquia?: FranquiaAdmin | null;
  onSave: (franquia: FranquiaAdmin) => Promise<boolean>;
}

export const FranquiaFormDialog = ({ open, onOpenChange, franquia, onSave }: FranquiaFormDialogProps) => {
  const [formData, setFormData] = useState<FranquiaAdmin>({
    nome: "",
    logo_url: null,
    selo_excelencia_abf: false,
    segmento: "",
    subsegmento: null,
    descricao: null,
    faturamento_medio: null,
    investimento: null,
    investimento_total: null,
    investimento_minimo: null,
    investimento_maximo: null,
    taxa_franquia: null,
    royalties: null,
    royalties_percentual: null,
    faturamento_medio_mensal: null,
    payback_medio: null,
    payback_medio_meses: null,
    nivel_interesse_marca: null,
    nivel_interesse_franquia: null,
    nivel_dedicacao: null,
    qtd_unidades: null,
    unidades_brasil: null,
    idade_franquia_anos: null,
    nivel_satisfacao_franqueados: null,
    nivel_suporte_franquia: null,
    publico_alvo: null,
    pros: null,
    contras: null,
    pros_resumido: null,
    contras_resumido: null,
    ativo: true,
  });

  useEffect(() => {
    if (franquia) {
      setFormData({
        ...franquia,
        pros: franquia.pros || null,
        contras: franquia.contras || null,
      });
    }
  }, [franquia]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Processar pros_resumido e contras_resumido antes de salvar
    const dataToSave = {
      ...formData,
      pros: formData.pros || null,
      contras: formData.contras || null,
      pros_resumido: formData.pros_resumido && typeof formData.pros_resumido === "string" 
        ? (formData.pros_resumido as string).split("\n").map((s: string) => s.trim()).filter(s => s)
        : formData.pros_resumido,
      contras_resumido: formData.contras_resumido && typeof formData.contras_resumido === "string"
        ? (formData.contras_resumido as string).split("\n").map((s: string) => s.trim()).filter(s => s)
        : formData.contras_resumido,
    };
    
    const success = await onSave(dataToSave);
    if (success) {
      onOpenChange(false);
      resetForm();
    }
  };

  const resetForm = () => {
    setFormData({
      nome: "",
      logo_url: null,
      selo_excelencia_abf: false,
      segmento: "",
      subsegmento: null,
      descricao: null,
      faturamento_medio: null,
      investimento: null,
      investimento_total: null,
      investimento_minimo: null,
      investimento_maximo: null,
      taxa_franquia: null,
      royalties: null,
      royalties_percentual: null,
      faturamento_medio_mensal: null,
      payback_medio: null,
      payback_medio_meses: null,
      nivel_interesse_marca: null,
      nivel_interesse_franquia: null,
      nivel_dedicacao: null,
      qtd_unidades: null,
      unidades_brasil: null,
      idade_franquia_anos: null,
      nivel_satisfacao_franqueados: null,
      nivel_suporte_franquia: null,
      publico_alvo: null,
      pros: null,
      contras: null,
      pros_resumido: null,
      contras_resumido: null,
      ativo: true,
    });
  };

  const prosText = formData.pros ? formData.pros.join(", ") : "";
  const contrasText = formData.contras ? formData.contras.join(", ") : "";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{franquia ? "Editar Franquia" : "Adicionar Nova Franquia"}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Label htmlFor="nome">Nome *</Label>
              <Input
                id="nome"
                required
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              />
            </div>

            <div className="col-span-2">
              <Label htmlFor="logo_url">Logo URL</Label>
              <Input
                id="logo_url"
                value={formData.logo_url || ""}
                onChange={(e) => setFormData({ ...formData, logo_url: e.target.value || null })}
              />
            </div>

            <div className="col-span-2 flex items-center space-x-2">
              <Checkbox
                id="selo_excelencia_abf"
                checked={formData.selo_excelencia_abf}
                onCheckedChange={(checked) => setFormData({ ...formData, selo_excelencia_abf: checked as boolean })}
              />
              <Label htmlFor="selo_excelencia_abf">Selo Excelência ABF</Label>
            </div>

            <div>
              <Label htmlFor="segmento">Segmento *</Label>
              <Input
                id="segmento"
                required
                value={formData.segmento}
                onChange={(e) => setFormData({ ...formData, segmento: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="subsegmento">Subsegmento</Label>
              <Input
                id="subsegmento"
                value={formData.subsegmento || ""}
                onChange={(e) => setFormData({ ...formData, subsegmento: e.target.value || null })}
              />
            </div>

            <div>
              <Label htmlFor="nivel_interesse_marca">Nível de Interesse na Marca (Google)</Label>
              <Select
                value={formData.nivel_interesse_marca || ""}
                onValueChange={(value) => setFormData({ ...formData, nivel_interesse_marca: value || null })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MUITO ALTO">MUITO ALTO</SelectItem>
                  <SelectItem value="ALTO">ALTO</SelectItem>
                  <SelectItem value="MÉDIO">MÉDIO</SelectItem>
                  <SelectItem value="BAIXO">BAIXO</SelectItem>
                  <SelectItem value="MUITO BAIXO">MUITO BAIXO</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="nivel_interesse_franquia">Nível de Interesse na Franquia (Google)</Label>
              <Select
                value={formData.nivel_interesse_franquia || ""}
                onValueChange={(value) => setFormData({ ...formData, nivel_interesse_franquia: value || null })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MUITO ALTO">MUITO ALTO</SelectItem>
                  <SelectItem value="ALTO">ALTO</SelectItem>
                  <SelectItem value="MÉDIO">MÉDIO</SelectItem>
                  <SelectItem value="BAIXO">BAIXO</SelectItem>
                  <SelectItem value="MUITO BAIXO">MUITO BAIXO</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="col-span-2">
              <Label htmlFor="descricao">Descrição</Label>
              <Textarea
                id="descricao"
                value={formData.descricao || ""}
                onChange={(e) => setFormData({ ...formData, descricao: e.target.value || null })}
              />
            </div>

            <div>
              <Label htmlFor="investimento_total">Investimento Total</Label>
              <Input
                id="investimento_total"
                type="number"
                value={formData.investimento_total || ""}
                onChange={(e) => setFormData({ ...formData, investimento_total: e.target.value ? Number(e.target.value) : null })}
              />
            </div>

            <div>
              <Label htmlFor="investimento_minimo">Investimento Mínimo</Label>
              <Input
                id="investimento_minimo"
                type="number"
                value={formData.investimento_minimo || ""}
                onChange={(e) => setFormData({ ...formData, investimento_minimo: e.target.value ? Number(e.target.value) : null })}
              />
            </div>

            <div>
              <Label htmlFor="investimento_maximo">Investimento Máximo</Label>
              <Input
                id="investimento_maximo"
                type="number"
                value={formData.investimento_maximo || ""}
                onChange={(e) => setFormData({ ...formData, investimento_maximo: e.target.value ? Number(e.target.value) : null })}
              />
            </div>

            <div>
              <Label htmlFor="taxa_franquia">Taxa de Franquia</Label>
              <Input
                id="taxa_franquia"
                value={formData.taxa_franquia || ""}
                onChange={(e) => setFormData({ ...formData, taxa_franquia: e.target.value || null })}
                placeholder="Ex: R$ 30 mil"
              />
            </div>

            <div>
              <Label htmlFor="royalties">Royalties</Label>
              <Input
                id="royalties"
                value={formData.royalties || ""}
                onChange={(e) => setFormData({ ...formData, royalties: e.target.value || null })}
                placeholder="Ex: 5% sobre faturamento"
              />
            </div>

            <div>
              <Label htmlFor="faturamento_medio_mensal">Faturamento Médio Mensal</Label>
              <Input
                id="faturamento_medio_mensal"
                type="number"
                value={formData.faturamento_medio_mensal || ""}
                onChange={(e) => setFormData({ ...formData, faturamento_medio_mensal: e.target.value ? Number(e.target.value) : null })}
              />
            </div>

            <div>
              <Label htmlFor="payback_medio_meses">Payback Médio</Label>
              <Input
                id="payback_medio_meses"
                value={formData.payback_medio_meses || ""}
                onChange={(e) => setFormData({ ...formData, payback_medio_meses: e.target.value || null })}
                placeholder="Ex: 24 a 36 meses"
              />
            </div>

            <div>
              <Label htmlFor="nivel_dedicacao">Nível de Dedicação</Label>
              <Select
                value={formData.nivel_dedicacao || ""}
                onValueChange={(value) => setFormData({ ...formData, nivel_dedicacao: value || null })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Part-time">Part-time</SelectItem>
                  <SelectItem value="Gerenciado">Gerenciado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="qtd_unidades">Quantidade de Unidades</Label>
              <Input
                id="qtd_unidades"
                type="number"
                value={formData.qtd_unidades || ""}
                onChange={(e) => setFormData({ ...formData, qtd_unidades: e.target.value ? Number(e.target.value) : null })}
              />
            </div>

            <div>
              <Label htmlFor="idade_franquia_anos">Idade da Franquia (anos)</Label>
              <Input
                id="idade_franquia_anos"
                type="number"
                value={formData.idade_franquia_anos || ""}
                onChange={(e) => setFormData({ ...formData, idade_franquia_anos: e.target.value ? Number(e.target.value) : null })}
              />
            </div>

            <div>
              <Label htmlFor="nivel_satisfacao_franqueados">Nível de Satisfação dos Franqueados (%)</Label>
              <Input
                id="nivel_satisfacao_franqueados"
                type="number"
                step="0.1"
                min="0"
                max="100"
                value={formData.nivel_satisfacao_franqueados || ""}
                onChange={(e) => setFormData({ ...formData, nivel_satisfacao_franqueados: e.target.value ? Number(e.target.value) : null })}
              />
            </div>

            <div>
              <Label htmlFor="nivel_suporte_franquia">Nível de Suporte da Franquia (%)</Label>
              <Input
                id="nivel_suporte_franquia"
                type="number"
                step="0.1"
                min="0"
                max="100"
                value={formData.nivel_suporte_franquia || ""}
                onChange={(e) => setFormData({ ...formData, nivel_suporte_franquia: e.target.value ? Number(e.target.value) : null })}
              />
            </div>

            <div className="col-span-2">
              <Label htmlFor="publico_alvo">Público-Alvo</Label>
              <Textarea
                id="publico_alvo"
                rows={3}
                value={formData.publico_alvo || ""}
                onChange={(e) => setFormData({ ...formData, publico_alvo: e.target.value || null })}
                placeholder="Descreva o público-alvo ideal para esta franquia"
              />
            </div>

            <div className="col-span-2">
              <Label htmlFor="pros_resumido">Prós (Pontos Positivos Resumidos)</Label>
              <Textarea
                id="pros_resumido"
                rows={4}
                value={
                  Array.isArray(formData.pros_resumido)
                    ? formData.pros_resumido.join("\n")
                    : formData.pros_resumido || ""
                }
                onChange={(e) =>
                  setFormData({ ...formData, pros_resumido: e.target.value as any })
                }
                placeholder="Digite cada ponto positivo em uma linha separada"
              />
              <p className="text-sm text-muted-foreground mt-1">Cada linha será um item da lista</p>
            </div>

            <div className="col-span-2">
              <Label htmlFor="contras_resumido">Contras (Pontos Negativos Resumidos)</Label>
              <Textarea
                id="contras_resumido"
                rows={4}
                value={
                  Array.isArray(formData.contras_resumido)
                    ? formData.contras_resumido.join("\n")
                    : formData.contras_resumido || ""
                }
                onChange={(e) =>
                  setFormData({ ...formData, contras_resumido: e.target.value as any })
                }
                placeholder="Digite cada ponto negativo em uma linha separada"
              />
              <p className="text-sm text-muted-foreground mt-1">Cada linha será um item da lista</p>
            </div>

            <div className="col-span-2">
              <Label htmlFor="pros">Prós Detalhados (Separe cada item com vírgula)</Label>
              <Textarea
                id="pros"
                value={prosText}
                onChange={(e) => {
                  const items = e.target.value.split(",").map(s => s.trim()).filter(s => s);
                  setFormData({ ...formData, pros: items.length > 0 ? items : null });
                }}
                placeholder="Ex: Marca forte, Suporte completo, Alto retorno"
              />
            </div>

            <div className="col-span-2">
              <Label htmlFor="contras">Contras Detalhados (Separe cada item com vírgula)</Label>
              <Textarea
                id="contras"
                value={contrasText}
                onChange={(e) => {
                  const items = e.target.value.split(",").map(s => s.trim()).filter(s => s);
                  setFormData({ ...formData, contras: items.length > 0 ? items : null });
                }}
                placeholder="Ex: Alto investimento inicial, Exige dedicação integral"
              />
            </div>

            <div className="col-span-2 flex items-center space-x-2">
              <Checkbox
                id="ativo"
                checked={formData.ativo}
                onCheckedChange={(checked) => setFormData({ ...formData, ativo: checked as boolean })}
              />
              <Label htmlFor="ativo">Ativo</Label>
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">
              {franquia ? "Atualizar" : "Criar"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
