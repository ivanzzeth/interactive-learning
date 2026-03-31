# Rust 交互式课程大纲

## 教学原则

1. **先教再考** — 每个测验只考已经讲过的内容
2. **先给成就感** — 前几课必须能跑出结果，建立信心
3. **先给动机再讲规则** — 不是"Rust有所有权"，而是"为什么需要所有权"
4. **刻意触发编译器错误** — 错误信息本身就是教学工具，但提前告诉学生"你会看到报错，这是正常的"
5. **类比先行，代码跟上** — 每个抽象概念先用生活类比，再看代码
6. **知识链完整** — 代码示例不使用尚未教过的语法（经过微软 RustTraining 对比审计后修复）

## 知识依赖图

```
注释 → 变量/类型 → 数组/元组 → 遍历 → 类型转换/格式化
                ↓
          函数/控制流（范围 ../..=）
                ↓
          所有权（动画图解：栈vs堆、Move）
                ↓
          引用/借用（动画图解）→ 切片（String vs &str）
                ↓
          结构体（#[derive]）→ 枚举 → match → Option
                ↓
          闭包（|x| x+1, 捕获）
                ↓
          错误处理（Result, ?, thiserror/anyhow）
                ↓
          集合（Vec, String, HashMap）→ 迭代器（map/filter/collect, turbofish）
                ↓
          泛型 → Trait → 生命周期（'a, 'static, 悬垂引用, 省略规则）
                ↓
          模块/Cargo → 最佳实践
                ↓
          AI 辅助开发（Spec-first, TDD+AI, CLAUDE.md/Skills）
                ↓
    ┌──────────┼──────────┐──────────┐
  智能指针    并发编程    Async/Await   实战项目
(Box/Rc/Arc) (线程/锁/通道) (tokio)    (CLI 工具)
                ↓
          Unsafe Rust · 宏
```

## 参考资料

- The Rust Programming Language (官方书)
- Rust by Example (官方示例集)
- Rustlings (官方练习)
- Microsoft RustTraining (7 本 bridge book，深度参考)

## 竞品对比（vs Microsoft RustTraining）

| 维度 | 我们 | 微软 |
|------|------|------|
| 交互性 | 可运行代码 + 测验 + 填空 + 动画 + AI 助手 | 静态 mdBook |
| AI 集成 | 13 个思维模板 + 苏格拉底模式 | 无 |
| 学习科学 | 间隔复习 + 前测 + 进度追踪 | 无 |
| 语言 | 中文 | 英文 |
| 零基础 | 不假设编程背景 | 假设已会 Python/C++/C# |
| 广度 | 11+4 章（核心+进阶） | 7 本书 100+ 章 |
| 深度 | 入门到中级 | 入门到专家 |

---

## 第一章：准备起飞 ✅

> 目标：消除恐惧，跑出第一个程序

- 1.1 什么是编程？（类比：菜谱）
- 1.2 Hello World（fn main, println!, 分号）
- 1.3 Cargo 初体验（new/build/run）
- 1.4 程序是怎么运行的（编译型 vs 解释型）
- 1.5 注释（`//` 单行, `///` 文档, `/* */` 多行）

---

## 第二章：变量与数据类型 ✅

> 目标：理解变量、类型、可变性、数组、遍历

- 2.1 变量是什么（let 绑定，类比：贴标签的盒子）+ 动画图解
- 2.2 数据类型（i32/f64/bool/char/&str，自动推断 vs 手动标注）
- 2.3 不可变 vs 可变（先教 mut → 再展示报错 → 解释为什么）+ 动画图解
- 2.4 常量与遮蔽（const vs let，shadowing 可以改类型）
- 2.5 数组与元组（[同类型] vs (不同类型)，索引，解构）
- 2.6 遍历数据（for..in, .iter(), .enumerate()）
- 2.7 类型转换与格式化（`as`, `{}` `{:?}` `{:.2}`）

---

## 第三章：函数与控制流 ✅

> 目标：能写出有逻辑的程序

- 3.1 函数基础（fn, 参数, 返回值 ->，从无参→有参→有返回值递进）
- 3.2 if / else（比较运算符, else if, if 是表达式）
- 3.3 循环（范围 `..` vs `..=`，loop+break, while, for）
- 3.4 综合练习（FizzBuzz + 温度转换，可运行）

---

## 第四章：所有权——Rust 的超能力 ✅

> 目标：理解为什么需要所有权，三条规则

- 4.1 内存是什么（栈 vs 堆，动画图解 stackHeapSvg）
- 4.2 为什么需要所有权（C手动/GC/Rust编译器，think-first 卡片）
- 4.3 所有权三条规则
- 4.4 移动 Move（动画图解 ownershipMoveSvg，填空题）
- 4.5 克隆 Clone 与复制 Copy

---

## 第五章：引用与借用 ✅

> 目标：不转移所有权也能使用数据

- 5.1 引用的概念（&, 动画图解 borrowingSvg，think-first 卡片，填空题）
- 5.2 可变引用（&mut, 一次一个）
- 5.3 借用规则总结
- 5.4 切片 Slice（String vs &str 关系详解，&[i32]，函数参数用 &str）

---

## 第六章：结构化数据 ✅

> 目标：用 struct 和 enum 组织数据

- 6.1 结构体 Struct（定义, 实例化, #[derive(Debug)] 解释）
- 6.2 给结构体加方法（impl, &self, 关联函数）
- 6.3 枚举 Enum（变体携带数据，think-first：为什么不用 struct？）
- 6.4 模式匹配 match（穷尽检查, _ 通配符）
- 6.5 **match 进阶 + if let / while let** 🆕（守卫条件, `@` 绑定, `if let` 简写, `while let` 循环）
- 6.6 Option：空值的安全处理（Some/None, 类比：盒子可能空）
- 6.7 **Option 方法链** 🆕（`map`/`and_then`/`unwrap_or`/`unwrap_or_else`, 链式处理避免嵌套 match）
- 6.8 闭包入门（`|x| x+1`, 捕获外部变量, 作为参数传递）

---

## 第七章：错误处理 ✅

> 目标：写出不会悄悄崩溃的程序

- 7.1 两种错误（panic! vs Result）
- 7.2 Result 枚举（Ok/Err, match 处理）
- 7.3 ? 运算符（对比 match 和 ? 的代码量）
- 7.4 何时 panic 何时 Result（unwrap 原型 vs Result 生产）

---

## 第八章：集合与字符串 ✅

> 目标：掌握最常用的数据容器

- 8.1 Vec 动态数组（vec![], push, 遍历, 安全访问 get()）
- 8.2 String 深入（String vs &str, push_str/+/format!, UTF-8, chars()）
- 8.3 HashMap（insert/get, entry().or_insert(), 遍历）
- 8.4 迭代器（.iter().map().filter().collect(), .sum(), turbofish ::<>，懒求值）
- 8.5 **闭包进阶** 🆕（Fn/FnMut/FnOnce trait, 闭包作为返回值, move 闭包）
- 8.6 **自定义 Iterator** 🆕（实现 Iterator trait, next() 方法, 自定义迭代器示例）

---

## 第九章：泛型、Trait 与生命周期 ✅

> 目标：写出可复用的代码

- 9.1 泛型（<T>, 函数/结构体，零开销抽象）
- 9.2 Trait：共享行为（定义, impl, 默认实现, 常用 stdlib trait）
- 9.3 **From/Into 与 Display** 🆕（From/Into trait 类型转换, Display 自定义格式化, Debug 自动派生 vs 手动实现）
- 9.4 **derive 宏详解** 🆕（Clone/Copy/PartialEq/Eq/Hash/Default, 什么时候用哪个, Copy vs Clone 区别）
- 9.5 Trait 约束（where 子句, impl Trait, 返回 impl Trait）
- 9.6 **dyn Trait 与 trait object** 🆕（动态分发 vs 静态分发, Box<dyn Trait>, &dyn Trait, 什么时候需要动态分发）
- 9.7 生命周期（为什么需要, 'a 标注, 悬垂引用示例, 'static, 省略规则, 什么时候需要手写）

---

## 第十章：项目组织与最佳实践 ✅

> 目标：写出专业的 Rust 代码

- 10.1 模块系统（mod/pub/use, 文件结构）
- 10.2 Cargo 进阶（Cargo.toml, features, cargo doc）
- 10.3 错误处理最佳实践（thiserror 库 / anyhow 应用）
- 10.4 代码风格与惯例（clippy, rustfmt, 命名规范, Builder/Newtype 模式）
- 10.5 **常用 crate 速览** 🆕（serde 序列化, tokio 异步运行时, clap CLI 参数, reqwest HTTP 客户端, tracing 日志, anyhow/thiserror 错误处理）

---

## 第十一章：AI 辅助 Rust 开发 ✅

> 目标：用 AI 写出生产级 Rust 代码

- 11.1 规格先行 Spec-First（好 vs 坏提示词对比, 复杂度预算）
- 11.2 TDD + AI（Google DORA 研究, 5 步 AI-TDD, 最危险陷阱：AI 改你的测试）
- 11.3 让 AI 写地道的 Rust（AI 常犯 5 错, ban list 技巧, crate 幻觉防御）
- 11.4 AI 代码审查与重构（多维度审查, 橡皮鸭调试）
- 11.5 安全陷阱（45% AI 代码有漏洞, Vibe Coding vs 工程化）
- 11.6 CLAUDE.md 与 Skills（项目级 AI 配置, 100-150 条规则预算）
- **参考**: Veracode 2025, Snyk, Anthropic 最佳实践, tyrchen/cursor-rust-rules

---

## 第十二章：智能指针 🔲 待实现

> 目标：理解堆上数据的高级管理

- 12.1 Box<T>（堆分配, 递归类型, 什么时候需要 Box）
- 12.2 Rc<T> 引用计数（多所有权, 只适合单线程）
- 12.3 RefCell<T> 内部可变性（运行时借用检查, Rc<RefCell<T>> 组合）
- 12.4 Arc<T> 原子引用计数（多线程版 Rc, Arc<Mutex<T>>）
- 12.5 Deref 与 Drop trait（自动解引用, 自定义清理）

---

## 第十三章：并发编程——无畏并发 🔲 待实现

> 目标：安全地编写多线程程序

- 13.1 线程基础（std::thread::spawn, join, move 闭包）
- 13.2 消息传递（mpsc::channel, 发送者/接收者模型）
- 13.3 共享状态（Mutex<T>, Arc<Mutex<T>>, 死锁预防）
- 13.4 Send 与 Sync trait（为什么 Rc 不能跨线程, Arc 可以）
- 13.5 实战：多线程文件处理器

---

## 第十四章：异步编程入门 🔲 待实现

> 目标：理解 async/await，能写基本的异步程序

- 14.1 为什么需要异步（同步阻塞 vs 异步非阻塞, I/O 密集场景）
- 14.2 async fn 与 .await（Future trait 直觉理解, 不深入 Pin）
- 14.3 tokio 运行时（#[tokio::main], spawn, select!）
- 14.4 异步实战：HTTP 客户端（reqwest 发请求, 并发请求多个 URL）
- 14.5 常见陷阱（async 闭包, Send 约束, 生命周期与 async）

---

## 第十五章：实战项目——命令行工具 🔲 待实现

> 目标：综合运用所有知识，完成一个真实项目

- 15.1 项目设计（需求分析, 模块划分, 类型设计）
- 15.2 CLI 参数解析（clap crate）
- 15.3 文件 I/O（读写文件, 错误处理实战）
- 15.4 数据处理（解析 CSV/JSON, 迭代器链式处理）
- 15.5 测试与发布（单元测试, 集成测试, cargo publish）
- **参考**: 微软 RustTraining CLI Task Manager 项目

---

## 附录（进阶选读）🔲 待实现

| 章 | 内容 | 优先级 |
|---|---|---|
| A. Unsafe Rust | 什么时候需要、怎么安全地使用、FFI 基础 | 中 |
| B. 宏 | macro_rules! 声明宏、#[derive] 过程宏入门 | 中 |
| C. 类型系统进阶 | Type State 模式、PhantomData、关联类型 | 低 |
| D. 工程实践 | CI/CD、Miri 检测、基准测试 (criterion)、供应链安全 | 低 |

---

## 实现状态总览

| 章 | 状态 | 课时 | 特色卡片 |
|---|------|------|---------|
| 1. 准备起飞 | ✅ | 5 | AI 提示词 |
| 2. 变量与数据类型 | ✅ | 7 | 动画图解, 填空题 |
| 3. 函数与控制流 | ✅ | 4 | FizzBuzz 可运行, 填空题 |
| 4. 所有权 | ✅ | 5 | 栈堆动画, Move 动画, think-first |
| 5. 引用与借用 | ✅ | 4 | 借用动画, think-first, 填空题 |
| 6. 结构化数据 | ✅ | 6 | think-first (enum vs struct), 闭包入门 |
| 7. 错误处理 | ✅ | 4 | AI 提示词 |
| 8. 集合与字符串 | ✅ | 4 | 迭代器, turbofish |
| 9. 泛型/Trait/生命周期 | ✅ | 4 | 悬垂引用, 'static, 省略规则 |
| 10. 项目组织 | ✅ | 4 | clippy, Builder/Newtype |
| 11. AI 辅助开发 | ✅ | 6 | Spec-first, TDD, CLAUDE.md |
| 12. 智能指针 | 🔲 | ~5 | — |
| 13. 并发编程 | 🔲 | ~5 | — |
| 14. 异步编程 | 🔲 | ~5 | — |
| 15. 实战项目 | 🔲 | ~5 | — |
| **已实现** | | **~53** | **~340 张卡片** |
| **计划中** | | **~20** | — |
