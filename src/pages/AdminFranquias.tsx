import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useAdminFranquias, FranquiaAdmin } from "@/hooks/useAdminFranquias";
import { FranquiaFormDialog } from "@/components/admin/FranquiaFormDialog";
import { Upload, Trash2, Plus, Edit, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminFranquias = () => {
  const navigate = useNavigate();
  const { franquias, loading, importFromJson, clearAll, deleteFranquia, saveFranquia } = useAdminFranquias();
  
  const [jsonInput, setJsonInput] = useState("");
  const [showClearDialog, setShowClearDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedFranquia, setSelectedFranquia] = useState<FranquiaAdmin | null>(null);
  const [showFormDialog, setShowFormDialog] = useState(false);
  const [franquiaToDelete, setFranquiaToDelete] = useState<string | null>(null);

  const handleImport = async () => {
    if (!jsonInput.trim()) {
      return;
    }
    await importFromJson(jsonInput);
    setJsonInput("");
  };

  const handleClearAll = async () => {
    await clearAll();
    setShowClearDialog(false);
  };

  const handleDelete = async () => {
    if (franquiaToDelete) {
      await deleteFranquia(franquiaToDelete);
      setShowDeleteDialog(false);
      setFranquiaToDelete(null);
    }
  };

  const openEditDialog = (franquia: FranquiaAdmin) => {
    setSelectedFranquia(franquia);
    setShowFormDialog(true);
  };

  const openAddDialog = () => {
    setSelectedFranquia(null);
    setShowFormDialog(true);
  };

  const confirmDelete = (id: string) => {
    setFranquiaToDelete(id);
    setShowDeleteDialog(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Administração de Franquias</h1>
          <Button variant="outline" onClick={() => navigate("/")}>
            Voltar ao Site
          </Button>
        </div>

        {/* Seção 1: Importação */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Importar Franquias via JSON
            </CardTitle>
            <CardDescription>
              Cole um array JSON com os dados das franquias para importação em lote
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder='Cole aqui o JSON com os dados das franquias
              
Exemplo:
[
  {
    "nome": "Franquia Exemplo",
    "segmento": "Alimentação",
    "investimento_total": 200000,
    ...
  }
]'
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              className="min-h-[200px] font-mono text-sm"
            />
            <Button onClick={handleImport} disabled={!jsonInput.trim()} className="w-full sm:w-auto">
              <Upload className="w-4 h-4 mr-2" />
              Importar Franquias
            </Button>
          </CardContent>
        </Card>

        {/* Seção 2: Gerenciamento */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Gerenciamento de Dados</CardTitle>
            <CardDescription>
              Gerencie as franquias cadastradas no sistema
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <Button onClick={openAddDialog} className="flex-1">
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Nova Franquia
              </Button>
              <Button
                variant="destructive"
                onClick={() => setShowClearDialog(true)}
                disabled={franquias.length === 0}
                className="flex-1"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Limpar Todas as Franquias
              </Button>
            </div>

            {loading ? (
              <div className="text-center py-8">Carregando...</div>
            ) : franquias.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <AlertCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
                Nenhuma franquia cadastrada
              </div>
            ) : (
              <div className="border rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Segmento</TableHead>
                        <TableHead>Investimento</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {franquias.map((franquia) => (
                        <TableRow key={franquia.id}>
                          <TableCell className="font-medium">{franquia.nome}</TableCell>
                          <TableCell>{franquia.segmento}</TableCell>
                          <TableCell>
                            {franquia.investimento_total
                              ? new Intl.NumberFormat("pt-BR", {
                                  style: "currency",
                                  currency: "BRL",
                                }).format(franquia.investimento_total)
                              : "N/A"}
                          </TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs ${franquia.ativo ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>
                              {franquia.ativo ? "Ativo" : "Inativo"}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => openEditDialog(franquia)}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => confirmDelete(franquia.id!)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Dialog de confirmação para limpar todas */}
        <AlertDialog open={showClearDialog} onOpenChange={setShowClearDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta ação não pode ser desfeita. Todas as franquias serão permanentemente removidas do sistema.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={handleClearAll} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                Sim, limpar tudo
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Dialog de confirmação para deletar uma franquia */}
        <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
              <AlertDialogDescription>
                Tem certeza que deseja deletar esta franquia? Esta ação não pode ser desfeita.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                Deletar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Dialog de formulário */}
        <FranquiaFormDialog
          open={showFormDialog}
          onOpenChange={setShowFormDialog}
          franquia={selectedFranquia}
          onSave={saveFranquia}
        />
      </div>
    </div>
  );
};

export default AdminFranquias;
