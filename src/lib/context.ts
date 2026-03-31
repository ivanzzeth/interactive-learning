import { books } from '../data'
import { templates } from './templates'

export interface LearningContext {
  bookId?: string;
  chapterId?: string;
  lessonId?: string;
  socratic?: boolean;
  templateId?: string;
}

export function buildSystemPrompt(ctx: LearningContext): string {
  const parts: string[] = []

  // If a thinking template is active, prepend its system prompt
  if (ctx.templateId) {
    const template = templates.find(t => t.id === ctx.templateId)
    if (template) {
      parts.push(template.systemPrompt)
      parts.push('---')
    }
  }

  parts.push(
    '你是一个友好的学习助手。用简单易懂的中文回答问题。',
    '你的目标是帮助用户理解他们正在学习的内容。',
    '回答要简洁，必要时用类比和例子。',
    '如果用户问的是代码相关问题，给出可运行的代码示例。',
  )

  if (ctx.socratic) {
    parts.push('你现在处于苏格拉底模式。不要直接给出答案。通过一系列递进的问题引导用户自己思考出答案。每次只问一个问题。如果用户的回答有误，温和地引导他们重新思考，而不是纠正。')
  }

  if (!ctx.bookId) {
    parts.push('用户当前在浏览书架，尚未进入任何书籍。你可以帮助用户选择学习方向，或回答任何学习相关的问题。')
    return parts.join('\n')
  }

  const book = books.find(b => b.id === ctx.bookId)
  if (!book) return parts.join('\n')

  parts.push(`用户当前在学习《${book.title}》。`)

  if (ctx.chapterId) {
    const chapter = book.chapters.find(c => c.id === ctx.chapterId)
    if (chapter) {
      parts.push(`当前章节：${chapter.title}`)

      if (ctx.lessonId) {
        const lesson = chapter.lessons.find(l => l.id === ctx.lessonId)
        if (lesson) {
          parts.push(`当前课时：${lesson.title}`)

          // Collect taught concepts from cards up to this point
          const concepts: string[] = []
          for (const card of lesson.cards) {
            if (card.type === 'explain') concepts.push(card.title)
            if (card.type === 'code') concepts.push(card.title)
          }
          if (concepts.length > 0) {
            parts.push(`本课涉及的知识点：${concepts.join('、')}`)
          }
        }
      }

      // List previously completed chapters for context
      const chapterIdx = book.chapters.indexOf(chapter)
      if (chapterIdx > 0) {
        const prev = book.chapters.slice(0, chapterIdx).map(c => c.title)
        parts.push(`用户已学过的章节：${prev.join('、')}`)
      }
    }
  }

  parts.push('请根据用户当前的学习进度来调整回答的深度。不要使用用户还没学到的概念，除非用户主动问起。')

  return parts.join('\n')
}
