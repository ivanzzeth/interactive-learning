import { useState, useRef, useEffect } from 'react'
import { Md as Markdown } from '../../components/Md'
import { EditorView, keymap, placeholder as cmPlaceholder } from '@codemirror/view'
import { EditorState } from '@codemirror/state'
import { rust } from '@codemirror/lang-rust'
import { oneDark } from '@codemirror/theme-one-dark'
import { defaultKeymap } from '@codemirror/commands'
import { basicSetup } from 'codemirror'
import type { CodeCard } from '../../types'

export function CodeCardView({ card }: { card: CodeCard }) {
  const [output, setOutput] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const editorRef = useRef<HTMLDivElement>(null)
  const viewRef = useRef<EditorView | null>(null)
  const codeRef = useRef(card.code)

  useEffect(() => {
    if (!editorRef.current) return

    const state = EditorState.create({
      doc: card.code,
      extensions: [
        basicSetup,
        rust(),
        oneDark,
        keymap.of(defaultKeymap),
        cmPlaceholder('// 在这里写代码...'),
        EditorView.theme({
          '&': { fontSize: '13px', maxHeight: '300px' },
          '.cm-scroller': { overflow: 'auto' },
          '.cm-content': { fontFamily: 'ui-monospace, Consolas, monospace' },
        }),
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            codeRef.current = update.state.doc.toString()
          }
        }),
      ],
    })

    const view = new EditorView({ state, parent: editorRef.current })
    viewRef.current = view

    return () => view.destroy()
  }, [card.code])

  async function runCode() {
    setLoading(true)
    setOutput(null)
    try {
      const res = await fetch('https://play.rust-lang.org/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          channel: 'stable',
          mode: 'debug',
          edition: '2021',
          crateType: 'bin',
          tests: false,
          code: codeRef.current,
          backtrace: false,
        }),
      })
      const data = await res.json()
      setOutput(data.stderr ? data.stderr + '\n' + data.stdout : data.stdout)
    } catch {
      setOutput('运行失败，请检查网络连接')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">{card.title}</h2>
      <div className="prose prose-invert prose-sm max-w-none prose-p:my-1.5 prose-li:my-0.5 prose-code:text-indigo-300 prose-code:bg-slate-800 prose-code:px-1 prose-code:rounded prose-code:before:content-none prose-code:after:content-none text-slate-400 mb-4">
        <Markdown>{card.description}</Markdown>
      </div>

      <div className="rounded-lg overflow-hidden border border-slate-600">
        <div className="bg-slate-900 px-4 py-2 flex items-center justify-between">
          <span className="text-slate-400 text-xs uppercase tracking-wider">{card.language}</span>
          {card.runnable && (
            <button
              onClick={runCode}
              disabled={loading}
              className="px-3 py-1 rounded bg-green-600 text-white text-sm hover:bg-green-500 disabled:opacity-50 transition-colors cursor-pointer"
            >
              {loading ? '运行中...' : '▶ 运行'}
            </button>
          )}
        </div>
        <div ref={editorRef} />
      </div>

      {output !== null && (
        <div className="mt-3 rounded-lg bg-slate-950 border border-slate-600 p-4">
          <p className="text-slate-400 text-xs mb-2">输出：</p>
          <pre className="text-green-300 font-mono text-sm whitespace-pre-wrap">{output || '(无输出)'}</pre>
        </div>
      )}
    </div>
  )
}
