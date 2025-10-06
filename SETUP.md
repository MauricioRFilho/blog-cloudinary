# 🚀 Setup Completo - Blog Cloudinary

Guia passo a passo para configurar o projeto do zero.

## Pré-requisitos

### 1. Instalar Ferramentas

- **Node.js 20+**: [Download](https://nodejs.org)
- **pnpm**:
  ```bash
  npm install -g pnpm
  ```
- **Docker Desktop**: [Download](https://www.docker.com/products/docker-desktop)

### 2. Criar Conta Cloudinary

1. Acesse: https://cloudinary.com
2. Crie uma conta gratuita
3. No Dashboard, copie:
   - Cloud Name
   - API Key
   - API Secret

### 3. (Opcional) Configurar OAuth

#### Google OAuth

1. Acesse [Google Cloud Console](https://console.cloud.google.com)
2. Crie um novo projeto
3. Vá para "APIs & Services" > "Credentials"
4. Clique "Create Credentials" > "OAuth 2.0 Client ID"
5. Configure:
   - Application type: Web application
   - Authorized redirect URIs: `http://localhost:3000/api/auth/callback/google`
6. Copie Client ID e Client Secret

#### GitHub OAuth

1. Acesse [GitHub Settings](https://github.com/settings/developers)
2. Clique "New OAuth App"
3. Configure:
   - Homepage URL: `http://localhost:3000`
   - Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
4. Copie Client ID e Client Secret

## Instalação

### Passo 1: Clone o Repositório

```bash
git clone https://github.com/seu-usuario/blog-cloudinary.git
cd blog-cloudinary
```

### Passo 2: Instale as Dependências

```bash
pnpm install
```

Aguarde a instalação (pode levar alguns minutos na primeira vez).

### Passo 3: Configure as Variáveis de Ambiente

1. Copie o arquivo de exemplo:
```bash
cp .env.example .env
```

2. Edite o arquivo `.env` e preencha:

```env
# Database (mantenha como está para Docker)
DATABASE_URL="postgresql://postgres:postgres@localhost:5433/blog?schema=public"

# NextAuth - GERE UM SECRET SEGURO!
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="cole-aqui-o-secret-gerado"
# Gere com: openssl rand -base64 32

# Cloudinary - Cole suas credenciais
CLOUDINARY_CLOUD_NAME="seu-cloud-name"
CLOUDINARY_API_KEY="sua-api-key"
CLOUDINARY_API_SECRET="seu-api-secret"
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="seu-cloud-name"

# OAuth (opcional - deixe vazio se não for usar)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""

# App Config (pode deixar como está)
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_APP_NAME="Blog Cloudinary"
NEXT_PUBLIC_APP_DESCRIPTION="Blog moderno com Next.js, MDX e Cloudinary"
```

### Passo 4: Inicie o Banco de Dados

```bash
docker compose up -d db
```

Aguarde o banco de dados iniciar (cerca de 10 segundos).

### Passo 5: Execute as Migrations

```bash
pnpm db:migrate
```

Quando perguntado, digite um nome para a migration (ex: `init`).

### Passo 6: Popule o Banco de Dados (Seed)

```bash
pnpm db:seed
```

Isso criará:
- Um usuário admin (email: admin@blog.com)
- Categorias (Tecnologia, Tutoriais, Web)
- Tags (Next.js, React, TypeScript, Prisma)
- Um post de exemplo

### Passo 7: Inicie o Servidor de Desenvolvimento

```bash
pnpm dev
```

Aguarde o build inicial. Quando ver:

```
✓ Ready in X.Xs
○ Local:   http://localhost:3000
```

Abra seu navegador em: **http://localhost:3000**

## ✅ Verificação

Se tudo estiver funcionando, você verá:

1. **Homepage** com link para Blog e Sobre
2. **Blog** (`/blog`) com 1 post de exemplo
3. **Post** clicável com syntax highlighting

## 🎨 Próximos Passos

### 1. Criar Novo Post

Crie um arquivo em `apps/web/content/blog/meu-post.mdx`:

```mdx
---
title: 'Meu Primeiro Post'
description: 'Descrição do meu post'
date: '2024-10-06'
published: true
tags: ['nextjs', 'react']
---

# Meu Primeiro Post

Conteúdo aqui!
```

O hot reload irá detectar automaticamente.

### 2. Testar Upload de Imagens

1. Faça login (em breve teremos UI para isso)
2. Use o componente `<CloudinaryUpload />` em qualquer página

### 3. Customizar o Design

- Edite `apps/web/src/app/globals.css` para cores
- Modifique componentes em `apps/web/src/components`
- Ajuste layout em `apps/web/src/app/layout.tsx`

## 🐛 Troubleshooting

### Erro: "Cannot connect to database"

```bash
# Verifique se o Docker está rodando
docker ps

# Reinicie o banco de dados
docker compose restart db

# Aguarde 10 segundos e tente novamente
pnpm db:migrate
```

### Erro: "Port 3000 already in use"

```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9
```

### Erro: "Contentlayer build error"

```bash
# Limpe o cache
rm -rf apps/web/.contentlayer
pnpm dev
```

### Prisma Client não encontrado

```bash
pnpm --filter @blog/db generate
```

## 📚 Comandos Úteis

```bash
# Desenvolvimento
pnpm dev              # Inicia dev server
pnpm build            # Build para produção
pnpm lint             # Roda ESLint
pnpm format           # Formata código

# Database
pnpm db:studio        # Abre Prisma Studio (GUI)
pnpm db:reset         # Reseta banco de dados

# Docker
make docker-up        # Inicia todos os containers
make docker-down      # Para containers
make docker-logs      # Ver logs
```

## 🎉 Pronto!

Seu blog está rodando! Explore o código e comece a personalizar.

Precisa de ajuda? Abra uma [issue](https://github.com/seu-usuario/blog-cloudinary/issues).
