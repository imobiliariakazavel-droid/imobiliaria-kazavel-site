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

## Deploy na Vercel

O projeto está pronto para ser publicado na Vercel. Siga os passos abaixo:

### 1. Conecte seu repositório à Vercel

1. Acesse [vercel.com](https://vercel.com) e faça login
2. Clique em "Add New Project"
3. Importe seu repositório do GitHub/GitLab/Bitbucket
4. A Vercel detectará automaticamente que é um projeto Next.js

### 2. Configure as Variáveis de Ambiente

Na página de configuração do projeto na Vercel, adicione as seguintes variáveis de ambiente:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Onde encontrar essas credenciais:**
- Acesse seu projeto no [Supabase](https://supabase.com)
- Vá em **Settings** > **API**
- Copie a **URL** e a **anon/public key**

### 3. Deploy

1. Clique em "Deploy"
2. Aguarde o build ser concluído
3. Seu site estará disponível em uma URL como: `https://seu-projeto.vercel.app`

### 4. Domínio Personalizado (Opcional)

1. Vá em **Settings** > **Domains**
2. Adicione seu domínio personalizado
3. Siga as instruções para configurar o DNS

### Notas Importantes

- O build do projeto foi testado e está funcionando corretamente
- As variáveis de ambiente são necessárias para o funcionamento do Supabase
- A Vercel detecta automaticamente mudanças no repositório e faz deploy automático

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
