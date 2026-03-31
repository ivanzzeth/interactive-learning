import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { books } from '../data'
import type { QuizCard } from '../types'
import { QuizCardView } from '../components/cards/QuizCard'
import { getDueLessons, markLessonReviewed } from '../lib/progress'

interface ReviewItem {
  lessonPath: string // "bookId/chapterId/lessonId"
  card: QuizCard
}

function pickReviewCards(maxCards = 5): ReviewItem[] {
  const duePaths = getDueLessons()
  if (duePaths.length === 0) return []

  // Shuffle due paths so we don't always pick from the same lessons
  const shuffled = [...duePaths].sort(() => Math.random() - 0.5)

  const items: ReviewItem[] = []

  for (const path of shuffled) {
    if (items.length >= maxCards) break
    const [bookId, chapterId, lessonId] = path.split('/')
    const book = books.find(b => b.id === bookId)
    if (!book) continue
    const chapter = book.chapters.find(c => c.id === chapterId)
    if (!chapter) continue
    const lesson = chapter.lessons.find(l => l.id === lessonId)
    if (!lesson) continue

    const quizCards = lesson.cards.filter((c): c is QuizCard => c.type === 'quiz')
    if (quizCards.length === 0) continue

    // Pick a random quiz card from this lesson
    const card = quizCards[Math.floor(Math.random() * quizCards.length)]
    items.push({ lessonPath: path, card })
  }

  return items
}

export function ReviewPage() {
  const reviewItems = useMemo(() => pickReviewCards(5), [])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answeredCount, setAnsweredCount] = useState(0)
  const [done, setDone] = useState(false)
  const [reviewedPaths, setReviewedPaths] = useState<Set<string>>(new Set())

  if (reviewItems.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-20 text-center">
        <div className="text-6xl mb-6">🎉</div>
        <h1 className="text-2xl font-bold text-white mb-3">暂无需要复习的内容</h1>
        <p className="text-slate-400 mb-8">
          你已经及时完成了所有复习！继续保持，或者去学习新内容吧。
        </p>
        <Link
          to="/books"
          className="px-6 py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 transition-colors no-underline"
        >
          去书架
        </Link>
      </div>
    )
  }

  if (done) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-20 text-center">
        <div className="text-6xl mb-6">✅</div>
        <h1 className="text-2xl font-bold text-white mb-3">复习完成！</h1>
        <p className="text-slate-400 mb-2">
          你回顾了 <span className="text-indigo-400 font-semibold">{reviewItems.length}</span> 张卡片
        </p>
        <p className="text-slate-400 mb-8">
          下次复习将在 24 小时后提醒你。
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            to="/review"
            onClick={() => window.location.reload()}
            className="px-6 py-3 rounded-lg bg-slate-700 text-white hover:bg-slate-600 transition-colors no-underline"
          >
            再来一轮
          </Link>
          <Link
            to="/books"
            className="px-6 py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 transition-colors no-underline"
          >
            回书架
          </Link>
        </div>
      </div>
    )
  }

  const item = reviewItems[currentIndex]
  const progressPct = ((currentIndex + 1) / reviewItems.length) * 100

  function handleAnswered() {
    // Mark this lesson as reviewed (only once per review session)
    if (!reviewedPaths.has(item.lessonPath)) {
      const [bookId, chapterId, lessonId] = item.lessonPath.split('/')
      markLessonReviewed(bookId, chapterId, lessonId)
      setReviewedPaths(prev => new Set(prev).add(item.lessonPath))
    }
    setAnsweredCount(c => c + 1)
  }

  function handleNext() {
    if (currentIndex < reviewItems.length - 1) {
      setCurrentIndex(i => i + 1)
    } else {
      setDone(true)
    }
  }

  // Derive the lesson label for context
  const [bookId, chapterId, lessonId] = item.lessonPath.split('/')
  const book = books.find(b => b.id === bookId)
  const chapter = book?.chapters.find(c => c.id === chapterId)
  const lesson = chapter?.lessons.find(l => l.id === lessonId)

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Link to="/books" className="text-slate-400 hover:text-slate-300 text-sm no-underline">
          ← 书架
        </Link>
        <h1 className="text-lg font-semibold text-white">📖 复习</h1>
        <span className="text-slate-500 text-sm">
          {currentIndex + 1} / {reviewItems.length}
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-1.5 bg-slate-700 rounded-full mb-4 overflow-hidden">
        <div
          className="h-full bg-indigo-500 rounded-full transition-all duration-300"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      {/* Lesson context */}
      {lesson && (
        <p className="text-slate-500 text-xs mb-6">
          来自：{book?.title} › {chapter?.title} › {lesson.title}
        </p>
      )}

      {/* Quiz card */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
        <QuizCardView
          key={item.lessonPath + currentIndex}
          card={item.card}
          onCorrect={handleAnswered}
        />
      </div>

      {/* Next button — only shown after answering (answeredCount tracks it) */}
      {answeredCount > currentIndex && (
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleNext}
            className="px-6 py-2.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 transition-colors cursor-pointer"
          >
            {currentIndex < reviewItems.length - 1 ? '下一题 →' : '完成复习 ✓'}
          </button>
        </div>
      )}
    </div>
  )
}
