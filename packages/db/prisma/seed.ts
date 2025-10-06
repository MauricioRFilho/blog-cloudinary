import { PrismaClient, Role } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create admin user
  const admin = await prisma.user.upsert({
    where: { email: 'admin@blog.com' },
    update: {},
    create: {
      email: 'admin@blog.com',
      name: 'Admin',
      role: Role.ADMIN,
      emailVerified: new Date(),
    },
  })

  console.log('✅ Created admin user:', admin.email)

  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'tecnologia' },
      update: {},
      create: {
        name: 'Tecnologia',
        slug: 'tecnologia',
        description: 'Posts sobre tecnologia e desenvolvimento',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'tutoriais' },
      update: {},
      create: {
        name: 'Tutoriais',
        slug: 'tutoriais',
        description: 'Guias e tutoriais práticos',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'web' },
      update: {},
      create: {
        name: 'Web',
        slug: 'web',
        description: 'Desenvolvimento web moderno',
      },
    }),
  ])

  console.log('✅ Created categories:', categories.length)

  // Create tags
  const tags = await Promise.all([
    prisma.tag.upsert({
      where: { slug: 'nextjs' },
      update: {},
      create: { name: 'Next.js', slug: 'nextjs' },
    }),
    prisma.tag.upsert({
      where: { slug: 'react' },
      update: {},
      create: { name: 'React', slug: 'react' },
    }),
    prisma.tag.upsert({
      where: { slug: 'typescript' },
      update: {},
      create: { name: 'TypeScript', slug: 'typescript' },
    }),
    prisma.tag.upsert({
      where: { slug: 'prisma' },
      update: {},
      create: { name: 'Prisma', slug: 'prisma' },
    }),
  ])

  console.log('✅ Created tags:', tags.length)

  // Create sample post
  const post = await prisma.post.upsert({
    where: { slug: 'bem-vindo-ao-blog' },
    update: {},
    create: {
      title: 'Bem-vindo ao Blog Cloudinary',
      slug: 'bem-vindo-ao-blog',
      description:
        'Primeiro post do blog. Conheça nossa stack moderna e as melhores práticas de desenvolvimento.',
      content: `# Bem-vindo ao Blog!

Este é o primeiro post do nosso blog construído com tecnologias modernas.

## Stack Tecnológica

- **Next.js 15**: Framework React com App Router
- **Prisma**: ORM type-safe
- **Cloudinary**: Gerenciamento de imagens
- **MDX**: Markdown com componentes React
- **Tailwind CSS**: Estilização moderna

## Recursos

- 🚀 Performance otimizada
- 🎨 Design responsivo
- 🌙 Dark mode
- 📝 MDX para conteúdo
- 🔍 SEO otimizado
- 🖼️ Imagens otimizadas com Cloudinary

Fique ligado para mais conteúdo!`,
      published: true,
      featured: true,
      publishedAt: new Date(),
      authorId: admin.id,
      categories: {
        connect: [{ id: categories[0]!.id }, { id: categories[2]!.id }],
      },
      tags: {
        connect: [{ id: tags[0]!.id }, { id: tags[1]!.id }],
      },
    },
  })

  console.log('✅ Created sample post:', post.title)

  console.log('🎉 Database seed completed!')
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
