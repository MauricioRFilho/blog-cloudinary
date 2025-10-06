import { allPosts } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { formatDate } from '@/lib/utils'

export const metadata = {
  title: 'Blog',
  description: 'Todos os posts do blog',
}

export default function BlogPage() {
  const posts = allPosts
    .filter((post) => post.published)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))

  return (
    <div className="container max-w-4xl py-12">
      <div className="mb-12">
        <h1 className="mb-4 text-4xl font-bold">Blog</h1>
        <p className="text-lg text-muted-foreground">
          Artigos sobre desenvolvimento web, tecnologia e boas práticas.
        </p>
      </div>

      <div className="grid gap-8">
        {posts.map((post) => (
          <Link key={post._id} href={post.url}>
            <Card className="transition-colors hover:bg-muted/50">
              {post.image && (
                <div className="relative aspect-video w-full overflow-hidden rounded-t-lg">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <CardHeader>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span>•</span>
                  <span>{post.readingTime} min de leitura</span>
                </div>
                <CardTitle className="text-2xl">{post.title}</CardTitle>
                <CardDescription>{post.description}</CardDescription>
              </CardHeader>
              {post.tags && post.tags.length > 0 && (
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              )}
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
