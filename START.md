# 🚀 Como Iniciar o Projeto

Siga estes passos na ordem:

## 1️⃣ Instalar Dependências

```bash
pnpm install
```

## 2️⃣ Configurar Variáveis de Ambiente

```bash
# Copie o arquivo de exemplo
cp .env.example .env
```

**Edite o `.env` e configure:**

```env
# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5433/blog?schema=public"

# NextAuth (OBRIGATÓRIO - gere um secret)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="cole-aqui-seu-secret"
# Gere com: openssl rand -base64 32

# Cloudinary (OBRIGATÓRIO)
CLOUDINARY_CLOUD_NAME="seu-cloud-name"
CLOUDINARY_API_KEY="sua-api-key"
CLOUDINARY_API_SECRET="seu-api-secret"
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="seu-cloud-name"

# OAuth (OPCIONAL)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""

# App Config
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_APP_NAME="Blog Cloudinary"
NEXT_PUBLIC_APP_DESCRIPTION="Blog moderno com Next.js, MDX e Cloudinary"
```

## 3️⃣ Iniciar Banco de Dados (Docker)

```bash
docker compose up -d db
```

**Aguarde ~10 segundos** para o PostgreSQL iniciar completamente.

## 4️⃣ Executar Migrations

```bash
pnpm --filter @blog/db generate
pnpm db:migrate
```

Digite um nome para a migration (ex: `init`) quando solicitado.

## 5️⃣ Popular Banco de Dados (Opcional)

```bash
pnpm db:seed
```

Isso criará:
- ✅ Usuário admin (email: admin@blog.com)
- ✅ Categorias (Tecnologia, Tutoriais, Web)
- ✅ Tags (Next.js, React, TypeScript, Prisma)
- ✅ Post de exemplo

## 6️⃣ Iniciar Servidor de Desenvolvimento

```bash
pnpm dev
```

**Aguarde o build inicial** (pode levar 1-2 minutos na primeira vez).

Quando ver:
```
✓ Ready in X.Xs
○ Local:   http://localhost:3000
```

Acesse: **http://localhost:3000** 🎉

---

## ⚡ Comandos Úteis

```bash
# Desenvolvimento
pnpm dev              # Inicia dev server
pnpm build            # Build para produção
pnpm lint             # Roda ESLint
pnpm format           # Formata código

# Database
pnpm db:studio        # Abre Prisma Studio (GUI)
pnpm db:migrate       # Executa migrations
pnpm db:seed          # Popula dados

# Docker
make docker-up        # Inicia containers
make docker-down      # Para containers
make docker-logs      # Ver logs
```

---

## 🐛 Problemas Comuns

### Erro: "Cannot connect to database"

```bash
# Verifique se o Docker está rodando
docker ps

# Reinicie o banco de dados
docker compose restart db
```

### Erro: "Port 3000 already in use"

```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9
```

### Erro: "Contentlayer build failed"

```bash
# Limpe o cache
rm -rf apps/web/.contentlayer
pnpm dev
```

---

## 📝 Criar Seu Primeiro Post

Crie um arquivo: `apps/web/content/blog/meu-post.mdx`

```mdx
---
title: 'Meu Primeiro Post'
description: 'Uma descrição incrível'
date: '2024-10-06'
published: true
tags: ['nextjs', 'react']
---

# Meu Primeiro Post

Conteúdo em **Markdown** com suporte a componentes React!

## Code Highlighting

\`\`\`typescript
const hello = (name: string) => {
  return `Hello, ${name}!`
}
\`\`\`
```

Salve o arquivo - **hot reload automático**! ✨

---

## ✅ Checklist

- [ ] Instalei as dependências (`pnpm install`)
- [ ] Configurei o `.env` com minhas credenciais
- [ ] Iniciei o Docker (`docker compose up -d db`)
- [ ] Executei migrations (`pnpm db:migrate`)
- [ ] Populei o banco de dados (`pnpm db:seed`)
- [ ] Iniciei o dev server (`pnpm dev`)
- [ ] Acessei http://localhost:3000 com sucesso

---

**Pronto! Seu blog está rodando! 🚀**

Consulte [README.md](./README.md) para documentação completa.
