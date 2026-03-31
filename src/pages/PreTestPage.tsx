import { useState, useMemo } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { books } from '../data'
import type { QuizCard } from '../types'
import {
  savePreTestResult,
  getPreTestResult,
} from '../lib/progress'

interface PreTestItem {
  chapterId: string
  chapterTitle: string
  card: QuizCard
}

function buildPreTestItems(bookId: string): PreTestItem[] {
  const book = books.find(b => b.id === bookId)
  if (!book) return []

  const items: PreTestItem[] = []
  for (const chapter of book.chapters) {
    if (chapter.lessons.length === 0) continue
    // Find first quiz card across all lessons in this chapter
    let found: QuizCard | null = null
    for (const lesson of chapter.lessons) {
      const quiz = lesson.cards.find((c): c is QuizCard => c.type === 'quiz')
      if (quiz) { found = quiz; break }
    }
    if (found) {
      items.push({ chapterId: chapter.id, chapterTitle: chapter.title, card: found })
    }
  }
  return items
}

export function PreTestPage() {
  const { bookId } = useParams<{ bookId: string }>()
  const book = books.find(b => b.id === bookId)

  const preTestItems = useMemo(() => buildPreTestItems(bookId ?? ''), [bookId])

  const [currentIndex, setCurrentIndex] = useState(0)
  const [results, setResults] = useState<Record<string, boolean>>({}) // chapterId -> correct
  const [answeredThisCard, setAnsweredThisCard] = useState(false)
  const [done, setDone] = useState(false)

  if (!book) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-400 text-lg">找不到这本书</p>
        <Link to="/books" className="text-indigo-400 mt-4 inline-block">← 回到书架</Link>
      </div>
    )
  }

  if (!bookId) return <Navigate to="/books" replace />

  // If already has pretest results, redirect to book overview
  const existingResult = getPreTestResult(bookId)
  if (existingResult !== null) {
    return <Navigate to={`/books/${bookId}`} replace />
  }

  if (preTestItems.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-20 text-center">
        <p className="text-slate-400">这本书暂无测试题目</p>
        <Link to={`/books/${bookId}`} className="text-indigo-400 mt-4 inline-block">← 回到目录</Link>
      </div>
    )
  }

  // ── Results screen ──────────────────────────────────────────────────────────
  if (done) {
    const passedChapters = Object.values(results).filter(Boolean).length
    const totalChapters = preTestItems.length

    return (
      <div className="max-w-2xl mx-auto px-6 py-10">
        <Link to={`/books/${bookId}`} className="text-slate-400 hover:text-slate-300 text-sm no-underline">
          ← {book.title}
        </Link>

        <div className="mt-8 text-center">
          <div className="text-5xl mb-4">{passedChapters === totalChapters ? '🏆' : '📊'}</div>
          <h1 className="text-2xl font-bold text-white mb-2">预测试完成！</h1>
          <p className="text-slate-300 text-lg mb-6">
            你已经掌握了{' '}
            <span className="text-indigo-400 font-bold">{passedChapters}/{totalChapters}</span>{' '}
            个章节的基础知识
          </p>
        </div>

        <div className="space-y-3 mb-8">
          {preTestItems.map(item => {
            const passed = results[item.chapterId] ?? false
            return (
              <div
                key={item.chapterId}
                className={`flex items-center justify-between p-4 rounded-lg border ${
                  passed
                    ? 'border-green-700/50 bg-green-900/20'
                    : 'border-slate-700 bg-slate-800'
                }`}
              >
                <span className="text-white">{item.chapterTitle}</span>
                {passed ? (
                  <span className="text-xs px-2 py-1 rounded-full bg-green-700/40 text-green-300 font-medium">
                    ✓ 可以跳过
                  </span>
                ) : (
                  <span className="text-xs px-2 py-1 rounded-full bg-slate-700 text-slate-400">
                    建议学习
                  </span>
                )}
              </div>
            )
          })}
        </div>

        <div className="flex justify-center">
          <Link
            to={`/books/${bookId}`}
            className="px-8 py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 transition-colors no-underline font-medium"
          >
            开始学习 →
          </Link>
        </div>
      </div>
    )
  }

  // ── Quiz screen ─────────────────────────────────────────────────────────────
  const item = preTestItems[currentIndex]
  const progressPct = ((currentIndex + 1) / preTestItems.length) * 100

  function handleNext() {
    const updatedResults = answeredThisCard
      ? { ...results }
      : { ...results, [item.chapterId]: false }

    if (!answeredThisCard) {
      setResults(updatedResults)
    }

    if (currentIndex < preTestItems.length - 1) {
      setCurrentIndex(i => i + 1)
      setAnsweredThisCard(false)
    } else {
      savePreTestResult(bookId!, updatedResults)
      setDone(true)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Link to={`/books/${bookId}`} className="text-slate-400 hover:text-slate-300 text-sm no-underline">
          ← {book.title}
        </Link>
        <h1 className="text-lg font-semibold text-white">📝 预测试</h1>
        <span className="text-slate-500 text-sm">
          {currentIndex + 1} / {preTestItems.length}
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-1.5 bg-slate-700 rounded-full mb-6 overflow-hidden">
        <div
          className="h-full bg-indigo-500 rounded-full transition-all duration-300"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      {/* Chapter label */}
      <p className="text-slate-500 text-xs mb-4">
        章节：{item.chapterTitle}
      </p>

      {/* Quiz card — wrapped to detect any answer (correct or wrong) */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
        <AnswerTrackingQuizCard
          key={item.chapterId + currentIndex}
          card={item.card}
          onCorrect={() => {
            setResults(prev => ({ ...prev, [item.chapterId]: true }))
            setAnsweredThisCard(true)
          }}
          onAnswered={() => setAnsweredThisCard(true)}
        />
      </div>

      {/* Next / skip button */}
      <div className="mt-6 flex justify-between">
        <button
          onClick={() => {
            // Skip this question — mark as not passed
            setResults(prev => ({ ...prev, [item.chapterId]: prev[item.chapterId] ?? false }))
            if (currentIndex < preTestItems.length - 1) {
              setCurrentIndex(i => i + 1)
              setAnsweredThisCard(false)
            } else {
              const finalResults = { ...results, [item.chapterId]: results[item.chapterId] ?? false }
              savePreTestResult(bookId!, finalResults)
              setDone(true)
            }
          }}
          className="px-4 py-2 rounded-lg bg-slate-700 text-slate-400 hover:bg-slate-600 hover:text-white transition-colors text-sm cursor-pointer"
        >
          跳过
        </button>

        {answeredThisCard && (
          <button
            onClick={handleNext}
            className="px-6 py-2.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 transition-colors cursor-pointer"
          >
            {currentIndex < preTestItems.length - 1 ? '下一题 →' : '查看结果 →'}
          </button>
        )}
      </div>
    </div>
  )
}

// Wrapper around QuizCardView that also fires onAnswered for wrong answers
function AnswerTrackingQuizCard({
  card,
  onCorrect,
  onAnswered,
}: {
  card: QuizCard
  onCorrect: () => void
  onAnswered: () => void
}) {
  const [intercepted, setIntercepted] = useState(false)

  // We render QuizCardView but intercept clicks via a transparent overlay trick.
  // Actually, QuizCardView only fires onCorrect — for wrong answers we need to
  // wrap differently. We'll re-implement the minimum needed here.

  const [selected, setSelected] = useState<number | null>(null)
  const answered = selected !== null
  const isCorrect = selected === card.correctIndex

  function handleSelect(index: number) {
    if (answered) return
    setSelected(index)
    if (index === card.correctIndex) {
      onCorrect()
    } else {
      if (!intercepted) {
        setIntercepted(true)
        onAnswered()
      }
    }
  }

  // Re-use the same visual as QuizCardView
  return (
    <div>
      <div className="mb-2 text-indigo-400 text-sm font-medium">🧠 小测验</div>
      <p className="text-white mb-6 leading-relaxed">{card.question}</p>
      <div className="space-y-3">
        {card.options.map((option, i) => {
          let style = 'border-slate-600 bg-slate-800 hover:border-slate-400'
          if (answered) {
            if (i === card.correctIndex) style = 'border-green-500 bg-green-900/30'
            else if (i === selected) style = 'border-red-500 bg-red-900/30'
            else style = 'border-slate-700 bg-slate-800/50 opacity-50'
          }
          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              className={`w-full text-left p-4 rounded-lg border transition-all cursor-pointer ${style}`}
            >
              <span className="text-slate-400 mr-3">{String.fromCharCode(65 + i)}.</span>
              <span className="text-white">{option}</span>
            </button>
          )
        })}
      </div>
      {answered && (
        <div
          className={`mt-6 p-4 rounded-lg border ${
            isCorrect ? 'bg-green-900/30 border-green-700/50' : 'bg-red-900/30 border-red-700/50'
          }`}
        >
          <p className={`font-medium mb-1 ${isCorrect ? 'text-green-300' : 'text-red-300'}`}>
            {isCorrect ? '✅ 正确！' : '❌ 不对哦'}
          </p>
          <p className="text-slate-300 text-sm">{card.explanation}</p>
        </div>
      )}
    </div>
  )
}
