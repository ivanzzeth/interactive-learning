import type { Book } from '../types'
import { variableBindingSvg, mutabilitySvg, ownershipMoveSvg, borrowingSvg, stackHeapSvg } from './diagrams'

export const rustBook: Book = {
  id: 'rust',
  title: 'Rust 入门',
  description: '从零开始学 Rust，用生活类比理解所有权、借用等核心概念',
  icon: '🦀',
  color: '#CE422B',
  chapters: [
    // =============================================
    // 第一章：准备起飞
    // =============================================
    {
      id: 'ch1-start',
      title: '第一章：准备起飞',
      lessons: [
        // --- 1.1 什么是编程？ ---
        {
          id: 'what-is-programming',
          title: '什么是编程？',
          cards: [
            {
              type: 'explain',
              title: '编程是什么？',
              content:
                '你有没有按过微波炉上的按钮？\n\n比如：选"加热"→ 设定 2 分钟 → 按开始。\n\n恭喜，你刚刚就在"编程"了！\n\n编程就是：写出一步一步的指令，让机器按你说的做。',
            },
            {
              type: 'explain',
              title: '程序 = 菜谱',
              content:
                '一份菜谱写着：\n\n1. 打两个鸡蛋\n2. 加盐搅拌\n3. 热锅倒油\n4. 倒入蛋液翻炒\n\n程序也一样，就是写给电脑看的"菜谱"。\n\n电脑会严格按照你写的顺序，一步一步执行。',
            },
            {
              type: 'explain',
              title: '为什么学 Rust？',
              content:
                'Rust 是一门编程语言，特别擅长写又快又安全的程序。\n\nFirefox 浏览器、Dropbox、Cloudflare 都在用它。\n\n它连续多年被开发者评为"最喜爱的编程语言"。\n\n别担心，我们会一小步一小步地学，每次只学一点点！',
            },
            {
              type: 'quiz',
              question: '编程是什么？',
              options: [
                '一种只有天才才能做的事',
                '写出一步步的指令，让电脑按你说的做',
                '修电脑',
                '设计电脑硬件',
              ],
              correctIndex: 1,
              explanation:
                '编程就是写指令给电脑。就像写菜谱告诉厨师怎么做菜一样，你写代码告诉电脑该做什么。任何人都可以学！',
            },
          ],
        },

        // --- 1.2 Hello World ---
        {
          id: 'hello-world',
          title: 'Hello World',
          cards: [
            {
              type: 'explain',
              title: '你的第一个程序',
              content:
                '学编程的传统是：第一个程序让电脑在屏幕上显示 "Hello, World!"。\n\n这个传统从 1978 年开始，几乎所有程序员的第一步都是这个。\n\n现在，轮到你了！',
            },
            {
              type: 'explain',
              title: '先认识三个东西',
              content:
                '在看代码之前，先记住三样东西：\n\n**1️⃣ `fn main() { }`** — 程序的"大门"，电脑从这里开始执行\n\n**2️⃣ `println!("文字")`** — 让电脑在屏幕上显示引号里的文字\n\n**3️⃣ 每条指令后面要加分号 `;`** — 就像中文句子结尾的句号一样',
            },
            {
              type: 'code',
              title: '运行你的第一个程序！',
              description:
                '下面就是一个完整的 Rust 程序。\n\n它只做一件事：在屏幕上显示 "Hello, World!"\n\n点击右上角的 ▶ 运行 按钮，看看会出现什么！',
              language: 'rust',
              runnable: true,
              code: 'fn main() {\n    println!("Hello, World!");\n}',
            },
            {
              type: 'code',
              title: '试试显示别的文字',
              description:
                '这次我们让电脑显示中文。\n\n注意看：`println!` 后面引号里的文字变了。\n\n点击运行，看看效果！',
              language: 'rust',
              runnable: true,
              code: 'fn main() {\n    println!("你好，世界！");\n    println!("我正在学 Rust！");\n}',
            },
            {
              type: 'ai-prompt',
              title: '让 AI 帮你写 Hello World',
              scenario: '学完了 println! 和 fn main()，现在试试让 AI 帮你写一个更花哨的 Hello World 程序。',
              prompt: '用 Rust 写一个程序，在屏幕上用 println! 显示一个欢迎界面，包含：一行分隔线、一行欢迎语、当前 Rust 版本信息、再一行分隔线。要求代码简洁、使用 fn main() 作为入口。',
              explanation: '提示词中明确了语言（Rust）、用什么工具（`println!`）、具体要显示什么内容、代码风格要求（简洁）。越具体，AI 写出的代码越符合你的期望。',
            },
            {
              type: 'quiz',
              question: '在刚才的程序中，println! 的作用是什么？',
              options: [
                '在屏幕上显示引号里的文字',
                '创建一个新文件',
                '连接网络',
                '关闭程序',
              ],
              correctIndex: 0,
              explanation:
                '`println!` 就是"在屏幕上显示一行文字"。你在引号里写什么，它就显示什么。这是最基础也最常用的指令之一！',
            },
          ],
        },

        // --- 1.3 Cargo 初体验 ---
        {
          id: 'cargo',
          title: 'Cargo 初体验',
          cards: [
            {
              type: 'explain',
              title: 'Cargo：你的项目管家',
              content:
                '写一个 Hello World 很简单，但真正的项目会有很多文件、很多代码。\n\nCargo 是 Rust 自带的"项目管家"，帮你：\n\n- 📁 创建项目（帮你建好文件夹结构）\n- 🔨 编译代码（把你的代码变成电脑能运行的程序）\n- ▶️ 运行程序\n- 📦 管理依赖（别人写好的代码，你可以直接用）',
              analogy:
                '如果写代码是做菜，那 Cargo 就是帮你备好厨房、摆好食材、洗好锅的助手。你只管专心炒菜。',
            },
            {
              type: 'explain',
              title: '三个最常用的命令',
              content:
                '你只需要记住三个命令：\n\n**1️⃣ `cargo new 项目名`** — 创建一个新项目（自动建好所有文件）\n\n**2️⃣ `cargo build`** — 编译你的代码（检查有没有错误）\n\n**3️⃣ `cargo run`** — 编译并运行（最常用！一步到位）\n\n以后写 Rust，基本上就是不停地 `cargo run`。',
            },
            {
              type: 'ai-prompt',
              title: '让 AI 帮你初始化项目',
              scenario: '你想创建一个新的 Rust 项目并添加一些常用依赖。与其自己查文档，不如让 AI 帮你搞定。',
              prompt: '我要用 Rust 创建一个命令行工具项目叫 my-tool。请给出完整步骤：用 cargo 创建项目，然后在 Cargo.toml 中添加 clap（命令行参数解析）依赖，并写一个能接受 --name 参数打印问候语的最小示例。',
              explanation: '提示词说清了项目名、项目类型（命令行工具）、需要的依赖（clap）、具体功能（接受参数打印问候）。AI 会帮你生成完整可运行的项目结构。',
            },
            {
              type: 'quiz',
              question: '想要创建一个新的 Rust 项目，应该用哪个命令？',
              options: [
                'cargo run',
                'cargo build',
                'cargo new 项目名',
                'cargo start',
              ],
              correctIndex: 2,
              explanation:
                '`cargo new` 会帮你创建一个新项目，自动建好所有需要的文件和文件夹。创建完之后，再用 `cargo run` 来运行。',
            },
          ],
        },

        // --- 1.4 程序是怎么运行的 ---
        {
          id: 'how-programs-run',
          title: '程序是怎么运行的',
          cards: [
            {
              type: 'explain',
              title: '电脑看不懂中文，也看不懂 Rust',
              content:
                '电脑只能理解 0 和 1（开和关，像开关一样）。\n\n那我们写的 Rust 代码，电脑怎么能看懂呢？\n\n答案是：需要一个"翻译官"来把 Rust 代码翻译成 0 和 1。\n\n这个翻译官就叫做——编译器（compiler）。',
            },
            {
              type: 'explain',
              title: '编译型 vs 解释型',
              content:
                '不同的编程语言用不同的翻译方式：\n\n**📖 编译型（Rust、C）：**\n\n先把整本书翻译完，出版成一本新书。之后看新书就行，不再需要翻译官。运行速度快，但翻译需要等一会儿。\n\n**🎤 解释型（Python、JavaScript）：**\n\n请一个同声传译，读一句翻一句。马上就能开始，但每次运行都需要翻译官在场。',
            },
            {
              type: 'explain',
              title: 'Rust 编译器：翻译官 + 检查员',
              content:
                'Rust 的编译器特别严格。它不只是翻译，还会帮你检查代码有没有问题。\n\n就像一个认真的编辑——你交稿子给他，他会标出所有错别字和语法错误，直到你改对了才让你出版。\n\n这就是为什么 Rust 程序一旦编译通过，就很少出 bug。编译器已经帮你提前抓住了大部分问题！',
            },
            {
              type: 'ai-prompt',
              title: '让 AI 帮你看懂编译报错',
              scenario: '写 Rust 代码时遇到编译器报错是家常便饭。与其自己死磕，不如让 AI 帮你翻译报错信息。',
              prompt: '我在写 Rust 代码时遇到了这个编译报错：\n[把报错信息粘贴在这里]\n请用简单的中文解释这个错误是什么意思，为什么会出现，以及怎么修复。',
              explanation: '这是一个"万能模板"——以后遇到任何 Rust 编译报错，都可以直接把报错信息粘贴给 AI，让它帮你翻译成人话。AI 特别擅长解读编译器错误！',
            },
            {
              type: 'quiz',
              question: 'Rust 的编译器做了什么？',
              options: [
                '只是把代码翻译成电脑能懂的语言',
                '翻译代码，同时检查代码有没有问题',
                '运行代码',
                '连接网络下载东西',
              ],
              correctIndex: 1,
              explanation:
                'Rust 编译器不只翻译，还会严格检查你的代码。如果有问题，它会告诉你哪里错了、怎么改。这是 Rust 安全的秘诀之一！',
            },
          ],
        },

        // --- 1.5 注释 ---
        {
          id: 'comments',
          title: '注释——给代码写笔记',
          cards: [
            {
              type: 'explain',
              title: '什么是注释？',
              content:
                '代码是写给电脑看的，但有时候你也需要写一些**给人看的笔记**——解释这段代码是干嘛的，或者提醒自己注意某件事。\n\n这种笔记叫做**注释**。电脑会完全跳过注释，注释不影响程序运行。\n\n最常用的是 `//` 单行注释：\n\n```rust\n// 这是一行注释，电脑会跳过这里\nlet x = 5; // 也可以写在代码后面\n```\n\n在编辑器里，注释通常显示为**灰色**，一眼就能区分。',
            },
            {
              type: 'explain',
              title: '其他注释写法',
              content:
                'Rust 还有两种注释写法：\n\n**`///` 文档注释**——写在函数或结构体前面，可以自动生成文档（就像说明书）：\n\n```rust\n/// 把两个数相加，返回结果\nfn add(a: i32, b: i32) -> i32 {\n    a + b\n}\n```\n\n**`/* */` 多行注释**——可以跨越多行：\n\n```rust\n/* 这是一段\n   跨越多行的注释 */\n```\n\n日常写代码用 `//` 最多；`///` 用于给别人用的公开函数写说明；`/* */` 偶尔用于临时注释掉一大段代码。',
            },
            {
              type: 'quiz',
              question: '注释有什么用？',
              options: [
                '让程序运行更快',
                '给代码添加说明，电脑会跳过，只给人看',
                '声明变量',
                '导入外部库',
              ],
              correctIndex: 1,
              explanation:
                '注释是写给人看的笔记，电脑会完全忽略注释内容。好的注释能帮助你（和团队）快速理解代码的意图，是良好编程习惯的一部分。',
            },
          ],
        },
      ],
    },

    // =============================================
    // 第二章：变量与数据类型
    // =============================================
    {
      id: 'ch2-variables',
      title: '第二章：变量与数据类型',
      lessons: [
        // --- 2.1 变量是什么 ---
        {
          id: 'what-is-variable',
          title: '变量是什么',
          cards: [
            {
              type: 'explain',
              title: '数据需要一个"名字"',
              content:
                '程序经常需要记住一些数据。比如：\n\n- 玩家的分数是 100\n- 用户的名字是 "小明"\n- 今天的温度是 26.5\n\n为了方便使用这些数据，我们给它们起个名字——这就是"变量"。',
              analogy:
                '变量就像一个贴了标签的盒子。\n\n标签是名字（比如 "score"），盒子里装的是值（比如 100）。\n\n以后你说"把 score 拿出来"，电脑就知道你要的是 100。',
            },
            {
              type: 'diagram',
              title: '看看变量长什么样',
              description: '当你写 `let score = 100;` 的时候，就是给数据 100 贴上了 `score` 这个标签。看下面的动画：',
              svg: variableBindingSvg,
            },
            {
              type: 'code',
              title: '用 let 创建变量',
              description:
                '在 Rust 中，用 `let` 来创建变量。\n\n下面的代码做了两件事：\n1. 创建一个叫 `score` 的变量，存入数字 100\n2. 用 `println!` 把它显示出来\n\n注意 `{}` 是一个占位符，运行时会被 `score` 的值替换。\n\n点击运行看看！',
              language: 'rust',
              runnable: true,
              code: 'fn main() {\n    let score = 100;\n    println!("你的分数是: {}", score);\n}',
            },
            {
              type: 'code',
              title: '一个变量不够？那就多创建几个！',
              description:
                '你可以创建很多个变量，每个存不同的数据。\n\n下面创建了三个变量，然后把它们全部显示出来。',
              language: 'rust',
              runnable: true,
              code: 'fn main() {\n    let name = "小明";\n    let age = 18;\n    let city = "北京";\n    println!("{}，{} 岁，来自 {}", name, age, city);\n}',
            },
            {
              type: 'ai-prompt',
              title: '让 AI 帮你练习变量',
              scenario: '你已经学会了用 let 创建变量和用 {} 占位符显示数据。现在让 AI 生成一个更复杂的练习。',
              prompt: '用 Rust 写一个程序，用 let 创建 5 个变量来描述一个商品（名称、价格、库存数量、是否打折、折扣率），然后用 println! 把这些信息格式化显示成一个好看的商品卡片。要求代码简洁，只用我们学过的 let 和 println!。',
              explanation: '提示词中明确了"只用学过的知识"，这样 AI 不会用你还没学的高级语法。同时给了具体的场景（商品卡片），比"随便写个例子"更能产出有用的代码。',
            },
            {
              type: 'fill-blank',
              title: '填写 let 变量声明',
              description: '根据所学知识，填入正确的关键词和变量名，完成这段 Rust 代码。',
              template: 'fn main() {\n    ___BLANK___ score = 100;\n    println!("分数: {}", ___BLANK___);\n}',
              blanks: ['let', 'score'],
              language: 'rust',
              hints: ['用什么关键词创建变量？', '占位符 {} 里要放变量名'],
            },
            {
              type: 'quiz',
              question: '下面的代码中，`score` 的值是多少？\n\n```rust\nlet score = 100;\n```',
              options: ['score', '100', 'let', '不知道'],
              correctIndex: 1,
              explanation:
                '`let score = 100;` 的意思是"创建一个叫 `score` 的变量，把 100 存进去"。所以 `score` 的值就是 100。',
            },
          ],
        },

        // --- 2.2 数据类型 ---
        {
          id: 'data-types',
          title: '数据类型',
          cards: [
            {
              type: 'explain',
              title: '不同的数据有不同的"类型"',
              content:
                '现实生活中，数字、文字、对错是不同种类的信息。\n\n编程也一样！Rust 把数据分成不同的类型：\n\n- 🔢 整数 — 没有小数点的数，如 1、42、-10\n- 🔢 小数 — 有小数点的数，如 3.14、9.99\n- ✅ 布尔 — 只有两个值：`true`（对）和 `false`（错）\n- 🔤 字符 — 一个字，如 `\'A\'` 或 `\'🦀\'`（用单引号）\n- 📝 字符串 — 一段文字，如 `"Hello"`（用双引号）',
              analogy:
                '就像超市货架分区：水果区放水果，饮料区放饮料。不同类型的数据要"放对地方"，Rust 才能正确处理它们。',
            },
            {
              type: 'code',
              title: '看看不同类型的数据',
              description:
                '下面创建了 5 种不同类型的变量。\n\nRust 非常聪明，大多数时候它能自动判断变量是什么类型。\n\n点击运行，看看每种数据显示出来是什么样子。',
              language: 'rust',
              runnable: true,
              code: 'fn main() {\n    let age = 25;\n    let price = 9.99;\n    let is_student = true;\n    let grade = \'A\';\n    let name = "小明";\n\n    println!("名字: {}", name);\n    println!("年龄: {} 岁", age);\n    println!("价格: {} 元", price);\n    println!("是学生吗: {}", is_student);\n    println!("成绩等级: {}", grade);\n}',
            },
            {
              type: 'explain',
              title: '也可以手动告诉 Rust 类型',
              content:
                '虽然 Rust 能自动判断，但你也可以在变量名后面用冒号 `:` 标注类型：\n\n```rust\nlet age: i32 = 25;\n```\n\n其中 `i32` 表示"32位整数"。\n\n常见类型名：\n- `i32` — 整数\n- `f64` — 小数\n- `bool` — 布尔值\n- `char` — 字符\n\n新手阶段不用记这些，Rust 会帮你自动推断。知道有这回事就行！',
            },
            {
              type: 'ai-prompt',
              title: '让 AI 帮你理解类型',
              scenario: '数据类型有点多记不住？让 AI 帮你用一个实际场景把所有类型串起来。',
              prompt: '用 Rust 写一个程序，模拟一个学生信息系统。用不同的数据类型来存储学生信息：姓名（字符串）、年龄（整数）、GPA（小数）、是否毕业（布尔值）、成绩等级（字符）。要求：每个变量都用 : 手动标注类型，并用 println! 显示所有信息。在每行变量声明旁边加上中文注释解释这个类型。',
              explanation: '让 AI 用"手动标注类型"写代码，这样你可以看到每种数据对应什么类型名。加上中文注释的要求，让代码本身变成学习材料。',
            },
            {
              type: 'quiz',
              question: '下面哪个是布尔类型（bool）的值？',
              options: [
                '42',
                '"hello"',
                'true',
                '\'A\'',
              ],
              correctIndex: 2,
              explanation:
                '布尔类型只有两个值：true（对/是）和 false（错/否）。42 是整数，"hello" 是字符串，\'A\' 是字符。',
            },
          ],
        },

        // --- 2.3 不可变 vs 可变 ---
        {
          id: 'mutability',
          title: '不可变 vs 可变',
          cards: [
            {
              type: 'explain',
              title: '变量的值可以修改吗？',
              content:
                '有时候你需要修改变量的值。比如游戏中，玩家得分了，分数要从 100 变成 200。\n\n在 Rust 中，你可以用 `let mut` 来创建一个"允许修改"的变量。\n\n`mut` 是 mutable 的缩写，意思是"可以变的"。',
            },
            {
              type: 'code',
              title: '用 mut 创建可修改的变量',
              description:
                '下面的代码：\n1. 用 `let mut` 创建分数变量，初始值是 100\n2. 显示当前分数\n3. 把分数改成 200\n4. 再次显示\n\n注意 `let` 后面多了个 `mut`。点击运行看看！',
              language: 'rust',
              runnable: true,
              code: 'fn main() {\n    let mut score = 100;\n    println!("当前分数: {}", score);\n    score = 200;\n    println!("得分后: {}", score);\n}',
            },
            {
              type: 'diagram',
              title: '一图看懂 mut',
              description: '左边：不加 `mut` 的变量被锁定，修改会被编译器拒绝。右边：加了 `mut` 就可以修改。看动画演示：',
              svg: mutabilitySvg,
            },
            {
              type: 'explain',
              title: '不加 mut 会怎样？',
              content:
                '如果创建变量时没加 `mut`，Rust 就不允许你修改它的值。\n\n这叫"不可变变量"——创建之后就锁定了。\n\n为什么要这样设计？因为大部分数据其实不需要修改。锁定它们可以防止意外修改导致的 bug。\n\nRust 的态度是：需要修改的时候你明确说（加 `mut`），其他时候默认锁定。',
              analogy:
                '就像签了字的合同——内容确定后就不能随便改了。如果你需要一份"草稿"（可以反复修改的），就要提前说明。',
            },
            {
              type: 'code',
              title: '看看不加 mut 修改会怎样',
              description:
                '下面的代码没有加 mut，但试图修改 score 的值。\n\n点击运行——你会看到 Rust 编译器报错了！\n\n仔细看报错信息，编译器会告诉你问题出在哪里，甚至告诉你怎么修！看到报错是正常的，这就是 Rust 在保护你。',
              language: 'rust',
              runnable: true,
              code: 'fn main() {\n    let score = 100;\n    println!("当前分数: {}", score);\n    score = 200;\n    println!("得分后: {}", score);\n}',
            },
            {
              type: 'ai-prompt',
              title: '让 AI 帮你写安全的可变代码',
              scenario: '你学会了 let 和 let mut 的区别。在实际项目中，什么时候该用 mut？让 AI 帮你养成好习惯。',
              prompt: '用 Rust 写一个简单的计数器程序：从 1 数到 10，每次加 1，每次都打印当前数字。要求：只在真正需要修改的变量上使用 mut，其他变量保持不可变。解释为什么这样做更安全。',
              explanation: '提示词强调了"只在需要的地方用 `mut`"。这是 Rust 最佳实践——默认不可变，只有确实需要修改时才加 `mut`。让 AI 解释原因，帮你理解设计哲学。',
            },
            {
              type: 'fill-blank',
              title: '填写可变变量声明',
              description: '填入正确的关键词和数字值，完成这段可修改变量的代码。',
              template: 'fn main() {\n    let ___BLANK___ x = 5;\n    x = ___BLANK___;\n    println!("x = {}", x);\n}',
              blanks: ['mut', '10'],
              language: 'rust',
              hints: ['要让变量可修改，需要加什么？', '给 x 一个新的数字值'],
            },
            {
              type: 'quiz',
              question: '刚才我们学到：想创建一个可以修改的变量，应该怎么写？',
              options: [
                'let score = 100;',
                'let mut score = 100;',
                'mut score = 100;',
                'var score = 100;',
              ],
              correctIndex: 1,
              explanation:
                '`let mut` 是正确写法！`let` 创建变量，`mut` 表示"允许修改"。不加 `mut` 的变量默认是锁定的，不能改。',
            },
          ],
        },

        // --- 2.4 常量与遮蔽 ---
        {
          id: 'const-and-shadowing',
          title: '常量与遮蔽',
          cards: [
            {
              type: 'explain',
              title: '常量：永远不变的值',
              content:
                '有些值从始至终都不应该改变，比如圆周率 3.14、一小时 60 分钟。\n\nRust 用 `const` 来定义常量：\n\n```rust\nconst MAX_SCORE: i32 = 1000;\n```\n\n常量和不可变变量的区别：\n- 常量必须标注类型（冒号后面写类型名）\n- 常量用全大写字母命名（这是约定俗成的写法）\n- 常量在程序运行前就确定了，不能用运行时才知道的值',
            },
            {
              type: 'code',
              title: '常量示例',
              description:
                '下面定义了两个常量。\n\n注意名字全是大写字母，单词之间用下划线 _ 连接。\n\n这是 Rust 社区的命名习惯，方便一眼认出"这是个常量"。',
              language: 'rust',
              runnable: true,
              code: 'const MAX_SCORE: i32 = 1000;\nconst PI: f64 = 3.14159;\n\nfn main() {\n    println!("最高分: {}", MAX_SCORE);\n    println!("圆周率: {}", PI);\n}',
            },
            {
              type: 'explain',
              title: '遮蔽（Shadowing）：用同名变量"盖住"旧的',
              content:
                '在 Rust 中，你可以用 `let` 再次声明一个同名的变量。\n\n新变量会"盖住"旧的——就像在旧标签上贴了一个新标签。\n\n这叫做遮蔽（Shadowing）。\n\n和 `mut` 的区别：遮蔽创建的是全新的变量，甚至可以改变类型！',
            },
            {
              type: 'code',
              title: '遮蔽示例',
              description:
                '下面的代码中，`x` 被声明了三次。\n\n每次 `let x` 都会创建一个新变量，盖住之前的。\n\n注意第三次 `x` 从数字变成了文字——这是 `mut` 做不到的！',
              language: 'rust',
              runnable: true,
              code: 'fn main() {\n    let x = 5;\n    println!("第一个 x: {}", x);\n\n    let x = x + 1;\n    println!("第二个 x: {}", x);\n\n    let x = "现在我是文字了";\n    println!("第三个 x: {}", x);\n}',
            },
            {
              type: 'ai-prompt',
              title: '让 AI 帮你区分三种"不变"',
              scenario: '到现在我们学了三种方式：let（不可变变量）、let mut（可变变量）、const（常量）。容易搞混？让 AI 用对比表帮你理清。',
              prompt: '用 Rust 写一个程序，分别演示 let（不可变变量）、let mut（可变变量）、const（常量）、以及 shadowing（变量遮蔽）的用法。每种写一个小例子，用 println! 打印结果并附上中文说明，帮助初学者理解它们的区别。',
              explanation: '一次性让 AI 对比展示所有相关概念，比一个个查效率高得多。要求"附中文说明"让 AI 生成的代码自带解释，就像一个小型教程。',
            },
            {
              type: 'quiz',
              question: '下面的代码运行后，最终 `x` 显示的是什么？\n\n```rust\nlet x = 10;\nlet x = x + 5;\nprintln!("{}", x);\n```',
              options: [
                '10',
                '15',
                '报错，不能重复用 let',
                '5',
              ],
              correctIndex: 1,
              explanation:
                '第二个 `let x = x + 5;` 创建了一个新变量 `x`，值是旧 `x` (10) + 5 = 15。这就是遮蔽——新的 `x` 盖住了旧的。',
            },
          ],
        },

        // --- 2.5 数组与元组 ---
        {
          id: 'arrays-tuples',
          title: '数组与元组',
          cards: [
            {
              type: 'explain',
              title: '一个变量存多个值',
              content:
                '到目前为止，一个变量只存一个值：一个数字、一个字符串。\n\n但如果你要存一周 7 天的温度呢？创建 7 个变量太麻烦了。\n\n**数组（Array）**让你用一个变量存一组**同类型**的值。',
              analogy:
                '数组就像一排储物柜——每个柜子里放同一种东西（比如都是数字），用编号（0, 1, 2...）来打开对应的柜子。',
            },
            {
              type: 'code',
              title: '创建和使用数组',
              description:
                '用方括号 `[]` 创建数组，用 `数组[编号]` 取出某个值。\n\n**注意**：编号从 **0** 开始，不是 1！第一个元素是 `[0]`，第二个是 `[1]`。',
              language: 'rust',
              runnable: true,
              code: 'fn main() {\n    let temps = [28, 30, 26, 32, 29, 27, 31];\n\n    println!("周一温度: {} 度", temps[0]);\n    println!("周三温度: {} 度", temps[2]);\n    println!("一共 {} 天的数据", temps.len());\n}',
            },
            {
              type: 'explain',
              title: '元组（Tuple）：不同类型的组合',
              content:
                '数组要求所有元素类型相同。如果你想把**不同类型**的值打包在一起呢？\n\n**元组（Tuple）**用圆括号 `()` 创建，可以混合不同类型：\n\n```rust\nlet person = ("小明", 25, true);\n```\n\n取值用 `.0`、`.1`、`.2`（点 + 编号）：\n\n```rust\nprintln!("{} 今年 {} 岁", person.0, person.1);\n```\n\n也可以**解构**——一次性把元组拆成多个变量：\n\n```rust\nlet (name, age, student) = person;\n```',
            },
            {
              type: 'code',
              title: '元组示例',
              description:
                '创建一个包含姓名、年龄、是否学生的元组，然后用两种方式取值。',
              language: 'rust',
              runnable: true,
              code: 'fn main() {\n    let person = ("小明", 25, true);\n\n    // 方式一：用 .0 .1 .2 取值\n    println!("姓名: {}", person.0);\n    println!("年龄: {}", person.1);\n\n    // 方式二：解构\n    let (name, age, is_student) = person;\n    println!("{} {} 岁, 是学生: {}", name, age, is_student);\n}',
            },
            {
              type: 'ai-prompt',
              title: '让 AI 帮你练习数组和元组',
              scenario: '你学会了数组（同类型多个值）和元组（不同类型组合）。让 AI 生成一个综合练习。',
              prompt: '用 Rust 写一个程序，练习数组和元组：\n1. 创建一个数组存储 5 个学生的考试分数\n2. 创建一个元组存储一个学生的完整信息（姓名、年龄、分数）\n3. 用 for 循环遍历分数数组，计算平均分\n4. 用解构从元组中取出各个字段并显示\n只用我们学过的语法：let、println!、数组[]、元组()、for 循环。加中文注释解释每一步。',
              explanation: '这个练习把数组和元组结合在一个实际场景中，帮你理解什么时候用数组（同类型列表）、什么时候用元组（不同类型组合）。',
            },
            {
              type: 'quiz',
              question: '数组和元组的区别是什么？',
              options: [
                '没有区别，只是写法不同',
                '数组存同类型的多个值，元组可以存不同类型的值',
                '数组只能存数字，元组可以存任何类型',
                '元组比数组快',
              ],
              correctIndex: 1,
              explanation:
                '数组 `[1, 2, 3]` 要求所有元素类型相同（比如都是整数）。元组 `("小明", 25, true)` 可以混合不同类型。数组用 `[index]` 取值，元组用 `.0` `.1` 或解构取值。',
            },
          ],
        },

        // --- 2.6 遍历与迭代器 ---
        {
          id: 'iteration',
          title: '遍历数据',
          cards: [
            {
              type: 'explain',
              title: '遍历：逐个访问每个元素',
              content:
                '有了数组之后，最常见的操作就是**遍历**——逐个访问每个元素。\n\nRust 中用 `for` 循环 + `in` 来遍历：\n\n```rust\nlet numbers = [10, 20, 30];\nfor n in numbers {\n    println!("{}", n);\n}\n```\n\n这会依次打印 10、20、30。\n\n你还可以遍历一个**范围**：\n\n```rust\nfor i in 0..5 {\n    println!("{}", i);  // 0, 1, 2, 3, 4\n}\n```',
            },
            {
              type: 'code',
              title: '遍历数组',
              description:
                '用 `for` 循环遍历一个数组，计算所有元素的总和。\n\n这是 Rust 中最常用的遍历方式——简单、安全、不会越界。',
              language: 'rust',
              runnable: true,
              code: 'fn main() {\n    let scores = [85, 92, 78, 96, 88];\n    let mut total = 0;\n\n    for score in scores {\n        total += score;\n    }\n\n    println!("总分: {}", total);\n    println!("平均分: {}", total / scores.len());\n}',
            },
            {
              type: 'explain',
              title: '.iter() 和 .enumerate()——遍历的好帮手',
              content:
                '有时候遍历时你不仅需要**值**，还需要知道**编号**（这是第几个？）。\n\n**`.iter()`** ：创建一个迭代器——一个"逐个吐出元素"的工具\n\n**`.enumerate()`** ：在 `.iter()` 的基础上，同时给出**编号**和**值**\n\n```rust\nfor (index, value) in scores.iter().enumerate() {\n    println!("第 {} 个: {}", index, value);\n}\n```\n\n`(index, value)` 是一个元组解构——你刚刚学的！\n\n**什么时候用什么**：\n- 只需要值 → `for x in array`\n- 需要编号 + 值 → `for (i, x) in array.iter().enumerate()`',
            },
            {
              type: 'code',
              title: '用 enumerate 同时拿到编号和值',
              description:
                '找出数组中的最大值和它的位置。\n\n注意 `enumerate()` 返回的是 `(编号, &值)`——值前面有 `&` 因为 `.iter()` 是借用遍历。',
              language: 'rust',
              runnable: true,
              code: 'fn main() {\n    let scores = [85, 92, 78, 96, 88];\n    let mut max_score = 0;\n    let mut max_index = 0;\n\n    for (i, &score) in scores.iter().enumerate() {\n        if score > max_score {\n            max_score = score;\n            max_index = i;\n        }\n    }\n\n    println!("最高分: {}, 是第 {} 个同学", max_score, max_index + 1);\n}',
            },
            {
              type: 'ai-prompt',
              title: '让 AI 帮你练习遍历',
              scenario: '遍历是编程中最基础的操作之一。让 AI 帮你生成更多练习。',
              prompt: '用 Rust 写 3 个小程序，练习不同的遍历方式：\n1. 用 for 遍历一个字符串数组，找出最长的字符串\n2. 用 .iter().enumerate() 遍历分数数组，打印不及格（< 60）的学生编号\n3. 用 for 和范围 (1..=100) 计算 1 到 100 的和\n只用我们学过的语法。每个程序加中文注释。',
              explanation: '三个练习覆盖了最常用的遍历场景：遍历数组找最值、带编号遍历做筛选、遍历范围做累加。掌握这三个模式，大部分遍历需求都能搞定。',
            },
            {
              type: 'quiz',
              question: '你想遍历一个数组，同时知道每个元素是第几个。应该怎么写？',
              options: [
                '`for x in array`',
                '`for (i, x) in array.iter().enumerate()`',
                '`for x in array.len()`',
                '`for i in array.index()`',
              ],
              correctIndex: 1,
              explanation:
                '`.iter()` 创建迭代器，`.enumerate()` 在此基础上给每个元素加上编号。`for (i, x) in ...` 用元组解构同时拿到编号 `i` 和值 `x`。这是 Rust 中最常用的"带编号遍历"写法。',
            },
          ],
        },

        // --- 2.7 类型转换与格式化 ---
        {
          id: 'casting-formatting',
          title: '类型转换与格式化输出',
          cards: [
            {
              type: 'explain',
              title: '`as` 类型转换',
              content:
                '不同类型的数字不能直接运算——整数和小数是两种类型，混在一起 Rust 会报错。\n\n用 `as` 关键字可以把一个类型转换成另一个：\n\n```rust\nlet x: i32 = 42;\nlet y: f64 = x as f64;  // 整数变小数\n```\n\n为什么需要这个？比如做除法时，`5 / 2` 得到 `2`（整数除法，小数部分被截掉），而 `5 as f64 / 2.0` 得到 `2.5`。\n\n`as` 就像一个"强制换装"——告诉编译器：我知道我要做什么，帮我转过去。',
            },
            {
              type: 'code',
              title: '温度转换（用到 `as f64`）',
              description:
                '摄氏转华氏：`F = C × 9 / 5 + 32`。\n\n注意：整数除法 `9 / 5` 结果是 `1`（丢失精度），所以要先用 `as f64` 转成小数再运算。\n\n运行看效果！',
              language: 'rust',
              runnable: true,
              code: 'fn celsius_to_fahrenheit(c: i32) -> f64 {\n    c as f64 * 9.0 / 5.0 + 32.0\n}\n\nfn main() {\n    let boiling = 100;\n    let freezing = 0;\n    let body = 37;\n\n    println!("{}°C = {:.1}°F", boiling, celsius_to_fahrenheit(boiling));\n    println!("{}°C = {:.1}°F", freezing, celsius_to_fahrenheit(freezing));\n    println!("{}°C = {:.1}°F", body, celsius_to_fahrenheit(body));\n}',
            },
            {
              type: 'explain',
              title: '`println!` 格式化输出',
              content:
                '`println!` 里的 `{}` 是**占位符**，Rust 有多种格式化写法：\n\n- `{}` — 普通显示（最常用）\n- `{:?}` — Debug 显示，显示原始结构（需要类型实现 `Debug` trait，后面会学）\n- `{:.2}` — 保留 2 位小数：`3.14159` → `3.14`\n- `{:0>5}` — 用 `0` 填充到 5 位，右对齐：`42` → `00042`\n- `{:>10}` — 右对齐，宽度 10\n- `{:<10}` — 左对齐，宽度 10\n\n```rust\nprintln!("{:.2}", 3.14159);   // 3.14\nprintln!("{:0>5}", 42);        // 00042\nprintln!("{:?}", [1, 2, 3]);   // [1, 2, 3]\n```',
            },
            {
              type: 'quiz',
              question: '`42 as f64` 的结果是什么？',
              options: [
                '字符串 "42"',
                '整数 42，没有变化',
                '浮点数 42.0',
                '编译错误',
              ],
              correctIndex: 2,
              explanation:
                '`as f64` 把整数转换为 64 位浮点数。`42` 变成 `42.0`，类型从 `i32`（或其他整数类型）变成 `f64`。这样就可以和其他小数一起运算，不会丢失精度。',
            },
          ],
        },
      ],
    },

    // =============================================
    // 第三章：函数与控制流
    // =============================================
    {
      id: 'ch3-functions',
      title: '第三章：函数与控制流',
      lessons: [
        // --- 3.1 函数基础 ---
        {
          id: 'function-basics',
          title: '函数基础',
          cards: [
            {
              type: 'explain',
              title: '函数是什么？',
              content:
                '假设你每天早上都要做同一件事：煮咖啡。\n\n你会把步骤写下来一次，以后每天直接按照这个流程做，而不是每次都重新想一遍。\n\n函数就是这样——把一段代码打包起来，给它起个名字，以后随时可以"呼叫"它来执行。\n\n好处是：\n- 代码不用重复写\n- 程序逻辑更清晰\n- 出了问题只需要改一个地方',
              analogy:
                '函数就像外卖店的菜单项。"来一份宫保鸡丁"——厨师知道该怎么做，你不用解释每一步。',
            },
            {
              type: 'think-first',
              question: '如果你设计一门编程语言，你会怎么定义"函数"的语法？需要包含哪些信息？\n\n提示：想想做菜——一个菜谱需要说明什么？',
              reveal: '一个函数需要：\n\n1. **名字**——叫什么（`fn add`）\n2. **材料**——需要什么输入（参数 `a: i32, b: i32`）\n3. **成品**——产出什么（返回值 `-> i32`）\n4. **步骤**——怎么做（函数体 `{ a + b }`）\n\nRust 的函数语法正是这四样：`fn 名字(材料) -> 成品 { 步骤 }`',
            },
            {
              type: 'code',
              title: '最简单的函数：无参数',
              description:
                '用 `fn` 关键字定义函数，后面跟函数名和 `()`。\n\n下面定义了一个叫 `greet` 的函数，然后在 `main` 里调用它。\n\n点击运行，看看效果！',
              language: 'rust',
              runnable: true,
              code: 'fn greet() {\n    println!("你好，欢迎学 Rust！");\n    println!("今天也要加油哦～");\n}\n\nfn main() {\n    greet();\n    greet();\n}',
            },
            {
              type: 'explain',
              title: '加上参数——让函数更灵活',
              content:
                '上面的 `greet` 每次都显示一样的文字，不够灵活。\n\n我们可以给函数加上**参数**，让调用者传入数据。\n\n参数写在 `()` 里面，格式是：`参数名: 类型`。\n\n比如：`fn greet(name: &str)` 表示接收一个字符串参数叫 `name`。\n\n注意：Rust 要求你**必须写出参数的类型**，不像变量那样可以自动推断。',
            },
            {
              type: 'code',
              title: '带参数的函数',
              description:
                '现在 `greet` 接收一个 `name` 参数，显示不同的问候语。\n\n注意调用时要在 `()` 里传入具体的值。',
              language: 'rust',
              runnable: true,
              code: 'fn greet(name: &str) {\n    println!("你好，{}！欢迎学 Rust！", name);\n}\n\nfn main() {\n    greet("小明");\n    greet("小红");\n    greet("Alice");\n}',
            },
            {
              type: 'explain',
              title: '返回值——函数也能给出答案',
              content:
                '函数不只能"做事"，还可以"给出结果"。\n\n在 `->` 后面写上返回值的类型，函数就可以返回一个值。\n\n**关键点：Rust 中，函数最后一行如果不加分号 `;`，这一行的值就自动成为返回值。**\n\n这是 Rust 独特的设计——最后一行不加分号 = 返回这个值。',
            },
            {
              type: 'code',
              title: '带返回值的函数',
              description:
                '下面的 `add` 函数接收两个整数，返回它们的和。\n\n注意 `a + b` 这一行没有分号——这就是返回值。\n\n也可以用 `return a + b;` 这种写法，效果一样。',
              language: 'rust',
              runnable: true,
              code: 'fn add(a: i32, b: i32) -> i32 {\n    a + b\n}\n\nfn main() {\n    let result = add(3, 5);\n    println!("3 + 5 = {}", result);\n\n    let big = add(100, 200);\n    println!("100 + 200 = {}", big);\n}',
            },
            {
              type: 'ai-prompt',
              title: '让 AI 帮你写函数',
              scenario: '你已经学会了定义函数、传参数、返回值。让 AI 帮你把这些串成一个小项目。',
              prompt: '用 Rust 写一个计算 BMI（身体质量指数）的程序。要求：\n1. 写一个函数 calculate_bmi(weight_kg: f64, height_m: f64) -> f64，计算并返回 BMI（公式：体重/身高²）\n2. 写一个函数 bmi_category(bmi: f64) -> &\'static str，根据 BMI 返回对应分类（低于18.5偏瘦，18.5-24正常，24-28超重，28以上肥胖）\n3. 在 main 里调用这两个函数，测试几组数据并打印结果\n只用 fn、参数、返回值、println! 这些基础知识。',
              explanation: '提示词明确了两个函数的签名（参数和返回值类型），并且限定只用已学知识。这样 AI 写出的代码你能完全看懂，不会用到还没学的概念。',
            },
            {
              type: 'fill-blank',
              title: '填写函数返回值语法',
              description: '填入正确的符号，完成这个带返回值的函数。',
              template: 'fn add(a: i32, b: i32) ___BLANK___ i32 {\n    a ___BLANK___ b\n}\n\nfn main() {\n    println!("{}", add(3, 4));\n}',
              blanks: ['->', '+'],
              language: 'rust',
              hints: ['函数返回值用什么符号标注？', '两个数相加用什么运算符？'],
            },
            {
              type: 'quiz',
              question: '在 Rust 中，函数的最后一行 `a + b`（不加分号）意味着什么？',
              options: [
                '这是一个错误，Rust 要求每行都加分号',
                '这是该函数的返回值',
                '这行代码会被忽略',
                '这会打印 a + b 的结果',
              ],
              correctIndex: 1,
              explanation:
                'Rust 中，函数体最后一行如果不加分号，这个表达式的值就是函数的返回值。这是 Rust 的惯用写法，等同于 `return a + b;`。',
            },
          ],
        },

        // --- 3.2 if/else ---
        {
          id: 'if-else',
          title: 'if / else 条件判断',
          cards: [
            {
              type: 'explain',
              title: '程序也需要做选择',
              content:
                '现实中我们一直在做选择：\n\n> 如果下雨了，就带伞；否则不带。\n\n程序也需要根据条件做不同的事。这就是 `if / else`。\n\n语法：\n```\nif 条件 {\n    // 条件为 true 时执行\n} else {\n    // 条件为 false 时执行\n}\n```\n\n条件必须是布尔值（`true` 或 `false`）——Rust 不接受数字作为条件。',
            },
            {
              type: 'explain',
              title: '比较运算符',
              content:
                '要写出条件，你需要比较运算符：\n\n| 符号 | 意思 |\n|------|------|\n| `==` | 等于 |\n| `!=` | 不等于 |\n| `>` | 大于 |\n| `<` | 小于 |\n| `>=` | 大于等于 |\n| `<=` | 小于等于 |\n\n例如：`score >= 60` 表示"分数大于等于 60"，结果是 `true` 或 `false`。',
            },
            {
              type: 'code',
              title: 'if / else 基础示例',
              description:
                '根据分数判断是否及格。\n\n注意：条件不需要括号 `()`，这是 Rust 的风格。',
              language: 'rust',
              runnable: true,
              code: 'fn main() {\n    let score = 75;\n\n    if score >= 60 {\n        println!("及格了！分数: {}", score);\n    } else {\n        println!("未及格，分数: {}，加油！", score);\n    }\n}',
            },
            {
              type: 'code',
              title: 'else if：多个条件',
              description:
                '有时候不只是"是/否"，还需要多级判断。\n\n可以用 `else if` 添加更多条件。程序从上到下检查，遇到第一个满足的就执行，跳过其余的。',
              language: 'rust',
              runnable: true,
              code: 'fn main() {\n    let score = 85;\n\n    if score >= 90 {\n        println!("优秀！A 等级");\n    } else if score >= 80 {\n        println!("良好！B 等级");\n    } else if score >= 60 {\n        println!("及格！C 等级");\n    } else {\n        println!("未及格，继续努力！");\n    }\n}',
            },
            {
              type: 'explain',
              title: 'if 是表达式——可以用来赋值',
              content:
                'Rust 中，`if` 不只是语句，它是一个**表达式**——有值！\n\n所以你可以把 `if / else` 的结果直接赋给变量：\n\n```rust\nlet grade = if score >= 60 { "及格" } else { "不及格" };\n```\n\n这比写两遍赋值更简洁。\n\n**注意：两个分支的返回类型必须一致。**',
            },
            {
              type: 'code',
              title: 'if 作为表达式',
              description:
                '直接用 `if / else` 的结果赋值给变量。\n\n注意花括号里没有分号——这样才能作为表达式的值。',
              language: 'rust',
              runnable: true,
              code: 'fn main() {\n    let temperature = 28;\n\n    let advice = if temperature > 35 {\n        "太热了，待在室内！"\n    } else if temperature > 25 {\n        "天气不错，适合出门"\n    } else {\n        "有点凉，记得带件外套"\n    };\n\n    println!("当前温度 {} 度，建议：{}", temperature, advice);\n}',
            },
            {
              type: 'ai-prompt',
              title: '让 AI 帮你写条件逻辑',
              scenario: '你已经学会了 if / else if / else，以及 if 作为表达式。让 AI 帮你练习。',
              prompt: '用 Rust 写一个简单的票价计算器。规则：年龄小于 6 岁免费，6-17 岁半价（50元），18-59 岁全价（100元），60岁及以上七折（70元）。要求：用一个函数 ticket_price(age: u32) -> u32 返回票价，然后在 main 里测试几个不同年龄并打印结果。只用 fn、if/else if/else、变量、println!。',
              explanation: '票价计算器是个很自然的多条件场景，比"随便写个 if 例子"更有真实感。限定只用已学知识，保证代码你能完全理解。',
            },
            {
              type: 'quiz',
              question: '下面代码运行后会打印什么？\n\n```rust\nlet x = 10;\nlet msg = if x > 5 { "大" } else { "小" };\nprintln!("{}", msg);\n```',
              options: [
                '小',
                '大',
                '报错，if 不能赋值给变量',
                '10',
              ],
              correctIndex: 1,
              explanation:
                '`x = 10`，条件 `x > 5` 为 true，所以 `if` 表达式的值是 `"大"`。Rust 中 `if` 是表达式，可以直接用于赋值。',
            },
          ],
        },

        // --- 3.3 循环 ---
        {
          id: 'loops',
          title: '循环',
          cards: [
            {
              type: 'explain',
              title: '为什么需要循环？',
              content:
                '如果要打印 1 到 100，你总不能写 100 行 `println!` 吧？\n\n循环就是"重复做某件事"的工具。Rust 有三种循环：\n\n- `loop` — 一直循环，直到你说停（用 `break`）\n- `while` — 当条件满足时一直循环\n- `for` — 遍历一个范围或集合（最常用！）\n\n我们先从最简单的开始。',
            },
            {
              type: 'code',
              title: 'loop：无限循环 + break',
              description:
                '`loop` 会一直重复执行，直到遇到 `break` 才停下。\n\n下面的代码用一个计数器，数到 3 就停止。',
              language: 'rust',
              runnable: true,
              code: 'fn main() {\n    let mut count = 0;\n\n    loop {\n        count += 1;\n        println!("第 {} 次循环", count);\n\n        if count >= 3 {\n            println!("好了，停下！");\n            break;\n        }\n    }\n}',
            },
            {
              type: 'code',
              title: 'while：条件循环',
              description:
                '`while` 在每次循环开始前检查条件。条件为 `true` 就继续，为 `false` 就停。\n\n比 `loop` 更直观——直接表达"当……时继续做"。',
              language: 'rust',
              runnable: true,
              code: 'fn main() {\n    let mut n = 1;\n\n    while n <= 5 {\n        println!("n = {}", n);\n        n += 1;\n    }\n\n    println!("循环结束，n 现在是 {}", n);\n}',
            },
            {
              type: 'explain',
              title: 'Rust 的范围写法',
              content:
                'Rust 有两种范围写法，在 `for` 循环中很常用：\n\n- `0..5` — **不包含** 5，得到 0, 1, 2, 3, 4\n- `0..=5` — **包含** 5，得到 0, 1, 2, 3, 4, 5\n\n`..=` 是"包含等号"的意思，多一个 `=` 就多包含右端点。\n\n记忆技巧：`..` 是"到但不含"，`..=` 是"到并且含"（`=` 代表"等于"这个边界也要）。',
            },
            {
              type: 'explain',
              title: 'for：最常用的循环',
              content:
                '实际写代码时，`for` 用得最多。它用来**遍历一个范围或集合**。\n\n范围写法：\n- `1..5` — 1, 2, 3, 4（不含 5）\n- `1..=5` — 1, 2, 3, 4, 5（含 5）\n\n格式：\n```rust\nfor 变量 in 范围 {\n    // 每轮循环执行的代码\n}\n```\n\n`for` 比 `while` 更安全，因为不用手动管理计数器，不会忘记 `+1`。',
            },
            {
              type: 'code',
              title: 'for 遍历范围',
              description:
                '用 `for` 打印 1 到 5，非常简洁。\n\n`1..=5` 表示"从 1 到 5，包含 5"。',
              language: 'rust',
              runnable: true,
              code: 'fn main() {\n    println!("用 for 从 1 数到 5：");\n    for i in 1..=5 {\n        println!("  {}", i);\n    }\n\n    println!("\\n乘法口诀（部分）：");\n    for i in 1..=5 {\n        println!("  3 × {} = {}", i, 3 * i);\n    }\n}',
            },
            {
              type: 'explain',
              title: 'continue：跳过当前轮',
              content:
                '除了 `break`（停止循环），还有 `continue`（跳过这一轮，继续下一轮）。\n\n例如，你想打印 1 到 10 中所有奇数，可以用 `continue` 跳过偶数。\n\n```rust\nfor i in 1..=10 {\n    if i % 2 == 0 {\n        continue; // 偶数，跳过\n    }\n    println!("{}", i);\n}\n```\n\n`%` 是取余运算符：`i % 2 == 0` 表示 i 能被 2 整除（偶数）。',
            },
            {
              type: 'ai-prompt',
              title: '让 AI 帮你练习循环',
              scenario: '你已经学会了 loop、while、for 和 continue/break。让 AI 帮你用循环做点有趣的事。',
              prompt: '用 Rust 写一个程序，用 for 循环打印九九乘法表。要求：\n1. 外层循环 i 从 1 到 9\n2. 内层循环 j 从 1 到 i（这样只打印一半，避免重复）\n3. 每行打印完换行\n4. 格式：1×1=1  1×2=2 ...\n只用 for 循环、println! 和 if，不用其他复杂语法。',
              explanation: '九九乘法表是练习嵌套循环的经典题目。提示词给出了具体格式要求，让 AI 输出的结果更整齐。限定只用已学语法，保证你能看懂每一行。',
            },
            {
              type: 'fill-blank',
              title: '填空：for 循环',
              description: '填入正确的关键词和符号，完成这个打印 1 到 5 的 for 循环。',
              template: 'fn main() {\n    ___BLANK___ i in 1___BLANK___5 {\n        println!("{}", i);\n    }\n}',
              blanks: ['for', '..='],
              language: 'rust',
              hints: ['用什么关键词开始循环？', '包含 5 用什么范围符号？'],
            },
            {
              type: 'quiz',
              question: '`for i in 1..5` 会让 i 依次取哪些值？',
              options: [
                '1, 2, 3, 4, 5',
                '1, 2, 3, 4',
                '2, 3, 4, 5',
                '0, 1, 2, 3, 4',
              ],
              correctIndex: 1,
              explanation:
                '`1..5` 是不包含右端点的范围，所以 i 取 1, 2, 3, 4。如果想包含 5，要写 `1..=5`（注意多一个 `=`）。',
            },
          ],
        },

        // --- 3.4 综合练习 ---
        {
          id: 'functions-exercise',
          title: '综合练习：FizzBuzz',
          cards: [
            {
              type: 'explain',
              title: '把学到的东西全用上',
              content:
                '这一课我们来做一个经典的编程练习：**FizzBuzz**。\n\n规则很简单：\n\n- 打印 1 到 20 的数字\n- 如果这个数能被 3 整除，打印 "Fizz"\n- 如果能被 5 整除，打印 "Buzz"\n- 如果既能被 3 也能被 5 整除，打印 "FizzBuzz"\n- 其他情况打印数字本身\n\n这道题需要综合用到：变量、for 循环、if/else if/else。\n\n先自己想想思路，再看下面的实现！',
            },
            {
              type: 'code',
              title: 'FizzBuzz 完整实现',
              description:
                '注意判断顺序很重要：要先判断"既被 3 又被 5 整除"（FizzBuzz），否则它会先被 3 或 5 各自匹配到。\n\n`%` 是取余运算符，`n % 3 == 0` 表示 n 能被 3 整除。\n\n点击运行，看看结果！',
              language: 'rust',
              runnable: true,
              code: 'fn fizzbuzz(n: u32) -> String {\n    if n % 15 == 0 {\n        String::from("FizzBuzz")\n    } else if n % 3 == 0 {\n        String::from("Fizz")\n    } else if n % 5 == 0 {\n        String::from("Buzz")\n    } else {\n        n.to_string()\n    }\n}\n\nfn main() {\n    for i in 1..=20 {\n        println!("{}", fizzbuzz(i));\n    }\n}',
            },
            {
              type: 'explain',
              title: '温度转换：换个场景练习',
              content:
                '下面是另一个练习场景：摄氏度 ↔ 华氏度转换。\n\n公式：\n- 摄氏转华氏：`F = C × 9/5 + 32`\n- 华氏转摄氏：`C = (F - 32) × 5/9`\n\n这次让你先看代码再运行，观察函数如何封装计算逻辑。',
            },
            {
              type: 'code',
              title: '温度转换程序',
              description:
                '两个函数分别处理两个方向的转换。\n\n`main` 里用 for 循环批量测试几个常用温度点。\n\n运行后试试改一下温度范围，看看输出变化！',
              language: 'rust',
              runnable: true,
              code: 'fn celsius_to_fahrenheit(c: f64) -> f64 {\n    c * 9.0 / 5.0 + 32.0\n}\n\nfn fahrenheit_to_celsius(f: f64) -> f64 {\n    (f - 32.0) * 5.0 / 9.0\n}\n\nfn main() {\n    println!("摄氏度 → 华氏度：");\n    for c in [0, 20, 37, 100] {\n        let f = celsius_to_fahrenheit(c as f64);\n        println!("  {}°C = {:.1}°F", c, f);\n    }\n\n    println!("\\n华氏度 → 摄氏度：");\n    for f in [32, 68, 98, 212] {\n        let c = fahrenheit_to_celsius(f as f64);\n        println!("  {}°F = {:.1}°C", f, c);\n    }\n}',
            },
            {
              type: 'ai-prompt',
              title: '让 AI 帮你出新题目',
              scenario: '你已经做完了 FizzBuzz 和温度转换。让 AI 再出一道综合练习，巩固函数 + 循环 + 条件的组合。',
              prompt: '给我出一道 Rust 编程练习题，难度适合刚学完函数（fn、参数、返回值）、if/else、for 循环的初学者。要求：\n1. 场景要贴近生活（不要抽象的数学题）\n2. 需要至少一个自定义函数\n3. 需要用到 for 循环\n4. 需要用到 if/else 判断\n然后给出完整的 Rust 代码实现，加上中文注释。',
              explanation: '让 AI 同时出题并给答案，这样你可以先自己尝试，遇到困难再看答案。指定"贴近生活的场景"比纯算法题更有动力做。',
            },
            {
              type: 'task',
              title: '动手写一个 FizzBuzz',
              instruction: '不看参考代码，自己写一个 FizzBuzz 程序：\n\n- 打印 1 到 30\n- 能被 3 整除打印 "Fizz"\n- 能被 5 整除打印 "Buzz"\n- 能被 3 和 5 同时整除打印 "FizzBuzz"\n- 其他情况打印数字本身\n\n**提示**：用 `for`、`if/else if/else`、`%` 取余运算符',
              checklist: [
                '创建了 for 循环从 1 到 30',
                '处理了能被 3 和 5 同时整除的情况（要放在最前面！）',
                '处理了只被 3 整除',
                '处理了只被 5 整除',
                '处理了其他情况打印数字',
              ],
              tip: '注意：同时被 3 和 5 整除的判断要放在前面，否则会被单独的 3 或 5 判断拦截',
            },
            {
              type: 'quiz',
              question: '在 FizzBuzz 程序里，为什么要先判断 `n % 15 == 0`，而不是先判断 `n % 3 == 0`？',
              options: [
                '没有原因，两种顺序结果一样',
                '因为 15 比 3 大，大数要先判断',
                '因为如果先判断 n % 3，数字 15 会被输出 "Fizz" 而不是 "FizzBuzz"',
                '因为 Rust 要求条件从大到小排列',
              ],
              correctIndex: 2,
              explanation:
                '`if/else if` 遇到第一个满足的条件就停止。如果先判断 `n % 3 == 0`，那么 15（既能被 3 整除也能被 5 整除）会在第一步就输出 "Fizz"，永远到不了 "FizzBuzz" 那个分支。所以要把更具体的条件放在前面。',
            },
          ],
        },
      ],
    },

    // =============================================
    // 第四章：所有权——Rust 的超能力
    // =============================================
    {
      id: 'ch4-ownership',
      title: '第四章：所有权——Rust 的超能力',
      lessons: [
        // --- 4.1 内存是什么 ---
        {
          id: 'what-is-memory',
          title: '内存是什么',
          cards: [
            {
              type: 'explain',
              title: '程序运行时需要"工作空间"',
              content:
                '你的电脑有内存（RAM），程序运行时会占用一部分内存来存放数据。\n\n想象内存是一排格子，每个格子可以存一个数据。\n\n程序运行时：变量的值就存在这些格子里。\n\n内存分为两个区域，工作方式完全不同：\n\n- **栈（Stack）** — 快速、整洁\n- **堆（Heap）** — 灵活、但需要管理\n\n理解这两个概念，是理解 Rust 所有权的第一步。',
            },
            {
              type: 'explain',
              title: '栈：整洁的便签纸',
              content:
                '想象你桌上的一叠便签纸：\n\n- 每次要用，抽一张放在最上面\n- 用完了，从最上面拿走\n- 只能从顶部操作（后进先出）\n\n这就是栈的工作方式。\n\n**特点：**\n- 操作速度极快\n- 大小必须在编译时就知道（如整数、布尔值）\n- 函数结束时，它用的栈空间自动释放',
              analogy:
                '便签纸用完就扔，不用担心忘记清理。',
            },
            {
              type: 'explain',
              title: '堆：需要管理的仓库',
              content:
                '现在想象一个大仓库：\n\n- 你可以在任何空位存放货物\n- 存进去时你会拿到一个地址（指针）\n- 想取货时，用地址找到它\n- 货物不再需要时，要记得清理出去\n\n这就是堆的工作方式。\n\n**特点：**\n- 大小可以在运行时决定（如 `String`、动态数组）\n- 速度比栈慢（需要查地址）\n- 必须有人负责清理，否则一直占着空间',
              analogy:
                '仓库不会自动清空，需要有人管理——这就是所有权要解决的问题。',
            },
            {
              type: 'diagram',
              title: '栈 vs 堆：动画演示',
              description: '看看整数（`i32`）存在栈上，而 `String` 的数据存在堆上，栈上只存一个指向堆的地址：',
              svg: stackHeapSvg,
            },
            {
              type: 'explain',
              title: '简单总结',
              content:
                '记住这个规律：\n\n**栈上的数据：**\n- 整数（`i32`、`u32` 等）\n- 小数（`f64`）\n- 布尔值（`bool`）\n- 字符（`char`）\n\n**堆上的数据：**\n- `String`（可以增长的字符串）\n- `Vec`（动态数组，以后会学）\n\n为什么要区分？因为**堆上的数据需要有人负责清理**。Rust 的所有权系统就是解决这个问题的。',
            },
            {
              type: 'ai-prompt',
              title: '让 AI 帮你加深理解',
              scenario: '栈和堆有点抽象？让 AI 用更多生活类比来帮你巩固这两个概念。',
              prompt: '请用 3 个不同的生活类比（不用"仓库"和"便签纸"这两个），分别解释计算机内存中栈（Stack）和堆（Heap）的区别。每个类比都要说明：1) 栈对应生活中的什么；2) 堆对应生活中的什么；3) 为什么堆需要"有人管理"。用简单的中文，不要用编程术语。',
              explanation: '同一个概念，多种类比能帮你从不同角度理解。限定"不用已有类比"，让 AI 给你真正的新视角。',
            },
            {
              type: 'quiz',
              question: '下面哪种数据存储在堆（Heap）上？',
              options: [
                '整数 `i32`',
                '布尔值 `bool`',
                '`String`（可增长的字符串）',
                '字符 `char`',
              ],
              correctIndex: 2,
              explanation:
                '`String` 的内容存在堆上，因为字符串长度可以动态变化，编译时不知道具体大小。整数、布尔、字符大小固定，存在栈上，函数结束自动清理。',
            },
          ],
        },

        // --- 4.2 为什么需要所有权 ---
        {
          id: 'why-ownership',
          title: '为什么需要所有权',
          cards: [
            {
              type: 'explain',
              title: '堆上的数据——谁来清理？',
              content:
                '我们刚才说了，堆上的数据需要有人负责清理。\n\n这是所有编程语言都必须解决的问题。不同语言的解决方案各有利弊：\n\n**方案一：C/C++ — 手动管理**\n程序员自己负责，用完了手动释放内存。\n\n**方案二：Python/Java/Go — 垃圾回收（GC）**\n语言运行时自动检测不用的数据，定期清理。\n\n**方案三：Rust — 所有权系统**\n编译器根据规则，在编译时自动插入清理代码。',
            },
            {
              type: 'think-first',
              question: '程序运行时会占用内存来存数据。当数据不再需要时，内存应该怎么处理？\n\n你觉得有几种可能的方案？每种方案可能有什么问题？先写下你的想法。',
              reveal: '主要有三种方案：\n\n1. **手动释放**（C/C++）：程序员自己负责释放。问题：容易忘记（内存泄漏）或释放两次（崩溃）\n2. **垃圾回收**（Java/Python/Go）：运行时自动检测并回收。问题：有性能开销，不可预测的暂停\n3. **所有权系统**（Rust）：编译器根据规则自动插入释放代码。问题：学习曲线陡峭，但零运行时开销\n\nRust 选择了方案 3——这就是我们要学的所有权。',
            },
            {
              type: 'explain',
              title: 'C/C++ 手动管理的问题',
              content:
                'C/C++ 让程序员自己管理内存。\n\n问题是人总会犯错：\n\n❌ **忘记释放** → 内存泄漏。程序占用的内存越来越多，最终崩溃或拖慢系统\n\n❌ **释放后再用** → 读到了别的程序的数据，安全漏洞！\n\n❌ **释放两次** → 程序直接崩溃\n\n历史上很多严重的安全漏洞（包括浏览器漏洞、操作系统漏洞）都来自内存管理错误。',
            },
            {
              type: 'explain',
              title: '垃圾回收（GC）的代价',
              content:
                'Python、Java、Go 等语言用"垃圾回收器"自动清理。\n\n优点：程序员不用管内存，方便快速开发。\n\n缺点：\n\n⏱️ **停顿** — 垃圾回收器工作时，程序会暂停（"Stop the World"），游戏卡顿、接口延迟就是这个原因之一\n\n💾 **额外开销** — 垃圾回收器本身需要占用 CPU 和内存\n\n对于追求极致性能（操作系统、游戏引擎、嵌入式设备）的场景，这个代价是无法接受的。',
            },
            {
              type: 'explain',
              title: 'Rust 的方案：编译时解决',
              content:
                'Rust 选择了第三条路：**让编译器根据所有权规则，在编译时自动插入清理代码。**\n\n效果：\n\n✅ **零运行时开销** — 清理代码在编译时就确定了，运行时不需要额外工作\n\n✅ **没有内存泄漏** — 编译器不允许你写出会泄漏内存的代码\n\n✅ **没有垃圾回收停顿** — 根本没有垃圾回收器\n\n代价是：你需要理解所有权规则，写代码时要遵守这些规则。\n\n这就是 Rust 学习曲线稍陡的原因——但一旦通过编译，程序就是安全的！',
            },
            {
              type: 'ai-prompt',
              title: '让 AI 帮你深入对比',
              scenario: '你已经了解了三种内存管理方案的优缺点。让 AI 帮你用一个具体场景来感受区别。',
              prompt: '假设我要写一个高频交易系统，每毫秒处理数千笔交易。用简单易懂的中文解释：\n1. 为什么不能用 Python/Java 的垃圾回收方案（GC）？\n2. 为什么不能用 C/C++ 的手动内存管理？\n3. Rust 的所有权方案如何解决这两个问题？\n请用非专业人士也能看懂的语言，不超过 300 字。',
              explanation: '真实场景（高频交易）让你直观感受"内存管理方式"的影响。要求用非专业语言，让 AI 解释得更接地气，而不是堆砌术语。',
            },
            {
              type: 'quiz',
              question: 'Rust 的所有权系统主要解决了什么问题？',
              options: [
                '让程序运行得更快',
                '让代码更容易阅读',
                '在编译时自动管理内存，避免内存泄漏和运行时垃圾回收的开销',
                '让 Rust 支持更多平台',
              ],
              correctIndex: 2,
              explanation:
                '所有权系统的核心目的是内存安全：不需要程序员手动管理（避免 C/C++ 的错误），也不需要运行时垃圾回收器（避免 GC 的停顿和开销）。编译器在编译时就确定所有内存清理的时机。',
            },
          ],
        },

        // --- 4.3 所有权三条规则 ---
        {
          id: 'ownership-rules',
          title: '所有权三条规则',
          cards: [
            {
              type: 'explain',
              title: 'Rust 所有权的三条规则',
              content:
                'Rust 的所有权系统建立在三条简单规则之上。\n\n理解并记住它们，后面的一切就都能推导出来：\n\n**规则一：每个值都有一个主人（owner）**\n每个数据只属于一个变量。\n\n**规则二：同一时间只能有一个主人**\n不能两个变量同时"拥有"同一份数据。\n\n**规则三：主人离开作用域，值自动被释放**\n变量出了它所在的花括号范围，它拥有的数据就自动清理了。',
              analogy:
                '图书馆规则：每本书（值）有且只有一个当前借书人（主人）。借书人出了图书馆（作用域），书自动回到书架（释放）。不允许两个人同时"持有"同一本书。',
            },
            {
              type: 'explain',
              title: '什么是作用域？',
              content:
                '**作用域**就是变量"有效"的范围，通常是一对花括号 `{}` 包起来的区域。\n\n变量从声明开始"存在"，到它所在的花括号结束时"消亡"。\n\n```rust\n{                        // s 还不存在\n    let s = "hello";     // s 从这里开始有效\n    println!("{}", s);   // 可以使用 s\n}                        // 这里 s 结束，内存自动释放\n// 这里用 s 会报错\n```\n\n这个"自动释放"就是所有权规则三在发挥作用——不需要你手动清理！',
            },
            {
              type: 'code',
              title: '作用域示例',
              description:
                '运行这段代码，观察不同作用域中变量的生命周期。\n\n注意内层花括号里的 `inner` 在外面无法访问。',
              language: 'rust',
              runnable: true,
              code: 'fn main() {\n    let outer = "外层变量";\n    println!("可以用 outer: {}", outer);\n\n    {\n        let inner = "内层变量";\n        println!("内层可以用 inner: {}", inner);\n        println!("内层也能用 outer: {}", outer);\n    }\n    // inner 到这里已经被释放了\n    // println!("{}", inner);  // 这行会报错！\n\n    println!("outer 还在: {}", outer);\n    println!("程序结束，outer 也被释放");\n}',
            },
            {
              type: 'explain',
              title: '为什么三条规则能保证安全？',
              content:
                '让我们用图书馆类比理解：\n\n**规则一**（每本书只有一个借书人）→ 知道谁负责还书\n\n**规则二**（同一时间只有一个借书人）→ 避免两个人同时修改书，产生冲突\n\n**规则三**（借书人出馆，书自动归还）→ 不会出现"忘记还书"（内存泄漏）的情况\n\n这三条规则让编译器可以在任何地方、任何时刻精确地知道：这份数据现在属于谁，什么时候可以被清理。\n\n不需要运行时跟踪，不需要垃圾回收器，零额外开销！',
            },
            {
              type: 'ai-prompt',
              title: '让 AI 用具体代码解释规则',
              scenario: '三条规则听起来简单，但在代码里怎么体现？让 AI 用代码演示每一条。',
              prompt: '用 Rust 代码分别演示所有权的三条规则：\n1. 规则一：创建一个 String，展示它有一个主人（变量）\n2. 规则二：展示把 String 赋值给另一个变量后，原变量失效（只演示概念，可以用注释说明会报错的地方）\n3. 规则三：用花括号创建一个内层作用域，展示变量离开作用域后自动释放\n每段代码都加上中文注释，解释哪条规则在起作用。',
              explanation: '要求 AI 用代码演示而不是文字描述，让抽象规则变得具体可见。要求中文注释让代码本身成为学习材料。',
            },
            {
              type: 'quiz',
              question: '根据所有权规则三，下面的 String 什么时候会被自动释放？\n\n```rust\nfn main() {\n    let s = String::from("hello");\n    println!("{}", s);\n}  // ← 这里\n```',
              options: [
                '调用 `println!` 之后立即释放',
                '程序员手动调用 free() 时',
                '`main` 函数的花括号 `}` 结束时',
                '垃圾回收器下次运行时',
              ],
              correctIndex: 2,
              explanation:
                '`s` 的作用域是 `main` 函数的花括号范围。当执行到最后的 `}` 时，`s` 离开作用域，Rust 自动调用清理代码，释放堆上的 "hello" 数据。不需要手动释放，也没有垃圾回收器。',
            },
          ],
        },

        // --- 4.4 移动语义 ---
        {
          id: 'move-semantics',
          title: '移动语义（Move）',
          cards: [
            {
              type: 'explain',
              title: '把数据"交给"另一个变量',
              content:
                '所有权规则说：同一时间只能有一个主人。\n\n那如果我把一个变量赋值给另一个变量，会发生什么？\n\n对于 `String` 这类存在堆上的数据——所有权会**转移（Move）**：\n\n```rust\nlet s1 = String::from("hello");\nlet s2 = s1;  // 所有权从 s1 转移到 s2\n```\n\n此时 `s1` 就**失效**了——它不再是主人，不能再使用。\n\n这样做的目的：保证同一份堆数据永远只有一个主人，避免"双重释放"崩溃。',
            },
            {
              type: 'diagram',
              title: '移动的过程',
              description: '看动画演示：当 `let s2 = s1` 发生后，所有权从 `s1` 转移到 `s2`，`s1` 变灰失效：',
              svg: ownershipMoveSvg,
            },
            {
              type: 'code',
              title: '先看正常工作的代码',
              description:
                '这段代码展示所有权转移后，正确使用新变量 `s2`（不再使用 `s1`）。\n\n运行成功——这是好的写法。',
              language: 'rust',
              runnable: true,
              code: 'fn main() {\n    let s1 = String::from("hello");\n    let s2 = s1;  // 所有权转移给 s2\n\n    // s1 已经失效，我们只用 s2\n    println!("s2 = {}", s2);\n    println!("程序正常运行！");\n}',
            },
            {
              type: 'code',
              title: '现在看错误代码（这是正常的！）',
              description:
                '下面的代码在转移所有权后，试图继续使用 `s1`。\n\n点击运行——你会看到编译器报错。**这是正常的，不要担心！**\n\n仔细看报错信息，编译器会明确告诉你问题在哪一行。这正是 Rust 在保护你不写出 bug。',
              language: 'rust',
              runnable: true,
              code: 'fn main() {\n    let s1 = String::from("hello");\n    let s2 = s1;  // 所有权转移给 s2\n\n    // 尝试使用已经失效的 s1\n    println!("s1 = {}", s1);  // ← 这里会报错！\n    println!("s2 = {}", s2);\n}',
            },
            {
              type: 'explain',
              title: '函数调用也会转移所有权',
              content:
                '把 `String` 传给函数，也会发生所有权转移！\n\n```rust\nfn take_ownership(s: String) {\n    println!("{}", s);\n}  // s 在这里被释放\n\nfn main() {\n    let s = String::from("hello");\n    take_ownership(s);  // 所有权转移进函数\n    // s 在这里已经失效！\n}\n```\n\n这就是为什么下一章要学**引用（借用）**——可以让函数使用数据，但不转移所有权。',
            },
            {
              type: 'explain',
              title: '整数不会移动——因为 Copy',
              content:
                '你可能注意到，整数赋值后不会失效：\n\n```rust\nlet x = 5;\nlet y = x;\nprintln!("{} {}", x, y);  // 正常！x 没有失效\n```\n\n为什么？因为整数实现了 **`Copy` 特性**。\n\n整数存在栈上，大小固定，复制速度极快。所以 Rust 在赋值时直接复制一份数据，两个变量各有一份——不需要"转移"。\n\n下一课会详细讲 Clone 和 Copy 的区别。',
            },
            {
              type: 'ai-prompt',
              title: '让 AI 帮你理解移动语义',
              scenario: '移动语义有点绕？让 AI 用更多例子帮你建立直觉。',
              prompt: '用 Rust 写 3 个代码片段，帮助初学者理解所有权的移动（Move）语义：\n1. String 赋值时发生移动（展示原变量失效）\n2. String 传给函数时发生移动（展示函数调用后原变量失效）\n3. 整数赋值不发生移动（展示 Copy 类型的行为）\n每个片段都加上中文注释，解释发生了什么。对于会报错的代码，在注释里说明"以下是错误示例"，不要真正产生编译错误。',
              explanation: '三个对比例子帮你建立对移动语义的全面认识。让 AI 用注释标注"错误示例"而不是真的写出报错代码，这样你可以一次性看到所有例子。',
            },
            {
              type: 'fill-blank',
              title: '填写所有权转移代码',
              description: '填入正确的变量名，完成这段所有权转移后正确使用新变量的代码。',
              template: 'fn main() {\n    let s1 = String::from("hello");\n    let ___BLANK___ = s1;\n    println!("{}", ___BLANK___);\n}',
              blanks: ['s2', 's2'],
              language: 'rust',
              hints: ['给新变量起个名字', '所有权转移后，该用哪个变量？'],
            },
            {
              type: 'quiz',
              question: '下面代码会发生什么？\n\n```rust\nlet s1 = String::from("hello");\nlet s2 = s1;\nprintln!("{}", s1);\n```',
              options: [
                '正常运行，打印 "hello"',
                '编译报错，因为 s1 的所有权已经移动给了 s2，s1 失效',
                '打印两次 "hello"',
                '运行时崩溃',
              ],
              correctIndex: 1,
              explanation:
                '`let s2 = s1` 把 `String` 的所有权从 `s1` 转移到 `s2`。之后 `s1` 就失效了，不能再使用。编译器会在编译阶段发现这个错误并报告，而不是等到运行时崩溃——这正是 Rust 的安全保证。',
            },
          ],
        },

        // --- 4.5 Clone 与 Copy ---
        {
          id: 'clone-and-copy',
          title: 'Clone 与 Copy',
          cards: [
            {
              type: 'explain',
              title: '想要"真正复制"怎么办？',
              content:
                '有时候你确实需要两份独立的数据，而不是转移所有权。\n\n这时候可以用 `.clone()` 方法，它会**深拷贝**：在堆上创建完整的数据副本。\n\n```rust\nlet s1 = String::from("hello");\nlet s2 = s1.clone();  // 深拷贝，s1 和 s2 各有一份\n\nprintln!("s1 = {}", s1);  // 正常！s1 没有失效\nprintln!("s2 = {}", s2);\n```\n\n代价是：克隆需要分配新的堆内存并复制数据，比移动慢。只在确实需要两份独立数据时才使用。',
            },
            {
              type: 'code',
              title: 'clone() 示例',
              description:
                '用 `.clone()` 创建独立副本，两个变量都可以正常使用。\n\n运行这段代码，看看 `s1` 和 `s2` 各自独立的值。',
              language: 'rust',
              runnable: true,
              code: 'fn main() {\n    let s1 = String::from("hello");\n    let s2 = s1.clone();  // 深拷贝\n\n    println!("s1 = {}", s1);  // s1 还在！\n    println!("s2 = {}", s2);  // s2 是独立的副本\n\n    // 修改其中一个，不影响另一个\n    // （后面学 mut 时可以验证这一点）\n    println!("它们是完全独立的两份数据");\n}',
            },
            {
              type: 'explain',
              title: 'Copy 特性：自动复制的类型',
              content:
                '有些类型在赋值时**自动复制**，不会发生移动。这些类型实现了 `Copy` 特性。\n\n**实现了 Copy 的类型（赋值时自动复制）：**\n- 所有整数类型：`i32`, `u32`, `i64` 等\n- 浮点类型：`f32`, `f64`\n- 布尔类型：`bool`\n- 字符类型：`char`\n- 元组（如果所有元素都是 Copy 类型）\n\n**没有 Copy 的类型（赋值时移动）：**\n- `String`\n- `Vec`（动态数组）\n- 自定义结构体（除非你手动派生 Copy）\n\n规律：**存在堆上的数据**不能自动 Copy，因为复制代价较高。',
            },
            {
              type: 'code',
              title: 'Copy 类型 vs 移动类型对比',
              description:
                '观察整数（Copy 类型）和 String（移动类型）赋值后的不同行为。\n\n整数 `x` 赋值后仍然有效，String `s1` 赋值后失效。',
              language: 'rust',
              runnable: true,
              code: 'fn main() {\n    // 整数是 Copy 类型\n    let x = 42;\n    let y = x;      // 自动复制一份\n    println!("x = {}", x);  // x 还在！\n    println!("y = {}", y);  // y 是独立的副本\n\n    // String 不是 Copy 类型，用 clone 复制\n    let s1 = String::from("hello");\n    let s2 = s1.clone();\n    println!("s1 = {}", s1);\n    println!("s2 = {}", s2);\n\n    println!("整数自动复制，String 需要显式 clone");\n}',
            },
            {
              type: 'explain',
              title: '什么时候用 clone，什么时候用引用？',
              content:
                '`clone` 可以解决所有权问题，但它有代价——需要复制数据。\n\n一般来说：\n\n- 如果你只是**临时借用**数据（不需要独立副本），下一章学的**引用（`&`）**是更好的选择\n- 如果你确实需要**两份独立的数据**，才用 `.clone()`\n\n一个经验法则：\n> 写代码时先想能不能用引用，不行再考虑 `clone`。\n\n别担心，学完下一章你就明白了！',
            },
            {
              type: 'ai-prompt',
              title: '让 AI 帮你巩固 Clone 和 Copy',
              scenario: '你已经学完了 Clone 和 Copy 的区别。让 AI 帮你用一个实际场景综合练习。',
              prompt: '用 Rust 写一个模拟学生信息管理的程序：\n1. 用 String 存储学生姓名，用 i32 存储成绩\n2. 演示把学生信息"传给"不同的处理函数（显示、存档等）\n3. 展示哪些地方需要用 .clone()，哪些地方可以不用（整数直接复制）\n4. 每个关键操作加上中文注释，说明所有权发生了什么变化\n不要用引用（还没学到）。',
              explanation: '真实场景（学生信息管理）比抽象例子更有记忆点。限定"不用引用"让代码只展示已学的概念，避免引入尚未学习的语法让你困惑。',
            },
            {
              type: 'quiz',
              question: '下面哪种说法正确？',
              options: [
                '所有类型赋值时都会复制一份数据',
                '所有类型赋值时都会转移所有权',
                '实现了 Copy 特性的类型（如整数）赋值时自动复制，String 等类型赋值时转移所有权',
                '只有用 .clone() 才能复制数据',
              ],
              correctIndex: 2,
              explanation:
                '整数、布尔等实现了 Copy 特性的类型，赋值时自动在栈上复制一份（速度快）。String 等堆上的数据，赋值时转移所有权（避免重复清理）。想要显式深拷贝 String，需要调用 `.clone()`。',
            },
          ],
        },
      ],
    },

    // =============================================
    // 第五章：引用与借用
    // =============================================
    {
      id: 'ch5-borrowing',
      title: '第五章：引用与借用',
      lessons: [
        // --- 5.1 引用的概念 ---
        {
          id: 'references',
          title: '引用的概念',
          cards: [
            {
              type: 'explain',
              title: '不转移所有权，能用数据吗？',
              content:
                '上一章我们学到：把 `String` 传给函数，所有权就转移了，函数结束后数据就没了。\n\n但很多时候，你只是想让函数**读一下**数据，并不想失去它。\n\n就像借朋友的书看——你只是借过来读一读，不是要"拥有"这本书。看完要还的。\n\n**引用（Reference）**就是这个借阅的概念。\n\n用 `&` 符号创建引用：不移动所有权，只是"借用"数据。',
              analogy:
                '引用就像图书馆的阅览证：你可以坐在馆里看书，但书还是图书馆的，你不能带走。',
            },
            {
              type: 'think-first',
              question: '我们学了所有权转移（move）——把值给别人后自己就不能用了。\n\n但如果你只是想让一个函数"看一眼"你的数据，不想把数据送出去呢？你觉得 Rust 会怎么设计这个功能？',
              reveal: 'Rust 的解决方案是**借用（Borrowing）**——用 `&` 符号创建引用。\n\n引用就像"借书"：你把书借给朋友看，朋友看完还给你，书还是你的。\n\n- `&x` = 不可变借用（只读，可以多人同时借）\n- `&mut x` = 可变借用（可写，一次只能借给一人）',
            },
            {
              type: 'diagram',
              title: '引用：多个人同时"借阅"同一份数据',
              description: '看动画演示：原始数据（主人）还在，多个引用可以同时指向它——但谁都没有拿走它：',
              svg: borrowingSvg,
            },
            {
              type: 'explain',
              title: '引用的语法',
              content:
                '创建引用：在变量名或类型前加 `&`\n\n```rust\nlet s = String::from("hello");\nlet r = &s;  // r 是对 s 的引用\n```\n\n函数参数也可以接受引用：\n\n```rust\nfn print_string(s: &String) {\n    println!("{}", s);\n}\n```\n\n调用时传入引用：\n\n```rust\nprint_string(&s);  // 借给函数，不转移所有权\n// s 还在！可以继续用\n```',
            },
            {
              type: 'code',
              title: '用引用传递数据给函数',
              description:
                '对比之前（转移所有权）和现在（使用引用）的写法。\n\n注意函数参数类型是 `&String`，调用时传 `&s`。\n\n函数调用后，`s` 仍然有效！',
              language: 'rust',
              runnable: true,
              code: 'fn calculate_length(s: &String) -> usize {\n    s.len()  // 返回字符串的长度\n}\n\nfn main() {\n    let s = String::from("hello world");\n\n    let len = calculate_length(&s);  // 借用 s，不转移所有权\n\n    // s 还在！引用没有拿走所有权\n    println!("字符串: \"{}\"", s);\n    println!("长度: {}", len);\n}',
            },
            {
              type: 'code',
              title: '多个引用可以同时存在',
              description:
                '同一份数据可以被多个不可变引用同时借用。\n\n这是安全的——大家都只是"看"，不修改，不会有冲突。',
              language: 'rust',
              runnable: true,
              code: 'fn main() {\n    let s = String::from("Rust 很好玩");\n\n    let r1 = &s;  // 第一个引用\n    let r2 = &s;  // 第二个引用\n    let r3 = &s;  // 第三个引用\n\n    // 三个引用都可以用\n    println!("r1: {}", r1);\n    println!("r2: {}", r2);\n    println!("r3: {}", r3);\n\n    // s 还是主人，一直有效\n    println!("原始数据 s: {}", s);\n}',
            },
            {
              type: 'ai-prompt',
              title: '让 AI 帮你理解引用的价值',
              scenario: '你已经学会了用 & 创建引用。让 AI 帮你把引用和之前的所有权转移做对比。',
              prompt: '用 Rust 写一个对比示例，展示两种方式的区别：\n1. 方式一：把 String 传给函数（所有权转移），展示函数调用后原变量失效的问题\n2. 方式二：把 &String 引用传给函数（借用），展示函数调用后原变量仍然有效\n两种方式都做同一件事：计算字符串的字符数并打印。用中文注释解释每种方式的特点和适用场景。',
              explanation: '直接对比两种方式，让你直观感受引用解决了什么问题。"做同一件事但方式不同"的对比比单独讲一种方式印象深刻。',
            },
            {
              type: 'fill-blank',
              title: '填写引用语法',
              description: '填入正确的引用符号，完成这个使用借用而不转移所有权的代码。',
              template: 'fn print_len(s: ___BLANK___String) {\n    println!("长度: {}", s.len());\n}\n\nfn main() {\n    let my_str = String::from("hello");\n    print_len(___BLANK___my_str);\n    println!("还能用: {}", my_str);\n}',
              blanks: ['&', '&'],
              language: 'rust',
              hints: ['借用一个值用什么符号？', '调用时也要加上借用符号'],
            },
            {
              type: 'quiz',
              question: '下面的代码中，`calculate_length(&s)` 调用后，`s` 的状态是？',
              options: [
                's 失效了，不能再使用',
                's 仍然有效，可以继续使用',
                's 被复制了一份',
                's 变成了引用',
              ],
              correctIndex: 1,
              explanation:
                '`&s` 创建的是引用，只是借用数据，没有转移所有权。函数 `calculate_length` 接收的是引用（`&String`），它"借"了数据，看完就还了。`s` 自始至终都是主人，函数调用后完全可以继续使用 `s`。',
            },
          ],
        },

        // --- 5.2 可变引用 ---
        {
          id: 'mutable-references',
          title: '可变引用',
          cards: [
            {
              type: 'explain',
              title: '不只是看，还想修改？',
              content:
                '不可变引用（`&`）只能读，不能改。\n\n如果函数需要修改借来的数据，就需要**可变引用（`&mut`）**。\n\n规则：\n\n1. 被借用的变量本身必须是 `mut` 的\n2. 用 `&mut` 创建可变引用\n3. **同一时间只能有一个可变引用**（这是关键限制！）\n\n这个限制防止了"数据竞争"——多处同时修改同一数据会导致不可预测的结果。',
              analogy:
                '可变引用就像借别人的笔记本来写字：一次只能一个人写，不然写乱了。',
            },
            {
              type: 'code',
              title: '可变引用示例',
              description:
                '注意：\n1. `s` 要声明为 `let mut s`\n2. 传引用时写 `&mut s`\n3. 函数参数类型是 `&mut String`\n\n函数通过可变引用修改了原始数据。',
              language: 'rust',
              runnable: true,
              code: 'fn add_greeting(s: &mut String) {\n    s.push_str("，你好！");\n}\n\nfn main() {\n    let mut s = String::from("小明");\n    println!("修改前: {}", s);\n\n    add_greeting(&mut s);  // 传可变引用\n\n    println!("修改后: {}", s);  // s 被修改了！\n}',
            },
            {
              type: 'explain',
              title: '一次只能有一个可变引用',
              content:
                'Rust 的重要限制：**同一时间，同一数据只能有一个可变引用。**\n\n下面的代码会报错：\n\n```rust\nlet mut s = String::from("hello");\nlet r1 = &mut s;\nlet r2 = &mut s;  // 错误！已经有一个可变引用了\n```\n\n为什么？防止数据竞争（data race）。\n\n想象两个人同时在同一份文件上编辑——一个人删了第 3 行，另一个人在第 3 行插入内容，结果是什么？一片混乱。\n\nRust 在编译时就阻止这种情况发生。',
            },
            {
              type: 'code',
              title: '可变引用和不可变引用不能共存',
              description:
                '另一个规则：**当存在可变引用时，不能同时存在不可变引用。**\n\n下面的代码展示了这个错误。点击运行看编译器的报错信息。\n\n看到报错是正常的——这正是 Rust 在保护你！',
              language: 'rust',
              runnable: true,
              code: 'fn main() {\n    let mut s = String::from("hello");\n\n    let r1 = &s;      // 不可变引用\n    let r2 = &mut s;  // 尝试同时创建可变引用\n\n    // 编译器会拒绝：不可变引用还在用时，不能有可变引用\n    println!("{} {}", r1, r2);\n}',
            },
            {
              type: 'ai-prompt',
              title: '让 AI 解释为什么有这个限制',
              scenario: '可变引用的限制有点严格，为什么 Rust 要这样设计？让 AI 帮你深入理解背后的原因。',
              prompt: '用通俗的中文解释 Rust 中"同一时间只能有一个可变引用"这条规则的原因：\n1. 举一个现实生活中的例子，说明同时多处修改同一数据会出什么问题\n2. 在并发（多线程）场景下，这条规则如何防止 bug\n3. 给一段 Rust 代码，展示如果没有这条规则可能出现什么问题（可以用注释描述）\n不超过 400 字，保持简洁。',
              explanation: '让 AI 解释"为什么"而不仅是"是什么"，能帮你建立更深的理解。理解了设计动机，记住规则就容易多了。',
            },
            {
              type: 'quiz',
              question: '下面哪段代码是正确的（能通过编译）？',
              options: [
                '`let r1 = &mut s; let r2 = &mut s;`（两个可变引用同时存在）',
                '`let r1 = &s; let r2 = &s;`（两个不可变引用同时存在）',
                '`let r1 = &s; let r2 = &mut s;`（不可变和可变引用同时存在）',
                '以上都不对',
              ],
              correctIndex: 1,
              explanation:
                '多个不可变引用可以同时存在——大家都只读，互不干扰。但同时存在两个可变引用，或同时存在可变引用和不可变引用，都会被编译器拒绝。这保证了"读的时候数据不会被改"。',
            },
          ],
        },

        // --- 5.3 借用规则总结 ---
        {
          id: 'borrowing-rules',
          title: '借用规则总结',
          cards: [
            {
              type: 'explain',
              title: '借用的三条规则',
              content:
                '到目前为止，我们学了引用和可变引用。把规则总结一下：\n\n- **规则一：** 同一时间，可以有**任意多个不可变引用**（`&`）——多人同时看书，没问题\n- **规则二：** 同一时间，只能有**一个可变引用**（`&mut`）——只能一人写字\n- **规则三：** 不可变引用和可变引用**不能同时存在**——有人在写字时，其他人不能看（防止读到一半的数据）\n- **规则四：** 引用必须**始终有效**——不能引用一个已经被释放的数据（Rust 编译器会检查这点）',
            },
            {
              type: 'explain',
              title: '为什么这些规则合理？',
              content:
                '这四条规则组合起来，防止了三类经典 bug：\n\n❌ **数据竞争** — 同时多处写同一数据 → 规则二禁止\n\n❌ **读到修改中的数据** — 有人在写的时候别人在读 → 规则三禁止\n\n❌ **悬垂引用** — 指向已释放内存的引用 → 规则四保证\n\n这些 bug 在 C/C++ 中非常常见，而且往往很难发现（有时运行好多次才偶发一次）。\n\nRust 在编译阶段就把它们全拦下来了。',
            },
            {
              type: 'code',
              title: '合法的引用模式',
              description:
                '这段代码展示了正确使用引用的几种模式。\n\n注意：引用的"有效期"在最后一次使用时就结束了，不是到花括号结尾。所以可以在用完不可变引用后，再创建可变引用。',
              language: 'rust',
              runnable: true,
              code: 'fn main() {\n    let mut s = String::from("hello");\n\n    // 1. 多个不可变引用同时存在 ✅\n    let r1 = &s;\n    let r2 = &s;\n    println!("r1: {}, r2: {}", r1, r2);\n    // r1 和 r2 在这里已经用完，它们的有效期结束\n\n    // 2. 用完不可变引用之后，可以创建可变引用 ✅\n    let r3 = &mut s;\n    r3.push_str(", world");\n    println!("r3: {}", r3);\n}',
            },
            {
              type: 'ai-prompt',
              title: '让 AI 帮你检查引用是否合法',
              scenario: '学完了借用规则，让 AI 给你出几道判断题，测试你的理解。',
              prompt: '给我 5 道 Rust 引用相关的判断题（每道判断"这段代码能不能编译通过"），难度适合刚学完引用和可变引用的初学者。每道题给出代码片段，然后给出答案和解释。题目要涵盖：多个不可变引用、多个可变引用、不可变和可变引用同时存在、引用使用时长等情况。用中文出题和解释。',
              explanation: '判断题是检验理解的好方式——比单纯看例子更能暴露理解盲点。让 AI 出多道题，你可以先自己判断，再看答案对照。',
            },
            {
              type: 'quiz',
              question: '关于 Rust 的借用规则，下面哪条是错误的？',
              options: [
                '可以同时有多个不可变引用（&）',
                '同一时间只能有一个可变引用（&mut）',
                '可以同时有一个可变引用和多个不可变引用',
                '引用必须始终指向有效的数据',
              ],
              correctIndex: 2,
              explanation:
                '选项 3 是错的：不可变引用和可变引用不能同时存在。当有 `&mut` 时，不能再有任何 `&`；当有 `&` 时，不能创建 `&mut`。这保证了"有人读的时候没人在写"。',
            },
          ],
        },

        // --- 5.4 切片 ---
        {
          id: 'slices',
          title: '切片（Slice）',
          cards: [
            {
              type: 'explain',
              title: '切片：借用一部分数据',
              content:
                '到目前为止，引用都是针对整个变量的。\n\n有时候你只需要数据的**一部分**。\n\n比如：一本书有 300 页，你只想借第 10 到 30 页来看。\n\n**切片（Slice）**就是这个"借用一部分"的工具。\n\n切片不会复制数据，只是创建一个指向原始数据某个范围的引用。',
              analogy:
                '切片就像拿一把尺子在书上框定"第 10 到 30 页"——你没有复印这些页，只是指明了一个范围。',
            },
            {
              type: 'explain',
              title: 'String 和 &str 到底是什么关系？',
              content:
                '这是 Rust 初学者最困惑的问题之一。先记住一句话：\n\n> **`String` 是主人，`&str` 是借条。**\n\n**`String`**：\n- 拥有数据的所有权（主人）\n- 存在堆上，可以增长（push、拼接）\n- 用 `String::from("hello")` 创建\n\n**`&str`**：\n- 是对字符串数据的**引用**（借用，不拥有）\n- 可以指向 `String` 的一部分（切片），也可以指向字符串字面量\n- 字符串字面量 `"hello"` 的类型就是 `&str`\n\n**它们的关系**：\n\n```\nString ---&---> &str  （借用：&my_string 或 &my_string[..] ）\n&str  ---to_string()--> String  （复制一份，变成有所有权的）\n```\n\n**函数参数用哪个？** 一般用 `&str`——因为它既能接受 `String` 的引用，也能接受字面量，更通用。',
              analogy:
                '`String` 就像你自己写的一本笔记本（你拥有它，可以加页）。`&str` 就像别人翻开你的笔记本看了几页（借用，只能看不能改，看完还给你）。',
            },
            {
              type: 'explain',
              title: '字符串切片语法',
              content:
                '用 `&变量[开始..结束]` 可以"切"出字符串的一部分：\n\n```rust\nlet s = String::from("hello world");\nlet hello = &s[0..5];   // "hello"\nlet world = &s[6..11];  // "world"\n```\n\n`[start..end]` 表示：从第 `start` 个字节开始，到第 `end` 个字节（不含 end）。\n\n**简写**：\n- `&s[..5]` = 从头到第 5 个字节\n- `&s[6..]` = 从第 6 个字节到末尾\n- `&s[..]` = 整个字符串\n\n**注意**：切片结果的类型是 `&str`。原始的 `s` 仍然是 `String`，没有被移动或复制。',
            },
            {
              type: 'code',
              title: '试试字符串切片',
              description:
                '切出字符串的不同部分。\n\n注意看：`&s[..5]` 得到的是 `&str`（借用了一部分），`s` 本身还是完整的 `String`。',
              language: 'rust',
              runnable: true,
              code: 'fn main() {\n    let s = String::from("hello world");\n\n    let hello = &s[..5];\n    let world = &s[6..];\n\n    println!("前半部分: {}", hello);\n    println!("后半部分: {}", world);\n    println!("完整字符串还在: {}", s);\n}',
            },
            {
              type: 'code',
              title: '函数参数用 &str 更通用',
              description:
                '下面的 `greet` 函数接受 `&str` 类型的参数。\n\n它既可以接受 `String` 的引用（`&name`），也可以接受字符串字面量（`"World"`）。\n\n**这就是为什么 Rust 社区推荐函数参数用 `&str` 而不是 `&String`。**',
              language: 'rust',
              runnable: true,
              code: 'fn greet(name: &str) {\n    println!("你好, {}!", name);\n}\n\nfn main() {\n    let my_name = String::from("Rustacean");\n\n    greet(&my_name);    // String 的引用 -> 自动变成 &str\n    greet("World");     // 字符串字面量本身就是 &str\n    greet(&my_name[..4]); // String 的切片 -> &str\n}',
            },
            {
              type: 'explain',
              title: '数组切片：&[i32]',
              content:
                '除了字符串，其他类型的数组也可以切片。\n\n```rust\nlet arr = [1, 2, 3, 4, 5];\nlet slice = &arr[1..4];  // [2, 3, 4]\n```\n\n切片类型是 `&[元素类型]`，比如 `&[i32]`。\n\n这在需要处理数组的一部分时非常有用，不用复制整个数组。',
            },
            {
              type: 'code',
              title: '数组切片示例',
              description:
                '对数组进行切片，处理其中的一段数据。\n\n切片让你可以"聚焦"在数组的某个范围，而不需要复制数据。',
              language: 'rust',
              runnable: true,
              code: 'fn sum_slice(slice: &[i32]) -> i32 {\n    let mut total = 0;\n    for &num in slice {\n        total += num;\n    }\n    total\n}\n\nfn main() {\n    let numbers = [10, 20, 30, 40, 50, 60];\n\n    // 整个数组\n    println!("全部之和: {}", sum_slice(&numbers));\n\n    // 前三个\n    println!("前三个之和: {}", sum_slice(&numbers[..3]));\n\n    // 中间部分\n    println!("中间三个之和: {}", sum_slice(&numbers[2..5]));\n}',
            },
            {
              type: 'ai-prompt',
              title: '让 AI 帮你练习切片',
              scenario: '你已经学会了字符串切片（&str）和数组切片（&[i32]）。让 AI 帮你写一个综合练习。',
              prompt: '用 Rust 写一个文本处理程序，练习字符串切片：\n1. 给定一个以空格分隔的英文句子（如 "the quick brown fox"），找出所有单词\n2. 打印每个单词和它的长度\n3. 找出最长的单词\n要求：用 &str 切片，不要复制字符串（不用 String::from 或 to_string 转换），尽量只用已学的 fn、for、if、&str 语法。加上中文注释。',
              explanation: '文本处理是切片的典型应用场景。限定不复制字符串，强迫你真正使用切片而不是偷懒复制。中文注释让你在写代码时思考每步操作的含义。',
            },
            {
              type: 'quiz',
              question: '`&str` 和 `String` 的关系是？',
              options: [
                '它们完全一样，可以互换使用',
                '`&str` 是对字符串数据的引用（切片），`String` 是拥有所有权的可增长字符串',
                '`String` 是 `&str` 的简写',
                '`&str` 只能用于字符串字面量，`String` 只能用于变量',
              ],
              correctIndex: 1,
              explanation:
                '`String` 是一个有所有权的、可以增长的字符串，数据存在堆上。`&str` 是对某段字符串数据的引用（切片），它可以指向 `String` 的某部分，也可以指向代码中的字符串字面量（存在程序的只读段）。函数参数一般接受 `&str` 而不是 `&String`，因为更通用。',
            },
          ],
        },
      ],
    },

    // =============================================
    // 第六章：结构化数据
    // =============================================
    {
      id: 'ch6-structs',
      title: '第六章：结构化数据',
      lessons: [
        // --- 6.1 结构体 ---
        {
          id: 'structs',
          title: '结构体定义与使用',
          cards: [
            {
              type: 'explain',
              title: '把相关数据组织在一起',
              content:
                '假设你要记录一个用户的信息：名字、年龄、邮箱。\n\n用三个独立变量很乱：\n\n```rust\nlet name = "小明";\nlet age = 18;\nlet email = "xm@example.com";\n```\n\n有没有办法把它们"打包"在一起？\n\n**结构体（struct）**就是这个打包工具。',
              analogy:
                '结构体就像一张**名片**或**表单**。名片上有姓名、电话、公司——这些字段属于同一个人。结构体就是把有关联的数据放进同一个"表单"里。',
            },
            {
              type: 'explain',
              title: '定义和实例化结构体',
              content:
                '**定义**：用 `struct` 关键字声明字段名和类型：\n\n```rust\nstruct User {\n    name: String,\n    age: u32,\n    email: String,\n}\n```\n\n**实例化**：像填表单一样，给每个字段赋值：\n\n```rust\nlet user = User {\n    name: String::from("小明"),\n    age: 18,\n    email: String::from("xm@example.com"),\n};\n```\n\n**访问字段**：用 `.` 点号：\n\n```rust\nprintln!("姓名：{}", user.name);\nprintln!("年龄：{}", user.age);\n```',
            },
            {
              type: 'code',
              title: '定义、实例化、访问字段',
              description:
                '完整示例：定义 `User` 结构体，创建一个实例，访问它的字段。\n\n运行看看结果！',
              language: 'rust',
              runnable: true,
              code: 'struct User {\n    name: String,\n    age: u32,\n    email: String,\n}\n\nfn main() {\n    let user = User {\n        name: String::from("小明"),\n        age: 18,\n        email: String::from("xm@example.com"),\n    };\n\n    println!("姓名：{}", user.name);\n    println!("年龄：{}", user.age);\n    println!("邮箱：{}", user.email);\n}',
            },
            {
              type: 'code',
              title: '可变结构体实例',
              description:
                '如果需要修改字段，要把整个实例声明为 `mut`。\n\n注意：Rust 不允许只把某个字段标记为 `mut`，要么整个实例可变，要么整个不可变。',
              language: 'rust',
              runnable: true,
              code: 'struct User {\n    name: String,\n    age: u32,\n}\n\nfn main() {\n    let mut user = User {\n        name: String::from("小明"),\n        age: 18,\n    };\n\n    println!("生日前：{} 岁", user.age);\n    user.age += 1;  // 修改字段\n    println!("生日后：{} 岁", user.age);\n}',
            },
            {
              type: 'ai-prompt',
              title: '让 AI 帮你设计结构体',
              scenario: '你已经会定义和使用结构体了。现在让 AI 帮你练习用结构体建模真实场景。',
              prompt: '用 Rust 的 struct 为一个图书馆系统建模。需要定义两个结构体：\n1. `Book`：包含书名（title）、作者（author）、是否被借出（is_borrowed）\n2. `Library`：包含书库名称（name）和书的列表（用 Vec<Book>）\n然后写 fn main() 创建一个图书馆，添加 3 本书，打印出所有书的信息。用中文注释说明每一步。不要用 impl 块，只用字段访问。',
              explanation: '真实建模任务让你理解 struct 的实际用途。限定不用 impl 块，聚焦在本课核心——字段定义和访问。',
            },
            {
              type: 'explain',
              title: '`#[derive]` 是什么？',
              content:
                '有时候你想用 `{:?}` 打印一个结构体，但 Rust 会报错说"没有实现 Debug"。\n\n解决方法很简单——在结构体上方加一行 `#[derive(Debug)]`：\n\n```rust\n#[derive(Debug)]\nstruct User {\n    name: String,\n    age: u32,\n}\n\nfn main() {\n    let user = User { name: String::from("小明"), age: 18 };\n    println!("{:?}", user);  // User { name: "小明", age: 18 }\n}\n```\n\n`#[derive(...)]` 叫做**属性**，告诉编译器"帮我自动实现某些功能"。常用的有：\n\n- `Debug` — 让 `{:?}` 打印可用\n- `Clone` — 让结构体可以复制（`.clone()`）\n- `PartialEq` — 让结构体可以用 `==` 比较\n\n以后写 struct 或 enum 时，加上 `#[derive(Debug)]` 是好习惯——方便调试。',
            },
            {
              type: 'quiz',
              question: '以下哪种写法正确地访问了结构体 `user` 的 `name` 字段？',
              options: [
                'user[name]',
                'user->name',
                'user.name',
                'get(user, name)',
              ],
              correctIndex: 2,
              explanation:
                '在 Rust 中，用 `.`（点号）访问结构体的字段：`user.name`。`user[name]` 是数组/HashMap 的访问方式，`user->name` 是 C/C++ 中指针的写法，在 Rust 中不用这样写。',
            },
          ],
        },

        // --- 6.2 结构体方法 ---
        {
          id: 'struct-methods',
          title: '给结构体加方法',
          cards: [
            {
              type: 'explain',
              title: '结构体不只能存数据，还能有行为',
              content:
                '光有数据还不够。\n\n现实中，一个用户不只有姓名和年龄，他还会**做事**：打招呼、查看个人信息、更新邮箱……\n\n在 Rust 中，用 `impl`（implement，实现）块给结构体**添加方法**。\n\n方法和函数很像，区别是：方法的第一个参数是 `&self`，表示"这个结构体自己"。',
              analogy:
                '如果结构体是一台洗衣机（数据：容量、品牌），那 `impl` 块就是给它装上按钮（方法：启动、暂停、查询剩余时间）。',
            },
            {
              type: 'explain',
              title: 'impl 块语法',
              content:
                '**方法**（第一个参数是 `&self`，可以读取字段）：\n\n```rust\nimpl User {\n    fn greet(&self) {\n        println!("你好，我是 {}", self.name);\n    }\n}\n```\n\n调用方法：`user.greet();`\n\n**关联函数**（没有 `self`，类似"构造函数"）：\n\n```rust\nimpl User {\n    fn new(name: String, age: u32) -> User {\n        User { name, age, email: String::new() }\n    }\n}\n```\n\n调用关联函数：`User::new("小明".to_string(), 18)`\n\n注意关联函数用 `::` 而不是 `.`。',
            },
            {
              type: 'code',
              title: '方法和关联函数完整示例',
              description:
                '定义 `User` 结构体，用 `impl` 添加一个关联函数 `new` 和一个方法 `greet`。\n\n这是 Rust 最常见的代码组织方式。',
              language: 'rust',
              runnable: true,
              code: 'struct User {\n    name: String,\n    age: u32,\n    email: String,\n}\n\nimpl User {\n    // 关联函数：创建新用户（类似构造函数）\n    fn new(name: &str, age: u32, email: &str) -> User {\n        User {\n            name: String::from(name),\n            age,\n            email: String::from(email),\n        }\n    }\n\n    // 方法：打招呼\n    fn greet(&self) {\n        println!("你好！我叫 {}，今年 {} 岁。", self.name, self.age);\n    }\n\n    // 方法：检查是否成年\n    fn is_adult(&self) -> bool {\n        self.age >= 18\n    }\n}\n\nfn main() {\n    let user = User::new("小明", 18, "xm@example.com");\n    user.greet();\n    println!("是否成年：{}", user.is_adult());\n}',
            },
            {
              type: 'explain',
              title: '&self vs &mut self vs self',
              content:
                '方法的第一个参数决定了它能对结构体做什么：\n\n- **`&self`** — 只读，借用自身，最常用\n- **`&mut self`** — 可读写，可变借用自身\n- **`self`** — 获取所有权（调用后原变量失效），少用\n\n大多数时候用 `&self`（读取数据）或 `&mut self`（修改数据）。',
            },
            {
              type: 'code',
              title: '使用 &mut self 修改字段',
              description:
                '生日到了，年龄加一。修改自身字段要用 `&mut self`。',
              language: 'rust',
              runnable: true,
              code: 'struct User {\n    name: String,\n    age: u32,\n}\n\nimpl User {\n    fn new(name: &str, age: u32) -> User {\n        User { name: String::from(name), age }\n    }\n\n    fn birthday(&mut self) {\n        self.age += 1;\n        println!("生日快乐，{}！现在 {} 岁了！", self.name, self.age);\n    }\n}\n\nfn main() {\n    let mut user = User::new("小明", 18);\n    user.birthday();\n    user.birthday();\n}',
            },
            {
              type: 'ai-prompt',
              title: '让 AI 帮你扩展结构体方法',
              scenario: '你已经会写 impl 块了。让 AI 帮你在已有结构体上添加更多方法，练习方法设计。',
              prompt: '我有一个 Rust 结构体 Rectangle（矩形），有 width 和 height 两个 f64 字段。请为它写一个完整的 impl 块，包含：\n1. 关联函数 new(width: f64, height: f64) 创建矩形\n2. 方法 area(&self) 计算面积\n3. 方法 perimeter(&self) 计算周长\n4. 方法 is_square(&self) 判断是否正方形（返回 bool）\n5. 方法 scale(&mut self, factor: f64) 等比例缩放\n给每个方法加中文注释，最后在 main 中演示所有方法。',
              explanation: '多个方法覆盖了 &self（只读）和 &mut self（修改）两种情况，以及返回不同类型的方法。这是方法设计的标准练习。',
            },
            {
              type: 'quiz',
              question: '关联函数（如 `User::new()`）和普通方法（如 `user.greet()`）最主要的区别是什么？',
              options: [
                '关联函数速度更快',
                '关联函数没有 `self` 参数，不依赖于某个具体实例',
                '关联函数只能返回 bool',
                '关联函数不能在 impl 块里定义',
              ],
              correctIndex: 1,
              explanation:
                '关联函数（也叫静态方法）没有 `self` 参数，不需要先有实例就能调用，用 `类型名::函数名()` 调用。常用来作为构造函数（如 `String::from()`、`Vec::new()`）。普通方法有 `&self` 参数，需要通过实例调用（`实例.方法()`）。',
            },
          ],
        },

        // --- 6.3 枚举 ---
        {
          id: 'enums',
          title: '枚举：有限选项的集合',
          cards: [
            {
              type: 'explain',
              title: '当一个值只能是几种情况之一',
              content:
                '有些数据天然只有几种可能：\n\n- 快递状态：待发货、运输中、已送达、已取消\n- 交通灯：红、黄、绿\n- 方向：上、下、左、右\n\n用字符串或数字来表示这些状态容易出错（"已送大"？）。\n\n**枚举（enum）**让你精确地列出所有可能的"变体"，编译器保证你不会用到不存在的值。',
              analogy:
                '快递包裹有且只有几种状态——不存在"第五种状态"。枚举就是给这几种固定状态每个起个名字，用名字代替模糊的数字或字符串。',
            },
            {
              type: 'think-first',
              question: '你在写一个快递追踪系统。快递有这几种状态：待发货、运输中（有物流编号）、已签收（有签收人和时间）。\n\n如果只用 struct，你会怎么表示这些状态？你觉得会有什么问题？',
              reveal: '用 struct 的话可能这样：\n```rust\nstruct Delivery {\n    status: String,      // "pending" / "in_transit" / "delivered"\n    tracking_id: Option<String>,\n    receiver: Option<String>,\n    time: Option<String>,\n}\n```\n\n问题：`status` 是字符串，拼错了编译器不会报错。而且不同状态下有些字段是无意义的（待发货时 tracking_id 是什么？）。\n\n**枚举（Enum）** 完美解决这个问题——每种状态是一个变体，各自携带只属于自己的数据。编译器保证你不会漏掉任何状态。',
            },
            {
              type: 'explain',
              title: '定义枚举和变体携带数据',
              content:
                '**基本枚举**：\n\n```rust\nenum DeliveryStatus {\n    Pending,      // 待发货\n    Shipping,     // 运输中\n    Delivered,    // 已送达\n    Cancelled,    // 已取消\n}\n```\n\n**变体可以携带数据**（这是 Rust 枚举的强大之处！）：\n\n```rust\nenum Message {\n    Quit,                    // 无数据\n    Move { x: i32, y: i32 }, // 携带坐标\n    Write(String),           // 携带字符串\n    ChangeColor(u8, u8, u8), // 携带 RGB 颜色\n}\n```\n\n每个变体可以携带不同类型、不同数量的数据！',
            },
            {
              type: 'code',
              title: '枚举变体携带数据示例',
              description:
                '快递状态枚举：不同状态携带不同信息。"运输中"携带快递单号，"已送达"携带签收时间。',
              language: 'rust',
              runnable: true,
              code: '#[derive(Debug)]\nenum DeliveryStatus {\n    Pending,\n    Shipping(String),     // 携带快递单号\n    Delivered(String),    // 携带签收时间\n    Cancelled,\n}\n\nfn main() {\n    let status1 = DeliveryStatus::Pending;\n    let status2 = DeliveryStatus::Shipping(String::from("SF1234567890"));\n    let status3 = DeliveryStatus::Delivered(String::from("2024-01-15 14:30"));\n\n    // 用 {:?} 打印枚举（需要 #[derive(Debug)]）\n    println!("订单1状态：{:?}", status1);\n    println!("订单2状态：{:?}", status2);\n    println!("订单3状态：{:?}", status3);\n}',
            },
            {
              type: 'ai-prompt',
              title: '让 AI 帮你设计枚举',
              scenario: '你已经会定义枚举和让变体携带数据了。让 AI 帮你用枚举建模一个复杂场景。',
              prompt: '用 Rust 枚举为一个简单的计算器建模。定义一个 Operation 枚举，包含：加法（携带两个 f64）、减法（携带两个 f64）、乘法（携带两个 f64）、除法（携带两个 f64）。然后写一个函数 calculate(op: Operation) -> f64 来执行计算（除法暂时不处理除以零的情况）。在 main 中创建几个操作并打印结果。用中文注释解释每一步。',
              explanation: '枚举携带数据 + 函数处理的组合，是 Rust 中非常常见的模式。这道题让你从零到一设计并使用枚举。',
            },
            {
              type: 'quiz',
              question: 'Rust 的枚举变体与其他语言的枚举相比，最大的优势是什么？',
              options: [
                '枚举变体名字更短',
                '每个变体可以携带不同类型和数量的数据',
                '枚举比结构体占用更少内存',
                '枚举自动实现所有 trait',
              ],
              correctIndex: 1,
              explanation:
                '在很多语言（如 Java、C）中，枚举只是一个命名的整数。Rust 的枚举变体可以携带任意类型的数据，比如 `Shipping(String)` 携带快递单号，`Move { x: i32, y: i32 }` 携带坐标。这让枚举可以精确地表达"不同情况下需要的不同数据"。',
            },
          ],
        },

        // --- 6.4 模式匹配 ---
        {
          id: 'pattern-matching',
          title: '模式匹配：match 与 if let',
          cards: [
            {
              type: 'explain',
              title: '枚举的最佳拍档：match',
              content:
                '有了枚举，就需要根据不同变体执行不同的代码。\n\n`match` 就是专门为此设计的：\n\n```rust\nmatch status {\n    DeliveryStatus::Pending   => println!("等待发货"),\n    DeliveryStatus::Shipping(no) => println!("运输中，单号：{}", no),\n    DeliveryStatus::Delivered(t) => println!("已签收：{}", t),\n    DeliveryStatus::Cancelled => println!("已取消"),\n}\n```\n\n**关键特性：穷尽检查（exhaustive）**——Rust 要求你处理所有可能的变体。如果漏了一个，编译器会报错。这保证了你不会"忘记某种情况"。',
              analogy:
                '`match` 就像餐厅点餐系统：客人选了"牛肉"就上牛肉，选了"鱼"就上鱼，所有选项都要有对应的处理——不能有未处理的选项。',
            },
            {
              type: 'explain',
              title: '_ 通配符和 if let',
              content:
                '**`_` 通配符**：当你不关心某些变体，用 `_` 表示"其他所有情况"：\n\n```rust\nmatch status {\n    DeliveryStatus::Delivered(t) => println!("已签收：{}", t),\n    _ => println!("其他状态，暂不处理"),\n}\n```\n\n**`if let`**：只关心一种情况时，比 `match` 更简洁：\n\n```rust\n// match 写法（冗长）\nmatch status {\n    DeliveryStatus::Shipping(no) => println!("单号：{}", no),\n    _ => {}\n}\n\n// if let 写法（简洁）\nif let DeliveryStatus::Shipping(no) = status {\n    println!("单号：{}", no);\n}\n```',
            },
            {
              type: 'code',
              title: 'match 处理枚举变体',
              description:
                '用 `match` 处理快递状态，提取变体携带的数据。\n\n注意：`match` 必须覆盖所有变体，否则编译失败。',
              language: 'rust',
              runnable: true,
              code: '#[derive(Debug)]\nenum DeliveryStatus {\n    Pending,\n    Shipping(String),\n    Delivered(String),\n    Cancelled,\n}\n\nfn describe_status(status: DeliveryStatus) {\n    match status {\n        DeliveryStatus::Pending => {\n            println!("📦 您的包裹正在等待发货");\n        }\n        DeliveryStatus::Shipping(tracking_no) => {\n            println!("🚚 正在运输中，快递单号：{}", tracking_no);\n        }\n        DeliveryStatus::Delivered(time) => {\n            println!("✅ 已于 {} 签收", time);\n        }\n        DeliveryStatus::Cancelled => {\n            println!("❌ 订单已取消");\n        }\n    }\n}\n\nfn main() {\n    describe_status(DeliveryStatus::Shipping(String::from("SF9876543210")));\n    describe_status(DeliveryStatus::Delivered(String::from("2024-01-20 16:45")));\n}',
            },
            {
              type: 'code',
              title: 'if let 简洁写法',
              description:
                '当只关心一种变体时，`if let` 比 `match` 更简洁。\n\n两段代码效果相同，选择哪种看场景。',
              language: 'rust',
              runnable: true,
              code: '#[derive(Debug)]\nenum DeliveryStatus {\n    Pending,\n    Shipping(String),\n    Delivered(String),\n    Cancelled,\n}\n\nfn main() {\n    let status = DeliveryStatus::Shipping(String::from("JD1122334455"));\n\n    // 只关心"运输中"这一种情况\n    if let DeliveryStatus::Shipping(no) = status {\n        println!("包裹在路上！快递单号：{}", no);\n    } else {\n        println!("包裹不在运输状态");\n    }\n}',
            },
            {
              type: 'ai-prompt',
              title: '让 AI 帮你练习 match',
              scenario: '你已经会用 match 和 if let 了。让 AI 给你设计一个综合练习。',
              prompt: '用 Rust 实现一个简单的命令处理器。定义枚举 Command，包含：Quit（退出）、Print(String)（打印消息）、Add(i32, i32)（两数相加）、Repeat { message: String, times: u32 }（重复打印）。写一个函数 handle_command(cmd: Command)，用 match 处理每种命令。在 main 中创建不同命令并调用 handle_command 演示。用中文注释说明每种模式匹配的写法。',
              explanation: '四种变体覆盖了枚举的不同携带数据方式（无数据、元组、具名字段），强迫你实践 match 对每种形式的解构。',
            },
            {
              type: 'fill-blank',
              title: '填空：match 表达式',
              description: '填入正确的关键词和符号，完成这个 match 表达式。',
              template: 'fn describe(n: i32) -> &str {\n    ___BLANK___ n {\n        1 => "一",\n        2 => "二",\n        ___BLANK___ => "其他",\n    }\n}\n\nfn main() {\n    println!("{}", describe(3));\n}',
              blanks: ['match', '_'],
              language: 'rust',
              hints: ['用什么关键词做模式匹配？', '匹配"所有其他情况"用什么符号？'],
            },
            {
              type: 'quiz',
              question: '关于 Rust 的 `match`，下面哪条描述是正确的？',
              options: [
                'match 只能用于枚举，不能用于整数',
                'match 不要求处理所有情况，可以只写几个分支',
                'match 是穷尽的，必须覆盖所有可能的情况（或用 _ 兜底）',
                'match 不能提取变体携带的数据',
              ],
              correctIndex: 2,
              explanation:
                '`match` 的穷尽检查是 Rust 的重要安全特性——编译器强制你处理所有情况，避免遗漏某种情况导致的 bug。如果不想逐一列举，可以用 `_` 通配符兜底处理剩余情况。`match` 也可以用于整数、字符串等类型，不只限于枚举。',
            },
          ],
        },

        // --- 6.4b match 进阶 ---
        {
          id: 'match-advanced',
          title: 'match 进阶与 if let',
          cards: [
            {
              type: 'explain',
              title: 'match 守卫条件',
              content:
                '`match` 分支后面可以加 `if` 条件，叫做**守卫（guard）**：\n\n```rust\nlet num = 4;\nmatch num {\n    n if n < 0  => println!("负数：{}", n),\n    n if n == 0 => println!("零"),\n    n if n > 0  => println!("正数：{}", n),\n    _ => unreachable!(),\n}\n```\n\n守卫让你在模式匹配的基础上**再加条件过滤**，比单独的模式更灵活。\n\n注意：加了守卫后，编译器可能无法判断是否穷尽，通常需要 `_` 兜底。',
              analogy:
                '模式匹配像分类垃圾桶（按形状分），守卫条件像再加一道颜色检查——"形状是瓶子 **且** 颜色是绿色"才放这个桶。',
            },
            {
              type: 'explain',
              title: '@ 绑定：匹配的同时捕获值',
              content:
                '有时你想匹配某个范围，**同时**把匹配到的值绑定给变量：\n\n```rust\nlet age = 25;\nmatch age {\n    n @ 0..=17  => println!("未成年，年龄 {}", n),\n    n @ 18..=59 => println!("成年人，年龄 {}", n),\n    n @ 60..    => println!("老年人，年龄 {}", n),\n}\n```\n\n`n @ 0..=17` 的意思是："匹配 0 到 17 的值，并把它绑定给 `n`"。\n\n没有 `@` 的话，你只能写 `0..=17 =>`，但无法在分支内引用那个值。',
            },
            {
              type: 'explain',
              title: 'if let 与 while let 简写',
              content:
                '前面学过 `if let`，这里总结完整用法：\n\n**`if let`**：只关心一种模式时，替代 `match`\n```rust\nlet val: Option<i32> = Some(42);\nif let Some(x) = val {\n    println!("有值：{}", x);\n} else {\n    println!("没有值");\n}\n```\n\n**`while let`**：循环匹配，直到模式不匹配为止\n```rust\nlet mut stack = vec![1, 2, 3];\nwhile let Some(top) = stack.pop() {\n    println!("弹出：{}", top);\n}\n// 输出 3, 2, 1（pop 返回 None 时循环结束）\n```\n\n**何时用 `if let` vs `match`？**\n- 只关心一两种情况 → `if let`\n- 需要处理多种情况 → `match`',
            },
            {
              type: 'code',
              title: 'match 守卫 + if let + while let 综合示例',
              description:
                '三个特性放在一起演示：守卫条件过滤、@ 绑定捕获值、while let 循环弹出栈元素。',
              language: 'rust',
              runnable: true,
              code: 'fn classify_score(score: i32) {\n    match score {\n        s @ 90..=100 => println!("{}分 → 优秀！", s),\n        s @ 60..=89  => println!("{}分 → 及格", s),\n        s if s >= 0  => println!("{}分 → 不及格", s),\n        _            => println!("无效分数"),\n    }\n}\n\nfn main() {\n    // @ 绑定 + 守卫\n    classify_score(95);\n    classify_score(72);\n    classify_score(45);\n\n    // if let：只关心 Some 的情况\n    let config: Option<&str> = Some("dark-mode");\n    if let Some(theme) = config {\n        println!("主题设置：{}", theme);\n    }\n\n    // while let：不断弹出直到 None\n    let mut tasks = vec!["写代码", "看文档", "跑测试"];\n    println!("\\n依次完成任务：");\n    while let Some(task) = tasks.pop() {\n        println!("  ✓ {}", task);\n    }\n    println!("所有任务完成！");\n}',
            },
            {
              type: 'quiz',
              question: '下面哪种场景最适合用 `if let` 而不是 `match`？',
              options: [
                '需要处理枚举的全部 5 个变体',
                '只想在值为 Some(x) 时执行一段逻辑，其他情况什么都不做',
                '需要用 @ 绑定捕获值',
                '需要穷尽检查所有情况',
              ],
              correctIndex: 1,
              explanation:
                '`if let` 最适合"只关心一种模式"的场景。如果你只想处理 `Some(x)`，写 `if let Some(x) = val { ... }` 比写 `match val { Some(x) => ..., None => {} }` 简洁得多。需要处理多种情况或需要穷尽检查时，还是用 `match` 更合适。',
            },
            {
              type: 'ai-prompt',
              title: '让 AI 帮你简化嵌套 match',
              scenario: '你已经学会了 if let 和 while let。让 AI 帮你把冗长的 match 代码变得更简洁。',
              prompt: '帮我把这段嵌套的 match 用 if let 简化：\n\n```rust\nlet config: Option<Option<String>> = Some(Some("dark".to_string()));\nmatch config {\n    Some(inner) => {\n        match inner {\n            Some(theme) => println!("主题：{}", theme),\n            None => println!("主题未设置"),\n        }\n    }\n    None => println!("无配置"),\n}\n```\n\n请用中文解释简化前后的区别，以及什么时候适合用 if let、什么时候还是要用 match。',
              explanation: '嵌套 match 在处理 Option<Option<T>> 等类型时很常见。if let 可以减少嵌套层数，但有时组合使用 and_then 等方法更优雅。',
            },
          ],
        },

        // --- 6.5 Option 类型 ---
        {
          id: 'option-type',
          title: 'Option：安全地表达"可能没有"',
          cards: [
            {
              type: 'explain',
              title: 'Rust 没有 null',
              content:
                '在很多语言里，变量可以是 `null`（空、没有值）。\n\n```java\n// Java\nString name = null;\nname.length();  // 运行时崩溃！NullPointerException\n```\n\n`null` 是一个巨大的历史错误，被它的发明者 Tony Hoare 称为"价值十亿美元的错误"——它导致了无数的程序崩溃和安全漏洞。\n\n**Rust 彻底消灭了 null。**\n\n在 Rust 中，每个值都必须存在。如果一个值"可能没有"，必须用 `Option<T>` 显式表达。',
              analogy:
                '想象一个快递盒子。普通盒子（`null`）可能是空的，你打开之前不知道，一打开发现空的就"崩溃"了。`Option<T>` 就像一个透明盒子，外面就能看见：`Some` 表示里面有东西，`None` 表示是空的。你必须先检查才能拿。',
            },
            {
              type: 'explain',
              title: 'Option<T> = Some(值) | None',
              content:
                '`Option<T>` 是 Rust 标准库里的枚举：\n\n```rust\nenum Option<T> {\n    Some(T),  // 有值，携带类型 T 的数据\n    None,     // 没有值\n}\n```\n\n常见用法：\n\n```rust\nlet some_number: Option<i32> = Some(42);\nlet no_number: Option<i32> = None;\n\n// 用 match 安全地取出值\nmatch some_number {\n    Some(n) => println!("有值：{}", n),\n    None    => println!("没有值"),\n}\n```\n\n`T` 是类型参数，可以是任何类型：`Option<i32>`、`Option<String>`、`Option<User>`……',
            },
            {
              type: 'code',
              title: 'Option 基础用法',
              description:
                '在列表中查找元素——找到了返回 `Some(值)`，找不到返回 `None`。\n\n用 `match` 安全处理两种情况。',
              language: 'rust',
              runnable: true,
              code: 'fn find_first_even(numbers: &[i32]) -> Option<i32> {\n    for &n in numbers {\n        if n % 2 == 0 {\n            return Some(n);  // 找到了，返回 Some\n        }\n    }\n    None  // 没找到，返回 None\n}\n\nfn main() {\n    let nums1 = vec![1, 3, 5, 4, 7];\n    let nums2 = vec![1, 3, 5, 7, 9];\n\n    match find_first_even(&nums1) {\n        Some(n) => println!("找到第一个偶数：{}", n),\n        None    => println!("没有偶数"),\n    }\n\n    match find_first_even(&nums2) {\n        Some(n) => println!("找到第一个偶数：{}", n),\n        None    => println!("没有偶数"),\n    }\n}',
            },
            {
              type: 'code',
              title: 'if let 处理 Option',
              description:
                '只关心"有值"的情况时，`if let Some(x)` 比 `match` 更简洁。\n\n`unwrap_or` 是另一个快捷方式：有值就用，没有就用默认值。',
              language: 'rust',
              runnable: true,
              code: 'fn get_username(id: u32) -> Option<String> {\n    if id == 1 {\n        Some(String::from("小明"))\n    } else {\n        None\n    }\n}\n\nfn main() {\n    // if let 写法：只处理 Some 的情况\n    if let Some(name) = get_username(1) {\n        println!("用户名：{}", name);\n    }\n\n    // unwrap_or：有值就用，没有就用默认值\n    let name = get_username(999).unwrap_or(String::from("访客"));\n    println!("显示名称：{}", name);\n}',
            },
            {
              type: 'ai-prompt',
              title: '让 AI 帮你理解 Option 的应用',
              scenario: '你已经理解了 Option 的概念和基本用法。让 AI 帮你看看真实代码中 Option 的常见模式。',
              prompt: '用 Rust 演示 Option<T> 的常用方法，不只是 match 和 if let，还包括：\n1. unwrap_or(默认值)：有值用有值的，没值用默认\n2. map(|x| ...)：对 Some 里的值做变换，None 保持 None\n3. and_then(|x| ...)：链式处理（类似 flatMap）\n4. is_some() / is_none()：判断是否有值\n每个方法给一个实际的使用例子（比如处理用户名、处理搜索结果），加中文注释解释效果。',
              explanation: 'Option 有很多便捷方法，掌握它们能让代码更简洁。通过具体场景（用户名、搜索结果）学比看文档更有效。',
            },
            {
              type: 'quiz',
              question: '下面代码中，`result` 的值是什么？\n\n```rust\nlet maybe: Option<i32> = Some(10);\nlet result = maybe.unwrap_or(0);\n```',
              options: [
                '0',
                '10',
                'None',
                '程序崩溃',
              ],
              correctIndex: 1,
              explanation:
                '`unwrap_or(默认值)` 的逻辑是：如果是 `Some(x)` 就返回 `x`，如果是 `None` 就返回默认值。这里 `maybe` 是 `Some(10)`，所以 `result` 是 `10`。如果 `maybe` 是 `None`，则 `result` 会是 `0`。',
            },
          ],
        },

        // --- 6.5b Option 方法链 ---
        {
          id: 'option-methods',
          title: 'Option 方法链',
          cards: [
            {
              type: 'explain',
              title: '嵌套 match 太丑了',
              content:
                '每次处理 `Option` 都写 `match` 很繁琐：\n\n```rust\nlet val: Option<String> = Some("42".to_string());\nlet result = match val {\n    Some(s) => match s.parse::<i32>() {\n        Ok(n) => Some(n * 2),\n        Err(_) => None,\n    },\n    None => None,\n};\n```\n\n三层嵌套，只是想"把字符串转成数字再乘以 2"——有没有更优雅的方式？\n\n有！`Option` 提供了一系列**方法链**，让你像流水线一样处理数据。',
            },
            {
              type: 'explain',
              title: 'Option 常用方法速查',
              content:
                '**`map(f)`**：对 `Some` 里的值做变换，`None` 保持不变\n```rust\nSome(5).map(|x| x * 2)  // → Some(10)\nNone::<i32>.map(|x| x * 2)  // → None\n```\n\n**`and_then(f)`**（也叫 flat_map）：函数本身返回 `Option`，避免嵌套 `Some(Some(...))`\n```rust\nSome("42").and_then(|s| s.parse::<i32>().ok())  // → Some(42)\nSome("abc").and_then(|s| s.parse::<i32>().ok()) // → None\n```\n\n**`unwrap_or(默认值)`**：有值就用，没有就用默认值\n```rust\nSome(10).unwrap_or(0)  // → 10\nNone.unwrap_or(0)      // → 0\n```\n\n**`unwrap_or_else(|| 计算默认值)`**：和 `unwrap_or` 类似，但默认值是懒计算的\n```rust\nNone::<String>.unwrap_or_else(|| "默认".to_string())\n```\n\n**`is_some()` / `is_none()`**：判断有没有值，返回 `bool`\n```rust\nSome(1).is_some()  // → true\nNone::<i32>.is_none()  // → true\n```',
            },
            {
              type: 'code',
              title: '方法链实战：字符串转数字再处理',
              description:
                '把嵌套 match 简化为流畅的方法链。\n\n对比两种写法的可读性差异。',
              language: 'rust',
              runnable: true,
              code: 'fn parse_and_double(input: Option<&str>) -> Option<i32> {\n    // 方法链：清晰、一行表达意图\n    input\n        .and_then(|s| s.parse::<i32>().ok())  // 字符串 → 数字（可能失败）\n        .map(|n| n * 2)                         // 数字 × 2\n}\n\nfn main() {\n    println!("{:?}", parse_and_double(Some("21")));   // Some(42)\n    println!("{:?}", parse_and_double(Some("abc")));  // None（解析失败）\n    println!("{:?}", parse_and_double(None));          // None（输入就是空的）\n\n    // unwrap_or 提供默认值\n    let score = parse_and_double(Some("50")).unwrap_or(0);\n    println!("分数：{}", score);  // 100\n\n    let fallback = parse_and_double(None).unwrap_or(0);\n    println!("默认分数：{}", fallback);  // 0\n\n    // is_some / is_none 做判断\n    let result = parse_and_double(Some("10"));\n    if result.is_some() {\n        println!("解析成功！");\n    }\n}',
            },
            {
              type: 'think-first',
              question: '如果一个函数返回 `Option<String>`，你想对里面的字符串转大写，但不想写 match Some/None，你会怎么做？',
              hints: '想想哪个方法能"对 Some 里的值做变换，None 保持不变"',
              reveal: '用 `map`！\n\n```rust\nfn get_name() -> Option<String> {\n    Some("rust".to_string())\n}\n\nlet upper = get_name().map(|s| s.to_uppercase());\n// → Some("RUST")\n```\n\n`map` 的核心思想：**只在有值时做操作，没值时自动跳过**。\n\n这比 `match` 简洁得多：\n```rust\n// 不用写这种冗长的代码了\nmatch get_name() {\n    Some(s) => Some(s.to_uppercase()),\n    None => None,\n}\n```',
            },
            {
              type: 'quiz',
              question: '`Some(5).map(|x| x * 2)` 的返回值是什么？',
              options: [
                '10',
                'Some(10)',
                'None',
                '编译错误',
              ],
              correctIndex: 1,
              explanation:
                '`map` 对 `Some` 里的值应用函数，返回新的 `Some`。所以 `Some(5).map(|x| x * 2)` 返回 `Some(10)`，而不是裸的 `10`。如果要取出裸值，可以用 `.unwrap()` 或 `.unwrap_or(默认值)`。对 `None` 调用 `map` 则直接返回 `None`。',
            },
          ],
        },

        // --- 6.6 闭包 ---
        {
          id: 'closures-intro',
          title: '闭包——匿名的小函数',
          cards: [
            {
              type: 'explain',
              title: '什么是闭包？',
              content:
                '**闭包**是没有名字的函数，写起来比普通函数更简洁。\n\n语法：`|参数| 表达式`\n\n```rust\n// 普通函数\nfn add_one(x: i32) -> i32 { x + 1 }\n\n// 闭包——一行搞定\nlet add_one = |x| x + 1;\n```\n\n闭包可以赋值给变量，也可以直接传给其他函数。',
              analogy:
                '函数是**正式员工**：有名字、签了合同、干活前要先"申报"。闭包是**临时工**：没名字，现场说活、现场干、干完就走。临时工用起来方便，不需要正式的"员工档案"。',
            },
            {
              type: 'code',
              title: '函数 vs 闭包对比',
              description:
                '同样的功能，用普通函数和用闭包分别实现。\n\n注意闭包如何省略类型标注和 `->` 返回类型——编译器能自动推断。',
              language: 'rust',
              runnable: true,
              code: '// 普通函数：必须写类型\nfn add_one_fn(x: i32) -> i32 {\n    x + 1\n}\n\nfn main() {\n    // 闭包：类型可以省略，编译器推断\n    let add_one = |x: i32| x + 1;\n\n    println!("函数结果：{}", add_one_fn(5));\n    println!("闭包结果：{}", add_one(5));\n\n    // 闭包也可以写完整类型（和函数一样）\n    let add_one_typed = |x: i32| -> i32 { x + 1 };\n    println!("带类型的闭包：{}", add_one_typed(5));\n}',
            },
            {
              type: 'explain',
              title: '闭包能"捕获"外部变量',
              content:
                '闭包和普通函数最大的区别：**闭包可以使用它周围环境里的变量**，普通函数不行。\n\n```rust\nlet name = "Rust";\n\n// 闭包：可以"捕获" name\nlet greet = || println!("Hi {}", name);  // ✅\ngreet();  // 输出 Hi Rust\n```\n\n这叫做**捕获（capture）环境**——闭包把外部变量"夹"进来用。',
              analogy:
                '普通函数像隔离的房间——只能用传进来的东西。闭包像你的口袋——周围有什么好用的，顺手揣进去就能用。',
            },
            {
              type: 'code',
              title: '闭包捕获外部变量',
              description:
                '闭包捕获外部变量的实际例子。\n\n注意：`greet` 闭包直接使用了外部的 `greeting` 和 `name`，不需要传参。',
              language: 'rust',
              runnable: true,
              code: 'fn main() {\n    let greeting = String::from("你好");\n    let name = "小明";\n\n    // 闭包捕获了 greeting 和 name\n    let greet = || println!("{}, {}！欢迎来到 Rust 世界！", greeting, name);\n    greet();\n\n    // 闭包也可以捕获数字\n    let base = 100;\n    let add_base = |x: i32| x + base;  // 捕获 base\n    println!("50 + base = {}", add_base(50));\n    println!("200 + base = {}", add_base(200));\n}',
            },
            {
              type: 'explain',
              title: '闭包最常见的用途：作为参数',
              content:
                '闭包最强大的地方是**作为参数传给其他函数**，让函数的行为可以定制。\n\n你在后面章节会大量看到这种写法：\n\n```rust\n// .map(|x| ...)   —— 对每个元素做变换\nlet doubled: Vec<i32> = vec![1, 2, 3].iter().map(|&x| x * 2).collect();\n\n// .filter(|x| ...) —— 筛选满足条件的元素\nlet evens: Vec<_> = vec![1,2,3,4].iter().filter(|&&x| x % 2 == 0).collect();\n\n// .map_err(|e| ...) —— 转换错误类型（第七章错误处理）\nlet n: Result<i32, String> = "42".parse().map_err(|e: std::num::ParseIntError| format!("解析失败: {}", e));\n```\n\n`|x| x * 2`、`|e| format!(...)` 这些都是闭包。认识闭包语法，后面代码就不难看懂了。',
            },
            {
              type: 'ai-prompt',
              title: '让 AI 帮你练习闭包',
              scenario: '你已经理解了闭包的语法和捕获特性。让 AI 帮你在真实场景中练习使用闭包。',
              prompt: '用 Rust 写一段代码演示闭包的用途，要求：\n1. 定义一个函数 apply(f: impl Fn(i32) -> i32, value: i32) -> i32，接受一个闭包参数\n2. 创建三个不同的闭包：翻倍、加10、平方\n3. 用 apply 分别调用它们，打印结果\n4. 演示一个捕获外部变量的闭包：let multiplier = 5; 然后 let times_n = |x| x * multiplier;\n5. 加中文注释解释每个闭包在做什么\n用简单的代码，不要用迭代器方法。',
              explanation: '自己写一个接受闭包参数的函数，是理解闭包为什么有用的最直接方式。这也是理解后续 .map/.filter 的基础。',
            },
            {
              type: 'quiz',
              question: '`let double = |x: i32| x * 2;` 定义的闭包，如何调用它（传入 5，期望得到 10）？',
              options: [
                'double[5]',
                'double(5)',
                'call(double, 5)',
                'double.run(5)',
              ],
              correctIndex: 1,
              explanation:
                '闭包存储在变量 `double` 中，调用方式和函数一样：`double(5)`，用括号传入参数。结果是 `5 * 2 = 10`。`double[5]` 是索引操作，`call(double, 5)` 和 `double.run(5)` 在 Rust 中不存在这种语法。',
            },
          ],
        },
      ],
    },

    // =============================================
    // 第七章：错误处理
    // =============================================
    {
      id: 'ch7-errors',
      title: '第七章：错误处理',
      lessons: [
        // --- 7.1 两种错误 ---
        {
          id: 'two-kinds-of-errors',
          title: '两种错误：panic 与 Result',
          cards: [
            {
              type: 'explain',
              title: '程序会出错——这是正常的',
              content:
                '程序运行时总会遇到各种意外：文件不存在、网络断了、用户输入了非法数据……\n\n处理这些错误的方式，决定了你的程序是否**健壮**（不会悄悄崩溃或给出错误结果）。\n\nRust 把错误分成两类，分别对待：\n\n**1. 不可恢复的错误**：程序遇到了严重的、无法继续执行的情况，用 `panic!` 立即停止。\n\n**2. 可恢复的错误**：程序遇到了预期范围内的问题，可以处理后继续，用 `Result` 表达。',
              analogy:
                '**着火了**：整栋楼着火，你没法继续工作，立刻跑路（`panic!`，程序终止）。\n\n**停电了**：停电了，工作暂时做不了，但你可以点上蜡烛继续（`Result`，处理错误后继续）。',
            },
            {
              type: 'think-first',
              question: '程序运行时可能出错（文件不存在、网络断了、用户输入非法数据……）。\n\n你觉得编程语言应该怎么处理错误？有几种可能的方案？各有什么优缺点？',
              reveal: '常见的三种方案：\n\n1. **忽略错误**（C 语言风格）：函数返回错误码，但调用者可以不检查 → 容易出 bug\n2. **异常机制**（Java/Python）：`try/catch` 抛出异常 → 方便但隐藏了控制流，不知道哪里会抛异常\n3. **Result 类型**（Rust）：函数返回 `Result<成功值, 错误值>`，调用者**必须处理** → 编译器强制你面对错误\n\nRust 选择了方案 3。接下来我们就学这个。',
            },
            {
              type: 'explain',
              title: 'panic!：不可恢复的错误',
              content:
                '`panic!` 会立即终止程序，打印错误信息和调用栈。\n\n**什么时候会 panic：**\n\n- 你主动调用 `panic!("出问题了")`\n- 数组越界：`vec[100]`（数组只有 3 个元素）\n- 整数溢出（debug 模式下）\n- 调用 `.unwrap()` 但值是 `None` 或 `Err`\n\n**适合场景：**\n\n- 违反了编程假设（"永远不应该发生的情况"）\n- 原型开发、示例代码（先跑起来，后面再完善错误处理）\n\n**不适合场景：**\n\n- 用户的非法输入（用户会输错，这是预期的）\n- 文件不存在（正常的外部情况）',
            },
            {
              type: 'code',
              title: 'panic! 示例',
              description:
                '下面代码演示了会触发 panic 的两种情况：主动 panic 和数组越界。\n\n**注意**：越界访问那行会让程序崩溃。这里用注释标出，运行的是主动 panic 版本。',
              language: 'rust',
              runnable: true,
              code: 'fn divide(a: i32, b: i32) -> i32 {\n    if b == 0 {\n        // 除以零是不可恢复的逻辑错误，主动 panic\n        panic!("除数不能为零！a={}", a);\n    }\n    a / b\n}\n\nfn main() {\n    println!("10 / 2 = {}", divide(10, 2));\n\n    // 下面这行会 panic，打印错误信息并终止程序\n    println!("10 / 0 = {}", divide(10, 0));\n\n    // 这行不会执行到\n    println!("这行不会打印");\n}',
            },
            {
              type: 'explain',
              title: 'Result：可恢复的错误',
              content:
                '`Result<T, E>` 是 Rust 标准库的枚举，专门用来表达"操作可能成功也可能失败"：\n\n```rust\nenum Result<T, E> {\n    Ok(T),   // 成功，携带结果值\n    Err(E),  // 失败，携带错误信息\n}\n```\n\n**什么时候用 Result：**\n\n- 读写文件（文件可能不存在）\n- 网络请求（连接可能失败）\n- 解析用户输入（格式可能不对）\n- 任何"预期范围内可能失败"的操作\n\n与 `Option` 类似，`Result` 强迫你在代码里显式处理"失败"的情况，不能假装错误不存在。',
            },
            {
              type: 'ai-prompt',
              title: '让 AI 帮你判断用哪种错误处理',
              scenario: '你已经知道 panic 和 Result 各自的适用场景了。让 AI 帮你练习判断。',
              prompt: '给我 6 个 Rust 编程场景，让我判断应该用 panic! 还是 Result。要求：3 个场景答案是 panic，3 个答案是 Result。场景要具体、贴近实际（比如"读取配置文件"、"检查函数参数"）。每个场景先让我思考，再给出答案和理由。用中文。',
              explanation: '判断题让你主动思考，而不只是看别人的代码。6 道题覆盖两种情况，帮助你建立直觉：什么时候是"不该发生"（panic），什么时候是"预期之内的失败"（Result）。',
            },
            {
              type: 'quiz',
              question: '用户在表单里输入了一个非法的日期格式（比如 "2024-13-45"），程序解析失败。应该怎么处理？',
              options: [
                '调用 panic!，因为用户输了错误数据',
                '返回 Result::Err，这是预期范围内的错误，程序应该告诉用户格式不对',
                '忽略这个错误，用默认日期继续',
                '用 unwrap() 直接取值',
              ],
              correctIndex: 1,
              explanation:
                '用户输入非法数据是**完全预期**的情况——用户总会出错。应该返回 `Result::Err`，让调用方显示友好的错误提示。`panic!` 只用于"不应该发生的情况"（编程逻辑错误），绝对不能因为用户输错而让整个程序崩溃。',
            },
          ],
        },

        // --- 7.2 Result 枚举 ---
        {
          id: 'result-enum',
          title: 'Result：Ok 与 Err',
          cards: [
            {
              type: 'explain',
              title: '返回 Result 的函数',
              content:
                '一个可能失败的函数，返回类型写成 `Result<成功类型, 错误类型>`：\n\n```rust\nfn parse_age(s: &str) -> Result<u32, String> {\n    match s.parse::<u32>() {\n        Ok(age) => Ok(age),\n        Err(_)  => Err(format!("\"{}\" 不是合法的年龄", s)),\n    }\n}\n```\n\n调用这个函数时，你会得到一个 `Result`——你必须处理它，不能直接当成 `u32` 用。\n\n这是 Rust 强迫你"正视错误"的方式。',
            },
            {
              type: 'code',
              title: '用 match 处理 Result',
              description:
                '定义一个解析年龄的函数，返回 `Result`，用 `match` 处理成功和失败两种情况。',
              language: 'rust',
              runnable: true,
              code: 'fn parse_age(s: &str) -> Result<u32, String> {\n    match s.parse::<u32>() {\n        Ok(age) if age <= 150 => Ok(age),\n        Ok(_)   => Err(String::from("年龄不合理（超过150）")),\n        Err(_)  => Err(format!("\"{}\" 不是有效的数字", s)),\n    }\n}\n\nfn main() {\n    let inputs = ["25", "abc", "200", "0"];\n\n    for input in inputs {\n        match parse_age(input) {\n            Ok(age)  => println!("✅ 解析成功：{} 岁", age),\n            Err(msg) => println!("❌ 解析失败：{}", msg),\n        }\n    }\n}',
            },
            {
              type: 'explain',
              title: 'Result 的常用方法',
              content:
                '和 `Option` 类似，`Result` 也有很多便捷方法：\n\n- **`is_ok()` / `is_err()`** — 判断是否成功/失败\n- **`unwrap()`** — 成功时取值，失败时 panic（只在原型开发用）\n- **`unwrap_or(默认值)`** — 失败时用默认值\n- **`unwrap_or_else(|e| ...)`** — 失败时执行闭包\n- **`map(|v| ...)`** — 对 Ok 值做变换\n- **`map_err(|e| ...)`** — 对 Err 值做变换\n\n最常用的是 `match` 和 `?` 运算符（下一课讲）。',
            },
            {
              type: 'code',
              title: 'Result 常用方法示例',
              description:
                '`unwrap_or`、`map`、`is_ok` 等方法的实际用法。',
              language: 'rust',
              runnable: true,
              code: 'fn double_parse(s: &str) -> Result<i32, String> {\n    s.parse::<i32>().map_err(|e| format!("解析失败：{}", e))\n}\n\nfn main() {\n    // unwrap_or：失败时用默认值\n    let n1 = double_parse("42").unwrap_or(0);\n    let n2 = double_parse("abc").unwrap_or(0);\n    println!("n1 = {}, n2 = {}", n1, n2);\n\n    // map：对成功值做变换（失败时保持 Err 不变）\n    let doubled: Result<i32, String> = double_parse("21").map(|n| n * 2);\n    println!("doubled = {:?}", doubled);\n\n    // is_ok / is_err\n    println!("\"42\" 解析成功？{}", double_parse("42").is_ok());\n    println!("\"xyz\" 解析失败？{}", double_parse("xyz").is_err());\n}',
            },
            {
              type: 'ai-prompt',
              title: '让 AI 帮你练习 Result',
              scenario: '你已经会用 match 处理 Result 了。让 AI 带你写一个完整的带错误处理的函数链。',
              prompt: '用 Rust 写一个"读取并计算"的函数链，练习 Result 处理。场景：有一个字符串列表（模拟从文件读取的行），每行是一个数字。写以下函数：\n1. parse_numbers(lines: &[&str]) -> Result<Vec<i32>, String>：将每行解析为 i32，任意一行失败就返回 Err\n2. calculate_average(numbers: &[i32]) -> Result<f64, String>：计算平均值，空列表返回 Err\n3. main 中调用两个函数，用 match 处理 Result，分别测试正常输入和含非法数据的输入\n加中文注释。',
              explanation: '完整的函数链让你体验真实代码中 Result 的传播方式。parse_numbers 的"任意失败则整体失败"是非常常见的模式。',
            },
            {
              type: 'quiz',
              question: '`result.unwrap()` 在什么情况下会 panic？',
              options: [
                '每次调用都会 panic',
                '只有 result 是 Ok 时才会 panic',
                '只有 result 是 Err 时才会 panic',
                '从不 panic，和 match 一样安全',
              ],
              correctIndex: 2,
              explanation:
                '`unwrap()` 的行为：如果是 `Ok(v)` 就返回 `v`；如果是 `Err(e)` 就 panic，打印错误信息然后终止程序。这就是为什么生产代码应该用 `match` 或 `?` 而不是 `unwrap()`——`unwrap()` 会在错误情况下让程序崩溃。',
            },
          ],
        },

        // --- 7.3 ? 运算符 ---
        {
          id: 'question-mark',
          title: '? 运算符：错误传播的简写',
          cards: [
            {
              type: 'explain',
              title: '错误处理代码太啰嗦了？',
              content:
                '每次调用可能失败的函数，都要写 `match`——代码会变得很啰嗦：\n\n```rust\nfn read_and_parse(path: &str) -> Result<i32, String> {\n    let content = match read_file(path) {\n        Ok(c)  => c,\n        Err(e) => return Err(e),\n    };\n    let number = match parse_number(&content) {\n        Ok(n)  => n,\n        Err(e) => return Err(e),\n    };\n    Ok(number * 2)\n}\n```\n\n每个 `match` 都在做同一件事：**成功就继续，失败就把错误往上抛（return Err）**。\n\n这个模式极其常见，Rust 提供了 `?` 运算符来简化它。',
            },
            {
              type: 'explain',
              title: '? 运算符：一个符号替代整个 match',
              content:
                '`?` 放在 `Result` 表达式后面，效果等同于：\n\n```rust\n// 这两段代码完全等价：\n\n// 用 match：\nlet content = match read_file(path) {\n    Ok(c)  => c,\n    Err(e) => return Err(e.into()),\n};\n\n// 用 ?：\nlet content = read_file(path)?;\n```\n\n`?` 的规则：\n- 如果是 `Ok(v)`，把 `v` 赋给变量，继续执行\n- 如果是 `Err(e)`，立即 `return Err(e)`，将错误传播给调用方\n\n**重要**：`?` 只能用在**返回 Result 的函数**里。',
            },
            {
              type: 'code',
              title: 'match 版本 vs ? 版本对比',
              description:
                '同样的逻辑，用 `match` 写和用 `?` 写的代码量对比。\n\n两段代码功能完全相同，选哪种看你的喜好（生产代码普遍用 `?`）。',
              language: 'rust',
              runnable: true,
              code: '// 模拟可能失败的操作\nfn parse_num(s: &str) -> Result<i32, String> {\n    s.parse::<i32>().map_err(|_| format!("无法解析 \'{}\' 为数字", s))\n}\n\nfn double_num(s: &str) -> Result<i32, String> {\n    s.parse::<i32>().map_err(|_| format!("无法解析 \'{}\' 为数字", s))\n}\n\n// 用 match 写（啰嗦）\nfn add_match(a: &str, b: &str) -> Result<i32, String> {\n    let x = match parse_num(a) {\n        Ok(n)  => n,\n        Err(e) => return Err(e),\n    };\n    let y = match double_num(b) {\n        Ok(n)  => n,\n        Err(e) => return Err(e),\n    };\n    Ok(x + y)\n}\n\n// 用 ? 写（简洁）\nfn add_question(a: &str, b: &str) -> Result<i32, String> {\n    let x = parse_num(a)?;\n    let y = double_num(b)?;\n    Ok(x + y)\n}\n\nfn main() {\n    println!("{:?}", add_question("10", "20"));\n    println!("{:?}", add_question("10", "abc"));\n}',
            },
            {
              type: 'code',
              title: '链式 ? 运算符',
              description:
                '`?` 可以链式使用，每一步失败都会立即返回错误。\n\n这是 Rust 生产代码中最常见的错误处理风格。',
              language: 'rust',
              runnable: true,
              code: 'use std::num::ParseIntError;\n\nfn parse_and_double(s: &str) -> Result<i32, ParseIntError> {\n    // 链式 ?：解析 → 乘以2，任意一步失败就返回错误\n    let n: i32 = s.trim().parse()?;\n    Ok(n * 2)\n}\n\nfn sum_strings(parts: &[&str]) -> Result<i32, ParseIntError> {\n    let mut total = 0;\n    for part in parts {\n        total += parse_and_double(part)?;  // 任意一个失败就整体返回 Err\n    }\n    Ok(total)\n}\n\nfn main() {\n    match sum_strings(&["1", "2", "3"]) {\n        Ok(sum) => println!("总和的两倍：{}", sum),\n        Err(e)  => println!("计算失败：{}", e),\n    }\n\n    match sum_strings(&["1", "abc", "3"]) {\n        Ok(sum) => println!("总和的两倍：{}", sum),\n        Err(e)  => println!("计算失败：{}", e),\n    }\n}',
            },
            {
              type: 'ai-prompt',
              title: '让 AI 帮你改写错误处理代码',
              scenario: '你已经掌握了 ? 运算符。让 AI 帮你把冗长的 match 写法改写成简洁的 ? 写法，加深理解。',
              prompt: '下面是一段用 match 写错误处理的 Rust 代码，请把它改写成用 ? 运算符的简洁版本，并解释每处改动：\n\n```rust\nfn process(input: &str) -> Result<String, String> {\n    let n = match input.trim().parse::<i32>() {\n        Ok(v) => v,\n        Err(e) => return Err(e.to_string()),\n    };\n    let doubled = match double_if_positive(n) {\n        Ok(v) => v,\n        Err(e) => return Err(e),\n    };\n    let result = match format_result(doubled) {\n        Ok(v) => v,\n        Err(e) => return Err(e),\n    };\n    Ok(result)\n}\n```\n\n改写后，对比两个版本的代码行数和可读性。用中文解释。',
              explanation: '看到"改写前后对比"能让你直观感受 ? 带来的代码量减少。自己理解了 ? 的等价关系，下次用起来就不会感到神秘。',
            },
            {
              type: 'fill-blank',
              title: '填空：? 运算符',
              description: '填入正确的类型名和符号，完成这个使用 ? 运算符的函数。',
              template: 'use std::num::ParseIntError;\n\nfn parse_age(s: &str) -> ___BLANK___<u32, ParseIntError> {\n    let age = s.parse::<u32>()___BLANK___;\n    Ok(age)\n}',
              blanks: ['Result', '?'],
              language: 'rust',
              hints: ['函数返回什么类型表示"可能出错"？', '用什么符号自动传播错误？'],
            },
            {
              type: 'quiz',
              question: '`let n = some_function()?;` 这行代码，如果 `some_function()` 返回 `Err(e)`，会发生什么？',
              options: [
                'n 被赋值为 None',
                '程序 panic，立即崩溃',
                '当前函数立即 return Err(e)，将错误传播给调用方',
                '错误被忽略，n 被赋值为默认值',
              ],
              correctIndex: 2,
              explanation:
                '`?` 运算符在遇到 `Err` 时，会让**当前函数**立即执行 `return Err(e)`，把错误传播给调用方，而不是 panic 也不是忽略错误。这就是"错误传播"——让调用链上的每一层都能决定如何处理这个错误。这也是为什么 `?` 只能用在返回 `Result` 的函数里。',
            },
          ],
        },

        // --- 7.4 何时 panic 何时 Result ---
        {
          id: 'when-to-panic',
          title: '何时用 panic，何时用 Result',
          cards: [
            {
              type: 'explain',
              title: '两种场景，两种选择',
              content:
                '学了 `panic!` 和 `Result`，什么时候用哪个？\n\n**用 `panic!` 的场景：**\n\n- **违反前提条件**：函数收到了"永远不应该发生"的输入（比如 `sqrt(-1)`，负数开方是你代码的 bug，不是用户的错）\n- **原型/示例代码**：快速开发时用 `unwrap()` 和 `expect()` 先跑起来，后面再完善\n- **测试代码**：断言失败时直接 panic 很合适\n\n**用 `Result` 的场景：**\n\n- **外部数据**：文件、网络、用户输入——这些失败是预期的\n- **可以恢复**：调用方能做出有意义的处理（重试、提示用户、用默认值）\n- **生产代码**：任何会影响用户的错误都应该用 Result 优雅处理',
            },
            {
              type: 'explain',
              title: 'unwrap() 的使用规范',
              content:
                '`unwrap()` 是一个方便但危险的方法——它在 `Err` 或 `None` 时直接 panic。\n\n**可以用 unwrap() 的地方：**\n\n```rust\n// 1. 你确定不可能是 None/Err 的地方\nlet re = Regex::new(r"^\\d+$").unwrap(); // 正则表达式是写死的，不会出错\n\n// 2. 示例和原型代码（但要加注释说明）\nlet n: i32 = input.parse().unwrap(); // TODO: 上线前改成 ? 处理\n\n// 3. 测试代码\nassert_eq!(result.unwrap(), 42);\n```\n\n**不应该用 unwrap() 的地方：**\n\n```rust\n// ❌ 生产代码中处理用户输入\nlet age: u32 = user_input.parse().unwrap(); // 用户可能输入 "abc"！\n\n// ✅ 应该这样\nlet age: u32 = user_input.parse().map_err(|_| "请输入有效的年龄")?;\n```',
            },
            {
              type: 'code',
              title: '原型代码 vs 生产代码对比',
              description:
                '同样的功能，原型开发时的写法（快速但不安全）和生产代码的写法（稳健）对比。\n\n**运行的是生产代码版本。**',
              language: 'rust',
              runnable: true,
              code: '// === 原型代码（快速开发，unwrap 到处用）===\n// fn read_config_proto(path: &str) -> String {\n//     std::fs::read_to_string(path).unwrap()  // 文件不存在直接 panic\n// }\n\n// === 生产代码（Result + ? 优雅处理）===\nfn read_config(path: &str) -> Result<String, String> {\n    std::fs::read_to_string(path)\n        .map_err(|e| format!("读取配置文件 {} 失败：{}", path, e))\n}\n\nfn get_port(config: &str) -> Result<u16, String> {\n    config\n        .lines()\n        .find(|line| line.starts_with("port="))\n        .ok_or_else(|| String::from("配置文件中找不到 port 字段"))?  \n        .trim_start_matches("port=")\n        .parse::<u16>()\n        .map_err(|_| String::from("port 不是有效的端口号"))\n}\n\nfn main() {\n    match read_config("config.toml") {\n        Ok(content) => {\n            match get_port(&content) {\n                Ok(port) => println!("服务器端口：{}", port),\n                Err(e)   => println!("配置错误：{}", e),\n            }\n        }\n        Err(e) => println!("启动失败：{}", e),\n    }\n}',
            },
            {
              type: 'explain',
              title: 'expect()：比 unwrap 更好的 panic',
              content:
                '如果你必须用 `unwrap()`，更好的选择是 `expect("说明")`：\n\n```rust\n// unwrap()：panic 时只显示 "called unwrap() on an Err value"\nlet n = input.parse::<i32>().unwrap();\n\n// expect()：panic 时显示你写的说明，方便调试\nlet n = input.parse::<i32>().expect("输入应该是一个整数");\n```\n\n`expect()` 让 panic 信息更有意义，帮助你快速定位问题。\n\n**最佳实践**：\n\n- 原型代码：用 `unwrap()` 快速开发\n- 明确"不可能失败"的地方：用 `expect("理由")` 说明为什么确定不会失败\n- 生产代码的错误路径：用 `Result` + `?`',
            },
            {
              type: 'ai-prompt',
              title: '让 AI 审查你的错误处理代码',
              scenario: '你已经掌握了 Rust 错误处理的全貌：panic、Result、? 运算符。让 AI 扮演代码审查者，帮你发现潜在问题。',
              prompt: '请扮演一个严格的 Rust 代码审查者，审查下面的代码，指出所有不恰当的错误处理方式，并给出改进建议：\n\n```rust\nfn process_user_data(input: &str) -> i32 {\n    let age: u32 = input.parse().unwrap();\n    let doubled = age * 2;\n    doubled as i32\n}\n\nfn load_data(filename: &str) -> String {\n    std::fs::read_to_string(filename).unwrap()\n}\n\nfn main() {\n    let data = load_data("users.txt");\n    let result = process_user_data(&data);\n    println!("结果：{}", result);\n}\n```\n\n对每个问题：说明问题在哪、为什么有问题、给出改进后的代码。用中文。',
              explanation: '代码审查视角让你从"写代码"转换到"评价代码"，这是更高层次的理解。让 AI 扮演审查者，你会看到专业 Rust 开发者如何思考错误处理。',
            },
            {
              type: 'quiz',
              question: '下列哪种情况最适合使用 `Result` 而不是 `panic!`？',
              options: [
                '你的函数收到了一个不可能为 None 的参数，但防御性地检查了一下',
                '读取用户上传的文件时，文件可能不存在或格式错误',
                '数组下标越界，程序逻辑出现了严重 bug',
                '编写单元测试，断言某个计算结果正确',
              ],
              correctIndex: 1,
              explanation:
                '读取用户上传的文件是典型的"预期范围内的失败"——文件不存在、格式错误都是正常情况，程序应该优雅地告知用户。其他三个选项（防御性检查 None、数组越界 bug、测试断言）更适合 panic 或 assert!。',
            },
          ],
        },
      ],
    },

    // =============================================
    // 第八章：集合与字符串
    // =============================================
    {
      id: 'ch8-collections',
      title: '第八章：集合与字符串',
      lessons: [
        // --- 8.1 Vec 动态数组 ---
        {
          id: 'vec',
          title: 'Vec 动态数组',
          cards: [
            {
              type: 'explain',
              title: 'Vec 是什么？',
              content:
                '数组（`[i32; 5]`）的大小在编译时就固定了，无法增减元素。\n\n现实中我们常常不知道要存多少个元素——比如用户输入的购物清单，可能有 3 件，也可能有 30 件。\n\n**`Vec<T>`**（向量/动态数组）就是为此而生的：它的长度可以在运行时动态增减。',
              analogy:
                '把 Vec 想象成一个**可伸缩的抽屉柜**：需要存东西时可以加抽屉，不需要时可以拆掉，随时告诉你现在有多少个抽屉。',
            },
            {
              type: 'think-first',
              question: '到目前为止，我们用数组 `[1, 2, 3]` 存储多个同类型的值。但数组有一个大限制。\n\n你觉得是什么限制？如果要存一个"不知道有多少个元素"的列表，该怎么办？',
              reveal: '数组的限制：**长度在编译时就固定了**。`[i32; 5]` 就是 5 个元素，不能变。\n\n但很多场景你不知道有多少数据（用户输入、文件内容、网络请求结果……）。\n\n**Vec<T>（动态数组）** 解决了这个问题——它可以在运行时增长和缩小。这就是我们接下来要学的。',
            },
            {
              type: 'explain',
              title: '创建 Vec 的两种方式',
              content:
                '**方式一：`Vec::new()` + `push`**\n```rust\nlet mut v: Vec<i32> = Vec::new();\nv.push(1);\nv.push(2);\n```\n\n**方式二：`vec![]` 宏（最常用）**\n```rust\nlet v = vec![1, 2, 3];\n```\n\n`vec![]` 宏会自动推断类型，写起来更简洁。\n\n注意：如果要 `push` 新元素，`Vec` 必须声明为 `mut`（可变）。',
            },
            {
              type: 'code',
              title: '创建和添加元素',
              description:
                '两种创建方式的对比，以及用 `push` 添加元素。\n\n注意 `mut` 关键字——Vec 本身也需要可变才能添加元素。',
              language: 'rust',
              runnable: true,
              code: 'fn main() {\n    // 方式一：Vec::new() + push\n    let mut fruits: Vec<String> = Vec::new();\n    fruits.push(String::from("苹果"));\n    fruits.push(String::from("香蕉"));\n    fruits.push(String::from("橙子"));\n    println!("水果数量: {}", fruits.len());\n\n    // 方式二：vec! 宏（最常用）\n    let numbers = vec![10, 20, 30, 40, 50];\n    println!("数字: {:?}", numbers);\n    println!("第一个: {}", numbers[0]);\n    println!("最后一个: {}", numbers[numbers.len() - 1]);\n}',
            },
            {
              type: 'explain',
              title: '访问元素：索引 vs get()',
              content:
                '**方式一：索引**（`v[i]`）\n- 如果下标越界，程序会 panic（崩溃）\n- 适合确定下标合法时使用\n\n**方式二：`get(i)`**\n- 返回 `Option<&T>`：`Some(&value)` 或 `None`\n- 安全，越界时返回 `None` 而不会崩溃\n- 适合不确定下标是否合法时使用\n\n一般推荐在遍历时用 `for`，随机访问时优先考虑 `get`。',
            },
            {
              type: 'code',
              title: '安全访问元素',
              description:
                '对比索引访问和 `get()` 的区别。\n\n`get()` 返回 `Option`，配合 `if let` 可以安全地处理"越界"情况。',
              language: 'rust',
              runnable: true,
              code: 'fn main() {\n    let v = vec![10, 20, 30];\n\n    // 索引访问（确定合法时使用）\n    println!("v[1] = {}", v[1]);\n\n    // get() 安全访问\n    if let Some(val) = v.get(2) {\n        println!("get(2) = {}", val);\n    }\n\n    // 越界时 get() 返回 None，不会崩溃\n    if v.get(10).is_none() {\n        println!("下标 10 不存在，但程序继续运行！");\n    }\n}',
            },
            {
              type: 'code',
              title: '遍历 Vec',
              description:
                '用 `for` 循环遍历 Vec，这是最常见的使用方式。\n\n注意 `&v` 和 `&mut v` 的区别：前者只读，后者可以修改元素。',
              language: 'rust',
              runnable: true,
              code: 'fn main() {\n    let scores = vec![85, 92, 78, 96, 88];\n\n    // 只读遍历\n    print!("成绩: ");\n    for score in &scores {\n        print!("{} ", score);\n    }\n    println!();\n\n    // 计算总分和平均分\n    let total: i32 = scores.iter().sum();\n    let avg = total / scores.len() as i32;\n    println!("总分: {}, 平均分: {}", total, avg);\n\n    // 可变遍历：给每个成绩加 5 分\n    let mut scores2 = vec![85, 92, 78];\n    for score in &mut scores2 {\n        *score += 5;\n    }\n    println!("加分后: {:?}", scores2);\n}',
            },
            {
              type: 'fill-blank',
              title: '填空：Vec 操作',
              description: '填入正确的宏名和方法名，完成这段 Vec 操作代码。',
              template: 'fn main() {\n    let mut v = ___BLANK___![1, 2, 3];\n    v.___BLANK___(4);\n    println!("长度: {}", v.___BLANK___());\n}',
              blanks: ['vec', 'push', 'len'],
              language: 'rust',
              hints: ['创建 Vec 的宏叫什么？', '往末尾添加元素的方法？', '获取长度的方法？'],
            },
            {
              type: 'quiz',
              question: '以下哪种方式创建 Vec 最简洁？',
              options: [
                '`let v = Vec::new(); v.push(1); v.push(2);`',
                '`let v = vec![1, 2];`',
                '`let v: Vec<i32> = [1, 2].to_vec();`',
                '`let v = Vec::from([1, 2]);`',
              ],
              correctIndex: 1,
              explanation:
                '`vec![]` 宏是创建有初始值 Vec 的最简洁方式，Rust 代码中最常见。其他方式也能用，但写起来更繁琐。',
            },
            {
              type: 'ai-prompt',
              title: '让 AI 帮你练习 Vec',
              scenario: '你学会了 Vec 的创建、push、索引访问、get()、for 遍历。让 AI 给你一个实战练习。',
              prompt: '用 Rust 写一个学生成绩管理小程序，要求：\n1. 用 Vec<i32> 存储 5 个学生的成绩（直接用 vec! 初始化）\n2. 打印所有成绩\n3. 找出最高分和最低分\n4. 计算平均分（用 iter().sum() 求和）\n5. 统计及格人数（>=60 分）\n要求加中文注释，代码要能编译运行，只用 fn main() 不需要其他函数。',
              explanation: '成绩管理是 Vec 的典型场景。通过实现这些功能，你会自然地用到 Vec 的遍历、索引、条件判断等核心操作。',
            },
          ],
        },

        // --- 8.2 String 深入 ---
        {
          id: 'string-deep',
          title: 'String vs &str 深入',
          cards: [
            {
              type: 'explain',
              title: '回顾：String 和 &str 的本质',
              content:
                '你在第二章已经遇到过 `&str`，在所有权章节遇到过 `String`。\n\n让我们彻底搞清楚它们：\n\n- **`&str`（字符串切片）**：对某段 UTF-8 字节序列的引用，大小固定，不可增长。字符串字面量 `"hello"` 的类型就是 `&str`。\n\n- **`String`**：有所有权的、可增长的字符串，数据存在堆上。\n\n**核心规律**：函数参数优先用 `&str`（更通用），需要拥有和修改字符串时用 `String`。',
              analogy:
                '`String` 是你**买下的**一块白板，可以随时写写擦擦。`&str` 是你**借来看看**的白板——你只能读，不能改，也不拥有它。',
            },
            {
              type: 'explain',
              title: '字符串拼接：三种方式',
              content:
                '**方式一：`+` 运算符**（会移动左边的 String）\n```rust\nlet s1 = String::from("hello");\nlet s2 = String::from(", world");\nlet s3 = s1 + &s2;  // s1 被移动，之后不能用\n```\n\n**方式二：`push_str` / `push`**（原地追加）\n```rust\nlet mut s = String::from("hello");\ns.push_str(", world");  // 追加字符串\ns.push(\'!\');            // 追加单个字符\n```\n\n**方式三：`format!` 宏**（最灵活，不移动任何变量）\n```rust\nlet s = format!("{} {}", s1, s2);\n```\n\n**推荐**：多个字符串拼接用 `format!`，简单追加用 `push_str`。',
            },
            {
              type: 'code',
              title: '字符串拼接实战',
              description:
                '对比三种拼接方式，体会它们各自的适用场景。\n\n`format!` 最灵活且不转移所有权，是多值拼接的首选。',
              language: 'rust',
              runnable: true,
              code: 'fn main() {\n    // push_str：原地追加\n    let mut greeting = String::from("你好");\n    greeting.push_str("，世界");\n    greeting.push(\'!\');\n    println!("{}", greeting);\n\n    // format!：灵活拼接，不移动变量\n    let name = String::from("Alice");\n    let score = 95;\n    let lang = "Rust";\n    let msg = format!("{}在学{}，成绩是{}分", name, lang, score);\n    println!("{}", msg);\n    // name 没有被移动，还可以继续使用\n    println!("name 还在: {}", name);\n}',
            },
            {
              type: 'explain',
              title: '为什么 Rust 字符串"复杂"？',
              content:
                '你可能注意到，Rust 不支持 `s[0]` 直接按下标访问字符串字符。\n\n原因：**Rust 的字符串是 UTF-8 编码的**。\n\nUTF-8 中，不同字符占用的字节数不同：\n- 英文字母：1 个字节\n- 中文汉字：3 个字节\n- 某些 emoji：4 个字节\n\n如果允许 `s[0]`，拿到的可能是一个汉字的"残缺一半"，毫无意义甚至危险。\n\nRust 拒绝这种操作，逼着你正确处理 Unicode，避免了很多其他语言常见的字符串 bug。\n\n**正确的遍历方式**：\n- `s.chars()`：按字符（char）遍历\n- `s.bytes()`：按字节遍历',
            },
            {
              type: 'code',
              title: 'UTF-8 字符串遍历',
              description:
                '用 `chars()` 按字符遍历，用 `bytes()` 按字节遍历，体会 UTF-8 的本质。\n\n中文字符每个占 3 个字节，这就是为什么字节数和字符数不一样。',
              language: 'rust',
              runnable: true,
              code: 'fn main() {\n    let s = String::from("Hi你好");\n\n    println!("字节数: {}", s.len());        // 字节数（英文1字节，汉字3字节）\n    println!("字符数: {}", s.chars().count());  // 实际字符个数\n\n    // 按字符遍历（推荐）\n    print!("字符: ");\n    for c in s.chars() {\n        print!("[{}] ", c);\n    }\n    println!();\n\n    // 字符串切片（只对 ASCII 安全，UTF-8 要小心）\n    let hello = &s[..2];  // 切前2个字节（刚好是 "Hi"）\n    println!("前两个字节: {}", hello);\n}',
            },
            {
              type: 'quiz',
              question: '下面哪种方式拼接字符串最不容易出错（不会转移所有权）？',
              options: [
                '`s1 + &s2`（+ 运算符）',
                '`s1.push_str(&s2)`',
                '`format!("{}{}", s1, s2)`',
                '`s1.extend(s2.chars())`',
              ],
              correctIndex: 2,
              explanation:
                '`format!` 宏不会移动任何变量的所有权，拼接后 `s1` 和 `s2` 都还可以使用。`+` 运算符会移动左边的 `String`（`s1` 就失效了）。多值拼接时 `format!` 是最推荐的方式。',
            },
            {
              type: 'ai-prompt',
              title: '让 AI 帮你练习字符串操作',
              scenario: '你学会了 String 和 &str 的区别、拼接方式、UTF-8 遍历。让 AI 给你出一道综合题。',
              prompt: '用 Rust 写一个字符串处理函数，接收一个 &str 参数（一句话），实现：\n1. 统计字符总数（用 .chars().count()）\n2. 统计中文字符数（char > \'\\u{4e00}\' 且 < \'\\u{9fff}\'）\n3. 将每个词首字母大写（假设以空格分隔，只处理 ASCII 词）\n4. 用 format! 返回一个汇总字符串\n要求：函数签名用 fn process(s: &str) -> String，加上中文注释，在 main 中调用并打印结果。',
              explanation: '这道题综合了 &str 参数、chars() 遍历、Unicode 判断、format! 拼接，是字符串章节的完整检验。',
            },
          ],
        },

        // --- 8.3 HashMap ---
        {
          id: 'hashmap',
          title: 'HashMap 键值对',
          cards: [
            {
              type: 'explain',
              title: 'HashMap 是什么？',
              content:
                '`Vec` 用数字下标（0、1、2…）访问元素。\n\n但有时候你想用**名字**来查找数据——比如查一个同学的分数、查一个单词的翻译。\n\n**`HashMap<K, V>`** 就是键值对存储：每个**键（Key）**对应一个**值（Value）**，可以用键直接查到值。\n\n使用前需要引入：`use std::collections::HashMap;`',
              analogy:
                '`HashMap` 就像一本**电话本**：你用名字（键）查到电话号码（值）。找 "Alice" → 得到 "138xxxx"。查找速度极快，和电话本条目多少关系不大。',
            },
            {
              type: 'code',
              title: '创建和插入数据',
              description:
                '用 `HashMap::new()` 创建，用 `insert(key, value)` 添加键值对。\n\n注意 `use std::collections::HashMap` 需要在顶部引入。',
              language: 'rust',
              runnable: true,
              code: 'use std::collections::HashMap;\n\nfn main() {\n    let mut scores: HashMap<String, i32> = HashMap::new();\n\n    scores.insert(String::from("Alice"), 95);\n    scores.insert(String::from("Bob"), 82);\n    scores.insert(String::from("Carol"), 91);\n\n    println!("scores: {:?}", scores);\n    println!("条目数: {}", scores.len());\n}',
            },
            {
              type: 'explain',
              title: '查询：get() 和索引',
              content:
                '**`get(key)`**：返回 `Option<&V>`，安全，键不存在时返回 `None`。\n\n```rust\nif let Some(score) = scores.get("Alice") {\n    println!("Alice 的分数: {}", score);\n}\n```\n\n**`contains_key(key)`**：检查键是否存在，返回 `bool`。\n\n**注意**：`get()` 的参数可以用 `&str`（即使键类型是 `String`），Rust 会自动处理。',
            },
            {
              type: 'code',
              title: '查询和遍历',
              description:
                '用 `get()` 安全查询，用 `for (key, value)` 遍历所有键值对。\n\n注意 HashMap 不保证顺序——每次运行遍历顺序可能不同。',
              language: 'rust',
              runnable: true,
              code: 'use std::collections::HashMap;\n\nfn main() {\n    let mut scores = HashMap::new();\n    scores.insert("Alice", 95);\n    scores.insert("Bob", 82);\n    scores.insert("Carol", 91);\n\n    // get() 安全查询\n    if let Some(&score) = scores.get("Alice") {\n        println!("Alice: {}分", score);\n    }\n\n    // 键不存在时\n    if scores.get("Dave").is_none() {\n        println!("Dave 不在名单中");\n    }\n\n    // 遍历所有键值对\n    println!("\\n所有成绩:");\n    for (name, score) in &scores {\n        println!("  {} -> {}分", name, score);\n    }\n}',
            },
            {
              type: 'explain',
              title: 'entry API：智能插入',
              content:
                '一个常见需求："如果键不存在，插入默认值；如果存在，修改它"。\n\n**`entry(key).or_insert(default)`** 完美解决这个问题：\n\n```rust\n// 如果键不存在就插入 0，然后返回可变引用\nlet count = word_count.entry(word).or_insert(0);\n*count += 1;  // 修改值\n```\n\n`entry()` 返回一个 `Entry` 枚举，`or_insert()` 在键缺失时插入默认值，并返回值的可变引用（`&mut V`）。\n\n这是统计词频、累加计数等场景的标准写法。',
            },
            {
              type: 'code',
              title: 'entry API 实战：词频统计',
              description:
                '用 `entry().or_insert()` 统计每个单词出现的次数。\n\n这是 HashMap 最经典的应用场景之一。',
              language: 'rust',
              runnable: true,
              code: 'use std::collections::HashMap;\n\nfn main() {\n    let text = "apple banana apple cherry banana apple";\n    let mut word_count: HashMap<&str, i32> = HashMap::new();\n\n    for word in text.split_whitespace() {\n        // 键不存在时插入 0，然后 +1\n        let count = word_count.entry(word).or_insert(0);\n        *count += 1;\n    }\n\n    println!("词频统计:");\n    for (word, count) in &word_count {\n        println!("  {}: {}次", word, count);\n    }\n\n    // 找出出现最多的词\n    if let Some((word, count)) = word_count.iter().max_by_key(|&(_, c)| c) {\n        println!("\\n最多: \"{}\" 出现 {} 次", word, count);\n    }\n}',
            },
            {
              type: 'quiz',
              question: '`word_count.entry("hello").or_insert(0)` 的作用是？',
              options: [
                '查询 "hello" 的值，不存在时返回 0',
                '如果 "hello" 不存在则插入 0，并返回该值的可变引用',
                '将 "hello" 对应的值设置为 0',
                '删除 "hello" 这个键',
              ],
              correctIndex: 1,
              explanation:
                '`entry().or_insert(0)` 做两件事：如果键不存在，先插入默认值 0；然后返回该值的可变引用（`&mut i32`）。拿到引用后可以通过 `*count += 1` 修改值。这是 HashMap 计数的标准模式。',
            },
            {
              type: 'ai-prompt',
              title: '让 AI 帮你练习 HashMap',
              scenario: '你学会了 HashMap 的创建、insert、get、遍历和 entry API。让 AI 帮你写一个综合练习。',
              prompt: '用 Rust 写一个简单的"学生成绩册"程序，要求：\n1. 用 HashMap<String, Vec<i32>> 存储每个学生的多次成绩（每人 3 次）\n2. 插入至少 3 个学生的数据\n3. 遍历打印每个学生的所有成绩和平均分\n4. 找出平均分最高的学生\n5. 用 entry().or_insert_with(Vec::new) 演示如何安全地向 HashMap 中的 Vec 追加成绩\n要求：加中文注释，代码能编译运行。',
              explanation: '`HashMap<String, Vec<i32>>` 是非常常见的数据结构组合。这道题把 Vec 和 HashMap 都用上了，是集合章节的综合练习。',
            },
          ],
        },

        // --- 8.4 迭代器 ---
        {
          id: 'iterators',
          title: '迭代器——优雅地处理数据',
          cards: [
            {
              type: 'explain',
              title: '什么是迭代器？',
              content:
                '**迭代器**是一个会逐个"吐出"元素的工具。\n\n`.iter()` 把数组或 Vec 变成迭代器：\n\n```rust\nlet v = vec![1, 2, 3];\nlet iter = v.iter();  // 变成迭代器\n```\n\n迭代器是**"懒"的（lazy）**——你不用它，它就不动。只有在你真正需要结果时（比如 `.collect()` 或 `.sum()`），它才开始计算。\n\n这让链式操作非常高效：中间步骤不会产生临时集合。',
              analogy:
                '迭代器像**传送带**：传送带上摆好了货物，但不会自己动。你按下"启动"（调用消费方法），传送带才开始一件件送出货物。中间的处理工序（map/filter）都是在传送带上加工，不需要另外堆一堆临时货物。',
            },
            {
              type: 'code',
              title: '迭代器 vs 手动 for 循环',
              description:
                '同样的功能：把每个数乘以 2，收集成新的 Vec。\n\n对比手动 for 循环和用迭代器的写法。',
              language: 'rust',
              runnable: true,
              code: 'fn main() {\n    let numbers = vec![1, 2, 3, 4, 5];\n\n    // 方式一：手动 for 循环\n    let mut doubled_manual = Vec::new();\n    for &n in &numbers {\n        doubled_manual.push(n * 2);\n    }\n    println!("手动循环：{:?}", doubled_manual);\n\n    // 方式二：迭代器链式调用\n    let doubled_iter: Vec<i32> = numbers.iter().map(|&x| x * 2).collect();\n    println!("迭代器：{:?}", doubled_iter);\n\n    // 两种结果完全一样，迭代器写法更简洁\n}',
            },
            {
              type: 'explain',
              title: '常用迭代器方法速查',
              content:
                '**变换类：**\n- `.map(fn)` — 变换每个元素，如 `iter.map(` `\u007cx\u007c` `x * 2)`\n- `.filter(fn)` — 筛选满足条件的元素\n- `.collect::<Vec<_>>()` — 收集成集合\n\n**聚合类：**\n- `.sum::<i32>()` — 求所有元素之和\n- `.count()` — 计算元素数量\n- `.max()` / `.min()` — 最大值 / 最小值\n\n**查找类：**\n- `.find(fn)` — 查找第一个满足条件的元素\n- `.any(fn)` — 是否存在满足条件的元素\n- `.all(fn)` — 是否所有元素都满足条件\n\n这些方法都接受**闭包**作为参数——这就是为什么要先学闭包！',
            },
            {
              type: 'code',
              title: '链式迭代器：统计及格人数',
              description:
                '链式调用多个迭代器方法。`.filter()` 筛选及格成绩（>= 60），`.count()` 统计数量。',
              language: 'rust',
              runnable: true,
              code: 'fn main() {\n    let scores = vec![85, 42, 91, 58, 76, 33, 67, 88];\n\n    // 统计及格人数（>= 60 分）\n    let pass_count = scores.iter().filter(|&&x| x >= 60).count();\n    println!("及格人数：{}", pass_count);\n\n    // 所有及格成绩的列表\n    let pass_scores: Vec<i32> = scores.iter().filter(|&&x| x >= 60).copied().collect();\n    println!("及格成绩：{:?}", pass_scores);\n\n    // 及格成绩的平均分\n    let pass_sum: i32 = scores.iter().filter(|&&x| x >= 60).sum();\n    let avg = pass_sum / pass_count as i32;\n    println!("及格平均分：{}", avg);\n\n    // 最高分\n    let max_score = scores.iter().max().unwrap();\n    println!("最高分：{}", max_score);\n}',
            },
            {
              type: 'explain',
              title: 'collect() 与 turbofish 语法',
              content:
                '`.collect()` 把迭代器收集成一个集合，但它需要知道收集成**什么类型**。\n\n有两种方式告诉编译器类型：\n\n**方式一：类型标注（推荐）**\n```rust\nlet v: Vec<i32> = iter.collect();\n```\n\n**方式二：turbofish 语法**（`::<类型>` 直接写在方法后面）\n```rust\nlet v = iter.collect::<Vec<i32>>();\n// 用 _ 让编译器推断元素类型\nlet v = iter.collect::<Vec<_>>();\n```\n\n`::<>` 这个语法看起来像鱼（`><`），所以叫"turbofish"（涡轮鱼）。\n\n两种方式效果完全相同，选你觉得清晰的就好。',
            },
            {
              type: 'ai-prompt',
              title: '让 AI 帮你练习迭代器',
              scenario: '你已经学会了 .map()、.filter()、.collect()、.sum() 等迭代器方法。让 AI 帮你在真实数据处理场景中综合练习。',
              prompt: '用 Rust 写一个"学生成绩分析"程序，只用迭代器方法（不用手动 for 循环），要求：\n1. 定义成绩列表 let scores = vec![72, 88, 45, 91, 63, 50, 79, 96, 38, 85];\n2. 用 .filter + .count() 统计及格人数（>= 60）\n3. 用 .map(|&x| x as f64).sum() / n 计算平均分\n4. 用 .filter + .map 把所有成绩提高 5 分（但不超过 100），收集成新 Vec\n5. 用 .any() 判断是否有满分（100 分）\n6. 用 .max() 和 .min() 找最高分和最低分\n每个操作打印结果，加中文注释。',
              explanation: '把多个迭代器方法组合起来处理真实数据，是学会迭代器的最佳方式。这道题覆盖了所有常用方法。',
            },
            {
              type: 'quiz',
              question: '下面代码中 `.collect::<Vec<_>>()` 里的 `_` 是什么意思？\n\n`let v = nums.iter().map(|&x| x * 2).collect::<Vec<_>>();`',
              options: [
                '`_` 表示忽略这个集合，不收集任何东西',
                '`_` 是占位符，让编译器自动推断元素类型',
                '`_` 表示收集成动态类型',
                '`_` 是 Rust 的特殊空类型',
              ],
              correctIndex: 1,
              explanation:
                '在 turbofish 语法中，`Vec<_>` 里的 `_` 是类型占位符，告诉编译器"我知道要收集成 Vec，但元素类型你来推断"。编译器会根据迭代器元素的类型自动填入，这里会推断为 `Vec<i32>`。这比写 `Vec<i32>` 更简洁，因为省去了重复写类型的麻烦。',
            },
          ],
        },

        // --- 8.x 闭包进阶 ---
        {
          id: 'closures-advanced',
          title: '闭包进阶：Fn / FnMut / FnOnce',
          cards: [
            {
              type: 'explain',
              title: '三种闭包 trait',
              content:
                '闭包根据"怎样使用捕获的变量"分为三种：\n\n**`Fn`** — 只读借用捕获的变量（可以调用多次）\n```rust\nlet name = String::from("Rust");\nlet greet = || println!("Hi {}", name);  // 只读 name\ngreet(); greet();  // 可以多次调用\n```\n\n**`FnMut`** — 可变借用捕获的变量\n```rust\nlet mut count = 0;\nlet mut inc = || count += 1;  // 修改 count\ninc(); inc();\n```\n\n**`FnOnce`** — 获取捕获变量的所有权（只能调用一次）\n```rust\nlet name = String::from("Rust");\nlet consume = || drop(name);  // 消费 name\nconsume();  // name 被 move 了\n// consume();  ❌ 不能再调用\n```',
              analogy:
                '把闭包想象成借书：\n- **Fn** = 看书（只读，随时可以再看）\n- **FnMut** = 在书上写笔记（需要独占，但还能再写）\n- **FnOnce** = 把书送人（所有权转移，只能送一次）',
            },
            {
              type: 'explain',
              title: '编译器自动推断 + move 关键字',
              content:
                '**编译器自动推断**：你不需要手动标注闭包是哪种 trait，编译器根据闭包体内的操作自动判断：\n- 只读变量 → `Fn`\n- 修改变量 → `FnMut`\n- 消费变量 → `FnOnce`\n\n**`move` 关键字**：强制闭包获取所有权（而不是借用）\n```rust\nlet name = String::from("Rust");\nlet greet = move || println!("Hi {}", name);\n// name 已经被 move 进闭包，这里不能再用 name\ngreet();  // ✅\n```\n\n`move` 在多线程中特别常用——线程需要拥有自己的数据，不能借用主线程的。',
            },
            {
              type: 'code',
              title: '三种闭包 trait + move 示例',
              description:
                '演示 Fn、FnMut、FnOnce 的区别，以及 move 关键字的效果。',
              language: 'rust',
              runnable: true,
              code: '// Fn：只读借用\nfn call_twice(f: impl Fn()) {\n    f();\n    f();\n}\n\n// FnMut：可变借用\nfn call_mut_twice(mut f: impl FnMut()) {\n    f();\n    f();\n}\n\n// FnOnce：只能调用一次\nfn call_once(f: impl FnOnce() -> String) -> String {\n    f()\n}\n\nfn main() {\n    // Fn 示例\n    let msg = "你好";\n    call_twice(|| println!("{}", msg));  // 只读 msg\n\n    // FnMut 示例\n    let mut total = 0;\n    call_mut_twice(|| { total += 10; println!("累计：{}", total); });\n\n    // FnOnce 示例\n    let name = String::from("Rust");\n    let result = call_once(|| {\n        // name 被 move 进来，所有权转移\n        format!("Hello, {}!", name)\n    });\n    println!("{}", result);\n\n    // move 闭包\n    let x = vec![1, 2, 3];\n    let print_vec = move || println!("vec: {:?}", x);\n    // println!("{:?}", x);  ❌ x 已被 move\n    print_vec();\n}',
            },
            {
              type: 'explain',
              title: '闭包作为参数和返回值',
              content:
                '**闭包作为函数参数**（用 `impl Fn` 语法）：\n```rust\nfn apply(f: impl Fn(i32) -> i32, x: i32) -> i32 {\n    f(x)\n}\n\nlet result = apply(|x| x * 2, 5);  // 10\n```\n\n**闭包作为返回值**（用 `impl Fn` 语法）：\n```rust\nfn make_adder(n: i32) -> impl Fn(i32) -> i32 {\n    move |x| x + n  // 必须用 move，否则 n 会被释放\n}\n\nlet add5 = make_adder(5);\nprintln!("{}", add5(10));  // 15\n```\n\n返回闭包时几乎总是需要 `move`，因为函数结束后局部变量就释放了，闭包必须拥有它需要的数据。',
            },
            {
              type: 'quiz',
              question: '闭包 `|x| x + 1` 实现了哪些 Fn trait？',
              options: [
                '只实现了 FnOnce',
                '实现了 FnOnce 和 FnMut，但没有 Fn',
                '实现了 Fn、FnMut 和 FnOnce 全部三个',
                '只实现了 Fn',
              ],
              correctIndex: 2,
              explanation:
                '`|x| x + 1` 没有捕获任何外部变量，只使用了参数 `x`。它不修改任何东西，也不消费任何东西，所以它同时满足 Fn（只读）、FnMut（可变借用的超集）和 FnOnce（最宽松的要求）。Fn 是最严格的，实现了 Fn 就自动实现了 FnMut 和 FnOnce。',
            },
          ],
        },

        // --- 8.x 自定义迭代器 ---
        {
          id: 'custom-iterator',
          title: '自定义迭代器',
          cards: [
            {
              type: 'explain',
              title: 'Iterator trait：只需实现 next()',
              content:
                'Rust 的 `Iterator` trait 定义很简单：\n\n```rust\ntrait Iterator {\n    type Item;  // 迭代器产出的元素类型\n    fn next(&mut self) -> Option<Self::Item>;\n}\n```\n\n你只需要实现**一个方法** `next()`：\n- 返回 `Some(值)` 表示还有下一个元素\n- 返回 `None` 表示迭代结束\n\n实现了 `next()` 后，你自动获得 `map`、`filter`、`collect`、`sum`、`count` 等所有方法——完全免费！\n\n这就是 trait 的威力：实现一个方法，获得几十个方法。',
              analogy:
                '就像你只需要教一个人"怎么一步一步走路"（next），他就自动会了"跑步"（map）、"跳过障碍"（filter）、"走到终点"（collect）等所有技能。',
            },
            {
              type: 'code',
              title: '实现 Counter 迭代器',
              description:
                '自定义一个从 1 数到 5 的迭代器。只需实现 `next()`，就能使用所有迭代器方法。',
              language: 'rust',
              runnable: true,
              code: 'struct Counter {\n    current: u32,\n    max: u32,\n}\n\nimpl Counter {\n    fn new(max: u32) -> Self {\n        Counter { current: 0, max }\n    }\n}\n\n// 只需实现 next()！\nimpl Iterator for Counter {\n    type Item = u32;\n\n    fn next(&mut self) -> Option<u32> {\n        if self.current < self.max {\n            self.current += 1;\n            Some(self.current)\n        } else {\n            None  // 迭代结束\n        }\n    }\n}\n\nfn main() {\n    // 基本用法：for 循环\n    print!("计数：");\n    for n in Counter::new(5) {\n        print!("{} ", n);\n    }\n    println!();\n\n    // 免费获得的方法！\n    let sum: u32 = Counter::new(5).sum();\n    println!("1+2+3+4+5 = {}", sum);\n\n    let doubled: Vec<u32> = Counter::new(5).map(|x| x * 2).collect();\n    println!("每个数乘2：{:?}", doubled);\n\n    let evens: Vec<u32> = Counter::new(10).filter(|x| x % 2 == 0).collect();\n    println!("1-10偶数：{:?}", evens);\n\n    // 两个迭代器配合\n    let pairs: Vec<(u32, u32)> = Counter::new(3)\n        .zip(Counter::new(3).map(|x| x * 10))\n        .collect();\n    println!("配对：{:?}", pairs);\n}',
            },
            {
              type: 'think-first',
              question: '如果你要写一个生成斐波那契数列的迭代器，`next()` 方法内部需要记住什么状态？',
              hints: '斐波那契数列：0, 1, 1, 2, 3, 5, 8, 13... 每个数 = 前两个数之和',
              reveal: '需要记住**前两个数**！\n\n```rust\nstruct Fibonacci {\n    a: u64,  // 前前一个数\n    b: u64,  // 前一个数\n}\n\nimpl Fibonacci {\n    fn new() -> Self {\n        Fibonacci { a: 0, b: 1 }\n    }\n}\n\nimpl Iterator for Fibonacci {\n    type Item = u64;\n    fn next(&mut self) -> Option<u64> {\n        let result = self.a;\n        let new_b = self.a + self.b;\n        self.a = self.b;\n        self.b = new_b;\n        Some(result)  // 无限迭代器！\n    }\n}\n```\n\n这是一个**无限迭代器**（永远返回 `Some`）。使用时搭配 `.take(n)` 限制个数：\n`Fibonacci::new().take(10).collect::<Vec<_>>()`',
            },
            {
              type: 'quiz',
              question: '实现 Iterator trait 时，必须实现哪个方法？',
              options: [
                'map()',
                'collect()',
                'next()',
                'iter()',
              ],
              correctIndex: 2,
              explanation:
                'Iterator trait 只有一个必须实现的方法：`next(&mut self) -> Option<Self::Item>`。其他方法（map、filter、collect、sum 等）都有默认实现，它们内部都是基于 `next()` 构建的。所以你只需要告诉 Rust"怎么产出下一个元素"，就自动获得了整个迭代器工具链。',
            },
          ],
        },
      ],
    },

    // =============================================
    // 第九章：泛型、Trait 与生命周期
    // =============================================
    {
      id: 'ch9-generics',
      title: '第九章：泛型、Trait 与生命周期',
      lessons: [
        // --- 9.1 泛型 ---
        {
          id: 'generics',
          title: '泛型 <T>',
          cards: [
            {
              type: 'explain',
              title: '为什么需要泛型？',
              content:
                '假设你写了一个函数，求 `i32` 列表中最大值。\n\n后来发现还需要一个求 `f64` 列表最大值的函数。\n\n两个函数逻辑完全一样，只有类型不同——这很冗余！\n\n**泛型（Generics）**允许你写一次代码，适用于多种类型。\n\n`<T>` 就是一个**类型参数**，`T` 是占位符，使用时由具体类型替换。',
              analogy:
                '泛型就像**蛋糕模具**：同一个模具，换不同口味的面糊（巧克力、草莓、香草），就能做出不同口味的蛋糕。模具的形状（逻辑）不变，材料（类型）可以替换。',
            },
            {
              type: 'code',
              title: '泛型函数',
              description:
                '用 `<T>` 写一个通用的"打印任意类型"函数和"返回第一个元素"函数。\n\n`T: std::fmt::Display` 是 Trait 约束，表示 T 必须能被打印（下一课会详解）。',
              language: 'rust',
              runnable: true,
              code: '// 泛型函数：接受任意可打印类型\nfn print_item<T: std::fmt::Display>(item: T) {\n    println!("Item: {}", item);\n}\n\n// 泛型函数：返回切片的第一个元素的引用\nfn first<T>(list: &[T]) -> &T {\n    &list[0]\n}\n\nfn main() {\n    // 同一个函数，用于不同类型\n    print_item(42);\n    print_item("hello");\n    print_item(3.14);\n\n    let numbers = vec![10, 20, 30];\n    let words = vec!["apple", "banana"];\n    println!("第一个数字: {}", first(&numbers));\n    println!("第一个单词: {}", first(&words));\n}',
            },
            {
              type: 'explain',
              title: '泛型结构体',
              content:
                '结构体也可以使用泛型：\n\n```rust\nstruct Point<T> {\n    x: T,\n    y: T,\n}\n\nlet int_point = Point { x: 5, y: 10 };\nlet float_point = Point { x: 1.5, y: 2.7 };\n```\n\n也可以有多个类型参数：\n```rust\nstruct Pair<T, U> {\n    first: T,\n    second: U,\n}\n```\n\n**关键**：泛型是**零成本抽象**——Rust 在编译时为每种用到的具体类型生成专属代码，运行时没有任何额外开销。',
            },
            {
              type: 'fill-blank',
              title: '填空：泛型语法',
              description: '补全这个泛型函数和泛型结构体的声明。',
              template: 'fn first___BLANK___(a: T, b: T) -> T {\n    a\n}\n\nstruct Pair___BLANK___ {\n    x: T,\n    y: U,\n}',
              blanks: ['<T>', '<T, U>'],
              hints: ['函数接受一个类型参数，用什么语法声明？', '结构体有两个不同的类型参数'],
              language: 'rust',
            },
            {
              type: 'code',
              title: '泛型结构体',
              description:
                '一个通用的 `Wrapper<T>` 结构体，可以包装任意类型。\n\n`impl<T>` 块为泛型结构体实现方法。',
              language: 'rust',
              runnable: true,
              code: '#[derive(Debug)]\nstruct Wrapper<T> {\n    value: T,\n    label: &\'static str,\n}\n\nimpl<T: std::fmt::Display> Wrapper<T> {\n    fn new(value: T, label: &\'static str) -> Self {\n        Wrapper { value, label }\n    }\n\n    fn show(&self) {\n        println!("{}: {}", self.label, self.value);\n    }\n}\n\nfn main() {\n    let int_w = Wrapper::new(42, "整数");\n    let str_w = Wrapper::new("hello", "字符串");\n    let float_w = Wrapper::new(3.14, "小数");\n\n    int_w.show();\n    str_w.show();\n    float_w.show();\n}',
            },
            {
              type: 'quiz',
              question: '泛型的主要作用是什么？',
              options: [
                '让程序运行更快',
                '允许写一次代码，适用于多种类型，减少重复',
                '只能用于函数，不能用于结构体',
                '替代所有权系统',
              ],
              correctIndex: 1,
              explanation:
                '泛型的核心价值是"写一次，用于多种类型"，消除重复代码。Rust 的泛型是零成本抽象——编译器会为每种具体类型生成专属代码，运行时和手写的具体类型函数一样快。',
            },
            {
              type: 'ai-prompt',
              title: '让 AI 帮你理解泛型',
              scenario: '你学会了泛型函数和泛型结构体。让 AI 帮你加深理解。',
              prompt: '用 Rust 写一个泛型"栈"（Stack）数据结构，要求：\n1. 定义 struct Stack<T>，内部用 Vec<T> 存储数据\n2. 实现 push(item: T)、pop() -> Option<T>、peek() -> Option<&T>、is_empty() -> bool 方法\n3. 在 main 中分别用 Stack<i32> 和 Stack<&str> 演示，push 几个元素再 pop\n4. 加中文注释解释每个方法的作用\n要求代码能编译运行。',
              explanation: '自己实现一个栈是理解泛型结构体 + impl<T> 的经典练习。它同时练习了泛型、Vec、Option，一举多得。',
            },
          ],
        },

        // --- 9.2 Trait ---
        {
          id: 'traits',
          title: 'Trait：共享行为',
          cards: [
            {
              type: 'explain',
              title: 'Trait 是什么？',
              content:
                '不同类型可能有相同的"行为"。\n\n比如：`Dog` 和 `Cat` 都可以"叫"，`Circle` 和 `Rectangle` 都可以"计算面积"。\n\n**Trait** 就是定义"共同行为"的接口：\n- `trait` 关键字定义一组方法签名\n- `impl TraitName for TypeName` 为某个类型实现该 trait\n\n这和其他语言的"接口（Interface）"或"抽象基类"类似，但更灵活。',
              analogy:
                '把 Trait 想象成**职业技能证书**：定义了"持证人会做什么"。"驾照"trait 规定持有者会开车；不管是 Alice 还是 Bob，只要有驾照，就能开车。Trait 定义能力，类型来实现它。',
            },
            {
              type: 'think-first',
              question: '不同类型的数据（猫、狗、鸟）都会"发出叫声"，但叫声不同。\n\n如果你设计一门语言，你会怎么表达"不同类型有相同行为但不同实现"这个概念？',
              reveal: '这就是 **Trait（特征）** 的核心思想！\n\n```rust\ntrait MakeSound {\n    fn sound(&self) -> &str;\n}\n```\n\n不同类型各自实现 `MakeSound`：猫返回"喵"，狗返回"汪"。\n\n调用方只需要知道"这个东西能发声"，不需要知道具体是什么类型——这就是多态。\n\nTrait 类似其他语言的接口（Interface），但 Rust 的 Trait 更强大（可以有默认实现、可以约束泛型）。',
            },
            {
              type: 'code',
              title: '定义和实现 Trait',
              description:
                '关键看 `introduce` 函数——它接受**任何实现了 Greet 的类型**。\n\n同一个函数，传 Dog 进去能用，传 Cat 进去也能用。这就是 trait 的价值：**定义共同行为，让不同类型都能被同一段代码处理**。',
              language: 'rust',
              runnable: true,
              code: '// 定义 trait：规定"能打招呼"的行为\ntrait Greet {\n    fn hello(&self) -> String;\n}\n\nstruct Dog { name: String }\nstruct Cat { name: String }\n\nimpl Greet for Dog {\n    fn hello(&self) -> String {\n        format!("汪！我是{}", self.name)\n    }\n}\n\nimpl Greet for Cat {\n    fn hello(&self) -> String {\n        format!("喵～我是{}", self.name)\n    }\n}\n\n// 关键：这个函数接受"任何能打招呼的东西"\n// 不需要知道具体是 Dog 还是 Cat\n// impl Greet 的意思是：只要实现了 Greet 就行\nfn introduce(animal: &impl Greet) {\n    println!("大家好！{}", animal.hello());\n}\n\nfn main() {\n    let dog = Dog { name: String::from("旺财") };\n    let cat = Cat { name: String::from("咪咪") };\n\n    // 同一个函数，不同的类型，不同的行为\n    introduce(&dog);  // 输出：大家好！汪！我是旺财\n    introduce(&cat);  // 输出：大家好！喵～我是咪咪\n}',
            },
            {
              type: 'explain',
              title: '常见的标准库 Trait',
              content:
                'Rust 标准库定义了很多常用 trait，你已经不知不觉地用过了：\n\n- **`Display`**（`std::fmt::Display`）：定义 `{}` 格式化输出，需要手动实现\n- **`Debug`**（`std::fmt::Debug`）：定义 `{:?}` 输出，通常用 `#[derive(Debug)]` 自动派生\n- **`Clone`**：定义 `.clone()` 方法，深复制\n- **`PartialEq`**：定义 `==` 和 `!=`\n- **`PartialOrd`**：定义 `<`、`>`、`<=`、`>=`\n- **`Iterator`**：定义迭代器行为（`for` 循环的基础）\n\n`#[derive(...)]` 属性可以自动生成常见 trait 的实现。',
            },
            {
              type: 'code',
              title: '实现 Display trait',
              description:
                '为自定义类型实现 `Display` trait，让它可以用 `{}` 打印。\n\n注意 `use std::fmt` 和 `write!` 宏的用法。',
              language: 'rust',
              runnable: true,
              code: 'use std::fmt;\n\n#[derive(Debug, Clone, PartialEq)]\nstruct Point {\n    x: f64,\n    y: f64,\n}\n\n// 实现 Display trait，定义 {} 格式\nimpl fmt::Display for Point {\n    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {\n        write!(f, "({}, {})", self.x, self.y)\n    }\n}\n\nfn main() {\n    let p1 = Point { x: 1.0, y: 2.5 };\n    let p2 = p1.clone();  // Clone trait\n\n    println!("Display: {}", p1);   // 用 Display\n    println!("Debug: {:?}", p1);   // 用 Debug\n    println!("p1 == p2: {}", p1 == p2);  // 用 PartialEq\n}',
            },
            {
              type: 'quiz',
              question: '下面哪个 `#[derive(...)]` 属性让你可以用 `{:?}` 打印结构体？',
              options: [
                '`#[derive(Display)]`',
                '`#[derive(Debug)]`',
                '`#[derive(Print)]`',
                '`#[derive(Format)]`',
              ],
              correctIndex: 1,
              explanation:
                '`#[derive(Debug)]` 自动实现 `std::fmt::Debug` trait，允许用 `{:?}`（或 `{:#?}` 美化输出）格式化打印。`Display`（用于 `{}`）需要手动实现，因为输出格式因类型而异，编译器无法自动生成合理的格式。',
            },
            {
              type: 'ai-prompt',
              title: '让 AI 帮你练习 Trait',
              scenario: '你学会了定义 trait、为类型实现 trait、常见标准库 trait。让 AI 给你一个实战练习。',
              prompt: '用 Rust 定义一个 Shape trait，包含：\n1. area(&self) -> f64（计算面积，必须实现）\n2. perimeter(&self) -> f64（计算周长，必须实现）\n3. describe(&self) -> String（默认实现，返回 "面积=X, 周长=Y" 格式的字符串，用 format!）\n然后为 Circle（radius: f64）和 Rectangle（width: f64, height: f64）实现这个 trait。\n在 main 中各创建一个实例，调用三个方法并打印。\n要求：加中文注释，代码能编译运行。',
              explanation: '几何图形是 trait 最经典的教学示例。实现两种形状让你体会 trait 如何统一不同类型的接口，同时练习默认实现的写法。',
            },
          ],
        },

        // --- 9.2b From / Into 与 Display ---
        {
          id: 'from-into-display',
          title: 'From / Into 与 Display',
          cards: [
            {
              type: 'explain',
              title: 'From trait——类型转换的标准方式',
              content:
                '`From` trait 定义了如何从一种类型转换为另一种类型：\n\n```rust\nimpl From<String> for MyType {\n    fn from(s: String) -> Self {\n        MyType { name: s }\n    }\n}\n```\n\n调用方式有两种：\n- 显式：`MyType::from(s)`\n- 隐式：`let x: MyType = s.into()`\n\n标准库中有大量 `From` 实现，比如 `String::from("hello")`、`Vec<u8>::from("hello")` 等。\n\n**核心原则**：`From` 转换不应该失败——如果可能失败，用 `TryFrom`（返回 Result）。',
            },
            {
              type: 'explain',
              title: 'Into——From 的镜像',
              content:
                '`Into` 是 `From` 的"反方向"——**实现了 `From<A> for B` 后，自动获得 `Into<B> for A`**，不需要手动实现。\n\n`Into` 最常见的用途是**函数参数**：\n\n```rust\nfn greet(name: impl Into<String>) {\n    let name = name.into();\n    println!("你好，{}！", name);\n}\n\ngreet("世界");           // &str → String，自动转换\ngreet(String::from("Rust")); // String → String，零成本\n```\n\n用 `impl Into<String>` 做参数，调用方既能传 `String` 也能传 `&str`，非常方便。',
            },
            {
              type: 'explain',
              title: 'Display trait——自定义 {} 输出',
              content:
                '`Display` trait 让你的类型可以用 `{}` 格式化打印：\n\n```rust\nuse std::fmt;\n\nimpl fmt::Display for MyType {\n    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {\n        write!(f, "MyType: {}", self.name)\n    }\n}\n```\n\n**Display vs Debug**：\n- `Debug`（`{:?}`）：用 `#[derive(Debug)]` 自动生成，输出面向开发者\n- `Display`（`{}`）：**必须手写**，输出面向用户\n\n实现了 `Display` 的类型还自动获得 `.to_string()` 方法（因为标准库有 `impl<T: Display> ToString for T`）。',
            },
            {
              type: 'code',
              title: '实现 From 和 Display',
              description:
                '为自定义类型实现 `From`（类型转换）和 `Display`（格式化输出）。\n\n注意 `Into` 是自动获得的，不需要手动实现。',
              language: 'rust',
              runnable: true,
              code: 'use std::fmt;\n\n#[derive(Debug)]\nstruct Celsius(f64);\n\n#[derive(Debug)]\nstruct Fahrenheit(f64);\n\n// 实现 From：华氏 → 摄氏\nimpl From<Fahrenheit> for Celsius {\n    fn from(f: Fahrenheit) -> Self {\n        Celsius((f.0 - 32.0) * 5.0 / 9.0)\n    }\n}\n\n// 实现 Display：自定义 {} 输出\nimpl fmt::Display for Celsius {\n    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {\n        write!(f, "{:.1}°C", self.0)\n    }\n}\n\nimpl fmt::Display for Fahrenheit {\n    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {\n        write!(f, "{:.1}°F", self.0)\n    }\n}\n\n// 用 impl Into<String> 让参数更灵活\nfn log_temp(label: impl Into<String>, celsius: &Celsius) {\n    let label = label.into();\n    println!("[{}] 温度: {}", label, celsius);\n}\n\nfn main() {\n    let boiling = Fahrenheit(212.0);\n    println!("原始温度: {}", boiling);\n\n    // 两种转换方式\n    let c1 = Celsius::from(Fahrenheit(212.0)); // 显式 From\n    let c2: Celsius = Fahrenheit(72.0).into();  // 隐式 Into\n\n    println!("沸点: {}", c1);\n    println!("室温: {}", c2);\n\n    // Display 自动给了 to_string()\n    let s: String = c1.to_string();\n    println!("字符串: {}", s);\n\n    // impl Into<String> 参数——&str 和 String 都能传\n    log_temp("厨房", &c1);\n    log_temp(String::from("客厅"), &c2);\n}',
            },
            {
              type: 'quiz',
              question: '实现了 `From<A> for B` 后，以下哪个也自动可用？',
              options: [
                '`B::into(a)` — 可以直接调用 into 方法',
                '`let b: B = a.into()` — 可以用 Into 转换',
                '`a.display()` — 可以格式化输出',
                '`B::try_from(a)` — 可以尝试转换',
              ],
              correctIndex: 1,
              explanation:
                '实现了 `From<A> for B` 后，Rust 自动为 `A` 实现 `Into<B>`，所以 `let b: B = a.into()` 可以直接使用。注意语法：`into()` 是在 `a` 上调用的方法（`a.into()`），不是 `B::into(a)`。Display 和 TryFrom 需要单独实现。',
            },
          ],
        },

        // --- 9.2c derive 宏与常用 Trait ---
        {
          id: 'derive-traits',
          title: 'derive 宏与常用 Trait',
          cards: [
            {
              type: 'explain',
              title: '#[derive(...)] 自动实现 Trait',
              content:
                '`#[derive(...)]` 让编译器自动为你的类型实现指定的 trait，免去手写样板代码。\n\n常用的可 derive 的 trait：\n- **Debug**：`{:?}` 格式化输出\n- **Clone**：`.clone()` 方法，深复制\n- **Copy**：隐式按位复制（栈上数据）\n- **PartialEq** / **Eq**：`==` 和 `!=` 比较\n- **Hash**：计算哈希值（HashMap 的 key 需要）\n- **Default**：`Type::default()` 生成默认值\n\n```rust\n#[derive(Debug, Clone, PartialEq)]\nstruct Point { x: f64, y: f64 }\n```',
            },
            {
              type: 'explain',
              title: 'Copy vs Clone',
              content:
                '**Copy** 和 **Clone** 都是"复制"，但行为不同：\n\n**Copy**（隐式、栈上、按位复制）：\n- 赋值和传参时自动复制，不发生所有权转移\n- 必须是"便宜的"——只有栈上数据能 Copy\n- `i32`, `f64`, `bool`, `char`, `&T` 都是 Copy\n- 要实现 Copy 必须先实现 Clone\n\n**Clone**（显式、可能昂贵）：\n- 需要手动调用 `.clone()`\n- 可以做"深拷贝"——堆上数据也能复制\n- `String`, `Vec<T>` 是 Clone 但**不是** Copy\n\n```rust\nlet a = 42;       // i32 是 Copy\nlet b = a;         // 自动复制，a 还能用\n\nlet s1 = String::from("hi"); // String 不是 Copy\nlet s2 = s1.clone();          // 必须显式 clone\n// s1 还能用，因为 clone 创建了新的副本\n```',
            },
            {
              type: 'explain',
              title: 'PartialEq vs Eq，以及 Hash',
              content:
                '**PartialEq**：定义 `==` 和 `!=`，允许"部分相等"（有些值可能无法比较）。\n\n**Eq**：在 PartialEq 基础上要求**完全相等**——对于任何值 `x`，`x == x` 必须为 `true`。\n\n为什么要区分？因为 `f64` 的 `NaN != NaN`！\n```rust\nlet x = f64::NAN;\nprintln!("{}", x == x); // false！\n```\n\n所以 `f64` 只实现了 `PartialEq`，没有 `Eq`。\n\n**Hash** trait 要求类型同时实现 **Eq**（因为 HashMap 的 key 必须是完全相等的——如果 `a == a` 可能为 false，HashMap 就找不到已经插入的 key）。\n\n所以：`f64` 不能做 HashMap 的 key。',
            },
            {
              type: 'code',
              title: 'derive 多个 Trait + HashMap key',
              description:
                '用 derive 一次性实现多个 trait，并把自定义类型用作 HashMap 的 key（需要 Hash + Eq）。',
              language: 'rust',
              runnable: true,
              code: 'use std::collections::HashMap;\n\n// 做 HashMap key 需要：Hash + Eq（Eq 需要 PartialEq）\n#[derive(Debug, Clone, Hash, PartialEq, Eq)]\nstruct StudentId {\n    grade: u32,\n    number: u32,\n}\n\n// Default 提供默认值\n#[derive(Debug, Clone, Default)]\nstruct Config {\n    verbose: bool,\n    max_retries: u32,\n    timeout_secs: u64,\n}\n\nfn main() {\n    // 用自定义类型做 HashMap key\n    let mut scores: HashMap<StudentId, f64> = HashMap::new();\n    \n    let alice = StudentId { grade: 3, number: 12 };\n    let bob = StudentId { grade: 3, number: 7 };\n    \n    scores.insert(alice.clone(), 95.5);\n    scores.insert(bob.clone(), 88.0);\n    \n    println!("Alice 的分数: {:?}", scores.get(&alice));\n    println!("Bob 的分数: {:?}", scores.get(&bob));\n    \n    // PartialEq 让我们可以比较\n    println!("alice == bob? {}", alice == bob);\n    println!("alice == alice.clone()? {}", alice == alice.clone());\n    \n    // Default 生成默认值\n    let config = Config::default();\n    println!("默认配置: {:?}", config);\n}',
            },
            {
              type: 'quiz',
              question: '为什么 f64 不能做 HashMap 的 key？',
              options: [
                'f64 太大了，不适合做 key',
                'f64 没有实现 Clone',
                'f64 只实现了 PartialEq，没有 Eq，因为 NaN != NaN',
                'f64 是浮点数，HashMap 只支持整数 key',
              ],
              correctIndex: 2,
              explanation:
                'HashMap 的 key 必须实现 `Hash + Eq`。`f64` 的 `NaN != NaN`（即 `NaN == NaN` 为 false），违反了 `Eq` 的要求（任何值必须等于自身）。所以 `f64` 只实现了 `PartialEq`，没有 `Eq`，不能做 HashMap 的 key。如果确实需要，可以用 Newtype 包装并自定义比较逻辑。',
            },
          ],
        },

        // --- 9.3 Trait 约束 ---
        {
          id: 'trait-bounds',
          title: 'Trait 约束',
          cards: [
            {
              type: 'explain',
              title: '为什么需要 Trait 约束？',
              content:
                '泛型 `<T>` 允许接受任意类型，但有时你需要限制"T 必须具备某种能力"。\n\n比如：一个"打印最大值"的函数，T 必须支持比较（`PartialOrd`）和打印（`Display`）。\n\n如果不加约束，编译器不知道 T 是否能比较大小，会报错。\n\n**Trait 约束（Trait Bounds）** 就是给泛型加条件：`T: SomeTrait`。',
            },
            {
              type: 'explain',
              title: '三种写法',
              content:
                '**写法一：直接在 `<T:>` 中写**\n```rust\nfn print_max<T: PartialOrd + Display>(a: T, b: T) { ... }\n```\n\n**写法二：`where` 子句**（约束复杂时更清晰）\n```rust\nfn print_max<T>(a: T, b: T)\nwhere\n    T: PartialOrd + Display,\n{ ... }\n```\n\n**写法三：`impl Trait` 语法**（参数位置的简写）\n```rust\nfn notify(item: &impl Display) {\n    println!("{}", item);\n}\n```\n\n三种写法等价，选最清晰的那种。约束少时用写法一，约束多时用 `where`。',
            },
            {
              type: 'code',
              title: 'Trait 约束实战',
              description:
                '用 Trait 约束写一个通用的 `largest` 函数（找最大值）和 `print_pair` 函数。\n\n注意 `where` 子句让复杂约束更清晰。',
              language: 'rust',
              runnable: true,
              code: 'use std::fmt::Display;\n\n// 写法一：约束在 <T: ...> 中\nfn largest<T: PartialOrd>(list: &[T]) -> &T {\n    let mut largest = &list[0];\n    for item in list {\n        if item > largest {\n            largest = item;\n        }\n    }\n    largest\n}\n\n// 写法二：where 子句（多个约束时更清晰）\nfn print_pair<T, U>(a: T, b: U)\nwhere\n    T: Display,\n    U: Display,\n{\n    println!("({}, {})", a, b);\n}\n\n// 写法三：impl Trait（参数位置简写）\nfn show(item: &impl Display) {\n    println!("item = {}", item);\n}\n\nfn main() {\n    let nums = vec![34, 50, 25, 100, 65];\n    println!("最大数: {}", largest(&nums));\n\n    let chars = vec![\'y\', \'m\', \'a\', \'q\'];\n    println!("最大字符: {}", largest(&chars));\n\n    print_pair("名字", 42);\n    show(&"hello world");\n}',
            },
            {
              type: 'explain',
              title: '返回值位置的 impl Trait',
              content:
                '`impl Trait` 也可以出现在**返回值**位置，表示"返回某个实现了该 trait 的类型，但不指定具体是哪个类型"：\n\n```rust\nfn make_greeting(name: &str) -> impl Display {\n    format!("你好，{}！", name)\n}\n```\n\n**限制**：函数只能返回**同一种**具体类型。如果 if/else 的两个分支返回不同类型（即使都实现了 trait），编译器会报错。\n\n需要在运行时动态派发时，要用 `Box<dyn Trait>`（进阶内容，现在不用掌握）。',
            },
            {
              type: 'quiz',
              question: '`fn foo<T: Clone + Display>(x: T)` 用 `where` 子句改写是？',
              options: [
                '`fn foo<T>(x: T) where T: Clone, T: Display { }`',
                '`fn foo<T>(x: T) where T: Clone + Display { }`',
                '`fn foo(x: impl Clone + Display) { }`（这是等价的 impl Trait 写法，不是 where）',
                'A 和 B 都正确',
              ],
              correctIndex: 3,
              explanation:
                'A 和 B 都是合法的 `where` 写法：可以把多个 trait 写在一个 `T:` 里（用 `+` 连接），也可以分开写多行。选 D（A 和 B 都正确）。C 是用 `impl Trait` 语法的等价写法，但不是 `where` 子句。',
            },
            {
              type: 'ai-prompt',
              title: '让 AI 帮你理解 Trait 约束',
              scenario: '你学会了 Trait 约束的三种写法。让 AI 帮你用这些知识做一道综合题。',
              prompt: '用 Rust 写一个泛型函数 summarize<T>，要求：\n1. T 需要同时实现 Display 和 Clone 两个 trait\n2. 函数接受一个 Vec<T>，遍历打印每个元素（用 Display）\n3. 克隆第一个元素（用 Clone）并返回\n4. 用 where 子句写约束（不用 <T: ...> 写法）\n5. 在 main 中用 Vec<String> 和 Vec<i32> 分别调用，打印结果\n要求：加中文注释，代码能编译运行。',
              explanation: '这道题结合了泛型、多个 trait 约束、where 子句，是第九章前三节的综合检验。',
            },
          ],
        },

        // --- 9.3b dyn Trait 与动态分发 ---
        {
          id: 'dyn-trait',
          title: 'dyn Trait 与动态分发',
          cards: [
            {
              type: 'explain',
              title: '静态分发 vs 动态分发',
              content:
                '前面学的 `impl Trait` 和泛型 `<T: Trait>` 都是**静态分发**：编译器在编译时确定具体类型，为每种类型生成一份专属代码。优点是零开销，缺点是代码体积可能变大。\n\n**动态分发（`dyn Trait`）** 是另一种方式：运行时通过 **vtable（虚函数表）** 查找要调用的方法。有一点额外开销（一次指针跳转），但更灵活——可以在运行时处理不同的具体类型。\n\n```rust\n// 静态分发——编译时确定类型\nfn print_static(item: &impl Display) { ... }\n\n// 动态分发——运行时确定类型\nfn print_dynamic(item: &dyn Display) { ... }\n```',
            },
            {
              type: 'think-first',
              question: '你有一个 Vec，想同时存 Dog 和 Cat（两者都实现了 Animal trait）。\n\n用 `Vec<impl Animal>` 行吗？为什么？',
              reveal: '不行！`impl Animal` 在编译时只能代表**一种**具体类型。一个 `Vec<impl Animal>` 里面要么全是 Dog，要么全是 Cat，不能混合。\n\n需要用 `Vec<Box<dyn Animal>>`：\n- `Box` 在堆上存储数据，提供固定大小的指针\n- `dyn` 表示"运行时才知道具体类型"\n\n这样就能在同一个 Vec 里混合存放不同类型了。',
            },
            {
              type: 'explain',
              title: 'Box<dyn Trait>——trait object',
              content:
                '`Box<dyn Trait>` 是最常见的 **trait object** 形式：\n\n- `Box` 提供固定大小（一个指针），解决了"不同类型大小不同"的问题\n- `dyn` 标记这是动态分发\n\n`&dyn Trait` 也可以用，但需要管理生命周期，更复杂。\n\ntrait object 内部是一个"胖指针"（两个指针宽度）：\n1. 一个指向数据本身\n2. 一个指向 vtable（记录了该类型实现的所有 trait 方法的地址）\n\n```rust\nlet animals: Vec<Box<dyn Animal>> = vec![\n    Box::new(Dog { name: "旺财".into() }),\n    Box::new(Cat { name: "咪咪".into() }),\n];\n```',
            },
            {
              type: 'code',
              title: 'Vec<Box<dyn Trait>> 混合存储',
              description:
                '把不同类型（Dog 和 Cat）存入同一个 Vec，通过 trait object 统一调用方法。\n\n这是动态分发最经典的使用场景。',
              language: 'rust',
              runnable: true,
              code: 'use std::fmt;\n\ntrait Animal: fmt::Display {\n    fn speak(&self) -> &str;\n    fn name(&self) -> &str;\n}\n\nstruct Dog { name: String }\nstruct Cat { name: String }\n\nimpl Animal for Dog {\n    fn speak(&self) -> &str { "汪汪！" }\n    fn name(&self) -> &str { &self.name }\n}\n\nimpl Animal for Cat {\n    fn speak(&self) -> &str { "喵～" }\n    fn name(&self) -> &str { &self.name }\n}\n\nimpl fmt::Display for Dog {\n    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {\n        write!(f, "狗狗 {}", self.name)\n    }\n}\n\nimpl fmt::Display for Cat {\n    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {\n        write!(f, "猫咪 {}", self.name)\n    }\n}\n\nfn main() {\n    // 不同类型存入同一个 Vec！\n    let animals: Vec<Box<dyn Animal>> = vec![\n        Box::new(Dog { name: "旺财".into() }),\n        Box::new(Cat { name: "咪咪".into() }),\n        Box::new(Dog { name: "大黄".into() }),\n        Box::new(Cat { name: "小白".into() }),\n    ];\n\n    // 统一遍历，运行时自动调用正确的方法\n    for animal in &animals {\n        println!("{} 说: {}", animal.name(), animal.speak());\n    }\n}',
            },
            {
              type: 'explain',
              title: '什么时候用 impl Trait vs dyn Trait？',
              content:
                '**默认选 `impl Trait`（静态分发）**：\n- 性能最优（零开销，编译器内联优化）\n- 函数参数和返回值的常见选择\n- 编译时就能确定类型\n\n**用 `dyn Trait`（动态分发）的场景**：\n- 需要在同一个容器（Vec、HashMap）里**混合存放不同类型**\n- 编译时不知道具体类型（比如插件系统、回调函数）\n- 想减小编译后的代码体积（静态分发会为每种类型生成代码）\n\n**经验法则**：先用 `impl Trait`，只在"需要混合不同类型"或"类型在运行时才确定"时才换 `dyn Trait`。',
            },
            {
              type: 'quiz',
              question: '`Vec<Box<dyn Display>>` 可以同时存 String 和 i32 吗？',
              options: [
                '不可以，Vec 只能存同一种类型',
                '可以，因为 String 和 i32 都实现了 Display',
                '不可以，需要用 Vec<impl Display>',
                '可以，但只能存引用，不能存值',
              ],
              correctIndex: 1,
              explanation:
                '可以！`Box<dyn Display>` 是 trait object，在运行时通过 vtable 动态分发。String 和 i32 都实现了 `Display`，所以都可以装进 `Box<dyn Display>`，然后存入同一个 Vec。这就是动态分发的核心价值——在一个容器里混合不同具体类型。',
            },
          ],
        },

        // --- 9.4 生命周期 ---
        {
          id: 'lifetimes',
          title: '生命周期基础',
          cards: [
            {
              type: 'explain',
              title: '为什么需要生命周期？',
              content:
                '引用必须始终有效——这是借用规则之一。\n\n但当函数**返回引用**时，编译器面临一个问题：这个引用指向的数据，是参数 `a` 还是参数 `b`？它们哪个活得更长？\n\n```rust\nfn longest(x: &str, y: &str) -> &str {\n    if x.len() > y.len() { x } else { y }\n}\n```\n\n编译器无法确定返回的引用和哪个输入参数"绑定"，所以报错。\n\n**生命周期注解**（`\'a`）就是用来告诉编译器这种关系的。',
              analogy:
                '把生命周期想象成**借书证有效期**：借书证（引用）的有效期不能超过图书馆的开馆时间（被引用数据的生命周期）。`\'a` 就是在说"这张借书证和图书馆A同生共死"。',
            },
            {
              type: 'explain',
              title: '生命周期注解语法',
              content:
                '生命周期注解以撇号 `\'` 开头，后面跟一个短名称，通常是 `\'a`：\n\n```rust\nfn longest<\'a>(x: &\'a str, y: &\'a str) -> &\'a str {\n    if x.len() > y.len() { x } else { y }\n}\n```\n\n`\'a` 的含义：参数 `x`、`y` 和返回值都与同一个生命周期 `\'a` 绑定。实际上，`\'a` 等于 `x` 和 `y` 生命周期的**较短者**。\n\n**重要**：生命周期注解不改变任何引用的实际生命周期，只是告诉编译器各引用之间的关系，让它能进行检查。',
            },
            {
              type: 'code',
              title: '函数中的生命周期',
              description:
                '加上生命周期注解后，`longest` 函数可以正确编译。\n\n注意：生命周期是编译器的提示，不影响运行时行为。',
              language: 'rust',
              runnable: true,
              code: '// 生命周期注解告诉编译器：返回值的生命周期\n// 等于 x 和 y 中较短的那个\nfn longest<\'a>(x: &\'a str, y: &\'a str) -> &\'a str {\n    if x.len() > y.len() { x } else { y }\n}\n\nfn main() {\n    let s1 = String::from("long string");\n    let result;\n    {\n        let s2 = String::from("xy");\n        result = longest(s1.as_str(), s2.as_str());\n        // 在 s2 还有效的范围内使用 result，没问题\n        println!("最长的字符串: {}", result);\n    }\n    // 注意：s2 在这里已经失效\n    // 所以不能在这里使用 result（如果 result 指向 s2 的话）\n    println!("s1 还可以用: {}", s1);\n}',
            },
            {
              type: 'explain',
              title: '生命周期省略规则',
              content:
                '好消息：**大多数情况下你不需要手写生命周期注解！**\n\n编译器有三条"省略规则"，能自动推断大多数情况：\n\n**规则 1**：每个引用参数都有自己的生命周期参数。\n\n**规则 2**：如果只有一个输入生命周期参数，它被赋给所有输出生命周期。\n\n**规则 3**：如果有多个输入生命周期，但其中一个是 `&self` 或 `&mut self`，则 `self` 的生命周期赋给所有输出。\n\n实践中，方法（`impl` 块中的函数）几乎不需要生命周期注解（规则 3 覆盖大多数情况）。只有在函数返回引用且编译器无法推断时，才需要手写。',
            },
            {
              type: 'code',
              title: '省略规则生效的例子',
              description:
                '大多数函数不需要生命周期注解，编译器能自动推断。\n\n只有返回引用且来源不明时，才需要显式标注。',
              language: 'rust',
              runnable: true,
              code: '// 不需要生命周期注解（规则 2：只有一个引用参数）\nfn first_word(s: &str) -> &str {\n    let bytes = s.as_bytes();\n    for (i, &byte) in bytes.iter().enumerate() {\n        if byte == b\' \' {\n            return &s[..i];\n        }\n    }\n    &s[..]\n}\n\nstruct Important<\'a> {\n    // 结构体持有引用时，必须标注生命周期\n    content: &\'a str,\n}\n\nimpl<\'a> Important<\'a> {\n    // 方法通常不需要额外注解（规则 3）\n    fn content(&self) -> &str {\n        self.content\n    }\n}\n\nfn main() {\n    let novel = String::from("很久很久以前。\\n第二段开始了。");\n    let first = first_word(&novel);\n    println!("第一段: {}", first);\n\n    let imp = Important { content: first };\n    println!("重要内容: {}", imp.content());\n}',
            },
            {
              type: 'code',
              title: '悬垂引用——生命周期保护你的典型场景',
              description:
                '下面的代码试图返回一个指向局部变量的引用。\n\n点击运行——编译器会报错！因为 `s` 在函数结束后就被释放了，返回它的引用就是"悬垂引用"。\n\n**生命周期系统的存在就是为了在编译期阻止这种情况。**',
              language: 'rust',
              runnable: true,
              code: 'fn dangling() -> &str {\n    let s = String::from("hello");\n    &s  // s 在函数结束后就没了，引用指向的数据已经不存在！\n}\n\nfn main() {\n    let r = dangling();\n    println!("{}", r);\n}',
            },
            {
              type: 'explain',
              title: '\'static——活到程序结束的引用',
              content:
                '有一种特殊的生命周期叫 `\'static`，表示**引用在整个程序运行期间都有效**。\n\n最常见的 `\'static` 引用是**字符串字面量**：\n\n```rust\nlet s: &\'static str = "我永远有效";\n```\n\n因为字符串字面量被直接编译到程序的二进制文件里，所以它们的生命周期和程序一样长。\n\n**什么时候会遇到 `\'static`？**\n\n- 错误信息里编译器建议你加 `\'static`——**先别加！** 大多数时候这是错误的解法\n- `\'static` 是"最长"的生命周期，通常意味着数据在全局范围\n- 在 `tokio::spawn` 等异步场景中常见 `\'static` 约束——通常通过 `.clone()` 或 `Arc` 解决',
            },
            {
              type: 'explain',
              title: '什么时候才需要手写生命周期？',
              content:
                '**好消息：90% 的情况你不需要手写生命周期注解。**\n\n编译器的省略规则能自动处理大部分情况。你需要手写的场景：\n\n**需要手写 ✍️**\n\n- 函数返回引用，且有多个引用参数（编译器不知道返回值跟哪个参数绑定）\n- 结构体包含引用字段（必须标注 `struct Foo<\'a> { bar: &\'a str }`）\n- 实现 Trait 时涉及引用的关联类型\n\n**不需要手写 ✅**\n\n- 函数只有一个引用参数（省略规则 2 自动推断）\n- `impl` 块中的方法有 `&self`（省略规则 3 自动推断）\n- 不返回引用的函数（没有输出引用就不需要标注）\n\n**实际开发中的经验法则**：先不写，等编译器报错了再加。编译器的错误信息会告诉你在哪里加、怎么加。',
            },
            {
              type: 'quiz',
              question: '关于生命周期，下面说法正确的是？',
              options: [
                '生命周期注解会延长引用的实际存活时间',
                '所有函数都必须手动写生命周期注解',
                '生命周期注解只是告诉编译器引用之间的关系，不改变实际生命周期',
                '结构体不能包含引用类型的字段',
              ],
              correctIndex: 2,
              explanation:
                '生命周期注解是给编译器看的"说明书"，说明引用之间的依赖关系。它不改变任何引用的实际存活时间，也不影响运行时行为。编译器的省略规则能处理大多数情况，只有返回引用时来源不明才需要手动标注。结构体也可以有引用字段，但需要标注生命周期。',
            },
            {
              type: 'ai-prompt',
              title: '让 AI 帮你理解生命周期',
              scenario: '生命周期是 Rust 最难理解的概念之一。让 AI 帮你通过例子加深理解。',
              prompt: '给我解释 Rust 生命周期的 3 个常见使用场景，每个场景包括：\n1. 一段会报"生命周期"相关编译错误的代码\n2. 加上正确生命周期注解后能编译的版本\n3. 用一句话解释这个注解的含义\n场景选择：函数返回两个参数之一的引用、结构体包含引用字段、多个引用参数但只有一个影响返回值。\n用中文解释，代码简洁。',
              explanation: '通过"错误 → 修正"的对比，比直接看正确代码更能理解为什么需要生命周期。三个场景覆盖了实际开发中最常遇到的情况。',
            },
          ],
        },
      ],
    },

    // =============================================
    // 第十章：项目组织与最佳实践
    // =============================================
    {
      id: 'ch10-project',
      title: '第十章：项目组织与最佳实践',
      lessons: [
        // --- 10.1 模块系统 ---
        {
          id: 'modules',
          title: '模块系统',
          cards: [
            {
              type: 'explain',
              title: '为什么需要模块？',
              content:
                '当你的程序越来越大，把所有代码放在一个文件里会变得很难维护。\n\n**模块（Module）**让你把代码分组：相关的函数、结构体、常量放在一个模块里，各司其职。\n\n三个关键字：\n- **`mod`**：定义一个模块\n- **`pub`**：让模块内的内容对外可见（默认是私有的）\n- **`use`**：引入模块路径，避免每次都写完整路径',
              analogy:
                '把模块想象成**公司的部门划分**：财务部（`mod finance`）、技术部（`mod tech`）、人事部（`mod hr`）。部门内部的事务默认外部不可见（私有），只有标注 `pub` 的岗位才对外开放。`use` 就是把常用联系人存到通讯录，不用每次都拨完整号码。',
            },
            {
              type: 'code',
              title: '定义和使用模块',
              description:
                '在同一个文件中用 `mod {}` 定义模块，用 `pub` 公开内容，用 `use` 引入路径。\n\n这是最简单的模块示例，实际项目中每个模块通常是一个独立文件。',
              language: 'rust',
              runnable: true,
              code: '// 定义一个数学工具模块\nmod math {\n    // pub 让外部可以访问\n    pub fn add(a: i32, b: i32) -> i32 {\n        a + b\n    }\n\n    pub fn multiply(a: i32, b: i32) -> i32 {\n        a * b\n    }\n\n    // 没有 pub 的是私有的，外部无法访问\n    fn internal_helper() -> &\'static str {\n        "只有模块内部能用我"\n    }\n\n    pub struct Circle {\n        pub radius: f64,  // 字段也需要 pub\n    }\n\n    impl Circle {\n        pub fn area(&self) -> f64 {\n            std::f64::consts::PI * self.radius * self.radius\n        }\n    }\n}\n\n// use 把路径引入作用域，避免重复写 math::\nuse math::Circle;\n\nfn main() {\n    // 用完整路径调用\n    println!("3 + 4 = {}", math::add(3, 4));\n    println!("3 × 4 = {}", math::multiply(3, 4));\n\n    // 用 use 引入后直接用名字\n    let c = Circle { radius: 5.0 };\n    println!("圆面积: {:.2}", c.area());\n}',
            },
            {
              type: 'explain',
              title: '文件结构约定',
              content:
                '实际项目中，模块通常对应独立文件：\n\n```\nsrc/\n├── main.rs        ← 程序入口，mod math; 声明模块\n├── math.rs        ← math 模块的内容\n└── utils/\n    ├── mod.rs     ← utils 模块的入口（旧式写法）\n    └── helpers.rs ← utils::helpers 子模块\n```\n\n或者更现代的写法（Rust 2018+）：\n```\nsrc/\n├── main.rs\n├── math.rs\n└── utils.rs        ← utils 模块\n```\n\n在 `main.rs` 中写 `mod math;`，Rust 会自动去找 `math.rs` 文件。\n\n**`pub use`**：重新导出，让外部可以用更短的路径访问内部模块的内容。',
            },
            {
              type: 'code',
              title: '嵌套模块和路径',
              description:
                '用嵌套模块组织更复杂的代码结构。\n\n`super::` 指向父模块，`crate::` 指向整个 crate 的根。',
              language: 'rust',
              runnable: true,
              code: 'mod company {\n    pub mod engineering {\n        pub fn code_review() {\n            println!("工程部做代码审查");\n        }\n\n        pub mod backend {\n            pub fn deploy() {\n                // super:: 访问父模块（engineering）\n                super::code_review();\n                println!("后端部署完成");\n            }\n        }\n    }\n\n    pub mod hr {\n        pub fn hire(name: &str) {\n            println!("HR 欢迎 {} 加入", name);\n        }\n    }\n}\n\n// 用 use 简化路径\nuse company::engineering::backend;\nuse company::hr;\n\nfn main() {\n    backend::deploy();\n    hr::hire("Alice");\n\n    // 也可以用完整路径\n    company::engineering::code_review();\n}',
            },
            {
              type: 'quiz',
              question: '在 Rust 模块系统中，模块内的内容默认是？',
              options: [
                '公开的（pub），外部可直接访问',
                '私有的，只有加 `pub` 才能被外部访问',
                '只有函数是私有的，结构体是公开的',
                '由父模块决定',
              ],
              correctIndex: 1,
              explanation:
                'Rust 中模块内的所有内容（函数、结构体、枚举、字段等）默认都是**私有的**，只有加上 `pub` 关键字才能被外部访问。这是"最小权限原则"的体现——默认隐藏实现细节，只暴露需要对外的接口。',
            },
            {
              type: 'ai-prompt',
              title: '让 AI 帮你设计模块结构',
              scenario: '你学会了 mod、pub、use 和文件结构约定。让 AI 帮你设计一个真实项目的模块结构。',
              prompt: '帮我设计一个 Rust 命令行 TODO 应用的模块结构，要求：\n1. 列出推荐的文件结构（src/ 目录下有哪些文件）\n2. 每个模块负责什么功能（例如 models 模块存储数据结构，storage 模块负责文件读写）\n3. 写出 main.rs 的骨架代码（mod 声明、use 引入、main 函数的大致结构）\n4. 写出一个模块（比如 models.rs）的完整代码示例\n5. 解释 pub use 的用法，并在哪里用它最合适\n用中文解释，代码加注释。',
              explanation: '通过设计真实项目的模块结构，比看理论更能理解模块系统的用途。TODO 应用足够简单又有代表性。',
            },
          ],
        },

        // --- 10.2 Cargo 进阶 ---
        {
          id: 'cargo-advanced',
          title: 'Cargo 进阶',
          cards: [
            {
              type: 'explain',
              title: 'Cargo.toml 依赖管理',
              content:
                'Cargo 是 Rust 的包管理和构建工具。`Cargo.toml` 是项目的"配置中心"。\n\n**添加依赖**：\n```toml\n[dependencies]\nserde = { version = "1", features = ["derive"] }\ntokio = { version = "1", features = ["full"] }\nrand = "0.8"\n```\n\n运行 `cargo add serde` 可以自动添加最新版本（需要 cargo-edit 或 Rust 1.62+）。\n\n**版本语义**：\n- `"1"` 或 `"1.0"` 等价于 `"^1.0.0"`，允许兼容更新（1.x.x）\n- `"=1.2.3"` 固定精确版本\n- `">=1, <2"` 版本范围\n\n运行 `cargo update` 更新到允许范围内的最新版。',
            },
            {
              type: 'explain',
              title: 'Features 条件编译',
              content:
                '**Features** 让你选择性地启用依赖的某些功能，或为自己的 crate 定义可选功能。\n\n在 `Cargo.toml` 中定义：\n```toml\n[features]\ndefault = ["json"]       # 默认启用的 features\njson = ["serde/derive"]  # json feature 依赖 serde 的 derive feature\nasync = ["tokio"]        # 可选的异步支持\n```\n\n在代码中使用：\n```rust\n#[cfg(feature = "json")]\nfn serialize() { ... }  // 只有启用 json feature 时才编译\n```\n\n使用时指定 features：\n```bash\ncargo build --features "async"\ncargo build --no-default-features --features "json"\n```',
            },
            {
              type: 'code',
              title: 'cargo doc 和文档注释',
              description:
                'Rust 有内置的文档系统。`///` 注释会被 `cargo doc` 生成为 HTML 文档。\n\n用 `cargo doc --open` 在浏览器中查看你的项目文档。',
              language: 'rust',
              runnable: true,
              code: '/// 计算两个数的和。\n///\n/// # Arguments\n///\n/// * `a` - 第一个加数\n/// * `b` - 第二个加数\n///\n/// # Examples\n///\n/// ```\n/// let result = add(2, 3);\n/// assert_eq!(result, 5);\n/// ```\npub fn add(a: i32, b: i32) -> i32 {\n    a + b\n}\n\n/// 一个简单的计数器结构体。\npub struct Counter {\n    count: u32,\n}\n\nimpl Counter {\n    /// 创建一个新的计数器，初始值为 0。\n    pub fn new() -> Self {\n        Counter { count: 0 }\n    }\n\n    /// 将计数器加一。\n    pub fn increment(&mut self) {\n        self.count += 1;\n    }\n\n    /// 返回当前计数值。\n    pub fn value(&self) -> u32 {\n        self.count\n    }\n}\n\nfn main() {\n    let result = add(10, 20);\n    println!("10 + 20 = {}", result);\n\n    let mut c = Counter::new();\n    c.increment();\n    c.increment();\n    c.increment();\n    println!("计数: {}", c.value());\n}',
            },
            {
              type: 'quiz',
              question: '在 Cargo.toml 中 `serde = "1"` 代表什么版本约束？',
              options: [
                '只接受精确的 1.0.0 版本',
                '接受 1.x.x 的所有兼容版本（^1.0.0）',
                '接受所有版本',
                '接受 >=1.0.0 的所有版本，包括 2.x.x',
              ],
              correctIndex: 1,
              explanation:
                '`"1"` 等价于 `"^1.0.0"`，遵循语义化版本（SemVer）：允许 1.x.x 范围内的任何兼容更新，但不会自动升级到 2.x.x（因为主版本号变化意味着可能有破坏性更改）。`cargo update` 会在这个范围内更新到最新版。',
            },
            {
              type: 'ai-prompt',
              title: '让 AI 帮你配置 Cargo 项目',
              scenario: '你学会了 Cargo.toml 依赖管理、features 和 cargo doc。让 AI 帮你实战。',
              prompt: '帮我写一个 Rust 命令行工具的 Cargo.toml 配置，工具功能是：读取 JSON 文件、解析内容、格式化输出。要求：\n1. 添加 serde（启用 derive feature）和 serde_json 依赖\n2. 定义一个可选 feature "pretty"，启用时使用彩色输出（可以用 colored crate）\n3. 设置合理的 [package] 元信息（name, version, edition, description）\n4. 写出对应的 main.rs 骨架代码，展示如何用 serde 的 #[derive(Deserialize)] 解析 JSON\n5. 解释 use std::fs::read_to_string 和 serde_json::from_str 的用法\n用中文注释。',
              explanation: '真实项目配置比单纯看文档更有收获。JSON 解析是 Rust 初学者最早会遇到的真实需求之一。',
            },
          ],
        },

        // --- 10.3 错误处理最佳实践 ---
        {
          id: 'error-best-practices',
          title: '错误处理最佳实践',
          cards: [
            {
              type: 'explain',
              title: '两个主流错误处理库',
              content:
                '第七章你学了 `Result` 和 `?` 运算符。实际项目中，社区有两个常用库让错误处理更优雅：\n\n**`thiserror`**（适合库作者）\n- 用 `#[derive(Error)]` 宏自动生成 `std::error::Error` 实现\n- 让你定义结构化的自定义错误类型\n- 调用者可以精确匹配不同错误\n\n**`anyhow`**（适合应用开发者）\n- `anyhow::Result<T>` 可以接受任何错误类型\n- 不需要定义自己的错误类型\n- 快速开发应用时非常方便\n\n**选择原则**：写库用 `thiserror`（给调用者结构化信息），写应用用 `anyhow`（快速、简洁）。',
            },
            {
              type: 'explain',
              title: 'thiserror：自定义错误类型',
              content:
                '使用 `thiserror` 定义自定义错误：\n\n```rust\nuse thiserror::Error;\n\n#[derive(Error, Debug)]\npub enum AppError {\n    #[error("文件未找到: {0}")]\n    FileNotFound(String),\n\n    #[error("解析失败: {source}")]\n    ParseError {\n        #[from]\n        source: std::num::ParseIntError,\n    },\n\n    #[error("网络错误: {0}")]\n    NetworkError(String),\n}\n```\n\n`#[error("...")]` 定义错误的显示格式。`#[from]` 让 `?` 自动转换底层错误类型。',
            },
            {
              type: 'code',
              title: '手动实现自定义错误（无需外部库）',
              description:
                '即使不用 `thiserror`，也能实现自定义错误类型。\n\n理解手动实现，有助于理解 `thiserror` 在做什么。',
              language: 'rust',
              runnable: true,
              code: 'use std::fmt;\nuse std::num::ParseIntError;\n\n// 自定义错误枚举\n#[derive(Debug)]\npub enum AppError {\n    ParseFailed(ParseIntError),\n    NegativeNumber(i32),\n    TooBig(i32),\n}\n\n// 实现 Display（错误信息展示给用户）\nimpl fmt::Display for AppError {\n    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {\n        match self {\n            AppError::ParseFailed(e) => write!(f, "解析失败: {}", e),\n            AppError::NegativeNumber(n) => write!(f, "不允许负数: {}", n),\n            AppError::TooBig(n) => write!(f, "数字太大: {} (最大 100)", n),\n        }\n    }\n}\n\n// 实现 From，让 ? 运算符自动转换 ParseIntError\nimpl From<ParseIntError> for AppError {\n    fn from(e: ParseIntError) -> Self {\n        AppError::ParseFailed(e)\n    }\n}\n\nfn parse_positive(s: &str) -> Result<i32, AppError> {\n    let n: i32 = s.parse()?;  // ParseIntError 自动转为 AppError::ParseFailed\n    if n < 0 {\n        return Err(AppError::NegativeNumber(n));\n    }\n    if n > 100 {\n        return Err(AppError::TooBig(n));\n    }\n    Ok(n)\n}\n\nfn main() {\n    let inputs = ["42", "-5", "200", "abc"];\n    for input in inputs {\n        match parse_positive(input) {\n            Ok(n) => println!("OK \'{}\' -> {}", input, n),\n            Err(e) => println!("ERR \'{}\' -> {}", input, e),\n        }\n    }\n}',
            },
            {
              type: 'quiz',
              question: '写一个 Rust 库时，哪种错误处理方式更推荐？',
              options: [
                '用 `anyhow::Result`，因为最简单',
                '用 `unwrap()`，因为性能最好',
                '用 `thiserror` 定义结构化的自定义错误类型',
                '直接用 `Box<dyn std::error::Error>`',
              ],
              correctIndex: 2,
              explanation:
                '库应该用 `thiserror` 定义结构化的自定义错误类型，让调用者能精确匹配和处理不同错误。`anyhow` 适合应用（最终消费错误），而非库（需要向上传递结构化错误）。`unwrap()` 会在错误时 panic，不适合库代码。`Box<dyn Error>` 可以，但不如 `thiserror` 优雅。',
            },
            {
              type: 'ai-prompt',
              title: '让 AI 帮你设计错误处理',
              scenario: '你学会了自定义错误类型、thiserror 和 anyhow 的适用场景。让 AI 帮你设计真实项目的错误处理。',
              prompt: '用 Rust 写一个读取并解析配置文件的函数，演示最佳错误处理实践：\n1. 定义一个 ConfigError 枚举，包含：FileNotFound、ParseError、MissingField(String) 三种错误\n2. 实现 std::fmt::Display 和 From<std::io::Error>（用于 ? 自动转换）\n3. 写 fn load_config(path: &str) -> Result<Config, ConfigError> 函数\n4. Config 是一个简单结构体（比如有 host: String 和 port: u16 字段）\n5. 在 main 中用 match 分别处理不同错误类型，打印友好的错误信息\n不依赖外部库（不用 thiserror/anyhow），用中文注释。',
              explanation: '手动实现错误类型比用 thiserror 更费力，但能让你真正理解 Error trait 的工作原理，也是面试常考点。',
            },
          ],
        },

        // --- 10.4 代码风格 ---
        {
          id: 'code-style',
          title: '代码风格与最佳实践',
          cards: [
            {
              type: 'explain',
              title: 'Clippy：你的静态分析助手',
              content:
                '**Clippy** 是 Rust 官方的 lint 工具，能发现代码中的常见问题、低效写法和潜在 bug。\n\n```bash\ncargo clippy          # 检查当前项目\ncargo clippy --fix    # 自动修复能修复的问题\n```\n\nClipy 的提示示例：\n- 用 `if let Some(x) = ...` 代替 `match ... { Some(x) => ..., None => {} }`\n- 用 `vec.is_empty()` 代替 `vec.len() == 0`\n- 用 `format!("{x}")` 代替 `format!("{}", x)`（Rust 1.58+）\n- 指出可以简化的 `clone()`、不必要的 `collect()` 等\n\n建议：把 clippy 加入 CI 流程，保持代码质量。',
            },
            {
              type: 'explain',
              title: 'rustfmt：自动格式化',
              content:
                '**rustfmt** 自动格式化 Rust 代码，确保整个项目风格一致。\n\n```bash\ncargo fmt          # 格式化整个项目\ncargo fmt --check  # 只检查，不修改（CI 用）\n```\n\n格式化规则包括：\n- 缩进：4 个空格\n- 行宽：默认 100 字符\n- 大括号位置、逗号换行等\n\n通过 `rustfmt.toml` 可以自定义规则：\n```toml\nmax_width = 100\ntab_spaces = 4\n```\n\n**最佳实践**：配置编辑器在保存时自动运行 rustfmt。',
            },
            {
              type: 'explain',
              title: '命名规范',
              content:
                'Rust 有严格的命名约定（clippy 会检查违规）：\n\n- 变量、函数：`snake_case`，如 `user_name`、`get_count`\n- 结构体、枚举、Trait：`CamelCase`，如 `UserProfile`、`HttpError`\n- 常量、静态变量：`SCREAMING_SNAKE_CASE`，如 `MAX_SIZE`、`PI`\n- 模块：`snake_case`，如 `mod user_auth`\n- 生命周期：短小写，如 `\'a`、`\'db`\n\n这些规范是 Rust 社区共识，遵守它们让代码更易读。',
            },
            {
              type: 'code',
              title: 'Builder 模式',
              description:
                'Builder 模式用于构建有多个可选配置的复杂对象，避免构造函数参数过多。\n\n每个 setter 返回 `self`（链式调用），最后调用 `.build()` 生成目标对象。',
              language: 'rust',
              runnable: true,
              code: '#[derive(Debug)]\npub struct Request {\n    url: String,\n    method: String,\n    timeout_secs: u32,\n    retry_count: u32,\n}\n\n// Builder 结构体\npub struct RequestBuilder {\n    url: String,\n    method: String,\n    timeout_secs: u32,\n    retry_count: u32,\n}\n\nimpl RequestBuilder {\n    pub fn new(url: &str) -> Self {\n        RequestBuilder {\n            url: url.to_string(),\n            method: String::from("GET"),\n            timeout_secs: 30,\n            retry_count: 3,\n        }\n    }\n\n    // 每个方法返回 Self，支持链式调用\n    pub fn method(mut self, method: &str) -> Self {\n        self.method = method.to_string();\n        self\n    }\n\n    pub fn timeout(mut self, secs: u32) -> Self {\n        self.timeout_secs = secs;\n        self\n    }\n\n    pub fn retry(mut self, count: u32) -> Self {\n        self.retry_count = count;\n        self\n    }\n\n    pub fn build(self) -> Request {\n        Request {\n            url: self.url,\n            method: self.method,\n            timeout_secs: self.timeout_secs,\n            retry_count: self.retry_count,\n        }\n    }\n}\n\nfn main() {\n    // 链式调用，只配置需要的选项\n    let req = RequestBuilder::new("https://api.example.com/data")\n        .method("POST")\n        .timeout(60)\n        .retry(5)\n        .build();\n\n    println!("{:#?}", req);\n}',
            },
            {
              type: 'code',
              title: 'Newtype 模式',
              description:
                '**Newtype** 用单字段的元组结构体包装现有类型，增加类型安全性。\n\n避免把"用户 ID"和"订单 ID"混淆——虽然都是 `u64`，但语义不同。',
              language: 'rust',
              runnable: true,
              code: '// Newtype：包装 u64，但类型上是独立的\n#[derive(Debug, Clone, Copy, PartialEq)]\nstruct UserId(u64);\n\n#[derive(Debug, Clone, Copy, PartialEq)]\nstruct OrderId(u64);\n\nfn get_user_orders(user_id: UserId) -> Vec<OrderId> {\n    println!("查询用户 {:?} 的订单", user_id);\n    vec![OrderId(1001), OrderId(1002)]\n}\n\nfn main() {\n    let uid = UserId(42);\n    let oid = OrderId(42);\n\n    // 虽然内部值相同，但类型不同\n    println!("uid: {:?}", uid);\n    println!("oid: {:?}", oid);\n\n    // 类型安全：不会意外把 OrderId 传给需要 UserId 的函数\n    let orders = get_user_orders(uid);\n    println!("订单: {:?}", orders);\n\n    // 访问内部值：.0\n    println!("用户 ID 的数字值: {}", uid.0);\n}',
            },
            {
              type: 'quiz',
              question: '在 Rust 中，结构体名应该用哪种命名风格？',
              options: [
                '`snake_case`（如 `user_profile`）',
                '`SCREAMING_SNAKE_CASE`（如 `USER_PROFILE`）',
                '`CamelCase`（如 `UserProfile`）',
                '`kebab-case`（如 `user-profile`）',
              ],
              correctIndex: 2,
              explanation:
                'Rust 的命名规范：结构体、枚举、Trait 用 `CamelCase`（大驼峰）；函数、变量、模块用 `snake_case`（下划线小写）；常量用 `SCREAMING_SNAKE_CASE`（全大写+下划线）。这是社区约定，Clippy 会对违规发出警告。',
            },
            {
              type: 'ai-prompt',
              title: '让 AI 帮你做代码审查',
              scenario: '你学完了 Clippy、rustfmt、命名规范和设计模式。让 AI 帮你综合运用这些知识。',
              prompt: '帮我审查并改进下面这段 Rust 代码，指出所有违反命名规范、可以被 Clippy 改进的地方，并给出改进后的版本：\n\n```rust\nstruct user_data {\n    UserName: String,\n    user_age: u32,\n    IsActive: bool,\n}\n\nfn GetUserInfo(u: &user_data) -> String {\n    let mut result = String::new();\n    result = result + &u.UserName;\n    result = result + " ";\n    result = result + &u.user_age.to_string();\n    if u.IsActive == true {\n        result = result + " (活跃)";\n    }\n    return result;\n}\n\nfn main() {\n    let user = user_data { UserName: String::from("Alice"), user_age: 25, IsActive: true };\n    println!("{}", GetUserInfo(&user));\n}\n```\n\n请分点列出每个问题，解释为什么不好，给出修改后的完整代码，加中文注释。',
              explanation: '代码审查比看规范更直观。通过分析"坏代码"，你能更深刻地记住正确写法。这道题综合了命名规范、Clippy 提示（避免显式 return、简化布尔比较、优化字符串拼接等）。',
            },
          ],
        },

        // --- 10.3 常用 crate 速览 ---
        {
          id: 'common-crates',
          title: '常用 crate 速览',
          cards: [
            {
              type: 'explain',
              title: 'Rust 生态：标准库精简，crate 补充',
              content:
                'Rust 的标准库故意保持精简——只包含最基础的功能（集合、IO、线程等）。\n\n更多功能靠社区维护的 **crate**（第三方库）补充，通过 **crates.io**（Rust 的包注册中心）分发。\n\n这种设计的好处：标准库可以保持稳定，而社区 crate 可以快速迭代。\n\n坏处：新手经常不知道该用哪个 crate。接下来我们介绍最常用的那些。',
            },
            {
              type: 'explain',
              title: '核心 crate 清单',
              content:
                '以下是 Rust 生态中最核心的 crate：\n\n- **serde** + **serde_json** — 序列化/反序列化（JSON, TOML, YAML...），用 `#[derive(Serialize, Deserialize)]` 一行搞定\n- **tokio** — 异步运行时（写网络服务必备），提供异步 IO、定时器、任务调度\n- **clap** — CLI 参数解析（derive 模式超好用），`#[derive(Parser)]` 自动生成帮助信息\n- **reqwest** — HTTP 客户端（同步/异步都支持），搭配 tokio 使用\n- **tracing** — 结构化日志（替代 `log` + `env_logger`），支持 span、事件、层级\n- **anyhow** — 应用级错误处理（快速原型），`anyhow::Result` 接受任何错误类型\n- **thiserror** — 库级错误处理（精确错误类型），用 derive 宏定义错误枚举',
            },
            {
              type: 'explain',
              title: '如何选 crate？',
              content:
                '面对多个同类 crate 时，可以参考这些指标：\n\n1. **crates.io 下载量** — 下载量大说明经过了广泛的实战检验\n2. **GitHub star 数和最近更新时间** — 活跃维护比 star 数更重要\n3. **lib.rs 评分** — [lib.rs](https://lib.rs) 提供综合评分和分类\n4. **文档质量** — 好的 crate 通常有详细的 docs.rs 文档和示例\n\n**强烈推荐**：[blessed.rs](https://blessed.rs) 维护了一份"Rust 非官方推荐 crate 清单"，按用途分类（网络、数据库、序列化、加密等），是新手选 crate 的最佳起点。',
            },
            {
              type: 'ai-prompt',
              title: '让 AI 帮你选技术栈',
              scenario: '你要用 Rust 写一个项目，但不确定该用哪些 crate。让 AI 帮你推荐。',
              prompt: '我要用 Rust 写一个 HTTP API 服务，帮我推荐技术栈，每个类别推荐 1-2 个 crate，说明选择理由：\n1. Web 框架（路由、中间件）\n2. 数据库（ORM 或查询构建器）\n3. 序列化（JSON 请求/响应）\n4. 错误处理\n5. 日志/追踪\n6. 配置管理（环境变量、配置文件）\n\n要求：推荐的 crate 必须在 crates.io 上真实存在，给出 crate 名称和版本号。',
              explanation: '用 AI 做技术选型调研可以快速了解生态，但要注意验证 crate 是否真实存在（AI 可能产生幻觉）。拿到推荐后去 crates.io 和 lib.rs 确认。',
            },
            {
              type: 'quiz',
              question: 'serde 的作用是什么？',
              options: [
                '异步运行时，用于网络编程',
                '序列化和反序列化（将数据结构转为 JSON/TOML 等格式，或反过来）',
                'HTTP 客户端，用于发送网络请求',
                'CLI 参数解析，用于命令行工具',
              ],
              correctIndex: 1,
              explanation:
                'serde（SERialize + DEserialize 的缩写）是 Rust 最核心的序列化框架。它本身是格式无关的，搭配 serde_json（JSON）、serde_yaml（YAML）、toml（TOML）等 crate 使用。用 `#[derive(Serialize, Deserialize)]` 就能让你的结构体自动支持各种格式的转换。',
            },
          ],
        },
      ],
    },

    // =============================================
    // 第十一章：AI 辅助 Rust 开发——从学习到生产
    // =============================================
    {
      id: 'ch11-ai-rust',
      title: '第十一章：AI 辅助 Rust 开发——从学习到生产',
      lessons: [
        // --- 11.1 规格先行 ---
        {
          id: 'spec-first',
          title: '规格先行——先写说明书再写代码',
          cards: [
            {
              type: 'explain',
              title: '为什么要规格先行？',
              content:
                '直接让 AI 写代码，往往得到一个"能跑"但不符合你真实需求的程序。\n\nThoughtworks、GitHub、Red Hat 的研究都指向同一个结论：**规格先行（Spec-First Prompting）是 AI 生产代码的第一实践**。\n\n规格先行的意思是：**先写清楚你要什么，再让 AI 写代码**。\n\n就像建房子要先画图纸——图纸越详细，施工队交付的结果越接近你的期望。',
            },
            {
              type: 'explain',
              title: '坏提示 vs 好提示',
              content:
                '**坏提示（模糊）：**\n\n> 写个用户认证\n\nAI 会猜测你的意思，可能生成不安全的代码、不匹配你的框架、缺少错误处理。\n\n**好提示（有规格）：**\n\n> 用 Rust 写一个 `authenticate` 函数：\n> - 输入：`&str` 类型的 username 和 password\n> - 返回：`Result<UserId, AuthError>`\n> - 错误类型：`AuthError::UserNotFound`、`AuthError::WrongPassword`\n> - 不使用 `unwrap()`，用 `thiserror` 定义错误\n> - 包含一个单元测试，测试正确密码返回 Ok，错误密码返回 Err\n\n**同样的时间，好提示节省了你 80% 的返工。**',
            },
            {
              type: 'explain',
              title: '规格的"复杂度预算"',
              content:
                '不同规模的任务，需要不同详细程度的规格：\n\n- **简单函数**：100–200 词。输入/输出类型、错误处理方式、1–2 个测试用例就够了\n- **模块**：500–800 词。数据结构、公共接口、并发/错误策略、与其他模块的边界\n- **子系统**：1000–2000 词。架构决策、性能目标、安全要求、集成点\n\n**原则**：规格要够用，不要为了详细而详细。太长的提示也会让 AI 遗漏细节。',
            },
            {
              type: 'code',
              title: '一个规格驱动的 Rust 函数',
              description:
                '下面是一个符合规格的 Rust 函数示例——类型安全、错误处理完整、可测试。\n\n对比一下：如果用模糊提示，AI 大概率会用 `unwrap()` 和字符串错误。',
              language: 'rust',
              runnable: true,
              code: 'use std::collections::HashMap;\n\n#[derive(Debug, PartialEq)]\npub struct UserId(u64);\n\n#[derive(Debug, PartialEq)]\npub enum AuthError {\n    UserNotFound,\n    WrongPassword,\n}\n\nimpl std::fmt::Display for AuthError {\n    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {\n        match self {\n            AuthError::UserNotFound => write!(f, "用户不存在"),\n            AuthError::WrongPassword => write!(f, "密码错误"),\n        }\n    }\n}\n\n// 规格：输入 username + password，返回 Result<UserId, AuthError>\npub fn authenticate(\n    db: &HashMap<&str, (&str, u64)>,\n    username: &str,\n    password: &str,\n) -> Result<UserId, AuthError> {\n    let (stored_pw, uid) = db\n        .get(username)\n        .ok_or(AuthError::UserNotFound)?;\n\n    if *stored_pw != password {\n        return Err(AuthError::WrongPassword);\n    }\n    Ok(UserId(*uid))\n}\n\nfn main() {\n    let mut db = HashMap::new();\n    db.insert("alice", ("secret123", 1));\n    db.insert("bob", ("pass456", 2));\n\n    println!("{:?}", authenticate(&db, "alice", "secret123"));\n    println!("{:?}", authenticate(&db, "alice", "wrong"));\n    println!("{:?}", authenticate(&db, "nobody", "any"));\n}',
            },
            {
              type: 'ai-prompt',
              title: 'AI 提示模板：规格先行写 Rust 函数',
              scenario: '你要实现一个新功能。在直接让 AI 写代码之前，先用这个模板写清楚规格。',
              prompt: '用 Rust 写一个函数，满足以下规格：\n\n**函数签名**：`fn [函数名]([参数及类型]) -> [返回类型]`\n\n**功能描述**：[用一两句话描述这个函数做什么]\n\n**输入约束**：[描述输入的合法范围、边界条件]\n\n**输出/错误**：\n- 成功时返回 [描述]\n- 失败时返回 Err([错误类型及变体])\n\n**不允许**：`unwrap()`、`clone()`（非必要）、`unsafe`\n\n**错误处理**：用 `thiserror` / 手动实现 `std::error::Error`\n\n**测试要求**：\n- 测试正常路径\n- 测试边界/错误路径\n\n**示例**：\n- 输入 X → 输出 Y\n- 输入 A → 返回 Err(Z)',
              explanation: '这个模板涵盖了 AI 最容易出错的地方：类型签名、错误类型定义、禁止 unwrap、测试覆盖。填完模板再发给 AI，返工率可以降低 70% 以上。',
            },
          ],
        },

        // --- 11.2 TDD + AI ---
        {
          id: 'tdd-with-ai',
          title: 'TDD + AI——测试先行，让 AI 实现',
          cards: [
            {
              type: 'explain',
              title: '为什么 TDD 是 AI 代码的最高杠杆？',
              content:
                'Google DORA 研究（2023）指出：**TDD（测试驱动开发）是提升 AI 代码可靠性的"单一最高杠杆技术"**。\n\n原因很简单：AI 不理解你的业务逻辑，但它能让测试通过。\n\n如果你先写测试，等于给 AI 一个**可验证的目标**——不是"你觉得对不对"，而是"测试绿了没有"。\n\n没有测试的 AI 代码就像没有质检的流水线，问题会一直累积到最糟糕的时刻才爆发。',
            },
            {
              type: 'explain',
              title: 'AI-TDD 工作流（5 步）',
              content:
                '**步骤 1**：写测试函数签名（只写 `#[test]` 和函数名，不写内容）\n\n**步骤 2**：自己写一个"种子测试"（最简单的正常路径）\n\n**步骤 3**：让 AI 补全剩余测试（边界、错误路径、并发）——审查！\n\n**步骤 4**：测试通过审查后，让 AI 实现函数\n\n**步骤 5**：运行 `cargo test`，如果失败，让 AI 修复**实现**，不是测试\n\n**关键**：步骤 3 你必须亲自审查，步骤 5 明确禁止 AI 修改测试。',
            },
            {
              type: 'explain',
              title: '最危险的失败模式',
              content:
                '**警告：这是 AI 辅助开发最常见的陷阱。**\n\n当你说"测试失败了，帮我修"，AI 有时会选择**修改测试来让它通过**，而不是修复实现。\n\n这会让你的测试套件变成一堆"永远是绿色"但毫无价值的代码。\n\n**防御措施**：\n- 明确在提示词中写："只能修改实现文件，不允许修改测试文件"\n- 对每一次 AI 建议的测试改动，都要问自己：这个改动是在放宽测试要求吗？\n- 把测试和实现文件分开，每次只给 AI 看相关的文件',
            },
            {
              type: 'code',
              title: 'TDD 示例：先测试，再实现',
              description:
                '先写测试（描述你期望的行为），再让 AI 实现函数。\n\n注意：测试是规格的另一种表达——比文字更精确。',
              language: 'rust',
              runnable: true,
              code: '// 先写测试（这就是你的规格）\n#[cfg(test)]\nmod tests {\n    use super::*;\n\n    #[test]\n    fn test_divide_normal() {\n        assert_eq!(divide(10.0, 2.0), Ok(5.0));\n    }\n\n    #[test]\n    fn test_divide_by_zero() {\n        assert_eq!(divide(1.0, 0.0), Err(DivideError::DivisionByZero));\n    }\n\n    #[test]\n    fn test_divide_negative() {\n        assert_eq!(divide(-6.0, 2.0), Ok(-3.0));\n    }\n}\n\n// 然后让 AI 实现（AI 看着测试写）\n#[derive(Debug, PartialEq)]\npub enum DivideError {\n    DivisionByZero,\n}\n\npub fn divide(a: f64, b: f64) -> Result<f64, DivideError> {\n    if b == 0.0 {\n        return Err(DivideError::DivisionByZero);\n    }\n    Ok(a / b)\n}\n\nfn main() {\n    println!("{:?}", divide(10.0, 2.0));\n    println!("{:?}", divide(1.0, 0.0));\n}',
            },
            {
              type: 'ai-prompt',
              title: 'AI 提示模板：TDD——测试先行',
              scenario: '你已经写好了测试，现在让 AI 实现函数。提示词要明确约束。',
              prompt: '下面是我写好的测试，请根据测试实现函数：\n\n```rust\n[粘贴你的测试代码]\n```\n\n要求：\n1. 只实现函数，**不允许修改测试代码**\n2. 不使用 `unwrap()`，用 `Result` + `?` 处理错误\n3. 如果需要自定义错误类型，用 `#[derive(Debug, PartialEq)]` 枚举\n4. 实现完成后说明：所有测试应该通过还是部分通过？如果有测试无法通过，解释原因\n\n运行 `cargo test` 后如果有失败，只能修改实现，不能修改测试。',
              explanation: '最后一句"只能修改实现，不能修改测试"至关重要。明确写出这个约束，可以防止 AI 走捷径绕过你的测试。',
            },
          ],
        },

        // --- 11.3 让 AI 写地道的 Rust ---
        {
          id: 'idiomatic-rust-prompts',
          title: '让 AI 写地道的 Rust',
          cards: [
            {
              type: 'explain',
              title: 'AI 写 Rust 的常见坏习惯',
              content:
                'AI 在写 Rust 时有几个高频错误，你需要在提示词中主动防御：\n\n- **过度 `.clone()`**：遇到借用问题就 clone，导致无谓的内存拷贝\n- **`.unwrap()` 到处飞**：让代码在错误时直接 panic，不适合生产环境\n- **错误的生命周期标注**：有时会猜错，或在不需要的地方加生命周期\n- **幻觉 crate**：AI 会发明根本不存在的包名，比如 `rust-http-client`\n- **Java 风格结构**：getter/setter 方法泛滥，而不是用 Rust 的 `pub` 字段或 Builder\n\n知道这些坏习惯，就能在提示词里主动封堵。',
            },
            {
              type: 'explain',
              title: '"禁止清单"技术',
              content:
                '在提示词末尾加一段"禁止清单"，能显著提升代码质量：\n\n```\n约束（必须遵守）：\n- 禁止使用 .unwrap() 和 .expect()（除非在测试中）\n- 禁止不必要的 .clone()——优先借用\n- 禁止 unsafe 块（除非任务本身需要）\n- 所有公共函数必须有 doc 注释（/// 开头）\n- 错误类型用枚举，实现 std::error::Error\n- 派生：#[derive(Debug)] 对所有公共类型\n```\n\n这段规则加在任何 Rust 提示词后面都有效，可以直接保存复用。',
            },
            {
              type: 'explain',
              title: '提示 AI 写正确的错误处理',
              content:
                '**不好的提示**：写一个解析函数\n\n**好的提示**：\n\n> 用 `thiserror` 定义 `ParseError` 枚举，包含 `EmptyInput` 和 `InvalidFormat(String)` 两个变体。函数返回 `Result<ParsedData, ParseError>`，用 `?` 传播错误，不使用 unwrap。\n\n**关于 crate 的提示**：\n\n> 只使用以下 crate：`serde`、`anyhow`、`thiserror`、`tokio`（标准库 std 之外）。如果需要其他 crate，先列出名字，**不要直接写代码**，等我确认 crate 存在。\n\n这个"先列名字"技巧是防止幻觉 crate 的有效手段。',
            },
            {
              type: 'code',
              title: '地道 Rust vs 非地道 Rust',
              description:
                '同样的功能，地道写法和非地道写法差距很大。\n\n看看两种风格的对比，理解 Rust 的惯用模式。',
              language: 'rust',
              runnable: true,
              code: '// ❌ 非地道：unwrap + clone + 手动 getter\n#[allow(dead_code)]\nmod bad_style {\n    pub struct User {\n        name: String,\n        age: u32,\n    }\n    impl User {\n        pub fn get_name(&self) -> String {\n            self.name.clone()  // 不必要的 clone\n        }\n        pub fn get_age(&self) -> u32 {\n            self.age\n        }\n    }\n    pub fn find_user(users: &[User], name: &str) -> User {\n        users.iter()\n            .find(|u| u.name == name)\n            .unwrap()  // panic 风险！\n            .clone()   // 又一个 clone\n    }\n}\n\n// ✅ 地道：借用 + Result + 公共字段\n#[derive(Debug)]\npub struct User {\n    pub name: String,\n    pub age: u32,\n}\n\n#[derive(Debug)]\npub enum UserError {\n    NotFound(String),\n}\n\n// 返回借用，避免 clone\npub fn find_user<\'a>(users: &\'a [User], name: &str) -> Result<&\'a User, UserError> {\n    users.iter()\n        .find(|u| u.name == name)\n        .ok_or_else(|| UserError::NotFound(name.to_string()))\n}\n\nfn main() {\n    let users = vec![\n        User { name: "Alice".to_string(), age: 30 },\n        User { name: "Bob".to_string(), age: 25 },\n    ];\n\n    match find_user(&users, "Alice") {\n        Ok(u) => println!("找到: {} ({}岁)", u.name, u.age),\n        Err(UserError::NotFound(n)) => println!("未找到用户: {}", n),\n    }\n}',
            },
            {
              type: 'ai-prompt',
              title: 'AI 提示模板：生产级 Rust 函数',
              scenario: '这是一个综合了所有约束的生产级 Rust 提示模板，可以直接复用。',
              prompt: '用 Rust 实现以下功能：[描述功能]\n\n**类型规格**：\n- 输入：[参数名: 类型]\n- 输出：Result<[成功类型], [错误类型]>\n\n**错误类型**（用 thiserror 或手动实现）：\n- [ErrorVariant1]：[触发条件]\n- [ErrorVariant2]：[触发条件]\n\n**约束（必须遵守）**：\n- 禁止 `.unwrap()` 和 `.expect()`\n- 禁止不必要的 `.clone()`（优先借用 `&T`）\n- 禁止 `unsafe`\n- 所有 pub 类型加 `#[derive(Debug)]`\n- 公共函数加 `///` doc 注释\n- 只使用这些外部 crate：[列出允许的 crate]\n\n**测试**：包含至少一个正常路径测试和一个错误路径测试\n\n用中文注释关键逻辑。',
              explanation: '这个模板把"规格先行"和"禁止清单"合二为一。复制到你的编辑器，每次填空即用。避免了 AI 最常见的 5 个 Rust 错误。',
            },
          ],
        },

        // --- 11.4 AI 代码审查与重构 ---
        {
          id: 'code-review-refactor',
          title: 'AI 代码审查与重构',
          cards: [
            {
              type: 'explain',
              title: '让 AI 审查你的代码',
              content:
                'AI 是一个永远有时间、永远不嫌烦的代码审查员。\n\n你可以让它从多个维度审查你的 Rust 代码：\n\n- **内存安全**：有没有潜在的悬空引用、数据竞争风险？\n- **并发**：共享状态是否正确保护（Arc/Mutex）？\n- **错误处理**：有没有被忽略的错误（`let _ = ...`）？\n- **惯用性**：有没有更 Rust 的写法？\n- **性能**：有没有不必要的分配、多余的锁？\n\n最有效的方式是**分点要求**，让 AI 对每一类问题单独给出评价和改进建议。',
            },
            {
              type: 'explain',
              title: '重构提示技巧',
              content:
                '好的重构提示要**聚焦**，每次只做一件事：\n\n**提取 Trait**：\n> 把 `process_csv` 和 `process_json` 的公共行为提取成一个 `DataProcessor` trait，让具体类型实现它。\n\n**替换字符串错误**：\n> 把所有 `Err("some string")` 替换成枚举类型 `MyError`，用 thiserror 派生，不改变函数签名。\n\n**消除不必要的 clone**：\n> 审查所有 `.clone()` 调用，能用借用替换的全部替换，解释每处的理由。\n\n**原则**：一次重构一个目标，比"帮我全部优化"的成功率高得多。',
            },
            {
              type: 'explain',
              title: '"橡皮鸭"调试法',
              content:
                '经典的橡皮鸭调试：把 bug 解释给一只橡皮鸭听，说着说着你就自己找到原因了。\n\nAI 是终极版橡皮鸭——它不只是听，还会回答。\n\n**使用方法**：\n\n1. 描述你的预期行为\n2. 粘贴出错的代码\n3. 说明实际发生了什么（报错信息、错误输出）\n4. 要求 AI **逐行追踪执行流程**，找出哪一步偏离了预期\n\n关键是第 4 步：让 AI"逐步追踪"，而不是"猜测可能是..."。追踪比猜测精确得多。',
            },
            {
              type: 'code',
              title: '需要审查的代码示例',
              description:
                '下面的代码有几个可以改进的地方。\n\n试着自己找出问题，然后用 ai-prompt 卡片的模板让 AI 给出正式审查。',
              language: 'rust',
              runnable: true,
              code: 'use std::collections::HashMap;\n\n// 这段代码能运行，但有几处可以改进\nfn word_count(text: &str) -> HashMap<String, u32> {\n    let mut counts = HashMap::new();\n    let words: Vec<String> = text\n        .split_whitespace()\n        .map(|w| w.to_lowercase())\n        .collect();\n\n    for word in words.iter() {\n        let count = counts.get(word.as_str()).unwrap_or(&0);\n        counts.insert(word.clone(), count + 1);\n    }\n    counts\n}\n\nfn most_common(counts: &HashMap<String, u32>) -> String {\n    if counts.is_empty() {\n        return String::from("无");\n    }\n    let mut max_word = "";\n    let mut max_count = 0u32;\n    for (word, count) in counts.iter() {\n        if *count > max_count {\n            max_count = *count;\n            max_word = word;  // 可能有生命周期问题吗？\n        }\n    }\n    max_word.to_string()  // 这里 clone 了\n}\n\nfn main() {\n    let text = "the quick brown fox jumps over the lazy dog the fox";\n    let counts = word_count(text);\n    println!("最高频词: {}", most_common(&counts));\n    println!("\'the\' 出现: {} 次", counts.get("the").unwrap_or(&0));\n}',
            },
            {
              type: 'ai-prompt',
              title: 'AI 提示模板：综合代码审查',
              scenario: '你写完了一段代码，想在合并前让 AI 做一次全面审查。',
              prompt: '请对下面这段 Rust 代码做全面审查，分以下几个维度逐点给出评价：\n\n```rust\n[粘贴你的代码]\n```\n\n**审查维度**：\n1. **内存安全**：有没有潜在的悬空引用或内存问题？\n2. **错误处理**：有没有被吞掉的错误、不必要的 unwrap？\n3. **惯用性**：有没有更 Rust 的写法（Iterator、Option 链式调用等）？\n4. **性能**：有没有不必要的分配或 clone？\n5. **可读性**：命名、注释、结构是否清晰？\n\n对每个维度：先给 1–5 分，再解释原因，再给出具体的改进代码。\n\n最后给出完整的改进版本，加中文注释。',
              explanation: '分维度打分迫使 AI 系统性地思考，而不是只挑最显眼的问题。"给分+解释+代码"三步确保你能理解每个改进的原因。',
            },
          ],
        },

        // --- 11.5 安全陷阱 ---
        {
          id: 'security-pitfalls',
          title: '安全陷阱——AI 代码的风险',
          cards: [
            {
              type: 'explain',
              title: 'AI 代码的安全数据',
              content:
                '在使用 AI 写代码之前，你需要了解这些数据：\n\n- Veracode 2025 研究：**45% 的 AI 生成代码包含安全漏洞**\n- Snyk 研究：AI 辅助开发的代码漏洞率是手写代码的 **2.74 倍**\n- 最常见的漏洞类型：输入验证缺失、注入攻击、不安全的随机数、硬编码凭据\n\nRust 的类型系统能防御内存安全问题，但**业务逻辑漏洞**（权限绕过、注入、时序攻击）不在编译器的防御范围内。\n\n**结论**：AI 是助手，不是安全专家。关键路径（认证、授权、加密）必须人工审查。',
            },
            {
              type: 'explain',
              title: '"氛围编码"vs AI 辅助工程',
              content:
                'Addy Osmani（Google Chrome 工程总监）区分了两种使用 AI 的方式：\n\n**氛围编码（Vibe Coding）**：\n- 描述你想要什么，AI 生成，你接受，循环\n- 不理解代码、不审查、不测试\n- 适合：原型、个人项目、学习探索\n\n**AI 辅助工程（AI-Assisted Engineering）**：\n- AI 是工具，工程师是决策者\n- 理解每一行代码的含义\n- 规格先行、测试先行、代码审查\n- 适合：生产系统、团队项目、安全敏感代码\n\n**在安全路径上，永远不要氛围编码。**',
            },
            {
              type: 'explain',
              title: '幻觉依赖：供应链攻击的新途径',
              content:
                'AI 会发明不存在的包名——这叫"幻觉依赖"（hallucinated dependency）。\n\n攻击者的手法：\n1. 收集 AI 常见幻觉的包名\n2. 在 crates.io 注册同名包，里面是恶意代码\n3. 等待开发者直接 `cargo add` AI 推荐的包\n\n**防御措施**：\n- 每个新 crate 在 `crates.io` 手动验证存在\n- 检查下载量、最后更新时间、仓库链接\n- 运行 `cargo audit` 检查已知漏洞\n- 使用 `cargo deny` 配置允许的 license 和来源\n\n```bash\ncargo install cargo-audit\ncargo audit\n\ncargo install cargo-deny\ncargo deny check\n```',
            },
            {
              type: 'code',
              title: '安全检查工具链',
              description:
                '把这些工具加入 CI，在代码进入主分支前自动检查安全问题。\n\n这是生产级 Rust 项目的最低安全基线。',
              language: 'rust',
              runnable: false,
              code: '// 本地运行安全检查（在项目根目录执行）\n\n// 1. Clippy：静态分析，包含安全相关 lint\n// cargo clippy -- -D warnings\n\n// 2. cargo-audit：检查已知 CVE 漏洞\n// cargo install cargo-audit\n// cargo audit\n\n// 3. cargo-deny：依赖策略（license、来源、ban 特定包）\n// cargo install cargo-deny\n// cargo deny init      # 生成 deny.toml\n// cargo deny check     # 检查策略\n\n// deny.toml 示例配置\n// [advisories]\n// ignore = []  # 不忽略任何已知漏洞\n//\n// [licenses]\n// allow = [\"MIT\", \"Apache-2.0\", \"BSD-3-Clause\"]\n//\n// [bans]\n// multiple-versions = \"warn\"  # 同一 crate 多版本时警告\n\n// 4. 在代码中避免常见安全陷阱\nfn validate_input(input: &str) -> Result<&str, &\'static str> {\n    // 总是验证外部输入\n    if input.is_empty() {\n        return Err("输入不能为空");\n    }\n    if input.len() > 256 {\n        return Err("输入超过最大长度");\n    }\n    // 检查只包含允许的字符\n    if !input.chars().all(|c| c.is_alphanumeric() || c == \'_\' || c == \'-\') {\n        return Err("输入包含非法字符");\n    }\n    Ok(input)\n}\n\nfn main() {\n    println!("{:?}", validate_input("valid-input_123"));\n    println!("{:?}", validate_input(""));\n    println!("{:?}", validate_input("has space!"));\n}',
            },
            {
              type: 'ai-prompt',
              title: 'AI 提示模板：安全审计',
              scenario: '你写了一段处理用户输入或网络请求的代码，上线前想做安全审计。',
              prompt: '请对下面这段 Rust 代码做安全审计：\n\n```rust\n[粘贴你的代码]\n```\n\n**重点检查**：\n1. **输入验证**：所有外部输入是否都经过验证和清理？\n2. **整数溢出**：有没有未受保护的整数运算？（提示：用 checked_add/saturating_add）\n3. **错误信息泄露**：错误信息是否暴露了内部实现细节？\n4. **随机数**：如果用到随机数，是否使用了密码学安全的 RNG（rand::rngs::OsRng）？\n5. **硬编码凭据**：有没有密码、token 硬编码在代码里？\n6. **依赖**：列出所有用到的外部 crate，确认它们在 crates.io 上真实存在\n\n对每个问题：说明风险等级（高/中/低）、攻击场景、修复代码。',
              explanation: '"确认 crate 真实存在"这一条专门防止 AI 在审计自己生成的代码时漏掉幻觉依赖。在安全审计中，让 AI 主动核查它自己引入的 crate 是个好习惯。',
            },
          ],
        },

        // --- 11.6 CLAUDE.md 与 Skills ---
        {
          id: 'claude-md-skills',
          title: 'CLAUDE.md 与 Skills——定制你的 AI 工作流',
          cards: [
            {
              type: 'explain',
              title: '什么是 CLAUDE.md？',
              content:
                '**CLAUDE.md** 是放在项目根目录的 Markdown 文件，AI 助手（Claude Code、Cursor 等）会在每次对话时自动读取它，作为"项目级别的指令"。\n\n你可以在里面定义：\n\n- **构建命令**：`cargo build --features xxx`\n- **代码风格规则**：禁止 unwrap、必须加 doc 注释\n- **架构约定**：模块边界、命名规范\n- **禁止操作**：不能修改哪些文件、不能删除哪些目录\n- **常用命令速查**：测试命令、部署命令\n\n这样你不用每次都在提示词里重复这些规则，AI 会自动遵守。',
            },
            {
              type: 'explain',
              title: 'CLAUDE.md 的"复杂度预算"',
              content:
                'Anthropic 官方指南特别警告：**臃肿的 CLAUDE.md 会被 AI 忽略**。\n\n原因是：规则太多，AI 会把它当噪音，遵守率反而下降。\n\n**最佳实践**：\n- 保持在 100–150 条有效规则以内\n- 每条规则一行，清晰具体\n- 用 `## 标题` 分组，方便 AI 定位相关规则\n- 定期清理过时或重复的规则\n- 对于复杂规则，创建单独的 `SKILL.md` 文件（Skills 机制）\n\n**类似工具**：Cursor IDE 使用 `.cursorrules` 文件，语法类似。社区维护了针对 Rust 的规则模板：`cursor.directory/rules/rust`',
            },
            {
              type: 'explain',
              title: 'Skills：结构化的 AI 工作流',
              content:
                '**Skills** 是一种更高级的 AI 定制机制。\n\n每个 Skill 是一个独立的 `SKILL.md` 文件，定义了一个特定任务的：\n- 触发条件（当用户说什么时激活）\n- 执行步骤（具体要做什么、按什么顺序）\n- 输出格式（给用户看什么）\n\n举例：你可以创建一个"Rust PR 审查" Skill，每次说"审查这个 PR"时，AI 自动按你定义的流程（Clippy、测试、安全检查、文档）逐步审查。\n\nSkills 比 CLAUDE.md 更结构化，适合团队共享和复用。',
            },
            {
              type: 'code',
              title: 'CLAUDE.md 模板：Rust 项目',
              description:
                '这是一个适合 Rust 项目的 CLAUDE.md 模板。\n\n把它放在项目根目录，AI 会自动遵守这些规则。',
              language: 'markdown',
              runnable: false,
              code: '# 项目：[你的项目名]\n\n## 构建与测试\n- 构建：`cargo build`\n- 测试：`cargo test`\n- Lint：`cargo clippy -- -D warnings`\n- 格式化：`cargo fmt`\n- 安全审计：`cargo audit`\n\n## 代码规范（必须遵守）\n- 禁止 `.unwrap()` 和 `.expect()`（仅测试中允许）\n- 禁止不必要的 `.clone()`——优先借用 `&T`\n- 禁止 `unsafe` 块（需要时先讨论）\n- 所有 `pub` 类型加 `#[derive(Debug)]`\n- 所有公共函数加 `///` doc 注释\n- 错误类型用枚举，实现 `std::error::Error`\n- 库用 `thiserror`，应用用 `anyhow`\n\n## 架构约定\n- 模块边界：每个模块只暴露最小公共接口\n- 错误传播：用 `?`，不手动 match 每个 Result\n- 并发：共享状态用 `Arc<Mutex<T>>`，文档说明为何需要\n\n## 禁止操作\n- 不允许修改 `migrations/` 目录下的文件\n- 不允许在没有测试的情况下合并新功能\n- 不允许添加未经确认的外部 crate\n\n## 外部依赖白名单\n- 允许：tokio, serde, anyhow, thiserror, sqlx, axum\n- 其他 crate 需要先讨论',
            },
            {
              type: 'quiz',
              question: '关于 CLAUDE.md 的最佳实践，以下哪项是正确的？',
              options: [
                '规则越多越好，把所有编码规范都写进去',
                '保持简洁（100–150 条以内），规则太多反而会被忽略',
                'CLAUDE.md 只适合大型项目，小项目不需要',
                'CLAUDE.md 中的规则由 AI 强制执行，不需要人工审查',
              ],
              correctIndex: 1,
              explanation:
                'Anthropic 官方指南明确警告：臃肿的 CLAUDE.md 会被 AI 当作噪音，遵守率反而下降。最佳实践是保持简洁、规则具体可执行、定期清理过时规则。CLAUDE.md 适合任何规模的项目，但注意它只是"建议"，最终还需要人工审查 AI 的输出。',
            },
            {
              type: 'ai-prompt',
              title: 'AI 提示模板：生成你的 CLAUDE.md',
              scenario: '你有一个 Rust 项目，想为它生成一个定制的 CLAUDE.md。',
              prompt: '帮我为下面这个 Rust 项目生成一个 CLAUDE.md 文件：\n\n**项目类型**：[例如：HTTP API 服务 / 命令行工具 / 库 / 区块链应用]\n**主要依赖**：[例如：tokio, axum, sqlx, serde]\n**团队规模**：[独立开发者 / 小团队 3-5 人 / 大团队]\n**特殊要求**：[例如：不允许 unsafe, 必须支持 no_std, 需要 WASM 支持]\n\n生成要求：\n1. 包含构建/测试/lint 命令\n2. 代码规范（禁止 unwrap、错误处理方式、derive 要求）\n3. 架构约定（适合这类项目的惯用模式）\n4. 禁止操作（针对这个项目的特定限制）\n5. 外部依赖白名单\n\n保持总规则数在 80 条以内。每条规则一行，清晰可执行。\n\n参考：claude.com/docs/en/best-practices, cursor.directory/rules/rust, tyrchen/cursor-rust-rules',
              explanation: '生成 CLAUDE.md 本身就是一个很好的 AI 用例——让 AI 帮你规范如何使用 AI。生成后仔细审查每条规则，删除不适用的，加入项目特有的约束。这个文件一旦建立，会在整个项目生命周期内节省大量提示词重复。',
            },
          ],
        },
      ],
    },
    // =============================================
    // 第十二章：智能指针
    // =============================================
    {
      id: 'ch12-smart-pointers',
      title: '第十二章：智能指针',
      lessons: [
        // --- 12.1 Box<T> ---
        {
          id: 'box-heap',
          title: 'Box<T>——把数据放到堆上',
          cards: [
            {
              type: 'explain',
              title: '什么时候需要 Box？',
              content:
                '**Box<T>** 是最简单的智能指针，它把数据分配在**堆**（heap）上，而不是栈上。\n\n你在这三种场景下需要它：\n\n- **大数据**：数组太大放不进栈，用 `Box` 放到堆上\n- **递归类型**：类型定义时引用自己（比如链表节点），大小在编译期无法确定，必须用 `Box` 打破无限递归\n- **trait 对象**：`Box<dyn Trait>` 让你存储"任意实现了某 trait 的类型"',
              analogy:
                '把 Box 想象成一个仓库存储单：你把大件物品（数据）存进仓库（堆），然后拿着一张存单（Box 指针）。用的时候拿着存单去仓库取，用完后存单销毁，仓库里的物品也自动清理。',
            },
            {
              type: 'think-first',
              question: '到目前为止，数据要么在栈上（整数、布尔），要么通过 String/Vec 在堆上（但这些类型帮你管理了）。\n\n如果你想手动把一个普通的值（比如 i32）放到堆上，你觉得应该怎么做？为什么有时候需要这样做？',
              reveal: '答案是 **Box<T>**——Rust 最简单的智能指针。\n\n```rust\nlet x = Box::new(42); // 42 现在在堆上\n```\n\n什么时候需要？\n- **递归类型**：链表、树的节点大小在编译期不确定，必须用 Box 间接存储\n- **大数据**：避免在栈上复制大量数据\n- **trait 对象**：`Box<dyn Trait>` 存储实现了某个 trait 的任意类型',
            },
            {
              type: 'explain',
              title: 'Box::new() 和自动 Deref',
              content:
                '用 `Box::new(值)` 创建一个 Box，值会被移动到堆上。\n\n**自动 Deref**：Box 实现了 `Deref` trait，所以你可以像用普通引用一样使用 Box——Rust 会自动帮你解引用。\n\n```rust\nlet b = Box::new(5);\nprintln!("{}", b);   // 不需要写 *b，自动解引用\nprintln!("{}", *b);  // 显式解引用也可以\n```\n\n当 Box 离开作用域时，它和堆上的数据都会被自动清理（Drop）。',
            },
            {
              type: 'code',
              title: '递归链表——Box 的经典用法',
              description:
                '递归类型必须用 Box 才能编译。\n\n这里我们定义一个简单的链表（Cons List），每个节点包含一个值和指向下一个节点的 Box。\n\n点击运行，观察链表的构建和打印。',
              language: 'rust',
              runnable: true,
              code: '// 递归类型：没有 Box 会编译失败\n// 因为编译器无法计算 List 的大小\n#[derive(Debug)]\nenum List {\n    Cons(i32, Box<List>),  // Box 让大小确定（一个指针的大小）\n    Nil,\n}\n\nuse List::{Cons, Nil};\n\nfn main() {\n    // 构建链表: 1 -> 2 -> 3 -> Nil\n    let list = Cons(1,\n        Box::new(Cons(2,\n            Box::new(Cons(3,\n                Box::new(Nil))))));\n\n    println!("{:?}", list);\n\n    // Box 自动 Deref 示例\n    let b = Box::new(42);\n    println!("Box 里的值: {}", b);   // 自动解引用\n    println!("显式解引用: {}", *b);  // 也可以显式\n\n    // Box 离开作用域后自动清理堆内存\n    println!("程序结束，Box 自动清理");\n}',
            },
            {
              type: 'quiz',
              question: '为什么递归类型（如链表节点）必须用 Box 包装？',
              options: [
                '因为 Box 比直接存储更快',
                '因为编译器无法在编译期确定递归类型的大小，Box（固定指针大小）打破了这个无限循环',
                '因为 Rust 不允许枚举包含自身类型',
                '因为链表只能在堆上创建',
              ],
              correctIndex: 1,
              explanation:
                'Rust 在编译期需要知道每种类型的大小。递归类型（如 `enum List { Cons(i32, List), Nil }`）的大小是无限的（List 包含 List，包含 List……）。用 `Box<List>` 后，大小变成"一个指针的大小"（固定），编译器就能确定了。',
            },
            {
              type: 'ai-prompt',
              title: 'AI 提示模板：用 Box 实现 trait 对象',
              scenario: '你学完了 Box<T> 的基本用法。trait 对象（Box<dyn Trait>）是 Box 最强大的用法之一，让 AI 帮你理解。',
              prompt: '用 Rust 演示 `Box<dyn Trait>` 的用法，要求：\n1. 定义一个 `Shape` trait，有 `area() -> f64` 和 `name() -> &str` 方法\n2. 实现两种形状：`Circle`（圆）和 `Rectangle`（矩形）\n3. 创建一个 `Vec<Box<dyn Shape>>`，存入不同的形状\n4. 遍历打印每个形状的名称和面积\n5. 解释为什么这里必须用 `Box<dyn Shape>` 而不是直接 `dyn Shape`\n用中文注释，代码可直接运行。',
              explanation: '`Box<dyn Trait>` 是运行时多态的核心。不同类型可以放入同一个集合，在运行时动态分发方法调用——这在插件系统、策略模式中非常常见。',
            },
            {
              type: 'fill-blank',
              title: '填空：Box 堆分配',
              description: '补全下面的代码，把一个整数分配到堆上，然后解引用取出它的值。',
              template: 'fn main() {\n    let x = ___BLANK___::new(42);\n    println!("堆上的值: {}", ___BLANK___);\n}',
              blanks: ['Box', '*x'],
              hints: ['把数据放到堆上用什么类型？', '怎么取出 Box 里的值？（解引用）'],
              language: 'rust',
            },
          ],
        },

        // --- 12.2 Rc<T> ---
        {
          id: 'rc-shared',
          title: 'Rc<T>——多个主人共享数据',
          cards: [
            {
              type: 'explain',
              title: '多所有权场景',
              content:
                'Rust 的所有权规则是"一个值只有一个主人"。但有时候，你确实需要多个地方共同拥有同一份数据，比如：\n\n- **图数据结构**：一个节点可能被多条边引用\n- **共享配置**：多个组件读取同一份配置对象\n- **缓存**：多个调用者共享同一份缓存数据\n\n这时候用 **`Rc<T>`**（Reference Counted，引用计数）。它追踪有多少个"主人"，当计数归零时自动清理数据。',
              analogy:
                '想象一份办公室公告：贴在公告板上，多个同事都可以"拥有"它（看它、引用它）。当最后一个同事不再需要它时，它才被撤下来。Rc 就是这个引用计数机制。',
            },
            {
              type: 'explain',
              title: 'Rc::clone() 和 strong_count()',
              content:
                '**`Rc::clone(&rc)`** 不会复制数据，只是增加引用计数（非常快）。\n\n```rust\nuse std::rc::Rc;\n\nlet a = Rc::new(String::from("hello"));\nprintln!("引用计数: {}", Rc::strong_count(&a)); // 1\n\nlet b = Rc::clone(&a);  // 计数 +1，不复制数据\nprintln!("引用计数: {}", Rc::strong_count(&a)); // 2\n\n// b 离开作用域 → 计数 -1\n// a 离开作用域 → 计数变 0 → 数据被清理\n```\n\n**重要限制**：`Rc<T>` **只适合单线程**！多线程场景用 `Arc<T>`（原子引用计数）。\n\n`Rc` 也只提供**不可变**访问；如果需要可变，结合 `RefCell` 使用（见下一节）。',
            },
            {
              type: 'code',
              title: '多个所有者共享数据',
              description:
                '下面演示两个"节点"共同拥有同一份数据。\n\n观察引用计数如何随 clone 和 drop 变化。',
              language: 'rust',
              runnable: true,
              code: 'use std::rc::Rc;\n\n#[derive(Debug)]\nstruct Node {\n    value: i32,\n}\n\nfn main() {\n    // 创建共享数据\n    let shared = Rc::new(Node { value: 42 });\n    println!("创建后引用计数: {}", Rc::strong_count(&shared)); // 1\n\n    {\n        let clone1 = Rc::clone(&shared); // 计数 → 2\n        let clone2 = Rc::clone(&shared); // 计数 → 3\n        println!("作用域内引用计数: {}", Rc::strong_count(&shared)); // 3\n        println!("clone1 看到的值: {}", clone1.value);\n        println!("clone2 看到的值: {}", clone2.value);\n        // clone1 和 clone2 离开作用域 → 计数 → 1\n    }\n\n    println!("作用域结束后引用计数: {}", Rc::strong_count(&shared)); // 1\n\n    // 共享的尾部列表示例：两个列表共享一段数据\n    let tail = Rc::new(vec![3, 4, 5]);\n    let _list_a: Vec<i32> = vec![1, 2].into_iter().chain(tail.iter().cloned()).collect();\n    let _list_b: Vec<i32> = vec![10, 20].into_iter().chain(tail.iter().cloned()).collect();\n    println!("tail 引用计数: {}", Rc::strong_count(&tail)); // 1\n}',
            },
            {
              type: 'quiz',
              question: '关于 Rc<T>，以下哪项描述是正确的？',
              options: [
                'Rc::clone() 会深度复制堆上的数据，很慢',
                'Rc<T> 适合多线程共享数据',
                'Rc<T> 只适合单线程；Rc::clone() 只增加引用计数，不复制数据',
                'Rc<T> 提供内部可变性，可以修改共享数据',
              ],
              correctIndex: 2,
              explanation:
                '`Rc::clone()` 只是把引用计数 +1，非常快，不复制堆上的数据。`Rc<T>` 不是线程安全的（不实现 `Send`），多线程必须用 `Arc<T>`。`Rc<T>` 本身只提供不可变引用，可变性需要结合 `RefCell<T>`。',
            },
            {
              type: 'ai-prompt',
              title: 'AI 提示模板：用 Rc 实现图结构',
              scenario: '你学完了 Rc<T> 的多所有权机制。让 AI 帮你实现一个更真实的图结构。',
              prompt: '用 Rust 的 `Rc<T>` 实现一个简单的有向图，要求：\n1. 定义 `GraphNode` 结构体，包含节点值（i32）和邻居列表（`Vec<Rc<GraphNode>>`）\n2. 创建 3 个节点，让节点 A 和节点 B 都引用节点 C（共享所有权）\n3. 打印每个节点的值和它的邻居列表\n4. 用 `Rc::strong_count` 显示节点 C 的引用计数\n5. 解释为什么这里用 `Rc` 而不是普通引用\n用中文注释，代码可直接运行。',
              explanation: '图结构是 Rc 的经典应用场景。在图中，多条边可以指向同一个节点——这正是多所有权的需求。',
            },
          ],
        },

        // --- 12.3 RefCell<T> ---
        {
          id: 'refcell-interior',
          title: 'RefCell<T>——内部可变性',
          cards: [
            {
              type: 'explain',
              title: '编译期 vs 运行期借用检查',
              content:
                'Rust 的借用规则通常在**编译期**检查。但有时候，你知道代码是正确的，编译器却无法在编译期证明这一点。\n\n**`RefCell<T>`** 把借用检查推迟到**运行期**：\n- 如果违反借用规则（比如同时有两个可变借用），不会编译期报错，而是**运行时 panic**\n- 这在编译器"太保守"时很有用\n\n**`RefCell<T>` 也只适合单线程**（多线程用 `Mutex<T>`）。',
              analogy:
                '编译期检查像考试前审题——发现错误在答卷之前。运行期检查像考试中老师巡逻——发现违规当场制止（panic）。RefCell 是在运行时"守规矩"而不是编译时。',
            },
            {
              type: 'explain',
              title: 'borrow() 和 borrow_mut()',
              content:
                '`RefCell<T>` 有两个核心方法：\n\n- **`borrow()`** → 返回 `Ref<T>`（不可变借用，可同时有多个）\n- **`borrow_mut()`** → 返回 `RefMut<T>`（可变借用，同一时间只能有一个）\n\n违反规则时运行时 panic：\n```rust\nlet cell = RefCell::new(5);\nlet b1 = cell.borrow();     // OK\nlet b2 = cell.borrow_mut(); // PANIC! 已有不可变借用\n```\n\n**`Rc<RefCell<T>>` 组合**是单线程"多主人可变数据"的标准模式：\n- `Rc` 负责多所有权\n- `RefCell` 负责内部可变性',
            },
            {
              type: 'code',
              title: 'Rc<RefCell<T>>——多主人共享可变数据',
              description:
                '这是单线程中最常见的组合模式：多个变量共同拥有同一份可变数据。\n\n观察如何通过任意一个所有者修改共享数据，其他所有者立刻看到变化。',
              language: 'rust',
              runnable: true,
              code: 'use std::rc::Rc;\nuse std::cell::RefCell;\n\n#[derive(Debug)]\nstruct SharedConfig {\n    value: i32,\n    name: String,\n}\n\nfn main() {\n    // Rc<RefCell<T>>: 多主人 + 内部可变性\n    let config = Rc::new(RefCell::new(SharedConfig {\n        value: 10,\n        name: String::from("初始配置"),\n    }));\n\n    let config_a = Rc::clone(&config); // 第二个主人\n    let config_b = Rc::clone(&config); // 第三个主人\n\n    // 通过 config_a 修改数据\n    config_a.borrow_mut().value = 42;\n    config_a.borrow_mut().name = String::from("已更新");\n\n    // 通过 config_b 读取，能看到 config_a 的修改\n    println!("config_b 看到的值: {:?}", config_b.borrow());\n\n    // 通过原始 config 读取\n    println!("原始 config 看到的值: {}", config.borrow().value);\n\n    // RefCell 单独使用示例\n    let data = RefCell::new(vec![1, 2, 3]);\n    data.borrow_mut().push(4); // 内部可变\n    println!("data: {:?}", data.borrow());\n}',
            },
            {
              type: 'quiz',
              question: '如果对同一个 RefCell 同时调用 borrow_mut() 两次，会发生什么？',
              options: [
                '编译错误，Rust 在编译期阻止',
                '运行时 panic，因为违反了借用规则',
                '正常运行，RefCell 允许多个可变借用',
                '第二次调用返回 None',
              ],
              correctIndex: 1,
              explanation:
                'RefCell 把借用检查推迟到运行期。如果同时持有两个 `borrow_mut()`，运行时会 panic，而不是编译期报错。这就是 RefCell 和普通借用的核心区别——开发者要自己保证不会违规。',
            },
            {
              type: 'ai-prompt',
              title: 'AI 提示模板：用 RefCell 实现观察者模式',
              scenario: '你学完了 RefCell<T> 和 Rc<RefCell<T>> 组合。让 AI 帮你实现一个经典的设计模式。',
              prompt: '用 Rust 的 `Rc<RefCell<T>>` 实现一个简单的观察者模式（Observer Pattern），要求：\n1. 定义 `Observer` trait，有 `update(value: i32)` 方法\n2. 定义 `Subject` 结构体，持有一组观察者（`Vec<Rc<RefCell<dyn Observer>>>`）\n3. Subject 有 `attach`（添加观察者）和 `notify`（通知所有观察者）方法\n4. 实现两个具体的观察者：`Logger`（打印日志）和 `Counter`（累计求和）\n5. 演示完整流程：创建 Subject、添加观察者、触发通知\n6. 解释为什么需要 Rc（多所有权）和 RefCell（内部可变性）\n用中文注释，代码可直接运行。',
              explanation: '观察者模式需要"主题持有观察者的引用，观察者也可能持有主题的引用"——这正是 Rc<RefCell<T>> 的典型使用场景。',
            },
          ],
        },

        // --- 12.4 Arc<T> ---
        {
          id: 'arc-atomic',
          title: 'Arc<T>——跨线程共享',
          cards: [
            {
              type: 'explain',
              title: 'Arc = 原子引用计数',
              content:
                '`Arc<T>`（Atomically Reference Counted）是 `Rc<T>` 的**多线程版本**。\n\n区别只有一点：`Arc` 的引用计数操作是**原子的**（线程安全），`Rc` 不是。\n\n- `Rc<T>` → 单线程，性能略高（无需原子操作开销）\n- `Arc<T>` → 多线程，线程安全\n\nAPI 几乎完全一样：`Arc::new()`、`Arc::clone()`、`Arc::strong_count()`。\n\n`Arc<T>` 实现了 `Send` 和 `Sync`，可以跨线程传递。',
              analogy:
                '把 Rc 和 Arc 想象成普通锁和防盗锁：单人住宅（单线程）用普通锁就够（Rc，更轻便），合租公寓（多线程）需要防盗锁（Arc，线程安全但稍重）。',
            },
            {
              type: 'explain',
              title: 'Arc<Mutex<T>>——多线程共享可变数据',
              content:
                '`Arc<T>` 本身只提供**不可变**共享。跨线程修改数据，需要结合 `Mutex<T>`：\n\n```rust\nuse std::sync::{Arc, Mutex};\n\nlet shared = Arc::new(Mutex::new(0));\n\n// 在新线程中修改\nlet shared_clone = Arc::clone(&shared);\nstd::thread::spawn(move || {\n    let mut data = shared_clone.lock().unwrap();\n    *data += 1;\n});\n```\n\n**注意**：`Mutex` 会在下一章详细讲解。这里先记住 `Arc<Mutex<T>>` 是多线程共享可变数据的标准组合。',
            },
            {
              type: 'code',
              title: 'Arc 跨线程共享数据',
              description:
                '用 Arc 在多个线程之间共享同一份只读数据。\n\n观察 Arc 如何让数据的所有权安全地跨越线程边界。',
              language: 'rust',
              runnable: true,
              code: 'use std::sync::Arc;\nuse std::thread;\n\nfn main() {\n    // 创建一个跨线程共享的只读数据\n    let shared_data = Arc::new(vec![1, 2, 3, 4, 5]);\n    println!("主线程引用计数: {}", Arc::strong_count(&shared_data));\n\n    let mut handles = vec![];\n\n    // 启动 3 个线程，每个都持有 Arc 的 clone\n    for i in 0..3 {\n        let data = Arc::clone(&shared_data); // 计数 +1\n        let handle = thread::spawn(move || {\n            println!("线程 {} 看到数据: {:?}", i, data);\n            println!("线程 {} 的引用计数: {}", i, Arc::strong_count(&data));\n        });\n        handles.push(handle);\n    }\n\n    // 等待所有线程完成\n    for handle in handles {\n        handle.join().unwrap();\n    }\n\n    // 所有线程的 clone 已 drop，计数回到 1\n    println!("所有线程结束后引用计数: {}", Arc::strong_count(&shared_data));\n}',
            },
            {
              type: 'quiz',
              question: '什么时候用 Arc<T> 而不是 Rc<T>？',
              options: [
                '当数据量很大时用 Arc，数据量小时用 Rc',
                '当需要跨线程共享数据时用 Arc，单线程多所有权用 Rc',
                'Arc 和 Rc 功能完全相同，随便选',
                '当需要可变数据时用 Arc，不可变数据用 Rc',
              ],
              correctIndex: 1,
              explanation:
                '`Arc` 和 `Rc` 的 API 几乎一样，唯一区别是 `Arc` 的引用计数是原子操作，可以安全地跨线程共享（实现了 `Send + Sync`）。单线程优先用 `Rc`（稍微更快），需要跨线程时才用 `Arc`。可变性由 `Mutex`/`RefCell` 决定，与 Arc/Rc 无关。',
            },
            {
              type: 'ai-prompt',
              title: 'AI 提示模板：Arc<Mutex<T>> 多线程计数器',
              scenario: '你学完了 Arc<T> 和它与 Mutex 的组合预告。让 AI 帮你实现一个经典的多线程计数器。',
              prompt: '用 Rust 的 `Arc<Mutex<T>>` 实现一个多线程计数器，要求：\n1. 创建一个初始值为 0 的共享计数器（用 `Arc<Mutex<i32>>`）\n2. 启动 5 个线程，每个线程把计数器加 10\n3. 等待所有线程完成（join）\n4. 打印最终计数值（应该是 50）\n5. 解释为什么需要 Arc（跨线程所有权）和 Mutex（互斥访问）\n6. 如果去掉 Mutex 只用 Arc，会发生什么？\n用中文注释，代码可直接运行。',
              explanation: 'Arc<Mutex<T>> 是多线程编程中最基础也最重要的模式。理解它之后，下一章的并发编程会轻松很多。',
            },
          ],
        },

        // --- 12.5 Deref 与 Drop ---
        {
          id: 'deref-drop',
          title: 'Deref 与 Drop——智能指针的魔法',
          cards: [
            {
              type: 'explain',
              title: 'Deref trait——自动解引用',
              content:
                '**`Deref` trait** 让你的类型可以像引用一样被使用。\n\n实现了 `Deref<Target=T>` 的类型，在需要 `&T` 的地方可以自动转换：\n\n- `Box<String>` → 可当 `&String` 用\n- `Box<String>` → 甚至可当 `&str` 用（因为 `String` 也实现了 `Deref<Target=str>`）\n\n这叫做 **Deref 强制转换**（Deref Coercion），Rust 会自动链式应用，直到类型匹配。\n\n这就是为什么你可以把 `&String` 传给接受 `&str` 的函数——Rust 帮你做了转换。',
            },
            {
              type: 'explain',
              title: 'Drop trait——自定义清理逻辑',
              content:
                '**`Drop` trait** 让你在值离开作用域时执行自定义清理代码。\n\n```rust\nimpl Drop for MyResource {\n    fn drop(&mut self) {\n        // 关闭文件、释放锁、清理网络连接……\n        println!("资源被清理了！");\n    }\n}\n```\n\n这就是 **RAII 模式**（Resource Acquisition Is Initialization）：\n- **获取资源时初始化**（构造函数中打开文件/连接）\n- **释放资源时清理**（Drop 中关闭文件/连接）\n\nRust 保证 Drop 一定会被调用——哪怕发生了 panic。这让资源泄漏几乎不可能。\n\n智能指针（Box、Rc、Arc）都通过 Drop 来自动释放堆内存。',
            },
            {
              type: 'code',
              title: 'Deref 和 Drop 实战',
              description:
                '自己实现一个简单的智能指针，体验 Deref 和 Drop 的魔法。\n\n观察 Deref 如何让自定义类型像引用一样使用，Drop 如何自动触发清理。',
              language: 'rust',
              runnable: true,
              code: 'use std::ops::Deref;\n\n// 自定义智能指针\nstruct MyBox<T>(T);\n\nimpl<T> MyBox<T> {\n    fn new(x: T) -> MyBox<T> {\n        MyBox(x)\n    }\n}\n\n// 实现 Deref：让 MyBox<T> 可以当 &T 用\nimpl<T> Deref for MyBox<T> {\n    type Target = T;\n    fn deref(&self) -> &T {\n        &self.0\n    }\n}\n\n// 实现 Drop：离开作用域时打印消息\nimpl<T: std::fmt::Debug> Drop for MyBox<T> {\n    fn drop(&mut self) {\n        println!("MyBox 被清理，值为: {:?}", self.0);\n    }\n}\n\nfn greet(name: &str) {\n    println!("你好，{}！", name);\n}\n\nfn main() {\n    // Deref 强制转换演示\n    let s = MyBox::new(String::from("世界"));\n    // MyBox<String> → &String → &str（链式 Deref）\n    greet(&s);  // 自动解引用，无需手动转换！\n\n    println!("通过 * 解引用: {}", *s); // 显式解引用\n\n    // RAII 和 Drop 演示\n    println!("\\n--- 作用域开始 ---");\n    {\n        let _a = MyBox::new(42);\n        let _b = MyBox::new("hello");\n        println!("在作用域内...");\n        // _b 先 drop，_a 后 drop（后进先出）\n    }\n    println!("--- 作用域结束 ---\\n");\n\n    // 标准库 Box 的 RAII\n    let data = Box::new(vec![1, 2, 3]);\n    println!("堆上的数据: {:?}", data);\n    // data 离开作用域时自动释放堆内存\n}',
            },
            {
              type: 'quiz',
              question: '关于 RAII 模式，以下哪项描述最准确？',
              options: [
                'RAII 是一种手动管理内存的模式，需要显式调用 free()',
                '资源在获取时初始化，在值离开作用域时通过 Drop 自动释放——哪怕发生 panic',
                'RAII 只适用于内存管理，不适用于文件和网络连接',
                'Rust 中需要手动实现 RAII，编译器不会自动调用 Drop',
              ],
              correctIndex: 1,
              explanation:
                'RAII（Resource Acquisition Is Initialization）是 C++ 和 Rust 的核心资源管理模式。资源在构造时获取，在析构（Rust 中是 Drop）时释放。Rust 编译器**保证** Drop 一定会被调用——包括发生 panic 的情况。这使得资源泄漏几乎不可能，无需手动 free()。',
            },
            {
              type: 'ai-prompt',
              title: 'AI 提示模板：实现 RAII 资源管理',
              scenario: '你学完了 Deref 和 Drop，理解了 RAII 模式。让 AI 帮你实现一个真实的资源管理场景。',
              prompt: '用 Rust 的 Drop trait 实现一个简单的"数据库连接"资源管理器，要求：\n1. 定义 `DatabaseConnection` 结构体，包含连接 ID（用 u32 模拟）\n2. 实现 `new(id: u32)` 构造函数，打印"连接 {id} 已建立"\n3. 实现 Drop，打印"连接 {id} 已关闭"\n4. 实现一个 `query(&self, sql: &str)` 方法，打印执行的 SQL\n5. 演示：在函数中创建连接、执行查询，函数返回时连接自动关闭\n6. 解释为什么这比手动关闭连接更安全\n用中文注释，代码可直接运行。',
              explanation: 'RAII 是防止资源泄漏的最强机制。真实项目中，数据库连接池、文件句柄、网络 socket 都应该用 Drop 来管理关闭逻辑。',
            },
          ],
        },
      ],
    },

    // =============================================
    // 第十三章：并发编程
    // =============================================
    {
      id: 'ch13-concurrency',
      title: '第十三章：并发编程',
      lessons: [
        // --- 13.1 线程基础 ---
        {
          id: 'threads-basics',
          title: '线程——同时做多件事',
          cards: [
            {
              type: 'explain',
              title: '什么是线程？',
              content:
                '**线程**是程序中可以同时执行的独立执行单元。\n\n默认情况下，你的程序只有一条执行路径（主线程）。创建新线程后，多条路径可以**同时**运行，充分利用多核 CPU。\n\n**两个核心操作**：\n- **`std::thread::spawn()`**：创建新线程，传入一个闭包作为线程要执行的代码\n- **`.join()`**：等待线程完成，返回线程的执行结果（`JoinHandle`）',
              analogy:
                '想象餐厅厨房：只有主厨（主线程）时，一道一道菜按顺序做。招募更多厨师（spawn 线程）后，多道菜可以同时进行——凉菜、热菜、汤品同时开工，效率大幅提升。join() 就像"等所有菜都上桌再开饭"。',
            },
            {
              type: 'think-first',
              question: '假设你在管理一家餐厅，有 4 个厨师（线程）。现在有一个共享的食材储藏室（数据）。\n\n如果 4 个厨师同时进去拿食材，可能出什么问题？你会怎么管理？',
              reveal: '**可能的问题**：\n- 两个厨师同时拿最后一块牛肉 → **数据竞争**\n- 厨师 A 等厨师 B 出来，厨师 B 等厨师 A 出来 → **死锁**\n- 一个厨师在数食材，另一个同时在拿走食材 → **不一致状态**\n\n**解决方案**：\n- 加一把锁（`Mutex`）：一次只能一个厨师进储藏室\n- 用传菜窗口（`Channel`）：厨师们不直接共享，而是通过窗口传递\n\n这就是 Rust 并发编程的两大模式：**共享状态**（Mutex）和**消息传递**（Channel）。',
            },
            {
              type: 'explain',
              title: 'move 闭包——转移所有权到新线程',
              content:
                '新线程是独立运行的，它的生命周期可能比创建它的代码块更长。\n\n因此，传给 `thread::spawn` 的闭包**不能借用**主线程的变量——主线程的变量可能在新线程还在运行时就已经消失了。\n\n解决方案：用 **`move` 闭包**，把需要的值的所有权**移动**进新线程：\n\n```rust\nlet data = vec![1, 2, 3];\nthread::spawn(move || {\n    println!("{:?}", data); // data 的所有权已转移到新线程\n});\n// 这里无法再用 data\n```',
            },
            {
              type: 'code',
              title: '创建线程和等待完成',
              description:
                '下面演示如何创建多个线程同时工作，以及用 join() 等待它们全部完成。\n\n观察主线程和子线程的输出顺序——它们是交替的，因为是真正并行执行的。',
              language: 'rust',
              runnable: true,
              code: 'use std::thread;\nuse std::time::Duration;\n\nfn main() {\n    let mut handles = vec![];\n\n    // 启动 5 个"厨师"线程\n    for i in 0..5u64 {\n        let handle = thread::spawn(move || {\n            // move: 把 i 的所有权转移到新线程\n            println!("厨师 {} 开始工作", i);\n            thread::sleep(Duration::from_millis(10 * i));\n            println!("厨师 {} 完成工作", i);\n            i * i // 返回值\n        });\n        handles.push(handle);\n    }\n\n    println!("主线程：等待所有厨师完成...");\n\n    // join() 等待每个线程，收集返回值\n    let results: Vec<u64> = handles\n        .into_iter()\n        .map(|h| h.join().unwrap())\n        .collect();\n\n    println!("所有厨师完成！各自的结果: {:?}", results);\n    println!("结果之和: {}", results.iter().sum::<u64>());\n}',
            },
            {
              type: 'quiz',
              question: '为什么传给 thread::spawn 的闭包通常需要加 move 关键字？',
              options: [
                '因为 move 让代码运行更快',
                '因为新线程的生命周期可能超过父线程的作用域，move 把所有权转移进线程，避免悬垂引用',
                '因为不加 move 闭包无法访问外部变量',
                '因为 Rust 要求所有闭包都用 move',
              ],
              correctIndex: 1,
              explanation:
                '新线程可能在父线程的局部变量已经销毁之后还在运行。如果闭包借用了父线程的变量，就会有悬垂引用的风险。`move` 关键字强制把所有权转移进闭包（进入新线程），让数据的生命周期和线程绑定，Rust 编译器借此保证安全。',
            },
            {
              type: 'ai-prompt',
              title: 'AI 提示模板：并行数据处理',
              scenario: '你学完了 thread::spawn 和 join。让 AI 帮你实现一个实际的并行计算场景。',
              prompt: '用 Rust 线程实现并行计算，要求：\n1. 创建一个包含 1000 个数字的 Vec<i32>（用 0..1000i32 收集）\n2. 把 Vec 分成 4 段，每段用一个独立线程计算该段的总和\n3. 主线程等待所有子线程完成，把各段结果加起来得到总和\n4. 对比单线程和多线程的计算方式\n5. 解释为什么需要 move 闭包，以及如何安全地把数据分发给各线程\n用中文注释，代码可直接运行。',
              explanation: '并行求和是理解线程数据分发的经典练习。在真实项目中，图片处理、数据分析等计算密集型任务都可以用类似的方式并行化。',
            },
          ],
        },

        // --- 13.2 消息传递 ---
        {
          id: 'channels',
          title: '消息传递——线程间安全通信',
          cards: [
            {
              type: 'explain',
              title: '为什么用消息传递？',
              content:
                'Go 语言有句名言："不要通过共享内存来通信，而要通过通信来共享内存。"\n\nRust 也支持这个思想：**channel（通道）** 让线程之间通过发送消息来协作，而不是直接共享内存。\n\n这样做的好处：\n- 避免了数据竞争（每条消息只有一个所有者）\n- 逻辑更清晰（谁发、谁收、发什么）\n- 天然解耦（发送者和接收者不需要知道对方的内部细节）',
              analogy:
                '想象工厂传送带：生产者把产品（数据）放到传送带上（channel），消费者从另一端取走。生产者不需要等消费者处理完才能继续生产，消费者也不需要知道生产者的内部实现。',
            },
            {
              type: 'explain',
              title: 'mpsc::channel()——多生产者，单消费者',
              content:
                '`std::sync::mpsc` 是 **m**ultiple **p**roducer, **s**ingle **c**onsumer 的缩写。\n\n```rust\nuse std::sync::mpsc;\n\nlet (tx, rx) = mpsc::channel(); // tx = 发送者，rx = 接收者\n```\n\n- **`tx`（Sender）**：可以 clone，让多个线程都能发送\n- **`rx`（Receiver）**：只有一个，在单个线程中接收\n- **`tx.send(值)`**：发送（值的所有权转移给 channel）\n- **`rx.recv()`**：阻塞等待接收（返回 `Result`）\n- **`rx.try_recv()`**：非阻塞，如果没有消息立刻返回 `Err`\n- **`for msg in rx`**：迭代接收，直到所有发送者都 drop',
            },
            {
              type: 'code',
              title: '多个生产者，一个消费者',
              description:
                '下面演示经典的"多生产者，单消费者"模式：\n\n多个线程往同一个 channel 发送数据，主线程接收并处理所有消息。',
              language: 'rust',
              runnable: true,
              code: 'use std::sync::mpsc;\nuse std::thread;\nuse std::time::Duration;\n\nfn main() {\n    let (tx, rx) = mpsc::channel();\n\n    // 启动 3 个生产者线程\n    for i in 0..3 {\n        let tx_clone = tx.clone(); // 每个线程拿一份发送者\n        thread::spawn(move || {\n            for j in 0..3 {\n                let msg = format!("生产者 {} 的第 {} 条消息", i, j);\n                tx_clone.send(msg).unwrap();\n                thread::sleep(Duration::from_millis(5));\n            }\n            println!("生产者 {} 完成发送", i);\n        });\n    }\n\n    // 必须 drop 原始 tx，否则 rx 不知道所有发送者都完成了\n    drop(tx);\n\n    // 主线程作为消费者：for 循环自动在所有发送者 drop 后结束\n    let mut count = 0;\n    for msg in rx {\n        println!("收到: {}", msg);\n        count += 1;\n    }\n\n    println!("\\n共收到 {} 条消息", count);\n}',
            },
            {
              type: 'quiz',
              question: '使用 mpsc::channel 时，如果想让多个线程都能发送消息，应该怎么做？',
              options: [
                '创建多个 channel，每个线程一个',
                '用 Arc<Mutex<Sender>> 包装发送者',
                '对发送者（tx）调用 clone()，给每个线程一个克隆',
                '发送者本身就支持多线程，直接传入即可',
              ],
              correctIndex: 2,
              explanation:
                '`mpsc` 的 "mp"（multiple producer）就是通过 `clone()` 发送者（`Sender`）实现的。每次 clone 创建一个新的发送者，引用同一个 channel。当所有发送者的克隆都 drop 后，接收者的 `recv()` 会返回 `Err`，标志着 channel 关闭。',
            },
            {
              type: 'ai-prompt',
              title: 'AI 提示模板：pipeline 数据处理',
              scenario: '你学完了 mpsc channel。让 AI 帮你用 channel 实现一个数据处理流水线。',
              prompt: '用 Rust 的 mpsc::channel 实现一个三阶段数据处理流水线，要求：\n1. **阶段 1（生产者）**：生成 1~10 的数字，发送到 channel\n2. **阶段 2（转换器）**：从 channel 接收数字，乘以 2，发送到第二个 channel\n3. **阶段 3（消费者/主线程）**：从第二个 channel 接收结果，打印并求和\n4. 每个阶段在独立线程中运行\n5. 解释为什么这种设计比共享内存更容易推理\n用中文注释，代码可直接运行。',
              explanation: 'Pipeline 模式是函数式编程和并发编程的结合。真实项目中，ETL（Extract-Transform-Load）数据处理、编译器的各个阶段都可以用这种模式实现。',
            },
          ],
        },

        // --- 13.3 Mutex<T> ---
        {
          id: 'mutex-shared',
          title: 'Mutex<T>——共享状态并发',
          cards: [
            {
              type: 'explain',
              title: '互斥锁的概念',
              content:
                '**Mutex**（Mutual Exclusion，互斥锁）确保同一时间只有一个线程可以访问数据。\n\n工作原理：\n1. 线程想访问数据，先**获取锁**（`.lock()`）\n2. 如果锁被其他线程持有，当前线程**阻塞等待**\n3. 获取锁成功后，访问数据\n4. 访问完成，**释放锁**（Rust 自动 drop）\n5. 其他等待的线程现在可以获取锁了\n\n```rust\nuse std::sync::Mutex;\n\nlet m = Mutex::new(5);\n{\n    let mut data = m.lock().unwrap(); // 获取锁\n    *data = 10;  // 修改数据\n}   // 锁在这里自动释放（RAII）\n```',
              analogy:
                '互斥锁就像公共厕所的门锁：同一时间只有一个人（线程）可以进去（访问数据）。你进去前先确认没人（获取锁），出来后自动解锁（drop），下一个人才能进去。',
            },
            {
              type: 'explain',
              title: '死锁——需要避免的陷阱',
              content:
                '**死锁**发生在两个线程相互等待对方释放锁，导致都永远阻塞：\n\n```\n线程 A 持有锁 1，等待锁 2\n线程 B 持有锁 2，等待锁 1\n→ 双方都永远等不到，程序卡住\n```\n\n**避免死锁的基本原则**：\n- **总以相同顺序获取多个锁**（所有线程都先锁 1 再锁 2）\n- **持锁时间尽量短**（只在修改数据时持锁，不要在持锁时做 I/O）\n- **考虑用 channel 代替共享锁**（消息传递往往比共享状态更简单）\n\nRust 防止了数据竞争，但**不防止死锁**——这是程序员的责任。',
            },
            {
              type: 'code',
              title: '多线程计数器——Arc<Mutex<T>> 实战',
              description:
                '经典的多线程计数器：10 个线程，每个线程把共享计数器加 1000。\n\n最终结果应该正好是 10000。',
              language: 'rust',
              runnable: true,
              code: 'use std::sync::{Arc, Mutex};\nuse std::thread;\n\nfn main() {\n    // Arc: 跨线程共享所有权\n    // Mutex: 保证同一时间只有一个线程修改数据\n    let counter = Arc::new(Mutex::new(0u64));\n    let mut handles = vec![];\n\n    for i in 0..10 {\n        let counter_clone = Arc::clone(&counter);\n        let handle = thread::spawn(move || {\n            for _ in 0..1000 {\n                let mut count = counter_clone.lock().unwrap();\n                *count += 1;\n                // 锁在这里自动释放（count 离开作用域）\n            }\n            println!("线程 {} 完成", i);\n        });\n        handles.push(handle);\n    }\n\n    for handle in handles {\n        handle.join().unwrap();\n    }\n\n    // 所有线程完成，读取最终结果\n    println!("\\n最终计数: {}", *counter.lock().unwrap());\n    // 应该精确是 10000，因为 Mutex 保证了原子操作\n}',
            },
            {
              type: 'fill-blank',
              title: '填空：多线程计数器',
              description: '补全这段代码，使用正确的并发原语实现跨线程共享的计数器。',
              template: 'use std::sync::___BLANK___;\nuse std::sync::___BLANK___;\n\nfn main() {\n    let counter = Arc::new(Mutex::new(0));\n}',
              blanks: ['Arc', 'Mutex'],
              hints: ['跨线程共享用什么智能指针？', '保护共享数据用什么锁？'],
              language: 'rust',
            },
            {
              type: 'quiz',
              question: '关于 Mutex 的 RAII 释放锁机制，以下哪项正确？',
              options: [
                '需要手动调用 unlock() 方法释放锁',
                'Mutex 锁在 lock() 返回的 MutexGuard 离开作用域时自动释放',
                '锁在当前线程的函数返回时才释放',
                '需要在 finally 块中释放锁',
              ],
              correctIndex: 1,
              explanation:
                '`Mutex::lock()` 返回一个 `MutexGuard` 类型，它实现了 `Drop`——当 `MutexGuard` 离开作用域时，锁自动释放。这是 RAII 模式的完美应用：不可能忘记解锁，即使发生 panic，锁也会在 MutexGuard drop 时释放（中毒状态，可用 `unwrap()` 或 `into_inner()` 处理）。',
            },
            {
              type: 'ai-prompt',
              title: 'AI 提示模板：线程安全缓存',
              scenario: '你学完了 Arc<Mutex<T>> 组合。让 AI 帮你实现一个线程安全的缓存。',
              prompt: '用 Rust 的 `Arc<Mutex<HashMap<String, String>>>` 实现一个简单的线程安全键值缓存，要求：\n1. 定义 `Cache` 结构体，内部是 `Arc<Mutex<HashMap<String, String>>>`\n2. 实现 `get(key)` 和 `set(key, value)` 方法\n3. 实现 `Clone`（让多个线程共享同一个 Cache 实例）\n4. 启动 3 个写线程，各自写入不同的键值对\n5. 启动 2 个读线程，读取写入的数据\n6. 主线程等待所有线程完成，打印最终缓存内容\n7. 解释为什么这里用 HashMap 外层加 Mutex，而不是 HashMap 每个值各自加锁\n用中文注释，代码可直接运行。',
              explanation: '线程安全的缓存是真实项目中的常见需求。理解"粗粒度锁"（整个 HashMap 一把锁）和"细粒度锁"（每个值一把锁）的权衡是进阶并发编程的重要一步。',
            },
          ],
        },

        // --- 13.4 Send 与 Sync ---
        {
          id: 'send-sync',
          title: 'Send 与 Sync——编译器保护你',
          cards: [
            {
              type: 'explain',
              title: 'Send：可以发送到另一个线程',
              content:
                '**`Send` trait** 表示：这个类型的**所有权**可以安全地从一个线程转移到另一个线程。\n\n大多数类型都自动实现了 `Send`。例外：\n- **`Rc<T>`** 不是 `Send`（引用计数不是原子的，多线程访问会出错）\n- **裸指针**（`*const T`、`*mut T`）不是 `Send`\n\n当你尝试把非 `Send` 的类型传给 `thread::spawn`，**编译器会报错**——在你写代码时就发现问题，而不是在运行时崩溃。',
            },
            {
              type: 'explain',
              title: 'Sync：可以从多个线程引用',
              content:
                '**`Sync` trait** 表示：这个类型的**引用**（`&T`）可以安全地在多个线程中同时使用。\n\n如果 `T: Sync`，那么 `&T` 就是 `Send`。\n\n常见情况：\n- **`Arc<T>`**：是 `Send + Sync`（如果 T 也是），可以安全跨线程\n- **`Mutex<T>`**：是 `Sync`（内部用锁保护）\n- **`RefCell<T>`**：不是 `Sync`（运行期借用检查不是线程安全的）\n- **`Rc<T>`**：不是 `Send` 也不是 `Sync`\n\n这两个 trait 是 Rust **"无畏并发"（fearless concurrency）** 的基础——编译器静态保证你不会写出数据竞争。',
            },
            {
              type: 'code',
              title: 'Send 和 Sync 的编译期保护',
              description:
                '下面演示 Arc（Send + Sync）的跨线程使用。\n\n注释中展示了如果尝试跨线程传递 Rc 会产生的编译错误——Rust 在你的代码还没运行时就保护了你。',
              language: 'rust',
              runnable: true,
              code: 'use std::sync::Arc;\nuse std::thread;\n\nfn print_from_thread<T: Send + std::fmt::Debug + \'static>(data: T) {\n    // 函数签名要求 T: Send，编译期强制检查\n    thread::spawn(move || {\n        println!("线程中看到: {:?}", data);\n    }).join().unwrap();\n}\n\nfn main() {\n    // Arc 是 Send + Sync，可以跨线程\n    let arc_data = Arc::new(vec![1, 2, 3]);\n    let clone1 = Arc::clone(&arc_data);\n    let clone2 = Arc::clone(&arc_data);\n\n    let h1 = thread::spawn(move || println!("线程 1: {:?}", clone1));\n    let h2 = thread::spawn(move || println!("线程 2: {:?}", clone2));\n    h1.join().unwrap();\n    h2.join().unwrap();\n\n    // 普通类型（实现了 Send）可以传给线程\n    print_from_thread(String::from("hello"));\n    print_from_thread(vec![1, 2, 3]);\n    print_from_thread(42u64);\n\n    // 以下代码如果取消注释，会编译失败：\n    // use std::rc::Rc;\n    // let rc = Rc::new(42);\n    // thread::spawn(move || println!("{}", rc)); // 错误：Rc 不是 Send\n\n    println!("所有线程安全完成，没有数据竞争！");\n}',
            },
            {
              type: 'quiz',
              question: '为什么 Rc<T> 不是 Send，而 Arc<T> 是 Send？',
              options: [
                '因为 Arc 比 Rc 存储更多数据',
                'Rc 的引用计数是普通整数操作，多线程并发修改会导致计数错误；Arc 使用原子操作，线程安全',
                '因为 Arc 总是在堆上分配数据',
                '因为 Rc 不实现 Clone',
              ],
              correctIndex: 1,
              explanation:
                '`Rc<T>` 的引用计数用普通的 `+1/-1` 操作，两个线程同时修改会有数据竞争（比如两个线程同时读到 2，都加 1 写入 3——实际应该是 4）。`Arc<T>` 使用 CPU 的原子指令（`fetch_add`），保证计数操作是不可分割的，因此线程安全。',
            },
            {
              type: 'ai-prompt',
              title: 'AI 提示模板：理解 Send + Sync 约束',
              scenario: '你学完了 Send 和 Sync trait。让 AI 帮你深入理解这两个 trait 在实践中的意义。',
              prompt: '用 Rust 演示 Send 和 Sync trait 的实际意义，要求：\n1. 实现一个**不是 Send 的类型**（在类型中包含裸指针 `*const i32`），并解释为什么\n2. 演示编译器如何阻止把非 Send 类型传给 thread::spawn（展示错误信息）\n3. 实现一个**包装器类型**，把非 Send 的内容包装成线程安全的（用 Mutex 或 unsafe + 手动 impl Send）\n4. 解释什么情况下使用 unsafe impl Send 是合理的（只有当你能证明并发安全性时）\n5. 对比 Java/Go 中的线程安全机制与 Rust 的编译期检查\n用中文注释。',
              explanation: 'Send 和 Sync 是 Rust 最重要的"标记 trait"——它们没有方法，只是告诉编译器某个类型的并发安全性质。理解它们有助于读懂错误信息和设计线程安全的 API。',
            },
          ],
        },

        // --- 13.5 实战：多线程文件处理 ---
        {
          id: 'concurrency-exercise',
          title: '实战：多线程数据处理',
          cards: [
            {
              type: 'explain',
              title: '综合运用并发工具',
              content:
                '前四节学了线程的基础组件：\n\n- **`thread::spawn` + `join`**：创建和等待线程\n- **`move` 闭包**：安全地把数据转移给新线程\n- **`mpsc::channel`**：线程间消息传递\n- **`Arc<Mutex<T>>`**：多线程共享可变数据\n- **`Send + Sync`**：编译期并发安全保证\n\n现在把它们组合在一起，实现一个模拟多线程数据处理的小程序。\n\n真实场景类比：批量处理文件（读取 → 解析 → 统计），每个文件由一个工作线程处理，结果汇总到主线程。',
            },
            {
              type: 'code',
              title: '模拟多线程数据处理',
              description:
                '综合使用 thread::spawn、mpsc::channel 和 Arc<Mutex<T>>。\n\n模拟场景：3 个工作线程处理一批"任务"（数字），统计处理结果，主线程汇总并报告。',
              language: 'rust',
              runnable: true,
              code: 'use std::sync::{Arc, Mutex};\nuse std::sync::mpsc;\nuse std::thread;\n\n// 模拟的"任务"\n#[derive(Debug, Clone)]\nstruct Task {\n    id: u32,\n    data: Vec<i32>,\n}\n\n// 处理任务的结果\n#[derive(Debug)]\nstruct TaskResult {\n    task_id: u32,\n    sum: i32,\n    count: usize,\n}\n\nfn process_task(task: Task) -> TaskResult {\n    let sum: i32 = task.data.iter().sum();\n    TaskResult { task_id: task.id, sum, count: task.data.len() }\n}\n\nfn main() {\n    // 准备任务队列（Arc<Mutex<Vec>> 让多个线程共享）\n    let tasks = Arc::new(Mutex::new(vec![\n        Task { id: 1, data: vec![1, 2, 3, 4, 5] },\n        Task { id: 2, data: vec![10, 20, 30] },\n        Task { id: 3, data: vec![100, 200] },\n        Task { id: 4, data: vec![7, 8, 9] },\n        Task { id: 5, data: vec![42] },\n        Task { id: 6, data: vec![1, 1, 1, 1, 1, 1] },\n    ]));\n\n    // 用 channel 收集结果\n    let (tx, rx) = mpsc::channel::<TaskResult>();\n\n    let num_workers = 3;\n    let mut handles = vec![];\n\n    for worker_id in 0..num_workers {\n        let tasks_clone = Arc::clone(&tasks);\n        let tx_clone = tx.clone();\n\n        let handle = thread::spawn(move || {\n            loop {\n                // 从任务队列取一个任务\n                let task = tasks_clone.lock().unwrap().pop();\n                match task {\n                    Some(t) => {\n                        println!("工作线程 {} 处理任务 {}", worker_id, t.id);\n                        tx_clone.send(process_task(t)).unwrap();\n                    }\n                    None => {\n                        println!("工作线程 {} 无任务，退出", worker_id);\n                        break;\n                    }\n                }\n            }\n        });\n        handles.push(handle);\n    }\n\n    // drop 原始 tx，确保 channel 在所有工作线程完成后关闭\n    drop(tx);\n\n    // 汇总统计\n    let mut total_sum = 0i32;\n    let mut total_count = 0usize;\n    let mut results_count = 0;\n\n    for result in rx {\n        println!("结果: 任务 {} → 总和={}, 数量={}", result.task_id, result.sum, result.count);\n        total_sum += result.sum;\n        total_count += result.count;\n        results_count += 1;\n    }\n\n    for handle in handles {\n        handle.join().unwrap();\n    }\n\n    println!("\\n=== 最终报告 ===");\n    println!("处理任务数: {}", results_count);\n    println!("处理数据总量: {}", total_count);\n    println!("所有数据总和: {}", total_sum);\n}',
            },
            {
              type: 'quiz',
              question: '在上面的多线程任务队列中，为什么在启动所有工作线程后要 drop(tx)？',
              options: [
                '为了节省内存',
                '因为 drop(tx) 会立即停止所有工作线程',
                '当所有 tx_clone 也 drop 后，rx 的 for 循环会结束——drop 原始 tx 是为了让 channel 在正确时机关闭',
                '因为不 drop tx 会导致死锁',
              ],
              correctIndex: 2,
              explanation:
                '`mpsc` channel 在**所有**发送者（`Sender`）都 drop 后才关闭。主线程持有原始 `tx`，如果不 drop 它，即使所有工作线程的 `tx_clone` 都 drop 了，`rx` 的 `for` 循环也不会结束（还有一个发送者存活）。`drop(tx)` 确保当最后一个工作线程完成时，channel 正确关闭，主线程的汇总循环可以退出。',
            },
            {
              type: 'ai-prompt',
              title: 'AI 提示模板：扩展多线程数据处理',
              scenario: '你完成了并发编程章节的学习。让 AI 帮你把这个多线程处理器扩展成更真实的场景。',
              prompt: '基于"多线程任务队列"的模式，用 Rust 实现一个更完整的并发文本分析工具，要求：\n\n1. **输入**：一个 `Vec<String>`，每个元素是一段文本（模拟文件内容）\n2. **处理**（每个工作线程独立处理一段文本）：\n   - 统计单词数（按空格分割）\n   - 统计行数（按 \\n 分割）\n   - 找出最长的单词\n3. **架构要求**：\n   - 使用 `Arc<Mutex<Vec<_>>>` 作为任务队列（工作窃取模式）\n   - 使用 `mpsc::channel` 返回结果\n   - 4 个工作线程\n4. **输出**：汇总所有文本的总单词数、总行数、全局最长单词\n5. 添加简单的错误处理（工作线程 panic 时主线程能感知）\n\n用中文注释，代码可直接运行，展示完整的并发编程模式。',
              explanation: '这个练习综合了整个并发章节的所有概念。真实项目中的日志分析、搜索索引构建、批量 API 调用都使用类似的"工作者池"模式。掌握这个模式，你就具备了编写生产级并发代码的基础。',
            },
          ],
        },
      ],
    },

    // =============================================
    // 第十四章：异步编程入门
    // =============================================
    {
      id: 'ch14-async',
      title: '第十四章：异步编程入门',
      lessons: [
        // --- 14.1 为什么需要异步？ ---
        {
          id: 'why-async',
          title: '为什么需要异步？',
          cards: [
            {
              type: 'explain',
              title: '同步阻塞 vs 异步非阻塞',
              content:
                '**同步**：程序一步一步地等待。发出网络请求 → 干等 → 收到响应 → 继续下一步。\n\n**异步**：发出请求后不等，去做其他事，等响应来了再回来处理。\n\n同步就像你在烧水时一直盯着水壶；异步是把水壶开着，去切菜，水开了再回来倒水。',
            },
            {
              type: 'explain',
              title: '类比：餐厅服务员',
              content:
                '**同步（一对一）**：一个服务员只服务一桌，等这桌客人点完菜、吃完饭、结完账，才去下一桌。\n\n**异步（一对多）**：一个服务员先给 A 桌送菜单，趁 A 桌看菜单时去给 B 桌上菜，再去 C 桌结账……\n\n**Rust 的异步就是这种模式**：一个线程（服务员）高效地处理多个任务（桌子），在等待 I/O 时去做其他事。',
              analogy: '服务员 = 线程，桌子 = 任务，看菜单 = 等待 I/O',
            },
            {
              type: 'explain',
              title: '什么场景最受益？',
              content:
                '**I/O 密集型任务**最适合异步：\n\n- 网络请求（HTTP API、数据库查询）\n- 文件读写\n- 等待用户输入\n\n这些操作大部分时间都在**等待**，CPU 闲着没事干。异步让 CPU 在等待期间去处理其他任务。\n\n**CPU 密集型任务**（大量计算）反而适合多线程，异步帮助不大。',
            },
            {
              type: 'explain',
              title: 'async 不等于多线程',
              content:
                'async 可以跑在**单线程**上！\n\n原理是**事件循环（Event Loop）**：一个线程轮询所有任务，谁准备好了就执行谁。\n\n当然 tokio 也支持多线程调度，但这是运行时的实现细节，你写 async 代码时不需要关心。\n\n记住：**并发 ≠ 并行**。async 是并发（轮流），多线程是并行（同时）。',
            },
            {
              type: 'quiz',
              question: '以下哪个场景最适合用异步编程？',
              options: [
                '对 100 万个数字进行排序',
                '同时发出 1000 个 HTTP API 请求并等待响应',
                '计算圆周率到小数点后 1 亿位',
                '压缩一个 10GB 的视频文件',
              ],
              correctIndex: 1,
              explanation:
                '发出 HTTP 请求后大部分时间在等待网络响应，CPU 是空闲的。异步让程序在等待期间处理其他请求，极大提高吞吐量。排序、计算圆周率、压缩视频都是 CPU 密集型操作，适合多线程而非 async。',
            },
            {
              type: 'think-first',
              question: '你在一家咖啡店，需要同时处理：煮咖啡（3分钟）、烤面包（2分钟）、倒果汁（30秒）。\n\n方案 A：先煮完咖啡，再烤面包，再倒果汁（串行）\n方案 B：雇 3 个员工同时做（多线程）\n方案 C：一个人在等咖啡煮的时候去烤面包，等面包烤的时候倒果汁（异步）\n\n哪个方案最省人力？哪个最快？',
              reveal: '- **方案 A（串行）**：1 人，但要 5.5 分钟——最慢\n- **方案 B（多线程）**：3 人，3 分钟完成——最快但最费人力\n- **方案 C（异步）**：1 人，约 3 分钟——**和 B 一样快但只要 1 人！**\n\n异步的秘诀：**等待的时间不浪费**。煮咖啡时你不是傻站着，而是去做别的。\n\n这就是 `async/await` 的核心：一个线程在 `.await` 等待 I/O 时，运行时会去执行其他任务。特别适合**I/O 密集型**场景（网络请求、文件读写）。',
            },
            {
              type: 'ai-prompt',
              title: 'AI 提示模板：理解异步概念',
              scenario: '你对异步编程的概念还不太清楚，想让 AI 帮你解释。',
              prompt: '用生活中的类比解释 Rust 异步编程中的以下概念：\n1. Future 是什么？\n2. 事件循环是如何工作的？\n3. async/await 和回调函数有什么区别？\n\n请用简单的中文，避免过多技术术语。',
              explanation: 'AI 很擅长用类比解释抽象概念。如果第一次解释没听懂，可以继续追问："能换一个类比吗？" 或 "能用更简单的话说吗？"',
            },
          ],
        },
        // --- 14.2 async fn 与 .await ---
        {
          id: 'async-await-basics',
          title: 'async fn 与 .await',
          cards: [
            {
              type: 'explain',
              title: 'async fn 返回 Future',
              content:
                '`async fn` 是声明异步函数的关键字。调用它**不会立即执行**，而是返回一个 `Future`——一个"将来会完成的任务"的描述。\n\n类比：`async fn` 就像点外卖——你下单（调用函数），但饭还没来（函数没执行）。你需要等它送达（`.await`）才能吃到饭（得到结果）。\n\n**懒执行**：不调用 `.await`，Future 永远不会运行。',
            },
            {
              type: 'explain',
              title: '.await 等待 Future 完成',
              content:
                '`.await` 是异步函数的暂停点。\n\n当执行到 `.await` 时：\n1. 如果 Future 还没完成，当前任务**让出控制权**给运行时\n2. 运行时去执行其他任务\n3. Future 完成后，运行时**恢复**当前任务\n\n`.await` 只能在 `async fn` 内部使用。',
            },
            {
              type: 'code',
              title: '基本 async fn 示例',
              description: '用 tokio 运行时执行一个简单的异步函数。`#[tokio::main]` 宏把 main 函数变成异步入口。',
              language: 'rust',
              runnable: true,
              code: `use tokio::time::{sleep, Duration};

async fn greet(name: &str) {
    sleep(Duration::from_millis(100)).await;
    println!("Hello, {}!", name);
}

#[tokio::main]
async fn main() {
    greet("Rust").await;
}`,
            },
            {
              type: 'explain',
              title: 'NOTE：Rust Playground 支持 tokio',
              content:
                'Rust Playground（play.rust-lang.org）已经内置了 tokio 依赖，你可以直接粘贴上面的代码运行，无需手动添加 `Cargo.toml`。\n\n在自己的项目里，需要在 `Cargo.toml` 添加：\n\n```toml\n[dependencies]\ntokio = { version = "1", features = ["full"] }\n```',
            },
            {
              type: 'quiz',
              question: '以下代码会发生什么？\n\n```rust\nasync fn fetch() -> String {\n    "data".to_string()\n}\n\nfn main() {\n    let result = fetch(); // 没有 .await\n    println!("{:?}", result);\n}\n```',
              options: [
                '打印出 "data"',
                '编译错误：main 函数不能调用 async 函数',
                '编译警告：Future 未被使用，result 是一个 Future 而不是 String',
                '程序崩溃',
              ],
              correctIndex: 2,
              explanation: '`fetch()` 返回一个 `Future<Output = String>`，不是 `String`。没有 `.await` 的话，Future 不会执行。编译器会发出警告："unused implementer of Future that must be used"。要得到 String，必须在 async 上下文中 `.await`。',
            },
            {
              type: 'fill-blank',
              title: '填空：异步函数',
              description: '补全这个异步函数的关键字，让它能正确声明并等待异步操作完成。',
              template: '___BLANK___ fn fetch_data() -> String {\n    tokio::time::sleep(std::time::Duration::from_secs(1)).___BLANK___;\n    "数据加载完成".to_string()\n}',
              blanks: ['async', 'await'],
              hints: ['异步函数用什么关键词声明？', '等待 Future 完成用什么？'],
              language: 'rust',
            },
            {
              type: 'fill-blank',
              title: '补全异步函数',
              description: '补全这个异步函数，让它等待 sleep 完成后返回问候语。',
              language: 'rust',
              template: `use tokio::time::{sleep, Duration};

___BLANK___ fn make_greeting(name: &str) -> String {
    sleep(Duration::from_millis(50)).___BLANK___;
    format!("你好，{}！", name)
}

#[tokio::main]
async fn main() {
    let msg = make_greeting("世界").___BLANK___;
    println!("{}", msg);
}`,
              blanks: ['async', 'await', 'await'],
              hints: ['声明异步函数的关键字', '等待 Future 完成的操作符', '等待异步函数返回结果'],
            },
            {
              type: 'ai-prompt',
              title: 'AI 提示模板：async/await 问题',
              scenario: '你在写异步代码时遇到了编译错误，不知道如何修复。',
              prompt: '我在写 Rust 异步代码时遇到了这个编译错误：\n\n```\n[粘贴你的错误信息]\n```\n\n我的代码是：\n```rust\n[粘贴你的代码]\n```\n\n请解释这个错误的原因，并给出修复方案。同时告诉我怎么避免类似错误。',
              explanation: '遇到异步编译错误时，把完整的错误信息和代码一起给 AI，它通常能快速定位问题。常见错误包括：在非 async 函数里用 .await、Future 的 Send 约束不满足等。',
            },
          ],
        },
        // --- 14.3 tokio 异步运行时 ---
        {
          id: 'tokio-runtime',
          title: 'tokio——异步运行时',
          cards: [
            {
              type: 'explain',
              title: '什么是运行时？',
              content:
                'Rust 的 async/await 只是**语言特性**，本身不包含执行机制。你需要一个**异步运行时**来实际驱动 Future 运行。\n\n**tokio** 是 Rust 生态中最流行的异步运行时，提供：\n- 任务调度器\n- 异步 I/O（网络、文件）\n- 定时器\n- 并发原语（Mutex、Channel）\n\n类比：Future 是菜谱，tokio 是厨房（提供锅、炉子、刀具让你真正能做菜）。',
            },
            {
              type: 'explain',
              title: '#[tokio::main] 宏',
              content:
                '`#[tokio::main]` 是一个**过程宏**，它把你的 `async fn main()` 转换成同步的 `fn main()`，在内部创建 tokio 运行时并运行你的异步代码。\n\n展开后大致等价于：\n```rust\nfn main() {\n    tokio::runtime::Runtime::new()\n        .unwrap()\n        .block_on(async_main())\n}\n```\n\n你只需要写 `#[tokio::main] async fn main()`，其他交给宏处理。',
            },
            {
              type: 'explain',
              title: 'tokio::spawn——并发执行任务',
              content:
                '`tokio::spawn` 把一个 Future 提交给运行时，**立即返回**一个 `JoinHandle`，可以稍后等待结果。\n\n多个 spawn 的任务会**并发**执行（运行时轮流推进它们）。\n\n```rust\nlet handle1 = tokio::spawn(task1());\nlet handle2 = tokio::spawn(task2());\n// task1 和 task2 并发运行\nhandle1.await.unwrap();\nhandle2.await.unwrap();\n```',
            },
            {
              type: 'code',
              title: '并发请求模拟',
              description: '用 tokio::spawn 并发执行多个异步任务，对比顺序执行和并发执行的耗时差异。',
              language: 'rust',
              runnable: true,
              code: `use tokio::time::{sleep, Duration, Instant};

async fn fetch_data(id: u32) -> String {
    sleep(Duration::from_millis(100)).await;
    format!("数据 #{}", id)
}

#[tokio::main]
async fn main() {
    // 并发执行 3 个任务
    let start = Instant::now();

    let h1 = tokio::spawn(fetch_data(1));
    let h2 = tokio::spawn(fetch_data(2));
    let h3 = tokio::spawn(fetch_data(3));

    let r1 = h1.await.unwrap();
    let r2 = h2.await.unwrap();
    let r3 = h3.await.unwrap();

    println!("{}, {}, {}", r1, r2, r3);
    println!("耗时: {:?}（并发，约 100ms）", start.elapsed());
}`,
            },
            {
              type: 'explain',
              title: 'tokio::select!——等待第一个完成',
              content:
                '`tokio::select!` 同时等待多个 Future，**哪个先完成就处理哪个**，其余的取消。\n\n常用于：\n- 超时控制（任务 vs 定时器，谁先到）\n- 竞争条件（多个数据源，用最快的那个）\n\n```rust\ntokio::select! {\n    result = fetch() => println!("收到数据: {:?}", result),\n    _ = timeout() => println!("超时了！"),\n}\n```',
            },
            {
              type: 'quiz',
              question: '用 tokio::spawn 启动 10 个各需要 1 秒的任务，总耗时大约是多少？',
              options: [
                '约 10 秒（顺序执行）',
                '约 1 秒（并发执行）',
                '约 0.1 秒',
                '取决于 CPU 核心数，至少 5 秒',
              ],
              correctIndex: 1,
              explanation: 'tokio::spawn 让任务并发执行。10 个各需 1 秒的 I/O 等待任务，在异步运行时下可以同时推进，总耗时约为最慢单个任务的时间（约 1 秒）。注意这是 I/O 密集型任务，若是 CPU 密集型则需要多线程才能真正并行。',
            },
            {
              type: 'ai-prompt',
              title: 'AI 提示模板：tokio 使用问题',
              scenario: '你想用 tokio 实现一个有超时控制的异步操作。',
              prompt: '用 Rust + tokio 实现一个函数：\n- 发起一个异步操作（可以用 sleep 模拟）\n- 如果 500ms 内没有完成，则超时返回错误\n- 使用 tokio::select! 或 tokio::time::timeout 实现\n\n请给出完整可运行的代码，并解释 select! 和 timeout 的使用场景区别。',
              explanation: '超时控制是生产代码中非常常见的需求。让 AI 生成示例代码，然后改成你自己的业务逻辑。记得问 AI "这段代码有哪些边界情况需要注意？"',
            },
          ],
        },
        // --- 14.4 异步常见陷阱 ---
        {
          id: 'async-pitfalls',
          title: '异步常见陷阱',
          cards: [
            {
              type: 'explain',
              title: '陷阱 1：Send 约束',
              content:
                '`tokio::spawn` 要求 Future 实现 `Send`，意味着它可以安全地在线程间传递。\n\n**常见报错**：\n```\nerror: future cannot be sent between threads safely\n```\n\n**原因**：Future 内部持有了不是 `Send` 的值（如 `Rc<T>`、`RefCell<T>`、裸指针）。\n\n**解决方案**：\n- 用 `Arc<T>` 替换 `Rc<T>`\n- 用 `Mutex<T>` 替换 `RefCell<T>`\n- 缩小非 Send 值的作用域，确保它在 .await 前被 drop',
            },
            {
              type: 'explain',
              title: '陷阱 2：生命周期问题',
              content:
                '`async fn` 持有引用时，引用的生命周期必须覆盖整个 Future 的执行期。\n\n```rust\n// 这会编译失败：\nasync fn process(data: &str) {\n    some_async_op().await;\n    println!("{}", data); // data 引用跨越了 .await\n}\n```\n\n**解决方案**：\n- 传入 owned 值而不是引用\n- 或者确保引用的生命周期足够长\n- **经验法则**：不确定就 `clone()`，性能优化以后再说',
            },
            {
              type: 'explain',
              title: '陷阱 3：不要用 std::thread::sleep！',
              content:
                '在 async 函数里用 `std::thread::sleep` 会**阻塞整个线程**，导致运行时无法调度其他任务。\n\n```rust\n// ❌ 错误做法\nasync fn bad() {\n    std::thread::sleep(Duration::from_secs(1)); // 阻塞线程！\n}\n\n// ✅ 正确做法\nasync fn good() {\n    tokio::time::sleep(Duration::from_secs(1)).await; // 让出控制权\n}\n```\n\n同理，任何阻塞操作（同步文件 I/O、重计算）都应该用 `tokio::task::spawn_blocking` 移到专用线程。',
            },
            {
              type: 'explain',
              title: '经验法则：clone 优先，优化延后',
              content:
                '刚接触异步编程时，遇到生命周期或所有权问题，**先 clone 解决编译**，让程序跑起来。\n\n性能问题等到程序正确运行、有真实数据后再用性能分析工具（perf、flamegraph）定位热点，有针对性地优化。\n\n过早优化是万恶之源——Don\'t Optimize Prematurely（Knuth）。',
            },
            {
              type: 'quiz',
              question: '在 tokio 异步函数中，以下哪个操作会导致问题？',
              options: [
                'tokio::time::sleep(Duration::from_secs(1)).await',
                'tokio::spawn(some_async_task())',
                'std::thread::sleep(Duration::from_secs(1))',
                'Arc::new(Mutex::new(data))',
              ],
              correctIndex: 2,
              explanation: '`std::thread::sleep` 是同步阻塞调用，会阻塞整个 tokio 工作线程，导致运行时无法调度其他任务。在 async 代码中应始终使用 `tokio::time::sleep(...).await`，这样会让出控制权，允许其他任务运行。',
            },
            {
              type: 'ai-prompt',
              title: 'AI 提示模板：让 AI 帮你写异步代码',
              scenario: '你需要写一段异步代码，但不确定如何正确处理 Send 约束和错误。',
              prompt: '用 Rust + tokio 帮我写一个异步函数：\n- 功能：[描述你的需求]\n- 需要并发处理多个任务\n- 使用 Arc + Mutex 共享状态（如果需要）\n- 完整的错误处理（使用 ? 操作符）\n- 避免常见的 async 陷阱（不要用 std::thread::sleep，注意 Send 约束）\n\n请给出完整代码和注释，说明每个关键决策的原因。',
              explanation: 'AI 写异步代码时很容易忽略 Send 约束和生命周期问题。在提示词里明确要求"避免常见 async 陷阱"，可以让 AI 输出更健壮的代码。拿到代码后，先跑通，再理解，最后根据需求修改。',
            },
          ],
        },
      ],
    },
    // =============================================
    // 第十五章：实战项目——命令行工具
    // =============================================
    {
      id: 'ch15-capstone',
      title: '第十五章：实战项目——命令行工具',
      lessons: [
        // --- 15.1 项目设计：笔记管理 CLI ---
        {
          id: 'project-design',
          title: '项目设计：笔记管理 CLI',
          cards: [
            {
              type: 'explain',
              title: '我们要做什么？',
              content:
                '恭喜你来到最后一章！我们要综合运用前面所学，构建一个真实的命令行笔记工具。\n\n**功能需求**：\n- `add <内容>`：添加一条笔记\n- `list`：列出所有笔记\n- `search <关键词>`：搜索包含关键词的笔记\n- `delete <id>`：删除指定 id 的笔记\n\n**工具用到的 Rust 知识**：struct、enum、match、Result、文件 I/O、Vec、迭代器。',
            },
            {
              type: 'think-first',
              question: '在开始编码之前，先思考：你会怎么设计这个笔记工具？\n\n具体来说：\n1. 笔记数据应该存在哪里？（内存 / 文件 / 数据库）\n2. 每条笔记需要哪些字段？\n3. 程序启动时如何知道用户要执行什么命令？',
              hints: '思考一下：程序关闭后数据会消失，所以需要持久化。命令行参数可以用 std::env::args() 读取。',
              reveal: '**参考设计**：\n1. **存储**：JSON 文件（`notes.json`），用 serde_json 序列化/反序列化\n2. **Note 字段**：id（自增整数）、content（String）、created_at（时间戳或字符串）\n3. **命令解析**：读取 `std::env::args()`，第一个参数是子命令（add/list/search/delete）',
            },
            {
              type: 'explain',
              title: '模块划分',
              content:
                '一个组织良好的 Rust 项目会把代码分散到多个模块：\n\n```\nnote-cli/\n├── src/\n│   ├── main.rs      → 程序入口，解析命令，调用相应函数\n│   ├── cli.rs       → 命令行参数解析逻辑\n│   ├── note.rs      → Note 结构体定义和方法\n│   └── storage.rs   → 文件读写（加载/保存笔记列表）\n└── Cargo.toml\n```\n\n这种分层让每个文件职责单一，容易测试和维护。',
            },
            {
              type: 'explain',
              title: '类型设计',
              content:
                '**Note struct**：代表一条笔记\n```rust\nstruct Note {\n    id: u32,\n    content: String,\n    created_at: String,\n}\n```\n\n**Command enum**：代表用户的操作意图\n```rust\nenum Command {\n    Add(String),\n    List,\n    Search(String),\n    Delete(u32),\n}\n```\n\n用 enum 表示命令，可以用 `match` 穷举所有情况，编译器会确保你不遗漏任何分支。',
            },
            {
              type: 'task',
              title: '设计你的 CLI 工具',
              instruction: '在开始写代码之前，先在纸上（或 AI 助手里）设计你的笔记管理工具：',
              checklist: [
                '定义 Note 结构体需要哪些字段（id, title, content, created_at?）',
                '列出所有命令（add, list, search, delete）',
                '决定存储格式（JSON 文件？每行一条？）',
                '画出模块关系（main → cli → storage → note）',
                '想好错误处理策略（哪些错误该 panic，哪些该 Result）',
              ],
              tip: '好的设计花 20 分钟，能省 2 小时的返工。先想清楚再动手。',
            },
            {
              type: 'task',
              title: '任务：搭建项目骨架',
              instruction: '在本地创建一个新的 Rust 项目，搭建笔记 CLI 的基本结构。',
              checklist: [
                '运行 `cargo new note-cli` 创建新项目',
                '在 `src/` 目录下创建 `note.rs`、`cli.rs`、`storage.rs` 三个文件',
                '在 `main.rs` 中用 `mod note; mod cli; mod storage;` 声明模块',
                '在 `note.rs` 中定义 Note struct 和 Command enum（暂时不用实现方法）',
                '运行 `cargo check` 确认没有编译错误',
              ],
              tip: '`cargo check` 比 `cargo build` 快很多，适合快速检查代码是否能编译。',
            },
            {
              type: 'ai-prompt',
              title: 'AI 提示模板：项目设计',
              scenario: '你在设计一个新的命令行工具，想让 AI 帮你做架构规划。',
              prompt: '我要用 Rust 写一个命令行笔记工具，功能：add/list/search/delete。\n\n请帮我：\n1. 设计完整的模块结构（文件划分）\n2. 给出 Note struct 和 Command enum 的定义\n3. 列出所有需要实现的函数签名（不需要实现，只要签名）\n4. 说明应该用什么方式持久化数据（理由）\n\n要求：使用标准库，不引入 clap 等外部 CLI 框架，尽量简单。',
              explanation: '在开始写代码之前，让 AI 帮你做架构规划是很好的习惯。你可以把 AI 的建议当作起点，根据自己的理解做调整。好的架构设计比写代码本身更重要。',
            },
          ],
        },
        // --- 15.2 命令行参数与文件 I/O ---
        {
          id: 'cli-parsing',
          title: '命令行参数与文件 I/O',
          cards: [
            {
              type: 'explain',
              title: '用 std::env::args() 解析参数',
              content:
                '不引入 clap 等外部库，我们用标准库的 `std::env::args()` 读取命令行参数。\n\n```bash\n$ note-cli add "买牛奶"\n# args: ["note-cli", "add", "买牛奶"]\n#        ↑ 程序名  ↑ 子命令  ↑ 内容\n```\n\n`args()` 返回一个迭代器，第 0 个是程序名，第 1 个是子命令，之后是参数。\n\n这种方式适合简单工具；复杂 CLI（多层子命令、自动帮助文档）推荐用 clap。',
            },
            {
              type: 'code',
              title: '简化版参数解析',
              description: '用 std::env::args() 解析子命令，转换成 Command enum。展示了基本的参数解析模式。',
              language: 'rust',
              runnable: true,
              code: `use std::env;

#[derive(Debug)]
enum Command {
    Add(String),
    List,
    Search(String),
    Delete(u32),
}

fn parse_args() -> Result<Command, String> {
    let args: Vec<String> = env::args().collect();

    match args.get(1).map(|s| s.as_str()) {
        Some("add") => {
            let content = args.get(2)
                .ok_or("add 命令需要提供内容".to_string())?;
            Ok(Command::Add(content.clone()))
        }
        Some("list") => Ok(Command::List),
        Some("search") => {
            let keyword = args.get(2)
                .ok_or("search 命令需要提供关键词".to_string())?;
            Ok(Command::Search(keyword.clone()))
        }
        Some("delete") => {
            let id: u32 = args.get(2)
                .ok_or("delete 命令需要提供 id".to_string())?
                .parse()
                .map_err(|_| "id 必须是数字".to_string())?;
            Ok(Command::Delete(id))
        }
        _ => Err("用法: note-cli <add|list|search|delete> [参数]".to_string()),
    }
}

fn main() {
    match parse_args() {
        Ok(cmd) => println!("解析到命令: {:?}", cmd),
        Err(e) => eprintln!("错误: {}", e),
    }
}`,
            },
            {
              type: 'explain',
              title: '用 std::fs 读写文件',
              content:
                '**读文件**：\n```rust\nuse std::fs;\nlet content = fs::read_to_string("notes.json")?;\n```\n\n**写文件**：\n```rust\nfs::write("notes.json", content)?;\n```\n\n`?` 操作符：如果出错，自动 return Err(...)，让调用者处理。\n\n文件不存在时 `read_to_string` 会返回错误，可以用 `unwrap_or_default()` 或 `if path.exists()` 处理初次运行的情况。',
            },
            {
              type: 'explain',
              title: 'serde_json 序列化（可选）',
              content:
                '`serde_json` 是 Rust 生态最流行的 JSON 库，让 struct 和 JSON 互相转换变得极其简单。\n\n```toml\n# Cargo.toml\n[dependencies]\nserde = { version = "1", features = ["derive"] }\nserde_json = "1"\n```\n\n```rust\n#[derive(serde::Serialize, serde::Deserialize)]\nstruct Note { id: u32, content: String }\n\n// 序列化：Rust → JSON\nlet json = serde_json::to_string(&notes)?;\n\n// 反序列化：JSON → Rust\nlet notes: Vec<Note> = serde_json::from_str(&json)?;\n```\n\n只需加一个 derive 宏，serde 自动生成所有序列化代码。',
            },
            {
              type: 'quiz',
              question: '运行 `./note-cli delete 5` 时，`std::env::args().collect::<Vec<String>>()` 的内容是？',
              options: [
                '["delete", "5"]',
                '["./note-cli", "delete", "5"]',
                '["delete", 5]',
                '["5"]',
              ],
              correctIndex: 1,
              explanation: '`args()` 返回的第一个元素始终是程序本身的路径（`"./note-cli"`），之后才是用户传入的参数。所以解析时要从索引 1 开始取子命令，从索引 2 开始取参数。',
            },
            {
              type: 'ai-prompt',
              title: 'AI 提示模板：文件 I/O 和错误处理',
              scenario: '你在写文件读写代码时遇到了错误处理的问题。',
              prompt: '帮我写一个 Rust 函数，从 JSON 文件加载 Vec<Note> 数据：\n- 文件不存在时返回空 Vec（不是错误）\n- 文件存在但格式不对时返回 Err\n- 使用 ? 操作符传播错误\n- 函数签名：`fn load_notes(path: &str) -> Result<Vec<Note>, Box<dyn std::error::Error>>`\n\nNote 结构体：`struct Note { id: u32, content: String, created_at: String }`',
              explanation: '"文件不存在 → 空列表，格式错误 → 报错" 是很常见的需求模式。把这种业务需求精确描述给 AI，它能生成正确处理各种边界情况的代码。',
            },
          ],
        },
        // --- 15.3 核心实现 ---
        {
          id: 'implementation',
          title: '核心实现',
          cards: [
            {
              type: 'explain',
              title: 'Note struct 与方法',
              content:
                '给 Note 添加方法，让它知道如何显示自己和判断是否匹配搜索关键词：\n\n```rust\nimpl Note {\n    fn new(id: u32, content: String) -> Self {\n        Note {\n            id,\n            content,\n            created_at: chrono::Local::now()\n                .format("%Y-%m-%d %H:%M").to_string(),\n        }\n    }\n\n    fn matches(&self, keyword: &str) -> bool {\n        self.content.contains(keyword)\n    }\n\n    fn display(&self) {\n        println!("[{}] {} ({})", self.id, self.content, self.created_at);\n    }\n}\n```',
            },
            {
              type: 'explain',
              title: '存储层：读写 JSON 文件',
              content:
                '存储层封装所有文件操作，让其他模块不需要关心数据如何持久化：\n\n```rust\nconst NOTES_FILE: &str = "notes.json";\n\nfn load_notes() -> Vec<Note> {\n    std::fs::read_to_string(NOTES_FILE)\n        .ok()\n        .and_then(|s| serde_json::from_str(&s).ok())\n        .unwrap_or_default()\n}\n\nfn save_notes(notes: &[Note]) -> Result<(), Box<dyn std::error::Error>> {\n    let json = serde_json::to_string_pretty(notes)?;\n    std::fs::write(NOTES_FILE, json)?;\n    Ok(())\n}\n```',
            },
            {
              type: 'code',
              title: '完整的 mini note 工具',
              description: '一个功能完整的命令行笔记工具，包含 add/list/search/delete 四个命令，数据持久化到 JSON 文件。',
              language: 'rust',
              runnable: true,
              code: `use std::env;

#[derive(Debug, Clone)]
struct Note {
    id: u32,
    content: String,
}

impl Note {
    fn new(id: u32, content: String) -> Self {
        Note { id, content }
    }

    fn display(&self) {
        println!("[{}] {}", self.id, self.content);
    }
}

// 模拟存储（真实项目里会读写 JSON 文件）
fn load_notes() -> Vec<Note> {
    vec![
        Note::new(1, "买牛奶".to_string()),
        Note::new(2, "学 Rust".to_string()),
        Note::new(3, "买菜做饭".to_string()),
    ]
}

fn add_note(notes: &mut Vec<Note>, content: String) {
    let id = notes.iter().map(|n| n.id).max().unwrap_or(0) + 1;
    notes.push(Note::new(id, content.clone()));
    println!("已添加笔记 [{}]: {}", id, content);
}

fn list_notes(notes: &[Note]) {
    if notes.is_empty() {
        println!("暂无笔记");
    } else {
        for note in notes {
            note.display();
        }
    }
}

fn search_notes(notes: &[Note], keyword: &str) {
    let results: Vec<&Note> = notes.iter()
        .filter(|n| n.content.contains(keyword))
        .collect();
    if results.is_empty() {
        println!("没有找到包含 '{}' 的笔记", keyword);
    } else {
        for note in results {
            note.display();
        }
    }
}

fn delete_note(notes: &mut Vec<Note>, id: u32) {
    let before = notes.len();
    notes.retain(|n| n.id != id);
    if notes.len() < before {
        println!("已删除笔记 [{}]", id);
    } else {
        println!("找不到 id 为 {} 的笔记", id);
    }
}

fn main() {
    let mut notes = load_notes();
    let args: Vec<String> = env::args().collect();

    // 演示模式：直接运行各个命令
    println!("=== 列出所有笔记 ===");
    list_notes(&notes);

    println!("\\n=== 添加新笔记 ===");
    add_note(&mut notes, "学完 Rust 第 15 章".to_string());

    println!("\\n=== 搜索"买" ===");
    search_notes(&notes, "买");

    println!("\\n=== 删除笔记 [2] ===");
    delete_note(&mut notes, 2);

    println!("\\n=== 最终列表 ===");
    list_notes(&notes);
}`,
            },
            {
              type: 'explain',
              title: '命令分发与错误处理',
              content:
                '在真实项目中，`main.rs` 解析参数后用 `match` 分发命令：\n\n```rust\nfn main() {\n    let mut notes = load_notes();\n\n    match parse_args() {\n        Ok(Command::Add(content)) => add_note(&mut notes, content),\n        Ok(Command::List) => list_notes(&notes),\n        Ok(Command::Search(kw)) => search_notes(&notes, &kw),\n        Ok(Command::Delete(id)) => delete_note(&mut notes, id),\n        Err(msg) => {\n            eprintln!("错误: {}", msg);\n            std::process::exit(1);\n        }\n    }\n\n    // 操作完成后保存\n    if let Err(e) = save_notes(&notes) {\n        eprintln!("保存失败: {}", e);\n    }\n}\n```\n\n`eprintln!` 输出到标准错误，`std::process::exit(1)` 返回非零退出码（表示出错）。',
            },
            {
              type: 'quiz',
              question: '以下代码有什么问题？\n\n```rust\nfn delete_note(notes: Vec<Note>, id: u32) {\n    notes.retain(|n| n.id != id);\n}\n```',
              options: [
                '`retain` 方法不存在',
                '参数应该是 `&mut Vec<Note>` 而不是 `Vec<Note>`，否则改动不会影响外部',
                '`id` 类型应该是 `usize`',
                '`retain` 的 closure 语法错误',
              ],
              correctIndex: 1,
              explanation: '`Vec<Note>` 是 move 语义，函数拿到的是所有权的副本（实际上是移动），对它的修改不会影响调用者的变量。要修改调用者的 Vec，必须传 `&mut Vec<Note>`（可变引用）。这是 Rust 所有权和借用规则的核心体现。',
            },
            {
              type: 'ai-prompt',
              title: 'AI 提示模板：帮我实现完整功能',
              scenario: '你已经有了骨架代码，想让 AI 帮你补全某个具体函数。',
              prompt: '我在写一个 Rust 命令行笔记工具，已有以下代码：\n\n```rust\n[粘贴你已有的代码]\n```\n\n请帮我实现 `search_notes` 函数：\n- 输入：笔记列表的引用和关键词字符串\n- 输出：打印所有 content 包含关键词的笔记（忽略大小写）\n- 如果没有结果，打印友好的提示信息\n- 函数签名：`fn search_notes(notes: &[Note], keyword: &str)`',
              explanation: '给 AI 提供已有的代码上下文和精确的函数签名，它能生成无缝集成到你项目里的代码。"忽略大小写"这类细节要在提示词里明确说清楚。',
            },
          ],
        },
        // --- 15.4 测试与发布 ---
        {
          id: 'testing-publishing',
          title: '测试与发布',
          cards: [
            {
              type: 'explain',
              title: '#[cfg(test)] 单元测试',
              content:
                'Rust 内置了测试框架，无需引入外部库。在同一个文件里用 `#[cfg(test)]` 模块写单元测试：\n\n```rust\n#[cfg(test)]\nmod tests {\n    use super::*; // 引入当前模块的所有内容\n\n    #[test]\n    fn test_add_note() {\n        let mut notes = vec![];\n        add_note(&mut notes, "测试笔记".to_string());\n        assert_eq!(notes.len(), 1);\n        assert_eq!(notes[0].content, "测试笔记");\n    }\n\n    #[test]\n    fn test_search_empty() {\n        let notes = vec![];\n        // 搜索空列表应该不崩溃\n        search_notes(&notes, "任何词");\n    }\n}\n```\n\n`#[cfg(test)]` 表示这个模块只在测试时编译，不会包含在发布版本里。',
            },
            {
              type: 'code',
              title: '完整测试示例',
              description: '展示如何用 assert_eq! 和 assert! 验证笔记工具的核心逻辑。',
              language: 'rust',
              runnable: true,
              code: `#[derive(Debug, Clone, PartialEq)]
struct Note {
    id: u32,
    content: String,
}

impl Note {
    fn new(id: u32, content: &str) -> Self {
        Note { id, content: content.to_string() }
    }
}

fn add_note(notes: &mut Vec<Note>, content: String) -> u32 {
    let id = notes.iter().map(|n| n.id).max().unwrap_or(0) + 1;
    notes.push(Note::new(id, &content));
    id
}

fn delete_note(notes: &mut Vec<Note>, id: u32) -> bool {
    let before = notes.len();
    notes.retain(|n| n.id != id);
    notes.len() < before
}

fn search_notes<'a>(notes: &'a [Note], keyword: &str) -> Vec<&'a Note> {
    notes.iter().filter(|n| n.content.contains(keyword)).collect()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_add_increases_len() {
        let mut notes = vec![];
        add_note(&mut notes, "第一条".to_string());
        add_note(&mut notes, "第二条".to_string());
        assert_eq!(notes.len(), 2);
    }

    #[test]
    fn test_ids_are_sequential() {
        let mut notes = vec![];
        let id1 = add_note(&mut notes, "笔记 1".to_string());
        let id2 = add_note(&mut notes, "笔记 2".to_string());
        assert_eq!(id1, 1);
        assert_eq!(id2, 2);
    }

    #[test]
    fn test_delete_existing() {
        let mut notes = vec![Note::new(1, "待删除")];
        let deleted = delete_note(&mut notes, 1);
        assert!(deleted);
        assert!(notes.is_empty());
    }

    #[test]
    fn test_delete_nonexistent() {
        let mut notes = vec![Note::new(1, "保留")];
        let deleted = delete_note(&mut notes, 99);
        assert!(!deleted);
        assert_eq!(notes.len(), 1);
    }

    #[test]
    fn test_search_finds_match() {
        let notes = vec![
            Note::new(1, "买牛奶"),
            Note::new(2, "学 Rust"),
        ];
        let results = search_notes(&notes, "买");
        assert_eq!(results.len(), 1);
        assert_eq!(results[0].id, 1);
    }
}

fn main() {
    println!("运行: cargo test 来执行单元测试");
    println!("在 Playground 中，#[test] 函数也会被执行");
}`,
            },
            {
              type: 'explain',
              title: 'cargo test 与 cargo build --release',
              content:
                '**运行测试**：\n```bash\ncargo test              # 运行所有测试\ncargo test test_add    # 只运行名字包含 test_add 的测试\ncargo test -- --nocapture  # 显示 println! 输出\n```\n\n**构建发布版本**：\n```bash\ncargo build --release\n# 生成 target/release/<项目名>（已优化，体积更小，速度更快）\n```\n\n发布版本启用了编译器优化（`-O3`），比调试版本快 2-10 倍，体积也小很多。\n\n**分发给别人使用**：把 `target/release/<项目名>` 二进制文件复制给对方即可，无需安装 Rust 运行时。',
            },
            {
              type: 'explain',
              title: '你已经学完了 Rust 核心！',
              content:
                '恭喜！🎉 你已经掌握了 Rust 的核心知识：\n\n✅ 变量、类型、函数\n✅ 所有权与借用（Rust 最独特的部分）\n✅ struct、enum、match\n✅ 错误处理（Result、?）\n✅ 泛型与 trait\n✅ 迭代器与闭包\n✅ 异步编程（async/await + tokio）\n✅ 实战项目（命令行工具）\n\n**下一步推荐**：\n- 📖 [The Rust Book](https://doc.rust-lang.org/book/)（深入每个主题）\n- 🏋️ [Rustlings](https://github.com/rust-lang/rustlings)（练习题）\n- 🔨 [Rust by Example](https://doc.rust-lang.org/rust-by-example/)（更多代码示例）\n- 🚀 尝试用 axum 写一个 HTTP API，或用 clap 升级你的 CLI 工具',
            },
            {
              type: 'task',
              title: '最终任务：发布你的笔记工具',
              instruction: '完成整个笔记 CLI 项目，让它真正可以在命令行中使用。',
              checklist: [
                '完成所有四个命令的实现（add / list / search / delete）',
                '添加至少 3 个单元测试，覆盖主要功能',
                '运行 `cargo test` 确保所有测试通过',
                '运行 `cargo clippy` 检查代码风格问题并修复',
                '运行 `cargo build --release` 生成优化版本',
                '在终端中实际运行工具：`./target/release/note-cli add "我完成了 Rust 入门课！"`',
                '（可选）把代码推送到 GitHub，分享给朋友',
              ],
              tip: 'cargo clippy 是 Rust 的官方 linter，它会指出很多常见的代码改进点，养成每次提交前运行 clippy 的习惯。',
            },
            {
              type: 'ai-prompt',
              title: 'AI 提示模板：扩展你的工具',
              scenario: '你已经完成了基础版笔记工具，想继续添加新功能。',
              prompt: '我已经完成了一个 Rust 命令行笔记工具，支持 add/list/search/delete。现在想添加以下功能之一，请帮我实现：\n\n**选项 A**：给笔记添加标签（tag），支持按标签过滤\n**选项 B**：笔记排序功能（按创建时间 / 按 id 逆序）\n**选项 C**：用 clap 库重写命令行参数解析，添加自动帮助文档\n\n我选择：[A / B / C]\n\n我的当前代码：\n```rust\n[粘贴你的代码]\n```\n\n请给出完整的修改方案，包括需要改哪些文件、添加哪些函数。',
              explanation: '完成基础功能后，让 AI 帮你添加新特性是非常高效的工作方式。每次只要求一个功能，给出完整的现有代码上下文，AI 就能给出无缝集成的修改方案。记得理解 AI 的代码再合并，不要盲目复制粘贴。',
            },
          ],
        },
      ],
    },
  ],
}
