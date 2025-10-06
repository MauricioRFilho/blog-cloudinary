# 🏗️ Arquitetura do Projeto

Este documento explica a arquitetura e organização do Blog Cloudinary.

## 📐 Visão Geral

O projeto usa uma arquitetura de **monorepo** com **Turborepo**, separando responsabilidades em diferentes pacotes.

```
blog-cloudinary/
├── apps/           # Aplicações
│   └── web/        # Next.js app
├── packages/       # Pacotes compartilhados
│   ├── db/         # Prisma (database layer)
│   ├── ui/         # Componentes compartilhados
│   └── config/     # Configurações ESLint/TS
└── ...             # Config files
```

## 🎯 Decisões de Design

### Monorepo (Turborepo)

**Por quê?**
- Compartilhamento de código entre pacotes
- Build cache inteligente
- Escalabilidade futura (adicionar mais apps/packages)
- Deploy independente de pacotes

**Trade-offs:**
- Complexidade inicial maior
- Necessita pnpm workspace
- Configuração mais elaborada

### App Router (Next.js 15)

**Por quê?**
- React Server Components (RSC)
- Layouts compartilhados
- Loading/Error states automáticos
- Rotas tipadas (experimental)
- Melhor SEO e performance

**Trade-offs:**
- Curva de aprendizado
- Alguns pacotes ainda não são compatíveis
- Client vs Server Components precisa atenção

### Contentlayer (MDX)

**Por quê?**
- Type-safe content
- Validação automática de frontmatter
- Hot reload no dev
- Fácil query de posts

**Alternativas consideradas:**
- `next-mdx-remote`: menos type-safe
- `gray-matter`: precisa setup manual
- CMS (Contentful, Sanity): overhead desnecessário

### Prisma (ORM)

**Por quê?**
- Type-safe queries
- Migrations automáticas
- Prisma Studio (GUI)
- Excelente DX

**Trade-offs:**
- Schema próprio (não SQL puro)
- Build step necessário
- Menor performance que SQL raw (aceitável)

### Auth.js v5

**Por quê?**
- Padrão da indústria
- Múltiplos providers
- Session management
- Edge-ready

**Trade-offs:**
- Documentação ainda em beta
- Breaking changes entre versões

## 📦 Estrutura de Pacotes

### `apps/web` (Next.js App)

```
apps/web/
├── src/
│   ├── app/                  # App Router
│   │   ├── (auth)/           # Auth pages (opcional)
│   │   ├── blog/             # Blog pages
│   │   │   ├── [slug]/       # Dynamic post page
│   │   │   └── page.tsx      # Blog index
│   │   ├── api/              # API routes
│   │   │   ├── auth/         # NextAuth
│   │   │   └── upload/       # Cloudinary upload
│   │   ├── layout.tsx        # Root layout
│   │   ├── page.tsx          # Homepage
│   │   ├── sitemap.ts        # Sitemap generator
│   │   └── robots.ts         # Robots.txt
│   ├── components/           # React components
│   │   ├── ui/               # shadcn/ui components
│   │   ├── mdx/              # MDX components
│   │   └── ...
│   ├── lib/                  # Utilities
│   │   ├── auth/             # Auth config
│   │   ├── seo/              # SEO helpers
│   │   └── utils.ts          # Helpers
│   └── types/                # TypeScript types
├── content/                  # MDX content
│   └── blog/                 # Blog posts
├── public/                   # Static assets
└── contentlayer.config.ts    # Contentlayer config
```

### `packages/db` (Prisma)

```
packages/db/
├── prisma/
│   ├── schema.prisma         # Database schema
│   └── seed.ts               # Seed script
└── src/
    └── index.ts              # Prisma client export
```

**Modelos principais:**

- `User`: Usuários do sistema
- `Post`: Posts do blog
- `Category`: Categorias
- `Tag`: Tags
- `Comment`: Comentários (futuro)
- `Account/Session`: NextAuth models

### `packages/config`

```
packages/config/
├── eslint/
│   ├── base.js               # Base ESLint config
│   └── next.js               # Next.js ESLint config
└── typescript/
    └── tsconfig.json         # Shared TS config
```

## 🔄 Fluxo de Dados

### 1. Post do Blog (Read)

```
User Request
    ↓
Next.js App Router (SSR)
    ↓
Contentlayer (MDX → JSON)
    ↓
React Component
    ↓
HTML Response
```

### 2. Upload de Imagem

```
User Upload
    ↓
Client Component (React)
    ↓
API Route (/api/upload)
    ↓
Auth Check (NextAuth)
    ↓
Cloudinary SDK
    ↓
Return URL
```

### 3. Autenticação

```
User Login
    ↓
NextAuth Callback
    ↓
Provider Auth (Google/GitHub/Credentials)
    ↓
Prisma (User lookup/create)
    ↓
JWT Token
    ↓
Session Cookie
```

## 🎨 Camadas de Abstração

### Presentation Layer
- **Componentes React** em `src/components`
- **Páginas** em `src/app`
- **UI Components** (shadcn/ui)

### Business Logic Layer
- **Lib functions** em `src/lib`
- **API Routes** em `src/app/api`
- **Auth logic** em `src/lib/auth`

### Data Layer
- **Prisma Client** em `packages/db`
- **Contentlayer** para MDX
- **Cloudinary SDK** para uploads

## 🔐 Segurança

### Autenticação
- NextAuth v5 com JWT
- Session cookies httpOnly
- CSRF protection automático

### API Routes
- Auth middleware para rotas protegidas
- Validação de input
- Rate limiting (TODO)

### Upload de Imagens
- Validação de tipo de arquivo
- Limite de tamanho (10MB)
- Cloudinary transformations

## 📈 Performance

### Build Time
- **Turborepo cache**: Reutiliza builds anteriores
- **Parallel builds**: Pacotes buildados em paralelo

### Runtime
- **React Server Components**: Menos JavaScript no cliente
- **Static Generation**: Posts gerados em build time
- **Image Optimization**: Next/Image + Cloudinary
- **Code Splitting**: Automático pelo Next.js

### Database
- **Connection pooling**: Prisma gerencia automaticamente
- **Indexes**: Em campos frequentemente consultados

## 🧪 Testing Strategy (TODO)

### Unit Tests
- Components com Jest + React Testing Library
- Utility functions
- API route handlers

### Integration Tests
- Fluxos completos (auth, upload, etc)
- Playwright/Cypress

### E2E Tests
- Critical user journeys
- Deploy previews

## 🚀 Deploy Strategy

### Opção 1: Vercel (Recomendado)
- Auto deploy de PRs
- Preview deployments
- Edge functions
- Postgres via Neon/Supabase

### Opção 2: Self-hosted (Docker)
- Docker Compose
- Nginx reverse proxy
- Let's Encrypt SSL
- PostgreSQL container

## 📊 Monitoring (TODO)

- **Logs**: Pino/Winston
- **Errors**: Sentry
- **Analytics**: Vercel Analytics ou Plausible
- **Uptime**: UptimeRobot

## 🔮 Futuro

### Planned Features
- [ ] Sistema de comentários
- [ ] Newsletter (Resend/SendGrid)
- [ ] Search (Algolia/Meilisearch)
- [ ] Admin dashboard
- [ ] Analytics dashboard
- [ ] Multi-idiomas (i18n)

### Possíveis Refatorações
- Separar `packages/ui` para componentes compartilhados
- Adicionar `packages/types` para tipos compartilhados
- Criar `apps/admin` para painel administrativo
- Migrar para tRPC para type-safe APIs

---

**Mantido por:** Mauricio
**Última atualização:** Outubro 2024
