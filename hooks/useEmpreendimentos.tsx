import { useState, useEffect } from "react";
import { Empreendimento } from "@/types/empreendimento";
import z from "zod";

//schema do zod
export const createEmpreendimentoSchema = z.object({
  nomeEmpreendimento: z.string().min(1, "Nome do empreendimento é obrigatório"),
  nomeEmpreendedor: z.string().min(1, "Nome do empreendedor é obrigatório"),
  municipio: z.string().min(1, "Município é obrigatório"),
  segmento: z.enum(["TECNOLOGIA", "COMERCIO", "INDUSTRIA", "SERVICOS", "AGRONEGOCIO"], {
    message: "Segmento é obrigatório",
  }),
  contato: z.string().min(1, "Contato é obrigatório"),
  status: z.enum(["ATIVO", "INATIVO"]),
});

//tipo para o payload das funções
export type CreateEmpreendimentoPayload = z.infer<typeof createEmpreendimentoSchema>;

const STORAGE_KEY = "empreendimentos";

//hook para o gerenciamento do estado de empreendimentos
export const useEmpreendimentos = () => {
  const [empreendimentos, setEmpreendimentos] = useState<Empreendimento[]>([]);

  useEffect(() => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) setEmpreendimentos(JSON.parse(data));
  }, []);

  const persist = (data: Empreendimento[]) => {
    setEmpreendimentos(data);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  };

  const create = (data: Omit<Empreendimento, "id">) => {
    const novo = { ...data, id: crypto.randomUUID() };
    persist([...empreendimentos, novo]);
    return novo;
  };

  const edit = (id: string, data: Partial<Omit<Empreendimento, "id">>) => {
    const atualizados = empreendimentos.map((e) =>
      e.id === id ? { ...e, ...data } : e
    );
    persist(atualizados);
  };

  const remove = (id: string) => {
    persist(empreendimentos.filter((e) => e.id !== id));
  };

  const getById = (id: string) => {
    return empreendimentos.find((e) => e.id === id) ?? null;
  };

  return { empreendimentos, create, edit, remove, getById };
};