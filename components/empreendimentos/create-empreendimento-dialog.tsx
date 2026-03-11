"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateEmpreendimentoPayload, createEmpreendimentoSchema } from "@/hooks/useEmpreendimentos";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Empreendimento } from "@/types/empreendimento";
import { EmpreendimentoFormFields } from "./empreendimento-form-fields";

interface CreateEmpreendimentoDialogProps {
    onCreate: (data: Omit<Empreendimento, "id">) => void;
}

export function CreateEmpreendimentoDialog({ onCreate }: CreateEmpreendimentoDialogProps) {
    const [open, setOpen] = useState(false);

    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<CreateEmpreendimentoPayload>({
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
                    <EmpreendimentoFormFields
                        register={register}
                        errors={errors}
                        setValue={setValue}
                    />
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
