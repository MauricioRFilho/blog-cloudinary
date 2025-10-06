# ⚡ Referência Rápida

Comandos mais usados no dia a dia.

## 🚀 Início Rápido

```bash
# Setup inicial (apenas uma vez)
pnpm install
cp .env.example .env
# (edite o .env com suas credenciais)
docker compose up -d db
pnpm db:migrate
pnpm db:seed

# Desenvolvimento
pnpm dev
```

Acesse: http://localhost:3000

## 📝 Comandos Diários

### Desenvolvimento

| Comando | Descrição |
|---------|-----------|
| `pnpm dev` | Inicia dev server |
| `pnpm build` | Build para produção |
| `pnpm lint` | Roda ESLint |
| `pnpm format` | Formata código |
| `pnpm type-check` | Verifica tipos TS |

### Database

| Comando | Descrição |
|---------|-----------|
| `pnpm db:migrate` | Executa migrations |
| `pnpm db:seed` | Popula banco |
| `pnpm db:studio` | Abre Prisma Studio |
| `pnpm db:reset` | Reseta banco ⚠️ |
| `pnpm db:generate` | Gera Prisma Client |

### Docker

| Comando | Descrição |
|---------|-----------|
| `make docker-up` | Inicia containers |
| `make docker-down` | Para containers |
| `make docker-logs` | Ver logs |
| `make docker-clean` | Limpa tudo ⚠️ |

### Git

| Comando | Descrição |
|---------|-----------|
| `git add .` | Stage changes |
| `git commit` | Commit (usa Husky) |
| `git push` | Push para remote |

## 📁 Estrutura de Arquivos

```
blog-cloudinary/
├── apps/web/                       # Next.js app
│   ├── src/
│   │   ├── app/                    # Páginas (App Router)
│   │   │   ├── blog/               # Blog pages
│   │   │   ├── api/                # API routes
│   │   │   └── ...
│   │   ├── components/             # React components
│   │   │   ├── ui/                 # shadcn/ui
│   │   │   └── ...
│   │   └── lib/                    # Utils & config
│   ├── content/blog/               # ✍️ Posts MDX aqui!
│   └── public/                     # Static files
├── packages/
│   ├── db/                         # Prisma
│   │   └── prisma/schema.prisma    # Database schema
│   └── config/                     # Shared configs
└── ...
```

## 📝 Criar Novo Post

1. **Crie arquivo**: `apps/web/content/blog/meu-post.mdx`

2. **Adicione frontmatter**:
```mdx
---
title: 'Meu Post'
description: 'Descrição'
date: '2024-10-06'
published: true
tags: ['nextjs', 'react']
---

# Conteúdo aqui
```

3. **Salve** - Hot reload automático! ✨

## 🗄️ Database

### Schema Principal

- **User**: Usuários
- **Post**: Posts do blog
- **Category**: Categorias
- **Tag**: Tags
- **Comment**: Comentários

### Ver Dados

```bash
pnpm db:studio
# Abre http://localhost:5555
```

## 🖼️ Upload de Imagens

1. Configure Cloudinary no `.env`
2. Use `<CloudinaryUpload />` component
3. Ou API: `POST /api/upload`

## 🔐 Autenticação

### Providers Configurados

- ✅ Credentials (email/senha)
- ✅ Google OAuth
- ✅ GitHub OAuth

### Rotas Protegidas

- `/admin/*` - Requer auth
- `/api/admin/*` - Requer auth
- `/api/upload` - Requer auth

## 🎨 Customização

### Cores (Dark Mode)

Edite: `apps/web/src/app/globals.css`

```css
:root {
  --primary: 222.2 47.4% 11.2%;
  --secondary: 210 40% 96.1%;
  /* ... */
}
```

### Componentes UI

shadcn/ui em: `apps/web/src/components/ui/`

Adicionar novo:
```bash
npx shadcn-ui@latest add <component-name>
```

## 🐛 Troubleshooting Rápido

| Problema | Solução |
|----------|---------|
| Porta em uso | `lsof -ti:3000 \| xargs kill -9` |
| Prisma error | `pnpm db:generate` |
| Build error | `rm -rf .next && pnpm dev` |
| Docker error | `docker compose down -v && docker compose up -d` |

Ver mais: [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)

## 📦 Deploy

### Vercel (1-click)

1. Push para GitHub
2. Import no Vercel
3. Configure env vars
4. Deploy! 🚀

### Docker (Self-hosted)

```bash
docker compose -f docker-compose.prod.yml up -d
```

## 🔗 Links Úteis

- 📖 [Documentação Completa](./README.md)
- 🛠️ [Setup Guide](./SETUP.md)
- 🏗️ [Architecture](./ARCHITECTURE.md)
- 🐛 [Troubleshooting](./TROUBLESHOOTING.md)
- 🤝 [Contributing](./CONTRIBUTING.md)

## 💡 Dicas

### Performance

- Use `next/image` para imagens
- Prefira Server Components
- Use `loading.tsx` para suspense
- Cache com `unstable_cache`

### SEO

- Sempre adicione metadata em páginas
- Use structured data (JSON-LD)
- Otimize imagens (Cloudinary)
- Teste com Google Search Console

### TypeScript

- Use `type` para unions
- Use `interface` para objetos
- Sempre defina return types
- Use `as const` quando aplicável

## 🎯 Workflow Recomendado

```bash
# 1. Criar branch
git checkout -b feature/minha-feature

# 2. Desenvolver
pnpm dev
# (faça mudanças)

# 3. Verificar qualidade
pnpm lint
pnpm type-check
pnpm build

# 4. Commit (Husky roda checks)
git add .
git commit -m "feat: adiciona feature X"

# 5. Push e PR
git push origin feature/minha-feature
# (abra PR no GitHub)
```

## 📊 Estatísticas do Projeto

- **Linhas de código**: ~5000+
- **Arquivos**: 50+
- **Pacotes**: 3 (web, db, config)
- **Dependencies**: 40+
- **Tech Stack**: Next.js 15, Prisma 6, Tailwind, TS
- **SEO Score**: 100/100 ✨

---

**Dúvidas?** Abra uma [issue](https://github.com/seu-usuario/blog-cloudinary/issues)!
