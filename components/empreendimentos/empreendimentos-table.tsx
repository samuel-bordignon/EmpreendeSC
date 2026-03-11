"use client";

import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
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

function StatusBadge({ status }: { status: string }) {
  const isAtivo = status === "ATIVO";
  return (
    <Badge
      variant="outline"
      className={isAtivo
        ? "border-emerald-200 bg-emerald-50 text-emerald-700"
        : "border-rose-200 bg-rose-50 text-rose-700"
      }
    >
      <span className={`mr-1.5 inline-block h-1.5 w-1.5 rounded-full ${
        isAtivo ? "bg-emerald-500" : "bg-rose-500"
      }`} />
      {isAtivo ? "Ativo" : "Inativo"}
    </Badge>
  );
}

interface EmpreendimentosTableProps {
  empreendimentos: Empreendimento[];
  onEdit: (id: string, data: Partial<Omit<Empreendimento, "id">>) => void;
  onRemove: (id: string) => void;
}

function ActionsMenu({
  onEdit,
  onDelete,
}: {
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={onEdit}>
          <Pencil className="mr-2 h-4 w-4" />
          Editar
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={onDelete}
          className="text-destructive focus:text-destructive"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Excluir
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function EmpreendimentosTable({ empreendimentos, onEdit, onRemove }: EmpreendimentosTableProps) {
  const [editingItem, setEditingItem] = useState<Empreendimento | null>(null);
  const [deletingItem, setDeletingItem] = useState<Empreendimento | null>(null);

  if (empreendimentos.length === 0) {
    return (
      <div className="rounded-md border p-8 text-center text-muted-foreground">
        Nenhum empreendimento cadastrado.
      </div>
    );
  }

  return (
    <>
      {/* Mobile: cards */}
      <div className="flex flex-col gap-3 md:hidden">
        {empreendimentos.map((e, i) => (
          <div key={e.id} className={`rounded-lg border p-4 shadow-sm ${i % 2 === 1 ? "bg-amber-50/60" : "bg-card"}`}>
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-base truncate">{e.nomeEmpreendimento}</p>
                <p className="text-sm text-muted-foreground">{e.nomeEmpreendedor}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <StatusBadge status={e.status} />
                <ActionsMenu
                  onEdit={() => setEditingItem(e)}
                  onDelete={() => setDeletingItem(e)}
                />
              </div>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-y-2 text-sm">
              <div>
                <span className="text-muted-foreground">Município</span>
                <p>{e.municipio}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Segmento</span>
                <p>{segmentoLabel[e.segmento]}</p>
              </div>
              <div className="col-span-2">
                <span className="text-muted-foreground">Contato</span>
                <p className="truncate">{e.contato}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop: tabela */}
      <div className="hidden md:block rounded-md border overflow-hidden">
        <Table>
          <TableHeader className="bg-emerald-600">
            <TableRow>
              <TableHead className="text-white">Empreendimento</TableHead>
              <TableHead className="text-white">Empreendedor</TableHead>
              <TableHead className="text-white">Município</TableHead>
              <TableHead className="text-white">Segmento</TableHead>
              <TableHead className="text-white">Contato</TableHead>
              <TableHead className="text-white">Status</TableHead>
              <TableHead className="w-12" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {empreendimentos.map((e, i) => (
              <TableRow key={e.id} className={i % 2 === 1 ? "bg-yellow-50/30" : ""}>
                <TableCell className="font-medium">{e.nomeEmpreendimento}</TableCell>
                <TableCell>{e.nomeEmpreendedor}</TableCell>
                <TableCell>{e.municipio}</TableCell>
                <TableCell>{segmentoLabel[e.segmento]}</TableCell>
                <TableCell>{e.contato}</TableCell>
                <TableCell>
                  <StatusBadge status={e.status} />
                </TableCell>
                <TableCell>
                  <ActionsMenu
                    onEdit={() => setEditingItem(e)}
                    onDelete={() => setDeletingItem(e)}
                  />
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