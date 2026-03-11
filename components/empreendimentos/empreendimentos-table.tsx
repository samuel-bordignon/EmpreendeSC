"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { useEmpreendimentos } from "@/hooks/useEmpreendimentos";

const segmentoLabel: Record<string, string> = {
  TECNOLOGIA: "Tecnologia",
  COMERCIO: "Comércio",
  INDUSTRIA: "Indústria",
  SERVICOS: "Serviços",
  AGRONEGOCIO: "Agronegócio",
};

export function EmpreendimentosTable() {
  const { empreendimentos, remove } = useEmpreendimentos();

  const handleEdit = (id: string) => {
    console.log("editar:", id); // substituir pela lógica de edição
  };

  const handleDelete = (id: string) => {
    remove(id);
  };

  return (
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
                    <DropdownMenuItem onClick={() => handleEdit(e.id)}>
                      <Pencil className="mr-2 h-4 w-4" />
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDelete(e.id)}
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
  );
}