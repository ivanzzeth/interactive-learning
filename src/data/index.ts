import type { Book } from '../types'
import { rustBook } from './rust'
import { aiMetacognitionBook } from './ai-metacognition'
import { ethereumBook } from './ethereum'
import { ethereumEipsBook } from './ethereum-eips'
import { claudeCodeBook } from './claude-code'

export const books: Book[] = [
  claudeCodeBook,
  aiMetacognitionBook,
  rustBook,
  ethereumBook,
  ethereumEipsBook,
]
