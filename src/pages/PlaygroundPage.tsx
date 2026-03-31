import { useState, useRef } from 'react'
import { Md as ReactMarkdown } from '../components/Md'
import { AVAILABLE_MODELS, streamChat, type ChatMessage } from '../lib/llm'

interface ModelResult {
  model: string
  content: string
  loading: boolean
  error: string | null
  elapsed: number | null
}

const PRESET_PROMPTS = [
  {
    label: 'RISEN: 简历优化',
    prompt: `Role: 你是一名资深 HR 顾问，专门帮助求职者优化简历。
Instructions: 分析以下简历内容，指出不足并给出改进建议。
Steps: 1) 评估整体结构 2) 检查用词 3) 建议量化成果
End goal: 输出一份修改建议清单和优化后的版本。
Narrowing: 不超过 500 字，使用中文。

简历内容：
姓名：小明
经验：3年 Python 开发
技能：Python, Django, MySQL
项目：做过一个电商网站`,
  },
  {
    label: 'CO-STAR: 技术博客',
    prompt: `C（背景）：我是一名后端开发者，想写技术博客
O（目标）：写一篇关于 Docker 入门的文章
S（风格）：通俗易懂，多用类比
T（语气）：轻松幽默，像朋友聊天
A（受众）：刚入行的初级开发者
R（格式）：800 字以内，3 个小标题，每段有一个生活类比`,
  },
  {
    label: '思维链: 逻辑推理',
    prompt: `请一步一步思考以下问题：

一个农夫需要把狼、羊和白菜运过河。船一次只能载农夫和另一样东西。如果农夫不在场，狼会吃羊，羊会吃白菜。

请列出每一步的操作和河两岸的状态。`,
  },
  {
    label: '对比: 简单 vs 结构化',
    prompt: `帮我写一个项目方案`,
  },
]

export function PlaygroundPage() {
  const [prompt, setPrompt] = useState('')
  const [selectedModels, setSelectedModels] = useState<string[]>([
    AVAILABLE_MODELS[0]?.id ?? '',
    AVAILABLE_MODELS[1]?.id ?? '',
  ])
  const [results, setResults] = useState<ModelResult[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const abortRefs = useRef<AbortController[]>([])

  function toggleModel(modelId: string) {
    setSelectedModels(prev => {
      if (prev.includes(modelId)) {
        return prev.filter(m => m !== modelId)
      }
      return [...prev, modelId]
    })
  }

  async function runComparison() {
    if (!prompt.trim() || selectedModels.length === 0) return
    setIsRunning(true)

    // Abort any previous runs
    abortRefs.current.forEach(c => c.abort())
    abortRefs.current = []

    const newResults: ModelResult[] = selectedModels.map(m => ({
      model: m,
      content: '',
      loading: true,
      error: null,
      elapsed: null,
    }))
    setResults([...newResults])

    const promises = selectedModels.map((modelId, idx) => {
      const controller = new AbortController()
      abortRefs.current.push(controller)
      const start = Date.now()
      const messages: ChatMessage[] = [{ role: 'user', content: prompt }]

      return streamChat(
        messages,
        modelId,
        (token) => {
          newResults[idx] = {
            ...newResults[idx],
            content: newResults[idx].content + token,
          }
          setResults([...newResults])
        },
        () => {
          newResults[idx] = {
            ...newResults[idx],
            loading: false,
            elapsed: Date.now() - start,
          }
          setResults([...newResults])
        },
        (error) => {
          newResults[idx] = {
            ...newResults[idx],
            loading: false,
            error,
            elapsed: Date.now() - start,
          }
          setResults([...newResults])
        },
        controller.signal,
      )
    })

    await Promise.allSettled(promises)
    setIsRunning(false)
  }

  function handleStop() {
    abortRefs.current.forEach(c => c.abort())
    setIsRunning(false)
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-2">Prompt 实验场</h1>
      <p className="text-slate-400 mb-6">
        写同一个提示词，同时发给多个模型，对比输出质量——训练你的 AI 品味
      </p>

      {/* Preset prompts */}
      <div className="mb-4">
        <span className="text-sm text-slate-400 mr-3">预设模板：</span>
        <div className="inline-flex flex-wrap gap-2">
          {PRESET_PROMPTS.map((p, i) => (
            <button
              key={i}
              onClick={() => setPrompt(p.prompt)}
              className="text-xs px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 transition-colors"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Prompt input */}
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="输入你的提示词..."
        rows={6}
        className="w-full bg-slate-800 border border-slate-600 rounded-xl p-4 text-white resize-y focus:outline-none focus:border-indigo-500 mb-4"
      />

      {/* Model selection */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <span className="text-sm text-slate-400">选择模型：</span>
        {AVAILABLE_MODELS.map((m) => (
          <button
            key={m.id}
            onClick={() => toggleModel(m.id)}
            className={`text-sm px-3 py-1.5 rounded-lg border transition-colors ${
              selectedModels.includes(m.id)
                ? 'border-indigo-500 bg-indigo-900/40 text-indigo-300'
                : 'border-slate-600 bg-slate-800 text-slate-400 hover:border-slate-500'
            }`}
          >
            {m.name}
          </button>
        ))}

        <div className="ml-auto flex gap-2">
          {isRunning ? (
            <button
              onClick={handleStop}
              className="px-6 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white font-medium transition-colors"
            >
              停止
            </button>
          ) : (
            <button
              onClick={runComparison}
              disabled={!prompt.trim() || selectedModels.length === 0}
              className="px-6 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 disabled:text-slate-500 text-white font-medium transition-colors"
            >
              发送对比 ({selectedModels.length} 个模型)
            </button>
          )}
        </div>
      </div>

      {/* Results grid */}
      {results.length > 0 && (
        <div className={`grid gap-4 ${results.length === 1 ? 'grid-cols-1' : results.length === 2 ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'}`}>
          {results.map((r, i) => {
            const model = AVAILABLE_MODELS.find(m => m.id === r.model)
            return (
              <div
                key={i}
                className="rounded-xl border border-slate-700 bg-slate-800 flex flex-col overflow-hidden"
              >
                <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700 bg-slate-800/80">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-white">
                      {model?.name ?? r.model}
                    </span>
                    <span className="text-xs text-slate-500">{model?.provider}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {r.loading && (
                      <span className="text-xs text-indigo-400 animate-pulse">生成中...</span>
                    )}
                    {r.elapsed !== null && !r.loading && (
                      <span className="text-xs text-slate-500">{(r.elapsed / 1000).toFixed(1)}s</span>
                    )}
                  </div>
                </div>
                <div className="p-4 flex-1 overflow-auto max-h-[500px] prose prose-invert prose-sm max-w-none">
                  {r.error ? (
                    <p className="text-red-400">{r.error}</p>
                  ) : r.content ? (
                    <ReactMarkdown>{r.content}</ReactMarkdown>
                  ) : (
                    <p className="text-slate-500 italic">等待响应...</p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Tips */}
      {results.length === 0 && (
        <div className="mt-8 rounded-xl border border-slate-700 bg-slate-800/50 p-6">
          <h3 className="text-lg font-semibold mb-3">如何使用实验场</h3>
          <div className="text-slate-400 text-sm space-y-2">
            <p><strong>1. 写提示词</strong> — 可以用预设模板，也可以自己写</p>
            <p><strong>2. 选模型</strong> — 选 2-3 个模型进行对比</p>
            <p><strong>3. 观察差异</strong> — 注意：哪个模型理解更准确？格式更好？内容更深入？</p>
            <p><strong>4. 迭代改进</strong> — 修改提示词，再次对比，看输出如何变化</p>
            <p className="text-indigo-400 mt-3">
              品味的培养来自对比。看得多了，你自然能分辨什么是好的 AI 输出。
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
