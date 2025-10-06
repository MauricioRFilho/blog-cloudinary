# 🚀 Blog Cloudinary

Blog moderno construído com **Next.js 15**, **MDX**, **Cloudinary** e as melhores práticas de **SEO** e **performance**.

## ✨ Características

### 🎨 Frontend
- **Next.js 15** com App Router e React Server Components
- **TypeScript** em modo strict
- **Tailwind CSS** para estilização moderna
- **shadcn/ui** componentes acessíveis
- **Dark mode** com persistência via next-themes
- **Framer Motion** para animações (opcional)

### 🗄️ Backend & Database
- **Prisma 6** como ORM type-safe
- **PostgreSQL 16** banco de dados
- **Auth.js v5** (NextAuth v5) autenticação
- Suporte a múltiplos providers (Google, GitHub, Credentials)

### 📝 Content & Media
- **Contentlayer** para MDX type-safe
- **Cloudinary** para CDN e otimização de imagens
- **Shiki** para syntax highlighting
- **remark-gfm** para GitHub Flavored Markdown

### 🔍 SEO & Performance
- ✅ Metadata API dinâmica do Next.js
- ✅ Sitemap XML automático
- ✅ RSS feed
- ✅ Open Graph tags
- ✅ Twitter Cards
- ✅ JSON-LD structured data (Schema.org)
- ✅ robots.txt
- ✅ Web manifest
- ✅ Core Web Vitals otimizados

### 🛠️ Developer Experience
- **Turborepo** monorepo setup
- **pnpm** gerenciador de pacotes rápido
- **ESLint + Prettier** code quality
- **Husky + lint-staged** git hooks
- **Commitlint** conventional commits
- **Docker** desenvolvimento containerizado
- **Makefile** comandos úteis

## 📁 Estrutura do Projeto

```
blog-cloudinary/
├── apps/
│   └── web/                    # Next.js application
│       ├── src/
│       │   ├── app/            # App Router pages
│       │   ├── components/     # React components
│       │   ├── lib/            # Utility functions
│       │   └── middleware.ts   # Auth middleware
│       ├── content/            # MDX blog posts
│       ├── public/             # Static assets
│       └── contentlayer.config.ts
├── packages/
│   ├── db/                     # Prisma schema & client
│   ├── ui/                     # Shared UI components
│   └── config/                 # Shared configs (ESLint, TS)
├── docker-compose.yml
├── Makefile
├── turbo.json
└── pnpm-workspace.yaml
```

## 🚀 Quick Start

### Pré-requisitos

- **Node.js 20+** e **pnpm 9+**
- **Docker** e **Docker Compose**
- Conta **Cloudinary** (gratuita)

### Instalação

1. **Clone o repositório**

```bash
git clone https://github.com/seu-usuario/blog-cloudinary.git
cd blog-cloudinary
```

2. **Instale as dependências**

```bash
pnpm install
```

3. **Configure as variáveis de ambiente**

```bash
cp .env.example .env
```

Edite o `.env` e preencha:

```env
# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5433/blog?schema=public"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="seu-secret-aqui" # gere com: openssl rand -base64 32

# Cloudinary
CLOUDINARY_CLOUD_NAME="seu-cloud-name"
CLOUDINARY_API_KEY="sua-api-key"
CLOUDINARY_API_SECRET="seu-api-secret"
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="seu-cloud-name"

# App Config
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_APP_NAME="Blog Cloudinary"
NEXT_PUBLIC_APP_DESCRIPTION="Blog moderno com Next.js, MDX e Cloudinary"
```

4. **Inicie o banco de dados com Docker**

```bash
docker compose up -d db
```

ou use o Makefile:

```bash
make docker-up
```

5. **Execute as migrations do Prisma**

```bash
pnpm db:migrate
```

6. **Faça o seed do banco de dados (opcional)**

```bash
pnpm db:seed
```

7. **Inicie o servidor de desenvolvimento**

```bash
pnpm dev
```

O app estará disponível em: **http://localhost:3000**

## 📝 Comandos Úteis

### Desenvolvimento

```bash
pnpm dev          # Inicia servidor de desenvolvimento
pnpm build        # Build para produção
pnpm start        # Inicia servidor de produção
pnpm lint         # Roda ESLint
pnpm format       # Formata código com Prettier
pnpm type-check   # Verifica tipos TypeScript
```

### Database (Prisma)

```bash
pnpm db:migrate   # Executa migrations
pnpm db:seed      # Popula banco de dados
pnpm db:studio    # Abre Prisma Studio
pnpm db:reset     # Reseta banco de dados
```

### Docker

```bash
make docker-up        # Inicia containers
make docker-down      # Para containers
make docker-logs      # Mostra logs
make docker-build     # Build das images
make docker-clean     # Remove containers e volumes
```

### Makefile (Atalhos)

```bash
make help         # Lista todos os comandos
make install      # Instala dependências
make dev          # Desenvolvimento local
make setup        # Setup inicial completo
```

## 📝 Criando Posts

Os posts são escritos em **MDX** e ficam em `apps/web/content/blog/`.

### Exemplo de Post

Crie um arquivo `apps/web/content/blog/meu-post.mdx`:

```mdx
---
title: 'Meu Primeiro Post'
description: 'Uma descrição incrível do meu post'
date: '2024-10-06'
published: true
featured: false
author: 'Seu Nome'
tags: ['nextjs', 'typescript', 'react']
categories: ['tecnologia', 'web']
image: 'https://images.unsplash.com/photo-1234567890'
---

# Meu Primeiro Post

Conteúdo do post em **Markdown** com suporte a componentes React!

## Code Highlighting

\`\`\`typescript
function hello(name: string): string {
  return `Hello, ${name}!`
}
\`\`\`

## Componentes Customizados

Você pode usar componentes React dentro do MDX!
```

## 🐳 Docker

### Desenvolvimento com Docker

```bash
docker compose up
```

Isso irá:
- Iniciar PostgreSQL na porta 5433
- Iniciar Next.js na porta 3000 com hot reload

### Build para Produção

```bash
docker compose build --target production
docker compose -f docker-compose.prod.yml up
```

## 🔐 Autenticação

O projeto usa **Auth.js v5** (NextAuth) com:

- **Credentials** (email/senha)
- **Google OAuth**
- **GitHub OAuth**

### Configurar OAuth Providers

**Google:**
1. Acesse [Google Cloud Console](https://console.cloud.google.com)
2. Crie um projeto
3. Habilite Google+ API
4. Crie credenciais OAuth 2.0
5. Adicione ao `.env`:
   ```
   GOOGLE_CLIENT_ID="..."
   GOOGLE_CLIENT_SECRET="..."
   ```

**GitHub:**
1. Acesse [GitHub Developer Settings](https://github.com/settings/developers)
2. Crie um novo OAuth App
3. Adicione ao `.env`:
   ```
   GITHUB_CLIENT_ID="..."
   GITHUB_CLIENT_SECRET="..."
   ```

## 🖼️ Cloudinary

### Configuração

1. Crie conta em [Cloudinary](https://cloudinary.com)
2. Copie suas credenciais do Dashboard
3. Adicione ao `.env`

### Upload de Imagens

```typescript
import { CloudinaryUpload } from '@/components/cloudinary-upload'

export default function MyComponent() {
  const handleUpload = (url: string) => {
    console.log('Image uploaded:', url)
  }

  return <CloudinaryUpload onUploadComplete={handleUpload} />
}
```

## 🧪 Testes (TODO)

```bash
pnpm test           # Roda testes
pnpm test:watch     # Modo watch
pnpm test:coverage  # Coverage report
```

## 📦 Deploy

### Vercel (Recomendado)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push seu código para GitHub
2. Importe no Vercel
3. Configure as variáveis de ambiente
4. Deploy!

### Docker (Self-hosted)

```bash
docker compose -f docker-compose.prod.yml up -d
```

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/amazing`)
3. Commit suas mudanças (`git commit -m 'feat: add amazing feature'`)
4. Push para a branch (`git push origin feature/amazing`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🙏 Agradecimentos

- [Next.js](https://nextjs.org)
- [Vercel](https://vercel.com)
- [Prisma](https://prisma.io)
- [Cloudinary](https://cloudinary.com)
- [shadcn/ui](https://ui.shadcn.com)
- [Contentlayer](https://contentlayer.dev)

---

Feito com ❤️ usando as melhores tecnologias
