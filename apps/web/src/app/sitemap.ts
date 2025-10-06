import { MetadataRoute } from 'next'
import { allPosts } from 'contentlayer/generated'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

  const posts = allPosts
    .filter((post) => post.published)
    .map((post) => ({
      url: `${baseUrl}${post.url}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))

  const routes = ['', '/blog', '/sobre'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.9,
  }))

  return [...routes, ...posts]
}
