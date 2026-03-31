import { useState } from 'react'
import { Md as Markdown } from '../../components/Md'
import type { TaskCard } from '../../types'

export function TaskCardView({ card }: { card: TaskCard }) {
  const [checked, setChecked] = useState<boolean[]>(() =>
    card.checklist.map(() => false)
  )
  const [done, setDone] = useState(false)

  const allChecked = checked.every(Boolean)

  function toggleItem(index: number) {
    if (done) return
    setChecked((prev) => prev.map((v, i) => (i === index ? !v : v)))
  }

  return (
    <div>
      {/* Badge */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xs font-medium px-2 py-1 rounded-full bg-emerald-900/50 text-emerald-300 border border-emerald-700/50">
          🎯 实操任务
        </span>
      </div>

      {/* Title */}
      <h2 className="text-xl font-bold text-white mb-4">{card.title}</h2>

      {/* Instruction */}
      <div className="prose prose-invert prose-sm max-w-none prose-p:my-2 prose-headings:text-white prose-strong:text-white prose-code:text-emerald-300 prose-code:bg-slate-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-a:text-emerald-400 prose-li:my-0.5 prose-ul:my-2 prose-ol:my-2 mb-6">
        <Markdown>{card.instruction}</Markdown>
      </div>

      {/* Checklist */}
      <div className="space-y-2 mb-6">
        {card.checklist.map((item, i) => (
          <button
            key={i}
            onClick={() => toggleItem(i)}
            className={`w-full flex items-start gap-3 p-3 rounded-lg border text-left transition-all cursor-pointer ${
              checked[i]
                ? 'bg-emerald-900/20 border-emerald-700/50'
                : 'bg-slate-800/60 border-slate-600/50 hover:border-emerald-700/40'
            }`}
          >
            <span
              className={`shrink-0 mt-0.5 w-5 h-5 rounded border flex items-center justify-center text-xs transition-colors ${
                checked[i]
                  ? 'bg-emerald-600 border-emerald-600 text-white'
                  : 'border-slate-500 text-transparent'
              }`}
            >
              ✓
            </span>
            <span
              className={`text-sm transition-colors ${
                checked[i] ? 'text-emerald-300 line-through' : 'text-slate-200'
              }`}
            >
              {item}
            </span>
          </button>
        ))}
      </div>

      {/* Optional tip */}
      {card.tip && (
        <div className="mb-6 p-3 rounded-lg bg-blue-900/20 border border-blue-700/40">
          <p className="text-blue-300 text-xs font-medium mb-1">💡 小贴士</p>
          <p className="text-blue-200 text-sm">{card.tip}</p>
        </div>
      )}

      {/* Complete button */}
      {!done ? (
        <button
          onClick={() => setDone(true)}
          disabled={!allChecked}
          className="px-5 py-2.5 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-500 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
        >
          我完成了 ✓
        </button>
      ) : (
        <div className="p-3 rounded-lg bg-emerald-900/20 border border-emerald-700/40">
          <p className="text-emerald-300 text-sm font-medium">太棒了！任务完成 🎉</p>
        </div>
      )}
    </div>
  )
}
