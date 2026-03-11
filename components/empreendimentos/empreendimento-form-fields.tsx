"use client";

import { UseFormRegister, FieldErrors, UseFormSetValue } from "react-hook-form";
import { CreateEmpreendimentoPayload } from "@/hooks/useEmpreendimentos";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface EmpreendimentoFormFieldsProps {
  register: UseFormRegister<CreateEmpreendimentoPayload>;
  errors: FieldErrors<CreateEmpreendimentoPayload>;
  setValue: UseFormSetValue<CreateEmpreendimentoPayload>;
  prefix?: string;
  defaultSegmento?: string;
}

export function EmpreendimentoFormFields({
  register,
  errors,
  setValue,
  prefix = "",
  defaultSegmento,
}: EmpreendimentoFormFieldsProps) {
  return (
    <>
      <div className="flex flex-col gap-2">
        <Label htmlFor={`${prefix}nomeEmpreendimento`}>Nome do empreendimento</Label>
        <Input
          id={`${prefix}nomeEmpreendimento`}
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
        <Label htmlFor={`${prefix}nomeEmpreendedor`}>Nome do empreendedor</Label>
        <Input
          id={`${prefix}nomeEmpreendedor`}
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
        <Label htmlFor={`${prefix}municipio`}>Município</Label>
        <Input
          id={`${prefix}municipio`}
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
          defaultValue={defaultSegmento}
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
        <Label htmlFor={`${prefix}contato`}>Contato</Label>
        <Input
          id={`${prefix}contato`}
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
    </>
  );
}
