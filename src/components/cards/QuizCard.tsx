import { useState } from 'react'
import { Md as Markdown } from '../../components/Md'
import type { QuizCard } from '../../types'

export function QuizCardView({ card, onCorrect }: { card: QuizCard; onCorrect: () => void }) {
  const [selected, setSelected] = useState<number | null>(null)
  const isCorrect = selected === card.correctIndex
  const answered = selected !== null

  function handleSelect(index: number) {
    if (answered) return
    setSelected(index)
    if (index === card.correctIndex) {
      onCorrect()
    }
  }

  return (
    <div>
      <div className="mb-2 text-indigo-400 text-sm font-medium">🧠 小测验</div>
      <div className="prose prose-invert max-w-none prose-p:my-1 prose-code:text-indigo-300 prose-code:bg-slate-800 prose-code:px-1 prose-code:rounded prose-code:before:content-none prose-code:after:content-none mb-6">
        <Markdown>{card.question}</Markdown>
      </div>

      <div className="space-y-3">
        {card.options.map((option, i) => {
          let style = 'border-slate-600 bg-slate-800 hover:border-slate-400'
          if (answered) {
            if (i === card.correctIndex) {
              style = 'border-green-500 bg-green-900/30'
            } else if (i === selected) {
              style = 'border-red-500 bg-red-900/30'
            } else {
              style = 'border-slate-700 bg-slate-800/50 opacity-50'
            }
          }

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              className={`w-full text-left p-4 rounded-lg border transition-all cursor-pointer ${style}`}
            >
              <span className="text-slate-400 mr-3">{String.fromCharCode(65 + i)}.</span>
              <span className="text-white"><code className="text-indigo-300 bg-transparent px-0">{option}</code></span>
            </button>
          )
        })}
      </div>

      {answered && (
        <div
          className={`mt-6 p-4 rounded-lg border ${
            isCorrect
              ? 'bg-green-900/30 border-green-700/50'
              : 'bg-red-900/30 border-red-700/50'
          }`}
        >
          <p className={`font-medium mb-1 ${isCorrect ? 'text-green-300' : 'text-red-300'}`}>
            {isCorrect ? '✅ 正确！' : '❌ 不对哦'}
          </p>
          <div className="prose prose-invert prose-sm max-w-none prose-p:my-1 prose-code:text-indigo-300 prose-code:bg-slate-800 prose-code:px-1 prose-code:rounded prose-code:before:content-none prose-code:after:content-none text-slate-300">
            <Markdown>{card.explanation}</Markdown>
          </div>
        </div>
      )}
    </div>
  )
}
