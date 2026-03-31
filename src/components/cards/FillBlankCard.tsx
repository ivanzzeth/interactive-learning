import { useState } from 'react'
import type { FillBlankCard } from '../../types'

export function FillBlankCardView({ card, onCorrect }: { card: FillBlankCard; onCorrect: () => void }) {
  const [answers, setAnswers] = useState<string[]>(card.blanks.map(() => ''))
  const [submitted, setSubmitted] = useState(false)
  const [showHints, setShowHints] = useState<boolean[]>(card.blanks.map(() => false))

  const allCorrect = answers.every((a, i) =>
    a.trim().toLowerCase() === card.blanks[i].toLowerCase()
  )

  function handleSubmit() {
    setSubmitted(true)
    if (allCorrect) {
      setTimeout(onCorrect, 800)
    }
  }

  function handleRetry() {
    setSubmitted(false)
    setAnswers(card.blanks.map(() => ''))
  }

  function toggleHint(i: number) {
    setShowHints(prev => {
      const next = [...prev]
      next[i] = !next[i]
      return next
    })
  }

  // Split template by ___BLANK___ and interleave inputs
  const parts = card.template.split('___BLANK___')
  let blankIdx = 0

  return (
    <div>
      <div className="mb-2 text-cyan-400 text-sm font-medium">✏️ 填空练习</div>
      <h2 className="text-xl font-bold mb-3">{card.title}</h2>
      <p className="text-slate-400 mb-4">{card.description}</p>

      <div className="rounded-lg bg-slate-950 border border-slate-600 p-4 font-mono text-sm">
        {parts.map((part, i) => {
          const currentBlank = blankIdx
          const isLast = i === parts.length - 1
          blankIdx++
          return (
            <span key={i}>
              <span className="text-green-300 whitespace-pre-wrap">{part}</span>
              {!isLast && (
                <span className="inline-flex items-center">
                  <input
                    value={answers[currentBlank]}
                    onChange={(e) => {
                      const next = [...answers]
                      next[currentBlank] = e.target.value
                      setAnswers(next)
                    }}
                    disabled={submitted && allCorrect}
                    placeholder={`填空 ${currentBlank + 1}`}
                    className={`inline-block w-28 mx-1 px-2 py-0.5 rounded text-sm font-mono border outline-none ${
                      submitted
                        ? answers[currentBlank].trim().toLowerCase() === card.blanks[currentBlank].toLowerCase()
                          ? 'bg-green-900/40 border-green-500 text-green-300'
                          : 'bg-red-900/40 border-red-500 text-red-300'
                        : 'bg-slate-800 border-slate-500 text-white focus:border-cyan-500'
                    }`}
                  />
                  {card.hints?.[currentBlank] && !submitted && (
                    <button
                      onClick={() => toggleHint(currentBlank)}
                      className="text-yellow-500 text-xs ml-1 cursor-pointer hover:text-yellow-400"
                      title="提示"
                    >
                      💡
                    </button>
                  )}
                </span>
              )}
            </span>
          )
        })}
      </div>

      {/* Hints */}
      {showHints.some(Boolean) && (
        <div className="mt-2 space-y-1">
          {showHints.map((show, i) =>
            show && card.hints?.[i] ? (
              <p key={i} className="text-yellow-400/80 text-xs">💡 填空 {i + 1}: {card.hints[i]}</p>
            ) : null
          )}
        </div>
      )}

      {/* Submit / Result */}
      <div className="mt-4">
        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={answers.some(a => !a.trim())}
            className="px-4 py-2 rounded-lg bg-cyan-600 text-white hover:bg-cyan-500 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          >
            检查答案
          </button>
        ) : (
          <div className={`p-3 rounded-lg border ${allCorrect ? 'bg-green-900/30 border-green-700/50' : 'bg-red-900/30 border-red-700/50'}`}>
            <p className={`font-medium ${allCorrect ? 'text-green-300' : 'text-red-300'}`}>
              {allCorrect ? '✅ 全部正确！' : '❌ 有些地方不对'}
            </p>
            {!allCorrect && (
              <div className="mt-2 space-y-1">
                {card.blanks.map((b, i) => (
                  <p key={i} className="text-sm text-slate-300">
                    填空 {i + 1}: 正确答案是 <code className="text-cyan-300 bg-slate-800 px-1 rounded">{b}</code>
                  </p>
                ))}
                <button
                  onClick={handleRetry}
                  className="mt-2 px-3 py-1 rounded bg-slate-700 text-white text-sm hover:bg-slate-600 cursor-pointer"
                >
                  再试一次
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
