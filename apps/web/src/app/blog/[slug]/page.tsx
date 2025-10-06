import { allPosts } from 'contentlayer/generated'
import { notFound } from 'next/navigation'
import { type Metadata } from 'next'
import Image from 'next/image'
import { Mdx } from '@/components/mdx/mdx-components'
import { formatDate } from '@/lib/utils'
import { generateArticleSchema, generateBreadcrumbSchema } from '@/lib/seo/structured-data'

interface PostPageProps {
  params: {
    slug: string
  }
}

async function getPostFromParams(params: PostPageProps['params']) {
  const post = allPosts.find((post) => post.slug === params.slug)

  if (!post || !post.published) {
    return null
  }

  return post
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post = await getPostFromParams(params)

  if (!post) {
    return {}
  }

  const url = process.env.NEXT_PUBLIC_APP_URL

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      url: `${url}${post.url}`,
      images: post.image
        ? [
            {
              url: post.image,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: post.image ? [post.image] : undefined,
    },
  }
}

export async function generateStaticParams() {
  return allPosts
    .filter((post) => post.published)
    .map((post) => ({
      slug: post.slug,
    }))
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostFromParams(params)

  if (!post) {
    notFound()
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  const articleSchema = generateArticleSchema(post, baseUrl)
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: baseUrl },
    { name: 'Blog', url: `${baseUrl}/blog` },
    { name: post.title, url: `${baseUrl}${post.url}` },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <article className="container max-w-3xl py-12">
      <div className="mb-8">
        {post.image && (
          <div className="relative mb-8 aspect-video w-full overflow-hidden rounded-lg">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}
        <h1 className="mb-4 text-4xl font-bold">{post.title}</h1>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span>•</span>
          <span>{post.readingTime} min de leitura</span>
          <span>•</span>
          <span>Por {post.author}</span>
        </div>
        {post.tags && post.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <Mdx code={post.body.code} />
      </div>
      </article>
    </>
  )
}
