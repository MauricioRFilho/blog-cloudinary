import { defineDocumentType, makeSource } from 'contentlayer2/source-files'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `blog/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    description: {
      type: 'string',
      required: true,
    },
    date: {
      type: 'date',
      required: true,
    },
    published: {
      type: 'boolean',
      default: true,
    },
    featured: {
      type: 'boolean',
      default: false,
    },
    author: {
      type: 'string',
      default: 'Mauricio',
    },
    image: {
      type: 'string',
    },
    tags: {
      type: 'list',
      of: { type: 'string' },
      default: [],
    },
    categories: {
      type: 'list',
      of: { type: 'string' },
      default: [],
    },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => {
        const parts = doc._raw.flattenedPath.split('/')
        return parts[parts.length - 1]
      },
    },
    slugAsParams: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.split('/').slice(1).join('/'),
    },
    url: {
      type: 'string',
      resolve: (doc) => `/blog/${doc._raw.flattenedPath.split('/').slice(1).join('/')}`,
    },
    readingTime: {
      type: 'number',
      resolve: (doc) => {
        const wordsPerMinute = 200
        const wordCount = doc.body.raw.trim().split(/\s+/).length
        return Math.ceil(wordCount / wordsPerMinute)
      },
    },
  },
}))

export default makeSource({
  contentDirPath: './content',
  documentTypes: [Post],
  disableImportAliasWarning: true,
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: 'github-dark',
          onVisitLine(node: any) {
            // Prevent lines from collapsing in `display: grid` mode
            if (node.children.length === 0) {
              node.children = [{ type: 'text', value: ' ' }]
            }
          },
          onVisitHighlightedLine(node: any) {
            node.properties.className.push('line--highlighted')
          },
          onVisitHighlightedWord(node: any) {
            node.properties.className = ['word--highlighted']
          },
        },
      ],
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ['anchor'],
            ariaLabel: 'Link to section',
          },
        },
      ],
    ],
  },
})
