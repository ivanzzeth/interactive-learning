import type { Book } from '../types'

// =============================================
// SVG Diagrams
// =============================================

const queryLoopSvg = `
<svg viewBox="0 0 520 220" xmlns="http://www.w3.org/2000/svg" style="max-width:520px;width:100%">
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
    <line x1="130" y1="30" x2="170" y2="30" stroke="#94a3b8" stroke-width="2" marker-end="url(#arrowQ)"/>
    <rect x="170" y="10" width="140" height="40" rx="8" fill="#0ea5e9"/>
    <text x="240" y="35" text-anchor="middle" font-family="sans-serif" font-size="13" fill="white">System Prompt</text>
  </g>
  <g class="s3">
    <line x1="310" y1="30" x2="350" y2="30" stroke="#94a3b8" stroke-width="2" marker-end="url(#arrowQ)"/>
    <rect x="350" y="10" width="140" height="40" rx="8" fill="#f59e0b"/>
    <text x="420" y="35" text-anchor="middle" font-family="sans-serif" font-size="13" fill="white">API 流式调用</text>
  </g>
  <g class="s4">
    <line x1="420" y1="50" x2="420" y2="90" stroke="#94a3b8" stroke-width="2" marker-end="url(#arrowQ)"/>
    <rect x="350" y="90" width="140" height="40" rx="8" fill="#ef4444"/>
    <text x="420" y="115" text-anchor="middle" font-family="sans-serif" font-size="13" fill="white">Tool 提取</text>
  </g>
  <g class="s5">
    <line x1="350" y1="110" x2="170" y2="110" stroke="#94a3b8" stroke-width="2" marker-end="url(#arrowQ)"/>
    <rect x="30" y="90" width="140" height="40" rx="8" fill="#10b981"/>
    <text x="100" y="115" text-anchor="middle" font-family="sans-serif" font-size="13" fill="white">工具执行</text>
  </g>
  <g class="s6">
    <line x1="100" y1="130" x2="100" y2="170" stroke="#94a3b8" stroke-width="2"/>
    <line x1="100" y1="170" x2="420" y2="170" stroke="#94a3b8" stroke-width="2"/>
    <line x1="420" y1="170" x2="420" y2="50" stroke="#94a3b8" stroke-width="2" stroke-dasharray="6,3" marker-end="url(#arrowQ)"/>
    <text x="260" y="190" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#94a3b8">结果回传，循环直到 Stop</text>
  </g>
  <defs><marker id="arrowQ" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8"/></marker></defs>
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
<svg viewBox="0 0 480 260" xmlns="http://www.w3.org/2000/svg" style="max-width:480px;width:100%">
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

const stateStoreSvg = `
<svg viewBox="0 0 480 220" xmlns="http://www.w3.org/2000/svg" style="max-width:480px;width:100%">
  <style>
    @keyframes fadeIn { from{opacity:0} to{opacity:1} }
    .s1{animation:fadeIn .5s ease .2s both}
    .s2{animation:fadeIn .5s ease .7s both}
    .s3{animation:fadeIn .5s ease 1.2s both}
    .s4{animation:fadeIn .5s ease 1.7s both}
  </style>
  <g class="s1">
    <rect x="160" y="10" width="160" height="45" rx="10" fill="#6366f1"/>
    <text x="240" y="38" text-anchor="middle" font-family="sans-serif" font-size="13" fill="white">AppStateStore</text>
    <text x="240" y="70" text-anchor="middle" font-family="monospace" font-size="10" fill="#94a3b8">100+ fields</text>
  </g>
  <g class="s2">
    <line x1="180" y1="55" x2="60" y2="105" stroke="#94a3b8" stroke-width="1.5"/>
    <line x1="240" y1="80" x2="240" y2="105" stroke="#94a3b8" stroke-width="1.5"/>
    <line x1="300" y1="55" x2="420" y2="105" stroke="#94a3b8" stroke-width="1.5"/>
    <rect x="10" y="105" width="100" height="35" rx="6" fill="#0ea5e9"/>
    <text x="60" y="127" text-anchor="middle" font-family="monospace" font-size="10" fill="white">useAppState</text>
    <rect x="190" y="105" width="100" height="35" rx="6" fill="#10b981"/>
    <text x="240" y="127" text-anchor="middle" font-family="monospace" font-size="10" fill="white">useCanUseTool</text>
    <rect x="370" y="105" width="100" height="35" rx="6" fill="#f59e0b"/>
    <text x="420" y="127" text-anchor="middle" font-family="monospace" font-size="10" fill="white">useKeybindings</text>
  </g>
  <g class="s3">
    <line x1="60" y1="140" x2="60" y2="165" stroke="#94a3b8" stroke-width="1"/>
    <line x1="240" y1="140" x2="240" y2="165" stroke="#94a3b8" stroke-width="1"/>
    <line x1="420" y1="140" x2="420" y2="165" stroke="#94a3b8" stroke-width="1"/>
    <rect x="10" y="165" width="100" height="30" rx="6" fill="#1e293b" stroke="#475569" stroke-width="1"/>
    <text x="60" y="184" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#94a3b8">REPL Screen</text>
    <rect x="190" y="165" width="100" height="30" rx="6" fill="#1e293b" stroke="#475569" stroke-width="1"/>
    <text x="240" y="184" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#94a3b8">Permission UI</text>
    <rect x="370" y="165" width="100" height="30" rx="6" fill="#1e293b" stroke="#475569" stroke-width="1"/>
    <text x="420" y="184" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#94a3b8">Input Box</text>
  </g>
  <g class="s4">
    <text x="240" y="212" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#94a3b8">Store → Hooks → Components (单向数据流)</text>
  </g>
</svg>`

const compactStrategySvg = `
<svg viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg" style="max-width:500px;width:100%">
  <style>
    @keyframes fadeIn { from{opacity:0} to{opacity:1} }
    .s1{animation:fadeIn .4s ease .2s both}
    .s2{animation:fadeIn .4s ease .7s both}
    .s3{animation:fadeIn .4s ease 1.2s both}
    .s4{animation:fadeIn .4s ease 1.7s both}
  </style>
  <g class="s1">
    <rect x="10" y="10" width="90" height="55" rx="6" fill="#6366f1"/>
    <text x="55" y="32" text-anchor="middle" font-family="sans-serif" font-size="11" fill="white">Compact</text>
    <text x="55" y="50" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#c7d2fe">LLM 摘要</text>
  </g>
  <g class="s2">
    <rect x="115" y="10" width="110" height="55" rx="6" fill="#0ea5e9"/>
    <text x="170" y="32" text-anchor="middle" font-family="sans-serif" font-size="11" fill="white">Microcompact</text>
    <text x="170" y="50" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#bae6fd">工具结果精简</text>
  </g>
  <g class="s3">
    <rect x="240" y="10" width="90" height="55" rx="6" fill="#f59e0b"/>
    <text x="285" y="32" text-anchor="middle" font-family="sans-serif" font-size="11" fill="white">Snip</text>
    <text x="285" y="50" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#fef3c7">重要性裁剪</text>
  </g>
  <g class="s4">
    <rect x="345" y="10" width="100" height="55" rx="6" fill="#ef4444"/>
    <text x="395" y="32" text-anchor="middle" font-family="sans-serif" font-size="11" fill="white">Tombstone</text>
    <text x="395" y="50" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#fecaca">墓碑占位</text>
  </g>
  <text x="10" y="95" font-family="sans-serif" font-size="11" fill="#94a3b8">场景匹配：</text>
  <text x="10" y="115" font-family="sans-serif" font-size="10" fill="#c7d2fe">● 常规对话超限 → Compact (保留决策摘要)</text>
  <text x="10" y="135" font-family="sans-serif" font-size="10" fill="#bae6fd">● 工具密集型 → Microcompact (精简工具输出)</text>
  <text x="10" y="155" font-family="sans-serif" font-size="10" fill="#fef3c7">● 部分冗余 → Snip (选择性删除低价值消息)</text>
  <text x="10" y="175" font-family="sans-serif" font-size="10" fill="#fecaca">● 所有策略 → Tombstone (保留位置标记因果链)</text>
</svg>`

const mcpArchSvg = `
<svg viewBox="0 0 480 200" xmlns="http://www.w3.org/2000/svg" style="max-width:480px;width:100%">
  <style>
    @keyframes fadeIn { from{opacity:0} to{opacity:1} }
    .s1{animation:fadeIn .5s ease .2s both}
    .s2{animation:fadeIn .5s ease .7s both}
    .s3{animation:fadeIn .5s ease 1.2s both}
    .s4{animation:fadeIn .5s ease 1.7s both}
  </style>
  <g class="s1">
    <rect x="170" y="10" width="140" height="40" rx="8" fill="#6366f1"/>
    <text x="240" y="35" text-anchor="middle" font-family="sans-serif" font-size="13" fill="white">Claude Code</text>
    <text x="240" y="65" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#94a3b8">MCP Client</text>
  </g>
  <g class="s2">
    <line x1="180" y1="50" x2="70" y2="100" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
    <line x1="240" y1="70" x2="240" y2="100" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
    <line x1="300" y1="50" x2="410" y2="100" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  </g>
  <g class="s3">
    <rect x="10" y="100" width="120" height="40" rx="8" fill="#10b981"/>
    <text x="70" y="118" text-anchor="middle" font-family="sans-serif" font-size="11" fill="white">GitHub MCP</text>
    <text x="70" y="133" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#bbf7d0">issues, PRs</text>
    <rect x="180" y="100" width="120" height="40" rx="8" fill="#0ea5e9"/>
    <text x="240" y="118" text-anchor="middle" font-family="sans-serif" font-size="11" fill="white">DB MCP</text>
    <text x="240" y="133" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#bae6fd">query, schema</text>
    <rect x="350" y="100" width="120" height="40" rx="8" fill="#f59e0b"/>
    <text x="410" y="118" text-anchor="middle" font-family="sans-serif" font-size="11" fill="white">Custom MCP</text>
    <text x="410" y="133" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#fef3c7">your tools</text>
  </g>
  <g class="s4">
    <text x="240" y="170" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#94a3b8">标准协议 — 写一次 Server，所有 AI 工具都能用</text>
    <text x="240" y="188" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#475569">listTools() → 自动发现 | listResources() → 预取缓存</text>
  </g>
</svg>`

const extensionLayersSvg = `
<svg viewBox="0 0 460 180" xmlns="http://www.w3.org/2000/svg" style="max-width:460px;width:100%">
  <style>
    @keyframes fadeIn { from{opacity:0} to{opacity:1} }
    .s1{animation:fadeIn .4s ease .2s both}
    .s2{animation:fadeIn .4s ease .7s both}
    .s3{animation:fadeIn .4s ease 1.2s both}
  </style>
  <g class="s1">
    <rect x="10" y="10" width="440" height="40" rx="8" fill="#6366f1"/>
    <text x="130" y="35" text-anchor="middle" font-family="sans-serif" font-size="13" fill="white">Plugin (代码层)</text>
    <text x="350" y="35" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#c7d2fe">新工具 + 新命令 + Hooks</text>
  </g>
  <g class="s2">
    <rect x="10" y="60" width="440" height="40" rx="8" fill="#0ea5e9"/>
    <text x="130" y="85" text-anchor="middle" font-family="sans-serif" font-size="13" fill="white">Skill (Prompt 层)</text>
    <text x="350" y="85" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#bae6fd">可复用工作流模板</text>
  </g>
  <g class="s3">
    <rect x="10" y="110" width="440" height="40" rx="8" fill="#10b981"/>
    <text x="130" y="135" text-anchor="middle" font-family="sans-serif" font-size="13" fill="white">MCP (协议层)</text>
    <text x="350" y="135" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#bbf7d0">标准化外部工具集成</text>
  </g>
  <text x="230" y="170" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#94a3b8">重 → 轻 | 定制化 → 标准化</text>
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
                '看 `main.tsx` 最开头的代码。注意：**在任何 import 之前**就开始了 I/O 操作。',
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
              question: '为什么要在 import 之前就开始读取配置和 Keychain？这违反了常规的模块加载顺序，好处是什么？',
              hints: '想想 import 语句会做什么——它会加载并执行整个模块树。',
              reveal:
                'import 会递归加载整个依赖树，这可能需要几百毫秒。如果等 import 完成后再开始 I/O，这些 I/O 时间就是纯浪费。\n\n通过在 import 前启动 I/O，配置读取和 Keychain 预取可以与模块加载**并行进行**。当 import 完成时，I/O 可能已经结束了。\n\n这是一种 **"赛跑"优化** — 让 CPU 密集（模块解析）和 I/O 密集（磁盘/网络读取）同时进行。',
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
                '核心是并行化：在模块加载（CPU 密集）的同时进行配置读取和 Keychain 预取（I/O 密集），最大化利用等待时间。',
            },
            {
              type: 'task',
              title: '阅读源码：启动入口',
              instruction:
                '打开 Claude Code 源码，找到启动入口并追踪启动链路。\n\n**关键文件**：\n- `src/main.tsx` — CLI 入口，Commander.js + Ink 渲染\n- `src/entrypoints/` — 初始化入口\n- `src/bootstrap/` — 全局状态 + 启动逻辑',
              checklist: [
                '找到 profileCheckpoint 的所有调用点',
                '找到 startMdmRawRead 和 startKeychainPrefetch 的定义',
                '追踪 Commander.js 是如何注册子命令的',
                '找到 Ink render() 的调用位置',
              ],
              tip: '用 grep 搜索 `profileCheckpoint` 可以快速找到所有性能打点。',
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
        {
          id: 'config-pipeline',
          title: '多源配置管道',
          cards: [
            {
              type: 'explain',
              title: '上章回顾',
              content: '前面学了启动时的并行预取和懒加载优化。现在深入看配置系统 — 它决定了 Claude Code 的所有行为参数。',
            },
            {
              type: 'code',
              title: 'Zod Schema — 配置的守门人',
              description: '所有配置在加载后都会经过 Zod Schema 校验，确保类型安全。',
              language: 'typescript',
              code: `import { z } from 'zod'

const settingsSchema = z.object({
  // 权限模式
  defaultMode: z.enum([
    'default', 'plan', 'acceptEdits',
    'auto', 'bypassPermissions'
  ]).default('default'),
  // 模型选择
  model: z.string().default('claude-sonnet-4-6'),
  // 自定义快捷键
  keybindings: z.record(z.string()).optional(),
  // MCP 服务器配置
  mcpServers: z.array(mcpServerSchema).optional(),
})

// 加载 + 校验 + 合并
function loadSettings(): Settings {
  const raw = readSettingsFiles()    // 读取多个文件
  const merged = mergeByPriority(raw) // 按优先级合并
  return settingsSchema.parse(merged) // Zod 校验
  // 校验失败会抛出详细错误信息
}`,
            },
            {
              type: 'fill-blank',
              title: '配置的安全分阶段加载',
              description: 'Claude Code 把配置分为"安全"和"不安全"两类，分阶段加载。',
              language: 'typescript',
              template: `// 启动时的配置加载顺序
async function initConfig() {
  // 阶段 1: 在信任建立之前
  enableConfigs()
  ___BLANK___()    // 只应用安全的环境变量
  setupGracefulShutdown()

  // 阶段 2: 信任建立之后
  ___BLANK___()    // 应用所有环境变量
  await detectCurrentRepository()
}`,
              blanks: ['applySafeConfigEnvironmentVariables', 'applyConfigEnvironmentVariables'],
              hints: ['只应用不涉及敏感操作的配置', '所有配置，包括可能影响安全的'],
            },
            {
              type: 'task',
              title: '阅读源码：配置系统',
              instruction:
                '找到 Claude Code 的配置 Schema 和加载逻辑。\n\n**关键文件**：\n- `src/schemas/` — Zod Schema 定义\n- `src/bootstrap/` — 配置加载启动逻辑\n- `src/utils/config.ts` 或类似文件 — 配置合并逻辑',
              checklist: [
                '找到 settingsSchema 的完整定义',
                '理解 Safe vs Unsafe 配置的区分逻辑',
                '追踪 enableConfigs() 的完整实现',
              ],
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
              title: '上章回顾',
              content: '第一章学了 Claude Code 的启动优化：并行预取、懒加载、Dead Code Elimination、多源配置。现在进入核心 — Query Engine，它是 Claude Code 的"大脑"。',
            },
            {
              type: 'explain',
              title: '不是所有消息都发给 API',
              content:
                'Claude Code 内部有 7 种消息类型：\n\n- **UserMessage** — 用户输入\n- **AssistantMessage** — Claude 的回复\n- **AttachmentMessage** — 文件附件\n- **ProgressMessage** — 工具执行进度\n- **TombstoneMessage** — 已被压缩删除的消息\n- **ToolUseSummaryMessage** — 工具调用摘要\n\n发给 API 前，需要 `normalizeMessagesForAPI()` 剥离内部字段。',
              analogy: '就像公司内部用工号称呼员工，但对外名片上只印名字和职位。内部标识不能泄露给外部。',
            },
            {
              type: 'fill-blank',
              title: 'normalizeMessagesForAPI 实现',
              description: '补全消息规范化的关键步骤。',
              language: 'typescript',
              template: `function normalizeMessagesForAPI(
  messages: Message[]
): APIMessage[] {
  return messages
    .filter(m =>
      m.type !== '___BLANK___' &&
      m.type !== '___BLANK___'
    )
    .map(m => ({
      role: m.role,
      content: m.content,
    }))
    .map(___BLANK___)
}`,
              blanks: ['progress', 'tombstone', 'stripSignatureBlocks'],
              hints: ['进度消息不需要发给 API', '已被压缩删除的消息', '去除重复签名的函数'],
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
            {
              type: 'task',
              title: '阅读源码：消息类型',
              instruction:
                '找到所有消息类型的定义和规范化逻辑。\n\n**关键文件**：\n- `src/query.ts` — 消息规范化\n- `src/types/` — 消息类型定义',
              checklist: [
                '找到所有 Message 类型的 union type 定义',
                '找到 normalizeMessagesForAPI 的实现',
                '找到 stripSignatureBlocks 的实现逻辑',
              ],
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
                'Claude Code 使用 `AsyncGenerator` 模式处理流式响应：\n\n1. API 返回的是一个**流**，不是一个完整的响应\n2. 每收到一个 chunk，就 yield 给上层\n3. 上层可以**实时渲染**，不需要等全部完成\n4. 天然支持**背压**（backpressure）— 消费者慢了，生产者自动暂停',
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
      const results = await Promise.all(
        partition.tools.map(t => executeTool(t, context))
      )
      for (const result of results) {
        yield { type: 'tool_result', ...result }
      }
    } else {
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
              question: 'Query Engine 需要在"快速估算 Token 数"和"精确计算 Token 数"之间做权衡。你会怎么设计？',
              hints: '精确计算需要调用 tokenizer，很慢。但估算不准可能浪费 token 或触发不必要的 compact。',
              reveal:
                'Claude Code 的策略：\n\n1. **对已有消息**使用缓存的精确 token 数（计算一次，缓存结果）\n2. **对新内容**使用快速估算（字符数 / 4 的近似值）\n3. **在 compact 决策前**做一次精确计算（compact 代价高，值得花时间算准）\n4. **设置安全余量**（预留 10-15% buffer）\n\n核心思路：**在成本低的地方估算，在决策关键点精确计算**。',
            },
          ],
        },
        {
          id: 'system-prompt-assembly',
          title: 'System Prompt 构建',
          cards: [
            {
              type: 'explain',
              title: 'System Prompt 不是一个静态字符串',
              content:
                'Claude Code 的 System Prompt 是**动态组装**的，由多个来源拼接而成：\n\n1. **基础 Prompt** — Claude Code 的核心行为规范\n2. **CLAUDE.md** — 项目级的自定义指令\n3. **Memory** — 持久化的用户记忆\n4. **用户上下文** — 模型信息、可用工具列表\n5. **权限上下文** — 当前权限模式和规则\n\n顺序和优先级决定了 Claude 在冲突时听谁的。',
            },
            {
              type: 'code',
              title: 'fetchSystemPromptParts()',
              description: '看看 System Prompt 的各部分是如何收集和组装的。',
              language: 'typescript',
              code: `async function fetchSystemPromptParts(
  config: QueryEngineConfig
): Promise<string> {
  const parts: string[] = []

  // 1. 基础行为规范（不可覆盖）
  parts.push(BASE_SYSTEM_PROMPT)

  // 2. CLAUDE.md（项目级指令）
  const claudeMd = await readClaudeMd(config.cwd)
  if (claudeMd) {
    parts.push(\`# User Instructions\\n\${claudeMd}\`)
  }

  // 3. 持久化记忆
  const memories = await loadMemories(config.cwd)
  if (memories.length > 0) {
    parts.push(\`# Memory\\n\${memories.join('\\n')}\`)
  }

  // 4. 可用工具列表
  parts.push(formatToolDescriptions(config.tools))

  // 5. 权限上下文
  parts.push(formatPermissionContext(config))

  return parts.join('\\n\\n')
}`,
            },
            {
              type: 'fill-blank',
              title: 'System Prompt 优先级',
              description: '当 CLAUDE.md 和 Memory 的指令冲突时，Claude Code 如何处理？',
              language: 'typescript',
              template: `// System Prompt 中的优先级标记
const BASE_SYSTEM_PROMPT = \`
You are Claude Code...

IMPORTANT: ___BLANK___ instructions
OVERRIDE any default behavior.

User memories provide ___BLANK___
but instructions in CLAUDE.md take ___BLANK___.
\``,
              blanks: ['User', 'context', 'precedence'],
              hints: ['CLAUDE.md 中的指令属于谁？', '记忆提供什么类型的信息？', '哪个优先？'],
            },
            {
              type: 'task',
              title: '阅读源码：System Prompt',
              instruction:
                '找到 System Prompt 的完整构建逻辑。\n\n**关键文件**：\n- `src/context.ts` — 上下文收集\n- `src/query.ts` 中搜索 `system` 相关函数',
              checklist: [
                '找到 BASE_SYSTEM_PROMPT 的完整文本',
                '理解 CLAUDE.md 的读取和注入位置',
                '找到 Memory 注入的逻辑',
                '追踪工具描述是如何格式化的',
              ],
              tip: '搜索 `fetchSystemPromptParts` 或 `createSystemMessage` 作为起点。',
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
              type: 'explain',
              title: '上章回顾',
              content: '第二章学了 Query Engine 的核心循环：消息类型体系、System Prompt 动态组装、流式 API 交互。现在看 Claude 最重要的能力来源 — 工具系统。',
            },
            {
              type: 'code',
              title: 'Tool 类型定义 — 每个字段都有讲究',
              description: '这是 Claude Code 中最核心的类型之一。',
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
                '同一个工具，不同的输入可能有完全不同的并发语义：\n\n- **FileReadTool**: 读不同文件 → 安全并行；读同一文件 → 也安全\n- **BashTool**: `ls` → 只读，可并行；`rm -rf` → 绝对不行\n- **FileEditTool**: 编辑不同文件 → 可以并行；编辑同一文件 → 必须串行\n\n如果不看 input，就只能把整个工具标记为"不安全"，所有 FileRead 调用都串行化，性能白白浪费。',
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
                'Zod 的核心价值是 **类型推导**：从 schema 定义自动推导出 TypeScript 类型，实现"写一次，两处生效"。JSON Schema 只能做运行时校验，类型还得手写一遍。',
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
                '嵌入式搜索工具已包含文件匹配和内容搜索能力。同时暴露两套工具会让 Claude 困惑该用哪个，或浪费 token 调用重复工具。互斥确保工具集干净、无歧义。',
            },
            {
              type: 'fill-blank',
              title: '实现一个自定义 Tool',
              description: '补全一个简单的 CountLinesTool 实现。',
              language: 'typescript',
              template: `const CountLinesTool: Tool = {
  name: '___BLANK___',
  isEnabled: () => true,
  inputSchema: z.object({
    file_path: z.string().describe('File path to count'),
  }),
  ___BLANK___(input) {
    return true // 读取操作，总是并发安全
  },
  async execute(input, context) {
    const content = await readFile(input.file_path, 'utf-8')
    const lines = content.split('\\n').___BLANK___
    return { content: \`\${lines} lines\` }
  },
}`,
              blanks: ['count_lines', 'isConcurrencySafe', 'length'],
              hints: ['工具名用 snake_case', '并发安全判断方法', '数组计数属性'],
            },
            {
              type: 'task',
              title: '阅读源码：工具注册',
              instruction:
                '找到工具注册表和一个具体工具的实现。\n\n**关键文件**：\n- `src/tools.ts` — 工具注册表\n- `src/Tool.ts` — Tool 类型定义\n- `src/tools/` — 各工具实现目录',
              checklist: [
                '找到 getAllBaseTools() 的完整实现',
                '列出所有被 feature flag 控制的工具',
                '找到 MCP 工具动态注入的位置',
                '读一个简单工具（如 GlobTool）的完整实现',
              ],
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
                'BashTool 是 Claude Code 中最大也最复杂的工具（160KB），因为它要解决一个根本矛盾：\n\n**让 AI 执行 shell 命令，同时确保安全。**\n\n安全机制包括：\n- AST 解析命令结构（不是正则！）\n- 命令分类（只读/写入/破坏性）\n- 文件路径权限校验\n- 沙箱模式限制\n- 后台任务管理\n- 超时控制',
            },
            {
              type: 'think-first',
              question: '为什么用 AST 解析 Bash 命令而不是正则匹配？正则不是更简单吗？',
              hints: '想想这个命令：`echo "rm -rf /" | cat` — 正则会怎么处理？',
              reveal:
                '正则匹配无法理解命令的**语法结构**：\n\n- `echo "rm -rf /"` — 只是输出一个字符串，完全安全\n- `rm -rf /` — 真正的删除操作\n- `$(rm -rf /)` — 命令替换中隐藏的危险\n\n正则无法区分这些场景。AST 解析能理解**语义**，而不只是**文本模式**。',
            },
            {
              type: 'code',
              title: '命令安全分类示例',
              description: 'BashTool 把命令分成不同的安全级别。',
              language: 'typescript',
              code: `type CommandCategory =
  | 'readonly'     // ls, cat, git status
  | 'write'        // echo > file, mkdir
  | 'destructive'  // rm -rf, git reset --hard
  | 'network'      // curl, wget
  | 'background'   // 带 & 的命令

function classifyCommand(ast: BashAST): CommandCategory {
  const cmd = ast.command.name

  if (READONLY_COMMANDS.has(cmd)) return 'readonly'
  if (cmd === 'rm' && ast.flags.includes('-rf'))
    return 'destructive'

  // 管道：每段都要分类，取最严格的
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
                '管道中的每段独立分类，取**最严格**的结果。`cat`=readonly, `sort`=readonly, `wc`=readonly → 整体=readonly。如果中间有 `rm`，就会升级为 destructive。',
            },
            {
              type: 'task',
              title: '阅读源码：BashTool 安全层',
              instruction:
                '深入 BashTool 的安全实现。\n\n**关键文件**：\n- `src/tools/BashTool/BashTool.tsx` — 主实现 (160KB)\n- `src/utils/permissions/bashPermissions.ts` — Bash 权限 (98KB)\n- `src/utils/permissions/bashSecurity.ts` — 安全检查 (102KB)\n- `bash/ast.ts` 或类似文件 — AST 解析',
              checklist: [
                '找到 AST 解析器的入口',
                '找到 READONLY_COMMANDS 的白名单',
                '找到沙箱模式的实现逻辑',
                '追踪一个命令从输入到执行的完整安全检查链路',
              ],
              tip: '搜索 `classifyCommand` 或 `CommandCategory` 作为起点。',
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
              type: 'explain',
              title: '上章回顾',
              content: '第三章学了 Tool 接口设计（特别是 isConcurrencySafe 为什么接收 input）、工具注册的特性门控、以及 BashTool 的 AST 安全解析。现在看多个工具如何被高效调度。',
            },
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
                'Claude 经常一次返回多个工具调用。比如要了解一个 bug：\n\n1. `GrepTool("error message")` — 搜索错误\n2. `FileReadTool("src/api.ts")` — 读源码\n3. `FileReadTool("tests/api.test.ts")` — 读测试\n4. `BashTool("git log -5")` — 看提交历史\n\n这 4 个都是只读的，**完全可以并行**。串行 4 秒，并行 1 秒。',
            },
            {
              type: 'code',
              title: 'StreamingToolExecutor — 核心调度器',
              description: '看看实际的执行逻辑。',
              language: 'typescript',
              code: `class StreamingToolExecutor {
  static readonly MAX_CONCURRENCY = 10

  async *execute(
    tools: ToolUseBlock[]
  ): AsyncGenerator<ToolResult> {
    const partitions = this.partition(tools)

    for (const partition of partitions) {
      if (partition.every(t => t.isConcurrencySafe)) {
        // 只读分区：并行执行
        const promises = partition.map(t =>
          this.executeSingle(t)
        )
        // 但结果按原始顺序 yield！
        const results = await Promise.all(promises)
        for (const r of results) yield r
      } else {
        // 写操作：逐个执行
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
                'Claude 的 API 要求工具结果的顺序与工具调用顺序一致。乱序会导致：\n1. API 可能直接报错\n2. Claude 可能混淆哪个结果对应哪个调用\n\n所以用 `Promise.all`（保序）而不是 `Promise.race`（先完成先返回）。**并行执行但有序输出**是关键。',
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
                '如果 Claude 同时调用了 3 个工具，其中 `BashTool` 失败了：\n\n场景 A: `npm install` 失败 + `FileReadTool("package.json")` → 继续！读文件和安装无关\n\n场景 B: `cd /nonexistent && ls` 失败 + `FileReadTool("/nonexistent/file.ts")` → 中止！环境状态有问题\n\nClaude Code 的策略：**只有 BashTool 失败才触发兄弟中止**。因为 Bash 失败通常意味着环境状态异常。',
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
                '只有 **BashTool 错误**才触发兄弟中止。Bash 命令的失败通常意味着环境状态问题（目录不存在、权限不足等），其他操作大概率也会失败。而 FileRead 失败只是文件不存在，不影响其他操作。',
            },
            {
              type: 'task',
              title: '设计练习：工具编排场景分析',
              instruction:
                '给定以下工具调用序列，画出分区方案和执行时序：\n\n```\n[GrepTool, FileReadTool, FileEditTool, FileReadTool, BashTool("npm test"), FileReadTool]\n```\n\n思考：\n1. 怎么分区？\n2. 哪些可以并行？\n3. BashTool 失败后最后的 FileReadTool 会被中止吗？',
              checklist: [
                '识别出至少 3 个分区',
                '第一分区 [Grep, FileRead] 并行',
                'FileEdit 独占一个分区',
                '分析 BashTool 对后续 FileRead 的影响',
              ],
              tip: 'BashTool("npm test") 可能修改 node_modules 缓存，不一定是只读的。',
            },
          ],
        },
        {
          id: 'orchestration-design-tradeoffs',
          title: '设计权衡分析',
          cards: [
            {
              type: 'think-first',
              question: '为什么 Claude Code 不使用读写锁（Read-Write Lock）来管理工具并发，而是用简单的分区策略？',
              hints: '读写锁允许多读单写。但想想 Agent 场景的特殊性 — 工具调用的顺序对 LLM 来说有意义吗？',
              reveal:
                '关键差异在于 **LLM 需要有序的结果**：\n\n读写锁解决的是"多线程安全访问共享资源"的问题，结果不需要有序。\n\n但在 Agent 场景中：\n1. Claude 期望按调用顺序收到结果\n2. 工具调用之间可能有**隐式依赖**（Claude 的推理中暗含了顺序）\n3. 锁的粒度难以确定（按文件？按目录？按命令？）\n\n分区策略更简单、更可预测：**同类并行，异类串行**。在 Agent 场景下，可预测性比极致性能更重要。',
            },
            {
              type: 'fill-blank',
              title: '并发上限的考量',
              description: '为什么并发上限是 10 而不是更多？',
              language: 'typescript',
              template: `class StreamingToolExecutor {
  // 为什么是 10？
  static readonly MAX_CONCURRENCY = ___BLANK___

  // 原因：
  // 1. 文件系统的 ___BLANK___ 有限
  // 2. 每个工具执行占用 ___BLANK___
  // 3. 超过 10 个并行工具调用在实践中极少见
}`,
              blanks: ['10', 'I/O 带宽', '内存和 CPU'],
              hints: ['一个整数', '磁盘读写的瓶颈', '进程资源'],
            },
            {
              type: 'task',
              title: '阅读源码：工具编排',
              instruction:
                '找到工具编排的核心实现。\n\n**关键文件**：\n- `src/services/tools/toolOrchestration.ts` — 分区逻辑\n- `src/services/tools/StreamingToolExecutor.ts` — 流式执行器\n- `src/services/tools/toolExecution.ts` — 单工具执行',
              checklist: [
                '找到分区算法的实现',
                '找到 MAX_CONCURRENCY 的定义',
                '找到兄弟中止的触发条件',
                '追踪工具结果如何保序',
              ],
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
              title: '上章回顾',
              content: '第四章学了工具编排：分区策略（只读并行、写操作独占）、有序输出、兄弟中止。现在看 Claude Code 最重要的非功能性需求 — 安全。',
            },
            {
              type: 'explain',
              title: '六种权限模式',
              content:
                'Claude Code 提供 6 种权限模式，从严到松：\n\n- **default** — 每次工具调用都询问用户\n- **plan** — 只在"危险"操作前询问\n- **acceptEdits** — 自动接受文件编辑，其他仍询问\n- **auto** — ML 分类器自动审批（最智能）\n- **bypassPermissions** — 跳过所有检查（危险！）\n- **dontAsk** — 拒绝工具调用且不再询问',
            },
            {
              type: 'code',
              title: '权限检查结果类型',
              description: '每次工具调用都会经过权限检查，返回三种结果之一。',
              language: 'typescript',
              code: `type PermissionResult =
  | { behavior: 'allow' }
  | { behavior: 'deny'; reason: string }
  | { behavior: 'ask'; prompt: string }

const result = await canUseTool(tool, input)

switch (result.behavior) {
  case 'allow':
    return await tool.execute(input, context)
  case 'deny':
    return { error: result.reason }
  case 'ask':
    const approved = await promptUser(result.prompt)
    if (approved)
      return await tool.execute(input, context)
    return { error: 'User denied' }
}`,
            },
            {
              type: 'quiz',
              question: '权限规则有多个来源，如果冲突了怎么办？',
              options: [
                '第一个匹配的规则生效',
                '最后一个匹配的规则生效',
                '更具体的来源优先（session > CLI > local > project > user）',
                '总是选择最严格的规则',
              ],
              correctIndex: 2,
              explanation:
                '权限规则按来源特异性排序。越接近当前操作上下文的规则优先级越高。允许在项目级设置宽松规则，但在特定会话中临时收紧。',
            },
            {
              type: 'fill-blank',
              title: '权限模式映射',
              description: '不同模式下，FileEditTool 的默认权限行为。',
              language: 'typescript',
              template: `// FileEditTool 在各模式下的行为
const editPermissions: Record<PermissionMode, Behavior> = {
  default:     '___BLANK___',  // 每次都问
  plan:        '___BLANK___',  // 编辑是"危险"操作
  acceptEdits: '___BLANK___',  // 专门自动接受编辑
  auto:        'allow',        // ML 判断
  bypassPermissions: 'allow',
}`,
              blanks: ['ask', 'ask', 'allow'],
              hints: ['default 模式下所有操作都问', 'plan 模式下编辑需要确认', '这个模式的名字已经说明了'],
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
                '安全设计的核心原则是**纵深防御**（Defense in Depth）：\n\n- **Layer 1 (AST)** — 理解命令结构，不被字符串欺骗\n- **Layer 2 (分类)** — 区分只读/写入/破坏性\n- **Layer 3 (路径)** — 确保不超出允许的文件范围\n- **Layer 4 (ML)** — 捕获前三层遗漏的模式\n\n任何一层都不完美。四层叠加后，绕过所有防线的概率极低。',
              analogy: '就像银行：门禁卡 + 密码 + 指纹 + 监控。破解一道容易，同时破解四道几乎不可能。',
            },
            {
              type: 'task',
              title: '阅读源码：权限系统',
              instruction:
                '追踪一个 Bash 命令的完整权限检查链路。\n\n**关键文件**：\n- `src/types/permissions.ts` — 类型定义\n- `src/utils/permissions/permissions.ts` — 核心逻辑\n- `src/utils/permissions/bashPermissions.ts` — Bash 专用 (98KB)\n- `src/utils/permissions/bashSecurity.ts` — 安全检查 (102KB)',
              checklist: [
                '找到 PermissionMode 的完整枚举',
                '追踪 canUseTool 的调用链',
                '找到四层安全检查的代码位置',
                '找到 READONLY_COMMANDS 白名单',
              ],
            },
          ],
        },
        {
          id: 'yolo-classifier',
          title: 'YOLO 分类器 — ML 自动审批',
          cards: [
            {
              type: 'code',
              title: 'YOLO 分类器核心逻辑',
              description: '"auto" 模式使用 ML 分类器自动判断工具调用是否安全。',
              language: 'typescript',
              code: `function classifyForAutoApproval(
  tool: Tool,
  input: unknown,
  context: PermissionContext
): 'allow' | 'ask' {

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

  // 任何不确定都要问用户
  return 'ask'
}`,
            },
            {
              type: 'think-first',
              question: 'YOLO 分类器的 false positive（误判为安全）和 false negative（误判为危险）哪个代价更大？这如何影响设计？',
              hints: 'false positive = 本该拦截的危险操作被放行。false negative = 本来安全的操作多问了用户一次。',
              reveal:
                '**False Positive 代价远大于 False Negative。**\n\n- 漏放：可能导致文件被删、数据丢失 → **不可逆的损害**\n- 误拦：用户多点一次"允许" → **轻微的体验损失**\n\n因此设计原则：**宁可多问，绝不漏放**。只有所有特征都安全时才 allow，任何不确定就 ask。这是"fail-safe"原则。',
            },
            {
              type: 'quiz',
              question: 'YOLO 分类器中 `userTrustLevel` 这个特征可能包含什么？',
              options: [
                '用户的 GitHub star 数量',
                '用户的付费等级',
                '用户过去批准/拒绝操作的模式和历史',
                '用户的 IP 地址信誉',
              ],
              correctIndex: 2,
              explanation:
                '信任等级基于用户的**历史行为模式** — 如果用户过去总是批准某类操作，分类器可以更自信地自动放行。如果用户经常拒绝某类操作，分类器应该倾向于询问。这是一种个性化的安全策略。',
            },
            {
              type: 'fill-blank',
              title: 'useCanUseTool Hook',
              description: '这个 40KB 的 Hook 是权限系统的 React 层入口。',
              language: 'typescript',
              template: `function useCanUseTool(): CanUseToolFn {
  const permissionMode = useAppState(s => s.___BLANK___)
  const rules = useAppState(s => s.toolPermissionContext)
  const cwd = useAppState(s => s.cwd)

  return useCallback(
    async (tool, input) => {
      if (!tool.canUseInMode?.(permissionMode))
        return { behavior: '___BLANK___', reason: '...' }

      const rule = findMatchingRule(rules, tool, input)
      if (rule) return rule.result

      if (permissionMode === '___BLANK___')
        return yoloClassify(tool, input, cwd)

      return { behavior: 'ask', prompt: '...' }
    },
    [permissionMode, rules, cwd]
  )
}`,
              blanks: ['permissionMode', 'deny', 'auto'],
              hints: ['权限模式在哪个 state 字段', '不可用时返回什么行为', '哪个模式使用 ML 分类器'],
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
              title: '上章回顾',
              content: '第五章学了权限系统：六种模式、四层 Bash 安全防线、YOLO ML 分类器、useCanUseTool Hook。现在看驱动这一切的底层 — 状态管理。',
            },
            {
              type: 'diagram',
              title: '状态管理架构',
              description: 'Store → Hooks → Components 的单向数据流',
              svg: stateStoreSvg,
            },
            {
              type: 'code',
              title: 'AppStateStore — 自实现的轻量 Store',
              description: '不依赖第三方库，20 行代码搞定状态管理。',
              language: 'typescript',
              code: `type AppStateStore = {
  getState(): AppState
  setState(updater: (prev: AppState) => AppState): void
  subscribe(listener: (state: AppState) => void): () => void
}

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
      return () => listeners.delete(listener)
    },
  }
}`,
            },
            {
              type: 'think-first',
              question: '为什么 Claude Code 自己实现 Store 而不用 Redux 或 Zustand？',
              hints: '想想 CLI 应用和 Web 应用的区别，以及启动性能的要求。',
              reveal:
                '1. **启动性能** — 每个依赖增加加载时间。自己实现只有 20 行\n2. **简单性** — CLI 不需要 middleware、devtools 等\n3. **定制化** — 可以精确控制更新策略\n4. **Ink 兼容** — Ink 的 React 版本可能和第三方库不兼容\n\n**不为假设需求引入复杂性**。20 行能解决的问题，不需要整个框架。',
            },
            {
              type: 'quiz',
              question: 'setState 使用函数式更新 `(prev) => newState` 而不是直接赋值，这是为什么？',
              options: [
                '纯粹是代码风格偏好',
                '防止并发更新导致的状态丢失',
                '性能更好',
                '类型推导更准确',
              ],
              correctIndex: 1,
              explanation:
                '函数式更新确保总是基于**最新状态**修改。两个地方同时 setState，直接赋值可能互相覆盖。函数式更新串行化了状态变化。这在异步工具执行中尤其重要。',
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
                'Claude Code 有超过 70 个自定义 Hook，最大的 `useCanUseTool` 有 40KB。\n\n设计原则：\n- **组件只做渲染** — 不包含业务逻辑\n- **Hook 封装逻辑** — 所有复杂逻辑在 Hook 中\n- **Hook 组合 Hook** — 复杂 Hook 由简单 Hook 组合\n\n高度可测试：Hook 可以独立测试，不需要渲染组件。',
            },
            {
              type: 'fill-blank',
              title: 'useCallback 的依赖数组',
              description: '理解 useCallback 在 Claude Code 中的关键作用。',
              language: 'typescript',
              template: `function useCanUseTool(): CanUseToolFn {
  const mode = useAppState(s => s.permissionMode)
  const rules = useAppState(s => s.toolPermissionContext)
  const cwd = useAppState(s => s.cwd)

  // 只在这三个值变化时才重建函数
  return useCallback(
    async (tool, input) => { /* ... */ },
    [___BLANK___, ___BLANK___, ___BLANK___]
  )
}
// 好处：避免不必要的 ___BLANK___`,
              blanks: ['mode', 'rules', 'cwd', '函数重建和下游组件重渲染'],
              hints: ['第一个状态变量', '第二个状态变量', '第三个状态变量', 'useCallback 优化了什么？'],
            },
            {
              type: 'task',
              title: '阅读源码：状态与 Hooks',
              instruction:
                '探索状态管理和 Hook 层。\n\n**关键文件**：\n- `src/state/AppState.tsx` — React 状态 Provider\n- `src/state/AppStateStore.ts` — Store 定义\n- `src/bootstrap/state.ts` — 全局状态\n- `src/hooks/useCanUseTool.tsx` — 最复杂的 Hook (40KB)',
              checklist: [
                '数一下 AppState 有多少个字段',
                '找到 AppStoreContext 的 Provider 组件',
                '找到 useAppState 的实现（selector 模式）',
                '找到 VoiceProvider 和 MailboxProvider 的条件加载逻辑',
              ],
            },
          ],
        },
        {
          id: 'ink-terminal-ui',
          title: 'Ink 终端 UI',
          cards: [
            {
              type: 'explain',
              title: 'React 组件，但渲染到终端',
              content:
                'Ink 让你用 React 语法编写终端 UI。但和 Web React 有关键区别：\n\n| | Web React | Ink |\n|---|---|---|\n| 渲染目标 | DOM | Terminal (stdout) |\n| 布局 | CSS/Flexbox | Yoga (Flexbox 子集) |\n| 事件 | 鼠标/键盘 | 只有键盘 |\n| 动画 | requestAnimationFrame | setInterval |\n| 组件数 | 无限制 | 终端行数限制 |\n\nClaude Code 有 ~140 个 Ink 组件，实现了完整的交互式终端 UI。',
            },
            {
              type: 'code',
              title: '流式内容的增量渲染',
              description: 'Claude 的回复是流式的，每收到一个 token 就要更新 UI。',
              language: 'typescript',
              code: `// 简化版的流式渲染组件
function StreamingResponse({ stream }: Props) {
  const [content, setContent] = useState('')

  useEffect(() => {
    const reader = stream.getReader()
    async function read() {
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        // 每个 chunk 增量追加
        setContent(prev => prev + value)
      }
    }
    read()
  }, [stream])

  // Ink 的 <Text> 相当于 Web 的 <span>
  return <Text>{content}</Text>
}`,
            },
            {
              type: 'quiz',
              question: 'Ink 使用 Yoga 布局引擎，它和 CSS Flexbox 的最大区别是什么？',
              options: [
                'Yoga 不支持 Grid',
                'Yoga 是 Flexbox 的子集 — 只支持一维布局基本属性，不支持 float、position:absolute 等',
                'Yoga 更快',
                'Yoga 用 JavaScript 实现，Flexbox 用 C++ 实现',
              ],
              correctIndex: 1,
              explanation:
                'Yoga 是 Facebook 开发的跨平台 Flexbox 实现，但只支持 Flexbox 的子集。终端 UI 不需要 float、absolute positioning、z-index 等复杂布局。简化后的布局引擎更快、更可预测。',
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
              title: '上章回顾',
              content: '第六章学了状态管理：Zustand-like Store、70+ 自定义 Hooks、Ink 终端 UI。现在看一个关键的运行时挑战 — 上下文窗口会被用完。',
            },
            {
              type: 'explain',
              title: '上下文窗口的残酷现实',
              content:
                'Claude 的上下文窗口虽大（100K-1M tokens），但消耗极快：\n\n- System Prompt: ~5K tokens\n- 每轮对话: ~500-2K tokens\n- 每次工具调用: ~200-1K tokens\n- 工具结果: ~500-5K tokens\n\n30 分钟编码会话，轻松消耗 50K+ tokens。\n\n**不压缩 = 对话被截断 = 丢失上下文 = 错误的回答**',
              analogy: '就像你的桌子。工作一天后堆满文件。不整理就没地方放新东西。但整理时别把重要文件扔了。',
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
                '技术上压缩很容易（删消息就行），难的是**价值判断**：哪些信息对后续对话仍然重要？工具执行的因果链不能断，关键决策的上下文不能丢。',
            },
          ],
        },
        {
          id: 'compact-strategies',
          title: '四种压缩策略',
          cards: [
            {
              type: 'diagram',
              title: '四种压缩策略对比',
              description: '不同场景匹配不同的压缩方式',
              svg: compactStrategySvg,
            },
            {
              type: 'think-first',
              question: '在压缩时，如何保留工具执行的因果链？比如 Claude 先 grep 找到文件 → 读文件 → 编辑文件。如果删掉了 grep 的结果，Claude 还能理解为什么要编辑那个文件吗？',
              hints: '想想"决策点"和"执行细节"的区别。',
              reveal:
                '策略：**保留决策，删除细节**。\n\n- 保留：Claude 的推理（"我搜索了 X，发现了 Y，因此决定编辑 Z"）\n- 删除：工具的原始输出（grep 返回的 200 行匹配结果）\n- 替换为：ToolUseSummary（"调用了 GrepTool，在 3 个文件中找到匹配"）\n\nTombstone 标记"这里曾有一个工具调用"，保持消息序列完整性。',
            },
            {
              type: 'fill-blank',
              title: 'Auto-compact 触发逻辑',
              description: '补全自动触发压缩的条件。',
              language: 'typescript',
              template: `function shouldAutoCompact(
  messages: Message[],
  model: string
): boolean {
  const tokenCount = tokenCountWithEstimation(messages, model)
  const maxTokens = getModelContextWindow(model)
  const threshold = maxTokens * ___BLANK___  // 安全余量

  if (tokenCount > threshold) return true

  // 工具密集型：更早触发
  const toolRatio = countToolCalls(messages) / messages.length
  if (toolRatio > ___BLANK___ && tokenCount > threshold * 0.7) {
    return true // 工具多 = token 增长快
  }

  return false
}`,
              blanks: ['0.85', '0.6'],
              hints: ['预留 15% 安全余量', '工具调用占比超过多少时提前触发？'],
            },
          ],
        },
        {
          id: 'compact-implementation',
          title: '压缩实现细节',
          cards: [
            {
              type: 'code',
              title: 'Compact vs Microcompact',
              description: '两种主要压缩策略的区别在于精简程度。',
              language: 'typescript',
              code: `// Compact: 用 LLM 生成对话摘要
async function compact(messages: Message[]): Message[] {
  const summary = await llm.summarize(messages, {
    preserve: ['decisions', 'file_paths', 'errors'],
    discard: ['tool_raw_output', 'intermediate_steps'],
  })
  return [
    { type: 'compact_summary', content: summary },
    ...messages.slice(-3), // 保留最近 3 条原始消息
  ]
}

// Microcompact: 不用 LLM，直接精简
function microcompact(messages: Message[]): Message[] {
  return messages.map(m => {
    if (m.type === 'tool_result') {
      // 工具结果只保留前 200 字符
      return { ...m, content: truncate(m.content, 200) }
    }
    if (m.type === 'assistant' && m.toolUse) {
      // 助手消息中的工具调用保留，推理保留
      return m
    }
    return m
  })
}`,
            },
            {
              type: 'quiz',
              question: '为什么工具密集型会话要更早触发 compact（70% 阈值而非 85%）？',
              options: [
                '工具调用的 token 更贵',
                '工具调用产生大量输出，token 增长速度快，可能在两次检查之间就超限',
                '工具调用的结果质量更低',
                '纯粹是性能考虑',
              ],
              correctIndex: 1,
              explanation:
                '工具调用（尤其是 FileRead、Bash）可能一次性产生几千个 token。如果等到 85% 才 compact，下一次工具调用可能直接撑爆上下文。提前到 70% 留出缓冲。',
            },
            {
              type: 'task',
              title: '阅读源码：上下文压缩',
              instruction:
                '找到压缩系统的完整实现。\n\n**关键文件**：\n- `src/services/compact/` — 压缩服务目录\n- 搜索 `shouldAutoCompact` 或 `compact` 函数',
              checklist: [
                '找到四种压缩策略的实现',
                '找到自动触发的阈值配置',
                '找到 Tombstone 消息的创建逻辑',
                '找到 /compact 命令的入口',
              ],
              tip: '在 `src/commands/` 中搜索 compact 可以找到命令入口，然后追踪到服务层。',
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
              type: 'explain',
              title: '上章回顾',
              content: '第七章学了上下文压缩：四种策略（Compact/Microcompact/Snip/Tombstone）、自动触发机制、保留决策删除细节的原则。现在进入最高级的话题 — 多 Agent。',
            },
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
                '单个 Agent 的局限：\n\n1. **上下文窗口有限** — 大型任务的信息量可能超过一个 Agent 的窗口\n2. **串行执行** — 一个 Agent 一次只能做一件事\n3. **专业化** — 不同任务需要不同的工具集和提示\n\nAgent Swarm：\n- **Coordinator** 负责规划和调度\n- **Worker** 负责执行具体任务\n- 每个 Worker 有独立的上下文和 token 预算\n- Workers 可以**并行**工作',
            },
            {
              type: 'code',
              title: 'Worker 的工具集裁剪',
              description: 'Worker 不能使用所有工具。',
              language: 'typescript',
              code: `const ASYNC_AGENT_ALLOWED_TOOLS = [
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
              question: 'Worker 不能使用 TeamCreateTool。如果允许了会怎样？',
              hints: '想想递归和资源消耗。',
              reveal:
                '如果 Worker 能创建团队：\nCoordinator → Worker A → 新团队 → 新 Worker → 又创建团队 → ...\n\n导致：\n1. **无限递归** — Agent 树无限深\n2. **资源爆炸** — 每个 Agent 消耗 token（= 钱）\n3. **协调混乱** — 谁向谁报告？\n\n限制 Worker 不能创建团队确保了 **有限深度**和**清晰层级**。经典的"最小权限原则"。',
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
                '**1. SendMessage — 点对点消息**\n直接给某个 Agent 发消息。请求-响应。\n\n**2. TaskCreate/Update — 共享任务列表**\n所有 Agent 都能看到，自主认领任务。**黑板模式**（Blackboard Pattern）。\n\n**3. Worktree 隔离**\n每个 Worker 在独立的 git worktree 中工作。修改不冲突。完成后合并。',
            },
            {
              type: 'code',
              title: 'Agent 隔离配置',
              description: '每个 Worker 有独立的 token 预算、turn 限制和权限模式。',
              language: 'typescript',
              code: `const workerConfig: QueryEngineConfig = {
  maxBudgetUsd: parentBudget * 0.2,  // 最多 20% 预算
  maxTurns: 50,
  tools: ASYNC_AGENT_ALLOWED_TOOLS,   // 裁剪后的工具
  permissionMode: Math.min(
    parentMode,
    'plan'  // Worker 最宽松只能到 plan
  ),
  initialMessages: [],                // 独立消息历史
  cwd: worktreePath ?? parentCwd,     // 可能隔离的工作目录
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
                '任务列表作为共享"黑板"。Worker 完成任务后主动查看黑板上的未认领任务，自己认领。比 Coordinator 逐一分配更高效、更灵活。',
            },
            {
              type: 'fill-blank',
              title: 'Worker 权限继承',
              description: 'Worker 的权限模式不能超过父 Agent。',
              language: 'typescript',
              template: `// Worker 权限 = min(父权限, 上限)
const workerPermission = Math.min(
  parentMode,         // 不能比父 Agent 更宽松
  '___BLANK___'       // Worker 的权限上限
)

// 权限严格度排序:
// ___BLANK___ < plan < acceptEdits < auto < bypass
`,
              blanks: ['plan', 'default'],
              hints: ['Worker 最宽松到什么级别？', '最严格的权限模式'],
            },
          ],
        },
        {
          id: 'agent-bridge',
          title: 'IDE 桥接',
          cards: [
            {
              type: 'explain',
              title: 'Bridge — IDE 双向通信',
              content:
                'Claude Code 不只在终端运行，还能集成到 VS Code 和 JetBrains。\n\nBridge 系统实现双向通信：\n- **IDE → CLI**: 用户在 IDE 中的输入转发给 Claude Code\n- **CLI → IDE**: 工具调用结果、权限请求转发给 IDE\n- **JWT 认证**: Bridge 连接使用 JWT 确保安全\n- **权限代理**: 权限请求不在终端显示，而是在 IDE 中弹出',
            },
            {
              type: 'code',
              title: 'Bridge 消息协议',
              description: 'IDE 和 CLI 之间的通信基于消息。',
              language: 'typescript',
              code: `// Bridge 消息类型
type BridgeMessage =
  | { type: 'user_input'; content: string }
  | { type: 'tool_call'; tool: string; input: unknown }
  | { type: 'permission_request'; prompt: string; id: string }
  | { type: 'permission_response'; id: string; approved: boolean }
  | { type: 'tool_result'; content: string }
  | { type: 'assistant_response'; content: string }

// JWT 认证
async function authenticateBridge(token: string): Promise<boolean> {
  const payload = verifyJWT(token, BRIDGE_SECRET)
  return payload?.scope === 'bridge'
    && payload.exp > Date.now() / 1000
}`,
            },
            {
              type: 'task',
              title: '阅读源码：多 Agent 与 Bridge',
              instruction:
                '探索多 Agent 协调和 IDE 桥接的实现。\n\n**关键文件**：\n- `src/coordinator/coordinatorMode.ts` — Coordinator 设置\n- `src/tools/AgentTool/AgentTool.tsx` — 子 Agent 生成 (233KB)\n- `src/tools/SendMessageTool/` — Agent 间消息\n- `src/bridge/bridgeMain.ts` — Bridge 主循环\n- `src/bridge/jwtUtils.ts` — JWT 认证',
              checklist: [
                '找到 CLAUDE_CODE_COORDINATOR_MODE 的检查逻辑',
                '找到 ASYNC_AGENT_ALLOWED_TOOLS 的完整列表',
                '追踪 Worker 创建的完整流程',
                '找到 Bridge JWT 认证的实现',
              ],
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
          id: 'extension-overview',
          title: '三层扩展架构',
          cards: [
            {
              type: 'explain',
              title: '上章回顾',
              content: '第八章学了多 Agent 协调：Coordinator/Worker 模式、工具集裁剪、三种协调机制（消息/任务/Worktree）、IDE 桥接。现在看如何扩展 Claude Code 的能力。',
            },
            {
              type: 'diagram',
              title: '三层扩展架构',
              description: '从重到轻：Plugin（代码层）→ Skill（Prompt 层）→ MCP（协议层）',
              svg: extensionLayersSvg,
            },
            {
              type: 'code',
              title: 'Plugin Manifest — 插件的身份证',
              description: '每个 Plugin 声明它提供什么能力。',
              language: 'typescript',
              code: `type PluginManifest = {
  name: string
  version: string
  description: string
  commands?: Command[]       // 新命令
  skills?: PromptCommand[]   // 新技能
  hooks?: HooksSettings      // 新 Hook
  minClaudeCodeVersion?: string
}

// 加载时优雅降级
async function loadPlugin(path: string) {
  try {
    const manifest = await import(path)
    validateManifest(manifest)
    return manifest
  } catch (error) {
    // 插件失败不崩溃整个应用！
    logError(\`Plugin load failed: \${path}\`, error)
    return null
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
                'Skill 是**纯 Prompt 层**扩展，定义工作流模板。Plugin 是**代码层**扩展，可以注册全新的工具和命令，提供 Skill 无法实现的能力。',
            },
          ],
        },
        {
          id: 'mcp-integration',
          title: 'MCP 集成',
          cards: [
            {
              type: 'diagram',
              title: 'MCP 架构',
              description: 'Claude Code 作为 MCP Client，连接多个 MCP Server',
              svg: mcpArchSvg,
            },
            {
              type: 'explain',
              title: 'MCP 解决了什么问题？',
              content:
                'MCP 之前，每个 AI 工具都有自己的集成方式。同一个"搜索 GitHub Issues"的能力，要为每个平台写一遍。\n\n**MCP（Model Context Protocol）** 定义了统一标准：\n- 任何 MCP Server 可以被任何 MCP Client 使用\n- 工具发现是自动的\n- 资源缓存由 Client 统一管理\n\n写一次 MCP Server → 所有 AI 工具都能用。',
              analogy: 'USB 出现前，每种设备都有自己的接口。USB 统一标准后，一根线连一切。MCP 就是 AI 工具的"USB 标准"。',
            },
            {
              type: 'think-first',
              question: 'MCP 工具和内置工具对 Claude 来说有区别吗？Claude 怎么知道某个工具是内置的还是来自 MCP？',
              hints: '想想 Claude 看到的是什么 — 工具名、描述、输入 schema。',
              reveal:
                '对 Claude 来说，**完全没有区别**。\n\n内置工具和 MCP 工具传给 API 时格式相同：\n```json\n{ "name": "tool_name", "description": "...", "input_schema": {...} }\n```\n\nClaude 不知道也不需要知道工具来源。这是 MCP 设计的精妙之处 — **对 LLM 透明**。\n\n区别只在 Claude Code 内部：内置工具调用 TypeScript 函数，MCP 工具通过协议远程调用 Server。',
            },
            {
              type: 'fill-blank',
              title: 'MCP Server 连接流程',
              description: '启动时连接所有 MCP Server 并缓存资源。',
              language: 'typescript',
              template: `async function initMCPServers(
  config: MCPConfig
): Promise<MCPServerConnection[]> {
  const connections = await Promise.all(
    config.servers.map(async server => {
      const client = await connect(server.url)
      // 发现 Server 提供的 ___BLANK___
      const tools = await client.___BLANK___()
      // 预取所有 ___BLANK___
      const resources = await client.listResources()
      return { name: server.name, tools, resources }
    })
  )
  return connections.filter(Boolean)
}`,
              blanks: ['工具', 'listTools', '资源'],
              hints: ['Server 暴露什么能力？', 'MCP 标准的工具发现方法', 'Server 还提供什么？'],
            },
          ],
        },
        {
          id: 'skill-system',
          title: 'Skill 系统深入',
          cards: [
            {
              type: 'explain',
              title: 'Skill = 可复用的 Prompt 工作流',
              content:
                'Skill 是最轻量的扩展方式：\n\n- 存放在 `.claude/skills/` 目录\n- 本质是 Markdown 文件 + 元数据\n- 通过 `SkillTool` 调用\n- 支持 `context: fork`（在子 Agent 中执行）\n- Token 预算隔离\n\n适合场景：代码审查模板、测试策略、重构指南等**可复用的工作流**。',
            },
            {
              type: 'code',
              title: 'Skill 的 fork 执行模式',
              description: '当 Skill 标记为 fork 时，它在独立的子 Agent 中执行，不污染主会话。',
              language: 'typescript',
              code: `// Skill 执行
async function executeSkill(
  skill: SkillDefinition,
  context: ToolUseContext
) {
  if (skill.context === 'fork') {
    // Fork 模式：创建子 Agent 执行
    const agent = await spawnAgent({
      systemPrompt: skill.content,
      tools: skill.allowedTools ?? DEFAULT_TOOLS,
      maxBudgetUsd: 0.5,  // Token 预算隔离
      maxTurns: 20,
    })
    return await agent.run()
  }

  // 默认：注入到当前会话
  return { prompt: skill.content }
}`,
            },
            {
              type: 'task',
              title: '阅读源码：扩展系统',
              instruction:
                '探索插件、技能和 MCP 的实现。\n\n**关键文件**：\n- `src/plugins/` — 插件系统\n- `src/skills/` — 技能系统\n- `src/services/mcp/client.ts` — MCP 客户端\n- `src/services/mcp/config.ts` — MCP 配置加载',
              checklist: [
                '找到 Plugin Manifest 的 Zod schema',
                '找到 Skills 目录扫描和加载逻辑',
                '找到 MCP Server 连接的完整流程',
                '找到 MCP 工具注入到工具注册表的位置',
              ],
              tip: '搜索 `loadPlugin` 和 `loadSkillsDir` 作为入口。',
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
              title: '上章回顾',
              content: '第九章学了三层扩展架构：Plugin（代码层）、Skill（Prompt 层）、MCP（协议层）。最后一章看可观测性，然后做一个综合项目。',
            },
            {
              type: 'explain',
              title: '可观测性的三个支柱',
              content:
                'Claude Code 使用 OpenTelemetry 覆盖三个维度：\n\n**1. Traces（追踪）**\n跟踪请求从用户输入到最终响应的完整链路。每个工具调用是一个 Span。\n\n**2. Metrics（指标）**\nToken 用量、API 延迟、工具执行时间。用于监控和告警。\n\n**3. Events（事件）**\n用户操作、错误、功能使用。用于行为分析和排查。',
            },
            {
              type: 'code',
              title: 'Feature Flags — 运行时 vs 编译时',
              description: '两种机制互补。',
              language: 'typescript',
              code: `// ===== 编译时：Bun feature() =====
import { feature } from 'bun:bundle'
if (feature('EXPERIMENTAL_VOICE')) {
  enableVoiceInput()  // 不启用时代码不存在
}

// ===== 运行时：GrowthBook =====
import { isFeatureEnabled } from './services/analytics'
if (isFeatureEnabled('new_compact_strategy')) {
  useNewCompactStrategy()  // 可以做 A/B 测试
} else {
  useLegacyCompactStrategy()
}

// 互补：
// 编译时：消除大块代码（减小体积）
// 运行时：精细控制开关（灵活发布）`,
            },
            {
              type: 'quiz',
              question: '为什么 OpenTelemetry 要懒加载（~400KB）？',
              options: [
                'OpenTelemetry 有 bug，不稳定',
                '不是所有用户都需要可观测性，懒加载避免影响启动速度',
                'OpenTelemetry 需要网络连接',
                '版权问题',
              ],
              correctIndex: 1,
              explanation:
                '大部分用户不需要 OpenTelemetry（主要用于内部监控和企业用户）。400KB 在启动时加载显著增加冷启动时间。懒加载确保不需要的用户零代价。',
            },
            {
              type: 'fill-blank',
              title: '成本追踪',
              description: 'Claude Code 实时追踪 Token 消耗和 USD 成本。',
              language: 'typescript',
              template: `class CostTracker {
  private totalInputTokens = 0
  private totalOutputTokens = 0

  trackUsage(response: APIResponse) {
    this.totalInputTokens += response.usage.___BLANK___
    this.totalOutputTokens += response.usage.___BLANK___
  }

  get totalCostUSD(): number {
    return (
      this.totalInputTokens * ___BLANK___ +
      this.totalOutputTokens * OUTPUT_COST_PER_TOKEN
    )
  }
}`,
              blanks: ['input_tokens', 'output_tokens', 'INPUT_COST_PER_TOKEN'],
              hints: ['API 返回的输入 token 数字段', 'API 返回的输出 token 数字段', '输入的单价常量'],
            },
          ],
        },
        {
          id: 'capstone-project',
          title: '综合项目：设计 Mini Agent CLI',
          cards: [
            {
              type: 'explain',
              title: '你已经学了整个架构，现在来造一个！',
              content:
                '基于前 9 章知识，设计一个简化版 Agent CLI。\n\n**核心需求：**\n1. 流式 LLM 交互（AsyncGenerator）\n2. 3 个工具：ReadFile、WriteFile、RunCommand\n3. 工具编排：只读并行、写操作串行\n4. 基础权限：ask / allow / deny\n5. 简单 Token 计数和超限保护\n\n**不需要：**\n- Ink UI（用简单的 console）\n- MCP 集成\n- 多 Agent\n- 上下文压缩',
            },
            {
              type: 'task',
              title: '架构蓝图设计',
              instruction:
                '设计你的 Mini Agent CLI 架构。定义以下模块的接口和交互关系：\n\n1. **Tool Interface** — 参考 Ch3\n2. **QueryEngine** — 参考 Ch2\n3. **ToolOrchestrator** — 参考 Ch4\n4. **PermissionChecker** — 参考 Ch5\n5. **TokenCounter** — 参考 Ch7',
              checklist: [
                '定义 Tool 接口（name, inputSchema, isConcurrencySafe, execute）',
                '设计 QueryEngine 主循环（input → API → tools → results → loop）',
                '实现 ToolOrchestrator 分区逻辑',
                '实现 PermissionChecker 的 allow/deny/ask',
                '实现 TokenCounter 阈值告警',
                '画出模块间的依赖关系图',
              ],
              tip: '先定义接口，再实现。TypeScript 的类型系统帮你验证模块间连接是否正确。',
            },
            {
              type: 'ai-prompt',
              title: '让 AI 帮你搭建脚手架',
              scenario: '架构设计好了，让 AI 生成初始代码框架。',
              prompt:
                '基于以下设计，用 TypeScript 生成 Mini Agent CLI 的代码框架：\n\n1. Tool 接口：{ name, inputSchema (Zod), isConcurrencySafe(input), execute(input, context) }\n2. 三个工具：ReadFileTool, WriteFileTool, RunCommandTool\n3. ToolOrchestrator：分区策略（连续只读并行，写操作串行）\n4. QueryEngine：主循环（AsyncGenerator，流式工具执行）\n5. PermissionChecker：简单 allow/deny/ask\n\n要求：只要类型定义和函数签名，实现留空（TODO 注释）。使用 Zod v4。',
              explanation:
                '提示词明确了技术栈、架构模式、具体需求、输出要求。AI 生成的代码是可控的、可审查的脚手架。',
            },
            {
              type: 'think-first',
              question: '回顾整个课程：Claude Code 架构中最让你印象深刻的设计决策是什么？如果让你重新设计，你会改什么？',
              hints: '没有标准答案。想想并行预取、AST 安全检查、Agent Swarm、MCP 标准化、YOLO 分类器……',
              reveal:
                '一些值得反思的点：\n\n**最精妙的设计**：\n- `isConcurrencySafe(input)` — 基于输入判断并发安全\n- Tombstone 消息 — 软删除保留因果链\n- 编译时 + 运行时 Feature Flag 互补\n\n**可能的改进**：\n- main.tsx 803KB 太大，可以拆分\n- 6 种权限模式对用户可能太复杂\n- MCP 资源全量预取在 Server 很多时可能拖慢启动\n\n**核心启示**：\n生产级 AI Agent 的复杂性不在 LLM 调用本身，而在于围绕它构建的**安全、性能、可扩展性**基础设施。',
            },
          ],
        },
        {
          id: 'course-summary',
          title: '课程总结与进阶方向',
          cards: [
            {
              type: 'explain',
              title: '十章核心要点回顾',
              content:
                '**Ch1 启动优化**: 并行预取、懒加载、Dead Code Elimination\n**Ch2 Query Engine**: 消息类型、System Prompt 组装、流式交互\n**Ch3 工具系统**: Tool 接口、Zod schema、BashTool AST 安全\n**Ch4 工具编排**: 分区策略、并行/串行、有序输出\n**Ch5 权限系统**: 六种模式、四层防线、YOLO 分类器\n**Ch6 状态管理**: 自实现 Store、70+ Hooks、Ink 终端 UI\n**Ch7 上下文压缩**: 四种策略、自动触发、保留决策删除细节\n**Ch8 多 Agent**: Coordinator/Worker、黑板模式、隔离机制\n**Ch9 扩展系统**: Plugin/Skill/MCP 三层架构\n**Ch10 可观测性**: OpenTelemetry、Feature Flags、成本追踪',
            },
            {
              type: 'task',
              title: '进阶学习路线',
              instruction:
                '完成本课程后的进阶方向：\n\n**方向 1: 源码贡献**\n找到 Claude Code 的一个小 bug 或改进点，提交 PR。\n\n**方向 2: 构建自己的 Agent**\n用学到的架构模式，构建一个面向特定领域的 Agent CLI。\n\n**方向 3: MCP 生态**\n为你的常用工具/服务创建 MCP Server，扩展 Claude Code 能力。',
              checklist: [
                '选择一个进阶方向',
                '制定 2 周的学习计划',
                '完成 Mini Agent CLI 综合项目',
                '分享你的学习成果',
              ],
              tip: '最好的学习方式是造东西。选一个你真正会用到的场景来实践。',
            },
          ],
        },
      ],
    },
  ],
}
