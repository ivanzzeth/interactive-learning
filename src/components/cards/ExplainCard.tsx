import { Md as Markdown } from '../../components/Md'
import type { ExplainCard } from '../../types'

export function ExplainCardView({ card }: { card: ExplainCard }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">{card.title}</h2>
      <div className="prose prose-invert prose-lg max-w-none prose-p:my-2 prose-li:my-0.5 prose-ul:my-2 prose-ol:my-2 prose-headings:text-white prose-strong:text-white prose-code:text-indigo-300 prose-code:bg-slate-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-a:text-indigo-400">
        <Markdown>{card.content}</Markdown>
      </div>
      {card.analogy && (
        <div className="mt-6 p-4 rounded-lg bg-amber-900/30 border border-amber-700/50">
          <p className="text-amber-200 text-sm font-medium mb-1">💡 生活类比</p>
          <div className="prose prose-invert prose-sm max-w-none prose-p:my-1 prose-code:text-amber-200 prose-code:bg-amber-900/50 prose-code:px-1 prose-code:rounded prose-code:before:content-none prose-code:after:content-none text-amber-100/80">
            <Markdown>{card.analogy}</Markdown>
          </div>
        </div>
      )}
    </div>
  )
}
