# Imobiliária Kazavel

Site institucional para uma imobiliária com opção para buscar imóveis por filtro.

## Stack Tecnológica

### Frontend
- **Next.js** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **TailwindCSS** - Estilização
- **Framer Motion** - Animações
- **shadcn/ui** - Componentes UI
- **Swiper** - Carrosséis e sliders
- **Zod** - Validação de schemas
- **nuqs** - Gerenciamento de query strings

### Backend
- **Supabase** - Banco de dados e autenticação

## Cores

- **Cor Principal**: #FFCC00 (Amarelo)
- **Cor Secundária**: Black (Preto)

## Responsividade

O projeto é totalmente responsivo para Desktop e Mobile.

## Instalação

1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

Edite o arquivo `.env` e adicione suas credenciais do Supabase:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Executando o projeto

```bash
# Desenvolvimento
npm run dev

# Build de produção
npm run build

# Iniciar produção
npm start
```

## Estrutura do Projeto

```
├── app/              # App Router do Next.js
├── components/       # Componentes React
├── lib/             # Utilitários e configurações
│   ├── utils.ts     # Funções utilitárias
│   └── supabase.ts  # Cliente Supabase
└── public/          # Arquivos estáticos
```

## Adicionando Componentes shadcn/ui

Para adicionar componentes do shadcn/ui, use:

```bash
npx shadcn@latest add [component-name]
```

Exemplo:
```bash
npx shadcn@latest add button
npx shadcn@latest add card
```
