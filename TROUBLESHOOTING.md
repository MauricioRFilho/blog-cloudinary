# 🔧 Troubleshooting

Soluções para problemas comuns ao desenvolver o Blog Cloudinary.

## 🐳 Problemas com Docker

### Docker não inicia

**Problema:** `docker compose up` falha

**Soluções:**

1. Verifique se Docker Desktop está rodando:
   ```bash
   docker --version
   docker ps
   ```

2. Reinicie o Docker Desktop

3. Limpe containers antigos:
   ```bash
   docker compose down -v
   docker system prune -f
   ```

### Porta 5433 já em uso

**Problema:** `Error starting userland proxy: listen tcp4 0.0.0.0:5433: bind: address already in use`

**Solução:**

```bash
# Windows
netstat -ano | findstr :5433
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5433 | xargs kill -9

# Ou mude a porta no docker-compose.yml
```

### Container reinicia constantemente

**Problema:** `docker ps` mostra container com status "Restarting"

**Solução:**

```bash
# Ver logs
docker compose logs db

# Geralmente é falta de memória
# Aumente no Docker Desktop: Settings > Resources > Memory
```

## 📦 Problemas com pnpm

### `pnpm install` falha

**Problema:** Erro durante instalação de dependências

**Soluções:**

1. Limpe cache:
   ```bash
   pnpm store prune
   rm -rf node_modules
   pnpm install
   ```

2. Use flag `--shamefully-hoist`:
   ```bash
   pnpm install --shamefully-hoist
   ```

3. Atualize pnpm:
   ```bash
   npm install -g pnpm@latest
   ```

### Workspace não resolve dependências

**Problema:** `Cannot find module '@blog/db'`

**Solução:**

1. Verifique `pnpm-workspace.yaml`:
   ```yaml
   packages:
     - "apps/*"
     - "packages/*"
   ```

2. Reinstale:
   ```bash
   pnpm install
   ```

## 🗄️ Problemas com Prisma

### `Cannot connect to database`

**Problema:** Prisma não consegue conectar ao banco

**Soluções:**

1. Verifique se PostgreSQL está rodando:
   ```bash
   docker compose ps db
   ```

2. Verifique `DATABASE_URL` no `.env`:
   ```env
   DATABASE_URL="postgresql://postgres:postgres@localhost:5433/blog?schema=public"
   ```

3. Teste conexão:
   ```bash
   docker compose exec db psql -U postgres -d blog -c "SELECT 1"
   ```

### `Prisma Client not found`

**Problema:** `Cannot find module '@prisma/client'`

**Solução:**

```bash
pnpm --filter @blog/db generate
# ou
pnpm db:generate
```

### Migration falha

**Problema:** `Migration failed: P3009`

**Solução:**

```bash
# Resete o banco (CUIDADO: deleta dados!)
pnpm --filter @blog/db db:reset

# Ou force a migration
pnpm --filter @blog/db migrate --force
```

## 📝 Problemas com Contentlayer

### Build error no Contentlayer

**Problema:** `Error: Contentlayer build failed`

**Soluções:**

1. Limpe cache:
   ```bash
   rm -rf apps/web/.contentlayer
   rm -rf apps/web/.next
   ```

2. Verifique frontmatter dos posts:
   ```mdx
   ---
   title: 'Título'  # String obrigatória
   date: '2024-10-06'  # Formato YYYY-MM-DD
   published: true  # Boolean
   ---
   ```

3. Reinstale:
   ```bash
   pnpm install --force
   ```

### Hot reload não funciona

**Problema:** Mudanças em MDX não aparecem

**Solução:**

```bash
# Reinicie o dev server
# Ctrl+C e depois:
pnpm dev
```

## 🎨 Problemas com Next.js

### Porta 3000 em uso

**Problema:** `Port 3000 is already in use`

**Solução:**

```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9

# Ou use outra porta:
PORT=3001 pnpm dev
```

### `Module not found` error

**Problema:** Imports não funcionam

**Soluções:**

1. Verifique `tsconfig.json` paths:
   ```json
   {
     "compilerOptions": {
       "paths": {
         "@/*": ["./src/*"]
       }
     }
   }
   ```

2. Reinicie TypeScript server (VSCode):
   - `Cmd/Ctrl + Shift + P`
   - "TypeScript: Restart TS Server"

### Build falha em produção

**Problema:** `pnpm build` falha

**Soluções:**

1. Verifique erros de tipo:
   ```bash
   pnpm type-check
   ```

2. Verifique erros de lint:
   ```bash
   pnpm lint
   ```

3. Limpe cache:
   ```bash
   rm -rf .next
   pnpm build
   ```

## 🔐 Problemas com Auth

### `[auth][error]`

**Problema:** Erro ao fazer login

**Soluções:**

1. Verifique `NEXTAUTH_SECRET` no `.env`:
   ```bash
   # Gere um novo:
   openssl rand -base64 32
   ```

2. Verifique `NEXTAUTH_URL`:
   ```env
   NEXTAUTH_URL="http://localhost:3000"
   ```

3. Verifique callbacks OAuth:
   - Google: `http://localhost:3000/api/auth/callback/google`
   - GitHub: `http://localhost:3000/api/auth/callback/github`

### Session não persiste

**Problema:** Usuário desloga sozinho

**Solução:**

1. Verifique cookies no browser (DevTools > Application > Cookies)

2. Certifique-se que `NEXTAUTH_URL` está correto

3. Limpe cookies e tente novamente

## ☁️ Problemas com Cloudinary

### Upload falha

**Problema:** Erro 401 ou 403 ao fazer upload

**Soluções:**

1. Verifique credenciais no `.env`:
   ```env
   CLOUDINARY_CLOUD_NAME="seu-cloud-name"
   CLOUDINARY_API_KEY="sua-api-key"
   CLOUDINARY_API_SECRET="seu-api-secret"
   ```

2. Verifique no Cloudinary Dashboard se as credenciais estão corretas

3. Verifique limites da conta (free tier: 25 credits/month)

### Imagens não aparecem

**Problema:** URLs do Cloudinary retornam 404

**Solução:**

1. Verifique `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` no `.env`

2. Certifique-se que a imagem foi realmente enviada (Dashboard > Media Library)

## 🎨 Problemas com Tailwind/UI

### Estilos não aplicam

**Problema:** Classes Tailwind não funcionam

**Soluções:**

1. Verifique `tailwind.config.ts` content:
   ```typescript
   content: [
     './src/**/*.{js,ts,jsx,tsx,mdx}',
   ]
   ```

2. Reinicie dev server

3. Limpe cache:
   ```bash
   rm -rf .next
   ```

### Dark mode não funciona

**Problema:** Theme toggle não muda cores

**Solução:**

1. Verifique `next-themes` provider em `layout.tsx`

2. Verifique classes `dark:` no CSS

3. Inspecione `<html>` no DevTools (deve ter classe `dark`)

## 🔍 Debug Geral

### TypeScript errors no editor

**Problema:** VSCode mostra erros TypeScript

**Soluções:**

1. Reinstale dependências:
   ```bash
   pnpm install
   ```

2. Gere Prisma Client:
   ```bash
   pnpm --filter @blog/db generate
   ```

3. Reinicie TS Server (VSCode):
   - `Cmd/Ctrl + Shift + P` > "Restart TS Server"

### Performance lenta

**Problema:** Dev server muito lento

**Soluções:**

1. Desabilite Turbopack (se estiver usando):
   ```json
   // package.json
   "dev": "next dev"  // sem --turbo
   ```

2. Aumente memória do Node:
   ```json
   "dev": "NODE_OPTIONS='--max-old-space-size=4096' next dev"
   ```

3. Exclua `.next` e `.contentlayer` do antivírus

## 📞 Ainda com problemas?

1. **Verifique logs:**
   ```bash
   # Docker
   docker compose logs -f

   # Dev server
   # Logs aparecem no terminal onde rodou `pnpm dev`
   ```

2. **Procure no GitHub Issues:**
   - [Next.js Issues](https://github.com/vercel/next.js/issues)
   - [Prisma Issues](https://github.com/prisma/prisma/issues)
   - [Contentlayer Issues](https://github.com/contentlayerdev/contentlayer/issues)

3. **Abra uma issue no projeto:**
   - [Blog Cloudinary Issues](https://github.com/seu-usuario/blog-cloudinary/issues)

4. **Faça perguntas:**
   - Stack Overflow
   - Discord da Vercel/Prisma

---

**Dica:** Sempre compartilhe logs completos e informações do ambiente (OS, Node version, etc) ao pedir ajuda!
