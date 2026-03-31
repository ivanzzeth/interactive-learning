import { useState, useEffect, useRef, useCallback } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { books } from '../data'
import type { Card } from '../types'
import { ExplainCardView } from '../components/cards/ExplainCard'
import { CodeCardView } from '../components/cards/CodeCard'
import { QuizCardView } from '../components/cards/QuizCard'
import { AiPromptCardView } from '../components/cards/AiPromptCard'
import { FillBlankCardView } from '../components/cards/FillBlankCard'
import { DiagramCardView } from '../components/cards/DiagramCard'
import { ThinkFirstCardView } from '../components/cards/ThinkFirstCard'
import { TaskCardView } from '../components/cards/TaskCard'
import {
  markLessonComplete,
  isLessonComplete,
  getBookProgress,
  setLastVisited,
  toggleBookmark,
  isBookmarked,
  addJournalEntry,
  canSkipChapter,
  getPreTestResult,
} from '../lib/progress'

export function BookReader() {
  const { bookId, chapterId, lessonId } = useParams()
  const book = books.find((b) => b.id === bookId)

  useEffect(() => {
    if (bookId && chapterId && lessonId) {
      setLastVisited(`${bookId}/${chapterId}/${lessonId}`)
    }
  }, [bookId, chapterId, lessonId])

  if (!book) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-400 text-lg">找不到这本书</p>
        <Link to="/books" className="text-indigo-400 mt-4 inline-block">← 回到书架</Link>
      </div>
    )
  }

  if (!chapterId) return <BookOverview book={book} />

  const chapter = book.chapters.find((c) => c.id === chapterId)
  if (!chapter) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-400">找不到这个章节</p>
        <Link to={`/books/${bookId}`} className="text-indigo-400 mt-4 inline-block">← 回到目录</Link>
      </div>
    )
  }

  if (!lessonId) return <ChapterOverview book={book} chapter={chapter} />

  const lesson = chapter.lessons.find((l) => l.id === lessonId)
  if (!lesson) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-400">找不到这个课时</p>
        <Link to={`/books/${bookId}/${chapterId}`} className="text-indigo-400 mt-4 inline-block">← 回到章节</Link>
      </div>
    )
  }

  return <LessonView bookId={book.id} chapterId={chapter.id} lesson={lesson} cards={lesson.cards} />
}

function BookOverview({ book }: { book: typeof books[0] }) {
  const totalLessons = book.chapters.reduce((acc, ch) => acc + ch.lessons.length, 0)
  const progress = getBookProgress(book.id, totalLessons)
  const hasPreTest = getPreTestResult(book.id) !== null
  const noProgress = progress === 0

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <Link to="/books" className="text-slate-400 hover:text-slate-300 text-sm no-underline">← 书架</Link>
      <div className="mt-6 mb-8">
        <span className="text-6xl">{book.icon}</span>
        <h1 className="text-3xl font-bold mt-4">{book.title}</h1>
        <p className="text-slate-400 mt-2">{book.description}</p>
        {totalLessons > 0 && (
          <div className="mt-4 flex items-center gap-3">
            <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 rounded-full transition-all" style={{ width: `${progress}%` }} />
            </div>
            <span className="text-slate-400 text-sm">{progress}%</span>
          </div>
        )}

        {/* Pre-test CTA: show when no progress and no prior pretest */}
        {noProgress && !hasPreTest && totalLessons > 0 && (
          <div className="mt-5 p-4 rounded-lg bg-indigo-900/30 border border-indigo-700/50 flex items-center justify-between gap-4">
            <div>
              <p className="text-indigo-300 font-medium text-sm">先做个小测试？</p>
              <p className="text-slate-400 text-xs mt-0.5">了解你的基础，跳过已掌握的章节</p>
            </div>
            <Link
              to={`/books/${book.id}/pretest`}
              className="shrink-0 px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm hover:bg-indigo-500 transition-colors no-underline"
            >
              开始测试
            </Link>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {book.chapters.map((chapter, i) => {
          const allDone = chapter.lessons.length > 0 && chapter.lessons.every(l =>
            isLessonComplete(book.id, chapter.id, l.id)
          )
          const skipable = canSkipChapter(book.id, chapter.id)

          return (
            <Link
              key={chapter.id}
              to={`/books/${book.id}/${chapter.id}`}
              className="block rounded-lg border border-slate-700 bg-slate-800 p-5 no-underline hover:border-indigo-500 transition-colors"
            >
              <div className="flex items-center gap-4">
                <span className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-bold shrink-0">
                  {i + 1}
                </span>
                <div className="flex-1">
                  <h3 className="text-white font-medium">{chapter.title}</h3>
                  <p className="text-slate-500 text-sm mt-1">{chapter.lessons.length} 课时</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {skipable && !allDone && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-amber-700/30 text-amber-300 border border-amber-700/40">
                      可以跳过
                    </span>
                  )}
                  {allDone && <span className="text-green-400 text-sm">✓</span>}
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

function ChapterOverview({ book, chapter }: { book: typeof books[0]; chapter: typeof books[0]['chapters'][0] }) {
  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <Link to={`/books/${book.id}`} className="text-slate-400 hover:text-slate-300 text-sm no-underline">← {book.title}</Link>
      <h1 className="text-2xl font-bold mt-6 mb-6">{chapter.title}</h1>

      <div className="space-y-3">
        {chapter.lessons.map((lesson, i) => {
          const completed = isLessonComplete(book.id, chapter.id, lesson.id)
          return (
            <Link
              key={lesson.id}
              to={`/books/${book.id}/${chapter.id}/${lesson.id}`}
              className="block rounded-lg border border-slate-700 bg-slate-800 p-4 no-underline hover:border-indigo-500 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className={`text-sm w-6 ${completed ? 'text-green-400' : 'text-slate-500'}`}>
                  {completed ? '✓' : `${i + 1}.`}
                </span>
                <span className="text-white">{lesson.title}</span>
                <span className="text-slate-600 text-sm ml-auto">{lesson.cards.length} 张卡片</span>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

function LessonView({
  bookId,
  chapterId,
  lesson,
  cards,
}: {
  bookId: string
  chapterId: string
  lesson: { id: string; title: string }
  cards: Card[]
}) {
  const navigate = useNavigate()
  const [currentCard, setCurrentCard] = useState(0)
  const [direction, setDirection] = useState<'left' | 'right' | null>(null)
  const [animating, setAnimating] = useState(false)
  const [showJournal, setShowJournal] = useState(false)
  const [journalNote, setJournalNote] = useState('')
  const touchStartX = useRef(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const card = cards[currentCard]
  const progress = ((currentCard + 1) / cards.length) * 100
  const bmKey = `${bookId}/${chapterId}/${lesson.id}/${currentCard}`
  const [bookmarkedState, setBookmarkedState] = useState(isBookmarked(bmKey))

  useEffect(() => {
    setBookmarkedState(isBookmarked(bmKey))
  }, [bmKey])

  const goNext = useCallback(() => {
    if (currentCard < cards.length - 1 && !animating) {
      setDirection('left')
      setAnimating(true)
      setTimeout(() => {
        setCurrentCard((c) => c + 1)
        setDirection(null)
        setAnimating(false)
      }, 200)
    }
  }, [currentCard, cards.length, animating])

  const goPrev = useCallback(() => {
    if (currentCard > 0 && !animating) {
      setDirection('right')
      setAnimating(true)
      setTimeout(() => {
        setCurrentCard((c) => c - 1)
        setDirection(null)
        setAnimating(false)
      }, 200)
    }
  }, [currentCard, animating])

  // Keyboard navigation
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); goNext() }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); goPrev() }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [goNext, goPrev])

  // Touch / swipe gestures
  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX
  }
  function handleTouchEnd(e: React.TouchEvent) {
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 60) {
      if (diff > 0) goNext()
      else goPrev()
    }
  }

  function handleCompleteClick() {
    markLessonComplete(bookId, chapterId, lesson.id)
    setShowJournal(true)
  }

  function handleJournalSave() {
    const note = journalNote.trim()
    if (note) {
      addJournalEntry(`${bookId}/${chapterId}/${lesson.id}`, note)
    }
    navigate(`/books/${bookId}/${chapterId}`)
  }

  function handleJournalSkip() {
    navigate(`/books/${bookId}/${chapterId}`)
  }

  function handleBookmark() {
    toggleBookmark(bmKey, `${lesson.title} - 卡片 ${currentCard + 1}`)
    setBookmarkedState(!bookmarkedState)
  }

  // Animation class
  const animClass = direction === 'left'
    ? 'translate-x-[-20px] opacity-0'
    : direction === 'right'
      ? 'translate-x-[20px] opacity-0'
      : 'translate-x-0 opacity-100'

  return (
    <div
      className="max-w-2xl mx-auto px-6 py-8"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      ref={containerRef}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Link
          to={`/books/${bookId}/${chapterId}`}
          className="text-slate-400 hover:text-slate-300 text-sm no-underline"
        >
          ← 返回
        </Link>
        <span className="text-slate-500 text-sm truncate mx-4">{lesson.title}</span>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleBookmark}
            className="text-sm cursor-pointer hover:scale-110 transition-transform"
            title={bookmarkedState ? '取消收藏' : '收藏此卡片'}
          >
            {bookmarkedState ? '⭐' : '☆'}
          </button>
          <span className="text-slate-500 text-sm">
            {currentCard + 1}/{cards.length}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full h-1.5 bg-slate-700 rounded-full mb-8 overflow-hidden">
        <div
          className="h-full bg-indigo-500 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Card with animation */}
      <div className={`min-h-[400px] flex flex-col transition-all duration-200 ${animClass}`}>
        <div className="flex-1">
          {card.type === 'explain' && <ExplainCardView card={card} />}
          {card.type === 'code' && <CodeCardView card={card} />}
          {card.type === 'ai-prompt' && <AiPromptCardView card={card} />}
          {card.type === 'diagram' && <DiagramCardView card={card} />}
          {card.type === 'think-first' && <ThinkFirstCardView card={card} />}
          {card.type === 'task' && <TaskCardView card={card} />}
          {card.type === 'fill-blank' && (
            <FillBlankCardView card={card} onCorrect={goNext} />
          )}
          {card.type === 'quiz' && (
            <QuizCardView
              card={card}
              onCorrect={() => {
                if (currentCard < cards.length - 1) {
                  setTimeout(goNext, 800)
                }
              }}
            />
          )}
        </div>

        {/* Journal prompt (shown after completing the lesson) */}
        {showJournal && (
          <div className="mt-6 p-4 rounded-lg bg-emerald-900/20 border border-emerald-700/40">
            <p className="text-emerald-300 text-sm font-medium mb-3">
              📝 今天学到了什么？写一句话记录（可跳过）
            </p>
            <textarea
              value={journalNote}
              onChange={(e) => setJournalNote(e.target.value)}
              placeholder="用一句话总结这节课..."
              rows={2}
              className="w-full bg-slate-800 text-white rounded-lg px-3 py-2 text-sm border border-slate-600 outline-none focus:border-emerald-500 resize-none transition-colors"
            />
            <div className="flex gap-2 mt-2">
              <button
                onClick={handleJournalSave}
                className="px-4 py-1.5 rounded-lg bg-emerald-600 text-white text-sm hover:bg-emerald-500 transition-colors cursor-pointer"
              >
                保存
              </button>
              <button
                onClick={handleJournalSkip}
                className="px-4 py-1.5 rounded-lg bg-slate-700 text-slate-300 text-sm hover:bg-slate-600 transition-colors cursor-pointer"
              >
                跳过
              </button>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-8 pt-6 border-t border-slate-700">
          <button
            onClick={goPrev}
            disabled={currentCard === 0}
            className="px-5 py-2.5 rounded-lg bg-slate-700 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-600 transition-colors cursor-pointer"
          >
            ← 上一张
          </button>

          {currentCard < cards.length - 1 ? (
            <button
              onClick={goNext}
              className="px-5 py-2.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 transition-colors cursor-pointer"
            >
              下一张 →
            </button>
          ) : !showJournal ? (
            <button
              onClick={handleCompleteClick}
              className="px-5 py-2.5 rounded-lg bg-green-600 text-white hover:bg-green-500 transition-colors cursor-pointer"
            >
              ✓ 完成本课
            </button>
          ) : null}
        </div>

        {/* Keyboard hint */}
        <p className="text-center text-slate-600 text-xs mt-4">
          ← → 键翻页 · 左右滑动翻页 · ☆ 收藏卡片
        </p>
      </div>
    </div>
  )
}
