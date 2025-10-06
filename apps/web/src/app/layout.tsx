import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Blog Cloudinary',
    template: '%s | Blog Cloudinary',
  },
  description:
    'Blog moderno com Next.js 15, MDX, Cloudinary e as melhores práticas de SEO',
  keywords: [
    'blog',
    'next.js',
    'mdx',
    'cloudinary',
    'typescript',
    'tailwind',
    'seo',
  ],
  authors: [{ name: 'Mauricio' }],
  creator: 'Mauricio',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: 'Blog Cloudinary',
    title: 'Blog Cloudinary',
    description:
      'Blog moderno com Next.js 15, MDX, Cloudinary e as melhores práticas de SEO',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog Cloudinary',
    description:
      'Blog moderno com Next.js 15, MDX, Cloudinary e as melhores práticas de SEO',
    creator: '@mauricio',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.variable}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
