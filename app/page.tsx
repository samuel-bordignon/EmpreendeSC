"use client";

import { EmpreendimentosTable } from "@/components/empreendimentos/empreendimentos-table";
import { CreateEmpreendimentoDialog } from "@/components/empreendimentos/create-empreendimento-dialog";
import { useEmpreendimentos } from "@/hooks/useEmpreendimentos";

export default function Home() {
  const { empreendimentos, create, edit, remove } = useEmpreendimentos();

  return (
    <div className="py-6 sm:py-12 flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Empreendimentos</h1>
          <p className="text-muted-foreground text-sm mt-1">Gerencie os empreendimentos cadastrados em Santa Catarina.</p>
        </div>
        <CreateEmpreendimentoDialog onCreate={create} />
      </div>
      <EmpreendimentosTable
        empreendimentos={empreendimentos}
        onEdit={edit}
        onRemove={remove}
      />
    </div>
  );
}