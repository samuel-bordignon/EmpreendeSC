"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateEmpreendimentoPayload, createEmpreendimentoSchema, useEmpreendimentos } from "@/hooks/useEmpreendimentos";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { EmpreendimentosTable } from "@/components/empreendimentos/empreendimentos-table";

export default function Home() {
  const { empreendimentos, create } = useEmpreendimentos();
  const [isEditing, setIsEditing] = useState(false)

  const { register, handleSubmit, reset, formState: { errors } } = useForm<CreateEmpreendimentoPayload>({
    resolver: zodResolver(createEmpreendimentoSchema),
    defaultValues: { status: "ATIVO" },
  });

  const onSubmit = (data: CreateEmpreendimentoPayload) => {
    create(data);
    reset();
  };

  return (
    <div className="p-60  mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div>
          <input {...register("nomeEmpreendimento")} placeholder="Nome do empreendimento" className="border p-2 w-full" />
          {errors.nomeEmpreendimento && <span className="text-red-500 text-sm">{errors.nomeEmpreendimento.message}</span>}
        </div>

        <div>
          <input {...register("nomeEmpreendedor")} placeholder="Nome do empreendedor" className="border p-2 w-full" />
          {errors.nomeEmpreendedor && <span className="text-red-500 text-sm">{errors.nomeEmpreendedor.message}</span>}
        </div>

        <div>
          <input {...register("municipio")} placeholder="Município" className="border p-2 w-full" />
          {errors.municipio && <span className="text-red-500 text-sm">{errors.municipio.message}</span>}
        </div>

        <div>
          <select {...register("segmento")} className="border p-2 w-full">
            <option value="">Selecione um segmento</option>
            <option value="TECNOLOGIA">Tecnologia</option>
            <option value="COMERCIO">Comércio</option>
            <option value="INDUSTRIA">Indústria</option>
            <option value="SERVICOS">Serviços</option>
            <option value="AGRONEGOCIO">Agronegócio</option>
          </select>
          {errors.segmento && <span className="text-red-500 text-sm">{errors.segmento.message}</span>}
        </div>

        <div>
          <input {...register("contato")} placeholder="E-mail ou contato" className="border p-2 w-full" />
          {errors.contato && <span className="text-red-500 text-sm">{errors.contato.message}</span>}
        </div>

        <Button type="submit">Criar empreendimento</Button>
      </form>
    </div>
  );
}