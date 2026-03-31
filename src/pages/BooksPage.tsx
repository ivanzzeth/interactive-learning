import { Link } from 'react-router-dom'
import { books } from '../data'
import { getBookProgress, getLastVisited } from '../lib/progress'

export function BooksPage() {
  const lastVisited = getLastVisited()

  // Parse path "bookId/chapterId/lessonId" into display labels
  let lastBookName = ''
  let lastLessonName = ''
  if (lastVisited) {
    const [bookId, , lessonId] = lastVisited.split('/')
    const book = books.find(b => b.id === bookId)
    if (book) {
      lastBookName = book.title
      const lesson = book.chapters.flatMap(ch => ch.lessons).find(l => l.id === lessonId)
      if (lesson) lastLessonName = lesson.title
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-2">选择一本书开始学习</h1>
      <p className="text-slate-400 mb-10">每本书都是交互式的微课，点点点就能掌握核心概念</p>

      {lastVisited && (
        <Link
          to={`/books/${lastVisited}`}
          className="block w-full mb-10 rounded-xl border border-indigo-500 bg-indigo-900/40 p-6 no-underline hover:bg-indigo-900/60 hover:border-indigo-400 transition-all"
        >
          <div className="flex items-center gap-3 mb-1">
            <span className="text-2xl">📖</span>
            <span className="text-lg font-semibold text-indigo-200">继续上次的学习</span>
          </div>
          <div className="text-sm text-indigo-300 mt-1">
            {lastBookName && <span className="font-medium">{lastBookName}</span>}
            {lastBookName && lastLessonName && <span className="mx-2 text-indigo-500">·</span>}
            {lastLessonName && <span>{lastLessonName}</span>}
            {!lastBookName && !lastLessonName && <span className="text-indigo-400">{lastVisited}</span>}
          </div>
        </Link>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <Link
            key={book.id}
            to={`/books/${book.id}`}
            className="group block rounded-xl border border-slate-700 bg-slate-800 p-6 no-underline hover:border-slate-500 hover:bg-slate-750 transition-all"
          >
            <div className="text-5xl mb-4">{book.icon}</div>
            <h2 className="text-xl font-semibold text-white mb-2 group-hover:text-indigo-400 transition-colors">
              {book.title}
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">{book.description}</p>
            <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
              <span>{book.chapters.length} 章</span>
              <span>·</span>
              <span>{book.chapters.reduce((acc, ch) => acc + ch.lessons.length, 0)} 课</span>
            </div>
            {(() => {
              const total = book.chapters.reduce((acc, ch) => acc + ch.lessons.length, 0)
              const pct = getBookProgress(book.id, total)
              return (
                <div className="mt-3 h-1.5 rounded-full bg-slate-700 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${pct}%`, background: pct > 0 ? book.color : 'transparent' }}
                  />
                </div>
              )
            })()}
          </Link>
        ))}
      </div>

      {books.length === 0 && (
        <div className="text-center text-slate-500 py-20">
          暂时还没有书籍，敬请期待 🚀
        </div>
      )}
    </div>
  )
}
