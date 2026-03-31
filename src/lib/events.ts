// Simple event bus for cross-component communication
type Listener = (data: string) => void
const listeners: Record<string, Listener[]> = {}

export function on(event: string, fn: Listener) {
  if (!listeners[event]) listeners[event] = []
  listeners[event].push(fn)
  return () => {
    listeners[event] = listeners[event].filter(f => f !== fn)
  }
}

export function emit(event: string, data: string) {
  listeners[event]?.forEach(fn => fn(data))
}
