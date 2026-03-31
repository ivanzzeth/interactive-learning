import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export function Md({ children }: { children: string }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]}>
      {children}
    </ReactMarkdown>
  )
}
