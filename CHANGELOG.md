# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [Unreleased]

### Planejado
- Sistema de comentários
- Newsletter integration
- Busca full-text
- Admin dashboard
- Analytics
- Testes automatizados
- CI/CD pipeline

## [1.0.0] - 2024-10-06

### Adicionado

#### Core Features
- ✨ Next.js 15 com App Router e React Server Components
- ✨ Sistema de blog completo com MDX e Contentlayer
- ✨ Autenticação com Auth.js v5 (NextAuth)
- ✨ Upload de imagens com Cloudinary
- ✨ Dark mode com next-themes
- ✨ Design responsivo com Tailwind CSS
- ✨ Componentes UI com shadcn/ui

#### SEO & Performance
- 🔍 Metadata API dinâmica
- 🔍 Sitemap XML automático
- 🔍 RSS feed
- 🔍 Open Graph tags
- 🔍 Twitter Cards
- 🔍 JSON-LD structured data (Schema.org)
- 🔍 robots.txt
- 🔍 Web manifest
- ⚡ Image optimization (Next/Image + Cloudinary)
- ⚡ Code splitting automático

#### Database & Backend
- 🗄️ Prisma 6 ORM
- 🗄️ PostgreSQL 16
- 🗄️ Schema completo (User, Post, Category, Tag, Comment, SEO)
- 🗄️ Migrations e seeds
- 🗄️ Prisma Studio para gerenciamento

#### Developer Experience
- 🛠️ Turborepo monorepo setup
- 🛠️ pnpm workspace
- 🛠️ TypeScript strict mode
- 🛠️ ESLint + Prettier
- 🛠️ Husky + lint-staged
- 🛠️ Commitlint (conventional commits)
- 🛠️ Docker Compose para desenvolvimento
- 🛠️ Makefile com comandos úteis
- 🛠️ Hot reload com Turbo

#### Documentation
- 📚 README completo
- 📚 SETUP guide passo a passo
- 📚 ARCHITECTURE documentation
- 📚 TROUBLESHOOTING guide
- 📚 CONTRIBUTING guidelines
- 📚 Inline code comments

#### Content
- 📝 Post de exemplo completo
- 📝 Página "Sobre"
- 📝 Homepage com CTA
- 📝 Blog listing page
- 📝 Dynamic post pages
- 📝 Syntax highlighting com Shiki
- 📝 GitHub Flavored Markdown support

### Tecnologias

#### Frontend
- next: ^15.0.2
- react: ^19.0.0-rc.1
- typescript: ^5.6.2
- tailwindcss: ^3.4.13
- next-themes: ^0.3.0

#### Content
- contentlayer2: ^0.5.0
- next-contentlayer2: ^0.5.0
- remark-gfm: ^4.0.0
- rehype-pretty-code: ^0.14.0
- shiki: ^1.18.0

#### Backend
- @prisma/client: ^6.0.0
- next-auth: ^5.0.0-beta.22
- cloudinary: ^2.5.0
- bcryptjs: ^2.4.3

#### Dev Tools
- turbo: ^2.1.3
- eslint: ^9.12.0
- prettier: ^3.3.3
- husky: ^9.1.6

#### Database
- PostgreSQL: 16
- Prisma: 6.0.0

### Estrutura

```
blog-cloudinary/
├── apps/web/              # Next.js application
├── packages/
│   ├── db/                # Prisma
│   ├── ui/                # Shared components
│   └── config/            # Shared configs
├── docker-compose.yml
├── Makefile
└── ...                    # Config files
```

### Segurança

- ✅ Auth.js v5 com JWT
- ✅ Session cookies httpOnly
- ✅ CSRF protection
- ✅ Input validation
- ✅ File type validation (uploads)
- ✅ File size limits (10MB)
- ✅ Environment variables para secrets

### Performance

- ✅ React Server Components
- ✅ Static Generation para posts
- ✅ Image optimization
- ✅ Code splitting
- ✅ Turborepo build cache
- ✅ Prisma connection pooling

---

## Tipos de Mudanças

- `Added` para novas funcionalidades
- `Changed` para mudanças em funcionalidades existentes
- `Deprecated` para funcionalidades que serão removidas
- `Removed` para funcionalidades removidas
- `Fixed` para correções de bugs
- `Security` para vulnerabilidades corrigidas

[Unreleased]: https://github.com/seu-usuario/blog-cloudinary/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/seu-usuario/blog-cloudinary/releases/tag/v1.0.0
