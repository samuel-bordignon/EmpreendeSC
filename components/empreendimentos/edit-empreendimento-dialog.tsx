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
import { EmpreendimentoFormFields } from "./empreendimento-form-fields";

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
          <EmpreendimentoFormFields
            register={register}
            errors={errors}
            setValue={setValue}
            prefix="edit-"
            defaultSegmento={empreendimento.segmento}
          />
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
