"use client";

import { UseFormRegister, FieldErrors, UseFormSetValue } from "react-hook-form";
import { CreateEmpreendimentoPayload } from "@/hooks/useEmpreendimentos";
import { SEGMENTO_LABELS, STATUS_LABELS } from "@/lib/constants";
import { Segmento, Status } from "@/types/empreendimento";
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
            {Object.entries(SEGMENTO_LABELS).map(([value, label]) => (
              <SelectItem key={value} value={value}>{label}</SelectItem>
            ))}
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
          {Object.entries(STATUS_LABELS).map(([value, label]) => (
            <label key={value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value={value}
                {...register("status")}
                className="accent-primary"
              />
              {label}
            </label>
          ))}
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
