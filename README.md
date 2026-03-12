    # Empreende SC

Sistema web para cadastro e gerenciamento de empreendimentos no estado de Santa Catarina. Desenvolvido como projeto do programa **IA para DEVs** — uma iniciativa da SCTEC em parceria com o SENAI/SC.

## Descrição

O **Empreende SC** é uma aplicação front-end que permite realizar operações CRUD (criar, visualizar, editar e excluir) de empreendimentos catarinenses. Os dados incluem nome do empreendimento e do empreendedor responsável, município, segmento de atuação, contato e status (ativo/inativo).

A interface é totalmente responsiva: no desktop os dados são exibidos em tabela, e no mobile são convertidos em cards para melhor leitura. Os dados são persistidos localmente no navegador via `localStorage`.

### Funcionalidades

- Listagem de empreendimentos em tabela (desktop) ou cards (mobile)
- Criação de novos empreendimentos via dialog modal
- Edição de empreendimentos existentes
- Exclusão com confirmação
- Validação de formulários com feedback visual
- Filtro visual por status (Ativo/Inativo) com badges coloridos
- Persistência local dos dados (localStorage)

## Tecnologias Utilizadas

| Tecnologia | Versão | Finalidade |
|---|---|---|
| **Next.js** | 16.1.6 | Framework React com App Router |
| **React** | 19.2.3 | Biblioteca de UI |
| **TypeScript** | 5.x | Tipagem estática |
| **Tailwind CSS** | 4.x | Estilização utility-first |
| **shadcn/ui** | 4.x | Componentes de interface (Radix + CVA) |
| **Zod** | 4.x | Validação de schemas |
| **React Hook Form** | 7.x | Gerenciamento de formulários |
| **Lucide React** | 0.577 | Ícones |
| **Vercel** | — | Hospedagem e deploy |

## Estrutura do Projeto

```
empreende-sc/
├── app/                          # App Router (Next.js)
│   ├── layout.tsx                # Layout raiz (fonte Inter, metadata)
│   ├── page.tsx                  # Página principal (gerencia estado)
│   └── globals.css               # Estilos globais e tema shadcn
├── components/
│   ├── empreendimentos/          # Componentes de domínio
│   │   ├── empreendimentos-table.tsx        # Tabela + cards mobile
│   │   ├── create-empreendimento-dialog.tsx # Modal de criação
│   │   ├── edit-empreendimento-dialog.tsx   # Modal de edição
│   │   ├── delete-empreendimento-dialog.tsx # Confirmação de exclusão
│   │   └── empreendimento-form-fields.tsx   # Campos de formulário (compartilhado)
│   └── ui/                       # Componentes shadcn/ui
├── hooks/
│   └── useEmpreendimentos.tsx    # Hook CRUD + schema Zod + localStorage
├── types/
│   └── empreendimento.ts        # Tipos TypeScript (Segmento, Status, Empreendimento)
├── lib/
│   └── utils.ts                  # Utilitário cn() para classes CSS
└── package.json
```

## Acesso Online

A aplicação está hospedada na Vercel e pode ser acessada em:

> **https://empreende-sc.vercel.app**

## Execução Local

### Pré-requisitos

- **Node.js** 18.18 ou superior
- **npm**

### Passos

```bash
# 1. Clone o repositório
git clone https://github.com/samuel-bordignon/empreende-sc.git
cd empreende-sc

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

### Outros comandos

```bash
npm run build   # Gera o build de produção
npm run start   # Inicia o servidor de produção
npm run lint    # Executa o linter (ESLint)
```

## Vídeo Pitch

📹 [Assista ao vídeo pitch do projeto](https://LINK_DO_VIDEO_AQUI)

