.PHONY: help install dev build start clean docker-up docker-down docker-logs db-migrate db-seed db-studio db-reset lint format type-check test prepare

help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Available targets:'
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

install: ## Install dependencies
	pnpm install

dev: ## Start development server (local)
	pnpm dev

build: ## Build for production
	pnpm build

start: ## Start production server
	pnpm start

clean: ## Clean all build artifacts and dependencies
	rm -rf node_modules apps/*/node_modules packages/*/node_modules
	rm -rf apps/*/.next apps/*/dist packages/*/dist
	rm -rf .turbo apps/*/.turbo packages/*/.turbo

docker-up: ## Start Docker containers
	docker compose up -d

docker-down: ## Stop Docker containers
	docker compose down

docker-logs: ## Show Docker logs
	docker compose logs -f web db

docker-build: ## Build Docker images
	docker compose build

docker-restart: ## Restart Docker containers
	docker compose restart

docker-clean: ## Remove Docker containers and volumes
	docker compose down -v
	docker system prune -f

db-migrate: ## Run Prisma migrations
	pnpm db:migrate

db-seed: ## Seed database
	pnpm db:seed

db-studio: ## Open Prisma Studio
	pnpm db:studio

db-reset: ## Reset database
	pnpm --filter @blog/db db:reset

lint: ## Run ESLint
	pnpm lint

format: ## Format code with Prettier
	pnpm format

type-check: ## Check TypeScript types
	pnpm type-check

test: ## Run tests
	pnpm test

prepare: ## Setup git hooks
	pnpm prepare

setup: install prepare ## Initial setup (install + git hooks)
	@echo "✅ Project setup complete!"
	@echo "📝 Don't forget to copy .env.example to .env and fill in your values"
	@echo "🚀 Run 'make dev' to start development or 'make docker-up' for Docker"
