import type { DiagramCard } from '../../types'

export function DiagramCardView({ card }: { card: DiagramCard }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">{card.title}</h2>
      <p className="text-slate-400 mb-4">{card.description}</p>
      <div
        className="flex justify-center p-4 rounded-lg bg-slate-800/50 border border-slate-700"
        dangerouslySetInnerHTML={{ __html: card.svg }}
      />
    </div>
  )
}
