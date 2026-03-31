import { useState } from 'react'
import { Md as Markdown } from '../../components/Md'
import type { AiPromptCard } from '../../types'
import { emit } from '../../lib/events'

export function AiPromptCardView({ card }: { card: AiPromptCard }) {
  const [step, setStep] = useState<'scenario' | 'prompt' | 'done'>('scenario')
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(card.prompt).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  function handleSendToAi() {
    emit('send-to-ai', card.prompt)
    setStep('done')
  }

  return (
    <div>
      <div className="mb-2 text-purple-400 text-sm font-medium">🤖 AI 实战提示词</div>
      <h2 className="text-xl font-bold mb-3">{card.title}</h2>

      {/* Step 1: Show scenario, ask user to think */}
      <div className="mb-4 p-4 rounded-lg bg-slate-800/60 border border-slate-600/50">
        <p className="text-slate-400 text-xs font-medium mb-2">📋 场景</p>
        <div className="prose prose-invert prose-sm max-w-none prose-p:my-1 text-slate-200">
          <Markdown>{card.scenario}</Markdown>
        </div>
      </div>

      {step === 'scenario' && (
        <button
          onClick={() => setStep('prompt')}
          className="w-full px-4 py-3 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium transition-colors cursor-pointer"
        >
          看看高手怎么写提示词 →
        </button>
      )}

      {/* Step 2: Show prompt with actions */}
      {(step === 'prompt' || step === 'done') && (
        <div className="rounded-lg border border-purple-700/50 bg-purple-950/30 p-4 mb-4 animate-[fadeIn_0.3s_ease-out]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-purple-300 text-xs font-medium uppercase tracking-wider">提示词</span>
            <div className="flex gap-2">
              <button
                onClick={handleCopy}
                className="px-3 py-1 rounded bg-purple-600 text-white text-xs hover:bg-purple-500 transition-colors cursor-pointer"
              >
                {copied ? '✓ 已复制' : '📋 复制'}
              </button>
            </div>
          </div>
          <div className="prose prose-invert prose-sm max-w-none prose-p:my-1 prose-code:text-purple-200 prose-code:bg-purple-900/50 prose-code:px-1 prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-strong:text-purple-100">
            <Markdown>{card.prompt}</Markdown>
          </div>
        </div>
      )}

      {step === 'prompt' && (
        <button
          onClick={handleSendToAi}
          className="w-full px-4 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors cursor-pointer flex items-center justify-center gap-2"
        >
          <span>🚀</span>
          <span>发送到 AI 助手，看看效果</span>
        </button>
      )}

      {/* Step 3: After sending, show explanation */}
      {step === 'done' && (
        <>
          <div className="mb-4 p-3 rounded-lg bg-green-900/20 border border-green-700/40 text-green-300 text-sm flex items-center gap-2">
            <span>✓</span>
            <span>已发送到 AI 助手，打开右下角对话框查看回复</span>
          </div>

          <div className="p-4 rounded-lg bg-slate-800 border border-slate-700 animate-[fadeIn_0.3s_ease-out]">
            <p className="text-slate-400 text-xs font-medium mb-2">💡 为什么这样写提示词</p>
            <div className="prose prose-invert prose-sm max-w-none prose-p:my-1 text-slate-300">
              <Markdown>{card.explanation}</Markdown>
            </div>
          </div>

          {/* Allow re-send */}
          <button
            onClick={() => {
              emit('send-to-ai', card.prompt)
            }}
            className="mt-3 px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 text-sm transition-colors cursor-pointer"
          >
            🔄 再发送一次
          </button>
        </>
      )}
    </div>
  )
}
