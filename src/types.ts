export interface Book {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  chapters: Chapter[];
}

export interface Chapter {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  cards: Card[];
}

export type Card =
  | ExplainCard
  | CodeCard
  | QuizCard
  | AiPromptCard
  | FillBlankCard
  | DiagramCard
  | ThinkFirstCard
  | TaskCard;

export interface ExplainCard {
  type: 'explain';
  title: string;
  content: string;
  analogy?: string;
}

export interface CodeCard {
  type: 'code';
  title: string;
  description: string;
  code: string;
  language: string;
  runnable?: boolean;
}

export interface QuizCard {
  type: 'quiz';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface AiPromptCard {
  type: 'ai-prompt';
  title: string;
  scenario: string;
  prompt: string;
  explanation: string;
}

export interface FillBlankCard {
  type: 'fill-blank';
  title: string;
  description: string;
  template: string;       // code with ___BLANK___ placeholders
  blanks: string[];       // correct answers for each blank
  language: string;
  hints?: string[];       // optional hints per blank
}

export interface DiagramCard {
  type: 'diagram';
  title: string;
  description: string;
  svg: string;            // inline SVG string
}

export interface ThinkFirstCard {
  type: 'think-first';
  question: string;      // question to think about
  hints?: string;        // optional hint
  reveal: string;        // the answer revealed after user writes
}

export interface TaskCard {
  type: 'task';
  title: string;
  instruction: string;    // what the user should go do (markdown)
  checklist: string[];    // steps to complete
  tip?: string;           // optional tip
}
