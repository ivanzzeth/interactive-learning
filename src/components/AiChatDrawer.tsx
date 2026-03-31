import { useState, useRef, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { Md as Markdown } from './Md'
import { streamChat, AVAILABLE_MODELS } from '../lib/llm'
import { buildSystemPrompt } from '../lib/context'
import { on } from '../lib/events'
import { templates, CATEGORIES, recommendTemplates } from '../lib/templates'
import type { ThinkingTemplate } from '../lib/templates'
import type { ChatMessage } from '../lib/llm'

type PanelView = 'chat' | 'templateList' | 'templateDetail'

export function AiChatDrawer() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [streaming, setStreaming] = useState(false)
  const [model, setModel] = useState(AVAILABLE_MODELS[0].id)
  const [showModelPicker, setShowModelPicker] = useState(false)
  const [socratic, setSocratic] = useState(false)
  const [drawerWidth, setDrawerWidth] = useState(420)
  const [panelView, setPanelView] = useState<PanelView>('chat')
  const [selectedTemplate, setSelectedTemplate] = useState<ThinkingTemplate | null>(null)
  const [activeTemplateId, setActiveTemplateId] = useState<string | null>(null)
  const dragging = useRef(false)
  const abortRef = useRef<AbortController | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const params = useParams()

  const activeTemplate = activeTemplateId ? templates.find(t => t.id === activeTemplateId) ?? null : null
  const recommendedIds = recommendTemplates(params.bookId, params.lessonId)
  const recommendedTemplates = recommendedIds.map(id => templates.find(t => t.id === id)).filter(Boolean) as ThinkingTemplate[]

  // Auto-resize textarea based on content
  function autoResizeInput() {
    const el = inputRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = Math.min(el.scrollHeight, 160) + 'px'
  }

  useEffect(() => {
    autoResizeInput()
  }, [input])

  // Drag to resize drawer
  function handleDragStart(e: React.MouseEvent | React.TouchEvent) {
    e.preventDefault()
    dragging.current = true
    const startX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const startWidth = drawerWidth

    function onMove(ev: MouseEvent | TouchEvent) {
      if (!dragging.current) return
      const clientX = 'touches' in ev ? ev.touches[0].clientX : (ev as MouseEvent).clientX
      const newWidth = startWidth + (startX - clientX)
      setDrawerWidth(Math.max(320, Math.min(newWidth, window.innerWidth * 0.85)))
    }

    function onEnd() {
      dragging.current = false
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onEnd)
      document.removeEventListener('touchmove', onMove)
      document.removeEventListener('touchend', onEnd)
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onEnd)
    document.addEventListener('touchmove', onMove)
    document.addEventListener('touchend', onEnd)
  }

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  useEffect(() => {
    if (open && panelView === 'chat' && inputRef.current) {
      inputRef.current.focus()
    }
  }, [open, panelView])

  // Listen for "send-to-ai" events from prompt cards
  useEffect(() => {
    return on('send-to-ai', (text) => {
      setOpen(true)
      setPanelView('chat')
      // Delay to let drawer open first
      setTimeout(() => {
        setInput(text)
        // Auto-send after filling input
        setTimeout(() => {
          sendMessageRef.current?.(text)
        }, 100)
      }, 300)
    })
  }, [])

  const sendMessageRef = useRef<((text: string) => void) | null>(null)

  function getSystemPrompt(): ChatMessage {
    return {
      role: 'system',
      content: buildSystemPrompt({
        bookId: params.bookId,
        chapterId: params.chapterId,
        lessonId: params.lessonId,
        socratic,
        templateId: activeTemplateId ?? undefined,
      }),
    }
  }

  async function handleSend() {
    const text = input.trim()
    if (!text || streaming) return
    sendMessage(text)
  }

  sendMessageRef.current = sendMessage

  async function sendMessage(text: string) {
    if (!text || streaming) return
    setInput('')

    const userMsg: ChatMessage = { role: 'user', content: text }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setStreaming(true)

    const assistantMsg: ChatMessage = { role: 'assistant', content: '' }
    setMessages([...newMessages, assistantMsg])

    const controller = new AbortController()
    abortRef.current = controller

    const apiMessages = [getSystemPrompt(), ...newMessages]

    await streamChat(
      apiMessages,
      model,
      (token) => {
        assistantMsg.content += token
        setMessages((prev) => {
          const updated = [...prev]
          updated[updated.length - 1] = { ...assistantMsg }
          return updated
        })
      },
      () => setStreaming(false),
      (error) => {
        assistantMsg.content += `\n\n❌ ${error}`
        setMessages((prev) => {
          const updated = [...prev]
          updated[updated.length - 1] = { ...assistantMsg }
          return updated
        })
        setStreaming(false)
      },
      controller.signal,
    )
  }

  function handleStop() {
    abortRef.current?.abort()
    setStreaming(false)
  }

  function handleClear() {
    setMessages([])
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  function handleActivateTemplate(template: ThinkingTemplate) {
    setActiveTemplateId(template.id)
    setMessages([])
    setPanelView('chat')
    setSelectedTemplate(null)
  }

  function handleDeactivateTemplate() {
    setActiveTemplateId(null)
    setMessages([])
  }

  function handleOpenTemplateList() {
    setPanelView(panelView === 'templateList' ? 'chat' : 'templateList')
    setSelectedTemplate(null)
  }

  function handleSelectTemplate(template: ThinkingTemplate) {
    setSelectedTemplate(template)
    setPanelView('templateDetail')
  }

  function handleBackToList() {
    setSelectedTemplate(null)
    setPanelView('templateList')
  }

  const selectedModel = AVAILABLE_MODELS.find((m) => m.id === model)

  // Group templates by category
  const byCategory = Object.keys(CATEGORIES).reduce<Record<string, ThinkingTemplate[]>>((acc, cat) => {
    acc[cat] = templates.filter(t => t.category === cat)
    return acc
  }, {})

  return (
    <>
      {/* Floating button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-indigo-600 text-white shadow-lg hover:bg-indigo-500 transition-all hover:scale-105 cursor-pointer flex items-center justify-center text-2xl z-50"
          title="AI 学习助手"
        >
          🤖
        </button>
      )}

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full bg-slate-900 border-l border-slate-700 z-50 flex flex-col transition-transform duration-300 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ width: window.innerWidth < 640 ? '100%' : `${drawerWidth}px` }}
      >
        {/* Drag handle (left edge) */}
        <div
          className="absolute left-0 top-0 h-full w-2 cursor-col-resize hover:bg-indigo-500/30 active:bg-indigo-500/50 transition-colors z-10 hidden sm:block"
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
          title="拖拽调整宽度"
        />

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700 shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-lg shrink-0">🤖</span>
            <span className="font-medium text-white text-sm shrink-0">AI 学习助手</span>
            {/* Active template badge */}
            {activeTemplate && (
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-violet-700/60 border border-violet-500/50 text-violet-200 text-xs shrink-0">
                <span>{activeTemplate.icon}</span>
                <span className="truncate max-w-[80px]">{activeTemplate.name}</span>
                <button
                  onClick={handleDeactivateTemplate}
                  className="text-violet-400 hover:text-white cursor-pointer ml-0.5 leading-none"
                  title="取消模板"
                >
                  ✕
                </button>
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 shrink-0">
            {/* Template toggle */}
            <button
              onClick={handleOpenTemplateList}
              className={`px-2 py-1 rounded text-xs cursor-pointer border transition-colors ${
                panelView !== 'chat'
                  ? 'bg-violet-700/50 text-violet-200 border-violet-600 hover:bg-violet-700'
                  : 'bg-slate-800 text-slate-400 border-slate-600 hover:bg-slate-700 hover:text-slate-300'
              }`}
              title="思维模板"
            >
              🧠 模板
            </button>

            {/* Socratic mode toggle */}
            <button
              onClick={() => setSocratic(!socratic)}
              className={`px-2 py-1 rounded text-xs cursor-pointer border transition-colors ${
                socratic
                  ? 'bg-amber-700/50 text-amber-200 border-amber-600 hover:bg-amber-700'
                  : 'bg-slate-800 text-slate-400 border-slate-600 hover:bg-slate-700 hover:text-slate-300'
              }`}
              title={socratic ? '当前：苏格拉底模式（点击切换为直答模式）' : '当前：直答模式（点击切换为苏格拉底模式）'}
            >
              {socratic ? '🏛️ 苏格拉底' : '💬 直答'}
            </button>

            {/* Model picker */}
            <div className="relative">
              <button
                onClick={() => setShowModelPicker(!showModelPicker)}
                className="px-2 py-1 rounded text-xs bg-slate-800 text-slate-300 hover:bg-slate-700 cursor-pointer border border-slate-600"
              >
                {selectedModel?.name || model}
              </button>
              {showModelPicker && (
                <div className="absolute right-0 top-8 bg-slate-800 border border-slate-600 rounded-lg shadow-xl py-1 z-10 min-w-[200px]">
                  {AVAILABLE_MODELS.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => {
                        setModel(m.id)
                        setShowModelPicker(false)
                      }}
                      className={`w-full text-left px-3 py-2 text-sm hover:bg-slate-700 cursor-pointer ${
                        m.id === model ? 'text-indigo-400' : 'text-slate-300'
                      }`}
                    >
                      <div>{m.name}</div>
                      <div className="text-xs text-slate-500">{m.provider}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={handleClear}
              className="px-2 py-1 rounded text-xs bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white cursor-pointer"
              title="清空对话"
            >
              🗑️
            </button>
            <button
              onClick={() => setOpen(false)}
              className="px-2 py-1 rounded text-xs bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Template List Panel */}
        {panelView === 'templateList' && (
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5">
            {/* Recommended section */}
            <div>
              <h3 className="text-xs font-semibold text-violet-400 uppercase tracking-wider mb-2">⭐ 推荐</h3>
              <div className="space-y-1">
                {recommendedTemplates.map(t => (
                  <button
                    key={t.id}
                    onClick={() => handleSelectTemplate(t)}
                    className="w-full text-left flex items-start gap-3 px-3 py-2.5 rounded-lg bg-violet-900/20 border border-violet-700/30 hover:bg-violet-800/30 hover:border-violet-600/50 transition-colors cursor-pointer"
                  >
                    <span className="text-xl shrink-0 mt-0.5">{t.icon}</span>
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-white">{t.name}</div>
                      <div className="text-xs text-slate-400 mt-0.5 leading-snug">{t.oneLine}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Categories */}
            {Object.entries(CATEGORIES).map(([catKey, catLabel]) => (
              <div key={catKey}>
                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">{catLabel}</h3>
                <div className="space-y-1">
                  {byCategory[catKey]?.map(t => (
                    <button
                      key={t.id}
                      onClick={() => handleSelectTemplate(t)}
                      className={`w-full text-left flex items-start gap-3 px-3 py-2.5 rounded-lg border transition-colors cursor-pointer ${
                        activeTemplateId === t.id
                          ? 'bg-violet-700/30 border-violet-500/50 hover:bg-violet-700/40'
                          : 'bg-slate-800/60 border-slate-700/50 hover:bg-slate-800 hover:border-slate-600'
                      }`}
                    >
                      <span className="text-xl shrink-0 mt-0.5">{t.icon}</span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-white">{t.name}</span>
                          {activeTemplateId === t.id && (
                            <span className="text-xs px-1.5 py-0.5 rounded-full bg-violet-600/50 text-violet-300 border border-violet-500/40">激活中</span>
                          )}
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5 leading-snug">{t.oneLine}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Template Detail Panel */}
        {panelView === 'templateDetail' && selectedTemplate && (
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
            {/* Back button */}
            <button
              onClick={handleBackToList}
              className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-white cursor-pointer transition-colors"
            >
              ← 返回模板列表
            </button>

            {/* Template header */}
            <div className="flex items-center gap-3">
              <span className="text-4xl">{selectedTemplate.icon}</span>
              <div>
                <h2 className="text-lg font-bold text-white">{selectedTemplate.name}</h2>
                <p className="text-sm text-slate-400">{selectedTemplate.oneLine}</p>
              </div>
            </div>

            {/* Why it works */}
            <div className="rounded-lg bg-slate-800/60 border border-slate-700 p-3 space-y-1">
              <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider">为什么有效</div>
              <p className="text-sm text-slate-300 leading-relaxed">{selectedTemplate.whyItWorks}</p>
            </div>

            {/* Best for */}
            <div className="rounded-lg bg-slate-800/60 border border-slate-700 p-3 space-y-1">
              <div className="text-xs font-semibold text-green-400 uppercase tracking-wider">最适合</div>
              <p className="text-sm text-slate-300 leading-relaxed">{selectedTemplate.bestFor}</p>
            </div>

            {/* System prompt */}
            <div className="space-y-1.5">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">AI 人格设定 (System Prompt)</div>
              <pre className="rounded-lg bg-slate-950 border border-slate-700 p-3 text-xs text-green-300 whitespace-pre-wrap break-words leading-relaxed overflow-x-auto font-mono">
                {selectedTemplate.systemPrompt}
              </pre>
            </div>

            {/* Activate button */}
            <button
              onClick={() => handleActivateTemplate(selectedTemplate)}
              className="w-full py-2.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-medium text-sm cursor-pointer transition-colors"
            >
              🚀 激活此模板
            </button>

            {activeTemplateId === selectedTemplate.id && (
              <p className="text-center text-xs text-violet-400">此模板当前已激活</p>
            )}
          </div>
        )}

        {/* Chat Panel */}
        {panelView === 'chat' && (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
              {messages.length === 0 && (
                <div className="text-center text-slate-500 py-10">
                  <p className="text-3xl mb-3">{activeTemplate ? activeTemplate.icon : '🤖'}</p>
                  {activeTemplate ? (
                    <>
                      <p className="text-sm text-slate-300">{activeTemplate.name} 模式已激活</p>
                      <p className="text-xs text-slate-500 mt-1">{activeTemplate.oneLine}</p>
                    </>
                  ) : (
                    <>
                      <p className="text-sm">有什么不懂的，尽管问我！</p>
                      <p className="text-xs text-slate-600 mt-1">
                        我会根据你当前学习的内容来回答
                      </p>
                    </>
                  )}
                </div>
              )}

              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                      msg.role === 'user'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-800 text-slate-200'
                    }`}
                  >
                    {msg.role === 'user' ? (
                      <div className="whitespace-pre-wrap break-words">{msg.content}</div>
                    ) : (
                      <div className="prose prose-invert prose-sm max-w-none prose-p:my-1 prose-pre:my-2 prose-pre:bg-slate-950 prose-pre:border prose-pre:border-slate-600 prose-code:text-green-300 prose-headings:text-white prose-a:text-indigo-400">
                        {msg.content ? (
                          <Markdown>{msg.content}</Markdown>
                        ) : (
                          streaming && i === messages.length - 1 ? '思考中...' : ''
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-slate-700 px-4 py-3 shrink-0">
              <div className="flex gap-2">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="输入问题... (Enter 发送, Shift+Enter 换行)"
                  rows={1}
                  className="flex-1 bg-slate-800 text-white rounded-lg px-3 py-2 text-sm border border-slate-600 outline-none focus:border-indigo-500 resize-none overflow-y-auto"
                  style={{ maxHeight: '160px' }}
                />
                {streaming ? (
                  <button
                    onClick={handleStop}
                    className="px-3 py-2 rounded-lg bg-red-600 text-white text-sm hover:bg-red-500 cursor-pointer shrink-0"
                  >
                    ■ 停止
                  </button>
                ) : (
                  <button
                    onClick={handleSend}
                    disabled={!input.trim()}
                    className="px-3 py-2 rounded-lg bg-indigo-600 text-white text-sm hover:bg-indigo-500 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer shrink-0"
                  >
                    发送
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}
