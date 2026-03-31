export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface Model {
  id: string;
  name: string;
  provider: string;
}

export const AVAILABLE_MODELS: Model[] = [
  { id: 'deepseek-chat', name: 'DeepSeek Chat', provider: 'DeepSeek' },
  { id: 'deepseek-reasoner', name: 'DeepSeek Reasoner', provider: 'DeepSeek' },
  { id: 'MiniMax-Text-01', name: 'MiniMax Text', provider: 'MiniMax' },
  { id: 'MiniMax-M1', name: 'MiniMax M1', provider: 'MiniMax' },
  { id: 'MiniMax-M2.5', name: 'MiniMax M2.5', provider: 'MiniMax' },
]

const BASE_URL = import.meta.env.VITE_LLM_BASE_URL || 'https://ai.proxy.web3gate.xyz'
const API_KEY = import.meta.env.VITE_LLM_API_KEY || ''

export async function streamChat(
  messages: ChatMessage[],
  model: string,
  onToken: (token: string) => void,
  onDone: () => void,
  onError: (error: string) => void,
  signal?: AbortSignal,
) {
  try {
    const res = await fetch(`${BASE_URL}/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model,
        messages,
        stream: true,
      }),
      signal,
    })

    if (!res.ok) {
      const text = await res.text()
      onError(`API 错误 (${res.status}): ${text}`)
      return
    }

    const reader = res.body?.getReader()
    if (!reader) {
      onError('无法读取响应流')
      return
    }

    const decoder = new TextDecoder()
    let buffer = ''

    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      buffer += decoder.decode(value, { stream: true })
      const lines = buffer.split('\n')
      buffer = lines.pop() || ''

      for (const line of lines) {
        const trimmed = line.trim()
        if (!trimmed || !trimmed.startsWith('data: ')) continue
        const data = trimmed.slice(6)
        if (data === '[DONE]') {
          onDone()
          return
        }
        try {
          const parsed = JSON.parse(data)
          const token = parsed.choices?.[0]?.delta?.content
          if (token) onToken(token)
        } catch {
          // skip malformed chunks
        }
      }
    }
    onDone()
  } catch (err) {
    if ((err as Error).name === 'AbortError') return
    onError(`请求失败: ${(err as Error).message}`)
  }
}
