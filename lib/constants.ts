import { Segmento, Status } from "@/types/empreendimento";

export const SEGMENTO_LABELS: Record<Segmento, string> = {
  TECNOLOGIA: "Tecnologia",
  COMERCIO: "Comércio",
  INDUSTRIA: "Indústria",
  SERVICOS: "Serviços",
  AGRONEGOCIO: "Agronegócio",
};

export const STATUS_LABELS: Record<Status, string> = {
  ATIVO: "Ativo",
  INATIVO: "Inativo",
};
