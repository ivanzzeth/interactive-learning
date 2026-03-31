import type { Book } from '../types'

// =============================================
// SVG Diagrams
// =============================================

const queryLoopSvg = `
<svg viewBox="0 0 520 320" xmlns="http://www.w3.org/2000/svg" style="max-width:520px;width:100%">
  <style>
    @keyframes fadeIn { from{opacity:0} to{opacity:1} }
    .s1{animation:fadeIn .5s ease .3s both}
    .s2{animation:fadeIn .5s ease .8s both}
    .s3{animation:fadeIn .5s ease 1.3s both}
    .s4{animation:fadeIn .5s ease 1.8s both}
    .s5{animation:fadeIn .5s ease 2.3s both}
    .s6{animation:fadeIn .5s ease 2.8s both}
  </style>
  <g class="s1">
    <rect x="10" y="10" width="120" height="40" rx="8" fill="#6366f1"/>
    <text x="70" y="35" text-anchor="middle" font-family="sans-serif" font-size="13" fill="white">用户输入</text>
  </g>
  <g class="s2">
    <line x1="130" y1="30" x2="170" y2="30" stroke="#94a3b8" stroke-width="2" marker-end="url(#arrow)"/>
    <rect x="170" y="10" width="140" height="40" rx="8" fill="#0ea5e9"/>
    <text x="240" y="35" text-anchor="middle" font-family="sans-serif" font-size="13" fill="white">System Prompt</text>
  </g>
  <g class="s3">
    <line x1="310" y1="30" x2="350" y2="30" stroke="#94a3b8" stroke-width="2" marker-end="url(#arrow)"/>
    <rect x="350" y="10" width="140" height="40" rx="8" fill="#f59e0b"/>
    <text x="420" y="35" text-anchor="middle" font-family="sans-serif" font-size="13" fill="white">API 流式调用</text>
  </g>
  <g class="s4">
    <line x1="420" y1="50" x2="420" y2="90" stroke="#94a3b8" stroke-width="2" marker-end="url(#arrow)"/>
    <rect x="350" y="90" width="140" height="40" rx="8" fill="#ef4444"/>
    <text x="420" y="115" text-anchor="middle" font-family="sans-serif" font-size="13" fill="white">Tool 提取</text>
  </g>
  <g class="s5">
    <line x1="350" y1="110" x2="170" y2="110" stroke="#94a3b8" stroke-width="2" marker-end="url(#arrow)"/>
    <rect x="30" y="90" width="140" height="40" rx="8" fill="#10b981"/>
    <text x="100" y="115" text-anchor="middle" font-family="sans-serif" font-size="13" fill="white">工具执行</text>
  </g>
  <g class="s6">
    <line x1="100" y1="130" x2="100" y2="170" stroke="#94a3b8" stroke-width="2"/>
    <line x1="100" y1="170" x2="420" y2="170" stroke="#94a3b8" stroke-width="2"/>
    <line x1="420" y1="170" x2="420" y2="50" stroke="#94a3b8" stroke-width="2" stroke-dasharray="6,3" marker-end="url(#arrow)"/>
    <text x="260" y="190" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#94a3b8">结果回传，循环直到 Stop</text>
  </g>
  <defs><marker id="arrow" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8"/></marker></defs>
</svg>`

const toolOrchestrationSvg = `
<svg viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg" style="max-width:500px;width:100%">
  <style>
    @keyframes fadeIn { from{opacity:0} to{opacity:1} }
    .s1{animation:fadeIn .4s ease .2s both}
    .s2{animation:fadeIn .4s ease .7s both}
    .s3{animation:fadeIn .4s ease 1.2s both}
    .s4{animation:fadeIn .4s ease 1.7s both}
    .s5{animation:fadeIn .4s ease 2.2s both}
  </style>
  <g class="s1">
    <text x="10" y="20" font-family="monospace" font-size="12" fill="#94a3b8">输入: [read1, read2, write1, read3]</text>
  </g>
  <g class="s2">
    <rect x="10" y="40" width="80" height="30" rx="6" fill="#10b981"/>
    <text x="50" y="60" text-anchor="middle" font-family="monospace" font-size="11" fill="white">read1</text>
    <rect x="100" y="40" width="80" height="30" rx="6" fill="#10b981"/>
    <text x="140" y="60" text-anchor="middle" font-family="monospace" font-size="11" fill="white">read2</text>
    <text x="200" y="60" font-family="sans-serif" font-size="11" fill="#6366f1">⇐ 并行</text>
  </g>
  <g class="s3">
    <line x1="90" y1="70" x2="90" y2="90" stroke="#94a3b8" stroke-width="1"/>
    <rect x="50" y="90" width="80" height="30" rx="6" fill="#ef4444"/>
    <text x="90" y="110" text-anchor="middle" font-family="monospace" font-size="11" fill="white">write1</text>
    <text x="150" y="110" font-family="sans-serif" font-size="11" fill="#ef4444">⇐ 独占</text>
  </g>
  <g class="s4">
    <line x1="90" y1="120" x2="90" y2="140" stroke="#94a3b8" stroke-width="1"/>
    <rect x="50" y="140" width="80" height="30" rx="6" fill="#10b981"/>
    <text x="90" y="160" text-anchor="middle" font-family="monospace" font-size="11" fill="white">read3</text>
    <text x="150" y="160" font-family="sans-serif" font-size="11" fill="#6366f1">⇐ 串行</text>
  </g>
  <g class="s5">
    <rect x="280" y="40" width="200" height="130" rx="8" fill="none" stroke="#475569" stroke-width="1" stroke-dasharray="4,3"/>
    <text x="380" y="65" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#f59e0b">分区规则</text>
    <text x="290" y="90" font-family="sans-serif" font-size="11" fill="#10b981">● 连续只读 → 并行 (max 10)</text>
    <text x="290" y="115" font-family="sans-serif" font-size="11" fill="#ef4444">● 写操作 → 独占锁</text>
    <text x="290" y="140" font-family="sans-serif" font-size="11" fill="#94a3b8">● Bash 错误 → 中止兄弟</text>
  </g>
</svg>`

const permissionLayersSvg = `
<svg viewBox="0 0 460 240" xmlns="http://www.w3.org/2000/svg" style="max-width:460px;width:100%">
  <style>
    @keyframes fadeIn { from{opacity:0} to{opacity:1} }
    .s1{animation:fadeIn .4s ease .2s both}
    .s2{animation:fadeIn .4s ease .7s both}
    .s3{animation:fadeIn .4s ease 1.2s both}
    .s4{animation:fadeIn .4s ease 1.7s both}
  </style>
  <g class="s1">
    <rect x="10" y="10" width="440" height="40" rx="8" fill="#6366f1"/>
    <text x="230" y="35" text-anchor="middle" font-family="sans-serif" font-size="13" fill="white">Layer 1: AST 解析命令结构</text>
  </g>
  <g class="s2">
    <rect x="30" y="60" width="400" height="40" rx="8" fill="#0ea5e9"/>
    <text x="230" y="85" text-anchor="middle" font-family="sans-serif" font-size="13" fill="white">Layer 2: 命令分类 (只读 / 写入 / 破坏性)</text>
  </g>
  <g class="s3">
    <rect x="50" y="110" width="360" height="40" rx="8" fill="#f59e0b"/>
    <text x="230" y="135" text-anchor="middle" font-family="sans-serif" font-size="13" fill="white">Layer 3: 路径权限校验</text>
  </g>
  <g class="s4">
    <rect x="70" y="160" width="320" height="40" rx="8" fill="#ef4444"/>
    <text x="230" y="185" text-anchor="middle" font-family="sans-serif" font-size="13" fill="white">Layer 4: ML 分类器 (yoloClassifier)</text>
  </g>
  <text x="230" y="225" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#94a3b8">每层都能独立拒绝 — 纵深防御</text>
</svg>`

const agentSwarmSvg = `
<svg viewBox="0 0 480 280" xmlns="http://www.w3.org/2000/svg" style="max-width:480px;width:100%">
  <style>
    @keyframes fadeIn { from{opacity:0} to{opacity:1} }
    .s1{animation:fadeIn .5s ease .2s both}
    .s2{animation:fadeIn .5s ease .8s both}
    .s3{animation:fadeIn .5s ease 1.4s both}
    .s4{animation:fadeIn .5s ease 2s both}
  </style>
  <g class="s1">
    <rect x="170" y="10" width="140" height="45" rx="10" fill="#6366f1"/>
    <text x="240" y="38" text-anchor="middle" font-family="sans-serif" font-size="13" fill="white">Coordinator</text>
  </g>
  <g class="s2">
    <line x1="200" y1="55" x2="80" y2="100" stroke="#94a3b8" stroke-width="2"/>
    <line x1="240" y1="55" x2="240" y2="100" stroke="#94a3b8" stroke-width="2"/>
    <line x1="280" y1="55" x2="400" y2="100" stroke="#94a3b8" stroke-width="2"/>
    <rect x="20" y="100" width="120" height="40" rx="8" fill="#10b981"/>
    <text x="80" y="125" text-anchor="middle" font-family="sans-serif" font-size="12" fill="white">Worker: 研究</text>
    <rect x="180" y="100" width="120" height="40" rx="8" fill="#0ea5e9"/>
    <text x="240" y="125" text-anchor="middle" font-family="sans-serif" font-size="12" fill="white">Worker: 实现</text>
    <rect x="340" y="100" width="120" height="40" rx="8" fill="#f59e0b"/>
    <text x="400" y="125" text-anchor="middle" font-family="sans-serif" font-size="12" fill="white">Worker: 测试</text>
  </g>
  <g class="s3">
    <rect x="100" y="170" width="280" height="35" rx="6" fill="#1e293b" stroke="#475569" stroke-width="1"/>
    <text x="240" y="192" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#94a3b8">共享任务列表 (TaskCreate/Update)</text>
  </g>
  <g class="s4">
    <line x1="80" y1="140" x2="80" y2="170" stroke="#10b981" stroke-width="1" stroke-dasharray="4,3"/>
    <line x1="240" y1="140" x2="240" y2="170" stroke="#0ea5e9" stroke-width="1" stroke-dasharray="4,3"/>
    <line x1="400" y1="140" x2="400" y2="170" stroke="#f59e0b" stroke-width="1" stroke-dasharray="4,3"/>
    <text x="240" y="235" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#94a3b8">SendMessage 点对点 | Worktree 隔离 | Token 预算隔离</text>
  </g>
</svg>`

// =============================================
// Book Definition
// =============================================

export const claudeCodeBook: Book = {
  id: 'claude-code',
  title: 'Claude Code 源码解析',
  description: '通过分析 Anthropic 官方 CLI 源码，学习生产级 AI Agent 系统设计',
  icon: '🤖',
  color: '#6366f1',
  chapters: [
    // =============================================
    // 第一章：启动与入口
    // =============================================
    {
      id: 'ch1-startup',
      title: '第一章：启动与入口 — 极致的性能优化',
      lessons: [
        {
          id: 'startup-overview',
          title: '启动链路概览',
          cards: [
            {
              type: 'explain',
              title: 'Claude Code 是什么？',
              content:
                'Claude Code 是 Anthropic 官方的 CLI 工具，让 Claude 能直接在终端中帮你写代码。\n\n它的技术栈：\n- **运行时**: Bun（比 Node.js 更快的 JS 运行时）\n- **UI**: React + Ink（在终端中渲染 React 组件）\n- **语言**: TypeScript（严格模式）\n- **规模**: ~20 万行代码，40+ 工具，50+ 命令\n\n这不是一个玩具项目，而是一个生产级的 AI Agent 系统。',
            },
            {
              type: 'code',
              title: '启动序列 — 每一毫秒都在算计',
              description:
                '看看 `main.tsx` 最开头的代码。注意：**在任何 import 之前**，就已经开始了 I/O 操作。',
              language: 'typescript',
              code: `// main.tsx — 文件最顶部
profileCheckpoint('main_tsx_entry')

// 这两行在 import 之前执行！
startMdmRawRead()        // 并行读取 MDM 配置
startKeychainPrefetch()  // 并行预取 Keychain

// 然后才开始 import
import { Command } from 'commander'
import { render } from 'ink'
// ...`,
            },
            {
              type: 'think-first',
              question: '为什么要在 import 之前就开始读取配置和 Keychain？这违反了常规的模块加载顺序，这样做的好处是什么？',
              hints: '想想 import 语句会做什么——它会加载并执行整个模块树。',
              reveal:
                'import 会递归加载整个依赖树，这可能需要几百毫秒。如果等 import 完成后再开始 I/O，这些 I/O 时间就是纯浪费。\n\n通过在 import 前启动 I/O，配置读取和 Keychain 预取可以与模块加载**并行进行**。当 import 完成时，I/O 可能已经结束了，实现零等待。\n\n这是一种 **"赛跑"优化** — 让 CPU 密集（模块解析）和 I/O 密集（磁盘/网络读取）同时进行。',
            },
            {
              type: 'quiz',
              question: 'Claude Code 的启动优化核心策略是什么？',
              options: [
                '使用更快的编程语言',
                '减少代码量',
                '让 CPU 密集和 I/O 密集操作并行执行',
                '缓存所有数据到内存',
              ],
              correctIndex: 2,
              explanation:
                'Claude Code 的启动优化核心是并行化：在模块加载（CPU 密集）的同时进行配置读取和 Keychain 预取（I/O 密集），最大化利用等待时间。',
            },
          ],
        },
        {
          id: 'lazy-loading',
          title: '懒加载与 Dead Code Elimination',
          cards: [
            {
              type: 'explain',
              title: '不是所有代码都需要立即加载',
              content:
                'Claude Code 有一些很重的依赖：\n- **OpenTelemetry**: ~400KB（可观测性）\n- **gRPC**: ~700KB（通信协议）\n\n如果启动时就加载这些，用户会等很久。\n\n解决方案：**动态 import** — 只在真正需要时才加载。',
              analogy: '就像餐厅不会一次性把所有菜都做好放桌上，而是客人点了才做。',
            },
            {
              type: 'code',
              title: 'Bun 的 feature() API — 编译时消除',
              description:
                '`feature()` 在**编译时**决定代码去留，不是运行时。未使用的代码直接从最终产物中消失。',
              language: 'typescript',
              code: `import { feature } from 'bun:bundle'

// 编译时求值 — 如果 KAIROS 为 false，
// 整个 require 和相关代码会被完全删除
const assistantModule = feature('KAIROS')
  ? require('./assistant/index.js')
  : null

// 运行时懒加载 — 只在需要时加载
async function initTelemetry() {
  const { initializeTelemetry } =
    await import('./services/telemetry.js')
  await initializeTelemetry()
}`,
            },
            {
              type: 'quiz',
              question: 'Bun 的 feature() 和动态 import() 的区别是什么？',
              options: [
                '没有区别，都是运行时加载',
                'feature() 是编译时消除代码，import() 是运行时延迟加载',
                'feature() 更快，import() 更慢',
                'feature() 用于测试，import() 用于生产',
              ],
              correctIndex: 1,
              explanation:
                'feature() 在编译时求值，false 分支的代码会从打包产物中完全删除（Dead Code Elimination）。import() 是运行时延迟加载，代码仍在产物中，只是推迟执行时机。两者互补。',
            },
            {
              type: 'fill-blank',
              title: '配置加载管道',
              description: 'Claude Code 从多个来源加载配置，按优先级合并。补全加载顺序。',
              language: 'typescript',
              template: `// 配置来源优先级（从低到高）
const configSources = [
  '___BLANK___',     // 用户全局设置
  '___BLANK___',     // 项目级设置
  'localSettings',   // 本地覆盖
  'cliArgs',         // 命令行参数
  '___BLANK___',     // 组织策略（最高优先级）
]`,
              blanks: ['userSettings', 'projectSettings', 'policy'],
              hints: ['用户主目录下的设置', '项目 .claude/ 目录下的设置', '组织级别的强制策略'],
            },
          ],
        },
      ],
    },

    // =============================================
    // 第二章：核心循环
    // =============================================
    {
      id: 'ch2-query-engine',
      title: '第二章：核心循环 — Query Engine',
      lessons: [
        {
          id: 'message-types',
          title: '消息类型体系',
          cards: [
            {
              type: 'explain',
              title: '不是所有消息都发给 API',
              content:
                'Claude Code 内部有 7 种消息类型：\n\n- **UserMessage** — 用户输入\n- **AssistantMessage** — Claude 的回复\n- **AttachmentMessage** — 文件附件\n- **ProgressMessage** — 工具执行进度\n- **TombstoneMessage** — 已被压缩删除的消息\n- **ToolUseSummaryMessage** — 工具调用摘要\n\n发给 API 前，需要 `normalizeMessagesForAPI()` 剥离内部字段。',
              analogy: '就像公司内部用工号称呼员工，但对外名片上只印名字和职位。内部标识不能泄露给外部。',
            },
            {
              type: 'code',
              title: 'normalizeMessagesForAPI()',
              description: '这个函数负责把内部消息格式转换成 API 能接受的格式。注意它做了哪些清理。',
              language: 'typescript',
              code: `function normalizeMessagesForAPI(
  messages: Message[]
): APIMessage[] {
  return messages
    // 过滤掉内部消息类型
    .filter(m =>
      m.type !== 'progress' &&
      m.type !== 'tombstone'
    )
    // 剥离内部字段
    .map(m => ({
      role: m.role,
      content: m.content,
      // 不传: m.internalId, m.timestamp,
      //       m.tokenCount, m.metadata
    }))
    // 去除签名重复
    .map(stripSignatureBlocks)
}`,
            },
            {
              type: 'quiz',
              question: 'TombstoneMessage 的作用是什么？',
              options: [
                '标记错误消息',
                '记录用户删除的输入',
                '标记被上下文压缩删除的消息，保留位置信息',
                '标记过期的 API 响应',
              ],
              correctIndex: 2,
              explanation:
                'Tombstone（墓碑）是数据库中常见的软删除模式。在上下文压缩时，被移除的消息不是直接删除，而是替换为 Tombstone，保留其位置信息，以便维护消息顺序和因果关系。',
            },
          ],
        },
        {
          id: 'query-loop',
          title: '流式 API 交互循环',
          cards: [
            {
              type: 'diagram',
              title: 'Query Engine 核心循环',
              description: '用户输入 → System Prompt → API 调用 → 工具执行 → 循环',
              svg: queryLoopSvg,
            },
            {
              type: 'explain',
              title: 'AsyncGenerator — 流式处理的核心',
              content:
                'Claude Code 使用 `AsyncGenerator` 模式处理流式响应：\n\n1. API 返回的是一个**流**，不是一个完整的响应\n2. 每收到一个 chunk，就 yield 给上层\n3. 上层可以**实时渲染**，不需要等全部完成\n4. 天然支持**背压**（backpressure）— 如果消费者慢了，生产者自动暂停',
              analogy: '就像自助餐的传送带：厨房不断放上新菜（produce），你按自己速度取（consume）。你取慢了，传送带自然就慢下来。',
            },
            {
              type: 'code',
              title: 'Generator 模式的工具执行',
              description: '看看工具结果如何通过 AsyncGenerator 流式返回。',
              language: 'typescript',
              code: `async function* runTools(
  toolUseMessages: ToolUseBlock[],
  canUseTool: CanUseToolFn,
  context: ToolUseContext,
): AsyncGenerator<MessageUpdate, void> {

  // 分区：连续只读工具并行，写操作串行
  const partitions = partitionTools(toolUseMessages)

  for (const partition of partitions) {
    if (partition.type === 'readonly') {
      // 并行执行，但有序 yield
      const results = await Promise.all(
        partition.tools.map(t => executeTool(t, context))
      )
      for (const result of results) {
        yield { type: 'tool_result', ...result }
      }
    } else {
      // 写操作：串行执行
      const result = await executeTool(
        partition.tool, context
      )
      yield { type: 'tool_result', ...result }
    }
  }
}`,
            },
            {
              type: 'think-first',
              question: 'Query Engine 需要在"快速估算 Token 数"和"精确计算 Token 数"之间做权衡。你会怎么设计这个策略？',
              hints: '精确计算需要调用 tokenizer，很慢。但如果估算不准，可能浪费 token 或触发不必要的 compact。',
              reveal:
                'Claude Code 的策略：\n\n1. **对已有消息**使用缓存的精确 token 数（计算一次，缓存结果）\n2. **对新内容**使用快速估算（字符数 / 4 的近似值）\n3. **在 compact 决策前**做一次精确计算（因为 compact 代价高，值得花时间算准）\n4. **设置安全余量**（预留 10-15% buffer，宁可提前 compact 也不要超限报错）\n\n核心思路：**在成本低的地方估算，在决策关键点精确计算**。',
            },
          ],
        },
      ],
    },

    // =============================================
    // 第三章：工具系统
    // =============================================
    {
      id: 'ch3-tools',
      title: '第三章：工具系统 — 可组合的 Agent 能力',
      lessons: [
        {
          id: 'tool-interface',
          title: 'Tool 接口设计',
          cards: [
            {
              type: 'code',
              title: 'Tool 类型定义 — 每个字段都有讲究',
              description: '这是 Claude Code 中最核心的类型之一。注意每个方法的作用。',
              language: 'typescript',
              code: `type Tool = {
  name: string
  // 动态启用/禁用（如 feature flag 控制）
  isEnabled(): boolean
  // Zod schema — 编译时类型安全 + 运行时校验
  inputSchema: ZodSchema
  // 不同权限模式下是否可用
  canUseInMode?(mode: PermissionMode): boolean
  // 关键！是否并发安全（接收 input）
  isConcurrencySafe?(input: any): boolean
  // 执行工具
  execute(
    input: any,
    context: ToolUseContext
  ): Promise<ToolResult>
  // 可选：渲染进度 UI（React/Ink 组件）
  setJSX?: SetToolJSXFn
}`,
            },
            {
              type: 'think-first',
              question: '`isConcurrencySafe` 为什么要接收 `input` 参数？如果只返回 boolean（不看 input），会有什么问题？',
              hints: '想想 FileReadTool 和 BashTool 的区别。再想想：读同一个文件两次 vs 读不同文件。',
              reveal:
                '同一个工具，不同的输入可能有完全不同的并发语义：\n\n- **FileReadTool**: 读不同文件 → 安全并行；读同一文件的不同部分 → 也安全\n- **BashTool**: `ls` → 只读，可并行；`rm -rf` → 绝对不行\n- **FileEditTool**: 编辑不同文件 → 可以并行；编辑同一文件 → 必须串行\n\n如果不看 input，就只能把整个工具标记为"不安全"，导致所有 FileRead 调用都串行化，性能白白浪费。',
            },
            {
              type: 'quiz',
              question: '工具的 inputSchema 使用 Zod 而不是 JSON Schema，最大的优势是什么？',
              options: [
                'Zod 比 JSON Schema 更快',
                'Zod 提供编译时类型推导 + 运行时校验的双重保障',
                'Zod 更容易阅读',
                'JSON Schema 已经过时了',
              ],
              correctIndex: 1,
              explanation:
                'Zod 的核心价值是 **类型推导**：从 schema 定义自动推导出 TypeScript 类型，实现"写一次，两处生效"。JSON Schema 只能做运行时校验，类型还得手写一遍，两边容易不一致。',
            },
          ],
        },
        {
          id: 'tool-registry',
          title: '工具注册与特性门控',
          cards: [
            {
              type: 'code',
              title: 'getAllBaseTools() — 条件化的工具注册',
              description: '不是所有工具都一直可用。Feature flag 控制工具的可见性。',
              language: 'typescript',
              code: `function getAllBaseTools(): Tools {
  return [
    AgentTool,
    TaskOutputTool,
    BashTool,
    // 嵌入式搜索工具与独立搜索工具互斥
    ...(hasEmbeddedSearchTools()
      ? []
      : [GlobTool, GrepTool]),
    FileReadTool,
    FileEditTool,
    FileWriteTool,
    WebFetchTool,
    WebSearchTool,
    // Worktree 模式可选
    ...(isWorktreeModeEnabled()
      ? [EnterWorktreeTool, ExitWorktreeTool]
      : []),
    // Agent Swarm 可选
    ...(isAgentSwarmsEnabled()
      ? [TeamCreateTool, TeamDeleteTool]
      : []),
    // ... 40+ total tools
  ]
}`,
            },
            {
              type: 'explain',
              title: 'MCP 工具的动态注入',
              content:
                'Claude Code 的工具不是固定的。除了内置工具，还有 **MCP 工具**（Model Context Protocol）：\n\n1. 启动时连接所有配置的 MCP Server\n2. 从每个 Server 获取它提供的工具列表\n3. 将这些工具动态注入到工具注册表中\n4. Claude 可以像使用内置工具一样使用它们\n\n这意味着你可以通过 MCP 给 Claude Code **无限扩展能力**。',
            },
            {
              type: 'quiz',
              question: '为什么嵌入式搜索工具和 GlobTool/GrepTool 是互斥的？',
              options: [
                '性能考虑，不能同时运行两种搜索',
                '避免功能重复 — 嵌入式搜索已包含文件搜索能力',
                '技术限制，两者不兼容',
                '版权原因',
              ],
              correctIndex: 1,
              explanation:
                '嵌入式搜索工具（如 IDE 内置的语义搜索）已经包含了文件模式匹配和内容搜索能力。如果同时暴露 GlobTool 和 GrepTool，Claude 可能会困惑该用哪个，或者浪费 token 调用重复工具。互斥确保工具集干净、无歧义。',
            },
          ],
        },
        {
          id: 'bash-tool-deep-dive',
          title: 'BashTool 深度解析',
          cards: [
            {
              type: 'explain',
              title: 'BashTool — 160KB 的最复杂工具',
              content:
                'BashTool 是 Claude Code 中最大也最复杂的工具（160KB），因为它要解决一个根本矛盾：\n\n**让 AI 执行 shell 命令，同时确保安全。**\n\n它的安全机制包括：\n- AST 解析命令结构（不是正则匹配！）\n- 命令分类（只读/写入/破坏性）\n- 文件路径权限校验\n- 沙箱模式限制\n- 后台任务管理\n- 超时控制',
            },
            {
              type: 'think-first',
              question: '为什么用 AST 解析 Bash 命令而不是正则匹配？正则不是更简单吗？',
              hints: '想想这个命令：`echo "rm -rf /" | cat` — 正则会怎么处理？',
              reveal:
                '正则匹配无法理解命令的**语法结构**：\n\n- `echo "rm -rf /"` — 这只是输出一个字符串，完全安全\n- `rm -rf /` — 这是真正的删除操作\n- `cat file | rm -rf /` — 管道后面才是危险的\n- `$(rm -rf /)` — 命令替换中隐藏的危险\n- `` `rm -rf /` `` — 反引号中的命令\n\n正则无法区分这些场景，因为它看不到"引号内"、"管道"、"子命令"等语法结构。AST 解析能理解命令的**语义**，而不只是**文本模式**。',
            },
            {
              type: 'code',
              title: '命令安全分类示例',
              description: 'BashTool 会把命令分成不同的安全级别。',
              language: 'typescript',
              code: `// 简化版的命令分类逻辑
type CommandCategory =
  | 'readonly'     // ls, cat, git status
  | 'write'        // echo > file, mkdir
  | 'destructive'  // rm -rf, git reset --hard
  | 'network'      // curl, wget
  | 'background'   // 带 & 的命令

function classifyCommand(ast: BashAST): CommandCategory {
  // 1. 解析命令名
  const cmd = ast.command.name

  // 2. 检查是否在只读白名单
  if (READONLY_COMMANDS.has(cmd)) return 'readonly'

  // 3. 检查破坏性模式
  if (cmd === 'rm' && ast.flags.includes('-rf'))
    return 'destructive'

  // 4. 检查管道 — 每段都要分类
  if (ast.pipe) {
    return worstCategory(
      ast.pipe.map(classifyCommand)
    )
  }

  return 'write' // 默认保守
}`,
            },
            {
              type: 'quiz',
              question: '对于管道命令 `cat file.txt | sort | wc -l`，BashTool 会如何分类？',
              options: [
                '只看第一个命令 cat → readonly',
                '只看最后一个命令 wc → readonly',
                '分析每段，取最严格的分类',
                '所有管道命令都视为 destructive',
              ],
              correctIndex: 2,
              explanation:
                '管道中的每一段都独立分类，然后取**最严格**的结果（worst category）。`cat`=readonly, `sort`=readonly, `wc`=readonly → 整体=readonly。如果中间有 `rm`，就会升级为 destructive。',
            },
          ],
        },
      ],
    },

    // =============================================
    // 第四章：工具编排
    // =============================================
    {
      id: 'ch4-orchestration',
      title: '第四章：工具编排 — 并发与串行的智能调度',
      lessons: [
        {
          id: 'partition-strategy',
          title: '分区策略',
          cards: [
            {
              type: 'diagram',
              title: '工具编排分区图',
              description: '连续只读工具并行执行，写操作独占，自动分区',
              svg: toolOrchestrationSvg,
            },
            {
              type: 'explain',
              title: '为什么要分区而不是全部串行？',
              content:
                'Claude 经常一次返回多个工具调用。比如要了解一个 bug：\n\n1. `GrepTool("error message")` — 搜索错误\n2. `FileReadTool("src/api.ts")` — 读源码\n3. `FileReadTool("tests/api.test.ts")` — 读测试\n4. `BashTool("git log -5")` — 看提交历史\n\n这 4 个操作都是只读的，**完全可以并行**。串行执行需要 4 秒，并行只需要 1 秒。\n\n但如果中间有个 `FileEditTool`，就必须在它前后分区。',
            },
            {
              type: 'code',
              title: 'StreamingToolExecutor — 核心调度器',
              description: '看看实际的执行逻辑是如何处理分区和并发的。',
              language: 'typescript',
              code: `class StreamingToolExecutor {
  // 并发上限
  static readonly MAX_CONCURRENCY = 10

  async *execute(
    tools: ToolUseBlock[]
  ): AsyncGenerator<ToolResult> {
    // 1. 分区
    const partitions = this.partition(tools)

    for (const partition of partitions) {
      if (partition.every(t => t.isConcurrencySafe)) {
        // 2. 只读分区：并行执行
        const promises = partition.map(t =>
          this.executeSingle(t)
        )
        // 但结果按原始顺序 yield！
        const results = await Promise.all(promises)
        for (const r of results) yield r
      } else {
        // 3. 写操作：逐个执行
        for (const tool of partition) {
          yield await this.executeSingle(tool)
        }
      }
    }
  }
}`,
            },
            {
              type: 'think-first',
              question: '为什么并行执行的结果要**按原始顺序** yield，而不是谁先完成谁先返回？',
              hints: '想想 Claude 看到的工具结果顺序。如果乱序了会怎样？',
              reveal:
                'Claude 的 API 要求工具结果的顺序与工具调用顺序一致。如果 Claude 请求了 [tool_1, tool_2, tool_3]，结果必须是 [result_1, result_2, result_3]。\n\n乱序会导致：\n1. API 可能直接报错\n2. Claude 可能混淆哪个结果对应哪个调用\n3. 上下文中的因果关系被打乱\n\n所以用 `Promise.all`（保序）而不是 `Promise.race`（先完成先返回）。**并行执行但有序输出**是关键。',
            },
          ],
        },
        {
          id: 'error-handling',
          title: '错误处理与兄弟中止',
          cards: [
            {
              type: 'explain',
              title: 'Bash 错误时中止兄弟进程',
              content:
                '想象 Claude 同时调用了 3 个工具：\n\n1. `BashTool("npm install")` — 安装依赖\n2. `FileReadTool("package.json")` — 读配置\n3. `GrepTool("TODO")` — 搜索待办\n\n如果 `npm install` 失败了（比如网络断了），继续执行 2 和 3 有意义吗？\n\n**有意义！** 读文件和搜索与安装依赖无关。\n\n但如果场景是：\n1. `BashTool("cd /nonexistent && ls")` — 进入目录\n2. `FileReadTool("/nonexistent/file.ts")` — 读该目录的文件\n\n第 1 个失败了，第 2 个肯定也会失败。这时 **中止兄弟** 可以节省时间。',
            },
            {
              type: 'quiz',
              question: '在 Claude Code 中，什么情况下会触发兄弟进程中止？',
              options: [
                '任何工具失败都会中止所有兄弟',
                '只有 BashTool 失败时会中止兄弟',
                'FileReadTool 失败时中止兄弟',
                '从不中止，所有工具独立执行',
              ],
              correctIndex: 1,
              explanation:
                'Claude Code 的设计是只有 **BashTool 错误**才触发兄弟中止。因为 Bash 命令的失败通常意味着环境状态有问题（目录不存在、权限不足等），其他依赖同一环境的操作大概率也会失败。而 FileRead 失败通常只是文件不存在，不影响其他操作。',
            },
            {
              type: 'task',
              title: '设计练习：工具编排场景分析',
              instruction:
                '给定以下工具调用序列，画出分区方案和执行时序：\n\n```\n[GrepTool, FileReadTool, FileEditTool, FileReadTool, BashTool("npm test"), FileReadTool]\n```\n\n思考：\n1. 怎么分区？\n2. 哪些可以并行？\n3. 如果 BashTool 失败了，最后的 FileReadTool 会被中止吗？',
              checklist: [
                '识别出 3 个分区',
                '第一分区 [Grep, FileRead] 并行',
                'FileEdit 独占一个分区',
                '第三分区 [FileRead, Bash, FileRead] 中 Bash 导致串行化',
                '分析 Bash 失败对后续 FileRead 的影响',
              ],
              tip: '注意：BashTool("npm test") 不是只读的，它可能修改 node_modules 中的缓存文件。',
            },
          ],
        },
      ],
    },

    // =============================================
    // 第五章：权限系统
    // =============================================
    {
      id: 'ch5-permissions',
      title: '第五章：权限系统 — 安全第一',
      lessons: [
        {
          id: 'permission-modes',
          title: '权限模式与规则层级',
          cards: [
            {
              type: 'explain',
              title: '六种权限模式',
              content:
                'Claude Code 提供 6 种权限模式，从严到松：\n\n- **default** — 每次工具调用都询问用户\n- **plan** — 只在"危险"操作前询问\n- **acceptEdits** — 自动接受文件编辑，其他仍询问\n- **auto** — ML 分类器自动审批（最智能）\n- **bypassPermissions** — 跳过所有检查（危险！）\n- **dontAsk** — 拒绝工具调用且不再询问\n\n大多数用户使用 `default` 或 `auto`。',
            },
            {
              type: 'code',
              title: '权限检查结果类型',
              description: '每次工具调用都会经过权限检查，返回三种结果之一。',
              language: 'typescript',
              code: `type PermissionResult =
  | { behavior: 'allow' }
  // 直接通过，无需用户确认
  | { behavior: 'deny'; reason: string }
  // 直接拒绝，不调用工具
  | { behavior: 'ask'; prompt: string }
  // 需要用户确认，显示 prompt

// 使用方式
const result = await canUseTool(tool, input)

switch (result.behavior) {
  case 'allow':
    return await tool.execute(input, context)
  case 'deny':
    return { error: result.reason }
  case 'ask':
    const approved = await promptUser(result.prompt)
    if (approved) {
      return await tool.execute(input, context)
    }
    return { error: 'User denied' }
}`,
            },
            {
              type: 'quiz',
              question: '权限规则有多个来源（user, project, local, CLI, session），如果它们冲突了怎么办？',
              options: [
                '第一个匹配的规则生效',
                '最后一个匹配的规则生效',
                '更具体的来源优先（session > CLI > local > project > user）',
                '总是选择最严格的规则',
              ],
              correctIndex: 2,
              explanation:
                '权限规则按来源特异性排序：session（当前会话）> CLI（命令行参数）> local（本地设置）> project（项目设置）> user（全局设置）。越接近当前操作上下文的规则优先级越高。这允许用户在项目级设置宽松规则，但在特定会话中临时收紧。',
            },
          ],
        },
        {
          id: 'bash-security',
          title: 'Bash 安全深度防线',
          cards: [
            {
              type: 'diagram',
              title: 'Bash 四层安全防线',
              description: '每层都能独立拒绝，纵深防御',
              svg: permissionLayersSvg,
            },
            {
              type: 'explain',
              title: '为什么需要四层而不是一层？',
              content:
                '安全设计的核心原则是**纵深防御**（Defense in Depth）：\n\n- **Layer 1 (AST)** — 理解命令结构，不被字符串欺骗\n- **Layer 2 (分类)** — 区分只读/写入/破坏性\n- **Layer 3 (路径)** — 确保不超出允许的文件范围\n- **Layer 4 (ML)** — 捕获前三层遗漏的模式\n\n任何一层都不是完美的。但四层叠加后，绕过所有防线的概率极低。',
              analogy: '就像银行的安全：门禁卡 + 密码 + 指纹 + 监控。破解一道容易，同时破解四道几乎不可能。',
            },
            {
              type: 'code',
              title: 'YOLO 分类器 — ML 自动审批',
              description: '"auto" 模式使用 ML 分类器自动判断工具调用是否安全。看看它考虑了哪些特征。',
              language: 'typescript',
              code: `// yoloClassifier.ts — 简化版
function classifyForAutoApproval(
  tool: Tool,
  input: unknown,
  context: PermissionContext
): 'allow' | 'ask' {

  // 特征提取
  const features = {
    toolName: tool.name,
    isReadOnly: tool.isConcurrencySafe?.(input),
    commandCategory: classifyCommand(input),
    pathsInScope: checkPathScope(input, context.cwd),
    hasDestructiveFlags: detectDestructiveFlags(input),
    isKnownSafePattern: matchSafePatterns(input),
    userTrustLevel: context.trustLevel,
  }

  // 只有高确信度的安全操作才自动通过
  if (features.isReadOnly &&
      features.pathsInScope &&
      !features.hasDestructiveFlags) {
    return 'allow'
  }

  // 任何不确定的情况都要问用户
  return 'ask'
}`,
            },
            {
              type: 'think-first',
              question: 'YOLO 分类器的 false positive（误判为安全）和 false negative（误判为危险）哪个代价更大？这如何影响分类器的设计？',
              hints: 'false positive = 本该拦截的危险操作被放行。false negative = 本来安全的操作多问了用户一次。',
              reveal:
                '**False Positive 代价远大于 False Negative。**\n\n- False Positive（漏放）：可能导致文件被删、数据丢失、安全漏洞 → **不可逆的损害**\n- False Negative（误拦）：用户多点一次"允许"按钮 → **轻微的体验损失**\n\n因此分类器的设计原则是：**宁可多问，绝不漏放**。\n\n体现在代码中：只有**所有特征都安全**时才 allow，任何不确定就 ask。这是典型的"高召回率优先"设计。在安全领域，这叫做"fail-safe"原则。',
            },
          ],
        },
      ],
    },

    // =============================================
    // 第六章：状态管理
    // =============================================
    {
      id: 'ch6-state',
      title: '第六章：状态管理 — React 模式在 CLI 中的应用',
      lessons: [
        {
          id: 'zustand-store',
          title: 'Zustand-like Store 设计',
          cards: [
            {
              type: 'explain',
              title: '为什么 CLI 工具需要状态管理？',
              content:
                'Claude Code 不是一个简单的命令行工具。它是一个**有状态的交互式应用**：\n\n- 100+ 个状态字段（消息历史、模型、权限、配置...）\n- 多个组件需要读取和更新同一状态\n- 状态变化需要触发 UI 重新渲染\n- 子 Agent 需要隔离的状态\n\n这和一个复杂的 Web 应用的状态管理需求完全一致。',
            },
            {
              type: 'code',
              title: 'AppStateStore — Zustand 风格的状态管理',
              description: '不依赖第三方状态库，自己实现了一个轻量级的 Store。',
              language: 'typescript',
              code: `type AppStateStore = {
  getState(): AppState
  setState(updater: (prev: AppState) => AppState): void
  subscribe(listener: (state: AppState) => void): () => void
}

// 创建 Store
function createAppStateStore(initial: AppState): AppStateStore {
  let state = initial
  const listeners = new Set<(s: AppState) => void>()

  return {
    getState: () => state,
    setState: (updater) => {
      state = updater(state)           // 不可变更新
      listeners.forEach(l => l(state)) // 通知订阅者
    },
    subscribe: (listener) => {
      listeners.add(listener)
      return () => listeners.delete(listener) // 返回取消函数
    },
  }
}`,
            },
            {
              type: 'think-first',
              question: '为什么 Claude Code 自己实现 Store 而不用 Redux 或 Zustand？',
              hints: '想想 CLI 应用和 Web 应用的区别。以及启动性能的要求。',
              reveal:
                '几个原因：\n\n1. **启动性能** — 每个依赖都增加加载时间。自己实现只有 20 行代码，而 Redux/Zustand 是额外的包\n2. **简单性** — CLI 不需要 Redux 的 middleware、devtools 等复杂功能\n3. **定制化** — 可以精确控制更新策略，比如批量更新、优先级更新\n4. **Ink 兼容** — Ink 的 React 版本可能和第三方库不兼容\n\n核心思路：**不为假设需求引入复杂性**。20 行代码能解决的问题，不需要引入整个状态管理框架。',
            },
            {
              type: 'quiz',
              question: 'setState 使用函数式更新 `(prev) => newState` 而不是直接赋值 `setState(newState)`，这是为什么？',
              options: [
                '纯粹是代码风格偏好',
                '防止并发更新导致的状态丢失',
                '性能更好',
                '类型推导更准确',
              ],
              correctIndex: 1,
              explanation:
                '函数式更新确保你总是基于**最新状态**进行修改。如果两个地方同时调用 setState，直接赋值可能互相覆盖（后者覆盖前者的修改）。函数式更新串行化了状态变化，每次更新都看到前一次更新的结果。这在异步工具执行中尤其重要。',
            },
          ],
        },
        {
          id: 'hooks-architecture',
          title: '自定义 Hooks 架构',
          cards: [
            {
              type: 'explain',
              title: '70+ 自定义 Hooks — 业务逻辑的归宿',
              content:
                'Claude Code 有超过 70 个自定义 Hook，最大的 `useCanUseTool` 有 40KB。\n\n设计原则：\n- **组件只做渲染** — 组件中不包含业务逻辑\n- **Hook 封装逻辑** — 所有复杂逻辑都在 Hook 中\n- **Hook 组合 Hook** — 复杂 Hook 由简单 Hook 组合而成\n\n这让代码高度可测试：Hook 可以独立测试，不需要渲染组件。',
            },
            {
              type: 'code',
              title: 'useCanUseTool — 最复杂的 Hook',
              description: '40KB 的权限检查 Hook。看看它如何组合多个状态源。',
              language: 'typescript',
              code: `function useCanUseTool(): CanUseToolFn {
  // 从 Store 获取权限模式
  const permissionMode = useAppState(s => s.permissionMode)
  // 获取权限规则
  const rules = useAppState(s => s.toolPermissionContext)
  // 获取当前工作目录
  const cwd = useAppState(s => s.cwd)

  // 返回一个闭包，捕获了所有需要的状态
  return useCallback(
    async (tool: Tool, input: unknown) => {
      // 1. 检查工具是否在当前模式下可用
      if (!tool.canUseInMode?.(permissionMode)) {
        return { behavior: 'deny' as const, reason: '...' }
      }

      // 2. 检查已保存的规则
      const rule = findMatchingRule(rules, tool, input)
      if (rule) return rule.result

      // 3. 运行安全分类器
      if (permissionMode === 'auto') {
        return yoloClassify(tool, input, cwd)
      }

      // 4. 默认：询问用户
      return { behavior: 'ask' as const, prompt: '...' }
    },
    [permissionMode, rules, cwd]
  )
}`,
            },
            {
              type: 'quiz',
              question: 'useCallback 的依赖数组 [permissionMode, rules, cwd] 的作用是什么？',
              options: [
                '这三个值变化时重新渲染组件',
                '只在这三个值变化时重新创建 canUseTool 函数，避免不必要的重建',
                '缓存这三个值以提高性能',
                '确保这三个值不被垃圾回收',
              ],
              correctIndex: 1,
              explanation:
                'useCallback 的依赖数组告诉 React：只有当这些值变化时，才需要创建新的函数。如果权限模式没变、规则没变、工作目录没变，就继续用之前的函数。这避免了每次渲染都创建新函数导致下游组件不必要的重渲染。',
            },
          ],
        },
      ],
    },

    // =============================================
    // 第七章：上下文压缩
    // =============================================
    {
      id: 'ch7-compact',
      title: '第七章：上下文压缩 — 长对话的生命线',
      lessons: [
        {
          id: 'why-compact',
          title: '为什么需要压缩',
          cards: [
            {
              type: 'explain',
              title: '上下文窗口的残酷现实',
              content:
                'Claude 的上下文窗口虽然很大（100K-1M tokens），但在实际使用中会被快速消耗：\n\n- System Prompt: ~5K tokens\n- 每轮对话: ~500-2K tokens\n- 每次工具调用: ~200-1K tokens\n- 工具结果: ~500-5K tokens（文件内容可能很大）\n\n一个 30 分钟的编码会话，轻松消耗 50K+ tokens。\n\n**不压缩 = 对话被截断 = 丢失上下文 = 错误的回答**',
              analogy: '就像你的桌子。工作一天后堆满了文件、笔记、咖啡杯。如果不整理，就没地方放新东西了。但整理时要小心，别把重要的文件扔了。',
            },
            {
              type: 'quiz',
              question: '上下文压缩最大的挑战是什么？',
              options: [
                '压缩算法的性能',
                '判断哪些信息重要、哪些可以丢弃',
                '压缩后的格式兼容性',
                '用户体验',
              ],
              correctIndex: 1,
              explanation:
                '技术上压缩很容易（删消息就行），难的是**价值判断**：哪些信息对后续对话仍然重要？工具执行的因果链不能断，关键决策的上下文不能丢，但冗余的中间结果可以删。这是信息价值的评估问题。',
            },
          ],
        },
        {
          id: 'compact-strategies',
          title: '四种压缩策略',
          cards: [
            {
              type: 'explain',
              title: '不同场景，不同策略',
              content:
                'Claude Code 有四种压缩策略：\n\n**1. Compact（标准压缩）**\n用 LLM 对历史对话生成摘要，替换原始消息。\n\n**2. Microcompact（微压缩）**\n针对工具密集型会话的激进压缩。工具调用的细节被大幅精简。\n\n**3. Snip（选择性裁剪）**\n基于重要性评分，选择性保留/删除消息。\n\n**4. Tombstone（墓碑标记）**\n不真删消息，而是替换为占位符，保留位置信息。',
            },
            {
              type: 'think-first',
              question: '在压缩时，如何保留工具执行的因果链？比如 Claude 先 grep 找到文件 → 读文件 → 编辑文件。如果删掉了 grep 的结果，Claude 还能理解为什么要编辑那个文件吗？',
              hints: '想想"决策点"和"执行细节"的区别。Claude 需要知道做了什么决策，但不一定需要每次 grep 返回的完整内容。',
              reveal:
                'Claude Code 的压缩策略是：**保留决策，删除细节**。\n\n- 保留：Claude 的推理过程（"我搜索了 X，发现了 Y，因此决定编辑 Z"）\n- 删除：工具的原始输出（grep 返回的 200 行匹配结果）\n- 替换为：ToolUseSummary（"调用了 GrepTool，在 3 个文件中找到匹配"）\n\n这样 Claude 知道它做过什么决策、基于什么信息，但不需要占用 token 存储完整的中间结果。\n\nTombstone 在这里起到关键作用 — 它标记了"这里曾经有一个工具调用"，保持消息序列的完整性。',
            },
            {
              type: 'code',
              title: 'Auto-compact 触发逻辑',
              description: '不需要用户手动 /compact，系统会在适当时机自动触发。',
              language: 'typescript',
              code: `function shouldAutoCompact(
  messages: Message[],
  model: string
): boolean {
  const tokenCount = tokenCountWithEstimation(messages, model)
  const maxTokens = getModelContextWindow(model)

  // 预留 15% 安全余量
  const threshold = maxTokens * 0.85

  if (tokenCount > threshold) {
    return true
  }

  // 工具密集型会话：更早触发
  const toolCallRatio = countToolCalls(messages) / messages.length
  if (toolCallRatio > 0.6 && tokenCount > threshold * 0.7) {
    return true // 工具调用多 = token 消耗快
  }

  return false
}`,
            },
            {
              type: 'quiz',
              question: '为什么工具密集型会话要更早触发 compact（70% 阈值而非 85%）？',
              options: [
                '工具调用的 token 更贵',
                '工具调用产生大量输出，token 增长速度更快，可能在两次检查之间就超限',
                '工具调用的结果质量更低',
                '纯粹是性能考虑',
              ],
              correctIndex: 1,
              explanation:
                '工具调用（尤其是 FileRead、Bash）可能一次性产生几千个 token 的输出。如果等到 85% 才 compact，下一次工具调用可能直接撑爆上下文。提前到 70% 触发，留出足够的缓冲空间应对突发的大量 token 输入。',
            },
          ],
        },
      ],
    },

    // =============================================
    // 第八章：多 Agent 协调
    // =============================================
    {
      id: 'ch8-multi-agent',
      title: '第八章：多 Agent 协调 — Swarm 架构',
      lessons: [
        {
          id: 'coordinator-mode',
          title: 'Coordinator 模式',
          cards: [
            {
              type: 'diagram',
              title: 'Agent Swarm 架构',
              description: 'Coordinator 编排多个 Worker，通过共享任务列表和消息协调',
              svg: agentSwarmSvg,
            },
            {
              type: 'explain',
              title: '为什么需要多 Agent？',
              content:
                '单个 Agent 的局限：\n\n1. **上下文窗口有限** — 大型任务的信息量可能超过一个 Agent 的窗口\n2. **串行执行** — 一个 Agent 一次只能做一件事\n3. **专业化** — 不同任务需要不同的工具集和提示\n\nAgent Swarm 的解决方案：\n- **Coordinator** 负责规划和调度\n- **Worker** 负责执行具体任务\n- 每个 Worker 有独立的上下文窗口和 token 预算\n- Workers 可以**并行**工作',
            },
            {
              type: 'code',
              title: 'Worker 的工具集裁剪',
              description: 'Worker 不能使用所有工具。这是安全和效率的考虑。',
              language: 'typescript',
              code: `// Worker 只能使用这些工具
const ASYNC_AGENT_ALLOWED_TOOLS = [
  AgentTool,       // 可以继续派生子 Agent
  TaskOutputTool,  // 查看任务状态
  BashTool,        // Shell 执行
  FileReadTool,    // 读文件
  FileEditTool,    // 编辑文件
  FileWriteTool,   // 写文件
  GlobTool,        // 搜索文件
  GrepTool,        // 搜索内容
  WebFetchTool,    // 获取网页
  SkillTool,       // 执行 Skill
  // 注意：没有 TeamCreateTool！
  // Worker 不能创建新团队，防止无限递归
]`,
            },
            {
              type: 'think-first',
              question: 'Worker 不被允许使用 TeamCreateTool（创建团队）。如果允许了会怎样？',
              hints: '想想递归和资源消耗。',
              reveal:
                '如果 Worker 能创建团队，就可能出现：\n\nCoordinator → 创建 Worker A → Worker A 创建新团队 → 新团队的 Worker 再创建团队 → ...\n\n这会导致：\n1. **无限递归** — Agent 树无限深\n2. **资源爆炸** — 每个 Agent 消耗 token（= 钱）\n3. **协调混乱** — 谁向谁报告？谁有权停止谁？\n\n限制 Worker 不能创建团队，确保了 Agent 树的**有限深度**和**清晰的层级结构**。这是一个经典的"最小权限原则"应用。',
            },
          ],
        },
        {
          id: 'agent-communication',
          title: 'Agent 通信与隔离',
          cards: [
            {
              type: 'explain',
              title: '三种协调机制',
              content:
                'Claude Code 的 Agent 间有三种协调方式：\n\n**1. SendMessage — 点对点消息**\n直接给某个 Agent 发消息。适合一对一的请求-响应。\n\n**2. TaskCreate/Update — 共享任务列表**\n所有 Agent 都能看到任务列表，自主认领未分配的任务。这是**黑板模式**（Blackboard Pattern）。\n\n**3. Worktree 隔离**\n每个 Worker 在独立的 git worktree 中工作。修改不会互相冲突。完成后合并回主分支。',
            },
            {
              type: 'code',
              title: 'Agent 隔离：Token 预算',
              description: '每个 Worker 有独立的 token 预算，防止一个 Worker 消耗过多资源。',
              language: 'typescript',
              code: `// 创建 Worker 时的配置
const workerConfig: QueryEngineConfig = {
  // 独立的 token 预算
  maxBudgetUsd: parentBudget * 0.2, // 最多用父 Agent 20% 的预算
  // 独立的 turn 限制
  maxTurns: 50,
  // 裁剪后的工具集
  tools: ASYNC_AGENT_ALLOWED_TOOLS,
  // 继承权限模式（但可以更严格）
  permissionMode: Math.min(
    parentMode,
    'plan' // Worker 最宽松只能到 plan 模式
  ),
  // 独立的消息历史
  initialMessages: [],
  // 独立的工作目录（可能是 worktree）
  cwd: worktreePath ?? parentCwd,
}`,
            },
            {
              type: 'quiz',
              question: '黑板模式（Blackboard Pattern）在 Agent Swarm 中的优势是什么？',
              options: [
                '减少消息传递的开销',
                'Agent 可以自主发现和认领任务，无需 Coordinator 逐一分配',
                '提高安全性',
                '减少 token 消耗',
              ],
              correctIndex: 1,
              explanation:
                '黑板模式让任务列表作为共享的"黑板"。Worker 完成当前任务后，主动查看黑板上还有什么未认领的任务，自己认领并开始工作。这比 Coordinator 逐一分配更高效，也更灵活——Worker 可以根据自己的能力选择最合适的任务。',
            },
            {
              type: 'task',
              title: '设计练习：多 Agent 协作方案',
              instruction:
                '设计一个 3-Agent 协作方案来完成以下任务：\n\n> "给现有的 UserService 添加邮箱验证功能，包含后端 API、数据库迁移、和单元测试"\n\n需要规划：\n1. Coordinator 如何分解任务\n2. 3 个 Worker 各自负责什么\n3. Worker 间的依赖关系（谁先谁后）\n4. 如何用 Worktree 避免冲突',
              checklist: [
                '定义 Coordinator 的任务分解（3-5 个子任务）',
                '分配 Worker 角色（如：DB Worker, API Worker, Test Worker）',
                '标识任务依赖（DB 迁移必须先于 API 实现）',
                '设计 Worktree 策略（共用还是各自隔离）',
                '考虑失败场景（如果 DB 迁移失败了怎么办）',
              ],
              tip: 'DB Worker 和 Test Worker 可以并行工作 — Test Worker 可以先写测试（TDD），DB Worker 同时做迁移。',
            },
          ],
        },
      ],
    },

    // =============================================
    // 第九章：扩展系统
    // =============================================
    {
      id: 'ch9-extensions',
      title: '第九章：扩展系统 — Plugin / Skill / MCP',
      lessons: [
        {
          id: 'plugin-system',
          title: 'Plugin 与 Skill 系统',
          cards: [
            {
              type: 'explain',
              title: '三层扩展架构',
              content:
                'Claude Code 的扩展能力分三层：\n\n**Plugin（插件）** — 最重的扩展\n- 可以注册新的工具和命令\n- 有完整的 Manifest\n- 版本化管理\n- 三种来源：Bundled / Marketplace / User\n\n**Skill（技能）** — 轻量级的 Prompt 工作流\n- 本质是预定义的 prompt + 配置\n- 存放在 `.claude/skills/` 目录\n- 可以通过 `SkillTool` 调用\n- 支持 `context: fork`（在子 Agent 中执行）\n\n**MCP（模型上下文协议）** — 标准化的外部工具\n- 连接外部 MCP Server\n- 动态发现工具和资源\n- 跨 AI 平台通用',
            },
            {
              type: 'code',
              title: 'Plugin Manifest — 插件的身份证',
              description: '每个 Plugin 都有一个 Manifest，声明它提供什么能力。',
              language: 'typescript',
              code: `type PluginManifest = {
  name: string           // 插件名称
  version: string        // 语义化版本
  description: string    // 描述
  // 插件可以注册新命令
  commands?: Command[]
  // 插件可以注册新技能
  skills?: PromptCommand[]
  // 插件可以注册 Hook
  hooks?: HooksSettings
  // 兼容性要求
  minClaudeCodeVersion?: string
}

// 加载插件时的错误恢复
async function loadPlugin(path: string) {
  try {
    const manifest = await import(path)
    validateManifest(manifest)
    return manifest
  } catch (error) {
    // 插件加载失败不应该崩溃整个应用！
    logError(\`Plugin load failed: \${path}\`, error)
    return null  // 优雅降级
  }
}`,
            },
            {
              type: 'quiz',
              question: 'Skill 和 Plugin 的主要区别是什么？',
              options: [
                'Skill 是 JavaScript，Plugin 是 TypeScript',
                'Skill 本质是 Prompt 工作流，Plugin 可以注册新工具和命令',
                'Skill 更安全，Plugin 更危险',
                'Skill 用于测试，Plugin 用于生产',
              ],
              correctIndex: 1,
              explanation:
                'Skill 是**纯 Prompt 层**的扩展，它定义一个工作流模板，Claude 按照模板执行。Plugin 是**代码层**的扩展，可以注册全新的工具（Tool）和命令（Command），提供 Skill 无法实现的能力（如新的文件格式支持、新的 API 集成）。',
            },
          ],
        },
        {
          id: 'mcp-integration',
          title: 'MCP 集成 — 标准化的工具发现',
          cards: [
            {
              type: 'explain',
              title: 'MCP 解决了什么问题？',
              content:
                '在 MCP 之前，每个 AI 工具都有自己的集成方式：\n- Claude Code 用 Tool 接口\n- ChatGPT 用 Function Calling\n- Cursor 用自己的 API\n\n同一个"搜索 GitHub Issues"的能力，要为每个平台写一遍。\n\n**MCP（Model Context Protocol）** 定义了统一的标准：\n- 任何 MCP Server 可以被任何 MCP Client 使用\n- 工具发现是自动的（Server 声明能力，Client 查询）\n- 资源缓存由 Client 统一管理\n\n写一次 MCP Server → 所有 AI 工具都能用。',
              analogy: 'USB 出现前，每种设备都有自己的接口。USB 统一了标准后，一根线连一切。MCP 就是 AI 工具的 "USB 标准"。',
            },
            {
              type: 'code',
              title: 'MCP Server 连接管理',
              description: 'Claude Code 在启动时连接所有配置的 MCP Server，并缓存资源。',
              language: 'typescript',
              code: `type MCPServerConnection = {
  name: string
  tools: Tool[]         // Server 提供的工具
  resources: Resource[] // Server 提供的资源
  sampling?: SamplingMode
}

// 启动时：连接所有 MCP Server
async function initMCPServers(
  config: MCPConfig
): Promise<MCPServerConnection[]> {
  const connections = await Promise.all(
    config.servers.map(async server => {
      const client = await connect(server.url)

      // 发现 Server 提供的工具
      const tools = await client.listTools()
      // 预取所有资源（缓存到内存）
      const resources = await client.listResources()

      return { name: server.name, tools, resources }
    })
  )

  // 过滤掉连接失败的 Server
  return connections.filter(Boolean)
}`,
            },
            {
              type: 'think-first',
              question: 'MCP 工具和内置工具对 Claude 来说有区别吗？Claude 怎么知道某个工具是内置的还是来自 MCP？',
              hints: '想想 Claude 看到的是什么 — 工具名、描述、输入 schema。',
              reveal:
                '对 Claude 来说，**完全没有区别**。\n\n内置工具和 MCP 工具在传给 API 时，都是同样的格式：\n```json\n{ "name": "tool_name", "description": "...", "input_schema": {...} }\n```\n\nClaude 不知道也不需要知道工具的来源。这是 MCP 设计的精妙之处 — **对 LLM 透明**。\n\n区别只在 Claude Code 的内部：\n- 内置工具直接调用 TypeScript 函数\n- MCP 工具通过 MCP 协议远程调用 Server\n\n但这个区别对 Claude 完全不可见。',
            },
          ],
        },
      ],
    },

    // =============================================
    // 第十章：可观测性与综合项目
    // =============================================
    {
      id: 'ch10-observability',
      title: '第十章：可观测性与综合项目',
      lessons: [
        {
          id: 'telemetry',
          title: 'OpenTelemetry 与 Feature Flags',
          cards: [
            {
              type: 'explain',
              title: '可观测性的三个支柱',
              content:
                'Claude Code 使用 OpenTelemetry 实现可观测性，覆盖三个维度：\n\n**1. Traces（追踪）**\n跟踪一个请求从用户输入到最终响应的完整链路。每个工具调用是一个 Span。\n\n**2. Metrics（指标）**\nToken 用量、API 延迟、工具执行时间等数值指标。用于监控和告警。\n\n**3. Events（事件）**\n用户操作、错误、功能使用等离散事件。用于分析用户行为和排查问题。',
            },
            {
              type: 'code',
              title: 'Feature Flags — 运行时 vs 编译时',
              description: 'Claude Code 同时使用两种 Feature Flag 机制，它们互补。',
              language: 'typescript',
              code: `// ===== 编译时：Bun feature() =====
// 条件为 false 时，代码从打包产物中完全消失
import { feature } from 'bun:bundle'
if (feature('EXPERIMENTAL_VOICE')) {
  // 这段代码在没有 VOICE 功能的构建中不存在
  enableVoiceInput()
}

// ===== 运行时：GrowthBook =====
// 可以远程动态开关，不需要重新发布
import { isFeatureEnabled } from './services/analytics'
if (isFeatureEnabled('new_compact_strategy')) {
  // 可以做 A/B 测试：50% 用户用新策略
  useNewCompactStrategy()
} else {
  useLegacyCompactStrategy()
}

// 两者互补：
// - 编译时：消除不需要的大块代码（减小体积）
// - 运行时：精细控制功能开关（灵活发布）`,
            },
            {
              type: 'quiz',
              question: '为什么 OpenTelemetry 要懒加载（~400KB），而不是直接内置？',
              options: [
                'OpenTelemetry 有 bug，不稳定',
                '不是所有用户都需要可观测性，懒加载避免影响启动速度',
                'OpenTelemetry 需要网络连接才能工作',
                '版权问题',
              ],
              correctIndex: 1,
              explanation:
                '大部分用户日常使用不需要 OpenTelemetry（它主要用于 Anthropic 内部监控和企业用户）。400KB 的依赖在启动时加载会显著增加冷启动时间。懒加载确保不需要的用户零代价，需要的用户第一次使用时才付出加载成本。',
            },
          ],
        },
        {
          id: 'capstone-project',
          title: '综合项目：设计一个 Mini Agent CLI',
          cards: [
            {
              type: 'explain',
              title: '你已经学了整个架构，现在来造一个！',
              content:
                '基于前 9 章学到的知识，设计一个简化版的 Agent CLI。\n\n**核心需求：**\n1. 流式 LLM 交互（AsyncGenerator 模式）\n2. 3 个工具：ReadFile、WriteFile、RunCommand\n3. 工具编排：只读并行、写操作串行\n4. 基础权限：ask / allow / deny\n5. 简单的 Token 计数和超限保护\n\n**不需要实现：**\n- Ink UI（用简单的 console 即可）\n- MCP 集成\n- 多 Agent\n- 上下文压缩\n\n目标是理解核心循环，而不是复制完整系统。',
            },
            {
              type: 'task',
              title: '架构蓝图设计',
              instruction:
                '在纸上（或文档中）设计你的 Mini Agent CLI 架构。包含以下模块的接口定义和交互关系：\n\n1. **Tool Interface** — 定义 Tool 类型（参考 Ch3）\n2. **QueryEngine** — LLM 交互循环（参考 Ch2）\n3. **ToolOrchestrator** — 工具调度（参考 Ch4）\n4. **PermissionChecker** — 权限检查（参考 Ch5）\n5. **TokenCounter** — Token 计数（参考 Ch7）',
              checklist: [
                '定义 Tool 接口（name, inputSchema, isConcurrencySafe, execute）',
                '设计 QueryEngine 的主循环（input → API → tool calls → results → loop）',
                '实现 ToolOrchestrator 的分区逻辑',
                '实现 PermissionChecker 的 allow/deny/ask 三种结果',
                '实现 TokenCounter 的阈值告警',
                '画出模块间的依赖关系图',
              ],
              tip: '先定义接口，再实现。TypeScript 的类型系统会帮你验证模块间的连接是否正确。',
            },
            {
              type: 'ai-prompt',
              title: '让 AI 帮你搭建脚手架',
              scenario: '你已经设计好了架构蓝图，现在让 AI 帮你生成初始代码框架。',
              prompt:
                '基于以下架构设计，用 TypeScript 生成一个 Mini Agent CLI 的代码框架：\n\n1. Tool 接口：{ name, inputSchema (Zod), isConcurrencySafe(input), execute(input, context) }\n2. 三个工具实现：ReadFileTool, WriteFileTool, RunCommandTool\n3. ToolOrchestrator：分区策略（连续只读并行，写操作串行）\n4. QueryEngine：主循环（使用 AsyncGenerator，支持流式工具执行）\n5. PermissionChecker：简单的 allow/deny/ask 逻辑\n\n要求：只生成类型定义和函数签名，具体实现留空（用 TODO 注释标记）。使用 Zod v4 做输入校验。',
              explanation:
                '这个提示词明确了：技术栈（TypeScript + Zod v4）、架构模式（接口定义）、具体需求（5 个模块）、输出要求（只要框架不要实现）。这样 AI 生成的代码是可控的、可审查的。',
            },
            {
              type: 'think-first',
              question: '回顾整个课程：Claude Code 架构中最让你印象深刻的设计决策是什么？如果让你重新设计，你会改什么？',
              hints: '没有标准答案。想想：并行预取、AST 安全检查、Agent Swarm、MCP 标准化、YOLO 分类器……',
              reveal:
                '一些值得反思的点：\n\n**最精妙的设计**：\n- isConcurrencySafe(input) — 基于输入而非工具类型判断并发安全\n- Tombstone 消息 — 软删除保留因果链\n- 编译时 + 运行时 Feature Flag 互补\n\n**可能的改进方向**：\n- main.tsx 803KB 太大，可以拆分模块\n- 权限系统的 6 种模式对用户可能太复杂\n- MCP 资源全量预取在 Server 很多时可能拖慢启动\n\n**核心启示**：\n生产级 AI Agent 系统的复杂性不在 LLM 调用本身，而在于围绕它构建的**安全、性能、可扩展性**基础设施。',
            },
          ],
        },
      ],
    },
  ],
}
