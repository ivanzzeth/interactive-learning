import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import { BooksPage } from './pages/BooksPage'
import { BookReader } from './pages/BookReader'
import { ReviewPage } from './pages/ReviewPage'
import { PreTestPage } from './pages/PreTestPage'
import { DashboardPage } from './pages/DashboardPage'
import { PlaygroundPage } from './pages/PlaygroundPage'
import { Layout } from './components/Layout'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/books" replace />} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="/review" element={<ReviewPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/playground" element={<PlaygroundPage />} />
          <Route path="/books/:bookId/pretest" element={<PreTestPage />} />
          <Route path="/books/:bookId" element={<BookReader />} />
          <Route path="/books/:bookId/:chapterId" element={<BookReader />} />
          <Route path="/books/:bookId/:chapterId/:lessonId" element={<BookReader />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
