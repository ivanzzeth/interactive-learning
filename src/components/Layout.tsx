import { Outlet, Link } from 'react-router-dom'
import { AiChatDrawer } from './AiChatDrawer'

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="border-b border-slate-700 px-6 py-4 flex items-center gap-4 flex-wrap">
        <Link to="/books" className="text-xl font-bold text-indigo-400 hover:text-indigo-300 no-underline">
          📚 Interactive Learning
        </Link>
        <span className="text-slate-500 text-sm hidden sm:inline">点点点，轻松学</span>
        <div className="ml-auto flex items-center gap-3">
          <Link
            to="/review"
            className="text-sm text-slate-300 hover:text-white no-underline px-3 py-1.5 rounded-lg hover:bg-slate-700 transition-colors"
          >
            📖 复习
          </Link>
          <Link
            to="/playground"
            className="text-sm text-slate-300 hover:text-white no-underline px-3 py-1.5 rounded-lg hover:bg-slate-700 transition-colors"
          >
            🧪 实验场
          </Link>
          <Link
            to="/dashboard"
            className="text-sm text-slate-300 hover:text-white no-underline px-3 py-1.5 rounded-lg hover:bg-slate-700 transition-colors"
          >
            📊 仪表盘
          </Link>
        </div>
      </nav>
      <main className="flex-1">
        <Outlet />
      </main>
      <AiChatDrawer />
    </div>
  )
}
