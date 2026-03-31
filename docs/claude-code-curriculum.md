# Claude Code 源码深度学习大纲

> 通过分析 Anthropic 官方 CLI 工具源码，学习生产级 AI Agent 系统的设计与实现

## 学习目标

- 理解生产级 AI Agent 的完整架构
- 掌握流式 LLM 交互与工具编排模式
- 学习细粒度权限系统与安全设计
- 理解多 Agent 协调与状态管理
- 掌握 React/Ink 终端 UI 开发

---

## Module 1: 启动与入口 — 极致的启动性能优化

**源码**: `src/main.tsx`, `src/entrypoints/`, `src/bootstrap/`

### 1.1 并行预取模式
- MDM 配置读取与 Keychain 预取作为副作用在模块求值前触发
- Bun 的 `feature()` API 实现编译时 Dead Code Elimination
- **核心问题**: 为什么在 `import` 之前就开始 I/O？

### 1.2 懒加载策略
- OpenTelemetry (~400KB)、gRPC (~700KB) 通过动态 `import()` 延迟加载
- **对比**: 静态导入 vs 动态导入的启动时间影响
- `profileCheckpoint()` 启动性能打点

### 1.3 配置加载管道
- 多源配置合并: user → project → local → CLI → policy
- Zod Schema 校验 (`src/schemas/`)
- 安全配置 vs 非安全配置的分阶段加载

**练习**: 追踪从 `bun run claude` 到第一次 API 调用的完整启动链路

---

## Module 2: 核心循环 — Query Engine 与流式处理

**源码**: `src/QueryEngine.ts` (~46K lines), `src/query.ts` (~68K lines)

### 2.1 消息规范化
- 内部消息类型: User / Assistant / Attachment / Progress / Tombstone / ToolUseSummary
- `normalizeMessagesForAPI()` — 剥离内部字段后发给 API
- 消息签名去重 (`stripSignatureBlocks()`)

### 2.2 System Prompt 构建
- 基础 prompt + CLAUDE.md 注入 + Memory 注入 + 用户上下文 + 权限上下文
- `fetchSystemPromptParts()` 的组装逻辑
- **设计模式**: 多来源 prompt 的优先级与合并策略

### 2.3 流式 API 调用
- `BetaMessageStreamParams` 流式协议
- Content Block → 追加到响应
- Tool Call → 提取并校验
- Stop Reason → 判断是否终止
- **Generator 模式**: `AsyncGenerator<MessageUpdate, void>` 的背压处理

### 2.4 Token 预算管理
- 快速估算 vs 精确计数的权衡
- 每轮 Token 追踪与超限提前退出
- Auto-compact 触发时机

**练习**: 画出一次完整的 query → stream → tool call → tool result → re-query 的序列图

---

## Module 3: 工具系统 — 可组合的 Agent 能力

**源码**: `src/Tool.ts`, `src/tools.ts`, `src/tools/`

### 3.1 Tool 接口设计
```typescript
type Tool = {
  name: string
  isEnabled(): boolean
  inputSchema: ZodSchema          // 类型安全的输入校验
  canUseInMode?(mode): boolean    // 权限模式感知
  isConcurrencySafe?(input): boolean  // 并发安全标记
  execute(input, context): Promise<ToolResult>
  setJSX?: SetToolJSXFn           // 可选的进度 UI
}
```
- **为什么 `isConcurrencySafe` 接收 input?** — 同一工具不同输入可能有不同并发语义

### 3.2 工具注册与特性门控
- `getAllBaseTools()` — 40+ 工具的条件注册
- Feature flags 控制工具可见性
- MCP 工具动态注入

### 3.3 关键工具深度分析

#### BashTool (160KB) — 最复杂的工具
- AST 解析 Bash 命令 (`bash/ast.ts`)
- 沙箱模式 (sandbox vs unsandbox)
- 破坏性命令检测与警告
- 后台任务管理
- **安全层**: 命令解析 → 权限检查 → 路径验证 → 只读约束

#### AgentTool (233KB) — 多 Agent 核心
- 子 Agent 生成与生命周期管理
- 工具集裁剪 (`ASYNC_AGENT_ALLOWED_TOOLS`)
- Token 预算隔离
- 跨 Agent 消息传递 (`SendMessageTool`)
- Worktree 隔离模式

#### FileEditTool — 精确编辑
- 基于字符串替换而非行号（为什么？）
- 唯一性校验 — `old_string` 必须在文件中唯一
- `replace_all` 模式
- 与 FileReadTool 的前置依赖关系

**练习**: 实现一个自定义 Tool，包含输入校验、权限声明、并发安全标记

---

## Module 4: 工具编排 — 并发与串行的智能调度

**源码**: `src/services/tools/toolOrchestration.ts`, `StreamingToolExecutor.ts`

### 4.1 分区策略
```
输入: [read1, read2, write1, read3]
分区: [[read1, read2], [write1], [read3]]
执行: read1 & read2 并行 → write1 串行 → read3 串行
```
- 连续只读工具 → 并行 (并发上限 = 10)
- 写操作 → 独占锁
- **为什么不用读写锁?** — 分析 Agent 场景下的并发语义

### 4.2 流式工具执行器
- 结果按序缓冲，可用时立即 yield
- Bash 工具错误时中止兄弟进程
- **设计权衡**: 有序输出 vs 最低延迟

### 4.3 工具结果处理
- 结果封装为 UserMessage 回传给 API
- 进度 JSX 更新
- 错误恢复策略

**练习**: 设计一个场景：5 个工具调用，分析编排器如何分区并执行

---

## Module 5: 权限系统 — 安全第一的 Agent 设计

**源码**: `src/types/permissions.ts`, `src/utils/permissions/`, `src/hooks/useCanUseTool.tsx`

### 5.1 权限模式
```
default    — 每次都询问用户
acceptEdits — 自动接受文件编辑
plan       — 风险操作前询问
auto       — ML 分类器自动审批
bypassPermissions — 跳过检查（危险）
dontAsk    — 拒绝且不再询问
```

### 5.2 权限规则层级
- 来源: userSettings → projectSettings → localSettings → CLI → session
- 行为: allow / deny / ask
- 内容匹配: 文件路径 pattern、命令类型

### 5.3 Bash 安全深度防线
- **第一层**: AST 解析命令结构
- **第二层**: 命令类型分类 (只读/写入/破坏性)
- **第三层**: 路径权限校验
- **第四层**: ML 分类器 (`yoloClassifier.ts`)
- **核心问题**: 为什么不能只用正则匹配？

### 5.4 YOLO 分类器
- 基于特征的自动审批模型
- 训练数据来源与特征工程
- False positive 的代价分析

**练习**: 分析 `bashPermissions.ts` 中如何处理管道命令 `cat file | grep pattern | wc -l`

---

## Module 6: 状态管理 — React 模式在 CLI 中的应用

**源码**: `src/state/`, `src/context/`, `src/hooks/`

### 6.1 Zustand-like Store
```typescript
type AppStateStore = {
  getState(): AppState       // 100+ 字段
  setState(updater): void    // 不可变更新
  subscribe(listener): () => void  // 订阅模式
}
```
- 为什么不用 Redux? — 分析 CLI 场景的状态复杂度

### 6.2 React Context 层
- `AppStoreContext` — 全局状态
- `VoiceProvider` — 条件加载
- `MailboxProvider` — Agent 间消息

### 6.3 自定义 Hooks (70+)
- `useCanUseTool()` — 权限检查 (40KB)
- `useGlobalKeybindings()` — 键绑定
- `useReplBridge()` — IDE 桥接
- **模式**: 业务逻辑封装在 Hook 中，组件只做渲染

### 6.4 Ink 终端 UI
- React 组件渲染到终端
- ~140 个组件的组织方式
- 流式内容的增量渲染
- **对比**: Web React vs Terminal Ink 的差异

**练习**: 追踪一个权限请求从触发到用户看到 prompt 的完整 React 渲染链路

---

## Module 7: 上下文压缩 — 长对话的生命线

**源码**: `src/services/compact/`

### 7.1 为什么需要压缩
- Context Window 上限 vs 长会话
- Token 成本控制
- 历史信息的价值衰减

### 7.2 压缩策略
- **Compact** — 对话摘要替换原始消息
- **Microcompact** — 工具密集型会话的激进压缩
- **Snip** — 基于重要性的选择性裁剪
- **Tombstone** — 标记已移除消息

### 7.3 自动触发机制
- Token 阈值触发
- 主动 `/compact` 命令
- **核心问题**: 压缩时如何保留工具执行的因果链？

**练习**: 设计一个场景：20 轮对话后触发 compact，分析哪些信息被保留、哪些被丢弃

---

## Module 8: 多 Agent 协调 — Agent Swarm 架构

**源码**: `src/coordinator/`, `src/tools/AgentTool/`, `src/tools/SendMessageTool/`

### 8.1 Coordinator 模式
- 中心 Agent 编排 Worker Agent
- 环境变量 `CLAUDE_CODE_COORDINATOR_MODE` 激活
- 工具集裁剪 — Worker 只能用受限工具

### 8.2 Agent 通信
- `SendMessageTool` — 点对点消息
- `TeamCreateTool` — 创建 Agent 团队
- `TaskCreate/Update` — 共享任务列表
- **设计模式**: 黑板架构 (Blackboard Pattern) in Agent Swarm

### 8.3 Agent 隔离
- Token 预算隔离
- Worktree 文件系统隔离
- 权限模式继承与覆盖
- **核心问题**: 子 Agent 的错误如何传播到父 Agent？

### 8.4 IDE 桥接 (`src/bridge/`)
- VS Code / JetBrains 双向通信
- JWT 认证
- 权限请求通过 Bridge 转发到 IDE

**练习**: 设计一个 3-Agent 协作场景（研究 + 实现 + 测试），画出消息流和任务依赖

---

## Module 9: 扩展系统 — Plugin / Skill / MCP

**源码**: `src/plugins/`, `src/skills/`, `src/services/mcp/`

### 9.1 Plugin 系统
- 类型: Bundled / Marketplace / User
- 动态加载 + 错误恢复
- Plugin Manifest 结构
- 版本化目录管理

### 9.2 Skill 系统
- Skill = 可复用的 Prompt 工作流
- 从 `.claude/skills/` 目录加载
- `context: 'fork'` — 子 Agent 中执行
- Token 预算隔离

### 9.3 MCP (Model Context Protocol) 集成
- 标准化的工具/资源发现协议
- Server 连接管理与资源缓存
- 会话启动时预取所有资源
- 官方 MCP Server 注册表
- **核心问题**: MCP 如何解决 Tool 生态碎片化？

**练习**: 创建一个简单的 MCP Server，注册到 Claude Code 并验证工具调用

---

## Module 10: 可观测性与调试

**源码**: `src/services/analytics/`, `src/utils/debug.ts`, `src/commands/doctor/`

### 10.1 OpenTelemetry 集成
- 懒加载 (~400KB)
- Span/Meter/Event 三维度
- 自定义 Exporter

### 10.2 Feature Flags (GrowthBook)
- 运行时特性门控
- A/B 测试支持
- 与编译时 `feature()` 的互补关系

### 10.3 成本追踪
- 实时 Token 计数
- USD 成本估算
- 每工具/每轮细粒度统计

### 10.4 /doctor 诊断
- 环境检测
- 依赖验证
- 配置健康检查

**练习**: 使用 `/cost` 和 `/context` 分析一次复杂会话的资源消耗

---

## 附录: 关键文件索引

| 模块 | 关键文件 | 规模 |
|------|---------|------|
| 入口 | `src/main.tsx` | 803KB |
| Query 引擎 | `src/QueryEngine.ts` + `src/query.ts` | 46K + 68K lines |
| 工具类型 | `src/Tool.ts` | 29K lines |
| BashTool | `src/tools/BashTool/BashTool.tsx` | 160KB |
| AgentTool | `src/tools/AgentTool/AgentTool.tsx` | 233KB |
| 权限 | `src/utils/permissions/bashPermissions.ts` | 98KB |
| Bash 安全 | `src/utils/permissions/bashSecurity.ts` | 102KB |
| 权限 Hook | `src/hooks/useCanUseTool.tsx` | 40KB |
| 状态 | `src/state/AppStateStore.ts` | - |
| 工具编排 | `src/services/tools/toolOrchestration.ts` | - |
| Compact | `src/services/compact/` | - |
| MCP | `src/services/mcp/` | - |
| 协调器 | `src/coordinator/coordinatorMode.ts` | - |
| Bridge | `src/bridge/bridgeMain.ts` | - |

---

## 推荐学习路径

```
Week 1-2: Module 1-3 (入口 + 核心循环 + 工具系统)
Week 3:   Module 4-5 (工具编排 + 权限安全)
Week 4:   Module 6-7 (状态管理 + 上下文压缩)
Week 5:   Module 8-9 (多 Agent + 扩展系统)
Week 6:   Module 10 + 综合项目
```

**综合项目**: 基于学到的架构模式，设计并实现一个简化版 Agent CLI，包含：
- 流式 LLM 交互
- 3 个自定义工具（含并发控制）
- 基础权限系统
- 上下文压缩
