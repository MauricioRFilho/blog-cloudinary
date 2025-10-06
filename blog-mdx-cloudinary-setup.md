# Blog Pessoal (Next.js + Prisma + PostgreSQL) — Setup com Docker & Make

> Objetivo: iniciar e desenvolver rapidamente um blog com MDX, upload de imagens (Cloudinary), autenticação (NextAuth) e Prisma, usando Docker, docker-compose, Makefile e fluxo **npm install → make**.

## Pré-requisitos
- Docker + Docker Compose
- Node.js 20+ e npm 10+ (opcional)
- Conta Cloudinary

## Estrutura
```
blog/
  apps/web/
  packages/db/
  docker-compose.yml
  Makefile
  .env.example
```

## .env.example
```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=replace-me
DATABASE_URL=postgresql://postgres:postgres@db:5432/blog?schema=public
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

## docker-compose.yml
```yaml
version: "3.9"
services:
  db:
    image: postgres:16
    environment:
      POSTGRES_PASSWORD: postgres
      POSTGRES_USER: postgres
      POSTGRES_DB: blog
    ports:
      - "5433:5432"
    volumes:
      - pgdata_blog:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres -d blog"]
      interval: 5s
      timeout: 5s
      retries: 10

  web:
    build:
      context: .
      dockerfile: ./apps/web/Dockerfile
    env_file: .env
    ports:
      - "3000:3000"
    depends_on:
      db:
        condition: service_healthy
    volumes:
      - ./apps/web:/app
      - ./packages/db:/packages/db
      - /app/node_modules

volumes:
  pgdata_blog:
```

## Dockerfile
```Dockerfile
FROM node:20-slim AS deps
WORKDIR /app
COPY apps/web/package*.json ./
RUN npm ci

FROM node:20-slim AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY apps/web ./
COPY packages/db ../packages/db
RUN npm run build

FROM node:20-slim
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app .
EXPOSE 3000
CMD ["npm","run","start"]
```

## Prisma schema.prisma
```prisma
generator client { provider = "prisma-client-js" }
datasource db { provider = "postgresql"; url = env("DATABASE_URL") }

model User {
  id String @id @default(cuid())
  email String @unique
  role Role @default(READER)
  posts Post[]
}
model Post {
  id String @id @default(cuid())
  slug String @unique
  title String
  contentMd String
  coverUrl String?
  status PostStatus @default(DRAFT)
}
enum Role { ADMIN EDITOR READER }
enum PostStatus { DRAFT PUBLISHED }
```

## Makefile
```makefile
SHELL := /bin/bash
.PHONY: bootstrap up down logs build dev migrate seed prisma test clean sh

bootstrap:
	npm install --legacy-peer-deps || true

up:
	docker compose up -d --build

down:
	docker compose down

logs:
	docker compose logs -f web db

build:
	docker compose build

dev:
	docker compose up -d db
	npm run --prefix apps/web prisma:migrate || true
	npm run --prefix apps/web dev

migrate:
	npm run --prefix apps/web prisma:migrate

seed:
	npm run --prefix apps/web seed

test:
	npm run --prefix apps/web test

clean:
	docker compose down -v
	rm -rf node_modules **/node_modules
```

## Rodar
1. `npm install`
2. `make up`
3. `make dev`
4. `make test`
