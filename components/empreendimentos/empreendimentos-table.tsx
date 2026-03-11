"use client";

import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Empreendimento } from "@/types/empreendimento";
import { EditEmpreendimentoDialog } from "./edit-empreendimento-dialog";
import { DeleteEmpreendimentoDialog } from "./delete-empreendimento-dialog";

const segmentoLabel: Record<string, string> = {
  TECNOLOGIA: "Tecnologia",
  COMERCIO: "Comércio",
  INDUSTRIA: "Indústria",
  SERVICOS: "Serviços",
  AGRONEGOCIO: "Agronegócio",
};

interface EmpreendimentosTableProps {
  empreendimentos: Empreendimento[];
  onEdit: (id: string, data: Partial<Omit<Empreendimento, "id">>) => void;
  onRemove: (id: string) => void;
}

export function EmpreendimentosTable({ empreendimentos, onEdit, onRemove }: EmpreendimentosTableProps) {
  const [editingItem, setEditingItem] = useState<Empreendimento | null>(null);
  const [deletingItem, setDeletingItem] = useState<Empreendimento | null>(null);

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Empreendimento</TableHead>
              <TableHead>Empreendedor</TableHead>
              <TableHead>Município</TableHead>
              <TableHead>Segmento</TableHead>
              <TableHead>Contato</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-12" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {empreendimentos.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                  Nenhum empreendimento cadastrado.
                </TableCell>
              </TableRow>
            )}
            {empreendimentos.map((e) => (
              <TableRow key={e.id}>
                <TableCell className="font-medium">{e.nomeEmpreendimento}</TableCell>
                <TableCell>{e.nomeEmpreendedor}</TableCell>
                <TableCell>{e.municipio}</TableCell>
                <TableCell>{segmentoLabel[e.segmento]}</TableCell>
                <TableCell>{e.contato}</TableCell>
                <TableCell>
                  <Badge variant={e.status === "ATIVO" ? "default" : "secondary"}>
                    {e.status === "ATIVO" ? "Ativo" : "Inativo"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setEditingItem(e)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setDeletingItem(e)}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {editingItem && (
        <EditEmpreendimentoDialog
          empreendimento={editingItem}
          open={!!editingItem}
          onOpenChange={(open) => { if (!open) setEditingItem(null); }}
          onSave={(id, data) => onEdit(id, data)}
        />
      )}

      {deletingItem && (
        <DeleteEmpreendimentoDialog
          nomeEmpreendimento={deletingItem.nomeEmpreendimento}
          open={!!deletingItem}
          onOpenChange={(open) => { if (!open) setDeletingItem(null); }}
          onConfirm={() => {
            onRemove(deletingItem.id);
            setDeletingItem(null);
          }}
        />
      )}
    </>
  );
}