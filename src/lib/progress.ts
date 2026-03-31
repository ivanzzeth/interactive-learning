const STORAGE_KEY = 'il-progress'
const JOURNAL_KEY = 'il-journal'

export interface Progress {
  completedLessons: Record<string, boolean>  // "bookId/chapterId/lessonId" -> true
  bookmarks: Record<string, string>          // "bookId/chapterId/lessonId/cardIndex" -> note
  lastVisited?: string                       // "bookId/chapterId/lessonId"
  completedTimestamps: Record<string, number> // "bookId/chapterId/lessonId" -> timestamp ms
  reviewTimestamps: Record<string, number>   // "bookId/chapterId/lessonId" -> timestamp ms
  preTestResults: Record<string, Record<string, boolean>> // bookId -> chapterId -> passed
}

function load(): Progress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      // Ensure new fields exist for backward compat
      if (!parsed.completedTimestamps) parsed.completedTimestamps = {}
      if (!parsed.reviewTimestamps) parsed.reviewTimestamps = {}
      if (!parsed.preTestResults) parsed.preTestResults = {}
      return parsed
    }
  } catch { /* ignore */ }
  return {
    completedLessons: {},
    bookmarks: {},
    completedTimestamps: {},
    reviewTimestamps: {},
    preTestResults: {},
  }
}

function save(progress: Progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
}

export function markLessonComplete(bookId: string, chapterId: string, lessonId: string) {
  const p = load()
  const key = `${bookId}/${chapterId}/${lessonId}`
  p.completedLessons[key] = true
  // Only record timestamp on first completion
  if (!p.completedTimestamps[key]) {
    p.completedTimestamps[key] = Date.now()
  }
  save(p)
}

export function isLessonComplete(bookId: string, chapterId: string, lessonId: string): boolean {
  return load().completedLessons[`${bookId}/${chapterId}/${lessonId}`] === true
}

export function getBookProgress(bookId: string, totalLessons: number): number {
  const p = load()
  const completed = Object.keys(p.completedLessons).filter(k => k.startsWith(`${bookId}/`)).length
  return totalLessons > 0 ? Math.round((completed / totalLessons) * 100) : 0
}

export function setLastVisited(path: string) {
  const p = load()
  p.lastVisited = path
  save(p)
}

export function getLastVisited(): string | undefined {
  return load().lastVisited
}

export function toggleBookmark(key: string, note: string) {
  const p = load()
  if (p.bookmarks[key]) {
    delete p.bookmarks[key]
  } else {
    p.bookmarks[key] = note || '📌'
  }
  save(p)
}

export function isBookmarked(key: string): boolean {
  return !!load().bookmarks[key]
}

export function getBookmarkNote(key: string): string {
  return load().bookmarks[key] || ''
}

export function getAllBookmarks(): Record<string, string> {
  return load().bookmarks
}

// ─── Spaced Repetition ───────────────────────────────────────────────────────

const REVIEW_INTERVAL_MS = 24 * 60 * 60 * 1000 // 24 hours

export function markLessonReviewed(bookId: string, chapterId: string, lessonId: string) {
  const p = load()
  p.reviewTimestamps[`${bookId}/${chapterId}/${lessonId}`] = Date.now()
  save(p)
}

/**
 * Returns lesson paths ("bookId/chapterId/lessonId") where the lesson is
 * completed but last review was > 24h ago (or never reviewed).
 */
export function getDueLessons(): string[] {
  const p = load()
  const now = Date.now()
  return Object.keys(p.completedLessons).filter(key => {
    if (!p.completedLessons[key]) return false
    const lastReview = p.reviewTimestamps[key]
    if (!lastReview) {
      // Never reviewed — only due if completed > 24h ago
      const completedAt = p.completedTimestamps[key]
      if (!completedAt) return true
      return now - completedAt > REVIEW_INTERVAL_MS
    }
    return now - lastReview > REVIEW_INTERVAL_MS
  })
}

// ─── Pre-Assessment ──────────────────────────────────────────────────────────

export function savePreTestResult(bookId: string, chapterResults: Record<string, boolean>) {
  const p = load()
  p.preTestResults[bookId] = chapterResults
  save(p)
}

export function getPreTestResult(bookId: string): Record<string, boolean> | null {
  return load().preTestResults[bookId] ?? null
}

export function canSkipChapter(bookId: string, chapterId: string): boolean {
  const result = getPreTestResult(bookId)
  return result ? result[chapterId] === true : false
}

// ─── Dashboard / Activity ─────────────────────────────────────────────────────

/**
 * Returns unique dates (YYYY-MM-DD) when the user completed lessons.
 */
export function getActivityDates(): string[] {
  const p = load()
  const dates = new Set<string>()
  for (const ts of Object.values(p.completedTimestamps)) {
    const d = new Date(ts)
    const iso = d.toISOString().slice(0, 10)
    dates.add(iso)
  }
  return Array.from(dates).sort()
}

/**
 * Returns consecutive days of activity ending today (streak).
 */
export function getStreak(): number {
  const dates = new Set(getActivityDates())
  if (dates.size === 0) return 0

  let streak = 0
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  for (let i = 0; ; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() - i)
    const iso = d.toISOString().slice(0, 10)
    if (dates.has(iso)) {
      streak++
    } else {
      break
    }
  }
  return streak
}

// ─── Learning Journal ─────────────────────────────────────────────────────────

export interface JournalEntry {
  path: string;       // bookId/chapterId/lessonId
  note: string;
  timestamp: number;
}

function loadJournal(): JournalEntry[] {
  try {
    const raw = localStorage.getItem(JOURNAL_KEY)
    if (raw) return JSON.parse(raw)
  } catch { /* ignore */ }
  return []
}

function saveJournal(entries: JournalEntry[]) {
  localStorage.setItem(JOURNAL_KEY, JSON.stringify(entries))
}

export function addJournalEntry(path: string, note: string) {
  const entries = loadJournal()
  entries.push({ path, note, timestamp: Date.now() })
  saveJournal(entries)
}

export function getJournalEntries(): JournalEntry[] {
  return loadJournal()
}
