import { useState } from 'react'
import { Md as Markdown } from '../../components/Md'
import type { ThinkFirstCard } from '../../types'
import { emit } from '../../lib/events'

export function ThinkFirstCardView({ card }: { card: ThinkFirstCard }) {
  const [thought, setThought] = useState('')
  const [revealed, setRevealed] = useState(false)

  function handleAiAnalysis() {
    const prompt = `我正在学习一个概念，老师提了一个思考题。请对比分析我的想法和参考答案，告诉我：
1. 我的理解哪些是对的
2. 哪些地方有偏差或遗漏
3. 给我一个更深入的解释

**思考题**：
${card.question}

**我的想法**：
${thought}

**参考答案**：
${card.reveal}

请用通俗易懂的语言分析，像一个耐心的老师一样指导我。`
    emit('send-to-ai', prompt)
  }

  return (
    <div>
      {/* Badge */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xs font-medium px-2 py-1 rounded-full bg-violet-900/50 text-violet-300 border border-violet-700/50">
          🧠 先思考再看答案
        </span>
      </div>

      {/* Question */}
      <div className="prose prose-invert prose-lg max-w-none prose-p:my-2 prose-headings:text-white prose-strong:text-white prose-code:text-indigo-300 prose-code:bg-slate-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none mb-6">
        <Markdown>{card.question}</Markdown>
      </div>

      {/* Optional hint */}
      {card.hints && (
        <div className="mb-4 p-3 rounded-lg bg-slate-800/60 border border-slate-600/50">
          <p className="text-slate-400 text-xs font-medium mb-1">💡 提示</p>
          <div className="prose prose-invert prose-sm max-w-none prose-p:my-1 prose-code:text-slate-300 prose-code:bg-slate-700 prose-code:px-1 prose-code:rounded prose-code:before:content-none prose-code:after:content-none text-slate-300">
            <Markdown>{card.hints}</Markdown>
          </div>
        </div>
      )}

      {/* Thought textarea */}
      {!revealed && (
        <div className="mb-4">
          <label className="block text-sm text-slate-400 mb-2">写下你的想法：</label>
          <textarea
            value={thought}
            onChange={(e) => setThought(e.target.value)}
            placeholder="在这里写下你的思考..."
            rows={4}
            className="w-full bg-slate-800 text-white rounded-lg px-4 py-3 text-sm border border-slate-600 outline-none focus:border-violet-500 resize-none transition-colors"
          />
          <div className="flex gap-3 mt-3">
            <button
              onClick={() => setRevealed(true)}
              disabled={!thought.trim()}
              className="px-4 py-2 rounded-lg bg-violet-600 text-white text-sm font-medium hover:bg-violet-500 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
            >
              揭晓答案 →
            </button>
            <button
              onClick={() => setRevealed(true)}
              className="px-4 py-2 rounded-lg bg-slate-700 text-slate-300 text-sm hover:bg-slate-600 cursor-pointer transition-colors"
            >
              跳过，直接看答案
            </button>
          </div>
        </div>
      )}

      {/* Revealed answer */}
      {revealed && (
        <>
          {/* User's thought (only show if they wrote something) */}
          {thought.trim() && (
            <div className="mb-4 p-3 rounded-lg bg-slate-800/60 border border-slate-600/50">
              <p className="text-slate-400 text-xs font-medium mb-1">你的想法：</p>
              <p className="text-slate-300 text-sm whitespace-pre-wrap">{thought}</p>
            </div>
          )}

          {/* The actual answer */}
          <div className="p-4 rounded-lg bg-violet-900/20 border border-violet-700/40">
            <p className="text-violet-300 text-xs font-medium mb-3">✨ 参考答案</p>
            <div className="prose prose-invert prose-sm max-w-none prose-p:my-1.5 prose-li:my-0.5 prose-ul:my-2 prose-ol:my-2 prose-headings:text-white prose-strong:text-white prose-code:text-violet-200 prose-code:bg-violet-900/50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-a:text-indigo-400">
              <Markdown>{card.reveal}</Markdown>
            </div>
          </div>

          {/* AI Analysis button */}
          {thought.trim() && (
            <button
              onClick={handleAiAnalysis}
              className="mt-4 w-full px-4 py-3 rounded-lg bg-indigo-600/80 hover:bg-indigo-600 text-white text-sm font-medium transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <span>🤖</span>
              <span>让 AI 对比分析我的想法</span>
            </button>
          )}

          {/* If skipped, encourage to try AI */}
          {!thought.trim() && (
            <button
              onClick={() => {
                const prompt = `请用通俗易懂的语言，详细解释以下概念：\n\n**问题**：\n${card.question}\n\n**参考答案**：\n${card.reveal}\n\n请像一个耐心的老师一样，用生活类比帮我深入理解这个概念。如果有相关的延伸知识，也请简单提一下。`
                emit('send-to-ai', prompt)
              }}
              className="mt-4 w-full px-4 py-3 rounded-lg bg-slate-700/80 hover:bg-slate-700 text-slate-300 text-sm transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <span>🤖</span>
              <span>让 AI 帮我深入理解这个概念</span>
            </button>
          )}
        </>
      )}
    </div>
  )
}
