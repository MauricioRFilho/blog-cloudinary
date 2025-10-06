import { useMDXComponent } from 'next-contentlayer2/hooks'
import Image from 'next/image'
import Link from 'next/link'

const components = {
  Image,
  Link,
  a: ({ href, children, ...props }: React.ComponentProps<'a'>) => {
    if (href?.startsWith('/')) {
      return (
        <Link href={href} {...props}>
          {children}
        </Link>
      )
    }
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    )
  },
}

interface MdxProps {
  code: string
}

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code)

  return <Component components={components} />
}
