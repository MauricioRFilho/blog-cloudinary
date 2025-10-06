import { NextResponse } from 'next/server'
import { allPosts } from 'contentlayer/generated'

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  const appName = process.env.NEXT_PUBLIC_APP_NAME || 'Blog Cloudinary'
  const appDescription =
    process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
    'Blog moderno com Next.js, MDX e Cloudinary'

  const posts = allPosts
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${appName}</title>
    <link>${baseUrl}</link>
    <description>${appDescription}</description>
    <language>pt-BR</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    ${posts
      .map(
        (post) => `
    <item>
      <title>${post.title}</title>
      <link>${baseUrl}${post.url}</link>
      <description>${post.description}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <guid>${baseUrl}${post.url}</guid>
      ${post.author ? `<author>${post.author}</author>` : ''}
      ${post.tags?.map((tag) => `<category>${tag}</category>`).join('\n      ') || ''}
    </item>`
      )
      .join('')}
  </channel>
</rss>`

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=1800',
    },
  })
}
