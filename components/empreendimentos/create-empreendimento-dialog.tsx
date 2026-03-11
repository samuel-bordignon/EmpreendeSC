"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateEmpreendimentoPayload,
  createEmpreendimentoSchema,
} from "@/hooks/useEmpreendimentos";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { Empreendimento } from "@/types/empreendimento";

interface CreateEmpreendimentoDialogProps {
  onCreate: (data: Omit<Empreendimento, "id">) => void;
}

export function CreateEmpreendimentoDialog({ onCreate }: CreateEmpreendimentoDialogProps) {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CreateEmpreendimentoPayload>({
    resolver: zodResolver(createEmpreendimentoSchema),
    defaultValues: { status: "ATIVO" },
  });

  const onSubmit = (data: CreateEmpreendimentoPayload) => {
    onCreate(data);
    reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Novo empreendimento
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Criar empreendimento</DialogTitle>
          <DialogDescription>
            Preencha os dados do novo empreendimento.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="nomeEmpreendimento">Nome do empreendimento</Label>
            <Input
              id="nomeEmpreendimento"
              placeholder="Ex: Padaria do João"
              {...register("nomeEmpreendimento")}
            />
            {errors.nomeEmpreendimento && (
              <span className="text-destructive text-sm">
                {errors.nomeEmpreendimento.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="nomeEmpreendedor">Nome do empreendedor</Label>
            <Input
              id="nomeEmpreendedor"
              placeholder="Ex: João da Silva"
              {...register("nomeEmpreendedor")}
            />
            {errors.nomeEmpreendedor && (
              <span className="text-destructive text-sm">
                {errors.nomeEmpreendedor.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="municipio">Município</Label>
            <Input
              id="municipio"
              placeholder="Ex: Florianópolis"
              {...register("municipio")}
            />
            {errors.municipio && (
              <span className="text-destructive text-sm">
                {errors.municipio.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label>Segmento</Label>
            <Select
              onValueChange={(value) =>
                setValue("segmento", value as CreateEmpreendimentoPayload["segmento"])
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione um segmento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="TECNOLOGIA">Tecnologia</SelectItem>
                <SelectItem value="COMERCIO">Comércio</SelectItem>
                <SelectItem value="INDUSTRIA">Indústria</SelectItem>
                <SelectItem value="SERVICOS">Serviços</SelectItem>
                <SelectItem value="AGRONEGOCIO">Agronegócio</SelectItem>
              </SelectContent>
            </Select>
            {errors.segmento && (
              <span className="text-destructive text-sm">
                {errors.segmento.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="contato">Contato</Label>
            <Input
              id="contato"
              placeholder="Ex: joao@email.com"
              {...register("contato")}
            />
            {errors.contato && (
              <span className="text-destructive text-sm">
                {errors.contato.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label>Status</Label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="ATIVO"
                  {...register("status")}
                  className="accent-primary"
                />
                Ativo
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="INATIVO"
                  {...register("status")}
                  className="accent-primary"
                />
                Inativo
              </label>
            </div>
            {errors.status && (
              <span className="text-destructive text-sm">
                {errors.status.message}
              </span>
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit">Criar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
