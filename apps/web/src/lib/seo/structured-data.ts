import { type Post } from 'contentlayer/generated'

export function generateArticleSchema(post: Post, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: post.image,
    datePublished: post.date,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: process.env.NEXT_PUBLIC_APP_NAME || 'Blog Cloudinary',
      logo: {
        '@type': 'ImageObject',
        url: `${url}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${url}${post.url}`,
    },
    keywords: post.tags?.join(', '),
  }
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function generateWebsiteSchema(url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: process.env.NEXT_PUBLIC_APP_NAME || 'Blog Cloudinary',
    description:
      process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
      'Blog moderno com Next.js, MDX e Cloudinary',
    url,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${url}/blog?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}
