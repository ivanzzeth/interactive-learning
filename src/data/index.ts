import type { Book } from '../types'
import { rustBook } from './rust'
import { aiMetacognitionBook } from './ai-metacognition'
import { ethereumBook } from './ethereum'
import { ethereumEipsBook } from './ethereum-eips'

export const books: Book[] = [
  aiMetacognitionBook,
  rustBook,
  ethereumBook,
  ethereumEipsBook,
]
