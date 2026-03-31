import { Link } from 'react-router-dom'
import { books } from '../data'
import {
  getAllBookmarks,
  getStreak,
  getJournalEntries,
  type JournalEntry,
} from '../lib/progress'

function getTotalCompleted(): number {
  try {
    const raw = localStorage.getItem('il-progress')
    if (raw) {
      const parsed = JSON.parse(raw)
      return Object.values(parsed.completedLessons as Record<string, boolean>).filter(Boolean).length
    }
  } catch { /* ignore */ }
  return 0
}

function StatCard({ label, value, icon }: { label: string; value: string | number; icon: string }) {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 flex flex-col gap-1">
      <div className="text-2xl">{icon}</div>
      <div className="text-3xl font-bold text-white">{value}</div>
      <div className="text-slate-400 text-sm">{label}</div>
    </div>
  )
}

function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

// Given a bookmark key like "bookId/chapterId/lessonId/cardIndex",
// try to build a human-readable label.
function resolveBookmarkLabel(key: string, note: string): string {
  const parts = key.split('/')
  if (parts.length < 4) return note
  const [bookId, chapterId, lessonId, cardIndexStr] = parts
  const book = books.find(b => b.id === bookId)
  if (!book) return note
  const chapter = book.chapters.find(c => c.id === chapterId)
  if (!chapter) return note
  const lesson = chapter.lessons.find(l => l.id === lessonId)
  if (!lesson) return note
  const cardIndex = parseInt(cardIndexStr, 10)
  const card = lesson.cards[cardIndex]
  let cardTitle = '未知卡片'
  if (card) {
    if ('title' in card) cardTitle = (card as { title: string }).title
    else if (card.type === 'quiz') cardTitle = card.question.slice(0, 40)
  }
  return `${book.title} · ${lesson.title} · ${cardTitle}`
}

export function DashboardPage() {
  const totalCompleted = getTotalCompleted()
  const bookmarks = getAllBookmarks()
  const totalBookmarks = Object.keys(bookmarks).length
  const streak = getStreak()
  const journalEntries: JournalEntry[] = (() => {
    try { return getJournalEntries() ?? [] } catch { return [] }
  })()

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      {/* Title */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">📊 学习仪表盘</h1>
        <p className="text-slate-400 mt-2">你的学习概览</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        <StatCard icon="📚" label="已完成课时" value={totalCompleted} />
        <StatCard icon="⭐" label="收藏卡片" value={totalBookmarks} />
        <StatCard icon="🔥" label="连续学习天数" value={streak} />
        <StatCard icon="📔" label="笔记条目" value={journalEntries.length} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent journal entries */}
        <section>
          <h2 className="text-lg font-semibold text-white mb-4">📔 最近笔记</h2>
          {journalEntries.length === 0 ? (
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 text-center text-slate-500">
              暂无笔记。在学习时记录你的想法吧！
            </div>
          ) : (
            <div className="space-y-3">
              {[...journalEntries]
                .sort((a, b) => b.timestamp - a.timestamp)
                .slice(0, 5)
                .map((entry, i) => (
                  <div
                    key={i}
                    className="bg-slate-800 border border-slate-700 rounded-xl p-4"
                  >
                    <p className="text-white text-sm leading-relaxed">{entry.note}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-slate-600 text-xs">{formatDate(entry.timestamp)}</span>
                      {entry.path && (
                        <Link
                          to={`/books/${entry.path}`}
                          className="text-indigo-400 text-xs hover:text-indigo-300 no-underline"
                        >
                          查看课时 →
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          )}
        </section>

        {/* Bookmarks */}
        <section>
          <h2 className="text-lg font-semibold text-white mb-4">⭐ 收藏的卡片</h2>
          {totalBookmarks === 0 ? (
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 text-center text-slate-500">
              还没有收藏。在学习时点击 ☆ 收藏你觉得重要的卡片！
            </div>
          ) : (
            <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1">
              {Object.entries(bookmarks).map(([key, note]) => {
                const parts = key.split('/')
                const [bookId, chapterId, lessonId] = parts
                const lessonPath = [bookId, chapterId, lessonId].join('/')
                const label = resolveBookmarkLabel(key, note)

                return (
                  <Link
                    key={key}
                    to={`/books/${lessonPath}`}
                    className="block bg-slate-800 border border-slate-700 rounded-xl p-4 no-underline hover:border-indigo-500 transition-colors"
                  >
                    <p className="text-white text-sm leading-snug line-clamp-2">{label}</p>
                    <p className="text-slate-500 text-xs mt-1 truncate">{note}</p>
                  </Link>
                )
              })}
            </div>
          )}
        </section>
      </div>

      {/* Quick nav */}
      <div className="mt-10 pt-6 border-t border-slate-700 flex flex-wrap gap-3">
        <Link
          to="/books"
          className="px-4 py-2 rounded-lg bg-slate-700 text-white text-sm hover:bg-slate-600 transition-colors no-underline"
        >
          📚 书架
        </Link>
        <Link
          to="/review"
          className="px-4 py-2 rounded-lg bg-slate-700 text-white text-sm hover:bg-slate-600 transition-colors no-underline"
        >
          📖 复习
        </Link>
      </div>
    </div>
  )
}
