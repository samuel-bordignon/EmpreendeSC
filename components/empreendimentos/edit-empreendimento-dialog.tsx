"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateEmpreendimentoPayload,
  createEmpreendimentoSchema,
} from "@/hooks/useEmpreendimentos";
import { Empreendimento } from "@/types/empreendimento";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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

interface EditEmpreendimentoDialogProps {
  empreendimento: Empreendimento;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (id: string, data: CreateEmpreendimentoPayload) => void;
}

export function EditEmpreendimentoDialog({
  empreendimento,
  open,
  onOpenChange,
  onSave,
}: EditEmpreendimentoDialogProps) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CreateEmpreendimentoPayload>({
    resolver: zodResolver(createEmpreendimentoSchema),
  });

  useEffect(() => {
    if (open) {
      reset({
        nomeEmpreendimento: empreendimento.nomeEmpreendimento,
        nomeEmpreendedor: empreendimento.nomeEmpreendedor,
        municipio: empreendimento.municipio,
        segmento: empreendimento.segmento,
        contato: empreendimento.contato,
        status: empreendimento.status,
      });
    }
  }, [open, empreendimento, reset]);

  const onSubmit = (data: CreateEmpreendimentoPayload) => {
    onSave(empreendimento.id, data);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Editar empreendimento</DialogTitle>
          <DialogDescription>
            Altere os dados do empreendimento.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="edit-nomeEmpreendimento">Nome do empreendimento</Label>
            <Input
              id="edit-nomeEmpreendimento"
              {...register("nomeEmpreendimento")}
            />
            {errors.nomeEmpreendimento && (
              <span className="text-destructive text-sm">
                {errors.nomeEmpreendimento.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="edit-nomeEmpreendedor">Nome do empreendedor</Label>
            <Input
              id="edit-nomeEmpreendedor"
              {...register("nomeEmpreendedor")}
            />
            {errors.nomeEmpreendedor && (
              <span className="text-destructive text-sm">
                {errors.nomeEmpreendedor.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="edit-municipio">Município</Label>
            <Input id="edit-municipio" {...register("municipio")} />
            {errors.municipio && (
              <span className="text-destructive text-sm">
                {errors.municipio.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label>Segmento</Label>
            <Select
              defaultValue={empreendimento.segmento}
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
            <Label htmlFor="edit-contato">Contato</Label>
            <Input id="edit-contato" {...register("contato")} />
            {errors.contato && (
              <span className="text-destructive text-sm">
                {errors.contato.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label>Status</Label>
            <Select
              defaultValue={empreendimento.status}
              onValueChange={(value) =>
                setValue("status", value as CreateEmpreendimentoPayload["status"])
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ATIVO">Ativo</SelectItem>
                <SelectItem value="INATIVO">Inativo</SelectItem>
              </SelectContent>
            </Select>
            {errors.status && (
              <span className="text-destructive text-sm">
                {errors.status.message}
              </span>
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Salvar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
