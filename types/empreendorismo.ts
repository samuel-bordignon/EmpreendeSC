export type Segmento = "TECNOLOGIA" | "COMERCIO" | "INDUSTRIA" | "SERVICOS" | "AGRONEGOCIO";

export type Status = "ATIVO" | "INATIVO";

export interface Empreendimento {
  id: string;
  nomeEmpreendimento: string;
  nomeEmpreendedor: string;
  municipio: string;
  segmento: Segmento;
  contato: string;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
}