"use client";

import { EmpreendimentosTable } from "@/components/empreendimentos/empreendimentos-table";
import { CreateEmpreendimentoDialog } from "@/components/empreendimentos/create-empreendimento-dialog";

export default function Home() {
  return (
    <div className="p-8 mx-auto max-w-5xl flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Empreendimentos</h1>
        <CreateEmpreendimentoDialog />
      </div>
      <EmpreendimentosTable />
    </div>
  );
}