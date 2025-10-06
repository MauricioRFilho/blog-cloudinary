import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="container flex h-16 items-center justify-between">
        <h1 className="text-2xl font-bold">Blog Cloudinary</h1>
        <nav className="flex items-center gap-4">
          <Link href="/blog">
            <Button variant="ghost">Blog</Button>
          </Link>
          <Link href="/sobre">
            <Button variant="ghost">Sobre</Button>
          </Link>
          <ThemeToggle />
        </nav>
      </header>

      <main className="container flex flex-1 flex-col items-center justify-center">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-4xl font-bold tracking-tight sm:text-6xl">
            Bem-vindo ao Blog Cloudinary
          </h2>
          <p className="mb-8 text-lg text-muted-foreground">
            Um blog moderno construído com Next.js 15, MDX, Cloudinary e as
            melhores práticas de SEO e performance.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/blog">
              <Button size="lg">Ver Posts</Button>
            </Link>
            <Link href="/sobre">
              <Button size="lg" variant="outline">
                Saber Mais
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <footer className="border-t py-6">
        <div className="container text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Blog Cloudinary. Todos os direitos
          reservados.
        </div>
      </footer>
    </div>
  )
}
