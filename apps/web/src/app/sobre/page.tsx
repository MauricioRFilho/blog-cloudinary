import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sobre',
  description: 'Sobre o Blog Cloudinary e sua stack tecnológica moderna.',
}

export default function SobrePage() {
  return (
    <div className="container max-w-3xl py-12">
      <h1 className="mb-4 text-4xl font-bold">Sobre</h1>

      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <p className="lead">
          Blog Cloudinary é um projeto demonstrativo que implementa as melhores
          práticas de desenvolvimento web moderno com Next.js 15.
        </p>

        <h2>Stack Tecnológica</h2>

        <h3>Frontend</h3>
        <ul>
          <li><strong>Next.js 15</strong> - Framework React com App Router</li>
          <li><strong>TypeScript</strong> - Type safety completo</li>
          <li><strong>Tailwind CSS</strong> - Estilização utility-first</li>
          <li><strong>shadcn/ui</strong> - Componentes acessíveis</li>
          <li><strong>Framer Motion</strong> - Animações fluidas</li>
        </ul>

        <h3>Backend & Database</h3>
        <ul>
          <li><strong>Prisma 6</strong> - ORM type-safe</li>
          <li><strong>PostgreSQL 16</strong> - Banco de dados relacional</li>
          <li><strong>Auth.js v5</strong> - Autenticação moderna</li>
        </ul>

        <h3>Content & Media</h3>
        <ul>
          <li><strong>Contentlayer</strong> - MDX type-safe</li>
          <li><strong>Cloudinary</strong> - CDN e otimização de imagens</li>
          <li><strong>Shiki</strong> - Syntax highlighting</li>
        </ul>

        <h2>Recursos Implementados</h2>

        <ul>
          <li>✅ Performance otimizada (Core Web Vitals)</li>
          <li>✅ SEO completo (metadata, sitemap, RSS)</li>
          <li>✅ Dark mode com persistência</li>
          <li>✅ Design responsivo mobile-first</li>
          <li>✅ Acessibilidade (ARIA labels)</li>
          <li>✅ Type-safe em todo o projeto</li>
          <li>✅ Monorepo com Turborepo</li>
          <li>✅ Docker para desenvolvimento</li>
          <li>✅ Makefile para comandos úteis</li>
        </ul>

        <h2>SEO & Performance</h2>

        <p>
          Este blog implementa todas as melhores práticas de SEO:
        </p>

        <ul>
          <li>Metadata API dinâmica do Next.js</li>
          <li>Sitemap XML automático</li>
          <li>RSS feed</li>
          <li>Open Graph tags</li>
          <li>Twitter Cards</li>
          <li>JSON-LD structured data</li>
          <li>robots.txt</li>
          <li>Web manifest</li>
        </ul>

        <h2>Developer Experience</h2>

        <ul>
          <li>TypeScript strict mode</li>
          <li>ESLint + Prettier</li>
          <li>Husky + lint-staged</li>
          <li>Conventional commits</li>
          <li>Hot reload com Turbo</li>
        </ul>

        <h2>Contato</h2>

        <p>
          Este é um projeto open-source. Sinta-se à vontade para explorar o
          código e contribuir!
        </p>
      </div>
    </div>
  )
}
